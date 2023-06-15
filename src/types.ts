import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export type State = {
        soName: string
        authority: PublicKey,
        optionsAvailable: BN,
        optionExpiration: BN,
        subscriptionPeriodEnd: BN,
        baseDecimals: number,
        quoteDecimals: number,
        baseMint: PublicKey,
        quoteMint: PublicKey,
        quoteAccount: PublicKey,
        lotSize: BN,
        stateBump: number,
        vaultBump: number,
        strikes: Array<BN>,
        issueAuthority: PublicKey,
}