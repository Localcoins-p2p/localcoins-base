'use client';
import Image from 'next/image';
import { useState } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState('');

  return (
    <div className=" h-[80%] bg-gray-50 rounded-[15px] flex flex-col justify-between shadow-lg">
      {/* Header */}
      <div className="">
        <div className="flex items-center justify-between  rounded-tl-[15px] rounded-tr-[15px] p-4 border-b border-gray-300 bg-white">
          <div className="flex items-center">
            <Image
              src="/assets/common/c-t.svg" // Replace with the correct image path
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <h4 className="text-sm font-semibold">Juan Dela Cruz</h4>
              <div className="flex space-x-2 text-xs text-yellow-500">
                <span>Trades</span>
                <span>|</span>
                <span>Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div className="p-4 bg-gray-50">
          <div className="flex items-end space-x-2">
            <Image
              src="/assets/common/c-t.svg" // Replace with the correct image path
              alt="User Avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-700">
                This is a message. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="flex items-center p-4 border-t rounded-bl-[15px] rounded-br-[15px] border-gray-300 bg-white">
        <button className="mr-2 text-gray-500 hover:text-black">
          {/* Icon for attachment or other buttons */}
          &#43;
        </button>
        <input
          type="text"
          placeholder="Enter Message Here"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="ml-2 text-gray-500 hover:text-black">
          {/* Icon for send message */}
          &#9654;
        </button>
      </div>
    </div>
  );
};
export default ChatBox;
