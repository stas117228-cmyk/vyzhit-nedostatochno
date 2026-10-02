import { excerpts } from '@/data/excerpts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BuyGiftGroup from '@/components/BuyGiftGroup';
import styles from './read.module.css';

export function generateStaticParams() {
  return excerpts.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const excerpt = excerpts.find((e) => e.slug === params.slug);
  if (!excerpt) return {};
  return {
    title: `${excerpt.chapter} — Даниил Сергеев`,
  };
}

export default function ReadPage({ params }: { params: { slug: string } }) {
  const excerpt = excerpts.find((e) => e.slug === params.slug);
  if (!excerpt) notFound();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/" className={styles.back}>
              ← На главную
            </Link>
            <p className={styles.bookLabel}>Книга «Выжить недостаточно»</p>
            <h1 className={styles.h1}>{excerpt!.chapter}</h1>
          </header>

          {!excerpt!.available ? (
            <div className={styles.unavailable}>
              <p className={styles.unavailableTitle}>
                Отрывок ещё не добавлен
              </p>
              <p className={styles.unavailableText}>
                {excerpt!.note ||
                  'Текст этого отрывка ещё не предоставлен. Он появится после согласования с автором.'}
              </p>
              <BuyGiftGroup />
            </div>
          ) : (
            <>
              <div className={styles.body}>
                {excerpt!.content?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {excerpt!.note && (
                <p className={styles.note}>{excerpt!.note}</p>
              )}
              <footer className={styles.footer}>
                <BuyGiftGroup />
                <Link href="/#foundations" className={styles.backLink}>
                  ← Вернуться к книге
                </Link>
              </footer>
            </>
          )}
        </article>
      </main>
    </>
  );
}
