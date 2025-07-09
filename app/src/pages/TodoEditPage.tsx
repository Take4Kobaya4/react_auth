import { useEffect, useState } from "react";
import { z } from "zod";
import type { Todo } from "../types/todo";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoApi } from "../apis/todo";
import { Alert, Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material";


const todoUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  is_completed: z.boolean(),
});

type TodoUpdateFormData = z.infer<typeof todoUpdateSchema>;

const TodoEditPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [fetchLoading, setFetchLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TodoUpdateFormData>({
    resolver: zodResolver(todoUpdateSchema),
    defaultValues: {
      title: '',
      content: '',
      is_completed: false,
    },
  });

  const isCompleted = watch('is_completed');

  const fetchTodo = async () => {
    if(!id) return;
    setFetchLoading(true);
    setError('');
    try {
      const todoData = await todoApi.getTodo(parseInt(id));
      setTodo(todoData);
      setValue('title', todoData.title);
      setValue('content', todoData.content);
      setValue('is_completed', todoData.is_completed);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch todo");
    } finally {
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    fetchTodo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (data: TodoUpdateFormData) => {
    if(!todo) return;

    setLoading(true);
    setError('');
    try {
      await todoApi.updateTodo(todo.id, data);
      navigate(`/todos/${todo.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update todo");
    } finally {
      setLoading(false);
    }
  }

  if(fetchLoading) {
    return <Typography>Loading...</Typography>;
  }

  if(error && !todo) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/todos')}
        >
          Back to Top
        </Button>
      </Box>
    );
  }

  if(!todo) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          Todo not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/todos')}
        >
          Back to Top
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate(`/todos/${todo.id}`)}
        >
          Back to Detail
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          <strong>Title:</strong> {todo.title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            multiline
            rows={4}
            {...register('content')}
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register('is_completed')}
                checked={isCompleted}
              />
            }
            label="完了済み"
            sx={{ mt: 2 }}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/todos/${todo.id}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default TodoEditPage;