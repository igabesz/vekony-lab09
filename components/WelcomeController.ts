interface IWelcomeScope extends ng.IScope {
	storageInit: boolean;
	err: string;
}

class WelcomeController {
	static $inject = ['$scope', 'storageService'];
	constructor(
		private $scope: IWelcomeScope,
		private storageService: StorageService
	) {
		$scope.storageInit = false;
		$scope.err = '';
		storageService.listenInit()
		.then(() => {
			console.log('success');
			$scope.storageInit = true;
		})
		.catch(err => $scope.err = err.message || err.toString());
	}
}
