
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
        this.downloadService.downloadJoke()
        .then(joke => {
            console.log('Got joke');
            return this.storageService.add(joke);
        })
        .then(() => this.refresh());
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
        this.storageService.getAll()
		// then put them to $scope
        .then(jokes => this.$scope.jokes = jokes)
		// Then catch errors
        .catch(err => this.$scope.err = err);
	}
}
