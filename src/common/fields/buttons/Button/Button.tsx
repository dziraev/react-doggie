import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {!isLoading && children}
      {isLoading && <div className={styles.loading} />}
    </button>
  );
};
