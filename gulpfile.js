var gulp = require('gulp');
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var gutil = require("gulp-util");
var del = require("del");
var babel = require('gulp-babel');
var watch = require("gulp-watch");
var runSequence = require('run-sequence').use(gulp);
var connect = require('gulp-connect');

var pug_path = ['src/pug/*.pug','src/pug/**/*.pug'];
var sass_path = ['src/scss/app.scss','src/scss/**/*.scss'];
var js_path = ['src/js/main.js'];

gulp.task('pug',function(){
    return  gulp.src('src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .on("error", gutil.log)
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});

gulp.task('sass', function() {
    return gulp.src(sass_path)
        .pipe(plumber())
        .pipe(sass())
        .on("error", gutil.log)
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(connect.reload())
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('watch',['pug','sass'], function(){
    gulp.watch(sass_path,['sass']);
    gulp.watch(pug_path,['pug']);
    gulp.watch(js_path,['js']);

});

gulp.task('fonts', function(){
    return gulp.src(['src/assets/fonts/*'])
        .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('js', function() {
    return gulp.src(js_path)
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist/',
        livereload: true
    });
});

gulp.task('default', function(){
    runSequence('clean','fonts','js', ['pug', 'sass'],['connect', "watch"])
});
