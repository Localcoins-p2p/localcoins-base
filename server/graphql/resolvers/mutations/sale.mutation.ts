import prisma from '@/prisma/prisma';
import { isLoggedIn } from '../../wrappers';
import * as Prisma from '@prisma/client';
import { IGqlContext } from '@/types';
import saveImages from '@/server/utils/saveImages';

export const createSale = isLoggedIn(
  async (
    _: unknown,
    {
      amount,
      unitPrice,
      screenshotMethods,
      tx,
      onChainSaleId,
      blockchain,
      currency,
    }: Prisma.Sale,
    { user }: IGqlContext
  ) => {
    return prisma.sale.create({
      data: {
        amount,
        unitPrice,
        tx,
        onChainSaleId,
        screenshotMethods,
        sellerId: user?.id as string,
        currency,
        blockchain,
      },
    });
  }
);

export const addRemoveBuyer = isLoggedIn(
  (
    _1: unknown,
    { id, command }: { id: string; command: 'ADD' | 'REMOVE' },
    { user }: IGqlContext
  ) => {
    return prisma.sale.update({
      where: { id },
      data: {
        buyerId: command === 'ADD' ? (user?.id as string) : null,
      },
    });
  }
);

export const cancelSale = isLoggedIn(
  async (_: unknown, { id }: { id: string }, { user }: IGqlContext) => {
    const currentSale = await prisma.sale.findUnique({
      where: { id },
      include: {
        seller: true,
      },
    });

    if (!currentSale) {
      throw new Error('Sale not found');
    }

    if (currentSale.sellerId !== user?.id) {
      throw new Error('Unauthorized to cancel this sale');
    }

    if (currentSale.paidAt || currentSale.finishedAt) {
      throw new Error(
        'Sale cannot be canceled as it has been paid or finished'
      );
    }

    return prisma.sale.update({
      where: { id },
      data: {
        canceledAt: new Date(),
      },
    });
  }
);

export const markSalePaid = isLoggedIn(
  async (_: unknown, { id }: { id: string }, { user }: IGqlContext) => {
    const currentSale = await prisma.sale.findUnique({
      where: { id },
      include: {
        seller: true,
      },
    });

    if (!currentSale) {
      throw new Error('Sale not found');
    }

    if (currentSale.sellerId !== user?.id) {
      throw new Error('Unauthorized to mark this sale as paid');
    }

    if (currentSale.canceledAt) {
      throw new Error('Sale cannot be marked as paid as it has been canceled');
    }

    return prisma.sale.update({
      where: { id },
      data: {
        paidAt: new Date(),
      },
    });
  }
);

export const markSaleFinished = isLoggedIn(
  async (_: unknown, { id }: { id: string }, { user }: IGqlContext) => {
    const currentSale = await prisma.sale.findUnique({
      where: { id },
      include: {
        buyer: true,
      },
    });

    if (!currentSale) {
      throw new Error('Sale not found');
    }

    if (currentSale.buyerId !== user?.id) {
      throw new Error('Unauthorized to mark this sale as finished');
    }

    if (!currentSale.paidAt || currentSale.canceledAt) {
      throw new Error(
        'Sale cannot be marked as finished as it has not been paid or has been canceled'
      );
    }

    return prisma.sale.update({
      where: { id },
      data: {
        finishedAt: new Date(),
      },
    });
  }
);

export const addScreenshot = isLoggedIn(
  async (
    _: unknown,
    {
      saleId,
      imageUrl,
      method,
    }: { saleId: string; imageUrl: string; method: string },
    { user }: IGqlContext
  ) => {
    const [image] = await saveImages([imageUrl]);
    console.log('Image', image);
    const currentSale = await prisma.sale.findUnique({
      where: { id: saleId },
      include: {
        buyer: true,
      },
    });

    if (!currentSale) {
      throw new Error('Sale not found');
    }

    if (currentSale.buyerId !== user?.id) {
      throw new Error('Unauthorized to add screenshot for this sale');
    }

    if (currentSale.paidAt || currentSale.canceledAt) {
      throw new Error(
        'Screenshot cannot be added as the sale is paid already or has been canceled'
      );
    }
    await prisma.screenshot.deleteMany({});
    return prisma.screenshot.create({
      data: {
        saleId,
        imageUrl: image,
        methodId: method,
        paidById: user.id as string,
      },
    });
  }
);
