var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source'),
    plumber = require('gulp-plumber'),
    server = require('browser-sync').create();



//STYLES
gulp.task('styles', function () {
  return gulp.src('scss/styles.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});



//CONVERTE INKY
gulp.task('inky', function() {
  return gulp.src('templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(gulp.dest('dist'))
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
  server.init({
    server: 'dist',
    index: "basic.html",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });


 gulp.watch(['scss/**/*.scss', 'templates/**/*.html'], gulp.series("styles", "inky")).on("change", server.reload);
});
