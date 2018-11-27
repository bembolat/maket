var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source');
    plumber = require('gulp-plumber');
    server = require('browser-sync').create();



//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});



//CONVERTE INKY
gulp.task('inky', ['styles'], function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(server.stream());
});

gulp.task('serve', ['styles'],function() {
  server.init({
    server: 'dist',
    index: "basic.html",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });


 gulp.watch(['./scss/**/*.scss', './templates/**/*.html'],['inky']).on("change", server.reload);
})

gulp.task('default',function() {
    gulp.watch(['./scss/**/*.scss', './templates/**/*.html'],['inky']).on("change", server.reload);
});
