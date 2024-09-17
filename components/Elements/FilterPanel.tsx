'use client';
import React, { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { CiGlobe } from 'react-icons/ci';
import Image from 'next/image';
import Select from 'react-select';
import ModalComponent from './ModalComponent';
import StepProgress from './StepProgress';
import SellToSetPrice from './SellToSetPrice';
import SellToSetAmountPayMeth from './SellToSetAmountPayMeth';
import RemarksAndAutoRes from './RemarksAndAutoRes';

const paymentOptions = [
  { value: 'All Payments', label: 'All Payments' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
];
const regionOptions = [
  { value: 'All Regions', label: 'All Regions' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Asia', label: 'Asia' },
];

const currencyOptions = [
  { value: 'USD', label: <span ><span className='text-[#F3AA05] mr-2'>$</span>USD</span>  },
  { value: 'EUR', label: <span ><span className='text-[#F3AA05] mr-2'>$</span>PKR</span>  },
  { value: 'GBP', label: <span ><span className='text-[#F3AA05] mr-2'>$</span>GBP</span>  },
];

const customStyles = {
  control: (provided:any, state:any) => ({
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
  singleValue: (provided:any) => ({
    ...provided,
    color: 'white',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided:any) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided:any) => ({
    ...provided,
    backgroundColor: '#000',
    color: 'white',
  }),
  option: (provided:any, state:any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#4D4D4D' : '#000',
    color: state.isFocused ? 'white' : 'gray',
    '&:hover': {
      backgroundColor: '#4D4D4D',
      color: 'white',
    },
  }),
};
const FilterPanel = () => {
  const [selectedPayment, setSelectedPayment] = useState<any>(
    paymentOptions[0]
  );
  const [selectedRegion, setSelectedRegion] = useState<any>(regionOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<any>(
    currencyOptions[0]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };




  const handleNext = () => {
    setCurrentStep(currentStep + 1); 
  };

  return (
    <div className=" text-white flex justify-center sm:justify-between items-center  space-x-4">
      <div className="flex items-center border  justify-center border-[#4D4D4D] rounded-[5px] sm:w-[350px] w-[310px] px-4 py-1">
        <input
          type="text"
          className="text-[#DCDCDC] text-[16px] placeholder-[#DCDCDC] font-[500] bg-transparent border-none outline-none"
          placeholder="Transaction amount"
        />
        <Select
          className="w-[100px] border-l border-[#393939]" 
          value={selectedCurrency}
          onChange={setSelectedCurrency}
          options={currencyOptions}
          styles={customStyles}
          isSearchable={false}
          components={{
            DropdownIndicator: () => (
              <TiArrowSortedDown className="text-white" />
            ),
          }}
        />
      </div>

      <div className=" hidden md:block border  border-[#4D4D4D] rounded-[5px] px-2 py-1 w-[350px] ">
        <Select
          value={selectedPayment}
          onChange={setSelectedPayment}
          options={paymentOptions}
          components={{
            DropdownIndicator: () => (
              <TiArrowSortedDown className="text-white" />
            ),
          }}
          styles={customStyles}
          isSearchable={false}
        />
      </div>

      <div className=" border hidden md:flex border-[#4D4D4D] rounded-[5px] px-2 py-1 w-[350px] items-center ">
        <CiGlobe className="h-[24px] w-[26px] font-bold text-[#fff]" />
        <Select
          className="w-full"
          value={selectedRegion}
          onChange={setSelectedRegion}
          options={regionOptions}
          components={{
            DropdownIndicator: () => (
              <TiArrowSortedDown className="text-white" />
            ),
          }}
          styles={customStyles}
          isSearchable={false}
        />
      </div>
      <button onClick={handleOpenModal} className="sm:flex hidden  items-center justify-center border border-[#4D4D4D] rounded-md px-3 py-3.5 hover:bg-gray-700">
        <Image
          src={'/assets/common/filterIcon.svg'}
          height={17}
          width={17}
          alt="s"
        />
      </button>
      <ModalComponent
        title="Filter Options"
        isOpen={isModalOpen}
        onClose={handleCloseModal} 
        header={<div>Modal Header</div>}
      >
        <div className='max-h-[90vh] overflow-auto no-scrollbar'>
          
      <StepProgress currentStep={currentStep} />

      {currentStep === 1 && <SellToSetPrice onNext={handleNext} />}
      {currentStep === 2 && <SellToSetAmountPayMeth onNext={handleNext} />}
      {currentStep === 3 && <RemarksAndAutoRes onNext={handleNext} />}
        </div>
      </ModalComponent>
    </div>
  );
};

export default FilterPanel;
