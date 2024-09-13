import React from 'react';
import Image from 'next/image';
const ProfileHeader = () => {
  return (
  
      <div className="flex items-center justify-between">

        <div className="flex items-center space-x-4">
    
          <div className="bg-[#F3AA05] rounded-full w-[82px] h-[82px] flex items-center justify-center ">
          <Image  alt='J' height={34} width={27} src={"/assets/common/j.svg"}/>
          </div>
          <span className="text-[#FFFFFF] text-[28px] font-semibold">jqf2cdsju1*****</span>
        </div>
        
        <div className="text-center">
          <div className="flex items-center space-x-2">
            <span className="text-[#FFFFFF] font-[600] text-[18px]">P2P Estimated Value (BTC)</span>
            <Image src="/assets/common/eyeHide.svg" height={24} width={24} alt="Toggle Visibility" className="" />
          </div>
          <div className="text-[#FFFFFF] text-[28px] font-[600]">
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
