import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Input, Button, PasswordInput } from '@/common/fields';

import styles from './LoginPage.module.css';

interface FormErrors {
  username: string | null;
  password: string | null;
}

const validateIsEmpty = (value: string) => {
  if (!value) return 'Required field';
  return null;
};

const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword
};

const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) => {
  return loginFormValidateSchema[name](value);
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null
  });

  return (
    <section className={styles.loginPage}>
      <div className={styles.loginPage_container}>
        <h1 className={styles.header}>Doggie</h1>
        <div className={styles.form}>
          <div className={styles.form_input}>
            <Input
              value={formValues.username}
              placeholder='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });

                const error = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username
              })}
            />
          </div>
          <div className={styles.form_input}>
            <PasswordInput
              value={formValues.password}
              placeholder='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });

                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password
              })}
            />
          </div>
          <div>
            <Button>Sign In</Button>
          </div>
        </div>
        <div className={styles.singUp} onClick={() => navigate('/registration')}>
          create new account
        </div>
      </div>
    </section>
  );
};
