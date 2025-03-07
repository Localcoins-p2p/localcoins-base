'use client';

import { PlusIcon } from 'lucide-react';
import Image from 'next/image'; // Import Image from next/image
import type React from 'react';

import { useEffect, useState } from 'react';
import ShadowBox from '../Elements/ShadowBox';

export default function Payment() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // pending amount
  const [minutes, setMinutes] = useState(14);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ShadowBox className="bg-secondary bg-opacity-70 w-[444px] p-4">
        <ShadowBox className="bg-[#D2E1D9] rounded-lg flex flex-col gap-4 p-4">
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
            className=" bg-secondary bg-opacity-70 text-white rounded-lg h-[169px] flex items-center justify-center cursor-pointer transition-colors"
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
            {file && ( // Display the selected image if available
              <Image
                src={URL.createObjectURL(file)} // Create a URL for the selected file
                alt="Selected Proof"
                width={169} // Set width to fit the button
                height={169} // Set height to fit the button
                className="absolute inset-0 w-full h-full object-cover rounded-lg" // Style the image
              />
            )}
            {/* Display selected file name if any */}
            {file && (
              <div className="absolute bottom-2 px-2 text-sm text-secondary max-w-sm truncate">
                {file.name}
              </div>
            )}
          </label>

          {/* Transaction details */}
          <div className="bg-secondary text-white rounded-lg flex flex-col gap-2 p-4">
            <h3 className="font-medium">Details for Transaction</h3>
            <div className="grid grid-cols-2 gap-1 custom-font-12 text-cool-grey">
              <span className=" ">Payment Method:</span>
              <span className="text-right  ">GCASH</span>
              <span className=" ">Name:</span>
              <span className="text-right ">Nadeem</span>
              <span className=" ">Account Number:</span>
              <span className="text-right ">8103499985</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="border py-2 rounded-lg hover:bg-primary text-secondary font-medium transition-colors">
              Cancel
            </button>
            <button className="bg-primary hover:bg-secondary py-2 rounded-lg text-secondary hover:text-white font-medium transition-colors">
              Submit
            </button>
          </div>

          {/*Pending amount */}
          <ShadowBox className="bg-secondary bg-opacity-70 flex justify-between gap-4">
            <p className="custom-font-16 text-white">
              Your crypto will be released in
            </p>
            <ShadowBox className="flex justify-center gap-4 bg-secondary">
              <div className="flex items-center gap-1">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-black/30 text-lg font-bold">
                  {minutes.toString().padStart(2, '0')}
                </div>
                <span className="text-xs">Min</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-black/30 text-lg font-bold">
                  {seconds.toString().padStart(2, '0')}
                </div>
                <span className="text-xs">Sec</span>
              </div>
            </ShadowBox>
          </ShadowBox>

          <button className="w-full rounded-lg py-2 bg-primary hover:bg-secondary text-secondary hover:text-white transition-colors">
            Appeal
          </button>
        </ShadowBox>
      </ShadowBox>
    </div>
  );
}
