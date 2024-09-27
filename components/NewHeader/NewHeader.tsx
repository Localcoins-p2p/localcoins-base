// components/Header.js
import Image from 'next/image';
import Link from 'next/link';

const NewHeader = () => {
  return (
    <header className="py-4 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image className='hidden sm:block' src="/assets/common/logosvg.svg" alt="LocalCoins Logo" width={354} height={80} />
          <Image className='sm:hidden' src="/assets/common/logoresp.svg" alt="LocalCoins Logo" width={67} height={62} />
          {/* <span className="text-white font-bold text-lg">LOCALCOINS</span> */}
        </div>
        <div className="flex items-center space-x-4">
        <Link href={"/profile"} className="bg-[#F3AA05] p-2  text-black sm:p-4 rounded-[10px] flex items-center ">
            <Image src="/assets/common/setting.svg" alt="Wallet Icon" width={24} height={24} />
          </Link>
          <button className="bg-[#F3AA05] space-x-2  text-black sm:p-4 p-2 rounded-[10px] flex items-center ">
            <Image src="/assets/common/Wallet.svg" alt="Wallet Icon" width={24} height={24} />
            <span className='hidden md:block'>Connect Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
