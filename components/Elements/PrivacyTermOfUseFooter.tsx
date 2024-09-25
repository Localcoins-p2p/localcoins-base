import React from 'react';
import Image from 'next/image';
const PrivacyTermOfUseFooter = () => {
  return (
    <footer className=" text-white ">
      <div className="relative w-full h-6">
        <Image
          src="assets/common/f-border.svg"
          alt="LocalCoins Logo"
          fill
          objectFit="cover"
        />
      </div>
      <div className="flex justify-between md:flex-row flex-col items-center  py-8 px-8 mt-4">
        <div className="text-center">
          <Image
            src="assets/common/logosvg.svg"
            alt="LocalCoins Logo"
            width={280}
            height={66}
          />
          <p className="text-gray-400">&copy; LocalCoins 2024</p>
        </div>

        <div className="gap-x-8 flex md:flex-row flex-col">
          <a href="#" className="text-gray-400 hover:text-yellow-500">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-500">
            Terms of Use
          </a>
        </div>

        <div>
          <p className="text-[#F3AA05] text-[16px] font-[600]">
            SOCIAL MEDIA LINKS
          </p>
          <div className="flex gap-2">
            <a href="#" className="text-white hover:text-yellow-500">
              <Image
                src="/assets/common/x-t.svg"
                alt="Social Icon 1"
                width={24}
                height={24}
              />
            </a>
            <a href="#" className="text-white hover:text-yellow-500">
              <Image
                src="/assets/common/f-b.svg"
                alt="Social Icon 2"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PrivacyTermOfUseFooter;
