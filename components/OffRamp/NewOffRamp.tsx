'use client';

import { useState } from 'react';
import Dropdown from '../Elements/Dropdown';
import ShadowBox from '../Elements/ShadowBox';
import { ArrowRight, ChevronDown, ChevronUp, MoveLeft } from 'lucide-react';

const NewOffRamp = ({
  setNewOffRampState,
}: {
  setNewOffRampState: (value: boolean) => void;
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('php');
  const [selectedPaymentMehodToSend, setSelectedPaymentMehodToSend] =
    useState('php');
  const [offRamp, setOffRamp] = useState({
    amount: 0.0,
    currency: 'php',
    userName: '',
    number: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <ShadowBox className="w-[444px] bg-secondary bg-opacity-70">
          <ShadowBox className="bg-milk-white flex flex-col gap-4 p-4">
            <div className="flex items-center gap-4 ">
              <MoveLeft
                className="w-6 h-6 cursor-pointer"
                onClick={() => setNewOffRampState(false)}
              />
              <h3 className="text-primary text-custom-font-16"> Off ramp</h3>
            </div>
            <ShadowBox className="flex flex-col gap-4 p-4 bg-secondary">
              <ShadowBox className="bg-green-cyan rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-cool-grey text-sm">Off ramp amount</p>
                    <input
                      type="number"
                      value={offRamp.amount}
                      onChange={(e) =>
                        setOffRamp({
                          ...offRamp,
                          amount: Number(e.target.value),
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
              {/* Telegram Username */}
              <ShadowBox className="flex items-center justify-between bg-green-cyan rounded-lg">
                <h3 className="font-normal text-sm leading-[100%] text-cool-grey">
                  Telegram Username
                </h3>
                <input
                  type="text"
                  placeholder="Enter your Username"
                  value={offRamp.userName}
                  onChange={(e) =>
                    setOffRamp({ ...offRamp, userName: e.target.value })
                  }
                  className="font-normal text-sm leading-[100%] rounded-md bg-secondary px-3 py-2 text-white placeholder:text-white focus:outline-none"
                />
              </ShadowBox>
              {/* GCASH Number */}
              <ShadowBox className="flex items-center justify-between bg-green-cyan rounded-lg">
                <h3 className="font-normal text-sm leading-[100%] text-cool-grey">
                  GCASH Number
                </h3>
                <input
                  type="text"
                  placeholder="Enter your number"
                  value={offRamp.number}
                  onChange={(e) =>
                    setOffRamp({ ...offRamp, number: e.target.value })
                  }
                  className="font-normal text-sm leading-[100%] rounded-md bg-secondary px-3 py-2 text-white placeholder:text-white focus:outline-none"
                />
              </ShadowBox>
            </ShadowBox>
            <button className="bg-primary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg text-custom-font-16 w-full transition-colors duration-200">
              Off ramp
            </button>
          </ShadowBox>
        </ShadowBox>
      </form>
    </div>
  );
};

export default NewOffRamp;
