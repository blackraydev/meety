import { useTranslation } from 'react-i18next';
import { ThemeToggler } from '../ThemeToggler';
import { Select } from '../../UI';
import { changeLanguage, getCurrentLanguage } from '../../lib';
import { DefaultProps } from '../../types';
import { Languages } from '../../constants';
import * as UI from './AppLayout.styles';

export const AppLayout = ({ children }: DefaultProps) => {
  const { t } = useTranslation();

  return (
    <UI.Layout>
      <UI.GlobalStyles />
      <UI.Header>
        <Select
          value={Languages[getCurrentLanguage()]}
          onChange={(value) => changeLanguage(value as Languages)}
          options={Object.values(Languages).map((language) => ({
            value: language,
            label: t(language),
          }))}
        />
        <ThemeToggler />
      </UI.Header>
      <UI.Content>{children}</UI.Content>
    </UI.Layout>
  );
};
