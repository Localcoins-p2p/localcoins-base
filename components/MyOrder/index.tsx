'use client';

import React, { useContext, useEffect, useState } from 'react';
import NewHeader from '../NewHeader/NewHeader';
import MainHeading from '../Elements/MainHeading';
import OrderComponent from './OrderComponent';
import ChatBox from './ChatBox';
import { gql, useQuery } from 'urql';
import { useSearchParams } from 'next/navigation';
import { AppContext } from '@/utils/context';
import useSolana from '@/utils/useSolana';

const GET_SALE = gql`
  query Sales($salesId: String) {
    sales(id: $salesId) {
      sales {
        amount
        buyer {
          id
          publicKey
        }
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
        createdAt
        paidAt
        canceledAt
        onChainSaleId
        finishedAt
      }
    }
  }
`;

const MyOrder = () => {
  const searchParams = useSearchParams();
  const salesId = searchParams.get('sale');
  const [sale, setSale] = useState<any>();
  const [{ fetching, data }, fetchSale] = useQuery({
    query: GET_SALE,
    variables: { salesId },
    pause: !salesId,
  });
  const [_sale] = data?.sales?.sales || [];
  const {
    context: { user },
  } = useContext(AppContext);

  useEffect(() => {
    setSale(_sale);
    const refetch = _sale && !_sale?.paidAt && !_sale?.canceledAt;
    if (refetch) {
      setTimeout(() => {
        fetchSale({ requestPolicy: 'network-only' });
      }, 3000);
    }
  }, [_sale]);

  const isSeller = user?.id === sale?.seller?.id;
  const isBuyer = user?.id === sale?.buyer?.id;

  const showConfirmPaymentReceivedButton =
    isSeller && !sale?.paidAt && !sale?.canceledAt;
  const showConfirmPaymentSentButton =
    isBuyer && !sale?.paidAt && !sale?.isCanceled;
  const showClaimPaymentButton = isBuyer && sale?.paidAt && !sale.isFinished;

  if (!sale) {
    return 'Loading...';
  }

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
          <OrderComponent
            sale={sale}
            showConfirmPaymentSentButton={showConfirmPaymentSentButton}
            showConfirmPaymentReceivedButton={showConfirmPaymentReceivedButton}
            showClaimPaymentButton={showClaimPaymentButton}
            loading={fetching}
          />
        </div>
        <div className="col-span-5 mt-6 rounded-[15px] h-full">
          <ChatBox sale={sale} />
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
