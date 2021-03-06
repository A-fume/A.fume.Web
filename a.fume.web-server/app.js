const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(cookieParser());

app.use('/api', require('./routes/index'));

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error =
        process.env.NODE_ENV === 'development'
            ? (() => {
                  console.log(err);
                  return err;
              })()
            : {};
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
