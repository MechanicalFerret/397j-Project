ig.module(
	'game.entities.core.projectile'
)
.requires(
	'impact.entity'
)
.defines(function() {

Projectile = ig.Entity.extend({
	maxVel: {x: 1000, y: 1000},

	damage: 0, 			// How much damage the projectile deals, usually passed in using the settings object

	init: function(x, y, settings) {
		this.parent(x, y, settings);
	},

	update: function() {
		this.checkBounds();
		this.parent();
	},

	checkBounds: function() {
		if (this.pos.y > ig.game.playable.down) this.kill();
		if (this.pos.y < ig.game.playable.up) this.kill();
		if (this.pos.x > ig.game.playable.right) this.kill();
		if (this.pos.x < ig.game.playable.left) this.kill();
	},

	check: function(other) {
		other.receiveDamage(this.damage);
		this.kill();
	}
});
});