export interface Todo {
    id:number;
    title: string;
    content: string;
    is_completed: boolean;
    user_id: number;
}

export interface TodoCreateData {
    title: string;
    content?: string;
}

export interface TodoUpdateData {
    title?: string;
    content?: string;
    is_completed?: boolean;
}
