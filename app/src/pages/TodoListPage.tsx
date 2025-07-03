import { useEffect, useState, type ChangeEvent } from "react";
import type { Todo } from "../types/todo";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../apis/todo";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";


const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchTodos = async (searchTerm?: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await todoApi.getAllTodos(searchTerm);
      setTodos(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any){
      console.error("Failed to fetch todos:", err);
      setError(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(search);
  }, [search]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  if(loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Todo List
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/todos/create')}
          sx={{ marginLeft: 2 }}
        >
          Create New Todo
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleLogout}
          sx={{ marginLeft: 2 }}
        >
          Logout
        </Button>
      </Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search title"
          value={search}
          onChange={handleSearch}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
        <>
          <Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
            {todos?.map((todo) => (
              <Card key={todo.id} sx={{ opacity: todo.is_completed ? 0.7 : 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="h2">
                      {todo.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
    </Box>
  );
}

export default TodoListPage;
