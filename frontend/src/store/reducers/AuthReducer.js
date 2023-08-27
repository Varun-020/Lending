import {
	CLOSE_LOADER, LOGIN_ERRORS, LOGOUT, REGISTER_ERRORS, SET_LOADER, SET_TOKEN,
	SET_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE
} from "../types/UserTypes";
import jwt_decode from 'jwt-decode';

const initState = {
	loading: false,
	registerErrors: [],
	loginErrors: [],
	redirect: false,
	token: '',
	user: '',
	successMessage: ''
}

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('myToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('myToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { user } = decoded;
		initState.user = user;
	}
}
const AuthReducer = (state = initState, action) => {
	if (action.type === SET_LOADER) {
		return { ...state, loading: true };
	}
	else if (action.type === CLOSE_LOADER) {
		return { ...state, loading: false };
	}
	else if (action.type === REGISTER_ERRORS) {
		return { ...state, registerErrors: action.payload };
	}
	else if (action.type === SET_TOKEN) {
		const decoded = verifyToken(action.payload);
		const { user } = decoded;
		return {
			...state,
			token: action.payload,
			user: user,
			loginErrors: [],
			registerErrors: [],
		};
	}
	else if (action.type === LOGOUT) {
		return { ...state, token: '', user: '' };
	} else if (action.type === LOGIN_ERRORS) {
		return {
			...state,
			loginErrors: action.payload,
		};
	}
	else if (action.type === SET_SUCCESS_MESSAGE) {
		return {
			...state,
			successMessage: action.payload,
		};
	}
	else if (action.type === REMOVE_SUCCESS_MESSAGE) {
		return {
			...state,
			successMessage: '',
		};
	}
	else if (action.type === LOGOUT) {
		return {
			...state,
			user: '',
			token: ''
		};
	}
	else {
		return state;
	}

}

export default AuthReducer