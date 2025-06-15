import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../apis/todo";
import { Alert, Box, Button, Card, CardActions, CardContent, Chip, Container, TextField, Typography } from "@mui/material";


export default function TodoListPage () {
    const [ todos, setTodos ] = useState<Todo[]>([]);
    const [ search, setSearch ] = useState<string>('');
    const [ searchInput, setSearchInput] = useState('');
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);
    const navigate = useNavigate();

    const loadTodos = async(title?: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await todoApi.getAllTodos(title);
            setTodos(data.data);
        } catch (err) {
            console.error('Failed to fetch todos:', err);
            setError('Todoの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTodos(search);
    }, [search]);

    const handleSearch = async () => {
        setSearch(searchInput);
    }

    if(loading && todos.length === 0) {
        return (
            <Typography>
                Loading...
            </Typography>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Todo List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/todos/create')}
                    sx={{ mb: 2 }}
                >
                    新規作成
                </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    label="タイトルで検索"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSearch}
                    sx={{ ml: 2 }}
                >
                    検索
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {todos.length === 0 ? (
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
                    Todoが見つかりません。新しいTodoを作成してください。
                </Typography>
            ): (
                <>
                    <Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
                        {todos.map((todo) => (
                            <Card key={todo.id} sx={{ opacity: todo.is_completed ? 0.7 : 1 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="h6" component="h2">
                                            {todo.title}
                                        </Typography>
                                        <Chip
                                            label={todo.is_completed ? '完了' : '未完了'}
                                            color={todo.is_completed ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                        {todo.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="info"
                                        onClick={() => navigate(`/todos/${todo.id}`)}
                                    >
                                        詳細
                                    </Button>
                                    <Button>
                                        {todo.is_completed ? '未完了に戻す' : '完了にする'}
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </>
            )}
        </Container>
    );
}