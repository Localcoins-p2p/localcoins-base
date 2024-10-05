import Image from 'next/image';
import React from 'react';
import { inputFont } from '../font/Font';
import Link from 'next/link';
const MainHeading = ({
  title,
  para,
  t1,
  t2,
  time,
  href,
  icon,
}: {
  title: string;
  para: string;
  t1: string;
  t2: string;
  time?: string;
  href?: string;
  icon?: string;
}) => {
  return (
    <div className="border-l-[5px] border-[#d79502] flex flex-col h-full w-full gap-y-4 pl-3 ">
      <div
        className={
          'uppercase leading-none md:text-[55px] text-[35px] text-[#FFFFFF] ' +
          inputFont.className
        }
      >
        {title}
      </div>
      <div className="flex justify-between w-full gap-x-3">
        <div className="text-[#FFFFFF]">
          {para} {time && <span className="text-[#F3AA05]">{time}</span>}
        </div>
        <div className="text-[#FFFFFF] hidden lg:flex justify-between text-[16px] font-[600] items-center gap-x-4">
          <Link href={href || '#'} className="flex">
            {icon ? (
              <Image src={icon} height={15} width={15} alt="custom icon" />
            ) : (
              <Image
                src="/assets/common/menu1.svg"
                height={15}
                width={15}
                alt="default icon"
              />
            )}
            <span className="ml-1 min-w-max">{t1}</span>
          </Link>
          <Link href="/my-account?page=sale-order">
            <div className="flex ml-2">
              <Image
                src="/assets/common/menu.svg"
                height={10}
                width={15}
                alt="vcv"
              />
              <span className="ml-1">My Orders</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeading;
