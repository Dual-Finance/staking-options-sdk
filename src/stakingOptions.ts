import {
  Commitment,
  ConfirmOptions,
  Connection,
  ConnectionConfig,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  AnchorProvider,
  BN,
  Program,
  Wallet,
  Idl,
  web3,
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
   * @param cluster The solana cluster endpoint used for the connecton
   */
  constructor(
    rpcUrl: string,
    programId: string,
    commitment: Commitment | string = "finalized"
  ) {
    this.commitment = commitment as Commitment;
    this.connection = new Connection(
      rpcUrl,
      (this.commitment as Commitment) || "finalized"
    );

    const opts: ConfirmOptions = {
      preflightCommitment: "finalized",
      commitment: "finalized",
    };

    const wallet: Wallet = {
      publicKey: new PublicKey("4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"),
      signAllTransactions: async (txs) => txs,
      signTransaction: async (tx) => tx,
      payer: new Keypair(),
    };

    const provider = new AnchorProvider(this.connection, wallet, opts);
    this.program = new Program(staking_options_idl as Idl, programId, provider);
  }

  /**
   * Create an instruction for config
   *
   * @param
   * @returns
   */
  public async createConfigInstruction() {
    return this.program.instruction.config(
      new BN(0),
      new BN(0),
      new BN(0),
      new BN(0),
      "",
      {
        accounts: {
          authority:
            this.program.provider.publicKey ||
            new PublicKey("4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"),
          soAuthority: new PublicKey(
            "4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"
          ),
          state: new PublicKey("4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"),
          baseVault: new PublicKey(
            "4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"
          ),
          baseAccount: new PublicKey(
            "4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"
          ),
          baseMint: new PublicKey(
            "4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"
          ),
          quoteAccount: new PublicKey(
            "4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"
          ),
          quoteMint: new PublicKey(
            "4yx1NJ4Vqf2zT1oVLk4SySBhhDJXmXFt88ncm4gPxtL7"
          ),
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        },
      }
    );
  }
}
