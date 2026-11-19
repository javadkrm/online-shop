
import type { User } from "../types/authTypes"

const AUTH_STORAGE_KEY = "auth_user"

export function saveAuthUser(user: User): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

export function getAuthUser(): User | null {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedUser) return null

    try {
        const user = JSON.parse(storedUser) as User

        if (
            typeof user.id !== "string" ||
            typeof user.name !== "string" ||
            typeof user.email !== "string" ||
            !["admin", "user"].includes(user.role)
        ) {
            return null
        }

        const normalizedUser =
            user.email.toLowerCase() === "mjkarimi@gmail.com" &&
            user.name === "Admin"
                ? { ...user, name: "Mj" }
                : user

        if (normalizedUser !== user) {
            saveAuthUser(normalizedUser)
        }

        return normalizedUser
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return null
    }
}

export function removeAuthUser(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY)
}
