ig.module(
	'game.entities.core.enemy'
)
.requires(
	'impact.entity'
)
.defines(function() { 

Enemy = ig.Entity.extend({
	type: ig.Entity.TYPE.B,

	destroyed: false,		// A boolean to tell if the enemy was killed by the player or simply drifted off screen
	destroySound: null,		// A sound played when the enemy is destroyed
	worth: 0, 				// How much the enemy is worth when it is destroyed

	init: function(x, y, settings) {
		this.parent(x, y, settings);
	},

	reset: function(x, y, settings) {
		this.parent(x, y, settings);
		this.destroyed = false;
	},

	update: function() {
		this.parent();
	},
	
	receiveDamage: function(amount, from) {
		this.health -= amount;
		if(this.health <= 0) {
			this.destroyed = true;
			this.kill();
		}
	},

	kill: function() {
		if(this.destroyed == true) {
			ig.game.score += this.worth;
			var spawn = Math.floor((Math.random() * 100) +1);
			if (spawn <= 5 && ig.game.state != ig.game.GAMEOVER) ig.game.spawnPowerUp(this.pos.x, this.pos.y);
			if (this.destroySound != null) this.destroySound.play();
		}
		this.parent();
	}
});
});