import React from 'react';
import NewHeader from '../NewHeader/NewHeader';
import MainHeading from '../Elements/MainHeading';
import OrderComponent from './OrderComponent';
import ChatBox from './ChatBox';

const MyOrder = () => {
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
          <OrderComponent />
        </div>
        <div className="col-span-5 mt-6 rounded-[15px] h-full">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
