var gulp = require('gulp');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

// The order is important! 'app.ts' must be in the end!
var targets = ['./components/**/*.ts', './services/**/*.ts', './typings/browser.d.ts', 'app.ts'];
var outFile = 'bundle.js';
var outFileMin = 'bundle.min.js';
var outDir = 'build';

var tsConfig = {
	target: 'es5',
};

gulp.task('build', () => {
	return gulp.src(targets)
		.pipe(sourcemaps.init()) // Source maps needs to be initialized
		.pipe(ts(tsConfig)) // TS compile
		.pipe(concat(outFile)) // Concatenation to a single file
		.pipe(sourcemaps.write()) // Adding source maps
		.pipe(gulp.dest(outDir)) // Saving
		.pipe(uglify()) // Now uglifying -- this removes the sourcemaps too
		.pipe(concat(outFileMin)) // Well, didn't wanna include the gulp-rename package, so... yes. Renaming.
		.pipe(gulp.dest(outDir)); // Saving minified version too
});

gulp.task('watch', ['build'], () => {
    gulp.watch(targets, ['build']);
});
