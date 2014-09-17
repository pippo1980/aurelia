var  _ = require("../../foundation/core")._

/**;
 * Controller基础模块
 */
function Controller() {
    this.routes = [];
}

/**
 * 安全转换成JSON对象
 * 如果字符串可以转换为JSON则转换,否则返回字符串
 * @param strvalue
 * @returns {*}
 */
Controller.prototype.safeJson = function (strvalue) {
    try {
        return JSON.parse(strvalue);
    } catch (e) {
        return strvalue;
    }
};


/**
 * 获取分页对象
 * @param count
 * @param page
 * @param limit
 * @returns {{count: *, previous: boolean, next: boolean, page: *, maxpage: number, limit: *}}
 */
Controller.prototype.paging = function (count, page, limit) {
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
 * 手机get|post等请求
 */
_.each(['get', 'post', 'head', 'delete'], function (method) {
    Controller.prototype[method] = function (path, callback) {
        this.routes.push({
            method: method,
            path: path,
            callback: callback
        })
    }
});

module.exports = new Controller();