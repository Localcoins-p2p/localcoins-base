'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import BuyButton from './BuyButton';
import Link from 'next/link';
import { getFromCurrency, getToCurrency } from '@/utils/getCurrency';

interface P2PRowProps {
  advertiser: {
    name: string;
    initials: string;
    orders: number;
    completionRate: string;
  };
  price: number;
  available: number;
  limit: number;
  paymentMethods: Array<{ name: string; color: string }>;
  sale: any;
  type?: 'ALL' | 'BUYER' | 'SELLER';
}

const P2PTableRow: React.FC<P2PRowProps> = ({
  advertiser,
  price,
  available,
  limit,
  paymentMethods,
  sale,
  type,
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };
  return (
    <tr className="border-t py-4 md:py-0 border-gray-700 flex-boxx">
      <td className=" md:py-4 flex flex-col space-x-2">
        <div className="flex items-center gap-x-2">
          <div className="w-[35px] h-[35px] bg-[#FFFFFF] rounded-full flex justify-center items-center">
            {/* <Image
              alt="j"
              src={'/assets/common/j.svg'}
              height={25}
              width={13}
            /> */}
            <div className="text-[20px] font-bold">
              {' '}
              {advertiser?.name ? advertiser.name.charAt(0).toUpperCase() : 'N'}
            </div>
          </div>
          <div className="">
            <div className="font-[700] text-[#FFFFFF] text-[20px]">
              {advertiser?.name}
            </div>
            <div className="text-[13px] font-[400] hidden md:flex text-[#EBEBEB]">
              {advertiser?.orders} orders | {advertiser?.completionRate}{' '}
              completion
            </div>
          </div>
        </div>
        <div className="text-[13px] font-[400] md:hidden text-[#EBEBEB]">
          {advertiser?.orders} orders | {advertiser?.completionRate} completion
        </div>
      </td>
      <td className=" md:py-4 font-bold">
        <span className="text-xl text-[#FFFFFF]">{price}</span>
        <span className="text-[13px] text-[#FFFFFF]">
          {' '}
          {getFromCurrency().name}
        </span>
      </td>
      <td className=" md:py-4">
        <div className="text-[13px] font-[600] text-[#FFFFFF]">
          <span className="md:hidden">available: </span>{' '}
          {(available / 1e9).toFixed(2)} {getToCurrency().name}
        </div>
        <div className="text-[13px] font-[600] text-[#FFFFFF]">
          <span className="md:hidden">Order Limit: </span>
          {(limit / 1e9).toFixed(2)} {getToCurrency().name}
        </div>
      </td>
      <td className="md:py-4 py-2">
        <div className="flex  justify-between">
          <div className="flex flex-col items-center">
            {(showAll ? paymentMethods : paymentMethods.slice(0, 2)).map(
              (payment, index) => (
                <div key={index} className="flex ">
                  <div
                    className={`w-[10px] h-[10px] rounded-full`}
                    style={{ backgroundColor: payment.color }}
                  ></div>
                  <div className="text-[13px] text-[#FFFFFF] font-[600]">
                    {payment?.name}
                  </div>
                </div>
              )
            )}

            {paymentMethods.length > 2 && !showAll && (
              <div
                className="text-[13px] text-[#FFFFFF] font-[600] cursor-pointer"
                onClick={handleToggle}
              >
                {paymentMethods.length - 2} more
              </div>
            )}

            {showAll && (
              <div
                className="text-[13px] text-[#FFFFFF] font-[600] cursor-pointer"
                onClick={handleToggle}
              >
                Show less
              </div>
            )}
          </div>

          <span className="md:hidden float-right">
            {type === 'SELLER' || type === 'BUYER' ? (
              <Link href={`/my-order?sale=${sale.id}`}>
                <button className="bg-[#3AA53E] text-white text-[16px] font-[600] px-4 py-2 rounded-[5px]">
                  Open
                </button>
              </Link>
            ) : (
              <BuyButton saleId={sale.id} onChainSaleId={sale.onChainSaleId} />
            )}
          </span>
        </div>
      </td>
      <td className="md:table-cell py-4 text-end">
        <span className="hidden md:inline">
          {type === 'SELLER' || type === 'BUYER' ? (
            <Link href={`/my-order?sale=${sale.id}`}>
              <button className="bg-[#3AA53E] text-white text-[16px] font-[600] px-4 py-2 rounded-[5px]">
                Open
              </button>
            </Link>
          ) : (
            <BuyButton saleId={sale.id} onChainSaleId={sale.onChainSaleId} />
          )}
        </span>
      </td>
    </tr>
  );
};

export default P2PTableRow;
