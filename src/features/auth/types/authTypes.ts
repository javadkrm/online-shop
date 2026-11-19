export interface User {
    id : string;
    name : string;
    email : string;
    role : 'admin' | 'user';
    image? : string;
}

export interface AuthState {
    user : User | null;
    isAuthenticated : boolean;
}