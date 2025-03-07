'use client';

import { useState } from 'react';
import ShadowBox from '../Elements/ShadowBox';
import Image from 'next/image';
import NewOffRamp from './NewOffRamp';
import CryptoPaymentConfirmation from './CryptoPaymentConfirmation';
import TransactionConfirmation from '../OnOffRamp/TransactionConfirmation';
import PendingTransaction from '../OnOffRamp/PendingTransaction';
import Payment from '../OnOffRamp/Payment';

const OffRamp = () => {
  const [activeTab, setActiveTab] = useState('completed');

  const [newOffRampState, setNewOffRampState] = useState<boolean>(false);

  const transactions = {
    active: [
      {
        paymentMethod: 'GCASH',
        amount: '$100.00',
        quantity: '0.99 USDC',
        status: 'Unfilled',
        orderNo: '1274957442',
      },
      {
        paymentMethod: 'GCASH',
        amount: '$100.00',
        quantity: '0.99 USDC',
        status: 'Unfilled',
        orderNo: '1274957442',
      },
      {
        paymentMethod: 'GCASH',
        amount: '$100.00',
        quantity: '0.99 USDC',
        status: 'Unfilled',
        orderNo: '1274957442',
      },
    ],
    completed: [
      {
        wallet: 'jsdhf..er90',
        amount: '$240.00',
        quantity: '0.99 SOL',
        hash: 'jsdhf..er90',
        reference: '1274957442',
      },
      {
        wallet: 'jsdhf..er90',
        amount: '$240.00',
        quantity: '0.99 SOL',
        hash: 'jsdhf..er90',
        reference: '1274957442',
      },
      {
        wallet: 'jsdhf..er90',
        amount: '$240.00',
        quantity: '0.99 SOL',
        hash: 'jsdhf..er90',
        reference: '1274957442',
      },
    ],
    cancelled: [
      {
        wallet: 'jsdhf..er90',
        amount: '$240.00',
        quantity: '0.99 SOL',
        hash: 'jsdhf..er90',
        reference: '1274957442',
      },
      {
        wallet: 'jsdhf..er90',
        amount: '$240.00',
        quantity: '0.99 SOL',
        hash: 'jsdhf..er90',
        reference: '1274957442',
      },
    ],
  };

  return (
    <>
      <Payment />

      <PendingTransaction
        amount="0.99"
        currency="USDC"
        initialMinutes={14}
        initialSeconds={59}
      />

      <TransactionConfirmation
        amount="0.99"
        currency="USDC"
        message="Was released by you."
        type="Off ramp"
      />
      <CryptoPaymentConfirmation />

      {newOffRampState ? (
        <NewOffRamp setNewOffRampState={setNewOffRampState} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <ShadowBox className="bg-secondary bg-opacity-70  w-[722px] p-4">
            <ShadowBox className="bg-[#D2E1D9] flex flex-col gap-4 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-custom-font-16 text-secondary ">
                  Transactions
                </h4>
                <button
                  onClick={() => {
                    setNewOffRampState(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary bg-opacity-50 border border-primary font-medium text-base leading-[100%]"
                >
                  + New off ramp
                </button>
              </div>
              <ShadowBox className="bg-secondary p-4">
                <div className="h-[395px] overflow-y-auto ">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        className={`px-2 py-1 rounded-md text-white font-normal text-xs leading-4 ${
                          activeTab === 'active' ? 'bg-primary' : 'border'
                        }`}
                        onClick={() => setActiveTab('active')}
                      >
                        Active
                      </button>
                      <button
                        className={`px-2 py-1 rounded-md text-white font-normal text-xs leading-4 ${
                          activeTab === 'completed' ? 'bg-primary' : 'border'
                        }`}
                        onClick={() => setActiveTab('completed')}
                      >
                        Completed
                      </button>
                      <button
                        className={`px-2 py-1 rounded-md text-white font-normal text-xs leading-4 ${
                          activeTab === 'cancelled' ? 'bg-primary' : 'border'
                        }`}
                        onClick={() => setActiveTab('cancelled')}
                      >
                        Cancelled
                      </button>
                    </div>
                    {activeTab === 'active' && (
                      <button className="bg-primary text-white px-2 py-1 rounded-md font-normal text-xs leading-4">
                        Release Crypto
                      </button>
                    )}

                    {/* {activeTab === 'completed' && (
                  <div className="flex justify-end items-center gap-2  text-white font-normal text-xs leading-4">
                    <span>From:</span>
                    <input type="date" className=" p-1 rounded-md" />
                    <span>To:</span>
                    <input type="date" className=" p-1 rounded-md" />
                  </div>
                )} */}
                  </div>

                  <div className="mt-4">
                    {activeTab === 'active' && (
                      <>
                        {transactions.active.length > 0 ? (
                          <div className="rounded-xl overflow-x-auto">
                            <table className="min-w-full divide-y divide-black ">
                              <thead className=" whitespace-nowrap">
                                <tr className="bg-primary text-xs font-normal leading-4">
                                  <th className="px-4 py-4 text-left">
                                    Payment Method
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Amount
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Quantity
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Status
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Order No
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-primary divide-y divide-black whitespace-nowrap">
                                {transactions.active.map((txn, index) => (
                                  <tr
                                    key={index}
                                    className=" text-xs font-bold leading-4"
                                  >
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.paymentMethod}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.amount}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.quantity}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.status}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.orderNo}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-full ">
                            <div className="flex flex-col items-center gap-2 ">
                              <Image
                                src={'/rampz/search-data.png'}
                                alt="No Data"
                                width={57}
                                height={56}
                              />
                              <p className="text-center text-white custom-font-16">
                                You have no active deposits.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === 'completed' && (
                      <>
                        {transactions.completed.length > 0 ? (
                          <div className="rounded-xl overflow-x-auto">
                            <table className="min-w-full divide-y divide-black ">
                              <thead className=" whitespace-nowrap">
                                <tr className="bg-primary text-xs font-normal leading-4">
                                  <th className="px-4 py-4 text-left">
                                    Wallet Address
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Amount
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Quantity
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Transaction Hash
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Reference No
                                  </th>
                                </tr>
                              </thead>

                              <tbody className="bg-primary divide-y divide-black whitespace-nowrap">
                                {transactions.completed.map((txn, index) => (
                                  <tr
                                    key={index}
                                    className=" text-xs font-bold leading-4"
                                  >
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.wallet}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.amount}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.quantity}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.hash}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.reference}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-full ">
                            <div className="flex flex-col items-center gap-2 ">
                              <Image
                                src={'/rampz/search-data.png'}
                                alt="No Data"
                                width={57}
                                height={56}
                              />
                              <p className="text-center text-white custom-font-16">
                                You have no Complete deposits.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === 'cancelled' && (
                      <>
                        {transactions.cancelled.length > 0 ? (
                          <div className="rounded-xl overflow-x-auto">
                            <table className="min-w-full divide-y divide-black ">
                              <thead className=" whitespace-nowrap">
                                <tr className="bg-primary text-xs font-normal leading-4">
                                  <th className="px-4 py-4 text-left">
                                    Wallet Address
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Amount
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Quantity
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Transaction Hash
                                  </th>
                                  <th className="px-4 py-4 text-left">
                                    Reference No
                                  </th>
                                </tr>
                              </thead>

                              <tbody className="bg-primary divide-y divide-black whitespace-nowrap">
                                {transactions.cancelled.map((txn, index) => (
                                  <tr
                                    key={index}
                                    className=" text-xs font-bold leading-4"
                                  >
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.wallet}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.amount}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.quantity}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.hash}
                                    </td>
                                    <td className="px-4 py-4 text-left font-semibold">
                                      {txn.reference}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-full ">
                            <div className="flex flex-col items-center gap-2 ">
                              <Image
                                src={'/rampz/search-data.png'}
                                alt="No Data"
                                width={57}
                                height={56}
                              />
                              <p className="text-center text-white custom-font-16">
                                You have no cancelled deposits.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </ShadowBox>
            </ShadowBox>
          </ShadowBox>
        </div>
      )}
    </>
  );
};

export default OffRamp;
