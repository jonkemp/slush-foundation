# [slush](https://github.com/slushjs/slush)-foundation [![Build Status](https://secure.travis-ci.org/jonkemp/slush-foundation.png?branch=master)](https://travis-ci.org/jonkemp/slush-foundation)

> Slush generator for Zurb Foundation 5

## Features

### Includes:
* [Zurb Foundation 5](http://foundation.zurb.com/)
* jQuery
* Modernizr

### What you can do:
* Watch and compile Sass files automatically
* Start a server to preview your code with LiveReload
* Automatically lint your scripts
* Concatenate and minify CSS and JavaScript files

For more information on what this generator can do for you, take a look at the [gulp plugins](https://github.com/jonkemp/slush-foundation/blob/master/templates/package.json) used in the `package.json`. Please see the [gulpfile.js](https://github.com/jonkemp/slush-foundation/blob/master/templates/gulpfile.js) for up to date information on what is supported.

## Getting Started

Install `slush-foundation` globally:

```bash
$ npm install -g slush-foundation
```

### Usage

Create a new folder for your project:

```bash
$ mkdir my-slush-foundation
```

Run the generator from within the new folder:

```bash
$ cd my-slush-foundation && slush foundation
```

You can use Gulp to preview your app by running `gulp serve`. This task will also reload watched files instantly with livereload. To see what else you can do with Gulp, check out the [gulpfile.js](https://github.com/jonkemp/slush-foundation/blob/master/templates/gulpfile.js).

## Options

- `--skip-install`
  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.
  
## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding. To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/jonkemp/slush-foundation/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/jonkemp/slush-foundation/issues).

## License 

The MIT License

Copyright (c) 2014, Jonathan Kemp

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

