import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();
  const data = [];
  for (let publicKey in body) {
    data.push({
      publicKey,
      blockchain: 'BASE',
      data: body[publicKey],
    });
  }
  await prisma.onChainTransactionsHistory.createMany({ data });
  return NextResponse.json({ status: 'ok' });
};
