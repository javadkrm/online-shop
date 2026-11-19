import type { User } from "../types/authTypes"

const AUTH_STORAGE_KEY = "auth_user"
const USERS_STORAGE_KEY = "registered_users"

// ذخیره کاربر واردشده
export function saveAuthUser(user: User): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

// دریافت کاربر واردشده
export function getAuthUser(): User | null {
    try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

        if (!storedUser) return null

        return JSON.parse(storedUser) as User
    } catch {
        removeAuthUser()
        return null
    }
}

// خروج کاربر
export function removeAuthUser(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY)
}

// دریافت تمام کاربران ثبت‌نام‌شده
export function getRegisteredUsers(): User[] {
    try {
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)

        return storedUsers ? JSON.parse(storedUsers) as User[] : []
    } catch {
        return []
    }
}

export function findRegisteredUser(email: string): User | null {
    const users = getRegisteredUsers()

    return users.find(
        user => user.email.toLowerCase() === email.toLowerCase()
    ) ?? null
}

// ذخیره کاربر جدید
export function saveRegisteredUser(user: User): void {
    const users = getRegisteredUsers()

    users.push(user)

    localStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(users)
    )
}

// بررسی تکراری بودن ایمیل
export function isEmailRegistered(email: string): boolean {
    const users = getRegisteredUsers()

    return users.some(
        user => user.email.toLowerCase() === email.toLowerCase()
    )
}