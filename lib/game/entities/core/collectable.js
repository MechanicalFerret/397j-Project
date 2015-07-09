ig.module(
	'game.entities.core.collectable'
)
.requires(
	'impact.entity'
)
.defines(function() { 

Collectable = ig.Entity.extend({ 
	checkAgainst: ig.Entity.TYPE.A,

	collectSound: null, 	// Sound that is played when collected
	worth: 0, 				// How much the collectable is worth when it is collected

	init: function(x, y, settings) {
		this.parent(x, y, settings);
	},

	check: function(other) {
		if(this.collectSound != null) this.collectSound.play();
		ig.game.score += this.worth;
		this.kill();
	}

});
});