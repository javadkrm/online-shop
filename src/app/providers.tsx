import { useEffect, useState, type PropsWithChildren } from "react"
import { ThemeContext } from "./themeContext"
import { applyTheme, saveThemePreference, type Theme } from "./theme"

interface ThemeProviderProps extends PropsWithChildren {
    initialTheme: Theme
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
    const [theme, setTheme] = useState(initialTheme)

    useEffect(() => {
        applyTheme(theme)
    }, [theme])

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark"
        saveThemePreference(nextTheme)
        applyTheme(nextTheme)
        setTheme(nextTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
