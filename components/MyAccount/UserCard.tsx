import React from 'react';

const UserCard= ({heading,name,phone}:{heading:string,name:string,phone:string}) => {
  return (
    <div className=" text-white rounded-lg border border-[#454545]">
      <div className="flex justify-between bg-black items-center p-2">
        <div className="flex items-center">
          <span className="text-blue-500 mr-2">&#8226;</span>
          <div className="font-[600] text-[18px]">{heading}</div>
        </div>
        <div className="flex text-[18px] font-[600] space-x-4">
          <button className="text-[#F3AA05]">Edit</button>
          <button className="text-[#F3AA05]">Delete</button>
        </div>
      </div>

      <div className="flex justify-between p-4">
        <div>
          <p className="text-[13px] text-[#A6A6A6]">Name</p>
          <p className="font-[500] text-[18px] text-[#FFFFFF]">{name}</p>
        </div>
        <div>
          <p className="text-[13px] text-[#A6A6A6]">Mobile Number</p>
          <p className="font-[500] text-[18px] text-[#FFFFFF]">{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
