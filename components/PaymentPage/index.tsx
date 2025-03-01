'use client';

import { PlusIcon } from 'lucide-react';
import type React from 'react';

import { useState } from 'react';
import ShadowBox from '../Elements/ShadowBox';

export default function PaymentPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ShadowBox className="bg-secondary bg-opacity-70 w-[444px]">
        <ShadowBox className="bg-cool-grey flex flex-col gap-4">
          {/* Pending amount header */}
          <div className="border-b border-secondary pb-2 mb-4">
            <div className="flex justify-between items-center custom-font-16 text-secondary">
              <span className="">Pending amount</span>
              <span className="">0.99 USDC</span>
            </div>
          </div>

          {/* Upload proof button */}
          <label
            htmlFor="proof-upload"
            className=" bg-[#2A2A2A] bg-opacity-70 text-white rounded-lg h-[169px] flex items-center justify-center cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-center">
              <PlusIcon className="mr-2" />
              <span className="font-medium">Upload Proof</span>
            </div>
            <input
              id="proof-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {/* Transaction details */}
          <div className="bg-secondary text-white rounded-lg flex flex-col gap-2 p-4">
            <h3 className="font-medium">Details for Transaction</h3>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-gray-300 text-sm">Payment Method:</span>
              <span className="text-right text-sm">GCASH</span>
              <span className="text-gray-300 text-sm">Name:</span>
              <span className="text-right text-sm">Nadeem</span>
              <span className="text-gray-300 text-sm">Account Number:</span>
              <span className="text-right text-sm">8103499985</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gray-200 hover:bg-gray-300 py-3 rounded-lg text-gray-700 font-medium transition-colors">
              Cancel
            </button>
            <button className="bg-[#00D37F] hover:bg-[#00B86D] py-3 rounded-lg text-white font-medium transition-colors">
              Submit
            </button>
          </div>

          {/* Display selected file name if any */}
          {file && (
            <div className=" text-sm text-secondary">
              Selected file: {file.name}
            </div>
          )}
        </ShadowBox>
      </ShadowBox>
    </div>
  );
}
