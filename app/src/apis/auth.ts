import type { AxiosResponse } from "axios";
import type { User, LoginResponse, RegisterResponse } from "../types/auth";
import instance from "./axios";

export const authApi = {
    // ログイン
    login: async (email: string, password: string): Promise<User> => {
        const response: AxiosResponse<LoginResponse> = await instance.post('/login', {
            email,
            password
        });
        return response.data.user;
    },
    // 会員登録
    register: async (
        name: string, email: string, password: string
    ): Promise<User> => {
        const response: AxiosResponse<RegisterResponse> = await instance.post('/register', {
            name,
            email,
            password,
            password_confirmation: password,
        });
        return response.data.user;
    },
    // ログアウト
    logout: async (): Promise<void> => {
        await instance.post('logout');
    },
    // ユーザー情報取得
    getUser: async (): Promise<User> => {
        const response: AxiosResponse<{ user: User }> = await instance.get('/user');
        return response.data.user;
    }
}