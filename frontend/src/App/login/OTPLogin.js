import React from 'react'
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin, removeSuccessMessage } from '../../store/asyncMethods/AuthMethods';
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


function OTPLogin(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { otpErrors, successMessage } = useSelector(state => state.AuthReducer);
    const [state, setState] = useState('');

    const [loginMode, setLoginMode] = useState('password');
    const handleLoginMode = (e, mode) => {
        setLoginMode(mode);
    }


    const handleInputs = (e) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            setState(e.target.value);
        }
    }
    const userOTPLogin = async (e) => {
        e.preventDefault();
        // dispatch(postLogin(state));
    }
    useEffect(() => {
        if (otpErrors?.length > 0) {
            otpErrors.map((error) => toast.error(error.msg));
        }
    }, [otpErrors]);

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
                    <Box component="form" onSubmit={userOTPLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            type='number'
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            onChange={handleInputs}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send OTP
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signinwithpassword" variant="body2">
                                    Log in with password
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
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

export default OTPLogin

