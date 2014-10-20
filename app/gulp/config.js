var dest = "./public";
var src = './';

module.exports = {
    browserSync: {
        proxy: 'www.local.tada.io/',
        tunnel: 'welean3tada',
        files: [
            dest + "/**",
            // Exclude Map files
            "!" + dest + "/**.map",
            src + 'browser/phtml/**'
        ]
    },
    less: {
        src: src + "/browser/css/style.less",
        dest: dest + '/css'
    },
    css: {
        src: ['./bower_components/angular-ui/build/angular-ui.css', './bower_components/jquery-ui/themes/start/jquery-ui.min.css'],
        dest: dest + '/css'
    },
    assets: {
        src: src + "/browser/assets/**",
        dest: dest + "/assets"
    },
    markup: {
        src: src + "/htdocs/**",
        dest: dest
    },
    browserify: {
        // Enable source maps
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
                entries: src + '/browser/js/main.js',
                dest: dest + '/js',
                outputName: 'app.js',
                externals: ['angular', 'jquery', 'angular-ui', 'jquery-ui']
            }, {
                entries: src + '/browser/js/vendors.js',
                dest: dest + '/js',
                outputName: 'vendors.js'
            }

        ]
    }
};