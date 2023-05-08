import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../UI';
import { useAppTheme } from '../AppThemeContext';
import * as UI from './ThemeToggler.styles';

export const ThemeToggler = () => {
  const { t } = useTranslation();
  const { isDarkTheme, toggleTheme } = useAppTheme();

  return (
    <Tooltip position="bottom" content={t('switchTheme')}>
      <UI.ThemeToggler
        onClick={toggleTheme}
        isDarkTheme={isDarkTheme}
        id="theme-toggler"
        aria-label="auto"
        aria-live="polite"
      >
        <UI.SunAndMoon aria-hidden="true" viewBox="0 0 24 24">
          <UI.Moon id="moon-mask">
            <UI.MoonRect x="0" y="0" />
            <UI.MoonCircle r="7" />
          </UI.Moon>
          <UI.Sun mask="url(#moon-mask)" cx="12" cy="12" />
          <UI.SunBeams>
            <UI.SunBeamLine x1="12" y1="1" x2="12" y2="3" />
            <UI.SunBeamLine x1="12" y1="21" x2="12" y2="23" />
            <UI.SunBeamLine x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <UI.SunBeamLine x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <UI.SunBeamLine x1="1" y1="12" x2="3" y2="12" />
            <UI.SunBeamLine x1="21" y1="12" x2="23" y2="12" />
            <UI.SunBeamLine x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <UI.SunBeamLine x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </UI.SunBeams>
        </UI.SunAndMoon>
      </UI.ThemeToggler>
    </Tooltip>
  );
};
