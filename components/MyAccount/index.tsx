'use client';
import React, { useMemo, useState } from 'react';
import NewHeader from '../NewHeader/NewHeader';
import MainHeading from '../Elements/MainHeading';
import ProfileHeader from './ProfileHeader';
import Trades from './Trades';
import UserCard from './UserCard';
import AccountManagement from './AccountManagement';
import P2PPaymentMethods, { GET_PAYMENT_METHODS } from './P2PPaymentMethods';
import Image from 'next/image';
import P2PTable from '../Elements/P2PTable';
import { useQuery } from 'urql';
import Loading from '../Elements/Loading';

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
  const users = [
    { heading: 'Gouth', name: 'umar', phone: '5465465465' },
    { heading: 'John', name: 'doe', phone: '1234567890' },
    { heading: 'Jane', name: 'smith', phone: '9876543210' },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [{ fetching, data: paymentMethodResponse }] = useQuery({
    query: GET_PAYMENT_METHODS,
  });
  const [selectedUser, setSelectedUser] = useState<{
    name?: string;
    phone?: string;
    heading?: string;
  }>();

  const paymentMethods = useMemo(() => {
    return paymentMethodResponse?.paymentMethods || [];
  }, [paymentMethodResponse]);

  const handleEdit = (
    editStatus: boolean,
    name: string,
    phone: string,
    heading: string
  ) => {
    setIsEditing(editStatus);
    setSelectedUser({ name, phone, heading });
  };
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
        <ProfileHeader />
      </div>

      {/* <div className="flex lg:flex-row flex-container1 flex-container  gap-3 my-10">
        {tradesData.map((trade, index) => (
          <Trades
            key={index}
            heading={trade.heading}
            timer={trade.timer}
            positive={trade.p}
            negitive={trade.n}
          />
        ))}

        <div className="border hidden border-[#454545] rounded-[10px] lg:flex justify-center items-center h-[168px] px-4">
          <Image
            src={'/assets/common/menutwo.svg'}
            height={29}
            width={29}
            alt="vv"
          />
        </div>
      </div> */}
      <div className="my-10 overflow-x-scroll no-scrollbar">
        <AccountManagement onTabChange={handleTabChange} />
      </div>

      {(activeTab === 1 || activeTab === 2) && <P2PTable />}
      <div className="mb-6">
        <P2PPaymentMethods
          isEditing={isEditing}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
        />
      </div>

      {fetching ? (
        <div className="h-44 w-full flex justify-center items-center">
          <Loading height="[24px]" width="[24px]" color="#333333" />
        </div>
      ) : (
        paymentMethods.map((method: any, index: number) => (
          <div key={index} className="my-4">
            <UserCard paymmentMethod={method as any} onEdit={handleEdit} />
          </div>
        ))
      )}

      {!fetching && paymentMethods.length === 0 && (
        <div className="text-white text-opacity-70 text-center flex justify-center items-center h-44 ">
          You have not added any payment method
        </div>
      )}
    </div>
  );
};

export default MyAccount;
