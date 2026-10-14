// ToolsEnabled Data server, part 5 of 15: zod, the schema library (lines 19025-23876 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-04-zod.mjs";
import { __export } from "./tedata-server-01-ajv.mjs";
import { $ZodCheck, $ZodCheckEndsWith, $ZodCheckGreaterThan, $ZodCheckIncludes, $ZodCheckLengthEquals,
  $ZodCheckLessThan, $ZodCheckLowerCase, $ZodCheckMaxLength, $ZodCheckMaxSize, $ZodCheckMimeType, $ZodCheckMinLength,
  $ZodCheckMinSize, $ZodCheckMultipleOf, $ZodCheckOverwrite, $ZodCheckProperties, $ZodCheckProperty, $ZodCheckRegex,
  $ZodCheckSizeEquals, $ZodCheckStartsWith, $ZodCheckUpperCase, $ZodEmail, $ZodEncodeError, $ZodError, $ZodGUID,
  $ZodString, $ZodStringFormat, $ZodType, $ZodUUID, $brand, $constructor, BIGINT_FORMAT_RANGES, CONSTANT_CATCH, NEVER,
  NUMBER_FORMAT_RANGES, _decode, _decodeAsync, _encode, _encodeAsync, _parse, _parseAsync, _safeDecode,
  _safeDecodeAsync, _safeEncode, _safeEncodeAsync, _safeParse, _safeParseAsync, assignProp, base64, base64url, clone,
  config, constantCatch, core_exports2, currencyCode, domain, esc, flattenError, formatError, getEnumValues,
  globalConfig, hex, hostname, httpProtocol, installLazyProp, integer, isPlainObject, issue, jsonStringifyReplacer,
  mergeDefs, normalizeParams, number, objectType, own, parse, parseAsync, prettifyError, regexes_exports, safeParse,
  safeParseAsync, shallowClone, slugify, standardProps, toZod, treeifyError, util_exports, validate, validateAsync } from "./tedata-server-02-zod.mjs";
import { $ZodAny, $ZodArray, $ZodBase64, $ZodBase64URL, $ZodBigInt, $ZodBigIntFormat, $ZodBoolean, $ZodCIDRv4,
  $ZodCIDRv6, $ZodCUID, $ZodCUID2, $ZodCatch, $ZodCodec, $ZodCreditCard, $ZodCustom, $ZodCustomStringFormat, $ZodDate,
  $ZodDefault, $ZodDiscriminatedUnion, $ZodE164, $ZodEmoji, $ZodEnum, $ZodExactOptional, $ZodFile, $ZodFunction,
  $ZodIBAN, $ZodIPv4, $ZodIPv6, $ZodISODate, $ZodISODateTime, $ZodISODuration, $ZodISOTime, $ZodIntersection, $ZodJWT,
  $ZodKSUID, $ZodLazy, $ZodLiteral, $ZodMAC, $ZodMap, $ZodNaN, $ZodNanoID, $ZodNever, $ZodNonOptional, $ZodNull,
  $ZodNullable, $ZodNumber, $ZodNumberFormat, $ZodObject, $ZodObjectJIT, $ZodOptional, $ZodPipe, $ZodPrefault,
  $ZodPreprocess, $ZodPromise, $ZodReadonly, $ZodRecord, $ZodSet, $ZodSuccess, $ZodSymbol, $ZodTemplateLiteral,
  $ZodTransform, $ZodTuple, $ZodULID, $ZodURL, $ZodUndefined, $ZodUnion, $ZodUnknown, $ZodVoid, $ZodXID, $ZodXor,
  base64Charset, base64urlCharset, en_default2, getDiscriminatedOption, locales_exports, memoizer, mergeValues2 } from "./tedata-server-03-zod.mjs";
import { $input, $output, INVALID2, ZodCompileAsyncError, ZodCompileUnsupportedError, addConstant, addUserConstant,
  compile, compileChild, compileFn, dropsWhenAbsent, generateCheck, globalRegistry, newVar, pushIssue, registry,
  throwAsync, withParser } from "./tedata-server-04-zod.mjs";
// Bundle text, part 5 of 15
function generateLiteralCheck(doc, ctx, schema, accessor2) {
  let values3 = schema._zod.def.values;
  if (values3.length !== 1) {
    let literalSet = addConstant(ctx, new Set(values3));
    return doc.write(`if (!${literalSet}.has(${accessor2})) return INVALID;`), accessor2;
  }
  let value3 = values3[0];
  if (typeof value3 == "number" && Number.isNaN(value3)) {
    let literalSet = addConstant(ctx, new Set(values3));
    return doc.write(`if (!${literalSet}.has(${accessor2})) return INVALID;`), accessor2;
  }
  if (typeof value3 == "string")
    doc.write(`if (${accessor2} !== ${esc(value3)}) return INVALID;`);
  else if (typeof value3 == "number" || typeof value3 == "boolean")
    doc.write(`if (${accessor2} !== ${value3}) return INVALID;`);
  else if (value3 === null)
    doc.write(`if (${accessor2} !== null) return INVALID;`);
  else if (value3 === void 0)
    doc.write(`if (${accessor2} !== undefined) return INVALID;`);
  else if (typeof value3 == "bigint")
    doc.write(`if (${accessor2} !== ${value3}n) return INVALID;`);
  else
    throw new ZodCompileUnsupportedError(`literal type ${typeof value3}`);
  return accessor2;
}
function generateEnumCheck(doc, ctx, schema, accessor2) {
  let values3 = schema._zod.values;
  if (!values3)
    throw new ZodCompileUnsupportedError("enum schema without enumerated values");
  let enumSet = addConstant(ctx, values3);
  return doc.write(`if (!${enumSet}.has(${accessor2})) return INVALID;`), accessor2;
}
function generateWrapperCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def;
  return generateCheck(doc, ctx, def2.innerType, accessor2);
}
function generateDefaultCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def, defaultGetter = Object.getOwnPropertyDescriptor(schema._zod.def, "defaultValue") ? () => schema._zod.def.defaultValue : void 0;
  if (schema._zod.def.type === "prefault") {
    if (!defaultGetter)
      return generateCheck(doc, ctx, def2.innerType, accessor2);
    let defaultFn = addConstant(ctx, defaultGetter), inputVar = newVar(ctx);
    return doc.write(`let ${inputVar} = ${accessor2};`), doc.write(`if (${accessor2} === undefined) ${inputVar} = ${defaultFn}();`), generateCheck(doc, ctx, def2.innerType, inputVar);
  }
  let outputVar = newVar(ctx);
  if (defaultGetter) {
    let defaultFn = addConstant(ctx, defaultGetter), cloneFn = addConstant(ctx, shallowClone);
    doc.write(`let ${outputVar};`), doc.write(`if (${accessor2} === undefined) {`), doc.indented((d) => {
      d.write(`${outputVar} = ${cloneFn}(${defaultFn}());`);
    }), doc.write("} else {"), doc.indented((d) => {
      let innerOutput = generateCheck(d, ctx, def2.innerType, accessor2);
      d.write(`${outputVar} = ${innerOutput} === undefined ? ${cloneFn}(${defaultFn}()) : ${innerOutput};`);
    }), doc.write("}");
  } else
    doc.write(`let ${outputVar};`), doc.write(`if (${accessor2} !== undefined) {`), doc.indented((d) => {
      let innerOutput = generateCheck(d, ctx, def2.innerType, accessor2);
      d.write(`${outputVar} = ${innerOutput};`);
    }), doc.write("}");
  return outputVar;
}
function generateNonOptionalCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def, innerOutput = generateCheck(doc, ctx, def2.innerType, accessor2), outputVar = newVar(ctx);
  return doc.write(`const ${outputVar} = ${innerOutput};`), doc.write(`if (${outputVar} === undefined) return INVALID;`), outputVar;
}
function generateTupleCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def, items = def2.items, rest = def2.rest;
  doc.write(`if (!Array.isArray(${accessor2})) return INVALID;`);
  let optinStart = getTupleOptStart2(items, "optin"), optoutStart = getTupleOptStart2(items, "optout");
  rest ? doc.write(`if (${accessor2}.length < ${optinStart}) return INVALID;`) : doc.write(`if (${accessor2}.length < ${optinStart} || ${accessor2}.length > ${items.length}) return INVALID;`);
  let outputVar = newVar(ctx);
  doc.write(`const ${outputVar} = [];`);
  for (let i = 0; i < items.length; i++) {
    let itemSchema = items[i];
    if (i >= optoutStart)
      doc.write(`if (${outputVar}.length === ${i}) {`), doc.indented((d) => {
        d.write(`if (${i} < ${accessor2}.length) {`), d.indented((d2) => {
          let elemVar = newVar(ctx);
          d2.write(`const ${elemVar} = ${accessor2}[${i}];`);
          let elemOutput = compileChild(d2, ctx, itemSchema, elemVar);
          d2.write(`${outputVar}[${i}] = ${elemOutput};`);
        }), d.write("} else {"), d.indented((d2) => {
          if (dropsWhenAbsent(itemSchema)) {
            d2.write(`${outputVar}.length = ${i};`);
            return;
          }
          let elemVar = newVar(ctx), branchVar = newVar(ctx);
          d2.write(`const ${elemVar} = undefined;`), d2.write(`const ${branchVar} = (() => {`), d2.indented((d3) => {
            let elemOutput = compileChild(d3, ctx, itemSchema, elemVar);
            d3.write(`return ${elemOutput};`);
          }), d2.write("})();"), d2.write(`if (${branchVar} === INVALID || ${branchVar} === undefined) ${outputVar}.length = ${i};`), d2.write(`else ${outputVar}[${i}] = ${branchVar};`);
        }), d.write("}");
      }), doc.write("}");
    else {
      let elemVar = newVar(ctx);
      doc.write(`const ${elemVar} = ${accessor2}[${i}];`);
      let elemOutput = compileChild(doc, ctx, itemSchema, elemVar);
      doc.write(`${outputVar}[${i}] = ${elemOutput};`);
    }
  }
  if (rest) {
    let iVar = newVar(ctx), elemVar = newVar(ctx);
    doc.write(`for (let ${iVar} = ${items.length}; ${iVar} < ${accessor2}.length; ${iVar}++) {`), doc.indented((d) => {
      d.write(`const ${elemVar} = ${accessor2}[${iVar}];`);
      let elemOutput = compileChild(d, ctx, rest, elemVar);
      d.write(`${outputVar}[${iVar}] = ${elemOutput};`);
    }), doc.write("}");
  }
  return outputVar;
}
function getTupleOptStart2(items, key2) {
  for (let i = items.length - 1; i >= 0; i--)
    if (!(key2 === "optin" ? items[i]._zod.optin !== void 0 : items[i]._zod.optout === "optional"))
      return i + 1;
  return 0;
}
function generateUnionCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def, options = def2.options;
  if (def2.discriminator)
    return generateDiscriminatedUnionCheck(doc, ctx, def2, accessor2);
  if (def2.inclusive === !1)
    throw new ZodCompileUnsupportedError("exclusive unions (z.xor)");
  if (options.length === 0)
    return doc.write("return INVALID;"), accessor2;
  if (options.length === 1)
    return generateCheck(doc, ctx, options[0], accessor2);
  if (options.every((opt) => opt._zod.def.type === "literal" && !opt._zod.def.checks?.length)) {
    let values3 = new Set(options.flatMap((opt) => opt._zod.def.values)), valuesConst = addConstant(ctx, values3);
    return doc.write(`if (!${valuesConst}.has(${accessor2})) return INVALID;`), accessor2;
  }
  let outputVar = newVar(ctx);
  doc.write(`let ${outputVar};`);
  for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    i === 0 ? doc.write(`${outputVar} = (() => {`) : doc.write(`if (${outputVar} === INVALID) ${outputVar} = (() => {`), doc.indented((d) => {
      let branchOutput = generateCheck(d, ctx, opt, accessor2);
      d.write(`return ${branchOutput};`);
    }), doc.write("})();");
  }
  return doc.write(`if (${outputVar} === INVALID) return INVALID;`), outputVar;
}
function generateDiscriminatedUnionCheck(doc, ctx, def2, accessor2) {
  if (def2.unionFallback)
    throw new ZodCompileUnsupportedError("discriminated union with unionFallback");
  if (def2.options.length === 0)
    return doc.write("return INVALID;"), accessor2;
  let discVar = newVar(ctx), outputVar = newVar(ctx);
  doc.write(`const ${discVar} = ${accessor2}?.[${esc(def2.discriminator)}];`), doc.write(`let ${outputVar};`);
  let firstBranch = !0, claimed = /* @__PURE__ */ new Set();
  for (let option of def2.options) {
    let values3 = option._zod.propValues?.[def2.discriminator];
    if (!values3 || values3.size === 0)
      throw new ZodCompileUnsupportedError("discriminated union option without static discriminator values");
    for (let value3 of values3) {
      if (claimed.has(value3))
        throw new ZodCompileUnsupportedError(`duplicate discriminator value ${String(value3)}`);
      claimed.add(value3);
    }
    let conditions = Array.from(values3, (value3) => literalEquality(ctx, discVar, value3)), prefix = firstBranch ? "if" : "else if";
    doc.write(`${prefix} (${conditions.join(" || ")}) {`), doc.indented((d) => {
      let branchOutput = generateCheck(d, ctx, option, accessor2);
      d.write(`${outputVar} = ${branchOutput};`);
    }), doc.write("}"), firstBranch = !1;
  }
  return doc.write("else { return INVALID; }"), outputVar;
}
function literalEquality(ctx, accessor2, value3) {
  if (typeof value3 == "string")
    return `${accessor2} === ${esc(value3)}`;
  if (typeof value3 == "number")
    return Number.isNaN(value3) ? `Number.isNaN(${accessor2})` : `${accessor2} === ${value3}`;
  if (typeof value3 == "boolean")
    return `${accessor2} === ${value3}`;
  if (value3 === null)
    return `${accessor2} === null`;
  if (value3 === void 0)
    return `${accessor2} === undefined`;
  if (typeof value3 == "bigint")
    return `${accessor2} === ${value3}n`;
  if (typeof value3 == "symbol") {
    let symbolConst = addConstant(ctx, value3);
    return `${accessor2} === ${symbolConst}`;
  }
  throw new ZodCompileUnsupportedError(`literal discriminator value ${String(value3)}`);
}
function generateIntersectionCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def;
  ctx.definite = !1;
  let leftOutput = compileChild(doc, ctx, def2.left, accessor2), rightOutput = compileChild(doc, ctx, def2.right, accessor2), mergeConst = addConstant(ctx, mergeValues2), mergedVar = newVar(ctx);
  return doc.write(`const ${mergedVar} = ${mergeConst}(${leftOutput}, ${rightOutput});`), doc.write(`if (!${mergedVar}.valid) return INVALID;`), `${mergedVar}.data`;
}
function generateRecordCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def, isPlainObjectConst = addConstant(ctx, isPlainObject);
  doc.write(`if (!${isPlainObjectConst}(${accessor2})) return INVALID;`);
  let outputVar = newVar(ctx), kVar = newVar(ctx), valVar = newVar(ctx);
  doc.write(`const ${outputVar} = {};`);
  let recordDef = def2, keyValues = recordDef.partial ? void 0 : def2.keyType._zod.values;
  if (keyValues) {
    let inputKeys = [];
    for (let key2 of keyValues) {
      if (!(typeof key2 == "string" || typeof key2 == "number" || typeof key2 == "symbol"))
        throw new ZodCompileUnsupportedError(`record key value ${String(key2)}`);
      let inputKey = typeof key2 == "number" ? key2.toString() : key2;
      if (inputKey === "__proto__")
        throw new ZodCompileUnsupportedError('record key "__proto__"');
      inputKeys.push(inputKey);
      let keyConst = addConstant(ctx, key2), outKey = generateCheck(doc, ctx, def2.keyType, keyConst), valueVar = newVar(ctx);
      doc.write(`const ${valueVar} = ${accessor2}[${literalPropertyKey(ctx, inputKey)}];`);
      let valOutput = compileChild(doc, ctx, def2.valueType, valueVar);
      doc.write(`${outputVar}[${outKey}] = ${valOutput};`);
    }
    let knownKeysConst = addConstant(ctx, new Set(inputKeys));
    return doc.write(`for (const ${kVar} in ${accessor2}) {`), doc.indented((d) => {
      d.write(`if (${knownKeysConst}.has(${kVar})) continue;`), recordDef.mode === "loose" ? d.write(`if (${kVar} !== "__proto__") ${outputVar}[${kVar}] = ${accessor2}[${kVar}];`) : d.write("return INVALID;");
    }), doc.write("}"), outputVar;
  }
  let keyDef = def2.keyType._zod.def;
  if (!(keyDef.type === "string" && keyDef.format === void 0 && !keyDef.coerce && (keyDef.checks?.length ?? 0) === 0)) {
    let isLoose = def2.mode === "loose", keyFn = compileFn(def2.keyType);
    keyFn.definite === !1 && (ctx.definite = !1);
    let keyFast = addConstant(ctx, keyFn), numericConst = addConstant(ctx, number), outKeyVar = newVar(ctx);
    return emitOwnKeys(doc, ctx, accessor2, kVar, (d) => {
      d.write(`let ${outKeyVar} = ${keyFast}(${kVar});`), d.write(`if (${outKeyVar} === INVALID && typeof ${kVar} === "string" && ${numericConst}.test(${kVar})) ${outKeyVar} = ${keyFast}(Number(${kVar}));`), isLoose ? d.write(`if (${outKeyVar} === INVALID) { ${outputVar}[${kVar}] = ${accessor2}[${kVar}]; continue; }`) : d.write(`if (${outKeyVar} === INVALID) return INVALID;`), d.write(`if (${outKeyVar} === "__proto__") continue;`);
      let valueVar = newVar(ctx);
      d.write(`const ${valueVar} = ${accessor2}[${kVar}];`);
      let valOutput = compileChild(d, ctx, def2.valueType, valueVar);
      d.write(`${outputVar}[${outKeyVar}] = ${valOutput};`);
    }), outputVar;
  }
  return emitOwnKeys(doc, ctx, accessor2, kVar, (d) => {
    d.write(`const ${valVar} = ${accessor2}[${kVar}];`);
    let valOutput = compileChild(d, ctx, def2.valueType, valVar);
    d.write(`${outputVar}[${kVar}] = ${valOutput};`);
  }, "return INVALID;"), outputVar;
}
function emitOwnKeys(doc, ctx, accessor2, kVar, body, onSymbol) {
  let propIsEnumerableConst = addConstant(ctx, Object.prototype.propertyIsEnumerable), symsVar = newVar(ctx), keysVar = newVar(ctx), iVar = newVar(ctx);
  doc.write(`const ${symsVar} = Object.getOwnPropertySymbols(${accessor2});`), doc.write(`const ${keysVar} = Object.getOwnPropertyNames(${accessor2});`), doc.write(`for (let ${iVar} = 0; ${iVar} < ${keysVar}.length; ${iVar}++) {`), doc.indented((d) => {
    d.write(`const ${kVar} = ${keysVar}[${iVar}];`), d.write(`if (${kVar} === "__proto__" || !${propIsEnumerableConst}.call(${accessor2}, ${kVar})) continue;`), body(d);
  }), doc.write("}"), doc.write(`for (let ${iVar} = 0; ${iVar} < ${symsVar}.length; ${iVar}++) {`), doc.indented((d) => {
    d.write(`const ${kVar} = ${symsVar}[${iVar}];`), d.write(`if (!${propIsEnumerableConst}.call(${accessor2}, ${kVar})) continue;`), onSymbol ? d.write(onSymbol) : body(d);
  }), doc.write("}");
}
function literalPropertyKey(ctx, key2) {
  return typeof key2 == "string" ? esc(key2) : addConstant(ctx, key2);
}
function generateMapCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def;
  doc.write(`if (!(${accessor2} instanceof Map)) return INVALID;`);
  let outputVar = newVar(ctx), kVar = newVar(ctx), valVar = newVar(ctx);
  return doc.write(`const ${outputVar} = new Map();`), doc.write(`for (const [${kVar}, ${valVar}] of ${accessor2}) {`), doc.indented((d) => {
    let keyOutput = generateCheck(d, ctx, def2.keyType, kVar), valOutput = generateCheck(d, ctx, def2.valueType, valVar);
    d.write(`${outputVar}.set(${keyOutput}, ${valOutput});`);
  }), doc.write("}"), outputVar;
}
function generateSetCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def;
  doc.write(`if (!(${accessor2} instanceof Set)) return INVALID;`);
  let outputVar = newVar(ctx), valVar = newVar(ctx);
  return doc.write(`const ${outputVar} = new Set();`), doc.write(`for (const ${valVar} of ${accessor2}) {`), doc.indented((d) => {
    let valOutput = generateCheck(d, ctx, def2.valueType, valVar);
    d.write(`${outputVar}.add(${valOutput});`);
  }), doc.write("}"), outputVar;
}
function generateFileCheck(doc, accessor2) {
  return doc.write(`if (!(${accessor2} instanceof File)) return INVALID;`), accessor2;
}
function generateTemplateLiteralCheck(doc, ctx, schema, accessor2) {
  doc.write(`if (typeof ${accessor2} !== "string") return INVALID;`);
  let pattern = schema._zod.pattern;
  if (pattern) {
    let patternConst = addConstant(ctx, pattern);
    doc.write(`${patternConst}.lastIndex = 0;`), doc.write(`if (!${patternConst}.test(${accessor2})) return INVALID;`);
  }
  return accessor2;
}
function generateLazyCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def, getterConst = addUserConstant(ctx, def2.getter), cacheConst = addConstant(ctx, { parser: null });
  doc.write(`if (!${cacheConst}.parser) {`), doc.indented((d) => {
    d.write(`const inner = ${getterConst}();`), d.write(`${cacheConst}.parser = function(input) {`), d.indented((d2) => {
      d2.write("const result = inner._zod.run({ value: input, issues: [] }, {});"), d2.write("return result.issues.length === 0 ? result.value : INVALID;");
    }), d.write("};");
  }), doc.write("}");
  let outputVar = newVar(ctx);
  return doc.write(`const ${outputVar} = ${cacheConst}.parser(${accessor2});`), doc.write(`if (${outputVar} === INVALID) return INVALID;`), outputVar;
}
function generatePipeCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def, inputOutput = generateCheck(doc, ctx, def2.in, accessor2);
  if (def2.transform) {
    if (isAsyncFunction(def2.transform))
      throw new ZodCompileAsyncError("z.compile: async transforms in pipes are not supported");
    let transformFn = def2.transform, helperConst = addUserConstant(ctx, (value3) => {
      let fakePayload = { value: value3, issues: [], addIssue: pushIssue }, result = transformFn(value3, fakePayload);
      return result instanceof Promise ? INVALID2 : fakePayload.issues.length === 0 ? result : INVALID2;
    }), transformedVar = newVar(ctx);
    return doc.write(`const ${transformedVar} = ${helperConst}(${inputOutput});`), doc.write(`if (${transformedVar} === INVALID) return INVALID;`), generateCheck(doc, ctx, def2.out, transformedVar);
  } else
    return generateCheck(doc, ctx, def2.out, inputOutput);
}
function isAsyncFunction(fn) {
  return typeof fn == "function" && (fn.constructor.name === "AsyncFunction" || fn[Symbol.toStringTag] === "AsyncFunction");
}
function generateCustomCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def;
  if (def2.fn) {
    if (isAsyncFunction(def2.fn))
      throw new ZodCompileAsyncError("z.compile: async custom predicates are not supported");
    let fnConst = addUserConstant(ctx, def2.fn), throwAsyncConst = addConstant(ctx, throwAsync), resVar = newVar(ctx);
    doc.write(`const ${resVar} = ${fnConst}(${accessor2});`), doc.write(`if (${resVar} instanceof Promise) ${throwAsyncConst}();`), doc.write(`if (!${resVar}) return INVALID;`);
  } else
    throw new ZodCompileUnsupportedError("custom schema without a predicate function");
  return accessor2;
}
function runtimeCatch(innerSchema, catchValue, value3) {
  let result = innerSchema._zod.run({ value: value3, issues: [] }, {});
  if (result && typeof result.then == "function")
    return INVALID2;
  let r = result;
  return r.issues.length === 0 ? r.value : catchValue();
}
function generateCatchCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def;
  if (!def2.catchValue[CONSTANT_CATCH])
    throw new ZodCompileUnsupportedError("catch with a callback (only a constant catch value compiles)", !1);
  let outputVar = newVar(ctx);
  doc.write(`let ${outputVar} = (() => {`), doc.indented((d) => {
    let innerOut = compileChild(d, ctx, def2.innerType, accessor2);
    d.write(`return ${innerOut};`);
  }), doc.write("})();");
  let innerConst = addConstant(ctx, def2.innerType), catchConst = addUserConstant(ctx, def2.catchValue), catchHelperConst = addConstant(ctx, runtimeCatch);
  return doc.write(`if (${outputVar} === INVALID) {`), doc.indented((d) => {
    d.write(`${outputVar} = ${catchHelperConst}(${innerConst}, ${catchConst}, ${accessor2});`), d.write(`if (${outputVar} === INVALID) return INVALID;`);
  }), doc.write("}"), outputVar;
}
function generateTransformCheck(doc, ctx, schema, accessor2) {
  let def2 = schema._zod.def;
  if (def2.transform) {
    if (isAsyncFunction(def2.transform))
      throw new ZodCompileAsyncError("z.compile: async transforms are not supported");
    let transformFn = def2.transform, helperConst = addUserConstant(ctx, (value3) => {
      let fakePayload = { value: value3, issues: [], addIssue: pushIssue }, result = transformFn(value3, fakePayload);
      return result instanceof Promise ? INVALID2 : fakePayload.issues.length === 0 ? result : INVALID2;
    }), outputVar = newVar(ctx);
    return doc.write(`const ${outputVar} = ${helperConst}(${accessor2});`), doc.write(`if (${outputVar} === INVALID) return INVALID;`), outputVar;
  }
  return accessor2;
}

// node_modules/zod/v4/core/api.js
function snapshotChecks(def2) {
  return def2.checks && (def2.checks = [...def2.checks]), def2;
}
// @__NO_SIDE_EFFECTS__
function _string(Class2, params2) {
  return new Class2(snapshotChecks({ type: "string", ...normalizeParams(params2) }));
}
// @__NO_SIDE_EFFECTS__
function _coercedString(Class2, params2) {
  return new Class2(snapshotChecks({ type: "string", coerce: !0, ...normalizeParams(params2) }));
}
// @__NO_SIDE_EFFECTS__
function _email(Class2, params2) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _guid(Class2, params2) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class2, params2) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class2, params2) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class2, params2) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class2, params2) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _url(Class2, params2) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _emoji2(Class2, params2) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class2, params2) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid(Class2, params2) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class2, params2) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class2, params2) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _xid(Class2, params2) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class2, params2) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class2, params2) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class2, params2) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _mac(Class2, params2) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class2, params2) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class2, params2) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64(Class2, params2) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class2, params2) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _e164(Class2, params2) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _creditCard(Class2, params2) {
  return new Class2({
    type: "string",
    format: "credit_card",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _iban(Class2, params2) {
  return new Class2({
    type: "string",
    format: "iban",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class2, params2) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...normalizeParams(params2)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class2, params2) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class2, params2) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class2, params2) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class2, params2) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _number(Class2, params2) {
  return new Class2(snapshotChecks({ type: "number", checks: [], ...normalizeParams(params2) }));
}
// @__NO_SIDE_EFFECTS__
function _coercedNumber(Class2, params2) {
  return new Class2(snapshotChecks({ type: "number", coerce: !0, checks: [], ...normalizeParams(params2) }));
}
// @__NO_SIDE_EFFECTS__
function _int(Class2, params2) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _float32(Class2, params2) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "float32",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _float64(Class2, params2) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "float64",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _int32(Class2, params2) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "int32",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint32(Class2, params2) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "uint32",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class2, params2) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBoolean(Class2, params2) {
  return new Class2({
    type: "boolean",
    coerce: !0,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _bigint(Class2, params2) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedBigint(Class2, params2) {
  return new Class2({
    type: "bigint",
    coerce: !0,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _int64(Class2, params2) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: !1,
    format: "int64",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _uint64(Class2, params2) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: !1,
    format: "uint64",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _symbol(Class2, params2) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _undefined2(Class2, params2) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _null2(Class2, params2) {
  return new Class2({
    type: "null",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function _never(Class2, params2) {
  return new Class2({
    type: "never",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _void(Class2, params2) {
  return new Class2({
    type: "void",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _date(Class2, params2) {
  return new Class2({
    type: "date",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _coercedDate(Class2, params2) {
  return new Class2({
    type: "date",
    coerce: !0,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _nan(Class2, params2) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _lt(value3, params2) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params2),
    value: value3,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function _lte(value3, params2) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params2),
    value: value3,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function _gt(value3, params2) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params2),
    value: value3,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function _gte(value3, params2) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params2),
    value: value3,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function _positive(params2) {
  return /* @__PURE__ */ _gt(0, params2);
}
// @__NO_SIDE_EFFECTS__
function _negative(params2) {
  return /* @__PURE__ */ _lt(0, params2);
}
// @__NO_SIDE_EFFECTS__
function _nonpositive(params2) {
  return /* @__PURE__ */ _lte(0, params2);
}
// @__NO_SIDE_EFFECTS__
function _nonnegative(params2) {
  return /* @__PURE__ */ _gte(0, params2);
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value3, params2) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params2),
    value: value3
  });
}
// @__NO_SIDE_EFFECTS__
function _maxSize(maximum, params2) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params2),
    maximum
  });
}
// @__NO_SIDE_EFFECTS__
function _minSize(minimum, params2) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params2),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _size(size, params2) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params2),
    size
  });
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params2) {
  return new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params2),
    maximum
  });
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params2) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params2),
    minimum
  });
}
// @__NO_SIDE_EFFECTS__
function _length(length3, params2) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params2),
    length: length3
  });
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params2) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params2),
    pattern
  });
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params2) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params2) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params2) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params2),
    includes
  });
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params2) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params2),
    prefix
  });
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params2) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params2),
    suffix
  });
}
// @__NO_SIDE_EFFECTS__
function _property(property2, schema, params2) {
  return new $ZodCheckProperty({
    check: "property",
    property: property2,
    schema,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _properties(shape2, params2) {
  return new $ZodCheckProperties({
    check: "properties",
    shape: shape2,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _mime(types, params2) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
// @__NO_SIDE_EFFECTS__
function _normalize(form2) {
  return /* @__PURE__ */ _overwrite((input2) => input2.normalize(form2));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
  return /* @__PURE__ */ _overwrite((input2) => input2.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
  return /* @__PURE__ */ _overwrite((input2) => input2.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
  return /* @__PURE__ */ _overwrite((input2) => input2.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
  return /* @__PURE__ */ _overwrite((input2) => slugify(input2));
}
// @__NO_SIDE_EFFECTS__
function _array(Class2, element3, params2) {
  return new Class2({
    type: "array",
    element: element3,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _union(Class2, options, params2) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params2)
  });
}
function _xor(Class2, options, params2) {
  return new Class2({
    type: "union",
    options,
    inclusive: !1,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _discriminatedUnion(Class2, discriminator, options, params2) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
// @__NO_SIDE_EFFECTS__
function _tuple(Class2, items, _paramsOrRest, _params) {
  let hasRest = _paramsOrRest instanceof $ZodType, params2 = hasRest ? _params : _paramsOrRest, rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _record(Class2, keyType, valueType, params2) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _map(Class2, keyType, valueType, params2) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _set(Class2, valueType, params2) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _enum(Class2, values3, params2) {
  let entries2 = Array.isArray(values3) ? Object.fromEntries(values3.map((v2) => [v2, v2])) : values3;
  return new Class2({
    type: "enum",
    entries: entries2,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _nativeEnum(Class2, entries2, params2) {
  return new Class2({
    type: "enum",
    entries: entries2,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _literal(Class2, value3, params2) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value3) ? value3 : [value3],
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _file(Class2, params2) {
  return new Class2({
    type: "file",
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
// @__NO_SIDE_EFFECTS__
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue == "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
// @__NO_SIDE_EFFECTS__
function _nonoptional(Class2, innerType, params2) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue == "function" ? catchValue : constantCatch(catchValue)
  });
}
// @__NO_SIDE_EFFECTS__
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
// @__NO_SIDE_EFFECTS__
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _templateLiteral(Class2, parts, params2) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params2)
  });
}
// @__NO_SIDE_EFFECTS__
function _lazy(Class2, getter3) {
  return new Class2({
    type: "lazy",
    getter: getter3
  });
}
// @__NO_SIDE_EFFECTS__
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
// @__NO_SIDE_EFFECTS__
function _custom(Class2, fn, _params) {
  let norm = normalizeParams(_params);
  return norm.abort ?? (norm.abort = !0), new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
}
// @__NO_SIDE_EFFECTS__
function _refine(Class2, fn, _params) {
  return new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params2) {
  let ch2 = /* @__PURE__ */ _check((payload) => (payload.addIssue = (issue2) => {
    if (typeof issue2 == "string")
      payload.issues.push(issue(issue2, payload.value, ch2._zod.def));
    else {
      let _issue = issue2;
      _issue.fatal && (_issue.continue = !1), _issue.code ?? (_issue.code = "custom"), "input" in _issue || (_issue.input = payload.value), _issue.inst ?? (_issue.inst = ch2), _issue.continue ?? (_issue.continue = !ch2._zod.def.abort), payload.issues.push(issue(_issue));
    }
  }, fn(payload.value, payload)), params2);
  return ch2;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params2) {
  let ch2 = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params2)
  });
  return ch2._zod.check = fn, ch2;
}
// @__NO_SIDE_EFFECTS__
function describe(description2) {
  let ch2 = new $ZodCheck({ check: "describe" });
  return ch2._zod.onattach = [
    (inst) => {
      let existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description: description2 });
    }
  ], ch2._zod.check = () => {
  }, ch2;
}
// @__NO_SIDE_EFFECTS__
function meta(metadata2) {
  let ch2 = new $ZodCheck({ check: "meta" });
  return ch2._zod.onattach = [
    (inst) => {
      let existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata2 });
    }
  ], ch2._zod.check = () => {
  }, ch2;
}
// @__NO_SIDE_EFFECTS__
function _stringbool(Classes, _params) {
  let params2 = normalizeParams(_params), truthyArray = params2.truthy ?? ["true", "1", "yes", "on", "y", "enabled"], falsyArray = params2.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  params2.case !== "sensitive" && (truthyArray = truthyArray.map((v2) => typeof v2 == "string" ? v2.toLowerCase() : v2), falsyArray = falsyArray.map((v2) => typeof v2 == "string" ? v2.toLowerCase() : v2));
  let truthySet = new Set(truthyArray), falsySet = new Set(falsyArray), _Codec = Classes.Codec ?? $ZodCodec, _Boolean = Classes.Boolean ?? $ZodBoolean, _String = Classes.String ?? $ZodString, stringSchema = new _String({ type: "string", error: params2.error }), booleanSchema = new _Boolean({ type: "boolean", error: params2.error }), codec2 = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: ((input2, payload) => {
      let data3 = input2;
      return params2.case !== "sensitive" && (data3 = data3.toLowerCase()), truthySet.has(data3) ? !0 : falsySet.has(data3) ? !1 : (payload.issues.push({
        code: "invalid_value",
        expected: "stringbool",
        values: [...truthySet, ...falsySet],
        input: payload.value,
        inst: codec2,
        continue: !1
      }), {});
    }),
    reverseTransform: ((input2, _payload) => input2 === !0 ? truthyArray[0] || "true" : falsyArray[0] || "false"),
    error: params2.error
  });
  return codec2._zod.bag.truthy = truthyArray, codec2._zod.bag.falsy = falsyArray, codec2._zod.bag.case = params2.case ?? "insensitive", codec2;
}
// @__NO_SIDE_EFFECTS__
function _stringFormat(Class2, format5, fnOrRegex, _params = {}) {
  let params2 = normalizeParams(_params), def2 = {
    check: "string_format",
    type: "string",
    format: format5,
    fn: typeof fnOrRegex == "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params2
  };
  return fnOrRegex instanceof RegExp && (def2.pattern = fnOrRegex), new Class2(def2);
}

// node_modules/zod/v4/core/to-json-schema.js
function assignProps(target3, ...sources) {
  for (let source4 of sources)
    for (let key2 of Reflect.ownKeys(source4))
      Object.prototype.propertyIsEnumerable.call(source4, key2) && assignProp(target3, key2, source4[key2]);
  return target3;
}
function initializeContext(params2) {
  let target3 = params2?.target ?? "draft-2020-12";
  return target3 === "draft-4" && (target3 = "draft-04"), target3 === "draft-7" && (target3 = "draft-07"), {
    processors: params2.processors ?? {},
    metadataRegistry: params2?.metadata ?? globalRegistry,
    target: target3,
    unrepresentable: params2?.unrepresentable ?? "throw",
    override: params2?.override ?? (() => {
    }),
    io: params2?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    sharedDefsExtractedFor: void 0,
    sharedEmitDoneFor: void 0,
    cycles: params2?.cycles ?? "ref",
    reused: params2?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: params2?.external ?? void 0
  };
}
function handleUnrepresentable(schema, ctx, json3, params2, message) {
  let result = typeof ctx.unrepresentable == "function" ? ctx.unrepresentable({ zodSchema: schema, path: params2.path, message }) : ctx.unrepresentable;
  if (result === "any")
    return !1;
  if (result === void 0 || result === "throw")
    throw new Error(message);
  return Object.assign(json3, result), !0;
}
function processSchema(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a3;
  let def2 = schema._zod.def, seen = ctx.seen.get(schema);
  if (seen)
    return seen.count++, _params.schemaPath.includes(schema) && (seen.cycle = _params.path), seen.schema;
  let result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
  ctx.seen.set(schema, result), ctx.sharedDefsExtractedFor = void 0, ctx.sharedEmitDoneFor = void 0;
  let overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema)
    result.schema = overrideSchema;
  else {
    let params2 = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema)
      schema._zod.processJSONSchema(ctx, result.schema, params2);
    else {
      let _json = result.schema, processor = ctx.processors[def2.type];
      if (!processor)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def2.type}`);
      processor(schema, ctx, _json, params2);
    }
    let parent = schema._zod.parent;
    parent && (result.ref || (result.ref = parent), processSchema(parent, ctx, params2), ctx.seen.get(parent).isParent = !0);
  }
  let meta3 = ctx.metadataRegistry.get(schema);
  return meta3 && assignProps(result.schema, meta3), ctx.io === "input" && isTransforming(schema) && (delete result.schema.examples, delete result.schema.default), ctx.io === "input" && "_prefault" in result.schema && ((_a3 = result.schema).default ?? (_a3.default = result.schema._prefault)), delete result.schema._prefault, ctx.seen.get(schema).schema;
}
function encodeJSONPointerSegment(segment) {
  return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
  let root2 = ctx.seen.get(schema);
  if (!root2)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external)
    return;
  let idToSchema = /* @__PURE__ */ new Map();
  for (let entry2 of ctx.seen.entries()) {
    let id3 = ctx.metadataRegistry.get(entry2[0])?.id;
    if (id3) {
      let existing = idToSchema.get(id3);
      if (existing && existing !== entry2[0])
        throw new Error(`Duplicate schema id "${id3}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      idToSchema.set(id3, entry2[0]);
    }
  }
  let makeURI = (entry2) => {
    let defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      let externalId = ctx.external.registry.get(entry2[0])?.id, uriGenerator = ctx.external.uri ?? ((id4) => id4);
      if (externalId)
        return { ref: uriGenerator(externalId) };
      let id3 = entry2[1].defId ?? entry2[1].schema.id ?? `schema${ctx.counter++}`;
      return entry2[1].defId = id3, { defId: id3, ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id3)}` };
    }
    let uriPrefix = "#", defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    if (entry2[1] === root2 && !entry2[1].schema.id)
      return { ref: uriPrefix };
    let defId = entry2[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + encodeJSONPointerSegment(defId) };
  }, extractToDef = (entry2) => {
    if (entry2[1].schema.$ref)
      return;
    let seen = entry2[1], { ref: ref2, defId } = makeURI(entry2);
    seen.def = { ...seen.schema }, defId && (seen.defId = defId);
    let schema2 = seen.schema;
    for (let key2 in schema2)
      delete schema2[key2];
    schema2.$ref = ref2;
  };
  if (ctx.cycles === "throw")
    for (let entry2 of ctx.seen.entries()) {
      let seen = entry2[1];
      if (seen.cycle)
        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (let entry2 of ctx.seen.entries()) {
    let seen = entry2[1];
    if (schema === entry2[0]) {
      extractToDef(entry2);
      continue;
    }
    if (ctx.external) {
      let ext = ctx.external.registry.get(entry2[0])?.id;
      if (schema !== entry2[0] && ext) {
        extractToDef(entry2);
        continue;
      }
    }
    if (ctx.metadataRegistry.get(entry2[0])?.id) {
      extractToDef(entry2);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry2);
      continue;
    }
    seen.count > 1 && ctx.reused === "ref" && extractToDef(entry2);
  }
  ctx.external && (ctx.sharedDefsExtractedFor = ctx.external);
}
function compactTypeUnion(schema) {
  let options = schema.anyOf;
  if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0)
    return;
  let types = [];
  for (let option of options) {
    if (!option || typeof option != "object")
      return;
    compactTypeUnion(option);
    let keys4 = Object.keys(option);
    if (keys4.length !== 1 || keys4[0] !== "type")
      return;
    let type3 = option.type;
    for (let member2 of Array.isArray(type3) ? type3 : [type3]) {
      if (typeof member2 != "string")
        return;
      types.includes(member2) || types.push(member2);
    }
  }
  delete schema.anyOf, schema.type = types.length === 1 ? types[0] : types;
}
var FOLDABLE_KEYS = /* @__PURE__ */ new Set(["type", "properties", "required", "additionalProperties"]), UNION_KEYS = ["oneOf", "anyOf"];
function undeclaredConstraint(member2) {
  let extra = member2.additionalProperties;
  return extra === void 0 || extra === !1 || typeof extra != "object" || extra === null ? null : Object.keys(extra).length ? extra : null;
}
function foldObjects(members2) {
  let objects = [];
  for (let member2 of members2) {
    if (typeof member2 != "object" || member2.type !== "object")
      return null;
    for (let key2 in member2)
      if (!FOLDABLE_KEYS.has(key2))
        return null;
    objects.push(member2);
  }
  let properties = {}, required3 = /* @__PURE__ */ new Set();
  for (let object4 of objects) {
    for (let key2 in object4.properties) {
      if (Object.prototype.hasOwnProperty.call(properties, key2))
        continue;
      let parts = [];
      for (let other of objects) {
        let part = other.properties?.[key2] ?? undeclaredConstraint(other);
        part != null && (parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part)) || parts.push(part));
      }
      let merged = parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts };
      assignProp(properties, key2, merged);
    }
    for (let key2 of object4.required ?? [])
      required3.add(key2);
  }
  let folded = { type: "object", properties };
  if (required3.size && (folded.required = [...required3]), objects.every((object4) => object4.additionalProperties === !1))
    folded.additionalProperties = !1;
  else {
    let constraints = [];
    for (let object4 of objects) {
      let constraint = undeclaredConstraint(object4);
      constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint)) && constraints.push(constraint);
    }
    constraints.length === 1 ? folded.additionalProperties = constraints[0] : constraints.length > 1 && (folded.additionalProperties = { allOf: constraints });
  }
  return folded;
}
function foldIntersection(json3) {
  let allOf = json3.allOf;
  if (!Array.isArray(allOf) || allOf.length < 2)
    return;
  for (let key2 of FOLDABLE_KEYS)
    if (key2 in json3)
      return;
  let unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k]))), folded = null;
  if (!unions.length)
    folded = foldObjects(allOf);
  else {
    let union3 = unions[0], keyword = UNION_KEYS.find((k) => Array.isArray(union3[k]));
    if (Object.keys(union3).length !== 1)
      return;
    let rest = allOf.filter((m) => m !== union3), branches = union3[keyword].map((branch) => foldObjects([...rest, branch]));
    if (branches.some((b10) => !b10))
      return;
    folded = { [keyword]: branches };
  }
  folded && (delete json3.allOf, assignProps(json3, folded));
}
function finalize(ctx, schema) {
  let root2 = ctx.seen.get(schema);
  if (!root2)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  let flattenRef = (zodSchema) => {
    let seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    let schema2 = seen.def ?? seen.schema, _cached = { ...schema2 }, ref2 = seen.ref;
    if (seen.ref = null, ref2) {
      flattenRef(ref2);
      let refSeen = ctx.seen.get(ref2), refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0") ? (schema2.allOf = schema2.allOf ?? [], schema2.allOf.push(refSchema)) : assignProps(schema2, refSchema), assignProps(schema2, _cached), zodSchema._zod.parent === ref2)
        for (let key2 in schema2)
          key2 === "$ref" || key2 === "allOf" || key2 in _cached || delete schema2[key2];
      if (refSchema.$ref && refSeen.def)
        for (let key2 in schema2)
          key2 === "$ref" || key2 === "allOf" || key2 in refSeen.def && JSON.stringify(schema2[key2]) === JSON.stringify(refSeen.def[key2]) && delete schema2[key2];
    }
    let parent = zodSchema._zod.parent;
    if (parent && parent !== ref2) {
      flattenRef(parent);
      let parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref && (schema2.$ref = parentSeen.schema.$ref, parentSeen.def))
        for (let key2 in schema2)
          key2 === "$ref" || key2 === "allOf" || key2 in parentSeen.def && JSON.stringify(schema2[key2]) === JSON.stringify(parentSeen.def[key2]) && delete schema2[key2];
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  };
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (let entry2 of [...ctx.seen.entries()].reverse())
      flattenRef(entry2[0]);
    if (ctx.target !== "openapi-3.0")
      for (let entry2 of ctx.seen.entries())
        compactTypeUnion(entry2[1].def ?? entry2[1].schema);
    for (let rewrite of ctx.deferred)
      rewrite();
    if (ctx.intersections.length) {
      let carriers = /* @__PURE__ */ new Map();
      for (let seen of ctx.seen.values())
        for (let json3 of [seen.schema, seen.def]) {
          let allOf = json3?.allOf;
          if (!Array.isArray(allOf))
            continue;
          let existing = carriers.get(allOf);
          existing ? existing.push(json3) : carriers.set(allOf, [json3]);
        }
      for (let allOf of ctx.intersections)
        for (let json3 of carriers.get(allOf) ?? [])
          foldIntersection(json3);
    }
  }
  let result = {};
  if (ctx.target === "draft-2020-12" ? result.$schema = "https://json-schema.org/draft/2020-12/schema" : ctx.target === "draft-07" ? result.$schema = "http://json-schema.org/draft-07/schema#" : ctx.target === "draft-04" ? result.$schema = "http://json-schema.org/draft-04/schema#" : ctx.target, ctx.external?.uri) {
    let id3 = ctx.external.registry.get(schema)?.id;
    if (!id3)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id3);
  }
  assignProps(result, root2.defId ? root2.schema : root2.def ?? root2.schema);
  let rootMetaId = ctx.metadataRegistry.get(schema)?.id;
  rootMetaId !== void 0 && result.id === rootMetaId && delete result.id;
  let defs = ctx.external?.defs ?? {};
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external)
    for (let entry2 of ctx.seen.entries()) {
      let seen = entry2[1];
      seen.def && seen.defId && (seen.def.id === seen.defId && delete seen.def.id, assignProp(defs, seen.defId, seen.def));
    }
  ctx.external && (ctx.sharedEmitDoneFor = ctx.external), ctx.external || Object.keys(defs).length > 0 && (ctx.target === "draft-2020-12" ? result.$defs = defs : result.definitions = defs);
  try {
    let finalized = JSON.parse(JSON.stringify(result));
    return Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), finalized;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  let ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return !1;
  ctx.seen.add(_schema);
  let def2 = _schema._zod.def;
  if (def2.type === "transform")
    return !0;
  if (def2.type === "array")
    return isTransforming(def2.element, ctx);
  if (def2.type === "set")
    return isTransforming(def2.valueType, ctx);
  if (def2.type === "lazy")
    return isTransforming(def2.getter(), ctx);
  if (def2.type === "promise" || def2.type === "optional" || def2.type === "nonoptional" || def2.type === "nullable" || def2.type === "readonly" || def2.type === "default" || def2.type === "prefault" || def2.type === "catch")
    return isTransforming(def2.innerType, ctx);
  if (def2.type === "intersection")
    return isTransforming(def2.left, ctx) || isTransforming(def2.right, ctx);
  if (def2.type === "record" || def2.type === "map")
    return isTransforming(def2.keyType, ctx) || isTransforming(def2.valueType, ctx);
  if (def2.type === "pipe")
    return _schema._zod.traits.has("$ZodCodec") ? !0 : isTransforming(def2.in, ctx) || isTransforming(def2.out, ctx);
  if (def2.type === "object") {
    for (let key2 in def2.shape)
      if (isTransforming(def2.shape[key2], ctx))
        return !0;
    return !1;
  }
  if (def2.type === "union") {
    for (let option of def2.options)
      if (isTransforming(option, ctx))
        return !0;
    return !1;
  }
  if (def2.type === "tuple") {
    for (let item of def2.items)
      if (isTransforming(item, ctx))
        return !0;
    return !!(def2.rest && isTransforming(def2.rest, ctx));
  }
  return !1;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params2) => {
  let ctx = initializeContext({ ...params2, processors });
  return processSchema(schema, ctx), extractDefs(ctx, schema), finalize(ctx, schema);
}, createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params2) => {
  let { libraryOptions, target: target3 } = params2 ?? {}, ctx = initializeContext({ ...libraryOptions ?? {}, target: target3, io, processors });
  return processSchema(schema, ctx), extractDefs(ctx, schema), finalize(ctx, schema);
};

// node_modules/zod/v4/core/json-schema-processors.js
var narrowMin = (agg, key2, value3) => {
  (agg[key2] === void 0 || value3 > agg[key2]) && (agg[key2] = value3);
}, narrowMax = (agg, key2, value3) => {
  (agg[key2] === void 0 || value3 < agg[key2]) && (agg[key2] = value3);
}, narrowBoth = (agg, value3) => {
  narrowMin(agg, "minimum", value3), narrowMax(agg, "maximum", value3);
}, addDivisor = (agg, value3) => {
  agg.multipleOf ?? (agg.multipleOf = []), agg.multipleOf.includes(value3) || agg.multipleOf.push(value3);
}, addPattern = (agg, pattern) => {
  agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set()), agg.patterns.add(pattern);
}, intersectMime = (agg, mime) => {
  agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
}, setFormat = (agg, format5) => {
  agg.format = format5, format5.includes("int") && (agg.isInt = !0);
}, minContributor = (agg, def2) => narrowMin(agg, "minimum", def2.minimum), maxContributor = (agg, def2) => narrowMax(agg, "maximum", def2.maximum), formatContributor = (ranges2) => (agg, def2) => {
  setFormat(agg, def2.format);
  let [minimum, maximum] = ranges2[def2.format];
  narrowMin(agg, "minimum", minimum), narrowMax(agg, "maximum", maximum);
}, contributors = {
  greater_than: (agg, def2) => narrowMin(agg, def2.inclusive ? "minimum" : "exclusiveMinimum", def2.value),
  less_than: (agg, def2) => narrowMax(agg, def2.inclusive ? "maximum" : "exclusiveMaximum", def2.value),
  multiple_of: (agg, def2) => addDivisor(agg, def2.value),
  number_format: formatContributor(NUMBER_FORMAT_RANGES),
  bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
  min_length: minContributor,
  max_length: maxContributor,
  length_equals: (agg, def2) => narrowBoth(agg, def2.length),
  min_size: minContributor,
  max_size: maxContributor,
  size_equals: (agg, def2) => narrowBoth(agg, def2.size),
  string_format: (agg, def2) => {
    setFormat(agg, def2.format), def2.pattern && addPattern(agg, def2.pattern), (def2.format === "base64" || def2.format === "base64url") && (agg.contentEncoding = def2.format), (def2.local || def2.precision === -1) && (agg.laxFormat = !0);
  },
  mime_type: (agg, def2) => intersectMime(agg, def2.mime)
};
function aggregateChecks(schema) {
  let agg = {}, def2 = schema._zod.def, list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def2.checks ?? []] : def2.checks ?? [];
  for (let ch2 of list)
    contributors[ch2._zod.def.check]?.(agg, ch2._zod.def);
  let bag = schema._zod.bag;
  bag.minimum !== void 0 && narrowMin(agg, "minimum", bag.minimum), bag.exclusiveMinimum !== void 0 && narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum), bag.maximum !== void 0 && narrowMax(agg, "maximum", bag.maximum), bag.exclusiveMaximum !== void 0 && narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum), bag.multipleOf !== void 0 && addDivisor(agg, bag.multipleOf), bag.format !== void 0 && (agg.format ?? (agg.format = bag.format), bag.format.includes("int") && (agg.isInt = !0)), bag.mime && intersectMime(agg, bag.mime);
  for (let pattern of bag.patterns ?? [])
    addPattern(agg, pattern);
  return agg;
}
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, exactPatterns = /* @__PURE__ */ new Map([
  [base64Charset, base64],
  [base64urlCharset, base64url]
]), exactPattern = (p) => exactPatterns.get(p) ?? p, stringProcessor = (schema, ctx, _json, _params) => {
  let json3 = _json;
  json3.type = "string";
  let { minimum, maximum, format: format5, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
  if (typeof minimum == "number" && (json3.minLength = minimum), typeof maximum == "number" && (json3.maxLength = maximum), format5 && (json3.format = formatMap[format5] ?? format5, json3.format === "" && delete json3.format, (format5 === "time" || laxFormat) && delete json3.format), contentEncoding && (json3.contentEncoding = contentEncoding), patterns && patterns.size > 0) {
    let patternList = [...patterns].map(exactPattern);
    patternList.length === 1 ? json3.pattern = patternList[0].source : patternList.length > 1 && (json3.allOf = [
      ...patternList.map((regex) => ({
        ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: regex.source
      }))
    ]);
  }
}, numberProcessor = (schema, ctx, _json, params2) => {
  let json3 = _json, { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
  json3.type = isInt ? "integer" : "number";
  let exMin = typeof exclusiveMinimum == "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY), exMax = typeof exclusiveMaximum == "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY), legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
  if (exMin ? legacy ? (json3.minimum = exclusiveMinimum, json3.exclusiveMinimum = !0) : json3.exclusiveMinimum = exclusiveMinimum : typeof minimum == "number" && (json3.minimum = minimum), exMax ? legacy ? (json3.maximum = exclusiveMaximum, json3.exclusiveMaximum = !0) : json3.exclusiveMaximum = exclusiveMaximum : typeof maximum == "number" && (json3.maximum = maximum), multipleOf) {
    let divisors = /* @__PURE__ */ new Set();
    for (let divisor of multipleOf)
      Number.isFinite(divisor) && divisor !== 0 ? divisors.add(Math.abs(divisor)) : handleUnrepresentable(schema, ctx, json3, params2, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
    let [first, ...rest] = divisors;
    first !== void 0 && (json3.multipleOf = first), rest.length && (json3.allOf = [...json3.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))]);
  }
}, booleanProcessor = (_schema, _ctx, json3, _params) => {
  json3.type = "boolean";
}, bigintProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "BigInt cannot be represented in JSON Schema");
}, symbolProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Symbols cannot be represented in JSON Schema");
}, nullProcessor = (_schema, ctx, json3, _params) => {
  ctx.target === "openapi-3.0" ? (json3.type = "string", json3.nullable = !0, json3.enum = [null]) : json3.type = "null";
}, undefinedProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Undefined cannot be represented in JSON Schema");
}, voidProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Void cannot be represented in JSON Schema");
}, neverProcessor = (_schema, _ctx, json3, _params) => {
  json3.not = {};
}, anyProcessor = (_schema, _ctx, _json, _params) => {
}, unknownProcessor = (_schema, _ctx, _json, _params) => {
}, dateProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Date cannot be represented in JSON Schema");
}, enumProcessor = (schema, _ctx, json3, _params) => {
  let def2 = schema._zod.def, values3 = getEnumValues(def2.entries);
  if (values3.length === 0) {
    json3.not = {};
    return;
  }
  values3.every((v2) => typeof v2 == "number") && (json3.type = "number"), values3.every((v2) => typeof v2 == "string") && (json3.type = "string"), json3.enum = values3;
}, literalProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def;
  if (def2.values.length === 0) {
    json3.not = {};
    return;
  }
  let vals2 = [];
  for (let val of def2.values)
    if (val === void 0) {
      if (handleUnrepresentable(schema, ctx, json3, params2, "Literal `undefined` cannot be represented in JSON Schema"))
        return;
    } else if (typeof val == "bigint") {
      if (handleUnrepresentable(schema, ctx, json3, params2, "BigInt literals cannot be represented in JSON Schema"))
        return;
      vals2.push(Number(val));
    } else
      vals2.push(val);
  if (vals2.length !== 0)
    if (vals2.length === 1) {
      let val = vals2[0];
      json3.type = val === null ? "null" : typeof val, ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? json3.enum = [val] : json3.const = val;
    } else
      vals2.every((v2) => typeof v2 == "number") && (json3.type = "number"), vals2.every((v2) => typeof v2 == "string") && (json3.type = "string"), vals2.every((v2) => typeof v2 == "boolean") && (json3.type = "boolean"), vals2.every((v2) => v2 === null) && (json3.type = "null"), json3.enum = vals2;
}, nanProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "NaN cannot be represented in JSON Schema");
}, templateLiteralProcessor = (schema, _ctx, json3, _params) => {
  let _json = json3, pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string", _json.pattern = pattern.source;
}, fileProcessor = (schema, _ctx, json3, _params) => {
  let _json = json3;
  _json.type = "string", _json.format = "binary", _json.contentEncoding = "binary";
  let { minimum, maximum, mime } = aggregateChecks(schema);
  minimum !== void 0 && (_json.minLength = minimum), maximum !== void 0 && (_json.maxLength = maximum), mime && (mime.length === 0 ? _json.not = {} : mime.length === 1 ? _json.contentMediaType = mime[0] : _json.anyOf = mime.map((m) => ({ contentMediaType: m })));
}, successProcessor = (_schema, _ctx, json3, _params) => {
  json3.type = "boolean";
}, customProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Custom types cannot be represented in JSON Schema");
}, functionProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Function types cannot be represented in JSON Schema");
}, transformProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Transforms cannot be represented in JSON Schema");
}, mapProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Map cannot be represented in JSON Schema");
}, setProcessor = (schema, ctx, json3, params2) => {
  handleUnrepresentable(schema, ctx, json3, params2, "Set cannot be represented in JSON Schema");
}, arrayProcessor = (schema, ctx, _json, params2) => {
  let json3 = _json, def2 = schema._zod.def, { minimum, maximum } = aggregateChecks(schema);
  typeof minimum == "number" && (json3.minItems = minimum), typeof maximum == "number" && (json3.maxItems = maximum), json3.type = "array", json3.items = processSchema(def2.element, ctx, {
    ...params2,
    path: [...params2.path, "items"]
  });
};
function inputOptin(schema) {
  let def2 = schema._zod.def;
  return def2.type === "pipe" && def2.in._zod.traits.has("$ZodTransform") ? inputOptin(def2.out) : def2.type === "catch" ? inputOptin(def2.innerType) : schema._zod.optin;
}
var objectProcessor = (schema, ctx, _json, params2) => {
  let json3 = _json, def2 = schema._zod.def, shape2 = def2.shape;
  if (Object.getOwnPropertySymbols(shape2).length && handleUnrepresentable(schema, ctx, json3, params2, "Symbol keys cannot be represented in JSON Schema"))
    return;
  json3.type = "object", json3.properties = {};
  for (let key2 in shape2)
    assignProp(json3.properties, key2, processSchema(shape2[key2], ctx, {
      ...params2,
      path: [...params2.path, "properties", key2]
    }));
  let requiredKeys = [];
  for (let key2 of Object.keys(shape2)) {
    let field3 = def2.shape[key2];
    (ctx.io === "input" ? inputOptin(field3) === void 0 : field3._zod.optout === void 0) && requiredKeys.push(key2);
  }
  requiredKeys.length > 0 && (json3.required = requiredKeys), def2.catchall?._zod.def.type === "never" ? json3.additionalProperties = !1 : def2.catchall ? def2.catchall && (json3.additionalProperties = processSchema(def2.catchall, ctx, {
    ...params2,
    path: [...params2.path, "additionalProperties"]
  })) : ctx.io === "output" && (json3.additionalProperties = !1);
}, unionProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def, isExclusive = def2.inclusive === !1, options = def2.options.map((x5, i) => processSchema(x5, ctx, {
    ...params2,
    path: [...params2.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  isExclusive ? json3.oneOf = options : json3.anyOf = options;
}, intersectionProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def, a = processSchema(def2.left, ctx, {
    ...params2,
    path: [...params2.path, "allOf", 0]
  }), b10 = processSchema(def2.right, ctx, {
    ...params2,
    path: [...params2.path, "allOf", 1]
  }), isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1, allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b10) ? b10.allOf : [b10]
  ];
  json3.allOf = allOf, ctx.intersections.push(allOf);
}, tupleProcessor = (schema, ctx, _json, params2) => {
  let json3 = _json, def2 = schema._zod.def;
  json3.type = "array";
  let prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items", restPath = ctx.target === "draft-2020-12" || ctx.target === "openapi-3.0" ? "items" : "additionalItems", prefixItems = def2.items.map((x5, i) => processSchema(x5, ctx, {
    ...params2,
    path: [...params2.path, prefixPath, i]
  })), rest = def2.rest ? processSchema(def2.rest, ctx, {
    ...params2,
    path: [...params2.path, restPath, ...ctx.target === "openapi-3.0" ? [def2.items.length] : []]
  }) : null, minItems = def2.items.length;
  for (; minItems > 0; ) {
    let item = def2.items[minItems - 1];
    if (!(ctx.io === "input" ? inputOptin(item) !== void 0 : item._zod.optout === "optional"))
      break;
    minItems--;
  }
  let maxItems = def2.items.length, isClosed = !def2.rest;
  ctx.target === "draft-2020-12" ? (json3.prefixItems = prefixItems, isClosed ? json3.items = !1 : rest && (json3.items = rest), minItems > 0 && (json3.minItems = minItems), isClosed && (json3.maxItems = maxItems)) : ctx.target === "openapi-3.0" ? (json3.items = {
    anyOf: prefixItems
  }, rest && json3.items.anyOf.push(rest), minItems > 0 && (json3.minItems = minItems), isClosed && (json3.maxItems = maxItems)) : (json3.items = prefixItems, isClosed ? json3.additionalItems = !1 : rest && (json3.additionalItems = rest), minItems > 0 && (json3.minItems = minItems), isClosed && (json3.maxItems = maxItems));
  let { minimum, maximum } = aggregateChecks(schema);
  typeof minimum == "number" && (json3.minItems = minimum), typeof maximum == "number" && (json3.maxItems = maximum);
};
function stringifyKeyNames(bySchema, json3, visited) {
  if (json3.$ref) {
    if (visited.has(json3))
      return json3;
    visited.add(json3);
    let def2 = bySchema.get(json3)?.def;
    if (!def2)
      return json3;
    let inlined = stringifyKeyNames(bySchema, def2, visited);
    return inlined === def2 ? json3 : inlined;
  }
  for (let keyword of ["anyOf", "oneOf"]) {
    let branches = json3[keyword];
    if (!Array.isArray(branches))
      continue;
    let mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
    mapped.some((branch, i) => branch !== branches[i]) && (json3 = { ...json3, [keyword]: mapped });
  }
  let types = Array.isArray(json3.type) ? json3.type : [json3.type], numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer"), values3 = json3.enum ?? (json3.const !== void 0 ? [json3.const] : void 0);
  if (!numericType && !values3?.some((v2) => typeof v2 == "number"))
    return json3;
  let { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format: format5, id: id3, ...rest } = json3;
  return rest.enum ? rest.enum = rest.enum.map((v2) => typeof v2 == "number" ? String(v2) : v2) : typeof rest.const == "number" && (rest.const = String(rest.const)), numericType && (rest.type = "string", values3 || (rest.pattern = (types.includes("number") ? number : integer).source)), rest;
}
var pendingRecords = /* @__PURE__ */ new WeakMap();
function rewriteKeyNames(ctx) {
  let bySchema = /* @__PURE__ */ new Map();
  for (let entry2 of ctx.seen.values())
    entry2.def && !bySchema.has(entry2.schema) && bySchema.set(entry2.schema, entry2);
  let rewrites = /* @__PURE__ */ new Map();
  for (let record2 of pendingRecords.get(ctx) ?? []) {
    let seen = ctx.seen.get(record2), names = (seen?.def ?? seen?.schema)?.propertyNames;
    if (!names || names === !0 || rewrites.has(names))
      continue;
    let rewritten = stringifyKeyNames(bySchema, names, /* @__PURE__ */ new Set());
    rewritten !== names && rewrites.set(names, rewritten);
  }
  if (rewrites.size)
    for (let entry2 of ctx.seen.values())
      for (let carrier of [entry2.schema, entry2.def]) {
        let rewritten = carrier && rewrites.get(carrier.propertyNames);
        rewritten && (carrier.propertyNames = rewritten);
      }
}
var recordProcessor = (schema, ctx, _json, params2) => {
  let json3 = _json, def2 = schema._zod.def;
  json3.type = "object";
  let keyType = def2.keyType, patterns = aggregateChecks(keyType).patterns;
  if (def2.mode === "loose" && patterns && patterns.size > 0) {
    let valueSchema = processSchema(def2.valueType, ctx, {
      ...params2,
      path: [...params2.path, "patternProperties", "*"]
    });
    json3.patternProperties = {};
    for (let pattern of patterns)
      assignProp(json3.patternProperties, exactPattern(pattern).source, valueSchema);
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json3.propertyNames = processSchema(def2.keyType, ctx, {
        ...params2,
        path: [...params2.path, "propertyNames"]
      });
      let pending = pendingRecords.get(ctx);
      pending || (pending = [], pendingRecords.set(ctx, pending), ctx.deferred.push(() => rewriteKeyNames(ctx))), pending.push(schema);
    }
    json3.additionalProperties = processSchema(def2.valueType, ctx, {
      ...params2,
      path: [...params2.path, "additionalProperties"]
    });
  }
  let keyValues = keyType._zod.values, omittableOnInput = ctx.io === "input" && inputOptin(def2.valueType) !== void 0;
  if (keyValues && !def2.partial && !omittableOnInput) {
    let validKeyValues = [...keyValues].filter((v2) => typeof v2 == "string" || typeof v2 == "number");
    validKeyValues.length > 0 && (json3.required = validKeyValues.map(String));
  }
}, nullableProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def, inner = processSchema(def2.innerType, ctx, params2), seen = ctx.seen.get(schema);
  ctx.target === "openapi-3.0" ? (seen.ref = def2.innerType, json3.nullable = !0) : json3.anyOf = [inner, { type: "null" }];
}, nonoptionalProcessor = (schema, ctx, _json, params2) => {
  let def2 = schema._zod.def;
  processSchema(def2.innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = def2.innerType;
}, UNREPRESENTABLE_DEFAULT = /* @__PURE__ */ Symbol();
function serializeDefaultValue(value3, schema, ctx, json3, params2) {
  let unrepresentable = !1, serialized = JSON.stringify(value3, (_, val) => typeof val != "bigint" ? val : (unrepresentable = !0, null));
  return unrepresentable ? (handleUnrepresentable(schema, ctx, json3, params2, "BigInt defaults cannot be represented in JSON Schema"), UNREPRESENTABLE_DEFAULT) : JSON.parse(serialized);
}
var defaultProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def;
  processSchema(def2.innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = def2.innerType;
  let value3 = serializeDefaultValue(def2.defaultValue, schema, ctx, json3, params2);
  value3 !== UNREPRESENTABLE_DEFAULT && (json3.default = value3);
}, prefaultProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def;
  processSchema(def2.innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  if (seen.ref = def2.innerType, ctx.io !== "input")
    return;
  let value3 = serializeDefaultValue(def2.defaultValue, schema, ctx, json3, params2);
  value3 !== UNREPRESENTABLE_DEFAULT && (json3._prefault = value3);
}, catchProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def;
  processSchema(def2.innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = def2.innerType;
  let catchValue;
  try {
    catchValue = def2.catchValue(void 0);
  } catch {
    handleUnrepresentable(schema, ctx, json3, params2, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  json3.default = catchValue;
}, pipeProcessor = (schema, ctx, _json, params2) => {
  let def2 = schema._zod.def, inIsTransform = def2.in._zod.traits.has("$ZodTransform"), innerType = ctx.io === "input" ? inIsTransform ? def2.out : def2.in : def2.out;
  processSchema(innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = innerType;
}, readonlyProcessor = (schema, ctx, json3, params2) => {
  let def2 = schema._zod.def;
  processSchema(def2.innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = def2.innerType, json3.readOnly = !0;
}, promiseProcessor = (schema, ctx, _json, params2) => {
  let def2 = schema._zod.def;
  processSchema(def2.innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = def2.innerType;
}, optionalProcessor = (schema, ctx, _json, params2) => {
  let def2 = schema._zod.def;
  processSchema(def2.innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = def2.innerType;
}, lazyProcessor = (schema, ctx, _json, params2) => {
  let innerType = schema._zod.innerType;
  processSchema(innerType, ctx, params2);
  let seen = ctx.seen.get(schema);
  seen.ref = innerType;
}, allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input2, params2) {
  if ("_idmap" in input2) {
    let registry2 = input2, ctx2 = initializeContext({ ...params2, processors: allProcessors }), defs = {};
    for (let entry2 of registry2._idmap.entries()) {
      let [_, schema] = entry2;
      processSchema(schema, ctx2);
    }
    let schemas = {}, external = {
      registry: registry2,
      uri: params2?.uri,
      defs
    };
    ctx2.external = external;
    for (let entry2 of registry2._idmap.entries()) {
      let [key2, schema] = entry2;
      extractDefs(ctx2, schema), assignProp(schemas, key2, finalize(ctx2, schema));
    }
    if (Object.keys(defs).length > 0) {
      let defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  let ctx = initializeContext({ ...params2, processors: allProcessors });
  return processSchema(input2, ctx), extractDefs(ctx, input2), finalize(ctx, input2);
}

// node_modules/zod/v4/core/json-schema-generator.js
var JSONSchemaGenerator = class {
  /** @deprecated Access via ctx instead */
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  /** @deprecated Access via ctx instead */
  get target() {
    return this.ctx.target;
  }
  // annotated so the .d.cts emits an indexed access rather than an inline `import()` of an ESM path
  /** @deprecated Access via ctx instead */
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  /** @deprecated Access via ctx instead */
  get override() {
    return this.ctx.override;
  }
  /** @deprecated Access via ctx instead */
  get io() {
    return this.ctx.io;
  }
  /** @deprecated Access via ctx instead */
  get counter() {
    return this.ctx.counter;
  }
  set counter(value3) {
    this.ctx.counter = value3;
  }
  /** @deprecated Access via ctx instead */
  get seen() {
    return this.ctx.seen;
  }
  constructor(params2) {
    let normalizedTarget = params2?.target ?? "draft-2020-12";
    normalizedTarget === "draft-4" && (normalizedTarget = "draft-04"), normalizedTarget === "draft-7" && (normalizedTarget = "draft-07"), this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params2?.metadata && { metadata: params2.metadata },
      ...params2?.unrepresentable && { unrepresentable: params2.unrepresentable },
      ...params2?.override && { override: params2.override },
      ...params2?.io && { io: params2.io }
    });
  }
  /**
   * Process a schema to prepare it for JSON Schema generation.
   * This must be called before emit().
   */
  process(schema, _params = { path: [], schemaPath: [] }) {
    return processSchema(schema, this.ctx, _params);
  }
  /**
   * Emit the final JSON Schema after processing.
   * Must call process() first.
   */
  emit(schema, _params) {
    _params && (_params.cycles && (this.ctx.cycles = _params.cycles), _params.reused && (this.ctx.reused = _params.reused), _params.external && (this.ctx.external = _params.external)), this.ctx.sharedDefsExtractedFor = void 0, this.ctx.sharedEmitDoneFor = void 0, extractDefs(this.ctx, schema);
    let result = finalize(this.ctx, schema), { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
};

// node_modules/zod/v4/core/json-schema.js
var json_schema_exports = {};

// node_modules/zod/v4/mini/schemas.js
var ZodMiniType = /* @__PURE__ */ $constructor("ZodMiniType", (inst, def2) => {
  if (!inst._zod)
    throw new Error("Uninitialized schema in ZodMiniType.");
  $ZodType.init(inst, def2), inst.def = def2, inst.type = def2.type;
}, {
  // `with` is an alias for `check`: the same function object, not a wrapper.
  get with() {
    return this.check;
  },
  set with(value3) {
    own(this, "with", value3);
  },
  parse(data3, params2) {
    return parse(this, data3, params2, { callee: this.parse });
  },
  parseAsync(data3, params2) {
    return parseAsync(this, data3, params2, { callee: this.parseAsync });
  },
  safeParse(data3, params2) {
    return safeParse(this, data3, params2);
  },
  safeParseAsync(data3, params2) {
    return safeParseAsync(this, data3, params2);
  },
  check(...checks) {
    let def2 = this.def;
    return this.clone({
      ...def2,
      checks: [
        ...def2.checks ?? [],
        ...checks.map((ch2) => typeof ch2 == "function" ? { _zod: { check: ch2, def: { check: "custom" }, onattach: [] } } : ch2)
      ]
    }, { parent: !0 });
  },
  clone(_def, params2) {
    return clone(this, _def, params2);
  },
  brand() {
    return this;
  },
  register(reg, meta3) {
    return reg.add(this, meta3), this;
  },
  apply(fn, ...args) {
    return args.length === 0 ? fn(this) : fn(this, ...args);
  }
});
var ZodMiniObject = /* @__PURE__ */ $constructor("ZodMiniObject", (inst, def2) => {
  $ZodObject.init(inst, def2), ZodMiniType.init(inst, def2), installLazyProp(inst, "shape", (self2) => self2._zod.def.shape, !1);
});
// @__NO_SIDE_EFFECTS__
function object(shape2, params2) {
  let def2 = {
    type: "object",
    shape: shape2 ?? {},
    ...normalizeParams(params2)
  };
  return new ZodMiniObject(def2);
}

// node_modules/zod/v4/core/visit.js
var RESOLVING = /* @__PURE__ */ Symbol("z.visit/resolving");
function visit(schema, fnOrHandlers) {
  let fn = typeof fnOrHandlers == "function" ? fnOrHandlers : (node2, rewritten) => {
    let h2 = fnOrHandlers[node2._zod.def.type];
    return h2 ? h2(node2, rewritten) : node2;
  }, cache2 = /* @__PURE__ */ new Map();
  function run5(s) {
    let cached2 = cache2.get(s);
    if (cached2 === RESOLVING)
      return new $ZodLazy({
        type: "lazy",
        getter: () => cache2.get(s)
      });
    if (cached2 !== void 0)
      return cached2;
    cache2.set(s, RESOLVING);
    let inner = mapInner(s), mapped = fn(inner, inner !== s);
    return cache2.set(s, mapped), mapped;
  }
  function mapInner(s) {
    let def2 = s._zod.def, kind = def2.type;
    switch (kind) {
      case "object": {
        let oldShape = def2.shape, keys4 = Object.keys(oldShape), changed = !1, newShape = {};
        for (let k of keys4) {
          let mapped = run5(oldShape[k]);
          mapped !== oldShape[k] && (changed = !0), newShape[k] = mapped;
        }
        let newCatchall = def2.catchall;
        return def2.catchall && (newCatchall = run5(def2.catchall), newCatchall !== def2.catchall && (changed = !0)), changed ? clone(s, { ...def2, shape: newShape, catchall: newCatchall }) : s;
      }
      case "array": {
        let mapped = run5(def2.element);
        return mapped === def2.element ? s : clone(s, { ...def2, element: mapped });
      }
      case "tuple": {
        let oldItems = def2.items, changed = !1, newItems = [];
        for (let item of oldItems) {
          let mapped = run5(item);
          mapped !== item && (changed = !0), newItems.push(mapped);
        }
        let newRest = def2.rest;
        return def2.rest && (newRest = run5(def2.rest), newRest !== def2.rest && (changed = !0)), changed ? clone(s, { ...def2, items: newItems, rest: newRest }) : s;
      }
      case "record":
      case "map": {
        let newKey = run5(def2.keyType), newVal = run5(def2.valueType);
        return newKey === def2.keyType && newVal === def2.valueType ? s : clone(s, { ...def2, keyType: newKey, valueType: newVal });
      }
      case "set": {
        let newVal = run5(def2.valueType);
        return newVal === def2.valueType ? s : clone(s, { ...def2, valueType: newVal });
      }
      case "union": {
        let oldOptions = def2.options, changed = !1, newOptions = [];
        for (let opt of oldOptions) {
          let mapped = run5(opt);
          mapped !== opt && (changed = !0), newOptions.push(mapped);
        }
        return changed ? clone(s, { ...def2, options: newOptions }) : s;
      }
      case "intersection": {
        let newLeft = run5(def2.left), newRight = run5(def2.right);
        return newLeft === def2.left && newRight === def2.right ? s : clone(s, { ...def2, left: newLeft, right: newRight });
      }
      case "optional":
      case "nullable":
      case "default":
      case "prefault":
      case "catch":
      case "readonly":
      case "nonoptional":
      case "promise":
      case "success": {
        let newInner = run5(def2.innerType);
        return newInner === def2.innerType ? s : clone(s, { ...def2, innerType: newInner });
      }
      case "pipe": {
        let newIn = run5(def2.in), newOut = run5(def2.out);
        return newIn === def2.in && newOut === def2.out ? s : clone(s, { ...def2, in: newIn, out: newOut });
      }
      case "function": {
        let newInput = run5(def2.input), newOutput = run5(def2.output);
        return newInput === def2.input && newOutput === def2.output ? s : clone(s, { ...def2, input: newInput, output: newOutput });
      }
      case "lazy": {
        let original = def2.getter, { _cachedInner, ...rest } = def2;
        return clone(s, { ...rest, getter: () => run5(original()) });
      }
      // A leaf by choice: `parts` are regex fragments, not data positions.
      case "template_literal":
      // Leaves.
      case "string":
      case "number":
      case "int":
      case "boolean":
      case "bigint":
      case "symbol":
      case "undefined":
      case "null":
      case "void":
      case "never":
      case "any":
      case "unknown":
      case "date":
      case "nan":
      case "enum":
      case "literal":
      case "file":
      case "transform":
      case "custom":
        return s;
      default:
        return s;
    }
  }
  return run5(schema);
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/zod-compat.js
function isZ4Schema(s) {
  return !!s._zod;
}
function objectFromShape(shape2) {
  let values3 = Object.values(shape2);
  if (values3.length === 0)
    return object({});
  let allV4 = values3.every(isZ4Schema), allV3 = values3.every((s) => !isZ4Schema(s));
  if (allV4)
    return object(shape2);
  if (allV3)
    return objectType(shape2);
  throw new Error("Mixed Zod versions detected in object shape.");
}
function safeParse2(schema, data3) {
  return isZ4Schema(schema) ? safeParse(schema, data3) : schema.safeParse(data3);
}
async function safeParseAsync2(schema, data3) {
  return isZ4Schema(schema) ? await safeParseAsync(schema, data3) : await schema.safeParseAsync(data3);
}
function getObjectShape(schema) {
  if (!schema)
    return;
  let rawShape2;
  if (isZ4Schema(schema) ? rawShape2 = schema._zod?.def?.shape : rawShape2 = schema.shape, !!rawShape2) {
    if (typeof rawShape2 == "function")
      try {
        return rawShape2();
      } catch {
        return;
      }
    return rawShape2;
  }
}
function normalizeObjectSchema(schema) {
  if (schema) {
    if (typeof schema == "object") {
      let asV3 = schema, asV4 = schema;
      if (!asV3._def && !asV4._zod) {
        let values3 = Object.values(schema);
        if (values3.length > 0 && values3.every((v2) => typeof v2 == "object" && v2 !== null && (v2._def !== void 0 || v2._zod !== void 0 || typeof v2.parse == "function")))
          return objectFromShape(schema);
      }
    }
    if (isZ4Schema(schema)) {
      let def2 = schema._zod?.def;
      if (def2 && (def2.type === "object" || def2.shape !== void 0))
        return schema;
    } else if (schema.shape !== void 0)
      return schema;
  }
}
function getDotPath(path3) {
  return path3.length === 0 ? "object root" : path3.reduce((acc, seg, index4) => index4 === 0 ? String(seg) : typeof seg == "number" ? `${acc}[${seg}]` : `${acc}.${seg}`, "");
}
function getParseErrorMessage(error64) {
  if (error64 && typeof error64 == "object") {
    if ("issues" in error64 && Array.isArray(error64.issues) && error64.issues.length > 0)
      return error64.issues.map((i) => i.path?.length ? `${i.message} at ${getDotPath(i.path)}` : i.message).join(`
`);
    if ("message" in error64 && typeof error64.message == "string")
      return error64.message;
    try {
      return JSON.stringify(error64);
    } catch {
      return String(error64);
    }
  }
  return String(error64);
}
function getSchemaDescription(schema) {
  return schema.description;
}
function isSchemaOptional(schema) {
  if (isZ4Schema(schema))
    return schema._zod?.def?.type === "optional";
  let v3Schema = schema;
  return typeof schema.isOptional == "function" ? schema.isOptional() : v3Schema._def?.typeName === "ZodOptional";
}
function getLiteralValue(schema) {
  if (isZ4Schema(schema)) {
    let def3 = schema._zod?.def;
    if (def3) {
      if (def3.value !== void 0)
        return def3.value;
      if (Array.isArray(def3.values) && def3.values.length > 0)
        return def3.values[0];
    }
  }
  let def2 = schema._def;
  if (def2) {
    if (def2.value !== void 0)
      return def2.value;
    if (Array.isArray(def2.values) && def2.values.length > 0)
      return def2.values[0];
  }
  let directValue = schema.value;
  if (directValue !== void 0)
    return directValue;
}

// node_modules/zod/v4/classic/external.js
var external_exports = {};
__export(external_exports, {
  $brand: () => $brand,
  $input: () => $input,
  $output: () => $output,
  INVALID: () => INVALID2,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  ZodAny: () => ZodAny2,
  ZodArray: () => ZodArray2,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt2,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean2,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch2,
  ZodCodec: () => ZodCodec,
  ZodCompileAsyncError: () => ZodCompileAsyncError,
  ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
  ZodCreditCard: () => ZodCreditCard,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate2,
  ZodDefault: () => ZodDefault2,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion2,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum2,
  ZodError: () => ZodError2,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind2,
  ZodFunction: () => ZodFunction2,
  ZodGUID: () => ZodGUID,
  ZodIBAN: () => ZodIBAN,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  ZodInstanceOf: () => ZodInstanceOf,
  ZodIntersection: () => ZodIntersection2,
  ZodIssueCode: () => ZodIssueCode2,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy2,
  ZodLiteral: () => ZodLiteral2,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap2,
  ZodNaN: () => ZodNaN2,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever2,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull2,
  ZodNullable: () => ZodNullable2,
  ZodNumber: () => ZodNumber2,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject2,
  ZodOptional: () => ZodOptional2,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPreprocess: () => ZodPreprocess,
  ZodPromise: () => ZodPromise2,
  ZodReadonly: () => ZodReadonly2,
  ZodRealError: () => ZodRealError,
  ZodRecord: () => ZodRecord2,
  ZodSet: () => ZodSet2,
  ZodString: () => ZodString2,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol2,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple2,
  ZodType: () => ZodType2,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined2,
  ZodUnion: () => ZodUnion2,
  ZodUnknown: () => ZodUnknown2,
  ZodVoid: () => ZodVoid2,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  clone: () => clone,
  codec: () => codec,
  coerce: () => coerce_exports2,
  compile: () => compile,
  config: () => config,
  core: () => core_exports2,
  creditCard: () => creditCard2,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  currencyCode: () => currencyCode2,
  custom: () => custom,
  date: () => date2,
  decode: () => decode2,
  decodeAsync: () => decodeAsync2,
  deepPartial: () => deepPartial,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  encode: () => encode2,
  encodeAsync: () => encodeAsync2,
  endsWith: () => _endsWith,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  flattenError: () => flattenError,
  float32: () => float32,
  float64: () => float64,
  formatError: () => formatError,
  fromJSONSchema: () => fromJSONSchema,
  function: () => _function,
  getDiscriminatedOption: () => getDiscriminatedOption,
  getErrorMap: () => getErrorMap2,
  globalRegistry: () => globalRegistry,
  gt: () => _gt,
  gte: () => _gte,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  iban: () => iban2,
  includes: () => _includes,
  input: () => input,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  invertCodec: () => invertCodec,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  iso: () => iso_exports2,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  length: () => _length,
  literal: () => literal,
  locales: () => locales_exports,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  mac: () => mac2,
  map: () => map,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  memoizer: () => memoizer,
  meta: () => meta2,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  negative: () => _negative,
  never: () => never,
  nonnegative: () => _nonnegative,
  nonoptional: () => nonoptional,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object2,
  optional: () => optional,
  output: () => output,
  overwrite: () => _overwrite,
  parse: () => parse2,
  parseAsync: () => parseAsync2,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  positive: () => _positive,
  prefault: () => prefault,
  preprocess: () => preprocess,
  prettifyError: () => prettifyError,
  promise: () => promise,
  properties: () => _properties,
  property: () => _property,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  regex: () => _regex,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeEncode: () => safeEncode2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeParse: () => safeParse3,
  safeParseAsync: () => safeParseAsync3,
  set: () => set,
  setErrorMap: () => setErrorMap,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  toJSONSchema: () => toJSONSchema,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  toZod: () => toZod,
  transform: () => transform,
  treeifyError: () => treeifyError,
  trim: () => _trim,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  uppercase: () => _uppercase,
  url: () => url,
  util: () => util_exports,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  validate: () => validate,
  validateAsync: () => validateAsync,
  void: () => _void2,
  withParser: () => withParser,
  xid: () => xid2,
  xor: () => xor
});

// node_modules/zod/v4/classic/schemas.js
var schemas_exports2 = {};
__export(schemas_exports2, {
  ZodAny: () => ZodAny2,
  ZodArray: () => ZodArray2,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt2,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean2,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch2,
  ZodCodec: () => ZodCodec,
  ZodCreditCard: () => ZodCreditCard,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate2,
  ZodDefault: () => ZodDefault2,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion2,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum2,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFunction: () => ZodFunction2,
  ZodGUID: () => ZodGUID,
  ZodIBAN: () => ZodIBAN,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  ZodInstanceOf: () => ZodInstanceOf,
  ZodIntersection: () => ZodIntersection2,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy2,
  ZodLiteral: () => ZodLiteral2,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap2,
  ZodNaN: () => ZodNaN2,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever2,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull2,
  ZodNullable: () => ZodNullable2,
  ZodNumber: () => ZodNumber2,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject2,
  ZodOptional: () => ZodOptional2,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPreprocess: () => ZodPreprocess,
  ZodPromise: () => ZodPromise2,
  ZodReadonly: () => ZodReadonly2,
  ZodRecord: () => ZodRecord2,
  ZodSet: () => ZodSet2,
  ZodString: () => ZodString2,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol2,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple2,
  ZodType: () => ZodType2,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined2,
  ZodUnion: () => ZodUnion2,
  ZodUnknown: () => ZodUnknown2,
  ZodVoid: () => ZodVoid2,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint2,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  codec: () => codec,
  creditCard: () => creditCard2,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  currencyCode: () => currencyCode2,
  custom: () => custom,
  date: () => date2,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  float32: () => float32,
  float64: () => float64,
  function: () => _function,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  iban: () => iban2,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  invertCodec: () => invertCodec,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  json: () => json,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  literal: () => literal,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  mac: () => mac2,
  map: () => map,
  meta: () => meta2,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  never: () => never,
  nonoptional: () => nonoptional,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object2,
  optional: () => optional,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  prefault: () => prefault,
  preprocess: () => preprocess,
  promise: () => promise,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  set: () => set,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  transform: () => transform,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  url: () => url,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});

// node_modules/zod/v4/classic/checks.js
var checks_exports2 = {};
__export(checks_exports2, {
  endsWith: () => _endsWith,
  gt: () => _gt,
  gte: () => _gte,
  includes: () => _includes,
  length: () => _length,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  negative: () => _negative,
  nonnegative: () => _nonnegative,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  overwrite: () => _overwrite,
  positive: () => _positive,
  properties: () => _properties,
  property: () => _property,
  regex: () => _regex,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  trim: () => _trim,
  uppercase: () => _uppercase
});

// node_modules/zod/v4/classic/errors.js
var _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function _lazyMethod(proto, key2, make) {
  Object.defineProperty(proto, key2, {
    configurable: !0,
    enumerable: !1,
    get() {
      let value3 = make(this);
      return Object.defineProperty(this, key2, { value: value3, configurable: !0, writable: !0 }), value3;
    },
    set(value3) {
      Object.defineProperty(this, key2, { value: value3, configurable: !0, writable: !0 });
    }
  });
}
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues), inst.name = "ZodError";
  let proto = Object.getPrototypeOf(inst);
  _installedErrorProtos.has(proto) || (_installedErrorProtos.add(proto), _lazyMethod(proto, "format", (self2) => (mapper) => formatError(self2, mapper)), _lazyMethod(proto, "flatten", (self2) => (mapper) => flattenError(self2, mapper)), _lazyMethod(proto, "addIssue", (self2) => (issue2) => {
    self2.issues.push(issue2), self2.message = JSON.stringify(self2.issues, jsonStringifyReplacer, 2);
  }), _lazyMethod(proto, "addIssues", (self2) => (issues2) => {
    self2.issues.push(...issues2), self2.message = JSON.stringify(self2.issues, jsonStringifyReplacer, 2);
  }), Object.defineProperty(proto, "isEmpty", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this.issues.length === 0;
    }
  }));
}, ZodError2 = /* @__PURE__ */ $constructor("ZodError", initializer2), ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, void 0, {
  Parent: Error
});

// node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError), parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError), safeParse3 = /* @__PURE__ */ _safeParse(ZodRealError), safeParseAsync3 = /* @__PURE__ */ _safeParseAsync(ZodRealError), encode2 = /* @__PURE__ */ _encode(ZodRealError), decode2 = /* @__PURE__ */ _decode(ZodRealError), encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError), decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError), safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError), safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError), safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError), safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// node_modules/zod/v4/classic/schemas.js
function _ensureDefaultLocale() {
  globalConfig.localeError || config(en_default2());
}
function _ensureDefaultMemoizer() {
  globalConfig.memoizer || config({ memoizer: memoizer() });
}
var ZodType2 = /* @__PURE__ */ $constructor("ZodType", (inst, def2) => (_ensureDefaultLocale(), $ZodType.init(inst, def2), inst.def = def2, inst.type = def2.type, inst), {
  check(...chks) {
    let def2 = this.def;
    return this.clone(util_exports.mergeDefs(def2, {
      checks: [
        ...def2.checks ?? [],
        ...chks.map((ch2) => typeof ch2 == "function" ? { _zod: { check: ch2, def: { check: "custom" }, onattach: [] } } : ch2)
      ]
    }), { parent: !0 });
  },
  with(...chks) {
    return this.check(...chks);
  },
  clone(def2, params2) {
    return clone(this, def2, params2);
  },
  brand() {
    return this;
  },
  register(reg, meta3) {
    return reg.add(this, meta3), this;
  },
  refine(check2, params2) {
    return this.check(refine(check2, params2));
  },
  superRefine(refinement, params2) {
    return this.check(superRefine(refinement, params2));
  },
  overwrite(fn) {
    return this.check(_overwrite(fn));
  },
  optional() {
    return optional(this);
  },
  exactOptional() {
    return exactOptional(this);
  },
  nullable() {
    return nullable(this);
  },
  nullish() {
    return optional(nullable(this));
  },
  nonoptional(params2) {
    return nonoptional(this, params2);
  },
  array() {
    return array(this);
  },
  or(arg) {
    return union([this, arg]);
  },
  and(arg) {
    return intersection(this, arg);
  },
  transform(tx) {
    return pipe(this, transform(tx));
  },
  default(d) {
    return _default2(this, d);
  },
  prefault(d) {
    return prefault(this, d);
  },
  catch(params2) {
    return _catch2(this, params2);
  },
  pipe(target3) {
    return pipe(this, target3);
  },
  readonly() {
    return readonly(this);
  },
  describe(description2) {
    let cl = this.clone();
    return globalRegistry.add(cl, { description: description2 }), cl;
  },
  meta(...args) {
    if (args.length === 0)
      return globalRegistry.get(this);
    let cl = this.clone();
    return globalRegistry.add(cl, args[0]), cl;
  },
  isOptional() {
    return this.safeParse(void 0).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(fn, ...args) {
    return args.length === 0 ? fn(this) : fn(this, ...args);
  },
  // Overrides core's `~standard` to add `jsonSchema`. Must stay a prototype entry: redefining it per instance demotes instances to dictionary mode.
  get "~standard"() {
    return util_exports.hide(this, "~standard", {
      ...standardProps(this),
      jsonSchema: {
        input: createStandardJSONSchemaMethod(this, "input"),
        output: createStandardJSONSchemaMethod(this, "output")
      }
    });
  },
  set "~standard"(value3) {
    util_exports.own(this, "~standard", value3);
  },
  parse: function _parse2(data3, params2) {
    return parse2(this, data3, params2, { callee: _parse2 });
  },
  parseAsync: async function _parseAsync2(data3, params2) {
    return await parseAsync2(this, data3, params2, { callee: _parseAsync2 });
  },
  safeParse(data3, params2) {
    return safeParse3(this, data3, params2);
  },
  async safeParseAsync(data3, params2) {
    return safeParseAsync3(this, data3, params2);
  },
  // `spa` is an alias: same function object as `safeParseAsync`, as before.
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(value3) {
    util_exports.own(this, "spa", value3);
  },
  validate(data3, params2) {
    return validate(this, data3, params2);
  },
  validateAsync(data3, params2) {
    return validateAsync(this, data3, params2);
  },
  encode: function _encode2(data3, params2) {
    return encode2(this, data3, params2, { callee: _encode2 });
  },
  decode: function _decode2(data3, params2) {
    return decode2(this, data3, params2, { callee: _decode2 });
  },
  encodeAsync: async function _encodeAsync2(data3, params2) {
    return await encodeAsync2(this, data3, params2, { callee: _encodeAsync2 });
  },
  decodeAsync: async function _decodeAsync2(data3, params2) {
    return await decodeAsync2(this, data3, params2, { callee: _decodeAsync2 });
  },
  safeEncode(data3, params2) {
    return safeEncode2(this, data3, params2);
  },
  safeDecode(data3, params2) {
    return safeDecode2(this, data3, params2);
  },
  async safeEncodeAsync(data3, params2) {
    return safeEncodeAsync2(this, data3, params2);
  },
  async safeDecodeAsync(data3, params2) {
    return safeDecodeAsync2(this, data3, params2);
  },
  toJSONSchema(params2) {
    return createToJSONSchemaMethod(this, {})(params2);
  },
  // Reads through to the registry on every access, so it must not cache.
  get description() {
    return globalRegistry.get(this)?.description;
  },
  // No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
  get _def() {
    return this._zod.def;
  }
}), _ZodString = /* @__PURE__ */ $constructor(
  "_ZodString",
  (inst, def2) => {
    $ZodString.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => stringProcessor(inst, ctx, json3, params2);
  },
  /* @__PURE__ */ util_exports.derived({
    format: (inst) => aggregateChecks(inst).format ?? null,
    minLength: (inst) => aggregateChecks(inst).minimum ?? null,
    maxLength: (inst) => aggregateChecks(inst).maximum ?? null
  }, {
    regex(...args) {
      return this.check(_regex(...args));
    },
    includes(...args) {
      return this.check(_includes(...args));
    },
    startsWith(...args) {
      return this.check(_startsWith(...args));
    },
    endsWith(...args) {
      return this.check(_endsWith(...args));
    },
    min(...args) {
      return this.check(_minLength(...args));
    },
    max(...args) {
      return this.check(_maxLength(...args));
    },
    length(...args) {
      return this.check(_length(...args));
    },
    nonempty(...args) {
      return this.check(_minLength(1, ...args));
    },
    lowercase(params2) {
      return this.check(_lowercase(params2));
    },
    uppercase(params2) {
      return this.check(_uppercase(params2));
    },
    trim() {
      return this.check(_trim());
    },
    normalize(...args) {
      return this.check(_normalize(...args));
    },
    toLowerCase() {
      return this.check(_toLowerCase());
    },
    toUpperCase() {
      return this.check(_toUpperCase());
    },
    slugify() {
      return this.check(_slugify());
    }
  })
), ZodString2 = /* @__PURE__ */ $constructor("ZodString", (inst, def2) => {
  $ZodString.init(inst, def2), _ZodString.init(inst, def2);
}, {
  email(params2) {
    return this.check(_email(ZodEmail, params2));
  },
  url(params2) {
    return this.check(_url(ZodURL, params2));
  },
  jwt(params2) {
    return this.check(_jwt(ZodJWT, params2));
  },
  emoji(params2) {
    return this.check(_emoji2(ZodEmoji, params2));
  },
  guid(params2) {
    return this.check(_guid(ZodGUID, params2));
  },
  uuid(params2) {
    return this.check(_uuid(ZodUUID, params2));
  },
  uuidv4(params2) {
    return this.check(_uuidv4(ZodUUID, params2));
  },
  uuidv6(params2) {
    return this.check(_uuidv6(ZodUUID, params2));
  },
  uuidv7(params2) {
    return this.check(_uuidv7(ZodUUID, params2));
  },
  nanoid(params2) {
    return this.check(_nanoid(ZodNanoID, params2));
  },
  cuid(params2) {
    return this.check(_cuid(ZodCUID, params2));
  },
  cuid2(params2) {
    return this.check(_cuid2(ZodCUID2, params2));
  },
  ulid(params2) {
    return this.check(_ulid(ZodULID, params2));
  },
  base64(params2) {
    return this.check(_base64(ZodBase64, params2));
  },
  base64url(params2) {
    return this.check(_base64url(ZodBase64URL, params2));
  },
  xid(params2) {
    return this.check(_xid(ZodXID, params2));
  },
  ksuid(params2) {
    return this.check(_ksuid(ZodKSUID, params2));
  },
  ipv4(params2) {
    return this.check(_ipv4(ZodIPv4, params2));
  },
  ipv6(params2) {
    return this.check(_ipv6(ZodIPv6, params2));
  },
  cidrv4(params2) {
    return this.check(_cidrv4(ZodCIDRv4, params2));
  },
  cidrv6(params2) {
    return this.check(_cidrv6(ZodCIDRv6, params2));
  },
  e164(params2) {
    return this.check(_e164(ZodE164, params2));
  },
  datetime(params2) {
    return this.check(_isoDateTime(ZodISODateTime, params2));
  },
  date(params2) {
    return this.check(_isoDate(ZodISODate, params2));
  },
  time(params2) {
    return this.check(_isoTime(ZodISOTime, params2));
  },
  duration(params2) {
    return this.check(_isoDuration(ZodISODuration, params2));
  }
});
function string2(params2) {
  return _string(ZodString2, params2);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def2) => {
  $ZodStringFormat.init(inst, def2), _ZodString.init(inst, def2);
}), ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def2) => {
  $ZodISODateTime.init(inst, def2), ZodStringFormat.init(inst, def2);
}), ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def2) => {
  $ZodISODate.init(inst, def2), ZodStringFormat.init(inst, def2);
}), ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def2) => {
  $ZodISOTime.init(inst, def2), ZodStringFormat.init(inst, def2);
}), ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def2) => {
  $ZodISODuration.init(inst, def2), ZodStringFormat.init(inst, def2);
}), ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def2) => {
  $ZodEmail.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function email2(params2) {
  return _email(ZodEmail, params2);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def2) => {
  $ZodGUID.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function guid2(params2) {
  return _guid(ZodGUID, params2);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def2) => {
  $ZodUUID.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function uuid2(params2) {
  return _uuid(ZodUUID, params2);
}
function uuidv4(params2) {
  return _uuidv4(ZodUUID, params2);
}
function uuidv6(params2) {
  return _uuidv6(ZodUUID, params2);
}
function uuidv7(params2) {
  return _uuidv7(ZodUUID, params2);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def2) => {
  $ZodURL.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function url(params2) {
  return _url(ZodURL, params2);
}
function httpUrl(params2) {
  return _url(ZodURL, {
    protocol: httpProtocol,
    hostname: domain,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def2) => {
  $ZodEmoji.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function emoji2(params2) {
  return _emoji2(ZodEmoji, params2);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def2) => {
  $ZodNanoID.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function nanoid2(params2) {
  return _nanoid(ZodNanoID, params2);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def2) => {
  $ZodCUID.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function cuid3(params2) {
  return _cuid(ZodCUID, params2);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def2) => {
  $ZodCUID2.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function cuid22(params2) {
  return _cuid2(ZodCUID2, params2);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def2) => {
  $ZodULID.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function ulid2(params2) {
  return _ulid(ZodULID, params2);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def2) => {
  $ZodXID.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function xid2(params2) {
  return _xid(ZodXID, params2);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def2) => {
  $ZodKSUID.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function ksuid2(params2) {
  return _ksuid(ZodKSUID, params2);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def2) => {
  $ZodIPv4.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function ipv42(params2) {
  return _ipv4(ZodIPv4, params2);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def2) => {
  $ZodMAC.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function mac2(params2) {
  return _mac(ZodMAC, params2);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def2) => {
  $ZodIPv6.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function ipv62(params2) {
  return _ipv6(ZodIPv6, params2);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def2) => {
  $ZodCIDRv4.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function cidrv42(params2) {
  return _cidrv4(ZodCIDRv4, params2);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def2) => {
  $ZodCIDRv6.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function cidrv62(params2) {
  return _cidrv6(ZodCIDRv6, params2);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def2) => {
  $ZodBase64.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function base642(params2) {
  return _base64(ZodBase64, params2);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def2) => {
  $ZodBase64URL.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function base64url2(params2) {
  return _base64url(ZodBase64URL, params2);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def2) => {
  $ZodE164.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function e1642(params2) {
  return _e164(ZodE164, params2);
}
var ZodCreditCard = /* @__PURE__ */ $constructor("ZodCreditCard", (inst, def2) => {
  $ZodCreditCard.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function creditCard2(params2) {
  return _creditCard(ZodCreditCard, params2);
}
var ZodIBAN = /* @__PURE__ */ $constructor("ZodIBAN", (inst, def2) => {
  $ZodIBAN.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function iban2(params2) {
  return _iban(ZodIBAN, params2);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def2) => {
  $ZodJWT.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function jwt(params2) {
  return _jwt(ZodJWT, params2);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def2) => {
  $ZodCustomStringFormat.init(inst, def2), ZodStringFormat.init(inst, def2);
});
function stringFormat(format5, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format5, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", hex, _params);
}
function currencyCode2(_params) {
  return _stringFormat(ZodCustomStringFormat, "currency_code", currencyCode, _params);
}
function hash(alg, params2) {
  let enc = params2?.enc ?? "hex", format5 = `${alg}_${enc}`, regex = regexes_exports[format5];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format5}`);
  return _stringFormat(ZodCustomStringFormat, format5, regex, params2);
}
var ZodNumber2 = /* @__PURE__ */ $constructor(
  "ZodNumber",
  (inst, def2) => {
    $ZodNumber.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => numberProcessor(inst, ctx, json3, params2), inst.isFinite = !0;
  },
  /* @__PURE__ */ util_exports.derived({
    minValue: (inst) => {
      let { minimum, exclusiveMinimum } = aggregateChecks(inst);
      return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
    },
    maxValue: (inst) => {
      let { maximum, exclusiveMaximum } = aggregateChecks(inst);
      return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
    },
    isInt: (inst) => {
      let { isInt, multipleOf } = aggregateChecks(inst);
      return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
    },
    format: (inst) => aggregateChecks(inst).format ?? null
  }, {
    gt(value3, params2) {
      return this.check(_gt(value3, params2));
    },
    gte(value3, params2) {
      return this.check(_gte(value3, params2));
    },
    min(value3, params2) {
      return this.check(_gte(value3, params2));
    },
    lt(value3, params2) {
      return this.check(_lt(value3, params2));
    },
    lte(value3, params2) {
      return this.check(_lte(value3, params2));
    },
    max(value3, params2) {
      return this.check(_lte(value3, params2));
    },
    int(params2) {
      return this.check(int(params2));
    },
    safe(params2) {
      return this.check(int(params2));
    },
    positive(params2) {
      return this.check(_gt(0, params2));
    },
    nonnegative(params2) {
      return this.check(_gte(0, params2));
    },
    negative(params2) {
      return this.check(_lt(0, params2));
    },
    nonpositive(params2) {
      return this.check(_lte(0, params2));
    },
    multipleOf(value3, params2) {
      return this.check(_multipleOf(value3, params2));
    },
    step(value3, params2) {
      return this.check(_multipleOf(value3, params2));
    },
    finite() {
      return this;
    }
  })
);
function number2(params2) {
  return _number(ZodNumber2, params2);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def2) => {
  $ZodNumberFormat.init(inst, def2), ZodNumber2.init(inst, def2);
});
function int(params2) {
  return _int(ZodNumberFormat, params2);
}
function float32(params2) {
  return _float32(ZodNumberFormat, params2);
}
function float64(params2) {
  return _float64(ZodNumberFormat, params2);
}
function int32(params2) {
  return _int32(ZodNumberFormat, params2);
}
function uint32(params2) {
  return _uint32(ZodNumberFormat, params2);
}
var ZodBoolean2 = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def2) => {
  $ZodBoolean.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => booleanProcessor(inst, ctx, json3, params2);
});
function boolean2(params2) {
  return _boolean(ZodBoolean2, params2);
}
var ZodBigInt2 = /* @__PURE__ */ $constructor(
  "ZodBigInt",
  (inst, def2) => {
    $ZodBigInt.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => bigintProcessor(inst, ctx, json3, params2);
  },
  /* @__PURE__ */ util_exports.derived({
    minValue: (inst) => aggregateChecks(inst).minimum ?? null,
    maxValue: (inst) => aggregateChecks(inst).maximum ?? null,
    format: (inst) => aggregateChecks(inst).format ?? null
  }, {
    gte(value3, params2) {
      return this.check(_gte(value3, params2));
    },
    min(value3, params2) {
      return this.check(_gte(value3, params2));
    },
    gt(value3, params2) {
      return this.check(_gt(value3, params2));
    },
    lt(value3, params2) {
      return this.check(_lt(value3, params2));
    },
    lte(value3, params2) {
      return this.check(_lte(value3, params2));
    },
    max(value3, params2) {
      return this.check(_lte(value3, params2));
    },
    positive(params2) {
      return this.check(_gt(BigInt(0), params2));
    },
    negative(params2) {
      return this.check(_lt(BigInt(0), params2));
    },
    nonpositive(params2) {
      return this.check(_lte(BigInt(0), params2));
    },
    nonnegative(params2) {
      return this.check(_gte(BigInt(0), params2));
    },
    multipleOf(value3, params2) {
      return this.check(_multipleOf(value3, params2));
    }
  })
);
function bigint2(params2) {
  return _bigint(ZodBigInt2, params2);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def2) => {
  $ZodBigIntFormat.init(inst, def2), ZodBigInt2.init(inst, def2);
});
function int64(params2) {
  return _int64(ZodBigIntFormat, params2);
}
function uint64(params2) {
  return _uint64(ZodBigIntFormat, params2);
}
var ZodSymbol2 = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def2) => {
  $ZodSymbol.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => symbolProcessor(inst, ctx, json3, params2);
});
function symbol(params2) {
  return _symbol(ZodSymbol2, params2);
}
var ZodUndefined2 = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def2) => {
  $ZodUndefined.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => undefinedProcessor(inst, ctx, json3, params2);
});
function _undefined3(params2) {
  return _undefined2(ZodUndefined2, params2);
}
var ZodNull2 = /* @__PURE__ */ $constructor("ZodNull", (inst, def2) => {
  $ZodNull.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => nullProcessor(inst, ctx, json3, params2);
});
function _null3(params2) {
  return _null2(ZodNull2, params2);
}
var ZodAny2 = /* @__PURE__ */ $constructor("ZodAny", (inst, def2) => {
  $ZodAny.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => anyProcessor(inst, ctx, json3, params2);
});
function any() {
  return _any(ZodAny2);
}
var ZodUnknown2 = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def2) => {
  $ZodUnknown.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => unknownProcessor(inst, ctx, json3, params2);
});
function unknown() {
  return _unknown(ZodUnknown2);
}
var ZodNever2 = /* @__PURE__ */ $constructor("ZodNever", (inst, def2) => {
  $ZodNever.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => neverProcessor(inst, ctx, json3, params2);
});
function never(params2) {
  return _never(ZodNever2, params2);
}
var ZodVoid2 = /* @__PURE__ */ $constructor("ZodVoid", (inst, def2) => {
  $ZodVoid.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => voidProcessor(inst, ctx, json3, params2);
});
function _void2(params2) {
  return _void(ZodVoid2, params2);
}
var ZodDate2 = /* @__PURE__ */ $constructor(
  "ZodDate",
  (inst, def2) => {
    $ZodDate.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => dateProcessor(inst, ctx, json3, params2), inst.min = (value3, params2) => inst.check(_gte(value3, params2)), inst.max = (value3, params2) => inst.check(_lte(value3, params2));
  },
  /* @__PURE__ */ util_exports.derived({
    minDate: (inst) => {
      let { minimum } = aggregateChecks(inst);
      return minimum ? new Date(minimum) : null;
    },
    maxDate: (inst) => {
      let { maximum } = aggregateChecks(inst);
      return maximum ? new Date(maximum) : null;
    }
  }, {})
);
function date2(params2) {
  return _date(ZodDate2, params2);
}
var ZodArray2 = /* @__PURE__ */ $constructor("ZodArray", (inst, def2) => {
  _ensureDefaultMemoizer(), $ZodArray.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => arrayProcessor(inst, ctx, json3, params2), inst.element = def2.element;
}, {
  min(n, params2) {
    return this.check(_minLength(n, params2));
  },
  nonempty(params2) {
    return this.check(_minLength(1, params2));
  },
  max(n, params2) {
    return this.check(_maxLength(n, params2));
  },
  length(n, params2) {
    return this.check(_length(n, params2));
  },
  unwrap() {
    return this.element;
  }
});
function array(element3, params2) {
  return _array(ZodArray2, element3, params2);
}
function keyof(schema) {
  let shape2 = schema._zod.def.shape;
  return _enum2(Object.keys(shape2));
}
var ZodObject2 = /* @__PURE__ */ $constructor("ZodObject", (inst, def2) => {
  _ensureDefaultMemoizer(), $ZodObjectJIT.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => objectProcessor(inst, ctx, json3, params2), util_exports.installLazyProp(inst, "shape", (self2) => self2._zod.def.shape, !1);
}, {
  keyof() {
    return _enum2(Object.keys(this._zod.def.shape));
  },
  catchall(catchall) {
    return this.clone(util_exports.mergeDefs(this._zod.def, { catchall }));
  },
  passthrough() {
    return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  loose() {
    return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  strict() {
    return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: never() }));
  },
  strip() {
    return this.clone(util_exports.mergeDefs(this._zod.def, { catchall: void 0 }));
  },
  extend(incoming) {
    return util_exports.extend(this, incoming);
  },
  safeExtend(incoming) {
    return util_exports.safeExtend(this, incoming);
  },
  merge(other) {
    return util_exports.merge(this, other);
  },
  pick(mask) {
    return util_exports.pick(this, mask);
  },
  omit(mask) {
    return util_exports.omit(this, mask);
  },
  partial(...args) {
    return util_exports.partial(ZodOptional2, this, args[0]);
  },
  exactPartial(...args) {
    return util_exports.partial(ZodExactOptional, this, args[0], "exactPartial");
  },
  required(...args) {
    return util_exports.required(ZodNonOptional, this, args[0]);
  }
});
function object2(shape2, params2) {
  let def2 = {
    type: "object",
    shape: shape2 ?? {},
    ...util_exports.normalizeParams(params2)
  };
  return new ZodObject2(def2);
}
function strictObject(shape2, params2) {
  return new ZodObject2({
    type: "object",
    shape: shape2,
    catchall: never(),
    ...util_exports.normalizeParams(params2)
  });
}
function looseObject(shape2, params2) {
  return new ZodObject2({
    type: "object",
    shape: shape2,
    catchall: unknown(),
    ...util_exports.normalizeParams(params2)
  });
}
var ZodUnion2 = /* @__PURE__ */ $constructor("ZodUnion", (inst, def2) => {
  $ZodUnion.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => unionProcessor(inst, ctx, json3, params2), inst.options = def2.options;
});
function union(options, params2) {
  return new ZodUnion2({
    type: "union",
    options,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def2) => {
  ZodUnion2.init(inst, def2), $ZodXor.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => unionProcessor(inst, ctx, json3, params2), inst.options = def2.options;
});
function xor(options, params2) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: !1,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodDiscriminatedUnion2 = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def2) => {
  ZodUnion2.init(inst, def2), $ZodDiscriminatedUnion.init(inst, def2);
});
function discriminatedUnion(discriminator, options, params2) {
  return new ZodDiscriminatedUnion2({
    type: "union",
    options,
    discriminator,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodIntersection2 = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def2) => {
  $ZodIntersection.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => intersectionProcessor(inst, ctx, json3, params2);
});
function intersection(left, right) {
  return new ZodIntersection2({
    type: "intersection",
    left,
    right
  });
}
var ZodTuple2 = /* @__PURE__ */ $constructor("ZodTuple", (inst, def2) => {
  _ensureDefaultMemoizer(), $ZodTuple.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => tupleProcessor(inst, ctx, json3, params2);
}, {
  rest(rest) {
    return this.clone({
      ...this._zod.def,
      rest
    });
  },
  partial() {
    let def2 = this._zod.def;
    if (def2.checks?.length)
      throw new Error(".partial() cannot be used on tuple schemas containing refinements");
    return this.clone({
      ...def2,
      items: def2.items.map((item) => new ZodOptional2({ type: "optional", innerType: item }))
    });
  }
});
function tuple(items, _paramsOrRest, _params) {
  let hasRest = _paramsOrRest instanceof $ZodType, params2 = hasRest ? _params : _paramsOrRest, rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple2({
    type: "tuple",
    items,
    rest,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodRecord2 = /* @__PURE__ */ $constructor("ZodRecord", (inst, def2) => {
  _ensureDefaultMemoizer(), $ZodRecord.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => recordProcessor(inst, ctx, json3, params2), inst.keyType = def2.keyType, inst.valueType = def2.valueType;
});
function record(keyType, valueType, params2) {
  return !valueType || !valueType._zod ? new ZodRecord2({
    type: "record",
    keyType: string2(),
    valueType: keyType,
    ...util_exports.normalizeParams(valueType)
  }) : new ZodRecord2({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params2)
  });
}
function partialRecord(keyType, valueType, params2) {
  return new ZodRecord2({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params2),
    partial: !0
  });
}
function looseRecord(keyType, valueType, params2) {
  return new ZodRecord2({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...util_exports.normalizeParams(params2)
  });
}
var ZodMap2 = /* @__PURE__ */ $constructor("ZodMap", (inst, def2) => {
  _ensureDefaultMemoizer(), $ZodMap.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => mapProcessor(inst, ctx, json3, params2), inst.keyType = def2.keyType, inst.valueType = def2.valueType, inst.min = (...args) => inst.check(_minSize(...args)), inst.nonempty = (params2) => inst.check(_minSize(1, params2)), inst.max = (...args) => inst.check(_maxSize(...args)), inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params2) {
  return new ZodMap2({
    type: "map",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodSet2 = /* @__PURE__ */ $constructor("ZodSet", (inst, def2) => {
  _ensureDefaultMemoizer(), $ZodSet.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => setProcessor(inst, ctx, json3, params2), inst.min = (...args) => inst.check(_minSize(...args)), inst.nonempty = (params2) => inst.check(_minSize(1, params2)), inst.max = (...args) => inst.check(_maxSize(...args)), inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params2) {
  return new ZodSet2({
    type: "set",
    valueType,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodEnum2 = /* @__PURE__ */ $constructor("ZodEnum", (inst, def2) => {
  $ZodEnum.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => enumProcessor(inst, ctx, json3, params2), inst.enum = def2.entries, inst.options = [...inst._zod.values];
  let keys4 = new Set(Object.keys(def2.entries));
  inst.extract = (values3, params2) => {
    let newEntries = {};
    for (let value3 of values3)
      if (keys4.has(value3))
        newEntries[value3] = def2.entries[value3];
      else
        throw new Error(`Key ${value3} not found in enum`);
    return new ZodEnum2({
      ...def2,
      checks: [],
      ...util_exports.normalizeParams(params2),
      entries: newEntries
    });
  }, inst.exclude = (values3, params2) => {
    let newEntries = { ...def2.entries };
    for (let value3 of values3)
      if (keys4.has(value3))
        delete newEntries[value3];
      else
        throw new Error(`Key ${value3} not found in enum`);
    return new ZodEnum2({
      ...def2,
      checks: [],
      ...util_exports.normalizeParams(params2),
      entries: newEntries
    });
  };
});
function _enum2(values3, params2) {
  let entries2 = Array.isArray(values3) ? Object.fromEntries(values3.map((v2) => [v2, v2])) : values3;
  return new ZodEnum2({
    type: "enum",
    entries: entries2,
    ...util_exports.normalizeParams(params2)
  });
}
function nativeEnum(entries2, params2) {
  return new ZodEnum2({
    type: "enum",
    entries: entries2,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodLiteral2 = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def2) => {
  $ZodLiteral.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => literalProcessor(inst, ctx, json3, params2), inst.values = new Set(def2.values), Object.defineProperty(inst, "value", {
    get() {
      if (def2.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return def2.values[0];
    }
  });
});
function literal(value3, params2) {
  return new ZodLiteral2({
    type: "literal",
    values: Array.isArray(value3) ? value3 : [value3],
    ...util_exports.normalizeParams(params2)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def2) => {
  $ZodFile.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => fileProcessor(inst, ctx, json3, params2), inst.min = (size, params2) => inst.check(_minSize(size, params2)), inst.max = (size, params2) => inst.check(_maxSize(size, params2)), inst.mime = (types, params2) => inst.check(_mime(Array.isArray(types) ? types : [types], params2));
});
function file(params2) {
  return _file(ZodFile, params2);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def2) => {
  _ensureDefaultMemoizer(), $ZodTransform.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => transformProcessor(inst, ctx, json3, params2), inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward")
      throw new $ZodEncodeError(inst.constructor.name);
    payload.addIssue = (issue2) => {
      if (typeof issue2 == "string")
        payload.issues.push(util_exports.issue(issue2, payload.value, def2));
      else {
        let _issue = issue2;
        _issue.fatal && (_issue.continue = !1), _issue.code ?? (_issue.code = "custom"), "input" in _issue || (_issue.input = payload.value), _issue.inst ?? (_issue.inst = inst), payload.issues.push(util_exports.issue(_issue));
      }
    };
    let output4 = def2.transform(payload.value, payload);
    return output4 instanceof Promise ? output4.then((output5) => (payload.value = output5, payload)) : (payload.value = output4, payload);
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional2 = /* @__PURE__ */ $constructor("ZodOptional", (inst, def2) => {
  $ZodOptional.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => optionalProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional2({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def2) => {
  $ZodExactOptional.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => optionalProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable2 = /* @__PURE__ */ $constructor("ZodNullable", (inst, def2) => {
  $ZodNullable.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => nullableProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable2({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault2 = /* @__PURE__ */ $constructor("ZodDefault", (inst, def2) => {
  $ZodDefault.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => defaultProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType, inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue == "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def2) => {
  $ZodPrefault.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => prefaultProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue == "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def2) => {
  $ZodNonOptional.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => nonoptionalProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params2) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def2) => {
  $ZodSuccess.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => successProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch2 = /* @__PURE__ */ $constructor("ZodCatch", (inst, def2) => {
  $ZodCatch.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => catchProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType, inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue == "function" ? catchValue : util_exports.constantCatch(catchValue)
  });
}
var ZodNaN2 = /* @__PURE__ */ $constructor("ZodNaN", (inst, def2) => {
  $ZodNaN.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => nanProcessor(inst, ctx, json3, params2);
});
function nan(params2) {
  return _nan(ZodNaN2, params2);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def2) => {
  $ZodPipe.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => pipeProcessor(inst, ctx, json3, params2), inst.in = def2.in, inst.out = def2.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def2) => {
  ZodPipe.init(inst, def2), $ZodCodec.init(inst, def2);
});
function codec(in_, out, params2) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params2.decode,
    reverseTransform: params2.encode
  });
}
function invertCodec(codec2) {
  let def2 = codec2._zod.def;
  return new ZodCodec({
    type: "pipe",
    in: def2.out,
    out: def2.in,
    transform: def2.reverseTransform,
    reverseTransform: def2.transform
  });
}
var ZodPreprocess = /* @__PURE__ */ $constructor("ZodPreprocess", (inst, def2) => {
  ZodPipe.init(inst, def2), $ZodPreprocess.init(inst, def2);
}), ZodReadonly2 = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def2) => {
  $ZodReadonly.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => readonlyProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly2({
    type: "readonly",
    innerType
  });
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def2) => {
  $ZodTemplateLiteral.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => templateLiteralProcessor(inst, ctx, json3, params2);
});
function templateLiteral(parts, params2) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...util_exports.normalizeParams(params2)
  });
}
var ZodLazy2 = /* @__PURE__ */ $constructor("ZodLazy", (inst, def2) => {
  $ZodLazy.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => lazyProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter3) {
  return new ZodLazy2({
    type: "lazy",
    getter: getter3
  });
}
var ZodPromise2 = /* @__PURE__ */ $constructor("ZodPromise", (inst, def2) => {
  $ZodPromise.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => promiseProcessor(inst, ctx, json3, params2), inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise2({
    type: "promise",
    innerType
  });
}
var ZodFunction2 = /* @__PURE__ */ $constructor("ZodFunction", (inst, def2) => {
  $ZodFunction.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => functionProcessor(inst, ctx, json3, params2);
});
function _function(params2) {
  return new ZodFunction2({
    type: "function",
    input: Array.isArray(params2?.input) ? tuple(params2?.input) : params2?.input ?? array(unknown()),
    output: params2?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def2) => {
  $ZodCustom.init(inst, def2), ZodType2.init(inst, def2), inst._zod.processJSONSchema = (ctx, json3, params2) => customProcessor(inst, ctx, json3, params2);
});
function check(fn) {
  let ch2 = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  return ch2._zod.check = fn, ch2;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => !0), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params2) {
  return _superRefine(fn, params2);
}
var describe2 = describe, meta2 = meta, ZodInstanceOf = /* @__PURE__ */ $constructor("ZodInstanceOf", (inst, def2) => {
  ZodCustom.init(inst, def2);
}, {
  properties(shape2, params2) {
    return this.check(_properties(shape2, params2));
  }
});
function _instanceof(cls, params2 = {}) {
  let inst = new ZodInstanceOf({
    type: "custom",
    check: "custom",
    fn: (data3) => data3 instanceof cls,
    abort: !0,
    ...util_exports.normalizeParams(params2)
  });
  return inst._zod.bag.Class = cls, inst._zod.check = (payload) => {
    payload.value instanceof cls || payload.issues.push({
      code: "invalid_type",
      expected: cls.name,
      input: payload.value,
      inst,
      path: [...inst._zod.def.path ?? []]
    });
  }, inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean2,
  String: ZodString2
}, ...args);
function json(params2) {
  let jsonSchema = lazy(() => union([string2(params2), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]));
  return jsonSchema;
}
function preprocess(fn, schema) {
  return new ZodPreprocess({
    type: "pipe",
    in: transform(fn),
    out: schema
  });
}

// node_modules/zod/v4/classic/compat.js
var ZodIssueCode2 = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map4) {
  config({
    customError: map4
  });
}
function getErrorMap2() {
  return config().customError;
}
var ZodFirstPartyTypeKind2;
ZodFirstPartyTypeKind2 || (ZodFirstPartyTypeKind2 = {});

// node_modules/zod/v4/classic/iso.js
var iso_exports2 = {};
__export(iso_exports2, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date3,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time2
});
function datetime2(params2) {
  return _isoDateTime(ZodISODateTime, params2);
}
function date3(params2) {
  return _isoDate(ZodISODate, params2);
}
function time2(params2) {
  return _isoTime(ZodISOTime, params2);
}
function duration2(params2) {
  return _isoDuration(ZodISODuration, params2);
}

// node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...schemas_exports2,
  ...checks_exports2,
  iso: iso_exports2
}, RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
  // Schema identification
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  // Core schema keywords
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  // Type
  "type",
  "enum",
  "const",
  // Composition
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  // Object
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  // Array
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  // String
  "minLength",
  "maxLength",
  "pattern",
  "format",
  // Number
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  // Already handled metadata
  "description",
  "default",
  // Content
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  // Unsupported (error-throwing)
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  // OpenAPI
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  let $schema = schema.$schema;
  return $schema === "https://json-schema.org/draft/2020-12/schema" ? "draft-2020-12" : $schema === "http://json-schema.org/draft-07/schema#" ? "draft-7" : $schema === "http://json-schema.org/draft-04/schema#" ? "draft-4" : defaultTarget ?? "draft-2020-12";
}
function applyMinItems(items, minItems) {
  return items.map((item, index4) => index4 < minItems ? item : item.optional());
}
function decodeJSONPointerSegment(segment) {
  return segment.replace(/~1/g, "/").replace(/~0/g, "~");
}
function resolveRef(ref2, ctx) {
  if (!ref2.startsWith("#"))
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  let path3 = ref2.slice(1).split("/").filter(Boolean);
  if (path3.length === 0)
    return ctx.rootSchema;
  let defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path3[0] === defsKey) {
    let key2 = path3[1] === void 0 ? void 0 : decodeJSONPointerSegment(path3[1]);
    if (!key2 || !ctx.defs[key2])
      throw new Error(`Reference not found: ${ref2}`);
    return ctx.defs[key2];
  }
  throw new Error(`Reference not found: ${ref2}`);
}
function checkObjectGuards(objectSchema, guards) {
  return z.transform((value3) => value3).check((payload) => {
    let value3 = payload.value;
    if (typeof value3 != "object" || value3 === null || Array.isArray(value3))
      return;
    let keys4 = Object.getOwnPropertyNames(value3);
    if (guards.minProperties !== void 0 && keys4.length < guards.minProperties && payload.issues.push({
      origin: "object",
      code: "too_small",
      minimum: guards.minProperties,
      inclusive: !0,
      message: `Too small: expected object to have >=${guards.minProperties} properties`,
      input: value3,
      inst: objectSchema,
      continue: !0
    }), guards.maxProperties !== void 0 && keys4.length > guards.maxProperties && payload.issues.push({
      origin: "object",
      code: "too_big",
      maximum: guards.maxProperties,
      inclusive: !0,
      message: `Too big: expected object to have <=${guards.maxProperties} properties`,
      input: value3,
      inst: objectSchema,
      continue: !0
    }), guards.keySchema)
      for (let key2 of keys4) {
        let result = guards.keySchema.safeParse(key2);
        result.success || payload.issues.push({
          code: "invalid_key",
          origin: "record",
          issues: result.error.issues,
          input: key2,
          path: [key2],
          continue: !0
        });
      }
  }).pipe(objectSchema);
}
function canonicalKey(value3, seen) {
  if (value3 === null)
    return "z";
  let type3 = typeof value3;
  if (type3 !== "object") {
    if (type3 === "number" && Number.isNaN(value3))
      return null;
    let raw = String(value3);
    return `${type3[0]}${raw.length}:${raw}`;
  }
  if (seen.has(value3))
    return null;
  seen.add(value3);
  try {
    if (Array.isArray(value3)) {
      let parts2 = [];
      for (let item of value3) {
        let key2 = canonicalKey(item, seen);
        if (key2 === null)
          return null;
        parts2.push(key2);
      }
      return `a${parts2.length}:[${parts2.join(",")}]`;
    }
    let keys4 = Object.keys(value3).sort(), parts = [];
    for (let k of keys4) {
      let key2 = canonicalKey(value3[k], seen);
      if (key2 === null)
        return null;
      parts.push(`${k.length}:${k}=${key2}`);
    }
    return `o${parts.length}:{${parts.join(",")}}`;
  } finally {
    seen.delete(value3);
  }
}
var SCHEMA_KEYWORDS = /* @__PURE__ */ new Set([
  "items",
  "prefixItems",
  "additionalItems",
  "additionalProperties",
  "contains",
  "propertyNames",
  "not",
  "if",
  "then",
  "else",
  "allOf",
  "anyOf",
  "oneOf",
  "unevaluatedItems",
  "unevaluatedProperties",
  "contentSchema"
]), SCHEMA_MAP_KEYWORDS = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "dependentSchemas",
  "dependencies",
  "$defs",
  "definitions"
]);
function containsRef(value3) {
  return typeof value3 != "object" || value3 === null ? !1 : Array.isArray(value3) ? value3.some(containsRef) : typeof value3.$ref == "string" ? !0 : Object.entries(value3).some(([key2, sub]) => SCHEMA_KEYWORDS.has(key2) ? containsRef(sub) : !SCHEMA_MAP_KEYWORDS.has(key2) || typeof sub != "object" || sub === null ? !1 : Object.values(sub).some(containsRef));
}
function plural(n) {
  return n === 1 ? "element" : "elements";
}
function checkArrayGuards(arraySchema, guards) {
  return z.transform((value3) => value3).check((payload) => {
    let items = payload.value;
    if (Array.isArray(items)) {
      if (guards.uniqueItems === !0) {
        let firstSeen = /* @__PURE__ */ new Map();
        for (let i = 0; i < items.length; i++) {
          let key2 = canonicalKey(items[i], /* @__PURE__ */ new Set());
          if (key2 === null)
            continue;
          let first = firstSeen.get(key2);
          if (first === void 0) {
            firstSeen.set(key2, i);
            continue;
          }
          payload.issues.push({
            code: "custom",
            message: `Array items must be unique: element at index ${i} duplicates the one at index ${first}`,
            input: items,
            path: [i],
            continue: !0
          });
        }
      }
      if (guards.containsSchema) {
        let minContains = guards.minContains ?? 1, ceiling = guards.maxContains !== void 0 ? guards.maxContains + 1 : Number.POSITIVE_INFINITY, matches = 0;
        for (let item of items)
          if (guards.containsSchema.safeParse(item).success && ++matches >= ceiling)
            break;
        matches < minContains && payload.issues.push({
          code: "custom",
          message: `Array must contain at least ${minContains} matching ${plural(minContains)}; found ${matches}`,
          input: items,
          continue: !0
        }), guards.maxContains !== void 0 && matches > guards.maxContains && payload.issues.push({
          code: "custom",
          message: `Array must contain at most ${guards.maxContains} matching ${plural(guards.maxContains)}`,
          input: items,
          continue: !0
        });
      }
    }
  }).pipe(arraySchema);
}
function getTupleRest(restSchema, ctx) {
  if (restSchema !== !1)
    return restSchema === void 0 || restSchema === !0 ? z.any() : convertSchema(restSchema, ctx);
}
var fullTime = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
function convertBaseSchema(schema, ctx) {
  if (schema.not !== void 0) {
    if (typeof schema.not == "object" && Object.keys(schema.not).length === 0)
      return z.never();
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== void 0)
    throw new Error("unevaluatedItems is not supported");
  if (schema.unevaluatedProperties !== void 0)
    throw new Error("unevaluatedProperties is not supported");
  if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0)
    throw new Error("Conditional schemas (if/then/else) are not supported");
  if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0)
    throw new Error("dependentSchemas and dependentRequired are not supported");
  if (schema.$ref) {
    let refPath = schema.$ref;
    if (ctx.refs.has(refPath))
      return ctx.refs.get(refPath);
    if (ctx.processing.has(refPath))
      return z.lazy(() => {
        if (!ctx.refs.has(refPath))
          throw new Error(`Circular reference not resolved: ${refPath}`);
        return ctx.refs.get(refPath);
      });
    ctx.processing.add(refPath);
    let resolved = resolveRef(refPath, ctx), zodSchema2 = convertSchema(resolved, ctx);
    return ctx.refs.set(refPath, zodSchema2), ctx.processing.delete(refPath), zodSchema2;
  }
  if (schema.enum !== void 0) {
    let enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === !0 && enumValues.length === 1 && enumValues[0] === null)
      return z.null();
    if (enumValues.length === 0)
      return z.never();
    if (enumValues.length === 1)
      return z.literal(enumValues[0]);
    if (enumValues.every((v2) => typeof v2 == "string"))
      return z.enum(enumValues);
    let literalSchemas = enumValues.map((v2) => z.literal(v2));
    return literalSchemas.length < 2 ? literalSchemas[0] : z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== void 0)
    return z.literal(schema.const);
  let type3 = schema.type;
  if (Array.isArray(type3)) {
    let typeSchemas = type3.map((t) => {
      let typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    return typeSchemas.length === 0 ? z.never() : typeSchemas.length === 1 ? typeSchemas[0] : z.union(typeSchemas);
  }
  if (!type3)
    return z.any();
  let zodSchema;
  switch (type3) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        let format5 = schema.format;
        format5 === "email" ? stringSchema = stringSchema.check(z.email()) : format5 === "uri" || format5 === "uri-reference" ? stringSchema = stringSchema.check(z.url()) : format5 === "uuid" || format5 === "guid" ? stringSchema = stringSchema.check(z.uuid()) : format5 === "date-time" ? stringSchema = stringSchema.check(z.iso.datetime({ offset: !0 })) : format5 === "date" ? stringSchema = stringSchema.check(z.iso.date()) : format5 === "time" ? stringSchema = stringSchema.check(z.regex(fullTime)) : format5 === "duration" ? stringSchema = stringSchema.check(z.iso.duration()) : format5 === "hostname" ? stringSchema = stringSchema.check(z.hostname()) : format5 === "ipv4" ? stringSchema = stringSchema.check(z.ipv4()) : format5 === "ipv6" ? stringSchema = stringSchema.check(z.ipv6()) : format5 === "mac" ? stringSchema = stringSchema.check(z.mac()) : format5 === "cidr" ? stringSchema = stringSchema.check(z.cidrv4()) : format5 === "cidr-v6" ? stringSchema = stringSchema.check(z.cidrv6()) : format5 === "base64" ? stringSchema = stringSchema.check(z.base64()) : format5 === "base64url" ? stringSchema = stringSchema.check(z.base64url()) : format5 === "e164" ? stringSchema = stringSchema.check(z.e164()) : format5 === "credit_card" ? stringSchema = stringSchema.check(z.creditCard()) : format5 === "iban" ? stringSchema = stringSchema.check(z.iban()) : format5 === "jwt" ? stringSchema = stringSchema.check(z.jwt()) : format5 === "emoji" ? stringSchema = stringSchema.check(z.emoji()) : format5 === "nanoid" ? stringSchema = stringSchema.check(z.nanoid()) : format5 === "cuid" ? stringSchema = stringSchema.check(z.cuid()) : format5 === "cuid2" ? stringSchema = stringSchema.check(z.cuid2()) : format5 === "ulid" ? stringSchema = stringSchema.check(z.ulid()) : format5 === "xid" ? stringSchema = stringSchema.check(z.xid()) : format5 === "ksuid" && (stringSchema = stringSchema.check(z.ksuid()));
      }
      typeof schema.minLength == "number" && (stringSchema = stringSchema.min(schema.minLength)), typeof schema.maxLength == "number" && (stringSchema = stringSchema.max(schema.maxLength)), schema.pattern && (stringSchema = stringSchema.regex(new RegExp(schema.pattern))), zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type3 === "integer" ? z.number().int() : z.number();
      typeof schema.minimum == "number" && schema.exclusiveMinimum !== !0 && (numberSchema = numberSchema.min(schema.minimum)), typeof schema.maximum == "number" && schema.exclusiveMaximum !== !0 && (numberSchema = numberSchema.max(schema.maximum)), typeof schema.exclusiveMinimum == "number" ? numberSchema = numberSchema.gt(schema.exclusiveMinimum) : schema.exclusiveMinimum === !0 && typeof schema.minimum == "number" && (numberSchema = numberSchema.gt(schema.minimum)), typeof schema.exclusiveMaximum == "number" ? numberSchema = numberSchema.lt(schema.exclusiveMaximum) : schema.exclusiveMaximum === !0 && typeof schema.maximum == "number" && (numberSchema = numberSchema.lt(schema.maximum)), typeof schema.multipleOf == "number" && (numberSchema = numberSchema.multipleOf(schema.multipleOf)), zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      let shape2 = {}, properties = schema.properties || {}, requiredSet = new Set(schema.required || []), additionalSchema = typeof schema.additionalProperties == "object" ? convertSchema(schema.additionalProperties, ctx) : void 0;
      for (let [key2, propSchema] of Object.entries(properties)) {
        let propZodSchema = convertSchema(propSchema, ctx);
        assignProp(shape2, key2, requiredSet.has(key2) ? propZodSchema : propZodSchema.optional());
      }
      if (schema.patternProperties) {
        let patternProps = schema.patternProperties, patternKeys = Object.keys(patternProps), looseRecords = [];
        for (let pattern of patternKeys) {
          let patternValue = convertSchema(patternProps[pattern], ctx), keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        let schemasToIntersect = [];
        if (Object.keys(shape2).length > 0 && schemasToIntersect.push(z.object(shape2).passthrough()), schemasToIntersect.push(...looseRecords), schemasToIntersect.length === 0)
          zodSchema = z.object({}).passthrough();
        else if (schemasToIntersect.length === 1)
          zodSchema = schemasToIntersect[0];
        else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2; i < schemasToIntersect.length; i++)
            result = z.intersection(result, schemasToIntersect[i]);
          zodSchema = result;
        }
        if (schema.additionalProperties === !1) {
          let propertyKeys = Object.keys(shape2), patterns = patternKeys.map((p) => new RegExp(p)), basePatternSchema = zodSchema;
          zodSchema = zodSchema.check((payload) => {
            if (!isPlainObject(payload.value))
              return;
            let unrecognized = [];
            for (let key2 of Object.keys(payload.value))
              propertyKeys.includes(key2) || patterns.some((regex) => regex.test(key2)) || unrecognized.push(key2);
            unrecognized.length && payload.issues.push({
              code: "unrecognized_keys",
              keys: unrecognized,
              input: payload.value,
              inst: basePatternSchema
            });
          });
        }
      } else {
        let objectSchema = z.object(shape2);
        schema.additionalProperties === !1 ? zodSchema = objectSchema.strict() : additionalSchema ? zodSchema = objectSchema.catchall(additionalSchema) : zodSchema = objectSchema.passthrough();
      }
      let hasKeyGuard = schema.propertyNames !== void 0 && schema.propertyNames !== !0, minProperties = typeof schema.minProperties == "number" ? schema.minProperties : void 0, maxProperties = typeof schema.maxProperties == "number" ? schema.maxProperties : void 0;
      if (hasKeyGuard || minProperties !== void 0 || maxProperties !== void 0) {
        let keySchema;
        if (hasKeyGuard) {
          let keyJSONSchema = typeof schema.propertyNames == "object" && schema.propertyNames.type === void 0 ? { type: "string", ...schema.propertyNames } : schema.propertyNames;
          keySchema = convertSchema(keyJSONSchema, ctx);
        }
        zodSchema = checkObjectGuards(zodSchema, { keySchema, minProperties, maxProperties });
      }
      break;
    }
    case "array": {
      let prefixItems = schema.prefixItems, items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        let minItems = typeof schema.minItems == "number" ? schema.minItems : 0, tupleItems = prefixItems.map((item) => convertSchema(item, ctx)), positionalItems = applyMinItems(tupleItems, minItems), rest = Array.isArray(items) ? void 0 : getTupleRest(items, ctx), tupleSchema = z.tuple(positionalItems);
        zodSchema = rest ? tupleSchema.rest(rest) : tupleSchema, typeof schema.minItems == "number" && (zodSchema = zodSchema.check(z.minLength(schema.minItems))), typeof schema.maxItems == "number" && (zodSchema = zodSchema.check(z.maxLength(schema.maxItems)));
      } else if (Array.isArray(items)) {
        let minItems = typeof schema.minItems == "number" ? schema.minItems : 0, tupleItems = items.map((item) => convertSchema(item, ctx)), positionalItems = applyMinItems(tupleItems, minItems), rest = getTupleRest(schema.additionalItems, ctx), tupleSchema = z.tuple(positionalItems);
        zodSchema = rest ? tupleSchema.rest(rest) : tupleSchema, typeof schema.minItems == "number" && (zodSchema = zodSchema.check(z.minLength(schema.minItems))), typeof schema.maxItems == "number" && (zodSchema = zodSchema.check(z.maxLength(schema.maxItems)));
      } else if (items !== void 0) {
        let element3 = convertSchema(items, ctx), arraySchema = z.array(element3);
        typeof schema.minItems == "number" && (arraySchema = arraySchema.min(schema.minItems)), typeof schema.maxItems == "number" && (arraySchema = arraySchema.max(schema.maxItems)), zodSchema = arraySchema;
      } else
        zodSchema = z.array(z.any());
      (schema.uniqueItems === !0 || schema.contains !== void 0) && (zodSchema = checkArrayGuards(zodSchema, {
        uniqueItems: schema.uniqueItems === !0,
        containsSchema: schema.contains !== void 0 ? convertSchema(schema.contains, ctx) : void 0,
        minContains: typeof schema.minContains == "number" ? schema.minContains : void 0,
        maxContains: typeof schema.maxContains == "number" ? schema.maxContains : void 0
      }));
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type3}`);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema == "boolean")
    return schema ? z.any() : z.never();
  let baseSchema = convertBaseSchema(schema, ctx), hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    let options = schema.anyOf.map((s) => convertSchema(s, ctx)), anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    let options = schema.oneOf.map((s) => convertSchema(s, ctx)), oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf))
    if (schema.allOf.length === 0)
      baseSchema = hasExplicitType ? baseSchema : z.any();
    else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx), startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx; i < schema.allOf.length; i++)
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      baseSchema = result;
    }
  schema.nullable === !0 && ctx.version === "openapi-3.0" && (baseSchema = z.nullable(baseSchema)), schema.readOnly === !0 && (baseSchema = z.readonly(baseSchema)), schema.default !== void 0 && (baseSchema = baseSchema.default(schema.default));
  let extraMeta = {}, coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (let key2 of coreMetadataKeys)
    key2 in schema && (extraMeta[key2] = schema[key2]);
  let contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (let key2 of contentMetadataKeys)
    key2 in schema && (extraMeta[key2] = schema[key2]);
  if (schema.type === "object" && schema.$ref === void 0) {
    schema.propertyNames !== void 0 && !containsRef(schema.propertyNames) && (extraMeta.propertyNames = schema.propertyNames);
    for (let key2 of ["minProperties", "maxProperties"])
      schema[key2] !== void 0 && (extraMeta[key2] = schema[key2]);
  }
  if (schema.type === "array" && schema.$ref === void 0) {
    schema.contains !== void 0 && !containsRef(schema.contains) && (extraMeta.contains = schema.contains);
    for (let key2 of ["uniqueItems", "minContains", "maxContains"])
      schema[key2] !== void 0 && (extraMeta[key2] = schema[key2]);
  }
  for (let key2 of Object.keys(schema))
    RECOGNIZED_KEYS.has(key2) || assignProp(extraMeta, key2, schema[key2]);
  return Object.keys(extraMeta).length > 0 && ctx.registry.add(baseSchema, extraMeta), schema.description && (baseSchema = baseSchema.describe(schema.description)), baseSchema;
}
function fromJSONSchema(schema, params2) {
  if (typeof schema == "boolean")
    return schema ? z.any() : z.never();
  let normalized;
  try {
    normalized = JSON.parse(JSON.stringify(schema));
  } catch {
    throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
  }
  let version3 = detectVersion(normalized, params2?.defaultTarget), defs = normalized.$defs || normalized.definitions || {}, ctx = {
    version: version3,
    defs,
    refs: /* @__PURE__ */ new Map(),
    processing: /* @__PURE__ */ new Set(),
    rootSchema: normalized,
    registry: params2?.registry ?? globalRegistry
  };
  return convertSchema(normalized, ctx);
}

// node_modules/zod/v4/classic/deep-partial.js
function deepPartial(schema) {
  return visit(schema, {
    object: (s) => s.partial(),
    // Every partialed option now admits `undefined`, which the constructor rejects as a duplicate.
    union: (s) => {
      let def2 = s._zod.def;
      return def2.discriminator === void 0 ? s : union(def2.options);
    }
  });
}

// node_modules/zod/v4/classic/in-out.js
function withChecks(side, checks) {
  if (!checks?.length)
    return side;
  let def2 = side._zod.def;
  return clone(side, mergeDefs(def2, { checks: [...def2.checks ?? [], ...checks] }), { parent: !0 });
}
function outSide(def2) {
  return withChecks(def2.out, def2.checks);
}
function inSide(def2) {
  return def2.in._zod.traits.has("$ZodTransform") ? outSide(def2) : def2.in;
}
function input(schema) {
  return visit(schema, {
    pipe: (s) => inSide(s._zod.def),
    // A default value belongs to the output side, so a rewritten inner type leaves it stranded. `.default()` widens the declared input type with `undefined`, and `optional` is what carries that across.
    default: (s, rewritten) => rewritten ? optional(s._zod.def.innerType) : s,
    // A catch value is output-side too, but `.catch()` leaves the declared input type alone, so the inner schema stands on its own.
    catch: (s, rewritten) => rewritten ? s._zod.def.innerType : s
  });
}
function output(schema) {
  return visit(schema, {
    pipe: (s) => outSide(s._zod.def),
    // A prefault value is fed through the schema, which makes it input-side, so a rewritten inner type leaves it stranded.
    prefault: (s, rewritten) => rewritten ? s._zod.def.innerType : s
  });
}

// node_modules/zod/v4/classic/coerce.js
var coerce_exports2 = {};
__export(coerce_exports2, {
  bigint: () => bigint3,
  boolean: () => boolean3,
  date: () => date4,
  number: () => number3,
  string: () => string3
});
function string3(params2) {
  return _coercedString(ZodString2, params2);
}
function number3(params2) {
  return _coercedNumber(ZodNumber2, params2);
}
function boolean3(params2) {
  return _coercedBoolean(ZodBoolean2, params2);
}
function bigint3(params2) {
  return _coercedBigint(ZodBigInt2, params2);
}
function date4(params2) {
  return _coercedDate(ZodDate2, params2);
}
// End of bundle text, part 5 of 15
export { JSONSchemaGenerator, TimePrecision, ZodOptional2, _any, _array, _base64, _base64url, _bigint, _boolean,
  _catch, _check, _cidrv4, _cidrv6, _coercedBigint, _coercedBoolean, _coercedDate, _coercedNumber, _coercedString,
  _creditCard, _cuid, _cuid2, _custom, _date, _default, _discriminatedUnion, _e164, _email, _emoji2, _endsWith, _enum,
  _enum2, _file, _float32, _float64, _gt, _gte, _guid, _iban, _includes, _int, _int32, _int64, _intersection, _ipv4,
  _ipv6, _isoDate, _isoDateTime, _isoDuration, _isoTime, _jwt, _ksuid, _lazy, _length, _literal, _lowercase, _lt,
  _lte, _mac, _map, _maxLength, _maxSize, _mime, _minLength, _minSize, _multipleOf, _nan, _nanoid, _nativeEnum,
  _negative, _never, _nonnegative, _nonoptional, _nonpositive, _normalize, _null2, _null3, _nullable, _number,
  _optional, _overwrite, _pipe, _positive, _promise, _properties, _property, _readonly, _record, _refine, _regex,
  _set, _size, _slugify, _startsWith, _string, _stringFormat, _stringbool, _success, _superRefine, _symbol,
  _templateLiteral, _toLowerCase, _toUpperCase, _transform, _trim, _tuple, _uint32, _uint64, _ulid, _undefined2,
  _union, _unknown, _uppercase, _url, _uuid, _uuidv4, _uuidv6, _uuidv7, _void, _xid, _xor, array, boolean2,
  createStandardJSONSchemaMethod, createToJSONSchemaMethod, custom, describe, discriminatedUnion, external_exports,
  extractDefs, finalize, generateCatchCheck, generateCustomCheck, generateDefaultCheck, generateEnumCheck,
  generateFileCheck, generateIntersectionCheck, generateLazyCheck, generateLiteralCheck, generateMapCheck,
  generateNonOptionalCheck, generatePipeCheck, generateRecordCheck, generateSetCheck, generateTemplateLiteralCheck,
  generateTransformCheck, generateTupleCheck, generateUnionCheck, generateWrapperCheck, getLiteralValue,
  getObjectShape, getParseErrorMessage, getSchemaDescription, handleUnrepresentable, initializeContext, intersection,
  isAsyncFunction, isSchemaOptional, isZ4Schema, iso_exports2, json_schema_exports, literal, looseObject, meta,
  normalizeObjectSchema, number2, object2, objectFromShape, optional, preprocess, processSchema, record, safeParse2,
  safeParseAsync2, string2, toJSONSchema, union, unknown };
