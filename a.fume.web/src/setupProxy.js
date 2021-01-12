const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(process.env.REACT_APP_PROXY_API, {
            target: process.env.REACT_APP_PROXY_SERVER,
            changeOrigin: true,
        })
    );
};
