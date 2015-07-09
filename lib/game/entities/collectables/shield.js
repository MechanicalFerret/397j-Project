ig.module(
	'game.entities.collectables.shield'
)
.requires(
	'game.entities.core.collectable'
)
.defines(function() { 

Shield = Collectable.extend({ 
	animSheet: new ig.AnimationSheet('media/powerups/powerups.png', 81, 81),
	size: {x: 51, y: 51},
	offset: {x: 15, y: 15},

	vel: {x: 0, y: 100},

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('health', 0.15, [24, 25, 26, 27, 28, 29, 30, 31], false);
		this.addAnim('shield', 0.15, [32, 33, 34, 35, 36, 37, 38, 39], false);
		this.addAnim('points', 0.15, [40, 41, 42, 43, 44, 45, 46, 47], false);
	},

	update: function() {
		if(ig.game.player.health < ig.game.player.maxHealth) {
			this.currentAnim = this.anims.health;
		}
		else if (ig.game.player.shield == false) {
			this.currentAnim = this.anims.shield;
		}
		else {
			this.currentAnim = this.anims.points;
		}
		this.parent();
	},

	check: function(other) {
		if(other instanceof Player) {
			if(ig.game.player.health < ig.game.player.maxHealth) other.health += 1;
			else if (ig.game.player.shield == false) other.shield = true;
			else this.worth = 50;
		}
		this.parent();
	}
});
});