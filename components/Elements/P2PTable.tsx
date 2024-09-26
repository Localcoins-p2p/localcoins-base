'use client';

import React from 'react';
import P2PTableRow from './P2PTableRow';
import { gql, useQuery } from 'urql';

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

const p2pData = [
  {
    advertiser: {
      name: 'Juan Dela Cruz',
      initials: 'J',
      orders: 462,
      completionRate: '100.00%',
    },
    price: '1.00',
    available: '14,560.00',
    limit: '$50.00 - $999.00',
    payments: [
      { name: 'Gcash', color: '#00B2FF' },
      { name: 'BPI', color: '#FF2E00' },
    ],
  },
  {
    advertiser: {
      name: 'Juan Dela Cruz',
      initials: 'J',
      orders: 462,
      completionRate: '100.00%',
    },
    price: '1.00',
    available: '14,560.00',
    limit: '$50.00 - $999.00',
    payments: [
      { name: 'Gcash', color: '#00B2FF' },
      { name: 'BPI', color: '#FF2E00' },
    ],
  },
  {
    advertiser: {
      name: 'Juan Dela Cruz',
      initials: 'J',
      orders: 462,
      completionRate: '100.00%',
    },
    price: '1.00',
    available: '14,560.00',
    limit: '$50.00 - $999.00',
    payments: [
      { name: 'Gcash', color: '#00B2FF' },
      { name: 'BPI', color: '#FF2E00' },
    ],
  },
  {
    advertiser: {
      name: 'Juan Dela Cruz',
      initials: 'J',
      orders: 462,
      completionRate: '100.00%',
    },
    price: '1.00',
    available: '14,560.00',
    limit: '$50.00 - $999.00',
    payments: [
      { name: 'Gcash', color: '#00B2FF' },
      { name: 'BPI', color: '#FF2E00' },
    ],
  },
  {
    advertiser: {
      name: 'Juan Dela Cruz',
      initials: 'J',
      orders: 462,
      completionRate: '100.00%',
    },
    price: '1.00',
    available: '14,560.00',
    limit: '$50.00 - $999.00',
    payments: [
      { name: 'Gcash', color: '#00B2FF' },
      { name: 'BPI', color: '#FF2E00' },
    ],
  },
  {
    advertiser: {
      name: 'Juan Dela Cruz',
      initials: 'J',
      orders: 462,
      completionRate: '100.00%',
    },
    price: '1.00',
    available: '14,560.00',
    limit: '$50.00 - $999.00',
    payments: [
      { name: 'Gcash', color: '#00B2FF' },
      { name: 'BPI', color: '#FF2E00' },
    ],
  },
];

const P2PTable: React.FC = () => {
  const [{ data, fetching }] = useQuery({ query: GET_SALES });
  const sales = data?.sales?.sales || [];

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
