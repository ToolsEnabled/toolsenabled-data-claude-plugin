// ToolsEnabled Data server, part 12 of 15: Vega-Lite, which compiles chart specs (lines 52046-57844 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-11-vega.mjs";
import { Dataflow, Warn, array_default, asyncCallback, definition, error62, extend2, hasOwnProperty, inherits_default,
  isArray, isBoolean, isFunction, isNumber, isObject2, isString, locale3, logger_default, mergeConfig, peek,
  splitAccessPath, stringValue, transforms, vega_transforms_exports, writeConfig } from "./tedata-server-08-vega.mjs";
import { CanvasHandler, Scenegraph, isContinuous, isDiscrete, isDiscretizing, isQuantile, isValidScaleType,
  vega_view_transforms_exports } from "./tedata-server-09-vega.mjs";
import { RenderType, renderModule, vega_encode_exports, vega_force_exports, vega_geo_exports, vega_hierarchy_exports } from "./tedata-server-10-vega.mjs";
import { ariaLabel, background2, change, cursor, data2, dataref, defaultTooltip2, events2, finalize2, getState2,
  hover, initialize2, initializeEventConfig, initializeResize, insert, padding, parser2, remove, renderToCanvas,
  renderToImageURL, renderToSVG, resizeRenderer, resizeView, runtime, scale5, setCursor, setState2, timer2, trap,
  vega_crossfilter_exports, vega_label_exports, vega_regression_exports, vega_voronoi_exports, vega_wordcloud_exports,
  viewHeight, viewWidth, watchPixelRatio } from "./tedata-server-11-vega.mjs";
import { binRequiresRange, getFieldDef, isFieldOrDatumDefForTimeFormat, normalizeBin, valueExpr } from "./tedata-server-13-vega-lite.mjs";
// Bundle text, part 12 of 15
function View(spec, options) {
  let view2 = this;
  if (options = options || {}, Dataflow.call(view2), options.loader && view2.loader(options.loader), options.logger && view2.logger(options.logger), options.logLevel != null && view2.logLevel(options.logLevel), options.locale || spec.locale) {
    let loc = extend2({}, spec.locale, options.locale);
    view2.locale(locale3(loc.number, loc.time));
  }
  view2._el = null, view2._elBind = null, view2._renderType = options.renderer || RenderType.Canvas, view2._scenegraph = new Scenegraph();
  let root2 = view2._scenegraph.root;
  view2._renderer = null, view2._tooltip = options.tooltip || defaultTooltip2, view2._redraw = !0, view2._handler = new CanvasHandler().scene(root2), view2._globalCursor = !1, view2._preventDefault = !1, view2._timers = [], view2._eventListeners = [], view2._resizeListeners = [], view2._containerListeners = [], view2._resizeObserver = null, view2._eventConfig = initializeEventConfig(spec.eventConfig), view2.globalCursor(view2._eventConfig.globalCursor);
  let ctx = runtime(view2, spec, options.expr);
  view2._runtime = ctx, view2._signals = ctx.signals, view2._bind = (spec.bindings || []).map((_) => ({
    state: null,
    param: extend2({}, _)
  })), ctx.root && ctx.root.set(root2), root2.source = ctx.data.root.input, view2.pulse(ctx.data.root.input, view2.changeset().insert(root2.items)), view2._width = view2.width(), view2._height = view2.height(), view2._viewWidth = viewWidth(view2, view2._width), view2._viewHeight = viewHeight(view2, view2._height), view2._origin = [0, 0], view2._resize = 0, view2._autosize = 1, initializeResize(view2), background2(view2), cursor(view2), view2.description(spec.description), options.hover && view2.hover(), options.container && view2.initialize(options.container, options.bind), options.watchPixelRatio && view2._watchPixelRatio();
}
function lookupSignal(view2, name2) {
  return hasOwnProperty(view2._signals, name2) ? view2._signals[name2] : error62("Unrecognized signal name: " + stringValue(name2));
}
function findOperatorHandler(op, handler) {
  let h2 = (op._targets || []).filter((op2) => op2._update && op2._update.handler === handler);
  return h2.length ? h2[0] : null;
}
function addOperatorListener(view2, name2, op, handler) {
  let h2 = findOperatorHandler(op, handler);
  return h2 || (h2 = trap(view2, () => handler(name2, op.value)), h2.handler = handler, view2.on(op, null, h2)), view2;
}
function removeOperatorListener(view2, op, handler) {
  let h2 = findOperatorHandler(op, handler);
  return h2 && op._targets.remove(h2), view2;
}
inherits_default(View, Dataflow, {
  // -- DATAFLOW / RENDERING ----
  async evaluate(encode4, prerun, postrun) {
    if (await Dataflow.prototype.evaluate.call(this, encode4, prerun), this._redraw || this._resize)
      try {
        this._renderer && (this._resize && (this._resize = 0, resizeRenderer(this)), await this._renderer.renderAsync(this._scenegraph.root)), this._redraw = !1;
      } catch (e) {
        this.error(e);
      }
    return postrun && asyncCallback(this, postrun), this;
  },
  dirty(item) {
    this._redraw = !0, this._renderer && this._renderer.dirty(item);
  },
  // -- GET / SET ----
  description(text4) {
    if (arguments.length) {
      let desc = text4 != null ? text4 + "" : null;
      return desc !== this._desc && ariaLabel(this._el, this._desc = desc), this;
    }
    return this._desc;
  },
  container() {
    return this._el;
  },
  scenegraph() {
    return this._scenegraph;
  },
  origin() {
    return this._origin.slice();
  },
  signal(name2, value3, options) {
    let op = lookupSignal(this, name2);
    return arguments.length === 1 ? op.value : this.update(op, value3, options);
  },
  width(_) {
    return arguments.length ? this.signal("width", _) : this.signal("width");
  },
  height(_) {
    return arguments.length ? this.signal("height", _) : this.signal("height");
  },
  padding(_) {
    return arguments.length ? this.signal("padding", padding(_)) : padding(this.signal("padding"));
  },
  autosize(_) {
    return arguments.length ? this.signal("autosize", _) : this.signal("autosize");
  },
  background(_) {
    return arguments.length ? this.signal("background", _) : this.signal("background");
  },
  renderer(type3) {
    return arguments.length ? (renderModule(type3) || error62("Unrecognized renderer type: " + type3), type3 !== this._renderType && (this._renderType = type3, this._resetRenderer()), this) : this._renderType;
  },
  tooltip(handler) {
    return arguments.length ? (handler !== this._tooltip && (this._tooltip = handler, this._resetRenderer()), this) : this._tooltip;
  },
  loader(loader2) {
    return arguments.length ? (loader2 !== this._loader && (Dataflow.prototype.loader.call(this, loader2), this._resetRenderer()), this) : this._loader;
  },
  resize() {
    return this._autosize = 1, this.touch(lookupSignal(this, "autosize"));
  },
  _resetRenderer() {
    this._renderer && (this._renderer = null, this.initialize(this._el, this._elBind));
  },
  // -- SIZING ----
  _resizeView: resizeView,
  // -- EVENT HANDLING ----
  addEventListener(type3, handler, options) {
    let callback = handler;
    return options && options.trap === !1 || (callback = trap(this, handler), callback.raw = handler), this._handler.on(type3, callback), this;
  },
  removeEventListener(type3, handler) {
    for (var handlers2 = this._handler.handlers(type3), i = handlers2.length, h2, t; --i >= 0; )
      if (t = handlers2[i].type, h2 = handlers2[i].handler, type3 === t && (handler === h2 || handler === h2.raw)) {
        this._handler.off(t, h2);
        break;
      }
    return this;
  },
  addResizeListener(handler) {
    let l = this._resizeListeners;
    return l.includes(handler) || l.push(handler), this;
  },
  removeResizeListener(handler) {
    var l = this._resizeListeners, i = l.indexOf(handler);
    return i >= 0 && l.splice(i, 1), this;
  },
  addSignalListener(name2, handler) {
    return addOperatorListener(this, name2, lookupSignal(this, name2), handler);
  },
  removeSignalListener(name2, handler) {
    return removeOperatorListener(this, lookupSignal(this, name2), handler);
  },
  addDataListener(name2, handler) {
    return addOperatorListener(this, name2, dataref(this, name2).values, handler);
  },
  removeDataListener(name2, handler) {
    return removeOperatorListener(this, dataref(this, name2).values, handler);
  },
  globalCursor(_) {
    if (arguments.length) {
      if (this._globalCursor !== !!_) {
        let prev = setCursor(this, null);
        this._globalCursor = !!_, prev && setCursor(this, prev);
      }
      return this;
    } else
      return this._globalCursor;
  },
  preventDefault(_) {
    return arguments.length ? (this._preventDefault = _, this) : this._preventDefault;
  },
  timer: timer2,
  events: events2,
  finalize: finalize2,
  hover,
  // -- DATA ----
  data: data2,
  change,
  insert,
  remove,
  // -- SCALES --
  scale: scale5,
  // -- INITIALIZATION ----
  initialize: initialize2,
  // -- HEADLESS RENDERING ----
  toImageURL: renderToImageURL,
  toCanvas: renderToCanvas,
  toSVG: renderToSVG,
  // -- SAVE / RESTORE STATE ----
  getState: getState2,
  setState: setState2,
  // RE-RENDER ON ZOOM
  _watchPixelRatio: watchPixelRatio
});

// node_modules/vega-event-selector/build/vega-event-selector.js
var VIEW2 = "view";
var ILLEGAL2 = /[[\]{}]/, DEFAULT_MARKS = {
  "*": 1,
  arc: 1,
  area: 1,
  group: 1,
  image: 1,
  line: 1,
  path: 1,
  rect: 1,
  rule: 1,
  shape: 1,
  symbol: 1,
  text: 1,
  trail: 1
}, DEFAULT_SOURCE, MARKS;
function eventSelector(selector, source4, marks) {
  return DEFAULT_SOURCE = source4 || VIEW2, MARKS = marks || DEFAULT_MARKS, parseMerge(selector.trim()).map(parseSelector);
}
function isMarkType(type3) {
  return MARKS[type3];
}
function find3(s, i, endChar, pushChar, popChar) {
  let n = s.length, count4 = 0, c;
  for (; i < n; ++i) {
    if (c = s[i], !count4 && c === endChar) return i;
    popChar && popChar.includes(c) ? --count4 : pushChar && pushChar.includes(c) && ++count4;
  }
  return i;
}
function parseMerge(s) {
  let output4 = [], n = s.length, start = 0, i = 0;
  for (; i < n; )
    i = find3(s, i, ",", "[{", "]}"), output4.push(s.substring(start, i).trim()), start = ++i;
  if (output4.length === 0)
    throw "Empty event selector: " + s;
  return output4;
}
function parseSelector(s) {
  return s[0] === "[" ? parseBetween(s) : parseStream2(s);
}
function parseBetween(s) {
  let n = s.length, i = 1, b10;
  if (i = find3(s, i, "]", "[", "]"), i === n)
    throw "Empty between selector: " + s;
  if (b10 = parseMerge(s.substring(1, i)), b10.length !== 2)
    throw "Between selector must have two elements: " + s;
  if (s = s.slice(i + 1).trim(), s[0] !== ">")
    throw "Expected '>' after between selector: " + s;
  b10 = b10.map(parseSelector);
  let stream2 = parseSelector(s.slice(1).trim());
  return stream2.between ? {
    between: b10,
    stream: stream2
  } : (stream2.between = b10, stream2);
}
function parseStream2(s) {
  let stream2 = {
    source: DEFAULT_SOURCE
  }, source4 = [], throttle = [0, 0], markname = 0, start = 0, n = s.length, i = 0, j2, filter3;
  if (s[n - 1] === "}") {
    if (i = s.lastIndexOf("{"), i >= 0) {
      try {
        throttle = parseThrottle(s.substring(i + 1, n - 1));
      } catch {
        throw "Invalid throttle specification: " + s;
      }
      s = s.slice(0, i).trim(), n = s.length;
    } else throw "Unmatched right brace: " + s;
    i = 0;
  }
  if (!n) throw s;
  if (s[0] === "@" && (markname = ++i), j2 = find3(s, i, ":"), j2 < n && (source4.push(s.substring(start, j2).trim()), start = i = ++j2), i = find3(s, i, "["), i === n)
    source4.push(s.substring(start, n).trim());
  else if (source4.push(s.substring(start, i).trim()), filter3 = [], start = ++i, start === n) throw "Unmatched left bracket: " + s;
  for (; i < n; ) {
    if (i = find3(s, i, "]"), i === n) throw "Unmatched left bracket: " + s;
    if (filter3.push(s.substring(start, i).trim()), i < n - 1 && s[++i] !== "[") throw "Expected left bracket: " + s;
    start = ++i;
  }
  if (!(n = source4.length) || ILLEGAL2.test(source4[n - 1]))
    throw "Invalid event selector: " + s;
  return n > 1 ? (stream2.type = source4[1], markname ? stream2.markname = source4[0].slice(1) : isMarkType(source4[0]) ? stream2.marktype = source4[0] : stream2.source = source4[0]) : stream2.type = source4[0], stream2.type.slice(-1) === "!" && (stream2.consume = !0, stream2.type = stream2.type.slice(0, -1)), filter3 != null && (stream2.filter = filter3), throttle[0] && (stream2.throttle = throttle[0]), throttle[1] && (stream2.debounce = throttle[1]), stream2;
}
function parseThrottle(s) {
  let a = s.split(",");
  if (!s.length || a.length > 2) throw s;
  return a.map((_) => {
    let x5 = +_;
    if (x5 !== x5) throw s;
    return x5;
  });
}

// node_modules/vega-parser/build/vega-parser.js
function parseAutosize(spec) {
  return isObject2(spec) ? spec : {
    type: spec || "pad"
  };
}
var number10 = (_) => +_ || 0, paddingObject2 = (_) => ({
  top: _,
  bottom: _,
  left: _,
  right: _
});
function parsePadding(spec) {
  return isObject2(spec) ? spec.signal ? spec : {
    top: number10(spec.top),
    bottom: number10(spec.bottom),
    left: number10(spec.left),
    right: number10(spec.right)
  } : paddingObject2(number10(spec));
}
var encoder = (_) => isObject2(_) && !isArray(_) ? extend2({}, _) : {
  value: _
};
function addEncode(object4, name2, value3, set8) {
  return value3 != null ? (isObject2(value3) && !isArray(value3) || isArray(value3) && value3.length && isObject2(value3[0]) ? object4.update[name2] = value3 : object4[set8 || "enter"][name2] = {
    value: value3
  }, 1) : 0;
}
function addEncoders(object4, enter, update3) {
  for (let name2 in enter)
    addEncode(object4, name2, enter[name2]);
  for (let name2 in update3)
    addEncode(object4, name2, update3[name2], "update");
}
function extendEncode(encode4, extra, skip) {
  for (let name2 in extra)
    skip && hasOwnProperty(skip, name2) || (encode4[name2] = extend2(encode4[name2] || {}, extra[name2]));
  return encode4;
}
function has(key2, encode4) {
  return encode4 && (encode4.enter && encode4.enter[key2] || encode4.update && encode4.update[key2]);
}
var MarkRole = "mark", FrameRole2 = "frame", ScopeRole2 = "scope", AxisRole2 = "axis", AxisDomainRole = "axis-domain", AxisGridRole = "axis-grid", AxisLabelRole = "axis-label", AxisTickRole = "axis-tick", AxisTitleRole = "axis-title", LegendRole2 = "legend", LegendBandRole = "legend-band", LegendEntryRole = "legend-entry", LegendGradientRole = "legend-gradient", LegendLabelRole = "legend-label", LegendSymbolRole = "legend-symbol", LegendTitleRole = "legend-title", TitleRole2 = "title", TitleTextRole = "title-text", TitleSubtitleRole = "title-subtitle";
function applyDefaults(encode4, type3, role, style2, config2) {
  let defaults2 = {}, enter = {}, update3, key2, skip, props;
  key2 = "lineBreak", type3 === "text" && config2[key2] != null && !has(key2, encode4) && applyDefault(defaults2, key2, config2[key2]), (role == "legend" || String(role).startsWith("axis")) && (role = null), props = role === FrameRole2 ? config2.group : role === MarkRole ? extend2({}, config2.mark, config2[type3]) : null;
  for (key2 in props)
    skip = has(key2, encode4) || (key2 === "fill" || key2 === "stroke") && (has("fill", encode4) || has("stroke", encode4)), skip || applyDefault(defaults2, key2, props[key2]);
  array_default(style2).forEach((name2) => {
    let props2 = config2.style && config2.style[name2];
    for (let key3 in props2)
      has(key3, encode4) || applyDefault(defaults2, key3, props2[key3]);
  }), encode4 = extend2({}, encode4);
  for (key2 in defaults2)
    props = defaults2[key2], props.signal ? (update3 = update3 || {})[key2] = props : enter[key2] = props;
  return encode4.enter = extend2(enter, encode4.enter), update3 && (encode4.update = extend2(update3, encode4.update)), encode4;
}
function applyDefault(defaults2, key2, value3) {
  defaults2[key2] = value3 && value3.signal ? {
    signal: value3.signal
  } : {
    value: value3
  };
}
var scaleRef = (scale7) => isString(scale7) ? stringValue(scale7) : scale7.signal ? `(${scale7.signal})` : field2(scale7);
function entry$1(enc) {
  if (enc.gradient != null)
    return gradient2(enc);
  let value3 = enc.signal ? `(${enc.signal})` : enc.color ? color3(enc.color) : enc.field != null ? field2(enc.field) : enc.value !== void 0 ? stringValue(enc.value) : void 0;
  return enc.scale != null && (value3 = scale6(enc, value3)), value3 === void 0 && (value3 = null), enc.exponent != null && (value3 = `pow(${value3},${property(enc.exponent)})`), enc.mult != null && (value3 += `*${property(enc.mult)}`), enc.offset != null && (value3 += `+${property(enc.offset)}`), enc.round && (value3 = `round(${value3})`), value3;
}
var _color = (type3, x5, y5, z2) => `(${type3}(${[x5, y5, z2].map(entry$1).join(",")})+'')`;
function color3(enc) {
  return enc.c ? _color("hcl", enc.h, enc.c, enc.l) : enc.h || enc.s ? _color("hsl", enc.h, enc.s, enc.l) : enc.l || enc.a ? _color("lab", enc.l, enc.a, enc.b) : enc.r || enc.g || enc.b ? _color("rgb", enc.r, enc.g, enc.b) : null;
}
function gradient2(enc) {
  let args = [enc.start, enc.stop, enc.count].map((_) => _ == null ? null : stringValue(_));
  for (; args.length && peek(args) == null; ) args.pop();
  return args.unshift(scaleRef(enc.gradient)), `gradient(${args.join(",")})`;
}
function property(property2) {
  return isObject2(property2) ? "(" + entry$1(property2) + ")" : property2;
}
function field2(ref2) {
  return resolveField(isObject2(ref2) ? ref2 : {
    datum: ref2
  });
}
function resolveField(ref2) {
  let object4, level, field3;
  if (ref2.signal)
    object4 = "datum", field3 = ref2.signal;
  else if (ref2.group || ref2.parent) {
    for (level = Math.max(1, ref2.level || 1), object4 = "item"; level-- > 0; )
      object4 += ".mark.group";
    ref2.parent ? (field3 = ref2.parent, object4 += ".datum") : field3 = ref2.group;
  } else ref2.datum ? (object4 = "datum", field3 = ref2.datum) : error62("Invalid field reference: " + stringValue(ref2));
  return ref2.signal || (field3 = isString(field3) ? splitAccessPath(field3).map(stringValue).join("][") : resolveField(field3)), object4 + "[" + field3 + "]";
}
function scale6(enc, value3) {
  let scale7 = scaleRef(enc.scale);
  return enc.range != null ? value3 = `lerp(_range(${scale7}), ${+enc.range})` : (value3 !== void 0 && (value3 = `_scale(${scale7}, ${value3})`), enc.band && (value3 = (value3 ? value3 + "+" : "") + `_bandwidth(${scale7})` + (+enc.band == 1 ? "" : "*" + property(enc.band)), enc.extra && (value3 = `(datum.extra ? _scale(${scale7}, datum.extra.value) : ${value3})`)), value3 == null && (value3 = "0")), value3;
}
function rule2(enc) {
  let code = "";
  return enc.forEach((rule4) => {
    let value3 = entry$1(rule4);
    code += rule4.test ? `(${rule4.test})?${value3}:` : value3;
  }), peek(code) === ":" && (code += "null"), code;
}
function parseEncode(encode4, type3, role, style2, scope, params2) {
  let enc = {};
  params2 = params2 || {}, params2.encoders = {
    $encode: enc
  }, encode4 = applyDefaults(encode4, type3, role, style2, scope.config);
  for (let key2 in encode4)
    enc[key2] = parseBlock(encode4[key2], type3, params2, scope);
  return params2;
}
function parseBlock(block, marktype, params2, scope) {
  let channels = {}, fields = {};
  for (let name2 in block)
    block[name2] != null && (channels[name2] = parse$1(expr(block[name2]), scope, params2, fields));
  return {
    $expr: {
      marktype,
      channels
    },
    $fields: Object.keys(fields),
    $output: Object.keys(block)
  };
}
function expr(enc) {
  return isArray(enc) ? rule2(enc) : entry$1(enc);
}
function parse$1(code, scope, params2, fields) {
  let expr2 = parser2(code, scope);
  return expr2.$fields.forEach((name2) => fields[name2] = 1), extend2(params2, expr2.$params), expr2.$expr;
}
var OUTER = "outer", OUTER_INVALID = ["value", "update", "init", "react", "bind"];
function outerError(prefix, name2) {
  error62(prefix + ' for "outer" push: ' + stringValue(name2));
}
function parseSignal(signal, scope) {
  let name2 = signal.name;
  if (signal.push === OUTER)
    scope.signals[name2] || outerError("No prior signal definition", name2), OUTER_INVALID.forEach((prop) => {
      signal[prop] !== void 0 && outerError("Invalid property ", prop);
    });
  else {
    let op = scope.addSignal(name2, signal.value);
    signal.react === !1 && (op.react = !1), signal.bind && scope.addBinding(name2, signal.bind);
  }
}
function Entry(type3, value3, params2, parent) {
  this.id = -1, this.type = type3, this.value = value3, this.params = params2, parent && (this.parent = parent);
}
function entry(type3, value3, params2, parent) {
  return new Entry(type3, value3, params2, parent);
}
function operator(value3, params2) {
  return entry("operator", value3, params2);
}
function ref(op) {
  let ref2 = {
    $ref: op.id
  };
  return op.id < 0 && (op.refs = op.refs || []).push(ref2), ref2;
}
function fieldRef$1(field3, name2) {
  return name2 ? {
    $field: field3,
    $name: name2
  } : {
    $field: field3
  };
}
var keyFieldRef = fieldRef$1("key");
function compareRef(fields, orders) {
  return {
    $compare: fields,
    $order: orders
  };
}
function keyRef(fields, flat) {
  let ref2 = {
    $key: fields
  };
  return flat && (ref2.$flat = !0), ref2;
}
var Ascending = "ascending", Descending = "descending";
function sortKey(sort3) {
  return isObject2(sort3) ? (sort3.order === Descending ? "-" : "+") + aggrField(sort3.op, sort3.field) : "";
}
function aggrField(op, field3) {
  return (op && op.signal ? "$" + op.signal : op || "") + (op && field3 ? "_" : "") + (field3 && field3.signal ? "$" + field3.signal : field3?.replace(/\W+/g, "_").replace(/^_+|_+$/g, "") || "");
}
var Scope$1 = "scope", View2 = "view";
function isSignal(_) {
  return _ && _.signal;
}
function isExpr$1(_) {
  return _ && _.expr;
}
function hasSignal(_) {
  if (isSignal(_)) return !0;
  if (isObject2(_)) {
    for (let key2 in _)
      if (hasSignal(_[key2])) return !0;
  }
  return !1;
}
function value2(specValue, defaultValue) {
  return specValue ?? defaultValue;
}
function deref(v2) {
  return v2 && v2.signal || v2;
}
var Timer2 = "timer";
function parseStream3(stream2, scope) {
  return (stream2.merge ? mergeStream : stream2.stream ? nestedStream : stream2.type ? eventStream : error62("Invalid stream specification: " + stringValue(stream2)))(stream2, scope);
}
function eventSource(source4) {
  return source4 === Scope$1 ? View2 : source4 || View2;
}
function mergeStream(stream2, scope) {
  let list = stream2.merge.map((s) => parseStream3(s, scope)), entry2 = streamParameters({
    merge: list
  }, stream2, scope);
  return scope.addStream(entry2).id;
}
function nestedStream(stream2, scope) {
  let id3 = parseStream3(stream2.stream, scope), entry2 = streamParameters({
    stream: id3
  }, stream2, scope);
  return scope.addStream(entry2).id;
}
function eventStream(stream2, scope) {
  let id3;
  stream2.type === Timer2 ? (id3 = scope.event(Timer2, stream2.throttle), stream2 = {
    between: stream2.between,
    filter: stream2.filter
  }) : id3 = scope.event(eventSource(stream2.source), stream2.type);
  let entry2 = streamParameters({
    stream: id3
  }, stream2, scope);
  return Object.keys(entry2).length === 1 ? id3 : scope.addStream(entry2).id;
}
function streamParameters(entry2, stream2, scope) {
  let param2 = stream2.between;
  return param2 && (param2.length !== 2 && error62('Stream "between" parameter must have 2 entries: ' + stringValue(stream2)), entry2.between = [parseStream3(param2[0], scope), parseStream3(param2[1], scope)]), param2 = stream2.filter ? [].concat(stream2.filter) : [], (stream2.marktype || stream2.markname || stream2.markrole) && param2.push(filterMark(stream2.marktype, stream2.markname, stream2.markrole)), stream2.source === Scope$1 && param2.push("inScope(event.item)"), param2.length && (entry2.filter = parser2("(" + param2.join(")&&(") + ")", scope).$expr), (param2 = stream2.throttle) != null && (entry2.throttle = +param2), (param2 = stream2.debounce) != null && (entry2.debounce = +param2), stream2.consume && (entry2.consume = !0), entry2;
}
function filterMark(type3, name2, role) {
  let item = "event.item";
  return item + (type3 && type3 !== "*" ? "&&" + item + ".mark.marktype==='" + type3 + "'" : "") + (role ? "&&" + item + ".mark.role==='" + role + "'" : "") + (name2 ? "&&" + item + ".mark.name==='" + name2 + "'" : "");
}
var OP_VALUE_EXPR = {
  code: "_.$value",
  ast: {
    type: "Identifier",
    value: "value"
  }
};
function parseUpdate2(spec, scope, target3) {
  let encode4 = spec.encode, entry2 = {
    target: target3
  }, events3 = spec.events, update3 = spec.update, sources = [];
  events3 || error62("Signal update missing events specification."), isString(events3) && (events3 = eventSelector(events3, scope.isSubscope() ? Scope$1 : View2)), events3 = array_default(events3).filter((s) => s.signal || s.scale ? (sources.push(s), 0) : 1), sources.length > 1 && (sources = [mergeSources(sources)]), events3.length && sources.push(events3.length > 1 ? {
    merge: events3
  } : events3[0]), encode4 != null && (update3 && error62("Signal encode and update are mutually exclusive."), update3 = "encode(item()," + stringValue(encode4) + ")"), entry2.update = isString(update3) ? parser2(update3, scope) : update3.expr != null ? parser2(update3.expr, scope) : update3.value != null ? update3.value : update3.signal != null ? {
    $expr: OP_VALUE_EXPR,
    $params: {
      $value: scope.signalRef(update3.signal)
    }
  } : error62("Invalid signal update specification."), spec.force && (entry2.options = {
    force: !0
  }), sources.forEach((source4) => scope.addUpdate(extend2(streamSource(source4, scope), entry2)));
}
function streamSource(stream2, scope) {
  return {
    source: stream2.signal ? scope.signalRef(stream2.signal) : stream2.scale ? scope.scaleRef(stream2.scale) : parseStream3(stream2, scope)
  };
}
function mergeSources(sources) {
  return {
    signal: "[" + sources.map((s) => s.scale ? 'scale("' + s.scale + '")' : s.signal) + "]"
  };
}
function parseSignalUpdates(signal, scope) {
  let op = scope.getSignal(signal.name), expr2 = signal.update;
  signal.init && (expr2 ? error62("Signals can not include both init and update expressions.") : (expr2 = signal.init, op.initonly = !0)), expr2 && (expr2 = parser2(expr2, scope), op.update = expr2.$expr, op.params = expr2.$params), signal.on && signal.on.forEach((_) => parseUpdate2(_, scope, op.id));
}
var transform4 = (name2) => (params2, value3, parent) => entry(name2, value3, params2 || void 0, parent), Aggregate2 = transform4("aggregate"), AxisTicks2 = transform4("axisticks"), Bound2 = transform4("bound"), Collect2 = transform4("collect"), Compare2 = transform4("compare"), DataJoin2 = transform4("datajoin"), Encode2 = transform4("encode"), Expression2 = transform4("expression"), Facet2 = transform4("facet"), Field2 = transform4("field"), Key2 = transform4("key"), LegendEntries2 = transform4("legendentries"), Load2 = transform4("load"), Mark2 = transform4("mark"), MultiExtent2 = transform4("multiextent"), MultiValues2 = transform4("multivalues"), Overlap2 = transform4("overlap"), Params3 = transform4("params"), PreFacet2 = transform4("prefacet"), Projection2 = transform4("projection"), Proxy3 = transform4("proxy"), Relay2 = transform4("relay"), Render2 = transform4("render"), Scale2 = transform4("scale"), Sieve2 = transform4("sieve"), SortItems2 = transform4("sortitems"), ViewLayout2 = transform4("viewlayout"), Values2 = transform4("values"), FIELD_REF_ID = 0, MULTIDOMAIN_SORT_OPS = {
  min: "min",
  max: "max",
  count: "sum"
};
function initScale(spec, scope) {
  let type3 = spec.type || "linear";
  isValidScaleType(type3) || error62("Unrecognized scale type: " + stringValue(type3)), scope.addScale(spec.name, {
    type: type3,
    domain: void 0
  });
}
function parseScale(spec, scope) {
  let params2 = scope.getScale(spec.name).params, key2;
  params2.domain = parseScaleDomain(spec.domain, spec, scope), spec.range != null && (params2.range = parseScaleRange(spec, scope, params2)), spec.interpolate != null && parseScaleInterpolate(spec.interpolate, params2), spec.nice != null && (params2.nice = parseScaleNice(spec.nice, scope)), spec.bins != null && (params2.bins = parseScaleBins(spec.bins, scope));
  for (key2 in spec)
    hasOwnProperty(params2, key2) || key2 === "name" || (params2[key2] = parseLiteral(spec[key2], scope));
}
function parseLiteral(v2, scope) {
  return isObject2(v2) ? v2.signal ? scope.signalRef(v2.signal) : error62("Unsupported object: " + stringValue(v2)) : v2;
}
function parseArray(v2, scope) {
  return v2.signal ? scope.signalRef(v2.signal) : v2.map((v3) => parseLiteral(v3, scope));
}
function dataLookupError(name2) {
  error62("Can not find data set: " + stringValue(name2));
}
function parseScaleDomain(domain4, spec, scope) {
  if (!domain4) {
    (spec.domainMin != null || spec.domainMax != null) && error62("No scale domain defined for domainMin/domainMax to override.");
    return;
  }
  return domain4.signal ? scope.signalRef(domain4.signal) : (isArray(domain4) ? explicitDomain : domain4.fields ? multipleDomain : singularDomain)(domain4, spec, scope);
}
function explicitDomain(domain4, spec, scope) {
  return domain4.map((v2) => parseLiteral(v2, scope));
}
function singularDomain(domain4, spec, scope) {
  let data3 = scope.getData(domain4.data);
  return data3 || dataLookupError(domain4.data), isDiscrete(spec.type) ? data3.valuesRef(scope, domain4.field, parseSort(domain4.sort, !1)) : isQuantile(spec.type) ? data3.domainRef(scope, domain4.field) : data3.extentRef(scope, domain4.field);
}
function multipleDomain(domain4, spec, scope) {
  let data3 = domain4.data, fields = domain4.fields.reduce((dom, d) => (d = isString(d) ? {
    data: data3,
    field: d
  } : isArray(d) || d.signal ? fieldRef(d, scope) : d, dom.push(d), dom), []);
  return (isDiscrete(spec.type) ? ordinalMultipleDomain : isQuantile(spec.type) ? quantileMultipleDomain : numericMultipleDomain)(domain4, scope, fields);
}
function fieldRef(data3, scope) {
  let name2 = "_:vega:_" + FIELD_REF_ID++, coll = Collect2({});
  if (isArray(data3) && !data3.some(isSignal))
    coll.value = {
      $ingest: data3
    };
  else {
    let values3 = isArray(data3) ? "[" + data3.map((v2) => isSignal(v2) ? v2.signal : stringValue(v2)).join(",") + "]" : data3.signal, code = "setdata(" + stringValue(name2) + "," + values3 + ")";
    coll.params.input = scope.signalRef(code);
  }
  return scope.addDataPipeline(name2, [coll, Sieve2({})]), {
    data: name2,
    field: "data"
  };
}
function ordinalMultipleDomain(domain4, scope, fields) {
  let sort3 = parseSort(domain4.sort, !0), a, v2, counts = fields.map((f) => {
    let data3 = scope.getData(f.data);
    return data3 || dataLookupError(f.data), data3.countsRef(scope, f.field, sort3);
  }), p = {
    groupby: keyFieldRef,
    pulse: counts
  };
  sort3 && (a = sort3.op || "count", v2 = sort3.field ? aggrField(a, sort3.field) : "count", p.ops = [MULTIDOMAIN_SORT_OPS[a]], p.fields = [scope.fieldRef(v2)], p.as = [v2]), a = scope.add(Aggregate2(p));
  let c = scope.add(Collect2({
    pulse: ref(a)
  }));
  return v2 = scope.add(Values2({
    field: keyFieldRef,
    sort: scope.sortRef(sort3),
    pulse: ref(c)
  })), ref(v2);
}
function parseSort(sort3, multidomain) {
  return sort3 && (!sort3.field && !sort3.op ? isObject2(sort3) ? sort3.field = "key" : sort3 = {
    field: "key"
  } : !sort3.field && sort3.op !== "count" ? error62("No field provided for sort aggregate op: " + sort3.op) : multidomain && sort3.field && sort3.op && !MULTIDOMAIN_SORT_OPS[sort3.op] && error62("Multiple domain scales can not be sorted using " + sort3.op)), sort3;
}
function quantileMultipleDomain(domain4, scope, fields) {
  let values3 = fields.map((f) => {
    let data3 = scope.getData(f.data);
    return data3 || dataLookupError(f.data), data3.domainRef(scope, f.field);
  });
  return ref(scope.add(MultiValues2({
    values: values3
  })));
}
function numericMultipleDomain(domain4, scope, fields) {
  let extents = fields.map((f) => {
    let data3 = scope.getData(f.data);
    return data3 || dataLookupError(f.data), data3.extentRef(scope, f.field);
  });
  return ref(scope.add(MultiExtent2({
    extents
  })));
}
function parseScaleBins(v2, scope) {
  return v2.signal || isArray(v2) ? parseArray(v2, scope) : scope.objectProperty(v2);
}
function parseScaleNice(nice3, scope) {
  return nice3.signal ? scope.signalRef(nice3.signal) : isObject2(nice3) ? {
    interval: parseLiteral(nice3.interval),
    step: parseLiteral(nice3.step)
  } : parseLiteral(nice3);
}
function parseScaleInterpolate(interpolate3, params2) {
  params2.interpolate = parseLiteral(interpolate3.type || interpolate3), interpolate3.gamma != null && (params2.interpolateGamma = parseLiteral(interpolate3.gamma));
}
function parseScaleRange(spec, scope, params2) {
  let config2 = scope.config.range, range7 = spec.range;
  if (range7.signal)
    return scope.signalRef(range7.signal);
  if (isString(range7)) {
    if (config2 && hasOwnProperty(config2, range7))
      return spec = extend2({}, spec, {
        range: config2[range7]
      }), parseScaleRange(spec, scope, params2);
    range7 === "width" ? range7 = [0, {
      signal: "width"
    }] : range7 === "height" ? range7 = isDiscrete(spec.type) ? [0, {
      signal: "height"
    }] : [{
      signal: "height"
    }, 0] : error62("Unrecognized scale range value: " + stringValue(range7));
  } else if (range7.scheme) {
    params2.scheme = isArray(range7.scheme) ? parseArray(range7.scheme, scope) : parseLiteral(range7.scheme, scope), range7.extent && (params2.schemeExtent = parseArray(range7.extent, scope)), range7.count && (params2.schemeCount = parseLiteral(range7.count, scope));
    return;
  } else if (range7.step) {
    params2.rangeStep = parseLiteral(range7.step, scope);
    return;
  } else {
    if (isDiscrete(spec.type) && !isArray(range7))
      return parseScaleDomain(range7, spec, scope);
    isArray(range7) || error62("Unsupported range type: " + stringValue(range7));
  }
  return range7.map((v2) => (isArray(v2) ? parseArray : parseLiteral)(v2, scope));
}
function parseProjection(proj, scope) {
  let config2 = scope.config.projection || {}, params2 = {};
  for (let name2 in proj)
    name2 !== "name" && (params2[name2] = parseParameter$1(proj[name2], name2, scope));
  for (let name2 in config2)
    params2[name2] == null && (params2[name2] = parseParameter$1(config2[name2], name2, scope));
  scope.addProjection(proj.name, params2);
}
function parseParameter$1(_, name2, scope) {
  return isArray(_) ? _.map((_2) => parseParameter$1(_2, name2, scope)) : isObject2(_) ? _.signal ? scope.signalRef(_.signal) : name2 === "fit" ? _ : error62("Unsupported parameter object: " + stringValue(_)) : _;
}
var Top2 = "top", Left2 = "left", Right2 = "right", Bottom2 = "bottom", Center2 = "center", Vertical = "vertical", Start2 = "start", Middle2 = "middle", End2 = "end", Index = "index", Label2 = "label", Offset = "offset", Perc = "perc", Perc2 = "perc2", Value = "value", GuideLabelStyle = "guide-label", GuideTitleStyle = "guide-title", GroupTitleStyle = "group-title", GroupSubtitleStyle = "group-subtitle", Symbols2 = "symbol", Gradient2 = "gradient", Discrete2 = "discrete", Size = "size", Shape = "shape", Fill = "fill", Stroke = "stroke", StrokeWidth = "strokeWidth", StrokeDash = "strokeDash", Opacity = "opacity", LegendScales = [Size, Shape, Fill, Stroke, StrokeWidth, StrokeDash, Opacity], Skip3 = {
  name: 1,
  style: 1,
  interactive: 1
}, zero4 = {
  value: 0
}, one3 = {
  value: 1
}, GroupMark = "group", RectMark = "rect", RuleMark = "rule", SymbolMark = "symbol", TextMark = "text";
function guideGroup(mark) {
  return mark.type = GroupMark, mark.interactive = mark.interactive || !1, mark;
}
function lookup5(spec, config2) {
  let _ = (name2, dflt) => value2(spec[name2], value2(config2[name2], dflt));
  return _.isVertical = (s) => Vertical === value2(spec.direction, config2.direction || (s ? config2.symbolDirection : config2.gradientDirection)), _.gradientLength = () => value2(spec.gradientLength, config2.gradientLength || config2.gradientWidth), _.gradientThickness = () => value2(spec.gradientThickness, config2.gradientThickness || config2.gradientHeight), _.entryColumns = () => value2(spec.columns, value2(config2.columns, +_.isVertical(!0))), _;
}
function getEncoding(name2, encode4) {
  let v2 = encode4 && (encode4.update && encode4.update[name2] || encode4.enter && encode4.enter[name2]);
  return v2 && v2.signal ? v2 : v2 ? v2.value : null;
}
function getStyle(name2, scope, style2) {
  let s = scope.config.style[style2];
  return s && s[name2];
}
function anchorExpr(s, e, m) {
  return `item.anchor === '${Start2}' ? ${s} : item.anchor === '${End2}' ? ${e} : ${m}`;
}
var alignExpr$1 = anchorExpr(stringValue(Left2), stringValue(Right2), stringValue(Center2));
function tickBand(_) {
  let v2 = _("tickBand"), offset4 = _("tickOffset"), band2, extra;
  return v2 ? v2.signal ? (band2 = {
    signal: `(${v2.signal}) === 'extent' ? 1 : 0.5`
  }, extra = {
    signal: `(${v2.signal}) === 'extent'`
  }, isObject2(offset4) || (offset4 = {
    signal: `(${v2.signal}) === 'extent' ? 0 : ${offset4}`
  })) : v2 === "extent" ? (band2 = 1, extra = !0, offset4 = 0) : (band2 = 0.5, extra = !1) : (band2 = _("bandPosition"), extra = _("tickExtra")), {
    extra,
    band: band2,
    offset: offset4
  };
}
function extendOffset(value3, offset4) {
  return offset4 ? value3 ? isObject2(value3) ? Object.assign({}, value3, {
    offset: extendOffset(value3.offset, offset4)
  }) : {
    value: value3,
    offset: offset4
  } : offset4 : value3;
}
function guideMark(mark, extras) {
  return extras ? (mark.name = extras.name, mark.style = extras.style || mark.style, mark.interactive = !!extras.interactive, mark.encode = extendEncode(mark.encode, extras, Skip3)) : mark.interactive = !1, mark;
}
function legendGradient(spec, scale7, config2, userEncode) {
  let _ = lookup5(spec, config2), vertical = _.isVertical(), thickness = _.gradientThickness(), length3 = _.gradientLength(), enter, start, stop2, width2, height2;
  vertical ? (start = [0, 1], stop2 = [0, 0], width2 = thickness, height2 = length3) : (start = [0, 0], stop2 = [1, 0], width2 = length3, height2 = thickness);
  let encode4 = {
    enter: enter = {
      opacity: zero4,
      x: zero4,
      y: zero4,
      width: encoder(width2),
      height: encoder(height2)
    },
    update: extend2({}, enter, {
      opacity: one3,
      fill: {
        gradient: scale7,
        start,
        stop: stop2
      }
    }),
    exit: {
      opacity: zero4
    }
  };
  return addEncoders(encode4, {
    stroke: _("gradientStrokeColor"),
    strokeWidth: _("gradientStrokeWidth")
  }, {
    // update
    opacity: _("gradientOpacity")
  }), guideMark({
    type: RectMark,
    role: LegendGradientRole,
    encode: encode4
  }, userEncode);
}
function legendGradientDiscrete(spec, scale7, config2, userEncode, dataRef) {
  let _ = lookup5(spec, config2), vertical = _.isVertical(), thickness = _.gradientThickness(), length3 = _.gradientLength(), u4, v2, uu, vv, adjust = "";
  vertical ? (u4 = "y", uu = "y2", v2 = "x", vv = "width", adjust = "1-") : (u4 = "x", uu = "x2", v2 = "y", vv = "height");
  let enter = {
    opacity: zero4,
    fill: {
      scale: scale7,
      field: Value
    }
  };
  enter[u4] = {
    signal: adjust + "datum." + Perc,
    mult: length3
  }, enter[v2] = zero4, enter[uu] = {
    signal: adjust + "datum." + Perc2,
    mult: length3
  }, enter[vv] = encoder(thickness);
  let encode4 = {
    enter,
    update: extend2({}, enter, {
      opacity: one3
    }),
    exit: {
      opacity: zero4
    }
  };
  return addEncoders(encode4, {
    stroke: _("gradientStrokeColor"),
    strokeWidth: _("gradientStrokeWidth")
  }, {
    // update
    opacity: _("gradientOpacity")
  }), guideMark({
    type: RectMark,
    role: LegendBandRole,
    key: Value,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
var alignExpr = `datum.${Perc}<=0?"${Left2}":datum.${Perc}>=1?"${Right2}":"${Center2}"`, baselineExpr = `datum.${Perc}<=0?"${Bottom2}":datum.${Perc}>=1?"${Top2}":"${Middle2}"`;
function legendGradientLabels(spec, config2, userEncode, dataRef) {
  let _ = lookup5(spec, config2), vertical = _.isVertical(), thickness = encoder(_.gradientThickness()), length3 = _.gradientLength(), overlap = _("labelOverlap"), enter, update3, u4, v2, adjust = "", encode4 = {
    enter: enter = {
      opacity: zero4
    },
    update: update3 = {
      opacity: one3,
      text: {
        field: Label2
      }
    },
    exit: {
      opacity: zero4
    }
  };
  return addEncoders(encode4, {
    fill: _("labelColor"),
    fillOpacity: _("labelOpacity"),
    font: _("labelFont"),
    fontSize: _("labelFontSize"),
    fontStyle: _("labelFontStyle"),
    fontWeight: _("labelFontWeight"),
    limit: value2(spec.labelLimit, config2.gradientLabelLimit)
  }), vertical ? (enter.align = {
    value: "left"
  }, enter.baseline = update3.baseline = {
    signal: baselineExpr
  }, u4 = "y", v2 = "x", adjust = "1-") : (enter.align = update3.align = {
    signal: alignExpr
  }, enter.baseline = {
    value: "top"
  }, u4 = "x", v2 = "y"), enter[u4] = update3[u4] = {
    signal: adjust + "datum." + Perc,
    mult: length3
  }, enter[v2] = update3[v2] = thickness, thickness.offset = value2(spec.labelOffset, config2.gradientLabelOffset) || 0, overlap = overlap ? {
    separation: _("labelSeparation"),
    method: overlap,
    order: "datum." + Index
  } : void 0, guideMark({
    type: TextMark,
    role: LegendLabelRole,
    style: GuideLabelStyle,
    key: Value,
    from: dataRef,
    encode: encode4,
    overlap
  }, userEncode);
}
function legendSymbolGroups(spec, config2, userEncode, dataRef, columns) {
  let _ = lookup5(spec, config2), entries2 = userEncode.entries, interactive2 = !!(entries2 && entries2.interactive), name2 = entries2 ? entries2.name : void 0, height2 = _("clipHeight"), symbolOffset = _("symbolOffset"), valueRef = {
    data: "value"
  }, xSignal = `(${columns}) ? datum.${Offset} : datum.${Size}`, yEncode = height2 ? encoder(height2) : {
    field: Size
  }, index4 = `datum.${Index}`, ncols = `max(1, ${columns})`, encode4, enter, update3, nrows, sort3;
  yEncode.mult = 0.5, encode4 = {
    enter: enter = {
      opacity: zero4,
      x: {
        signal: xSignal,
        mult: 0.5,
        offset: symbolOffset
      },
      y: yEncode
    },
    update: update3 = {
      opacity: one3,
      x: enter.x,
      y: enter.y
    },
    exit: {
      opacity: zero4
    }
  };
  let baseFill = null, baseStroke = null;
  spec.fill || (baseFill = config2.symbolBaseFillColor, baseStroke = config2.symbolBaseStrokeColor), addEncoders(encode4, {
    fill: _("symbolFillColor", baseFill),
    shape: _("symbolType"),
    size: _("symbolSize"),
    stroke: _("symbolStrokeColor", baseStroke),
    strokeDash: _("symbolDash"),
    strokeDashOffset: _("symbolDashOffset"),
    strokeWidth: _("symbolStrokeWidth")
  }, {
    // update
    opacity: _("symbolOpacity")
  }), LegendScales.forEach((scale7) => {
    spec[scale7] && (update3[scale7] = enter[scale7] = {
      scale: spec[scale7],
      field: Value
    });
  });
  let symbols4 = guideMark({
    type: SymbolMark,
    role: LegendSymbolRole,
    key: Value,
    from: valueRef,
    clip: height2 ? !0 : void 0,
    encode: encode4
  }, userEncode.symbols), labelOffset = encoder(symbolOffset);
  labelOffset.offset = _("labelOffset"), encode4 = {
    enter: enter = {
      opacity: zero4,
      x: {
        signal: xSignal,
        offset: labelOffset
      },
      y: yEncode
    },
    update: update3 = {
      opacity: one3,
      text: {
        field: Label2
      },
      x: enter.x,
      y: enter.y
    },
    exit: {
      opacity: zero4
    }
  }, addEncoders(encode4, {
    align: _("labelAlign"),
    baseline: _("labelBaseline"),
    fill: _("labelColor"),
    fillOpacity: _("labelOpacity"),
    font: _("labelFont"),
    fontSize: _("labelFontSize"),
    fontStyle: _("labelFontStyle"),
    fontWeight: _("labelFontWeight"),
    limit: _("labelLimit")
  });
  let labels2 = guideMark({
    type: TextMark,
    role: LegendLabelRole,
    style: GuideLabelStyle,
    key: Value,
    from: valueRef,
    encode: encode4
  }, userEncode.labels);
  return encode4 = {
    enter: {
      noBound: {
        value: !height2
      },
      // ignore width/height in bounds calc
      width: zero4,
      height: height2 ? encoder(height2) : zero4,
      opacity: zero4
    },
    exit: {
      opacity: zero4
    },
    update: update3 = {
      opacity: one3,
      row: {
        signal: null
      },
      column: {
        signal: null
      }
    }
  }, _.isVertical(!0) ? (nrows = `ceil(item.mark.items.length / ${ncols})`, update3.row.signal = `${index4}%${nrows}`, update3.column.signal = `floor(${index4} / ${nrows})`, sort3 = {
    field: ["row", index4]
  }) : (update3.row.signal = `floor(${index4} / ${ncols})`, update3.column.signal = `${index4} % ${ncols}`, sort3 = {
    field: index4
  }), update3.column.signal = `(${columns})?${update3.column.signal}:${index4}`, dataRef = {
    facet: {
      data: dataRef,
      name: "value",
      groupby: Index
    }
  }, guideGroup({
    role: ScopeRole2,
    from: dataRef,
    encode: extendEncode(encode4, entries2, Skip3),
    marks: [symbols4, labels2],
    name: name2,
    interactive: interactive2,
    sort: sort3
  });
}
function legendSymbolLayout(spec, config2) {
  let _ = lookup5(spec, config2);
  return {
    align: _("gridAlign"),
    columns: _.entryColumns(),
    center: {
      row: !0,
      column: !1
    },
    padding: {
      row: _("rowPadding"),
      column: _("columnPadding")
    }
  };
}
var isL = 'item.orient === "left"', isR = 'item.orient === "right"', isLR = `(${isL} || ${isR})`, isVG = `datum.vgrad && ${isLR}`, baseline = anchorExpr('"top"', '"bottom"', '"middle"'), alignFlip = anchorExpr('"right"', '"left"', '"center"'), exprAlign = `datum.vgrad && ${isR} ? (${alignFlip}) : (${isLR} && !(datum.vgrad && ${isL})) ? "left" : ${alignExpr$1}`, exprAnchor = `item._anchor || (${isLR} ? "middle" : "start")`, exprAngle = `${isVG} ? (${isL} ? -90 : 90) : 0`, exprBaseline = `${isLR} ? (datum.vgrad ? (${isR} ? "bottom" : "top") : ${baseline}) : "top"`;
function legendTitle(spec, config2, userEncode, dataRef) {
  let _ = lookup5(spec, config2), encode4 = {
    enter: {
      opacity: zero4
    },
    update: {
      opacity: one3,
      x: {
        field: {
          group: "padding"
        }
      },
      y: {
        field: {
          group: "padding"
        }
      }
    },
    exit: {
      opacity: zero4
    }
  };
  return addEncoders(encode4, {
    orient: _("titleOrient"),
    _anchor: _("titleAnchor"),
    anchor: {
      signal: exprAnchor
    },
    angle: {
      signal: exprAngle
    },
    align: {
      signal: exprAlign
    },
    baseline: {
      signal: exprBaseline
    },
    text: spec.title,
    fill: _("titleColor"),
    fillOpacity: _("titleOpacity"),
    font: _("titleFont"),
    fontSize: _("titleFontSize"),
    fontStyle: _("titleFontStyle"),
    fontWeight: _("titleFontWeight"),
    limit: _("titleLimit"),
    lineHeight: _("titleLineHeight")
  }, {
    // require update
    align: _("titleAlign"),
    baseline: _("titleBaseline")
  }), guideMark({
    type: TextMark,
    role: LegendTitleRole,
    style: GuideTitleStyle,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
function clip3(clip4, scope) {
  let expr2;
  return isObject2(clip4) && (clip4.signal ? expr2 = clip4.signal : clip4.path ? expr2 = "pathShape(" + param(clip4.path) + ")" : clip4.sphere && (expr2 = "geoShape(" + param(clip4.sphere) + ', {type: "Sphere"})')), expr2 ? scope.signalRef(expr2) : !!clip4;
}
function param(value3) {
  return isObject2(value3) && value3.signal ? value3.signal : stringValue(value3);
}
function getRole(spec) {
  let role = spec.role || "";
  return role.startsWith("axis") || role.startsWith("legend") || role.startsWith("title") ? role : spec.type === GroupMark ? ScopeRole2 : role || MarkRole;
}
function definition2(spec) {
  return {
    marktype: spec.type,
    name: spec.name || void 0,
    role: spec.role || getRole(spec),
    zindex: +spec.zindex || void 0,
    aria: spec.aria,
    description: spec.description
  };
}
function interactive(spec, scope) {
  return spec && spec.signal ? scope.signalRef(spec.signal) : spec !== !1;
}
function parseTransform(spec, scope) {
  let def2 = definition(spec.type);
  def2 || error62("Unrecognized transform type: " + stringValue(spec.type));
  let t = entry(def2.type.toLowerCase(), null, parseParameters2(def2, spec, scope));
  return spec.signal && scope.addSignal(spec.signal, scope.proxy(t)), t.metadata = def2.metadata || {}, t;
}
function parseParameters2(def2, spec, scope) {
  let params2 = {}, n = def2.params.length;
  for (let i = 0; i < n; ++i) {
    let pdef = def2.params[i];
    params2[pdef.name] = parseParameter2(pdef, spec, scope);
  }
  return params2;
}
function parseParameter2(def2, spec, scope) {
  let type3 = def2.type, value3 = spec[def2.name];
  if (type3 === "index")
    return parseIndexParameter(def2, spec, scope);
  if (value3 === void 0) {
    def2.required && error62("Missing required " + stringValue(spec.type) + " parameter: " + stringValue(def2.name));
    return;
  } else {
    if (type3 === "param")
      return parseSubParameters(def2, spec, scope);
    if (type3 === "projection")
      return scope.projectionRef(spec[def2.name]);
  }
  return def2.array && !isSignal(value3) ? value3.map((v2) => parameterValue(def2, v2, scope)) : parameterValue(def2, value3, scope);
}
function parameterValue(def2, value3, scope) {
  let type3 = def2.type;
  if (isSignal(value3))
    return isExpr(type3) ? error62("Expression references can not be signals.") : isField(type3) ? scope.fieldRef(value3) : isCompare(type3) ? scope.compareRef(value3) : scope.signalRef(value3.signal);
  {
    let expr2 = def2.expr || isField(type3);
    return expr2 && outerExpr(value3) ? scope.exprRef(value3.expr, value3.as) : expr2 && outerField(value3) ? fieldRef$1(value3.field, value3.as) : isExpr(type3) ? parser2(value3, scope) : isData(type3) ? ref(scope.getData(value3).values) : isField(type3) ? fieldRef$1(value3) : isCompare(type3) ? scope.compareRef(value3) : value3;
  }
}
function parseIndexParameter(def2, spec, scope) {
  return isString(spec.from) || error62('Lookup "from" parameter must be a string literal.'), scope.getData(spec.from).lookupRef(scope, spec.key);
}
function parseSubParameters(def2, spec, scope) {
  let value3 = spec[def2.name];
  return def2.array ? (isArray(value3) || error62("Expected an array of sub-parameters. Instead: " + stringValue(value3)), value3.map((v2) => parseSubParameter(def2, v2, scope))) : parseSubParameter(def2, value3, scope);
}
function parseSubParameter(def2, value3, scope) {
  let n = def2.params.length, pdef;
  for (let i = 0; i < n; ++i) {
    pdef = def2.params[i];
    for (let k in pdef.key)
      if (pdef.key[k] !== value3[k]) {
        pdef = null;
        break;
      }
    if (pdef) break;
  }
  pdef || error62("Unsupported parameter: " + stringValue(value3));
  let params2 = extend2(parseParameters2(pdef, value3, scope), pdef.key);
  return ref(scope.add(Params3(params2)));
}
var outerExpr = (_) => _ && _.expr, outerField = (_) => _ && _.field, isData = (_) => _ === "data", isExpr = (_) => _ === "expr", isField = (_) => _ === "field", isCompare = (_) => _ === "compare";
function parseData$1(from, group2, scope) {
  let facet, key2, op, dataRef, parent;
  return from ? (facet = from.facet) && (group2 || error62("Only group marks can be faceted."), facet.field != null ? dataRef = parent = getDataRef(facet, scope) : (from.data ? parent = ref(scope.getData(from.data).aggregate) : (op = parseTransform(extend2({
    type: "aggregate",
    groupby: array_default(facet.groupby)
  }, facet.aggregate), scope), op.params.key = scope.keyRef(facet.groupby), op.params.pulse = getDataRef(facet, scope), dataRef = parent = ref(scope.add(op))), key2 = scope.keyRef(facet.groupby, !0))) : dataRef = ref(scope.add(Collect2(null, [{}]))), dataRef || (dataRef = getDataRef(from, scope)), {
    key: key2,
    pulse: dataRef,
    parent
  };
}
function getDataRef(from, scope) {
  return from.$ref ? from : from.data && from.data.$ref ? from.data : ref(scope.getData(from.data).output);
}
function DataScope(scope, input2, output4, values3, aggr) {
  this.scope = scope, this.input = input2, this.output = output4, this.values = values3, this.aggregate = aggr, this.index = {};
}
DataScope.fromEntries = function(scope, entries2) {
  let n = entries2.length, values3 = entries2[n - 1], output4 = entries2[n - 2], input2 = entries2[0], aggr = null, i = 1;
  for (input2 && input2.type === "load" && (input2 = entries2[1]), scope.add(entries2[0]); i < n; ++i)
    entries2[i].params.pulse = ref(entries2[i - 1]), scope.add(entries2[i]), entries2[i].type === "aggregate" && (aggr = entries2[i]);
  return new DataScope(scope, input2, output4, values3, aggr);
};
function fieldKey(field3) {
  return isString(field3) ? field3 : null;
}
function addSortField(scope, p, sort3) {
  let as = aggrField(sort3.op, sort3.field), s;
  if (p.ops) {
    for (let i = 0, n = p.as.length; i < n; ++i)
      if (p.as[i] === as) return;
  } else
    p.ops = ["count"], p.fields = [null], p.as = ["count"];
  sort3.op && (p.ops.push((s = sort3.op.signal) ? scope.signalRef(s) : sort3.op), p.fields.push(scope.fieldRef(sort3.field)), p.as.push(as));
}
function cache(scope, ds, name2, optype, field3, counts, index4) {
  let cache2 = ds[name2] || (ds[name2] = {}), sort3 = sortKey(counts), k = fieldKey(field3), v2, op;
  if (k != null && (scope = ds.scope, k = k + (sort3 ? "|" + sort3 : ""), v2 = cache2[k]), !v2) {
    let params2 = counts ? {
      field: keyFieldRef,
      pulse: ds.countsRef(scope, field3, counts)
    } : {
      field: scope.fieldRef(field3),
      pulse: ref(ds.output)
    };
    sort3 && (params2.sort = scope.sortRef(counts)), op = scope.add(entry(optype, void 0, params2)), index4 && (ds.index[field3] = op), v2 = ref(op), k != null && (cache2[k] = v2);
  }
  return v2;
}
DataScope.prototype = {
  countsRef(scope, field3, sort3) {
    let ds = this, cache2 = ds.counts || (ds.counts = {}), k = fieldKey(field3), v2, a, p;
    return k != null && (scope = ds.scope, v2 = cache2[k]), v2 ? sort3 && sort3.field && addSortField(scope, v2.agg.params, sort3) : (p = {
      groupby: scope.fieldRef(field3, "key"),
      pulse: ref(ds.output)
    }, sort3 && sort3.field && addSortField(scope, p, sort3), a = scope.add(Aggregate2(p)), v2 = scope.add(Collect2({
      pulse: ref(a)
    })), v2 = {
      agg: a,
      ref: ref(v2)
    }, k != null && (cache2[k] = v2)), v2.ref;
  },
  tuplesRef() {
    return ref(this.values);
  },
  extentRef(scope, field3) {
    return cache(scope, this, "extent", "extent", field3, !1);
  },
  domainRef(scope, field3) {
    return cache(scope, this, "domain", "values", field3, !1);
  },
  valuesRef(scope, field3, sort3) {
    return cache(scope, this, "vals", "values", field3, sort3 || !0);
  },
  lookupRef(scope, field3) {
    return cache(scope, this, "lookup", "tupleindex", field3, !1);
  },
  indataRef(scope, field3) {
    return cache(scope, this, "indata", "tupleindex", field3, !0, !0);
  }
};
function parseFacet(spec, scope, group2) {
  let facet = spec.from.facet, name2 = facet.name, data3 = getDataRef(facet, scope), op;
  facet.name || error62("Facet must have a name: " + stringValue(facet)), facet.data || error62("Facet must reference a data set: " + stringValue(facet)), facet.field ? op = scope.add(PreFacet2({
    field: scope.fieldRef(facet.field),
    pulse: data3
  })) : facet.groupby ? op = scope.add(Facet2({
    key: scope.keyRef(facet.groupby),
    group: ref(scope.proxy(group2.parent)),
    pulse: data3
  })) : error62("Facet must specify groupby or field: " + stringValue(facet));
  let subscope = scope.fork(), source4 = subscope.add(Collect2()), values3 = subscope.add(Sieve2({
    pulse: ref(source4)
  }));
  subscope.addData(name2, new DataScope(subscope, source4, source4, values3)), subscope.addSignal("parent", null), op.params.subflow = {
    $subflow: subscope.parse(spec).toRuntime()
  };
}
function parseSubflow(spec, scope, input2) {
  let op = scope.add(PreFacet2({
    pulse: input2.pulse
  })), subscope = scope.fork();
  subscope.add(Sieve2()), subscope.addSignal("parent", null), op.params.subflow = {
    $subflow: subscope.parse(spec).toRuntime()
  };
}
function parseTrigger(spec, scope, name2) {
  let remove2 = spec.remove, insert2 = spec.insert, toggle2 = spec.toggle, modify2 = spec.modify, values3 = spec.values, op = scope.add(operator()), update3 = "if(" + spec.trigger + ',modify("' + name2 + '",' + [insert2, remove2, toggle2, modify2, values3].map((_) => _ ?? "null").join(",") + "),0)", expr2 = parser2(update3, scope);
  op.update = expr2.$expr, op.params = expr2.$params;
}
function parseMark(spec, scope) {
  let role = getRole(spec), group2 = spec.type === GroupMark, facet = spec.from && spec.from.facet, overlap = spec.overlap, layout = spec.layout || role === ScopeRole2 || role === FrameRole2, ops2, op, store, enc, name2, layoutRef, boundRef, nested = role === MarkRole || layout || facet, input2 = parseData$1(spec.from, group2, scope);
  op = scope.add(DataJoin2({
    key: input2.key || (spec.key ? fieldRef$1(spec.key) : void 0),
    pulse: input2.pulse,
    clean: !group2
  }));
  let joinRef = ref(op);
  op = store = scope.add(Collect2({
    pulse: joinRef
  })), op = scope.add(Mark2({
    markdef: definition2(spec),
    interactive: interactive(spec.interactive, scope),
    clip: clip3(spec.clip, scope),
    context: {
      $context: !0
    },
    groups: scope.lookup(),
    parent: scope.signals.parent ? scope.signalRef("parent") : null,
    index: scope.markpath(),
    pulse: ref(op)
  }));
  let markRef = ref(op);
  op = enc = scope.add(Encode2(parseEncode(spec.encode, spec.type, role, spec.style, scope, {
    mod: !1,
    pulse: markRef
  }))), op.params.parent = scope.encode(), spec.transform && spec.transform.forEach((_) => {
    let tx = parseTransform(_, scope), md2 = tx.metadata;
    (md2.generates || md2.changes) && error62("Mark transforms should not generate new data."), md2.nomod || (enc.params.mod = !0), tx.params.pulse = ref(op), scope.add(op = tx);
  }), spec.sort && (op = scope.add(SortItems2({
    sort: scope.compareRef(spec.sort),
    pulse: ref(op)
  })));
  let encodeRef = ref(op);
  (facet || layout) && (layout = scope.add(ViewLayout2({
    layout: scope.objectProperty(spec.layout),
    legends: scope.legends,
    mark: markRef,
    pulse: encodeRef
  })), layoutRef = ref(layout));
  let bound2 = scope.add(Bound2({
    mark: markRef,
    pulse: layoutRef || encodeRef
  }));
  boundRef = ref(bound2), group2 && (nested && (ops2 = scope.operators, ops2.pop(), layout && ops2.pop()), scope.pushState(encodeRef, layoutRef || boundRef, joinRef), facet ? parseFacet(spec, scope, input2) : nested ? parseSubflow(spec, scope, input2) : scope.parse(spec), scope.popState(), nested && (layout && ops2.push(layout), ops2.push(bound2))), overlap && (boundRef = parseOverlap(overlap, boundRef, scope));
  let render = scope.add(Render2({
    pulse: boundRef
  })), sieve = scope.add(Sieve2({
    pulse: ref(render)
  }, void 0, scope.parent()));
  spec.name != null && (name2 = spec.name, scope.addData(name2, new DataScope(scope, store, render, sieve)), spec.on && spec.on.forEach((on2) => {
    (on2.insert || on2.remove || on2.toggle) && error62("Marks only support modify triggers."), parseTrigger(on2, scope, name2);
  }));
}
function parseOverlap(overlap, source4, scope) {
  let method2 = overlap.method, bound2 = overlap.bound, sep2 = overlap.separation, params2 = {
    separation: isSignal(sep2) ? scope.signalRef(sep2.signal) : sep2,
    method: isSignal(method2) ? scope.signalRef(method2.signal) : method2,
    pulse: source4
  };
  if (overlap.order && (params2.sort = scope.compareRef({
    field: overlap.order
  })), bound2) {
    let tol = bound2.tolerance;
    params2.boundTolerance = isSignal(tol) ? scope.signalRef(tol.signal) : +tol, params2.boundScale = scope.scaleRef(bound2.scale), params2.boundOrient = bound2.orient;
  }
  return ref(scope.add(Overlap2(params2)));
}
function parseLegend(spec, scope) {
  let config2 = scope.config.legend, encode4 = spec.encode || {}, _ = lookup5(spec, config2), legendEncode = encode4.legend || {}, name2 = legendEncode.name || void 0, interactive2 = legendEncode.interactive, style2 = legendEncode.style, scales2 = {}, scale7 = 0, entryLayout, params2, children4;
  LegendScales.forEach((s) => spec[s] ? (scales2[s] = spec[s], scale7 = scale7 || spec[s]) : 0), scale7 || error62("Missing valid scale for legend.");
  let type3 = legendType(spec, scope.scaleType(scale7)), datum2 = {
    title: spec.title != null,
    scales: scales2,
    type: type3,
    vgrad: type3 !== "symbol" && _.isVertical()
  }, dataRef = ref(scope.add(Collect2(null, [datum2]))), entryEncode = {
    enter: {
      x: {
        value: 0
      },
      y: {
        value: 0
      }
    }
  }, entryRef = ref(scope.add(LegendEntries2(params2 = {
    type: type3,
    scale: scope.scaleRef(scale7),
    count: scope.objectProperty(_("tickCount")),
    limit: scope.property(_("symbolLimit")),
    values: scope.objectProperty(spec.values),
    minstep: scope.property(spec.tickMinStep),
    formatType: scope.property(spec.formatType),
    formatSpecifier: scope.property(spec.format)
  })));
  return type3 === Gradient2 ? (children4 = [legendGradient(spec, scale7, config2, encode4.gradient), legendGradientLabels(spec, config2, encode4.labels, entryRef)], params2.count = params2.count || scope.signalRef(`max(2,2*floor((${deref(_.gradientLength())})/100))`)) : type3 === Discrete2 ? children4 = [legendGradientDiscrete(spec, scale7, config2, encode4.gradient, entryRef), legendGradientLabels(spec, config2, encode4.labels, entryRef)] : (entryLayout = legendSymbolLayout(spec, config2), children4 = [legendSymbolGroups(spec, config2, encode4, entryRef, deref(entryLayout.columns))], params2.size = sizeExpression(spec, scope, children4[0].marks)), children4 = [guideGroup({
    role: LegendEntryRole,
    from: dataRef,
    encode: entryEncode,
    marks: children4,
    layout: entryLayout,
    interactive: interactive2
  })], datum2.title && children4.push(legendTitle(spec, config2, encode4.title, dataRef)), parseMark(guideGroup({
    role: LegendRole2,
    from: dataRef,
    encode: extendEncode(buildLegendEncode(_, spec, config2), legendEncode, Skip3),
    marks: children4,
    aria: _("aria"),
    description: _("description"),
    zindex: _("zindex"),
    name: name2,
    interactive: interactive2,
    style: style2
  }), scope);
}
function legendType(spec, scaleType2) {
  let type3 = spec.type || Symbols2;
  return !spec.type && scaleCount(spec) === 1 && (spec.fill || spec.stroke) && (type3 = isContinuous(scaleType2) ? Gradient2 : isDiscretizing(scaleType2) ? Discrete2 : Symbols2), type3 !== Gradient2 ? type3 : isDiscretizing(scaleType2) ? Discrete2 : Gradient2;
}
function scaleCount(spec) {
  return LegendScales.reduce((count4, type3) => count4 + (spec[type3] ? 1 : 0), 0);
}
function buildLegendEncode(_, spec, config2) {
  let encode4 = {
    enter: {},
    update: {}
  };
  return addEncoders(encode4, {
    orient: _("orient"),
    offset: _("offset"),
    padding: _("padding"),
    titlePadding: _("titlePadding"),
    cornerRadius: _("cornerRadius"),
    fill: _("fillColor"),
    stroke: _("strokeColor"),
    strokeWidth: config2.strokeWidth,
    strokeDash: config2.strokeDash,
    x: _("legendX"),
    y: _("legendY"),
    // accessibility support
    format: spec.format,
    formatType: spec.formatType
  }), encode4;
}
function sizeExpression(spec, scope, marks) {
  let size = deref(getChannel("size", spec, marks)), strokeWidth = deref(getChannel("strokeWidth", spec, marks)), fontSize2 = deref(getFontSize(marks[1].encode, scope, GuideLabelStyle));
  return parser2(`max(ceil(sqrt(${size})+${strokeWidth}),${fontSize2})`, scope);
}
function getChannel(name2, spec, marks) {
  return spec[name2] ? `scale("${spec[name2]}",datum)` : getEncoding(name2, marks[0].encode);
}
function getFontSize(encode4, scope, style2) {
  return getEncoding("fontSize", encode4) || getStyle("fontSize", scope, style2);
}
var angleExpr = `item.orient==="${Left2}"?-90:item.orient==="${Right2}"?90:0`;
function parseTitle(spec, scope) {
  spec = isString(spec) ? {
    text: spec
  } : spec;
  let _ = lookup5(spec, scope.config.title), encode4 = spec.encode || {}, userEncode = encode4.group || {}, name2 = userEncode.name || void 0, interactive2 = userEncode.interactive, style2 = userEncode.style, children4 = [], datum2 = {}, dataRef = ref(scope.add(Collect2(null, [datum2])));
  return children4.push(buildTitle(spec, _, titleEncode(spec), dataRef)), spec.subtitle && children4.push(buildSubTitle(spec, _, encode4.subtitle, dataRef)), parseMark(guideGroup({
    role: TitleRole2,
    from: dataRef,
    encode: groupEncode(_, userEncode),
    marks: children4,
    aria: _("aria"),
    description: _("description"),
    zindex: _("zindex"),
    name: name2,
    interactive: interactive2,
    style: style2
  }), scope);
}
function titleEncode(spec) {
  let encode4 = spec.encode;
  return encode4 && encode4.title || extend2({
    name: spec.name,
    interactive: spec.interactive,
    style: spec.style
  }, encode4);
}
function groupEncode(_, userEncode) {
  let encode4 = {
    enter: {},
    update: {}
  };
  return addEncoders(encode4, {
    orient: _("orient"),
    anchor: _("anchor"),
    align: {
      signal: alignExpr$1
    },
    angle: {
      signal: angleExpr
    },
    limit: _("limit"),
    frame: _("frame"),
    offset: _("offset") || 0,
    padding: _("subtitlePadding")
  }), extendEncode(encode4, userEncode, Skip3);
}
function buildTitle(spec, _, userEncode, dataRef) {
  let zero6 = {
    value: 0
  }, text4 = spec.text, encode4 = {
    enter: {
      opacity: zero6
    },
    update: {
      opacity: {
        value: 1
      }
    },
    exit: {
      opacity: zero6
    }
  };
  return addEncoders(encode4, {
    text: text4,
    align: {
      signal: "item.mark.group.align"
    },
    angle: {
      signal: "item.mark.group.angle"
    },
    limit: {
      signal: "item.mark.group.limit"
    },
    baseline: "top",
    dx: _("dx"),
    dy: _("dy"),
    fill: _("color"),
    font: _("font"),
    fontSize: _("fontSize"),
    fontStyle: _("fontStyle"),
    fontWeight: _("fontWeight"),
    lineHeight: _("lineHeight")
  }, {
    // update
    align: _("align"),
    angle: _("angle"),
    baseline: _("baseline")
  }), guideMark({
    type: TextMark,
    role: TitleTextRole,
    style: GroupTitleStyle,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
function buildSubTitle(spec, _, userEncode, dataRef) {
  let zero6 = {
    value: 0
  }, text4 = spec.subtitle, encode4 = {
    enter: {
      opacity: zero6
    },
    update: {
      opacity: {
        value: 1
      }
    },
    exit: {
      opacity: zero6
    }
  };
  return addEncoders(encode4, {
    text: text4,
    align: {
      signal: "item.mark.group.align"
    },
    angle: {
      signal: "item.mark.group.angle"
    },
    limit: {
      signal: "item.mark.group.limit"
    },
    baseline: "top",
    dx: _("dx"),
    dy: _("dy"),
    fill: _("subtitleColor"),
    font: _("subtitleFont"),
    fontSize: _("subtitleFontSize"),
    fontStyle: _("subtitleFontStyle"),
    fontWeight: _("subtitleFontWeight"),
    lineHeight: _("subtitleLineHeight")
  }, {
    // update
    align: _("align"),
    angle: _("angle"),
    baseline: _("baseline")
  }), guideMark({
    type: TextMark,
    role: TitleSubtitleRole,
    style: GroupSubtitleStyle,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
function parseData(data3, scope) {
  let transforms2 = [];
  data3.transform && data3.transform.forEach((tx) => {
    transforms2.push(parseTransform(tx, scope));
  }), data3.on && data3.on.forEach((on2) => {
    parseTrigger(on2, scope, data3.name);
  }), scope.addDataPipeline(data3.name, analyze(data3, scope, transforms2));
}
function analyze(data3, scope, ops2) {
  let output4 = [], source4 = null, modify2 = !1, generate2 = !1, upstream, i, n, t, m;
  for (data3.values ? isSignal(data3.values) || hasSignal(data3.format) ? (output4.push(load2(scope, data3)), output4.push(source4 = collect())) : output4.push(source4 = collect({
    $ingest: data3.values,
    $format: data3.format
  })) : data3.url ? hasSignal(data3.url) || hasSignal(data3.format) ? (output4.push(load2(scope, data3)), output4.push(source4 = collect())) : output4.push(source4 = collect({
    $request: data3.url,
    $format: data3.format
  })) : data3.source && (source4 = upstream = array_default(data3.source).map((d) => ref(scope.getData(d).output)), output4.push(null)), i = 0, n = ops2.length; i < n; ++i)
    t = ops2[i], m = t.metadata, !source4 && !m.source && output4.push(source4 = collect()), output4.push(t), m.generates && (generate2 = !0), m.modifies && !generate2 && (modify2 = !0), m.source ? source4 = t : m.changes && (source4 = null);
  return upstream && (n = upstream.length - 1, output4[0] = Relay2({
    derive: modify2,
    pulse: n ? upstream : upstream[0]
  }), (modify2 || n) && output4.splice(1, 0, collect())), source4 || output4.push(collect()), output4.push(Sieve2({})), output4;
}
function collect(values3) {
  let s = Collect2({}, values3);
  return s.metadata = {
    source: !0
  }, s;
}
function load2(scope, data3) {
  return Load2({
    url: data3.url ? scope.property(data3.url) : void 0,
    async: data3.async ? scope.property(data3.async) : void 0,
    values: data3.values ? scope.property(data3.values) : void 0,
    format: scope.objectProperty(data3.format)
  });
}
var isX = (orient2) => orient2 === Bottom2 || orient2 === Top2, getSign = (orient2, a, b10) => isSignal(orient2) ? ifLeftTopExpr(orient2.signal, a, b10) : orient2 === Left2 || orient2 === Top2 ? a : b10, ifX = (orient2, a, b10) => isSignal(orient2) ? ifXEnc(orient2.signal, a, b10) : isX(orient2) ? a : b10, ifY = (orient2, a, b10) => isSignal(orient2) ? ifYEnc(orient2.signal, a, b10) : isX(orient2) ? b10 : a, ifTop = (orient2, a, b10) => isSignal(orient2) ? ifTopExpr(orient2.signal, a, b10) : orient2 === Top2 ? {
  value: a
} : {
  value: b10
}, ifRight = (orient2, a, b10) => isSignal(orient2) ? ifRightExpr(orient2.signal, a, b10) : orient2 === Right2 ? {
  value: a
} : {
  value: b10
}, ifXEnc = ($orient, a, b10) => ifEnc(`${$orient} === '${Top2}' || ${$orient} === '${Bottom2}'`, a, b10), ifYEnc = ($orient, a, b10) => ifEnc(`${$orient} !== '${Top2}' && ${$orient} !== '${Bottom2}'`, a, b10), ifLeftTopExpr = ($orient, a, b10) => ifExpr(`${$orient} === '${Left2}' || ${$orient} === '${Top2}'`, a, b10), ifTopExpr = ($orient, a, b10) => ifExpr(`${$orient} === '${Top2}'`, a, b10), ifRightExpr = ($orient, a, b10) => ifExpr(`${$orient} === '${Right2}'`, a, b10), ifEnc = (test2, a, b10) => (a = a != null ? encoder(a) : a, b10 = b10 != null ? encoder(b10) : b10, isSimple(a) && isSimple(b10) ? (a = a ? a.signal || stringValue(a.value) : null, b10 = b10 ? b10.signal || stringValue(b10.value) : null, {
  signal: `${test2} ? (${a}) : (${b10})`
}) : [extend2({
  test: test2
}, a)].concat(b10 || [])), isSimple = (enc) => enc == null || Object.keys(enc).length === 1, ifExpr = (test2, a, b10) => ({
  signal: `${test2} ? (${toExpr(a)}) : (${toExpr(b10)})`
}), ifOrient = ($orient, t, b10, l, r) => ({
  signal: (l != null ? `${$orient} === '${Left2}' ? (${toExpr(l)}) : ` : "") + (b10 != null ? `${$orient} === '${Bottom2}' ? (${toExpr(b10)}) : ` : "") + (r != null ? `${$orient} === '${Right2}' ? (${toExpr(r)}) : ` : "") + (t != null ? `${$orient} === '${Top2}' ? (${toExpr(t)}) : ` : "") + "(null)"
}), toExpr = (v2) => isSignal(v2) ? v2.signal : v2 == null ? null : stringValue(v2), mult = (sign3, value3) => value3 === 0 ? 0 : isSignal(sign3) ? {
  signal: `(${sign3.signal}) * ${value3}`
} : {
  value: sign3 * value3
}, patch = (value3, base) => {
  let s = value3.signal;
  return s && s.endsWith("(null)") ? {
    signal: s.slice(0, -6) + base.signal
  } : value3;
};
function fallback(prop, config2, axisConfig2, style2) {
  let styleProp;
  if (config2 && hasOwnProperty(config2, prop))
    return config2[prop];
  if (hasOwnProperty(axisConfig2, prop))
    return axisConfig2[prop];
  if (prop.startsWith("title")) {
    switch (prop) {
      case "titleColor":
        styleProp = "fill";
        break;
      case "titleFont":
      case "titleFontSize":
      case "titleFontWeight":
        styleProp = prop[5].toLowerCase() + prop.slice(6);
    }
    return style2[GuideTitleStyle][styleProp];
  } else if (prop.startsWith("label")) {
    switch (prop) {
      case "labelColor":
        styleProp = "fill";
        break;
      case "labelFont":
      case "labelFontSize":
        styleProp = prop[5].toLowerCase() + prop.slice(6);
    }
    return style2[GuideLabelStyle][styleProp];
  }
  return null;
}
function keys2(objects) {
  let map4 = {};
  for (let obj of objects)
    if (obj)
      for (let key2 in obj) map4[key2] = 1;
  return Object.keys(map4);
}
function axisConfig(spec, scope) {
  var config2 = scope.config, style2 = config2.style, axis = config2.axis, band2 = scope.scaleType(spec.scale) === "band" && config2.axisBand, orient2 = spec.orient, xy, or2, key2;
  if (isSignal(orient2)) {
    let xyKeys = keys2([config2.axisX, config2.axisY]), orientKeys = keys2([config2.axisTop, config2.axisBottom, config2.axisLeft, config2.axisRight]);
    xy = {};
    for (key2 of xyKeys)
      xy[key2] = ifX(orient2, fallback(key2, config2.axisX, axis, style2), fallback(key2, config2.axisY, axis, style2));
    or2 = {};
    for (key2 of orientKeys)
      or2[key2] = ifOrient(orient2.signal, fallback(key2, config2.axisTop, axis, style2), fallback(key2, config2.axisBottom, axis, style2), fallback(key2, config2.axisLeft, axis, style2), fallback(key2, config2.axisRight, axis, style2));
  } else
    xy = orient2 === Top2 || orient2 === Bottom2 ? config2.axisX : config2.axisY, or2 = config2["axis" + orient2[0].toUpperCase() + orient2.slice(1)];
  return xy || or2 || band2 ? extend2({}, axis, xy, or2, band2) : axis;
}
function axisDomain(spec, config2, userEncode, dataRef) {
  let _ = lookup5(spec, config2), orient2 = spec.orient, enter, update3, encode4 = {
    enter: enter = {
      opacity: zero4
    },
    update: update3 = {
      opacity: one3
    },
    exit: {
      opacity: zero4
    }
  };
  addEncoders(encode4, {
    stroke: _("domainColor"),
    strokeCap: _("domainCap"),
    strokeDash: _("domainDash"),
    strokeDashOffset: _("domainDashOffset"),
    strokeWidth: _("domainWidth"),
    strokeOpacity: _("domainOpacity")
  });
  let pos0 = position(spec, 0), pos1 = position(spec, 1);
  return enter.x = update3.x = ifX(orient2, pos0, zero4), enter.x2 = update3.x2 = ifX(orient2, pos1), enter.y = update3.y = ifY(orient2, pos0, zero4), enter.y2 = update3.y2 = ifY(orient2, pos1), guideMark({
    type: RuleMark,
    role: AxisDomainRole,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
function position(spec, pos) {
  return {
    scale: spec.scale,
    range: pos
  };
}
function axisGrid(spec, config2, userEncode, dataRef, band2) {
  let _ = lookup5(spec, config2), orient2 = spec.orient, vscale = spec.gridScale, sign3 = getSign(orient2, 1, -1), offset4 = offsetValue2(spec.offset, sign3), enter, exit, update3, encode4 = {
    enter: enter = {
      opacity: zero4
    },
    update: update3 = {
      opacity: one3
    },
    exit: exit = {
      opacity: zero4
    }
  };
  addEncoders(encode4, {
    stroke: _("gridColor"),
    strokeCap: _("gridCap"),
    strokeDash: _("gridDash"),
    strokeDashOffset: _("gridDashOffset"),
    strokeOpacity: _("gridOpacity"),
    strokeWidth: _("gridWidth")
  });
  let tickPos = {
    scale: spec.scale,
    field: Value,
    band: band2.band,
    extra: band2.extra,
    offset: band2.offset,
    round: _("tickRound")
  }, sz2 = ifX(orient2, {
    signal: "height"
  }, {
    signal: "width"
  }), gridStart = vscale ? {
    scale: vscale,
    range: 0,
    mult: sign3,
    offset: offset4
  } : {
    value: 0,
    offset: offset4
  }, gridEnd = vscale ? {
    scale: vscale,
    range: 1,
    mult: sign3,
    offset: offset4
  } : extend2(sz2, {
    mult: sign3,
    offset: offset4
  });
  return enter.x = update3.x = ifX(orient2, tickPos, gridStart), enter.y = update3.y = ifY(orient2, tickPos, gridStart), enter.x2 = update3.x2 = ifY(orient2, gridEnd), enter.y2 = update3.y2 = ifX(orient2, gridEnd), exit.x = ifX(orient2, tickPos), exit.y = ifY(orient2, tickPos), guideMark({
    type: RuleMark,
    role: AxisGridRole,
    key: Value,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
function offsetValue2(offset4, sign3) {
  if (sign3 !== 1) if (!isObject2(offset4))
    offset4 = isSignal(sign3) ? {
      signal: `(${sign3.signal}) * (${offset4 || 0})`
    } : sign3 * (offset4 || 0);
  else {
    let entry2 = offset4 = extend2({}, offset4);
    for (; entry2.mult != null; )
      if (isObject2(entry2.mult))
        entry2 = entry2.mult = extend2({}, entry2.mult);
      else
        return entry2.mult = isSignal(sign3) ? {
          signal: `(${entry2.mult}) * (${sign3.signal})`
        } : entry2.mult * sign3, offset4;
    entry2.mult = sign3;
  }
  return offset4;
}
function axisTicks(spec, config2, userEncode, dataRef, size, band2) {
  let _ = lookup5(spec, config2), orient2 = spec.orient, sign3 = getSign(orient2, -1, 1), enter, exit, update3, encode4 = {
    enter: enter = {
      opacity: zero4
    },
    update: update3 = {
      opacity: one3
    },
    exit: exit = {
      opacity: zero4
    }
  };
  addEncoders(encode4, {
    stroke: _("tickColor"),
    strokeCap: _("tickCap"),
    strokeDash: _("tickDash"),
    strokeDashOffset: _("tickDashOffset"),
    strokeOpacity: _("tickOpacity"),
    strokeWidth: _("tickWidth")
  });
  let tickSize = encoder(size);
  tickSize.mult = sign3;
  let tickPos = {
    scale: spec.scale,
    field: Value,
    band: band2.band,
    extra: band2.extra,
    offset: band2.offset,
    round: _("tickRound")
  };
  return update3.y = enter.y = ifX(orient2, zero4, tickPos), update3.y2 = enter.y2 = ifX(orient2, tickSize), exit.x = ifX(orient2, tickPos), update3.x = enter.x = ifY(orient2, zero4, tickPos), update3.x2 = enter.x2 = ifY(orient2, tickSize), exit.y = ifY(orient2, tickPos), guideMark({
    type: RuleMark,
    role: AxisTickRole,
    key: Value,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
function flushExpr(scale7, threshold2, a, b10, c) {
  return {
    signal: 'flush(range("' + scale7 + '"), scale("' + scale7 + '", datum.value), ' + threshold2 + "," + a + "," + b10 + "," + c + ")"
  };
}
function axisLabels(spec, config2, userEncode, dataRef, size, band2) {
  let _ = lookup5(spec, config2), orient2 = spec.orient, scale7 = spec.scale, sign3 = getSign(orient2, -1, 1), flush = deref(_("labelFlush")), flushOffset = deref(_("labelFlushOffset")), labelAlign = _("labelAlign"), labelBaseline = _("labelBaseline"), flushOn = flush === 0 || !!flush, update3, tickSize = encoder(size);
  tickSize.mult = sign3, tickSize.offset = encoder(_("labelPadding") || 0), tickSize.offset.mult = sign3;
  let tickPos = {
    scale: scale7,
    field: Value,
    band: 0.5,
    offset: extendOffset(band2.offset, _("labelOffset"))
  }, align2 = ifX(orient2, flushOn ? flushExpr(scale7, flush, '"left"', '"right"', '"center"') : {
    value: "center"
  }, ifRight(orient2, "left", "right")), baseline3 = ifX(orient2, ifTop(orient2, "bottom", "top"), flushOn ? flushExpr(scale7, flush, '"top"', '"bottom"', '"middle"') : {
    value: "middle"
  }), offsetExpr2 = flushExpr(scale7, flush, `-(${flushOffset})`, flushOffset, 0);
  flushOn = flushOn && flushOffset;
  let enter = {
    opacity: zero4,
    x: ifX(orient2, tickPos, tickSize),
    y: ifY(orient2, tickPos, tickSize)
  }, encode4 = {
    enter,
    update: update3 = {
      opacity: one3,
      text: {
        field: Label2
      },
      x: enter.x,
      y: enter.y,
      align: align2,
      baseline: baseline3
    },
    exit: {
      opacity: zero4,
      x: enter.x,
      y: enter.y
    }
  };
  addEncoders(encode4, {
    dx: !labelAlign && flushOn ? ifX(orient2, offsetExpr2) : null,
    dy: !labelBaseline && flushOn ? ifY(orient2, offsetExpr2) : null
  }), addEncoders(encode4, {
    angle: _("labelAngle"),
    fill: _("labelColor"),
    fillOpacity: _("labelOpacity"),
    font: _("labelFont"),
    fontSize: _("labelFontSize"),
    fontWeight: _("labelFontWeight"),
    fontStyle: _("labelFontStyle"),
    limit: _("labelLimit"),
    lineHeight: _("labelLineHeight")
  }, {
    align: labelAlign,
    baseline: labelBaseline
  });
  let bound2 = _("labelBound"), overlap = _("labelOverlap");
  return overlap = overlap || bound2 ? {
    separation: _("labelSeparation"),
    method: overlap,
    order: "datum.index",
    bound: bound2 ? {
      scale: scale7,
      orient: orient2,
      tolerance: bound2
    } : null
  } : void 0, update3.align !== align2 && (update3.align = patch(update3.align, align2)), update3.baseline !== baseline3 && (update3.baseline = patch(update3.baseline, baseline3)), guideMark({
    type: TextMark,
    role: AxisLabelRole,
    style: GuideLabelStyle,
    key: Value,
    from: dataRef,
    encode: encode4,
    overlap
  }, userEncode);
}
function axisTitle(spec, config2, userEncode, dataRef) {
  let _ = lookup5(spec, config2), orient2 = spec.orient, sign3 = getSign(orient2, -1, 1), enter, update3, encode4 = {
    enter: enter = {
      opacity: zero4,
      anchor: encoder(_("titleAnchor", null)),
      align: {
        signal: alignExpr$1
      }
    },
    update: update3 = extend2({}, enter, {
      opacity: one3,
      text: encoder(spec.title)
    }),
    exit: {
      opacity: zero4
    }
  }, titlePos = {
    signal: `lerp(range("${spec.scale}"), ${anchorExpr(0, 1, 0.5)})`
  };
  return update3.x = ifX(orient2, titlePos), update3.y = ifY(orient2, titlePos), enter.angle = ifX(orient2, zero4, mult(sign3, 90)), enter.baseline = ifX(orient2, ifTop(orient2, Bottom2, Top2), {
    value: Bottom2
  }), update3.angle = enter.angle, update3.baseline = enter.baseline, addEncoders(encode4, {
    fill: _("titleColor"),
    fillOpacity: _("titleOpacity"),
    font: _("titleFont"),
    fontSize: _("titleFontSize"),
    fontStyle: _("titleFontStyle"),
    fontWeight: _("titleFontWeight"),
    limit: _("titleLimit"),
    lineHeight: _("titleLineHeight")
  }, {
    // require update
    align: _("titleAlign"),
    angle: _("titleAngle"),
    baseline: _("titleBaseline")
  }), autoLayout(_, orient2, encode4, userEncode), encode4.update.align = patch(encode4.update.align, enter.align), encode4.update.angle = patch(encode4.update.angle, enter.angle), encode4.update.baseline = patch(encode4.update.baseline, enter.baseline), guideMark({
    type: TextMark,
    role: AxisTitleRole,
    style: GuideTitleStyle,
    from: dataRef,
    encode: encode4
  }, userEncode);
}
function autoLayout(_, orient2, encode4, userEncode) {
  let auto = (value3, dim) => value3 != null ? (encode4.update[dim] = patch(encoder(value3), encode4.update[dim]), !1) : !has(dim, userEncode), autoY = auto(_("titleX"), "x"), autoX = auto(_("titleY"), "y");
  encode4.enter.auto = autoX === autoY ? encoder(autoX) : ifX(orient2, encoder(autoX), encoder(autoY));
}
function parseAxis(spec, scope) {
  let config2 = axisConfig(spec, scope), encode4 = spec.encode || {}, axisEncode = encode4.axis || {}, name2 = axisEncode.name || void 0, interactive2 = axisEncode.interactive, style2 = axisEncode.style, _ = lookup5(spec, config2), band2 = tickBand(_), datum2 = {
    scale: spec.scale,
    ticks: !!_("ticks"),
    labels: !!_("labels"),
    grid: !!_("grid"),
    domain: !!_("domain"),
    title: spec.title != null
  }, dataRef = ref(scope.add(Collect2({}, [datum2]))), ticksRef = ref(scope.add(AxisTicks2({
    scale: scope.scaleRef(spec.scale),
    extra: scope.property(band2.extra),
    count: scope.objectProperty(spec.tickCount),
    values: scope.objectProperty(spec.values),
    minstep: scope.property(spec.tickMinStep),
    formatType: scope.property(spec.formatType),
    formatSpecifier: scope.property(spec.format)
  }))), children4 = [], size;
  return datum2.grid && children4.push(axisGrid(spec, config2, encode4.grid, ticksRef, band2)), datum2.ticks && (size = _("tickSize"), children4.push(axisTicks(spec, config2, encode4.ticks, ticksRef, size, band2))), datum2.labels && (size = datum2.ticks ? size : 0, children4.push(axisLabels(spec, config2, encode4.labels, ticksRef, size, band2))), datum2.domain && children4.push(axisDomain(spec, config2, encode4.domain, dataRef)), datum2.title && children4.push(axisTitle(spec, config2, encode4.title, dataRef)), parseMark(guideGroup({
    role: AxisRole2,
    from: dataRef,
    encode: extendEncode(buildAxisEncode(_, spec), axisEncode, Skip3),
    marks: children4,
    aria: _("aria"),
    description: _("description"),
    zindex: _("zindex"),
    name: name2,
    interactive: interactive2,
    style: style2
  }), scope);
}
function buildAxisEncode(_, spec) {
  let encode4 = {
    enter: {},
    update: {}
  };
  return addEncoders(encode4, {
    orient: _("orient"),
    offset: _("offset") || 0,
    position: value2(spec.position, 0),
    titlePadding: _("titlePadding"),
    minExtent: _("minExtent"),
    maxExtent: _("maxExtent"),
    range: {
      signal: `abs(span(range("${spec.scale}")))`
    },
    translate: _("translate"),
    // accessibility support
    format: spec.format,
    formatType: spec.formatType
  }), encode4;
}
function parseScope(spec, scope, preprocessed) {
  let signals = array_default(spec.signals), scales2 = array_default(spec.scales);
  return preprocessed || signals.forEach((_) => parseSignal(_, scope)), array_default(spec.projections).forEach((_) => parseProjection(_, scope)), scales2.forEach((_) => initScale(_, scope)), array_default(spec.data).forEach((_) => parseData(_, scope)), scales2.forEach((_) => parseScale(_, scope)), (preprocessed || signals).forEach((_) => parseSignalUpdates(_, scope)), array_default(spec.axes).forEach((_) => parseAxis(_, scope)), array_default(spec.marks).forEach((_) => parseMark(_, scope)), array_default(spec.legends).forEach((_) => parseLegend(_, scope)), spec.title && parseTitle(spec.title, scope), scope.parseLambdas(), scope;
}
var rootEncode = (spec) => extendEncode({
  enter: {
    x: {
      value: 0
    },
    y: {
      value: 0
    }
  },
  update: {
    width: {
      signal: "width"
    },
    height: {
      signal: "height"
    }
  }
}, spec);
function parseView(spec, scope) {
  let config2 = scope.config, root2 = ref(scope.root = scope.add(operator())), signals = collectSignals(spec, config2);
  signals.forEach((_) => parseSignal(_, scope)), scope.description = spec.description || config2.description, scope.eventConfig = config2.events, scope.legends = scope.objectProperty(config2.legend && config2.legend.layout), scope.locale = config2.locale;
  let input2 = scope.add(Collect2()), encode4 = scope.add(Encode2(parseEncode(rootEncode(spec.encode), GroupMark, FrameRole2, spec.style, scope, {
    pulse: ref(input2)
  }))), parent = scope.add(ViewLayout2({
    layout: scope.objectProperty(spec.layout),
    legends: scope.legends,
    autosize: scope.signalRef("autosize"),
    mark: root2,
    pulse: ref(encode4)
  }));
  scope.operators.pop(), scope.pushState(ref(encode4), ref(parent), null), parseScope(spec, scope, signals), scope.operators.push(parent);
  let op = scope.add(Bound2({
    mark: root2,
    pulse: ref(parent)
  }));
  return op = scope.add(Render2({
    pulse: ref(op)
  })), op = scope.add(Sieve2({
    pulse: ref(op)
  })), scope.addData("root", new DataScope(scope, input2, input2, op)), scope;
}
function signalObject(name2, value3) {
  return value3 && value3.signal ? {
    name: name2,
    update: value3.signal
  } : {
    name: name2,
    value: value3
  };
}
function collectSignals(spec, config2) {
  let _ = (name2) => value2(spec[name2], config2[name2]), signals = [signalObject("background", _("background")), signalObject("autosize", parseAutosize(_("autosize"))), signalObject("padding", parsePadding(_("padding"))), signalObject("width", _("width") || 0), signalObject("height", _("height") || 0)], pre = signals.reduce((p, s) => (p[s.name] = s, p), {}), map4 = {};
  return array_default(spec.signals).forEach((s) => {
    hasOwnProperty(pre, s.name) ? s = extend2(pre[s.name], s) : signals.push(s), map4[s.name] = s;
  }), array_default(config2.signals).forEach((s) => {
    !hasOwnProperty(map4, s.name) && !hasOwnProperty(pre, s.name) && signals.push(s);
  }), signals;
}
function Scope(config2, options) {
  this.config = config2 || {}, this.options = options || {}, this.bindings = [], this.field = {}, this.signals = {}, this.lambdas = {}, this.scales = {}, this.events = {}, this.data = {}, this.streams = [], this.updates = [], this.operators = [], this.eventConfig = null, this.locale = null, this._id = 0, this._subid = 0, this._nextsub = [0], this._parent = [], this._encode = [], this._lookup = [], this._markpath = [];
}
function Subscope(scope) {
  this.config = scope.config, this.options = scope.options, this.legends = scope.legends, this.field = Object.create(scope.field), this.signals = Object.create(scope.signals), this.lambdas = Object.create(scope.lambdas), this.scales = Object.create(scope.scales), this.events = Object.create(scope.events), this.data = Object.create(scope.data), this.streams = [], this.updates = [], this.operators = [], this._id = 0, this._subid = ++scope._nextsub[0], this._nextsub = scope._nextsub, this._parent = scope._parent.slice(), this._encode = scope._encode.slice(), this._lookup = scope._lookup.slice(), this._markpath = scope._markpath;
}
Scope.prototype = Subscope.prototype = {
  parse(spec) {
    return parseScope(spec, this);
  },
  fork() {
    return new Subscope(this);
  },
  isSubscope() {
    return this._subid > 0;
  },
  toRuntime() {
    return this.finish(), {
      description: this.description,
      operators: this.operators,
      streams: this.streams,
      updates: this.updates,
      bindings: this.bindings,
      eventConfig: this.eventConfig,
      locale: this.locale
    };
  },
  id() {
    return (this._subid ? this._subid + ":" : 0) + this._id++;
  },
  add(op) {
    return this.operators.push(op), op.id = this.id(), op.refs && (op.refs.forEach((ref2) => {
      ref2.$ref = op.id;
    }), op.refs = null), op;
  },
  proxy(op) {
    let vref = op instanceof Entry ? ref(op) : op;
    return this.add(Proxy3({
      value: vref
    }));
  },
  addStream(stream2) {
    return this.streams.push(stream2), stream2.id = this.id(), stream2;
  },
  addUpdate(update3) {
    return this.updates.push(update3), update3;
  },
  // Apply metadata
  finish() {
    let name2, ds;
    this.root && (this.root.root = !0);
    for (name2 in this.signals)
      this.signals[name2].signal = name2;
    for (name2 in this.scales)
      this.scales[name2].scale = name2;
    function annotate2(op, name3, type3) {
      let data3, list;
      op && (data3 = op.data || (op.data = {}), list = data3[name3] || (data3[name3] = []), list.push(type3));
    }
    for (name2 in this.data) {
      ds = this.data[name2], annotate2(ds.input, name2, "input"), annotate2(ds.output, name2, "output"), annotate2(ds.values, name2, "values");
      for (let field3 in ds.index)
        annotate2(ds.index[field3], name2, "index:" + field3);
    }
    return this;
  },
  // ----
  pushState(encode4, parent, lookup6) {
    this._encode.push(ref(this.add(Sieve2({
      pulse: encode4
    })))), this._parent.push(parent), this._lookup.push(lookup6 ? ref(this.proxy(lookup6)) : null), this._markpath.push(-1);
  },
  popState() {
    this._encode.pop(), this._parent.pop(), this._lookup.pop(), this._markpath.pop();
  },
  parent() {
    return peek(this._parent);
  },
  encode() {
    return peek(this._encode);
  },
  lookup() {
    return peek(this._lookup);
  },
  markpath() {
    let p = this._markpath;
    return ++p[p.length - 1];
  },
  // ----
  fieldRef(field3, name2) {
    if (isString(field3)) return fieldRef$1(field3, name2);
    field3.signal || error62("Unsupported field reference: " + stringValue(field3));
    let s = field3.signal, f = this.field[s];
    if (!f) {
      let params2 = {
        name: this.signalRef(s)
      };
      name2 && (params2.as = name2), this.field[s] = f = ref(this.add(Field2(params2)));
    }
    return f;
  },
  compareRef(cmp) {
    let signal = !1, check2 = (_) => isSignal(_) ? (signal = !0, this.signalRef(_.signal)) : isExpr$1(_) ? (signal = !0, this.exprRef(_.expr)) : _, fields = array_default(cmp.field).map(check2), orders = array_default(cmp.order).map(check2);
    return signal ? ref(this.add(Compare2({
      fields,
      orders
    }))) : compareRef(fields, orders);
  },
  keyRef(fields, flat) {
    let signal = !1, check2 = (_) => isSignal(_) ? (signal = !0, ref(sig[_.signal])) : _, sig = this.signals;
    return fields = array_default(fields).map(check2), signal ? ref(this.add(Key2({
      fields,
      flat
    }))) : keyRef(fields, flat);
  },
  sortRef(sort3) {
    if (!sort3) return sort3;
    let a = aggrField(sort3.op, sort3.field), o = sort3.order || Ascending;
    return o.signal ? ref(this.add(Compare2({
      fields: a,
      orders: this.signalRef(o.signal)
    }))) : compareRef(a, o);
  },
  // ----
  event(source4, type3) {
    let key2 = source4 + ":" + type3;
    if (!this.events[key2]) {
      let id3 = this.id();
      this.streams.push({
        id: id3,
        source: source4,
        type: type3
      }), this.events[key2] = id3;
    }
    return this.events[key2];
  },
  // ----
  hasOwnSignal(name2) {
    return hasOwnProperty(this.signals, name2);
  },
  addSignal(name2, value3) {
    this.hasOwnSignal(name2) && error62("Duplicate signal name: " + stringValue(name2));
    let op = value3 instanceof Entry ? value3 : this.add(operator(value3));
    return this.signals[name2] = op;
  },
  getSignal(name2) {
    return this.signals[name2] || error62("Unrecognized signal name: " + stringValue(name2)), this.signals[name2];
  },
  signalRef(s) {
    return this.signals[s] ? ref(this.signals[s]) : (hasOwnProperty(this.lambdas, s) || (this.lambdas[s] = this.add(operator(null))), ref(this.lambdas[s]));
  },
  parseLambdas() {
    let code = Object.keys(this.lambdas);
    for (let i = 0, n = code.length; i < n; ++i) {
      let s = code[i], e = parser2(s, this), op = this.lambdas[s];
      op.params = e.$params, op.update = e.$expr;
    }
  },
  property(spec) {
    return spec && spec.signal ? this.signalRef(spec.signal) : spec;
  },
  objectProperty(spec) {
    return !spec || !isObject2(spec) ? spec : this.signalRef(spec.signal || propertyLambda(spec));
  },
  exprRef(code, name2) {
    let params2 = {
      expr: parser2(code, this)
    };
    return name2 && (params2.expr.$name = name2), ref(this.add(Expression2(params2)));
  },
  addBinding(name2, bind3) {
    this.bindings || error62("Nested signals do not support binding: " + stringValue(name2)), this.bindings.push(extend2({
      signal: name2
    }, bind3));
  },
  // ----
  addScaleProj(name2, transform5) {
    hasOwnProperty(this.scales, name2) && error62("Duplicate scale or projection name: " + stringValue(name2)), this.scales[name2] = this.add(transform5);
  },
  addScale(name2, params2) {
    this.addScaleProj(name2, Scale2(params2));
  },
  addProjection(name2, params2) {
    this.addScaleProj(name2, Projection2(params2));
  },
  getScale(name2) {
    return this.scales[name2] || error62("Unrecognized scale name: " + stringValue(name2)), this.scales[name2];
  },
  scaleRef(name2) {
    return ref(this.getScale(name2));
  },
  scaleType(name2) {
    return this.getScale(name2).params.type;
  },
  projectionRef(name2) {
    return this.scaleRef(name2);
  },
  projectionType(name2) {
    return this.scaleType(name2);
  },
  // ----
  addData(name2, dataScope) {
    return hasOwnProperty(this.data, name2) && error62("Duplicate data set name: " + stringValue(name2)), this.data[name2] = dataScope;
  },
  getData(name2) {
    return this.data[name2] || error62("Undefined data set name: " + stringValue(name2)), this.data[name2];
  },
  addDataPipeline(name2, entries2) {
    return hasOwnProperty(this.data, name2) && error62("Duplicate data set name: " + stringValue(name2)), this.addData(name2, DataScope.fromEntries(this, entries2));
  }
};
function propertyLambda(spec) {
  return (isArray(spec) ? arrayLambda : objectLambda)(spec);
}
function arrayLambda(array4) {
  let n = array4.length, code = "[";
  for (let i = 0; i < n; ++i) {
    let value3 = array4[i];
    code += (i > 0 ? "," : "") + (isObject2(value3) ? value3.signal || propertyLambda(value3) : stringValue(value3));
  }
  return code + "]";
}
function objectLambda(obj) {
  let code = "{", i = 0, key2, value3;
  for (key2 in obj)
    value3 = obj[key2], code += (++i > 1 ? "," : "") + stringValue(key2) + ":" + (isObject2(value3) ? value3.signal || propertyLambda(value3) : stringValue(value3));
  return code + "}";
}
function defaults() {
  let defaultFont = "sans-serif", defaultColor = "#4c78a8", black = "#000", gray2 = "#888", lightGray = "#ddd";
  return {
    // default visualization description
    description: "Vega visualization",
    // default padding around visualization
    padding: 0,
    // default for automatic sizing; options: 'none', 'pad', 'fit'
    // or provide an object (e.g., {'type': 'pad', 'resize': true})
    autosize: "pad",
    // default view background color
    // covers the entire view component
    background: null,
    // default event handling configuration
    // preventDefault for view-sourced event types except 'wheel'
    events: {
      defaults: {
        allow: ["wheel"]
      }
    },
    // defaults for top-level group marks
    // accepts mark properties (fill, stroke, etc)
    // covers the data rectangle within group width/height
    group: null,
    // defaults for basic mark types
    // each subset accepts mark properties (fill, stroke, etc)
    mark: null,
    arc: {
      fill: defaultColor
    },
    area: {
      fill: defaultColor
    },
    image: null,
    line: {
      stroke: defaultColor,
      strokeWidth: 2
    },
    path: {
      stroke: defaultColor
    },
    rect: {
      fill: defaultColor
    },
    rule: {
      stroke: black
    },
    shape: {
      stroke: defaultColor
    },
    symbol: {
      fill: defaultColor,
      size: 64
    },
    text: {
      fill: black,
      font: defaultFont,
      fontSize: 11
    },
    trail: {
      fill: defaultColor,
      size: 2
    },
    // style definitions
    style: {
      // axis & legend labels
      "guide-label": {
        fill: black,
        font: defaultFont,
        fontSize: 10
      },
      // axis & legend titles
      "guide-title": {
        fill: black,
        font: defaultFont,
        fontSize: 11,
        fontWeight: "bold"
      },
      // headers, including chart title
      "group-title": {
        fill: black,
        font: defaultFont,
        fontSize: 13,
        fontWeight: "bold"
      },
      // chart subtitle
      "group-subtitle": {
        fill: black,
        font: defaultFont,
        fontSize: 12
      },
      // defaults for styled point marks in Vega-Lite
      point: {
        size: 30,
        strokeWidth: 2,
        shape: "circle"
      },
      circle: {
        size: 30,
        strokeWidth: 2
      },
      square: {
        size: 30,
        strokeWidth: 2,
        shape: "square"
      },
      // defaults for styled group marks in Vega-Lite
      cell: {
        fill: "transparent",
        stroke: lightGray
      },
      view: {
        fill: "transparent"
      }
    },
    // defaults for title
    title: {
      orient: "top",
      anchor: "middle",
      offset: 4,
      subtitlePadding: 3
    },
    // defaults for axes
    axis: {
      minExtent: 0,
      maxExtent: 200,
      bandPosition: 0.5,
      domain: !0,
      domainWidth: 1,
      domainColor: gray2,
      grid: !1,
      gridWidth: 1,
      gridColor: lightGray,
      labels: !0,
      labelAngle: 0,
      labelLimit: 180,
      labelOffset: 0,
      labelPadding: 2,
      ticks: !0,
      tickColor: gray2,
      tickOffset: 0,
      tickRound: !0,
      tickSize: 5,
      tickWidth: 1,
      titlePadding: 4
    },
    // correction for centering bias
    axisBand: {
      tickOffset: -0.5
    },
    // defaults for cartographic projection
    projection: {
      type: "mercator"
    },
    // defaults for legends
    legend: {
      orient: "right",
      padding: 0,
      gridAlign: "each",
      columnPadding: 10,
      rowPadding: 2,
      symbolDirection: "vertical",
      gradientDirection: "vertical",
      gradientLength: 200,
      gradientThickness: 16,
      gradientStrokeColor: lightGray,
      gradientStrokeWidth: 0,
      gradientLabelOffset: 2,
      labelAlign: "left",
      labelBaseline: "middle",
      labelLimit: 160,
      labelOffset: 4,
      labelOverlap: !0,
      symbolLimit: 30,
      symbolType: "circle",
      symbolSize: 100,
      symbolOffset: 0,
      symbolStrokeWidth: 1.5,
      symbolBaseFillColor: "transparent",
      symbolBaseStrokeColor: gray2,
      titleLimit: 180,
      titleOrient: "top",
      titlePadding: 5,
      layout: {
        offset: 18,
        direction: "horizontal",
        left: {
          direction: "vertical"
        },
        right: {
          direction: "vertical"
        }
      }
    },
    // defaults for scale ranges
    range: {
      category: {
        scheme: "tableau10"
      },
      ordinal: {
        scheme: "blues"
      },
      heatmap: {
        scheme: "yellowgreenblue"
      },
      ramp: {
        scheme: "blues"
      },
      diverging: {
        scheme: "blueorange",
        extent: [1, 0]
      },
      symbol: ["circle", "square", "triangle-up", "cross", "diamond", "triangle-right", "triangle-down", "triangle-left"]
    }
  };
}
function parse8(spec, config2, options) {
  return isObject2(spec) || error62("Input Vega specification must be an object."), config2 = mergeConfig(defaults(), config2, spec.config), parseView(spec, new Scope(config2, options)).toRuntime();
}

// node_modules/vega/build/vega.module.js
extend2(transforms, vega_transforms_exports, vega_view_transforms_exports, vega_encode_exports, vega_geo_exports, vega_force_exports, vega_label_exports, vega_hierarchy_exports, vega_regression_exports, vega_voronoi_exports, vega_wordcloud_exports, vega_crossfilter_exports);

// node_modules/vega-lite/node_modules/vega-expression/build/vega-expression.js
var RawCode2 = "RawCode", Literal2 = "Literal", Property2 = "Property", Identifier3 = "Identifier", ArrayExpression2 = "ArrayExpression", BinaryExpression2 = "BinaryExpression", CallExpression2 = "CallExpression", ConditionalExpression2 = "ConditionalExpression", LogicalExpression2 = "LogicalExpression", MemberExpression2 = "MemberExpression", ObjectExpression2 = "ObjectExpression", UnaryExpression2 = "UnaryExpression";
function ASTNode2(type3) {
  this.type = type3;
}
ASTNode2.prototype.visit = function(visitor) {
  let c, i, n;
  if (visitor(this)) return 1;
  for (c = children3(this), i = 0, n = c.length; i < n; ++i)
    if (c[i].visit(visitor)) return 1;
};
function children3(node2) {
  switch (node2.type) {
    case ArrayExpression2:
      return node2.elements;
    case BinaryExpression2:
    case LogicalExpression2:
      return [node2.left, node2.right];
    case CallExpression2:
      return [node2.callee].concat(node2.arguments);
    case ConditionalExpression2:
      return [node2.test, node2.consequent, node2.alternate];
    case MemberExpression2:
      return [node2.object, node2.property];
    case ObjectExpression2:
      return node2.properties;
    case Property2:
      return [node2.key, node2.value];
    case UnaryExpression2:
      return [node2.argument];
    case Identifier3:
    case Literal2:
    case RawCode2:
    default:
      return [];
  }
}
var TokenName2, source3, index3, length2, lookahead2, TokenBooleanLiteral2 = 1, TokenEOF2 = 2, TokenIdentifier2 = 3, TokenKeyword2 = 4, TokenNullLiteral2 = 5, TokenNumericLiteral2 = 6, TokenPunctuator2 = 7, TokenStringLiteral2 = 8, TokenRegularExpression2 = 9;
TokenName2 = {};
TokenName2[TokenBooleanLiteral2] = "Boolean";
TokenName2[TokenEOF2] = "<end>";
TokenName2[TokenIdentifier2] = "Identifier";
TokenName2[TokenKeyword2] = "Keyword";
TokenName2[TokenNullLiteral2] = "Null";
TokenName2[TokenNumericLiteral2] = "Numeric";
TokenName2[TokenPunctuator2] = "Punctuator";
TokenName2[TokenStringLiteral2] = "String";
TokenName2[TokenRegularExpression2] = "RegularExpression";
var SyntaxArrayExpression2 = "ArrayExpression", SyntaxBinaryExpression2 = "BinaryExpression", SyntaxCallExpression2 = "CallExpression", SyntaxConditionalExpression2 = "ConditionalExpression", SyntaxIdentifier2 = "Identifier", SyntaxLiteral2 = "Literal", SyntaxLogicalExpression2 = "LogicalExpression", SyntaxMemberExpression2 = "MemberExpression", SyntaxObjectExpression2 = "ObjectExpression", SyntaxProperty2 = "Property", SyntaxUnaryExpression2 = "UnaryExpression", MessageUnexpectedToken2 = "Unexpected token %0", MessageUnexpectedNumber2 = "Unexpected number", MessageUnexpectedString2 = "Unexpected string", MessageUnexpectedIdentifier2 = "Unexpected identifier", MessageUnexpectedReserved2 = "Unexpected reserved word", MessageUnexpectedEOS2 = "Unexpected end of input", MessageInvalidRegExp2 = "Invalid regular expression", MessageUnterminatedRegExp2 = "Invalid regular expression: missing /", MessageStrictOctalLiteral2 = "Octal literals are not allowed in strict mode.", MessageStrictDuplicateProperty2 = "Duplicate data property in object literal not allowed in strict mode", ILLEGAL3 = "ILLEGAL", DISABLED2 = "Disabled.", RegexNonAsciiIdentifierStart2 = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"), RegexNonAsciiIdentifierPart2 = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");
function assert3(condition, message) {
  if (!condition)
    throw new Error("ASSERT: " + message);
}
function isDecimalDigit2(ch2) {
  return ch2 >= 48 && ch2 <= 57;
}
function isHexDigit2(ch2) {
  return "0123456789abcdefABCDEF".includes(ch2);
}
function isOctalDigit2(ch2) {
  return "01234567".includes(ch2);
}
function isWhiteSpace2(ch2) {
  return ch2 === 32 || ch2 === 9 || ch2 === 11 || ch2 === 12 || ch2 === 160 || ch2 >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].includes(ch2);
}
function isLineTerminator2(ch2) {
  return ch2 === 10 || ch2 === 13 || ch2 === 8232 || ch2 === 8233;
}
function isIdentifierStart2(ch2) {
  return ch2 === 36 || ch2 === 95 || // $ (dollar) and _ (underscore)
  ch2 >= 65 && ch2 <= 90 || // A..Z
  ch2 >= 97 && ch2 <= 122 || // a..z
  ch2 === 92 || // \ (backslash)
  ch2 >= 128 && RegexNonAsciiIdentifierStart2.test(String.fromCharCode(ch2));
}
function isIdentifierPart2(ch2) {
  return ch2 === 36 || ch2 === 95 || // $ (dollar) and _ (underscore)
  ch2 >= 65 && ch2 <= 90 || // A..Z
  ch2 >= 97 && ch2 <= 122 || // a..z
  ch2 >= 48 && ch2 <= 57 || // 0..9
  ch2 === 92 || // \ (backslash)
  ch2 >= 128 && RegexNonAsciiIdentifierPart2.test(String.fromCharCode(ch2));
}
var keywords2 = {
  if: 1,
  in: 1,
  do: 1,
  var: 1,
  for: 1,
  new: 1,
  try: 1,
  let: 1,
  this: 1,
  else: 1,
  case: 1,
  void: 1,
  with: 1,
  enum: 1,
  while: 1,
  break: 1,
  catch: 1,
  throw: 1,
  const: 1,
  yield: 1,
  class: 1,
  super: 1,
  return: 1,
  typeof: 1,
  delete: 1,
  switch: 1,
  export: 1,
  import: 1,
  public: 1,
  static: 1,
  default: 1,
  finally: 1,
  extends: 1,
  package: 1,
  private: 1,
  function: 1,
  continue: 1,
  debugger: 1,
  interface: 1,
  protected: 1,
  instanceof: 1,
  implements: 1
};
function skipComment2() {
  for (; index3 < length2; ) {
    let ch2 = source3.charCodeAt(index3);
    if (isWhiteSpace2(ch2) || isLineTerminator2(ch2))
      ++index3;
    else
      break;
  }
}
function scanHexEscape2(prefix) {
  var i, len, ch2, code = 0;
  for (len = prefix === "u" ? 4 : 2, i = 0; i < len; ++i)
    index3 < length2 && isHexDigit2(source3[index3]) ? (ch2 = source3[index3++], code = code * 16 + "0123456789abcdef".indexOf(ch2.toLowerCase())) : throwError2({}, MessageUnexpectedToken2, ILLEGAL3);
  return String.fromCharCode(code);
}
function scanUnicodeCodePointEscape2() {
  var ch2, code, cu1, cu2;
  for (ch2 = source3[index3], code = 0, ch2 === "}" && throwError2({}, MessageUnexpectedToken2, ILLEGAL3); index3 < length2 && (ch2 = source3[index3++], !!isHexDigit2(ch2)); )
    code = code * 16 + "0123456789abcdef".indexOf(ch2.toLowerCase());
  return (code > 1114111 || ch2 !== "}") && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), code <= 65535 ? String.fromCharCode(code) : (cu1 = (code - 65536 >> 10) + 55296, cu2 = (code - 65536 & 1023) + 56320, String.fromCharCode(cu1, cu2));
}
function getEscapedIdentifier2() {
  var ch2, id3;
  for (ch2 = source3.charCodeAt(index3++), id3 = String.fromCharCode(ch2), ch2 === 92 && (source3.charCodeAt(index3) !== 117 && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), ++index3, ch2 = scanHexEscape2("u"), (!ch2 || ch2 === "\\" || !isIdentifierStart2(ch2.charCodeAt(0))) && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), id3 = ch2); index3 < length2 && (ch2 = source3.charCodeAt(index3), !!isIdentifierPart2(ch2)); )
    ++index3, id3 += String.fromCharCode(ch2), ch2 === 92 && (id3 = id3.substr(0, id3.length - 1), source3.charCodeAt(index3) !== 117 && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), ++index3, ch2 = scanHexEscape2("u"), (!ch2 || ch2 === "\\" || !isIdentifierPart2(ch2.charCodeAt(0))) && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), id3 += ch2);
  return id3;
}
function getIdentifier2() {
  var start, ch2;
  for (start = index3++; index3 < length2; ) {
    if (ch2 = source3.charCodeAt(index3), ch2 === 92)
      return index3 = start, getEscapedIdentifier2();
    if (isIdentifierPart2(ch2))
      ++index3;
    else
      break;
  }
  return source3.slice(start, index3);
}
function scanIdentifier2() {
  var start, id3, type3;
  return start = index3, id3 = source3.charCodeAt(index3) === 92 ? getEscapedIdentifier2() : getIdentifier2(), id3.length === 1 ? type3 = TokenIdentifier2 : keywords2.hasOwnProperty(id3) ? type3 = TokenKeyword2 : id3 === "null" ? type3 = TokenNullLiteral2 : id3 === "true" || id3 === "false" ? type3 = TokenBooleanLiteral2 : type3 = TokenIdentifier2, {
    type: type3,
    value: id3,
    start,
    end: index3
  };
}
function scanPunctuator2() {
  var start = index3, code = source3.charCodeAt(index3), code2, ch1 = source3[index3], ch2, ch3, ch4;
  switch (code) {
    // Check for most common single-character punctuators.
    case 46:
    // . dot
    case 40:
    // ( open bracket
    case 41:
    // ) close bracket
    case 59:
    // ; semicolon
    case 44:
    // , comma
    case 123:
    // { open curly brace
    case 125:
    // } close curly brace
    case 91:
    // [
    case 93:
    // ]
    case 58:
    // :
    case 63:
    // ?
    case 126:
      return ++index3, {
        type: TokenPunctuator2,
        value: String.fromCharCode(code),
        start,
        end: index3
      };
    default:
      if (code2 = source3.charCodeAt(index3 + 1), code2 === 61)
        switch (code) {
          case 43:
          // +
          case 45:
          // -
          case 47:
          // /
          case 60:
          // <
          case 62:
          // >
          case 94:
          // ^
          case 124:
          // |
          case 37:
          // %
          case 38:
          // &
          case 42:
            return index3 += 2, {
              type: TokenPunctuator2,
              value: String.fromCharCode(code) + String.fromCharCode(code2),
              start,
              end: index3
            };
          case 33:
          // !
          case 61:
            return index3 += 2, source3.charCodeAt(index3) === 61 && ++index3, {
              type: TokenPunctuator2,
              value: source3.slice(start, index3),
              start,
              end: index3
            };
        }
  }
  if (ch4 = source3.substr(index3, 4), ch4 === ">>>=")
    return index3 += 4, {
      type: TokenPunctuator2,
      value: ch4,
      start,
      end: index3
    };
  if (ch3 = ch4.substr(0, 3), ch3 === ">>>" || ch3 === "<<=" || ch3 === ">>=")
    return index3 += 3, {
      type: TokenPunctuator2,
      value: ch3,
      start,
      end: index3
    };
  if (ch2 = ch3.substr(0, 2), ch1 === ch2[1] && "+-<>&|".includes(ch1) || ch2 === "=>")
    return index3 += 2, {
      type: TokenPunctuator2,
      value: ch2,
      start,
      end: index3
    };
  if (ch2 === "//" && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), "<>=!+-*%&|^/".includes(ch1))
    return ++index3, {
      type: TokenPunctuator2,
      value: ch1,
      start,
      end: index3
    };
  throwError2({}, MessageUnexpectedToken2, ILLEGAL3);
}
function scanHexLiteral2(start) {
  let number12 = "";
  for (; index3 < length2 && isHexDigit2(source3[index3]); )
    number12 += source3[index3++];
  return number12.length === 0 && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), isIdentifierStart2(source3.charCodeAt(index3)) && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), {
    type: TokenNumericLiteral2,
    value: parseInt("0x" + number12, 16),
    start,
    end: index3
  };
}
function scanOctalLiteral2(start) {
  let number12 = "0" + source3[index3++];
  for (; index3 < length2 && isOctalDigit2(source3[index3]); )
    number12 += source3[index3++];
  return (isIdentifierStart2(source3.charCodeAt(index3)) || isDecimalDigit2(source3.charCodeAt(index3))) && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), {
    type: TokenNumericLiteral2,
    value: parseInt(number12, 8),
    octal: !0,
    start,
    end: index3
  };
}
function scanNumericLiteral2() {
  var number12, start, ch2;
  if (ch2 = source3[index3], assert3(isDecimalDigit2(ch2.charCodeAt(0)) || ch2 === ".", "Numeric literal must start with a decimal digit or a decimal point"), start = index3, number12 = "", ch2 !== ".") {
    if (number12 = source3[index3++], ch2 = source3[index3], number12 === "0") {
      if (ch2 === "x" || ch2 === "X")
        return ++index3, scanHexLiteral2(start);
      if (isOctalDigit2(ch2))
        return scanOctalLiteral2(start);
      ch2 && isDecimalDigit2(ch2.charCodeAt(0)) && throwError2({}, MessageUnexpectedToken2, ILLEGAL3);
    }
    for (; isDecimalDigit2(source3.charCodeAt(index3)); )
      number12 += source3[index3++];
    ch2 = source3[index3];
  }
  if (ch2 === ".") {
    for (number12 += source3[index3++]; isDecimalDigit2(source3.charCodeAt(index3)); )
      number12 += source3[index3++];
    ch2 = source3[index3];
  }
  if (ch2 === "e" || ch2 === "E")
    if (number12 += source3[index3++], ch2 = source3[index3], (ch2 === "+" || ch2 === "-") && (number12 += source3[index3++]), isDecimalDigit2(source3.charCodeAt(index3)))
      for (; isDecimalDigit2(source3.charCodeAt(index3)); )
        number12 += source3[index3++];
    else
      throwError2({}, MessageUnexpectedToken2, ILLEGAL3);
  return isIdentifierStart2(source3.charCodeAt(index3)) && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), {
    type: TokenNumericLiteral2,
    value: parseFloat(number12),
    start,
    end: index3
  };
}
function scanStringLiteral2() {
  var str = "", quote, start, ch2, code, octal = !1;
  for (quote = source3[index3], assert3(quote === "'" || quote === '"', "String literal must starts with a quote"), start = index3, ++index3; index3 < length2; )
    if (ch2 = source3[index3++], ch2 === quote) {
      quote = "";
      break;
    } else if (ch2 === "\\")
      if (ch2 = source3[index3++], !ch2 || !isLineTerminator2(ch2.charCodeAt(0)))
        switch (ch2) {
          case "u":
          case "x":
            source3[index3] === "{" ? (++index3, str += scanUnicodeCodePointEscape2()) : str += scanHexEscape2(ch2);
            break;
          case "n":
            str += `
`;
            break;
          case "r":
            str += "\r";
            break;
          case "t":
            str += "	";
            break;
          case "b":
            str += "\b";
            break;
          case "f":
            str += "\f";
            break;
          case "v":
            str += "\v";
            break;
          default:
            isOctalDigit2(ch2) ? (code = "01234567".indexOf(ch2), code !== 0 && (octal = !0), index3 < length2 && isOctalDigit2(source3[index3]) && (octal = !0, code = code * 8 + "01234567".indexOf(source3[index3++]), "0123".includes(ch2) && index3 < length2 && isOctalDigit2(source3[index3]) && (code = code * 8 + "01234567".indexOf(source3[index3++]))), str += String.fromCharCode(code)) : str += ch2;
            break;
        }
      else
        ch2 === "\r" && source3[index3] === `
` && ++index3;
    else {
      if (isLineTerminator2(ch2.charCodeAt(0)))
        break;
      str += ch2;
    }
  return quote !== "" && throwError2({}, MessageUnexpectedToken2, ILLEGAL3), {
    type: TokenStringLiteral2,
    value: str,
    octal,
    start,
    end: index3
  };
}
function testRegExp2(pattern, flags) {
  let tmp = pattern;
  flags.includes("u") && (tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, ($0, $1) => {
    if (parseInt($1, 16) <= 1114111)
      return "x";
    throwError2({}, MessageInvalidRegExp2);
  }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x"));
  try {
    new RegExp(tmp);
  } catch {
    throwError2({}, MessageInvalidRegExp2);
  }
  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}
function scanRegExpBody2() {
  var ch2, str, classMarker, terminated, body;
  for (ch2 = source3[index3], assert3(ch2 === "/", "Regular expression literal must start with a slash"), str = source3[index3++], classMarker = !1, terminated = !1; index3 < length2; )
    if (ch2 = source3[index3++], str += ch2, ch2 === "\\")
      ch2 = source3[index3++], isLineTerminator2(ch2.charCodeAt(0)) && throwError2({}, MessageUnterminatedRegExp2), str += ch2;
    else if (isLineTerminator2(ch2.charCodeAt(0)))
      throwError2({}, MessageUnterminatedRegExp2);
    else if (classMarker)
      ch2 === "]" && (classMarker = !1);
    else if (ch2 === "/") {
      terminated = !0;
      break;
    } else ch2 === "[" && (classMarker = !0);
  return terminated || throwError2({}, MessageUnterminatedRegExp2), body = str.substr(1, str.length - 2), {
    value: body,
    literal: str
  };
}
function scanRegExpFlags2() {
  var ch2, str, flags;
  for (str = "", flags = ""; index3 < length2 && (ch2 = source3[index3], !!isIdentifierPart2(ch2.charCodeAt(0))); )
    ++index3, ch2 === "\\" && index3 < length2 ? throwError2({}, MessageUnexpectedToken2, ILLEGAL3) : (flags += ch2, str += ch2);
  return flags.search(/[^gimuy]/g) >= 0 && throwError2({}, MessageInvalidRegExp2, flags), {
    value: flags,
    literal: str
  };
}
function scanRegExp2() {
  var start, body, flags, value3;
  return lookahead2 = null, skipComment2(), start = index3, body = scanRegExpBody2(), flags = scanRegExpFlags2(), value3 = testRegExp2(body.value, flags.value), {
    literal: body.literal + flags.literal,
    value: value3,
    regex: {
      pattern: body.value,
      flags: flags.value
    },
    start,
    end: index3
  };
}
function isIdentifierName2(token) {
  return token.type === TokenIdentifier2 || token.type === TokenKeyword2 || token.type === TokenBooleanLiteral2 || token.type === TokenNullLiteral2;
}
function advance2() {
  if (skipComment2(), index3 >= length2)
    return {
      type: TokenEOF2,
      start: index3,
      end: index3
    };
  let ch2 = source3.charCodeAt(index3);
  return isIdentifierStart2(ch2) ? scanIdentifier2() : ch2 === 40 || ch2 === 41 || ch2 === 59 ? scanPunctuator2() : ch2 === 39 || ch2 === 34 ? scanStringLiteral2() : ch2 === 46 ? isDecimalDigit2(source3.charCodeAt(index3 + 1)) ? scanNumericLiteral2() : scanPunctuator2() : isDecimalDigit2(ch2) ? scanNumericLiteral2() : scanPunctuator2();
}
function lex2() {
  let token = lookahead2;
  return index3 = token.end, lookahead2 = advance2(), index3 = token.end, token;
}
function peek3() {
  let pos = index3;
  lookahead2 = advance2(), index3 = pos;
}
function finishArrayExpression2(elements) {
  let node2 = new ASTNode2(SyntaxArrayExpression2);
  return node2.elements = elements, node2;
}
function finishBinaryExpression2(operator2, left, right) {
  let node2 = new ASTNode2(operator2 === "||" || operator2 === "&&" ? SyntaxLogicalExpression2 : SyntaxBinaryExpression2);
  return node2.operator = operator2, node2.left = left, node2.right = right, node2;
}
function finishCallExpression2(callee, args) {
  let node2 = new ASTNode2(SyntaxCallExpression2);
  return node2.callee = callee, node2.arguments = args, node2;
}
function finishConditionalExpression2(test2, consequent, alternate) {
  let node2 = new ASTNode2(SyntaxConditionalExpression2);
  return node2.test = test2, node2.consequent = consequent, node2.alternate = alternate, node2;
}
function finishIdentifier2(name2) {
  let node2 = new ASTNode2(SyntaxIdentifier2);
  return node2.name = name2, node2;
}
function finishLiteral2(token) {
  let node2 = new ASTNode2(SyntaxLiteral2);
  return node2.value = token.value, node2.raw = source3.slice(token.start, token.end), token.regex && (node2.raw === "//" && (node2.raw = "/(?:)/"), node2.regex = token.regex), node2;
}
function finishMemberExpression2(accessor2, object4, property2) {
  let node2 = new ASTNode2(SyntaxMemberExpression2);
  return node2.computed = accessor2 === "[", node2.object = object4, node2.property = property2, node2.computed || (property2.member = !0), node2;
}
function finishObjectExpression2(properties) {
  let node2 = new ASTNode2(SyntaxObjectExpression2);
  return node2.properties = properties, node2;
}
function finishProperty2(kind, key2, value3) {
  let node2 = new ASTNode2(SyntaxProperty2);
  return node2.key = key2, node2.value = value3, node2.kind = kind, node2;
}
function finishUnaryExpression2(operator2, argument) {
  let node2 = new ASTNode2(SyntaxUnaryExpression2);
  return node2.operator = operator2, node2.argument = argument, node2.prefix = !0, node2;
}
function throwError2(token, messageFormat) {
  var error64, args = Array.prototype.slice.call(arguments, 2), msg = messageFormat.replace(/%(\d)/g, (whole, index4) => (assert3(index4 < args.length, "Message reference must be in range"), args[index4]));
  throw error64 = new Error(msg), error64.index = index3, error64.description = msg, error64;
}
function throwUnexpected2(token) {
  token.type === TokenEOF2 && throwError2(token, MessageUnexpectedEOS2), token.type === TokenNumericLiteral2 && throwError2(token, MessageUnexpectedNumber2), token.type === TokenStringLiteral2 && throwError2(token, MessageUnexpectedString2), token.type === TokenIdentifier2 && throwError2(token, MessageUnexpectedIdentifier2), token.type === TokenKeyword2 && throwError2(token, MessageUnexpectedReserved2), throwError2(token, MessageUnexpectedToken2, token.value);
}
function expect2(value3) {
  let token = lex2();
  (token.type !== TokenPunctuator2 || token.value !== value3) && throwUnexpected2(token);
}
function match2(value3) {
  return lookahead2.type === TokenPunctuator2 && lookahead2.value === value3;
}
function matchKeyword2(keyword) {
  return lookahead2.type === TokenKeyword2 && lookahead2.value === keyword;
}
function parseArrayInitialiser2() {
  let elements = [];
  for (index3 = lookahead2.start, expect2("["); !match2("]"); )
    match2(",") ? (lex2(), elements.push(null)) : (elements.push(parseConditionalExpression2()), match2("]") || expect2(","));
  return lex2(), finishArrayExpression2(elements);
}
function parseObjectPropertyKey2() {
  index3 = lookahead2.start;
  let token = lex2();
  return token.type === TokenStringLiteral2 || token.type === TokenNumericLiteral2 ? (token.octal && throwError2(token, MessageStrictOctalLiteral2), finishLiteral2(token)) : finishIdentifier2(token.value);
}
function parseObjectProperty2() {
  var token, key2, id3, value3;
  if (index3 = lookahead2.start, token = lookahead2, token.type === TokenIdentifier2)
    return id3 = parseObjectPropertyKey2(), expect2(":"), value3 = parseConditionalExpression2(), finishProperty2("init", id3, value3);
  if (token.type === TokenEOF2 || token.type === TokenPunctuator2)
    throwUnexpected2(token);
  else
    return key2 = parseObjectPropertyKey2(), expect2(":"), value3 = parseConditionalExpression2(), finishProperty2("init", key2, value3);
}
function parseObjectInitialiser2() {
  var properties = [], property2, name2, key2, map4 = {}, toString2 = String;
  for (index3 = lookahead2.start, expect2("{"); !match2("}"); )
    property2 = parseObjectProperty2(), property2.key.type === SyntaxIdentifier2 ? name2 = property2.key.name : name2 = toString2(property2.key.value), key2 = "$" + name2, Object.prototype.hasOwnProperty.call(map4, key2) ? throwError2({}, MessageStrictDuplicateProperty2) : map4[key2] = !0, properties.push(property2), match2("}") || expect2(",");
  return expect2("}"), finishObjectExpression2(properties);
}
function parseGroupExpression2() {
  expect2("(");
  let expr2 = parseExpression2();
  return expect2(")"), expr2;
}
var legalKeywords2 = {
  if: 1
};
function parsePrimaryExpression2() {
  var type3, token, expr2;
  if (match2("("))
    return parseGroupExpression2();
  if (match2("["))
    return parseArrayInitialiser2();
  if (match2("{"))
    return parseObjectInitialiser2();
  if (type3 = lookahead2.type, index3 = lookahead2.start, type3 === TokenIdentifier2 || legalKeywords2[lookahead2.value])
    expr2 = finishIdentifier2(lex2().value);
  else if (type3 === TokenStringLiteral2 || type3 === TokenNumericLiteral2)
    lookahead2.octal && throwError2(lookahead2, MessageStrictOctalLiteral2), expr2 = finishLiteral2(lex2());
  else {
    if (type3 === TokenKeyword2)
      throw new Error(DISABLED2);
    type3 === TokenBooleanLiteral2 ? (token = lex2(), token.value = token.value === "true", expr2 = finishLiteral2(token)) : type3 === TokenNullLiteral2 ? (token = lex2(), token.value = null, expr2 = finishLiteral2(token)) : match2("/") || match2("/=") ? (expr2 = finishLiteral2(scanRegExp2()), peek3()) : throwUnexpected2(lex2());
  }
  return expr2;
}
function parseArguments2() {
  let args = [];
  if (expect2("("), !match2(")"))
    for (; index3 < length2 && (args.push(parseConditionalExpression2()), !match2(")")); )
      expect2(",");
  return expect2(")"), args;
}
function parseNonComputedProperty2() {
  index3 = lookahead2.start;
  let token = lex2();
  return isIdentifierName2(token) || throwUnexpected2(token), finishIdentifier2(token.value);
}
function parseNonComputedMember2() {
  return expect2("."), parseNonComputedProperty2();
}
function parseComputedMember2() {
  expect2("[");
  let expr2 = parseExpression2();
  return expect2("]"), expr2;
}
function parseLeftHandSideExpressionAllowCall2() {
  var expr2, args, property2;
  for (expr2 = parsePrimaryExpression2(); ; )
    if (match2("."))
      property2 = parseNonComputedMember2(), expr2 = finishMemberExpression2(".", expr2, property2);
    else if (match2("("))
      args = parseArguments2(), expr2 = finishCallExpression2(expr2, args);
    else if (match2("["))
      property2 = parseComputedMember2(), expr2 = finishMemberExpression2("[", expr2, property2);
    else
      break;
  return expr2;
}
function parsePostfixExpression2() {
  let expr2 = parseLeftHandSideExpressionAllowCall2();
  if (lookahead2.type === TokenPunctuator2 && (match2("++") || match2("--")))
    throw new Error(DISABLED2);
  return expr2;
}
function parseUnaryExpression2() {
  var token, expr2;
  if (lookahead2.type !== TokenPunctuator2 && lookahead2.type !== TokenKeyword2)
    expr2 = parsePostfixExpression2();
  else {
    if (match2("++") || match2("--"))
      throw new Error(DISABLED2);
    if (match2("+") || match2("-") || match2("~") || match2("!"))
      token = lex2(), expr2 = parseUnaryExpression2(), expr2 = finishUnaryExpression2(token.value, expr2);
    else {
      if (matchKeyword2("delete") || matchKeyword2("void") || matchKeyword2("typeof"))
        throw new Error(DISABLED2);
      expr2 = parsePostfixExpression2();
    }
  }
  return expr2;
}
function binaryPrecedence2(token) {
  let prec = 0;
  if (token.type !== TokenPunctuator2 && token.type !== TokenKeyword2)
    return 0;
  switch (token.value) {
    case "||":
      prec = 1;
      break;
    case "&&":
      prec = 2;
      break;
    case "|":
      prec = 3;
      break;
    case "^":
      prec = 4;
      break;
    case "&":
      prec = 5;
      break;
    case "==":
    case "!=":
    case "===":
    case "!==":
      prec = 6;
      break;
    case "<":
    case ">":
    case "<=":
    case ">=":
    case "instanceof":
    case "in":
      prec = 7;
      break;
    case "<<":
    case ">>":
    case ">>>":
      prec = 8;
      break;
    case "+":
    case "-":
      prec = 9;
      break;
    case "*":
    case "/":
    case "%":
      prec = 11;
      break;
  }
  return prec;
}
function parseBinaryExpression2() {
  var marker, markers, expr2, token, prec, stack2, right, operator2, left, i;
  if (marker = lookahead2, left = parseUnaryExpression2(), token = lookahead2, prec = binaryPrecedence2(token), prec === 0)
    return left;
  for (token.prec = prec, lex2(), markers = [marker, lookahead2], right = parseUnaryExpression2(), stack2 = [left, token, right]; (prec = binaryPrecedence2(lookahead2)) > 0; ) {
    for (; stack2.length > 2 && prec <= stack2[stack2.length - 2].prec; )
      right = stack2.pop(), operator2 = stack2.pop().value, left = stack2.pop(), markers.pop(), expr2 = finishBinaryExpression2(operator2, left, right), stack2.push(expr2);
    token = lex2(), token.prec = prec, stack2.push(token), markers.push(lookahead2), expr2 = parseUnaryExpression2(), stack2.push(expr2);
  }
  for (i = stack2.length - 1, expr2 = stack2[i], markers.pop(); i > 1; )
    markers.pop(), expr2 = finishBinaryExpression2(stack2[i - 1].value, stack2[i - 2], expr2), i -= 2;
  return expr2;
}
function parseConditionalExpression2() {
  var expr2, consequent, alternate;
  return expr2 = parseBinaryExpression2(), match2("?") && (lex2(), consequent = parseConditionalExpression2(), expect2(":"), alternate = parseConditionalExpression2(), expr2 = finishConditionalExpression2(expr2, consequent, alternate)), expr2;
}
function parseExpression2() {
  let expr2 = parseConditionalExpression2();
  if (match2(","))
    throw new Error(DISABLED2);
  return expr2;
}
function parser3(code) {
  source3 = code, index3 = 0, length2 = source3.length, lookahead2 = null, peek3();
  let expr2 = parseExpression2();
  if (lookahead2.type !== TokenEOF2)
    throw new Error("Unexpect token after expression.");
  return expr2;
}

// node_modules/vega-lite/build/index.js
var version$1 = "6.4.3", pkg = {
  version: version$1
};
function isLogicalOr(op) {
  return hasProperty(op, "or");
}
function isLogicalAnd(op) {
  return hasProperty(op, "and");
}
function isLogicalNot(op) {
  return hasProperty(op, "not");
}
function forEachLeaf(op, fn) {
  if (isLogicalNot(op))
    forEachLeaf(op.not, fn);
  else if (isLogicalAnd(op))
    for (let subop of op.and)
      forEachLeaf(subop, fn);
  else if (isLogicalOr(op))
    for (let subop of op.or)
      forEachLeaf(subop, fn);
  else
    fn(op);
}
function normalizeLogicalComposition(op, normalizer) {
  return isLogicalNot(op) ? { not: normalizeLogicalComposition(op.not, normalizer) } : isLogicalAnd(op) ? { and: op.and.map((o) => normalizeLogicalComposition(o, normalizer)) } : isLogicalOr(op) ? { or: op.or.map((o) => normalizeLogicalComposition(o, normalizer)) } : normalizer(op);
}
var duplicate = structuredClone;
function never2(message) {
  throw new Error(message);
}
function pick4(obj, props) {
  let copy5 = {};
  for (let prop of props)
    hasOwnProperty(obj, prop) && (copy5[prop] = obj[prop]);
  return copy5;
}
function omit2(obj, props) {
  let copy5 = { ...obj };
  for (let prop of props)
    delete copy5[prop];
  return copy5;
}
Set.prototype.toJSON = function() {
  return `Set(${[...this].map((x5) => stringify(x5)).join(",")})`;
};
function hash5(a) {
  if (isNumber(a))
    return a;
  let str = isString(a) ? a : stringify(a);
  if (str.length < 250)
    return str;
  let h2 = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    h2 = (h2 << 5) - h2 + char, h2 = h2 & h2;
  }
  return h2;
}
function isNullOrFalse(x5) {
  return x5 === !1 || x5 === null;
}
function contains2(array4, item) {
  return array4.includes(item);
}
function some(arr, f) {
  let i = 0;
  for (let [k, a] of arr.entries())
    if (f(a, k, i++))
      return !0;
  return !1;
}
function every(arr, f) {
  let i = 0;
  for (let [k, a] of arr.entries())
    if (!f(a, k, i++))
      return !1;
  return !0;
}
function mergeDeep(dest, ...src) {
  for (let s of src)
    deepMerge_(dest, s ?? {});
  return dest;
}
function deepMerge_(dest, src) {
  for (let property2 of keys3(src))
    writeConfig(dest, property2, src[property2], !0);
}
function unique(values3, f) {
  let results = [], u4 = {}, v2;
  for (let val of values3)
    v2 = f(val), !(v2 in u4) && (u4[v2] = 1, results.push(val));
  return results;
}
function setEqual(a, b10) {
  if (a.size !== b10.size)
    return !1;
  for (let e of a)
    if (!b10.has(e))
      return !1;
  return !0;
}
function hasIntersection(a, b10) {
  for (let key2 of a)
    if (b10.has(key2))
      return !0;
  return !1;
}
function prefixGenerator(a) {
  let prefixes2 = /* @__PURE__ */ new Set();
  for (let x5 of a) {
    let wrappedWithAccessors = splitAccessPath(x5).map((y5, i) => i === 0 ? y5 : `[${y5}]`), computedPrefixes = wrappedWithAccessors.map((_, i) => wrappedWithAccessors.slice(0, i + 1).join(""));
    for (let y5 of computedPrefixes)
      prefixes2.add(y5);
  }
  return prefixes2;
}
function fieldIntersection(a, b10) {
  return a === void 0 || b10 === void 0 ? !0 : hasIntersection(prefixGenerator(a), prefixGenerator(b10));
}
function isEmpty(obj) {
  return keys3(obj).length === 0;
}
var keys3 = Object.keys, vals = Object.values, entries$1 = Object.entries;
function isBoolean3(b10) {
  return b10 === !0 || b10 === !1;
}
function isPrimitive(v2) {
  return isString(v2) || isNumber(v2) || isBoolean3(v2);
}
function varName(s) {
  let alphanumericS = s.replace(/\W/g, "_");
  return (s.match(/^\d+/) ? "_" : "") + alphanumericS;
}
function logicalExpr(op, cb) {
  return isLogicalNot(op) ? `!(${logicalExpr(op.not, cb)})` : isLogicalAnd(op) ? `(${op.and.map((and) => logicalExpr(and, cb)).join(") && (")})` : isLogicalOr(op) ? `(${op.or.map((or2) => logicalExpr(or2, cb)).join(") || (")})` : cb(op);
}
function deleteNestedProperty(obj, orderedProps) {
  if (orderedProps.length === 0)
    return !0;
  let prop = orderedProps.shift();
  return prop in obj && deleteNestedProperty(obj[prop], orderedProps) && delete obj[prop], isEmpty(obj);
}
function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.substr(1);
}
function accessPathWithDatum(path3, datum2 = "datum") {
  let pieces = splitAccessPath(path3), prefixes2 = [];
  for (let i = 1; i <= pieces.length; i++) {
    let prefix = `[${pieces.slice(0, i).map(stringValue).join("][")}]`;
    prefixes2.push(`${datum2}${prefix}`);
  }
  return prefixes2.join(" && ");
}
function flatAccessWithDatum(path3, datum2 = "datum") {
  return `${datum2}[${stringValue(splitAccessPath(path3).join("."))}]`;
}
function accessWithDatumToUnescapedPath(unescapedPath) {
  return `datum['${unescapedPath.replaceAll("'", "\\'")}']`;
}
function unescapeSingleQuoteAndPathDot(escapedPath) {
  return escapedPath.replaceAll("\\'", "'").replaceAll("\\.", ".");
}
function escapePathAccess(string4) {
  return string4.replace(/(\[|\]|\.|'|")/g, "\\$1");
}
function replacePathInField(path3) {
  return `${splitAccessPath(path3).map(escapePathAccess).join("\\.")}`;
}
function replaceAll(string4, find4, replacement) {
  return string4.replace(new RegExp(find4.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), replacement);
}
function removePathFromField(path3) {
  return `${splitAccessPath(path3).join(".")}`;
}
function accessPathDepth(path3) {
  return path3 ? splitAccessPath(path3).length : 0;
}
function getFirstDefined(...args) {
  return args.find((a) => a !== void 0);
}
var idCounter = 42;
function uniqueId(prefix) {
  let id3 = ++idCounter;
  return prefix ? String(prefix) + id3 : id3;
}
function internalField(name2) {
  return isInternalField(name2) ? name2 : `__${name2}`;
}
function isInternalField(name2) {
  return name2.startsWith("__");
}
function normalizeAngle(angle2) {
  if (angle2 !== void 0)
    return (angle2 % 360 + 360) % 360;
}
function isNumeric(value3) {
  return isNumber(value3) ? !0 : !isNaN(value3) && !isNaN(parseFloat(value3));
}
var clonedProto = Object.getPrototypeOf(structuredClone({}));
function deepEqual(a, b10) {
  if (a === b10)
    return !0;
  if (a && b10 && typeof a == "object" && typeof b10 == "object") {
    if (a.constructor.name !== b10.constructor.name)
      return !1;
    let length3, i;
    if (Array.isArray(a)) {
      if (length3 = a.length, length3 != b10.length)
        return !1;
      for (i = length3; i-- !== 0; )
        if (!deepEqual(a[i], b10[i]))
          return !1;
      return !0;
    }
    if (a instanceof Map && b10 instanceof Map) {
      if (a.size !== b10.size)
        return !1;
      for (let e of a.entries())
        if (!b10.has(e[0]))
          return !1;
      for (let e of a.entries())
        if (!deepEqual(e[1], b10.get(e[0])))
          return !1;
      return !0;
    }
    if (a instanceof Set && b10 instanceof Set) {
      if (a.size !== b10.size)
        return !1;
      for (let e of a.entries())
        if (!b10.has(e[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b10)) {
      if (length3 = a.length, length3 != b10.length)
        return !1;
      for (i = length3; i-- !== 0; )
        if (a[i] !== b10[i])
          return !1;
      return !0;
    }
    if (a.constructor === RegExp)
      return a.source === b10.source && a.flags === b10.flags;
    if (a.valueOf !== Object.prototype.valueOf && a.valueOf !== clonedProto.valueOf)
      return a.valueOf() === b10.valueOf();
    if (a.toString !== Object.prototype.toString && a.toString !== clonedProto.toString)
      return a.toString() === b10.toString();
    let ks = Object.keys(a);
    if (length3 = ks.length, length3 !== Object.keys(b10).length)
      return !1;
    for (i = length3; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b10, ks[i]))
        return !1;
    for (i = length3; i-- !== 0; ) {
      let key2 = ks[i];
      if (!deepEqual(a[key2], b10[key2]))
        return !1;
    }
    return !0;
  }
  return a !== a && b10 !== b10;
}
function stringify(data3) {
  let seen = [];
  return (function _stringify(node2) {
    if (node2?.toJSON && typeof node2.toJSON == "function" && (node2 = node2.toJSON()), node2 === void 0)
      return;
    if (typeof node2 == "number")
      return isFinite(node2) ? `${node2}` : "null";
    if (typeof node2 != "object")
      return JSON.stringify(node2);
    let i, out;
    if (Array.isArray(node2)) {
      for (out = "[", i = 0; i < node2.length; i++)
        i && (out += ","), out += _stringify(node2[i]) || "null";
      return `${out}]`;
    }
    if (node2 === null)
      return "null";
    if (seen.includes(node2))
      throw new TypeError("Converting circular structure to JSON");
    let seenIndex = seen.push(node2) - 1, ks = Object.keys(node2).sort();
    for (out = "", i = 0; i < ks.length; i++) {
      let key2 = ks[i], value3 = _stringify(node2[key2]);
      value3 && (out && (out += ","), out += `${JSON.stringify(key2)}:${value3}`);
    }
    return seen.splice(seenIndex, 1), `{${out}}`;
  })(data3);
}
function hasProperty(obj, key2) {
  return isObject2(obj) && hasOwnProperty(obj, key2) && obj[key2] !== void 0;
}
var ROW = "row", COLUMN = "column", FACET = "facet", X3 = "x", Y3 = "y", X23 = "x2", Y23 = "y2", XOFFSET = "xOffset", YOFFSET = "yOffset", RADIUS = "radius", RADIUS2 = "radius2", THETA = "theta", THETA2 = "theta2", LATITUDE = "latitude", LONGITUDE = "longitude", LATITUDE2 = "latitude2", LONGITUDE2 = "longitude2", TIME = "time", COLOR = "color", FILL = "fill", STROKE = "stroke", SHAPE = "shape", SIZE2 = "size", ANGLE = "angle", OPACITY = "opacity", FILLOPACITY = "fillOpacity", STROKEOPACITY = "strokeOpacity", STROKEWIDTH = "strokeWidth", STROKEDASH = "strokeDash", TEXT$1 = "text", ORDER = "order", DETAIL = "detail", KEY = "key", TOOLTIP = "tooltip", HREF = "href", URL2 = "url", DESCRIPTION = "description", POSITION_CHANNEL_INDEX = {
  x: 1,
  y: 1,
  x2: 1,
  y2: 1
}, POLAR_POSITION_CHANNEL_INDEX = {
  theta: 1,
  theta2: 1,
  radius: 1,
  radius2: 1
};
function isPolarPositionChannel(c) {
  return hasOwnProperty(POLAR_POSITION_CHANNEL_INDEX, c);
}
var GEO_POSIITON_CHANNEL_INDEX = {
  longitude: 1,
  longitude2: 1,
  latitude: 1,
  latitude2: 1
};
function getPositionChannelFromLatLong(channel) {
  switch (channel) {
    case LATITUDE:
      return "y";
    case LATITUDE2:
      return "y2";
    case LONGITUDE:
      return "x";
    case LONGITUDE2:
      return "x2";
  }
}
function isGeoPositionChannel(c) {
  return hasOwnProperty(GEO_POSIITON_CHANNEL_INDEX, c);
}
var GEOPOSITION_CHANNELS = keys3(GEO_POSIITON_CHANNEL_INDEX), UNIT_CHANNEL_INDEX = {
  ...POSITION_CHANNEL_INDEX,
  ...POLAR_POSITION_CHANNEL_INDEX,
  ...GEO_POSIITON_CHANNEL_INDEX,
  xOffset: 1,
  yOffset: 1,
  // color
  color: 1,
  fill: 1,
  stroke: 1,
  // time
  time: 1,
  // other non-position with scale
  opacity: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeDash: 1,
  size: 1,
  angle: 1,
  shape: 1,
  // channels without scales
  order: 1,
  text: 1,
  detail: 1,
  key: 1,
  tooltip: 1,
  href: 1,
  url: 1,
  description: 1
};
function isColorChannel(channel) {
  return channel === COLOR || channel === FILL || channel === STROKE;
}
var FACET_CHANNEL_INDEX = {
  row: 1,
  column: 1,
  facet: 1
}, FACET_CHANNELS = keys3(FACET_CHANNEL_INDEX), CHANNEL_INDEX = {
  ...UNIT_CHANNEL_INDEX,
  ...FACET_CHANNEL_INDEX
}, CHANNELS = keys3(CHANNEL_INDEX), { order: _o, detail: _d, tooltip: _tt1, ...SINGLE_DEF_CHANNEL_INDEX } = CHANNEL_INDEX, { row: _r, column: _c, facet: _f, ...SINGLE_DEF_UNIT_CHANNEL_INDEX } = SINGLE_DEF_CHANNEL_INDEX;
function isSingleDefUnitChannel(str) {
  return hasOwnProperty(SINGLE_DEF_UNIT_CHANNEL_INDEX, str);
}
function isChannel(str) {
  return hasOwnProperty(CHANNEL_INDEX, str);
}
var SECONDARY_RANGE_CHANNEL = [X23, Y23, LATITUDE2, LONGITUDE2, THETA2, RADIUS2];
function isSecondaryRangeChannel(c) {
  return getMainRangeChannel(c) !== c;
}
function getMainRangeChannel(channel) {
  switch (channel) {
    case X23:
      return X3;
    case Y23:
      return Y3;
    case LATITUDE2:
      return LATITUDE;
    case LONGITUDE2:
      return LONGITUDE;
    case THETA2:
      return THETA;
    case RADIUS2:
      return RADIUS;
  }
  return channel;
}
function getVgPositionChannel(channel) {
  if (isPolarPositionChannel(channel))
    switch (channel) {
      case THETA:
        return "startAngle";
      case THETA2:
        return "endAngle";
      case RADIUS:
        return "outerRadius";
      case RADIUS2:
        return "innerRadius";
    }
  return channel;
}
function getSecondaryRangeChannel(channel) {
  switch (channel) {
    case X3:
      return X23;
    case Y3:
      return Y23;
    case LATITUDE:
      return LATITUDE2;
    case LONGITUDE:
      return LONGITUDE2;
    case THETA:
      return THETA2;
    case RADIUS:
      return RADIUS2;
  }
}
function getSizeChannel(channel) {
  switch (channel) {
    case X3:
    case X23:
      return "width";
    case Y3:
    case Y23:
      return "height";
  }
}
function getOffsetChannel(channel) {
  switch (channel) {
    case X3:
      return "xOffset";
    case Y3:
      return "yOffset";
    case X23:
      return "x2Offset";
    case Y23:
      return "y2Offset";
    case THETA:
      return "thetaOffset";
    case RADIUS:
      return "radiusOffset";
    case THETA2:
      return "theta2Offset";
    case RADIUS2:
      return "radius2Offset";
  }
}
function getOffsetScaleChannel(channel) {
  switch (channel) {
    case X3:
      return "xOffset";
    case Y3:
      return "yOffset";
  }
}
function getMainChannelFromOffsetChannel(channel) {
  switch (channel) {
    case "xOffset":
      return "x";
    case "yOffset":
      return "y";
  }
}
var UNIT_CHANNELS = keys3(UNIT_CHANNEL_INDEX), {
  x: _x,
  y: _y,
  // x2 and y2 share the same scale as x and y
  x2: _x2,
  y2: _y2,
  //
  xOffset: _xo,
  yOffset: _yo,
  latitude: _latitude,
  longitude: _longitude,
  latitude2: _latitude2,
  longitude2: _longitude2,
  theta: _theta,
  theta2: _theta2,
  radius: _radius,
  radius2: _radius2,
  // The rest of unit channels then have scale
  ...NONPOSITION_CHANNEL_INDEX
} = UNIT_CHANNEL_INDEX, NONPOSITION_CHANNELS = keys3(NONPOSITION_CHANNEL_INDEX), POSITION_SCALE_CHANNEL_INDEX = {
  x: 1,
  y: 1
}, POSITION_SCALE_CHANNELS = keys3(POSITION_SCALE_CHANNEL_INDEX);
function isXorY(channel) {
  return hasOwnProperty(POSITION_SCALE_CHANNEL_INDEX, channel);
}
var POLAR_POSITION_SCALE_CHANNEL_INDEX = {
  theta: 1,
  radius: 1
}, POLAR_POSITION_SCALE_CHANNELS = keys3(POLAR_POSITION_SCALE_CHANNEL_INDEX);
function getPositionScaleChannel(sizeType) {
  return sizeType === "width" ? X3 : Y3;
}
var OFFSET_SCALE_CHANNEL_INDEX = { xOffset: 1, yOffset: 1 };
function isXorYOffset(channel) {
  return hasOwnProperty(OFFSET_SCALE_CHANNEL_INDEX, channel);
}
var TIME_SCALE_CHANNEL_INDEX = {
  time: 1
};
function isTime(channel) {
  return channel in TIME_SCALE_CHANNEL_INDEX;
}
var {
  // x2 and y2 share the same scale as x and y
  // text and tooltip have format instead of scale,
  // href has neither format, nor scale
  text: _t,
  tooltip: _tt,
  href: _hr,
  url: _u,
  description: _al,
  // detail and order have no scale
  detail: _dd,
  key: _k,
  order: _oo,
  ...NONPOSITION_SCALE_CHANNEL_INDEX
} = NONPOSITION_CHANNEL_INDEX, NONPOSITION_SCALE_CHANNELS = keys3(NONPOSITION_SCALE_CHANNEL_INDEX);
function isNonPositionScaleChannel(channel) {
  return hasOwnProperty(NONPOSITION_CHANNEL_INDEX, channel);
}
function supportLegend(channel) {
  switch (channel) {
    case COLOR:
    case FILL:
    case STROKE:
    case SIZE2:
    case SHAPE:
    case OPACITY:
    case STROKEWIDTH:
    case STROKEDASH:
      return !0;
    case FILLOPACITY:
    case STROKEOPACITY:
    case ANGLE:
    case TIME:
      return !1;
  }
}
var SCALE_CHANNEL_INDEX = {
  ...POSITION_SCALE_CHANNEL_INDEX,
  ...POLAR_POSITION_SCALE_CHANNEL_INDEX,
  ...OFFSET_SCALE_CHANNEL_INDEX,
  ...NONPOSITION_SCALE_CHANNEL_INDEX
}, SCALE_CHANNELS = keys3(SCALE_CHANNEL_INDEX);
function isScaleChannel(channel) {
  return hasOwnProperty(SCALE_CHANNEL_INDEX, channel);
}
function supportMark(channel, mark) {
  return getSupportedMark(channel)[mark];
}
var ALL_MARKS = {
  // all marks
  arc: "always",
  area: "always",
  bar: "always",
  circle: "always",
  geoshape: "always",
  image: "always",
  line: "always",
  rule: "always",
  point: "always",
  rect: "always",
  square: "always",
  trail: "always",
  text: "always",
  tick: "always"
}, { geoshape: _g, ...ALL_MARKS_EXCEPT_GEOSHAPE } = ALL_MARKS;
function getSupportedMark(channel) {
  switch (channel) {
    case COLOR:
    case FILL:
    case STROKE:
    // falls through
    case DESCRIPTION:
    case DETAIL:
    case KEY:
    case TOOLTIP:
    case HREF:
    case ORDER:
    // TODO: revise (order might not support rect, which is not stackable?)
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case STROKEWIDTH:
    // falls through
    case FACET:
    case ROW:
    // falls through
    case COLUMN:
      return ALL_MARKS;
    case X3:
    case Y3:
    case XOFFSET:
    case YOFFSET:
    case LATITUDE:
    case LONGITUDE:
    case TIME:
      return ALL_MARKS_EXCEPT_GEOSHAPE;
    case X23:
    case Y23:
    case LATITUDE2:
    case LONGITUDE2:
      return {
        area: "always",
        bar: "always",
        image: "always",
        rect: "always",
        rule: "always",
        circle: "binned",
        point: "binned",
        square: "binned",
        tick: "binned",
        line: "binned",
        trail: "binned"
      };
    case SIZE2:
      return {
        point: "always",
        tick: "always",
        rule: "always",
        circle: "always",
        square: "always",
        bar: "always",
        text: "always",
        line: "always",
        trail: "always"
      };
    case STROKEDASH:
      return {
        line: "always",
        point: "always",
        tick: "always",
        rule: "always",
        circle: "always",
        square: "always",
        bar: "always",
        geoshape: "always"
      };
    case SHAPE:
      return { point: "always", geoshape: "always" };
    case TEXT$1:
      return { text: "always" };
    case ANGLE:
      return { point: "always", square: "always", text: "always" };
    case URL2:
      return { image: "always" };
    case THETA:
      return { text: "always", arc: "always" };
    case RADIUS:
      return { text: "always", arc: "always" };
    case THETA2:
    case RADIUS2:
      return { arc: "always" };
  }
}
function rangeType(channel) {
  switch (channel) {
    case X3:
    case Y3:
    case THETA:
    case RADIUS:
    case XOFFSET:
    case YOFFSET:
    case SIZE2:
    case ANGLE:
    case STROKEWIDTH:
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case TIME:
    // X2 and Y2 use X and Y scales, so they similarly have continuous range. [falls through]
    case X23:
    case Y23:
    case THETA2:
    case RADIUS2:
      return;
    case FACET:
    case ROW:
    case COLUMN:
    case SHAPE:
    case STROKEDASH:
    // TEXT, TOOLTIP, URL, and HREF have no scale but have discrete output [falls through]
    case TEXT$1:
    case TOOLTIP:
    case HREF:
    case URL2:
    case DESCRIPTION:
      return "discrete";
    // Color can be either continuous or discrete, depending on scale type.
    case COLOR:
    case FILL:
    case STROKE:
      return "flexible";
    // No scale, no range type.
    case LATITUDE:
    case LONGITUDE:
    case LATITUDE2:
    case LONGITUDE2:
    case DETAIL:
    case KEY:
    case ORDER:
      return;
  }
}
var AGGREGATE_OP_INDEX = {
  argmax: 1,
  argmin: 1,
  average: 1,
  count: 1,
  distinct: 1,
  exponential: 1,
  exponentialb: 1,
  product: 1,
  max: 1,
  mean: 1,
  median: 1,
  min: 1,
  missing: 1,
  q1: 1,
  q3: 1,
  ci0: 1,
  ci1: 1,
  stderr: 1,
  stdev: 1,
  stdevp: 1,
  sum: 1,
  valid: 1,
  values: 1,
  variance: 1,
  variancep: 1
}, MULTIDOMAIN_SORT_OP_INDEX = {
  count: 1,
  min: 1,
  max: 1
};
function isArgminDef(a) {
  return hasProperty(a, "argmin");
}
function isArgmaxDef(a) {
  return hasProperty(a, "argmax");
}
function isAggregateOp(a) {
  return isString(a) && hasOwnProperty(AGGREGATE_OP_INDEX, a);
}
var COUNTING_OPS = /* @__PURE__ */ new Set([
  "count",
  "valid",
  "missing",
  "distinct"
]);
function isCountingAggregateOp(aggregate) {
  return isString(aggregate) && COUNTING_OPS.has(aggregate);
}
function isMinMaxOp(aggregate) {
  return isString(aggregate) && contains2(["min", "max"], aggregate);
}
var SUM_OPS = /* @__PURE__ */ new Set([
  "count",
  "sum",
  "distinct",
  "valid",
  "missing"
]), SHARED_DOMAIN_OPS = /* @__PURE__ */ new Set([
  "mean",
  "average",
  "median",
  "q1",
  "q3",
  "min",
  "max"
]);
function binToString(bin3) {
  return isBoolean(bin3) && (bin3 = normalizeBin(bin3, void 0)), `bin${keys3(bin3).map((p) => isParameterExtent(bin3[p]) ? varName(`_${p}_${entries$1(bin3[p])}`) : varName(`_${p}_${bin3[p]}`)).join("")}`;
}
function isBinning(bin3) {
  return bin3 === !0 || isBinParams(bin3) && !bin3.binned;
}
function isBinned(bin3) {
  return bin3 === "binned" || isBinParams(bin3) && bin3.binned === !0;
}
function isBinParams(bin3) {
  return isObject2(bin3);
}
function isParameterExtent(extent2) {
  return hasProperty(extent2, "param");
}
function autoMaxBins(channel) {
  switch (channel) {
    case ROW:
    case COLUMN:
    case SIZE2:
    case COLOR:
    case FILL:
    case STROKE:
    case STROKEWIDTH:
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    // Facets and Size shouldn't have too many bins
    // We choose 6 like shape to simplify the rule [falls through]
    case SHAPE:
      return 6;
    // Vega's "shape" has 6 distinct values
    case STROKEDASH:
      return 4;
    // We only provide 5 different stroke dash values (but 4 is more effective)
    default:
      return 10;
  }
}
function isExprRef(o) {
  return hasProperty(o, "expr");
}
function replaceExprRef(index4, { level } = { level: 0 }) {
  let props = keys3(index4 || {}), newIndex = {};
  for (let prop of props)
    newIndex[prop] = level === 0 ? signalRefOrValue(index4[prop]) : replaceExprRef(index4[prop], { level: level - 1 });
  return newIndex;
}
function extractTitleConfig(titleConfig) {
  let {
    // These are non-mark title config that need to be hardcoded
    anchor: anchor2,
    frame: frame2,
    offset: offset4,
    orient: orient2,
    angle: angle2,
    limit,
    // color needs to be redirect to fill
    color: color5,
    // subtitle properties
    subtitleColor,
    subtitleFont,
    subtitleFontSize,
    subtitleFontStyle,
    subtitleFontWeight,
    subtitleLineHeight,
    subtitlePadding,
    // The rest are mark config.
    ...rest
  } = titleConfig, titleMarkConfig = {
    ...rest,
    ...color5 ? { fill: color5 } : {}
  }, nonMarkTitleProperties = {
    ...anchor2 ? { anchor: anchor2 } : {},
    ...frame2 ? { frame: frame2 } : {},
    ...offset4 ? { offset: offset4 } : {},
    ...orient2 ? { orient: orient2 } : {},
    ...angle2 !== void 0 ? { angle: angle2 } : {},
    ...limit !== void 0 ? { limit } : {}
  }, subtitle = {
    ...subtitleColor ? { subtitleColor } : {},
    ...subtitleFont ? { subtitleFont } : {},
    ...subtitleFontSize ? { subtitleFontSize } : {},
    ...subtitleFontStyle ? { subtitleFontStyle } : {},
    ...subtitleFontWeight ? { subtitleFontWeight } : {},
    ...subtitleLineHeight ? { subtitleLineHeight } : {},
    ...subtitlePadding ? { subtitlePadding } : {}
  }, subtitleMarkConfig = pick4(titleConfig, ["align", "baseline", "dx", "dy", "limit"]);
  return { titleMarkConfig, subtitleMarkConfig, nonMarkTitleProperties, subtitle };
}
function isText(v2) {
  return isString(v2) || isArray(v2) && isString(v2[0]);
}
function isSignalRef(o) {
  return hasProperty(o, "signal");
}
function isVgRangeStep(range7) {
  return hasProperty(range7, "step");
}
function isDataRefUnionedDomain(domain4) {
  return isArray(domain4) ? !1 : hasProperty(domain4, "fields") && !hasProperty(domain4, "data");
}
function isFieldRefUnionDomain(domain4) {
  return isArray(domain4) ? !1 : hasProperty(domain4, "fields") && hasProperty(domain4, "data");
}
function isDataRefDomain(domain4) {
  return isArray(domain4) ? !1 : hasProperty(domain4, "field") && hasProperty(domain4, "data");
}
var VG_MARK_CONFIG_INDEX = {
  aria: 1,
  description: 1,
  ariaRole: 1,
  ariaRoleDescription: 1,
  blend: 1,
  opacity: 1,
  fill: 1,
  fillOpacity: 1,
  stroke: 1,
  strokeCap: 1,
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDash: 1,
  strokeDashOffset: 1,
  strokeJoin: 1,
  strokeOffset: 1,
  strokeMiterLimit: 1,
  startAngle: 1,
  endAngle: 1,
  padAngle: 1,
  innerRadius: 1,
  outerRadius: 1,
  size: 1,
  shape: 1,
  interpolate: 1,
  tension: 1,
  orient: 1,
  align: 1,
  baseline: 1,
  text: 1,
  dir: 1,
  dx: 1,
  dy: 1,
  ellipsis: 1,
  limit: 1,
  radius: 1,
  theta: 1,
  angle: 1,
  font: 1,
  fontSize: 1,
  fontWeight: 1,
  fontStyle: 1,
  lineBreak: 1,
  lineHeight: 1,
  cursor: 1,
  href: 1,
  tooltip: 1,
  cornerRadius: 1,
  cornerRadiusTopLeft: 1,
  cornerRadiusTopRight: 1,
  cornerRadiusBottomLeft: 1,
  cornerRadiusBottomRight: 1,
  aspect: 1,
  width: 1,
  height: 1,
  url: 1,
  smooth: 1
  // commented below are vg channel that do not have mark config.
  // x: 1,
  // y: 1,
  // x2: 1,
  // y2: 1,
  // xc'|'yc'
  // clip: 1,
  // path: 1,
  // url: 1,
}, VG_MARK_CONFIGS = keys3(VG_MARK_CONFIG_INDEX), VG_MARK_INDEX = {
  arc: 1,
  area: 1,
  group: 1,
  image: 1,
  line: 1,
  path: 1,
  rect: 1,
  rule: 1,
  shape: 1,
  symbol: 1,
  text: 1,
  trail: 1
}, VG_CORNERRADIUS_CHANNELS = [
  "cornerRadius",
  "cornerRadiusTopLeft",
  "cornerRadiusTopRight",
  "cornerRadiusBottomLeft",
  "cornerRadiusBottomRight"
], BIN_RANGE_DELIMITER = " \u2013 ";
function signalOrValueRefWithCondition(val) {
  let condition = isArray(val.condition) ? val.condition.map(conditionalSignalRefOrValue) : conditionalSignalRefOrValue(val.condition);
  return {
    ...signalRefOrValue(val),
    condition
  };
}
function signalRefOrValue(value3) {
  if (isExprRef(value3)) {
    let { expr: expr2, ...rest } = value3;
    return { signal: expr2, ...rest };
  }
  return value3;
}
function conditionalSignalRefOrValue(value3) {
  if (isExprRef(value3)) {
    let { expr: expr2, ...rest } = value3;
    return { signal: expr2, ...rest };
  }
  return value3;
}
function signalOrValueRef(value3) {
  if (isExprRef(value3)) {
    let { expr: expr2, ...rest } = value3;
    return { signal: expr2, ...rest };
  }
  return isSignalRef(value3) ? value3 : value3 !== void 0 ? { value: value3 } : void 0;
}
function exprFromSignalRefOrValue(ref2) {
  return isSignalRef(ref2) ? ref2.signal : stringValue(ref2);
}
function exprFromValueRefOrSignalRef(ref2) {
  return isSignalRef(ref2) ? ref2.signal : stringValue(ref2.value);
}
function signalOrStringValue(v2) {
  return isSignalRef(v2) ? v2.signal : v2 == null ? null : stringValue(v2);
}
function applyMarkConfig(e, model, propsList) {
  for (let property2 of propsList) {
    let value3 = getMarkConfig(property2, model.markDef, model.config);
    value3 !== void 0 && (e[property2] = signalOrValueRef(value3));
  }
  return e;
}
function getStyles(mark) {
  return [].concat(mark.type, mark.style ?? []);
}
function getMarkPropOrConfig(channel, mark, config2, opt = {}) {
  let { vgChannel, ignoreVgConfig } = opt;
  return vgChannel && hasProperty(mark, vgChannel) ? mark[vgChannel] : mark[channel] !== void 0 ? mark[channel] : ignoreVgConfig && (!vgChannel || vgChannel === channel) ? void 0 : getMarkConfig(channel, mark, config2, opt);
}
function getMarkConfig(channel, mark, config2, { vgChannel } = {}) {
  let cfg = getMarkStyleConfig(channel, mark, config2.style);
  return getFirstDefined(
    // style config has highest precedence
    vgChannel ? cfg : void 0,
    cfg,
    // then mark-specific config
    vgChannel ? config2[mark.type][vgChannel] : void 0,
    config2[mark.type][channel],
    // Need to cast because MarkDef doesn't perfectly match with AnyMarkConfig, but if the type isn't available, we'll get nothing here, which is fine
    // If there is vgChannel, skip vl channel.
    // For example, vl size for text is vg fontSize, but config.mark.size is only for point size.
    vgChannel ? config2.mark[vgChannel] : config2.mark[channel]
  );
}
function getMarkStyleConfig(prop, mark, styleConfigIndex) {
  return getStyleConfig(prop, getStyles(mark), styleConfigIndex);
}
function getStyleConfig(p, styles, styleConfigIndex) {
  styles = array_default(styles);
  let value3;
  for (let style2 of styles) {
    let styleConfig = styleConfigIndex[style2];
    hasProperty(styleConfig, p) && (value3 = styleConfig[p]);
  }
  return value3;
}
function sortParams(orderDef, fieldRefOption) {
  return array_default(orderDef).reduce((s, orderChannelDef) => (s.field.push(vgField(orderChannelDef, fieldRefOption)), s.order.push(orderChannelDef.sort ?? "ascending"), s), { field: [], order: [] });
}
function mergeTitleFieldDefs(f1, f2) {
  let merged = [...f1];
  return f2.forEach((fdToMerge) => {
    for (let fieldDef1 of merged)
      if (deepEqual(fieldDef1, fdToMerge))
        return;
    merged.push(fdToMerge);
  }), merged;
}
function mergeTitle(title1, title2) {
  return deepEqual(title1, title2) || !title2 ? title1 : title1 ? [...array_default(title1), ...array_default(title2)].join(", ") : title2;
}
function mergeTitleComponent(v1, v2) {
  let v1Val = v1.value, v2Val = v2.value;
  if (v1Val == null || v2Val === null)
    return {
      explicit: v1.explicit,
      value: null
    };
  if ((isText(v1Val) || isSignalRef(v1Val)) && (isText(v2Val) || isSignalRef(v2Val)))
    return {
      explicit: v1.explicit,
      value: mergeTitle(v1Val, v2Val)
    };
  if (isText(v1Val) || isSignalRef(v1Val))
    return {
      explicit: v1.explicit,
      value: v1Val
    };
  if (isText(v2Val) || isSignalRef(v2Val))
    return {
      explicit: v1.explicit,
      value: v2Val
    };
  if (!isText(v1Val) && !isSignalRef(v1Val) && !isText(v2Val) && !isSignalRef(v2Val))
    return {
      explicit: v1.explicit,
      value: mergeTitleFieldDefs(v1Val, v2Val)
    };
  throw new Error("It should never reach here");
}
function invalidSpec(spec) {
  return `Invalid specification ${stringify(spec)}. Make sure the specification includes at least one of the following properties: "mark", "layer", "facet", "hconcat", "vconcat", "concat", or "repeat".`;
}
var FIT_NON_SINGLE = 'Autosize "fit" only works for single views and layered views.';
function containerSizeNonSingle(name2) {
  return `${name2 == "width" ? "Width" : "Height"} "container" only works for single views and layered views.`;
}
function containerSizeNotCompatibleWithAutosize(name2) {
  let uName = name2 == "width" ? "Width" : "Height", fitDirection = name2 == "width" ? "x" : "y";
  return `${uName} "container" only works well with autosize "fit" or "fit-${fitDirection}".`;
}
function droppingFit(channel) {
  return channel ? `Dropping "fit-${channel}" because spec has discrete ${getSizeChannel(channel)}.` : 'Dropping "fit" because spec has discrete size.';
}
function unknownField(channel) {
  return `Unknown field for ${channel}. Cannot calculate view size.`;
}
function cannotProjectOnChannelWithoutField(channel) {
  return `Cannot project a selection on encoding channel "${channel}", which has no field.`;
}
function cannotProjectAggregate(channel, aggregate) {
  return `Cannot project a selection on encoding channel "${channel}" as it uses an aggregate function ("${aggregate}").`;
}
function nearestNotSupportForContinuous(mark) {
  return `The "nearest" transform is not supported for ${mark} marks.`;
}
function selectionNotSupported(mark) {
  return `Selection not supported for ${mark} yet.`;
}
function selectionNotFound(name2) {
  return `Cannot find a selection named "${name2}".`;
}
var SCALE_BINDINGS_CONTINUOUS = "Scale bindings are currently only supported for scales with unbinned, continuous domains.", SEQUENTIAL_SCALE_DEPRECATED = "Sequntial scales are deprecated. The available quantitative scale type values are linear, log, pow, sqrt, symlog, time and utc", LEGEND_BINDINGS_MUST_HAVE_PROJECTION = "Legend bindings are only supported for selections over an individual field or encoding channel.";
function cannotLookupVariableParameter(name2) {
  return `Lookups can only be performed on selection parameters. "${name2}" is a variable parameter.`;
}
function noSameUnitLookup(name2) {
  return `Cannot define and lookup the "${name2}" selection in the same view. Try moving the lookup into a second, layered view?`;
}
var NEEDS_SAME_SELECTION = "The same selection must be used to override scale domains in a layered view.", INTERVAL_INITIALIZED_WITH_POS = 'Interval selections should be initialized using "x", "y", "longitude", or "latitude" keys.';
function noSuchRepeatedValue(field3) {
  return `Unknown repeated value "${field3}".`;
}
function columnsNotSupportByRowCol(type3) {
  return `The "columns" property cannot be used when "${type3}" has nested row/column.`;
}
var MULTIPLE_TIMER_ANIMATION_SELECTION = "Multiple timer selections in one unit spec are not supported. Ignoring all but the first.", MULTI_VIEW_ANIMATION_UNSUPPORTED = "Animation involving facet, layer, or concat is currently unsupported.";
function selectionAsScaleDomainWithoutField(field3) {
  return `A "field" or "encoding" must be specified when using a selection as a scale domain. Using "field": ${stringValue(field3)}.`;
}
function selectionAsScaleDomainWrongEncodings(encodings, encoding, extent2, field3) {
  return `${encodings.length ? "Multiple " : "No "}matching ${stringValue(encoding)} encoding found for selection ${stringValue(extent2.param)}. Using "field": ${stringValue(field3)}.`;
}
var CONCAT_CANNOT_SHARE_AXIS = "Axes cannot be shared in concatenated or repeated views yet (https://github.com/vega/vega-lite/issues/2415).";
function unrecognizedParse(p) {
  return `Unrecognized parse "${p}".`;
}
function differentParse(field3, local, ancestor) {
  return `An ancestor parsed field "${field3}" as ${ancestor} but a child wants to parse the field as ${local}.`;
}
var ADD_SAME_CHILD_TWICE = "Attempt to add the same child twice.";
function invalidTransformIgnored(transform5) {
  return `Ignoring an invalid transform: ${stringify(transform5)}.`;
}
var NO_FIELDS_NEEDS_AS = 'If "from.fields" is not specified, "as" has to be a string that specifies the key to be used for the data from the secondary source.';
function customFormatTypeNotAllowed(channel) {
  return `Config.customFormatTypes is not true, thus custom format type and format for channel ${channel} are dropped.`;
}
function projectionOverridden(opt) {
  let { parentProjection, projection: projection3 } = opt;
  return `Layer's shared projection ${stringify(parentProjection)} is overridden by a child projection ${stringify(projection3)}.`;
}
var REPLACE_ANGLE_WITH_THETA = "Arc marks uses theta channel rather than angle, replacing angle with theta.";
function offsetNestedInsideContinuousPositionScaleDropped(mainChannel) {
  return `${mainChannel}Offset dropped because ${mainChannel} is continuous`;
}
function primitiveChannelDef(channel, type3, value3) {
  return `Channel ${channel} is a ${type3}. Converted to {value: ${stringify(value3)}}.`;
}
function invalidFieldType(type3) {
  return `Invalid field type "${type3}".`;
}
function invalidFieldTypeForCountAggregate(type3, aggregate) {
  return `Invalid field type "${type3}" for aggregate: "${aggregate}", using "quantitative" instead.`;
}
function invalidAggregate(aggregate) {
  return `Invalid aggregation operator "${aggregate}".`;
}
function droppingColor(type3, opt) {
  let { fill: fill2, stroke: stroke2 } = opt;
  return `Dropping color ${type3} as the plot also has ${fill2 && stroke2 ? "fill and stroke" : fill2 ? "fill" : "stroke"}.`;
}
function relativeBandSizeNotSupported(sizeChannel) {
  return `Position range does not support relative band size for ${sizeChannel}.`;
}
function emptyFieldDef(fieldDef, channel) {
  return `Dropping ${stringify(fieldDef)} from channel "${channel}" since it does not contain any data field, datum, value, or signal.`;
}
var LINE_WITH_VARYING_SIZE = "Line marks cannot encode size with a non-groupby field. You may want to use trail marks instead.";
function incompatibleChannel(channel, markOrFacet, when) {
  return `${channel} dropped as it is incompatible with "${markOrFacet}".`;
}
function invalidEncodingChannel(channel) {
  return `${channel}-encoding is dropped as ${channel} is not a valid encoding channel.`;
}
function channelShouldBeDiscrete(channel) {
  return `${channel} encoding should be discrete (ordinal / nominal / binned).`;
}
function channelShouldBeDiscreteOrDiscretizing(channel) {
  return `${channel} encoding should be discrete (ordinal / nominal / binned) or use a discretizing scale (e.g. threshold).`;
}
function facetChannelDropped(channels) {
  return `Facet encoding dropped as ${channels.join(" and ")} ${channels.length > 1 ? "are" : "is"} also specified.`;
}
function discreteChannelCannotEncode(channel, type3) {
  return `Using discrete channel "${channel}" to encode "${type3}" field can be misleading as it does not encode ${type3 === "ordinal" ? "order" : "magnitude"}.`;
}
function rangeMarkAlignmentCannotBeExpression(align2) {
  return `The ${align2} for range marks cannot be an expression`;
}
function lineWithRange(hasX2, hasY2) {
  return `Line mark is for continuous lines and thus cannot be used with ${hasX2 && hasY2 ? "x2 and y2" : hasX2 ? "x2" : "y2"}. We will use the rule mark (line segments) instead.`;
}
function orientOverridden(original, actual) {
  return `Specified orient "${original}" overridden with "${actual}".`;
}
function cannotUseScalePropertyWithNonColor(prop) {
  return `Cannot use the scale property "${prop}" with non-color channel.`;
}
function cannotUseRelativeBandSizeWithNonBandScale(scaleType2) {
  return `Cannot use the relative band size with ${scaleType2} scale.`;
}
function unaggregateDomainHasNoEffectForRawField(fieldDef) {
  return `Using unaggregated domain with raw field has no effect (${stringify(fieldDef)}).`;
}
function unaggregateDomainWithNonSharedDomainOp(aggregate) {
  return `Unaggregated domain not applicable for "${aggregate}" since it produces values outside the origin domain of the source data.`;
}
function unaggregatedDomainWithLogScale(fieldDef) {
  return `Unaggregated domain is currently unsupported for log scale (${stringify(fieldDef)}).`;
}
function cannotApplySizeToNonOrientedMark(mark) {
  return `Cannot apply size to non-oriented mark "${mark}".`;
}
function scaleTypeNotWorkWithChannel(channel, scaleType2, defaultScaleType) {
  return `Channel "${channel}" does not work with "${scaleType2}" scale. We are using "${defaultScaleType}" scale instead.`;
}
function scaleTypeNotWorkWithFieldDef(scaleType2, defaultScaleType) {
  return `FieldDef does not work with "${scaleType2}" scale. We are using "${defaultScaleType}" scale instead.`;
}
function scalePropertyNotWorkWithScaleType(scaleType2, propName, channel) {
  return `${channel}-scale's "${propName}" is dropped as it does not work with ${scaleType2} scale.`;
}
function stepDropped(channel) {
  return `The step for "${channel}" is dropped because the ${channel === "width" ? "x" : "y"} is continuous.`;
}
function mergeConflictingProperty(property2, propertyOf, v1, v2) {
  return `Conflicting ${propertyOf.toString()} property "${property2.toString()}" (${stringify(v1)} and ${stringify(v2)}). Using ${stringify(v1)}.`;
}
function mergeConflictingDomainProperty(property2, propertyOf, v1, v2) {
  return `Conflicting ${propertyOf.toString()} property "${property2.toString()}" (${stringify(v1)} and ${stringify(v2)}). Using the union of the two domains.`;
}
function independentScaleMeansIndependentGuide(channel) {
  return `Setting the scale to be independent for "${channel}" means we also have to set the guide (axis or legend) to be independent.`;
}
function domainSortDropped(sort3) {
  return `Dropping sort property ${stringify(sort3)} as unioned domains only support boolean or op "count", "min", and "max".`;
}
var MORE_THAN_ONE_SORT = "Domains that should be unioned has conflicting sort properties. Sort will be set to true.", FACETED_INDEPENDENT_DIFFERENT_SOURCES = "Detected faceted independent scales that union domain of multiple fields from different data sources. We will use the first field. The result view size may be incorrect.", FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES = "Detected faceted independent scales that union domain of the same fields from different source. We will assume that this is the same field from a different fork of the same data source. However, if this is not the case, the result view size may be incorrect.", FACETED_INDEPENDENT_SAME_SOURCE = "Detected faceted independent scales that union domain of multiple fields from the same data source. We will use the first field. The result view size may be incorrect.";
function legendValuesUnioned(channelA, channelB) {
  return `Unioning discrete legend values from ${channelA} and ${channelB}.`;
}
function cannotStackRangedMark(channel) {
  return `Cannot stack "${channel}" if there is already "${channel}2".`;
}
function stackNonLinearScale(scaleType2) {
  return `Stack is applied to a non-linear scale (${scaleType2}).`;
}
function stackNonSummativeAggregate(aggregate) {
  return `Stacking is applied even though the aggregate function is non-summative ("${aggregate}").`;
}
function invalidTimeUnit(unitName2, value3) {
  return `Invalid ${unitName2}: ${stringify(value3)}.`;
}
function droppedDay(d) {
  return `Dropping day from datetime ${stringify(d)} as day cannot be combined with other units.`;
}
function errorBarCenterAndExtentAreNotNeeded(center, extent2) {
  return `${extent2 ? "extent " : ""}${extent2 && center ? "and " : ""}${center ? "center " : ""}${extent2 && center ? "are " : "is "}not needed when data are aggregated.`;
}
function errorBarCenterIsUsedWithWrongExtent(center, extent2, mark) {
  return `${center} is not usually used with ${extent2} for ${mark}.`;
}
function errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark) {
  return `Continuous axis should not have customized aggregation function ${aggregate}; ${compositeMark} already agregates the axis.`;
}
function errorBand1DNotSupport(property2) {
  return `1D error band does not support ${property2}.`;
}
function channelRequiredForBinned(channel) {
  return `Channel ${channel} is required for "binned" bin.`;
}
function channelShouldNotBeUsedForBinned(channel) {
  return `Channel ${channel} should not be used with "binned" bin.`;
}
function domainRequiredForThresholdScale(channel) {
  return `Domain for ${channel} is required for threshold scale.`;
}
var main = logger_default(Warn), current = main;
function set7(newLogger) {
  return current = newLogger, current;
}
function reset2() {
  return current = main, current;
}
function error63(...args) {
  current.error(...args);
}
function warn2(...args) {
  current.warn(...args);
}
function debug2(...args) {
  current.debug(...args);
}
function isDateTime(o) {
  if (o && isObject2(o)) {
    for (let part of TIMEUNIT_PARTS)
      if (hasProperty(o, part))
        return !0;
  }
  return !1;
}
var MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
], SHORT_MONTHS = MONTHS.map((m) => m.substr(0, 3)), DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], SHORT_DAYS = DAYS.map((d) => d.substr(0, 3));
function normalizeQuarter(q) {
  if (isNumeric(q) && (q = +q), isNumber(q))
    return q > 4 && warn2(invalidTimeUnit("quarter", q)), q - 1;
  throw new Error(invalidTimeUnit("quarter", q));
}
function normalizeMonth(m) {
  if (isNumeric(m) && (m = +m), isNumber(m))
    return m - 1;
  {
    let lowerM = m.toLowerCase(), monthIndex = MONTHS.indexOf(lowerM);
    if (monthIndex !== -1)
      return monthIndex;
    let shortM = lowerM.substr(0, 3), shortMonthIndex = SHORT_MONTHS.indexOf(shortM);
    if (shortMonthIndex !== -1)
      return shortMonthIndex;
    throw new Error(invalidTimeUnit("month", m));
  }
}
function normalizeDay(d) {
  if (isNumeric(d) && (d = +d), isNumber(d))
    return d % 7;
  {
    let lowerD = d.toLowerCase(), dayIndex = DAYS.indexOf(lowerD);
    if (dayIndex !== -1)
      return dayIndex;
    let shortD = lowerD.substr(0, 3), shortDayIndex = SHORT_DAYS.indexOf(shortD);
    if (shortDayIndex !== -1)
      return shortDayIndex;
    throw new Error(invalidTimeUnit("day", d));
  }
}
function dateTimeParts(d, normalize5) {
  let parts = [];
  if (normalize5 && d.day !== void 0 && keys3(d).length > 1 && (warn2(droppedDay(d)), d = duplicate(d), delete d.day), d.year !== void 0 ? parts.push(d.year) : parts.push(2012), d.month !== void 0) {
    let month = normalize5 ? normalizeMonth(d.month) : d.month;
    parts.push(month);
  } else if (d.quarter !== void 0) {
    let quarter2 = normalize5 ? normalizeQuarter(d.quarter) : d.quarter;
    parts.push(isNumber(quarter2) ? quarter2 * 3 : `${quarter2}*3`);
  } else
    parts.push(0);
  if (d.date !== void 0)
    parts.push(d.date);
  else if (d.day !== void 0) {
    let day = normalize5 ? normalizeDay(d.day) : d.day;
    parts.push(isNumber(day) ? day + 1 : `${day}+1`);
  } else
    parts.push(1);
  for (let timeUnit of ["hours", "minutes", "seconds", "milliseconds"]) {
    let unit2 = d[timeUnit];
    parts.push(typeof unit2 > "u" ? 0 : unit2);
  }
  return parts;
}
function dateTimeToExpr(d) {
  let string4 = dateTimeParts(d, !0).join(", ");
  return d.utc ? `utc(${string4})` : `datetime(${string4})`;
}
function dateTimeExprToExpr(d) {
  let string4 = dateTimeParts(d, !1).join(", ");
  return d.utc ? `utc(${string4})` : `datetime(${string4})`;
}
function dateTimeToTimestamp(d) {
  let parts = dateTimeParts(d, !0);
  return d.utc ? +new Date(Date.UTC(...parts)) : +new Date(...parts);
}
var LOCAL_SINGLE_TIMEUNIT_INDEX = {
  year: 1,
  quarter: 1,
  month: 1,
  week: 1,
  day: 1,
  dayofyear: 1,
  date: 1,
  hours: 1,
  minutes: 1,
  seconds: 1,
  milliseconds: 1
}, TIMEUNIT_PARTS = keys3(LOCAL_SINGLE_TIMEUNIT_INDEX);
function isLocalSingleTimeUnit(timeUnit) {
  return hasOwnProperty(LOCAL_SINGLE_TIMEUNIT_INDEX, timeUnit);
}
function isBinnedTimeUnit(timeUnit) {
  return isObject2(timeUnit) ? timeUnit.binned : isBinnedTimeUnitString(timeUnit);
}
function isBinnedTimeUnitString(timeUnit) {
  return timeUnit?.startsWith("binned");
}
function isUTCTimeUnit(t) {
  return t.startsWith("utc");
}
function getLocalTimeUnitFromUTCTimeUnit(t) {
  return t.substring(3);
}
var VEGALITE_TIMEFORMAT = {
  "year-month": "%b %Y ",
  "year-month-date": "%b %d, %Y "
};
function getTimeUnitParts(timeUnit) {
  return TIMEUNIT_PARTS.filter((part) => containsTimeUnit(timeUnit, part));
}
function getSmallestTimeUnitPart(timeUnit) {
  let parts = getTimeUnitParts(timeUnit);
  return parts[parts.length - 1];
}
function containsTimeUnit(fullTimeUnit, timeUnit) {
  let index4 = fullTimeUnit.indexOf(timeUnit);
  return !(index4 < 0 || index4 > 0 && timeUnit === "seconds" && fullTimeUnit.charAt(index4 - 1) === "i" || fullTimeUnit.length > index4 + 3 && timeUnit === "day" && fullTimeUnit.charAt(index4 + 3) === "o" || index4 > 0 && timeUnit === "year" && fullTimeUnit.charAt(index4 - 1) === "f");
}
function fieldExpr(fullTimeUnit, field3, { end } = { end: !1 }) {
  let fieldRef2 = accessPathWithDatum(field3), utc = isUTCTimeUnit(fullTimeUnit) ? "utc" : "";
  function func(timeUnit) {
    return timeUnit === "quarter" ? `(${utc}quarter(${fieldRef2})-1)` : `${utc}${timeUnit}(${fieldRef2})`;
  }
  let lastTimeUnit, dateExpr = {};
  for (let part of TIMEUNIT_PARTS)
    containsTimeUnit(fullTimeUnit, part) && (dateExpr[part] = func(part), lastTimeUnit = part);
  return end && (dateExpr[lastTimeUnit] += "+1"), dateTimeExprToExpr(dateExpr);
}
function timeUnitSpecifierExpression(timeUnit) {
  if (!timeUnit)
    return;
  let timeUnitParts = getTimeUnitParts(timeUnit);
  return `timeUnitSpecifier(${stringify(timeUnitParts)}, ${stringify(VEGALITE_TIMEFORMAT)})`;
}
function formatExpression(timeUnit, field3, isUTCScale) {
  if (!timeUnit)
    return;
  let expr2 = timeUnitSpecifierExpression(timeUnit);
  return `${isUTCScale || isUTCTimeUnit(timeUnit) ? "utc" : "time"}Format(${field3}, ${expr2})`;
}
function normalizeTimeUnit(timeUnit) {
  if (!timeUnit)
    return;
  let params2;
  return isString(timeUnit) ? isBinnedTimeUnitString(timeUnit) ? params2 = {
    unit: timeUnit.substring(6),
    binned: !0
  } : params2 = {
    unit: timeUnit
  } : isObject2(timeUnit) && (params2 = {
    ...timeUnit,
    ...timeUnit.unit ? { unit: timeUnit.unit } : {}
  }), isUTCTimeUnit(params2.unit) && (params2.utc = !0, params2.unit = getLocalTimeUnitFromUTCTimeUnit(params2.unit)), params2;
}
function timeUnitToString(tu) {
  let { utc, ...rest } = normalizeTimeUnit(tu);
  return rest.unit ? (utc ? "utc" : "") + keys3(rest).map((p) => varName(`${p === "unit" ? "" : `_${p}_`}${rest[p]}`)).join("") : `${utc ? "utc" : ""}timeunit${keys3(rest).map((p) => varName(`_${p}_${rest[p]}`)).join("")}`;
}
function durationExpr(timeUnit, wrap2 = (x5) => x5) {
  let normalizedTimeUnit = normalizeTimeUnit(timeUnit), smallestUnitPart = getSmallestTimeUnitPart(normalizedTimeUnit.unit);
  if (smallestUnitPart && smallestUnitPart !== "day") {
    let startDate = {
      year: 2001,
      // pick a non-leap year
      month: 1,
      date: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    }, { step, part } = getDateTimePartAndStep(smallestUnitPart, normalizedTimeUnit.step), endDate = {
      ...startDate,
      [part]: +startDate[part] + step
    };
    return `${wrap2(dateTimeToExpr(endDate))} - ${wrap2(dateTimeToExpr(startDate))}`;
  }
}
var DATE_PARTS = {
  year: 1,
  month: 1,
  date: 1,
  hours: 1,
  minutes: 1,
  seconds: 1,
  milliseconds: 1
};
function isDatePart(timeUnit) {
  return hasOwnProperty(DATE_PARTS, timeUnit);
}
function getDateTimePartAndStep(timeUnit, step = 1) {
  if (isDatePart(timeUnit))
    return { part: timeUnit, step };
  switch (timeUnit) {
    case "day":
    case "dayofyear":
      return { part: "date", step };
    case "quarter":
      return { part: "month", step: step * 3 };
    case "week":
      return { part: "date", step: step * 7 };
  }
}
function isSelectionPredicate(predicate) {
  return hasProperty(predicate, "param");
}
function isFieldEqualPredicate(predicate) {
  return !!predicate?.field && predicate.equal !== void 0;
}
function isFieldLTPredicate(predicate) {
  return !!predicate?.field && predicate.lt !== void 0;
}
function isFieldLTEPredicate(predicate) {
  return !!predicate?.field && predicate.lte !== void 0;
}
function isFieldGTPredicate(predicate) {
  return !!predicate?.field && predicate.gt !== void 0;
}
function isFieldGTEPredicate(predicate) {
  return !!predicate?.field && predicate.gte !== void 0;
}
function isFieldRangePredicate(predicate) {
  if (predicate?.field) {
    if (isArray(predicate.range) && predicate.range.length === 2)
      return !0;
    if (isSignalRef(predicate.range))
      return !0;
  }
  return !1;
}
function isFieldOneOfPredicate(predicate) {
  return !!predicate?.field && (isArray(predicate.oneOf) || isArray(predicate.in));
}
function isFieldValidPredicate(predicate) {
  return !!predicate?.field && predicate.valid !== void 0;
}
function isFieldPredicate(predicate) {
  return isFieldOneOfPredicate(predicate) || isFieldEqualPredicate(predicate) || isFieldRangePredicate(predicate) || isFieldLTPredicate(predicate) || isFieldGTPredicate(predicate) || isFieldLTEPredicate(predicate) || isFieldGTEPredicate(predicate);
}
function predicateValueExpr(v2, timeUnit) {
  return valueExpr(v2, { timeUnit, wrapTime: !0 });
}
function predicateValuesExpr(vals2, timeUnit) {
  return vals2.map((v2) => predicateValueExpr(v2, timeUnit));
}
function fieldFilterExpression(predicate, useInRange = !0) {
  let { field: field3 } = predicate, normalizedTimeUnit = normalizeTimeUnit(predicate.timeUnit), { unit: unit2, binned } = normalizedTimeUnit || {}, rawFieldExpr = vgField(predicate, { expr: "datum" }), fieldExpr$1 = unit2 ? (
    // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
    // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
    // TODO: support utc
    `time(${binned ? rawFieldExpr : fieldExpr(unit2, field3)})`
  ) : rawFieldExpr;
  if (isFieldEqualPredicate(predicate))
    return `${fieldExpr$1}===${predicateValueExpr(predicate.equal, unit2)}`;
  if (isFieldLTPredicate(predicate)) {
    let upper = predicate.lt;
    return `${fieldExpr$1}<${predicateValueExpr(upper, unit2)}`;
  } else if (isFieldGTPredicate(predicate)) {
    let lower = predicate.gt;
    return `${fieldExpr$1}>${predicateValueExpr(lower, unit2)}`;
  } else if (isFieldLTEPredicate(predicate)) {
    let upper = predicate.lte;
    return `${fieldExpr$1}<=${predicateValueExpr(upper, unit2)}`;
  } else if (isFieldGTEPredicate(predicate)) {
    let lower = predicate.gte;
    return `${fieldExpr$1}>=${predicateValueExpr(lower, unit2)}`;
  } else {
    if (isFieldOneOfPredicate(predicate))
      return `indexof([${predicateValuesExpr(predicate.oneOf, unit2).join(",")}], ${fieldExpr$1}) !== -1`;
    if (isFieldValidPredicate(predicate))
      return fieldValidPredicate(fieldExpr$1, predicate.valid);
    if (isFieldRangePredicate(predicate)) {
      let { range: range7 } = replaceExprRef(predicate), lower = isSignalRef(range7) ? { signal: `${range7.signal}[0]` } : range7[0], upper = isSignalRef(range7) ? { signal: `${range7.signal}[1]` } : range7[1];
      if (lower !== null && upper !== null && useInRange)
        return `inrange(${fieldExpr$1}, [${predicateValueExpr(lower, unit2)}, ${predicateValueExpr(upper, unit2)}])`;
      let exprs = [];
      return lower !== null && exprs.push(`${fieldExpr$1} >= ${predicateValueExpr(lower, unit2)}`), upper !== null && exprs.push(`${fieldExpr$1} <= ${predicateValueExpr(upper, unit2)}`), exprs.length > 0 ? exprs.join(" && ") : "true";
    }
  }
  throw new Error(`Invalid field predicate: ${stringify(predicate)}`);
}
function fieldValidPredicate(fieldExpr2, valid = !0) {
  return valid ? `isValid(${fieldExpr2}) && isFinite(+${fieldExpr2})` : `!isValid(${fieldExpr2}) || !isFinite(+${fieldExpr2})`;
}
function normalizePredicate$1(f) {
  return isFieldPredicate(f) && f.timeUnit ? {
    ...f,
    timeUnit: normalizeTimeUnit(f.timeUnit)
  } : f;
}
var Type = {
  quantitative: "quantitative",
  ordinal: "ordinal",
  temporal: "temporal",
  nominal: "nominal",
  geojson: "geojson"
};
function isContinuous2(type3) {
  return type3 === "quantitative" || type3 === "temporal";
}
function isDiscrete$1(type3) {
  return type3 === "ordinal" || type3 === "nominal";
}
var QUANTITATIVE = Type.quantitative, ORDINAL2 = Type.ordinal, TEMPORAL = Type.temporal, NOMINAL = Type.nominal, GEOJSON = Type.geojson;
function getFullName(type3) {
  if (type3)
    switch (type3 = type3.toLowerCase(), type3) {
      case "q":
      case QUANTITATIVE:
        return "quantitative";
      case "t":
      case TEMPORAL:
        return "temporal";
      case "o":
      case ORDINAL2:
        return "ordinal";
      case "n":
      case NOMINAL:
        return "nominal";
      case GEOJSON:
        return "geojson";
    }
}
var ScaleType = {
  // Continuous - Quantitative
  LINEAR: "linear",
  LOG: "log",
  POW: "pow",
  SQRT: "sqrt",
  // Continuous - Time
  TIME: "time",
  UTC: "utc",
  POINT: "point",
  BAND: "band"
}, SCALE_CATEGORY_INDEX = {
  linear: "numeric",
  log: "numeric",
  pow: "numeric",
  sqrt: "numeric",
  symlog: "numeric",
  identity: "numeric",
  sequential: "numeric",
  time: "time",
  utc: "time",
  ordinal: "ordinal",
  "bin-ordinal": "bin-ordinal",
  // TODO: should bin-ordinal support merging with other
  point: "ordinal-position",
  band: "ordinal-position",
  quantile: "discretizing",
  quantize: "discretizing",
  threshold: "discretizing"
};
function scaleCompatible(scaleType1, scaleType2) {
  let scaleCategory1 = SCALE_CATEGORY_INDEX[scaleType1], scaleCategory2 = SCALE_CATEGORY_INDEX[scaleType2];
  return scaleCategory1 === scaleCategory2 || scaleCategory1 === "ordinal-position" && scaleCategory2 === "time" || scaleCategory2 === "ordinal-position" && scaleCategory1 === "time";
}
var SCALE_PRECEDENCE_INDEX = {
  // numeric
  linear: 0,
  log: 1,
  pow: 1,
  sqrt: 1,
  symlog: 1,
  identity: 1,
  sequential: 1,
  // time
  time: 0,
  utc: 0,
  // ordinal-position -- these have higher precedence than continuous scales as they support more types of data
  point: 10,
  band: 11,
  // band has higher precedence as it is better for interaction
  // non grouped types
  ordinal: 0,
  "bin-ordinal": 0,
  quantile: 0,
  quantize: 0,
  threshold: 0
};
function scaleTypePrecedence(scaleType2) {
  return SCALE_PRECEDENCE_INDEX[scaleType2];
}
var QUANTITATIVE_SCALES = /* @__PURE__ */ new Set([
  "linear",
  "log",
  "pow",
  "sqrt",
  "symlog"
]), CONTINUOUS_TO_CONTINUOUS_SCALES = /* @__PURE__ */ new Set([
  ...QUANTITATIVE_SCALES,
  "time",
  "utc"
]);
function isQuantitative(type3) {
  return QUANTITATIVE_SCALES.has(type3);
}
var CONTINUOUS_TO_DISCRETE_SCALES = /* @__PURE__ */ new Set([
  "quantile",
  "quantize",
  "threshold"
]), CONTINUOUS_DOMAIN_SCALES = /* @__PURE__ */ new Set([
  ...CONTINUOUS_TO_CONTINUOUS_SCALES,
  ...CONTINUOUS_TO_DISCRETE_SCALES,
  "sequential",
  "identity"
]), DISCRETE_DOMAIN_SCALES = /* @__PURE__ */ new Set([
  "ordinal",
  "bin-ordinal",
  "point",
  "band"
]);
function hasDiscreteDomain(type3) {
  return DISCRETE_DOMAIN_SCALES.has(type3);
}
function hasContinuousDomain(type3) {
  return CONTINUOUS_DOMAIN_SCALES.has(type3);
}
function isContinuousToContinuous(type3) {
  return CONTINUOUS_TO_CONTINUOUS_SCALES.has(type3);
}
function isContinuousToDiscrete(type3) {
  return CONTINUOUS_TO_DISCRETE_SCALES.has(type3);
}
var defaultScaleConfig = {
  pointPadding: 0.5,
  barBandPaddingInner: 0.1,
  rectBandPaddingInner: 0,
  tickBandPaddingInner: 0.25,
  bandWithNestedOffsetPaddingInner: 0.2,
  bandWithNestedOffsetPaddingOuter: 0.2,
  minBandSize: 2,
  minFontSize: 8,
  maxFontSize: 40,
  minOpacity: 0.3,
  maxOpacity: 0.8,
  // FIXME: revise if these *can* become ratios of width/height step
  minSize: 4,
  // Point size is area. For square point, 9 = 3 pixel ^ 2, not too small!
  minStrokeWidth: 1,
  maxStrokeWidth: 4,
  quantileCount: 4,
  quantizeCount: 4,
  zero: !0,
  framesPerSecond: 2,
  animationDuration: 5
};
function isExtendedScheme(scheme3) {
  return !isString(scheme3) && hasProperty(scheme3, "name");
}
function isParameterDomain(domain4) {
  return hasProperty(domain4, "param");
}
function isDomainUnionWith(domain4) {
  return hasProperty(domain4, "unionWith");
}
function isFieldRange(range7) {
  return isObject2(range7) && "field" in range7;
}
var SCALE_PROPERTY_INDEX = {
  type: 1,
  domain: 1,
  domainMax: 1,
  domainMin: 1,
  domainMid: 1,
  domainRaw: 1,
  align: 1,
  range: 1,
  rangeMax: 1,
  rangeMin: 1,
  scheme: 1,
  bins: 1,
  // Other properties
  reverse: 1,
  round: 1,
  // quantitative / time
  clamp: 1,
  nice: 1,
  // quantitative
  base: 1,
  exponent: 1,
  constant: 1,
  interpolate: 1,
  zero: 1,
  // zero depends on domain
  // band/point
  padding: 1,
  paddingInner: 1,
  paddingOuter: 1
}, { type: type2, domain: domain$1, range: range6, rangeMax, rangeMin, scheme: scheme2, ...NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX } = SCALE_PROPERTY_INDEX, NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES = keys3(NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX);
function scaleTypeSupportProperty(scaleType2, propName) {
  switch (propName) {
    case "type":
    case "domain":
    case "reverse":
    case "range":
      return !0;
    case "scheme":
    case "interpolate":
      return !["point", "band", "identity"].includes(scaleType2);
    case "bins":
      return !["point", "band", "identity", "ordinal"].includes(scaleType2);
    case "round":
      return isContinuousToContinuous(scaleType2) || scaleType2 === "band" || scaleType2 === "point";
    case "padding":
    case "rangeMin":
    case "rangeMax":
      return isContinuousToContinuous(scaleType2) || ["point", "band"].includes(scaleType2);
    case "paddingOuter":
    case "align":
      return ["point", "band"].includes(scaleType2);
    case "paddingInner":
      return scaleType2 === "band";
    case "domainMax":
    case "domainMid":
    case "domainMin":
    case "domainRaw":
    case "clamp":
      return isContinuousToContinuous(scaleType2);
    case "nice":
      return isContinuousToContinuous(scaleType2) || scaleType2 === "quantize" || scaleType2 === "threshold";
    case "exponent":
      return scaleType2 === "pow";
    case "base":
      return scaleType2 === "log";
    case "constant":
      return scaleType2 === "symlog";
    case "zero":
      return hasContinuousDomain(scaleType2) && !contains2([
        "log",
        // log scale cannot have zero value
        "time",
        "utc",
        // zero is not meaningful for time
        "threshold",
        // threshold requires custom domain so zero does not matter
        "quantile"
        // quantile depends on distribution so zero does not matter
      ], scaleType2);
  }
}
function channelScalePropertyIncompatability(channel, propName) {
  switch (propName) {
    case "interpolate":
    case "scheme":
    case "domainMid":
      return isColorChannel(channel) ? void 0 : cannotUseScalePropertyWithNonColor(propName);
    case "align":
    case "type":
    case "bins":
    case "domain":
    case "domainMax":
    case "domainMin":
    case "domainRaw":
    case "range":
    case "base":
    case "exponent":
    case "constant":
    case "nice":
    case "padding":
    case "paddingInner":
    case "paddingOuter":
    case "rangeMax":
    case "rangeMin":
    case "reverse":
    case "round":
    case "clamp":
    case "zero":
      return;
  }
}
function scaleTypeSupportDataType(specifiedType, fieldDefType) {
  return contains2([ORDINAL2, NOMINAL], fieldDefType) ? specifiedType === void 0 || hasDiscreteDomain(specifiedType) : fieldDefType === TEMPORAL ? contains2([ScaleType.TIME, ScaleType.UTC, void 0], specifiedType) : fieldDefType === QUANTITATIVE ? isQuantitative(specifiedType) || isContinuousToDiscrete(specifiedType) || specifiedType === void 0 : !0;
}
function channelSupportScaleType(channel, scaleType2, hasNestedOffsetScale = !1) {
  if (!isScaleChannel(channel))
    return !1;
  switch (channel) {
    case X3:
    case Y3:
    case XOFFSET:
    case YOFFSET:
    case THETA:
    case RADIUS:
      return isContinuousToContinuous(scaleType2) || scaleType2 === "band" ? !0 : scaleType2 === "point" ? !hasNestedOffsetScale : !1;
    case TIME:
      return contains2(["linear", "band"], scaleType2);
    case SIZE2:
    // TODO: size and opacity can support ordinal with more modification
    case STROKEWIDTH:
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case ANGLE:
      return isContinuousToContinuous(scaleType2) || isContinuousToDiscrete(scaleType2) || contains2(["band", "point", "ordinal"], scaleType2);
    case COLOR:
    case FILL:
    case STROKE:
      return scaleType2 !== "band";
    // band does not make sense with color
    case STROKEDASH:
    case SHAPE:
      return scaleType2 === "ordinal" || isContinuousToDiscrete(scaleType2);
  }
}
function isScaleInvalidDataIncludeAsValue(invalidDataMode) {
  return isObject2(invalidDataMode) && "value" in invalidDataMode;
}
var Mark3 = {
  arc: "arc",
  area: "area",
  bar: "bar",
  image: "image",
  line: "line",
  point: "point",
  rect: "rect",
  rule: "rule",
  text: "text",
  tick: "tick",
  trail: "trail",
  circle: "circle",
  square: "square",
  geoshape: "geoshape"
}, ARC = Mark3.arc, AREA = Mark3.area, BAR = Mark3.bar, IMAGE = Mark3.image, LINE = Mark3.line, POINT = Mark3.point, RECT = Mark3.rect, RULE = Mark3.rule, TEXT = Mark3.text, TICK = Mark3.tick, TRAIL = Mark3.trail, CIRCLE = Mark3.circle, SQUARE = Mark3.square, GEOSHAPE = Mark3.geoshape;
function isPathMark(m) {
  return ["line", "area", "trail"].includes(m);
}
function isRectBasedMark(m) {
  return [
    "rect",
    "bar",
    "image",
    "arc",
    "tick"
    /* arc is rect/interval in polar coordinate */
  ].includes(m);
}
var PRIMITIVE_MARKS = new Set(keys3(Mark3));
function isMarkDef(mark) {
  return hasProperty(mark, "type");
}
var STROKE_CONFIG = [
  "stroke",
  "strokeWidth",
  "strokeDash",
  "strokeDashOffset",
  "strokeOpacity",
  "strokeJoin",
  "strokeMiterLimit"
], FILL_CONFIG = ["fill", "fillOpacity"], FILL_STROKE_CONFIG = [...STROKE_CONFIG, ...FILL_CONFIG], VL_ONLY_MARK_CONFIG_INDEX = {
  color: 1,
  filled: 1,
  invalid: 1,
  order: 1,
  radius2: 1,
  theta2: 1,
  timeUnitBandSize: 1,
  timeUnitBandPosition: 1
}, VL_ONLY_MARK_CONFIG_PROPERTIES = keys3(VL_ONLY_MARK_CONFIG_INDEX), VL_ONLY_RECT_CONFIG = [
  "binSpacing",
  "continuousBandSize",
  "discreteBandSize",
  "minBandSize"
], VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
  area: ["line", "point"],
  bar: VL_ONLY_RECT_CONFIG,
  rect: VL_ONLY_RECT_CONFIG,
  line: ["point"],
  tick: ["bandSize", "thickness", ...VL_ONLY_RECT_CONFIG]
}, defaultMarkConfig = {
  color: "#4c78a8",
  invalid: "break-paths-show-path-domains",
  timeUnitBandSize: 1
}, MARK_CONFIG_INDEX = {
  mark: 1,
  arc: 1,
  area: 1,
  bar: 1,
  circle: 1,
  image: 1,
  line: 1,
  point: 1,
  rect: 1,
  rule: 1,
  square: 1,
  text: 1,
  tick: 1,
  trail: 1,
  geoshape: 1
}, MARK_CONFIGS = keys3(MARK_CONFIG_INDEX);
function isRelativeBandSize(o) {
  return hasProperty(o, "band");
}
var BAR_CORNER_RADIUS_INDEX = {
  horizontal: ["cornerRadiusTopRight", "cornerRadiusBottomRight"],
  vertical: ["cornerRadiusTopLeft", "cornerRadiusTopRight"]
}, DEFAULT_RECT_BAND_SIZE = 5, defaultRectConfig = {
  binSpacing: 0,
  continuousBandSize: DEFAULT_RECT_BAND_SIZE,
  minBandSize: 0.25,
  timeUnitBandPosition: 0.5
}, defaultBarConfig = {
  ...defaultRectConfig,
  binSpacing: 1
}, defaultTickConfig = {
  ...defaultRectConfig,
  thickness: 1
};
function getMarkType(m) {
  return isMarkDef(m) ? m.type : m;
}
function normalizeInvalidDataMode(mode, { isPath }) {
  return mode === void 0 || mode === "break-paths-show-path-domains" ? isPath ? "break-paths-show-domains" : "filter" : mode === null ? "show" : mode;
}
function getScaleInvalidDataMode({ markDef, config: config2, scaleChannel, scaleType: scaleType2, isCountAggregate }) {
  if (!scaleType2 || !hasContinuousDomain(scaleType2) || isCountAggregate)
    return "always-valid";
  let invalidMode = normalizeInvalidDataMode(getMarkPropOrConfig("invalid", markDef, config2), {
    isPath: isPathMark(markDef.type)
  });
  return config2.scale?.invalid?.[scaleChannel] !== void 0 ? "show" : invalidMode;
}
function shouldBreakPath(mode) {
  return mode === "break-paths-filter-domains" || mode === "break-paths-show-domains";
}
function scaledZeroOrMinOrMax({ scaleName, scale: scale7, mode }) {
  let domain4 = `domain('${scaleName}')`;
  if (!scale7 || !scaleName)
    return;
  let min4 = `${domain4}[0]`, max4 = `peek(${domain4})`, domainHasZero = scale7.domainHasZero();
  return domainHasZero === "definitely" ? {
    scale: scaleName,
    value: 0
  } : domainHasZero === "maybe" ? { signal: `scale('${scaleName}', inrange(0, ${domain4}) ? 0 : ${mode === "zeroOrMin" ? min4 : max4})` } : { signal: `scale('${scaleName}', ${mode === "zeroOrMin" ? min4 : max4})` };
}
function getConditionalValueRefForIncludingInvalidValue({ scaleChannel, channelDef, scale: scale7, scaleName, markDef, config: config2 }) {
  let scaleType2 = scale7?.get("type"), fieldDef = getFieldDef(channelDef), isCountAggregate = isCountingAggregateOp(fieldDef?.aggregate), invalidDataMode = getScaleInvalidDataMode({
    scaleChannel,
    markDef,
    config: config2,
    scaleType: scaleType2,
    isCountAggregate
  });
  if (fieldDef && invalidDataMode === "show") {
    let includeAs = config2.scale.invalid?.[scaleChannel] ?? "zero-or-min";
    return {
      test: fieldValidPredicate(vgField(fieldDef, { expr: "datum" }), !1),
      ...refForInvalidValues(includeAs, scale7, scaleName)
    };
  }
}
function refForInvalidValues(includeAs, scale7, scaleName) {
  if (isScaleInvalidDataIncludeAsValue(includeAs)) {
    let { value: value3 } = includeAs;
    return isSignalRef(value3) ? { signal: value3.signal } : { value: value3 };
  }
  return scaledZeroOrMinOrMax({
    scale: scale7,
    scaleName,
    mode: "zeroOrMin"
  });
}
function midPointRefWithPositionInvalidTest(params2) {
  let { channel, channelDef, markDef, scale: scale7, scaleName, config: config2 } = params2, scaleChannel = getMainRangeChannel(channel), mainRef = midPoint(params2), valueRefForIncludingInvalid = getConditionalValueRefForIncludingInvalidValue({
    scaleChannel,
    channelDef,
    scale: scale7,
    scaleName,
    markDef,
    config: config2
  });
  return valueRefForIncludingInvalid !== void 0 ? [valueRefForIncludingInvalid, mainRef] : mainRef;
}
function datumDefToExpr(datumDef) {
  let { datum: datum2 } = datumDef;
  return isDateTime(datum2) ? dateTimeToExpr(datum2) : `${stringify(datum2)}`;
}
function valueRefForFieldOrDatumDef(fieldDef, scaleName, opt, encode4) {
  let ref2 = {};
  if (scaleName && (ref2.scale = scaleName), isDatumDef(fieldDef)) {
    let { datum: datum2 } = fieldDef;
    isDateTime(datum2) ? ref2.signal = dateTimeToExpr(datum2) : isSignalRef(datum2) ? ref2.signal = datum2.signal : isExprRef(datum2) ? ref2.signal = datum2.expr : ref2.value = datum2;
  } else
    ref2.field = vgField(fieldDef, opt);
  if (encode4) {
    let { offset: offset4, band: band2 } = encode4;
    offset4 && (ref2.offset = offset4), band2 && (ref2.band = band2);
  }
  return ref2;
}
function interpolatedSignalRef({ scaleName, fieldOrDatumDef, fieldOrDatumDef2, offset: offset4, startSuffix, endSuffix = "end", bandPosition = 0.5 }) {
  let expr2 = !isSignalRef(bandPosition) && 0 < bandPosition && bandPosition < 1 ? "datum" : void 0, start = vgField(fieldOrDatumDef, { expr: expr2, suffix: startSuffix }), end = fieldOrDatumDef2 !== void 0 ? vgField(fieldOrDatumDef2, { expr: expr2 }) : vgField(fieldOrDatumDef, { suffix: endSuffix, expr: expr2 }), ref2 = {};
  if (bandPosition === 0 || bandPosition === 1) {
    ref2.scale = scaleName;
    let field3 = bandPosition === 0 ? start : end;
    ref2.field = field3;
  } else {
    let datum2 = isSignalRef(bandPosition) ? `(1-${bandPosition.signal}) * ${start} + ${bandPosition.signal} * ${end}` : `${1 - bandPosition} * ${start} + ${bandPosition} * ${end}`;
    ref2.signal = `scale("${scaleName}", ${datum2})`;
  }
  return offset4 && (ref2.offset = offset4), ref2;
}
function binSizeExpr({ scaleName, fieldDef }) {
  let start = vgField(fieldDef, { expr: "datum" }), end = vgField(fieldDef, { expr: "datum", suffix: "end" });
  return `abs(scale("${scaleName}", ${end}) - scale("${scaleName}", ${start}))`;
}
function midPoint({ channel, channelDef, channel2Def, markDef, config: config2, scaleName, scale: scale7, stack: stack2, offset: offset4, defaultRef, bandPosition }) {
  if (channelDef) {
    if (isFieldOrDatumDef(channelDef)) {
      let scaleType2 = scale7?.get("type");
      if (isTypedFieldDef(channelDef)) {
        bandPosition ??= getBandPosition({
          fieldDef: channelDef,
          fieldDef2: channel2Def,
          markDef,
          config: config2
        });
        let { bin: bin3, timeUnit, type: type3 } = channelDef;
        if (isBinning(bin3) || bandPosition && timeUnit && type3 === TEMPORAL)
          return stack2?.impute ? valueRefForFieldOrDatumDef(channelDef, scaleName, { binSuffix: "mid" }, { offset: offset4 }) : bandPosition && !hasDiscreteDomain(scaleType2) ? interpolatedSignalRef({ scaleName, fieldOrDatumDef: channelDef, bandPosition, offset: offset4 }) : valueRefForFieldOrDatumDef(channelDef, scaleName, binRequiresRange(channelDef, channel) ? { binSuffix: "range" } : {}, {
            offset: offset4
          });
        if (isBinned(bin3)) {
          if (isFieldDef(channel2Def))
            return interpolatedSignalRef({
              scaleName,
              fieldOrDatumDef: channelDef,
              fieldOrDatumDef2: channel2Def,
              bandPosition,
              offset: offset4
            });
          warn2(channelRequiredForBinned(channel === X3 ? X23 : Y23));
        }
      }
      return valueRefForFieldOrDatumDef(
        channelDef,
        scaleName,
        hasDiscreteDomain(scaleType2) ? { binSuffix: "range" } : {},
        // no need for bin suffix if there is no scale
        {
          offset: offset4,
          // For band, to get mid point, need to offset by half of the band
          band: scaleType2 === "band" ? bandPosition ?? channelDef.bandPosition ?? 0.5 : void 0
        }
      );
    } else if (isValueDef(channelDef)) {
      let value3 = channelDef.value, offsetMixins = offset4 ? { offset: offset4 } : {};
      return { ...widthHeightValueOrSignalRef(channel, value3), ...offsetMixins };
    }
  }
  return isFunction(defaultRef) && (defaultRef = defaultRef()), defaultRef && {
    ...defaultRef,
    // only include offset when it is non-zero (zero = no offset)
    ...offset4 ? { offset: offset4 } : {}
  };
}
function widthHeightValueOrSignalRef(channel, value3) {
  return contains2(["x", "x2"], channel) && value3 === "width" ? { field: { group: "width" } } : contains2(["y", "y2"], channel) && value3 === "height" ? { field: { group: "height" } } : signalOrValueRef(value3);
}
function isCustomFormatType(formatType) {
  return formatType && formatType !== "number" && formatType !== "time";
}
function customFormatExpr(formatType, field3, format5) {
  return `${formatType}(${field3}${format5 ? `, ${stringify(format5)}` : ""})`;
}
function formatSignalRef({ fieldOrDatumDef, format: format5, formatType, expr: expr2, normalizeStack, config: config2 }) {
  if (isCustomFormatType(formatType))
    return formatCustomType({
      fieldOrDatumDef,
      format: format5,
      formatType,
      expr: expr2,
      config: config2
    });
  let field3 = fieldToFormat(fieldOrDatumDef, expr2, normalizeStack), type3 = channelDefType(fieldOrDatumDef);
  if (format5 === void 0 && formatType === void 0 && config2.customFormatTypes) {
    if (type3 === "quantitative") {
      if (normalizeStack && config2.normalizedNumberFormatType)
        return formatCustomType({
          fieldOrDatumDef,
          format: config2.normalizedNumberFormat,
          formatType: config2.normalizedNumberFormatType,
          expr: expr2,
          config: config2
        });
      if (config2.numberFormatType)
        return formatCustomType({
          fieldOrDatumDef,
          format: config2.numberFormat,
          formatType: config2.numberFormatType,
          expr: expr2,
          config: config2
        });
    }
    if (type3 === "temporal" && config2.timeFormatType && isFieldDef(fieldOrDatumDef) && fieldOrDatumDef.timeUnit === void 0)
      return formatCustomType({
        fieldOrDatumDef,
        format: config2.timeFormat,
        formatType: config2.timeFormatType,
        expr: expr2,
        config: config2
      });
  }
  function getTimeDef(def2) {
    return isFieldDef(def2) ? normalizeTimeUnit(def2.timeUnit) || {} : {
      unit: void 0,
      utc: void 0
    };
  }
  if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
    let { unit: timeUnit, utc: isUTCUnit } = getTimeDef(fieldOrDatumDef), signal = timeFormatExpression({
      field: field3,
      timeUnit,
      format: format5,
      formatType: config2.timeFormatType,
      rawTimeFormat: config2.timeFormat,
      isUTCScale: isUTCUnit || isScaleFieldDef(fieldOrDatumDef) && fieldOrDatumDef.scale?.type === ScaleType.UTC
    });
    return signal ? { signal } : void 0;
  }
  if (format5 = numberFormat({ type: type3, specifiedFormat: format5, config: config2, normalizeStack }), isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
    let endField = vgField(fieldOrDatumDef, { expr: expr2, binSuffix: "end" });
    return {
      signal: binFormatExpression(field3, endField, format5, formatType, config2)
    };
  } else return format5 || channelDefType(fieldOrDatumDef) === "quantitative" ? {
    signal: `${formatExpr(field3, format5)}`
  } : { signal: `isValid(${field3}) ? ${field3} : ""+${field3}` };
}
function fieldToFormat(fieldOrDatumDef, expr2, normalizeStack) {
  return isFieldDef(fieldOrDatumDef) ? normalizeStack ? `${vgField(fieldOrDatumDef, { expr: expr2, suffix: "end" })}-${vgField(fieldOrDatumDef, {
    expr: expr2,
    suffix: "start"
  })}` : vgField(fieldOrDatumDef, { expr: expr2 }) : datumDefToExpr(fieldOrDatumDef);
}
function formatCustomType({ fieldOrDatumDef, format: format5, formatType, expr: expr2, normalizeStack, config: config2, field: field3 }) {
  if (field3 ??= fieldToFormat(fieldOrDatumDef, expr2, normalizeStack), field3 !== "datum.value" && // For axis/legend, we can't correctly know the end of the bin from `datum`
  isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
    let endField = vgField(fieldOrDatumDef, { expr: expr2, binSuffix: "end" });
    return {
      signal: binFormatExpression(field3, endField, format5, formatType, config2)
    };
  }
  return { signal: customFormatExpr(formatType, field3, format5) };
}
function guideFormat(fieldOrDatumDef, type3, format5, formatType, config2, omitTimeFormatConfig) {
  if (!(isString(formatType) && isCustomFormatType(formatType)) && !(format5 === void 0 && formatType === void 0 && config2.customFormatTypes && channelDefType(fieldOrDatumDef) === "quantitative" && (config2.normalizedNumberFormatType && isPositionFieldOrDatumDef(fieldOrDatumDef) && fieldOrDatumDef.stack === "normalize" || config2.numberFormatType))) {
    if (isPositionFieldOrDatumDef(fieldOrDatumDef) && fieldOrDatumDef.stack === "normalize" && config2.normalizedNumberFormat)
      return numberFormat({
        type: "quantitative",
        config: config2,
        normalizeStack: !0
      });
    if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
      let timeUnit = isFieldDef(fieldOrDatumDef) ? normalizeTimeUnit(fieldOrDatumDef.timeUnit)?.unit : void 0;
      return timeUnit === void 0 && config2.customFormatTypes && config2.timeFormatType ? void 0 : timeFormat3({ specifiedFormat: format5, timeUnit, config: config2, omitTimeFormatConfig });
    }
    return numberFormat({ type: type3, specifiedFormat: format5, config: config2 });
  }
}
function guideFormatType(formatType, fieldOrDatumDef, scaleType2) {
  if (formatType && (isSignalRef(formatType) || formatType === "number" || formatType === "time"))
    return formatType;
  if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef) && scaleType2 !== "time" && scaleType2 !== "utc")
    return isFieldDef(fieldOrDatumDef) && normalizeTimeUnit(fieldOrDatumDef?.timeUnit)?.utc ? "utc" : "time";
}
function numberFormat({ type: type3, specifiedFormat, config: config2, normalizeStack }) {
  if (isString(specifiedFormat))
    return specifiedFormat;
  if (type3 === QUANTITATIVE)
    return normalizeStack ? config2.normalizedNumberFormat : config2.numberFormat;
}
function timeFormat3({ specifiedFormat, timeUnit, config: config2, omitTimeFormatConfig }) {
  return specifiedFormat || (timeUnit ? {
    signal: timeUnitSpecifierExpression(timeUnit)
  } : omitTimeFormatConfig ? void 0 : config2.timeFormat);
}
function formatExpr(field3, format5) {
  return `format(${field3}, "${format5 || ""}")`;
}
function binNumberFormatExpr(field3, format5, formatType, config2) {
  return isCustomFormatType(formatType) ? customFormatExpr(formatType, field3, format5) : formatExpr(field3, (isString(format5) ? format5 : void 0) ?? config2.numberFormat);
}
function binFormatExpression(startField, endField, format5, formatType, config2) {
  if (format5 === void 0 && formatType === void 0 && config2.customFormatTypes && config2.numberFormatType)
    return binFormatExpression(startField, endField, config2.numberFormat, config2.numberFormatType, config2);
  let start = binNumberFormatExpr(startField, format5, formatType, config2), end = binNumberFormatExpr(endField, format5, formatType, config2);
  return `${fieldValidPredicate(startField, !1)} ? "null" : ${start} + "${BIN_RANGE_DELIMITER}" + ${end}`;
}
function timeFormatExpression({ field: field3, timeUnit, format: format5, formatType, rawTimeFormat, isUTCScale }) {
  return !timeUnit || format5 ? !timeUnit && formatType ? `${formatType}(${field3}, ${stringify(format5)})` : (format5 = isString(format5) ? format5 : rawTimeFormat, `${isUTCScale ? "utc" : "time"}Format(${field3}, ${stringify(format5)})`) : formatExpression(timeUnit, field3, isUTCScale);
}
var DEFAULT_SORT_OP = "min", SORT_BY_CHANNEL_INDEX = {
  x: 1,
  y: 1,
  color: 1,
  fill: 1,
  stroke: 1,
  strokeWidth: 1,
  size: 1,
  shape: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  opacity: 1,
  text: 1
};
function isSortByChannel(c) {
  return hasOwnProperty(SORT_BY_CHANNEL_INDEX, c);
}
function isSortByEncoding(sort3) {
  return hasProperty(sort3, "encoding");
}
function isSortField(sort3) {
  return sort3 && (sort3.op === "count" || hasProperty(sort3, "field"));
}
function isSortArray(sort3) {
  return sort3 && isArray(sort3);
}
function isFacetMapping(f) {
  return hasProperty(f, "row") || hasProperty(f, "column");
}
function isFacetFieldDef(channelDef) {
  return hasProperty(channelDef, "header");
}
function isFacetSpec(spec) {
  return hasProperty(spec, "facet");
}
function isConditionalParameter(c) {
  return hasProperty(c, "param");
}
function isRepeatRef(field3) {
  return !isString(field3) && hasProperty(field3, "repeat");
}
function toFieldDefBase(fieldDef) {
  let { field: field3, timeUnit, bin: bin3, aggregate } = fieldDef;
  return {
    ...timeUnit ? { timeUnit } : {},
    ...bin3 ? { bin: bin3 } : {},
    ...aggregate ? { aggregate } : {},
    field: field3
  };
}
function isSortableFieldDef(fieldDef) {
  return hasProperty(fieldDef, "sort");
}
function getBandPosition({ fieldDef, fieldDef2, markDef: mark, config: config2 }) {
  if (isFieldOrDatumDef(fieldDef) && fieldDef.bandPosition !== void 0)
    return fieldDef.bandPosition;
  if (isFieldDef(fieldDef)) {
    let { timeUnit, bin: bin3 } = fieldDef;
    if (timeUnit && !fieldDef2)
      return getMarkConfig("timeUnitBandPosition", mark, config2);
    if (isBinning(bin3))
      return 0.5;
  }
}
function getBandSize({ channel, fieldDef, fieldDef2, markDef: mark, config: config2, scaleType: scaleType2, useVlSizeChannel }) {
  let sizeChannel = getSizeChannel(channel), size = getMarkPropOrConfig(useVlSizeChannel ? "size" : sizeChannel, mark, config2, {
    vgChannel: sizeChannel
  });
  if (size !== void 0)
    return size;
  if (isFieldDef(fieldDef)) {
    let { timeUnit, bin: bin3 } = fieldDef;
    if (timeUnit && !fieldDef2)
      return { band: getMarkConfig("timeUnitBandSize", mark, config2) };
    if (isBinning(bin3) && !hasDiscreteDomain(scaleType2))
      return { band: 1 };
  }
  if (isRectBasedMark(mark.type))
    return scaleType2 ? hasDiscreteDomain(scaleType2) ? config2[mark.type]?.discreteBandSize || { band: 1 } : config2[mark.type]?.continuousBandSize : config2[mark.type]?.discreteBandSize;
}
function hasBandEnd(fieldDef, fieldDef2, markDef, config2) {
  return isBinning(fieldDef.bin) || fieldDef.timeUnit && isTypedFieldDef(fieldDef) && fieldDef.type === "temporal" ? getBandPosition({ fieldDef, fieldDef2, markDef, config: config2 }) !== void 0 : !1;
}
function isOrderOnlyDef(orderDef) {
  return hasProperty(orderDef, "sort") && !hasProperty(orderDef, "field");
}
function isConditionalDef(channelDef) {
  return hasProperty(channelDef, "condition");
}
function hasConditionalFieldDef(channelDef) {
  let condition = channelDef?.condition;
  return !!condition && !isArray(condition) && isFieldDef(condition);
}
function hasConditionalFieldOrDatumDef(channelDef) {
  let condition = channelDef?.condition;
  return !!condition && !isArray(condition) && isFieldOrDatumDef(condition);
}
function hasConditionalValueDef(channelDef) {
  let condition = channelDef?.condition;
  return !!condition && (isArray(condition) || isValueDef(condition));
}
function isFieldDef(channelDef) {
  return hasProperty(channelDef, "field") || channelDef?.aggregate === "count";
}
function channelDefType(channelDef) {
  return channelDef?.type;
}
function isDatumDef(channelDef) {
  return hasProperty(channelDef, "datum");
}
function isContinuousFieldOrDatumDef(cd2) {
  return isTypedFieldDef(cd2) && !isDiscrete2(cd2) || isNumericDataDef(cd2);
}
function isUnbinnedQuantitativeFieldOrDatumDef(cd2) {
  return isTypedFieldDef(cd2) && cd2.type === "quantitative" && !cd2.bin || isNumericDataDef(cd2);
}
function isNumericDataDef(cd2) {
  return isDatumDef(cd2) && isNumber(cd2.datum);
}
function isFieldOrDatumDef(channelDef) {
  return isFieldDef(channelDef) || isDatumDef(channelDef);
}
function isTypedFieldDef(channelDef) {
  return channelDef && (hasProperty(channelDef, "field") || channelDef.aggregate === "count") && hasProperty(channelDef, "type");
}
function isValueDef(channelDef) {
  return hasProperty(channelDef, "value");
}
function isScaleFieldDef(channelDef) {
  return hasProperty(channelDef, "scale") || hasProperty(channelDef, "sort");
}
function isPositionFieldOrDatumDef(channelDef) {
  return hasProperty(channelDef, "axis") || hasProperty(channelDef, "stack") || hasProperty(channelDef, "impute");
}
function isMarkPropFieldOrDatumDef(channelDef) {
  return hasProperty(channelDef, "legend");
}
function isStringFieldOrDatumDef(channelDef) {
  return hasProperty(channelDef, "format") || hasProperty(channelDef, "formatType");
}
function toStringFieldDef(fieldDef) {
  return omit2(fieldDef, ["legend", "axis", "header", "scale"]);
}
function isOpFieldDef(fieldDef) {
  return hasProperty(fieldDef, "op");
}
function vgField(fieldDef, opt = {}) {
  let field3 = fieldDef.field, prefix = opt.prefix, suffix = opt.suffix, argAccessor = "";
  if (isCount(fieldDef))
    field3 = internalField("count");
  else {
    let fn;
    if (!opt.nofn)
      if (isOpFieldDef(fieldDef))
        fn = fieldDef.op;
      else {
        let { bin: bin3, aggregate, timeUnit } = fieldDef;
        isBinning(bin3) ? (fn = binToString(bin3), suffix = (opt.binSuffix ?? "") + (opt.suffix ?? "")) : aggregate ? isArgmaxDef(aggregate) ? (argAccessor = `["${field3}"]`, field3 = `argmax_${aggregate.argmax}`) : isArgminDef(aggregate) ? (argAccessor = `["${field3}"]`, field3 = `argmin_${aggregate.argmin}`) : fn = String(aggregate) : timeUnit && !isBinnedTimeUnit(timeUnit) && (fn = timeUnitToString(timeUnit), suffix = (!["range", "mid"].includes(opt.binSuffix) && opt.binSuffix || "") + (opt.suffix ?? ""));
      }
    fn && (field3 = field3 ? `${fn}_${field3}` : fn);
  }
  return suffix && (field3 = `${field3}_${suffix}`), prefix && (field3 = `${prefix}_${field3}`), opt.forAs ? removePathFromField(field3) : opt.expr ? flatAccessWithDatum(field3, opt.expr) + argAccessor : replacePathInField(field3) + argAccessor;
}
function isDiscrete2(def2) {
  switch (def2.type) {
    case "nominal":
    case "ordinal":
    case "geojson":
      return !0;
    case "quantitative":
      return isFieldDef(def2) && !!def2.bin;
    case "temporal":
      return !1;
  }
  throw new Error(invalidFieldType(def2.type));
}
function isDiscretizing2(def2) {
  return isScaleFieldDef(def2) && isContinuousToDiscrete(def2.scale?.type);
}
function isCount(fieldDef) {
  return fieldDef.aggregate === "count";
}
function verbalTitleFormatter(fieldDef, config2) {
  let { field: field3, bin: bin3, timeUnit, aggregate } = fieldDef;
  if (aggregate === "count")
    return config2.countTitle;
  if (isBinning(bin3))
    return `${field3} (binned)`;
  if (timeUnit && !isBinnedTimeUnit(timeUnit)) {
    let unit2 = normalizeTimeUnit(timeUnit)?.unit;
    if (unit2)
      return `${field3} (${getTimeUnitParts(unit2).join("-")})`;
  } else if (aggregate)
    return isArgmaxDef(aggregate) ? `${field3} for max ${aggregate.argmax}` : isArgminDef(aggregate) ? `${field3} for min ${aggregate.argmin}` : `${titleCase(aggregate)} of ${field3}`;
  return field3;
}
function functionalTitleFormatter(fieldDef) {
  let { aggregate, bin: bin3, timeUnit, field: field3 } = fieldDef;
  if (isArgmaxDef(aggregate))
    return `${field3} for argmax(${aggregate.argmax})`;
  if (isArgminDef(aggregate))
    return `${field3} for argmin(${aggregate.argmin})`;
  let timeUnitParams = timeUnit && !isBinnedTimeUnit(timeUnit) ? normalizeTimeUnit(timeUnit) : void 0, fn = aggregate || timeUnitParams?.unit || timeUnitParams?.maxbins && "timeunit" || isBinning(bin3) && "bin";
  return fn ? `${fn.toUpperCase()}(${field3})` : field3;
}
var defaultTitleFormatter = (fieldDef, config2) => {
  switch (config2.fieldTitle) {
    case "plain":
      return fieldDef.field;
    case "functional":
      return functionalTitleFormatter(fieldDef);
    default:
      return verbalTitleFormatter(fieldDef, config2);
  }
}, titleFormatter = defaultTitleFormatter;
function setTitleFormatter(formatter) {
  titleFormatter = formatter;
}
function resetTitleFormatter() {
  setTitleFormatter(defaultTitleFormatter);
}
// End of bundle text, part 12 of 15
export { ADD_SAME_CHILD_TWICE, ANGLE, ARC, AREA, BAR, BAR_CORNER_RADIUS_INDEX, CHANNELS, CIRCLE, COLOR, COLUMN,
  CONCAT_CANNOT_SHARE_AXIS, DEFAULT_SORT_OP, DESCRIPTION, DETAIL, FACET, FACETED_INDEPENDENT_DIFFERENT_SOURCES,
  FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES, FACETED_INDEPENDENT_SAME_SOURCE, FACET_CHANNELS, FILL,
  FILLOPACITY, FILL_STROKE_CONFIG, FIT_NON_SINGLE, GEOJSON, GEOPOSITION_CHANNELS, GEOSHAPE, HREF, IMAGE,
  INTERVAL_INITIALIZED_WITH_POS, KEY, LATITUDE, LATITUDE2, LEGEND_BINDINGS_MUST_HAVE_PROJECTION, LINE,
  LINE_WITH_VARYING_SIZE, LONGITUDE, LONGITUDE2, MARK_CONFIGS, MORE_THAN_ONE_SORT, MULTIDOMAIN_SORT_OP_INDEX,
  MULTIPLE_TIMER_ANIMATION_SELECTION, MULTI_VIEW_ANIMATION_UNSUPPORTED, NEEDS_SAME_SELECTION, NOMINAL,
  NONPOSITION_CHANNELS, NONPOSITION_SCALE_CHANNELS, NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES, NO_FIELDS_NEEDS_AS,
  OPACITY, ORDER, ORDINAL2, POINT, POLAR_POSITION_SCALE_CHANNELS, POLAR_POSITION_SCALE_CHANNEL_INDEX,
  POSITION_SCALE_CHANNELS, PRIMITIVE_MARKS, QUANTITATIVE, RADIUS, RADIUS2, RECT, REPLACE_ANGLE_WITH_THETA, ROW, RULE,
  SCALE_BINDINGS_CONTINUOUS, SCALE_CATEGORY_INDEX, SCALE_CHANNELS, SECONDARY_RANGE_CHANNEL,
  SEQUENTIAL_SCALE_DEPRECATED, SHAPE, SHARED_DOMAIN_OPS, SIZE2, SQUARE, STROKE, STROKEDASH, STROKEOPACITY,
  STROKEWIDTH, SUM_OPS, ScaleType, TEMPORAL, TEXT, TEXT$1, THETA, THETA2, TICK, TIME, TOOLTIP, TRAIL, UNIT_CHANNELS,
  URL2, VG_CORNERRADIUS_CHANNELS, VG_MARK_CONFIGS, VG_MARK_INDEX, VL_ONLY_MARK_CONFIG_PROPERTIES,
  VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX, View, X23, X3, XOFFSET, Y23, Y3, YOFFSET, accessPathDepth,
  accessPathWithDatum, accessWithDatumToUnescapedPath, applyMarkConfig, autoMaxBins, binFormatExpression, binSizeExpr,
  binToString, cannotApplySizeToNonOrientedMark, cannotLookupVariableParameter, cannotProjectAggregate,
  cannotProjectOnChannelWithoutField, cannotStackRangedMark, cannotUseRelativeBandSizeWithNonBandScale,
  channelDefType, channelRequiredForBinned, channelScalePropertyIncompatability, channelShouldBeDiscrete,
  channelShouldBeDiscreteOrDiscretizing, channelShouldNotBeUsedForBinned, channelSupportScaleType,
  columnsNotSupportByRowCol, containerSizeNonSingle, containerSizeNotCompatibleWithAutosize, contains2,
  customFormatTypeNotAllowed, dateTimeToExpr, dateTimeToTimestamp, debug2, deepEqual, defaultBarConfig,
  defaultMarkConfig, defaultRectConfig, defaultScaleConfig, defaultTickConfig, deleteNestedProperty, differentParse,
  discreteChannelCannotEncode, domainRequiredForThresholdScale, domainSortDropped, droppingColor, droppingFit,
  duplicate, durationExpr, emptyFieldDef, entries$1, error63, errorBand1DNotSupport,
  errorBarCenterAndExtentAreNotNeeded, errorBarCenterIsUsedWithWrongExtent,
  errorBarContinuousAxisHasCustomizedAggregate, eventSelector, every, exprFromSignalRefOrValue,
  exprFromValueRefOrSignalRef, extractTitleConfig, facetChannelDropped, fieldFilterExpression, fieldIntersection,
  fieldValidPredicate, forEachLeaf, formatCustomType, formatSignalRef, getBandPosition, getBandSize,
  getConditionalValueRefForIncludingInvalidValue, getDateTimePartAndStep, getFirstDefined, getFullName,
  getMainChannelFromOffsetChannel, getMainRangeChannel, getMarkConfig, getMarkPropOrConfig, getMarkStyleConfig,
  getMarkType, getOffsetChannel, getOffsetScaleChannel, getPositionChannelFromLatLong, getPositionScaleChannel,
  getScaleInvalidDataMode, getSecondaryRangeChannel, getSizeChannel, getSmallestTimeUnitPart, getStyleConfig,
  getStyles, getTimeUnitParts, getVgPositionChannel, guideFormat, guideFormatType, hasBandEnd, hasConditionalFieldDef,
  hasConditionalFieldOrDatumDef, hasConditionalValueDef, hasContinuousDomain, hasDiscreteDomain, hasIntersection,
  hasProperty, hash5, incompatibleChannel, independentScaleMeansIndependentGuide, interpolatedSignalRef,
  invalidAggregate, invalidEncodingChannel, invalidFieldType, invalidFieldTypeForCountAggregate, invalidSpec,
  invalidTransformIgnored, isAggregateOp, isArgmaxDef, isArgminDef, isBinParams, isBinned, isBinnedTimeUnit,
  isBinning, isBoolean3, isChannel, isColorChannel, isConditionalDef, isConditionalParameter, isContinuous2,
  isContinuousFieldOrDatumDef, isContinuousToContinuous, isContinuousToDiscrete, isCountingAggregateOp,
  isCustomFormatType, isDataRefDomain, isDataRefUnionedDomain, isDateTime, isDatumDef, isDiscrete$1, isDiscrete2,
  isDiscretizing2, isDomainUnionWith, isEmpty, isExprRef, isExtendedScheme, isFacetFieldDef, isFacetMapping,
  isFacetSpec, isFieldDef, isFieldEqualPredicate, isFieldGTEPredicate, isFieldGTPredicate, isFieldLTEPredicate,
  isFieldLTPredicate, isFieldOneOfPredicate, isFieldOrDatumDef, isFieldPredicate, isFieldRange, isFieldRangePredicate,
  isFieldRefUnionDomain, isGeoPositionChannel, isLocalSingleTimeUnit, isMarkDef, isMarkPropFieldOrDatumDef,
  isMinMaxOp, isNonPositionScaleChannel, isNullOrFalse, isNumericDataDef, isOrderOnlyDef, isParameterDomain,
  isParameterExtent, isPathMark, isPolarPositionChannel, isPositionFieldOrDatumDef, isPrimitive, isQuantitative,
  isRectBasedMark, isRelativeBandSize, isRepeatRef, isScaleChannel, isScaleFieldDef, isSecondaryRangeChannel,
  isSelectionPredicate, isSignalRef, isSingleDefUnitChannel, isSortArray, isSortByChannel, isSortByEncoding,
  isSortField, isSortableFieldDef, isStringFieldOrDatumDef, isText, isTime, isTypedFieldDef,
  isUnbinnedQuantitativeFieldOrDatumDef, isValueDef, isVgRangeStep, isXorY, isXorYOffset, keys3, legendValuesUnioned,
  lineWithRange, logicalExpr, mergeConflictingDomainProperty, mergeConflictingProperty, mergeDeep, mergeTitle,
  mergeTitleComponent, mergeTitleFieldDefs, midPoint, midPointRefWithPositionInvalidTest,
  nearestNotSupportForContinuous, never2, noSameUnitLookup, noSuchRepeatedValue, normalizeAngle,
  normalizeInvalidDataMode, normalizeLogicalComposition, normalizePredicate$1, normalizeTimeUnit,
  offsetNestedInsideContinuousPositionScaleDropped, omit2, orientOverridden, parse8, parser3, pick4, pkg,
  primitiveChannelDef, projectionOverridden, rangeMarkAlignmentCannotBeExpression, rangeType,
  relativeBandSizeNotSupported, removePathFromField, replaceAll, replaceExprRef, replacePathInField, reset2,
  resetTitleFormatter, scaleCompatible, scalePropertyNotWorkWithScaleType, scaleTypeNotWorkWithChannel,
  scaleTypeNotWorkWithFieldDef, scaleTypePrecedence, scaleTypeSupportDataType, scaleTypeSupportProperty,
  scaledZeroOrMinOrMax, selectionAsScaleDomainWithoutField, selectionAsScaleDomainWrongEncodings, selectionNotFound,
  selectionNotSupported, set7, setEqual, setTitleFormatter, shouldBreakPath, signalOrStringValue, signalOrValueRef,
  signalOrValueRefWithCondition, signalRefOrValue, some, sortParams, stackNonLinearScale, stackNonSummativeAggregate,
  stepDropped, stringify, supportLegend, supportMark, titleCase, titleFormatter, toFieldDefBase, toStringFieldDef,
  unaggregateDomainHasNoEffectForRawField, unaggregateDomainWithNonSharedDomainOp, unaggregatedDomainWithLogScale,
  unescapeSingleQuoteAndPathDot, unique, uniqueId, unknownField, unrecognizedParse, vals, valueRefForFieldOrDatumDef,
  varName, vgField, warn2, widthHeightValueOrSignalRef };
