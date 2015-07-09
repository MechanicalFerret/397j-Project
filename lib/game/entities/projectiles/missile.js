ig.module(
	'game.entities.projectiles.missile'
)
.requires(
	'game.entities.core.projectile'
)
.defines(function() {

Missile = Projectile.extend({ 
	animSheet: new ig.AnimationSheet('media/projectiles/missile.png', 11, 36),
	size: {x: 11, y: 36},
	health: 1,

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('idle', 0.15, [0, 1, 2, 3], false);
		this.currentAnim = this.anims.idle;
	},

	check: function(other) {
		ig.game.spawnEntity(Explosion, this.pos.x-32, this.pos.y-32);
		this.parent(other);
	}
}); 
});