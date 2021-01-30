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
        .get(`/ingredient${req.url}`)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:ingredientIdx', (req, res, next) => {
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'x-access-token': `Bearer ${req.cookies.w_auth}`,
            },
        })
        .get(`/ingredient/${req.params.ingredientIdx}`)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', (req, res, next) => {
    req.body.imageUrl = '';
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: {
                'x-access-token': `Bearer ${req.cookies.w_auth}`,
            },
        })
        .post('/ingredient', req.body)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            if (err.response.data)
                return res.status(400).json(err.response.data);
            next(err);
        });
});

router.put('/:ingredientIdx', (req, res, next) => {
    const axiosWithToken = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            'x-access-token': `Bearer ${req.cookies.w_auth}`,
        },
    });

    axiosWithToken
        .put(`/ingredient/${req.params.ingredientIdx}`, req.body)
        .then((response) => {
            response = response.data.data;
            return axiosWithToken.get(
                `/ingredient/${req.params.ingredientIdx}`
            );
        })
        .then((response) => {
            response = response.data.data;
            return res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:ingredientIdx/series', (req, res, next) => {
    const axiosWithToken = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            'x-access-token': `Bearer ${req.cookies.w_auth}`,
        },
    });

    axiosWithToken
        .get(`/ingredient/${req.params.ingredientIdx}/series`, req.body)
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
