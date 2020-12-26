const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/auth', (req, res, next) => {
  const data = { token: req.cookies.w_auth};
  axios.post(`${process.env.API_BASE_URL}user/auth`, data)
    .then(response => {
      response = response.data.data;
      res.status(200).json(response);
    });
});

router.post('/register', (req, res, next) => {
  const result = {};
  console.log(req.body);
  res.status(200).json(result);
});

router.post('/login', (req, res, next) => {
  axios.post(`${process.env.API_BASE_URL}user/login`,req.body , { withCredentials: true })
  .then(response => {
    response = response.data.data;
    res.cookie('w_auth', response.token, { 
      maxAge: 1000*60*60*12
    });
    res.status(200).json(response);
  })
});

router.get('/logout', (req, res, next) => {
  const result = {};
  res.clearCookie('w_auth');
  res.status(200).json(result);
});

module.exports = router;
/*

export function registerUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}user/register`,dataToSubmit)
      .then(response => Object.assign({status: response.status}, response.data));
  
  return {
      type: REGISTER_USER,
      payload: request
  }
}

export function loginUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}user/login`,dataToSubmit, { withCredentials: true })
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

const USER_SERVER = process.env.REACT_APP_API_SERVER_HTTPS;*/