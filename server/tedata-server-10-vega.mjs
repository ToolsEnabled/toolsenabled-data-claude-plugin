// ToolsEnabled Data server, part 10 of 15: Vega and d3, which draw charts (lines 41680-46939 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-09-vega.mjs";
import { __export } from "./tedata-server-01-ajv.mjs";
import { Adder, Transform, accessorFields, accessorName, array_default, constant_default, error62, estimateBandwidth,
  extend2, extent, falsy, fastmap, field, hasOwnProperty, identity6, ingest$1, inherits_default, isArray, isFunction,
  isNumber, isObject2, isString, max, merge3, one, peek, range2, rederive, replace, stableCompare, stringValue, sum,
  tickStep, toSet, tupleid, zero, zoomLinear, zoomLog, zoomPow, zoomSymlog } from "./tedata-server-08-vega.mjs";
import { Band, BinOrdinal, Bounds, CanvasHandler, CanvasRenderer, Diverging, GradientLegend, GroupItem, Item, Linear2,
  Log, Marks, Ordinal, Point, Pow, Quantile2, Quantize, Renderer, SVGHandler, Sequential, Sqrt, SymbolLegend, Symlog,
  Threshold, Time, UTC, ariaItemAttributes, ariaMarkAttributes, bandSpace, boundContext, boundStroke, canvas, clip$1,
  cssClass, domChild, domClear, domCreate, fontFamily, fontSize, gradientRef, implicit, interpolate,
  interpolateColors, interpolateRange, isContinuous, isGradient, isInterpolating, isLogarithmic, labelFormat,
  labelFraction, labelValues, lineHeight, markup, metadata, multiLineOffset, patternPrefix, quantizeInterpolator,
  registerScale, rgb, round_default, scale, scaleFraction, scheme, serializeXML, textLines, textValue, tickCount,
  tickFormat2, tickValues, validTicks, value_default, visit2 } from "./tedata-server-09-vega.mjs";
import { Nest, Pack, Partition, Stratify, Tree, TreeLinks, Treemap } from "./tedata-server-11-vega.mjs";
// Bundle text, part 10 of 15
var stylesAttr = {
  fill: "fill",
  fillOpacity: "fill-opacity",
  stroke: "stroke",
  strokeOpacity: "stroke-opacity",
  strokeWidth: "stroke-width",
  strokeCap: "stroke-linecap",
  strokeJoin: "stroke-linejoin",
  strokeDash: "stroke-dasharray",
  strokeDashOffset: "stroke-dashoffset",
  strokeMiterLimit: "stroke-miterlimit",
  opacity: "opacity"
}, stylesCss = {
  blend: "mix-blend-mode"
}, rootAttributes = {
  fill: "none",
  "stroke-miterlimit": 4
}, RootIndex = 0, xmlns = "http://www.w3.org/2000/xmlns/", svgns = metadata.xmlns, SVGRenderer = class extends Renderer {
  constructor(loader2) {
    super(loader2), this._dirtyID = 0, this._dirty = [], this._svg = null, this._root = null, this._defs = null;
  }
  /**
   * Initialize a new SVGRenderer instance.
   * @param {DOMElement} el - The containing DOM element for the display.
   * @param {number} width - The coordinate width of the display, in pixels.
   * @param {number} height - The coordinate height of the display, in pixels.
   * @param {Array<number>} origin - The origin of the display, in pixels.
   *   The coordinate system will be translated to this point.
   * @param {number} [scaleFactor=1] - Optional scaleFactor by which to multiply
   *   the width and height to determine the final pixel size.
   * @return {SVGRenderer} - This renderer instance.
   */
  initialize(el, width2, height2, origin, scaleFactor) {
    return this._defs = {}, this._clearDefs(), el && (this._svg = domChild(el, 0, "svg", svgns), this._svg.setAttributeNS(xmlns, "xmlns", svgns), this._svg.setAttributeNS(xmlns, "xmlns:xlink", metadata["xmlns:xlink"]), this._svg.setAttribute("version", metadata.version), this._svg.setAttribute("class", "marks"), this._svg.style.setProperty("vertical-align", "bottom"), domClear(el, 1), this._root = domChild(this._svg, RootIndex, "g", svgns), setAttributes(this._root, rootAttributes), domClear(this._svg, RootIndex + 1)), this.background(this._bgcolor), super.initialize(el, width2, height2, origin, scaleFactor);
  }
  /**
   * Get / set the background color.
   */
  background(bgcolor) {
    return arguments.length && this._svg && this._svg.style.setProperty("background-color", bgcolor), super.background(...arguments);
  }
  /**
   * Resize the display.
   * @param {number} width - The new coordinate width of the display, in pixels.
   * @param {number} height - The new coordinate height of the display, in pixels.
   * @param {Array<number>} origin - The new origin of the display, in pixels.
   *   The coordinate system will be translated to this point.
   * @param {number} [scaleFactor=1] - Optional scaleFactor by which to multiply
   *   the width and height to determine the final pixel size.
   * @return {SVGRenderer} - This renderer instance;
   */
  resize(width2, height2, origin, scaleFactor) {
    return super.resize(width2, height2, origin, scaleFactor), this._svg && (setAttributes(this._svg, {
      width: this._width * this._scale,
      height: this._height * this._scale,
      viewBox: `0 0 ${this._width} ${this._height}`
    }), this._root.setAttribute("transform", `translate(${this._origin})`)), this._dirty = [], this;
  }
  /**
   * Returns the SVG element of the visualization.
   * @return {DOMElement} - The SVG element.
   */
  canvas() {
    return this._svg;
  }
  /**
   * Returns an SVG text string for the rendered content,
   * or null if this renderer is currently headless.
   */
  svg() {
    let svg = this._svg, bg = this._bgcolor;
    if (!svg) return null;
    let style2 = svg.getAttribute("style");
    svg.removeAttribute("style");
    let node2;
    bg && (node2 = domChild(svg, RootIndex, "rect", svgns), setAttributes(node2, {
      width: this._width,
      height: this._height,
      fill: bg
    }));
    let text4 = serializeXML(svg);
    return bg && svg.removeChild(node2), style2 && svg.setAttribute("style", style2), text4;
  }
  /**
   * Internal rendering method.
   * @param {object} scene - The root mark of a scenegraph to render.
   * @param {Array} markTypes - Array of the mark types to render.
   *                            If undefined, render all mark types
   */
  _render(scene, markTypes) {
    return this._dirtyCheck() && (this._dirtyAll && this._clearDefs(), this.mark(this._root, scene, void 0, markTypes), domClear(this._root, 1)), this.defs(), this._dirty = [], ++this._dirtyID, this;
  }
  // -- Manage rendering of items marked as dirty --
  /**
   * Flag a mark item as dirty.
   * @param {Item} item - The mark item.
   */
  dirty(item) {
    item.dirty !== this._dirtyID && (item.dirty = this._dirtyID, this._dirty.push(item));
  }
  /**
   * Check if a mark item is considered dirty.
   * @param {Item} item - The mark item.
   */
  isDirty(item) {
    return this._dirtyAll || !item._svg || !item._svg.ownerSVGElement || item.dirty === this._dirtyID;
  }
  /**
   * Internal method to check dirty status and, if possible,
   * make targetted updates without a full rendering pass.
   */
  _dirtyCheck() {
    this._dirtyAll = !0;
    let items = this._dirty;
    if (!items.length || !this._dirtyID) return !0;
    let id3 = ++this._dirtyID, item, mark, type3, mdef, i, n, o;
    for (i = 0, n = items.length; i < n; ++i)
      if (item = items[i], mark = item.mark, mark.marktype !== type3 && (type3 = mark.marktype, mdef = Marks[type3]), mark.zdirty && mark.dirty !== id3 && (this._dirtyAll = !1, dirtyParents(item, id3), mark.items.forEach((i2) => {
        i2.dirty = id3;
      })), !mark.zdirty) {
        if (item.exit) {
          mdef.nested && mark.items.length ? (o = mark.items[0], o._svg && this._update(mdef, o._svg, o)) : item._svg && (o = item._svg.parentNode, o && o.removeChild(item._svg)), item._svg = null;
          continue;
        }
        item = mdef.nested ? mark.items[0] : item, item._update !== id3 && (!item._svg || !item._svg.ownerSVGElement ? (this._dirtyAll = !1, dirtyParents(item, id3)) : this._update(mdef, item._svg, item), item._update = id3);
      }
    return !this._dirtyAll;
  }
  // -- Construct & maintain scenegraph to SVG mapping ---
  /**
   * Render a set of mark items.
   * @param {SVGElement} el - The parent element in the SVG tree.
   * @param {object} scene - The mark parent to render.
   * @param {SVGElement} prev - The previous sibling in the SVG tree.
   * @param {Array} markTypes - Array of the mark types to render.
   *                            If undefined, render all mark types
   */
  mark(el, scene, prev, markTypes) {
    if (!this.isDirty(scene))
      return scene._svg;
    let svg = this._svg, markType2 = scene.marktype, mdef = Marks[markType2], events3 = scene.interactive === !1 ? "none" : null, isGroup = mdef.tag === "g", parent = bind(scene, el, prev, "g", svg);
    if (markType2 !== "group" && markTypes != null && !markTypes.includes(markType2))
      return domClear(parent, 0), scene._svg;
    parent.setAttribute("class", cssClass(scene));
    let aria2 = ariaMarkAttributes(scene);
    for (let key2 in aria2) setAttribute(parent, key2, aria2[key2]);
    isGroup || setAttribute(parent, "pointer-events", events3), setAttribute(parent, "clip-path", scene.clip ? clip$1(this, scene, scene.group) : null);
    let sibling = null, i = 0, process3 = (item) => {
      let dirty = this.isDirty(item), node2 = bind(item, parent, sibling, mdef.tag, svg);
      dirty && (this._update(mdef, node2, item), isGroup && recurse(this, node2, item, markTypes)), sibling = node2, ++i;
    };
    return mdef.nested ? scene.items.length && process3(scene.items[0]) : visit2(scene, process3), domClear(parent, i), parent;
  }
  /**
   * Update the attributes of an SVG element for a mark item.
   * @param {object} mdef - The mark definition object
   * @param {SVGElement} el - The SVG element.
   * @param {Item} item - The mark item.
   */
  _update(mdef, el, item) {
    element = el, values = el.__values__, ariaItemAttributes(emit, item), mdef.attr(emit, item, this);
    let extra = mark_extras[mdef.type];
    extra && extra.call(this, mdef, el, item), element && this.style(element, item);
  }
  /**
   * Update the presentation attributes of an SVG element for a mark item.
   * @param {SVGElement} el - The SVG element.
   * @param {Item} item - The mark item.
   */
  style(el, item) {
    if (item != null) {
      for (let prop in stylesAttr) {
        let value3 = prop === "font" ? fontFamily(item) : item[prop];
        if (value3 === values[prop]) continue;
        let name2 = stylesAttr[prop];
        value3 == null ? el.removeAttribute(name2) : (isGradient(value3) && (value3 = gradientRef(value3, this._defs.gradient, href())), el.setAttribute(name2, value3 + "")), values[prop] = value3;
      }
      for (let prop in stylesCss)
        setStyle(el, stylesCss[prop], item[prop]);
    }
  }
  /**
   * Render SVG defs, as needed.
   * Must be called *after* marks have been processed to ensure the
   * collected state is current and accurate.
   */
  defs() {
    let svg = this._svg, defs = this._defs, el = defs.el, index4 = 0;
    for (let id3 in defs.gradient)
      el || (defs.el = el = domChild(svg, RootIndex + 1, "defs", svgns)), index4 = updateGradient(el, defs.gradient[id3], index4);
    for (let id3 in defs.clipping)
      el || (defs.el = el = domChild(svg, RootIndex + 1, "defs", svgns)), index4 = updateClipping(el, defs.clipping[id3], index4);
    el && (index4 === 0 ? (svg.removeChild(el), defs.el = null) : domClear(el, index4));
  }
  /**
   * Clear defs caches.
   */
  _clearDefs() {
    let def2 = this._defs;
    def2.gradient = {}, def2.clipping = {};
  }
};
function dirtyParents(item, id3) {
  for (; item && item.dirty !== id3; item = item.mark.group)
    if (item.dirty = id3, item.mark && item.mark.dirty !== id3)
      item.mark.dirty = id3;
    else return;
}
function updateGradient(el, grad, index4) {
  let i, n, stop2;
  if (grad.gradient === "radial") {
    let pt = domChild(el, index4++, "pattern", svgns);
    setAttributes(pt, {
      id: patternPrefix + grad.id,
      viewBox: "0,0,1,1",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "xMidYMid slice"
    }), pt = domChild(pt, 0, "rect", svgns), setAttributes(pt, {
      width: 1,
      height: 1,
      fill: `url(${href()}#${grad.id})`
    }), el = domChild(el, index4++, "radialGradient", svgns), setAttributes(el, {
      id: grad.id,
      fx: grad.x1,
      fy: grad.y1,
      fr: grad.r1,
      cx: grad.x2,
      cy: grad.y2,
      r: grad.r2
    });
  } else
    el = domChild(el, index4++, "linearGradient", svgns), setAttributes(el, {
      id: grad.id,
      x1: grad.x1,
      x2: grad.x2,
      y1: grad.y1,
      y2: grad.y2
    });
  for (i = 0, n = grad.stops.length; i < n; ++i)
    stop2 = domChild(el, i, "stop", svgns), stop2.setAttribute("offset", grad.stops[i].offset), stop2.setAttribute("stop-color", grad.stops[i].color);
  return domClear(el, i), index4;
}
function updateClipping(el, clip4, index4) {
  let mask;
  return el = domChild(el, index4, "clipPath", svgns), el.setAttribute("id", clip4.id), clip4.path ? (mask = domChild(el, 0, "path", svgns), mask.setAttribute("d", clip4.path)) : (mask = domChild(el, 0, "rect", svgns), setAttributes(mask, {
    x: 0,
    y: 0,
    width: clip4.width,
    height: clip4.height
  })), domClear(el, 1), index4 + 1;
}
function recurse(renderer, el, group2, markTypes) {
  el = el.lastChild.previousSibling;
  let prev, idx = 0;
  visit2(group2, (item) => {
    prev = renderer.mark(el, item, prev, markTypes), ++idx;
  }), domClear(el, 1 + idx);
}
function bind(item, el, sibling, tag, svg) {
  let node2 = item._svg, doc;
  if (!node2 && (doc = el.ownerDocument, node2 = domCreate(doc, tag, svgns), item._svg = node2, item.mark && (node2.__data__ = item, node2.__values__ = {
    fill: "default"
  }, tag === "g"))) {
    let bg = domCreate(doc, "path", svgns);
    node2.appendChild(bg), bg.__data__ = item;
    let cg = domCreate(doc, "g", svgns);
    node2.appendChild(cg), cg.__data__ = item;
    let fg = domCreate(doc, "path", svgns);
    node2.appendChild(fg), fg.__data__ = item, fg.__values__ = {
      fill: "default"
    };
  }
  return (node2.ownerSVGElement !== svg || siblingCheck(node2, sibling)) && el.insertBefore(node2, sibling ? sibling.nextSibling : el.firstChild), node2;
}
function siblingCheck(node2, sibling) {
  return node2.parentNode && node2.parentNode.childNodes.length > 1 && node2.previousSibling != sibling;
}
var element = null, values = null, mark_extras = {
  group(mdef, el, item) {
    let fg = element = el.childNodes[2];
    values = fg.__values__, mdef.foreground(emit, item, this), values = el.__values__, element = el.childNodes[1], mdef.content(emit, item, this);
    let bg = element = el.childNodes[0];
    mdef.background(emit, item, this);
    let value3 = item.mark.interactive === !1 ? "none" : null;
    if (value3 !== values.events && (setAttribute(fg, "pointer-events", value3), setAttribute(bg, "pointer-events", value3), values.events = value3), item.strokeForeground && item.stroke) {
      let fill2 = item.fill;
      setAttribute(fg, "display", null), this.style(bg, item), setAttribute(bg, "stroke", null), fill2 && (item.fill = null), values = fg.__values__, this.style(fg, item), fill2 && (item.fill = fill2), element = null;
    } else
      setAttribute(fg, "display", "none");
  },
  image(mdef, el, item) {
    item.smooth === !1 ? (setStyle(el, "image-rendering", "optimizeSpeed"), setStyle(el, "image-rendering", "pixelated")) : setStyle(el, "image-rendering", null);
  },
  text(mdef, el, item) {
    let tl2 = textLines(item), key2, value3, doc, lh;
    isArray(tl2) ? (value3 = tl2.map((_) => textValue(item, _)), key2 = value3.join(`
`), key2 !== values.text && (domClear(el, 0), doc = el.ownerDocument, lh = lineHeight(item), value3.forEach((t, i) => {
      let ts2 = domCreate(doc, "tspan", svgns);
      ts2.__data__ = item, ts2.textContent = t, i && (ts2.setAttribute("x", 0), ts2.setAttribute("dy", lh)), el.appendChild(ts2);
    }), values.text = key2)) : (value3 = textValue(item, tl2), value3 !== values.text && (el.textContent = value3, values.text = value3)), setAttribute(el, "font-family", fontFamily(item)), setAttribute(el, "font-size", fontSize(item) + "px"), setAttribute(el, "font-style", item.fontStyle), setAttribute(el, "font-variant", item.fontVariant), setAttribute(el, "font-weight", item.fontWeight);
  }
};
function emit(name2, value3, ns) {
  value3 !== values[name2] && (ns ? setAttributeNS(element, name2, value3, ns) : setAttribute(element, name2, value3), values[name2] = value3);
}
function setStyle(el, name2, value3) {
  value3 !== values[name2] && (value3 == null ? el.style.removeProperty(name2) : el.style.setProperty(name2, value3 + ""), values[name2] = value3);
}
function setAttributes(el, attrs) {
  for (let key2 in attrs)
    setAttribute(el, key2, attrs[key2]);
}
function setAttribute(el, name2, value3) {
  value3 != null ? el.setAttribute(name2, value3) : el.removeAttribute(name2);
}
function setAttributeNS(el, name2, value3, ns) {
  value3 != null ? el.setAttributeNS(ns, name2, value3) : el.removeAttributeNS(ns, name2);
}
function href() {
  let loc;
  return typeof window > "u" ? "" : (loc = window.location).hash ? loc.href.slice(0, -loc.hash.length) : loc.href;
}
var SVGStringRenderer = class extends Renderer {
  constructor(loader2) {
    super(loader2), this._text = null, this._defs = {
      gradient: {},
      clipping: {}
    };
  }
  /**
   * Returns the rendered SVG text string,
   * or null if rendering has not yet occurred.
   */
  svg() {
    return this._text;
  }
  /**
   * Internal rendering method.
   * @param {object} scene - The root mark of a scenegraph to render.
   */
  _render(scene) {
    let m = markup();
    m.open("svg", extend2({}, metadata, {
      class: "marks",
      width: this._width * this._scale,
      height: this._height * this._scale,
      viewBox: `0 0 ${this._width} ${this._height}`
    }));
    let bg = this._bgcolor;
    return bg && bg !== "transparent" && bg !== "none" && m.open("rect", {
      width: this._width,
      height: this._height,
      fill: bg
    }).close(), m.open("g", rootAttributes, {
      transform: "translate(" + this._origin + ")"
    }), this.mark(m, scene), m.close(), this.defs(m), this._text = m.close() + "", this;
  }
  /**
   * Render a set of mark items.
   * @param {object} m - The markup context.
   * @param {object} scene - The mark parent to render.
   */
  mark(m, scene) {
    let mdef = Marks[scene.marktype], tag = mdef.tag, attrList = [ariaItemAttributes, mdef.attr];
    m.open("g", {
      class: cssClass(scene),
      "clip-path": scene.clip ? clip$1(this, scene, scene.group) : null
    }, ariaMarkAttributes(scene), {
      "pointer-events": tag !== "g" && scene.interactive === !1 ? "none" : null
    });
    let process3 = (item) => {
      let href2 = this.href(item);
      if (href2 && m.open("a", href2), m.open(tag, this.attr(scene, item, attrList, tag !== "g" ? tag : null)), tag === "text") {
        let tl2 = textLines(item);
        if (isArray(tl2)) {
          let attrs = {
            x: 0,
            dy: lineHeight(item)
          };
          for (let i = 0; i < tl2.length; ++i)
            m.open("tspan", i ? attrs : null).text(textValue(item, tl2[i])).close();
        } else
          m.text(textValue(item, tl2));
      } else if (tag === "g") {
        let fore = item.strokeForeground, fill2 = item.fill, stroke2 = item.stroke;
        fore && stroke2 && (item.stroke = null), m.open("path", this.attr(scene, item, mdef.background, "bgrect")).close(), m.open("g", this.attr(scene, item, mdef.content)), visit2(item, (scene2) => this.mark(m, scene2)), m.close(), fore && stroke2 ? (fill2 && (item.fill = null), item.stroke = stroke2, m.open("path", this.attr(scene, item, mdef.foreground, "bgrect")).close(), fill2 && (item.fill = fill2)) : m.open("path", this.attr(scene, item, mdef.foreground, "bgfore")).close();
      }
      m.close(), href2 && m.close();
    };
    return mdef.nested ? scene.items && scene.items.length && process3(scene.items[0]) : visit2(scene, process3), m.close();
  }
  /**
   * Get href attributes for a hyperlinked mark item.
   * @param {Item} item - The mark item.
   */
  href(item) {
    let href2 = item.href, attr2;
    if (href2) {
      if (attr2 = this._hrefs && this._hrefs[href2])
        return attr2;
      this.sanitizeURL(href2).then((attr3) => {
        attr3["xlink:href"] = attr3.href, attr3.href = null, (this._hrefs || (this._hrefs = {}))[href2] = attr3;
      });
    }
    return null;
  }
  /**
   * Get an object of SVG attributes for a mark item.
   * @param {object} scene - The mark parent.
   * @param {Item} item - The mark item.
   * @param {array|function} attrs - One or more attribute emitters.
   * @param {string} tag - The tag being rendered.
   */
  attr(scene, item, attrs, tag) {
    let object4 = {}, emit2 = (name2, value3, ns, prefixed) => {
      object4[prefixed || name2] = value3;
    };
    return Array.isArray(attrs) ? attrs.forEach((fn) => fn(emit2, item, this)) : attrs(emit2, item, this), tag && style(object4, item, scene, tag, this._defs), object4;
  }
  /**
   * Render SVG defs, as needed.
   * Must be called *after* marks have been processed to ensure the
   * collected state is current and accurate.
   * @param {object} m - The markup context.
   */
  defs(m) {
    let gradient4 = this._defs.gradient, clipping = this._defs.clipping;
    if (Object.keys(gradient4).length + Object.keys(clipping).length !== 0) {
      m.open("defs");
      for (let id3 in gradient4) {
        let def2 = gradient4[id3], stops = def2.stops;
        def2.gradient === "radial" ? (m.open("pattern", {
          id: patternPrefix + id3,
          viewBox: "0,0,1,1",
          width: "100%",
          height: "100%",
          preserveAspectRatio: "xMidYMid slice"
        }), m.open("rect", {
          width: "1",
          height: "1",
          fill: "url(#" + id3 + ")"
        }).close(), m.close(), m.open("radialGradient", {
          id: id3,
          fx: def2.x1,
          fy: def2.y1,
          fr: def2.r1,
          cx: def2.x2,
          cy: def2.y2,
          r: def2.r2
        })) : m.open("linearGradient", {
          id: id3,
          x1: def2.x1,
          x2: def2.x2,
          y1: def2.y1,
          y2: def2.y2
        });
        for (let i = 0; i < stops.length; ++i)
          m.open("stop", {
            offset: stops[i].offset,
            "stop-color": stops[i].color
          }).close();
        m.close();
      }
      for (let id3 in clipping) {
        let def2 = clipping[id3];
        m.open("clipPath", {
          id: id3
        }), def2.path ? m.open("path", {
          d: def2.path
        }).close() : m.open("rect", {
          x: 0,
          y: 0,
          width: def2.width,
          height: def2.height
        }).close(), m.close();
      }
      m.close();
    }
  }
};
function style(s, item, scene, tag, defs) {
  let styleList;
  if (item == null || (tag === "bgrect" && scene.interactive === !1 && (s["pointer-events"] = "none"), tag === "bgfore" && (scene.interactive === !1 && (s["pointer-events"] = "none"), s.display = "none", item.fill !== null)))
    return s;
  tag === "image" && item.smooth === !1 && (styleList = ["image-rendering: optimizeSpeed;", "image-rendering: pixelated;"]), tag === "text" && (s["font-family"] = fontFamily(item), s["font-size"] = fontSize(item) + "px", s["font-style"] = item.fontStyle, s["font-variant"] = item.fontVariant, s["font-weight"] = item.fontWeight);
  for (let prop in stylesAttr) {
    let value3 = item[prop], name2 = stylesAttr[prop];
    value3 === "transparent" && (name2 === "fill" || name2 === "stroke") || value3 != null && (isGradient(value3) && (value3 = gradientRef(value3, defs.gradient, "")), s[name2] = value3);
  }
  for (let prop in stylesCss) {
    let value3 = item[prop];
    value3 != null && (styleList = styleList || [], styleList.push(`${stylesCss[prop]}: ${value3};`));
  }
  return styleList && (s.style = styleList.join(" ")), s;
}
var OPTS = {
  svgMarkTypes: ["text"],
  svgOnTop: !0,
  debug: !1
};
var HybridRenderer = class extends Renderer {
  constructor(loader2) {
    super(loader2), this._svgRenderer = new SVGRenderer(loader2), this._canvasRenderer = new CanvasRenderer(loader2);
  }
  /**
   * Initialize a new HybridRenderer instance.
   * @param {DOMElement} el - The containing DOM element for the display.
   * @param {number} width - The coordinate width of the display, in pixels.
   * @param {number} height - The coordinate height of the display, in pixels.
   * @param {Array<number>} origin - The origin of the display, in pixels.
   *   The coordinate system will be translated to this point.
   * @param {number} [scaleFactor=1] - Optional scaleFactor by which to multiply
   *   the width and height to determine the final pixel size.
   * @return {HybridRenderer} - This renderer instance.
   */
  initialize(el, width2, height2, origin, scaleFactor) {
    this._root_el = domChild(el, 0, "div");
    let bottomEl = domChild(this._root_el, 0, "div"), topEl = domChild(this._root_el, 1, "div");
    return this._root_el.style.position = "relative", OPTS.debug || (bottomEl.style.height = "100%", topEl.style.position = "absolute", topEl.style.top = "0", topEl.style.left = "0", topEl.style.height = "100%", topEl.style.width = "100%"), this._svgEl = OPTS.svgOnTop ? topEl : bottomEl, this._canvasEl = OPTS.svgOnTop ? bottomEl : topEl, this._svgEl.style.pointerEvents = "none", this._canvasRenderer.initialize(this._canvasEl, width2, height2, origin, scaleFactor), this._svgRenderer.initialize(this._svgEl, width2, height2, origin, scaleFactor), super.initialize(el, width2, height2, origin, scaleFactor);
  }
  /**
   * Flag a mark item as dirty.
   * @param {Item} item - The mark item.
   */
  dirty(item) {
    return OPTS.svgMarkTypes.includes(item.mark.marktype) ? this._svgRenderer.dirty(item) : this._canvasRenderer.dirty(item), this;
  }
  /**
   * Internal rendering method.
   * @param {object} scene - The root mark of a scenegraph to render.
   * @param {Array} markTypes - Array of the mark types to render.
   *                            If undefined, render all mark types
   */
  _render(scene, markTypes) {
    let canvasMarkTypes = (markTypes ?? ["arc", "area", "image", "line", "path", "rect", "rule", "shape", "symbol", "text", "trail"]).filter((m) => !OPTS.svgMarkTypes.includes(m));
    this._svgRenderer.render(scene, OPTS.svgMarkTypes), this._canvasRenderer.render(scene, canvasMarkTypes);
  }
  /**
   * Resize the display.
   * @param {number} width - The new coordinate width of the display, in pixels.
   * @param {number} height - The new coordinate height of the display, in pixels.
   * @param {Array<number>} origin - The new origin of the display, in pixels.
   *   The coordinate system will be translated to this point.
   * @param {number} [scaleFactor=1] - Optional scaleFactor by which to multiply
   *   the width and height to determine the final pixel size.
   * @return {SVGRenderer} - This renderer instance;
   */
  resize(width2, height2, origin, scaleFactor) {
    return super.resize(width2, height2, origin, scaleFactor), this._svgRenderer.resize(width2, height2, origin, scaleFactor), this._canvasRenderer.resize(width2, height2, origin, scaleFactor), this;
  }
  background(bgcolor) {
    return OPTS.svgOnTop ? this._canvasRenderer.background(bgcolor) : this._svgRenderer.background(bgcolor), this;
  }
}, HybridHandler = class extends CanvasHandler {
  constructor(loader2, tooltip2) {
    super(loader2, tooltip2);
  }
  initialize(el, origin, obj) {
    let canvas2 = domChild(domChild(el, 0, "div"), OPTS.svgOnTop ? 0 : 1, "div");
    return super.initialize(canvas2, origin, obj);
  }
}, Canvas = "canvas", Hybrid = "hybrid", PNG = "png", SVG = "svg", None2 = "none", RenderType = {
  Canvas,
  PNG,
  SVG,
  Hybrid,
  None: None2
}, modules = {};
modules[Canvas] = modules[PNG] = {
  renderer: CanvasRenderer,
  headless: CanvasRenderer,
  handler: CanvasHandler
};
modules[SVG] = {
  renderer: SVGRenderer,
  headless: SVGStringRenderer,
  handler: SVGHandler
};
modules[Hybrid] = {
  renderer: HybridRenderer,
  headless: HybridRenderer,
  handler: HybridHandler
};
modules[None2] = {};
function renderModule(name2, _) {
  return name2 = String(name2 || "").toLowerCase(), arguments.length > 1 ? (modules[name2] = _, this) : modules[name2];
}
function intersect2(scene, bounds2, filter3) {
  let hits = [], box = new Bounds().union(bounds2), type3 = scene.marktype;
  return type3 ? intersectMark(scene, box, filter3, hits) : type3 === "group" ? intersectGroup(scene, box, filter3, hits) : error62("Intersect scene must be mark node or group item.");
}
function intersectMark(mark, box, filter3, hits) {
  if (visitMark(mark, box, filter3)) {
    let items = mark.items, type3 = mark.marktype, n = items.length, i = 0;
    if (type3 === "group")
      for (; i < n; ++i)
        intersectGroup(items[i], box, filter3, hits);
    else
      for (let test2 = Marks[type3].isect; i < n; ++i) {
        let item = items[i];
        intersectItem(item, box, test2) && hits.push(item);
      }
  }
  return hits;
}
function visitMark(mark, box, filter3) {
  return mark.bounds && box.intersects(mark.bounds) && (mark.marktype === "group" || mark.interactive !== !1 && (!filter3 || filter3(mark)));
}
function intersectGroup(group2, box, filter3, hits) {
  filter3 && filter3(group2.mark) && intersectItem(group2, box, Marks.group.isect) && hits.push(group2);
  let marks = group2.items, n = marks && marks.length;
  if (n) {
    let x5 = group2.x || 0, y5 = group2.y || 0;
    box.translate(-x5, -y5);
    for (let i = 0; i < n; ++i)
      intersectMark(marks[i], box, filter3, hits);
    box.translate(x5, y5);
  }
  return hits;
}
function intersectItem(item, box, test2) {
  let bounds2 = item.bounds;
  return box.encloses(bounds2) || box.intersects(bounds2) && test2(item, box);
}
var clipBounds = new Bounds();
function boundClip(mark) {
  let clip4 = mark.clip;
  if (isFunction(clip4))
    clip4(boundContext(clipBounds.clear()));
  else if (clip4)
    clipBounds.set(0, 0, mark.group.width, mark.group.height);
  else return;
  mark.bounds.intersect(clipBounds);
}

// node_modules/vega-view-transforms/build/vega-view-transforms.js
var Top = "top", Left = "left", Right = "right", Bottom = "bottom", TopLeft = "top-left", TopRight = "top-right", BottomLeft = "bottom-left", BottomRight = "bottom-right", Start = "start", Middle = "middle", End = "end", X = "x", Y = "y", Group = "group", Bounds2 = "bounds", AxisRole = "axis", TitleRole = "title", FrameRole = "frame", ScopeRole = "scope", LegendRole = "legend", RowHeader = "row-header", RowFooter = "row-footer", RowTitle = "row-title", ColHeader = "column-header", ColFooter = "column-footer", ColTitle = "column-title", Padding = "padding", Symbols = "symbol", Fit = "fit", FitX = "fit-x", FitY = "fit-y", Pad = "pad", None3 = "none", All = "all", Each = "each", Flush = "flush", Column = "column", Row = "row";
function Bound(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Bound, Transform, {
  transform(_, pulse2) {
    let view2 = pulse2.dataflow, mark = _.mark, type3 = mark.marktype, entry2 = Marks[type3], bound2 = entry2.bound, markBounds = mark.bounds, rebound;
    if (entry2.nested)
      mark.items.length && view2.dirty(mark.items[0]), markBounds = boundItem2(mark, bound2), mark.items.forEach((item) => {
        item.bounds.clear().union(markBounds);
      });
    else if (type3 === Group || _.modified())
      switch (pulse2.visit(pulse2.MOD, (item) => view2.dirty(item)), markBounds.clear(), mark.items.forEach((item) => markBounds.union(boundItem2(item, bound2))), mark.role) {
        case AxisRole:
        case LegendRole:
        case TitleRole:
          pulse2.reflow();
      }
    else
      rebound = pulse2.changed(pulse2.REM), pulse2.visit(pulse2.ADD, (item) => {
        markBounds.union(boundItem2(item, bound2));
      }), pulse2.visit(pulse2.MOD, (item) => {
        rebound = rebound || markBounds.alignsWith(item.bounds), view2.dirty(item), markBounds.union(boundItem2(item, bound2));
      }), rebound && (markBounds.clear(), mark.items.forEach((item) => markBounds.union(item.bounds)));
    return boundClip(mark), pulse2.modifies("bounds");
  }
});
function boundItem2(item, bound2, opt) {
  return bound2(item.bounds.clear(), item, opt);
}
var COUNTER_NAME = ":vega_identifier:";
function Identifier(params2) {
  Transform.call(this, 0, params2);
}
Identifier.Definition = {
  type: "Identifier",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "as",
    type: "string",
    required: !0
  }]
};
inherits_default(Identifier, Transform, {
  transform(_, pulse2) {
    let counter = getCounter(pulse2.dataflow), as = _.as, id3 = counter.value;
    return pulse2.visit(pulse2.ADD, (t) => t[as] = t[as] || ++id3), counter.set(this.value = id3), pulse2;
  }
});
function getCounter(view2) {
  return view2._signals[COUNTER_NAME] || (view2._signals[COUNTER_NAME] = view2.add(0));
}
function Mark(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Mark, Transform, {
  transform(_, pulse2) {
    let mark = this.value;
    mark || (mark = pulse2.dataflow.scenegraph().mark(_.markdef, lookup$1(_), _.index), mark.group.context = _.context, _.context.group || (_.context.group = mark.group), mark.source = this.source, mark.clip = _.clip, mark.interactive = _.interactive, this.value = mark);
    let Init = mark.marktype === Group ? GroupItem : Item;
    return pulse2.visit(pulse2.ADD, (item) => Init.call(item, mark)), (_.modified("clip") || _.modified("interactive")) && (mark.clip = _.clip, mark.interactive = !!_.interactive, mark.zdirty = !0, pulse2.reflow()), mark.items = pulse2.source, pulse2;
  }
});
function lookup$1(_) {
  let g = _.groups, p = _.parent;
  return g && g.size === 1 ? g.get(Object.keys(g.object)[0]) : g && p ? g.lookup(p) : null;
}
function Overlap(params2) {
  Transform.call(this, null, params2);
}
var methods = {
  parity: (items) => items.filter((item, i) => i % 2 ? item.opacity = 0 : 1),
  greedy: (items, sep2) => {
    let a;
    return items.filter((b10, i) => !i || !intersect3(a.bounds, b10.bounds, sep2) ? (a = b10, 1) : b10.opacity = 0);
  }
}, intersect3 = (a, b10, sep2) => sep2 > Math.max(b10.x1 - a.x2, a.x1 - b10.x2, b10.y1 - a.y2, a.y1 - b10.y2), hasOverlap = (items, pad4) => {
  for (var i = 1, n = items.length, a = items[0].bounds, b10; i < n; a = b10, ++i)
    if (intersect3(a, b10 = items[i].bounds, pad4)) return !0;
}, hasBounds = (item) => {
  let b10 = item.bounds;
  return b10.width() > 1 && b10.height() > 1;
}, boundTest = (scale7, orient2, tolerance) => {
  var range7 = scale7.range(), b10 = new Bounds();
  return orient2 === Top || orient2 === Bottom ? b10.set(range7[0], -1 / 0, range7[1], 1 / 0) : b10.set(-1 / 0, range7[0], 1 / 0, range7[1]), b10.expand(tolerance || 1), (item) => b10.encloses(item.bounds);
}, reset = (source4) => (source4.forEach((item) => item.opacity = 1), source4), reflow = (pulse2, _) => pulse2.reflow(_.modified()).modifies("opacity");
inherits_default(Overlap, Transform, {
  transform(_, pulse2) {
    let reduce2 = methods[_.method] || methods.parity, sep2 = _.separation || 0, source4 = pulse2.materialize(pulse2.SOURCE).source, items, test2;
    if (!source4 || !source4.length) return;
    if (!_.method)
      return _.modified("method") && (reset(source4), pulse2 = reflow(pulse2, _)), pulse2;
    if (source4 = source4.filter(hasBounds), !source4.length) return;
    if (_.sort && (source4 = source4.slice().sort(_.sort)), items = reset(source4), pulse2 = reflow(pulse2, _), items.length >= 3 && hasOverlap(items, sep2)) {
      do
        items = reduce2(items, sep2);
      while (items.length >= 3 && hasOverlap(items, sep2));
      items.length < 3 && !peek(source4).opacity && (items.length > 1 && (peek(items).opacity = 0), peek(source4).opacity = 1);
    }
    _.boundScale && _.boundTolerance >= 0 && (test2 = boundTest(_.boundScale, _.boundOrient, +_.boundTolerance), source4.forEach((item) => {
      test2(item) || (item.opacity = 0);
    }));
    let bounds2 = items[0].mark.bounds.clear();
    return source4.forEach((item) => {
      item.opacity && bounds2.union(item.bounds);
    }), pulse2;
  }
});
function Render(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Render, Transform, {
  transform(_, pulse2) {
    let view2 = pulse2.dataflow;
    if (pulse2.visit(pulse2.ALL, (item) => view2.dirty(item)), pulse2.fields && pulse2.fields.zindex) {
      let item = pulse2.source && pulse2.source[0];
      item && (item.mark.zdirty = !0);
    }
  }
});
var tempBounds2 = new Bounds();
function set4(item, property2, value3) {
  return item[property2] === value3 ? 0 : (item[property2] = value3, 1);
}
function isYAxis(mark) {
  var orient2 = mark.items[0].orient;
  return orient2 === Left || orient2 === Right;
}
function axisIndices(datum2) {
  let index4 = +datum2.grid;
  return [
    datum2.ticks ? index4++ : -1,
    // ticks index
    datum2.labels ? index4++ : -1,
    // labels index
    index4 + +datum2.domain
    // title index
  ];
}
function axisLayout(view2, axis, width2, height2) {
  var item = axis.items[0], datum2 = item.datum, delta = item.translate != null ? item.translate : 0.5, orient2 = item.orient, indices = axisIndices(datum2), range7 = item.range, offset4 = item.offset, position2 = item.position, minExtent = item.minExtent, maxExtent = item.maxExtent, title2 = datum2.title && item.items[indices[2]].items[0], titlePadding = item.titlePadding, bounds2 = item.bounds, dl = title2 && multiLineOffset(title2), x5 = 0, y5 = 0, i, s;
  switch (tempBounds2.clear().union(bounds2), bounds2.clear(), (i = indices[0]) > -1 && bounds2.union(item.items[i].bounds), (i = indices[1]) > -1 && bounds2.union(item.items[i].bounds), orient2) {
    case Top:
      x5 = position2 || 0, y5 = -offset4, s = Math.max(minExtent, Math.min(maxExtent, -bounds2.y1)), bounds2.add(0, -s).add(range7, 0), title2 && axisTitleLayout(view2, title2, s, titlePadding, dl, 0, -1, bounds2);
      break;
    case Left:
      x5 = -offset4, y5 = position2 || 0, s = Math.max(minExtent, Math.min(maxExtent, -bounds2.x1)), bounds2.add(-s, 0).add(0, range7), title2 && axisTitleLayout(view2, title2, s, titlePadding, dl, 1, -1, bounds2);
      break;
    case Right:
      x5 = width2 + offset4, y5 = position2 || 0, s = Math.max(minExtent, Math.min(maxExtent, bounds2.x2)), bounds2.add(0, 0).add(s, range7), title2 && axisTitleLayout(view2, title2, s, titlePadding, dl, 1, 1, bounds2);
      break;
    case Bottom:
      x5 = position2 || 0, y5 = height2 + offset4, s = Math.max(minExtent, Math.min(maxExtent, bounds2.y2)), bounds2.add(0, 0).add(range7, s), title2 && axisTitleLayout(view2, title2, s, titlePadding, 0, 0, 1, bounds2);
      break;
    default:
      x5 = item.x, y5 = item.y;
  }
  return boundStroke(bounds2.translate(x5, y5), item), set4(item, "x", x5 + delta) | set4(item, "y", y5 + delta) && (item.bounds = tempBounds2, view2.dirty(item), item.bounds = bounds2, view2.dirty(item)), item.mark.bounds.clear().union(bounds2);
}
function axisTitleLayout(view2, title2, offset4, pad4, dl, isYAxis2, sign3, bounds2) {
  let b10 = title2.bounds;
  if (title2.auto) {
    let v2 = sign3 * (offset4 + dl + pad4), dx = 0, dy = 0;
    view2.dirty(title2), isYAxis2 ? dx = (title2.x || 0) - (title2.x = v2) : dy = (title2.y || 0) - (title2.y = v2), title2.mark.bounds.clear().union(b10.translate(-dx, -dy)), view2.dirty(title2);
  }
  bounds2.union(b10);
}
var min3 = (a, b10) => Math.floor(Math.min(a, b10)), max3 = (a, b10) => Math.ceil(Math.max(a, b10));
function gridLayoutGroups(group2) {
  var groups = group2.items, n = groups.length, i = 0, mark, items;
  let views = {
    marks: [],
    rowheaders: [],
    rowfooters: [],
    colheaders: [],
    colfooters: [],
    rowtitle: null,
    coltitle: null
  };
  for (; i < n; ++i)
    if (mark = groups[i], items = mark.items, mark.marktype === Group)
      switch (mark.role) {
        case AxisRole:
        case LegendRole:
        case TitleRole:
          break;
        case RowHeader:
          views.rowheaders.push(...items);
          break;
        case RowFooter:
          views.rowfooters.push(...items);
          break;
        case ColHeader:
          views.colheaders.push(...items);
          break;
        case ColFooter:
          views.colfooters.push(...items);
          break;
        case RowTitle:
          views.rowtitle = items[0];
          break;
        case ColTitle:
          views.coltitle = items[0];
          break;
        default:
          views.marks.push(...items);
      }
  return views;
}
function bboxFlush(item) {
  return new Bounds().set(0, 0, item.width || 0, item.height || 0);
}
function bboxFull(item) {
  let b10 = item.bounds.clone();
  return b10.empty() ? b10.set(0, 0, 0, 0) : b10.translate(-(item.x || 0), -(item.y || 0));
}
function get4(opt, key2, d) {
  let v2 = isObject2(opt) ? opt[key2] : opt;
  return v2 ?? (d !== void 0 ? d : 0);
}
function offsetValue(v2) {
  return v2 < 0 ? Math.ceil(-v2) : 0;
}
function gridLayout(view2, groups, opt) {
  var dirty = !opt.nodirty, bbox = opt.bounds === Flush ? bboxFlush : bboxFull, bounds2 = tempBounds2.set(0, 0, 0, 0), alignCol = get4(opt.align, Column), alignRow = get4(opt.align, Row), padCol = get4(opt.padding, Column), padRow = get4(opt.padding, Row), ncols = opt.columns || groups.length, nrows = ncols <= 0 ? 1 : Math.ceil(groups.length / ncols), n = groups.length, xOffset = Array(n), xExtent = Array(ncols), xMax = 0, yOffset = Array(n), yExtent = Array(nrows), yMax = 0, dx = Array(n), dy = Array(n), boxes = Array(n), m, i, c, r, b10, g, px2, py2, x5, y5, offset4;
  for (i = 0; i < ncols; ++i) xExtent[i] = 0;
  for (i = 0; i < nrows; ++i) yExtent[i] = 0;
  for (i = 0; i < n; ++i)
    g = groups[i], b10 = boxes[i] = bbox(g), g.x = g.x || 0, dx[i] = 0, g.y = g.y || 0, dy[i] = 0, c = i % ncols, r = ~~(i / ncols), xMax = Math.max(xMax, px2 = Math.ceil(b10.x2)), yMax = Math.max(yMax, py2 = Math.ceil(b10.y2)), xExtent[c] = Math.max(xExtent[c], px2), yExtent[r] = Math.max(yExtent[r], py2), xOffset[i] = padCol + offsetValue(b10.x1), yOffset[i] = padRow + offsetValue(b10.y1), dirty && view2.dirty(groups[i]);
  for (i = 0; i < n; ++i)
    i % ncols === 0 && (xOffset[i] = 0), i < ncols && (yOffset[i] = 0);
  if (alignCol === Each)
    for (c = 1; c < ncols; ++c) {
      for (offset4 = 0, i = c; i < n; i += ncols)
        offset4 < xOffset[i] && (offset4 = xOffset[i]);
      for (i = c; i < n; i += ncols)
        xOffset[i] = offset4 + xExtent[c - 1];
    }
  else if (alignCol === All) {
    for (offset4 = 0, i = 0; i < n; ++i)
      i % ncols && offset4 < xOffset[i] && (offset4 = xOffset[i]);
    for (i = 0; i < n; ++i)
      i % ncols && (xOffset[i] = offset4 + xMax);
  } else
    for (alignCol = !1, c = 1; c < ncols; ++c)
      for (i = c; i < n; i += ncols)
        xOffset[i] += xExtent[c - 1];
  if (alignRow === Each)
    for (r = 1; r < nrows; ++r) {
      for (offset4 = 0, i = r * ncols, m = i + ncols; i < m; ++i)
        offset4 < yOffset[i] && (offset4 = yOffset[i]);
      for (i = r * ncols; i < m; ++i)
        yOffset[i] = offset4 + yExtent[r - 1];
    }
  else if (alignRow === All) {
    for (offset4 = 0, i = ncols; i < n; ++i)
      offset4 < yOffset[i] && (offset4 = yOffset[i]);
    for (i = ncols; i < n; ++i)
      yOffset[i] = offset4 + yMax;
  } else
    for (alignRow = !1, r = 1; r < nrows; ++r)
      for (i = r * ncols, m = i + ncols; i < m; ++i)
        yOffset[i] += yExtent[r - 1];
  for (x5 = 0, i = 0; i < n; ++i)
    x5 = xOffset[i] + (i % ncols ? x5 : 0), dx[i] += x5 - groups[i].x;
  for (c = 0; c < ncols; ++c)
    for (y5 = 0, i = c; i < n; i += ncols)
      y5 += yOffset[i], dy[i] += y5 - groups[i].y;
  if (alignCol && get4(opt.center, Column) && nrows > 1)
    for (i = 0; i < n; ++i)
      b10 = alignCol === All ? xMax : xExtent[i % ncols], x5 = b10 - boxes[i].x2 - groups[i].x - dx[i], x5 > 0 && (dx[i] += x5 / 2);
  if (alignRow && get4(opt.center, Row) && ncols !== 1)
    for (i = 0; i < n; ++i)
      b10 = alignRow === All ? yMax : yExtent[~~(i / ncols)], y5 = b10 - boxes[i].y2 - groups[i].y - dy[i], y5 > 0 && (dy[i] += y5 / 2);
  for (i = 0; i < n; ++i)
    bounds2.union(boxes[i].translate(dx[i], dy[i]));
  switch (x5 = get4(opt.anchor, X), y5 = get4(opt.anchor, Y), get4(opt.anchor, Column)) {
    case End:
      x5 -= bounds2.width();
      break;
    case Middle:
      x5 -= bounds2.width() / 2;
  }
  switch (get4(opt.anchor, Row)) {
    case End:
      y5 -= bounds2.height();
      break;
    case Middle:
      y5 -= bounds2.height() / 2;
  }
  for (x5 = Math.round(x5), y5 = Math.round(y5), bounds2.clear(), i = 0; i < n; ++i)
    groups[i].mark.bounds.clear();
  for (i = 0; i < n; ++i)
    g = groups[i], g.x += dx[i] += x5, g.y += dy[i] += y5, bounds2.union(g.mark.bounds.union(g.bounds.translate(dx[i], dy[i]))), dirty && view2.dirty(g);
  return bounds2;
}
function trellisLayout(view2, group2, opt) {
  var views = gridLayoutGroups(group2), groups = views.marks, bbox = opt.bounds === Flush ? boundFlush : boundFull, off = opt.offset, ncols = opt.columns || groups.length, nrows = ncols <= 0 ? 1 : Math.ceil(groups.length / ncols), cells = nrows * ncols, x5, y5, x22, y22, anchor2, band2, offset4;
  let bounds2 = gridLayout(view2, groups, opt);
  bounds2.empty() && bounds2.set(0, 0, 0, 0), views.rowheaders && (band2 = get4(opt.headerBand, Row, null), x5 = layoutHeaders(view2, views.rowheaders, groups, ncols, nrows, -get4(off, "rowHeader"), min3, 0, bbox, "x1", 0, ncols, 1, band2)), views.colheaders && (band2 = get4(opt.headerBand, Column, null), y5 = layoutHeaders(view2, views.colheaders, groups, ncols, ncols, -get4(off, "columnHeader"), min3, 1, bbox, "y1", 0, 1, ncols, band2)), views.rowfooters && (band2 = get4(opt.footerBand, Row, null), x22 = layoutHeaders(view2, views.rowfooters, groups, ncols, nrows, get4(off, "rowFooter"), max3, 0, bbox, "x2", ncols - 1, ncols, 1, band2)), views.colfooters && (band2 = get4(opt.footerBand, Column, null), y22 = layoutHeaders(view2, views.colfooters, groups, ncols, ncols, get4(off, "columnFooter"), max3, 1, bbox, "y2", cells - ncols, 1, ncols, band2)), views.rowtitle && (anchor2 = get4(opt.titleAnchor, Row), offset4 = get4(off, "rowTitle"), offset4 = anchor2 === End ? x22 + offset4 : x5 - offset4, band2 = get4(opt.titleBand, Row, 0.5), layoutTitle(view2, views.rowtitle, offset4, 0, bounds2, band2)), views.coltitle && (anchor2 = get4(opt.titleAnchor, Column), offset4 = get4(off, "columnTitle"), offset4 = anchor2 === End ? y22 + offset4 : y5 - offset4, band2 = get4(opt.titleBand, Column, 0.5), layoutTitle(view2, views.coltitle, offset4, 1, bounds2, band2));
}
function boundFlush(item, field3) {
  return field3 === "x1" ? item.x || 0 : field3 === "y1" ? item.y || 0 : field3 === "x2" ? (item.x || 0) + (item.width || 0) : field3 === "y2" ? (item.y || 0) + (item.height || 0) : void 0;
}
function boundFull(item, field3) {
  return item.bounds[field3];
}
function layoutHeaders(view2, headers, groups, ncols, limit, offset4, agg, isX2, bound2, bf, start, stride, back, band2) {
  var n = groups.length, init2 = 0, edge = 0, i, j2, k, m, b10, h2, g, x5, y5;
  if (!n) return init2;
  for (i = start; i < n; i += stride)
    groups[i] && (init2 = agg(init2, bound2(groups[i], bf)));
  if (!headers.length) return init2;
  for (headers.length > limit && (view2.warn("Grid headers exceed limit: " + limit), headers = headers.slice(0, limit)), init2 += offset4, j2 = 0, m = headers.length; j2 < m; ++j2)
    view2.dirty(headers[j2]), headers[j2].mark.bounds.clear();
  for (i = start, j2 = 0, m = headers.length; j2 < m; ++j2, i += stride) {
    for (h2 = headers[j2], b10 = h2.mark.bounds, k = i; k >= 0 && (g = groups[k]) == null; k -= back) ;
    isX2 ? (x5 = band2 == null ? g.x : Math.round(g.bounds.x1 + band2 * g.bounds.width()), y5 = init2) : (x5 = init2, y5 = band2 == null ? g.y : Math.round(g.bounds.y1 + band2 * g.bounds.height())), b10.union(h2.bounds.translate(x5 - (h2.x || 0), y5 - (h2.y || 0))), h2.x = x5, h2.y = y5, view2.dirty(h2), edge = agg(edge, b10[bf]);
  }
  return edge;
}
function layoutTitle(view2, g, offset4, isX2, bounds2, band2) {
  if (g) {
    view2.dirty(g);
    var x5 = offset4, y5 = offset4;
    isX2 ? x5 = Math.round(bounds2.x1 + band2 * bounds2.width()) : y5 = Math.round(bounds2.y1 + band2 * bounds2.height()), g.bounds.translate(x5 - (g.x || 0), y5 - (g.y || 0)), g.mark.bounds.clear().union(g.bounds), g.x = x5, g.y = y5, view2.dirty(g);
  }
}
function lookup2(config2, orient2) {
  let opt = config2[orient2] || {};
  return (key2, d) => opt[key2] != null ? opt[key2] : config2[key2] != null ? config2[key2] : d;
}
function offsets(legends, value3) {
  let max4 = -1 / 0;
  return legends.forEach((item) => {
    item.offset != null && (max4 = Math.max(max4, item.offset));
  }), max4 > -1 / 0 ? max4 : value3;
}
function legendParams(g, orient2, config2, xb, yb, w2, h2) {
  let _ = lookup2(config2, orient2), offset4 = offsets(g, _("offset", 0)), anchor2 = _("anchor", Start), frame2 = _("frame", Group), mult2 = anchor2 === End ? 1 : anchor2 === Middle ? 0.5 : 0, ax = frame2 === Bounds2 ? xb.x1 + mult2 * xb.width() : mult2 * (w2 || yb.width() + 2 * yb.x1), ay = frame2 === Bounds2 ? yb.y1 + mult2 * yb.height() : mult2 * (h2 || xb.height() + 2 * xb.y1), p = {
    align: Each,
    bounds: _("bounds", Flush),
    columns: _("direction") === "vertical" ? 1 : g.length,
    padding: _("margin", 8),
    center: _("center"),
    nodirty: !0
  };
  switch (orient2) {
    case Left:
      p.anchor = {
        x: Math.floor(xb.x1) - offset4,
        column: End,
        y: ay,
        row: anchor2
      };
      break;
    case Right:
      p.anchor = {
        x: Math.ceil(xb.x2) + offset4,
        y: ay,
        row: anchor2
      };
      break;
    case Top:
      p.anchor = {
        y: Math.floor(yb.y1) - offset4,
        row: End,
        x: ax,
        column: anchor2
      };
      break;
    case Bottom:
      p.anchor = {
        y: Math.ceil(yb.y2) + offset4,
        x: ax,
        column: anchor2
      };
      break;
    case TopLeft:
      p.anchor = {
        x: offset4,
        y: offset4
      };
      break;
    case TopRight:
      p.anchor = {
        x: w2 - offset4,
        y: offset4,
        column: End
      };
      break;
    case BottomLeft:
      p.anchor = {
        x: offset4,
        y: h2 - offset4,
        row: End
      };
      break;
    case BottomRight:
      p.anchor = {
        x: w2 - offset4,
        y: h2 - offset4,
        column: End,
        row: End
      };
      break;
  }
  return p;
}
function legendLayout(view2, legend) {
  var item = legend.items[0], datum2 = item.datum, orient2 = item.orient, bounds2 = item.bounds, x5 = item.x, y5 = item.y, w2, h2;
  return item._bounds ? item._bounds.clear().union(bounds2) : item._bounds = bounds2.clone(), bounds2.clear(), legendGroupLayout(view2, item, item.items[0].items[0]), bounds2 = legendBounds(item, bounds2), w2 = 2 * item.padding, h2 = 2 * item.padding, bounds2.empty() || (w2 = Math.ceil(bounds2.width() + w2), h2 = Math.ceil(bounds2.height() + h2)), datum2.type === Symbols && legendEntryLayout(item.items[0].items[0].items[0].items), orient2 !== None3 && (item.x = x5 = 0, item.y = y5 = 0), item.width = w2, item.height = h2, boundStroke(bounds2.set(x5, y5, x5 + w2, y5 + h2), item), item.mark.bounds.clear().union(bounds2), item;
}
function legendBounds(item, b10) {
  return item.items.forEach((_) => b10.union(_.bounds)), b10.empty() && (b10.x2 = item.padding, b10.y2 = item.padding), b10.x1 = item.padding, b10.y1 = item.padding, b10;
}
function legendGroupLayout(view2, item, entry2) {
  var pad4 = item.padding, ex = pad4 - entry2.x, ey = pad4 - entry2.y;
  if (!item.datum.title)
    (ex || ey) && translate2(view2, entry2, ex, ey);
  else {
    var title2 = item.items[1].items[0], anchor2 = title2.anchor, tpad = item.titlePadding || 0, tx = pad4 - title2.x, ty = pad4 - title2.y;
    switch (title2.orient) {
      case Left:
        ex += Math.ceil(title2.bounds.width()) + tpad;
        break;
      case Right:
      case Bottom:
        break;
      default:
        ey += title2.bounds.height() + tpad;
    }
    switch ((ex || ey) && translate2(view2, entry2, ex, ey), title2.orient) {
      case Left:
        ty += legendTitleOffset(item, entry2, title2, anchor2, 1, 1);
        break;
      case Right:
        tx += legendTitleOffset(item, entry2, title2, End, 0, 0) + tpad, ty += legendTitleOffset(item, entry2, title2, anchor2, 1, 1);
        break;
      case Bottom:
        tx += legendTitleOffset(item, entry2, title2, anchor2, 0, 0), ty += legendTitleOffset(item, entry2, title2, End, -1, 0, 1) + tpad;
        break;
      default:
        tx += legendTitleOffset(item, entry2, title2, anchor2, 0, 0);
    }
    (tx || ty) && translate2(view2, title2, tx, ty), (tx = Math.round(title2.bounds.x1 - pad4)) < 0 && (translate2(view2, entry2, -tx, 0), translate2(view2, title2, -tx, 0));
  }
}
function legendTitleOffset(item, entry2, title2, anchor2, y5, lr, noBar) {
  let grad = item.datum.type !== "symbol", vgrad = title2.datum.vgrad, e = grad && (lr || !vgrad) && !noBar ? entry2.items[0] : entry2, s = e.bounds[y5 ? "y2" : "x2"] - item.padding, u4 = vgrad && lr ? s : 0, v2 = vgrad && lr ? 0 : s, o = y5 <= 0 ? 0 : multiLineOffset(title2);
  return Math.round(anchor2 === Start ? u4 : anchor2 === End ? v2 - o : 0.5 * (s - o));
}
function translate2(view2, item, dx, dy) {
  item.x += dx, item.y += dy, item.bounds.translate(dx, dy), item.mark.bounds.translate(dx, dy), view2.dirty(item);
}
function legendEntryLayout(entries2) {
  let widths = entries2.reduce((w2, g) => (w2[g.column] = Math.max(g.bounds.x2 - g.x, w2[g.column] || 0), w2), {});
  entries2.forEach((g) => {
    g.width = widths[g.column], g.height = g.bounds.y2 - g.y;
  });
}
function titleLayout(view2, mark, width2, height2, viewBounds2) {
  var group2 = mark.items[0], frame2 = group2.frame, orient2 = group2.orient, anchor2 = group2.anchor, offset4 = group2.offset, padding3 = group2.padding, title2 = group2.items[0].items[0], subtitle = group2.items[1] && group2.items[1].items[0], end = orient2 === Left || orient2 === Right ? height2 : width2, start = 0, x5 = 0, y5 = 0, sx = 0, sy = 0, pos;
  if (frame2 !== Group ? orient2 === Left ? (start = viewBounds2.y2, end = viewBounds2.y1) : orient2 === Right ? (start = viewBounds2.y1, end = viewBounds2.y2) : (start = viewBounds2.x1, end = viewBounds2.x2) : orient2 === Left && (start = height2, end = 0), pos = anchor2 === Start ? start : anchor2 === End ? end : (start + end) / 2, subtitle && subtitle.text) {
    switch (orient2) {
      case Top:
      case Bottom:
        sy = title2.bounds.height() + padding3;
        break;
      case Left:
        sx = title2.bounds.width() + padding3;
        break;
      case Right:
        sx = -title2.bounds.width() - padding3;
        break;
    }
    tempBounds2.clear().union(subtitle.bounds), tempBounds2.translate(sx - (subtitle.x || 0), sy - (subtitle.y || 0)), set4(subtitle, "x", sx) | set4(subtitle, "y", sy) && (view2.dirty(subtitle), subtitle.bounds.clear().union(tempBounds2), subtitle.mark.bounds.clear().union(tempBounds2), view2.dirty(subtitle)), tempBounds2.clear().union(subtitle.bounds);
  } else
    tempBounds2.clear();
  switch (tempBounds2.union(title2.bounds), orient2) {
    case Top:
      x5 = pos, y5 = viewBounds2.y1 - tempBounds2.height() - offset4;
      break;
    case Left:
      x5 = viewBounds2.x1 - tempBounds2.width() - offset4, y5 = pos;
      break;
    case Right:
      x5 = viewBounds2.x2 + tempBounds2.width() + offset4, y5 = pos;
      break;
    case Bottom:
      x5 = pos, y5 = viewBounds2.y2 + offset4;
      break;
    default:
      x5 = group2.x, y5 = group2.y;
  }
  return set4(group2, "x", x5) | set4(group2, "y", y5) && (tempBounds2.translate(x5, y5), view2.dirty(group2), group2.bounds.clear().union(tempBounds2), mark.bounds.clear().union(tempBounds2), view2.dirty(group2)), group2.bounds;
}
function ViewLayout(params2) {
  Transform.call(this, null, params2);
}
inherits_default(ViewLayout, Transform, {
  transform(_, pulse2) {
    let view2 = pulse2.dataflow;
    return _.mark.items.forEach((group2) => {
      _.layout && trellisLayout(view2, group2, _.layout), layoutGroup(view2, group2, _);
    }), shouldReflow(_.mark.group) ? pulse2.reflow() : pulse2;
  }
});
function shouldReflow(group2) {
  return group2 && group2.mark.role !== "legend-entry";
}
function layoutGroup(view2, group2, _) {
  var items = group2.items, width2 = Math.max(0, group2.width || 0), height2 = Math.max(0, group2.height || 0), viewBounds2 = new Bounds().set(0, 0, width2, height2), xBounds = viewBounds2.clone(), yBounds = viewBounds2.clone(), legends = [], title2, mark, orient2, b10, i, n;
  for (i = 0, n = items.length; i < n; ++i)
    switch (mark = items[i], mark.role) {
      case AxisRole:
        b10 = isYAxis(mark) ? xBounds : yBounds, b10.union(axisLayout(view2, mark, width2, height2));
        break;
      case TitleRole:
        title2 = mark;
        break;
      case LegendRole:
        legends.push(legendLayout(view2, mark));
        break;
      case FrameRole:
      case ScopeRole:
      case RowHeader:
      case RowFooter:
      case RowTitle:
      case ColHeader:
      case ColFooter:
      case ColTitle:
        xBounds.union(mark.bounds), yBounds.union(mark.bounds);
        break;
      default:
        viewBounds2.union(mark.bounds);
    }
  if (legends.length) {
    let l = {};
    legends.forEach((item) => {
      orient2 = item.orient || Right, orient2 !== None3 && (l[orient2] || (l[orient2] = [])).push(item);
    });
    for (let orient3 in l) {
      let g = l[orient3];
      gridLayout(view2, g, legendParams(g, orient3, _.legends, xBounds, yBounds, width2, height2));
    }
    legends.forEach((item) => {
      let b11 = item.bounds;
      if (b11.equals(item._bounds) || (item.bounds = item._bounds, view2.dirty(item), item.bounds = b11, view2.dirty(item)), _.autosize && (_.autosize.type === Fit || _.autosize.type === FitX || _.autosize.type === FitY))
        switch (item.orient) {
          case Left:
          case Right:
            viewBounds2.add(b11.x1, 0).add(b11.x2, 0);
            break;
          case Top:
          case Bottom:
            viewBounds2.add(0, b11.y1).add(0, b11.y2);
        }
      else
        viewBounds2.union(b11);
    });
  }
  viewBounds2.union(xBounds).union(yBounds), title2 && viewBounds2.union(titleLayout(view2, title2, width2, height2, viewBounds2)), group2.clip && viewBounds2.set(0, 0, group2.width || 0, group2.height || 0), viewSizeLayout(view2, group2, viewBounds2, _);
}
function viewSizeLayout(view2, group2, viewBounds2, _) {
  let auto = _.autosize || {}, type3 = auto.type;
  if (view2._autosize < 1 || !type3) return;
  let viewWidth2 = view2._width, viewHeight2 = view2._height, width2 = Math.max(0, group2.width || 0), left = Math.max(0, Math.ceil(-viewBounds2.x1)), height2 = Math.max(0, group2.height || 0), top = Math.max(0, Math.ceil(-viewBounds2.y1)), right = Math.max(0, Math.ceil(viewBounds2.x2 - width2)), bottom = Math.max(0, Math.ceil(viewBounds2.y2 - height2));
  if (auto.contains === Padding) {
    let padding3 = view2.padding();
    viewWidth2 -= padding3.left + padding3.right, viewHeight2 -= padding3.top + padding3.bottom;
  }
  type3 === None3 ? (left = 0, top = 0, width2 = viewWidth2, height2 = viewHeight2) : type3 === Fit ? (width2 = Math.max(0, viewWidth2 - left - right), height2 = Math.max(0, viewHeight2 - top - bottom)) : type3 === FitX ? (width2 = Math.max(0, viewWidth2 - left - right), viewHeight2 = height2 + top + bottom) : type3 === FitY ? (viewWidth2 = width2 + left + right, height2 = Math.max(0, viewHeight2 - top - bottom)) : type3 === Pad && (viewWidth2 = width2 + left + right, viewHeight2 = height2 + top + bottom), view2._resizeView(viewWidth2, viewHeight2, width2, height2, [left, top], auto.resize);
}

// node_modules/vega-encode/build/vega-encode.js
var vega_encode_exports = {};
__export(vega_encode_exports, {
  axisticks: () => AxisTicks,
  datajoin: () => DataJoin,
  encode: () => Encode,
  legendentries: () => LegendEntries,
  linkpath: () => LinkPath,
  pie: () => Pie,
  scale: () => Scale,
  sortitems: () => SortItems,
  stack: () => Stack
});
function AxisTicks(params2) {
  Transform.call(this, null, params2);
}
inherits_default(AxisTicks, Transform, {
  transform(_, pulse2) {
    if (this.value && !_.modified())
      return pulse2.StopPropagation;
    var locale4 = pulse2.dataflow.locale(), out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), ticks2 = this.value, scale7 = _.scale, tally = _.count == null ? _.values ? _.values.length : 10 : _.count, count4 = tickCount(scale7, tally, _.minstep), format5 = _.format || tickFormat2(locale4, scale7, count4, _.formatSpecifier, _.formatType, !!_.values), values3 = _.values ? validTicks(scale7, _.values, count4) : tickValues(scale7, count4);
    return ticks2 && (out.rem = ticks2), ticks2 = values3.map((value3, i) => ingest$1({
      index: i / (values3.length - 1 || 1),
      tickIndex: i,
      value: value3,
      label: format5(value3)
    })), _.extra && ticks2.length && ticks2.push(ingest$1({
      index: -1,
      tickIndex: -1,
      extra: {
        value: ticks2[0].value
      },
      label: ""
    })), out.source = ticks2, out.add = ticks2, this.value = ticks2, out;
  }
});
function DataJoin(params2) {
  Transform.call(this, null, params2);
}
function defaultItemCreate() {
  return ingest$1({});
}
function newMap(key2) {
  let map4 = fastmap().test((t) => t.exit);
  return map4.lookup = (t) => map4.get(key2(t)), map4;
}
inherits_default(DataJoin, Transform, {
  transform(_, pulse2) {
    var df = pulse2.dataflow, out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), item = _.item || defaultItemCreate, key2 = _.key || tupleid, map4 = this.value;
    return isArray(out.encode) && (out.encode = null), map4 && (_.modified("key") || pulse2.modified(key2)) && error62("DataJoin does not support modified key function or fields."), map4 || (pulse2 = pulse2.addAll(), this.value = map4 = newMap(key2)), pulse2.visit(pulse2.ADD, (t) => {
      let k = key2(t), x5 = map4.get(k);
      x5 ? x5.exit ? (map4.empty--, out.add.push(x5)) : out.mod.push(x5) : (x5 = item(t), map4.set(k, x5), out.add.push(x5)), x5.datum = t, x5.exit = !1;
    }), pulse2.visit(pulse2.MOD, (t) => {
      let k = key2(t), x5 = map4.get(k);
      x5 && (x5.datum = t, out.mod.push(x5));
    }), pulse2.visit(pulse2.REM, (t) => {
      let k = key2(t), x5 = map4.get(k);
      t === x5.datum && !x5.exit && (out.rem.push(x5), x5.exit = !0, ++map4.empty);
    }), pulse2.changed(pulse2.ADD_MOD) && out.modifies("datum"), (pulse2.clean() || _.clean && map4.empty > df.cleanThreshold) && df.runAfter(map4.clean), out;
  }
});
function Encode(params2) {
  Transform.call(this, null, params2);
}
inherits_default(Encode, Transform, {
  transform(_, pulse2) {
    var out = pulse2.fork(pulse2.ADD_REM), fmod = _.mod || !1, encoders = _.encoders, encode4 = pulse2.encode;
    if (isArray(encode4))
      if (out.changed() || encode4.every((e) => encoders[e]))
        encode4 = encode4[0], out.encode = null;
      else
        return pulse2.StopPropagation;
    var reenter = encode4 === "enter", update3 = encoders.update || falsy, enter = encoders.enter || falsy, exit = encoders.exit || falsy, set8 = (encode4 && !reenter ? encoders[encode4] : update3) || falsy;
    if (pulse2.changed(pulse2.ADD) && (pulse2.visit(pulse2.ADD, (t) => {
      enter(t, _), update3(t, _);
    }), out.modifies(enter.output), out.modifies(update3.output), set8 !== falsy && set8 !== update3 && (pulse2.visit(pulse2.ADD, (t) => {
      set8(t, _);
    }), out.modifies(set8.output))), pulse2.changed(pulse2.REM) && exit !== falsy && (pulse2.visit(pulse2.REM, (t) => {
      exit(t, _);
    }), out.modifies(exit.output)), reenter || set8 !== falsy) {
      let flag2 = pulse2.MOD | (_.modified() ? pulse2.REFLOW : 0);
      reenter ? (pulse2.visit(flag2, (t) => {
        let mod = enter(t, _) || fmod;
        (set8(t, _) || mod) && out.mod.push(t);
      }), out.mod.length && out.modifies(enter.output)) : pulse2.visit(flag2, (t) => {
        (set8(t, _) || fmod) && out.mod.push(t);
      }), out.mod.length && out.modifies(set8.output);
    }
    return out.changed() ? out : pulse2.StopPropagation;
  }
});
function LegendEntries(params2) {
  Transform.call(this, [], params2);
}
inherits_default(LegendEntries, Transform, {
  transform(_, pulse2) {
    if (this.value != null && !_.modified())
      return pulse2.StopPropagation;
    var locale4 = pulse2.dataflow.locale(), out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), items = this.value, type3 = _.type || SymbolLegend, scale7 = _.scale, limit = +_.limit, count4 = tickCount(scale7, _.count == null ? 5 : _.count, _.minstep), lskip = !!_.values || type3 === SymbolLegend, format5 = _.format || labelFormat(locale4, scale7, count4, type3, _.formatSpecifier, _.formatType, lskip), values3 = _.values || labelValues(scale7, count4), domain4, fraction, size, offset4, ellipsis;
    return items && (out.rem = items), type3 === SymbolLegend ? (limit && values3.length > limit ? (pulse2.dataflow.warn("Symbol legend count exceeds limit, filtering items."), items = values3.slice(0, limit - 1), ellipsis = !0) : items = values3, isFunction(size = _.size) ? (!_.values && scale7(items[0]) === 0 && (items = items.slice(1)), offset4 = items.reduce((max4, value3) => Math.max(max4, size(value3, _)), 0)) : size = constant_default(offset4 = size || 8), items = items.map((value3, index4) => ingest$1({
      index: index4,
      label: format5(value3, index4, items),
      value: value3,
      offset: offset4,
      size: size(value3, _)
    })), ellipsis && (ellipsis = values3[items.length], items.push(ingest$1({
      index: items.length,
      label: `\u2026${values3.length - items.length} entries`,
      value: ellipsis,
      offset: offset4,
      size: size(ellipsis, _)
    })))) : type3 === GradientLegend ? (domain4 = scale7.domain(), fraction = scaleFraction(scale7, domain4[0], peek(domain4)), values3.length < 3 && !_.values && domain4[0] !== peek(domain4) && (values3 = [domain4[0], peek(domain4)]), items = values3.map((value3, index4) => ingest$1({
      index: index4,
      label: format5(value3, index4, values3),
      value: value3,
      perc: fraction(value3)
    }))) : (size = values3.length - 1, fraction = labelFraction(scale7), items = values3.map((value3, index4) => ingest$1({
      index: index4,
      label: format5(value3, index4, values3),
      value: value3,
      perc: index4 ? fraction(value3) : 0,
      perc2: index4 === size ? 1 : fraction(values3[index4 + 1])
    }))), out.source = items, out.add = items, this.value = items, out;
  }
});
var sourceX = (t) => t.source.x, sourceY = (t) => t.source.y, targetX = (t) => t.target.x, targetY = (t) => t.target.y;
function LinkPath(params2) {
  Transform.call(this, {}, params2);
}
LinkPath.Definition = {
  type: "LinkPath",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "sourceX",
    type: "field",
    default: "source.x"
  }, {
    name: "sourceY",
    type: "field",
    default: "source.y"
  }, {
    name: "targetX",
    type: "field",
    default: "target.x"
  }, {
    name: "targetY",
    type: "field",
    default: "target.y"
  }, {
    name: "orient",
    type: "enum",
    default: "vertical",
    values: ["horizontal", "vertical", "radial"]
  }, {
    name: "shape",
    type: "enum",
    default: "line",
    values: ["line", "arc", "curve", "diagonal", "orthogonal"]
  }, {
    name: "require",
    type: "signal"
  }, {
    name: "as",
    type: "string",
    default: "path"
  }]
};
inherits_default(LinkPath, Transform, {
  transform(_, pulse2) {
    var sx = _.sourceX || sourceX, sy = _.sourceY || sourceY, tx = _.targetX || targetX, ty = _.targetY || targetY, as = _.as || "path", orient2 = _.orient || "vertical", shape2 = _.shape || "line", path3 = Paths.get(shape2 + "-" + orient2) || Paths.get(shape2);
    return path3 || error62("LinkPath unsupported type: " + _.shape + (_.orient ? "-" + _.orient : "")), pulse2.visit(pulse2.SOURCE, (t) => {
      t[as] = path3(sx(t), sy(t), tx(t), ty(t));
    }), pulse2.reflow(_.modified()).modifies(as);
  }
});
var line2 = (sx, sy, tx, ty) => "M" + sx + "," + sy + "L" + tx + "," + ty, lineR = (sa2, sr, ta, tr2) => line2(sr * Math.cos(sa2), sr * Math.sin(sa2), tr2 * Math.cos(ta), tr2 * Math.sin(ta)), arc2 = (sx, sy, tx, ty) => {
  var dx = tx - sx, dy = ty - sy, rr = Math.hypot(dx, dy) / 2, ra = 180 * Math.atan2(dy, dx) / Math.PI;
  return "M" + sx + "," + sy + "A" + rr + "," + rr + " " + ra + " 0 1 " + tx + "," + ty;
}, arcR = (sa2, sr, ta, tr2) => arc2(sr * Math.cos(sa2), sr * Math.sin(sa2), tr2 * Math.cos(ta), tr2 * Math.sin(ta)), curve = (sx, sy, tx, ty) => {
  let dx = tx - sx, dy = ty - sy, ix = 0.2 * (dx + dy), iy = 0.2 * (dy - dx);
  return "M" + sx + "," + sy + "C" + (sx + ix) + "," + (sy + iy) + " " + (tx + iy) + "," + (ty - ix) + " " + tx + "," + ty;
}, curveR = (sa2, sr, ta, tr2) => curve(sr * Math.cos(sa2), sr * Math.sin(sa2), tr2 * Math.cos(ta), tr2 * Math.sin(ta)), orthoX = (sx, sy, tx, ty) => "M" + sx + "," + sy + "V" + ty + "H" + tx, orthoY = (sx, sy, tx, ty) => "M" + sx + "," + sy + "H" + tx + "V" + ty, orthoR = (sa2, sr, ta, tr2) => {
  let sc = Math.cos(sa2), ss = Math.sin(sa2), tc = Math.cos(ta), ts2 = Math.sin(ta), sf = Math.abs(ta - sa2) > Math.PI ? ta <= sa2 : ta > sa2;
  return "M" + sr * sc + "," + sr * ss + "A" + sr + "," + sr + " 0 0," + (sf ? 1 : 0) + " " + sr * tc + "," + sr * ts2 + "L" + tr2 * tc + "," + tr2 * ts2;
}, diagonalX = (sx, sy, tx, ty) => {
  let m = (sx + tx) / 2;
  return "M" + sx + "," + sy + "C" + m + "," + sy + " " + m + "," + ty + " " + tx + "," + ty;
}, diagonalY = (sx, sy, tx, ty) => {
  let m = (sy + ty) / 2;
  return "M" + sx + "," + sy + "C" + sx + "," + m + " " + tx + "," + m + " " + tx + "," + ty;
}, diagonalR = (sa2, sr, ta, tr2) => {
  let sc = Math.cos(sa2), ss = Math.sin(sa2), tc = Math.cos(ta), ts2 = Math.sin(ta), mr = (sr + tr2) / 2;
  return "M" + sr * sc + "," + sr * ss + "C" + mr * sc + "," + mr * ss + " " + mr * tc + "," + mr * ts2 + " " + tr2 * tc + "," + tr2 * ts2;
}, Paths = fastmap({
  line: line2,
  "line-radial": lineR,
  arc: arc2,
  "arc-radial": arcR,
  curve,
  "curve-radial": curveR,
  "orthogonal-horizontal": orthoX,
  "orthogonal-vertical": orthoY,
  "orthogonal-radial": orthoR,
  "diagonal-horizontal": diagonalX,
  "diagonal-vertical": diagonalY,
  "diagonal-radial": diagonalR
});
function Pie(params2) {
  Transform.call(this, null, params2);
}
Pie.Definition = {
  type: "Pie",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "startAngle",
    type: "number",
    default: 0
  }, {
    name: "endAngle",
    type: "number",
    default: 6.283185307179586
  }, {
    name: "sort",
    type: "boolean",
    default: !1
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: ["startAngle", "endAngle"]
  }]
};
inherits_default(Pie, Transform, {
  transform(_, pulse2) {
    var as = _.as || ["startAngle", "endAngle"], startAngle = as[0], endAngle = as[1], field3 = _.field || one, start = _.startAngle || 0, stop2 = _.endAngle != null ? _.endAngle : 2 * Math.PI, data3 = pulse2.source, values3 = data3.map(field3), n = values3.length, a = start, k = (stop2 - start) / sum(values3), index4 = range2(n), i, t, v2;
    for (_.sort && index4.sort((a2, b10) => values3[a2] - values3[b10]), i = 0; i < n; ++i)
      v2 = values3[index4[i]], t = data3[index4[i]], t[startAngle] = a, t[endAngle] = a += v2 * k;
    return this.value = values3, pulse2.reflow(_.modified()).modifies(as);
  }
});
var DEFAULT_COUNT = 5;
function includeZero(scale7) {
  let type3 = scale7.type;
  return !scale7.bins && (type3 === Linear2 || type3 === Pow || type3 === Sqrt);
}
function includePad(type3) {
  return isContinuous(type3) && type3 !== Sequential;
}
var SKIP2 = toSet(["set", "modified", "clear", "type", "scheme", "schemeExtent", "schemeCount", "domain", "domainMin", "domainMid", "domainMax", "domainRaw", "domainImplicit", "nice", "zero", "bins", "range", "rangeStep", "round", "reverse", "interpolate", "interpolateGamma"]);
function Scale(params2) {
  Transform.call(this, null, params2), this.modified(!0);
}
inherits_default(Scale, Transform, {
  transform(_, pulse2) {
    var df = pulse2.dataflow, scale$12 = this.value, key2 = scaleKey(_);
    (!scale$12 || key2 !== scale$12.type) && (this.value = scale$12 = scale(key2)());
    for (key2 in _) if (!SKIP2[key2]) {
      if (key2 === "padding" && includePad(scale$12.type)) continue;
      isFunction(scale$12[key2]) ? scale$12[key2](_[key2]) : df.warn("Unsupported scale property: " + key2);
    }
    return configureRange(scale$12, _, configureBins(scale$12, _, configureDomain(scale$12, _, df))), pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS);
  }
});
function scaleKey(_) {
  var t = _.type, d = "", n;
  return t === Sequential ? Sequential + "-" + Linear2 : (isContinuousColor(_) && (n = _.rawDomain ? _.rawDomain.length : _.domain ? _.domain.length + +(_.domainMid != null) : 0, d = n === 2 ? Sequential + "-" : n === 3 ? Diverging + "-" : ""), (d + t || Linear2).toLowerCase());
}
function isContinuousColor(_) {
  let t = _.type;
  return isContinuous(t) && t !== Time && t !== UTC && (_.scheme || _.range && _.range.length && _.range.every(isString));
}
function configureDomain(scale7, _, df) {
  let raw = rawDomain(scale7, _.domainRaw, df);
  if (raw > -1) return raw;
  var domain4 = _.domain, type3 = scale7.type, zero6 = _.zero || _.zero === void 0 && includeZero(scale7), n, mid;
  if (!domain4) return 0;
  if ((zero6 || _.domainMin != null || _.domainMax != null || _.domainMid != null) && (n = (domain4 = domain4.slice()).length - 1 || 1, zero6 && (domain4[0] > 0 && (domain4[0] = 0), domain4[n] < 0 && (domain4[n] = 0)), _.domainMin != null && (domain4[0] = _.domainMin), _.domainMax != null && (domain4[n] = _.domainMax), _.domainMid != null)) {
    mid = _.domainMid;
    let i = mid > domain4[n] ? n + 1 : mid < domain4[0] ? 0 : n;
    i !== n && df.warn("Scale domainMid exceeds domain min or max.", mid), domain4.splice(i, 0, mid);
  }
  return includePad(type3) && _.padding && domain4[0] !== peek(domain4) && (domain4 = padDomain(type3, domain4, _.range, _.padding, _.exponent, _.constant)), scale7.domain(domainCheck(type3, domain4, df)), type3 === Ordinal && scale7.unknown(_.domainImplicit ? implicit : void 0), _.nice && scale7.nice && scale7.nice(_.nice !== !0 && tickCount(scale7, _.nice) || null), domain4.length;
}
function rawDomain(scale7, raw, df) {
  return raw ? (scale7.domain(domainCheck(scale7.type, raw, df)), raw.length) : -1;
}
function padDomain(type3, domain4, range7, pad4, exponent2, constant2) {
  var span = Math.abs(peek(range7) - range7[0]), frac = span / (span - 2 * pad4), d = type3 === Log ? zoomLog(domain4, null, frac) : type3 === Sqrt ? zoomPow(domain4, null, frac, 0.5) : type3 === Pow ? zoomPow(domain4, null, frac, exponent2 || 1) : type3 === Symlog ? zoomSymlog(domain4, null, frac, constant2 || 1) : zoomLinear(domain4, null, frac);
  return domain4 = domain4.slice(), domain4[0] = d[0], domain4[domain4.length - 1] = d[1], domain4;
}
function domainCheck(type3, domain4, df) {
  if (isLogarithmic(type3)) {
    var s = Math.abs(domain4.reduce((s2, v2) => s2 + (v2 < 0 ? -1 : v2 > 0 ? 1 : 0), 0));
    s !== domain4.length && df.warn("Log scale domain includes zero: " + stringValue(domain4));
  }
  return domain4;
}
function configureBins(scale7, _, count4) {
  let bins2 = _.bins;
  if (bins2 && !isArray(bins2)) {
    let domain4 = scale7.domain(), lo = domain4[0], hi = peek(domain4), step = bins2.step, start = bins2.start == null ? lo : bins2.start, stop2 = bins2.stop == null ? hi : bins2.stop;
    step || error62("Scale bins parameter missing step property."), start < lo && (start = step * Math.ceil(lo / step)), stop2 > hi && (stop2 = step * Math.floor(hi / step)), bins2 = range2(start, stop2 + step / 2, step);
  }
  return bins2 ? scale7.bins = bins2 : scale7.bins && delete scale7.bins, scale7.type === BinOrdinal && (bins2 ? !_.domain && !_.domainRaw && (scale7.domain(bins2), count4 = bins2.length) : scale7.bins = scale7.domain()), count4;
}
function configureRange(scale7, _, count4) {
  var type3 = scale7.type, round2 = _.round || !1, range7 = _.range;
  if (_.rangeStep != null)
    range7 = configureRangeStep(type3, _, count4);
  else if (_.scheme && (range7 = configureScheme(type3, _, count4), isFunction(range7))) {
    if (scale7.interpolator)
      return scale7.interpolator(range7);
    error62(`Scale type ${type3} does not support interpolating color schemes.`);
  }
  if (range7 && isInterpolating(type3))
    return scale7.interpolator(interpolateColors(flip(range7, _.reverse), _.interpolate, _.interpolateGamma));
  range7 && _.interpolate && scale7.interpolate ? scale7.interpolate(interpolate(_.interpolate, _.interpolateGamma)) : isFunction(scale7.round) ? scale7.round(round2) : isFunction(scale7.rangeRound) && scale7.interpolate(round2 ? round_default : value_default), range7 && scale7.range(flip(range7, _.reverse));
}
function configureRangeStep(type3, _, count4) {
  type3 !== Band && type3 !== Point && error62("Only band and point scales support rangeStep.");
  var outer = (_.paddingOuter != null ? _.paddingOuter : _.padding) || 0, inner = type3 === Point ? 1 : (_.paddingInner != null ? _.paddingInner : _.padding) || 0;
  return [0, _.rangeStep * bandSpace(count4, inner, outer)];
}
function configureScheme(type3, _, count4) {
  var extent2 = _.schemeExtent, name2, scheme$1;
  return isArray(_.scheme) ? scheme$1 = interpolateColors(_.scheme, _.interpolate, _.interpolateGamma) : (name2 = _.scheme.toLowerCase(), scheme$1 = scheme(name2), scheme$1 || error62(`Unrecognized scheme name: ${_.scheme}`)), count4 = type3 === Threshold ? count4 + 1 : type3 === BinOrdinal ? count4 - 1 : type3 === Ordinal ? +_.schemeCount || count4 || DEFAULT_COUNT : type3 === Quantile2 || type3 === Quantize ? +_.schemeCount || DEFAULT_COUNT : count4, isInterpolating(type3) ? adjustScheme(scheme$1, extent2, _.reverse) : isFunction(scheme$1) ? quantizeInterpolator(adjustScheme(scheme$1, extent2), count4) : type3 === Ordinal ? scheme$1 : scheme$1.slice(0, count4);
}
function adjustScheme(scheme3, extent2, reverse3) {
  return isFunction(scheme3) && (extent2 || reverse3) ? interpolateRange(scheme3, flip(extent2 || [0, 1], reverse3)) : scheme3;
}
function flip(array4, reverse3) {
  return reverse3 ? array4.slice().reverse() : array4;
}
function SortItems(params2) {
  Transform.call(this, null, params2);
}
inherits_default(SortItems, Transform, {
  transform(_, pulse2) {
    let mod = _.modified("sort") || pulse2.changed(pulse2.ADD) || pulse2.modified(_.sort.fields) || pulse2.modified("datum");
    return mod && pulse2.source.sort(stableCompare(_.sort)), this.modified(mod), pulse2;
  }
});
var Zero = "zero", Center = "center", Normalize = "normalize", DefOutput = ["y0", "y1"];
function Stack(params2) {
  Transform.call(this, null, params2);
}
Stack.Definition = {
  type: "Stack",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "sort",
    type: "compare"
  }, {
    name: "offset",
    type: "enum",
    default: Zero,
    values: [Zero, Center, Normalize]
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: DefOutput
  }]
};
inherits_default(Stack, Transform, {
  transform(_, pulse2) {
    var as = _.as || DefOutput, y06 = as[0], y12 = as[1], sort3 = stableCompare(_.sort), field3 = _.field || one, stack2 = _.offset === Center ? stackCenter : _.offset === Normalize ? stackNormalize : stackZero, groups, i, n, max4;
    for (groups = partition2(pulse2.source, _.groupby, sort3, field3), i = 0, n = groups.length, max4 = groups.max; i < n; ++i)
      stack2(groups[i], max4, field3, y06, y12);
    return pulse2.reflow(_.modified()).modifies(as);
  }
});
function stackCenter(group2, max4, field3, y06, y12) {
  for (var last = (max4 - group2.sum) / 2, m = group2.length, j2 = 0, t; j2 < m; ++j2)
    t = group2[j2], t[y06] = last, t[y12] = last += Math.abs(field3(t));
}
function stackNormalize(group2, max4, field3, y06, y12) {
  for (var scale7 = 1 / group2.sum, last = 0, m = group2.length, j2 = 0, v2 = 0, t; j2 < m; ++j2)
    t = group2[j2], t[y06] = last, t[y12] = last = scale7 * (v2 += Math.abs(field3(t)));
}
function stackZero(group2, max4, field3, y06, y12) {
  for (var lastPos = 0, lastNeg = 0, m = group2.length, j2 = 0, v2, t; j2 < m; ++j2)
    t = group2[j2], v2 = +field3(t), v2 < 0 ? (t[y06] = lastNeg, t[y12] = lastNeg += v2) : (t[y06] = lastPos, t[y12] = lastPos += v2);
}
function partition2(data3, groupby, sort3, field3) {
  var groups = [], get6 = (f) => f(t), map4, i, n, m, t, k, g, s, max4;
  if (groupby == null)
    groups.push(data3.slice());
  else
    for (map4 = {}, i = 0, n = data3.length; i < n; ++i)
      t = data3[i], k = JSON.stringify(groupby.map(get6)), g = map4[k], g || (map4[k] = g = [], groups.push(g)), g.push(t);
  for (k = 0, max4 = 0, m = groups.length; k < m; ++k) {
    for (g = groups[k], i = 0, s = 0, n = g.length; i < n; ++i)
      s += Math.abs(field3(g[i]));
    g.sum = s, s > max4 && (max4 = s), sort3 && g.sort(sort3);
  }
  return groups.max = max4, groups;
}

// node_modules/vega-geo/build/vega-geo.js
var vega_geo_exports = {};
__export(vega_geo_exports, {
  contour: () => Contour,
  geojson: () => GeoJSON,
  geopath: () => GeoPath,
  geopoint: () => GeoPoint,
  geoshape: () => GeoShape,
  graticule: () => Graticule,
  heatmap: () => Heatmap,
  isocontour: () => Isocontour,
  kde2d: () => KDE2D,
  projection: () => Projection
});

// node_modules/d3-geo/src/math.js
var epsilon4 = 1e-6, epsilon23 = 1e-12, pi3 = Math.PI, halfPi2 = pi3 / 2, quarterPi = pi3 / 4, tau3 = pi3 * 2, degrees3 = 180 / pi3, radians2 = pi3 / 180, abs2 = Math.abs, atan = Math.atan, atan22 = Math.atan2, cos2 = Math.cos, ceil = Math.ceil, exp3 = Math.exp;
var hypot = Math.hypot, log5 = Math.log, pow4 = Math.pow, sin2 = Math.sin, sign2 = Math.sign || function(x5) {
  return x5 > 0 ? 1 : x5 < 0 ? -1 : 0;
}, sqrt3 = Math.sqrt, tan = Math.tan;
function acos2(x5) {
  return x5 > 1 ? 0 : x5 < -1 ? pi3 : Math.acos(x5);
}
function asin2(x5) {
  return x5 > 1 ? halfPi2 : x5 < -1 ? -halfPi2 : Math.asin(x5);
}

// node_modules/d3-geo/src/noop.js
function noop2() {
}

// node_modules/d3-geo/src/stream.js
function streamGeometry(geometry, stream2) {
  geometry && streamGeometryType.hasOwnProperty(geometry.type) && streamGeometryType[geometry.type](geometry, stream2);
}
var streamObjectType = {
  Feature: function(object4, stream2) {
    streamGeometry(object4.geometry, stream2);
  },
  FeatureCollection: function(object4, stream2) {
    for (var features = object4.features, i = -1, n = features.length; ++i < n; ) streamGeometry(features[i].geometry, stream2);
  }
}, streamGeometryType = {
  Sphere: function(object4, stream2) {
    stream2.sphere();
  },
  Point: function(object4, stream2) {
    object4 = object4.coordinates, stream2.point(object4[0], object4[1], object4[2]);
  },
  MultiPoint: function(object4, stream2) {
    for (var coordinates = object4.coordinates, i = -1, n = coordinates.length; ++i < n; ) object4 = coordinates[i], stream2.point(object4[0], object4[1], object4[2]);
  },
  LineString: function(object4, stream2) {
    streamLine(object4.coordinates, stream2, 0);
  },
  MultiLineString: function(object4, stream2) {
    for (var coordinates = object4.coordinates, i = -1, n = coordinates.length; ++i < n; ) streamLine(coordinates[i], stream2, 0);
  },
  Polygon: function(object4, stream2) {
    streamPolygon(object4.coordinates, stream2);
  },
  MultiPolygon: function(object4, stream2) {
    for (var coordinates = object4.coordinates, i = -1, n = coordinates.length; ++i < n; ) streamPolygon(coordinates[i], stream2);
  },
  GeometryCollection: function(object4, stream2) {
    for (var geometries = object4.geometries, i = -1, n = geometries.length; ++i < n; ) streamGeometry(geometries[i], stream2);
  }
};
function streamLine(coordinates, stream2, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  for (stream2.lineStart(); ++i < n; ) coordinate = coordinates[i], stream2.point(coordinate[0], coordinate[1], coordinate[2]);
  stream2.lineEnd();
}
function streamPolygon(coordinates, stream2) {
  var i = -1, n = coordinates.length;
  for (stream2.polygonStart(); ++i < n; ) streamLine(coordinates[i], stream2, 1);
  stream2.polygonEnd();
}
function stream_default(object4, stream2) {
  object4 && streamObjectType.hasOwnProperty(object4.type) ? streamObjectType[object4.type](object4, stream2) : streamGeometry(object4, stream2);
}

// node_modules/d3-geo/src/area.js
var areaRingSum = new Adder(), areaSum = new Adder(), lambda00, phi00, lambda0, cosPhi0, sinPhi0, areaStream = {
  point: noop2,
  lineStart: noop2,
  lineEnd: noop2,
  polygonStart: function() {
    areaRingSum = new Adder(), areaStream.lineStart = areaRingStart, areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? tau3 + areaRing : areaRing), this.lineStart = this.lineEnd = this.point = noop2;
  },
  sphere: function() {
    areaSum.add(tau3);
  }
};
function areaRingStart() {
  areaStream.point = areaPointFirst;
}
function areaRingEnd() {
  areaPoint(lambda00, phi00);
}
function areaPointFirst(lambda, phi2) {
  areaStream.point = areaPoint, lambda00 = lambda, phi00 = phi2, lambda *= radians2, phi2 *= radians2, lambda0 = lambda, cosPhi0 = cos2(phi2 = phi2 / 2 + quarterPi), sinPhi0 = sin2(phi2);
}
function areaPoint(lambda, phi2) {
  lambda *= radians2, phi2 *= radians2, phi2 = phi2 / 2 + quarterPi;
  var dLambda = lambda - lambda0, sdLambda = dLambda >= 0 ? 1 : -1, adLambda = sdLambda * dLambda, cosPhi = cos2(phi2), sinPhi = sin2(phi2), k = sinPhi0 * sinPhi, u4 = cosPhi0 * cosPhi + k * cos2(adLambda), v2 = k * sdLambda * sin2(adLambda);
  areaRingSum.add(atan22(v2, u4)), lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}
function area_default2(object4) {
  return areaSum = new Adder(), stream_default(object4, areaStream), areaSum * 2;
}

// node_modules/d3-geo/src/cartesian.js
function spherical(cartesian2) {
  return [atan22(cartesian2[1], cartesian2[0]), asin2(cartesian2[2])];
}
function cartesian(spherical2) {
  var lambda = spherical2[0], phi2 = spherical2[1], cosPhi = cos2(phi2);
  return [cosPhi * cos2(lambda), cosPhi * sin2(lambda), sin2(phi2)];
}
function cartesianDot(a, b10) {
  return a[0] * b10[0] + a[1] * b10[1] + a[2] * b10[2];
}
function cartesianCross(a, b10) {
  return [a[1] * b10[2] - a[2] * b10[1], a[2] * b10[0] - a[0] * b10[2], a[0] * b10[1] - a[1] * b10[0]];
}
function cartesianAddInPlace(a, b10) {
  a[0] += b10[0], a[1] += b10[1], a[2] += b10[2];
}
function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}
function cartesianNormalizeInPlace(d) {
  var l = sqrt3(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

// node_modules/d3-geo/src/bounds.js
var lambda02, phi0, lambda1, phi1, lambda2, lambda002, phi002, p0, deltaSum, ranges, range3, boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint, boundsStream.lineStart = boundsRingStart, boundsStream.lineEnd = boundsRingEnd, deltaSum = new Adder(), areaStream.polygonStart();
  },
  polygonEnd: function() {
    areaStream.polygonEnd(), boundsStream.point = boundsPoint, boundsStream.lineStart = boundsLineStart, boundsStream.lineEnd = boundsLineEnd, areaRingSum < 0 ? (lambda02 = -(lambda1 = 180), phi0 = -(phi1 = 90)) : deltaSum > epsilon4 ? phi1 = 90 : deltaSum < -epsilon4 && (phi0 = -90), range3[0] = lambda02, range3[1] = lambda1;
  },
  sphere: function() {
    lambda02 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};
function boundsPoint(lambda, phi2) {
  ranges.push(range3 = [lambda02 = lambda, lambda1 = lambda]), phi2 < phi0 && (phi0 = phi2), phi2 > phi1 && (phi1 = phi2);
}
function linePoint(lambda, phi2) {
  var p = cartesian([lambda * radians2, phi2 * radians2]);
  if (p0) {
    var normal = cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = cartesianCross(equatorial, normal);
    cartesianNormalizeInPlace(inflection), inflection = spherical(inflection);
    var delta = lambda - lambda2, sign3 = delta > 0 ? 1 : -1, lambdai = inflection[0] * degrees3 * sign3, phii, antimeridian = abs2(delta) > 180;
    antimeridian ^ (sign3 * lambda2 < lambdai && lambdai < sign3 * lambda) ? (phii = inflection[1] * degrees3, phii > phi1 && (phi1 = phii)) : (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign3 * lambda2 < lambdai && lambdai < sign3 * lambda) ? (phii = -inflection[1] * degrees3, phii < phi0 && (phi0 = phii)) : (phi2 < phi0 && (phi0 = phi2), phi2 > phi1 && (phi1 = phi2))), antimeridian ? lambda < lambda2 ? angle(lambda02, lambda) > angle(lambda02, lambda1) && (lambda1 = lambda) : angle(lambda, lambda1) > angle(lambda02, lambda1) && (lambda02 = lambda) : lambda1 >= lambda02 ? (lambda < lambda02 && (lambda02 = lambda), lambda > lambda1 && (lambda1 = lambda)) : lambda > lambda2 ? angle(lambda02, lambda) > angle(lambda02, lambda1) && (lambda1 = lambda) : angle(lambda, lambda1) > angle(lambda02, lambda1) && (lambda02 = lambda);
  } else
    ranges.push(range3 = [lambda02 = lambda, lambda1 = lambda]);
  phi2 < phi0 && (phi0 = phi2), phi2 > phi1 && (phi1 = phi2), p0 = p, lambda2 = lambda;
}
function boundsLineStart() {
  boundsStream.point = linePoint;
}
function boundsLineEnd() {
  range3[0] = lambda02, range3[1] = lambda1, boundsStream.point = boundsPoint, p0 = null;
}
function boundsRingPoint(lambda, phi2) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(abs2(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else
    lambda002 = lambda, phi002 = phi2;
  areaStream.point(lambda, phi2), linePoint(lambda, phi2);
}
function boundsRingStart() {
  areaStream.lineStart();
}
function boundsRingEnd() {
  boundsRingPoint(lambda002, phi002), areaStream.lineEnd(), abs2(deltaSum) > epsilon4 && (lambda02 = -(lambda1 = 180)), range3[0] = lambda02, range3[1] = lambda1, p0 = null;
}
function angle(lambda03, lambda12) {
  return (lambda12 -= lambda03) < 0 ? lambda12 + 360 : lambda12;
}
function rangeCompare(a, b10) {
  return a[0] - b10[0];
}
function rangeContains(range7, x5) {
  return range7[0] <= range7[1] ? range7[0] <= x5 && x5 <= range7[1] : x5 < range7[0] || range7[1] < x5;
}
function bounds_default(feature2) {
  var i, n, a, b10, merged, deltaMax, delta;
  if (phi1 = lambda1 = -(lambda02 = phi0 = 1 / 0), ranges = [], stream_default(feature2, boundsStream), n = ranges.length) {
    for (ranges.sort(rangeCompare), i = 1, a = ranges[0], merged = [a]; i < n; ++i)
      b10 = ranges[i], rangeContains(a, b10[0]) || rangeContains(a, b10[1]) ? (angle(a[0], b10[1]) > angle(a[0], a[1]) && (a[1] = b10[1]), angle(b10[0], a[1]) > angle(a[0], a[1]) && (a[0] = b10[0])) : merged.push(a = b10);
    for (deltaMax = -1 / 0, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b10, ++i)
      b10 = merged[i], (delta = angle(a[1], b10[0])) > deltaMax && (deltaMax = delta, lambda02 = b10[0], lambda1 = a[1]);
  }
  return ranges = range3 = null, lambda02 === 1 / 0 || phi0 === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[lambda02, phi0], [lambda1, phi1]];
}

// node_modules/d3-geo/src/centroid.js
var W0, W1, X0, Y0, Z0, X1, Y1, Z1, X2, Y2, Z2, lambda003, phi003, x0, y0, z0, centroidStream = {
  sphere: noop2,
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart, centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart, centroidStream.lineEnd = centroidLineEnd;
  }
};
function centroidPoint(lambda, phi2) {
  lambda *= radians2, phi2 *= radians2;
  var cosPhi = cos2(phi2);
  centroidPointCartesian(cosPhi * cos2(lambda), cosPhi * sin2(lambda), sin2(phi2));
}
function centroidPointCartesian(x5, y5, z2) {
  ++W0, X0 += (x5 - X0) / W0, Y0 += (y5 - Y0) / W0, Z0 += (z2 - Z0) / W0;
}
function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}
function centroidLinePointFirst(lambda, phi2) {
  lambda *= radians2, phi2 *= radians2;
  var cosPhi = cos2(phi2);
  x0 = cosPhi * cos2(lambda), y0 = cosPhi * sin2(lambda), z0 = sin2(phi2), centroidStream.point = centroidLinePoint, centroidPointCartesian(x0, y0, z0);
}
function centroidLinePoint(lambda, phi2) {
  lambda *= radians2, phi2 *= radians2;
  var cosPhi = cos2(phi2), x5 = cosPhi * cos2(lambda), y5 = cosPhi * sin2(lambda), z2 = sin2(phi2), w2 = atan22(sqrt3((w2 = y0 * z2 - z0 * y5) * w2 + (w2 = z0 * x5 - x0 * z2) * w2 + (w2 = x0 * y5 - y0 * x5) * w2), x0 * x5 + y0 * y5 + z0 * z2);
  W1 += w2, X1 += w2 * (x0 + (x0 = x5)), Y1 += w2 * (y0 + (y0 = y5)), Z1 += w2 * (z0 + (z0 = z2)), centroidPointCartesian(x0, y0, z0);
}
function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}
function centroidRingEnd() {
  centroidRingPoint(lambda003, phi003), centroidStream.point = centroidPoint;
}
function centroidRingPointFirst(lambda, phi2) {
  lambda003 = lambda, phi003 = phi2, lambda *= radians2, phi2 *= radians2, centroidStream.point = centroidRingPoint;
  var cosPhi = cos2(phi2);
  x0 = cosPhi * cos2(lambda), y0 = cosPhi * sin2(lambda), z0 = sin2(phi2), centroidPointCartesian(x0, y0, z0);
}
function centroidRingPoint(lambda, phi2) {
  lambda *= radians2, phi2 *= radians2;
  var cosPhi = cos2(phi2), x5 = cosPhi * cos2(lambda), y5 = cosPhi * sin2(lambda), z2 = sin2(phi2), cx = y0 * z2 - z0 * y5, cy = z0 * x5 - x0 * z2, cz = x0 * y5 - y0 * x5, m = hypot(cx, cy, cz), w2 = asin2(m), v2 = m && -w2 / m;
  X2.add(v2 * cx), Y2.add(v2 * cy), Z2.add(v2 * cz), W1 += w2, X1 += w2 * (x0 + (x0 = x5)), Y1 += w2 * (y0 + (y0 = y5)), Z1 += w2 * (z0 + (z0 = z2)), centroidPointCartesian(x0, y0, z0);
}
function centroid_default(object4) {
  W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = 0, X2 = new Adder(), Y2 = new Adder(), Z2 = new Adder(), stream_default(object4, centroidStream);
  var x5 = +X2, y5 = +Y2, z2 = +Z2, m = hypot(x5, y5, z2);
  return m < epsilon23 && (x5 = X1, y5 = Y1, z2 = Z1, W1 < epsilon4 && (x5 = X0, y5 = Y0, z2 = Z0), m = hypot(x5, y5, z2), m < epsilon23) ? [NaN, NaN] : [atan22(y5, x5) * degrees3, asin2(z2 / m) * degrees3];
}

// node_modules/d3-geo/src/compose.js
function compose_default(a, b10) {
  function compose(x5, y5) {
    return x5 = a(x5, y5), b10(x5[0], x5[1]);
  }
  return a.invert && b10.invert && (compose.invert = function(x5, y5) {
    return x5 = b10.invert(x5, y5), x5 && a.invert(x5[0], x5[1]);
  }), compose;
}

// node_modules/d3-geo/src/rotation.js
function rotationIdentity(lambda, phi2) {
  return abs2(lambda) > pi3 && (lambda -= Math.round(lambda / tau3) * tau3), [lambda, phi2];
}
rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau3) ? deltaPhi || deltaGamma ? compose_default(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}
function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi2) {
    return lambda += deltaLambda, abs2(lambda) > pi3 && (lambda -= Math.round(lambda / tau3) * tau3), [lambda, phi2];
  };
}
function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  return rotation.invert = forwardRotationLambda(-deltaLambda), rotation;
}
function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos2(deltaPhi), sinDeltaPhi = sin2(deltaPhi), cosDeltaGamma = cos2(deltaGamma), sinDeltaGamma = sin2(deltaGamma);
  function rotation(lambda, phi2) {
    var cosPhi = cos2(phi2), x5 = cos2(lambda) * cosPhi, y5 = sin2(lambda) * cosPhi, z2 = sin2(phi2), k = z2 * cosDeltaPhi + x5 * sinDeltaPhi;
    return [
      atan22(y5 * cosDeltaGamma - k * sinDeltaGamma, x5 * cosDeltaPhi - z2 * sinDeltaPhi),
      asin2(k * cosDeltaGamma + y5 * sinDeltaGamma)
    ];
  }
  return rotation.invert = function(lambda, phi2) {
    var cosPhi = cos2(phi2), x5 = cos2(lambda) * cosPhi, y5 = sin2(lambda) * cosPhi, z2 = sin2(phi2), k = z2 * cosDeltaGamma - y5 * sinDeltaGamma;
    return [
      atan22(y5 * cosDeltaGamma + z2 * sinDeltaGamma, x5 * cosDeltaPhi + k * sinDeltaPhi),
      asin2(k * cosDeltaPhi - x5 * sinDeltaPhi)
    ];
  }, rotation;
}
function rotation_default(rotate2) {
  rotate2 = rotateRadians(rotate2[0] * radians2, rotate2[1] * radians2, rotate2.length > 2 ? rotate2[2] * radians2 : 0);
  function forward(coordinates) {
    return coordinates = rotate2(coordinates[0] * radians2, coordinates[1] * radians2), coordinates[0] *= degrees3, coordinates[1] *= degrees3, coordinates;
  }
  return forward.invert = function(coordinates) {
    return coordinates = rotate2.invert(coordinates[0] * radians2, coordinates[1] * radians2), coordinates[0] *= degrees3, coordinates[1] *= degrees3, coordinates;
  }, forward;
}

// node_modules/d3-geo/src/circle.js
function circleStream(stream2, radius2, delta, direction, t04, t13) {
  if (delta) {
    var cosRadius = cos2(radius2), sinRadius = sin2(radius2), step = direction * delta;
    t04 == null ? (t04 = radius2 + direction * tau3, t13 = radius2 - step / 2) : (t04 = circleRadius(cosRadius, t04), t13 = circleRadius(cosRadius, t13), (direction > 0 ? t04 < t13 : t04 > t13) && (t04 += direction * tau3));
    for (var point8, t = t04; direction > 0 ? t > t13 : t < t13; t -= step)
      point8 = spherical([cosRadius, -sinRadius * cos2(t), -sinRadius * sin2(t)]), stream2.point(point8[0], point8[1]);
  }
}
function circleRadius(cosRadius, point8) {
  point8 = cartesian(point8), point8[0] -= cosRadius, cartesianNormalizeInPlace(point8);
  var radius2 = acos2(-point8[1]);
  return ((-point8[2] < 0 ? -radius2 : radius2) + tau3 - epsilon4) % tau3;
}

// node_modules/d3-geo/src/clip/buffer.js
function buffer_default() {
  var lines = [], line4;
  return {
    point: function(x5, y5, m) {
      line4.push([x5, y5, m]);
    },
    lineStart: function() {
      lines.push(line4 = []);
    },
    lineEnd: noop2,
    rejoin: function() {
      lines.length > 1 && lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      return lines = [], line4 = null, result;
    }
  };
}

// node_modules/d3-geo/src/pointEqual.js
function pointEqual_default(a, b10) {
  return abs2(a[0] - b10[0]) < epsilon4 && abs2(a[1] - b10[1]) < epsilon4;
}

// node_modules/d3-geo/src/clip/rejoin.js
function Intersection(point8, points2, other, entry2) {
  this.x = point8, this.z = points2, this.o = other, this.e = entry2, this.v = !1, this.n = this.p = null;
}
function rejoin_default(segments2, compareIntersection2, startInside, interpolate3, stream2) {
  var subject = [], clip4 = [], i, n;
  if (segments2.forEach(function(segment) {
    if (!((n2 = segment.length - 1) <= 0)) {
      var n2, p02 = segment[0], p1 = segment[n2], x5;
      if (pointEqual_default(p02, p1)) {
        if (!p02[2] && !p1[2]) {
          for (stream2.lineStart(), i = 0; i < n2; ++i) stream2.point((p02 = segment[i])[0], p02[1]);
          stream2.lineEnd();
          return;
        }
        p1[0] += 2 * epsilon4;
      }
      subject.push(x5 = new Intersection(p02, segment, null, !0)), clip4.push(x5.o = new Intersection(p02, null, x5, !1)), subject.push(x5 = new Intersection(p1, segment, null, !1)), clip4.push(x5.o = new Intersection(p1, null, x5, !0));
    }
  }), !!subject.length) {
    for (clip4.sort(compareIntersection2), link(subject), link(clip4), i = 0, n = clip4.length; i < n; ++i)
      clip4[i].e = startInside = !startInside;
    for (var start = subject[0], points2, point8; ; ) {
      for (var current2 = start, isSubject = !0; current2.v; ) if ((current2 = current2.n) === start) return;
      points2 = current2.z, stream2.lineStart();
      do {
        if (current2.v = current2.o.v = !0, current2.e) {
          if (isSubject)
            for (i = 0, n = points2.length; i < n; ++i) stream2.point((point8 = points2[i])[0], point8[1]);
          else
            interpolate3(current2.x, current2.n.x, 1, stream2);
          current2 = current2.n;
        } else {
          if (isSubject)
            for (points2 = current2.p.z, i = points2.length - 1; i >= 0; --i) stream2.point((point8 = points2[i])[0], point8[1]);
          else
            interpolate3(current2.x, current2.p.x, -1, stream2);
          current2 = current2.p;
        }
        current2 = current2.o, points2 = current2.z, isSubject = !isSubject;
      } while (!current2.v);
      stream2.lineEnd();
    }
  }
}
function link(array4) {
  if (n = array4.length) {
    for (var n, i = 0, a = array4[0], b10; ++i < n; )
      a.n = b10 = array4[i], b10.p = a, a = b10;
    a.n = b10 = array4[0], b10.p = a;
  }
}

// node_modules/d3-geo/src/polygonContains.js
function longitude(point8) {
  return abs2(point8[0]) <= pi3 ? point8[0] : sign2(point8[0]) * ((abs2(point8[0]) + pi3) % tau3 - pi3);
}
function polygonContains_default(polygon, point8) {
  var lambda = longitude(point8), phi2 = point8[1], sinPhi = sin2(phi2), normal = [sin2(lambda), -cos2(lambda), 0], angle2 = 0, winding = 0, sum3 = new Adder();
  sinPhi === 1 ? phi2 = halfPi2 + epsilon4 : sinPhi === -1 && (phi2 = -halfPi2 - epsilon4);
  for (var i = 0, n = polygon.length; i < n; ++i)
    if (m = (ring = polygon[i]).length)
      for (var ring, m, point0 = ring[m - 1], lambda03 = longitude(point0), phi02 = point0[1] / 2 + quarterPi, sinPhi02 = sin2(phi02), cosPhi02 = cos2(phi02), j2 = 0; j2 < m; ++j2, lambda03 = lambda12, sinPhi02 = sinPhi1, cosPhi02 = cosPhi1, point0 = point1) {
        var point1 = ring[j2], lambda12 = longitude(point1), phi12 = point1[1] / 2 + quarterPi, sinPhi1 = sin2(phi12), cosPhi1 = cos2(phi12), delta = lambda12 - lambda03, sign3 = delta >= 0 ? 1 : -1, absDelta = sign3 * delta, antimeridian = absDelta > pi3, k = sinPhi02 * sinPhi1;
        if (sum3.add(atan22(k * sign3 * sin2(absDelta), cosPhi02 * cosPhi1 + k * cos2(absDelta))), angle2 += antimeridian ? delta + sign3 * tau3 : delta, antimeridian ^ lambda03 >= lambda ^ lambda12 >= lambda) {
          var arc4 = cartesianCross(cartesian(point0), cartesian(point1));
          cartesianNormalizeInPlace(arc4);
          var intersection3 = cartesianCross(normal, arc4);
          cartesianNormalizeInPlace(intersection3);
          var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin2(intersection3[2]);
          (phi2 > phiArc || phi2 === phiArc && (arc4[0] || arc4[1])) && (winding += antimeridian ^ delta >= 0 ? 1 : -1);
        }
      }
  return (angle2 < -epsilon4 || angle2 < epsilon4 && sum3 < -epsilon23) ^ winding & 1;
}

// node_modules/d3-geo/src/clip/index.js
function clip_default(pointVisible, clipLine, interpolate3, start) {
  return function(sink) {
    var line4 = clipLine(sink), ringBuffer = buffer_default(), ringSink = clipLine(ringBuffer), polygonStarted = !1, polygon, segments2, ring, clip4 = {
      point: point8,
      lineStart,
      lineEnd,
      polygonStart: function() {
        clip4.point = pointRing, clip4.lineStart = ringStart, clip4.lineEnd = ringEnd, segments2 = [], polygon = [];
      },
      polygonEnd: function() {
        clip4.point = point8, clip4.lineStart = lineStart, clip4.lineEnd = lineEnd, segments2 = merge3(segments2);
        var startInside = polygonContains_default(polygon, start);
        segments2.length ? (polygonStarted || (sink.polygonStart(), polygonStarted = !0), rejoin_default(segments2, compareIntersection, startInside, interpolate3, sink)) : startInside && (polygonStarted || (sink.polygonStart(), polygonStarted = !0), sink.lineStart(), interpolate3(null, null, 1, sink), sink.lineEnd()), polygonStarted && (sink.polygonEnd(), polygonStarted = !1), segments2 = polygon = null;
      },
      sphere: function() {
        sink.polygonStart(), sink.lineStart(), interpolate3(null, null, 1, sink), sink.lineEnd(), sink.polygonEnd();
      }
    };
    function point8(lambda, phi2) {
      pointVisible(lambda, phi2) && sink.point(lambda, phi2);
    }
    function pointLine(lambda, phi2) {
      line4.point(lambda, phi2);
    }
    function lineStart() {
      clip4.point = pointLine, line4.lineStart();
    }
    function lineEnd() {
      clip4.point = point8, line4.lineEnd();
    }
    function pointRing(lambda, phi2) {
      ring.push([lambda, phi2]), ringSink.point(lambda, phi2);
    }
    function ringStart() {
      ringSink.lineStart(), ring = [];
    }
    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]), ringSink.lineEnd();
      var clean2 = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point9;
      if (ring.pop(), polygon.push(ring), ring = null, !!n) {
        if (clean2 & 1) {
          if (segment = ringSegments[0], (m = segment.length - 1) > 0) {
            for (polygonStarted || (sink.polygonStart(), polygonStarted = !0), sink.lineStart(), i = 0; i < m; ++i) sink.point((point9 = segment[i])[0], point9[1]);
            sink.lineEnd();
          }
          return;
        }
        n > 1 && clean2 & 2 && ringSegments.push(ringSegments.pop().concat(ringSegments.shift())), segments2.push(ringSegments.filter(validSegment));
      }
    }
    return clip4;
  };
}
function validSegment(segment) {
  return segment.length > 1;
}
function compareIntersection(a, b10) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi2 - epsilon4 : halfPi2 - a[1]) - ((b10 = b10.x)[0] < 0 ? b10[1] - halfPi2 - epsilon4 : halfPi2 - b10[1]);
}

// node_modules/d3-geo/src/clip/antimeridian.js
var antimeridian_default = clip_default(
  function() {
    return !0;
  },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi3, -halfPi2]
);
function clipAntimeridianLine(stream2) {
  var lambda03 = NaN, phi02 = NaN, sign0 = NaN, clean2;
  return {
    lineStart: function() {
      stream2.lineStart(), clean2 = 1;
    },
    point: function(lambda12, phi12) {
      var sign1 = lambda12 > 0 ? pi3 : -pi3, delta = abs2(lambda12 - lambda03);
      abs2(delta - pi3) < epsilon4 ? (stream2.point(lambda03, phi02 = (phi02 + phi12) / 2 > 0 ? halfPi2 : -halfPi2), stream2.point(sign0, phi02), stream2.lineEnd(), stream2.lineStart(), stream2.point(sign1, phi02), stream2.point(lambda12, phi02), clean2 = 0) : sign0 !== sign1 && delta >= pi3 && (abs2(lambda03 - sign0) < epsilon4 && (lambda03 -= sign0 * epsilon4), abs2(lambda12 - sign1) < epsilon4 && (lambda12 -= sign1 * epsilon4), phi02 = clipAntimeridianIntersect(lambda03, phi02, lambda12, phi12), stream2.point(sign0, phi02), stream2.lineEnd(), stream2.lineStart(), stream2.point(sign1, phi02), clean2 = 0), stream2.point(lambda03 = lambda12, phi02 = phi12), sign0 = sign1;
    },
    lineEnd: function() {
      stream2.lineEnd(), lambda03 = phi02 = NaN;
    },
    clean: function() {
      return 2 - clean2;
    }
  };
}
function clipAntimeridianIntersect(lambda03, phi02, lambda12, phi12) {
  var cosPhi02, cosPhi1, sinLambda0Lambda1 = sin2(lambda03 - lambda12);
  return abs2(sinLambda0Lambda1) > epsilon4 ? atan((sin2(phi02) * (cosPhi1 = cos2(phi12)) * sin2(lambda12) - sin2(phi12) * (cosPhi02 = cos2(phi02)) * sin2(lambda03)) / (cosPhi02 * cosPhi1 * sinLambda0Lambda1)) : (phi02 + phi12) / 2;
}
function clipAntimeridianInterpolate(from, to, direction, stream2) {
  var phi2;
  if (from == null)
    phi2 = direction * halfPi2, stream2.point(-pi3, phi2), stream2.point(0, phi2), stream2.point(pi3, phi2), stream2.point(pi3, 0), stream2.point(pi3, -phi2), stream2.point(0, -phi2), stream2.point(-pi3, -phi2), stream2.point(-pi3, 0), stream2.point(-pi3, phi2);
  else if (abs2(from[0] - to[0]) > epsilon4) {
    var lambda = from[0] < to[0] ? pi3 : -pi3;
    phi2 = direction * lambda / 2, stream2.point(-lambda, phi2), stream2.point(0, phi2), stream2.point(lambda, phi2);
  } else
    stream2.point(to[0], to[1]);
}

// node_modules/d3-geo/src/clip/circle.js
function circle_default2(radius2) {
  var cr2 = cos2(radius2), delta = 2 * radians2, smallRadius = cr2 > 0, notHemisphere = abs2(cr2) > epsilon4;
  function interpolate3(from, to, direction, stream2) {
    circleStream(stream2, radius2, delta, direction, from, to);
  }
  function visible(lambda, phi2) {
    return cos2(lambda) * cos2(phi2) > cr2;
  }
  function clipLine(stream2) {
    var point0, c0, v0, v00, clean2;
    return {
      lineStart: function() {
        v00 = v0 = !1, clean2 = 1;
      },
      point: function(lambda, phi2) {
        var point1 = [lambda, phi2], point22, v2 = visible(lambda, phi2), c = smallRadius ? v2 ? 0 : code(lambda, phi2) : v2 ? code(lambda + (lambda < 0 ? pi3 : -pi3), phi2) : 0;
        if (!point0 && (v00 = v0 = v2) && stream2.lineStart(), v2 !== v0 && (point22 = intersect5(point0, point1), (!point22 || pointEqual_default(point0, point22) || pointEqual_default(point1, point22)) && (point1[2] = 1)), v2 !== v0)
          clean2 = 0, v2 ? (stream2.lineStart(), point22 = intersect5(point1, point0), stream2.point(point22[0], point22[1])) : (point22 = intersect5(point0, point1), stream2.point(point22[0], point22[1], 2), stream2.lineEnd()), point0 = point22;
        else if (notHemisphere && point0 && smallRadius ^ v2) {
          var t;
          !(c & c0) && (t = intersect5(point1, point0, !0)) && (clean2 = 0, smallRadius ? (stream2.lineStart(), stream2.point(t[0][0], t[0][1]), stream2.point(t[1][0], t[1][1]), stream2.lineEnd()) : (stream2.point(t[1][0], t[1][1]), stream2.lineEnd(), stream2.lineStart(), stream2.point(t[0][0], t[0][1], 3)));
        }
        v2 && (!point0 || !pointEqual_default(point0, point1)) && stream2.point(point1[0], point1[1]), point0 = point1, v0 = v2, c0 = c;
      },
      lineEnd: function() {
        v0 && stream2.lineEnd(), point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean2 | (v00 && v0) << 1;
      }
    };
  }
  function intersect5(a, b10, two) {
    var pa2 = cartesian(a), pb = cartesian(b10), n1 = [1, 0, 0], n2 = cartesianCross(pa2, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
    if (!determinant) return !two && a;
    var c1 = cr2 * n2n2 / determinant, c2 = -cr2 * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A5 = cartesianScale(n1, c1), B3 = cartesianScale(n2, c2);
    cartesianAddInPlace(A5, B3);
    var u4 = n1xn2, w2 = cartesianDot(A5, u4), uu = cartesianDot(u4, u4), t22 = w2 * w2 - uu * (cartesianDot(A5, A5) - 1);
    if (!(t22 < 0)) {
      var t = sqrt3(t22), q = cartesianScale(u4, (-w2 - t) / uu);
      if (cartesianAddInPlace(q, A5), q = spherical(q), !two) return q;
      var lambda03 = a[0], lambda12 = b10[0], phi02 = a[1], phi12 = b10[1], z2;
      lambda12 < lambda03 && (z2 = lambda03, lambda03 = lambda12, lambda12 = z2);
      var delta2 = lambda12 - lambda03, polar = abs2(delta2 - pi3) < epsilon4, meridian = polar || delta2 < epsilon4;
      if (!polar && phi12 < phi02 && (z2 = phi02, phi02 = phi12, phi12 = z2), meridian ? polar ? phi02 + phi12 > 0 ^ q[1] < (abs2(q[0] - lambda03) < epsilon4 ? phi02 : phi12) : phi02 <= q[1] && q[1] <= phi12 : delta2 > pi3 ^ (lambda03 <= q[0] && q[0] <= lambda12)) {
        var q1 = cartesianScale(u4, (-w2 + t) / uu);
        return cartesianAddInPlace(q1, A5), [q, spherical(q1)];
      }
    }
  }
  function code(lambda, phi2) {
    var r = smallRadius ? radius2 : pi3 - radius2, code2 = 0;
    return lambda < -r ? code2 |= 1 : lambda > r && (code2 |= 2), phi2 < -r ? code2 |= 4 : phi2 > r && (code2 |= 8), code2;
  }
  return clip_default(visible, clipLine, interpolate3, smallRadius ? [0, -radius2] : [-pi3, radius2 - pi3]);
}

// node_modules/d3-geo/src/clip/line.js
function line_default2(a, b10, x06, y06, x12, y12) {
  var ax = a[0], ay = a[1], bx = b10[0], by = b10[1], t04 = 0, t13 = 1, dx = bx - ax, dy = by - ay, r;
  if (r = x06 - ax, !(!dx && r > 0)) {
    if (r /= dx, dx < 0) {
      if (r < t04) return;
      r < t13 && (t13 = r);
    } else if (dx > 0) {
      if (r > t13) return;
      r > t04 && (t04 = r);
    }
    if (r = x12 - ax, !(!dx && r < 0)) {
      if (r /= dx, dx < 0) {
        if (r > t13) return;
        r > t04 && (t04 = r);
      } else if (dx > 0) {
        if (r < t04) return;
        r < t13 && (t13 = r);
      }
      if (r = y06 - ay, !(!dy && r > 0)) {
        if (r /= dy, dy < 0) {
          if (r < t04) return;
          r < t13 && (t13 = r);
        } else if (dy > 0) {
          if (r > t13) return;
          r > t04 && (t04 = r);
        }
        if (r = y12 - ay, !(!dy && r < 0)) {
          if (r /= dy, dy < 0) {
            if (r > t13) return;
            r > t04 && (t04 = r);
          } else if (dy > 0) {
            if (r < t04) return;
            r < t13 && (t13 = r);
          }
          return t04 > 0 && (a[0] = ax + t04 * dx, a[1] = ay + t04 * dy), t13 < 1 && (b10[0] = ax + t13 * dx, b10[1] = ay + t13 * dy), !0;
        }
      }
    }
  }
}

// node_modules/d3-geo/src/clip/rectangle.js
var clipMax = 1e9, clipMin = -clipMax;
function clipRectangle(x06, y06, x12, y12) {
  function visible(x5, y5) {
    return x06 <= x5 && x5 <= x12 && y06 <= y5 && y5 <= y12;
  }
  function interpolate3(from, to, direction, stream2) {
    var a = 0, a1 = 0;
    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0)
      do
        stream2.point(a === 0 || a === 3 ? x06 : x12, a > 1 ? y12 : y06);
      while ((a = (a + direction + 4) % 4) !== a1);
    else
      stream2.point(to[0], to[1]);
  }
  function corner(p, direction) {
    return abs2(p[0] - x06) < epsilon4 ? direction > 0 ? 0 : 3 : abs2(p[0] - x12) < epsilon4 ? direction > 0 ? 2 : 1 : abs2(p[1] - y06) < epsilon4 ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
  }
  function compareIntersection2(a, b10) {
    return comparePoint(a.x, b10.x);
  }
  function comparePoint(a, b10) {
    var ca3 = corner(a, 1), cb = corner(b10, 1);
    return ca3 !== cb ? ca3 - cb : ca3 === 0 ? b10[1] - a[1] : ca3 === 1 ? a[0] - b10[0] : ca3 === 2 ? a[1] - b10[1] : b10[0] - a[0];
  }
  return function(stream2) {
    var activeStream = stream2, bufferStream = buffer_default(), segments2, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean2, clipStream = {
      point: point8,
      lineStart,
      lineEnd,
      polygonStart,
      polygonEnd
    };
    function point8(x5, y5) {
      visible(x5, y5) && activeStream.point(x5, y5);
    }
    function polygonInside() {
      for (var winding = 0, i = 0, n = polygon.length; i < n; ++i)
        for (var ring2 = polygon[i], j2 = 1, m = ring2.length, point9 = ring2[0], a0, a1, b02 = point9[0], b12 = point9[1]; j2 < m; ++j2)
          a0 = b02, a1 = b12, point9 = ring2[j2], b02 = point9[0], b12 = point9[1], a1 <= y12 ? b12 > y12 && (b02 - a0) * (y12 - a1) > (b12 - a1) * (x06 - a0) && ++winding : b12 <= y12 && (b02 - a0) * (y12 - a1) < (b12 - a1) * (x06 - a0) && --winding;
      return winding;
    }
    function polygonStart() {
      activeStream = bufferStream, segments2 = [], polygon = [], clean2 = !0;
    }
    function polygonEnd() {
      var startInside = polygonInside(), cleanInside = clean2 && startInside, visible2 = (segments2 = merge3(segments2)).length;
      (cleanInside || visible2) && (stream2.polygonStart(), cleanInside && (stream2.lineStart(), interpolate3(null, null, 1, stream2), stream2.lineEnd()), visible2 && rejoin_default(segments2, compareIntersection2, startInside, interpolate3, stream2), stream2.polygonEnd()), activeStream = stream2, segments2 = polygon = ring = null;
    }
    function lineStart() {
      clipStream.point = linePoint2, polygon && polygon.push(ring = []), first = !0, v_ = !1, x_ = y_ = NaN;
    }
    function lineEnd() {
      segments2 && (linePoint2(x__, y__), v__ && v_ && bufferStream.rejoin(), segments2.push(bufferStream.result())), clipStream.point = point8, v_ && activeStream.lineEnd();
    }
    function linePoint2(x5, y5) {
      var v2 = visible(x5, y5);
      if (polygon && ring.push([x5, y5]), first)
        x__ = x5, y__ = y5, v__ = v2, first = !1, v2 && (activeStream.lineStart(), activeStream.point(x5, y5));
      else if (v2 && v_) activeStream.point(x5, y5);
      else {
        var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b10 = [x5 = Math.max(clipMin, Math.min(clipMax, x5)), y5 = Math.max(clipMin, Math.min(clipMax, y5))];
        line_default2(a, b10, x06, y06, x12, y12) ? (v_ || (activeStream.lineStart(), activeStream.point(a[0], a[1])), activeStream.point(b10[0], b10[1]), v2 || activeStream.lineEnd(), clean2 = !1) : v2 && (activeStream.lineStart(), activeStream.point(x5, y5), clean2 = !1);
      }
      x_ = x5, y_ = y5, v_ = v2;
    }
    return clipStream;
  };
}

// node_modules/d3-geo/src/graticule.js
function graticuleX(y06, y12, dy) {
  var y5 = range2(y06, y12 - epsilon4, dy).concat(y12);
  return function(x5) {
    return y5.map(function(y6) {
      return [x5, y6];
    });
  };
}
function graticuleY(x06, x12, dx) {
  var x5 = range2(x06, x12 - epsilon4, dx).concat(x12);
  return function(y5) {
    return x5.map(function(x6) {
      return [x6, y5];
    });
  };
}
function graticule() {
  var x12, x06, X13, X03, y12, y06, Y13, Y03, dx = 10, dy = dx, DX = 90, DY = 360, x5, y5, X4, Y4, precision = 2.5;
  function graticule2() {
    return { type: "MultiLineString", coordinates: lines() };
  }
  function lines() {
    return range2(ceil(X03 / DX) * DX, X13, DX).map(X4).concat(range2(ceil(Y03 / DY) * DY, Y13, DY).map(Y4)).concat(range2(ceil(x06 / dx) * dx, x12, dx).filter(function(x6) {
      return abs2(x6 % DX) > epsilon4;
    }).map(x5)).concat(range2(ceil(y06 / dy) * dy, y12, dy).filter(function(y6) {
      return abs2(y6 % DY) > epsilon4;
    }).map(y5));
  }
  return graticule2.lines = function() {
    return lines().map(function(coordinates) {
      return { type: "LineString", coordinates };
    });
  }, graticule2.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X4(X03).concat(
          Y4(Y13).slice(1),
          X4(X13).reverse().slice(1),
          Y4(Y03).reverse().slice(1)
        )
      ]
    };
  }, graticule2.extent = function(_) {
    return arguments.length ? graticule2.extentMajor(_).extentMinor(_) : graticule2.extentMinor();
  }, graticule2.extentMajor = function(_) {
    return arguments.length ? (X03 = +_[0][0], X13 = +_[1][0], Y03 = +_[0][1], Y13 = +_[1][1], X03 > X13 && (_ = X03, X03 = X13, X13 = _), Y03 > Y13 && (_ = Y03, Y03 = Y13, Y13 = _), graticule2.precision(precision)) : [[X03, Y03], [X13, Y13]];
  }, graticule2.extentMinor = function(_) {
    return arguments.length ? (x06 = +_[0][0], x12 = +_[1][0], y06 = +_[0][1], y12 = +_[1][1], x06 > x12 && (_ = x06, x06 = x12, x12 = _), y06 > y12 && (_ = y06, y06 = y12, y12 = _), graticule2.precision(precision)) : [[x06, y06], [x12, y12]];
  }, graticule2.step = function(_) {
    return arguments.length ? graticule2.stepMajor(_).stepMinor(_) : graticule2.stepMinor();
  }, graticule2.stepMajor = function(_) {
    return arguments.length ? (DX = +_[0], DY = +_[1], graticule2) : [DX, DY];
  }, graticule2.stepMinor = function(_) {
    return arguments.length ? (dx = +_[0], dy = +_[1], graticule2) : [dx, dy];
  }, graticule2.precision = function(_) {
    return arguments.length ? (precision = +_, x5 = graticuleX(y06, y12, 90), y5 = graticuleY(x06, x12, precision), X4 = graticuleX(Y03, Y13, 90), Y4 = graticuleY(X03, X13, precision), graticule2) : precision;
  }, graticule2.extentMajor([[-180, -90 + epsilon4], [180, 90 - epsilon4]]).extentMinor([[-180, -80 - epsilon4], [180, 80 + epsilon4]]);
}

// node_modules/d3-geo/src/identity.js
var identity_default2 = (x5) => x5;

// node_modules/d3-geo/src/path/area.js
var areaSum2 = new Adder(), areaRingSum2 = new Adder(), x00, y00, x02, y02, areaStream2 = {
  point: noop2,
  lineStart: noop2,
  lineEnd: noop2,
  polygonStart: function() {
    areaStream2.lineStart = areaRingStart2, areaStream2.lineEnd = areaRingEnd2;
  },
  polygonEnd: function() {
    areaStream2.lineStart = areaStream2.lineEnd = areaStream2.point = noop2, areaSum2.add(abs2(areaRingSum2)), areaRingSum2 = new Adder();
  },
  result: function() {
    var area4 = areaSum2 / 2;
    return areaSum2 = new Adder(), area4;
  }
};
function areaRingStart2() {
  areaStream2.point = areaPointFirst2;
}
function areaPointFirst2(x5, y5) {
  areaStream2.point = areaPoint2, x00 = x02 = x5, y00 = y02 = y5;
}
function areaPoint2(x5, y5) {
  areaRingSum2.add(y02 * x5 - x02 * y5), x02 = x5, y02 = y5;
}
function areaRingEnd2() {
  areaPoint2(x00, y00);
}
var area_default3 = areaStream2;

// node_modules/d3-geo/src/path/bounds.js
var x03 = 1 / 0, y03 = x03, x1 = -x03, y1 = x1, boundsStream2 = {
  point: boundsPoint2,
  lineStart: noop2,
  lineEnd: noop2,
  polygonStart: noop2,
  polygonEnd: noop2,
  result: function() {
    var bounds2 = [[x03, y03], [x1, y1]];
    return x1 = y1 = -(y03 = x03 = 1 / 0), bounds2;
  }
};
function boundsPoint2(x5, y5) {
  x5 < x03 && (x03 = x5), x5 > x1 && (x1 = x5), y5 < y03 && (y03 = y5), y5 > y1 && (y1 = y5);
}
var bounds_default2 = boundsStream2;

// node_modules/d3-geo/src/path/centroid.js
var X02 = 0, Y02 = 0, Z02 = 0, X12 = 0, Y12 = 0, Z12 = 0, X22 = 0, Y22 = 0, Z22 = 0, x002, y002, x04, y04, centroidStream2 = {
  point: centroidPoint2,
  lineStart: centroidLineStart2,
  lineEnd: centroidLineEnd2,
  polygonStart: function() {
    centroidStream2.lineStart = centroidRingStart2, centroidStream2.lineEnd = centroidRingEnd2;
  },
  polygonEnd: function() {
    centroidStream2.point = centroidPoint2, centroidStream2.lineStart = centroidLineStart2, centroidStream2.lineEnd = centroidLineEnd2;
  },
  result: function() {
    var centroid = Z22 ? [X22 / Z22, Y22 / Z22] : Z12 ? [X12 / Z12, Y12 / Z12] : Z02 ? [X02 / Z02, Y02 / Z02] : [NaN, NaN];
    return X02 = Y02 = Z02 = X12 = Y12 = Z12 = X22 = Y22 = Z22 = 0, centroid;
  }
};
function centroidPoint2(x5, y5) {
  X02 += x5, Y02 += y5, ++Z02;
}
function centroidLineStart2() {
  centroidStream2.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x5, y5) {
  centroidStream2.point = centroidPointLine, centroidPoint2(x04 = x5, y04 = y5);
}
function centroidPointLine(x5, y5) {
  var dx = x5 - x04, dy = y5 - y04, z2 = sqrt3(dx * dx + dy * dy);
  X12 += z2 * (x04 + x5) / 2, Y12 += z2 * (y04 + y5) / 2, Z12 += z2, centroidPoint2(x04 = x5, y04 = y5);
}
function centroidLineEnd2() {
  centroidStream2.point = centroidPoint2;
}
function centroidRingStart2() {
  centroidStream2.point = centroidPointFirstRing;
}
function centroidRingEnd2() {
  centroidPointRing(x002, y002);
}
function centroidPointFirstRing(x5, y5) {
  centroidStream2.point = centroidPointRing, centroidPoint2(x002 = x04 = x5, y002 = y04 = y5);
}
function centroidPointRing(x5, y5) {
  var dx = x5 - x04, dy = y5 - y04, z2 = sqrt3(dx * dx + dy * dy);
  X12 += z2 * (x04 + x5) / 2, Y12 += z2 * (y04 + y5) / 2, Z12 += z2, z2 = y04 * x5 - x04 * y5, X22 += z2 * (x04 + x5), Y22 += z2 * (y04 + y5), Z22 += z2 * 3, centroidPoint2(x04 = x5, y04 = y5);
}
var centroid_default2 = centroidStream2;

// node_modules/d3-geo/src/path/context.js
function PathContext(context3) {
  this._context = context3;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  },
  point: function(x5, y5) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x5, y5), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x5, y5);
        break;
      }
      default: {
        this._context.moveTo(x5 + this._radius, y5), this._context.arc(x5, y5, this._radius, 0, tau3);
        break;
      }
    }
  },
  result: noop2
};

// node_modules/d3-geo/src/path/measure.js
var lengthSum = new Adder(), lengthRing, x003, y003, x05, y05, lengthStream = {
  point: noop2,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    lengthRing && lengthPoint(x003, y003), lengthStream.point = noop2;
  },
  polygonStart: function() {
    lengthRing = !0;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length3 = +lengthSum;
    return lengthSum = new Adder(), length3;
  }
};
function lengthPointFirst(x5, y5) {
  lengthStream.point = lengthPoint, x003 = x05 = x5, y003 = y05 = y5;
}
function lengthPoint(x5, y5) {
  x05 -= x5, y05 -= y5, lengthSum.add(sqrt3(x05 * x05 + y05 * y05)), x05 = x5, y05 = y5;
}
var measure_default = lengthStream;

// node_modules/d3-geo/src/path/string.js
var cacheDigits, cacheAppend, cacheRadius, cacheCircle, PathString = class {
  constructor(digits) {
    this._append = digits == null ? append2 : appendRound2(digits), this._radius = 4.5, this._ = "";
  }
  pointRadius(_) {
    return this._radius = +_, this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    this._line === 0 && (this._ += "Z"), this._point = NaN;
  }
  point(x5, y5) {
    switch (this._point) {
      case 0: {
        this._append`M${x5},${y5}`, this._point = 1;
        break;
      }
      case 1: {
        this._append`L${x5},${y5}`;
        break;
      }
      default: {
        if (this._append`M${x5},${y5}`, this._radius !== cacheRadius || this._append !== cacheAppend) {
          let r = this._radius, s = this._;
          this._ = "", this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`, cacheRadius = r, cacheAppend = this._append, cacheCircle = this._, this._ = s;
        }
        this._ += cacheCircle;
        break;
      }
    }
  }
  result() {
    let result = this._;
    return this._ = "", result.length ? result : null;
  }
};
function append2(strings) {
  let i = 1;
  this._ += strings[0];
  for (let j2 = strings.length; i < j2; ++i)
    this._ += arguments[i] + strings[i];
}
function appendRound2(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new RangeError(`invalid digits: ${digits}`);
  if (d > 15) return append2;
  if (d !== cacheDigits) {
    let k = 10 ** d;
    cacheDigits = d, cacheAppend = function(strings) {
      let i = 1;
      this._ += strings[0];
      for (let j2 = strings.length; i < j2; ++i)
        this._ += Math.round(arguments[i] * k) / k + strings[i];
    };
  }
  return cacheAppend;
}

// node_modules/d3-geo/src/path/index.js
function path_default(projection3, context3) {
  let digits = 3, pointRadius = 4.5, projectionStream, contextStream;
  function path3(object4) {
    return object4 && (typeof pointRadius == "function" && contextStream.pointRadius(+pointRadius.apply(this, arguments)), stream_default(object4, projectionStream(contextStream))), contextStream.result();
  }
  return path3.area = function(object4) {
    return stream_default(object4, projectionStream(area_default3)), area_default3.result();
  }, path3.measure = function(object4) {
    return stream_default(object4, projectionStream(measure_default)), measure_default.result();
  }, path3.bounds = function(object4) {
    return stream_default(object4, projectionStream(bounds_default2)), bounds_default2.result();
  }, path3.centroid = function(object4) {
    return stream_default(object4, projectionStream(centroid_default2)), centroid_default2.result();
  }, path3.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection3 = null, identity_default2) : (projection3 = _).stream, path3) : projection3;
  }, path3.context = function(_) {
    return arguments.length ? (contextStream = _ == null ? (context3 = null, new PathString(digits)) : new PathContext(context3 = _), typeof pointRadius != "function" && contextStream.pointRadius(pointRadius), path3) : context3;
  }, path3.pointRadius = function(_) {
    return arguments.length ? (pointRadius = typeof _ == "function" ? _ : (contextStream.pointRadius(+_), +_), path3) : pointRadius;
  }, path3.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) digits = null;
    else {
      let d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return context3 === null && (contextStream = new PathString(digits)), path3;
  }, path3.projection(projection3).digits(digits).context(context3);
}

// node_modules/d3-geo/src/transform.js
function transformer4(methods2) {
  return function(stream2) {
    var s = new TransformStream();
    for (var key2 in methods2) s[key2] = methods2[key2];
    return s.stream = stream2, s;
  };
}
function TransformStream() {
}
TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x5, y5) {
    this.stream.point(x5, y5);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};

// node_modules/d3-geo/src/projection/fit.js
function fit(projection3, fitBounds, object4) {
  var clip4 = projection3.clipExtent && projection3.clipExtent();
  return projection3.scale(150).translate([0, 0]), clip4 != null && projection3.clipExtent(null), stream_default(object4, projection3.stream(bounds_default2)), fitBounds(bounds_default2.result()), clip4 != null && projection3.clipExtent(clip4), projection3;
}
function fitExtent(projection3, extent2, object4) {
  return fit(projection3, function(b10) {
    var w2 = extent2[1][0] - extent2[0][0], h2 = extent2[1][1] - extent2[0][1], k = Math.min(w2 / (b10[1][0] - b10[0][0]), h2 / (b10[1][1] - b10[0][1])), x5 = +extent2[0][0] + (w2 - k * (b10[1][0] + b10[0][0])) / 2, y5 = +extent2[0][1] + (h2 - k * (b10[1][1] + b10[0][1])) / 2;
    projection3.scale(150 * k).translate([x5, y5]);
  }, object4);
}
function fitSize(projection3, size, object4) {
  return fitExtent(projection3, [[0, 0], size], object4);
}
function fitWidth(projection3, width2, object4) {
  return fit(projection3, function(b10) {
    var w2 = +width2, k = w2 / (b10[1][0] - b10[0][0]), x5 = (w2 - k * (b10[1][0] + b10[0][0])) / 2, y5 = -k * b10[0][1];
    projection3.scale(150 * k).translate([x5, y5]);
  }, object4);
}
function fitHeight(projection3, height2, object4) {
  return fit(projection3, function(b10) {
    var h2 = +height2, k = h2 / (b10[1][1] - b10[0][1]), x5 = -k * b10[0][0], y5 = (h2 - k * (b10[1][1] + b10[0][1])) / 2;
    projection3.scale(150 * k).translate([x5, y5]);
  }, object4);
}

// node_modules/d3-geo/src/projection/resample.js
var maxDepth = 16, cosMinDistance = cos2(30 * radians2);
function resample_default(project3, delta2) {
  return +delta2 ? resample(project3, delta2) : resampleNone(project3);
}
function resampleNone(project3) {
  return transformer4({
    point: function(x5, y5) {
      x5 = project3(x5, y5), this.stream.point(x5[0], x5[1]);
    }
  });
}
function resample(project3, delta2) {
  function resampleLineTo(x06, y06, lambda03, a0, b02, c0, x12, y12, lambda12, a1, b12, c1, depth, stream2) {
    var dx = x12 - x06, dy = y12 - y06, d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1, b10 = b02 + b12, c = c0 + c1, m = sqrt3(a * a + b10 * b10 + c * c), phi2 = asin2(c /= m), lambda22 = abs2(abs2(c) - 1) < epsilon4 || abs2(lambda03 - lambda12) < epsilon4 ? (lambda03 + lambda12) / 2 : atan22(b10, a), p = project3(lambda22, phi2), x22 = p[0], y22 = p[1], dx2 = x22 - x06, dy2 = y22 - y06, dz = dy * dx2 - dx * dy2;
      (dz * dz / d2 > delta2 || abs2((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b02 * b12 + c0 * c1 < cosMinDistance) && (resampleLineTo(x06, y06, lambda03, a0, b02, c0, x22, y22, lambda22, a /= m, b10 /= m, c, depth, stream2), stream2.point(x22, y22), resampleLineTo(x22, y22, lambda22, a, b10, c, x12, y12, lambda12, a1, b12, c1, depth, stream2));
    }
  }
  return function(stream2) {
    var lambda004, x004, y004, a00, b00, c00, lambda03, x06, y06, a0, b02, c0, resampleStream = {
      point: point8,
      lineStart,
      lineEnd,
      polygonStart: function() {
        stream2.polygonStart(), resampleStream.lineStart = ringStart;
      },
      polygonEnd: function() {
        stream2.polygonEnd(), resampleStream.lineStart = lineStart;
      }
    };
    function point8(x5, y5) {
      x5 = project3(x5, y5), stream2.point(x5[0], x5[1]);
    }
    function lineStart() {
      x06 = NaN, resampleStream.point = linePoint2, stream2.lineStart();
    }
    function linePoint2(lambda, phi2) {
      var c = cartesian([lambda, phi2]), p = project3(lambda, phi2);
      resampleLineTo(x06, y06, lambda03, a0, b02, c0, x06 = p[0], y06 = p[1], lambda03 = lambda, a0 = c[0], b02 = c[1], c0 = c[2], maxDepth, stream2), stream2.point(x06, y06);
    }
    function lineEnd() {
      resampleStream.point = point8, stream2.lineEnd();
    }
    function ringStart() {
      lineStart(), resampleStream.point = ringPoint, resampleStream.lineEnd = ringEnd;
    }
    function ringPoint(lambda, phi2) {
      linePoint2(lambda004 = lambda, phi2), x004 = x06, y004 = y06, a00 = a0, b00 = b02, c00 = c0, resampleStream.point = linePoint2;
    }
    function ringEnd() {
      resampleLineTo(x06, y06, lambda03, a0, b02, c0, x004, y004, lambda004, a00, b00, c00, maxDepth, stream2), resampleStream.lineEnd = lineEnd, lineEnd();
    }
    return resampleStream;
  };
}

// node_modules/d3-geo/src/projection/index.js
var transformRadians = transformer4({
  point: function(x5, y5) {
    this.stream.point(x5 * radians2, y5 * radians2);
  }
});
function transformRotate(rotate2) {
  return transformer4({
    point: function(x5, y5) {
      var r = rotate2(x5, y5);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function scaleTranslate(k, dx, dy, sx, sy) {
  function transform5(x5, y5) {
    return x5 *= sx, y5 *= sy, [dx + k * x5, dy - k * y5];
  }
  return transform5.invert = function(x5, y5) {
    return [(x5 - dx) / k * sx, (dy - y5) / k * sy];
  }, transform5;
}
function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  if (!alpha) return scaleTranslate(k, dx, dy, sx, sy);
  var cosAlpha = cos2(alpha), sinAlpha = sin2(alpha), a = cosAlpha * k, b10 = sinAlpha * k, ai = cosAlpha / k, bi = sinAlpha / k, ci = (sinAlpha * dy - cosAlpha * dx) / k, fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform5(x5, y5) {
    return x5 *= sx, y5 *= sy, [a * x5 - b10 * y5 + dx, dy - b10 * x5 - a * y5];
  }
  return transform5.invert = function(x5, y5) {
    return [sx * (ai * x5 - bi * y5 + ci), sy * (fi - bi * x5 - ai * y5)];
  }, transform5;
}
function projection(project3) {
  return projectionMutator(function() {
    return project3;
  })();
}
function projectionMutator(projectAt) {
  var project3, k = 150, x5 = 480, y5 = 250, lambda = 0, phi2 = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate2, alpha = 0, sx = 1, sy = 1, theta = null, preclip = antimeridian_default, x06 = null, y06, x12, y12, postclip = identity_default2, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache2, cacheStream;
  function projection3(point8) {
    return projectRotateTransform(point8[0] * radians2, point8[1] * radians2);
  }
  function invert3(point8) {
    return point8 = projectRotateTransform.invert(point8[0], point8[1]), point8 && [point8[0] * degrees3, point8[1] * degrees3];
  }
  projection3.stream = function(stream2) {
    return cache2 && cacheStream === stream2 ? cache2 : cache2 = transformRadians(transformRotate(rotate2)(preclip(projectResample(postclip(cacheStream = stream2)))));
  }, projection3.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = void 0, reset3()) : preclip;
  }, projection3.postclip = function(_) {
    return arguments.length ? (postclip = _, x06 = y06 = x12 = y12 = null, reset3()) : postclip;
  }, projection3.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? circle_default2(theta = _ * radians2) : (theta = null, antimeridian_default), reset3()) : theta * degrees3;
  }, projection3.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x06 = y06 = x12 = y12 = null, identity_default2) : clipRectangle(x06 = +_[0][0], y06 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset3()) : x06 == null ? null : [[x06, y06], [x12, y12]];
  }, projection3.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  }, projection3.translate = function(_) {
    return arguments.length ? (x5 = +_[0], y5 = +_[1], recenter()) : [x5, y5];
  }, projection3.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians2, phi2 = _[1] % 360 * radians2, recenter()) : [lambda * degrees3, phi2 * degrees3];
  }, projection3.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians2, deltaPhi = _[1] % 360 * radians2, deltaGamma = _.length > 2 ? _[2] % 360 * radians2 : 0, recenter()) : [deltaLambda * degrees3, deltaPhi * degrees3, deltaGamma * degrees3];
  }, projection3.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians2, recenter()) : alpha * degrees3;
  }, projection3.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  }, projection3.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  }, projection3.precision = function(_) {
    return arguments.length ? (projectResample = resample_default(projectTransform, delta2 = _ * _), reset3()) : sqrt3(delta2);
  }, projection3.fitExtent = function(extent2, object4) {
    return fitExtent(projection3, extent2, object4);
  }, projection3.fitSize = function(size, object4) {
    return fitSize(projection3, size, object4);
  }, projection3.fitWidth = function(width2, object4) {
    return fitWidth(projection3, width2, object4);
  }, projection3.fitHeight = function(height2, object4) {
    return fitHeight(projection3, height2, object4);
  };
  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project3(lambda, phi2)), transform5 = scaleTranslateRotate(k, x5 - center[0], y5 - center[1], sx, sy, alpha);
    return rotate2 = rotateRadians(deltaLambda, deltaPhi, deltaGamma), projectTransform = compose_default(project3, transform5), projectRotateTransform = compose_default(rotate2, projectTransform), projectResample = resample_default(projectTransform, delta2), reset3();
  }
  function reset3() {
    return cache2 = cacheStream = null, projection3;
  }
  return function() {
    return project3 = projectAt.apply(this, arguments), projection3.invert = project3.invert && invert3, recenter();
  };
}

// node_modules/d3-geo/src/projection/conic.js
function conicProjection(projectAt) {
  var phi02 = 0, phi12 = pi3 / 3, m = projectionMutator(projectAt), p = m(phi02, phi12);
  return p.parallels = function(_) {
    return arguments.length ? m(phi02 = _[0] * radians2, phi12 = _[1] * radians2) : [phi02 * degrees3, phi12 * degrees3];
  }, p;
}

// node_modules/d3-geo/src/projection/cylindricalEqualArea.js
function cylindricalEqualAreaRaw(phi02) {
  var cosPhi02 = cos2(phi02);
  function forward(lambda, phi2) {
    return [lambda * cosPhi02, sin2(phi2) / cosPhi02];
  }
  return forward.invert = function(x5, y5) {
    return [x5 / cosPhi02, asin2(y5 * cosPhi02)];
  }, forward;
}

// node_modules/d3-geo/src/projection/conicEqualArea.js
function conicEqualAreaRaw(y06, y12) {
  var sy0 = sin2(y06), n = (sy0 + sin2(y12)) / 2;
  if (abs2(n) < epsilon4) return cylindricalEqualAreaRaw(y06);
  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt3(c) / n;
  function project3(x5, y5) {
    var r = sqrt3(c - 2 * n * sin2(y5)) / n;
    return [r * sin2(x5 *= n), r0 - r * cos2(x5)];
  }
  return project3.invert = function(x5, y5) {
    var r0y = r0 - y5, l = atan22(x5, abs2(r0y)) * sign2(r0y);
    return r0y * n < 0 && (l -= pi3 * sign2(x5) * sign2(r0y)), [l / n, asin2((c - (x5 * x5 + r0y * r0y) * n * n) / (2 * n))];
  }, project3;
}
function conicEqualArea_default() {
  return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
}

// node_modules/d3-geo/src/projection/albers.js
function albers_default() {
  return conicEqualArea_default().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
}

// node_modules/d3-geo/src/projection/albersUsa.js
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x5, y5) {
      for (var i = -1; ++i < n; ) streams[i].point(x5, y5);
    },
    sphere: function() {
      for (var i = -1; ++i < n; ) streams[i].sphere();
    },
    lineStart: function() {
      for (var i = -1; ++i < n; ) streams[i].lineStart();
    },
    lineEnd: function() {
      for (var i = -1; ++i < n; ) streams[i].lineEnd();
    },
    polygonStart: function() {
      for (var i = -1; ++i < n; ) streams[i].polygonStart();
    },
    polygonEnd: function() {
      for (var i = -1; ++i < n; ) streams[i].polygonEnd();
    }
  };
}
function albersUsa_default() {
  var cache2, cacheStream, lower48 = albers_default(), lower48Point, alaska = conicEqualArea_default().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, hawaii = conicEqualArea_default().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, point8, pointStream = { point: function(x5, y5) {
    point8 = [x5, y5];
  } };
  function albersUsa(coordinates) {
    var x5 = coordinates[0], y5 = coordinates[1];
    return point8 = null, lower48Point.point(x5, y5), point8 || (alaskaPoint.point(x5, y5), point8) || (hawaiiPoint.point(x5, y5), point8);
  }
  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(), t = lower48.translate(), x5 = (coordinates[0] - t[0]) / k, y5 = (coordinates[1] - t[1]) / k;
    return (y5 >= 0.12 && y5 < 0.234 && x5 >= -0.425 && x5 < -0.214 ? alaska : y5 >= 0.166 && y5 < 0.234 && x5 >= -0.214 && x5 < -0.115 ? hawaii : lower48).invert(coordinates);
  }, albersUsa.stream = function(stream2) {
    return cache2 && cacheStream === stream2 ? cache2 : cache2 = multiplex([lower48.stream(cacheStream = stream2), alaska.stream(stream2), hawaii.stream(stream2)]);
  }, albersUsa.precision = function(_) {
    return arguments.length ? (lower48.precision(_), alaska.precision(_), hawaii.precision(_), reset3()) : lower48.precision();
  }, albersUsa.scale = function(_) {
    return arguments.length ? (lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_), albersUsa.translate(lower48.translate())) : lower48.scale();
  }, albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x5 = +_[0], y5 = +_[1];
    return lower48Point = lower48.translate(_).clipExtent([[x5 - 0.455 * k, y5 - 0.238 * k], [x5 + 0.455 * k, y5 + 0.238 * k]]).stream(pointStream), alaskaPoint = alaska.translate([x5 - 0.307 * k, y5 + 0.201 * k]).clipExtent([[x5 - 0.425 * k + epsilon4, y5 + 0.12 * k + epsilon4], [x5 - 0.214 * k - epsilon4, y5 + 0.234 * k - epsilon4]]).stream(pointStream), hawaiiPoint = hawaii.translate([x5 - 0.205 * k, y5 + 0.212 * k]).clipExtent([[x5 - 0.214 * k + epsilon4, y5 + 0.166 * k + epsilon4], [x5 - 0.115 * k - epsilon4, y5 + 0.234 * k - epsilon4]]).stream(pointStream), reset3();
  }, albersUsa.fitExtent = function(extent2, object4) {
    return fitExtent(albersUsa, extent2, object4);
  }, albersUsa.fitSize = function(size, object4) {
    return fitSize(albersUsa, size, object4);
  }, albersUsa.fitWidth = function(width2, object4) {
    return fitWidth(albersUsa, width2, object4);
  }, albersUsa.fitHeight = function(height2, object4) {
    return fitHeight(albersUsa, height2, object4);
  };
  function reset3() {
    return cache2 = cacheStream = null, albersUsa;
  }
  return albersUsa.scale(1070);
}

// node_modules/d3-geo/src/projection/azimuthal.js
function azimuthalRaw(scale7) {
  return function(x5, y5) {
    var cx = cos2(x5), cy = cos2(y5), k = scale7(cx * cy);
    return k === 1 / 0 ? [2, 0] : [
      k * cy * sin2(x5),
      k * sin2(y5)
    ];
  };
}
function azimuthalInvert(angle2) {
  return function(x5, y5) {
    var z2 = sqrt3(x5 * x5 + y5 * y5), c = angle2(z2), sc = sin2(c), cc2 = cos2(c);
    return [
      atan22(x5 * sc, z2 * cc2),
      asin2(z2 && y5 * sc / z2)
    ];
  };
}

// node_modules/d3-geo/src/projection/azimuthalEqualArea.js
var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt3(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z2) {
  return 2 * asin2(z2 / 2);
});
function azimuthalEqualArea_default() {
  return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}

// node_modules/d3-geo/src/projection/azimuthalEquidistant.js
var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos2(c)) && c / sin2(c);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function(z2) {
  return z2;
});
function azimuthalEquidistant_default() {
  return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}

// node_modules/d3-geo/src/projection/mercator.js
function mercatorRaw(lambda, phi2) {
  return [lambda, log5(tan((halfPi2 + phi2) / 2))];
}
mercatorRaw.invert = function(x5, y5) {
  return [x5, 2 * atan(exp3(y5)) - halfPi2];
};
function mercator_default() {
  return mercatorProjection(mercatorRaw).scale(961 / tau3);
}
function mercatorProjection(project3) {
  var m = projection(project3), center = m.center, scale7 = m.scale, translate4 = m.translate, clipExtent = m.clipExtent, x06 = null, y06, x12, y12;
  m.scale = function(_) {
    return arguments.length ? (scale7(_), reclip()) : scale7();
  }, m.translate = function(_) {
    return arguments.length ? (translate4(_), reclip()) : translate4();
  }, m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  }, m.clipExtent = function(_) {
    return arguments.length ? (_ == null ? x06 = y06 = x12 = y12 = null : (x06 = +_[0][0], y06 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reclip()) : x06 == null ? null : [[x06, y06], [x12, y12]];
  };
  function reclip() {
    var k = pi3 * scale7(), t = m(rotation_default(m.rotate()).invert([0, 0]));
    return clipExtent(x06 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project3 === mercatorRaw ? [[Math.max(t[0] - k, x06), y06], [Math.min(t[0] + k, x12), y12]] : [[x06, Math.max(t[1] - k, y06)], [x12, Math.min(t[1] + k, y12)]]);
  }
  return reclip();
}

// node_modules/d3-geo/src/projection/conicConformal.js
function tany(y5) {
  return tan((halfPi2 + y5) / 2);
}
function conicConformalRaw(y06, y12) {
  var cy0 = cos2(y06), n = y06 === y12 ? sin2(y06) : log5(cy0 / cos2(y12)) / log5(tany(y12) / tany(y06)), f = cy0 * pow4(tany(y06), n) / n;
  if (!n) return mercatorRaw;
  function project3(x5, y5) {
    f > 0 ? y5 < -halfPi2 + epsilon4 && (y5 = -halfPi2 + epsilon4) : y5 > halfPi2 - epsilon4 && (y5 = halfPi2 - epsilon4);
    var r = f / pow4(tany(y5), n);
    return [r * sin2(n * x5), f - r * cos2(n * x5)];
  }
  return project3.invert = function(x5, y5) {
    var fy = f - y5, r = sign2(n) * sqrt3(x5 * x5 + fy * fy), l = atan22(x5, abs2(fy)) * sign2(fy);
    return fy * n < 0 && (l -= pi3 * sign2(x5) * sign2(fy)), [l / n, 2 * atan(pow4(f / r, 1 / n)) - halfPi2];
  }, project3;
}
function conicConformal_default() {
  return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
}

// node_modules/d3-geo/src/projection/equirectangular.js
function equirectangularRaw(lambda, phi2) {
  return [lambda, phi2];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular_default() {
  return projection(equirectangularRaw).scale(152.63);
}

// node_modules/d3-geo/src/projection/conicEquidistant.js
function conicEquidistantRaw(y06, y12) {
  var cy0 = cos2(y06), n = y06 === y12 ? sin2(y06) : (cy0 - cos2(y12)) / (y12 - y06), g = cy0 / n + y06;
  if (abs2(n) < epsilon4) return equirectangularRaw;
  function project3(x5, y5) {
    var gy = g - y5, nx = n * x5;
    return [gy * sin2(nx), g - gy * cos2(nx)];
  }
  return project3.invert = function(x5, y5) {
    var gy = g - y5, l = atan22(x5, abs2(gy)) * sign2(gy);
    return gy * n < 0 && (l -= pi3 * sign2(x5) * sign2(gy)), [l / n, g - sign2(n) * sqrt3(x5 * x5 + gy * gy)];
  }, project3;
}
function conicEquidistant_default() {
  return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
}

// node_modules/d3-geo/src/projection/equalEarth.js
var A1 = 1.340264, A2 = -0.081106, A3 = 893e-6, A4 = 3796e-6, M = sqrt3(3) / 2, iterations = 12;
function equalEarthRaw(lambda, phi2) {
  var l = asin2(M * sin2(phi2)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * cos2(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}
equalEarthRaw.invert = function(x5, y5) {
  for (var l = y5, l2 = l * l, l6 = l2 * l2 * l2, i = 0, delta, fy, fpy; i < iterations && (fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y5, fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2), l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2, !(abs2(delta) < epsilon23)); ++i)
    ;
  return [
    M * x5 * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos2(l),
    asin2(sin2(l) / M)
  ];
};
function equalEarth_default() {
  return projection(equalEarthRaw).scale(177.158);
}

// node_modules/d3-geo/src/projection/gnomonic.js
function gnomonicRaw(x5, y5) {
  var cy = cos2(y5), k = cos2(x5) * cy;
  return [cy * sin2(x5) / k, sin2(y5) / k];
}
gnomonicRaw.invert = azimuthalInvert(atan);
function gnomonic_default() {
  return projection(gnomonicRaw).scale(144.049).clipAngle(60);
}

// node_modules/d3-geo/src/projection/identity.js
function identity_default3() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, alpha = 0, ca3, sa2, x06 = null, y06, x12, y12, kx = 1, ky = 1, transform5 = transformer4({
    point: function(x5, y5) {
      var p = projection3([x5, y5]);
      this.stream.point(p[0], p[1]);
    }
  }), postclip = identity_default2, cache2, cacheStream;
  function reset3() {
    return kx = k * sx, ky = k * sy, cache2 = cacheStream = null, projection3;
  }
  function projection3(p) {
    var x5 = p[0] * kx, y5 = p[1] * ky;
    if (alpha) {
      var t = y5 * ca3 - x5 * sa2;
      x5 = x5 * ca3 + y5 * sa2, y5 = t;
    }
    return [x5 + tx, y5 + ty];
  }
  return projection3.invert = function(p) {
    var x5 = p[0] - tx, y5 = p[1] - ty;
    if (alpha) {
      var t = y5 * ca3 + x5 * sa2;
      x5 = x5 * ca3 - y5 * sa2, y5 = t;
    }
    return [x5 / kx, y5 / ky];
  }, projection3.stream = function(stream2) {
    return cache2 && cacheStream === stream2 ? cache2 : cache2 = transform5(postclip(cacheStream = stream2));
  }, projection3.postclip = function(_) {
    return arguments.length ? (postclip = _, x06 = y06 = x12 = y12 = null, reset3()) : postclip;
  }, projection3.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x06 = y06 = x12 = y12 = null, identity_default2) : clipRectangle(x06 = +_[0][0], y06 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1]), reset3()) : x06 == null ? null : [[x06, y06], [x12, y12]];
  }, projection3.scale = function(_) {
    return arguments.length ? (k = +_, reset3()) : k;
  }, projection3.translate = function(_) {
    return arguments.length ? (tx = +_[0], ty = +_[1], reset3()) : [tx, ty];
  }, projection3.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians2, sa2 = sin2(alpha), ca3 = cos2(alpha), reset3()) : alpha * degrees3;
  }, projection3.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, reset3()) : sx < 0;
  }, projection3.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, reset3()) : sy < 0;
  }, projection3.fitExtent = function(extent2, object4) {
    return fitExtent(projection3, extent2, object4);
  }, projection3.fitSize = function(size, object4) {
    return fitSize(projection3, size, object4);
  }, projection3.fitWidth = function(width2, object4) {
    return fitWidth(projection3, width2, object4);
  }, projection3.fitHeight = function(height2, object4) {
    return fitHeight(projection3, height2, object4);
  }, projection3;
}

// node_modules/d3-geo/src/projection/naturalEarth1.js
function naturalEarth1Raw(lambda, phi2) {
  var phi22 = phi2 * phi2, phi4 = phi22 * phi22;
  return [
    lambda * (0.8707 - 0.131979 * phi22 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi22 - 1529e-6 * phi4))),
    phi2 * (1.007226 + phi22 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi22 - 5916e-6 * phi4)))
  ];
}
naturalEarth1Raw.invert = function(x5, y5) {
  var phi2 = y5, i = 25, delta;
  do {
    var phi22 = phi2 * phi2, phi4 = phi22 * phi22;
    phi2 -= delta = (phi2 * (1.007226 + phi22 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi22 - 5916e-6 * phi4))) - y5) / (1.007226 + phi22 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi22 - 5916e-6 * 11 * phi4)));
  } while (abs2(delta) > epsilon4 && --i > 0);
  return [
    x5 / (0.8707 + (phi22 = phi2 * phi2) * (-0.131979 + phi22 * (-0.013791 + phi22 * phi22 * phi22 * (3971e-6 - 1529e-6 * phi22)))),
    phi2
  ];
};
function naturalEarth1_default() {
  return projection(naturalEarth1Raw).scale(175.295);
}

// node_modules/d3-geo/src/projection/orthographic.js
function orthographicRaw(x5, y5) {
  return [cos2(y5) * sin2(x5), sin2(y5)];
}
orthographicRaw.invert = azimuthalInvert(asin2);
function orthographic_default() {
  return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon4);
}

// node_modules/d3-geo/src/projection/stereographic.js
function stereographicRaw(x5, y5) {
  var cy = cos2(y5), k = 1 + cos2(x5) * cy;
  return [cy * sin2(x5) / k, sin2(y5) / k];
}
stereographicRaw.invert = azimuthalInvert(function(z2) {
  return 2 * atan(z2);
});
function stereographic_default() {
  return projection(stereographicRaw).scale(250).clipAngle(142);
}

// node_modules/d3-geo/src/projection/transverseMercator.js
function transverseMercatorRaw(lambda, phi2) {
  return [log5(tan((halfPi2 + phi2) / 2)), -lambda];
}
transverseMercatorRaw.invert = function(x5, y5) {
  return [-y5, 2 * atan(exp3(x5)) - halfPi2];
};
function transverseMercator_default() {
  var m = mercatorProjection(transverseMercatorRaw), center = m.center, rotate2 = m.rotate;
  return m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  }, m.rotate = function(_) {
    return arguments.length ? rotate2([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate2(), [_[0], _[1], _[2] - 90]);
  }, rotate2([0, 0, 90]).scale(159.155);
}

// node_modules/d3-geo-projection/src/math.js
var abs3 = Math.abs;
var cos3 = Math.cos;
var sin3 = Math.sin;
var epsilon5 = 1e-6;
var pi4 = Math.PI, halfPi3 = pi4 / 2, quarterPi2 = pi4 / 4;
var sqrt22 = sqrt4(2), sqrtPi = sqrt4(pi4), tau4 = pi4 * 2, degrees4 = 180 / pi4, radians3 = pi4 / 180;
function asin3(x5) {
  return x5 > 1 ? halfPi3 : x5 < -1 ? -halfPi3 : Math.asin(x5);
}
function sqrt4(x5) {
  return x5 > 0 ? Math.sqrt(x5) : 0;
}

// node_modules/d3-geo-projection/src/mollweide.js
function mollweideBromleyTheta(cp, phi2) {
  var cpsinPhi = cp * sin3(phi2), i = 30, delta;
  do
    phi2 -= delta = (phi2 + sin3(phi2) - cpsinPhi) / (1 + cos3(phi2));
  while (abs3(delta) > epsilon5 && --i > 0);
  return phi2 / 2;
}
function mollweideBromleyRaw(cx, cy, cp) {
  function forward(lambda, phi2) {
    return [cx * lambda * cos3(phi2 = mollweideBromleyTheta(cp, phi2)), cy * sin3(phi2)];
  }
  return forward.invert = function(x5, y5) {
    return y5 = asin3(y5 / cy), [x5 / (cx * cos3(y5)), asin3((2 * y5 + sin3(2 * y5)) / cp)];
  }, forward;
}
var mollweideRaw = mollweideBromleyRaw(sqrt22 / halfPi3, sqrt22, pi4);
function mollweide_default() {
  return projection(mollweideRaw).scale(169.529);
}

// node_modules/vega-projection/build/vega-projection.js
var defaultPath = path_default(), projectionProperties = [
  // standard properties in d3-geo
  "clipAngle",
  "clipExtent",
  "scale",
  "translate",
  "center",
  "rotate",
  "parallels",
  "precision",
  "reflectX",
  "reflectY",
  // extended properties in d3-geo-projections
  "coefficient",
  "distance",
  "fraction",
  "lobes",
  "parallel",
  "radius",
  "ratio",
  "spacing",
  "tilt"
];
function create2(type3, constructor) {
  return function projection3() {
    let p = constructor();
    return p.type = type3, p.path = path_default().projection(p), p.copy = p.copy || function() {
      let c = projection3();
      return projectionProperties.forEach((prop) => {
        p[prop] && c[prop](p[prop]());
      }), c.path.pointRadius(p.path.pointRadius()), c;
    }, registerScale(p);
  };
}
function projection2(type3, proj) {
  if (!type3 || typeof type3 != "string")
    throw new Error("Projection type must be a name string.");
  return type3 = type3.toLowerCase(), arguments.length > 1 ? (projections[type3] = create2(type3, proj), this) : projections[type3] || null;
}
function getProjectionPath(proj) {
  return proj && proj.path || defaultPath;
}
var projections = {
  // base d3-geo projection types
  albers: albers_default,
  albersusa: albersUsa_default,
  azimuthalequalarea: azimuthalEqualArea_default,
  azimuthalequidistant: azimuthalEquidistant_default,
  conicconformal: conicConformal_default,
  conicequalarea: conicEqualArea_default,
  conicequidistant: conicEquidistant_default,
  equalEarth: equalEarth_default,
  equirectangular: equirectangular_default,
  gnomonic: gnomonic_default,
  identity: identity_default3,
  mercator: mercator_default,
  mollweide: mollweide_default,
  naturalEarth1: naturalEarth1_default,
  orthographic: orthographic_default,
  stereographic: stereographic_default,
  transversemercator: transverseMercator_default
};
for (let key2 in projections)
  projection2(key2, projections[key2]);

// node_modules/vega-geo/build/vega-geo.js
function noop3() {
}
var cases = [[], [[[1, 1.5], [0.5, 1]]], [[[1.5, 1], [1, 1.5]]], [[[1.5, 1], [0.5, 1]]], [[[1, 0.5], [1.5, 1]]], [[[1, 1.5], [0.5, 1]], [[1, 0.5], [1.5, 1]]], [[[1, 0.5], [1, 1.5]]], [[[1, 0.5], [0.5, 1]]], [[[0.5, 1], [1, 0.5]]], [[[1, 1.5], [1, 0.5]]], [[[0.5, 1], [1, 0.5]], [[1.5, 1], [1, 1.5]]], [[[1.5, 1], [1, 0.5]]], [[[0.5, 1], [1.5, 1]]], [[[1, 1.5], [1.5, 1]]], [[[0.5, 1], [1, 1.5]]], []];
function contours() {
  var dx = 1, dy = 1, smooth = smoothLinear;
  function contours2(values3, tz) {
    return tz.map((value3) => contour(values3, value3));
  }
  function contour(values3, value3) {
    var polygons = [], holes = [];
    return isorings(values3, value3, (ring) => {
      smooth(ring, values3, value3), area2(ring) > 0 ? polygons.push([ring]) : holes.push(ring);
    }), holes.forEach((hole) => {
      for (var i = 0, n = polygons.length, polygon; i < n; ++i)
        if (contains((polygon = polygons[i])[0], hole) !== -1) {
          polygon.push(hole);
          return;
        }
    }), {
      type: "MultiPolygon",
      value: value3,
      coordinates: polygons
    };
  }
  function isorings(values3, value3, callback) {
    var fragmentByStart = [], fragmentByEnd = [], x5, y5, t04, t13, t22, t32;
    for (x5 = y5 = -1, t13 = values3[0] >= value3, cases[t13 << 1].forEach(stitch); ++x5 < dx - 1; )
      t04 = t13, t13 = values3[x5 + 1] >= value3, cases[t04 | t13 << 1].forEach(stitch);
    for (cases[t13 << 0].forEach(stitch); ++y5 < dy - 1; ) {
      for (x5 = -1, t13 = values3[y5 * dx + dx] >= value3, t22 = values3[y5 * dx] >= value3, cases[t13 << 1 | t22 << 2].forEach(stitch); ++x5 < dx - 1; )
        t04 = t13, t13 = values3[y5 * dx + dx + x5 + 1] >= value3, t32 = t22, t22 = values3[y5 * dx + x5 + 1] >= value3, cases[t04 | t13 << 1 | t22 << 2 | t32 << 3].forEach(stitch);
      cases[t13 | t22 << 3].forEach(stitch);
    }
    for (x5 = -1, t22 = values3[y5 * dx] >= value3, cases[t22 << 2].forEach(stitch); ++x5 < dx - 1; )
      t32 = t22, t22 = values3[y5 * dx + x5 + 1] >= value3, cases[t22 << 2 | t32 << 3].forEach(stitch);
    cases[t22 << 3].forEach(stitch);
    function stitch(line4) {
      var start = [line4[0][0] + x5, line4[0][1] + y5], end = [line4[1][0] + x5, line4[1][1] + y5], startIndex = index4(start), endIndex = index4(end), f, g;
      (f = fragmentByEnd[startIndex]) ? (g = fragmentByStart[endIndex]) ? (delete fragmentByEnd[f.end], delete fragmentByStart[g.start], f === g ? (f.ring.push(end), callback(f.ring)) : fragmentByStart[f.start] = fragmentByEnd[g.end] = {
        start: f.start,
        end: g.end,
        ring: f.ring.concat(g.ring)
      }) : (delete fragmentByEnd[f.end], f.ring.push(end), fragmentByEnd[f.end = endIndex] = f) : (f = fragmentByStart[endIndex]) ? (g = fragmentByEnd[startIndex]) ? (delete fragmentByStart[f.start], delete fragmentByEnd[g.end], f === g ? (f.ring.push(end), callback(f.ring)) : fragmentByStart[g.start] = fragmentByEnd[f.end] = {
        start: g.start,
        end: f.end,
        ring: g.ring.concat(f.ring)
      }) : (delete fragmentByStart[f.start], f.ring.unshift(start), fragmentByStart[f.start = startIndex] = f) : fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {
        start: startIndex,
        end: endIndex,
        ring: [start, end]
      };
    }
  }
  function index4(point8) {
    return point8[0] * 2 + point8[1] * (dx + 1) * 4;
  }
  function smoothLinear(ring, values3, value3) {
    ring.forEach((point8) => {
      var x5 = point8[0], y5 = point8[1], xt = x5 | 0, yt = y5 | 0, v0, v1 = values3[yt * dx + xt];
      x5 > 0 && x5 < dx && xt === x5 && (v0 = values3[yt * dx + xt - 1], point8[0] = x5 + (value3 - v0) / (v1 - v0) - 0.5), y5 > 0 && y5 < dy && yt === y5 && (v0 = values3[(yt - 1) * dx + xt], point8[1] = y5 + (value3 - v0) / (v1 - v0) - 0.5);
    });
  }
  return contours2.contour = contour, contours2.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = Math.floor(_[0]), _1 = Math.floor(_[1]);
    return _0 >= 0 && _1 >= 0 || error62("invalid size"), dx = _0, dy = _1, contours2;
  }, contours2.smooth = function(_) {
    return arguments.length ? (smooth = _ ? smoothLinear : noop3, contours2) : smooth === smoothLinear;
  }, contours2;
}
function area2(ring) {
  for (var i = 0, n = ring.length, area4 = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1]; ++i < n; ) area4 += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  return area4;
}
function contains(ring, hole) {
  for (var i = -1, n = hole.length, c; ++i < n; ) if (c = ringContains(ring, hole[i])) return c;
  return 0;
}
function ringContains(ring, point8) {
  for (var x5 = point8[0], y5 = point8[1], contains3 = -1, i = 0, n = ring.length, j2 = n - 1; i < n; j2 = i++) {
    var pi6 = ring[i], xi = pi6[0], yi = pi6[1], pj = ring[j2], xj = pj[0], yj = pj[1];
    if (segmentContains(pi6, pj, point8)) return 0;
    yi > y5 != yj > y5 && x5 < (xj - xi) * (y5 - yi) / (yj - yi) + xi && (contains3 = -contains3);
  }
  return contains3;
}
function segmentContains(a, b10, c) {
  var i;
  return collinear(a, b10, c) && within(a[i = +(a[0] === b10[0])], c[i], b10[i]);
}
function collinear(a, b10, c) {
  return (b10[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b10[1] - a[1]);
}
function within(p, q, r) {
  return p <= q && q <= r || r <= q && q <= p;
}
function quantize2(k, nice3, zero6) {
  return function(values3) {
    var ex = extent(values3), start = zero6 ? Math.min(ex[0], 0) : ex[0], stop2 = ex[1], span = stop2 - start, step = nice3 ? tickStep(start, stop2, k) : span / (k + 1);
    return range2(start + step, stop2, step);
  };
}
function Isocontour(params2) {
  Transform.call(this, null, params2);
}
Isocontour.Definition = {
  type: "Isocontour",
  metadata: {
    generates: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "thresholds",
    type: "number",
    array: !0
  }, {
    name: "levels",
    type: "number"
  }, {
    name: "nice",
    type: "boolean",
    default: !1
  }, {
    name: "resolve",
    type: "enum",
    values: ["shared", "independent"],
    default: "independent"
  }, {
    name: "zero",
    type: "boolean",
    default: !0
  }, {
    name: "smooth",
    type: "boolean",
    default: !0
  }, {
    name: "scale",
    type: "number",
    expr: !0
  }, {
    name: "translate",
    type: "number",
    array: !0,
    expr: !0
  }, {
    name: "as",
    type: "string",
    null: !0,
    default: "contour"
  }]
};
inherits_default(Isocontour, Transform, {
  transform(_, pulse2) {
    if (this.value && !pulse2.changed() && !_.modified())
      return pulse2.StopPropagation;
    var out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), source4 = pulse2.materialize(pulse2.SOURCE).source, field3 = _.field || identity6, contour = contours().smooth(_.smooth !== !1), tz = _.thresholds || levels(source4, field3, _), as = _.as === null ? null : _.as || "contour", values3 = [];
    return source4.forEach((t) => {
      let grid = field3(t), paths = contour.size([grid.width, grid.height])(grid.values, isArray(tz) ? tz : tz(grid.values));
      transformPaths(paths, grid, t, _), paths.forEach((p) => {
        values3.push(rederive(t, ingest$1(as != null ? {
          [as]: p
        } : p)));
      });
    }), this.value && (out.rem = this.value), this.value = out.source = out.add = values3, out;
  }
});
function levels(values3, f, _) {
  let q = quantize2(_.levels || 10, _.nice, _.zero !== !1);
  return _.resolve !== "shared" ? q : q(values3.map((t) => max(f(t).values)));
}
function transformPaths(paths, grid, datum2, _) {
  let s = _.scale || grid.scale, t = _.translate || grid.translate;
  if (isFunction(s) && (s = s(datum2, _)), isFunction(t) && (t = t(datum2, _)), (s === 1 || s == null) && !t) return;
  let sx = (isNumber(s) ? s : s[0]) || 1, sy = (isNumber(s) ? s : s[1]) || 1, tx = t && t[0] || 0, ty = t && t[1] || 0;
  paths.forEach(transform3(grid, sx, sy, tx, ty));
}
function transform3(grid, sx, sy, tx, ty) {
  let x12 = grid.x1 || 0, y12 = grid.y1 || 0, flip2 = sx * sy < 0;
  function transformPolygon(coordinates) {
    coordinates.forEach(transformRing);
  }
  function transformRing(coordinates) {
    flip2 && coordinates.reverse(), coordinates.forEach(transformPoint);
  }
  function transformPoint(coordinates) {
    coordinates[0] = (coordinates[0] - x12) * sx + tx, coordinates[1] = (coordinates[1] - y12) * sy + ty;
  }
  return function(geometry) {
    return geometry.coordinates.forEach(transformPolygon), geometry;
  };
}
function radius(bw, data3, f) {
  let v2 = bw >= 0 ? bw : estimateBandwidth(data3, f);
  return Math.round((Math.sqrt(4 * v2 * v2 + 1) - 1) / 2);
}
function number8(_) {
  return isFunction(_) ? _ : constant_default(+_);
}
function density2D() {
  var x5 = (d) => d[0], y5 = (d) => d[1], weight = one, bandwidth2 = [-1, -1], dx = 960, dy = 500, k = 2;
  function density(data3, counts) {
    let rx = radius(bandwidth2[0], data3, x5) >> k, ry = radius(bandwidth2[1], data3, y5) >> k, ox = rx ? rx + 2 : 0, oy = ry ? ry + 2 : 0, n = 2 * ox + (dx >> k), m = 2 * oy + (dy >> k), values0 = new Float32Array(n * m), values1 = new Float32Array(n * m), values3 = values0;
    data3.forEach((d) => {
      let xi = ox + (+x5(d) >> k), yi = oy + (+y5(d) >> k);
      xi >= 0 && xi < n && yi >= 0 && yi < m && (values0[xi + yi * n] += +weight(d));
    }), rx > 0 && ry > 0 ? (blurX(n, m, values0, values1, rx), blurY(n, m, values1, values0, ry), blurX(n, m, values0, values1, rx), blurY(n, m, values1, values0, ry), blurX(n, m, values0, values1, rx), blurY(n, m, values1, values0, ry)) : rx > 0 ? (blurX(n, m, values0, values1, rx), blurX(n, m, values1, values0, rx), blurX(n, m, values0, values1, rx), values3 = values1) : ry > 0 && (blurY(n, m, values0, values1, ry), blurY(n, m, values1, values0, ry), blurY(n, m, values0, values1, ry), values3 = values1);
    let s = counts ? Math.pow(2, -2 * k) : 1 / sum(values3);
    for (let i = 0, sz2 = n * m; i < sz2; ++i) values3[i] *= s;
    return {
      values: values3,
      scale: 1 << k,
      width: n,
      height: m,
      x1: ox,
      y1: oy,
      x2: ox + (dx >> k),
      y2: oy + (dy >> k)
    };
  }
  return density.x = function(_) {
    return arguments.length ? (x5 = number8(_), density) : x5;
  }, density.y = function(_) {
    return arguments.length ? (y5 = number8(_), density) : y5;
  }, density.weight = function(_) {
    return arguments.length ? (weight = number8(_), density) : weight;
  }, density.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = +_[0], _1 = +_[1];
    return _0 >= 0 && _1 >= 0 || error62("invalid size"), dx = _0, dy = _1, density;
  }, density.cellSize = function(_) {
    return arguments.length ? ((_ = +_) >= 1 || error62("invalid cell size"), k = Math.floor(Math.log(_) / Math.LN2), density) : 1 << k;
  }, density.bandwidth = function(_) {
    return arguments.length ? (_ = array_default(_), _.length === 1 && (_ = [+_[0], +_[0]]), _.length !== 2 && error62("invalid bandwidth"), bandwidth2 = _, density) : bandwidth2;
  }, density;
}
function blurX(n, m, source4, target3, r) {
  let w2 = (r << 1) + 1;
  for (let j2 = 0; j2 < m; ++j2)
    for (let i = 0, sr = 0; i < n + r; ++i)
      i < n && (sr += source4[i + j2 * n]), i >= r && (i >= w2 && (sr -= source4[i - w2 + j2 * n]), target3[i - r + j2 * n] = sr / Math.min(i + 1, n - 1 + w2 - i, w2));
}
function blurY(n, m, source4, target3, r) {
  let w2 = (r << 1) + 1;
  for (let i = 0; i < n; ++i)
    for (let j2 = 0, sr = 0; j2 < m + r; ++j2)
      j2 < m && (sr += source4[i + j2 * n]), j2 >= r && (j2 >= w2 && (sr -= source4[i + (j2 - w2) * n]), target3[i + (j2 - r) * n] = sr / Math.min(j2 + 1, m - 1 + w2 - j2, w2));
}
function KDE2D(params2) {
  Transform.call(this, null, params2);
}
KDE2D.Definition = {
  type: "KDE2D",
  metadata: {
    generates: !0
  },
  params: [{
    name: "size",
    type: "number",
    array: !0,
    length: 2,
    required: !0
  }, {
    name: "x",
    type: "field",
    required: !0
  }, {
    name: "y",
    type: "field",
    required: !0
  }, {
    name: "weight",
    type: "field"
  }, {
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "cellSize",
    type: "number"
  }, {
    name: "bandwidth",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "counts",
    type: "boolean",
    default: !1
  }, {
    name: "as",
    type: "string",
    default: "grid"
  }]
};
var PARAMS = ["x", "y", "weight", "size", "cellSize", "bandwidth"];
function params(obj, _) {
  return PARAMS.forEach((param2) => _[param2] != null ? obj[param2](_[param2]) : 0), obj;
}
inherits_default(KDE2D, Transform, {
  transform(_, pulse2) {
    if (this.value && !pulse2.changed() && !_.modified()) return pulse2.StopPropagation;
    var out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), source4 = pulse2.materialize(pulse2.SOURCE).source, groups = partition3(source4, _.groupby), names = (_.groupby || []).map(accessorName), kde2 = params(density2D(), _), as = _.as || "grid", values3 = [];
    function set8(t, vals2) {
      for (let i = 0; i < names.length; ++i) t[names[i]] = vals2[i];
      return t;
    }
    return values3 = groups.map((g) => ingest$1(set8({
      [as]: kde2(g, _.counts)
    }, g.dims))), this.value && (out.rem = this.value), this.value = out.source = out.add = values3, out;
  }
});
function partition3(data3, groupby) {
  var groups = [], get6 = (f) => f(t), map4, i, n, t, k, g;
  if (groupby == null)
    groups.push(data3);
  else
    for (map4 = {}, i = 0, n = data3.length; i < n; ++i)
      t = data3[i], k = groupby.map(get6), g = map4[k], g || (map4[k] = g = [], g.dims = k, groups.push(g)), g.push(t);
  return groups;
}
function Contour(params2) {
  Transform.call(this, null, params2);
}
Contour.Definition = {
  type: "Contour",
  metadata: {
    generates: !0
  },
  params: [{
    name: "size",
    type: "number",
    array: !0,
    length: 2,
    required: !0
  }, {
    name: "values",
    type: "number",
    array: !0
  }, {
    name: "x",
    type: "field"
  }, {
    name: "y",
    type: "field"
  }, {
    name: "weight",
    type: "field"
  }, {
    name: "cellSize",
    type: "number"
  }, {
    name: "bandwidth",
    type: "number"
  }, {
    name: "count",
    type: "number"
  }, {
    name: "nice",
    type: "boolean",
    default: !1
  }, {
    name: "thresholds",
    type: "number",
    array: !0
  }, {
    name: "smooth",
    type: "boolean",
    default: !0
  }]
};
inherits_default(Contour, Transform, {
  transform(_, pulse2) {
    if (this.value && !pulse2.changed() && !_.modified())
      return pulse2.StopPropagation;
    var out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS), contour = contours().smooth(_.smooth !== !1), values3 = _.values, thresh = _.thresholds || quantize2(_.count || 10, _.nice, !!values3), size = _.size, grid, post;
    return values3 || (values3 = pulse2.materialize(pulse2.SOURCE).source, grid = params(density2D(), _)(values3, !0), post = transform3(grid, grid.scale || 1, grid.scale || 1, 0, 0), size = [grid.width, grid.height], values3 = grid.values), thresh = isArray(thresh) ? thresh : thresh(values3), values3 = contour.size(size)(values3, thresh), post && values3.forEach(post), this.value && (out.rem = this.value), this.value = out.source = out.add = (values3 || []).map(ingest$1), out;
  }
});
var Feature = "Feature", FeatureCollection = "FeatureCollection", MultiPoint = "MultiPoint";
function GeoJSON(params2) {
  Transform.call(this, null, params2);
}
GeoJSON.Definition = {
  type: "GeoJSON",
  metadata: {},
  params: [{
    name: "fields",
    type: "field",
    array: !0,
    length: 2
  }, {
    name: "geojson",
    type: "field"
  }]
};
inherits_default(GeoJSON, Transform, {
  transform(_, pulse2) {
    var features = this._features, points2 = this._points, fields = _.fields, lon = fields && fields[0], lat = fields && fields[1], geojson = _.geojson || !fields && identity6, flag2 = pulse2.ADD, mod;
    mod = _.modified() || pulse2.changed(pulse2.REM) || pulse2.modified(accessorFields(geojson)) || lon && pulse2.modified(accessorFields(lon)) || lat && pulse2.modified(accessorFields(lat)), (!this.value || mod) && (flag2 = pulse2.SOURCE, this._features = features = [], this._points = points2 = []), geojson && pulse2.visit(flag2, (t) => features.push(geojson(t))), lon && lat && (pulse2.visit(flag2, (t) => {
      var x5 = lon(t), y5 = lat(t);
      x5 != null && y5 != null && (x5 = +x5) === x5 && (y5 = +y5) === y5 && points2.push([x5, y5]);
    }), features = features.concat({
      type: Feature,
      geometry: {
        type: MultiPoint,
        coordinates: points2
      }
    })), this.value = {
      type: FeatureCollection,
      features
    };
  }
});
function GeoPath(params2) {
  Transform.call(this, null, params2);
}
GeoPath.Definition = {
  type: "GeoPath",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "projection",
    type: "projection"
  }, {
    name: "field",
    type: "field"
  }, {
    name: "pointRadius",
    type: "number",
    expr: !0
  }, {
    name: "as",
    type: "string",
    default: "path"
  }]
};
inherits_default(GeoPath, Transform, {
  transform(_, pulse2) {
    var out = pulse2.fork(pulse2.ALL), path3 = this.value, field3 = _.field || identity6, as = _.as || "path", flag2 = out.SOURCE;
    !path3 || _.modified() ? (this.value = path3 = getProjectionPath(_.projection), out.materialize().reflow()) : flag2 = field3 === identity6 || pulse2.modified(field3.fields) ? out.ADD_MOD : out.ADD;
    let prev = initPath(path3, _.pointRadius);
    return out.visit(flag2, (t) => t[as] = path3(field3(t))), path3.pointRadius(prev), out.modifies(as);
  }
});
function initPath(path3, pointRadius) {
  let prev = path3.pointRadius();
  return path3.context(null), pointRadius != null && path3.pointRadius(pointRadius), prev;
}
function GeoPoint(params2) {
  Transform.call(this, null, params2);
}
GeoPoint.Definition = {
  type: "GeoPoint",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "projection",
    type: "projection",
    required: !0
  }, {
    name: "fields",
    type: "field",
    array: !0,
    required: !0,
    length: 2
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 2,
    default: ["x", "y"]
  }]
};
inherits_default(GeoPoint, Transform, {
  transform(_, pulse2) {
    var proj = _.projection, lon = _.fields[0], lat = _.fields[1], as = _.as || ["x", "y"], x5 = as[0], y5 = as[1], mod;
    function set8(t) {
      let xy = proj([lon(t), lat(t)]);
      xy ? (t[x5] = xy[0], t[y5] = xy[1]) : (t[x5] = void 0, t[y5] = void 0);
    }
    return _.modified() ? pulse2 = pulse2.materialize().reflow(!0).visit(pulse2.SOURCE, set8) : (mod = pulse2.modified(lon.fields) || pulse2.modified(lat.fields), pulse2.visit(mod ? pulse2.ADD_MOD : pulse2.ADD, set8)), pulse2.modifies(as);
  }
});
function GeoShape(params2) {
  Transform.call(this, null, params2);
}
GeoShape.Definition = {
  type: "GeoShape",
  metadata: {
    modifies: !0,
    nomod: !0
  },
  params: [{
    name: "projection",
    type: "projection"
  }, {
    name: "field",
    type: "field",
    default: "datum"
  }, {
    name: "pointRadius",
    type: "number",
    expr: !0
  }, {
    name: "as",
    type: "string",
    default: "shape"
  }]
};
inherits_default(GeoShape, Transform, {
  transform(_, pulse2) {
    var out = pulse2.fork(pulse2.ALL), shape2 = this.value, as = _.as || "shape", flag2 = out.ADD;
    return (!shape2 || _.modified()) && (this.value = shape2 = shapeGenerator(getProjectionPath(_.projection), _.field || field("datum"), _.pointRadius), out.materialize().reflow(), flag2 = out.SOURCE), out.visit(flag2, (t) => t[as] = shape2), out.modifies(as);
  }
});
function shapeGenerator(path3, field3, pointRadius) {
  let shape2 = pointRadius == null ? (_) => path3(field3(_)) : (_) => {
    var prev = path3.pointRadius(), value3 = path3.pointRadius(pointRadius)(field3(_));
    return path3.pointRadius(prev), value3;
  };
  return shape2.context = (_) => (path3.context(_), shape2), shape2;
}
function Graticule(params2) {
  Transform.call(this, [], params2), this.generator = graticule();
}
Graticule.Definition = {
  type: "Graticule",
  metadata: {
    changes: !0,
    generates: !0
  },
  params: [{
    name: "extent",
    type: "array",
    array: !0,
    length: 2,
    content: {
      type: "number",
      array: !0,
      length: 2
    }
  }, {
    name: "extentMajor",
    type: "array",
    array: !0,
    length: 2,
    content: {
      type: "number",
      array: !0,
      length: 2
    }
  }, {
    name: "extentMinor",
    type: "array",
    array: !0,
    length: 2,
    content: {
      type: "number",
      array: !0,
      length: 2
    }
  }, {
    name: "step",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "stepMajor",
    type: "number",
    array: !0,
    length: 2,
    default: [90, 360]
  }, {
    name: "stepMinor",
    type: "number",
    array: !0,
    length: 2,
    default: [10, 10]
  }, {
    name: "precision",
    type: "number",
    default: 2.5
  }]
};
inherits_default(Graticule, Transform, {
  transform(_, pulse2) {
    var src = this.value, gen = this.generator, t;
    if (!src.length || _.modified())
      for (let prop in _)
        isFunction(gen[prop]) && gen[prop](_[prop]);
    return t = gen(), src.length ? pulse2.mod.push(replace(src[0], t)) : pulse2.add.push(ingest$1(t)), src[0] = t, pulse2;
  }
});
function Heatmap(params2) {
  Transform.call(this, null, params2);
}
Heatmap.Definition = {
  type: "heatmap",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "color",
    type: "string",
    expr: !0
  }, {
    name: "opacity",
    type: "number",
    expr: !0
  }, {
    name: "resolve",
    type: "enum",
    values: ["shared", "independent"],
    default: "independent"
  }, {
    name: "as",
    type: "string",
    default: "image"
  }]
};
inherits_default(Heatmap, Transform, {
  transform(_, pulse2) {
    if (!pulse2.changed() && !_.modified())
      return pulse2.StopPropagation;
    var source4 = pulse2.materialize(pulse2.SOURCE).source, shared = _.resolve === "shared", field3 = _.field || identity6, opacity2 = opacity_(_.opacity, _), color5 = color_(_.color, _), as = _.as || "image", obj = {
      $x: 0,
      $y: 0,
      $value: 0,
      $max: shared ? max(source4.map((t) => max(field3(t).values))) : 0
    };
    return source4.forEach((t) => {
      let v2 = field3(t), o = extend2({}, t, obj);
      shared || (o.$max = max(v2.values || [])), t[as] = toCanvas(v2, o, color5.dep ? color5 : constant_default(color5(o)), opacity2.dep ? opacity2 : constant_default(opacity2(o)));
    }), pulse2.reflow(!0).modifies(as);
  }
});
function color_(color5, _) {
  let f;
  return isFunction(color5) ? (f = (obj) => rgb(color5(obj, _)), f.dep = dependency(color5)) : f = constant_default(rgb(color5 || "#888")), f;
}
function opacity_(opacity2, _) {
  let f;
  return isFunction(opacity2) ? (f = (obj) => opacity2(obj, _), f.dep = dependency(opacity2)) : opacity2 ? f = constant_default(opacity2) : (f = (obj) => obj.$value / obj.$max || 0, f.dep = !0), f;
}
function dependency(f) {
  if (!isFunction(f)) return !1;
  let set8 = toSet(accessorFields(f));
  return set8.$x || set8.$y || set8.$value || set8.$max;
}
function toCanvas(grid, obj, color5, opacity2) {
  let n = grid.width, m = grid.height, x12 = grid.x1 || 0, y12 = grid.y1 || 0, x22 = grid.x2 || n, y22 = grid.y2 || m, val = grid.values, value3 = val ? (i) => val[i] : zero, can = canvas(x22 - x12, y22 - y12), ctx = can.getContext("2d"), img = ctx.getImageData(0, 0, x22 - x12, y22 - y12), pix = img.data;
  for (let j2 = y12, k = 0; j2 < y22; ++j2) {
    obj.$y = j2 - y12;
    for (let i = x12, r = j2 * n; i < x22; ++i, k += 4) {
      obj.$x = i - x12, obj.$value = value3(i + r);
      let v2 = color5(obj);
      pix[k + 0] = v2.r, pix[k + 1] = v2.g, pix[k + 2] = v2.b, pix[k + 3] = ~~(255 * opacity2(obj));
    }
  }
  return ctx.putImageData(img, 0, 0), can;
}
function Projection(params2) {
  Transform.call(this, null, params2), this.modified(!0);
}
inherits_default(Projection, Transform, {
  transform(_, pulse2) {
    let proj = this.value;
    return !proj || _.modified("type") ? (this.value = proj = create3(_.type), projectionProperties.forEach((prop) => {
      _[prop] != null && set5(proj, prop, _[prop]);
    })) : projectionProperties.forEach((prop) => {
      _.modified(prop) && set5(proj, prop, _[prop]);
    }), _.pointRadius != null && proj.path.pointRadius(_.pointRadius), _.fit && fit2(proj, _), pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS);
  }
});
function fit2(proj, _) {
  let data3 = collectGeoJSON(_.fit);
  _.extent ? proj.fitExtent(_.extent, data3) : _.size && proj.fitSize(_.size, data3);
}
function create3(type3) {
  let constructor = projection2((type3 || "mercator").toLowerCase());
  return constructor || error62("Unrecognized projection type: " + type3), constructor();
}
function set5(proj, key2, value3) {
  isFunction(proj[key2]) && proj[key2](value3);
}
function collectGeoJSON(data3) {
  return data3 = array_default(data3), data3.length === 1 ? data3[0] : {
    type: FeatureCollection,
    features: data3.reduce((a, f) => a.concat(featurize(f)), [])
  };
}
function featurize(f) {
  return f.type === FeatureCollection ? f.features : array_default(f).filter((d) => d != null).map((d) => d.type === Feature ? d : {
    type: Feature,
    geometry: d
  });
}

// node_modules/vega-force/build/vega-force.js
var vega_force_exports = {};
__export(vega_force_exports, {
  force: () => Force
});

// node_modules/d3-force/src/center.js
function center_default(x5, y5) {
  var nodes, strength = 1;
  x5 == null && (x5 = 0), y5 == null && (y5 = 0);
  function force() {
    var i, n = nodes.length, node2, sx = 0, sy = 0;
    for (i = 0; i < n; ++i)
      node2 = nodes[i], sx += node2.x, sy += node2.y;
    for (sx = (sx / n - x5) * strength, sy = (sy / n - y5) * strength, i = 0; i < n; ++i)
      node2 = nodes[i], node2.x -= sx, node2.y -= sy;
  }
  return force.initialize = function(_) {
    nodes = _;
  }, force.x = function(_) {
    return arguments.length ? (x5 = +_, force) : x5;
  }, force.y = function(_) {
    return arguments.length ? (y5 = +_, force) : y5;
  }, force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  }, force;
}

// node_modules/d3-quadtree/src/add.js
function add_default(d) {
  let x5 = +this._x.call(null, d), y5 = +this._y.call(null, d);
  return add4(this.cover(x5, y5), x5, y5, d);
}
function add4(tree, x5, y5, d) {
  if (isNaN(x5) || isNaN(y5)) return tree;
  var parent, node2 = tree._root, leaf = { data: d }, x06 = tree._x0, y06 = tree._y0, x12 = tree._x1, y12 = tree._y1, xm, ym, xp, yp, right, bottom, i, j2;
  if (!node2) return tree._root = leaf, tree;
  for (; node2.length; )
    if ((right = x5 >= (xm = (x06 + x12) / 2)) ? x06 = xm : x12 = xm, (bottom = y5 >= (ym = (y06 + y12) / 2)) ? y06 = ym : y12 = ym, parent = node2, !(node2 = node2[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  if (xp = +tree._x.call(null, node2.data), yp = +tree._y.call(null, node2.data), x5 === xp && y5 === yp) return leaf.next = node2, parent ? parent[i] = leaf : tree._root = leaf, tree;
  do
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4), (right = x5 >= (xm = (x06 + x12) / 2)) ? x06 = xm : x12 = xm, (bottom = y5 >= (ym = (y06 + y12) / 2)) ? y06 = ym : y12 = ym;
  while ((i = bottom << 1 | right) === (j2 = (yp >= ym) << 1 | xp >= xm));
  return parent[j2] = node2, parent[i] = leaf, tree;
}
function addAll(data3) {
  var d, i, n = data3.length, x5, y5, xz = new Array(n), yz = new Array(n), x06 = 1 / 0, y06 = 1 / 0, x12 = -1 / 0, y12 = -1 / 0;
  for (i = 0; i < n; ++i)
    isNaN(x5 = +this._x.call(null, d = data3[i])) || isNaN(y5 = +this._y.call(null, d)) || (xz[i] = x5, yz[i] = y5, x5 < x06 && (x06 = x5), x5 > x12 && (x12 = x5), y5 < y06 && (y06 = y5), y5 > y12 && (y12 = y5));
  if (x06 > x12 || y06 > y12) return this;
  for (this.cover(x06, y06).cover(x12, y12), i = 0; i < n; ++i)
    add4(this, xz[i], yz[i], data3[i]);
  return this;
}

// node_modules/d3-quadtree/src/cover.js
function cover_default(x5, y5) {
  if (isNaN(x5 = +x5) || isNaN(y5 = +y5)) return this;
  var x06 = this._x0, y06 = this._y0, x12 = this._x1, y12 = this._y1;
  if (isNaN(x06))
    x12 = (x06 = Math.floor(x5)) + 1, y12 = (y06 = Math.floor(y5)) + 1;
  else {
    for (var z2 = x12 - x06 || 1, node2 = this._root, parent, i; x06 > x5 || x5 >= x12 || y06 > y5 || y5 >= y12; )
      switch (i = (y5 < y06) << 1 | x5 < x06, parent = new Array(4), parent[i] = node2, node2 = parent, z2 *= 2, i) {
        case 0:
          x12 = x06 + z2, y12 = y06 + z2;
          break;
        case 1:
          x06 = x12 - z2, y12 = y06 + z2;
          break;
        case 2:
          x12 = x06 + z2, y06 = y12 - z2;
          break;
        case 3:
          x06 = x12 - z2, y06 = y12 - z2;
          break;
      }
    this._root && this._root.length && (this._root = node2);
  }
  return this._x0 = x06, this._y0 = y06, this._x1 = x12, this._y1 = y12, this;
}

// node_modules/d3-quadtree/src/data.js
function data_default() {
  var data3 = [];
  return this.visit(function(node2) {
    if (!node2.length) do
      data3.push(node2.data);
    while (node2 = node2.next);
  }), data3;
}

// node_modules/d3-quadtree/src/extent.js
function extent_default(_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}

// node_modules/d3-quadtree/src/quad.js
function quad_default(node2, x06, y06, x12, y12) {
  this.node = node2, this.x0 = x06, this.y0 = y06, this.x1 = x12, this.y1 = y12;
}

// node_modules/d3-quadtree/src/find.js
function find_default(x5, y5, radius2) {
  var data3, x06 = this._x0, y06 = this._y0, x12, y12, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node2 = this._root, q, i;
  for (node2 && quads.push(new quad_default(node2, x06, y06, x32, y32)), radius2 == null ? radius2 = 1 / 0 : (x06 = x5 - radius2, y06 = y5 - radius2, x32 = x5 + radius2, y32 = y5 + radius2, radius2 *= radius2); q = quads.pop(); )
    if (!(!(node2 = q.node) || (x12 = q.x0) > x32 || (y12 = q.y0) > y32 || (x22 = q.x1) < x06 || (y22 = q.y1) < y06))
      if (node2.length) {
        var xm = (x12 + x22) / 2, ym = (y12 + y22) / 2;
        quads.push(
          new quad_default(node2[3], xm, ym, x22, y22),
          new quad_default(node2[2], x12, ym, xm, y22),
          new quad_default(node2[1], xm, y12, x22, ym),
          new quad_default(node2[0], x12, y12, xm, ym)
        ), (i = (y5 >= ym) << 1 | x5 >= xm) && (q = quads[quads.length - 1], quads[quads.length - 1] = quads[quads.length - 1 - i], quads[quads.length - 1 - i] = q);
      } else {
        var dx = x5 - +this._x.call(null, node2.data), dy = y5 - +this._y.call(null, node2.data), d2 = dx * dx + dy * dy;
        if (d2 < radius2) {
          var d = Math.sqrt(radius2 = d2);
          x06 = x5 - d, y06 = y5 - d, x32 = x5 + d, y32 = y5 + d, data3 = node2.data;
        }
      }
  return data3;
}

// node_modules/d3-quadtree/src/remove.js
function remove_default(d) {
  if (isNaN(x5 = +this._x.call(null, d)) || isNaN(y5 = +this._y.call(null, d))) return this;
  var parent, node2 = this._root, retainer, previous, next, x06 = this._x0, y06 = this._y0, x12 = this._x1, y12 = this._y1, x5, y5, xm, ym, right, bottom, i, j2;
  if (!node2) return this;
  if (node2.length) for (; ; ) {
    if ((right = x5 >= (xm = (x06 + x12) / 2)) ? x06 = xm : x12 = xm, (bottom = y5 >= (ym = (y06 + y12) / 2)) ? y06 = ym : y12 = ym, parent = node2, !(node2 = node2[i = bottom << 1 | right])) return this;
    if (!node2.length) break;
    (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3]) && (retainer = parent, j2 = i);
  }
  for (; node2.data !== d; ) if (previous = node2, !(node2 = node2.next)) return this;
  return (next = node2.next) && delete node2.next, previous ? (next ? previous.next = next : delete previous.next, this) : parent ? (next ? parent[i] = next : delete parent[i], (node2 = parent[0] || parent[1] || parent[2] || parent[3]) && node2 === (parent[3] || parent[2] || parent[1] || parent[0]) && !node2.length && (retainer ? retainer[j2] = node2 : this._root = node2), this) : (this._root = next, this);
}
function removeAll(data3) {
  for (var i = 0, n = data3.length; i < n; ++i) this.remove(data3[i]);
  return this;
}

// node_modules/d3-quadtree/src/root.js
function root_default() {
  return this._root;
}

// node_modules/d3-quadtree/src/size.js
function size_default() {
  var size = 0;
  return this.visit(function(node2) {
    if (!node2.length) do
      ++size;
    while (node2 = node2.next);
  }), size;
}

// node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
  var quads = [], q, node2 = this._root, child, x06, y06, x12, y12;
  for (node2 && quads.push(new quad_default(node2, this._x0, this._y0, this._x1, this._y1)); q = quads.pop(); )
    if (!callback(node2 = q.node, x06 = q.x0, y06 = q.y0, x12 = q.x1, y12 = q.y1) && node2.length) {
      var xm = (x06 + x12) / 2, ym = (y06 + y12) / 2;
      (child = node2[3]) && quads.push(new quad_default(child, xm, ym, x12, y12)), (child = node2[2]) && quads.push(new quad_default(child, x06, ym, xm, y12)), (child = node2[1]) && quads.push(new quad_default(child, xm, y06, x12, ym)), (child = node2[0]) && quads.push(new quad_default(child, x06, y06, xm, ym));
    }
  return this;
}

// node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
  var quads = [], next = [], q;
  for (this._root && quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1)); q = quads.pop(); ) {
    var node2 = q.node;
    if (node2.length) {
      var child, x06 = q.x0, y06 = q.y0, x12 = q.x1, y12 = q.y1, xm = (x06 + x12) / 2, ym = (y06 + y12) / 2;
      (child = node2[0]) && quads.push(new quad_default(child, x06, y06, xm, ym)), (child = node2[1]) && quads.push(new quad_default(child, xm, y06, x12, ym)), (child = node2[2]) && quads.push(new quad_default(child, x06, ym, xm, y12)), (child = node2[3]) && quads.push(new quad_default(child, xm, ym, x12, y12));
    }
    next.push(q);
  }
  for (; q = next.pop(); )
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  return this;
}

// node_modules/d3-quadtree/src/x.js
function defaultX(d) {
  return d[0];
}
function x_default(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

// node_modules/d3-quadtree/src/y.js
function defaultY(d) {
  return d[1];
}
function y_default(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

// node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x5, y5) {
  var tree = new Quadtree(x5 ?? defaultX, y5 ?? defaultY, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x5, y5, x06, y06, x12, y12) {
  this._x = x5, this._y = y5, this._x0 = x06, this._y0 = y06, this._x1 = x12, this._y1 = y12, this._root = void 0;
}
function leaf_copy(leaf) {
  for (var copy5 = { data: leaf.data }, next = copy5; leaf = leaf.next; ) next = next.next = { data: leaf.data };
  return copy5;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy5 = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node2 = this._root, nodes, child;
  if (!node2) return copy5;
  if (!node2.length) return copy5._root = leaf_copy(node2), copy5;
  for (nodes = [{ source: node2, target: copy5._root = new Array(4) }]; node2 = nodes.pop(); )
    for (var i = 0; i < 4; ++i)
      (child = node2.source[i]) && (child.length ? nodes.push({ source: child, target: node2.target[i] = new Array(4) }) : node2.target[i] = leaf_copy(child));
  return copy5;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default;
treeProto.extent = extent_default;
treeProto.find = find_default;
treeProto.remove = remove_default;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;

// node_modules/d3-force/src/constant.js
function constant_default4(x5) {
  return function() {
    return x5;
  };
}

// node_modules/d3-force/src/jiggle.js
function jiggle_default(random2) {
  return (random2() - 0.5) * 1e-6;
}

// node_modules/d3-force/src/collide.js
function x3(d) {
  return d.x + d.vx;
}
function y3(d) {
  return d.y + d.vy;
}
function collide_default(radius2) {
  var nodes, radii, random2, strength = 1, iterations2 = 1;
  typeof radius2 != "function" && (radius2 = constant_default4(radius2 == null ? 1 : +radius2));
  function force() {
    for (var i, n = nodes.length, tree, node2, xi, yi, ri, ri2, k = 0; k < iterations2; ++k)
      for (tree = quadtree(nodes, x3, y3).visitAfter(prepare2), i = 0; i < n; ++i)
        node2 = nodes[i], ri = radii[node2.index], ri2 = ri * ri, xi = node2.x + node2.vx, yi = node2.y + node2.vy, tree.visit(apply4);
    function apply4(quad2, x06, y06, x12, y12) {
      var data3 = quad2.data, rj = quad2.r, r = ri + rj;
      if (data3) {
        if (data3.index > node2.index) {
          var x5 = xi - data3.x - data3.vx, y5 = yi - data3.y - data3.vy, l = x5 * x5 + y5 * y5;
          l < r * r && (x5 === 0 && (x5 = jiggle_default(random2), l += x5 * x5), y5 === 0 && (y5 = jiggle_default(random2), l += y5 * y5), l = (r - (l = Math.sqrt(l))) / l * strength, node2.vx += (x5 *= l) * (r = (rj *= rj) / (ri2 + rj)), node2.vy += (y5 *= l) * r, data3.vx -= x5 * (r = 1 - r), data3.vy -= y5 * r);
        }
        return;
      }
      return x06 > xi + r || x12 < xi - r || y06 > yi + r || y12 < yi - r;
    }
  }
  function prepare2(quad2) {
    if (quad2.data) return quad2.r = radii[quad2.data.index];
    for (var i = quad2.r = 0; i < 4; ++i)
      quad2[i] && quad2[i].r > quad2.r && (quad2.r = quad2[i].r);
  }
  function initialize3() {
    if (nodes) {
      var i, n = nodes.length, node2;
      for (radii = new Array(n), i = 0; i < n; ++i) node2 = nodes[i], radii[node2.index] = +radius2(node2, i, nodes);
    }
  }
  return force.initialize = function(_nodes, _random) {
    nodes = _nodes, random2 = _random, initialize3();
  }, force.iterations = function(_) {
    return arguments.length ? (iterations2 = +_, force) : iterations2;
  }, force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  }, force.radius = function(_) {
    return arguments.length ? (radius2 = typeof _ == "function" ? _ : constant_default4(+_), initialize3(), force) : radius2;
  }, force;
}

// node_modules/d3-force/src/link.js
function index(d) {
  return d.index;
}
function find2(nodeById, nodeId) {
  var node2 = nodeById.get(nodeId);
  if (!node2) throw new Error("node not found: " + nodeId);
  return node2;
}
function link_default(links) {
  var id3 = index, strength = defaultStrength, strengths, distance = constant_default4(30), distances, nodes, count4, bias, random2, iterations2 = 1;
  links == null && (links = []);
  function defaultStrength(link2) {
    return 1 / Math.min(count4[link2.source.index], count4[link2.target.index]);
  }
  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations2; ++k)
      for (var i = 0, link2, source4, target3, x5, y5, l, b10; i < n; ++i)
        link2 = links[i], source4 = link2.source, target3 = link2.target, x5 = target3.x + target3.vx - source4.x - source4.vx || jiggle_default(random2), y5 = target3.y + target3.vy - source4.y - source4.vy || jiggle_default(random2), l = Math.sqrt(x5 * x5 + y5 * y5), l = (l - distances[i]) / l * alpha * strengths[i], x5 *= l, y5 *= l, target3.vx -= x5 * (b10 = bias[i]), target3.vy -= y5 * b10, source4.vx += x5 * (b10 = 1 - b10), source4.vy += y5 * b10;
  }
  function initialize3() {
    if (nodes) {
      var i, n = nodes.length, m = links.length, nodeById = new Map(nodes.map((d, i2) => [id3(d, i2, nodes), d])), link2;
      for (i = 0, count4 = new Array(n); i < m; ++i)
        link2 = links[i], link2.index = i, typeof link2.source != "object" && (link2.source = find2(nodeById, link2.source)), typeof link2.target != "object" && (link2.target = find2(nodeById, link2.target)), count4[link2.source.index] = (count4[link2.source.index] || 0) + 1, count4[link2.target.index] = (count4[link2.target.index] || 0) + 1;
      for (i = 0, bias = new Array(m); i < m; ++i)
        link2 = links[i], bias[i] = count4[link2.source.index] / (count4[link2.source.index] + count4[link2.target.index]);
      strengths = new Array(m), initializeStrength(), distances = new Array(m), initializeDistance();
    }
  }
  function initializeStrength() {
    if (nodes)
      for (var i = 0, n = links.length; i < n; ++i)
        strengths[i] = +strength(links[i], i, links);
  }
  function initializeDistance() {
    if (nodes)
      for (var i = 0, n = links.length; i < n; ++i)
        distances[i] = +distance(links[i], i, links);
  }
  return force.initialize = function(_nodes, _random) {
    nodes = _nodes, random2 = _random, initialize3();
  }, force.links = function(_) {
    return arguments.length ? (links = _, initialize3(), force) : links;
  }, force.id = function(_) {
    return arguments.length ? (id3 = _, force) : id3;
  }, force.iterations = function(_) {
    return arguments.length ? (iterations2 = +_, force) : iterations2;
  }, force.strength = function(_) {
    return arguments.length ? (strength = typeof _ == "function" ? _ : constant_default4(+_), initializeStrength(), force) : strength;
  }, force.distance = function(_) {
    return arguments.length ? (distance = typeof _ == "function" ? _ : constant_default4(+_), initializeDistance(), force) : distance;
  }, force;
}

// node_modules/d3-dispatch/src/dispatch.js
var noop4 = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name2 = "", i = t.indexOf(".");
    if (i >= 0 && (name2 = t.slice(i + 1), t = t.slice(0, i)), t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name: name2 };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      for (; ++i < n; ) if ((t = (typename = T[i]).type) && (t = get5(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback != "function") throw new Error("invalid callback: " + callback);
    for (; ++i < n; )
      if (t = (typename = T[i]).type) _[t] = set6(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set6(_[t], typename.name, null);
    return this;
  },
  copy: function() {
    var copy5 = {}, _ = this._;
    for (var t in _) copy5[t] = _[t].slice();
    return new Dispatch(copy5);
  },
  call: function(type3, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type3)) throw new Error("unknown type: " + type3);
    for (t = this._[type3], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type3, that, args) {
    if (!this._.hasOwnProperty(type3)) throw new Error("unknown type: " + type3);
    for (var t = this._[type3], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get5(type3, name2) {
  for (var i = 0, n = type3.length, c; i < n; ++i)
    if ((c = type3[i]).name === name2)
      return c.value;
}
function set6(type3, name2, callback) {
  for (var i = 0, n = type3.length; i < n; ++i)
    if (type3[i].name === name2) {
      type3[i] = noop4, type3 = type3.slice(0, i).concat(type3.slice(i + 1));
      break;
    }
  return callback != null && type3.push({ name: name2, value: callback }), type3;
}
var dispatch_default = dispatch;

// node_modules/d3-timer/src/timer.js
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance == "object" && performance.now ? performance : Date, setFrame = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay2, time6) {
    if (typeof callback != "function") throw new TypeError("callback is not a function");
    time6 = (time6 == null ? now() : +time6) + (delay2 == null ? 0 : +delay2), !this._next && taskTail !== this && (taskTail ? taskTail._next = this : taskHead = this, taskTail = this), this._call = callback, this._time = time6, sleep3();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, sleep3());
  }
};
function timer(callback, delay2, time6) {
  var t = new Timer();
  return t.restart(callback, delay2, time6), t;
}
function timerFlush() {
  now(), ++frame;
  for (var t = taskHead, e; t; )
    (e = clockNow - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew, frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0, nap(), clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay2 = now2 - clockLast;
  delay2 > pokeDelay && (clockSkew -= delay2, clockLast = now2);
}
function nap() {
  for (var t04, t13 = taskHead, t22, time6 = 1 / 0; t13; )
    t13._call ? (time6 > t13._time && (time6 = t13._time), t04 = t13, t13 = t13._next) : (t22 = t13._next, t13._next = null, t13 = t04 ? t04._next = t22 : taskHead = t22);
  taskTail = t04, sleep3(time6);
}
function sleep3(time6) {
  if (!frame) {
    timeout && (timeout = clearTimeout(timeout));
    var delay2 = time6 - clockNow;
    delay2 > 24 ? (time6 < 1 / 0 && (timeout = setTimeout(wake, time6 - clock.now() - clockSkew)), interval && (interval = clearInterval(interval))) : (interval || (clockLast = clock.now(), interval = setInterval(poke, pokeDelay)), frame = 1, setFrame(wake));
  }
}

// node_modules/d3-timer/src/interval.js
function interval_default(callback, delay2, time6) {
  var t = new Timer(), total = delay2;
  return delay2 == null ? (t.restart(callback, delay2, time6), t) : (t._restart = t.restart, t.restart = function(callback2, delay3, time7) {
    delay3 = +delay3, time7 = time7 == null ? now() : +time7, t._restart(function tick2(elapsed) {
      elapsed += total, t._restart(tick2, total += delay3, time7), callback2(elapsed);
    }, delay3, time7);
  }, t.restart(callback, delay2, time6), t);
}

// node_modules/d3-force/src/lcg.js
function lcg_default() {
  let s = 1;
  return () => (s = (1664525 * s + 1013904223) % 4294967296) / 4294967296;
}

// node_modules/d3-force/src/simulation.js
function x4(d) {
  return d.x;
}
function y4(d) {
  return d.y;
}
var initialRadius = 10, initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation_default(nodes) {
  var simulation2, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event2 = dispatch_default("tick", "end"), random2 = lcg_default();
  nodes == null && (nodes = []);
  function step() {
    tick2(), event2.call("tick", simulation2), alpha < alphaMin && (stepper.stop(), event2.call("end", simulation2));
  }
  function tick2(iterations2) {
    var i, n = nodes.length, node2;
    iterations2 === void 0 && (iterations2 = 1);
    for (var k = 0; k < iterations2; ++k)
      for (alpha += (alphaTarget - alpha) * alphaDecay, forces.forEach(function(force) {
        force(alpha);
      }), i = 0; i < n; ++i)
        node2 = nodes[i], node2.fx == null ? node2.x += node2.vx *= velocityDecay : (node2.x = node2.fx, node2.vx = 0), node2.fy == null ? node2.y += node2.vy *= velocityDecay : (node2.y = node2.fy, node2.vy = 0);
    return simulation2;
  }
  function initializeNodes() {
    for (var i = 0, n = nodes.length, node2; i < n; ++i) {
      if (node2 = nodes[i], node2.index = i, node2.fx != null && (node2.x = node2.fx), node2.fy != null && (node2.y = node2.fy), isNaN(node2.x) || isNaN(node2.y)) {
        var radius2 = initialRadius * Math.sqrt(0.5 + i), angle2 = i * initialAngle;
        node2.x = radius2 * Math.cos(angle2), node2.y = radius2 * Math.sin(angle2);
      }
      (isNaN(node2.vx) || isNaN(node2.vy)) && (node2.vx = node2.vy = 0);
    }
  }
  function initializeForce(force) {
    return force.initialize && force.initialize(nodes, random2), force;
  }
  return initializeNodes(), simulation2 = {
    tick: tick2,
    restart: function() {
      return stepper.restart(step), simulation2;
    },
    stop: function() {
      return stepper.stop(), simulation2;
    },
    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation2) : nodes;
    },
    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation2) : alpha;
    },
    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation2) : alphaMin;
    },
    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation2) : +alphaDecay;
    },
    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation2) : alphaTarget;
    },
    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation2) : 1 - velocityDecay;
    },
    randomSource: function(_) {
      return arguments.length ? (random2 = _, forces.forEach(initializeForce), simulation2) : random2;
    },
    force: function(name2, _) {
      return arguments.length > 1 ? (_ == null ? forces.delete(name2) : forces.set(name2, initializeForce(_)), simulation2) : forces.get(name2);
    },
    find: function(x5, y5, radius2) {
      var i = 0, n = nodes.length, dx, dy, d2, node2, closest;
      for (radius2 == null ? radius2 = 1 / 0 : radius2 *= radius2, i = 0; i < n; ++i)
        node2 = nodes[i], dx = x5 - node2.x, dy = y5 - node2.y, d2 = dx * dx + dy * dy, d2 < radius2 && (closest = node2, radius2 = d2);
      return closest;
    },
    on: function(name2, _) {
      return arguments.length > 1 ? (event2.on(name2, _), simulation2) : event2.on(name2);
    }
  };
}

// node_modules/d3-force/src/manyBody.js
function manyBody_default() {
  var nodes, node2, random2, alpha, strength = constant_default4(-30), strengths, distanceMin2 = 1, distanceMax2 = 1 / 0, theta2 = 0.81;
  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x4, y4).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node2 = nodes[i], tree.visit(apply4);
  }
  function initialize3() {
    if (nodes) {
      var i, n = nodes.length, node3;
      for (strengths = new Array(n), i = 0; i < n; ++i) node3 = nodes[i], strengths[node3.index] = +strength(node3, i, nodes);
    }
  }
  function accumulate(quad2) {
    var strength2 = 0, q, c, weight = 0, x5, y5, i;
    if (quad2.length) {
      for (x5 = y5 = i = 0; i < 4; ++i)
        (q = quad2[i]) && (c = Math.abs(q.value)) && (strength2 += q.value, weight += c, x5 += c * q.x, y5 += c * q.y);
      quad2.x = x5 / weight, quad2.y = y5 / weight;
    } else {
      q = quad2, q.x = q.data.x, q.y = q.data.y;
      do
        strength2 += strengths[q.data.index];
      while (q = q.next);
    }
    quad2.value = strength2;
  }
  function apply4(quad2, x12, _, x22) {
    if (!quad2.value) return !0;
    var x5 = quad2.x - node2.x, y5 = quad2.y - node2.y, w2 = x22 - x12, l = x5 * x5 + y5 * y5;
    if (w2 * w2 / theta2 < l)
      return l < distanceMax2 && (x5 === 0 && (x5 = jiggle_default(random2), l += x5 * x5), y5 === 0 && (y5 = jiggle_default(random2), l += y5 * y5), l < distanceMin2 && (l = Math.sqrt(distanceMin2 * l)), node2.vx += x5 * quad2.value * alpha / l, node2.vy += y5 * quad2.value * alpha / l), !0;
    if (quad2.length || l >= distanceMax2) return;
    (quad2.data !== node2 || quad2.next) && (x5 === 0 && (x5 = jiggle_default(random2), l += x5 * x5), y5 === 0 && (y5 = jiggle_default(random2), l += y5 * y5), l < distanceMin2 && (l = Math.sqrt(distanceMin2 * l)));
    do
      quad2.data !== node2 && (w2 = strengths[quad2.data.index] * alpha / l, node2.vx += x5 * w2, node2.vy += y5 * w2);
    while (quad2 = quad2.next);
  }
  return force.initialize = function(_nodes, _random) {
    nodes = _nodes, random2 = _random, initialize3();
  }, force.strength = function(_) {
    return arguments.length ? (strength = typeof _ == "function" ? _ : constant_default4(+_), initialize3(), force) : strength;
  }, force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  }, force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  }, force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  }, force;
}

// node_modules/d3-force/src/x.js
function x_default2(x5) {
  var strength = constant_default4(0.1), nodes, strengths, xz;
  typeof x5 != "function" && (x5 = constant_default4(x5 == null ? 0 : +x5));
  function force(alpha) {
    for (var i = 0, n = nodes.length, node2; i < n; ++i)
      node2 = nodes[i], node2.vx += (xz[i] - node2.x) * strengths[i] * alpha;
  }
  function initialize3() {
    if (nodes) {
      var i, n = nodes.length;
      for (strengths = new Array(n), xz = new Array(n), i = 0; i < n; ++i)
        strengths[i] = isNaN(xz[i] = +x5(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  return force.initialize = function(_) {
    nodes = _, initialize3();
  }, force.strength = function(_) {
    return arguments.length ? (strength = typeof _ == "function" ? _ : constant_default4(+_), initialize3(), force) : strength;
  }, force.x = function(_) {
    return arguments.length ? (x5 = typeof _ == "function" ? _ : constant_default4(+_), initialize3(), force) : x5;
  }, force;
}

// node_modules/d3-force/src/y.js
function y_default2(y5) {
  var strength = constant_default4(0.1), nodes, strengths, yz;
  typeof y5 != "function" && (y5 = constant_default4(y5 == null ? 0 : +y5));
  function force(alpha) {
    for (var i = 0, n = nodes.length, node2; i < n; ++i)
      node2 = nodes[i], node2.vy += (yz[i] - node2.y) * strengths[i] * alpha;
  }
  function initialize3() {
    if (nodes) {
      var i, n = nodes.length;
      for (strengths = new Array(n), yz = new Array(n), i = 0; i < n; ++i)
        strengths[i] = isNaN(yz[i] = +y5(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }
  return force.initialize = function(_) {
    nodes = _, initialize3();
  }, force.strength = function(_) {
    return arguments.length ? (strength = typeof _ == "function" ? _ : constant_default4(+_), initialize3(), force) : strength;
  }, force.y = function(_) {
    return arguments.length ? (y5 = typeof _ == "function" ? _ : constant_default4(+_), initialize3(), force) : y5;
  }, force;
}

// node_modules/vega-force/build/vega-force.js
var ForceMap = {
  center: center_default,
  collide: collide_default,
  nbody: manyBody_default,
  link: link_default,
  x: x_default2,
  y: y_default2
}, Forces = "forces", ForceParams = ["alpha", "alphaMin", "alphaTarget", "velocityDecay", "forces"], ForceConfig = ["static", "iterations"], ForceOutput = ["x", "y", "vx", "vy"];
function Force(params2) {
  Transform.call(this, null, params2);
}
Force.Definition = {
  type: "Force",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "static",
    type: "boolean",
    default: !1
  }, {
    name: "restart",
    type: "boolean",
    default: !1
  }, {
    name: "iterations",
    type: "number",
    default: 300
  }, {
    name: "alpha",
    type: "number",
    default: 1
  }, {
    name: "alphaMin",
    type: "number",
    default: 1e-3
  }, {
    name: "alphaTarget",
    type: "number",
    default: 0
  }, {
    name: "velocityDecay",
    type: "number",
    default: 0.4
  }, {
    name: "forces",
    type: "param",
    array: !0,
    params: [{
      key: {
        force: "center"
      },
      params: [{
        name: "x",
        type: "number",
        default: 0
      }, {
        name: "y",
        type: "number",
        default: 0
      }]
    }, {
      key: {
        force: "collide"
      },
      params: [{
        name: "radius",
        type: "number",
        expr: !0
      }, {
        name: "strength",
        type: "number",
        default: 0.7
      }, {
        name: "iterations",
        type: "number",
        default: 1
      }]
    }, {
      key: {
        force: "nbody"
      },
      params: [{
        name: "strength",
        type: "number",
        default: -30,
        expr: !0
      }, {
        name: "theta",
        type: "number",
        default: 0.9
      }, {
        name: "distanceMin",
        type: "number",
        default: 1
      }, {
        name: "distanceMax",
        type: "number"
      }]
    }, {
      key: {
        force: "link"
      },
      params: [{
        name: "links",
        type: "data"
      }, {
        name: "id",
        type: "field"
      }, {
        name: "distance",
        type: "number",
        default: 30,
        expr: !0
      }, {
        name: "strength",
        type: "number",
        expr: !0
      }, {
        name: "iterations",
        type: "number",
        default: 1
      }]
    }, {
      key: {
        force: "x"
      },
      params: [{
        name: "strength",
        type: "number",
        default: 0.1
      }, {
        name: "x",
        type: "field"
      }]
    }, {
      key: {
        force: "y"
      },
      params: [{
        name: "strength",
        type: "number",
        default: 0.1
      }, {
        name: "y",
        type: "field"
      }]
    }]
  }, {
    name: "as",
    type: "string",
    array: !0,
    modify: !1,
    default: ForceOutput
  }]
};
inherits_default(Force, Transform, {
  transform(_, pulse2) {
    var sim = this.value, change2 = pulse2.changed(pulse2.ADD_REM), params2 = _.modified(ForceParams), iters = _.iterations || 300;
    if (sim ? (change2 && (pulse2.modifies("index"), sim.nodes(pulse2.source)), (params2 || pulse2.changed(pulse2.MOD)) && setup2(sim, _, 0, pulse2)) : (this.value = sim = simulation(pulse2.source, _), sim.on("tick", rerun(pulse2.dataflow, this)), _.static || (change2 = !0, sim.tick()), pulse2.modifies("index")), params2 || change2 || _.modified(ForceConfig) || pulse2.changed() && _.restart) {
      if (sim.alpha(Math.max(sim.alpha(), _.alpha || 1)).alphaDecay(1 - Math.pow(sim.alphaMin(), 1 / iters)), _.static)
        for (sim.stop(); --iters >= 0; ) sim.tick();
      else if (sim.stopped() && sim.restart(), !change2) return pulse2.StopPropagation;
    }
    return this.finish(_, pulse2);
  },
  finish(_, pulse2) {
    let dataflow = pulse2.dataflow;
    for (let args = this._argops, j2 = 0, m = args.length, arg; j2 < m; ++j2)
      if (arg = args[j2], !(arg.name !== Forces || arg.op._argval.force !== "link")) {
        for (var ops2 = arg.op._argops, i = 0, n = ops2.length, op; i < n; ++i)
          if (ops2[i].name === "links" && (op = ops2[i].op.source)) {
            dataflow.pulse(op, dataflow.changeset().reflow());
            break;
          }
      }
    return pulse2.reflow(_.modified()).modifies(ForceOutput);
  }
});
function rerun(df, op) {
  return () => df.touch(op).run();
}
function simulation(nodes, _) {
  let sim = simulation_default(nodes), stop2 = sim.stop, restart = sim.restart, stopped = !1;
  return sim.stopped = () => stopped, sim.restart = () => (stopped = !1, restart()), sim.stop = () => (stopped = !0, stop2()), setup2(sim, _, !0).on("end", () => stopped = !0);
}
function setup2(sim, _, init2, pulse2) {
  var f = array_default(_.forces), i, n, p, name2;
  for (i = 0, n = ForceParams.length; i < n; ++i)
    p = ForceParams[i], p !== Forces && _.modified(p) && sim[p](_[p]);
  for (i = 0, n = f.length; i < n; ++i)
    name2 = Forces + i, p = init2 || _.modified(Forces, i) ? getForce(f[i]) : pulse2 && modified(f[i], pulse2) ? sim.force(name2) : null, p && sim.force(name2, p);
  for (n = sim.numForces || 0; i < n; ++i)
    sim.force(Forces + i, null);
  return sim.numForces = f.length, sim;
}
function modified(f, pulse2) {
  var k, v2;
  for (k in f)
    if (isFunction(v2 = f[k]) && pulse2.modified(accessorFields(v2))) return 1;
  return 0;
}
function getForce(_) {
  var f, p;
  hasOwnProperty(ForceMap, _.force) || error62("Unrecognized force: " + _.force), f = ForceMap[_.force]();
  for (p in _)
    isFunction(f[p]) && setForceParam(f[p], _[p], _);
  return f;
}
function setForceParam(f, v2, _) {
  f(isFunction(v2) ? (d) => v2(d, _) : v2);
}

// node_modules/vega-hierarchy/build/vega-hierarchy.js
var vega_hierarchy_exports = {};
__export(vega_hierarchy_exports, {
  nest: () => Nest,
  pack: () => Pack,
  partition: () => Partition,
  stratify: () => Stratify,
  tree: () => Tree,
  treelinks: () => TreeLinks,
  treemap: () => Treemap
});

// node_modules/d3-hierarchy/src/cluster.js
function defaultSeparation(a, b10) {
  return a.parent === b10.parent ? 1 : 2;
}
function meanX(children4) {
  return children4.reduce(meanXReduce, 0) / children4.length;
}
function meanXReduce(x5, c) {
  return x5 + c.x;
}
function maxY(children4) {
  return 1 + children4.reduce(maxYReduce, 0);
}
function maxYReduce(y5, c) {
  return Math.max(y5, c.y);
}
function leafLeft(node2) {
  for (var children4; children4 = node2.children; ) node2 = children4[0];
  return node2;
}
function leafRight(node2) {
  for (var children4; children4 = node2.children; ) node2 = children4[children4.length - 1];
  return node2;
}
function cluster_default() {
  var separation = defaultSeparation, dx = 1, dy = 1, nodeSize = !1;
  function cluster(root2) {
    var previousNode, x5 = 0;
    root2.eachAfter(function(node2) {
      var children4 = node2.children;
      children4 ? (node2.x = meanX(children4), node2.y = maxY(children4)) : (node2.x = previousNode ? x5 += separation(node2, previousNode) : 0, node2.y = 0, previousNode = node2);
    });
    var left = leafLeft(root2), right = leafRight(root2), x06 = left.x - separation(left, right) / 2, x12 = right.x + separation(right, left) / 2;
    return root2.eachAfter(nodeSize ? function(node2) {
      node2.x = (node2.x - root2.x) * dx, node2.y = (root2.y - node2.y) * dy;
    } : function(node2) {
      node2.x = (node2.x - x06) / (x12 - x06) * dx, node2.y = (1 - (root2.y ? node2.y / root2.y : 1)) * dy;
    });
  }
  return cluster.separation = function(x5) {
    return arguments.length ? (separation = x5, cluster) : separation;
  }, cluster.size = function(x5) {
    return arguments.length ? (nodeSize = !1, dx = +x5[0], dy = +x5[1], cluster) : nodeSize ? null : [dx, dy];
  }, cluster.nodeSize = function(x5) {
    return arguments.length ? (nodeSize = !0, dx = +x5[0], dy = +x5[1], cluster) : nodeSize ? [dx, dy] : null;
  }, cluster;
}

// node_modules/d3-hierarchy/src/hierarchy/count.js
function count3(node2) {
  var sum3 = 0, children4 = node2.children, i = children4 && children4.length;
  if (!i) sum3 = 1;
  else for (; --i >= 0; ) sum3 += children4[i].value;
  node2.value = sum3;
}
function count_default() {
  return this.eachAfter(count3);
}

// node_modules/d3-hierarchy/src/hierarchy/each.js
function each_default(callback, that) {
  let index4 = -1;
  for (let node2 of this)
    callback.call(that, node2, ++index4, this);
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/eachBefore.js
function eachBefore_default(callback, that) {
  for (var node2 = this, nodes = [node2], children4, i, index4 = -1; node2 = nodes.pop(); )
    if (callback.call(that, node2, ++index4, this), children4 = node2.children)
      for (i = children4.length - 1; i >= 0; --i)
        nodes.push(children4[i]);
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/eachAfter.js
function eachAfter_default(callback, that) {
  for (var node2 = this, nodes = [node2], next = [], children4, i, n, index4 = -1; node2 = nodes.pop(); )
    if (next.push(node2), children4 = node2.children)
      for (i = 0, n = children4.length; i < n; ++i)
        nodes.push(children4[i]);
  for (; node2 = next.pop(); )
    callback.call(that, node2, ++index4, this);
  return this;
}

// node_modules/d3-hierarchy/src/hierarchy/find.js
function find_default2(callback, that) {
  let index4 = -1;
  for (let node2 of this)
    if (callback.call(that, node2, ++index4, this))
      return node2;
}

// node_modules/d3-hierarchy/src/hierarchy/sum.js
function sum_default(value3) {
  return this.eachAfter(function(node2) {
    for (var sum3 = +value3(node2.data) || 0, children4 = node2.children, i = children4 && children4.length; --i >= 0; ) sum3 += children4[i].value;
    node2.value = sum3;
  });
}

// node_modules/d3-hierarchy/src/hierarchy/sort.js
function sort_default(compare3) {
  return this.eachBefore(function(node2) {
    node2.children && node2.children.sort(compare3);
  });
}

// node_modules/d3-hierarchy/src/hierarchy/path.js
function path_default2(end) {
  for (var start = this, ancestor = leastCommonAncestor(start, end), nodes = [start]; start !== ancestor; )
    start = start.parent, nodes.push(start);
  for (var k = nodes.length; end !== ancestor; )
    nodes.splice(k, 0, end), end = end.parent;
  return nodes;
}
function leastCommonAncestor(a, b10) {
  if (a === b10) return a;
  var aNodes = a.ancestors(), bNodes = b10.ancestors(), c = null;
  for (a = aNodes.pop(), b10 = bNodes.pop(); a === b10; )
    c = a, a = aNodes.pop(), b10 = bNodes.pop();
  return c;
}

// node_modules/d3-hierarchy/src/hierarchy/ancestors.js
function ancestors_default() {
  for (var node2 = this, nodes = [node2]; node2 = node2.parent; )
    nodes.push(node2);
  return nodes;
}

// node_modules/d3-hierarchy/src/hierarchy/descendants.js
function descendants_default() {
  return Array.from(this);
}

// node_modules/d3-hierarchy/src/hierarchy/leaves.js
function leaves_default() {
  var leaves = [];
  return this.eachBefore(function(node2) {
    node2.children || leaves.push(node2);
  }), leaves;
}

// node_modules/d3-hierarchy/src/hierarchy/links.js
function links_default() {
  var root2 = this, links = [];
  return root2.each(function(node2) {
    node2 !== root2 && links.push({ source: node2.parent, target: node2 });
  }), links;
}

// node_modules/d3-hierarchy/src/hierarchy/iterator.js
function* iterator_default() {
  var node2 = this, current2, next = [node2], children4, i, n;
  do
    for (current2 = next.reverse(), next = []; node2 = current2.pop(); )
      if (yield node2, children4 = node2.children)
        for (i = 0, n = children4.length; i < n; ++i)
          next.push(children4[i]);
  while (next.length);
}

// node_modules/d3-hierarchy/src/hierarchy/index.js
function hierarchy(data3, children4) {
  data3 instanceof Map ? (data3 = [void 0, data3], children4 === void 0 && (children4 = mapChildren)) : children4 === void 0 && (children4 = objectChildren);
  for (var root2 = new Node(data3), node2, nodes = [root2], child, childs, i, n; node2 = nodes.pop(); )
    if ((childs = children4(node2.data)) && (n = (childs = Array.from(childs)).length))
      for (node2.children = childs, i = n - 1; i >= 0; --i)
        nodes.push(child = childs[i] = new Node(childs[i])), child.parent = node2, child.depth = node2.depth + 1;
  return root2.eachBefore(computeHeight);
}
function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}
function objectChildren(d) {
  return d.children;
}
function mapChildren(d) {
  return Array.isArray(d) ? d[1] : null;
}
function copyData(node2) {
  node2.data.value !== void 0 && (node2.value = node2.data.value), node2.data = node2.data.data;
}
function computeHeight(node2) {
  var height2 = 0;
  do
    node2.height = height2;
  while ((node2 = node2.parent) && node2.height < ++height2);
}
function Node(data3) {
  this.data = data3, this.depth = this.height = 0, this.parent = null;
}
Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: count_default,
  each: each_default,
  eachAfter: eachAfter_default,
  eachBefore: eachBefore_default,
  find: find_default2,
  sum: sum_default,
  sort: sort_default,
  path: path_default2,
  ancestors: ancestors_default,
  descendants: descendants_default,
  leaves: leaves_default,
  links: links_default,
  copy: node_copy,
  [Symbol.iterator]: iterator_default
};

// node_modules/d3-hierarchy/src/accessors.js
function optional2(f) {
  return f == null ? null : required2(f);
}
function required2(f) {
  if (typeof f != "function") throw new Error();
  return f;
}

// node_modules/d3-hierarchy/src/constant.js
function constantZero() {
  return 0;
}
function constant_default5(x5) {
  return function() {
    return x5;
  };
}

// node_modules/d3-hierarchy/src/lcg.js
function lcg_default2() {
  let s = 1;
  return () => (s = (1664525 * s + 1013904223) % 4294967296) / 4294967296;
}

// node_modules/d3-hierarchy/src/array.js
function array_default4(x5) {
  return typeof x5 == "object" && "length" in x5 ? x5 : Array.from(x5);
}
function shuffle(array4, random2) {
  let m = array4.length, t, i;
  for (; m; )
    i = random2() * m-- | 0, t = array4[m], array4[m] = array4[i], array4[i] = t;
  return array4;
}

// node_modules/d3-hierarchy/src/pack/enclose.js
function packEncloseRandom(circles, random2) {
  for (var i = 0, n = (circles = shuffle(Array.from(circles), random2)).length, B3 = [], p, e; i < n; )
    p = circles[i], e && enclosesWeak(e, p) ? ++i : (e = encloseBasis(B3 = extendBasis(B3, p)), i = 0);
  return e;
}
function extendBasis(B3, p) {
  var i, j2;
  if (enclosesWeakAll(p, B3)) return [p];
  for (i = 0; i < B3.length; ++i)
    if (enclosesNot(p, B3[i]) && enclosesWeakAll(encloseBasis2(B3[i], p), B3))
      return [B3[i], p];
  for (i = 0; i < B3.length - 1; ++i)
    for (j2 = i + 1; j2 < B3.length; ++j2)
      if (enclosesNot(encloseBasis2(B3[i], B3[j2]), p) && enclosesNot(encloseBasis2(B3[i], p), B3[j2]) && enclosesNot(encloseBasis2(B3[j2], p), B3[i]) && enclosesWeakAll(encloseBasis3(B3[i], B3[j2], p), B3))
        return [B3[i], B3[j2], p];
  throw new Error();
}
function enclosesNot(a, b10) {
  var dr = a.r - b10.r, dx = b10.x - a.x, dy = b10.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}
function enclosesWeak(a, b10) {
  var dr = a.r - b10.r + Math.max(a.r, b10.r, 1) * 1e-9, dx = b10.x - a.x, dy = b10.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function enclosesWeakAll(a, B3) {
  for (var i = 0; i < B3.length; ++i)
    if (!enclosesWeak(a, B3[i]))
      return !1;
  return !0;
}
function encloseBasis(B3) {
  switch (B3.length) {
    case 1:
      return encloseBasis1(B3[0]);
    case 2:
      return encloseBasis2(B3[0], B3[1]);
    case 3:
      return encloseBasis3(B3[0], B3[1], B3[2]);
  }
}
function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}
function encloseBasis2(a, b10) {
  var x12 = a.x, y12 = a.y, r1 = a.r, x22 = b10.x, y22 = b10.y, r2 = b10.r, x21 = x22 - x12, y21 = y22 - y12, r21 = r2 - r1, l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x12 + x22 + x21 / l * r21) / 2,
    y: (y12 + y22 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}
function encloseBasis3(a, b10, c) {
  var x12 = a.x, y12 = a.y, r1 = a.r, x22 = b10.x, y22 = b10.y, r2 = b10.r, x32 = c.x, y32 = c.y, r3 = c.r, a2 = x12 - x22, a3 = x12 - x32, b22 = y12 - y22, b32 = y12 - y32, c2 = r2 - r1, c3 = r3 - r1, d1 = x12 * x12 + y12 * y12 - r1 * r1, d2 = d1 - x22 * x22 - y22 * y22 + r2 * r2, d3 = d1 - x32 * x32 - y32 * y32 + r3 * r3, ab4 = a3 * b22 - a2 * b32, xa = (b22 * d3 - b32 * d2) / (ab4 * 2) - x12, xb = (b32 * c2 - b22 * c3) / ab4, ya = (a3 * d2 - a2 * d3) / (ab4 * 2) - y12, yb = (a2 * c3 - a3 * c2) / ab4, A5 = xb * xb + yb * yb - 1, B3 = 2 * (r1 + xa * xb + ya * yb), C3 = xa * xa + ya * ya - r1 * r1, r = -(Math.abs(A5) > 1e-6 ? (B3 + Math.sqrt(B3 * B3 - 4 * A5 * C3)) / (2 * A5) : C3 / B3);
  return {
    x: x12 + xa + xb * r,
    y: y12 + ya + yb * r,
    r
  };
}
// End of bundle text, part 10 of 15
export { Bound, Identifier, Mark, Node, Overlap, Render, RenderType, ViewLayout, area_default2, array_default4,
  bounds_default, centroid_default, cluster_default, computeHeight, constantZero, constant_default5, hierarchy,
  intersect2, interval_default, lcg_default2, optional2, packEncloseRandom, renderModule, required2,
  vega_encode_exports, vega_force_exports, vega_geo_exports, vega_hierarchy_exports };
