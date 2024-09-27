import React from 'react';
import toast from 'react-hot-toast';
import { gql, useMutation } from 'urql';
import { getMasterAddress, SALE_SEED } from '@/utils/program';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import useSolana from '@/utils/useSolana';

interface OrderComponentProps {
  sale: any;
  showConfirmPaymentReceivedButton: boolean;
  showConfirmPaymentSentButton: boolean;
  showClaimPaymentButton: boolean;
  loading: boolean;
}

const ADD_SCREENSHOT = gql`
  mutation AddScreenshot(
    $saleId: String!
    $imageUrl: String!
    $method: String!
  ) {
    addScreenshot(saleId: $saleId, imageUrl: $imageUrl, method: $method) {
      id
      imageUrl
      method
      paidById
    }
  }
`;

const MARK_PAID = gql`
  mutation MarkPaid($saleId: String!) {
    markSalePaid(id: $saleId) {
      id
      paidAt
    }
  }
`;

const MARK_FINISHED = gql`
  mutation MarkSaleFinished($markSaleFinishedId: String!) {
    markSaleFinished(id: $markSaleFinishedId) {
      id
    }
  }
`;

const OrderComponent: React.FC<OrderComponentProps> = ({
  sale,
  showConfirmPaymentReceivedButton,
  showConfirmPaymentSentButton,
  showClaimPaymentButton,
  loading,
}) => {
  const [{}, addScreenshotMutation] = useMutation(ADD_SCREENSHOT);
  const [{}, markPaidMutation] = useMutation(MARK_PAID);
  const [{}, markFinished] = useMutation(MARK_FINISHED);
  const { connection, program, programId, publicKey, sendTransaction } =
    useSolana();

  const handleAddScreenshot = async (imageUrl: string, method: string) => {
    try {
      await addScreenshotMutation({
        variables: { saleId: sale.id, imageUrl, method },
      });
      toast.success('Screenshot added successfully');
    } catch (error) {
      toast.error('Failed to add screenshot');
    }
  };

  const handlePaymentReceived = async () => {
    try {
      const masterPda = await getMasterAddress();
      const onChainSaleId = new BN(sale.onChainSaleId);
      const [salePda, saleBump] = await PublicKey.findProgramAddress(
        [Buffer.from(SALE_SEED), onChainSaleId.toArrayLike(Buffer, 'le', 4)],
        programId
      );
      const authority = publicKey;
      const transaction = new Transaction().add(
        (program as any).instruction.markPaid(onChainSaleId, {
          accounts: {
            sale: salePda,
            master: masterPda,
            authority: authority as PublicKey,
            systemProgram: SystemProgram.programId,
          },
        })
      );
      const txHash = await sendTransaction(transaction, connection);
      await markPaidMutation({ saleId: sale.id });
    } catch (err) {
    } finally {
    }
  };

  const handleClaimPayment = async () => {
    try {
      const masterPda = await getMasterAddress();
      const onChainSaleId = new BN(sale.onChainSaleId);
      const [salePda, saleBump] = await PublicKey.findProgramAddress(
        [Buffer.from(SALE_SEED), onChainSaleId.toArrayLike(Buffer, 'le', 4)],
        programId
      );
      const authority = publicKey;
      const transaction = new Transaction().add(
        (program as any).instruction.claimPayment(onChainSaleId, {
          accounts: {
            sale: salePda,
            master: masterPda,
            authority: authority as PublicKey,
            systemProgram: SystemProgram.programId,
          },
        })
      );
      const txHash = await sendTransaction(transaction, connection);
      await markFinished({ saleId: sale.id });
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className="p-6 text-white max-w-[612px] w-full">
      <div className="border-l-2 border-white relative pl-4">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 absolute left-[-13px] top-0 rounded-full bg-white text-black font-bold flex items-center justify-center">
              1
            </div>
            <h2 className="ml-4 text-[23px] font-semibold">Order Created</h2>
          </div>
          <div className="border border-[#4D4D4D] p-4 rounded-[5px]">
            <div className="flex justify-between">
              <span className="text-[#A6A6A6] text-[18px]">Fiat Amount</span>
              <span className="text-[#0ECB81] text-[18px] font-bold">
                {sale.amount * sale.unitPrice}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[#A6A6A6] text-[18px] font-[500]">
                Price
              </span>
              <span className="text-[#FFFFFF] text-[18px] font-[600]">
                ${sale.unitPrice}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[#A6A6A6] text-[18px] font-[500]">
                Receive Quantity
              </span>
              <span className="text-[#FFFFFF] text-[18px] font-[600]">
                {sale.amount}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center my-4">
            <div className="w-6 h-6 absolute left-[-13px] rounded-full bg-white text-black font-bold flex items-center justify-center">
              2
            </div>
            <h2 className="ml-4 text-xl font-semibold">
              Open {`{Gcash}`} to transfer 550.10
            </h2>
          </div>
          <p className="text-[#FFFFFF] text-[18px] ml-4 mb-4">
            Transfer the funds to the seller&apos;s account provided below.
          </p>
          <div className="border border-[#4D4D4D] p-4 rounded-[5px]">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1">
                <div className="h-2  w-2 rounded-full bg-[#00B2FF]"></div>
                <span className="text-[#FFFFFF] font-bold">Gcash</span>
              </div>

              <button className="text-yellow-400">Change</button>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-[#A6A6A6] text-[18px] font-[500]">
                Recipient
              </span>
              <p className="text-[#FFFFFF] text-[18px] font-[600]">
                Pedro Stallone
              </p>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="text-[#A6A6A6] text-[18px] font-[500]">
                Mobile Number
              </span>
              <p className="text-[#FFFFFF] text-[18px] font-[600]">
                09987654321
              </p>
            </div>
            <div>
              <span className="text-[#A6A6A6] text-[18px] font-[500]">
                QR Code
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center my-4">
            <div className="w-6 absolute h-6 left-[-13px] bottom-0 rounded-full bg-white text-black font-bold flex items-center justify-center">
              3
            </div>
            <h2 className="ml-4 text-xl font-semibold">Notify Seller</h2>
          </div>
        </div>
      </div>
      <div className="pl-4">
        <p className="text-[#FFFFFF] text-[18px] font-[400] mb-4 ml-4">
          After payment, remember to click the &apos;Transferred, Notify
          Seller&apos; button to facilitate the crypto release by the seller.
        </p>
        {showConfirmPaymentSentButton && (
          <div className="flex justify-between ml-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg"
              onClick={() => handleAddScreenshot('.', '.')}
            >
              {loading && '...'}
              Transferred, Notify Seller
            </button>
            <button className="text-[#F3AA05] font-semibold ">Cancel</button>
          </div>
        )}
        {showConfirmPaymentReceivedButton && (
          <div className="flex justify-between ml-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg"
              onClick={handlePaymentReceived}
            >
              {loading && '...'}
              Payment Received
            </button>
            <button className="text-[#F3AA05] font-semibold ">Cancel</button>
          </div>
        )}
        {showClaimPaymentButton && (
          <div className="flex justify-between ml-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg"
              onClick={handleClaimPayment}
            >
              {loading && '...'}
              Claim Payment
            </button>
            <button className="text-[#F3AA05] font-semibold ">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderComponent;
