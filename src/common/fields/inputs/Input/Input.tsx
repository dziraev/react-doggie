import styles from './Input.module.css';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isError?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ isError = false, helperText, ...props }) => {
  const className = isError ? styles.error : '';
  return (
    <>
      <input className={`${styles.input} ${className}`} {...props} />
      {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </>
  );
};
