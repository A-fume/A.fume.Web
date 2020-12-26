import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';

export function registerUser(dataToSubmit){
    const request = axios.post(`${process.env.REACT_APP_PROXY_API}user/register`,dataToSubmit)
        .then(response => Object.assign({status: response.status}, response.data));
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${process.env.REACT_APP_PROXY_API}user/login`,dataToSubmit, { withCredentials: true })
                .then(response => Object.assign({status: response.status}, response.data));

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${process.env.REACT_APP_PROXY_API}user/auth`)
    .then(response => Object.assign({status: response.status}, response.data));

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${process.env.REACT_APP_PROXY_API}user/logout`)
    .then(response => Object.assign({status: response.status}, response.data));

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

