var First = function () {
    console.log('First Ctor');
    return this;
};
First.prototype.first = function() {
    console.log('first');
};
First.prototype.prop = 'Property On Base';


 
 


module.exports = {
    setUp: function (callback) {
        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    'Mixin Test': function (t) {
        var mixin = require('../src/utils/mixin');
        var firstObj = new First();

        console.log(firstObj.prototype);
        var extendObj = {
            second: function () {
                console.log('second');
            }
        };
        var extendOtherObj = {
            third: function () {
                console.log('Third');
            }
        };
        firstObj.first();
        mixin(firstObj, [extendObj,extendOtherObj]);

        t.equal(typeof firstObj.second, 'function');
        t.equal(typeof firstObj.third, 'function');
        t.equal(typeof firstObj.prop, 'string');
        t.done();
    }
};