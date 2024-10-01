import React, { useState } from 'react';

interface UserCardProps {
  paymmentMethod: {
    id: string;
    name: string;
    accountName: string;
    accountNumber: string;
  };
  onEdit: (
    editStatus: boolean,
    id: string,
    name: string,
    phone: string,
    heading: string
  ) => void;
}

const UserCard: React.FC<UserCardProps> = ({ paymmentMethod, onEdit }) => {
  const [editStatus, setEditStatus] = useState(false);
  const { name, accountNumber, accountName, id } = paymmentMethod;

  const handleEdit = () => {
    setEditStatus((prevStatus) => !prevStatus);
    onEdit(!editStatus, id, accountName, accountNumber, name);
  };

  return (
    <div className="text-white rounded-lg border border-[#454545]">
      <div className="flex justify-between bg-black items-center p-2">
        <div className="flex items-center">
          <span className="text-blue-500 mr-2">&#8226;</span>
          <div className="font-[600] text-[18px]">{name}</div>
        </div>
        <div className="sm:flex text-[18px] font-[600] space-x-4 hidden">
          <button className="text-[#F3AA05]" onClick={handleEdit}>
            Edit
          </button>
          <button className="text-[#F3AA05]">Delete</button>
        </div>
      </div>

      <div className="flex flex-container gap-y-3 justify-between p-4">
        <div>
          <p className="text-[13px] text-[#A6A6A6]">Name</p>
          <p className="font-[500] text-[18px] text-[#FFFFFF]">{accountName}</p>
        </div>
        <div>
          <p className="text-[13px] text-[#A6A6A6]">Account Number</p>
          <p className="font-[500] text-[18px] text-[#FFFFFF]">
            {accountNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
