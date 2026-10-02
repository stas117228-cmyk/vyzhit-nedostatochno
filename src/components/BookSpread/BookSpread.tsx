'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './BookSpread.module.css';

export default function BookSpread() {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);

  const scrollToSpread = () => {
    const el = document.getElementById('about-book');
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleReadClick = (e: React.MouseEvent) => {
    // На мобильных экранах (<= 900px), если открыта страница 1, сначала переключаем на страницу 2
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 900px)').matches &&
      currentPage === 1
    ) {
      e.preventDefault();
      setCurrentPage(2);
      scrollToSpread();
    }
  };

  const handlePageSwitch = () => {
    const nextPage = currentPage === 1 ? 2 : 1;
    setCurrentPage(nextPage);
    scrollToSpread();
  };

  return (
    <section
      className={styles.spreadSection}
      id="about-book"
      aria-label="Разворот книги: Введение"
    >
      <div className={`container ${styles.spreadContainer}`}>
        {/* Интерактивный разворот книги */}
        <div className={styles.spread} data-page={currentPage}>
          {/* Первая страница (левая) */}
          <article
            className={`${styles.page} ${styles.pageLeft}`}
            aria-label="Первая страница введения"
          >
            <h2 className={styles.chapterTitle}>ВВЕДЕНИЕ</h2>
            <p className={styles.emphasis}>
              Эта книга не сделает тебя богаче, счастливее или успешнее сама по
              себе. Она вообще ничего за тебя не сделает сама. Если ты ищешь
              оправдания, поддержки, сочувствия или очередного подтверждения, что
              «виноваты обстоятельства», — можешь закрывать её прямо сейчас. Мы с
              тобой не договоримся.
            </p>
            <p className={styles.emphasis}>
              Эта книга для тех, кто устал жить случайно. Для тех, кто уже понял,
              что мотивация не работает, вдохновение быстро проходит, а красивые
              слова не дают результата. Для тех, кто не хочет ждать, а хочет быть
              причиной.
            </p>
            <p>
              Я не буду рассказывать тебе, как «визуализировать успех». Я покажу,
              почему у одних людей получается стабильно, а у других — нет.
            </p>
          </article>

          {/* Вторая страница (правая) */}
          <article
            className={`${styles.page} ${styles.pageRight}`}
            aria-label="Вторая страница введения"
          >
            <p>
              Почему одни снова и снова приходят к результату, а другие годами
              топчутся на месте, меняя окружение, ниши, партнеров и оправдания.
              Мир не хаотичен. Он работает по закономерностям. И если ты их не
              знаешь — ты становишься их жертвой.
            </p>
            <p>
              Бизнес, деньги, отношения, карьера, команда, продажи — все
              подчиняется одним и тем же принципам. Ответственность.
              Причинно-следственные связи. Технология действий. Дисциплина
              мышления. Все остальное — декорации.
            </p>
            <p>
              Если хотя бы в одном месте тебе станет некомфортно — значит, мы с
              тобой в нужном месте, точное попадание. В этой книге нет
              универсальных рецептов и волшебных таблеток. Здесь есть инструменты.
              Жесткие, иногда неприятные, но честные. Они не гарантируют тебе
              легкий путь, но гарантируют одно: если ты будешь их применять,
              результат перестанет быть случайным.
            </p>
            <p>
              Эта книга не про успешный успех. Она про взрослый выбор. И если ты
              готов перестать быть следствием — можешь читать дальше. Добро
              пожаловать в мой мир.
            </p>
          </article>
        </div>

        {/* Пагинатор для мобильных устройств */}
        <div className={styles.pager}>
          <span className={styles.pageNumber} aria-live="polite">
            Страница {currentPage} из 2
          </span>
          <button
            type="button"
            className={styles.pageSwitch}
            onClick={handlePageSwitch}
          >
            {currentPage === 1
              ? 'Следующая страница →'
              : '← Предыдущая страница'}
          </button>
        </div>

        {/* Кнопки действий (расположены снизу под разворотом, не перекрывают текст) */}
        <div className={styles.actions}>
          <Link
            href="/read/intro"
            onClick={handleReadClick}
            className={`${styles.actionBtn} ${styles.primary}`}
          >
            ПРОДОЛЖИТЬ ЧИТАТЬ →
          </Link>
          <Link
            href="/buy"
            className={`${styles.actionBtn} ${styles.buy}`}
          >
            КУПИТЬ КНИГУ
          </Link>
          <Link
            href="/gift"
            className={`${styles.actionBtn} ${styles.gift}`}
          >
            ПОДАРИТЬ КНИГУ
          </Link>
        </div>
      </div>
    </section>
  );
}
