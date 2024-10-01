import prisma from '@/prisma/prisma';
import { IGqlContext } from '@/types';
import { isLoggedIn } from '../../wrappers';

export const user = (_: unknown, args: unknown, { user }: IGqlContext) => {
  return user;
};

export const paymentMethods = isLoggedIn(
  (_1: unknown, _2: unknown, { user }: IGqlContext) => {
    return prisma.paymentMethod.findMany({
      where: { userId: user?.id as string },
    });
  }
);

export const sellerSales = isLoggedIn(
  async (_1: unknown, _2: unknown, { user }: IGqlContext) => {
    return prisma.sale.findMany({ where: { sellerId: user?.id as string } });
  }
);

export const buyerSales = isLoggedIn(
  async (_1: unknown, _2: unknown, { user }: IGqlContext) => {
    return prisma.sale.findMany({ where: { buyerId: user?.id as string } });
  }
);
