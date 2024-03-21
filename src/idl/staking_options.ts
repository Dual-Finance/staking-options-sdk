export type StakingOptions = {
  "version": "0.1.1",
  "name": "staking_options",
  "instructions": [
    {
      "name": "addTokens",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the intended stake."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held. Controlled by this program."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the additional tokens are coming from."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numTokensToAdd",
          "type": "u64"
        }
      ]
    },
    {
      "name": "config",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Does not have to match the authority for the SO State, but it can."
          ]
        },
        {
          "name": "soAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The authority that will be required init strike and withdrawing."
          ]
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are coming from."
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Saved for later. Not used. TokenAccount instead of AccountInfo in order",
            "to get the anchor type checking."
          ]
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of base tokens."
          ]
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of quote tokens. Needed for storing the number of decimals."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionExpiration",
          "type": "u64"
        },
        {
          "name": "subscriptionPeriodEnd",
          "type": "u64"
        },
        {
          "name": "numTokens",
          "type": "u64"
        },
        {
          "name": "lotSize",
          "type": "u64"
        },
        {
          "name": "soName",
          "type": "string"
        }
      ]
    },
    {
      "name": "configV2",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Does not have to match the authority for the SO State, but it can."
          ]
        },
        {
          "name": "soAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The authority that will be required init strike and withdrawing."
          ]
        },
        {
          "name": "issueAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "An authority that can be used for issuing tokens. Should be a PDA."
          ]
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are coming from."
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Saved for later. Not used. TokenAccount instead of AccountInfo in order",
            "to get the anchor type checking."
          ]
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of base tokens."
          ]
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of quote tokens. Needed for storing the number of decimals."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionExpiration",
          "type": "u64"
        },
        {
          "name": "subscriptionPeriodEnd",
          "type": "u64"
        },
        {
          "name": "numTokens",
          "type": "u64"
        },
        {
          "name": "lotSize",
          "type": "u64"
        },
        {
          "name": "soName",
          "type": "string"
        }
      ]
    },
    {
      "name": "configV3",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Does not have to match the authority for the SO State, but it can."
          ]
        },
        {
          "name": "soAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The authority that will be required init strike and withdrawing."
          ]
        },
        {
          "name": "issueAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "An authority that can be used for issuing tokens. Should be a PDA."
          ]
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held."
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the quote tokens are going to be held."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are coming from."
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Saved for later. Not used. TokenAccount instead of AccountInfo in order",
            "to get the anchor type checking."
          ]
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of base tokens."
          ]
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of quote tokens. Needed for storing the number of decimals."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionExpiration",
          "type": "u64"
        },
        {
          "name": "subscriptionPeriodEnd",
          "type": "u64"
        },
        {
          "name": "numTokens",
          "type": "u64"
        },
        {
          "name": "lotSize",
          "type": "u64"
        },
        {
          "name": "soName",
          "type": "string"
        }
      ]
    },
    {
      "name": "exercise",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the SO are coming from."
          ]
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Mint is needed to burn the options."
          ]
        },
        {
          "name": "userQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is coming from."
          ]
        },
        {
          "name": "projectQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is going"
          ]
        },
        {
          "name": "feeQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the fee is going"
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location for this SO."
          ]
        },
        {
          "name": "userBaseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "exerciseReversible",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the SO are coming from."
          ]
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Mint is needed to burn the options."
          ]
        },
        {
          "name": "userReverseSoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseOptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is coming from."
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is going. This is held in escrow until the expiration",
            "or used for reverse option."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location for this SO."
          ]
        },
        {
          "name": "userBaseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "reverseExercise",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the SO are coming from."
          ]
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Mint is needed to burn the options."
          ]
        },
        {
          "name": "userReverseSoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseOptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is coming from."
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is going. This is held in escrow until the expiration",
            "or used for reverse option."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location for this SO."
          ]
        },
        {
          "name": "userBaseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initStrike",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initStrikeWithPayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initStrikeReversible",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseOptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "issue",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the options will be sent."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "nameToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "optionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of option tokens."
          ]
        },
        {
          "name": "optionMintMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location"
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are getting returned to"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawAll",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location"
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are getting returned to"
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The quote token location"
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "DUAL DAO owned fee account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "soName",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "optionsAvailable",
            "type": "u64"
          },
          {
            "name": "optionExpiration",
            "type": "u64"
          },
          {
            "name": "subscriptionPeriodEnd",
            "type": "u64"
          },
          {
            "name": "baseDecimals",
            "type": "u8"
          },
          {
            "name": "quoteVaultBump",
            "type": "u8"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "quoteAccount",
            "type": "publicKey"
          },
          {
            "name": "lotSize",
            "type": "u64"
          },
          {
            "name": "stateBump",
            "type": "u8"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "strikes",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "issueAuthority",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WrongMint",
      "msg": "The mint in the SO state did not match the token type being received"
    },
    {
      "code": 6001,
      "name": "Expired",
      "msg": "Expired"
    },
    {
      "code": 6002,
      "name": "NotYetExpired",
      "msg": "NotYetExpired"
    },
    {
      "code": 6003,
      "name": "InvalidState",
      "msg": "State did not match"
    },
    {
      "code": 6004,
      "name": "InvalidVault",
      "msg": "Vault did not match"
    },
    {
      "code": 6005,
      "name": "InvalidMint",
      "msg": "Mint did not match"
    },
    {
      "code": 6006,
      "name": "IncorrectFeeAccount",
      "msg": "Account receiving fees does not match"
    },
    {
      "code": 6007,
      "name": "NotEnoughTokens",
      "msg": "Not enough tokens to issue the SO"
    },
    {
      "code": 6008,
      "name": "IncorrectAuthority",
      "msg": "Incorrect Authority"
    },
    {
      "code": 6009,
      "name": "TooManyStrikes",
      "msg": "Too many strikes"
    },
    {
      "code": 6010,
      "name": "InvalidExpiration",
      "msg": "Invalid expiration"
    },
    {
      "code": 6011,
      "name": "InvalidName",
      "msg": "Invalid name"
    }
  ]
};

export const IDL: StakingOptions = {
  "version": "0.1.1",
  "name": "staking_options",
  "instructions": [
    {
      "name": "addTokens",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the intended stake."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held. Controlled by this program."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the additional tokens are coming from."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "numTokensToAdd",
          "type": "u64"
        }
      ]
    },
    {
      "name": "config",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Does not have to match the authority for the SO State, but it can."
          ]
        },
        {
          "name": "soAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The authority that will be required init strike and withdrawing."
          ]
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are coming from."
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Saved for later. Not used. TokenAccount instead of AccountInfo in order",
            "to get the anchor type checking."
          ]
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of base tokens."
          ]
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of quote tokens. Needed for storing the number of decimals."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionExpiration",
          "type": "u64"
        },
        {
          "name": "subscriptionPeriodEnd",
          "type": "u64"
        },
        {
          "name": "numTokens",
          "type": "u64"
        },
        {
          "name": "lotSize",
          "type": "u64"
        },
        {
          "name": "soName",
          "type": "string"
        }
      ]
    },
    {
      "name": "configV2",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Does not have to match the authority for the SO State, but it can."
          ]
        },
        {
          "name": "soAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The authority that will be required init strike and withdrawing."
          ]
        },
        {
          "name": "issueAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "An authority that can be used for issuing tokens. Should be a PDA."
          ]
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are coming from."
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Saved for later. Not used. TokenAccount instead of AccountInfo in order",
            "to get the anchor type checking."
          ]
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of base tokens."
          ]
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of quote tokens. Needed for storing the number of decimals."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionExpiration",
          "type": "u64"
        },
        {
          "name": "subscriptionPeriodEnd",
          "type": "u64"
        },
        {
          "name": "numTokens",
          "type": "u64"
        },
        {
          "name": "lotSize",
          "type": "u64"
        },
        {
          "name": "soName",
          "type": "string"
        }
      ]
    },
    {
      "name": "configV3",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Does not have to match the authority for the SO State, but it can."
          ]
        },
        {
          "name": "soAuthority",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The authority that will be required init strike and withdrawing."
          ]
        },
        {
          "name": "issueAuthority",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "An authority that can be used for issuing tokens. Should be a PDA."
          ]
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going to be held."
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the quote tokens are going to be held."
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are coming from."
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Saved for later. Not used. TokenAccount instead of AccountInfo in order",
            "to get the anchor type checking."
          ]
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of base tokens."
          ]
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of quote tokens. Needed for storing the number of decimals."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "optionExpiration",
          "type": "u64"
        },
        {
          "name": "subscriptionPeriodEnd",
          "type": "u64"
        },
        {
          "name": "numTokens",
          "type": "u64"
        },
        {
          "name": "lotSize",
          "type": "u64"
        },
        {
          "name": "soName",
          "type": "string"
        }
      ]
    },
    {
      "name": "exercise",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the SO are coming from."
          ]
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Mint is needed to burn the options."
          ]
        },
        {
          "name": "userQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is coming from."
          ]
        },
        {
          "name": "projectQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is going"
          ]
        },
        {
          "name": "feeQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the fee is going"
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location for this SO."
          ]
        },
        {
          "name": "userBaseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "exerciseReversible",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the SO are coming from."
          ]
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Mint is needed to burn the options."
          ]
        },
        {
          "name": "userReverseSoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseOptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is coming from."
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is going. This is held in escrow until the expiration",
            "or used for reverse option."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location for this SO."
          ]
        },
        {
          "name": "userBaseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "reverseExercise",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the SO are coming from."
          ]
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Mint is needed to burn the options."
          ]
        },
        {
          "name": "userReverseSoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseOptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is coming from."
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the payment is going. This is held in escrow until the expiration",
            "or used for reverse option."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location for this SO."
          ]
        },
        {
          "name": "userBaseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the base tokens are going."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initStrike",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initStrikeWithPayer",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initStrikeReversible",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reverseOptionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "issue",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "optionMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userSoAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the options will be sent."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "nameToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "optionMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of option tokens."
          ]
        },
        {
          "name": "optionMintMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "strike",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location"
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are getting returned to"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdrawAll",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "state",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "State holding all the data for the stake that the staker wants to do."
          ]
        },
        {
          "name": "baseVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The base token location"
          ]
        },
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Where the tokens are getting returned to"
          ]
        },
        {
          "name": "quoteVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The quote token location"
          ]
        },
        {
          "name": "quoteAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeQuoteAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "DUAL DAO owned fee account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "soName",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "optionsAvailable",
            "type": "u64"
          },
          {
            "name": "optionExpiration",
            "type": "u64"
          },
          {
            "name": "subscriptionPeriodEnd",
            "type": "u64"
          },
          {
            "name": "baseDecimals",
            "type": "u8"
          },
          {
            "name": "quoteVaultBump",
            "type": "u8"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          },
          {
            "name": "quoteAccount",
            "type": "publicKey"
          },
          {
            "name": "lotSize",
            "type": "u64"
          },
          {
            "name": "stateBump",
            "type": "u8"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          },
          {
            "name": "strikes",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "issueAuthority",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WrongMint",
      "msg": "The mint in the SO state did not match the token type being received"
    },
    {
      "code": 6001,
      "name": "Expired",
      "msg": "Expired"
    },
    {
      "code": 6002,
      "name": "NotYetExpired",
      "msg": "NotYetExpired"
    },
    {
      "code": 6003,
      "name": "InvalidState",
      "msg": "State did not match"
    },
    {
      "code": 6004,
      "name": "InvalidVault",
      "msg": "Vault did not match"
    },
    {
      "code": 6005,
      "name": "InvalidMint",
      "msg": "Mint did not match"
    },
    {
      "code": 6006,
      "name": "IncorrectFeeAccount",
      "msg": "Account receiving fees does not match"
    },
    {
      "code": 6007,
      "name": "NotEnoughTokens",
      "msg": "Not enough tokens to issue the SO"
    },
    {
      "code": 6008,
      "name": "IncorrectAuthority",
      "msg": "Incorrect Authority"
    },
    {
      "code": 6009,
      "name": "TooManyStrikes",
      "msg": "Too many strikes"
    },
    {
      "code": 6010,
      "name": "InvalidExpiration",
      "msg": "Invalid expiration"
    },
    {
      "code": 6011,
      "name": "InvalidName",
      "msg": "Invalid name"
    }
  ]
};
