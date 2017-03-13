var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

var config = {
    styles: {
        name: 'styles',
        src: 'src/styles/**/*.sass',
        dest: 'dist/styles'
    },
    framework: {
        name: 'framework',
        src: [
            'src/scripts/common/functions/array.js',
            'src/scripts/common/xhr.js',
            'src/scripts/common/stores/templateStore.js',
            'src/scripts/common/stores/modelsStore.js',
            'src/scripts/common/services/DI.js',
            'src/scripts/common/stores/componentsStore.js',
            'src/scripts/common/events.js',
            'src/scripts/common/element.js'
        ],
        dest: 'dist/framework'
    },
    application: {
        models: {
            name: 'application.models',
            src: [
                'src/scripts/application/models/**/*.js'
            ],
            dest: 'dist/application'
        },
        components: {
            name: 'application.components',
            src: [
                'src/scripts/application/components/**/*.js'
            ],
            dest: 'dist/application'
        }
    },
    server: {
        root: '',
        name: 'server'
    }
};

// Styles
gulp.task(config.styles.name, function () {
    return gulp.src(config.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.styles.dest))
        .pipe(connect.reload());
});

// Application
gulp.task(config.application.models.name, function () {
    return gulp.src(config.application.models.src)
        .pipe(sourcemaps.init())
        .pipe(concat('application.models.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.application.models.dest))
        .pipe(connect.reload());
});

gulp.task(config.application.components.name, function () {
    return gulp.src(config.application.components.src)
        .pipe(sourcemaps.init())
        .pipe(concat('application.components.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.application.components.dest))
        .pipe(connect.reload());
});

//Framework
gulp.task(config.framework.name, function () {
    return gulp.src(config.framework.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.framework.dest))
        .pipe(connect.reload());
});

gulp.task(config.server.name, function () {
    connect.server({
        root: config.server.root,
        livereload: true
    });
});

// Default task
gulp.task('default', [
    config.styles.name,
    config.framework.name,
    config.application.models.name,
    config.application.components.name,
    config.server.name,
    'watch'
]);

// Watch
gulp.task('watch', function () {

    gulp.watch(config.styles.src, [config.styles.name]);

    // Watch .js files
    gulp.watch(config.framework.src, [config.framework.name]);

    // Watch application files
    gulp.watch(config.application.components.src, [config.application.components.name]);

    gulp.watch(config.application.models.src, [config.application.models.name]);

});