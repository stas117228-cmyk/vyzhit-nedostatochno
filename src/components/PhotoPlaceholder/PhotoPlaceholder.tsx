import styles from './PhotoPlaceholder.module.css';

interface PhotoPlaceholderProps {
  label: string; // напр. «Фото 1 — первый экран»
  aspectRatio?: string; // напр. '4/5', '3/2', '1/1'
  className?: string;
}

export default function PhotoPlaceholder({
  label,
  aspectRatio = '4/5',
  className = '',
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`${styles.placeholder} ${className}`}
      style={{ aspectRatio }}
      aria-label={label}
      role="img"
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.note}>Фото будет добавлено</span>
    </div>
  );
}
