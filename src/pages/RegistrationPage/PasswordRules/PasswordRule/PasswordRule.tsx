import { IntlText } from '@/features';

import { ReactComponent as CorrectSign } from '@/assets/images/CorrectSign.svg';
import { ReactComponent as IncorrectSign } from '@/assets/images/IncorrectSign.svg';

import styles from './PasswordRule.module.css';

interface PasswordRuleProps {
  title: string;
  isCorrect: boolean;
  showIcon: boolean;
}

export const PasswordRule: React.FC<PasswordRuleProps> = ({ title, isCorrect, showIcon }) => {
  const ruleClassName = isCorrect ? styles.correct_rule : styles.incorrect_rule;
  const Icon = isCorrect ? <CorrectSign /> : <IncorrectSign />;

  return (
    <div className={styles.container}>
      {showIcon && Icon}{' '}
      <div>
        <IntlText
          path={title}
          values={{ rule: (text) => <span className={ruleClassName}>{text}</span> }}
        />
      </div>
    </div>
  );
};
