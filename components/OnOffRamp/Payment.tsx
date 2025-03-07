'use client';

import { PlusIcon } from 'lucide-react';
import Image from 'next/image'; // Import Image from next/image
import type React from 'react';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ShadowBox from '../Elements/ShadowBox';
import { gql, useMutation } from 'urql';
import toast from 'react-hot-toast';
import saveImages from '@/utils/saveImages';

export const MATCH_SELLER_MUTATION = gql`
  mutation Mutation(
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
    }
  }
`;

const Payment = ({
  pendingAmount,
  paymentPendingMethod,
  paymentMethod,
  name,
  accountNumber,
  setIsNewRamp,
  ...props
}: any) => {
  const [
    {
      fetching: fetchingMatchSeller,
      error: errorMatchSeller,
      data: dataMatchSeller,
    },
    mutateMatchSeller,
  ] = useMutation(MATCH_SELLER_MUTATION);

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error('Please upload a proof of payment.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      try {
        // Upload image to Vercel Blob and get URL
        const [imageUrl] = await saveImages([base64Image]);

        if (!imageUrl) {
          toast.error('Failed to upload image.');
          return;
        }

        // Send the uploaded image URL to the backend
        const result = await mutateMatchSeller({
          saleId: 'dummySaleId', // Replace with actual saleId
          imageUrl, // Use uploaded image URL
          method: 'dummyMethod', // Replace with actual method
          referenceId: 'dummyReferenceId', // Replace with actual referenceId
        });

        if (result.error) {
          toast.error('Proof not submitted.');
          console.error('Error Proof not submitted:', result.error);
        } else {
          toast.success('Proof submitted successfully!');
          setIsNewRamp(false);
        }
      } catch (error) {
        console.error('Error occurred while submitting the proof', error);
        toast.error('Error occurred while submitting the proof.');
      }
    };

    reader.onerror = () => {
      toast.error('Failed to read the file.');
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ShadowBox className="bg-secondary bg-opacity-70 w-[444px] p-4">
        <ShadowBox className="bg-[#D2E1D9] rounded-lg flex flex-col gap-4 p-4">
          {/* Pending amount header */}
          <div className="border-b border-secondary pb-2 mb-4">
            <div className="flex justify-between items-center custom-font-16 text-secondary">
              <span className="">Pending amount</span>
              <span className="">
                {pendingAmount} {paymentPendingMethod}
              </span>
            </div>
          </div>

          {/* Upload proof button */}
          <label
            htmlFor="proof-upload"
            className="relative bg-secondary bg-opacity-70 text-white rounded-lg h-[169px] flex items-center justify-center cursor-pointer transition-colors"
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
              <span className="text-right  ">{paymentMethod}</span>
              <span className=" ">Name:</span>
              <span className="text-right ">{name}</span>
              <span className=" ">Account Number:</span>
              <span className="text-right ">{accountNumber}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsNewRamp(false)}
              className="border border-secondary py-2 rounded-lg hover:bg-secondary text-secondary hover:text-white font-medium transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit} // Updated handler
              className="bg-primary hover:bg-secondary py-2 rounded-lg text-secondary hover:text-white disabled:cursor-not-allowed font-medium transition-colors duration-300"
            >
              {fetchingMatchSeller ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </ShadowBox>
      </ShadowBox>
    </div>
  );
};

export default memo(Payment);
