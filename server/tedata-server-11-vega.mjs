// ToolsEnabled Data server, part 11 of 15: Vega and d3, which draw charts (lines 46940-52045 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-10-vega.mjs";
import { __export } from "./tedata-server-01-ajv.mjs";
import { DisallowedObjectProperties, EventStream, Transform, accessor, accessorName, array_default, ascending,
  bisectLeft, bisector, changeset, clampRange, compare, constant, constant_default, cumulativeLogNormal,
  cumulativeNormal, cumulativeUniform, dayofyear, debounce, densityLogNormal, densityNormal, densityUniform, error62,
  exp2, extend2, extent, field, flush_default, hasOwnProperty, identity6, ingest$1, inherits_default, inrange,
  intersection2, isArray, isBoolean, isChangeSet, isDate, isFunction, isNumber, isObject2, isRegExp, isString,
  isTuple, isoweek, key, lerp_default, linear, loess, log3, one, pad, panLinear, panLog, panPow, panSymlog, peek,
  permute, poly, pow2, quad, quantileLogNormal, quantileNormal, quantileUniform, quarter, random, range2, rederive,
  sampleCurve, sampleLogNormal, sampleNormal, sampleUniform, span_default, stableCompare, stringValue, tickStep,
  timeOffset, timeSequence, timeUnitSpecifier, toBoolean, toDate, toNumber, toSet, toString, transforms, truncate,
  truthy, tupleid, union2, utcOffset, utcSequence, utcdayofyear, utcisoweek, utcquarter, utcweek, week, zoomLinear,
  zoomLog, zoomPow, zoomSymlog } from "./tedata-server-08-vega.mjs";
import { Bounds, CanvasHandler, Gradient, Marks, bandSpace, canvas, hcl, hsl, isRegisteredScale, lab, parse6,
  pathRender, point6, rgb, scale, scaleFraction, textMetrics } from "./tedata-server-09-vega.mjs";
import { Node, RenderType, area_default2, array_default4, bounds_default, centroid_default, cluster_default,
  computeHeight, constantZero, constant_default5, hierarchy, intersect2, interval_default, lcg_default2, optional2,
  packEncloseRandom, renderModule, required2 } from "./tedata-server-10-vega.mjs";
// Bundle text, part 11 of 15

// node_modules/d3-hierarchy/src/pack/siblings.js
function place(b10, a, c) {
  var dx = b10.x - a.x, x5, a2, dy = b10.y - a.y, y5, b22, d2 = dx * dx + dy * dy;
  d2 ? (a2 = a.r + c.r, a2 *= a2, b22 = b10.r + c.r, b22 *= b22, a2 > b22 ? (x5 = (d2 + b22 - a2) / (2 * d2), y5 = Math.sqrt(Math.max(0, b22 / d2 - x5 * x5)), c.x = b10.x - x5 * dx - y5 * dy, c.y = b10.y - x5 * dy + y5 * dx) : (x5 = (d2 + a2 - b22) / (2 * d2), y5 = Math.sqrt(Math.max(0, a2 / d2 - x5 * x5)), c.x = a.x + x5 * dx - y5 * dy, c.y = a.y + x5 * dy + y5 * dx)) : (c.x = a.x + c.r, c.y = a.y);
}
function intersects(a, b10) {
  var dr = a.r + b10.r - 1e-6, dx = b10.x - a.x, dy = b10.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function score(node2) {
  var a = node2._, b10 = node2.next._, ab4 = a.r + b10.r, dx = (a.x * b10.r + b10.x * a.r) / ab4, dy = (a.y * b10.r + b10.y * a.r) / ab4;
  return dx * dx + dy * dy;
}
function Node2(circle3) {
  this._ = circle3, this.next = null, this.previous = null;
}
function packSiblingsRandom(circles, random2) {
  if (!(n = (circles = array_default4(circles)).length)) return 0;
  var a, b10, c, n, aa2, ca3, i, j2, k, sj, sk;
  if (a = circles[0], a.x = 0, a.y = 0, !(n > 1)) return a.r;
  if (b10 = circles[1], a.x = -b10.r, b10.x = a.r, b10.y = 0, !(n > 2)) return a.r + b10.r;
  place(b10, a, c = circles[2]), a = new Node2(a), b10 = new Node2(b10), c = new Node2(c), a.next = c.previous = b10, b10.next = a.previous = c, c.next = b10.previous = a;
  pack: for (i = 3; i < n; ++i) {
    place(a._, b10._, c = circles[i]), c = new Node2(c), j2 = b10.next, k = a.previous, sj = b10._.r, sk = a._.r;
    do
      if (sj <= sk) {
        if (intersects(j2._, c._)) {
          b10 = j2, a.next = b10, b10.previous = a, --i;
          continue pack;
        }
        sj += j2._.r, j2 = j2.next;
      } else {
        if (intersects(k._, c._)) {
          a = k, a.next = b10, b10.previous = a, --i;
          continue pack;
        }
        sk += k._.r, k = k.previous;
      }
    while (j2 !== k.next);
    for (c.previous = a, c.next = b10, a.next = b10.previous = b10 = c, aa2 = score(a); (c = c.next) !== b10; )
      (ca3 = score(c)) < aa2 && (a = c, aa2 = ca3);
    b10 = a.next;
  }
  for (a = [b10._], c = b10; (c = c.next) !== b10; ) a.push(c._);
  for (c = packEncloseRandom(a, random2), i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;
  return c.r;
}

// node_modules/d3-hierarchy/src/pack/index.js
function defaultRadius(d) {
  return Math.sqrt(d.value);
}
function pack_default() {
  var radius2 = null, dx = 1, dy = 1, padding3 = constantZero;
  function pack(root2) {
    let random2 = lcg_default2();
    return root2.x = dx / 2, root2.y = dy / 2, radius2 ? root2.eachBefore(radiusLeaf(radius2)).eachAfter(packChildrenRandom(padding3, 0.5, random2)).eachBefore(translateChild(1)) : root2.eachBefore(radiusLeaf(defaultRadius)).eachAfter(packChildrenRandom(constantZero, 1, random2)).eachAfter(packChildrenRandom(padding3, root2.r / Math.min(dx, dy), random2)).eachBefore(translateChild(Math.min(dx, dy) / (2 * root2.r))), root2;
  }
  return pack.radius = function(x5) {
    return arguments.length ? (radius2 = optional2(x5), pack) : radius2;
  }, pack.size = function(x5) {
    return arguments.length ? (dx = +x5[0], dy = +x5[1], pack) : [dx, dy];
  }, pack.padding = function(x5) {
    return arguments.length ? (padding3 = typeof x5 == "function" ? x5 : constant_default5(+x5), pack) : padding3;
  }, pack;
}
function radiusLeaf(radius2) {
  return function(node2) {
    node2.children || (node2.r = Math.max(0, +radius2(node2) || 0));
  };
}
function packChildrenRandom(padding3, k, random2) {
  return function(node2) {
    if (children4 = node2.children) {
      var children4, i, n = children4.length, r = padding3(node2) * k || 0, e;
      if (r) for (i = 0; i < n; ++i) children4[i].r += r;
      if (e = packSiblingsRandom(children4, random2), r) for (i = 0; i < n; ++i) children4[i].r -= r;
      node2.r = e + r;
    }
  };
}
function translateChild(k) {
  return function(node2) {
    var parent = node2.parent;
    node2.r *= k, parent && (node2.x = parent.x + k * node2.x, node2.y = parent.y + k * node2.y);
  };
}

// node_modules/d3-hierarchy/src/treemap/round.js
function round_default2(node2) {
  node2.x0 = Math.round(node2.x0), node2.y0 = Math.round(node2.y0), node2.x1 = Math.round(node2.x1), node2.y1 = Math.round(node2.y1);
}

// node_modules/d3-hierarchy/src/treemap/dice.js
function dice_default(parent, x06, y06, x12, y12) {
  for (var nodes = parent.children, node2, i = -1, n = nodes.length, k = parent.value && (x12 - x06) / parent.value; ++i < n; )
    node2 = nodes[i], node2.y0 = y06, node2.y1 = y12, node2.x0 = x06, node2.x1 = x06 += node2.value * k;
}

// node_modules/d3-hierarchy/src/partition.js
function partition_default() {
  var dx = 1, dy = 1, padding3 = 0, round2 = !1;
  function partition5(root2) {
    var n = root2.height + 1;
    return root2.x0 = root2.y0 = padding3, root2.x1 = dx, root2.y1 = dy / n, root2.eachBefore(positionNode(dy, n)), round2 && root2.eachBefore(round_default2), root2;
  }
  function positionNode(dy2, n) {
    return function(node2) {
      node2.children && dice_default(node2, node2.x0, dy2 * (node2.depth + 1) / n, node2.x1, dy2 * (node2.depth + 2) / n);
      var x06 = node2.x0, y06 = node2.y0, x12 = node2.x1 - padding3, y12 = node2.y1 - padding3;
      x12 < x06 && (x06 = x12 = (x06 + x12) / 2), y12 < y06 && (y06 = y12 = (y06 + y12) / 2), node2.x0 = x06, node2.y0 = y06, node2.x1 = x12, node2.y1 = y12;
    };
  }
  return partition5.round = function(x5) {
    return arguments.length ? (round2 = !!x5, partition5) : round2;
  }, partition5.size = function(x5) {
    return arguments.length ? (dx = +x5[0], dy = +x5[1], partition5) : [dx, dy];
  }, partition5.padding = function(x5) {
    return arguments.length ? (padding3 = +x5, partition5) : padding3;
  }, partition5;
}

// node_modules/d3-hierarchy/src/stratify.js
var preroot = { depth: -1 }, ambiguous = {}, imputed = {};
function defaultId2(d) {
  return d.id;
}
function defaultParentId(d) {
  return d.parentId;
}
function stratify_default() {
  var id3 = defaultId2, parentId = defaultParentId, path3;
  function stratify(data3) {
    var nodes = Array.from(data3), currentId = id3, currentParentId = parentId, n, d, i, root2, parent, node2, nodeId, nodeKey, nodeByKey = /* @__PURE__ */ new Map();
    if (path3 != null) {
      let I = nodes.map((d2, i2) => normalize3(path3(d2, i2, data3))), P = I.map(parentof), S = new Set(I).add("");
      for (let i2 of P)
        S.has(i2) || (S.add(i2), I.push(i2), P.push(parentof(i2)), nodes.push(imputed));
      currentId = (_, i2) => I[i2], currentParentId = (_, i2) => P[i2];
    }
    for (i = 0, n = nodes.length; i < n; ++i)
      d = nodes[i], node2 = nodes[i] = new Node(d), (nodeId = currentId(d, i, data3)) != null && (nodeId += "") && (nodeKey = node2.id = nodeId, nodeByKey.set(nodeKey, nodeByKey.has(nodeKey) ? ambiguous : node2)), (nodeId = currentParentId(d, i, data3)) != null && (nodeId += "") && (node2.parent = nodeId);
    for (i = 0; i < n; ++i)
      if (node2 = nodes[i], nodeId = node2.parent) {
        if (parent = nodeByKey.get(nodeId), !parent) throw new Error("missing: " + nodeId);
        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
        parent.children ? parent.children.push(node2) : parent.children = [node2], node2.parent = parent;
      } else {
        if (root2) throw new Error("multiple roots");
        root2 = node2;
      }
    if (!root2) throw new Error("no root");
    if (path3 != null) {
      for (; root2.data === imputed && root2.children.length === 1; )
        root2 = root2.children[0], --n;
      for (let i2 = nodes.length - 1; i2 >= 0 && (node2 = nodes[i2], node2.data === imputed); --i2)
        node2.data = null;
    }
    if (root2.parent = preroot, root2.eachBefore(function(node3) {
      node3.depth = node3.parent.depth + 1, --n;
    }).eachBefore(computeHeight), root2.parent = null, n > 0) throw new Error("cycle");
    return root2;
  }
  return stratify.id = function(x5) {
    return arguments.length ? (id3 = optional2(x5), stratify) : id3;
  }, stratify.parentId = function(x5) {
    return arguments.length ? (parentId = optional2(x5), stratify) : parentId;
  }, stratify.path = function(x5) {
    return arguments.length ? (path3 = optional2(x5), stratify) : path3;
  }, stratify;
}
function normalize3(path3) {
  path3 = `${path3}`;
  let i = path3.length;
  return slash(path3, i - 1) && !slash(path3, i - 2) && (path3 = path3.slice(0, -1)), path3[0] === "/" ? path3 : `/${path3}`;
}
function parentof(path3) {
  let i = path3.length;
  if (i < 2) return "";
  for (; --i > 1 && !slash(path3, i); ) ;
  return path3.slice(0, i);
}
function slash(path3, i) {
  if (path3[i] === "/") {
    let k = 0;
    for (; i > 0 && path3[--i] === "\\"; ) ++k;
    if ((k & 1) === 0) return !0;
  }
  return !1;
}

// node_modules/d3-hierarchy/src/tree.js
function defaultSeparation2(a, b10) {
  return a.parent === b10.parent ? 1 : 2;
}
function nextLeft(v2) {
  var children4 = v2.children;
  return children4 ? children4[0] : v2.t;
}
function nextRight(v2) {
  var children4 = v2.children;
  return children4 ? children4[children4.length - 1] : v2.t;
}
function moveSubtree(wm, wp, shift) {
  var change2 = shift / (wp.i - wm.i);
  wp.c -= change2, wp.s += shift, wm.c += change2, wp.z += shift, wp.m += shift;
}
function executeShifts(v2) {
  for (var shift = 0, change2 = 0, children4 = v2.children, i = children4.length, w2; --i >= 0; )
    w2 = children4[i], w2.z += shift, w2.m += shift, shift += w2.s + (change2 += w2.c);
}
function nextAncestor(vim, v2, ancestor) {
  return vim.a.parent === v2.parent ? vim.a : ancestor;
}
function TreeNode(node2, i) {
  this._ = node2, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = i;
}
TreeNode.prototype = Object.create(Node.prototype);
function treeRoot(root2) {
  for (var tree = new TreeNode(root2, 0), node2, nodes = [tree], child, children4, i, n; node2 = nodes.pop(); )
    if (children4 = node2._.children)
      for (node2.children = new Array(n = children4.length), i = n - 1; i >= 0; --i)
        nodes.push(child = node2.children[i] = new TreeNode(children4[i], i)), child.parent = node2;
  return (tree.parent = new TreeNode(null, 0)).children = [tree], tree;
}
function tree_default() {
  var separation = defaultSeparation2, dx = 1, dy = 1, nodeSize = null;
  function tree(root2) {
    var t = treeRoot(root2);
    if (t.eachAfter(firstWalk), t.parent.m = -t.z, t.eachBefore(secondWalk), nodeSize) root2.eachBefore(sizeNode);
    else {
      var left = root2, right = root2, bottom = root2;
      root2.eachBefore(function(node2) {
        node2.x < left.x && (left = node2), node2.x > right.x && (right = node2), node2.depth > bottom.depth && (bottom = node2);
      });
      var s = left === right ? 1 : separation(left, right) / 2, tx = s - left.x, kx = dx / (right.x + s + tx), ky = dy / (bottom.depth || 1);
      root2.eachBefore(function(node2) {
        node2.x = (node2.x + tx) * kx, node2.y = node2.depth * ky;
      });
    }
    return root2;
  }
  function firstWalk(v2) {
    var children4 = v2.children, siblings = v2.parent.children, w2 = v2.i ? siblings[v2.i - 1] : null;
    if (children4) {
      executeShifts(v2);
      var midpoint = (children4[0].z + children4[children4.length - 1].z) / 2;
      w2 ? (v2.z = w2.z + separation(v2._, w2._), v2.m = v2.z - midpoint) : v2.z = midpoint;
    } else w2 && (v2.z = w2.z + separation(v2._, w2._));
    v2.parent.A = apportion(v2, w2, v2.parent.A || siblings[0]);
  }
  function secondWalk(v2) {
    v2._.x = v2.z + v2.parent.m, v2.m += v2.parent.m;
  }
  function apportion(v2, w2, ancestor) {
    if (w2) {
      for (var vip = v2, vop = v2, vim = w2, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift; vim = nextRight(vim), vip = nextLeft(vip), vim && vip; )
        vom = nextLeft(vom), vop = nextRight(vop), vop.a = v2, shift = vim.z + sim - vip.z - sip + separation(vim._, vip._), shift > 0 && (moveSubtree(nextAncestor(vim, v2, ancestor), v2, shift), sip += shift, sop += shift), sim += vim.m, sip += vip.m, som += vom.m, sop += vop.m;
      vim && !nextRight(vop) && (vop.t = vim, vop.m += sim - sop), vip && !nextLeft(vom) && (vom.t = vip, vom.m += sip - som, ancestor = v2);
    }
    return ancestor;
  }
  function sizeNode(node2) {
    node2.x *= dx, node2.y = node2.depth * dy;
  }
  return tree.separation = function(x5) {
    return arguments.length ? (separation = x5, tree) : separation;
  }, tree.size = function(x5) {
    return arguments.length ? (nodeSize = !1, dx = +x5[0], dy = +x5[1], tree) : nodeSize ? null : [dx, dy];
  }, tree.nodeSize = function(x5) {
    return arguments.length ? (nodeSize = !0, dx = +x5[0], dy = +x5[1], tree) : nodeSize ? [dx, dy] : null;
  }, tree;
}

// node_modules/d3-hierarchy/src/treemap/slice.js
function slice_default(parent, x06, y06, x12, y12) {
  for (var nodes = parent.children, node2, i = -1, n = nodes.length, k = parent.value && (y12 - y06) / parent.value; ++i < n; )
    node2 = nodes[i], node2.x0 = x06, node2.x1 = x12, node2.y0 = y06, node2.y1 = y06 += node2.value * k;
}

// node_modules/d3-hierarchy/src/treemap/squarify.js
var phi = (1 + Math.sqrt(5)) / 2;
function squarifyRatio(ratio, parent, x06, y06, x12, y12) {
  for (var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value3 = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta; i0 < n; ) {
    dx = x12 - x06, dy = y12 - y06;
    do
      sumValue = nodes[i1++].value;
    while (!sumValue && i1 < n);
    for (minValue = maxValue = sumValue, alpha = Math.max(dy / dx, dx / dy) / (value3 * ratio), beta = sumValue * sumValue * alpha, minRatio = Math.max(maxValue / beta, beta / minValue); i1 < n; ++i1) {
      if (sumValue += nodeValue = nodes[i1].value, nodeValue < minValue && (minValue = nodeValue), nodeValue > maxValue && (maxValue = nodeValue), beta = sumValue * sumValue * alpha, newRatio = Math.max(maxValue / beta, beta / minValue), newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }
    rows.push(row = { value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1) }), row.dice ? dice_default(row, x06, y06, x12, value3 ? y06 += dy * sumValue / value3 : y12) : slice_default(row, x06, y06, value3 ? x06 += dx * sumValue / value3 : x12, y12), value3 -= sumValue, i0 = i1;
  }
  return rows;
}
var squarify_default = (function custom10(ratio) {
  function squarify(parent, x06, y06, x12, y12) {
    squarifyRatio(ratio, parent, x06, y06, x12, y12);
  }
  return squarify.ratio = function(x5) {
    return custom10((x5 = +x5) > 1 ? x5 : 1);
  }, squarify;
})(phi);

// node_modules/d3-hierarchy/src/treemap/index.js
function treemap_default() {
  var tile = squarify_default, round2 = !1, dx = 1, dy = 1, paddingStack = [0], paddingInner2 = constantZero, paddingTop = constantZero, paddingRight = constantZero, paddingBottom = constantZero, paddingLeft = constantZero;
  function treemap(root2) {
    return root2.x0 = root2.y0 = 0, root2.x1 = dx, root2.y1 = dy, root2.eachBefore(positionNode), paddingStack = [0], round2 && root2.eachBefore(round_default2), root2;
  }
  function positionNode(node2) {
    var p = paddingStack[node2.depth], x06 = node2.x0 + p, y06 = node2.y0 + p, x12 = node2.x1 - p, y12 = node2.y1 - p;
    x12 < x06 && (x06 = x12 = (x06 + x12) / 2), y12 < y06 && (y06 = y12 = (y06 + y12) / 2), node2.x0 = x06, node2.y0 = y06, node2.x1 = x12, node2.y1 = y12, node2.children && (p = paddingStack[node2.depth + 1] = paddingInner2(node2) / 2, x06 += paddingLeft(node2) - p, y06 += paddingTop(node2) - p, x12 -= paddingRight(node2) - p, y12 -= paddingBottom(node2) - p, x12 < x06 && (x06 = x12 = (x06 + x12) / 2), y12 < y06 && (y06 = y12 = (y06 + y12) / 2), tile(node2, x06, y06, x12, y12));
  }
  return treemap.round = function(x5) {
    return arguments.length ? (round2 = !!x5, treemap) : round2;
  }, treemap.size = function(x5) {
    return arguments.length ? (dx = +x5[0], dy = +x5[1], treemap) : [dx, dy];
  }, treemap.tile = function(x5) {
    return arguments.length ? (tile = required2(x5), treemap) : tile;
  }, treemap.padding = function(x5) {
    return arguments.length ? treemap.paddingInner(x5).paddingOuter(x5) : treemap.paddingInner();
  }, treemap.paddingInner = function(x5) {
    return arguments.length ? (paddingInner2 = typeof x5 == "function" ? x5 : constant_default5(+x5), treemap) : paddingInner2;
  }, treemap.paddingOuter = function(x5) {
    return arguments.length ? treemap.paddingTop(x5).paddingRight(x5).paddingBottom(x5).paddingLeft(x5) : treemap.paddingTop();
  }, treemap.paddingTop = function(x5) {
    return arguments.length ? (paddingTop = typeof x5 == "function" ? x5 : constant_default5(+x5), treemap) : paddingTop;
  }, treemap.paddingRight = function(x5) {
    return arguments.length ? (paddingRight = typeof x5 == "function" ? x5 : constant_default5(+x5), treemap) : paddingRight;
  }, treemap.paddingBottom = function(x5) {
    return arguments.length ? (paddingBottom = typeof x5 == "function" ? x5 : constant_default5(+x5), treemap) : paddingBottom;
  }, treemap.paddingLeft = function(x5) {
    return arguments.length ? (paddingLeft = typeof x5 == "function" ? x5 : constant_default5(+x5), treemap) : paddingLeft;
  }, treemap;
}

// node_modules/d3-hierarchy/src/treemap/binary.js
function binary_default(parent, x06, y06, x12, y12) {
  var nodes = parent.children, i, n = nodes.length, sum3, sums = new Array(n + 1);
  for (sums[0] = sum3 = i = 0; i < n; ++i)
    sums[i + 1] = sum3 += nodes[i].value;
  partition5(0, n, parent.value, x06, y06, x12, y12);
  function partition5(i2, j2, value3, x07, y07, x13, y13) {
    if (i2 >= j2 - 1) {
      var node2 = nodes[i2];
      node2.x0 = x07, node2.y0 = y07, node2.x1 = x13, node2.y1 = y13;
      return;
    }
    for (var valueOffset = sums[i2], valueTarget = value3 / 2 + valueOffset, k = i2 + 1, hi = j2 - 1; k < hi; ) {
      var mid = k + hi >>> 1;
      sums[mid] < valueTarget ? k = mid + 1 : hi = mid;
    }
    valueTarget - sums[k - 1] < sums[k] - valueTarget && i2 + 1 < k && --k;
    var valueLeft = sums[k] - valueOffset, valueRight = value3 - valueLeft;
    if (x13 - x07 > y13 - y07) {
      var xk = value3 ? (x07 * valueRight + x13 * valueLeft) / value3 : x13;
      partition5(i2, k, valueLeft, x07, y07, xk, y13), partition5(k, j2, valueRight, xk, y07, x13, y13);
    } else {
      var yk = value3 ? (y07 * valueRight + y13 * valueLeft) / value3 : y13;
      partition5(i2, k, valueLeft, x07, y07, x13, yk), partition5(k, j2, valueRight, x07, yk, x13, y13);
    }
  }
}

// node_modules/d3-hierarchy/src/treemap/sliceDice.js
function sliceDice_default(parent, x06, y06, x12, y12) {
  (parent.depth & 1 ? slice_default : dice_default)(parent, x06, y06, x12, y12);
}

// node_modules/d3-hierarchy/src/treemap/resquarify.js
var resquarify_default = (function custom11(ratio) {
  function resquarify(parent, x06, y06, x12, y12) {
    if ((rows = parent._squarify) && rows.ratio === ratio)
      for (var rows, row, nodes, i, j2 = -1, n, m = rows.length, value3 = parent.value; ++j2 < m; ) {
        for (row = rows[j2], nodes = row.children, i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
        row.dice ? dice_default(row, x06, y06, x12, value3 ? y06 += (y12 - y06) * row.value / value3 : y12) : slice_default(row, x06, y06, value3 ? x06 += (x12 - x06) * row.value / value3 : x12, y12), value3 -= row.value;
      }
    else
      parent._squarify = rows = squarifyRatio(ratio, parent, x06, y06, x12, y12), rows.ratio = ratio;
  }
  return resquarify.ratio = function(x5) {
    return custom11((x5 = +x5) > 1 ? x5 : 1);
  }, resquarify;
})(phi);

// node_modules/vega-hierarchy/build/vega-hierarchy.js
function lookup3(tree, key2, filter3) {
  let map4 = {};
  return tree.each((node2) => {
    let t = node2.data;
    filter3(t) && (map4[key2(t)] = node2);
  }), tree.lookup = map4, tree;
}
function Nest(params2) {
  Transform.call(this, null, params2);
}
Nest.Definition = {
  type: "Nest",
  metadata: {
    treesource: !0,
    changes: !0
  },
  params: [{
    name: "keys",
    type: "field",
    array: !0
  }, {
    name: "generate",
    type: "boolean"
  }]
};
var children = (n) => n.values;
inherits_default(Nest, Transform, {
  transform(_, pulse2) {
    pulse2.source || error62("Nest transform requires an upstream data source.");
    var gen = _.generate, mod = _.modified(), out = pulse2.clone(), tree = this.value;
    return (!tree || mod || pulse2.changed()) && (tree && tree.each((node2) => {
      node2.children && isTuple(node2.data) && out.rem.push(node2.data);
    }), this.value = tree = hierarchy({
      values: array_default(_.keys).reduce((n, k) => (n.key(k), n), nest()).entries(out.source)
    }, children), gen && tree.each((node2) => {
      node2.children && (node2 = ingest$1(node2.data), out.add.push(node2), out.source.push(node2));
    }), lookup3(tree, tupleid, tupleid)), out.source.root = tree, out;
  }
});
function nest() {
  let keys4 = [], nest2 = {
    entries: (array4) => entries2(apply4(array4, 0), 0),
    key: (d) => (keys4.push(d), nest2)
  };
  function apply4(array4, depth) {
    if (depth >= keys4.length)
      return array4;
    let n = array4.length, key2 = keys4[depth++], valuesByKey = {}, result = {}, i = -1, keyValue, value3, values3;
    for (; ++i < n; )
      keyValue = key2(value3 = array4[i]) + "", (values3 = valuesByKey[keyValue]) ? values3.push(value3) : valuesByKey[keyValue] = [value3];
    for (keyValue in valuesByKey)
      result[keyValue] = apply4(valuesByKey[keyValue], depth);
    return result;
  }
  function entries2(map4, depth) {
    if (++depth > keys4.length) return map4;
    let array4 = [];
    for (let key2 in map4)
      array4.push({
        key: key2,
        values: entries2(map4[key2], depth)
      });
    return array4;
  }
  return nest2;
}
function HierarchyLayout(params2) {
  Transform.call(this, null, params2);
}
var defaultSeparation3 = (a, b10) => a.parent === b10.parent ? 1 : 2;
inherits_default(HierarchyLayout, Transform, {
  transform(_, pulse2) {
    (!pulse2.source || !pulse2.source.root) && error62(this.constructor.name + " transform requires a backing tree data source.");
    let layout = this.layout(_.method), fields = this.fields, root2 = pulse2.source.root, as = _.as || fields;
    _.field ? root2.sum(_.field) : root2.count(), _.sort && root2.sort(stableCompare(_.sort, (d) => d.data)), setParams(layout, this.params, _), layout.separation && layout.separation(_.separation !== !1 ? defaultSeparation3 : one);
    try {
      this.value = layout(root2);
    } catch (err) {
      error62(err);
    }
    return root2.each((node2) => setFields(node2, fields, as)), pulse2.reflow(_.modified()).modifies(as).modifies("leaf");
  }
});
function setParams(layout, params2, _) {
  for (let p, i = 0, n = params2.length; i < n; ++i)
    p = params2[i], p in _ && layout[p](_[p]);
}
function setFields(node2, fields, as) {
  let t = node2.data, n = fields.length - 1;
  for (let i = 0; i < n; ++i)
    t[as[i]] = node2[fields[i]];
  t[as[n]] = node2.children ? node2.children.length : 0;
}
var Output$3 = ["x", "y", "r", "depth", "children"];
function Pack(params2) {
  HierarchyLayout.call(this, params2);
}
Pack.Definition = {
  type: "Pack",
  metadata: {
    tree: !0,
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "sort",
    type: "compare"
  }, {
    name: "padding",
    type: "number",
    default: 0
  }, {
    name: "radius",
    type: "field",
    default: null
  }, {
    name: "size",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: Output$3.length,
    default: Output$3
  }]
};
inherits_default(Pack, HierarchyLayout, {
  layout: pack_default,
  params: ["radius", "size", "padding"],
  fields: Output$3
});
var Output$2 = ["x0", "y0", "x1", "y1", "depth", "children"];
function Partition(params2) {
  HierarchyLayout.call(this, params2);
}
Partition.Definition = {
  type: "Partition",
  metadata: {
    tree: !0,
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "sort",
    type: "compare"
  }, {
    name: "padding",
    type: "number",
    default: 0
  }, {
    name: "round",
    type: "boolean",
    default: !1
  }, {
    name: "size",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: Output$2.length,
    default: Output$2
  }]
};
inherits_default(Partition, HierarchyLayout, {
  layout: partition_default,
  params: ["size", "round", "padding"],
  fields: Output$2
});
function Stratify(params2) {
  Transform.call(this, null, params2);
}
Stratify.Definition = {
  type: "Stratify",
  metadata: {
    treesource: !0
  },
  params: [{
    name: "key",
    type: "field",
    required: !0
  }, {
    name: "parentKey",
    type: "field",
    required: !0
  }]
};
inherits_default(Stratify, Transform, {
  transform(_, pulse2) {
    pulse2.source || error62("Stratify transform requires an upstream data source.");
    let tree = this.value, mod = _.modified(), out = pulse2.fork(pulse2.ALL).materialize(pulse2.SOURCE), run5 = !tree || mod || pulse2.changed(pulse2.ADD_REM) || pulse2.modified(_.key.fields) || pulse2.modified(_.parentKey.fields);
    return out.source = out.source.slice(), run5 && (tree = out.source.length ? lookup3(stratify_default().id(_.key).parentId(_.parentKey)(out.source), _.key, truthy) : lookup3(stratify_default()([{}]), _.key, _.key)), out.source.root = this.value = tree, out;
  }
});
var Layouts = {
  tidy: tree_default,
  cluster: cluster_default
}, Output$1 = ["x", "y", "depth", "children"];
function Tree(params2) {
  HierarchyLayout.call(this, params2);
}
Tree.Definition = {
  type: "Tree",
  metadata: {
    tree: !0,
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "sort",
    type: "compare"
  }, {
    name: "method",
    type: "enum",
    default: "tidy",
    values: ["tidy", "cluster"]
  }, {
    name: "size",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "nodeSize",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "separation",
    type: "boolean",
    default: !0
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: Output$1.length,
    default: Output$1
  }]
};
inherits_default(Tree, HierarchyLayout, {
  /**
   * Tree layout generator. Supports both 'tidy' and 'cluster' layouts.
   */
  layout(method2) {
    let m = method2 || "tidy";
    if (hasOwnProperty(Layouts, m)) return Layouts[m]();
    error62("Unrecognized Tree layout method: " + m);
  },
  params: ["size", "nodeSize"],
  fields: Output$1
});
function TreeLinks(params2) {
  Transform.call(this, [], params2);
}
TreeLinks.Definition = {
  type: "TreeLinks",
  metadata: {
    tree: !0,
    generates: !0,
    changes: !0
  },
  params: []
};
inherits_default(TreeLinks, Transform, {
  transform(_, pulse2) {
    let links = this.value, tree = pulse2.source && pulse2.source.root, out = pulse2.fork(pulse2.NO_SOURCE), lut = {};
    return tree || error62("TreeLinks transform requires a tree data source."), pulse2.changed(pulse2.ADD_REM) ? (out.rem = links, pulse2.visit(pulse2.SOURCE, (t) => lut[tupleid(t)] = 1), tree.each((node2) => {
      let t = node2.data, p = node2.parent && node2.parent.data;
      p && lut[tupleid(t)] && lut[tupleid(p)] && out.add.push(ingest$1({
        source: p,
        target: t
      }));
    }), this.value = out.add) : pulse2.changed(pulse2.MOD) && (pulse2.visit(pulse2.MOD, (t) => lut[tupleid(t)] = 1), links.forEach((link2) => {
      (lut[tupleid(link2.source)] || lut[tupleid(link2.target)]) && out.mod.push(link2);
    })), out;
  }
});
var Tiles = {
  binary: binary_default,
  dice: dice_default,
  slice: slice_default,
  slicedice: sliceDice_default,
  squarify: squarify_default,
  resquarify: resquarify_default
}, Output2 = ["x0", "y0", "x1", "y1", "depth", "children"];
function Treemap(params2) {
  HierarchyLayout.call(this, params2);
}
Treemap.Definition = {
  type: "Treemap",
  metadata: {
    tree: !0,
    modifies: !0
  },
  params: [{
    name: "field",
    type: "field"
  }, {
    name: "sort",
    type: "compare"
  }, {
    name: "method",
    type: "enum",
    default: "squarify",
    values: ["squarify", "resquarify", "binary", "dice", "slice", "slicedice"]
  }, {
    name: "padding",
    type: "number",
    default: 0
  }, {
    name: "paddingInner",
    type: "number",
    default: 0
  }, {
    name: "paddingOuter",
    type: "number",
    default: 0
  }, {
    name: "paddingTop",
    type: "number",
    default: 0
  }, {
    name: "paddingRight",
    type: "number",
    default: 0
  }, {
    name: "paddingBottom",
    type: "number",
    default: 0
  }, {
    name: "paddingLeft",
    type: "number",
    default: 0
  }, {
    name: "ratio",
    type: "number",
    default: 1.618033988749895
  }, {
    name: "round",
    type: "boolean",
    default: !1
  }, {
    name: "size",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: Output2.length,
    default: Output2
  }]
};
inherits_default(Treemap, HierarchyLayout, {
  /**
   * Treemap layout generator. Adds 'method' and 'ratio' parameters
   * to configure the underlying tile method.
   */
  layout() {
    let x5 = treemap_default();
    return x5.ratio = (_) => {
      let t = x5.tile();
      t.ratio && x5.tile(t.ratio(_));
    }, x5.method = (_) => {
      hasOwnProperty(Tiles, _) ? x5.tile(Tiles[_]) : error62("Unrecognized Treemap layout method: " + _);
    }, x5;
  },
  params: ["method", "ratio", "size", "round", "padding", "paddingInner", "paddingOuter", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
  fields: Output2
});

// node_modules/vega-label/build/vega-label.js
var vega_label_exports = {};
__export(vega_label_exports, {
  label: () => Label
});
var ALPHA_MASK = 4278190080;
function baseBitmaps($, data3) {
  let bitmap = $.bitmap();
  return (data3 || []).forEach((d) => bitmap.set($(d.boundary[0]), $(d.boundary[3]))), [bitmap, void 0];
}
function markBitmaps($, baseMark, avoidMarks, labelInside, isGroupArea) {
  let width2 = $.width, height2 = $.height, border = labelInside || isGroupArea, context3 = canvas(width2, height2).getContext("2d"), baseMarkContext = canvas(width2, height2).getContext("2d"), strokeContext = border && canvas(width2, height2).getContext("2d");
  avoidMarks.forEach((items) => draw2(context3, items, !1)), draw2(baseMarkContext, baseMark, !1), border && draw2(strokeContext, baseMark, !0);
  let buffer = getBuffer(context3, width2, height2), baseMarkBuffer = getBuffer(baseMarkContext, width2, height2), strokeBuffer = border && getBuffer(strokeContext, width2, height2), layer1 = $.bitmap(), layer2 = border && $.bitmap(), x5, y5, u4, v2, index4, alpha, strokeAlpha, baseMarkAlpha;
  for (y5 = 0; y5 < height2; ++y5)
    for (x5 = 0; x5 < width2; ++x5)
      index4 = y5 * width2 + x5, alpha = buffer[index4] & ALPHA_MASK, baseMarkAlpha = baseMarkBuffer[index4] & ALPHA_MASK, strokeAlpha = border && strokeBuffer[index4] & ALPHA_MASK, (alpha || strokeAlpha || baseMarkAlpha) && (u4 = $(x5), v2 = $(y5), !isGroupArea && (alpha || baseMarkAlpha) && layer1.set(u4, v2), border && (alpha || strokeAlpha) && layer2.set(u4, v2));
  return [layer1, layer2];
}
function getBuffer(context3, width2, height2) {
  return new Uint32Array(context3.getImageData(0, 0, width2, height2).data.buffer);
}
function draw2(context3, items, interior) {
  if (!items.length) return;
  let type3 = items[0].mark.marktype;
  type3 === "group" ? items.forEach((group2) => {
    group2.items.forEach((mark) => draw2(context3, mark.items, interior));
  }) : Marks[type3].draw(context3, {
    items: interior ? items.map(prepare) : items
  });
}
function prepare(source4) {
  let item = rederive(source4, {});
  return item.stroke && item.strokeOpacity !== 0 || item.fill && item.fillOpacity !== 0 ? {
    ...item,
    strokeOpacity: 1,
    stroke: "#000",
    fillOpacity: 0
  } : item;
}
var DIV = 5, MOD2 = 31, SIZE = 32, RIGHT0 = new Uint32Array(SIZE + 1), RIGHT1 = new Uint32Array(SIZE + 1);
RIGHT1[0] = 0;
RIGHT0[0] = ~RIGHT1[0];
for (let i = 1; i <= SIZE; ++i)
  RIGHT1[i] = RIGHT1[i - 1] << 1 | 1, RIGHT0[i] = ~RIGHT1[i];
function Bitmap(w2, h2) {
  let array4 = new Uint32Array(~~((w2 * h2 + SIZE) / SIZE));
  function _set2(index4, mask) {
    array4[index4] |= mask;
  }
  function _clear(index4, mask) {
    array4[index4] &= mask;
  }
  return {
    array: array4,
    get: (x5, y5) => {
      let index4 = y5 * w2 + x5;
      return array4[index4 >>> DIV] & 1 << (index4 & MOD2);
    },
    set: (x5, y5) => {
      let index4 = y5 * w2 + x5;
      _set2(index4 >>> DIV, 1 << (index4 & MOD2));
    },
    clear: (x5, y5) => {
      let index4 = y5 * w2 + x5;
      _clear(index4 >>> DIV, ~(1 << (index4 & MOD2)));
    },
    getRange: (x5, y5, x22, y22) => {
      let r = y22, start, end, indexStart, indexEnd;
      for (; r >= y5; --r)
        if (start = r * w2 + x5, end = r * w2 + x22, indexStart = start >>> DIV, indexEnd = end >>> DIV, indexStart === indexEnd) {
          if (array4[indexStart] & RIGHT0[start & MOD2] & RIGHT1[(end & MOD2) + 1])
            return !0;
        } else {
          if (array4[indexStart] & RIGHT0[start & MOD2] || array4[indexEnd] & RIGHT1[(end & MOD2) + 1]) return !0;
          for (let i = indexStart + 1; i < indexEnd; ++i)
            if (array4[i]) return !0;
        }
      return !1;
    },
    setRange: (x5, y5, x22, y22) => {
      let start, end, indexStart, indexEnd, i;
      for (; y5 <= y22; ++y5)
        if (start = y5 * w2 + x5, end = y5 * w2 + x22, indexStart = start >>> DIV, indexEnd = end >>> DIV, indexStart === indexEnd)
          _set2(indexStart, RIGHT0[start & MOD2] & RIGHT1[(end & MOD2) + 1]);
        else
          for (_set2(indexStart, RIGHT0[start & MOD2]), _set2(indexEnd, RIGHT1[(end & MOD2) + 1]), i = indexStart + 1; i < indexEnd; ++i) _set2(i, 4294967295);
    },
    clearRange: (x5, y5, x22, y22) => {
      let start, end, indexStart, indexEnd, i;
      for (; y5 <= y22; ++y5)
        if (start = y5 * w2 + x5, end = y5 * w2 + x22, indexStart = start >>> DIV, indexEnd = end >>> DIV, indexStart === indexEnd)
          _clear(indexStart, RIGHT1[start & MOD2] | RIGHT0[(end & MOD2) + 1]);
        else
          for (_clear(indexStart, RIGHT1[start & MOD2]), _clear(indexEnd, RIGHT0[(end & MOD2) + 1]), i = indexStart + 1; i < indexEnd; ++i) _clear(i, 0);
    },
    outOfBounds: (x5, y5, x22, y22) => x5 < 0 || y5 < 0 || y22 >= h2 || x22 >= w2
  };
}
function scaler(width2, height2, padding3) {
  let ratio = Math.max(1, Math.sqrt(width2 * height2 / 1e6)), w2 = ~~((width2 + 2 * padding3 + ratio) / ratio), h2 = ~~((height2 + 2 * padding3 + ratio) / ratio), scale7 = (_) => ~~((_ + padding3) / ratio);
  return scale7.invert = (_) => _ * ratio - padding3, scale7.bitmap = () => Bitmap(w2, h2), scale7.ratio = ratio, scale7.padding = padding3, scale7.width = width2, scale7.height = height2, scale7;
}
function placeAreaLabelNaive($, bitmaps, avoidBaseMark, markIndex) {
  let width2 = $.width, height2 = $.height;
  return function(d) {
    let items = d.datum.datum.items[markIndex].items, n = items.length, textHeight = d.datum.fontSize, textWidth = textMetrics.width(d.datum, d.datum.text), maxAreaWidth = 0, x12, x22, y12, y22, x5, y5, areaWidth;
    for (let i = 0; i < n; ++i)
      x12 = items[i].x, y12 = items[i].y, x22 = items[i].x2 === void 0 ? x12 : items[i].x2, y22 = items[i].y2 === void 0 ? y12 : items[i].y2, x5 = (x12 + x22) / 2, y5 = (y12 + y22) / 2, areaWidth = Math.abs(x22 - x12 + y22 - y12), areaWidth >= maxAreaWidth && (maxAreaWidth = areaWidth, d.x = x5, d.y = y5);
    return x5 = textWidth / 2, y5 = textHeight / 2, x12 = d.x - x5, x22 = d.x + x5, y12 = d.y - y5, y22 = d.y + y5, d.align = "center", x12 < 0 && x22 <= width2 ? d.align = "left" : 0 <= x12 && width2 < x22 && (d.align = "right"), d.baseline = "middle", y12 < 0 && y22 <= height2 ? d.baseline = "top" : 0 <= y12 && height2 < y22 && (d.baseline = "bottom"), !0;
  };
}
function outOfBounds(x5, y5, textWidth, textHeight, width2, height2) {
  let r = textWidth / 2;
  return x5 - r < 0 || x5 + r > width2 || y5 - (r = textHeight / 2) < 0 || y5 + r > height2;
}
function collision($, x5, y5, textHeight, textWidth, h2, bm0, bm1) {
  let w2 = textWidth * h2 / (textHeight * 2), x12 = $(x5 - w2), x22 = $(x5 + w2), y12 = $(y5 - (h2 = h2 / 2)), y22 = $(y5 + h2);
  return bm0.outOfBounds(x12, y12, x22, y22) || bm0.getRange(x12, y12, x22, y22) || bm1 && bm1.getRange(x12, y12, x22, y22);
}
function placeAreaLabelReducedSearch($, bitmaps, avoidBaseMark, markIndex) {
  let width2 = $.width, height2 = $.height, bm0 = bitmaps[0], bm1 = bitmaps[1];
  function tryLabel(_x3, _y3, maxSize, textWidth, textHeight) {
    let x5 = $.invert(_x3), y5 = $.invert(_y3), lo = maxSize, hi = height2, mid;
    if (!outOfBounds(x5, y5, textWidth, textHeight, width2, height2) && !collision($, x5, y5, textHeight, textWidth, lo, bm0, bm1) && !collision($, x5, y5, textHeight, textWidth, textHeight, bm0, null)) {
      for (; hi - lo >= 1; )
        mid = (lo + hi) / 2, collision($, x5, y5, textHeight, textWidth, mid, bm0, bm1) ? hi = mid : lo = mid;
      if (lo > maxSize)
        return [x5, y5, lo, !0];
    }
  }
  return function(d) {
    let items = d.datum.datum.items[markIndex].items, n = items.length, textHeight = d.datum.fontSize, textWidth = textMetrics.width(d.datum, d.datum.text), maxSize = avoidBaseMark ? textHeight : 0, labelPlaced = !1, labelPlaced2 = !1, maxAreaWidth = 0, x12, x22, y12, y22, x5, y5, _x3, _y3, _x1, _xMid, _x22, _y1, _yMid, _y22, areaWidth, result, swapTmp;
    for (let i = 0; i < n; ++i) {
      for (x12 = items[i].x, y12 = items[i].y, x22 = items[i].x2 === void 0 ? x12 : items[i].x2, y22 = items[i].y2 === void 0 ? y12 : items[i].y2, x12 > x22 && (swapTmp = x12, x12 = x22, x22 = swapTmp), y12 > y22 && (swapTmp = y12, y12 = y22, y22 = swapTmp), _x1 = $(x12), _x22 = $(x22), _xMid = ~~((_x1 + _x22) / 2), _y1 = $(y12), _y22 = $(y22), _yMid = ~~((_y1 + _y22) / 2), _x3 = _xMid; _x3 >= _x1; --_x3)
        for (_y3 = _yMid; _y3 >= _y1; --_y3)
          result = tryLabel(_x3, _y3, maxSize, textWidth, textHeight), result && ([d.x, d.y, maxSize, labelPlaced] = result);
      for (_x3 = _xMid; _x3 <= _x22; ++_x3)
        for (_y3 = _yMid; _y3 <= _y22; ++_y3)
          result = tryLabel(_x3, _y3, maxSize, textWidth, textHeight), result && ([d.x, d.y, maxSize, labelPlaced] = result);
      !labelPlaced && !avoidBaseMark && (areaWidth = Math.abs(x22 - x12 + y22 - y12), x5 = (x12 + x22) / 2, y5 = (y12 + y22) / 2, areaWidth >= maxAreaWidth && !outOfBounds(x5, y5, textWidth, textHeight, width2, height2) && !collision($, x5, y5, textHeight, textWidth, textHeight, bm0, null) && (maxAreaWidth = areaWidth, d.x = x5, d.y = y5, labelPlaced2 = !0));
    }
    return labelPlaced || labelPlaced2 ? (x5 = textWidth / 2, y5 = textHeight / 2, bm0.setRange($(d.x - x5), $(d.y - y5), $(d.x + x5), $(d.y + y5)), d.align = "center", d.baseline = "middle", !0) : !1;
  };
}
var X_DIR = [-1, -1, 1, 1], Y_DIR = [-1, 1, -1, 1];
function placeAreaLabelFloodFill($, bitmaps, avoidBaseMark, markIndex) {
  let width2 = $.width, height2 = $.height, bm0 = bitmaps[0], bm1 = bitmaps[1], bm2 = $.bitmap();
  return function(d) {
    let items = d.datum.datum.items[markIndex].items, n = items.length, textHeight = d.datum.fontSize, textWidth = textMetrics.width(d.datum, d.datum.text), stack2 = [], maxSize = avoidBaseMark ? textHeight : 0, labelPlaced = !1, labelPlaced2 = !1, maxAreaWidth = 0, x12, x22, y12, y22, x5, y5, _x3, _y3, lo, hi, mid, areaWidth;
    for (let i = 0; i < n; ++i) {
      for (x12 = items[i].x, y12 = items[i].y, x22 = items[i].x2 === void 0 ? x12 : items[i].x2, y22 = items[i].y2 === void 0 ? y12 : items[i].y2, stack2.push([$((x12 + x22) / 2), $((y12 + y22) / 2)]); stack2.length; )
        if ([_x3, _y3] = stack2.pop(), !(bm0.get(_x3, _y3) || bm1.get(_x3, _y3) || bm2.get(_x3, _y3))) {
          bm2.set(_x3, _y3);
          for (let j2 = 0; j2 < 4; ++j2)
            x5 = _x3 + X_DIR[j2], y5 = _y3 + Y_DIR[j2], bm2.outOfBounds(x5, y5, x5, y5) || stack2.push([x5, y5]);
          if (x5 = $.invert(_x3), y5 = $.invert(_y3), lo = maxSize, hi = height2, !outOfBounds(x5, y5, textWidth, textHeight, width2, height2) && !collision($, x5, y5, textHeight, textWidth, lo, bm0, bm1) && !collision($, x5, y5, textHeight, textWidth, textHeight, bm0, null)) {
            for (; hi - lo >= 1; )
              mid = (lo + hi) / 2, collision($, x5, y5, textHeight, textWidth, mid, bm0, bm1) ? hi = mid : lo = mid;
            lo > maxSize && (d.x = x5, d.y = y5, maxSize = lo, labelPlaced = !0);
          }
        }
      !labelPlaced && !avoidBaseMark && (areaWidth = Math.abs(x22 - x12 + y22 - y12), x5 = (x12 + x22) / 2, y5 = (y12 + y22) / 2, areaWidth >= maxAreaWidth && !outOfBounds(x5, y5, textWidth, textHeight, width2, height2) && !collision($, x5, y5, textHeight, textWidth, textHeight, bm0, null) && (maxAreaWidth = areaWidth, d.x = x5, d.y = y5, labelPlaced2 = !0));
    }
    return labelPlaced || labelPlaced2 ? (x5 = textWidth / 2, y5 = textHeight / 2, bm0.setRange($(d.x - x5), $(d.y - y5), $(d.x + x5), $(d.y + y5)), d.align = "center", d.baseline = "middle", !0) : !1;
  };
}
var Aligns = ["right", "center", "left"], Baselines = ["bottom", "middle", "top"];
function placeMarkLabel($, bitmaps, anchors, offsets2) {
  let width2 = $.width, height2 = $.height, bm0 = bitmaps[0], bm1 = bitmaps[1], n = offsets2.length;
  return function(d) {
    let boundary2 = d.boundary, textHeight = d.datum.fontSize;
    if (boundary2[2] < 0 || boundary2[5] < 0 || boundary2[0] > width2 || boundary2[3] > height2)
      return !1;
    let textWidth = d.textWidth ?? 0, dx, dy, isInside, sizeFactor, insideFactor, x12, x22, y12, y22, xc, yc, _x1, _x22, _y1, _y22;
    for (let i = 0; i < n; ++i) {
      if (dx = (anchors[i] & 3) - 1, dy = (anchors[i] >>> 2 & 3) - 1, isInside = dx === 0 && dy === 0 || offsets2[i] < 0, sizeFactor = dx && dy ? Math.SQRT1_2 : 1, insideFactor = offsets2[i] < 0 ? -1 : 1, x12 = boundary2[1 + dx] + offsets2[i] * dx * sizeFactor, yc = boundary2[4 + dy] + insideFactor * textHeight * dy / 2 + offsets2[i] * dy * sizeFactor, y12 = yc - textHeight / 2, y22 = yc + textHeight / 2, _x1 = $(x12), _y1 = $(y12), _y22 = $(y22), !textWidth)
        if (test(_x1, _x1, _y1, _y22, bm0, bm1, x12, x12, y12, y22, boundary2, isInside))
          textWidth = textMetrics.width(d.datum, d.datum.text);
        else
          continue;
      if (xc = x12 + insideFactor * textWidth * dx / 2, x12 = xc - textWidth / 2, x22 = xc + textWidth / 2, _x1 = $(x12), _x22 = $(x22), test(_x1, _x22, _y1, _y22, bm0, bm1, x12, x22, y12, y22, boundary2, isInside))
        return d.x = dx ? dx * insideFactor < 0 ? x22 : x12 : xc, d.y = dy ? dy * insideFactor < 0 ? y22 : y12 : yc, d.align = Aligns[dx * insideFactor + 1], d.baseline = Baselines[dy * insideFactor + 1], bm0.setRange(_x1, _y1, _x22, _y22), !0;
    }
    return !1;
  };
}
function test(_x1, _x22, _y1, _y22, bm0, bm1, x12, x22, y12, y22, boundary2, isInside) {
  return !(bm0.outOfBounds(_x1, _y1, _x22, _y22) || (isInside && bm1 || bm0).getRange(_x1, _y1, _x22, _y22));
}
var TOP = 0, MIDDLE = 4, BOTTOM = 8, LEFT = 0, CENTER = 1, RIGHT = 2, anchorCode = {
  "top-left": TOP + LEFT,
  top: TOP + CENTER,
  "top-right": TOP + RIGHT,
  left: MIDDLE + LEFT,
  middle: MIDDLE + CENTER,
  right: MIDDLE + RIGHT,
  "bottom-left": BOTTOM + LEFT,
  bottom: BOTTOM + CENTER,
  "bottom-right": BOTTOM + RIGHT
}, placeAreaLabel = {
  naive: placeAreaLabelNaive,
  "reduced-search": placeAreaLabelReducedSearch,
  floodfill: placeAreaLabelFloodFill
};
function labelLayout(texts, size, compare3, offset4, anchor2, avoidMarks, avoidBaseMark, lineAnchor, markIndex, padding3, method2) {
  if (!texts.length) return texts;
  let positions = Math.max(offset4.length, anchor2.length), offsets2 = getOffsets(offset4, positions), anchors = getAnchors(anchor2, positions), marktype = markType(texts[0].datum), grouptype = marktype === "group" && texts[0].datum.items[markIndex].marktype, isGroupArea = grouptype === "area", boundary2 = markBoundary(marktype, grouptype, lineAnchor, markIndex), infPadding = padding3 === null || padding3 === 1 / 0, isNaiveGroupArea = isGroupArea && method2 === "naive", maxTextWidth = -1, maxTextHeight = -1, data3 = texts.map((d) => {
    let textWidth = infPadding ? textMetrics.width(d, d.text) : void 0;
    return maxTextWidth = Math.max(maxTextWidth, textWidth), maxTextHeight = Math.max(maxTextHeight, d.fontSize), {
      datum: d,
      opacity: 0,
      x: void 0,
      y: void 0,
      align: void 0,
      baseline: void 0,
      boundary: boundary2(d),
      textWidth
    };
  });
  padding3 = padding3 === null || padding3 === 1 / 0 ? Math.max(maxTextWidth, maxTextHeight) + Math.max(...offset4) : padding3;
  let $ = scaler(size[0], size[1], padding3), bitmaps;
  if (!isNaiveGroupArea) {
    compare3 && data3.sort((a, b10) => compare3(a.datum, b10.datum));
    let labelInside = !1;
    for (let i = 0; i < anchors.length && !labelInside; ++i)
      labelInside = anchors[i] === 5 || offsets2[i] < 0;
    let baseMark = (marktype && avoidBaseMark || isGroupArea) && texts.map((d) => d.datum);
    bitmaps = avoidMarks.length || baseMark ? markBitmaps($, baseMark || [], avoidMarks, labelInside, isGroupArea) : baseBitmaps($, avoidBaseMark && data3);
  }
  let place2 = isGroupArea ? placeAreaLabel[method2]($, bitmaps, avoidBaseMark, markIndex) : placeMarkLabel($, bitmaps, anchors, offsets2);
  return data3.forEach((d) => d.opacity = +place2(d)), data3;
}
function getOffsets(_, count4) {
  let offsets2 = new Float64Array(count4), n = _.length;
  for (let i = 0; i < n; ++i) offsets2[i] = _[i] || 0;
  for (let i = n; i < count4; ++i) offsets2[i] = offsets2[n - 1];
  return offsets2;
}
function getAnchors(_, count4) {
  let anchors = new Int8Array(count4), n = _.length;
  for (let i = 0; i < n; ++i) anchors[i] |= anchorCode[_[i]];
  for (let i = n; i < count4; ++i) anchors[i] = anchors[n - 1];
  return anchors;
}
function markType(item) {
  return item && item.mark && item.mark.marktype;
}
function markBoundary(marktype, grouptype, lineAnchor, markIndex) {
  let xy = (d) => [d.x, d.x, d.x, d.y, d.y, d.y];
  return marktype ? marktype === "line" || marktype === "area" ? (d) => xy(d.datum) : grouptype === "line" ? (d) => {
    let items = d.datum.items[markIndex].items;
    return xy(items.length ? items[lineAnchor === "start" ? 0 : items.length - 1] : {
      x: NaN,
      y: NaN
    });
  } : (d) => {
    let b10 = d.datum.bounds;
    return [b10.x1, (b10.x1 + b10.x2) / 2, b10.x2, b10.y1, (b10.y1 + b10.y2) / 2, b10.y2];
  } : xy;
}
var Output3 = ["x", "y", "opacity", "align", "baseline"], Anchors = ["top-left", "left", "bottom-left", "top", "bottom", "top-right", "right", "bottom-right"];
function Label(params2) {
  Transform.call(this, null, params2);
}
Label.Definition = {
  type: "Label",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "size",
    type: "number",
    array: !0,
    length: 2,
    required: !0
  }, {
    name: "sort",
    type: "compare"
  }, {
    name: "anchor",
    type: "string",
    array: !0,
    default: Anchors
  }, {
    name: "offset",
    type: "number",
    array: !0,
    default: [1]
  }, {
    name: "padding",
    type: "number",
    default: 0,
    null: !0
  }, {
    name: "lineAnchor",
    type: "string",
    values: ["start", "end"],
    default: "end"
  }, {
    name: "markIndex",
    type: "number",
    default: 0
  }, {
    name: "avoidBaseMark",
    type: "boolean",
    default: !0
  }, {
    name: "avoidMarks",
    type: "data",
    array: !0
  }, {
    name: "method",
    type: "string",
    default: "naive"
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: Output3.length,
    default: Output3
  }]
};
inherits_default(Label, Transform, {
  transform(_, pulse2) {
    function modp(param2) {
      let p = _[param2];
      return isFunction(p) && pulse2.modified(p.fields);
    }
    let mod = _.modified();
    if (!(mod || pulse2.changed(pulse2.ADD_REM) || modp("sort"))) return;
    (!_.size || _.size.length !== 2) && error62("Size parameter should be specified as a [width, height] array.");
    let as = _.as || Output3;
    return labelLayout(pulse2.materialize(pulse2.SOURCE).source || [], _.size, _.sort, array_default(_.offset == null ? 1 : _.offset), array_default(_.anchor || Anchors), _.avoidMarks || [], _.avoidBaseMark !== !1, _.lineAnchor || "end", _.markIndex || 0, _.padding === void 0 ? 0 : _.padding, _.method || "naive").forEach((l) => {
      let t = l.datum;
      t[as[0]] = l.x, t[as[1]] = l.y, t[as[2]] = l.opacity, t[as[3]] = l.align, t[as[4]] = l.baseline;
    }), pulse2.reflow(mod).modifies(as);
  }
});

// node_modules/vega-regression/build/vega-regression.js
var vega_regression_exports = {};
__export(vega_regression_exports, {
  loess: () => Loess,
  regression: () => Regression
});
function partition4(data3, groupby) {
  var groups = [], get6 = function(f) {
    return f(t);
  }, map4, i, n, t, k, g;
  if (groupby == null)
    groups.push(data3);
  else
    for (map4 = {}, i = 0, n = data3.length; i < n; ++i)
      t = data3[i], k = groupby.map(get6), g = map4[k], g || (map4[k] = g = [], g.dims = k, groups.push(g)), g.push(t);
  return groups;
}
function Loess(params2) {
  Transform.call(this, null, params2);
}
Loess.Definition = {
  type: "Loess",
  metadata: {
    generates: !0
  },
  params: [{
    name: "x",
    type: "field",
    required: !0
  }, {
    name: "y",
    type: "field",
    required: !0
  }, {
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "bandwidth",
    type: "number",
    default: 0.3
  }, {
    name: "as",
    type: "string",
    array: !0
  }]
};
inherits_default(Loess, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS);
    if (!this.value || pulse2.changed() || _.modified()) {
      let source4 = pulse2.materialize(pulse2.SOURCE).source, groups = partition4(source4, _.groupby), names = (_.groupby || []).map(accessorName), m = names.length, as = _.as || [accessorName(_.x), accessorName(_.y)], values3 = [];
      groups.forEach((g) => {
        loess(g, _.x, _.y, _.bandwidth || 0.3).forEach((p) => {
          let t = {};
          for (let i = 0; i < m; ++i)
            t[names[i]] = g.dims[i];
          t[as[0]] = p[0], t[as[1]] = p[1], values3.push(ingest$1(t));
        });
      }), this.value && (out.rem = this.value), this.value = out.add = out.source = values3;
    }
    return out;
  }
});
var Methods2 = {
  constant,
  linear,
  log: log3,
  exp: exp2,
  pow: pow2,
  quad,
  poly
}, degreesOfFreedom = (method2, order) => method2 === "poly" ? order : method2 === "quad" ? 2 : 1;
function Regression(params2) {
  Transform.call(this, null, params2);
}
Regression.Definition = {
  type: "Regression",
  metadata: {
    generates: !0
  },
  params: [{
    name: "x",
    type: "field",
    required: !0
  }, {
    name: "y",
    type: "field",
    required: !0
  }, {
    name: "groupby",
    type: "field",
    array: !0
  }, {
    name: "method",
    type: "string",
    default: "linear",
    values: Object.keys(Methods2)
  }, {
    name: "order",
    type: "number",
    default: 3
  }, {
    name: "extent",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "params",
    type: "boolean",
    default: !1
  }, {
    name: "as",
    type: "string",
    array: !0
  }]
};
inherits_default(Regression, Transform, {
  transform(_, pulse2) {
    let out = pulse2.fork(pulse2.NO_SOURCE | pulse2.NO_FIELDS);
    if (!this.value || pulse2.changed() || _.modified()) {
      let source4 = pulse2.materialize(pulse2.SOURCE).source, groups = partition4(source4, _.groupby), names = (_.groupby || []).map(accessorName), method2 = _.method || "linear", order = _.order == null ? 3 : _.order, dof = degreesOfFreedom(method2, order), as = _.as || [accessorName(_.x), accessorName(_.y)], fit3 = Methods2[method2], values3 = [], domain4 = _.extent;
      hasOwnProperty(Methods2, method2) || error62("Invalid regression method: " + method2), domain4 != null && method2 === "log" && domain4[0] <= 0 && (pulse2.dataflow.warn("Ignoring extent with values <= 0 for log regression."), domain4 = null), groups.forEach((g) => {
        if (g.length <= dof) {
          pulse2.dataflow.warn("Skipping regression with more parameters than data points.");
          return;
        }
        let model = fit3(g, _.x, _.y, order);
        if (_.params) {
          values3.push(ingest$1({
            keys: g.dims,
            coef: model.coef,
            rSquared: model.rSquared
          }));
          return;
        }
        let dom = domain4 || extent(g, _.x), add6 = (p) => {
          let t = {};
          for (let i = 0; i < names.length; ++i)
            t[names[i]] = g.dims[i];
          t[as[0]] = p[0], t[as[1]] = p[1], values3.push(ingest$1(t));
        };
        method2 === "linear" || method2 === "constant" ? dom.forEach((x5) => add6([x5, model.predict(x5)])) : sampleCurve(model.predict, dom, 25, 200).forEach(add6);
      }), this.value && (out.rem = this.value), this.value = out.add = out.source = values3;
    }
    return out;
  }
});

// node_modules/vega-voronoi/build/vega-voronoi.js
var vega_voronoi_exports = {};
__export(vega_voronoi_exports, {
  voronoi: () => Voronoi2
});

// node_modules/robust-predicates/esm/util.js
var epsilon6 = 11102230246251565e-32, splitter = 134217729, resulterrbound = (3 + 8 * epsilon6) * epsilon6;
function sum2(elen, e, flen, f, h2) {
  let Q, Qnew, hh, bvirt, enow = e[0], fnow = f[0], eindex = 0, findex = 0;
  fnow > enow == fnow > -enow ? (Q = enow, enow = e[++eindex]) : (Q = fnow, fnow = f[++findex]);
  let hindex = 0;
  if (eindex < elen && findex < flen)
    for (fnow > enow == fnow > -enow ? (Qnew = enow + Q, hh = Q - (Qnew - enow), enow = e[++eindex]) : (Qnew = fnow + Q, hh = Q - (Qnew - fnow), fnow = f[++findex]), Q = Qnew, hh !== 0 && (h2[hindex++] = hh); eindex < elen && findex < flen; )
      fnow > enow == fnow > -enow ? (Qnew = Q + enow, bvirt = Qnew - Q, hh = Q - (Qnew - bvirt) + (enow - bvirt), enow = e[++eindex]) : (Qnew = Q + fnow, bvirt = Qnew - Q, hh = Q - (Qnew - bvirt) + (fnow - bvirt), fnow = f[++findex]), Q = Qnew, hh !== 0 && (h2[hindex++] = hh);
  for (; eindex < elen; )
    Qnew = Q + enow, bvirt = Qnew - Q, hh = Q - (Qnew - bvirt) + (enow - bvirt), enow = e[++eindex], Q = Qnew, hh !== 0 && (h2[hindex++] = hh);
  for (; findex < flen; )
    Qnew = Q + fnow, bvirt = Qnew - Q, hh = Q - (Qnew - bvirt) + (fnow - bvirt), fnow = f[++findex], Q = Qnew, hh !== 0 && (h2[hindex++] = hh);
  return (Q !== 0 || hindex === 0) && (h2[hindex++] = Q), hindex;
}
function estimate(elen, e) {
  let Q = e[0];
  for (let i = 1; i < elen; i++) Q += e[i];
  return Q;
}
function vec(n) {
  return new Float64Array(n);
}

// node_modules/robust-predicates/esm/orient2d.js
var ccwerrboundA = (3 + 16 * epsilon6) * epsilon6, ccwerrboundB = (2 + 12 * epsilon6) * epsilon6, ccwerrboundC = (9 + 64 * epsilon6) * epsilon6 * epsilon6, B2 = vec(4), C1 = vec(8), C22 = vec(12), D3 = vec(16), u = vec(4);
function orient2dadapt(ax, ay, bx, by, cx, cy, detsum) {
  let acxtail, acytail, bcxtail, bcytail, bvirt, c, ahi, alo, bhi, blo, _i, _j, _0, s1, s0, t13, t04, u32, acx = ax - cx, bcx = bx - cx, acy = ay - cy, bcy = by - cy;
  s1 = acx * bcy, c = splitter * acx, ahi = c - (c - acx), alo = acx - ahi, c = splitter * bcy, bhi = c - (c - bcy), blo = bcy - bhi, s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo), t13 = acy * bcx, c = splitter * acy, ahi = c - (c - acy), alo = acy - ahi, c = splitter * bcx, bhi = c - (c - bcx), blo = bcx - bhi, t04 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo), _i = s0 - t04, bvirt = s0 - _i, B2[0] = s0 - (_i + bvirt) + (bvirt - t04), _j = s1 + _i, bvirt = _j - s1, _0 = s1 - (_j - bvirt) + (_i - bvirt), _i = _0 - t13, bvirt = _0 - _i, B2[1] = _0 - (_i + bvirt) + (bvirt - t13), u32 = _j + _i, bvirt = u32 - _j, B2[2] = _j - (u32 - bvirt) + (_i - bvirt), B2[3] = u32;
  let det = estimate(4, B2), errbound = ccwerrboundB * detsum;
  if (det >= errbound || -det >= errbound || (bvirt = ax - acx, acxtail = ax - (acx + bvirt) + (bvirt - cx), bvirt = bx - bcx, bcxtail = bx - (bcx + bvirt) + (bvirt - cx), bvirt = ay - acy, acytail = ay - (acy + bvirt) + (bvirt - cy), bvirt = by - bcy, bcytail = by - (bcy + bvirt) + (bvirt - cy), acxtail === 0 && acytail === 0 && bcxtail === 0 && bcytail === 0) || (errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det), det += acx * bcytail + bcy * acxtail - (acy * bcxtail + bcx * acytail), det >= errbound || -det >= errbound)) return det;
  s1 = acxtail * bcy, c = splitter * acxtail, ahi = c - (c - acxtail), alo = acxtail - ahi, c = splitter * bcy, bhi = c - (c - bcy), blo = bcy - bhi, s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo), t13 = acytail * bcx, c = splitter * acytail, ahi = c - (c - acytail), alo = acytail - ahi, c = splitter * bcx, bhi = c - (c - bcx), blo = bcx - bhi, t04 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo), _i = s0 - t04, bvirt = s0 - _i, u[0] = s0 - (_i + bvirt) + (bvirt - t04), _j = s1 + _i, bvirt = _j - s1, _0 = s1 - (_j - bvirt) + (_i - bvirt), _i = _0 - t13, bvirt = _0 - _i, u[1] = _0 - (_i + bvirt) + (bvirt - t13), u32 = _j + _i, bvirt = u32 - _j, u[2] = _j - (u32 - bvirt) + (_i - bvirt), u[3] = u32;
  let C1len = sum2(4, B2, 4, u, C1);
  s1 = acx * bcytail, c = splitter * acx, ahi = c - (c - acx), alo = acx - ahi, c = splitter * bcytail, bhi = c - (c - bcytail), blo = bcytail - bhi, s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo), t13 = acy * bcxtail, c = splitter * acy, ahi = c - (c - acy), alo = acy - ahi, c = splitter * bcxtail, bhi = c - (c - bcxtail), blo = bcxtail - bhi, t04 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo), _i = s0 - t04, bvirt = s0 - _i, u[0] = s0 - (_i + bvirt) + (bvirt - t04), _j = s1 + _i, bvirt = _j - s1, _0 = s1 - (_j - bvirt) + (_i - bvirt), _i = _0 - t13, bvirt = _0 - _i, u[1] = _0 - (_i + bvirt) + (bvirt - t13), u32 = _j + _i, bvirt = u32 - _j, u[2] = _j - (u32 - bvirt) + (_i - bvirt), u[3] = u32;
  let C2len = sum2(C1len, C1, 4, u, C22);
  s1 = acxtail * bcytail, c = splitter * acxtail, ahi = c - (c - acxtail), alo = acxtail - ahi, c = splitter * bcytail, bhi = c - (c - bcytail), blo = bcytail - bhi, s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo), t13 = acytail * bcxtail, c = splitter * acytail, ahi = c - (c - acytail), alo = acytail - ahi, c = splitter * bcxtail, bhi = c - (c - bcxtail), blo = bcxtail - bhi, t04 = alo * blo - (t13 - ahi * bhi - alo * bhi - ahi * blo), _i = s0 - t04, bvirt = s0 - _i, u[0] = s0 - (_i + bvirt) + (bvirt - t04), _j = s1 + _i, bvirt = _j - s1, _0 = s1 - (_j - bvirt) + (_i - bvirt), _i = _0 - t13, bvirt = _0 - _i, u[1] = _0 - (_i + bvirt) + (bvirt - t13), u32 = _j + _i, bvirt = u32 - _j, u[2] = _j - (u32 - bvirt) + (_i - bvirt), u[3] = u32;
  let Dlen = sum2(C2len, C22, 4, u, D3);
  return D3[Dlen - 1];
}
function orient2d(ax, ay, bx, by, cx, cy) {
  let detleft = (ay - cy) * (bx - cx), detright = (ax - cx) * (by - cy), det = detleft - detright, detsum = Math.abs(detleft + detright);
  return Math.abs(det) >= ccwerrboundA * detsum ? det : -orient2dadapt(ax, ay, bx, by, cx, cy, detsum);
}

// node_modules/robust-predicates/esm/orient3d.js
var o3derrboundA = (7 + 56 * epsilon6) * epsilon6, o3derrboundB = (3 + 28 * epsilon6) * epsilon6, o3derrboundC = (26 + 288 * epsilon6) * epsilon6 * epsilon6, bc = vec(4), ca = vec(4), ab = vec(4), at_b = vec(4), at_c = vec(4), bt_c = vec(4), bt_a = vec(4), ct_a = vec(4), ct_b = vec(4), bct = vec(8), cat = vec(8), abt = vec(8), u2 = vec(4), _8 = vec(8), _8b = vec(8), _16 = vec(16), _12 = vec(12), fin = vec(192), fin2 = vec(192);

// node_modules/robust-predicates/esm/incircle.js
var iccerrboundA = (10 + 96 * epsilon6) * epsilon6, iccerrboundB = (4 + 48 * epsilon6) * epsilon6, iccerrboundC = (44 + 576 * epsilon6) * epsilon6 * epsilon6, bc2 = vec(4), ca2 = vec(4), ab2 = vec(4), aa = vec(4), bb = vec(4), cc = vec(4), u3 = vec(4), v = vec(4), axtbc = vec(8), aytbc = vec(8), bxtca = vec(8), bytca = vec(8), cxtab = vec(8), cytab = vec(8), abt2 = vec(8), bct2 = vec(8), cat2 = vec(8), abtt = vec(4), bctt = vec(4), catt = vec(4), _82 = vec(8), _162 = vec(16), _16b = vec(16), _16c = vec(16), _32 = vec(32), _32b = vec(32), _48 = vec(48), _64 = vec(64), fin3 = vec(1152), fin22 = vec(1152);

// node_modules/robust-predicates/esm/insphere.js
var isperrboundA = (16 + 224 * epsilon6) * epsilon6, isperrboundB = (5 + 72 * epsilon6) * epsilon6, isperrboundC = (71 + 1408 * epsilon6) * epsilon6 * epsilon6, ab3 = vec(4), bc3 = vec(4), cd = vec(4), de = vec(4), ea2 = vec(4), ac = vec(4), bd = vec(4), ce = vec(4), da = vec(4), eb = vec(4), abc = vec(24), bcd = vec(24), cde = vec(24), dea = vec(24), eab = vec(24), abd = vec(24), bce = vec(24), cda = vec(24), deb = vec(24), eac = vec(24), adet = vec(1152), bdet = vec(1152), cdet = vec(1152), ddet = vec(1152), edet = vec(1152), abdet = vec(2304), cddet = vec(2304), cdedet = vec(3456), deter = vec(5760), _83 = vec(8), _8b2 = vec(8), _8c = vec(8), _163 = vec(16), _24 = vec(24), _482 = vec(48), _48b = vec(48), _96 = vec(96), _192 = vec(192), _384x = vec(384), _384y = vec(384), _384z = vec(384), _768 = vec(768);
var xdet = vec(96), ydet = vec(96), zdet = vec(96), fin4 = vec(1152);

// node_modules/delaunator/index.js
var EPSILON2 = Math.pow(2, -52), EDGE_STACK = new Uint32Array(512), Delaunator = class _Delaunator {
  /**
   * Constructs a delaunay triangulation object given an array of points (`[x, y]` by default).
   * `getX` and `getY` are optional functions of the form `(point) => value` for custom point formats.
   *
   * @template P
   * @param {P[]} points
   * @param {(p: P) => number} [getX]
   * @param {(p: P) => number} [getY]
   */
  // @ts-expect-error TS2322
  static from(points2, getX = defaultGetX, getY = defaultGetY) {
    let n = points2.length, coords = new Float64Array(n * 2);
    for (let i = 0; i < n; i++) {
      let p = points2[i];
      coords[2 * i] = getX(p), coords[2 * i + 1] = getY(p);
    }
    return new _Delaunator(coords);
  }
  /**
   * Constructs a delaunay triangulation object given an array of point coordinates of the form:
   * `[x0, y0, x1, y1, ...]` (use a typed array for best performance). Duplicate points are skipped.
   *
   * @param {T} coords
   */
  constructor(coords) {
    let n = coords.length >> 1;
    if (n > 0 && typeof coords[0] != "number") throw new Error("Expected coords to contain numbers.");
    this.coords = coords;
    let maxTriangles = Math.max(2 * n - 5, 0);
    this._triangles = new Uint32Array(maxTriangles * 3), this._halfedges = new Int32Array(maxTriangles * 3), this._hashSize = Math.ceil(Math.sqrt(n)), this._hullPrev = new Uint32Array(n), this._hullNext = new Uint32Array(n), this._hullTri = new Uint32Array(n), this._hullHash = new Int32Array(this._hashSize), this._ids = new Uint32Array(n), this._dists = new Float64Array(n), this.trianglesLen = 0, this._cx = 0, this._cy = 0, this._hullStart = 0, this.hull = this._triangles, this.triangles = this._triangles, this.halfedges = this._halfedges, this.update();
  }
  /**
   * Updates the triangulation if you modified `delaunay.coords` values in place, avoiding expensive memory allocations.
   * Useful for iterative relaxation algorithms such as Lloyd's.
   */
  update() {
    let { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this, n = coords.length >> 1, minX = 1 / 0, minY = 1 / 0, maxX = -1 / 0, maxY2 = -1 / 0;
    for (let i = 0; i < n; i++) {
      let x5 = coords[2 * i], y5 = coords[2 * i + 1];
      x5 < minX && (minX = x5), y5 < minY && (minY = y5), x5 > maxX && (maxX = x5), y5 > maxY2 && (maxY2 = y5), this._ids[i] = i;
    }
    let cx = (minX + maxX) / 2, cy = (minY + maxY2) / 2, i0 = 0, i1 = 0, i2 = 0;
    for (let i = 0, minDist = 1 / 0; i < n; i++) {
      let d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
      d < minDist && (i0 = i, minDist = d);
    }
    let i0x = coords[2 * i0], i0y = coords[2 * i0 + 1];
    for (let i = 0, minDist = 1 / 0; i < n; i++) {
      if (i === i0) continue;
      let d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
      d < minDist && d > 0 && (i1 = i, minDist = d);
    }
    let i1x = coords[2 * i1], i1y = coords[2 * i1 + 1], minRadius = 1 / 0;
    for (let i = 0; i < n; i++) {
      if (i === i0 || i === i1) continue;
      let r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
      r < minRadius && (i2 = i, minRadius = r);
    }
    let i2x = coords[2 * i2], i2y = coords[2 * i2 + 1];
    if (minRadius === 1 / 0) {
      for (let i = 0; i < n; i++)
        this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
      quicksort(this._ids, this._dists, 0, n - 1);
      let hull = new Uint32Array(n), j2 = 0;
      for (let i = 0, d0 = -1 / 0; i < n; i++) {
        let id3 = this._ids[i], d = this._dists[id3];
        d > d0 && (hull[j2++] = id3, d0 = d);
      }
      this.hull = hull.subarray(0, j2), this.triangles = new Uint32Array(0), this.halfedges = new Int32Array(0);
      return;
    }
    if (orient2d(i0x, i0y, i1x, i1y, i2x, i2y) < 0) {
      let i = i1, x5 = i1x, y5 = i1y;
      i1 = i2, i1x = i2x, i1y = i2y, i2 = i, i2x = x5, i2y = y5;
    }
    let center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
    this._cx = center.x, this._cy = center.y;
    for (let i = 0; i < n; i++)
      this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
    quicksort(this._ids, this._dists, 0, n - 1), this._hullStart = i0;
    let hullSize = 3;
    hullNext[i0] = hullPrev[i2] = i1, hullNext[i1] = hullPrev[i0] = i2, hullNext[i2] = hullPrev[i1] = i0, hullTri[i0] = 0, hullTri[i1] = 1, hullTri[i2] = 2, hullHash.fill(-1), hullHash[this._hashKey(i0x, i0y)] = i0, hullHash[this._hashKey(i1x, i1y)] = i1, hullHash[this._hashKey(i2x, i2y)] = i2, this.trianglesLen = 0, this._addTriangle(i0, i1, i2, -1, -1, -1);
    for (let k = 0, xp = 0, yp = 0; k < this._ids.length; k++) {
      let i = this._ids[k], x5 = coords[2 * i], y5 = coords[2 * i + 1];
      if (k > 0 && Math.abs(x5 - xp) <= EPSILON2 && Math.abs(y5 - yp) <= EPSILON2 || (xp = x5, yp = y5, i === i0 || i === i1 || i === i2)) continue;
      let start = 0;
      for (let j2 = 0, key2 = this._hashKey(x5, y5); j2 < this._hashSize && (start = hullHash[(key2 + j2) % this._hashSize], !(start !== -1 && start !== hullNext[start])); j2++)
        ;
      start = hullPrev[start];
      let e = start, q;
      for (; q = hullNext[e], orient2d(x5, y5, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1]) >= 0; )
        if (e = q, e === start) {
          e = -1;
          break;
        }
      if (e === -1) continue;
      let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);
      hullTri[i] = this._legalize(t + 2), hullTri[e] = t, hullSize++;
      let n2 = hullNext[e];
      for (; q = hullNext[n2], orient2d(x5, y5, coords[2 * n2], coords[2 * n2 + 1], coords[2 * q], coords[2 * q + 1]) < 0; )
        t = this._addTriangle(n2, i, q, hullTri[i], -1, hullTri[n2]), hullTri[i] = this._legalize(t + 2), hullNext[n2] = n2, hullSize--, n2 = q;
      if (e === start)
        for (; q = hullPrev[e], orient2d(x5, y5, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1]) < 0; )
          t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]), this._legalize(t + 2), hullTri[q] = t, hullNext[e] = e, hullSize--, e = q;
      this._hullStart = hullPrev[i] = e, hullNext[e] = hullPrev[n2] = i, hullNext[i] = n2, hullHash[this._hashKey(x5, y5)] = i, hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
    }
    this.hull = new Uint32Array(hullSize);
    for (let i = 0, e = this._hullStart; i < hullSize; i++)
      this.hull[i] = e, e = hullNext[e];
    this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
  }
  /**
   * Calculate an angle-based key for the edge hash used for advancing convex hull.
   *
   * @param {number} x
   * @param {number} y
   * @private
   */
  _hashKey(x5, y5) {
    return Math.floor(pseudoAngle(x5 - this._cx, y5 - this._cy) * this._hashSize) % this._hashSize;
  }
  /**
   * Flip an edge in a pair of triangles if it doesn't satisfy the Delaunay condition.
   *
   * @param {number} a
   * @private
   */
  _legalize(a) {
    let { _triangles: triangles, _halfedges: halfedges, coords } = this, i = 0, ar = 0;
    for (; ; ) {
      let b10 = halfedges[a], a0 = a - a % 3;
      if (ar = a0 + (a + 2) % 3, b10 === -1) {
        if (i === 0) break;
        a = EDGE_STACK[--i];
        continue;
      }
      let b02 = b10 - b10 % 3, al = a0 + (a + 1) % 3, bl2 = b02 + (b10 + 2) % 3, p02 = triangles[ar], pr = triangles[a], pl = triangles[al], p1 = triangles[bl2];
      if (inCircle(
        coords[2 * p02],
        coords[2 * p02 + 1],
        coords[2 * pr],
        coords[2 * pr + 1],
        coords[2 * pl],
        coords[2 * pl + 1],
        coords[2 * p1],
        coords[2 * p1 + 1]
      )) {
        triangles[a] = p1, triangles[b10] = p02;
        let hbl = halfedges[bl2];
        if (hbl === -1) {
          let e = this._hullStart;
          do {
            if (this._hullTri[e] === bl2) {
              this._hullTri[e] = a;
              break;
            }
            e = this._hullPrev[e];
          } while (e !== this._hullStart);
        }
        this._link(a, hbl), this._link(b10, halfedges[ar]), this._link(ar, bl2);
        let br2 = b02 + (b10 + 1) % 3;
        i < EDGE_STACK.length && (EDGE_STACK[i++] = br2);
      } else {
        if (i === 0) break;
        a = EDGE_STACK[--i];
      }
    }
    return ar;
  }
  /**
   * Link two half-edges to each other.
   * @param {number} a
   * @param {number} b
   * @private
   */
  _link(a, b10) {
    this._halfedges[a] = b10, b10 !== -1 && (this._halfedges[b10] = a);
  }
  /**
   * Add a new triangle given vertex indices and adjacent half-edge ids.
   *
   * @param {number} i0
   * @param {number} i1
   * @param {number} i2
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @private
   */
  _addTriangle(i0, i1, i2, a, b10, c) {
    let t = this.trianglesLen;
    return this._triangles[t] = i0, this._triangles[t + 1] = i1, this._triangles[t + 2] = i2, this._link(t, a), this._link(t + 1, b10), this._link(t + 2, c), this.trianglesLen += 3, t;
  }
};
function pseudoAngle(dx, dy) {
  let p = dx / (Math.abs(dx) + Math.abs(dy));
  return (dy > 0 ? 3 - p : 1 + p) / 4;
}
function dist(ax, ay, bx, by) {
  let dx = ax - bx, dy = ay - by;
  return dx * dx + dy * dy;
}
function inCircle(ax, ay, bx, by, cx, cy, px2, py2) {
  let dx = ax - px2, dy = ay - py2, ex = bx - px2, ey = by - py2, fx = cx - px2, fy = cy - py2, ap = dx * dx + dy * dy, bp = ex * ex + ey * ey, cp = fx * fx + fy * fy;
  return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
}
function circumradius(ax, ay, bx, by, cx, cy) {
  let dx = bx - ax, dy = by - ay, ex = cx - ax, ey = cy - ay, bl2 = dx * dx + dy * dy, cl = ex * ex + ey * ey, d = 0.5 / (dx * ey - dy * ex), x5 = (ey * bl2 - dy * cl) * d, y5 = (dx * cl - ex * bl2) * d;
  return x5 * x5 + y5 * y5;
}
function circumcenter(ax, ay, bx, by, cx, cy) {
  let dx = bx - ax, dy = by - ay, ex = cx - ax, ey = cy - ay, bl2 = dx * dx + dy * dy, cl = ex * ex + ey * ey, d = 0.5 / (dx * ey - dy * ex), x5 = ax + (ey * bl2 - dy * cl) * d, y5 = ay + (dx * cl - ex * bl2) * d;
  return { x: x5, y: y5 };
}
function quicksort(ids, dists, left, right) {
  if (right - left <= 20)
    for (let i = left + 1; i <= right; i++) {
      let temp2 = ids[i], tempDist = dists[temp2], j2 = i - 1;
      for (; j2 >= left && dists[ids[j2]] > tempDist; ) ids[j2 + 1] = ids[j2--];
      ids[j2 + 1] = temp2;
    }
  else {
    let median2 = left + right >> 1, i = left + 1, j2 = right;
    swap2(ids, median2, i), dists[ids[left]] > dists[ids[right]] && swap2(ids, left, right), dists[ids[i]] > dists[ids[right]] && swap2(ids, i, right), dists[ids[left]] > dists[ids[i]] && swap2(ids, left, i);
    let temp2 = ids[i], tempDist = dists[temp2];
    for (; ; ) {
      do
        i++;
      while (dists[ids[i]] < tempDist);
      do
        j2--;
      while (dists[ids[j2]] > tempDist);
      if (j2 < i) break;
      swap2(ids, i, j2);
    }
    ids[left + 1] = ids[j2], ids[j2] = temp2, right - i + 1 >= j2 - left ? (quicksort(ids, dists, i, right), quicksort(ids, dists, left, j2 - 1)) : (quicksort(ids, dists, left, j2 - 1), quicksort(ids, dists, i, right));
  }
}
function swap2(arr, i, j2) {
  let tmp = arr[i];
  arr[i] = arr[j2], arr[j2] = tmp;
}
function defaultGetX(p) {
  return p[0];
}
function defaultGetY(p) {
  return p[1];
}

// node_modules/d3-delaunay/src/path.js
var Path2 = class {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "";
  }
  moveTo(x5, y5) {
    this._ += `M${this._x0 = this._x1 = +x5},${this._y0 = this._y1 = +y5}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  }
  lineTo(x5, y5) {
    this._ += `L${this._x1 = +x5},${this._y1 = +y5}`;
  }
  arc(x5, y5, r) {
    x5 = +x5, y5 = +y5, r = +r;
    let x06 = x5 + r, y06 = y5;
    if (r < 0) throw new Error("negative radius");
    this._x1 === null ? this._ += `M${x06},${y06}` : (Math.abs(this._x1 - x06) > 1e-6 || Math.abs(this._y1 - y06) > 1e-6) && (this._ += "L" + x06 + "," + y06), r && (this._ += `A${r},${r},0,1,1,${x5 - r},${y5}A${r},${r},0,1,1,${this._x1 = x06},${this._y1 = y06}`);
  }
  rect(x5, y5, w2, h2) {
    this._ += `M${this._x0 = this._x1 = +x5},${this._y0 = this._y1 = +y5}h${+w2}v${+h2}h${-w2}Z`;
  }
  value() {
    return this._ || null;
  }
};

// node_modules/d3-delaunay/src/polygon.js
var Polygon = class {
  constructor() {
    this._ = [];
  }
  moveTo(x5, y5) {
    this._.push([x5, y5]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x5, y5) {
    this._.push([x5, y5]);
  }
  value() {
    return this._.length ? this._ : null;
  }
};

// node_modules/d3-delaunay/src/voronoi.js
var Voronoi = class {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
    this.delaunay = delaunay, this._circumcenters = new Float64Array(delaunay.points.length * 2), this.vectors = new Float64Array(delaunay.points.length * 2), this.xmax = xmax, this.xmin = xmin, this.ymax = ymax, this.ymin = ymin, this._init();
  }
  update() {
    return this.delaunay.update(), this._init(), this;
  }
  _init() {
    let { delaunay: { points: points2, hull, triangles }, vectors } = this, bx, by, circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
    for (let i = 0, j2 = 0, n = triangles.length, x5, y5; i < n; i += 3, j2 += 2) {
      let t13 = triangles[i] * 2, t22 = triangles[i + 1] * 2, t32 = triangles[i + 2] * 2, x13 = points2[t13], y13 = points2[t13 + 1], x22 = points2[t22], y22 = points2[t22 + 1], x32 = points2[t32], y32 = points2[t32 + 1], dx = x22 - x13, dy = y22 - y13, ex = x32 - x13, ey = y32 - y13, ab4 = (dx * ey - dy * ex) * 2;
      if (Math.abs(ab4) < 1e-9) {
        if (bx === void 0) {
          bx = by = 0;
          for (let i2 of hull) bx += points2[i2 * 2], by += points2[i2 * 2 + 1];
          bx /= hull.length, by /= hull.length;
        }
        let a = 1e9 * Math.sign((bx - x13) * ey - (by - y13) * ex);
        x5 = (x13 + x32) / 2 - a * ey, y5 = (y13 + y32) / 2 + a * ex;
      } else {
        let d = 1 / ab4, bl2 = dx * dx + dy * dy, cl = ex * ex + ey * ey;
        x5 = x13 + (ey * bl2 - dy * cl) * d, y5 = y13 + (dx * cl - ex * bl2) * d;
      }
      circumcenters[j2] = x5, circumcenters[j2 + 1] = y5;
    }
    let h2 = hull[hull.length - 1], p02, p1 = h2 * 4, x06, x12 = points2[2 * h2], y06, y12 = points2[2 * h2 + 1];
    vectors.fill(0);
    for (let i = 0; i < hull.length; ++i)
      h2 = hull[i], p02 = p1, x06 = x12, y06 = y12, p1 = h2 * 4, x12 = points2[2 * h2], y12 = points2[2 * h2 + 1], vectors[p02 + 2] = vectors[p1] = y06 - y12, vectors[p02 + 3] = vectors[p1 + 1] = x12 - x06;
  }
  render(context3) {
    let buffer = context3 == null ? context3 = new Path2() : void 0, { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
    if (hull.length <= 1) return null;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      let j2 = halfedges[i];
      if (j2 < i) continue;
      let ti = Math.floor(i / 3) * 2, tj = Math.floor(j2 / 3) * 2, xi = circumcenters[ti], yi = circumcenters[ti + 1], xj = circumcenters[tj], yj = circumcenters[tj + 1];
      this._renderSegment(xi, yi, xj, yj, context3);
    }
    let h0, h1 = hull[hull.length - 1];
    for (let i = 0; i < hull.length; ++i) {
      h0 = h1, h1 = hull[i];
      let t = Math.floor(inedges[h1] / 3) * 2, x5 = circumcenters[t], y5 = circumcenters[t + 1], v2 = h0 * 4, p = this._project(x5, y5, vectors[v2 + 2], vectors[v2 + 3]);
      p && this._renderSegment(x5, y5, p[0], p[1], context3);
    }
    return buffer && buffer.value();
  }
  renderBounds(context3) {
    let buffer = context3 == null ? context3 = new Path2() : void 0;
    return context3.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), buffer && buffer.value();
  }
  renderCell(i, context3) {
    let buffer = context3 == null ? context3 = new Path2() : void 0, points2 = this._clip(i);
    if (points2 === null || !points2.length) return;
    context3.moveTo(points2[0], points2[1]);
    let n = points2.length;
    for (; points2[0] === points2[n - 2] && points2[1] === points2[n - 1] && n > 1; ) n -= 2;
    for (let i2 = 2; i2 < n; i2 += 2)
      (points2[i2] !== points2[i2 - 2] || points2[i2 + 1] !== points2[i2 - 1]) && context3.lineTo(points2[i2], points2[i2 + 1]);
    return context3.closePath(), buffer && buffer.value();
  }
  *cellPolygons() {
    let { delaunay: { points: points2 } } = this;
    for (let i = 0, n = points2.length / 2; i < n; ++i) {
      let cell2 = this.cellPolygon(i);
      cell2 && (cell2.index = i, yield cell2);
    }
  }
  cellPolygon(i) {
    let polygon = new Polygon();
    return this.renderCell(i, polygon), polygon.value();
  }
  _renderSegment(x06, y06, x12, y12, context3) {
    let S, c0 = this._regioncode(x06, y06), c1 = this._regioncode(x12, y12);
    c0 === 0 && c1 === 0 ? (context3.moveTo(x06, y06), context3.lineTo(x12, y12)) : (S = this._clipSegment(x06, y06, x12, y12, c0, c1)) && (context3.moveTo(S[0], S[1]), context3.lineTo(S[2], S[3]));
  }
  contains(i, x5, y5) {
    return x5 = +x5, x5 !== x5 || (y5 = +y5, y5 !== y5) ? !1 : this.delaunay._step(i, x5, y5) === i;
  }
  *neighbors(i) {
    let ci = this._clip(i);
    if (ci) for (let j2 of this.delaunay.neighbors(i)) {
      let cj = this._clip(j2);
      if (cj) {
        loop: for (let ai = 0, li = ci.length; ai < li; ai += 2)
          for (let aj = 0, lj = cj.length; aj < lj; aj += 2)
            if (ci[ai] === cj[aj] && ci[ai + 1] === cj[aj + 1] && ci[(ai + 2) % li] === cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] === cj[(aj + lj - 1) % lj]) {
              yield j2;
              break loop;
            }
      }
    }
  }
  _cell(i) {
    let { circumcenters, delaunay: { inedges, halfedges, triangles } } = this, e0 = inedges[i];
    if (e0 === -1) return null;
    let points2 = [], e = e0;
    do {
      let t = Math.floor(e / 3);
      if (points2.push(circumcenters[t * 2], circumcenters[t * 2 + 1]), e = e % 3 === 2 ? e - 2 : e + 1, triangles[e] !== i) break;
      e = halfedges[e];
    } while (e !== e0 && e !== -1);
    return points2;
  }
  _clip(i) {
    if (i === 0 && this.delaunay.hull.length === 1)
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    let points2 = this._cell(i);
    if (points2 === null) return null;
    let { vectors: V } = this, v2 = i * 4;
    return this._simplify(V[v2] || V[v2 + 1] ? this._clipInfinite(i, points2, V[v2], V[v2 + 1], V[v2 + 2], V[v2 + 3]) : this._clipFinite(i, points2));
  }
  _clipFinite(i, points2) {
    let n = points2.length, P = null, x06, y06, x12 = points2[n - 2], y12 = points2[n - 1], c0, c1 = this._regioncode(x12, y12), e0, e1 = 0;
    for (let j2 = 0; j2 < n; j2 += 2)
      if (x06 = x12, y06 = y12, x12 = points2[j2], y12 = points2[j2 + 1], c0 = c1, c1 = this._regioncode(x12, y12), c0 === 0 && c1 === 0)
        e0 = e1, e1 = 0, P ? P.push(x12, y12) : P = [x12, y12];
      else {
        let S, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S = this._clipSegment(x06, y06, x12, y12, c0, c1)) === null) continue;
          [sx0, sy0, sx1, sy1] = S;
        } else {
          if ((S = this._clipSegment(x12, y12, x06, y06, c1, c0)) === null) continue;
          [sx1, sy1, sx0, sy0] = S, e0 = e1, e1 = this._edgecode(sx0, sy0), e0 && e1 && this._edge(i, e0, e1, P, P.length), P ? P.push(sx0, sy0) : P = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1), e0 && e1 && this._edge(i, e0, e1, P, P.length), P ? P.push(sx1, sy1) : P = [sx1, sy1];
      }
    if (P)
      e0 = e1, e1 = this._edgecode(P[0], P[1]), e0 && e1 && this._edge(i, e0, e1, P, P.length);
    else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2))
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    return P;
  }
  _clipSegment(x06, y06, x12, y12, c0, c1) {
    let flip2 = c0 < c1;
    for (flip2 && ([x06, y06, x12, y12, c0, c1] = [x12, y12, x06, y06, c1, c0]); ; ) {
      if (c0 === 0 && c1 === 0) return flip2 ? [x12, y12, x06, y06] : [x06, y06, x12, y12];
      if (c0 & c1) return null;
      let x5, y5, c = c0 || c1;
      c & 8 ? (x5 = x06 + (x12 - x06) * (this.ymax - y06) / (y12 - y06), y5 = this.ymax) : c & 4 ? (x5 = x06 + (x12 - x06) * (this.ymin - y06) / (y12 - y06), y5 = this.ymin) : c & 2 ? (y5 = y06 + (y12 - y06) * (this.xmax - x06) / (x12 - x06), x5 = this.xmax) : (y5 = y06 + (y12 - y06) * (this.xmin - x06) / (x12 - x06), x5 = this.xmin), c0 ? (x06 = x5, y06 = y5, c0 = this._regioncode(x06, y06)) : (x12 = x5, y12 = y5, c1 = this._regioncode(x12, y12));
    }
  }
  _clipInfinite(i, points2, vx0, vy0, vxn, vyn) {
    let P = Array.from(points2), p;
    if ((p = this._project(P[0], P[1], vx0, vy0)) && P.unshift(p[0], p[1]), (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn)) && P.push(p[0], p[1]), P = this._clipFinite(i, P))
      for (let j2 = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j2 < n; j2 += 2)
        c0 = c1, c1 = this._edgecode(P[j2], P[j2 + 1]), c0 && c1 && (j2 = this._edge(i, c0, c1, P, j2), n = P.length);
    else this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]);
    return P;
  }
  _edge(i, e0, e1, P, j2) {
    for (; e0 !== e1; ) {
      let x5, y5;
      switch (e0) {
        case 5:
          e0 = 4;
          continue;
        // top-left
        case 4:
          e0 = 6, x5 = this.xmax, y5 = this.ymin;
          break;
        // top
        case 6:
          e0 = 2;
          continue;
        // top-right
        case 2:
          e0 = 10, x5 = this.xmax, y5 = this.ymax;
          break;
        // right
        case 10:
          e0 = 8;
          continue;
        // bottom-right
        case 8:
          e0 = 9, x5 = this.xmin, y5 = this.ymax;
          break;
        // bottom
        case 9:
          e0 = 1;
          continue;
        // bottom-left
        case 1:
          e0 = 5, x5 = this.xmin, y5 = this.ymin;
          break;
      }
      (P[j2] !== x5 || P[j2 + 1] !== y5) && this.contains(i, x5, y5) && (P.splice(j2, 0, x5, y5), j2 += 2);
    }
    return j2;
  }
  _project(x06, y06, vx, vy) {
    let t = 1 / 0, c, x5, y5;
    if (vy < 0) {
      if (y06 <= this.ymin) return null;
      (c = (this.ymin - y06) / vy) < t && (y5 = this.ymin, x5 = x06 + (t = c) * vx);
    } else if (vy > 0) {
      if (y06 >= this.ymax) return null;
      (c = (this.ymax - y06) / vy) < t && (y5 = this.ymax, x5 = x06 + (t = c) * vx);
    }
    if (vx > 0) {
      if (x06 >= this.xmax) return null;
      (c = (this.xmax - x06) / vx) < t && (x5 = this.xmax, y5 = y06 + (t = c) * vy);
    } else if (vx < 0) {
      if (x06 <= this.xmin) return null;
      (c = (this.xmin - x06) / vx) < t && (x5 = this.xmin, y5 = y06 + (t = c) * vy);
    }
    return [x5, y5];
  }
  _edgecode(x5, y5) {
    return (x5 === this.xmin ? 1 : x5 === this.xmax ? 2 : 0) | (y5 === this.ymin ? 4 : y5 === this.ymax ? 8 : 0);
  }
  _regioncode(x5, y5) {
    return (x5 < this.xmin ? 1 : x5 > this.xmax ? 2 : 0) | (y5 < this.ymin ? 4 : y5 > this.ymax ? 8 : 0);
  }
  _simplify(P) {
    if (P && P.length > 4) {
      for (let i = 0; i < P.length; i += 2) {
        let j2 = (i + 2) % P.length, k = (i + 4) % P.length;
        (P[i] === P[j2] && P[j2] === P[k] || P[i + 1] === P[j2 + 1] && P[j2 + 1] === P[k + 1]) && (P.splice(j2, 2), i -= 2);
      }
      P.length || (P = null);
    }
    return P;
  }
};

// node_modules/d3-delaunay/src/delaunay.js
var tau5 = 2 * Math.PI, pow5 = Math.pow;
function pointX(p) {
  return p[0];
}
function pointY(p) {
  return p[1];
}
function collinear2(d) {
  let { triangles, coords } = d;
  for (let i = 0; i < triangles.length; i += 3) {
    let a = 2 * triangles[i], b10 = 2 * triangles[i + 1], c = 2 * triangles[i + 2];
    if ((coords[c] - coords[a]) * (coords[b10 + 1] - coords[a + 1]) - (coords[b10] - coords[a]) * (coords[c + 1] - coords[a + 1]) > 1e-10) return !1;
  }
  return !0;
}
function jitter(x5, y5, r) {
  return [x5 + Math.sin(x5 + y5) * r, y5 + Math.cos(x5 - y5) * r];
}
var Delaunay = class _Delaunay {
  static from(points2, fx = pointX, fy = pointY, that) {
    return new _Delaunay("length" in points2 ? flatArray(points2, fx, fy, that) : Float64Array.from(flatIterable(points2, fx, fy, that)));
  }
  constructor(points2) {
    this._delaunator = new Delaunator(points2), this.inedges = new Int32Array(points2.length / 2), this._hullIndex = new Int32Array(points2.length / 2), this.points = this._delaunator.coords, this._init();
  }
  update() {
    return this._delaunator.update(), this._init(), this;
  }
  _init() {
    let d = this._delaunator, points2 = this.points;
    if (d.hull && d.hull.length > 2 && collinear2(d)) {
      this.collinear = Int32Array.from({ length: points2.length / 2 }, (_, i) => i).sort((i, j2) => points2[2 * i] - points2[2 * j2] || points2[2 * i + 1] - points2[2 * j2 + 1]);
      let e = this.collinear[0], f = this.collinear[this.collinear.length - 1], bounds2 = [points2[2 * e], points2[2 * e + 1], points2[2 * f], points2[2 * f + 1]], r = 1e-8 * Math.hypot(bounds2[3] - bounds2[1], bounds2[2] - bounds2[0]);
      for (let i = 0, n = points2.length / 2; i < n; ++i) {
        let p = jitter(points2[2 * i], points2[2 * i + 1], r);
        points2[2 * i] = p[0], points2[2 * i + 1] = p[1];
      }
      this._delaunator = new Delaunator(points2);
    } else
      delete this.collinear;
    let halfedges = this.halfedges = this._delaunator.halfedges, hull = this.hull = this._delaunator.hull, triangles = this.triangles = this._delaunator.triangles, inedges = this.inedges.fill(-1), hullIndex = this._hullIndex.fill(-1);
    for (let e = 0, n = halfedges.length; e < n; ++e) {
      let p = triangles[e % 3 === 2 ? e - 2 : e + 1];
      (halfedges[e] === -1 || inedges[p] === -1) && (inedges[p] = e);
    }
    for (let i = 0, n = hull.length; i < n; ++i)
      hullIndex[hull[i]] = i;
    hull.length <= 2 && hull.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = hull[0], inedges[hull[0]] = 1, hull.length === 2 && (inedges[hull[1]] = 0, this.triangles[1] = hull[1], this.triangles[2] = hull[1]));
  }
  voronoi(bounds2) {
    return new Voronoi(this, bounds2);
  }
  *neighbors(i) {
    let { inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear3 } = this;
    if (collinear3) {
      let l = collinear3.indexOf(i);
      l > 0 && (yield collinear3[l - 1]), l < collinear3.length - 1 && (yield collinear3[l + 1]);
      return;
    }
    let e0 = inedges[i];
    if (e0 === -1) return;
    let e = e0, p02 = -1;
    do {
      if (yield p02 = triangles[e], e = e % 3 === 2 ? e - 2 : e + 1, triangles[e] !== i) return;
      if (e = halfedges[e], e === -1) {
        let p = hull[(_hullIndex[i] + 1) % hull.length];
        p !== p02 && (yield p);
        return;
      }
    } while (e !== e0);
  }
  find(x5, y5, i = 0) {
    if (x5 = +x5, x5 !== x5 || (y5 = +y5, y5 !== y5)) return -1;
    let i0 = i, c;
    for (; (c = this._step(i, x5, y5)) >= 0 && c !== i && c !== i0; ) i = c;
    return c;
  }
  _step(i, x5, y5) {
    let { inedges, hull, _hullIndex, halfedges, triangles, points: points2 } = this;
    if (inedges[i] === -1 || !points2.length) return (i + 1) % (points2.length >> 1);
    let c = i, dc = pow5(x5 - points2[i * 2], 2) + pow5(y5 - points2[i * 2 + 1], 2), e0 = inedges[i], e = e0;
    do {
      let t = triangles[e], dt = pow5(x5 - points2[t * 2], 2) + pow5(y5 - points2[t * 2 + 1], 2);
      if (dt < dc && (dc = dt, c = t), e = e % 3 === 2 ? e - 2 : e + 1, triangles[e] !== i) break;
      if (e = halfedges[e], e === -1) {
        if (e = hull[(_hullIndex[i] + 1) % hull.length], e !== t && pow5(x5 - points2[e * 2], 2) + pow5(y5 - points2[e * 2 + 1], 2) < dc)
          return e;
        break;
      }
    } while (e !== e0);
    return c;
  }
  render(context3) {
    let buffer = context3 == null ? context3 = new Path2() : void 0, { points: points2, halfedges, triangles } = this;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      let j2 = halfedges[i];
      if (j2 < i) continue;
      let ti = triangles[i] * 2, tj = triangles[j2] * 2;
      context3.moveTo(points2[ti], points2[ti + 1]), context3.lineTo(points2[tj], points2[tj + 1]);
    }
    return this.renderHull(context3), buffer && buffer.value();
  }
  renderPoints(context3, r) {
    r === void 0 && (!context3 || typeof context3.moveTo != "function") && (r = context3, context3 = null), r = r == null ? 2 : +r;
    let buffer = context3 == null ? context3 = new Path2() : void 0, { points: points2 } = this;
    for (let i = 0, n = points2.length; i < n; i += 2) {
      let x5 = points2[i], y5 = points2[i + 1];
      context3.moveTo(x5 + r, y5), context3.arc(x5, y5, r, 0, tau5);
    }
    return buffer && buffer.value();
  }
  renderHull(context3) {
    let buffer = context3 == null ? context3 = new Path2() : void 0, { hull, points: points2 } = this, h2 = hull[0] * 2, n = hull.length;
    context3.moveTo(points2[h2], points2[h2 + 1]);
    for (let i = 1; i < n; ++i) {
      let h3 = 2 * hull[i];
      context3.lineTo(points2[h3], points2[h3 + 1]);
    }
    return context3.closePath(), buffer && buffer.value();
  }
  hullPolygon() {
    let polygon = new Polygon();
    return this.renderHull(polygon), polygon.value();
  }
  renderTriangle(i, context3) {
    let buffer = context3 == null ? context3 = new Path2() : void 0, { points: points2, triangles } = this, t04 = triangles[i *= 3] * 2, t13 = triangles[i + 1] * 2, t22 = triangles[i + 2] * 2;
    return context3.moveTo(points2[t04], points2[t04 + 1]), context3.lineTo(points2[t13], points2[t13 + 1]), context3.lineTo(points2[t22], points2[t22 + 1]), context3.closePath(), buffer && buffer.value();
  }
  *trianglePolygons() {
    let { triangles } = this;
    for (let i = 0, n = triangles.length / 3; i < n; ++i)
      yield this.trianglePolygon(i);
  }
  trianglePolygon(i) {
    let polygon = new Polygon();
    return this.renderTriangle(i, polygon), polygon.value();
  }
};
function flatArray(points2, fx, fy, that) {
  let n = points2.length, array4 = new Float64Array(n * 2);
  for (let i = 0; i < n; ++i) {
    let p = points2[i];
    array4[i * 2] = fx.call(that, p, i, points2), array4[i * 2 + 1] = fy.call(that, p, i, points2);
  }
  return array4;
}
function* flatIterable(points2, fx, fy, that) {
  let i = 0;
  for (let p of points2)
    yield fx.call(that, p, i, points2), yield fy.call(that, p, i, points2), ++i;
}

// node_modules/vega-voronoi/build/vega-voronoi.js
function Voronoi2(params2) {
  Transform.call(this, null, params2);
}
Voronoi2.Definition = {
  type: "Voronoi",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "x",
    type: "field",
    required: !0
  }, {
    name: "y",
    type: "field",
    required: !0
  }, {
    name: "size",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "extent",
    type: "array",
    array: !0,
    length: 2,
    default: [[-1e5, -1e5], [1e5, 1e5]],
    content: {
      type: "number",
      array: !0,
      length: 2
    }
  }, {
    name: "as",
    type: "string",
    default: "path"
  }]
};
var defaultExtent = [-1e5, -1e5, 1e5, 1e5];
inherits_default(Voronoi2, Transform, {
  transform(_, pulse2) {
    let as = _.as || "path", data3 = pulse2.source;
    if (!data3 || !data3.length) return pulse2;
    let s = _.size;
    s = s ? [0, 0, s[0], s[1]] : (s = _.extent) ? [s[0][0], s[0][1], s[1][0], s[1][1]] : defaultExtent;
    let voronoi = this.value = Delaunay.from(data3, _.x, _.y).voronoi(s);
    for (let i = 0, n = data3.length; i < n; ++i) {
      let polygon = voronoi.cellPolygon(i);
      data3[i][as] = polygon && !isPoint(polygon) ? toPathString(polygon) : null;
    }
    return pulse2.reflow(_.modified()).modifies(as);
  }
});
function toPathString(p) {
  let x5 = p[0][0], y5 = p[0][1], n = p.length - 1;
  for (; p[n][0] === x5 && p[n][1] === y5; --n) ;
  return "M" + p.slice(0, n + 1).join("L") + "Z";
}
function isPoint(p) {
  return p.length === 2 && p[0][0] === p[1][0] && p[0][1] === p[1][1];
}

// node_modules/vega-wordcloud/build/vega-wordcloud.js
var vega_wordcloud_exports = {};
__export(vega_wordcloud_exports, {
  wordcloud: () => Wordcloud
});
var cloudRadians = Math.PI / 180, cw = 64, ch = 2048;
function cloud() {
  var size = [256, 256], text4, font2, fontSize2, fontStyle, fontWeight, rotate2, padding3, spiral = archimedeanSpiral, words = [], random2 = Math.random, cloud2 = {};
  cloud2.layout = function() {
    for (var contextAndRatio = getContext2(canvas()), board = zeroArray((size[0] >> 5) * size[1]), bounds2 = null, n = words.length, i = -1, tags = [], data3 = words.map((d2) => ({
      text: text4(d2),
      font: font2(d2),
      style: fontStyle(d2),
      weight: fontWeight(d2),
      rotate: rotate2(d2),
      size: ~~(fontSize2(d2) + 1e-14),
      padding: padding3(d2),
      xoff: 0,
      yoff: 0,
      x1: 0,
      y1: 0,
      x0: 0,
      y0: 0,
      hasText: !1,
      sprite: null,
      datum: d2
    })).sort((a, b10) => b10.size - a.size); ++i < n; ) {
      var d = data3[i];
      d.x = size[0] * (random2() + 0.5) >> 1, d.y = size[1] * (random2() + 0.5) >> 1, cloudSprite(contextAndRatio, d, data3, i), d.hasText && place2(board, d, bounds2) && (tags.push(d), bounds2 ? cloudBounds(bounds2, d) : bounds2 = [{
        x: d.x + d.x0,
        y: d.y + d.y0
      }, {
        x: d.x + d.x1,
        y: d.y + d.y1
      }], d.x -= size[0] >> 1, d.y -= size[1] >> 1);
    }
    return tags;
  };
  function getContext2(canvas2) {
    canvas2.width = canvas2.height = 1;
    var ratio = Math.sqrt(canvas2.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);
    canvas2.width = (cw << 5) / ratio, canvas2.height = ch / ratio;
    var context3 = canvas2.getContext("2d");
    return context3.fillStyle = context3.strokeStyle = "red", context3.textAlign = "center", {
      context: context3,
      ratio
    };
  }
  function place2(board, tag, bounds2) {
    for (var startX = tag.x, startY = tag.y, maxDelta = Math.hypot(size[0], size[1]), s = spiral(size), dt = random2() < 0.5 ? 1 : -1, t = -dt, dxdy, dx, dy; (dxdy = s(t += dt)) && (dx = ~~dxdy[0], dy = ~~dxdy[1], !(Math.min(Math.abs(dx), Math.abs(dy)) >= maxDelta)); )
      if (tag.x = startX + dx, tag.y = startY + dy, !(tag.x + tag.x0 < 0 || tag.y + tag.y0 < 0 || tag.x + tag.x1 > size[0] || tag.y + tag.y1 > size[1]) && (!bounds2 || !cloudCollide(tag, board, size[0])) && (!bounds2 || collideRects(tag, bounds2))) {
        for (var sprite = tag.sprite, w2 = tag.width >> 5, sw = size[0] >> 5, lx2 = tag.x - (w2 << 4), sx = lx2 & 127, msx = 32 - sx, h2 = tag.y1 - tag.y0, x5 = (tag.y + tag.y0) * sw + (lx2 >> 5), last, j2 = 0; j2 < h2; j2++) {
          last = 0;
          for (var i = 0; i <= w2; i++)
            board[x5 + i] |= last << msx | (i < w2 ? (last = sprite[j2 * w2 + i]) >>> sx : 0);
          x5 += sw;
        }
        return tag.sprite = null, !0;
      }
    return !1;
  }
  return cloud2.words = function(_) {
    return arguments.length ? (words = _, cloud2) : words;
  }, cloud2.size = function(_) {
    return arguments.length ? (size = [+_[0], +_[1]], cloud2) : size;
  }, cloud2.font = function(_) {
    return arguments.length ? (font2 = functor(_), cloud2) : font2;
  }, cloud2.fontStyle = function(_) {
    return arguments.length ? (fontStyle = functor(_), cloud2) : fontStyle;
  }, cloud2.fontWeight = function(_) {
    return arguments.length ? (fontWeight = functor(_), cloud2) : fontWeight;
  }, cloud2.rotate = function(_) {
    return arguments.length ? (rotate2 = functor(_), cloud2) : rotate2;
  }, cloud2.text = function(_) {
    return arguments.length ? (text4 = functor(_), cloud2) : text4;
  }, cloud2.spiral = function(_) {
    return arguments.length ? (spiral = spirals[_] || _, cloud2) : spiral;
  }, cloud2.fontSize = function(_) {
    return arguments.length ? (fontSize2 = functor(_), cloud2) : fontSize2;
  }, cloud2.padding = function(_) {
    return arguments.length ? (padding3 = functor(_), cloud2) : padding3;
  }, cloud2.random = function(_) {
    return arguments.length ? (random2 = _, cloud2) : random2;
  }, cloud2;
}
function cloudSprite(contextAndRatio, d, data3, di) {
  if (!d.sprite) {
    var c = contextAndRatio.context, ratio = contextAndRatio.ratio;
    c.clearRect(0, 0, (cw << 5) / ratio, ch / ratio);
    var x5 = 0, y5 = 0, maxh = 0, n = data3.length, w2, w32, h2, i, j2;
    for (--di; ++di < n; ) {
      if (d = data3[di], c.save(), c.font = d.style + " " + d.weight + " " + ~~((d.size + 1) / ratio) + "px " + d.font, w2 = c.measureText(d.text + "m").width * ratio, h2 = d.size << 1, d.rotate) {
        var sr = Math.sin(d.rotate * cloudRadians), cr2 = Math.cos(d.rotate * cloudRadians), wcr = w2 * cr2, wsr = w2 * sr, hcr = h2 * cr2, hsr = h2 * sr;
        w2 = Math.max(Math.abs(wcr + hsr), Math.abs(wcr - hsr)) + 31 >> 5 << 5, h2 = ~~Math.max(Math.abs(wsr + hcr), Math.abs(wsr - hcr));
      } else
        w2 = w2 + 31 >> 5 << 5;
      if (h2 > maxh && (maxh = h2), x5 + w2 >= cw << 5 && (x5 = 0, y5 += maxh, maxh = 0), y5 + h2 >= ch) break;
      c.translate((x5 + (w2 >> 1)) / ratio, (y5 + (h2 >> 1)) / ratio), d.rotate && c.rotate(d.rotate * cloudRadians), c.fillText(d.text, 0, 0), d.padding && (c.lineWidth = 2 * d.padding, c.strokeText(d.text, 0, 0)), c.restore(), d.width = w2, d.height = h2, d.xoff = x5, d.yoff = y5, d.x1 = w2 >> 1, d.y1 = h2 >> 1, d.x0 = -d.x1, d.y0 = -d.y1, d.hasText = !0, x5 += w2;
    }
    for (var pixels = c.getImageData(0, 0, (cw << 5) / ratio, ch / ratio).data, sprite = []; --di >= 0; )
      if (d = data3[di], !!d.hasText) {
        for (w2 = d.width, w32 = w2 >> 5, h2 = d.y1 - d.y0, i = 0; i < h2 * w32; i++) sprite[i] = 0;
        if (x5 = d.xoff, x5 == null) return;
        y5 = d.yoff;
        var seen = 0, seenRow = -1;
        for (j2 = 0; j2 < h2; j2++) {
          for (i = 0; i < w2; i++) {
            var k = w32 * j2 + (i >> 5), m = pixels[(y5 + j2) * (cw << 5) + (x5 + i) << 2] ? 1 << 31 - i % 32 : 0;
            sprite[k] |= m, seen |= m;
          }
          seen ? seenRow = j2 : (d.y0++, h2--, j2--, y5++);
        }
        d.y1 = d.y0 + seenRow, d.sprite = sprite.slice(0, (d.y1 - d.y0) * w32);
      }
  }
}
function cloudCollide(tag, board, sw) {
  sw >>= 5;
  for (var sprite = tag.sprite, w2 = tag.width >> 5, lx2 = tag.x - (w2 << 4), sx = lx2 & 127, msx = 32 - sx, h2 = tag.y1 - tag.y0, x5 = (tag.y + tag.y0) * sw + (lx2 >> 5), last, j2 = 0; j2 < h2; j2++) {
    last = 0;
    for (var i = 0; i <= w2; i++)
      if ((last << msx | (i < w2 ? (last = sprite[j2 * w2 + i]) >>> sx : 0)) & board[x5 + i]) return !0;
    x5 += sw;
  }
  return !1;
}
function cloudBounds(bounds2, d) {
  var b02 = bounds2[0], b12 = bounds2[1];
  d.x + d.x0 < b02.x && (b02.x = d.x + d.x0), d.y + d.y0 < b02.y && (b02.y = d.y + d.y0), d.x + d.x1 > b12.x && (b12.x = d.x + d.x1), d.y + d.y1 > b12.y && (b12.y = d.y + d.y1);
}
function collideRects(a, b10) {
  return a.x + a.x1 > b10[0].x && a.x + a.x0 < b10[1].x && a.y + a.y1 > b10[0].y && a.y + a.y0 < b10[1].y;
}
function archimedeanSpiral(size) {
  var e = size[0] / size[1];
  return function(t) {
    return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
  };
}
function rectangularSpiral(size) {
  var dy = 4, dx = dy * size[0] / size[1], x5 = 0, y5 = 0;
  return function(t) {
    var sign3 = t < 0 ? -1 : 1;
    switch (Math.sqrt(1 + 4 * sign3 * t) - sign3 & 3) {
      case 0:
        x5 += dx;
        break;
      case 1:
        y5 += dy;
        break;
      case 2:
        x5 -= dx;
        break;
      default:
        y5 -= dy;
        break;
    }
    return [x5, y5];
  };
}
function zeroArray(n) {
  for (var a = [], i = -1; ++i < n; ) a[i] = 0;
  return a;
}
function functor(d) {
  return typeof d == "function" ? d : function() {
    return d;
  };
}
var spirals = {
  archimedean: archimedeanSpiral,
  rectangular: rectangularSpiral
}, Output4 = ["x", "y", "font", "fontSize", "fontStyle", "fontWeight", "angle"], Params2 = ["text", "font", "rotate", "fontSize", "fontStyle", "fontWeight"];
function Wordcloud(params2) {
  Transform.call(this, cloud(), params2);
}
Wordcloud.Definition = {
  type: "Wordcloud",
  metadata: {
    modifies: !0
  },
  params: [{
    name: "size",
    type: "number",
    array: !0,
    length: 2
  }, {
    name: "font",
    type: "string",
    expr: !0,
    default: "sans-serif"
  }, {
    name: "fontStyle",
    type: "string",
    expr: !0,
    default: "normal"
  }, {
    name: "fontWeight",
    type: "string",
    expr: !0,
    default: "normal"
  }, {
    name: "fontSize",
    type: "number",
    expr: !0,
    default: 14
  }, {
    name: "fontSizeRange",
    type: "number",
    array: "nullable",
    default: [10, 50]
  }, {
    name: "rotate",
    type: "number",
    expr: !0,
    default: 0
  }, {
    name: "text",
    type: "field"
  }, {
    name: "spiral",
    type: "string",
    values: ["archimedean", "rectangular"]
  }, {
    name: "padding",
    type: "number",
    expr: !0
  }, {
    name: "as",
    type: "string",
    array: !0,
    length: 7,
    default: Output4
  }]
};
inherits_default(Wordcloud, Transform, {
  transform(_, pulse2) {
    _.size && !(_.size[0] && _.size[1]) && error62("Wordcloud size dimensions must be non-zero.");
    function modp(param2) {
      let p = _[param2];
      return isFunction(p) && pulse2.modified(p.fields);
    }
    let mod = _.modified();
    if (!(mod || pulse2.changed(pulse2.ADD_REM) || Params2.some(modp))) return;
    let data3 = pulse2.materialize(pulse2.SOURCE).source, layout = this.value, as = _.as || Output4, fontSize2 = _.fontSize || 14, range7;
    if (isFunction(fontSize2) ? range7 = _.fontSizeRange : fontSize2 = constant_default(fontSize2), range7) {
      let fsize = fontSize2, sizeScale = scale("sqrt")().domain(extent(data3, fsize)).range(range7);
      fontSize2 = (x5) => sizeScale(fsize(x5));
    }
    data3.forEach((t) => {
      t[as[0]] = NaN, t[as[1]] = NaN, t[as[3]] = 0;
    });
    let words = layout.words(data3).text(_.text).size(_.size || [500, 500]).padding(_.padding || 1).spiral(_.spiral || "archimedean").rotate(_.rotate || 0).font(_.font || "sans-serif").fontStyle(_.fontStyle || "normal").fontWeight(_.fontWeight || "normal").fontSize(fontSize2).random(random).layout(), size = layout.size(), dx = size[0] >> 1, dy = size[1] >> 1, n = words.length;
    for (let i = 0, w2, t; i < n; ++i)
      w2 = words[i], t = w2.datum, t[as[0]] = w2.x + dx, t[as[1]] = w2.y + dy, t[as[2]] = w2.font, t[as[3]] = w2.size, t[as[4]] = w2.style, t[as[5]] = w2.weight, t[as[6]] = w2.rotate;
    return pulse2.reflow(mod).modifies(as);
  }
});

// node_modules/vega-crossfilter/build/vega-crossfilter.js
var vega_crossfilter_exports = {};
__export(vega_crossfilter_exports, {
  crossfilter: () => CrossFilter,
  resolvefilter: () => ResolveFilter
});
var array8 = (n) => new Uint8Array(n), array16 = (n) => new Uint16Array(n), array32 = (n) => new Uint32Array(n);
function Bitmaps() {
  let width2 = 8, data3 = [], seen = array32(0), curr = array2(0, width2), prev = array2(0, width2);
  return {
    data: () => data3,
    seen: () => seen = lengthen(seen, data3.length),
    add(array4) {
      for (let i = 0, j2 = data3.length, n = array4.length, t; i < n; ++i)
        t = array4[i], t._index = j2++, data3.push(t);
    },
    remove(num, map4) {
      let n = data3.length, copy5 = Array(n - num), reindex = data3, t, i, j2;
      for (i = 0; !map4[i] && i < n; ++i)
        copy5[i] = data3[i], reindex[i] = i;
      for (j2 = i; i < n; ++i)
        t = data3[i], map4[i] ? reindex[i] = -1 : (reindex[i] = j2, curr[j2] = curr[i], prev[j2] = prev[i], copy5[j2] = t, t._index = j2++), curr[i] = 0;
      return data3 = copy5, reindex;
    },
    size: () => data3.length,
    curr: () => curr,
    prev: () => prev,
    reset: (k) => prev[k] = curr[k],
    all: () => width2 < 257 ? 255 : width2 < 65537 ? 65535 : 4294967295,
    set(k, one4) {
      curr[k] |= one4;
    },
    clear(k, one4) {
      curr[k] &= ~one4;
    },
    resize(n, m) {
      let k = curr.length;
      (n > k || m > width2) && (width2 = Math.max(m, width2), curr = array2(n, width2, curr), prev = array2(n, width2));
    }
  };
}
function lengthen(array4, length3, copy5) {
  return array4.length >= length3 ? array4 : (copy5 = copy5 || new array4.constructor(length3), copy5.set(array4), copy5);
}
function array2(n, m, array4) {
  let copy5 = (m < 257 ? array8 : m < 65537 ? array16 : array32)(n);
  return array4 && copy5.set(array4), copy5;
}
function Dimension(index4, i, query) {
  let bit = 1 << i;
  return {
    one: bit,
    zero: ~bit,
    range: query.slice(),
    bisect: index4.bisect,
    index: index4.index,
    size: index4.size,
    onAdd(added, curr) {
      let dim = this, range7 = dim.bisect(dim.range, added.value), idx = added.index, lo = range7[0], hi = range7[1], n1 = idx.length, i2;
      for (i2 = 0; i2 < lo; ++i2) curr[idx[i2]] |= bit;
      for (i2 = hi; i2 < n1; ++i2) curr[idx[i2]] |= bit;
      return dim;
    }
  };
}
function SortedIndex() {
  let index4 = array32(0), value3 = [], size = 0;
  function insert2(key2, data3, base) {
    if (!data3.length) return [];
    let n0 = size, n1 = data3.length, addi = array32(n1), addv = Array(n1), oldv, oldi, i;
    for (i = 0; i < n1; ++i)
      addv[i] = key2(data3[i]), addi[i] = i;
    if (addv = sort(addv, addi), n0)
      oldv = value3, oldi = index4, value3 = Array(n0 + n1), index4 = array32(n0 + n1), merge4(base, oldv, oldi, n0, addv, addi, n1, value3, index4);
    else {
      if (base > 0) for (i = 0; i < n1; ++i)
        addi[i] += base;
      value3 = addv, index4 = addi;
    }
    return size = n0 + n1, {
      index: addi,
      value: addv
    };
  }
  function remove2(num, map4) {
    let n = size, idx, i, j2;
    for (i = 0; !map4[index4[i]] && i < n; ++i) ;
    for (j2 = i; i < n; ++i)
      map4[idx = index4[i]] || (index4[j2] = idx, value3[j2] = value3[i], ++j2);
    size = n - num;
  }
  function reindex(map4) {
    for (let i = 0, n = size; i < n; ++i)
      index4[i] = map4[index4[i]];
  }
  function bisect2(range7, array4) {
    let n;
    return array4 ? n = array4.length : (array4 = value3, n = size), [bisectLeft(array4, range7[0], 0, n), bisectLeft(array4, range7[1], 0, n)];
  }
  return {
    insert: insert2,
    remove: remove2,
    bisect: bisect2,
    reindex,
    index: () => index4,
    size: () => size
  };
}
function sort(values3, index4) {
  return values3.sort.call(index4, (a, b10) => {
    let x5 = values3[a], y5 = values3[b10];
    return x5 < y5 ? -1 : x5 > y5 ? 1 : 0;
  }), permute(values3, index4);
}
function merge4(base, value0, index0, n0, value1, index1, n1, value3, index4) {
  let i0 = 0, i1 = 0, i;
  for (i = 0; i0 < n0 && i1 < n1; ++i)
    value0[i0] < value1[i1] ? (value3[i] = value0[i0], index4[i] = index0[i0++]) : (value3[i] = value1[i1], index4[i] = index1[i1++] + base);
  for (; i0 < n0; ++i0, ++i)
    value3[i] = value0[i0], index4[i] = index0[i0];
  for (; i1 < n1; ++i1, ++i)
    value3[i] = value1[i1], index4[i] = index1[i1] + base;
}
function CrossFilter(params2) {
  Transform.call(this, Bitmaps(), params2), this._indices = null, this._dims = null;
}
CrossFilter.Definition = {
  type: "CrossFilter",
  metadata: {},
  params: [{
    name: "fields",
    type: "field",
    array: !0,
    required: !0
  }, {
    name: "query",
    type: "array",
    array: !0,
    required: !0,
    content: {
      type: "number",
      array: !0,
      length: 2
    }
  }]
};
inherits_default(CrossFilter, Transform, {
  transform(_, pulse2) {
    if (this._dims) {
      var init2 = _.modified("fields") || _.fields.some((f) => pulse2.modified(f.fields));
      return init2 ? this.reinit(_, pulse2) : this.eval(_, pulse2);
    } else
      return this.init(_, pulse2);
  },
  init(_, pulse2) {
    let fields = _.fields, query = _.query, indices = this._indices = {}, dims = this._dims = [], m = query.length, i = 0, key2, index4;
    for (; i < m; ++i)
      key2 = fields[i].fname, index4 = indices[key2] || (indices[key2] = SortedIndex()), dims.push(Dimension(index4, i, query[i]));
    return this.eval(_, pulse2);
  },
  reinit(_, pulse2) {
    let output4 = pulse2.materialize().fork(), fields = _.fields, query = _.query, indices = this._indices, dims = this._dims, bits = this.value, curr = bits.curr(), prev = bits.prev(), all = bits.all(), out = output4.rem = output4.add, mod = output4.mod, m = query.length, adds = {}, add6, index4, key2, mods, remMap, modMap, i, n, f;
    if (prev.set(curr), pulse2.rem.length && (remMap = this.remove(_, pulse2, output4)), pulse2.add.length && bits.add(pulse2.add), pulse2.mod.length)
      for (modMap = {}, mods = pulse2.mod, i = 0, n = mods.length; i < n; ++i)
        modMap[mods[i]._index] = 1;
    for (i = 0; i < m; ++i)
      f = fields[i], (!dims[i] || _.modified("fields", i) || pulse2.modified(f.fields)) && (key2 = f.fname, (add6 = adds[key2]) || (indices[key2] = index4 = SortedIndex(), adds[key2] = add6 = index4.insert(f, pulse2.source, 0)), dims[i] = Dimension(index4, i, query[i]).onAdd(add6, curr));
    for (i = 0, n = bits.data().length; i < n; ++i)
      remMap[i] || (prev[i] !== curr[i] ? out.push(i) : modMap[i] && curr[i] !== all && mod.push(i));
    return bits.mask = (1 << m) - 1, output4;
  },
  eval(_, pulse2) {
    let output4 = pulse2.materialize().fork(), m = this._dims.length, mask = 0;
    return pulse2.rem.length && (this.remove(_, pulse2, output4), mask |= (1 << m) - 1), _.modified("query") && !_.modified("fields") && (mask |= this.update(_, pulse2, output4)), pulse2.add.length && (this.insert(_, pulse2, output4), mask |= (1 << m) - 1), pulse2.mod.length && (this.modify(pulse2, output4), mask |= (1 << m) - 1), this.value.mask = mask, output4;
  },
  insert(_, pulse2, output4) {
    let tuples = pulse2.add, bits = this.value, dims = this._dims, indices = this._indices, fields = _.fields, adds = {}, out = output4.add, n = bits.size() + tuples.length, m = dims.length, k = bits.size(), j2, key2, add6;
    bits.resize(n, m), bits.add(tuples);
    let curr = bits.curr(), prev = bits.prev(), all = bits.all();
    for (j2 = 0; j2 < m; ++j2)
      key2 = fields[j2].fname, add6 = adds[key2] || (adds[key2] = indices[key2].insert(fields[j2], tuples, k)), dims[j2].onAdd(add6, curr);
    for (; k < n; ++k)
      prev[k] = all, curr[k] !== all && out.push(k);
  },
  modify(pulse2, output4) {
    let out = output4.mod, bits = this.value, curr = bits.curr(), all = bits.all(), tuples = pulse2.mod, i, n, k;
    for (i = 0, n = tuples.length; i < n; ++i)
      k = tuples[i]._index, curr[k] !== all && out.push(k);
  },
  remove(_, pulse2, output4) {
    let indices = this._indices, bits = this.value, curr = bits.curr(), prev = bits.prev(), all = bits.all(), map4 = {}, out = output4.rem, tuples = pulse2.rem, i, n, k, f;
    for (i = 0, n = tuples.length; i < n; ++i)
      k = tuples[i]._index, map4[k] = 1, prev[k] = f = curr[k], curr[k] = all, f !== all && out.push(k);
    for (k in indices)
      indices[k].remove(n, map4);
    return this.reindex(pulse2, n, map4), map4;
  },
  // reindex filters and indices after propagation completes
  reindex(pulse2, num, map4) {
    let indices = this._indices, bits = this.value;
    pulse2.runAfter(() => {
      let indexMap = bits.remove(num, map4);
      for (let key2 in indices) indices[key2].reindex(indexMap);
    });
  },
  update(_, pulse2, output4) {
    let dims = this._dims, query = _.query, stamp3 = pulse2.stamp, m = dims.length, mask = 0, i, q;
    for (output4.filters = 0, q = 0; q < m; ++q)
      _.modified("query", q) && (i = q, ++mask);
    if (mask === 1)
      mask = dims[i].one, this.incrementOne(dims[i], query[i], output4.add, output4.rem);
    else
      for (q = 0, mask = 0; q < m; ++q)
        _.modified("query", q) && (mask |= dims[q].one, this.incrementAll(dims[q], query[q], stamp3, output4.add), output4.rem = output4.add);
    return mask;
  },
  incrementAll(dim, query, stamp3, out) {
    let bits = this.value, seen = bits.seen(), curr = bits.curr(), prev = bits.prev(), index4 = dim.index(), old = dim.bisect(dim.range), range7 = dim.bisect(query), lo1 = range7[0], hi1 = range7[1], lo0 = old[0], hi0 = old[1], one4 = dim.one, i, j2, k;
    if (lo1 < lo0)
      for (i = lo1, j2 = Math.min(lo0, hi1); i < j2; ++i)
        k = index4[i], seen[k] !== stamp3 && (prev[k] = curr[k], seen[k] = stamp3, out.push(k)), curr[k] ^= one4;
    else if (lo1 > lo0)
      for (i = lo0, j2 = Math.min(lo1, hi0); i < j2; ++i)
        k = index4[i], seen[k] !== stamp3 && (prev[k] = curr[k], seen[k] = stamp3, out.push(k)), curr[k] ^= one4;
    if (hi1 > hi0)
      for (i = Math.max(lo1, hi0), j2 = hi1; i < j2; ++i)
        k = index4[i], seen[k] !== stamp3 && (prev[k] = curr[k], seen[k] = stamp3, out.push(k)), curr[k] ^= one4;
    else if (hi1 < hi0)
      for (i = Math.max(lo0, hi1), j2 = hi0; i < j2; ++i)
        k = index4[i], seen[k] !== stamp3 && (prev[k] = curr[k], seen[k] = stamp3, out.push(k)), curr[k] ^= one4;
    dim.range = query.slice();
  },
  incrementOne(dim, query, add6, rem2) {
    let bits = this.value, curr = bits.curr(), index4 = dim.index(), old = dim.bisect(dim.range), range7 = dim.bisect(query), lo1 = range7[0], hi1 = range7[1], lo0 = old[0], hi0 = old[1], one4 = dim.one, i, j2, k;
    if (lo1 < lo0)
      for (i = lo1, j2 = Math.min(lo0, hi1); i < j2; ++i)
        k = index4[i], curr[k] ^= one4, add6.push(k);
    else if (lo1 > lo0)
      for (i = lo0, j2 = Math.min(lo1, hi0); i < j2; ++i)
        k = index4[i], curr[k] ^= one4, rem2.push(k);
    if (hi1 > hi0)
      for (i = Math.max(lo1, hi0), j2 = hi1; i < j2; ++i)
        k = index4[i], curr[k] ^= one4, add6.push(k);
    else if (hi1 < hi0)
      for (i = Math.max(lo0, hi1), j2 = hi0; i < j2; ++i)
        k = index4[i], curr[k] ^= one4, rem2.push(k);
    dim.range = query.slice();
  }
});
function ResolveFilter(params2) {
  Transform.call(this, null, params2);
}
ResolveFilter.Definition = {
  type: "ResolveFilter",
  metadata: {},
  params: [{
    name: "ignore",
    type: "number",
    required: !0,
    description: "A bit mask indicating which filters to ignore."
  }, {
    name: "filter",
    type: "object",
    required: !0,
    description: "Per-tuple filter bitmaps from a CrossFilter transform."
  }]
};
inherits_default(ResolveFilter, Transform, {
  transform(_, pulse2) {
    let ignore = ~(_.ignore || 0), bitmap = _.filter, mask = bitmap.mask;
    if ((mask & ignore) === 0) return pulse2.StopPropagation;
    let output4 = pulse2.fork(pulse2.ALL), data3 = bitmap.data(), curr = bitmap.curr(), prev = bitmap.prev(), pass2 = (k) => curr[k] & ignore ? null : data3[k];
    return output4.filter(output4.MOD, pass2), mask & mask - 1 ? (output4.filter(output4.ADD, (k) => {
      let c = curr[k] & ignore;
      return !c && c ^ prev[k] & ignore ? data3[k] : null;
    }), output4.filter(output4.REM, (k) => {
      let c = curr[k] & ignore;
      return c && !(c ^ (c ^ prev[k] & ignore)) ? data3[k] : null;
    })) : (output4.filter(output4.ADD, pass2), output4.filter(output4.REM, (k) => (curr[k] & ignore) === mask ? data3[k] : null)), output4.filter(output4.SOURCE, (t) => pass2(t._index));
  }
});

// node_modules/d3-ease/src/linear.js
var linear4 = (t) => +t;

// node_modules/d3-ease/src/quad.js
function quadIn(t) {
  return t * t;
}
function quadOut(t) {
  return t * (2 - t);
}
function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}

// node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  return --t * t * t + 1;
}
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/d3-ease/src/poly.js
var exponent = 3, polyIn = (function custom12(e) {
  e = +e;
  function polyIn2(t) {
    return Math.pow(t, e);
  }
  return polyIn2.exponent = custom12, polyIn2;
})(exponent), polyOut = (function custom13(e) {
  e = +e;
  function polyOut2(t) {
    return 1 - Math.pow(1 - t, e);
  }
  return polyOut2.exponent = custom13, polyOut2;
})(exponent), polyInOut = (function custom14(e) {
  e = +e;
  function polyInOut2(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }
  return polyInOut2.exponent = custom14, polyInOut2;
})(exponent);

// node_modules/d3-ease/src/sin.js
var pi5 = Math.PI, halfPi4 = pi5 / 2;
function sinIn(t) {
  return +t == 1 ? 1 : 1 - Math.cos(t * halfPi4);
}
function sinOut(t) {
  return Math.sin(t * halfPi4);
}
function sinInOut(t) {
  return (1 - Math.cos(pi5 * t)) / 2;
}

// node_modules/d3-ease/src/math.js
function tpmt(x5) {
  return (Math.pow(2, -10 * x5) - 9765625e-10) * 1.0009775171065494;
}

// node_modules/d3-ease/src/exp.js
function expIn(t) {
  return tpmt(1 - +t);
}
function expOut(t) {
  return 1 - tpmt(t);
}
function expInOut(t) {
  return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
}

// node_modules/d3-ease/src/circle.js
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}
function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

// node_modules/d3-ease/src/bounce.js
var b1 = 0.36363636363636365, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}
function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}
function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}

// node_modules/d3-ease/src/back.js
var overshoot = 1.70158, backIn = (function custom15(s) {
  s = +s;
  function backIn2(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }
  return backIn2.overshoot = custom15, backIn2;
})(overshoot), backOut = (function custom16(s) {
  s = +s;
  function backOut2(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }
  return backOut2.overshoot = custom16, backOut2;
})(overshoot), backInOut = (function custom17(s) {
  s = +s;
  function backInOut2(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }
  return backInOut2.overshoot = custom17, backInOut2;
})(overshoot);

// node_modules/d3-ease/src/elastic.js
var tau6 = 2 * Math.PI, amplitude = 1, period = 0.3, elasticIn = (function custom18(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau6);
  function elasticIn2(t) {
    return a * tpmt(- --t) * Math.sin((s - t) / p);
  }
  return elasticIn2.amplitude = function(a2) {
    return custom18(a2, p * tau6);
  }, elasticIn2.period = function(p2) {
    return custom18(a, p2);
  }, elasticIn2;
})(amplitude, period), elasticOut = (function custom19(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau6);
  function elasticOut2(t) {
    return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
  }
  return elasticOut2.amplitude = function(a2) {
    return custom19(a2, p * tau6);
  }, elasticOut2.period = function(p2) {
    return custom19(a, p2);
  }, elasticOut2;
})(amplitude, period), elasticInOut = (function custom20(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau6);
  function elasticInOut2(t) {
    return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
  }
  return elasticInOut2.amplitude = function(a2) {
    return custom20(a2, p * tau6);
  }, elasticInOut2.period = function(p2) {
    return custom20(a, p2);
  }, elasticInOut2;
})(amplitude, period);

// node_modules/vega-expression/build/vega-expression.js
var RawCode = "RawCode", Literal = "Literal", Property = "Property", Identifier2 = "Identifier", ArrayExpression = "ArrayExpression", BinaryExpression = "BinaryExpression", CallExpression = "CallExpression", ConditionalExpression = "ConditionalExpression", LogicalExpression = "LogicalExpression", MemberExpression = "MemberExpression", ObjectExpression = "ObjectExpression", UnaryExpression = "UnaryExpression";
function ASTNode(type3) {
  this.type = type3;
}
ASTNode.prototype.visit = function(visitor) {
  let c, i, n;
  if (visitor(this)) return 1;
  for (c = children2(this), i = 0, n = c.length; i < n; ++i)
    if (c[i].visit(visitor)) return 1;
};
function children2(node2) {
  switch (node2.type) {
    case ArrayExpression:
      return node2.elements;
    case BinaryExpression:
    case LogicalExpression:
      return [node2.left, node2.right];
    case CallExpression:
      return [node2.callee].concat(node2.arguments);
    case ConditionalExpression:
      return [node2.test, node2.consequent, node2.alternate];
    case MemberExpression:
      return [node2.object, node2.property];
    case ObjectExpression:
      return node2.properties;
    case Property:
      return [node2.key, node2.value];
    case UnaryExpression:
      return [node2.argument];
    case Identifier2:
    case Literal:
    case RawCode:
    default:
      return [];
  }
}
var TokenName, source2, index2, length, lookahead, TokenBooleanLiteral = 1, TokenEOF = 2, TokenIdentifier = 3, TokenKeyword = 4, TokenNullLiteral = 5, TokenNumericLiteral = 6, TokenPunctuator = 7, TokenStringLiteral = 8, TokenRegularExpression = 9;
TokenName = {};
TokenName[TokenBooleanLiteral] = "Boolean";
TokenName[TokenEOF] = "<end>";
TokenName[TokenIdentifier] = "Identifier";
TokenName[TokenKeyword] = "Keyword";
TokenName[TokenNullLiteral] = "Null";
TokenName[TokenNumericLiteral] = "Numeric";
TokenName[TokenPunctuator] = "Punctuator";
TokenName[TokenStringLiteral] = "String";
TokenName[TokenRegularExpression] = "RegularExpression";
var SyntaxArrayExpression = "ArrayExpression", SyntaxBinaryExpression = "BinaryExpression", SyntaxCallExpression = "CallExpression", SyntaxConditionalExpression = "ConditionalExpression", SyntaxIdentifier = "Identifier", SyntaxLiteral = "Literal", SyntaxLogicalExpression = "LogicalExpression", SyntaxMemberExpression = "MemberExpression", SyntaxObjectExpression = "ObjectExpression", SyntaxProperty = "Property", SyntaxUnaryExpression = "UnaryExpression", MessageUnexpectedToken = "Unexpected token %0", MessageUnexpectedNumber = "Unexpected number", MessageUnexpectedString = "Unexpected string", MessageUnexpectedIdentifier = "Unexpected identifier", MessageUnexpectedReserved = "Unexpected reserved word", MessageUnexpectedEOS = "Unexpected end of input", MessageInvalidRegExp = "Invalid regular expression", MessageUnterminatedRegExp = "Invalid regular expression: missing /", MessageStrictOctalLiteral = "Octal literals are not allowed in strict mode.", MessageStrictDuplicateProperty = "Duplicate data property in object literal not allowed in strict mode", ILLEGAL = "ILLEGAL", DISABLED = "Disabled.", RegexNonAsciiIdentifierStart = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B2\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"), RegexNonAsciiIdentifierPart = new RegExp("[\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0300-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u0483-\\u0487\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0610-\\u061A\\u0620-\\u0669\\u066E-\\u06D3\\u06D5-\\u06DC\\u06DF-\\u06E8\\u06EA-\\u06FC\\u06FF\\u0710-\\u074A\\u074D-\\u07B1\\u07C0-\\u07F5\\u07FA\\u0800-\\u082D\\u0840-\\u085B\\u08A0-\\u08B2\\u08E4-\\u0963\\u0966-\\u096F\\u0971-\\u0983\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BC-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CE\\u09D7\\u09DC\\u09DD\\u09DF-\\u09E3\\u09E6-\\u09F1\\u0A01-\\u0A03\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A59-\\u0A5C\\u0A5E\\u0A66-\\u0A75\\u0A81-\\u0A83\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABC-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AD0\\u0AE0-\\u0AE3\\u0AE6-\\u0AEF\\u0B01-\\u0B03\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3C-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B5C\\u0B5D\\u0B5F-\\u0B63\\u0B66-\\u0B6F\\u0B71\\u0B82\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD0\\u0BD7\\u0BE6-\\u0BEF\\u0C00-\\u0C03\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C58\\u0C59\\u0C60-\\u0C63\\u0C66-\\u0C6F\\u0C81-\\u0C83\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBC-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CDE\\u0CE0-\\u0CE3\\u0CE6-\\u0CEF\\u0CF1\\u0CF2\\u0D01-\\u0D03\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4E\\u0D57\\u0D60-\\u0D63\\u0D66-\\u0D6F\\u0D7A-\\u0D7F\\u0D82\\u0D83\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DE6-\\u0DEF\\u0DF2\\u0DF3\\u0E01-\\u0E3A\\u0E40-\\u0E4E\\u0E50-\\u0E59\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB9\\u0EBB-\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EC8-\\u0ECD\\u0ED0-\\u0ED9\\u0EDC-\\u0EDF\\u0F00\\u0F18\\u0F19\\u0F20-\\u0F29\\u0F35\\u0F37\\u0F39\\u0F3E-\\u0F47\\u0F49-\\u0F6C\\u0F71-\\u0F84\\u0F86-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u1000-\\u1049\\u1050-\\u109D\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u135D-\\u135F\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F8\\u1700-\\u170C\\u170E-\\u1714\\u1720-\\u1734\\u1740-\\u1753\\u1760-\\u176C\\u176E-\\u1770\\u1772\\u1773\\u1780-\\u17D3\\u17D7\\u17DC\\u17DD\\u17E0-\\u17E9\\u180B-\\u180D\\u1810-\\u1819\\u1820-\\u1877\\u1880-\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1920-\\u192B\\u1930-\\u193B\\u1946-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u19D0-\\u19D9\\u1A00-\\u1A1B\\u1A20-\\u1A5E\\u1A60-\\u1A7C\\u1A7F-\\u1A89\\u1A90-\\u1A99\\u1AA7\\u1AB0-\\u1ABD\\u1B00-\\u1B4B\\u1B50-\\u1B59\\u1B6B-\\u1B73\\u1B80-\\u1BF3\\u1C00-\\u1C37\\u1C40-\\u1C49\\u1C4D-\\u1C7D\\u1CD0-\\u1CD2\\u1CD4-\\u1CF6\\u1CF8\\u1CF9\\u1D00-\\u1DF5\\u1DFC-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u200C\\u200D\\u203F\\u2040\\u2054\\u2071\\u207F\\u2090-\\u209C\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D7F-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2DE0-\\u2DFF\\u2E2F\\u3005-\\u3007\\u3021-\\u302F\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u3099\\u309A\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA62B\\uA640-\\uA66F\\uA674-\\uA67D\\uA67F-\\uA69D\\uA69F-\\uA6F1\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA7AD\\uA7B0\\uA7B1\\uA7F7-\\uA827\\uA840-\\uA873\\uA880-\\uA8C4\\uA8D0-\\uA8D9\\uA8E0-\\uA8F7\\uA8FB\\uA900-\\uA92D\\uA930-\\uA953\\uA960-\\uA97C\\uA980-\\uA9C0\\uA9CF-\\uA9D9\\uA9E0-\\uA9FE\\uAA00-\\uAA36\\uAA40-\\uAA4D\\uAA50-\\uAA59\\uAA60-\\uAA76\\uAA7A-\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEF\\uAAF2-\\uAAF6\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB5F\\uAB64\\uAB65\\uABC0-\\uABEA\\uABEC\\uABED\\uABF0-\\uABF9\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE00-\\uFE0F\\uFE20-\\uFE2D\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF10-\\uFF19\\uFF21-\\uFF3A\\uFF3F\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]");
function assert2(condition, message) {
  if (!condition)
    throw new Error("ASSERT: " + message);
}
function isDecimalDigit(ch2) {
  return ch2 >= 48 && ch2 <= 57;
}
function isHexDigit(ch2) {
  return "0123456789abcdefABCDEF".includes(ch2);
}
function isOctalDigit(ch2) {
  return "01234567".includes(ch2);
}
function isWhiteSpace(ch2) {
  return ch2 === 32 || ch2 === 9 || ch2 === 11 || ch2 === 12 || ch2 === 160 || ch2 >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].includes(ch2);
}
function isLineTerminator(ch2) {
  return ch2 === 10 || ch2 === 13 || ch2 === 8232 || ch2 === 8233;
}
function isIdentifierStart(ch2) {
  return ch2 === 36 || ch2 === 95 || // $ (dollar) and _ (underscore)
  ch2 >= 65 && ch2 <= 90 || // A..Z
  ch2 >= 97 && ch2 <= 122 || // a..z
  ch2 === 92 || // \ (backslash)
  ch2 >= 128 && RegexNonAsciiIdentifierStart.test(String.fromCharCode(ch2));
}
function isIdentifierPart(ch2) {
  return ch2 === 36 || ch2 === 95 || // $ (dollar) and _ (underscore)
  ch2 >= 65 && ch2 <= 90 || // A..Z
  ch2 >= 97 && ch2 <= 122 || // a..z
  ch2 >= 48 && ch2 <= 57 || // 0..9
  ch2 === 92 || // \ (backslash)
  ch2 >= 128 && RegexNonAsciiIdentifierPart.test(String.fromCharCode(ch2));
}
var keywords = {
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
function skipComment() {
  for (; index2 < length; ) {
    let ch2 = source2.charCodeAt(index2);
    if (isWhiteSpace(ch2) || isLineTerminator(ch2))
      ++index2;
    else
      break;
  }
}
function scanHexEscape(prefix) {
  var i, len, ch2, code = 0;
  for (len = prefix === "u" ? 4 : 2, i = 0; i < len; ++i)
    index2 < length && isHexDigit(source2[index2]) ? (ch2 = source2[index2++], code = code * 16 + "0123456789abcdef".indexOf(ch2.toLowerCase())) : throwError({}, MessageUnexpectedToken, ILLEGAL);
  return String.fromCharCode(code);
}
function scanUnicodeCodePointEscape() {
  var ch2, code, cu1, cu2;
  for (ch2 = source2[index2], code = 0, ch2 === "}" && throwError({}, MessageUnexpectedToken, ILLEGAL); index2 < length && (ch2 = source2[index2++], !!isHexDigit(ch2)); )
    code = code * 16 + "0123456789abcdef".indexOf(ch2.toLowerCase());
  return (code > 1114111 || ch2 !== "}") && throwError({}, MessageUnexpectedToken, ILLEGAL), code <= 65535 ? String.fromCharCode(code) : (cu1 = (code - 65536 >> 10) + 55296, cu2 = (code - 65536 & 1023) + 56320, String.fromCharCode(cu1, cu2));
}
function getEscapedIdentifier() {
  var ch2, id3;
  for (ch2 = source2.charCodeAt(index2++), id3 = String.fromCharCode(ch2), ch2 === 92 && (source2.charCodeAt(index2) !== 117 && throwError({}, MessageUnexpectedToken, ILLEGAL), ++index2, ch2 = scanHexEscape("u"), (!ch2 || ch2 === "\\" || !isIdentifierStart(ch2.charCodeAt(0))) && throwError({}, MessageUnexpectedToken, ILLEGAL), id3 = ch2); index2 < length && (ch2 = source2.charCodeAt(index2), !!isIdentifierPart(ch2)); )
    ++index2, id3 += String.fromCharCode(ch2), ch2 === 92 && (id3 = id3.substr(0, id3.length - 1), source2.charCodeAt(index2) !== 117 && throwError({}, MessageUnexpectedToken, ILLEGAL), ++index2, ch2 = scanHexEscape("u"), (!ch2 || ch2 === "\\" || !isIdentifierPart(ch2.charCodeAt(0))) && throwError({}, MessageUnexpectedToken, ILLEGAL), id3 += ch2);
  return id3;
}
function getIdentifier() {
  var start, ch2;
  for (start = index2++; index2 < length; ) {
    if (ch2 = source2.charCodeAt(index2), ch2 === 92)
      return index2 = start, getEscapedIdentifier();
    if (isIdentifierPart(ch2))
      ++index2;
    else
      break;
  }
  return source2.slice(start, index2);
}
function scanIdentifier() {
  var start, id3, type3;
  return start = index2, id3 = source2.charCodeAt(index2) === 92 ? getEscapedIdentifier() : getIdentifier(), id3.length === 1 ? type3 = TokenIdentifier : keywords.hasOwnProperty(id3) ? type3 = TokenKeyword : id3 === "null" ? type3 = TokenNullLiteral : id3 === "true" || id3 === "false" ? type3 = TokenBooleanLiteral : type3 = TokenIdentifier, {
    type: type3,
    value: id3,
    start,
    end: index2
  };
}
function scanPunctuator() {
  var start = index2, code = source2.charCodeAt(index2), code2, ch1 = source2[index2], ch2, ch3, ch4;
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
      return ++index2, {
        type: TokenPunctuator,
        value: String.fromCharCode(code),
        start,
        end: index2
      };
    default:
      if (code2 = source2.charCodeAt(index2 + 1), code2 === 61)
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
            return index2 += 2, {
              type: TokenPunctuator,
              value: String.fromCharCode(code) + String.fromCharCode(code2),
              start,
              end: index2
            };
          case 33:
          // !
          case 61:
            return index2 += 2, source2.charCodeAt(index2) === 61 && ++index2, {
              type: TokenPunctuator,
              value: source2.slice(start, index2),
              start,
              end: index2
            };
        }
  }
  if (ch4 = source2.substr(index2, 4), ch4 === ">>>=")
    return index2 += 4, {
      type: TokenPunctuator,
      value: ch4,
      start,
      end: index2
    };
  if (ch3 = ch4.substr(0, 3), ch3 === ">>>" || ch3 === "<<=" || ch3 === ">>=")
    return index2 += 3, {
      type: TokenPunctuator,
      value: ch3,
      start,
      end: index2
    };
  if (ch2 = ch3.substr(0, 2), ch1 === ch2[1] && "+-<>&|".includes(ch1) || ch2 === "=>")
    return index2 += 2, {
      type: TokenPunctuator,
      value: ch2,
      start,
      end: index2
    };
  if (ch2 === "//" && throwError({}, MessageUnexpectedToken, ILLEGAL), "<>=!+-*%&|^/".includes(ch1))
    return ++index2, {
      type: TokenPunctuator,
      value: ch1,
      start,
      end: index2
    };
  throwError({}, MessageUnexpectedToken, ILLEGAL);
}
function scanHexLiteral(start) {
  let number12 = "";
  for (; index2 < length && isHexDigit(source2[index2]); )
    number12 += source2[index2++];
  return number12.length === 0 && throwError({}, MessageUnexpectedToken, ILLEGAL), isIdentifierStart(source2.charCodeAt(index2)) && throwError({}, MessageUnexpectedToken, ILLEGAL), {
    type: TokenNumericLiteral,
    value: parseInt("0x" + number12, 16),
    start,
    end: index2
  };
}
function scanOctalLiteral(start) {
  let number12 = "0" + source2[index2++];
  for (; index2 < length && isOctalDigit(source2[index2]); )
    number12 += source2[index2++];
  return (isIdentifierStart(source2.charCodeAt(index2)) || isDecimalDigit(source2.charCodeAt(index2))) && throwError({}, MessageUnexpectedToken, ILLEGAL), {
    type: TokenNumericLiteral,
    value: parseInt(number12, 8),
    octal: !0,
    start,
    end: index2
  };
}
function scanNumericLiteral() {
  var number12, start, ch2;
  if (ch2 = source2[index2], assert2(isDecimalDigit(ch2.charCodeAt(0)) || ch2 === ".", "Numeric literal must start with a decimal digit or a decimal point"), start = index2, number12 = "", ch2 !== ".") {
    if (number12 = source2[index2++], ch2 = source2[index2], number12 === "0") {
      if (ch2 === "x" || ch2 === "X")
        return ++index2, scanHexLiteral(start);
      if (isOctalDigit(ch2))
        return scanOctalLiteral(start);
      ch2 && isDecimalDigit(ch2.charCodeAt(0)) && throwError({}, MessageUnexpectedToken, ILLEGAL);
    }
    for (; isDecimalDigit(source2.charCodeAt(index2)); )
      number12 += source2[index2++];
    ch2 = source2[index2];
  }
  if (ch2 === ".") {
    for (number12 += source2[index2++]; isDecimalDigit(source2.charCodeAt(index2)); )
      number12 += source2[index2++];
    ch2 = source2[index2];
  }
  if (ch2 === "e" || ch2 === "E")
    if (number12 += source2[index2++], ch2 = source2[index2], (ch2 === "+" || ch2 === "-") && (number12 += source2[index2++]), isDecimalDigit(source2.charCodeAt(index2)))
      for (; isDecimalDigit(source2.charCodeAt(index2)); )
        number12 += source2[index2++];
    else
      throwError({}, MessageUnexpectedToken, ILLEGAL);
  return isIdentifierStart(source2.charCodeAt(index2)) && throwError({}, MessageUnexpectedToken, ILLEGAL), {
    type: TokenNumericLiteral,
    value: parseFloat(number12),
    start,
    end: index2
  };
}
function scanStringLiteral() {
  var str = "", quote, start, ch2, code, octal = !1;
  for (quote = source2[index2], assert2(quote === "'" || quote === '"', "String literal must starts with a quote"), start = index2, ++index2; index2 < length; )
    if (ch2 = source2[index2++], ch2 === quote) {
      quote = "";
      break;
    } else if (ch2 === "\\")
      if (ch2 = source2[index2++], !ch2 || !isLineTerminator(ch2.charCodeAt(0)))
        switch (ch2) {
          case "u":
          case "x":
            source2[index2] === "{" ? (++index2, str += scanUnicodeCodePointEscape()) : str += scanHexEscape(ch2);
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
            isOctalDigit(ch2) ? (code = "01234567".indexOf(ch2), code !== 0 && (octal = !0), index2 < length && isOctalDigit(source2[index2]) && (octal = !0, code = code * 8 + "01234567".indexOf(source2[index2++]), "0123".includes(ch2) && index2 < length && isOctalDigit(source2[index2]) && (code = code * 8 + "01234567".indexOf(source2[index2++]))), str += String.fromCharCode(code)) : str += ch2;
            break;
        }
      else
        ch2 === "\r" && source2[index2] === `
` && ++index2;
    else {
      if (isLineTerminator(ch2.charCodeAt(0)))
        break;
      str += ch2;
    }
  return quote !== "" && throwError({}, MessageUnexpectedToken, ILLEGAL), {
    type: TokenStringLiteral,
    value: str,
    octal,
    start,
    end: index2
  };
}
function testRegExp(pattern, flags) {
  let tmp = pattern;
  flags.includes("u") && (tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, ($0, $1) => {
    if (parseInt($1, 16) <= 1114111)
      return "x";
    throwError({}, MessageInvalidRegExp);
  }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x"));
  try {
    new RegExp(tmp);
  } catch {
    throwError({}, MessageInvalidRegExp);
  }
  try {
    return new RegExp(pattern, flags);
  } catch {
    return null;
  }
}
function scanRegExpBody() {
  var ch2, str, classMarker, terminated, body;
  for (ch2 = source2[index2], assert2(ch2 === "/", "Regular expression literal must start with a slash"), str = source2[index2++], classMarker = !1, terminated = !1; index2 < length; )
    if (ch2 = source2[index2++], str += ch2, ch2 === "\\")
      ch2 = source2[index2++], isLineTerminator(ch2.charCodeAt(0)) && throwError({}, MessageUnterminatedRegExp), str += ch2;
    else if (isLineTerminator(ch2.charCodeAt(0)))
      throwError({}, MessageUnterminatedRegExp);
    else if (classMarker)
      ch2 === "]" && (classMarker = !1);
    else if (ch2 === "/") {
      terminated = !0;
      break;
    } else ch2 === "[" && (classMarker = !0);
  return terminated || throwError({}, MessageUnterminatedRegExp), body = str.substr(1, str.length - 2), {
    value: body,
    literal: str
  };
}
function scanRegExpFlags() {
  var ch2, str, flags;
  for (str = "", flags = ""; index2 < length && (ch2 = source2[index2], !!isIdentifierPart(ch2.charCodeAt(0))); )
    ++index2, ch2 === "\\" && index2 < length ? throwError({}, MessageUnexpectedToken, ILLEGAL) : (flags += ch2, str += ch2);
  return flags.search(/[^gimuy]/g) >= 0 && throwError({}, MessageInvalidRegExp, flags), {
    value: flags,
    literal: str
  };
}
function scanRegExp() {
  var start, body, flags, value3;
  return lookahead = null, skipComment(), start = index2, body = scanRegExpBody(), flags = scanRegExpFlags(), value3 = testRegExp(body.value, flags.value), {
    literal: body.literal + flags.literal,
    value: value3,
    regex: {
      pattern: body.value,
      flags: flags.value
    },
    start,
    end: index2
  };
}
function isIdentifierName(token) {
  return token.type === TokenIdentifier || token.type === TokenKeyword || token.type === TokenBooleanLiteral || token.type === TokenNullLiteral;
}
function advance() {
  if (skipComment(), index2 >= length)
    return {
      type: TokenEOF,
      start: index2,
      end: index2
    };
  let ch2 = source2.charCodeAt(index2);
  return isIdentifierStart(ch2) ? scanIdentifier() : ch2 === 40 || ch2 === 41 || ch2 === 59 ? scanPunctuator() : ch2 === 39 || ch2 === 34 ? scanStringLiteral() : ch2 === 46 ? isDecimalDigit(source2.charCodeAt(index2 + 1)) ? scanNumericLiteral() : scanPunctuator() : isDecimalDigit(ch2) ? scanNumericLiteral() : scanPunctuator();
}
function lex() {
  let token = lookahead;
  return index2 = token.end, lookahead = advance(), index2 = token.end, token;
}
function peek2() {
  let pos = index2;
  lookahead = advance(), index2 = pos;
}
function finishArrayExpression(elements) {
  let node2 = new ASTNode(SyntaxArrayExpression);
  return node2.elements = elements, node2;
}
function finishBinaryExpression(operator2, left, right) {
  let node2 = new ASTNode(operator2 === "||" || operator2 === "&&" ? SyntaxLogicalExpression : SyntaxBinaryExpression);
  return node2.operator = operator2, node2.left = left, node2.right = right, node2;
}
function finishCallExpression(callee, args) {
  let node2 = new ASTNode(SyntaxCallExpression);
  return node2.callee = callee, node2.arguments = args, node2;
}
function finishConditionalExpression(test2, consequent, alternate) {
  let node2 = new ASTNode(SyntaxConditionalExpression);
  return node2.test = test2, node2.consequent = consequent, node2.alternate = alternate, node2;
}
function finishIdentifier(name2) {
  let node2 = new ASTNode(SyntaxIdentifier);
  return node2.name = name2, node2;
}
function finishLiteral(token) {
  let node2 = new ASTNode(SyntaxLiteral);
  return node2.value = token.value, node2.raw = source2.slice(token.start, token.end), token.regex && (node2.raw === "//" && (node2.raw = "/(?:)/"), node2.regex = token.regex), node2;
}
function finishMemberExpression(accessor2, object4, property2) {
  let node2 = new ASTNode(SyntaxMemberExpression);
  return node2.computed = accessor2 === "[", node2.object = object4, node2.property = property2, node2.computed || (property2.member = !0), node2;
}
function finishObjectExpression(properties) {
  let node2 = new ASTNode(SyntaxObjectExpression);
  return node2.properties = properties, node2;
}
function finishProperty(kind, key2, value3) {
  let node2 = new ASTNode(SyntaxProperty);
  return node2.key = key2, node2.value = value3, node2.kind = kind, node2;
}
function finishUnaryExpression(operator2, argument) {
  let node2 = new ASTNode(SyntaxUnaryExpression);
  return node2.operator = operator2, node2.argument = argument, node2.prefix = !0, node2;
}
function throwError(token, messageFormat) {
  var error64, args = Array.prototype.slice.call(arguments, 2), msg = messageFormat.replace(/%(\d)/g, (whole, index4) => (assert2(index4 < args.length, "Message reference must be in range"), args[index4]));
  throw error64 = new Error(msg), error64.index = index2, error64.description = msg, error64;
}
function throwUnexpected(token) {
  token.type === TokenEOF && throwError(token, MessageUnexpectedEOS), token.type === TokenNumericLiteral && throwError(token, MessageUnexpectedNumber), token.type === TokenStringLiteral && throwError(token, MessageUnexpectedString), token.type === TokenIdentifier && throwError(token, MessageUnexpectedIdentifier), token.type === TokenKeyword && throwError(token, MessageUnexpectedReserved), throwError(token, MessageUnexpectedToken, token.value);
}
function expect(value3) {
  let token = lex();
  (token.type !== TokenPunctuator || token.value !== value3) && throwUnexpected(token);
}
function match(value3) {
  return lookahead.type === TokenPunctuator && lookahead.value === value3;
}
function matchKeyword(keyword) {
  return lookahead.type === TokenKeyword && lookahead.value === keyword;
}
function parseArrayInitialiser() {
  let elements = [];
  for (index2 = lookahead.start, expect("["); !match("]"); )
    match(",") ? (lex(), elements.push(null)) : (elements.push(parseConditionalExpression()), match("]") || expect(","));
  return lex(), finishArrayExpression(elements);
}
function parseObjectPropertyKey() {
  index2 = lookahead.start;
  let token = lex();
  return token.type === TokenStringLiteral || token.type === TokenNumericLiteral ? (token.octal && throwError(token, MessageStrictOctalLiteral), finishLiteral(token)) : finishIdentifier(token.value);
}
function parseObjectProperty() {
  var token, key2, id3, value3;
  if (index2 = lookahead.start, token = lookahead, token.type === TokenIdentifier)
    return id3 = parseObjectPropertyKey(), expect(":"), value3 = parseConditionalExpression(), finishProperty("init", id3, value3);
  if (token.type === TokenEOF || token.type === TokenPunctuator)
    throwUnexpected(token);
  else
    return key2 = parseObjectPropertyKey(), expect(":"), value3 = parseConditionalExpression(), finishProperty("init", key2, value3);
}
function parseObjectInitialiser() {
  var properties = [], property2, name2, key2, map4 = {}, toString2 = String;
  for (index2 = lookahead.start, expect("{"); !match("}"); )
    property2 = parseObjectProperty(), property2.key.type === SyntaxIdentifier ? name2 = property2.key.name : name2 = toString2(property2.key.value), key2 = "$" + name2, Object.prototype.hasOwnProperty.call(map4, key2) ? throwError({}, MessageStrictDuplicateProperty) : map4[key2] = !0, properties.push(property2), match("}") || expect(",");
  return expect("}"), finishObjectExpression(properties);
}
function parseGroupExpression() {
  expect("(");
  let expr2 = parseExpression();
  return expect(")"), expr2;
}
var legalKeywords = {
  if: 1
};
function parsePrimaryExpression() {
  var type3, token, expr2;
  if (match("("))
    return parseGroupExpression();
  if (match("["))
    return parseArrayInitialiser();
  if (match("{"))
    return parseObjectInitialiser();
  if (type3 = lookahead.type, index2 = lookahead.start, type3 === TokenIdentifier || legalKeywords[lookahead.value])
    expr2 = finishIdentifier(lex().value);
  else if (type3 === TokenStringLiteral || type3 === TokenNumericLiteral)
    lookahead.octal && throwError(lookahead, MessageStrictOctalLiteral), expr2 = finishLiteral(lex());
  else {
    if (type3 === TokenKeyword)
      throw new Error(DISABLED);
    type3 === TokenBooleanLiteral ? (token = lex(), token.value = token.value === "true", expr2 = finishLiteral(token)) : type3 === TokenNullLiteral ? (token = lex(), token.value = null, expr2 = finishLiteral(token)) : match("/") || match("/=") ? (expr2 = finishLiteral(scanRegExp()), peek2()) : throwUnexpected(lex());
  }
  return expr2;
}
function parseArguments() {
  let args = [];
  if (expect("("), !match(")"))
    for (; index2 < length && (args.push(parseConditionalExpression()), !match(")")); )
      expect(",");
  return expect(")"), args;
}
function parseNonComputedProperty() {
  index2 = lookahead.start;
  let token = lex();
  return isIdentifierName(token) || throwUnexpected(token), finishIdentifier(token.value);
}
function parseNonComputedMember() {
  return expect("."), parseNonComputedProperty();
}
function parseComputedMember() {
  expect("[");
  let expr2 = parseExpression();
  return expect("]"), expr2;
}
function parseLeftHandSideExpressionAllowCall() {
  var expr2, args, property2;
  for (expr2 = parsePrimaryExpression(); ; )
    if (match("."))
      property2 = parseNonComputedMember(), expr2 = finishMemberExpression(".", expr2, property2);
    else if (match("("))
      args = parseArguments(), expr2 = finishCallExpression(expr2, args);
    else if (match("["))
      property2 = parseComputedMember(), expr2 = finishMemberExpression("[", expr2, property2);
    else
      break;
  return expr2;
}
function parsePostfixExpression() {
  let expr2 = parseLeftHandSideExpressionAllowCall();
  if (lookahead.type === TokenPunctuator && (match("++") || match("--")))
    throw new Error(DISABLED);
  return expr2;
}
function parseUnaryExpression() {
  var token, expr2;
  if (lookahead.type !== TokenPunctuator && lookahead.type !== TokenKeyword)
    expr2 = parsePostfixExpression();
  else {
    if (match("++") || match("--"))
      throw new Error(DISABLED);
    if (match("+") || match("-") || match("~") || match("!"))
      token = lex(), expr2 = parseUnaryExpression(), expr2 = finishUnaryExpression(token.value, expr2);
    else {
      if (matchKeyword("delete") || matchKeyword("void") || matchKeyword("typeof"))
        throw new Error(DISABLED);
      expr2 = parsePostfixExpression();
    }
  }
  return expr2;
}
function binaryPrecedence(token) {
  let prec = 0;
  if (token.type !== TokenPunctuator && token.type !== TokenKeyword)
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
function parseBinaryExpression() {
  var marker, markers, expr2, token, prec, stack2, right, operator2, left, i;
  if (marker = lookahead, left = parseUnaryExpression(), token = lookahead, prec = binaryPrecedence(token), prec === 0)
    return left;
  for (token.prec = prec, lex(), markers = [marker, lookahead], right = parseUnaryExpression(), stack2 = [left, token, right]; (prec = binaryPrecedence(lookahead)) > 0; ) {
    for (; stack2.length > 2 && prec <= stack2[stack2.length - 2].prec; )
      right = stack2.pop(), operator2 = stack2.pop().value, left = stack2.pop(), markers.pop(), expr2 = finishBinaryExpression(operator2, left, right), stack2.push(expr2);
    token = lex(), token.prec = prec, stack2.push(token), markers.push(lookahead), expr2 = parseUnaryExpression(), stack2.push(expr2);
  }
  for (i = stack2.length - 1, expr2 = stack2[i], markers.pop(); i > 1; )
    markers.pop(), expr2 = finishBinaryExpression(stack2[i - 1].value, stack2[i - 2], expr2), i -= 2;
  return expr2;
}
function parseConditionalExpression() {
  var expr2, consequent, alternate;
  return expr2 = parseBinaryExpression(), match("?") && (lex(), consequent = parseConditionalExpression(), expect(":"), alternate = parseConditionalExpression(), expr2 = finishConditionalExpression(expr2, consequent, alternate)), expr2;
}
function parseExpression() {
  let expr2 = parseConditionalExpression();
  if (match(","))
    throw new Error(DISABLED);
  return expr2;
}
function parser(code) {
  source2 = code, index2 = 0, length = source2.length, lookahead = null, peek2();
  let expr2 = parseExpression();
  if (lookahead.type !== TokenEOF)
    throw new Error("Unexpect token after expression.");
  return expr2;
}
var Constants = {
  NaN: "NaN",
  E: "Math.E",
  LN2: "Math.LN2",
  LN10: "Math.LN10",
  LOG2E: "Math.LOG2E",
  LOG10E: "Math.LOG10E",
  PI: "Math.PI",
  SQRT1_2: "Math.SQRT1_2",
  SQRT2: "Math.SQRT2",
  MIN_VALUE: "Number.MIN_VALUE",
  MAX_VALUE: "Number.MAX_VALUE"
};
function Functions(codegen2) {
  function fncall(name2, args, cast, type3) {
    let obj = codegen2(args[0]);
    return cast && (obj = cast + "(" + obj + ")", cast.lastIndexOf("new ", 0) === 0 && (obj = "(" + obj + ")")), obj + "." + name2 + (type3 < 0 ? "" : type3 === 0 ? "()" : "(" + args.slice(1).map(codegen2).join(",") + ")");
  }
  function fn(name2, cast, type3) {
    return (args) => fncall(name2, args, cast, type3);
  }
  let DATE2 = "new Date", STRING = "String", REGEXP = "RegExp";
  return {
    // MATH functions
    isNaN: "Number.isNaN",
    isFinite: "Number.isFinite",
    abs: "Math.abs",
    acos: "Math.acos",
    asin: "Math.asin",
    atan: "Math.atan",
    atan2: "Math.atan2",
    ceil: "Math.ceil",
    cos: "Math.cos",
    exp: "Math.exp",
    floor: "Math.floor",
    hypot: "Math.hypot",
    log: "Math.log",
    max: "Math.max",
    min: "Math.min",
    pow: "Math.pow",
    random: "Math.random",
    round: "Math.round",
    sin: "Math.sin",
    sqrt: "Math.sqrt",
    tan: "Math.tan",
    clamp: function(args) {
      args.length < 3 && error62("Missing arguments to clamp function."), args.length > 3 && error62("Too many arguments to clamp function.");
      let a = args.map(codegen2);
      return "Math.max(" + a[1] + ", Math.min(" + a[2] + "," + a[0] + "))";
    },
    // DATE functions
    now: "Date.now",
    utc: "Date.UTC",
    datetime: DATE2,
    date: fn("getDate", DATE2, 0),
    day: fn("getDay", DATE2, 0),
    year: fn("getFullYear", DATE2, 0),
    month: fn("getMonth", DATE2, 0),
    hours: fn("getHours", DATE2, 0),
    minutes: fn("getMinutes", DATE2, 0),
    seconds: fn("getSeconds", DATE2, 0),
    milliseconds: fn("getMilliseconds", DATE2, 0),
    time: fn("getTime", DATE2, 0),
    timezoneoffset: fn("getTimezoneOffset", DATE2, 0),
    utcdate: fn("getUTCDate", DATE2, 0),
    utcday: fn("getUTCDay", DATE2, 0),
    utcyear: fn("getUTCFullYear", DATE2, 0),
    utcmonth: fn("getUTCMonth", DATE2, 0),
    utchours: fn("getUTCHours", DATE2, 0),
    utcminutes: fn("getUTCMinutes", DATE2, 0),
    utcseconds: fn("getUTCSeconds", DATE2, 0),
    utcmilliseconds: fn("getUTCMilliseconds", DATE2, 0),
    // sequence functions
    length: fn("length", null, -1),
    // STRING functions
    parseFloat: "parseFloat",
    parseInt: "parseInt",
    upper: fn("toUpperCase", STRING, 0),
    lower: fn("toLowerCase", STRING, 0),
    substring: fn("substring", STRING),
    split: fn("split", STRING),
    trim: fn("trim", STRING, 0),
    // base64 encode/decode
    btoa: "btoa",
    atob: "atob",
    // URI encoding
    encodeURIComponent: "encodeURIComponent",
    // REGEXP functions
    regexp: REGEXP,
    test: fn("test", REGEXP),
    // Control Flow functions
    if: function(args) {
      args.length < 3 && error62("Missing arguments to if function."), args.length > 3 && error62("Too many arguments to if function.");
      let a = args.map(codegen2);
      return "(" + a[0] + "?" + a[1] + ":" + a[2] + ")";
    }
  };
}
function stripQuotes(s) {
  let n = s && s.length - 1;
  return n && (s[0] === '"' && s[n] === '"' || s[0] === "'" && s[n] === "'") ? s.slice(1, -1) : s;
}
function codegen(opt) {
  opt = opt || {};
  let allowed = opt.allowed ? toSet(opt.allowed) : {}, forbidden = opt.forbidden ? toSet(opt.forbidden) : {}, constants3 = opt.constants || Constants, functions = (opt.functions || Functions)(visit3), globalvar = opt.globalvar, fieldvar = opt.fieldvar, outputGlobal = isFunction(globalvar) ? globalvar : (id3) => `${globalvar}["${id3}"]`, globals = {}, fields = {}, memberDepth = 0;
  function visit3(ast) {
    if (isString(ast)) return ast;
    let generator = Generators[ast.type];
    return generator == null && error62("Unsupported type: " + ast.type), generator(ast);
  }
  let Generators = {
    Literal: (n) => n.raw,
    Identifier: (n) => {
      let id3 = n.name;
      return memberDepth > 0 ? id3 : hasOwnProperty(forbidden, id3) ? error62("Illegal identifier: " + id3) : hasOwnProperty(constants3, id3) ? constants3[id3] : hasOwnProperty(allowed, id3) ? id3 : (globals[id3] = 1, outputGlobal(id3));
    },
    MemberExpression: (n) => {
      let d = !n.computed, o = visit3(n.object);
      d && (memberDepth += 1);
      let p = visit3(n.property);
      return o === fieldvar && (fields[stripQuotes(p)] = 1), d && (memberDepth -= 1), o + (d ? "." + p : "[" + p + "]");
    },
    CallExpression: (n) => {
      n.callee.type !== "Identifier" && error62("Illegal callee type: " + n.callee.type);
      let callee = n.callee.name, args = n.arguments, fn = hasOwnProperty(functions, callee) && functions[callee];
      return fn || error62("Unrecognized function: " + callee), isFunction(fn) ? fn(args) : fn + "(" + args.map(visit3).join(",") + ")";
    },
    ArrayExpression: (n) => "[" + n.elements.map(visit3).join(",") + "]",
    BinaryExpression: (n) => "(" + visit3(n.left) + " " + n.operator + " " + visit3(n.right) + ")",
    UnaryExpression: (n) => "(" + n.operator + visit3(n.argument) + ")",
    ConditionalExpression: (n) => "(" + visit3(n.test) + "?" + visit3(n.consequent) + ":" + visit3(n.alternate) + ")",
    LogicalExpression: (n) => "(" + visit3(n.left) + n.operator + visit3(n.right) + ")",
    ObjectExpression: (n) => {
      for (let prop of n.properties) {
        let keyName = prop.key.type === "Literal" ? String(prop.key.value) : prop.key.name;
        DisallowedObjectProperties.has(keyName) && error62("Illegal property: " + keyName);
      }
      return "{" + n.properties.map(visit3).join(",") + "}";
    },
    Property: (n) => {
      memberDepth += 1;
      let k = visit3(n.key);
      return memberDepth -= 1, k + ":" + visit3(n.value);
    }
  };
  function codegen2(ast) {
    let result = {
      code: visit3(ast),
      globals: Object.keys(globals),
      fields: Object.keys(fields)
    };
    return globals = {}, fields = {}, result;
  }
  return codegen2.functions = functions, codegen2.constants = constants3, codegen2;
}

// node_modules/vega-selections/build/vega-selection.js
var SELECTION_GETTER = /* @__PURE__ */ Symbol("vega_selection_getter");
function getter2(f) {
  return (!f.getter || !f.getter[SELECTION_GETTER]) && (f.getter = field(f.field), f.getter[SELECTION_GETTER] = !0), f.getter;
}
var Intersect = "intersect", Union = "union", VlMulti = "vlMulti", VlPoint = "vlPoint", Or = "or", And = "and", SelectionId = "_vgsid_", $selectionId = field(SelectionId), TYPE_ENUM = "E", TYPE_RANGE_INC = "R", TYPE_RANGE_EXC = "R-E", TYPE_RANGE_LE = "R-LE", TYPE_RANGE_RE = "R-RE", TYPE_PRED_LT = "E-LT", TYPE_PRED_LTE = "E-LTE", TYPE_PRED_GT = "E-GT", TYPE_PRED_GTE = "E-GTE", TYPE_PRED_VALID = "E-VALID", TYPE_PRED_ONE_OF = "E-ONE", UNIT_INDEX = "index:unit";
function testPoint(datum2, entry2) {
  for (var fields = entry2.fields, values3 = entry2.values, n = fields.length, i = 0, dval, f; i < n; ++i)
    if (f = fields[i], dval = getter2(f)(datum2), isDate(dval) && (dval = toNumber(dval)), isDate(values3[i]) && (values3[i] = toNumber(values3[i])), isArray(values3[i]) && isDate(values3[i][0]) && (values3[i] = values3[i].map(toNumber)), f.type === TYPE_ENUM) {
      if (isArray(values3[i]) ? !values3[i].includes(dval) : dval !== values3[i])
        return !1;
    } else if (f.type === TYPE_RANGE_INC) {
      if (!inrange(dval, values3[i])) return !1;
    } else if (f.type === TYPE_RANGE_RE) {
      if (!inrange(dval, values3[i], !0, !1)) return !1;
    } else if (f.type === TYPE_RANGE_EXC) {
      if (!inrange(dval, values3[i], !1, !1)) return !1;
    } else if (f.type === TYPE_RANGE_LE) {
      if (!inrange(dval, values3[i], !1, !0)) return !1;
    } else if (f.type === TYPE_PRED_LT) {
      if (dval >= values3[i]) return !1;
    } else if (f.type === TYPE_PRED_LTE) {
      if (dval > values3[i]) return !1;
    } else if (f.type === TYPE_PRED_GT) {
      if (dval <= values3[i]) return !1;
    } else if (f.type === TYPE_PRED_GTE) {
      if (dval < values3[i]) return !1;
    } else if (f.type === TYPE_PRED_VALID) {
      if (dval === null || isNaN(dval)) return !1;
    } else if (f.type === TYPE_PRED_ONE_OF && values3[i].indexOf(dval) === -1)
      return !1;
  return !0;
}
function selectionTest(name2, datum2, op) {
  for (var data3 = this.context.data[name2], entries2 = data3 ? data3.values.value : [], unitIdx = data3 ? data3[UNIT_INDEX] && data3[UNIT_INDEX].value : void 0, intersect5 = op === Intersect, n = entries2.length, i = 0, entry2, miss, count4, unit2, b10; i < n; ++i)
    if (entry2 = entries2[i], unitIdx && intersect5) {
      if (miss = miss || {}, count4 = miss[unit2 = entry2.unit] || 0, count4 === -1) continue;
      if (b10 = testPoint(datum2, entry2), miss[unit2] = b10 ? -1 : ++count4, b10 && unitIdx.size === 1) return !0;
      if (!b10 && count4 === unitIdx.get(unit2).count) return !1;
    } else if (b10 = testPoint(datum2, entry2), intersect5 ^ b10) return b10;
  return n && intersect5;
}
var bisect = bisector($selectionId), bisectLeft2 = bisect.left, bisectRight2 = bisect.right;
function selectionIdTest(name2, datum2, op) {
  let data3 = this.context.data[name2], entries2 = data3 ? data3.values.value : [], unitIdx = data3 ? data3[UNIT_INDEX] && data3[UNIT_INDEX].value : void 0, intersect5 = op === Intersect, value3 = $selectionId(datum2), index4 = bisectLeft2(entries2, value3);
  if (index4 === entries2.length || $selectionId(entries2[index4]) !== value3) return !1;
  if (unitIdx && intersect5) {
    if (unitIdx.size === 1) return !0;
    if (bisectRight2(entries2, value3) - index4 < unitIdx.size) return !1;
  }
  return !0;
}
function selectionTuples(array4, base) {
  return isArray(array4) || error62("First argument to selectionTuples must be an array."), isObject2(base) || error62("Second argument to selectionTuples must be an object."), array4.map((x5) => extend2(base.fields ? {
    values: base.fields.map((f) => getter2(f)(x5.datum))
  } : {
    [SelectionId]: $selectionId(x5.datum)
  }, base));
}
function selectionResolve(name2, op, isMulti, vl5) {
  for (var data3 = this.context.data[name2], entries2 = data3 ? data3.values.value : [], resolved = {}, multiRes = {}, types = {}, entry2, fields, values3, unit2, field3, value3, res, resUnit, type3, union3, n = entries2.length, i = 0, j2, m; i < n; ++i)
    if (entry2 = entries2[i], unit2 = entry2.unit, fields = entry2.fields, values3 = entry2.values, fields && values3) {
      for (j2 = 0, m = fields.length; j2 < m; ++j2)
        field3 = fields[j2], res = resolved[field3.field] || (resolved[field3.field] = {}), resUnit = res[unit2] || (res[unit2] = []), types[field3.field] = type3 = field3.type.charAt(0), union3 = ops[`${type3}_union`], res[unit2] = union3(resUnit, array_default(values3[j2]));
      isMulti && (resUnit = multiRes[unit2] || (multiRes[unit2] = []), resUnit.push(array_default(values3).reduce((obj, curr, j3) => (obj[fields[j3].field] = curr, obj), {})));
    } else
      field3 = SelectionId, value3 = $selectionId(entry2), res = resolved[field3] || (resolved[field3] = {}), resUnit = res[unit2] || (res[unit2] = []), resUnit.push(value3), isMulti && (resUnit = multiRes[unit2] || (multiRes[unit2] = []), resUnit.push({
        [SelectionId]: value3
      }));
  if (op = op || Union, resolved[SelectionId] ? resolved[SelectionId] = ops[`${SelectionId}_${op}`](...Object.values(resolved[SelectionId])) : Object.keys(resolved).forEach((field4) => {
    resolved[field4] = Object.keys(resolved[field4]).map((unit3) => resolved[field4][unit3]).reduce((acc, curr) => acc === void 0 ? curr : ops[`${types[field4]}_${op}`](acc, curr));
  }), entries2 = Object.keys(multiRes), isMulti && entries2.length) {
    let key2 = vl5 ? VlPoint : VlMulti;
    resolved[key2] = op === Union ? {
      [Or]: entries2.reduce((acc, k) => (acc.push(...multiRes[k]), acc), [])
    } : {
      [And]: entries2.map((k) => ({
        [Or]: multiRes[k]
      }))
    };
  }
  return resolved;
}
var ops = {
  [`${SelectionId}_union`]: union2,
  [`${SelectionId}_intersect`]: intersection2,
  E_union: function(base, value3) {
    if (!base.length) return value3;
    for (var i = 0, n = value3.length; i < n; ++i) base.includes(value3[i]) || base.push(value3[i]);
    return base;
  },
  E_intersect: function(base, value3) {
    return base.length ? base.filter((v2) => value3.includes(v2)) : value3;
  },
  R_union: function(base, value3) {
    var lo = toNumber(value3[0]), hi = toNumber(value3[1]);
    return lo > hi && (lo = value3[1], hi = value3[0]), base.length ? (base[0] > lo && (base[0] = lo), base[1] < hi && (base[1] = hi), base) : [lo, hi];
  },
  R_intersect: function(base, value3) {
    var lo = toNumber(value3[0]), hi = toNumber(value3[1]);
    return lo > hi && (lo = value3[1], hi = value3[0]), base.length ? hi < base[0] || base[1] < lo ? [] : (base[0] < lo && (base[0] = lo), base[1] > hi && (base[1] = hi), base) : [lo, hi];
  }
}, DataPrefix = ":", IndexPrefix = "@";
function selectionVisitor(name2, args, scope, params2) {
  args[0].type !== Literal && error62("First argument to selection functions must be a string literal.");
  let data3 = args[0].value, op = args.length >= 2 && peek(args).value, field3 = "unit", indexName = IndexPrefix + field3, dataName = DataPrefix + data3;
  op === Intersect && !hasOwnProperty(params2, indexName) && (params2[indexName] = scope.getData(data3).indataRef(scope, field3)), hasOwnProperty(params2, dataName) || (params2[dataName] = scope.getData(data3).tuplesRef());
}

// node_modules/vega-functions/build/vega-functions.js
function data(name2) {
  let data3 = this.context.data[name2];
  return data3 ? data3.values.value : [];
}
function indata(name2, field3, value3) {
  let index4 = this.context.data[name2]["index:" + field3], entry2 = index4 ? index4.value.get(value3) : void 0;
  return entry2 && entry2.count;
}
function setdata(name2, tuples) {
  let df = this.context.dataflow, data3 = this.context.data[name2], input2 = data3.input;
  return df.pulse(input2, df.changeset().remove(truthy).insert(tuples)), 1;
}
var easeFunctions = {
  easeLinear: linear4,
  easeQuad: quadInOut,
  easeQuadIn: quadIn,
  easeQuadOut: quadOut,
  easeQuadInOut: quadInOut,
  easeCubic: cubicInOut,
  easeCubicIn: cubicIn,
  easeCubicOut: cubicOut,
  easeCubicInOut: cubicInOut,
  easePoly: polyInOut,
  easePolyIn: polyIn,
  easePolyOut: polyOut,
  easePolyInOut: polyInOut,
  easeSin: sinInOut,
  easeSinIn: sinIn,
  easeSinOut: sinOut,
  easeSinInOut: sinInOut,
  easeExp: expInOut,
  easeExpIn: expIn,
  easeExpOut: expOut,
  easeExpInOut: expInOut,
  easeCircle: circleInOut,
  easeCircleIn: circleIn,
  easeCircleOut: circleOut,
  easeCircleInOut: circleInOut,
  easeBounce: bounceOut,
  easeBounceIn: bounceIn,
  easeBounceOut: bounceOut,
  easeBounceInOut: bounceInOut,
  easeBack: backInOut,
  easeBackIn: backIn,
  easeBackOut: backOut,
  easeBackInOut: backInOut,
  easeElastic: elasticOut,
  easeElasticIn: elasticIn,
  easeElasticOut: elasticOut,
  easeElasticInOut: elasticInOut
};
function encode3(item, name2, retval) {
  if (item) {
    let df = this.context.dataflow, target3 = item.mark.source;
    df.pulse(target3, df.changeset().encode(item, name2));
  }
  return retval !== void 0 ? retval : item;
}
function interpolateLinear(values3, frac) {
  if (!isArray(values3) || !values3.length) return;
  let n = values3.length, lo = values3[0], f = +frac;
  if (n === 1 || !(f > 0)) return lo;
  if (f >= 1) return peek(values3);
  let pos = f * (n - 1), i = Math.floor(pos), t = pos - i;
  return t ? values3[i] + t * (values3[i + 1] - values3[i]) : values3[i];
}
var wrap = (method2) => function(value3, spec) {
  let locale4 = this.context.dataflow.locale();
  return value3 === null ? "null" : locale4[method2](spec)(value3);
}, format4 = wrap("format"), timeFormat2 = wrap("timeFormat"), utcFormat2 = wrap("utcFormat"), timeParse2 = wrap("timeParse"), utcParse2 = wrap("utcParse"), dateObj = new Date(2e3, 0, 1);
function time4(month, day, specifier) {
  return !Number.isInteger(month) || !Number.isInteger(day) ? "" : (dateObj.setYear(2e3), dateObj.setMonth(month), dateObj.setDate(day), timeFormat2.call(this, dateObj, specifier));
}
function monthFormat(month) {
  return time4.call(this, month, 1, "%B");
}
function monthAbbrevFormat(month) {
  return time4.call(this, month, 1, "%b");
}
function dayFormat(day) {
  return time4.call(this, 0, 2 + day, "%A");
}
function dayAbbrevFormat(day) {
  return time4.call(this, 0, 2 + day, "%a");
}
var DataPrefix2 = ":", IndexPrefix2 = "@", ScalePrefix = "%", SignalPrefix = "$";
function dataVisitor(name2, args, scope, params2) {
  args[0].type !== Literal && error62("First argument to data functions must be a string literal.");
  let data3 = args[0].value, dataName = DataPrefix2 + data3;
  if (!hasOwnProperty(dataName, params2))
    try {
      params2[dataName] = scope.getData(data3).tuplesRef();
    } catch {
    }
}
function indataVisitor(name2, args, scope, params2) {
  args[0].type !== Literal && error62("First argument to indata must be a string literal."), args[1].type !== Literal && error62("Second argument to indata must be a string literal.");
  let data3 = args[0].value, field3 = args[1].value, indexName = IndexPrefix2 + field3;
  hasOwnProperty(indexName, params2) || (params2[indexName] = scope.getData(data3).indataRef(scope, field3));
}
function scaleVisitor(name2, args, scope, params2) {
  if (args[0].type === Literal)
    addScaleDependency(scope, params2, args[0].value);
  else
    for (name2 in scope.scales)
      addScaleDependency(scope, params2, name2);
}
function addScaleDependency(scope, params2, name2) {
  let scaleName = ScalePrefix + name2;
  if (!hasOwnProperty(params2, scaleName))
    try {
      params2[scaleName] = scope.scaleRef(name2);
    } catch {
    }
}
function getScale(nameOrFunction, ctx) {
  if (isString(nameOrFunction)) {
    let maybeScale = ctx.scales[nameOrFunction];
    return maybeScale && isRegisteredScale(maybeScale.value) ? maybeScale.value : void 0;
  } else if (isFunction(nameOrFunction))
    return isRegisteredScale(nameOrFunction) ? nameOrFunction : void 0;
}
function internalScaleFunctions(codegen2, fnctx, visitors) {
  fnctx.__bandwidth = (s) => s && s.bandwidth ? s.bandwidth() : 0, visitors._bandwidth = scaleVisitor, visitors._range = scaleVisitor, visitors._scale = scaleVisitor;
  let ref2 = (arg) => "_[" + (arg.type === Literal ? stringValue(ScalePrefix + arg.value) : stringValue(ScalePrefix) + "+" + codegen2(arg)) + "]";
  return {
    _bandwidth: (args) => `this.__bandwidth(${ref2(args[0])})`,
    _range: (args) => `${ref2(args[0])}.range()`,
    _scale: (args) => `${ref2(args[0])}(${codegen2(args[1])})`
  };
}
function geoMethod(methodName, globalMethod) {
  return function(projection3, geojson, group2) {
    if (projection3) {
      let p = getScale(projection3, (group2 || this).context);
      return p && p.path[methodName](geojson);
    } else
      return globalMethod(geojson);
  };
}
var geoArea = geoMethod("area", area_default2), geoBounds = geoMethod("bounds", bounds_default), geoCentroid = geoMethod("centroid", centroid_default);
function geoScale(projection3, group2) {
  let p = getScale(projection3, (group2 || this).context);
  return p && p.scale();
}
function geoTranslate(projection3, group2) {
  let p = getScale(projection3, (group2 || this).context);
  return p && p.translate();
}
function inScope(item) {
  let group2 = this.context.group, value3 = !1;
  if (group2) for (; item; ) {
    if (item === group2) {
      value3 = !0;
      break;
    }
    item = item.mark.group;
  }
  return value3;
}
function log6(df, method2, args) {
  try {
    df[method2].apply(df, ["EXPRESSION"].concat([].slice.call(args)));
  } catch (err) {
    df.warn(err);
  }
  return args[args.length - 1];
}
function warn() {
  return log6(this.context.dataflow, "warn", arguments);
}
function info() {
  return log6(this.context.dataflow, "info", arguments);
}
function debug() {
  return log6(this.context.dataflow, "debug", arguments);
}
function channel_luminance_value(channelValue) {
  let val = channelValue / 255;
  return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
}
function luminance(color5) {
  let c = rgb(color5), r = channel_luminance_value(c.r), g = channel_luminance_value(c.g), b10 = channel_luminance_value(c.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b10;
}
function contrast(color1, color22) {
  let lum1 = luminance(color1), lum2 = luminance(color22), lumL = Math.max(lum1, lum2), lumD = Math.min(lum1, lum2);
  return (lumL + 0.05) / (lumD + 0.05);
}
function merge5() {
  let args = [].slice.call(arguments);
  return args.unshift({}), extend2(...args);
}
function equal(a, b10) {
  return a === b10 || a !== a && b10 !== b10 ? !0 : isArray(a) ? isArray(b10) && a.length === b10.length ? equalArray(a, b10) : !1 : isObject2(a) && isObject2(b10) ? equalObject(a, b10) : !1;
}
function equalArray(a, b10) {
  for (let i = 0, n = a.length; i < n; ++i)
    if (!equal(a[i], b10[i])) return !1;
  return !0;
}
function equalObject(a, b10) {
  for (let key2 in a)
    if (!equal(a[key2], b10[key2])) return !1;
  return !0;
}
function removePredicate(props) {
  return (_) => equalObject(props, _);
}
function modify(name2, insert2, remove2, toggle2, modify2, values3) {
  let df = this.context.dataflow, data3 = this.context.data[name2], input2 = data3.input, stamp3 = df.stamp(), changes = data3.changes, predicate, key2;
  if (df._trigger === !1 || !(input2.value.length || insert2 || toggle2))
    return 0;
  if ((!changes || changes.stamp < stamp3) && (data3.changes = changes = df.changeset(), changes.stamp = stamp3, df.runAfter(() => {
    data3.modified = !0, df.pulse(input2, changes).run();
  }, !0, 1)), remove2 && (predicate = remove2 === !0 ? truthy : isArray(remove2) || isTuple(remove2) ? remove2 : removePredicate(remove2), changes.remove(predicate)), insert2 && changes.insert(insert2), toggle2 && (predicate = removePredicate(toggle2), input2.value.some(predicate) ? changes.remove(predicate) : changes.insert(toggle2)), modify2) {
    if (isFunction(modify2))
      throw Error("modify parameter must be a data tuple, not a function");
    for (key2 in values3)
      changes.modify(modify2, key2, values3[key2]);
  }
  return 1;
}
function pinchDistance(event2) {
  let t = event2.touches, dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY;
  return Math.hypot(dx, dy);
}
function pinchAngle(event2) {
  let t = event2.touches;
  return Math.atan2(t[0].clientY - t[1].clientY, t[0].clientX - t[1].clientX);
}
var accessors = {};
function pluck(data3, name2) {
  let accessor2 = accessors[name2] || (accessors[name2] = field(name2));
  return isArray(data3) ? data3.map(accessor2) : accessor2(data3);
}
function array3(seq) {
  return isArray(seq) || ArrayBuffer.isView(seq) ? seq : null;
}
function sequence2(seq) {
  return array3(seq) || (isString(seq) ? seq : null);
}
function join11(seq, ...args) {
  return array3(seq).join(...args);
}
function indexof(seq, ...args) {
  return sequence2(seq).indexOf(...args);
}
function lastindexof(seq, ...args) {
  return sequence2(seq).lastIndexOf(...args);
}
function slice3(seq, ...args) {
  return sequence2(seq).slice(...args);
}
function replace2(str, pattern, repl) {
  return isFunction(repl) && error62("Function argument passed to replace."), !isString(pattern) && !isRegExp(pattern) && error62("Please pass a string or RegExp argument to replace."), String(str).replace(pattern, repl);
}
function reverse(seq) {
  return array3(seq).slice().reverse();
}
function sort2(seq) {
  return array3(seq).slice().sort(ascending);
}
function bandspace(count4, paddingInner2, paddingOuter2) {
  return bandSpace(count4 || 0, paddingInner2 || 0, paddingOuter2 || 0);
}
function bandwidth(name2, group2) {
  let s = getScale(name2, (group2 || this).context);
  return s && s.bandwidth ? s.bandwidth() : 0;
}
function copy4(name2, group2) {
  let s = getScale(name2, (group2 || this).context);
  return s ? s.copy() : void 0;
}
function domain2(name2, group2) {
  let s = getScale(name2, (group2 || this).context);
  return s ? s.domain() : [];
}
function invert(name2, range7, group2) {
  let s = getScale(name2, (group2 || this).context);
  return s ? isArray(range7) ? (s.invertRange || s.invert)(range7) : (s.invert || s.invertExtent)(range7) : void 0;
}
function range4(name2, group2) {
  let s = getScale(name2, (group2 || this).context);
  return s && s.range ? s.range() : [];
}
function scale4(name2, value3, group2) {
  let s = getScale(name2, (group2 || this).context);
  return s ? s(value3) : void 0;
}
function scaleGradient(scale7, p02, p1, count4, group2) {
  scale7 = getScale(scale7, (group2 || this).context);
  let gradient4 = Gradient(p02, p1), stops = scale7.domain(), min4 = stops[0], max4 = peek(stops), fraction = identity6;
  return max4 - min4 ? fraction = scaleFraction(scale7, min4, max4) : scale7 = (scale7.interpolator ? scale("sequential")().interpolator(scale7.interpolator()) : scale("linear")().interpolate(scale7.interpolate()).range(scale7.range())).domain([min4 = 0, max4 = 1]), scale7.ticks && (stops = scale7.ticks(+count4 || 15), min4 !== stops[0] && stops.unshift(min4), max4 !== peek(stops) && stops.push(max4)), stops.forEach((_) => gradient4.stop(fraction(_), scale7(_))), gradient4;
}
function geoShape(projection3, geojson, group2) {
  let p = getScale(projection3, (group2 || this).context);
  return function(context3) {
    return p ? p.path.context(context3)(geojson) : "";
  };
}
function pathShape(path3) {
  let p = null;
  return function(context3) {
    return context3 ? pathRender(context3, p = p || parse6(path3)) : path3;
  };
}
var datum = (d) => d.data;
function treeNodes(name2, context3) {
  let tree = data.call(context3, name2);
  return tree.root && tree.root.lookup || {};
}
function treePath(name2, source4, target3) {
  let nodes = treeNodes(name2, this), s = nodes[source4], t = nodes[target3];
  return s && t ? s.path(t).map(datum) : void 0;
}
function treeAncestors(name2, node2) {
  let n = treeNodes(name2, this)[node2];
  return n ? n.ancestors().map(datum) : void 0;
}
var _window = () => typeof window < "u" && window || null;
function screen() {
  let w2 = _window();
  return w2 ? w2.screen : {};
}
function windowSize() {
  let w2 = _window();
  return w2 ? [w2.innerWidth, w2.innerHeight] : [void 0, void 0];
}
function containerSize() {
  let view2 = this.context.dataflow, el = view2.container && view2.container();
  return el ? [el.clientWidth, el.clientHeight] : [void 0, void 0];
}
function intersect4(b10, opt, group2) {
  if (!b10) return [];
  let [u4, v2] = b10, box = new Bounds().set(u4[0], u4[1], v2[0], v2[1]), scene = group2 || this.context.dataflow.scenegraph().root;
  return intersect2(scene, box, filter2(opt));
}
function filter2(opt) {
  let p = null;
  if (opt) {
    let types = array_default(opt.marktype), names = array_default(opt.markname);
    p = (_) => (!types.length || types.some((t) => _.marktype === t)) && (!names.length || names.some((s) => _.name === s));
  }
  return p;
}
function lassoAppend(lasso, x5, y5, minDist = 5) {
  lasso = array_default(lasso);
  let last = lasso[lasso.length - 1];
  return last === void 0 || Math.hypot(last[0] - x5, last[1] - y5) > minDist ? [...lasso, [x5, y5]] : lasso;
}
function lassoPath(lasso) {
  return array_default(lasso).reduce((svg, [x5, y5], i) => svg += i == 0 ? `M ${x5},${y5} ` : i === lasso.length - 1 ? " Z" : `L ${x5},${y5} `, "");
}
function intersectLasso(markname, pixelLasso, unit2) {
  let {
    x: x5,
    y: y5,
    mark
  } = unit2, bb2 = new Bounds().set(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
  for (let [px2, py2] of pixelLasso)
    px2 < bb2.x1 && (bb2.x1 = px2), px2 > bb2.x2 && (bb2.x2 = px2), py2 < bb2.y1 && (bb2.y1 = py2), py2 > bb2.y2 && (bb2.y2 = py2);
  return bb2.translate(x5, y5), intersect4([[bb2.x1, bb2.y1], [bb2.x2, bb2.y2]], markname, mark).filter((tuple2) => pointInPolygon(tuple2.x, tuple2.y, pixelLasso));
}
function pointInPolygon(testx, testy, polygon) {
  let intersections = 0;
  for (let i = 0, j2 = polygon.length - 1; i < polygon.length; j2 = i++) {
    let [prevX, prevY] = polygon[j2], [x5, y5] = polygon[i];
    y5 > testy != prevY > testy && testx < (prevX - x5) * (testy - y5) / (prevY - y5) + x5 && intersections++;
  }
  return intersections & 1;
}
var functionContext = {
  random() {
    return random();
  },
  // override default
  cumulativeNormal,
  cumulativeLogNormal,
  cumulativeUniform,
  densityNormal,
  densityLogNormal,
  densityUniform,
  quantileNormal,
  quantileLogNormal,
  quantileUniform,
  sampleNormal,
  sampleLogNormal,
  sampleUniform,
  isArray,
  isBoolean,
  isDate,
  isDefined(_) {
    return _ !== void 0;
  },
  isNumber,
  isObject: isObject2,
  isRegExp,
  isString,
  isTuple,
  isValid(_) {
    return _ != null && _ === _;
  },
  toBoolean,
  toDate(_) {
    return toDate(_);
  },
  // suppress extra arguments
  toNumber,
  toString,
  indexof,
  join: join11,
  lastindexof,
  replace: replace2,
  reverse,
  sort: sort2,
  slice: slice3,
  flush: flush_default,
  lerp: lerp_default,
  interpolateLinear,
  merge: merge5,
  pad,
  peek,
  pluck,
  span: span_default,
  inrange,
  truncate,
  rgb,
  lab,
  hcl,
  hsl,
  luminance,
  contrast,
  sequence: range2,
  format: format4,
  utcFormat: utcFormat2,
  utcParse: utcParse2,
  utcOffset,
  utcSequence,
  timeFormat: timeFormat2,
  timeParse: timeParse2,
  timeOffset,
  timeSequence,
  timeUnitSpecifier,
  monthFormat,
  monthAbbrevFormat,
  dayFormat,
  dayAbbrevFormat,
  quarter,
  utcquarter,
  week,
  utcweek,
  isoweek,
  utcisoweek,
  dayofyear,
  utcdayofyear,
  warn,
  info,
  debug,
  extent(_) {
    return extent(_);
  },
  // suppress extra arguments
  inScope,
  intersect: intersect4,
  clampRange,
  pinchDistance,
  pinchAngle,
  screen,
  containerSize,
  windowSize,
  bandspace,
  setdata,
  pathShape,
  panLinear,
  panLog,
  panPow,
  panSymlog,
  zoomLinear,
  zoomLog,
  zoomPow,
  zoomSymlog,
  encode: encode3,
  modify,
  lassoAppend,
  lassoPath,
  intersectLasso,
  ...easeFunctions
}, eventFunctions = ["view", "item", "group", "xy", "x", "y"], eventPrefix = "event.vega.", thisPrefix = "this.", astVisitors = {}, codegenParams = {
  forbidden: ["_"],
  allowed: ["datum", "event", "item"],
  fieldvar: "datum",
  globalvar: (id3) => `_[${stringValue(SignalPrefix + id3)}]`,
  functions: buildFunctions,
  constants: Constants,
  visitors: astVisitors
}, codeGenerator = codegen(codegenParams);
function buildFunctions(codegen2) {
  let fn = Functions(codegen2);
  eventFunctions.forEach((name2) => fn[name2] = eventPrefix + name2);
  for (let name2 in functionContext)
    fn[name2] = thisPrefix + name2;
  return extend2(fn, internalScaleFunctions(codegen2, functionContext, astVisitors)), fn;
}
function expressionFunction(name2, fn, visitor) {
  return arguments.length === 1 ? functionContext[name2] : (functionContext[name2] = fn, visitor && (astVisitors[name2] = visitor), codeGenerator && (codeGenerator.functions[name2] = thisPrefix + name2), this);
}
expressionFunction("bandwidth", bandwidth, scaleVisitor);
expressionFunction("copy", copy4, scaleVisitor);
expressionFunction("domain", domain2, scaleVisitor);
expressionFunction("range", range4, scaleVisitor);
expressionFunction("invert", invert, scaleVisitor);
expressionFunction("scale", scale4, scaleVisitor);
expressionFunction("gradient", scaleGradient, scaleVisitor);
expressionFunction("geoArea", geoArea, scaleVisitor);
expressionFunction("geoBounds", geoBounds, scaleVisitor);
expressionFunction("geoCentroid", geoCentroid, scaleVisitor);
expressionFunction("geoShape", geoShape, scaleVisitor);
expressionFunction("geoScale", geoScale, scaleVisitor);
expressionFunction("geoTranslate", geoTranslate, scaleVisitor);
expressionFunction("indata", indata, indataVisitor);
expressionFunction("data", data, dataVisitor);
expressionFunction("treePath", treePath, dataVisitor);
expressionFunction("treeAncestors", treeAncestors, dataVisitor);
expressionFunction("vlSelectionTest", selectionTest, selectionVisitor);
expressionFunction("vlSelectionIdTest", selectionIdTest, selectionVisitor);
expressionFunction("vlSelectionResolve", selectionResolve, selectionVisitor);
expressionFunction("vlSelectionTuples", selectionTuples);
function parser2(expr2, scope) {
  let params2 = {}, ast;
  try {
    expr2 = isString(expr2) ? expr2 : stringValue(expr2) + "", ast = parser(expr2);
  } catch {
    error62("Expression parse error: " + expr2);
  }
  ast.visit((node2) => {
    if (node2.type !== CallExpression) return;
    let name2 = node2.callee.name, visit3 = codegenParams.visitors[name2];
    visit3 && visit3(name2, node2.arguments, scope, params2);
  });
  let gen = codeGenerator(ast);
  return gen.globals.forEach((name2) => {
    let signalName = SignalPrefix + name2;
    !hasOwnProperty(params2, signalName) && scope.getSignal(name2) && (params2[signalName] = scope.signalRef(name2));
  }), {
    $expr: extend2({
      code: gen.code
    }, scope.options.ast ? {
      ast
    } : null),
    $fields: gen.fields,
    $params: params2
  };
}

// node_modules/vega-runtime/build/vega-runtime.js
function parse7(spec) {
  let ctx = this, operators = spec.operators || [];
  return spec.background && (ctx.background = spec.background), spec.eventConfig && (ctx.eventConfig = spec.eventConfig), spec.locale && (ctx.locale = spec.locale), operators.forEach((entry2) => ctx.parseOperator(entry2)), operators.forEach((entry2) => ctx.parseOperatorParameters(entry2)), (spec.streams || []).forEach((entry2) => ctx.parseStream(entry2)), (spec.updates || []).forEach((entry2) => ctx.parseUpdate(entry2)), ctx.resolve();
}
var Skip = toSet(["rule"]), Swap = toSet(["group", "image", "rect"]);
function adjustSpatial(encode4, marktype) {
  let code = "";
  return Skip[marktype] || (encode4.x2 && (encode4.x ? (Swap[marktype] && (code += "if(o.x>o.x2)$=o.x,o.x=o.x2,o.x2=$;"), code += "o.width=o.x2-o.x;") : code += "o.x=o.x2-(o.width||0);"), encode4.xc && (code += "o.x=o.xc-(o.width||0)/2;"), encode4.y2 && (encode4.y ? (Swap[marktype] && (code += "if(o.y>o.y2)$=o.y,o.y=o.y2,o.y2=$;"), code += "o.height=o.y2-o.y;") : code += "o.y=o.y2-(o.height||0);"), encode4.yc && (code += "o.y=o.yc-(o.height||0)/2;")), code;
}
function canonicalType(type3) {
  return (type3 + "").toLowerCase();
}
function isOperator(type3) {
  return canonicalType(type3) === "operator";
}
function isCollect(type3) {
  return canonicalType(type3) === "collect";
}
function expression(ctx, args, code) {
  code.endsWith(";") || (code = "return(" + code + ");");
  let fn = Function(...args.concat(code));
  return ctx && ctx.functions ? fn.bind(ctx.functions) : fn;
}
function _compare(u4, v2, lt, gt) {
  return `((u = ${u4}) < (v = ${v2}) || u == null) && v != null ? ${lt}
  : (u > v || v == null) && u != null ? ${gt}
  : ((v = v instanceof Date ? +v : v), (u = u instanceof Date ? +u : u)) !== u && v === v ? ${lt}
  : v !== v && u === u ? ${gt} : `;
}
var expressionCodegen = {
  /**
   * Parse an expression used to update an operator value.
   */
  operator: (ctx, expr2) => expression(ctx, ["_"], expr2.code),
  /**
   * Parse an expression provided as an operator parameter value.
   */
  parameter: (ctx, expr2) => expression(ctx, ["datum", "_"], expr2.code),
  /**
   * Parse an expression applied to an event stream.
   */
  event: (ctx, expr2) => expression(ctx, ["event"], expr2.code),
  /**
   * Parse an expression used to handle an event-driven operator update.
   */
  handler: (ctx, expr2) => {
    let code = `var datum=event.item&&event.item.datum;return ${expr2.code};`;
    return expression(ctx, ["_", "event"], code);
  },
  /**
   * Parse an expression that performs visual encoding.
   */
  encode: (ctx, encode4) => {
    let {
      marktype,
      channels
    } = encode4, code = "var o=item,datum=o.datum,m=0,$;";
    for (let name2 in channels) {
      let o = "o[" + stringValue(name2) + "]";
      code += `$=${channels[name2].code};if(${o}!==$)${o}=$,m=1;`;
    }
    return code += adjustSpatial(channels, marktype), code += "return m;", expression(ctx, ["item", "_"], code);
  },
  /**
   * Optimized code generators for access and comparison.
   */
  codegen: {
    get(path3) {
      let ref2 = `[${path3.map(stringValue).join("][")}]`, get6 = Function("_", `return _${ref2};`);
      return get6.path = ref2, get6;
    },
    comparator(fields, orders) {
      let t, map4 = (f, i) => {
        let o = orders[i], u4, v2;
        return f.path ? (u4 = `a${f.path}`, v2 = `b${f.path}`) : ((t = t || {})["f" + i] = f, u4 = `this.f${i}(a)`, v2 = `this.f${i}(b)`), _compare(u4, v2, -o, o);
      }, fn = Function("a", "b", "var u, v; return " + fields.map(map4).join("") + "0;");
      return t ? fn.bind(t) : fn;
    }
  }
};
function parseOperator(spec) {
  let ctx = this;
  isOperator(spec.type) || !spec.type ? ctx.operator(spec, spec.update ? ctx.operatorExpression(spec.update) : null) : ctx.transform(spec, spec.type);
}
function parseOperatorParameters(spec) {
  let ctx = this;
  if (spec.params) {
    let op = ctx.get(spec.id);
    op || error62("Invalid operator id: " + spec.id), ctx.dataflow.connect(op, op.parameters(ctx.parseParameters(spec.params), spec.react, spec.initonly));
  }
}
function parseParameters(spec, params2) {
  params2 = params2 || {};
  let ctx = this;
  for (let key2 in spec) {
    let value3 = spec[key2];
    params2[key2] = isArray(value3) ? value3.map((v2) => parseParameter(v2, ctx, params2)) : parseParameter(value3, ctx, params2);
  }
  return params2;
}
function parseParameter(spec, ctx, params2) {
  if (!spec || !isObject2(spec)) return spec;
  for (let i = 0, n = PARSERS.length, p; i < n; ++i)
    if (p = PARSERS[i], hasOwnProperty(spec, p.key))
      return p.parse(spec, ctx, params2);
  return spec;
}
var PARSERS = [{
  key: "$ref",
  parse: getOperator
}, {
  key: "$key",
  parse: getKey
}, {
  key: "$expr",
  parse: getExpression
}, {
  key: "$field",
  parse: getField2
}, {
  key: "$encode",
  parse: getEncode
}, {
  key: "$compare",
  parse: getCompare
}, {
  key: "$context",
  parse: getContext
}, {
  key: "$subflow",
  parse: getSubflow
}, {
  key: "$tupleid",
  parse: getTupleId
}];
function getOperator(_, ctx) {
  return ctx.get(_.$ref) || error62("Operator not defined: " + _.$ref);
}
function getExpression(_, ctx, params2) {
  _.$params && ctx.parseParameters(_.$params, params2);
  let k = "e:" + _.$expr.code;
  return ctx.fn[k] || (ctx.fn[k] = accessor(ctx.parameterExpression(_.$expr), _.$fields));
}
function getKey(_, ctx) {
  let k = "k:" + _.$key + "_" + !!_.$flat;
  return ctx.fn[k] || (ctx.fn[k] = key(_.$key, _.$flat, ctx.expr.codegen));
}
function getField2(_, ctx) {
  if (!_.$field) return null;
  let k = "f:" + _.$field + "_" + _.$name;
  return ctx.fn[k] || (ctx.fn[k] = field(_.$field, _.$name, ctx.expr.codegen));
}
function getCompare(_, ctx) {
  let k = "c:" + _.$compare + "_" + _.$order, c = array_default(_.$compare).map((_2) => _2 && _2.$tupleid ? tupleid : _2);
  return ctx.fn[k] || (ctx.fn[k] = compare(c, _.$order, ctx.expr.codegen));
}
function getEncode(_, ctx) {
  let spec = _.$encode, encode4 = {};
  for (let name2 in spec) {
    let enc = spec[name2];
    encode4[name2] = accessor(ctx.encodeExpression(enc.$expr), enc.$fields), encode4[name2].output = enc.$output;
  }
  return encode4;
}
function getContext(_, ctx) {
  return ctx;
}
function getSubflow(_, ctx) {
  let spec = _.$subflow;
  return function(dataflow, key2, parent) {
    let subctx = ctx.fork().parse(spec), op = subctx.get(spec.operators[0].id), p = subctx.signals.parent;
    return p && p.set(parent), op.detachSubflow = () => ctx.detach(subctx), op;
  };
}
function getTupleId() {
  return tupleid;
}
function parseStream(spec) {
  var ctx = this, filter3 = spec.filter != null ? ctx.eventExpression(spec.filter) : void 0, stream2 = spec.stream != null ? ctx.get(spec.stream) : void 0, args;
  spec.source ? stream2 = ctx.events(spec.source, spec.type, filter3) : spec.merge && (args = spec.merge.map((_) => ctx.get(_)), stream2 = args[0].merge.apply(args[0], args.slice(1))), spec.between && (args = spec.between.map((_) => ctx.get(_)), stream2 = stream2.between(args[0], args[1])), spec.filter && (stream2 = stream2.filter(filter3)), spec.throttle != null && (stream2 = stream2.throttle(+spec.throttle)), spec.debounce != null && (stream2 = stream2.debounce(+spec.debounce)), stream2 == null && error62("Invalid stream definition: " + JSON.stringify(spec)), spec.consume && stream2.consume(!0), ctx.stream(spec, stream2);
}
function parseUpdate(spec) {
  var ctx = this, srcid = isObject2(srcid = spec.source) ? srcid.$ref : srcid, source4 = ctx.get(srcid), target3 = null, update3 = spec.update, params2 = void 0;
  source4 || error62("Source not defined: " + spec.source), target3 = spec.target && spec.target.$expr ? ctx.eventExpression(spec.target.$expr) : ctx.get(spec.target), update3 && update3.$expr && (update3.$params && (params2 = ctx.parseParameters(update3.$params)), update3 = ctx.handlerExpression(update3.$expr)), ctx.update(spec, source4, target3, update3, params2);
}
var SKIP3 = {
  skip: !0
};
function getState(options) {
  var ctx = this, state = {};
  if (options.signals) {
    var signals = state.signals = {};
    Object.keys(ctx.signals).forEach((key2) => {
      let op = ctx.signals[key2];
      options.signals(key2, op) && (signals[key2] = op.value);
    });
  }
  if (options.data) {
    var data3 = state.data = {};
    Object.keys(ctx.data).forEach((key2) => {
      let dataset = ctx.data[key2];
      options.data(key2, dataset) && (data3[key2] = dataset.input.value);
    });
  }
  return ctx.subcontext && options.recurse !== !1 && (state.subcontext = ctx.subcontext.map((ctx2) => ctx2.getState(options))), state;
}
function setState(state) {
  var ctx = this, df = ctx.dataflow, data3 = state.data, signals = state.signals;
  Object.keys(signals || {}).forEach((key2) => {
    df.update(ctx.signals[key2], signals[key2], SKIP3);
  }), Object.keys(data3 || {}).forEach((key2) => {
    df.pulse(ctx.data[key2].input, df.changeset().remove(truthy).insert(data3[key2]));
  }), (state.subcontext || []).forEach((substate, i) => {
    let subctx = ctx.subcontext[i];
    subctx && subctx.setState(substate);
  });
}
function context2(df, transforms2, functions, expr2) {
  return new Context(df, transforms2, functions, expr2);
}
function Context(df, transforms2, functions, expr2) {
  this.dataflow = df, this.transforms = transforms2, this.events = df.events.bind(df), this.expr = expr2 || expressionCodegen, this.signals = {}, this.scales = {}, this.nodes = {}, this.data = {}, this.fn = {}, functions && (this.functions = Object.create(functions), this.functions.context = this);
}
function Subcontext(ctx) {
  this.dataflow = ctx.dataflow, this.transforms = ctx.transforms, this.events = ctx.events, this.expr = ctx.expr, this.signals = Object.create(ctx.signals), this.scales = Object.create(ctx.scales), this.nodes = Object.create(ctx.nodes), this.data = Object.create(ctx.data), this.fn = Object.create(ctx.fn), ctx.functions && (this.functions = Object.create(ctx.functions), this.functions.context = this);
}
Context.prototype = Subcontext.prototype = {
  fork() {
    let ctx = new Subcontext(this);
    return (this.subcontext || (this.subcontext = [])).push(ctx), ctx;
  },
  detach(ctx) {
    this.subcontext = this.subcontext.filter((c) => c !== ctx);
    let keys4 = Object.keys(ctx.nodes);
    for (let key2 of keys4) ctx.nodes[key2]._targets = null;
    for (let key2 of keys4) ctx.nodes[key2].detach();
    ctx.nodes = null;
  },
  get(id3) {
    return this.nodes[id3];
  },
  set(id3, node2) {
    return this.nodes[id3] = node2;
  },
  add(spec, op) {
    let ctx = this, df = ctx.dataflow, data3 = spec.value;
    if (ctx.set(spec.id, op), isCollect(spec.type) && data3 && (data3.$ingest ? df.ingest(op, data3.$ingest, data3.$format) : data3.$request ? df.preload(op, data3.$request, data3.$format) : df.pulse(op, df.changeset().insert(data3))), spec.root && (ctx.root = op), spec.parent) {
      let p = ctx.get(spec.parent.$ref);
      p ? (df.connect(p, [op]), op.targets().add(p)) : (ctx.unresolved = ctx.unresolved || []).push(() => {
        p = ctx.get(spec.parent.$ref), df.connect(p, [op]), op.targets().add(p);
      });
    }
    if (spec.signal && (ctx.signals[spec.signal] = op), spec.scale && (ctx.scales[spec.scale] = op), spec.data)
      for (let name2 in spec.data) {
        let data4 = ctx.data[name2] || (ctx.data[name2] = {});
        spec.data[name2].forEach((role) => data4[role] = op);
      }
  },
  resolve() {
    return (this.unresolved || []).forEach((fn) => fn()), delete this.unresolved, this;
  },
  operator(spec, update3) {
    this.add(spec, this.dataflow.add(spec.value, update3));
  },
  transform(spec, type3) {
    this.add(spec, this.dataflow.add(this.transforms[canonicalType(type3)]));
  },
  stream(spec, stream2) {
    this.set(spec.id, stream2);
  },
  update(spec, stream2, target3, update3, params2) {
    this.dataflow.on(stream2, target3, update3, params2, spec.options);
  },
  // expression parsing
  operatorExpression(expr2) {
    return this.expr.operator(this, expr2);
  },
  parameterExpression(expr2) {
    return this.expr.parameter(this, expr2);
  },
  eventExpression(expr2) {
    return this.expr.event(this, expr2);
  },
  handlerExpression(expr2) {
    return this.expr.handler(this, expr2);
  },
  encodeExpression(encode4) {
    return this.expr.encode(this, encode4);
  },
  // parse methods
  parse: parse7,
  parseOperator,
  parseOperatorParameters,
  parseParameters,
  parseStream,
  parseUpdate,
  // state methods
  getState,
  setState
};

// node_modules/vega-view/build/vega-view.js
function initializeAria(view2) {
  let el = view2.container();
  el && (el.setAttribute("role", "graphics-document"), el.setAttribute("aria-roleDescription", "visualization"), ariaLabel(el, view2.description()));
}
function ariaLabel(el, desc) {
  el && (desc == null ? el.removeAttribute("aria-label") : el.setAttribute("aria-label", desc));
}
function background2(view2) {
  view2.add(null, (_) => (view2._background = _.bg, view2._resize = 1, _.bg), {
    bg: view2._signals.background
  });
}
var Default = "default";
function cursor(view2) {
  let cursor3 = view2._signals.cursor || (view2._signals.cursor = view2.add({
    user: Default,
    item: null
  }));
  view2.on(view2.events("view", "pointermove"), cursor3, (_, event2) => {
    let value3 = cursor3.value, user = value3 ? isString(value3) ? value3 : value3.user : Default, item = event2.item && event2.item.cursor || null;
    return value3 && user === value3.user && item == value3.item ? value3 : {
      user,
      item
    };
  }), view2.add(null, function(_) {
    let user = _.cursor, item = this.value;
    return isString(user) || (item = user.item, user = user.user), setCursor(view2, user && user !== Default ? user : item || user), item;
  }, {
    cursor: cursor3
  });
}
function setCursor(view2, cursor3) {
  let el = view2.globalCursor() ? typeof document < "u" && document.body : view2.container();
  if (el)
    return cursor3 == null ? el.style.removeProperty("cursor") : el.style.cursor = cursor3;
}
function dataref(view2, name2) {
  var data3 = view2._runtime.data;
  return hasOwnProperty(data3, name2) || error62("Unrecognized data set: " + name2), data3[name2];
}
function data2(name2, values3) {
  return arguments.length < 2 ? dataref(this, name2).values.value : change.call(this, name2, changeset().remove(truthy).insert(values3));
}
function change(name2, changes) {
  isChangeSet(changes) || error62("Second argument to changes must be a changeset.");
  let dataset = dataref(this, name2);
  return dataset.modified = !0, this.pulse(dataset.input, changes);
}
function insert(name2, _) {
  return change.call(this, name2, changeset().insert(_));
}
function remove(name2, _) {
  return change.call(this, name2, changeset().remove(_));
}
function width(view2) {
  var padding3 = view2.padding();
  return Math.max(0, view2._viewWidth + padding3.left + padding3.right);
}
function height(view2) {
  var padding3 = view2.padding();
  return Math.max(0, view2._viewHeight + padding3.top + padding3.bottom);
}
function offset3(view2) {
  var padding3 = view2.padding(), origin = view2._origin;
  return [padding3.left + origin[0], padding3.top + origin[1]];
}
function resizeRenderer(view2) {
  var origin = offset3(view2), w2 = width(view2), h2 = height(view2);
  view2._renderer.background(view2.background()), view2._renderer.resize(w2, h2, origin), view2._handler.origin(origin), view2._resizeListeners.forEach((handler) => {
    try {
      handler(w2, h2);
    } catch (error64) {
      view2.error(error64);
    }
  });
}
function eventExtend(view2, event2, item) {
  var r = view2._renderer, el = r && r.canvas(), p, e, translate4;
  return el && (translate4 = offset3(view2), e = event2.changedTouches ? event2.changedTouches[0] : event2, p = point6(e, el), p[0] -= translate4[0], p[1] -= translate4[1]), event2.dataflow = view2, event2.item = item, event2.vega = extension(view2, item, p), event2;
}
function extension(view2, item, point8) {
  let itemGroup = item ? item.mark.marktype === "group" ? item : item.mark.group : null;
  function group2(name2) {
    var g = itemGroup, i;
    if (name2) {
      for (i = item; i; i = i.mark.group)
        if (i.mark.name === name2) {
          g = i;
          break;
        }
    }
    return g && g.mark && g.mark.interactive ? g : {};
  }
  function xy(item2) {
    if (!item2) return point8;
    isString(item2) && (item2 = group2(item2));
    let p = point8.slice();
    for (; item2; )
      p[0] -= item2.x || 0, p[1] -= item2.y || 0, item2 = item2.mark && item2.mark.group;
    return p;
  }
  return {
    view: constant_default(view2),
    item: constant_default(item || {}),
    group: group2,
    xy,
    x: (item2) => xy(item2)[0],
    y: (item2) => xy(item2)[1]
  };
}
function observeContainer(view2) {
  view2._resizeObserver && (view2._resizeObserver.disconnect(), view2._resizeObserver = null);
  let el = view2.container(), listeners = view2._containerListeners;
  if (typeof ResizeObserver > "u" || !el || !listeners.length) return;
  let width2 = el.clientWidth, height2 = el.clientHeight;
  view2._resizeObserver = new ResizeObserver(() => {
    !el.clientWidth && !el.clientHeight || el.clientWidth === width2 && el.clientHeight === height2 || (width2 = el.clientWidth, height2 = el.clientHeight, listeners.forEach((handler) => handler({
      type: "resize",
      target: el
    })));
  }), view2._resizeObserver.observe(el);
}
var VIEW = "view", TIMER = "timer", WINDOW = "window", CONTAINER = "container", RESIZE = "resize", NO_TRAP = {
  trap: !1
};
function initializeEventConfig(config2) {
  let events3 = extend2({
    defaults: {}
  }, config2), unpack = (obj, keys4) => {
    keys4.forEach((k) => {
      isArray(obj[k]) && (obj[k] = toSet(obj[k]));
    });
  };
  return unpack(events3.defaults, ["prevent", "allow"]), unpack(events3, ["view", "window", "selector", "container"]), events3;
}
function trackEventListener(view2, sources, type3, handler) {
  view2._eventListeners.push({
    type: type3,
    sources: array_default(sources),
    handler
  });
}
function prevent(view2, type3) {
  var def2 = view2._eventConfig.defaults, prevent2 = def2.prevent, allow = def2.allow;
  return prevent2 === !1 || allow === !0 ? !1 : prevent2 === !0 || allow === !1 ? !0 : prevent2 ? prevent2[type3] : allow ? !allow[type3] : view2.preventDefault();
}
function permit(view2, key2, type3) {
  let rule4 = view2._eventConfig && view2._eventConfig[key2];
  return rule4 === !1 || isObject2(rule4) && !rule4[type3] ? (view2.warn(`Blocked ${key2} ${type3} event listener.`), !1) : !0;
}
function events2(source4, type3, filter3) {
  var view2 = this, s = new EventStream(filter3), send = function(e, item) {
    view2.runAsync(null, () => {
      source4 === VIEW && prevent(view2, type3) && e.preventDefault(), s.receive(eventExtend(view2, e, item));
    });
  }, sources;
  if (source4 === TIMER)
    permit(view2, "timer", type3) && view2.timer(send, type3);
  else if (source4 === VIEW)
    permit(view2, "view", type3) && view2.addEventListener(type3, send, NO_TRAP);
  else if (source4 === CONTAINER)
    type3 !== RESIZE ? view2.warn("Unsupported container event type: " + type3) : permit(view2, "container", type3) && (view2._containerListeners.push(send), view2.container() && observeContainer(view2));
  else if (source4 === WINDOW ? permit(view2, "window", type3) && typeof window < "u" && (sources = [window]) : typeof document < "u" && permit(view2, "selector", type3) && (sources = Array.from(document.querySelectorAll(source4))), !sources)
    view2.warn("Can not resolve event source: " + source4);
  else {
    for (var i = 0, n = sources.length; i < n; ++i)
      sources[i].addEventListener(type3, send);
    trackEventListener(view2, sources, type3, send);
  }
  return s;
}
function itemFilter(event2) {
  return event2.item;
}
function markTarget(event2) {
  return event2.item.mark.source;
}
function invoke(name2) {
  return function(_, event2) {
    return event2.vega.view().changeset().encode(event2.item, name2);
  };
}
function hover(hoverSet, leaveSet) {
  return hoverSet = [hoverSet || "hover"], leaveSet = [leaveSet || "update", hoverSet[0]], this.on(this.events("view", "pointerover", itemFilter), markTarget, invoke(hoverSet)), this.on(this.events("view", "pointerout", itemFilter), markTarget, invoke(leaveSet)), this;
}
function finalize2() {
  var tooltip2 = this._tooltip, timers = this._timers, handlers2 = this._handler.handlers(), listeners = this._eventListeners, n, m, e, h2, t;
  for (n = timers.length; --n >= 0; )
    timers[n].stop();
  for (this._resizeObserver && (this._resizeObserver.disconnect(), this._resizeObserver = null), n = listeners.length; --n >= 0; )
    for (e = listeners[n], m = e.sources.length; --m >= 0; )
      e.sources[m].removeEventListener(e.type, e.handler);
  for (tooltip2 && tooltip2.call(this, this._handler, null, null, null), n = handlers2.length; --n >= 0; )
    t = handlers2[n].type, h2 = handlers2[n].handler, this._handler.off(t, h2);
  return this;
}
function element2(tag, attr2, text4) {
  let el = document.createElement(tag);
  for (let key2 in attr2) el.setAttribute(key2, attr2[key2]);
  return text4 != null && (el.textContent = text4), el;
}
var BindClass = "vega-bind", NameClass = "vega-bind-name", RadioClass = "vega-bind-radio", EventHandlerAttr = /^on/i;
function bind2(view2, el, binding) {
  if (!el) return;
  let param2 = binding.param, bind3 = binding.state;
  return bind3 || (bind3 = binding.state = {
    elements: null,
    active: !1,
    set: null,
    update: (value3) => {
      value3 != view2.signal(param2.signal) && view2.runAsync(null, () => {
        bind3.source = !0, view2.signal(param2.signal, value3);
      });
    }
  }, param2.debounce && (bind3.update = debounce(param2.debounce, bind3.update))), (param2.input == null && param2.element ? target : generate)(bind3, el, param2, view2), bind3.active || (view2.on(view2._signals[param2.signal], null, () => {
    bind3.source ? bind3.source = !1 : bind3.set(view2.signal(param2.signal));
  }), bind3.active = !0), bind3;
}
function target(bind3, node2, param2, view2) {
  let type3 = param2.event || "input", handler = () => bind3.update(node2.value);
  view2.signal(param2.signal, node2.value), node2.addEventListener(type3, handler), trackEventListener(view2, node2, type3, handler), bind3.set = (value3) => {
    node2.value = value3, node2.dispatchEvent(event(type3));
  };
}
function event(type3) {
  return typeof Event < "u" ? new Event(type3) : {
    type: type3
  };
}
function generate(bind3, el, param2, view2) {
  let value3 = view2.signal(param2.signal), div = element2("div", {
    class: BindClass
  }), wrapper = param2.input === "radio" ? div : div.appendChild(element2("label"));
  wrapper.appendChild(element2("span", {
    class: NameClass
  }, param2.name || param2.signal)), el.appendChild(div);
  let input2 = form;
  switch (param2.input) {
    case "checkbox":
      input2 = checkbox;
      break;
    case "select":
      input2 = select;
      break;
    case "radio":
      input2 = radio;
      break;
    case "range":
      input2 = range5;
      break;
  }
  input2 === form ? input2(bind3, wrapper, param2, value3, view2) : input2(bind3, wrapper, param2, value3);
}
function form(bind3, el, param2, value3, view2) {
  let node2 = element2("input");
  for (let key2 in param2)
    EventHandlerAttr.test(key2) ? view2.warn(`Ignoring unsupported signal binding property "${key2}" for signal "${param2.signal}".`) : key2 !== "signal" && key2 !== "element" && node2.setAttribute(key2 === "input" ? "type" : key2, param2[key2]);
  node2.setAttribute("name", param2.signal), node2.value = value3, el.appendChild(node2), node2.addEventListener("input", () => bind3.update(node2.value)), bind3.elements = [node2], bind3.set = (value4) => node2.value = value4;
}
function checkbox(bind3, el, param2, value3) {
  let attr2 = {
    type: "checkbox",
    name: param2.signal
  };
  value3 && (attr2.checked = !0);
  let node2 = element2("input", attr2);
  el.appendChild(node2), node2.addEventListener("change", () => bind3.update(node2.checked)), bind3.elements = [node2], bind3.set = (value4) => node2.checked = !!value4 || null;
}
function select(bind3, el, param2, value3) {
  let node2 = element2("select", {
    name: param2.signal
  }), labels2 = param2.labels || [];
  param2.options.forEach((option, i) => {
    let attr2 = {
      value: option
    };
    valuesEqual(option, value3) && (attr2.selected = !0), node2.appendChild(element2("option", attr2, (labels2[i] || option) + ""));
  }), el.appendChild(node2), node2.addEventListener("change", () => {
    bind3.update(param2.options[node2.selectedIndex]);
  }), bind3.elements = [node2], bind3.set = (value4) => {
    for (let i = 0, n = param2.options.length; i < n; ++i)
      if (valuesEqual(param2.options[i], value4)) {
        node2.selectedIndex = i;
        return;
      }
  };
}
function radio(bind3, el, param2, value3) {
  let group2 = element2("span", {
    class: RadioClass
  }), labels2 = param2.labels || [];
  el.appendChild(group2), bind3.elements = param2.options.map((option, i) => {
    let attr2 = {
      type: "radio",
      name: param2.signal,
      value: option
    };
    valuesEqual(option, value3) && (attr2.checked = !0);
    let input2 = element2("input", attr2);
    input2.addEventListener("change", () => bind3.update(option));
    let label = element2("label", {}, (labels2[i] || option) + "");
    return label.prepend(input2), group2.appendChild(label), input2;
  }), bind3.set = (value4) => {
    let nodes = bind3.elements, n = nodes.length;
    for (let i = 0; i < n; ++i)
      valuesEqual(nodes[i].value, value4) && (nodes[i].checked = !0);
  };
}
function range5(bind3, el, param2, value3) {
  value3 = value3 !== void 0 ? value3 : (+param2.max + +param2.min) / 2;
  let max4 = param2.max != null ? param2.max : Math.max(100, +value3) || 100, min4 = param2.min || Math.min(0, max4, +value3) || 0, step = param2.step || tickStep(min4, max4, 100), node2 = element2("input", {
    type: "range",
    name: param2.signal,
    min: min4,
    max: max4,
    step
  });
  node2.value = value3;
  let span = element2("span", {}, +value3);
  el.appendChild(node2), el.appendChild(span);
  let update3 = () => {
    span.textContent = node2.value, bind3.update(+node2.value);
  };
  node2.addEventListener("input", update3), node2.addEventListener("change", update3), bind3.elements = [node2], bind3.set = (value4) => {
    node2.value = value4, span.textContent = value4;
  };
}
function valuesEqual(a, b10) {
  return a === b10 || a + "" == b10 + "";
}
function initializeRenderer(view2, r, el, constructor, scaleFactor, opt) {
  return r = r || new constructor(view2.loader()), r.initialize(el, width(view2), height(view2), offset3(view2), scaleFactor, opt).background(view2.background());
}
function trap(view2, fn) {
  return fn ? function() {
    try {
      fn.apply(this, arguments);
    } catch (error64) {
      view2.error(error64);
    }
  } : null;
}
function initializeHandler(view2, prevHandler, el, constructor) {
  let handler = new constructor(view2.loader(), trap(view2, view2.tooltip())).scene(view2.scenegraph().root).initialize(el, offset3(view2), view2);
  return prevHandler && prevHandler.handlers().forEach((h2) => {
    handler.on(h2.type, h2.handler);
  }), handler;
}
function initialize2(el, elBind) {
  let view2 = this, type3 = view2._renderType, config2 = view2._eventConfig.bind, module = renderModule(type3);
  el = view2._el = el ? lookup4(view2, el, !0) : null, initializeAria(view2), module || view2.error("Unrecognized renderer type: " + type3);
  let Handler2 = module.handler || CanvasHandler, Renderer2 = el ? module.renderer : module.headless;
  return view2._renderer = Renderer2 ? initializeRenderer(view2, view2._renderer, el, Renderer2) : null, view2._handler = initializeHandler(view2, view2._handler, el, Handler2), view2._redraw = !0, el && config2 !== "none" && (elBind = elBind ? view2._elBind = lookup4(view2, elBind, !0) : el.appendChild(element2("form", {
    class: "vega-bindings"
  })), view2._bind.forEach((_) => {
    _.param.element && config2 !== "container" && (_.element = lookup4(view2, _.param.element, !!_.param.input));
  }), view2._bind.forEach((_) => {
    bind2(view2, _.element || elBind, _);
  })), observeContainer(view2), view2;
}
function lookup4(view2, el, clear2) {
  if (typeof el == "string")
    if (typeof document < "u") {
      if (el = document.querySelector(el), !el)
        return view2.error("Signal bind element not found: " + el), null;
    } else
      return view2.error("DOM document instance not found."), null;
  if (el && clear2)
    try {
      el.textContent = "";
    } catch (e) {
      el = null, view2.error(e);
    }
  return el;
}
var number9 = (_) => +_ || 0, paddingObject = (_) => ({
  top: _,
  bottom: _,
  left: _,
  right: _
});
function padding(_) {
  return isObject2(_) ? {
    top: number9(_.top),
    bottom: number9(_.bottom),
    left: number9(_.left),
    right: number9(_.right)
  } : paddingObject(number9(_));
}
async function renderHeadless(view2, type3, scaleFactor, opt) {
  let module = renderModule(type3), ctr = module && module.headless;
  return ctr || error62("Unrecognized renderer type: " + type3), await view2.runAsync(), initializeRenderer(view2, null, null, ctr, scaleFactor, opt).renderAsync(view2._scenegraph.root);
}
async function renderToImageURL(type3, scaleFactor) {
  type3 !== RenderType.Canvas && type3 !== RenderType.SVG && type3 !== RenderType.PNG && error62("Unrecognized image type: " + type3);
  let r = await renderHeadless(this, type3, scaleFactor);
  return type3 === RenderType.SVG ? toBlobURL(r.svg(), "image/svg+xml") : r.canvas().toDataURL("image/png");
}
function toBlobURL(data3, mime) {
  let blob = new Blob([data3], {
    type: mime
  });
  return window.URL.createObjectURL(blob);
}
async function renderToCanvas(scaleFactor, opt) {
  return (await renderHeadless(this, RenderType.Canvas, scaleFactor, opt)).canvas();
}
async function renderToSVG(scaleFactor) {
  return (await renderHeadless(this, RenderType.SVG, scaleFactor)).svg();
}
function runtime(view2, spec, expr2) {
  return context2(view2, transforms, functionContext, expr2).parse(spec);
}
function scale5(name2) {
  var scales2 = this._runtime.scales;
  return hasOwnProperty(scales2, name2) || error62("Unrecognized scale or projection: " + name2), scales2[name2].value;
}
var Width = "width", Height = "height", Padding2 = "padding", Skip2 = {
  skip: !0
};
function viewWidth(view2, width2) {
  var a = view2.autosize(), p = view2.padding();
  return width2 - (a && a.contains === Padding2 ? p.left + p.right : 0);
}
function viewHeight(view2, height2) {
  var a = view2.autosize(), p = view2.padding();
  return height2 - (a && a.contains === Padding2 ? p.top + p.bottom : 0);
}
function initializeResize(view2) {
  var s = view2._signals, w2 = s[Width], h2 = s[Height], p = s[Padding2];
  function resetSize() {
    view2._autosize = view2._resize = 1;
  }
  view2._resizeWidth = view2.add(null, (_) => {
    view2._width = _.size, view2._viewWidth = viewWidth(view2, _.size), resetSize();
  }, {
    size: w2
  }), view2._resizeHeight = view2.add(null, (_) => {
    view2._height = _.size, view2._viewHeight = viewHeight(view2, _.size), resetSize();
  }, {
    size: h2
  });
  let resizePadding = view2.add(null, resetSize, {
    pad: p
  });
  view2._resizeWidth.rank = w2.rank + 1, view2._resizeHeight.rank = h2.rank + 1, resizePadding.rank = p.rank + 1;
}
function resizeView(viewWidth2, viewHeight2, width2, height2, origin, auto) {
  this.runAfter((view2) => {
    let rerun2 = 0;
    view2._autosize = 0, view2.width() !== width2 && (rerun2 = 1, view2.signal(Width, width2, Skip2), view2._resizeWidth.skip(!0)), view2.height() !== height2 && (rerun2 = 1, view2.signal(Height, height2, Skip2), view2._resizeHeight.skip(!0)), view2._viewWidth !== viewWidth2 && (view2._resize = 1, view2._viewWidth = viewWidth2), view2._viewHeight !== viewHeight2 && (view2._resize = 1, view2._viewHeight = viewHeight2), (view2._origin[0] !== origin[0] || view2._origin[1] !== origin[1]) && (view2._resize = 1, view2._origin = origin), rerun2 && view2.run("enter"), auto && view2.runAfter((v2) => v2.resize());
  }, !1, 1);
}
function getState2(options) {
  return this._runtime.getState(options || {
    data: dataTest,
    signals: signalTest,
    recurse: !0
  });
}
function dataTest(name2, data3) {
  return data3.modified && isArray(data3.input.value) && !name2.startsWith("_:vega:_");
}
function signalTest(name2, op) {
  return !(name2 === "parent" || op instanceof transforms.proxy);
}
function setState2(state) {
  return this.runAsync(null, (v2) => {
    v2._trigger = !1, v2._runtime.setState(state);
  }, (v2) => {
    v2._trigger = !0;
  }), this;
}
function timer2(callback, delay2) {
  function tick2(elapsed) {
    callback({
      timestamp: Date.now(),
      elapsed
    });
  }
  this._timers.push(interval_default(tick2, delay2));
}
function defaultTooltip2(handler, event2, item, value3) {
  let el = handler.element();
  el && el.setAttribute("title", formatTooltip(value3));
}
function formatTooltip(value3) {
  return value3 == null ? "" : isArray(value3) ? formatArray(value3) : isObject2(value3) && !isDate(value3) ? formatObject(value3) : value3 + "";
}
function formatObject(obj) {
  return Object.keys(obj).map((key2) => {
    let v2 = obj[key2];
    return key2 + ": " + (isArray(v2) ? formatArray(v2) : formatValue2(v2));
  }).join(`
`);
}
function formatArray(value3) {
  return "[" + value3.map(formatValue2).join(", ") + "]";
}
function formatValue2(value3) {
  return isArray(value3) ? "[\u2026]" : isObject2(value3) && !isDate(value3) ? "{\u2026}" : value3;
}
function watchPixelRatio() {
  if (this.renderer() === "canvas" && this._renderer._canvas) {
    let remove2 = null, updatePixelRatio = () => {
      remove2?.();
      let media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      media.addEventListener("change", updatePixelRatio), remove2 = () => {
        media.removeEventListener("change", updatePixelRatio);
      }, this._renderer._canvas.getContext("2d").pixelRatio = window.devicePixelRatio || 1, this._redraw = !0, this._resize = 1, this.resize().runAsync();
    };
    updatePixelRatio();
  }
}
// End of bundle text, part 11 of 15
export { Nest, Pack, Partition, Stratify, Tree, TreeLinks, Treemap, ariaLabel, background2, change, cursor, data2,
  dataref, defaultTooltip2, events2, finalize2, getState2, hover, initialize2, initializeEventConfig,
  initializeResize, insert, padding, parser2, remove, renderToCanvas, renderToImageURL, renderToSVG, resizeRenderer,
  resizeView, runtime, scale5, setCursor, setState2, timer2, trap, vega_crossfilter_exports, vega_label_exports,
  vega_regression_exports, vega_voronoi_exports, vega_wordcloud_exports, viewHeight, viewWidth, watchPixelRatio };
