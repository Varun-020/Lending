import React from 'react'
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSuccessMessage, verifyPhoneForRegister } from '../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { Link, Grid, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

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


function VerifyPhone() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { phoneVerificationErrors, userId, successMessage, user } = useSelector(state => state.AuthReducer);
    const [state, setState] = useState({
        phoneOtp: '',
    });


    const handleNumericInputs = (e) => {
        const regex = /^[0-9\b]+$/;
        if (regex.test(e.target.value)) {
            setState({ ...state, phoneOtp: e.target.value });
        }
    }
    const handleVerifyPhone = async (e) => {
        e.preventDefault();
        state.userId = userId
        dispatch(verifyPhoneForRegister(state));
    }
    useEffect(() => {
        if (phoneVerificationErrors?.length > 0) {
            phoneVerificationErrors.map((error) => toast.error(error.msg));
        }
        if (user) {
            navigate('/')
        }
    }, [phoneVerificationErrors, user]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
        }
        dispatch(removeSuccessMessage())
    }, [successMessage]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Helmet>
                <title>Verify Phone</title>
                <meta name="description" content="Phone verification while registering" />
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
                        <PermPhoneMsgIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Verify Phone
                    </Typography>
                    <Box component="form" onSubmit={handleVerifyPhone} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phoneOtp"
                            label="Enter OTP"
                            name="emailOtp"
                            autoComplete="emailOtp"
                            onChange={handleNumericInputs}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Verify OTP
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default VerifyPhone