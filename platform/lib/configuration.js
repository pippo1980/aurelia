/**
 * 项目环境配置模块
 */
/**
 * development enrironment
 */
var test = {
    "name": "test",//开发环境
    "launch.mode": "standalone",//启动方式,单机
    "server.host": "localhost",//http服务ip地址
    "server.port": 8080,//http服务端口号
    "redis.host": "localhost",
    "reids.port": 6379,
    "mongo.url": "mongodb://localhost:27017/aurelia-test"
};

/**
 * development enrironment
 */
var development = {
    "name": "development",//开发环境
    "launch.mode": "standalone",//启动方式,单机
    "server.host": "localhost",//http服务ip地址
    "server.port": 8080,//http服务端口号
    "redis.host": "localhost",
    "reids.port": 6379,
    "mongo.url": "mongodb://localhost:27017/aurelia"
};

/**
 * production environment
 */
var production = {
    name: "production",//产品环境
    "launch.mode": "cluster",//启动方式,集群
    "server.host": "localhost",//http服务ip地址
    "server.port": 8080,//http服务端口号
    "redis.host": "localhost",
    "reids.port": 6379,
    "mongo.url": "mongodb://localhost:27017/aurelia"
};

//从操作系统读取NODE_ENV环境变量, 不存在的时候使用development
var env = process.env.NODE_ENV || "development";

/**
 * module exports
 */
module.exports = {
    "test":test,
    "development":development,
    "production":production
}[env];