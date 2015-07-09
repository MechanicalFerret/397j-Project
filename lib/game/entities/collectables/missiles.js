ig.module(
	'game.entities.collectables.missiles'
)
.requires(
	'game.entities.core.collectable'
)
.defines(function() { 

Missiles = Collectable.extend({ 
	animSheet: new ig.AnimationSheet('media/powerups/powerups.png', 81, 81),
	size: {x: 51, y: 51},
	offset: {x: 15, y: 15},

	vel: {x: 0, y: 100},

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('twin', 0.15, [8, 9, 10, 11, 12, 13, 14, 15], false);
		this.addAnim('triple', 0.15, [16, 17, 18, 19, 20, 21, 22, 23], false);
		this.addAnim('points', 0.15, [40, 41, 42, 43, 44, 45, 46, 47], false);
	},

	update: function() {
		if(ig.game.player.twinshot == false) {
			this.currentAnim = this.anims.twin;
		}
		else if (ig.game.player.tripleshot == false) {
			this.currentAnim = this.anims.triple;
		}
		else {
			this.currentAnim = this.anims.points;
		}
		this.parent();
	},

	check: function(other) {
		if(other instanceof Player) {
			if (other.twinshot == false) other.twinshot = true;
			else if (other.tripleshot == false) other.tripleshot = true;
			else this.worth = 50;
		}
		this.parent();
	}
});
});