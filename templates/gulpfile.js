'use strict';

var gulp = require('gulp');

gulp.task('clean', function (cb) {
    require('rimraf')('dist', cb);
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src('app/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
<% if (includeSass) { %>
gulp.task('styles', function () {
    var sass = require('gulp-sass'),
        cssbeautify = require('gulp-cssbeautify');

    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(cssbeautify())
        .pipe(gulp.dest('app/css'));
});<% } %>

gulp.task('images', function () {
    var cache = require('gulp-cache'),
        imagemin = require('gulp-imagemin');

    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
    return gulp.src('app/css/fonts/*')
        .pipe(gulp.dest('dist/css/fonts'));
});

gulp.task('misc', function () {
    return gulp.src([
            'app/*.{ico,png,txt}',
            'app/.htaccess'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('html', ['lint'<% if (includeSass) { %>, 'styles'<% } %>], function () {
    var uglify = require('gulp-uglify'),
        minifyCss = require('gulp-minify-css'),
        useref = require('gulp-useref'),
        gulpif = require('gulp-if'),
        assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000.');
        });
});

gulp.task('serve', ['connect'<% if (includeSass) { %>, 'styles'<% } %>], function () {
    var livereload = require('gulp-livereload');

    livereload.listen();

    require('opn')('http://localhost:9000');

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/css/**/*.css',
        'app/js/**/*.js',
        'app/img/**/*'
    ]).on('change', livereload.changed);
    <% if (includeSass) { %>
    gulp.watch('app/scss/**/*.scss', ['styles']);<% } %>
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'misc']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
