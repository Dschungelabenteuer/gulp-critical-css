# gulp-critical-css [![Build Status](https://travis-ci.org/mscharl/gulp-critical-css.svg?branch=master)](https://travis-ci.org/mscharl/gulp-critical-css) [![npm](https://img.shields.io/npm/v/gulp-critical-css.svg?maxAge=2592000)]() [![npm](https://img.shields.io/npm/dm/gulp-critical-css.svg?maxAge=2592000)]() [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


> Extract critical css rules into a seperate stylesheet

This module allows to put a (blocking) lightweight CSS-File with critical style
information into the HTML-head and the full CSS at the end of the body.

This may increase loading and parsing time of your website and avoids a
[FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).


## Install

```
$ npm install --save-dev gulp-critical-css
```


## Usage

```js
const gulp = require('gulp');
const criticalCss = require('gulp-critical-css');

gulp.task('default', () => {
  gulp.src('src/file.css')
    .pipe(criticalCss())
    .pipe(gulp.dest('dist'))
);
```

## Usage in CSS

### Property mode (default)
Every rule that contains `critical: this;` is extracted into the critical file.

```css
// This Selector will be extracted
.my-selector {
    critical: this;
    color: red;
}

// This Selector will not
.my-other-selector {
    color: green;
}
```

### Comment mode

```css
// This Selector will be extracted
.my-selector {
    /*!critical!*/
    color: red;
}

// This Selector will not
.my-other-selector {
    color: green;
}
```

If you want to extract Selectors matching a RegExp or selectors, take a look at the options.

## API

### criticalCss([options])

#### options

##### selectors

* Type: `Array<String,RegExp>`<br>
* Default: `[]`

Lets you define Selectors to extract into critical.
This may be a simple string like `.navbar > .nav`, `a` or a `RegExp`.

Strings are compared to the found selectors with
`foundSelector.indexOf(selector) !== -1` Regular expressions are tested with
`regEx.test(foundSelector)`

##### mode

* Type: `String`<br>
* Default: `'property'`

Lets you define detection mode.

Setting mode to `'property'` will extract rules which contain the following property:
```css
  critical: this;
```
Setting mode to `'comment'` will extract rules which contain the following property:
```css
  /*!critical!*/
```

##### removeCritical

* Type: `Boolean`<br>
* Default: `true`

Lets you define whether to remove the critical css from the full css file.


## Next Steps
- [ ] Support for Sourcemaps

Any Ideas? [Tell me!](https://github.com/mscharl/gulp-critical-css/issues/new?labels=enhancement)

## License

MIT © [Michael Scharl](https://michael.scharl.me)
