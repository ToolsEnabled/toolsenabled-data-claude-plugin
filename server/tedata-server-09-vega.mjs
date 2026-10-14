// ToolsEnabled Data server, part 9 of 15: Vega and d3, which draw charts (lines 36574-41679 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-08-vega.mjs";
import { __export } from "./tedata-server-01-ajv.mjs";
import { InternMap, SortedList, Transform, TupleStore, ValidAggregateOps, ValidWindowOps, WindowOp, WindowOps,
  accessorFields, accessorName, array_default, ascending2, bisectRight, bisect_default, bisector, compileMeasures,
  constant_default, createMeasure, error62, format, formatPrefix, formatSpecifier, groupkey, hasOwnProperty,
  inherits_default, isArray, isFunction, isNumber, isObject2, isString, loader, lruCache_default, measureName, peek,
  precisionFixed_default, precisionPrefix_default, precisionRound_default, quantileSorted, range2, second,
  stableCompare, tickIncrement, tickStep, ticks, timeDay, timeFormat, timeHour, timeInterval2, timeMinute, timeMonth,
  timeSunday, timeTickInterval, timeTicks, timeYear, toNumber, toSet, truthy, tupleid, utcDay, utcFormat, utcHour,
  utcInterval, utcMinute, utcMonth, utcSunday, utcTickInterval, utcTicks, utcYear } from "./tedata-server-08-vega.mjs";
import { Bound, Identifier, Mark, Overlap, Render, ViewLayout } from "./tedata-server-10-vega.mjs";
// Bundle text, part 9 of 15
function WindowState(_) {
  let ops2 = array_default(_.ops), fields = array_default(_.fields), params2 = array_default(_.params), aggregate_params = array_default(_.aggregate_params), as = array_default(_.as), outputs = this.outputs = [], windows2 = this.windows = [], inputs = {}, map4 = {}, counts = [], measures = [], countOnly = !0;
  function visitInputs(f) {
    array_default(accessorFields(f)).forEach((_2) => inputs[_2] = 1);
  }
  visitInputs(_.sort), ops2.forEach((op, i) => {
    let field3 = fields[i], param2 = params2[i], aggregate_param = aggregate_params[i] || null, mname = accessorName(field3), name2 = measureName(op, mname, as[i]);
    if (visitInputs(field3), outputs.push(name2), hasOwnProperty(WindowOps, op))
      windows2.push(WindowOp(op, field3, param2, name2));
    else {
      if (field3 == null && op !== "count" && error62("Null aggregate field specified."), op === "count") {
        counts.push(name2);
        return;
      }
      countOnly = !1;
      let m = map4[mname];
      m || (m = map4[mname] = [], m.field = field3, measures.push(m)), m.push(createMeasure(op, aggregate_param, name2));
    }
  }), (counts.length || measures.length) && (this.cell = cell(measures, counts, countOnly)), this.inputs = Object.keys(inputs);
}
var prototype = WindowState.prototype;
prototype.init = function() {
  this.windows.forEach((_) => _.init()), this.cell && this.cell.init();
};
prototype.update = function(w2, t) {
  let cell2 = this.cell, wind = this.windows, data3 = w2.data, m = wind && wind.length, j2;
  if (cell2) {
    for (j2 = w2.p0; j2 < w2.i0; ++j2) cell2.rem(data3[j2]);
    for (j2 = w2.p1; j2 < w2.i1; ++j2) cell2.add(data3[j2]);
    cell2.set(t);
  }
  for (j2 = 0; j2 < m; ++j2) wind[j2].update(w2, t);
};
function cell(measures, counts, countOnly) {
  measures = measures.map((m) => compileMeasures(m, m.field));
  let cell2 = {
    num: 0,
    agg: null,
    store: !1,
    count: counts
  };
  if (!countOnly)
    for (var n = measures.length, a = cell2.agg = Array(n), i = 0; i < n; ++i) a[i] = new measures[i](cell2);
  if (cell2.store)
    var store = cell2.data = new TupleStore();
  return cell2.add = function(t) {
    if (cell2.num += 1, !countOnly) {
      store && store.add(t);
      for (let i2 = 0; i2 < n; ++i2)
        a[i2].add(a[i2].get(t), t);
    }
  }, cell2.rem = function(t) {
    if (cell2.num -= 1, !countOnly) {
      store && store.rem(t);
      for (let i2 = 0; i2 < n; ++i2)
        a[i2].rem(a[i2].get(t), t);
    }
  }, cell2.set = function(t) {
    let i2, n2;
    for (store && store.values(), i2 = 0, n2 = counts.length; i2 < n2; ++i2) t[counts[i2]] = cell2.num;
    if (!countOnly) for (i2 = 0, n2 = a.length; i2 < n2; ++i2) a[i2].set(t);
  }, cell2.init = function() {
    cell2.num = 0, store && store.reset();
    for (let i2 = 0; i2 < n; ++i2) a[i2].init();
  }, cell2;
}
function Window(params2) {
  Transform.call(this, {}, params2), this._mlen = 0, this._mods = [];
}
Window.Definition = {
  type: "Window",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "sort",
    type: "compare"
  }, {
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "ops",
    type: "enum",
    array: !0,
    values: ValidWindowOps.concat(ValidAggregateOps)
  }, {
    name: "params",
    type: "number",
    null: !0,
    array: !0
  }, {
    name: "aggregate_params",
    type: "number",
    null: !0,
    array: !0
  }, {
    name: "fields",
    type: "field",
    null: !0,
    array: !0
  }, {
    name: "as",
    type: "string",
    null: !0,
    array: !0
  }, {
    name: "frame",
    type: "number",
    null: !0,
    array: !0,
    length: 2,
    default: [null, 0]
  }, {
    name: "ignorePeers",
    type: "boolean",
    default: !1
  }]
};
inherits_default(Window, Transform, {
  transform(_, pulse2) {
    this.stamp = pulse2.stamp;
    let mod = _.modified(), cmp = stableCompare(_.sort), key2 = groupkey(_.groupby), group2 = (t) => this.group(key2(t)), state = this.state;
    (!state || mod) && (state = this.state = new WindowState(_)), mod || pulse2.modified(state.inputs) ? (this.value = {}, pulse2.visit(pulse2.SOURCE, (t) => group2(t).add(t))) : (pulse2.visit(pulse2.REM, (t) => group2(t).remove(t)), pulse2.visit(pulse2.ADD, (t) => group2(t).add(t)));
    for (let i = 0, n = this._mlen; i < n; ++i)
      processPartition(this._mods[i], state, cmp, _);
    return this._mlen = 0, this._mods = [], pulse2.reflow(mod).modifies(state.outputs);
  },
  group(key2) {
    let group2 = this.value[key2];
    return group2 || (group2 = this.value[key2] = SortedList(tupleid), group2.stamp = -1), group2.stamp < this.stamp && (group2.stamp = this.stamp, this._mods[this._mlen++] = group2), group2;
  }
});
function processPartition(list, state, cmp, _) {
  let sort3 = _.sort, range7 = sort3 && !_.ignorePeers, frame2 = _.frame || [null, 0], data3 = list.data(cmp), n = data3.length, b10 = range7 ? bisector(sort3) : null, w2 = {
    i0: 0,
    i1: 0,
    p0: 0,
    p1: 0,
    index: 0,
    data: data3,
    compare: sort3 || constant_default(-1)
  };
  state.init();
  for (let i = 0; i < n; ++i)
    setWindow(w2, frame2, i, n), range7 && adjustRange(w2, b10), state.update(w2, data3[i]);
}
function clamp(x5, lo, hi) {
  return x5 < lo ? lo : x5 > hi ? hi : x5;
}
function setWindow(w2, f, i, n) {
  w2.p0 = w2.i0, w2.p1 = w2.i1;
  let start = f[0] == null ? 0 : i + f[0], endExclusive = f[1] == null ? n : i + f[1] + 1;
  w2.i0 = clamp(start, 0, n), w2.i1 = clamp(endExclusive, 0, n), w2.index = i;
}
function adjustRange(w2, bisect2) {
  let r0 = w2.i0, r1 = w2.i1 - 1, c = w2.compare, d = w2.data, n = d.length - 1;
  r0 > 0 && !c(d[r0], d[r0 - 1]) && (w2.i0 = bisect2.left(d, d[r0])), r1 < n && !c(d[r1], d[r1 + 1]) && (w2.i1 = bisect2.right(d, d[r1]));
}

// node_modules/vega-view-transforms/build/vega-view-transforms.js
var vega_view_transforms_exports = {};
__export(vega_view_transforms_exports, {
  bound: () => Bound,
  identifier: () => Identifier,
  mark: () => Mark,
  overlap: () => Overlap,
  render: () => Render,
  viewlayout: () => ViewLayout
});

// node_modules/d3-shape/src/constant.js
function constant_default2(x5) {
  return function() {
    return x5;
  };
}

// node_modules/d3-shape/src/math.js
var abs = Math.abs, atan2 = Math.atan2, cos = Math.cos, max2 = Math.max, min2 = Math.min, sin = Math.sin, sqrt = Math.sqrt, epsilon2 = 1e-12, pi = Math.PI, halfPi = pi / 2, tau = 2 * pi;
function acos(x5) {
  return x5 > 1 ? 0 : x5 < -1 ? pi : Math.acos(x5);
}
function asin(x5) {
  return x5 >= 1 ? halfPi : x5 <= -1 ? -halfPi : Math.asin(x5);
}

// node_modules/d3-path/src/path.js
var pi2 = Math.PI, tau2 = 2 * pi2, epsilon3 = 1e-6, tauEpsilon = tau2 - epsilon3;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i)
    this._ += arguments[i] + strings[i];
}
function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  let k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i)
      this._ += Math.round(arguments[i] * k) / k + strings[i];
  };
}
var Path = class {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x5, y5) {
    this._append`M${this._x0 = this._x1 = +x5},${this._y0 = this._y1 = +y5}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(x5, y5) {
    this._append`L${this._x1 = +x5},${this._y1 = +y5}`;
  }
  quadraticCurveTo(x12, y12, x5, y5) {
    this._append`Q${+x12},${+y12},${this._x1 = +x5},${this._y1 = +y5}`;
  }
  bezierCurveTo(x12, y12, x22, y22, x5, y5) {
    this._append`C${+x12},${+y12},${+x22},${+y22},${this._x1 = +x5},${this._y1 = +y5}`;
  }
  arcTo(x12, y12, x22, y22, r) {
    if (x12 = +x12, y12 = +y12, x22 = +x22, y22 = +y22, r = +r, r < 0) throw new Error(`negative radius: ${r}`);
    let x06 = this._x1, y06 = this._y1, x21 = x22 - x12, y21 = y22 - y12, x01 = x06 - x12, y01 = y06 - y12, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null)
      this._append`M${this._x1 = x12},${this._y1 = y12}`;
    else if (l01_2 > epsilon3) if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon3) || !r)
      this._append`L${this._x1 = x12},${this._y1 = y12}`;
    else {
      let x20 = x22 - x06, y20 = y22 - y06, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      Math.abs(t01 - 1) > epsilon3 && this._append`L${x12 + t01 * x01},${y12 + t01 * y01}`, this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x12 + t21 * x21},${this._y1 = y12 + t21 * y21}`;
    }
  }
  arc(x5, y5, r, a0, a1, ccw2) {
    if (x5 = +x5, y5 = +y5, r = +r, ccw2 = !!ccw2, r < 0) throw new Error(`negative radius: ${r}`);
    let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x06 = x5 + dx, y06 = y5 + dy, cw2 = 1 ^ ccw2, da2 = ccw2 ? a0 - a1 : a1 - a0;
    this._x1 === null ? this._append`M${x06},${y06}` : (Math.abs(this._x1 - x06) > epsilon3 || Math.abs(this._y1 - y06) > epsilon3) && this._append`L${x06},${y06}`, r && (da2 < 0 && (da2 = da2 % tau2 + tau2), da2 > tauEpsilon ? this._append`A${r},${r},0,1,${cw2},${x5 - dx},${y5 - dy}A${r},${r},0,1,${cw2},${this._x1 = x06},${this._y1 = y06}` : da2 > epsilon3 && this._append`A${r},${r},0,${+(da2 >= pi2)},${cw2},${this._x1 = x5 + r * Math.cos(a1)},${this._y1 = y5 + r * Math.sin(a1)}`);
  }
  rect(x5, y5, w2, h2) {
    this._append`M${this._x0 = this._x1 = +x5},${this._y0 = this._y1 = +y5}h${w2 = +w2}v${+h2}h${-w2}Z`;
  }
  toString() {
    return this._;
  }
};
function path() {
  return new Path();
}
path.prototype = Path.prototype;

// node_modules/d3-shape/src/path.js
function withPath(shape2) {
  let digits = 3;
  return shape2.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null)
      digits = null;
    else {
      let d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape2;
  }, () => new Path(digits);
}

// node_modules/d3-shape/src/arc.js
function arcInnerRadius(d) {
  return d.innerRadius;
}
function arcOuterRadius(d) {
  return d.outerRadius;
}
function arcStartAngle(d) {
  return d.startAngle;
}
function arcEndAngle(d) {
  return d.endAngle;
}
function arcPadAngle(d) {
  return d && d.padAngle;
}
function intersect(x06, y06, x12, y12, x22, y22, x32, y32) {
  var x10 = x12 - x06, y10 = y12 - y06, x322 = x32 - x22, y322 = y32 - y22, t = y322 * x10 - x322 * y10;
  if (!(t * t < epsilon2))
    return t = (x322 * (y06 - y22) - y322 * (x06 - x22)) / t, [x06 + t * x10, y06 + t * y10];
}
function cornerTangents(x06, y06, x12, y12, r1, rc, cw2) {
  var x01 = x06 - x12, y01 = y06 - y12, lo = (cw2 ? rc : -rc) / sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x06 + ox, y11 = y06 + oy, x10 = x12 + ox, y10 = y12 + oy, x004 = (x11 + x10) / 2, y004 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D4 = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt(max2(0, r * r * d2 - D4 * D4)), cx0 = (D4 * dy - dx * d) / d2, cy0 = (-D4 * dx - dy * d) / d2, cx1 = (D4 * dy + dx * d) / d2, cy1 = (-D4 * dx + dy * d) / d2, dx0 = cx0 - x004, dy0 = cy0 - y004, dx1 = cx1 - x004, dy1 = cy1 - y004;
  return dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1 && (cx0 = cx1, cy0 = cy1), {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}
function arc_default() {
  var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant_default2(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context3 = null, path3 = withPath(arc4);
  function arc4() {
    var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da2 = abs(a1 - a0), cw2 = a1 > a0;
    if (context3 || (context3 = buffer = path3()), r1 < r0 && (r = r1, r1 = r0, r0 = r), !(r1 > epsilon2)) context3.moveTo(0, 0);
    else if (da2 > tau - epsilon2)
      context3.moveTo(r1 * cos(a0), r1 * sin(a0)), context3.arc(0, 0, r1, a0, a1, !cw2), r0 > epsilon2 && (context3.moveTo(r0 * cos(a1), r0 * sin(a1)), context3.arc(0, 0, r0, a1, a0, cw2));
    else {
      var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da2, da1 = da2, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon2 && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)), rc = min2(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t04, t13;
      if (rp > epsilon2) {
        var p02 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
        (da0 -= p02 * 2) > epsilon2 ? (p02 *= cw2 ? 1 : -1, a00 += p02, a10 -= p02) : (da0 = 0, a00 = a10 = (a0 + a1) / 2), (da1 -= p1 * 2) > epsilon2 ? (p1 *= cw2 ? 1 : -1, a01 += p1, a11 -= p1) : (da1 = 0, a01 = a11 = (a0 + a1) / 2);
      }
      var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
      if (rc > epsilon2) {
        var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x004 = r0 * cos(a00), y004 = r0 * sin(a00), oc;
        if (da2 < pi)
          if (oc = intersect(x01, y01, x004, y004, x11, y11, x10, y10)) {
            var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2), lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min2(rc, (r0 - lc) / (kc - 1)), rc1 = min2(rc, (r1 - lc) / (kc + 1));
          } else
            rc0 = rc1 = 0;
      }
      da1 > epsilon2 ? rc1 > epsilon2 ? (t04 = cornerTangents(x004, y004, x01, y01, r1, rc1, cw2), t13 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw2), context3.moveTo(t04.cx + t04.x01, t04.cy + t04.y01), rc1 < rc ? context3.arc(t04.cx, t04.cy, rc1, atan2(t04.y01, t04.x01), atan2(t13.y01, t13.x01), !cw2) : (context3.arc(t04.cx, t04.cy, rc1, atan2(t04.y01, t04.x01), atan2(t04.y11, t04.x11), !cw2), context3.arc(0, 0, r1, atan2(t04.cy + t04.y11, t04.cx + t04.x11), atan2(t13.cy + t13.y11, t13.cx + t13.x11), !cw2), context3.arc(t13.cx, t13.cy, rc1, atan2(t13.y11, t13.x11), atan2(t13.y01, t13.x01), !cw2))) : (context3.moveTo(x01, y01), context3.arc(0, 0, r1, a01, a11, !cw2)) : context3.moveTo(x01, y01), !(r0 > epsilon2) || !(da0 > epsilon2) ? context3.lineTo(x10, y10) : rc0 > epsilon2 ? (t04 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw2), t13 = cornerTangents(x01, y01, x004, y004, r0, -rc0, cw2), context3.lineTo(t04.cx + t04.x01, t04.cy + t04.y01), rc0 < rc ? context3.arc(t04.cx, t04.cy, rc0, atan2(t04.y01, t04.x01), atan2(t13.y01, t13.x01), !cw2) : (context3.arc(t04.cx, t04.cy, rc0, atan2(t04.y01, t04.x01), atan2(t04.y11, t04.x11), !cw2), context3.arc(0, 0, r0, atan2(t04.cy + t04.y11, t04.cx + t04.x11), atan2(t13.cy + t13.y11, t13.cx + t13.x11), cw2), context3.arc(t13.cx, t13.cy, rc0, atan2(t13.y11, t13.x11), atan2(t13.y01, t13.x01), !cw2))) : context3.arc(0, 0, r0, a10, a00, cw2);
    }
    if (context3.closePath(), buffer) return context3 = null, buffer + "" || null;
  }
  return arc4.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
    return [cos(a) * r, sin(a) * r];
  }, arc4.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ == "function" ? _ : constant_default2(+_), arc4) : innerRadius;
  }, arc4.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ == "function" ? _ : constant_default2(+_), arc4) : outerRadius;
  }, arc4.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ == "function" ? _ : constant_default2(+_), arc4) : cornerRadius;
  }, arc4.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ == "function" ? _ : constant_default2(+_), arc4) : padRadius;
  }, arc4.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ == "function" ? _ : constant_default2(+_), arc4) : startAngle;
  }, arc4.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ == "function" ? _ : constant_default2(+_), arc4) : endAngle;
  }, arc4.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ == "function" ? _ : constant_default2(+_), arc4) : padAngle;
  }, arc4.context = function(_) {
    return arguments.length ? (context3 = _ ?? null, arc4) : context3;
  }, arc4;
}

// node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;
function array_default2(x5) {
  return typeof x5 == "object" && "length" in x5 ? x5 : Array.from(x5);
}

// node_modules/d3-shape/src/curve/linear.js
function Linear(context3) {
  this._context = context3;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(x5, y5) : this._context.moveTo(x5, y5);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(x5, y5);
        break;
    }
  }
};
function linear_default(context3) {
  return new Linear(context3);
}

// node_modules/d3-shape/src/point.js
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}

// node_modules/d3-shape/src/line.js
function line_default(x5, y5) {
  var defined2 = constant_default2(!0), context3 = null, curve2 = linear_default, output4 = null, path3 = withPath(line4);
  x5 = typeof x5 == "function" ? x5 : x5 === void 0 ? x : constant_default2(x5), y5 = typeof y5 == "function" ? y5 : y5 === void 0 ? y : constant_default2(y5);
  function line4(data3) {
    var i, n = (data3 = array_default2(data3)).length, d, defined0 = !1, buffer;
    for (context3 == null && (output4 = curve2(buffer = path3())), i = 0; i <= n; ++i)
      !(i < n && defined2(d = data3[i], i, data3)) === defined0 && ((defined0 = !defined0) ? output4.lineStart() : output4.lineEnd()), defined0 && output4.point(+x5(d, i, data3), +y5(d, i, data3));
    if (buffer) return output4 = null, buffer + "" || null;
  }
  return line4.x = function(_) {
    return arguments.length ? (x5 = typeof _ == "function" ? _ : constant_default2(+_), line4) : x5;
  }, line4.y = function(_) {
    return arguments.length ? (y5 = typeof _ == "function" ? _ : constant_default2(+_), line4) : y5;
  }, line4.defined = function(_) {
    return arguments.length ? (defined2 = typeof _ == "function" ? _ : constant_default2(!!_), line4) : defined2;
  }, line4.curve = function(_) {
    return arguments.length ? (curve2 = _, context3 != null && (output4 = curve2(context3)), line4) : curve2;
  }, line4.context = function(_) {
    return arguments.length ? (_ == null ? context3 = output4 = null : output4 = curve2(context3 = _), line4) : context3;
  }, line4;
}

// node_modules/d3-shape/src/area.js
function area_default(x06, y06, y12) {
  var x12 = null, defined2 = constant_default2(!0), context3 = null, curve2 = linear_default, output4 = null, path3 = withPath(area4);
  x06 = typeof x06 == "function" ? x06 : x06 === void 0 ? x : constant_default2(+x06), y06 = typeof y06 == "function" ? y06 : y06 === void 0 ? constant_default2(0) : constant_default2(+y06), y12 = typeof y12 == "function" ? y12 : y12 === void 0 ? y : constant_default2(+y12);
  function area4(data3) {
    var i, j2, k, n = (data3 = array_default2(data3)).length, d, defined0 = !1, buffer, x0z = new Array(n), y0z = new Array(n);
    for (context3 == null && (output4 = curve2(buffer = path3())), i = 0; i <= n; ++i) {
      if (!(i < n && defined2(d = data3[i], i, data3)) === defined0)
        if (defined0 = !defined0)
          j2 = i, output4.areaStart(), output4.lineStart();
        else {
          for (output4.lineEnd(), output4.lineStart(), k = i - 1; k >= j2; --k)
            output4.point(x0z[k], y0z[k]);
          output4.lineEnd(), output4.areaEnd();
        }
      defined0 && (x0z[i] = +x06(d, i, data3), y0z[i] = +y06(d, i, data3), output4.point(x12 ? +x12(d, i, data3) : x0z[i], y12 ? +y12(d, i, data3) : y0z[i]));
    }
    if (buffer) return output4 = null, buffer + "" || null;
  }
  function arealine() {
    return line_default().defined(defined2).curve(curve2).context(context3);
  }
  return area4.x = function(_) {
    return arguments.length ? (x06 = typeof _ == "function" ? _ : constant_default2(+_), x12 = null, area4) : x06;
  }, area4.x0 = function(_) {
    return arguments.length ? (x06 = typeof _ == "function" ? _ : constant_default2(+_), area4) : x06;
  }, area4.x1 = function(_) {
    return arguments.length ? (x12 = _ == null ? null : typeof _ == "function" ? _ : constant_default2(+_), area4) : x12;
  }, area4.y = function(_) {
    return arguments.length ? (y06 = typeof _ == "function" ? _ : constant_default2(+_), y12 = null, area4) : y06;
  }, area4.y0 = function(_) {
    return arguments.length ? (y06 = typeof _ == "function" ? _ : constant_default2(+_), area4) : y06;
  }, area4.y1 = function(_) {
    return arguments.length ? (y12 = _ == null ? null : typeof _ == "function" ? _ : constant_default2(+_), area4) : y12;
  }, area4.lineX0 = area4.lineY0 = function() {
    return arealine().x(x06).y(y06);
  }, area4.lineY1 = function() {
    return arealine().x(x06).y(y12);
  }, area4.lineX1 = function() {
    return arealine().x(x12).y(y06);
  }, area4.defined = function(_) {
    return arguments.length ? (defined2 = typeof _ == "function" ? _ : constant_default2(!!_), area4) : defined2;
  }, area4.curve = function(_) {
    return arguments.length ? (curve2 = _, context3 != null && (output4 = curve2(context3)), area4) : curve2;
  }, area4.context = function(_) {
    return arguments.length ? (_ == null ? context3 = output4 = null : output4 = curve2(context3 = _), area4) : context3;
  }, area4;
}

// node_modules/d3-shape/src/symbol/circle.js
var circle_default = {
  draw(context3, size) {
    let r = sqrt(size / pi);
    context3.moveTo(r, 0), context3.arc(0, 0, r, 0, tau);
  }
};

// node_modules/d3-shape/src/symbol.js
function Symbol2(type3, size) {
  let context3 = null, path3 = withPath(symbol3);
  type3 = typeof type3 == "function" ? type3 : constant_default2(type3 || circle_default), size = typeof size == "function" ? size : constant_default2(size === void 0 ? 64 : +size);
  function symbol3() {
    let buffer;
    if (context3 || (context3 = buffer = path3()), type3.apply(this, arguments).draw(context3, +size.apply(this, arguments)), buffer) return context3 = null, buffer + "" || null;
  }
  return symbol3.type = function(_) {
    return arguments.length ? (type3 = typeof _ == "function" ? _ : constant_default2(_), symbol3) : type3;
  }, symbol3.size = function(_) {
    return arguments.length ? (size = typeof _ == "function" ? _ : constant_default2(+_), symbol3) : size;
  }, symbol3.context = function(_) {
    return arguments.length ? (context3 = _ ?? null, symbol3) : context3;
  }, symbol3;
}

// node_modules/d3-shape/src/noop.js
function noop_default() {
}

// node_modules/d3-shape/src/curve/basis.js
function point(that, x5, y5) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x5) / 6,
    (that._y0 + 4 * that._y1 + y5) / 6
  );
}
function Basis(context3) {
  this._context = context3;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(x5, y5) : this._context.moveTo(x5, y5);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        point(this, x5, y5);
        break;
    }
    this._x0 = this._x1, this._x1 = x5, this._y0 = this._y1, this._y1 = y5;
  }
};
function basis_default(context3) {
  return new Basis(context3);
}

// node_modules/d3-shape/src/curve/basisClosed.js
function BasisClosed(context3) {
  this._context = context3;
}
BasisClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1, this._x2 = x5, this._y2 = y5;
        break;
      case 1:
        this._point = 2, this._x3 = x5, this._y3 = y5;
        break;
      case 2:
        this._point = 3, this._x4 = x5, this._y4 = y5, this._context.moveTo((this._x0 + 4 * this._x1 + x5) / 6, (this._y0 + 4 * this._y1 + y5) / 6);
        break;
      default:
        point(this, x5, y5);
        break;
    }
    this._x0 = this._x1, this._x1 = x5, this._y0 = this._y1, this._y1 = y5;
  }
};
function basisClosed_default(context3) {
  return new BasisClosed(context3);
}

// node_modules/d3-shape/src/curve/basisOpen.js
function BasisOpen(context3) {
  this._context = context3;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x06 = (this._x0 + 4 * this._x1 + x5) / 6, y06 = (this._y0 + 4 * this._y1 + y5) / 6;
        this._line ? this._context.lineTo(x06, y06) : this._context.moveTo(x06, y06);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point(this, x5, y5);
        break;
    }
    this._x0 = this._x1, this._x1 = x5, this._y0 = this._y1, this._y1 = y5;
  }
};
function basisOpen_default(context3) {
  return new BasisOpen(context3);
}

// node_modules/d3-shape/src/curve/bundle.js
function Bundle(context3, beta) {
  this._basis = new Basis(context3), this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [], this._y = [], this._basis.lineStart();
  },
  lineEnd: function() {
    var x5 = this._x, y5 = this._y, j2 = x5.length - 1;
    if (j2 > 0)
      for (var x06 = x5[0], y06 = y5[0], dx = x5[j2] - x06, dy = y5[j2] - y06, i = -1, t; ++i <= j2; )
        t = i / j2, this._basis.point(
          this._beta * x5[i] + (1 - this._beta) * (x06 + t * dx),
          this._beta * y5[i] + (1 - this._beta) * (y06 + t * dy)
        );
    this._x = this._y = null, this._basis.lineEnd();
  },
  point: function(x5, y5) {
    this._x.push(+x5), this._y.push(+y5);
  }
};
var bundle_default = (function custom2(beta) {
  function bundle2(context3) {
    return beta === 1 ? new Basis(context3) : new Bundle(context3, beta);
  }
  return bundle2.beta = function(beta2) {
    return custom2(+beta2);
  }, bundle2;
})(0.85);

// node_modules/d3-shape/src/curve/cardinal.js
function point2(that, x5, y5) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x5),
    that._y2 + that._k * (that._y1 - y5),
    that._x2,
    that._y2
  );
}
function Cardinal(context3, tension) {
  this._context = context3, this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point2(this, this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(x5, y5) : this._context.moveTo(x5, y5);
        break;
      case 1:
        this._point = 2, this._x1 = x5, this._y1 = y5;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        point2(this, x5, y5);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x5, this._y0 = this._y1, this._y1 = this._y2, this._y2 = y5;
  }
};
var cardinal_default = (function custom3(tension) {
  function cardinal(context3) {
    return new Cardinal(context3, tension);
  }
  return cardinal.tension = function(tension2) {
    return custom3(+tension2);
  }, cardinal;
})(0);

// node_modules/d3-shape/src/curve/cardinalClosed.js
function CardinalClosed(context3, tension) {
  this._context = context3, this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1, this._x3 = x5, this._y3 = y5;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = x5, this._y4 = y5);
        break;
      case 2:
        this._point = 3, this._x5 = x5, this._y5 = y5;
        break;
      default:
        point2(this, x5, y5);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x5, this._y0 = this._y1, this._y1 = this._y2, this._y2 = y5;
  }
};
var cardinalClosed_default = (function custom4(tension) {
  function cardinal(context3) {
    return new CardinalClosed(context3, tension);
  }
  return cardinal.tension = function(tension2) {
    return custom4(+tension2);
  }, cardinal;
})(0);

// node_modules/d3-shape/src/curve/cardinalOpen.js
function CardinalOpen(context3, tension) {
  this._context = context3, this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point2(this, x5, y5);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x5, this._y0 = this._y1, this._y1 = this._y2, this._y2 = y5;
  }
};
var cardinalOpen_default = (function custom5(tension) {
  function cardinal(context3) {
    return new CardinalOpen(context3, tension);
  }
  return cardinal.tension = function(tension2) {
    return custom5(+tension2);
  }, cardinal;
})(0);

// node_modules/d3-shape/src/curve/catmullRom.js
function point3(that, x5, y5) {
  var x12 = that._x1, y12 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon2) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x12 = (x12 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n, y12 = (y12 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }
  if (that._l23_a > epsilon2) {
    var b10 = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b10 + that._x1 * that._l23_2a - x5 * that._l12_2a) / m, y22 = (y22 * b10 + that._y1 * that._l23_2a - y5 * that._l12_2a) / m;
  }
  that._context.bezierCurveTo(x12, y12, x22, y22, that._x2, that._y2);
}
function CatmullRom(context3, alpha) {
  this._context = context3, this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    if (x5 = +x5, y5 = +y5, this._point) {
      var x23 = this._x2 - x5, y23 = this._y2 - y5;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(x5, y5) : this._context.moveTo(x5, y5);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        point3(this, x5, y5);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = x5, this._y0 = this._y1, this._y1 = this._y2, this._y2 = y5;
  }
};
var catmullRom_default = (function custom6(alpha) {
  function catmullRom(context3) {
    return alpha ? new CatmullRom(context3, alpha) : new Cardinal(context3, 0);
  }
  return catmullRom.alpha = function(alpha2) {
    return custom6(+alpha2);
  }, catmullRom;
})(0.5);

// node_modules/d3-shape/src/curve/catmullRomClosed.js
function CatmullRomClosed(context3, alpha) {
  this._context = context3, this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x5, y5) {
    if (x5 = +x5, y5 = +y5, this._point) {
      var x23 = this._x2 - x5, y23 = this._y2 - y5;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._x3 = x5, this._y3 = y5;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = x5, this._y4 = y5);
        break;
      case 2:
        this._point = 3, this._x5 = x5, this._y5 = y5;
        break;
      default:
        point3(this, x5, y5);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = x5, this._y0 = this._y1, this._y1 = this._y2, this._y2 = y5;
  }
};
var catmullRomClosed_default = (function custom7(alpha) {
  function catmullRom(context3) {
    return alpha ? new CatmullRomClosed(context3, alpha) : new CardinalClosed(context3, 0);
  }
  return catmullRom.alpha = function(alpha2) {
    return custom7(+alpha2);
  }, catmullRom;
})(0.5);

// node_modules/d3-shape/src/curve/catmullRomOpen.js
function CatmullRomOpen(context3, alpha) {
  this._context = context3, this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    if (x5 = +x5, y5 = +y5, this._point) {
      var x23 = this._x2 - x5, y23 = this._y2 - y5;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        point3(this, x5, y5);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = x5, this._y0 = this._y1, this._y1 = this._y2, this._y2 = y5;
  }
};
var catmullRomOpen_default = (function custom8(alpha) {
  function catmullRom(context3) {
    return alpha ? new CatmullRomOpen(context3, alpha) : new CardinalOpen(context3, 0);
  }
  return catmullRom.alpha = function(alpha2) {
    return custom8(+alpha2);
  }, catmullRom;
})(0.5);

// node_modules/d3-shape/src/curve/linearClosed.js
function LinearClosed(context3) {
  this._context = context3;
}
LinearClosed.prototype = {
  areaStart: noop_default,
  areaEnd: noop_default,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(x5, y5) {
    x5 = +x5, y5 = +y5, this._point ? this._context.lineTo(x5, y5) : (this._point = 1, this._context.moveTo(x5, y5));
  }
};
function linearClosed_default(context3) {
  return new LinearClosed(context3);
}

// node_modules/d3-shape/src/curve/monotone.js
function sign(x5) {
  return x5 < 0 ? -1 : 1;
}
function slope3(that, x22, y22) {
  var h0 = that._x1 - that._x0, h1 = x22 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y22 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
function slope2(that, t) {
  var h2 = that._x1 - that._x0;
  return h2 ? (3 * (that._y1 - that._y0) / h2 - t) / 2 : t;
}
function point4(that, t04, t13) {
  var x06 = that._x0, y06 = that._y0, x12 = that._x1, y12 = that._y1, dx = (x12 - x06) / 3;
  that._context.bezierCurveTo(x06 + dx, y06 + dx * t04, x12 - dx, y12 - dx * t13, x12, y12);
}
function MonotoneX(context3) {
  this._context = context3;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point4(this, this._t0, slope2(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(x5, y5) {
    var t13 = NaN;
    if (x5 = +x5, y5 = +y5, !(x5 === this._x1 && y5 === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(x5, y5) : this._context.moveTo(x5, y5);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, point4(this, slope2(this, t13 = slope3(this, x5, y5)), t13);
          break;
        default:
          point4(this, this._t0, t13 = slope3(this, x5, y5));
          break;
      }
      this._x0 = this._x1, this._x1 = x5, this._y0 = this._y1, this._y1 = y5, this._t0 = t13;
    }
  }
};
function MonotoneY(context3) {
  this._context = new ReflectContext(context3);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x5, y5) {
  MonotoneX.prototype.point.call(this, y5, x5);
};
function ReflectContext(context3) {
  this._context = context3;
}
ReflectContext.prototype = {
  moveTo: function(x5, y5) {
    this._context.moveTo(y5, x5);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x5, y5) {
    this._context.lineTo(y5, x5);
  },
  bezierCurveTo: function(x12, y12, x22, y22, x5, y5) {
    this._context.bezierCurveTo(y12, x12, y22, x22, y5, x5);
  }
};
function monotoneX(context3) {
  return new MonotoneX(context3);
}
function monotoneY(context3) {
  return new MonotoneY(context3);
}

// node_modules/d3-shape/src/curve/natural.js
function Natural(context3) {
  this._context = context3;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var x5 = this._x, y5 = this._y, n = x5.length;
    if (n)
      if (this._line ? this._context.lineTo(x5[0], y5[0]) : this._context.moveTo(x5[0], y5[0]), n === 2)
        this._context.lineTo(x5[1], y5[1]);
      else
        for (var px2 = controlPoints(x5), py2 = controlPoints(y5), i0 = 0, i1 = 1; i1 < n; ++i0, ++i1)
          this._context.bezierCurveTo(px2[0][i0], py2[0][i0], px2[1][i0], py2[1][i0], x5[i1], y5[i1]);
    (this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(x5, y5) {
    this._x.push(+x5), this._y.push(+y5);
  }
};
function controlPoints(x5) {
  var i, n = x5.length - 1, m, a = new Array(n), b10 = new Array(n), r = new Array(n);
  for (a[0] = 0, b10[0] = 2, r[0] = x5[0] + 2 * x5[1], i = 1; i < n - 1; ++i) a[i] = 1, b10[i] = 4, r[i] = 4 * x5[i] + 2 * x5[i + 1];
  for (a[n - 1] = 2, b10[n - 1] = 7, r[n - 1] = 8 * x5[n - 1] + x5[n], i = 1; i < n; ++i) m = a[i] / b10[i - 1], b10[i] -= m, r[i] -= m * r[i - 1];
  for (a[n - 1] = r[n - 1] / b10[n - 1], i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b10[i];
  for (b10[n - 1] = (x5[n] + a[n - 1]) / 2, i = 0; i < n - 1; ++i) b10[i] = 2 * x5[i + 1] - a[i + 1];
  return [a, b10];
}
function natural_default(context3) {
  return new Natural(context3);
}

// node_modules/d3-shape/src/curve/step.js
function Step(context3, t) {
  this._context = context3, this._t = t;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(x5, y5) {
    switch (x5 = +x5, y5 = +y5, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(x5, y5) : this._context.moveTo(x5, y5);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, y5), this._context.lineTo(x5, y5);
        else {
          var x12 = this._x * (1 - this._t) + x5 * this._t;
          this._context.lineTo(x12, this._y), this._context.lineTo(x12, y5);
        }
        break;
      }
    }
    this._x = x5, this._y = y5;
  }
};
function step_default(context3) {
  return new Step(context3, 0.5);
}
function stepBefore(context3) {
  return new Step(context3, 0);
}
function stepAfter(context3) {
  return new Step(context3, 1);
}

// node_modules/vega-canvas/build/vega-canvas.node.js
function domCanvas(w2, h2) {
  if (typeof document < "u" && document.createElement) {
    let c = document.createElement("canvas");
    if (c && c.getContext)
      return c.width = w2, c.height = h2, c;
  }
  return null;
}
var domImage = () => typeof Image < "u" ? Image : null, NodeCanvas;
try {
  NodeCanvas = await import("canvas"), NodeCanvas && NodeCanvas.createCanvas || (NodeCanvas = null);
} catch {
}
function nodeCanvas(w2, h2, type3) {
  if (NodeCanvas)
    try {
      return new NodeCanvas.Canvas(w2, h2, type3);
    } catch {
    }
  return null;
}
var nodeImage = () => NodeCanvas && NodeCanvas.Image || null;
function canvas(w2, h2, type3) {
  return domCanvas(w2, h2) || nodeCanvas(w2, h2, type3) || null;
}
function image() {
  return domImage() || nodeImage() || null;
}

// node_modules/d3-scale/src/init.js
function initRange(domain4, range7) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain4);
      break;
    default:
      this.range(range7).domain(domain4);
      break;
  }
  return this;
}
function initInterpolator(domain4, interpolator) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof domain4 == "function" ? this.interpolator(domain4) : this.range(domain4);
      break;
    }
    default: {
      this.domain(domain4), typeof interpolator == "function" ? this.interpolator(interpolator) : this.range(interpolator);
      break;
    }
  }
  return this;
}

// node_modules/d3-scale/src/ordinal.js
var implicit = /* @__PURE__ */ Symbol("implicit");
function ordinal() {
  var index4 = new InternMap(), domain4 = [], range7 = [], unknown3 = implicit;
  function scale7(d) {
    let i = index4.get(d);
    if (i === void 0) {
      if (unknown3 !== implicit) return unknown3;
      index4.set(d, i = domain4.push(d) - 1);
    }
    return range7[i % range7.length];
  }
  return scale7.domain = function(_) {
    if (!arguments.length) return domain4.slice();
    domain4 = [], index4 = new InternMap();
    for (let value3 of _)
      index4.has(value3) || index4.set(value3, domain4.push(value3) - 1);
    return scale7;
  }, scale7.range = function(_) {
    return arguments.length ? (range7 = Array.from(_), scale7) : range7.slice();
  }, scale7.unknown = function(_) {
    return arguments.length ? (unknown3 = _, scale7) : unknown3;
  }, scale7.copy = function() {
    return ordinal(domain4, range7).unknown(unknown3);
  }, initRange.apply(scale7, arguments), scale7;
}

// node_modules/d3-interpolate/src/index.js
var src_exports = {};
__export(src_exports, {
  interpolate: () => value_default,
  interpolateArray: () => array_default3,
  interpolateBasis: () => basis_default2,
  interpolateBasisClosed: () => basisClosed_default2,
  interpolateCubehelix: () => cubehelix_default,
  interpolateCubehelixLong: () => cubehelixLong,
  interpolateDate: () => date_default,
  interpolateDiscrete: () => discrete_default,
  interpolateHcl: () => hcl_default,
  interpolateHclLong: () => hclLong,
  interpolateHsl: () => hsl_default,
  interpolateHslLong: () => hslLong,
  interpolateHue: () => hue_default,
  interpolateLab: () => lab2,
  interpolateNumber: () => number_default,
  interpolateNumberArray: () => numberArray_default,
  interpolateObject: () => object_default,
  interpolateRgb: () => rgb_default,
  interpolateRgbBasis: () => rgbBasis,
  interpolateRgbBasisClosed: () => rgbBasisClosed,
  interpolateRound: () => round_default,
  interpolateString: () => string_default,
  interpolateTransformCss: () => interpolateTransformCss,
  interpolateTransformSvg: () => interpolateTransformSvg,
  interpolateZoom: () => zoom_default,
  piecewise: () => piecewise,
  quantize: () => quantize_default
});

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype2) {
  constructor.prototype = factory.prototype = prototype2, prototype2.constructor = constructor;
}
function extend3(parent, definition3) {
  var prototype2 = Object.create(parent.prototype);
  for (var key2 in definition3) prototype2[key2] = definition3[key2];
  return prototype2;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7, brighter = 1 / darker, reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`), named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format5) {
  var m, l;
  return format5 = (format5 + "").trim().toLowerCase(), (m = reHex.exec(format5)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format5)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format5)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format5)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format5)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format5)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format5)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format5) ? rgbn(named[format5]) : format5 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b10, a) {
  return a <= 0 && (r = g = b10 = NaN), new Rgb(r, g, b10, a);
}
function rgbConvert(o) {
  return o instanceof Color || (o = color(o)), o ? (o = o.rgb(), new Rgb(o.r, o.g, o.b, o.opacity)) : new Rgb();
}
function rgb(r, g, b10, opacity2) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b10, opacity2 ?? 1);
}
function Rgb(r, g, b10, opacity2) {
  this.r = +r, this.g = +g, this.b = +b10, this.opacity = +opacity2;
}
define_default(Rgb, rgb, extend3(Color, {
  brighter(k) {
    return k = k == null ? brighter : Math.pow(brighter, k), new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    return k = k == null ? darker : Math.pow(darker, k), new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex3(this.r)}${hex3(this.g)}${hex3(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex3(this.r)}${hex3(this.g)}${hex3(this.b)}${hex3((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  let a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity2) {
  return isNaN(opacity2) ? 1 : Math.max(0, Math.min(1, opacity2));
}
function clampi(value3) {
  return Math.max(0, Math.min(255, Math.round(value3) || 0));
}
function hex3(value3) {
  return value3 = clampi(value3), (value3 < 16 ? "0" : "") + value3.toString(16);
}
function hsla(h2, s, l, a) {
  return a <= 0 ? h2 = s = l = NaN : l <= 0 || l >= 1 ? h2 = s = NaN : s <= 0 && (h2 = NaN), new Hsl(h2, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (o instanceof Color || (o = color(o)), !o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b10 = o.b / 255, min4 = Math.min(r, g, b10), max4 = Math.max(r, g, b10), h2 = NaN, s = max4 - min4, l = (max4 + min4) / 2;
  return s ? (r === max4 ? h2 = (g - b10) / s + (g < b10) * 6 : g === max4 ? h2 = (b10 - r) / s + 2 : h2 = (r - g) / s + 4, s /= l < 0.5 ? max4 + min4 : 2 - max4 - min4, h2 *= 60) : s = l > 0 && l < 1 ? 0 : h2, new Hsl(h2, s, l, o.opacity);
}
function hsl(h2, s, l, opacity2) {
  return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s, l, opacity2 ?? 1);
}
function Hsl(h2, s, l, opacity2) {
  this.h = +h2, this.s = +s, this.l = +l, this.opacity = +opacity2;
}
define_default(Hsl, hsl, extend3(Color, {
  brighter(k) {
    return k = k == null ? brighter : Math.pow(brighter, k), new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    return k = k == null ? darker : Math.pow(darker, k), new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h2 = this.h % 360 + (this.h < 0) * 360, s = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m2),
      hsl2rgb(h2, m1, m2),
      hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    let a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value3) {
  return value3 = (value3 || 0) % 360, value3 < 0 ? value3 + 360 : value3;
}
function clampt(value3) {
  return Math.max(0, Math.min(1, value3 || 0));
}
function hsl2rgb(h2, m1, m2) {
  return (h2 < 60 ? m1 + (m2 - m1) * h2 / 60 : h2 < 180 ? m2 : h2 < 240 ? m1 + (m2 - m1) * (240 - h2) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180, degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18, Xn = 0.96422, Yn = 1, Zn = 0.82521, t03 = 4 / 29, t12 = 6 / 29, t2 = 3 * t12 * t12, t3 = t12 * t12 * t12;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  o instanceof Rgb || (o = rgbConvert(o));
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b10 = rgb2lrgb(o.b), y5 = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b10) / Yn), x5, z2;
  return r === g && g === b10 ? x5 = z2 = y5 : (x5 = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b10) / Xn), z2 = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b10) / Zn)), new Lab(116 * y5 - 16, 500 * (x5 - y5), 200 * (y5 - z2), o.opacity);
}
function lab(l, a, b10, opacity2) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b10, opacity2 ?? 1);
}
function Lab(l, a, b10, opacity2) {
  this.l = +l, this.a = +a, this.b = +b10, this.opacity = +opacity2;
}
define_default(Lab, lab, extend3(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k ?? 1), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var y5 = (this.l + 16) / 116, x5 = isNaN(this.a) ? y5 : y5 + this.a / 500, z2 = isNaN(this.b) ? y5 : y5 - this.b / 200;
    return x5 = Xn * lab2xyz(x5), y5 = Yn * lab2xyz(y5), z2 = Zn * lab2xyz(z2), new Rgb(
      lrgb2rgb(3.1338561 * x5 - 1.6168667 * y5 - 0.4906146 * z2),
      lrgb2rgb(-0.9787684 * x5 + 1.9161415 * y5 + 0.033454 * z2),
      lrgb2rgb(0.0719453 * x5 - 0.2289914 * y5 + 1.4052427 * z2),
      this.opacity
    );
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t03;
}
function lab2xyz(t) {
  return t > t12 ? t * t * t : t2 * (t - t03);
}
function lrgb2rgb(x5) {
  return 255 * (x5 <= 31308e-7 ? 12.92 * x5 : 1.055 * Math.pow(x5, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x5) {
  return (x5 /= 255) <= 0.04045 ? x5 / 12.92 : Math.pow((x5 + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (o instanceof Lab || (o = labConvert(o)), o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h2 = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h2 < 0 ? h2 + 360 : h2, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h2, c, l, opacity2) {
  return arguments.length === 1 ? hclConvert(h2) : new Hcl(h2, c, l, opacity2 ?? 1);
}
function Hcl(h2, c, l, opacity2) {
  this.h = +h2, this.c = +c, this.l = +l, this.opacity = +opacity2;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h2 = o.h * radians;
  return new Lab(o.l, Math.cos(h2) * o.c, Math.sin(h2) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend3(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k ?? 1), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k ?? 1), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861, B = 1.78277, C = -0.29227, D2 = -0.90649, E = 1.97294, ED = E * D2, EB = E * B, BC_DA = B * C - D2 * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  o instanceof Rgb || (o = rgbConvert(o));
  var r = o.r / 255, g = o.g / 255, b10 = o.b / 255, l = (BC_DA * b10 + ED * r - EB * g) / (BC_DA + ED - EB), bl2 = b10 - l, k = (E * (g - l) - C * bl2) / D2, s = Math.sqrt(k * k + bl2 * bl2) / (E * l * (1 - l)), h2 = s ? Math.atan2(k, bl2) * degrees - 120 : NaN;
  return new Cubehelix(h2 < 0 ? h2 + 360 : h2, s, l, o.opacity);
}
function cubehelix(h2, s, l, opacity2) {
  return arguments.length === 1 ? cubehelixConvert(h2) : new Cubehelix(h2, s, l, opacity2 ?? 1);
}
function Cubehelix(h2, s, l, opacity2) {
  this.h = +h2, this.s = +s, this.l = +l, this.opacity = +opacity2;
}
define_default(Cubehelix, cubehelix, extend3(Color, {
  brighter(k) {
    return k = k == null ? brighter : Math.pow(brighter, k), new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    return k = k == null ? darker : Math.pow(darker, k), new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h2 = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh2 = Math.cos(h2), sinh2 = Math.sin(h2);
    return new Rgb(
      255 * (l + a * (A * cosh2 + B * sinh2)),
      255 * (l + a * (C * cosh2 + D2 * sinh2)),
      255 * (l + a * (E * cosh2)),
      this.opacity
    );
  }
}));

// node_modules/d3-interpolate/src/basis.js
function basis(t13, v0, v1, v2, v3) {
  var t22 = t13 * t13, t32 = t22 * t13;
  return ((1 - 3 * t13 + 3 * t22 - t32) * v0 + (4 - 6 * t22 + 3 * t32) * v1 + (1 + 3 * t13 + 3 * t22 - 3 * t32) * v2 + t32 * v3) / 6;
}
function basis_default2(values3) {
  var n = values3.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values3[i], v2 = values3[i + 1], v0 = i > 0 ? values3[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values3[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default2(values3) {
  var n = values3.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values3[(i + n - 1) % n], v1 = values3[i % n], v2 = values3[(i + 1) % n], v3 = values3[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default3 = (x5) => () => x5;

// node_modules/d3-interpolate/src/color.js
function linear2(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b10, y5) {
  return a = Math.pow(a, y5), b10 = Math.pow(b10, y5) - a, y5 = 1 / y5, function(t) {
    return Math.pow(a + t * b10, y5);
  };
}
function hue(a, b10) {
  var d = b10 - a;
  return d ? linear2(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant_default3(isNaN(a) ? b10 : a);
}
function gamma(y5) {
  return (y5 = +y5) == 1 ? nogamma : function(a, b10) {
    return b10 - a ? exponential(a, b10, y5) : constant_default3(isNaN(a) ? b10 : a);
  };
}
function nogamma(a, b10) {
  var d = b10 - a;
  return d ? linear2(a, d) : constant_default3(isNaN(a) ? b10 : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = (function rgbGamma(y5) {
  var color5 = gamma(y5);
  function rgb2(start, end) {
    var r = color5((start = rgb(start)).r, (end = rgb(end)).r), g = color5(start.g, end.g), b10 = color5(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      return start.r = r(t), start.g = g(t), start.b = b10(t), start.opacity = opacity2(t), start + "";
    };
  }
  return rgb2.gamma = rgbGamma, rgb2;
})(1);
function rgbSpline(spline) {
  return function(colors2) {
    var n = colors2.length, r = new Array(n), g = new Array(n), b10 = new Array(n), i, color5;
    for (i = 0; i < n; ++i)
      color5 = rgb(colors2[i]), r[i] = color5.r || 0, g[i] = color5.g || 0, b10[i] = color5.b || 0;
    return r = spline(r), g = spline(g), b10 = spline(b10), color5.opacity = 1, function(t) {
      return color5.r = r(t), color5.g = g(t), color5.b = b10(t), color5 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default2), rgbBasisClosed = rgbSpline(basisClosed_default2);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b10) {
  b10 || (b10 = []);
  var n = a ? Math.min(b10.length, a.length) : 0, c = b10.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b10[i] * t;
    return c;
  };
}
function isNumberArray(x5) {
  return ArrayBuffer.isView(x5) && !(x5 instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function array_default3(a, b10) {
  return (isNumberArray(b10) ? numberArray_default : genericArray)(a, b10);
}
function genericArray(a, b10) {
  var nb = b10 ? b10.length : 0, na = a ? Math.min(nb, a.length) : 0, x5 = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i) x5[i] = value_default(a[i], b10[i]);
  for (; i < nb; ++i) c[i] = b10[i];
  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x5[i](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b10) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b10 = +b10, function(t) {
    return d.setTime(a * (1 - t) + b10 * t), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b10) {
  return a = +a, b10 = +b10, function(t) {
    return a * (1 - t) + b10 * t;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a, b10) {
  var i = {}, c = {}, k;
  (a === null || typeof a != "object") && (a = {}), (b10 === null || typeof b10 != "object") && (b10 = {});
  for (k in b10)
    k in a ? i[k] = value_default(a[k], b10[k]) : c[k] = b10[k];
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero3(b10) {
  return function() {
    return b10;
  };
}
function one2(b10) {
  return function(t) {
    return b10(t) + "";
  };
}
function string_default(a, b10) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  for (a = a + "", b10 = b10 + ""; (am = reA.exec(a)) && (bm = reB.exec(b10)); )
    (bs = bm.index) > bi && (bs = b10.slice(bi, bs), s[i] ? s[i] += bs : s[++i] = bs), (am = am[0]) === (bm = bm[0]) ? s[i] ? s[i] += bm : s[++i] = bm : (s[++i] = null, q.push({ i, x: number_default(am, bm) })), bi = reB.lastIndex;
  return bi < b10.length && (bs = b10.slice(bi), s[i] ? s[i] += bs : s[++i] = bs), s.length < 2 ? q[0] ? one2(q[0].x) : zero3(b10) : (b10 = q.length, function(t) {
    for (var i2 = 0, o; i2 < b10; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b10) {
  var t = typeof b10, c;
  return b10 == null || t === "boolean" ? constant_default3(b10) : (t === "number" ? number_default : t === "string" ? (c = color(b10)) ? (b10 = c, rgb_default) : string_default : b10 instanceof color ? rgb_default : b10 instanceof Date ? date_default : isNumberArray(b10) ? numberArray_default : Array.isArray(b10) ? genericArray : typeof b10.valueOf != "function" && typeof b10.toString != "function" || isNaN(b10) ? object_default : number_default)(a, b10);
}

// node_modules/d3-interpolate/src/discrete.js
function discrete_default(range7) {
  var n = range7.length;
  return function(t) {
    return range7[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

// node_modules/d3-interpolate/src/hue.js
function hue_default(a, b10) {
  var i = hue(+a, +b10);
  return function(t) {
    var x5 = i(t);
    return x5 - 360 * Math.floor(x5 / 360);
  };
}

// node_modules/d3-interpolate/src/round.js
function round_default(a, b10) {
  return a = +a, b10 = +b10, function(t) {
    return Math.round(a * (1 - t) + b10 * t);
  };
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees2 = 180 / Math.PI, identity8 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b10, c, d, e, f) {
  var scaleX, scaleY2, skewX;
  return (scaleX = Math.sqrt(a * a + b10 * b10)) && (a /= scaleX, b10 /= scaleX), (skewX = a * c + b10 * d) && (c -= a * skewX, d -= b10 * skewX), (scaleY2 = Math.sqrt(c * c + d * d)) && (c /= scaleY2, d /= scaleY2, skewX /= scaleY2), a * d < b10 * c && (a = -a, b10 = -b10, skewX = -skewX, scaleX = -scaleX), {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b10, a) * degrees2,
    skewX: Math.atan(skewX) * degrees2,
    scaleX,
    scaleY: scaleY2
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value3) {
  let m = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(value3 + "");
  return m.isIdentity ? identity8 : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value3) {
  return value3 == null ? identity8 : (svgNode || (svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g")), svgNode.setAttribute("transform", value3), (value3 = svgNode.transform.baseVal.consolidate()) ? (value3 = value3.matrix, decompose_default(value3.a, value3.b, value3.c, value3.d, value3.e, value3.f)) : identity8);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse9, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate4(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else (xb || yb) && s.push("translate(" + xb + pxComma + yb + pxParen);
  }
  function rotate2(a, b10, s, q) {
    a !== b10 ? (a - b10 > 180 ? b10 += 360 : b10 - a > 180 && (a += 360), q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b10) })) : b10 && s.push(pop(s) + "rotate(" + b10 + degParen);
  }
  function skewX(a, b10, s, q) {
    a !== b10 ? q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b10) }) : b10 && s.push(pop(s) + "skewX(" + b10 + degParen);
  }
  function scale7(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else (xb !== 1 || yb !== 1) && s.push(pop(s) + "scale(" + xb + "," + yb + ")");
  }
  return function(a, b10) {
    var s = [], q = [];
    return a = parse9(a), b10 = parse9(b10), translate4(a.translateX, a.translateY, b10.translateX, b10.translateY, s, q), rotate2(a.rotate, b10.rotate, s, q), skewX(a.skewX, b10.skewX, s, q), scale7(a.scaleX, a.scaleY, b10.scaleX, b10.scaleY, s, q), a = b10 = null, function(t) {
      for (var i = -1, n = q.length, o; ++i < n; ) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)"), interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon22 = 1e-12;
function cosh(x5) {
  return ((x5 = Math.exp(x5)) + 1 / x5) / 2;
}
function sinh(x5) {
  return ((x5 = Math.exp(x5)) - 1 / x5) / 2;
}
function tanh(x5) {
  return ((x5 = Math.exp(2 * x5)) - 1) / (x5 + 1);
}
var zoom_default = (function zoomRho(rho, rho2, rho4) {
  function zoom3(p02, p1) {
    var ux0 = p02[0], uy0 = p02[1], w0 = p02[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon22)
      S = Math.log(w1 / w0) / rho, i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    else {
      var d1 = Math.sqrt(d2), b02 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b12 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b02 * b02 + 1) - b02), r1 = Math.log(Math.sqrt(b12 * b12 + 1) - b12);
      S = (r1 - r0) / rho, i = function(t) {
        var s = t * S, coshr0 = cosh(r0), u4 = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u4 * dx,
          uy0 + u4 * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    return i.duration = S * 1e3 * rho / Math.SQRT2, i;
  }
  return zoom3.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  }, zoom3;
})(Math.SQRT2, 2, 4);

// node_modules/d3-interpolate/src/hsl.js
function hsl2(hue2) {
  return function(start, end) {
    var h2 = hue2((start = hsl(start)).h, (end = hsl(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      return start.h = h2(t), start.s = s(t), start.l = l(t), start.opacity = opacity2(t), start + "";
    };
  };
}
var hsl_default = hsl2(hue), hslLong = hsl2(nogamma);

// node_modules/d3-interpolate/src/lab.js
function lab2(start, end) {
  var l = nogamma((start = lab(start)).l, (end = lab(end)).l), a = nogamma(start.a, end.a), b10 = nogamma(start.b, end.b), opacity2 = nogamma(start.opacity, end.opacity);
  return function(t) {
    return start.l = l(t), start.a = a(t), start.b = b10(t), start.opacity = opacity2(t), start + "";
  };
}

// node_modules/d3-interpolate/src/hcl.js
function hcl2(hue2) {
  return function(start, end) {
    var h2 = hue2((start = hcl(start)).h, (end = hcl(end)).h), c = nogamma(start.c, end.c), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
    return function(t) {
      return start.h = h2(t), start.c = c(t), start.l = l(t), start.opacity = opacity2(t), start + "";
    };
  };
}
var hcl_default = hcl2(hue), hclLong = hcl2(nogamma);

// node_modules/d3-interpolate/src/cubehelix.js
function cubehelix2(hue2) {
  return (function cubehelixGamma(y5) {
    y5 = +y5;
    function cubehelix3(start, end) {
      var h2 = hue2((start = cubehelix(start)).h, (end = cubehelix(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity2 = nogamma(start.opacity, end.opacity);
      return function(t) {
        return start.h = h2(t), start.s = s(t), start.l = l(Math.pow(t, y5)), start.opacity = opacity2(t), start + "";
      };
    }
    return cubehelix3.gamma = cubehelixGamma, cubehelix3;
  })(1);
}
var cubehelix_default = cubehelix2(hue), cubehelixLong = cubehelix2(nogamma);

// node_modules/d3-interpolate/src/piecewise.js
function piecewise(interpolate3, values3) {
  values3 === void 0 && (values3 = interpolate3, interpolate3 = value_default);
  for (var i = 0, n = values3.length - 1, v2 = values3[0], I = new Array(n < 0 ? 0 : n); i < n; ) I[i] = interpolate3(v2, v2 = values3[++i]);
  return function(t) {
    var i2 = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i2](t - i2);
  };
}

// node_modules/d3-interpolate/src/quantize.js
function quantize_default(interpolator, n) {
  for (var samples = new Array(n), i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

// node_modules/d3-scale/src/constant.js
function constants2(x5) {
  return function() {
    return x5;
  };
}

// node_modules/d3-scale/src/number.js
function number5(x5) {
  return +x5;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity9(x5) {
  return x5;
}
function normalize2(a, b10) {
  return (b10 -= a = +a) ? function(x5) {
    return (x5 - a) / b10;
  } : constants2(isNaN(b10) ? NaN : 0.5);
}
function clamper(a, b10) {
  var t;
  return a > b10 && (t = a, a = b10, b10 = t), function(x5) {
    return Math.max(a, Math.min(b10, x5));
  };
}
function bimap(domain4, range7, interpolate3) {
  var d0 = domain4[0], d1 = domain4[1], r0 = range7[0], r1 = range7[1];
  return d1 < d0 ? (d0 = normalize2(d1, d0), r0 = interpolate3(r1, r0)) : (d0 = normalize2(d0, d1), r0 = interpolate3(r0, r1)), function(x5) {
    return r0(d0(x5));
  };
}
function polymap(domain4, range7, interpolate3) {
  var j2 = Math.min(domain4.length, range7.length) - 1, d = new Array(j2), r = new Array(j2), i = -1;
  for (domain4[j2] < domain4[0] && (domain4 = domain4.slice().reverse(), range7 = range7.slice().reverse()); ++i < j2; )
    d[i] = normalize2(domain4[i], domain4[i + 1]), r[i] = interpolate3(range7[i], range7[i + 1]);
  return function(x5) {
    var i2 = bisect_default(domain4, x5, 1, j2) - 1;
    return r[i2](d[i2](x5));
  };
}
function copy2(source4, target3) {
  return target3.domain(source4.domain()).range(source4.range()).interpolate(source4.interpolate()).clamp(source4.clamp()).unknown(source4.unknown());
}
function transformer() {
  var domain4 = unit, range7 = unit, interpolate3 = value_default, transform5, untransform, unknown3, clamp3 = identity9, piecewise2, output4, input2;
  function rescale() {
    var n = Math.min(domain4.length, range7.length);
    return clamp3 !== identity9 && (clamp3 = clamper(domain4[0], domain4[n - 1])), piecewise2 = n > 2 ? polymap : bimap, output4 = input2 = null, scale7;
  }
  function scale7(x5) {
    return x5 == null || isNaN(x5 = +x5) ? unknown3 : (output4 || (output4 = piecewise2(domain4.map(transform5), range7, interpolate3)))(transform5(clamp3(x5)));
  }
  return scale7.invert = function(y5) {
    return clamp3(untransform((input2 || (input2 = piecewise2(range7, domain4.map(transform5), number_default)))(y5)));
  }, scale7.domain = function(_) {
    return arguments.length ? (domain4 = Array.from(_, number5), rescale()) : domain4.slice();
  }, scale7.range = function(_) {
    return arguments.length ? (range7 = Array.from(_), rescale()) : range7.slice();
  }, scale7.rangeRound = function(_) {
    return range7 = Array.from(_), interpolate3 = round_default, rescale();
  }, scale7.clamp = function(_) {
    return arguments.length ? (clamp3 = _ ? !0 : identity9, rescale()) : clamp3 !== identity9;
  }, scale7.interpolate = function(_) {
    return arguments.length ? (interpolate3 = _, rescale()) : interpolate3;
  }, scale7.unknown = function(_) {
    return arguments.length ? (unknown3 = _, scale7) : unknown3;
  }, function(t, u4) {
    return transform5 = t, untransform = u4, rescale();
  };
}
function continuous() {
  return transformer()(identity9, identity9);
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start, stop2, count4, specifier) {
  var step = tickStep(start, stop2, count4), precision;
  switch (specifier = formatSpecifier(specifier ?? ",f"), specifier.type) {
    case "s": {
      var value3 = Math.max(Math.abs(start), Math.abs(stop2));
      return specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value3)) && (specifier.precision = precision), formatPrefix(specifier, value3);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start), Math.abs(stop2)))) && (specifier.precision = precision - (specifier.type === "e"));
      break;
    }
    case "f":
    case "%": {
      specifier.precision == null && !isNaN(precision = precisionFixed_default(step)) && (specifier.precision = precision - (specifier.type === "%") * 2);
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale7) {
  var domain4 = scale7.domain;
  return scale7.ticks = function(count4) {
    var d = domain4();
    return ticks(d[0], d[d.length - 1], count4 ?? 10);
  }, scale7.tickFormat = function(count4, specifier) {
    var d = domain4();
    return tickFormat(d[0], d[d.length - 1], count4 ?? 10, specifier);
  }, scale7.nice = function(count4) {
    count4 == null && (count4 = 10);
    var d = domain4(), i0 = 0, i1 = d.length - 1, start = d[i0], stop2 = d[i1], prestep, step, maxIter = 10;
    for (stop2 < start && (step = start, start = stop2, stop2 = step, step = i0, i0 = i1, i1 = step); maxIter-- > 0; ) {
      if (step = tickIncrement(start, stop2, count4), step === prestep)
        return d[i0] = start, d[i1] = stop2, domain4(d);
      if (step > 0)
        start = Math.floor(start / step) * step, stop2 = Math.ceil(stop2 / step) * step;
      else if (step < 0)
        start = Math.ceil(start * step) / step, stop2 = Math.floor(stop2 * step) / step;
      else
        break;
      prestep = step;
    }
    return scale7;
  }, scale7;
}
function linear3() {
  var scale7 = continuous();
  return scale7.copy = function() {
    return copy2(scale7, linear3());
  }, initRange.apply(scale7, arguments), linearish(scale7);
}

// node_modules/d3-scale/src/identity.js
function identity10(domain4) {
  var unknown3;
  function scale7(x5) {
    return x5 == null || isNaN(x5 = +x5) ? unknown3 : x5;
  }
  return scale7.invert = scale7, scale7.domain = scale7.range = function(_) {
    return arguments.length ? (domain4 = Array.from(_, number5), scale7) : domain4.slice();
  }, scale7.unknown = function(_) {
    return arguments.length ? (unknown3 = _, scale7) : unknown3;
  }, scale7.copy = function() {
    return identity10(domain4).unknown(unknown3);
  }, domain4 = arguments.length ? Array.from(domain4, number5) : [0, 1], linearish(scale7);
}

// node_modules/d3-scale/src/nice.js
function nice(domain4, interval3) {
  domain4 = domain4.slice();
  var i0 = 0, i1 = domain4.length - 1, x06 = domain4[i0], x12 = domain4[i1], t;
  return x12 < x06 && (t = i0, i0 = i1, i1 = t, t = x06, x06 = x12, x12 = t), domain4[i0] = interval3.floor(x06), domain4[i1] = interval3.ceil(x12), domain4;
}

// node_modules/d3-scale/src/log.js
function transformLog(x5) {
  return Math.log(x5);
}
function transformExp(x5) {
  return Math.exp(x5);
}
function transformLogn(x5) {
  return -Math.log(-x5);
}
function transformExpn(x5) {
  return -Math.exp(-x5);
}
function pow10(x5) {
  return isFinite(x5) ? +("1e" + x5) : x5 < 0 ? 0 : x5;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : (x5) => Math.pow(base, x5);
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x5) => Math.log(x5) / base);
}
function reflect(f) {
  return (x5, k) => -f(-x5, k);
}
function loggish(transform5) {
  let scale7 = transform5(transformLog, transformExp), domain4 = scale7.domain, base = 10, logs, pows;
  function rescale() {
    return logs = logp(base), pows = powp(base), domain4()[0] < 0 ? (logs = reflect(logs), pows = reflect(pows), transform5(transformLogn, transformExpn)) : transform5(transformLog, transformExp), scale7;
  }
  return scale7.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  }, scale7.domain = function(_) {
    return arguments.length ? (domain4(_), rescale()) : domain4();
  }, scale7.ticks = (count4) => {
    let d = domain4(), u4 = d[0], v2 = d[d.length - 1], r = v2 < u4;
    r && ([u4, v2] = [v2, u4]);
    let i = logs(u4), j2 = logs(v2), k, t, n = count4 == null ? 10 : +count4, z2 = [];
    if (!(base % 1) && j2 - i < n) {
      if (i = Math.floor(i), j2 = Math.ceil(j2), u4 > 0) {
        for (; i <= j2; ++i)
          for (k = 1; k < base; ++k)
            if (t = i < 0 ? k / pows(-i) : k * pows(i), !(t < u4)) {
              if (t > v2) break;
              z2.push(t);
            }
      } else for (; i <= j2; ++i)
        for (k = base - 1; k >= 1; --k)
          if (t = i > 0 ? k / pows(-i) : k * pows(i), !(t < u4)) {
            if (t > v2) break;
            z2.push(t);
          }
      z2.length * 2 < n && (z2 = ticks(u4, v2, n));
    } else
      z2 = ticks(i, j2, Math.min(j2 - i, n)).map(pows);
    return r ? z2.reverse() : z2;
  }, scale7.tickFormat = (count4, specifier) => {
    if (count4 == null && (count4 = 10), specifier == null && (specifier = base === 10 ? "s" : ","), typeof specifier != "function" && (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null && (specifier.trim = !0), specifier = format(specifier)), count4 === 1 / 0) return specifier;
    let k = Math.max(1, base * count4 / scale7.ticks().length);
    return (d) => {
      let i = d / pows(Math.round(logs(d)));
      return i * base < base - 0.5 && (i *= base), i <= k ? specifier(d) : "";
    };
  }, scale7.nice = () => domain4(nice(domain4(), {
    floor: (x5) => pows(Math.floor(logs(x5))),
    ceil: (x5) => pows(Math.ceil(logs(x5)))
  })), scale7;
}
function log4() {
  let scale7 = loggish(transformer()).domain([1, 10]);
  return scale7.copy = () => copy2(scale7, log4()).base(scale7.base()), initRange.apply(scale7, arguments), scale7;
}

// node_modules/d3-scale/src/symlog.js
function transformSymlog(c) {
  return function(x5) {
    return Math.sign(x5) * Math.log1p(Math.abs(x5 / c));
  };
}
function transformSymexp(c) {
  return function(x5) {
    return Math.sign(x5) * Math.expm1(Math.abs(x5)) * c;
  };
}
function symlogish(transform5) {
  var c = 1, scale7 = transform5(transformSymlog(c), transformSymexp(c));
  return scale7.constant = function(_) {
    return arguments.length ? transform5(transformSymlog(c = +_), transformSymexp(c)) : c;
  }, linearish(scale7);
}
function symlog2() {
  var scale7 = symlogish(transformer());
  return scale7.copy = function() {
    return copy2(scale7, symlog2()).constant(scale7.constant());
  }, initRange.apply(scale7, arguments);
}

// node_modules/d3-scale/src/pow.js
function transformPow(exponent2) {
  return function(x5) {
    return x5 < 0 ? -Math.pow(-x5, exponent2) : Math.pow(x5, exponent2);
  };
}
function transformSqrt(x5) {
  return x5 < 0 ? -Math.sqrt(-x5) : Math.sqrt(x5);
}
function transformSquare(x5) {
  return x5 < 0 ? -x5 * x5 : x5 * x5;
}
function powish(transform5) {
  var scale7 = transform5(identity9, identity9), exponent2 = 1;
  function rescale() {
    return exponent2 === 1 ? transform5(identity9, identity9) : exponent2 === 0.5 ? transform5(transformSqrt, transformSquare) : transform5(transformPow(exponent2), transformPow(1 / exponent2));
  }
  return scale7.exponent = function(_) {
    return arguments.length ? (exponent2 = +_, rescale()) : exponent2;
  }, linearish(scale7);
}
function pow3() {
  var scale7 = powish(transformer());
  return scale7.copy = function() {
    return copy2(scale7, pow3()).exponent(scale7.exponent());
  }, initRange.apply(scale7, arguments), scale7;
}
function sqrt2() {
  return pow3.apply(null, arguments).exponent(0.5);
}

// node_modules/d3-scale/src/quantile.js
function quantile2() {
  var domain4 = [], range7 = [], thresholds = [], unknown3;
  function rescale() {
    var i = 0, n = Math.max(1, range7.length);
    for (thresholds = new Array(n - 1); ++i < n; ) thresholds[i - 1] = quantileSorted(domain4, i / n);
    return scale7;
  }
  function scale7(x5) {
    return x5 == null || isNaN(x5 = +x5) ? unknown3 : range7[bisect_default(thresholds, x5)];
  }
  return scale7.invertExtent = function(y5) {
    var i = range7.indexOf(y5);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain4[0],
      i < thresholds.length ? thresholds[i] : domain4[domain4.length - 1]
    ];
  }, scale7.domain = function(_) {
    if (!arguments.length) return domain4.slice();
    domain4 = [];
    for (let d of _) d != null && !isNaN(d = +d) && domain4.push(d);
    return domain4.sort(ascending2), rescale();
  }, scale7.range = function(_) {
    return arguments.length ? (range7 = Array.from(_), rescale()) : range7.slice();
  }, scale7.unknown = function(_) {
    return arguments.length ? (unknown3 = _, scale7) : unknown3;
  }, scale7.quantiles = function() {
    return thresholds.slice();
  }, scale7.copy = function() {
    return quantile2().domain(domain4).range(range7).unknown(unknown3);
  }, initRange.apply(scale7, arguments);
}

// node_modules/d3-scale/src/quantize.js
function quantize() {
  var x06 = 0, x12 = 1, n = 1, domain4 = [0.5], range7 = [0, 1], unknown3;
  function scale7(x5) {
    return x5 != null && x5 <= x5 ? range7[bisect_default(domain4, x5, 0, n)] : unknown3;
  }
  function rescale() {
    var i = -1;
    for (domain4 = new Array(n); ++i < n; ) domain4[i] = ((i + 1) * x12 - (i - n) * x06) / (n + 1);
    return scale7;
  }
  return scale7.domain = function(_) {
    return arguments.length ? ([x06, x12] = _, x06 = +x06, x12 = +x12, rescale()) : [x06, x12];
  }, scale7.range = function(_) {
    return arguments.length ? (n = (range7 = Array.from(_)).length - 1, rescale()) : range7.slice();
  }, scale7.invertExtent = function(y5) {
    var i = range7.indexOf(y5);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x06, domain4[0]] : i >= n ? [domain4[n - 1], x12] : [domain4[i - 1], domain4[i]];
  }, scale7.unknown = function(_) {
    return arguments.length && (unknown3 = _), scale7;
  }, scale7.thresholds = function() {
    return domain4.slice();
  }, scale7.copy = function() {
    return quantize().domain([x06, x12]).range(range7).unknown(unknown3);
  }, initRange.apply(linearish(scale7), arguments);
}

// node_modules/d3-scale/src/threshold.js
function threshold() {
  var domain4 = [0.5], range7 = [0, 1], unknown3, n = 1;
  function scale7(x5) {
    return x5 != null && x5 <= x5 ? range7[bisect_default(domain4, x5, 0, n)] : unknown3;
  }
  return scale7.domain = function(_) {
    return arguments.length ? (domain4 = Array.from(_), n = Math.min(domain4.length, range7.length - 1), scale7) : domain4.slice();
  }, scale7.range = function(_) {
    return arguments.length ? (range7 = Array.from(_), n = Math.min(domain4.length, range7.length - 1), scale7) : range7.slice();
  }, scale7.invertExtent = function(y5) {
    var i = range7.indexOf(y5);
    return [domain4[i - 1], domain4[i]];
  }, scale7.unknown = function(_) {
    return arguments.length ? (unknown3 = _, scale7) : unknown3;
  }, scale7.copy = function() {
    return threshold().domain(domain4).range(range7).unknown(unknown3);
  }, initRange.apply(scale7, arguments);
}

// node_modules/d3-scale/src/time.js
function date5(t) {
  return new Date(t);
}
function number6(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function calendar(ticks2, tickInterval, year, month, week2, day, hour, minute, second2, format5) {
  var scale7 = continuous(), invert3 = scale7.invert, domain4 = scale7.domain, formatMillisecond = format5(".%L"), formatSecond = format5(":%S"), formatMinute = format5("%I:%M"), formatHour = format5("%I %p"), formatDay = format5("%a %d"), formatWeek = format5("%b %d"), formatMonth = format5("%B"), formatYear3 = format5("%Y");
  function tickFormat3(date6) {
    return (second2(date6) < date6 ? formatMillisecond : minute(date6) < date6 ? formatSecond : hour(date6) < date6 ? formatMinute : day(date6) < date6 ? formatHour : month(date6) < date6 ? week2(date6) < date6 ? formatDay : formatWeek : year(date6) < date6 ? formatMonth : formatYear3)(date6);
  }
  return scale7.invert = function(y5) {
    return new Date(invert3(y5));
  }, scale7.domain = function(_) {
    return arguments.length ? domain4(Array.from(_, number6)) : domain4().map(date5);
  }, scale7.ticks = function(interval3) {
    var d = domain4();
    return ticks2(d[0], d[d.length - 1], interval3 ?? 10);
  }, scale7.tickFormat = function(count4, specifier) {
    return specifier == null ? tickFormat3 : format5(specifier);
  }, scale7.nice = function(interval3) {
    var d = domain4();
    return (!interval3 || typeof interval3.range != "function") && (interval3 = tickInterval(d[0], d[d.length - 1], interval3 ?? 10)), interval3 ? domain4(nice(d, interval3)) : scale7;
  }, scale7.copy = function() {
    return copy2(scale7, calendar(ticks2, tickInterval, year, month, week2, day, hour, minute, second2, format5));
  }, scale7;
}
function time3() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale/src/utcTime.js
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}

// node_modules/d3-scale/src/sequential.js
function transformer2() {
  var x06 = 0, x12 = 1, t04, t13, k10, transform5, interpolator = identity9, clamp3 = !1, unknown3;
  function scale7(x5) {
    return x5 == null || isNaN(x5 = +x5) ? unknown3 : interpolator(k10 === 0 ? 0.5 : (x5 = (transform5(x5) - t04) * k10, clamp3 ? Math.max(0, Math.min(1, x5)) : x5));
  }
  scale7.domain = function(_) {
    return arguments.length ? ([x06, x12] = _, t04 = transform5(x06 = +x06), t13 = transform5(x12 = +x12), k10 = t04 === t13 ? 0 : 1 / (t13 - t04), scale7) : [x06, x12];
  }, scale7.clamp = function(_) {
    return arguments.length ? (clamp3 = !!_, scale7) : clamp3;
  }, scale7.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale7) : interpolator;
  };
  function range7(interpolate3) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate3(r0, r1), scale7) : [interpolator(0), interpolator(1)];
    };
  }
  return scale7.range = range7(value_default), scale7.rangeRound = range7(round_default), scale7.unknown = function(_) {
    return arguments.length ? (unknown3 = _, scale7) : unknown3;
  }, function(t) {
    return transform5 = t, t04 = t(x06), t13 = t(x12), k10 = t04 === t13 ? 0 : 1 / (t13 - t04), scale7;
  };
}
function copy3(source4, target3) {
  return target3.domain(source4.domain()).interpolator(source4.interpolator()).clamp(source4.clamp()).unknown(source4.unknown());
}
function sequential() {
  var scale7 = linearish(transformer2()(identity9));
  return scale7.copy = function() {
    return copy3(scale7, sequential());
  }, initInterpolator.apply(scale7, arguments);
}
function sequentialLog() {
  var scale7 = loggish(transformer2()).domain([1, 10]);
  return scale7.copy = function() {
    return copy3(scale7, sequentialLog()).base(scale7.base());
  }, initInterpolator.apply(scale7, arguments);
}
function sequentialSymlog() {
  var scale7 = symlogish(transformer2());
  return scale7.copy = function() {
    return copy3(scale7, sequentialSymlog()).constant(scale7.constant());
  }, initInterpolator.apply(scale7, arguments);
}
function sequentialPow() {
  var scale7 = powish(transformer2());
  return scale7.copy = function() {
    return copy3(scale7, sequentialPow()).exponent(scale7.exponent());
  }, initInterpolator.apply(scale7, arguments);
}
function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}

// node_modules/d3-scale/src/diverging.js
function transformer3() {
  var x06 = 0, x12 = 0.5, x22 = 1, s = 1, t04, t13, t22, k10, k21, interpolator = identity9, transform5, clamp3 = !1, unknown3;
  function scale7(x5) {
    return isNaN(x5 = +x5) ? unknown3 : (x5 = 0.5 + ((x5 = +transform5(x5)) - t13) * (s * x5 < s * t13 ? k10 : k21), interpolator(clamp3 ? Math.max(0, Math.min(1, x5)) : x5));
  }
  scale7.domain = function(_) {
    return arguments.length ? ([x06, x12, x22] = _, t04 = transform5(x06 = +x06), t13 = transform5(x12 = +x12), t22 = transform5(x22 = +x22), k10 = t04 === t13 ? 0 : 0.5 / (t13 - t04), k21 = t13 === t22 ? 0 : 0.5 / (t22 - t13), s = t13 < t04 ? -1 : 1, scale7) : [x06, x12, x22];
  }, scale7.clamp = function(_) {
    return arguments.length ? (clamp3 = !!_, scale7) : clamp3;
  }, scale7.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale7) : interpolator;
  };
  function range7(interpolate3) {
    return function(_) {
      var r0, r1, r2;
      return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate3, [r0, r1, r2]), scale7) : [interpolator(0), interpolator(0.5), interpolator(1)];
    };
  }
  return scale7.range = range7(value_default), scale7.rangeRound = range7(round_default), scale7.unknown = function(_) {
    return arguments.length ? (unknown3 = _, scale7) : unknown3;
  }, function(t) {
    return transform5 = t, t04 = t(x06), t13 = t(x12), t22 = t(x22), k10 = t04 === t13 ? 0 : 0.5 / (t13 - t04), k21 = t13 === t22 ? 0 : 0.5 / (t22 - t13), s = t13 < t04 ? -1 : 1, scale7;
  };
}
function diverging() {
  var scale7 = linearish(transformer3()(identity9));
  return scale7.copy = function() {
    return copy3(scale7, diverging());
  }, initInterpolator.apply(scale7, arguments);
}
function divergingLog() {
  var scale7 = loggish(transformer3()).domain([0.1, 1, 10]);
  return scale7.copy = function() {
    return copy3(scale7, divergingLog()).base(scale7.base());
  }, initInterpolator.apply(scale7, arguments);
}
function divergingSymlog() {
  var scale7 = symlogish(transformer3());
  return scale7.copy = function() {
    return copy3(scale7, divergingSymlog()).constant(scale7.constant());
  }, initInterpolator.apply(scale7, arguments);
}
function divergingPow() {
  var scale7 = powish(transformer3());
  return scale7.copy = function() {
    return copy3(scale7, divergingPow()).exponent(scale7.exponent());
  }, initInterpolator.apply(scale7, arguments);
}
function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

// node_modules/d3-scale-chromatic/src/colors.js
function colors_default(specifier) {
  for (var n = specifier.length / 6 | 0, colors2 = new Array(n), i = 0; i < n; ) colors2[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors2;
}

// node_modules/d3-scale-chromatic/src/categorical/category10.js
var category10_default = colors_default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

// node_modules/d3-scale-chromatic/src/categorical/Accent.js
var Accent_default = colors_default("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

// node_modules/d3-scale-chromatic/src/categorical/Dark2.js
var Dark2_default = colors_default("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

// node_modules/d3-scale-chromatic/src/categorical/observable10.js
var observable10_default = colors_default("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0");

// node_modules/d3-scale-chromatic/src/categorical/Paired.js
var Paired_default = colors_default("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

// node_modules/d3-scale-chromatic/src/categorical/Pastel1.js
var Pastel1_default = colors_default("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

// node_modules/d3-scale-chromatic/src/categorical/Pastel2.js
var Pastel2_default = colors_default("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

// node_modules/d3-scale-chromatic/src/categorical/Set1.js
var Set1_default = colors_default("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

// node_modules/d3-scale-chromatic/src/categorical/Set2.js
var Set2_default = colors_default("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

// node_modules/d3-scale-chromatic/src/categorical/Set3.js
var Set3_default = colors_default("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

// node_modules/vega-scale/build/vega-scale.js
function bandSpace(count4, paddingInner2, paddingOuter2) {
  let space = count4 - paddingInner2 + paddingOuter2 * 2;
  return count4 ? space > 0 ? space : 1 : 0;
}
var Identity = "identity", Linear2 = "linear", Log = "log", Pow = "pow", Sqrt = "sqrt", Symlog = "symlog", Time = "time", UTC = "utc", Sequential = "sequential", Diverging = "diverging", Quantile2 = "quantile", Quantize = "quantize", Threshold = "threshold", Ordinal = "ordinal", Point = "point", Band = "band", BinOrdinal = "bin-ordinal", Continuous = "continuous", Discrete = "discrete", Discretizing = "discretizing", Interpolating = "interpolating", Temporal = "temporal";
function invertRange(scale7) {
  return function(_) {
    let lo = _[0], hi = _[1], t;
    return hi < lo && (t = lo, lo = hi, hi = t), [scale7.invert(lo), scale7.invert(hi)];
  };
}
function invertRangeExtent(scale7) {
  return function(_) {
    let range7 = scale7.range(), lo = _[0], hi = _[1], min4 = -1, max4, t, i, n;
    for (hi < lo && (t = lo, lo = hi, hi = t), i = 0, n = range7.length; i < n; ++i)
      range7[i] >= lo && range7[i] <= hi && (min4 < 0 && (min4 = i), max4 = i);
    if (!(min4 < 0))
      return lo = scale7.invertExtent(range7[min4]), hi = scale7.invertExtent(range7[max4]), [lo[0] === void 0 ? lo[1] : lo[0], hi[1] === void 0 ? hi[0] : hi[1]];
  };
}
function band() {
  let scale7 = ordinal().unknown(void 0), domain4 = scale7.domain, ordinalRange = scale7.range, range$1 = [0, 1], step, bandwidth2, round2 = !1, paddingInner2 = 0, paddingOuter2 = 0, align2 = 0.5;
  delete scale7.unknown;
  function rescale() {
    let n = domain4().length, reverse3 = range$1[1] < range$1[0], stop2 = range$1[1 - reverse3], space = bandSpace(n, paddingInner2, paddingOuter2), start = range$1[reverse3 - 0];
    step = (stop2 - start) / (space || 1), round2 && (step = Math.floor(step)), start += (stop2 - start - step * (n - paddingInner2)) * align2, bandwidth2 = step * (1 - paddingInner2), round2 && (start = Math.round(start), bandwidth2 = Math.round(bandwidth2));
    let values3 = range2(n).map((i) => start + step * i);
    return ordinalRange(reverse3 ? values3.reverse() : values3);
  }
  return scale7.domain = function(_) {
    return arguments.length ? (domain4(_), rescale()) : domain4();
  }, scale7.range = function(_) {
    return arguments.length ? (range$1 = [+_[0], +_[1]], rescale()) : range$1.slice();
  }, scale7.rangeRound = function(_) {
    return range$1 = [+_[0], +_[1]], round2 = !0, rescale();
  }, scale7.bandwidth = function() {
    return bandwidth2;
  }, scale7.step = function() {
    return step;
  }, scale7.round = function(_) {
    return arguments.length ? (round2 = !!_, rescale()) : round2;
  }, scale7.padding = function(_) {
    return arguments.length ? (paddingOuter2 = Math.max(0, Math.min(1, _)), paddingInner2 = paddingOuter2, rescale()) : paddingInner2;
  }, scale7.paddingInner = function(_) {
    return arguments.length ? (paddingInner2 = Math.max(0, Math.min(1, _)), rescale()) : paddingInner2;
  }, scale7.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter2 = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter2;
  }, scale7.align = function(_) {
    return arguments.length ? (align2 = Math.max(0, Math.min(1, _)), rescale()) : align2;
  }, scale7.invertRange = function(_) {
    if (_[0] == null || _[1] == null) return;
    let reverse3 = range$1[1] < range$1[0], values3 = reverse3 ? ordinalRange().reverse() : ordinalRange(), n = values3.length - 1, lo = +_[0], hi = +_[1], a, b10, t;
    if (!(lo !== lo || hi !== hi) && (hi < lo && (t = lo, lo = hi, hi = t), !(hi < values3[0] || lo > range$1[1 - reverse3])))
      return a = Math.max(0, bisectRight(values3, lo) - 1), b10 = lo === hi ? a : bisectRight(values3, hi) - 1, lo - values3[a] > bandwidth2 + 1e-10 && ++a, reverse3 && (t = a, a = n - b10, b10 = n - t), a > b10 ? void 0 : domain4().slice(a, b10 + 1);
  }, scale7.invert = function(_) {
    let value3 = scale7.invertRange([_, _]);
    return value3 && value3[0];
  }, scale7.copy = function() {
    return band().domain(domain4()).range(range$1).round(round2).paddingInner(paddingInner2).paddingOuter(paddingOuter2).align(align2);
  }, rescale();
}
function pointish(scale7) {
  let copy5 = scale7.copy;
  return scale7.padding = scale7.paddingOuter, delete scale7.paddingInner, scale7.copy = function() {
    return pointish(copy5());
  }, scale7;
}
function point5() {
  return pointish(band().paddingInner(1));
}
var map3 = Array.prototype.map;
function numbers3(_) {
  return map3.call(_, toNumber);
}
var slice2 = Array.prototype.slice;
function scaleBinOrdinal() {
  let domain4 = [], range7 = [];
  function scale7(x5) {
    return x5 == null || x5 !== x5 ? void 0 : range7[(bisect_default(domain4, x5) - 1) % range7.length];
  }
  return scale7.domain = function(_) {
    return arguments.length ? (domain4 = numbers3(_), scale7) : domain4.slice();
  }, scale7.range = function(_) {
    return arguments.length ? (range7 = slice2.call(_), scale7) : range7.slice();
  }, scale7.tickFormat = function(count4, specifier) {
    return tickFormat(domain4[0], peek(domain4), count4 ?? 10, specifier);
  }, scale7.copy = function() {
    return scaleBinOrdinal().domain(scale7.domain()).range(scale7.range());
  }, scale7;
}
var scales = /* @__PURE__ */ new Map(), VEGA_SCALE = /* @__PURE__ */ Symbol("vega_scale");
function registerScale(scale7) {
  return scale7[VEGA_SCALE] = !0, scale7;
}
function isRegisteredScale(scale7) {
  return scale7 && scale7[VEGA_SCALE] === !0;
}
function create(type3, constructor, metadata2) {
  let ctr = function() {
    let s = constructor();
    return s.invertRange || (s.invertRange = s.invert ? invertRange(s) : s.invertExtent ? invertRangeExtent(s) : void 0), s.type = type3, registerScale(s);
  };
  return ctr.metadata = toSet(array_default(metadata2)), ctr;
}
function scale(type3, scale7, metadata2) {
  return arguments.length > 1 ? (scales.set(type3, create(type3, scale7, metadata2)), this) : isValidScaleType(type3) ? scales.get(type3) : void 0;
}
scale(Identity, identity10);
scale(Linear2, linear3, Continuous);
scale(Log, log4, [Continuous, Log]);
scale(Pow, pow3, Continuous);
scale(Sqrt, sqrt2, Continuous);
scale(Symlog, symlog2, Continuous);
scale(Time, time3, [Continuous, Temporal]);
scale(UTC, utcTime, [Continuous, Temporal]);
scale(Sequential, sequential, [Continuous, Interpolating]);
scale(`${Sequential}-${Linear2}`, sequential, [Continuous, Interpolating]);
scale(`${Sequential}-${Log}`, sequentialLog, [Continuous, Interpolating, Log]);
scale(`${Sequential}-${Pow}`, sequentialPow, [Continuous, Interpolating]);
scale(`${Sequential}-${Sqrt}`, sequentialSqrt, [Continuous, Interpolating]);
scale(`${Sequential}-${Symlog}`, sequentialSymlog, [Continuous, Interpolating]);
scale(`${Diverging}-${Linear2}`, diverging, [Continuous, Interpolating]);
scale(`${Diverging}-${Log}`, divergingLog, [Continuous, Interpolating, Log]);
scale(`${Diverging}-${Pow}`, divergingPow, [Continuous, Interpolating]);
scale(`${Diverging}-${Sqrt}`, divergingSqrt, [Continuous, Interpolating]);
scale(`${Diverging}-${Symlog}`, divergingSymlog, [Continuous, Interpolating]);
scale(Quantile2, quantile2, [Discretizing, Quantile2]);
scale(Quantize, quantize, Discretizing);
scale(Threshold, threshold, Discretizing);
scale(BinOrdinal, scaleBinOrdinal, [Discrete, Discretizing]);
scale(Ordinal, ordinal, Discrete);
scale(Band, band, Discrete);
scale(Point, point5, Discrete);
function isValidScaleType(type3) {
  return scales.has(type3);
}
function hasType(key2, type3) {
  let s = scales.get(key2);
  return s && s.metadata[type3];
}
function isContinuous(key2) {
  return hasType(key2, Continuous);
}
function isDiscrete(key2) {
  return hasType(key2, Discrete);
}
function isDiscretizing(key2) {
  return hasType(key2, Discretizing);
}
function isLogarithmic(key2) {
  return hasType(key2, Log);
}
function isTemporal(key2) {
  return hasType(key2, Temporal);
}
function isInterpolating(key2) {
  return hasType(key2, Interpolating);
}
function isQuantile(key2) {
  return hasType(key2, Quantile2);
}
var scaleProps = ["clamp", "base", "constant", "exponent"];
function interpolateRange(interpolator, range7) {
  let start = range7[0], span = peek(range7) - start;
  return function(i) {
    return interpolator(start + i * span);
  };
}
function interpolateColors(colors2, type3, gamma2) {
  return piecewise(interpolate(type3 || "rgb", gamma2), colors2);
}
function quantizeInterpolator(interpolator, count4) {
  let samples = new Array(count4), n = count4 + 1;
  for (let i = 0; i < count4; ) samples[i] = interpolator(++i / n);
  return samples;
}
function scaleFraction(scale$12, min4, max4) {
  let delta = max4 - min4, i, t, s;
  return !delta || !Number.isFinite(delta) ? constant_default(0.5) : (i = (t = scale$12.type).indexOf("-"), t = i < 0 ? t : t.slice(i + 1), s = scale(t)().domain([min4, max4]).range([0, 1]), scaleProps.forEach((m) => scale$12[m] ? s[m](scale$12[m]()) : 0), s);
}
function interpolate(type3, gamma2) {
  let interp = src_exports[method(type3)];
  return gamma2 != null && interp && interp.gamma ? interp.gamma(gamma2) : interp;
}
function method(type3) {
  return "interpolate" + type3.toLowerCase().split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
}
var continuous2 = {
  blues: "cfe1f2bed8eca8cee58fc1de74b2d75ba3cf4592c63181bd206fb2125ca40a4a90",
  greens: "d3eecdc0e6baabdda594d3917bc77d60ba6c46ab5e329a512089430e7735036429",
  greys: "e2e2e2d4d4d4c4c4c4b1b1b19d9d9d8888887575756262624d4d4d3535351e1e1e",
  oranges: "fdd8b3fdc998fdb87bfda55efc9244f87f2cf06b18e4580bd14904b93d029f3303",
  purples: "e2e1efd4d4e8c4c5e0b4b3d6a3a0cc928ec3827cb97566ae684ea25c3696501f8c",
  reds: "fdc9b4fcb49afc9e80fc8767fa7051f6573fec3f2fdc2a25c81b1db21218970b13",
  blueGreen: "d5efedc1e8e0a7ddd18bd2be70c6a958ba9144ad77319c5d2089460e7736036429",
  bluePurple: "ccddecbad0e4a8c2dd9ab0d4919cc98d85be8b6db28a55a6873c99822287730f71",
  greenBlue: "d3eecec5e8c3b1e1bb9bd8bb82cec269c2ca51b2cd3c9fc7288abd1675b10b60a1",
  orangeRed: "fddcaffdcf9bfdc18afdad77fb9562f67d53ee6545e24932d32d1ebf130da70403",
  purpleBlue: "dbdaebc8cee4b1c3de97b7d87bacd15b9fc93a90c01e7fb70b70ab056199045281",
  purpleBlueGreen: "dbd8eac8cee4b0c3de93b7d872acd1549fc83892bb1c88a3097f8702736b016353",
  purpleRed: "dcc9e2d3b3d7ce9eccd186c0da6bb2e14da0e23189d91e6fc61159ab07498f023a",
  redPurple: "fccfccfcbec0faa9b8f98faff571a5ec539ddb3695c41b8aa908808d0179700174",
  yellowGreen: "e4f4acd1eca0b9e2949ed68880c97c62bb6e47aa5e3297502083440e723b036034",
  yellowOrangeBrown: "feeaa1fedd84fecc63feb746fca031f68921eb7215db5e0bc54c05ab3d038f3204",
  yellowOrangeRed: "fee087fed16ffebd59fea849fd903efc7335f9522bee3423de1b20ca0b22af0225",
  blueOrange: "134b852f78b35da2cb9dcae1d2e5eff2f0ebfce0bafbbf74e8932fc5690d994a07",
  brownBlueGreen: "704108a0651ac79548e3c78af3e6c6eef1eac9e9e48ed1c74da79e187a72025147",
  purpleGreen: "5b1667834792a67fb6c9aed3e6d6e8eff0efd9efd5aedda971bb75368e490e5e29",
  purpleOrange: "4114696647968f83b7b9b4d6dadbebf3eeeafce0bafbbf74e8932fc5690d994a07",
  redBlue: "8c0d25bf363adf745ef4ae91fbdbc9f2efeed2e5ef9dcae15da2cb2f78b3134b85",
  redGrey: "8c0d25bf363adf745ef4ae91fcdccbfaf4f1e2e2e2c0c0c0969696646464343434",
  yellowGreenBlue: "eff9bddbf1b4bde5b594d5b969c5be45b4c22c9ec02182b82163aa23479c1c3185",
  redYellowBlue: "a50026d4322cf16e43fcac64fedd90faf8c1dcf1ecabd6e875abd04a74b4313695",
  redYellowGreen: "a50026d4322cf16e43fcac63fedd8df9f7aed7ee8ea4d86e64bc6122964f006837",
  pinkYellowGreen: "8e0152c0267edd72adf0b3d6faddedf5f3efe1f2cab6de8780bb474f9125276419",
  spectral: "9e0142d13c4bf0704afcac63fedd8dfbf8b0e0f3a1a9dda269bda94288b55e4fa2",
  viridis: "440154470e61481a6c482575472f7d443a834144873d4e8a39568c35608d31688e2d708e2a788e27818e23888e21918d1f988b1fa08822a8842ab07f35b77943bf7154c56866cc5d7ad1518fd744a5db36bcdf27d2e21be9e51afde725",
  magma: "0000040404130b0924150e3720114b2c11603b0f704a107957157e651a80721f817f24828c29819a2e80a8327db6377ac43c75d1426fde4968e95462f1605df76f5cfa7f5efc8f65fe9f6dfeaf78febf84fece91fddea0fcedaffcfdbf",
  inferno: "0000040403130c0826170c3b240c4f330a5f420a68500d6c5d126e6b176e781c6d86216b932667a12b62ae305cbb3755c73e4cd24644dd513ae65c30ed6925f3771af8850ffb9506fca50afcb519fac62df6d645f2e661f3f484fcffa4",
  plasma: "0d088723069033059742039d5002a25d01a66a00a87801a88405a7900da49c179ea72198b12a90ba3488c33d80cb4779d35171da5a69e16462e76e5bed7953f2834cf68f44fa9a3dfca636fdb32ffec029fcce25f9dc24f5ea27f0f921",
  cividis: "00205100235800265d002961012b65042e670831690d346b11366c16396d1c3c6e213f6e26426e2c456e31476e374a6e3c4d6e42506e47536d4c566d51586e555b6e5a5e6e5e616e62646f66676f6a6a706e6d717270717573727976737c79747f7c75827f758682768985778c8877908b78938e789691789a94789e9778a19b78a59e77a9a177aea575b2a874b6ab73bbaf71c0b26fc5b66dc9b96acebd68d3c065d8c462ddc85fe2cb5ce7cf58ebd355f0d652f3da4ff7de4cfae249fce647",
  rainbow: "6e40aa883eb1a43db3bf3cafd83fa4ee4395fe4b83ff576eff6659ff7847ff8c38f3a130e2b72fcfcc36bee044aff05b8ff4576ff65b52f6673af27828ea8d1ddfa319d0b81cbecb23abd82f96e03d82e14c6edb5a5dd0664dbf6e40aa",
  sinebow: "ff4040fc582af47218e78d0bd5a703bfbf00a7d5038de70b72f41858fc2a40ff402afc5818f4720be78d03d5a700bfbf03a7d50b8de71872f42a58fc4040ff582afc7218f48d0be7a703d5bf00bfd503a7e70b8df41872fc2a58ff4040",
  turbo: "23171b32204a3e2a71453493493eae4b49c54a53d7485ee44569ee4074f53c7ff8378af93295f72e9ff42ba9ef28b3e926bce125c5d925cdcf27d5c629dcbc2de3b232e9a738ee9d3ff39347f68950f9805afc7765fd6e70fe667cfd5e88fc5795fb51a1f84badf545b9f140c5ec3cd0e637dae034e4d931ecd12ef4c92bfac029ffb626ffad24ffa223ff9821ff8d1fff821dff771cfd6c1af76118f05616e84b14df4111d5380fcb2f0dc0260ab61f07ac1805a313029b0f00950c00910b00",
  browns: "eedbbdecca96e9b97ae4a865dc9856d18954c7784cc0673fb85536ad44339f3632",
  tealBlues: "bce4d89dd3d181c3cb65b3c245a2b9368fae347da0306a932c5985",
  teals: "bbdfdfa2d4d58ac9c975bcbb61b0af4da5a43799982b8b8c1e7f7f127273006667",
  warmGreys: "dcd4d0cec5c1c0b8b4b3aaa7a59c9998908c8b827f7e7673726866665c5a59504e",
  goldGreen: "f4d166d5ca60b6c35c98bb597cb25760a6564b9c533f8f4f33834a257740146c36",
  goldOrange: "f4d166f8be5cf8aa4cf5983bf3852aef701be2621fd65322c54923b142239e3a26",
  goldRed: "f4d166f6be59f9aa51fc964ef6834bee734ae56249db5247cf4244c43141b71d3e",
  lightGreyRed: "efe9e6e1dad7d5cbc8c8bdb9bbaea9cd967ddc7b43e15f19df4011dc000b",
  lightGreyTeal: "e4eaead6dcddc8ced2b7c2c7a6b4bc64b0bf22a6c32295c11f85be1876bc",
  lightMulti: "e0f1f2c4e9d0b0de9fd0e181f6e072f6c053f3993ef77440ef4a3c",
  lightOrange: "f2e7daf7d5baf9c499fab184fa9c73f68967ef7860e8645bde515bd43d5b",
  lightTealBlue: "e3e9e0c0dccf9aceca7abfc859afc0389fb9328dad2f7ca0276b95255988",
  darkBlue: "3232322d46681a5c930074af008cbf05a7ce25c0dd38daed50f3faffffff",
  darkGold: "3c3c3c584b37725e348c7631ae8b2bcfa424ecc31ef9de30fff184ffffff",
  darkGreen: "3a3a3a215748006f4d048942489e4276b340a6c63dd2d836ffeb2cffffaa",
  darkMulti: "3737371f5287197d8c29a86995ce3fffe800ffffff",
  darkRed: "3434347036339e3c38cc4037e75d1eec8620eeab29f0ce32ffeb2c"
}, discrete = {
  accent: Accent_default,
  category10: category10_default,
  category20: "1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5",
  category20b: "393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6",
  category20c: "3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9",
  dark2: Dark2_default,
  observable10: observable10_default,
  paired: Paired_default,
  pastel1: Pastel1_default,
  pastel2: Pastel2_default,
  set1: Set1_default,
  set2: Set2_default,
  set3: Set3_default,
  tableau10: "4c78a8f58518e4575672b7b254a24beeca3bb279a2ff9da69d755dbab0ac",
  tableau20: "4c78a89ecae9f58518ffbf7954a24b88d27ab79a20f2cf5b43989483bcb6e45756ff9d9879706ebab0acd67195fcbfd2b279a2d6a5c99e765fd8b5a5"
};
function colors(palette) {
  if (isArray(palette)) return palette;
  let n = palette.length / 6 | 0, c = new Array(n);
  for (let i = 0; i < n; )
    c[i] = "#" + palette.slice(i * 6, ++i * 6);
  return c;
}
function apply(_, f) {
  for (let k in _) scheme(k, f(_[k]));
}
var schemes = {};
apply(discrete, colors);
apply(continuous2, (_) => interpolateColors(colors(_)));
function scheme(name2, scheme3) {
  return name2 = name2 && name2.toLowerCase(), arguments.length > 1 ? (schemes[name2] = scheme3, this) : schemes[name2];
}
var SymbolLegend = "symbol", DiscreteLegend = "discrete", GradientLegend = "gradient", defaultFormatter = (value3) => isArray(value3) ? value3.map((v2) => String(v2)) : String(value3), ascending3 = (a, b10) => a[1] - b10[1], descending2 = (a, b10) => b10[1] - a[1];
function tickCount(scale7, count4, minStep) {
  let step;
  if (isNumber(count4) && (scale7.bins && (count4 = Math.max(count4, scale7.bins.length)), minStep != null)) {
    let domain4 = scale7.domain(), lo = Math.min(domain4[0], peek(domain4)), hi = Math.max(domain4[0], peek(domain4));
    if (count4 = Math.min(count4, Math.floor((hi - lo) / minStep || 1) + 1), !scale7.bins && !isLogarithmic(scale7.type) && !isTemporal(scale7.type) && lo < hi)
      for (; count4 > 1 && tickStep(lo, hi, count4) < minStep; ) --count4;
  }
  return isObject2(count4) && (step = count4.step, count4 = count4.interval), isString(count4) && (count4 = scale7.type === Time ? timeInterval2(count4) : scale7.type == UTC ? utcInterval(count4) : error62("Only time and utc scales accept interval strings."), step && (count4 = count4.every(step))), count4;
}
function validTicks(scale7, ticks2, count4) {
  let range7 = scale7.range(), lo = range7[0], hi = peek(range7), cmp = ascending3;
  if (lo > hi && (range7 = hi, hi = lo, lo = range7, cmp = descending2), lo = Math.floor(lo), hi = Math.ceil(hi), ticks2 = ticks2.map((v2) => [v2, scale7(v2)]).filter((_) => lo <= _[1] && _[1] <= hi).sort(cmp).map((_) => _[0]), count4 > 0 && ticks2.length > 1) {
    let endpoints = [ticks2[0], peek(ticks2)];
    for (; ticks2.length > count4 && ticks2.length >= 3; )
      ticks2 = ticks2.filter((_, i) => !(i % 2));
    ticks2.length < 3 && (ticks2 = endpoints);
  }
  return ticks2;
}
function tickValues(scale7, count4) {
  return scale7.bins ? validTicks(scale7, scale7.bins, count4) : scale7.ticks ? scale7.ticks(count4) : scale7.domain();
}
function tickFormat2(locale4, scale7, count4, specifier, formatType, noSkip) {
  let type3 = scale7.type, format5 = defaultFormatter;
  if (type3 === Time || formatType === Time)
    format5 = locale4.timeFormat(specifier);
  else if (type3 === UTC || formatType === UTC)
    format5 = locale4.utcFormat(specifier);
  else if (isLogarithmic(type3)) {
    let varfmt = locale4.formatFloat(specifier);
    if (noSkip || scale7.bins)
      format5 = varfmt;
    else {
      let test2 = tickLog(scale7, count4, !1);
      format5 = (_) => test2(_) ? varfmt(_) : "";
    }
  } else if (scale7.tickFormat) {
    let d = scale7.domain();
    format5 = locale4.formatSpan(d[0], d[d.length - 1], count4, specifier);
  } else specifier && (format5 = locale4.format(specifier));
  return format5;
}
function tickLog(scale7, count4, values3) {
  let ticks2 = tickValues(scale7, count4), base = scale7.base(), logb = Math.log(base), k = Math.max(1, base * count4 / ticks2.length), test2 = (d) => {
    let i = d / Math.pow(base, Math.round(Math.log(d) / logb));
    return i * base < base - 0.5 && (i *= base), i <= k;
  };
  return values3 ? ticks2.filter(test2) : test2;
}
var symbols = {
  [Quantile2]: "quantiles",
  [Quantize]: "thresholds",
  [Threshold]: "domain"
}, formats2 = {
  [Quantile2]: "quantiles",
  [Quantize]: "domain"
};
function labelValues(scale7, count4) {
  return scale7.bins ? binValues(scale7.bins) : scale7.type === Log ? tickLog(scale7, count4, !0) : symbols[scale7.type] ? thresholdValues(scale7[symbols[scale7.type]]()) : tickValues(scale7, count4);
}
function thresholdFormat(locale4, scale7, specifier) {
  let _ = scale7[formats2[scale7.type]](), n = _.length, d = n > 1 ? _[1] - _[0] : _[0], i;
  for (i = 1; i < n; ++i)
    d = Math.min(d, _[i] - _[i - 1]);
  return locale4.formatSpan(0, d, 30, specifier);
}
function thresholdValues(thresholds) {
  let values3 = [-1 / 0].concat(thresholds);
  return values3.max = 1 / 0, values3;
}
function binValues(bins2) {
  let values3 = bins2.slice(0, -1);
  return values3.max = peek(bins2), values3;
}
var isDiscreteRange = (scale7) => symbols[scale7.type] || scale7.bins;
function labelFormat(locale4, scale7, count4, type3, specifier, formatType, noSkip) {
  let format5 = formats2[scale7.type] && formatType !== Time && formatType !== UTC ? thresholdFormat(locale4, scale7, specifier) : tickFormat2(locale4, scale7, count4, specifier, formatType, noSkip);
  return type3 === SymbolLegend && isDiscreteRange(scale7) ? formatRange(format5) : type3 === DiscreteLegend ? formatDiscrete(format5) : formatPoint(format5);
}
var formatRange = (format5) => (value3, index4, array4) => {
  let limit = get2(array4[index4 + 1], get2(array4.max, 1 / 0)), lo = formatValue(value3, format5), hi = formatValue(limit, format5);
  return lo && hi ? lo + " \u2013 " + hi : hi ? "< " + hi : "\u2265 " + lo;
}, get2 = (value3, dflt) => value3 ?? dflt, formatDiscrete = (format5) => (value3, index4) => index4 ? format5(value3) : null, formatPoint = (format5) => (value3) => format5(value3), formatValue = (value3, format5) => Number.isFinite(value3) ? format5(value3) : null;
function labelFraction(scale7) {
  let domain4 = scale7.domain(), count4 = domain4.length - 1, lo = +domain4[0], hi = +peek(domain4), span = hi - lo;
  if (scale7.type === Threshold) {
    let adjust = count4 ? span / count4 : 0.1;
    lo -= adjust, hi += adjust, span = hi - lo;
  }
  return (value3) => (value3 - lo) / span;
}
function format3(locale4, scale7, specifier, formatType) {
  let type3 = formatType || scale7.type;
  return isString(specifier) && isTemporal(type3) && (specifier = specifier.replace(/%a/g, "%A").replace(/%b/g, "%B")), !specifier && type3 === Time ? locale4.timeFormat("%A, %d %B %Y, %X") : !specifier && type3 === UTC ? locale4.utcFormat("%A, %d %B %Y, %X UTC") : labelFormat(locale4, scale7, 5, null, specifier, formatType, !0);
}
function domainCaption(locale4, scale7, opt) {
  opt = opt || {};
  let max4 = Math.max(3, opt.maxlen || 7), fmt = format3(locale4, scale7, opt.format, opt.formatType);
  if (isDiscretizing(scale7.type)) {
    let v2 = labelValues(scale7).slice(1).map(fmt), n = v2.length;
    return `${n} boundar${n === 1 ? "y" : "ies"}: ${v2.join(", ")}`;
  } else if (isDiscrete(scale7.type)) {
    let d = scale7.domain(), n = d.length, v2 = n > max4 ? d.slice(0, max4 - 2).map(fmt).join(", ") + ", ending with " + d.slice(-1).map(fmt) : d.map(fmt).join(", ");
    return `${n} value${n === 1 ? "" : "s"}: ${v2}`;
  } else {
    let d = scale7.domain();
    return `values from ${fmt(d[0])} to ${fmt(peek(d))}`;
  }
}

// node_modules/vega-scenegraph/build/vega-scenegraph.js
var gradient_id = 0;
var patternPrefix = "p_";
function isGradient(value3) {
  return value3 && value3.gradient;
}
function gradientRef(g, defs, base) {
  let type3 = g.gradient, id3 = g.id, prefix = type3 === "radial" ? patternPrefix : "";
  return id3 || (id3 = g.id = "gradient_" + gradient_id++, type3 === "radial" ? (g.x1 = get3(g.x1, 0.5), g.y1 = get3(g.y1, 0.5), g.r1 = get3(g.r1, 0), g.x2 = get3(g.x2, 0.5), g.y2 = get3(g.y2, 0.5), g.r2 = get3(g.r2, 0.5), prefix = patternPrefix) : (g.x1 = get3(g.x1, 0), g.y1 = get3(g.y1, 0), g.x2 = get3(g.x2, 1), g.y2 = get3(g.y2, 0))), defs[id3] = g, "url(" + (base || "") + "#" + prefix + id3 + ")";
}
function get3(val, def2) {
  return val ?? def2;
}
function Gradient(p02, p1) {
  var stops = [], gradient4;
  return gradient4 = {
    gradient: "linear",
    x1: p02 ? p02[0] : 0,
    y1: p02 ? p02[1] : 0,
    x2: p1 ? p1[0] : 1,
    y2: p1 ? p1[1] : 0,
    stops,
    stop: function(offset4, color5) {
      return stops.push({
        offset: offset4,
        color: color5
      }), gradient4;
    }
  };
}
var lookup = {
  basis: {
    curve: basis_default
  },
  "basis-closed": {
    curve: basisClosed_default
  },
  "basis-open": {
    curve: basisOpen_default
  },
  bundle: {
    curve: bundle_default,
    tension: "beta",
    value: 0.85
  },
  cardinal: {
    curve: cardinal_default,
    tension: "tension",
    value: 0
  },
  "cardinal-open": {
    curve: cardinalOpen_default,
    tension: "tension",
    value: 0
  },
  "cardinal-closed": {
    curve: cardinalClosed_default,
    tension: "tension",
    value: 0
  },
  "catmull-rom": {
    curve: catmullRom_default,
    tension: "alpha",
    value: 0.5
  },
  "catmull-rom-closed": {
    curve: catmullRomClosed_default,
    tension: "alpha",
    value: 0.5
  },
  "catmull-rom-open": {
    curve: catmullRomOpen_default,
    tension: "alpha",
    value: 0.5
  },
  linear: {
    curve: linear_default
  },
  "linear-closed": {
    curve: linearClosed_default
  },
  monotone: {
    horizontal: monotoneY,
    vertical: monotoneX
  },
  natural: {
    curve: natural_default
  },
  step: {
    curve: step_default
  },
  "step-after": {
    curve: stepAfter
  },
  "step-before": {
    curve: stepBefore
  }
};
function curves(type3, orientation, tension) {
  var entry2 = hasOwnProperty(lookup, type3) && lookup[type3], curve2 = null;
  return entry2 && (curve2 = entry2.curve || entry2[orientation || "vertical"], entry2.tension && tension != null && (curve2 = curve2[entry2.tension](tension))), curve2;
}
var paramCounts = {
  m: 2,
  l: 2,
  h: 1,
  v: 1,
  z: 0,
  c: 6,
  s: 4,
  q: 4,
  t: 2,
  a: 7
}, commandPattern = /[mlhvzcsqta]([^mlhvzcsqta]*)/gi, numberPattern = /^[+-]?(([0-9]*\.[0-9]+)|([0-9]+\.)|([0-9]+))([eE][+-]?[0-9]+)?/, spacePattern = /^((\s+,?\s*)|(,\s*))/, flagPattern = /^[01]/;
function parse6(path3) {
  let commands = [];
  return (path3.match(commandPattern) || []).forEach((str) => {
    let cmd = str[0], type3 = cmd.toLowerCase(), paramCount = paramCounts[type3], params2 = parseParams(type3, paramCount, str.slice(1).trim()), count4 = params2.length;
    if (count4 < paramCount || count4 && count4 % paramCount !== 0)
      throw Error("Invalid SVG path, incorrect parameter count");
    if (commands.push([cmd, ...params2.slice(0, paramCount)]), count4 !== paramCount) {
      type3 === "m" && (cmd = cmd === "M" ? "L" : "l");
      for (let i = paramCount; i < count4; i += paramCount)
        commands.push([cmd, ...params2.slice(i, i + paramCount)]);
    }
  }), commands;
}
function parseParams(type3, paramCount, segment) {
  let params2 = [];
  for (let index4 = 0; paramCount && index4 < segment.length; )
    for (let i = 0; i < paramCount; ++i) {
      let pattern = type3 === "a" && (i === 3 || i === 4) ? flagPattern : numberPattern, match3 = segment.slice(index4).match(pattern);
      if (match3 === null)
        throw Error("Invalid SVG path, incorrect parameter type");
      index4 += match3[0].length, params2.push(+match3[0]);
      let ws = segment.slice(index4).match(spacePattern);
      ws !== null && (index4 += ws[0].length);
    }
  return params2;
}
var DegToRad = Math.PI / 180, Epsilon = 1e-14, HalfPi = Math.PI / 2, Tau = Math.PI * 2, HalfSqrt3 = Math.sqrt(3) / 2, segmentCache = {}, bezierCache = {}, join10 = [].join;
function segments(x5, y5, rx, ry, large, sweep, rotateX, ox, oy) {
  let key2 = join10.call(arguments);
  if (segmentCache[key2])
    return segmentCache[key2];
  let th = rotateX * DegToRad, sin_th = Math.sin(th), cos_th = Math.cos(th);
  rx = Math.abs(rx), ry = Math.abs(ry);
  let px2 = cos_th * (ox - x5) * 0.5 + sin_th * (oy - y5) * 0.5, py2 = cos_th * (oy - y5) * 0.5 - sin_th * (ox - x5) * 0.5, pl = px2 * px2 / (rx * rx) + py2 * py2 / (ry * ry);
  pl > 1 && (pl = Math.sqrt(pl), rx *= pl, ry *= pl);
  let a00 = cos_th / rx, a01 = sin_th / rx, a10 = -sin_th / ry, a11 = cos_th / ry, x06 = a00 * ox + a01 * oy, y06 = a10 * ox + a11 * oy, x12 = a00 * x5 + a01 * y5, y12 = a10 * x5 + a11 * y5, sfactor_sq = 1 / ((x12 - x06) * (x12 - x06) + (y12 - y06) * (y12 - y06)) - 0.25;
  sfactor_sq < 0 && (sfactor_sq = 0);
  let sfactor = Math.sqrt(sfactor_sq);
  sweep == large && (sfactor = -sfactor);
  let xc = 0.5 * (x06 + x12) - sfactor * (y12 - y06), yc = 0.5 * (y06 + y12) + sfactor * (x12 - x06), th0 = Math.atan2(y06 - yc, x06 - xc), th_arc = Math.atan2(y12 - yc, x12 - xc) - th0;
  th_arc < 0 && sweep === 1 ? th_arc += Tau : th_arc > 0 && sweep === 0 && (th_arc -= Tau);
  let segs = Math.ceil(Math.abs(th_arc / (HalfPi + 1e-3))), result = [];
  for (let i = 0; i < segs; ++i) {
    let th2 = th0 + i * th_arc / segs, th3 = th0 + (i + 1) * th_arc / segs;
    result[i] = [xc, yc, th2, th3, rx, ry, sin_th, cos_th];
  }
  return segmentCache[key2] = result;
}
function bezier(params2) {
  let key2 = join10.call(params2);
  if (bezierCache[key2])
    return bezierCache[key2];
  var cx = params2[0], cy = params2[1], th0 = params2[2], th1 = params2[3], rx = params2[4], ry = params2[5], sin_th = params2[6], cos_th = params2[7];
  let a00 = cos_th * rx, a01 = -sin_th * ry, a10 = sin_th * rx, a11 = cos_th * ry, cos_th0 = Math.cos(th0), sin_th0 = Math.sin(th0), cos_th1 = Math.cos(th1), sin_th1 = Math.sin(th1), th_half = 0.5 * (th1 - th0), sin_th_h2 = Math.sin(th_half * 0.5), t = 8 / 3 * sin_th_h2 * sin_th_h2 / Math.sin(th_half), x12 = cx + cos_th0 - t * sin_th0, y12 = cy + sin_th0 + t * cos_th0, x32 = cx + cos_th1, y32 = cy + sin_th1, x22 = x32 + t * sin_th1, y22 = y32 - t * cos_th1;
  return bezierCache[key2] = [a00 * x12 + a01 * y12, a10 * x12 + a11 * y12, a00 * x22 + a01 * y22, a10 * x22 + a11 * y22, a00 * x32 + a01 * y32, a10 * x32 + a11 * y32];
}
var temp = ["l", 0, 0, 0, 0, 0, 0, 0];
function scale$1(current2, sX, sY) {
  let c = temp[0] = current2[0];
  if (c === "a" || c === "A")
    temp[1] = sX * current2[1], temp[2] = sY * current2[2], temp[3] = current2[3], temp[4] = current2[4], temp[5] = current2[5], temp[6] = sX * current2[6], temp[7] = sY * current2[7];
  else if (c === "h" || c === "H")
    temp[1] = sX * current2[1];
  else if (c === "v" || c === "V")
    temp[1] = sY * current2[1];
  else
    for (var i = 1, n = current2.length; i < n; ++i)
      temp[i] = (i % 2 == 1 ? sX : sY) * current2[i];
  return temp;
}
function pathRender(context3, path3, l, t, sX, sY) {
  var current2, previous = null, x5 = 0, y5 = 0, controlX = 0, controlY = 0, tempX, tempY, tempControlX, tempControlY, anchorX = 0, anchorY = 0;
  l == null && (l = 0), t == null && (t = 0), sX == null && (sX = 1), sY == null && (sY = sX), context3.beginPath && context3.beginPath();
  for (var i = 0, len = path3.length; i < len; ++i) {
    switch (current2 = path3[i], (sX !== 1 || sY !== 1) && (current2 = scale$1(current2, sX, sY)), current2[0]) {
      // first letter
      case "l":
        x5 += current2[1], y5 += current2[2], context3.lineTo(x5 + l, y5 + t);
        break;
      case "L":
        x5 = current2[1], y5 = current2[2], context3.lineTo(x5 + l, y5 + t);
        break;
      case "h":
        x5 += current2[1], context3.lineTo(x5 + l, y5 + t);
        break;
      case "H":
        x5 = current2[1], context3.lineTo(x5 + l, y5 + t);
        break;
      case "v":
        y5 += current2[1], context3.lineTo(x5 + l, y5 + t);
        break;
      case "V":
        y5 = current2[1], context3.lineTo(x5 + l, y5 + t);
        break;
      case "m":
        x5 += current2[1], y5 += current2[2], anchorX = x5, anchorY = y5, context3.moveTo(x5 + l, y5 + t);
        break;
      case "M":
        x5 = current2[1], y5 = current2[2], anchorX = x5, anchorY = y5, context3.moveTo(x5 + l, y5 + t);
        break;
      case "c":
        tempX = x5 + current2[5], tempY = y5 + current2[6], controlX = x5 + current2[3], controlY = y5 + current2[4], context3.bezierCurveTo(
          x5 + current2[1] + l,
          // x1
          y5 + current2[2] + t,
          // y1
          controlX + l,
          // x2
          controlY + t,
          // y2
          tempX + l,
          tempY + t
        ), x5 = tempX, y5 = tempY;
        break;
      case "C":
        x5 = current2[5], y5 = current2[6], controlX = current2[3], controlY = current2[4], context3.bezierCurveTo(current2[1] + l, current2[2] + t, controlX + l, controlY + t, x5 + l, y5 + t);
        break;
      case "s":
        tempX = x5 + current2[3], tempY = y5 + current2[4], controlX = 2 * x5 - controlX, controlY = 2 * y5 - controlY, context3.bezierCurveTo(controlX + l, controlY + t, x5 + current2[1] + l, y5 + current2[2] + t, tempX + l, tempY + t), controlX = x5 + current2[1], controlY = y5 + current2[2], x5 = tempX, y5 = tempY;
        break;
      case "S":
        tempX = current2[3], tempY = current2[4], controlX = 2 * x5 - controlX, controlY = 2 * y5 - controlY, context3.bezierCurveTo(controlX + l, controlY + t, current2[1] + l, current2[2] + t, tempX + l, tempY + t), x5 = tempX, y5 = tempY, controlX = current2[1], controlY = current2[2];
        break;
      case "q":
        tempX = x5 + current2[3], tempY = y5 + current2[4], controlX = x5 + current2[1], controlY = y5 + current2[2], context3.quadraticCurveTo(controlX + l, controlY + t, tempX + l, tempY + t), x5 = tempX, y5 = tempY;
        break;
      case "Q":
        tempX = current2[3], tempY = current2[4], context3.quadraticCurveTo(current2[1] + l, current2[2] + t, tempX + l, tempY + t), x5 = tempX, y5 = tempY, controlX = current2[1], controlY = current2[2];
        break;
      case "t":
        tempX = x5 + current2[1], tempY = y5 + current2[2], previous[0].match(/[QqTt]/) === null ? (controlX = x5, controlY = y5) : previous[0] === "t" ? (controlX = 2 * x5 - tempControlX, controlY = 2 * y5 - tempControlY) : previous[0] === "q" && (controlX = 2 * x5 - controlX, controlY = 2 * y5 - controlY), tempControlX = controlX, tempControlY = controlY, context3.quadraticCurveTo(controlX + l, controlY + t, tempX + l, tempY + t), x5 = tempX, y5 = tempY, controlX = x5 + current2[1], controlY = y5 + current2[2];
        break;
      case "T":
        tempX = current2[1], tempY = current2[2], controlX = 2 * x5 - controlX, controlY = 2 * y5 - controlY, context3.quadraticCurveTo(controlX + l, controlY + t, tempX + l, tempY + t), x5 = tempX, y5 = tempY;
        break;
      case "a":
        drawArc(context3, x5 + l, y5 + t, [current2[1], current2[2], current2[3], current2[4], current2[5], current2[6] + x5 + l, current2[7] + y5 + t]), x5 += current2[6], y5 += current2[7];
        break;
      case "A":
        drawArc(context3, x5 + l, y5 + t, [current2[1], current2[2], current2[3], current2[4], current2[5], current2[6] + l, current2[7] + t]), x5 = current2[6], y5 = current2[7];
        break;
      case "z":
      case "Z":
        x5 = anchorX, y5 = anchorY, context3.closePath();
        break;
    }
    previous = current2;
  }
}
function drawArc(context3, x5, y5, coords) {
  let seg = segments(
    coords[5],
    // end x
    coords[6],
    // end y
    coords[0],
    // radius x
    coords[1],
    // radius y
    coords[3],
    // large flag
    coords[4],
    // sweep flag
    coords[2],
    // rotation
    x5,
    y5
  );
  for (let i = 0; i < seg.length; ++i) {
    let bez = bezier(seg[i]);
    context3.bezierCurveTo(bez[0], bez[1], bez[2], bez[3], bez[4], bez[5]);
  }
}
var Tan30 = 0.5773502691896257, builtins = {
  circle: {
    draw: function(context3, size) {
      let r = Math.sqrt(size) / 2;
      context3.moveTo(r, 0), context3.arc(0, 0, r, 0, Tau);
    }
  },
  cross: {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, s = r / 2.5;
      context3.moveTo(-r, -s), context3.lineTo(-r, s), context3.lineTo(-s, s), context3.lineTo(-s, r), context3.lineTo(s, r), context3.lineTo(s, s), context3.lineTo(r, s), context3.lineTo(r, -s), context3.lineTo(s, -s), context3.lineTo(s, -r), context3.lineTo(-s, -r), context3.lineTo(-s, -s), context3.closePath();
    }
  },
  diamond: {
    draw: function(context3, size) {
      let r = Math.sqrt(size) / 2;
      context3.moveTo(-r, 0), context3.lineTo(0, -r), context3.lineTo(r, 0), context3.lineTo(0, r), context3.closePath();
    }
  },
  square: {
    draw: function(context3, size) {
      var w2 = Math.sqrt(size), x5 = -w2 / 2;
      context3.rect(x5, x5, w2, w2);
    }
  },
  arrow: {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, s = r / 7, t = r / 2.5, v2 = r / 8;
      context3.moveTo(-s, r), context3.lineTo(s, r), context3.lineTo(s, -v2), context3.lineTo(t, -v2), context3.lineTo(0, -r), context3.lineTo(-t, -v2), context3.lineTo(-s, -v2), context3.closePath();
    }
  },
  wedge: {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, h2 = HalfSqrt3 * r, o = h2 - r * Tan30, b10 = r / 4;
      context3.moveTo(0, -h2 - o), context3.lineTo(-b10, h2 - o), context3.lineTo(b10, h2 - o), context3.closePath();
    }
  },
  triangle: {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, h2 = HalfSqrt3 * r, o = h2 - r * Tan30;
      context3.moveTo(0, -h2 - o), context3.lineTo(-r, h2 - o), context3.lineTo(r, h2 - o), context3.closePath();
    }
  },
  "triangle-up": {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, h2 = HalfSqrt3 * r;
      context3.moveTo(0, -h2), context3.lineTo(-r, h2), context3.lineTo(r, h2), context3.closePath();
    }
  },
  "triangle-down": {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, h2 = HalfSqrt3 * r;
      context3.moveTo(0, h2), context3.lineTo(-r, -h2), context3.lineTo(r, -h2), context3.closePath();
    }
  },
  "triangle-right": {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, h2 = HalfSqrt3 * r;
      context3.moveTo(h2, 0), context3.lineTo(-h2, -r), context3.lineTo(-h2, r), context3.closePath();
    }
  },
  "triangle-left": {
    draw: function(context3, size) {
      var r = Math.sqrt(size) / 2, h2 = HalfSqrt3 * r;
      context3.moveTo(-h2, 0), context3.lineTo(h2, -r), context3.lineTo(h2, r), context3.closePath();
    }
  },
  stroke: {
    draw: function(context3, size) {
      let r = Math.sqrt(size) / 2;
      context3.moveTo(-r, 0), context3.lineTo(r, 0);
    }
  }
};
function symbols2(_) {
  return hasOwnProperty(builtins, _) ? builtins[_] : customSymbol(_);
}
var custom9 = {};
function customSymbol(path3) {
  if (!hasOwnProperty(custom9, path3)) {
    let parsed = parse6(path3);
    custom9[path3] = {
      draw: function(context3, size) {
        pathRender(context3, parsed, 0, 0, Math.sqrt(size) / 2);
      }
    };
  }
  return custom9[path3];
}
var C2 = 0.448084975506;
function rectangleX(d) {
  return d.x;
}
function rectangleY(d) {
  return d.y;
}
function rectangleWidth(d) {
  return d.width;
}
function rectangleHeight(d) {
  return d.height;
}
function number7(_) {
  return typeof _ == "function" ? _ : () => +_;
}
function clamp2(value3, min4, max4) {
  return Math.max(min4, Math.min(value3, max4));
}
function vg_rect() {
  var x5 = rectangleX, y5 = rectangleY, width2 = rectangleWidth, height2 = rectangleHeight, crTL = number7(0), crTR = crTL, crBL = crTL, crBR = crTL, context3 = null;
  function rectangle2(_, x06, y06) {
    var buffer, x12 = x06 ?? +x5.call(this, _), y12 = y06 ?? +y5.call(this, _), w2 = +width2.call(this, _), h2 = +height2.call(this, _), s = Math.min(w2, h2) / 2, tl2 = clamp2(+crTL.call(this, _), 0, s), tr2 = clamp2(+crTR.call(this, _), 0, s), bl2 = clamp2(+crBL.call(this, _), 0, s), br2 = clamp2(+crBR.call(this, _), 0, s);
    if (context3 || (context3 = buffer = path()), tl2 <= 0 && tr2 <= 0 && bl2 <= 0 && br2 <= 0)
      context3.rect(x12, y12, w2, h2);
    else {
      var x22 = x12 + w2, y22 = y12 + h2;
      context3.moveTo(x12 + tl2, y12), context3.lineTo(x22 - tr2, y12), context3.bezierCurveTo(x22 - C2 * tr2, y12, x22, y12 + C2 * tr2, x22, y12 + tr2), context3.lineTo(x22, y22 - br2), context3.bezierCurveTo(x22, y22 - C2 * br2, x22 - C2 * br2, y22, x22 - br2, y22), context3.lineTo(x12 + bl2, y22), context3.bezierCurveTo(x12 + C2 * bl2, y22, x12, y22 - C2 * bl2, x12, y22 - bl2), context3.lineTo(x12, y12 + tl2), context3.bezierCurveTo(x12, y12 + C2 * tl2, x12 + C2 * tl2, y12, x12 + tl2, y12), context3.closePath();
    }
    if (buffer)
      return context3 = null, buffer + "" || null;
  }
  return rectangle2.x = function(_) {
    return arguments.length ? (x5 = number7(_), rectangle2) : x5;
  }, rectangle2.y = function(_) {
    return arguments.length ? (y5 = number7(_), rectangle2) : y5;
  }, rectangle2.width = function(_) {
    return arguments.length ? (width2 = number7(_), rectangle2) : width2;
  }, rectangle2.height = function(_) {
    return arguments.length ? (height2 = number7(_), rectangle2) : height2;
  }, rectangle2.cornerRadius = function(tl2, tr2, br2, bl2) {
    return arguments.length ? (crTL = number7(tl2), crTR = tr2 != null ? number7(tr2) : crTL, crBR = br2 != null ? number7(br2) : crTL, crBL = bl2 != null ? number7(bl2) : crTR, rectangle2) : crTL;
  }, rectangle2.context = function(_) {
    return arguments.length ? (context3 = _ ?? null, rectangle2) : context3;
  }, rectangle2;
}
function vg_trail() {
  var x5, y5, size, defined2, context3 = null, ready, x12, y12, r1;
  function point8(x22, y22, w2) {
    let r2 = w2 / 2;
    if (ready) {
      var ux = y12 - y22, uy = x22 - x12;
      if (ux || uy) {
        var ud = Math.hypot(ux, uy), rx = (ux /= ud) * r1, ry = (uy /= ud) * r1, t = Math.atan2(uy, ux);
        context3.moveTo(x12 - rx, y12 - ry), context3.lineTo(x22 - ux * r2, y22 - uy * r2), context3.arc(x22, y22, r2, t - Math.PI, t), context3.lineTo(x12 + rx, y12 + ry), context3.arc(x12, y12, r1, t, t + Math.PI);
      } else
        context3.arc(x22, y22, r2, 0, Tau);
      context3.closePath();
    } else
      ready = 1;
    x12 = x22, y12 = y22, r1 = r2;
  }
  function trail3(data3) {
    var i, n = data3.length, d, defined0 = !1, buffer;
    for (context3 == null && (context3 = buffer = path()), i = 0; i <= n; ++i)
      !(i < n && defined2(d = data3[i], i, data3)) === defined0 && (defined0 = !defined0) && (ready = 0), defined0 && point8(+x5(d, i, data3), +y5(d, i, data3), +size(d, i, data3));
    if (buffer)
      return context3 = null, buffer + "" || null;
  }
  return trail3.x = function(_) {
    return arguments.length ? (x5 = _, trail3) : x5;
  }, trail3.y = function(_) {
    return arguments.length ? (y5 = _, trail3) : y5;
  }, trail3.size = function(_) {
    return arguments.length ? (size = _, trail3) : size;
  }, trail3.defined = function(_) {
    return arguments.length ? (defined2 = _, trail3) : defined2;
  }, trail3.context = function(_) {
    return arguments.length ? (_ == null ? context3 = null : context3 = _, trail3) : context3;
  }, trail3;
}
function value$1(a, b10) {
  return a ?? b10;
}
var x2 = (item) => item.x || 0, y2 = (item) => item.y || 0, w = (item) => item.width || 0, h = (item) => item.height || 0, xw = (item) => (item.x || 0) + (item.width || 0), yh = (item) => (item.y || 0) + (item.height || 0), sa = (item) => item.startAngle || 0, ea = (item) => item.endAngle || 0, pa = (item) => item.padAngle || 0, ir = (item) => item.innerRadius || 0, or = (item) => item.outerRadius || 0, cr = (item) => item.cornerRadius || 0, tl = (item) => value$1(item.cornerRadiusTopLeft, item.cornerRadius) || 0, tr = (item) => value$1(item.cornerRadiusTopRight, item.cornerRadius) || 0, br = (item) => value$1(item.cornerRadiusBottomRight, item.cornerRadius) || 0, bl = (item) => value$1(item.cornerRadiusBottomLeft, item.cornerRadius) || 0, sz = (item) => value$1(item.size, 64), ts = (item) => item.size || 1, def = (item) => item.defined !== !1, type = (item) => symbols2(item.shape || "circle"), arcShape = arc_default().startAngle(sa).endAngle(ea).padAngle(pa).innerRadius(ir).outerRadius(or).cornerRadius(cr), areavShape = area_default().x(x2).y1(y2).y0(yh).defined(def), areahShape = area_default().y(y2).x1(x2).x0(xw).defined(def), lineShape = line_default().x(x2).y(y2).defined(def), rectShape = vg_rect().x(x2).y(y2).width(w).height(h).cornerRadius(tl, tr, br, bl), symbolShape = Symbol2().type(type).size(sz), trailShape = vg_trail().x(x2).y(y2).defined(def).size(ts);
function hasCornerRadius(item) {
  return item.cornerRadius || item.cornerRadiusTopLeft || item.cornerRadiusTopRight || item.cornerRadiusBottomRight || item.cornerRadiusBottomLeft;
}
function arc$1(context3, item) {
  return arcShape.context(context3)(item);
}
function area$1(context3, items) {
  let item = items[0], interp = item.interpolate || "linear";
  return (item.orient === "horizontal" ? areahShape : areavShape).curve(curves(interp, item.orient, item.tension)).context(context3)(items);
}
function line$1(context3, items) {
  let item = items[0], interp = item.interpolate || "linear";
  return lineShape.curve(curves(interp, item.orient, item.tension)).context(context3)(items);
}
function rectangle(context3, item, x5, y5) {
  return rectShape.context(context3)(item, x5, y5);
}
function shape$1(context3, item) {
  return (item.mark.shape || item.shape).context(context3)(item);
}
function symbol$1(context3, item) {
  return symbolShape.context(context3)(item);
}
function trail$1(context3, items) {
  return trailShape.context(context3)(items);
}
var clip_id = 1;
function clip$1(renderer, item, size) {
  var clip4 = item.clip, defs = renderer._defs, id3 = item.clip_id || (item.clip_id = "clip" + clip_id++), c = defs.clipping[id3] || (defs.clipping[id3] = {
    id: id3
  });
  return isFunction(clip4) ? c.path = clip4(null) : hasCornerRadius(size) ? c.path = rectangle(null, size, 0, 0) : (c.width = size.width || 0, c.height = size.height || 0), "url(#" + id3 + ")";
}
function Bounds(b10) {
  this.clear(), b10 && this.union(b10);
}
Bounds.prototype = {
  clone() {
    return new Bounds(this);
  },
  clear() {
    return this.x1 = +Number.MAX_VALUE, this.y1 = +Number.MAX_VALUE, this.x2 = -Number.MAX_VALUE, this.y2 = -Number.MAX_VALUE, this;
  },
  empty() {
    return this.x1 === +Number.MAX_VALUE && this.y1 === +Number.MAX_VALUE && this.x2 === -Number.MAX_VALUE && this.y2 === -Number.MAX_VALUE;
  },
  equals(b10) {
    return this.x1 === b10.x1 && this.y1 === b10.y1 && this.x2 === b10.x2 && this.y2 === b10.y2;
  },
  set(x12, y12, x22, y22) {
    return x22 < x12 ? (this.x2 = x12, this.x1 = x22) : (this.x1 = x12, this.x2 = x22), y22 < y12 ? (this.y2 = y12, this.y1 = y22) : (this.y1 = y12, this.y2 = y22), this;
  },
  add(x5, y5) {
    return x5 < this.x1 && (this.x1 = x5), y5 < this.y1 && (this.y1 = y5), x5 > this.x2 && (this.x2 = x5), y5 > this.y2 && (this.y2 = y5), this;
  },
  expand(d) {
    return this.x1 -= d, this.y1 -= d, this.x2 += d, this.y2 += d, this;
  },
  round() {
    return this.x1 = Math.floor(this.x1), this.y1 = Math.floor(this.y1), this.x2 = Math.ceil(this.x2), this.y2 = Math.ceil(this.y2), this;
  },
  scale(s) {
    return this.x1 *= s, this.y1 *= s, this.x2 *= s, this.y2 *= s, this;
  },
  translate(dx, dy) {
    return this.x1 += dx, this.x2 += dx, this.y1 += dy, this.y2 += dy, this;
  },
  rotate(angle2, x5, y5) {
    let p = this.rotatedPoints(angle2, x5, y5);
    return this.clear().add(p[0], p[1]).add(p[2], p[3]).add(p[4], p[5]).add(p[6], p[7]);
  },
  rotatedPoints(angle2, x5, y5) {
    var {
      x1: x12,
      y1: y12,
      x2: x22,
      y2: y22
    } = this, cos4 = Math.cos(angle2), sin4 = Math.sin(angle2), cx = x5 - x5 * cos4 + y5 * sin4, cy = y5 - x5 * sin4 - y5 * cos4;
    return [cos4 * x12 - sin4 * y12 + cx, sin4 * x12 + cos4 * y12 + cy, cos4 * x12 - sin4 * y22 + cx, sin4 * x12 + cos4 * y22 + cy, cos4 * x22 - sin4 * y12 + cx, sin4 * x22 + cos4 * y12 + cy, cos4 * x22 - sin4 * y22 + cx, sin4 * x22 + cos4 * y22 + cy];
  },
  union(b10) {
    return b10.x1 < this.x1 && (this.x1 = b10.x1), b10.y1 < this.y1 && (this.y1 = b10.y1), b10.x2 > this.x2 && (this.x2 = b10.x2), b10.y2 > this.y2 && (this.y2 = b10.y2), this;
  },
  intersect(b10) {
    return b10.x1 > this.x1 && (this.x1 = b10.x1), b10.y1 > this.y1 && (this.y1 = b10.y1), b10.x2 < this.x2 && (this.x2 = b10.x2), b10.y2 < this.y2 && (this.y2 = b10.y2), this;
  },
  encloses(b10) {
    return b10 && this.x1 <= b10.x1 && this.x2 >= b10.x2 && this.y1 <= b10.y1 && this.y2 >= b10.y2;
  },
  alignsWith(b10) {
    return b10 && (this.x1 == b10.x1 || this.x2 == b10.x2 || this.y1 == b10.y1 || this.y2 == b10.y2);
  },
  intersects(b10) {
    return b10 && !(this.x2 < b10.x1 || this.x1 > b10.x2 || this.y2 < b10.y1 || this.y1 > b10.y2);
  },
  contains(x5, y5) {
    return !(x5 < this.x1 || x5 > this.x2 || y5 < this.y1 || y5 > this.y2);
  },
  width() {
    return this.x2 - this.x1;
  },
  height() {
    return this.y2 - this.y1;
  }
};
function Item(mark) {
  this.mark = mark, this.bounds = this.bounds || new Bounds();
}
function GroupItem(mark) {
  Item.call(this, mark), this.items = this.items || [];
}
inherits_default(GroupItem, Item);
var ResourceLoader = class {
  constructor(customLoader) {
    this._pending = 0, this._loader = customLoader || loader();
  }
  pending() {
    return this._pending;
  }
  sanitizeURL(uri2) {
    let loader2 = this;
    return increment(loader2), loader2._loader.sanitize(uri2, {
      context: "href"
    }).then((opt) => (decrement(loader2), opt)).catch(() => (decrement(loader2), null));
  }
  loadImage(uri2) {
    let loader2 = this, Image2 = image();
    return increment(loader2), loader2._loader.sanitize(uri2, {
      context: "image"
    }).then((opt) => {
      let url2 = opt.href;
      if (!url2 || !Image2) throw {
        url: url2
      };
      let img = new Image2(), cors = hasOwnProperty(opt, "crossOrigin") ? opt.crossOrigin : "anonymous";
      return cors != null && (img.crossOrigin = cors), img.onload = () => decrement(loader2), img.onerror = () => decrement(loader2), img.src = url2, img;
    }).catch((e) => (decrement(loader2), {
      complete: !1,
      width: 0,
      height: 0,
      src: e && e.url || ""
    }));
  }
  ready() {
    let loader2 = this;
    return new Promise((accept) => {
      function poll(value3) {
        loader2.pending() ? setTimeout(() => {
          poll(!0);
        }, 10) : accept(value3);
      }
      poll(!1);
    });
  }
};
function increment(loader2) {
  loader2._pending += 1;
}
function decrement(loader2) {
  loader2._pending -= 1;
}
function boundStroke(bounds2, item, miter) {
  if (item.stroke && item.opacity !== 0 && item.strokeOpacity !== 0) {
    let sw = item.strokeWidth != null ? +item.strokeWidth : 1, e = (item.strokeCap === "square" ? Math.SQRT2 : 1) * sw / 2;
    miter && (!item.strokeJoin || item.strokeJoin === "miter") && (e = Math.max(e, (item.strokeMiterLimit != null ? +item.strokeMiterLimit : 4) * sw / 2)), bounds2.expand(e);
  }
  return bounds2;
}
var circleThreshold = Tau - 1e-8, bounds, lx, ly, rot, ma, mb, mc, md, add3 = (x5, y5) => bounds.add(x5, y5), addL = (x5, y5) => add3(lx = x5, ly = y5), addX = (x5) => add3(x5, bounds.y1), addY = (y5) => add3(bounds.x1, y5), px = (x5, y5) => ma * x5 + mc * y5, py = (x5, y5) => mb * x5 + md * y5, addp = (x5, y5) => add3(px(x5, y5), py(x5, y5)), addpL = (x5, y5) => addL(px(x5, y5), py(x5, y5));
function boundContext(_, deg) {
  return bounds = _, deg ? (rot = deg * DegToRad, ma = md = Math.cos(rot), mb = Math.sin(rot), mc = -mb) : (ma = md = 1, rot = mb = mc = 0), context$1;
}
var context$1 = {
  beginPath() {
  },
  closePath() {
  },
  moveTo: addpL,
  lineTo: addpL,
  rect(x5, y5, w2, h2) {
    rot ? (addp(x5 + w2, y5), addp(x5 + w2, y5 + h2), addp(x5, y5 + h2), addpL(x5, y5)) : (add3(x5 + w2, y5 + h2), addL(x5, y5));
  },
  quadraticCurveTo(x12, y12, x22, y22) {
    let px1 = px(x12, y12), py1 = py(x12, y12), px2 = px(x22, y22), py2 = py(x22, y22);
    quadExtrema(lx, px1, px2, addX), quadExtrema(ly, py1, py2, addY), addL(px2, py2);
  },
  bezierCurveTo(x12, y12, x22, y22, x32, y32) {
    let px1 = px(x12, y12), py1 = py(x12, y12), px2 = px(x22, y22), py2 = py(x22, y22), px3 = px(x32, y32), py3 = py(x32, y32);
    cubicExtrema(lx, px1, px2, px3, addX), cubicExtrema(ly, py1, py2, py3, addY), addL(px3, py3);
  },
  arc(cx, cy, r, sa2, ea3, ccw2) {
    if (sa2 += rot, ea3 += rot, lx = r * Math.cos(ea3) + cx, ly = r * Math.sin(ea3) + cy, Math.abs(ea3 - sa2) > circleThreshold)
      add3(cx - r, cy - r), add3(cx + r, cy + r);
    else {
      let update3 = (a) => add3(r * Math.cos(a) + cx, r * Math.sin(a) + cy), s, i;
      if (update3(sa2), update3(ea3), ea3 !== sa2)
        if (sa2 = sa2 % Tau, sa2 < 0 && (sa2 += Tau), ea3 = ea3 % Tau, ea3 < 0 && (ea3 += Tau), ea3 < sa2 && (ccw2 = !ccw2, s = sa2, sa2 = ea3, ea3 = s), ccw2)
          for (ea3 -= Tau, s = sa2 - sa2 % HalfPi, i = 0; i < 4 && s > ea3; ++i, s -= HalfPi) update3(s);
        else
          for (s = sa2 - sa2 % HalfPi + HalfPi, i = 0; i < 4 && s < ea3; ++i, s = s + HalfPi) update3(s);
    }
  }
};
function quadExtrema(x06, x12, x22, cb) {
  let t = (x06 - x12) / (x06 + x22 - 2 * x12);
  0 < t && t < 1 && cb(x06 + (x12 - x06) * t);
}
function cubicExtrema(x06, x12, x22, x32, cb) {
  let a = x32 - x06 + 3 * x12 - 3 * x22, b10 = x06 + x22 - 2 * x12, c = x06 - x12, t04 = 0, t13 = 0, r;
  Math.abs(a) > Epsilon ? (r = b10 * b10 + c * a, r >= 0 && (r = Math.sqrt(r), t04 = (-b10 + r) / a, t13 = (-b10 - r) / a)) : t04 = 0.5 * c / b10, 0 < t04 && t04 < 1 && cb(cubic(t04, x06, x12, x22, x32)), 0 < t13 && t13 < 1 && cb(cubic(t13, x06, x12, x22, x32));
}
function cubic(t, x06, x12, x22, x32) {
  let s = 1 - t, s2 = s * s, t22 = t * t;
  return s2 * s * x06 + 3 * s2 * t * x12 + 3 * s * t22 * x22 + t22 * t * x32;
}
var context = (context = canvas(1, 1)) ? context.getContext("2d") : null, b = new Bounds();
function intersectPath(draw3) {
  return function(item, brush) {
    if (!context) return !0;
    draw3(context, item), b.clear().union(item.bounds).intersect(brush).round();
    let {
      x1: x12,
      y1: y12,
      x2: x22,
      y2: y22
    } = b;
    for (let y5 = y12; y5 <= y22; ++y5)
      for (let x5 = x12; x5 <= x22; ++x5)
        if (context.isPointInPath(x5, y5))
          return !0;
    return !1;
  };
}
function intersectPoint(item, box) {
  return box.contains(item.x || 0, item.y || 0);
}
function intersectRect(item, box) {
  let x5 = item.x || 0, y5 = item.y || 0, w2 = item.width || 0, h2 = item.height || 0;
  return box.intersects(b.set(x5, y5, x5 + w2, y5 + h2));
}
function intersectRule(item, box) {
  let x5 = item.x || 0, y5 = item.y || 0, x22 = item.x2 != null ? item.x2 : x5, y22 = item.y2 != null ? item.y2 : y5;
  return intersectBoxLine(box, x5, y5, x22, y22);
}
function intersectBoxLine(box, x5, y5, u4, v2) {
  let {
    x1: x12,
    y1: y12,
    x2: x22,
    y2: y22
  } = box, dx = u4 - x5, dy = v2 - y5, t04 = 0, t13 = 1, p, q, r, e;
  for (e = 0; e < 4; ++e) {
    if (e === 0 && (p = -dx, q = -(x12 - x5)), e === 1 && (p = dx, q = x22 - x5), e === 2 && (p = -dy, q = -(y12 - y5)), e === 3 && (p = dy, q = y22 - y5), Math.abs(p) < 1e-10 && q < 0) return !1;
    if (r = q / p, p < 0) {
      if (r > t13) return !1;
      r > t04 && (t04 = r);
    } else if (p > 0) {
      if (r < t04) return !1;
      r < t13 && (t13 = r);
    }
  }
  return !0;
}
function blend(context3, item) {
  context3.globalCompositeOperation = item.blend || "source-over";
}
function value(value3, dflt) {
  return value3 ?? dflt;
}
function addStops(gradient4, stops) {
  let n = stops.length;
  for (let i = 0; i < n; ++i)
    gradient4.addColorStop(stops[i].offset, stops[i].color);
  return gradient4;
}
function gradient(context3, spec, bounds2) {
  let w2 = bounds2.width(), h2 = bounds2.height(), gradient4;
  if (spec.gradient === "radial")
    gradient4 = context3.createRadialGradient(bounds2.x1 + value(spec.x1, 0.5) * w2, bounds2.y1 + value(spec.y1, 0.5) * h2, Math.max(w2, h2) * value(spec.r1, 0), bounds2.x1 + value(spec.x2, 0.5) * w2, bounds2.y1 + value(spec.y2, 0.5) * h2, Math.max(w2, h2) * value(spec.r2, 0.5));
  else {
    let x12 = value(spec.x1, 0), y12 = value(spec.y1, 0), x22 = value(spec.x2, 1), y22 = value(spec.y2, 0);
    if (x12 === x22 || y12 === y22 || w2 === h2)
      gradient4 = context3.createLinearGradient(bounds2.x1 + x12 * w2, bounds2.y1 + y12 * h2, bounds2.x1 + x22 * w2, bounds2.y1 + y22 * h2);
    else {
      let image4 = canvas(Math.ceil(w2), Math.ceil(h2)), ictx = image4.getContext("2d");
      return ictx.scale(w2, h2), ictx.fillStyle = addStops(ictx.createLinearGradient(x12, y12, x22, y22), spec.stops), ictx.fillRect(0, 0, w2, h2), context3.createPattern(image4, "no-repeat");
    }
  }
  return addStops(gradient4, spec.stops);
}
function color2(context3, item, value3) {
  return isGradient(value3) ? gradient(context3, value3, item.bounds) : value3;
}
function fill(context3, item, opacity2) {
  return opacity2 *= item.fillOpacity == null ? 1 : item.fillOpacity, opacity2 > 0 ? (context3.globalAlpha = opacity2, context3.fillStyle = color2(context3, item, item.fill), !0) : !1;
}
var Empty2 = [];
function stroke(context3, item, opacity2) {
  var lw = (lw = item.strokeWidth) != null ? lw : 1;
  return lw <= 0 ? !1 : (opacity2 *= item.strokeOpacity == null ? 1 : item.strokeOpacity, opacity2 > 0 ? (context3.globalAlpha = opacity2, context3.strokeStyle = color2(context3, item, item.stroke), context3.lineWidth = lw, context3.lineCap = item.strokeCap || "butt", context3.lineJoin = item.strokeJoin || "miter", context3.miterLimit = item.strokeMiterLimit != null ? item.strokeMiterLimit : 4, context3.setLineDash && (context3.setLineDash(item.strokeDash || Empty2), context3.lineDashOffset = item.strokeDashOffset || 0), !0) : !1);
}
function compare2(a, b10) {
  return a.zindex - b10.zindex || a.index - b10.index;
}
function zorder(scene) {
  if (!scene.zdirty) return scene.zitems;
  var items = scene.items, output4 = [], item, i, n;
  for (i = 0, n = items.length; i < n; ++i)
    item = items[i], item.index = i, item.zindex && output4.push(item);
  return scene.zdirty = !1, scene.zitems = output4.sort(compare2);
}
function visit2(scene, visitor) {
  var items = scene.items, i, n;
  if (!items || !items.length) return;
  let zitems = zorder(scene);
  if (zitems && zitems.length) {
    for (i = 0, n = items.length; i < n; ++i)
      items[i].zindex || visitor(items[i]);
    items = zitems;
  }
  for (i = 0, n = items.length; i < n; ++i)
    visitor(items[i]);
}
function pickVisit(scene, visitor) {
  var items = scene.items, hit2, i;
  if (!items || !items.length) return null;
  let zitems = zorder(scene);
  for (zitems && zitems.length && (items = zitems), i = items.length; --i >= 0; )
    if (hit2 = visitor(items[i])) return hit2;
  if (items === zitems) {
    for (items = scene.items, i = items.length; --i >= 0; )
      if (!items[i].zindex && (hit2 = visitor(items[i])))
        return hit2;
  }
  return null;
}
function drawAll(path3) {
  return function(context3, scene, bounds2) {
    visit2(scene, (item) => {
      (!bounds2 || bounds2.intersects(item.bounds)) && drawPath(path3, context3, item, item);
    });
  };
}
function drawOne(path3) {
  return function(context3, scene, bounds2) {
    scene.items.length && (!bounds2 || bounds2.intersects(scene.bounds)) && drawPath(path3, context3, scene.items[0], scene.items);
  };
}
function drawPath(path3, context3, item, items) {
  var opacity2 = item.opacity == null ? 1 : item.opacity;
  opacity2 !== 0 && (path3(context3, items) || (blend(context3, item), item.fill && fill(context3, item, opacity2) && context3.fill(), item.stroke && stroke(context3, item, opacity2) && context3.stroke()));
}
function pick$1(test2) {
  return test2 = test2 || truthy, function(context3, scene, x5, y5, gx, gy) {
    return x5 *= context3.pixelRatio, y5 *= context3.pixelRatio, pickVisit(scene, (item) => {
      let b10 = item.bounds;
      if (!(b10 && !b10.contains(gx, gy) || !b10) && test2(context3, item, x5, y5, gx, gy))
        return item;
    });
  };
}
function hitPath(path3, filled) {
  return function(context3, o, x5, y5) {
    var item = Array.isArray(o) ? o[0] : o, fill2 = filled ?? item.fill, stroke2 = item.stroke && context3.isPointInStroke, lw, lc;
    return stroke2 && (lw = item.strokeWidth, lc = item.strokeCap, context3.lineWidth = lw ?? 1, context3.lineCap = lc ?? "butt"), path3(context3, o) ? !1 : fill2 && context3.isPointInPath(x5, y5) || stroke2 && context3.isPointInStroke(x5, y5);
  };
}
function pickPath(path3) {
  return pick$1(hitPath(path3));
}
function translate(x5, y5) {
  return "translate(" + x5 + "," + y5 + ")";
}
function rotate(a) {
  return "rotate(" + a + ")";
}
function scale2(scaleX, scaleY2) {
  return "scale(" + scaleX + "," + scaleY2 + ")";
}
function translateItem(item) {
  return translate(item.x || 0, item.y || 0);
}
function rotateItem(item) {
  return translate(item.x || 0, item.y || 0) + (item.angle ? " " + rotate(item.angle) : "");
}
function transformItem(item) {
  return translate(item.x || 0, item.y || 0) + (item.angle ? " " + rotate(item.angle) : "") + (item.scaleX || item.scaleY ? " " + scale2(item.scaleX || 1, item.scaleY || 1) : "");
}
function markItemPath(type3, shape2, isect) {
  function attr2(emit2, item) {
    emit2("transform", rotateItem(item)), emit2("d", shape2(null, item));
  }
  function bound2(bounds2, item) {
    return shape2(boundContext(bounds2, item.angle), item), boundStroke(bounds2, item, !0).translate(item.x || 0, item.y || 0);
  }
  function draw3(context3, item) {
    var x5 = item.x || 0, y5 = item.y || 0, a = item.angle || 0;
    context3.translate(x5, y5), a && context3.rotate(a *= DegToRad), context3.beginPath(), shape2(context3, item), a && context3.rotate(-a), context3.translate(-x5, -y5);
  }
  return {
    type: type3,
    tag: "path",
    nested: !1,
    attr: attr2,
    bound: bound2,
    draw: drawAll(draw3),
    pick: pickPath(draw3),
    isect: isect || intersectPath(draw3)
  };
}
var arc = markItemPath("arc", arc$1);
function pickArea(a, p) {
  for (var v2 = a[0].orient === "horizontal" ? p[1] : p[0], z2 = a[0].orient === "horizontal" ? "y" : "x", i = a.length, min4 = 1 / 0, hit2, d; --i >= 0; )
    a[i].defined !== !1 && (d = Math.abs(a[i][z2] - v2), d < min4 && (min4 = d, hit2 = a[i]));
  return hit2;
}
function pickLine(a, p) {
  for (var t = Math.pow(a[0].strokeWidth || 1, 2), i = a.length, dx, dy, dd; --i >= 0; )
    if (a[i].defined !== !1 && (dx = a[i].x - p[0], dy = a[i].y - p[1], dd = dx * dx + dy * dy, dd < t))
      return a[i];
  return null;
}
function pickTrail(a, p) {
  for (var i = a.length, dx, dy, dd; --i >= 0; )
    if (a[i].defined !== !1 && (dx = a[i].x - p[0], dy = a[i].y - p[1], dd = dx * dx + dy * dy, dx = a[i].size || 1, dd < dx * dx))
      return a[i];
  return null;
}
function markMultiItemPath(type3, shape2, tip) {
  function attr2(emit2, item) {
    var items = item.mark.items;
    items.length && emit2("d", shape2(null, items));
  }
  function bound2(bounds2, mark) {
    var items = mark.items;
    return items.length === 0 ? bounds2 : (shape2(boundContext(bounds2), items), boundStroke(bounds2, items[0], !0));
  }
  function draw3(context3, items) {
    context3.beginPath(), shape2(context3, items);
  }
  let hit2 = hitPath(draw3);
  function pick5(context3, scene, x5, y5, gx, gy) {
    var items = scene.items, b10 = scene.bounds;
    return !items || !items.length || b10 && !b10.contains(gx, gy) ? null : (x5 *= context3.pixelRatio, y5 *= context3.pixelRatio, hit2(context3, items, x5, y5) ? items[0] : null);
  }
  return {
    type: type3,
    tag: "path",
    nested: !0,
    attr: attr2,
    bound: bound2,
    draw: drawOne(draw3),
    pick: pick5,
    isect: intersectPoint,
    tip
  };
}
var area = markMultiItemPath("area", area$1, pickArea);
function clip2(context3, scene) {
  var clip4 = scene.clip;
  context3.save(), isFunction(clip4) ? (context3.beginPath(), clip4(context3), context3.clip()) : clipGroup(context3, scene.group);
}
function clipGroup(context3, group2) {
  context3.beginPath(), hasCornerRadius(group2) ? rectangle(context3, group2, 0, 0) : context3.rect(0, 0, group2.width || 0, group2.height || 0), context3.clip();
}
function offset$1(item) {
  let sw = value(item.strokeWidth, 1);
  return item.strokeOffset != null ? item.strokeOffset : item.stroke && sw > 0.5 && sw < 1.5 ? 0.5 - Math.abs(sw - 1) : 0;
}
function attr$5(emit2, item) {
  emit2("transform", translateItem(item));
}
function emitRectangle(emit2, item) {
  let off = offset$1(item);
  emit2("d", rectangle(null, item, off, off));
}
function background(emit2, item) {
  emit2("class", "background"), emit2("aria-hidden", !0), emitRectangle(emit2, item);
}
function foreground(emit2, item) {
  emit2("class", "foreground"), emit2("aria-hidden", !0), item.strokeForeground ? emitRectangle(emit2, item) : emit2("d", "");
}
function content(emit2, item, renderer) {
  let url2 = item.clip ? clip$1(renderer, item, item) : null;
  emit2("clip-path", url2);
}
function bound$5(bounds2, group2) {
  if (!group2.clip && group2.items) {
    let items = group2.items, m = items.length;
    for (let j2 = 0; j2 < m; ++j2)
      bounds2.union(items[j2].bounds);
  }
  return (group2.clip || group2.width || group2.height) && !group2.noBound && bounds2.add(0, 0).add(group2.width || 0, group2.height || 0), boundStroke(bounds2, group2), bounds2.translate(group2.x || 0, group2.y || 0);
}
function rectanglePath(context3, group2, x5, y5) {
  let off = offset$1(group2);
  context3.beginPath(), rectangle(context3, group2, (x5 || 0) + off, (y5 || 0) + off);
}
var hitBackground = hitPath(rectanglePath), hitForeground = hitPath(rectanglePath, !1), hitCorner = hitPath(rectanglePath, !0);
function draw$4(context3, scene, bounds2, markTypes) {
  visit2(scene, (group2) => {
    let gx = group2.x || 0, gy = group2.y || 0, fore = group2.strokeForeground, opacity2 = group2.opacity == null ? 1 : group2.opacity;
    (group2.stroke || group2.fill) && opacity2 && (rectanglePath(context3, group2, gx, gy), blend(context3, group2), group2.fill && fill(context3, group2, opacity2) && context3.fill(), group2.stroke && !fore && stroke(context3, group2, opacity2) && context3.stroke()), context3.save(), context3.translate(gx, gy), group2.clip && clipGroup(context3, group2), bounds2 && bounds2.translate(-gx, -gy), visit2(group2, (item) => {
      (item.marktype === "group" || markTypes == null || markTypes.includes(item.marktype)) && this.draw(context3, item, bounds2, markTypes);
    }), bounds2 && bounds2.translate(gx, gy), context3.restore(), fore && group2.stroke && opacity2 && (rectanglePath(context3, group2, gx, gy), blend(context3, group2), stroke(context3, group2, opacity2) && context3.stroke());
  });
}
function pick3(context3, scene, x5, y5, gx, gy) {
  if (scene.bounds && !scene.bounds.contains(gx, gy) || !scene.items)
    return null;
  let cx = x5 * context3.pixelRatio, cy = y5 * context3.pixelRatio;
  return pickVisit(scene, (group2) => {
    let hit2, dx, dy, b10 = group2.bounds;
    if (b10 && !b10.contains(gx, gy)) return;
    dx = group2.x || 0, dy = group2.y || 0;
    let dw = dx + (group2.width || 0), dh = dy + (group2.height || 0), c = group2.clip;
    if (c && (gx < dx || gx > dw || gy < dy || gy > dh)) return;
    if (context3.save(), context3.translate(dx, dy), dx = gx - dx, dy = gy - dy, c && hasCornerRadius(group2) && !hitCorner(context3, group2, cx, cy))
      return context3.restore(), null;
    let fore = group2.strokeForeground, ix = scene.interactive !== !1;
    return ix && fore && group2.stroke && hitForeground(context3, group2, cx, cy) ? (context3.restore(), group2) : (hit2 = pickVisit(group2, (mark) => pickMark(mark, dx, dy) ? this.pick(mark, x5, y5, dx, dy) : null), !hit2 && ix && (group2.fill || !fore && group2.stroke) && hitBackground(context3, group2, cx, cy) && (hit2 = group2), context3.restore(), hit2 || null);
  });
}
function pickMark(mark, x5, y5) {
  return (mark.interactive !== !1 || mark.marktype === "group") && mark.bounds && mark.bounds.contains(x5, y5);
}
var group = {
  type: "group",
  tag: "g",
  nested: !1,
  attr: attr$5,
  bound: bound$5,
  draw: draw$4,
  pick: pick3,
  isect: intersectRect,
  content,
  background,
  foreground
}, metadata = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  version: "1.1"
};
function getImage(item, renderer) {
  var image4 = item.image;
  return (!image4 || item.url && item.url !== image4.url) && (image4 = {
    complete: !1,
    width: 0,
    height: 0
  }, renderer.loadImage(item.url).then((image5) => {
    item.image = image5, item.image.url = item.url;
  })), image4;
}
function imageWidth(item, image4) {
  return item.width != null ? item.width : !image4 || !image4.width ? 0 : item.aspect !== !1 && item.height ? item.height * image4.width / image4.height : image4.width;
}
function imageHeight(item, image4) {
  return item.height != null ? item.height : !image4 || !image4.height ? 0 : item.aspect !== !1 && item.width ? item.width * image4.height / image4.width : image4.height;
}
function imageXOffset(align2, w2) {
  return align2 === "center" ? w2 / 2 : align2 === "right" ? w2 : 0;
}
function imageYOffset(baseline3, h2) {
  return baseline3 === "middle" ? h2 / 2 : baseline3 === "bottom" ? h2 : 0;
}
function attr$4(emit2, item, renderer) {
  let img = getImage(item, renderer), w2 = imageWidth(item, img), h2 = imageHeight(item, img), x5 = (item.x || 0) - imageXOffset(item.align, w2), y5 = (item.y || 0) - imageYOffset(item.baseline, h2), i = !img.src && img.toDataURL ? img.toDataURL() : img.src || "";
  emit2("href", i, metadata["xmlns:xlink"], "xlink:href"), emit2("transform", translate(x5, y5)), emit2("width", w2), emit2("height", h2), emit2("preserveAspectRatio", item.aspect === !1 ? "none" : "xMidYMid");
}
function bound$4(bounds2, item) {
  let img = item.image, w2 = imageWidth(item, img), h2 = imageHeight(item, img), x5 = (item.x || 0) - imageXOffset(item.align, w2), y5 = (item.y || 0) - imageYOffset(item.baseline, h2);
  return bounds2.set(x5, y5, x5 + w2, y5 + h2);
}
function draw$3(context3, scene, bounds2) {
  visit2(scene, (item) => {
    if (bounds2 && !bounds2.intersects(item.bounds)) return;
    let img = getImage(item, this), w2 = imageWidth(item, img), h2 = imageHeight(item, img);
    if (w2 === 0 || h2 === 0) return;
    let x5 = (item.x || 0) - imageXOffset(item.align, w2), y5 = (item.y || 0) - imageYOffset(item.baseline, h2), opacity2, ar0, ar1, t;
    item.aspect !== !1 && (ar0 = img.width / img.height, ar1 = item.width / item.height, ar0 === ar0 && ar1 === ar1 && ar0 !== ar1 && (ar1 < ar0 ? (t = w2 / ar0, y5 += (h2 - t) / 2, h2 = t) : (t = h2 * ar0, x5 += (w2 - t) / 2, w2 = t))), (img.complete || img.toDataURL) && (blend(context3, item), context3.globalAlpha = (opacity2 = item.opacity) != null ? opacity2 : 1, context3.imageSmoothingEnabled = item.smooth !== !1, context3.drawImage(img, x5, y5, w2, h2));
  });
}
var image2 = {
  type: "image",
  tag: "image",
  nested: !1,
  attr: attr$4,
  bound: bound$4,
  draw: draw$3,
  pick: pick$1(),
  isect: truthy,
  // bounds check is sufficient
  get: getImage,
  xOffset: imageXOffset,
  yOffset: imageYOffset
}, line = markMultiItemPath("line", line$1, pickLine);
function attr$3(emit2, item) {
  var sx = item.scaleX || 1, sy = item.scaleY || 1;
  (sx !== 1 || sy !== 1) && emit2("vector-effect", "non-scaling-stroke"), emit2("transform", transformItem(item)), emit2("d", item.path);
}
function path$1(context3, item) {
  var path3 = item.path;
  if (path3 == null) return !0;
  var x5 = item.x || 0, y5 = item.y || 0, sx = item.scaleX || 1, sy = item.scaleY || 1, a = (item.angle || 0) * DegToRad, cache2 = item.pathCache;
  (!cache2 || cache2.path !== path3) && ((item.pathCache = cache2 = parse6(path3)).path = path3), a && context3.rotate && context3.translate ? (context3.translate(x5, y5), context3.rotate(a), pathRender(context3, cache2, 0, 0, sx, sy), context3.rotate(-a), context3.translate(-x5, -y5)) : pathRender(context3, cache2, x5, y5, sx, sy);
}
function bound$3(bounds2, item) {
  return path$1(boundContext(bounds2, item.angle), item) ? bounds2.set(0, 0, 0, 0) : boundStroke(bounds2, item, !0);
}
var path$2 = {
  type: "path",
  tag: "path",
  nested: !1,
  attr: attr$3,
  bound: bound$3,
  draw: drawAll(path$1),
  pick: pickPath(path$1),
  isect: intersectPath(path$1)
};
function attr$2(emit2, item) {
  emit2("d", rectangle(null, item));
}
function bound$2(bounds2, item) {
  var x5, y5;
  return boundStroke(bounds2.set(x5 = item.x || 0, y5 = item.y || 0, x5 + item.width || 0, y5 + item.height || 0), item);
}
function draw$2(context3, item) {
  context3.beginPath(), rectangle(context3, item);
}
var rect = {
  type: "rect",
  tag: "path",
  nested: !1,
  attr: attr$2,
  bound: bound$2,
  draw: drawAll(draw$2),
  pick: pickPath(draw$2),
  isect: intersectRect
};
function attr$1(emit2, item) {
  emit2("transform", translateItem(item)), emit2("x2", item.x2 != null ? item.x2 - (item.x || 0) : 0), emit2("y2", item.y2 != null ? item.y2 - (item.y || 0) : 0);
}
function bound$1(bounds2, item) {
  var x12, y12;
  return boundStroke(bounds2.set(x12 = item.x || 0, y12 = item.y || 0, item.x2 != null ? item.x2 : x12, item.y2 != null ? item.y2 : y12), item);
}
function path2(context3, item, opacity2) {
  var x12, y12, x22, y22;
  return item.stroke && stroke(context3, item, opacity2) ? (x12 = item.x || 0, y12 = item.y || 0, x22 = item.x2 != null ? item.x2 : x12, y22 = item.y2 != null ? item.y2 : y12, context3.beginPath(), context3.moveTo(x12, y12), context3.lineTo(x22, y22), !0) : !1;
}
function draw$1(context3, scene, bounds2) {
  visit2(scene, (item) => {
    if (!(bounds2 && !bounds2.intersects(item.bounds))) {
      var opacity2 = item.opacity == null ? 1 : item.opacity;
      opacity2 && path2(context3, item, opacity2) && (blend(context3, item), context3.stroke());
    }
  });
}
function hit$1(context3, item, x5, y5) {
  return context3.isPointInStroke ? path2(context3, item, 1) && context3.isPointInStroke(x5, y5) : !1;
}
var rule = {
  type: "rule",
  tag: "line",
  nested: !1,
  attr: attr$1,
  bound: bound$1,
  draw: draw$1,
  pick: pick$1(hit$1),
  isect: intersectRule
}, shape = markItemPath("shape", shape$1), symbol2 = markItemPath("symbol", symbol$1, intersectPoint), widthCache = lruCache_default(), textMetrics = {
  height: fontSize,
  measureWidth,
  estimateWidth,
  width: estimateWidth,
  canvas: useCanvas
};
useCanvas(!0);
function useCanvas(use) {
  textMetrics.width = use && context ? measureWidth : estimateWidth;
}
function estimateWidth(item, text4) {
  return _estimateWidth(textValue(item, text4), fontSize(item));
}
function _estimateWidth(text4, currentFontHeight) {
  return ~~(0.8 * text4.length * currentFontHeight);
}
function measureWidth(item, text4) {
  return fontSize(item) <= 0 || !(text4 = textValue(item, text4)) ? 0 : _measureWidth(text4, font(item));
}
function _measureWidth(text4, currentFont) {
  let key2 = `(${currentFont}) ${text4}`, width2 = widthCache.get(key2);
  return width2 === void 0 && (context.font = currentFont, width2 = context.measureText(text4).width, widthCache.set(key2, width2)), width2;
}
function fontSize(item) {
  return item.fontSize != null ? +item.fontSize || 0 : 11;
}
function lineHeight(item) {
  return item.lineHeight != null ? item.lineHeight : fontSize(item) + 2;
}
function lineArray(_) {
  return isArray(_) ? _.length > 1 ? _ : _[0] : _;
}
function textLines(item) {
  return lineArray(item.lineBreak && item.text && !isArray(item.text) ? item.text.split(item.lineBreak) : item.text);
}
function multiLineOffset(item) {
  let tl2 = textLines(item);
  return (isArray(tl2) ? tl2.length - 1 : 0) * lineHeight(item);
}
function textValue(item, line4) {
  let text4 = line4 == null ? "" : (line4 + "").trim();
  return item.limit > 0 && text4.length ? truncate2(item, text4) : text4;
}
function widthGetter(item) {
  if (textMetrics.width === measureWidth) {
    let currentFont = font(item);
    return (text4) => _measureWidth(text4, currentFont);
  } else if (textMetrics.width === estimateWidth) {
    let currentFontHeight = fontSize(item);
    return (text4) => _estimateWidth(text4, currentFontHeight);
  } else
    return (text4) => textMetrics.width(item, text4);
}
function truncate2(item, text4) {
  var limit = +item.limit, width2 = widthGetter(item);
  if (width2(text4) < limit) return text4;
  var ellipsis = item.ellipsis || "\u2026", rtl = item.dir === "rtl", lo = 0, hi = text4.length, mid;
  if (limit -= width2(ellipsis), rtl) {
    for (; lo < hi; )
      mid = lo + hi >>> 1, width2(text4.slice(mid)) > limit ? lo = mid + 1 : hi = mid;
    return ellipsis + text4.slice(lo);
  } else {
    for (; lo < hi; )
      mid = 1 + (lo + hi >>> 1), width2(text4.slice(0, mid)) < limit ? lo = mid : hi = mid - 1;
    return text4.slice(0, lo) + ellipsis;
  }
}
function fontFamily(item, quote) {
  var font2 = item.font;
  return (quote && font2 ? String(font2).replace(/"/g, "'") : font2) || "sans-serif";
}
function font(item, quote) {
  return (item.fontStyle ? item.fontStyle + " " : "") + (item.fontVariant ? item.fontVariant + " " : "") + (item.fontWeight ? item.fontWeight + " " : "") + fontSize(item) + "px " + fontFamily(item, quote);
}
function offset2(item) {
  var baseline3 = item.baseline, h2 = fontSize(item);
  return Math.round(baseline3 === "top" ? 0.79 * h2 : baseline3 === "middle" ? 0.3 * h2 : baseline3 === "bottom" ? -0.21 * h2 : baseline3 === "line-top" ? 0.29 * h2 + 0.5 * lineHeight(item) : baseline3 === "line-bottom" ? 0.29 * h2 - 0.5 * lineHeight(item) : 0);
}
var textAlign = {
  left: "start",
  center: "middle",
  right: "end"
}, tempBounds = new Bounds();
function anchorPoint(item) {
  var x5 = item.x || 0, y5 = item.y || 0, r = item.radius || 0, t;
  return r && (t = (item.theta || 0) - HalfPi, x5 += r * Math.cos(t), y5 += r * Math.sin(t)), tempBounds.x1 = x5, tempBounds.y1 = y5, tempBounds;
}
function attr(emit2, item) {
  var dx = item.dx || 0, dy = (item.dy || 0) + offset2(item), p = anchorPoint(item), x5 = p.x1, y5 = p.y1, a = item.angle || 0, t;
  emit2("text-anchor", textAlign[item.align] || "start"), a ? (t = translate(x5, y5) + " " + rotate(a), (dx || dy) && (t += " " + translate(dx, dy))) : t = translate(x5 + dx, y5 + dy), emit2("transform", t);
}
function bound(bounds2, item, mode) {
  var h2 = textMetrics.height(item), a = item.align, p = anchorPoint(item), x5 = p.x1, y5 = p.y1, dx = item.dx || 0, dy = (item.dy || 0) + offset2(item) - Math.round(0.8 * h2), tl2 = textLines(item), w2;
  if (isArray(tl2) ? (h2 += lineHeight(item) * (tl2.length - 1), w2 = tl2.reduce((w3, t) => Math.max(w3, textMetrics.width(item, t)), 0)) : w2 = textMetrics.width(item, tl2), a === "center" ? dx -= w2 / 2 : a === "right" && (dx -= w2), bounds2.set(dx += x5, dy += y5, dx + w2, dy + h2), item.angle && !mode)
    bounds2.rotate(item.angle * DegToRad, x5, y5);
  else if (mode === 2)
    return bounds2.rotatedPoints(item.angle * DegToRad, x5, y5);
  return bounds2;
}
function draw(context3, scene, bounds2) {
  visit2(scene, (item) => {
    var opacity2 = item.opacity == null ? 1 : item.opacity, p, x5, y5, i, lh, tl2, str;
    if (!(bounds2 && !bounds2.intersects(item.bounds) || // bounds check
    opacity2 === 0 || item.fontSize <= 0 || item.text == null || item.text.length === 0)) {
      if (context3.font = font(item), context3.textAlign = item.align || "left", p = anchorPoint(item), x5 = p.x1, y5 = p.y1, item.angle && (context3.save(), context3.translate(x5, y5), context3.rotate(item.angle * DegToRad), x5 = y5 = 0), x5 += item.dx || 0, y5 += (item.dy || 0) + offset2(item), tl2 = textLines(item), blend(context3, item), isArray(tl2))
        for (lh = lineHeight(item), i = 0; i < tl2.length; ++i)
          str = textValue(item, tl2[i]), item.fill && fill(context3, item, opacity2) && context3.fillText(str, x5, y5), item.stroke && stroke(context3, item, opacity2) && context3.strokeText(str, x5, y5), y5 += lh;
      else
        str = textValue(item, tl2), item.fill && fill(context3, item, opacity2) && context3.fillText(str, x5, y5), item.stroke && stroke(context3, item, opacity2) && context3.strokeText(str, x5, y5);
      item.angle && context3.restore();
    }
  });
}
function hit(context3, item, x5, y5, gx, gy) {
  if (item.fontSize <= 0) return !1;
  if (!item.angle) return !0;
  var p = anchorPoint(item), ax = p.x1, ay = p.y1, b10 = bound(tempBounds, item, 1), a = -item.angle * DegToRad, cos4 = Math.cos(a), sin4 = Math.sin(a), px2 = cos4 * gx - sin4 * gy + (ax - cos4 * ax + sin4 * ay), py2 = sin4 * gx + cos4 * gy + (ay - sin4 * ax - cos4 * ay);
  return b10.contains(px2, py2);
}
function intersectText(item, box) {
  let p = bound(tempBounds, item, 2);
  return intersectBoxLine(box, p[0], p[1], p[2], p[3]) || intersectBoxLine(box, p[0], p[1], p[4], p[5]) || intersectBoxLine(box, p[4], p[5], p[6], p[7]) || intersectBoxLine(box, p[2], p[3], p[6], p[7]);
}
var text2 = {
  type: "text",
  tag: "text",
  nested: !1,
  attr,
  bound,
  draw,
  pick: pick$1(hit),
  isect: intersectText
}, trail = markMultiItemPath("trail", trail$1, pickTrail), Marks = {
  arc,
  area,
  group,
  image: image2,
  line,
  path: path$2,
  rect,
  rule,
  shape,
  symbol: symbol2,
  text: text2,
  trail
};
function boundItem(item, func, opt) {
  var type3 = Marks[item.mark.marktype], bound2 = func || type3.bound;
  return type3.nested && (item = item.mark), bound2(item.bounds || (item.bounds = new Bounds()), item, opt);
}
var DUMMY = {
  mark: null
};
function boundMark(mark, bounds2, opt) {
  var type3 = Marks[mark.marktype], bound2 = type3.bound, items = mark.items, hasItems = items && items.length, i, n, item, b10;
  if (type3.nested)
    return hasItems ? item = items[0] : (DUMMY.mark = mark, item = DUMMY), b10 = boundItem(item, bound2, opt), bounds2 = bounds2 && bounds2.union(b10) || b10, bounds2;
  if (bounds2 = bounds2 || mark.bounds && mark.bounds.clear() || new Bounds(), hasItems)
    for (i = 0, n = items.length; i < n; ++i)
      bounds2.union(boundItem(items[i], bound2, opt));
  return mark.bounds = bounds2;
}
var keys = [
  "marktype",
  "name",
  "role",
  "interactive",
  "clip",
  "items",
  "zindex",
  "x",
  "y",
  "width",
  "height",
  "align",
  "baseline",
  // layout
  "fill",
  "fillOpacity",
  "opacity",
  "blend",
  // fill
  "stroke",
  "strokeOpacity",
  "strokeWidth",
  "strokeCap",
  // stroke
  "strokeDash",
  "strokeDashOffset",
  // stroke dash
  "strokeForeground",
  "strokeOffset",
  // group
  "startAngle",
  "endAngle",
  "innerRadius",
  "outerRadius",
  // arc
  "cornerRadius",
  "padAngle",
  // arc, rect
  "cornerRadiusTopLeft",
  "cornerRadiusTopRight",
  // rect, group
  "cornerRadiusBottomLeft",
  "cornerRadiusBottomRight",
  "interpolate",
  "tension",
  "orient",
  "defined",
  // area, line
  "url",
  "aspect",
  "smooth",
  // image
  "path",
  "scaleX",
  "scaleY",
  // path
  "x2",
  "y2",
  // rule
  "size",
  "shape",
  // symbol
  "text",
  "angle",
  "theta",
  "radius",
  "dir",
  "dx",
  "dy",
  // text
  "ellipsis",
  "limit",
  "lineBreak",
  "lineHeight",
  "font",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "fontVariant",
  // font
  "description",
  "aria",
  "ariaRole",
  "ariaRoleDescription"
  // aria
];
function sceneToJSON(scene, indent) {
  return JSON.stringify(scene, keys, indent);
}
function sceneFromJSON(json3) {
  let scene = typeof json3 == "string" ? JSON.parse(json3) : json3;
  return initialize(scene);
}
function initialize(scene) {
  var type3 = scene.marktype, items = scene.items, parent, i, n;
  if (items)
    for (i = 0, n = items.length; i < n; ++i)
      parent = type3 ? "mark" : "group", items[i][parent] = scene, items[i].zindex && (items[i][parent].zdirty = !0), (type3 || parent) === "group" && initialize(items[i]);
  return type3 && boundMark(scene), scene;
}
var Scenegraph = class {
  constructor(scene) {
    arguments.length ? this.root = sceneFromJSON(scene) : (this.root = createMark({
      marktype: "group",
      name: "root",
      role: "frame"
    }), this.root.items = [new GroupItem(this.root)]);
  }
  toJSON(indent) {
    return sceneToJSON(this.root, indent || 0);
  }
  mark(markdef, group2, index4) {
    group2 = group2 || this.root.items[0];
    let mark = createMark(markdef, group2);
    return group2.items[index4] = mark, mark.zindex && (mark.group.zdirty = !0), mark;
  }
};
function createMark(def2, group2) {
  let mark = {
    bounds: new Bounds(),
    clip: !!def2.clip,
    group: group2,
    interactive: def2.interactive !== !1,
    items: [],
    marktype: def2.marktype,
    name: def2.name || void 0,
    role: def2.role || void 0,
    zindex: def2.zindex || 0
  };
  return def2.aria != null && (mark.aria = def2.aria), def2.description && (mark.description = def2.description), mark;
}
function domCreate(doc, tag, ns) {
  return !doc && typeof document < "u" && document.createElement && (doc = document), doc ? ns ? doc.createElementNS(ns, tag) : doc.createElement(tag) : null;
}
function domFind(el, tag) {
  tag = tag.toLowerCase();
  for (var nodes = el.childNodes, i = 0, n = nodes.length; i < n; ++i) if (nodes[i].tagName.toLowerCase() === tag)
    return nodes[i];
}
function domChild(el, index4, tag, ns) {
  var a = el.childNodes[index4], b10;
  return (!a || a.tagName.toLowerCase() !== tag.toLowerCase()) && (b10 = a || null, a = domCreate(el.ownerDocument, tag, ns), el.insertBefore(a, b10)), a;
}
function domClear(el, index4) {
  for (var nodes = el.childNodes, curr = nodes.length; curr > index4; ) el.removeChild(nodes[--curr]);
  return el;
}
function cssClass(mark) {
  return "mark-" + mark.marktype + (mark.role ? " role-" + mark.role : "") + (mark.name ? " " + mark.name : "");
}
function point6(event2, el) {
  if (el.getScreenCTM) {
    let p = ctmPoint(event2, el.getScreenCTM());
    if (p) return p;
  }
  return rectPoint(event2, el, el.getBoundingClientRect());
}
function ctmPoint(event2, ctm) {
  if (!ctm) return null;
  let det = ctm.a * ctm.d - ctm.b * ctm.c;
  if (!det) return null;
  let x5 = event2.clientX - ctm.e, y5 = event2.clientY - ctm.f;
  return [(ctm.d * x5 - ctm.c * y5) / det, (ctm.a * y5 - ctm.b * x5) / det];
}
function rectPoint(event2, el, rect3) {
  let sx = el.offsetWidth ? rect3.width / el.offsetWidth : 1, sy = el.offsetHeight ? rect3.height / el.offsetHeight : 1;
  return [(event2.clientX - rect3.left) / sx - (el.clientLeft || 0), (event2.clientY - rect3.top) / sy - (el.clientTop || 0)];
}
function resolveItem(item, event2, el, origin) {
  var mark = item && item.mark, mdef, p;
  if (mark && (mdef = Marks[mark.marktype]).tip) {
    for (p = point6(event2, el), p[0] -= origin[0], p[1] -= origin[1]; item = item.mark.group; )
      p[0] -= item.x || 0, p[1] -= item.y || 0;
    item = mdef.tip(mark.items, p);
  }
  return item;
}
var Handler = class {
  /**
   * Create a new Handler instance.
   * @param {object} [customLoader] - Optional loader instance for
   *   href URL sanitization. If not specified, a standard loader
   *   instance will be generated.
   * @param {function} [customTooltip] - Optional tooltip handler
   *   function for custom tooltip display.
   * @constructor
   */
  constructor(customLoader, customTooltip) {
    this._active = null, this._handlers = {}, this._loader = customLoader || loader(), this._tooltip = customTooltip || defaultTooltip;
  }
  /**
   * Initialize a new Handler instance.
   * @param {DOMElement} el - The containing DOM element for the display.
   * @param {Array<number>} origin - The origin of the display, in pixels.
   *   The coordinate system will be translated to this point.
   * @param {object} [obj] - Optional context object that should serve as
   *   the "this" context for event callbacks.
   * @return {Handler} - This handler instance.
   */
  initialize(el, origin, obj) {
    return this._el = el, this._obj = obj || null, this.origin(origin);
  }
  /**
   * Returns the parent container element for a visualization.
   * @return {DOMElement} - The containing DOM element.
   */
  element() {
    return this._el;
  }
  /**
   * Returns the scene element (e.g., canvas or SVG) of the visualization
   * Subclasses must override if the first child is not the scene element.
   * @return {DOMElement} - The scene (e.g., canvas or SVG) element.
   */
  canvas() {
    return this._el && this._el.firstChild;
  }
  /**
   * Get / set the origin coordinates of the visualization.
   */
  origin(origin) {
    return arguments.length ? (this._origin = origin || [0, 0], this) : this._origin.slice();
  }
  /**
   * Get / set the scenegraph root.
   */
  scene(scene) {
    return arguments.length ? (this._scene = scene, this) : this._scene;
  }
  /**
   * Add an event handler. Subclasses should override this method.
   */
  on() {
  }
  /**
   * Remove an event handler. Subclasses should override this method.
   */
  off() {
  }
  /**
   * Utility method for finding the array index of an event handler.
   * @param {Array} h - An array of registered event handlers.
   * @param {string} type - The event type.
   * @param {function} handler - The event handler instance to find.
   * @return {number} - The handler's array index or -1 if not registered.
   */
  _handlerIndex(h2, type3, handler) {
    for (let i = h2 ? h2.length : 0; --i >= 0; )
      if (h2[i].type === type3 && (!handler || h2[i].handler === handler))
        return i;
    return -1;
  }
  /**
   * Returns an array with registered event handlers.
   * @param {string} [type] - The event type to query. Any annotations
   *   are ignored; for example, for the argument "click.foo", ".foo" will
   *   be ignored and the method returns all "click" handlers. If type is
   *   null or unspecified, this method returns handlers for all types.
   * @return {Array} - A new array containing all registered event handlers.
   */
  handlers(type3) {
    let h2 = this._handlers, a = [];
    if (type3)
      a.push(...h2[this.eventName(type3)]);
    else
      for (let k in h2)
        a.push(...h2[k]);
    return a;
  }
  /**
   * Parses an event name string to return the specific event type.
   * For example, given "click.foo" returns "click"
   * @param {string} name - The input event type string.
   * @return {string} - A string with the event type only.
   */
  eventName(name2) {
    let i = name2.indexOf(".");
    return i < 0 ? name2 : name2.slice(0, i);
  }
  /**
   * Handle hyperlink navigation in response to an item.href value.
   * @param {Event} event - The event triggering hyperlink navigation.
   * @param {Item} item - The scenegraph item.
   * @param {string} href - The URL to navigate to.
   */
  handleHref(event2, item, href2) {
    this._loader.sanitize(href2, {
      context: "href"
    }).then((opt) => {
      let e = new MouseEvent(event2.type, event2), a = domCreate(null, "a");
      for (let name2 in opt) a.setAttribute(name2, opt[name2]);
      a.dispatchEvent(e);
    }).catch(() => {
    });
  }
  /**
   * Handle tooltip display in response to an item.tooltip value.
   * @param {Event} event - The event triggering tooltip display.
   * @param {Item} item - The scenegraph item.
   * @param {boolean} show - A boolean flag indicating whether
   *   to show or hide a tooltip for the given item.
   */
  handleTooltip(event2, item, show) {
    if (item && item.tooltip != null) {
      item = resolveItem(item, event2, this.canvas(), this._origin);
      let value3 = show && item && item.tooltip || null;
      this._tooltip.call(this._obj, this, event2, item, value3);
    }
  }
  /**
   * Returns the size of a scenegraph item and its position relative
   * to the viewport.
   * @param {Item} item - The scenegraph item.
   * @return {object} - A bounding box object (compatible with the
   *   DOMRect type) consisting of x, y, width, heigh, top, left,
   *   right, and bottom properties.
   */
  getItemBoundingClientRect(item) {
    let el = this.canvas();
    if (!el) return;
    let rect3 = el.getBoundingClientRect(), origin = this._origin, bounds2 = item.bounds, width2 = bounds2.width(), height2 = bounds2.height(), x5 = bounds2.x1 + origin[0] + rect3.left, y5 = bounds2.y1 + origin[1] + rect3.top;
    for (; item.mark && (item = item.mark.group); )
      x5 += item.x || 0, y5 += item.y || 0;
    return {
      x: x5,
      y: y5,
      width: width2,
      height: height2,
      left: x5,
      top: y5,
      right: x5 + width2,
      bottom: y5 + height2
    };
  }
};
function defaultTooltip(handler, event2, item, value3) {
  handler.element().setAttribute("title", value3 || "");
}
var Renderer = class {
  /**
   * Create a new Renderer instance.
   * @param {object} [loader] - Optional loader instance for
   *   image and href URL sanitization. If not specified, a
   *   standard loader instance will be generated.
   * @constructor
   */
  constructor(loader2) {
    this._el = null, this._bgcolor = null, this._loader = new ResourceLoader(loader2);
  }
  /**
   * Initialize a new Renderer instance.
   * @param {DOMElement} el - The containing DOM element for the display.
   * @param {number} width - The coordinate width of the display, in pixels.
   * @param {number} height - The coordinate height of the display, in pixels.
   * @param {Array<number>} origin - The origin of the display, in pixels.
   *   The coordinate system will be translated to this point.
   * @param {number} [scaleFactor=1] - Optional scaleFactor by which to multiply
   *   the width and height to determine the final pixel size.
   * @return {Renderer} - This renderer instance.
   */
  initialize(el, width2, height2, origin, scaleFactor) {
    return this._el = el, this.resize(width2, height2, origin, scaleFactor);
  }
  /**
   * Returns the parent container element for a visualization.
   * @return {DOMElement} - The containing DOM element.
   */
  element() {
    return this._el;
  }
  /**
   * Returns the scene element (e.g., canvas or SVG) of the visualization
   * Subclasses must override if the first child is not the scene element.
   * @return {DOMElement} - The scene (e.g., canvas or SVG) element.
   */
  canvas() {
    return this._el && this._el.firstChild;
  }
  /**
   * Get / set the background color.
   */
  background(bgcolor) {
    return arguments.length === 0 ? this._bgcolor : (this._bgcolor = bgcolor, this);
  }
  /**
   * Resize the display.
   * @param {number} width - The new coordinate width of the display, in pixels.
   * @param {number} height - The new coordinate height of the display, in pixels.
   * @param {Array<number>} origin - The new origin of the display, in pixels.
   *   The coordinate system will be translated to this point.
   * @param {number} [scaleFactor=1] - Optional scaleFactor by which to multiply
   *   the width and height to determine the final pixel size.
   * @return {Renderer} - This renderer instance;
   */
  resize(width2, height2, origin, scaleFactor) {
    return this._width = width2, this._height = height2, this._origin = origin || [0, 0], this._scale = scaleFactor || 1, this;
  }
  /**
   * Report a dirty item whose bounds should be redrawn.
   * This base class method does nothing. Subclasses that perform
   * incremental should implement this method.
   * @param {Item} item - The dirty item whose bounds should be redrawn.
   */
  dirty() {
  }
  /**
   * Render an input scenegraph, potentially with a set of dirty items.
   * This method will perform an immediate rendering with available resources.
   * The renderer may also need to perform image loading to perform a complete
   * render. This process can lead to asynchronous re-rendering of the scene
   * after this method returns. To receive notification when rendering is
   * complete, use the renderAsync method instead.
   * @param {object} scene - The root mark of a scenegraph to render.
   * @param {Array} markTypes - Array of the mark types to render.
   *                            If undefined, render all mark types
   * @return {Renderer} - This renderer instance.
   */
  render(scene, markTypes) {
    let r = this;
    return r._call = function() {
      r._render(scene, markTypes);
    }, r._call(), r._call = null, r;
  }
  /**
   * Internal rendering method. Renderer subclasses should override this
   * method to actually perform rendering.
   * @param {object} scene - The root mark of a scenegraph to render.
   * @param {Array} markTypes - Array of the mark types to render.
   *                            If undefined, render all mark types
   */
  _render() {
  }
  /**
   * Asynchronous rendering method. Similar to render, but returns a Promise
   * that resolves when all rendering is completed. Sometimes a renderer must
   * perform image loading to get a complete rendering. The returned
   * Promise will not resolve until this process completes.
   * @param {object} scene - The root mark of a scenegraph to render.
   * @param {Array} markTypes - Array of the mark types to render.
   *                            If undefined, render all mark types
   * @return {Promise} - A Promise that resolves when rendering is complete.
   */
  renderAsync(scene, markTypes) {
    let r = this.render(scene, markTypes);
    return this._ready ? this._ready.then(() => r) : Promise.resolve(r);
  }
  /**
   * Internal method for asynchronous resource loading.
   * Proxies method calls to the ImageLoader, and tracks loading
   * progress to invoke a re-render once complete.
   * @param {string} method - The method name to invoke on the ImageLoader.
   * @param {string} uri - The URI for the requested resource.
   * @return {Promise} - A Promise that resolves to the requested resource.
   */
  _load(method2, uri2) {
    var r = this, p = r._loader[method2](uri2);
    if (!r._ready) {
      let call = r._call;
      r._ready = r._loader.ready().then((redraw) => {
        redraw && call(), r._ready = null;
      });
    }
    return p;
  }
  /**
   * Sanitize a URL to include as a hyperlink in the rendered scene.
   * This method proxies a call to ImageLoader.sanitizeURL, but also tracks
   * image loading progress and invokes a re-render once complete.
   * @param {string} uri - The URI string to sanitize.
   * @return {Promise} - A Promise that resolves to the sanitized URL.
   */
  sanitizeURL(uri2) {
    return this._load("sanitizeURL", uri2);
  }
  /**
   * Requests an image to include in the rendered scene.
   * This method proxies a call to ImageLoader.loadImage, but also tracks
   * image loading progress and invokes a re-render once complete.
   * @param {string} uri - The URI string of the image.
   * @return {Promise} - A Promise that resolves to the loaded Image.
   */
  loadImage(uri2) {
    return this._load("loadImage", uri2);
  }
}, KeyDownEvent = "keydown", KeyPressEvent = "keypress", KeyUpEvent = "keyup", DragEnterEvent = "dragenter", DragLeaveEvent = "dragleave", DragOverEvent = "dragover", PointerDownEvent = "pointerdown", PointerUpEvent = "pointerup", PointerMoveEvent = "pointermove", PointerOutEvent = "pointerout", PointerOverEvent = "pointerover", MouseDownEvent = "mousedown", MouseUpEvent = "mouseup", MouseMoveEvent = "mousemove", MouseOutEvent = "mouseout", MouseOverEvent = "mouseover", ClickEvent = "click", DoubleClickEvent = "dblclick", WheelEvent = "wheel", MouseWheelEvent = "mousewheel", TouchStartEvent = "touchstart", TouchMoveEvent = "touchmove", TouchEndEvent = "touchend", Events = [KeyDownEvent, KeyPressEvent, KeyUpEvent, DragEnterEvent, DragLeaveEvent, DragOverEvent, PointerDownEvent, PointerUpEvent, PointerMoveEvent, PointerOutEvent, PointerOverEvent, MouseDownEvent, MouseUpEvent, MouseMoveEvent, MouseOutEvent, MouseOverEvent, ClickEvent, DoubleClickEvent, WheelEvent, MouseWheelEvent, TouchStartEvent, TouchMoveEvent, TouchEndEvent], TooltipShowEvent = PointerMoveEvent, TooltipHideEvent = MouseOutEvent, HrefEvent = ClickEvent, CanvasHandler = class extends Handler {
  constructor(loader2, tooltip2) {
    super(loader2, tooltip2), this._down = null, this._touch = null, this._first = !0, this._events = {}, this.events = Events, this.pointermove = move([PointerMoveEvent, MouseMoveEvent], [PointerOverEvent, MouseOverEvent], [PointerOutEvent, MouseOutEvent]), this.dragover = move([DragOverEvent], [DragEnterEvent], [DragLeaveEvent]), this.pointerout = inactive([PointerOutEvent, MouseOutEvent]), this.dragleave = inactive([DragLeaveEvent]);
  }
  initialize(el, origin, obj) {
    return this._canvas = el && domFind(el, "canvas"), [ClickEvent, MouseDownEvent, PointerDownEvent, PointerMoveEvent, PointerOutEvent, DragLeaveEvent].forEach((type3) => eventListenerCheck(this, type3)), super.initialize(el, origin, obj);
  }
  // return the backing canvas instance
  canvas() {
    return this._canvas;
  }
  // retrieve the current canvas context
  context() {
    return this._canvas.getContext("2d");
  }
  // to keep old versions of firefox happy
  DOMMouseScroll(evt) {
    this.fire(MouseWheelEvent, evt);
  }
  pointerdown(evt) {
    this._down = this._active, this.fire(PointerDownEvent, evt);
  }
  mousedown(evt) {
    this._down = this._active, this.fire(MouseDownEvent, evt);
  }
  click(evt) {
    this._down === this._active && (this.fire(ClickEvent, evt), this._down = null);
  }
  touchstart(evt) {
    this._touch = this.pickEvent(evt.changedTouches[0]), this._first && (this._active = this._touch, this._first = !1), this.fire(TouchStartEvent, evt, !0);
  }
  touchmove(evt) {
    this.fire(TouchMoveEvent, evt, !0);
  }
  touchend(evt) {
    this.fire(TouchEndEvent, evt, !0), this._touch = null;
  }
  // fire an event
  fire(type3, evt, touch2) {
    let a = touch2 ? this._touch : this._active, h2 = this._handlers[type3];
    if (evt.vegaType = type3, type3 === HrefEvent && a && a.href ? this.handleHref(evt, a, a.href) : (type3 === TooltipShowEvent || type3 === TooltipHideEvent) && this.handleTooltip(evt, a, type3 !== TooltipHideEvent), h2)
      for (let i = 0, len = h2.length; i < len; ++i)
        h2[i].handler.call(this._obj, evt, a);
  }
  // add an event handler
  on(type3, handler) {
    let name2 = this.eventName(type3), h2 = this._handlers;
    return this._handlerIndex(h2[name2], type3, handler) < 0 && (eventListenerCheck(this, type3), (h2[name2] || (h2[name2] = [])).push({
      type: type3,
      handler
    })), this;
  }
  // remove an event handler
  off(type3, handler) {
    let name2 = this.eventName(type3), h2 = this._handlers[name2], i = this._handlerIndex(h2, type3, handler);
    return i >= 0 && h2.splice(i, 1), this;
  }
  pickEvent(evt) {
    let p = point6(evt, this._canvas), o = this._origin;
    return this.pick(this._scene, p[0], p[1], p[0] - o[0], p[1] - o[1]);
  }
  // find the scenegraph item at the current pointer position
  // x, y -- the absolute x, y pointer coordinates on the canvas element
  // gx, gy -- the relative coordinates within the current group
  pick(scene, x5, y5, gx, gy) {
    let g = this.context();
    return Marks[scene.marktype].pick.call(this, g, scene, x5, y5, gx, gy);
  }
}, eventBundle = (type3) => type3 === TouchStartEvent || type3 === TouchMoveEvent || type3 === TouchEndEvent ? [TouchStartEvent, TouchMoveEvent, TouchEndEvent] : [type3];
function eventListenerCheck(handler, type3) {
  eventBundle(type3).forEach((_) => addEventListener(handler, _));
}
function addEventListener(handler, type3) {
  let canvas2 = handler.canvas();
  canvas2 && !handler._events[type3] && (handler._events[type3] = 1, canvas2.addEventListener(type3, handler[type3] ? (evt) => handler[type3](evt) : (evt) => handler.fire(type3, evt)));
}
function fireAll(handler, types, event2) {
  types.forEach((type3) => handler.fire(type3, event2));
}
function move(moveEvents, overEvents, outEvents) {
  return function(evt) {
    let a = this._active, p = this.pickEvent(evt);
    p === a ? fireAll(this, moveEvents, evt) : ((!a || !a.exit) && fireAll(this, outEvents, evt), this._active = p, fireAll(this, overEvents, evt), fireAll(this, moveEvents, evt));
  };
}
function inactive(types) {
  return function(evt) {
    fireAll(this, types, evt), this._active = null;
  };
}
function devicePixelRatio() {
  return typeof window < "u" && window.devicePixelRatio || 1;
}
function resize(canvas2, width2, height2, origin, scaleFactor, opt) {
  let inDOM = typeof HTMLElement < "u" && canvas2 instanceof HTMLElement && canvas2.parentNode != null, context3 = canvas2.getContext("2d"), ratio = inDOM ? devicePixelRatio() : scaleFactor;
  canvas2.width = width2 * ratio, canvas2.height = height2 * ratio;
  for (let key2 in opt)
    context3[key2] = opt[key2];
  return inDOM && (canvas2.style.width = width2 + "px", canvas2.style.height = height2 + "px"), context3.pixelRatio = ratio, context3.setTransform(ratio, 0, 0, ratio, ratio * origin[0], ratio * origin[1]), canvas2;
}
var CanvasRenderer = class extends Renderer {
  constructor(loader2) {
    super(loader2), this._options = {}, this._redraw = !1, this._dirty = new Bounds(), this._tempb = new Bounds();
  }
  initialize(el, width2, height2, origin, scaleFactor, options) {
    return this._options = options || {}, this._canvas = this._options.externalContext ? null : canvas(1, 1, this._options.type), el && this._canvas && (domClear(el, 0).appendChild(this._canvas), this._canvas.setAttribute("class", "marks"), this._canvas.style.setProperty("vertical-align", "bottom")), super.initialize(el, width2, height2, origin, scaleFactor);
  }
  resize(width2, height2, origin, scaleFactor) {
    if (super.resize(width2, height2, origin, scaleFactor), this._canvas)
      resize(this._canvas, this._width, this._height, this._origin, this._scale, this._options.context);
    else {
      let ctx = this._options.externalContext;
      ctx || error62("CanvasRenderer is missing a valid canvas or context"), ctx.scale(this._scale, this._scale), ctx.translate(this._origin[0], this._origin[1]);
    }
    return this._redraw = !0, this;
  }
  canvas() {
    return this._canvas;
  }
  context() {
    return this._options.externalContext || (this._canvas ? this._canvas.getContext("2d") : null);
  }
  dirty(item) {
    let b10 = this._tempb.clear().union(item.bounds), g = item.mark.group;
    for (; g; )
      b10.translate(g.x || 0, g.y || 0), g = g.mark.group;
    this._dirty.union(b10);
  }
  _render(scene, markTypes) {
    let g = this.context(), o = this._origin, w2 = this._width, h2 = this._height, db = this._dirty, vb = viewBounds(o, w2, h2);
    g.save();
    let b10 = this._redraw || db.empty() ? (this._redraw = !1, vb.expand(1)) : clipToBounds(g, vb.intersect(db), o);
    return this.clear(-o[0], -o[1], w2, h2), this.draw(g, scene, b10, markTypes), g.restore(), db.clear(), this;
  }
  draw(ctx, scene, bounds2, markTypes) {
    if (scene.marktype !== "group" && markTypes != null && !markTypes.includes(scene.marktype))
      return;
    let mark = Marks[scene.marktype];
    scene.clip && clip2(ctx, scene), mark.draw.call(this, ctx, scene, bounds2, markTypes), scene.clip && ctx.restore();
  }
  clear(x5, y5, w2, h2) {
    let opt = this._options, g = this.context();
    opt.type !== "pdf" && !opt.externalContext && g.clearRect(x5, y5, w2, h2), this._bgcolor != null && (g.fillStyle = this._bgcolor, g.fillRect(x5, y5, w2, h2));
  }
}, viewBounds = (origin, width2, height2) => new Bounds().set(0, 0, width2, height2).translate(-origin[0], -origin[1]);
function clipToBounds(g, b10, origin) {
  return b10.expand(1).round(), g.pixelRatio % 1 && b10.scale(g.pixelRatio).round().scale(1 / g.pixelRatio), b10.translate(-(origin[0] % 1), -(origin[1] % 1)), g.beginPath(), g.rect(b10.x1, b10.y1, b10.width(), b10.height()), g.clip(), b10;
}
var SVGHandler = class extends Handler {
  constructor(loader2, tooltip2) {
    super(loader2, tooltip2);
    let h2 = this;
    h2._hrefHandler = listener(h2, (evt, item) => {
      item && item.href && h2.handleHref(evt, item, item.href);
    }), h2._tooltipHandler = listener(h2, (evt, item) => {
      h2.handleTooltip(evt, item, evt.type !== TooltipHideEvent);
    });
  }
  initialize(el, origin, obj) {
    let svg = this._svg;
    return svg && (svg.removeEventListener(HrefEvent, this._hrefHandler), svg.removeEventListener(TooltipShowEvent, this._tooltipHandler), svg.removeEventListener(TooltipHideEvent, this._tooltipHandler)), this._svg = svg = el && domFind(el, "svg"), svg && (svg.addEventListener(HrefEvent, this._hrefHandler), svg.addEventListener(TooltipShowEvent, this._tooltipHandler), svg.addEventListener(TooltipHideEvent, this._tooltipHandler)), super.initialize(el, origin, obj);
  }
  canvas() {
    return this._svg;
  }
  // add an event handler
  on(type3, handler) {
    let name2 = this.eventName(type3), h2 = this._handlers;
    if (this._handlerIndex(h2[name2], type3, handler) < 0) {
      let x5 = {
        type: type3,
        handler,
        listener: listener(this, handler)
      };
      (h2[name2] || (h2[name2] = [])).push(x5), this._svg && this._svg.addEventListener(name2, x5.listener);
    }
    return this;
  }
  // remove an event handler
  off(type3, handler) {
    let name2 = this.eventName(type3), h2 = this._handlers[name2], i = this._handlerIndex(h2, type3, handler);
    return i >= 0 && (this._svg && this._svg.removeEventListener(name2, h2[i].listener), h2.splice(i, 1)), this;
  }
}, listener = (context3, handler) => (evt) => {
  let item = evt.target.__data__;
  item = Array.isArray(item) ? item[0] : item, evt.vegaType = evt.type, handler.call(context3._obj, evt, item);
}, ARIA_HIDDEN = "aria-hidden", ARIA_LABEL = "aria-label", ARIA_ROLE = "role", ARIA_ROLEDESCRIPTION = "aria-roledescription", GRAPHICS_OBJECT = "graphics-object", GRAPHICS_SYMBOL = "graphics-symbol", bundle = (role, roledesc, label) => ({
  [ARIA_ROLE]: role,
  [ARIA_ROLEDESCRIPTION]: roledesc,
  [ARIA_LABEL]: label || void 0
}), AriaIgnore = toSet(["axis-domain", "axis-grid", "axis-label", "axis-tick", "axis-title", "legend-band", "legend-entry", "legend-gradient", "legend-label", "legend-title", "legend-symbol", "title"]), AriaGuides = {
  axis: {
    desc: "axis",
    caption: axisCaption
  },
  legend: {
    desc: "legend",
    caption: legendCaption
  },
  "title-text": {
    desc: "title",
    caption: (item) => `Title text '${titleCaption(item)}'`
  },
  "title-subtitle": {
    desc: "subtitle",
    caption: (item) => `Subtitle text '${titleCaption(item)}'`
  }
}, AriaEncode = {
  ariaRole: ARIA_ROLE,
  ariaRoleDescription: ARIA_ROLEDESCRIPTION,
  description: ARIA_LABEL
};
function ariaItemAttributes(emit2, item) {
  let hide2 = item.aria === !1;
  if (emit2(ARIA_HIDDEN, hide2 || void 0), hide2 || item.description == null)
    for (let prop in AriaEncode)
      emit2(AriaEncode[prop], void 0);
  else {
    let type3 = item.mark.marktype;
    emit2(ARIA_LABEL, item.description), emit2(ARIA_ROLE, item.ariaRole || (type3 === "group" ? GRAPHICS_OBJECT : GRAPHICS_SYMBOL)), emit2(ARIA_ROLEDESCRIPTION, item.ariaRoleDescription || `${type3} mark`);
  }
}
function ariaMarkAttributes(mark) {
  return mark.aria === !1 ? {
    [ARIA_HIDDEN]: !0
  } : AriaIgnore[mark.role] ? null : AriaGuides[mark.role] ? ariaGuide(mark, AriaGuides[mark.role]) : ariaMark(mark);
}
function ariaMark(mark) {
  let type3 = mark.marktype, recurse2 = type3 === "group" || type3 === "text" || mark.items.some((_) => _.description != null && _.aria !== !1);
  return bundle(recurse2 ? GRAPHICS_OBJECT : GRAPHICS_SYMBOL, `${type3} mark container`, mark.description);
}
function ariaGuide(mark, opt) {
  try {
    let item = mark.items[0], caption = opt.caption || (() => "");
    return bundle(opt.role || GRAPHICS_SYMBOL, opt.desc, mark.description || item.description || caption(item));
  } catch {
    return null;
  }
}
function titleCaption(item) {
  return array_default(item.text).join(" ");
}
function axisCaption(item) {
  let datum2 = item.datum, orient2 = item.orient, title2 = datum2.title ? extractTitle(item) : null, ctx = item.context, scale7 = ctx.scales[datum2.scale].value, locale4 = ctx.dataflow.locale(), type3 = scale7.type;
  return `${orient2 === "left" || orient2 === "right" ? "Y" : "X"}-axis` + (title2 ? ` titled '${title2}'` : "") + ` for a ${isDiscrete(type3) ? "discrete" : type3} scale with ${domainCaption(locale4, scale7, item)}`;
}
function legendCaption(item) {
  let datum2 = item.datum, title2 = datum2.title ? extractTitle(item) : null, type3 = `${datum2.type || ""} legend`.trim(), scales2 = datum2.scales, props = Object.keys(scales2), ctx = item.context, scale7 = ctx.scales[scales2[props[0]]].value, locale4 = ctx.dataflow.locale();
  return capitalize(type3) + (title2 ? ` titled '${title2}'` : "") + ` for ${channelCaption(props)} with ${domainCaption(locale4, scale7, item)}`;
}
function extractTitle(item) {
  try {
    return array_default(peek(item.items).items[0].text).join(" ");
  } catch {
    return null;
  }
}
function channelCaption(props) {
  return props = props.map((p) => p + (p === "fill" || p === "stroke" ? " color" : "")), props.length < 2 ? props[0] : props.slice(0, -1).join(", ") + " and " + peek(props);
}
function capitalize(s) {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}
var innerText = (val) => (val + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), attrText = (val) => innerText(val).replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
function markup() {
  let buf = "", outer = "", inner = "", stack2 = [], clear2 = () => outer = inner = "", push = (tag) => {
    outer && (buf += `${outer}>${inner}`, clear2()), stack2.push(tag);
  }, attr2 = (name2, value3) => (value3 != null && (outer += ` ${name2}="${attrText(value3)}"`), m), m = {
    open(tag, ...attrs) {
      push(tag), outer = "<" + tag;
      for (let set8 of attrs)
        for (let key2 in set8) attr2(key2, set8[key2]);
      return m;
    },
    close() {
      let tag = stack2.pop();
      return outer ? buf += outer + (inner ? `>${inner}</${tag}>` : "/>") : buf += `</${tag}>`, clear2(), m;
    },
    attr: attr2,
    text: (t) => (inner += innerText(t), m),
    toString: () => buf
  };
  return m;
}
var serializeXML = (node2) => _serialize(markup(), node2) + "";
function _serialize(m, node2) {
  if (m.open(node2.tagName), node2.hasAttributes()) {
    let attrs = node2.attributes, n = attrs.length;
    for (let i = 0; i < n; ++i)
      m.attr(attrs[i].name, attrs[i].value);
  }
  if (node2.hasChildNodes()) {
    let children4 = node2.childNodes;
    for (let child of children4)
      child.nodeType === 3 ? m.text(child.nodeValue) : _serialize(m, child);
  }
  return m.close();
}
// End of bundle text, part 9 of 15
export { Band, BinOrdinal, Bounds, CanvasHandler, CanvasRenderer, Diverging, Gradient, GradientLegend, GroupItem,
  Item, Linear2, Log, Marks, Ordinal, Point, Pow, Quantile2, Quantize, Renderer, SVGHandler, Scenegraph, Sequential,
  Sqrt, SymbolLegend, Symlog, Threshold, Time, UTC, Window, ariaItemAttributes, ariaMarkAttributes, bandSpace,
  boundContext, boundStroke, canvas, clip$1, color, cssClass, domChild, domClear, domCreate, fontFamily, fontSize,
  gradientRef, hcl, hsl, implicit, interpolate, interpolateColors, interpolateRange, isContinuous, isDiscrete,
  isDiscretizing, isGradient, isInterpolating, isLogarithmic, isQuantile, isRegisteredScale, isValidScaleType, lab,
  labelFormat, labelFraction, labelValues, lineHeight, markup, metadata, multiLineOffset, parse6, pathRender,
  patternPrefix, point6, quantizeInterpolator, registerScale, rgb, round_default, scale, scaleFraction, scheme,
  serializeXML, textLines, textMetrics, textValue, tickCount, tickFormat2, tickValues, validTicks, value_default,
  vega_view_transforms_exports, visit2 };
