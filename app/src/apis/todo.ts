import type { AxiosResponse } from "axios";
import type { Todo, TodoCreateData, TodoListResponse, TodoResponse, TodoUpdateData } from "../types/todo";
import instance from "./axios";


export const todoApi = {
    // Todo一覧取得
    getAllTodos: async(title?: string): Promise<TodoListResponse> => {
        const params = title ? { title } : '';
        const response: AxiosResponse<TodoListResponse> = await instance.get('/todos', {params});
        return response.data;
    },
    // Todo詳細取得
    getTodo: async(id: number): Promise<Todo> => {
        const response: AxiosResponse<TodoResponse> = await instance.get(`/todos/${id}`);
        return response.data.data;
    },
    // Todo新規作成
    createTodo: async(data: TodoCreateData): Promise<Todo> => {
        const response: AxiosResponse<TodoResponse> = await instance.post('/todos', data);
        return response.data.data;
    },
    // Todo更新
    updateTodo: async(id: number, data: TodoUpdateData): Promise<Todo> => {
        const response: AxiosResponse<TodoResponse> = await instance.put(`/todos/${id}`, data);
        return response.data.data;
    },
    // Todo削除
    deleteTodo: async(id: number): Promise<void> => {
        const response = await instance.delete(`/todos/${id}`);
        return response.data;
    },

    toggleComplete: async(id: number): Promise<Todo> => {
        const response: AxiosResponse<TodoResponse> = await instance.patch(`/todos/${id}/toggle`);
        return response.data.data;
    },
}