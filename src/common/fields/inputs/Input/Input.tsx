import { useRef } from 'react';

import styles from '../Input.module.css';

export const Input: React.FC<InputProps> = ({ isError = false, helperText, label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        aria-hidden
        aria-disabled={props.disabled}
        className={`${styles.container} ${isError ? styles.error : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <input ref={inputRef} id={label} className={styles.input} {...props} />
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
      </div>
      {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </>
  );
};
