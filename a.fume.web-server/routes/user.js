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