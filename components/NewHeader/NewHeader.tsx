'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Check } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface NavigationItem {
  name: string;
  href: string;
  isActive?: boolean;
}

interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  isSelected?: boolean;
}

const MAIN_NAVIGATION: NavigationItem[] = [
  { name: 'On ramp', href: '/on-ramp', isActive: true },
  { name: 'Off ramp', href: '/off-ramp' },
  { name: 'Swap', href: '/swap' },
];

const DROPDOWN_ITEMS: NavigationItem[] = [
  { name: 'About', href: '/about' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Help Center', href: '/help' },
  { name: 'Settings', href: '/settings' },
];

const CRYPTO_OPTIONS: CryptoOption[] = [
  {
    id: 'usdc',
    name: 'USDC',
    symbol: 'USDC',
    icon: '/rampz/usdc.png',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    icon: '/rampz/bitcoin.png',
    isSelected: true,
  },
];

export default function NewHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(
    CRYPTO_OPTIONS.find((c) => c.isSelected) || CRYPTO_OPTIONS[0]
  );

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const NavigationLink = useCallback(
    ({
      name,
      href,
      isActive,
      className = '',
    }: NavigationItem & { className?: string }) => {
      const baseStyles =
        'px-3 py-2 rounded-lg text-custom-font-16 font-medium transition-colors duration-200';
      const activeStyles = 'text-primary ';
      const inactiveStyles = 'text-secondary hover:text-primary';

      const combinedStyles = `${baseStyles} ${
        isActive ? activeStyles : inactiveStyles
      } ${className}`;

      return (
        <Link href={href} className={combinedStyles}>
          {name}
        </Link>
      );
    },
    []
  );

  return (
    <nav className="w-full bg-milk-white" role="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center" aria-label="Home">
              <Image
                src="/rampz/rampz-logo.svg"
                alt="logo"
                width={24}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
            {MAIN_NAVIGATION.map((item) => (
              <NavigationLink key={item.href} {...item} />
            ))}

            {/* More Dropdown */}
            <div className="relative group">
              <button
                className="px-3 py-2 rounded-lg text-custom-font-16 font-medium text-secondary hover:text-primary inline-flex items-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-blue-500"
                aria-haspopup="true"
              >
                More
                <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
              </button>

              <div
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1">
                  {DROPDOWN_ITEMS.map((item) => (
                    <NavigationLink
                      key={item.href}
                      {...item}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side Crypto Selector */}
          <div className="flex items-center">
            {/* <div className="relative group ">
              <button
                className="inline-flex w-[120px] items-center px-4 py-2 bg-primary text-secondary border border-gray-200 text-sm font-medium rounded-lg  transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-blue-500"
                aria-haspopup="listbox"
              >
                <Image
                  src={selectedCrypto.icon || '/placeholder.svg'}
                  alt={selectedCrypto.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {selectedCrypto.symbol}
                <ChevronDown className="ml-2 h-4 w-4 text-secondary" />
              </button>

              <div
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100"
                role="listbox"
              >
                <div className="py-1">
                  {CRYPTO_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                      onClick={() => setSelectedCrypto(option)}
                      role="option"
                      aria-selected={option.id === selectedCrypto.id}
                    >
                      <Image
                        src={option.icon || '/placeholder.svg'}
                        alt={option.name}
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <span className="flex-1 text-left">{option.symbol}</span>
                      {option.id === selectedCrypto.id && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div> */}
            <WalletMultiButton />
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center ml-4 ">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-blue-500"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-96 opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {MAIN_NAVIGATION.map((item) => (
            <NavigationLink
              key={item.href}
              {...item}
              className="block w-full"
            />
          ))}
          {DROPDOWN_ITEMS.map((item) => (
            <NavigationLink
              key={item.href}
              {...item}
              className="block w-full"
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

// ========================= old code

// // components/Header.js
// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import Login from '../Login';
// import Points from '../../public/assets/common/points.png';
// // import { Image } from 'next/image';

// import { useContext, useState } from 'react';
// import AddPostModel from '../Elements/AddPostModel';
// import ConnectWallet from '../Elements/ConnectWallet';
// import { AppContext } from '@/utils/context';
// const NewHeader = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const {
//     context: { user },
//   } = useContext(AppContext);

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <header className="py-4 ">
//       <div className="flex items-center justify-between">
//         <Link href="/">
//           <div className="flex items-center space-x-2">
//             <Image
//               className="hidden sm:block"
//               src="/assets/common/logooo.svg"
//               alt="LocalCoins Logo"
//               width={224}
//               height={56}
//             />
//             <Image
//               className="sm:hidden"
//               src="/assets/common/logoresp.svg"
//               alt="LocalCoins Logo"
//               width={67}
//               height={62}
//             />
//           </div>
//         </Link>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center mr-1">
//             <Image
//               className="ml-2"
//               src={Points}
//               alt="123"
//               width={44}
//               height={44}
//             />
//             <p className="ml-1 text-[#F3AA05] font-bold text-[20px]">
//               {user?.points || 0}
//             </p>
//           </div>
//           <Link
//             href={'/profile'}
//             className="bg-[#F3AA05] p-3  text-black sm:p-4 rounded-[10px] flex items-center "
//           >
//             <Image
//               src="/assets/common/setting.svg"
//               alt="Wallet Icon"
//               width={24}
//               height={24}
//             />
//           </Link>
//           <Login />

//           <AddPostModel
//             title="Filter Options"
//             isOpen={isModalOpen}
//             onClose={handleCloseModal}
//             header={<div>Modal Header</div>}
//           >
//             <div className="max-h-[90vh] overflow-auto no-scrollbar">
//               <div className="flex flex-col items-center">
//                 <div className="text-white text-[32px] font-[600]">
//                   You have posted successfully.
//                 </div>
//                 <Image
//                   src={'/assets/common/success.svg'}
//                   height={138}
//                   width={138}
//                   alt="gj"
//                 />
//               </div>
//             </div>
//           </AddPostModel>

//           <ConnectWallet
//             title="Filter Options"
//             isOpen={isModalOpen}
//             onClose={handleCloseModal}
//             header={<div>Modal Header</div>}
//           >
//             <div className="max-h-[90vh] overflow-auto no-scrollbar">
//               <button className="flex mt-4 items-center bg-gray-800 text-white py-2 px-16 rounded-lg">
//                 <Image
//                   src="/assets/common/mataMarks.svg"
//                   alt="MetaMask"
//                   width={20}
//                   height={20}
//                   className="mr-2"
//                 />
//                 <span>MetaMask</span>
//               </button>
//             </div>
//           </ConnectWallet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default NewHeader;
