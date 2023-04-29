import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Checkbox, Input, PasswordInput } from '@/common/fields';
import { useMutation, useQueryLazy } from '@/utils';

import styles from './LoginPage.module.css';

interface FormErrors {
  username: string | null;
  password: string | null;
}

interface User {
  username: string;
  password: string;
  id: string;
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

  const [formValues, setFormValues] = useState({ username: '', password: '', notMyDevice: false });
  const {
    mutation: authMutation,
    isLoading: authLoading,
    error,
    status
  } = useMutation<typeof formValues, User>('http://localhost:3000/auth', 'post');

  const { query } = useQueryLazy<User>('http://localhost:3000/users');
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null
  });

  return (
    <section className={styles.loginPage}>
      <div className={styles.loginPage_container}>
        <h1 className={styles.header}>Doggie</h1>
        <form
          className={styles.form}
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // const response = await authMutation(formValues);
            const response = await query();
            console.log('resposne', response);
          }}
        >
          <div className={styles.form_input}>
            <Input
              disabled={authLoading}
              value={formValues.username}
              label='username'
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
              disabled={authLoading}
              value={formValues.password}
              label='password'
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
            <Checkbox
              disabled={authLoading}
              checked={formValues.notMyDevice}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const notMyDevice = event.target.checked;
                setFormValues({ ...formValues, notMyDevice });
              }}
            />
          </div>
          <div>
            <Button type='submit' isLoading={authLoading}>
              Sign In
            </Button>
          </div>
        </form>
        <div className={styles.singUp} onClick={() => navigate('/registration')}>
          create new account
        </div>
      </div>
    </section>
  );
};
