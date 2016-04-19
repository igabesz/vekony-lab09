interface IChuckJoke {
	id: number;
	joke: string;
	isNerdy: boolean;
}


class StorageService {
	private static DB_NAME = 'SubjectDatabase';
	private static DB_VERSION = 1;
	private static SUBJECTS = 'subjects';

	private db: IDBDatabase = null;
	private initResult = null;
	private initResolves: Function[] = [];
	private initRejects: Function[] = [];

	static $inject = ['$timeout', '$q'];

	constructor(
		private $timeout: ng.ITimeoutService,
		private $q: ng.IQService
	) {}

	initialize() {
		console.log('StorageService.initialize');
		// Opening database
		let request = indexedDB.open(StorageService.DB_NAME, StorageService.DB_VERSION);
		// Error handler
		request.onerror = (event) => {
			console.log('error', event);
			this.initResult = false;
			this.initRejects.forEach(r => r());
		};
		// Success handler
		request.onsuccess = (event: any) => {
			console.log('success', event);
			this.db = event.target.result;
			this.initResult = true;
			this.initResolves.forEach(r => r());
		};
		// Upgrade handler
		request.onupgradeneeded = (event) => this.onUpgrade(event);
		return this.listenInit();
	}

	listenInit() {
		if (this.initResult !== null) return this.db ? this.$q.resolve() : this.$q.reject();
		return this.$q<void>((resolve, reject) => {
			this.initRejects.push(reject);
			this.initResolves.push(resolve);
		});
	}

	private onUpgrade(upgradeEvent) {
		console.log('StorageService.onUpgrade');
		var db: IDBDatabase = upgradeEvent.target.result;
		// Here we create the database
		var store: IDBObjectStore = db.createObjectStore(StorageService.SUBJECTS, { keyPath: 'id' });
		// Adding further index fields
		store.createIndex('isNerdy', 'isNerdy', { unique: false });
	}

	private getObjectStore(mode: 'readonly' | 'readwrite' = 'readonly') {
		if (!this.db) throw new Error('StorageService is not initialized!');
		// Create a transaction and return SUBJECTS_TABLE
	}

	clear() {
		console.log('StorageService.clear');
		// Get store
		// Clear store
		// Returning promise
	}

	add(subject: IChuckJoke) {
		console.log('StorageService.upload');
		// Get store
		// Add item
		// Return promise
	}

	getAll() {
		console.log('StorageService.getAll');
		let results: IChuckJoke[] = [];
		// Get store
		// Get cursor
		// Return promise
	}

	getAllNerdy() {
		console.log('StorageService.getAllNerdy');
		// Tip: use the store.index() and set a KeyRange with IDBKeyRange.<???>
	}

}
