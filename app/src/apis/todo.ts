import type { CreateTodoFormData, Todo, TodoListResponse, UpdateTodoFormData } from "../types/todo";
import apiClient from "./axios";


export const todoApi = {
    // Todo一覧取得
    getAllTodos: async(title?: string): Promise<TodoListResponse> => {
        const params = title ? { title } : '';
        const response = await apiClient.get('/todos', {params});
        return response.data;
    },
    // Todo詳細取得
    getTodo: async(id: number): Promise<Todo> => {
        const response = await apiClient.get(`/todos/${id}`);
        return response.data;
    },
    // Todo新規作成
    createTodo: async(data: CreateTodoFormData): Promise<Todo> => {
        const response = await apiClient.post('/todos', data);
        return response.data;
    },
    // Todo更新
    updateTodo: async(id: number, data: UpdateTodoFormData): Promise<Todo> => {
        const response = await apiClient.put(`/todos/${id}`, data);
        return response.data;
    },
    // Todo削除
    deleteTodo: async(id: number): Promise<void> => {
        await apiClient.delete(`/todos/${id}`);
    }
}