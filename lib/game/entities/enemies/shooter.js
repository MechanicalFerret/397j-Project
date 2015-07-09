ig.module(
	'game.entities.enemies.shooter'
)
.requires(
	'game.entities.core.enemy'
)
.defines(function() { 

Shooter = Enemy.extend({
	animSheet: new ig.AnimationSheet('media/ships/enemies.png', 90, 90),
	destroySound: new ig.Sound('media/Explosion_Big.*'),
	size: {x: 50, y: 55},
	offset: {x: 20, y: 20},

	health: 9,
	worth: 50,
	type: ig.Entity.TYPE.B,
	maxVel: {x: 500, y: 500},


	area: {},
	shoot_time_current: 0,
	shoot_time_max: 90,

	init: function(x, y, settings) {
		this.parent(x, y, settings);

		// Determine sprite
		this.addAnim('idle', 0, [0], true);
		this.destroySound.volume = 0.5;
		this.currentAnim = this.anims.idle;
	},

	reset: function(x, y, settings) {
		this.parent(x, y, settings);
	},

	update: function() {
		this.moveAI();
		this.shootAI();
		this.checkBounds();
		this.parent();
	},

	moveAI: function() {
		// Check if we should move downward first
		if(this.pos.y < 100) {
			this.vel.y = 250;
		} 
		// Otherwise don't move anymore
		else {
			this.pos.y = 100;
			this.vel.y = 0;
		}

		// If we dont have an x velocity and we are at the proper y position
		// give it an X velocity based on player position
		if (this.vel.y == 0 && this.vel.x == 0) {
			this.vel.x = (this.pos.x < ig.game.player.pos.x) ? 150 : -150;
		}
	},

	shootAI: function() {
		this.shoot_time_current += 1;
		if (this.shoot_time_current >= this.shoot_time_max) {
			var settings = {vel: {x: 0, y: 200}, checkAgainst: ig.Entity.TYPE.A, damage: 1};
			ig.game.spawnEntity(Laser, this.pos.x, this.pos.y, settings);
			this.shoot_time_current = 0;
		}
	},

	checkBounds: function() {
		if (this.pos.x < this.area.left) {
			this.pos.x = this.area.left;
			this.vel.x = 150;
		}
		if (this.pos.x > this.area.right) {
			this.pos.x = this.area.right;
			this.vel.x = -150;
		}
	},

	kill: function() {
		ig.game.returnShooter(this.area);
		this.parent();
	}
});
});