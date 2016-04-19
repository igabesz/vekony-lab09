interface IMainScope extends ng.IScope {
}

class MainController {
	static $inject = ['$scope', 'storageService'];
	constructor(
		private $scope: IMainScope,
		private storageService: StorageService
	) {
		storageService.initialize();
	}
}
