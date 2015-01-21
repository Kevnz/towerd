//expected globals - game


var Turret = function (x,y, bullets) {
    this.base = game.add.sprite(x* game.globals.TILE_SIZE, y* game.globals.TILE_SIZE,  'turret_base');
    this.gun = game.add.sprite((x+.5)* game.globals.TILE_SIZE, (y+.5)* game.globals.TILE_SIZE, 'turret_top');
    this.radar =game.add.sprite(x* game.globals.TILE_SIZE, y* game.globals.TILE_SIZE,  'clear');
    this.radar.anchor.set(0.5);
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