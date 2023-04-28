import { AppThemeToggler } from '../AppThemeToggler';
import { Button } from '../../UI';
import { Languages } from '../../constants/languages';
import { changeLanguage } from '../../lib';
import * as UI from './AppLayout.styles';

type AppLayoutProps = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <UI.Layout>
      <UI.GlobalStyles />
      <UI.Header>
        <Button
          content="English"
          onClick={() => changeLanguage(Languages.En)}
          style={{ marginRight: 20 }}
        />
        <Button
          content="Russian"
          onClick={() => changeLanguage(Languages.Ru)}
          style={{ marginRight: 20 }}
        />
        <AppThemeToggler />
      </UI.Header>
      <UI.Content>{children}</UI.Content>
    </UI.Layout>
  );
};
