import localFont from 'next/font/local';
import { Lora, Oswald } from 'next/font/google';

export const lora = Lora({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  style: ['normal'],
  variable: '--font-lora',
  display: 'swap',
});

export const oswald = Oswald({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

// Рукописный шрифт Sign That
export const signThat = localFont({
  src: '../../public/fonts/sign-that-kerning.otf',
  variable: '--font-sign-that',
  display: 'swap',
});
