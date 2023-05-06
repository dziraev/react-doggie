import { useNavigate } from 'react-router';

import { Button, Checkbox, Input, PasswordInput } from '@/common/fields';
import { api } from '@/utils/api';
import { setCookie } from '@/utils/helpers';
import { useMutation, useForm } from '@/utils/hooks';
import { ROUTES } from '@/utils/constants';
import { IntlText, useIntl } from '@/features';

import styles from './LoginPage.module.css';

interface LoginFormValues {
  username: string;
  password: string;
  isNotMyDevice: boolean;
}

export const validateIsEmpty = (value: string) => {
  if (!value) return 'Required field';
  return null;
};

const validateUsername = (value: string) => validateIsEmpty(value);

const validatePassword = (value: string) => validateIsEmpty(value);

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword
};

export const LoginPage: React.FC = () => {
  const intl = useIntl();
  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation<
    LoginFormValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values));
  const { values, errors, setFieldValue, handleSubmit } = useForm<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
      isNotMyDevice: true
    },
    validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      const response = await authMutation(values);
      console.log(response);
      if (response && values.isNotMyDevice) {
        setCookie('doggie-isNotMyDevice', Date.now() + 30 * 60 * 1000);
      }
    }
  });

  const navigate = useNavigate();

  // const { data } = useQuery<User[]>(() => api.get('users'));
  // const { query, isLoading } = useQueryLazy<User[]>(() => api.get('users'));
  // console.log(data);

  return (
    <section className={styles.loginPage}>
      <div className={styles.loginPage_container}>
        <h1 className={styles.header}>Doggie</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_input}>
            <Input
              // disabled={authLoading}
              value={values.username}
              label={intl.translateMessage('field.input.username.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFieldValue('username', username);
              }}
              {...(errors &&
                !!errors.username && {
                  isError: !!errors.username,
                  helperText: errors.username
                })}
            />
          </div>
          <div className={styles.form_input}>
            <PasswordInput
              // disabled={authLoading}
              value={values.password}
              label={intl.translateMessage('field.input.password.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFieldValue('password', password);
              }}
              {...(errors &&
                !!errors.password && {
                  isError: !!errors.password,
                  helperText: errors.password
                })}
            />
          </div>
          <div>
            <Checkbox
              // disabled={authLoading}
              checked={values.isNotMyDevice}
              label={intl.translateMessage('field.checkbox.isNotMyDevice.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked;
                setFieldValue('isNotMyDevice', isNotMyDevice);
              }}
            />
          </div>
          <Button type='submit'>
            <IntlText path='button.signIn' />
          </Button>
        </form>
        <div
          aria-hidden
          tabIndex={0}
          role='link'
          className={styles.singUp}
          onClick={() => navigate(ROUTES.REGISTRATION)}
        >
          <IntlText path='pages.login.createNewAccount' />
        </div>
      </div>
    </section>
  );
};
