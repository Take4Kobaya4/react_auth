import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Todo } from "../types/todo";
import { todoApi } from "../apis/todo";
import { Box, Button, Card, CardContent, Chip, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";



const TodoListPage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const { logout } = useAuth();
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (searchTerm = '') => {
    try {
      setLoading(true);
      const todosData = await todoApi.getAllTodos(searchTerm);
      setTodos(todosData); // 'todosData' から 'todos' プロパティを抽出して 'setTodos' に渡す
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = () => {
    fetchTodos(search);
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Todo List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/todos/create')}
            sx={{ ml: 2 }}
          >
            Create New Todo
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              sx={{ mr: 2 }}
            />
          </Box>

          <Grid container spacing={3}>
            {loading ? (
              <Typography>
                <CircularProgress />
              </Typography>
            ): todos.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                No todos found
              </Typography>
            ): (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {todos.map((todo) => (
                  <Card
                  key={todo.id} sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/todos/${todo.id}`)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="h2">
                          {todo.title}
                        </Typography>
                        <Chip
                          label={todo.is_completed ? 'Completed' : 'Pending'}
                          color={todo.is_completed ? 'success' : 'warning'}
                        />
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {todo.content}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default TodoListPage;