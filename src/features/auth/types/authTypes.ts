export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    image?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
}