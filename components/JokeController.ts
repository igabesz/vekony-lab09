

interface JokeScope extends ng.IScope {
	jokes: IChuckJoke[];
	isNerdy: boolean;
	err: string;
}

class JokeController {
	static $inject = ['$scope', 'storageService', 'downloadService', 'recommendService'];

	constructor(
		private $scope: JokeScope,
		private storageService: StorageService,
		private downloadService: DownloadService,
		private recommendService: RecommendService
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
		.then((joke) => this.storageService.add(joke))
		.then(() => this.refresh());
	}

	recommendJoke(joke: IChuckJoke) {
		this.recommendService.sendMsg({
			name: 'bela',
			id: joke.id,
			joke: joke.joke,
		});
	}

	clearAll() {
		this.storageService.clear()
		.then(() => this.refresh());
	}

	refresh() {
		this.storageService.getAll()
		.then(jokes => this.$scope.jokes = jokes)
		.catch(err => {
			console.warn(err);
			this.$scope.err = (err.target && err.target.error) || JSON.stringify(err);
		});
	}
}
