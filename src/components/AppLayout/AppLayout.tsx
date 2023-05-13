import { useTranslation } from 'react-i18next';
import { ThemeToggler } from '../ThemeToggler';
import { changeLanguage, getCurrentLanguage } from '../../lib';
import { DefaultProps } from '../../types';
import { Languages } from '../../constants';
import { AppLogo } from '../AppLogo';
import * as UI from './AppLayout.styles';

export const AppLayout = ({ children }: DefaultProps) => {
  const { t } = useTranslation();

  return (
    <UI.Layout>
      <UI.GlobalStyles />
      <UI.Header>
        <AppLogo />
        <UI.ActionsWrapper>
          <UI.LanguageSelect
            value={Languages[getCurrentLanguage()]}
            onChange={(value) => changeLanguage(value as Languages)}
            options={Object.values(Languages).map((language) => ({
              value: language,
              label: t(language),
            }))}
          />
          <ThemeToggler />
        </UI.ActionsWrapper>
      </UI.Header>
      <UI.Content>{children}</UI.Content>
    </UI.Layout>
  );
};
