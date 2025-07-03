import { useState, useEffect } from 'react';
import { type Todo } from '../types/todo';
import { useNavigate, useParams } from 'react-router-dom';
import { todoApi } from '../apis/todo';

const TodoDetailPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      if(!id) return;

      setLoading(true);
      setError('');
      try {
        const todoData = await todoApi.getTodo(parseInt(id));
        setTodo(todoData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch(err: any) {
        setError(err.response?.data?.message || "Failed to fetch todo");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);


};

export default TodoDetailPage;
