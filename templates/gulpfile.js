'use strict';

var gulp = require('gulp'),
    config = {
        app: 'app',
        dist: 'dist',
        port: 9000,
        scripts: function () {
            return this.app + '/js/*.js';
        },
        styles: function () {
            return this.app + '/css';
        },
        html: function () {
            return this.app + '/*.html';
        }
    };

config.scripts.apply(config);
config.styles.apply(config);
config.html.apply(config);

gulp.task('clean', function (cb) {
    require('rimraf')(config.dist, cb);
});

gulp.task('lint', function () {
    var path = config.scripts(),
        jshint = require('gulp-jshint');

    return gulp.src(path)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static(config.app))
        .use(connect.directory(config.app));

    require('http').createServer(app)
        .listen(config.port)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:' + config.port + '.');
        });
});

gulp.task('server', ['connect'], function () {
    var jsPath = config.scripts(),
        cssPath = config.styles(),
        htmlPath = config.html(),
        livereload = require('gulp-livereload'),
        server = livereload();

    require('opn')('http://localhost:' + config.port);

    gulp.watch([cssPath + '/**/*.css', jsPath, htmlPath]).on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('images', function () {
    return gulp.src(config.app + '/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}')
        .pipe(gulp.dest(config.dist + '/img'));
});

gulp.task('fonts', function () {
    var cssPath = config.styles();

    return gulp.src(cssPath + '/fonts/*')
        .pipe(gulp.dest(config.dist + '/css/fonts'));
});

gulp.task('misc', function () {
    return gulp.src([
            config.app + '/*.{ico,png,txt}'
        ])
        .pipe(gulp.dest(config.dist));
});

gulp.task('html', ['lint'], function () {
    var htmlPath = config.html(),
        minifycss = require('gulp-minify-css'),
        useref = require('gulp-useref'),
        gulpif = require('gulp-if'),
        uglify = require('gulp-uglify');

    return gulp.src(htmlPath)
        .pipe(useref.assets())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifycss()))
        .pipe(useref.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.dist));
});

gulp.task('build', ['clean'], function () {
    gulp.start('images', 'fonts', 'misc', 'html');
});

gulp.task('default', ['build']);