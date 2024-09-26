'use client';

import React from 'react';
import NewHeader from '../NewHeader/NewHeader';
import MainHeading from '../Elements/MainHeading';
import OrderComponent from './OrderComponent';
import ChatBox from './ChatBox';
import { gql, useQuery } from 'urql';
import { useSearchParams } from 'next/navigation';

const GET_SALE = gql`
  query Sales($salesId: String) {
    sales(id: $salesId) {
      sales {
        amount
        buyer {
          id
          publicKey
        }
        createdAt
        id
        tx
        seller {
          name
          publicKey
          id
        }
        buyer {
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

const MyOrder = () => {
  const searchParams = useSearchParams();
  const salesId = searchParams.get('sale');
  const [{ fetching, data }] = useQuery({
    query: GET_SALE,
    variables: { salesId },
    pause: !salesId,
  });
  const [sale] = data?.sales?.sales || [];

  return (
    <div className="w-[85%] mx-auto ">
      <NewHeader />

      <div className="mt-10 ">
        <MainHeading
          title="MY ORDER"
          para=" Order Created, Pay the Seller within"
          t1="P2P Help Center"
          time=" 15:00"
          t2="Orders"
        />
      </div>
      <div className="grid grid-cols-12 mt-4">
        <div className="col-span-7 w-full">
          <OrderComponent sale={sale} />
        </div>
        <div className="col-span-5 mt-6 rounded-[15px] h-full">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
