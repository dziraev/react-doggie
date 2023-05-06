import { useRef } from 'react';

import styles from '../Input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
  isError?: boolean;
  helperText?: string;
  mask?: RegExp;
  components?: {
    indicator?: () => React.ReactElement;
  };
}

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  onChange,
  mask,
  components,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          aria-hidden
          aria-disabled={props.disabled}
          className={`${styles.container} ${isError ? styles.error : ''}`}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            id={label}
            className={styles.input}
            onChange={(e) => {
              if (!!onChange && !e.target.value) return onChange(e);
              if (!onChange || (mask && !mask.test(e.target.value))) return;
              onChange(e);
            }}
            {...props}
          />
          <label htmlFor={label} className={styles.label}>
            {label}
          </label>
        </div>
        {components?.indicator && (
          <div aria-hidden role='button' className={styles.indicator}>
            <components.indicator />
          </div>
        )}
      </div>
      {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </>
  );
};
