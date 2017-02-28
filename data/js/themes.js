var path = require('path');
var app = require('electron').remote.app;

define(function(req, exports, module) {

    const themesPath = path.join(app.getPath('appData'), 'TagSpaces' + path.sep + 'themes');

    // create path if it does not exist
    fs.mkdir(themesPath, function(err) {
        console.log('Themes: Path exists', themesPath);
    });


    /**
     * Lists all themes by their Filename and Name.
     * The argument passed to the callback is an object like the following one:
     *
     * {
     *      'test.css': 'test'
     * }
     *
     * @param callback
     */
    function listThemes(callback) {
        fs.readdir(themesPath, function(err, files) {
            if (err) { throw err; }
            var themes = {};
            for (var i = 0; i < files.length; i++) {
                themes[files[i]] = files[i].split('.')[0];
            }

            callback(themes);
        })
    }

    /**
     * Loads the given path as a theme
     *
     * @example
     * loadTheme('test.css')
     *
     * @param theme
     */
    function loadTheme(theme) {
        // delete old theme link tag
        $('link[data-theme]').remove();

        if (!theme) { return }
        // add new theme link tag
        $('<link rel="stylesheet" type="text/css" data-theme>')
            .attr('href', path.join(themesPath, theme))
            .appendTo($('head'));
    }

    exports.listThemes = listThemes;
    exports.loadTheme = loadTheme;
});