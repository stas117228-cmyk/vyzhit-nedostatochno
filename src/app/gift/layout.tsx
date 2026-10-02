import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Подарить книгу — Выжить недостаточно',
  description:
    'Подарите книгу Даниила Сергеева «Выжить недостаточно» — отправьте подарочный экземпляр с персональным сообщением.',
};

export default function GiftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
