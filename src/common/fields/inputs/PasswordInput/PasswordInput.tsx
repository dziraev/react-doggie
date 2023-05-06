import { useCallback, useRef, useState } from 'react';
import { ReactComponent as Eye } from '@/assets/images/Eye.svg';
import { ReactComponent as EyeCrossed } from '@/assets/images/EyeCrossed.svg';

import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

import styles from '../Input.module.css';

type PasswordInputProps = InputProps;

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordToggle = !!value;

  const EyeIcon = useCallback(
    () => (
      <div
        aria-hidden
        role='button'
        className={styles.passwordToggle}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeCrossed /> : <Eye />}
      </div>
    ),
    [showPassword]
  );

  return (
    <Input
      {...(showPasswordToggle && {
        components: {
          indicator: EyeIcon
        }
      })}
      type={showPasswordToggle && showPassword ? 'text' : 'password'}
      value={value}
      mask={/^[a-zA-Z0-9!:;,.]+$/g}
      {...props}
    />
  );
};
