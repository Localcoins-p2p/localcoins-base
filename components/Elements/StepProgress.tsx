import React from 'react';

const StepProgress = ({ currentStep }: any) => {
  return (
    <div className="flex items-center flex-col w-[900px]">
      <div className="flex relative justify-between items-center w-full mt-5 px-6">
        <div className="flex flex-col items-center text-center">
          <div className="min-w-max text-[14px] font-[400] text-[#000000]">
            Set Type Price
          </div>
          <div
            className={`w-[38px] h-[38px] flex items-center justify-center ${
              currentStep === 1 || currentStep === 2 || currentStep === 3
                ? 'bg-[#F3AA05]'
                : 'bg-[#CCCCCC]'
            } text-[#777777] rounded-full`}
          >
            1
          </div>
        </div>
        <div
          className={`w-[28%] absolute top-[41px] left-[94px] h-0.5 ${
            currentStep === 2 || currentStep === 3  ? 'bg-[#F3AA05]' : 'bg-gray-300'
          }`}
        ></div>
        <div className="flex flex-col items-center text-center">
          <div className="min-w-max text-[14px] font-[400] text-[#000000]">
            Set Total Amount & Payment Method
          </div>
          <div
            className={`w-[38px] h-[38px] flex items-center justify-center ${
              currentStep === 2 || currentStep === 3
                ? 'bg-[#F3AA05]'
                : 'bg-[#CCCCCC]'
            } text-[#777777] rounded-full`}
          >
            2
          </div>
        </div>
        <div className={`w-[35%] absolute top-[41px] right-[168px] h-0.5 ${
           currentStep === 3  ? 'bg-[#F3AA05]' : 'bg-gray-300'
          }`}></div>
        <div className="flex flex-col items-center text-center">
          <div className="min-w-max text-[14px] font-[400] text-[#000000]">
            Set Remarks & Automatic Response
          </div>
          <div
            className={`w-[38px] h-[38px] flex items-center justify-center ${
              currentStep === 3
                ? 'bg-[#F3AA05]'
                : 'bg-[#CCCCCC]'
            } text-[#777777] rounded-full`}
          >
            3
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
