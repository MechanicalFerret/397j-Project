ig.module(
	'game.control.ui'
)
.requires(
	'impact.entity'
)
.defines(function() { 

UI = ig.Entity.extend({ 
	font: new ig.Font('media/score.font.png'),
	heart: new ig.Image('media/full_heart.png'),
	zIndex: 100, // Keep the UI always on top

	player: null,

	init: function(x, y, settings) {
		this.player = settings.player;
	},

	draw: function() {
		// Draw Score
		this.font.draw('SCORE: ' + ig.game.score, 5, ig.system.height - 37);

		// Draw Player Health
		if (this.player == null) return;
		for(var i=0; i<this.player.health; i++) {
			this.heart.draw(ig.system.width - (i * 32) - 37, ig.system.height - 37);
		}
	},
});
});