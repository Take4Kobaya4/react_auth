
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import TodoListPage from './pages/TodoList';
import Layout from './components/Layout';
import type { FC, ReactNode } from 'react';
import useAuth from './hooks/useAuth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    }
  }
});

const ProtectedRoute:FC<{children: ReactNode}> = ({children}) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" replace/>
}
function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/todos' element={
                <ProtectedRoute>
                  <Layout>
                    <TodoListPage/>
                  </Layout>
                </ProtectedRoute>
              }/>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
