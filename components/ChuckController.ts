interface IChuckScope extends ng.IScope {
	// Callbacks for directives
	addFile: (files: any, type: 'background' | 'foreground') => void;
	setCanvas: (ctx: HTMLCanvasElement) => void;
	downloadHref: string;
	// Image urls for thumbnails
	backgroundSrc: string;
	foregroundSrc: string;
	// Foreground props
	offsetX: number;
	offsetY: number;
	scale: number;
}


// This directive notifies the controller about a file upload
function ChuckFileBindDirective(): ng.IDirective {
	return (scope: IChuckScope, elm: ng.IAugmentedJQuery, attrs) => {
		let type: 'background' | 'foreground' = attrs.chuckType;
		elm.bind('change', (event: any) => {
			// No files
			if (!event.target.files || !event.target.files.length) return;
			// Getting into the sight of Angular
			scope.$apply(() => {
				// Type should be checked
				scope.addFile(event.target.files[0], type);
			});
		});
	};
}

// This directive sends the canvas to the controller
function ChuckCanvasDirective(): ng.IDirective {
	return (scope: IChuckScope, element, attrs) => {
		scope.setCanvas(element[0]);
	};
}


class ChuckController {
	// Dependency injection
	static $inject = ['$scope'];

	// Canvas and its context
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	// Images for canvas display
	private bgImage = new Image();
	private frontImage = new Image();

	// Initializing $scope in ctor
	constructor(private $scope: IChuckScope) {
		$scope.addFile = (files, type) => this.addFile(files, type);
		$scope.setCanvas = (canvas: HTMLCanvasElement) => {
			this.canvas = canvas;
			this.ctx = canvas.getContext('2d');
		};
		$scope.downloadHref = '';
		$scope.offsetX = 0;
		$scope.offsetY = 0;
		$scope.scale = 1;
	}

	// From directives:
	private addFile(file: File, type: 'background' | 'foreground') {
		// Getting blob URL
		console.log('Add file', file, type);
		let url = URL.createObjectURL(file);
		if (type === 'background') {
			this.bgImage.src = url; // Canvas
			this.$scope.backgroundSrc = url; // Thumbnail
		}
		else if (type === 'foreground') {
			this.frontImage.src = url; // Canvas
			this.$scope.foregroundSrc = url; // Thumbnail
		}
		// Warning: We don't wait for the images to be loaded
	}

	// Hopefully all images are loaded when the user clicks this button
	draw() {
		// drawing background
		this.ctx.drawImage(this.bgImage, 0, 0, this.canvas.width, this.canvas.height);
		// Drawing foreground
		let width = this.frontImage.width * this.$scope.scale;
		let height = this.frontImage.height * this.$scope.scale;
		this.ctx.drawImage(this.frontImage, this.$scope.offsetX, this.$scope.offsetY, width, height);
		this.$scope.downloadHref = this.canvas.toDataURL('image/png');
	}

}
