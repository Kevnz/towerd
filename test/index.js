
var mixinSuite = require('./mixin_spec');
var spriteSuite = require('./sprite_spec');

nodeunit.run({
    'Mixin Suite': mixinSuite,
    'Sprite Suite': spriteSuite
});