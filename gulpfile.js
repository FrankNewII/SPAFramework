var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');

var config = {
    frameworkPath: 'common/**/*.js',
    applicationPath: 'application/**/*.js'
};

gulp.task('framework-js', function () {
    gulp.src('common/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('application-js', function () {
    gulp.src('application/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('watch', ['application-js', 'framework-js']);

gulp.task('default', ['webserver', 'watch']);
