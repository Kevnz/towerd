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
