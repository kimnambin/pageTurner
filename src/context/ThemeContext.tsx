import {createContext, ReactNode, useEffect, useState} from 'react';
import {getTheme, ThemeName} from '../style/theme';
import {GlobalStyle} from '../style/global';
import {ThemeProvider} from 'styled-components';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'PageTurner_Theme';

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state = {
  themeName: DEFAULT_THEME_NAME as ThemeName,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

export const PageTurnerThemeProvider = ({children}: {children: ReactNode}) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    setThemeName(
      themeName === DEFAULT_THEME_NAME ? 'dark' : DEFAULT_THEME_NAME,
    );
    localStorage.setItem(
      THEME_LOCALSTORAGE_KEY,
      themeName === 'light' ? 'dark' : 'light',
    );
  };

  //로컬 스토리지에 저장된 것을 바탕으로 테마색 적용
  useEffect(() => {
    const saveThemeName = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY,
    ) as ThemeName;

    setThemeName(saveThemeName || DEFAULT_THEME_NAME);
  }, []);

  return (
    <ThemeContext.Provider value={{themeName, toggleTheme}}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
