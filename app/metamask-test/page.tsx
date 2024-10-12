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
  }, []);

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
    const amount = '0.0000001';
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

      const escrowAddress = await escrows?.find((e: any) => e.id === 2)
        ?.address;

      const escrowContract = new ethers.Contract(
        escrowAddress,
        escrowABI,
        signer
      );
      const tx = await escrowContract.addBuyer(buyerAddress);
      await tx.wait();

      alert(`Buyer added: ${buyerAddress}`);
    } catch (err) {
      console.error(err);
      setError('Failed to add buyer');
    }
  };

  return (
    <div style={{ color: 'white' }}>
      Hello World
      <br />
      <span onClick={createEscrow}>Create</span>
      <br />
      <span onClick={addBuyer}>Add Buyer</span>
    </div>
  );
}

export default App;
