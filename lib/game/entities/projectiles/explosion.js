ig.module(
	'game.entities.projectiles.explosion'
)
.requires(
	'impact.entity'
)
.defines(function() {

Explosion = ig.Entity.extend({ 
	animSheet: new ig.AnimationSheet('media/explosion.png', 64, 64),
	explode: new ig.Sound('media/Explosion_Small.*'),

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('idle', 0.01, [0, 1, 2 , 3, 4, 5, 6, 7, 8 , 9, 10, 11, 12, 13, 14, 15], true);
		this.currentAnim = this.anims.idle;
		this.explode.volume = 0.25;
		this.explode.play();
	},

	reset: function(x, y, settings) {
		this.parent(x, y, settings);
		this.currentAnim.rewind();
		this.explode.play();
	},

	update: function() {
		if(this.currentAnim.loopCount > 0) {
			this.kill();
		}
		this.parent();
	}
}); 
});