'use client';

import { useState, useEffect, useContext } from 'react';
import {
  ArrowLeft,
  Layers,
  Copy,
  ExternalLink,
  Clock,
  User,
  DollarSign,
  CreditCard,
} from 'lucide-react';

import Image from 'next/image';
import toast from 'react-hot-toast';
import ShadowBox from '../Elements/ShadowBox';
import { gql, useMutation, useQuery } from 'urql';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppContext } from '@/utils/context';
import { addRemoveBuyerMutation } from '../Elements/BuyButton';

export const GET_SALE = gql`
  query Sales($salesId: String) {
    sales(id: $salesId) {
      count
      sales {
        amount
        blockchain
        buyer {
          id
          publicKey
        }
        createdAt
        id
        tx
        onChainSaleId
        currency
        seller {
          name
          publicKey
          id
          paymentMethods {
            id
            name
            accountNumber
            accountName
          }
        }
        screenshotMehtods
        unitPrice
      }
    }
  }
`;
const ADD_SCREENSHOT = gql`
  mutation AddScreenshot(
    $saleId: String!
    $imageUrl: String!
    $method: String!
    $referenceId: String!
  ) {
    addScreenshot(
      saleId: $saleId
      imageUrl: $imageUrl
      method: $method
      referenceId: $referenceId
    ) {
      id
      imageUrl
      method
      paidById
    }
  }
`;

const IS_REFERENCE_ID_CORRECT = gql`
  mutation IsReferenceIdCorrect($saleId: String!, $referenceId: String!) {
    isReferenceIdCorrect(id: $saleId, referenceId: $referenceId) {
      status
    }
  }
`;

const MARK_PAID = gql`
  mutation MarkPaid($saleId: String!, $referenceId: String!) {
    markSalePaid(id: $saleId, referenceId: $referenceId) {
      id
      paidAt
    }
  }
}
`;

export const CANCEL_SALE = gql`
  mutation CancelSale($cancelSaleId: String!) {
    cancelSale(id: $cancelSaleId) {
      id
    }
  }
`;

const MARK_FINISHED = gql`
  mutation MarkSaleFinished($markSaleFinishedId: String!) {
    markSaleFinished(id: $markSaleFinishedId) {
      id
    }
  }
`;

const MARK_DISPUTED = gql`
  mutation Mutation($saleId: String!) {
    markDisputed(saleId: $saleId) {
      id
    }
  }
`;

// Mock data for sale details
const mockSaleDetails = {
  s1: {
    id: 's1',
    amount: 0.00001,
    blockchain: 'base',
    currency: 'eth',
    tx: '0x12345abcde67890fghij12345abcde67890fghij',
    unitPrice: 121624,
    profitPercentage: 0,
    createdAt: new Date(2023, 4, 15).toISOString(),
    paidAt: new Date(2023, 4, 15, 2, 30).toISOString(),
    finishedAt: null,
    canceledAt: null,
    buyer: {
      name: 'Ali Nauroze',
      publicKey: '0x1abc...f456',
      id: 'buyer1',
    },
    seller: {
      name: 'Your Account',
      publicKey: '0x7def...890a',
      id: 'seller1',
      paymentMethods: [
        {
          id: 'pm1',
          name: 'Bank Transfer',
          accountNumber: '********1234',
          accountName: 'John Doe',
        },
      ],
    },
    onChainSaleId: 'on-chain-123',
    screenshots: [
      { imageUrl: '/lovable-uploads/9e0f2821-983d-47db-8d87-cbb3f07d600c.png' },
    ],
  },
  s2: {
    id: 's2',
    amount: 0.05,
    blockchain: 'ethereum',
    currency: 'eth',
    tx: '0x67890fghij12345abcde67890fghij12345abcde',
    unitPrice: 132750,
    profitPercentage: 2.5,
    createdAt: new Date(2023, 4, 10).toISOString(),
    paidAt: new Date(2023, 4, 10, 1, 45).toISOString(),
    finishedAt: new Date(2023, 4, 10, 3, 15).toISOString(),
    canceledAt: null,
    buyer: {
      name: 'Sarah Chen',
      publicKey: '0x2bcd...e567',
      id: 'buyer2',
    },
    seller: {
      name: 'Your Account',
      publicKey: '0x7def...890a',
      id: 'seller1',
      paymentMethods: [
        {
          id: 'pm1',
          name: 'Bank Transfer',
          accountNumber: '********1234',
          accountName: 'John Doe',
        },
      ],
    },
    onChainSaleId: 'on-chain-456',
    screenshots: [
      { imageUrl: '/lovable-uploads/6553a4e4-15bf-4590-9285-9d9feea14485.png' },
    ],
  },
  b1: {
    id: 'b1',
    amount: 0.02,
    blockchain: 'polygon',
    currency: 'matic',
    tx: '0xabcde12345fghij67890abcde12345fghij67890',
    unitPrice: 98450,
    profitPercentage: 1.2,
    createdAt: new Date(2023, 4, 14).toISOString(),
    paidAt: new Date(2023, 4, 14, 4, 20).toISOString(),
    finishedAt: null,
    canceledAt: null,
    seller: {
      name: 'Marcus Johnson',
      publicKey: '0x3cde...f678',
      id: 'seller2',
      paymentMethods: [
        {
          id: 'pm2',
          name: 'PayPal',
          accountNumber: 'marcus@example.com',
          accountName: 'Marcus Johnson',
        },
      ],
    },
    buyer: {
      name: 'Your Account',
      publicKey: '0x8efg...901b',
      id: 'buyer3',
    },
    onChainSaleId: 'on-chain-789',
    screenshots: [
      { imageUrl: '/lovable-uploads/9e0f2821-983d-47db-8d87-cbb3f07d600c.png' },
    ],
  },
};

const SaleDetail = () => {
  const searchParams = useSearchParams();
  const salesId = searchParams.get('id');
  const [sale, setSale] = useState<any>();
  const [image, setImage] = useState('');
  const [referenceId, setReferenceId] = useState();
  // console.log("img",image)
  const [{ fetching, data, error: getSaleError }, fetchSale] = useQuery({
    query: GET_SALE,
    variables: { salesId },
    pause: !salesId,
  });
  const [{}, checkIsReferenceIdCorrect] = useMutation(IS_REFERENCE_ID_CORRECT);
  const [{}, addScreenshotMutation] = useMutation(ADD_SCREENSHOT);
  const [{ fetching: fetchingRemoveBuyer }, removeBuyer] = useMutation(
    addRemoveBuyerMutation
  );
  const [disputeLoading, setDisputeLoading] = useState(false);
  const [{ fetching: _markingDisputed }, markDisputedMutation] =
    useMutation(MARK_DISPUTED);
  const [{ fetching: canceling }, cancelSale] = useMutation(CANCEL_SALE);
  const [{}, markPaidMutation] = useMutation(MARK_PAID);

  const paymentMethods = sale?.seller?.paymentMethods || [];

  const [_sale] = data?.sales?.sales || [];
  const {
    context: { user },
  } = useContext(AppContext);

  useEffect(() => {
    setSale(_sale);
    const refetch = _sale && !_sale?.paidAt && !_sale?.canceledAt;
    if (refetch) {
      setTimeout(() => {
        fetchSale({ requestPolicy: 'network-only' });
      }, 3000);
    }
  }, [_sale]);

  const firstTimeLoading = !sale && fetching;

  const isSeller = user?.id === sale?.seller?.id;
  const isBuyer = user?.id === sale?.buyer?.id;

  const counterparty = isSeller ? sale?.buyer : sale?.seller; // 'seller' or 'buyer'

  const showConfirmPaymentReceivedButton =
    isSeller && !sale?.paidAt && !sale?.canceledAt;
  const hideConfirmButtonShowDisputes =
    showConfirmPaymentReceivedButton && !sale?.hasScreenshots;
  console.log('<<<<', showConfirmPaymentReceivedButton, sale?.hasScreenshots);
  const showConfirmPaymentSentButton =
    isBuyer && !sale?.paidAt && !sale?.isCanceled;
  const showClaimPaymentButton = isBuyer && sale?.paidAt && !sale.finishedAt;

  const showSellerDisputeButton =
    isSeller &&
    sale?.screenshots?.length > 0 &&
    !sale.isDisputed &&
    !sale.isCanceled &&
    !sale.isFinished;
  const showBuyerDisputeButton =
    isBuyer &&
    sale?.screenshots?.length > 0 &&
    !sale.isDisputed &&
    !sale.isCanceled &&
    !sale.isFinished;

  const router = useRouter();

  const getStatus = (txn: any) => {
    if (txn?.canceledAt)
      return { label: 'Canceled', color: 'bg-red-500/20 text-red-900' };
    if (txn?.finishedAt)
      return { label: 'Finished', color: 'bg-green-500/20 text-green-900' };
    if (txn?.paidAt)
      return { label: 'Paid', color: 'bg-blue-500/20 text-blue-900' };
    return { label: 'Pending', color: 'bg-yellow-500/50 text-yellow-900' };
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (firstTimeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-custom-green-medium/30 rounded mb-4"></div>
          <div className="h-64 w-96 bg-custom-green-medium/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (getSaleError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-red-500">Error fetching sale details</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ShadowBox className="bg-secondary bg-opacity-70 w-[722px] p-4">
        <ShadowBox className="bg-[#D2E1D9] flex flex-col gap-4 p-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-secondary transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <ShadowBox className="bg-secondary flex flex-col md:flex-row gap-4 p-4 ">
            {/* Left side - Sale info */}
            <div className="flex-1 flex flex-col gap-4 max-w-[19rem] ">
              <ShadowBox className="flex items-center justify-between  text-secondary bg-primary">
                <div>
                  <div className="text-xs uppercase mb-1">Transaction ID</div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-medium ">
                      {sale?.id || 'N/A'}
                    </h1>
                    <button
                      onClick={() =>
                        copyToClipboard(sale?.id || '', 'Transaction ID')
                      }
                      className="hover:text-white transition-all"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <span
                  className={`py-1 px-3 rounded-full text-xs font-medium ${
                    getStatus(sale)?.color || 'bg-gray-500/20 text-gray-900'
                  }`}
                >
                  {getStatus(sale)?.label || 'Unknown'}
                </span>
              </ShadowBox>

              <ShadowBox className="bg-primary text-secondary p-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs  uppercase ">Amount</div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="" />
                      <span className=" font-medium">
                        {sale?.amount || 'N/A'}{' '}
                        {sale?.currency?.toUpperCase() || ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase ">Unit Price</div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="" />
                      <span className=" font-medium">
                        ${sale?.unitPrice?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase ">Blockchain</div>
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="" />
                      <span className=" font-medium capitalize">
                        {sale?.blockchain || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs  uppercase ">Created At</div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="" />
                      <span className="font-medium">
                        {sale?.createdAt
                          ? new Date(sale.createdAt).toLocaleDateString()
                          : 'N/A'}{' '}
                        {sale?.createdAt
                          ? new Date(sale.createdAt).toLocaleTimeString()
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </ShadowBox>

              <ShadowBox className="bg-primary text-secondary p-4">
                <p className="text-xs uppercase ">Transaction Hash</p>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm truncate max-w-[300px]">
                      {sale?.tx || 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          copyToClipboard(sale?.tx || '', 'Transaction Hash')
                        }
                        className=" hover:text-white transition-all"
                      >
                        <Copy size={14} />
                      </button>
                      <a
                        href={`https://etherscan.io/tx/${sale?.tx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:text-white transition-all"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </ShadowBox>

              <ShadowBox className="bg-primary text-secondary p-4">
                <div className="text-xs  uppercase ">Counterparty</div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center">
                    <User size={18} className="" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {counterparty?.name || 'N/A'}
                    </div>
                    <div className=" text-sm font-mono">
                      {counterparty?.publicKey || 'N/A'}
                    </div>
                  </div>
                </div>
              </ShadowBox>
            </div>

            {/* Right side - Payment proof */}
            <div className="flex-1 flex flex-col gap-4 max-w-[19rem] ">
              <h2 className="text-lg font-medium text-white ">Payment Proof</h2>

              {sale?.screenshots && sale?.screenshots?.length > 0 ? (
                <ShadowBox className=" p-4 bg-white flex items-center justify-center w-60 h-32 overflow-hidden">
                  <Image
                    src={sale?.screenshots[0]?.imageUrl}
                    alt="Payment proof"
                    className={`w-full h-auto  object-cover rounded-2xl`}
                    width={500}
                    height={500}
                  />
                </ShadowBox>
              ) : (
                <ShadowBox className=" p-4 rounded-2xl bg-primary text-secondary flex items-center justify-center w-[19rem] h-32 overflow-hidden">
                  <p>No payment proof available</p>
                </ShadowBox>
              )}

              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-medium text-white">
                  Payment Method
                </h2>
                <ShadowBox className="bg-primary text-secondary p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white font-medium">
                      {paymentMethods?.name || 'N/A'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs  uppercase ">Account Name</div>
                      <div className="">
                        {paymentMethods?.accountName || 'N/A'}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs  uppercase ">Account Number</div>
                      <div className="flex items-center gap-2">
                        <div className="">
                          {paymentMethods?.accountNumber || 'N/A'}
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              paymentMethods?.accountNumber || '',
                              'Account Number'
                            )
                          }
                          className=" hover:text-white transition-all"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </ShadowBox>
              </div>
            </div>
          </ShadowBox>
        </ShadowBox>
      </ShadowBox>
    </div>
  );
};

export default SaleDetail;
