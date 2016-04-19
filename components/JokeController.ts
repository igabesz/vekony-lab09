
interface JokeScope extends ng.IScope {
	jokes: IChuckJoke[];
	isNerdy: boolean;
	err: string;
}

class JokeController {
	static $inject = ['$scope', 'storageService', 'downloadService'];

	constructor(
		private $scope: JokeScope,
		private storageService: StorageService,
		private downloadService: DownloadService
	) {
		console.log('MainController created');
		$scope.jokes = [];
		$scope.isNerdy = false;
		$scope.err = '';
		storageService.listenInit()
		.then(() => this.refresh());
	}

	getAJoke() {
		// Start doenload then add to service then refresh
	}

	recommendJoke(joke: IChuckJoke) {
		// TODO
		console.log('it\'s good for you');
	}

	clearAll() {
		// TODO: Clear all then refresh
	}

	refresh() {
		// TODO: getAll
		// then put them to $scope
		// Then catch errors
	}
}
