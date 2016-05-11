class DownloadService {

	static $inject = ['$http'];
	constructor(private $http: ng.IHttpService) {}

	downloadJoke() {
		return this.$http.get<IChuckJoke>('http://api.icndb.com/jokes/random')
		.then((result) => {
			if (result.data.type !== 'success')
				throw new Error('Cannot download');
			let data = result.data.value;
			return <IChuckJoke>{
				id: data.id,
				joke: data.joke,
				isNerdy: data.categories.indexOf('nerdy') !== -1,
			};
		});
	}
}
