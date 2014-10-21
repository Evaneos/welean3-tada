var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var config =require('../config').vendors;
var concat = require('gulp-concat');
var vendors = require('../../' + config.src);
gulp.task('vendors', function () {
  return gulp.src(vendors)
    .on('error', handleErrors)
    .pipe(concat('vendors.js'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});