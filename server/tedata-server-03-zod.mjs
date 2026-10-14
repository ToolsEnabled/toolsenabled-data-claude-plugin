// ToolsEnabled Data server, part 3 of 15: zod, the schema library (lines 10497-14846 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-02-zod.mjs";
import { __export } from "./tedata-server-01-ajv.mjs";
import { $ZodAsyncError, $ZodCheck, $ZodCheckBigIntFormat, $ZodCheckNumberFormat, $ZodEncodeError, $ZodStringFormat,
  $ZodType, $constructor, Doc, URL_BAD_FORMAT, URL_UNPARSEABLE, _null, _undefined, aborted, allowsEval, assignProp,
  bigint, boolean, cached, canParseURL, cidrv4, cidrv6, cleanRegex, config, creditCard, cuid, cuid2, date, datetime,
  defineLazy, defineLazyInternal, duration, e164, emoji, esc, escapeRegex, finalizeIssue, getEnumValues, globalConfig,
  iban, integer, ipv4, ipv6, isObject, isPlainObject, issue, joinValues, ksuid, mac, nanoid, nanoidOfLength, number,
  optionalKeys, parse, parseAsync, parsedType, prefixIssues, primitiveTypes, propertyKeyTypes, rawShape, string,
  stringifyPrimitive, stripTabAndNewline, time, ulid, urlHostnameOk, urlProtocolOk, validateURL, xid } from "./tedata-server-02-zod.mjs";
import { ja_default, ka_default, kh_default, km_default, kn_default, ko_default, lt_default, mk_default, ms_default,
  ne_default, nl_default, nn_default, no_default, ota_default, pl_default, ps_default, pt_BR_default, pt_default,
  ro_default, ru_default, sk_default, sl_default, sv_default, ta_default, tg_default, th_default, tk_default,
  tr_default, ua_default, uk_default, ur_default, uz_default, vi_default, yo_default, zh_CN_default, zh_TW_default } from "./tedata-server-04-zod.mjs";
// Bundle text, part 3 of 15
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def2) => {
  $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    try {
      let trimmed = payload.value.trim(), url2 = validateURL(trimmed, def2);
      if (url2 === URL_BAD_FORMAT) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: payload.value,
          inst,
          continue: !def2.abort
        });
        return;
      }
      if (url2 === URL_UNPARSEABLE) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          input: payload.value,
          inst,
          continue: !def2.abort
        });
        return;
      }
      if (url2 === !0) {
        payload.value = stripTabAndNewline(trimmed);
        return;
      }
      def2.hostname && !urlHostnameOk(url2, def2.hostname) && payload.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: def2.hostname.source,
        input: payload.value,
        inst,
        continue: !def2.abort
      }), def2.protocol && !urlProtocolOk(url2, def2.protocol) && payload.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: def2.protocol.source,
        input: payload.value,
        inst,
        continue: !def2.abort
      }), payload.value = def2.normalize ? url2.href : stripTabAndNewline(trimmed);
      return;
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def2.abort
      });
    }
  };
}), $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def2) => {
  def2.pattern ?? (def2.pattern = emoji()), $ZodStringFormat.init(inst, def2);
}), $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def2) => {
  if (def2.length !== void 0 && (!Number.isInteger(def2.length) || def2.length < 1))
    throw new Error(`Invalid nanoid length: ${def2.length}`);
  def2.pattern ?? (def2.pattern = def2.length === void 0 ? nanoid : nanoidOfLength(def2.length)), $ZodStringFormat.init(inst, def2);
}), $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def2) => {
  def2.pattern ?? (def2.pattern = cuid), $ZodStringFormat.init(inst, def2);
}), $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def2) => {
  def2.pattern ?? (def2.pattern = cuid2), $ZodStringFormat.init(inst, def2);
}), $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def2) => {
  def2.pattern ?? (def2.pattern = ulid), $ZodStringFormat.init(inst, def2);
}), $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def2) => {
  def2.pattern ?? (def2.pattern = xid), $ZodStringFormat.init(inst, def2);
}), $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def2) => {
  def2.pattern ?? (def2.pattern = ksuid), $ZodStringFormat.init(inst, def2);
}), $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def2) => {
  def2.pattern ?? (def2.pattern = datetime(def2)), $ZodStringFormat.init(inst, def2);
}), $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def2) => {
  def2.pattern ?? (def2.pattern = date), $ZodStringFormat.init(inst, def2);
}), $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def2) => {
  def2.pattern ?? (def2.pattern = time(def2)), $ZodStringFormat.init(inst, def2);
}), $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def2) => {
  def2.pattern ?? (def2.pattern = duration), $ZodStringFormat.init(inst, def2);
}), $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def2) => {
  def2.pattern ?? (def2.pattern = ipv4), $ZodStringFormat.init(inst, def2);
}), ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value3) {
  return ipv6Alphabet.test(value3) ? canParseURL(`http://[${value3}]`) : !1;
}
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def2) => {
  def2.pattern ?? (def2.pattern = ipv6), $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    isValidIPv6(payload.value) || payload.issues.push({
      code: "invalid_format",
      format: "ipv6",
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def2) => {
  def2.pattern ?? (def2.pattern = mac(def2.delimiter)), $ZodStringFormat.init(inst, def2);
}), $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def2) => {
  def2.pattern ?? (def2.pattern = cidrv4), $ZodStringFormat.init(inst, def2);
});
function isValidCIDRv6(value3) {
  let parts = value3.split("/");
  if (parts.length !== 2)
    return !1;
  let [address, prefix] = parts;
  if (!prefix)
    return !1;
  let prefixNum = Number(prefix);
  return `${prefixNum}` !== prefix || prefixNum < 0 || prefixNum > 128 ? !1 : isValidIPv6(address);
}
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def2) => {
  def2.pattern ?? (def2.pattern = cidrv6), $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    isValidCIDRv6(payload.value) || payload.issues.push({
      code: "invalid_format",
      format: "cidrv6",
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
});
function isValidBase64(data3) {
  if (data3 === "")
    return !0;
  if (/\s/.test(data3) || data3.length % 4 !== 0)
    return !1;
  try {
    return atob(data3), !0;
  } catch {
    return !1;
  }
}
var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/, $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def2) => {
  def2.pattern ?? (def2.pattern = base64Charset), $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    isValidBase64(payload.value) || payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data3) {
  if (!base64urlCharset.test(data3))
    return !1;
  let base643 = data3.replace(/[-_]/g, (c) => c === "-" ? "+" : "/"), padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def2) => {
  def2.pattern ?? (def2.pattern = base64urlCharset), $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    isValidBase64URL(payload.value) || payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def2) => {
  def2.pattern ?? (def2.pattern = e164), $ZodStringFormat.init(inst, def2);
}), CC_SANITIZE = /[- ]/g;
function isLuhnAlgo(digits) {
  let length3 = digits.length, bit = 1, sum3 = 0;
  for (; length3; ) {
    let value3 = digits.charCodeAt(--length3) - 48;
    bit ^= 1, sum3 += bit ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][value3] : value3;
  }
  return sum3 % 10 === 0;
}
function isValidCreditCard(input2) {
  return creditCard.test(input2) ? isLuhnAlgo(input2.replace(CC_SANITIZE, "")) : !1;
}
var $ZodCreditCard = /* @__PURE__ */ $constructor("$ZodCreditCard", (inst, def2) => {
  def2.pattern ?? (def2.pattern = creditCard), $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    isValidCreditCard(payload.value) || payload.issues.push({
      code: "invalid_format",
      format: "credit_card",
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
});
function isIso7064Mod97(iban3) {
  let remainder = 0, len = iban3.length;
  for (let i = 4; i < len; i++) {
    let code = iban3.charCodeAt(i);
    remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
  }
  for (let i = 0; i < 4; i++) {
    let code = iban3.charCodeAt(i);
    remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
  }
  return remainder === 1;
}
function isValidIBAN(input2) {
  return iban.test(input2) ? isIso7064Mod97(input2) : !1;
}
var $ZodIBAN = /* @__PURE__ */ $constructor("$ZodIBAN", (inst, def2) => {
  def2.pattern ?? (def2.pattern = iban), $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    isValidIBAN(payload.value) || payload.issues.push({
      code: "invalid_format",
      format: "iban",
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
});
function isValidJWT2(token, algorithm = null) {
  try {
    let tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return !1;
    let [header] = tokensParts;
    if (!header)
      return !1;
    let parsedHeader = JSON.parse(atob(header));
    return !("typ" in parsedHeader && parsedHeader?.typ !== "JWT" || !parsedHeader.alg || algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm));
  } catch {
    return !1;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def2) => {
  $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    isValidJWT2(payload.value, def2.alg) || payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def2) => {
  $ZodStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    def2.fn(payload.value) || payload.issues.push({
      code: "invalid_format",
      format: def2.format,
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.pattern = number, inst._zod.parse = (payload, _ctx) => {
    if (def2.coerce)
      try {
        payload.value = Number(payload.value);
      } catch {
      }
    let input2 = payload.value;
    if (typeof input2 == "number" && !Number.isNaN(input2) && Number.isFinite(input2))
      return payload;
    let received = typeof input2 == "number" ? Number.isNaN(input2) ? "NaN" : Number.isFinite(input2) ? void 0 : String(input2) : void 0;
    return payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input: input2,
      inst,
      ...received ? { received } : {}
    }), payload;
  };
}), $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def2) => {
  $ZodCheckNumberFormat.init(inst, def2), $ZodNumber.init(inst, def2);
}), $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.pattern = boolean, inst._zod.parse = (payload, _ctx) => {
    if (def2.coerce)
      try {
        payload.value = !!payload.value;
      } catch {
      }
    let input2 = payload.value;
    return typeof input2 == "boolean" || payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: input2,
      inst
    }), payload;
  };
}), $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.pattern = bigint, inst._zod.parse = (payload, _ctx) => {
    if (def2.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch {
      }
    return typeof payload.value == "bigint" || payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    }), payload;
  };
}), $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def2) => {
  $ZodCheckBigIntFormat.init(inst, def2), $ZodBigInt.init(inst, def2);
}), $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, _ctx) => {
    let input2 = payload.value;
    return typeof input2 == "symbol" || payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input: input2,
      inst
    }), payload;
  };
}), $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.pattern = _undefined, inst._zod.values = /* @__PURE__ */ new Set([void 0]), inst._zod.parse = (payload, _ctx) => {
    let input2 = payload.value;
    return typeof input2 > "u" || payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input: input2,
      inst
    }), payload;
  };
}), $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.pattern = _null, inst._zod.values = /* @__PURE__ */ new Set([null]), inst._zod.parse = (payload, _ctx) => {
    let input2 = payload.value;
    return input2 === null || payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input: input2,
      inst
    }), payload;
  };
}), $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload) => payload;
}), $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload) => payload;
}), $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, _ctx) => (payload.issues.push({
    expected: "never",
    code: "invalid_type",
    input: payload.value,
    inst
  }), payload);
}), $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, _ctx) => {
    let input2 = payload.value;
    return typeof input2 > "u" || payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input: input2,
      inst
    }), payload;
  };
}), $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, _ctx) => {
    if (def2.coerce)
      try {
        payload.value = new Date(payload.value);
      } catch {
      }
    let input2 = payload.value, isDate3 = input2 instanceof Date;
    return isDate3 && !Number.isNaN(input2.getTime()) || payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input: input2,
      ...isDate3 ? { received: "Invalid Date" } : {},
      inst
    }), payload;
  };
});
function handleArrayResult(result, final, index4) {
  result.issues.length && final.issues.push(...prefixIssues(index4, result.issues)), final.value[index4] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def2) => {
  $ZodType.init(inst, def2);
  let memo2 = globalConfig.memoizer;
  memo2?.attach(inst), inst._zod.parse = (payload, ctx) => {
    let input2 = payload.value;
    if (!Array.isArray(input2))
      return payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input: input2,
        inst
      }), payload;
    payload.value = memo2 ? memo2.alloc(inst, payload, Array(input2.length), ctx) : Array(input2.length);
    let proms = [], abortEarly = ctx?.abortEarly;
    for (let i = 0; i < input2.length; i++) {
      let item = input2[i], result = def2.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise)
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      else if (handleArrayResult(result, payload, i), abortEarly && result.issues.length !== 0 && aborted(result))
        break;
    }
    return proms.length ? Promise.all(proms).then(() => payload) : payload;
  };
});
function handlePropertyResult(result, final, key2, input2, optin, optout) {
  let isPresent = key2 in input2, isOptionalOut = optout === "optional";
  if (!(!isPresent && isOptionalOut && optin === "optional")) {
    if (result.issues.length) {
      if (optin !== void 0 && isOptionalOut && !isPresent)
        return;
      final.issues.push(...prefixIssues(key2, result.issues));
    }
    if (!isPresent && optin === void 0) {
      result.issues.length || final.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: void 0,
        path: [key2]
      });
      return;
    }
    result.value === void 0 ? (isPresent || optin === "defaulted" && !isOptionalOut) && (final.value[key2] = void 0) : final.value[key2] = result.value;
  }
}
var NO_SYMBOL_KEYS = [];
function normalizeDef(def2) {
  let keys4 = Object.keys(def2.shape), ownSymbols = Object.getOwnPropertySymbols(def2.shape), symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS, allKeys = symbolKeys.length ? [...keys4, ...symbolKeys] : keys4;
  for (let k of allKeys)
    if (!def2.shape?.[k]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
  let okeys = optionalKeys(def2.shape);
  return {
    ...def2,
    allKeys,
    symbolKeys,
    // string-only: handleCatchall matches it against `for...in`, which never yields a symbol
    keySet: new Set(keys4),
    numKeys: keys4.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input2, payload, ctx, def2, inst, abortEarly) {
  let unrecognized = [], keySet = def2.keySet, _catchall = def2.catchall._zod, t = _catchall.def.type, optin = _catchall.optin, optout = _catchall.optout, seen = 0;
  for (let key2 in input2) {
    if (abortEarly && payload.issues.length !== seen) {
      if (aborted(payload, seen))
        break;
      seen = payload.issues.length;
    }
    if (keySet.has(key2))
      continue;
    if (key2 === "__proto__") {
      t === "never" && unrecognized.push(key2);
      continue;
    }
    if (t === "never") {
      unrecognized.push(key2);
      continue;
    }
    let r = _catchall.run({ value: input2[key2], issues: [] }, ctx);
    r instanceof Promise ? proms.push(r.then((r2) => handlePropertyResult(r2, payload, key2, input2, optin, optout))) : handlePropertyResult(r, payload, key2, input2, optin, optout);
  }
  return unrecognized.length && payload.issues.push({
    code: "unrecognized_keys",
    keys: unrecognized,
    input: input2,
    inst,
    // Describes the shape of the input, not the validity of the parsed value, so it never aborts. The parse still fails; the schema's own checks just get to run first, and an enclosing intersection can reconcile the key against a sibling operand.
    continue: !0
  }), proms.length ? Promise.all(proms).then(() => payload) : payload;
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def2) => {
  $ZodType.init(inst, def2);
  let desc = Object.getOwnPropertyDescriptor(def2, "shape"), sh = desc?.get ? desc.get.raw : def2.shape ?? {};
  if (sh) {
    let get6 = () => {
      let newSh = { ...sh };
      return Object.defineProperty(def2, "shape", { value: newSh }), get6.raw = newSh, newSh;
    };
    get6.raw = sh, Object.defineProperty(def2, "shape", { get: get6 });
  }
  let _normalized = cached(() => normalizeDef(def2));
  defineLazyInternal(inst, "propValues", (zod) => {
    let shape2 = zod.def.shape, propValues = {};
    for (let key2 in shape2) {
      let field3 = shape2[key2]._zod;
      if (field3.values) {
        Object.prototype.hasOwnProperty.call(propValues, key2) || assignProp(propValues, key2, /* @__PURE__ */ new Set());
        for (let v2 of field3.values)
          propValues[key2].add(v2);
        field3.optin !== void 0 && propValues[key2].add(void 0);
      }
    }
    return propValues;
  });
  let isObject3 = isObject, catchall = def2.catchall, value3, memo2 = globalConfig.memoizer;
  memo2?.attach(inst), inst._zod.parse = (payload, ctx) => {
    value3 ?? (value3 = _normalized.value);
    let input2 = payload.value;
    if (!isObject3(input2))
      return payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input: input2,
        inst
      }), payload;
    payload.value = memo2 ? memo2.alloc(inst, payload, {}, ctx) : {};
    let proms = [], shape2 = value3.shape, abortEarly = ctx?.abortEarly, seen = payload.issues.length;
    for (let key2 of value3.allKeys) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      if (key2 === "__proto__")
        continue;
      let el = shape2[key2], optin = el._zod.optin, optout = el._zod.optout, r = el._zod.run({ value: input2[key2], issues: [] }, ctx);
      r instanceof Promise ? proms.push(r.then((r2) => handlePropertyResult(r2, payload, key2, input2, optin, optout))) : handlePropertyResult(r, payload, key2, input2, optin, optout);
    }
    return catchall ? handleCatchall(proms, input2, payload, ctx, _normalized.value, inst, abortEarly === !0) : proms.length ? Promise.all(proms).then(() => payload) : payload;
  };
}), $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def2) => {
  $ZodObject.init(inst, def2);
  let superParse = inst._zod.parse, _normalized = cached(() => normalizeDef(def2)), memo2 = globalConfig.memoizer, generateFastpass = (shape2) => {
    let normalized = _normalized.value, syms = normalized.symbolKeys, doc = new Doc(["payload", "ctx"], { shape: shape2, inst, memo: memo2, syms }), parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`, prefixStr = (id3, k) => `
          let ${id3}_ab = false;
          for (let i = 0; i < ${id3}.issues.length; i++) {
            const iss = ${id3}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id3}_ab = true;
          }
          if (${id3}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
    doc.write("const input = payload.value;");
    let ids = /* @__PURE__ */ Object.create(null), counter = 0;
    for (let key2 of normalized.allKeys)
      ids[key2] = `key_${counter++}`;
    doc.write(memo2 ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
    for (let key2 of normalized.allKeys) {
      if (key2 === "__proto__")
        continue;
      let id3 = ids[key2], k = typeof key2 == "symbol" ? `syms[${syms.indexOf(key2)}]` : esc(key2), isPresent = `${k} in input`, schema = shape2[key2], optin = schema?._zod?.optin, isOptionalIn = optin !== void 0, isOptionalOut = schema?._zod?.optout === "optional";
      if (doc.write(`const ${id3} = ${parseStr(k)};`), isOptionalIn && isOptionalOut) {
        let assign = optin === "optional" ? `${id3}_present` : `${id3}.value !== undefined || ${id3}_present`;
        doc.write(`
        const ${id3}_present = ${isPresent};
        if (!${id3}.issues.length || ${id3}_present) {
          if (${id3}.issues.length) {${prefixStr(id3, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id3}.value;
          }
        }

      `);
      } else isOptionalIn ? (doc.write(`
        if (${id3}.issues.length) {${prefixStr(id3, k)}
        }
      `), optin === "defaulted" ? doc.write(`newResult[${k}] = ${id3}.value;`) : doc.write(`
        if (${id3}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id3}.value;
        }
      `)) : doc.write(`
        const ${id3}_present = ${isPresent};
        if (${id3}.issues.length) {${prefixStr(id3, k)}
        }
        if (!${id3}_present && !${id3}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id3}_present) {
          newResult[${k}] = ${id3}.value;
        }

      `);
    }
    return doc.write("payload.value = newResult;"), doc.write("return payload;"), doc.compile();
  }, fastpass, isObject3 = isObject, jit = !globalConfig.jitless, fastEnabled = jit && allowsEval.value, catchall = def2.catchall, value3;
  inst._zod.parse = (payload, ctx) => {
    value3 ?? (value3 = _normalized.value);
    let input2 = payload.value;
    return isObject3(input2) ? jit && fastEnabled && ctx?.async === !1 && ctx.jitless !== !0 ? (fastpass || (fastpass = generateFastpass(def2.shape)), payload = fastpass(payload, ctx), catchall ? handleCatchall([], input2, payload, ctx, value3, inst, ctx?.abortEarly === !0) : payload) : superParse(payload, ctx) : (payload.issues.push({
      expected: "object",
      code: "invalid_type",
      input: input2,
      inst
    }), payload);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (let result of results)
    if (result.issues.length === 0)
      return final.value = result.value, final;
  let nonaborted = results.filter((r) => !aborted(r));
  return nonaborted.length === 1 ? (final.value = nonaborted[0].value, nonaborted[0]) : (final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  }), final);
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0), defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), defineLazyInternal(inst, "values", (zod) => {
    if (zod.def.options.every((o) => o._zod.values))
      return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
  }), defineLazyInternal(inst, "pattern", (zod) => {
    if (zod.def.options.every((o) => o._zod.pattern)) {
      let patterns = zod.def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
  });
  let first = def2.options.length === 1 ? def2.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first)
      return first(payload, ctx);
    let async = !1, results = [];
    for (let option of def2.options) {
      let result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise)
        results.push(result), async = !0;
      else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    return async ? Promise.all(results).then((results2) => handleUnionResults(results2, payload, inst, ctx)) : handleUnionResults(results, payload, inst, ctx);
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  let matches = [];
  for (let i = 0; i < results.length; i++)
    results[i].issues.length === 0 && matches.push(i);
  return matches.length === 1 ? (final.value = results[matches[0]].value, final) : (matches.length === 0 ? final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  }) : final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: [],
    inclusive: !1,
    matches
  }), final);
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def2) => {
  $ZodUnion.init(inst, def2), def2.inclusive = !1;
  let first = def2.options.length === 1 ? def2.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first)
      return first(payload, ctx);
    let async = !1, results = [];
    for (let option of def2.options) {
      let result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      result instanceof Promise ? (results.push(result), async = !0) : results.push(result);
    }
    return async ? Promise.all(results).then((results2) => handleExclusiveUnionResults(results2, payload, inst, ctx)) : handleExclusiveUnionResults(results, payload, inst, ctx);
  };
});
function getDiscriminatedOption(union3, value3) {
  let internals = union3._zod, map4 = internals.bag.optionsMap;
  map4 || (map4 = discriminatorMap(internals.def), internals.bag.optionsMap = map4);
  let option = map4.get(value3);
  if (option === null)
    throw new Error(`Ambiguous discriminator value "${String(value3)}"`);
  return option;
}
function discriminatorMap(def2) {
  let map4 = /* @__PURE__ */ new Map();
  for (let option of def2.options) {
    let values3 = option._zod.propValues?.[def2.discriminator];
    if (!values3 || values3.size === 0)
      throw new Error(`Invalid discriminated union option at index "${def2.options.indexOf(option)}"`);
    for (let value3 of values3)
      if (map4.has(value3)) {
        if (value3 !== void 0)
          throw new Error(`Duplicate discriminator value "${String(value3)}"`);
        map4.set(value3, null);
      } else
        map4.set(value3, option);
  }
  return map4;
}
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def2) => {
  def2.inclusive = !1, $ZodUnion.init(inst, def2);
  let _super = inst._zod.parse;
  defineLazyInternal(inst, "propValues", (zod) => {
    let propValues = {}, undefinedCount = 0;
    for (let option of zod.def.options) {
      let pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${zod.def.options.indexOf(option)}"`);
      pv[zod.def.discriminator]?.has(void 0) && undefinedCount++;
      for (let [k, v2] of Object.entries(pv)) {
        Object.prototype.hasOwnProperty.call(propValues, k) || assignProp(propValues, k, /* @__PURE__ */ new Set());
        for (let val of v2)
          propValues[k].add(val);
      }
    }
    return !zod.def.unionFallback && undefinedCount > 1 && propValues[zod.def.discriminator]?.delete(void 0), propValues;
  }), def2.options.forEach((option, i) => {
    let propShape = rawShape(option._zod.def);
    if (propShape && !Object.prototype.hasOwnProperty.call(propShape, def2.discriminator))
      throw new Error(`Invalid discriminated union option at index "${i}"`);
  });
  let disc = cached(() => discriminatorMap(def2));
  inst._zod.parse = (payload, ctx) => {
    let input2 = payload.value;
    if (!isObject(input2))
      return payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input: input2,
        inst
      }), payload;
    let value3 = input2?.[def2.discriminator], opt = disc.value.get(value3);
    return opt && (value3 !== void 0 || ctx.direction !== "backward") ? opt._zod.run(payload, ctx) : def2.unionFallback || ctx.direction === "backward" ? _super(payload, ctx) : (payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def2.discriminator,
      options: Array.from(disc.value.keys()).filter((value4) => disc.value.get(value4) !== null),
      input: input2,
      path: [def2.discriminator],
      inst
    }), payload);
  };
}), $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, ctx) => {
    let input2 = payload.value, left = def2.left._zod.run({ value: input2, issues: [] }, ctx), right = def2.right._zod.run({ value: input2, issues: [] }, ctx);
    return left instanceof Promise || right instanceof Promise ? Promise.all([left, right]).then(([left2, right2]) => handleIntersectionResults(payload, left2, right2)) : handleIntersectionResults(payload, left, right);
  };
});
function mergeValues2(a, b10) {
  if (a === b10)
    return { valid: !0, data: a };
  if (a instanceof Date && b10 instanceof Date && +a == +b10)
    return { valid: !0, data: a };
  if (isPlainObject(a) && isPlainObject(b10)) {
    let bKeys = Object.keys(b10), sharedKeys = Object.keys(a).filter((key2) => bKeys.indexOf(key2) !== -1), newObj = { ...a, ...b10 };
    Object.prototype.hasOwnProperty.call(newObj, "__proto__") && delete newObj.__proto__;
    for (let key2 of sharedKeys) {
      if (key2 === "__proto__")
        continue;
      let sharedValue = mergeValues2(a[key2], b10[key2]);
      if (!sharedValue.valid)
        return {
          valid: !1,
          mergeErrorPath: [key2, ...sharedValue.mergeErrorPath]
        };
      newObj[key2] = sharedValue.data;
    }
    return { valid: !0, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b10)) {
    if (a.length !== b10.length)
      return { valid: !1, mergeErrorPath: [] };
    let newArray = [];
    for (let index4 = 0; index4 < a.length; index4++) {
      let itemA = a[index4], itemB = b10[index4], sharedValue = mergeValues2(itemA, itemB);
      if (!sharedValue.valid)
        return {
          valid: !1,
          mergeErrorPath: [index4, ...sharedValue.mergeErrorPath]
        };
      newArray.push(sharedValue.data);
    }
    return { valid: !0, data: newArray };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  let unrecKeys = /* @__PURE__ */ new Map(), unrecIssue, keyIssues = /* @__PURE__ */ new Map(), collect2 = (iss, side) => {
    let keys4;
    if (iss.code === "unrecognized_keys" && !iss.path?.length)
      unrecIssue ?? (unrecIssue = iss), keys4 = iss.keys;
    else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
      let k = String(iss.path[0]);
      keyIssues.has(k) || keyIssues.set(k, iss), keys4 = [k];
    } else
      return !1;
    for (let k of keys4)
      unrecKeys.has(k) || unrecKeys.set(k, {}), unrecKeys.get(k)[side] = !0;
    return !0;
  };
  for (let iss of left.issues)
    collect2(iss, "l") || result.issues.push(iss);
  for (let iss of right.issues)
    collect2(iss, "r") || result.issues.push(iss);
  let bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length) {
    let aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
    aggregated.length && result.issues.push({ ...unrecIssue, keys: aggregated });
    for (let k of bothKeys)
      !aggregated.includes(k) && keyIssues.has(k) && result.issues.push(keyIssues.get(k));
  }
  let merged = mergeValues2(left.value, right.value);
  if (!merged.valid) {
    if (aborted(result))
      return result;
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  return result.value = merged.data, result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def2) => {
  $ZodType.init(inst, def2);
  let items = def2.items, memo2 = globalConfig.memoizer;
  memo2?.attach(inst), inst._zod.parse = (payload, ctx) => {
    let input2 = payload.value;
    if (!Array.isArray(input2))
      return payload.issues.push({
        input: input2,
        inst,
        expected: "tuple",
        code: "invalid_type"
      }), payload;
    payload.value = memo2 ? memo2.alloc(inst, payload, [], ctx) : [];
    let proms = [], optinStart = getTupleOptStart(items, "optin"), optoutStart = getTupleOptStart(items, "optout");
    if (!def2.rest) {
      if (input2.length < optinStart)
        return payload.issues.push({
          code: "too_small",
          minimum: optinStart,
          inclusive: !0,
          input: input2,
          inst,
          origin: "array"
        }), payload;
      input2.length > items.length && payload.issues.push({
        code: "too_big",
        maximum: items.length,
        inclusive: !0,
        input: input2,
        inst,
        origin: "array"
      });
    }
    let itemResults = new Array(items.length), abortEarly = def2.rest ? ctx?.abortEarly : void 0, itemAborted = !1;
    for (let i = 0; i < items.length; i++) {
      let r = items[i]._zod.run({ value: input2[i], issues: [] }, ctx);
      r instanceof Promise ? proms.push(r.then((rr) => {
        itemResults[i] = rr;
      })) : (itemResults[i] = r, abortEarly && !itemAborted && r.issues.length && (itemAborted = aborted(r)));
    }
    if (def2.rest && !itemAborted) {
      let i = items.length - 1, rest = input2.slice(items.length), seen = payload.issues.length;
      for (let el of rest) {
        if (abortEarly && payload.issues.length !== seen) {
          if (aborted(payload, seen))
            break;
          seen = payload.issues.length;
        }
        i++;
        let result = def2.rest._zod.run({ value: el, issues: [] }, ctx);
        result instanceof Promise ? proms.push(result.then((r) => handleTupleResult(r, payload, i))) : handleTupleResult(result, payload, i);
      }
    }
    return proms.length ? Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input2, optoutStart)) : handleTupleResults(itemResults, payload, items, input2, optoutStart);
  };
});
function getTupleOptStart(items, key2) {
  for (let i = items.length - 1; i >= 0; i--)
    if (!(key2 === "optin" ? items[i]._zod.optin !== void 0 : items[i]._zod.optout === "optional"))
      return i + 1;
  return 0;
}
function handleTupleResult(result, final, index4) {
  result.issues.length && final.issues.push(...prefixIssues(index4, result.issues)), final.value[index4] = result.value;
}
function handleTupleResults(itemResults, final, items, input2, optoutStart) {
  for (let i = 0; i < items.length; i++) {
    let r = itemResults[i], isPresent = i < input2.length;
    if (!isPresent && i >= optoutStart && items[i]._zod.optin === "optional") {
      final.value.length = i;
      break;
    }
    if (r.issues.length) {
      if (!isPresent && i >= optoutStart) {
        final.value.length = i;
        break;
      }
      final.issues.push(...prefixIssues(i, r.issues));
    }
    final.value[i] = r.value;
  }
  for (let i = final.value.length - 1; i >= input2.length && (items[i]._zod.optout === "optional" && final.value[i] === void 0); i--)
    final.value.length = i;
  return final;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def2) => {
  $ZodType.init(inst, def2);
  let memo2 = globalConfig.memoizer;
  memo2?.attach(inst), inst._zod.parse = (payload, ctx) => {
    let input2 = payload.value;
    if (!isPlainObject(input2))
      return payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input: input2,
        inst
      }), payload;
    let proms = [], values3 = def2.keyType._zod.values;
    if (values3 && !def2.partial) {
      payload.value = memo2 ? memo2.alloc(inst, payload, {}, ctx) : {};
      let recordKeys = /* @__PURE__ */ new Set();
      for (let key2 of values3)
        if (typeof key2 == "string" || typeof key2 == "number" || typeof key2 == "symbol") {
          if (recordKeys.add(typeof key2 == "number" ? key2.toString() : key2), key2 === "__proto__")
            continue;
          let keyResult = def2.keyType._zod.run({ value: key2, issues: [] }, ctx);
          if (keyResult instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (keyResult.issues.length) {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key2,
              path: [key2],
              inst
            });
            continue;
          }
          let outKey = keyResult.value;
          if (outKey === "__proto__")
            continue;
          let result = def2.valueType._zod.run({ value: input2[key2], issues: [] }, ctx);
          result instanceof Promise ? proms.push(result.then((result2) => {
            result2.issues.length && payload.issues.push(...prefixIssues(key2, result2.issues)), payload.value[outKey] = result2.value;
          })) : (result.issues.length && payload.issues.push(...prefixIssues(key2, result.issues)), payload.value[outKey] = result.value);
        }
      let unrecognized;
      for (let key2 in input2)
        if (!recordKeys.has(key2))
          if (def2.mode === "loose") {
            if (key2 === "__proto__")
              continue;
            payload.value[key2] = input2[key2];
          } else
            unrecognized = unrecognized ?? [], unrecognized.push(key2);
      unrecognized && unrecognized.length > 0 && payload.issues.push({
        code: "unrecognized_keys",
        input: input2,
        inst,
        keys: unrecognized,
        continue: !0
      });
    } else {
      payload.value = memo2 ? memo2.alloc(inst, payload, {}, ctx) : {};
      let unrecognized;
      for (let key2 of Reflect.ownKeys(input2)) {
        if (key2 === "__proto__" || !Object.prototype.propertyIsEnumerable.call(input2, key2))
          continue;
        let keyResult = def2.keyType._zod.run({ value: key2, issues: [] }, ctx);
        if (keyResult instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof key2 == "string" && number.test(key2) && keyResult.issues.length) {
          let retryResult = def2.keyType._zod.run({ value: Number(key2), issues: [] }, ctx);
          if (retryResult instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          retryResult.issues.length === 0 && (keyResult = retryResult);
        }
        if (keyResult.issues.length) {
          def2.mode === "loose" ? payload.value[key2] = input2[key2] : values3 ? (unrecognized = unrecognized ?? [], unrecognized.push(key2)) : payload.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
            input: key2,
            path: [key2],
            inst
          });
          continue;
        }
        let outKey = keyResult.value;
        if (outKey === "__proto__")
          continue;
        let result = def2.valueType._zod.run({ value: input2[key2], issues: [] }, ctx);
        result instanceof Promise ? proms.push(result.then((result2) => {
          result2.issues.length && payload.issues.push(...prefixIssues(key2, result2.issues)), payload.value[outKey] = result2.value;
        })) : (result.issues.length && payload.issues.push(...prefixIssues(key2, result.issues)), payload.value[outKey] = result.value);
      }
      unrecognized && unrecognized.length > 0 && payload.issues.push({
        code: "unrecognized_keys",
        input: input2,
        inst,
        keys: unrecognized,
        continue: !0
      });
    }
    return proms.length ? Promise.all(proms).then(() => payload) : payload;
  };
}), $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def2) => {
  $ZodType.init(inst, def2);
  let memo2 = globalConfig.memoizer;
  memo2?.attach(inst), inst._zod.parse = (payload, ctx) => {
    let input2 = payload.value;
    if (!(input2 instanceof Map))
      return payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input: input2,
        inst
      }), payload;
    let proms = [];
    payload.value = memo2 ? memo2.alloc(inst, payload, /* @__PURE__ */ new Map(), ctx) : /* @__PURE__ */ new Map();
    let abortEarly = ctx?.abortEarly, seen = payload.issues.length;
    for (let [key2, value3] of input2) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      let keyResult = def2.keyType._zod.run({ value: key2, issues: [] }, ctx), valueResult = def2.valueType._zod.run({ value: value3, issues: [] }, ctx);
      keyResult instanceof Promise || valueResult instanceof Promise ? proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
        handleMapResult(keyResult2, valueResult2, payload, key2, input2, inst, ctx);
      })) : handleMapResult(keyResult, valueResult, payload, key2, input2, inst, ctx);
    }
    return proms.length ? Promise.all(proms).then(() => payload) : payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key2, input2, inst, ctx) {
  keyResult.issues.length && (propertyKeyTypes.has(typeof key2) ? final.issues.push(...prefixIssues(key2, keyResult.issues)) : final.issues.push({
    code: "invalid_key",
    origin: "map",
    input: input2,
    inst,
    issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
  })), valueResult.issues.length && (propertyKeyTypes.has(typeof key2) ? final.issues.push(...prefixIssues(key2, valueResult.issues)) : final.issues.push({
    origin: "map",
    code: "invalid_element",
    input: input2,
    inst,
    key: key2,
    issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
  })), final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def2) => {
  $ZodType.init(inst, def2);
  let memo2 = globalConfig.memoizer;
  memo2?.attach(inst), inst._zod.parse = (payload, ctx) => {
    let input2 = payload.value;
    if (!(input2 instanceof Set))
      return payload.issues.push({
        input: input2,
        inst,
        expected: "set",
        code: "invalid_type"
      }), payload;
    let proms = [];
    payload.value = memo2 ? memo2.alloc(inst, payload, /* @__PURE__ */ new Set(), ctx) : /* @__PURE__ */ new Set();
    let abortEarly = ctx?.abortEarly, seen = payload.issues.length;
    for (let item of input2) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      let result = def2.valueType._zod.run({ value: item, issues: [] }, ctx);
      result instanceof Promise ? proms.push(result.then((result2) => handleSetResult(result2, payload))) : handleSetResult(result, payload);
    }
    return proms.length ? Promise.all(proms).then(() => payload) : payload;
  };
});
function handleSetResult(result, final) {
  result.issues.length && final.issues.push(...result.issues), final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def2) => {
  $ZodType.init(inst, def2);
  let values3 = getEnumValues(def2.entries), valuesSet = new Set(values3);
  inst._zod.values = valuesSet, defineLazyInternal(inst, "pattern", (zod) => {
    let patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
    return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
  }), inst._zod.parse = (payload, _ctx) => {
    let input2 = payload.value;
    return valuesSet.has(input2) || payload.issues.push({
      code: "invalid_value",
      values: values3,
      input: input2,
      inst
    }), payload;
  };
}), $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def2) => {
  $ZodType.init(inst, def2);
  let values3 = new Set(def2.values);
  inst._zod.values = values3, defineLazyInternal(inst, "pattern", (zod) => {
    let vals2 = zod.def.values;
    return new RegExp(vals2.length ? `^(${vals2.map((o) => typeof o == "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
  }), inst._zod.parse = (payload, _ctx) => {
    let input2 = payload.value;
    return values3.has(input2) || payload.issues.push({
      code: "invalid_value",
      values: def2.values,
      input: input2,
      inst
    }), payload;
  };
}), $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, _ctx) => {
    let input2 = payload.value;
    return input2 instanceof File || payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input: input2,
      inst
    }), payload;
  };
}), $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.optin = "optional", globalConfig.memoizer?.guard(inst), inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward")
      throw new $ZodEncodeError(inst.constructor.name);
    let _out = def2.transform(payload.value, payload);
    if (ctx.async)
      return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output5) => (payload.value = output5, payload));
    if (_out instanceof Promise)
      throw new $ZodAsyncError();
    return payload.value = _out, payload;
  };
});
function handleOptionalResult(payload, result) {
  return payload.value = result.issues.length ? void 0 : result.value, payload;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), inst._zod.optout = "optional", defineLazyInternal(inst, "values", (zod) => {
    let values3 = zod.def.innerType._zod.values;
    return values3 ? /* @__PURE__ */ new Set([...values3, void 0]) : void 0;
  }), defineLazyInternal(inst, "pattern", (zod) => {
    let pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
  }), inst._zod.parse = (payload, ctx) => {
    if (payload.value === void 0) {
      if (def2.innerType._zod.optin !== "defaulted")
        return payload;
      let result = def2.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
      return result instanceof Promise ? result.then((result2) => handleOptionalResult(payload, result2)) : handleOptionalResult(payload, result);
    }
    return def2.innerType._zod.run(payload, ctx);
  };
}), $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def2) => {
  $ZodOptional.init(inst, def2), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern), inst._zod.parse = (payload, ctx) => def2.innerType._zod.run(payload, ctx);
}), $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout), defineLazyInternal(inst, "pattern", (zod) => {
    let pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
  }), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0), inst._zod.parse = (payload, ctx) => payload.value === null ? payload : def2.innerType._zod.run(payload, ctx);
}), $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.optin = "defaulted", defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward")
      return def2.innerType._zod.run(payload, ctx);
    if (payload.value === void 0)
      return payload.value = def2.defaultValue, payload;
    let result = def2.innerType._zod.run(payload, ctx);
    return result instanceof Promise ? result.then((result2) => handleDefaultResult(result2, def2)) : handleDefaultResult(result, def2);
  };
});
function handleDefaultResult(payload, def2) {
  return payload.value === void 0 && (payload.value = def2.defaultValue), payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.optin = "defaulted", defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), inst._zod.parse = (payload, ctx) => (ctx.direction === "backward" || payload.value === void 0 && (payload.value = def2.defaultValue), def2.innerType._zod.run(payload, ctx));
}), $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "values", (zod) => {
    let v2 = zod.def.innerType._zod.values;
    return v2 ? new Set([...v2].filter((x5) => x5 !== void 0)) : void 0;
  }), inst._zod.parse = (payload, ctx) => {
    let result = def2.innerType._zod.run(payload, ctx);
    return result instanceof Promise ? result.then((result2) => handleNonOptionalResult(result2, inst)) : handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  return !payload.issues.length && payload.value === void 0 && payload.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: payload.value,
    inst
  }), payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward")
      throw new $ZodEncodeError("ZodSuccess");
    let result = def2.innerType._zod.run(payload, ctx);
    return result instanceof Promise ? result.then((result2) => (payload.value = result2.issues.length === 0, payload)) : (payload.value = result.issues.length === 0, payload);
  };
});
function handleCatchResult(payload, result, def2, ctx) {
  return result.issues.length ? (payload.value = def2.catchValue({
    ...result,
    value: payload.value,
    error: {
      issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
    },
    input: payload.value
  }), payload) : (payload.value = result.value, result.memo && (payload.memo = !0), payload);
}
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward")
      return def2.innerType._zod.run(payload, ctx);
    let result = def2.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
    return result instanceof Promise ? result.then((result2) => handleCatchResult(payload, result2, def2, ctx)) : handleCatchResult(payload, result, def2, ctx);
  };
}), $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, _ctx) => ((typeof payload.value != "number" || !Number.isNaN(payload.value)) && payload.issues.push({
    input: payload.value,
    inst,
    expected: "nan",
    code: "invalid_type"
  }), payload);
}), $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values), defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout), defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues), inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      let right = def2.out._zod.run(payload, ctx);
      return right instanceof Promise ? right.then((right2) => handlePipeResult(right2, def2.in, ctx)) : handlePipeResult(right, def2.in, ctx);
    }
    let left = def2.in._zod.run(payload, ctx);
    return left instanceof Promise ? left.then((left2) => handlePipeResult(left2, def2.out, ctx)) : handlePipeResult(left, def2.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  return left.issues.some((iss) => iss.code !== "unrecognized_keys") ? (left.aborted = !0, left) : next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values), defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout), defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues), inst._zod.parse = (payload, ctx) => {
    if ((ctx.direction || "forward") === "forward") {
      let left = def2.in._zod.run(payload, ctx);
      return left instanceof Promise ? left.then((left2) => handleCodecAResult(left2, def2, ctx)) : handleCodecAResult(left, def2, ctx);
    } else {
      let right = def2.out._zod.run(payload, ctx);
      return right instanceof Promise ? right.then((right2) => handleCodecAResult(right2, def2, ctx)) : handleCodecAResult(right, def2, ctx);
    }
  };
});
function handleCodecAResult(result, def2, ctx) {
  if (result.issues.length)
    return result.aborted = !0, result;
  if ((ctx.direction || "forward") === "forward") {
    let transformed = def2.transform(result.value, result);
    return transformed instanceof Promise ? transformed.then((value3) => handleCodecTxResult(result, value3, def2.out, ctx)) : handleCodecTxResult(result, transformed, def2.out, ctx);
  } else {
    let transformed = def2.reverseTransform(result.value, result);
    return transformed instanceof Promise ? transformed.then((value3) => handleCodecTxResult(result, value3, def2.in, ctx)) : handleCodecTxResult(result, transformed, def2.in, ctx);
  }
}
function handleCodecTxResult(left, value3, nextSchema, ctx) {
  return left.issues.length ? (left.aborted = !0, left) : nextSchema._zod.run({ value: value3, issues: left.issues }, ctx);
}
var $ZodPreprocess = /* @__PURE__ */ $constructor("$ZodPreprocess", (inst, def2) => {
  $ZodPipe.init(inst, def2);
}), $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues), defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values), defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin), defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout), inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward")
      return def2.innerType._zod.run(payload, ctx);
    let result = def2.innerType._zod.run(payload, ctx);
    return result instanceof Promise ? result.then(handleReadonlyResult) : handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  return payload.memo || (payload.value = Object.freeze(payload.value)), payload;
}
function leafPattern(schema) {
  let def2 = schema._zod.def, pattern = def2.pattern, isInt = !!def2.format?.includes("int"), minimum, maximum;
  for (let ch2 of def2.checks ?? []) {
    let d = ch2._zod.def;
    d.pattern && (pattern = d.pattern), isInt || (isInt = !!d.format?.includes("int"));
    let lo = d.minimum ?? d.length, hi = d.maximum ?? d.length;
    lo !== void 0 && (minimum === void 0 || lo > minimum) && (minimum = lo), hi !== void 0 && (maximum === void 0 || hi < maximum) && (maximum = hi);
  }
  if (pattern)
    return pattern.source;
  if (minimum !== void 0 && maximum !== void 0 && minimum > maximum)
    return "(?!)";
  if (minimum !== void 0 || maximum !== void 0)
    return string({ minimum, maximum }).source;
  let own3 = schema._zod.pattern;
  return (isInt && own3 === number ? integer : own3)?.source;
}
function partPattern(schema) {
  let def2 = schema._zod.def, own3 = schema._zod.pattern?.source, inner = def2.innerType ?? schema._zod.innerType;
  if (inner) {
    let before = inner._zod.pattern?.source, after = partPattern(inner);
    return own3 && before && after && after !== before ? own3.replace(cleanRegex(before), () => cleanRegex(after)) : own3;
  }
  if (def2.options) {
    let sources = def2.options.map(partPattern);
    if (sources.every(Boolean))
      return `^(${sources.map((s) => cleanRegex(s)).join("|")})$`;
  }
  return leafPattern(schema);
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def2) => {
  $ZodType.init(inst, def2);
  let regexParts = [];
  for (let part of def2.parts)
    if (typeof part == "object" && part !== null) {
      let source4 = partPattern(part);
      if (!source4)
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      regexParts.push(cleanRegex(source4));
    } else if (part === null || primitiveTypes.has(typeof part))
      regexParts.push(escapeRegex(`${part}`));
    else
      throw new Error(`Invalid template literal part: ${part}`);
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`), inst._zod.parse = (payload, _ctx) => typeof payload.value != "string" ? (payload.issues.push({
    input: payload.value,
    inst,
    expected: "string",
    code: "invalid_type"
  }), payload) : (inst._zod.pattern.lastIndex = 0, inst._zod.pattern.test(payload.value) || payload.issues.push({
    input: payload.value,
    inst,
    code: "invalid_format",
    format: def2.format ?? "template_literal",
    pattern: inst._zod.pattern.source
  }), payload);
}), $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def2) => ($ZodType.init(inst, def2), Object.defineProperty(inst, "_def", { value: def2 }), inst._zod.def = def2, inst.implement = (func) => {
  if (typeof func != "function")
    throw new Error("implement() must be called with a function");
  return Object.defineProperty(function(...args) {
    let parsedArgs = inst._def.input ? parse(inst._def.input, args) : args, result = Reflect.apply(func, this, parsedArgs);
    return inst._def.output ? parse(inst._def.output, result) : result;
  }, "_zod", { value: inst._zod, enumerable: !1 });
}, inst.implementAsync = (func) => {
  if (typeof func != "function")
    throw new Error("implementAsync() must be called with a function");
  return Object.defineProperty(async function(...args) {
    let parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args, result = await Reflect.apply(func, this, parsedArgs);
    return inst._def.output ? await parseAsync(inst._def.output, result) : result;
  }, "_zod", { value: inst._zod, enumerable: !1 });
}, inst._zod.parse = (payload, _ctx) => typeof payload.value != "function" ? (payload.issues.push({
  code: "invalid_type",
  expected: "function",
  input: payload.value,
  inst
}), payload) : (inst._def.output && inst._def.output._zod.def.type === "promise" ? payload.value = inst.implementAsync(payload.value) : payload.value = inst.implement(payload.value), payload), inst.input = (...args) => {
  let F = inst.constructor;
  return Array.isArray(args[0]) ? new F({
    type: "function",
    input: new $ZodTuple({
      type: "tuple",
      items: args[0],
      rest: args[1]
    }),
    output: inst._def.output
  }) : new F({
    type: "function",
    input: args[0],
    output: inst._def.output
  });
}, inst.output = (output4) => {
  let F = inst.constructor;
  return new F({
    type: "function",
    input: inst._def.input,
    output: output4
  });
}, inst)), $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.parse = (payload, ctx) => Promise.resolve(payload.value).then((inner) => def2.innerType._zod.run({ value: inner, issues: [] }, ctx));
}), $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def2) => {
  $ZodType.init(inst, def2), defineLazy(inst._zod, "innerType", () => {
    let d = def2;
    return d._cachedInner || (d._cachedInner = def2.getter()), d._cachedInner;
  }), defineLazyInternal(inst, "pattern", (zod) => zod.innerType?._zod?.pattern), defineLazyInternal(inst, "propValues", (zod) => zod.innerType?._zod?.propValues), defineLazyInternal(inst, "optin", (zod) => zod.innerType?._zod?.optin ?? void 0), defineLazyInternal(inst, "optout", (zod) => zod.innerType?._zod?.optout ?? void 0), inst._zod.parse = (payload, ctx) => inst._zod.innerType._zod.run(payload, ctx);
}), $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def2) => {
  $ZodCheck.init(inst, def2), $ZodType.init(inst, def2), inst._zod.parse = (payload, _) => payload, inst._zod.check = (payload) => {
    let input2 = payload.value, r = def2.fn(input2);
    if (r instanceof Promise)
      return r.then((r2) => handleRefineResult(r2, payload, input2, inst));
    handleRefineResult(r, payload, input2, inst);
  };
});
function handleRefineResult(result, payload, input2, inst) {
  if (!result) {
    let _iss = {
      code: "custom",
      input: input2,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    inst._zod.def.params && (_iss.params = inst._zod.def.params), payload.issues.push(issue(_iss));
  }
}

// node_modules/zod/v4/core/memoizer.js
var $ZodCyclicError = class extends Error {
  constructor() {
    super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
  }
}, STATE = "~memo", NO_ISSUES = [];
function isRef(value3) {
  return value3 !== null && typeof value3 == "object";
}
function cloneIssues(issues) {
  return issues.map((iss) => iss.path ? { ...iss, path: iss.path.slice() } : { ...iss });
}
var recursive = /* @__PURE__ */ new WeakMap(), NONE = 0, ASSUMED = 1, PROVEN = 2;
function isRecursive(inst, stack2, resolve9) {
  let cached2 = recursive.get(inst);
  if (cached2 !== void 0)
    return cached2 ? PROVEN : NONE;
  if (stack2.has(inst))
    return PROVEN;
  stack2.add(inst);
  let result = NONE, check2 = (child) => {
    if (result !== PROVEN && child?._zod) {
      let answer = isRecursive(child, stack2, resolve9);
      answer > result && (result = answer);
    }
  }, shape2 = (sh, spread) => {
    let answer = NONE;
    for (let key2 of Reflect.ownKeys(sh)) {
      let desc = Object.getOwnPropertyDescriptor(sh, key2);
      if (spread && !desc.enumerable)
        continue;
      let child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack2, resolve9) : NONE;
      child > answer && (answer = child);
    }
    return answer;
  }, merge7 = (answer) => {
    answer > result && (result = answer);
  }, def2 = inst._zod.def, kind = def2.type;
  switch (kind) {
    case "object": {
      let raw = rawShape(def2);
      merge7(raw ? shape2(raw, !0) : ASSUMED), check2(def2.catchall);
      break;
    }
    case "array":
      check2(def2.element);
      break;
    case "tuple":
      for (let el of def2.items)
        check2(el);
      check2(def2.rest);
      break;
    case "record":
    case "map":
      check2(def2.keyType), check2(def2.valueType);
      break;
    case "set":
      check2(def2.valueType);
      break;
    case "union":
      for (let el of def2.options)
        check2(el);
      break;
    case "intersection":
      check2(def2.left), check2(def2.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      check2(def2.innerType);
      break;
    case "pipe":
      check2(def2.in), check2(def2.out);
      break;
    case "function":
      check2(def2.input), check2(def2.output);
      break;
    // `$ZodLazy` caches its inner on the def, so a resolved edge is followed exactly
    case "lazy": {
      let inner = def2._cachedInner ?? (resolve9 ? inst._zod.innerType : void 0);
      merge7(inner ? isRecursive(inner, stack2, !1) : ASSUMED);
      break;
    }
    // a leaf by choice: `parts` are regex fragments, not data positions
    case "template_literal":
    // leaves
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
      break;
    default:
      for (let key2 in def2) {
        let desc = Object.getOwnPropertyDescriptor(def2, key2);
        if (!desc || desc.get)
          continue;
        let value3 = desc.value;
        if (!(!value3 || typeof value3 != "object")) {
          if (value3._zod)
            check2(value3);
          else if (Array.isArray(value3))
            for (let el of value3)
              check2(el);
        }
      }
  }
  return stack2.delete(inst), settle(inst, result);
}
function settle(inst, answer) {
  return answer !== ASSUMED && recursive.set(inst, answer === PROVEN), answer;
}
function isRecursiveSchema(inst) {
  return isRecursive(inst, /* @__PURE__ */ new Set(), !0) !== NONE;
}
function bucketFor(state, inst) {
  let bucket = state.buckets.get(inst);
  return bucket || (bucket = /* @__PURE__ */ new WeakMap(), state.buckets.set(inst, bucket)), bucket;
}
var handoff, open = [], memo = {
  alloc(_inst, payload, empty) {
    let bucket = handoff;
    if (!bucket)
      return empty;
    handoff = void 0;
    let entry2 = { value: empty, issues: null };
    return bucket.set(payload.value, entry2), open.push(entry2), empty;
  },
  guard(inst) {
    var _a3;
    (_a3 = inst._zod).deferred ?? (_a3.deferred = []), inst._zod.deferred.push(() => {
      let base = inst._zod.parse, wrapped = (payload, ctx) => {
        if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value))
          throw new $ZodCyclicError();
        return base(payload, ctx);
      };
      inst._zod.parse = wrapped, inst._zod.run === base && (inst._zod.run = wrapped);
    });
  },
  attach(inst) {
    var _a3;
    let isRecursiveInst, rechecked = !1, lastCtx, lastBucket;
    (_a3 = inst._zod).deferred ?? (_a3.deferred = []), inst._zod.deferred.push(() => {
      let base = inst._zod.parse, wrapped = (payload, ctx) => {
        if (isRecursiveInst === void 0) {
          let walked = isRecursive(inst, /* @__PURE__ */ new Set(), !1);
          if (walked === NONE)
            return inst._zod.parse = base, inst._zod.run === wrapped && (inst._zod.run = base), base(payload, ctx);
          walked === PROVEN || rechecked ? isRecursiveInst = !0 : rechecked = !0;
        }
        let input2 = payload.value;
        if (!isRef(input2))
          return base(payload, ctx);
        let state = ctx[STATE];
        state || (state = { buckets: /* @__PURE__ */ new WeakMap(), backEdges: void 0 }, ctx[STATE] = state);
        let bucket;
        lastCtx === ctx ? bucket = lastBucket : (bucket = bucketFor(state, inst), lastCtx = ctx, lastBucket = bucket);
        let hit2 = bucket.get(input2);
        if (hit2)
          return payload.value = hit2.value, hit2.issues ? hit2.issues.length && payload.issues.push(...cloneIssues(hit2.issues)) : (payload.memo = !0, state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet()), state.backEdges.add(hit2.value)), payload;
        handoff = bucket;
        let depth = open.length, result = base(payload, ctx);
        handoff = void 0;
        let entry2 = open.length > depth ? open.pop() : void 0;
        return result instanceof Promise ? result.then((r) => (entry2 && (entry2.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES), r)) : (entry2 && (entry2.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES), result);
      };
      inst._zod.parse = wrapped, inst._zod.run === base && (inst._zod.run = wrapped);
    });
  }
};
function memoizer() {
  return memo;
}
function isBackEdge(ctx, value3) {
  let backEdges = ctx[STATE]?.backEdges;
  return backEdges !== void 0 && isRef(value3) && backEdges.has(value3);
}

// node_modules/zod/v4/locales/index.js
var locales_exports = {};
__export(locales_exports, {
  ar: () => ar_default,
  az: () => az_default,
  be: () => be_default,
  bg: () => bg_default,
  bn: () => bn_default,
  ca: () => ca_default,
  ckb: () => ckb_default,
  cs: () => cs_default,
  da: () => da_default,
  de: () => de_default,
  el: () => el_default,
  en: () => en_default2,
  eo: () => eo_default,
  es: () => es_default,
  fa: () => fa_default,
  fi: () => fi_default,
  fr: () => fr_default,
  frCA: () => fr_CA_default,
  gu: () => gu_default,
  he: () => he_default,
  hi: () => hi_default,
  hr: () => hr_default,
  hu: () => hu_default,
  hy: () => hy_default,
  id: () => id_default,
  is: () => is_default,
  it: () => it_default,
  ja: () => ja_default,
  ka: () => ka_default,
  kh: () => kh_default,
  km: () => km_default,
  kn: () => kn_default,
  ko: () => ko_default,
  lt: () => lt_default,
  mk: () => mk_default,
  ms: () => ms_default,
  ne: () => ne_default,
  nl: () => nl_default,
  nn: () => nn_default,
  no: () => no_default,
  ota: () => ota_default,
  pl: () => pl_default,
  ps: () => ps_default,
  pt: () => pt_default,
  ptBR: () => pt_BR_default,
  ro: () => ro_default,
  ru: () => ru_default,
  sk: () => sk_default,
  sl: () => sl_default,
  sv: () => sv_default,
  ta: () => ta_default,
  tg: () => tg_default,
  th: () => th_default,
  tk: () => tk_default,
  tr: () => tr_default,
  ua: () => ua_default,
  uk: () => uk_default,
  ur: () => ur_default,
  uz: () => uz_default,
  vi: () => vi_default,
  yo: () => yo_default,
  zhCN: () => zh_CN_default,
  zhTW: () => zh_TW_default
});

// node_modules/zod/v4/locales/ar.js
var error = () => {
  let Sizable = {
    string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
    map: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0645\u062F\u062E\u0644",
    email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    url: "\u0631\u0627\u0628\u0637",
    emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
    ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
    ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
    mac: "\u0639\u0646\u0648\u0627\u0646 MAC",
    cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
    cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
    base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
    base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
    json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
    e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
    credit_card: "\u0631\u0642\u0645 \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0627\u0626\u062A\u0645\u0627\u0646",
    currency_code: "\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644\u0629",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0645\u062F\u062E\u0644"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}` : `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}` : `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"}` : `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}` : `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"` : _issue.format === "ends_with" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"` : _issue.format === "includes" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"` : _issue.format === "regex" ? `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
      }
      case "not_multiple_of":
        return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "\u0629" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
      case "invalid_key":
        return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      case "invalid_union":
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
      case "invalid_element":
        return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
      default:
        return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}

// node_modules/zod/v4/locales/az.js
var error2 = () => {
  let Sizable = {
    string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
    file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
    array: { unit: "element", verb: "olmal\u0131d\u0131r" },
    set: { unit: "element", verb: "olmal\u0131d\u0131r" },
    map: { unit: "element", verb: "olmal\u0131d\u0131r" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    credit_card: "kredit kart\u0131 n\xF6mr\u0259si",
    currency_code: "valyuta kodu",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue2.expected}, daxil olan ${received}` : `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}` : `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}` : `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r` : _issue.format === "ends_with" ? `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir` : _issue.format === "includes" ? `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r` : _issue.format === "regex" ? `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r` : `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
      case "unrecognized_keys":
        return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
      case "invalid_union":
        return "Yanl\u0131\u015F d\u0259y\u0259r";
      case "invalid_element":
        return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
      default:
        return "Yanl\u0131\u015F d\u0259y\u0259r";
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}

// node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count4, one4, few, many) {
  let absCount = Math.abs(count4), lastDigit = absCount % 10, lastTwoDigits = absCount % 100;
  return lastTwoDigits >= 11 && lastTwoDigits <= 19 ? many : lastDigit === 1 ? one4 : lastDigit >= 2 && lastDigit <= 4 ? few : many;
}
var error3 = () => {
  let Sizable = {
    string: {
      unit: {
        one: "\u0441\u0456\u043C\u0432\u0430\u043B",
        few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
        many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    array: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    set: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    map: {
      unit: {
        one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
        few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
        many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    },
    file: {
      unit: {
        one: "\u0431\u0430\u0439\u0442",
        few: "\u0431\u0430\u0439\u0442\u044B",
        many: "\u0431\u0430\u0439\u0442\u0430\u045E"
      },
      verb: "\u043C\u0435\u0446\u044C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0443\u0432\u043E\u0434",
    email: "email \u0430\u0434\u0440\u0430\u0441",
    url: "URL",
    emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0447\u0430\u0441",
    duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
    ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
    mac: "MAC \u0430\u0434\u0440\u0430\u0441",
    cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
    base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
    base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
    json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
    e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
    credit_card: "\u043D\u0443\u043C\u0430\u0440 \u043A\u0440\u044D\u0434\u044B\u0442\u043D\u0430\u0439 \u043A\u0430\u0440\u0442\u044B",
    currency_code: "\u043A\u043E\u0434 \u0432\u0430\u043B\u044E\u0442\u044B",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0443\u0432\u043E\u0434"
  }, TypeDictionary = {
    nan: "NaN",
    number: "\u043B\u0456\u043A",
    array: "\u043C\u0430\u0441\u0456\u045E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        if (sizing) {
          let maxValue = Number(issue2.maximum), unit2 = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit2}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        if (sizing) {
          let minValue = Number(issue2.minimum), unit2 = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit2}`;
        }
        return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"` : _issue.format === "ends_with" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"` : _issue.format === "includes" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"` : _issue.format === "regex" ? `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}` : `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
      case "invalid_element":
        return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
      default:
        return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}

// node_modules/zod/v4/locales/bg.js
var error4 = () => {
  let Sizable = {
    string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
    map: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0432\u0445\u043E\u0434",
    email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
    url: "URL",
    emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
    date: "ISO \u0434\u0430\u0442\u0430",
    time: "ISO \u0432\u0440\u0435\u043C\u0435",
    duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
    ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
    ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
    mac: "MAC \u0430\u0434\u0440\u0435\u0441",
    cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
    base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
    json_string: "JSON \u043D\u0438\u0437",
    e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
    credit_card: "\u043D\u043E\u043C\u0435\u0440 \u043D\u0430 \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u0430 \u043A\u0430\u0440\u0442\u0430",
    currency_code: "\u043A\u043E\u0434 \u043D\u0430 \u0432\u0430\u043B\u0443\u0442\u0430",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0432\u0445\u043E\u0434"
  }, TypeDictionary = {
    nan: "NaN",
    number: "\u0447\u0438\u0441\u043B\u043E",
    array: "\u043C\u0430\u0441\u0438\u0432"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}` : `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${stringifyPrimitive(issue2.values[0])}` : `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}` : `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${_issue.pattern}`;
        let invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
        return _issue.format === "emoji" && (invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), _issue.format === "datetime" && (invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), _issue.format === "date" && (invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"), _issue.format === "time" && (invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E"), _issue.format === "duration" && (invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430"), `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${issue2.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
      case "invalid_union":
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
      case "invalid_element":
        return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${issue2.origin}`;
      default:
        return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}

// node_modules/zod/v4/locales/bn.js
var error5 = () => {
  let Sizable = {
    string: { unit: "\u0985\u0995\u09CD\u09B7\u09B0", verb: "\u09A5\u09BE\u0995\u09A4\u09C7 \u09B9\u09AC\u09C7" },
    file: { unit: "\u09AC\u09BE\u0987\u099F", verb: "\u09A5\u09BE\u0995\u09A4\u09C7 \u09B9\u09AC\u09C7" },
    array: { unit: "\u0986\u0987\u099F\u09C7\u09AE", verb: "\u09A5\u09BE\u0995\u09A4\u09C7 \u09B9\u09AC\u09C7" },
    set: { unit: "\u0986\u0987\u099F\u09C7\u09AE", verb: "\u09A5\u09BE\u0995\u09A4\u09C7 \u09B9\u09AC\u09C7" },
    map: { unit: "\u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF", verb: "\u09A5\u09BE\u0995\u09A4\u09C7 \u09B9\u09AC\u09C7" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0987\u09A8\u09AA\u09C1\u099F",
    email: "\u0987\u09AE\u09C7\u0987\u09B2 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
    url: "URL",
    emoji: "\u0987\u09AE\u09CB\u099C\u09BF",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u09A4\u09BE\u09B0\u09BF\u0996 \u0993 \u09B8\u09AE\u09AF\u09BC",
    date: "ISO \u09A4\u09BE\u09B0\u09BF\u0996",
    time: "ISO \u09B8\u09AE\u09AF\u09BC",
    duration: "ISO \u09B8\u09AE\u09AF\u09BC\u0995\u09BE\u09B2",
    ipv4: "IPv4 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
    ipv6: "IPv6 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
    mac: "MAC \u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
    cidrv4: "IPv4 \u09B0\u09C7\u099E\u09CD\u099C",
    cidrv6: "IPv6 \u09B0\u09C7\u099E\u09CD\u099C",
    base64: "base64-\u098F\u09A8\u0995\u09CB\u09A1\u09C7\u09A1 \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0982",
    base64url: "base64url-\u098F\u09A8\u0995\u09CB\u09A1\u09C7\u09A1 \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0982",
    json_string: "JSON \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0982",
    e164: "E.164 \u09A8\u09AE\u09CD\u09AC\u09B0",
    credit_card: "\u0995\u09CD\u09B0\u09C7\u09A1\u09BF\u099F \u0995\u09BE\u09B0\u09CD\u09A1 \u09A8\u09AE\u09CD\u09AC\u09B0",
    currency_code: "\u09AE\u09C1\u09A6\u09CD\u09B0\u09BE \u0995\u09CB\u09A1",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0987\u09A8\u09AA\u09C1\u099F"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return `\u0985\u09AC\u09C8\u09A7 \u0987\u09A8\u09AA\u09C1\u099F: \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09B6\u09BF\u09A4 ${expected}, \u09AA\u09CD\u09B0\u09BE\u09AA\u09CD\u09A4 ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u0985\u09AC\u09C8\u09A7 \u0987\u09A8\u09AA\u09C1\u099F: \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09B6\u09BF\u09A4 ${stringifyPrimitive(issue2.values[0])}` : `\u0985\u09AC\u09C8\u09A7 \u0985\u09AA\u09B6\u09A8: ${joinValues(issue2.values, " | ")} \u098F\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u098F\u0995\u099F\u09BF \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09B6\u09BF\u09A4`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `\u0985\u09A8\u09C7\u0995 \u09AC\u09A1\u09BC: ${issue2.origin ?? "\u09AE\u09BE\u09A8"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u098F\u09B2\u09BF\u09AE\u09C7\u09A8\u09CD\u099F"} \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7` : `\u0985\u09A8\u09C7\u0995 \u09AC\u09A1\u09BC: ${issue2.origin ?? "\u09AE\u09BE\u09A8"} ${adj}${issue2.maximum.toString()} \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\u0985\u09A8\u09C7\u0995 \u099B\u09CB\u099F: ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7` : `\u0985\u09A8\u09C7\u0995 \u099B\u09CB\u099F: ${issue2.origin} ${adj}${issue2.minimum.toString()} \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u0985\u09AC\u09C8\u09A7 \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0982: "${_issue.prefix}" \u09A6\u09BF\u09AF\u09BC\u09C7 \u09B6\u09C1\u09B0\u09C1 \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7` : _issue.format === "ends_with" ? `\u0985\u09AC\u09C8\u09A7 \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0982: "${_issue.suffix}" \u09A6\u09BF\u09AF\u09BC\u09C7 \u09B6\u09C7\u09B7 \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7` : _issue.format === "includes" ? `\u0985\u09AC\u09C8\u09A7 \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0982: "${_issue.includes}" \u0985\u09A8\u09CD\u09A4\u09B0\u09CD\u09AD\u09C1\u0995\u09CD\u09A4 \u09A5\u09BE\u0995\u09A4\u09C7 \u09B9\u09AC\u09C7` : _issue.format === "regex" ? `\u0985\u09AC\u09C8\u09A7 \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u0982: ${_issue.pattern} \u09AA\u09CD\u09AF\u09BE\u099F\u09BE\u09B0\u09CD\u09A8 \u09AE\u09BF\u09B2\u09A4\u09C7 \u09B9\u09AC\u09C7` : `\u0985\u09AC\u09C8\u09A7 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0985\u09AC\u09C8\u09A7 \u09A8\u09AE\u09CD\u09AC\u09B0: ${issue2.divisor} \u098F\u09B0 \u0997\u09C1\u09A3\u09BF\u09A4\u0995 \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7`;
      case "unrecognized_keys":
        return `\u0985\u099A\u09C7\u09A8\u09BE \u0995\u09C0${issue2.keys.length > 1 ? "\u0997\u09C1\u09B2\u09CB" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u098F \u0985\u09AC\u09C8\u09A7 \u0995\u09C0`;
      case "invalid_union":
        return issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0 ? `\u0985\u09AC\u09C8\u09A7 \u09A1\u09BF\u09B8\u0995\u09CD\u09B0\u09BF\u09AE\u09BF\u09A8\u09C7\u099F\u09B0 \u09AE\u09BE\u09A8\u0964 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09BE\u09B6\u09BF\u09A4 ${issue2.options.map((o) => `'${o}'`).join(" | ")}` : "\u0985\u09AC\u09C8\u09A7 \u0987\u09A8\u09AA\u09C1\u099F";
      case "invalid_element":
        return `${issue2.origin} \u098F \u0985\u09AC\u09C8\u09A7 \u09AE\u09BE\u09A8`;
      default:
        return "\u0985\u09AC\u09C8\u09A7 \u0987\u09A8\u09AA\u09C1\u099F";
    }
  };
};
function bn_default() {
  return {
    localeError: error5()
  };
}

// node_modules/zod/v4/locales/ca.js
var error6 = () => {
  let Sizable = {
    string: { unit: "car\xE0cters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" },
    map: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "entrada",
    email: "adre\xE7a electr\xF2nica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adre\xE7a IPv4",
    ipv6: "adre\xE7a IPv6",
    mac: "adre\xE7a MAC",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    credit_card: "n\xFAmero de targeta de cr\xE8dit",
    currency_code: "codi de moneda",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrada"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Tipus inv\xE0lid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}` : `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}` : `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "com a m\xE0xim" : "menys de", sizing = getSizing(issue2.origin);
        return sizing ? `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}` : `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? "com a m\xEDnim" : "m\xE9s de", sizing = getSizing(issue2.origin);
        return sizing ? `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}` : `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"` : _issue.format === "ends_with" ? `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"` : _issue.format === "includes" ? `Format inv\xE0lid: ha d'incloure "${_issue.includes}"` : _issue.format === "regex" ? `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}` : `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau inv\xE0lida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE0lida";
      // Could also be "Tipus d'unió invàlid" but "Entrada invàlida" is more general
      case "invalid_element":
        return `Element inv\xE0lid a ${issue2.origin}`;
      default:
        return "Entrada inv\xE0lida";
    }
  };
};
function ca_default() {
  return {
    localeError: error6()
  };
}

// node_modules/zod/v4/locales/ckb.js
var error7 = () => {
  let Sizable = {
    string: { unit: "\u067E\u06CC\u062A", verb: "\u0628\u06CE\u062A" },
    file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u0628\u06CE\u062A" },
    array: { unit: "\u062F\u0627\u0646\u06D5", verb: "\u0628\u06CE\u062A" },
    set: { unit: "\u062F\u0627\u0646\u06D5", verb: "\u0628\u06CE\u062A" },
    map: { unit: "\u062F\u0627\u0646\u06D5", verb: "\u0628\u06CE\u062A" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "regex",
    email: "\u0626\u06CC\u0645\u06D5\u06CC\u06B5",
    url: "\u0628\u06D5\u0633\u062A\u06D5\u0631 (URL)",
    emoji: "\u0626\u06CC\u0645\u06C6\u062C\u06CC",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u0695\u06CE\u06A9\u06D5\u0648\u062A \u0648 \u06A9\u0627\u062A",
    date: "\u0695\u06CE\u06A9\u06D5\u0648\u062A",
    time: "\u06A9\u0627\u062A",
    duration: "\u0645\u0627\u0648\u06D5",
    ipv4: "\u0646\u0627\u0648\u0646\u06CC\u0634\u0627\u0646\u06CC IPv4",
    ipv6: "\u0646\u0627\u0648\u0646\u06CC\u0634\u0627\u0646\u06CC IPv6",
    mac: "\u0646\u0627\u0648\u0646\u06CC\u0634\u0627\u0646\u06CC MAC",
    cidrv4: "\u0645\u06D5\u0648\u062F\u0627\u06CC IPv4",
    cidrv6: "\u0645\u06D5\u0648\u062F\u0627\u06CC IPv6",
    base64: "\u062F\u06D5\u0642\u06CC base64",
    base64url: "\u062F\u06D5\u0642\u06CC base64url",
    json_string: "\u062F\u06D5\u0642\u06CC JSON",
    e164: "\u0698\u0645\u0627\u0631\u06D5\u06CC E.164",
    credit_card: "\u0698\u0645\u0627\u0631\u06D5\u06CC \u06A9\u0627\u0631\u062A\u06CC \u06A9\u0631\u06CE\u062F\u06CC\u062A",
    currency_code: "\u06A9\u06C6\u062F\u06CC \u062F\u0631\u0627\u0648",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u062A\u06CE\u06A9\u0631\u062F\u06D5"
  }, TypeDictionary = {
    nan: "NaN",
    string: "\u0646\u0648\u0648\u0633\u06CC\u0646",
    number: "\u0698\u0645\u0627\u0631\u06D5",
    boolean: "boolean",
    array: "array",
    object: "object",
    date: "\u0695\u06CE\u06A9\u06D5\u0648\u062A",
    integer: "\u0698\u0645\u0627\u0631\u06D5",
    float: "\u0698\u0645\u0627\u0631\u06D5",
    null: "null",
    undefined: "undefined",
    function: "function",
    symbol: "symbol",
    unknown: "unknown",
    promise: "promise",
    void: "void",
    never: "never",
    map: "map",
    set: "set"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType, postfix = ["\u0627", "\u0648", "\u06C6", "\u0648\u0648", "\u06D5", "\u06CC", "\u06CE"].some((p) => received.endsWith(p)) ? "\u06CC\u06D5" : "\u06D5", isEnglish = /^[a-zA-Z]+$/.test(received);
        return receivedType === "null" || receivedType === "undefined" ? "\u062F\u0627\u0648\u0627\u06A9\u0631\u0627\u0648\u06D5" : `\u0686\u0627\u0648\u06D5\u0695\u0648\u0627\u0646\u06A9\u0631\u0627\u0648\u06D5 ${expected} \u0628\u06CE\u062A\u060C \u0628\u06D5\u06B5\u0627\u0645 ${received}${isEnglish ? "" : postfix}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u0628\u06D5\u0647\u0627\u06A9\u06D5 \u0646\u0627\u062F\u0631\u0648\u0648\u0633\u062A\u06D5: \u0686\u0627\u0648\u06D5\u0695\u0648\u0627\u0646\u06A9\u0631\u0627\u0648\u06D5 ${stringifyPrimitive(issue2.values[0])} \u0628\u06CE\u062A` : `\u0647\u06D5\u06B5\u0628\u0698\u0627\u0631\u062F\u06D5\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A: \u0686\u0627\u0648\u06D5\u0695\u0648\u0627\u0646\u06A9\u0631\u0627\u0648\u06D5 \u06CC\u06D5\u06A9\u06CE\u06A9 \u0628\u06CE\u062A \u0644\u06D5 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let sizing = getSizing(issue2.origin);
        return sizing ? `\u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 \u0628\u06D5 \u0644\u0627\u06CC\u06D5\u0646\u06CC \u0632\u06C6\u0631\u06D5\u0648\u06D5 ${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}` : `\u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 \u0628\u06D5 \u0644\u0627\u06CC\u06D5\u0646\u06CC \u0632\u06C6\u0631\u06D5\u0648\u06D5 ${issue2.maximum.toString()} \u0628\u06CE\u062A`;
      }
      case "too_small": {
        let sizing = getSizing(issue2.origin);
        return sizing ? `\u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 \u0628\u06D5 \u0644\u0627\u06CC\u06D5\u0646\u06CC \u06A9\u06D5\u0645\u06D5\u0648\u06D5 ${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}` : `\u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 \u0628\u06D5 \u0644\u0627\u06CC\u06D5\u0646\u06CC \u06A9\u06D5\u0645\u06D5\u0648\u06D5 ${issue2.minimum.toString()} \u0628\u06CE\u062A`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u062F\u06D5\u0642\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A: \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 \u062F\u06D5\u0633\u062A\u067E\u06CE\u0628\u06A9\u0627\u062A \u0628\u06D5 "${_issue.prefix}"` : _issue.format === "ends_with" ? `\u062F\u06D5\u0642\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A: \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 \u06A9\u06C6\u062A\u0627\u06CC\u06CC\u0628\u06CE\u062A \u0628\u06D5 "${_issue.suffix}"` : _issue.format === "includes" ? `\u062F\u06D5\u0642\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A: \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 "${_issue.includes}" \u0644\u06D5\u062E\u06C6\u0628\u06AF\u0631\u06CE\u062A` : _issue.format === "regex" ? `\u062F\u06D5\u0642\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A: \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5 \u0644\u06D5\u06AF\u06D5\u06B5 \u067E\u0627\u062A\u06CE\u0631\u0646\u06CC ${_issue.pattern} \u0628\u06AF\u0648\u0646\u062C\u06CE\u062A` : `\u0628\u06D5\u0647\u0627\u06CC ${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06D5`;
      }
      case "not_multiple_of":
        return `\u0698\u0645\u0627\u0631\u06D5\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A: \u062F\u06D5\u0628\u06CE\u062A \u0686\u06D5\u0646\u062F \u0647\u06CE\u0646\u062F\u06D5 \u0628\u06CE\u062A \u0628\u06C6 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u0644\u06CC \u0646\u06D5\u0646\u0627\u0633\u0631\u0627\u0648: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u0644\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A \u0644\u06D5 ${issue2.origin}`;
      case "invalid_union":
        return issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0 ? `\u0628\u06D5\u0647\u0627\u06CC \u0646\u06D5\u0646\u0627\u0633\u0631\u0627\u0648 \u0647\u06D5\u06CC\u06D5. \u0628\u06D5\u0647\u0627\u06CC \u0686\u0627\u0648\u06D5\u0695\u0648\u0627\u0646\u06A9\u0631\u0627\u0648: ${issue2.options.map((o) => `'${o}'`).join(" | ")}` : "\u06CC\u06D5\u06A9\u06AF\u0631\u062A\u0646\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A";
      case "invalid_element":
        return `${issue2.origin} \u0628\u06D5\u0647\u0627\u06A9\u06D5 \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06D5`;
      default:
        return "\u062A\u06CE\u06A9\u0631\u062F\u06D5\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A";
    }
  };
};
function ckb_default() {
  return {
    localeError: error7()
  };
}

// node_modules/zod/v4/locales/cs.js
var error8 = () => {
  let Sizable = {
    string: { unit: "znak\u016F", verb: "m\xEDt" },
    file: { unit: "bajt\u016F", verb: "m\xEDt" },
    array: { unit: "prvk\u016F", verb: "m\xEDt" },
    set: { unit: "prvk\u016F", verb: "m\xEDt" },
    map: { unit: "prvk\u016F", verb: "m\xEDt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "regul\xE1rn\xED v\xFDraz",
    email: "e-mailov\xE1 adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a \u010Das ve form\xE1tu ISO",
    date: "datum ve form\xE1tu ISO",
    time: "\u010Das ve form\xE1tu ISO",
    duration: "doba trv\xE1n\xED ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
    base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
    json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
    e164: "\u010D\xEDslo E.164",
    credit_card: "\u010D\xEDslo kreditn\xED karty",
    currency_code: "k\xF3d m\u011Bny",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "vstup"
  }, TypeDictionary = {
    nan: "NaN",
    number: "\u010D\xEDslo",
    string: "\u0159et\u011Bzec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue2.expected}, obdr\u017Eeno ${received}` : `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}` : `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}` : `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}` : `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"` : _issue.format === "ends_with" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"` : _issue.format === "includes" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"` : _issue.format === "regex" ? `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}` : `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatn\xFD vstup";
      case "invalid_element":
        return `Neplatn\xE1 hodnota v ${issue2.origin}`;
      default:
        return "Neplatn\xFD vstup";
    }
  };
};
function cs_default() {
  return {
    localeError: error8()
  };
}

// node_modules/zod/v4/locales/da.js
var error9 = () => {
  let Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" },
    map: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkesl\xE6t",
    date: "ISO-dato",
    time: "ISO-klokkesl\xE6t",
    duration: "ISO-varighed",
    ipv4: "IPv4-adresse",
    ipv6: "IPv6-adresse",
    mac: "MAC-adresse",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    credit_card: "kreditkortnummer",
    currency_code: "valutakode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  }, TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "s\xE6t",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}` : `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue2.values[0])}` : `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin), origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return sizing ? `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}` : `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin), origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return sizing ? `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}` : `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Ugyldig streng: skal starte med "${_issue.prefix}"` : _issue.format === "ends_with" ? `Ugyldig streng: skal ende med "${_issue.suffix}"` : _issue.format === "includes" ? `Ugyldig streng: skal indeholde "${_issue.includes}"` : _issue.format === "regex" ? `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}` : `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal v\xE6re deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig n\xF8gle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig v\xE6rdi i ${issue2.origin}`;
      default:
        return "Ugyldigt input";
    }
  };
};
function da_default() {
  return {
    localeError: error9()
  };
}

// node_modules/zod/v4/locales/de.js
var error10 = () => {
  let Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" },
    map: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    mac: "MAC-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    credit_card: "Kreditkartennummer",
    currency_code: "W\xE4hrungscode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "Eingabe"
  }, TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Ung\xFCltige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}` : `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}` : `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat` : `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat` : `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen` : _issue.format === "ends_with" ? `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden` : _issue.format === "includes" ? `Ung\xFCltiger String: muss "${_issue.includes}" enthalten` : _issue.format === "regex" ? `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen` : `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ung\xFCltige Eingabe";
      case "invalid_element":
        return `Ung\xFCltiger Wert in ${issue2.origin}`;
      default:
        return "Ung\xFCltige Eingabe";
    }
  };
};
function de_default() {
  return {
    localeError: error10()
  };
}

// node_modules/zod/v4/locales/el.js
var error11 = () => {
  let Sizable = {
    string: { unit: "\u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    file: { unit: "bytes", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    array: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    set: { unit: "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" },
    map: { unit: "\u03BA\u03B1\u03C4\u03B1\u03C7\u03C9\u03C1\u03AE\u03C3\u03B5\u03B9\u03C2", verb: "\u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2",
    email: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1 \u03BA\u03B1\u03B9 \u03CE\u03C1\u03B1",
    date: "ISO \u03B7\u03BC\u03B5\u03C1\u03BF\u03BC\u03B7\u03BD\u03AF\u03B1",
    time: "ISO \u03CE\u03C1\u03B1",
    duration: "ISO \u03B4\u03B9\u03AC\u03C1\u03BA\u03B5\u03B9\u03B1",
    ipv4: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv4",
    ipv6: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 IPv6",
    mac: "\u03B4\u03B9\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 MAC",
    cidrv4: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv4",
    cidrv6: "\u03B5\u03CD\u03C1\u03BF\u03C2 IPv6",
    base64: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64",
    base64url: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03C3\u03B5 base64url",
    json_string: "\u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC JSON",
    e164: "\u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 E.164",
    credit_card: "\u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03C0\u03B9\u03C3\u03C4\u03C9\u03C4\u03B9\u03BA\u03AE\u03C2 \u03BA\u03AC\u03C1\u03C4\u03B1\u03C2",
    currency_code: "\u03BA\u03C9\u03B4\u03B9\u03BA\u03CC\u03C2 \u03BD\u03BF\u03BC\u03AF\u03C3\u03BC\u03B1\u03C4\u03BF\u03C2",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return typeof issue2.expected == "string" && /^[A-Z]/.test(issue2.expected) ? `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD instanceof ${issue2.expected}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${received}` : `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${expected}, \u03BB\u03AE\u03C6\u03B8\u03B7\u03BA\u03B5 ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${stringifyPrimitive(issue2.values[0])}` : `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD \u03AD\u03BD\u03B1 \u03B1\u03C0\u03CC ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u03C3\u03C4\u03BF\u03B9\u03C7\u03B5\u03AF\u03B1"}` : `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin ?? "\u03C4\u03B9\u03BC\u03AE"} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin} \u03BD\u03B1 \u03AD\u03C7\u03B5\u03B9 ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `\u03A0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC: \u03B1\u03BD\u03B1\u03BC\u03B5\u03BD\u03CC\u03C4\u03B1\u03BD ${issue2.origin} \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03BE\u03B5\u03BA\u03B9\u03BD\u03AC \u03BC\u03B5 "${_issue.prefix}"` : _issue.format === "ends_with" ? `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03BD\u03B5\u03B9 \u03BC\u03B5 "${_issue.suffix}"` : _issue.format === "includes" ? `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 "${_issue.includes}"` : _issue.format === "regex" ? `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03B2\u03BF\u03BB\u03BF\u03C3\u03B5\u03B9\u03C1\u03AC: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C4\u03B1\u03B9\u03C1\u03B9\u03AC\u03B6\u03B5\u03B9 \u03BC\u03B5 \u03C4\u03BF \u03BC\u03BF\u03C4\u03AF\u03B2\u03BF ${_issue.pattern}` : `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2: \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03BB\u03B1\u03C0\u03BB\u03AC\u03C3\u03B9\u03BF \u03C4\u03BF\u03C5 ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u0386\u03B3\u03BD\u03C9\u03C3\u03C4${issue2.keys.length > 1 ? "\u03B1" : "\u03BF"} \u03BA\u03BB\u03B5\u03B9\u03B4${issue2.keys.length > 1 ? "\u03B9\u03AC" : "\u03AF"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF \u03BA\u03BB\u03B5\u03B9\u03B4\u03AF \u03C3\u03C4\u03BF ${issue2.origin}`;
      case "invalid_union":
        return "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2";
      case "invalid_element":
        return `\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03C4\u03B9\u03BC\u03AE \u03C3\u03C4\u03BF ${issue2.origin}`;
      default:
        return "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B7 \u03B5\u03AF\u03C3\u03BF\u03B4\u03BF\u03C2";
    }
  };
};
function el_default() {
  return {
    localeError: error11()
  };
}

// node_modules/zod/v4/locales/en.js
var error12 = () => {
  let Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    currency_code: "currency code",
    credit_card: "credit card number",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  }, TypeDictionary = {
    // Compatibility: "nan" -> "NaN" for display
    nan: "NaN"
    // All other type names omitted - they fall back to raw values via ?? operator
  };
  function getTypeName(type3, input2) {
    return type3 === "number" && typeof input2 == "number" && !Number.isFinite(input2) ? String(input2) : TypeDictionary[type3] ?? type3;
  }
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = getTypeName(issue2.expected), receivedType = parsedType(issue2.input), received = getTypeName(receivedType, issue2.input);
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}` : `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.exact ? "exactly " : issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}` : `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.exact ? "exactly " : issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Invalid string: must start with "${_issue.prefix}"` : _issue.format === "ends_with" ? `Invalid string: must end with "${_issue.suffix}"` : _issue.format === "includes" ? `Invalid string: must include "${_issue.includes}"` : _issue.format === "regex" ? `Invalid string: must match pattern ${_issue.pattern}` : `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        return issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0 ? `Invalid discriminator value. Expected ${issue2.options.map((o) => `'${o}'`).join(" | ")}` : issue2.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function en_default2() {
  return {
    localeError: error12()
  };
}

// node_modules/zod/v4/locales/eo.js
var error13 = () => {
  let Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" },
    map: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emo\u011Dio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-da\u016Dro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    mac: "MAC-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    credit_card: "kreditkarta numero",
    currency_code: "valuta kodo",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "enigo"
  }, TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Nevalida enigo: atendi\u011Dis instanceof ${issue2.expected}, ricevi\u011Dis ${received}` : `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}` : `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}` : `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"` : _issue.format === "ends_with" ? `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"` : _issue.format === "includes" ? `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"` : _issue.format === "regex" ? `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}` : `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida \u015Dlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return "Nevalida enigo";
    }
  };
};
function eo_default() {
  return {
    localeError: error13()
  };
}

// node_modules/zod/v4/locales/es.js
var error14 = () => {
  let Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "entrada",
    email: "direcci\xF3n de correo electr\xF3nico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duraci\xF3n ISO",
    ipv4: "direcci\xF3n IPv4",
    ipv6: "direcci\xF3n IPv6",
    mac: "direcci\xF3n MAC",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "n\xFAmero E.164",
    credit_card: "n\xFAmero de tarjeta de cr\xE9dito",
    currency_code: "c\xF3digo de moneda",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrada"
  }, TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "n\xFAmero",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "n\xFAmero grande",
    symbol: "s\xEDmbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "funci\xF3n",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeraci\xF3n",
    union: "uni\xF3n",
    literal: "literal",
    promise: "promesa",
    void: "vac\xEDo",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Entrada inv\xE1lida: se esperaba instanceof ${issue2.expected}, recibido ${received}` : `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}` : `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin), origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return sizing ? `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}` : `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin), origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return sizing ? `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"` : _issue.format === "ends_with" ? `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"` : _issue.format === "includes" ? `Cadena inv\xE1lida: debe incluir "${_issue.includes}"` : _issue.format === "regex" ? `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}` : `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inv\xE1lida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inv\xE1lida";
      case "invalid_element":
        return `Valor inv\xE1lido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return "Entrada inv\xE1lida";
    }
  };
};
function es_default() {
  return {
    localeError: error14()
  };
}

// node_modules/zod/v4/locales/fa.js
var error15 = () => {
  let Sizable = {
    string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
    map: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0648\u0631\u0648\u062F\u06CC",
    email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
    url: "URL",
    emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
    time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
    ipv4: "IPv4 \u0622\u062F\u0631\u0633",
    ipv6: "IPv6 \u0622\u062F\u0631\u0633",
    mac: "MAC \u0622\u062F\u0631\u0633",
    cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
    cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
    base64: "base64-encoded \u0631\u0634\u062A\u0647",
    base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
    json_string: "JSON \u0631\u0634\u062A\u0647",
    e164: "E.164 \u0639\u062F\u062F",
    credit_card: "\u0634\u0645\u0627\u0631\u0647 \u06A9\u0627\u0631\u062A \u0627\u0639\u062A\u0628\u0627\u0631\u06CC",
    currency_code: "\u06A9\u062F \u0627\u0631\u0632",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0648\u0631\u0648\u062F\u06CC"
  }, TypeDictionary = {
    nan: "NaN",
    number: "\u0639\u062F\u062F",
    array: "\u0622\u0631\u0627\u06CC\u0647"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F` : `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F` : `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F` : `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F` : `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F` : _issue.format === "ends_with" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F` : _issue.format === "includes" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F` : _issue.format === "regex" ? `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F` : `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
      }
      case "not_multiple_of":
        return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
      case "unrecognized_keys":
        return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
      case "invalid_union":
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
      case "invalid_element":
        return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
      default:
        return "\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631";
    }
  };
};
function fa_default() {
  return {
    localeError: error15()
  };
}

// node_modules/zod/v4/locales/fi.js
var error16 = () => {
  let Sizable = {
    string: { unit: "merkki\xE4", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    map: { unit: "alkiota", subject: "kuvauksen" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "s\xE4\xE4nn\xF6llinen lauseke",
    email: "s\xE4hk\xF6postiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    mac: "MAC-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    credit_card: "luottokortin numero",
    currency_code: "valuuttakoodi",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}` : `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}` : `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim() : `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim() : `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"` : _issue.format === "ends_with" ? `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"` : _issue.format === "includes" ? `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"` : _issue.format === "regex" ? `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}` : `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return "Virheellinen sy\xF6te";
    }
  };
};
function fi_default() {
  return {
    localeError: error16()
  };
}

// node_modules/zod/v4/locales/fr.js
var error17 = () => {
  let Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "expression r\xE9guli\xE8re",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    mac: "adresse MAC",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne de caract\xE8res encod\xE9e en base64",
    base64url: "cha\xEEne de caract\xE8res encod\xE9e en base64url",
    json_string: "cha\xEEne de caract\xE8res JSON",
    e164: "num\xE9ro au format E.164",
    credit_card: "num\xE9ro de carte de cr\xE9dit",
    currency_code: "code de devise",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  }, TypeDictionary = {
    string: "cha\xEEne de caract\xE8res",
    number: "nombre",
    int: "entier",
    boolean: "bool\xE9en",
    bigint: "grand entier",
    symbol: "symbole",
    undefined: "ind\xE9fini",
    null: "null",
    never: "jamais",
    void: "vide",
    date: "date",
    array: "tableau",
    object: "objet",
    tuple: "tuple",
    record: "record",
    map: "map",
    set: "ensemble",
    file: "fichier",
    nonoptional: "non optionnel",
    nan: "NaN",
    function: "fonction"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Entr\xE9e invalide : instance de ${issue2.expected} attendu, ${received} re\xE7u` : `Entr\xE9e invalide : ${expected} attendu, ${received} re\xE7u`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu` : `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xE9l\xE9ment(s)"}` : `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Cha\xEEne de caract\xE8res invalide : doit commencer par "${_issue.prefix}"` : _issue.format === "ends_with" ? `Cha\xEEne de caract\xE8res invalide : doit se terminer par "${_issue.suffix}"` : _issue.format === "includes" ? `Cha\xEEne de caract\xE8res invalide : doit inclure "${_issue.includes}"` : _issue.format === "regex" ? `Cha\xEEne de caract\xE8res invalide : doit correspondre au motif ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function fr_default() {
  return {
    localeError: error17()
  };
}

// node_modules/zod/v4/locales/fr-CA.js
var error18 = () => {
  let Sizable = {
    string: { unit: "caract\xE8res", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "\xE9l\xE9ments", verb: "avoir" },
    set: { unit: "\xE9l\xE9ments", verb: "avoir" },
    map: { unit: "\xE9l\xE9ments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "entr\xE9e",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "dur\xE9e ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    mac: "adresse MAC",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "cha\xEEne encod\xE9e en base64",
    base64url: "cha\xEEne encod\xE9e en base64url",
    json_string: "cha\xEEne JSON",
    e164: "num\xE9ro E.164",
    credit_card: "num\xE9ro de carte de cr\xE9dit",
    currency_code: "code de devise",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entr\xE9e"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Entr\xE9e invalide : attendu instanceof ${issue2.expected}, re\xE7u ${received}` : `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}` : `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "\u2264" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}` : `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? "\u2265" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"` : _issue.format === "ends_with" ? `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"` : _issue.format === "includes" ? `Cha\xEEne invalide : doit inclure "${_issue.includes}"` : _issue.format === "regex" ? `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cl\xE9 invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entr\xE9e invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return "Entr\xE9e invalide";
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error18()
  };
}

// node_modules/zod/v4/locales/gu.js
var error19 = () => {
  let Sizable = {
    string: { unit: "\u0A85\u0A95\u0ACD\u0AB7\u0AB0", verb: "\u0AB9\u0ACB\u0AB5\u0ABE \u0A9C\u0ACB\u0A88\u0A8F" },
    file: { unit: "\u0AAC\u0ABE\u0AAF\u0A9F", verb: "\u0AB9\u0ACB\u0AB5\u0ABE \u0A9C\u0ACB\u0A88\u0A8F" },
    array: { unit: "\u0A86\u0A87\u0A9F\u0AAE", verb: "\u0AB9\u0ACB\u0AB5\u0ABE \u0A9C\u0ACB\u0A88\u0A8F" },
    set: { unit: "\u0A86\u0A87\u0A9F\u0AAE", verb: "\u0AB9\u0ACB\u0AB5\u0ABE \u0A9C\u0ACB\u0A88\u0A8F" },
    map: { unit: "\u0A8F\u0AA8\u0ACD\u0A9F\u0ACD\u0AB0\u0AC0", verb: "\u0AB9\u0ACB\u0AB5\u0ABE \u0A9C\u0ACB\u0A88\u0A8F" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0A87\u0AA8\u0AAA\u0AC1\u0A9F",
    email: "\u0A88\u0AAE\u0AC7\u0A87\u0AB2 \u0A8F\u0AA1\u0ACD\u0AB0\u0AC7\u0AB8",
    url: "URL",
    emoji: "\u0A87\u0AAE\u0ACB\u0A9C\u0AC0",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0AA4\u0ABE\u0AB0\u0AC0\u0A96 \u0A85\u0AA8\u0AC7 \u0AB8\u0AAE\u0AAF",
    date: "ISO \u0AA4\u0ABE\u0AB0\u0AC0\u0A96",
    time: "ISO \u0AB8\u0AAE\u0AAF",
    duration: "ISO \u0A85\u0AB5\u0AA7\u0ABF",
    ipv4: "IPv4 \u0A8F\u0AA1\u0ACD\u0AB0\u0AC7\u0AB8",
    ipv6: "IPv6 \u0A8F\u0AA1\u0ACD\u0AB0\u0AC7\u0AB8",
    mac: "MAC \u0A8F\u0AA1\u0ACD\u0AB0\u0AC7\u0AB8",
    cidrv4: "IPv4 \u0AB6\u0ACD\u0AB0\u0AC7\u0AA3\u0AC0",
    cidrv6: "IPv6 \u0AB6\u0ACD\u0AB0\u0AC7\u0AA3\u0AC0",
    base64: "base64-\u0A8F\u0AA8\u0ACD\u0A95\u0ACB\u0AA1\u0AC7\u0AA1 \u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0ABF\u0A82\u0A97",
    base64url: "base64url-\u0A8F\u0AA8\u0ACD\u0A95\u0ACB\u0AA1\u0AC7\u0AA1 \u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0ABF\u0A82\u0A97",
    json_string: "JSON \u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0ABF\u0A82\u0A97",
    e164: "E.164 \u0AA8\u0A82\u0AAC\u0AB0",
    credit_card: "\u0A95\u0ACD\u0AB0\u0AC7\u0AA1\u0ABF\u0A9F \u0A95\u0ABE\u0AB0\u0ACD\u0AA1 \u0AA8\u0A82\u0AAC\u0AB0",
    currency_code: "\u0A9A\u0AB2\u0AA3 \u0A95\u0ACB\u0AA1",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0A87\u0AA8\u0AAA\u0AC1\u0A9F"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0A87\u0AA8\u0AAA\u0AC1\u0A9F: \u0A85\u0AAA\u0AC7\u0A95\u0ACD\u0AB7\u0ABF\u0AA4 ${expected}, \u0AAA\u0ACD\u0AB0\u0ABE\u0AAA\u0ACD\u0AA4 ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0A87\u0AA8\u0AAA\u0AC1\u0A9F: \u0A85\u0AAA\u0AC7\u0A95\u0ACD\u0AB7\u0ABF\u0AA4 ${stringifyPrimitive(issue2.values[0])}` : `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AB5\u0ABF\u0A95\u0AB2\u0ACD\u0AAA: ${joinValues(issue2.values, " | ")} \u0AAE\u0ABE\u0AA7\u0ACD\u0AAF\u0AAE\u0AA5\u0AC0 \u0A8F\u0A95 \u0A85\u0AAA\u0AC7\u0A95\u0ACD\u0AB7\u0ABF\u0AA4`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `\u0A96\u0AC2\u0AAC \u0AAE\u0ACB\u0A9F\u0AC1\u0A82: ${issue2.origin ?? "\u0AAE\u0AC2\u0AB2\u0ACD\u0AAF"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0A8F\u0AB2\u0ABF\u0AAE\u0AC7\u0AA8\u0ACD\u0A9F"} \u0AB9\u0ACB\u0AB5\u0ABE \u0A9C\u0ACB\u0A88\u0A8F` : `\u0A96\u0AC2\u0AAC \u0AAE\u0ACB\u0A9F\u0AC1\u0A82: ${issue2.origin ?? "\u0AAE\u0AC2\u0AB2\u0ACD\u0AAF"} ${adj}${issue2.maximum.toString()} \u0AB9\u0ACB\u0AB5\u0AC1\u0A82 \u0A9C\u0ACB\u0A88\u0A8F`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\u0A96\u0AC2\u0AAC \u0AA8\u0ABE\u0AA8\u0AC1\u0A82: ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0AB9\u0ACB\u0AB5\u0ABE \u0A9C\u0ACB\u0A88\u0A8F` : `\u0A96\u0AC2\u0AAC \u0AA8\u0ABE\u0AA8\u0AC1\u0A82: ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0AB9\u0ACB\u0AB5\u0AC1\u0A82 \u0A9C\u0ACB\u0A88\u0A8F`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0ABF\u0A82\u0A97: "${_issue.prefix}" \u0AA5\u0AC0 \u0AB6\u0AB0\u0AC2 \u0AA5\u0AB5\u0AC1\u0A82 \u0A9C\u0ACB\u0A88\u0A8F` : _issue.format === "ends_with" ? `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0ABF\u0A82\u0A97: "${_issue.suffix}" \u0AAA\u0AB0 \u0AB8\u0AAE\u0ABE\u0AAA\u0ACD\u0AA4 \u0AA5\u0AB5\u0AC1\u0A82 \u0A9C\u0ACB\u0A88\u0A8F` : _issue.format === "includes" ? `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0ABF\u0A82\u0A97: "${_issue.includes}" \u0AB6\u0ABE\u0AAE\u0AC7\u0AB2 \u0AB9\u0ACB\u0AB5\u0AC1\u0A82 \u0A9C\u0ACB\u0A88\u0A8F` : _issue.format === "regex" ? `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AB8\u0ACD\u0A9F\u0ACD\u0AB0\u0ABF\u0A82\u0A97: \u0AAA\u0AC7\u0A9F\u0AB0\u0ACD\u0AA8 ${_issue.pattern} \u0AB8\u0ABE\u0AA5\u0AC7 \u0AAE\u0AC7\u0AB3 \u0A96\u0ABE\u0AB5\u0AC1\u0A82 \u0A9C\u0ACB\u0A88\u0A8F` : `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AA8\u0A82\u0AAC\u0AB0: ${issue2.divisor} \u0AA8\u0ACB \u0A97\u0AC1\u0AA3\u0ABE\u0A82\u0A95 \u0AB9\u0ACB\u0AB5\u0ACB \u0A9C\u0ACB\u0A88\u0A8F`;
      case "unrecognized_keys":
        return `\u0A93\u0AB3\u0A96\u0AC0 \u0AB6\u0A95\u0ABE\u0AA4\u0ABE \u0AA8\u0AB9\u0AC0\u0A82 \u0AA4\u0AC7 \u0A95\u0AC0${issue2.keys.length > 1 ? "\u0A93" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} \u0AAE\u0ABE\u0A82 \u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0A95\u0AC0`;
      case "invalid_union":
        return issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0 ? `\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AA1\u0ABF\u0AB8\u0ACD\u0A95\u0ACD\u0AB0\u0ABF\u0AAE\u0ABF\u0AA8\u0AC7\u0A9F\u0AB0 \u0AAE\u0AC2\u0AB2\u0ACD\u0AAF. \u0A85\u0AAA\u0AC7\u0A95\u0ACD\u0AB7\u0ABF\u0AA4 ${issue2.options.map((o) => `'${o}'`).join(" | ")}` : "\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0A87\u0AA8\u0AAA\u0AC1\u0A9F";
      case "invalid_element":
        return `${issue2.origin} \u0AAE\u0ABE\u0A82 \u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0AAE\u0AC2\u0AB2\u0ACD\u0AAF`;
      default:
        return "\u0A85\u0AAE\u0ABE\u0AA8\u0ACD\u0AAF \u0A87\u0AA8\u0AAA\u0AC1\u0A9F";
    }
  };
};
function gu_default() {
  return {
    localeError: error19()
  };
}

// node_modules/zod/v4/locales/he.js
var error20 = () => {
  let TypeNames = {
    string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" },
    number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" },
    boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" },
    array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" },
    object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" },
    null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" },
    undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" },
    symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" },
    function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" },
    map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" },
    set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" },
    file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" },
    value: { label: "\u05E2\u05E8\u05DA", gender: "m" }
  }, Sizable = {
    string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" },
    file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
    number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }
    // no unit
  }, typeEntry = (t) => t ? TypeNames[t] : void 0, typeLabel = (t) => {
    let e = typeEntry(t);
    return e ? e.label : t ?? TypeNames.unknown.label;
  }, withDefinite = (t) => `\u05D4${typeLabel(t)}`, verbFor = (t) => (typeEntry(t)?.gender ?? "m") === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA", getSizing = (origin) => origin ? Sizable[origin] ?? null : null, FormatDictionary = {
    regex: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" },
    url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    uuidv4: { label: "UUIDv4", gender: "m" },
    uuidv6: { label: "UUIDv6", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" },
    date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" },
    time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" },
    duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" },
    ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" },
    ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" },
    mac: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA MAC", gender: "f" },
    cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" },
    cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" },
    base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" },
    base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" },
    json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" },
    e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" },
    credit_card: { label: "\u05DE\u05E1\u05E4\u05E8 \u05DB\u05E8\u05D8\u05D9\u05E1 \u05D0\u05E9\u05E8\u05D0\u05D9", gender: "m" },
    currency_code: { label: "\u05E7\u05D5\u05D3 \u05DE\u05D8\u05D1\u05E2", gender: "m" },
    iban: { label: "IBAN", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    template_literal: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    includes: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
    uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expectedKey = issue2.expected, expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey), receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}` : `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1)
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${stringifyPrimitive(issue2.values[0])}`;
        let stringified = issue2.values.map((v2) => stringifyPrimitive(v2));
        if (issue2.values.length === 2)
          return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified[0]} \u05D0\u05D5 ${stringified[1]}`;
        let lastValue = stringified[stringified.length - 1];
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified.slice(0, -1).join(", ")} \u05D0\u05D5 ${lastValue}`;
      }
      case "too_big": {
        let sizing = getSizing(issue2.origin), subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string")
          return `${sizing?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
        if (issue2.origin === "number") {
          let comparison = issue2.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${issue2.maximum}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          let verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA", comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        let adj = issue2.inclusive ? "<=" : "<", be = verbFor(issue2.origin ?? "value");
        return sizing?.unit ? `${sizing.longLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}` : `${sizing?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let sizing = getSizing(issue2.origin), subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string")
          return `${sizing?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
        if (issue2.origin === "number") {
          let comparison = issue2.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${issue2.minimum}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          let verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
          if (issue2.minimum === 1 && issue2.inclusive) {
            let singularPhrase = (issue2.origin === "set", "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3");
            return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${singularPhrase}`;
          }
          let comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
        }
        let adj = issue2.inclusive ? ">=" : ">", be = verbFor(issue2.origin ?? "value");
        return sizing?.unit ? `${sizing.shortLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `${sizing?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        if (_issue.format === "starts_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
        let nounEntry = FormatDictionary[_issue.format], noun = nounEntry?.label ?? _issue.format, adjective = (nounEntry?.gender ?? "m") === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
        return `${noun} \u05DC\u05D0 ${adjective}`;
      }
      case "not_multiple_of":
        return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8";
      case "invalid_union":
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
      case "invalid_element":
        return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${withDefinite(issue2.origin ?? "array")}`;
      default:
        return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
    }
  };
};
function he_default() {
  return {
    localeError: error20()
  };
}

// node_modules/zod/v4/locales/hi.js
var error21 = () => {
  let Sizable = {
    string: { unit: "\u0905\u0915\u094D\u0937\u0930", verb: "\u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F" },
    file: { unit: "\u092C\u093E\u0907\u091F\u094D\u0938", verb: "\u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F" },
    array: { unit: "\u0924\u0924\u094D\u0935", verb: "\u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F" },
    set: { unit: "\u0924\u0924\u094D\u0935", verb: "\u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F" },
    map: { unit: "\u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0901", verb: "\u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0907\u0928\u092A\u0941\u091F",
    email: "\u0908\u092E\u0947\u0932 \u092A\u0924\u093E",
    url: "URL",
    emoji: "\u0907\u092E\u094B\u091C\u0940",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0924\u093F\u0925\u093F \u0914\u0930 \u0938\u092E\u092F",
    date: "ISO \u0924\u093F\u0925\u093F",
    time: "ISO \u0938\u092E\u092F",
    duration: "ISO \u0905\u0935\u0927\u093F",
    ipv4: "IPv4 \u092A\u0924\u093E",
    ipv6: "IPv6 \u092A\u0924\u093E",
    mac: "MAC \u092A\u0924\u093E",
    cidrv4: "IPv4 \u0936\u094D\u0930\u0947\u0923\u0940",
    cidrv6: "IPv6 \u0936\u094D\u0930\u0947\u0923\u0940",
    base64: "Base64-\u090F\u0928\u094D\u0915\u094B\u0921\u0947\u0921 \u0938\u094D\u091F\u094D\u0930\u093F\u0902\u0917",
    base64url: "Base64URL-\u090F\u0928\u094D\u0915\u094B\u0921\u0947\u0921 \u0938\u094D\u091F\u094D\u0930\u093F\u0902\u0917",
    json_string: "JSON \u0938\u094D\u091F\u094D\u0930\u093F\u0902\u0917",
    e164: "E.164 \u0938\u0902\u0916\u094D\u092F\u093E",
    credit_card: "\u0915\u094D\u0930\u0947\u0921\u093F\u091F \u0915\u093E\u0930\u094D\u0921 \u0938\u0902\u0916\u094D\u092F\u093E",
    currency_code: "\u092E\u0941\u0926\u094D\u0930\u093E \u0915\u094B\u0921",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0907\u0928\u092A\u0941\u091F"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return `\u0905\u092E\u093E\u0928\u094D\u092F \u0907\u0928\u092A\u0941\u091F: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 ${expected}, \u092A\u094D\u0930\u093E\u092A\u094D\u0924 ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u0905\u092E\u093E\u0928\u094D\u092F \u0907\u0928\u092A\u0941\u091F: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 ${stringifyPrimitive(issue2.values[0])}` : `\u0905\u092E\u093E\u0928\u094D\u092F \u0935\u093F\u0915\u0932\u094D\u092A: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 \u092E\u093E\u0928\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u090F\u0915 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `\u092C\u0939\u0941\u0924 \u092C\u0921\u093C\u093E: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 \u0925\u093E \u0915\u093F ${issue2.origin ?? "\u092E\u093E\u0928"} \u092E\u0947\u0902 ${adj}${issue2.maximum} ${sizing.unit} \u0939\u094B\u0902` : `\u092C\u0939\u0941\u0924 \u092C\u0921\u093C\u093E: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 \u0925\u093E \u0915\u093F ${issue2.origin ?? "\u092E\u093E\u0928"} ${adj}${issue2.maximum} \u0939\u094B`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `\u092C\u0939\u0941\u0924 \u091B\u094B\u091F\u093E: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 \u0925\u093E \u0915\u093F ${issue2.origin} \u092E\u0947\u0902 ${adj}${issue2.minimum} ${sizing.unit} \u0939\u094B\u0902` : `\u092C\u0939\u0941\u0924 \u091B\u094B\u091F\u093E: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 \u0925\u093E \u0915\u093F ${issue2.origin} ${adj}${issue2.minimum} \u0939\u094B`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u0905\u092E\u093E\u0928\u094D\u092F \u0938\u094D\u091F\u094D\u0930\u093F\u0902\u0917: "${_issue.prefix}" \u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F` : _issue.format === "ends_with" ? `\u0905\u092E\u093E\u0928\u094D\u092F \u0938\u094D\u091F\u094D\u0930\u093F\u0902\u0917: "${_issue.suffix}" \u092A\u0930 \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F` : _issue.format === "includes" ? `\u0905\u092E\u093E\u0928\u094D\u092F \u0938\u094D\u091F\u094D\u0930\u093F\u0902\u0917: \u0907\u0938\u092E\u0947\u0902 "${_issue.includes}" \u0936\u093E\u092E\u093F\u0932 \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F` : _issue.format === "regex" ? `\u0905\u092E\u093E\u0928\u094D\u092F \u0938\u094D\u091F\u094D\u0930\u093F\u0902\u0917: \u092A\u0948\u091F\u0930\u094D\u0928 ${_issue.pattern} \u0938\u0947 \u092E\u0947\u0932 \u0916\u093E\u0928\u093E \u091A\u093E\u0939\u093F\u090F` : `\u0905\u092E\u093E\u0928\u094D\u092F ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u0905\u092E\u093E\u0928\u094D\u092F \u0938\u0902\u0916\u094D\u092F\u093E: \u092F\u0939 ${issue2.divisor} \u0915\u093E \u0917\u0941\u0923\u091C \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F`;
      case "unrecognized_keys":
        return `\u0905\u092A\u0930\u093F\u091A\u093F\u0924 \u0915\u0941\u0902\u091C\u0940${issue2.keys.length > 1 ? "\u092F\u093E\u0901" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u0905\u092E\u093E\u0928\u094D\u092F \u0915\u0941\u0902\u091C\u0940: ${issue2.origin} \u092E\u0947\u0902`;
      case "invalid_union":
        return issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0 ? `\u0905\u092E\u093E\u0928\u094D\u092F \u0921\u093F\u0938\u094D\u0915\u094D\u0930\u093F\u092E\u093F\u0928\u0947\u091F\u0930 \u092E\u093E\u0928: \u0905\u092A\u0947\u0915\u094D\u0937\u093F\u0924 ${issue2.options.map((o) => `'${o}'`).join(" | ")}` : "\u0905\u092E\u093E\u0928\u094D\u092F \u0907\u0928\u092A\u0941\u091F";
      case "invalid_element":
        return `\u0905\u092E\u093E\u0928\u094D\u092F \u092E\u093E\u0928: ${issue2.origin} \u092E\u0947\u0902`;
      default:
        return "\u0905\u092E\u093E\u0928\u094D\u092F \u0907\u0928\u092A\u0941\u091F";
    }
  };
};
function hi_default() {
  return {
    localeError: error21()
  };
}

// node_modules/zod/v4/locales/hr.js
var error22 = () => {
  let Sizable = {
    string: { unit: "znakova", verb: "imati" },
    file: { unit: "bajtova", verb: "imati" },
    array: { unit: "stavki", verb: "imati" },
    set: { unit: "stavki", verb: "imati" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "unos",
    email: "email adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum i vrijeme",
    date: "ISO datum",
    time: "ISO vrijeme",
    duration: "ISO trajanje",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "IPv4 raspon",
    cidrv6: "IPv6 raspon",
    base64: "base64 kodirani tekst",
    base64url: "base64url kodirani tekst",
    json_string: "JSON tekst",
    e164: "E.164 broj",
    credit_card: "broj kreditne kartice",
    currency_code: "kod valute",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "unos"
  }, TypeDictionary = {
    nan: "NaN",
    string: "tekst",
    number: "broj",
    boolean: "boolean",
    array: "niz",
    object: "objekt",
    set: "skup",
    file: "datoteka",
    date: "datum",
    bigint: "bigint",
    symbol: "simbol",
    undefined: "undefined",
    null: "null",
    function: "funkcija",
    map: "mapa"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Neispravan unos: o\u010Dekuje se instanceof ${issue2.expected}, a primljeno je ${received}` : `Neispravan unos: o\u010Dekuje se ${expected}, a primljeno je ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Neispravna vrijednost: o\u010Dekivano ${stringifyPrimitive(issue2.values[0])}` : `Neispravna opcija: o\u010Dekivano jedno od ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin), origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return sizing ? `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} ima ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemenata"}` : `Preveliko: o\u010Dekivano da ${origin ?? "vrijednost"} bude ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin), origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return sizing ? `Premalo: o\u010Dekivano da ${origin} ima ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Premalo: o\u010Dekivano da ${origin} bude ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Neispravan tekst: mora zapo\u010Dinjati s "${_issue.prefix}"` : _issue.format === "ends_with" ? `Neispravan tekst: mora zavr\u0161avati s "${_issue.suffix}"` : _issue.format === "includes" ? `Neispravan tekst: mora sadr\u017Eavati "${_issue.includes}"` : _issue.format === "regex" ? `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}` : `Neispravna ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neispravan broj: mora biti vi\u0161ekratnik od ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznat${issue2.keys.length > 1 ? "i klju\u010Devi" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neispravan klju\u010D u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Neispravan unos";
      case "invalid_element":
        return `Neispravna vrijednost u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return "Neispravan unos";
    }
  };
};
function hr_default() {
  return {
    localeError: error22()
  };
}

// node_modules/zod/v4/locales/hu.js
var error23 = () => {
  let Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" },
    map: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "bemenet",
    email: "email c\xEDm",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO id\u0151b\xE9lyeg",
    date: "ISO d\xE1tum",
    time: "ISO id\u0151",
    duration: "ISO id\u0151intervallum",
    ipv4: "IPv4 c\xEDm",
    ipv6: "IPv6 c\xEDm",
    mac: "MAC c\xEDm",
    cidrv4: "IPv4 tartom\xE1ny",
    cidrv6: "IPv6 tartom\xE1ny",
    base64: "base64-k\xF3dolt string",
    base64url: "base64url-k\xF3dolt string",
    json_string: "JSON string",
    e164: "E.164 sz\xE1m",
    credit_card: "hitelk\xE1rtyasz\xE1m",
    currency_code: "p\xE9nznemk\xF3d",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "bemenet"
  }, TypeDictionary = {
    nan: "NaN",
    number: "sz\xE1m",
    array: "t\xF6mb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue2.expected}, a kapott \xE9rt\xE9k ${received}` : `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}` : `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `T\xFAl nagy: ${issue2.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}` : `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie` : _issue.format === "ends_with" ? `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie` : _issue.format === "includes" ? `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia` : _issue.format === "regex" ? `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie` : `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "\xC9rv\xE9nytelen bemenet";
      case "invalid_element":
        return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
      default:
        return "\xC9rv\xE9nytelen bemenet";
    }
  };
};
function hu_default() {
  return {
    localeError: error23()
  };
}

// node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count4, one4, many) {
  return Math.abs(count4) === 1 ? one4 : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  let vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"], lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
}
var error24 = () => {
  let Sizable = {
    string: {
      unit: {
        one: "\u0576\u0577\u0561\u0576",
        many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    file: {
      unit: {
        one: "\u0562\u0561\u0575\u0569",
        many: "\u0562\u0561\u0575\u0569\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    array: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    set: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    },
    map: {
      unit: {
        one: "\u057F\u0561\u0580\u0580",
        many: "\u057F\u0561\u0580\u0580\u0565\u0580"
      },
      verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "\u0574\u0578\u0582\u057F\u0584",
    email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
    url: "URL",
    emoji: "\u0567\u0574\u0578\u057B\u056B",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
    date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
    time: "ISO \u056A\u0561\u0574",
    duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
    ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
    ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
    mac: "MAC \u0570\u0561\u057D\u0581\u0565",
    cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
    base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
    json_string: "JSON \u057F\u0578\u0572",
    e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
    credit_card: "\u056F\u0580\u0565\u0564\u056B\u057F \u0584\u0561\u0580\u057F\u056B \u0570\u0561\u0574\u0561\u0580",
    currency_code: "\u0561\u0580\u056A\u0578\u0582\u0575\u0569\u056B \u056F\u0578\u0564",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "\u0574\u0578\u0582\u057F\u0584"
  }, TypeDictionary = {
    nan: "NaN",
    number: "\u0569\u056B\u057E",
    array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue2.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}` : `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue2.values[1])}` : `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        if (sizing) {
          let maxValue = Number(issue2.maximum), unit2 = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.maximum.toString()} ${unit2}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        if (sizing) {
          let minValue = Number(issue2.minimum), unit2 = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.minimum.toString()} ${unit2}`;
        }
        return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056C\u056B\u0576\u056B ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E` : _issue.format === "ends_with" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E` : _issue.format === "includes" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"` : _issue.format === "regex" ? `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576` : `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue2.divisor}-\u056B`;
      case "unrecognized_keys":
        return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue2.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      case "invalid_union":
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
      case "invalid_element":
        return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
      default:
        return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
    }
  };
};
function hy_default() {
  return {
    localeError: error24()
  };
}

// node_modules/zod/v4/locales/id.js
var error25 = () => {
  let Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" },
    map: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    mac: "alamat MAC",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    credit_card: "nomor kartu kredit",
    currency_code: "kode mata uang",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  }, TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}` : `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}` : `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}` : `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `String tidak valid: harus dimulai dengan "${_issue.prefix}"` : _issue.format === "ends_with" ? `String tidak valid: harus berakhir dengan "${_issue.suffix}"` : _issue.format === "includes" ? `String tidak valid: harus menyertakan "${_issue.includes}"` : _issue.format === "regex" ? `String tidak valid: harus sesuai pola ${_issue.pattern}` : `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return "Input tidak valid";
    }
  };
};
function id_default() {
  return {
    localeError: error25()
  };
}

// node_modules/zod/v4/locales/is.js
var error26 = () => {
  let Sizable = {
    string: { unit: "stafi", verb: "a\xF0 hafa" },
    file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
    array: { unit: "hluti", verb: "a\xF0 hafa" },
    set: { unit: "hluti", verb: "a\xF0 hafa" },
    map: { unit: "hluti", verb: "a\xF0 hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefsl\xF3\xF0",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og t\xEDmi",
    date: "ISO dagsetning",
    time: "ISO t\xEDmi",
    duration: "ISO t\xEDmalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 t\xF6lugildi",
    credit_card: "kreditkortan\xFAmer",
    currency_code: "gjaldmi\xF0ilsk\xF3\xF0i",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "gildi"
  }, TypeDictionary = {
    nan: "NaN",
    number: "n\xFAmer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue2.expected}` : `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue2.values[0])}` : `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}` : `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} s\xE9 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} s\xE9 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"` : _issue.format === "ends_with" ? `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"` : _issue.format === "includes" ? `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"` : _issue.format === "regex" ? `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}` : `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `\xD3\xFEekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill \xED ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi \xED ${issue2.origin}`;
      default:
        return "Rangt gildi";
    }
  };
};
function is_default() {
  return {
    localeError: error26()
  };
}

// node_modules/zod/v4/locales/it.js
var error27 = () => {
  let Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" },
    map: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  let FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    mac: "indirizzo MAC",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    credit_card: "numero di carta di credito",
    currency_code: "codice valuta",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  }, TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        let expected = TypeDictionary[issue2.expected] ?? issue2.expected, receivedType = parsedType(issue2.input), received = TypeDictionary[receivedType] ?? receivedType;
        return /^[A-Z]/.test(issue2.expected) ? `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}` : `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        return issue2.values.length === 1 ? `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}` : `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        let adj = issue2.inclusive ? "<=" : "<", sizing = getSizing(issue2.origin);
        return sizing ? `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}` : `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        let adj = issue2.inclusive ? ">=" : ">", sizing = getSizing(issue2.origin);
        return sizing ? `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}` : `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        let _issue = issue2;
        return _issue.format === "starts_with" ? `Stringa non valida: deve iniziare con "${_issue.prefix}"` : _issue.format === "ends_with" ? `Stringa non valida: deve terminare con "${_issue.suffix}"` : _issue.format === "includes" ? `Stringa non valida: deve includere "${_issue.includes}"` : _issue.format === "regex" ? `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}` : `Input non valido: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return "Input non valido";
    }
  };
};
function it_default() {
  return {
    localeError: error27()
  };
}
// End of bundle text, part 3 of 15
export { $ZodAny, $ZodArray, $ZodBase64, $ZodBase64URL, $ZodBigInt, $ZodBigIntFormat, $ZodBoolean, $ZodCIDRv4,
  $ZodCIDRv6, $ZodCUID, $ZodCUID2, $ZodCatch, $ZodCodec, $ZodCreditCard, $ZodCustom, $ZodCustomStringFormat,
  $ZodCyclicError, $ZodDate, $ZodDefault, $ZodDiscriminatedUnion, $ZodE164, $ZodEmoji, $ZodEnum, $ZodExactOptional,
  $ZodFile, $ZodFunction, $ZodIBAN, $ZodIPv4, $ZodIPv6, $ZodISODate, $ZodISODateTime, $ZodISODuration, $ZodISOTime,
  $ZodIntersection, $ZodJWT, $ZodKSUID, $ZodLazy, $ZodLiteral, $ZodMAC, $ZodMap, $ZodNaN, $ZodNanoID, $ZodNever,
  $ZodNonOptional, $ZodNull, $ZodNullable, $ZodNumber, $ZodNumberFormat, $ZodObject, $ZodObjectJIT, $ZodOptional,
  $ZodPipe, $ZodPrefault, $ZodPreprocess, $ZodPromise, $ZodReadonly, $ZodRecord, $ZodSet, $ZodSuccess, $ZodSymbol,
  $ZodTemplateLiteral, $ZodTransform, $ZodTuple, $ZodULID, $ZodURL, $ZodUndefined, $ZodUnion, $ZodUnknown, $ZodVoid,
  $ZodXID, $ZodXor, base64Charset, base64urlCharset, en_default2, getDiscriminatedOption, isBackEdge,
  isRecursiveSchema, isValidBase64, isValidBase64URL, isValidCIDRv6, isValidCreditCard, isValidIBAN, isValidIPv6,
  isValidJWT2, locales_exports, memoizer, mergeValues2 };
