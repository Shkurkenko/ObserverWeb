import { useEffect, useState, useContext } from "preact/hooks";
import { createContext } from "preact";
import { ComponentChildren } from "preact";

interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

interface IThemeProvider {
  children: ComponentChildren;
}

export const ThemeProvider = ({ children, ...props }: IThemeProvider) => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from local storage or system preference
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    // Apply or remove 'dark' class on the html element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Persist theme in local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
