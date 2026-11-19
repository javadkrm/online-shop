
import type { User } from "../types/authTypes"

const AUTH_STORAGE_KEY = "auth_user"

function isUser(value: unknown): value is User {
    if (typeof value !== "object" || value === null) {
        return false
    }

    const user = value as Record<string, unknown>

    return (
        typeof user.id === "string" &&
        typeof user.name === "string" &&
        typeof user.email === "string" &&
        (user.role === "admin" || user.role === "user")
    )
}

export function saveAuthUser(user: User): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

export function getAuthUser(): User | null {
    try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

        if (!storedUser) return null

        const user: unknown = JSON.parse(storedUser)

        if (!isUser(user)) {
            removeAuthUser()
            return null
        }

        return user
    } catch {
        return null
    }
}

export function removeAuthUser(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY)
}
