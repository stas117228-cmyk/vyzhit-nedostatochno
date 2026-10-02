import type { Metadata } from 'next';
import { lora, oswald, signThat } from './fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Выжить недостаточно — книга Даниила Сергеева',
  description:
    'Авторский лендинг книги Даниила Сергеева «Выжить недостаточно» — о продажах, управлении людьми и предпринимательском мышлении.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${lora.variable} ${oswald.variable} ${signThat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
