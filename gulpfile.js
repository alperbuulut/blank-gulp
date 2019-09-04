var gulp = require('gulp');

// Libraries
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence  = require('run-sequence');
var concat = require('gulp-concat-css');
var minCss = require('gulp-minify-css');
var rename = require('gulp-rename');

// Directories
var folders = {
    css : "assets/css/",
    scss : "assets/css/scss/",
    js : "assets/js/"
};

// Scss Files To CSS File
gulp.task('styles', function() {
    gulp.src([
        folders['scss'] + 'style.scss',
         ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.min.css', { rebaseUrls: false }))
        .pipe(minCss())
        .pipe(gulp.dest(folders['css']))
        .pipe(browserSync.reload({
          stream: true
        }));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watchers
gulp.task('watch', function() {
  gulp.watch([
      folders['scss'] + '*.scss',
      folders['scss'] + '*/*.scss',
      folders['scss'] + '*/*/*.scss',
  ], ['styles']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch(folders['js'] + '*.js', browserSync.reload);
  gulp.watch(folders['js'] + '*/' + '*.js', browserSync.reload);
});

//Watch task
gulp.task('default',function(callback) {
    runSequence(['styles', 'browser-sync'], 'watch',
        callback
    )
});
