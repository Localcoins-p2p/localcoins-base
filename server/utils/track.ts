import prisma from '@/prisma/prisma';

class Tracker {
  constructor() {}
  pointableEvent(event: string) {
    return true;
  }
  async track({
    event,
    data,
    user,
  }: {
    event: string;
    data: unknown;
    user?: { id: string };
  }) {
    if (user && this.pointableEvent(event)) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          points: {
            increment: 5,
          },
        },
      });
    }
  }
}

export const tracker = new Tracker();
