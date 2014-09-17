/**
 * 系统模型模块
 */
var _ = require("./core")._
var logger = _.logger("model");

/**
 * 模型父类
 * @constructor
 */
function Model(props) {
    _.defaults(props, {
        _id: null,// 主键
        createTime: _.now()//记录创建日期
    });
    _.extend(this, props);
}

Model.prototype.toString = function () {
    return JSON.stringify(this);
};

/**
 * User对象
 * @constructor
 */
var User = exports.User = function (props) {
    Model.call(this, props);//调用父类构造函数
};
User.inherit(Model);