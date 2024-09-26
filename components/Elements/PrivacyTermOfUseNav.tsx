import React from 'react';
import Image from 'next/image';

const PrivacyTermOfUseNav = () => {
  return (
    <header className="py-4 relative  mt-2">
      <div className=" flex justify-between items-center">
        <div className="relative w-[206px] h-[48px] ml-9">
          <Image
            src="/assets/common/logosvg.svg"
            alt="LocalCoins Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <nav className="flex space-x-8">
          <a
            href="#"
            className="hover:text-yellow-500 text-[16px] font-[400] text-[#FFFFFF]"
          >
            How it works
          </a>
          <a
            href="#"
            className="hover:text-yellow-500 text-[16px] font-[400] text-[#FFFFFF]"
          >
            About US
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="bg-[#F3AA05] flex justify-center rounded-[10px] items-center p-4">
            <Image
              src="/assets/common/userIcon.svg"
              alt="User Icon"
              height={24}
              width={24}
            />
          </div>
          <div
            className="flex items-center bg-[#F3AA05] rounded-lg p-4"
            style={{
              clipPath:
                'polygon(0 0, 86% 0, 100% 23%, 100% 80%, 100% 100%, 14% 100%, 0 76%, 0% 20%)',
            }}
          >
            <div className="relative w-5 h-5  mr-2">
              <Image
                src="/assets/common/mataMarks.svg"
                alt="Metamask Icon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <span>0x123456...7890</span>
          </div>
        </div>
      </div>

      <div className="absolute z-50 mt-2 top-[2px] h-[90%] w-full ">
        <Image
          className="z-50 "
          src="/assets/common/navBorder.svg"
          alt="Yellow Line"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </header>
  );
};

export default PrivacyTermOfUseNav;
