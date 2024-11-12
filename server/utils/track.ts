import prisma from '@/prisma/prisma';

class Tracker {
  constructor() {}
  pointableEvent(event: string) {
    return true;
  }
  async track(
    event: string,
    data: unknown,
    user?: { id: string; points: number }
  ) {
    if (user && this.pointableEvent(event)) {
      if (user.points) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            points: {
              increment: 5,
            },
          },
        });
      } else {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            points: 5,
          },
        });
      }
    }
  }
}

export const tracker = new Tracker();
