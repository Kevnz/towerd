
module.exports = {
    setUp: function (callback) {
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    'Extend Test': function (test) {
            var extend = require('../src/utils/extend');
        var oldObj = {
            first:function () {
                console.log('first');
            },
            prop: 'Property On Base'
        };
        var extendObj = {
            second: function () {
                console.log('second');
            }
        };
        var newObj = extend(oldObj, extendObj);

        test.equal(typeof newObj.second, 'function');
        test.equal(typeof newObj.prop, 'string'); 
        test.done();
    }
};


