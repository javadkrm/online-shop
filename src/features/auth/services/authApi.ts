
import type {
    User,
    LoginRequest,
    RegisterRequest,
    AuthResponse
} from "../types/authTypes";

// Mock database - temporary, stored only in memory
const users: Array<User & { password: string }> = [
    {
        id: "1",
        name: "Mj",
        email: "mjkarimi@gmail.com",
        password: "mj123",
        role: "admin",
        image: "https://example.com/mj-avatar.jpg"
    },
    {
        id: "2",
        name: "Normal User",
        email: "user@example.com",
        password: "user123",
        role: "user"
    }
];

// Simulate API delay
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function loginApi(
    data: LoginRequest
): Promise<AuthResponse> {
    await delay(500);

    const email = data.email.trim().toLowerCase();

    const user = users.find(
        item => item.email.toLowerCase() === email
            && item.password === data.password
    );

    if (!user) {
        throw new Error("Email or password is incorrect.");
    }

    const { password, ...safeUser } = user;

    return {
        user: safeUser
    };
}

export async function registerApi(
    data: RegisterRequest
): Promise<AuthResponse> {
    await delay(500);

    const email = data.email.trim().toLowerCase();

    const existingUser = users.some(
        user => user.email.toLowerCase() === email
    );

    if (existingUser) {
        throw new Error("This email is already registered.");
    }

    const newUser: User & { password: string } = {
        id: crypto.randomUUID(),
        name: `${data.firstName.trim()} ${data.lastName.trim()}`,
        email,
        password: data.password,
        role: "user"
    };

    users.push(newUser);

    const { password, ...safeUser } = newUser;

    return {
        user: safeUser
    };
}
