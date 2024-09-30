import localFont from '@next/font/local';
require("../../public/assets/font/Aquire.ttf")

export const inputFont = localFont({
  src: [
    {
      path: '../../public/assets/font/Aquire.ttf',
      weight: '100',
    },
    {
      path: '../../public/assets/font/Aquire.ttf',
      weight: '200',
    },
    {
      path: '../../public/assets/font/Aquire.ttf',
      weight: '300',
    },
    {
      path: '../../public/assets/font/Aquire.ttf',
      weight: '500',
    },
    {
      path: '../../public/assets/font/Aquire.ttf',
      weight: '600',
    },
    {
      path: '../../public/assets/font/Aquire.ttf',
      weight: '700',
    },
    {
      path: '../../public/assets/font/Aquire.ttf',
      weight: '800',
    },
  ],
  variable: '--font-heading',
});


