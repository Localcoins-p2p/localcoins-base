'use client';

import React from 'react';
import P2PTableRow from './P2PTableRow';
import { gql, useQuery } from 'urql';
import Loading from './Loading';

const GET_SALES = gql`
  query Sales {
    sales {
      sales {
        amount
        buyer {
          id
          publicKey
        }
        createdAt
        id
        tx
        onChainSaleId
        seller {
          name
          publicKey
          id
        }
        screenshotMehtods
        unitPrice
      }
    }
  }
`;

export const GET_BUYER_SALES = gql`
  query BuyerSales {
    buyerSales {
      amount
      buyer {
        id
        name
        publicKey
      }
      canceledAt
      createdAt
      finishedAt
      id
      onChainSaleId
      paidAt
      screenshotMehtods
      seller {
        id
        name
        publicKey
      }
      unitPrice
    }
  }
`;

export const GET_SELLER_SALES = gql`
  query SellerSales {
    sellerSales {
      amount
      buyer {
        id
        name
        publicKey
      }
      canceledAt
      createdAt
      finishedAt
      id
      onChainSaleId
      paidAt
      screenshotMehtods
      seller {
        id
        name
        publicKey
      }
      unitPrice
    }
  }
`;

interface P2PTableProps {
  type?: 'ALL' | 'BUYER' | 'SELLER';
}

const queries = {
  ALL: GET_SALES,
  BUYER: GET_BUYER_SALES,
  SELLER: GET_SELLER_SALES,
};

const P2PTable: React.FC<P2PTableProps> = ({ type }) => {
  const query = type ? queries[type] : GET_SALES;
  const [{ data, fetching }] = useQuery({ query });
  const sales =
    data?.sales?.sales || data?.sellerSales || data?.buyerSales || [];

  if (fetching) {
    return (
      <div className="h-44 flex justify-center items-center">
        <Loading height="[24px]" width="[24px]" color="#333333" />
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="text-white text-opacity-70 text-center flex justify-center items-center h-44 ">
        You don&apos;t have any sales
      </div>
    );
  }

  if (data) {
    return (
      <div>
        <table className="table-auto w-full text-left">
          <thead className="hidden md:table-header-group text-[#A6A6A6] text-[14px] font-[400]">
            <tr>
              <th className=" py-2 text-[#A6A6A6] text-[14px] font-[400]">
                Advertisers
              </th>
              <th className=" py-2 text-[#A6A6A6] text-[14px] font-[400]">
                Price
              </th>
              <th className=" py-2 text-[#A6A6A6] text-[14px] font-[400]">
                Available/Order Limit
              </th>
              <th className="py-2 text-[#A6A6A6] text-[14px] font-[400]">
                Payment
              </th>
              <th className=" py-2 text-end text-[#A6A6A6] text-[14px] font-[400]">
                Trade
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((row: any, index: number) => (
              <P2PTableRow
                key={index}
                sale={row}
                advertiser={row.seller}
                price={row.unitPrice}
                available={row.amount}
                limit={row.amount}
                payments={row.payments || []}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default P2PTable;
