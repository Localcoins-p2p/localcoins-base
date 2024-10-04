import prisma from '@/prisma/prisma';

export const sales = async (_: unknown, { id }: { id?: string }) => {
  const sales: any = await prisma.sale.findMany({
    where: {
      id,
      ...(!id && {
        buyer: { is: null },
      }),
    },
    include: {
      seller: {
        include: {
          paymentMethods: true,
        },
      },
      buyer: true,
      screenshots: true,
    },
  });
  if (id && sales[0].screenshots[0]) {
    sales[0].screenshots[0].method = await prisma.paymentMethod.findFirst({
      where: { id: sales[0].screenshots[0].methodId },
    });
  }
  return { sales };
};
