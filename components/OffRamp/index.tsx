'use client';

import { useState } from 'react';
import ShadowBox from '../Elements/ShadowBox';
import Image from 'next/image';
import NewOffRamp from './NewOffRamp';
import { gql, useQuery } from 'urql';
import Pagination from '../Elements/Pagination';

export const SALES = gql`
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

const OffRamp = () => {
  const [activeTab, setActiveTab] = useState('saleOrder');
  const [newOffRampState, setNewOffRampState] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const [{ data: SalesData, fetching: fetchingSales, error: SalesError }] =
    useQuery({
      query: SALES,
    });

  console.log(SalesData, 'SALES');

  // Calculate the total number of pages
  const totalPages = SalesData?.transactions
    ? Math.ceil(SalesData.transactions.length / itemsPerPage)
    : 0;

  // Get the current items for the page
  const currentItems =
    SalesData?.transactions?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  return (
    <>
      {newOffRampState ? (
        <NewOffRamp setNewOffRampState={setNewOffRampState} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <ShadowBox className="bg-secondary bg-opacity-70 w-[722px] p-4">
            <ShadowBox className="bg-[#D2E1D9] flex flex-col gap-4 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-custom-font-16 text-secondary ">Sales</h4>
                <button
                  onClick={() => setNewOffRampState(true)}
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
                          activeTab === 'saleOrder' ? 'bg-primary' : 'border'
                        }`}
                        onClick={() => setActiveTab('saleOrder')}
                      >
                        Sales Order
                      </button>
                      <button
                        className={`px-2 py-1 rounded-md text-white font-normal text-xs leading-4 ${
                          activeTab === 'purchaseOrder'
                            ? 'bg-primary'
                            : 'border'
                        }`}
                        onClick={() => setActiveTab('purchaseOrder')}
                      >
                        Purchasse Order
                      </button>
                      {/* <button
                        className={`px-2 py-1 rounded-md text-white font-normal text-xs leading-4 ${
                          activeTab === 'cancelled' ? 'bg-primary' : 'border'
                        }`}
                        onClick={() => setActiveTab('cancelled')}
                      >
                        Cancelled
                      </button> */}
                    </div>
                    {/* {activeTab === 'active' && (
                      <button className="bg-primary text-white px-2 py-1 rounded-md font-normal text-xs leading-4">
                        Release Crypto
                      </button>
                    )} */}
                    {/* {activeTab === 'purchaseOrder' && (
                      <div className="flex justify-end items-center gap-2 text-white font-normal text-xs leading-4">
                        <span>From:</span>
                        <input type="date" className="p-1 rounded-md" />
                        <span>To:</span>
                        <input type="date" className="p-1 rounded-md" />
                      </div>
                    )} */}
                  </div>

                  <div className="mt-4">
                    {activeTab === 'saleOrder' && (
                      <>
                        {currentItems?.length > 0 ? (
                          <>
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
                                  {currentItems?.map(
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
                            {/* Pagination Component */}
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={setCurrentPage}
                              className="mt-4"
                            />
                          </>
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            {' '}
                            {/* Ensure the parent has a height */}
                            <div className="flex flex-col items-center gap-2">
                              <Image
                                src={'/rampz/search-data.png'}
                                alt="No Data"
                                width={57}
                                height={56}
                              />
                              <p className="text-center text-white custom-font-16">
                                You have no sales Order.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === 'purchaseOrder' && (
                      <>
                        {currentItems?.length > 0 ? (
                          <>
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
                                  {currentItems?.map(
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
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={setCurrentPage}
                              className="mt-4"
                            />
                          </>
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
                                You have no purchase Order.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* {activeTab === 'cancelled' && (
                      <>
                        {SalesData?.transactions?.length > 0 ? (
                          <div className="rounded-xl overflow-x-auto">
                            <table className="min-w-full divide-y divide-black ">
                              <thead className="whitespace-nowrap">
                                <tr className="bg-primary text-xs font-normal leading-4">
                                  <th className="px-4 py-4 text-left">Wallet Address</th>
                                  <th className="px-4 py-4 text-left">Amount</th>
                                  <th className="px-4 py-4 text-left">Quantity</th>
                                  <th className="px-4 py-4 text-left">Transaction Hash</th>
                                  <th className="px-4 py-4 text-left">Reference No</th>
                                </tr>
                              </thead>
                              <tbody className="bg-primary divide-y divide-black whitespace-nowrap">
                                {transactionsData.transactions.map((txn: any, index: number) => (
                                  <tr key={index} className="text-xs font-bold leading-4">
                                    <td className="px-4 py-4 text-left font-semibold">{txn.blockchain}</td>
                                    <td className="px-4 py-4 text-left font-semibold">{txn.amount}</td>
                                    <td className="px-4 py-4 text-left font-semibold">{txn.size}</td>
                                    <td className="px-4 py-4 text-left font-semibold">{txn.tx}</td>
                                    <td className="px-4 py-4 text-left font-semibold">{txn.id}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-full ">
                            <div className="flex flex-col items-center gap-2 ">
                              <Image src={'/rampz/search-data.png'} alt="No Data" width={57} height={56} />
                              <p className="text-center text-white custom-font-16">You have no cancelled deposits.</p>
                            </div>
                          </div>
                        )}
                      </>
                    )} */}
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
