"use client";

import { useEffect, useState } from "react";

/**
 * ThemeToggle Component.
 * 
 * Provides a button to switch between Light and Dark modes.
 * Features:
 * - Toggles the `.dark` class on the `<html>` element.
 * - Persists user preference to `localStorage`.
 * - Synchronizes with the initial server-side theme script (in layout.tsx).
 * - Animated icon transition between Sun and Moon states.
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  // State to track if dark mode is currently active
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Using requestAnimationFrame to avoid synchronous setState in effect
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      if (document.documentElement.classList.contains("dark")) {
        setIsDark(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /**
   * Toggles the theme state and updates localStorage.
   */
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) {
    return <div className="p-2 w-10 h-10" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        // Sun Icon (for Dark Mode -> Switch to Light)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-400"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2" />
          <path d="M12 21v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M1 12h2" />
          <path d="M21 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Moon Icon (for Light Mode -> Switch to Dark)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-600"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
