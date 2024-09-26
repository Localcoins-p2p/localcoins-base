import prisma from '@/prisma/prisma';

export const sales = async () => {
  const sales = await prisma.sale.findMany({});
  return { sales };
};
