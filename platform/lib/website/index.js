/**
 * upns console index
 * use express 3.5.2
 */
var express = require('express')
    , _ = require('../foundation/core')._
    , hbs = require('express-hbs')
    , hbshelper = require('./handlebars.helper')
    , validator = require('express-validator')
    , http = require("http")
    , configuration = require("../configuration")
    , logger = _.logger("website");

var app = express();


//配置express
app.configure(function () {
    app.engine('hbs', hbs.express3({
        defaultLayout: __dirname + '/views/layouts/admin.hbs',
        partialsDir: __dirname + '/views/partials',
        layoutsDir: __dirname + '/views/layouts',
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

//developement
app.configure('development', function () {
    app.use(express.logger('dev'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
});

//production
app.configure('production', function () {
    app.enable('view cache', true);
    app.use(function (err, req, res, next) {
        logger.error(err.stack);
        res.send(500, '系统错误,请联系管理员');
    });
});


//全局inspect对象?
app.locals.inspect = require('util').inspect;

require("./routes")(app);

var port = configuration['server.port'];

var server = http.createServer(app);

server.on("error", function (err) {
    logger.warn("http server error:" + err);
    process.exit(1);
});

server.listen(port, function () {
    logger.info("HTTP监听端口:%d", port);
});
