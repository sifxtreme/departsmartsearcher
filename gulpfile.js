// Include gulp
var gulp = require('gulp'); 
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var shell = require('gulp-shell');

gulp.task('clean', function () {  
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('copy-static-files', function() {
  gulp.src(['./app/**/*.html', '!./app/index.html', '**/*.gif', '**/*.jpg'], {base: './app'})
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('connect-dev', shell.task([
  'echo hello world',
  'NODE_ENV=DEV nodemon server.js'
]));

gulp.task('connect-live', shell.task([
  'echo hello world',
  'NODE_ENV=LIVE nodemon server.js'
]));

// Default Task
gulp.task('default', ['connect-dev']);
gulp.task('build', ['clean', 'copy-static-files', 'usemin']);
gulp.task('live', ['build', 'connect-live']);
