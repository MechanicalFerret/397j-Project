ig.module(
	'game.entities.enemies.bomber'
)
.requires(
	'game.entities.core.enemy'
)
.defines(function() { 

Bomber = Enemy.extend({
	animSheet: new ig.AnimationSheet('media/ships/enemy_bomber.png', 50, 77),
	destroySound: new ig.Sound('media/Explosion_Big.*'),
	size: {x: 35, y: 35},

	health: 1,
	worth: 10,
	type: ig.Entity.TYPE.B,
	maxVel: {x: 500, y: 5400},
	side: 0,

	init: function(x, y, settings) {
		this.side = settings.side;
		x = (this.side == 1) ? ig.game.playable.right : ig.game.playable.left - 77;
		this.parent(x, y, settings);
		this.vel.x = (this.side == 1) ? -400 : 400;
		this.offset = (this.side == 1) ? {x: 0, y: 25} : {x: 10, y: 20};

		// Determine sprite
		this.addAnim('idle', 0.15, [4, 5, 6, 7], false);
		this.destroySound.volume = 0.5;
		this.currentAnim = this.anims.idle;
		this.currentAnim.angle = (this.side==1) ? -Math.PI / 2 : Math.PI / 2;
	},

	reset: function(x, y, settings) {
		this.side = settings.side;
		x = (this.side == 1) ? ig.game.playable.right : ig.game.playable.left - 77;
		this.parent(x, y, settings);
		this.vel.x = (this.side == 1) ? -400 : 400;
		this.offset = (this.side == 1) ? {x: 0, y: 25} : {x: 10, y: 20};
		this.currentAnim = this.anims.idle;
		this.currentAnim.angle = (this.side==1) ? -Math.PI / 2 : Math.PI / 2;
	},

	update: function() {
		this.checkBounds();
		this.parent();
	},

	checkBounds: function() {
		if (this.side == 0 && this.pos.x > ig.game.playable.right) this.kill();
		if (this.side == 1 && this.pos.x < ig.game.playable.left) this.kill();
	},

	kill: function() {
		this.parent();
	}
});
});