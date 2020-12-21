import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
const USER_SERVER = process.env.REACT_APP_API_SERVER;

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}user/register`,dataToSubmit)
        .then(response => Object.assign({status: response.status}, response.data));
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}user/login`,dataToSubmit)
                .then(response => Object.assign({status: response.status}, response.data));

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.post(`${USER_SERVER}user/auth`)
    .then(response => Object.assign({status: response.status}, response.data));

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}user/logout`)
    .then(response => Object.assign({status: response.status}, response.data));

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

