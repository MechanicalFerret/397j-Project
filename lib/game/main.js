ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.entity',
	'impact.entity-pool',
	'impact.sound',
	'impact.debug.debug',

	'game.control.ui',

	'game.entities.core.projectile',
	'game.entities.core.collectable',
	'game.entities.core.enemy',

	'game.entities.collectables.coin',
	'game.entities.collectables.missiles',
	'game.entities.collectables.shield',

	'game.entities.projectiles.missile',
	'game.entities.projectiles.explosion',
	'game.entities.projectiles.laser',

	'game.entities.player',
	'game.entities.star',
	'game.entities.enemies.astroid',
	'game.entities.enemies.shooter',
	'game.entities.enemies.bomber'
)
.defines(function(){

MyGame = ig.Game.extend({	
	// Timers
	spawnTimer: new ig.Timer(1),
	enemyTimer: new ig.Timer(5),

	// Globals
	score: 0,
	playable: null,
	powerups: [Missiles, Shield],
	font: new ig.Font('media/score.font.png'),

	// Key Entities
	player: null,
	ui: null,

	// States
	state: 0,
	MENU: 0,
	PLAY: 1,
	GAMEOVER: 2,

	init: function() {
		ig.input.bind(ig.KEY.A, 'left');
		ig.input.bind(ig.KEY.D, 'right');
        ig.input.bind(ig.KEY.W, 'up');
        ig.input.bind(ig.KEY.S, 'down');
        ig.input.bind(ig.KEY.SPACE, 'fire');

        ig.EntityPool.enableFor(Projectile);
        ig.EntityPool.enableFor(Collectable);
        ig.EntityPool.enableFor(Enemy);
        ig.EntityPool.enableFor(Explosion);

        // Spawn Stars
        for (var i=0; i<100; i++) {
		    this.spawnEntity(Star, Math.random() * ig.system.width, Math.random() * ig.system.height);
		}

        // Make Playable Area and UI
        this.playable = {left: -50, right: ig.system.width+50, up: -50, down: ig.system.height+50};
        this.ui = this.spawnEntity(UI, 0, 0);
	},
	
	update: function() {
		switch (this.state) {
			case this.PLAY:
				this.playState();
				break;
			case this.GAMEOVER:
				this.gameoverState();
				break;
			case this.MENU:
				this.menuState();
				break;
		}
		this.parent();
	},

	menuState: function() {
		if(ig.input.state('fire')) {
			this.state = this.PLAY;
			this.score = 0;
			this.player = this.spawnEntity(Player, ig.system.width/2, ig.system.height - 150);
			this.ui.player = this.player;
		}

	},

	playState: function() {
		if(this.spawnTimer.delta() >= 0) {
			this.spawnEntity(Astroid, 0, 0);
			this.spawnTimer.reset();
		}
		if(this.enemyTimer.delta() >= 0) {
			this.spawnEnemy();
			var time = (this.score < 1000) ? 5 : (this.score < 2000) ? 4 : (this.score < 3000) ? 3 : 2;
			this.enemyTimer.set(time);
		}
		if(this.player.health <= 0) {
			this.state = this.GAMEOVER;
			var ents = ig.game.entities;
			var len = ents.length;
			for(var i=0; i<len; i++) {
				if(!(ents[i] instanceof Star) && !(ents[i] instanceof UI)) ents[i].kill();
			}
		}
	},

	gameoverState: function() {
		if(ig.input.state('fire')) {
			this.state = this.PLAY;
			this.score = 0;
			this.player = this.spawnEntity(Player, ig.system.width/2, ig.system.height - 150);
			this.ui.player = this.player;
		}
	},

	spawnPowerUp: function(x, y) {
		var spawn = Math.floor((Math.random()) * this.powerups.length);
		this.spawnEntity(this.powerups[spawn], x, y);
	},

	spawnEnemy: function() {
		var spawn = Math.floor((Math.random() * 2));
		if(spawn == 0) {
			if(this.spawnShooter() == false) spawn = 1;
		}
		if(spawn == 1) {
			this.spawnBomber();
		}
	},

	// Variables for Shooters
	AREA: [{left: 50, center: 150, right: 250, used: false}, {left: 300, center: 400, right: 500, used: false}, {left: 550, center: 650, right: 750, used: false}],

	spawnShooter: function() {
		// Shuffle Array, get an area not being used, return false if all areas are used
		this.AREA = this.shuffleArray(this.AREA);
		for(var i=0; i<this.AREA.length; i++) {
			if(this.AREA[i].used == false) {
				this.spawnEntity(Shooter, this.AREA[i].center, -90, {area: this.AREA[i]});
				this.AREA[i].used = true;
				return true;
			}
		}
		return false;
	},

	returnShooter: function(area) {
		for(var i=0; i<this.AREA.length; i++) {
			if(this.AREA[i].left == area.left && this.AREA[i].right == area.right) {
				this.AREA[i].used = false;
			}
		}
	},

	spawnBomber: function() {
		var side = Math.floor((Math.random() * 2));
		var yOffset = Math.floor(Math.random() * -1) * Math.floor((Math.random() * 50) + 1);
		this.spawnEntity(Bomber, 0, 100 + yOffset, {side: side});
		this.spawnEntity(Bomber, 0, 300 + yOffset, {side: side});
		this.spawnEntity(Bomber, 0, 500 + yOffset, {side: side});
	},
	
	shuffleArray: function(a) {
		var i = a.length, t, j;
		a = a.slice();
		while(--i) t = a[i], a[i] = a[j = ~~(Math.random() * (i+1))], a[j] = t;
		return a;
	},

	draw: function() {
		this.parent();
		switch (this.state) {
			case this.MENU:
				xPos = (ig.system.width/2);
				yPos = (ig.system.height/2);
				this.font.draw('Press SPACE to start!', xPos, yPos, ig.Font.ALIGN.CENTER);
				break;
			case this.PLAY:
				this.ui.draw();
				break;
			case this.GAMEOVER:
				xPos = (ig.system.width/2);
				yPos = (ig.system.height/2);
				this.font.draw('Final Score: ' + this.score + '\n Press SPACE to restart!', xPos, yPos, ig.Font.ALIGN.CENTER);
				break;
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 800, 600, 1 );

});
