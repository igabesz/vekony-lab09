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

	initialize(canvas: HTMLCanvasElement) {
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
