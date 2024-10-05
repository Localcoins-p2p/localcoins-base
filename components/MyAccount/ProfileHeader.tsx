import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { AppContext } from '@/utils/context';
import useSolana from '@/utils/useSolana';
import { getFromCurrency, getToCurrency } from '@/utils/getCurrency';
import ModalComponent from '../Elements/ModalComponent';
import StepProgress from '../Elements/StepProgress';
import SellToSetPrice from '../Elements/SellToSetPrice';
import SellToSetAmountPayMeth from '../Elements/SellToSetAmountPayMeth';
import RemarksAndAutoRes from '../Elements/RemarksAndAutoRes';
import WalletBalance from '../Elements/WalletBalance';
const ProfileHeader = ({ selectedUser }: any) => {
  const {
    context: { user },
  } = useContext(AppContext);
  const { publicKey } = useSolana();
  const fromCurrency = getFromCurrency();
  const toCurrency = getToCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleNext = async () => {
    setCurrentStep(currentStep + 1);
  };
  const handleBack = async () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <div className="md:flex  space-y-5 items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-[#F3AA05] rounded-full w-[41px] h-[41px] lg:w-[82px] lg:h-[82px]  md:w-[50px] md:h-[50px] flex items-center justify-center ">
          <span className="text-4xl font-bold text-white uppercase">
            {user?.name?.[0]}
          </span>
          <div> </div>
        </div>
        <span className="text-[#FFFFFF] text-[23px] lg:text-[28px] md:text-[20px] font-semibold">
          {publicKey?.toBase58().substring(0, 8)}*****
        </span>
      </div>

      <div className="lg:text-center">
        <div className="flex items-center space-x-2">
          <span className="text-[#FFFFFF] font-[600] text-[18px] md:text-[14px]">
            P2P Estimated Value (SOL)
          </span>
          <Image
            src="/assets/common/eyeHide.svg"
            height={24}
            width={24}
            alt="Toggle Visibility"
            className="h-[24px] w-[24px] md:h-[18px] md:w-[18px] hidden"
          />
        </div>
        <div className="text-[#FFFFFF] lg:text-[28px] text-[23px] md:text-[18px] font-[600]">
          <WalletBalance />
          <span className="text-[#777777] hidden">≈ ₱0.00</span>
        </div>
      </div>
      <div>
        <button
          onClick={handleOpenModal}
          className="bg-[#F3AA05] text-black px-6 py-2 rounded-[10px]"
        >
          Buy {toCurrency?.name}
        </button>

        <ModalComponent
          title="Filter Options"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          header={<div>Modal Header</div>}
        >
          <div className="max-h-[90vh] overflow-auto no-scrollbar">
            <StepProgress currentStep={currentStep} />

            {currentStep === 1 && (
              <SellToSetPrice
                onNext={handleNext}
                //  data={data} setData={setData}
              />
            )}
            {currentStep === 2 && (
              <SellToSetAmountPayMeth
                onNext={handleNext}
                onBack={handleBack}
                // data={data}
                // setData={setData}
              />
            )}
            {currentStep === 3 && (
              <RemarksAndAutoRes
                onNext={handleNext}
                // data={data}
                onBack={handleBack}
                // setData={setData}
              />
            )}
          </div>
        </ModalComponent>
      </div>
    </div>
  );
};

export default ProfileHeader;
