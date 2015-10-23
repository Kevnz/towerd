(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var mixinSuite = require('./mixin_spec');
var spriteSuite = require('./sprite_spec');

nodeunit.run({
    'Mixin Suite': mixinSuite,
    'Sprite Suite': spriteSuite
});
},{"./mixin_spec":4,"./sprite_spec":5}],2:[function(require,module,exports){

module.exports = function (target, sources) {

    if (Array.isArray(sources)) {
        sources.forEach(function (source) {
            Object.getOwnPropertyNames( source ).forEach(function( key ) {
                Object.defineProperty( target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        });
    } else {
        Object.getOwnPropertyNames( sources ).forEach(function( key ) {
            Object.defineProperty( target, key, Object.getOwnPropertyDescriptor(sources, key));
        });
    }

    return target

};
},{}],3:[function(require,module,exports){

module.exports = function (target, sources) {

    if (Array.isArray(sources)) {
        sources.forEach(function (source) {

            Object.getOwnPropertyNames( source ).forEach(function( key ) {
                Object.defineProperty( target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        });
    } else {
        Object.getOwnPropertyNames( sources ).forEach(function( key ) {
            Object.defineProperty( target, key, Object.getOwnPropertyDescriptor(sources, key));
        });
    }

};
},{}],4:[function(require,module,exports){
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
        console.log(callback);
        if (typeof callback.done === 'function'){
          callback.done();  
        } else {
            callback();
        }
    },
    tearDown: function (callback) {
        if (typeof callback.done === 'function'){
          callback.done();  
        } else {
            callback();
        }
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
},{"../src/utils/mixin":3}],5:[function(require,module,exports){
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
        if (typeof callback.done === 'function'){
            callback.done();  
        } else {
            callback();
        }
    },
    tearDown: function (callback) {
        if (typeof callback.done === 'function'){
          callback.done();  
        } else {
            callback();
        }
    },
    'Sprite Mixins Test': function (t) {
        var extend = require('../src/utils/extend');

         
        var Sprite = Phaser.Srite; 
        this.game = new Phaser.Game(10, 10, Phaser.AUTO,'phaser-example', {
            preload: function () {
                game.load.image('testimage','assets/footman.png');
            },
            create: function () {
                var extendedSprite = extend(game.add.sprite(0,0,'testimage'), {
                    finishTest: function () {
                        console.log('finishTest');
                        t.equal(true,true);
                        t.done();
                    }
                });
                t.equal(typeof extendedSprite.finishTest  === 'function', true);
                extendedSprite.finishTest();
            }
        });

    }
};
},{"../src/utils/extend":2}]},{},[1]);
