import { createContext, useState, useContext } from "react";

const ThemeContext = createContext({ darkMode: false, toggleTheme: () => {} });

import { ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div
        style={{
          backgroundColor: darkMode ? "#1a1a1a" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
