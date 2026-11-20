import type { User } from "../types/authTypes";

const AUTH_STORAGE_KEY = "auth_user";

export function saveAuthUser(user: User): void {
    localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(user)
    );
}

export function getAuthUser(): User | null {
    try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

        if (!storedUser) return null;

        return JSON.parse(storedUser) as User;
    } catch {
        removeAuthUser();
        return null;
    }
}

export function removeAuthUser(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}