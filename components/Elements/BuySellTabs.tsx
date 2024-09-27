'use client'
import React, { useState } from 'react';

const BuySellTabs = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [activeCurrency, setActiveCurrency] = useState('USDT');

  return (
    
      <div className="flex w-full border-b  border-[#393939]">
        <div className='py-3'>
        <button
          className={`px-10 py-1.5  rounded-[5px] text-[18px] font-[600] ${
            activeTab === 'buy' ? 'bg-[#F3AA05] text-black' : 'text-white'
          }`}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button
          className={`px-10 py-1.5  rounded-[5px] text-[18px] font-[600] ${
            activeTab === 'sell' ? 'bg-[#F3AA05] text-black' : 'text-white'
          }`}
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </button>
        </div>
        <div className='border-l ml-3 border-[#393939]'></div>

        <div className="flex items-center gap-x-8 py-2 ml-8">
          {['USDT', 'BTC', 'USDC', 'FDUSDC', 'ETH', 'DAI'].map((currency) => (
            <button
              key={currency}
              className={`font-[500] text-[18px] ${
                activeCurrency === currency ? 'text-[#F3AA05]' : 'text-white'
              }`}
              onClick={() => setActiveCurrency(currency)}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>

  );
};

export default BuySellTabs;
