var test = require('tape');
var First = function () {
    console.log('First Ctor');
    return this;
};
First.prototype.first = function() {
    console.log('first');
};
First.prototype.prop = 'Property On Base';


test('mixin test', function (t) {
    t.plan(2);
    
    var mixin = require('../src/utils/mixin');
    var firstObj = new First();

    console.log(firstObj.prototype);
    var extendObj = {
        second: function () {
            console.log('second');
        }
    };
    firstObj.first();
    console.log(firstObj);
    mixin(firstObj, extendObj);

    t.equal(typeof firstObj.second, 'function');
    t.equal(typeof firstObj.prop, 'string');
});
test('mixin test', function (t) {
    t.plan(3);
    
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
});