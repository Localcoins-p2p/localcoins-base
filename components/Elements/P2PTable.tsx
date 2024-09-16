// P2PTable.tsx
import React from 'react';
import P2PTableRow from './P2PTableRow';


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
  return (
    <div>
      <table className="table-auto w-full text-left">
        <thead className="hidden md:table-header-group text-[#A6A6A6] text-[14px] font-[400]">
          <tr>
            <th className=" py-2 text-[#A6A6A6] text-[14px] font-[400]">Advertisers</th>
            <th className=" py-2 text-[#A6A6A6] text-[14px] font-[400]">Price</th>
            <th className=" py-2 text-[#A6A6A6] text-[14px] font-[400]">Available/Order Limit</th>
            <th className="py-2 text-[#A6A6A6] text-[14px] font-[400]">Payment</th>
            <th className=" py-2 text-end text-[#A6A6A6] text-[14px] font-[400]">Trade</th>
          </tr>
        </thead>
        <tbody>
          {p2pData.map((row, index) => (
            <P2PTableRow
              key={index}
              advertiser={row.advertiser}
              price={row.price}
              available={row.available}
              limit={row.limit}
              payments={row.payments}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P2PTable;
