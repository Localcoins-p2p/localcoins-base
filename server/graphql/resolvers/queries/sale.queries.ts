import prisma from '@/prisma/prisma';

export const sales = () => {
  return prisma.sale.findMany({});
};
