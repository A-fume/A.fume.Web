const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/search/all', (req, res, next) => {
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'x-access-token': `Bearer ${req.cookies.w_auth}`,
            },
        })
        .get(`/brand${req.url}`)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:brandIdx', (req, res, next) => {
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'x-access-token': `Bearer ${req.cookies.w_auth}`,
            },
        })
        .get(`/brand/${req.params.brandIdx}`)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});
module.exports = router;
