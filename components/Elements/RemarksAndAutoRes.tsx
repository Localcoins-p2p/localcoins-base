'use client';
import React, { useState } from 'react';

const RemarksAndAutoRes = ({ onNext, onBack }: any) => {
  const [tab, setTab] = useState('buy');
  const [status, setStatus] = useState('online');

  return (
    <>
      <div className=" mx-auto border border-[#DDDDDD] rounded-lg mt-3">
        <div className="flex justify-between w-full">
          <button
            className={`sm:w-[50%] w-[100%] py-3 text-[18px] font-[600] ${
              tab === 'buy'
                ? 'bg-[#F2F2F2] border-r border-b border-[#DDDDDD]'
                : ''
            }`}
            onClick={() => setTab('buy')}
          >
            I want to sell
          </button>
          {/* <button
          className={`w-[50%] py-3 text-[18px] font-[600] ${
            tab === 'sell'
              ? 'bg-[#F2F2F2]  border-l border-b border-[#DDDDDD]'
              : ''
          }`}
          onClick={() => setTab('sell')}
        >
          I want to sell
        </button> */}
        </div>

        <div className=" p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks (Optional)
            </label>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md"
              maxLength={2000}
            />
            <div className="text-right text-gray-500 text-xs">0/2000</div>
          </div>

          {/* <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Auto Reply (Optional)
        </label>
        <textarea
          className="w-full h-24 p-2 border border-gray-300 rounded-md"
          maxLength={2000}
        />
        <div className="text-right text-gray-500 text-xs">0/2000</div>
      </div> */}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="online"
                  name="status"
                  type="radio"
                  value="online"
                  checked={status === 'online'}
                  onChange={() => setStatus('online')}
                  className="w-4 h-4 text-[#F3AA05] border-gray-300 focus:ring-[#F3AA05]"
                />
                <label
                  htmlFor="online"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Online right now
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="offline"
                  name="status"
                  type="radio"
                  value="offline"
                  checked={status === 'offline'}
                  onChange={() => setStatus('offline')}
                  className="w-4 h-4 text-[#F3AA05] border-gray-300 focus:ring-[#F3AA05]"
                />
                <label
                  htmlFor="offline"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Offline, manual later
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end text-center mt-3 mb-8">
        <button
          onClick={onBack}
          className="bg-[#F3AA05] px-12 text-[16px] font-[600] rounded-[8px] py-2 "
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-[#F3AA05] px-12 text-[16px] font-[600] rounded-[8px] py-2 "
        >
          Next
        </button>
      </div>
    </>
  );
};

export default RemarksAndAutoRes;
