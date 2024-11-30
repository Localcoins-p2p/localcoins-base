import prisma from '@/prisma/prisma';
import { isLoggedIn } from '../../wrappers';
import * as Prisma from '@prisma/client';
import { IGqlContext } from '@/types';
import saveImages from '@/server/utils/saveImages';
import { tracker } from '@/server/utils/track';

export const createSale = isLoggedIn(
  async (
    _: unknown,
    {
      amount,
      unitPrice,
      screenshotMethods,
      isFloating,
      profitPercentage,
      tx,
      onChainSaleId,
      blockchain,
      currency,
    }: Prisma.Sale,
    { user }: IGqlContext
  ) => {
    await tracker.track('SALE_CREATED', null, user as Prisma.User);
    return prisma.sale.create({
      data: {
        amount,
        unitPrice,
        tx,
        isFloating,
        profitPercentage,
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
    tracker.track('ADD_REMOVE_BUYER', null, user as Prisma.User);
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
    tracker.track('SALE_CANCELED', null, user as Prisma.User);
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
  async (
    _: unknown,
    { id, referenceId }: { id: string; referenceId: string },
    { user }: IGqlContext
  ) => {
    tracker.track('SALE_PAID', null, user as Prisma.User);
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

    const screenshots = await prisma.screenshot.findMany({
      where: {
        saleId: id,
        referenceId,
      },
    });
    if (screenshots.length === 0) {
      throw new Error('Incorrect Reference Number');
    }
    await prisma.screenshot.update({
      where: {
        id: screenshots[0].id,
      },
      data: {
        sellerVerified: true,
      },
    });

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
    tracker.track('SALE_FINISHED', null, user as Prisma.User);
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
      referenceId,
    }: {
      saleId: string;
      imageUrl: string;
      method: string;
      referenceId: string;
    },
    { user }: IGqlContext
  ) => {
    const [image] = await saveImages([imageUrl]);
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
        referenceId,
      },
    });
  }
);
export const markDisputed = isLoggedIn(
  async (_: unknown, { saleId }: { saleId: string }, { user }: IGqlContext) => {
    const currentSale = await prisma.sale.findUnique({
      where: { id: saleId },
      include: {
        buyer: true,
        seller: true,
      },
    });

    if (!currentSale) {
      throw new Error('Sale not found');
    }

    const isSeller = currentSale.sellerId === user?.id;
    const isBuyer = currentSale.buyerId === user?.id;

    if (!isSeller && !isBuyer) {
      throw new Error('Unauthorized to mark sale as disputed');
    }

    return prisma.sale.update({
      where: { id: saleId },
      data: {
        isDisputed: true,
        disputedBy: isSeller ? 'Seller' : 'Buyer',
      },
    });
  }
);
