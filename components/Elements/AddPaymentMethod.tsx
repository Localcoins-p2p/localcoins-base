import React, { useState } from 'react';

const AddPaymentMethod = ({ onSave , onClose }: any) => {
  const [paymentMethods, setPaymentMethods] = useState([
    { paymentMethod: '', accountNumber: '' },
  ]);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    const updatedMethods = [...paymentMethods];
    updatedMethods[index] = {
      ...updatedMethods[index],
      [name as 'paymentMethod' | 'accountNumber']: value
    };
    setPaymentMethods(updatedMethods);
  };

  const handleAddMethod = () => {
    if (paymentMethods.length < 5) {
      setPaymentMethods([...paymentMethods, { paymentMethod: '', accountNumber: '' }]);
    }

  };

  const handleRemoveMethod = (index: number) => {
    const updatedMethods = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(updatedMethods);
  };

  const handleSave = () => {
    onSave(paymentMethods);
    onClose();
  };

  return (
    <div className="p-4 overflow-y-scroll h-[90vh]">
      {paymentMethods.map((method, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Payment Method {index + 1}
          </label>
          <input
            type="text"
            name="paymentMethod"
            value={method.paymentMethod}
            placeholder="Enter Payment Method"
            onChange={(e) => handleInputChange(index, e)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <label className="block text-sm font-medium text-gray-700 mt-2">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            value={method.accountNumber}
            placeholder="Enter Account Number"
            onChange={(e) => handleInputChange(index, e)}
            className="mt-1 block px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          {paymentMethods.length > 1 && (
            <button
              onClick={() => handleRemoveMethod(index)}
              className="text-red-500 text-sm mt-2"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {paymentMethods.length < 5 && (
        <button
          onClick={handleAddMethod}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300"
        >
          + Add Payment Method
        </button>
      )}

      <button
        onClick={handleSave}
        className="w-full px-4 py-2 bg-[#f3aa05] text-white text-sm font-medium rounded hover:bg-blue-600"
      >
        Save Payment Methods
      </button>
    </div>
  );
};

export default AddPaymentMethod;
