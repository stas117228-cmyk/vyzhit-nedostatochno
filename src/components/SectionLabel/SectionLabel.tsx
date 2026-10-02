import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  number: string; // напр. '01'
  title: string;
  id?: string;
}

export default function SectionLabel({ number, title, id }: SectionLabelProps) {
  return (
    <div className={styles.wrapper} id={id}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
