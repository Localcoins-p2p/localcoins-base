export const getFromCurrency = () => {
  return { name: 'PHP' };
};

export const getToCurrency = () => {
  return { name: 'SOL', x: 1e9 };
};

export const getToCurrencyv2 = (name: string) => {
  const currencies = [
    { name: 'SOL', fullname: 'Solana', blockchain: 'sol' },
    { name: 'ETH', fullname: 'Ethereum', blockchain: 'base' },
  ];
  return currencies.find((currency) => currency.name === name) || null;
};

export const getCurrencies = async () => {
  return [
    { name: 'SOL', fullname: 'Solana', blockchain: 'sol' },
    { name: 'ETH', fullname: 'Ethereum', blockchain: 'base' },
  ];
};
