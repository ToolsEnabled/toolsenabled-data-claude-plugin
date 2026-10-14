// ToolsEnabled Data server, part 2 of 15: zod, the schema library (lines 4785-10496 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-01-ajv.mjs";
import { __commonJS, __export, require_applicator, require_codegen, require_compile, require_core, require_core2,
  require_format2, require_ref_error, require_util, require_validate, require_validation, require_validation_error } from "./tedata-server-01-ajv.mjs";
import { $ZodAny, $ZodArray, $ZodBase64, $ZodBase64URL, $ZodBigInt, $ZodBigIntFormat, $ZodBoolean, $ZodCIDRv4,
  $ZodCIDRv6, $ZodCUID, $ZodCUID2, $ZodCatch, $ZodCodec, $ZodCreditCard, $ZodCustom, $ZodCustomStringFormat,
  $ZodCyclicError, $ZodDate, $ZodDefault, $ZodDiscriminatedUnion, $ZodE164, $ZodEmoji, $ZodEnum, $ZodExactOptional,
  $ZodFile, $ZodFunction, $ZodIBAN, $ZodIPv4, $ZodIPv6, $ZodISODate, $ZodISODateTime, $ZodISODuration, $ZodISOTime,
  $ZodIntersection, $ZodJWT, $ZodKSUID, $ZodLazy, $ZodLiteral, $ZodMAC, $ZodMap, $ZodNaN, $ZodNanoID, $ZodNever,
  $ZodNonOptional, $ZodNull, $ZodNullable, $ZodNumber, $ZodNumberFormat, $ZodObject, $ZodObjectJIT, $ZodOptional,
  $ZodPipe, $ZodPrefault, $ZodPreprocess, $ZodPromise, $ZodReadonly, $ZodRecord, $ZodSet, $ZodSuccess, $ZodSymbol,
  $ZodTemplateLiteral, $ZodTransform, $ZodTuple, $ZodULID, $ZodURL, $ZodUndefined, $ZodUnion, $ZodUnknown, $ZodVoid,
  $ZodXID, $ZodXor, base64Charset, base64urlCharset, getDiscriminatedOption, isBackEdge, isRecursiveSchema,
  isValidBase64, isValidBase64URL, isValidCIDRv6, isValidCreditCard, isValidIBAN, isValidIPv6, isValidJWT2,
  locales_exports, memoizer, mergeValues2 } from "./tedata-server-03-zod.mjs";
import { $ZodRegistry, $input, $output, INVALID2, ZodCompileAsyncError, ZodCompileUnsupportedError, compile,
  compileFn, globalRegistry, registry, withParser } from "./tedata-server-04-zod.mjs";
import { JSONSchemaGenerator, TimePrecision, _any, _array, _base64, _base64url, _bigint, _boolean, _catch, _check,
  _cidrv4, _cidrv6, _coercedBigint, _coercedBoolean, _coercedDate, _coercedNumber, _coercedString, _creditCard, _cuid,
  _cuid2, _custom, _date, _default, _discriminatedUnion, _e164, _email, _emoji2, _endsWith, _enum, _file, _float32,
  _float64, _gt, _gte, _guid, _iban, _includes, _int, _int32, _int64, _intersection, _ipv4, _ipv6, _isoDate,
  _isoDateTime, _isoDuration, _isoTime, _jwt, _ksuid, _lazy, _length, _literal, _lowercase, _lt, _lte, _mac, _map,
  _maxLength, _maxSize, _mime, _minLength, _minSize, _multipleOf, _nan, _nanoid, _nativeEnum, _negative, _never,
  _nonnegative, _nonoptional, _nonpositive, _normalize, _null2, _nullable, _number, _optional, _overwrite, _pipe,
  _positive, _promise, _properties, _property, _readonly, _record, _refine, _regex, _set, _size, _slugify,
  _startsWith, _string, _stringFormat, _stringbool, _success, _superRefine, _symbol, _templateLiteral, _toLowerCase,
  _toUpperCase, _transform, _trim, _tuple, _uint32, _uint64, _ulid, _undefined2, _union, _unknown, _uppercase, _url,
  _uuid, _uuidv4, _uuidv6, _uuidv7, _void, _xid, _xor, createStandardJSONSchemaMethod, createToJSONSchemaMethod,
  describe, extractDefs, finalize, handleUnrepresentable, initializeContext, json_schema_exports, meta, processSchema,
  toJSONSchema } from "./tedata-server-05-zod.mjs";
// Bundle text, part 2 of 15

// node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  "node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var core_1 = require_core2(), validation_1 = require_validation(), applicator_1 = require_applicator(), format_1 = require_format2(), metadata_1 = require_metadata(), draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports.default = draft7Vocabularies;
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2.Tag = "tag", DiscrError2.Mapping = "mapping";
    })(DiscrError || (exports.DiscrError = DiscrError = {}));
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var codegen_1 = require_codegen(), types_1 = require_types(), compile_1 = require_compile(), ref_error_1 = require_ref_error(), util_1 = require_util(), error64 = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    }, def2 = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error: error64,
      code(cxt) {
        let { gen, data: data3, schema, parentSchema, it } = cxt, { oneOf } = parentSchema;
        if (!it.opts.discriminator)
          throw new Error("discriminator: requires discriminator option");
        let tagName = schema.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
          throw new Error("discriminator: requires oneOf keyword");
        let valid = gen.let("valid", !1), tag = gen.const("tag", (0, codegen_1._)`${data3}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(!1, { discrError: types_1.DiscrError.Tag, tag, tagName })), cxt.ok(valid);
        function validateMapping() {
          let mapping = getMapping();
          gen.if(!1);
          for (let tagValue in mapping)
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`), gen.assign(valid, applyTagSchema(mapping[tagValue]));
          gen.else(), cxt.error(!1, { discrError: types_1.DiscrError.Mapping, tag, tagName }), gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          let _valid = gen.name("valid"), schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          return cxt.mergeEvaluated(schCxt, codegen_1.Name), _valid;
        }
        function getMapping() {
          var _a3;
          let oneOfMapping = {}, topRequired = hasRequired(parentSchema), tagRequired = !0;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if (sch?.$ref && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              let ref2 = sch.$ref;
              if (sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref2), sch instanceof compile_1.SchemaEnv && (sch = sch.schema), sch === void 0)
                throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref2);
            }
            let propSch = (_a3 = sch?.properties) === null || _a3 === void 0 ? void 0 : _a3[tagName];
            if (typeof propSch != "object")
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            tagRequired = tagRequired && (topRequired || hasRequired(sch)), addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required: required3 }) {
            return Array.isArray(required3) && required3.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const)
              addMapping(sch.const, i);
            else if (sch.enum)
              for (let tagValue of sch.enum)
                addMapping(tagValue, i);
            else
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping)
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def2;
  }
});

// node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: !0,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: !0,
        readOnly: {
          type: "boolean",
          default: !1
        },
        examples: {
          type: "array",
          items: !0
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: !0
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: !1
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: !0,
        enum: {
          type: "array",
          items: !0,
          minItems: 1,
          uniqueItems: !0
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: !0
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: !0
    };
  }
});

// node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core(), draft7_1 = require_draft7(), discriminator_1 = require_discriminator(), draft7MetaSchema = require_json_schema_draft_07(), META_SUPPORT_DATA = ["/properties"], META_SCHEMA_ID = "http://json-schema.org/draft-07/schema", Ajv2 = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies(), draft7_1.default.forEach((v2) => this.addVocabulary(v2)), this.opts.discriminator && this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        let metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, !1), this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports.Ajv = Ajv2;
    module.exports = exports = Ajv2;
    module.exports.Ajv = Ajv2;
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.default = Ajv2;
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
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: !0, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: !0, get: function() {
      return ref_error_1.default;
    } });
  }
});

// node_modules/ajv-formats/dist/formats.js
var require_formats = __commonJS({
  "node_modules/ajv-formats/dist/formats.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
    function fmtDef(validate2, compare3) {
      return { validate: validate2, compare: compare3 };
    }
    exports.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: fmtDef(date6, compareDate),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: fmtDef(getTime(!0), compareTime),
      "date-time": fmtDef(getDateTime(!0), compareDateTime),
      "iso-time": fmtDef(getTime(), compareIsoTime),
      "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: uri2,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte,
      // signed 32 bit integer
      int32: { type: "number", validate: validateInt32 },
      // signed 64 bit integer
      int64: { type: "number", validate: validateInt64 },
      // C-type float
      float: { type: "number", validate: validateNumber },
      // C-type double
      double: { type: "number", validate: validateNumber },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    };
    exports.fastFormats = {
      ...exports.fullFormats,
      date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
      time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
      "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
      "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
      "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    };
    exports.formatNames = Object.keys(exports.fullFormats);
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    var DATE2 = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, DAYS2 = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function date6(str) {
      let matches = DATE2.exec(str);
      if (!matches)
        return !1;
      let year = +matches[1], month = +matches[2], day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS2[month]);
    }
    function compareDate(d1, d2) {
      if (d1 && d2)
        return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
    }
    var TIME2 = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function getTime(strictTimeZone) {
      return function(str) {
        let matches = TIME2.exec(str);
        if (!matches)
          return !1;
        let hr = +matches[1], min4 = +matches[2], sec = +matches[3], tz = matches[4], tzSign = matches[5] === "-" ? -1 : 1, tzH = +(matches[6] || 0), tzM = +(matches[7] || 0);
        if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
          return !1;
        if (hr <= 23 && min4 <= 59 && sec < 60)
          return !0;
        let utcMin = min4 - tzM * tzSign, utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
        return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
      };
    }
    function compareTime(s1, s2) {
      if (!(s1 && s2))
        return;
      let t13 = (/* @__PURE__ */ new Date("2020-01-01T" + s1)).valueOf(), t22 = (/* @__PURE__ */ new Date("2020-01-01T" + s2)).valueOf();
      if (t13 && t22)
        return t13 - t22;
    }
    function compareIsoTime(t13, t22) {
      if (!(t13 && t22))
        return;
      let a1 = TIME2.exec(t13), a2 = TIME2.exec(t22);
      if (a1 && a2)
        return t13 = a1[1] + a1[2] + a1[3], t22 = a2[1] + a2[2] + a2[3], t13 > t22 ? 1 : t13 < t22 ? -1 : 0;
    }
    var DATE_TIME_SEPARATOR = /t|\s/i;
    function getDateTime(strictTimeZone) {
      let time6 = getTime(strictTimeZone);
      return function(str) {
        let dateTime = str.split(DATE_TIME_SEPARATOR);
        return dateTime.length === 2 && date6(dateTime[0]) && time6(dateTime[1]);
      };
    }
    function compareDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return;
      let d1 = new Date(dt1).valueOf(), d2 = new Date(dt2).valueOf();
      if (d1 && d2)
        return d1 - d2;
    }
    function compareIsoDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return;
      let [d1, t13] = dt1.split(DATE_TIME_SEPARATOR), [d2, t22] = dt2.split(DATE_TIME_SEPARATOR), res = compareDate(d1, d2);
      if (res !== void 0)
        return res || compareTime(t13, t22);
    }
    var NOT_URI_FRAGMENT = /\/|:/, URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function uri2(str) {
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }
    var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function byte(str) {
      return BYTE.lastIndex = 0, BYTE.test(str);
    }
    var MIN_INT32 = -(2 ** 31), MAX_INT32 = 2 ** 31 - 1;
    function validateInt32(value3) {
      return Number.isInteger(value3) && value3 <= MAX_INT32 && value3 >= MIN_INT32;
    }
    function validateInt64(value3) {
      return Number.isInteger(value3);
    }
    function validateNumber() {
      return !0;
    }
    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str))
        return !1;
      try {
        return new RegExp(str), !0;
      } catch {
        return !1;
      }
    }
  }
});

// node_modules/ajv-formats/dist/limit.js
var require_limit = __commonJS({
  "node_modules/ajv-formats/dist/limit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.formatLimitDefinition = void 0;
    var ajv_1 = require_ajv(), codegen_1 = require_codegen(), ops2 = codegen_1.operators, KWDs = {
      formatMaximum: { okStr: "<=", ok: ops2.LTE, fail: ops2.GT },
      formatMinimum: { okStr: ">=", ok: ops2.GTE, fail: ops2.LT },
      formatExclusiveMaximum: { okStr: "<", ok: ops2.LT, fail: ops2.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: ops2.GT, fail: ops2.LTE }
    }, error64 = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`should be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    exports.formatLimitDefinition = {
      keyword: Object.keys(KWDs),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: error64,
      code(cxt) {
        let { gen, data: data3, schemaCode, keyword, it } = cxt, { opts, self: self2 } = it;
        if (!opts.validateFormats)
          return;
        let fCxt = new ajv_1.KeywordCxt(it, self2.RULES.all.format.definition, "format");
        fCxt.$data ? validate$DataFormat() : validateFormat();
        function validate$DataFormat() {
          let fmts = gen.scopeValue("formats", {
            ref: self2.formats,
            code: opts.code.formats
          }), fmt = gen.const("fmt", (0, codegen_1._)`${fmts}[${fCxt.schemaCode}]`);
          cxt.fail$data((0, codegen_1.or)((0, codegen_1._)`typeof ${fmt} != "object"`, (0, codegen_1._)`${fmt} instanceof RegExp`, (0, codegen_1._)`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
        }
        function validateFormat() {
          let format5 = fCxt.schema, fmtDef = self2.formats[format5];
          if (!fmtDef || fmtDef === !0)
            return;
          if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function")
            throw new Error(`"${keyword}": format "${format5}" does not define "compare" function`);
          let fmt = gen.scopeValue("formats", {
            key: format5,
            ref: fmtDef,
            code: opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(format5)}` : void 0
          });
          cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
          return (0, codegen_1._)`${fmt}.compare(${data3}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    var formatLimitPlugin = (ajv) => (ajv.addKeyword(exports.formatLimitDefinition), ajv);
    exports.default = formatLimitPlugin;
  }
});

// node_modules/ajv-formats/dist/index.js
var require_dist = __commonJS({
  "node_modules/ajv-formats/dist/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var formats_1 = require_formats(), limit_1 = require_limit(), codegen_1 = require_codegen(), fullName = new codegen_1.Name("fullFormats"), fastName = new codegen_1.Name("fastFormats"), formatsPlugin = (ajv, opts = { keywords: !0 }) => {
      if (Array.isArray(opts))
        return addFormats(ajv, opts, formats_1.fullFormats, fullName), ajv;
      let [formats3, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName], list = opts.formats || formats_1.formatNames;
      return addFormats(ajv, list, formats3, exportName), opts.keywords && (0, limit_1.default)(ajv), ajv;
    };
    formatsPlugin.get = (name2, mode = "full") => {
      let f = (mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats)[name2];
      if (!f)
        throw new Error(`Unknown format "${name2}"`);
      return f;
    };
    function addFormats(ajv, list, fs2, exportName) {
      var _a3, _b;
      (_a3 = (_b = ajv.opts.code).formats) !== null && _a3 !== void 0 || (_b.formats = (0, codegen_1._)`require("ajv-formats/dist/formats").${exportName}`);
      for (let f of list)
        ajv.addFormat(f, fs2[f]);
    }
    module.exports = exports = formatsPlugin;
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.default = formatsPlugin;
  }
});

// node_modules/topojson-client/dist/topojson-client.js
var require_topojson_client = __commonJS({
  "node_modules/topojson-client/dist/topojson-client.js"(exports, module) {
    (function(global, factory) {
      typeof exports == "object" && typeof module < "u" ? factory(exports) : typeof define == "function" && define.amd ? define(["exports"], factory) : (global = global || self, factory(global.topojson = global.topojson || {}));
    })(exports, function(exports2) {
      "use strict";
      function identity11(x5) {
        return x5;
      }
      function transform5(transform6) {
        if (transform6 == null) return identity11;
        var x06, y06, kx = transform6.scale[0], ky = transform6.scale[1], dx = transform6.translate[0], dy = transform6.translate[1];
        return function(input2, i) {
          i || (x06 = y06 = 0);
          var j2 = 2, n = input2.length, output4 = new Array(n);
          for (output4[0] = (x06 += input2[0]) * kx + dx, output4[1] = (y06 += input2[1]) * ky + dy; j2 < n; ) output4[j2] = input2[j2], ++j2;
          return output4;
        };
      }
      function bbox(topology) {
        var t = transform5(topology.transform), key2, x06 = 1 / 0, y06 = x06, x12 = -x06, y12 = -x06;
        function bboxPoint(p) {
          p = t(p), p[0] < x06 && (x06 = p[0]), p[0] > x12 && (x12 = p[0]), p[1] < y06 && (y06 = p[1]), p[1] > y12 && (y12 = p[1]);
        }
        function bboxGeometry(o) {
          switch (o.type) {
            case "GeometryCollection":
              o.geometries.forEach(bboxGeometry);
              break;
            case "Point":
              bboxPoint(o.coordinates);
              break;
            case "MultiPoint":
              o.coordinates.forEach(bboxPoint);
              break;
          }
        }
        topology.arcs.forEach(function(arc4) {
          for (var i = -1, n = arc4.length, p; ++i < n; )
            p = t(arc4[i], i), p[0] < x06 && (x06 = p[0]), p[0] > x12 && (x12 = p[0]), p[1] < y06 && (y06 = p[1]), p[1] > y12 && (y12 = p[1]);
        });
        for (key2 in topology.objects)
          bboxGeometry(topology.objects[key2]);
        return [x06, y06, x12, y12];
      }
      function reverse3(array4, n) {
        for (var t, j2 = array4.length, i = j2 - n; i < --j2; ) t = array4[i], array4[i++] = array4[j2], array4[j2] = t;
      }
      function feature2(topology, o) {
        return typeof o == "string" && (o = topology.objects[o]), o.type === "GeometryCollection" ? { type: "FeatureCollection", features: o.geometries.map(function(o2) {
          return feature$1(topology, o2);
        }) } : feature$1(topology, o);
      }
      function feature$1(topology, o) {
        var id3 = o.id, bbox2 = o.bbox, properties = o.properties == null ? {} : o.properties, geometry = object4(topology, o);
        return id3 == null && bbox2 == null ? { type: "Feature", properties, geometry } : bbox2 == null ? { type: "Feature", id: id3, properties, geometry } : { type: "Feature", id: id3, bbox: bbox2, properties, geometry };
      }
      function object4(topology, o) {
        var transformPoint = transform5(topology.transform), arcs = topology.arcs;
        function arc4(i, points2) {
          points2.length && points2.pop();
          for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k)
            points2.push(transformPoint(a[k], k));
          i < 0 && reverse3(points2, n);
        }
        function point8(p) {
          return transformPoint(p);
        }
        function line4(arcs2) {
          for (var points2 = [], i = 0, n = arcs2.length; i < n; ++i) arc4(arcs2[i], points2);
          return points2.length < 2 && points2.push(points2[0]), points2;
        }
        function ring(arcs2) {
          for (var points2 = line4(arcs2); points2.length < 4; ) points2.push(points2[0]);
          return points2;
        }
        function polygon(arcs2) {
          return arcs2.map(ring);
        }
        function geometry(o2) {
          var type3 = o2.type, coordinates;
          switch (type3) {
            case "GeometryCollection":
              return { type: type3, geometries: o2.geometries.map(geometry) };
            case "Point":
              coordinates = point8(o2.coordinates);
              break;
            case "MultiPoint":
              coordinates = o2.coordinates.map(point8);
              break;
            case "LineString":
              coordinates = line4(o2.arcs);
              break;
            case "MultiLineString":
              coordinates = o2.arcs.map(line4);
              break;
            case "Polygon":
              coordinates = polygon(o2.arcs);
              break;
            case "MultiPolygon":
              coordinates = o2.arcs.map(polygon);
              break;
            default:
              return null;
          }
          return { type: type3, coordinates };
        }
        return geometry(o);
      }
      function stitch(topology, arcs) {
        var stitchedArcs = {}, fragmentByStart = {}, fragmentByEnd = {}, fragments = [], emptyIndex = -1;
        arcs.forEach(function(i, j2) {
          var arc4 = topology.arcs[i < 0 ? ~i : i], t;
          arc4.length < 3 && !arc4[1][0] && !arc4[1][1] && (t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j2] = t);
        }), arcs.forEach(function(i) {
          var e = ends(i), start = e[0], end = e[1], f, g;
          if (f = fragmentByEnd[start])
            if (delete fragmentByEnd[f.end], f.push(i), f.end = end, g = fragmentByStart[end]) {
              delete fragmentByStart[g.start];
              var fg = g === f ? f : f.concat(g);
              fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
            } else
              fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
          else if (f = fragmentByStart[end])
            if (delete fragmentByStart[f.start], f.unshift(i), f.start = start, g = fragmentByEnd[start]) {
              delete fragmentByEnd[g.end];
              var gf = g === f ? f : g.concat(f);
              fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
            } else
              fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
          else
            f = [i], fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
        });
        function ends(i) {
          var arc4 = topology.arcs[i < 0 ? ~i : i], p02 = arc4[0], p1;
          return topology.transform ? (p1 = [0, 0], arc4.forEach(function(dp) {
            p1[0] += dp[0], p1[1] += dp[1];
          })) : p1 = arc4[arc4.length - 1], i < 0 ? [p1, p02] : [p02, p1];
        }
        function flush(fragmentByEnd2, fragmentByStart2) {
          for (var k in fragmentByEnd2) {
            var f = fragmentByEnd2[k];
            delete fragmentByStart2[f.start], delete f.start, delete f.end, f.forEach(function(i) {
              stitchedArcs[i < 0 ? ~i : i] = 1;
            }), fragments.push(f);
          }
        }
        return flush(fragmentByEnd, fragmentByStart), flush(fragmentByStart, fragmentByEnd), arcs.forEach(function(i) {
          stitchedArcs[i < 0 ? ~i : i] || fragments.push([i]);
        }), fragments;
      }
      function mesh2(topology) {
        return object4(topology, meshArcs.apply(this, arguments));
      }
      function meshArcs(topology, object5, filter3) {
        var arcs, i, n;
        if (arguments.length > 1) arcs = extractArcs(topology, object5, filter3);
        else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
        return { type: "MultiLineString", arcs: stitch(topology, arcs) };
      }
      function extractArcs(topology, object5, filter3) {
        var arcs = [], geomsByArc = [], geom;
        function extract0(i) {
          var j2 = i < 0 ? ~i : i;
          (geomsByArc[j2] || (geomsByArc[j2] = [])).push({ i, g: geom });
        }
        function extract1(arcs2) {
          arcs2.forEach(extract0);
        }
        function extract2(arcs2) {
          arcs2.forEach(extract1);
        }
        function extract3(arcs2) {
          arcs2.forEach(extract2);
        }
        function geometry(o) {
          switch (geom = o, o.type) {
            case "GeometryCollection":
              o.geometries.forEach(geometry);
              break;
            case "LineString":
              extract1(o.arcs);
              break;
            case "MultiLineString":
            case "Polygon":
              extract2(o.arcs);
              break;
            case "MultiPolygon":
              extract3(o.arcs);
              break;
          }
        }
        return geometry(object5), geomsByArc.forEach(filter3 == null ? function(geoms) {
          arcs.push(geoms[0].i);
        } : function(geoms) {
          filter3(geoms[0].g, geoms[geoms.length - 1].g) && arcs.push(geoms[0].i);
        }), arcs;
      }
      function planarRingArea(ring) {
        for (var i = -1, n = ring.length, a, b10 = ring[n - 1], area4 = 0; ++i < n; ) a = b10, b10 = ring[i], area4 += a[0] * b10[1] - a[1] * b10[0];
        return Math.abs(area4);
      }
      function merge7(topology) {
        return object4(topology, mergeArcs.apply(this, arguments));
      }
      function mergeArcs(topology, objects) {
        var polygonsByArc = {}, polygons = [], groups = [];
        objects.forEach(geometry);
        function geometry(o) {
          switch (o.type) {
            case "GeometryCollection":
              o.geometries.forEach(geometry);
              break;
            case "Polygon":
              extract(o.arcs);
              break;
            case "MultiPolygon":
              o.arcs.forEach(extract);
              break;
          }
        }
        function extract(polygon) {
          polygon.forEach(function(ring) {
            ring.forEach(function(arc4) {
              (polygonsByArc[arc4 = arc4 < 0 ? ~arc4 : arc4] || (polygonsByArc[arc4] = [])).push(polygon);
            });
          }), polygons.push(polygon);
        }
        function area4(ring) {
          return planarRingArea(object4(topology, { type: "Polygon", arcs: [ring] }).coordinates[0]);
        }
        return polygons.forEach(function(polygon) {
          if (!polygon._) {
            var group2 = [], neighbors2 = [polygon];
            for (polygon._ = 1, groups.push(group2); polygon = neighbors2.pop(); )
              group2.push(polygon), polygon.forEach(function(ring) {
                ring.forEach(function(arc4) {
                  polygonsByArc[arc4 < 0 ? ~arc4 : arc4].forEach(function(polygon2) {
                    polygon2._ || (polygon2._ = 1, neighbors2.push(polygon2));
                  });
                });
              });
          }
        }), polygons.forEach(function(polygon) {
          delete polygon._;
        }), {
          type: "MultiPolygon",
          arcs: groups.map(function(polygons2) {
            var arcs = [], n;
            if (polygons2.forEach(function(polygon) {
              polygon.forEach(function(ring) {
                ring.forEach(function(arc4) {
                  polygonsByArc[arc4 < 0 ? ~arc4 : arc4].length < 2 && arcs.push(arc4);
                });
              });
            }), arcs = stitch(topology, arcs), (n = arcs.length) > 1)
              for (var i = 1, k = area4(arcs[0]), ki, t; i < n; ++i)
                (ki = area4(arcs[i])) > k && (t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki);
            return arcs;
          }).filter(function(arcs) {
            return arcs.length > 0;
          })
        };
      }
      function bisect2(a, x5) {
        for (var lo = 0, hi = a.length; lo < hi; ) {
          var mid = lo + hi >>> 1;
          a[mid] < x5 ? lo = mid + 1 : hi = mid;
        }
        return lo;
      }
      function neighbors(objects) {
        var indexesByArc = {}, neighbors2 = objects.map(function() {
          return [];
        });
        function line4(arcs, i2) {
          arcs.forEach(function(a) {
            a < 0 && (a = ~a);
            var o = indexesByArc[a];
            o ? o.push(i2) : indexesByArc[a] = [i2];
          });
        }
        function polygon(arcs, i2) {
          arcs.forEach(function(arc4) {
            line4(arc4, i2);
          });
        }
        function geometry(o, i2) {
          o.type === "GeometryCollection" ? o.geometries.forEach(function(o2) {
            geometry(o2, i2);
          }) : o.type in geometryType && geometryType[o.type](o.arcs, i2);
        }
        var geometryType = {
          LineString: line4,
          MultiLineString: polygon,
          Polygon: polygon,
          MultiPolygon: function(arcs, i2) {
            arcs.forEach(function(arc4) {
              polygon(arc4, i2);
            });
          }
        };
        objects.forEach(geometry);
        for (var i in indexesByArc)
          for (var indexes = indexesByArc[i], m = indexes.length, j2 = 0; j2 < m; ++j2)
            for (var k = j2 + 1; k < m; ++k) {
              var ij = indexes[j2], ik = indexes[k], n;
              (n = neighbors2[ij])[i = bisect2(n, ik)] !== ik && n.splice(i, 0, ik), (n = neighbors2[ik])[i = bisect2(n, ij)] !== ij && n.splice(i, 0, ij);
            }
        return neighbors2;
      }
      function untransform(transform6) {
        if (transform6 == null) return identity11;
        var x06, y06, kx = transform6.scale[0], ky = transform6.scale[1], dx = transform6.translate[0], dy = transform6.translate[1];
        return function(input2, i) {
          i || (x06 = y06 = 0);
          var j2 = 2, n = input2.length, output4 = new Array(n), x12 = Math.round((input2[0] - dx) / kx), y12 = Math.round((input2[1] - dy) / ky);
          for (output4[0] = x12 - x06, x06 = x12, output4[1] = y12 - y06, y06 = y12; j2 < n; ) output4[j2] = input2[j2], ++j2;
          return output4;
        };
      }
      function quantize3(topology, transform6) {
        if (topology.transform) throw new Error("already quantized");
        if (!transform6 || !transform6.scale) {
          if (!((n = Math.floor(transform6)) >= 2)) throw new Error("n must be \u22652");
          box = topology.bbox || bbox(topology);
          var x06 = box[0], y06 = box[1], x12 = box[2], y12 = box[3], n;
          transform6 = { scale: [x12 - x06 ? (x12 - x06) / (n - 1) : 1, y12 - y06 ? (y12 - y06) / (n - 1) : 1], translate: [x06, y06] };
        } else
          box = topology.bbox;
        var t = untransform(transform6), box, key2, inputs = topology.objects, outputs = {};
        function quantizePoint(point8) {
          return t(point8);
        }
        function quantizeGeometry(input2) {
          var output4;
          switch (input2.type) {
            case "GeometryCollection":
              output4 = { type: "GeometryCollection", geometries: input2.geometries.map(quantizeGeometry) };
              break;
            case "Point":
              output4 = { type: "Point", coordinates: quantizePoint(input2.coordinates) };
              break;
            case "MultiPoint":
              output4 = { type: "MultiPoint", coordinates: input2.coordinates.map(quantizePoint) };
              break;
            default:
              return input2;
          }
          return input2.id != null && (output4.id = input2.id), input2.bbox != null && (output4.bbox = input2.bbox), input2.properties != null && (output4.properties = input2.properties), output4;
        }
        function quantizeArc(input2) {
          var i = 0, j2 = 1, n2 = input2.length, p, output4 = new Array(n2);
          for (output4[0] = t(input2[0], 0); ++i < n2; ) ((p = t(input2[i], i))[0] || p[1]) && (output4[j2++] = p);
          return j2 === 1 && (output4[j2++] = [0, 0]), output4.length = j2, output4;
        }
        for (key2 in inputs) outputs[key2] = quantizeGeometry(inputs[key2]);
        return {
          type: "Topology",
          bbox: box,
          transform: transform6,
          objects: outputs,
          arcs: topology.arcs.map(quantizeArc)
        };
      }
      exports2.bbox = bbox, exports2.feature = feature2, exports2.merge = merge7, exports2.mergeArcs = mergeArcs, exports2.mesh = mesh2, exports2.meshArcs = meshArcs, exports2.neighbors = neighbors, exports2.quantize = quantize3, exports2.transform = transform5, exports2.untransform = untransform, Object.defineProperty(exports2, "__esModule", { value: !0 });
    });
  }
});

// plugin-server.mjs
import { readFile as readFile7, lstat as lstat8, realpath as realpath7 } from "node:fs/promises";
import { resolve as resolve8, basename as basename7, join as join15, dirname as dirname6 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs2(_arg) {
  }
  util2.assertIs = assertIs2;
  function assertNever2(_x3) {
    throw new Error();
  }
  util2.assertNever = assertNever2, util2.arrayToEnum = (items) => {
    let obj = {};
    for (let item of items)
      obj[item] = item;
    return obj;
  }, util2.getValidEnumValues = (obj) => {
    let validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] != "number"), filtered = {};
    for (let k of validKeys)
      filtered[k] = obj[k];
    return util2.objectValues(filtered);
  }, util2.objectValues = (obj) => util2.objectKeys(obj).map(function(e) {
    return obj[e];
  }), util2.objectKeys = typeof Object.keys == "function" ? (obj) => Object.keys(obj) : (object4) => {
    let keys4 = [];
    for (let key2 in object4)
      Object.prototype.hasOwnProperty.call(object4, key2) && keys4.push(key2);
    return keys4;
  }, util2.find = (arr, checker) => {
    for (let item of arr)
      if (checker(item))
        return item;
  }, util2.isInteger = typeof Number.isInteger == "function" ? (val) => Number.isInteger(val) : (val) => typeof val == "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues2(array4, separator = " | ") {
    return array4.map((val) => typeof val == "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues2, util2.jsonStringifyReplacer = (_, value3) => typeof value3 == "bigint" ? value3.toString() : value3;
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second2) => ({
    ...first,
    ...second2
    // second overwrites first
  });
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), getParsedType = (data3) => {
  switch (typeof data3) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data3) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      return Array.isArray(data3) ? ZodParsedType.array : data3 === null ? ZodParsedType.null : data3.then && typeof data3.then == "function" && data3.catch && typeof data3.catch == "function" ? ZodParsedType.promise : typeof Map < "u" && data3 instanceof Map ? ZodParsedType.map : typeof Set < "u" && data3 instanceof Set ? ZodParsedType.set : typeof Date < "u" && data3 instanceof Date ? ZodParsedType.date : ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super(), this.issues = [], this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    }, this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    let actualProto = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, actualProto) : this.__proto__ = actualProto, this.name = "ZodError", this.issues = issues;
  }
  format(_mapper) {
    let mapper = _mapper || function(issue2) {
      return issue2.message;
    }, fieldErrors = { _errors: [] }, processError = (error64) => {
      for (let issue2 of error64.issues)
        if (issue2.code === "invalid_union")
          issue2.unionErrors.map(processError);
        else if (issue2.code === "invalid_return_type")
          processError(issue2.returnTypeError);
        else if (issue2.code === "invalid_arguments")
          processError(issue2.argumentsError);
        else if (issue2.path.length === 0)
          fieldErrors._errors.push(mapper(issue2));
        else {
          let curr = fieldErrors, i = 0;
          for (; i < issue2.path.length; ) {
            let el = issue2.path[i], terminal = i === issue2.path.length - 1;
            if (el === "_errors") {
              terminal && curr._errors.push(mapper(issue2)), i++;
              continue;
            }
            Object.prototype.hasOwnProperty.call(curr, el) || (el === "__proto__" ? Object.defineProperty(curr, el, {
              value: { _errors: [] },
              writable: !0,
              enumerable: !0,
              configurable: !0
            }) : curr[el] = { _errors: [] }), curr = curr[el], terminal && curr._errors.push(mapper(issue2)), i++;
          }
        }
    };
    return processError(this), fieldErrors;
  }
  static assert(value3) {
    if (!(value3 instanceof _ZodError))
      throw new Error(`Not a ZodError: ${value3}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue2) => issue2.message) {
    let fieldErrors = /* @__PURE__ */ Object.create(null), formErrors = [];
    for (let sub of this.issues)
      if (sub.path.length > 0) {
        let firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [], fieldErrors[firstEl].push(mapper(sub));
      } else
        formErrors.push(mapper(sub));
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => new ZodError(issues);

// node_modules/zod/v3/locales/en.js
var errorMap = (issue2, _ctx) => {
  let message;
  switch (issue2.code) {
    case ZodIssueCode.invalid_type:
      issue2.received === ZodParsedType.undefined ? message = "Required" : message = `Expected ${issue2.expected}, received ${issue2.received}`;
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue2.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue2.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = "Invalid input";
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue2.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue2.options)}, received '${issue2.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = "Invalid function arguments";
      break;
    case ZodIssueCode.invalid_return_type:
      message = "Invalid function return type";
      break;
    case ZodIssueCode.invalid_date:
      message = "Invalid date";
      break;
    case ZodIssueCode.invalid_string:
      typeof issue2.validation == "object" ? "includes" in issue2.validation ? (message = `Invalid input: must include "${issue2.validation.includes}"`, typeof issue2.validation.position == "number" && (message = `${message} at one or more positions greater than or equal to ${issue2.validation.position}`)) : "startsWith" in issue2.validation ? message = `Invalid input: must start with "${issue2.validation.startsWith}"` : "endsWith" in issue2.validation ? message = `Invalid input: must end with "${issue2.validation.endsWith}"` : util.assertNever(issue2.validation) : issue2.validation !== "regex" ? message = `Invalid ${issue2.validation}` : message = "Invalid";
      break;
    case ZodIssueCode.too_small:
      issue2.type === "array" ? message = `Array must contain ${issue2.exact ? "exactly" : issue2.inclusive ? "at least" : "more than"} ${issue2.minimum} element(s)` : issue2.type === "string" ? message = `String must contain ${issue2.exact ? "exactly" : issue2.inclusive ? "at least" : "over"} ${issue2.minimum} character(s)` : issue2.type === "number" ? message = `Number must be ${issue2.exact ? "exactly equal to " : issue2.inclusive ? "greater than or equal to " : "greater than "}${issue2.minimum}` : issue2.type === "bigint" ? message = `Number must be ${issue2.exact ? "exactly equal to " : issue2.inclusive ? "greater than or equal to " : "greater than "}${issue2.minimum}` : issue2.type === "date" ? message = `Date must be ${issue2.exact ? "exactly equal to " : issue2.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(issue2.minimum))}` : message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      issue2.type === "array" ? message = `Array must contain ${issue2.exact ? "exactly" : issue2.inclusive ? "at most" : "less than"} ${issue2.maximum} element(s)` : issue2.type === "string" ? message = `String must contain ${issue2.exact ? "exactly" : issue2.inclusive ? "at most" : "under"} ${issue2.maximum} character(s)` : issue2.type === "number" ? message = `Number must be ${issue2.exact ? "exactly" : issue2.inclusive ? "less than or equal to" : "less than"} ${issue2.maximum}` : issue2.type === "bigint" ? message = `BigInt must be ${issue2.exact ? "exactly" : issue2.inclusive ? "less than or equal to" : "less than"} ${issue2.maximum}` : issue2.type === "date" ? message = `Date must be ${issue2.exact ? "exactly" : issue2.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(issue2.maximum))}` : message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = "Invalid input";
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = "Intersection results could not be merged";
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue2.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError, util.assertNever(issue2);
  }
  return { message };
}, en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params2) => {
  let { data: data3, path: path3, errorMaps, issueData } = params2, fullPath = [...path3, ...issueData.path || []], fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0)
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  let errorMessage = "", maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (let map4 of maps)
    errorMessage = map4(fullIssue, { data: data3, defaultError: errorMessage }).message;
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
function addIssueToContext(ctx, issueData) {
  let overrideMap = getErrorMap(), issue2 = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x5) => !!x5)
  });
  ctx.common.issues.push(issue2);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(status, results) {
    let arrayValue = [];
    for (let s of results) {
      if (s.status === "aborted")
        return INVALID;
      s.status === "dirty" && status.dirty(), arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    let syncPairs = [];
    for (let pair of pairs) {
      let key2 = await pair.key, value3 = await pair.value;
      syncPairs.push({
        key: key2,
        value: value3
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    let finalObject = {};
    for (let pair of pairs) {
      let { key: key2, value: value3 } = pair;
      if (key2.status === "aborted" || value3.status === "aborted")
        return INVALID;
      key2.status === "dirty" && status.dirty(), value3.status === "dirty" && status.dirty(), key2.value !== "__proto__" && (typeof value3.value < "u" || pair.alwaysSet) && (finalObject[key2.value] = value3.value);
    }
    return { status: status.value, value: finalObject };
  }
}, INVALID = Object.freeze({
  status: "aborted"
}), DIRTY = (value3) => ({ status: "dirty", value: value3 }), OK = (value3) => ({ status: "valid", value: value3 }), isAborted = (x5) => x5.status === "aborted", isDirty = (x5) => x5.status === "dirty", isValid = (x5) => x5.status === "valid", isAsync = (x5) => typeof Promise < "u" && x5 instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message == "string" ? { message } : message || {}, errorUtil2.toString = (message) => typeof message == "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value3, path3, key2) {
    this._cachedPath = [], this.parent = parent, this.data = value3, this._path = path3, this._key = key2;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}, handleResult = (ctx, result) => {
  if (isValid(result))
    return { success: !0, data: result.value };
  if (!ctx.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      let error64 = new ZodError(ctx.common.issues);
      return this._error = error64, this._error;
    }
  };
};
function processCreateParams(params2) {
  if (!params2)
    return {};
  let { errorMap: errorMap2, invalid_type_error, required_error, description: description2 } = params2;
  if (errorMap2 && (invalid_type_error || required_error))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return errorMap2 ? { errorMap: errorMap2, description: description2 } : { errorMap: (iss, ctx) => {
    let { message } = params2;
    return iss.code === "invalid_enum_value" ? { message: message ?? ctx.defaultError } : typeof ctx.data > "u" ? { message: message ?? required_error ?? ctx.defaultError } : iss.code !== "invalid_type" ? { message: ctx.defaultError } : { message: message ?? invalid_type_error ?? ctx.defaultError };
  }, description: description2 };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input2) {
    return getParsedType(input2.data);
  }
  _getOrReturnCtx(input2, ctx) {
    return ctx || {
      common: input2.parent.common,
      data: input2.data,
      parsedType: getParsedType(input2.data),
      schemaErrorMap: this._def.errorMap,
      path: input2.path,
      parent: input2.parent
    };
  }
  _processInputParams(input2) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input2.parent.common,
        data: input2.data,
        parsedType: getParsedType(input2.data),
        schemaErrorMap: this._def.errorMap,
        path: input2.path,
        parent: input2.parent
      }
    };
  }
  _parseSync(input2) {
    let result = this._parse(input2);
    if (isAsync(result))
      throw new Error("Synchronous parse encountered promise.");
    return result;
  }
  _parseAsync(input2) {
    let result = this._parse(input2);
    return Promise.resolve(result);
  }
  parse(data3, params2) {
    let result = this.safeParse(data3, params2);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data3, params2) {
    let ctx = {
      common: {
        issues: [],
        async: params2?.async ?? !1,
        contextualErrorMap: params2?.errorMap
      },
      path: params2?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data3,
      parsedType: getParsedType(data3)
    }, result = this._parseSync({ data: data3, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data3) {
    let ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data3,
      parsedType: getParsedType(data3)
    };
    if (!this["~standard"].async)
      try {
        let result = this._parseSync({ data: data3, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        err?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), ctx.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: data3, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data3, params2) {
    let result = await this.safeParseAsync(data3, params2);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data3, params2) {
    let ctx = {
      common: {
        issues: [],
        contextualErrorMap: params2?.errorMap,
        async: !0
      },
      path: params2?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: data3,
      parsedType: getParsedType(data3)
    }, maybeAsyncResult = this._parse({ data: data3, path: ctx.path, parent: ctx }), result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check2, message) {
    let getIssueProperties = (val) => typeof message == "string" || typeof message > "u" ? { message } : typeof message == "function" ? message(val) : message;
    return this._refinement((val, ctx) => {
      let result = check2(val), setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      return typeof Promise < "u" && result instanceof Promise ? result.then((data3) => data3 ? !0 : (setError(), !1)) : result ? !0 : (setError(), !1);
    });
  }
  refinement(check2, refinementData) {
    return this._refinement((val, ctx) => check2(val) ? !0 : (ctx.addIssue(typeof refinementData == "function" ? refinementData(val, ctx) : refinementData), !1));
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def2) {
    this.spa = this.safeParseAsync, this._def = def2, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data3) => this["~validate"](data3)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform5) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform: transform5 }
    });
  }
  default(def2) {
    let defaultValueFunc = typeof def2 == "function" ? def2 : () => def2;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def2) {
    let catchValueFunc = typeof def2 == "function" ? def2 : () => def2;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description2) {
    let This = this.constructor;
    return new This({
      ...this._def,
      description: description2
    });
  }
  pipe(target3) {
    return ZodPipeline.create(this, target3);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}, cuidRegex = /^c[^\s-]{8,}$/i, cuid2Regex = /^[0-9a-z]+$/, ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i, uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, nanoidRegex = /^[a-z0-9_-]{21}$/i, jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, _emojiRegex = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", emojiRegex, ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, dateRegexSource = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = "[0-5]\\d";
  args.precision ? secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}` : args.precision == null && (secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`);
  let secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`, opts = [];
  return opts.push(args.local ? "Z?" : "Z"), args.offset && opts.push("([+-]\\d{2}:?\\d{2})"), regex = `${regex}(${opts.join("|")})`, new RegExp(`^${regex}$`);
}
function isValidIP(ip, version3) {
  return !!((version3 === "v4" || !version3) && ipv4Regex.test(ip) || (version3 === "v6" || !version3) && ipv6Regex.test(ip));
}
function isValidJWT(jwt2, alg) {
  if (!jwtRegex.test(jwt2))
    return !1;
  try {
    let [header] = jwt2.split(".");
    if (!header)
      return !1;
    let base643 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "="), decoded = JSON.parse(atob(base643));
    return !(typeof decoded != "object" || decoded === null || "typ" in decoded && decoded?.typ !== "JWT" || !decoded.alg || alg && decoded.alg !== alg);
  } catch {
    return !1;
  }
}
function isValidCidr(ip, version3) {
  return !!((version3 === "v4" || !version3) && ipv4CidrRegex.test(ip) || (version3 === "v6" || !version3) && ipv6CidrRegex.test(ip));
}
var ZodString = class _ZodString2 extends ZodType {
  _parse(input2) {
    if (this._def.coerce && (input2.data = String(input2.data)), this._getType(input2) !== ZodParsedType.string) {
      let ctx2 = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      }), INVALID;
    }
    let status = new ParseStatus(), ctx;
    for (let check2 of this._def.checks)
      if (check2.kind === "min")
        input2.data.length < check2.value && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: check2.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "max")
        input2.data.length > check2.value && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: check2.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "length") {
        let tooBig = input2.data.length > check2.value, tooSmall = input2.data.length < check2.value;
        (tooBig || tooSmall) && (ctx = this._getOrReturnCtx(input2, ctx), tooBig ? addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: check2.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: check2.message
        }) : tooSmall && addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: check2.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: check2.message
        }), status.dirty());
      } else if (check2.kind === "email")
        emailRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          validation: "email",
          code: ZodIssueCode.invalid_string,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "emoji")
        emojiRegex || (emojiRegex = new RegExp(_emojiRegex, "u")), emojiRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          validation: "emoji",
          code: ZodIssueCode.invalid_string,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "uuid")
        uuidRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          validation: "uuid",
          code: ZodIssueCode.invalid_string,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "nanoid")
        nanoidRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          validation: "nanoid",
          code: ZodIssueCode.invalid_string,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "cuid")
        cuidRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          validation: "cuid",
          code: ZodIssueCode.invalid_string,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "cuid2")
        cuid2Regex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          validation: "cuid2",
          code: ZodIssueCode.invalid_string,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "ulid")
        ulidRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
          validation: "ulid",
          code: ZodIssueCode.invalid_string,
          message: check2.message
        }), status.dirty());
      else if (check2.kind === "url")
        try {
          new URL(input2.data);
        } catch {
          ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check2.message
          }), status.dirty();
        }
      else check2.kind === "regex" ? (check2.regex.lastIndex = 0, check2.regex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        validation: "regex",
        code: ZodIssueCode.invalid_string,
        message: check2.message
      }), status.dirty())) : check2.kind === "trim" ? input2.data = input2.data.trim() : check2.kind === "includes" ? input2.data.includes(check2.value, check2.position) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: { includes: check2.value, position: check2.position },
        message: check2.message
      }), status.dirty()) : check2.kind === "toLowerCase" ? input2.data = input2.data.toLowerCase() : check2.kind === "toUpperCase" ? input2.data = input2.data.toUpperCase() : check2.kind === "startsWith" ? input2.data.startsWith(check2.value) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: { startsWith: check2.value },
        message: check2.message
      }), status.dirty()) : check2.kind === "endsWith" ? input2.data.endsWith(check2.value) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: { endsWith: check2.value },
        message: check2.message
      }), status.dirty()) : check2.kind === "datetime" ? datetimeRegex(check2).test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: "datetime",
        message: check2.message
      }), status.dirty()) : check2.kind === "date" ? dateRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: "date",
        message: check2.message
      }), status.dirty()) : check2.kind === "time" ? timeRegex(check2).test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_string,
        validation: "time",
        message: check2.message
      }), status.dirty()) : check2.kind === "duration" ? durationRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        validation: "duration",
        code: ZodIssueCode.invalid_string,
        message: check2.message
      }), status.dirty()) : check2.kind === "ip" ? isValidIP(input2.data, check2.version) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        validation: "ip",
        code: ZodIssueCode.invalid_string,
        message: check2.message
      }), status.dirty()) : check2.kind === "jwt" ? isValidJWT(input2.data, check2.alg) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        validation: "jwt",
        code: ZodIssueCode.invalid_string,
        message: check2.message
      }), status.dirty()) : check2.kind === "cidr" ? isValidCidr(input2.data, check2.version) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        validation: "cidr",
        code: ZodIssueCode.invalid_string,
        message: check2.message
      }), status.dirty()) : check2.kind === "base64" ? base64Regex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        validation: "base64",
        code: ZodIssueCode.invalid_string,
        message: check2.message
      }), status.dirty()) : check2.kind === "base64url" ? base64urlRegex.test(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        validation: "base64url",
        code: ZodIssueCode.invalid_string,
        message: check2.message
      }), status.dirty()) : util.assertNever(check2);
    return { status: status.value, value: input2.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data3) => regex.test(data3), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check2) {
    return new _ZodString2({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    return typeof options == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: options
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision > "u" ? null : options?.precision,
      offset: options?.offset ?? !1,
      local: options?.local ?? !1,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    return typeof options == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: options
    }) : this._addCheck({
      kind: "time",
      precision: typeof options?.precision > "u" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value3, options) {
    return this._addCheck({
      kind: "includes",
      value: value3,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value3, message) {
    return this._addCheck({
      kind: "startsWith",
      value: value3,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value3, message) {
    return this._addCheck({
      kind: "endsWith",
      value: value3,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString2({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString2({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString2({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch2) => ch2.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch2) => ch2.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch2) => ch2.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch2) => ch2.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch2) => ch2.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch2) => ch2.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch2) => ch2.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch2) => ch2.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch2) => ch2.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch2) => ch2.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch2) => ch2.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch2) => ch2.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch2) => ch2.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch2) => ch2.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch2) => ch2.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch2) => ch2.kind === "base64url");
  }
  get minLength() {
    let min4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "min" && (min4 === null || ch2.value > min4) && (min4 = ch2.value);
    return min4;
  }
  get maxLength() {
    let max4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "max" && (max4 === null || ch2.value < max4) && (max4 = ch2.value);
    return max4;
  }
};
ZodString.create = (params2) => new ZodString({
  checks: [],
  typeName: ZodFirstPartyTypeKind.ZodString,
  coerce: params2?.coerce ?? !1,
  ...processCreateParams(params2)
});
function floatSafeRemainder(val, step) {
  let valDecCount = (val.toString().split(".")[1] || "").length, stepDecCount = (step.toString().split(".")[1] || "").length, decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount, valInt = Number.parseInt(val.toFixed(decCount).replace(".", "")), stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(input2) {
    if (this._def.coerce && (input2.data = Number(input2.data)), this._getType(input2) !== ZodParsedType.number) {
      let ctx2 = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      }), INVALID;
    }
    let ctx, status = new ParseStatus();
    for (let check2 of this._def.checks)
      check2.kind === "int" ? util.isInteger(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: "integer",
        received: "float",
        message: check2.message
      }), status.dirty()) : check2.kind === "min" ? (check2.inclusive ? input2.data < check2.value : input2.data <= check2.value) && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: check2.value,
        type: "number",
        inclusive: check2.inclusive,
        exact: !1,
        message: check2.message
      }), status.dirty()) : check2.kind === "max" ? (check2.inclusive ? input2.data > check2.value : input2.data >= check2.value) && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: check2.value,
        type: "number",
        inclusive: check2.inclusive,
        exact: !1,
        message: check2.message
      }), status.dirty()) : check2.kind === "multipleOf" ? floatSafeRemainder(input2.data, check2.value) !== 0 && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.not_multiple_of,
        multipleOf: check2.value,
        message: check2.message
      }), status.dirty()) : check2.kind === "finite" ? Number.isFinite(input2.data) || (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.not_finite,
        message: check2.message
      }), status.dirty()) : util.assertNever(check2);
    return { status: status.value, value: input2.data };
  }
  gte(value3, message) {
    return this.setLimit("min", value3, !0, errorUtil.toString(message));
  }
  gt(value3, message) {
    return this.setLimit("min", value3, !1, errorUtil.toString(message));
  }
  lte(value3, message) {
    return this.setLimit("max", value3, !0, errorUtil.toString(message));
  }
  lt(value3, message) {
    return this.setLimit("max", value3, !1, errorUtil.toString(message));
  }
  setLimit(kind, value3, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value: value3,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value3, message) {
    return this._addCheck({
      kind: "multipleOf",
      value: value3,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "min" && (min4 === null || ch2.value > min4) && (min4 = ch2.value);
    return min4;
  }
  get maxValue() {
    let max4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "max" && (max4 === null || ch2.value < max4) && (max4 = ch2.value);
    return max4;
  }
  get isInt() {
    return !!this._def.checks.find((ch2) => ch2.kind === "int" || ch2.kind === "multipleOf" && util.isInteger(ch2.value));
  }
  get isFinite() {
    let max4 = null, min4 = null;
    for (let ch2 of this._def.checks) {
      if (ch2.kind === "finite" || ch2.kind === "int" || ch2.kind === "multipleOf")
        return !0;
      ch2.kind === "min" ? (min4 === null || ch2.value > min4) && (min4 = ch2.value) : ch2.kind === "max" && (max4 === null || ch2.value < max4) && (max4 = ch2.value);
    }
    return Number.isFinite(min4) && Number.isFinite(max4);
  }
};
ZodNumber.create = (params2) => new ZodNumber({
  checks: [],
  typeName: ZodFirstPartyTypeKind.ZodNumber,
  coerce: params2?.coerce || !1,
  ...processCreateParams(params2)
});
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(input2) {
    if (this._def.coerce)
      try {
        input2.data = BigInt(input2.data);
      } catch {
        return this._getInvalidInput(input2);
      }
    if (this._getType(input2) !== ZodParsedType.bigint)
      return this._getInvalidInput(input2);
    let ctx, status = new ParseStatus();
    for (let check2 of this._def.checks)
      check2.kind === "min" ? (check2.inclusive ? input2.data < check2.value : input2.data <= check2.value) && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        type: "bigint",
        minimum: check2.value,
        inclusive: check2.inclusive,
        message: check2.message
      }), status.dirty()) : check2.kind === "max" ? (check2.inclusive ? input2.data > check2.value : input2.data >= check2.value) && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        type: "bigint",
        maximum: check2.value,
        inclusive: check2.inclusive,
        message: check2.message
      }), status.dirty()) : check2.kind === "multipleOf" ? input2.data % check2.value !== BigInt(0) && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.not_multiple_of,
        multipleOf: check2.value,
        message: check2.message
      }), status.dirty()) : util.assertNever(check2);
    return { status: status.value, value: input2.data };
  }
  _getInvalidInput(input2) {
    let ctx = this._getOrReturnCtx(input2);
    return addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    }), INVALID;
  }
  gte(value3, message) {
    return this.setLimit("min", value3, !0, errorUtil.toString(message));
  }
  gt(value3, message) {
    return this.setLimit("min", value3, !1, errorUtil.toString(message));
  }
  lte(value3, message) {
    return this.setLimit("max", value3, !0, errorUtil.toString(message));
  }
  lt(value3, message) {
    return this.setLimit("max", value3, !1, errorUtil.toString(message));
  }
  setLimit(kind, value3, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value: value3,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check2) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value3, message) {
    return this._addCheck({
      kind: "multipleOf",
      value: value3,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "min" && (min4 === null || ch2.value > min4) && (min4 = ch2.value);
    return min4;
  }
  get maxValue() {
    let max4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "max" && (max4 === null || ch2.value < max4) && (max4 = ch2.value);
    return max4;
  }
};
ZodBigInt.create = (params2) => new ZodBigInt({
  checks: [],
  typeName: ZodFirstPartyTypeKind.ZodBigInt,
  coerce: params2?.coerce ?? !1,
  ...processCreateParams(params2)
});
var ZodBoolean = class extends ZodType {
  _parse(input2) {
    if (this._def.coerce && (input2.data = !!input2.data), this._getType(input2) !== ZodParsedType.boolean) {
      let ctx = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input2.data);
  }
};
ZodBoolean.create = (params2) => new ZodBoolean({
  typeName: ZodFirstPartyTypeKind.ZodBoolean,
  coerce: params2?.coerce || !1,
  ...processCreateParams(params2)
});
var ZodDate = class _ZodDate extends ZodType {
  _parse(input2) {
    if (this._def.coerce && (input2.data = new Date(input2.data)), this._getType(input2) !== ZodParsedType.date) {
      let ctx2 = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      }), INVALID;
    }
    if (Number.isNaN(input2.data.getTime())) {
      let ctx2 = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      }), INVALID;
    }
    let status = new ParseStatus(), ctx;
    for (let check2 of this._def.checks)
      check2.kind === "min" ? input2.data.getTime() < check2.value && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        message: check2.message,
        inclusive: !0,
        exact: !1,
        minimum: check2.value,
        type: "date"
      }), status.dirty()) : check2.kind === "max" ? input2.data.getTime() > check2.value && (ctx = this._getOrReturnCtx(input2, ctx), addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        message: check2.message,
        inclusive: !0,
        exact: !1,
        maximum: check2.value,
        type: "date"
      }), status.dirty()) : util.assertNever(check2);
    return {
      status: status.value,
      value: new Date(input2.data.getTime())
    };
  }
  _addCheck(check2) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check2]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "min" && (min4 === null || ch2.value > min4) && (min4 = ch2.value);
    return min4 != null ? new Date(min4) : null;
  }
  get maxDate() {
    let max4 = null;
    for (let ch2 of this._def.checks)
      ch2.kind === "max" && (max4 === null || ch2.value < max4) && (max4 = ch2.value);
    return max4 != null ? new Date(max4) : null;
  }
};
ZodDate.create = (params2) => new ZodDate({
  checks: [],
  coerce: params2?.coerce || !1,
  typeName: ZodFirstPartyTypeKind.ZodDate,
  ...processCreateParams(params2)
});
var ZodSymbol = class extends ZodType {
  _parse(input2) {
    if (this._getType(input2) !== ZodParsedType.symbol) {
      let ctx = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input2.data);
  }
};
ZodSymbol.create = (params2) => new ZodSymbol({
  typeName: ZodFirstPartyTypeKind.ZodSymbol,
  ...processCreateParams(params2)
});
var ZodUndefined = class extends ZodType {
  _parse(input2) {
    if (this._getType(input2) !== ZodParsedType.undefined) {
      let ctx = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input2.data);
  }
};
ZodUndefined.create = (params2) => new ZodUndefined({
  typeName: ZodFirstPartyTypeKind.ZodUndefined,
  ...processCreateParams(params2)
});
var ZodNull = class extends ZodType {
  _parse(input2) {
    if (this._getType(input2) !== ZodParsedType.null) {
      let ctx = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input2.data);
  }
};
ZodNull.create = (params2) => new ZodNull({
  typeName: ZodFirstPartyTypeKind.ZodNull,
  ...processCreateParams(params2)
});
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(input2) {
    return OK(input2.data);
  }
};
ZodAny.create = (params2) => new ZodAny({
  typeName: ZodFirstPartyTypeKind.ZodAny,
  ...processCreateParams(params2)
});
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(input2) {
    return OK(input2.data);
  }
};
ZodUnknown.create = (params2) => new ZodUnknown({
  typeName: ZodFirstPartyTypeKind.ZodUnknown,
  ...processCreateParams(params2)
});
var ZodNever = class extends ZodType {
  _parse(input2) {
    let ctx = this._getOrReturnCtx(input2);
    return addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    }), INVALID;
  }
};
ZodNever.create = (params2) => new ZodNever({
  typeName: ZodFirstPartyTypeKind.ZodNever,
  ...processCreateParams(params2)
});
var ZodVoid = class extends ZodType {
  _parse(input2) {
    if (this._getType(input2) !== ZodParsedType.undefined) {
      let ctx = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      }), INVALID;
    }
    return OK(input2.data);
  }
};
ZodVoid.create = (params2) => new ZodVoid({
  typeName: ZodFirstPartyTypeKind.ZodVoid,
  ...processCreateParams(params2)
});
var ZodArray = class _ZodArray extends ZodType {
  _parse(input2) {
    let { ctx, status } = this._processInputParams(input2), def2 = this._def;
    if (ctx.parsedType !== ZodParsedType.array)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      }), INVALID;
    if (def2.exactLength !== null) {
      let tooBig = ctx.data.length > def2.exactLength.value, tooSmall = ctx.data.length < def2.exactLength.value;
      (tooBig || tooSmall) && (addIssueToContext(ctx, {
        code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
        minimum: tooSmall ? def2.exactLength.value : void 0,
        maximum: tooBig ? def2.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: def2.exactLength.message
      }), status.dirty());
    }
    if (def2.minLength !== null && ctx.data.length < def2.minLength.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_small,
      minimum: def2.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: def2.minLength.message
    }), status.dirty()), def2.maxLength !== null && ctx.data.length > def2.maxLength.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_big,
      maximum: def2.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: def2.maxLength.message
    }), status.dirty()), ctx.common.async)
      return Promise.all([...ctx.data].map((item, i) => def2.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i)))).then((result2) => ParseStatus.mergeArray(status, result2));
    let result = [...ctx.data].map((item, i) => def2.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params2) => new ZodArray({
  type: schema,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: ZodFirstPartyTypeKind.ZodArray,
  ...processCreateParams(params2)
});
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    let newShape = {};
    for (let key2 in schema.shape) {
      let fieldSchema = schema.shape[key2];
      newShape[key2] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else return schema instanceof ZodArray ? new ZodArray({
    ...schema._def,
    type: deepPartialify(schema.element)
  }) : schema instanceof ZodOptional ? ZodOptional.create(deepPartialify(schema.unwrap())) : schema instanceof ZodNullable ? ZodNullable.create(deepPartialify(schema.unwrap())) : schema instanceof ZodTuple ? ZodTuple.create(schema.items.map((item) => deepPartialify(item))) : schema;
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    let shape2 = this._def.shape(), keys4 = util.objectKeys(shape2);
    return this._cached = { shape: shape2, keys: keys4 }, this._cached;
  }
  _parse(input2) {
    if (this._getType(input2) !== ZodParsedType.object) {
      let ctx2 = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      }), INVALID;
    }
    let { status, ctx } = this._processInputParams(input2), { shape: shape2, keys: shapeKeys } = this._getCached(), extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip"))
      for (let key2 in ctx.data)
        shapeKeys.includes(key2) || extraKeys.push(key2);
    let pairs = [];
    for (let key2 of shapeKeys) {
      let keyValidator = shape2[key2], value3 = ctx.data[key2];
      pairs.push({
        key: { status: "valid", value: key2 },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value3, ctx.path, key2)),
        alwaysSet: key2 in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      let unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough")
        for (let key2 of extraKeys)
          pairs.push({
            key: { status: "valid", value: key2 },
            value: { status: "valid", value: ctx.data[key2] }
          });
      else if (unknownKeys === "strict")
        extraKeys.length > 0 && (addIssueToContext(ctx, {
          code: ZodIssueCode.unrecognized_keys,
          keys: extraKeys
        }), status.dirty());
      else if (unknownKeys !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      let catchall = this._def.catchall;
      for (let key2 of extraKeys) {
        let value3 = ctx.data[key2];
        pairs.push({
          key: { status: "valid", value: key2 },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value3, ctx.path, key2)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key2 in ctx.data
        });
      }
    }
    return ctx.common.async ? Promise.resolve().then(async () => {
      let syncPairs = [];
      for (let pair of pairs) {
        let key2 = await pair.key, value3 = await pair.value;
        syncPairs.push({
          key: key2,
          value: value3,
          alwaysSet: pair.alwaysSet
        });
      }
      return syncPairs;
    }).then((syncPairs) => ParseStatus.mergeObjectSync(status, syncPairs)) : ParseStatus.mergeObjectSync(status, pairs);
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    return errorUtil.errToObj, new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue2, ctx) => {
          let defaultError = this._def.errorMap?.(issue2, ctx).message ?? ctx.defaultError;
          return issue2.code === "unrecognized_keys" ? {
            message: errorUtil.errToObj(message).message ?? defaultError
          } : {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    return new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key2, schema) {
    return this.augment({ [key2]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index4) {
    return new _ZodObject({
      ...this._def,
      catchall: index4
    });
  }
  pick(mask) {
    let shape2 = {};
    for (let key2 of util.objectKeys(mask))
      mask[key2] && this.shape[key2] && (shape2[key2] = this.shape[key2]);
    return new _ZodObject({
      ...this._def,
      shape: () => shape2
    });
  }
  omit(mask) {
    let shape2 = {};
    for (let key2 of util.objectKeys(this.shape))
      mask[key2] || (shape2[key2] = this.shape[key2]);
    return new _ZodObject({
      ...this._def,
      shape: () => shape2
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    let newShape = {};
    for (let key2 of util.objectKeys(this.shape)) {
      let fieldSchema = this.shape[key2];
      mask && !mask[key2] ? newShape[key2] = fieldSchema : newShape[key2] = fieldSchema.optional();
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    let newShape = {};
    for (let key2 of util.objectKeys(this.shape))
      if (mask && !mask[key2])
        newShape[key2] = this.shape[key2];
      else {
        let newField = this.shape[key2];
        for (; newField instanceof ZodOptional; )
          newField = newField._def.innerType;
        newShape[key2] = newField;
      }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape2, params2) => new ZodObject({
  shape: () => shape2,
  unknownKeys: "strip",
  catchall: ZodNever.create(),
  typeName: ZodFirstPartyTypeKind.ZodObject,
  ...processCreateParams(params2)
});
ZodObject.strictCreate = (shape2, params2) => new ZodObject({
  shape: () => shape2,
  unknownKeys: "strict",
  catchall: ZodNever.create(),
  typeName: ZodFirstPartyTypeKind.ZodObject,
  ...processCreateParams(params2)
});
ZodObject.lazycreate = (shape2, params2) => new ZodObject({
  shape: shape2,
  unknownKeys: "strip",
  catchall: ZodNever.create(),
  typeName: ZodFirstPartyTypeKind.ZodObject,
  ...processCreateParams(params2)
});
var ZodUnion = class extends ZodType {
  _parse(input2) {
    let { ctx } = this._processInputParams(input2), options = this._def.options;
    function handleResults(results) {
      for (let result of results)
        if (result.result.status === "valid")
          return result.result;
      for (let result of results)
        if (result.result.status === "dirty")
          return ctx.common.issues.push(...result.ctx.common.issues), result.result;
      let unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      }), INVALID;
    }
    if (ctx.common.async)
      return Promise.all(options.map(async (option) => {
        let childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    {
      let dirty, issues = [];
      for (let option of options) {
        let childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        }, result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid")
          return result;
        result.status === "dirty" && !dirty && (dirty = { result, ctx: childCtx }), childCtx.common.issues.length && issues.push(childCtx.common.issues);
      }
      if (dirty)
        return ctx.common.issues.push(...dirty.ctx.common.issues), dirty.result;
      let unionErrors = issues.map((issues2) => new ZodError(issues2));
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      }), INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params2) => new ZodUnion({
  options: types,
  typeName: ZodFirstPartyTypeKind.ZodUnion,
  ...processCreateParams(params2)
});
var getDiscriminator = (type3) => type3 instanceof ZodLazy ? getDiscriminator(type3.schema) : type3 instanceof ZodEffects ? getDiscriminator(type3.innerType()) : type3 instanceof ZodLiteral ? [type3.value] : type3 instanceof ZodEnum ? type3.options : type3 instanceof ZodNativeEnum ? util.objectValues(type3.enum) : type3 instanceof ZodDefault ? getDiscriminator(type3._def.innerType) : type3 instanceof ZodUndefined ? [void 0] : type3 instanceof ZodNull ? [null] : type3 instanceof ZodOptional ? [void 0, ...getDiscriminator(type3.unwrap())] : type3 instanceof ZodNullable ? [null, ...getDiscriminator(type3.unwrap())] : type3 instanceof ZodBranded || type3 instanceof ZodReadonly ? getDiscriminator(type3.unwrap()) : type3 instanceof ZodCatch ? getDiscriminator(type3._def.innerType) : [], ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input2) {
    let { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.object)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      }), INVALID;
    let discriminator = this.discriminator, discriminatorValue = ctx.data[discriminator], option = this.optionsMap.get(discriminatorValue);
    return option ? ctx.common.async ? option._parseAsync({
      data: ctx.data,
      path: ctx.path,
      parent: ctx
    }) : option._parseSync({
      data: ctx.data,
      path: ctx.path,
      parent: ctx
    }) : (addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [discriminator]
    }), INVALID);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params2) {
    let optionsMap = /* @__PURE__ */ new Map();
    for (let type3 of options) {
      let discriminatorValues = getDiscriminator(type3.shape[discriminator]);
      if (!discriminatorValues.length)
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      for (let value3 of discriminatorValues) {
        if (optionsMap.has(value3))
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value3)}`);
        optionsMap.set(value3, type3);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params2)
    });
  }
};
function mergeValues(a, b10) {
  let aType = getParsedType(a), bType = getParsedType(b10);
  if (a === b10)
    return { valid: !0, data: a };
  if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    let bKeys = util.objectKeys(b10), sharedKeys = util.objectKeys(a).filter((key2) => bKeys.indexOf(key2) !== -1), newObj = { ...a, ...b10 };
    Object.prototype.hasOwnProperty.call(newObj, "__proto__") && delete newObj.__proto__;
    for (let key2 of sharedKeys) {
      if (key2 === "__proto__")
        continue;
      let sharedValue = mergeValues(a[key2], b10[key2]);
      if (!sharedValue.valid)
        return { valid: !1 };
      newObj[key2] = sharedValue.data;
    }
    return { valid: !0, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b10.length)
      return { valid: !1 };
    let newArray = [];
    for (let index4 = 0; index4 < a.length; index4++) {
      let itemA = a[index4], itemB = b10[index4], sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid)
        return { valid: !1 };
      newArray.push(sharedValue.data);
    }
    return { valid: !0, data: newArray };
  } else return aType === ZodParsedType.date && bType === ZodParsedType.date && +a == +b10 ? { valid: !0, data: a } : { valid: !1 };
}
var ZodIntersection = class extends ZodType {
  _parse(input2) {
    let { status, ctx } = this._processInputParams(input2), handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight))
        return INVALID;
      let merged = mergeValues(parsedLeft.value, parsedRight.value);
      return merged.valid ? ((isDirty(parsedLeft) || isDirty(parsedRight)) && status.dirty(), { status: status.value, value: merged.data }) : (addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_intersection_types
      }), INVALID);
    };
    return ctx.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }),
      this._def.right._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      })
    ]).then(([left, right]) => handleParsed(left, right)) : handleParsed(this._def.left._parseSync({
      data: ctx.data,
      path: ctx.path,
      parent: ctx
    }), this._def.right._parseSync({
      data: ctx.data,
      path: ctx.path,
      parent: ctx
    }));
  }
};
ZodIntersection.create = (left, right, params2) => new ZodIntersection({
  left,
  right,
  typeName: ZodFirstPartyTypeKind.ZodIntersection,
  ...processCreateParams(params2)
});
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input2) {
    let { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.array)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      }), INVALID;
    if (ctx.data.length < this._def.items.length)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), INVALID;
    !this._def.rest && ctx.data.length > this._def.items.length && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), status.dirty());
    let items = [...ctx.data].map((item, itemIndex) => {
      let schema = this._def.items[itemIndex] || this._def.rest;
      return schema ? schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex)) : null;
    }).filter((x5) => !!x5);
    return ctx.common.async ? Promise.all(items).then((results) => ParseStatus.mergeArray(status, results)) : ParseStatus.mergeArray(status, items);
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params2) => {
  if (!Array.isArray(schemas))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params2)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input2) {
    let { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.object)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      }), INVALID;
    let pairs = [], keyType = this._def.keyType, valueType = this._def.valueType;
    for (let key2 in ctx.data)
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, key2)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key2], ctx.path, key2)),
        alwaysSet: key2 in ctx.data
      });
    return ctx.common.async ? ParseStatus.mergeObjectAsync(status, pairs) : ParseStatus.mergeObjectSync(status, pairs);
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second2, third) {
    return second2 instanceof ZodType ? new _ZodRecord({
      keyType: first,
      valueType: second2,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(third)
    }) : new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second2)
    });
  }
}, ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input2) {
    let { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.map)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      }), INVALID;
    let keyType = this._def.keyType, valueType = this._def.valueType, pairs = [...ctx.data.entries()].map(([key2, value3], index4) => ({
      key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, [index4, "key"])),
      value: valueType._parse(new ParseInputLazyPath(ctx, value3, ctx.path, [index4, "value"]))
    }));
    if (ctx.common.async) {
      let finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (let pair of pairs) {
          let key2 = await pair.key, value3 = await pair.value;
          if (key2.status === "aborted" || value3.status === "aborted")
            return INVALID;
          (key2.status === "dirty" || value3.status === "dirty") && status.dirty(), finalMap.set(key2.value, value3.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      let finalMap = /* @__PURE__ */ new Map();
      for (let pair of pairs) {
        let key2 = pair.key, value3 = pair.value;
        if (key2.status === "aborted" || value3.status === "aborted")
          return INVALID;
        (key2.status === "dirty" || value3.status === "dirty") && status.dirty(), finalMap.set(key2.value, value3.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params2) => new ZodMap({
  valueType,
  keyType,
  typeName: ZodFirstPartyTypeKind.ZodMap,
  ...processCreateParams(params2)
});
var ZodSet = class _ZodSet extends ZodType {
  _parse(input2) {
    let { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.set)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      }), INVALID;
    let def2 = this._def;
    def2.minSize !== null && ctx.data.size < def2.minSize.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_small,
      minimum: def2.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: def2.minSize.message
    }), status.dirty()), def2.maxSize !== null && ctx.data.size > def2.maxSize.value && (addIssueToContext(ctx, {
      code: ZodIssueCode.too_big,
      maximum: def2.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: def2.maxSize.message
    }), status.dirty());
    let valueType = this._def.valueType;
    function finalizeSet(elements2) {
      let parsedSet = /* @__PURE__ */ new Set();
      for (let element3 of elements2) {
        if (element3.status === "aborted")
          return INVALID;
        element3.status === "dirty" && status.dirty(), parsedSet.add(element3.value);
      }
      return { status: status.value, value: parsedSet };
    }
    let elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    return ctx.common.async ? Promise.all(elements).then((elements2) => finalizeSet(elements2)) : finalizeSet(elements);
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params2) => new ZodSet({
  valueType,
  minSize: null,
  maxSize: null,
  typeName: ZodFirstPartyTypeKind.ZodSet,
  ...processCreateParams(params2)
});
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(input2) {
    let { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.function)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      }), INVALID;
    function makeArgsIssue(args, error64) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x5) => !!x5),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error64
        }
      });
    }
    function makeReturnsIssue(returns, error64) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x5) => !!x5),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error64
        }
      });
    }
    let params2 = { errorMap: ctx.common.contextualErrorMap }, fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      let me = this;
      return OK(async function(...args) {
        let error64 = new ZodError([]), parsedArgs = await me._def.args.parseAsync(args, params2).catch((e) => {
          throw error64.addIssue(makeArgsIssue(args, e)), error64;
        }), result = await Reflect.apply(fn, this, parsedArgs);
        return await me._def.returns._def.type.parseAsync(result, params2).catch((e) => {
          throw error64.addIssue(makeReturnsIssue(result, e)), error64;
        });
      });
    } else {
      let me = this;
      return OK(function(...args) {
        let parsedArgs = me._def.args.safeParse(args, params2);
        if (!parsedArgs.success)
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        let result = Reflect.apply(fn, this, parsedArgs.data), parsedReturns = me._def.returns.safeParse(result, params2);
        if (!parsedReturns.success)
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    return this.parse(func);
  }
  strictImplement(func) {
    return this.parse(func);
  }
  static create(args, returns, params2) {
    return new _ZodFunction({
      args: args || ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params2)
    });
  }
}, ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input2) {
    let { ctx } = this._processInputParams(input2);
    return this._def.getter()._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter3, params2) => new ZodLazy({
  getter: getter3,
  typeName: ZodFirstPartyTypeKind.ZodLazy,
  ...processCreateParams(params2)
});
var ZodLiteral = class extends ZodType {
  _parse(input2) {
    if (input2.data !== this._def.value) {
      let ctx = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      }), INVALID;
    }
    return { status: "valid", value: input2.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value3, params2) => new ZodLiteral({
  value: value3,
  typeName: ZodFirstPartyTypeKind.ZodLiteral,
  ...processCreateParams(params2)
});
function createZodEnum(values3, params2) {
  return new ZodEnum({
    values: values3,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params2)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input2) {
    if (typeof input2.data != "string") {
      let ctx = this._getOrReturnCtx(input2), expectedValues = this._def.values;
      return addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      }), INVALID;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(input2.data)) {
      let ctx = this._getOrReturnCtx(input2), expectedValues = this._def.values;
      return addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      }), INVALID;
    }
    return OK(input2.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    let enumValues = {};
    for (let val of this._def.values)
      enumValues[val] = val;
    return enumValues;
  }
  get Values() {
    let enumValues = {};
    for (let val of this._def.values)
      enumValues[val] = val;
    return enumValues;
  }
  get Enum() {
    let enumValues = {};
    for (let val of this._def.values)
      enumValues[val] = val;
    return enumValues;
  }
  extract(values3, newDef = this._def) {
    return _ZodEnum.create(values3, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values3, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values3.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input2) {
    let nativeEnumValues = util.getValidEnumValues(this._def.values), ctx = this._getOrReturnCtx(input2);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      let expectedValues = util.objectValues(nativeEnumValues);
      return addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      }), INVALID;
    }
    if (this._cache || (this._cache = new Set(util.getValidEnumValues(this._def.values))), !this._cache.has(input2.data)) {
      let expectedValues = util.objectValues(nativeEnumValues);
      return addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      }), INVALID;
    }
    return OK(input2.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values3, params2) => new ZodNativeEnum({
  values: values3,
  typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
  ...processCreateParams(params2)
});
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input2) {
    let { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === !1)
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      }), INVALID;
    let promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data3) => this._def.type.parseAsync(data3, {
      path: ctx.path,
      errorMap: ctx.common.contextualErrorMap
    })));
  }
};
ZodPromise.create = (schema, params2) => new ZodPromise({
  type: schema,
  typeName: ZodFirstPartyTypeKind.ZodPromise,
  ...processCreateParams(params2)
});
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input2) {
    let { status, ctx } = this._processInputParams(input2), effect = this._def.effect || null, checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg), arg.fatal ? status.abort() : status.dirty();
      },
      get path() {
        return ctx.path;
      }
    };
    if (checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx), effect.type === "preprocess") {
      let processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async)
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          let result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          return result.status === "aborted" ? INVALID : result.status === "dirty" ? DIRTY(result.value) : status.value === "dirty" ? DIRTY(result.value) : result;
        });
      {
        if (status.value === "aborted")
          return INVALID;
        let result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        return result.status === "aborted" ? INVALID : result.status === "dirty" ? DIRTY(result.value) : status.value === "dirty" ? DIRTY(result.value) : result;
      }
    }
    if (effect.type === "refinement") {
      let executeRefinement = (acc) => {
        let result = effect.refinement(acc, checkCtx);
        if (ctx.common.async)
          return Promise.resolve(result);
        if (result instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return acc;
      };
      if (ctx.common.async === !1) {
        let inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        return inner.status === "aborted" ? INVALID : (inner.status === "dirty" && status.dirty(), executeRefinement(inner.value), { status: status.value, value: inner.value });
      } else
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => inner.status === "aborted" ? INVALID : (inner.status === "dirty" && status.dirty(), executeRefinement(inner.value).then(() => ({ status: status.value, value: inner.value }))));
    }
    if (effect.type === "transform")
      if (ctx.common.async === !1) {
        let base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        let result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: status.value, value: result };
      } else
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => isValid(base) ? Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
          status: status.value,
          value: result
        })) : INVALID);
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params2) => new ZodEffects({
  schema,
  typeName: ZodFirstPartyTypeKind.ZodEffects,
  effect,
  ...processCreateParams(params2)
});
ZodEffects.createWithPreprocess = (preprocess2, schema, params2) => new ZodEffects({
  schema,
  effect: { type: "preprocess", transform: preprocess2 },
  typeName: ZodFirstPartyTypeKind.ZodEffects,
  ...processCreateParams(params2)
});
var ZodOptional = class extends ZodType {
  _parse(input2) {
    return this._getType(input2) === ZodParsedType.undefined ? OK(void 0) : this._def.innerType._parse(input2);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type3, params2) => new ZodOptional({
  innerType: type3,
  typeName: ZodFirstPartyTypeKind.ZodOptional,
  ...processCreateParams(params2)
});
var ZodNullable = class extends ZodType {
  _parse(input2) {
    return this._getType(input2) === ZodParsedType.null ? OK(null) : this._def.innerType._parse(input2);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type3, params2) => new ZodNullable({
  innerType: type3,
  typeName: ZodFirstPartyTypeKind.ZodNullable,
  ...processCreateParams(params2)
});
var ZodDefault = class extends ZodType {
  _parse(input2) {
    let { ctx } = this._processInputParams(input2), data3 = ctx.data;
    return ctx.parsedType === ZodParsedType.undefined && (data3 = this._def.defaultValue()), this._def.innerType._parse({
      data: data3,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type3, params2) => new ZodDefault({
  innerType: type3,
  typeName: ZodFirstPartyTypeKind.ZodDefault,
  defaultValue: typeof params2.default == "function" ? params2.default : () => params2.default,
  ...processCreateParams(params2)
});
var ZodCatch = class extends ZodType {
  _parse(input2) {
    let { ctx } = this._processInputParams(input2), newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    }, result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    return isAsync(result) ? result.then((result2) => ({
      status: "valid",
      value: result2.status === "valid" ? result2.value : this._def.catchValue({
        get error() {
          return new ZodError(newCtx.common.issues);
        },
        input: newCtx.data
      })
    })) : {
      status: "valid",
      value: result.status === "valid" ? result.value : this._def.catchValue({
        get error() {
          return new ZodError(newCtx.common.issues);
        },
        input: newCtx.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type3, params2) => new ZodCatch({
  innerType: type3,
  typeName: ZodFirstPartyTypeKind.ZodCatch,
  catchValue: typeof params2.catch == "function" ? params2.catch : () => params2.catch,
  ...processCreateParams(params2)
});
var ZodNaN = class extends ZodType {
  _parse(input2) {
    if (this._getType(input2) !== ZodParsedType.nan) {
      let ctx = this._getOrReturnCtx(input2);
      return addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      }), INVALID;
    }
    return { status: "valid", value: input2.data };
  }
};
ZodNaN.create = (params2) => new ZodNaN({
  typeName: ZodFirstPartyTypeKind.ZodNaN,
  ...processCreateParams(params2)
});
var ZodBranded = class extends ZodType {
  _parse(input2) {
    let { ctx } = this._processInputParams(input2), data3 = ctx.data;
    return this._def.type._parse({
      data: data3,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}, ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input2) {
    let { status, ctx } = this._processInputParams(input2);
    if (ctx.common.async)
      return (async () => {
        let inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        return inResult.status === "aborted" ? INVALID : inResult.status === "dirty" ? (status.dirty(), DIRTY(inResult.value)) : this._def.out._parseAsync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      })();
    {
      let inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      return inResult.status === "aborted" ? INVALID : inResult.status === "dirty" ? (status.dirty(), {
        status: "dirty",
        value: inResult.value
      }) : this._def.out._parseSync({
        data: inResult.value,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  static create(a, b10) {
    return new _ZodPipeline({
      in: a,
      out: b10,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}, ZodReadonly = class extends ZodType {
  _parse(input2) {
    let result = this._def.innerType._parse(input2), freeze = (data3) => (isValid(data3) && (data3.value = Object.freeze(data3.value)), data3);
    return isAsync(result) ? result.then((data3) => freeze(data3)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type3, params2) => new ZodReadonly({
  innerType: type3,
  typeName: ZodFirstPartyTypeKind.ZodReadonly,
  ...processCreateParams(params2)
});
var late = {
  object: ZodObject.lazycreate
}, ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind3) {
  ZodFirstPartyTypeKind3.ZodString = "ZodString", ZodFirstPartyTypeKind3.ZodNumber = "ZodNumber", ZodFirstPartyTypeKind3.ZodNaN = "ZodNaN", ZodFirstPartyTypeKind3.ZodBigInt = "ZodBigInt", ZodFirstPartyTypeKind3.ZodBoolean = "ZodBoolean", ZodFirstPartyTypeKind3.ZodDate = "ZodDate", ZodFirstPartyTypeKind3.ZodSymbol = "ZodSymbol", ZodFirstPartyTypeKind3.ZodUndefined = "ZodUndefined", ZodFirstPartyTypeKind3.ZodNull = "ZodNull", ZodFirstPartyTypeKind3.ZodAny = "ZodAny", ZodFirstPartyTypeKind3.ZodUnknown = "ZodUnknown", ZodFirstPartyTypeKind3.ZodNever = "ZodNever", ZodFirstPartyTypeKind3.ZodVoid = "ZodVoid", ZodFirstPartyTypeKind3.ZodArray = "ZodArray", ZodFirstPartyTypeKind3.ZodObject = "ZodObject", ZodFirstPartyTypeKind3.ZodUnion = "ZodUnion", ZodFirstPartyTypeKind3.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", ZodFirstPartyTypeKind3.ZodIntersection = "ZodIntersection", ZodFirstPartyTypeKind3.ZodTuple = "ZodTuple", ZodFirstPartyTypeKind3.ZodRecord = "ZodRecord", ZodFirstPartyTypeKind3.ZodMap = "ZodMap", ZodFirstPartyTypeKind3.ZodSet = "ZodSet", ZodFirstPartyTypeKind3.ZodFunction = "ZodFunction", ZodFirstPartyTypeKind3.ZodLazy = "ZodLazy", ZodFirstPartyTypeKind3.ZodLiteral = "ZodLiteral", ZodFirstPartyTypeKind3.ZodEnum = "ZodEnum", ZodFirstPartyTypeKind3.ZodEffects = "ZodEffects", ZodFirstPartyTypeKind3.ZodNativeEnum = "ZodNativeEnum", ZodFirstPartyTypeKind3.ZodOptional = "ZodOptional", ZodFirstPartyTypeKind3.ZodNullable = "ZodNullable", ZodFirstPartyTypeKind3.ZodDefault = "ZodDefault", ZodFirstPartyTypeKind3.ZodCatch = "ZodCatch", ZodFirstPartyTypeKind3.ZodPromise = "ZodPromise", ZodFirstPartyTypeKind3.ZodBranded = "ZodBranded", ZodFirstPartyTypeKind3.ZodPipeline = "ZodPipeline", ZodFirstPartyTypeKind3.ZodReadonly = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var stringType = ZodString.create, numberType = ZodNumber.create, nanType = ZodNaN.create, bigIntType = ZodBigInt.create, booleanType = ZodBoolean.create, dateType = ZodDate.create, symbolType = ZodSymbol.create, undefinedType = ZodUndefined.create, nullType = ZodNull.create, anyType = ZodAny.create, unknownType = ZodUnknown.create, neverType = ZodNever.create, voidType = ZodVoid.create, arrayType = ZodArray.create, objectType = ZodObject.create, strictObjectType = ZodObject.strictCreate, unionType = ZodUnion.create, discriminatedUnionType = ZodDiscriminatedUnion.create, intersectionType = ZodIntersection.create, tupleType = ZodTuple.create, recordType = ZodRecord.create, mapType = ZodMap.create, setType = ZodSet.create, functionType = ZodFunction.create, lazyType = ZodLazy.create, literalType = ZodLiteral.create, enumType = ZodEnum.create, nativeEnumType = ZodNativeEnum.create, promiseType = ZodPromise.create, effectsType = ZodEffects.create, optionalType = ZodOptional.create, nullableType = ZodNullable.create, preprocessType = ZodEffects.createWithPreprocess, pipelineType = ZodPipeline.create;

// node_modules/zod/v4/core/index.js
var core_exports2 = {};
__export(core_exports2, {
  $ZodAny: () => $ZodAny,
  $ZodArray: () => $ZodArray,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodBase64: () => $ZodBase64,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBoolean: () => $ZodBoolean,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCUID: () => $ZodCUID,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCatch: () => $ZodCatch,
  $ZodCheck: () => $ZodCheck,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckProperties: () => $ZodCheckProperties,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCodec: () => $ZodCodec,
  $ZodCreditCard: () => $ZodCreditCard,
  $ZodCustom: () => $ZodCustom,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodCyclicError: () => $ZodCyclicError,
  $ZodDate: () => $ZodDate,
  $ZodDefault: () => $ZodDefault,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodE164: () => $ZodE164,
  $ZodEmail: () => $ZodEmail,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEnum: () => $ZodEnum,
  $ZodError: () => $ZodError,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodFile: () => $ZodFile,
  $ZodFunction: () => $ZodFunction,
  $ZodGUID: () => $ZodGUID,
  $ZodIBAN: () => $ZodIBAN,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIPv6: () => $ZodIPv6,
  $ZodISODate: () => $ZodISODate,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISOTime: () => $ZodISOTime,
  $ZodIntersection: () => $ZodIntersection,
  $ZodJWT: () => $ZodJWT,
  $ZodKSUID: () => $ZodKSUID,
  $ZodLazy: () => $ZodLazy,
  $ZodLiteral: () => $ZodLiteral,
  $ZodMAC: () => $ZodMAC,
  $ZodMap: () => $ZodMap,
  $ZodNaN: () => $ZodNaN,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNever: () => $ZodNever,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNull: () => $ZodNull,
  $ZodNullable: () => $ZodNullable,
  $ZodNumber: () => $ZodNumber,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodObject: () => $ZodObject,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodOptional: () => $ZodOptional,
  $ZodPipe: () => $ZodPipe,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPreprocess: () => $ZodPreprocess,
  $ZodPromise: () => $ZodPromise,
  $ZodReadonly: () => $ZodReadonly,
  $ZodRealError: () => $ZodRealError,
  $ZodRecord: () => $ZodRecord,
  $ZodRegistry: () => $ZodRegistry,
  $ZodSet: () => $ZodSet,
  $ZodString: () => $ZodString,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodSuccess: () => $ZodSuccess,
  $ZodSymbol: () => $ZodSymbol,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodTransform: () => $ZodTransform,
  $ZodTuple: () => $ZodTuple,
  $ZodType: () => $ZodType,
  $ZodULID: () => $ZodULID,
  $ZodURL: () => $ZodURL,
  $ZodUUID: () => $ZodUUID,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUnion: () => $ZodUnion,
  $ZodUnknown: () => $ZodUnknown,
  $ZodVoid: () => $ZodVoid,
  $ZodXID: () => $ZodXID,
  $ZodXor: () => $ZodXor,
  $brand: () => $brand,
  $constructor: () => $constructor,
  $input: () => $input,
  $output: () => $output,
  Doc: () => Doc,
  INVALID: () => INVALID2,
  JSONSchema: () => json_schema_exports,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  URL_BAD_FORMAT: () => URL_BAD_FORMAT,
  URL_UNPARSEABLE: () => URL_UNPARSEABLE,
  ZodCompileAsyncError: () => ZodCompileAsyncError,
  ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
  _any: () => _any,
  _array: () => _array,
  _base64: () => _base64,
  _base64url: () => _base64url,
  _bigint: () => _bigint,
  _boolean: () => _boolean,
  _catch: () => _catch,
  _check: () => _check,
  _cidrv4: () => _cidrv4,
  _cidrv6: () => _cidrv6,
  _coercedBigint: () => _coercedBigint,
  _coercedBoolean: () => _coercedBoolean,
  _coercedDate: () => _coercedDate,
  _coercedNumber: () => _coercedNumber,
  _coercedString: () => _coercedString,
  _creditCard: () => _creditCard,
  _cuid: () => _cuid,
  _cuid2: () => _cuid2,
  _custom: () => _custom,
  _date: () => _date,
  _decode: () => _decode,
  _decodeAsync: () => _decodeAsync,
  _default: () => _default,
  _discriminatedUnion: () => _discriminatedUnion,
  _e164: () => _e164,
  _email: () => _email,
  _emoji: () => _emoji2,
  _encode: () => _encode,
  _encodeAsync: () => _encodeAsync,
  _endsWith: () => _endsWith,
  _enum: () => _enum,
  _file: () => _file,
  _float32: () => _float32,
  _float64: () => _float64,
  _gt: () => _gt,
  _gte: () => _gte,
  _guid: () => _guid,
  _iban: () => _iban,
  _includes: () => _includes,
  _int: () => _int,
  _int32: () => _int32,
  _int64: () => _int64,
  _intersection: () => _intersection,
  _ipv4: () => _ipv4,
  _ipv6: () => _ipv6,
  _isoDate: () => _isoDate,
  _isoDateTime: () => _isoDateTime,
  _isoDuration: () => _isoDuration,
  _isoTime: () => _isoTime,
  _jwt: () => _jwt,
  _ksuid: () => _ksuid,
  _lazy: () => _lazy,
  _length: () => _length,
  _literal: () => _literal,
  _lowercase: () => _lowercase,
  _lt: () => _lt,
  _lte: () => _lte,
  _mac: () => _mac,
  _map: () => _map,
  _max: () => _lte,
  _maxLength: () => _maxLength,
  _maxSize: () => _maxSize,
  _mime: () => _mime,
  _min: () => _gte,
  _minLength: () => _minLength,
  _minSize: () => _minSize,
  _multipleOf: () => _multipleOf,
  _nan: () => _nan,
  _nanoid: () => _nanoid,
  _nativeEnum: () => _nativeEnum,
  _negative: () => _negative,
  _never: () => _never,
  _nonnegative: () => _nonnegative,
  _nonoptional: () => _nonoptional,
  _nonpositive: () => _nonpositive,
  _normalize: () => _normalize,
  _null: () => _null2,
  _nullable: () => _nullable,
  _number: () => _number,
  _optional: () => _optional,
  _overwrite: () => _overwrite,
  _parse: () => _parse,
  _parseAsync: () => _parseAsync,
  _pipe: () => _pipe,
  _positive: () => _positive,
  _promise: () => _promise,
  _properties: () => _properties,
  _property: () => _property,
  _readonly: () => _readonly,
  _record: () => _record,
  _refine: () => _refine,
  _regex: () => _regex,
  _safeDecode: () => _safeDecode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeEncode: () => _safeEncode,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeParse: () => _safeParse,
  _safeParseAsync: () => _safeParseAsync,
  _set: () => _set,
  _size: () => _size,
  _slugify: () => _slugify,
  _startsWith: () => _startsWith,
  _string: () => _string,
  _stringFormat: () => _stringFormat,
  _stringbool: () => _stringbool,
  _success: () => _success,
  _superRefine: () => _superRefine,
  _symbol: () => _symbol,
  _templateLiteral: () => _templateLiteral,
  _toLowerCase: () => _toLowerCase,
  _toUpperCase: () => _toUpperCase,
  _transform: () => _transform,
  _trim: () => _trim,
  _tuple: () => _tuple,
  _uint32: () => _uint32,
  _uint64: () => _uint64,
  _ulid: () => _ulid,
  _undefined: () => _undefined2,
  _union: () => _union,
  _unknown: () => _unknown,
  _uppercase: () => _uppercase,
  _url: () => _url,
  _uuid: () => _uuid,
  _uuidv4: () => _uuidv4,
  _uuidv6: () => _uuidv6,
  _uuidv7: () => _uuidv7,
  _void: () => _void,
  _xid: () => _xid,
  _xor: () => _xor,
  base64Charset: () => base64Charset,
  base64urlCharset: () => base64urlCharset,
  canParseURL: () => canParseURL,
  clone: () => clone,
  compile: () => compile,
  compileFn: () => compileFn,
  config: () => config,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  describe: () => describe,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  extractDefs: () => extractDefs,
  finalize: () => finalize,
  flattenError: () => flattenError,
  formatError: () => formatError,
  getDiscriminatedOption: () => getDiscriminatedOption,
  globalConfig: () => globalConfig,
  globalRegistry: () => globalRegistry,
  handleUnrepresentable: () => handleUnrepresentable,
  initializeContext: () => initializeContext,
  isBackEdge: () => isBackEdge,
  isRecursiveSchema: () => isRecursiveSchema,
  isValidBase64: () => isValidBase64,
  isValidBase64URL: () => isValidBase64URL,
  isValidCIDRv6: () => isValidCIDRv6,
  isValidCreditCard: () => isValidCreditCard,
  isValidIBAN: () => isValidIBAN,
  isValidIPv6: () => isValidIPv6,
  isValidJWT: () => isValidJWT2,
  locales: () => locales_exports,
  memoizer: () => memoizer,
  mergeValues: () => mergeValues2,
  meta: () => meta,
  parse: () => parse,
  parseAsync: () => parseAsync,
  parseURLObject: () => parseURLObject,
  prettifyError: () => prettifyError,
  process: () => processSchema,
  processSchema: () => processSchema,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  standardProps: () => standardProps,
  stripTabAndNewline: () => stripTabAndNewline,
  toDotPath: () => toDotPath,
  toJSONSchema: () => toJSONSchema,
  toZod: () => toZod,
  treeifyError: () => treeifyError,
  urlHostnameOk: () => urlHostnameOk,
  urlProtocolOk: () => urlProtocolOk,
  util: () => util_exports,
  validate: () => validate,
  validateAsync: () => validateAsync,
  validateURL: () => validateURL,
  version: () => version,
  withParser: () => withParser
});

// node_modules/zod/v4/core/util.js
var util_exports = {};
__export(util_exports, {
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
  CONSTANT_CATCH: () => CONSTANT_CATCH,
  Class: () => Class,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  aborted: () => aborted,
  allowsEval: () => allowsEval,
  assert: () => assert,
  assertEqual: () => assertEqual,
  assertIs: () => assertIs,
  assertNever: () => assertNever,
  assertNotEqual: () => assertNotEqual,
  assignProp: () => assignProp,
  attachSchema: () => attachSchema,
  base64ToUint8Array: () => base64ToUint8Array,
  base64urlToUint8Array: () => base64urlToUint8Array,
  cached: () => cached,
  captureStackTrace: () => captureStackTrace,
  cleanEnum: () => cleanEnum,
  cleanRegex: () => cleanRegex,
  clone: () => clone,
  cloneDef: () => cloneDef,
  codePointLength: () => codePointLength,
  constantCatch: () => constantCatch,
  createTransparentProxy: () => createTransparentProxy,
  defineLazy: () => defineLazy,
  defineLazyInternal: () => defineLazyInternal,
  derived: () => derived,
  esc: () => esc,
  escapeRegex: () => escapeRegex,
  explicitlyAborted: () => explicitlyAborted,
  extend: () => extend,
  finalizeIssue: () => finalizeIssue,
  floatSafeRemainder: () => floatSafeRemainder2,
  getElementAtPath: () => getElementAtPath,
  getEnumValues: () => getEnumValues,
  getLengthableOrigin: () => getLengthableOrigin,
  getParsedType: () => getParsedType2,
  getSizableOrigin: () => getSizableOrigin,
  hexToUint8Array: () => hexToUint8Array,
  hide: () => hide,
  installLazyProp: () => installLazyProp,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  issue: () => issue,
  joinValues: () => joinValues,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  members: () => members,
  merge: () => merge,
  mergeDefs: () => mergeDefs,
  normalizeParams: () => normalizeParams,
  nullish: () => nullish,
  numKeys: () => numKeys,
  objectClone: () => objectClone,
  omit: () => omit,
  optionalKeys: () => optionalKeys,
  own: () => own,
  parsedType: () => parsedType,
  partial: () => partial,
  pick: () => pick,
  prefixIssues: () => prefixIssues,
  primitiveTypes: () => primitiveTypes,
  promiseAllObject: () => promiseAllObject,
  propertyKeyTypes: () => propertyKeyTypes,
  randomString: () => randomString,
  rawShape: () => rawShape,
  required: () => required,
  safeExtend: () => safeExtend,
  shallowClone: () => shallowClone,
  slugify: () => slugify,
  stringifyPrimitive: () => stringifyPrimitive,
  toZod: () => toZod,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToHex: () => uint8ArrayToHex,
  unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function toZod() {
  return (schema) => schema;
}
function assertIs(_arg) {
}
function assertNever(_x3) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {
}
function getEnumValues(entries2) {
  let numericValues = Object.values(entries2).filter((v2) => typeof v2 == "number");
  return Object.entries(entries2).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v2]) => v2);
}
function joinValues(array4, separator = "|") {
  return array4.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value3) {
  return typeof value3 == "bigint" ? value3.toString() : value3;
}
var Cached = class {
  constructor(getter3) {
    this._getter = getter3, this._value = void 0;
  }
  get value() {
    let getter3 = this._getter;
    return getter3 !== void 0 && (this._value = getter3(), this._getter = void 0), this._value;
  }
};
function cached(getter3) {
  return new Cached(getter3);
}
function nullish(input2) {
  return input2 == null;
}
function cleanRegex(source4) {
  let start = source4.startsWith("^") ? 1 : 0, end = source4.endsWith("$") ? source4.length - 1 : source4.length;
  return source4.slice(start, end);
}
function floatSafeRemainder2(val, step) {
  let ratio = val / step, roundedRatio = Math.round(ratio), tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
  return Math.abs(ratio - roundedRatio) < tolerance ? 0 : ratio - roundedRatio;
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object4, key2, getter3) {
  let value3;
  Object.defineProperty(object4, key2, {
    get() {
      if (value3 !== EVALUATING)
        return value3 === void 0 && (value3 = EVALUATING, value3 = getter3()), value3;
    },
    set(v2) {
      Object.defineProperty(object4, key2, {
        value: v2
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target3, prop, value3) {
  Object.defineProperty(target3, prop, {
    value: value3,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function rawShape(def2) {
  let desc = Object.getOwnPropertyDescriptor(def2, "shape");
  return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
  return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target3, key2, getter3) {
  Object.defineProperty(target3, key2, {
    get() {
      let value3 = getter3();
      return assignProp(this, key2, value3), value3;
    },
    enumerable: !0,
    configurable: !0
  });
}
function putProp(target3, key2, value3) {
  key2 in target3 ? assignProp(target3, key2, value3) : target3[key2] = value3;
}
function mirrorShape(target3, source4, keys4, wrap2) {
  let raw = sourceShape(source4);
  for (let key2 of keys4) {
    let desc = Object.getOwnPropertyDescriptor(raw, key2);
    desc.enumerable && (desc.get ? deferProp(target3, key2, () => {
      let value3 = source4._zod.def.shape[key2];
      return wrap2 ? wrap2(value3, key2) : value3;
    }) : putProp(target3, key2, wrap2 ? wrap2(desc.value, key2) : desc.value));
  }
}
function mirrorProps(target3, source4) {
  for (let key2 of Reflect.ownKeys(source4)) {
    let desc = Object.getOwnPropertyDescriptor(source4, key2);
    desc.enumerable && (desc.get ? deferProp(target3, key2, () => source4[key2]) : putProp(target3, key2, desc.value));
  }
}
function mergeDefs(...defs) {
  let mergedDescriptors = {};
  for (let def2 of defs) {
    let descriptors = Object.getOwnPropertyDescriptors(def2);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path3) {
  return path3 ? path3.reduce((acc, key2) => acc?.[key2], obj) : obj;
}
function promiseAllObject(promisesObj) {
  let keys4 = Object.keys(promisesObj), promises = keys4.map((key2) => promisesObj[key2]);
  return Promise.all(promises).then((results) => {
    let resolvedObj = {};
    for (let i = 0; i < keys4.length; i++)
      resolvedObj[keys4[i]] = results[i];
    return resolvedObj;
  });
}
function randomString(length3 = 10) {
  let chars = "abcdefghijklmnopqrstuvwxyz", str = "";
  for (let i = 0; i < length3; i++)
    str += chars[Math.floor(Math.random() * chars.length)];
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input2) {
  return input2.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
};
function isObject(data3) {
  return typeof data3 == "object" && data3 !== null && !Array.isArray(data3);
}
var allowsEval = /* @__PURE__ */ cached(() => {
  if (globalConfig.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    let F = Function;
    return new F(""), !0;
  } catch {
    return !1;
  }
});
function isPlainObject(o) {
  if (isObject(o) === !1)
    return !1;
  let ctor = o.constructor;
  if (ctor === void 0 || typeof ctor != "function")
    return !0;
  let prot = ctor.prototype;
  return !(isObject(prot) === !1 || Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === !1);
}
function shallowClone(o) {
  return isPlainObject(o) ? { ...o } : Array.isArray(o) ? [...o] : o instanceof Map ? new Map(o) : o instanceof Set ? new Set(o) : o;
}
function numKeys(data3) {
  let keyCount = 0;
  for (let key2 in data3)
    Object.prototype.hasOwnProperty.call(data3, key2) && keyCount++;
  return keyCount;
}
var getParsedType2 = (data3) => {
  let t = typeof data3;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data3) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      return Array.isArray(data3) ? "array" : data3 === null ? "null" : data3.then && typeof data3.then == "function" && data3.catch && typeof data3.catch == "function" ? "promise" : typeof Map < "u" && data3 instanceof Map ? "map" : typeof Set < "u" && data3 instanceof Set ? "set" : typeof Date < "u" && data3 instanceof Date ? "date" : typeof File < "u" && data3 instanceof File ? "file" : "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
}, propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]), primitiveTypes = /* @__PURE__ */ new Set([
  "string",
  "number",
  "bigint",
  "boolean",
  "symbol",
  "undefined"
]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def2, params2) {
  let cl = new inst._zod.constr(def2 ?? inst._zod.def);
  return (!def2 || params2?.parent) && (cl._zod.parent = inst), cl;
}
function normalizeParams(_params) {
  let params2 = _params;
  if (!params2)
    return {};
  if (typeof params2 == "string")
    return { error: () => params2 };
  if (params2?.message !== void 0) {
    if (params2?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params2.error = params2.message;
  }
  return delete params2.message, typeof params2.error == "string" ? { ...params2, error: () => params2.error } : params2;
}
function createTransparentProxy(getter3) {
  let target3;
  return new Proxy({}, {
    get(_, prop, receiver) {
      return target3 ?? (target3 = getter3()), Reflect.get(target3, prop, receiver);
    },
    set(_, prop, value3, receiver) {
      return target3 ?? (target3 = getter3()), Reflect.set(target3, prop, value3, receiver);
    },
    has(_, prop) {
      return target3 ?? (target3 = getter3()), Reflect.has(target3, prop);
    },
    deleteProperty(_, prop) {
      return target3 ?? (target3 = getter3()), Reflect.deleteProperty(target3, prop);
    },
    ownKeys(_) {
      return target3 ?? (target3 = getter3()), Reflect.ownKeys(target3);
    },
    getOwnPropertyDescriptor(_, prop) {
      return target3 ?? (target3 = getter3()), Reflect.getOwnPropertyDescriptor(target3, prop);
    },
    defineProperty(_, prop, descriptor) {
      return target3 ?? (target3 = getter3()), Reflect.defineProperty(target3, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value3) {
  return typeof value3 == "bigint" ? value3.toString() + "n" : typeof value3 == "string" ? `"${value3}"` : `${value3}`;
}
function optionalKeys(shape2) {
  return Object.keys(shape2).filter((k) => shape2[k]._zod.optin !== void 0 && shape2[k]._zod.optout === "optional");
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  let currDef = schema._zod.def, checks = currDef.checks;
  if (checks && checks.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  let newShape = {};
  return mirrorShape(newShape, schema, maskedKeys(schema, mask)), clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function maskedKeys(schema, mask) {
  let raw = sourceShape(schema), keys4 = [];
  for (let key2 of Reflect.ownKeys(mask)) {
    if (!Object.getOwnPropertyDescriptor(raw, key2)?.enumerable)
      throw new Error(`Unrecognized key: "${String(key2)}"`);
    mask[key2] && keys4.push(key2);
  }
  return keys4;
}
function omit(schema, mask) {
  let currDef = schema._zod.def, checks = currDef.checks;
  if (checks && checks.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  let omitted = new Set(maskedKeys(schema, mask)), newShape = {};
  return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key2) => !omitted.has(key2))), clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function extend(schema, shape2) {
  if (!isPlainObject(shape2))
    throw new Error("Invalid input to extend: expected a plain object");
  let checks = schema._zod.def.checks;
  if (checks && checks.length > 0) {
    let existingShape = sourceShape(schema);
    for (let key2 of Reflect.ownKeys(shape2))
      if (Object.getOwnPropertyDescriptor(existingShape, key2) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape2) }));
}
function extended(schema, shape2) {
  let newShape = {};
  return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema))), mirrorProps(newShape, shape2), newShape;
}
function safeExtend(schema, shape2) {
  if (!isPlainObject(shape2))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape2) }));
}
function merge(a, b10) {
  if (!b10?._zod?.def)
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (a._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  let newShape = {};
  mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a))), mirrorShape(newShape, b10, Reflect.ownKeys(sourceShape(b10)));
  let def2 = mergeDefs(a._zod.def, {
    shape: newShape,
    get catchall() {
      return b10._zod.def.catchall;
    },
    checks: b10._zod.def.checks ?? []
  });
  return clone(a, def2);
}
function partial(Class2, schema, mask, name2 = "partial") {
  let checks = schema._zod.def.checks;
  if (checks && checks.length > 0)
    throw new Error(`.${name2}() cannot be used on object schemas containing refinements`);
  let selected = mask ? new Set(maskedKeys(schema, mask)) : void 0, newShape = {};
  return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class2 && ((value3, key2) => selected && !selected.has(key2) ? value3 : new Class2({ type: "optional", innerType: value3 }))), clone(schema, mergeDefs(schema._zod.def, { shape: newShape, checks: [] }));
}
function required(Class2, schema, mask) {
  let selected = mask ? new Set(maskedKeys(schema, mask)) : void 0, newShape = {};
  return mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value3, key2) => (
    // overwrite with non-optional
    selected && !selected.has(key2) ? value3 : new Class2({ type: "nonoptional", innerType: value3 })
  )), clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x5, startIndex = 0) {
  if (x5.aborted === !0)
    return !0;
  for (let i = startIndex; i < x5.issues.length; i++)
    if (x5.issues[i]?.continue !== !0)
      return !0;
  return !1;
}
function explicitlyAborted(x5, startIndex = 0) {
  if (x5.aborted === !0)
    return !0;
  for (let i = startIndex; i < x5.issues.length; i++)
    if (x5.issues[i]?.continue === !1)
      return !0;
  return !1;
}
function prefixIssues(path3, issues) {
  return issues.map((iss) => {
    var _a3;
    return (_a3 = iss).path ?? (_a3.path = []), iss.path.unshift(path3), iss;
  });
}
function unwrapMessage(message) {
  return typeof message == "string" ? message : message?.message;
}
function attachSchema(issues, start, inst) {
  var _a3;
  for (let i = start; i < issues.length; i++)
    (_a3 = issues[i]).schema ?? (_a3.schema = inst);
}
function finalizeIssue(iss, ctx, config2) {
  var _a3;
  let traits = iss.inst?._zod?.traits;
  traits?.has("$ZodType") && (traits.has("$ZodCheck") ? (_a3 = iss).schema ?? (_a3.schema = iss.inst) : iss.schema = iss.inst);
  let schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0, message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input", full = {};
  for (let k of Object.keys(iss))
    k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__" || (full[k] = iss[k]);
  return full.path ?? (full.path = []), full.message = message, ctx?.reportInput && (full.input = iss.input), full;
}
function getSizableOrigin(input2) {
  return input2 instanceof Set ? "set" : input2 instanceof Map ? "map" : input2 instanceof File ? "file" : "unknown";
}
var highSurrogate = /[\uD800-\uDBFF]/;
function codePointLength(str) {
  let units = str.length;
  if (!highSurrogate.test(str))
    return units;
  let count4 = units;
  for (let i = 0; i < units - 1; i++)
    (str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320 && (count4--, i++);
  return count4;
}
function getLengthableOrigin(input2) {
  return Array.isArray(input2) ? "array" : typeof input2 == "string" ? "string" : "unknown";
}
function parsedType(data3) {
  let t = typeof data3;
  switch (t) {
    case "number":
      return Number.isNaN(data3) ? "nan" : "number";
    case "object": {
      if (data3 === null)
        return "null";
      if (Array.isArray(data3))
        return "array";
      let obj = data3;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor)
        return obj.constructor.name;
    }
  }
  return t;
}
function issue(...args) {
  let [iss, input2, inst] = args;
  return typeof iss == "string" ? {
    message: iss,
    code: "custom",
    input: input2,
    inst
  } : { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => Number.isNaN(Number.parseInt(k, 10))).map((el) => el[1]);
}
function base64ToUint8Array(base643) {
  let binaryString = atob(base643), bytes2 = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++)
    bytes2[i] = binaryString.charCodeAt(i);
  return bytes2;
}
function uint8ArrayToBase64(bytes2) {
  let binaryString = "";
  for (let i = 0; i < bytes2.length; i++)
    binaryString += String.fromCharCode(bytes2[i]);
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url3) {
  let base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/"), padding3 = "=".repeat((4 - base643.length % 4) % 4);
  return base64ToUint8Array(base643 + padding3);
}
function uint8ArrayToBase64url(bytes2) {
  return uint8ArrayToBase64(bytes2).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex4) {
  let cleanHex = hex4.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0)
    throw new Error("Invalid hex string length");
  let bytes2 = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2)
    bytes2[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  return bytes2;
}
function uint8ArrayToHex(bytes2) {
  return Array.from(bytes2).map((b10) => b10.toString(16).padStart(2, "0")).join("");
}
var Class = class {
  constructor(..._args) {
  }
};
function members(proto, table) {
  for (let key2 in table) {
    let desc = Object.getOwnPropertyDescriptor(table, key2);
    desc.get ? Object.defineProperty(proto, key2, { ...desc, enumerable: !1 }) : defineBound(proto, key2, desc.value);
  }
}
function own(inst, key2, value3, enumerable = !0) {
  return Object.defineProperty(inst, key2, { configurable: !0, writable: !0, enumerable, value: value3 }), value3;
}
function hide(inst, key2, value3) {
  return own(inst, key2, value3, !1);
}
// @__NO_SIDE_EFFECTS__
function derived(computes, table) {
  for (let key2 in computes) {
    let compute = computes[key2];
    Object.defineProperty(table, key2, {
      configurable: !0,
      enumerable: !0,
      get() {
        return own(this, key2, compute(this));
      },
      set(value3) {
        own(this, key2, value3);
      }
    });
  }
  return table;
}
function defineBound(proto, key2, fn) {
  Object.defineProperty(proto, key2, {
    configurable: !0,
    get() {
      return this == null ? fn : own(this, key2, fn.bind(this));
    },
    set(value3) {
      own(this, key2, value3);
    }
  });
}
function claim(inst, sentinel) {
  let proto = Object.getPrototypeOf(inst);
  return sentinel in proto ? void 0 : proto;
}
var installing, broke = !1, breaker = {
  configurable: !0,
  get() {
    broke = !0;
  }
};
function defineLazyInternal(inst, key2, compute) {
  let proto = Object.getPrototypeOf(inst._zod);
  if (key2 in proto && installing !== inst._zod) {
    installing = void 0;
    return;
  }
  installing = inst._zod, Object.defineProperty(proto, key2, {
    configurable: !0,
    get() {
      Object.defineProperty(this, key2, breaker);
      let outer = broke;
      broke = !1;
      try {
        let value3 = compute(this);
        return broke ? delete this[key2] : Object.defineProperty(this, key2, { configurable: !0, writable: !0, value: value3 }), broke = broke || outer, value3;
      } catch (err) {
        throw delete this[key2], broke = broke || outer, err;
      }
    },
    set(value3) {
      Object.defineProperty(this, key2, { configurable: !0, writable: !0, value: value3 });
    }
  });
}
function installLazyProp(inst, key2, make, enumerable) {
  let proto = claim(inst, key2);
  proto && Object.defineProperty(proto, key2, {
    configurable: !0,
    get() {
      let desc = { configurable: !0, writable: !0, enumerable, value: void 0 };
      return Object.defineProperty(this, key2, desc), desc.value = make(this), Object.defineProperty(this, key2, desc), desc.value;
    },
    set(value3) {
      Object.defineProperty(this, key2, { configurable: !0, writable: !0, enumerable, value: value3 });
    }
  });
}
var CONSTANT_CATCH = "~constantCatch";
function constantCatch(value3) {
  let fn = () => value3;
  return fn[CONSTANT_CATCH] = !0, fn;
}

// node_modules/zod/v4/core/core.js
var _a, NEVER = /* @__PURE__ */ Object.freeze({
  status: "aborted"
}), _zodDesc = { value: void 0, enumerable: !1 }, _E = "captureStackTrace" in Error ? Error : null;
function newError(Definition) {
  let E2 = _E;
  if (E2) {
    let saved = E2.stackTraceLimit;
    if (typeof saved == "number") {
      try {
        E2.stackTraceLimit = 0;
      } catch {
        return _E = null, new Definition();
      }
      try {
        return new Definition();
      } finally {
        E2.stackTraceLimit = saved;
      }
    }
  }
  return new Definition();
}
// @__NO_SIDE_EFFECTS__
function $constructor(name2, initializer3, proto, params2) {
  let zodProto = {};
  function Internals(def2) {
    this.def = def2, this.constr = _, this.traits = /* @__PURE__ */ new Set();
  }
  Internals.prototype = zodProto;
  let protoMembers = proto, initialized = protoMembers && /* @__PURE__ */ new WeakSet();
  function init2(inst, def2) {
    if (inst._zod) {
      if (inst._zod.traits.has(name2))
        return;
    } else {
      _zodDesc.value = new Internals(def2);
      try {
        Object.defineProperty(inst, "_zod", _zodDesc);
      } finally {
        _zodDesc.value = void 0;
      }
    }
    if (inst._zod.traits.add(name2), initializer3(inst, def2), initialized) {
      let own3 = Object.getPrototypeOf(inst), ctorProto = inst._zod.constr.prototype, up = own3;
      for (; up && up !== ctorProto; )
        up = Object.getPrototypeOf(up);
      let target3 = up ?? own3;
      initialized.has(target3) || (initialized.add(target3), members(target3, protoMembers));
    }
    let proto2 = _.prototype;
    for (let k in proto2)
      Object.prototype.hasOwnProperty.call(proto2, k) && (k in inst || (inst[k] = proto2[k].bind(inst)));
  }
  let Parent = params2?.Parent ?? Object;
  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name2 });
  function _(def2) {
    let inst = params2?.Parent ? newError(Definition) : this;
    init2(inst, def2);
    let deferred = inst._zod.deferred;
    if (deferred) {
      for (let fn of deferred)
        fn();
      inst._zod.deferred = void 0;
    }
    let pp = globalThis.__zod_globalConfig?.postProcessor;
    return pp && pp(inst), inst;
  }
  return Object.defineProperty(_, "init", { value: init2 }), Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => params2?.Parent && inst instanceof params2.Parent ? !0 : inst?._zod?.traits?.has(name2)
  }), Object.defineProperty(_, "name", { value: name2 }), _;
}
var $brand = /* @__PURE__ */ Symbol("zod_brand"), $ZodAsyncError = class extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}, $ZodEncodeError = class extends Error {
  constructor(name2) {
    super(`Encountered unidirectional transform during encode: ${name2}`), this.name = "ZodEncodeError";
  }
};
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
  return newConfig && Object.assign(globalConfig, newConfig), globalConfig;
}

// node_modules/zod/v4/core/errors.js
function _getMessage() {
  let internals = this._zod;
  return internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2)), internals.message;
}
function _setMessage(value3) {
  this._zod.message = value3;
}
var _messageDesc = {
  get: _getMessage,
  set: _setMessage,
  enumerable: !0,
  configurable: !0
}, _issuesDesc = { value: void 0, enumerable: !1 }, _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), initializer = (inst, def2) => {
  inst.name = "$ZodError", _issuesDesc.value = def2, Object.defineProperty(inst, "issues", _issuesDesc), _issuesDesc.value = void 0, Object.defineProperty(inst, "message", _messageDesc);
  let proto = Object.getPrototypeOf(inst);
  _installedToString.has(proto) || (_installedToString.add(proto), Object.defineProperty(proto, "toString", {
    configurable: !0,
    enumerable: !1,
    get() {
      let value3 = () => this.message;
      return Object.defineProperty(this, "toString", { value: value3, configurable: !0, writable: !0 }), value3;
    },
    set(value3) {
      Object.defineProperty(this, "toString", { value: value3, configurable: !0, writable: !0 });
    }
  }));
}, $ZodError = $constructor("$ZodError", initializer), $ZodRealError = $constructor("$ZodError", initializer, void 0, {
  Parent: Error
});
function node(obj, key2, make) {
  return Object.prototype.hasOwnProperty.call(obj, key2) || (key2 === "__proto__" ? Object.defineProperty(obj, key2, { value: make(), writable: !0, enumerable: !0, configurable: !0 }) : obj[key2] = make()), obj[key2];
}
function flattenError(error64, mapper = (issue2) => issue2.message) {
  let fieldErrors = {}, formErrors = [];
  for (let sub of error64.issues)
    sub.path.length > 0 ? node(fieldErrors, sub.path[0], () => []).push(mapper(sub)) : formErrors.push(mapper(sub));
  return { formErrors, fieldErrors };
}
function formatError(error64, mapper = (issue2) => issue2.message) {
  let fieldErrors = { _errors: [] }, processError = (error65, path3 = []) => {
    for (let issue2 of error65.issues)
      if (issue2.code === "invalid_union" && issue2.errors.length)
        issue2.errors.map((issues) => processError({ issues }, [...path3, ...issue2.path]));
      else if (issue2.code === "invalid_key")
        processError({ issues: issue2.issues }, [...path3, ...issue2.path]);
      else if (issue2.code === "invalid_element")
        processError({ issues: issue2.issues }, [...path3, ...issue2.path]);
      else {
        let fullpath = [...path3, ...issue2.path];
        if (fullpath.length === 0)
          fieldErrors._errors.push(mapper(issue2));
        else {
          let curr = fieldErrors, i = 0;
          for (; i < fullpath.length; ) {
            let el = fullpath[i], terminal = i === fullpath.length - 1;
            if (el === "_errors") {
              terminal && curr._errors.push(mapper(issue2)), i++;
              continue;
            }
            Object.prototype.hasOwnProperty.call(curr, el) || Object.defineProperty(curr, el, {
              value: { _errors: [] },
              enumerable: !0,
              writable: !0,
              configurable: !0
            });
            let node2 = curr[el];
            terminal && node2._errors.push(mapper(issue2)), curr = node2, i++;
          }
        }
      }
  };
  return processError(error64), fieldErrors;
}
function treeifyError(error64, mapper = (issue2) => issue2.message) {
  let result = { errors: [] }, processError = (error65, path3 = []) => {
    var _a3;
    for (let issue2 of error65.issues)
      if (issue2.code === "invalid_union" && issue2.errors.length)
        issue2.errors.map((issues) => processError({ issues }, [...path3, ...issue2.path]));
      else if (issue2.code === "invalid_key")
        processError({ issues: issue2.issues }, [...path3, ...issue2.path]);
      else if (issue2.code === "invalid_element")
        processError({ issues: issue2.issues }, [...path3, ...issue2.path]);
      else {
        let fullpath = [...path3, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result, i = 0;
        for (; i < fullpath.length; ) {
          let el = fullpath[i], terminal = i === fullpath.length - 1;
          typeof el == "string" ? (curr.properties ?? (curr.properties = {}), Object.prototype.hasOwnProperty.call(curr.properties, el) || Object.defineProperty(curr.properties, el, {
            value: { errors: [] },
            enumerable: !0,
            writable: !0,
            configurable: !0
          }), curr = curr.properties[el]) : (curr.items ?? (curr.items = []), (_a3 = curr.items)[el] ?? (_a3[el] = { errors: [] }), curr = curr.items[el]), terminal && curr.errors.push(mapper(issue2)), i++;
        }
      }
  };
  return processError(error64), result;
}
function toDotPath(_path) {
  let segs = [], path3 = _path.map((seg) => typeof seg == "object" ? seg.key : seg);
  for (let seg of path3)
    typeof seg == "number" ? segs.push(`[${seg}]`) : typeof seg == "symbol" ? segs.push(`[${JSON.stringify(String(seg))}]`) : /[^\w$]/.test(seg) ? segs.push(`[${JSON.stringify(seg)}]`) : (segs.length && segs.push("."), segs.push(seg));
  return segs.join("");
}
function prettifyError(error64) {
  let lines = [], issues = [...error64.issues].sort((a, b10) => (a.path ?? []).length - (b10.path ?? []).length);
  for (let issue2 of issues)
    lines.push(`\u2716 ${issue2.message}`), issue2.path?.length && lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
  return lines.join(`
`);
}

// node_modules/zod/v4/core/parse.js
function finalizeParams(callee, params2) {
  return { callee: params2?.callee ?? callee, Err: params2?.Err };
}
var _parse = (_Err) => {
  let fn = (schema, value3, _ctx, _params) => {
    let ctx = _ctx ? { ..._ctx, async: !1 } : { async: !1 }, result = schema._zod.run({ value: value3, issues: [] }, ctx);
    if (result instanceof Promise)
      throw new $ZodAsyncError();
    if (result.issues.length) {
      let e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      throw captureStackTrace(e, _params?.callee ?? fn), e;
    }
    return result.value;
  };
  return fn;
}, parse = /* @__PURE__ */ _parse($ZodRealError), _parseAsync = (_Err) => {
  let fn = async (schema, value3, _ctx, params2) => {
    let ctx = _ctx ? { ..._ctx, async: !0 } : { async: !0 }, result = schema._zod.run({ value: value3, issues: [] }, ctx);
    if (result instanceof Promise && (result = await result), result.issues.length) {
      let e = new (params2?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      throw captureStackTrace(e, params2?.callee ?? fn), e;
    }
    return result.value;
  };
  return fn;
}, parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError), _safeParse = (_Err) => (schema, value3, _ctx) => {
  let ctx = _ctx ? { ..._ctx, async: !1 } : { async: !1 }, result = schema._zod.run({ value: value3, issues: [] }, ctx);
  if (result instanceof Promise)
    throw new $ZodAsyncError();
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: !0, data: result.value };
}, safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
function failure(Err, issues, ctx) {
  let error64;
  return {
    success: !1,
    get error() {
      return error64 || (error64 = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config()))), issues = void 0, ctx = void 0), error64;
    },
    set error(e) {
      error64 = e, issues = void 0, ctx = void 0;
    }
  };
}
var _safeParseAsync = (_Err) => async (schema, value3, _ctx) => {
  let ctx = _ctx ? { ..._ctx, async: !0 } : { async: !0 }, result = schema._zod.run({ value: value3, issues: [] }, ctx);
  return result instanceof Promise && (result = await result), result.issues.length ? failure(_Err, result.issues, ctx) : { success: !0, data: result.value };
}, safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError), COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), validate = ((schema, value3, _ctx) => {
  let validator = schema._zod.bag.validator;
  if (validator !== void 0) {
    if (validator(value3) !== COMPILE_INVALID)
      return !0;
    if (validator.definite === !0 && _ctx === void 0)
      return !1;
  }
  return validateFallback(schema, value3, _ctx);
});
function validateFallback(schema, value3, _ctx) {
  let ctx = _ctx ? { ..._ctx, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 }, fallbackRun = schema._zod.bag.fallbackRun, result;
  if (fallbackRun ? (ctx[COMPILE_FALLBACK] = !0, result = fallbackRun({ value: value3, issues: [] }, ctx)) : result = schema._zod.run({ value: value3, issues: [] }, ctx), result instanceof Promise)
    throw new $ZodAsyncError();
  return result.issues.length === 0;
}
var validateAsync = async (schema, value3, _ctx) => {
  let ctx = _ctx ? { ..._ctx, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 }, result = schema._zod.run({ value: value3, issues: [] }, ctx);
  return result instanceof Promise && (result = await result), result.issues.length === 0;
}, _encode = (_Err) => {
  let parse9 = _parse(_Err), fn = (schema, value3, _ctx, _params) => {
    let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return parse9(schema, value3, ctx, finalizeParams(fn, _params));
  };
  return fn;
}, encode = /* @__PURE__ */ _encode($ZodRealError), _decode = (_Err) => {
  let parse9 = _parse(_Err), fn = (schema, value3, _ctx, _params) => parse9(schema, value3, _ctx, finalizeParams(fn, _params));
  return fn;
}, decode = /* @__PURE__ */ _decode($ZodRealError), _encodeAsync = (_Err) => {
  let parseAsync3 = _parseAsync(_Err), fn = async (schema, value3, _ctx, _params) => {
    let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return await parseAsync3(schema, value3, ctx, finalizeParams(fn, _params));
  };
  return fn;
}, encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError), _decodeAsync = (_Err) => {
  let parseAsync3 = _parseAsync(_Err), fn = async (schema, value3, _ctx, _params) => await parseAsync3(schema, value3, _ctx, finalizeParams(fn, _params));
  return fn;
}, decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError), _safeEncode = (_Err) => (schema, value3, _ctx) => {
  let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParse(_Err)(schema, value3, ctx);
}, safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError), _safeDecode = (_Err) => (schema, value3, _ctx) => _safeParse(_Err)(schema, value3, _ctx), safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError), _safeEncodeAsync = (_Err) => async (schema, value3, _ctx) => {
  let ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value3, ctx);
}, safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError), _safeDecodeAsync = (_Err) => async (schema, value3, _ctx) => _safeParseAsync(_Err)(schema, value3, _ctx), safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);

// node_modules/zod/v4/core/regexes.js
var regexes_exports = {};
__export(regexes_exports, {
  anyString: () => anyString,
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint,
  boolean: () => boolean,
  browserEmail: () => browserEmail,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  creditCard: () => creditCard,
  cuid: () => cuid,
  cuid2: () => cuid2,
  currencyCode: () => currencyCode,
  date: () => date,
  datetime: () => datetime,
  domain: () => domain,
  duration: () => duration,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  extendedDuration: () => extendedDuration,
  guid: () => guid,
  hex: () => hex,
  hostname: () => hostname,
  html5Email: () => html5Email,
  httpProtocol: () => httpProtocol,
  iban: () => iban,
  idnEmail: () => idnEmail,
  integer: () => integer,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  ksuid: () => ksuid,
  lowercase: () => lowercase,
  mac: () => mac,
  md5_base64: () => md5_base64,
  md5_base64url: () => md5_base64url,
  md5_hex: () => md5_hex,
  nanoid: () => nanoid,
  nanoidOfLength: () => nanoidOfLength,
  null: () => _null,
  number: () => number,
  rfc5322Email: () => rfc5322Email,
  sha1_base64: () => sha1_base64,
  sha1_base64url: () => sha1_base64url,
  sha1_hex: () => sha1_hex,
  sha256_base64: () => sha256_base64,
  sha256_base64url: () => sha256_base64url,
  sha256_hex: () => sha256_hex,
  sha384_base64: () => sha384_base64,
  sha384_base64url: () => sha384_base64url,
  sha384_hex: () => sha384_hex,
  sha512_base64: () => sha512_base64,
  sha512_base64url: () => sha512_base64url,
  sha512_hex: () => sha512_hex,
  string: () => string,
  time: () => time,
  ulid: () => ulid,
  undefined: () => _undefined,
  unicodeEmail: () => unicodeEmail,
  uppercase: () => uppercase,
  uuid: () => uuid,
  uuid4: () => uuid4,
  uuid6: () => uuid6,
  uuid7: () => uuid7,
  xid: () => xid
});
var cuid = /^[cC][0-9a-z]{6,}$/, cuid2 = /^[0-9a-z]+$/, ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, xid = /^[0-9a-vA-V]{20}$/, ksuid = /^[A-Za-z0-9]{27}$/, nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length3) {
  return new RegExp(`^[a-zA-Z0-9_-]{${length3}}$`);
}
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, uuid = (version3) => version3 ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version3}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, uuid4 = /* @__PURE__ */ uuid(4), uuid6 = /* @__PURE__ */ uuid(6), uuid7 = /* @__PURE__ */ uuid(7), email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u, idnEmail = unicodeEmail, browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, _emoji = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, mac = (delimiter) => {
  let escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
}, cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, domain = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/, httpProtocol = /^https?$/, e164 = /^\+[1-9]\d{6,14}$/, creditCard = /^\d(?:[ -]?\d){11,18}$/, currencyCode = /^(?:AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XCG|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWG)$/, iban = /^[A-Z]{2}(?!00|01|99)\d{2}[A-Z0-9]{11,30}$/, dateSource = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function anchor(source4) {
  return new RegExp(`^${source4}$`);
}
var date = /* @__PURE__ */ anchor(dateSource);
function timeSource(args) {
  let hhmm = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof args.precision == "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  let opts = ["Z"];
  args.offset && opts.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  let qualified = `${timeSource({ precision: args.precision, seconds: !0 })}(?:${opts.join("|")})`, timeRegex2 = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
  return new RegExp(`^${dateSource}T(?:${timeRegex2})$`);
}
var anyString = /^[\s\S]{0,}$/, string = (params2) => {
  let regex = params2 ? `[\\s\\S]{${params2?.minimum ?? 0},${params2?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${regex}$`);
}, bigint = /^-?\d+n?$/, integer = /^-?\d+$/, number = /^-?\d+(?:\.\d+)?$/, boolean = /^(?:true|false)$/i, _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/, uppercase = /^[^a-z]*$/, hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding3) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding3}$`);
}
function fixedBase64url(length3) {
  return new RegExp(`^[A-Za-z0-9_-]{${length3}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/, md5_base64 = /* @__PURE__ */ fixedBase64(22, "=="), md5_base64url = /* @__PURE__ */ fixedBase64url(22), sha1_hex = /^[0-9a-fA-F]{40}$/, sha1_base64 = /* @__PURE__ */ fixedBase64(27, "="), sha1_base64url = /* @__PURE__ */ fixedBase64url(27), sha256_hex = /^[0-9a-fA-F]{64}$/, sha256_base64 = /* @__PURE__ */ fixedBase64(43, "="), sha256_base64url = /* @__PURE__ */ fixedBase64url(43), sha384_hex = /^[0-9a-fA-F]{96}$/, sha384_base64 = /* @__PURE__ */ fixedBase64(64, ""), sha384_base64url = /* @__PURE__ */ fixedBase64url(64), sha512_hex = /^[0-9a-fA-F]{128}$/, sha512_base64 = /* @__PURE__ */ fixedBase64(86, "=="), sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def2) => {
  var _a3;
  inst._zod ?? (inst._zod = {}), inst._zod.def = def2, (_a3 = inst._zod).onattach ?? (_a3.onattach = []);
}), _whenHasSize = (payload) => {
  let val = payload.value;
  return !nullish(val) && val.size !== void 0;
}, _whenHasLength = (payload) => {
  let val = payload.value;
  return !nullish(val) && val.length !== void 0;
}, numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def2) => {
  $ZodCheck.init(inst, def2);
  let origin = numericOriginMap[typeof def2.value];
  inst._zod.check = (payload) => {
    (def2.inclusive ? payload.value <= def2.value : payload.value < def2.value) || payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_big",
      maximum: typeof def2.value == "object" ? def2.value.getTime() : def2.value,
      input: payload.value,
      inclusive: def2.inclusive,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def2) => {
  $ZodCheck.init(inst, def2);
  let origin = numericOriginMap[typeof def2.value];
  inst._zod.check = (payload) => {
    (def2.inclusive ? payload.value >= def2.value : payload.value > def2.value) || payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_small",
      minimum: typeof def2.value == "object" ? def2.value.getTime() : def2.value,
      input: payload.value,
      inclusive: def2.inclusive,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def2) => {
  $ZodCheck.init(inst, def2), inst._zod.check = (payload) => {
    if (typeof payload.value != typeof def2.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof payload.value == "bigint" ? (
      // `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
      def2.value !== BigInt(0) && payload.value % def2.value === BigInt(0)
    ) : floatSafeRemainder2(payload.value, def2.value) === 0) || payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def2.value,
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def2) => {
  $ZodCheck.init(inst, def2), def2.format = def2.format || "float64";
  let isInt = def2.format?.includes("int"), origin = isInt ? "int" : "number", [minimum, maximum] = NUMBER_FORMAT_RANGES[def2.format];
  inst._zod.check = (payload) => {
    let input2 = payload.value;
    if (isInt) {
      if (!Number.isInteger(input2)) {
        payload.issues.push({
          expected: origin,
          format: def2.format,
          code: "invalid_type",
          continue: !1,
          input: input2,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input2)) {
        input2 > 0 ? payload.issues.push({
          input: input2,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst,
          origin,
          inclusive: !0,
          continue: !def2.abort
        }) : payload.issues.push({
          input: input2,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst,
          origin,
          inclusive: !0,
          continue: !def2.abort
        });
        return;
      }
    }
    input2 < minimum && payload.issues.push({
      origin: "number",
      input: input2,
      code: "too_small",
      minimum,
      inclusive: !0,
      inst,
      continue: !def2.abort
    }), input2 > maximum && payload.issues.push({
      origin: "number",
      input: input2,
      code: "too_big",
      maximum,
      inclusive: !0,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def2) => {
  $ZodCheck.init(inst, def2);
  let [minimum, maximum] = BIGINT_FORMAT_RANGES[def2.format];
  inst._zod.check = (payload) => {
    let input2 = payload.value;
    input2 < minimum && payload.issues.push({
      origin: "bigint",
      input: input2,
      code: "too_small",
      minimum,
      inclusive: !0,
      inst,
      continue: !def2.abort
    }), input2 > maximum && payload.issues.push({
      origin: "bigint",
      input: input2,
      code: "too_big",
      maximum,
      inclusive: !0,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def2) => {
  var _a3;
  $ZodCheck.init(inst, def2), (_a3 = inst._zod.def).when ?? (_a3.when = _whenHasSize), inst._zod.check = (payload) => {
    let input2 = payload.value;
    input2.size <= def2.maximum || payload.issues.push({
      origin: getSizableOrigin(input2),
      code: "too_big",
      maximum: def2.maximum,
      inclusive: !0,
      input: input2,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def2) => {
  var _a3;
  $ZodCheck.init(inst, def2), (_a3 = inst._zod.def).when ?? (_a3.when = _whenHasSize), inst._zod.check = (payload) => {
    let input2 = payload.value;
    input2.size >= def2.minimum || payload.issues.push({
      origin: getSizableOrigin(input2),
      code: "too_small",
      minimum: def2.minimum,
      inclusive: !0,
      input: input2,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def2) => {
  var _a3;
  $ZodCheck.init(inst, def2), (_a3 = inst._zod.def).when ?? (_a3.when = _whenHasSize), inst._zod.check = (payload) => {
    let input2 = payload.value, size = input2.size;
    if (size === def2.size)
      return;
    let tooBig = size > def2.size;
    payload.issues.push({
      origin: getSizableOrigin(input2),
      ...tooBig ? { code: "too_big", maximum: def2.size } : { code: "too_small", minimum: def2.size },
      inclusive: !0,
      exact: !0,
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def2) => {
  var _a3;
  $ZodCheck.init(inst, def2), (_a3 = inst._zod.def).when ?? (_a3.when = _whenHasLength), inst._zod.check = (payload) => {
    let input2 = payload.value, units = input2.length;
    if ((typeof input2 == "string" && units > def2.maximum ? codePointLength(input2) : units) <= def2.maximum)
      return;
    let origin = getLengthableOrigin(input2);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def2.maximum,
      inclusive: !0,
      input: input2,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def2) => {
  var _a3;
  $ZodCheck.init(inst, def2), (_a3 = inst._zod.def).when ?? (_a3.when = _whenHasLength), inst._zod.check = (payload) => {
    let input2 = payload.value, units = input2.length;
    if ((typeof input2 == "string" && units >= def2.minimum && units < def2.minimum * 2 ? codePointLength(input2) : units) >= def2.minimum)
      return;
    let origin = getLengthableOrigin(input2);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def2.minimum,
      inclusive: !0,
      input: input2,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def2) => {
  var _a3;
  $ZodCheck.init(inst, def2), (_a3 = inst._zod.def).when ?? (_a3.when = _whenHasLength), inst._zod.check = (payload) => {
    let input2 = payload.value, units = input2.length, length3 = typeof input2 == "string" && units >= def2.length && units <= def2.length * 2 ? codePointLength(input2) : units;
    if (length3 === def2.length)
      return;
    let origin = getLengthableOrigin(input2), tooBig = length3 > def2.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def2.length } : { code: "too_small", minimum: def2.length },
      inclusive: !0,
      exact: !0,
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def2) => {
  var _a3, _b;
  $ZodCheck.init(inst, def2), def2.pattern ? (_a3 = inst._zod).check ?? (_a3.check = (payload) => {
    def2.pattern.lastIndex = 0, !def2.pattern.test(payload.value) && payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: def2.format,
      input: payload.value,
      ...def2.pattern ? { pattern: def2.pattern.toString() } : {},
      inst,
      continue: !def2.abort
    });
  }) : (_b = inst._zod).check ?? (_b.check = () => {
  });
}), $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def2) => {
  $ZodCheckStringFormat.init(inst, def2), inst._zod.check = (payload) => {
    def2.pattern.lastIndex = 0, !def2.pattern.test(payload.value) && payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def2.pattern.toString(),
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def2) => {
  def2.pattern ?? (def2.pattern = lowercase), $ZodCheckStringFormat.init(inst, def2);
}), $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def2) => {
  def2.pattern ?? (def2.pattern = uppercase), $ZodCheckStringFormat.init(inst, def2);
}), $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def2) => {
  $ZodCheck.init(inst, def2);
  let escapedRegex = escapeRegex(def2.includes), pattern = new RegExp(typeof def2.position == "number" ? `^.{${def2.position},}${escapedRegex}` : escapedRegex);
  def2.pattern = pattern, inst._zod.check = (payload) => {
    payload.value.includes(def2.includes, def2.position) || payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def2.includes,
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def2) => {
  $ZodCheck.init(inst, def2);
  let pattern = new RegExp(`^${escapeRegex(def2.prefix)}.*`);
  def2.pattern ?? (def2.pattern = pattern), inst._zod.check = (payload) => {
    payload.value.startsWith(def2.prefix) || payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def2.prefix,
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def2) => {
  $ZodCheck.init(inst, def2);
  let pattern = new RegExp(`.*${escapeRegex(def2.suffix)}$`);
  def2.pattern ?? (def2.pattern = pattern), inst._zod.check = (payload) => {
    payload.value.endsWith(def2.suffix) || payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def2.suffix,
      input: payload.value,
      inst,
      continue: !def2.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property2) {
  result.issues.length && payload.issues.push(...prefixIssues(property2, result.issues));
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def2) => {
  $ZodCheck.init(inst, def2), inst._zod.check = (payload) => {
    let result = def2.schema._zod.run({
      value: payload.value[def2.property],
      issues: []
    }, {});
    if (result instanceof Promise)
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def2.property));
    handleCheckPropertyResult(result, payload, def2.property);
  };
}), $ZodCheckProperties = /* @__PURE__ */ $constructor("$ZodCheckProperties", (inst, def2) => {
  $ZodCheck.init(inst, def2), hide(inst, Symbol.iterator, function* () {
    yield inst;
  });
  let entries2;
  inst._zod.check = (payload) => {
    if (payload.value == null) {
      payload.issues.push({ expected: "object", code: "invalid_type", input: payload.value, inst });
      return;
    }
    entries2 ?? (entries2 = Reflect.ownKeys(def2.shape).map((key2) => [key2, def2.shape[key2]]));
    let input2 = payload.value, proms;
    for (let [key2, schema] of entries2) {
      let result = schema._zod.run({ value: input2[key2], issues: [] }, {});
      result instanceof Promise ? (proms ?? (proms = []), proms.push(result.then((result2) => handleCheckPropertyResult(result2, payload, key2)))) : handleCheckPropertyResult(result, payload, key2);
    }
    if (proms)
      return Promise.all(proms).then(() => {
      });
  };
}), $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def2) => {
  $ZodCheck.init(inst, def2);
  let mimeSet = new Set(def2.mime);
  inst._zod.check = (payload) => {
    mimeSet.has(payload.value.type) || payload.issues.push({
      code: "invalid_value",
      values: def2.mime,
      input: payload.value.type,
      inst,
      continue: !def2.abort
    });
  };
}), $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def2) => {
  $ZodCheck.init(inst, def2), inst._zod.check = (payload) => {
    payload.value = def2.tx(payload.value);
  };
});

// node_modules/zod/v4/core/doc.js
var Doc = class {
  constructor(args = [], closed = {}) {
    this.content = [], this.indent = 0, this.args = args, this.closed = closed;
  }
  // the compiler catches a child's throw and keeps writing into this doc, so the indent has to unwind with it
  indented(fn) {
    this.indent += 1;
    try {
      fn(this);
    } finally {
      this.indent -= 1;
    }
  }
  write(arg) {
    if (typeof arg == "function") {
      arg(this, { execution: "sync" }), arg(this, { execution: "async" });
      return;
    }
    let lines = arg.split(`
`).filter((x5) => x5), minIndent = Math.min(...lines.map((x5) => x5.length - x5.trimStart().length)), dedented = lines.map((x5) => x5.slice(minIndent)).map((x5) => " ".repeat(this.indent * 2) + x5);
    for (let line4 of dedented)
      this.content.push(line4);
  }
  compile() {
    let F = Function, content2 = this?.content ?? [""];
    return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${content2.join(`
`)}
};`)(...Object.values(this.closed));
  }
};

// node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 6,
  patch: 5
};

// node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def2) => {
  var _a3;
  inst ?? (inst = {}), inst._zod.def = def2, inst._zod.bag = inst._zod.bag || {}, inst._zod.version = version;
  let defChecks = inst._zod.def.checks, checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
  for (let ch2 of checks)
    for (let fn of ch2._zod.onattach)
      fn(inst);
  if (checks.length === 0)
    (_a3 = inst._zod).deferred ?? (_a3.deferred = []), inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  else {
    let runChecks = (payload, checks2, ctx) => {
      if (payload.memo)
        return payload;
      let isAborted2 = aborted(payload), asyncResult;
      for (let ch2 of checks2) {
        if (ch2._zod.def.when) {
          if (explicitlyAborted(payload) || !ch2._zod.def.when(payload))
            continue;
        } else if (isAborted2)
          continue;
        let currLen = payload.issues.length, _ = ch2._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === !1)
          throw new $ZodAsyncError();
        if (asyncResult || _ instanceof Promise)
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _, payload.issues.length !== currLen && (attachSchema(payload.issues, currLen, inst), isAborted2 || (isAborted2 = aborted(payload, currLen)));
          });
        else {
          if (payload.issues.length === currLen)
            continue;
          attachSchema(payload.issues, currLen, inst), isAborted2 || (isAborted2 = aborted(payload, currLen));
        }
      }
      return asyncResult ? asyncResult.then(() => payload) : payload;
    }, handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary))
        return canary.aborted = !0, canary;
      let checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === !1)
          throw new $ZodAsyncError();
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks)
        return inst._zod.parse(payload, ctx);
      if (ctx.direction === "backward") {
        let canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: !0 });
        return canary instanceof Promise ? canary.then((canary2) => handleCanaryResult(canary2, payload, ctx)) : handleCanaryResult(canary, payload, ctx);
      }
      let result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === !1)
          throw new $ZodAsyncError();
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
}, {
  // Wrappers extend this by installing a richer factory over it; reading it eagerly would defeat the laziness.
  get "~standard"() {
    return hide(this, "~standard", standardProps(this));
  },
  set "~standard"(value3) {
    own(this, "~standard", value3);
  }
}), toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
async function validateAsync2(inst, value3) {
  let ctx = { async: !0 };
  return toStandardResult(await inst._zod.run({ value: value3, issues: [] }, ctx), ctx);
}
function standardProps(inst) {
  return {
    validate: (value3) => {
      let ctx = { async: !1 };
      try {
        let r = inst._zod.run({ value: value3, issues: [] }, ctx);
        if (!(r instanceof Promise))
          return toStandardResult(r, ctx);
      } catch {
      }
      return validateAsync2(inst, value3);
    },
    vendor: "zod",
    version: 1
  };
}
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def2) => {
  $ZodType.init(inst, def2), inst._zod.pattern = def2.pattern ?? anyString, inst._zod.parse = (payload, _) => {
    if (def2.coerce)
      try {
        payload.value = String(payload.value);
      } catch {
      }
    return typeof payload.value == "string" || payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    }), payload;
  };
}), $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def2) => {
  $ZodCheckStringFormat.init(inst, def2), $ZodString.init(inst, def2);
}), $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def2) => {
  def2.pattern ?? (def2.pattern = guid), $ZodStringFormat.init(inst, def2);
}), $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def2) => {
  if (def2.version) {
    let v2 = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[def2.version];
    if (v2 === void 0)
      throw new Error(`Invalid UUID version: "${def2.version}"`);
    def2.pattern ?? (def2.pattern = uuid(v2));
  } else
    def2.pattern ?? (def2.pattern = uuid());
  $ZodStringFormat.init(inst, def2);
}), $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def2) => {
  def2.pattern ?? (def2.pattern = email), $ZodStringFormat.init(inst, def2);
}), URL_BAD_FORMAT = 1, URL_UNPARSEABLE = 2;
function canParseURL(input2) {
  try {
    return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(input2) : (new URL(input2), !0);
  } catch {
    return !1;
  }
}
function validateURL(trimmed, def2) {
  return !("normalize" in def2) && !("hostname" in def2) && !("protocol" in def2) ? canParseURL(trimmed) || URL_UNPARSEABLE : parseURLObject(trimmed, def2);
}
function parseURLObject(trimmed, def2) {
  if (!def2.normalize && def2.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed))
    return URL_BAD_FORMAT;
  try {
    if (typeof URL < "u") {
      let URLStatic = URL;
      if (typeof URLStatic.parse == "function")
        return URLStatic.parse(trimmed) ?? URL_UNPARSEABLE;
    }
    return new URL(trimmed);
  } catch {
    return URL_UNPARSEABLE;
  }
}
var asciiTabOrNewline = /[\t\n\r]/g;
function stripTabAndNewline(value3) {
  return value3.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url2, hostname5) {
  return hostname5.lastIndex = 0, hostname5.test(url2.hostname);
}
function urlProtocolOk(url2, protocol) {
  return protocol.lastIndex = 0, protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol);
}
// End of bundle text, part 2 of 15
export { $ZodAsyncError, $ZodCheck, $ZodCheckBigIntFormat, $ZodCheckEndsWith, $ZodCheckGreaterThan, $ZodCheckIncludes,
  $ZodCheckLengthEquals, $ZodCheckLessThan, $ZodCheckLowerCase, $ZodCheckMaxLength, $ZodCheckMaxSize,
  $ZodCheckMimeType, $ZodCheckMinLength, $ZodCheckMinSize, $ZodCheckMultipleOf, $ZodCheckNumberFormat,
  $ZodCheckOverwrite, $ZodCheckProperties, $ZodCheckProperty, $ZodCheckRegex, $ZodCheckSizeEquals,
  $ZodCheckStartsWith, $ZodCheckUpperCase, $ZodEmail, $ZodEncodeError, $ZodError, $ZodGUID, $ZodString,
  $ZodStringFormat, $ZodType, $ZodUUID, $brand, $constructor, BIGINT_FORMAT_RANGES, CONSTANT_CATCH, Doc, NEVER,
  NUMBER_FORMAT_RANGES, URL_BAD_FORMAT, URL_UNPARSEABLE, ZodFirstPartyTypeKind, _decode, _decodeAsync, _encode,
  _encodeAsync, _null, _parse, _parseAsync, _safeDecode, _safeDecodeAsync, _safeEncode, _safeEncodeAsync, _safeParse,
  _safeParseAsync, _undefined, aborted, allowsEval, assignProp, base64, base64url, basename7, bigint, boolean, cached,
  canParseURL, cidrv4, cidrv6, cleanRegex, clone, codePointLength, config, constantCatch, core_exports2, creditCard,
  cuid, cuid2, currencyCode, date, datetime, defineLazy, defineLazyInternal, dirname6, domain, duration, e164, emoji,
  esc, escapeRegex, fileURLToPath2, finalizeIssue, flattenError, floatSafeRemainder2, formatError, getEnumValues,
  globalConfig, hex, hostname, httpProtocol, iban, installLazyProp, integer, ipv4, ipv6, isObject, isPlainObject,
  issue, join15, joinValues, jsonStringifyReplacer, ksuid, lstat8, mac, mergeDefs, nanoid, nanoidOfLength,
  normalizeParams, number, objectType, optionalKeys, own, parse, parseAsync, parsedType, prefixIssues, prettifyError,
  primitiveTypes, propertyKeyTypes, rawShape, readFile7, realpath7, regexes_exports, require_ajv, require_dist,
  require_topojson_client, resolve8, safeParse, safeParseAsync, shallowClone, slugify, standardProps, string,
  stringifyPrimitive, stripTabAndNewline, time, toZod, treeifyError, ulid, urlHostnameOk, urlProtocolOk, util_exports,
  validate, validateAsync, validateURL, xid };
