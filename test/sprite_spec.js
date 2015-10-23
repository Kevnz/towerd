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