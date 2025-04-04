'use client';

import { PlusIcon } from 'lucide-react';
import Image from 'next/image'; // Import Image from next/image
import type React from 'react';

import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ShadowBox from '../Elements/ShadowBox';
import { gql, useMutation } from 'urql';
import toast from 'react-hot-toast';
import saveImages from '@/utils/saveImages';
import { AppContext } from '@/utils/context';
import { useRouter, useSearchParams } from 'next/navigation';

// export const MATCH_SELLER_MUTATION = gql`
//   mutation Mutation(
//     $saleId: String!
//     $imageUrl: String!
//     $method: String!
//     $referenceId: String!
//   ) {
//     addScreenshot(
//       saleId: $saleId
//       imageUrl: $imageUrl
//       method: $method
//       referenceId: $referenceId
//     ) {
//       id
//       imageUrl
//     }
//   }
// `;

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

const Payment = ({
  pendingAmount,
  paymentPendingMethod,
  paymentMethod,
  name,
  accountNumber,
  setIsNewRamp,
  ...props
}: any) => {

  const router = useRouter();

  // const [
  //   {
  //     fetching: fetchingMatchSeller,
  //     error: errorMatchSeller,
  //     data: dataMatchSeller,
  //   },
  //   mutateMatchSeller,
  // ] = useMutation(MATCH_SELLER_MUTATION);
  const {
    context: { user },
  } = useContext(AppContext);
  const searchParams = useSearchParams();

  const saleId = searchParams.get('saleId');

  const [{ fetching: addScreenshotFetching }, addScreenshotMutation] =
    useMutation(ADD_SCREENSHOT);

  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = (e.target as any).result;
      setImage(base64String);
    };
    reader.readAsDataURL(file as File);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // useEffect(() => {
  //   if (sale?.screenshots?.[0]) {
  //     setSelectedImage(sale.screenshots[0].imageUrl);
  //   }
  // }, [sale]);
  const handleAddScreenshot = async (imageUrl: string, method: string) => {
    try {
      // if (toCurrency.name === 'ETH' || toCurrency.name === 'eth') {
      //   await markPaid(sale.onChainSaleId);
      // }
      if (imageUrl.indexOf('vercel') === -1) {
        await addScreenshotMutation({
          saleId: saleId,
          imageUrl,
          referenceId: '',
          method: '',
        });
      }
      toast.success('Screenshot added successfully');
      router.push("/on-ramp/pending-transaction")
    } catch (error) {
      toast.error('Failed to add screenshot');
    }
  };

  return (
    <>
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
              onChange={handleImageChange}
              accept="image/*"
            />
            {selectedImage && ( // Display the selected image if available
              <Image
                src={selectedImage} // Create a URL for the selected file
                alt="Selected Proof"
                width={169} // Set width to fit the button
                height={169} // Set height to fit the button
                className="absolute inset-0 w-full h-full object-cover rounded-lg" // Style the image
              />
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
              onClick={
                // () => {
                //   takeReferenceNumber(image);
                // }
                () => {
                  selectedImage
                    ? handleAddScreenshot(image, '')
                    : toast.error('Please upload the proof image first.');
                }
              }
              className="bg-primary hover:bg-secondary py-2 rounded-lg text-secondary hover:text-white disabled:cursor-not-allowed font-medium transition-colors duration-300"
            >
              {addScreenshotFetching ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </ShadowBox>
      </ShadowBox>
    </div> 
    </>
  );
};

export default memo(Payment);
