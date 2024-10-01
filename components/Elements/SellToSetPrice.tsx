'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import { TiArrowSortedDown } from 'react-icons/ti';
import { CiGlobe } from 'react-icons/ci';
import Image from 'next/image';

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',

    boxShadow: state.isFocused ? '' : '',
    '&:hover': {
      borderColor: '#4D4D4D',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#000',
    color: 'white',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#4D4D4D' : '#000',
    color: state.isFocused ? 'white' : 'gray',
    '&:hover': {
      backgroundColor: '#4D4D4D',
      color: 'white',
    },
  }),
};

const USDTDATA = [{ value: 'USDC', label: 'USDC' }];
const PHPDATA = [{ value: 'PHP', label: 'PHP' }];

const SellToSetPrice = ({ onNext }: any) => {
  const [tab, setTab] = useState('buy');
  const [priceType, setPriceType] = useState('fixed');
  const [fixedPrice, setFixedPrice] = useState(55.55);
  const [selectedusdt, setSelectedusdt] = useState<any>(USDTDATA[0]);
  const [selectedphp, setSelectedphp] = useState<any>(PHPDATA[0]);

  const handleIncrement = () => {
    if (fixedPrice < 67.48) {
      setFixedPrice(prevPrice => Math.min(prevPrice + 1, 67.48));
    }
  };
  
  const handleDecrement = () => {
    if (fixedPrice > 45.00) {
      setFixedPrice(prevPrice => Math.max(prevPrice - 1, 45.00));
    }
  };


  return (
    <>
      <div className=" mx-auto border border-[#DDDDDD] rounded-lg mt-3">
        <div className="flex justify-between w-full">
          <button
            className={`w-[50%] py-3 text-[18px] font-[600] ${
              tab === 'buy'
                ? 'bg-[#F2F2F2] border-r border-b border-[#DDDDDD]'
                : ''
            }`}
            onClick={() => setTab('buy')}
          >
            I want to sell
          </button>
          {/* <button
          className={`w-[50%] py-3 text-[18px] font-[600] ${
            tab === 'sell'
              ? 'bg-[#F2F2F2]  border-l border-b border-[#DDDDDD]'
              : ''
          }`}
          onClick={() => setTab('sell')}
        >
          I want to sell
        </button> */}
        </div>

        <div className="px-6">
          <div className="grid grid-cols-3 gap-4 my-4">
            <div>
              <span className="text-[14px] text-[#222222]">Asset</span>
              <div className="border  flex border-[##DDDDDD] bg-[#F2F2F2]  rounded-[5px] px-2 items-center ">
                <Image
                  src="/assets/common/cripto.svg"
                  height={24}
                  width={24}
                  alt="s"
                />
                <Select
                  className="w-full "
                  value={selectedusdt}
                  onChange={setSelectedusdt}
                  options={USDTDATA}
                  components={{
                    DropdownIndicator: () => (
                      <TiArrowSortedDown className="text-[#CCCCCC]" />
                    ),
                  }}
                  styles={customStyles}
                  isSearchable={false}
                />
              </div>
            </div>

            <div>
              <span className="text-[14px] text-[#222222]">With Fiat</span>
              <div className="border flex border-[##DDDDDD] bg-[#F2F2F2] rounded-[5px] px-2 items-center ">
                <Image
                  src="/assets/common/p.svg"
                  height={24}
                  width={24}
                  alt="s"
                />
                <Select
                  className="w-full "
                  value={selectedphp}
                  onChange={setSelectedphp}
                  options={PHPDATA}
                  components={{
                    DropdownIndicator: () => (
                      <TiArrowSortedDown className="text-[#CCCCCC]" />
                    ),
                  }}
                  styles={customStyles}
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
          <div className="my-4">
            <label className="text-sm ">Price Type</label>
            <div className="flex space-x-6 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio "
                  checked={priceType === 'fixed'}
                  onChange={() => setPriceType('fixed')}
                />
                <span className="ml-2 text-[14px] text-[#222222] font-[500]">
                  Fixed
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={priceType === 'floating'}
                  onChange={() => setPriceType('floating')}
                />
                <span className="ml-2 text-[14px] text-[#222222] font-[500]">
                  Floating
                </span>
              </label>
            </div>
          </div>

          {priceType === 'fixed' && (
            <div className="my-4">
              <label className="text-sm font-[400] text-[#222222]">Fixed</label>
              <div className="flex items-center justify-between mt-2 p-2 w-[357px] rounded-[5px] border border-[#DDDDDD]">
                <button
                  className="px-3 py-1 bg-gray-200 rounded"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="number"
                   step="0.01"
                  value={fixedPrice}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value); 
                      setFixedPrice(value);  
                  }}
                  className="text-[18px] font-[500] text-[#222222] text-center"
                />
                <button
                  className="px-3 py-1 bg-gray-200 rounded"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                The fixed price should be between 45.00 - 67.48
              </p>
            </div>
          )}

          <div className="flex gap-x-20">
            <div>
              <p className="text-sm text-[#222222]">Your Price</p>
              <p className="text-[28px] font-[500] mt-2">₱55.87</p>
            </div>
            {/* <div>
              <p className="text-sm text-[#222222]">Highest Order Price</p>
              <p className="text-[28px] font-[500] mt-2">₱55.95</p>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex justify-end text-center mt-3 mb-8">
        <button
          onClick={onNext}
          className="bg-[#F3AA05] px-12 text-[16px] font-[600] rounded-[8px] py-2 "
        >
          Next
        </button>
      </div>
    </>
  );
};

export default SellToSetPrice;
