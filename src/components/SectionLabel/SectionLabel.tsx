import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  title: string;
  id?: string;
  // number убран — нумерации на сайте нет
}

export default function SectionLabel({ title, id }: SectionLabelProps) {
  return (
    <div className={styles.wrapper} id={id}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
