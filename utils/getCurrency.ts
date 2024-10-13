export const getFromCurrency = () => {
  return { name: 'PHP' };
};

export const getToCurrency = () => {
  return { name: 'SOL', x: 1e9 };
};

export const getCurrencies = async () => {
  return [
    { name: 'SOL', fullname: 'Solana' },
    { name: 'ETH', fullname: 'Ethereum' },
  ];
};
