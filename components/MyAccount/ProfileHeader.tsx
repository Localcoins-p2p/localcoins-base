import React from 'react';
import Image from 'next/image';
const ProfileHeader = () => {
  return (
  
      <div className="md:flex  space-y-5 items-center justify-between">

        <div className="flex items-center space-x-4">
    
          <div className="bg-[#F3AA05] rounded-full w-[41px] h-[41px] lg:w-[82px] lg:h-[82px]  md:w-[50px] md:h-[50px] flex items-center justify-center ">
          <Image  alt='J' height={34} width={27} className='md:h-[25px] w-[20px]' src={"/assets/common/j.svg"}/>
          </div>
          <span className="text-[#FFFFFF] text-[23px] lg:text-[28px] md:text-[20px] font-semibold">jqf2cdsju1*****</span>
        </div>
        
        <div className="lg:text-center">
          <div className="flex items-center space-x-2">
            <span className="text-[#FFFFFF] font-[600] text-[18px] md:text-[14px]">P2P Estimated Value (BTC)</span>
            <Image src="/assets/common/eyeHide.svg" height={24} width={24}  alt="Toggle Visibility" className="h-[24px] w-[24px] md:h-[18px] md:w-[18px]" />
          </div>
          <div className="text-[#FFFFFF] lg:text-[28px] text-[23px] md:text-[18px] font-[600]">
            0.00000002BTC <span className='text-[#777777]'>≈ ₱0.00</span>
          </div>
          
        </div>
        <div>
          <button className="bg-[#F3AA05] text-black px-6 py-2 rounded-[10px]">
            Become a Merchant
          </button>
        </div>

      </div>
    
  );
};

export default ProfileHeader;
