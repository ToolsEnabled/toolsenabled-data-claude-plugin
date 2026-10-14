// ToolsEnabled Data server, part 8 of 15: Vega and d3, which draw charts (lines 30533-36573 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-07-tedata.mjs";
import { __export, __toESM } from "./tedata-server-01-ajv.mjs";
import { require_topojson_client } from "./tedata-server-02-zod.mjs";
import { Window } from "./tedata-server-09-vega.mjs";
// Bundle text, part 8 of 15

// node_modules/vega-util/build/accessor.js
function accessor(fn, fields, name2) {
  return Object.assign(fn, {
    fields: fields || [],
    fname: name2
  });
}
function accessorName(fn) {
  return fn == null ? null : fn.fname;
}
function accessorFields(fn) {
  return fn == null ? null : fn.fields;
}

// node_modules/vega-util/build/getter.js
function getter(path3) {
  return path3.length === 1 ? get1(path3[0]) : getN(path3);
}
var get1 = (field3) => function(obj) {
  return obj[field3];
}, getN = (path3) => {
  let len = path3.length;
  return function(obj) {
    for (let i = 0; i < len; ++i)
      obj = obj[path3[i]];
    return obj;
  };
};

// node_modules/vega-util/build/error.js
function error62(message) {
  throw Error(message);
}

// node_modules/vega-util/build/splitAccessPath.js
function splitAccessPath(p) {
  let path3 = [], n = p.length, q = null, b10 = 0, s = "", i, j2, c;
  p = p + "";
  function push() {
    path3.push(s + p.substring(i, j2)), s = "", i = j2 + 1;
  }
  for (i = j2 = 0; j2 < n; ++j2)
    if (c = p[j2], c === "\\")
      s += p.substring(i, j2++), i = j2;
    else if (c === q)
      push(), q = null, b10 = -1;
    else {
      if (q)
        continue;
      i === b10 && c === '"' || i === b10 && c === "'" ? (i = j2 + 1, q = c) : c === "." && !b10 ? j2 > i ? push() : i = j2 + 1 : c === "[" ? (j2 > i && push(), b10 = i = j2 + 1) : c === "]" && (b10 || error62("Access path missing open bracket: " + p), b10 > 0 && push(), b10 = 0, i = j2 + 1);
    }
  return b10 && error62("Access path missing closing bracket: " + p), q && error62("Access path missing closing quote: " + p), j2 > i && (j2++, push()), path3;
}

// node_modules/vega-util/build/field.js
function field(field3, name2, opt) {
  let path3 = splitAccessPath(field3), fieldName2 = path3.length === 1 ? path3[0] : field3;
  return accessor((opt && opt.get || getter)(path3), [fieldName2], name2 || fieldName2);
}

// node_modules/vega-util/build/accessors.js
var id2 = field("id"), identity6 = accessor((_) => _, [], "identity"), zero = accessor(() => 0, [], "zero"), one = accessor(() => 1, [], "one"), truthy = accessor(() => !0, [], "true"), falsy = accessor(() => !1, [], "false");

// node_modules/vega-util/build/interpreter.js
var DisallowedObjectProperties = /* @__PURE__ */ new Set([
  ...Object.getOwnPropertyNames(Object.prototype).filter((name2) => typeof Object.prototype[name2] == "function"),
  "__proto__",
  "then"
]);

// node_modules/vega-util/build/logger.js
function log(method2, level, input2) {
  let args = [level, ...input2];
  console[method2](...args);
}
var None = 0, Error2 = 1, Warn = 2, Info = 3, Debug = 4;
function logger_default(_, method2, handler = log) {
  let level = _ || None;
  return {
    level(_2) {
      return arguments.length ? (level = +_2, this) : level;
    },
    error(...args) {
      return level >= Error2 && handler(method2 || "error", "ERROR", args), this;
    },
    warn(...args) {
      return level >= Warn && handler(method2 || "warn", "WARN", args), this;
    },
    info(...args) {
      return level >= Info && handler(method2 || "log", "INFO", args), this;
    },
    debug(...args) {
      return level >= Debug && handler(method2 || "log", "DEBUG", args), this;
    }
  };
}

// node_modules/vega-util/build/isArray.js
var isArray = Array.isArray;

// node_modules/vega-util/build/isObject.js
function isObject2(_) {
  return _ === Object(_);
}

// node_modules/vega-util/build/mergeConfig.js
var isLegalKey = (key2) => key2 !== "__proto__" && key2 !== "constructor" && key2 !== "prototype";
function mergeConfig(...configs) {
  return configs.reduce((out, source4) => {
    for (let key2 in source4)
      if (key2 === "signals")
        out.signals = mergeNamed(out.signals, source4.signals);
      else {
        let r = key2 === "legend" ? { layout: 1 } : key2 === "style" ? !0 : null;
        writeConfig(out, key2, source4[key2], r);
      }
    return out;
  }, {});
}
function writeConfig(output4, key2, value3, recurse2) {
  if (!isLegalKey(key2))
    return;
  let out = output4, k, o;
  if (isObject2(value3) && !isArray(value3)) {
    let valueObj = value3;
    o = isObject2(out[key2]) ? out[key2] : out[key2] = {};
    for (k in valueObj)
      recurse2 && (recurse2 === !0 || recurse2[k]) ? writeConfig(o, k, valueObj[k]) : isLegalKey(k) && (o[k] = valueObj[k]);
  } else
    out[key2] = value3;
}
function mergeNamed(a, b10) {
  if (a == null)
    return b10;
  if (b10 == null)
    return a;
  let map4 = {}, out = [];
  function add6(item) {
    map4[item.name] || (map4[item.name] = 1, out.push(item));
  }
  return b10.forEach(add6), a.forEach(add6), out;
}

// node_modules/vega-util/build/peek.js
function peek(array4) {
  return array4[array4.length - 1];
}

// node_modules/vega-util/build/toNumber.js
function toNumber(_) {
  return _ == null || _ === "" ? null : +_;
}

// node_modules/vega-util/build/transform.js
function isNonEmpty(arr) {
  return arr.length > 0;
}
var exp = (sign3) => (x5) => sign3 * Math.exp(x5), log2 = (sign3) => (x5) => Math.log(sign3 * x5), symlog = (c) => (x5) => Math.sign(x5) * Math.log1p(Math.abs(x5 / c)), symexp = (c) => (x5) => Math.sign(x5) * Math.expm1(Math.abs(x5)) * c, pow = (exponent2) => (x5) => x5 < 0 ? -Math.pow(-x5, exponent2) : Math.pow(x5, exponent2), coerceNumber = (x5) => toNumber(x5) ?? 0, identity7 = (x5) => x5;
function pan(domain4, delta, lift, ground) {
  isNonEmpty(domain4) || error62("Domain array must not be empty");
  let d0 = lift(domain4[0]), d1 = lift(peek(domain4)), dd = (d1 - d0) * delta;
  return [
    ground(d0 - dd),
    ground(d1 - dd)
  ];
}
function panLinear(domain4, delta) {
  return pan(domain4, delta, coerceNumber, identity7);
}
function panLog(domain4, delta) {
  let sign3 = Math.sign(domain4[0]);
  return pan(domain4, delta, log2(sign3), exp(sign3));
}
function panPow(domain4, delta, exponent2) {
  return pan(domain4, delta, pow(exponent2), pow(1 / exponent2));
}
function panSymlog(domain4, delta, constant2) {
  return pan(domain4, delta, symlog(constant2), symexp(constant2));
}
function zoom(domain4, anchor2, scale7, lift, ground) {
  isNonEmpty(domain4) || error62("Domain array must not be empty");
  let d0 = lift(domain4[0]), d1 = lift(peek(domain4)), da2 = anchor2 != null ? lift(anchor2) : (d0 + d1) / 2;
  return [
    ground(da2 + (d0 - da2) * scale7),
    ground(da2 + (d1 - da2) * scale7)
  ];
}
function zoomLinear(domain4, anchor2, scale7) {
  return zoom(domain4, anchor2, scale7, coerceNumber, identity7);
}
function zoomLog(domain4, anchor2, scale7) {
  let sign3 = Math.sign(domain4[0]);
  return zoom(domain4, anchor2, scale7, log2(sign3), exp(sign3));
}
function zoomPow(domain4, anchor2, scale7, exponent2) {
  return zoom(domain4, anchor2, scale7, pow(exponent2), pow(1 / exponent2));
}
function zoomSymlog(domain4, anchor2, scale7, constant2) {
  return zoom(domain4, anchor2, scale7, symlog(constant2), symexp(constant2));
}

// node_modules/vega-util/build/quarter.js
function quarter(date6) {
  return 1 + ~~(new Date(date6).getMonth() / 3);
}
function utcquarter(date6) {
  return 1 + ~~(new Date(date6).getUTCMonth() / 3);
}

// node_modules/vega-util/build/array.js
function array_default(_) {
  return _ != null ? isArray(_) ? _ : [_] : [];
}

// node_modules/vega-util/build/clampRange.js
function clampRange(range7, min4, max4) {
  let lo = range7[0], hi = range7[1], span;
  return hi < lo && (span = hi, hi = lo, lo = span), span = hi - lo, span >= max4 - min4 ? [min4, max4] : [
    lo = Math.min(Math.max(lo, min4), max4 - span),
    lo + span
  ];
}

// node_modules/vega-util/build/isFunction.js
function isFunction(value3) {
  return typeof value3 == "function";
}

// node_modules/vega-util/build/compare.js
var DESCENDING = "descending";
function compare(inputFields, inputOrders, inputOpt) {
  let opt = inputOpt || {}, orders = array_default(inputOrders) || [], ord = [], get6 = [], fmap = {}, gen = opt.comparator || comparator;
  return array_default(inputFields).forEach((f, i) => {
    if (f == null)
      return;
    ord.push(orders[i] === DESCENDING ? -1 : 1);
    let accessor2 = isFunction(f) ? f : field(f, void 0, opt);
    get6.push(accessor2), (accessorFields(accessor2) || []).forEach((_) => fmap[_] = 1);
  }), get6.length === 0 ? null : accessor(gen(get6, ord), Object.keys(fmap));
}
var ascending = (_u2, _v) => {
  let u4 = _u2, v2 = _v;
  return (u4 < v2 || u4 == null) && v2 != null ? -1 : (u4 > v2 || v2 == null) && u4 != null ? 1 : (v2 = v2 instanceof Date ? +v2 : v2, (u4 = u4 instanceof Date ? +u4 : u4) !== u4 && v2 === v2 ? -1 : v2 !== v2 && u4 === u4 ? 1 : 0);
}, comparator = (fields, orders) => fields.length === 1 ? compare1(fields[0], orders[0]) : compareN(fields, orders, fields.length), compare1 = (field3, order) => function(a, b10) {
  return ascending(field3(a), field3(b10)) * order;
}, compareN = (fields, orders, n) => (orders.push(0), function(a, b10) {
  let f, c = 0, i = -1;
  for (; c === 0 && ++i < n; )
    f = fields[i], c = ascending(f(a), f(b10));
  return c * orders[i];
});

// node_modules/vega-util/build/constant.js
function constant_default(_) {
  return isFunction(_) ? _ : () => _;
}

// node_modules/vega-util/build/debounce.js
function debounce(delay2, handler) {
  let tid = null;
  return (e) => {
    tid && clearTimeout(tid), tid = setTimeout(() => (handler(e), tid = null), delay2);
  };
}

// node_modules/vega-util/build/extend.js
function extend2(_, ...args) {
  for (let arg of args)
    for (let k in arg)
      _[k] = arg[k];
  return _;
}

// node_modules/vega-util/build/extent.js
function extent(array4, f) {
  let i = 0, n, v2, min4, max4;
  if (array4 && (n = array4.length))
    if (f == null) {
      for (v2 = array4[i]; i < n && (v2 == null || v2 !== v2); v2 = array4[++i])
        ;
      for (min4 = max4 = v2; i < n; ++i)
        v2 = array4[i], v2 != null && (v2 < min4 && (min4 = v2), v2 > max4 && (max4 = v2));
    } else {
      for (v2 = f(array4[i]); i < n && (v2 == null || v2 !== v2); v2 = f(array4[++i]))
        ;
      for (min4 = max4 = v2; i < n; ++i)
        v2 = f(array4[i]), v2 != null && (v2 < min4 && (min4 = v2), v2 > max4 && (max4 = v2));
    }
  return [min4, max4];
}

// node_modules/vega-util/build/extentIndex.js
function extentIndex(array4, f) {
  let n = array4.length, i = -1, u4, v2, a, b10, c;
  if (f == null) {
    for (; ++i < n; )
      if (b10 = array4[i], b10 != null && b10 >= b10) {
        a = c = b10;
        break;
      }
    if (i === n)
      return [-1, -1];
    for (u4 = v2 = i; ++i < n; )
      b10 = array4[i], b10 != null && (a > b10 && (a = b10, u4 = i), c < b10 && (c = b10, v2 = i));
  } else {
    for (; ++i < n; )
      if (b10 = f(array4[i], i, array4), b10 != null && b10 >= b10) {
        a = c = b10;
        break;
      }
    if (i === n)
      return [-1, -1];
    for (u4 = v2 = i; ++i < n; )
      b10 = f(array4[i], i, array4), b10 != null && (a > b10 && (a = b10, u4 = i), c < b10 && (c = b10, v2 = i));
  }
  return [u4, v2];
}

// node_modules/vega-util/build/hasOwnProperty.js
function hasOwnProperty(object4, property2) {
  return Object.hasOwn(object4, property2);
}

// node_modules/vega-util/build/fastmap.js
var NULL = {};
function fastmap(input2) {
  let obj = {}, test2;
  function has2(key2) {
    return hasOwnProperty(obj, key2) && obj[key2] !== NULL;
  }
  let map4 = {
    size: 0,
    empty: 0,
    object: obj,
    has: has2,
    get(key2) {
      return has2(key2) ? obj[key2] : void 0;
    },
    set(key2, value3) {
      return has2(key2) || (++map4.size, obj[key2] === NULL && --map4.empty), obj[key2] = value3, this;
    },
    delete(key2) {
      return has2(key2) && (--map4.size, ++map4.empty, obj[key2] = NULL), this;
    },
    clear() {
      map4.size = map4.empty = 0, map4.object = obj = {};
    },
    /** See the FastMap interface for the expected return type, which depends on whether a function is provided */
    test(fn) {
      return arguments.length ? (test2 = fn, map4) : test2;
    },
    clean() {
      let next = {}, size = 0;
      for (let key2 in obj) {
        let value3 = obj[key2];
        value3 !== NULL && (!test2 || !test2(value3)) && (next[key2] = value3, ++size);
      }
      map4.size = size, map4.empty = 0, map4.object = obj = next;
    }
  };
  return input2 && Object.keys(input2).forEach((key2) => {
    map4.set(key2, input2[key2]);
  }), map4;
}

// node_modules/vega-util/build/flush.js
function flush_default(range7, value3, threshold2, left, right, center) {
  if (!threshold2 && threshold2 !== 0)
    return center;
  let t = +threshold2, a = range7[0], b10 = peek(range7), l;
  if (b10 === void 0)
    return center;
  b10 < a && (l = a, a = b10, b10 = l), l = Math.abs(value3 - a);
  let r = Math.abs(b10 - value3);
  return l < r && l <= t ? left : r <= t ? right : center;
}

// node_modules/vega-util/build/inherits.js
function inherits_default(child, parent, members2) {
  let proto = child.prototype = Object.create(parent.prototype);
  return Object.defineProperty(proto, "constructor", {
    value: child,
    writable: !0,
    enumerable: !0,
    configurable: !0
  }), extend2(proto, members2);
}

// node_modules/vega-util/build/inrange.js
function inrange(value3, range7, left, right) {
  let r0 = range7[0], r1 = range7[range7.length - 1], t;
  return r0 > r1 && (t = r0, r0 = r1, r1 = t), left = left === void 0 || left, right = right === void 0 || right, (left ? r0 <= value3 : r0 < value3) && (right ? value3 <= r1 : value3 < r1);
}

// node_modules/vega-util/build/isBoolean.js
function isBoolean(value3) {
  return typeof value3 == "boolean";
}

// node_modules/vega-util/build/isDate.js
function isDate(value3) {
  return Object.prototype.toString.call(value3) === "[object Date]";
}

// node_modules/vega-util/build/isIterable.js
function isIterable(value3) {
  return value3 != null && isFunction(value3[Symbol.iterator]);
}

// node_modules/vega-util/build/isNumber.js
function isNumber(value3) {
  return typeof value3 == "number";
}

// node_modules/vega-util/build/isRegExp.js
function isRegExp(value3) {
  return Object.prototype.toString.call(value3) === "[object RegExp]";
}

// node_modules/vega-util/build/isString.js
function isString(_) {
  return typeof _ == "string";
}

// node_modules/vega-util/build/key.js
function key(fields, flat, opt) {
  let processedFields = fields ? flat ? array_default(fields).map((f) => f.replace(/\\(.)/g, "$1")) : array_default(fields) : void 0, len = processedFields?.length, gen = opt && opt.get || getter, map4 = (f) => gen(flat ? [f] : splitAccessPath(f)), fn;
  if (!len || !processedFields)
    fn = function() {
      return "";
    };
  else if (len === 1) {
    let get6 = map4(processedFields[0]);
    fn = function(_) {
      return "" + get6(_);
    };
  } else {
    let get6 = processedFields.map(map4);
    fn = function(_) {
      let s = "" + get6[0](_), i = 0;
      for (; ++i < len; )
        s += "|" + get6[i](_);
      return s;
    };
  }
  return accessor(fn, processedFields, "key");
}

// node_modules/vega-util/build/lerp.js
function lerp_default(array4, frac) {
  let lo = array4[0], hi = peek(array4), f = +frac;
  return hi === void 0 ? lo : f ? f === 1 ? hi : lo + f * (hi - lo) : lo;
}

// node_modules/vega-util/build/lruCache.js
var DEFAULT_MAX_SIZE = 1e4;
function lruCache_default(maxsize) {
  maxsize = +maxsize || DEFAULT_MAX_SIZE;
  let curr, prev, size, clear2 = () => {
    curr = {}, prev = {}, size = 0;
  }, update3 = (key2, value3) => (++size > maxsize && (prev = curr, curr = {}, size = 1), curr[key2] = value3);
  return clear2(), {
    clear: clear2,
    has: (key2) => hasOwnProperty(curr, key2) || hasOwnProperty(prev, key2),
    get: (key2) => hasOwnProperty(curr, key2) ? curr[key2] : hasOwnProperty(prev, key2) ? update3(key2, prev[key2]) : void 0,
    set: (key2, value3) => hasOwnProperty(curr, key2) ? curr[key2] = value3 : update3(key2, value3)
  };
}

// node_modules/vega-util/build/merge.js
function isArrayConstructor(ctor) {
  return ctor === Array || typeof ctor == "function" && ctor.prototype && ArrayBuffer.isView(ctor.prototype);
}
function merge2(compare3, array0, array1, output4) {
  let n0 = array0.length, n1 = array1.length;
  if (!n1)
    return array0;
  if (!n0)
    return array1;
  let ctor = array0.constructor, merged = output4 || (isArrayConstructor(ctor) ? new ctor(n0 + n1) : new Array(n0 + n1)), i0 = 0, i1 = 0, i = 0;
  for (; i0 < n0 && i1 < n1; ++i)
    merged[i] = compare3(array0[i0], array1[i1]) > 0 ? array1[i1++] : array0[i0++];
  for (; i0 < n0; ++i0, ++i)
    merged[i] = array0[i0];
  for (; i1 < n1; ++i1, ++i)
    merged[i] = array1[i1];
  return merged;
}

// node_modules/vega-util/build/repeat.js
function repeat(str, reps) {
  let s = "";
  for (; --reps >= 0; )
    s += str;
  return s;
}

// node_modules/vega-util/build/pad.js
function pad(str, length3, padchar, align2) {
  let c = padchar || " ", s = str + "", n = length3 - s.length;
  return n <= 0 ? s : align2 === "left" ? repeat(c, n) + s : align2 === "center" ? repeat(c, ~~(n / 2)) + s + repeat(c, Math.ceil(n / 2)) : s + repeat(c, n);
}

// node_modules/vega-util/build/span.js
function span_default(array4) {
  return array4 && peek(array4) - array4[0] || 0;
}

// node_modules/vega-util/build/stringValue.js
function stringValue(x5) {
  return isArray(x5) ? `[${x5.map((v2) => v2 === null ? "null" : stringValue(v2))}]` : isObject2(x5) || isString(x5) ? (
    // Output valid JSON and JS source strings.
    // See https://github.com/judofyr/timeless/blob/master/posts/json-isnt-a-javascript-subset.md
    JSON.stringify(x5).replaceAll("\u2028", "\\u2028").replaceAll("\u2029", "\\u2029")
  ) : x5;
}

// node_modules/vega-util/build/toBoolean.js
function toBoolean(_) {
  return _ == null || _ === "" ? null : !_ || _ === "false" || _ === "0" ? !1 : !!_;
}

// node_modules/vega-util/build/toDate.js
var defaultParser = (_) => (
  // Date.parse accepts string but will implicitly coerce the input value.
  // Type assertion allows Date.parse to handle its own coercion behavior.
  isNumber(_) || isDate(_) ? _ : Date.parse(_)
);
function toDate(_, parser4) {
  return parser4 = parser4 || defaultParser, _ == null || _ === "" ? null : parser4(_);
}

// node_modules/vega-util/build/toString.js
function toString(_) {
  return _ == null || _ === "" ? null : _ + "";
}

// node_modules/vega-util/build/toSet.js
function toSet(_) {
  let s = {}, n = _.length;
  for (let i = 0; i < n; ++i)
    s[_[i] + ""] = !0;
  return s;
}

// node_modules/vega-util/build/truncate.js
function truncate(str, length3, align2, ellipsis) {
  let e = ellipsis ?? "\u2026", s = str + "", n = s.length, l = Math.max(0, length3 - e.length);
  return n <= length3 ? s : align2 === "left" ? e + s.slice(n - l) : align2 === "center" ? s.slice(0, Math.ceil(l / 2)) + e + s.slice(n - ~~(l / 2)) : s.slice(0, l) + e;
}

// node_modules/vega-util/build/visitArray.js
function visitArray(array4, filter3, visitor) {
  if (array4)
    if (filter3) {
      let n = array4.length;
      for (let i = 0; i < n; ++i) {
        let t = filter3(array4[i]);
        t && visitor(t, i, array4);
      }
    } else
      array4.forEach(visitor);
}

// node_modules/vega-loader/build/vega-loader.node.js
import fs from "fs";

// node_modules/d3-dsv/src/dsv.js
var EOL = {}, EOF = {}, QUOTE = 34, NEWLINE = 10, RETURN = 13;
function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name2, i) {
    return JSON.stringify(name2) + ": d[" + i + '] || ""';
  }).join(",") + "}");
}
function customConverter(columns, f) {
  var object4 = objectConverter(columns);
  return function(row, i) {
    return f(object4(row), i, columns);
  };
}
function inferColumns(rows) {
  var columnSet = /* @__PURE__ */ Object.create(null), columns = [];
  return rows.forEach(function(row) {
    for (var column in row)
      column in columnSet || columns.push(columnSet[column] = column);
  }), columns;
}
function pad2(value3, width2) {
  var s = value3 + "", length3 = s.length;
  return length3 < width2 ? new Array(width2 - length3 + 1).join(0) + s : s;
}
function formatYear(year) {
  return year < 0 ? "-" + pad2(-year, 6) : year > 9999 ? "+" + pad2(year, 6) : pad2(year, 4);
}
function formatDate(date6) {
  var hours = date6.getUTCHours(), minutes = date6.getUTCMinutes(), seconds2 = date6.getUTCSeconds(), milliseconds2 = date6.getUTCMilliseconds();
  return isNaN(date6) ? "Invalid Date" : formatYear(date6.getUTCFullYear(), 4) + "-" + pad2(date6.getUTCMonth() + 1, 2) + "-" + pad2(date6.getUTCDate(), 2) + (milliseconds2 ? "T" + pad2(hours, 2) + ":" + pad2(minutes, 2) + ":" + pad2(seconds2, 2) + "." + pad2(milliseconds2, 3) + "Z" : seconds2 ? "T" + pad2(hours, 2) + ":" + pad2(minutes, 2) + ":" + pad2(seconds2, 2) + "Z" : minutes || hours ? "T" + pad2(hours, 2) + ":" + pad2(minutes, 2) + "Z" : "");
}
function dsv_default(delimiter) {
  var reFormat = new RegExp('["' + delimiter + `
\r]`), DELIMITER = delimiter.charCodeAt(0);
  function parse9(text4, f) {
    var convert, columns, rows = parseRows(text4, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    return rows.columns = columns || [], rows;
  }
  function parseRows(text4, f) {
    var rows = [], N = text4.length, I = 0, n = 0, t, eof = N <= 0, eol = !1;
    text4.charCodeAt(N - 1) === NEWLINE && --N, text4.charCodeAt(N - 1) === RETURN && --N;
    function token() {
      if (eof) return EOF;
      if (eol) return eol = !1, EOL;
      var i, j2 = I, c;
      if (text4.charCodeAt(j2) === QUOTE) {
        for (; I++ < N && text4.charCodeAt(I) !== QUOTE || text4.charCodeAt(++I) === QUOTE; ) ;
        return (i = I) >= N ? eof = !0 : (c = text4.charCodeAt(I++)) === NEWLINE ? eol = !0 : c === RETURN && (eol = !0, text4.charCodeAt(I) === NEWLINE && ++I), text4.slice(j2 + 1, i - 1).replace(/""/g, '"');
      }
      for (; I < N; ) {
        if ((c = text4.charCodeAt(i = I++)) === NEWLINE) eol = !0;
        else if (c === RETURN)
          eol = !0, text4.charCodeAt(I) === NEWLINE && ++I;
        else if (c !== DELIMITER) continue;
        return text4.slice(j2, i);
      }
      return eof = !0, text4.slice(j2, N);
    }
    for (; (t = token()) !== EOF; ) {
      for (var row = []; t !== EOL && t !== EOF; ) row.push(t), t = token();
      f && (row = f(row, n++)) == null || rows.push(row);
    }
    return rows;
  }
  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue3(row[column]);
      }).join(delimiter);
    });
  }
  function format5(rows, columns) {
    return columns == null && (columns = inferColumns(rows)), [columns.map(formatValue3).join(delimiter)].concat(preformatBody(rows, columns)).join(`
`);
  }
  function formatBody(rows, columns) {
    return columns == null && (columns = inferColumns(rows)), preformatBody(rows, columns).join(`
`);
  }
  function formatRows(rows) {
    return rows.map(formatRow).join(`
`);
  }
  function formatRow(row) {
    return row.map(formatValue3).join(delimiter);
  }
  function formatValue3(value3) {
    return value3 == null ? "" : value3 instanceof Date ? formatDate(value3) : reFormat.test(value3 += "") ? '"' + value3.replace(/"/g, '""') + '"' : value3;
  }
  return {
    parse: parse9,
    parseRows,
    format: format5,
    formatBody,
    formatRows,
    formatRow,
    formatValue: formatValue3
  };
}

// node_modules/vega-loader/build/vega-loader.node.js
var import_topojson_client = __toESM(require_topojson_client(), 1);

// node_modules/d3-array/src/ascending.js
function ascending2(a, b10) {
  return a == null || b10 == null ? NaN : a < b10 ? -1 : a > b10 ? 1 : a >= b10 ? 0 : NaN;
}

// node_modules/d3-array/src/descending.js
function descending(a, b10) {
  return a == null || b10 == null ? NaN : b10 < a ? -1 : b10 > a ? 1 : b10 >= a ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare12, compare22, delta;
  f.length !== 2 ? (compare12 = ascending2, compare22 = (d, x5) => ascending2(f(d), x5), delta = (d, x5) => f(d) - x5) : (compare12 = f === ascending2 || f === descending ? f : zero2, compare22 = f, delta = f);
  function left(a, x5, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare12(x5, x5) !== 0) return hi;
      do {
        let mid = lo + hi >>> 1;
        compare22(a[mid], x5) < 0 ? lo = mid + 1 : hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a, x5, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare12(x5, x5) !== 0) return hi;
      do {
        let mid = lo + hi >>> 1;
        compare22(a[mid], x5) <= 0 ? lo = mid + 1 : hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a, x5, lo = 0, hi = a.length) {
    let i = left(a, x5, lo, hi - 1);
    return i > lo && delta(a[i - 1], x5) > -delta(a[i], x5) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero2() {
  return 0;
}

// node_modules/d3-array/src/number.js
function number4(x5) {
  return x5 === null ? NaN : +x5;
}
function* numbers(values3, valueof) {
  if (valueof === void 0)
    for (let value3 of values3)
      value3 != null && (value3 = +value3) >= value3 && (yield value3);
  else {
    let index4 = -1;
    for (let value3 of values3)
      (value3 = valueof(value3, ++index4, values3)) != null && (value3 = +value3) >= value3 && (yield value3);
  }
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending2), bisectRight = ascendingBisect.right, bisectLeft = ascendingBisect.left, bisectCenter = bisector(number4).center, bisect_default = bisectRight;

// node_modules/d3-array/src/variance.js
function variance(values3, valueof) {
  let count4 = 0, delta, mean2 = 0, sum3 = 0;
  if (valueof === void 0)
    for (let value3 of values3)
      value3 != null && (value3 = +value3) >= value3 && (delta = value3 - mean2, mean2 += delta / ++count4, sum3 += delta * (value3 - mean2));
  else {
    let index4 = -1;
    for (let value3 of values3)
      (value3 = valueof(value3, ++index4, values3)) != null && (value3 = +value3) >= value3 && (delta = value3 - mean2, mean2 += delta / ++count4, sum3 += delta * (value3 - mean2));
  }
  if (count4 > 1) return sum3 / (count4 - 1);
}

// node_modules/d3-array/src/deviation.js
function deviation(values3, valueof) {
  let v2 = variance(values3, valueof);
  return v2 && Math.sqrt(v2);
}

// node_modules/d3-array/src/fsum.js
var Adder = class {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(x5) {
    let p = this._partials, i = 0;
    for (let j2 = 0; j2 < this._n && j2 < 32; j2++) {
      let y5 = p[j2], hi = x5 + y5, lo = Math.abs(x5) < Math.abs(y5) ? x5 - (hi - y5) : y5 - (hi - x5);
      lo && (p[i++] = lo), x5 = hi;
    }
    return p[i] = x5, this._n = i + 1, this;
  }
  valueOf() {
    let p = this._partials, n = this._n, x5, y5, lo, hi = 0;
    if (n > 0) {
      for (hi = p[--n]; n > 0 && (x5 = hi, y5 = p[--n], hi = x5 + y5, lo = y5 - (hi - x5), !lo); )
        ;
      n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0) && (y5 = lo * 2, x5 = hi + y5, y5 == x5 - hi && (hi = x5));
    }
    return hi;
  }
};

// node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries2, key2 = keyof2) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key2 } }), entries2 != null) for (let [key3, value3] of entries2) this.set(key3, value3);
  }
  get(key2) {
    return super.get(intern_get(this, key2));
  }
  has(key2) {
    return super.has(intern_get(this, key2));
  }
  set(key2, value3) {
    return super.set(intern_set(this, key2), value3);
  }
  delete(key2) {
    return super.delete(intern_delete(this, key2));
  }
}, InternSet = class extends Set {
  constructor(values3, key2 = keyof2) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key2 } }), values3 != null) for (let value3 of values3) this.add(value3);
  }
  has(value3) {
    return super.has(intern_get(this, value3));
  }
  add(value3) {
    return super.add(intern_set(this, value3));
  }
  delete(value3) {
    return super.delete(intern_delete(this, value3));
  }
};
function intern_get({ _intern, _key }, value3) {
  let key2 = _key(value3);
  return _intern.has(key2) ? _intern.get(key2) : value3;
}
function intern_set({ _intern, _key }, value3) {
  let key2 = _key(value3);
  return _intern.has(key2) ? _intern.get(key2) : (_intern.set(key2, value3), value3);
}
function intern_delete({ _intern, _key }, value3) {
  let key2 = _key(value3);
  return _intern.has(key2) && (value3 = _intern.get(key2), _intern.delete(key2)), value3;
}
function keyof2(value3) {
  return value3 !== null && typeof value3 == "object" ? value3.valueOf() : value3;
}

// node_modules/d3-array/src/permute.js
function permute(source4, keys4) {
  return Array.from(keys4, (key2) => source4[key2]);
}

// node_modules/d3-array/src/sort.js
function compareDefined(compare3 = ascending2) {
  if (compare3 === ascending2) return ascendingDefined;
  if (typeof compare3 != "function") throw new TypeError("compare is not a function");
  return (a, b10) => {
    let x5 = compare3(a, b10);
    return x5 || x5 === 0 ? x5 : (compare3(b10, b10) === 0) - (compare3(a, a) === 0);
  };
}
function ascendingDefined(a, b10) {
  return (a == null || !(a >= a)) - (b10 == null || !(b10 >= b10)) || (a < b10 ? -1 : a > b10 ? 1 : 0);
}

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickSpec(start, stop2, count4) {
  let step = (stop2 - start) / Math.max(0, count4), power = Math.floor(Math.log10(step)), error64 = step / Math.pow(10, power), factor = error64 >= e10 ? 10 : error64 >= e5 ? 5 : error64 >= e2 ? 2 : 1, i1, i2, inc;
  return power < 0 ? (inc = Math.pow(10, -power) / factor, i1 = Math.round(start * inc), i2 = Math.round(stop2 * inc), i1 / inc < start && ++i1, i2 / inc > stop2 && --i2, inc = -inc) : (inc = Math.pow(10, power) * factor, i1 = Math.round(start / inc), i2 = Math.round(stop2 / inc), i1 * inc < start && ++i1, i2 * inc > stop2 && --i2), i2 < i1 && 0.5 <= count4 && count4 < 2 ? tickSpec(start, stop2, count4 * 2) : [i1, i2, inc];
}
function ticks(start, stop2, count4) {
  if (stop2 = +stop2, start = +start, count4 = +count4, !(count4 > 0)) return [];
  if (start === stop2) return [start];
  let reverse3 = stop2 < start, [i1, i2, inc] = reverse3 ? tickSpec(stop2, start, count4) : tickSpec(start, stop2, count4);
  if (!(i2 >= i1)) return [];
  let n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse3)
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) * inc;
  else if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) / -inc;
  else for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) * inc;
  return ticks2;
}
function tickIncrement(start, stop2, count4) {
  return stop2 = +stop2, start = +start, count4 = +count4, tickSpec(start, stop2, count4)[2];
}
function tickStep(start, stop2, count4) {
  stop2 = +stop2, start = +start, count4 = +count4;
  let reverse3 = stop2 < start, inc = reverse3 ? tickIncrement(stop2, start, count4) : tickIncrement(start, stop2, count4);
  return (reverse3 ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// node_modules/d3-array/src/max.js
function max(values3, valueof) {
  let max4;
  if (valueof === void 0)
    for (let value3 of values3)
      value3 != null && (max4 < value3 || max4 === void 0 && value3 >= value3) && (max4 = value3);
  else {
    let index4 = -1;
    for (let value3 of values3)
      (value3 = valueof(value3, ++index4, values3)) != null && (max4 < value3 || max4 === void 0 && value3 >= value3) && (max4 = value3);
  }
  return max4;
}

// node_modules/d3-array/src/min.js
function min(values3, valueof) {
  let min4;
  if (valueof === void 0)
    for (let value3 of values3)
      value3 != null && (min4 > value3 || min4 === void 0 && value3 >= value3) && (min4 = value3);
  else {
    let index4 = -1;
    for (let value3 of values3)
      (value3 = valueof(value3, ++index4, values3)) != null && (min4 > value3 || min4 === void 0 && value3 >= value3) && (min4 = value3);
  }
  return min4;
}

// node_modules/d3-array/src/quickselect.js
function quickselect(array4, k, left = 0, right = 1 / 0, compare3) {
  if (k = Math.floor(k), left = Math.floor(Math.max(0, left)), right = Math.floor(Math.min(array4.length - 1, right)), !(left <= k && k <= right)) return array4;
  for (compare3 = compare3 === void 0 ? ascendingDefined : compareDefined(compare3); right > left; ) {
    if (right - left > 600) {
      let n = right - left + 1, m = k - left + 1, z2 = Math.log(n), s = 0.5 * Math.exp(2 * z2 / 3), sd = 0.5 * Math.sqrt(z2 * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1), newLeft = Math.max(left, Math.floor(k - m * s / n + sd)), newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array4, k, newLeft, newRight, compare3);
    }
    let t = array4[k], i = left, j2 = right;
    for (swap(array4, left, k), compare3(array4[right], t) > 0 && swap(array4, left, right); i < j2; ) {
      for (swap(array4, i, j2), ++i, --j2; compare3(array4[i], t) < 0; ) ++i;
      for (; compare3(array4[j2], t) > 0; ) --j2;
    }
    compare3(array4[left], t) === 0 ? swap(array4, left, j2) : (++j2, swap(array4, j2, right)), j2 <= k && (left = j2 + 1), k <= j2 && (right = j2 - 1);
  }
  return array4;
}
function swap(array4, i, j2) {
  let t = array4[i];
  array4[i] = array4[j2], array4[j2] = t;
}

// node_modules/d3-array/src/quantile.js
function quantile(values3, p, valueof) {
  if (values3 = Float64Array.from(numbers(values3, valueof)), !(!(n = values3.length) || isNaN(p = +p))) {
    if (p <= 0 || n < 2) return min(values3);
    if (p >= 1) return max(values3);
    var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = max(quickselect(values3, i0).subarray(0, i0 + 1)), value1 = min(values3.subarray(i0 + 1));
    return value0 + (value1 - value0) * (i - i0);
  }
}
function quantileSorted(values3, p, valueof = number4) {
  if (!(!(n = values3.length) || isNaN(p = +p))) {
    if (p <= 0 || n < 2) return +valueof(values3[0], 0, values3);
    if (p >= 1) return +valueof(values3[n - 1], n - 1, values3);
    var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values3[i0], i0, values3), value1 = +valueof(values3[i0 + 1], i0 + 1, values3);
    return value0 + (value1 - value0) * (i - i0);
  }
}

// node_modules/d3-array/src/mean.js
function mean(values3, valueof) {
  let count4 = 0, sum3 = 0;
  if (valueof === void 0)
    for (let value3 of values3)
      value3 != null && (value3 = +value3) >= value3 && (++count4, sum3 += value3);
  else {
    let index4 = -1;
    for (let value3 of values3)
      (value3 = valueof(value3, ++index4, values3)) != null && (value3 = +value3) >= value3 && (++count4, sum3 += value3);
  }
  if (count4) return sum3 / count4;
}

// node_modules/d3-array/src/median.js
function median(values3, valueof) {
  return quantile(values3, 0.5, valueof);
}

// node_modules/d3-array/src/merge.js
function* flatten(arrays) {
  for (let array4 of arrays)
    yield* array4;
}
function merge3(arrays) {
  return Array.from(flatten(arrays));
}

// node_modules/d3-array/src/range.js
function range2(start, stop2, step) {
  start = +start, stop2 = +stop2, step = (n = arguments.length) < 2 ? (stop2 = start, start = 0, 1) : n < 3 ? 1 : +step;
  for (var i = -1, n = Math.max(0, Math.ceil((stop2 - start) / step)) | 0, range7 = new Array(n); ++i < n; )
    range7[i] = start + i * step;
  return range7;
}

// node_modules/d3-array/src/sum.js
function sum(values3, valueof) {
  let sum3 = 0;
  if (valueof === void 0)
    for (let value3 of values3)
      (value3 = +value3) && (sum3 += value3);
  else {
    let index4 = -1;
    for (let value3 of values3)
      (value3 = +valueof(value3, ++index4, values3)) && (sum3 += value3);
  }
  return sum3;
}

// node_modules/d3-array/src/intersection.js
function intersection2(values3, ...others) {
  values3 = new InternSet(values3), others = others.map(set2);
  out: for (let value3 of values3)
    for (let other of others)
      if (!other.has(value3)) {
        values3.delete(value3);
        continue out;
      }
  return values3;
}
function set2(values3) {
  return values3 instanceof InternSet ? values3 : new InternSet(values3);
}

// node_modules/d3-array/src/union.js
function union2(...others) {
  let set8 = new InternSet();
  for (let other of others)
    for (let o of other)
      set8.add(o);
  return set8;
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x5) {
  return Math.abs(x5 = Math.round(x5)) >= 1e21 ? x5.toLocaleString("en").replace(/,/g, "") : x5.toString(10);
}
function formatDecimalParts(x5, p) {
  if (!isFinite(x5) || x5 === 0) return null;
  var i = (x5 = p ? x5.toExponential(p - 1) : x5.toExponential()).indexOf("e"), coefficient = x5.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x5.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x5) {
  return x5 = formatDecimalParts(Math.abs(x5)), x5 ? x5[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value3, width2) {
    for (var i = value3.length, t = [], j2 = 0, g = grouping[0], length3 = 0; i > 0 && g > 0 && (length3 + g + 1 > width2 && (g = Math.max(1, width2 - length3)), t.push(value3.substring(i -= g, i + g)), !((length3 += g + 1) > width2)); )
      g = grouping[j2 = (j2 + 1) % grouping.length];
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value3) {
    return value3.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match3 = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match3;
  return new FormatSpecifier({
    fill: match3[1],
    align: match3[2],
    sign: match3[3],
    symbol: match3[4],
    zero: match3[5],
    width: match3[6],
    comma: match3[7],
    precision: match3[8] && match3[8].slice(1),
    trim: match3[9],
    type: match3[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "", this.align = specifier.align === void 0 ? ">" : specifier.align + "", this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "", this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "", this.zero = !!specifier.zero, this.width = specifier.width === void 0 ? void 0 : +specifier.width, this.comma = !!specifier.comma, this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision, this.trim = !!specifier.trim, this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i)
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        i0 === 0 && (i0 = i), i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        i0 > 0 && (i0 = 0);
        break;
    }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x5, p) {
  var d = formatDecimalParts(x5, p);
  if (!d) return prefixExponent = void 0, x5.toPrecision(p);
  var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x5, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x5, p) {
  var d = formatDecimalParts(x5, p);
  if (!d) return x5 + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x5, p) => (x5 * 100).toFixed(p),
  b: (x5) => Math.round(x5).toString(2),
  c: (x5) => x5 + "",
  d: formatDecimal_default,
  e: (x5, p) => x5.toExponential(p),
  f: (x5, p) => x5.toFixed(p),
  g: (x5, p) => x5.toPrecision(p),
  o: (x5) => Math.round(x5).toString(8),
  p: (x5, p) => formatRounded_default(x5 * 100, p),
  r: formatRounded_default,
  s: formatPrefixAuto_default,
  X: (x5) => Math.round(x5).toString(16).toUpperCase(),
  x: (x5) => Math.round(x5).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x5) {
  return x5;
}

// node_modules/d3-format/src/locale.js
var map2 = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale4) {
  var group2 = locale4.grouping === void 0 || locale4.thousands === void 0 ? identity_default : formatGroup_default(map2.call(locale4.grouping, Number), locale4.thousands + ""), currencyPrefix = locale4.currency === void 0 ? "" : locale4.currency[0] + "", currencySuffix = locale4.currency === void 0 ? "" : locale4.currency[1] + "", decimal = locale4.decimal === void 0 ? "." : locale4.decimal + "", numerals = locale4.numerals === void 0 ? identity_default : formatNumerals_default(map2.call(locale4.numerals, String)), percent = locale4.percent === void 0 ? "%" : locale4.percent + "", minus = locale4.minus === void 0 ? "\u2212" : locale4.minus + "", nan2 = locale4.nan === void 0 ? "NaN" : locale4.nan + "";
  function newFormat(specifier, options) {
    specifier = formatSpecifier(specifier);
    var fill2 = specifier.fill, align2 = specifier.align, sign3 = specifier.sign, symbol3 = specifier.symbol, zero6 = specifier.zero, width2 = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type3 = specifier.type;
    type3 === "n" ? (comma = !0, type3 = "g") : formatTypes_default[type3] || (precision === void 0 && (precision = 12), trim = !0, type3 = "g"), (zero6 || fill2 === "0" && align2 === "=") && (zero6 = !0, fill2 = "0", align2 = "=");
    var prefix = (options && options.prefix !== void 0 ? options.prefix : "") + (symbol3 === "$" ? currencyPrefix : symbol3 === "#" && /[boxX]/.test(type3) ? "0" + type3.toLowerCase() : ""), suffix = (symbol3 === "$" ? currencySuffix : /[%p]/.test(type3) ? percent : "") + (options && options.suffix !== void 0 ? options.suffix : ""), formatType = formatTypes_default[type3], maybeSuffix = /[defgprs%]/.test(type3);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type3) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format5(value3) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type3 === "c")
        valueSuffix = formatType(value3) + valueSuffix, value3 = "";
      else {
        value3 = +value3;
        var valueNegative = value3 < 0 || 1 / value3 < 0;
        if (value3 = isNaN(value3) ? nan2 : formatType(Math.abs(value3), precision), trim && (value3 = formatTrim_default(value3)), valueNegative && +value3 == 0 && sign3 !== "+" && (valueNegative = !1), valuePrefix = (valueNegative ? sign3 === "(" ? sign3 : minus : sign3 === "-" || sign3 === "(" ? "" : sign3) + valuePrefix, valueSuffix = (type3 === "s" && !isNaN(value3) && prefixExponent !== void 0 ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign3 === "(" ? ")" : ""), maybeSuffix) {
          for (i = -1, n = value3.length; ++i < n; )
            if (c = value3.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value3.slice(i + 1) : value3.slice(i)) + valueSuffix, value3 = value3.slice(0, i);
              break;
            }
        }
      }
      comma && !zero6 && (value3 = group2(value3, 1 / 0));
      var length3 = valuePrefix.length + value3.length + valueSuffix.length, padding3 = length3 < width2 ? new Array(width2 - length3 + 1).join(fill2) : "";
      switch (comma && zero6 && (value3 = group2(padding3 + value3, padding3.length ? width2 - valueSuffix.length : 1 / 0), padding3 = ""), align2) {
        case "<":
          value3 = valuePrefix + value3 + valueSuffix + padding3;
          break;
        case "=":
          value3 = valuePrefix + padding3 + value3 + valueSuffix;
          break;
        case "^":
          value3 = padding3.slice(0, length3 = padding3.length >> 1) + valuePrefix + value3 + valueSuffix + padding3.slice(length3);
          break;
        default:
          value3 = padding3 + valuePrefix + value3 + valueSuffix;
          break;
      }
      return numerals(value3);
    }
    return format5.toString = function() {
      return specifier + "";
    }, format5;
  }
  function formatPrefix2(specifier, value3) {
    var e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value3) / 3))) * 3, k = Math.pow(10, -e), f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier), { suffix: prefixes[8 + e / 3] });
    return function(value4) {
      return f(k * value4);
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale, format, formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition3) {
  return locale = locale_default(definition3), format = locale.format, formatPrefix = locale.formatPrefix, locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value3) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value3) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max4) {
  return step = Math.abs(step), max4 = Math.abs(max4) - step, Math.max(0, exponent_default(max4) - exponent_default(step)) + 1;
}

// node_modules/d3-time/src/interval.js
var t0 = /* @__PURE__ */ new Date(), t1 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count4, field3) {
  function interval3(date6) {
    return floori(date6 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date6)), date6;
  }
  return interval3.floor = (date6) => (floori(date6 = /* @__PURE__ */ new Date(+date6)), date6), interval3.ceil = (date6) => (floori(date6 = new Date(date6 - 1)), offseti(date6, 1), floori(date6), date6), interval3.round = (date6) => {
    let d0 = interval3(date6), d1 = interval3.ceil(date6);
    return date6 - d0 < d1 - date6 ? d0 : d1;
  }, interval3.offset = (date6, step) => (offseti(date6 = /* @__PURE__ */ new Date(+date6), step == null ? 1 : Math.floor(step)), date6), interval3.range = (start, stop2, step) => {
    let range7 = [];
    if (start = interval3.ceil(start), step = step == null ? 1 : Math.floor(step), !(start < stop2) || !(step > 0)) return range7;
    let previous;
    do
      range7.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop2);
    return range7;
  }, interval3.filter = (test2) => timeInterval((date6) => {
    if (date6 >= date6) for (; floori(date6), !test2(date6); ) date6.setTime(date6 - 1);
  }, (date6, step) => {
    if (date6 >= date6)
      if (step < 0) for (; ++step <= 0; )
        for (; offseti(date6, -1), !test2(date6); )
          ;
      else for (; --step >= 0; )
        for (; offseti(date6, 1), !test2(date6); )
          ;
  }), count4 && (interval3.count = (start, end) => (t0.setTime(+start), t1.setTime(+end), floori(t0), floori(t1), Math.floor(count4(t0, t1))), interval3.every = (step) => (step = Math.floor(step), !isFinite(step) || !(step > 0) ? null : step > 1 ? interval3.filter(field3 ? (d) => field3(d) % step === 0 : (d) => interval3.count(0, d) % step === 0) : interval3)), interval3;
}

// node_modules/d3-time/src/millisecond.js
var millisecond = timeInterval(() => {
}, (date6, step) => {
  date6.setTime(+date6 + step);
}, (start, end) => end - start);
millisecond.every = (k) => (k = Math.floor(k), !isFinite(k) || !(k > 0) ? null : k > 1 ? timeInterval((date6) => {
  date6.setTime(Math.floor(date6 / k) * k);
}, (date6, step) => {
  date6.setTime(+date6 + step * k);
}, (start, end) => (end - start) / k) : millisecond);
var milliseconds = millisecond.range;

// node_modules/d3-time/src/second.js
var second = timeInterval((date6) => {
  date6.setTime(date6 - date6.getMilliseconds());
}, (date6, step) => {
  date6.setTime(+date6 + step * 1e3);
}, (start, end) => (end - start) / 1e3, (date6) => date6.getUTCSeconds()), seconds = second.range;

// node_modules/d3-time/src/minute.js
var timeMinute = timeInterval((date6) => {
  date6.setTime(date6 - date6.getMilliseconds() - date6.getSeconds() * 1e3);
}, (date6, step) => {
  date6.setTime(+date6 + step * 6e4);
}, (start, end) => (end - start) / 6e4, (date6) => date6.getMinutes()), timeMinutes = timeMinute.range, utcMinute = timeInterval((date6) => {
  date6.setUTCSeconds(0, 0);
}, (date6, step) => {
  date6.setTime(+date6 + step * 6e4);
}, (start, end) => (end - start) / 6e4, (date6) => date6.getUTCMinutes()), utcMinutes = utcMinute.range;

// node_modules/d3-time/src/hour.js
var timeHour = timeInterval((date6) => {
  date6.setTime(date6 - date6.getMilliseconds() - date6.getSeconds() * 1e3 - date6.getMinutes() * 6e4);
}, (date6, step) => {
  date6.setTime(+date6 + step * 36e5);
}, (start, end) => (end - start) / 36e5, (date6) => date6.getHours()), timeHours = timeHour.range, utcHour = timeInterval((date6) => {
  date6.setUTCMinutes(0, 0, 0);
}, (date6, step) => {
  date6.setTime(+date6 + step * 36e5);
}, (start, end) => (end - start) / 36e5, (date6) => date6.getUTCHours()), utcHours = utcHour.range;

// node_modules/d3-time/src/day.js
var timeDay = timeInterval(
  (date6) => date6.setHours(0, 0, 0, 0),
  (date6, step) => date6.setDate(date6.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 864e5,
  (date6) => date6.getDate() - 1
), timeDays = timeDay.range, utcDay = timeInterval((date6) => {
  date6.setUTCHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setUTCDate(date6.getUTCDate() + step);
}, (start, end) => (end - start) / 864e5, (date6) => date6.getUTCDate() - 1), utcDays = utcDay.range, unixDay = timeInterval((date6) => {
  date6.setUTCHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setUTCDate(date6.getUTCDate() + step);
}, (start, end) => (end - start) / 864e5, (date6) => Math.floor(date6 / 864e5)), unixDays = unixDay.range;

// node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date6) => {
    date6.setDate(date6.getDate() - (date6.getDay() + 7 - i) % 7), date6.setHours(0, 0, 0, 0);
  }, (date6, step) => {
    date6.setDate(date6.getDate() + step * 7);
  }, (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6e4) / 6048e5);
}
var timeSunday = timeWeekday(0), timeMonday = timeWeekday(1), timeTuesday = timeWeekday(2), timeWednesday = timeWeekday(3), timeThursday = timeWeekday(4), timeFriday = timeWeekday(5), timeSaturday = timeWeekday(6), timeSundays = timeSunday.range, timeMondays = timeMonday.range, timeTuesdays = timeTuesday.range, timeWednesdays = timeWednesday.range, timeThursdays = timeThursday.range, timeFridays = timeFriday.range, timeSaturdays = timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date6) => {
    date6.setUTCDate(date6.getUTCDate() - (date6.getUTCDay() + 7 - i) % 7), date6.setUTCHours(0, 0, 0, 0);
  }, (date6, step) => {
    date6.setUTCDate(date6.getUTCDate() + step * 7);
  }, (start, end) => (end - start) / 6048e5);
}
var utcSunday = utcWeekday(0), utcMonday = utcWeekday(1), utcTuesday = utcWeekday(2), utcWednesday = utcWeekday(3), utcThursday = utcWeekday(4), utcFriday = utcWeekday(5), utcSaturday = utcWeekday(6), utcSundays = utcSunday.range, utcMondays = utcMonday.range, utcTuesdays = utcTuesday.range, utcWednesdays = utcWednesday.range, utcThursdays = utcThursday.range, utcFridays = utcFriday.range, utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/month.js
var timeMonth = timeInterval((date6) => {
  date6.setDate(1), date6.setHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setMonth(date6.getMonth() + step);
}, (start, end) => end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12, (date6) => date6.getMonth()), timeMonths = timeMonth.range, utcMonth = timeInterval((date6) => {
  date6.setUTCDate(1), date6.setUTCHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setUTCMonth(date6.getUTCMonth() + step);
}, (start, end) => end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12, (date6) => date6.getUTCMonth()), utcMonths = utcMonth.range;

// node_modules/d3-time/src/year.js
var timeYear = timeInterval((date6) => {
  date6.setMonth(0, 1), date6.setHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setFullYear(date6.getFullYear() + step);
}, (start, end) => end.getFullYear() - start.getFullYear(), (date6) => date6.getFullYear());
timeYear.every = (k) => !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date6) => {
  date6.setFullYear(Math.floor(date6.getFullYear() / k) * k), date6.setMonth(0, 1), date6.setHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setFullYear(date6.getFullYear() + step * k);
});
var timeYears = timeYear.range, utcYear = timeInterval((date6) => {
  date6.setUTCMonth(0, 1), date6.setUTCHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setUTCFullYear(date6.getUTCFullYear() + step);
}, (start, end) => end.getUTCFullYear() - start.getUTCFullYear(), (date6) => date6.getUTCFullYear());
utcYear.every = (k) => !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date6) => {
  date6.setUTCFullYear(Math.floor(date6.getUTCFullYear() / k) * k), date6.setUTCMonth(0, 1), date6.setUTCHours(0, 0, 0, 0);
}, (date6, step) => {
  date6.setUTCFullYear(date6.getUTCFullYear() + step * k);
});
var utcYears = utcYear.range;

// node_modules/d3-time/src/ticks.js
function ticker(year, month, week2, day, hour, minute) {
  let tickIntervals = [
    [second, 1, 1e3],
    [second, 5, 5 * 1e3],
    [second, 15, 15 * 1e3],
    [second, 30, 30 * 1e3],
    [minute, 1, 6e4],
    [minute, 5, 5 * 6e4],
    [minute, 15, 15 * 6e4],
    [minute, 30, 30 * 6e4],
    [hour, 1, 36e5],
    [hour, 3, 3 * 36e5],
    [hour, 6, 6 * 36e5],
    [hour, 12, 12 * 36e5],
    [day, 1, 864e5],
    [day, 2, 2 * 864e5],
    [week2, 1, 6048e5],
    [month, 1, 2592e6],
    [month, 3, 3 * 2592e6],
    [year, 1, 31536e6]
  ];
  function ticks2(start, stop2, count4) {
    let reverse3 = stop2 < start;
    reverse3 && ([start, stop2] = [stop2, start]);
    let interval3 = count4 && typeof count4.range == "function" ? count4 : tickInterval(start, stop2, count4), ticks3 = interval3 ? interval3.range(start, +stop2 + 1) : [];
    return reverse3 ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start, stop2, count4) {
    let target3 = Math.abs(stop2 - start) / count4, i = bisector(([, , step2]) => step2).right(tickIntervals, target3);
    if (i === tickIntervals.length) return year.every(tickStep(start / 31536e6, stop2 / 31536e6, count4));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop2, count4), 1));
    let [t, step] = tickIntervals[target3 / tickIntervals[i - 1][2] < tickIntervals[i][2] / target3 ? i - 1 : i];
    return t.every(step);
  }
  return [ticks2, tickInterval];
}
var [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute), [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

// node_modules/vega-time/build/vega-time.js
var YEAR = "year", QUARTER = "quarter", MONTH = "month", WEEK = "week", ISOWEEK = "isoweek", DATE = "date", DAY = "day", DAYOFYEAR = "dayofyear", HOURS = "hours", MINUTES = "minutes", SECONDS = "seconds", MILLISECONDS = "milliseconds", TIME_UNITS = [YEAR, QUARTER, MONTH, WEEK, ISOWEEK, DATE, DAY, DAYOFYEAR, HOURS, MINUTES, SECONDS, MILLISECONDS], UNITS = TIME_UNITS.reduce((o, u4, i) => (o[u4] = 1 + i, o), {});
function timeUnits(units) {
  let u4 = array_default(units).slice(), m = {};
  return u4.length || error62("Missing time unit."), u4.forEach((unit2) => {
    hasOwnProperty(UNITS, unit2) ? m[unit2] = 1 : error62(`Invalid time unit: ${unit2}.`);
  }), ((m[WEEK] || m[ISOWEEK] || m[DAY] ? 1 : 0) + (m[QUARTER] || m[MONTH] || m[DATE] ? 1 : 0) + (m[DAYOFYEAR] ? 1 : 0) > 1 || m[WEEK] && m[ISOWEEK]) && error62(`Incompatible time units: ${units}`), u4.sort((a, b10) => UNITS[a] - UNITS[b10]), u4;
}
var defaultSpecifiers = {
  [YEAR]: "%Y ",
  [QUARTER]: "Q%q ",
  [MONTH]: "%b ",
  [DATE]: "%d ",
  [WEEK]: "W%U ",
  [ISOWEEK]: "W%V ",
  [DAY]: "%a ",
  [DAYOFYEAR]: "%j ",
  [HOURS]: "%H:00",
  [MINUTES]: "00:%M",
  [SECONDS]: ":%S",
  [MILLISECONDS]: ".%L",
  [`${YEAR}-${ISOWEEK}`]: "%G W%V ",
  [`${YEAR}-${MONTH}`]: "%Y-%m ",
  [`${YEAR}-${MONTH}-${DATE}`]: "%Y-%m-%d ",
  [`${HOURS}-${MINUTES}`]: "%H:%M"
};
function timeUnitSpecifier(units, specifiers) {
  let s = extend2({}, defaultSpecifiers, specifiers), u4 = timeUnits(units), n = u4.length, fmt = "", start = 0, end, key2;
  for (start = 0; start < n; )
    for (end = u4.length; end > start; --end)
      if (key2 = u4.slice(start, end).join("-"), s[key2] != null) {
        fmt += s[key2], start = end;
        break;
      }
  return fmt.trim();
}
var t02 = /* @__PURE__ */ new Date();
function localYear(y5) {
  return t02.setFullYear(y5), t02.setMonth(0), t02.setDate(1), t02.setHours(0, 0, 0, 0), t02;
}
function dayofyear(d) {
  return localDayOfYear(new Date(d));
}
function week(d) {
  return localWeekNum(new Date(d));
}
function isoweek(d) {
  return localISOWeekNum(new Date(d));
}
function localDayOfYear(d) {
  return timeDay.count(localYear(d.getFullYear()) - 1, d);
}
function localWeekNum(d) {
  return timeSunday.count(localYear(d.getFullYear()) - 1, d);
}
function localISOWeekYear(d) {
  return timeDay.offset(timeMonday.floor(d), 3).getFullYear();
}
function localISOWeekNum(d) {
  return 1 + timeMonday.count(localISOWeekOne(localISOWeekYear(d)), d);
}
function localISOWeekOne(y5) {
  return timeMonday.floor(timeDay.offset(localYear(y5), 3));
}
function localISOWeekOneDate(y5) {
  let d = localISOWeekOne(y5);
  return d.getMonth() ? d.getDate() - 31 : d.getDate();
}
function localFirst(y5) {
  return localYear(y5).getDay();
}
function localDate(y5, m, d, H2, M2, S, L2) {
  if (0 <= y5 && y5 < 100) {
    let date6 = new Date(-1, m, d, H2, M2, S, L2);
    return date6.setFullYear(y5), date6;
  }
  return new Date(y5, m, d, H2, M2, S, L2);
}
function utcdayofyear(d) {
  return utcDayOfYear(new Date(d));
}
function utcweek(d) {
  return utcWeekNum(new Date(d));
}
function utcisoweek(d) {
  return utcISOWeekNum(new Date(d));
}
function utcDayOfYear(d) {
  let y5 = Date.UTC(d.getUTCFullYear(), 0, 1);
  return utcDay.count(y5 - 1, d);
}
function utcWeekNum(d) {
  let y5 = Date.UTC(d.getUTCFullYear(), 0, 1);
  return utcSunday.count(y5 - 1, d);
}
function utcISOWeekYear(d) {
  return utcDay.offset(utcMonday.floor(d), 3).getUTCFullYear();
}
function utcISOWeekNum(d) {
  return 1 + utcMonday.count(utcISOWeekOne(utcISOWeekYear(d)), d);
}
function utcISOWeekOne(y5) {
  return utcMonday.floor(utcDay.offset(Date.UTC(y5, 0, 1), 3));
}
function utcISOWeekOneDate(y5) {
  let d = utcISOWeekOne(y5);
  return d.getUTCMonth() ? d.getUTCDate() - 31 : d.getUTCDate();
}
function utcFirst(y5) {
  return t02.setTime(Date.UTC(y5, 0, 1)), t02.getUTCDay();
}
function utcDate(y5, m, d, H2, M2, S, L2) {
  if (0 <= y5 && y5 < 100) {
    let date6 = new Date(Date.UTC(-1, m, d, H2, M2, S, L2));
    return date6.setUTCFullYear(d.y), date6;
  }
  return new Date(Date.UTC(y5, m, d, H2, M2, S, L2));
}
var REFERENCE_YEAR = 2012, ISOWEEK_REFERENCE_YEAR = 2015;
function floor(units, step, get6, inv, newDate2) {
  let s = step || 1, b10 = peek(units), _ = (unit2, p, key2) => (key2 = key2 || unit2, getUnit(get6[key2], inv[key2], unit2 === b10 && s, p)), t = /* @__PURE__ */ new Date(), u4 = toSet(units), y5 = u4[YEAR] ? _(YEAR, null, u4[ISOWEEK] ? YEAR + ISOWEEK : YEAR) : constant_default(u4[ISOWEEK] ? ISOWEEK_REFERENCE_YEAR : REFERENCE_YEAR), m = u4[MONTH] ? _(MONTH) : u4[QUARTER] ? _(QUARTER) : zero, d = u4[WEEK] && u4[DAY] ? _(DAY, 1, WEEK + DAY) : u4[ISOWEEK] && u4[DAY] ? _(DAY, 1, ISOWEEK + DAY) : u4[WEEK] ? _(WEEK, 1) : u4[ISOWEEK] ? _(ISOWEEK, 1) : u4[DAY] ? _(DAY, 1) : u4[DATE] ? _(DATE, 1) : u4[DAYOFYEAR] ? _(DAYOFYEAR, 1) : one, H2 = u4[HOURS] ? _(HOURS) : zero, M2 = u4[MINUTES] ? _(MINUTES) : zero, S = u4[SECONDS] ? _(SECONDS) : zero, L2 = u4[MILLISECONDS] ? _(MILLISECONDS) : zero;
  return function(v2) {
    t.setTime(+v2);
    let year = y5(t);
    return newDate2(year, m(t), d(t, year), H2(t), M2(t), S(t), L2(t));
  };
}
function getUnit(f, inv, step, phase) {
  let u4 = step <= 1 ? f : phase ? (d, y5) => phase + step * Math.floor((f(d, y5) - phase) / step) : (d, y5) => step * Math.floor(f(d, y5) / step);
  return inv ? (d, y5) => inv(u4(d, y5), y5) : u4;
}
function weekday(week2, day, firstDay) {
  return day + week2 * 7 - (firstDay + 6) % 7;
}
function isoDay(day) {
  return (day + 6) % 7;
}
function isoWeekday(weekOneDate, week2, day) {
  return weekOneDate + (week2 - 1) * 7 + day;
}
var localGet = {
  [YEAR]: (d) => d.getFullYear(),
  [QUARTER]: (d) => Math.floor(d.getMonth() / 3),
  [MONTH]: (d) => d.getMonth(),
  [DATE]: (d) => d.getDate(),
  [HOURS]: (d) => d.getHours(),
  [MINUTES]: (d) => d.getMinutes(),
  [SECONDS]: (d) => d.getSeconds(),
  [MILLISECONDS]: (d) => d.getMilliseconds(),
  [DAYOFYEAR]: (d) => localDayOfYear(d),
  [WEEK]: (d) => localWeekNum(d),
  [WEEK + DAY]: (d, y5) => weekday(localWeekNum(d), d.getDay(), localFirst(y5)),
  [DAY]: (d, y5) => weekday(1, d.getDay(), localFirst(y5)),
  [ISOWEEK]: (d) => localISOWeekNum(d),
  [YEAR + ISOWEEK]: (d) => localISOWeekYear(d),
  [ISOWEEK + DAY]: (d, y5) => isoWeekday(localISOWeekOneDate(y5), localISOWeekNum(d), isoDay(d.getDay()))
}, localInv = {
  [QUARTER]: (q) => 3 * q,
  [WEEK]: (w2, y5) => weekday(w2, 0, localFirst(y5)),
  [ISOWEEK]: (w2, y5) => isoWeekday(localISOWeekOneDate(y5), w2, 0)
};
function timeFloor(units, step) {
  return floor(units, step || 1, localGet, localInv, localDate);
}
var utcGet = {
  [YEAR]: (d) => d.getUTCFullYear(),
  [QUARTER]: (d) => Math.floor(d.getUTCMonth() / 3),
  [MONTH]: (d) => d.getUTCMonth(),
  [DATE]: (d) => d.getUTCDate(),
  [HOURS]: (d) => d.getUTCHours(),
  [MINUTES]: (d) => d.getUTCMinutes(),
  [SECONDS]: (d) => d.getUTCSeconds(),
  [MILLISECONDS]: (d) => d.getUTCMilliseconds(),
  [DAYOFYEAR]: (d) => utcDayOfYear(d),
  [WEEK]: (d) => utcWeekNum(d),
  [DAY]: (d, y5) => weekday(1, d.getUTCDay(), utcFirst(y5)),
  [WEEK + DAY]: (d, y5) => weekday(utcWeekNum(d), d.getUTCDay(), utcFirst(y5)),
  [ISOWEEK]: (d) => utcISOWeekNum(d),
  [YEAR + ISOWEEK]: (d) => utcISOWeekYear(d),
  [ISOWEEK + DAY]: (d, y5) => isoWeekday(utcISOWeekOneDate(y5), utcISOWeekNum(d), isoDay(d.getUTCDay()))
}, utcInv = {
  [QUARTER]: (q) => 3 * q,
  [WEEK]: (w2, y5) => weekday(w2, 0, utcFirst(y5)),
  [ISOWEEK]: (w2, y5) => isoWeekday(utcISOWeekOneDate(y5), w2, 0)
};
function utcFloor(units, step) {
  return floor(units, step || 1, utcGet, utcInv, utcDate);
}
var timeIntervals = {
  [YEAR]: timeYear,
  [QUARTER]: timeMonth.every(3),
  [MONTH]: timeMonth,
  [WEEK]: timeSunday,
  [ISOWEEK]: timeMonday,
  [DATE]: timeDay,
  [DAY]: timeDay,
  [DAYOFYEAR]: timeDay,
  [HOURS]: timeHour,
  [MINUTES]: timeMinute,
  [SECONDS]: second,
  [MILLISECONDS]: millisecond
}, utcIntervals = {
  [YEAR]: utcYear,
  [QUARTER]: utcMonth.every(3),
  [MONTH]: utcMonth,
  [WEEK]: utcSunday,
  [ISOWEEK]: utcMonday,
  [DATE]: utcDay,
  [DAY]: utcDay,
  [DAYOFYEAR]: utcDay,
  [HOURS]: utcHour,
  [MINUTES]: utcMinute,
  [SECONDS]: second,
  [MILLISECONDS]: millisecond
};
function timeInterval2(unit2) {
  return timeIntervals[unit2];
}
function utcInterval(unit2) {
  return utcIntervals[unit2];
}
function offset(ival, date6, step) {
  return ival ? ival.offset(date6, step) : void 0;
}
function timeOffset(unit2, date6, step) {
  return offset(timeInterval2(unit2), date6, step);
}
function utcOffset(unit2, date6, step) {
  return offset(utcInterval(unit2), date6, step);
}
function sequence(ival, start, stop2, step) {
  return ival ? ival.range(start, stop2, step) : void 0;
}
function timeSequence(unit2, start, stop2, step) {
  return sequence(timeInterval2(unit2), start, stop2, step);
}
function utcSequence(unit2, start, stop2, step) {
  return sequence(utcInterval(unit2), start, stop2, step);
}
var durationSecond = 1e3, durationMinute = durationSecond * 60, durationHour = durationMinute * 60, durationDay = durationHour * 24, durationWeek = durationDay * 7, durationMonth = durationDay * 30, durationYear = durationDay * 365, Milli = [YEAR, MONTH, DATE, HOURS, MINUTES, SECONDS, MILLISECONDS], Seconds = Milli.slice(0, -1), Minutes = Seconds.slice(0, -1), Hours = Minutes.slice(0, -1), Day = Hours.slice(0, -1), Week = [YEAR, WEEK], Month = [YEAR, MONTH], Year = [YEAR], intervals = [[Seconds, 1, durationSecond], [Seconds, 5, 5 * durationSecond], [Seconds, 15, 15 * durationSecond], [Seconds, 30, 30 * durationSecond], [Minutes, 1, durationMinute], [Minutes, 5, 5 * durationMinute], [Minutes, 15, 15 * durationMinute], [Minutes, 30, 30 * durationMinute], [Hours, 1, durationHour], [Hours, 3, 3 * durationHour], [Hours, 6, 6 * durationHour], [Hours, 12, 12 * durationHour], [Day, 1, durationDay], [Week, 1, durationWeek], [Month, 1, durationMonth], [Month, 3, 3 * durationMonth], [Year, 1, durationYear]];
function bin(opt) {
  let ext = opt.extent, max4 = opt.maxbins || 40, target3 = Math.abs(span_default(ext)) / max4, i = bisector((i2) => i2[2]).right(intervals, target3), units, step;
  return i === intervals.length ? (units = Year, step = tickStep(ext[0] / durationYear, ext[1] / durationYear, max4)) : i ? (i = intervals[target3 / intervals[i - 1][2] < intervals[i][2] / target3 ? i - 1 : i], units = i[0], step = i[1]) : (units = Milli, step = Math.max(tickStep(ext[0], ext[1], max4), 1)), {
    units,
    step
  };
}
var localGetters = {
  [YEAR]: (d) => d.getFullYear(),
  [MONTH]: (d) => d.getMonth(),
  [DATE]: (d) => d.getDate(),
  [DAY]: (d) => d.getDay(),
  [HOURS]: (d) => d.getHours(),
  [MINUTES]: (d) => d.getMinutes(),
  [SECONDS]: (d) => d.getSeconds(),
  [MILLISECONDS]: (d) => d.getMilliseconds()
}, utcGetters = {
  [YEAR]: (d) => d.getUTCFullYear(),
  [MONTH]: (d) => d.getUTCMonth(),
  [DATE]: (d) => d.getUTCDate(),
  [DAY]: (d) => d.getUTCDay(),
  [HOURS]: (d) => d.getUTCHours(),
  [MINUTES]: (d) => d.getUTCMinutes(),
  [SECONDS]: (d) => d.getUTCSeconds(),
  [MILLISECONDS]: (d) => d.getUTCMilliseconds()
}, grains = [{
  units: [YEAR, MONTH, DATE, HOURS, MINUTES, SECONDS, MILLISECONDS],
  step: 1,
  aligned: () => !0
}, {
  units: [YEAR, MONTH, DATE, HOURS, MINUTES, SECONDS],
  step: 1,
  aligned: (dates, g) => dates.every((d) => g[MILLISECONDS](d) === 0)
}, {
  units: [YEAR, MONTH, DATE, HOURS, MINUTES],
  step: 1,
  aligned: (dates, g) => dates.every((d) => g[SECONDS](d) === 0)
}, {
  units: [YEAR, MONTH, DATE, HOURS, MINUTES],
  step: 5,
  aligned: (dates, g) => dates.every((d) => g[MINUTES](d) % 5 === 0)
}, {
  units: [YEAR, MONTH, DATE, HOURS, MINUTES],
  step: 10,
  aligned: (dates, g) => dates.every((d) => g[MINUTES](d) % 10 === 0)
}, {
  units: [YEAR, MONTH, DATE, HOURS],
  step: 1,
  aligned: (dates, g) => dates.every((d) => g[MINUTES](d) === 0)
}, {
  units: [YEAR, MONTH, DATE],
  step: 1,
  aligned: (dates, g) => dates.every((d) => g[HOURS](d) === 0)
}, {
  units: [YEAR, WEEK],
  step: 1,
  skippable: !0,
  aligned: (dates, g) => new Set(dates.map((d) => g[DAY](d))).size === 1
}, {
  units: [YEAR, MONTH],
  step: 1,
  aligned: (dates, g) => dates.every((d) => g[DATE](d) === 1)
}, {
  units: [YEAR, MONTH],
  step: 3,
  aligned: (dates, g) => dates.every((d) => g[MONTH](d) % 3 === 0)
}, {
  units: [YEAR],
  step: 1,
  aligned: (dates, g) => dates.every((d) => g[MONTH](d) === 0)
}, {
  units: [YEAR],
  step: 10,
  aligned: (dates, g) => dates.every((d) => g[YEAR](d) % 10 === 0)
}, {
  aligned: () => !1
}];
function detectTimeUnits(data3, field3, utc) {
  let getters = utc ? utcGetters : localGetters, dates = data3.map((t) => {
    let v2 = field3(t), d = new Date(v2);
    return Number.isNaN(+d) && error62(`Invalid date: ${v2}`), d;
  }), mismatch = grains.findIndex((g) => !g.aligned(dates, getters)), required3 = grains.findIndex((g) => !g.skippable && !g.aligned(dates, getters)), index4 = required3 > mismatch + 1 ? required3 : mismatch, {
    units,
    step
  } = grains[index4 - 1];
  return {
    units,
    step
  };
}

// node_modules/d3-time-format/src/locale.js
function localDate2(d) {
  if (0 <= d.y && d.y < 100) {
    var date6 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    return date6.setFullYear(d.y), date6;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate2(d) {
  if (0 <= d.y && d.y < 100) {
    var date6 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    return date6.setUTCFullYear(d.y), date6;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y5, m, d) {
  return { y: y5, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale4) {
  var locale_dateTime = locale4.dateTime, locale_date = locale4.date, locale_time = locale4.time, locale_periods = locale4.periods, locale_weekdays = locale4.days, locale_shortWeekdays = locale4.shortDays, locale_months = locale4.months, locale_shortMonths = locale4.shortMonths, periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths), formats3 = {
    a: formatShortWeekday,
    A: formatWeekday,
    b: formatShortMonth,
    B: formatMonth,
    c: null,
    d: formatDayOfMonth,
    e: formatDayOfMonth,
    f: formatMicroseconds,
    g: formatYearISO,
    G: formatFullYearISO,
    H: formatHour24,
    I: formatHour12,
    j: formatDayOfYear,
    L: formatMilliseconds,
    m: formatMonthNumber,
    M: formatMinutes,
    p: formatPeriod,
    q: formatQuarter,
    Q: formatUnixTimestamp,
    s: formatUnixTimestampSeconds,
    S: formatSeconds,
    u: formatWeekdayNumberMonday,
    U: formatWeekNumberSunday,
    V: formatWeekNumberISO,
    w: formatWeekdayNumberSunday,
    W: formatWeekNumberMonday,
    x: null,
    X: null,
    y: formatYear2,
    Y: formatFullYear,
    Z: formatZone,
    "%": formatLiteralPercent
  }, utcFormats = {
    a: formatUTCShortWeekday,
    A: formatUTCWeekday,
    b: formatUTCShortMonth,
    B: formatUTCMonth,
    c: null,
    d: formatUTCDayOfMonth,
    e: formatUTCDayOfMonth,
    f: formatUTCMicroseconds,
    g: formatUTCYearISO,
    G: formatUTCFullYearISO,
    H: formatUTCHour24,
    I: formatUTCHour12,
    j: formatUTCDayOfYear,
    L: formatUTCMilliseconds,
    m: formatUTCMonthNumber,
    M: formatUTCMinutes,
    p: formatUTCPeriod,
    q: formatUTCQuarter,
    Q: formatUnixTimestamp,
    s: formatUnixTimestampSeconds,
    S: formatUTCSeconds,
    u: formatUTCWeekdayNumberMonday,
    U: formatUTCWeekNumberSunday,
    V: formatUTCWeekNumberISO,
    w: formatUTCWeekdayNumberSunday,
    W: formatUTCWeekNumberMonday,
    x: null,
    X: null,
    y: formatUTCYear,
    Y: formatUTCFullYear,
    Z: formatUTCZone,
    "%": formatLiteralPercent
  }, parses = {
    a: parseShortWeekday,
    A: parseWeekday,
    b: parseShortMonth,
    B: parseMonth,
    c: parseLocaleDateTime,
    d: parseDayOfMonth,
    e: parseDayOfMonth,
    f: parseMicroseconds,
    g: parseYear,
    G: parseFullYear,
    H: parseHour24,
    I: parseHour24,
    j: parseDayOfYear,
    L: parseMilliseconds,
    m: parseMonthNumber,
    M: parseMinutes,
    p: parsePeriod,
    q: parseQuarter,
    Q: parseUnixTimestamp,
    s: parseUnixTimestampSeconds,
    S: parseSeconds,
    u: parseWeekdayNumberMonday,
    U: parseWeekNumberSunday,
    V: parseWeekNumberISO,
    w: parseWeekdayNumberSunday,
    W: parseWeekNumberMonday,
    x: parseLocaleDate,
    X: parseLocaleTime,
    y: parseYear,
    Y: parseFullYear,
    Z: parseZone,
    "%": parseLiteralPercent
  };
  formats3.x = newFormat(locale_date, formats3), formats3.X = newFormat(locale_time, formats3), formats3.c = newFormat(locale_dateTime, formats3), utcFormats.x = newFormat(locale_date, utcFormats), utcFormats.X = newFormat(locale_time, utcFormats), utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats4) {
    return function(date6) {
      var string4 = [], i = -1, j2 = 0, n = specifier.length, c, pad4, format5;
      for (date6 instanceof Date || (date6 = /* @__PURE__ */ new Date(+date6)); ++i < n; )
        specifier.charCodeAt(i) === 37 && (string4.push(specifier.slice(j2, i)), (pad4 = pads[c = specifier.charAt(++i)]) != null ? c = specifier.charAt(++i) : pad4 = c === "e" ? " " : "0", (format5 = formats4[c]) && (c = format5(date6, pad4)), string4.push(c), j2 = i + 1);
      return string4.push(specifier.slice(j2, i)), string4.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string4) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string4 += "", 0), week2, day;
      if (i != string4.length) return null;
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d) && (d.Z = 0), "p" in d && (d.H = d.H % 12 + d.p * 12), d.m === void 0 && (d.m = "q" in d ? d.q : 0), "V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        "w" in d || (d.w = 1), "Z" in d ? (week2 = utcDate2(newDate(d.y, 0, 1)), day = week2.getUTCDay(), week2 = day > 4 || day === 0 ? utcMonday.ceil(week2) : utcMonday(week2), week2 = utcDay.offset(week2, (d.V - 1) * 7), d.y = week2.getUTCFullYear(), d.m = week2.getUTCMonth(), d.d = week2.getUTCDate() + (d.w + 6) % 7) : (week2 = localDate2(newDate(d.y, 0, 1)), day = week2.getDay(), week2 = day > 4 || day === 0 ? timeMonday.ceil(week2) : timeMonday(week2), week2 = timeDay.offset(week2, (d.V - 1) * 7), d.y = week2.getFullYear(), d.m = week2.getMonth(), d.d = week2.getDate() + (d.w + 6) % 7);
      } else ("W" in d || "U" in d) && ("w" in d || (d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0), day = "Z" in d ? utcDate2(newDate(d.y, 0, 1)).getUTCDay() : localDate2(newDate(d.y, 0, 1)).getDay(), d.m = 0, d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7);
      return "Z" in d ? (d.H += d.Z / 100 | 0, d.M += d.Z % 100, utcDate2(d)) : localDate2(d);
    };
  }
  function parseSpecifier(d, specifier, string4, j2) {
    for (var i = 0, n = specifier.length, m = string4.length, c, parse9; i < n; ) {
      if (j2 >= m) return -1;
      if (c = specifier.charCodeAt(i++), c === 37) {
        if (c = specifier.charAt(i++), parse9 = parses[c in pads ? specifier.charAt(i++) : c], !parse9 || (j2 = parse9(d, string4, j2)) < 0) return -1;
      } else if (c != string4.charCodeAt(j2++))
        return -1;
    }
    return j2;
  }
  function parsePeriod(d, string4, i) {
    var n = periodRe.exec(string4.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string4, i) {
    var n = shortWeekdayRe.exec(string4.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string4, i) {
    var n = weekdayRe.exec(string4.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string4, i) {
    var n = shortMonthRe.exec(string4.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string4, i) {
    var n = monthRe.exec(string4.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string4, i) {
    return parseSpecifier(d, locale_dateTime, string4, i);
  }
  function parseLocaleDate(d, string4, i) {
    return parseSpecifier(d, locale_date, string4, i);
  }
  function parseLocaleTime(d, string4, i) {
    return parseSpecifier(d, locale_time, string4, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats3);
      return f.toString = function() {
        return specifier;
      }, f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", !1);
      return p.toString = function() {
        return specifier;
      }, p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      return f.toString = function() {
        return specifier;
      }, f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", !0);
      return p.toString = function() {
        return specifier;
      }, p;
    }
  };
}
var pads = { "-": "", _: " ", 0: "0" }, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad3(value3, fill2, width2) {
  var sign3 = value3 < 0 ? "-" : "", string4 = (sign3 ? -value3 : value3) + "", length3 = string4.length;
  return sign3 + (length3 < width2 ? new Array(width2 - length3 + 1).join(fill2) + string4 : string4);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name2, i) => [name2.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string4, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string4.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string4, i) {
  var n = numberRe.exec(string4.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string4, i) {
  var n = percentRe.exec(string4.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string4, i) {
  var n = numberRe.exec(string4.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string4, i) {
  var n = numberRe.exec(string4.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad3(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad3(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad3(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad3(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad3(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad3(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad3(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad3(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad3(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  return d = dISO(d), pad3(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad3(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear2(d, p) {
  return pad3(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  return d = dISO(d), pad3(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad3(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  return d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d), pad3(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z2 = d.getTimezoneOffset();
  return (z2 > 0 ? "-" : (z2 *= -1, "+")) + pad3(z2 / 60 | 0, "0", 2) + pad3(z2 % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad3(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad3(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad3(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad3(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad3(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad3(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad3(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad3(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad3(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  return d = UTCdISO(d), pad3(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad3(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad3(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  return d = UTCdISO(d), pad3(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad3(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  return d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d), pad3(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale2, timeFormat, timeParse, utcFormat, utcParse;
defaultLocale2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale2(definition3) {
  return locale2 = formatLocale(definition3), timeFormat = locale2.format, timeParse = locale2.parse, utcFormat = locale2.utcFormat, utcParse = locale2.utcParse, locale2;
}

// node_modules/vega-format/build/vega-format.js
function memoize(method2) {
  let cache2 = {};
  return (spec) => cache2[spec] || (cache2[spec] = method2(spec));
}
function trimZeroes(numberFormat2, decimalChar) {
  return (x5) => {
    let str = numberFormat2(x5), dec = str.indexOf(decimalChar);
    if (dec < 0) return str;
    let idx = rightmostDigit(str, dec), end = idx < str.length ? str.slice(idx) : "";
    for (; --idx > dec; ) if (str[idx] !== "0") {
      ++idx;
      break;
    }
    return str.slice(0, idx) + end;
  };
}
function rightmostDigit(str, dec) {
  let i = str.lastIndexOf("e"), c;
  if (i > 0) return i;
  for (i = str.length; --i > dec; )
    if (c = str.charCodeAt(i), c >= 48 && c <= 57) return i + 1;
}
function numberLocale(locale4) {
  let format5 = memoize(locale4.format), formatPrefix2 = locale4.formatPrefix;
  return {
    format: format5,
    formatPrefix: formatPrefix2,
    formatFloat(spec) {
      let s = formatSpecifier(spec || ",");
      if (s.precision == null) {
        switch (s.precision = 12, s.type) {
          case "%":
            s.precision -= 2;
            break;
          case "e":
            s.precision -= 1;
            break;
        }
        return trimZeroes(
          format5(s),
          // number format
          format5(".1f")(1)[1]
          // decimal point character
        );
      } else
        return format5(s);
    },
    formatSpan(start, stop2, count4, specifier) {
      specifier = formatSpecifier(specifier ?? ",f");
      let step = tickStep(start, stop2, count4), value3 = Math.max(Math.abs(start), Math.abs(stop2)), precision;
      if (specifier.precision == null)
        switch (specifier.type) {
          case "s":
            return isNaN(precision = precisionPrefix_default(step, value3)) || (specifier.precision = precision), formatPrefix2(specifier, value3);
          case "":
          case "e":
          case "g":
          case "p":
          case "r": {
            isNaN(precision = precisionRound_default(step, value3)) || (specifier.precision = precision - (specifier.type === "e"));
            break;
          }
          case "f":
          case "%": {
            isNaN(precision = precisionFixed_default(step)) || (specifier.precision = precision - (specifier.type === "%") * 2);
            break;
          }
        }
      return format5(specifier);
    }
  };
}
var defaultNumberLocale;
resetNumberFormatDefaultLocale();
function resetNumberFormatDefaultLocale() {
  return defaultNumberLocale = numberLocale({
    format,
    formatPrefix
  });
}
function numberFormatLocale(definition3) {
  return numberLocale(locale_default(definition3));
}
function numberFormatDefaultLocale(definition3) {
  return arguments.length ? defaultNumberLocale = numberFormatLocale(definition3) : defaultNumberLocale;
}
function timeMultiFormat(format5, interval3, spec) {
  spec = spec || {}, isObject2(spec) || error62(`Invalid time multi-format specifier: ${spec}`);
  let second2 = interval3(SECONDS), minute = interval3(MINUTES), hour = interval3(HOURS), day = interval3(DATE), week2 = interval3(WEEK), month = interval3(MONTH), quarter2 = interval3(QUARTER), year = interval3(YEAR), L2 = format5(spec[MILLISECONDS] || ".%L"), S = format5(spec[SECONDS] || ":%S"), M2 = format5(spec[MINUTES] || "%I:%M"), H2 = format5(spec[HOURS] || "%I %p"), d = format5(spec[DATE] || spec[DAY] || "%a %d"), w2 = format5(spec[WEEK] || "%b %d"), m = format5(spec[MONTH] || "%B"), q = format5(spec[QUARTER] || "%B"), y5 = format5(spec[YEAR] || "%Y");
  return (date6) => (second2(date6) < date6 ? L2 : minute(date6) < date6 ? S : hour(date6) < date6 ? M2 : day(date6) < date6 ? H2 : month(date6) < date6 ? week2(date6) < date6 ? d : w2 : year(date6) < date6 ? quarter2(date6) < date6 ? m : q : y5)(date6);
}
function timeLocale(locale4) {
  let timeFormat4 = memoize(locale4.format), utcFormat3 = memoize(locale4.utcFormat);
  return {
    timeFormat: (spec) => isString(spec) ? timeFormat4(spec) : timeMultiFormat(timeFormat4, timeInterval2, spec),
    utcFormat: (spec) => isString(spec) ? utcFormat3(spec) : timeMultiFormat(utcFormat3, utcInterval, spec),
    timeParse: memoize(locale4.parse),
    utcParse: memoize(locale4.utcParse)
  };
}
var defaultTimeLocale;
resetTimeFormatDefaultLocale();
function resetTimeFormatDefaultLocale() {
  return defaultTimeLocale = timeLocale({
    format: timeFormat,
    parse: timeParse,
    utcFormat,
    utcParse
  });
}
function timeFormatLocale(definition3) {
  return timeLocale(formatLocale(definition3));
}
function timeFormatDefaultLocale(definition3) {
  return arguments.length ? defaultTimeLocale = timeFormatLocale(definition3) : defaultTimeLocale;
}
var createLocale = (number12, time6) => extend2({}, number12, time6);
function locale3(numberSpec, timeSpec) {
  let number12 = numberSpec ? numberFormatLocale(numberSpec) : numberFormatDefaultLocale(), time6 = timeSpec ? timeFormatLocale(timeSpec) : timeFormatDefaultLocale();
  return createLocale(number12, time6);
}
function defaultLocale3(numberSpec, timeSpec) {
  let args = arguments.length;
  return args && args !== 2 && error62("defaultLocale expects either zero or two arguments."), args ? createLocale(numberFormatDefaultLocale(numberSpec), timeFormatDefaultLocale(timeSpec)) : createLocale(numberFormatDefaultLocale(), timeFormatDefaultLocale());
}

// node_modules/vega-loader/build/vega-loader.node.js
var protocol_re = /^(data:|([A-Za-z]+:)?\/\/)/, allowed_re = /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|file|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i, whitespace_re = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g, fileProtocol = "file://";
function loaderFactory(fs2) {
  return (options) => ({
    options: options || {},
    sanitize,
    load,
    fileAccess: !!fs2,
    file: fileLoader(fs2),
    http: httpLoader
  });
}
async function load(uri2, options) {
  let opt = await this.sanitize(uri2, options), url2 = opt.href;
  return opt.localFile ? this.file(url2) : this.http(url2, options?.http);
}
async function sanitize(uri2, options) {
  options = extend2({}, this.options, options);
  let fileAccess = this.fileAccess, result = {
    href: null
  }, isFile, loadFile, base, isAllowed = allowed_re.test(uri2.replace(whitespace_re, ""));
  (uri2 == null || typeof uri2 != "string" || !isAllowed) && error62("Sanitize failure, invalid URI: " + stringValue(uri2));
  let hasProtocol = protocol_re.test(uri2);
  return (base = options.baseURL) && !hasProtocol && (!uri2.startsWith("/") && !base.endsWith("/") && (uri2 = "/" + uri2), uri2 = base + uri2), loadFile = (isFile = uri2.startsWith(fileProtocol)) || options.mode === "file" || options.mode !== "http" && !hasProtocol && fileAccess, isFile ? uri2 = uri2.slice(fileProtocol.length) : uri2.startsWith("//") && (options.defaultProtocol === "file" ? (uri2 = uri2.slice(2), loadFile = !0) : uri2 = (options.defaultProtocol || "http") + ":" + uri2), Object.defineProperty(result, "localFile", {
    value: !!loadFile
  }), result.href = uri2, options.target && (result.target = options.target + ""), options.rel && (result.rel = options.rel + ""), options.context === "image" && options.crossOrigin && (result.crossOrigin = options.crossOrigin + ""), result;
}
function fileLoader(fs2) {
  return fs2 ? (filename) => new Promise((accept, reject) => {
    fs2.readFile(filename, (error64, data3) => {
      error64 ? reject(error64) : accept(data3);
    });
  }) : fileReject;
}
async function fileReject() {
  error62("No file system access.");
}
async function httpLoader(url2, options) {
  let opt = extend2({}, this.options.http, options), type3 = options && options.response, response = await fetch(url2, opt);
  return response.ok ? isFunction(response[type3]) ? response[type3]() : response.text() : error62(response.status + "" + response.statusText);
}
var isValid2 = (_) => _ != null && _ === _, isBoolean2 = (_) => _ === "true" || _ === "false" || _ === !0 || _ === !1, isDate2 = (_) => !Number.isNaN(Date.parse(_)), isNumber2 = (_) => !Number.isNaN(+_) && !(_ instanceof Date), isInteger = (_) => isNumber2(_) && Number.isInteger(+_), typeParsers = {
  boolean: toBoolean,
  integer: toNumber,
  number: toNumber,
  date: toDate,
  string: toString,
  unknown: identity6
}, typeTests = [isBoolean2, isInteger, isNumber2, isDate2], typeList = ["boolean", "integer", "number", "date"];
function inferType(values3, field3) {
  if (!values3 || !values3.length) return "unknown";
  let n = values3.length, m = typeTests.length, a = typeTests.map((_, i) => i + 1);
  for (let i = 0, t = 0, j2, value3; i < n; ++i)
    for (value3 = field3 ? values3[i][field3] : values3[i], j2 = 0; j2 < m; ++j2)
      if (a[j2] && isValid2(value3) && !typeTests[j2](value3) && (a[j2] = 0, ++t, t === typeTests.length))
        return "string";
  return typeList[a.reduce((u4, v2) => u4 === 0 ? v2 : u4, 0) - 1];
}
function inferTypes(data3, fields) {
  return fields.reduce((types, field3) => (types[field3] = inferType(data3, field3), types), {});
}
function delimitedFormat(delimiter) {
  let parse9 = function(data3, format5) {
    let delim = {
      delimiter
    };
    return dsv(data3, format5 ? extend2(format5, delim) : delim);
  };
  return parse9.responseType = "text", parse9;
}
function dsv(data3, format5) {
  return format5.header && (data3 = format5.header.map(stringValue).join(format5.delimiter) + `
` + data3), dsv_default(format5.delimiter).parse(data3 + "");
}
dsv.responseType = "text";
function isBuffer(_) {
  return typeof Buffer == "function" && isFunction(Buffer.isBuffer) ? Buffer.isBuffer(_) : !1;
}
function json2(data3, format5) {
  let prop = format5 && format5.property ? field(format5.property) : identity6;
  return isObject2(data3) && !isBuffer(data3) ? parseJSON(prop(data3), format5) : prop(JSON.parse(data3));
}
json2.responseType = "json";
function parseJSON(data3, format5) {
  return !isArray(data3) && isIterable(data3) && (data3 = [...data3]), format5 && format5.copy ? JSON.parse(JSON.stringify(data3)) : data3;
}
var filters = {
  interior: (a, b10) => a !== b10,
  exterior: (a, b10) => a === b10
};
function topojson(data3, format5) {
  let method2, object4, property2, filter3;
  return data3 = json2(data3, format5), format5 && format5.feature ? (method2 = import_topojson_client.feature, property2 = format5.feature) : format5 && format5.mesh ? (method2 = import_topojson_client.mesh, property2 = format5.mesh, filter3 = filters[format5.filter]) : error62("Missing TopoJSON feature or mesh parameter."), object4 = (object4 = data3.objects[property2]) ? method2(data3, object4, filter3) : error62("Invalid TopoJSON object: " + property2), object4 && object4.features || [object4];
}
topojson.responseType = "json";
var format2 = {
  dsv,
  csv: delimitedFormat(","),
  tsv: delimitedFormat("	"),
  json: json2,
  topojson
};
function formats(name2, reader) {
  return arguments.length > 1 ? (format2[name2] = reader, this) : hasOwnProperty(format2, name2) ? format2[name2] : null;
}
function responseType(type3) {
  let f = formats(type3);
  return f && f.responseType || "text";
}
function read(data3, schema, timeParser, utcParser) {
  schema = schema || {};
  let reader = formats(schema.type || "json");
  return reader || error62("Unknown data format type: " + schema.type), data3 = reader(data3, schema), schema.parse && parse3(data3, schema.parse, timeParser, utcParser), hasOwnProperty(data3, "columns") && delete data3.columns, data3;
}
function parse3(data3, types, timeParser, utcParser) {
  if (!data3.length) return;
  let locale4 = timeFormatDefaultLocale();
  timeParser = timeParser || locale4.timeParse, utcParser = utcParser || locale4.utcParse;
  let fields = data3.columns || Object.keys(data3[0]), datum2, field3, i, j2, n, m;
  types === "auto" && (types = inferTypes(data3, fields)), fields = Object.keys(types);
  let parsers = fields.map((field4) => {
    let type3 = types[field4], parts, pattern;
    if (type3 && (type3.startsWith("date:") || type3.startsWith("utc:")))
      return parts = type3.split(/:(.+)?/, 2), pattern = parts[1], (pattern[0] === "'" && pattern[pattern.length - 1] === "'" || pattern[0] === '"' && pattern[pattern.length - 1] === '"') && (pattern = pattern.slice(1, -1)), (parts[0] === "utc" ? utcParser : timeParser)(pattern);
    if (!typeParsers[type3])
      throw Error("Illegal format pattern: " + field4 + ":" + type3);
    return typeParsers[type3];
  });
  for (i = 0, n = data3.length, m = fields.length; i < n; ++i)
    for (datum2 = data3[i], j2 = 0; j2 < m; ++j2)
      field3 = fields[j2], datum2[field3] = parsers[j2](datum2[field3]);
}
var loader = loaderFactory(fs);

// node_modules/vega-dataflow/build/vega-dataflow.js
function UniqueList(idFunc) {
  let $ = idFunc || identity6, list = [], ids = {};
  return list.add = (_) => {
    let id3 = $(_);
    return ids[id3] || (ids[id3] = 1, list.push(_)), list;
  }, list.remove = (_) => {
    let id3 = $(_);
    if (ids[id3]) {
      ids[id3] = 0;
      let idx = list.indexOf(_);
      idx >= 0 && list.splice(idx, 1);
    }
    return list;
  }, list;
}
async function asyncCallback(df, callback) {
  try {
    await callback(df);
  } catch (err) {
    df.error(err);
  }
}
var TUPLE_ID_KEY = /* @__PURE__ */ Symbol("vega_id"), TUPLE_ID = 1;
function isTuple(t) {
  return !!(t && tupleid(t));
}
function tupleid(t) {
  return t[TUPLE_ID_KEY];
}
function setid(t, id3) {
  return t[TUPLE_ID_KEY] = id3, t;
}
function ingest$1(datum2) {
  let t = datum2 === Object(datum2) ? datum2 : {
    data: datum2
  };
  return tupleid(t) ? t : setid(t, TUPLE_ID++);
}
function derive(t) {
  return rederive(t, ingest$1({}));
}
function rederive(t, d) {
  for (let k in t) d[k] = t[k];
  return d;
}
function replace(t, d) {
  return setid(d, tupleid(t));
}
function stableCompare(cmp, f) {
  return cmp ? f ? (a, b10) => cmp(a, b10) || tupleid(f(a)) - tupleid(f(b10)) : (a, b10) => cmp(a, b10) || tupleid(a) - tupleid(b10) : null;
}
function isChangeSet(v2) {
  return v2 && v2.constructor === changeset;
}
function changeset() {
  let add6 = [], rem2 = [], mod = [], remp = [], modp = [], clean2 = null, reflow2 = !1;
  return {
    constructor: changeset,
    insert(t) {
      let d = array_default(t), n = d.length;
      for (let i = 0; i < n; ++i) add6.push(d[i]);
      return this;
    },
    remove(t) {
      let a = isFunction(t) ? remp : rem2, d = array_default(t), n = d.length;
      for (let i = 0; i < n; ++i) a.push(d[i]);
      return this;
    },
    modify(t, field3, value3) {
      let m = {
        field: field3,
        value: constant_default(value3)
      };
      return isFunction(t) ? (m.filter = t, modp.push(m)) : (m.tuple = t, mod.push(m)), this;
    },
    encode(t, set8) {
      return isFunction(t) ? modp.push({
        filter: t,
        field: set8
      }) : mod.push({
        tuple: t,
        field: set8
      }), this;
    },
    clean(value3) {
      return clean2 = value3, this;
    },
    reflow() {
      return reflow2 = !0, this;
    },
    pulse(pulse2, tuples) {
      let cur = {}, out = {}, i, n, m, f, t, id3;
      for (i = 0, n = tuples.length; i < n; ++i)
        cur[tupleid(tuples[i])] = 1;
      for (i = 0, n = rem2.length; i < n; ++i)
        t = rem2[i], cur[tupleid(t)] = -1;
      for (i = 0, n = remp.length; i < n; ++i)
        f = remp[i], tuples.forEach((t4) => {
          f(t4) && (cur[tupleid(t4)] = -1);
        });
      for (i = 0, n = add6.length; i < n; ++i)
        t = add6[i], id3 = tupleid(t), cur[id3] ? cur[id3] = 1 : pulse2.add.push(ingest$1(add6[i]));
      for (i = 0, n = tuples.length; i < n; ++i)
        t = tuples[i], cur[tupleid(t)] < 0 && pulse2.rem.push(t);
      function modify2(t4, f2, v2) {
        v2 ? t4[f2] = v2(t4) : pulse2.encode = f2, reflow2 || (out[tupleid(t4)] = t4);
      }
      for (i = 0, n = mod.length; i < n; ++i)
        m = mod[i], t = m.tuple, f = m.field, id3 = cur[tupleid(t)], id3 > 0 && (modify2(t, f, m.value), pulse2.modifies(f));
      for (i = 0, n = modp.length; i < n; ++i)
        m = modp[i], f = m.filter, tuples.forEach((t4) => {
          f(t4) && cur[tupleid(t4)] > 0 && modify2(t4, m.field, m.value);
        }), pulse2.modifies(m.field);
      if (reflow2)
        pulse2.mod = rem2.length || remp.length ? tuples.filter((t4) => cur[tupleid(t4)] > 0) : tuples.slice();
      else
        for (id3 in out) pulse2.mod.push(out[id3]);
      return (clean2 || clean2 == null && (rem2.length || remp.length)) && pulse2.clean(!0), pulse2;
    }
  };
}
var CACHE = "_:mod:_";
function Parameters() {
  Object.defineProperty(this, CACHE, {
    writable: !0,
    value: {}
  });
}
Parameters.prototype = {
  /**
   * Set a parameter value. If the parameter value changes, the parameter
   * will be recorded as modified.
   * @param {string} name - The parameter name.
   * @param {number} index - The index into an array-value parameter. Ignored if
   *   the argument is undefined, null or less than zero.
   * @param {*} value - The parameter value to set.
   * @param {boolean} [force=false] - If true, records the parameter as modified
   *   even if the value is unchanged.
   * @return {Parameters} - This parameter object.
   */
  set(name2, index4, value3, force) {
    let o = this, v2 = o[name2], mod = o[CACHE];
    return index4 != null && index4 >= 0 ? (v2[index4] !== value3 || force) && (v2[index4] = value3, mod[index4 + ":" + name2] = -1, mod[name2] = -1) : (v2 !== value3 || force) && (o[name2] = value3, mod[name2] = isArray(value3) ? 1 + value3.length : -1), o;
  },
  /**
   * Tests if one or more parameters has been modified. If invoked with no
   * arguments, returns true if any parameter value has changed. If the first
   * argument is array, returns trues if any parameter name in the array has
   * changed. Otherwise, tests if the given name and optional array index has
   * changed.
   * @param {string} name - The parameter name to test.
   * @param {number} [index=undefined] - The parameter array index to test.
   * @return {boolean} - Returns true if a queried parameter was modified.
   */
  modified(name2, index4) {
    let mod = this[CACHE];
    if (arguments.length) {
      if (isArray(name2)) {
        for (let k = 0; k < name2.length; ++k)
          if (mod[name2[k]]) return !0;
        return !1;
      }
    } else {
      for (let k in mod)
        if (mod[k]) return !0;
      return !1;
    }
    return index4 != null && index4 >= 0 ? index4 + 1 < mod[name2] || !!mod[index4 + ":" + name2] : !!mod[name2];
  },
  /**
   * Clears the modification records. After calling this method,
   * all parameters are considered unmodified.
   */
  clear() {
    return this[CACHE] = {}, this;
  }
};
var OP_ID = 0, PULSE = "pulse", NO_PARAMS = new Parameters(), SKIP$1 = 1, MODIFIED = 2;
function Operator(init2, update3, params2, react) {
  this.id = ++OP_ID, this.value = init2, this.stamp = -1, this.rank = -1, this.qrank = -1, this.flags = 0, update3 && (this._update = update3), params2 && this.parameters(params2, react);
}
function flag(bit) {
  return function(state) {
    let f = this.flags;
    return arguments.length === 0 ? !!(f & bit) : (this.flags = state ? f | bit : f & ~bit, this);
  };
}
Operator.prototype = {
  /**
   * Returns a list of target operators dependent on this operator.
   * If this list does not exist, it is created and then returned.
   * @return {UniqueList}
   */
  targets() {
    return this._targets || (this._targets = UniqueList(id2));
  },
  /**
   * Sets the value of this operator.
   * @param {*} value - the value to set.
   * @return {Number} Returns 1 if the operator value has changed
   *   according to strict equality, returns 0 otherwise.
   */
  set(value3) {
    return this.value !== value3 ? (this.value = value3, 1) : 0;
  },
  /**
   * Indicates that operator evaluation should be skipped on the next pulse.
   * This operator will still propagate incoming pulses, but its update function
   * will not be invoked. The skip flag is reset after every pulse, so calling
   * this method will affect processing of the next pulse only.
   */
  skip: flag(SKIP$1),
  /**
   * Indicates that this operator's value has been modified on its most recent
   * pulse. Normally modification is checked via strict equality; however, in
   * some cases it is more efficient to update the internal state of an object.
   * In those cases, the modified flag can be used to trigger propagation. Once
   * set, the modification flag persists across pulses until unset. The flag can
   * be used with the last timestamp to test if a modification is recent.
   */
  modified: flag(MODIFIED),
  /**
   * Sets the parameters for this operator. The parameter values are analyzed for
   * operator instances. If found, this operator will be added as a dependency
   * of the parameterizing operator. Operator values are dynamically marshalled
   * from each operator parameter prior to evaluation. If a parameter value is
   * an array, the array will also be searched for Operator instances. However,
   * the search does not recurse into sub-arrays or object properties.
   * @param {object} params - A hash of operator parameters.
   * @param {boolean} [react=true] - A flag indicating if this operator should
   *   automatically update (react) when parameter values change. In other words,
   *   this flag determines if the operator registers itself as a listener on
   *   any upstream operators included in the parameters.
   * @param {boolean} [initonly=false] - A flag indicating if this operator
   *   should calculate an update only upon its initial evaluation, then
   *   deregister dependencies and suppress all future update invocations.
   * @return {Operator[]} - An array of upstream dependencies.
   */
  parameters(params2, react, initonly) {
    react = react !== !1;
    let argval = this._argval = this._argval || new Parameters(), argops = this._argops = this._argops || [], deps = [], name2, value3, n, i, add6 = (name3, index4, value4) => {
      value4 instanceof Operator ? (value4 !== this && (react && value4.targets().add(this), deps.push(value4)), argops.push({
        op: value4,
        name: name3,
        index: index4
      })) : argval.set(name3, index4, value4);
    };
    for (name2 in params2)
      if (value3 = params2[name2], name2 === PULSE)
        array_default(value3).forEach((op) => {
          op instanceof Operator ? op !== this && (op.targets().add(this), deps.push(op)) : error62("Pulse parameters must be operator instances.");
        }), this.source = value3;
      else if (isArray(value3))
        for (argval.set(name2, -1, Array(n = value3.length)), i = 0; i < n; ++i) add6(name2, i, value3[i]);
      else
        add6(name2, -1, value3);
    return this.marshall().clear(), initonly && (argops.initonly = !0), deps;
  },
  /**
   * Internal method for marshalling parameter values.
   * Visits each operator dependency to pull the latest value.
   * @return {Parameters} A Parameters object to pass to the update function.
   */
  marshall(stamp3) {
    let argval = this._argval || NO_PARAMS, argops = this._argops, item, i, op, mod;
    if (argops) {
      let n = argops.length;
      for (i = 0; i < n; ++i)
        item = argops[i], op = item.op, mod = op.modified() && op.stamp === stamp3, argval.set(item.name, item.index, op.value, mod);
      if (argops.initonly) {
        for (i = 0; i < n; ++i)
          item = argops[i], item.op.targets().remove(this);
        this._argops = null, this._update = null;
      }
    }
    return argval;
  },
  /**
   * Detach this operator from the dataflow.
   * Unregisters listeners on upstream dependencies.
   */
  detach() {
    let argops = this._argops, i, n, item, op;
    if (argops)
      for (i = 0, n = argops.length; i < n; ++i)
        item = argops[i], op = item.op, op._targets && op._targets.remove(this);
    this.pulse = null, this.source = null;
  },
  /**
   * Delegate method to perform operator processing.
   * Subclasses can override this method to perform custom processing.
   * By default, it marshalls parameters and calls the update function
   * if that function is defined. If the update function does not
   * change the operator value then StopPropagation is returned.
   * If no update function is defined, this method does nothing.
   * @param {Pulse} pulse - the current dataflow pulse.
   * @return The output pulse or StopPropagation. A falsy return value
   *   (including undefined) will let the input pulse pass through.
   */
  evaluate(pulse2) {
    let update3 = this._update;
    if (update3) {
      let params2 = this.marshall(pulse2.stamp), v2 = update3.call(this, params2, pulse2);
      if (params2.clear(), v2 !== this.value)
        this.value = v2;
      else if (!this.modified())
        return pulse2.StopPropagation;
    }
  },
  /**
   * Run this operator for the current pulse. If this operator has already
   * been run at (or after) the pulse timestamp, returns StopPropagation.
   * Internally, this method calls {@link evaluate} to perform processing.
   * If {@link evaluate} returns a falsy value, the input pulse is returned.
   * This method should NOT be overridden, instead overrride {@link evaluate}.
   * @param {Pulse} pulse - the current dataflow pulse.
   * @return the output pulse for this operator (or StopPropagation)
   */
  run(pulse2) {
    if (pulse2.stamp < this.stamp) return pulse2.StopPropagation;
    let rv;
    return this.skip() ? (this.skip(!1), rv = 0) : rv = this.evaluate(pulse2), this.pulse = rv || pulse2;
  }
};
function add(init2, update3, params2, react) {
  let shift = 1, op;
  return init2 instanceof Operator ? op = init2 : init2 && init2.prototype instanceof Operator ? op = new init2() : isFunction(init2) ? op = new Operator(null, init2) : (shift = 0, op = new Operator(init2, update3)), this.rank(op), shift && (react = params2, params2 = update3), params2 && this.connect(op, op.parameters(params2, react)), this.touch(op), op;
}
function connect(target3, sources) {
  let targetRank = target3.rank, n = sources.length;
  for (let i = 0; i < n; ++i)
    if (targetRank < sources[i].rank) {
      this.rerank(target3);
      return;
    }
}
var STREAM_ID = 0;
function EventStream(filter3, apply4, receive) {
  this.id = ++STREAM_ID, this.value = null, receive && (this.receive = receive), filter3 && (this._filter = filter3), apply4 && (this._apply = apply4);
}
function stream(filter3, apply4, receive) {
  return new EventStream(filter3, apply4, receive);
}
EventStream.prototype = {
  _filter: truthy,
  _apply: identity6,
  targets() {
    return this._targets || (this._targets = UniqueList(id2));
  },
  consume(_) {
    return arguments.length ? (this._consume = !!_, this) : !!this._consume;
  },
  receive(evt) {
    if (this._filter(evt)) {
      let val = this.value = this._apply(evt), trg = this._targets, n = trg ? trg.length : 0;
      for (let i = 0; i < n; ++i) trg[i].receive(val);
      this._consume && (evt.preventDefault(), evt.stopPropagation());
    }
  },
  filter(filter3) {
    let s = stream(filter3);
    return this.targets().add(s), s;
  },
  apply(apply4) {
    let s = stream(null, apply4);
    return this.targets().add(s), s;
  },
  merge() {
    let s = stream();
    this.targets().add(s);
    for (let i = 0, n = arguments.length; i < n; ++i)
      arguments[i].targets().add(s);
    return s;
  },
  throttle(pause) {
    let t = -1;
    return this.filter(() => {
      let now2 = Date.now();
      return now2 - t > pause ? (t = now2, 1) : 0;
    });
  },
  debounce(delay2) {
    let s = stream();
    return this.targets().add(stream(null, null, debounce(delay2, (e) => {
      let df = e.dataflow;
      s.receive(e), df && df.run && df.run();
    }))), s;
  },
  between(a, b10) {
    let active = !1;
    return a.targets().add(stream(null, null, () => active = !0)), b10.targets().add(stream(null, null, () => active = !1)), this.filter(() => active);
  },
  detach() {
    this._filter = truthy, this._targets = null;
  }
};
function events(source4, type3, filter3, apply4) {
  let df = this, s = stream(filter3, apply4), send = function(e) {
    e.dataflow = df;
    try {
      s.receive(e);
    } catch (error64) {
      df.error(error64);
    } finally {
      df.run();
    }
  }, sources;
  typeof source4 == "string" && typeof document < "u" ? sources = document.querySelectorAll(source4) : sources = array_default(source4);
  let n = sources.length;
  for (let i = 0; i < n; ++i)
    sources[i].addEventListener(type3, send);
  return s;
}
function parse4(data3, format5) {
  let locale4 = this.locale();
  return read(data3, format5, locale4.timeParse, locale4.utcParse);
}
function ingest(target3, data3, format5) {
  return data3 = this.parse(data3, format5), this.pulse(target3, this.changeset().insert(data3));
}
async function request(url2, format5) {
  let df = this, status = 0, data3;
  try {
    data3 = await df.loader().load(url2, {
      context: "dataflow",
      response: responseType(format5 && format5.type)
    });
    try {
      data3 = df.parse(data3, format5);
    } catch (err) {
      status = -2, df.warn("Data ingestion failed", url2, err);
    }
  } catch (err) {
    status = -1, df.warn("Loading failed", url2, err);
  }
  return {
    data: data3,
    status
  };
}
async function preload(target3, url2, format5) {
  let df = this, pending = df._pending || loadPending(df);
  pending.requests += 1;
  let res = await df.request(url2, format5);
  return df.pulse(target3, df.changeset().remove(truthy).insert(res.data || [])), pending.done(), res;
}
function loadPending(df) {
  let accept, pending = new Promise((a) => accept = a);
  return pending.requests = 0, pending.done = () => {
    --pending.requests === 0 && (df._pending = null, accept(df));
  }, df._pending = pending;
}
var SKIP = {
  skip: !0
};
function on(source4, target3, update3, params2, options) {
  return (source4 instanceof Operator ? onOperator : onStream)(this, source4, target3, update3, params2, options), this;
}
function onStream(df, stream2, target3, update3, params2, options) {
  let opt = extend2({}, options, SKIP), func, op;
  isFunction(target3) || (target3 = constant_default(target3)), update3 === void 0 ? func = (e) => df.touch(target3(e)) : isFunction(update3) ? (op = new Operator(null, update3, params2, !1), func = (e) => {
    op.evaluate(e);
    let t = target3(e), v2 = op.value;
    isChangeSet(v2) ? df.pulse(t, v2, options) : df.update(t, v2, opt);
  }) : func = (e) => df.update(target3(e), update3, opt), stream2.apply(func);
}
function onOperator(df, source4, target3, update3, params2, options) {
  if (update3 === void 0)
    source4.targets().add(target3);
  else {
    let opt = options || {}, op = new Operator(null, updater(target3, update3), params2, !1);
    op.modified(opt.force), op.rank = source4.rank, source4.targets().add(op), target3 && (op.skip(!0), op.value = target3.value, op.targets().add(target3), df.connect(target3, [op]));
  }
}
function updater(target3, update3) {
  return update3 = isFunction(update3) ? update3 : constant_default(update3), target3 ? function(_, pulse2) {
    let value3 = update3(_, pulse2);
    return target3.skip() || (target3.skip(value3 !== this.value).value = value3), value3;
  } : update3;
}
function rank(op) {
  op.rank = ++this._rank;
}
function rerank(op) {
  let queue = [op], cur, list, i;
  for (; queue.length; )
    if (this.rank(cur = queue.pop()), list = cur._targets)
      for (i = list.length; --i >= 0; )
        queue.push(cur = list[i]), cur === op && error62("Cycle detected in dataflow graph.");
}
var StopPropagation = {}, ADD = 1, REM = 2, MOD = 4, ADD_REM = ADD | REM, ADD_MOD = ADD | MOD, ALL = ADD | REM | MOD, REFLOW = 8, SOURCE = 16, NO_SOURCE = 32, NO_FIELDS = 64;
function Pulse(dataflow, stamp3, encode4) {
  this.dataflow = dataflow, this.stamp = stamp3 ?? -1, this.add = [], this.rem = [], this.mod = [], this.fields = null, this.encode = encode4 || null;
}
function materialize(data3, filter3) {
  let out = [];
  return visitArray(data3, filter3, (_) => out.push(_)), out;
}
function filter(pulse2, flags) {
  let map4 = {};
  return pulse2.visit(flags, (t) => {
    map4[tupleid(t)] = 1;
  }), (t) => map4[tupleid(t)] ? null : t;
}
function addFilter(a, b10) {
  return a ? (t, i) => a(t, i) && b10(t, i) : b10;
}
Pulse.prototype = {
  /**
   * Sentinel value indicating pulse propagation should stop.
   */
  StopPropagation,
  /**
   * Boolean flag indicating ADD (added) tuples.
   */
  ADD,
  /**
   * Boolean flag indicating REM (removed) tuples.
   */
  REM,
  /**
   * Boolean flag indicating MOD (modified) tuples.
   */
  MOD,
  /**
   * Boolean flag indicating ADD (added) and REM (removed) tuples.
   */
  ADD_REM,
  /**
   * Boolean flag indicating ADD (added) and MOD (modified) tuples.
   */
  ADD_MOD,
  /**
   * Boolean flag indicating ADD, REM and MOD tuples.
   */
  ALL,
  /**
   * Boolean flag indicating all tuples in a data source
   * except for the ADD, REM and MOD tuples.
   */
  REFLOW,
  /**
   * Boolean flag indicating a 'pass-through' to a
   * backing data source, ignoring ADD, REM and MOD tuples.
   */
  SOURCE,
  /**
   * Boolean flag indicating that source data should be
   * suppressed when creating a forked pulse.
   */
  NO_SOURCE,
  /**
   * Boolean flag indicating that field modifications should be
   * suppressed when creating a forked pulse.
   */
  NO_FIELDS,
  /**
   * Creates a new pulse based on the values of this pulse.
   * The dataflow, time stamp and field modification values are copied over.
   * By default, new empty ADD, REM and MOD arrays are created.
   * @param {number} flags - Integer of boolean flags indicating which (if any)
   *   tuple arrays should be copied to the new pulse. The supported flag values
   *   are ADD, REM and MOD. Array references are copied directly: new array
   *   instances are not created.
   * @return {Pulse} - The forked pulse instance.
   * @see init
   */
  fork(flags) {
    return new Pulse(this.dataflow).init(this, flags);
  },
  /**
   * Creates a copy of this pulse with new materialized array
   * instances for the ADD, REM, MOD, and SOURCE arrays.
   * The dataflow, time stamp and field modification values are copied over.
   * @return {Pulse} - The cloned pulse instance.
   * @see init
   */
  clone() {
    let p = this.fork(ALL);
    return p.add = p.add.slice(), p.rem = p.rem.slice(), p.mod = p.mod.slice(), p.source && (p.source = p.source.slice()), p.materialize(ALL | SOURCE);
  },
  /**
   * Returns a pulse that adds all tuples from a backing source. This is
   * useful for cases where operators are added to a dataflow after an
   * upstream data pipeline has already been processed, ensuring that
   * new operators can observe all tuples within a stream.
   * @return {Pulse} - A pulse instance with all source tuples included
   *   in the add array. If the current pulse already has all source
   *   tuples in its add array, it is returned directly. If the current
   *   pulse does not have a backing source, it is returned directly.
   */
  addAll() {
    let p = this;
    return !p.source || p.add === p.rem || !p.rem.length && p.source.length === p.add.length || (p = new Pulse(this.dataflow).init(this), p.add = p.source, p.rem = []), p;
  },
  /**
   * Initialize this pulse based on the values of another pulse. This method
   * is used internally by {@link fork} to initialize a new forked tuple.
   * The dataflow, time stamp and field modification values are copied over.
   * By default, new empty ADD, REM and MOD arrays are created.
   * @param {Pulse} src - The source pulse to copy from.
   * @param {number} flags - Integer of boolean flags indicating which (if any)
   *   tuple arrays should be copied to the new pulse. The supported flag values
   *   are ADD, REM and MOD. Array references are copied directly: new array
   *   instances are not created. By default, source data arrays are copied
   *   to the new pulse. Use the NO_SOURCE flag to enforce a null source.
   * @return {Pulse} - Returns this Pulse instance.
   */
  init(src, flags) {
    let p = this;
    return p.stamp = src.stamp, p.encode = src.encode, src.fields && !(flags & NO_FIELDS) && (p.fields = src.fields), flags & ADD ? (p.addF = src.addF, p.add = src.add) : (p.addF = null, p.add = []), flags & REM ? (p.remF = src.remF, p.rem = src.rem) : (p.remF = null, p.rem = []), flags & MOD ? (p.modF = src.modF, p.mod = src.mod) : (p.modF = null, p.mod = []), flags & NO_SOURCE ? (p.srcF = null, p.source = null) : (p.srcF = src.srcF, p.source = src.source, src.cleans && (p.cleans = src.cleans)), p;
  },
  /**
   * Schedules a function to run after pulse propagation completes.
   * @param {function} func - The function to run.
   */
  runAfter(func) {
    this.dataflow.runAfter(func);
  },
  /**
   * Indicates if tuples have been added, removed or modified.
   * @param {number} [flags] - The tuple types (ADD, REM or MOD) to query.
   *   Defaults to ALL, returning true if any tuple type has changed.
   * @return {boolean} - Returns true if one or more queried tuple types have
   *   changed, false otherwise.
   */
  changed(flags) {
    let f = flags || ALL;
    return f & ADD && this.add.length || f & REM && this.rem.length || f & MOD && this.mod.length;
  },
  /**
   * Forces a "reflow" of tuple values, such that all tuples in the backing
   * source are added to the MOD set, unless already present in the ADD set.
   * @param {boolean} [fork=false] - If true, returns a forked copy of this
   *   pulse, and invokes reflow on that derived pulse.
   * @return {Pulse} - The reflowed pulse instance.
   */
  reflow(fork) {
    if (fork) return this.fork(ALL).reflow();
    let len = this.add.length, src = this.source && this.source.length;
    return src && src !== len && (this.mod = this.source, len && this.filter(MOD, filter(this, ADD))), this;
  },
  /**
   * Get/set metadata to pulse requesting garbage collection
   * to reclaim currently unused resources.
   */
  clean(value3) {
    return arguments.length ? (this.cleans = !!value3, this) : this.cleans;
  },
  /**
   * Marks one or more data field names as modified to assist dependency
   * tracking and incremental processing by transform operators.
   * @param {string|Array<string>} _ - The field(s) to mark as modified.
   * @return {Pulse} - This pulse instance.
   */
  modifies(_) {
    let hash6 = this.fields || (this.fields = {});
    return isArray(_) ? _.forEach((f) => hash6[f] = !0) : hash6[_] = !0, this;
  },
  /**
   * Checks if one or more data fields have been modified during this pulse
   * propagation timestamp.
   * @param {string|Array<string>} _ - The field(s) to check for modified.
   * @param {boolean} nomod - If true, will check the modified flag even if
   *   no mod tuples exist. If false (default), mod tuples must be present.
   * @return {boolean} - Returns true if any of the provided fields has been
   *   marked as modified, false otherwise.
   */
  modified(_, nomod) {
    let fields = this.fields;
    return (nomod || this.mod.length) && fields ? arguments.length ? isArray(_) ? _.some((f) => fields[f]) : fields[_] : !!fields : !1;
  },
  /**
   * Adds a filter function to one more tuple sets. Filters are applied to
   * backing tuple arrays, to determine the actual set of tuples considered
   * added, removed or modified. They can be used to delay materialization of
   * a tuple set in order to avoid expensive array copies. In addition, the
   * filter functions can serve as value transformers: unlike standard predicate
   * function (which return boolean values), Pulse filters should return the
   * actual tuple value to process. If a tuple set is already filtered, the
   * new filter function will be appended into a conjuntive ('and') query.
   * @param {number} flags - Flags indicating the tuple set(s) to filter.
   * @param {function(*):object} filter - Filter function that will be applied
   *   to the tuple set array, and should return a data tuple if the value
   *   should be included in the tuple set, and falsy (or null) otherwise.
   * @return {Pulse} - Returns this pulse instance.
   */
  filter(flags, filter3) {
    let p = this;
    return flags & ADD && (p.addF = addFilter(p.addF, filter3)), flags & REM && (p.remF = addFilter(p.remF, filter3)), flags & MOD && (p.modF = addFilter(p.modF, filter3)), flags & SOURCE && (p.srcF = addFilter(p.srcF, filter3)), p;
  },
  /**
   * Materialize one or more tuple sets in this pulse. If the tuple set(s) have
   * a registered filter function, it will be applied and the tuple set(s) will
   * be replaced with materialized tuple arrays.
   * @param {number} flags - Flags indicating the tuple set(s) to materialize.
   * @return {Pulse} - Returns this pulse instance.
   */
  materialize(flags) {
    flags = flags || ALL;
    let p = this;
    return flags & ADD && p.addF && (p.add = materialize(p.add, p.addF), p.addF = null), flags & REM && p.remF && (p.rem = materialize(p.rem, p.remF), p.remF = null), flags & MOD && p.modF && (p.mod = materialize(p.mod, p.modF), p.modF = null), flags & SOURCE && p.srcF && (p.source = p.source.filter(p.srcF), p.srcF = null), p;
  },
  /**
   * Visit one or more tuple sets in this pulse.
   * @param {number} flags - Flags indicating the tuple set(s) to visit.
   *   Legal values are ADD, REM, MOD and SOURCE (if a backing data source
   *   has been set).
   * @param {function(object):*} - Visitor function invoked per-tuple.
   * @return {Pulse} - Returns this pulse instance.
   */
  visit(flags, visitor) {
    let p = this, v2 = visitor;
    if (flags & SOURCE)
      return visitArray(p.source, p.srcF, v2), p;
    flags & ADD && visitArray(p.add, p.addF, v2), flags & REM && visitArray(p.rem, p.remF, v2), flags & MOD && visitArray(p.mod, p.modF, v2);
    let src = p.source;
    if (flags & REFLOW && src) {
      let sum3 = p.add.length + p.mod.length;
      sum3 === src.length || (sum3 ? visitArray(src, filter(p, ADD_MOD), v2) : visitArray(src, p.srcF, v2));
    }
    return p;
  }
};
function MultiPulse(dataflow, stamp3, pulses, encode4) {
  let p = this, c = 0;
  this.dataflow = dataflow, this.stamp = stamp3, this.fields = null, this.encode = encode4 || null, this.pulses = pulses;
  for (let pulse2 of pulses)
    if (pulse2.stamp === stamp3) {
      if (pulse2.fields) {
        let hash6 = p.fields || (p.fields = {});
        for (let f in pulse2.fields)
          hash6[f] = 1;
      }
      pulse2.changed(p.ADD) && (c |= p.ADD), pulse2.changed(p.REM) && (c |= p.REM), pulse2.changed(p.MOD) && (c |= p.MOD);
    }
  this.changes = c;
}
inherits_default(MultiPulse, Pulse, {
  /**
   * Creates a new pulse based on the values of this pulse.
   * The dataflow, time stamp and field modification values are copied over.
   * @return {Pulse}
   */
  fork(flags) {
    let p = new Pulse(this.dataflow).init(this, flags & this.NO_FIELDS);
    return flags !== void 0 && (flags & p.ADD && this.visit(p.ADD, (t) => p.add.push(t)), flags & p.REM && this.visit(p.REM, (t) => p.rem.push(t)), flags & p.MOD && this.visit(p.MOD, (t) => p.mod.push(t))), p;
  },
  changed(flags) {
    return this.changes & flags;
  },
  modified(_) {
    let p = this, fields = p.fields;
    return fields && p.changes & p.MOD ? isArray(_) ? _.some((f) => fields[f]) : fields[_] : 0;
  },
  filter() {
    error62("MultiPulse does not support filtering.");
  },
  materialize() {
    error62("MultiPulse does not support materialization.");
  },
  visit(flags, visitor) {
    let p = this, pulses = p.pulses, n = pulses.length, i = 0;
    if (flags & p.SOURCE)
      for (; i < n; ++i)
        pulses[i].visit(flags, visitor);
    else
      for (; i < n; ++i)
        pulses[i].stamp === p.stamp && pulses[i].visit(flags, visitor);
    return p;
  }
});
async function evaluate(encode4, prerun, postrun) {
  let df = this, async = [];
  if (df._pulse) return reentrant(df);
  if (df._pending && await df._pending, prerun && await asyncCallback(df, prerun), !df._touched.length)
    return df.debug("Dataflow invoked, but nothing to do."), df;
  let stamp3 = ++df._clock;
  df._pulse = new Pulse(df, stamp3, encode4), df._touched.forEach((op2) => df._enqueue(op2, !0)), df._touched = UniqueList(id2);
  let count4 = 0, op, next, error64;
  try {
    for (; df._heap.size() > 0; ) {
      if (op = df._heap.pop(), op.rank !== op.qrank) {
        df._enqueue(op, !0);
        continue;
      }
      next = op.run(df._getPulse(op, encode4)), next.then ? next = await next : next.async && (async.push(next.async), next = StopPropagation), next !== StopPropagation && op._targets && op._targets.forEach((op2) => df._enqueue(op2)), ++count4;
    }
  } catch (err) {
    df._heap.clear(), error64 = err;
  }
  if (df._input = {}, df._pulse = null, df.debug(`Pulse ${stamp3}: ${count4} operators`), error64 && (df._postrun = [], df.error(error64)), df._postrun.length) {
    let pr = df._postrun.sort((a, b10) => b10.priority - a.priority);
    df._postrun = [];
    for (let i = 0; i < pr.length; ++i)
      await asyncCallback(df, pr[i].callback);
  }
  return postrun && await asyncCallback(df, postrun), async.length && Promise.all(async).then((cb) => df.runAsync(null, () => {
    cb.forEach((f) => {
      try {
        f(df);
      } catch (err) {
        df.error(err);
      }
    });
  })), df;
}
async function runAsync(encode4, prerun, postrun) {
  for (; this._running; ) await this._running;
  let clear2 = () => this._running = null;
  return (this._running = this.evaluate(encode4, prerun, postrun)).then(clear2, clear2), this._running;
}
function run3(encode4, prerun, postrun) {
  return this._pulse ? reentrant(this) : (this.evaluate(encode4, prerun, postrun), this);
}
function runAfter(callback, enqueue2, priority) {
  if (this._pulse || enqueue2)
    this._postrun.push({
      priority: priority || 0,
      callback
    });
  else
    try {
      callback(this);
    } catch (err) {
      this.error(err);
    }
}
function reentrant(df) {
  return df.error("Dataflow already running. Use runAsync() to chain invocations."), df;
}
function enqueue(op, force) {
  let q = op.stamp < this._clock;
  q && (op.stamp = this._clock), (q || force) && (op.qrank = op.rank, this._heap.push(op));
}
function getPulse(op, encode4) {
  let s = op.source, stamp3 = this._clock;
  return s && isArray(s) ? new MultiPulse(this, stamp3, s.map((_) => _.pulse), encode4) : this._input[op.id] || singlePulse(this._pulse, s && s.pulse);
}
function singlePulse(p, s) {
  return s && s.stamp === p.stamp ? s : (p = p.fork(), s && s !== StopPropagation && (p.source = s.source), p);
}
var NO_OPT = {
  skip: !1,
  force: !1
};
function touch(op, options) {
  let opt = options || NO_OPT;
  return this._pulse ? this._enqueue(op) : this._touched.add(op), opt.skip && op.skip(!0), this;
}
function update(op, value3, options) {
  let opt = options || NO_OPT;
  return (op.set(value3) || opt.force) && this.touch(op, opt), this;
}
function pulse(op, changeset2, options) {
  this.touch(op, options || NO_OPT);
  let p = new Pulse(this, this._clock + (this._pulse ? 0 : 1)), t = op.pulse && op.pulse.source || [];
  return p.target = op, this._input[op.id] = changeset2.pulse(p, t), this;
}
function Heap(cmp) {
  let nodes = [];
  return {
    clear: () => nodes = [],
    size: () => nodes.length,
    peek: () => nodes[0],
    push: (x5) => (nodes.push(x5), siftdown(nodes, 0, nodes.length - 1, cmp)),
    pop: () => {
      let last = nodes.pop(), item;
      return nodes.length ? (item = nodes[0], nodes[0] = last, siftup(nodes, 0, cmp)) : item = last, item;
    }
  };
}
function siftdown(array4, start, idx, cmp) {
  let parent, pidx, item = array4[idx];
  for (; idx > start; ) {
    if (pidx = idx - 1 >> 1, parent = array4[pidx], cmp(item, parent) < 0) {
      array4[idx] = parent, idx = pidx;
      continue;
    }
    break;
  }
  return array4[idx] = item;
}
function siftup(array4, idx, cmp) {
  let start = idx, end = array4.length, item = array4[idx], cidx = (idx << 1) + 1, ridx;
  for (; cidx < end; )
    ridx = cidx + 1, ridx < end && cmp(array4[cidx], array4[ridx]) >= 0 && (cidx = ridx), array4[idx] = array4[cidx], idx = cidx, cidx = (idx << 1) + 1;
  return array4[idx] = item, siftdown(array4, start, idx, cmp);
}
function Dataflow() {
  this.logger(logger_default()), this.logLevel(Error2), this._clock = 0, this._rank = 0, this._locale = defaultLocale3();
  try {
    this._loader = loader();
  } catch {
  }
  this._touched = UniqueList(id2), this._input = {}, this._pulse = null, this._heap = Heap((a, b10) => a.qrank - b10.qrank), this._postrun = [];
}
function logMethod(method2) {
  return function() {
    return this._log[method2].apply(this, arguments);
  };
}
Dataflow.prototype = {
  /**
   * The current timestamp of this dataflow. This value reflects the
   * timestamp of the previous dataflow run. The dataflow is initialized
   * with a stamp value of 0. The initial run of the dataflow will have
   * a timestap of 1, and so on. This value will match the
   * {@link Pulse.stamp} property.
   * @return {number} - The current timestamp value.
   */
  stamp() {
    return this._clock;
  },
  /**
   * Gets or sets the loader instance to use for data file loading. A
   * loader object must provide a "load" method for loading files and a
   * "sanitize" method for checking URL/filename validity. Both methods
   * should accept a URI and options hash as arguments, and return a Promise
   * that resolves to the loaded file contents (load) or a hash containing
   * sanitized URI data with the sanitized url assigned to the "href" property
   * (sanitize).
   * @param {object} _ - The loader instance to use.
   * @return {object|Dataflow} - If no arguments are provided, returns
   *   the current loader instance. Otherwise returns this Dataflow instance.
   */
  loader(_) {
    return arguments.length ? (this._loader = _, this) : this._loader;
  },
  /**
   * Gets or sets the locale instance to use for formatting and parsing
   * string values. The locale object should be provided by the
   * vega-format library, and include methods such as format, timeFormat,
   * utcFormat, timeParse, and utcParse.
   * @param {object} _ - The locale instance to use.
   * @return {object|Dataflow} - If no arguments are provided, returns
   *   the current locale instance. Otherwise returns this Dataflow instance.
   */
  locale(_) {
    return arguments.length ? (this._locale = _, this) : this._locale;
  },
  /**
   * Get or set the logger instance used to log messages. If no arguments are
   * provided, returns the current logger instance. Otherwise, sets the logger
   * and return this Dataflow instance. Provided loggers must support the full
   * API of logger objects generated by the vega-util logger method. Note that
   * by default the log level of the new logger will be used; use the logLevel
   * method to adjust the log level as needed.
   */
  logger(logger) {
    return arguments.length ? (this._log = logger, this) : this._log;
  },
  /**
   * Logs an error message. By default, logged messages are written to console
   * output. The message will only be logged if the current log level is high
   * enough to permit error messages.
   */
  error: logMethod("error"),
  /**
   * Logs a warning message. By default, logged messages are written to console
   * output. The message will only be logged if the current log level is high
   * enough to permit warning messages.
   */
  warn: logMethod("warn"),
  /**
   * Logs an information message. By default, logged messages are written to
   * console output. The message will only be logged if the current log level is
   * high enough to permit information messages.
   */
  info: logMethod("info"),
  /**
   * Logs a debug message. By default, logged messages are written to console
   * output. The message will only be logged if the current log level is high
   * enough to permit debug messages.
   */
  debug: logMethod("debug"),
  /**
   * Get or set the current log level. If an argument is provided, it
   * will be used as the new log level.
   * @param {number} [level] - Should be one of None, Warn, Info
   * @return {number} - The current log level.
   */
  logLevel: logMethod("level"),
  /**
   * Empty entry threshold for garbage cleaning. Map data structures will
   * perform cleaning once the number of empty entries exceeds this value.
   */
  cleanThreshold: 1e4,
  // OPERATOR REGISTRATION
  add,
  connect,
  rank,
  rerank,
  // OPERATOR UPDATES
  pulse,
  touch,
  update,
  changeset,
  // DATA LOADING
  ingest,
  parse: parse4,
  preload,
  request,
  // EVENT HANDLING
  events,
  on,
  // PULSE PROPAGATION
  evaluate,
  run: run3,
  runAsync,
  runAfter,
  _enqueue: enqueue,
  _getPulse: getPulse
};
function Transform(init2, params2) {
  Operator.call(this, init2, null, params2);
}
inherits_default(Transform, Operator, {
  /**
   * Overrides {@link Operator.evaluate} for transform operators.
   * Internally, this method calls {@link evaluate} to perform processing.
   * If {@link evaluate} returns a falsy value, the input pulse is returned.
   * This method should NOT be overridden, instead overrride {@link evaluate}.
   * @param {Pulse} pulse - the current dataflow pulse.
   * @return the output pulse for this operator (or StopPropagation)
   */
  run(pulse2) {
    if (pulse2.stamp < this.stamp) return pulse2.StopPropagation;
    let rv;
    return this.skip() ? this.skip(!1) : rv = this.evaluate(pulse2), rv = rv || pulse2, rv.then ? rv = rv.then((_) => this.pulse = _) : rv !== pulse2.StopPropagation && (this.pulse = rv), rv;
  },
  /**
   * Overrides {@link Operator.evaluate} for transform operators.
   * Marshalls parameter values and then invokes {@link transform}.
   * @param {Pulse} pulse - the current dataflow pulse.
   * @return {Pulse} The output pulse (or StopPropagation). A falsy return
       value (including undefined) will let the input pulse pass through.
  */
  evaluate(pulse2) {
    let params2 = this.marshall(pulse2.stamp), out = this.transform(params2, pulse2);
    return params2.clear(), out;
  },
  /**
   * Process incoming pulses.
   * Subclasses should override this method to implement transforms.
   * @param {Parameters} _ - The operator parameter values.
   * @param {Pulse} pulse - The current dataflow pulse.
   * @return {Pulse} The output pulse (or StopPropagation). A falsy return
   *   value (including undefined) will let the input pulse pass through.
   */
  transform() {
  }
});
var transforms = {};
function definition(type3) {
  let t = transform2(type3);
  return t && t.Definition || null;
}
function transform2(type3) {
  return type3 = type3 && type3.toLowerCase(), hasOwnProperty(transforms, type3) ? transforms[type3] : null;
}

// node_modules/vega-transforms/build/vega-transforms.js
var vega_transforms_exports = {};
__export(vega_transforms_exports, {
  aggregate: () => Aggregate,
  bin: () => Bin,
  collect: () => Collect,
  compare: () => Compare,
  countpattern: () => CountPattern,
  cross: () => Cross,
  density: () => Density,
  dotbin: () => DotBin,
  expression: () => Expression,
  extent: () => Extent,
  facet: () => Facet,
  field: () => Field,
  filter: () => Filter,
  flatten: () => Flatten,
  fold: () => Fold,
  formula: () => Formula,
  generate: () => Generate,
  impute: () => Impute,
  joinaggregate: () => JoinAggregate,
  kde: () => KDE,
  key: () => Key,
  load: () => Load,
  lookup: () => Lookup,
  multiextent: () => MultiExtent,
  multivalues: () => MultiValues,
  params: () => Params,
  pivot: () => Pivot,
  prefacet: () => PreFacet,
  project: () => Project,
  proxy: () => Proxy2,
  quantile: () => Quantile,
  relay: () => Relay,
  sample: () => Sample,
  sequence: () => Sequence,
  sieve: () => Sieve,
  subflow: () => Subflow,
  timeunit: () => TimeUnit,
  tupleindex: () => TupleIndex,
  values: () => Values,
  window: () => Window
});

// node_modules/vega-statistics/build/vega-statistics.js
function* numbers2(values3, valueof) {
  if (valueof == null)
    for (let value3 of values3)
      value3 != null && value3 !== "" && (value3 = +value3) >= value3 && (yield value3);
  else {
    let index4 = -1;
    for (let value3 of values3)
      value3 = valueof(value3, ++index4, values3), value3 != null && value3 !== "" && (value3 = +value3) >= value3 && (yield value3);
  }
}
function quantiles(array4, p, f) {
  let values3 = Float64Array.from(numbers2(array4, f));
  return values3.sort(ascending2), p.map((_) => quantileSorted(values3, _));
}
function quartiles(array4, f) {
  return quantiles(array4, [0.25, 0.5, 0.75], f);
}
function estimateBandwidth(array4, f) {
  let n = array4.length, d = deviation(array4, f), q = quartiles(array4, f), h2 = (q[2] - q[0]) / 1.34;
  return 1.06 * (Math.min(d, h2) || d || Math.abs(q[0]) || 1) * Math.pow(n, -0.2);
}
function bin2(_) {
  let maxb = _.maxbins || 20, base = _.base || 10, logb = Math.log(base), div = _.divide || [5, 2], min4 = _.extent[0], max4 = _.extent[1], step, level, minstep, v2, i, n, span = _.span || max4 - min4 || Math.abs(min4) || 1;
  if (_.step)
    step = _.step;
  else if (_.steps) {
    for (v2 = span / maxb, i = 0, n = _.steps.length; i < n && _.steps[i] < v2; ++i) ;
    step = _.steps[Math.max(0, i - 1)];
  } else {
    for (level = Math.ceil(Math.log(maxb) / logb), minstep = _.minstep || 0, step = Math.max(minstep, Math.pow(base, Math.round(Math.log(span) / logb) - level)); Math.ceil(span / step) > maxb; )
      step *= base;
    for (i = 0, n = div.length; i < n; ++i)
      v2 = step / div[i], v2 >= minstep && span / v2 <= maxb && (step = v2);
  }
  v2 = Math.log(step);
  let precision = v2 >= 0 ? 0 : ~~(-v2 / logb) + 1, eps = Math.pow(base, -precision - 1);
  return (_.nice || _.nice === void 0) && (v2 = Math.floor(min4 / step + eps) * step, min4 = min4 < v2 ? v2 - step : v2, max4 = Math.ceil(max4 / step) * step), {
    start: min4,
    stop: max4 === min4 ? min4 + step : max4,
    step
  };
}
var random = Math.random;
function bootstrapCI(array4, samples, alpha, f) {
  if (!array4.length) return [void 0, void 0];
  let values3 = Float64Array.from(numbers2(array4, f)), n = values3.length, m = samples, a, i, j2, mu;
  for (j2 = 0, mu = Array(m); j2 < m; ++j2) {
    for (a = 0, i = 0; i < n; ++i)
      a += values3[~~(random() * n)];
    mu[j2] = a / n;
  }
  return mu.sort(ascending2), [quantile(mu, alpha / 2), quantile(mu, 1 - alpha / 2)];
}
function dotbin(array4, step, smooth, f) {
  f = f || ((_) => _);
  let n = array4.length, v2 = new Float64Array(n), i = 0, j2 = 1, a = f(array4[0]), b10 = a, w2 = a + step, x5;
  for (; j2 < n; ++j2) {
    if (x5 = f(array4[j2]), x5 >= w2) {
      for (b10 = (a + b10) / 2; i < j2; ++i) v2[i] = b10;
      w2 = x5 + step, a = x5;
    }
    b10 = x5;
  }
  for (b10 = (a + b10) / 2; i < j2; ++i) v2[i] = b10;
  return smooth ? smoothing(v2, step + step / 4) : v2;
}
function smoothing(v2, thresh) {
  let n = v2.length, a = 0, b10 = 1, c, d;
  for (; v2[a] === v2[b10]; ) ++b10;
  for (; b10 < n; ) {
    for (c = b10 + 1; v2[b10] === v2[c]; ) ++c;
    if (v2[b10] - v2[b10 - 1] < thresh) {
      for (d = b10 + (a + c - b10 - b10 >> 1); d < b10; ) v2[d++] = v2[b10];
      for (; d > b10; ) v2[d--] = v2[a];
    }
    a = b10, b10 = c;
  }
  return v2;
}
var SQRT2PI = Math.sqrt(2 * Math.PI), SQRT2 = Math.SQRT2, nextSample = NaN;
function sampleNormal(mean2, stdev) {
  mean2 = mean2 || 0, stdev = stdev ?? 1;
  let x5 = 0, y5 = 0, rds, c;
  if (nextSample === nextSample)
    x5 = nextSample, nextSample = NaN;
  else {
    do
      x5 = random() * 2 - 1, y5 = random() * 2 - 1, rds = x5 * x5 + y5 * y5;
    while (rds === 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds), x5 *= c, nextSample = y5 * c;
  }
  return mean2 + x5 * stdev;
}
function densityNormal(value3, mean2, stdev) {
  stdev = stdev ?? 1;
  let z2 = (value3 - (mean2 || 0)) / stdev;
  return Math.exp(-0.5 * z2 * z2) / (stdev * SQRT2PI);
}
function cumulativeNormal(value3, mean2, stdev) {
  mean2 = mean2 || 0, stdev = stdev ?? 1;
  let z2 = (value3 - mean2) / stdev, Z = Math.abs(z2), cd2;
  if (Z > 37)
    cd2 = 0;
  else {
    let exp4 = Math.exp(-Z * Z / 2), sum3;
    Z < 7.07106781186547 ? (sum3 = 0.0352624965998911 * Z + 0.700383064443688, sum3 = sum3 * Z + 6.37396220353165, sum3 = sum3 * Z + 33.912866078383, sum3 = sum3 * Z + 112.079291497871, sum3 = sum3 * Z + 221.213596169931, sum3 = sum3 * Z + 220.206867912376, cd2 = exp4 * sum3, sum3 = 0.0883883476483184 * Z + 1.75566716318264, sum3 = sum3 * Z + 16.064177579207, sum3 = sum3 * Z + 86.7807322029461, sum3 = sum3 * Z + 296.564248779674, sum3 = sum3 * Z + 637.333633378831, sum3 = sum3 * Z + 793.826512519948, sum3 = sum3 * Z + 440.413735824752, cd2 = cd2 / sum3) : (sum3 = Z + 0.65, sum3 = Z + 4 / sum3, sum3 = Z + 3 / sum3, sum3 = Z + 2 / sum3, sum3 = Z + 1 / sum3, cd2 = exp4 / sum3 / 2.506628274631);
  }
  return z2 > 0 ? 1 - cd2 : cd2;
}
function quantileNormal(p, mean2, stdev) {
  return p < 0 || p > 1 ? NaN : (mean2 || 0) + (stdev ?? 1) * SQRT2 * erfinv(2 * p - 1);
}
function erfinv(x5) {
  let w2 = -Math.log((1 - x5) * (1 + x5)), p;
  return w2 < 6.25 ? (w2 -= 3.125, p = -364441206401782e-35, p = -16850591381820166e-35 + p * w2, p = 128584807152564e-32 + p * w2, p = 11157877678025181e-33 + p * w2, p = -1333171662854621e-31 + p * w2, p = 20972767875968562e-33 + p * w2, p = 6637638134358324e-30 + p * w2, p = -4054566272975207e-29 + p * w2, p = -8151934197605472e-29 + p * w2, p = 26335093153082323e-28 + p * w2, p = -12975133253453532e-27 + p * w2, p = -5415412054294628e-26 + p * w2, p = 10512122733215323e-25 + p * w2, p = -4112633980346984e-24 + p * w2, p = -29070369957882005e-24 + p * w2, p = 42347877827932404e-23 + p * w2, p = -13654692000834679e-22 + p * w2, p = -13882523362786469e-21 + p * w2, p = 18673420803405714e-20 + p * w2, p = -740702534166267e-18 + p * w2, p = -0.006033670871430149 + p * w2, p = 0.24015818242558962 + p * w2, p = 1.6536545626831027 + p * w2) : w2 < 16 ? (w2 = Math.sqrt(w2) - 3.25, p = 22137376921775787e-25, p = 9075656193888539e-23 + p * w2, p = -27517406297064545e-23 + p * w2, p = 18239629214389228e-24 + p * w2, p = 15027403968909828e-22 + p * w2, p = -4013867526981546e-21 + p * w2, p = 29234449089955446e-22 + p * w2, p = 12475304481671779e-21 + p * w2, p = -47318229009055734e-21 + p * w2, p = 6828485145957318e-20 + p * w2, p = 24031110387097894e-21 + p * w2, p = -3550375203628475e-19 + p * w2, p = 9532893797373805e-19 + p * w2, p = -0.0016882755560235047 + p * w2, p = 0.002491442096107851 + p * w2, p = -0.003751208507569241 + p * w2, p = 0.005370914553590064 + p * w2, p = 1.0052589676941592 + p * w2, p = 3.0838856104922208 + p * w2) : Number.isFinite(w2) ? (w2 = Math.sqrt(w2) - 5, p = -27109920616438573e-27, p = -2555641816996525e-25 + p * w2, p = 15076572693500548e-25 + p * w2, p = -3789465440126737e-24 + p * w2, p = 761570120807834e-23 + p * w2, p = -1496002662714924e-23 + p * w2, p = 2914795345090108e-23 + p * w2, p = -6771199775845234e-23 + p * w2, p = 22900482228026655e-23 + p * w2, p = -99298272942317e-20 + p * w2, p = 4526062597223154e-21 + p * w2, p = -1968177810553167e-20 + p * w2, p = 7599527703001776e-20 + p * w2, p = -21503011930044477e-20 + p * w2, p = -13871931833623122e-20 + p * w2, p = 1.0103004648645344 + p * w2, p = 4.849906401408584 + p * w2) : p = 1 / 0, p * x5;
}
function gaussian(mean2, stdev) {
  let mu, sigma, dist2 = {
    mean(_) {
      return arguments.length ? (mu = _ || 0, dist2) : mu;
    },
    stdev(_) {
      return arguments.length ? (sigma = _ ?? 1, dist2) : sigma;
    },
    sample: () => sampleNormal(mu, sigma),
    pdf: (value3) => densityNormal(value3, mu, sigma),
    cdf: (value3) => cumulativeNormal(value3, mu, sigma),
    icdf: (p) => quantileNormal(p, mu, sigma)
  };
  return dist2.mean(mean2).stdev(stdev);
}
function kde(support, bandwidth2) {
  let kernel = gaussian(), n = 0, dist2 = {
    data(_) {
      return arguments.length ? (support = _, n = _ ? _.length : 0, dist2.bandwidth(bandwidth2)) : support;
    },
    bandwidth(_) {
      return arguments.length ? (bandwidth2 = _, !bandwidth2 && support && (bandwidth2 = estimateBandwidth(support)), dist2) : bandwidth2;
    },
    sample() {
      return support[~~(random() * n)] + bandwidth2 * kernel.sample();
    },
    pdf(x5) {
      let y5 = 0, i = 0;
      for (; i < n; ++i)
        y5 += kernel.pdf((x5 - support[i]) / bandwidth2);
      return y5 / bandwidth2 / n;
    },
    cdf(x5) {
      let y5 = 0, i = 0;
      for (; i < n; ++i)
        y5 += kernel.cdf((x5 - support[i]) / bandwidth2);
      return y5 / n;
    },
    icdf() {
      throw Error("KDE icdf not supported.");
    }
  };
  return dist2.data(support);
}
function sampleLogNormal(mean2, stdev) {
  return mean2 = mean2 || 0, stdev = stdev ?? 1, Math.exp(mean2 + sampleNormal() * stdev);
}
function densityLogNormal(value3, mean2, stdev) {
  if (value3 <= 0) return 0;
  mean2 = mean2 || 0, stdev = stdev ?? 1;
  let z2 = (Math.log(value3) - mean2) / stdev;
  return Math.exp(-0.5 * z2 * z2) / (stdev * SQRT2PI * value3);
}
function cumulativeLogNormal(value3, mean2, stdev) {
  return cumulativeNormal(Math.log(value3), mean2, stdev);
}
function quantileLogNormal(p, mean2, stdev) {
  return Math.exp(quantileNormal(p, mean2, stdev));
}
function lognormal(mean2, stdev) {
  let mu, sigma, dist2 = {
    mean(_) {
      return arguments.length ? (mu = _ || 0, dist2) : mu;
    },
    stdev(_) {
      return arguments.length ? (sigma = _ ?? 1, dist2) : sigma;
    },
    sample: () => sampleLogNormal(mu, sigma),
    pdf: (value3) => densityLogNormal(value3, mu, sigma),
    cdf: (value3) => cumulativeLogNormal(value3, mu, sigma),
    icdf: (p) => quantileLogNormal(p, mu, sigma)
  };
  return dist2.mean(mean2).stdev(stdev);
}
function mixture(dists, weights) {
  let m = 0, w2;
  function normalize5(x5) {
    let w3 = [], sum3 = 0, i;
    for (i = 0; i < m; ++i)
      sum3 += w3[i] = x5[i] == null ? 1 : +x5[i];
    for (i = 0; i < m; ++i)
      w3[i] /= sum3;
    return w3;
  }
  let dist2 = {
    weights(_) {
      return arguments.length ? (w2 = normalize5(weights = _ || []), dist2) : weights;
    },
    distributions(_) {
      return arguments.length ? (_ ? (m = _.length, dists = _) : (m = 0, dists = []), dist2.weights(weights)) : dists;
    },
    sample() {
      let r = random(), d = dists[m - 1], v2 = w2[0], i = 0;
      for (; i < m - 1; v2 += w2[++i])
        if (r < v2) {
          d = dists[i];
          break;
        }
      return d.sample();
    },
    pdf(x5) {
      let p = 0, i = 0;
      for (; i < m; ++i)
        p += w2[i] * dists[i].pdf(x5);
      return p;
    },
    cdf(x5) {
      let p = 0, i = 0;
      for (; i < m; ++i)
        p += w2[i] * dists[i].cdf(x5);
      return p;
    },
    icdf() {
      throw Error("Mixture icdf not supported.");
    }
  };
  return dist2.distributions(dists).weights(weights);
}
function sampleUniform(min4, max4) {
  return max4 == null && (max4 = min4 ?? 1, min4 = 0), min4 + (max4 - min4) * random();
}
function densityUniform(value3, min4, max4) {
  return max4 == null && (max4 = min4 ?? 1, min4 = 0), value3 >= min4 && value3 <= max4 ? 1 / (max4 - min4) : 0;
}
function cumulativeUniform(value3, min4, max4) {
  return max4 == null && (max4 = min4 ?? 1, min4 = 0), value3 < min4 ? 0 : value3 > max4 ? 1 : (value3 - min4) / (max4 - min4);
}
function quantileUniform(p, min4, max4) {
  return max4 == null && (max4 = min4 ?? 1, min4 = 0), p >= 0 && p <= 1 ? min4 + p * (max4 - min4) : NaN;
}
function uniform(min4, max4) {
  let a, b10, dist2 = {
    min(_) {
      return arguments.length ? (a = _ || 0, dist2) : a;
    },
    max(_) {
      return arguments.length ? (b10 = _ ?? 1, dist2) : b10;
    },
    sample: () => sampleUniform(a, b10),
    pdf: (value3) => densityUniform(value3, a, b10),
    cdf: (value3) => cumulativeUniform(value3, a, b10),
    icdf: (p) => quantileUniform(p, a, b10)
  };
  return max4 == null && (max4 = min4 ?? 1, min4 = 0), dist2.min(min4).max(max4);
}
function constant(data3, x5, y5) {
  let mean2 = 0, n = 0;
  for (let d of data3) {
    let val = y5(d);
    x5(d) == null || val == null || isNaN(val) || (mean2 += (val - mean2) / ++n);
  }
  return {
    coef: [mean2],
    predict: () => mean2,
    rSquared: 0
  };
}
function ols(uX, uY, uXY, uX2) {
  let delta = uX2 - uX * uX, slope = Math.abs(delta) < 1e-24 ? 0 : (uXY - uX * uY) / delta;
  return [uY - slope * uX, slope];
}
function points(data3, x5, y5, sort3) {
  data3 = data3.filter((d2) => {
    let u4 = x5(d2), v2 = y5(d2);
    return u4 != null && (u4 = +u4) >= u4 && v2 != null && (v2 = +v2) >= v2;
  }), sort3 && data3.sort((a, b10) => x5(a) - x5(b10));
  let n = data3.length, X4 = new Float64Array(n), Y4 = new Float64Array(n), i = 0, ux = 0, uy = 0, xv, yv, d;
  for (d of data3)
    X4[i] = xv = +x5(d), Y4[i] = yv = +y5(d), ++i, ux += (xv - ux) / i, uy += (yv - uy) / i;
  for (i = 0; i < n; ++i)
    X4[i] -= ux, Y4[i] -= uy;
  return [X4, Y4, ux, uy];
}
function visitPoints(data3, x5, y5, callback) {
  let i = -1, u4, v2;
  for (let d of data3)
    u4 = x5(d), v2 = y5(d), u4 != null && (u4 = +u4) >= u4 && v2 != null && (v2 = +v2) >= v2 && callback(u4, v2, ++i);
}
function rSquared(data3, x5, y5, uY, predict) {
  let SSE = 0, SST = 0;
  return visitPoints(data3, x5, y5, (dx, dy) => {
    let sse = dy - predict(dx), sst = dy - uY;
    SSE += sse * sse, SST += sst * sst;
  }), 1 - SSE / SST;
}
function linear(data3, x5, y5) {
  let X4 = 0, Y4 = 0, XY = 0, X24 = 0, n = 0;
  visitPoints(data3, x5, y5, (dx, dy) => {
    ++n, X4 += (dx - X4) / n, Y4 += (dy - Y4) / n, XY += (dx * dy - XY) / n, X24 += (dx * dx - X24) / n;
  });
  let coef = ols(X4, Y4, XY, X24), predict = (x6) => coef[0] + coef[1] * x6;
  return {
    coef,
    predict,
    rSquared: rSquared(data3, x5, y5, Y4, predict)
  };
}
function log3(data3, x5, y5) {
  let X4 = 0, Y4 = 0, XY = 0, X24 = 0, n = 0;
  visitPoints(data3, x5, y5, (dx, dy) => {
    ++n, dx = Math.log(dx), X4 += (dx - X4) / n, Y4 += (dy - Y4) / n, XY += (dx * dy - XY) / n, X24 += (dx * dx - X24) / n;
  });
  let coef = ols(X4, Y4, XY, X24), predict = (x6) => coef[0] + coef[1] * Math.log(x6);
  return {
    coef,
    predict,
    rSquared: rSquared(data3, x5, y5, Y4, predict)
  };
}
function exp2(data3, x5, y5) {
  let [xv, yv, ux, uy] = points(data3, x5, y5), YL = 0, XY = 0, XYL = 0, X2Y = 0, n = 0, dx, ly2, xy;
  visitPoints(data3, x5, y5, (_, dy) => {
    dx = xv[n++], ly2 = Math.log(dy), xy = dx * dy, YL += (dy * ly2 - YL) / n, XY += (xy - XY) / n, XYL += (xy * ly2 - XYL) / n, X2Y += (dx * xy - X2Y) / n;
  });
  let [c0, c1] = ols(XY / uy, YL / uy, XYL / uy, X2Y / uy), predict = (x6) => Math.exp(c0 + c1 * (x6 - ux));
  return {
    coef: [Math.exp(c0 - c1 * ux), c1],
    predict,
    rSquared: rSquared(data3, x5, y5, uy, predict)
  };
}
function pow2(data3, x5, y5) {
  let X4 = 0, Y4 = 0, XY = 0, X24 = 0, YS = 0, n = 0;
  visitPoints(data3, x5, y5, (dx, dy) => {
    let lx2 = Math.log(dx), ly2 = Math.log(dy);
    ++n, X4 += (lx2 - X4) / n, Y4 += (ly2 - Y4) / n, XY += (lx2 * ly2 - XY) / n, X24 += (lx2 * lx2 - X24) / n, YS += (dy - YS) / n;
  });
  let coef = ols(X4, Y4, XY, X24), predict = (x6) => coef[0] * Math.pow(x6, coef[1]);
  return coef[0] = Math.exp(coef[0]), {
    coef,
    predict,
    rSquared: rSquared(data3, x5, y5, YS, predict)
  };
}
function quad(data3, x5, y5) {
  let [xv, yv, ux, uy] = points(data3, x5, y5), n = xv.length, X24 = 0, X32 = 0, X4 = 0, XY = 0, X2Y = 0, i, dx, dy, x22;
  for (i = 0; i < n; )
    dx = xv[i], dy = yv[i++], x22 = dx * dx, X24 += (x22 - X24) / i, X32 += (x22 * dx - X32) / i, X4 += (x22 * x22 - X4) / i, XY += (dx * dy - XY) / i, X2Y += (x22 * dy - X2Y) / i;
  let X2X2 = X4 - X24 * X24, d = X24 * X2X2 - X32 * X32, a = (X2Y * X24 - XY * X32) / d, b10 = (XY * X2X2 - X2Y * X32) / d, c = -a * X24, predict = (x6) => (x6 = x6 - ux, a * x6 * x6 + b10 * x6 + c + uy);
  return {
    coef: [c - b10 * ux + a * ux * ux + uy, b10 - 2 * a * ux, a],
    predict,
    rSquared: rSquared(data3, x5, y5, uy, predict)
  };
}
function poly(data3, x5, y5, order) {
  if (order === 0) return constant(data3, x5, y5);
  if (order === 1) return linear(data3, x5, y5);
  if (order === 2) return quad(data3, x5, y5);
  let [xv, yv, ux, uy] = points(data3, x5, y5), n = xv.length, lhs = [], rhs = [], k = order + 1, i, j2, l, v2, c;
  for (i = 0; i < k; ++i) {
    for (l = 0, v2 = 0; l < n; ++l)
      v2 += Math.pow(xv[l], i) * yv[l];
    for (lhs.push(v2), c = new Float64Array(k), j2 = 0; j2 < k; ++j2) {
      for (l = 0, v2 = 0; l < n; ++l)
        v2 += Math.pow(xv[l], i + j2);
      c[j2] = v2;
    }
    rhs.push(c);
  }
  rhs.push(lhs);
  let coef = gaussianElimination(rhs), predict = (x6) => {
    x6 -= ux;
    let y6 = uy + coef[0] + coef[1] * x6 + coef[2] * x6 * x6;
    for (i = 3; i < k; ++i) y6 += coef[i] * Math.pow(x6, i);
    return y6;
  };
  return {
    coef: uncenter(k, coef, -ux, uy),
    predict,
    rSquared: rSquared(data3, x5, y5, uy, predict)
  };
}
function uncenter(k, a, x5, y5) {
  let z2 = Array(k), i, j2, v2, c;
  for (i = 0; i < k; ++i) z2[i] = 0;
  for (i = k - 1; i >= 0; --i)
    for (v2 = a[i], c = 1, z2[i] += v2, j2 = 1; j2 <= i; ++j2)
      c *= (i + 1 - j2) / j2, z2[i - j2] += v2 * Math.pow(x5, j2) * c;
  return z2[0] += y5, z2;
}
function gaussianElimination(matrix) {
  let n = matrix.length - 1, coef = [], i, j2, k, r, t;
  for (i = 0; i < n; ++i) {
    for (r = i, j2 = i + 1; j2 < n; ++j2)
      Math.abs(matrix[i][j2]) > Math.abs(matrix[i][r]) && (r = j2);
    for (k = i; k < n + 1; ++k)
      t = matrix[k][i], matrix[k][i] = matrix[k][r], matrix[k][r] = t;
    for (j2 = i + 1; j2 < n; ++j2)
      for (k = n; k >= i; k--)
        matrix[k][j2] -= matrix[k][i] * matrix[i][j2] / matrix[i][i];
  }
  for (j2 = n - 1; j2 >= 0; --j2) {
    for (t = 0, k = j2 + 1; k < n; ++k)
      t += matrix[k][j2] * coef[k];
    coef[j2] = (matrix[n][j2] - t) / matrix[j2][j2];
  }
  return coef;
}
var maxiters = 2, epsilon = 1e-12;
function loess(data3, x5, y5, bandwidth2) {
  let [xv, yv, ux, uy] = points(data3, x5, y5, !0), n = xv.length, bw = Math.max(2, ~~(bandwidth2 * n)), yhat = new Float64Array(n), residuals = new Float64Array(n), robustWeights = new Float64Array(n).fill(1);
  for (let iter = -1; ++iter <= maxiters; ) {
    let interval3 = [0, bw - 1];
    for (let i = 0; i < n; ++i) {
      let dx = xv[i], i0 = interval3[0], i1 = interval3[1], edge = dx - xv[i0] > xv[i1] - dx ? i0 : i1, W2 = 0, X4 = 0, Y4 = 0, XY = 0, X24 = 0, denom = 1 / Math.abs(xv[edge] - dx || 1);
      for (let k = i0; k <= i1; ++k) {
        let xk = xv[k], yk = yv[k], w2 = tricube(Math.abs(dx - xk) * denom) * robustWeights[k], xkw = xk * w2;
        W2 += w2, X4 += xkw, Y4 += yk * w2, XY += yk * xkw, X24 += xk * xkw;
      }
      let [a, b10] = ols(X4 / W2, Y4 / W2, XY / W2, X24 / W2);
      yhat[i] = a + b10 * dx, residuals[i] = Math.abs(yv[i] - yhat[i]), updateInterval(xv, i + 1, interval3);
    }
    if (iter === maxiters)
      break;
    let medianResidual = median(residuals);
    if (Math.abs(medianResidual) < epsilon) break;
    for (let i = 0, arg, w2; i < n; ++i)
      arg = residuals[i] / (6 * medianResidual), robustWeights[i] = arg >= 1 ? epsilon : (w2 = 1 - arg * arg) * w2;
  }
  return output2(xv, yhat, ux, uy);
}
function tricube(x5) {
  return (x5 = 1 - x5 * x5 * x5) * x5 * x5;
}
function updateInterval(xv, i, interval3) {
  let val = xv[i], left = interval3[0], right = interval3[1] + 1;
  if (!(right >= xv.length))
    for (; i > left && xv[right] - val <= val - xv[left]; )
      interval3[0] = ++left, interval3[1] = right, ++right;
}
function output2(xv, yhat, ux, uy) {
  let n = xv.length, out = [], i = 0, cnt = 0, prev = [], v2;
  for (; i < n; ++i)
    v2 = xv[i] + ux, prev[0] === v2 ? prev[1] += (yhat[i] - prev[1]) / ++cnt : (cnt = 0, prev[1] += uy, prev = [v2, yhat[i]], out.push(prev));
  return prev[1] += uy, out;
}
var MIN_RADIANS = 0.5 * Math.PI / 180;
function sampleCurve(f, extent2, minSteps, maxSteps) {
  minSteps = minSteps || 25, maxSteps = Math.max(minSteps, maxSteps || 200);
  let point8 = (x5) => [x5, f(x5)], minX = extent2[0], maxX = extent2[1], span = maxX - minX, stop2 = span / maxSteps, prev = [point8(minX)], next = [];
  if (minSteps === maxSteps) {
    for (let i = 1; i < maxSteps; ++i)
      prev.push(point8(minX + i / minSteps * span));
    return prev.push(point8(maxX)), prev;
  } else {
    next.push(point8(maxX));
    for (let i = minSteps; --i > 0; )
      next.push(point8(minX + i / minSteps * span));
  }
  let p02 = prev[0], p1 = next[next.length - 1], sx = 1 / span, sy = scaleY(p02[1], next);
  for (; p1; ) {
    let pm = point8((p02[0] + p1[0]) / 2);
    pm[0] - p02[0] >= stop2 && angleDelta(p02, pm, p1, sx, sy) > MIN_RADIANS ? next.push(pm) : (p02 = p1, prev.push(p1), next.pop()), p1 = next[next.length - 1];
  }
  return prev;
}
function scaleY(init2, points2) {
  let ymin = init2, ymax = init2, n = points2.length;
  for (let i = 0; i < n; ++i) {
    let y5 = points2[i][1];
    y5 < ymin && (ymin = y5), y5 > ymax && (ymax = y5);
  }
  return 1 / (ymax - ymin);
}
function angleDelta(p, q, r, sx, sy) {
  let a0 = Math.atan2(sy * (r[1] - p[1]), sx * (r[0] - p[0])), a1 = Math.atan2(sy * (q[1] - p[1]), sx * (q[0] - p[0]));
  return Math.abs(a0 - a1);
}

// node_modules/vega-transforms/build/vega-transforms.js
function multikey(f) {
  return (x5) => {
    let n = f.length, i = 1, k = String(f[0](x5));
    for (; i < n; ++i)
      k += "|" + f[i](x5);
    return k;
  };
}
function groupkey(fields) {
  return !fields || !fields.length ? function() {
    return "";
  } : fields.length === 1 ? fields[0] : multikey(fields);
}
function measureName(op, field3, as) {
  return as || op + (field3 ? "_" + field3 : "");
}
var noop = () => {
}, base_op = {
  init: noop,
  add: noop,
  rem: noop,
  idx: 0
}, AggregateOps = {
  values: {
    init: (m) => m.cell.store = !0,
    value: (m) => m.cell.data.values(),
    idx: -1
  },
  count: {
    value: (m) => m.cell.num
  },
  __count__: {
    value: (m) => m.missing + m.valid
  },
  missing: {
    value: (m) => m.missing
  },
  valid: {
    value: (m) => m.valid
  },
  sum: {
    init: (m) => m.sum = 0,
    value: (m) => m.valid ? m.sum : void 0,
    add: (m, v2) => m.sum += +v2,
    rem: (m, v2) => m.sum -= v2
  },
  product: {
    init: (m) => m.product = 1,
    value: (m) => m.valid ? m.product : void 0,
    add: (m, v2) => m.product *= v2,
    rem: (m, v2) => m.product /= v2
  },
  mean: {
    init: (m) => m.mean = 0,
    value: (m) => m.valid ? m.mean : void 0,
    add: (m, v2) => (m.mean_d = v2 - m.mean, m.mean += m.mean_d / m.valid),
    rem: (m, v2) => (m.mean_d = v2 - m.mean, m.mean -= m.valid ? m.mean_d / m.valid : m.mean)
  },
  average: {
    value: (m) => m.valid ? m.mean : void 0,
    req: ["mean"],
    idx: 1
  },
  variance: {
    init: (m) => m.dev = 0,
    value: (m) => m.valid > 1 ? Math.max(0, m.dev) / (m.valid - 1) : void 0,
    add: (m, v2) => m.dev += m.mean_d * (v2 - m.mean),
    rem: (m, v2) => m.dev -= m.mean_d * (v2 - m.mean),
    req: ["mean"],
    idx: 1
  },
  variancep: {
    value: (m) => m.valid ? Math.max(0, m.dev) / m.valid : void 0,
    req: ["variance"],
    idx: 2
  },
  stdev: {
    value: (m) => m.valid > 1 ? Math.sqrt(Math.max(0, m.dev) / (m.valid - 1)) : void 0,
    req: ["variance"],
    idx: 2
  },
  stdevp: {
    value: (m) => m.valid ? Math.sqrt(Math.max(0, m.dev) / m.valid) : void 0,
    req: ["variance"],
    idx: 2
  },
  stderr: {
    value: (m) => m.valid > 1 ? Math.sqrt(Math.max(0, m.dev) / (m.valid * (m.valid - 1))) : void 0,
    req: ["variance"],
    idx: 2
  },
  distinct: {
    value: (m) => m.cell.data.distinct(m.get),
    req: ["values"],
    idx: 3
  },
  ci0: {
    value: (m) => m.cell.data.ci0(m.get),
    req: ["values"],
    idx: 3
  },
  ci1: {
    value: (m) => m.cell.data.ci1(m.get),
    req: ["values"],
    idx: 3
  },
  median: {
    value: (m) => m.cell.data.q2(m.get),
    req: ["values"],
    idx: 3
  },
  q1: {
    value: (m) => m.cell.data.q1(m.get),
    req: ["values"],
    idx: 3
  },
  q3: {
    value: (m) => m.cell.data.q3(m.get),
    req: ["values"],
    idx: 3
  },
  min: {
    init: (m) => m.min = void 0,
    value: (m) => m.min = Number.isNaN(m.min) ? m.cell.data.min(m.get) : m.min,
    add: (m, v2) => {
      (v2 < m.min || m.min === void 0) && (m.min = v2);
    },
    rem: (m, v2) => {
      v2 <= m.min && (m.min = NaN);
    },
    req: ["values"],
    idx: 4
  },
  max: {
    init: (m) => m.max = void 0,
    value: (m) => m.max = Number.isNaN(m.max) ? m.cell.data.max(m.get) : m.max,
    add: (m, v2) => {
      (v2 > m.max || m.max === void 0) && (m.max = v2);
    },
    rem: (m, v2) => {
      v2 >= m.max && (m.max = NaN);
    },
    req: ["values"],
    idx: 4
  },
  argmin: {
    init: (m) => m.argmin = void 0,
    value: (m) => m.argmin || m.cell.data.argmin(m.get),
    add: (m, v2, t) => {
      v2 < m.min && (m.argmin = t);
    },
    rem: (m, v2) => {
      v2 <= m.min && (m.argmin = void 0);
    },
    req: ["min", "values"],
    idx: 3
  },
  argmax: {
    init: (m) => m.argmax = void 0,
    value: (m) => m.argmax || m.cell.data.argmax(m.get),
    add: (m, v2, t) => {
      v2 > m.max && (m.argmax = t);
    },
    rem: (m, v2) => {
      v2 >= m.max && (m.argmax = void 0);
    },
    req: ["max", "values"],
    idx: 3
  },
  exponential: {
    init: (m, r) => {
      m.exp = 0, m.exp_r = r;
    },
    value: (m) => m.valid ? m.exp * (1 - m.exp_r) / (1 - m.exp_r ** m.valid) : void 0,
    add: (m, v2) => m.exp = m.exp_r * m.exp + v2,
    rem: (m, v2) => m.exp = (m.exp - v2 / m.exp_r ** (m.valid - 1)) / m.exp_r
  },
  exponentialb: {
    value: (m) => m.valid ? m.exp * (1 - m.exp_r) : void 0,
    req: ["exponential"],
    idx: 1
  }
}, ValidAggregateOps = Object.keys(AggregateOps).filter((d) => d !== "__count__");
function measure(key2, value3) {
  return (out, aggregate_param) => extend2({
    name: key2,
    aggregate_param,
    out: out || key2
  }, base_op, value3);
}
[...ValidAggregateOps, "__count__"].forEach((key2) => {
  AggregateOps[key2] = measure(key2, AggregateOps[key2]);
});
function createMeasure(op, param2, name2) {
  return AggregateOps[op](name2, param2);
}
function compareIndex(a, b10) {
  return a.idx - b10.idx;
}
function resolve5(agg) {
  let map4 = {};
  agg.forEach((a) => map4[a.name] = a);
  let getreqs = (a) => {
    a.req && a.req.forEach((key2) => {
      map4[key2] || getreqs(map4[key2] = AggregateOps[key2]());
    });
  };
  return agg.forEach(getreqs), Object.values(map4).sort(compareIndex);
}
function init() {
  this.valid = 0, this.missing = 0, this._ops.forEach((op) => op.aggregate_param == null ? op.init(this) : op.init(this, op.aggregate_param));
}
function add2(v2, t) {
  if (v2 == null || v2 === "") {
    ++this.missing;
    return;
  }
  v2 === v2 && (++this.valid, this._ops.forEach((op) => op.add(this, v2, t)));
}
function rem(v2, t) {
  if (v2 == null || v2 === "") {
    --this.missing;
    return;
  }
  v2 === v2 && (--this.valid, this._ops.forEach((op) => op.rem(this, v2, t)));
}
function set3(t) {
  return this._out.forEach((op) => t[op.out] = op.value(this)), t;
}
function compileMeasures(agg, field3) {
  let get6 = field3 || identity6, ops2 = resolve5(agg), out = agg.slice().sort(compareIndex);
  function ctr(cell2) {
    this._ops = ops2, this._out = out, this.cell = cell2, this.init();
  }
  return ctr.prototype.init = init, ctr.prototype.add = add2, ctr.prototype.rem = rem, ctr.prototype.set = set3, ctr.prototype.get = get6, ctr.fields = agg.map((op) => op.out), ctr;
}
function TupleStore(key2) {
  this._key = key2 ? field(key2) : tupleid, this.reset();
}
var prototype$1 = TupleStore.prototype;
prototype$1.reset = function() {
  this._add = [], this._rem = [], this._ext = null, this._get = null, this._q = null;
};
prototype$1.add = function(v2) {
  this._add.push(v2);
};
prototype$1.rem = function(v2) {
  this._rem.push(v2);
};
prototype$1.values = function() {
  if (this._get = null, this._rem.length === 0) return this._add;
  let a = this._add, r = this._rem, k = this._key, n = a.length, m = r.length, x5 = Array(n - m), map4 = {}, i, j2, v2;
  for (i = 0; i < m; ++i)
    map4[k(r[i])] = 1;
  for (i = 0, j2 = 0; i < n; ++i)
    map4[k(v2 = a[i])] ? map4[k(v2)] = 0 : x5[j2++] = v2;
  return this._rem = [], this._add = x5;
};
prototype$1.distinct = function(get6) {
  let v2 = this.values(), map4 = {}, n = v2.length, count4 = 0, s;
  for (; --n >= 0; )
    s = get6(v2[n]) + "", hasOwnProperty(map4, s) || (map4[s] = 1, ++count4);
  return count4;
};
prototype$1.extent = function(get6) {
  if (this._get !== get6 || !this._ext) {
    let v2 = this.values(), i = extentIndex(v2, get6);
    this._ext = [v2[i[0]], v2[i[1]]], this._get = get6;
  }
  return this._ext;
};
prototype$1.argmin = function(get6) {
  return this.extent(get6)[0] || {};
};
prototype$1.argmax = function(get6) {
  return this.extent(get6)[1] || {};
};
prototype$1.min = function(get6) {
  let m = this.extent(get6)[0];
  return m != null ? get6(m) : void 0;
};
prototype$1.max = function(get6) {
  let m = this.extent(get6)[1];
  return m != null ? get6(m) : void 0;
};
prototype$1.quartile = function(get6) {
  return (this._get !== get6 || !this._q) && (this._q = quartiles(this.values(), get6), this._get = get6), this._q;
};
prototype$1.q1 = function(get6) {
  return this.quartile(get6)[0];
};
prototype$1.q2 = function(get6) {
  return this.quartile(get6)[1];
};
prototype$1.q3 = function(get6) {
  return this.quartile(get6)[2];
};
prototype$1.ci = function(get6) {
  return (this._get !== get6 || !this._ci) && (this._ci = bootstrapCI(this.values(), 1e3, 0.05, get6), this._get = get6), this._ci;
};
prototype$1.ci0 = function(get6) {
  return this.ci(get6)[0];
};
prototype$1.ci1 = function(get6) {
  return this.ci(get6)[1];
};
function Aggregate(params2) {
  Transform.call(this, null, params2), this._adds = [], this._mods = [], this._alen = 0, this._mlen = 0, this._drop = !0, this._cross = !1, this._dims = [], this._dnames = [], this._measures = [], this._countOnly = !1, this._counts = null, this._prev = null, this._inputs = null, this._outputs = null;
}
Aggregate.Definition = {
  type: "Aggregate",
  metadata: {
    generates: !0,
    changes: !0
  },
  params: [{
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "ops",
    type: "enum",
    array: !0,
    values: ValidAggregateOps
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
    name: "drop",
    type: "boolean",
    default: !0
  }, {
    name: "cross",
    type: "boolean",
    default: !1
  }, {
    name: "key",
    type: "field"
  }]
};
inherits_default(Aggregate, Transform, {
  transform(_, pulse2) {
    let aggr = this, out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), mod = _.modified();
    return aggr.stamp = out.stamp, aggr.value && (mod || pulse2.modified(aggr._inputs, !0)) ? (aggr._prev = aggr.value, aggr.value = mod ? aggr.init(_) : /* @__PURE__ */ Object.create(null), pulse2.visit(pulse2.SOURCE, (t) => aggr.add(t))) : (aggr.value = aggr.value || aggr.init(_), pulse2.visit(pulse2.REM, (t) => aggr.rem(t)), pulse2.visit(pulse2.ADD, (t) => aggr.add(t))), out.modifies(aggr._outputs), aggr._drop = _.drop !== !1, _.cross && aggr._dims.length > 1 && (aggr._drop = !1, aggr.cross()), pulse2.clean() && aggr._drop && out.clean(!0).runAfter(() => this.clean()), aggr.changes(out);
  },
  cross() {
    let aggr = this, curr = aggr.value, dims = aggr._dnames, vals2 = dims.map(() => ({})), n = dims.length;
    function collect2(cells) {
      let key2, i, t, v2;
      for (key2 in cells)
        for (t = cells[key2].tuple, i = 0; i < n; ++i)
          vals2[i][v2 = t[dims[i]]] = v2;
    }
    collect2(aggr._prev), collect2(curr);
    function generate2(base, tuple2, index4) {
      let name2 = dims[index4], v2 = vals2[index4++];
      for (let k in v2) {
        let key2 = base ? base + "|" + k : k;
        tuple2[name2] = v2[k], index4 < n ? generate2(key2, tuple2, index4) : curr[key2] || aggr.cell(key2, tuple2);
      }
    }
    generate2("", {}, 0);
  },
  init(_) {
    let inputs = this._inputs = [], outputs = this._outputs = [], inputMap = {};
    function inputVisit(get6) {
      let fields2 = array_default(accessorFields(get6)), n2 = fields2.length, i2 = 0, f;
      for (; i2 < n2; ++i2)
        inputMap[f = fields2[i2]] || (inputMap[f] = 1, inputs.push(f));
    }
    this._dims = array_default(_.groupby), this._dnames = this._dims.map((d) => {
      let dname = accessorName(d);
      return inputVisit(d), outputs.push(dname), dname;
    }), this.cellkey = _.key ? _.key : groupkey(this._dims), this._countOnly = !0, this._counts = [], this._measures = [];
    let fields = _.fields || [null], ops2 = _.ops || ["count"], aggregate_params = _.aggregate_params || [null], as = _.as || [], n = fields.length, map4 = {}, field3, op, aggregate_param, m, mname, outname, i;
    for (n !== ops2.length && error62("Unmatched number of fields and aggregate ops."), i = 0; i < n; ++i) {
      if (field3 = fields[i], op = ops2[i], aggregate_param = aggregate_params[i] || null, field3 == null && op !== "count" && error62("Null aggregate field specified."), mname = accessorName(field3), outname = measureName(op, mname, as[i]), outputs.push(outname), op === "count") {
        this._counts.push(outname);
        continue;
      }
      m = map4[mname], m || (inputVisit(field3), m = map4[mname] = [], m.field = field3, this._measures.push(m)), op !== "count" && (this._countOnly = !1), m.push(createMeasure(op, aggregate_param, outname));
    }
    return this._measures = this._measures.map((m2) => compileMeasures(m2, m2.field)), /* @__PURE__ */ Object.create(null);
  },
  // -- Cell Management -----
  cellkey: groupkey(),
  cell(key2, t) {
    let cell2 = this.value[key2];
    return cell2 ? cell2.num === 0 && this._drop && cell2.stamp < this.stamp ? (cell2.stamp = this.stamp, this._adds[this._alen++] = cell2) : cell2.stamp < this.stamp && (cell2.stamp = this.stamp, this._mods[this._mlen++] = cell2) : (cell2 = this.value[key2] = this.newcell(key2, t), this._adds[this._alen++] = cell2), cell2;
  },
  newcell(key2, t) {
    let cell2 = {
      key: key2,
      num: 0,
      agg: null,
      tuple: this.newtuple(t, this._prev && this._prev[key2]),
      stamp: this.stamp,
      store: !1
    };
    if (!this._countOnly) {
      let measures = this._measures, n = measures.length;
      cell2.agg = Array(n);
      for (let i = 0; i < n; ++i)
        cell2.agg[i] = new measures[i](cell2);
    }
    return cell2.store && (cell2.data = new TupleStore()), cell2;
  },
  newtuple(t, p) {
    let names = this._dnames, dims = this._dims, n = dims.length, x5 = {};
    for (let i = 0; i < n; ++i)
      x5[names[i]] = dims[i](t);
    return p ? replace(p.tuple, x5) : ingest$1(x5);
  },
  clean() {
    let cells = this.value;
    for (let key2 in cells)
      cells[key2].num === 0 && delete cells[key2];
  },
  // -- Process Tuples -----
  add(t) {
    let key2 = this.cellkey(t), cell2 = this.cell(key2, t);
    if (cell2.num += 1, this._countOnly) return;
    cell2.store && cell2.data.add(t);
    let agg = cell2.agg;
    for (let i = 0, n = agg.length; i < n; ++i)
      agg[i].add(agg[i].get(t), t);
  },
  rem(t) {
    let key2 = this.cellkey(t), cell2 = this.cell(key2, t);
    if (cell2.num -= 1, this._countOnly) return;
    cell2.store && cell2.data.rem(t);
    let agg = cell2.agg;
    for (let i = 0, n = agg.length; i < n; ++i)
      agg[i].rem(agg[i].get(t), t);
  },
  celltuple(cell2) {
    let tuple2 = cell2.tuple, counts = this._counts;
    cell2.store && cell2.data.values();
    for (let i = 0, n = counts.length; i < n; ++i)
      tuple2[counts[i]] = cell2.num;
    if (!this._countOnly) {
      let agg = cell2.agg;
      for (let i = 0, n = agg.length; i < n; ++i)
        agg[i].set(tuple2);
    }
    return tuple2;
  },
  changes(out) {
    let adds = this._adds, mods = this._mods, prev = this._prev, drop = this._drop, add6 = out.add, rem2 = out.rem, mod = out.mod, cell2, key2, i, n;
    if (prev) for (key2 in prev)
      cell2 = prev[key2], (!drop || cell2.num) && rem2.push(cell2.tuple);
    for (i = 0, n = this._alen; i < n; ++i)
      add6.push(this.celltuple(adds[i])), adds[i] = null;
    for (i = 0, n = this._mlen; i < n; ++i)
      cell2 = mods[i], (cell2.num === 0 && drop ? rem2 : mod).push(this.celltuple(cell2)), mods[i] = null;
    return this._alen = this._mlen = 0, this._prev = null, out;
  }
});
var EPSILON$1 = 1e-14;
function Bin(params2) {
  Transform.call(this, null, params2);
}
Bin.Definition = {
  type: "Bin",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "interval",
    type: "boolean",
    default: !0
  }, {
    name: "anchor",
    type: "number"
  }, {
    name: "maxbins",
    type: "number",
    default: 20
  }, {
    name: "base",
    type: "number",
    default: 10
  }, {
    name: "divide",
    type: "number",
    array: !0,
    default: [5, 2]
  }, {
    name: "extent",
    type: "number",
    array: !0,
    length: 2,
    required: !0
  }, {
    name: "span",
    type: "number"
  }, {
    name: "step",
    type: "number"
  }, {
    name: "steps",
    type: "number",
    array: !0
  }, {
    name: "minstep",
    type: "number",
    default: 0
  }, {
    name: "nice",
    type: "boolean",
    default: !0
  }, {
    name: "name",
    type: "string"
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: ["bin0", "bin1"]
  }]
};
inherits_default(Bin, Transform, {
  transform(_, pulse2) {
    let band2 = _.interval !== !1, bins2 = this._bins(_), start = bins2.start, step = bins2.step, as = _.as || ["bin0", "bin1"], b02 = as[0], b12 = as[1], flag2;
    return _.modified() ? (pulse2 = pulse2.reflow(!0), flag2 = pulse2.SOURCE) : flag2 = pulse2.modified(accessorFields(_.field)) ? pulse2.ADD_MOD : pulse2.ADD, pulse2.visit(flag2, band2 ? (t) => {
      let v2 = bins2(t);
      t[b02] = v2, t[b12] = v2 == null ? null : start + step * (1 + (v2 - start) / step);
    } : (t) => t[b02] = bins2(t)), pulse2.modifies(band2 ? as : b02);
  },
  _bins(_) {
    if (this.value && !_.modified())
      return this.value;
    let field3 = _.field, bins2 = bin2(_), step = bins2.step, start = bins2.start, stop2 = start + Math.ceil((bins2.stop - start) / step) * step, a, d;
    (a = _.anchor) != null && (d = a - (start + step * Math.floor((a - start) / step)), start += d, stop2 += d);
    let f = function(t) {
      let v2 = toNumber(field3(t));
      return v2 == null ? null : v2 < start ? -1 / 0 : v2 > stop2 ? 1 / 0 : (v2 = Math.max(start, Math.min(v2, stop2 - step)), start + step * Math.floor(EPSILON$1 + (v2 - start) / step));
    };
    return f.start = start, f.stop = stop2, f.step = step, this.value = accessor(f, accessorFields(field3), _.name || "bin_" + accessorName(field3));
  }
});
function SortedList(idFunc, source4, input2) {
  let $ = idFunc, data3 = source4 || [], add6 = input2 || [], rem2 = {}, cnt = 0;
  return {
    add: (t) => add6.push(t),
    remove: (t) => rem2[$(t)] = ++cnt,
    size: () => data3.length,
    data: (compare3, resort) => (cnt && (data3 = data3.filter((t) => !rem2[$(t)]), rem2 = {}, cnt = 0), resort && compare3 && data3.sort(compare3), add6.length && (data3 = compare3 ? merge2(compare3, data3, add6.sort(compare3)) : data3.concat(add6), add6 = []), data3)
  };
}
function Collect(params2) {
  Transform.call(this, [], params2);
}
Collect.Definition = {
  type: "Collect",
  metadata: {
    source: !0
  },
  params: [{
    name: "sort",
    type: "compare"
  }]
};
inherits_default(Collect, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.ALL), list = SortedList(tupleid, this.value, out.materialize(out.ADD).add), sort3 = _.sort, mod = pulse2.changed() || sort3 && (_.modified("sort") || pulse2.modified(sort3.fields));
    return out.visit(out.REM, list.remove), this.modified(mod), this.value = out.source = list.data(stableCompare(sort3), mod), pulse2.source && pulse2.source.root && (this.value.root = pulse2.source.root), out;
  }
});
function Compare(params2) {
  Operator.call(this, null, update$5, params2);
}
inherits_default(Compare, Operator);
function update$5(_) {
  return this.value && !_.modified() ? this.value : compare(_.fields, _.orders);
}
function CountPattern(params2) {
  Transform.call(this, null, params2);
}
CountPattern.Definition = {
  type: "CountPattern",
  metadata: {
    generates: !0,
    changes: !0
  },
  params: [{
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "case",
    type: "enum",
    values: ["upper", "lower", "mixed"],
    default: "mixed"
  }, {
    name: "pattern",
    type: "string",
    default: '[\\w"]+'
  }, {
    name: "stopwords",
    type: "string",
    default: ""
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: ["text", "count"]
  }]
};
function tokenize(text4, tcase, match3) {
  switch (tcase) {
    case "upper":
      text4 = text4.toUpperCase();
      break;
    case "lower":
      text4 = text4.toLowerCase();
      break;
  }
  return text4.match(match3);
}
inherits_default(CountPattern, Transform, {
  transform(_, pulse2) {
    let process3 = (update3) => (tuple2) => {
      for (var tokens = tokenize(get6(tuple2), _.case, match3) || [], t, i = 0, n = tokens.length; i < n; ++i)
        stop2.test(t = tokens[i]) || update3(t);
    }, init2 = this._parameterCheck(_, pulse2), counts = this._counts, match3 = this._match, stop2 = this._stop, get6 = _.field, as = _.as || ["text", "count"], add6 = process3((t) => counts[t] = 1 + (counts[t] || 0)), rem2 = process3((t) => counts[t] -= 1);
    return init2 ? pulse2.visit(pulse2.SOURCE, add6) : (pulse2.visit(pulse2.ADD, add6), pulse2.visit(pulse2.REM, rem2)), this._finish(pulse2, as);
  },
  _parameterCheck(_, pulse2) {
    let init2 = !1;
    return (_.modified("stopwords") || !this._stop) && (this._stop = new RegExp("^" + (_.stopwords || "") + "$", "i"), init2 = !0), (_.modified("pattern") || !this._match) && (this._match = new RegExp(_.pattern || "[\\w']+", "g"), init2 = !0), (_.modified("field") || pulse2.modified(_.field.fields)) && (init2 = !0), init2 && (this._counts = {}), init2;
  },
  _finish(pulse2, as) {
    let counts = this._counts, tuples = this._tuples || (this._tuples = {}), text4 = as[0], count4 = as[1], out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), w2, t, c;
    for (w2 in counts)
      t = tuples[w2], c = counts[w2] || 0, !t && c ? (tuples[w2] = t = ingest$1({}), t[text4] = w2, t[count4] = c, out.add.push(t)) : c === 0 ? (t && out.rem.push(t), counts[w2] = null, tuples[w2] = null) : t[count4] !== c && (t[count4] = c, out.mod.push(t));
    return out.modifies(as);
  }
});
function Cross(params2) {
  Transform.call(this, null, params2);
}
Cross.Definition = {
  type: "Cross",
  metadata: {
    generates: !0
  },
  params: [{
    name: "filter",
    type: "expr"
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: ["a", "b"]
  }]
};
inherits_default(Cross, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE), as = _.as || ["a", "b"], a = as[0], b10 = as[1], reset3 = !this.value || pulse2.changed(pulse2.ADD_REM) || _.modified("as") || _.modified("filter"), data3 = this.value;
    return reset3 ? (data3 && (out.rem = data3), data3 = pulse2.materialize(pulse2.SOURCE).source, out.add = this.value = cross(data3, a, b10, _.filter || truthy)) : out.mod = data3, out.source = this.value, out.modifies(as);
  }
});
function cross(input2, a, b10, filter3) {
  for (var data3 = [], t = {}, n = input2.length, i = 0, j2, left; i < n; ++i)
    for (t[a] = left = input2[i], j2 = 0; j2 < n; ++j2)
      t[b10] = input2[j2], filter3(t) && (data3.push(ingest$1(t)), t = {}, t[a] = left);
  return data3;
}
var Distributions = {
  kde,
  mixture,
  normal: gaussian,
  lognormal,
  uniform
}, DISTRIBUTIONS = "distributions", FUNCTION = "function", FIELD = "field";
function parse5(def2, data3) {
  let func = def2[FUNCTION];
  hasOwnProperty(Distributions, func) || error62("Unknown distribution function: " + func);
  let d = Distributions[func]();
  for (let name2 in def2)
    name2 === FIELD ? d.data((def2.from || data3()).map(def2[name2])) : name2 === DISTRIBUTIONS ? d[name2](def2[name2].map((_) => parse5(_, data3))) : typeof d[name2] === FUNCTION && d[name2](def2[name2]);
  return d;
}
function Density(params2) {
  Transform.call(this, null, params2);
}
var distributions = [{
  key: {
    function: "normal"
  },
  params: [{
    name: "mean",
    type: "number",
    default: 0
  }, {
    name: "stdev",
    type: "number",
    default: 1
  }]
}, {
  key: {
    function: "lognormal"
  },
  params: [{
    name: "mean",
    type: "number",
    default: 0
  }, {
    name: "stdev",
    type: "number",
    default: 1
  }]
}, {
  key: {
    function: "uniform"
  },
  params: [{
    name: "min",
    type: "number",
    default: 0
  }, {
    name: "max",
    type: "number",
    default: 1
  }]
}, {
  key: {
    function: "kde"
  },
  params: [{
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "from",
    type: "data"
  }, {
    name: "bandwidth",
    type: "number",
    default: 0
  }]
}], mixture2 = {
  key: {
    function: "mixture"
  },
  params: [{
    name: "distributions",
    type: "param",
    array: !0,
    params: distributions
  }, {
    name: "weights",
    type: "number",
    array: !0
  }]
};
Density.Definition = {
  type: "Density",
  metadata: {
    generates: !0
  },
  params: [{
    name: "extent",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "steps",
    type: "number"
  }, {
    name: "minsteps",
    type: "number",
    default: 25
  }, {
    name: "maxsteps",
    type: "number",
    default: 200
  }, {
    name: "method",
    type: "string",
    default: "pdf",
    values: ["pdf", "cdf"]
  }, {
    name: "distribution",
    type: "param",
    params: distributions.concat(mixture2)
  }, {
    name: "as",
    type: "string",
    array: !0,
    default: ["value", "density"]
  }]
};
inherits_default(Density, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS);
    if (!this.value || pulse2.changed() || _.modified()) {
      let dist2 = parse5(_.distribution, source(pulse2)), minsteps = _.steps || _.minsteps || 25, maxsteps = _.steps || _.maxsteps || 200, method2 = _.method || "pdf";
      method2 !== "pdf" && method2 !== "cdf" && error62("Invalid density method: " + method2), !_.extent && !dist2.data && error62("Missing density extent parameter."), method2 = dist2[method2];
      let as = _.as || ["value", "density"], domain4 = _.extent || extent(dist2.data()), values3 = sampleCurve(method2, domain4, minsteps, maxsteps).map((v2) => {
        let tuple2 = {};
        return tuple2[as[0]] = v2[0], tuple2[as[1]] = v2[1], ingest$1(tuple2);
      });
      this.value && (out.rem = this.value), this.value = out.add = out.source = values3;
    }
    return out;
  }
});
function source(pulse2) {
  return () => pulse2.materialize(pulse2.SOURCE).source;
}
function fieldNames(fields, as) {
  return fields ? fields.map((f, i) => as[i] || accessorName(f)) : null;
}
function partition$1(data3, groupby, field3) {
  let groups = [], get6 = (f) => f(t), map4, i, n, t, k, g;
  if (groupby == null)
    groups.push(data3.map(field3));
  else
    for (map4 = {}, i = 0, n = data3.length; i < n; ++i)
      t = data3[i], k = groupby.map(get6), g = map4[k], g || (map4[k] = g = [], g.dims = k, groups.push(g)), g.push(field3(t));
  return groups;
}
var Output = "bin";
function DotBin(params2) {
  Transform.call(this, null, params2);
}
DotBin.Definition = {
  type: "DotBin",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "step",
    type: "number"
  }, {
    name: "smooth",
    type: "boolean",
    default: !1
  }, {
    name: "as",
    type: "string",
    default: Output
  }]
};
var autostep = (data3, field3) => span_default(extent(data3, field3)) / 30;
inherits_default(DotBin, Transform, {
  transform(_, pulse2) {
    if (this.value && !(_.modified() || pulse2.changed()))
      return pulse2;
    let source4 = pulse2.materialize(pulse2.SOURCE).source, groups = partition$1(pulse2.source, _.groupby, identity6), smooth = _.smooth || !1, field3 = _.field, step = _.step || autostep(source4, field3), sort3 = stableCompare((a, b10) => field3(a) - field3(b10)), as = _.as || Output, n = groups.length, min4 = 1 / 0, max4 = -1 / 0, i = 0, j2;
    for (; i < n; ++i) {
      let g = groups[i].sort(sort3);
      j2 = -1;
      for (let v2 of dotbin(g, step, smooth, field3))
        v2 < min4 && (min4 = v2), v2 > max4 && (max4 = v2), g[++j2][as] = v2;
    }
    return this.value = {
      start: min4,
      stop: max4,
      step
    }, pulse2.reflow(!0).modifies(as);
  }
});
function Expression(params2) {
  Operator.call(this, null, update$4, params2), this.modified(!0);
}
inherits_default(Expression, Operator);
function update$4(_) {
  let expr2 = _.expr;
  return this.value && !_.modified("expr") ? this.value : accessor((datum2) => expr2(datum2, _), accessorFields(expr2), accessorName(expr2));
}
function Extent(params2) {
  Transform.call(this, [void 0, void 0], params2);
}
Extent.Definition = {
  type: "Extent",
  metadata: {},
  params: [{
    name: "field",
    type: "field",
    required: !0
  }]
};
inherits_default(Extent, Transform, {
  transform(_, pulse2) {
    let extent2 = this.value, field3 = _.field, mod = pulse2.changed() || pulse2.modified(field3.fields) || _.modified("field"), min4 = extent2[0], max4 = extent2[1];
    if ((mod || min4 == null) && (min4 = 1 / 0, max4 = -1 / 0), pulse2.visit(mod ? pulse2.SOURCE : pulse2.ADD, (t) => {
      let v2 = toNumber(field3(t));
      v2 != null && (v2 < min4 && (min4 = v2), v2 > max4 && (max4 = v2));
    }), !Number.isFinite(min4) || !Number.isFinite(max4)) {
      let name2 = accessorName(field3);
      name2 && (name2 = ` for field "${name2}"`), pulse2.dataflow.warn(`Infinite extent${name2}: [${min4}, ${max4}]`), min4 = max4 = void 0;
    }
    this.value = [min4, max4];
  }
});
function Subflow(pulse2, parent) {
  Operator.call(this, pulse2), this.parent = parent, this.count = 0;
}
inherits_default(Subflow, Operator, {
  /**
   * Routes pulses from this subflow to a target transform.
   * @param {Transform} target - A transform that receives the subflow of tuples.
   */
  connect(target3) {
    return this.detachSubflow = target3.detachSubflow, this.targets().add(target3), target3.source = this;
  },
  /**
   * Add an 'add' tuple to the subflow pulse.
   * @param {Tuple} t - The tuple being added.
   */
  add(t) {
    this.count += 1, this.value.add.push(t);
  },
  /**
   * Add a 'rem' tuple to the subflow pulse.
   * @param {Tuple} t - The tuple being removed.
   */
  rem(t) {
    this.count -= 1, this.value.rem.push(t);
  },
  /**
   * Add a 'mod' tuple to the subflow pulse.
   * @param {Tuple} t - The tuple being modified.
   */
  mod(t) {
    this.value.mod.push(t);
  },
  /**
   * Re-initialize this operator's pulse value.
   * @param {Pulse} pulse - The pulse to copy from.
   * @see Pulse.init
   */
  init(pulse2) {
    this.value.init(pulse2, pulse2.NO_SOURCE);
  },
  /**
   * Evaluate this operator. This method overrides the
   * default behavior to simply return the contained pulse value.
   * @return {Pulse}
   */
  evaluate() {
    return this.value;
  }
});
function Facet(params2) {
  Transform.call(this, {}, params2), this._keys = fastmap();
  let a = this._targets = [];
  a.active = 0, a.forEach = (f) => {
    for (let i = 0, n = a.active; i < n; ++i)
      f(a[i], i, a);
  };
}
inherits_default(Facet, Transform, {
  activate(flow) {
    this._targets[this._targets.active++] = flow;
  },
  // parent argument provided by PreFacet subclass
  subflow(key2, flow, pulse2, parent) {
    let flows = this.value, sf = hasOwnProperty(flows, key2) && flows[key2], df, p;
    return sf ? sf.value.stamp < pulse2.stamp && (sf.init(pulse2), this.activate(sf)) : (p = parent || (p = this._group[key2]) && p.tuple, df = pulse2.dataflow, sf = new Subflow(pulse2.fork(pulse2.NO_SOURCE), this), df.add(sf).connect(flow(df, key2, p)), flows[key2] = sf, this.activate(sf)), sf;
  },
  clean() {
    let flows = this.value, detached = 0;
    for (let key2 in flows)
      if (flows[key2].count === 0) {
        let detach = flows[key2].detachSubflow;
        detach && detach(), delete flows[key2], ++detached;
      }
    if (detached) {
      let active = this._targets.filter((sf) => sf && sf.count > 0);
      this.initTargets(active);
    }
  },
  initTargets(act) {
    let a = this._targets, n = a.length, m = act ? act.length : 0, i = 0;
    for (; i < m; ++i)
      a[i] = act[i];
    for (; i < n && a[i] != null; ++i)
      a[i] = null;
    a.active = m;
  },
  transform(_, pulse2) {
    let df = pulse2.dataflow, key2 = _.key, flow = _.subflow, cache2 = this._keys, rekey = _.modified("key"), subflow = (key3) => this.subflow(key3, flow, pulse2);
    return this._group = _.group || {}, this.initTargets(), pulse2.visit(pulse2.REM, (t) => {
      let id3 = tupleid(t), k = cache2.get(id3);
      k !== void 0 && (cache2.delete(id3), subflow(k).rem(t));
    }), pulse2.visit(pulse2.ADD, (t) => {
      let k = key2(t);
      cache2.set(tupleid(t), k), subflow(k).add(t);
    }), rekey || pulse2.modified(key2.fields) ? pulse2.visit(pulse2.MOD, (t) => {
      let id3 = tupleid(t), k0 = cache2.get(id3), k1 = key2(t);
      k0 === k1 ? subflow(k1).mod(t) : (cache2.set(id3, k1), subflow(k0).rem(t), subflow(k1).add(t));
    }) : pulse2.changed(pulse2.MOD) && pulse2.visit(pulse2.MOD, (t) => {
      subflow(cache2.get(tupleid(t))).mod(t);
    }), rekey && pulse2.visit(pulse2.REFLOW, (t) => {
      let id3 = tupleid(t), k0 = cache2.get(id3), k1 = key2(t);
      k0 !== k1 && (cache2.set(id3, k1), subflow(k0).rem(t), subflow(k1).add(t));
    }), pulse2.clean() ? df.runAfter(() => {
      this.clean(), cache2.clean();
    }) : cache2.empty > df.cleanThreshold && df.runAfter(cache2.clean), pulse2;
  }
});
function Field(params2) {
  Operator.call(this, null, update$3, params2);
}
inherits_default(Field, Operator);
function update$3(_) {
  return this.value && !_.modified() ? this.value : isArray(_.name) ? array_default(_.name).map((f) => field(f)) : field(_.name, _.as);
}
function Filter(params2) {
  Transform.call(this, fastmap(), params2);
}
Filter.Definition = {
  type: "Filter",
  metadata: {
    changes: !0
  },
  params: [{
    name: "expr",
    type: "expr",
    required: !0
  }]
};
inherits_default(Filter, Transform, {
  transform(_, pulse2) {
    let df = pulse2.dataflow, cache2 = this.value, output4 = pulse2.fork(), add6 = output4.add, rem2 = output4.rem, mod = output4.mod, test2 = _.expr, isMod = !0;
    pulse2.visit(pulse2.REM, (t) => {
      let id3 = tupleid(t);
      cache2.has(id3) ? cache2.delete(id3) : rem2.push(t);
    }), pulse2.visit(pulse2.ADD, (t) => {
      test2(t, _) ? add6.push(t) : cache2.set(tupleid(t), 1);
    });
    function revisit(t) {
      let id3 = tupleid(t), b10 = test2(t, _), s = cache2.get(id3);
      b10 && s ? (cache2.delete(id3), add6.push(t)) : !b10 && !s ? (cache2.set(id3, 1), rem2.push(t)) : isMod && b10 && !s && mod.push(t);
    }
    return pulse2.visit(pulse2.MOD, revisit), _.modified() && (isMod = !1, pulse2.visit(pulse2.REFLOW, revisit)), cache2.empty > df.cleanThreshold && df.runAfter(cache2.clean), output4;
  }
});
function Flatten(params2) {
  Transform.call(this, [], params2);
}
Flatten.Definition = {
  type: "Flatten",
  metadata: {
    generates: !0
  },
  params: [{
    name: "fields",
    type: "field",
    array: !0,
    required: !0
  }, {
    name: "index",
    type: "string"
  }, {
    name: "as",
    type: "string",
    array: !0
  }]
};
inherits_default(Flatten, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE), fields = _.fields, as = fieldNames(fields, _.as || []), index4 = _.index || null, m = as.length;
    return out.rem = this.value, pulse2.visit(pulse2.SOURCE, (t) => {
      let arrays = fields.map((f) => f(t)), maxlen = arrays.reduce((l, a) => Math.max(l, a.length), 0), i = 0, j2, d, v2;
      for (; i < maxlen; ++i) {
        for (d = derive(t), j2 = 0; j2 < m; ++j2)
          d[as[j2]] = (v2 = arrays[j2][i]) == null ? null : v2;
        index4 && (d[index4] = i), out.add.push(d);
      }
    }), this.value = out.source = out.add, index4 && out.modifies(index4), out.modifies(as);
  }
});
function Fold(params2) {
  Transform.call(this, [], params2);
}
Fold.Definition = {
  type: "Fold",
  metadata: {
    generates: !0
  },
  params: [{
    name: "fields",
    type: "field",
    array: !0,
    required: !0
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: ["key", "value"]
  }]
};
inherits_default(Fold, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE), fields = _.fields, fnames = fields.map(accessorName), as = _.as || ["key", "value"], k = as[0], v2 = as[1], n = fields.length;
    return out.rem = this.value, pulse2.visit(pulse2.SOURCE, (t) => {
      for (let i = 0, d; i < n; ++i)
        d = derive(t), d[k] = fnames[i], d[v2] = fields[i](t), out.add.push(d);
    }), this.value = out.source = out.add, out.modifies(as);
  }
});
function Formula(params2) {
  Transform.call(this, null, params2);
}
Formula.Definition = {
  type: "Formula",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "expr",
    type: "expr",
    required: !0
  }, {
    name: "as",
    type: "string",
    required: !0
  }, {
    name: "initonly",
    type: "boolean"
  }]
};
inherits_default(Formula, Transform, {
  transform(_, pulse2) {
    let func = _.expr, as = _.as, mod = _.modified(), flag2 = _.initonly ? pulse2.ADD : mod ? pulse2.SOURCE : pulse2.modified(func.fields) || pulse2.modified(as) ? pulse2.ADD_MOD : pulse2.ADD;
    return mod && (pulse2 = pulse2.materialize().reflow(!0)), _.initonly || pulse2.modifies(as), pulse2.visit(flag2, (t) => t[as] = func(t, _));
  }
});
function Generate(params2) {
  Transform.call(this, [], params2);
}
inherits_default(Generate, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.ALL), gen = _.generator, data3 = this.value, num = _.size - data3.length, add6, rem2, t;
    if (num > 0) {
      for (add6 = []; --num >= 0; )
        add6.push(t = ingest$1(gen(_))), data3.push(t);
      out.add = out.add.length ? out.materialize(out.ADD).add.concat(add6) : add6;
    } else
      rem2 = data3.slice(0, -num), out.rem = out.rem.length ? out.materialize(out.REM).rem.concat(rem2) : rem2, data3 = data3.slice(-num);
    return out.source = this.value = data3, out;
  }
});
var Methods = {
  value: "value",
  median,
  mean,
  min,
  max
}, Empty = [];
function Impute(params2) {
  Transform.call(this, [], params2);
}
Impute.Definition = {
  type: "Impute",
  metadata: {
    changes: !0
  },
  params: [{
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "key",
    type: "field",
    required: !0
  }, {
    name: "keyvals",
    array: !0
  }, {
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "method",
    type: "enum",
    default: "value",
    values: ["value", "mean", "median", "max", "min"]
  }, {
    name: "value",
    default: 0
  }]
};
function getValue(_) {
  var m = _.method || Methods.value, v2;
  if (Methods[m] == null)
    error62("Unrecognized imputation method: " + m);
  else return m === Methods.value ? (v2 = _.value !== void 0 ? _.value : 0, () => v2) : Methods[m];
}
function getField(_) {
  let f = _.field;
  return (t) => t ? f(t) : NaN;
}
inherits_default(Impute, Transform, {
  transform(_, pulse2) {
    var out = pulse2.fork(pulse2.ALL), impute = getValue(_), field3 = getField(_), fName = accessorName(_.field), kName = accessorName(_.key), gNames = (_.groupby || []).map(accessorName), groups = partition(pulse2.source, _.groupby, _.key, _.keyvals), curr = [], prev = this.value, m = groups.domain.length, group2, value3, gVals, kVal, g, i, j2, l, n, t;
    for (g = 0, l = groups.length; g < l; ++g)
      for (group2 = groups[g], gVals = group2.values, value3 = NaN, j2 = 0; j2 < m; ++j2)
        if (group2[j2] == null) {
          for (kVal = groups.domain[j2], t = {
            _impute: !0
          }, i = 0, n = gVals.length; i < n; ++i) t[gNames[i]] = gVals[i];
          t[kName] = kVal, t[fName] = Number.isNaN(value3) ? value3 = impute(group2, field3) : value3, curr.push(ingest$1(t));
        }
    return curr.length && (out.add = out.materialize(out.ADD).add.concat(curr)), prev.length && (out.rem = out.materialize(out.REM).rem.concat(prev)), this.value = curr, out;
  }
});
function partition(data3, groupby, key2, keyvals) {
  var get6 = (f) => f(t), groups = [], domain4 = keyvals ? keyvals.slice() : [], kMap = {}, gMap = {}, gVals, gKey, group2, i, j2, k, n, t;
  for (domain4.forEach((k2, i2) => kMap[k2] = i2 + 1), i = 0, n = data3.length; i < n; ++i)
    t = data3[i], k = key2(t), j2 = kMap[k] || (kMap[k] = domain4.push(k)), gKey = (gVals = groupby ? groupby.map(get6) : Empty) + "", (group2 = gMap[gKey]) || (group2 = gMap[gKey] = [], groups.push(group2), group2.values = gVals), group2[j2 - 1] = t;
  return groups.domain = domain4, groups;
}
function JoinAggregate(params2) {
  Aggregate.call(this, params2);
}
JoinAggregate.Definition = {
  type: "JoinAggregate",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "fields",
    type: "field",
    null: !0,
    array: !0
  }, {
    name: "ops",
    type: "enum",
    array: !0,
    values: ValidAggregateOps
  }, {
    name: "as",
    type: "string",
    null: !0,
    array: !0
  }, {
    name: "key",
    type: "field"
  }]
};
inherits_default(JoinAggregate, Aggregate, {
  transform(_, pulse2) {
    let aggr = this, mod = _.modified(), cells;
    return aggr.value && (mod || pulse2.modified(aggr._inputs, !0)) ? (cells = aggr.value = mod ? aggr.init(_) : {}, pulse2.visit(pulse2.SOURCE, (t) => aggr.add(t))) : (cells = aggr.value = aggr.value || this.init(_), pulse2.visit(pulse2.REM, (t) => aggr.rem(t)), pulse2.visit(pulse2.ADD, (t) => aggr.add(t))), aggr.changes(), pulse2.visit(pulse2.SOURCE, (t) => {
      extend2(t, cells[aggr.cellkey(t)].tuple);
    }), pulse2.reflow(mod).modifies(this._outputs);
  },
  changes() {
    let adds = this._adds, mods = this._mods, i, n;
    for (i = 0, n = this._alen; i < n; ++i)
      this.celltuple(adds[i]), adds[i] = null;
    for (i = 0, n = this._mlen; i < n; ++i)
      this.celltuple(mods[i]), mods[i] = null;
    this._alen = this._mlen = 0;
  }
});
function KDE(params2) {
  Transform.call(this, null, params2);
}
KDE.Definition = {
  type: "KDE",
  metadata: {
    generates: !0
  },
  params: [{
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "cumulative",
    type: "boolean",
    default: !1
  }, {
    name: "counts",
    type: "boolean",
    default: !1
  }, {
    name: "bandwidth",
    type: "number",
    default: 0
  }, {
    name: "extent",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "resolve",
    type: "enum",
    values: ["shared", "independent"],
    default: "independent"
  }, {
    name: "steps",
    type: "number"
  }, {
    name: "minsteps",
    type: "number",
    default: 25
  }, {
    name: "maxsteps",
    type: "number",
    default: 200
  }, {
    name: "as",
    type: "string",
    array: !0,
    default: ["value", "density"]
  }]
};
inherits_default(KDE, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS);
    if (!this.value || pulse2.changed() || _.modified()) {
      let source4 = pulse2.materialize(pulse2.SOURCE).source, groups = partition$1(source4, _.groupby, _.field), names = (_.groupby || []).map(accessorName), bandwidth2 = _.bandwidth, method2 = _.cumulative ? "cdf" : "pdf", as = _.as || ["value", "density"], values3 = [], domain4 = _.extent, minsteps = _.steps || _.minsteps || 25, maxsteps = _.steps || _.maxsteps || 200;
      method2 !== "pdf" && method2 !== "cdf" && error62("Invalid density method: " + method2), _.resolve === "shared" && (domain4 || (domain4 = extent(source4, _.field)), minsteps = maxsteps = _.steps || maxsteps), groups.forEach((g) => {
        let density = kde(g, bandwidth2)[method2], scale7 = _.counts ? g.length : 1, local = domain4 || extent(g);
        sampleCurve(density, local, minsteps, maxsteps).forEach((v2) => {
          let t = {};
          for (let i = 0; i < names.length; ++i)
            t[names[i]] = g.dims[i];
          t[as[0]] = v2[0], t[as[1]] = v2[1] * scale7, values3.push(ingest$1(t));
        });
      }), this.value && (out.rem = this.value), this.value = out.add = out.source = values3;
    }
    return out;
  }
});
function Key(params2) {
  Operator.call(this, null, update$2, params2);
}
inherits_default(Key, Operator);
function update$2(_) {
  return this.value && !_.modified() ? this.value : key(_.fields, _.flat);
}
function Load(params2) {
  Transform.call(this, [], params2), this._pending = null;
}
inherits_default(Load, Transform, {
  transform(_, pulse2) {
    let df = pulse2.dataflow;
    return this._pending ? output3(this, pulse2, this._pending) : stop(_) ? pulse2.StopPropagation : _.values ? output3(this, pulse2, df.parse(_.values, _.format)) : _.async ? {
      async: df.request(_.url, _.format).then((res) => (this._pending = array_default(res.data), (df2) => df2.touch(this)))
    } : df.request(_.url, _.format).then((res) => output3(this, pulse2, array_default(res.data)));
  }
});
function stop(_) {
  return _.modified("async") && !(_.modified("values") || _.modified("url") || _.modified("format"));
}
function output3(op, pulse2, data3) {
  data3.forEach(ingest$1);
  let out = pulse2.fork(pulse2.NO_FIELDS & pulse2.NO_SOURCE);
  return out.rem = op.value, op.value = out.source = out.add = data3, op._pending = null, out.rem.length && out.clean(!0), out;
}
function Lookup(params2) {
  Transform.call(this, {}, params2);
}
Lookup.Definition = {
  type: "Lookup",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "index",
    type: "index",
    params: [{
      name: "from",
      type: "data",
      required: !0
    }, {
      name: "key",
      type: "field",
      required: !0
    }]
  }, {
    name: "values",
    type: "field",
    array: !0
  }, {
    name: "fields",
    type: "field",
    array: !0,
    required: !0
  }, {
    name: "as",
    type: "string",
    array: !0
  }, {
    name: "default",
    default: null
  }]
};
inherits_default(Lookup, Transform, {
  transform(_, pulse2) {
    let keys4 = _.fields, index4 = _.index, values3 = _.values, defaultValue = _.default == null ? null : _.default, reset3 = _.modified(), n = keys4.length, flag2 = reset3 ? pulse2.SOURCE : pulse2.ADD, out = pulse2, as = _.as, set8, m, mods;
    return values3 ? (m = values3.length, n > 1 && !as && error62('Multi-field lookup requires explicit "as" parameter.'), as && as.length !== n * m && error62('The "as" parameter has too few output field names.'), as = as || values3.map(accessorName), set8 = function(t) {
      for (var i = 0, k = 0, j2, v2; i < n; ++i)
        if (v2 = index4.get(keys4[i](t)), v2 == null) for (j2 = 0; j2 < m; ++j2, ++k) t[as[k]] = defaultValue;
        else for (j2 = 0; j2 < m; ++j2, ++k) t[as[k]] = values3[j2](v2);
    }) : (as || error62("Missing output field names."), set8 = function(t) {
      for (var i = 0, v2; i < n; ++i)
        v2 = index4.get(keys4[i](t)), t[as[i]] = v2 ?? defaultValue;
    }), reset3 ? out = pulse2.reflow(!0) : (mods = keys4.some((k) => pulse2.modified(k.fields)), flag2 |= mods ? pulse2.MOD : 0), pulse2.visit(flag2, set8), out.modifies(as);
  }
});
function MultiExtent(params2) {
  Operator.call(this, null, update$1, params2);
}
inherits_default(MultiExtent, Operator);
function update$1(_) {
  if (this.value && !_.modified())
    return this.value;
  let ext = _.extents, n = ext.length, min4 = 1 / 0, max4 = -1 / 0, i, e;
  for (i = 0; i < n; ++i)
    e = ext[i], e[0] < min4 && (min4 = e[0]), e[1] > max4 && (max4 = e[1]);
  return [min4, max4];
}
function MultiValues(params2) {
  Operator.call(this, null, update2, params2);
}
inherits_default(MultiValues, Operator);
function update2(_) {
  return this.value && !_.modified() ? this.value : _.values.reduce((data3, _2) => data3.concat(_2), []);
}
function Params(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Params, Transform, {
  transform(_, pulse2) {
    return this.modified(_.modified()), this.value = _, pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS);
  }
});
function Pivot(params2) {
  Aggregate.call(this, params2);
}
Pivot.Definition = {
  type: "Pivot",
  metadata: {
    generates: !0,
    changes: !0
  },
  params: [{
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "value",
    type: "field",
    required: !0
  }, {
    name: "op",
    type: "enum",
    values: ValidAggregateOps,
    default: "sum"
  }, {
    name: "limit",
    type: "number",
    default: 0
  }, {
    name: "key",
    type: "field"
  }]
};
inherits_default(Pivot, Aggregate, {
  _transform: Aggregate.prototype.transform,
  transform(_, pulse2) {
    return this._transform(aggregateParams(_, pulse2), pulse2);
  }
});
function aggregateParams(_, pulse2) {
  let key2 = _.field, value3 = _.value, op = (_.op === "count" ? "__count__" : _.op) || "sum", fields = accessorFields(key2).concat(accessorFields(value3)), keys4 = pivotKeys(key2, _.limit || 0, pulse2);
  return pulse2.changed() && _.set("__pivot__", null, null, !0), {
    key: _.key,
    groupby: _.groupby,
    ops: keys4.map(() => op),
    fields: keys4.map((k) => get(k, key2, value3, fields)),
    as: keys4.map((k) => k + ""),
    modified: _.modified.bind(_)
  };
}
function get(k, key2, value3, fields) {
  return accessor((d) => key2(d) === k ? value3(d) : NaN, fields, k + "");
}
function pivotKeys(key2, limit, pulse2) {
  let map4 = {}, list = [];
  return pulse2.visit(pulse2.SOURCE, (t) => {
    let k = key2(t);
    map4[k] || (map4[k] = 1, list.push(k));
  }), list.sort(ascending), limit ? list.slice(0, limit) : list;
}
function PreFacet(params2) {
  Facet.call(this, params2);
}
inherits_default(PreFacet, Facet, {
  transform(_, pulse2) {
    let flow = _.subflow, field3 = _.field, subflow = (t) => this.subflow(tupleid(t), flow, pulse2, t);
    return (_.modified("field") || field3 && pulse2.modified(accessorFields(field3))) && error62("PreFacet does not support field modification."), this.initTargets(), field3 ? (pulse2.visit(pulse2.MOD, (t) => {
      let sf = subflow(t);
      field3(t).forEach((_2) => sf.mod(_2));
    }), pulse2.visit(pulse2.ADD, (t) => {
      let sf = subflow(t);
      field3(t).forEach((_2) => sf.add(ingest$1(_2)));
    }), pulse2.visit(pulse2.REM, (t) => {
      let sf = subflow(t);
      field3(t).forEach((_2) => sf.rem(_2));
    })) : (pulse2.visit(pulse2.MOD, (t) => subflow(t).mod(t)), pulse2.visit(pulse2.ADD, (t) => subflow(t).add(t)), pulse2.visit(pulse2.REM, (t) => subflow(t).rem(t))), pulse2.clean() && pulse2.runAfter(() => this.clean()), pulse2;
  }
});
function Project(params2) {
  Transform.call(this, null, params2);
}
Project.Definition = {
  type: "Project",
  metadata: {
    generates: !0,
    changes: !0
  },
  params: [{
    name: "fields",
    type: "field",
    array: !0
  }, {
    name: "as",
    type: "string",
    null: !0,
    array: !0
  }]
};
inherits_default(Project, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE), fields = _.fields, as = fieldNames(_.fields, _.as || []), derive2 = fields ? (s, t) => project(s, t, fields, as) : rederive, lut;
    return this.value ? lut = this.value : (pulse2 = pulse2.addAll(), lut = this.value = {}), pulse2.visit(pulse2.REM, (t) => {
      let id3 = tupleid(t);
      out.rem.push(lut[id3]), lut[id3] = null;
    }), pulse2.visit(pulse2.ADD, (t) => {
      let dt = derive2(t, ingest$1({}));
      lut[tupleid(t)] = dt, out.add.push(dt);
    }), pulse2.visit(pulse2.MOD, (t) => {
      out.mod.push(derive2(t, lut[tupleid(t)]));
    }), out;
  }
});
function project(s, t, fields, as) {
  for (let i = 0, n = fields.length; i < n; ++i)
    t[as[i]] = fields[i](s);
  return t;
}
function Proxy2(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Proxy2, Transform, {
  transform(_, pulse2) {
    return this.value = _.value, _.modified("value") ? pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS) : pulse2.StopPropagation;
  }
});
function Quantile(params2) {
  Transform.call(this, null, params2);
}
Quantile.Definition = {
  type: "Quantile",
  metadata: {
    generates: !0,
    changes: !0
  },
  params: [{
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "probs",
    type: "number",
    array: !0
  }, {
    name: "step",
    type: "number",
    default: 0.01
  }, {
    name: "as",
    type: "string",
    array: !0,
    default: ["prob", "value"]
  }]
};
var EPSILON = 1e-14;
inherits_default(Quantile, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), as = _.as || ["prob", "value"];
    if (this.value && !_.modified() && !pulse2.changed())
      return out.source = this.value, out;
    let source4 = pulse2.materialize(pulse2.SOURCE).source, groups = partition$1(source4, _.groupby, _.field), names = (_.groupby || []).map(accessorName), values3 = [], step = _.step || 0.01, p = _.probs || range2(step / 2, 1 - EPSILON, step), n = p.length;
    return groups.forEach((g) => {
      let q = quantiles(g, p);
      for (let i = 0; i < n; ++i) {
        let t = {};
        for (let i2 = 0; i2 < names.length; ++i2)
          t[names[i2]] = g.dims[i2];
        t[as[0]] = p[i], t[as[1]] = q[i], values3.push(ingest$1(t));
      }
    }), this.value && (out.rem = this.value), this.value = out.add = out.source = values3, out;
  }
});
function Relay(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Relay, Transform, {
  transform(_, pulse2) {
    let out, lut;
    return this.value ? lut = this.value : (out = pulse2 = pulse2.addAll(), lut = this.value = {}), _.derive && (out = pulse2.fork(pulse2.NO_SOURCE), pulse2.visit(pulse2.REM, (t) => {
      let id3 = tupleid(t);
      out.rem.push(lut[id3]), lut[id3] = null;
    }), pulse2.visit(pulse2.ADD, (t) => {
      let dt = derive(t);
      lut[tupleid(t)] = dt, out.add.push(dt);
    }), pulse2.visit(pulse2.MOD, (t) => {
      let dt = lut[tupleid(t)];
      for (let k in t)
        dt[k] = t[k], out.modifies(k);
      out.mod.push(dt);
    })), out;
  }
});
function Sample(params2) {
  Transform.call(this, [], params2), this.count = 0;
}
Sample.Definition = {
  type: "Sample",
  metadata: {},
  params: [{
    name: "size",
    type: "number",
    default: 1e3
  }]
};
inherits_default(Sample, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE), mod = _.modified("size"), num = _.size, map4 = this.value.reduce((m, t) => (m[tupleid(t)] = 1, m), {}), res = this.value, cnt = this.count, cap = 0;
    function update3(t) {
      let p, idx;
      res.length < num ? res.push(t) : (idx = ~~((cnt + 1) * random()), idx < res.length && idx >= cap && (p = res[idx], map4[tupleid(p)] && out.rem.push(p), res[idx] = t)), ++cnt;
    }
    if (pulse2.rem.length && (pulse2.visit(pulse2.REM, (t) => {
      let id3 = tupleid(t);
      map4[id3] && (map4[id3] = -1, out.rem.push(t)), --cnt;
    }), res = res.filter((t) => map4[tupleid(t)] !== -1)), (pulse2.rem.length || mod) && res.length < num && pulse2.source && (cap = cnt = res.length, pulse2.visit(pulse2.SOURCE, (t) => {
      map4[tupleid(t)] || update3(t);
    }), cap = -1), mod && res.length > num) {
      let n = res.length - num;
      for (let i = 0; i < n; ++i)
        map4[tupleid(res[i])] = -1, out.rem.push(res[i]);
      res = res.slice(n);
    }
    return pulse2.mod.length && pulse2.visit(pulse2.MOD, (t) => {
      map4[tupleid(t)] && out.mod.push(t);
    }), pulse2.add.length && pulse2.visit(pulse2.ADD, update3), (pulse2.add.length || cap < 0) && (out.add = res.filter((t) => !map4[tupleid(t)])), this.count = cnt, this.value = out.source = res, out;
  }
});
function Sequence(params2) {
  Transform.call(this, null, params2);
}
Sequence.Definition = {
  type: "Sequence",
  metadata: {
    generates: !0,
    changes: !0
  },
  params: [{
    name: "start",
    type: "number",
    required: !0
  }, {
    name: "stop",
    type: "number",
    required: !0
  }, {
    name: "step",
    type: "number",
    default: 1
  }, {
    name: "as",
    type: "string",
    default: "data"
  }]
};
inherits_default(Sequence, Transform, {
  transform(_, pulse2) {
    if (this.value && !_.modified()) return;
    let out = pulse2.materialize().fork(pulse2.MOD), as = _.as || "data";
    return out.rem = this.value ? pulse2.rem.concat(this.value) : pulse2.rem, this.value = range2(_.start, _.stop, _.step || 1).map((v2) => {
      let t = {};
      return t[as] = v2, ingest$1(t);
    }), out.add = pulse2.add.concat(this.value), out;
  }
});
function Sieve(params2) {
  Transform.call(this, null, params2), this.modified(!0);
}
inherits_default(Sieve, Transform, {
  transform(_, pulse2) {
    return this.value = pulse2.source, pulse2.changed() ? pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS) : pulse2.StopPropagation;
  }
});
function TimeUnit(params2) {
  Transform.call(this, null, params2);
}
var OUTPUT = ["unit0", "unit1"];
TimeUnit.Definition = {
  type: "TimeUnit",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field",
    required: !0
  }, {
    name: "interval",
    type: "boolean",
    default: !0
  }, {
    name: "units",
    type: "enum",
    values: TIME_UNITS,
    array: !0
  }, {
    name: "step",
    type: "number",
    default: 1
  }, {
    name: "maxbins",
    type: "number",
    default: 40
  }, {
    name: "extent",
    type: "date",
    array: !0
  }, {
    name: "inferUnits",
    type: "boolean",
    default: !1
  }, {
    name: "timezone",
    type: "enum",
    default: "local",
    values: ["local", "utc"]
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: OUTPUT
  }]
};
inherits_default(TimeUnit, Transform, {
  transform(_, pulse2) {
    let field3 = _.field, band2 = _.interval !== !1, utc = _.timezone === "utc", floor2 = this._floor(_, pulse2), offset4 = (utc ? utcInterval : timeInterval2)(floor2.unit).offset, as = _.as || OUTPUT, u0 = as[0], u1 = as[1], step = floor2.step, min4 = floor2.start || 1 / 0, max4 = floor2.stop || -1 / 0, flag2 = pulse2.ADD;
    return (_.modified() || pulse2.changed(pulse2.REM) || pulse2.modified(accessorFields(field3))) && (pulse2 = pulse2.reflow(!0), flag2 = pulse2.SOURCE, min4 = 1 / 0, max4 = -1 / 0), pulse2.visit(flag2, (t) => {
      let v2 = field3(t), a, b10;
      v2 == null ? (t[u0] = null, band2 && (t[u1] = null)) : (t[u0] = a = b10 = floor2(v2), band2 && (t[u1] = b10 = offset4(a, step)), a < min4 && (min4 = a), b10 > max4 && (max4 = b10));
    }), floor2.start = min4, floor2.stop = max4, pulse2.modifies(band2 ? as : u0);
  },
  _floor(_, pulse2) {
    let utc = _.timezone === "utc";
    _.inferUnits && (_.units || _.step != null || _.maxbins != null || _.extent) && pulse2.dataflow.warn("TimeUnit inferUnits overrides units, step, maxbins and extent.");
    let {
      units,
      step
    } = _.inferUnits ? detectTimeUnits(pulse2.materialize(pulse2.SOURCE).source, _.field, utc) : _.units ? {
      units: _.units,
      step: _.step || 1
    } : bin({
      extent: _.extent || extent(pulse2.materialize(pulse2.SOURCE).source, _.field),
      maxbins: _.maxbins
    }), tunits = timeUnits(units), prev = this.value || {}, floor2 = (utc ? utcFloor : timeFloor)(tunits, step);
    return floor2.unit = peek(tunits), floor2.units = tunits, floor2.step = step, floor2.start = prev.start, floor2.stop = prev.stop, this.value = floor2;
  }
});
function TupleIndex(params2) {
  Transform.call(this, fastmap(), params2);
}
inherits_default(TupleIndex, Transform, {
  transform(_, pulse2) {
    let df = pulse2.dataflow, field3 = _.field, index4 = this.value, set8 = (t) => index4.set(field3(t), t), mod = !0;
    return _.modified("field") || pulse2.modified(field3.fields) ? (index4.clear(), pulse2.visit(pulse2.SOURCE, set8)) : pulse2.changed() ? (pulse2.visit(pulse2.REM, (t) => index4.delete(field3(t))), pulse2.visit(pulse2.ADD, set8)) : mod = !1, this.modified(mod), index4.empty > df.cleanThreshold && df.runAfter(index4.clean), pulse2.fork();
  }
});
function Values(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Values, Transform, {
  transform(_, pulse2) {
    (!this.value || _.modified("field") || _.modified("sort") || pulse2.changed() || _.sort && pulse2.modified(_.sort.fields)) && (this.value = (_.sort ? pulse2.source.slice().sort(stableCompare(_.sort)) : pulse2.source).map(_.field));
  }
});
function WindowOp(op, field3, param2, as) {
  let fn = WindowOps[op](field3, param2);
  return {
    init: fn.init || zero,
    update: function(w2, t) {
      t[as] = fn.next(w2);
    }
  };
}
var WindowOps = {
  row_number: function() {
    return {
      next: (w2) => w2.index + 1
    };
  },
  rank: function() {
    let rank2;
    return {
      init: () => rank2 = 1,
      next: (w2) => {
        let i = w2.index, data3 = w2.data;
        return i && w2.compare(data3[i - 1], data3[i]) ? rank2 = i + 1 : rank2;
      }
    };
  },
  dense_rank: function() {
    let drank;
    return {
      init: () => drank = 1,
      next: (w2) => {
        let i = w2.index, d = w2.data;
        return i && w2.compare(d[i - 1], d[i]) ? ++drank : drank;
      }
    };
  },
  percent_rank: function() {
    let rank2 = WindowOps.rank(), next = rank2.next;
    return {
      init: rank2.init,
      next: (w2) => (next(w2) - 1) / (w2.data.length - 1)
    };
  },
  cume_dist: function() {
    let cume;
    return {
      init: () => cume = 0,
      next: (w2) => {
        let d = w2.data, c = w2.compare, i = w2.index;
        if (cume < i) {
          for (; i + 1 < d.length && !c(d[i], d[i + 1]); ) ++i;
          cume = i;
        }
        return (1 + cume) / d.length;
      }
    };
  },
  ntile: function(field3, num) {
    num = +num, num > 0 || error62("ntile num must be greater than zero.");
    let cume = WindowOps.cume_dist(), next = cume.next;
    return {
      init: cume.init,
      next: (w2) => Math.ceil(num * next(w2))
    };
  },
  lag: function(field3, offset4) {
    return offset4 = +offset4 || 1, {
      next: (w2) => {
        let i = w2.index - offset4;
        return i >= 0 ? field3(w2.data[i]) : null;
      }
    };
  },
  lead: function(field3, offset4) {
    return offset4 = +offset4 || 1, {
      next: (w2) => {
        let i = w2.index + offset4, d = w2.data;
        return i < d.length ? field3(d[i]) : null;
      }
    };
  },
  first_value: function(field3) {
    return {
      next: (w2) => field3(w2.data[w2.i0])
    };
  },
  last_value: function(field3) {
    return {
      next: (w2) => field3(w2.data[w2.i1 - 1])
    };
  },
  nth_value: function(field3, nth) {
    return nth = +nth, nth > 0 || error62("nth_value nth must be greater than zero."), {
      next: (w2) => {
        let i = w2.i0 + (nth - 1);
        return i < w2.i1 ? field3(w2.data[i]) : null;
      }
    };
  },
  prev_value: function(field3) {
    let prev;
    return {
      init: () => prev = null,
      next: (w2) => {
        let v2 = field3(w2.data[w2.index]);
        return v2 != null ? prev = v2 : prev;
      }
    };
  },
  next_value: function(field3) {
    let v2, i;
    return {
      init: () => (v2 = null, i = -1),
      next: (w2) => {
        let d = w2.data;
        return w2.index <= i ? v2 : (i = find(field3, d, w2.index)) < 0 ? (i = d.length, v2 = null) : v2 = field3(d[i]);
      }
    };
  }
};
function find(field3, data3, index4) {
  for (let n = data3.length; index4 < n; ++index4)
    if (field3(data3[index4]) != null) return index4;
  return -1;
}
var ValidWindowOps = Object.keys(WindowOps);
// End of bundle text, part 8 of 15
export { Adder, Dataflow, DisallowedObjectProperties, EventStream, InternMap, SortedList, Transform, TupleStore,
  ValidAggregateOps, ValidWindowOps, Warn, WindowOp, WindowOps, accessor, accessorFields, accessorName, array_default,
  ascending, ascending2, asyncCallback, bisectLeft, bisectRight, bisect_default, bisector, changeset, clampRange,
  compare, compileMeasures, constant, constant_default, createMeasure, cumulativeLogNormal, cumulativeNormal,
  cumulativeUniform, dayofyear, debounce, definition, densityLogNormal, densityNormal, densityUniform, error62,
  estimateBandwidth, exp2, extend2, extent, falsy, fastmap, field, flush_default, format, formatPrefix,
  formatSpecifier, groupkey, hasOwnProperty, identity6, ingest$1, inherits_default, inrange, intersection2, isArray,
  isBoolean, isChangeSet, isDate, isFunction, isNumber, isObject2, isRegExp, isString, isTuple, isoweek, key,
  lerp_default, linear, loader, locale3, loess, log3, logger_default, lruCache_default, max, measureName, merge3,
  mergeConfig, one, pad, panLinear, panLog, panPow, panSymlog, peek, permute, poly, pow2, precisionFixed_default,
  precisionPrefix_default, precisionRound_default, quad, quantileLogNormal, quantileNormal, quantileSorted,
  quantileUniform, quarter, random, range2, rederive, replace, sampleCurve, sampleLogNormal, sampleNormal,
  sampleUniform, second, span_default, splitAccessPath, stableCompare, stringValue, sum, tickIncrement, tickStep,
  ticks, timeDay, timeFormat, timeHour, timeInterval2, timeMinute, timeMonth, timeOffset, timeSequence, timeSunday,
  timeTickInterval, timeTicks, timeUnitSpecifier, timeYear, toBoolean, toDate, toNumber, toSet, toString, transforms,
  truncate, truthy, tupleid, union2, utcDay, utcFormat, utcHour, utcInterval, utcMinute, utcMonth, utcOffset,
  utcSequence, utcSunday, utcTickInterval, utcTicks, utcYear, utcdayofyear, utcisoweek, utcquarter, utcweek,
  vega_transforms_exports, week, writeConfig, zero, zoomLinear, zoomLog, zoomPow, zoomSymlog };
