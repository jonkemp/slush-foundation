# slush-foundation changelog

# 0.4.0

- Add main.(css|scss) template.
- Wire main.css to index.html.
- Add build blocks for main.css and vendor.css.
- New gulpfile.js.

# 0.3.0

- Remove minified Foundation lib files.
- Remove normalize.css.
- Add all non-minified Foundation JS files to index.html.
- Remove duplicate jquery.cookie.js.
- Update tests.
- Add option to use Sass.
- Add gulp task to compile scss files.
- Bug fix: gulp-rename should not rename .scss files that start with '_'.

# 0.2.0

- Install Modernizr and jQuery via Bower.
- Add option to include Modernizr.
- Add --skip-install option.
- Wire dependencies in index.html with wiredep.
- Add 'wiredep' and 'html' tasks to gulpfile.js.
- Update tests.

# 0.1.0

- Initial release.
