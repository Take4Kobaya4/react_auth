export interface Todo {
    id:number;
    title: string;
    description: string;
    is_completed: boolean;
    user_id: number;
}

export interface CreateTodoFormData {
    title: string;
    description?: string;
    is_completed?: boolean;
}

export interface UpdateTodoFormData {
    title?: string;
    description?: string;
    is_completed?: boolean;
}

export interface TodoListResponse {
    data: Todo[]
}