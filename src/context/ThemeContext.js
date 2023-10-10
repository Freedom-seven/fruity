import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context to hold the theme state
const ThemeContext = createContext();

// Custom hook to access the theme context
export function useTheme() {
  return useContext(ThemeContext);
}

// ThemeProvider component to wrap your entire app
export function ThemeProvider({ children }) {
  // Check the user's theme preference from local storage, or default to light mode
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    // Store the theme preference in local storage
    localStorage.setItem("theme", newIsDarkMode ? "dark" : "light");
  };

  const theme = {
    isDarkMode,
    toggleDarkMode,
  };

  useEffect(() => {
    // Set the theme class on the body element
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
