var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var mold = require('mold-source-map');

/************
* WATCHIFY
* ***********/
gulp.task('watch', function() {
    console.log(watchify.args);
    //var bundler = watchify(browserify('./browser/js/main.js', watchify.args));
    var bundler = watchify(browserify('./browser/js/main.js',
        {
            cache: {},
            packageCache: {},
            fullPaths: true,
            debug: true
        }));
    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
        .pipe(mold.transformSourcesRelativeTo('./'))
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js-angular'))
        .pipe(livereload());
    }

  return rebundle();
});

/************
* PHTML
* ***********/
gulp.task('phtml', function() {

    var server = livereload();

    gulp.watch('browser/**/*.phtml').on('change', function(file) {
        server.changed(file.path);
        console.log('PHP file changed' + ' (' + file.path + ')');
    });
});


/************
* LESS
* ***********/
gulp.task('less', function() {

    function rebundle() {
        gulp.src('browser/css/style.less')
        .pipe(less())
        .pipe(gulp.dest('public/css/angular'))
        .pipe(livereload());
    }

    gulp.watch('browser/**/*.less').on('change', rebundle);

    return rebundle();

})

gulp.task('default', ['watch', 'phtml', 'less']);