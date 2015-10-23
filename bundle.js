(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var width = 20 * 16;
var height = 10 * 16;
window.game = new Phaser.Game(width, height, Phaser.AUTO); 

game.globals = {
    TILE_SIZE: 16,
    WIDTH: 20,
    HEIGHT: 10,
    LEVEL: 'level-1',
    SCORE: 0
};

game.state.add('play', require('./states/play.js'));
game.state.add('load', require('./states/load.js'));
game.state.add('menu', require('./states/menu.js'));
game.state.add('boot', require('./states/boot.js'));
game.state.start('boot');

},{"./states/boot.js":3,"./states/load.js":4,"./states/menu.js":5,"./states/play.js":6}],2:[function(require,module,exports){
//expected globals - game


var Turret = function (x,y, bullets) {
    this.base = game.add.sprite(x* game.globals.TILE_SIZE, y* game.globals.TILE_SIZE,  'turret_base');
    this.gun = game.add.sprite((x+.5)* game.globals.TILE_SIZE, (y+.5)* game.globals.TILE_SIZE, 'turret_top');
    this.radar =game.add.sprite(x* game.globals.TILE_SIZE, y* game.globals.TILE_SIZE,  'clear');
    this.radar.anchor.set(0.5,0.5);
    this.gun.anchor.set(0.5,0.5);
    this.bullets = bullets;
    this.bulletTime = 0;
}



Turret.prototype.update = function() {
    // body...
    if(!this.target) return;


    this.gun.rotation = game.physics.arcade.angleBetween(this.gun, this.target); 

    if (game.physics.arcade.distanceBetween(this.base, this.target) < 48) {
        this.fire();
    }
};

Turret.prototype.track = function(target) {
    this.target = target;
};

Turret.prototype.fire = function() {

    if (game.time.now > this.bulletTime && this.target.alive) { 
        //  Grab the first bullet we can from the pool
        var bullet = this.bullets.getFirstExists(false); 
        if (bullet) {
            //  And fire it
            bullet.reset(this.gun.x+2 , this.gun.y-2 );
            bullet.body.velocity.x = -5;
            bullet.rotation = game.physics.arcade.moveToObject(bullet, this.target );
            this.bulletTime = game.time.now + 800;
            
        }
    }

    console.log(this.target.alive);
};

 
module.exports = Turret;
},{}],3:[function(require,module,exports){
module.exports = {
    init: function () {
        //Add here your scaling options
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#cccccc';
    },

    preload: function () {
        //Load just the essential files for the loading screen,
        //they will be used in the Load State
        game.load.image('loading', 'assets/loading.png');
        game.load.image('load_progress_bar', 'assets/progress_bar_bg.png');
        game.load.image('load_progress_bar_dark', 'assets/progress_bar_fg.png');
    },

    create: function () {
        game.state.start('load');
    }
};

},{}],4:[function(require,module,exports){
module.exports = {
    loadingLabel: function () {
        //Here we add a label to let the user know we are loading everything
        //This is the "Loading" phrase in pixel art
        //You can just as easily change it for your own art :)
        this.loading = game.add.sprite(game.world.centerX, game.world.centerY - 20, 'loading');
        this.loading.anchor.setTo(0.5, 0.5);
        //This is the bright blue bar that is hidden by the dark bar
        this.barBg = game.add.sprite(game.world.centerX, game.world.centerY + 40, 'load_progress_bar');
        this.barBg.anchor.setTo(0.5, 0.5);
        //This bar will get cropped by the setPreloadSprite function as the game loads!
        this.bar = game.add.sprite(game.world.centerX - 192, game.world.centerY + 40, 'load_progress_bar_dark');
        this.bar.anchor.setTo(0, 0.5);
        game.load.setPreloadSprite(this.bar);
    },

    preload: function () {
        this.loadingLabel();
        //Add here all the assets that you need to game.load

        game.load.spritesheet('tiles', 'assets/faux_tiles.png', 16,16);
        game.load.text('level-1', 'assets/levels/1.txt');
        game.load.atlasJSONHash('tiles', 'assets/tiles.png', 'assets/tiles.json');
        game.load.image('footman', 'assets/td-footman.png');
        game.load.image('turret_base', 'assets/turret_base.png');
        game.load.image('turret_top', 'assets/turret_top.png');
        game.load.image('clear', 'assets/tracker.png');

        game.load.image('shot', 'assets/shot.png');
    },

    create: function () {
        game.state.start('menu');
    }
};

},{}],5:[function(require,module,exports){
module.exports = {
    create: function(){
    //This is just like any other Phaser create function

    	game.state.start('play');
    },
    update: function(){
    //Game logic goes here
    },
};

},{}],6:[function(require,module,exports){
//game is global
var map;
var startingPoint;
var endingPoint;
var blocks, enemies;
var pathfinder;
var path;

var t1,t2, enemy;

var bullets;
var Turret = require('../entities/turret'); 
var addTile = function (x,y) { 
    var b = blocks.create(x*game.globals.TILE_SIZE, game.globals.TILE_SIZE *(y), 'tiles', 'greenbrick.png');
    b.body.immovable = true; 
};


var buildMap = function () {
    var l1 = game.cache.getText(game.globals.LEVEL);

    var rows = l1.split('\r\n'); 
    if (rows.length === 1) {
        rows = l1.split('\n'); 
    }
    map = [];
    rows.forEach(function (row, index) {
        var newRow = [];
        for (var i = 0; i < row.length; i++) {

            if (row[i] === '#') {
                addTile(i,index);
                newRow.push(1);
            } else if (row[i] ==='E') {
                //this is the End point
                newRow.push(0);
                endingPoint = {x: i, y: index };
            } else if (row[i] ==='S') {
                //this is the starting point
                newRow.push(0);
                startingPoint = {x: i, y: index };
            } else {
                newRow.push(0);
            } 

        };

        map.push(newRow);
    });
}
var buildEnemyMove = function (actor) {

    var move = game.add.tween(actor);
 
    for (var pathNode in path){

        // x is pf.js [path.x, path.y] or easystar.js [path.x, path.y]
        var x = path[pathNode][0]*16 || path[pathNode].x*16,
            y = path[pathNode][1]*16 || path[pathNode].y*16;

        move.to({ x: x, y: y }, 1800, Phaser.Easing.Linear.None);
    }
    if (actor.activeTween != null) {
        //console.log('activeTween');
        actor.activeTween.stop();
     // create a new tween
    }
    actor.activeTween = move;
    actor.activeTween.start(); 
}
var releaseTheHounds = function () {
    enemy = enemies.getFirstExists(false);
    enemy.reset(startingPoint.x * game.globals.TILE_SIZE, startingPoint.y * game.globals.TILE_SIZE);
    enemy.hp=8;
    buildEnemyMove(enemy);
}
var preparePath = function () {
    pathfinder.setCallbackFunction(function(fpath) {
        path = fpath || []; 
        //releaseTheHounds();
        game.time.events.repeat(Phaser.Timer.SECOND * 7, 4, releaseTheHounds, this);
 
    });
    //console.log([startx, starty], [tilex, tiley])
    pathfinder.preparePathCalculation([startingPoint.x ,startingPoint.y], [endingPoint.x ,endingPoint.y]);
    try {
        pathfinder.calculatePath();
    } catch (e) {
        console.log('error');
        //console.log(e);
    }
}
 


module.exports = {
    create: function(){
        console.log('play')
    //This is just like any other Phaser create function
        blocks = game.add.group();
        blocks.enableBody = true;
        blocks.physicsBodyType = Phaser.Physics.ARCADE;
        buildMap();



        var walkables = [0];

        pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        pathfinder.setGrid(map, walkables);

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(6, 'shot');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        enemies.createMultiple(4, 'footman');
        enemies.setAll('outOfBoundsKill', true);
        enemies.setAll('checkWorldBounds', true);

        preparePath();
        console.log('end');

        t1 = new Turret(4,4, bullets);
        t2 = new Turret(1,5, bullets); 
    },
    update: function(){
    //Game logic goes here



            game.physics.arcade.overlap(bullets, enemies, function (b,e) {
                b.kill();
                e.hp = e.hp-1;
                if (e.hp<=0) {e.kill();}
            }, null, this);
            enemies.forEach(function (enemy) {
                //console.log(game.physics.arcade.distanceBetween(t1.base, enemy));
                if (game.physics.arcade.distanceBetween(t1.base, enemy) < 48) {
                    t1.track(enemy)
                }
                if (game.physics.arcade.distanceBetween(t2.base, enemy) < 48) {
                    t2.track(enemy)
                }
            });
            t1.update();
            t2.update();
 
    },
};

},{"../entities/turret":2}]},{},[1]);
