/**
 * 基础模块, 首先引入
 */
var _ = require("underscore")._
    , logger = require("./logging")
    , _logger = logger("core")
    , mongojs = require("mongojs");

/**
 * 增加underscore.string模块
 */
_.mixin(require('underscore.string').exports());

exports._ = _;

/**
 * ObjectID 规则表达式
 * @type {RegExp}
 */
var OBJECTID_REGEXP = /^[0-9a-fA-F]{24}$/;

/**
 * 给underscore增加自己的方法
 */
_.mixin({
    logger: logger,
    /**
     * 判断字符串是否是ObjectId类型
     * @param str
     * @returns {boolean}
     */
    isObjectId: function (str) {
        str = _.trim(str);
        if ((_.size(str) !== 24) || !str.match(OBJECTID_REGEXP)) {
            _logger.warn("[" + str + "]是非法的mongodb ObjectID,忽略处理");
            return false;
        }
        return true;
    },

    /**
     * 将字符串转换成ObjectId
     * @param strs 单个字符串或字符串数组
     * @type {connect.ObjectId|*}
     */
    oid: function (strs) {
        var ObjectId = mongojs.ObjectId;
        if (_.isArray(strs)) {
            return _.map(strs, function (str) {
                if (isObjectId(str)) {
                    return ObjectId(_.trim(str));
                }
            });
        } else {
            return _.isObjectId(strs) ? ObjectId(_.trim(strs)) : null;
        }
    }
});


/**
 * 给Function对象增加原型继承方法
 * @param parent 需要继承的构造函数对象
 */
Function.prototype.inherit = function (parent) {
    this.prototype.__proto__ = parent.prototype;
};




