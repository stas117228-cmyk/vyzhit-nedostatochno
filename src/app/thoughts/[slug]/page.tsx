import { thoughts } from '@/data/thoughts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BuyGiftGroup from '@/components/BuyGiftGroup';
import styles from './article.module.css';

export function generateStaticParams() {
  return thoughts.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = thoughts.find((t) => t.slug === params.slug);
  if (!t) return {};
  return { title: `${t.title} — Даниил Сергеев` };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const t = thoughts.find((t) => t.slug === params.slug);
  if (!t) notFound();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/thoughts" className={styles.back}>← Все мысли</Link>
            <h1 className={styles.h1}>{t.title}</h1>
          </header>

          <div className={styles.body}>
            {t.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <footer className={styles.footer}>
            <p className={styles.chapterRef}>{t.chapterRef}</p>
            <BuyGiftGroup />
          </footer>
        </article>
      </main>
    </>
  );
}
