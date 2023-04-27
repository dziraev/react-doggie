import { useState } from 'react';
import { ReactComponent as Eye } from '@/assets/images/Eye.svg';
import { ReactComponent as EyeCrossed } from '@/assets/images/EyeCrossed.svg';

import styles from '../Input.module.css';

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'type'> {
  isError?: boolean;
  helperText?: string;
}

export const PasswordInput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      {value && (
        <div className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeCrossed /> : <Eye />}
        </div>
      )}
      <input
        className={`${styles.input} ${styles.input_paddingRight} ${isError ? styles.error : ''}`}
        type={value && showPassword ? 'text' : 'password'}
        value={value}
        {...props}
      />
      {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};
