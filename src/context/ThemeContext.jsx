"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const savedTheme = localStorage.getItem("theme");
            const initialTheme = savedTheme || "dark"; // Default to dark
            setTheme(initialTheme);

            // Apply theme class to HTML element
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(initialTheme);
        } catch (err) {
            console.error("Failed to load theme", err);
        } finally {
            setMounted(true);
        }
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        if (typeof window === "undefined") return;

        const newTheme = theme === "dark" ? "light" : "dark";

        try {
            // Update state
            setTheme(newTheme);

            // Update localStorage
            localStorage.setItem("theme", newTheme);

            // Update HTML class
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(newTheme);
        } catch (err) {
            console.error("Failed to toggle theme", err);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
