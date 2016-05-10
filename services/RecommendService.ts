// We don't have module system -- so we miss intellisense now...
declare var io: any;

interface IRecommendMessage {
	name?: string;
	id: number;
	joke: string;
}


class RecommendService {
	private static URL = 'ws://localhost:8081';
	static $inject = ['$http', '$timeout'];

	private socket: any;
	private onMessageHandlers: ((msg: IRecommendMessage) => any)[] = [];

	constructor(
		private $http: ng.IHttpService,
		private $timeout: ng.ITimeoutService
	) {
		// this.socket = io(RecommendService.URL);
		// this.socket.on('recommend', (msg: IRecommendMessage) => $timeout(() => {
		// 	for (let handler of this.onMessageHandlers)
		// 		handler(msg);
		// }));
	}

	register(msgHandler: (msg: IRecommendMessage) => any) {
		this.onMessageHandlers.push(msgHandler);
	}

	unRegister(msgHandler: (msg: IRecommendMessage) => any) {
		this.onMessageHandlers.splice(this.onMessageHandlers.indexOf(msgHandler), 1);
	}

	sendMsg(msg: IRecommendMessage) {
		msg.name = msg.name || 'anonymus';
		console.log('Sending', this.socket, msg);
		this.socket.emit('recommend', msg);
	}
}
