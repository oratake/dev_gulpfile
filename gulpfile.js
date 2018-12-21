// plugins
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const plumber      = require('gulp-plumber');
const notify       = require('gulp-notify');
const browserSync  = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
	'scss': './src/sass/',
	'css' : './docs/css/',
	'html': './docs/',
	'js'  : './docs/scripts/'
}

// sass options
const sassOptions = {
	outputStyle: 'expanded'
}

// browserSync load
const reload = (done) => {
	browserSync.reload();
	done();
};


// scss tasks
gulp.task('scss', function() {
	return gulp.src(paths.scss + '**/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sass(sassOptions))
		.on('error', sass.logError)
		.pipe(gulp.dest(paths.css));
});


//Browser Sync
gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: paths.html
		}
	});
	gulp.watch(paths.js + '**/*.js', reload);
	gulp.watch(paths.html + '**/*.html', reload);
	gulp.watch(paths.css + '**/*.css', reload);
});
// gulp.task('reload', () => {
// 	browserSync.reload();
// });

// watch
gulp.task('watch', function() {
	gulp.watch(paths.scss + '**/*.scss', gulp.task('scss'));
});

gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch'), function(){
	// task here
}));
