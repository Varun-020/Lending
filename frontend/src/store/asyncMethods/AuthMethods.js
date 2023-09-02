import {
    CLOSE_LOADER, LOGIN_ERRORS, REGISTER_ERRORS, SET_LOADER, SET_TOKEN, SET_SUCCESS_MESSAGE,
    LOGOUT, REMOVE_SUCCESS_MESSAGE, REMOVE_ERRORS, VERIFICATION_EMAIL_ERRORS, SET_RESPONSE,
    VERIFICATION_PHONE_ERRORS, SET_OTP_ERROR
} from "../types/UserTypes";
import axios from "axios";

export const removeSuccessMessage = () => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_SUCCESS_MESSAGE });
    }
}
export const removeErrors = () => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_ERRORS });
    }
}

export const postRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/signup', state, config);
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
                dispatch({ type: SET_RESPONSE, payload: data });
            }
            // localStorage.setItem('myToken', data.token);
            // dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REGISTER_ERRORS, payload: error.response.data.errors });
        }
    }
};
export const verifyEmailForRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/verifyEmailForRegister', state, config);
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
                dispatch({ type: SET_RESPONSE, payload: data });
            }
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: VERIFICATION_EMAIL_ERRORS, payload: error.response.data.errors });
        }
    }
};
export const verifyPhoneForRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/verifyPhoneForRegister', state, config);
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
            }
            localStorage.setItem('myToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: VERIFICATION_PHONE_ERRORS, payload: error.response.data.errors });
        }
    }
};
export const sendOtpToMail = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/sendOtpToMail', state, config);
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
                dispatch({ type: SET_RESPONSE, payload: data });
            }
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_OTP_ERROR, payload: error.response.data.errors });
        }
    }
};


export const verifyOTPForLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/verifyOTPForLogin', state, config);
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
            }
            localStorage.setItem('myToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: VERIFICATION_EMAIL_ERRORS, payload: error.response.data.errors });
        }
    }
};


export const signinWithPassword = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            dispatch({ type: SET_LOADER })
            const { data } = await axios.post('/signinwithpassword', state, config);
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
            }
            localStorage.setItem('myToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: CLOSE_LOADER });
        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
        }
    }
};
export const logout = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            dispatch({ type: SET_LOADER })
            const { data } = await axios.post('/logout', state, config);
            dispatch({ type: LOGOUT, });
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
            }
            localStorage.removeItem('myToken');
            dispatch({ type: CLOSE_LOADER });
        }
        catch (error) {
            console.log(error.response.data.errors);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
        }
    }
};

