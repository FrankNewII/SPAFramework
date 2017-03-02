var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');

gulp.task('default', ['framework-js', 'application-js']);

gulp.task('framework-js', function () {
  gulp.src('common/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('framework-dist/'));
});

gulp.task('application-js', function () {
  gulp.src('application/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('application-dist/js'));
});