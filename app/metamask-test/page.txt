'use client';

import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress, escrowABI } from '@/utils/base';

function App() {
  const [error, setError] = useState<any>();
  const [escrowId, setEscrowId] = useState<any>();
  const [buyerAddress, setBuyerAddress] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const factory = new ethers.Contract(contractAddress, contractABI, signer);

      const escrowAddresses = await factory.getEscrows();
      console.log(escrowAddresses);
    };
    init();
    listAll();
  }, []);

  async function listAll() {
    console.log('Listing all');
    //const all = await fetchAllEscrows();
    const details = await fetchEscrowDetails(
      '0x328eedc143E2ced84F0A67801fF64C751a6ac808'
    );
    console.log('Details', details);
  }

  useEffect(() => {
    const getCurrentAccount = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setBuyerAddress(accounts[0]);
      }
    };

    getCurrentAccount();
  }, []);

  const fetchAllEscrows = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
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
      console.error(err);
      setError('Failed to fetch escrows');
    }
  };
  const createEscrow = async () => {
    const amount = '0.001';
    // if (!amount || isNaN(amount) || Number(amount) <= 0) {
    //   setError('Please enter a valid amount');
    //   return;
    // }

    setError('');

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

      setEscrowId(createdEscrowId);
      alert(`Escrow created with ID: ${createdEscrowId}`);
    } catch (err) {
      console.error(err);
      setError('Failed to create escrow');
    }
  };

  const addBuyer = async () => {
    if (!buyerAddress) {
      setError('Please enter a valid buyer address');
      return;
    }

    setError('');

    try {
      const escrows = await fetchAllEscrows();
      console.log(escrows);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const escrowAddress = await escrows?.find((e: any) => e.id === escrowId)
        ?.address;

      const escrowContract = new ethers.Contract(
        escrowAddress,
        escrowABI,
        signer
      );
      const tx = await escrowContract.addBuyer(buyerAddress);
      const receipt = await tx.wait();
      console.log(receipt);

      alert(`Buyer added: ${buyerAddress}`);
    } catch (err) {
      console.error(err);
      setError('Failed to add buyer');
    }
  };

  const markPaid = async () => {
    setError('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const escrows = await fetchAllEscrows();

      // Get the address of the escrow contract using the escrow ID
      const escrowAddress = escrows?.find((escrow) => escrow.id === escrowId)
        ?.address;

      if (!escrowAddress) {
        setError('Invalid escrow ID');
        return;
      }

      const escrowContract = new ethers.Contract(
        escrowAddress,
        escrowABI,
        signer
      );
      const tx = await escrowContract.markPaid();
      await tx.wait();

      alert('Payment marked as paid successfully.');
      fetchEscrowDetails(escrowAddress); // Refresh the contract details after marking as paid
    } catch (err) {
      console.error(err);
      setError('Failed to mark payment as paid');
    }
  };

  const fetchEscrowDetails = async (escrowAddress: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const escrowContract = new ethers.Contract(
        escrowAddress,
        escrowABI,
        signer
      );

      const seller = await escrowContract.seller();
      const buyer = await escrowContract.buyer();
      const amount = ethers.utils.formatEther(await escrowContract.amount());
      const currentState = await escrowContract.currentState();

      console.log({
        address: escrowAddress,
        seller,
        buyer,
        amount,
        currentState,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to fetch escrow details');
    }
  };

  const confirmPayment = async () => {
    setError('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const escrows = await fetchAllEscrows();

      const escrowAddress = escrows?.find((escrow) => escrow.id === escrowId)
        ?.address;

      if (!escrowAddress) {
        setError('Invalid escrow ID');
        return;
      }

      const escrowContract = new ethers.Contract(
        escrowAddress,
        escrowABI,
        signer
      );
      const tx = await escrowContract.confirmPayment();
      const receipt = await tx.wait();
      console.log('R', receipt);

      alert('Payment confirmed and funds released to the seller.');

      //const tx2 = await escrowContract.
      fetchEscrowDetails(escrowAddress); // Refresh the contract details after confirming payment
    } catch (err) {
      console.error(err);
      setError('Failed to confirm payment');
    }
  };

  return (
    <div style={{ color: 'white' }}>
      Hello World {error}
      <br />
      <span onClick={createEscrow}>Create</span>
      <br />
      <span onClick={addBuyer}>Add Buyer</span>
      <br />
      <span onClick={markPaid}>Mark Paid</span>
      <br />
      <span onClick={confirmPayment}>Confirm Payment</span>
    </div>
  );
}

export default App;
