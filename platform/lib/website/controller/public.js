var controller = require("./controller")
    , _ = require("../../foundation/core")._
    , logger = _.logger("controller.public");

/**
 * 控制台界面
 */
controller.get("/", function (req, res) {
    res.render("dashboard");
});


/**
 * 登录界面
 */
controller.get("/login",function(req,res,next){
    res.render("login",{layout:'default'});
});


/**
 * 登录处理
 */
controller.post("/login",function(req,res,next){
    res.redirect("/");
});


/**
 * 注销
 */
controller.get("/logout",function(req,res,next){
    res.redirect("/login");
});


/**
 * 个人提醒
 */
controller.get("/notifications",function(req,res,next){
    res.render("notifications",{layout:false});
});


controller.get("/messages",function(req,res,next){
    res.render("messages",{layout:"message"});
});