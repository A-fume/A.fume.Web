const express = require('express');
const router = express.Router();
const axios = require('axios');
//const upload = require('../modules/multer.js');

router.get('/search/all', (req, res, next) => {
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'x-access-token': `Bearer ${req.cookies.w_auth}`,
            },
        })
        .get(`/series${req.url}`)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:seriesIdx', (req, res, next) => {
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'x-access-token': `Bearer ${req.cookies.w_auth}`,
            },
        })
        .get(`/series/${req.params.seriesIdx}`)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'x-access-token': `Bearer ${req.cookies.w_auth}`,
            },
        })
        .post('/series', req.body)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.data)
                return res.status(400).json(err.response.data);
            next(err);
        });
});

router.put('/:seriesIdx', (req, res, next) => {
    const axiosWithToken = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            'x-access-token': `Bearer ${req.cookies.w_auth}`,
        },
    });

    axiosWithToken
        .put(`/series/${req.params.seriesIdx}`, req.body)
        .then((response) => {
            response = response.data.data;
            return axiosWithToken.get(`/series/${req.params.seriesIdx}`);
        })
        .then((response) => {
            response = response.data.data;
            return res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:seriesIdx/ingredients', (req, res, next) => {
    const axiosWithToken = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            'x-access-token': `Bearer ${req.cookies.w_auth}`,
        },
    });

    axiosWithToken
        .get(`/series/${req.params.seriesIdx}/ingredients`, req.body)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
