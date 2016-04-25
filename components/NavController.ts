// Best solition:
// https://stackoverflow.com/questions/34323480/in-angular-2-how-do-you-determine-the-active-route#35802283

interface INavScope extends ng.IScope {
	isActive: any;
	a: number;
}

class NavController {
	static $inject = ['$scope', '$rootRouter'];
	constructor(
		private $scope: INavScope,
		router: any
	) {
		$scope.isActive = (instruction: any[]) => {
			return router.isRouteActive(router.generate(instruction));
		};
	}
}
