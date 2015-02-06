var test = require('tape');
 
test('extend test', function (t) {
    t.plan(2);
    
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

    t.equal(typeof newObj.second, 'function');
    t.equal(typeof newObj.prop, 'string');
});