var _ = require('../../lib/foundation/core')
    , configuration = require("../../lib/configuration")
    , model = require("../../lib/foundation/repository")
    , mongojs = require("mongojs")
    , database = mongojs(configuration['mongo.url'])
    , should = require('should');

describe("repository", function () {

    before(function(done){
        database.collection("user").drop(function(err){
            !err && done();
        });
    });

    describe("User", function () {

        var userId = null;

        describe("#insert()", function () {
            it("should insert user successful", function (done) {
                var user = new model.User({
                    name: 'snowway',
                    email: ['snowway.xue@gmail.com', 'xuewei@me.com']
                });
                user.create(function (err) {
                    should.not.exist(err);
                    userId = user._id;
                    done();//结束异步回调等待
                });
            });
        });

        describe("#load()", function () {
            it("should load user with id successful", function (done) {
                model.User.load(userId, function (err, user) {
                    should.not.exist(err);
                    should.exist(user);
                    user.should.have.property("name", "snowway");
                    'xuewei@me.com'.should.equal(user.email[1]);
                    done();
                })
            });
        });

    });
});