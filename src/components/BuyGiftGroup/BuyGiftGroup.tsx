import Link from 'next/link';
import styles from './BuyGiftGroup.module.css';

interface BuyGiftGroupProps {
  variant?: 'default' | 'outlined';
  className?: string;
}

export default function BuyGiftGroup({
  variant = 'default',
  className = '',
}: BuyGiftGroupProps) {
  return (
    <div className={`${styles.group} ${styles[variant]} ${className}`}>
      <Link href="/buy" className={styles.buyBtn}>
        Купить книгу
      </Link>
      <Link href="/gift" className={styles.giftBtn}>
        Подарить книгу
      </Link>
    </div>
  );
}
