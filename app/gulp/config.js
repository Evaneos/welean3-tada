var dest = "./public";
var src = './browser';

module.exports = {
    browserSync: {
        proxy: 'www.local.tada.io/',
        //tunnel: 'welean3tada',
        files: [
            dest + "/**",
            // Exclude Map files
            "!" + dest + "/**.map",
            src + '/phtml/**'
        ]
    },
    less: {
        src: src + "/css/style.less",
        dest: dest + '/css'
    },
    css: {
        src: ['./bower_components/angular-ui/build/angular-ui.css', './bower_components/jquery-ui/themes/start/jquery-ui.min.css'],
        dest: dest + '/css'
    },
    assets: {
        src: src + "/assets/**",
        dest: dest + "/assets"
    },
    browserify: {
        // Enable source maps
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/js/main.js',
            dest: dest + '/js',
            outputName: 'app.js',
            externals: ['jquery', 'jquery-ui', 'angular', 'angular-ui', 'restangular']
        }]
    },
    clean: {
        src: [dest + '/js/*', dest + '/css/*']
    },
    vendors: {
        src: src + '/js/vendors',
        dest: dest + "/js",
    }
};