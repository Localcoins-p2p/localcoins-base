import prisma from '@/prisma/prisma';
import * as Prisma from '@prisma/client';

export const sales = async (
  _: unknown,
  { id, take = 10, skip = 0 }: { id?: string; take?: number; skip: number }
) => {
  const sales: any = await prisma.sale.findMany({
    where: {
      id,
      ...(!id && {
        buyer: { is: null },
        canceledAt: null,
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
    orderBy: {
      createdAt: 'desc',
    },
    take,
    skip,
  });
  console.log('>>>', {
    id,
    ...(!id && {
      buyer: { is: null },
      canceledAt: null,
    }),
  });
  const count = await prisma.sale.count({
    where: {
      id,
      ...(!id && {
        buyer: { is: null },
        canceledAt: { not: null },
      }),
    },
  });
  if (id && sales[0].screenshots[0]) {
    sales[0].screenshots[0].method = await prisma.paymentMethod.findFirst({
      where: { userId: sales[0].sellerId },
    });
  }

  if (!id) {
    return {
      sales: sales.filter((sale: Prisma.Sale) => !sale.canceledAt),
      count,
    };
  }

  return { sales, count };
};
