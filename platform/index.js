var configuration = require('./lib/configuration')
    , logger = require('./lib/foundation/logging')('application');

/**
 * 使用单机方式启动,方便调试
 */
var standalone = function () {
    require("./lib/website");
};

/**
 * 使用集群方式启动
 */
var cluster = function () {
    /**
     * 启动系统
     */
    var cluster = require('cluster');
    var cups = require('os').cpus().length;

    if (cluster.isMaster) {
        for (var i = 0; i < cups; i++) {
            cluster.fork();
        }
        cluster.on('exit', function (worker, code, signal) {
            logger.warn('工作进程[ ' + worker.process.pid + ']退出,code:[' + code + '],signal:[' + signal + ']');
            worker.on("uncaughtException", function (err) {
                logger.error("捕获到未处理的进程错误:" + err);
            });
        });
    } else {
        standalone();
    }
};

var mode = configuration['launch.mode'];
if (mode === 'standalone') {
    standalone();
} else if (model === 'cluster') {
    cluster();
}
