import type { Metadata } from 'next';
import { Lora, Oswald, Caveat } from 'next/font/google';
import '@/styles/globals.css';

// Основной текстовый шрифт — Lora (кириллица подтверждена)
const lora = Lora({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  style: ['normal'],
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

// Рукописный шрифт для цитаты на Hero — Caveat поддерживает кириллицу
// ВРЕМЕННАЯ ЗАМЕНА: заменить на Sign That (.woff2 с кириллицей) после получения файла
const caveat = Caveat({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-script',
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
    <html lang="ru" className={`${lora.variable} ${oswald.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
