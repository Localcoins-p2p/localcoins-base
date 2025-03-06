'use client';

import { useState } from 'react';
import Dropdown from '../Elements/Dropdown';
import ShadowBox from '../Elements/ShadowBox';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const OnRamp = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('php');
  const [selectedPaymentMehodToSend, setSelectedPaymentMehodToSend] =
    useState('php');
  const [selectedPaymentMehodToRecieve, setSelectedPaymentMehodToRecieve] =
    useState('php');
  const [isExpanded, setIsExpanded] = useState(false);
  const [amountTo, setAmountTo] = useState({
    amountToSend: 5500,
    amountToReceive: 99.001,
  });

  const programmingLanguages = [
    { value: 'GCASH', label: 'GCASH', icon: 'G' },
    { value: 'Maya', label: 'Maya', icon: 'M' },
    { value: 'Coins.ph', label: 'Coins.ph', icon: 'C' },
    { value: 'GoTyme Bank', label: 'GoTyme Bank', icon: 'GB' },
  ];
  const paymentMethodSend = [
    { value: 'GCASH', label: 'GCASH', icon: 'G' },
    { value: 'Maya', label: 'Maya', icon: 'M' },
    { value: 'Coins.ph', label: 'Coins.ph', icon: 'C' },
    { value: 'GoTyme Bank', label: 'GoTyme Bank', icon: 'GB' },
  ];
  const paymentMethodRecieve = [
    { value: 'GCASH', label: 'GCASH', icon: 'G' },
    { value: 'Maya', label: 'Maya', icon: 'M' },
    { value: 'Coins.ph', label: 'Coins.ph', icon: 'C' },
    { value: 'GoTyme Bank', label: 'GoTyme Bank', icon: 'GB' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ShadowBox className="w-[444px] bg-secondary bg-opacity-70">
        <ShadowBox className="bg-milk-white">
          <h3 className="text-primary text-custom-font-16 pb-4">On ramp</h3>
          <ShadowBox className="flex flex-col gap-4 bg-secondary">
            <ShadowBox className="rounded-lg">
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="text-cool-grey">Payment method</p>
                </div>
                <div>
                  <Dropdown
                    options={programmingLanguages}
                    value={selectedPaymentMethod}
                    onChange={setSelectedPaymentMethod}
                    className="bg-secondary border"
                  />
                </div>
              </div>
            </ShadowBox>
            <ShadowBox className="bg-green-cyan rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-cool-grey text-sm">You send</p>
                  <input
                    type="number"
                    value={amountTo.amountToSend}
                    onChange={(e) =>
                      setAmountTo({
                        ...amountTo,
                        amountToSend: Number(e.target.value),
                      })
                    }
                    className="bg-transparent text-white focus:outline-none"
                  />
                </div>
                <div>
                  <Dropdown
                    options={paymentMethodSend}
                    value={selectedPaymentMehodToSend}
                    onChange={setSelectedPaymentMehodToSend}
                    className="bg-secondary"
                  />
                </div>
              </div>
            </ShadowBox>
            <ShadowBox className="bg-green-cyan rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-cool-grey text-sm">You receive</p>
                  <input
                    type="number"
                    value={amountTo.amountToReceive}
                    onChange={(e) =>
                      setAmountTo({
                        ...amountTo,
                        amountToReceive: Number(e.target.value),
                      })
                    }
                    className="bg-transparent text-white focus:outline-none"
                  />
                </div>
                <div>
                  <Dropdown
                    options={paymentMethodRecieve}
                    value={selectedPaymentMehodToRecieve}
                    onChange={setSelectedPaymentMehodToRecieve}
                    className="bg-secondary"
                  />
                </div>
              </div>
            </ShadowBox>
            <div className="overflow-hidden">
              {/* Header - Always visible */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-cool-grey font-normal text-xs">
                    {amountTo?.amountToSend} {selectedPaymentMehodToSend}
                  </span>
                  <ArrowRight className="w-3 h-3 text-white" />
                  <span className="text-cool-grey font-normal text-xs">
                    {amountTo?.amountToReceive} {selectedPaymentMehodToRecieve}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>

              {/* Collapsible content */}
              {isExpanded && (
                <div className="text-cool-grey font-normal text-xs border-t border-cool-grey pt-2">
                  <div className="flex justify-between ">
                    <span className="">USDC Price</span>
                    <span>55.55 PHP/USDC ($1.00)</span>
                  </div>
                  <div className="flex justify-between ">
                    <span className="">Platform Fees</span>
                    <span>1%</span>
                  </div>
                </div>
              )}
            </div>
          </ShadowBox>
          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" />
            <p>
              I agree with <span className="underline">term & conditions</span>
            </p>
          </div>
          <button className="bg-primary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg text-custom-font-16 w-full transition-colors duration-200">
            On ramp
          </button>
        </ShadowBox>
      </ShadowBox>
    </div>
  );
};

export default OnRamp;
