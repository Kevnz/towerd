module.exports = {
    buildMove : function () {
        var actor = this;//work in progress
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
};