import { useNavigate } from 'react-router';
import { IntlText, useIntl } from '@/features';
import { useForm, useMutation } from '@/utils/hooks';
import { ROUTES } from '@/utils/constants';
import { validateIsEmpty } from '@/pages';
import { PasswordRules } from './PasswordRules/PasswordRules';
import { Button, Input, PasswordInput } from '@/common/fields';
import { api } from '@/utils/api';

import styles from './RegistrationPage.module.css';

const registrationFormValidateSchema = {
  username: validateIsEmpty,
  password: validateIsEmpty
};

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
}

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mutationAsync: registrationMutation, isLoading: registrationLoading } = useMutation<
    Omit<RegistrationFormValues, 'passwordAgain'>,
    ApiResponse<User[]>
  >((values) => api.post('registration', values));

  const { values, errors, setFieldValue, handleSubmit } = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: ''
    },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log('values', values);
      const response = await registrationMutation({
        username: values.username,
        password: values.password
      });
      console.log('response', response);
      // if (response && values.isNotMyDevice) {
      //   setCookie('doggie-isNotMyDevice', Date.now() + 30 * 60 * 1000);
      // }
    }
  });

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1 className={styles.form_title}>
            <IntlText path='pages.registration.fillYourLoginData' />
          </h1>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.form_input}>
              <Input
                // disabled={registrationLoading}
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
                // disabled={registrationLoading}
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
            <div className={styles.form_input}>
              <PasswordInput
                // disabled={registrationLoading}
                value={values.passwordAgain}
                label={intl.translateMessage('field.input.passwordAgain.label')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const passwordAgain = event.target.value;
                  setFieldValue('passwordAgain', passwordAgain);
                }}
                {...(errors &&
                  !!errors.password && {
                    isError: !!errors.password,
                    helperText: errors.password
                  })}
              />
            </div>
            <Button type='submit'>
              <IntlText path='button.done' />
            </Button>
          </form>
        </div>
        <div className={styles.panel}>
          <div className={styles.panel_header}>doggie</div>
          <div className={styles.panel_validation_info}>
            <PasswordRules
              password={values.password}
              passwordAgain={values.passwordAgain}
              hasPasswordErrors={!!errors?.password}
            />
          </div>
          <div
            aria-hidden
            tabIndex={0}
            role='link'
            className={styles.panel_have_an_account}
            onClick={() => navigate(ROUTES.AUTH)}
          >
            <IntlText path='pages.registration.iAlreadyHaveAnAccount' />
          </div>
        </div>
      </div>
    </section>
  );
};
