// components/Header.js
import Image from 'next/image';
import Link from 'next/link';

const NewHeader = () => {
  return (
    <header className="py-4 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image src="/" alt="LocalCoins Logo" width={40} height={40} />
          <span className="text-white font-bold text-lg">LOCALCOINS</span>
        </div>
        <div className="flex items-center space-x-4">
        <button className="bg-[#F3AA05]   text-black p-4 rounded-[10px] flex items-center ">
            <Image src="/assets/common/setting.svg" alt="Wallet Icon" width={24} height={24} />
          </button>
          <button className="bg-[#F3AA05] space-x-2  text-black p-4 rounded-[10px] flex items-center ">
            <Image src="/assets/common/Wallet.svg" alt="Wallet Icon" width={24} height={24} />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
