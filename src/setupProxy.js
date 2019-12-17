const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/list", {
            target: "http://hq.sinajs.cn/list/",
            changeOrigin: true
        })
    );

};