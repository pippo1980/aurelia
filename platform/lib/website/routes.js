/**
 * console manager router
 */

var _ = require('../foundation/core')._
    , qs = require('querystring')
    , fs = require('fs')
    , model = require('../foundation/repository');

/**
 * 安全转换成JSON对象
 * 如果字符串可以转换为JSON则转换,否则返回字符串
 * @param strvalue
 * @returns {*}
 */
var safeJSON = function (strvalue) {
    try {
        return JSON.parse(strvalue);
    } catch (e) {
        return strvalue;
    }
};


//获取分页对象
var paging = function (count, page, limit) {
    return {
        count: count,
        previous: page > 1,
        next: count > (page * limit),
        page: page,
        maxpage: count % limit == 0 ? count / limit : Math.floor(count / limit) + 1,
        limit: limit
    }
};


/**
 * 首页控制器
 * @constructor
 */
var Controller = function (app) {
    this.app = app;
};

/**
 * GET home page
 */
Controller.prototype.dashboard = function () {
    this.app.get("/dashboard", function (req, res) {
        res.render('dashboard');
    });
};

/**
 * 登录页
 */
Controller.prototype.login = function () {
    this.app.get("/login", function (req, res) {
        res.render('login', {layout: "default"});
    });
};

/**
 * 登录提交
 */
Controller.prototype.doLogin = function () {
    this.app.post("/login", function (req, res, next) {
        res.redirect("/dashboard");
    });
};


/**
 * 用户提醒
 */
Controller.prototype.notifications = function () {
    this.app.get("/notifications", function (req, res, next) {
        res.render("notifications", {layout: false});
    });
};


/**
 * 用户列表
 */
Controller.prototype.users = function () {
    this.app.get("/users", function (req, res, next) {
        model.User.find({}, function (err, users) {
            if (err) return next(err);
            res.render("users", {users: users});
        });
    });
};


module.exports = function (app) {
    var controller = new Controller(app);
    _.chain(controller).functions().without("app").each(function (name) {
        _.result(controller, name);
    });
};