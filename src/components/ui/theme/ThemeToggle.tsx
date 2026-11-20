import { useTheme } from "../../../app/themeContext"
import "./ThemeToggle.css"

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === "dark"

    return (
        <button
            type="button"
            className={`theme-toggle${isDark ? " theme-toggle--dark" : ""}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={isDark}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <svg
                className="theme-toggle__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                {isDark ? (
                    <path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z" />
                ) : (
                    <>
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                    </>
                )}
            </svg>
            <span className="theme-toggle__label d-none">
                {isDark ? "Dark mode" : "Light mode"}
            </span>
            <span className="theme-toggle__switch" aria-hidden="true">
                <span />
            </span>
        </button>
    )
}

export default ThemeToggle
