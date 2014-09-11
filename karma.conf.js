// Karma configuration
// Generated on Tue Aug 26 2014 09:42:12 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './app/bower_components/jquery/dist/jquery.js',
        './app/bower_components/jquery-ui/jquery-ui.js',
        './app/bower_components/angular/angular.js',
        './app/bower_components/angular-route/angular-route.js',
        './app/bower_components/angular-ui-date/src/date.js',
        './app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './lib/angular-mocks.js',
        './app/**/*Spec.js',
        './app/services/apr-library.js',
        './app/services/psf-library.js',
        './app/app.js',
        './app/routes.js',
        './app/services/getAirports.js',
        './app/services/getSearchResults.js',
        './app/controllers/home.js',
        './app/controllers/search.js'
    ],


    // list of files to exclude
    exclude: [
        './app/app-backup.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
