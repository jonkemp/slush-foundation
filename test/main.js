/* jshint node:true */
/* global require, it, before, beforeEach, describe */

'use strict';
var should = require('should'),
    inquirer = require('inquirer'),
    gulp = require('gulp'),
    mockGulpDest = require('mock-gulp-dest')(gulp);

require('../slushfile');

/**
 * Mock inquirer prompt
 */

function mockPrompt(answers) {
    inquirer.prompt = function (prompts, done) {

        [].concat(prompts).forEach(function (prompt) {
            if (!(prompt.name in answers)) {
                answers[prompt.name] = prompt.default;
            }
        });

        done(answers);
    };
}

describe('slush-foundation', function() {
    before(function () {
        process.chdir(__dirname);
        process.argv.push('--skip-install');
    });

    describe('default generator', function () {
        beforeEach(function () {
            mockPrompt({
                features: [],
                moveon: true
            });
        });

        it('should put all project files in current working directory', function (done) {
            gulp.start('default').once('stop', function () {
                mockGulpDest.cwd().should.equal(__dirname);
                mockGulpDest.basePath().should.equal(__dirname);
                done();
            });
        });

        it('should create expected files', function (done) {
            gulp.start('default').once('stop', function () {
                mockGulpDest.assertDestContains([
                    '.bowerrc',
                    '.editorconfig',
                    '.gitattributes',
                    '.gitignore',
                    '.jshintrc',
                    'bower.json',
                    'package.json',
                    'gulpfile.js',
                    'app/humans.txt',
                    'app/robots.txt',
                    'app/index.html',
                    'app/css/foundation.css',
                    'app/js/foundation/foundation.js',
                    'app/js/foundation/foundation.abide.js',
                    'app/js/foundation/foundation.equalizer.js',
                    'app/js/foundation/foundation.interchange.js',
                    'app/js/foundation/foundation.dropdown.js',
                    'app/js/foundation/foundation.accordion.js',
                    'app/js/foundation/foundation.alert.js',
                    'app/js/foundation/foundation.clearing.js',
                    'app/js/foundation/jquery.cookie.js',
                    'app/js/foundation/foundation.joyride.js',
                    'app/js/foundation/foundation.magellan.js',
                    'app/js/foundation/foundation.offcanvas.js',
                    'app/js/foundation/foundation.orbit.js',
                    'app/js/foundation/foundation.reveal.js',
                    'app/js/foundation/foundation.slider.js',
                    'app/js/foundation/foundation.tab.js',
                    'app/js/foundation/foundation.tooltip.js',
                    'app/js/foundation/foundation.topbar.js'
                ]);

                done();
            });
        });
    });

    describe('default generator: sass feature', function () {
        it('should copy over scss files', function (done) {
            mockPrompt({
                features: ['includeSass'],
                moveon: true
            });
            gulp.start('default').once('stop', function () {
                mockGulpDest.assertDestNotContains('app/css/foundation.css');
                mockGulpDest.assertDestContains('app/scss/foundation.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/_functions.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/_settings.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_accordion.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_alert-boxes.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_block-grid.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_breadcrumbs.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_button-groups.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_buttons.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_clearing.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_dropdown.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_dropdown-buttons.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_flex-video.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_forms.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_global.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_grid.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_icon-bar.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_inline-lists.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_joyride.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_keystrokes.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_labels.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_magellan.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_offcanvas.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_orbit.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_pagination.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_panels.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_pricing-tables.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_progress-bars.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_range-slider.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_reveal.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_reveal-new.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_side-nav.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_split-buttons.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_sub-nav.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_switches.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_tables.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_tabs.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_thumbs.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_toolbar.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_tooltips.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_top-bar.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_type.scss');
                mockGulpDest.assertDestContains('app/scss/foundation/components/_visibility.scss');
                done();
            });
        });
    });
});
