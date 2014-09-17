/**
 * handlebars helper module
 */
var moment = require('moment');
/**
 * 注册Handlebars辅助
 */
var registerHandlebarsHelper = function (hbs) {

    //获取列表中的索引号,从1开始
    hbs.registerHelper("index", function (index) {
        return index + 1;
    });

    //格式化时间
    hbs.registerHelper("datetime", function (timestamp) {
        return moment(timestamp).format("YYYY-M-D HH:mm:ss");
    });

    //数字+
    hbs.registerHelper("add", function (value) {
        return _.toNumber(value) + 1;
    });

    //数字-
    hbs.registerHelper("minus", function (value) {
        return _.toNumber(value) - 1;
    });

    //高亮页面
    hbs.registerHelper('active', function (current, value) {
        if (current === value) {
            return "class='active'";
        }
        return "";
    });


    //选择下拉框
    hbs.registerHelper('selected', function (current, candidate) {
        if (current === candidate) {
            return 'selected="true"';
        }
        return "";
    });
};

module.exports = registerHandlebarsHelper;