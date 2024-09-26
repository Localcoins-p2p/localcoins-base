import prisma from '@/prisma/prisma';
import { isLoggedIn } from '../../wrappers';
import * as Prisma from '@prisma/client';
import { IGqlContext } from '@/types';

export const createSale = isLoggedIn(
  async (
    _: unknown,
    { amount, unitPrice, screenshotMethods }: Prisma.Sale,
    { user }: IGqlContext
  ) => {
    return prisma.sale.create({
      data: {
        amount,
        unitPrice,
        screenshotMethods,
        sellerId: user?.id as string,
      },
    });
  }
);
