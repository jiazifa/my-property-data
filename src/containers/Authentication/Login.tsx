import { Avatar, Box, Button, Container, createTheme, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();

function Login() {
    const navigator = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUserNameChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }, []);

    const handlePasswordChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, []);

    const handleComfirm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigator("/", { replace: true });
    }, []);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        },
        [username, password]
    )

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        mt={8}
                        display='flex'
                        flexDirection='column'
                        alignItems='center'>
                        <Avatar>
                            A
                        </Avatar>
                    </Box>
                    <Box component='form' onSubmit={handleComfirm} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            name="username"
                            autoComplete="my-health-data.username"
                            autoFocus
                            label="用户名"
                            value={username}
                            onChange={handleUserNameChanged}
                        />

                        <TextField margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            type="password"
                            label="密码"
                            value={password}
                            onChange={handlePasswordChanged}
                            security="*" />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>登录</Button>

                        <Grid container justifyContent='flex-end'>
                            <Link to="/register">注册</Link>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </div >
    )
}

export { Login };