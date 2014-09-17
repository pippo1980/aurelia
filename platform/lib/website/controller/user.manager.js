var controller = require("./controller")
    , _ = require("../../foundation/core")._
    , logger = _.logger("controller.user.manager")
    , model = require("../../foundation/repository");

/**
 * 控制台界面
 */
controller.get("/users", function (req, res, next) {
    model.User.find({}, function (err, users) {
        if (err) return next(err);
        res.render("users", {users: users});
    });
});