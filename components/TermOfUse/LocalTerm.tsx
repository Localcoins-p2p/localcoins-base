import React from 'react';
import Image from 'next/image';
const LocalTerm = () => {
  return (
    <section className=" text-[#FFFFFF] mt-10">
      <div className=" flex justify-between items-center">
        <div>
          <h1 className="text-[40px] font-bold mb-4 uppercase">
            LocalCoins Terms of Use
          </h1>
          <div>
            <span className="text-[24px] font-[600]">Last Update : </span>
            <span className=" font-[400] text-[20px]"> Sept 17, 2024</span>
          </div>
        </div>

        <div className="relative w-[327px] h-[241PX]">
          <Image
            src="/assets/common/localPrivacy.svg"
            alt="Privacy Policy Illustration"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LocalTerm;
