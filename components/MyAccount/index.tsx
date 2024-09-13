import React from 'react';
import NewHeader from '../NewHeader/NewHeader';
import MainHeading from '../Elements/MainHeading';
import ProfileHeader from './ProfileHeader';
import Trades from './Trades';
import UserCard from './UserCard';

const MyAccount = () => {
  const tradesData = [
    { heading: '30d Trades', timer: '0 Time(s)' },
    { heading: '60d Trades', timer: '2 Time(s)' },
    { heading: '90d Trades', timer: '5 Time(s)' },
    { heading: '120d Trades', timer: '10 Time(s)' },
    {
      heading: '150d Trades',
      timer: '20 Time(s)',
      p: 'Positvvive (17) ',
      n: ' Negative (0)',
    },
  ];
  return (
    <div className="w-[85%] mx-auto mb-14">
      <NewHeader />
      <div className="mt-20">
        <MainHeading
          title="MY Account"
          para=" View your profile, check your wallet balance, secure your account, and
          track your transaction history—all in one place."
          t1="P2P Help Center"
          t2="Orders"
        />
      </div>
      <div className="mt-16">
        {' '}
        <ProfileHeader />
      </div>

      <div className="flex  space-x-3 my-10">
        {tradesData.map((trade, index) => (
          <Trades
            key={index}
            heading={trade.heading}
            timer={trade.timer}
            positive={trade.p}
            negitive={trade.n}
          />
        ))}

        <div className="border border-[#454545] rounded-[10px] flex justify-center items-center h-[168px] px-4">
          <div className="bg-yellow-500 rounded-full  w-[29px] h-[29px] flex items-center justify-center">
            <div className="text-black text-lg">...</div>
          </div>
        </div>
      </div>
      <UserCard heading='Gouth' name='umar ' phone='5465465465'/>
    </div>
  );
};

export default MyAccount;
