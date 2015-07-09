ig.module(
	'game.entities.collectables.coin'
)
.requires(
	'game.entities.core.collectable'
)
.defines(function() { 

Coin = Collectable.extend({ 
	animSheet: new ig.AnimationSheet('media/coin.png', 32, 32),
	size: {x: 32, y: 32},

	worth: 10,
	normalVel: {x: 0, y: 100},

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('idle', 0.15, [0, 1, 2, 3, 4, 5, 6, 7], false);
		this.currentAnim = this.anims.idle;
	}
});
});