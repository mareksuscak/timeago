/* eslint-env amd, browser, node */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.timeAgo = factory();
  }
}(this, function () {

  // Range                         Past                               Future
  // ===============================================================================================
  // 0 to 44 seconds               a few seconds ago                  in seconds
  // 45 to 89 seconds              a minute ago                       in a minute
  // 90 seconds to 44 minutes      2 minutes ago ... 44 minutes ago   in 2 minutes ... in 44 minutes
  // 45 to 89 minutes              an hour ago                        in an hour
  // 90 minutes to 21 hours        2 hours ago ... 21 hours ago       in 2 hours ... in 21 hours
  // 22 to 35 hours                a day ago                          in a day
  // 36 hours to 25 days           2 days ago ... 25 days ago         in 2 days ... in 25 days
  // 26 to 44 days                 a month ago                        in a month
  // 45 to 319 days                2 months ago ... 10 months ago     in 2 months ... in 10 months
  // 320 to 547 days (1.5 years)   a year ago                         in a year
  // 548 days+                     2 years ago ... 20 years ago       in 2 years ... in 20 years

  var timeFormats = [
    [45,       'a few seconds', 'seconds' ], // 0 to 44 seconds
    [90,       'a minute',      'a minute'], // 45 to 89 seconds
    [2700,     'minutes',       60        ], // 90 seconds to 44 minutes
    [5400,     'an hour',       'an hour' ], // 45 to 89 minutes
    [79200,    'hours',         3600      ], // 90 minutes to 21 hours
    [129600,   'a day',         'a day'   ], // 22 to 35 hours
    [2246400,  'days',          86400     ], // 36 hours to 25 days
    [3888000,  'a month',       'a month' ], // 26 to 45 days
    [27648000, 'months',        2628288   ], // 45 to 319 days
    [47347200, 'a year',        'a year'  ], // 320 to 547 days (1.5 years)
    [Infinity, 'years',         31536000  ]  // 548 days+
  ];

  function round(value) {
    return Math.max(2, Math.floor(value));
  }

  function toUnixDate(time) {
    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'undefined':
        time = +new Date();
        break;
      case 'object':
        if (time instanceof Date) {
          time = time.getTime();
          break;
        }
      default: // eslint-disable-line no-fallthrough
        throw new Error('An invalid type was used as a timeAgo function param.');
    }

    return time;
  }

  function timeAgo(time) {
    time = toUnixDate(time);

    var seconds = (+new Date() - time) / 1000;
    var listChoice = 1;

    if (seconds === 0) {
      return 'just now';
    }

    if (seconds < 0) {
      seconds = Math.abs(seconds);
      listChoice = 2;
    }

    var prefixToken = listChoice === 2 ? 'in ' : '';
    var postfixToken = listChoice === 1 ? ' ago' : '';
    var format;
    var i = 0;

    /* eslint-disable no-cond-assign */
    while (format = timeFormats[i++]) {
      if (seconds < format[0]) {
        if (typeof format[2] === 'string') {
          return prefixToken + format[listChoice] + postfixToken;
        } else {
          return prefixToken + round(seconds / format[2]) + ' ' + format[1] + postfixToken;
        }
      }
    }
    /* eslint-enable no-cond-assign */
  }

  return timeAgo;
}));

