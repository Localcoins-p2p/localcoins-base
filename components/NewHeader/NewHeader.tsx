// components/Header.js
'use client';
import Image from 'next/image';
import Link from 'next/link';
import Login from '../Login';
import Points from '../../public/assets/common/points.png';
// import { Image } from 'next/image';

import { useState } from 'react';
import AddPostModel from '../Elements/AddPostModel';
import ConnectWallet from '../Elements/ConnectWallet';
const NewHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <header className="py-4 ">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              className="hidden sm:block"
              src="/assets/common/logooo.svg"
              alt="LocalCoins Logo"
              width={224}
              height={56}
            />
            <Image
              className="sm:hidden"
              src="/assets/common/logoresp.svg"
              alt="LocalCoins Logo"
              width={67}
              height={62}
            />
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center mr-1">
            <Image
              className="ml-2"
              src={Points}
              alt="123"
              width={44}
              height={44}
            />
            <p className="ml-1 text-[#F3AA05] font-bold text-[20px]">865</p>
          </div>
          <Link
            href={'/profile'}
            className="bg-[#F3AA05] p-2  text-black sm:p-3 rounded-[10px] flex items-center "
          >
            <Image
              src="/assets/common/setting.svg"
              alt="Wallet Icon"
              width={24}
              height={24}
            />
          </Link>
          <Login />

          <AddPostModel
            title="Filter Options"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            header={<div>Modal Header</div>}
          >
            <div className="max-h-[90vh] overflow-auto no-scrollbar">
              <div className="flex flex-col items-center">
                <div className="text-white text-[32px] font-[600]">
                  You have posted successfully.
                </div>
                <Image
                  src={'/assets/common/success.svg'}
                  height={138}
                  width={138}
                  alt="gj"
                />
              </div>
            </div>
          </AddPostModel>

          {/* <ConnectWallet
            title="Filter Options"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            header={<div>Modal Header</div>}
          >
            <div className="max-h-[90vh] overflow-auto no-scrollbar">
              <button className="flex mt-4 items-center bg-gray-800 text-white py-2 px-16 rounded-lg">
                <Image
                  src="/assets/common/mataMarks.svg"
                  alt="MetaMask"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>MetaMask</span>
              </button>
            </div>
          </ConnectWallet> */}
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
