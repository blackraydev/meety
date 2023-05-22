import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useToast } from '../../UI/Toast';
import { Input } from '../../UI';
import { PagesRoutes } from '../../constants';
import { authUser } from '../../api/users';
import * as UI from './Auth.styles';

export const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ['users', login, password],
    queryFn: () => {
      return authUser({
        login,
        password,
      });
    },
    enabled: false,
    retry: 0,
  });

  useEffect(() => {
    if (isError) {
      addToast({ content: 'Пользователь не найден' });
    } else if (isSuccess) {
      navigate(PagesRoutes.Dashboard);
    }
  }, [isError, isSuccess]);

  const handleAuth = () => {
    if (!login || !password) {
      addToast({
        content: t('allFieldsMustBeFilled'),
      });
    } else {
      refetch();
    }
  };

  return (
    <UI.Auth>
      <Input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        label="Username or Email"
        placeholder="Username or Email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeholder="Password"
        type="password"
      />
      <UI.AuthButton isLoading={isLoading} onClick={handleAuth}>
        Sign in
      </UI.AuthButton>
      <UI.FooterWrapper>
        <UI.AuthText>New to Meety?</UI.AuthText>
        <UI.RegisterLink to={PagesRoutes.Register}>Create new account</UI.RegisterLink>
      </UI.FooterWrapper>
    </UI.Auth>
  );
};
