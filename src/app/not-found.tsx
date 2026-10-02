import Link from 'next/link';
import Header from '@/components/Header';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.inner}>
            <span className={styles.code} aria-hidden="true">
              404
            </span>
            <h1 className={styles.h1}>Страница не найдена</h1>
            <p className={styles.text}>
              Эта страница не существует или была перемещена.
            </p>
            <Link href="/" className={styles.link}>
              ← На главную
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
