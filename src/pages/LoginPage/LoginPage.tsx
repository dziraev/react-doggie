import { useState } from 'react';

import { Input, Button } from '../../common/fields';

import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const [formValues, setFormValues] = useState({ username: '123', password: '123' });

  return (
    <section className={styles.loginPage}>
      <div className={styles.loginPage_container}>
        <h1>Header</h1>
        <div className={styles.form}>
          <div className={styles.form_input}>
            <Input
              isError
              helperText='validation'
              value={formValues.username}
              placeholder='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, username: event.target.value })
              }
            />
          </div>
          <div className={styles.form_input}>
            <Input
              value={formValues.password}
              placeholder='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({
                  ...formValues,
                  username: event.target.value
                })
              }
            />
          </div>
          <div>
            <Button>Sign In</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
