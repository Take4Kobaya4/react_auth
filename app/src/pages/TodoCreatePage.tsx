import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { todoApi } from "../apis/todo";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";

const todoCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
});

type TodoFormData = z.infer<typeof todoCreateSchema>;

const TodoCreatePage = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoCreateSchema),
  });

  const onSubmit = async(data: TodoFormData) => {
    setLoading(true);
    setError('');
    try {
      await todoApi.createTodo(data);
      navigate('/todos');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create todo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/todos')}
          color="info"
        >
          Back to Top
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Create new Todo
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
            autoComplete="title"
            autoFocus
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            id="content"
            label="content"
            autoComplete="content"
            multiline
            rows={4}
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/todos')}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TodoCreatePage;
