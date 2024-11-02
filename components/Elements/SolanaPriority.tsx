import { useEffect, useState } from 'react';

function SolanaPriority() {
  const [fees, setFees] = useState<any>({});

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_QN_SOLANA_MAINNET as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'qn_estimatePriorityFees',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFees(data.result.per_compute_unit);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4  border-2 border-lime-300 my-2 rounded-3xl shadow-glow w-[80vw] bg-yellow-50">
      <div>
        <h2 className="text-xl font-bold mb-4">
          Unlock the Power of Solana Priority on Mainnet
        </h2>
        <p className="text-sm mb-0">
          Experience faster and more cost-effective transactions with Solana
          Priority. Enjoy the benefits of a high-performance blockchain designed
          for speed and scalability.
        </p>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex p-1 gap-2 flex-col">
          <p className="text-sm">
            <span className="text-2xl font-bold">{fees.medium || '-'}</span>
            <br />
            microLamports
          </p>
          <p className="text-sm font-bold text-slate-600">Medium</p>
        </div>

        <div className="flex p-1 gap-2 flex-col">
          <p className="text-sm">
            <span className="text-2xl font-bold">{fees.high || '-'}</span>
            <br />
            microLamports
          </p>
          <p className="text-sm font-bold text-slate-600">High</p>
        </div>

        <div className="flex p-1 gap-2 flex-col">
          <p className="text-sm">
            <span className="text-2xl font-bold">{fees.extreme || '-'}</span>
            <br />
            microLamports
          </p>
          <p className="text-sm font-bold text-slate-600">Extreme</p>
        </div>
      </div>
    </div>
  );
}

export default SolanaPriority;
