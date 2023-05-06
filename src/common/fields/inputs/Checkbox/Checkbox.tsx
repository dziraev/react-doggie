import type { InputProps } from '../Input/Input';

import styles from './Checkbox.module.css';

type CheckboxProps = InputProps;

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, ...props }) => (
  <div className={styles.container}>
    <input id={label} className={styles.input} type='checkbox' checked={checked} {...props} />
    <label htmlFor={label} className={styles.label}>
      {label}
    </label>
  </div>
);
