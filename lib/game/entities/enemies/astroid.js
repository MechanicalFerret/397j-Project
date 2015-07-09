ig.module(
	'game.entities.enemies.astroid'
)
.requires(
	'game.entities.core.enemy'
)
.defines(function() { 

Astroid = Enemy.extend({
	animSheet: new ig.AnimationSheet('media/astroid.png', 125, 125),
	destroySound: new ig.Sound('media/Explosion_Big.*'),
	size: {x: 55, y: 55},
	offset: {x: 35, y: 35},

	health: 3,
	worth: 10,
	vel: {x: 0, y: 200},
	maxVel: {x: 0, y: 200},

	init: function(x, y, settings) {
		// Determine Actual position
		x = Math.random() * ig.system.width;
		y = -125;
		this.parent(x, y, settings);

		// Determine sprite
		random = Math.floor((Math.random() * 16));
		this.addAnim('idle', 0, [random], true);
		this.destroySound.volume = 0.5;
	},

	reset: function(x, y, settings) {
		// Determine Actual position
		x = Math.random() * ig.system.width;
		y = -125;
		this.parent(x, y, settings);
	},

	update: function() {
		this.currentAnim.angle += 0.01;
		this.checkBounds();
		this.parent();
	},

	checkBounds: function() {
		if(this.pos.y > ig.game.playable.down) this.kill();
	}
});
});