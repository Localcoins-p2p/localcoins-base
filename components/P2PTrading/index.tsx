import React from 'react';
import MainHeading from '../Elements/MainHeading';
import NewHeader from '../NewHeader/NewHeader';
import P2PTable from '../Elements/P2PTable';
import Footer from '../Footer/Footer';
import BuySellTabs from '../Elements/BuySellTabs';
import FilterPanel from '../Elements/FilterPanel';

const P2PTrading = () => {
  return (
    <div className="w-[85%] mx-auto ">
      <NewHeader />

      <div className="mt-10 ">
        <MainHeading
          title="P2P"
          para=" Securely Buy and Sell Digital Assets with Flexible Payment Options"
          t1="My Account"
          t2="Orders"
          href="/my-account"
          icon="assets/common/userrIcon.svg"
        />
      </div>
      {/* <BuySellTabs/> */}
      <div className="mt-10 mb-6">
        {' '}
        <FilterPanel />
      </div>
      <P2PTable />
      <Footer />
    </div>
  );
};

export default P2PTrading;
