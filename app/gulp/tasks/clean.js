var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var config      = require('../config').clean;

gulp.task('clean', function() {
    return gulp.src(config.src, {read: false}).
    pipe(rimraf());
})