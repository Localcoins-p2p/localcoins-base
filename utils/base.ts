export const contractAddress = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B';
export const baseSepolia = {
  chainId: '0x14a34',
  chainName: 'Base Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
};
export const contractABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'addAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'AdminAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'AdminRemoved',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_seller',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'createEscrow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'escrowId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'escrowAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EscrowCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'adminToRemove',
        type: 'address',
      },
    ],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'admins',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'escrows',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextEscrowId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const escrowABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_seller',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '_admins',
        type: 'address[]',
      },
    ],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
    ],
    name: 'BuyerAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'BuyerDisputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'FundsDeposited',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'FundsRefunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'FundsReleased',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'FundsReleasedByAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'FundsReleasedToBuyer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'FundsReleasedToSeller',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'MarkedPaid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PaymentConfirmed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'SellerDisputed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_buyer',
        type: 'address',
      },
    ],
    name: 'addBuyer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'admins',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'amount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'buyer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'buyerDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'confirmPayment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'currentState',
    outputs: [
      {
        internalType: 'enum Escrow.State',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeCollector',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isComplete',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'markPaid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'releaseFundsToBuyer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'releaseFundsToSeller',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'seller',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sellerDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
