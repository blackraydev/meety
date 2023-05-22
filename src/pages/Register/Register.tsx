import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Input } from '../../UI';
import { PagesRoutes } from '../../constants';
import { registerUser } from '../../api/users';
import { useToast } from '../../UI/Toast';
import { isValidEmail } from './Register.utils';
import { User } from '../../types';
import * as UI from './Register.styles';

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const { isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ['users', login, email, password],
    queryFn: () => {
      return registerUser({
        login,
        email,
        password,
      });
    },
    enabled: false,
    retry: 0,
  });

  useEffect(() => {
    if (isError && error) {
      const errorData = (error as AxiosError)?.response?.data as Partial<
        Pick<User, 'login' | 'email'>
      >;

      if (errorData.login) {
        addToast({ content: 'Пользователь с таким логином уже существует!' });
      } else if (errorData.email) {
        addToast({ content: 'Пользователь с такой электронной почтой уже существует!' });
      }
    } else if (isSuccess) {
      navigate(PagesRoutes.Dashboard);
    }
  }, [isError, isSuccess, error]);

  const handleRegister = () => {
    if (!login || !email || !password) {
      addToast({
        content: t('allFieldsMustBeFilled'),
      });
    } else if (!isValidEmail(email)) {
      addToast({
        content: t('invalidEmailFormat'),
      });
    } else if (password !== repeatedPassword) {
      addToast({
        content: t('passwordsNotMatch'),
      });
    } else {
      refetch();
    }
  };

  return (
    <UI.Register>
      <Input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        label="Username"
        placeholder="Username"
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        placeholder="Email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeholder="Password"
        type="password"
      />
      <Input
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
        label="Repeat password"
        placeholder="Password"
        type="password"
      />
      <UI.RegisterButton isLoading={isLoading} onClick={handleRegister}>
        Register
      </UI.RegisterButton>
      <UI.FooterWrapper>
        <UI.RegisterText>Already have an account?</UI.RegisterText>
        <UI.AuthLink to={PagesRoutes.Auth}>Sign in</UI.AuthLink>
      </UI.FooterWrapper>
    </UI.Register>
  );
};
