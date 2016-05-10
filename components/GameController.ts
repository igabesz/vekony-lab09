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
		// draw
		requestAnimationFrame((time: number) => this.draw(time));
	}

	private draw(time: number) {
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
