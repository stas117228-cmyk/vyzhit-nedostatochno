import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Купить книгу — Выжить недостаточно',
  description:
    'Купите книгу Даниила Сергеева «Выжить недостаточно» — о продажах, управлении людьми и предпринимательском мышлении.',
};

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
