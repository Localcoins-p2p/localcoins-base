'use client';

import React, { useState } from 'react';
import P2PTableRow from '../Elements/P2PTableRow';
import NewHeader from '../NewHeader/NewHeader';
import Loading from '../Elements/Loading';
import { gql, useQuery } from 'urql';
import ModalComponent from '../Elements/ConnectWallet';

const GET_SALES = gql`
  query Sales($skip: Int!, $take: Int!) {
    sales(skip: $skip, take: $take) {
      sales {
        amount
        buyer {
          id
          publicKey
        }
        createdAt
        id
        tx
        screenshots {
          imageUrl
          method {
            name
          }
        }
        seller {
          name
          publicKey
          id
          paymentMethods {
            id
            name
            accountNumber
            accountName
          }
        }
        unitPrice
        blockchain
        currency
        onChainSaleId
        finishedAt
      }
      count
    }
  }
`;

const itemsPerPage = 5;

// console.log(row.seller?.paymentMethods);

const Index: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const [{ data, fetching }] = useQuery({
    query: GET_SALES,
    variables: { skip: (page - 1) * itemsPerPage, take: itemsPerPage },
  });

  const sales = data?.sales?.sales || [];
  const totalCount = data?.sales?.count || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleOpenModal = (sale: any) => {
    setSelectedSale(sale);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedSale(null);
  };

  return (
    <div className="px-[100px]">
      <ModalComponent
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Sale Details"
      >
        {selectedSale ? (
          <div>
            <h2>hello</h2>
            {/* Display other fields as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </ModalComponent>

      <NewHeader />
      <h1 className="text-[#fff] mt-[70px] text-[28px]">Disputes</h1>

      <div className="mt-[25px]">
        <table className="table-auto w-full text-left">
          <thead className="hidden md:table-header-group text-[#A6A6A6] text-[14px] font-[400]">
            <tr>
              <th className="py-2 text-[#A6A6A6] text-[14px] font-[400]">
                Buyer
              </th>
              <th className="py-2 text-[#A6A6A6] text-[14px] font-[400]">
                Seller
              </th>
              <th className="py-2 text-[#A6A6A6] text-[14px] font-[400]">
                Amount
              </th>
              <th className="py-2 text-[#A6A6A6] text-[14px] font-[400]">ID</th>
              <th className="py-2 text-start text-[#A6A6A6] text-[14px] font-[400]">
                Payment
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {fetching ? (
              <tr>
                <td colSpan={5} className="text-center text-[#fff]">
                  Loading...
                </td>
              </tr>
            ) : (
              sales.map((row: any, index: number) => (
                // <P2PTableRow
                //   key={index}
                //   sale={row}
                //   reputation={row.reputation}
                //   advertiser={row.seller}
                //   price={row.unitPrice}
                //   available={row.amount}
                //   limit={row.amount}
                //   paymentMethods={row.seller?.paymentMethods || []}
                // />
                <React.Fragment key={index}>
                  <tr>
                    <td className="text-center text-[#fff]">
                      {row.reputation}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center text-[#fff]">
                      {row.seller?.name || "No Seller"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center text-[#fff]">
                      {row.unitPrice}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center text-[#fff]">
                      {row.amount}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center text-[#fff]">
                      <button>Seller Disputes</button>
                      <button>Buyer Disputes</button>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody> */}
          <tbody>
            {fetching ? (
              <tr>
                <td colSpan={5} className="text-center text-[#fff]">
                  Loading...
                </td>
              </tr>
            ) : (
              sales.map((row: any, index: number) => (
                <tr key={index} className="text-[#fff] text-center">
                  <td className="py-2 text-start">
                    {row.buyer?.publicKey || 'N/A'}
                  </td>
                  <td className="py-2 text-start">
                    {row.seller?.name || 'No Seller'}
                  </td>
                  <td className="py-2 text-start">{row.amount}</td>
                  <td className="py-2 text-start">{row.id}</td>
                  <td className="py-2 text-start">
                    <button className="text-[#fff] bg-[#393939] py-1 px-3 rounded-2xl">
                      Seller Disputes
                    </button>
                    {/* {row.seller?.paymentMethods?.map((method: any, methodIndex: number) => (
                      <div key={methodIndex} className="flex flex-col items-center">
                        <span>{method.name}</span>
                        <span>{method.accountNumber || 'No Account Number'}</span>
                      </div>
                    )) || 'No Payment Methods'} */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-[60px]">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="w-[100px] py-1 bg-[#F3AA05] text-white rounded-3xl disabled:bg-gray-500"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-[50vh] ${
                page === i + 1
                  ? 'bg-[#F3AA05] text-white'
                  : 'bg-[#393939] text-[#f0f0f0]'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="w-[100px] py-1 bg-[#F3AA05] text-white rounded-3xl disabled:bg-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
