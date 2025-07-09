import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../apis/todo";
import { Alert, Box, Button, Card, Typography, CardContent, Chip, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";


const TodoDetailPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    if(!id) return;
    setLoading(true);
    setError('');
    try {
      const todoData = await todoApi.getTodo(parseInt(id));
      setTodo(todoData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch todo");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    if(!todo) return;

    setDeleting(true);
    try {
      await todoApi.deleteTodo(todo.id);
      navigate('/todos');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete todo");
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  }

  // 
  if(loading) {
    return (
      <Typography>Loading...</Typography>
    );
  }

  // エラーかつtodoが存在しない場合
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

  if(!todo){
    return (
      <Box>
        <Typography variant="h6" color="error">
          Todo not found
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/todos')}
          sx={{ mt: 2 }}
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
          color="primary"
          onClick={() => navigate('/todos')}
          sx={{ mr: 2 }}
        >
          Back to Top
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h4" component="h1">
              {todo.title}
            </Typography>
            <Chip
              label={todo.is_completed ? 'Completed' : 'Not Completed'}
              color={todo.is_completed ? 'success' : 'default'}
            />
          </Box>

          <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
            {todo.content}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <Button
            onClick={() => navigate(`/todos/${todo.id}/edit`)}
            variant="contained"
            color="info"
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* 削除確認ダイアログ */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Todoを削除してもよろしいでしょうか？</DialogTitle>
        <DialogContent>
          <Typography>
            「{todo.title}」を削除します。この操作は元に戻せません。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            autoFocus
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TodoDetailPage;