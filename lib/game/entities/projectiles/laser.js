ig.module(
	'game.entities.projectiles.laser'
)
.requires(
	'game.entities.core.projectile'
)
.defines(function() {

Laser = Projectile.extend({ 
	animSheet: new ig.AnimationSheet('media/projectiles/enemy_laser.png', 100, 100),
	size: {x: 50, y: 50},
	offset: {x: 25, y: 25},
	health: 1,
	dead: false,

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('idle', 0, [0], true);
		this.addAnim('death', 0.20, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], true);
		this.currentAnim = this.anims.idle;
	},

	reset: function(x, y, settings) {
		this.parent(x, y, settings);
		this.currentAnim.rewind();
		this.currentAnim = this.anims.idle;
		this.dead = false;
	},

	update: function() {
		if (this.dead == true && this.currentAnim.loopCount > 0) {
			this.kill();
		}
		this.parent();
	},

	check: function(other) {
		if (this.dead == true) return;
		this.dead = true;
		this.currentAnim = this.anims.death;
		other.receiveDamage(this.damage);
	}
}); 
});