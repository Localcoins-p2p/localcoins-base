import { useMutation } from 'urql';

interface IProps {
  saleId: string;
}

function BuyButton({ saleId }: IProps) {
  const [{ fetching }, addBuyer] = useMutation('');

  return (
    <button className="bg-[#3AA53E] md:hidden text-white text-[16px] font-[600] px-4 py-2 rounded-[5px]">
      Buy
    </button>
  );
}

export default BuyButton;
