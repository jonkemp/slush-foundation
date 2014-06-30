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
});
