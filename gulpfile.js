var elixir = require('laravel-elixir');
var gulp = require('gulp');
var fs = require('fs');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */



gulp.task('starter', function(cb){
    fs.writeFile('resources/assets/js/start_foundation.js', '$(document).foundation();', cb);
});

elixir(function(mix) {
    mix.copy('node_modules/foundation-sites/scss/settings/_settings.scss', 'resources/assets/sass/_settings.scss');
    mix.task('starter');

    // Sass
    var options = {
        includePaths: [
            'node_modules/foundation-sites/scss',
            'node_modules/motion-ui/src'
        ]
    };

    mix.sass('app.scss', null, options);

    // Javascript
    var jQuery = '../../../node_modules/jquery/dist/jquery.js';
    var foundationJsFolder = '../../../node_modules/foundation-sites/js/';

    mix.scripts([
        jQuery,
        foundationJsFolder + 'foundation.core.js',
        // Include any needed components here. The following are just examples.
        foundationJsFolder + 'foundation.util.mediaquery.js',
        foundationJsFolder + 'foundation.util.keyboard.js',
        foundationJsFolder + 'foundation.util.timerAndImageLoader.js',
        foundationJsFolder + 'foundation.tabs.js',
        // This file initializes foundation
        'start_foundation.js'
    ]);

    mix.version(["css/app.css", "js/all.js"]);

    mix.browserSync({
        proxy: 'bookmarks.app'
    });

});
