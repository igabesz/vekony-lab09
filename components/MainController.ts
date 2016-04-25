interface IMainScope extends ng.IScope {
	storageInit: boolean;
	err: string;
}

class MainController {
	static $inject = ['$scope', 'storageService'];
	constructor(
		private $scope: IMainScope,
		private storageService: StorageService
	) {
		$scope.storageInit = false;
		$scope.err = '';
		storageService.initialize();
	}
}
