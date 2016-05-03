let appModule = angular.module('app', ['ngComponentRouter'])
.value('$routerRootComponent', 'mainComponent');

// Registering services
appModule
.service('downloadService', DownloadService)
.service('storageService', StorageService)
.service('recommendService', RecommendService);

// Directives
appModule
.directive('chuckFileBind', ChuckFileBindDirective)
.directive('chuckCanvas', ChuckCanvasDirective)
.directive('chuckDrop', ChuckDropDirective);

// Registering components
appModule
.component('mainComponent', <any>{
	template: `<ng-outlet></ng-outlet>`,
	controller: MainController,
	$routeConfig: [
		{path: '/welcome', name: 'Welcome', component: 'welcomeComponent', useAsDefault: true},
		{path: '/jokes', name: 'Jokes', component: 'jokeComponent'},
		{path: '/chuck', name: 'Chuck', component: 'chuckComponent'},
	],
})
.component('navComponent', {
	templateUrl: 'components/NavComponent.html',
	controller: NavController,
})
.component('welcomeComponent', {
	template: `<h3>Service initialization
		<span class="label label-info" ng-show="!storageInit">Pending...</span>
		<span class="label label-success" ng-show="storageInit && !err">Done</span>
		<span class="label label-danger" ng-show="storageInit && err">Error</span>
	</h3>
	<span class="text-danger">{{err}}</span>`,
	controller: WelcomeController,
})
.component('jokeComponent', {
	templateUrl: 'components/JokeComponent.html',
	controller: JokeController,
})
.component('chuckComponent', {
	templateUrl: 'components/ChuckComponent.html',
	controller: ChuckController,
})
.component('recommendComponent', {
	templateUrl: 'components/recommendComponent.html',
	controller: RecommendController,
});
