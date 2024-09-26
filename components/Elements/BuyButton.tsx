import { gql, useMutation } from 'urql';

interface IProps {
  saleId: string;
}

const addRemoveBuyerMutation = gql`
  mutation AddRemoveBuyer($id: String!, $command: String!) {
    addRemoveBuyer(id: $id, command: $command) {
      id
    }
  }
`;

function BuyButton({ saleId }: IProps) {
  const [{ fetching }, addBuyer] = useMutation(addRemoveBuyerMutation);

  const handleAddBuyer = () => {
    addBuyer({ id: saleId, command: 'ADD' });
  };

  return (
    <button className="bg-[#3AA53E] md:hidden text-white text-[16px] font-[600] px-4 py-2 rounded-[5px]">
      Buy
    </button>
  );
}

export default BuyButton;
