'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Select from 'react-select';

import { TiArrowSortedDown } from 'react-icons/ti';
const paymentOptions = [
  { value: 'All Payments', label: 'All Payments' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
];

const ChatBox = ({
  sale,
  setImage,
  isBuyer,
  setReferenceId,
}: {
  sale: any;
  setImage: (x: string) => void;
  isBuyer: any;
  setReferenceId: any;
}) => {
  const [message, setMessage] = useState('');
  const [referenceId, setRefId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<any>(
    paymentOptions[0]
  );
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

  useEffect(() => {
    console.log(sale);
    if (sale?.screenshots?.[0]) {
      setSelectedImage(sale.screenshots[0].imageUrl);
    }
  }, [sale]);
  // console.log("saless",sale)
  // console.log("isBuyer",isBuyer)
  console.log('referenceId', referenceId);
  return (
    <div className="h-[90%] bg-[#FFFFFF] rounded-[15px] flex flex-col justify-between shadow-lg">
      <div className="">
        <div className="flex items-center justify-between rounded-tl-[15px] rounded-tr-[15px] p-4 border-b border-gray-300 bg-[#FFFFFF]">
          <div className="flex items-center">
            <Image
              src="/assets/common/c-t.svg"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <h4 className="text-sm font-semibold">{sale?.seller?.name}</h4>
              <div className="flex space-x-2 text-xs text-yellow-500">
                <span>Trades</span>
                <span>|</span>
                <span>Report</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className="flex items-end space-x-2">
            {/* Input field */}
            <input
              type="text"
              value={referenceId}
              onChange={(e) => {
                setRefId(e.target.value);
                setReferenceId(e.target.value);
              }}
              placeholder="Enter reference id"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {selectedImage ? (
          <div className="p-4 ">
            <div className="flex items-end space-x-2">
              {/* <Image
              src="/assets/common/c-t.svg"
              alt="User Avatar"
              width={30}
              height={30}
              className="rounded-full"
            /> */}
              <div className="bg-white p-3 h-[400px] w-full relative rounded-lg shadow-sm">
                <Image
                  src={selectedImage}
                  alt="Sent Image"
                  fill
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col gap-4 items-center h-[400px]">
            {/* {isBuyer && ( */}
            <>
              <label htmlFor="imageUpload">
                <Image
                  src="/assets/common/add_circle.svg"
                  alt="Add Circle Icon"
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
              </label>

              <p>Upload payment screenshot</p>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </>
            {/* )} */}
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 border-t gap-y-4 rounded-bl-[15px] rounded-br-[15px] border-gray-300 bg-white">
        <div className="w-full">
          <p className="font-semibold mt-0 text-center text-opacity-65">
            {(sale?.screenshots?.[0] as any)?.imageUrl
              ? isBuyer
                ? 'Screenshot has been uploaded'
                : 'The buyer has sent you payment. This is the screenshot.'
              : isBuyer
              ? 'Upload the image and notify the seller'
              : 'Buyer will upload a screenshot'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
