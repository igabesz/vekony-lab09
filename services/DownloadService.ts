class DownloadService {
	static $inject = ['$http'];

	constructor(
		private $http: ng.IHttpService
	) {}

	downloadJoke() {
		return this.$http.get('http://api.icndb.com/jokes/random?exclude=[explicit]')
		.then((result: any) => {
			console.log('Result', result);
			if (result.data.type !== 'success') throw new Error('Request failed');
			let value = result.data.value;
			return {
				id: value.id,
				joke: value.joke,
				isNerdy: value.categories.indexOf('nerdy') !== -1,
			};
		});
	}
}
