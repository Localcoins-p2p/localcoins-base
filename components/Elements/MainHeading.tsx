import Image from 'next/image';
import React from 'react';

const MainHeading = ({title,para,t1,t2}:{title:string,para:string,t1:string,t2:string}) => {
  return (
    <div className="border-l-[5px] border-[#d79502] flex flex-col h-full w-full gap-y-4 pl-3 ">
      <div className="uppercase leading-none text-[55px] text-[#FFFFFF]">{title}</div>
      <div className='flex justify-between w-full'>
        <div className='text-[#FFFFFF]'>
         {para}
        </div>
        <div className='text-[#FFFFFF] flex justify-between text-[16px] font-[600] items-center gap-x-4'>
            <div className='flex'>
                <Image src="/assets/common/menu1.svg" height={15} width={15} alt='vcv'/>
                 <span className='ml-1'>{t1}</span></div>
                 <div className='flex'>
                <Image src="/assets/common/menu.svg" height={10} width={15} alt='vcv'/>
                 <span className='ml-1'>{t2}</span></div>
        </div>
      </div>
    </div>
  );
};

export default MainHeading;
