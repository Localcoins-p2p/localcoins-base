'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
import React from 'react';
import { useMutation } from 'urql';
import { UPDATE_USER } from '../Profile';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Button = () => {
  const [{ fetching }, acceptTerms] = useMutation(UPDATE_USER);
  const router = useRouter();

  const handleAccept = async () => {
    await acceptTerms({ termsAccepted: true });
    router.push('/my-account');
  };

  return (
    <div className="flex gap-x-8  mt-4 mb-12">
      {/* <div className='relative w-[148px] h-[48px] rounded-lg hover:bg-[#F3AA05]' style={{
              clipPath:
                'polygon(0 0, 86% 0, 100% 23%, 100% 80%, 100% 100%, 14% 100%, 0 76%, 0% 20%)',
            }}>
        <Image src={"/assets/common/bgbutton.svg"} alt='d' fill/>


        </div> */}
      <button
        className="flex items-center hover:bg-[#F3AA05] text-white hover:text-black justify-center text-center border-[#F3AA05] border rounded-lg w-[148px] h-[48px]"
        style={{
          clipPath:
            'polygon(0 0, 86% 0, 100% 23%, 100% 80%, 100% 100%, 14% 100%, 0 76%, 0% 20%)',
        }}
        onClick={handleAccept}
      >
        I ACCEPT
      </button>
      <button
        className="flex items-center hover:bg-[#F3AA05] text-white hover:text-black justify-center text-center border-[#F3AA05] border rounded-lg w-[148px] h-[48px]"
        onClick={() => {
          Cookies.remove('token');
          window.location.href = '/p2p-trading';
        }}
        style={{
          clipPath:
            'polygon(0 0, 86% 0, 100% 23%, 100% 80%, 100% 100%, 14% 100%, 0 76%, 0% 20%)',
        }}
      >
        I DECLINE
      </button>
    </div>
  );
};

export default Button;
