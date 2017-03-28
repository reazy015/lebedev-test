
var gulp = require('gulp');



var less = require('gulp-less');
var svgless = require('gulp-svg-less');
var svgmin = require('gulp-svgmin');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;


gulp.task('less', function() {
	return gulp.src('less/*.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css'))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('css'))
		.pipe(reload({stream: true}));
});

gulp.task('create-svgsprite', function(){
	return gulp.src('img/*/*.svg')
		 .pipe(svgmin())
		 .pipe(svgless({
			 fileName: 'imgs',
			 mixinPrefix: 'img-',
			 addSize: false
		 }))
		 .pipe(gulp.dest('svg/'));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: './'
		},
		port: 8000,
		open: true,
		notify: false
	});
});




// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('less/*/*.less', ['less']);
});

// Default Task
gulp.task('default', ['less', 'watch', 'browser-sync', 'create-svgsprite']);
