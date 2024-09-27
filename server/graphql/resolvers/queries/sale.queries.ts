import prisma from '@/prisma/prisma';

export const sales = async (_: unknown, { id }: { id?: string }) => {
  console.log('ID', id);
  const sales = await prisma.sale.findMany({
    where: {
      id,
    },
    include: {
      seller: true,
      buyer: true,
    },
  });
  return { sales };
};
