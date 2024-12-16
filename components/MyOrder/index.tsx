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
import AppLoading from '../Elements/AppLoading';

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
        screenshots {
          imageUrl
          method {
            name
          }
        }
        hasScreenshots
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
        buyer {
          name
          publicKey
          id
        }
        screenshotMehtods
        unitPrice
        createdAt
        paidAt
        isDisputed
        canceledAt
        blockchain
        currency
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
  const [image, setImage] = useState('');
  const [referenceId, setReferenceId] = useState();
  // console.log("img",image)
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

  const firstTimeLoading = !sale && fetching;

  const isSeller = user?.id === sale?.seller?.id;
  const isBuyer = user?.id === sale?.buyer?.id;

  const showConfirmPaymentReceivedButton =
    isSeller && !sale?.paidAt && !sale?.canceledAt;
  const hideConfirmButtonShowDisputes =
    showConfirmPaymentReceivedButton && !sale?.hasScreenshots;
  console.log('<<<<', showConfirmPaymentReceivedButton, sale?.hasScreenshots);
  const showConfirmPaymentSentButton =
    isBuyer && !sale?.paidAt && !sale?.isCanceled;
  const showClaimPaymentButton = isBuyer && sale?.paidAt && !sale.finishedAt;

  const showSellerDisputeButton =
    isSeller &&
    sale?.screenshots?.length > 0 &&
    !sale.isDisputed &&
    !sale.isCanceled &&
    !sale.isFinished;
  const showBuyerDisputeButton =
    isBuyer &&
    sale?.screenshots?.length > 0 &&
    !sale.isDisputed &&
    !sale.isCanceled &&
    !sale.isFinished;

  // if (!sale) {
  //   return <div className='text-white'>Loading...</div>;
  // }

  if (firstTimeLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <AppLoading />
      </div>
    );
  }

  return (
    <>
      <div className="w-[85%] mx-auto ">
        <NewHeader />

        <div className="mt-10 ">
          <MainHeading
            title="MY ORDER"
            para=" Order Created, Pay the Seller within"
            t1="My Account"
            time=" 15:00"
            t2="Orders"
            href="/my-account"
            icon="assets/common/userrIcon.svg"
          />
        </div>

        <div className="grid grid-cols-12 mt-4">
          <div className="col-span-7 w-full">
            <OrderComponent
              sale={sale}
              showConfirmPaymentSentButton={showConfirmPaymentSentButton}
              showConfirmPaymentReceivedButton={
                showConfirmPaymentReceivedButton
              }
              showClaimPaymentButton={showClaimPaymentButton}
              hideConfirmButtonShowDisputes={hideConfirmButtonShowDisputes}
              loading={fetching}
              image={image}
              isSeller={isSeller}
              isBuyer={isBuyer}
              showSellerDisputeButton={showSellerDisputeButton}
              showBuyerDisputeButton={showBuyerDisputeButton}
              referenceId={referenceId}
            />
          </div>
          <div className="col-span-5 mt-6 rounded-[15px] h-full">
            <ChatBox
              setReferenceId={setReferenceId}
              sale={sale}
              setImage={setImage}
              isBuyer={isBuyer}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
