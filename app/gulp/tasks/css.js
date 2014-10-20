var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var config =require('../config').css;
var concat = require('gulp-concat');
var less = require('gulp-less');

gulp.task('css', function () {
  return gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(concat('lib.css'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});