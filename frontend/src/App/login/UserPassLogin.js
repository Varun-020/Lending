import React from 'react'
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signinWithPassword, removeSuccessMessage, removeErrors } from '../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { Link, Grid, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                abc.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();


function UserPassLogin(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loginErrors, loading, successMessage, user } = useSelector(state => state.AuthReducer);
    const [state, setState] = useState({
        email: '',
        password: '',
    });


    const handleInputs = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const userLogin = async (e) => {
        e.preventDefault();
        dispatch(signinWithPassword(state));
    }
    useEffect(() => {
        if (loginErrors?.length > 0) {
            loginErrors.map((error) => toast.error(error.msg));
        }
        if (user) {
            navigate('/')
        }
    }, [loginErrors, user]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
        }
        dispatch(removeSuccessMessage())
    }, [successMessage]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Helmet>
                <title>User Login</title>
                <meta name="description" content=" user login to access all blogs are here this is the homepage html css js react mongodb express nodejs " />
            </Helmet>
            <Toaster
                position='top-center' reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={userLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleInputs}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInputs}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/signinwithotp" variant="body2">
                                    Login with OTP?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default UserPassLogin
