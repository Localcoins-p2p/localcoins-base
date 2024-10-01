import { useState, useEffect } from 'react';

interface PaymentFormProps {
  onSubmit: (
    paymentMethod: string,
    paymentNumber: string,
    accountName: string
  ) => void;
  selectedUser: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  selectedUser,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const { name, phone, heading } = selectedUser || {};

  useEffect(() => {
    if (phone) {
      setAccountNumber(phone);
    }
  }, [phone]);

  useEffect(() => {
    if (heading) {
      setPaymentMethod(heading);
    }
  }, [phone]);

  useEffect(() => {
    if (name) {
      setAccountName(name);
    }
  }, [phone]);

  const handleSubmit = () => {
    onSubmit(paymentMethod, accountNumber, accountName);
  };

  const isEdit = !!selectedUser;

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <input
          type="text"
          placeholder="Enter Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account Name
        </label>
        <input
          type="text"
          placeholder="Enter Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="mt-1 block px-3 py-2 w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account Number
        </label>
        <input
          type="text"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="mt-1 block px-3 py-2 w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-[#f3aa05] text-white text-sm font-medium rounded hover:bg-blue-600"
      >
        {isEdit ? 'Update Payment Method' : 'Add Payment Method'}
      </button>
    </div>
  );
};

export default PaymentForm;
