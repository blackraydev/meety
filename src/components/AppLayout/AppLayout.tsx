import { AppThemeToggler } from '../AppThemeToggler';
import { Button } from '../../UI';
import { Languages } from '../../constants/languages';
import { useTranslation } from 'react-i18next';
import * as UI from './AppLayout.styles';

type AppLayoutProps = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { i18n } = useTranslation();
  return (
    <UI.Layout>
      <UI.GlobalStyles />
      <UI.Header>
        <Button
          content="English"
          onClick={() => i18n.changeLanguage(Languages.En)}
          style={{ marginRight: 20 }}
        />
        <Button
          content="Russian"
          onClick={() => i18n.changeLanguage(Languages.Ru)}
          style={{ marginRight: 20 }}
        />
        <AppThemeToggler />
      </UI.Header>
      <UI.Content>{children}</UI.Content>
    </UI.Layout>
  );
};
