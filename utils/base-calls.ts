import { ethers } from 'ethers';
import { contractABI, contractAddress, escrowABI } from './base';
import Web3Modal from 'web3modal';

const getConnection = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const accounts = await provider.listAccounts();
  return { signer, provider, connection, web3Modal, accounts };
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
  } catch (error) {
    return { error };
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

export const addBuyer = async (escrowId: number) => {
  const { signer, accounts } = await getConnection();
  const buyerAddress = accounts[0];
  if (!buyerAddress) {
    return { error: 'Please enter a valid buyer address' };
  }

  try {
    const escrows: any = await fetchAllEscrows();
    if (escrows.error) {
      return escrows;
    }

    const escrowAddress = await escrows?.find((e: any) => e.id === escrowId)
      ?.address;

    const escrowContract = new ethers.Contract(
      escrowAddress,
      escrowABI,
      signer
    );
    const tx = await escrowContract.addBuyer(buyerAddress);
    const receipt = await tx.wait();
    return receipt;
  } catch (err) {
    console.error(err);
    return { error: 'Failed to add buyer' };
  }
};
