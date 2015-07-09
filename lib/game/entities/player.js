ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function() { 

Player = ig.Entity.extend({
	animSheet: new ig.AnimationSheet('media/ships/playership.png', 96, 120),
	shieldImage: new ig.Image('media/powerups/shield.png'),
	maxVel: {x: 400, y: 500},
	size: {x: 46, y: 90},
	offset: {x: 25, y: 20},

	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.B,
	
	// Health & Immunity
	health: 3,
	maxHealth: 3,
	immune: false,
	immuneTimer: new ig.Timer(),
	alpha: 1,

	// Power Ups
	twinshot: false,
	tripleshot: false,
	shield: false,

	// Boost & Break (Not Implemented)
	boosting: false,
	breaking: false,

	// Shooting
	fireMissile: false,
	fireTimer: new ig.Timer(0.20),
	shoot: new ig.Sound('media/Laser_Small.*'),

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.addAnim('idle', 1, [2], true);
		this.addAnim('left', 0.5, [0, 1], true);
		this.addAnim('right', 0.5, [3, 4], true);
		this.currentAnim = this.anims.idle;
		this.shoot.volume = 0.25;
	},

	update: function() {
		this.parent();
		this.checkBounds();
		this.checkInputs();
		this.checkImmune();
	},

	draw: function() {
		if (this.shield == true) {
			this.shieldImage.draw(this.pos.x - 105, this.pos.y - 64);
		}
		this.parent();
	},

	checkBounds: function() {
		if (this.pos.x < ig.game.playable.left) {
			this.pos.x = ig.game.playable.left;
			this.accel.x = 0;
			this.vel.x = 0;
		}
		if (this.pos.x > ig.game.playable.right - this.size.x) {
			this.pos.x = ig.game.playable.right - this.size.x;
			this.accel.x = 0;
			this.vel.x = 0;
		}
		if (this.pos.y < ig.game.playable.up) {
			this.pos.y = ig.game.playable.up;
			this.accel.y = 0;
			this.vel.y = 0;
		}
		if (this.pos.y > ig.game.playable.down - 50 - this.size.y) {
			this.pos.y = ig.game.playable.down - 50 - this.size.y;
			this.accel.y = 0;
			this.vel.y = 0;
		}
	},

	checkInputs: function() {
		// Move Horizontal
		if(ig.input.state('left') && !ig.input.state('right')) {
			this.vel.x = -300;
			this.currentAnim = this.anims.left;
			this.currentAnim.alpha = this.alpha;
		}
        else if(ig.input.state('right') && !ig.input.state('left')) {
			this.vel.x = 300;
			this.currentAnim = this.anims.right;
			this.currentAnim.alpha = this.alpha;
		}
		else {
			this.vel.x = 0;
			this.currentAnim = this.anims.idle;
			this.currentAnim.alpha = this.alpha;
		}

		// Move Verticle
		if(ig.input.state('up') && !ig.input.state('down')) {
			this.vel.y = -300;
		}
		else if (!ig.input.state('up') && ig.input.state('down')) {
			this.vel.y = 300;
		}
		else {
			this.vel.y = 0;
		}

		// Fix Diagnols
		if(this.vel.x != 0 && this.vel.y !=0) {
			this.vel.x = this.vel.x * Math.cos(Math.PI / 4);
			this.vel.y = this.vel.y * Math.sin(Math.PI / 4);
		}

		// Fire
		if(ig.input.pressed('fire') || this.fireMissile == true) {
			this.fire();
		}
	},

	checkImmune: function() {
		if(this.immuneTimer.delta() >= 0 && this.immune == true) {
			this.immune = false;
			this.alpha = 1.0;
		}
	},

	check: function(other) {
		this.receiveDamage(1);

		if(other instanceof Bomber) other.kill();
	},

	receiveDamage: function(amount, from) {
		if (this.immune == true) {
			return;
		}
		if (this.shield == true) {
			this.shield = false;
			this.immune = true;
			this.immuneTimer.set(1);
			return;
		}
		this.twinshot = false;
		this.tripleshot = false;
		this.alpha = 0.5;
		this.immune = true;
		this.immuneTimer.set(3);
		this.parent(amount, from);
	},

	fire: function() {
		this.fireMissile = true;
		if (!(this.fireTimer.delta() >= 0)) return;
		if(this.tripleshot == true) {
			var settings = {vel: {x: 0, y: -600}, checkAgainst: ig.Entity.TYPE.B, damage: 1};
			ig.game.spawnEntity(Missile, this.pos.x-5, this.pos.y + 55, settings);
			ig.game.spawnEntity(Missile, this.pos.x + 15 , this.pos.y + 35, settings);
			ig.game.spawnEntity(Missile, this.pos.x+35, this.pos.y + 55, settings);
			this.fireTimer.reset();
		}
		else if (this.twinshot == true) {
			var settings = {vel: {x: 0, y: -600}, checkAgainst: ig.Entity.TYPE.B, damage: 1};
			ig.game.spawnEntity(Missile, this.pos.x-5, this.pos.y + 55, settings);
			ig.game.spawnEntity(Missile, this.pos.x+35, this.pos.y + 55, settings);
			this.fireTimer.reset();
		}
		else {
			var settings = {vel: {x: 0, y: -600}, checkAgainst: ig.Entity.TYPE.B, damage: 1};
			ig.game.spawnEntity(Missile, this.pos.x + 15 , this.pos.y + 35, settings);
			this.fireTimer.reset();
		}
		this.fireMissile = false;
		this.shoot.play();
	}

});
});