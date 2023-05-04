import styles from './Checkbox.module.css';

export const Checkbox: React.FC<InputProps> = ({ label, checked, ...props }) => (
  <div className={styles.container}>
    <input id={label} className={styles.input} type='checkbox' checked={checked} {...props} />
    <label htmlFor={label} className={styles.label}>
      {label}
    </label>
  </div>
);
