import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { gql, useMutation } from 'urql';
import Loading from '../Elements/Loading';

interface PaymentFormProps {
  onSubmit: () => void;
  selectedUser: any;
}

const ADD_PAYMENT_METHOD = gql`
  mutation AddPaymentMethod(
    $name: String!
    $accountNumber: String!
    $accountName: String!
  ) {
    addPaymentMethod(
      name: $name
      accountNumber: $accountNumber
      accountName: $accountName
    ) {
      id
    }
  }
`;

const UPDATE_PAYMENT_METHOD = gql`
  mutation UpdatePaymentMethod(
    $id: String!
    $name: String
    $accountNumber: String
    $accountName: String
  ) {
    updatePaymentMethod(
      id: $id
      name: $name
      accountNumber: $accountNumber
      accountName: $accountName
    ) {
      id
    }
  }
`;

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  selectedUser,
}) => {
  const [{ fetching: adding }, addPaymentMethod] =
    useMutation(ADD_PAYMENT_METHOD);
  const [{ fetching: updating }, updatePaymentMethod] = useMutation(
    UPDATE_PAYMENT_METHOD
  );

  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const { id, name, phone, heading } = selectedUser || {};
  const loading = adding || updating;

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

  const handleSubmit = async () => {
    //onSubmit(paymentMethod, accountNumber, accountName);
    if (!id) {
      await addPaymentMethod({
        name: paymentMethod,
        accountName,
        accountNumber,
      });
    } else {
      await updatePaymentMethod({
        id,
        name: paymentMethod,
        accountName,
        accountNumber,
      });
    }
    toast.success('Payment info updated successfully');
    onSubmit();
  };

  const isEdit = !!id;

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
        {loading ? (
          <Loading width="5" height="5" />
        ) : isEdit ? (
          'Update Payment Method'
        ) : (
          'Add Payment Method'
        )}
      </button>
    </div>
  );
};

export default PaymentForm;
