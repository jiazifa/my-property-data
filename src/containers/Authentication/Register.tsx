import { Avatar, Box, Button, Container, createTheme, Grid, TextField, ThemeProvider } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

const theme = createTheme();

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");

    const handleUserNameChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }, []);

    const handlePasswordChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, []);

    const handlePasswordConfirmChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value)
    }, []);

    const handleEmailChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, []);

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {

    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <Box>
                    <Box mt={8} display='flex' flexDirection='column' alignItems='center'>
                        <Avatar> A </Avatar>
                    </Box>
                    <Box component='form' noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    name="username"
                                    autoComplete="my-health-data.username"
                                    value={username}
                                    label="用户名" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    value={email}
                                    name="email"
                                    label="邮箱" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    name="password"
                                    value={password}
                                    label="密码" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    label="确认密码" />
                            </Grid>

                        </Grid>
                        <Button
                            sx={{ mt: 3, md: 2 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >注册</Button>

                        <Grid mt={2} container justifyContent="flex-end">
                            <Link to="/login">
                                已有账号了？请登录
                            </Link>

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export { Register };