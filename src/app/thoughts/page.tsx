import { thoughts } from '@/data/thoughts';
import Link from 'next/link';
import Header from '@/components/Header';
import styles from './thoughts.module.css';

export const metadata = { title: 'Мысли — Даниил Сергеев' };

export default function ThoughtsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.top}>
            <Link href="/" className={styles.back}>← Даниил Сергеев</Link>
            <h1 className={styles.h1}>Мысли</h1>
            <p className={styles.subtitle}>Заметки и размышления предпринимателя</p>
          </div>
          <hr className="rule" />
          <ul className={styles.list}>
            {thoughts.map((t, i) => (
              <li key={t.slug} className={styles.item}>
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={styles.content}>
                  <h2 className={styles.title}>
                    <Link href={`/thoughts/${t.slug}`}>{t.title}</Link>
                  </h2>
                  <p className={styles.teaser}>{t.teaser}</p>
                  <Link href={`/thoughts/${t.slug}`} className={styles.read}>
                    Читать →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
