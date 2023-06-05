/*\
title: nprogress/startup.js
type: application/javascript
module-type: startup

nprogress module

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'nprogress-startup-hook';
  exports.platforms = ['browser'];
  exports.after = ['load-modules'];
  exports.synchronous = true;
  exports.startup = () => {
    window.NProgress = require('nprogress.min.js');
    window.onload = function () {
      NProgress.start();
      setTimeout(function () {
        NProgress.done();
        // pushNotify('success', 'Loading finished');
      }, 1000);
    };
  };
})();
