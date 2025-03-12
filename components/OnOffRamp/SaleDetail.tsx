import { useState, useEffect } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import ShadowBox from '../Elements/ShadowBox';

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
  //   const id = searchParams.get('id')
  const id = 's1';
  const router = useRouter();
  const [saleData, setSaleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (id && mockSaleDetails[id as keyof typeof mockSaleDetails]) {
      // Simulate API call
      setTimeout(() => {
        setSaleData(mockSaleDetails[id as keyof typeof mockSaleDetails]);
        setLoading(false);
      }, 500);
    } else {
      router.push('/');
    }
  }, [id, router]);

  const getStatus = (txn: any) => {
    if (txn?.canceledAt)
      return { label: 'Canceled', color: 'bg-red-500/20 text-red-900' };
    if (txn?.finishedAt)
      return { label: 'Finished', color: 'bg-green-500/20 text-green-900' };
    if (txn?.paidAt)
      return { label: 'Paid', color: 'bg-blue-500/20 text-blue-900' };
    return { label: 'Pending', color: 'bg-yellow-500/20 text-yellow-900' };
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-primary">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-custom-green-medium/30 rounded mb-4"></div>
          <div className="h-64 w-96 bg-custom-green-medium/20 rounded"></div>
        </div>
      </div>
    );
  }

  const status = getStatus(saleData);
  const isSeller = saleData.id.startsWith('s');
  const counterparty = isSeller ? saleData.buyer : saleData.seller;
  const paymentInfo = isSeller
    ? saleData.seller.paymentMethods[0]
    : saleData.seller.paymentMethods[0];

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

          <ShadowBox className="bg-secondary flex flex-col md:flex-row gap-4 p-4">
            {/* Left side - Sale info */}
            <div className="flex-1 flex flex-col gap-4">
              <ShadowBox className="flex items-center justify-between  text-secondary bg-primary">
                <div>
                  <div className="text-xs uppercase mb-1">Transaction ID</div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-medium ">{saleData.id}</h1>
                    <button
                      onClick={() =>
                        copyToClipboard(saleData.id, 'Transaction ID')
                      }
                      className="hover:text-white transition-all"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <span
                  className={`py-1 px-3 rounded-full text-xs font-medium ${status.color}`}
                >
                  {status.label}
                </span>
              </ShadowBox>

              <ShadowBox className="bg-primary text-secondary p-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs  uppercase mb-1">Amount</div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="" />
                      <span className=" font-medium">
                        {saleData.amount} {saleData.currency.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase mb-1">Unit Price</div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="" />
                      <span className=" font-medium">
                        ${saleData.unitPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase mb-1">Blockchain</div>
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="" />
                      <span className=" font-medium capitalize">
                        {saleData.blockchain}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs  uppercase mb-1">Created At</div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="" />
                      <span className=" font-medium">
                        {new Date(saleData.createdAt).toLocaleDateString()}{' '}
                        {new Date(saleData.createdAt).toLocaleTimeString()}
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
                      {saleData.tx}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          copyToClipboard(saleData.tx, 'Transaction Hash')
                        }
                        className=" hover:text-white transition-all"
                      >
                        <Copy size={14} />
                      </button>
                      <a
                        href={`https://etherscan.io/tx/${saleData.tx}`}
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
                    <div className="font-medium">{counterparty.name}</div>
                    <div className=" text-sm font-mono">
                      {counterparty.publicKey}
                    </div>
                  </div>
                </div>
              </ShadowBox>
            </div>

            {/* Right side - Payment proof */}
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-lg font-medium text-white ">Payment Proof</h2>

              {saleData.screenshots && saleData.screenshots.length > 0 ? (
                <ShadowBox className=" p-4 rounded-lg  bg-white flex items-center justify-center w-60 h-32 overflow-hidden">
                  <Image
                    src={saleData.screenshots[0].imageUrl}
                    alt="Payment proof"
                    className={`w-full h-auto rounded object-cover ${
                      imageLoaded ? 'img-loaded' : 'img-loading'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    width={500}
                    height={500}
                  />
                </ShadowBox>
              ) : (
                <ShadowBox className=" flex flex-col items-center justify-center w-60 h-32">
                  <div className=" mb-2">No payment proof available</div>
                </ShadowBox>
              )}

              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-medium text-white">
                  Payment Method
                </h2>
                <ShadowBox className="bg-primary text-secondary p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white font-medium">
                      {paymentInfo.name}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs  uppercase ">Account Name</div>
                      <div className="">{paymentInfo.accountName}</div>
                    </div>

                    <div>
                      <div className="text-xs  uppercase ">Account Number</div>
                      <div className="flex items-center gap-2">
                        <div className="">{paymentInfo.accountNumber}</div>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              paymentInfo.accountNumber,
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
