import { CLOSE_LOADER, LOGIN_ERRORS, REGISTER_ERRORS, SET_LOADER, SET_TOKEN, SET_SUCCESS_MESSAGE, LOGOUT, REMOVE_SUCCESS_MESSAGE } from "../types/UserTypes";
import axios from "axios";

export const removeSuccessMessage = () => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_SUCCESS_MESSAGE });
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
            }
            localStorage.setItem('myToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: CLOSE_LOADER });
        } catch (error) {
            console.log(error.response.data.errors)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REGISTER_ERRORS, payload: error.response.data.errors });
        }
    }
};

export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            dispatch({ type: SET_LOADER })
            const { data } = await axios.post('/login', state, config);
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
            if (data && data.msg) {
                dispatch({ type: SET_SUCCESS_MESSAGE, payload: data.msg });
            }
            dispatch({ type: CLOSE_LOADER });
            localStorage.removeItem('myToken');
            dispatch({ type: LOGOUT, });
        }
        catch (error) {
            console.log(error.response.data.errors);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
        }
    }
};

