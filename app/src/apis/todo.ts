import type { Todo, TodoCreateData, TodoUpdateData } from "../types/todo";
import instance from "./axios";


export const todoApi = {
    // Todo一覧取得
    getAllTodos: async(search?: string): Promise<Todo[]> => {
        const params = search ? { search } : {};
        const response = await instance.get('/todos', {params});
        return response.data.data || response.data;
    },
    // Todo詳細取得
    getTodo: async(id: number): Promise<Todo> => {
        const response = await instance.get(`/todos/${id}`);
        return response.data.data || response.data;
    },
    // Todo新規作成
    createTodo: async(data: TodoCreateData): Promise<Todo> => {
        const response = await instance.post('/todos', data);
        return response.data.data || response.data;
    },
    // Todo更新
    updateTodo: async(id: number, data: TodoUpdateData): Promise<Todo> => {
        const response = await instance.put(`/todos/${id}`, data);
        return response.data.data || response.data;
    },
    // Todo削除
    deleteTodo: async(id: number): Promise<void> => {
        await instance.delete(`/todos/${id}`);
    },

    toggleComplete: async(id: number): Promise<Todo> => {
        const response = await instance.patch(`/todos/${id}/toggle`);
        return response.data.data;
    },
}