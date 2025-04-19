"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
    darkMode: false,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or use system preference
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setDarkMode(storedTheme === "dark");
        } else {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDarkMode(systemPrefersDark);
        }

        // Apply the theme class to the document
        document.documentElement.classList.toggle("dark", darkMode);
    }, []);

    // Separate useEffect to handle class changes when darkMode state changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        const newDarkMode = !darkMode;
        console.log("newDarkMode", newDarkMode);
        setDarkMode(newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    };

    return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
