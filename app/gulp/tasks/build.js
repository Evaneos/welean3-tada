var gulp = require('gulp');

gulp.task('build', ['browserify', 'assets', 'less', 'css', 'vendors']);
