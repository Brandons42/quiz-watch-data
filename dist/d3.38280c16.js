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
})({"lib/measurements.js":[function(require,module,exports) {
var margin = {
  top: 50,
  right: 45,
  bottom: 50,
  left: 75
};
module.exports.margin = margin;
var docWidth = document.body.clientWidth / (document.body.clientWidth > 1100 ? 2 : 1);
module.exports.height = docWidth * 4 / 5 - margin.top - margin.bottom;
module.exports.width = docWidth - margin.left - margin.right;
},{}],"lib/createGraph.js":[function(require,module,exports) {
var _require = require('./measurements'),
    height = _require.height,
    margin = _require.margin,
    width = _require.width;

module.exports = function (id, title, xAxis, xLabel, yAxis, yLabel, heat) {
  var svg = d3.select('#' + id).append('svg').attr('height', height + margin.top + margin.bottom).attr('width', width + margin.left + margin.right).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  svg.append('rect').attr('x', 0).attr('y', 0).attr('height', height).attr('width', width).style('fill', '#EBEBEB');

  if (heat) {
    var fills = ['B7F0AD', 'D2FF96', 'E8D33F', 'D17B0F', '832232'];
    var sectionLabels = ['Very strong', 'Strong', 'Moderate', 'Weak', 'Very weak'];

    for (var q = 0; q < 5; q++) {
      svg.append('rect').attr('x', 0).attr('y', height * q / 5).attr('height', height / 5).attr('width', width).style('fill', "#".concat(fills[q], "44"));
      svg.append('text').attr('class', 'section-label').attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').attr('transform', 'rotate(90)').attr('x', height * (q * 2 + 1) / 10).attr('y', -width - 25).text(sectionLabels[q]);
      svg.append('text').attr('class', 'section-label').attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').attr('transform', 'rotate(90)').attr('x', height * (q * 2 + 1) / 10).attr('y', -width - 10).text('correlation');
    }
  }

  svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(xAxis).tickSize(-height).ticks(9)).select('.domain').remove();
  svg.append('text').attr('class', 'title').attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').attr('x', width / 2).attr('y', -margin.top / 2).text(title);
  svg.append('text').attr('class', 'label').attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').attr('x', width / 2).attr('y', height + 30).text(xLabel);
  svg.append('g').call(d3.axisLeft(yAxis).tickSize(-width).ticks(6)).select('.domain').remove();
  svg.append('text').attr('class', 'label').attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').attr('transform', 'rotate(-90)').attr('x', -margin.top - height / 2).attr('y', -margin.left + 25).text(yLabel);
  return svg;
};
},{"./measurements":"lib/measurements.js"}],"data.json":[function(require,module,exports) {
module.exports = {
  "requests": [[423, 327, 273, 224, 545, 349, 266, 344, 295, 249, 373, 502, 447, 328, 239, 251, 198, 220, 224, 252, 238, 182, 237, 243, 318, 326, 286, 216, 185, 164], [210, 264, 332, 344, 332, 196, 133, 271, 258, 452, 356, 320, 302, 249, 257, 340, 442, 285, 381, 339, 361, 264, 296, 436, 501, 532, 425, 544, 482, 245, 303], [410, 302, 292, 315, 391, 285, 439, 496, 308, 417, 260, 288, 302, 304, 324, 239, 311, 247, 254, 362, 379, 336, 257, 445, 340, 341, 259, 300, 325, 314], [278, 286, 317, 233, 234, 266, 467, 363, 232, 440, 367, 374, 460, 375, 386, 285, 384, 369, 484, 294, 263, 430, 493, 480, 386, 442, 294, 187, 275, 215, 159], [224, 174, 249, 302, 374, 256, 344, 375, 207, 252, 287, 215, 188, 195, 281, 302, 270, 278, 236, 286, 293, 485, 317, 310, 302, 340, 208, 445, 355, 337, 314], [280, 300, 494, 379, 298, 400, 414, 397, 359, 421, 616, 462, 436, 488, 375, 395, 564, 674, 777, 629, 905, 482, 648, 732, 696, 794, 824, 800, 498, 656], [690, 469, 570, 627, 641, 495, 582, 659, 582, 651, 593, 799, 537, 683, 733, 677, 806, 725, 1136, 663, 834, 938, 727, 774, 774, 796, 568, 566, 601, 733, 550], [775, 1032, 720, 678, 793, 1253, 1147, 1082, 830, 729, 934, 894, 842, 942, 987, 1073, 1047, 859, 1070, 1262, 1226, 1045, 1022, 789, 685, 846, 1147, 1170, 604, 973], [655, 912, 748, 789, 808, 1053, 948, 747, 897, 1110, 978, 873, 692, 845, 826, 831, 867, 830, 703, 817, 733, 675, 649, 689, 691, 635, 617, 613, 731, 572, 531], [501, 466, 658, 757, 644, 722, 585, 776, 830, 730, 889, 808, 723, 662, 557, 697, 847, 964, 620, 710, 903, 617, 698, 762, 906, 518, 578, 794, 592, 721, 673], [763, 586, 527, 694, 622, 548, 909, 746, 601, 528, 605, 522, 860, 712, 891, 782, 580, 630, 554, 772, 622, 765, 482, 613, 718, 1095, 824, 946, 974]],
  "tournaments": [[0, 0, 0, 0, 1, 10, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 1, 1, 9, 1, 0, 0, 0, 0, 0, 11, 1, 0, 0], [0, 0, 0, 4, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1], [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0, 0, 5, 1, 0, 0, 0], [0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 14, 1, 0, 0, 0, 0, 0, 12, 2, 1], [0, 0, 0, 0, 15, 1, 2, 0, 0, 1, 0, 24, 0, 0, 0, 1, 0, 0, 23, 0, 1, 0, 0, 1, 0, 20, 2, 0, 0, 1, 0], [0, 30, 3, 0, 0, 0, 1, 0, 23, 1, 0, 1, 0, 0, 0, 30, 0, 1, 1, 1, 1, 0, 18, 1, 0, 0, 0, 0, 0, 2], [1, 0, 1, 0, 2, 1, 19, 0, 0, 0, 0, 0, 1, 13, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 7, 0, 1, 1, 1, 0, 0, 16, 0, 0, 0, 0, 1, 0, 18, 1, 0, 0, 0, 0, 1, 27, 0, 0, 0, 1, 1, 1], [11, 0, 0, 0, 0, 0, 0, 25, 1, 1, 0, 0, 0, 0, 15, 0, 0, 0, 0, 1, 0, 20, 5, 1, 1, 0, 0, 0, 21]]
};
},{}],"lib/getDays.js":[function(require,module,exports) {
var data = require('../data.json');

var getDays = function getDays(limit, months) {
  var days = [];
  var firstDays = [1, 3, 6, 1, 4, 0, 2, 5, 0, 3];
  var dayOfWeek;

  for (var q = 0; q < data.tournaments.length - 1; q++) {
    if (months.includes(q)) {
      dayOfWeek = firstDays[q];

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
  }

  return days;
};

module.exports = getDays;
},{"../data.json":"data.json"}],"lib/getR.js":[function(require,module,exports) {
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
},{}],"lib/drawR.js":[function(require,module,exports) {
var createGraph = require('./createGraph');

var getDays = require('./getDays');

var getR = require('./getR');

var _require = require('./measurements'),
    height = _require.height,
    width = _require.width;

var x = d3.scaleLinear().domain([0, 28]).range([0, width]);
var y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
var svg = createGraph('r', 'Figure 2: Strength of Correlation from Figure 1 for each n Value', x, 'n Days', y, 'Correlational Coefficient (r)', true);

var drawR = function drawR(limit, months) {
  var rs = [];

  for (var q = 0; q < 29; q++) {
    rs.push({
      x: q,
      y: getR(getDays(q, months))
    });
  }

  svg.append('path').datum(rs).attr('id', 'r-line').attr('d', d3.line().x(function (d) {
    return x(d.x);
  }).y(function (d) {
    return y(d.y > 0 ? d.y : 0);
  })).attr('fill', 'none').attr('stroke', '#0039e6').attr('stroke-width', 5);
  svg.append('circle').attr('class', 'dots').attr('cx', x(rs[limit].x)).attr('cy', y(rs[limit].y > 0 ? rs[limit].y : 0)).attr('fill', '#0039e6').attr('r', 12);
};

module.exports = drawR;
},{"./createGraph":"lib/createGraph.js","./getDays":"lib/getDays.js","./getR":"lib/getR.js","./measurements":"lib/measurements.js"}],"lib/monthColors.js":[function(require,module,exports) {
var monthColors = ['#832232', '#D17B0F', '#E8D33F', '#EDFF7A', '#D2FF96', '#B7F0AD', '#C3DFE0', '#26377c', '#0B0033', '#370031'];
module.exports = monthColors;
},{}],"lib/symbols.js":[function(require,module,exports) {
var symbols = [d3.symbolCircle, d3.symbolSquare, d3.symbolDiamond, d3.symbolTriangle, d3.symbolCross, d3.symbolWye, d3.symbolStar];
module.exports = symbols;
},{}],"lib/drawScatter.js":[function(require,module,exports) {
var createGraph = require('./createGraph');

var monthColors = require('./monthColors');

var symbols = require('./symbols');

var _require = require('./measurements'),
    height = _require.height,
    width = _require.width;

var x = d3.scaleLinear().domain([0, 140]).range([0, width]);
var y = d3.scaleLinear().domain([0, 7000]).range([height, 0]);
var svg = createGraph('scatter', 'Figure 1: Quiz Watch Usage and Quiz Bowl Tournament Frequency', x, 'Quiz Bowl Tournaments Within Next n Days (as per slider)', y, 'Quiz Watch Questions Answered on Day');
var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var semiTransparent = '#ffffff88';
var white = 'white';
svg.append('rect').attr('class', 'key-top').attr('height', 30).attr('width', 140).attr('x', width - 150).attr('y', 10).style('fill', semiTransparent);
svg.append('text').attr('class', 'key-top').attr('dominant-baseline', 'middle').attr('text-anchor', 'middle').attr('x', width - 85).attr('y', 25).style('font-weight', 500).style('pointer-events', 'none').style('text-decoration', 'underline').text('Key');
svg.append('rect').attr('class', 'key').attr('height', 250).attr('width', 140).attr('x', width - 150).attr('y', 40).style('display', 'none').style('fill', white);

for (var q = 0; q < 7; q++) {
  svg.append('path').attr('class', 'key').attr('d', d3.symbol().type(symbols[q]).size(300)).attr('transform', "translate(".concat(width - 30, ",").concat(60 + q * 35, ")")).style('display', 'none');
  svg.append('text').attr('class', 'key').attr('dominant-baseline', 'middle').attr('text-anchor', 'end').attr('x', width - 50).attr('y', 60 + q * 35).style('display', 'none').style('font-weight', 300).text(daysOfWeek[q]);
}

var keyElements = document.getElementsByClassName('key');
var keyTops = document.getElementsByClassName('key-top');
var extended = false;

var toggleDisplay = function toggleDisplay() {
  keyElements[0].style.fill = white;

  for (var _q = 0; _q < keyElements.length; _q++) {
    keyElements[_q].style.display = extended ? 'none' : 'initial';
  }

  extended = !extended;

  if (!extended && !over) {
    keyTops[0].style.fill = semiTransparent;
  }
};

var over = false;

var toggleHighlight = function toggleHighlight() {
  over = !over;

  if (!extended) {
    if (over) {
      keyTops[0].style.fill = white;
    } else {
      keyElements[0].style.fill = semiTransparent;
      keyTops[0].style.fill = semiTransparent;
    }
  }
};

keyTops[0].onclick = toggleDisplay;
keyTops[0].onmouseleave = toggleHighlight;
keyTops[0].onmouseenter = toggleHighlight;
keyTops[1].onclick = toggleDisplay;

for (var _q2 = 0; _q2 < keyElements.length; _q2++) {
  keyElements[_q2].onclick = toggleDisplay;
}

var drawScatter = function drawScatter(days) {
  var symbol = d3.symbol().size(80);
  svg.append('g').attr('class', 'dots').selectAll('dot').data(days).enter().append('path').attr('d', symbol.type(function (d) {
    return symbols[d.day];
  })).attr('transform', function (d) {
    return "translate(".concat(x(d.tournaments), ",").concat(y(d.questions), ")");
  }).style('fill', function (d) {
    return monthColors[d.month];
  });
};

module.exports = drawScatter;
},{"./createGraph":"lib/createGraph.js","./monthColors":"lib/monthColors.js","./symbols":"lib/symbols.js","./measurements":"lib/measurements.js"}],"d3.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var drawR = require('./lib/drawR');

var drawScatter = require('./lib/drawScatter');

var getDays = require('./lib/getDays');

var monthColors = require('./lib/monthColors');

var divs = _toConsumableArray(document.getElementById('colors').children).map(function (div) {
  return div.children[0];
});

var months = [];

for (var q = 0; q < divs.length; q++) {
  months.push(q);
  divs[q].style.backgroundColor = monthColors[q];
}

var initialized = false;
var slider = document.getElementById('slider');

var draw = function draw(redrawLine) {
  if (initialized) {
    d3.selectAll('.dots').remove();

    if (redrawLine) {
      d3.select('#r-line').remove();
    }
  } else {
    initialized = true;
  }

  var limit = parseInt(slider.value);
  drawR(limit, months);
  var days = getDays(limit, months);
  drawScatter(days);
};

draw();

var setColor = function setColor(q) {
  if (months.includes(q)) {
    divs[q].style.backgroundColor = monthColors[q];
  } else {
    divs[q].style.backgroundColor = 'transparent';
  }
};

var _loop = function _loop(_q) {
  divs[_q].onclick = function () {
    if (months.includes(_q)) {
      months.splice(months.indexOf(_q), 1);
    } else {
      months.push(_q);
    }

    setColor(_q);
    draw(true);
  };

  divs[_q].onmouseleave = function () {
    return setColor(_q);
  };

  divs[_q].onmouseover = function () {
    return divs[_q].style.backgroundColor = monthColors[_q] + '44';
  };
};

for (var _q = 0; _q < divs.length; _q++) {
  _loop(_q);
}

slider.oninput = draw;
},{"./lib/drawR":"lib/drawR.js","./lib/drawScatter":"lib/drawScatter.js","./lib/getDays":"lib/getDays.js","./lib/monthColors":"lib/monthColors.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55921" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","d3.js"], null)
//# sourceMappingURL=/d3.38280c16.js.map