import type { Metadata } from 'next';
import { Lora, Oswald } from 'next/font/google';
import '@/styles/globals.css';

// Основной текстовый шрифт — Lora (кириллица подтверждена)
const lora = Lora({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

// Заголовочный шрифт — Oswald (кириллица подтверждена)
// ВРЕМЕННАЯ ЗАМЕНА: заменить на Bebas Neue Pro / Bebas Neue Cyrillic
// после получения файлов от заказчика. Зафиксировано в README.
const oswald = Oswald({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Выжить недостаточно — книга Даниила Сергеева',
  description:
    'Авторский лендинг книги Даниила Сергеева «Выжить недостаточно» — о продажах, управлении людьми и предпринимательском мышлении.',
  robots: {
    index: false, // включить после финального запуска
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${lora.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}
