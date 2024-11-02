const url = process.env.NEXT_PUBLIC_QN_ENDPOINT as string;

async function getTransactions(publicKey: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getSignaturesForAddress',
        params: [publicKey, { limit: 500 }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

async function getBalance(publicKey: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [publicKey, { commitment: 'confirmed' }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

export async function getUserReputation(publicKey: string) {
  const transactions = await getTransactions(publicKey);
  const transactionsCount = transactions.result.length;
  const balance = await getBalance(publicKey);
  const maxBalance = 10e9;

  let score = 0;
  score += (transactionsCount / 500) * 50;
  score +=
    (Math.min(maxBalance, balance?.result?.value || 0) / maxBalance) * 50;

  return score;
}
