ig.module(
	'game.entities.star'
)
.requires(
	'impact.entity'
)
.defines(function() { 

Star = ig.Entity.extend({
	animSheet: new ig.AnimationSheet('media/background/star.png', 8, 8),

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('idle', 0, [0], true);
		this.currentAnim = this.anims.idle;
		this.setup();
	},

	update: function() {
		this.checkBounds();
		this.parent();
	},

	checkBounds: function() {
		if(this.pos.y > ig.game.playable.down - this.size.y) {
			this.pos.y = ig.game.playable.up - this.size.y;
			this.pos.x = Math.random() * ig.system.width;
			this.setup();
		}
	},

	setup: function() {
		var factor = Math.random();
		if (factor < 0.1) factor = 0.1;
		this.vel.y = 500 * factor;
		this.currentAnim.alpha = factor/5;
	}
});
});