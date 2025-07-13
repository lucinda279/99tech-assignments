import type { ReactNode } from "react";
import { createContext, useContext, useEffect } from "react";

import { persistTheme, selectApp } from "@/redux/app/appSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import type { Theme } from "@/types/theme";

type ThemeContextData = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData>({
  theme: "light",
  toggleTheme: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props;

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(selectApp);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(persistTheme(theme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
