import styles from './Button.module.css';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false }) => {
  return (
    <button className={styles.button}>
      {!isLoading && children}
      {!isLoading && children}
    </button>
  );
};
