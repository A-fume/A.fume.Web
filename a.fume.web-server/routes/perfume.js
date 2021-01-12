const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/recentSearch', (req, res, next) => {
    axios
        .create({
            baseURL: process.env.API_BASE_URL,
            headers: { 'x-access-token': `Bearer ${req.cookies.w_auth}` },
        })
        .get('perfume/recentSearch')
        .then((response) => {
            response = response.data.data;
            res.status(200).json(response);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
