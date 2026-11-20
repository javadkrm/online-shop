export type Theme = "light" | "dark"

const THEME_STORAGE_KEY = "shop-management-theme"

function isTheme(value: string | null | undefined): value is Theme {
    return value === "light" || value === "dark"
}

export function getInitialTheme(): Theme {
    let savedTheme: string | null = null

    try {
        savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    } catch (error) {
        console.error("Could not read the saved theme preference.", error)
    }

    if (isTheme(savedTheme)) {
        return savedTheme
    }

    return typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
}

export function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
}

export function saveThemePreference(theme: Theme) {
    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
        console.error("Could not save the theme preference.", error)
    }
}
