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
        var tape = require('tape');
       
        var cheerio = require('cheerio');
        console.log(cheerio);
        document = cheerio.load('<body></body>');
        var Sprite = Phaser.Srite;
 var Phaser = require('phaser');
        console.log(Sprite);
        t.equal(true,false);
        t.done();
    }
};