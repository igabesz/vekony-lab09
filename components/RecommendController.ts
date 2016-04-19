interface RecommendScope extends ng.IScope {
	recommendations: IRecommendMessage[];
}


class RecommendController {
	static $inject = ['$scope', 'recommendService'];

	constructor(
		private $scope: RecommendScope,
		private recommendService: RecommendService
	) {
		$scope.recommendations = [];
		recommendService.register(this.msgReceived);
		$scope.$on('$destroy', () => {
			recommendService.unRegister(this.msgReceived);
		});
	}

	private msgReceived = (msg: IRecommendMessage) => {
		this.$scope.recommendations.unshift(msg);
	};
}
