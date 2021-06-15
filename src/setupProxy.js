const {createProxyMiddleware  } = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        createProxyMiddleware ("/list", {
            target: "http://hq.sinajs.cn/list/",
            changeOrigin: true
        })
    );

    app.use(
        createProxyMiddleware ("/stock", {
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );

};
