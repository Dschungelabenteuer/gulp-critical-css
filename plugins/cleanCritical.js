var postcss = require('postcss');

module.exports = postcss.plugin('cleanCritical', function (opts) {
  opts = opts || {};
  // Work with options here

  return function (css) {
    switch (opts.mode) {
      // Comment detection
      case 'comment':
        css.walkComments(function (comment) {
          if (comment.text === '!critical!') {
            comment.remove();
          }
        });
        break;
      // Property detection
      case 'propety':
      default:
        css.walkDecls(function (decl) {
          if (decl.prop === 'critical') {
            decl.remove();
          }
        });
        break;
    }
  };
});
