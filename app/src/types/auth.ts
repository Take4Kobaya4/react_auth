export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginResponse {
    user: User;
    message: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}