// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"measurements.js":[function(require,module,exports) {
var margin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
};
module.exports.margin = margin;
var docWidth = document.body.clientWidth / (document.body.clientWidth > 700 ? 2 : 1);
module.exports.height = docWidth - margin.top - margin.bottom;
module.exports.width = docWidth - margin.left - margin.right;
},{}],"createGraph.js":[function(require,module,exports) {
var _require = require('./measurements'),
    height = _require.height,
    margin = _require.margin,
    width = _require.width;

module.exports = function (id, xAxis, xLabel, yAxis, yLabel) {
  var svg = d3.select('#' + id).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(xAxis)).style('fill', '#678');
  svg.append('text').attr('text-anchor', 'end').attr('x', width / 2 + margin.left).attr('y', height + margin.top + 20).text(xLabel);
  svg.append('g').call(d3.axisLeft(yAxis)).style('fill', '#678');
  svg.append('text').attr('text-anchor', 'end').attr('transform', 'rotate(-90)').attr('y', -margin.left + 20).attr('x', -margin.top - height / 2 + 20).text(yLabel);
  return svg;
};
},{"./measurements":"measurements.js"}],"data.json":[function(require,module,exports) {
module.exports = {
  "requests": [[423, 327, 273, 224, 545, 349, 266, 344, 295, 249, 373, 502, 447, 328, 239, 251, 198, 220, 224, 252, 238, 182, 237, 243, 318, 326, 286, 216, 185, 164], [210, 264, 332, 344, 332, 196, 133, 271, 258, 452, 356, 320, 302, 249, 257, 340, 442, 285, 381, 339, 361, 264, 296, 436, 501, 532, 425, 544, 482, 245, 303], [410, 302, 292, 315, 391, 285, 439, 496, 308, 417, 260, 288, 302, 304, 324, 239, 311, 247, 254, 362, 379, 336, 257, 445, 340, 341, 259, 300, 325, 314], [278, 286, 317, 233, 234, 266, 467, 363, 232, 440, 367, 374, 460, 375, 386, 285, 384, 369, 484, 294, 263, 430, 493, 480, 386, 442, 294, 187, 275, 215, 159], [224, 174, 249, 302, 374, 256, 344, 375, 207, 252, 287, 215, 188, 195, 281, 302, 270, 278, 236, 286, 293, 485, 317, 310, 302, 340, 208, 445, 355, 337, 314], [280, 300, 494, 379, 298, 400, 414, 397, 359, 421, 616, 462, 436, 488, 375, 395, 564, 674, 777, 629, 905, 482, 648, 732, 696, 794, 824, 800, 498, 656], [690, 469, 570, 627, 641, 495, 582, 659, 582, 651, 593, 799, 537, 683, 733, 677, 806, 725, 1136, 663, 834, 938, 727, 774, 774, 796, 568, 566, 601, 733, 550], [775, 1032, 720, 678, 793, 1253, 1147, 1082, 830, 729, 934, 894, 842, 942, 987, 1073, 1047, 859, 1070, 1262, 1226, 1045, 1022, 789, 685, 846, 1147, 1170, 604, 973], [655, 912, 748, 789, 808, 1053, 948, 747, 897, 1110, 978, 873, 692, 845, 826, 831, 867, 830, 703, 817, 733, 675, 649, 689, 691, 635, 617, 613, 731, 572, 531], [501, 466, 658, 757, 644, 722, 585, 776, 830, 730, 889, 808, 723, 662, 557, 697, 847, 964, 620, 710, 903, 617, 698, 762, 906, 518, 578, 794, 592, 721, 673], [763, 586, 527, 694, 622, 548, 909, 746, 601, 528, 605, 522, 860, 712, 891, 782, 580, 630, 554, 772, 622, 765, 482, 613, 718, 1095, 824, 946, 974]],
  "tournaments": [[0, 0, 0, 0, 1, 10, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 1, 1, 9, 1, 0, 0, 0, 0, 0, 11, 1, 0, 0], [0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1], [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 5, 1, 0, 0, 0], [0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 14, 1, 0, 0, 0, 0, 0, 12, 2, 1], [0, 0, 0, 0, 15, 1, 2, 0, 0, 1, 0, 24, 0, 0, 0, 1, 0, 0, 23, 0, 1, 0, 0, 1, 0, 20, 2, 0, 0, 1, 0], [0, 30, 3, 0, 0, 0, 1, 0, 23, 1, 0, 1, 0, 0, 0, 30, 0, 1, 1, 1, 1, 0, 18, 1, 0, 0, 0, 0, 0, 2], [1, 0, 1, 0, 2, 1, 19, 0, 0, 0, 0, 0, 1, 13, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 7, 0, 1, 1, 1, 0, 0, 16, 0, 0, 0, 0, 1, 0, 18, 1, 0, 0, 0, 0, 1, 27, 0, 0, 0, 1, 1, 1], [11, 0, 0, 0, 0, 0, 0, 25, 1, 1, 0, 0, 0, 0, 15, 0, 0, 0, 0, 1, 0, 20, 5, 1, 1, 0, 0, 0, 21]]
};
},{}],"getDays.js":[function(require,module,exports) {
var data = require('./data.json');

var getDays = function getDays(limit) {
  var days = [];
  var dayOfWeek = 1;

  for (var q = 0; q < data.tournaments.length - 1; q++) {
    for (var r = 0; r < data.tournaments[q].length; r++) {
      var tournaments = 0;

      for (var s = 0; s < limit + 1; s++) {
        if (data.tournaments[q][r + s]) {
          tournaments += data.tournaments[q][r + s];
        } else if (data.tournaments[q + 1]) {
          for (var t = 0; t < limit + 1 - s; t++) {
            tournaments += data.tournaments[q + 1][t];
          }

          break;
        }
      }

      days.push({
        day: dayOfWeek++ % 7,
        month: q,
        questions: data.requests[q][r] * 5,
        tournaments: tournaments
      });
    }
  }

  return days;
};

module.exports = getDays;
},{"./data.json":"data.json"}],"getR.js":[function(require,module,exports) {
var getR = function getR(days) {
  var xSum = days.reduce(function (acc, cur) {
    return acc + cur.tournaments;
  }, 0);
  var x2Sum = days.reduce(function (acc, cur) {
    return acc + cur.tournaments * cur.tournaments;
  }, 0);
  var xySum = days.reduce(function (acc, cur) {
    return acc + cur.tournaments * cur.questions;
  }, 0);
  var ySum = days.reduce(function (acc, cur) {
    return acc + cur.questions;
  }, 0);
  var y2Sum = days.reduce(function (acc, cur) {
    return acc + cur.questions * cur.questions;
  }, 0);
  var r = (days.length * xySum - xSum * ySum) / Math.sqrt((days.length * x2Sum - xSum * xSum) * (days.length * y2Sum - ySum * ySum));
  return r;
};

module.exports = getR;
},{}],"drawR.js":[function(require,module,exports) {
var createGraph = require('./createGraph');

var getDays = require('./getDays');

var getR = require('./getR');

var _require = require('./measurements'),
    height = _require.height,
    width = _require.width;

var x = d3.scaleLinear().domain([0, 28]).range([0, width]);
var y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
var svg = createGraph('r', x, 'x Days', y, 'R');

var drawR = function drawR(limit) {
  var rs = [];

  for (var q = 0; q < 29; q++) {
    rs.push({
      x: q,
      y: getR(getDays(q))
    });
  }

  console.log(rs);
  svg.append('path').datum(rs).attr('fill', 'none').attr('stroke', 'steelblue').attr('stroke-width', 1.5).attr('d', d3.line().x(function (d) {
    return x(d.x);
  }).y(function (d) {
    return y(d.y);
  }));
  svg.append('g').attr('class', 'dots').datum(rs[limit]).append('circle').attr('cx', function (d) {
    return x(d.x);
  }).attr('cy', function (d) {
    return y(d.y);
  }).attr('r', 20);
};

module.exports = drawR;
},{"./createGraph":"createGraph.js","./getDays":"getDays.js","./getR":"getR.js","./measurements":"measurements.js"}],"drawScatter.js":[function(require,module,exports) {
var createGraph = require('./createGraph');

var _require = require('./measurements'),
    height = _require.height,
    width = _require.width;

var x = d3.scaleLinear().domain([0, 140]).range([0, width]);
var y = d3.scaleLinear().domain([0, 7000]).range([height, 0]);
var svg = createGraph('scatter', x, 'Tournaments within next x days (indicated on slider)', y, 'Questions answered within the day');

var drawScatter = function drawScatter(days) {
  var months = ['000', '111', '222', '333', '444', '555', '777', '888', '999', 'aaa', 'bbb'];
  var symbol = d3.symbol().size(20);
  var symbols = [d3.symbolCircle, d3.symbolSquare, d3.symbolDiamond, d3.symbolTriangle, d3.symbolCross, d3.symbolWye, d3.symbolStar];
  svg.append('g').attr('class', 'dots').selectAll('dot').data(days).enter() //.append('circle')
  .append('path') //.attr('cx', d => x(d.tournaments))
  //.attr('cy', d => y(d.questions))
  .attr('d', symbol.type(function (d) {
    return symbols[d.day];
  })) //.attr('r', 1.5)
  .attr('transform', function (d) {
    return "translate(".concat(x(d.tournaments), ",").concat(y(d.questions), ")");
  }).style('fill', function (d) {
    return '#' + months[d.month];
  });
};

module.exports = drawScatter;
},{"./createGraph":"createGraph.js","./measurements":"measurements.js"}],"d3.js":[function(require,module,exports) {
var drawR = require('./drawR');

var drawScatter = require('./drawScatter');

var getDays = require('./getDays');

var getR = require('./getR');

var output = document.getElementById('output');
drawR(7);
var initialDays = getDays(7);
drawScatter(initialDays);
output.innerHTML = "Days: 7, R: ".concat(getR(initialDays));
var slider = document.getElementById('myRange');

slider.oninput = function () {
  d3.selectAll('.dots').remove();
  var limit = parseInt(this.value);
  drawR(limit);
  var days = getDays(limit);
  drawScatter(days);
  output.innerHTML = "Days: ".concat(this.value, ", R: ").concat(getR(days));
};
},{"./drawR":"drawR.js","./drawScatter":"drawScatter.js","./getDays":"getDays.js","./getR":"getR.js"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62507" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","d3.js"], null)
//# sourceMappingURL=/d3.38280c16.js.map