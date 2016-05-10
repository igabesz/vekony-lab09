let config = {
	dt: 33,
	map: {
		x: 800, y: 600,
		sprite: 'media/grass1.png',
	},
	player: {
		sprite: 'media/chuck-player.png',
		x: 96, y: 96,
		vx: 20,
	},
	bullet: {
		sprite: 'media/bullet.png',
		vy: -40,
	},
	enemy: {
		sprite: 'media/soldier2.png',
		width: 40, height: 80,
		vy: 5,
		create: 0.05,
	},
};

class GameLogic {
	private renderer: PIXI.CanvasRenderer;
	private stage: PIXI.Container;
	private player: PIXI.Sprite & {vx?: number};
	private bullets: (PIXI.Sprite & {vy?: number})[] = [];
	private enemies: (PIXI.Sprite & {vy?: number})[] = [];
	private time = 0;

	initialize(canvas: HTMLCanvasElement) {
		this.renderer = new PIXI.CanvasRenderer(800, 600, {view: canvas});
		let images = [config.map.sprite, config.player.sprite, config.enemy.sprite, config.bullet.sprite];
		PIXI.loader.add(images).load(() => this.loaded());
	}

	private loaded() {
		let resources = PIXI.loader.resources;
		// Background
		this.stage = new PIXI.Container();
		this.stage.addChild(new PIXI.Sprite(resources[config.map.sprite].texture));
		// Player
		this.player = new PIXI.Sprite(resources[config.player.sprite].texture);
		this.player.anchor = new PIXI.Point(0.5, 0.5);
		this.player.position.set(400, 550);
		this.player.width = 96;
		this.player.height = 96;
		this.stage.addChild(this.player);
		this.player.vx = 0;
		// Other setup
		this.setupKeyboardListeners();
		// draw
		requestAnimationFrame((time: number) => this.draw(time));
	}

	private setupKeyboardListeners() {
		let left = keyboard(37);
		let up = keyboard(38);
		let right = keyboard(39);
		let down = keyboard(40);
		let space = keyboard(32);
		left.press = () => this.player.vx = -config.player.vx;
		left.release = () => (this.player.vx < 0) && (this.player.vx = 0);
		right.press = () => this.player.vx = config.player.vx;
		right.release = () => (this.player.vx > 0) && (this.player.vx = 0);
		space.press = () => this.fire();
	}

	private fire() {
		let bullet = new PIXI.Sprite(PIXI.loader.resources[config.bullet.sprite].texture);
		bullet.anchor.set(0.5, 0.5);
		bullet.position.set(this.player.x, this.player.y - 20);
		(<any>bullet).vy = config.bullet.vy;
		this.bullets.push(bullet);
		this.stage.addChild(bullet);
	}
	private removeBullet(b: PIXI.Sprite) {
		b.destroy();
		this.stage.removeChild(b);
		_.remove(this.bullets, b);
	}

	private createEnemy() {
	let enemy = new PIXI.Sprite(PIXI.loader.resources[config.enemy.sprite].texture);
		enemy.anchor.set(0.5, 0.5);
		enemy.position.set(_.random(config.map.x - 40) + 20, -20);
		enemy.width = config.enemy.width;
		enemy.height = config.enemy.height;
		(<any>enemy).vy = config.enemy.vy;
		this.enemies.push(enemy);
		this.stage.addChild(enemy);
	}

	private removeEnemy(e: PIXI.Sprite) {
		e.destroy();
		this.stage.removeChild(e);
		_.remove(this.enemies, e);
	}

	private draw(time: number) {
		let dt = time - this.time;
		this.time = time;
		let spd = dt / config.dt;
		// Moving player
		this.player.x += this.player.vx * spd;
		// Moving bullets
		let bullets = _.clone(this.bullets);
		for (let b of bullets) {
			b.y += b.vy * spd;
			if (b.y < -40) this.removeBullet(b);
		}
		// Creating enemy
		let isCreated = _.random(1, true) < config.enemy.create * spd;
		isCreated && this.createEnemy();
		// Moving enemy
		let enemies = _.clone(this.enemies);
		for (let e of enemies) {
			e.y += e.vy * spd;
			if (e.y > config.map.y + 20) { this.removeEnemy(e); continue; }
			bullets = _.clone(this.bullets);
			for (let b of bullets) {
				if (hitCenterRect(e, b, 0.8)) {
					this.removeEnemy(e);
					this.removeBullet(b);
					break;
				}
			}
		}
		// Drawing
		this.renderer.render(this.stage);
		requestAnimationFrame((time2) => this.draw(time2));
	}
}


interface GameScope extends ng.IScope {}

class GameController {
	static $inject = ['$scope'];
	private logic = new GameLogic();

	constructor(private $scope: GameScope) {
		let canvas = <HTMLCanvasElement>$('#chuck-game-canvas')[0];
		this.logic.initialize(canvas);
	}
}
