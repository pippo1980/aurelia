/**
 * logging module
 */
var log4js = require("log4js");

module.exports = function (category) {
    return log4js.getLogger('[' + process.pid + ']' + category);
};