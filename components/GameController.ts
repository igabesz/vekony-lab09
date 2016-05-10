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
	}

	private draw(time: number) {
		let dt = time - this.time;
		this.time = time;
		let spd = dt / config.dt;
		// Moving player
		this.player.x += this.player.vx * spd;
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
