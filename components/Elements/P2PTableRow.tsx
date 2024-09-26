import Image from 'next/image';
import React from 'react';

interface P2PRowProps {
  advertiser: {
    name: string;
    initials: string;
    orders: number;
    completionRate: string;
  };
  price: string;
  available: string;
  limit: string;
  payments: Array<{ name: string; color: string }>;
}

const P2PTableRow: React.FC<P2PRowProps> = ({
  advertiser,
  price,
  available,
  limit,
  payments,
}) => {
  return (
    <tr className="border-t py-4 md:py-0 border-gray-700 flex-boxx">
      <td className=" md:py-4 flex flex-col space-x-2">
        <div className="flex items-center gap-x-2">
          <div className="w-[35px] h-[35px] bg-[#FFFFFF] rounded-full flex justify-center items-center">
            <Image
              alt="j"
              src={'/assets/common/j.svg'}
              height={25}
              width={13}
            />
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
        <span className="text-[13px] text-[#FFFFFF]"> USD</span>
      </td>
      <td className=" md:py-4">
        <div className="text-[13px] font-[600] text-[#FFFFFF]">
          <span className="md:hidden">available: </span> {available} USDT
        </div>
        <div className="text-[13px] font-[600] text-[#FFFFFF]">
          <span className="md:hidden">Order Limit: </span>
          {limit}
        </div>
      </td>
      <td className="md:py-4 py-2">
        <div className="flex  justify-between">
          <div className="flex flex-col">
            {payments.map((payment, index) => (
              <div key={index} className="flex gap-2">
                <div
                  className={`w-[10px] h-[10px] rounded-full`}
                  style={{ backgroundColor: payment.color }}
                ></div>
                <div className="text-[13px] text-[#FFFFFF] font-[600]">
                  {payment?.name}
                </div>
              </div>
            ))}
          </div>
          <button className="bg-[#3AA53E] md:hidden text-white text-[16px] font-[600] px-4 py-2 rounded-[5px]">
            Buy USDT
          </button>
        </div>
      </td>
      <td className="hidden md:table-cell py-4 text-end">
        <button className="bg-[#3AA53E] text-white text-[16px] font-[600] px-4 py-2 rounded-[5px]">
          Buy USDT
        </button>
      </td>
    </tr>
  );
};

export default P2PTableRow;
