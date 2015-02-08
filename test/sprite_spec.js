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
    'Sprite Mixins Test': function (t) {
        var mixin = require('../src/utils/mixin');

        
        
        document = { };
        var Phaser = require('phaser');
        var Sprite = Phaser.Srite;
        console.log(Sprite);
        t.equal(true,false);
        t.done();
    }
};