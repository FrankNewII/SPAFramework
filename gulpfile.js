var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var config = {
    styles: {
        name: 'styles',
        src: 'src/styles/**/*.sass',
        dest: 'dist/styles'
    },
    framework: {
        name: 'framework',
        src: [
            'src/scripts/common/xhr.js',
            'src/scripts/common/stores/componentsStore.js',
            'src/scripts/common/stores/modelsStore.js',
            'src/scripts/common/stores/templateStore.js',
            'src/scripts/common/functions.js',
            'src/scripts/common/events.js',
            'src/scripts/common/element.js'
        ],
        dest: 'dist/framework'
    },
    application: {
        name: 'application',
        src: [
            'src/scripts/application/models/flickr.js',
            'src/scripts/application/components/FlickrResultsComponent.js',
            'src/scripts/application/components/MainComponent.js',
            'src/scripts/application/components/SearchComponent.js'
        ],
        dest: 'dist/application'
    }
};

// Styles
gulp.task(config.styles.name, function () {
    return gulp.src(config.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.styles.dest))
        .pipe(notify({message: 'Styles task complete'}));
});

// Application
gulp.task(config.application.name, function () {
    return gulp.src(config.application.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.application.dest))
        .pipe(notify({message: 'Application task complete'}));
});

//Framework
gulp.task(config.framework.name, function () {
    return gulp.src(config.framework.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.framework.dest))
        .pipe(notify({message: 'Framework task complete'}));
});

// Clean
gulp.task('clean', function () {
    return gulp.src([config.framework.dest, config.application.dest, config.styles.dest], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['clean', config.styles.name, config.framework.name, config.application.name]);

// Watch
gulp.task('watch', function () {

    server.listen(8080, function (err) {
        if (err) {
            return console.log(err)
        }
        ;

        // Watch .scss files
        gulp.watch(config.styles.src, [config.styles.name]);

        // Watch .js files
        gulp.watch(config.framework.src, [config.framework.name]);

        // Watch image files
        gulp.watch(config.application.src, [config.application.name]);

    });

});