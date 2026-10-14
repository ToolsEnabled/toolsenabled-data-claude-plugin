// ToolsEnabled Data server, part 1 of 15: ajv, the JSON Schema validator (lines 1-4784 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
// Bundle text, part 1 of 15
import {createRequire as __tedataCreateRequire} from 'node:module';const require=__tedataCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target3, all) => {
  for (var name2 in all)
    __defProp(target3, name2, { get: all[name2], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key2 of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key2) && key2 !== except && __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target3) => (target3 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target3, "default", { value: mod, enumerable: !0 }) : target3,
  mod
));

// node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        if (super(), !exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super(), this._items = typeof code == "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        let item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a3;
        return (_a3 = this._str) !== null && _a3 !== void 0 ? _a3 : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a3;
        return (_a3 = this._names) !== null && _a3 !== void 0 ? _a3 : this._names = this._items.reduce((names, c) => (c instanceof Name && (names[c.str] = (names[c.str] || 0) + 1), names), {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      let code = [strs[0]], i = 0;
      for (; i < args.length; )
        addCodeArg(code, args[i]), code.push(strs[++i]);
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      let expr2 = [safeStringify(strs[0])], i = 0;
      for (; i < args.length; )
        expr2.push(plus), addCodeArg(expr2, args[i]), expr2.push(plus, safeStringify(strs[++i]));
      return optimize(expr2), new _Code(expr2);
    }
    exports.str = str;
    function addCodeArg(code, arg) {
      arg instanceof _Code ? code.push(...arg._items) : arg instanceof Name ? code.push(arg) : code.push(interpolate3(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr2) {
      let i = 1;
      for (; i < expr2.length - 1; ) {
        if (expr2[i] === plus) {
          let res = mergeExprItems(expr2[i - 1], expr2[i + 1]);
          if (res !== void 0) {
            expr2.splice(i - 1, 3, res);
            continue;
          }
          expr2[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b10) {
      if (b10 === '""')
        return a;
      if (a === '""')
        return b10;
      if (typeof a == "string")
        return b10 instanceof Name || a[a.length - 1] !== '"' ? void 0 : typeof b10 != "string" ? `${a.slice(0, -1)}${b10}"` : b10[0] === '"' ? a.slice(0, -1) + b10.slice(1) : void 0;
      if (typeof b10 == "string" && b10[0] === '"' && !(a instanceof Name))
        return `"${a}${b10.slice(1)}`;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate3(x5) {
      return typeof x5 == "number" || typeof x5 == "boolean" || x5 === null ? x5 : safeStringify(Array.isArray(x5) ? x5.join(",") : x5);
    }
    function stringify2(x5) {
      return new _Code(safeStringify(x5));
    }
    exports.stringify = stringify2;
    function safeStringify(x5) {
      return JSON.stringify(x5).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key2) {
      return typeof key2 == "string" && exports.IDENTIFIER.test(key2) ? new _Code(`.${key2}`) : _`[${key2}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key2) {
      if (typeof key2 == "string" && exports.IDENTIFIER.test(key2))
        return new _Code(`${key2}`);
      throw new Error(`CodeGen: invalid export name: ${key2}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});

// node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code(), ValueError = class extends Error {
      constructor(name2) {
        super(`CodeGen: "code" for ${name2} not defined`), this.value = name2.value;
      }
    }, UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2.Started = 0] = "Started", UsedValueState2[UsedValueState2.Completed = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope2 = class {
      constructor({ prefixes: prefixes2, parent } = {}) {
        this._names = {}, this._prefixes = prefixes2, this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        let ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a3, _b;
        if (!((_b = (_a3 = this._parent) === null || _a3 === void 0 ? void 0 : _a3._prefixes) === null || _b === void 0) && _b.has(prefix) || this._prefixes && !this._prefixes.has(prefix))
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports.Scope = Scope2;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr), this.prefix = prefix;
      }
      setValue(value3, { property: property2, itemIndex }) {
        this.value = value3, this.scopePath = (0, code_1._)`.${new code_1.Name(property2)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line4 = (0, code_1._)`\n`, ValueScope = class extends Scope2 {
      constructor(opts) {
        super(opts), this._values = {}, this._scope = opts.scope, this.opts = { ...opts, _n: opts.lines ? line4 : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value3) {
        var _a3;
        if (value3.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        let name2 = this.toName(nameOrPrefix), { prefix } = name2, valueKey = (_a3 = value3.key) !== null && _a3 !== void 0 ? _a3 : value3.ref, vs = this._values[prefix];
        if (vs) {
          let _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        vs.set(valueKey, name2);
        let s = this._scope[prefix] || (this._scope[prefix] = []), itemIndex = s.length;
        return s[itemIndex] = value3.ref, name2.setValue(value3, { property: prefix, itemIndex }), name2;
      }
      getValue(prefix, keyOrRef) {
        let vs = this._values[prefix];
        if (vs)
          return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values3 = this._values) {
        return this._reduceValues(values3, (name2) => {
          if (name2.scopePath === void 0)
            throw new Error(`CodeGen: name "${name2}" has no value`);
          return (0, code_1._)`${scopeName}${name2.scopePath}`;
        });
      }
      scopeCode(values3 = this._values, usedValues, getCode) {
        return this._reduceValues(values3, (name2) => {
          if (name2.value === void 0)
            throw new Error(`CodeGen: name "${name2}" has no value`);
          return name2.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values3, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (let prefix in values3) {
          let vs = values3[prefix];
          if (!vs)
            continue;
          let nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name2) => {
            if (nameSet.has(name2))
              return;
            nameSet.set(name2, UsedValueState.Started);
            let c = valueCode(name2);
            if (c) {
              let def2 = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def2} ${name2} = ${c};${this.opts._n}`;
            } else if (c = getCode?.(name2))
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            else
              throw new ValueError(name2);
            nameSet.set(name2, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});

// node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code(), scope_1 = require_scope(), code_2 = require_code();
    Object.defineProperty(exports, "_", { enumerable: !0, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: !0, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: !0, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: !0, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: !0, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: !0, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: !0, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: !0, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", { enumerable: !0, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: !0, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: !0, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: !0, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node3 = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    }, Def = class extends Node3 {
      constructor(varKind, name2, rhs) {
        super(), this.varKind = varKind, this.name = name2, this.rhs = rhs;
      }
      render({ es5, _n }) {
        let varKind = es5 ? scope_1.varKinds.var : this.varKind, rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants3) {
        if (names[this.name.str])
          return this.rhs && (this.rhs = optimizeExpr(this.rhs, names, constants3)), this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    }, Assign = class extends Node3 {
      constructor(lhs, rhs, sideEffects) {
        super(), this.lhs = lhs, this.rhs = rhs, this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants3) {
        if (!(this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects))
          return this.rhs = optimizeExpr(this.rhs, names, constants3), this;
      }
      get names() {
        let names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    }, AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects), this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    }, Label3 = class extends Node3 {
      constructor(label) {
        super(), this.label = label, this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    }, Break = class extends Node3 {
      constructor(label) {
        super(), this.label = label, this.names = {};
      }
      render({ _n }) {
        return `break${this.label ? ` ${this.label}` : ""};` + _n;
      }
    }, Throw = class extends Node3 {
      constructor(error64) {
        super(), this.error = error64;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    }, AnyCode = class extends Node3 {
      constructor(code) {
        super(), this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants3) {
        return this.code = optimizeExpr(this.code, names, constants3), this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    }, ParentNode = class extends Node3 {
      constructor(nodes = []) {
        super(), this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        let { nodes } = this, i = nodes.length;
        for (; i--; ) {
          let n = nodes[i].optimizeNodes();
          Array.isArray(n) ? nodes.splice(i, 1, ...n) : n ? nodes[i] = n : nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants3) {
        let { nodes } = this, i = nodes.length;
        for (; i--; ) {
          let n = nodes[i];
          n.optimizeNames(names, constants3) || (subtractNames(names, n.names), nodes.splice(i, 1));
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    }, BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    }, Root = class extends ParentNode {
    }, Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes), this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        return this.else && (code += "else " + this.else.render(opts)), code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        let cond = this.condition;
        if (cond === !0)
          return this.nodes;
        let e = this.else;
        if (e) {
          let ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e)
          return cond === !1 ? e instanceof _If ? e : e.nodes : this.nodes.length ? this : new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        if (!(cond === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(names, constants3) {
        var _a3;
        if (this.else = (_a3 = this.else) === null || _a3 === void 0 ? void 0 : _a3.optimizeNames(names, constants3), !!(super.optimizeNames(names, constants3) || this.else))
          return this.condition = optimizeExpr(this.condition, names, constants3), this;
      }
      get names() {
        let names = super.names;
        return addExprNames(names, this.condition), this.else && addNames(names, this.else.names), names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super(), this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants3) {
        if (super.optimizeNames(names, constants3))
          return this.iteration = optimizeExpr(this.iteration, names, constants3), this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    }, ForRange = class extends For {
      constructor(varKind, name2, from, to) {
        super(), this.varKind = varKind, this.name = name2, this.from = from, this.to = to;
      }
      render(opts) {
        let varKind = opts.es5 ? scope_1.varKinds.var : this.varKind, { name: name2, from, to } = this;
        return `for(${varKind} ${name2}=${from}; ${name2}<${to}; ${name2}++)` + super.render(opts);
      }
      get names() {
        let names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    }, ForIter = class extends For {
      constructor(loop, varKind, name2, iterable) {
        super(), this.loop = loop, this.varKind = varKind, this.name = name2, this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants3) {
        if (super.optimizeNames(names, constants3))
          return this.iterable = optimizeExpr(this.iterable, names, constants3), this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    }, Func = class extends BlockNode {
      constructor(name2, args, async) {
        super(), this.name = name2, this.args = args, this.async = async;
      }
      render(opts) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        return this.catch && (code += this.catch.render(opts)), this.finally && (code += this.finally.render(opts)), code;
      }
      optimizeNodes() {
        var _a3, _b;
        return super.optimizeNodes(), (_a3 = this.catch) === null || _a3 === void 0 || _a3.optimizeNodes(), (_b = this.finally) === null || _b === void 0 || _b.optimizeNodes(), this;
      }
      optimizeNames(names, constants3) {
        var _a3, _b;
        return super.optimizeNames(names, constants3), (_a3 = this.catch) === null || _a3 === void 0 || _a3.optimizeNames(names, constants3), (_b = this.finally) === null || _b === void 0 || _b.optimizeNames(names, constants3), this;
      }
      get names() {
        let names = super.names;
        return this.catch && addNames(names, this.catch.names), this.finally && addNames(names, this.finally.names), names;
      }
    }, Catch = class extends BlockNode {
      constructor(error64) {
        super(), this.error = error64;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...opts, _n: opts.lines ? `
` : "" }, this._extScope = extScope, this._scope = new scope_1.Scope({ parent: extScope }), this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value3) {
        let name2 = this._extScope.value(prefixOrName, value3);
        return (this._values[name2.prefix] || (this._values[name2.prefix] = /* @__PURE__ */ new Set())).add(name2), name2;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant2) {
        let name2 = this._scope.toName(nameOrPrefix);
        return rhs !== void 0 && constant2 && (this._constants[name2.str] = rhs), this._leafNode(new Def(varKind, name2, rhs)), name2;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        return typeof c == "function" ? c() : c !== code_1.nil && this._leafNode(new AnyCode(c)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        let code = ["{"];
        for (let [key2, value3] of keyValues)
          code.length > 1 && code.push(","), code.push(key2), (key2 !== value3 || this.opts.es5) && (code.push(":"), (0, code_1.addCodeArg)(code, value3));
        return code.push("}"), new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        if (this._blockNode(new If(condition)), thenBody && elseBody)
          this.code(thenBody).else().code(elseBody).endIf();
        else if (thenBody)
          this.code(thenBody).endIf();
        else if (elseBody)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node2, forBody) {
        return this._blockNode(node2), forBody && this.code(forBody).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        let name2 = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name2, from, to), () => forBody(name2));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        let name2 = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          let arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name2, (0, code_1._)`${arr}[${i}]`), forBody(name2);
          });
        }
        return this._for(new ForIter("of", varKind, name2, iterable), () => forBody(name2));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        let name2 = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name2, obj), () => forBody(name2));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label3(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value3) {
        let node2 = new Return();
        if (this._blockNode(node2), this.code(value3), node2.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        let node2 = new Try();
        if (this._blockNode(node2), this.code(tryBody), catchCode) {
          let error64 = this.name("e");
          this._currNode = node2.catch = new Catch(error64), catchCode(error64);
        }
        return finallyCode && (this._currNode = node2.finally = new Finally(), this.code(finallyCode)), this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error64) {
        return this._leafNode(new Throw(error64));
      }
      // start self-balancing block
      block(body, nodeCount) {
        return this._blockStarts.push(this._nodes.length), body && this.code(body).endBlock(nodeCount), this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        let len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        let toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount)
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        return this._nodes.length = len, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name2, args = code_1.nil, async, funcBody) {
        return this._blockNode(new Func(name2, args, async)), funcBody && this.code(funcBody).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        for (; n-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(node2) {
        return this._currNode.nodes.push(node2), this;
      }
      _blockNode(node2) {
        this._currNode.nodes.push(node2), this._nodes.push(node2);
      }
      _endBlockNode(N1, N2) {
        let n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node2) {
        let n = this._currNode;
        if (!(n instanceof If))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = n.else = node2, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        let ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node2) {
        let ns = this._nodes;
        ns[ns.length - 1] = node2;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (let n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr2, names, constants3) {
      if (expr2 instanceof code_1.Name)
        return replaceName(expr2);
      if (!canOptimize(expr2))
        return expr2;
      return new code_1._Code(expr2._items.reduce((items, c) => (c instanceof code_1.Name && (c = replaceName(c)), c instanceof code_1._Code ? items.push(...c._items) : items.push(c), items), []));
      function replaceName(n) {
        let c = constants3[n.str];
        return c === void 0 || names[n.str] !== 1 ? n : (delete names[n.str], c);
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants3[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (let n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x5) {
      return typeof x5 == "boolean" || typeof x5 == "number" || x5 === null ? !x5 : (0, code_1._)`!${par(x5)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or2(...args) {
      return args.reduce(orCode);
    }
    exports.or = or2;
    function mappend(op) {
      return (x5, y5) => x5 === code_1.nil ? y5 : y5 === code_1.nil ? x5 : (0, code_1._)`${par(x5)} ${op} ${par(y5)}`;
    }
    function par(x5) {
      return x5 instanceof code_1.Name ? x5 : (0, code_1._)`(${x5})`;
    }
  }
});

// node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen(), code_1 = require_code();
    function toHash(arr) {
      let hash6 = {};
      for (let item of arr)
        hash6[item] = !0;
      return hash6;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      return typeof schema == "boolean" ? schema : Object.keys(schema).length === 0 ? !0 : (checkUnknownRules(it, schema), !schemaHasRules(schema, it.self.RULES.all));
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      let { opts, self: self2 } = it;
      if (!opts.strictSchema || typeof schema == "boolean")
        return;
      let rules = self2.RULES.keywords;
      for (let key2 in schema)
        rules[key2] || checkStrictMode(it, `unknown keyword: "${key2}"`);
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (let key2 in schema)
        if (rules[key2])
          return !0;
      return !1;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (let key2 in schema)
        if (key2 !== "$ref" && RULES.all[key2])
          return !0;
      return !1;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      return typeof str == "number" ? `${str}` : str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs))
        for (let x5 of xs)
          f(x5);
      else
        f(xs);
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues: mergeValues3, resultToName }) {
      return (gen, from, to, toName) => {
        let res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues3(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, !0), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          from === !0 ? gen.assign(to, !0) : (gen.assign(to, (0, codegen_1._)`${to} || {}`), setEvaluated(gen, to, from));
        }),
        mergeValues: (from, to) => from === !0 ? !0 : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === !0 ? !0 : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === !0 ? !0 : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === !0)
        return gen.var("props", !0);
      let props = gen.var("props", (0, codegen_1._)`{}`);
      return ps !== void 0 && setEvaluated(gen, props, ps), props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, !0));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type2;
    (function(Type3) {
      Type3[Type3.Num = 0] = "Num", Type3[Type3.Str = 1] = "Str";
    })(Type2 || (exports.Type = Type2 = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        let isNumber3 = dataPropType === Type2.Num;
        return jsPropertySyntax ? isNumber3 ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber3 ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (mode) {
        if (msg = `strict mode: ${msg}`, mode === !0)
          throw new Error(msg);
        it.self.logger.warn(msg);
      }
    }
    exports.checkStrictMode = checkStrictMode;
  }
});

// node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // data passed to validation function
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      // validation/data context - should not be used directly, it is destructured to the names below
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      // root data - same as the data passed to the first/top validation function
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // used to support recursiveRef and dynamicRef
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      // null or array of validation errors
      errors: new codegen_1.Name("errors"),
      // counter of validation errors
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});

// node_modules/ajv/dist/compile/errors.js
var require_errors = __commonJS({
  "node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen(), util_1 = require_util(), names_1 = require_names();
    exports.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error64 = exports.keywordError, errorPaths, overrideAllErrors) {
      let { it } = cxt, { gen, compositeRule, allErrors } = it, errObj = errorObjectCode(cxt, error64, errorPaths);
      overrideAllErrors ?? (compositeRule || allErrors) ? addError(gen, errObj) : returnErrors(it, (0, codegen_1._)`[${errObj}]`);
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error64 = exports.keywordError, errorPaths) {
      let { it } = cxt, { gen, compositeRule, allErrors } = it, errObj = errorObjectCode(cxt, error64, errorPaths);
      addError(gen, errObj), compositeRule || allErrors || returnErrors(it, names_1.default.vErrors);
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount), gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data: data3, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      let err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`), gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath))), gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`), it.opts.verbose && (gen.assign((0, codegen_1._)`${err}.schema`, schemaValue), gen.assign((0, codegen_1._)`${err}.data`, data3));
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      let err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`), gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      let { gen, validateName, schemaEnv } = it;
      schemaEnv.$async ? gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`) : (gen.assign((0, codegen_1._)`${validateName}.errors`, errs), gen.return(!1));
    }
    var E2 = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error64, errorPaths) {
      let { createErrors } = cxt.it;
      return createErrors === !1 ? (0, codegen_1._)`{}` : errorObject(cxt, error64, errorPaths);
    }
    function errorObject(cxt, error64, errorPaths = {}) {
      let { gen, it } = cxt, keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      return extraErrorProps(cxt, error64, keyValues), gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      let instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      return schemaPath && (schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`), [E2.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params: params2, message }, keyValues) {
      let { keyword, data: data3, schemaValue, it } = cxt, { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E2.keyword, keyword], [E2.params, typeof params2 == "function" ? params2(cxt) : params2 || (0, codegen_1._)`{}`]), opts.messages && keyValues.push([E2.message, typeof message == "function" ? message(cxt) : message]), opts.verbose && keyValues.push([E2.schema, schemaValue], [E2.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data3]), propertyName && keyValues.push([E2.propertyName, propertyName]);
    }
  }
});

// node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors(), codegen_1 = require_codegen(), names_1 = require_names(), boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      let { gen, schema, validateName } = it;
      schema === !1 ? falseSchemaError(it, !1) : typeof schema == "object" && schema.$async === !0 ? gen.return(names_1.default.data) : (gen.assign((0, codegen_1._)`${validateName}.errors`, null), gen.return(!0));
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      let { gen, schema } = it;
      schema === !1 ? (gen.var(valid, !1), falseSchemaError(it)) : gen.var(valid, !0);
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      let { gen, data: data3 } = it, cxt = {
        gen,
        keyword: "false schema",
        data: data3,
        schema: !1,
        schemaCode: !1,
        schemaValue: !1,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});

// node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"], jsonTypes = new Set(_jsonTypes);
    function isJSONType(x5) {
      return typeof x5 == "string" && jsonTypes.has(x5);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      let groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: !0, boolean: !0, null: !0 },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});

// node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self: self2 }, type3) {
      let group2 = self2.RULES.types[type3];
      return group2 && group2 !== !0 && shouldUseGroup(schema, group2);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group2) {
      return group2.rules.some((rule4) => shouldUseRule(schema, rule4));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule4) {
      var _a3;
      return schema[rule4.keyword] !== void 0 || ((_a3 = rule4.definition.implements) === null || _a3 === void 0 ? void 0 : _a3.some((kwd) => schema[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});

// node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules(), applicability_1 = require_applicability(), errors_1 = require_errors(), codegen_1 = require_codegen(), util_1 = require_util(), DataType;
    (function(DataType2) {
      DataType2[DataType2.Correct = 0] = "Correct", DataType2[DataType2.Wrong = 1] = "Wrong";
    })(DataType || (exports.DataType = DataType = {}));
    function getSchemaTypes(schema) {
      let types = getJSONTypes(schema.type);
      if (types.includes("null")) {
        if (schema.nullable === !1)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0)
          throw new Error('"nullable" cannot be used without "type"');
        schema.nullable === !0 && types.push("null");
      }
      return types;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts2) {
      let types = Array.isArray(ts2) ? ts2 : ts2 ? [ts2] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      let { gen, data: data3, opts } = it, coerceTo = coerceToTypes(types, opts.coerceTypes), checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        let wrongType = checkDataTypes(types, data3, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          coerceTo.length ? coerceData(it, types, coerceTo) : reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      let { gen, data: data3, opts } = it, dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data3}`), coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      opts.coerceTypes === "array" && gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data3}) && ${data3}.length == 1`, () => gen.assign(data3, (0, codegen_1._)`${data3}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data3}`).if(checkDataTypes(types, data3, opts.strictNumbers), () => gen.assign(coerced, data3))), gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (let t of coerceTo)
        (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") && coerceSpecificType(t);
      gen.else(), reportTypeError(it), gen.endIf(), gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data3, coerced), assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data3}`).elseIf((0, codegen_1._)`${data3} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data3} === null
              || (${dataType} == "string" && ${data3} && ${data3} == +${data3})`).assign(coerced, (0, codegen_1._)`+${data3}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data3} === null
              || (${dataType} === "string" && ${data3} && ${data3} == +${data3} && !(${data3} % 1))`).assign(coerced, (0, codegen_1._)`+${data3}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data3} === "false" || ${data3} === 0 || ${data3} === null`).assign(coerced, !1).elseIf((0, codegen_1._)`${data3} === "true" || ${data3} === 1`).assign(coerced, !0);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data3} === "" || ${data3} === 0 || ${data3} === false`), gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data3} === null`).assign(coerced, (0, codegen_1._)`[${data3}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr2) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr2));
    }
    function checkDataType(dataType, data3, strictNums, correct = DataType.Correct) {
      let EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ, cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data3} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data3})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data3} && typeof ${data3} == "object" && !Array.isArray(${data3})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data3} % 1) && !isNaN(${data3})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data3} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data3} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data3})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data3, strictNums, correct) {
      if (dataTypes.length === 1)
        return checkDataType(dataTypes[0], data3, strictNums, correct);
      let cond, types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        let notObj = (0, codegen_1._)`typeof ${data3} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data3} || ${notObj}`, delete types.null, delete types.array, delete types.object;
      } else
        cond = codegen_1.nil;
      types.number && delete types.integer;
      for (let t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data3, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      let cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      let { gen, data: data3, schema } = it, schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data: data3,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});

// node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen(), util_1 = require_util();
    function assignDefaults(it, ty) {
      let { properties, items } = it.schema;
      if (ty === "object" && properties)
        for (let key2 in properties)
          assignDefault(it, key2, properties[key2].default);
      else ty === "array" && Array.isArray(items) && items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      let { gen, compositeRule, data: data3, opts } = it;
      if (defaultValue === void 0)
        return;
      let childData = (0, codegen_1._)`${data3}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      opts.useDefaults === "empty" && (condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`), gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});

// node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen(), util_1 = require_util(), names_1 = require_names(), util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      let { gen, data: data3, it } = cxt;
      gen.if(noPropertyInData(gen, data3, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, !0), cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data: data3, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data3, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, !0), cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data3, property2) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data3}, ${property2})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data3, property2, ownProperties) {
      let cond = (0, codegen_1._)`${data3}${(0, codegen_1.getProperty)(property2)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data3, property2)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data3, property2, ownProperties) {
      let cond = (0, codegen_1._)`${data3}${(0, codegen_1.getProperty)(property2)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data3, property2))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data: data3, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context3, passSchema) {
      let dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data3}, ${topSchemaRef}${schemaPath}` : data3, valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      it.opts.dynamicRef && valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      let args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context3 !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context3}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      let u4 = opts.unicodeRegExp ? "u" : "", { regExp } = opts.code, rx = regExp(pattern, u4);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u4})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      let { gen, data: data3, keyword, it } = cxt, valid = gen.name("valid");
      if (it.allErrors) {
        let validArr = gen.let("valid", !0);
        return validateItems(() => gen.assign(validArr, !1)), validArr;
      }
      return gen.var(valid, !0), validateItems(() => gen.break()), valid;
      function validateItems(notValid) {
        let len = gen.const("len", (0, codegen_1._)`${data3}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid), gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      let { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      if (schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch)) && !it.opts.unevaluated)
        return;
      let valid = gen.let("valid", !1), schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        let schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: !0
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`), cxt.mergeValidEvaluated(schCxt, schValid) || gen.if((0, codegen_1.not)(valid));
      })), cxt.result(valid, () => cxt.reset(), () => cxt.error(!0));
    }
    exports.validateUnion = validateUnion;
  }
});

// node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen(), names_1 = require_names(), code_1 = require_code2(), errors_1 = require_errors();
    function macroKeywordCode(cxt, def2) {
      let { gen, keyword, schema, parentSchema, it } = cxt, macroSchema = def2.macro.call(it.self, schema, parentSchema, it), schemaRef = useKeyword(gen, keyword, macroSchema);
      it.opts.validateSchema !== !1 && it.self.validateSchema(macroSchema, !0);
      let valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: !0
      }, valid), cxt.pass(valid, () => cxt.error(!0));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def2) {
      var _a3;
      let { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def2);
      let validate2 = !$data && def2.compile ? def2.compile.call(it.self, schema, parentSchema, it) : def2.validate, validateRef = useKeyword(gen, keyword, validate2), valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword), cxt.ok((_a3 = def2.valid) !== null && _a3 !== void 0 ? _a3 : valid);
      function validateKeyword() {
        if (def2.errors === !1)
          assignValid(), def2.modifying && modifyData(cxt), reportErrs(() => cxt.error());
        else {
          let ruleErrs = def2.async ? validateAsync3() : validateSync();
          def2.modifying && modifyData(cxt), reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync3() {
        let ruleErrs = gen.let("ruleErrs", null);
        return gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, !1).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e))), ruleErrs;
      }
      function validateSync() {
        let validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        return gen.assign(validateErrs, null), assignValid(codegen_1.nil), validateErrs;
      }
      function assignValid(_await = def2.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        let passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self, passSchema = !("compile" in def2 && !$data || def2.schema === !1);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def2.modifying);
      }
      function reportErrs(errors) {
        var _a4;
        gen.if((0, codegen_1.not)((_a4 = def2.valid) !== null && _a4 !== void 0 ? _a4 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      let { gen, data: data3, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data3, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      let { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`), (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def2) {
      if (def2.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    function validSchemaType(schema, schemaType, allowUndefined = !1) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema > "u");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema, opts, self: self2, errSchemaPath }, def2, keyword) {
      if (Array.isArray(def2.keyword) ? !def2.keyword.includes(keyword) : def2.keyword !== keyword)
        throw new Error("ajv implementation error");
      let deps = def2.dependencies;
      if (deps?.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd)))
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      if (def2.validateSchema && !def2.validateSchema(schema[keyword])) {
        let msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def2.validateSchema.errors);
        if (opts.validateSchema === "log")
          self2.logger.error(msg);
        else
          throw new Error(msg);
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});

// node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  "node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen(), util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0)
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      if (keyword !== void 0) {
        let sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0)
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data: data3, dataTypes, propertyName }) {
      if (data3 !== void 0 && dataProp !== void 0)
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      let { gen } = it;
      if (dataProp !== void 0) {
        let { errorPath, dataPathArr, opts } = it, nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, !0);
        dataContextProps(nextData), subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`, subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`, subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data3 !== void 0) {
        let nextData = data3 instanceof codegen_1.Name ? data3 : gen.let("data", data3, !0);
        dataContextProps(nextData), propertyName !== void 0 && (subschema.propertyName = propertyName);
      }
      dataTypes && (subschema.dataTypes = dataTypes);
      function dataContextProps(_nextData) {
        subschema.data = _nextData, subschema.dataLevel = it.dataLevel + 1, subschema.dataTypes = [], it.definedProperties = /* @__PURE__ */ new Set(), subschema.parentData = it.data, subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      compositeRule !== void 0 && (subschema.compositeRule = compositeRule), createErrors !== void 0 && (subschema.createErrors = createErrors), allErrors !== void 0 && (subschema.allErrors = allErrors), subschema.jtdDiscriminator = jtdDiscriminator, subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal2(a, b10) {
      if (a === b10) return !0;
      if (a && b10 && typeof a == "object" && typeof b10 == "object") {
        if (a.constructor !== b10.constructor) return !1;
        var length3, i, keys4;
        if (Array.isArray(a)) {
          if (length3 = a.length, length3 != b10.length) return !1;
          for (i = length3; i-- !== 0; )
            if (!equal2(a[i], b10[i])) return !1;
          return !0;
        }
        if (a.constructor === RegExp) return a.source === b10.source && a.flags === b10.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b10.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b10.toString();
        if (keys4 = Object.keys(a), length3 = keys4.length, length3 !== Object.keys(b10).length) return !1;
        for (i = length3; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b10, keys4[i])) return !1;
        for (i = length3; i-- !== 0; ) {
          var key2 = keys4[i];
          if (!equal2(a[key2], b10[key2])) return !1;
        }
        return !0;
      }
      return a !== a && b10 !== b10;
    };
  }
});

// node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    var traverse = module.exports = function(schema, opts, cb) {
      typeof opts == "function" && (cb = opts, opts = {}), cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      }, post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: !0,
      items: !0,
      contains: !0,
      additionalProperties: !0,
      propertyNames: !0,
      not: !0,
      if: !0,
      then: !0,
      else: !0
    };
    traverse.arrayKeywords = {
      items: !0,
      allOf: !0,
      anyOf: !0,
      oneOf: !0
    };
    traverse.propsKeywords = {
      $defs: !0,
      definitions: !0,
      properties: !0,
      patternProperties: !0,
      dependencies: !0
    };
    traverse.skipKeywords = {
      default: !0,
      enum: !0,
      const: !0,
      required: !0,
      maximum: !0,
      minimum: !0,
      exclusiveMaximum: !0,
      exclusiveMinimum: !0,
      multipleOf: !0,
      maxLength: !0,
      minLength: !0,
      pattern: !0,
      format: !0,
      maxItems: !0,
      minItems: !0,
      uniqueItems: !0,
      maxProperties: !0,
      minProperties: !0
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key2 in schema) {
          var sch = schema[key2];
          if (Array.isArray(sch)) {
            if (key2 in traverse.arrayKeywords)
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key2 + "/" + i, rootSchema, jsonPtr, key2, schema, i);
          } else if (key2 in traverse.propsKeywords) {
            if (sch && typeof sch == "object")
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key2 + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key2, schema, prop);
          } else (key2 in traverse.keywords || opts.allKeys && !(key2 in traverse.skipKeywords)) && _traverse(opts, pre, post, sch, jsonPtr + "/" + key2, rootSchema, jsonPtr, key2, schema);
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util(), equal2 = require_fast_deep_equal(), traverse = require_json_schema_traverse(), SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = !0) {
      return typeof schema == "boolean" ? !0 : limit === !0 ? !hasRef(schema) : limit ? countKeys(schema) <= limit : !1;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (let key2 in schema) {
        if (REF_KEYWORDS.has(key2))
          return !0;
        let sch = schema[key2];
        if (Array.isArray(sch) && sch.some(hasRef) || typeof sch == "object" && hasRef(sch))
          return !0;
      }
      return !1;
    }
    function countKeys(schema) {
      let count4 = 0;
      for (let key2 in schema) {
        if (key2 === "$ref")
          return 1 / 0;
        if (count4++, !SIMPLE_INLINED.has(key2) && (typeof schema[key2] == "object" && (0, util_1.eachItem)(schema[key2], (sch) => count4 += countKeys(sch)), count4 === 1 / 0))
          return 1 / 0;
      }
      return count4;
    }
    function getFullPath(resolver, id3 = "", normalize5) {
      normalize5 !== !1 && (id3 = normalizeId(id3));
      let p = resolver.parse(id3);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      return resolver.serialize(p).split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id3) {
      return id3 ? id3.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id3) {
      return id3 = normalizeId(id3), resolver.resolve(baseId, id3);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR2 = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean")
        return {};
      let { schemaId, uriResolver } = this.opts, schId = normalizeId(schema[schemaId] || baseId), baseIds = { "": schId }, pathPrefix = getFullPath(uriResolver, schId, !1), localRefs = {}, schemaRefs = /* @__PURE__ */ new Set();
      return traverse(schema, { allKeys: !0 }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        let fullPath = pathPrefix + jsonPtr, innerBaseId = baseIds[parentJsonPtr];
        typeof sch[schemaId] == "string" && (innerBaseId = addRef.call(this, sch[schemaId])), addAnchor.call(this, sch.$anchor), addAnchor.call(this, sch.$dynamicAnchor), baseIds[jsonPtr] = innerBaseId;
        function addRef(ref2) {
          let _resolve = this.opts.uriResolver.resolve;
          if (ref2 = normalizeId(innerBaseId ? _resolve(innerBaseId, ref2) : ref2), schemaRefs.has(ref2))
            throw ambiguos(ref2);
          schemaRefs.add(ref2);
          let schOrRef = this.refs[ref2];
          return typeof schOrRef == "string" && (schOrRef = this.refs[schOrRef]), typeof schOrRef == "object" ? checkAmbiguosRef(sch, schOrRef.schema, ref2) : ref2 !== normalizeId(fullPath) && (ref2[0] === "#" ? (checkAmbiguosRef(sch, localRefs[ref2], ref2), localRefs[ref2] = sch) : this.refs[ref2] = fullPath), ref2;
        }
        function addAnchor(anchor2) {
          if (typeof anchor2 == "string") {
            if (!ANCHOR2.test(anchor2))
              throw new Error(`invalid anchor "${anchor2}"`);
            addRef.call(this, `#${anchor2}`);
          }
        }
      }), localRefs;
      function checkAmbiguosRef(sch1, sch2, ref2) {
        if (sch2 !== void 0 && !equal2(sch1, sch2))
          throw ambiguos(ref2);
      }
      function ambiguos(ref2) {
        return new Error(`reference "${ref2}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});

// node_modules/ajv/dist/compile/validate/index.js
var require_validate = __commonJS({
  "node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema(), dataType_1 = require_dataType(), applicability_1 = require_applicability(), dataType_2 = require_dataType(), defaults_1 = require_defaults(), keyword_1 = require_keyword(), subschema_1 = require_subschema(), codegen_1 = require_codegen(), names_1 = require_names(), resolve_1 = require_resolve(), util_1 = require_util(), errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it) && (checkKeywords(it), schemaCxtHasRules(it))) {
        topSchemaObjCode(it);
        return;
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      opts.code.es5 ? gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
        gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`), destructureValCxtES5(gen, opts), gen.code(body);
      }) : gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`), gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`), gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`), gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`), opts.dynamicRef && gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`), gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`), gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`), gen.var(names_1.default.rootData, names_1.default.data), opts.dynamicRef && gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      let { schema, opts, gen } = it;
      validateFunction(it, () => {
        opts.$comment && schema.$comment && commentKeyword(it), checkNoDefault(it), gen.let(names_1.default.vErrors, null), gen.let(names_1.default.errors, 0), opts.unevaluated && resetEvaluated(it), typeAndKeywords(it), returnResults(it);
      });
    }
    function resetEvaluated(it) {
      let { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`), gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`)), gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      let schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it) && (checkKeywords(it), schemaCxtHasRules(it))) {
        subSchemaObjCode(it, valid);
        return;
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({ schema, self: self2 }) {
      if (typeof schema == "boolean")
        return !schema;
      for (let key2 in schema)
        if (self2.RULES.all[key2])
          return !0;
      return !1;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      let { schema, gen, opts } = it;
      opts.$comment && schema.$comment && commentKeyword(it), updateContext(it), checkAsyncSchema(it);
      let errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount), gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it), checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], !1, errsCount);
      let types = (0, dataType_1.getSchemaTypes)(it.schema), checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      let { schema, errSchemaPath, opts, self: self2 } = it;
      schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self2.RULES) && self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
    function checkNoDefault(it) {
      let { schema, opts } = it;
      schema.default !== void 0 && opts.useDefaults && opts.strictSchema && (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
    function updateContext(it) {
      let schId = it.schema[it.opts.schemaId];
      schId && (it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId));
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      let msg = schema.$comment;
      if (opts.$comment === !0)
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      else if (typeof opts.$comment == "function") {
        let schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`, rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      let { gen, schemaEnv, validateName, ValidationError, opts } = it;
      schemaEnv.$async ? gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`)) : (gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors), opts.unevaluated && assignEvaluated(it), gen.return((0, codegen_1._)`${names_1.default.errors} === 0`));
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      props instanceof codegen_1.Name && gen.assign((0, codegen_1._)`${evaluated}.props`, props), items instanceof codegen_1.Name && gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
      let { gen, schema, data: data3, allErrors, opts, self: self2 } = it, { RULES } = self2;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      opts.jtd || checkStrictTypes(it, types), gen.block(() => {
        for (let group2 of RULES.rules)
          groupKeywords(group2);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group2) {
        (0, applicability_1.shouldUseGroup)(schema, group2) && (group2.type ? (gen.if((0, dataType_2.checkDataType)(group2.type, data3, opts.strictNumbers)), iterateKeywords(it, group2), types.length === 1 && types[0] === group2.type && typeErrors && (gen.else(), (0, dataType_2.reportTypeError)(it)), gen.endIf()) : iterateKeywords(it, group2), allErrors || gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`));
      }
    }
    function iterateKeywords(it, group2) {
      let { gen, schema, opts: { useDefaults } } = it;
      useDefaults && (0, defaults_1.assignDefaults)(it, group2.type), gen.block(() => {
        for (let rule4 of group2.rules)
          (0, applicability_1.shouldUseRule)(schema, rule4) && keywordCode(it, rule4.keyword, rule4.definition, group2.type);
      });
    }
    function checkStrictTypes(it, types) {
      it.schemaEnv.meta || !it.opts.strictTypes || (checkContextTypes(it, types), it.opts.allowUnionTypes || checkMultipleTypes(it, types), checkKeywordTypes(it, it.dataTypes));
    }
    function checkContextTypes(it, types) {
      if (types.length) {
        if (!it.dataTypes.length) {
          it.dataTypes = types;
          return;
        }
        types.forEach((t) => {
          includesType(it.dataTypes, t) || strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }), narrowSchemaTypes(it, types);
      }
    }
    function checkMultipleTypes(it, ts2) {
      ts2.length > 1 && !(ts2.length === 2 && ts2.includes("null")) && strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
    function checkKeywordTypes(it, ts2) {
      let rules = it.self.RULES.all;
      for (let keyword in rules) {
        let rule4 = rules[keyword];
        if (typeof rule4 == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule4)) {
          let { type: type3 } = rule4.definition;
          type3.length && !type3.some((t) => hasApplicableType(ts2, t)) && strictTypesError(it, `missing type "${type3.join(",")}" for keyword "${keyword}"`);
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts2, t) {
      return ts2.includes(t) || t === "integer" && ts2.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      let ts2 = [];
      for (let t of it.dataTypes)
        includesType(withTypes, t) ? ts2.push(t) : withTypes.includes("integer") && t === "number" && ts2.push("integer");
      it.dataTypes = ts2;
    }
    function strictTypesError(it, msg) {
      let schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`, (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def2, keyword) {
        if ((0, keyword_1.validateKeywordUsage)(it, def2, keyword), this.gen = it.gen, this.allErrors = it.allErrors, this.keyword = keyword, this.data = it.data, this.schema = it.schema[keyword], this.$data = def2.$data && it.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data), this.schemaType = def2.schemaType, this.parentSchema = it.schema, this.params = {}, this.it = it, this.def = def2, this.$data)
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        else if (this.schemaCode = this.schemaValue, !(0, keyword_1.validSchemaType)(this.schema, def2.schemaType, def2.allowUndefined))
          throw new Error(`${keyword} value must be ${JSON.stringify(def2.schemaType)}`);
        ("code" in def2 ? def2.trackErrors : def2.errors !== !1) && (this.errsCount = it.gen.const("_errs", names_1.default.errors));
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition), failAction ? failAction() : this.error(), successAction ? (this.gen.else(), successAction(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error(), this.allErrors || this.gen.if(!1);
          return;
        }
        this.gen.if(condition), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        let { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append3, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams), this._error(append3, errorPaths), this.setParams({});
          return;
        }
        this._error(append3, errorPaths);
      }
      _error(append3, errorPaths) {
        (append3 ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        this.allErrors || this.gen.if(cond);
      }
      setParams(obj, assign) {
        assign ? Object.assign(this.params, obj) : this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid), codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        let { gen, schemaCode, schemaType, def: def2 } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid)), valid !== codegen_1.nil && gen.assign(valid, !0), (schemaType.length || def2.validateSchema) && (gen.elseIf(this.invalid$data()), this.$dataError(), valid !== codegen_1.nil && gen.assign(valid, !1)), gen.else();
      }
      invalid$data() {
        let { gen, schemaCode, schemaType, def: def2, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            let st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def2.validateSchema) {
            let validateSchemaRef = gen.scopeValue("validate$data", { ref: def2.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        let subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl), (0, subschema_1.extendSubschemaMode)(subschema, appl);
        let nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        return subschemaCode(nextContext, valid), nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        let { it, gen } = this;
        it.opts.unevaluated && (it.props !== !0 && schemaCxt.props !== void 0 && (it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName)), it.items !== !0 && schemaCxt.items !== void 0 && (it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName)));
      }
      mergeValidEvaluated(schemaCxt, valid) {
        let { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== !0 || it.items !== !0))
          return gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name)), !0;
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def2, ruleType) {
      let cxt = new KeywordCxt(it, def2, keyword);
      "code" in def2 ? def2.code(cxt, ruleType) : cxt.$data && def2.validate ? (0, keyword_1.funcKeywordCode)(cxt, def2) : "macro" in def2 ? (0, keyword_1.macroKeywordCode)(cxt, def2) : (def2.compile || def2.validate) && (0, keyword_1.funcKeywordCode)(cxt, def2);
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/, RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer, data3;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data, data3 = names_1.default.rootData;
      } else {
        let matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        let up = +matches[1];
        if (jsonPointer = matches[2], jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        if (data3 = dataNames[dataLevel - up], !jsonPointer)
          return data3;
      }
      let expr2 = data3, segments2 = jsonPointer.split("/");
      for (let segment of segments2)
        segment && (data3 = (0, codegen_1._)`${data3}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`, expr2 = (0, codegen_1._)`${expr2} && ${data3}`);
      return expr2;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});

// node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  "node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed"), this.errors = errors, this.ajv = this.validation = !0;
      }
    };
    exports.default = ValidationError;
  }
});

// node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  "node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var resolve_1 = require_resolve(), MissingRefError = class extends Error {
      constructor(resolver, baseId, ref2, msg) {
        super(msg || `can't resolve reference ${ref2} from id ${baseId}`), this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref2), this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});

// node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen(), validation_error_1 = require_validation_error(), names_1 = require_names(), resolve_1 = require_resolve(), util_1 = require_util(), validate_1 = require_validate(), SchemaEnv = class {
      constructor(env) {
        var _a3;
        this.refs = {}, this.dynamicAnchors = {};
        let schema;
        typeof env.schema == "object" && (schema = env.schema), this.schema = env.schema, this.schemaId = env.schemaId, this.root = env.root || this, this.baseId = (_a3 = env.baseId) !== null && _a3 !== void 0 ? _a3 : (0, resolve_1.normalizeId)(schema?.[env.schemaId || "$id"]), this.schemaPath = env.schemaPath, this.localRefs = env.localRefs, this.meta = env.meta, this.$async = schema?.$async, this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      let _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      let rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId), { es5, lines } = this.opts.code, { ownProperties } = this.opts, gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties }), _ValidationError;
      sch.$async && (_ValidationError = gen.scopeValue("Error", {
        ref: validation_error_1.default,
        code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
      }));
      let validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      let schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        // TODO can its length be used as dataLevel if nil is removed?
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === !0 ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      }, sourceCode;
      try {
        this._compilations.add(sch), (0, validate_1.validateFunctionCode)(schemaCxt), gen.optimize(this.opts.code.optimize);
        let validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`, this.opts.code.process && (sourceCode = this.opts.code.process(sourceCode, sch));
        let validate2 = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode)(this, this.scope.get());
        if (this.scope.value(validateName, { ref: validate2 }), validate2.errors = null, validate2.schema = sch.schema, validate2.schemaEnv = sch, sch.$async && (validate2.$async = !0), this.opts.code.source === !0 && (validate2.source = { validateName, validateCode, scopeValues: gen._values }), this.opts.unevaluated) {
          let { props, items } = schemaCxt;
          validate2.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          }, validate2.source && (validate2.source.evaluated = (0, codegen_1.stringify)(validate2.evaluated));
        }
        return sch.validate = validate2, sch;
      } catch (e) {
        throw delete sch.validate, delete sch.validateName, sourceCode && this.logger.error("Error compiling schema, function code:", sourceCode), e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef2(root2, baseId, ref2) {
      var _a3;
      ref2 = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref2);
      let schOrFunc = root2.refs[ref2];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve9.call(this, root2, ref2);
      if (_sch === void 0) {
        let schema = (_a3 = root2.localRefs) === null || _a3 === void 0 ? void 0 : _a3[ref2], { schemaId } = this.opts;
        schema && (_sch = new SchemaEnv({ schema, schemaId, root: root2, baseId }));
      }
      if (_sch !== void 0)
        return root2.refs[ref2] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef2;
    function inlineOrCompile(sch) {
      return (0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs) ? sch.schema : sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (let sch of this._compilations)
        if (sameSchemaEnv(sch, schEnv))
          return sch;
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve9(root2, ref2) {
      let sch;
      for (; typeof (sch = this.refs[ref2]) == "string"; )
        ref2 = sch;
      return sch || this.schemas[ref2] || resolveSchema.call(this, root2, ref2);
    }
    function resolveSchema(root2, ref2) {
      let p = this.opts.uriResolver.parse(ref2), refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p), baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root2.baseId, void 0);
      if (Object.keys(root2.schema).length > 0 && refPath === baseId)
        return getJsonPointer.call(this, p, root2);
      let id3 = (0, resolve_1.normalizeId)(refPath), schOrRef = this.refs[id3] || this.schemas[id3];
      if (typeof schOrRef == "string") {
        let sch = resolveSchema.call(this, root2, schOrRef);
        return typeof sch?.schema != "object" ? void 0 : getJsonPointer.call(this, p, sch);
      }
      if (typeof schOrRef?.schema == "object") {
        if (schOrRef.validate || compileSchema.call(this, schOrRef), id3 === (0, resolve_1.normalizeId)(ref2)) {
          let { schema } = schOrRef, { schemaId } = this.opts, schId = schema[schemaId];
          return schId && (baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId)), new SchemaEnv({ schema, schemaId, root: root2, baseId });
        }
        return getJsonPointer.call(this, p, schOrRef);
      }
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root: root2 }) {
      var _a3;
      if (((_a3 = parsedRef.fragment) === null || _a3 === void 0 ? void 0 : _a3[0]) !== "/")
        return;
      for (let part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema == "boolean")
          return;
        let partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema = partSchema;
        let schId = typeof schema == "object" && schema[this.opts.schemaId];
        !PREVENT_SCOPE_CHANGE.has(part) && schId && (baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId));
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        let $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root2, $ref);
      }
      let { schemaId } = this.opts;
      if (env = env || new SchemaEnv({ schema, schemaId, root: root2, baseId }), env.schema !== env.root.schema)
        return env;
    }
  }
});

// node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: !1
    };
  }
});

// node_modules/fast-uri/lib/utils.js
var require_utils = __commonJS({
  "node_modules/fast-uri/lib/utils.js"(exports, module) {
    "use strict";
    var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u), isPort = RegExp.prototype.test.bind(/^\d*$/u), isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu), isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu), isPathCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u), isQueryFragmentCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u), isUserinfoCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u), BYTE_HEX = new Array(256);
    {
      let HEX_DIGITS = "0123456789ABCDEF";
      for (let i = 0; i < 256; i++)
        BYTE_HEX[i] = "%" + HEX_DIGITS[i >> 4] + HEX_DIGITS[i & 15];
    }
    function percentEncodeNonAscii(cp) {
      return cp < 2048 ? BYTE_HEX[192 | cp >> 6] + BYTE_HEX[128 | cp & 63] : cp < 65536 ? BYTE_HEX[224 | cp >> 12] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63] : BYTE_HEX[240 | cp >> 18] + BYTE_HEX[128 | cp >> 12 & 63] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
    }
    function stringArrayToHexStripped(input2) {
      let acc = "", code = 0, i = 0;
      for (i = 0; i < input2.length; i++)
        if (code = input2[i].charCodeAt(0), code !== 48) {
          if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102))
            return "";
          acc += input2[i];
          break;
        }
      for (i += 1; i < input2.length; i++) {
        if (code = input2[i].charCodeAt(0), !(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102))
          return "";
        acc += input2[i];
      }
      return acc;
    }
    var isHextet = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/), isIPvFuture = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/), isZoneCharacter = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/), nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
    function isZoneIdentifier(zone) {
      if (zone.length === 0) return !1;
      for (let i = 0; i < zone.length; i++)
        if (!isZoneCharacter(zone[i])) {
          if (zone[i] === "%" && i + 2 < zone.length && isHexPair(zone.slice(i + 1, i + 3))) {
            i += 2;
            continue;
          }
          return !1;
        }
      return !0;
    }
    function compressIPv6ZeroRun(hextets) {
      let bestStart = -1, bestLength = 0, runStart = -1, runLength = 0;
      for (let i = 0; i < hextets.length; i++)
        hextets[i] === "0" ? (runStart === -1 && (runStart = i), runLength++, runLength > bestLength && (bestLength = runLength, bestStart = runStart)) : (runStart = -1, runLength = 0);
      if (bestLength < 2) return hextets.join(":");
      let head = hextets.slice(0, bestStart).join(":"), tail2 = hextets.slice(bestStart + bestLength).join(":");
      return head + "::" + tail2;
    }
    function normalizeIPv6Address(input2) {
      let compression = input2.indexOf("::");
      if (compression !== -1 && input2.indexOf("::", compression + 1) !== -1) return;
      let left = compression === -1 ? input2.split(":") : input2.slice(0, compression).split(":"), right = compression === -1 ? [] : input2.slice(compression + 2).split(":");
      compression !== -1 && (left.length === 1 && left[0] === "" && (left.length = 0), right.length === 1 && right[0] === "" && (right.length = 0));
      let parts = left.concat(right), hextetCount = 0;
      for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (part === "") return;
        if (part.indexOf(".") !== -1) {
          if (i !== parts.length - 1 || compression !== -1 && right.length === 0 || !isIPv4(part)) return;
          hextetCount += 2;
          continue;
        }
        if (!isHextet(part)) return;
        parts[i] = parseInt(part, 16).toString(16), hextetCount++;
      }
      if (compression === -1)
        return hextetCount !== 8 ? void 0 : compressIPv6ZeroRun(parts);
      if (hextetCount >= 8) return;
      let expanded = parts.slice(0, left.length);
      for (let i = hextetCount; i < 8; i++) expanded.push("0");
      for (let i = left.length; i < parts.length; i++) expanded.push(parts[i]);
      return compressIPv6ZeroRun(expanded);
    }
    function normalizeIPv6(host) {
      let bracketed = host[0] === "[" && host[host.length - 1] === "]";
      if ((host[0] === "[" || host[host.length - 1] === "]") && !bracketed) return { host, isIPV6: !1, error: !0 };
      let input2 = bracketed ? host.slice(1, -1) : host;
      if (bracketed && isIPvFuture(input2))
        return input2 = input2.toLowerCase(), { host: `[${input2}]`, escapedHost: input2, isIPV6: !1, isIPVFuture: !0 };
      if (findToken(input2, ":") < 2)
        return { host, isIPV6: !1, error: bracketed };
      let zoneIdentifier = "", zoneSeparator = input2.indexOf("%");
      if (zoneSeparator !== -1) {
        let separatorLength = input2.slice(zoneSeparator, zoneSeparator + 3).toLowerCase() === "%25" ? 3 : 1;
        if (zoneIdentifier = input2.slice(zoneSeparator + separatorLength), !isZoneIdentifier(zoneIdentifier)) return { host, isIPV6: !1, error: !0 };
        input2 = input2.slice(0, zoneSeparator);
      }
      let address = normalizeIPv6Address(input2);
      return address === void 0 ? { host, isIPV6: !1, error: !0 } : {
        host: address + (zoneIdentifier ? "%" + zoneIdentifier : ""),
        escapedHost: address + (zoneIdentifier ? "%25" + zoneIdentifier : ""),
        isIPV6: !0
      };
    }
    function findToken(str, token) {
      let ind = 0;
      for (let i = 0; i < str.length; i++)
        str[i] === token && ind++;
      return ind;
    }
    function removeDotSegments(path3) {
      let input2 = path3, output4 = [], nextSlash = -1, len = 0;
      for (; len = input2.length; ) {
        if (len === 1) {
          if (input2 === ".")
            break;
          if (input2 === "/") {
            output4.push("/");
            break;
          } else {
            output4.push(input2);
            break;
          }
        } else if (len === 2) {
          if (input2[0] === ".") {
            if (input2[1] === ".")
              break;
            if (input2[1] === "/") {
              input2 = input2.slice(2);
              continue;
            }
          } else if (input2[0] === "/" && (input2[1] === "." || input2[1] === "/")) {
            output4.push("/");
            break;
          }
        } else if (len === 3 && input2 === "/..") {
          output4.length !== 0 && output4.pop(), output4.push("/");
          break;
        }
        if (input2[0] === ".") {
          if (input2[1] === ".") {
            if (input2[2] === "/") {
              input2 = input2.slice(3);
              continue;
            }
          } else if (input2[1] === "/") {
            input2 = input2.slice(2);
            continue;
          }
        } else if (input2[0] === "/" && input2[1] === ".") {
          if (input2[2] === "/") {
            input2 = input2.slice(2);
            continue;
          } else if (input2[2] === "." && input2[3] === "/") {
            input2 = input2.slice(3), output4.length !== 0 && output4.pop();
            continue;
          }
        }
        if ((nextSlash = input2.indexOf("/", 1)) === -1) {
          output4.push(input2);
          break;
        } else
          output4.push(input2.slice(0, nextSlash)), input2 = input2.slice(nextSlash);
      }
      return output4.join("");
    }
    var HOST_DELIMS = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" }, HOST_DELIM_RE = /[@/?#:]/g, HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
    function reescapeHostDelimiters(host, isIP) {
      let re2 = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
      return re2.lastIndex = 0, host.replace(re2, (ch2) => HOST_DELIMS[ch2]);
    }
    function normalizePercentEncoding(input2, decodeUnreserved = !1) {
      if (input2.indexOf("%") === -1)
        return input2;
      let output4 = "";
      for (let i = 0; i < input2.length; i++) {
        if (input2[i] === "%" && i + 2 < input2.length) {
          let hex4 = input2.slice(i + 1, i + 3);
          if (isHexPair(hex4)) {
            let normalizedHex = hex4.toUpperCase(), decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            decodeUnreserved && isUnreserved(decoded) ? output4 += decoded : output4 += "%" + normalizedHex, i += 2;
            continue;
          }
        }
        output4 += input2[i];
      }
      return output4;
    }
    function normalizePathEncoding(input2) {
      let output4 = "";
      for (let i = 0; i < input2.length; i++) {
        let ch2 = input2[i];
        if (ch2 === "%" && i + 2 < input2.length) {
          let hex4 = input2.slice(i + 1, i + 3);
          if (isHexPair(hex4)) {
            let normalizedHex = hex4.toUpperCase(), decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            decoded !== "." && isUnreserved(decoded) ? output4 += decoded : output4 += "%" + normalizedHex, i += 2;
            continue;
          }
        }
        if (isPathCharacter(ch2))
          output4 += ch2;
        else {
          let code = input2.charCodeAt(i);
          if (code < 128)
            output4 += isEscapeSafe(code) ? ch2 : BYTE_HEX[code];
          else if (code < 55296 || code > 57343)
            output4 += percentEncodeNonAscii(code);
          else if (code <= 56319 && i + 1 < input2.length) {
            let low = input2.charCodeAt(i + 1);
            low >= 56320 && low <= 57343 ? (output4 += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output4 += percentEncodeNonAscii(65533);
          } else
            output4 += percentEncodeNonAscii(65533);
        }
      }
      return output4;
    }
    function serializePathEncoding(input2, pathNoScheme = !1) {
      let output4 = "", firstSegment = pathNoScheme && input2[0] !== "/";
      for (let i = 0; i < input2.length; i++) {
        let ch2 = input2[i];
        if (ch2 === "%" && i + 2 < input2.length) {
          let hex4 = input2.slice(i + 1, i + 3);
          if (isHexPair(hex4)) {
            output4 += "%" + hex4.toUpperCase(), i += 2;
            continue;
          }
        }
        if (ch2 === "/" && (firstSegment = !1), isPathCharacter(ch2) && (ch2 !== ":" || !firstSegment))
          output4 += ch2;
        else {
          let code = input2.charCodeAt(i);
          if (code < 128)
            output4 += BYTE_HEX[code];
          else if (code < 55296 || code > 57343)
            output4 += percentEncodeNonAscii(code);
          else if (code <= 56319 && i + 1 < input2.length) {
            let low = input2.charCodeAt(i + 1);
            low >= 56320 && low <= 57343 ? (output4 += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output4 += percentEncodeNonAscii(65533);
          } else
            output4 += percentEncodeNonAscii(65533);
        }
      }
      return output4;
    }
    function encodeComponent(input2, isAllowed) {
      let output4 = "";
      for (let i = 0; i < input2.length; i++) {
        let ch2 = input2[i];
        if (ch2 === "%" && i + 2 < input2.length) {
          let hex4 = input2.slice(i + 1, i + 3);
          if (isHexPair(hex4)) {
            output4 += "%" + hex4.toUpperCase(), i += 2;
            continue;
          }
        }
        if (isAllowed(ch2))
          output4 += ch2;
        else {
          let code = input2.charCodeAt(i);
          if (code < 128)
            output4 += BYTE_HEX[code];
          else if (code < 55296 || code > 57343)
            output4 += percentEncodeNonAscii(code);
          else if (code <= 56319 && i + 1 < input2.length) {
            let low = input2.charCodeAt(i + 1);
            low >= 56320 && low <= 57343 ? (output4 += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output4 += percentEncodeNonAscii(65533);
          } else
            output4 += percentEncodeNonAscii(65533);
        }
      }
      return output4;
    }
    function encodeUserinfo(input2) {
      return encodeComponent(input2, isUserinfoCharacter);
    }
    function encodeQuery(input2) {
      return encodeComponent(input2, isQueryFragmentCharacter);
    }
    function encodeFragment(input2) {
      return encodeComponent(input2, isQueryFragmentCharacter);
    }
    function isEscapeSafe(cp) {
      return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 42 || cp === 43 || cp === 45 || cp === 46 || cp === 47 || cp === 64 || cp === 95;
    }
    function normalizeQueryFragmentEncoding(input2) {
      let output4 = "";
      for (let i = 0; i < input2.length; i++) {
        let ch2 = input2[i];
        if (ch2 === "%" && i + 2 < input2.length) {
          let hex4 = input2.slice(i + 1, i + 3);
          if (isHexPair(hex4)) {
            let normalizedHex = hex4.toUpperCase(), decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            isUnreserved(decoded) ? output4 += decoded : output4 += "%" + normalizedHex, i += 2;
            continue;
          }
        }
        if (isQueryFragmentCharacter(ch2))
          output4 += ch2;
        else {
          let code = input2.charCodeAt(i);
          if (code < 128)
            output4 += isEscapeSafe(code) ? ch2 : BYTE_HEX[code];
          else if (code < 55296 || code > 57343)
            output4 += percentEncodeNonAscii(code);
          else if (code <= 56319 && i + 1 < input2.length) {
            let low = input2.charCodeAt(i + 1);
            low >= 56320 && low <= 57343 ? (output4 += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320)), i++) : output4 += percentEncodeNonAscii(65533);
          } else
            output4 += percentEncodeNonAscii(65533);
        }
      }
      return output4;
    }
    function escapePreservingEscapes(input2) {
      let output4 = "";
      for (let i = 0; i < input2.length; i++) {
        if (input2[i] === "%" && i + 2 < input2.length) {
          let hex4 = input2.slice(i + 1, i + 3);
          if (isHexPair(hex4)) {
            output4 += "%" + hex4.toUpperCase(), i += 2;
            continue;
          }
        }
        output4 += escape(input2[i]);
      }
      return output4;
    }
    function recomposeAuthority(component) {
      let uriTokens = [];
      if (component.userinfo !== void 0 && (uriTokens.push(encodeUserinfo(component.userinfo)), uriTokens.push("@")), component.host !== void 0) {
        let host = component.host;
        if (!isIPv4(host)) {
          let ipV6res = normalizeIPv6(host);
          ipV6res.isIPV6 !== !0 && ipV6res.isIPVFuture !== !0 && (host = normalizePercentEncoding(host, !0), ipV6res = normalizeIPv6(host)), ipV6res.isIPV6 === !0 || ipV6res.isIPVFuture === !0 ? host = `[${ipV6res.escapedHost}]` : host = reescapeHostDelimiters(host, !1);
        }
        uriTokens.push(host);
      }
      if (typeof component.port == "number" || typeof component.port == "string") {
        let port = String(component.port);
        if (!isPort(port))
          throw new TypeError("URI port is malformed.");
        uriTokens.push(":"), uriTokens.push(port);
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    module.exports = {
      nonSimpleDomain,
      recomposeAuthority,
      reescapeHostDelimiters,
      normalizePercentEncoding,
      normalizePathEncoding,
      serializePathEncoding,
      normalizeQueryFragmentEncoding,
      encodeUserinfo,
      encodeQuery,
      encodeFragment,
      escapePreservingEscapes,
      removeDotSegments,
      isIPv4,
      isUUID,
      normalizeIPv6,
      stringArrayToHexStripped
    };
  }
});

// node_modules/fast-uri/lib/schemes.js
var require_schemes = __commonJS({
  "node_modules/fast-uri/lib/schemes.js"(exports, module) {
    "use strict";
    var { isUUID } = require_utils(), URN_REG = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu, supportedSchemeNames = (
      /** @type {const} */
      [
        "http",
        "https",
        "ws",
        "wss",
        "urn",
        "urn:uuid"
      ]
    );
    function isValidSchemeName(name2) {
      return supportedSchemeNames.indexOf(
        /** @type {*} */
        name2
      ) !== -1;
    }
    function wsIsSecure(wsComponent) {
      return wsComponent.secure === !0 ? !0 : wsComponent.secure === !1 ? !1 : wsComponent.scheme ? wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S") : !1;
    }
    function httpParse(component) {
      return component.host || (component.error = component.error || "HTTP URIs must have a host."), component;
    }
    function httpSerialize(component) {
      let secure = String(component.scheme).toLowerCase() === "https";
      return (component.port === (secure ? 443 : 80) || component.port === "") && (component.port = void 0), component.path || (component.path = "/"), component;
    }
    function wsParse(wsComponent) {
      return wsComponent.secure = wsIsSecure(wsComponent), wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : ""), wsComponent.path = void 0, wsComponent.query = void 0, wsComponent;
    }
    function wsSerialize(wsComponent) {
      if ((wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") && (wsComponent.port = void 0), typeof wsComponent.secure == "boolean" && (wsComponent.scheme = wsComponent.secure ? "wss" : "ws", wsComponent.secure = void 0), wsComponent.resourceName) {
        let queryIndex = wsComponent.resourceName.indexOf("?"), path3 = queryIndex === -1 ? wsComponent.resourceName : wsComponent.resourceName.slice(0, queryIndex);
        wsComponent.path = path3 && path3 !== "/" ? path3 : void 0, wsComponent.query = queryIndex === -1 ? void 0 : wsComponent.resourceName.slice(queryIndex + 1), wsComponent.resourceName = void 0;
      }
      return wsComponent.fragment = void 0, wsComponent;
    }
    function urnParse(urnComponent, options) {
      if (!urnComponent.path)
        return urnComponent.error = "URN can not be parsed", urnComponent;
      let matches = urnComponent.path.match(URN_REG);
      if (matches && matches[0] === urnComponent.path) {
        let scheme3 = options.scheme || urnComponent.scheme || "urn";
        urnComponent.nid = matches[1].toLowerCase(), urnComponent.nss = matches[2];
        let urnScheme = `${scheme3}:${options.nid || urnComponent.nid}`, schemeHandler = getSchemeHandler(urnScheme);
        urnComponent.path = void 0, schemeHandler && (urnComponent = schemeHandler.parse(urnComponent, options));
      } else
        urnComponent.error = urnComponent.error || "URN can not be parsed.";
      return urnComponent;
    }
    function urnSerialize(urnComponent, options) {
      if (urnComponent.nid === void 0)
        throw new Error("URN without nid cannot be serialized");
      let scheme3 = options.scheme || urnComponent.scheme || "urn", nid = urnComponent.nid.toLowerCase(), urnScheme = `${scheme3}:${options.nid || nid}`, schemeHandler = getSchemeHandler(urnScheme);
      schemeHandler && (urnComponent = schemeHandler.serialize(urnComponent, options));
      let uriComponent = urnComponent, nss = urnComponent.nss;
      return uriComponent.path = `${nid || options.nid}:${nss}`, options.skipEscape = !0, uriComponent;
    }
    function urnuuidParse(urnComponent, options) {
      let uuidComponent = urnComponent;
      return uuidComponent.uuid = uuidComponent.nss, uuidComponent.nss = void 0, !options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid)) && (uuidComponent.error = uuidComponent.error || "UUID is not valid."), uuidComponent;
    }
    function urnuuidSerialize(uuidComponent) {
      let urnComponent = uuidComponent;
      return urnComponent.nss = (uuidComponent.uuid || "").toLowerCase(), urnComponent;
    }
    var http = (
      /** @type {SchemeHandler} */
      {
        scheme: "http",
        domainHost: !0,
        parse: httpParse,
        serialize: httpSerialize
      }
    ), https = (
      /** @type {SchemeHandler} */
      {
        scheme: "https",
        domainHost: http.domainHost,
        parse: httpParse,
        serialize: httpSerialize
      }
    ), ws = (
      /** @type {SchemeHandler} */
      {
        scheme: "ws",
        domainHost: !0,
        parse: wsParse,
        serialize: wsSerialize
      }
    ), wss = (
      /** @type {SchemeHandler} */
      {
        scheme: "wss",
        domainHost: ws.domainHost,
        parse: ws.parse,
        serialize: ws.serialize
      }
    ), urn = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn",
        parse: urnParse,
        serialize: urnSerialize,
        skipNormalize: !0
      }
    ), urnuuid = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn:uuid",
        parse: urnuuidParse,
        serialize: urnuuidSerialize,
        skipNormalize: !0
      }
    ), SCHEMES = (
      /** @type {Record<SchemeName, SchemeHandler>} */
      {
        http,
        https,
        ws,
        wss,
        urn,
        "urn:uuid": urnuuid
      }
    );
    Object.setPrototypeOf(SCHEMES, null);
    function getSchemeHandler(scheme3) {
      return scheme3 && (SCHEMES[
        /** @type {SchemeName} */
        scheme3
      ] || SCHEMES[
        /** @type {SchemeName} */
        scheme3.toLowerCase()
      ]) || void 0;
    }
    module.exports = {
      wsIsSecure,
      SCHEMES,
      isValidSchemeName,
      getSchemeHandler
    };
  }
});

// node_modules/fast-uri/index.js
var require_fast_uri = __commonJS({
  "node_modules/fast-uri/index.js"(exports, module) {
    "use strict";
    var { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, serializePathEncoding, normalizeQueryFragmentEncoding, encodeQuery, encodeFragment, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils(), { SCHEMES, getSchemeHandler } = require_schemes(), VALID_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/u, MALFORMED_SCHEME_ERROR = "URI scheme is malformed.";
    function decodeValidScheme(scheme3) {
      let decodedScheme = unescape(String(scheme3));
      if (!VALID_SCHEME.test(decodedScheme))
        throw new TypeError(MALFORMED_SCHEME_ERROR);
      return decodedScheme;
    }
    function normalize5(uri2, options) {
      return typeof uri2 == "string" ? uri2 = /** @type {T} */
      normalizeString(uri2, options) : typeof uri2 == "object" && (uri2 = /** @type {T} */
      parse9(serialize(uri2, options), options)), uri2;
    }
    function resolve9(baseURI, relativeURI, options) {
      let schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" }, {
        parsed: baseParsed,
        malformedAuthorityOrPort: baseMalformed,
        malformedPercentEncoding: baseMalformedPercentEncoding,
        malformedSchemeSpecific: baseMalformedSchemeSpecific,
        malformedHost: baseMalformedHost,
        malformedScheme: baseMalformedScheme
      } = parseWithStatus(baseURI, schemelessOptions), {
        parsed: relativeParsed,
        malformedAuthorityOrPort: relativeMalformed,
        malformedPercentEncoding: relativeMalformedPercentEncoding,
        malformedSchemeSpecific: relativeMalformedSchemeSpecific,
        malformedHost: relativeMalformedHost,
        malformedScheme: relativeMalformedScheme
      } = parseWithStatus(relativeURI, schemelessOptions);
      if (baseMalformed || relativeMalformed || baseMalformedPercentEncoding || relativeMalformedPercentEncoding || baseMalformedSchemeSpecific || relativeMalformedSchemeSpecific || baseMalformedHost || relativeMalformedHost || baseMalformedScheme || relativeMalformedScheme)
        throw new Error(baseParsed.error || relativeParsed.error || "URI is malformed.");
      let resolved = resolveComponent(baseParsed, relativeParsed, schemelessOptions, !0), resolvedSchemeHandler = getSchemeHandler(options && options.scheme || resolved.scheme), resolvedHost = resolved.host, resolvedHostIsIP = resolvedHost !== void 0 && resolvedHost !== "" && (isIPv4(resolvedHost) || normalizeIPv6(resolvedHost).isIPV6);
      canonicalizeHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP);
      let encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !new RegExp("\\P{ASCII}", "u").test(resolvedHost);
      if (resolved.error && !encodedASCIIHost)
        throw new Error(resolved.error);
      return schemelessOptions.skipEscape = !0, serialize(resolved, schemelessOptions);
    }
    function resolveComponent(base, relative4, options, skipNormalization) {
      let target3 = {};
      return skipNormalization || (base = parse9(serialize(base, options), options), relative4 = parse9(serialize(relative4, options), options)), options = options || {}, !options.tolerant && relative4.scheme ? (target3.scheme = relative4.scheme, target3.userinfo = relative4.userinfo, target3.host = relative4.host, target3.port = relative4.port, target3.path = removeDotSegments(relative4.path || ""), target3.query = relative4.query) : (relative4.userinfo !== void 0 || relative4.host !== void 0 || relative4.port !== void 0 ? (target3.userinfo = relative4.userinfo, target3.host = relative4.host, target3.port = relative4.port, target3.path = removeDotSegments(relative4.path || ""), target3.query = relative4.query) : (relative4.path ? (relative4.path[0] === "/" ? target3.path = removeDotSegments(relative4.path) : ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path ? target3.path = "/" + relative4.path : base.path ? target3.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative4.path : target3.path = relative4.path, target3.path = removeDotSegments(target3.path)), target3.query = relative4.query) : (target3.path = base.path, relative4.query !== void 0 ? target3.query = relative4.query : target3.query = base.query), target3.userinfo = base.userinfo, target3.host = base.host, target3.port = base.port), target3.scheme = base.scheme), target3.fragment = relative4.fragment, target3;
    }
    function equal2(uriA, uriB, options) {
      let normalizedA = normalizeComparableURI(uriA, options), normalizedB = normalizeComparableURI(uriB, options);
      return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA === normalizedB;
    }
    function serialize(cmpts, opts) {
      let component = {
        host: cmpts.host,
        scheme: cmpts.scheme,
        userinfo: cmpts.userinfo,
        port: cmpts.port,
        path: cmpts.path,
        query: cmpts.query,
        nid: cmpts.nid,
        nss: cmpts.nss,
        uuid: cmpts.uuid,
        fragment: cmpts.fragment,
        reference: cmpts.reference,
        resourceName: cmpts.resourceName,
        secure: cmpts.secure,
        error: ""
      }, options = Object.assign({}, opts), uriTokens = [];
      component.scheme && (component.scheme = decodeValidScheme(component.scheme));
      let schemeHandler = getSchemeHandler(options.scheme || component.scheme);
      schemeHandler && schemeHandler.serialize && schemeHandler.serialize(component, options);
      let hasAuthority = component.userinfo !== void 0 || component.host !== void 0 || component.port !== void 0, pathNoScheme = !options.skipEscape && component.scheme === void 0 && !hasAuthority;
      component.path !== void 0 && (options.skipEscape ? component.path = normalizePercentEncoding(component.path) : component.path = serializePathEncoding(component.path, pathNoScheme)), options.reference !== "suffix" && component.scheme && (component.scheme = decodeValidScheme(component.scheme), uriTokens.push(component.scheme, ":"));
      let authority = recomposeAuthority(component);
      if (authority !== void 0 && (options.reference !== "suffix" && uriTokens.push("//"), uriTokens.push(authority), component.path && component.path[0] !== "/" && uriTokens.push("/")), component.path !== void 0) {
        let s = component.path;
        !options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath) && (s = removeDotSegments(s)), pathNoScheme && (s = serializePathEncoding(s, !0)), authority === void 0 && s[0] === "/" && s[1] === "/" && (s = "/%2F" + s.slice(2)), uriTokens.push(s);
      }
      return component.query !== void 0 && uriTokens.push("?", encodeQuery(component.query)), component.fragment !== void 0 && uriTokens.push("#", encodeFragment(component.fragment)), uriTokens.join("");
    }
    var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u, AUTHORITY_PREFIX = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/, AUTHORITY_INTRODUCER_REGION = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
    function getParseError(parsed, matches) {
      if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/")
        return 'URI path must start with "/" when authority is present.';
      if (typeof parsed.port == "number" && (parsed.port < 0 || parsed.port > 65535))
        return "URI port is malformed.";
    }
    function hasMalformedPercentEncoding(component) {
      if (component === void 0) return !1;
      let percent = component.indexOf("%");
      for (; percent !== -1; ) {
        if (percent + 2 >= component.length || !/^[\da-f]{2}$/iu.test(component.slice(percent + 1, percent + 3)))
          return !0;
        percent = component.indexOf("%", percent + 3);
      }
      return !1;
    }
    function isIPLiteral(host) {
      return host[0] === "[" && host[host.length - 1] === "]";
    }
    function hasMalformedComponentPercentEncoding(matches) {
      let host = matches[4];
      return hasMalformedPercentEncoding(matches[3]) || host !== void 0 && !isIPLiteral(host) && hasMalformedPercentEncoding(host) || hasMalformedPercentEncoding(matches[6]) || hasMalformedPercentEncoding(matches[7]) || hasMalformedPercentEncoding(matches[8]);
    }
    function canonicalizeHost(parsed, options, schemeHandler, isIP) {
      if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport) && parsed.host && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === !1 && nonSimpleDomain(parsed.host))
        try {
          parsed.host = new URL("http://" + parsed.host).hostname;
        } catch (e) {
          return parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e, !0;
        }
      return !1;
    }
    function parseWithStatus(uri2, opts) {
      let options = Object.assign({}, opts), parsed = {
        scheme: void 0,
        userinfo: void 0,
        host: "",
        port: void 0,
        path: "",
        query: void 0,
        fragment: void 0
      }, malformedAuthorityOrPort = !1, malformedPercentEncoding = !1, malformedSchemeSpecific = !1, malformedHost = !1, malformedIPLiteral = !1, malformedScheme = !1, isIP = !1;
      options.reference === "suffix" && (options.scheme ? uri2 = options.scheme + ":" + uri2 : uri2 = "//" + uri2);
      let authorityMatch = uri2.match(AUTHORITY_PREFIX);
      authorityMatch !== null && authorityMatch[1].indexOf("\\") !== -1 && (parsed.error = "URI authority must not contain a literal backslash.", malformedAuthorityOrPort = !0);
      let introducerMatch = uri2.match(AUTHORITY_INTRODUCER_REGION);
      if (introducerMatch !== null) {
        let region = introducerMatch[1], normalizedRegion = region.replace(/[\t\n\r]/g, "");
        normalizedRegion.length >= 2 && (normalizedRegion.slice(0, 2) !== "//" ? (parsed.error = parsed.error || "URI authority must not contain a literal backslash.", malformedAuthorityOrPort = !0) : region.length !== normalizedRegion.length && (parsed.error = parsed.error || "URI authority introducer must not contain whitespace.", malformedAuthorityOrPort = !0));
      }
      let matches = uri2.match(URI_PARSE);
      if (matches) {
        if (parsed.scheme = matches[1], parsed.userinfo = matches[3], parsed.host = matches[4], parsed.port = parseInt(matches[5], 10), parsed.path = matches[6] || "", parsed.query = matches[7], parsed.fragment = matches[8], parsed.scheme !== void 0) {
          let decodedScheme = unescape(parsed.scheme);
          VALID_SCHEME.test(decodedScheme) ? parsed.scheme = decodedScheme.toLowerCase() : (parsed.error = parsed.error || MALFORMED_SCHEME_ERROR, malformedScheme = !0);
        }
        malformedPercentEncoding = hasMalformedComponentPercentEncoding(matches), malformedPercentEncoding && (parsed.error = parsed.error || "URI contains malformed percent-encoding."), isNaN(parsed.port) && (parsed.port = matches[5]);
        let parseError = getParseError(parsed, matches);
        if (parseError !== void 0 && (parsed.error = parsed.error || parseError, malformedAuthorityOrPort = !0), parsed.host)
          if (isIPv4(parsed.host) === !1) {
            let bracketedIPLiteral = isIPLiteral(parsed.host), hasIPLiteralBracket = parsed.host.indexOf("[") !== -1 || parsed.host.indexOf("]") !== -1, ipv6result = normalizeIPv6(parsed.host);
            isIP = ipv6result.isIPV6 || ipv6result.isIPVFuture === !0, malformedIPLiteral = hasIPLiteralBracket && (!bracketedIPLiteral || ipv6result.error === !0), parsed.host = isIP ? ipv6result.host : ipv6result.host.toLowerCase(), malformedIPLiteral && (parsed.error = parsed.error || "URI host is malformed.", malformedAuthorityOrPort = !0);
          } else
            isIP = !0;
        parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path ? parsed.reference = "same-document" : parsed.scheme === void 0 ? parsed.reference = "relative" : parsed.fragment === void 0 ? parsed.reference = "absolute" : parsed.reference = "uri", options.reference && options.reference !== "suffix" && options.reference !== parsed.reference && (parsed.error = parsed.error || "URI is not a " + options.reference + " reference.");
        let schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
        if (malformedIPLiteral || (malformedHost = canonicalizeHost(parsed, options, schemeHandler, isIP)), uri2.indexOf("%") !== -1 && parsed.host !== void 0 && !malformedIPLiteral) {
          let host = isIP ? parsed.host : normalizePercentEncoding(parsed.host, !0);
          isIP || (host = normalizePercentEncoding(host.toLowerCase())), parsed.host = reescapeHostDelimiters(host, isIP);
        }
        (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) && (parsed.path && (parsed.path = normalizePathEncoding(parsed.path)), parsed.query && (parsed.query = normalizeQueryFragmentEncoding(parsed.query)), parsed.fragment && (parsed.fragment = normalizeQueryFragmentEncoding(parsed.fragment))), schemeHandler && schemeHandler.parse && (schemeHandler.parse(parsed, options), schemeHandler === SCHEMES.urn && parsed.nid === void 0 && (malformedSchemeSpecific = !0));
      } else
        parsed.error = parsed.error || "URI can not be parsed.";
      return { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme };
    }
    function parse9(uri2, opts) {
      return parseWithStatus(uri2, opts).parsed;
    }
    function normalizeString(uri2, opts) {
      return normalizeStringWithStatus(uri2, opts).normalized;
    }
    function normalizeStringWithStatus(uri2, opts) {
      let { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = parseWithStatus(uri2, opts);
      return {
        normalized: malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? uri2 : serialize(parsed, opts),
        malformedAuthorityOrPort,
        malformedPercentEncoding,
        malformedSchemeSpecific,
        malformedHost,
        malformedScheme
      };
    }
    function normalizeComparableURI(uri2, opts) {
      if (typeof uri2 != "string" && typeof uri2 != "object")
        return;
      let value3;
      try {
        value3 = typeof uri2 == "string" ? uri2 : serialize(uri2, opts);
      } catch {
        return;
      }
      let { normalized, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = normalizeStringWithStatus(value3, opts);
      return malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? void 0 : normalized;
    }
    var fastUri = {
      SCHEMES,
      normalize: normalize5,
      resolve: resolve9,
      resolveComponent,
      equal: equal2,
      serialize,
      parse: parse9
    };
    module.exports = fastUri;
    module.exports.default = fastUri;
    module.exports.fastUri = fastUri;
  }
});

// node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  "node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var uri2 = require_fast_uri();
    uri2.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri2;
  }
});

// node_modules/ajv/dist/core.js
var require_core = __commonJS({
  "node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: !0, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: !0, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: !0, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: !0, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: !0, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: !0, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: !0, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error(), ref_error_1 = require_ref_error(), rules_1 = require_rules(), compile_1 = require_compile(), codegen_2 = require_codegen(), resolve_1 = require_resolve(), dataType_1 = require_dataType(), util_1 = require_util(), $dataRefSchema = require_data(), uri_1 = require_uri(), defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"], EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a3, _b, _c2, _d2, _e, _f2, _g2, _h, _j, _k2, _l, _m, _o2, _p, _q, _r2, _s, _t2, _u2, _v, _w, _x3, _y3, _z, _0;
      let s = o.strict, _optz = (_a3 = o.code) === null || _a3 === void 0 ? void 0 : _a3.optimize, optimize = _optz === !0 || _optz === void 0 ? 1 : _optz || 0, regExp = (_c2 = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c2 !== void 0 ? _c2 : defaultRegExp, uriResolver = (_d2 = o.uriResolver) !== null && _d2 !== void 0 ? _d2 : uri_1.default;
      return {
        strictSchema: (_f2 = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f2 !== void 0 ? _f2 : !0,
        strictNumbers: (_h = (_g2 = o.strictNumbers) !== null && _g2 !== void 0 ? _g2 : s) !== null && _h !== void 0 ? _h : !0,
        strictTypes: (_k2 = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k2 !== void 0 ? _k2 : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o2 = o.strictRequired) !== null && _o2 !== void 0 ? _o2 : s) !== null && _p !== void 0 ? _p : !1,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r2 = o.loopEnum) !== null && _r2 !== void 0 ? _r2 : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : !0,
        messages: (_t2 = o.messages) !== null && _t2 !== void 0 ? _t2 : !0,
        inlineRefs: (_u2 = o.inlineRefs) !== null && _u2 !== void 0 ? _u2 : !0,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : !0,
        validateSchema: (_x3 = o.validateSchema) !== null && _x3 !== void 0 ? _x3 : !0,
        validateFormats: (_y3 = o.validateFormats) !== null && _y3 !== void 0 ? _y3 : !0,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : !0,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : !0,
        uriResolver
      };
    }
    var Ajv2 = class {
      constructor(opts = {}) {
        this.schemas = {}, this.refs = {}, this.formats = /* @__PURE__ */ Object.create(null), this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), opts = this.opts = { ...opts, ...requiredOptions(opts) };
        let { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines }), this.logger = getLogger(opts.logger);
        let formatOpt = opts.validateFormats;
        opts.validateFormats = !1, this.RULES = (0, rules_1.getRules)(), checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED"), checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn"), this._metaOpts = getMetaSchemaOptions.call(this), opts.formats && addInitialFormats.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), opts.keywords && addInitialKeywords.call(this, opts.keywords), typeof opts.meta == "object" && this.addMetaSchema(opts.meta), addInitialSchemas.call(this), opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        let { $data, meta: meta3, schemaId } = this.opts, _dataRefSchema = $dataRefSchema;
        schemaId === "id" && (_dataRefSchema = { ...$dataRefSchema }, _dataRefSchema.id = _dataRefSchema.$id, delete _dataRefSchema.$id), meta3 && $data && this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], !1);
      }
      defaultMeta() {
        let { meta: meta3, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta3 == "object" ? meta3[schemaId] || meta3 : void 0;
      }
      validate(schemaKeyRef, data3) {
        let v2;
        if (typeof schemaKeyRef == "string") {
          if (v2 = this.getSchema(schemaKeyRef), !v2)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else
          v2 = this.compile(schemaKeyRef);
        let valid = v2(data3);
        return "$async" in v2 || (this.errors = v2.errors), valid;
      }
      compile(schema, _meta) {
        let sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta3) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        let { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta3);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          let sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          $ref && !this.getSchema($ref) && await runCompileAsync.call(this, { $ref }, !0);
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            return checkLoaded.call(this, e), await loadMissingSchema.call(this, e.missingSchema), _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref2, missingRef }) {
          if (this.refs[ref2])
            throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
        }
        async function loadMissingSchema(ref2) {
          let _schema = await _loadSchema.call(this, ref2);
          this.refs[ref2] || await loadMetaSchema.call(this, _schema.$schema), this.refs[ref2] || this.addSchema(_schema, ref2, meta3);
        }
        async function _loadSchema(ref2) {
          let p = this._loading[ref2];
          if (p)
            return p;
          try {
            return await (this._loading[ref2] = loadSchema(ref2));
          } finally {
            delete this._loading[ref2];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key2, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (let sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id3;
        if (typeof schema == "object") {
          let { schemaId } = this.opts;
          if (id3 = schema[schemaId], id3 !== void 0 && typeof id3 != "string")
            throw new Error(`schema ${schemaId} must be string`);
        }
        return key2 = (0, resolve_1.normalizeId)(key2 || id3), this._checkUnique(key2), this.schemas[key2] = this._addSchema(schema, _meta, key2, _validateSchema, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key2, _validateSchema = this.opts.validateSchema) {
        return this.addSchema(schema, key2, !0, _validateSchema), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return !0;
        let $schema;
        if ($schema = schema.$schema, $schema !== void 0 && typeof $schema != "string")
          throw new Error("$schema must be a string");
        if ($schema = $schema || this.opts.defaultMeta || this.defaultMeta(), !$schema)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        let valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          let message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef2) {
        let sch;
        for (; typeof (sch = getSchEnv.call(this, keyRef2)) == "string"; )
          keyRef2 = sch;
        if (sch === void 0) {
          let { schemaId } = this.opts, root2 = new compile_1.SchemaEnv({ schema: {}, schemaId });
          if (sch = compile_1.resolveSchema.call(this, root2, keyRef2), !sch)
            return;
          this.refs[keyRef2] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp)
          return this._removeAllSchemas(this.schemas, schemaKeyRef), this._removeAllSchemas(this.refs, schemaKeyRef), this;
        switch (typeof schemaKeyRef) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            let sch = getSchEnv.call(this, schemaKeyRef);
            return typeof sch == "object" && this._cache.delete(sch.schema), delete this.schemas[schemaKeyRef], delete this.refs[schemaKeyRef], this;
          }
          case "object": {
            let cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id3 = schemaKeyRef[this.opts.schemaId];
            return id3 && (id3 = (0, resolve_1.normalizeId)(id3), delete this.schemas[id3], delete this.refs[id3]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (let def2 of definitions)
          this.addKeyword(def2);
        return this;
      }
      addKeyword(kwdOrDef, def2) {
        let keyword;
        if (typeof kwdOrDef == "string")
          keyword = kwdOrDef, typeof def2 == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), def2.keyword = keyword);
        else if (typeof kwdOrDef == "object" && def2 === void 0) {
          if (def2 = kwdOrDef, keyword = def2.keyword, Array.isArray(keyword) && !keyword.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (checkKeyword.call(this, keyword, def2), !def2)
          return (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd)), this;
        keywordMetaschema.call(this, def2);
        let definition3 = {
          ...def2,
          type: (0, dataType_1.getJSONTypes)(def2.type),
          schemaType: (0, dataType_1.getJSONTypes)(def2.schemaType)
        };
        return (0, util_1.eachItem)(keyword, definition3.type.length === 0 ? (k) => addRule.call(this, k, definition3) : (k) => definition3.type.forEach((t) => addRule.call(this, k, definition3, t))), this;
      }
      getKeyword(keyword) {
        let rule4 = this.RULES.all[keyword];
        return typeof rule4 == "object" ? rule4.definition : !!rule4;
      }
      // Remove keyword
      removeKeyword(keyword) {
        let { RULES } = this;
        delete RULES.keywords[keyword], delete RULES.all[keyword];
        for (let group2 of RULES.rules) {
          let i = group2.rules.findIndex((rule4) => rule4.keyword === keyword);
          i >= 0 && group2.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name2, format5) {
        return typeof format5 == "string" && (format5 = new RegExp(format5)), this.formats[name2] = format5, this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        return !errors || errors.length === 0 ? "No errors" : errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text4, msg) => text4 + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        let rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (let jsonPointer of keywordsJsonPointers) {
          let segments2 = jsonPointer.split("/").slice(1), keywords3 = metaSchema;
          for (let seg of segments2)
            keywords3 = keywords3[seg];
          for (let key2 in rules) {
            let rule4 = rules[key2];
            if (typeof rule4 != "object")
              continue;
            let { $data } = rule4.definition, schema = keywords3[key2];
            $data && schema && (keywords3[key2] = schemaOrData(schema));
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (let keyRef2 in schemas) {
          let sch = schemas[keyRef2];
          (!regex || regex.test(keyRef2)) && (typeof sch == "string" ? delete schemas[keyRef2] : sch && !sch.meta && (this._cache.delete(sch.schema), delete schemas[keyRef2]));
        }
      }
      _addSchema(schema, meta3, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id3, { schemaId } = this.opts;
        if (typeof schema == "object")
          id3 = schema[schemaId];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id3 || baseId);
        let localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        return sch = new compile_1.SchemaEnv({ schema, schemaId, meta: meta3, baseId, localRefs }), this._cache.set(sch.schema, sch), addSchema && !baseId.startsWith("#") && (baseId && this._checkUnique(baseId), this.refs[baseId] = sch), validateSchema && this.validateSchema(schema, !0), sch;
      }
      _checkUnique(id3) {
        if (this.schemas[id3] || this.refs[id3])
          throw new Error(`schema with key or id "${id3}" already exists`);
      }
      _compileSchemaEnv(sch) {
        if (sch.meta ? this._compileMetaSchema(sch) : compile_1.compileSchema.call(this, sch), !sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        let currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    Ajv2.ValidationError = validation_error_1.default;
    Ajv2.MissingRefError = ref_error_1.default;
    exports.default = Ajv2;
    function checkOptions(checkOpts, options, msg, log7 = "error") {
      for (let key2 in checkOpts) {
        let opt = key2;
        opt in options && this.logger[log7](`${msg}: option ${key2}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef2) {
      return keyRef2 = (0, resolve_1.normalizeId)(keyRef2), this.schemas[keyRef2] || this.refs[keyRef2];
    }
    function addInitialSchemas() {
      let optsSchemas = this.opts.schemas;
      if (optsSchemas)
        if (Array.isArray(optsSchemas))
          this.addSchema(optsSchemas);
        else
          for (let key2 in optsSchemas)
            this.addSchema(optsSchemas[key2], key2);
    }
    function addInitialFormats() {
      for (let name2 in this.opts.formats) {
        let format5 = this.opts.formats[name2];
        format5 && this.addFormat(name2, format5);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (let keyword in defs) {
        let def2 = defs[keyword];
        def2.keyword || (def2.keyword = keyword), this.addKeyword(def2);
      }
    }
    function getMetaSchemaOptions() {
      let metaOpts = { ...this.opts };
      for (let opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === !1)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def2) {
      let { RULES } = this;
      if ((0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      }), !!def2 && def2.$data && !("code" in def2 || "validate" in def2))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function addRule(keyword, definition3, dataType) {
      var _a3;
      let post = definition3?.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      let { RULES } = this, ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (ruleGroup || (ruleGroup = { type: dataType, rules: [] }, RULES.rules.push(ruleGroup)), RULES.keywords[keyword] = !0, !definition3)
        return;
      let rule4 = {
        keyword,
        definition: {
          ...definition3,
          type: (0, dataType_1.getJSONTypes)(definition3.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition3.schemaType)
        }
      };
      definition3.before ? addBeforeRule.call(this, ruleGroup, rule4, definition3.before) : ruleGroup.rules.push(rule4), RULES.all[keyword] = rule4, (_a3 = definition3.implements) === null || _a3 === void 0 || _a3.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule4, before) {
      let i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      i >= 0 ? ruleGroup.rules.splice(i, 0, rule4) : (ruleGroup.rules.push(rule4), this.logger.warn(`rule ${before} is not defined`));
    }
    function keywordMetaschema(def2) {
      let { metaSchema } = def2;
      metaSchema !== void 0 && (def2.$data && this.opts.$data && (metaSchema = schemaOrData(metaSchema)), def2.validateSchema = this.compile(metaSchema, !0));
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  }
});

// node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var def2 = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error(), code_1 = require_code2(), codegen_1 = require_codegen(), names_1 = require_names(), compile_1 = require_compile(), util_1 = require_util(), def2 = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        let { gen, schema: $ref, it } = cxt, { baseId, schemaEnv: env, validateName, opts, self: self2 } = it, { root: root2 } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root2.baseId)
          return callRootRef();
        let schOrEnv = compile_1.resolveRef.call(self2, root2, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root2)
            return callRef(cxt, validateName, env, env.$async);
          let rootName = gen.scopeValue("root", { ref: root2 });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root2, root2.$async);
        }
        function callValidate(sch) {
          let v2 = getValidate(cxt, sch);
          callRef(cxt, v2, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          let schName = gen.scopeValue("schema", opts.code.source === !0 ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch }), valid = gen.name("valid"), schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt), cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      let { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v2, sch, $async) {
      let { gen, it } = cxt, { allErrors, schemaEnv: env, opts } = it, passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      $async ? callAsyncRef() : callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        let valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v2, passCxt)}`), addEvaluatedFrom(v2), allErrors || gen.assign(valid, !0);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e)), addErrorsFrom(e), allErrors || gen.assign(valid, !1);
        }), cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v2, passCxt), () => addEvaluatedFrom(v2), () => addErrorsFrom(v2));
      }
      function addErrorsFrom(source4) {
        let errs = (0, codegen_1._)`${source4}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`), gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source4) {
        var _a3;
        if (!it.opts.unevaluated)
          return;
        let schEvaluated = (_a3 = sch?.validate) === null || _a3 === void 0 ? void 0 : _a3.evaluated;
        if (it.props !== !0)
          if (schEvaluated && !schEvaluated.dynamicProps)
            schEvaluated.props !== void 0 && (it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props));
          else {
            let props = gen.var("props", (0, codegen_1._)`${source4}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        if (it.items !== !0)
          if (schEvaluated && !schEvaluated.dynamicItems)
            schEvaluated.items !== void 0 && (it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items));
          else {
            let items = gen.var("items", (0, codegen_1._)`${source4}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
      }
    }
    exports.callRef = callRef;
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var id_1 = require_id(), ref_1 = require_ref(), core = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports.default = core;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), ops2 = codegen_1.operators, KWDs = {
      maximum: { okStr: "<=", ok: ops2.LTE, fail: ops2.GT },
      minimum: { okStr: ">=", ok: ops2.GTE, fail: ops2.LT },
      exclusiveMaximum: { okStr: "<", ok: ops2.LT, fail: ops2.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops2.GT, fail: ops2.LTE }
    }, error64 = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    }, def2 = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: !0,
      error: error64,
      code(cxt) {
        let { keyword, data: data3, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data3} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data3})`);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), error64 = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    }, def2 = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: !0,
      error: error64,
      code(cxt) {
        let { gen, data: data3, schemaCode, it } = cxt, prec = it.opts.multipleOfPrecision, res = gen.let("res"), invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data3}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    function ucs2length(str) {
      let len = str.length, length3 = 0, pos = 0, value3;
      for (; pos < len; )
        length3++, value3 = str.charCodeAt(pos++), value3 >= 55296 && value3 <= 56319 && pos < len && (value3 = str.charCodeAt(pos), (value3 & 64512) === 56320 && pos++);
      return length3;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), ucs2length_1 = require_ucs2length(), error64 = {
      message({ keyword, schemaCode }) {
        let comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    }, def2 = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: !0,
      error: error64,
      code(cxt) {
        let { keyword, data: data3, schemaCode, it } = cxt, op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT, len = it.opts.unicode === !1 ? (0, codegen_1._)`${data3}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data3})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var code_1 = require_code2(), util_1 = require_util(), codegen_1 = require_codegen(), error64 = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    }, def2 = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: !0,
      error: error64,
      code(cxt) {
        let { gen, data: data3, $data, schema, schemaCode, it } = cxt, u4 = it.opts.unicodeRegExp ? "u" : "";
        if ($data) {
          let { regExp } = it.opts.code, regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp), valid = gen.let("valid");
          gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u4}).test(${data3})`), () => gen.assign(valid, !1)), cxt.fail$data((0, codegen_1._)`!${valid}`);
        } else {
          let regExp = (0, code_1.usePattern)(cxt, schema);
          cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data3})`);
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), error64 = {
      message({ keyword, schemaCode }) {
        let comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    }, def2 = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: !0,
      error: error64,
      code(cxt) {
        let { keyword, data: data3, schemaCode } = cxt, op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data3}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var code_1 = require_code2(), codegen_1 = require_codegen(), util_1 = require_util(), error64 = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    }, def2 = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: !0,
      error: error64,
      code(cxt) {
        let { gen, schema, schemaCode, data: data3, $data, it } = cxt, { opts } = it;
        if (!$data && schema.length === 0)
          return;
        let useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors ? allErrorsMode() : exitOnErrorMode(), opts.strictRequired) {
          let props = cxt.parentSchema.properties, { definedProperties } = cxt.it;
          for (let requiredKey of schema)
            if (props?.[requiredKey] === void 0 && !definedProperties.has(requiredKey)) {
              let schemaPath = it.schemaEnv.baseId + it.errSchemaPath, msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
        }
        function allErrorsMode() {
          if (useLoop || $data)
            cxt.block$data(codegen_1.nil, loopAllRequired);
          else
            for (let prop of schema)
              (0, code_1.checkReportMissingProp)(cxt, prop);
        }
        function exitOnErrorMode() {
          let missing = gen.let("missing");
          if (useLoop || $data) {
            let valid = gen.let("valid", !0);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid)), cxt.ok(valid);
          } else
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing)), (0, code_1.reportMissingProp)(cxt, missing), gen.else();
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop }), gen.if((0, code_1.noPropertyInData)(gen, data3, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing }), gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data3, missing, opts.ownProperties)), gen.if((0, codegen_1.not)(valid), () => {
              cxt.error(), gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), error64 = {
      message({ keyword, schemaCode }) {
        let comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    }, def2 = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: !0,
      error: error64,
      code(cxt) {
        let { keyword, data: data3, schemaCode } = cxt, op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data3}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var equal2 = require_fast_deep_equal();
    equal2.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var dataType_1 = require_dataType(), codegen_1 = require_codegen(), util_1 = require_util(), equal_1 = require_equal(), error64 = {
      message: ({ params: { i, j: j2 } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j2} and ${i} are identical)`,
      params: ({ params: { i, j: j2 } }) => (0, codegen_1._)`{i: ${i}, j: ${j2}}`
    }, def2 = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: !0,
      error: error64,
      code(cxt) {
        let { gen, data: data3, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        let valid = gen.let("valid"), itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`), cxt.ok(valid);
        function validateUniqueItems() {
          let i = gen.let("i", (0, codegen_1._)`${data3}.length`), j2 = gen.let("j");
          cxt.setParams({ i, j: j2 }), gen.assign(valid, !0), gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j2));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j2) {
          let item = gen.name("item"), wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong), indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data3}[${i}]`), gen.if(wrongType, (0, codegen_1._)`continue`), itemTypes.length > 1 && gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`), gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j2, (0, codegen_1._)`${indices}[${item}]`), cxt.error(), gen.assign(valid, !1).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j2) {
          let eql = (0, util_1.useFunc)(gen, equal_1.default), outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j2} = ${i}; ${j2}--;`, () => gen.if((0, codegen_1._)`${eql}(${data3}[${i}], ${data3}[${j2}])`, () => {
            cxt.error(), gen.assign(valid, !1).break(outer);
          })));
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), equal_1 = require_equal(), error64 = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    }, def2 = {
      keyword: "const",
      $data: !0,
      error: error64,
      code(cxt) {
        let { gen, data: data3, $data, schemaCode, schema } = cxt;
        $data || schema && typeof schema == "object" ? cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data3}, ${schemaCode})`) : cxt.fail((0, codegen_1._)`${schema} !== ${data3}`);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), equal_1 = require_equal(), error64 = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    }, def2 = {
      keyword: "enum",
      schemaType: "array",
      $data: !0,
      error: error64,
      code(cxt) {
        let { gen, data: data3, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        let useLoop = schema.length >= it.opts.loopEnum, eql, getEql = () => eql ?? (eql = (0, util_1.useFunc)(gen, equal_1.default)), valid;
        if (useLoop || $data)
          valid = gen.let("valid"), cxt.block$data(valid, loopEnum);
        else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          let vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x3, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, !1), gen.forOf("v", schemaCode, (v2) => gen.if((0, codegen_1._)`${getEql()}(${data3}, ${v2})`, () => gen.assign(valid, !0).break()));
        }
        function equalCode(vSchema, i) {
          let sch = schema[i];
          return typeof sch == "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data3}, ${vSchema}[${i}])` : (0, codegen_1._)`${data3} === ${sch}`;
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var limitNumber_1 = require_limitNumber(), multipleOf_1 = require_multipleOf(), limitLength_1 = require_limitLength(), pattern_1 = require_pattern(), limitProperties_1 = require_limitProperties(), required_1 = require_required(), limitItems_1 = require_limitItems(), uniqueItems_1 = require_uniqueItems(), const_1 = require_const(), enum_1 = require_enum(), validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen(), util_1 = require_util(), error64 = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    }, def2 = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error: error64,
      code(cxt) {
        let { parentSchema, it } = cxt, { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      let { gen, schema, data: data3, keyword, it } = cxt;
      it.items = !0;
      let len = gen.const("len", (0, codegen_1._)`${data3}.length`);
      if (schema === !1)
        cxt.setParams({ len: items.length }), cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        let valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid)), cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid), it.allErrors || gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen(), util_1 = require_util(), code_1 = require_code2(), def2 = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        let { schema, it } = cxt;
        if (Array.isArray(schema))
          return validateTuple(cxt, "additionalItems", schema);
        it.items = !0, !(0, util_1.alwaysValidSchema)(it, schema) && cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      let { gen, parentSchema, data: data3, keyword, it } = cxt;
      checkStrictTuple(parentSchema), it.opts.unevaluated && schArr.length && it.items !== !0 && (it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items));
      let valid = gen.name("valid"), len = gen.const("len", (0, codegen_1._)`${data3}.length`);
      schArr.forEach((sch, i) => {
        (0, util_1.alwaysValidSchema)(it, sch) || (gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid)), cxt.ok(valid));
      });
      function checkStrictTuple(sch) {
        let { opts, errSchemaPath } = it, l = schArr.length, fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === !1);
        if (opts.strictTuples && !fullTuple) {
          let msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var items_1 = require_items(), def2 = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), code_1 = require_code2(), additionalItems_1 = require_additionalItems(), error64 = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    }, def2 = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error: error64,
      code(cxt) {
        let { schema, parentSchema, it } = cxt, { prefixItems } = parentSchema;
        it.items = !0, !(0, util_1.alwaysValidSchema)(it, schema) && (prefixItems ? (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems) : cxt.ok((0, code_1.validateArray)(cxt)));
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), error64 = {
      message: ({ params: { min: min4, max: max4 } }) => max4 === void 0 ? (0, codegen_1.str)`must contain at least ${min4} valid item(s)` : (0, codegen_1.str)`must contain at least ${min4} and no more than ${max4} valid item(s)`,
      params: ({ params: { min: min4, max: max4 } }) => max4 === void 0 ? (0, codegen_1._)`{minContains: ${min4}}` : (0, codegen_1._)`{minContains: ${min4}, maxContains: ${max4}}`
    }, def2 = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: !0,
      error: error64,
      code(cxt) {
        let { gen, schema, parentSchema, data: data3, it } = cxt, min4, max4, { minContains, maxContains } = parentSchema;
        it.opts.next ? (min4 = minContains === void 0 ? 1 : minContains, max4 = maxContains) : min4 = 1;
        let len = gen.const("len", (0, codegen_1._)`${data3}.length`);
        if (cxt.setParams({ min: min4, max: max4 }), max4 === void 0 && min4 === 0) {
          (0, util_1.checkStrictMode)(it, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
          return;
        }
        if (max4 !== void 0 && min4 > max4) {
          (0, util_1.checkStrictMode)(it, '"minContains" > "maxContains" is always invalid'), cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min4}`;
          max4 !== void 0 && (cond = (0, codegen_1._)`${cond} && ${len} <= ${max4}`), cxt.pass(cond);
          return;
        }
        it.items = !0;
        let valid = gen.name("valid");
        max4 === void 0 && min4 === 1 ? validateItems(valid, () => gen.if(valid, () => gen.break())) : min4 === 0 ? (gen.let(valid, !0), max4 !== void 0 && gen.if((0, codegen_1._)`${data3}.length > 0`, validateItemsWithCount)) : (gen.let(valid, !1), validateItemsWithCount()), cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          let schValid = gen.name("_valid"), count4 = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count4)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: !0
            }, _valid), block();
          });
        }
        function checkLimits(count4) {
          gen.code((0, codegen_1._)`${count4}++`), max4 === void 0 ? gen.if((0, codegen_1._)`${count4} >= ${min4}`, () => gen.assign(valid, !0).break()) : (gen.if((0, codegen_1._)`${count4} > ${max4}`, () => gen.assign(valid, !1).break()), min4 === 1 ? gen.assign(valid, !0) : gen.if((0, codegen_1._)`${count4} >= ${min4}`, () => gen.assign(valid, !0)));
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen(), util_1 = require_util(), code_1 = require_code2();
    exports.error = {
      message: ({ params: { property: property2, depsCount, deps } }) => {
        let property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property2} is present`;
      },
      params: ({ params: { property: property2, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property2},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def2 = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        let [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps), validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      let propertyDeps = {}, schemaDeps = {};
      for (let key2 in schema) {
        if (key2 === "__proto__")
          continue;
        let deps = Array.isArray(schema[key2]) ? propertyDeps : schemaDeps;
        deps[key2] = schema[key2];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      let { gen, data: data3, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      let missing = gen.let("missing");
      for (let prop in propertyDeps) {
        let deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        let hasProperty2 = (0, code_1.propertyInData)(gen, data3, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        }), it.allErrors ? gen.if(hasProperty2, () => {
          for (let depProp of deps)
            (0, code_1.checkReportMissingProp)(cxt, depProp);
        }) : (gen.if((0, codegen_1._)`${hasProperty2} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`), (0, code_1.reportMissingProp)(cxt, missing), gen.else());
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      let { gen, data: data3, keyword, it } = cxt, valid = gen.name("valid");
      for (let prop in schemaDeps)
        (0, util_1.alwaysValidSchema)(it, schemaDeps[prop]) || (gen.if(
          (0, code_1.propertyInData)(gen, data3, prop, it.opts.ownProperties),
          () => {
            let schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, !0)
          // TODO var
        ), cxt.ok(valid));
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), error64 = {
      message: "property name must be valid",
      params: ({ params: params2 }) => (0, codegen_1._)`{propertyName: ${params2.propertyName}}`
    }, def2 = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error: error64,
      code(cxt) {
        let { gen, schema, data: data3, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        let valid = gen.name("valid");
        gen.forIn("key", data3, (key2) => {
          cxt.setParams({ propertyName: key2 }), cxt.subschema({
            keyword: "propertyNames",
            data: key2,
            dataTypes: ["string"],
            propertyName: key2,
            compositeRule: !0
          }, valid), gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(!0), it.allErrors || gen.break();
          });
        }), cxt.ok(valid);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var code_1 = require_code2(), codegen_1 = require_codegen(), names_1 = require_names(), util_1 = require_util(), error64 = {
      message: "must NOT have additional properties",
      params: ({ params: params2 }) => (0, codegen_1._)`{additionalProperty: ${params2.additionalProperty}}`
    }, def2 = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: !0,
      trackErrors: !0,
      error: error64,
      code(cxt) {
        let { gen, schema, parentSchema, data: data3, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        let { allErrors, opts } = it;
        if (it.props = !0, opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
          return;
        let props = (0, code_1.allSchemaProperties)(parentSchema.properties), patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties(), cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data3, (key2) => {
            !props.length && !patProps.length ? additionalPropertyCode(key2) : gen.if(isAdditional(key2), () => additionalPropertyCode(key2));
          });
        }
        function isAdditional(key2) {
          let definedProp;
          if (props.length > 8) {
            let propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key2);
          } else props.length ? definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key2} === ${p}`)) : definedProp = codegen_1.nil;
          return patProps.length && (definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key2})`))), (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key2) {
          gen.code((0, codegen_1._)`delete ${data3}[${key2}]`);
        }
        function additionalPropertyCode(key2) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === !1) {
            deleteAdditional(key2);
            return;
          }
          if (schema === !1) {
            cxt.setParams({ additionalProperty: key2 }), cxt.error(), allErrors || gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            let valid = gen.name("valid");
            opts.removeAdditional === "failing" ? (applyAdditionalSchema(key2, valid, !1), gen.if((0, codegen_1.not)(valid), () => {
              cxt.reset(), deleteAdditional(key2);
            })) : (applyAdditionalSchema(key2, valid), allErrors || gen.if((0, codegen_1.not)(valid), () => gen.break()));
          }
        }
        function applyAdditionalSchema(key2, valid, errors) {
          let subschema = {
            keyword: "additionalProperties",
            dataProp: key2,
            dataPropType: util_1.Type.Str
          };
          errors === !1 && Object.assign(subschema, {
            compositeRule: !0,
            createErrors: !1,
            allErrors: !1
          }), cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var validate_1 = require_validate(), code_1 = require_code2(), util_1 = require_util(), additionalProperties_1 = require_additionalProperties(), def2 = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        let { gen, schema, parentSchema, data: data3, it } = cxt;
        it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0 && additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        let allProps = (0, code_1.allSchemaProperties)(schema);
        for (let prop of allProps)
          it.definedProperties.add(prop);
        it.opts.unevaluated && allProps.length && it.props !== !0 && (it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props));
        let properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
          return;
        let valid = gen.name("valid");
        for (let prop of properties)
          hasDefault(prop) ? applyPropertySchema(prop) : (gen.if((0, code_1.propertyInData)(gen, data3, prop, it.opts.ownProperties)), applyPropertySchema(prop), it.allErrors || gen.else().var(valid, !0), gen.endIf()), cxt.it.definedProperties.add(prop), cxt.ok(valid);
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var code_1 = require_code2(), codegen_1 = require_codegen(), util_1 = require_util(), util_2 = require_util(), def2 = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        let { gen, schema, data: data3, parentSchema, it } = cxt, { opts } = it, patterns = (0, code_1.allSchemaProperties)(schema), alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === !0))
          return;
        let checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties, valid = gen.name("valid");
        it.props !== !0 && !(it.props instanceof codegen_1.Name) && (it.props = (0, util_2.evaluatedPropsToName)(gen, it.props));
        let { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (let pat of patterns)
            checkProperties && checkMatchingProperties(pat), it.allErrors ? validateProperties(pat) : (gen.var(valid, !0), validateProperties(pat), gen.if(valid));
        }
        function checkMatchingProperties(pat) {
          for (let prop in checkProperties)
            new RegExp(pat).test(prop) && (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
        }
        function validateProperties(pat) {
          gen.forIn("key", data3, (key2) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key2})`, () => {
              let alwaysValid = alwaysValidPatterns.includes(pat);
              alwaysValid || cxt.subschema({
                keyword: "patternProperties",
                schemaProp: pat,
                dataProp: key2,
                dataPropType: util_2.Type.Str
              }, valid), it.opts.unevaluated && props !== !0 ? gen.assign((0, codegen_1._)`${props}[${key2}]`, !0) : !alwaysValid && !it.allErrors && gen.if((0, codegen_1.not)(valid), () => gen.break());
            });
          });
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var util_1 = require_util(), def2 = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: !0,
      code(cxt) {
        let { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        let valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, valid), cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var code_1 = require_code2(), def2 = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: !0,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), error64 = {
      message: "must match exactly one schema in oneOf",
      params: ({ params: params2 }) => (0, codegen_1._)`{passingSchemas: ${params2.passing}}`
    }, def2 = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: !0,
      error: error64,
      code(cxt) {
        let { gen, schema, parentSchema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        let schArr = schema, valid = gen.let("valid", !1), passing = gen.let("passing", null), schValid = gen.name("_valid");
        cxt.setParams({ passing }), gen.block(validateOneOf), cxt.result(valid, () => cxt.reset(), () => cxt.error(!0));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            (0, util_1.alwaysValidSchema)(it, sch) ? gen.var(schValid, !0) : schCxt = cxt.subschema({
              keyword: "oneOf",
              schemaProp: i,
              compositeRule: !0
            }, schValid), i > 0 && gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, !1).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else(), gen.if(schValid, () => {
              gen.assign(valid, !0), gen.assign(passing, i), schCxt && cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var util_1 = require_util(), def2 = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        let { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        let valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          let schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid), cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), util_1 = require_util(), error64 = {
      message: ({ params: params2 }) => (0, codegen_1.str)`must match "${params2.ifClause}" schema`,
      params: ({ params: params2 }) => (0, codegen_1._)`{failingKeyword: ${params2.ifClause}}`
    }, def2 = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: !0,
      error: error64,
      code(cxt) {
        let { gen, parentSchema, it } = cxt;
        parentSchema.then === void 0 && parentSchema.else === void 0 && (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        let hasThen = hasSchema(it, "then"), hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        let valid = gen.let("valid", !0), schValid = gen.name("_valid");
        if (validateIf(), cxt.reset(), hasThen && hasElse) {
          let ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause }), gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else hasThen ? gen.if(schValid, validateClause("then")) : gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        cxt.pass(valid, () => cxt.error(!0));
        function validateIf() {
          let schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: !0,
            createErrors: !1,
            allErrors: !1
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            let schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid), cxt.mergeValidEvaluated(schCxt, valid), ifClause ? gen.assign(ifClause, (0, codegen_1._)`${keyword}`) : cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      let schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var util_1 = require_util(), def2 = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        parentSchema.if === void 0 && (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var additionalItems_1 = require_additionalItems(), prefixItems_1 = require_prefixItems(), items_1 = require_items(), items2020_1 = require_items2020(), contains_1 = require_contains(), dependencies_1 = require_dependencies(), propertyNames_1 = require_propertyNames(), additionalProperties_1 = require_additionalProperties(), properties_1 = require_properties(), patternProperties_1 = require_patternProperties(), not_1 = require_not(), anyOf_1 = require_anyOf(), oneOf_1 = require_oneOf(), allOf_1 = require_allOf(), if_1 = require_if(), thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = !1) {
      let applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      return draft2020 ? applicator.push(prefixItems_1.default, items2020_1.default) : applicator.push(additionalItems_1.default, items_1.default), applicator.push(contains_1.default), applicator;
    }
    exports.default = getApplicator;
  }
});

// node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), error64 = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    }, def2 = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: !0,
      error: error64,
      code(cxt, ruleType) {
        let { gen, data: data3, $data, schema, schemaCode, it } = cxt, { opts, errSchemaPath, schemaEnv, self: self2 } = it;
        if (!opts.validateFormats)
          return;
        $data ? validate$DataFormat() : validateFormat();
        function validate$DataFormat() {
          let fmts = gen.scopeValue("formats", {
            ref: self2.formats,
            code: opts.code.formats
          }), fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`), fType = gen.let("fType"), format5 = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format5, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format5, fDef)), cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            return opts.strictSchema === !1 ? codegen_1.nil : (0, codegen_1._)`${schemaCode} && !${format5}`;
          }
          function invalidFmt() {
            let callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format5}(${data3}) : ${format5}(${data3}))` : (0, codegen_1._)`${format5}(${data3})`, validData = (0, codegen_1._)`(typeof ${format5} == "function" ? ${callFormat} : ${format5}.test(${data3}))`;
            return (0, codegen_1._)`${format5} && ${format5} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          let formatDef = self2.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === !0)
            return;
          let [fmtType, format5, fmtRef] = getFormat(formatDef);
          fmtType === ruleType && cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === !1) {
              self2.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            let code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0, fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
            return typeof fmtDef == "object" && !(fmtDef instanceof RegExp) ? [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`] : ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data3})`;
            }
            return typeof format5 == "function" ? (0, codegen_1._)`${fmtRef}(${data3})` : (0, codegen_1._)`${fmtRef}.test(${data3})`;
          }
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var format_1 = require_format(), format5 = [format_1.default];
    exports.default = format5;
  }
});
// End of bundle text, part 1 of 15
export { __commonJS, __export, __toESM, require_applicator, require_codegen, require_compile, require_core,
  require_core2, require_format2, require_ref_error, require_util, require_validate, require_validation,
  require_validation_error };
