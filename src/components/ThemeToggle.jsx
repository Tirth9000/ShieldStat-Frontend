"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();
    const [isChecked, setIsChecked] = useState(false);

    // Sync checkbox with theme state
    useEffect(() => {
        setIsChecked(theme === "dark");
    }, [theme]);

    const handleToggle = () => {
        toggleTheme();
    };

    // Prevent flash of incorrect state
    if (!mounted) {
        return <div className="w-[60px] h-[28px]" />; // Placeholder with same dimensions
    }

    return (
        <label className="relative inline-block w-[52px] h-[28px] cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={isChecked}
                onChange={handleToggle}
            />

            {/* Toggle Background */}
            <div className="absolute inset-0 bg-slate-200 dark:bg-white/10 rounded-full transition-all duration-300 border border-slate-300 dark:border-white/5"></div>

            {/* Toggle Circle (Knob) */}
            <div className="absolute top-[3px] left-[3px] w-[22px] h-[22px] bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full shadow-lg transition-all duration-300 transform peer-checked:translate-x-[24px]">
            </div>
        </label>
    );
}
