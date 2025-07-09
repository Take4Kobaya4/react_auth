import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import TodoCreatePage from "./pages/TodoCreatePage";
import TodoEditPage from "./pages/TodoEditPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { type ReactNode } from "react";
import useAuth from "./hooks/useAuth";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    }
  }
});
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  // If user is not authenticated, redirect to login page（ユーザーが認証されていない：ログインへリダイレクト）
  return !user ?  <>{children}</>: <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/todos"
              element={
                <ProtectedRoute>
                  <TodoListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/todos/create"
              element={
                <ProtectedRoute>
                  <TodoCreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/todos/:id"
              element={
                <ProtectedRoute>
                  <TodoDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/todos/:id/edit"
              element={
                <ProtectedRoute>
                  <TodoEditPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;