import {
  Commitment,
  ConfirmOptions,
  Connection,
  ConnectionConfig,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import {
  Account,
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  AnchorProvider,
  BN,
  Program,
  Wallet,
  Idl,
  web3,
  utils,
} from "@project-serum/anchor";
import staking_options_idl from "./staking_options_idl.json";

/**
 * API class with functions to interact with the Staking Options Program using Solana Web3 JS API
 */
export class StakingOptions {
  private connection: Connection;
  private program: Program;
  private commitment: Commitment | ConnectionConfig | undefined;

  /**
   * Create a Staking Options object
   *
   * @param rpcUrl The solana cluster endpoint used for the connecton
   */
  constructor(rpcUrl: string, commitment: Commitment | string = "finalized") {
    this.commitment = commitment as Commitment;
    this.connection = new Connection(
      rpcUrl,
      (this.commitment as Commitment) || "finalized"
    );

    const opts: ConfirmOptions = {
      preflightCommitment: "finalized",
      commitment: "finalized",
    };

    // Public key and payer not actually needed since this does not send transactions.
    const wallet: Wallet = {
      publicKey: new PublicKey("4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"),
      signAllTransactions: async (txs) => txs,
      signTransaction: async (tx) => tx,
      payer: new Keypair(),
    };

    const provider = new AnchorProvider(this.connection, wallet, opts);
    this.program = new Program(
      staking_options_idl as Idl,
      new PublicKey("4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"),
      provider
    );
  }

  private toBeBytes(x: number) {
    const y = Math.floor(x / 2 ** 32);
    return Uint8Array.from(
      [y, y << 8, y << 16, y << 24, x, x << 8, x << 16, x << 24].map(
        (z) => z >>> 24
      )
    );
  }

  public async state(name: string, baseMint: PublicKey): Promise<PublicKey> {
    const [state, _stateBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode("so-config")),
        Buffer.from(utils.bytes.utf8.encode(name)),
        baseMint.toBuffer(),
      ],
      this.program.programId
    );
    return state;
  }

  public async getState(name: string, baseMint: PublicKey) {
    const state = await this.state(name, baseMint);
    const stateObj = await this.program.account.state.fetch(state);
    return stateObj;
  }

  public async soMint(
    strike: number,
    name: string,
    baseMint: PublicKey
  ): Promise<PublicKey> {
    const state = await this.state(name, baseMint);
    const [optionMint, _optionMintBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("so-mint")),
          state.toBuffer(),
          this.toBeBytes(strike),
        ],
        this.program.programId
      );
    return optionMint;
  }

  public async baseVault(name: string, baseMint: PublicKey) {
    const [baseVault, _baseVaultBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode("so-vault")),
        Buffer.from(utils.bytes.utf8.encode(name)),
        baseMint.toBuffer(),
      ],
      this.program.programId
    );
    return baseVault;
  }

  public async getFeeAccount(mint: PublicKey) {
    const feeAccount = await getAssociatedTokenAddress(
      mint,
      new PublicKey("7Z36Efbt7a4nLiV7s5bY7J2e4TJ6V9JEKGccsy2od2bE")
    );
    return feeAccount;
  }

  /**
   * Create an instruction for config
   */
  public async createConfigInstruction(
    optionExpiration: number,
    subscriptionPeriodEnd: number,
    numTokens: number,
    lotSize: number,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey,
    baseAccount: PublicKey,
    quoteMint: PublicKey,
    quoteAccount: PublicKey
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const baseVault = await this.baseVault(name, baseMint);

    return this.program.instruction.config(
      new BN(optionExpiration),
      new BN(subscriptionPeriodEnd),
      new BN(numTokens),
      new BN(lotSize),
      name,
      {
        accounts: {
          authority,
          soAuthority: authority,
          state,
          baseVault,
          baseAccount,
          baseMint,
          quoteAccount,
          quoteMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
      }
    );
  }

  /**
   * Create an instruction for init strike
   */
  public async createInitStrikeInstruction(
    strike: number,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const optionMint = await this.soMint(strike, name, baseMint);
    return this.program.instruction.initStrike(new BN(strike), {
      accounts: {
        authority,
        state,
        optionMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
    });
  }

  /**
   * Create an instruction for issue
   */
  public async createIssueInstruction(
    amount: number,
    strike: number,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey,
    userSoAccount: PublicKey
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const optionMint = await this.soMint(strike, name, baseMint);

    return this.program.instruction.issue(new BN(amount), new BN(strike), {
      accounts: {
        authority,
        state,
        optionMint,
        userSoAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  }

  /**
   * Create an instruction for add tokens
   */
  public async createAddTokensInstruction(
    amount: number,
    name: string,
    authority: PublicKey,
    baseAccount: PublicKey
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      baseAccount
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const baseVault = await this.baseVault(name, baseMint);

    return this.program.instruction.addTokens(new BN(amount), {
      accounts: {
        authority,
        state,
        baseVault,
        baseAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  }

  /**
   * Create an instruction for exercise
   */
  public async createExerciseInstruction(
    amount: number,
    name: string,
    strike: number,
    authority: PublicKey,
    userSoAccount: PublicKey,
    userQuoteAccount: PublicKey,
    userBaseAccount: PublicKey
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      userBaseAccount
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const stateObj = await this.program.account.state.fetch(state);

    const optionMint: PublicKey = (await getAccount(
      this.connection,
      userSoAccount
    )).mint;

    const baseVault = await this.baseVault(name, baseMint);

    const quoteAccount: PublicKey = stateObj.quoteAccount;
    const quoteMint: PublicKey = stateObj.quoteMint;
    const feeQuoteAccount = await this.getFeeAccount(quoteMint);

    return this.program.instruction.exercise(new BN(amount), new BN(strike), {
      accounts: {
        authority,
        state,
        userSoAccount,
        optionMint,
        userQuoteAccount,
        projectQuoteAccount: quoteAccount,
        feeQuoteAccount,
        baseVault,
        userBaseAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  }

  /**
   * Create an instruction for withdraw
   */
  public async createWithdrawInstruction(
    name: string,
    authority: PublicKey,
    baseAccount: PublicKey
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      baseAccount
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const baseVault = await this.baseVault(name, baseMint);

    return this.program.instruction.withdraw({
      accounts: {
        authority,
        state,
        baseVault,
        baseAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      },
    });
  }
}
