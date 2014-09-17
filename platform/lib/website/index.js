/**
 * upns console index
 * use express 3.5.2
 */
var express = require('express')
    , _ = require('../foundation/core')._
    , hbs = require('express-hbs')
    , hbshelper = require('./helper/handlebars.helper.js')
    , validator = require('express-validator')
    , http = require("http")
    , configuration = require("../configuration")
    , logger = _.logger("express");

var app = express();

/**
 * 配置express框架
 */
(function configureExpress() {
    app.configure(function () {
        app.engine('hbs', hbs.express3({
            defaultLayout: __dirname + '/views/layouts/admin.hbs',//默认使用admin.hbs作为模板
            partialsDir: __dirname + '/views/partials',//partials目录
            layoutsDir: __dirname + '/views/layouts',//layout目录
            contentHelperName: "define"
        }));
        hbshelper(hbs);
        app.set('view engine', 'hbs');
        app.set('views', __dirname + "/views");
        app.use(express.favicon());
        app.use(express.static(__dirname + "/public"));
        app.use(express.staticCache());
        app.use(express.bodyParser());//multipart file location is /tmp
        app.use(validator()); //必须紧跟着bodyParser
        app.use(express.methodOverride());
        app.use(express.cookieParser("aurelia"));
        app.use(express.session({ secret: 'ecd17896029409c6922b7cfbe79df8f2', cookie: { maxAge: 1800000 }}));
        app.use(app.router);
    });

    /**
     * developement环境下的express配置
     */
    app.configure('development', function () {
        app.use(express.logger('dev'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
    });

    /**
     * production环境下的express配置
     */
    app.configure('production', function () {
        app.enable('view cache', true);
        app.use(function (err, req, res) {
            logger.error(err.stack);
            res.send(500, '系统错误,请联系管理员');
        });
    });

    /**
     * 全局inspect对象,用于页面debug对象信息
     */
    app.locals.inspect = require('util').inspect;

    /**
     * 配置自定义的路由规则
     */
    (function configureRoutes() {
        var controller = require("./controller");
        _.each(controller.routes, function (route) {
            app[route.method].call(app,route.path, route.callback);
        });
    })();
})();


/**
 * 开启应用服务器
 */
(function startApplication() {
    var port = configuration['server.port'];
    var server = http.createServer(app);
    server.on("error", function (err) {
        logger.warn("http server error:" + err);
    });
    server.listen(port, function () {
        logger.info("http server start with port:%d", port);
    });
})();
