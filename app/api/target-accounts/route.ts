import prisma from '../../../prisma/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const publicKeys = await prisma.user.findMany({
    select: {
      publicKey: true,
    },
  });
  return NextResponse.json(publicKeys);
};
