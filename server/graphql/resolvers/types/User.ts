import prisma from '../../../../prisma/prisma';
import * as Prisma from '@prisma/client';

export const paymentMethods = (user: Prisma.User) => {
  return prisma.paymentMethod.findMany({ where: { userId: user?.id } });
};
