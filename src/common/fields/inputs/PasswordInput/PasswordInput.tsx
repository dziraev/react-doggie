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
      <div className={`${styles.container} ${isError ? styles.error : ''}`}>
        {value && (
          <div className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeCrossed /> : <Eye />}
          </div>
        )}
        <input
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
