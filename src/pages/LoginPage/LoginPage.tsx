import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Checkbox, Input, PasswordInput } from '@/common/fields';
import { api, setCookie, useMutation } from '@/utils';
import { IntlText, useTheme } from '@/features';

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
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    isNotMyDevice: false
  });
  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation<
    typeof formValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values));

  // const { data } = useQuery<User[]>(() => api.get('users'));
  // const { query, isLoading } = useQueryLazy<User[]>(() => api.get('users'));
  // console.log(data);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: null,
    password: null
  });

  return (
    <section className={styles.loginPage}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Theme!</button>
      <div className={styles.loginPage_container}>
        <h1 className={styles.header}>Doggie</h1>
        <form
          className={styles.form}
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const response = await authMutation(formValues);
            console.log(response);
            if (response && formValues.isNotMyDevice) {
              setCookie('doggie-isNotMyDevice', Date.now() + 30 * 60 * 1000);
            }
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
              checked={formValues.isNotMyDevice}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked;
                setFormValues({ ...formValues, isNotMyDevice });
              }}
            />
          </div>
          <div>
            <Button type='submit' isLoading={authLoading}>
              <IntlText path='button.signIn' />
            </Button>
          </div>
        </form>
        <div className={styles.singUp} onClick={() => navigate('/registration')}>
          <IntlText path='pages.login.createNewAccount' />
        </div>
      </div>
    </section>
  );
};
