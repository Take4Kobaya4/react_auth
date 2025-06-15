import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
            await logout();
            navigate('/login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/todos')}
                    >
                        Todo App
                    </Typography>
                    <Typography>
                        Welcome, {user?.name}
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/todos/create')}
                    >
                        New Todo
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {children}
            </Container>
        </Box>
    );
}

export default Layout;