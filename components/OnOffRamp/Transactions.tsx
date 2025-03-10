'use client';

import { useContext, useState } from 'react';
import ShadowBox from '../Elements/ShadowBox';
import Image from 'next/image';
import { gql, useQuery } from 'urql';
import NewOffRamp from '../OffRamp/NewOffRamp';
import { AppContext } from '@/utils/context';
import { ArrowRightCircle, Banknote, Wallet } from 'lucide-react';

export const TRANSACTIONS = gql`
  query Query {
    transactions {
      amount
      blockchain
      createdAt
      currency
      id
      size
      tx
    }
  }
`;

const Transactions = () => {
  const {
    context: { user },
  } = useContext(AppContext);

  console.log(user, ':user');
  const [activeTab, setActiveTab] = useState('completed');
  const [newOffRampState, setNewOffRampState] = useState<boolean>(false);

  const [
    {
      data: transactionsData,
      fetching: fetchingTransactions,
      error: transactionsError,
    },
  ] = useQuery({
    query: TRANSACTIONS,
  });

  console.log(transactionsData, 'transactionsData');

  return (
    <>
      {newOffRampState ? (
        <NewOffRamp setNewOffRampState={setNewOffRampState} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <ShadowBox className="bg-secondary bg-opacity-70 w-[722px] p-4">
            <ShadowBox className="bg-[#D2E1D9] flex flex-col gap-4 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-custom-font-16 text-secondary ">
                  Transactions
                </h4>
                <ShadowBox className="flex items-center gap-6 bg-secondary px-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <Wallet className="text-primary h-5 w-5" />
                    <p className="text-white text-sm font-medium">
                      Balance:
                      <span className="font-semibold text-lg ml-1">
                        {user?.balance ?? 0}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Banknote className="text-primary h-5 w-5" />
                    <p className="text-white text-sm font-medium">
                      Available For Withdrawal:
                      <span className="font-semibold text-lg ml-1">
                        {user?.availableForWithdrawal ?? 0}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => setNewOffRampState(true)}
                    className="px-4 py-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 border border-primary font-medium text-sm text-white hover:scale-105 transition-all duration-200"
                  >
                    Withdrawal <ArrowRightCircle className="h-5 w-5" />
                  </button>
                </ShadowBox>
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
                    {activeTab === 'completed' && (
                      <div className="flex justify-end items-center gap-2 text-white font-normal text-xs leading-4">
                        <span>From:</span>
                        <input type="date" className="p-1 rounded-md" />
                        <span>To:</span>
                        <input type="date" className="p-1 rounded-md" />
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    {activeTab === 'active' && (
                      <>
                        {transactionsData?.transactions?.length > 0 ? (
                          <div className="rounded-xl overflow-x-auto">
                            <table className="min-w-full divide-y divide-black ">
                              <thead className="whitespace-nowrap">
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
                                {transactionsData.transactions.map(
                                  (txn: any, index: number) => (
                                    <tr
                                      key={index}
                                      className="text-xs font-bold leading-4"
                                    >
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.blockchain}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.amount}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.size}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        Unfilled
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.id}
                                      </td>
                                    </tr>
                                  )
                                )}
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
                        {transactionsData?.transactions?.length > 0 ? (
                          <div className="rounded-xl overflow-x-auto">
                            <table className="min-w-full divide-y divide-black ">
                              <thead className="whitespace-nowrap">
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
                                {transactionsData.transactions.map(
                                  (txn: any, index: number) => (
                                    <tr
                                      key={index}
                                      className="text-xs font-bold leading-4"
                                    >
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.blockchain}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.amount}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.size}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.tx}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.id}
                                      </td>
                                    </tr>
                                  )
                                )}
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
                                You have no completed deposits.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === 'cancelled' && (
                      <>
                        {transactionsData?.transactions?.length > 0 ? (
                          <div className="rounded-xl overflow-x-auto">
                            <table className="min-w-full divide-y divide-black ">
                              <thead className="whitespace-nowrap">
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
                                {transactionsData.transactions.map(
                                  (txn: any, index: number) => (
                                    <tr
                                      key={index}
                                      className="text-xs font-bold leading-4"
                                    >
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.blockchain}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.amount}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.size}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.tx}
                                      </td>
                                      <td className="px-4 py-4 text-left font-semibold">
                                        {txn.id}
                                      </td>
                                    </tr>
                                  )
                                )}
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

export default Transactions;
