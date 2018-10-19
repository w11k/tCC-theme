'use strict';
const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');
const util = require('gulp-util');
const del = require('del');

const onError = err => {
    util.log(util.colors.red.bold('[ERROR LESS]:'), util.colors.bgRed(err.message));
    this.emit('end');
};

gulp.task('clean', () => {
    util.log(util.colors.green('Delete old less ...'));
    del(['./style.css']);
});

// TODO: dev and dist build

// Compile less
gulp.task('less', () => {
    util.log(util.colors.green('Compile less ...'));
    return gulp.src(['./dev/style.less']) // Error in: './dev/reset.less'
        .pipe(less())
        .on('error', onError)
        .pipe(minifyCSS({}))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['less'], () => {
    gulp.watch('./dev/**/*.less', ['less']);
});

// Define tasks
gulp.task('default', ['clean', 'less', 'watch'], () => {
    return util.log(util.colors.bgGreen(util.colors.gray(util.colors.bold(' Gulp is watching you ... '))));
});