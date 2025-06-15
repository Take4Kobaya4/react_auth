/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "../types/auth";
import apiClient from "./axios";


export const authApi = {
    login: async (email: string, password: string): Promise<User> => {
        const response = await apiClient.post('/login', {
            email,
            password
        });
        return response.data;
    },
    
    register: async (
        name: string, email: string, password: string
    ): Promise<User> => {
        const response = await apiClient.post('/register', {
            name,
            email,
            password,
            password_confirmation: password,
        });
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/logout');
    },

    getUser: async (): Promise<User> => {
            const response = await apiClient.get('/user');
            return response.data;
    }
}