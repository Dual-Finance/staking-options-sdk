import {
  Commitment,
  ConfirmOptions,
  Connection,
  ConnectionConfig,
  Keypair,
  PublicKey,
} from '@solana/web3.js';
import {
  Account,
  getAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  AnchorProvider,
  BN,
  Program,
  Wallet,
  Idl,
  web3,
  utils,
} from '@project-serum/anchor';
import stakingOptionsIdl from './staking_options_idl.json';

export const STAKING_OPTIONS_PK: PublicKey = new PublicKey('4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7');
export const DUAL_DAO_WALLET_PK: PublicKey = new PublicKey('7Z36Efbt7a4nLiV7s5bY7J2e4TJ6V9JEKGccsy2od2bE');

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
  constructor(rpcUrl: string, commitment: Commitment | string = 'finalized') {
    this.commitment = commitment as Commitment;
    this.connection = new Connection(
      rpcUrl,
      (this.commitment as Commitment) || 'finalized',
    );

    const opts: ConfirmOptions = {
      preflightCommitment: 'finalized',
      commitment: 'finalized',
    };

    // Public key and payer not actually needed since this does not send transactions.
    const wallet: Wallet = {
      publicKey: STAKING_OPTIONS_PK,
      signAllTransactions: async (txs) => txs,
      signTransaction: async (tx) => tx,
      payer: new Keypair(),
    };

    const provider = new AnchorProvider(this.connection, wallet, opts);
    this.program = new Program(
      // @ts-ignore
      stakingOptionsIdl as Idl,
      STAKING_OPTIONS_PK,
      provider,
    );
  }

  /**
   * Convert a number to bytes in the format that is used in ata seeds.
   */
  private static toBeBytes(x: number) {
    const y = Math.floor(x / 2 ** 32);
    return Uint8Array.from(
      [y, y << 8, y << 16, y << 24, x, x << 8, x << 16, x << 24].map(
        (z) => z >>> 24,
      ),
    );
  }

  /**
   * Get the public key for the staking options state.
   */
  public async state(name: string, baseMint: PublicKey): Promise<PublicKey> {
    const [state, _stateBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode('so-config')),
        Buffer.from(utils.bytes.utf8.encode(name)),
        baseMint.toBuffer(),
      ],
      this.program.programId,
    );
    return state;
  }

  /**
   * Get the state object for a staking options state.
   */
  public async getState(name: string, baseMint: PublicKey) {
    const state = await this.state(name, baseMint);
    const stateObj = await this.program.account.state.fetch(state, 'single');
    return stateObj;
  }

  /**
   * Get the public key for a staking option mint. This is the option token mint.
   */
  public async soMint(
    strike: number,
    name: string,
    baseMint: PublicKey,
  ): Promise<PublicKey> {
    const state = await this.state(name, baseMint);
    const [optionMint, _optionMintBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode('so-mint')),
        state.toBuffer(),
        StakingOptions.toBeBytes(strike),
      ],
      this.program.programId,
    );
    return optionMint;
  }

  /**
   * Get the public key for a reverse staking option mint. This is the option
   * token for the reverse option.
   */
  public async reverseSoMint(
    strike: number,
    name: string,
    baseMint: PublicKey,
  ): Promise<PublicKey> {
    const state = await this.state(name, baseMint);
    const [reverseOptionMint, _reverseOptionMintBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode('reverse-so-mint')),
        state.toBuffer(),
        StakingOptions.toBeBytes(strike),
      ],
      this.program.programId,
    );
    return reverseOptionMint;
  }

  /**
   * Get the public key for a staking option vault. This is where the base tokens
   * are stored.
   */
  public async baseVault(name: string, baseMint: PublicKey) {
    const [baseVault, _baseVaultBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode('so-vault')),
        Buffer.from(utils.bytes.utf8.encode(name)),
        baseMint.toBuffer(),
      ],
      this.program.programId,
    );
    return baseVault;
  }

  /**
   * Get the public key for a staking option vault. This is where the quote tokens
   * are stored when using a reversible option.
   */
  public async quoteVault(name: string, baseMint: PublicKey) {
    const [quoteVault, _quoteVaultBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode('so-reverse-vault')),
        Buffer.from(utils.bytes.utf8.encode(name)),
        baseMint.toBuffer(),
      ],
      this.program.programId,
    );
    return quoteVault;
  }

  /**
   * Get the public key for where fees are accrued.
   */
  public static async getFeeAccount(mint: PublicKey) {
    const feeAccount = await getAssociatedTokenAddress(
      mint,
      DUAL_DAO_WALLET_PK,
      true,
    );
    return feeAccount;
  }

  /**
   * Create an instruction for config
   */
  public async createConfigInstruction(
    optionExpiration: number,
    subscriptionPeriodEnd: number,
    numTokens: BN,
    lotSize: BN,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey,
    baseAccount: PublicKey,
    quoteMint: PublicKey,
    quoteAccount: PublicKey,
    soAuthority?: PublicKey,
    issueAuthority?: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const baseVault = await this.baseVault(name, baseMint);
    const quoteVault = await this.quoteVault(name, baseMint);

    return this.program.instruction.configV3(
      new BN(optionExpiration),
      new BN(subscriptionPeriodEnd),
      numTokens,
      lotSize,
      name,
      {
        accounts: {
          authority,
          soAuthority: soAuthority || authority,
          issueAuthority: issueAuthority || authority,
          state,
          baseVault,
          quoteVault,
          baseAccount,
          quoteAccount,
          baseMint,
          quoteMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
      },
    );
  }

  /**
   * Create an instruction for init strike
   */
  public async createInitStrikeInstruction(
    strike: BN,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const optionMint = await this.soMint(strike, name, baseMint);
    return this.program.instruction.initStrike(strike, {
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
   * Create an instruction for init strike reversible
   */
  public async createInitStrikeReversibleInstruction(
    strike: BN,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const optionMint = await this.soMint(strike, name, baseMint);
    const reverseOptionMint = await this.reverseSoMint(strike, name, baseMint);
    return this.program.instruction.initStrikeReversible(strike, {
      accounts: {
        authority,
        state,
        optionMint,
        reverseOptionMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
    });
  }

  /**
   * Create an instruction for naming a token. To be called after initStrike.
   */
  public async createNameTokenInstruction(
    strike: BN,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const optionMint = await this.soMint(strike, name, baseMint);
    const metaplexId = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
    const [optionMintMetadataAccount, _optionMintMetadataBump] = (
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode('metadata')),
          metaplexId.toBuffer(),
          optionMint.toBuffer(),
        ],
        metaplexId,
      ));

    return this.program.instruction.nameToken(strike, {
      accounts: {
        authority,
        payer: authority,
        state,
        optionMint,
        optionMintMetadataAccount,
        tokenMetadataProgram: metaplexId,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
    });
  }

  /**
   * Create an instruction for issue
   */
  public async createIssueInstruction(
    amount: BN,
    strike: BN,
    name: string,
    authority: PublicKey,
    baseMint: PublicKey,
    userSoAccount: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const state = await this.state(name, baseMint);
    const optionMint = await this.soMint(strike, name, baseMint);

    return this.program.instruction.issue(amount, strike, {
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
    amount: BN,
    name: string,
    authority: PublicKey,
    baseAccount: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      baseAccount,
      'single',
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const baseVault = await this.baseVault(name, baseMint);

    return this.program.instruction.addTokens(amount, {
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
    amount: BN,
    strike: BN,
    name: string,
    authority: PublicKey,
    userSoAccount: PublicKey,
    userQuoteAccount: PublicKey,
    userBaseAccount: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      userBaseAccount,
      'single',
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const stateObj = await this.getState(name, baseMint);

    const optionMint: PublicKey = (await getAccount(
      this.connection,
      userSoAccount,
      'single',
    )).mint;

    const baseVault = await this.baseVault(name, baseMint);

    const { quoteAccount } = stateObj;
    const { quoteMint } = stateObj;
    const feeQuoteAccount = await StakingOptions.getFeeAccount(quoteMint);

    return this.program.instruction.exercise(amount, strike, {
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
   * Create an instruction for exercise which can be reversed. Must follow an
   * initStrikeReversible.
   */
  public async createExerciseReversibleInstruction(
    amount: BN,
    strike: BN,
    name: string,
    authority: PublicKey,
    userSoAccount: PublicKey,
    userReverseSoAccount: PublicKey,
    userQuoteAccount: PublicKey,
    userBaseAccount: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      userBaseAccount,
      'single',
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const stateObj = await this.getState(name, baseMint);

    const optionMint: PublicKey = (await getAccount(
      this.connection,
      userSoAccount,
      'single',
    )).mint;

    const reverseOptionMint: PublicKey = await this.reverseSoMint(Number(strike), name, baseMint);

    const baseVault = await this.baseVault(name, baseMint);
    const quoteVault = await this.quoteVault(name, baseMint);

    const { quoteAccount } = stateObj;
    const { quoteMint } = stateObj;
    const feeQuoteAccount = await StakingOptions.getFeeAccount(quoteMint);

    return this.program.instruction.exerciseReversible(amount, strike, {
      accounts: {
        authority,
        state,
        userSoAccount,
        userReverseSoAccount,
        optionMint,
        reverseOptionMint,
        userQuoteAccount,
        projectQuoteAccount: quoteAccount,
        feeQuoteAccount,
        baseVault,
        quoteVault,
        userBaseAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });
  }

  /**
   * Create an instruction for a reverse exercise. This undoes a previous
   * exerciseReversible.
   */
  public async createReverseExerciseInstruction(
    amount: BN,
    strike: BN,
    name: string,
    authority: PublicKey,
    userSoAccount: PublicKey,
    userReverseSoAccount: PublicKey,
    userQuoteAccount: PublicKey,
    userBaseAccount: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      userBaseAccount,
      'single',
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const stateObj = await this.getState(name, baseMint);

    const optionMint: PublicKey = (await getAccount(
      this.connection,
      userSoAccount,
      'single',
    )).mint;

    const reverseOptionMint: PublicKey = await this.reverseSoMint(Number(strike), name, baseMint);

    const baseVault = await this.baseVault(name, baseMint);
    const quoteVault = await this.quoteVault(name, baseMint);

    const { quoteAccount } = stateObj;
    const { quoteMint } = stateObj;
    const feeQuoteAccount = await StakingOptions.getFeeAccount(quoteMint);

    return this.program.instruction.reverseExercise(amount, strike, {
      accounts: {
        authority,
        state,
        userSoAccount,
        userReverseSoAccount,
        optionMint,
        reverseOptionMint,
        userQuoteAccount,
        projectQuoteAccount: quoteAccount,
        feeQuoteAccount,
        baseVault,
        quoteVault,
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
    baseAccount: PublicKey,
    quoteAccount?: PublicKey,
  ): Promise<web3.TransactionInstruction> {
    const baseAccountData: Account = await getAccount(
      this.connection,
      baseAccount,
      'single',
    );
    const baseMint = baseAccountData.mint;

    const state = await this.state(name, baseMint);
    const baseVault = await this.baseVault(name, baseMint);

    try {
      // If the quote vault exists, use the withdrawAll.
      const quoteVault = await this.quoteVault(name, baseMint);

      await getAccount(
        this.connection,
        quoteVault,
        'single',
      );
      if (quoteAccount && quoteVault) {
        return this.program.instruction.withdrawAll({
          accounts: {
            authority,
            state,
            baseVault,
            quoteVault,
            baseAccount,
            quoteAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
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

  /**
   * Create an instruction for withdraw with the mint as a param. This is needed
   * when the recipient account is created in another instruction in this
   * transaction, so we cannot check it onchain to get the mint.
   */
  public async createWithdrawInstructionWithMint(
    name: string,
    authority: PublicKey,
    baseAccount: PublicKey,
    baseMint: PublicKey,
  ): Promise<web3.TransactionInstruction> {
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
