// plugins
const gulp = require('gulp');
const sass = require('gulp-sass');

const paths = {
	'scss': './src/sass/',
	'css': './docs/css/'
}

// sass options
const sassOptions = {
	outputStyle: 'expanded'
}

// //pug options
// var pugOptions = {
//   pretty: true
// }

// scss tasks
gulp.task('scss', function() {
	return gulp.src(paths.scss + '**/*.scss')
		.pipe(sass(sassOptions))
		.pipe(gulp.dest(paths.css + '**/*.css'));
});

// watch
gulp.task('watch', function() {
	gulp.watch(paths.scss + '**/*.scss', gulp.task('scss'));
});

gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch'), function(){
	// task here
}));
