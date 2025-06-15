/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .min(8, 'パスワードは8文字以上で入力してください'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: FC = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setError('');
        try {
            await login(data.email, data.password);
            navigate('/todos');
        } catch (err: any) {
            setError(err.response?.data?.message || 'ログインに失敗しました');
        } finally {
        setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
                ログイン
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                type="email"
                autoComplete="email"
                autoFocus
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
                >
                {loading ? 'ログイン中...' : 'ログイン'}
                </Button>
                <Box textAlign="center">
                <Link component={RouterLink} to="/register" variant="body2">
                    アカウントをお持ちでない方はこちら
                </Link>
                </Box>
            </Box>
            </Paper>
        </Box>
        </Container>
    );
};

export default LoginPage;