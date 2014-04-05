var gulp       = require('gulp');
var gutil      = require('gulp-util');
var watch      = require('gulp-watch');
var browserify = require('browserify');
var es6ify     = require('es6ify');
var fs         = require('fs');
var source     = require('vinyl-source-stream');

es6ify.traceurOverrides = {
	arrowFunctions: true,
	destructuring: true,
	classes: true,
	defaultParameters: true
};

gulp.task('scripts', function() {
	browserify()
	.add(es6ify.runtime)
	.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
	.require(require.resolve('./main.js'), { entry : true })
	.bundle({ debug: false })
	.on('error', function (err) {
		console.error(err);
	})
	.pipe(source('build.js'))
	.pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
	gulp.watch([
		'**/*.js',
		'!build/**/*.js',
		'!node_modules/**/*.js'
	], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
