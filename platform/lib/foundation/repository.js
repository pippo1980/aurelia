var _ = require('./core')._
    , configuration = require("./../configuration")
    , logger = _.logger("repository")
    , mongojs = require("mongojs")
    , database = mongojs(configuration['mongo.url'])
    , model = require("./model")
    , users = database.collection("user");

/**
 * 根据id查找User
 * @param id
 * @param callback
 */
model.User.load = function (id, callback) {
    users.findOne({_id: _.oid(id)}, function (err, doc) {
        if (err) return callback(err);
        callback(null, new model.User(doc));
    });
};

/**
 * 创建一个用户
 * @param callback
 */
model.User.prototype.create = function (callback) {
    var self = this;
    users.insert(self, function (err) {
        if (err) return callback(err);
        callback(null);
    });
};

model.User.find = function (query, callback) {
    _.defaults(query, {limit: 20, page: 1});
    var criteria = {};
    var cursor = users.find(criteria);
    cursor.count(function (err, count) {
        if (err) return callback(err);
        cursor.sort({createTime: -1})
            .limit(query.limit)
            .skip((query.page - 1) * query.limit)
            .toArray(function (err, docs) {
                if (err) return callback(err);
                callback(null, count, docs);
            });
    });
};


module.exports = model;