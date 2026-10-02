import styles from './PrototypeBanner.module.css';

export default function PrototypeBanner() {
  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <span className={styles.label}>Прототип</span>
      <span className={styles.text}>
        Сайт находится в режиме прототипа. Оплата и отправка заявок не
        подключены. Персональные данные не собираются и не передаются.
      </span>
    </div>
  );
}
