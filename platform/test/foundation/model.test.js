var _ = require('../../lib/foundation/core')
    , model = require("../../lib/foundation/model")
    , should = require('should');

describe("model", function () {

    describe("User",function(){

        describe("#constructor",function(){
            it("should create user with default member", function () {
                var user = new model.User({
                    name: 'snowway',
                    email: ['snowway.xue@gmail.com', 'xuewei@me.com']
                });
                should.ok(user);
                "snowway".should.eql(user.name);
                "xuewei@me.com".should.eql(user.email[1]);
                user.should.have.property('_id');
                user.should.have.property('createTime').and.above(0);
            });
        });
    });

});