'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import ShadowBox from '../Elements/ShadowBox';
import Image from 'next/image';
import Link from 'next/link';

export default function CryptoPaymentConfirmation() {
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <ShadowBox className="w-[444px] bg-secondary bg-opacity-70 p-4">
        <ShadowBox className="bg-[#D2E1D9] flex flex-col gap-4 p-4">
          {/* Header with timer */}
          <ShadowBox className="bg-secondary bg-opacity-70 p-4 rounded-lg flex justify-between items-center">
            <h2 className="text-[#F5FFFA] text-base font-medium leading-[100%]">
              Please Release Crypto
            </h2>
            <ShadowBox className="flex items-center gap-6 bg-secondary text-white px-6">
              <div className=" flex flex-col gap-2 items-center justify-center">
                <span className="font-semibold text-sm leading-[100%]">
                  {minutes.toString().padStart(2, '0')}
                </span>
                <span className="font-light text-xs leading-[100%]">Min</span>
              </div>
              <div className="h-[30px] w-px bg-primary" />
              <div className="flex flex-col gap-2 items-center justify-center">
                <span className="font-semibold text-sm leading-[100%]">
                  {seconds.toString().padStart(2, '0')}
                </span>
                <span className="font-light text-xs leading-[100%]">Sec</span>
              </div>
            </ShadowBox>
          </ShadowBox>

          {/* Payment details */}
          <div className="relative w-full h-[180px] rounded-lg border cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <Image
              src="/rampz/eth.png"
              alt="ETH"
              width={100}
              height={180}
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white gap-3">
              <Eye className='w-6 h-6 ' />
              <h3 className='text-base font-medium leading-[100%]'> See Proof</h3>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start ">
              <input
                type="checkbox"
                id="receivedPayment"
                className=" h-4 w-4 border-secondary rounded"
              />
              <label
                htmlFor="receivedPayment"
                className="ml-2 font-normal text-base leading-[100%] text-secondary"
              >
                I have received the payment.
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="correctAmount"
                className=" h-4 w-4 border-secondary rounded"
              />
              <label
                htmlFor="correctAmount"
                className="ml-2 font-normal text-base leading-[100%] text-secondary"
              >
                I have received the correct amount.
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <button className=" text-base leading-[100%] border border-secondary text-secondary hover:text-white hover:bg-secondary flex items-center justify-center py-3 px-4 font-medium rounded flex-1">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>{' '}
              Active order
            </button>
            <button className="flex-1  text-base leading-[100%] bg-primary hover:bg-secondary text-secondary hover:text-white rounded-md py-3 px-4 font-medium">
              Release Crypto
            </button>
          </div>

          {/* Dispute link */}
          <div className="text-center">
            <Link href="#" className="text-secondary text-sm leading-[100%] underline">
              Dispute
            </Link>
          </div>
        </ShadowBox>
      </ShadowBox>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <Image
              src="/rampz/eth.png"
              alt="ETH"
              width={500} // Adjust width for full screen
              height={500} // Adjust height for full screen
              className="object-cover rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setIsModalOpen(false)} // Close modal
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
