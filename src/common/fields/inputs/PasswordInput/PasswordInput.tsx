import { useRef, useState } from 'react';
import { ReactComponent as Eye } from '@/assets/images/Eye.svg';
import { ReactComponent as EyeCrossed } from '@/assets/images/EyeCrossed.svg';

import styles from '../Input.module.css';

export const PasswordInput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  value,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        aria-hidden
        aria-disabled={props.disabled}
        className={`${styles.container} ${isError ? styles.error : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        {value && (
          <div
            aria-hidden
            role='button'
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeCrossed /> : <Eye />}
          </div>
        )}
        <input
          aria-disabled={props.disabled}
          ref={inputRef}
          id={label}
          className={`${styles.input} ${styles.input_paddingRight}`}
          type={value && showPassword ? 'text' : 'password'}
          value={value}
          {...props}
        />
        <label htmlFor={label} className={styles.label}>
          {label}
        </label>
      </div>
      {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </>
  );
};
