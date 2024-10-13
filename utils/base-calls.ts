import { ethers } from 'ethers';
import { contractABI, contractAddress } from './base';
import Web3Modal from 'web3modal';

const getConnection = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  return { signer, provider, connection, web3Modal };
};

export const fetchAllEscrows = async () => {
  try {
    const { signer } = await getConnection();
    const escrowFactoryContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const nextEscrowId = await escrowFactoryContract.nextEscrowId();
    const fetchedEscrows = [];

    for (let i = 0; i < nextEscrowId; i++) {
      const escrowAddress = await escrowFactoryContract.escrows(i);
      fetchedEscrows.push({ id: i, address: escrowAddress });
    }

    return fetchedEscrows;
  } catch (err) {
    return { err };
  }
};

export const createEscrow = async (amount: string) => {
  if (!amount || Number(amount) <= 0) {
    return { err: 'Please enter a valid amount' };
  }

  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const escrowFactoryContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log(escrowFactoryContract);

    const tx = await escrowFactoryContract.createEscrow({
      value: ethers.utils.parseEther(amount),
    });
    const receipt = await tx.wait();

    const event = receipt.events.find(
      (event: any) => event.event === 'EscrowCreated'
    );
    const createdEscrowId = event.args.escrowId.toNumber();

    return { onChainSaleId: createdEscrowId, txHash: '' };
  } catch (err) {
    return { err };
  }
};
