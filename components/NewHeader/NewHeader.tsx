// components/Header.js
import Image from 'next/image';
import Link from 'next/link';
import Login from '../Login';

const NewHeader = () => {
  return (
    <header className="py-4 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            className="hidden sm:block"
            src="/assets/common/logosvg.svg"
            alt="LocalCoins Logo"
            width={354}
            height={80}
          />
          <Image
            className="sm:hidden"
            src="/assets/common/logoresp.svg"
            alt="LocalCoins Logo"
            width={67}
            height={62}
          />
          {/* <span className="text-white font-bold text-lg">LOCALCOINS</span> */}
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-[#F3AA05] p-2  text-black sm:p-4 rounded-[10px] flex items-center ">
            <Image
              src="/assets/common/setting.svg"
              alt="Wallet Icon"
              width={24}
              height={24}
            />
          </button>
          <Login />
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
