
import React from 'react';

const P2PPaymentMethods = () => {
  return (
    <section className=" text-white">
      <div className=" flex justify-between items-center">
        <div>
          <h2 className="text-[23px] font-[600] mb-2">P2P Payment Methods</h2>
          <p className="text-[#A6A6A6] text-[18px] font-[400] max-w-xl">
            When you sell cryptocurrencies, the payment methods you add will be displayed to buyers as
            options for receiving payment. Please ensure that the account owner's name matches your
            verified name on Local Coins. You can add up to 20 different payment methods.
          </p>
        </div>

        <div>
          <button className="bg-[#454545] hover:bg-gray-600 text-white px-6 py-3 rounded-md flex items-center space-x-2">
            <span className="text-xl">+</span>
            <span>Add Payment Method</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default P2PPaymentMethods;
