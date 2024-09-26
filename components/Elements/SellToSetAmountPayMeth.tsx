'use client';
import React, { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import Select from 'react-select';

const Time = [
    { value: '1mint', label: '1mint' },
    { value: '2mint', label: '2mint' },
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
        color: 'black',
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

const SellToSetAmountPayMeth = ({ onNext }: any) => {
    const [tab, setTab] = useState('buy');
    const [paymentMethod, setPaymentMethod] = useState<any>(null);
    const [timeLimit, setTimeLimit] = useState('15 min');
    const [selecteTime, setSelecteTime] = useState<any>(Time[0]);
    const [totalAmount, setTotalAmount] = useState('Max 2200.99');
    const [orderLimitMin, setOrderLimitMin] = useState('500');
    const [orderLimitMax, setOrderLimitMax] = useState('2200.99');
    const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotalAmount(e.target.value);
        console.log('Total Amount:', e.target.value);
    };

    const handleOrderLimitMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderLimitMin(e.target.value);
        console.log('Order Limit Min:', e.target.value);
    };

    const handleOrderLimitMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderLimitMax(e.target.value);
        console.log('Order Limit Max:', e.target.value);
    };

    return (
        <>
            <div className="mx-auto border border-[#DDDDDD] rounded-lg mt-3">
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

                <div className="px-6 py-4 w-[50%]">
                    <div className="mb-4">
                        <label className="block text-sm font-[400] text-[#222222] mb-1">Total Amount</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="border border-[#DDDDDD] placeholder-gray-300 rounded-md w-full p-2"
                                placeholder="Max 2200.99"
                                value={totalAmount}
                                onChange={handleTotalAmountChange}
                            />
                            <span className="absolute inset-y-0 right-4 flex items-center text-[14px] font-[500] text-[#222222]">USDT</span>
                        </div>
                        <div className="text-sm text-[#A7A7A7] mt-2">
                            ≈ 0 PHP <br />
                            Available: <span className="text-black">2200.99 USDT</span> <a href="#" className="text-[#F3AA05]">All</a> <a href="#" className="text-[#C68900]">+ Add Funds</a>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#222222] mb-1">Order Limit</label>
                        <div className="flex items-center space-x-4">
                            <div className='relative w-1/2'>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md w-full p-2"
                                    value={orderLimitMin}
                                    onChange={handleOrderLimitMinChange}
                                />
                                <span className="absolute top-[11px] right-4 flex items-center text-[14px] font-[500] text-[#222222]">PHP</span>
                                <div className="text-sm text-gray-500 mt-1">≈ 8.89 USDT </div>
                            </div>

                            <div className="text-gray-500 h-[50px]">~</div>
                            <div className='relative w-1/2'>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md w-full p-2"
                                    value={orderLimitMax}
                                    onChange={handleOrderLimitMaxChange}
                                />
                                <span className="absolute top-[11px] right-4 flex items-center text-[14px] font-[500] text-[#222222]">PHP</span>
                                <div className="text-sm text-gray-500 mt-1">≈ 39.10 USDT</div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-[400] text-[#222222] mb-1">Payment Method</label>
                        <button
                            className="bg-[#F3AA05] text-black px-14 py-2 text-[14px] font-[600] rounded-[5px]"
                            onClick={() => setPaymentMethod('Selected Method')}
                        >
                            + Add
                        </button>
                        <div className="text-sm text-[#777777] mt-1">Select up to 5 methods</div>
                    </div>

                    <div className="border w-[60%] border-[#DDDDDD] rounded-[5px] px-2 py-1">
                        <Select
                            value={selecteTime}
                            onChange={setSelecteTime}
                            options={Time}
                            components={{
                                DropdownIndicator: () => (
                                    <TiArrowSortedDown className="text-black" />
                                ),
                            }}
                            styles={customStyles}
                            isSearchable={false}
                        />
                    </div>
                </div>
            </div>

            <div className='flex justify-end text-center mt-3 mb-8'>
                <button onClick={onNext} className='bg-[#F3AA05] px-12 text-[16px] font-[600] rounded-[8px] py-2'>next</button>
            </div>
        </>
    );
};

export default SellToSetAmountPayMeth;
