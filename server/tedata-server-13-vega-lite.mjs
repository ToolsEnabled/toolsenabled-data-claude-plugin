// ToolsEnabled Data server, part 13 of 15: Vega-Lite, which compiles chart specs (lines 57845-63166 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-12-vega-lite.mjs";
import { array_default, hasOwnProperty, identity6, isArray, isBoolean, isNumber, isObject2, isString, mergeConfig,
  stringValue, writeConfig } from "./tedata-server-08-vega.mjs";
import { ADD_SAME_CHILD_TWICE, ANGLE, ARC, AREA, BAR, BAR_CORNER_RADIUS_INDEX, CHANNELS, CIRCLE, COLOR, COLUMN,
  DESCRIPTION, DETAIL, FACET, FACET_CHANNELS, FILL, FILLOPACITY, FIT_NON_SINGLE, HREF, IMAGE,
  INTERVAL_INITIALIZED_WITH_POS, KEY, LATITUDE, LATITUDE2, LEGEND_BINDINGS_MUST_HAVE_PROJECTION, LINE,
  LINE_WITH_VARYING_SIZE, LONGITUDE, LONGITUDE2, MARK_CONFIGS, MULTIPLE_TIMER_ANIMATION_SELECTION, NOMINAL,
  NONPOSITION_CHANNELS, OPACITY, ORDER, ORDINAL2, POINT, POSITION_SCALE_CHANNELS, PRIMITIVE_MARKS, QUANTITATIVE,
  RADIUS, RADIUS2, RECT, REPLACE_ANGLE_WITH_THETA, ROW, RULE, SCALE_BINDINGS_CONTINUOUS, SCALE_CATEGORY_INDEX,
  SECONDARY_RANGE_CHANNEL, SEQUENTIAL_SCALE_DEPRECATED, SHAPE, SIZE2, SQUARE, STROKE, STROKEDASH, STROKEOPACITY,
  STROKEWIDTH, SUM_OPS, ScaleType, TEMPORAL, TEXT, TEXT$1, THETA, THETA2, TICK, TIME, TOOLTIP, UNIT_CHANNELS, URL2,
  VG_MARK_CONFIGS, VG_MARK_INDEX, VL_ONLY_MARK_CONFIG_PROPERTIES, VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX, X23,
  X3, XOFFSET, Y23, Y3, YOFFSET, accessWithDatumToUnescapedPath, autoMaxBins, binFormatExpression, binSizeExpr,
  cannotApplySizeToNonOrientedMark, cannotProjectAggregate, cannotProjectOnChannelWithoutField, cannotStackRangedMark,
  cannotUseRelativeBandSizeWithNonBandScale, channelDefType, channelRequiredForBinned, channelShouldBeDiscrete,
  channelShouldBeDiscreteOrDiscretizing, channelShouldNotBeUsedForBinned, columnsNotSupportByRowCol,
  containerSizeNonSingle, containerSizeNotCompatibleWithAutosize, contains2, customFormatTypeNotAllowed,
  dateTimeToExpr, dateTimeToTimestamp, deepEqual, defaultBarConfig, defaultMarkConfig, defaultRectConfig,
  defaultScaleConfig, defaultTickConfig, droppingColor, duplicate, durationExpr, emptyFieldDef, entries$1,
  errorBand1DNotSupport, errorBarCenterAndExtentAreNotNeeded, errorBarCenterIsUsedWithWrongExtent,
  errorBarContinuousAxisHasCustomizedAggregate, eventSelector, exprFromValueRefOrSignalRef, extractTitleConfig,
  facetChannelDropped, fieldFilterExpression, fieldValidPredicate, formatSignalRef, getBandPosition, getBandSize,
  getConditionalValueRefForIncludingInvalidValue, getDateTimePartAndStep, getFirstDefined, getFullName,
  getMainChannelFromOffsetChannel, getMainRangeChannel, getMarkConfig, getMarkPropOrConfig, getMarkStyleConfig,
  getMarkType, getOffsetChannel, getOffsetScaleChannel, getPositionChannelFromLatLong, getPositionScaleChannel,
  getScaleInvalidDataMode, getSecondaryRangeChannel, getSizeChannel, getSmallestTimeUnitPart, getStyleConfig,
  getTimeUnitParts, getVgPositionChannel, hasConditionalFieldDef, hasConditionalFieldOrDatumDef, hasContinuousDomain,
  hasDiscreteDomain, hasProperty, hash5, incompatibleChannel, independentScaleMeansIndependentGuide,
  interpolatedSignalRef, invalidAggregate, invalidEncodingChannel, invalidFieldTypeForCountAggregate, invalidSpec,
  isAggregateOp, isArgmaxDef, isArgminDef, isBinParams, isBinned, isBinnedTimeUnit, isBinning, isChannel,
  isConditionalDef, isConditionalParameter, isContinuous2, isContinuousFieldOrDatumDef, isCountingAggregateOp,
  isCustomFormatType, isDateTime, isDatumDef, isDiscrete$1, isDiscrete2, isDiscretizing2, isEmpty, isExprRef,
  isFacetFieldDef, isFacetMapping, isFacetSpec, isFieldDef, isFieldOrDatumDef, isGeoPositionChannel,
  isLocalSingleTimeUnit, isMarkDef, isMarkPropFieldOrDatumDef, isNonPositionScaleChannel, isNumericDataDef,
  isOrderOnlyDef, isPathMark, isPolarPositionChannel, isPositionFieldOrDatumDef, isPrimitive, isQuantitative,
  isRectBasedMark, isRelativeBandSize, isRepeatRef, isScaleChannel, isScaleFieldDef, isSecondaryRangeChannel,
  isSelectionPredicate, isSignalRef, isSingleDefUnitChannel, isSortArray, isSortByChannel, isSortField,
  isSortableFieldDef, isStringFieldOrDatumDef, isText, isTypedFieldDef, isUnbinnedQuantitativeFieldOrDatumDef,
  isValueDef, isVgRangeStep, isXorY, isXorYOffset, keys3, lineWithRange, logicalExpr, mergeConflictingProperty,
  mergeTitle, mergeTitleFieldDefs, midPoint, midPointRefWithPositionInvalidTest, nearestNotSupportForContinuous,
  noSuchRepeatedValue, normalizeAngle, normalizeInvalidDataMode, normalizeLogicalComposition, normalizePredicate$1,
  normalizeTimeUnit, offsetNestedInsideContinuousPositionScaleDropped, omit2, orientOverridden, parser3, pick4,
  primitiveChannelDef, projectionOverridden, rangeMarkAlignmentCannotBeExpression, relativeBandSizeNotSupported,
  removePathFromField, replaceAll, replaceExprRef, replacePathInField, scaledZeroOrMinOrMax,
  selectionAsScaleDomainWithoutField, selectionAsScaleDomainWrongEncodings, selectionNotSupported, shouldBreakPath,
  signalOrStringValue, signalOrValueRef, signalOrValueRefWithCondition, signalRefOrValue, some, stackNonLinearScale,
  stackNonSummativeAggregate, stringify, supportMark, titleCase, titleFormatter, toFieldDefBase, toStringFieldDef,
  unescapeSingleQuoteAndPathDot, unique, uniqueId, vals, valueRefForFieldOrDatumDef, varName, vgField, warn2,
  widthHeightValueOrSignalRef } from "./tedata-server-12-vega-lite.mjs";
import { entries, gradient3, isConcatModel, isFacetModel, isLayerModel, isUnitModel, labels$1, symbols3 } from "./tedata-server-14-vega-lite.mjs";
// Bundle text, part 13 of 15
function title(fieldOrDatumDef, config2, { allowDisabling, includeDefault = !0 }) {
  let guideTitle = getGuide(fieldOrDatumDef)?.title;
  if (!isFieldDef(fieldOrDatumDef))
    return guideTitle ?? fieldOrDatumDef.title;
  let fieldDef = fieldOrDatumDef, def2 = includeDefault ? defaultTitle(fieldDef, config2) : void 0;
  return allowDisabling ? getFirstDefined(guideTitle, fieldDef.title, def2) : guideTitle ?? fieldDef.title ?? def2;
}
function getGuide(fieldDef) {
  if (isPositionFieldOrDatumDef(fieldDef) && fieldDef.axis)
    return fieldDef.axis;
  if (isMarkPropFieldOrDatumDef(fieldDef) && fieldDef.legend)
    return fieldDef.legend;
  if (isFacetFieldDef(fieldDef) && fieldDef.header)
    return fieldDef.header;
}
function defaultTitle(fieldDef, config2) {
  return titleFormatter(fieldDef, config2);
}
function getFormatMixins(fieldDef) {
  if (isStringFieldOrDatumDef(fieldDef)) {
    let { format: format5, formatType } = fieldDef;
    return { format: format5, formatType };
  } else {
    let guide = getGuide(fieldDef) ?? {}, { format: format5, formatType } = guide;
    return { format: format5, formatType };
  }
}
function defaultType$2(fieldDef, channel) {
  switch (channel) {
    case "latitude":
    case "longitude":
      return "quantitative";
    case "row":
    case "column":
    case "facet":
    case "shape":
    case "strokeDash":
      return "nominal";
    case "order":
      return "ordinal";
  }
  if (isSortableFieldDef(fieldDef) && isArray(fieldDef.sort))
    return "ordinal";
  let { aggregate, bin: bin3, timeUnit } = fieldDef;
  if (timeUnit)
    return "temporal";
  if (bin3 || aggregate && !isArgmaxDef(aggregate) && !isArgminDef(aggregate))
    return "quantitative";
  if (isScaleFieldDef(fieldDef) && fieldDef.scale?.type)
    switch (SCALE_CATEGORY_INDEX[fieldDef.scale.type]) {
      case "numeric":
      case "discretizing":
        return "quantitative";
      case "time":
        return "temporal";
    }
  return "nominal";
}
function getFieldDef(channelDef) {
  if (isFieldDef(channelDef))
    return channelDef;
  if (hasConditionalFieldDef(channelDef))
    return channelDef.condition;
}
function getFieldOrDatumDef(channelDef) {
  if (isFieldOrDatumDef(channelDef))
    return channelDef;
  if (hasConditionalFieldOrDatumDef(channelDef))
    return channelDef.condition;
}
function initChannelDef(channelDef, channel, config2, opt = {}) {
  if (isPrimitive(channelDef)) {
    let primitiveType = isString(channelDef) ? "string" : isNumber(channelDef) ? "number" : "boolean";
    return warn2(primitiveChannelDef(channel, primitiveType, channelDef)), { value: channelDef };
  }
  return isFieldOrDatumDef(channelDef) ? initFieldOrDatumDef(channelDef, channel, config2, opt) : hasConditionalFieldOrDatumDef(channelDef) ? {
    ...channelDef,
    // Need to cast as normalizeFieldDef normally return FieldDef, but here we know that it is definitely Condition<FieldDef>
    condition: initFieldOrDatumDef(channelDef.condition, channel, config2, opt)
  } : channelDef;
}
function initFieldOrDatumDef(fd, channel, config2, opt) {
  if (isStringFieldOrDatumDef(fd)) {
    let { format: format5, formatType, ...rest } = fd;
    if (isCustomFormatType(formatType) && !config2.customFormatTypes)
      return warn2(customFormatTypeNotAllowed(channel)), initFieldOrDatumDef(rest, channel, config2, opt);
  } else {
    let guideType = isPositionFieldOrDatumDef(fd) ? "axis" : isMarkPropFieldOrDatumDef(fd) ? "legend" : isFacetFieldDef(fd) ? "header" : null;
    if (guideType && fd[guideType]) {
      let { format: format5, formatType, ...newGuide } = fd[guideType];
      if (isCustomFormatType(formatType) && !config2.customFormatTypes)
        return warn2(customFormatTypeNotAllowed(channel)), initFieldOrDatumDef({ ...fd, [guideType]: newGuide }, channel, config2, opt);
    }
  }
  return isFieldDef(fd) ? initFieldDef(fd, channel, opt) : initDatumDef(fd);
}
function initDatumDef(datumDef) {
  let type3 = datumDef.type;
  if (type3)
    return datumDef;
  let { datum: datum2 } = datumDef;
  return type3 = isNumber(datum2) ? "quantitative" : isString(datum2) ? "nominal" : isDateTime(datum2) ? "temporal" : void 0, { ...datumDef, type: type3 };
}
function initFieldDef(fd, channel, { compositeMark = !1 } = {}) {
  let { aggregate, timeUnit, bin: bin3, field: field3 } = fd, fieldDef = { ...fd };
  if (!compositeMark && aggregate && !isAggregateOp(aggregate) && !isArgmaxDef(aggregate) && !isArgminDef(aggregate) && (warn2(invalidAggregate(aggregate)), delete fieldDef.aggregate), timeUnit && (fieldDef.timeUnit = normalizeTimeUnit(timeUnit)), field3 && (fieldDef.field = `${field3}`), isBinning(bin3) && (fieldDef.bin = normalizeBin(bin3, channel)), isBinned(bin3) && !isXorY(channel) && warn2(channelShouldNotBeUsedForBinned(channel)), isTypedFieldDef(fieldDef)) {
    let { type: type3 } = fieldDef, fullType = getFullName(type3);
    type3 !== fullType && (fieldDef.type = fullType), type3 !== "quantitative" && isCountingAggregateOp(aggregate) && (warn2(invalidFieldTypeForCountAggregate(type3, aggregate)), fieldDef.type = "quantitative");
  } else if (!isSecondaryRangeChannel(channel)) {
    let newType = defaultType$2(fieldDef, channel);
    fieldDef.type = newType;
  }
  if (isTypedFieldDef(fieldDef)) {
    let { compatible, warning } = channelCompatibility(fieldDef, channel) || {};
    compatible === !1 && warn2(warning);
  }
  if (isSortableFieldDef(fieldDef) && isString(fieldDef.sort)) {
    let { sort: sort3 } = fieldDef;
    if (isSortByChannel(sort3))
      return {
        ...fieldDef,
        sort: { encoding: sort3 }
      };
    let sub = sort3.substring(1);
    if (sort3.charAt(0) === "-" && isSortByChannel(sub))
      return {
        ...fieldDef,
        sort: { encoding: sub, order: "descending" }
      };
  }
  if (isFacetFieldDef(fieldDef)) {
    let { header } = fieldDef;
    if (header) {
      let { orient: orient2, ...rest } = header;
      if (orient2)
        return {
          ...fieldDef,
          header: {
            ...rest,
            labelOrient: header.labelOrient || orient2,
            titleOrient: header.titleOrient || orient2
          }
        };
    }
  }
  return fieldDef;
}
function normalizeBin(bin3, channel) {
  return isBoolean(bin3) ? { maxbins: autoMaxBins(channel) } : bin3 === "binned" ? {
    binned: !0
  } : !bin3.maxbins && !bin3.step ? { ...bin3, maxbins: autoMaxBins(channel) } : bin3;
}
var COMPATIBLE = { compatible: !0 };
function channelCompatibility(fieldDef, channel) {
  let type3 = fieldDef.type;
  if (type3 === "geojson" && channel !== "shape")
    return {
      compatible: !1,
      warning: `Channel ${channel} should not be used with a geojson data.`
    };
  switch (channel) {
    case ROW:
    case COLUMN:
    case FACET:
      return isDiscrete2(fieldDef) ? COMPATIBLE : {
        compatible: !1,
        warning: channelShouldBeDiscrete(channel)
      };
    case X3:
    case Y3:
    case XOFFSET:
    case YOFFSET:
    case COLOR:
    case FILL:
    case STROKE:
    case TEXT$1:
    case DETAIL:
    case KEY:
    case TOOLTIP:
    case HREF:
    case URL2:
    case ANGLE:
    case THETA:
    case RADIUS:
    case DESCRIPTION:
      return COMPATIBLE;
    case LONGITUDE:
    case LONGITUDE2:
    case LATITUDE:
    case LATITUDE2:
      return type3 !== QUANTITATIVE ? {
        compatible: !1,
        warning: `Channel ${channel} should be used with a quantitative field only, not ${fieldDef.type} field.`
      } : COMPATIBLE;
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
    case STROKEWIDTH:
    case SIZE2:
    case THETA2:
    case RADIUS2:
    case X23:
    case Y23:
    case TIME:
      return type3 === "nominal" && !fieldDef.sort ? {
        compatible: !1,
        warning: `Channel ${channel} should not be used with an unsorted discrete field.`
      } : COMPATIBLE;
    case SHAPE:
    case STROKEDASH:
      return !isDiscrete2(fieldDef) && !isDiscretizing2(fieldDef) ? {
        compatible: !1,
        warning: channelShouldBeDiscreteOrDiscretizing(channel)
      } : COMPATIBLE;
    case ORDER:
      return fieldDef.type === "nominal" && !("sort" in fieldDef) ? {
        compatible: !1,
        warning: "Channel order is inappropriate for nominal field, which has no inherent order."
      } : COMPATIBLE;
  }
}
function isFieldOrDatumDefForTimeFormat(fieldOrDatumDef) {
  let { formatType } = getFormatMixins(fieldOrDatumDef);
  return formatType === "time" || !formatType && isTemporalFieldDef(fieldOrDatumDef);
}
function isTemporalFieldDef(def2) {
  return def2 && (def2.type === "temporal" || isFieldDef(def2) && !!def2.timeUnit);
}
function valueExpr(v2, { timeUnit, type: type3, wrapTime, undefinedIfExprNotRequired }) {
  let unit2 = timeUnit && normalizeTimeUnit(timeUnit)?.unit, isTime2 = unit2 || type3 === "temporal", expr2;
  return isExprRef(v2) ? expr2 = v2.expr : isSignalRef(v2) ? expr2 = v2.signal : isDateTime(v2) ? (isTime2 = !0, expr2 = dateTimeToExpr(v2)) : (isString(v2) || isNumber(v2)) && isTime2 && (expr2 = `datetime(${stringify(v2)})`, isLocalSingleTimeUnit(unit2) && (isNumber(v2) && v2 < 1e4 || isString(v2) && isNaN(Date.parse(v2))) && (expr2 = dateTimeToExpr({ [unit2]: v2 }))), expr2 ? wrapTime && isTime2 ? `time(${expr2})` : expr2 : undefinedIfExprNotRequired ? void 0 : stringify(v2);
}
function valueArray(fieldOrDatumDef, values3) {
  let { type: type3 } = fieldOrDatumDef;
  return values3.map((v2) => {
    let timeUnit = isFieldDef(fieldOrDatumDef) && !isBinnedTimeUnit(fieldOrDatumDef.timeUnit) ? fieldOrDatumDef.timeUnit : void 0, expr2 = valueExpr(v2, {
      timeUnit,
      type: type3,
      undefinedIfExprNotRequired: !0
    });
    return expr2 !== void 0 ? { signal: expr2 } : v2;
  });
}
function binRequiresRange(fieldDef, channel) {
  return isBinning(fieldDef.bin) ? isScaleChannel(channel) && ["ordinal", "nominal"].includes(fieldDef.type) : (console.warn("Only call this method for binned field defs."), !1);
}
var CONDITIONAL_AXIS_PROP_INDEX = {
  labelAlign: {
    part: "labels",
    vgProp: "align"
  },
  labelBaseline: {
    part: "labels",
    vgProp: "baseline"
  },
  labelColor: {
    part: "labels",
    vgProp: "fill"
  },
  labelFont: {
    part: "labels",
    vgProp: "font"
  },
  labelFontSize: {
    part: "labels",
    vgProp: "fontSize"
  },
  labelFontStyle: {
    part: "labels",
    vgProp: "fontStyle"
  },
  labelFontWeight: {
    part: "labels",
    vgProp: "fontWeight"
  },
  labelOpacity: {
    part: "labels",
    vgProp: "opacity"
  },
  labelOffset: null,
  labelPadding: null,
  // There is no fixed vgProp for tickSize, need to use signal.
  gridColor: {
    part: "grid",
    vgProp: "stroke"
  },
  gridDash: {
    part: "grid",
    vgProp: "strokeDash"
  },
  gridDashOffset: {
    part: "grid",
    vgProp: "strokeDashOffset"
  },
  gridOpacity: {
    part: "grid",
    vgProp: "opacity"
  },
  gridWidth: {
    part: "grid",
    vgProp: "strokeWidth"
  },
  tickColor: {
    part: "ticks",
    vgProp: "stroke"
  },
  tickDash: {
    part: "ticks",
    vgProp: "strokeDash"
  },
  tickDashOffset: {
    part: "ticks",
    vgProp: "strokeDashOffset"
  },
  tickOpacity: {
    part: "ticks",
    vgProp: "opacity"
  },
  tickSize: null,
  // There is no fixed vgProp for tickSize, need to use signal.
  tickWidth: {
    part: "ticks",
    vgProp: "strokeWidth"
  }
};
function isConditionalAxisValue(v2) {
  return v2?.condition;
}
var AXIS_PARTS = ["domain", "grid", "labels", "ticks", "title"], AXIS_PROPERTY_TYPE = {
  grid: "grid",
  gridCap: "grid",
  gridColor: "grid",
  gridDash: "grid",
  gridDashOffset: "grid",
  gridOpacity: "grid",
  gridScale: "grid",
  gridWidth: "grid",
  orient: "main",
  bandPosition: "both",
  // Need to be applied to grid axis too, so the grid will align with ticks.
  aria: "main",
  description: "main",
  domain: "main",
  domainCap: "main",
  domainColor: "main",
  domainDash: "main",
  domainDashOffset: "main",
  domainOpacity: "main",
  domainWidth: "main",
  format: "main",
  formatType: "main",
  labelAlign: "main",
  labelAngle: "main",
  labelBaseline: "main",
  labelBound: "main",
  labelColor: "main",
  labelFlush: "main",
  labelFlushOffset: "main",
  labelFont: "main",
  labelFontSize: "main",
  labelFontStyle: "main",
  labelFontWeight: "main",
  labelLimit: "main",
  labelLineHeight: "main",
  labelOffset: "main",
  labelOpacity: "main",
  labelOverlap: "main",
  labelPadding: "main",
  labels: "main",
  labelSeparation: "main",
  maxExtent: "main",
  minExtent: "main",
  offset: "both",
  position: "main",
  tickCap: "main",
  tickColor: "main",
  tickDash: "main",
  tickDashOffset: "main",
  tickMinStep: "both",
  tickOffset: "both",
  // Need to be applied to grid axis too, so the grid will align with ticks.
  tickOpacity: "main",
  tickRound: "both",
  // Apply rounding to grid and ticks so they are aligned.
  ticks: "main",
  tickSize: "main",
  tickWidth: "both",
  title: "main",
  titleAlign: "main",
  titleAnchor: "main",
  titleAngle: "main",
  titleBaseline: "main",
  titleColor: "main",
  titleFont: "main",
  titleFontSize: "main",
  titleFontStyle: "main",
  titleFontWeight: "main",
  titleLimit: "main",
  titleLineHeight: "main",
  titleOpacity: "main",
  titlePadding: "main",
  titleX: "main",
  titleY: "main",
  encode: "both",
  // we hide this in Vega-Lite
  scale: "both",
  tickBand: "both",
  tickCount: "both",
  tickExtra: "both",
  translate: "both",
  values: "both",
  zindex: "both"
  // this is actually set afterward, so it doesn't matter
}, COMMON_AXIS_PROPERTIES_INDEX = {
  orient: 1,
  // other things can depend on orient
  aria: 1,
  bandPosition: 1,
  description: 1,
  domain: 1,
  domainCap: 1,
  domainColor: 1,
  domainDash: 1,
  domainDashOffset: 1,
  domainOpacity: 1,
  domainWidth: 1,
  format: 1,
  formatType: 1,
  grid: 1,
  gridCap: 1,
  gridColor: 1,
  gridDash: 1,
  gridDashOffset: 1,
  gridOpacity: 1,
  gridWidth: 1,
  labelAlign: 1,
  labelAngle: 1,
  labelBaseline: 1,
  labelBound: 1,
  labelColor: 1,
  labelFlush: 1,
  labelFlushOffset: 1,
  labelFont: 1,
  labelFontSize: 1,
  labelFontStyle: 1,
  labelFontWeight: 1,
  labelLimit: 1,
  labelLineHeight: 1,
  labelOffset: 1,
  labelOpacity: 1,
  labelOverlap: 1,
  labelPadding: 1,
  labels: 1,
  labelSeparation: 1,
  maxExtent: 1,
  minExtent: 1,
  offset: 1,
  position: 1,
  tickBand: 1,
  tickCap: 1,
  tickColor: 1,
  tickCount: 1,
  tickDash: 1,
  tickDashOffset: 1,
  tickExtra: 1,
  tickMinStep: 1,
  tickOffset: 1,
  tickOpacity: 1,
  tickRound: 1,
  ticks: 1,
  tickSize: 1,
  tickWidth: 1,
  title: 1,
  titleAlign: 1,
  titleAnchor: 1,
  titleAngle: 1,
  titleBaseline: 1,
  titleColor: 1,
  titleFont: 1,
  titleFontSize: 1,
  titleFontStyle: 1,
  titleFontWeight: 1,
  titleLimit: 1,
  titleLineHeight: 1,
  titleOpacity: 1,
  titlePadding: 1,
  titleX: 1,
  titleY: 1,
  translate: 1,
  values: 1,
  zindex: 1
}, AXIS_PROPERTIES_INDEX = {
  ...COMMON_AXIS_PROPERTIES_INDEX,
  style: 1,
  labelExpr: 1,
  encoding: 1
};
function isAxisProperty(prop) {
  return hasOwnProperty(AXIS_PROPERTIES_INDEX, prop);
}
var AXIS_CONFIGS_INDEX = {
  axis: 1,
  axisBand: 1,
  axisBottom: 1,
  axisDiscrete: 1,
  axisLeft: 1,
  axisPoint: 1,
  axisQuantitative: 1,
  axisRight: 1,
  axisTemporal: 1,
  axisTop: 1,
  axisX: 1,
  axisXBand: 1,
  axisXDiscrete: 1,
  axisXPoint: 1,
  axisXQuantitative: 1,
  axisXTemporal: 1,
  axisY: 1,
  axisYBand: 1,
  axisYDiscrete: 1,
  axisYPoint: 1,
  axisYQuantitative: 1,
  axisYTemporal: 1
}, AXIS_CONFIGS = keys3(AXIS_CONFIGS_INDEX);
function isUnitSpec(spec) {
  return hasProperty(spec, "mark");
}
var CompositeMarkNormalizer = class {
  name;
  run;
  constructor(name2, run5) {
    this.name = name2, this.run = run5;
  }
  hasMatchingType(spec) {
    return isUnitSpec(spec) ? getMarkType(spec.mark) === this.name : !1;
  }
};
function channelHasField(encoding, channel) {
  let channelDef = encoding?.[channel];
  return channelDef ? isArray(channelDef) ? some(channelDef, (fieldDef) => !!fieldDef.field) : isFieldDef(channelDef) || hasConditionalFieldDef(channelDef) : !1;
}
function channelHasFieldOrDatum(encoding, channel) {
  let channelDef = encoding?.[channel];
  return channelDef ? isArray(channelDef) ? some(channelDef, (fieldDef) => !!fieldDef.field) : isFieldDef(channelDef) || isDatumDef(channelDef) || hasConditionalFieldOrDatumDef(channelDef) : !1;
}
function channelHasNestedOffsetScale(encoding, channel) {
  if (isXorY(channel)) {
    let fieldDef = encoding[channel];
    if ((isFieldDef(fieldDef) || isDatumDef(fieldDef)) && (isDiscrete$1(fieldDef.type) || isFieldDef(fieldDef) && fieldDef.timeUnit)) {
      let offsetChannel = getOffsetScaleChannel(channel);
      return channelHasFieldOrDatum(encoding, offsetChannel);
    }
  }
  return !1;
}
function isAggregate$1(encoding) {
  return some(CHANNELS, (channel) => {
    if (channelHasField(encoding, channel)) {
      let channelDef = encoding[channel];
      if (isArray(channelDef))
        return some(channelDef, (fieldDef) => !!fieldDef.aggregate);
      {
        let fieldDef = getFieldDef(channelDef);
        return fieldDef && !!fieldDef.aggregate;
      }
    }
    return !1;
  });
}
function extractTransformsFromEncoding(oldEncoding, config2) {
  let groupby = [], bins2 = [], timeUnits2 = [], aggregate = [], encoding = {};
  return forEach(oldEncoding, (channelDef, channel) => {
    if (isFieldDef(channelDef)) {
      let { field: field3, aggregate: aggOp, bin: bin3, timeUnit, ...remaining } = channelDef;
      if (aggOp || timeUnit || bin3) {
        let isTitleDefined = getGuide(channelDef)?.title, newField = vgField(channelDef, { forAs: !0 }), newFieldDef = {
          // Only add title if it doesn't exist
          ...isTitleDefined ? [] : { title: title(channelDef, config2, { allowDisabling: !0 }) },
          ...remaining,
          // Always overwrite field
          field: newField
        };
        if (aggOp) {
          let op;
          if (isArgmaxDef(aggOp) ? (op = "argmax", newField = vgField({ op: "argmax", field: aggOp.argmax }, { forAs: !0 }), newFieldDef.field = `${newField}.${field3}`) : isArgminDef(aggOp) ? (op = "argmin", newField = vgField({ op: "argmin", field: aggOp.argmin }, { forAs: !0 }), newFieldDef.field = `${newField}.${field3}`) : aggOp !== "boxplot" && aggOp !== "errorbar" && aggOp !== "errorband" && (op = aggOp), op) {
            let aggregateEntry = {
              op,
              as: newField
            };
            field3 && (aggregateEntry.field = field3), aggregate.push(aggregateEntry);
          }
        } else if (groupby.push(newField), isTypedFieldDef(channelDef) && isBinning(bin3)) {
          if (bins2.push({ bin: bin3, field: field3, as: newField }), groupby.push(vgField(channelDef, { binSuffix: "end" })), binRequiresRange(channelDef, channel) && groupby.push(vgField(channelDef, { binSuffix: "range" })), isXorY(channel)) {
            let secondaryChannel = {
              field: `${newField}_end`
            };
            encoding[`${channel}2`] = secondaryChannel;
          }
          newFieldDef.bin = "binned", isSecondaryRangeChannel(channel) || (newFieldDef.type = QUANTITATIVE);
        } else if (timeUnit && !isBinnedTimeUnit(timeUnit)) {
          timeUnits2.push({
            timeUnit,
            field: field3,
            as: newField
          });
          let formatType = isTypedFieldDef(channelDef) && channelDef.type !== TEMPORAL && "time";
          formatType && (channel === TEXT$1 || channel === TOOLTIP ? newFieldDef.formatType = formatType : isNonPositionScaleChannel(channel) ? newFieldDef.legend = {
            formatType,
            ...newFieldDef.legend
          } : isXorY(channel) && (newFieldDef.axis = {
            formatType,
            ...newFieldDef.axis
          }));
        }
        encoding[channel] = newFieldDef;
      } else
        groupby.push(field3), encoding[channel] = oldEncoding[channel];
    } else
      encoding[channel] = oldEncoding[channel];
  }), {
    bins: bins2,
    timeUnits: timeUnits2,
    aggregate,
    groupby,
    encoding
  };
}
function markChannelCompatible(encoding, channel, mark) {
  let markSupported = supportMark(channel, mark);
  if (markSupported) {
    if (markSupported === "binned") {
      let primaryFieldDef = encoding[channel === X23 ? X3 : Y3];
      return !!(isFieldDef(primaryFieldDef) && isFieldDef(encoding[channel]) && isBinned(primaryFieldDef.bin));
    }
  } else return !1;
  return !0;
}
function initEncoding(encoding, mark, filled, config2) {
  let normalizedEncoding = {};
  for (let key2 of keys3(encoding))
    isChannel(key2) || warn2(invalidEncodingChannel(key2));
  for (let channel of UNIT_CHANNELS) {
    if (!encoding[channel])
      continue;
    let channelDef = encoding[channel];
    if (isXorYOffset(channel)) {
      let mainChannel = getMainChannelFromOffsetChannel(channel), positionDef = normalizedEncoding[mainChannel];
      if (isFieldDef(positionDef) && isContinuous2(positionDef.type) && isFieldDef(channelDef) && !positionDef.timeUnit) {
        warn2(offsetNestedInsideContinuousPositionScaleDropped(mainChannel));
        continue;
      }
    }
    if (channel === "angle" && mark === "arc" && !encoding.theta && (warn2(REPLACE_ANGLE_WITH_THETA), channel = THETA), !markChannelCompatible(encoding, channel, mark)) {
      warn2(incompatibleChannel(channel, mark));
      continue;
    }
    if (channel === SIZE2 && mark === "line" && getFieldDef(encoding[channel])?.aggregate) {
      warn2(LINE_WITH_VARYING_SIZE);
      continue;
    }
    if (channel === COLOR && (filled ? "fill" in encoding : "stroke" in encoding)) {
      warn2(droppingColor("encoding", { fill: "fill" in encoding, stroke: "stroke" in encoding }));
      continue;
    }
    if (channel === DETAIL || channel === ORDER && !isArray(channelDef) && !isValueDef(channelDef) || channel === TOOLTIP && isArray(channelDef)) {
      if (channelDef) {
        if (channel === ORDER) {
          let def2 = encoding[channel];
          if (isOrderOnlyDef(def2)) {
            normalizedEncoding[channel] = def2;
            continue;
          }
        }
        normalizedEncoding[channel] = array_default(channelDef).reduce((defs, fieldDef) => (isFieldDef(fieldDef) ? defs.push(initFieldDef(fieldDef, channel)) : warn2(emptyFieldDef(fieldDef, channel)), defs), []);
      }
    } else {
      if (channel === TOOLTIP && channelDef === null)
        normalizedEncoding[channel] = null;
      else if (!isFieldDef(channelDef) && !isDatumDef(channelDef) && !isValueDef(channelDef) && !isConditionalDef(channelDef) && !isSignalRef(channelDef)) {
        warn2(emptyFieldDef(channelDef, channel));
        continue;
      }
      normalizedEncoding[channel] = initChannelDef(channelDef, channel, config2);
    }
  }
  return normalizedEncoding;
}
function normalizeEncoding(encoding, config2) {
  let normalizedEncoding = {};
  for (let channel of keys3(encoding)) {
    let newChannelDef = initChannelDef(encoding[channel], channel, config2, { compositeMark: !0 });
    normalizedEncoding[channel] = newChannelDef;
  }
  return normalizedEncoding;
}
function fieldDefs(encoding) {
  let arr = [];
  for (let channel of keys3(encoding))
    if (channelHasField(encoding, channel)) {
      let channelDef = encoding[channel], channelDefArray = array_default(channelDef);
      for (let def2 of channelDefArray)
        isFieldDef(def2) ? arr.push(def2) : hasConditionalFieldDef(def2) && arr.push(def2.condition);
    }
  return arr;
}
function forEach(mapping, f, thisArg) {
  if (mapping)
    for (let channel of keys3(mapping)) {
      let el = mapping[channel];
      if (isArray(el))
        for (let channelDef of el)
          f.call(thisArg, channelDef, channel);
      else
        f.call(thisArg, el, channel);
    }
}
function reduce(mapping, f, init2, thisArg) {
  return mapping ? keys3(mapping).reduce((r, channel) => {
    let map4 = mapping[channel];
    return isArray(map4) ? map4.reduce((r1, channelDef) => f.call(thisArg, r1, channelDef, channel), r) : f.call(thisArg, r, map4, channel);
  }, init2) : init2;
}
function pathGroupingFields(mark, encoding) {
  return keys3(encoding).reduce((details, channel) => {
    switch (channel) {
      // x, y, x2, y2, lat, long, lat1, long2, order, tooltip, href, aria label, cursor should not cause lines to group
      case X3:
      case Y3:
      case HREF:
      case DESCRIPTION:
      case URL2:
      case X23:
      case Y23:
        return details;
      case XOFFSET:
      case YOFFSET: {
        if (mark === "line" || mark === "area" || mark === "trail") {
          let offsetDef = encoding[channel];
          if (isFieldDef(offsetDef)) {
            let mainDef = encoding[channel === XOFFSET ? X3 : Y3];
            if (isFieldDef(mainDef) && !mainDef.aggregate && !offsetDef.aggregate) {
              let mainField = vgField(mainDef, {}), offsetField = vgField(offsetDef, {});
              mainField && offsetField && mainField !== offsetField && details.push(mainField);
            }
          }
        }
        return details;
      }
      case THETA:
      case THETA2:
      case RADIUS:
      case RADIUS2:
      case TIME:
      // falls through
      case LATITUDE:
      case LONGITUDE:
      case LATITUDE2:
      case LONGITUDE2:
      // TODO: case 'cursor':
      // text, shape, shouldn't be a part of line/trail/area [falls through]
      case TEXT$1:
      case SHAPE:
      case ANGLE:
      // falls through
      // tooltip fields should not be added to group by [falls through]
      case TOOLTIP:
        return details;
      case ORDER:
        if (mark === "line" || mark === "trail")
          return details;
      // but order should group area for stacking (falls through)
      case DETAIL:
      case KEY: {
        let channelDef = encoding[channel];
        if (isArray(channelDef) || isFieldDef(channelDef))
          for (let fieldDef of array_default(channelDef))
            fieldDef.aggregate || details.push(vgField(fieldDef, {}));
        return details;
      }
      case SIZE2:
        if (mark === "trail")
          return details;
      // For line, size should group lines.
      // falls through
      case COLOR:
      case FILL:
      case STROKE:
      case OPACITY:
      case FILLOPACITY:
      case STROKEOPACITY:
      case STROKEDASH:
      case STROKEWIDTH: {
        let fieldDef = getFieldDef(encoding[channel]);
        return fieldDef && !fieldDef.aggregate && details.push(vgField(fieldDef, {})), details;
      }
    }
  }, []);
}
function filterTooltipWithAggregatedField(oldEncoding) {
  let { tooltip: tooltip2, ...filteredEncoding } = oldEncoding;
  if (!tooltip2)
    return { filteredEncoding };
  let customTooltipWithAggregatedField, customTooltipWithoutAggregatedField;
  if (isArray(tooltip2)) {
    for (let t of tooltip2)
      t.aggregate ? (customTooltipWithAggregatedField || (customTooltipWithAggregatedField = []), customTooltipWithAggregatedField.push(t)) : (customTooltipWithoutAggregatedField || (customTooltipWithoutAggregatedField = []), customTooltipWithoutAggregatedField.push(t));
    customTooltipWithAggregatedField && (filteredEncoding.tooltip = customTooltipWithAggregatedField);
  } else
    tooltip2.aggregate ? filteredEncoding.tooltip = tooltip2 : customTooltipWithoutAggregatedField = tooltip2;
  return isArray(customTooltipWithoutAggregatedField) && customTooltipWithoutAggregatedField.length === 1 && (customTooltipWithoutAggregatedField = customTooltipWithoutAggregatedField[0]), { customTooltipWithoutAggregatedField, filteredEncoding };
}
function getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis, withFieldName = !0) {
  if ("tooltip" in encodingWithoutContinuousAxis)
    return { tooltip: encodingWithoutContinuousAxis.tooltip };
  let fiveSummaryTooltip = tooltipSummary.map(({ fieldPrefix, titlePrefix }) => {
    let mainTitle = withFieldName ? ` of ${getTitle(continuousAxisChannelDef)}` : "";
    return {
      field: fieldPrefix + continuousAxisChannelDef.field,
      type: continuousAxisChannelDef.type,
      title: isSignalRef(titlePrefix) ? { signal: `${titlePrefix}"${escape(mainTitle)}"` } : titlePrefix + mainTitle
    };
  }), tooltipFieldDefs = fieldDefs(encodingWithoutContinuousAxis).map(toStringFieldDef);
  return {
    tooltip: [
      ...fiveSummaryTooltip,
      // need to cast because TextFieldDef supports fewer types of bin
      ...unique(tooltipFieldDefs, hash5)
    ]
  };
}
function getTitle(continuousAxisChannelDef) {
  let { title: title2, field: field3 } = continuousAxisChannelDef;
  return getFirstDefined(title2, field3);
}
function makeCompositeAggregatePartFactory(compositeMarkDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, compositeMarkConfig) {
  let { scale: scale7, axis } = continuousAxisChannelDef;
  return ({ partName, mark, positionPrefix, endPositionPrefix = void 0, extraEncoding = {} }) => {
    let title2 = getTitle(continuousAxisChannelDef);
    return partLayerMixins(compositeMarkDef, partName, compositeMarkConfig, {
      mark,
      // TODO better remove this method and just have mark as a parameter of the method
      encoding: {
        [continuousAxis]: {
          field: `${positionPrefix}_${continuousAxisChannelDef.field}`,
          type: continuousAxisChannelDef.type,
          ...title2 !== void 0 ? { title: title2 } : {},
          ...scale7 !== void 0 ? { scale: scale7 } : {},
          ...axis !== void 0 ? { axis } : {}
        },
        ...isString(endPositionPrefix) ? {
          [`${continuousAxis}2`]: {
            field: `${endPositionPrefix}_${continuousAxisChannelDef.field}`
          }
        } : {},
        ...sharedEncoding,
        ...extraEncoding
      }
    });
  };
}
function partLayerMixins(markDef, part, compositeMarkConfig, partBaseSpec) {
  let { clip: clip4, color: color5, opacity: opacity2 } = markDef, mark = markDef.type;
  return markDef[part] || markDef[part] === void 0 && compositeMarkConfig[part] ? [
    {
      ...partBaseSpec,
      mark: {
        ...compositeMarkConfig[part],
        ...clip4 ? { clip: clip4 } : {},
        ...color5 ? { color: color5 } : {},
        ...opacity2 ? { opacity: opacity2 } : {},
        ...isMarkDef(partBaseSpec.mark) ? partBaseSpec.mark : { type: partBaseSpec.mark },
        style: `${mark}-${String(part)}`,
        ...isBoolean(markDef[part]) ? {} : markDef[part]
      }
    }
  ] : [];
}
function compositeMarkContinuousAxis(spec, orient2, compositeMark) {
  let { encoding } = spec, continuousAxis = orient2 === "vertical" ? "y" : "x", continuousAxisChannelDef = encoding[continuousAxis], continuousAxisChannelDef2 = encoding[`${continuousAxis}2`], continuousAxisChannelDefError = encoding[`${continuousAxis}Error`], continuousAxisChannelDefError2 = encoding[`${continuousAxis}Error2`];
  return {
    continuousAxisChannelDef: filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark),
    continuousAxisChannelDef2: filterAggregateFromChannelDef(continuousAxisChannelDef2, compositeMark),
    continuousAxisChannelDefError: filterAggregateFromChannelDef(continuousAxisChannelDefError, compositeMark),
    continuousAxisChannelDefError2: filterAggregateFromChannelDef(continuousAxisChannelDefError2, compositeMark),
    continuousAxis
  };
}
function filterAggregateFromChannelDef(continuousAxisChannelDef, compositeMark) {
  if (continuousAxisChannelDef?.aggregate) {
    let { aggregate, ...continuousAxisWithoutAggregate } = continuousAxisChannelDef;
    return aggregate !== compositeMark && warn2(errorBarContinuousAxisHasCustomizedAggregate(aggregate, compositeMark)), continuousAxisWithoutAggregate;
  } else
    return continuousAxisChannelDef;
}
function compositeMarkOrient(spec, compositeMark) {
  let { mark, encoding } = spec, { x: x5, y: y5 } = encoding;
  if (isMarkDef(mark) && mark.orient)
    return mark.orient;
  if (isContinuousFieldOrDatumDef(x5)) {
    if (isContinuousFieldOrDatumDef(y5)) {
      let xAggregate = isFieldDef(x5) && x5.aggregate, yAggregate = isFieldDef(y5) && y5.aggregate;
      if (!xAggregate && yAggregate === compositeMark)
        return "vertical";
      if (!yAggregate && xAggregate === compositeMark)
        return "horizontal";
      if (xAggregate === compositeMark && yAggregate === compositeMark)
        throw new Error("Both x and y cannot have aggregate");
      return isFieldOrDatumDefForTimeFormat(y5) && !isFieldOrDatumDefForTimeFormat(x5) ? "horizontal" : "vertical";
    }
    return "horizontal";
  } else {
    if (isContinuousFieldOrDatumDef(y5))
      return "vertical";
    throw new Error(`Need a valid continuous axis for ${compositeMark}s`);
  }
}
var BOXPLOT = "boxplot", BOXPLOT_PARTS = ["box", "median", "outliers", "rule", "ticks"], boxPlotNormalizer = new CompositeMarkNormalizer(BOXPLOT, normalizeBoxPlot);
function getBoxPlotType(extent2) {
  return isNumber(extent2) ? "tukey" : extent2;
}
function normalizeBoxPlot(spec, { config: config2 }) {
  spec = {
    ...spec,
    encoding: normalizeEncoding(spec.encoding, config2)
  };
  let { mark, encoding: _encoding, params: params2, projection: _p, ...outerSpec } = spec, markDef = isMarkDef(mark) ? mark : { type: mark };
  params2 && warn2(selectionNotSupported("boxplot"));
  let extent2 = markDef.extent ?? config2.boxplot.extent, sizeValue = getMarkPropOrConfig(
    "size",
    markDef,
    // TODO: https://github.com/vega/vega-lite/issues/6245
    config2
  ), invalid = markDef.invalid, boxPlotType = getBoxPlotType(extent2), { bins: bins2, timeUnits: timeUnits2, transform: transform5, continuousAxisChannelDef, continuousAxis, groupby, aggregate, encodingWithoutContinuousAxis, ticksOrient, boxOrient, customTooltipWithoutAggregatedField } = boxParams(spec, extent2, config2), aliasedFieldName = removePathFromField(continuousAxisChannelDef.field), { color: color5, size, ...encodingWithoutSizeColorAndContinuousAxis } = encodingWithoutContinuousAxis, makeBoxPlotPart = (sharedEncoding) => makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, config2.boxplot), makeBoxPlotExtent = makeBoxPlotPart(encodingWithoutSizeColorAndContinuousAxis), makeBoxPlotBox = makeBoxPlotPart(encodingWithoutContinuousAxis), defaultBoxColor = (isObject2(config2.boxplot.box) ? config2.boxplot.box.color : config2.mark.color) || "#4c78a8", makeBoxPlotMidTick = makeBoxPlotPart({
    ...encodingWithoutSizeColorAndContinuousAxis,
    ...size ? { size } : {},
    color: {
      condition: {
        test: `${accessWithDatumToUnescapedPath(`lower_box_${continuousAxisChannelDef.field}`)} >= ${accessWithDatumToUnescapedPath(`upper_box_${continuousAxisChannelDef.field}`)}`,
        ...color5 || { value: defaultBoxColor }
      }
    }
  }), fiveSummaryTooltipEncoding = getCompositeMarkTooltip([
    { fieldPrefix: boxPlotType === "min-max" ? "upper_whisker_" : "max_", titlePrefix: "Max" },
    { fieldPrefix: "upper_box_", titlePrefix: "Q3" },
    { fieldPrefix: "mid_box_", titlePrefix: "Median" },
    { fieldPrefix: "lower_box_", titlePrefix: "Q1" },
    { fieldPrefix: boxPlotType === "min-max" ? "lower_whisker_" : "min_", titlePrefix: "Min" }
  ], continuousAxisChannelDef, encodingWithoutContinuousAxis), endTick = { type: "tick", color: "black", opacity: 1, orient: ticksOrient, invalid, aria: !1 }, whiskerTooltipEncoding = boxPlotType === "min-max" ? fiveSummaryTooltipEncoding : (
    // for tukey / k-IQR, just show upper/lower-whisker
    getCompositeMarkTooltip([
      { fieldPrefix: "upper_whisker_", titlePrefix: "Upper Whisker" },
      { fieldPrefix: "lower_whisker_", titlePrefix: "Lower Whisker" }
    ], continuousAxisChannelDef, encodingWithoutContinuousAxis)
  ), whiskerLayers = [
    ...makeBoxPlotExtent({
      partName: "rule",
      mark: { type: "rule", invalid, aria: !1 },
      positionPrefix: "lower_whisker",
      endPositionPrefix: "lower_box",
      extraEncoding: whiskerTooltipEncoding
    }),
    ...makeBoxPlotExtent({
      partName: "rule",
      mark: { type: "rule", invalid, aria: !1 },
      positionPrefix: "upper_box",
      endPositionPrefix: "upper_whisker",
      extraEncoding: whiskerTooltipEncoding
    }),
    ...makeBoxPlotExtent({
      partName: "ticks",
      mark: endTick,
      positionPrefix: "lower_whisker",
      extraEncoding: whiskerTooltipEncoding
    }),
    ...makeBoxPlotExtent({
      partName: "ticks",
      mark: endTick,
      positionPrefix: "upper_whisker",
      extraEncoding: whiskerTooltipEncoding
    })
  ], boxLayers = [
    ...boxPlotType !== "tukey" ? whiskerLayers : [],
    ...makeBoxPlotBox({
      partName: "box",
      mark: {
        type: "bar",
        ...sizeValue ? { size: sizeValue } : {},
        orient: boxOrient,
        invalid,
        ariaRoleDescription: "box"
      },
      positionPrefix: "lower_box",
      endPositionPrefix: "upper_box",
      extraEncoding: fiveSummaryTooltipEncoding
    }),
    ...makeBoxPlotMidTick({
      partName: "median",
      mark: {
        type: "tick",
        invalid,
        ...isObject2(config2.boxplot.median) && config2.boxplot.median.color ? { color: config2.boxplot.median.color } : {},
        ...sizeValue ? { size: sizeValue } : {},
        orient: ticksOrient,
        aria: !1
      },
      positionPrefix: "mid_box",
      extraEncoding: fiveSummaryTooltipEncoding
    })
  ];
  if (boxPlotType === "min-max")
    return {
      ...outerSpec,
      transform: (outerSpec.transform ?? []).concat(transform5),
      layer: boxLayers
    };
  let lowerBoxExpr = accessWithDatumToUnescapedPath(`lower_box_${continuousAxisChannelDef.field}`), upperBoxExpr = accessWithDatumToUnescapedPath(`upper_box_${continuousAxisChannelDef.field}`), iqrExpr = `(${upperBoxExpr} - ${lowerBoxExpr})`, lowerWhiskerExpr = `${lowerBoxExpr} - ${extent2} * ${iqrExpr}`, upperWhiskerExpr = `${upperBoxExpr} + ${extent2} * ${iqrExpr}`, fieldExpr2 = accessWithDatumToUnescapedPath(continuousAxisChannelDef.field), joinaggregateTransform = {
    joinaggregate: boxParamsQuartiles(continuousAxisChannelDef.field),
    groupby
  }, filteredWhiskerSpec = {
    transform: [
      {
        filter: `(${lowerWhiskerExpr} <= ${fieldExpr2}) && (${fieldExpr2} <= ${upperWhiskerExpr})`
      },
      {
        aggregate: [
          {
            op: "min",
            field: continuousAxisChannelDef.field,
            as: `lower_whisker_${aliasedFieldName}`
          },
          {
            op: "max",
            field: continuousAxisChannelDef.field,
            as: `upper_whisker_${aliasedFieldName}`
          },
          // preserve lower_box / upper_box
          {
            op: "min",
            field: `lower_box_${continuousAxisChannelDef.field}`,
            as: `lower_box_${aliasedFieldName}`
          },
          {
            op: "max",
            field: `upper_box_${continuousAxisChannelDef.field}`,
            as: `upper_box_${aliasedFieldName}`
          },
          ...aggregate
        ],
        groupby
      }
    ],
    layer: whiskerLayers
  }, { tooltip: tooltip2, ...encodingWithoutSizeColorContinuousAxisAndTooltip } = encodingWithoutSizeColorAndContinuousAxis, { scale: scale7, axis } = continuousAxisChannelDef, title2 = getTitle(continuousAxisChannelDef), outlierLayersMixins = partLayerMixins(markDef, "outliers", config2.boxplot, {
    transform: [{ filter: `(${fieldExpr2} < ${lowerWhiskerExpr}) || (${fieldExpr2} > ${upperWhiskerExpr})` }],
    mark: "point",
    encoding: {
      [continuousAxis]: {
        field: continuousAxisChannelDef.field,
        type: continuousAxisChannelDef.type,
        ...title2 !== void 0 ? { title: title2 } : {},
        ...scale7 !== void 0 ? { scale: scale7 } : {},
        ...axis !== void 0 ? { axis } : {}
      },
      ...encodingWithoutSizeColorContinuousAxisAndTooltip,
      ...color5 ? { color: color5 } : {},
      ...customTooltipWithoutAggregatedField ? { tooltip: customTooltipWithoutAggregatedField } : {}
    }
  })[0], filteredLayersMixins, filteredLayersMixinsTransforms = [...bins2, ...timeUnits2, joinaggregateTransform];
  return outlierLayersMixins ? filteredLayersMixins = {
    transform: filteredLayersMixinsTransforms,
    layer: [outlierLayersMixins, filteredWhiskerSpec]
  } : (filteredLayersMixins = filteredWhiskerSpec, filteredLayersMixins.transform.unshift(...filteredLayersMixinsTransforms)), {
    ...outerSpec,
    layer: [
      filteredLayersMixins,
      {
        // boxplot
        transform: transform5,
        layer: boxLayers
      }
    ]
  };
}
function boxParamsQuartiles(continousAxisField) {
  let aliasedFieldName = removePathFromField(continousAxisField);
  return [
    {
      op: "q1",
      field: continousAxisField,
      as: `lower_box_${aliasedFieldName}`
    },
    {
      op: "q3",
      field: continousAxisField,
      as: `upper_box_${aliasedFieldName}`
    }
  ];
}
function boxParams(spec, extent2, config2) {
  let orient2 = compositeMarkOrient(spec, BOXPLOT), { continuousAxisChannelDef, continuousAxis } = compositeMarkContinuousAxis(spec, orient2, BOXPLOT), continuousFieldName = continuousAxisChannelDef.field, aliasedFieldName = removePathFromField(continuousFieldName), boxPlotType = getBoxPlotType(extent2), boxplotSpecificAggregate = [
    ...boxParamsQuartiles(continuousFieldName),
    {
      op: "median",
      field: continuousFieldName,
      as: `mid_box_${aliasedFieldName}`
    },
    {
      op: "min",
      field: continuousFieldName,
      as: (boxPlotType === "min-max" ? "lower_whisker_" : "min_") + aliasedFieldName
    },
    {
      op: "max",
      field: continuousFieldName,
      as: (boxPlotType === "min-max" ? "upper_whisker_" : "max_") + aliasedFieldName
    }
  ], postAggregateCalculates = boxPlotType === "min-max" || boxPlotType === "tukey" ? [] : [
    // This is for the  original k-IQR, which we do not expose
    {
      calculate: `${accessWithDatumToUnescapedPath(`upper_box_${aliasedFieldName}`)} - ${accessWithDatumToUnescapedPath(`lower_box_${aliasedFieldName}`)}`,
      as: `iqr_${aliasedFieldName}`
    },
    {
      calculate: `min(${accessWithDatumToUnescapedPath(`upper_box_${aliasedFieldName}`)} + ${accessWithDatumToUnescapedPath(`iqr_${aliasedFieldName}`)} * ${extent2}, ${accessWithDatumToUnescapedPath(`max_${aliasedFieldName}`)})`,
      as: `upper_whisker_${aliasedFieldName}`
    },
    {
      calculate: `max(${accessWithDatumToUnescapedPath(`lower_box_${aliasedFieldName}`)} - ${accessWithDatumToUnescapedPath(`iqr_${aliasedFieldName}`)} * ${extent2}, ${accessWithDatumToUnescapedPath(`min_${aliasedFieldName}`)})`,
      as: `lower_whisker_${aliasedFieldName}`
    }
  ], { [continuousAxis]: oldContinuousAxisChannelDef, ...oldEncodingWithoutContinuousAxis } = spec.encoding, { customTooltipWithoutAggregatedField, filteredEncoding } = filterTooltipWithAggregatedField(oldEncodingWithoutContinuousAxis), { bins: bins2, timeUnits: timeUnits2, aggregate, groupby, encoding: encodingWithoutContinuousAxis } = extractTransformsFromEncoding(filteredEncoding, config2), ticksOrient = orient2 === "vertical" ? "horizontal" : "vertical", boxOrient = orient2, transform5 = [
    ...bins2,
    ...timeUnits2,
    {
      aggregate: [...aggregate, ...boxplotSpecificAggregate],
      groupby
    },
    ...postAggregateCalculates
  ];
  return {
    bins: bins2,
    timeUnits: timeUnits2,
    transform: transform5,
    groupby,
    aggregate,
    continuousAxisChannelDef,
    continuousAxis,
    encodingWithoutContinuousAxis,
    ticksOrient,
    boxOrient,
    customTooltipWithoutAggregatedField
  };
}
var ERRORBAR = "errorbar", ERRORBAR_PARTS = ["ticks", "rule"], errorBarNormalizer = new CompositeMarkNormalizer(ERRORBAR, normalizeErrorBar);
function normalizeErrorBar(spec, { config: config2 }) {
  spec = {
    ...spec,
    encoding: normalizeEncoding(spec.encoding, config2)
  };
  let { transform: transform5, continuousAxisChannelDef, continuousAxis, encodingWithoutContinuousAxis, ticksOrient, markDef, outerSpec, tooltipEncoding } = errorBarParams(spec, ERRORBAR, config2);
  delete encodingWithoutContinuousAxis.size;
  let makeErrorBarPart = makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config2.errorbar), thickness = markDef.thickness, size = markDef.size, tick2 = {
    type: "tick",
    orient: ticksOrient,
    aria: !1,
    ...thickness !== void 0 ? { thickness } : {},
    ...size !== void 0 ? { size } : {}
  }, layer = [
    ...makeErrorBarPart({
      partName: "ticks",
      mark: tick2,
      positionPrefix: "lower",
      extraEncoding: tooltipEncoding
    }),
    ...makeErrorBarPart({
      partName: "ticks",
      mark: tick2,
      positionPrefix: "upper",
      extraEncoding: tooltipEncoding
    }),
    ...makeErrorBarPart({
      partName: "rule",
      mark: {
        type: "rule",
        ariaRoleDescription: "errorbar",
        ...thickness !== void 0 ? { size: thickness } : {}
      },
      positionPrefix: "lower",
      endPositionPrefix: "upper",
      extraEncoding: tooltipEncoding
    })
  ];
  return {
    ...outerSpec,
    transform: transform5,
    ...layer.length > 1 ? { layer } : { ...layer[0] }
  };
}
function errorBarOrientAndInputType(spec, compositeMark) {
  let { encoding } = spec;
  if (errorBarIsInputTypeRaw(encoding))
    return {
      orient: compositeMarkOrient(spec, compositeMark),
      inputType: "raw"
    };
  let isTypeAggregatedUpperLower = errorBarIsInputTypeAggregatedUpperLower(encoding), isTypeAggregatedError = errorBarIsInputTypeAggregatedError(encoding), x5 = encoding.x, y5 = encoding.y;
  if (isTypeAggregatedUpperLower) {
    if (isTypeAggregatedError)
      throw new Error(`${compositeMark} cannot be both type aggregated-upper-lower and aggregated-error`);
    let x22 = encoding.x2, y22 = encoding.y2;
    if (isFieldOrDatumDef(x22) && isFieldOrDatumDef(y22))
      throw new Error(`${compositeMark} cannot have both x2 and y2`);
    if (isFieldOrDatumDef(x22)) {
      if (isContinuousFieldOrDatumDef(x5))
        return { orient: "horizontal", inputType: "aggregated-upper-lower" };
      throw new Error(`Both x and x2 have to be quantitative in ${compositeMark}`);
    } else if (isFieldOrDatumDef(y22)) {
      if (isContinuousFieldOrDatumDef(y5))
        return { orient: "vertical", inputType: "aggregated-upper-lower" };
      throw new Error(`Both y and y2 have to be quantitative in ${compositeMark}`);
    }
    throw new Error("No ranged axis");
  } else {
    let xError = encoding.xError, xError2 = encoding.xError2, yError = encoding.yError, yError2 = encoding.yError2;
    if (isFieldOrDatumDef(xError2) && !isFieldOrDatumDef(xError))
      throw new Error(`${compositeMark} cannot have xError2 without xError`);
    if (isFieldOrDatumDef(yError2) && !isFieldOrDatumDef(yError))
      throw new Error(`${compositeMark} cannot have yError2 without yError`);
    if (isFieldOrDatumDef(xError) && isFieldOrDatumDef(yError))
      throw new Error(`${compositeMark} cannot have both xError and yError with both are quantiative`);
    if (isFieldOrDatumDef(xError)) {
      if (isContinuousFieldOrDatumDef(x5))
        return { orient: "horizontal", inputType: "aggregated-error" };
      throw new Error("All x, xError, and xError2 (if exist) have to be quantitative");
    } else if (isFieldOrDatumDef(yError)) {
      if (isContinuousFieldOrDatumDef(y5))
        return { orient: "vertical", inputType: "aggregated-error" };
      throw new Error("All y, yError, and yError2 (if exist) have to be quantitative");
    }
    throw new Error("No ranged axis");
  }
}
function errorBarIsInputTypeRaw(encoding) {
  return (isFieldOrDatumDef(encoding.x) || isFieldOrDatumDef(encoding.y)) && !isFieldOrDatumDef(encoding.x2) && !isFieldOrDatumDef(encoding.y2) && !isFieldOrDatumDef(encoding.xError) && !isFieldOrDatumDef(encoding.xError2) && !isFieldOrDatumDef(encoding.yError) && !isFieldOrDatumDef(encoding.yError2);
}
function errorBarIsInputTypeAggregatedUpperLower(encoding) {
  return isFieldOrDatumDef(encoding.x2) || isFieldOrDatumDef(encoding.y2);
}
function errorBarIsInputTypeAggregatedError(encoding) {
  return isFieldOrDatumDef(encoding.xError) || isFieldOrDatumDef(encoding.xError2) || isFieldOrDatumDef(encoding.yError) || isFieldOrDatumDef(encoding.yError2);
}
function errorBarParams(spec, compositeMark, config2) {
  let { mark, encoding, params: params2, projection: _p, ...outerSpec } = spec, markDef = isMarkDef(mark) ? mark : { type: mark };
  params2 && warn2(selectionNotSupported(compositeMark));
  let { orient: orient2, inputType } = errorBarOrientAndInputType(spec, compositeMark), { continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, continuousAxis } = compositeMarkContinuousAxis(spec, orient2, compositeMark), { errorBarSpecificAggregate, postAggregateCalculates, tooltipSummary, tooltipTitleWithFieldName } = errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, inputType, compositeMark, config2), { [continuousAxis]: oldContinuousAxisChannelDef, [continuousAxis === "x" ? "x2" : "y2"]: oldContinuousAxisChannelDef2, [continuousAxis === "x" ? "xError" : "yError"]: oldContinuousAxisChannelDefError, [continuousAxis === "x" ? "xError2" : "yError2"]: oldContinuousAxisChannelDefError2, ...oldEncodingWithoutContinuousAxis } = encoding, { bins: bins2, timeUnits: timeUnits2, aggregate: oldAggregate, groupby: oldGroupBy, encoding: encodingWithoutContinuousAxis } = extractTransformsFromEncoding(oldEncodingWithoutContinuousAxis, config2), aggregate = [...oldAggregate, ...errorBarSpecificAggregate], groupby = inputType !== "raw" ? [] : oldGroupBy, tooltipEncoding = getCompositeMarkTooltip(tooltipSummary, continuousAxisChannelDef, encodingWithoutContinuousAxis, tooltipTitleWithFieldName);
  return {
    transform: [
      ...outerSpec.transform ?? [],
      ...bins2,
      ...timeUnits2,
      ...aggregate.length === 0 ? [] : [{ aggregate, groupby }],
      ...postAggregateCalculates
    ],
    groupby,
    continuousAxisChannelDef,
    continuousAxis,
    encodingWithoutContinuousAxis,
    ticksOrient: orient2 === "vertical" ? "horizontal" : "vertical",
    markDef,
    outerSpec,
    tooltipEncoding
  };
}
function errorBarAggregationAndCalculation(markDef, continuousAxisChannelDef, continuousAxisChannelDef2, continuousAxisChannelDefError, continuousAxisChannelDefError2, inputType, compositeMark, config2) {
  let errorBarSpecificAggregate = [], postAggregateCalculates = [], continuousFieldName = continuousAxisChannelDef.field, tooltipSummary, tooltipTitleWithFieldName = !1;
  if (inputType === "raw") {
    let center = markDef.center ? markDef.center : markDef.extent ? markDef.extent === "iqr" ? "median" : "mean" : config2.errorbar.center, extent2 = markDef.extent ? markDef.extent : center === "mean" ? "stderr" : "iqr";
    if (center === "median" != (extent2 === "iqr") && warn2(errorBarCenterIsUsedWithWrongExtent(center, extent2, compositeMark)), extent2 === "stderr" || extent2 === "stdev")
      errorBarSpecificAggregate = [
        { op: extent2, field: continuousFieldName, as: `extent_${continuousFieldName}` },
        { op: center, field: continuousFieldName, as: `center_${continuousFieldName}` }
      ], postAggregateCalculates = [
        {
          calculate: `${accessWithDatumToUnescapedPath(`center_${continuousFieldName}`)} + ${accessWithDatumToUnescapedPath(`extent_${continuousFieldName}`)}`,
          as: `upper_${continuousFieldName}`
        },
        {
          calculate: `${accessWithDatumToUnescapedPath(`center_${continuousFieldName}`)} - ${accessWithDatumToUnescapedPath(`extent_${continuousFieldName}`)}`,
          as: `lower_${continuousFieldName}`
        }
      ], tooltipSummary = [
        { fieldPrefix: "center_", titlePrefix: titleCase(center) },
        { fieldPrefix: "upper_", titlePrefix: getTitlePrefix(center, extent2, "+") },
        { fieldPrefix: "lower_", titlePrefix: getTitlePrefix(center, extent2, "-") }
      ], tooltipTitleWithFieldName = !0;
    else {
      let centerOp, lowerExtentOp, upperExtentOp;
      extent2 === "ci" ? (centerOp = "mean", lowerExtentOp = "ci0", upperExtentOp = "ci1") : (centerOp = "median", lowerExtentOp = "q1", upperExtentOp = "q3"), errorBarSpecificAggregate = [
        { op: lowerExtentOp, field: continuousFieldName, as: `lower_${continuousFieldName}` },
        { op: upperExtentOp, field: continuousFieldName, as: `upper_${continuousFieldName}` },
        { op: centerOp, field: continuousFieldName, as: `center_${continuousFieldName}` }
      ], tooltipSummary = [
        {
          fieldPrefix: "upper_",
          titlePrefix: title({ field: continuousFieldName, aggregate: upperExtentOp, type: "quantitative" }, config2, {
            allowDisabling: !1
          })
        },
        {
          fieldPrefix: "lower_",
          titlePrefix: title({ field: continuousFieldName, aggregate: lowerExtentOp, type: "quantitative" }, config2, {
            allowDisabling: !1
          })
        },
        {
          fieldPrefix: "center_",
          titlePrefix: title({ field: continuousFieldName, aggregate: centerOp, type: "quantitative" }, config2, {
            allowDisabling: !1
          })
        }
      ];
    }
  } else {
    (markDef.center || markDef.extent) && warn2(errorBarCenterAndExtentAreNotNeeded(markDef.center, markDef.extent)), inputType === "aggregated-upper-lower" ? (tooltipSummary = [], postAggregateCalculates = [
      {
        calculate: accessWithDatumToUnescapedPath(continuousAxisChannelDef2.field),
        as: `upper_${continuousFieldName}`
      },
      { calculate: accessWithDatumToUnescapedPath(continuousFieldName), as: `lower_${continuousFieldName}` }
    ]) : inputType === "aggregated-error" && (tooltipSummary = [{ fieldPrefix: "", titlePrefix: continuousFieldName }], postAggregateCalculates = [
      {
        calculate: `${accessWithDatumToUnescapedPath(continuousFieldName)} + ${accessWithDatumToUnescapedPath(continuousAxisChannelDefError.field)}`,
        as: `upper_${continuousFieldName}`
      }
    ], continuousAxisChannelDefError2 ? postAggregateCalculates.push({
      calculate: `${accessWithDatumToUnescapedPath(continuousFieldName)} + ${accessWithDatumToUnescapedPath(continuousAxisChannelDefError2.field)}`,
      as: `lower_${continuousFieldName}`
    }) : postAggregateCalculates.push({
      calculate: `${accessWithDatumToUnescapedPath(continuousFieldName)} - ${accessWithDatumToUnescapedPath(continuousAxisChannelDefError.field)}`,
      as: `lower_${continuousFieldName}`
    }));
    for (let postAggregateCalculate of postAggregateCalculates)
      tooltipSummary.push({
        fieldPrefix: postAggregateCalculate.as.substring(0, 6),
        titlePrefix: replaceAll(replaceAll(postAggregateCalculate.calculate, "datum['", ""), "']", "")
      });
  }
  return { postAggregateCalculates, errorBarSpecificAggregate, tooltipSummary, tooltipTitleWithFieldName };
}
function getTitlePrefix(center, extent2, operation) {
  return `${titleCase(center)} ${operation} ${extent2}`;
}
var ERRORBAND = "errorband", ERRORBAND_PARTS = ["band", "borders"], errorBandNormalizer = new CompositeMarkNormalizer(ERRORBAND, normalizeErrorBand);
function normalizeErrorBand(spec, { config: config2 }) {
  spec = {
    ...spec,
    encoding: normalizeEncoding(spec.encoding, config2)
  };
  let { transform: transform5, continuousAxisChannelDef, continuousAxis, encodingWithoutContinuousAxis, markDef, outerSpec, tooltipEncoding } = errorBarParams(spec, ERRORBAND, config2), errorBandDef = markDef, makeErrorBandPart = makeCompositeAggregatePartFactory(errorBandDef, continuousAxis, continuousAxisChannelDef, encodingWithoutContinuousAxis, config2.errorband), is2D = spec.encoding.x !== void 0 && spec.encoding.y !== void 0, bandMark = { type: is2D ? "area" : "rect" }, bordersMark = { type: is2D ? "line" : "rule" }, interpolate3 = {
    ...errorBandDef.interpolate ? { interpolate: errorBandDef.interpolate } : {},
    ...errorBandDef.tension && errorBandDef.interpolate ? { tension: errorBandDef.tension } : {}
  };
  return is2D ? (bandMark = {
    ...bandMark,
    ...interpolate3,
    ariaRoleDescription: "errorband"
  }, bordersMark = {
    ...bordersMark,
    ...interpolate3,
    aria: !1
  }) : errorBandDef.interpolate ? warn2(errorBand1DNotSupport("interpolate")) : errorBandDef.tension && warn2(errorBand1DNotSupport("tension")), {
    ...outerSpec,
    transform: transform5,
    layer: [
      ...makeErrorBandPart({
        partName: "band",
        mark: bandMark,
        positionPrefix: "lower",
        endPositionPrefix: "upper",
        extraEncoding: tooltipEncoding
      }),
      ...makeErrorBandPart({
        partName: "borders",
        mark: bordersMark,
        positionPrefix: "lower",
        extraEncoding: tooltipEncoding
      }),
      ...makeErrorBandPart({
        partName: "borders",
        mark: bordersMark,
        positionPrefix: "upper",
        extraEncoding: tooltipEncoding
      })
    ]
  };
}
var compositeMarkRegistry = {};
function add5(mark, run5, parts) {
  let normalizer = new CompositeMarkNormalizer(mark, run5);
  compositeMarkRegistry[mark] = { normalizer, parts };
}
function getAllCompositeMarks() {
  return keys3(compositeMarkRegistry);
}
add5(BOXPLOT, normalizeBoxPlot, BOXPLOT_PARTS);
add5(ERRORBAR, normalizeErrorBar, ERRORBAR_PARTS);
add5(ERRORBAND, normalizeErrorBand, ERRORBAND_PARTS);
var VL_ONLY_LEGEND_CONFIG = [
  "gradientHorizontalMaxLength",
  "gradientHorizontalMinLength",
  "gradientVerticalMaxLength",
  "gradientVerticalMinLength",
  "unselectedOpacity"
], HEADER_TITLE_PROPERTIES_MAP = {
  titleAlign: "align",
  titleAnchor: "anchor",
  titleAngle: "angle",
  titleBaseline: "baseline",
  titleColor: "color",
  titleFont: "font",
  titleFontSize: "fontSize",
  titleFontStyle: "fontStyle",
  titleFontWeight: "fontWeight",
  titleLimit: "limit",
  titleLineHeight: "lineHeight",
  titleOrient: "orient",
  titlePadding: "offset"
}, HEADER_LABEL_PROPERTIES_MAP = {
  labelAlign: "align",
  labelAnchor: "anchor",
  labelAngle: "angle",
  labelBaseline: "baseline",
  labelColor: "color",
  labelFont: "font",
  labelFontSize: "fontSize",
  labelFontStyle: "fontStyle",
  labelFontWeight: "fontWeight",
  labelLimit: "limit",
  labelLineHeight: "lineHeight",
  labelOrient: "orient",
  labelPadding: "offset"
}, HEADER_TITLE_PROPERTIES = keys3(HEADER_TITLE_PROPERTIES_MAP), HEADER_LABEL_PROPERTIES = keys3(HEADER_LABEL_PROPERTIES_MAP), HEADER_CONFIGS_INDEX = {
  header: 1,
  headerRow: 1,
  headerColumn: 1,
  headerFacet: 1
}, HEADER_CONFIGS = keys3(HEADER_CONFIGS_INDEX), LEGEND_SCALE_CHANNELS = [
  "size",
  "shape",
  "fill",
  "stroke",
  "strokeDash",
  "strokeWidth",
  "opacity"
], defaultLegendConfig = {
  gradientHorizontalMaxLength: 200,
  gradientHorizontalMinLength: 100,
  gradientVerticalMaxLength: 200,
  gradientVerticalMinLength: 64,
  // This is Vega's minimum.
  unselectedOpacity: 0.35
}, COMMON_LEGEND_PROPERTY_INDEX = {
  aria: 1,
  clipHeight: 1,
  columnPadding: 1,
  columns: 1,
  cornerRadius: 1,
  description: 1,
  direction: 1,
  fillColor: 1,
  format: 1,
  formatType: 1,
  gradientLength: 1,
  gradientOpacity: 1,
  gradientStrokeColor: 1,
  gradientStrokeWidth: 1,
  gradientThickness: 1,
  gridAlign: 1,
  labelAlign: 1,
  labelBaseline: 1,
  labelColor: 1,
  labelFont: 1,
  labelFontSize: 1,
  labelFontStyle: 1,
  labelFontWeight: 1,
  labelLimit: 1,
  labelOffset: 1,
  labelOpacity: 1,
  labelOverlap: 1,
  labelPadding: 1,
  labelSeparation: 1,
  legendX: 1,
  legendY: 1,
  offset: 1,
  orient: 1,
  padding: 1,
  rowPadding: 1,
  strokeColor: 1,
  symbolDash: 1,
  symbolDashOffset: 1,
  symbolFillColor: 1,
  symbolLimit: 1,
  symbolOffset: 1,
  symbolOpacity: 1,
  symbolSize: 1,
  symbolStrokeColor: 1,
  symbolStrokeWidth: 1,
  symbolType: 1,
  tickCount: 1,
  tickMinStep: 1,
  title: 1,
  titleAlign: 1,
  titleAnchor: 1,
  titleBaseline: 1,
  titleColor: 1,
  titleFont: 1,
  titleFontSize: 1,
  titleFontStyle: 1,
  titleFontWeight: 1,
  titleLimit: 1,
  titleLineHeight: 1,
  titleOpacity: 1,
  titleOrient: 1,
  titlePadding: 1,
  type: 1,
  values: 1,
  zindex: 1
}, SELECTION_ID = "_vgsid_", defaultConfig$1 = {
  point: {
    on: "click",
    fields: [SELECTION_ID],
    toggle: "event.shiftKey",
    resolve: "global",
    clear: "dblclick"
  },
  interval: {
    on: "[pointerdown, window:pointerup] > window:pointermove!",
    encodings: ["x", "y"],
    translate: "[pointerdown, window:pointerup] > window:pointermove!",
    zoom: "wheel!",
    mark: { fill: "#333", fillOpacity: 0.125, stroke: "white" },
    resolve: "global",
    clear: "dblclick"
  }
};
function isLegendBinding(bind3) {
  return bind3 === "legend" || !!bind3?.legend;
}
function isLegendStreamBinding(bind3) {
  return isLegendBinding(bind3) && isObject2(bind3);
}
function isSelectionParameter(param2) {
  return !!param2?.select;
}
function assembleParameterSignals(params2) {
  let signals = [];
  for (let param2 of params2 || []) {
    if (isSelectionParameter(param2))
      continue;
    let { expr: expr2, bind: bind3, ...rest } = param2;
    if (bind3 && expr2) {
      let signal = {
        ...rest,
        bind: bind3,
        init: expr2
      };
      signals.push(signal);
    } else {
      let signal = {
        ...rest,
        ...expr2 ? { update: expr2 } : {},
        ...bind3 ? { bind: bind3 } : {}
      };
      signals.push(signal);
    }
  }
  return signals;
}
function isAnyConcatSpec(spec) {
  return isVConcatSpec(spec) || isHConcatSpec(spec) || isConcatSpec(spec);
}
function isConcatSpec(spec) {
  return hasProperty(spec, "concat");
}
function isVConcatSpec(spec) {
  return hasProperty(spec, "vconcat");
}
function isHConcatSpec(spec) {
  return hasProperty(spec, "hconcat");
}
function getStepFor({ step, offsetIsDiscrete }) {
  return offsetIsDiscrete ? step.for ?? "offset" : "position";
}
function isStep(size) {
  return hasProperty(size, "step");
}
function isFrameMixins(o) {
  return hasProperty(o, "view") || hasProperty(o, "width") || hasProperty(o, "height");
}
var DEFAULT_SPACING = 20, COMPOSITION_LAYOUT_INDEX = {
  align: 1,
  bounds: 1,
  center: 1,
  columns: 1,
  spacing: 1
}, COMPOSITION_LAYOUT_PROPERTIES = keys3(COMPOSITION_LAYOUT_INDEX);
function extractCompositionLayout(spec, specType, config2) {
  let compositionConfig = config2[specType], layout = {}, { spacing: spacingConfig, columns } = compositionConfig;
  spacingConfig !== void 0 && (layout.spacing = spacingConfig), columns !== void 0 && (isFacetSpec(spec) && !isFacetMapping(spec.facet) || isConcatSpec(spec)) && (layout.columns = columns), isVConcatSpec(spec) && (layout.columns = 1);
  for (let prop of COMPOSITION_LAYOUT_PROPERTIES)
    if (spec[prop] !== void 0)
      if (prop === "spacing") {
        let spacing = spec[prop];
        layout[prop] = isNumber(spacing) ? spacing : {
          row: spacing.row ?? spacingConfig,
          column: spacing.column ?? spacingConfig
        };
      } else
        layout[prop] = spec[prop];
  return layout;
}
function getViewConfigContinuousSize(viewConfig, channel) {
  return viewConfig[channel] ?? viewConfig[channel === "width" ? "continuousWidth" : "continuousHeight"];
}
function getViewConfigDiscreteStep(viewConfig, channel) {
  let size = getViewConfigDiscreteSize(viewConfig, channel);
  return isStep(size) ? size.step : DEFAULT_STEP;
}
function getViewConfigDiscreteSize(viewConfig, channel) {
  let size = viewConfig[channel] ?? viewConfig[channel === "width" ? "discreteWidth" : "discreteHeight"];
  return getFirstDefined(size, { step: viewConfig.step });
}
var DEFAULT_STEP = 20, defaultViewConfig = {
  continuousWidth: 300,
  continuousHeight: 300,
  step: DEFAULT_STEP
}, defaultConfig = {
  background: "white",
  padding: 5,
  timeFormat: "%b %d, %Y",
  countTitle: "Count of Records",
  view: defaultViewConfig,
  mark: defaultMarkConfig,
  arc: {},
  area: {},
  bar: defaultBarConfig,
  circle: {},
  geoshape: {},
  image: {},
  line: {},
  point: {},
  rect: defaultRectConfig,
  rule: { color: "black" },
  // Need this to override default color in mark config
  square: {},
  text: { color: "black" },
  // Need this to override default color in mark config
  tick: defaultTickConfig,
  trail: {},
  boxplot: {
    size: 14,
    extent: 1.5,
    box: {},
    median: { color: "white" },
    outliers: {},
    rule: {},
    ticks: null
  },
  errorbar: {
    center: "mean",
    rule: !0,
    ticks: !1
  },
  errorband: {
    band: {
      opacity: 0.3
    },
    borders: !1
  },
  scale: defaultScaleConfig,
  projection: {},
  legend: defaultLegendConfig,
  header: { titlePadding: 10, labelPadding: 10 },
  headerColumn: {},
  headerRow: {},
  headerFacet: {},
  selection: defaultConfig$1,
  style: {},
  title: {},
  facet: { spacing: DEFAULT_SPACING },
  concat: { spacing: DEFAULT_SPACING },
  normalizedNumberFormat: ".0%"
}, tab10 = [
  "#4c78a8",
  "#f58518",
  "#e45756",
  "#72b7b2",
  "#54a24b",
  "#eeca3b",
  "#b279a2",
  "#ff9da6",
  "#9d755d",
  "#bab0ac"
], DEFAULT_FONT_SIZE = {
  text: 11,
  guideLabel: 10,
  guideTitle: 11,
  groupTitle: 13,
  groupSubtitle: 12
}, DEFAULT_COLOR = {
  blue: tab10[0],
  orange: tab10[1],
  red: tab10[2],
  teal: tab10[3],
  green: tab10[4],
  yellow: tab10[5],
  purple: tab10[6],
  pink: tab10[7],
  brown: tab10[8],
  gray0: "#000",
  gray1: "#111",
  gray2: "#222",
  gray3: "#333",
  gray4: "#444",
  gray5: "#555",
  gray6: "#666",
  gray7: "#777",
  gray8: "#888",
  gray9: "#999",
  gray10: "#aaa",
  gray11: "#bbb",
  gray12: "#ccc",
  gray13: "#ddd",
  gray14: "#eee",
  gray15: "#fff"
};
function colorSignalConfig(color5 = {}) {
  return {
    signals: [
      {
        name: "color",
        value: isObject2(color5) ? { ...DEFAULT_COLOR, ...color5 } : DEFAULT_COLOR
      }
    ],
    mark: { color: { signal: "color.blue" } },
    rule: { color: { signal: "color.gray0" } },
    text: {
      color: { signal: "color.gray0" }
    },
    style: {
      "guide-label": {
        fill: { signal: "color.gray0" }
      },
      "guide-title": {
        fill: { signal: "color.gray0" }
      },
      "group-title": {
        fill: { signal: "color.gray0" }
      },
      "group-subtitle": {
        fill: { signal: "color.gray0" }
      },
      cell: {
        stroke: { signal: "color.gray8" }
      }
    },
    axis: {
      domainColor: { signal: "color.gray13" },
      gridColor: { signal: "color.gray8" },
      tickColor: { signal: "color.gray13" }
    },
    range: {
      category: [
        { signal: "color.blue" },
        { signal: "color.orange" },
        { signal: "color.red" },
        { signal: "color.teal" },
        { signal: "color.green" },
        { signal: "color.yellow" },
        { signal: "color.purple" },
        { signal: "color.pink" },
        { signal: "color.brown" },
        { signal: "color.grey8" }
      ]
    }
  };
}
function fontSizeSignalConfig(fontSize2) {
  return {
    signals: [
      {
        name: "fontSize",
        value: isObject2(fontSize2) ? { ...DEFAULT_FONT_SIZE, ...fontSize2 } : DEFAULT_FONT_SIZE
      }
    ],
    text: {
      fontSize: { signal: "fontSize.text" }
    },
    style: {
      "guide-label": {
        fontSize: { signal: "fontSize.guideLabel" }
      },
      "guide-title": {
        fontSize: { signal: "fontSize.guideTitle" }
      },
      "group-title": {
        fontSize: { signal: "fontSize.groupTitle" }
      },
      "group-subtitle": {
        fontSize: { signal: "fontSize.groupSubtitle" }
      }
    }
  };
}
function fontConfig(font2) {
  return {
    text: { font: font2 },
    style: {
      "guide-label": { font: font2 },
      "guide-title": { font: font2 },
      "group-title": { font: font2 },
      "group-subtitle": { font: font2 }
    }
  };
}
function getAxisConfigInternal(axisConfig2) {
  let props = keys3(axisConfig2 || {}), axisConfigInternal = {};
  for (let prop of props) {
    let val = axisConfig2[prop];
    axisConfigInternal[prop] = isConditionalAxisValue(val) ? signalOrValueRefWithCondition(val) : signalRefOrValue(val);
  }
  return axisConfigInternal;
}
function getStyleConfigInternal(styleConfig) {
  let props = keys3(styleConfig), styleConfigInternal = {};
  for (let prop of props)
    styleConfigInternal[prop] = getAxisConfigInternal(styleConfig[prop]);
  return styleConfigInternal;
}
var configPropsWithExpr = [
  ...MARK_CONFIGS,
  ...AXIS_CONFIGS,
  ...HEADER_CONFIGS,
  "background",
  "padding",
  "legend",
  "lineBreak",
  "scale",
  "style",
  "title",
  "view"
];
function initConfig(specifiedConfig = {}) {
  let { color: color5, font: font2, fontSize: fontSize2, selection, ...restConfig } = specifiedConfig, mergedConfig = mergeConfig({}, duplicate(defaultConfig), font2 ? fontConfig(font2) : {}, color5 ? colorSignalConfig(color5) : {}, fontSize2 ? fontSizeSignalConfig(fontSize2) : {}, restConfig || {});
  selection && writeConfig(mergedConfig, "selection", selection, !0);
  let outputConfig = omit2(mergedConfig, configPropsWithExpr);
  for (let prop of ["background", "lineBreak", "padding"])
    mergedConfig[prop] && (outputConfig[prop] = signalRefOrValue(mergedConfig[prop]));
  for (let markConfigType of MARK_CONFIGS)
    mergedConfig[markConfigType] && (outputConfig[markConfigType] = replaceExprRef(mergedConfig[markConfigType]));
  for (let axisConfigType of AXIS_CONFIGS)
    mergedConfig[axisConfigType] && (outputConfig[axisConfigType] = getAxisConfigInternal(mergedConfig[axisConfigType]));
  for (let headerConfigType of HEADER_CONFIGS)
    mergedConfig[headerConfigType] && (outputConfig[headerConfigType] = replaceExprRef(mergedConfig[headerConfigType]));
  if (mergedConfig.legend && (outputConfig.legend = replaceExprRef(mergedConfig.legend)), mergedConfig.scale) {
    let { invalid, ...otherScaleConfig } = mergedConfig.scale, newScaleInvalid = replaceExprRef(invalid, { level: 1 });
    outputConfig.scale = {
      ...replaceExprRef(otherScaleConfig),
      ...keys3(newScaleInvalid).length > 0 ? { invalid: newScaleInvalid } : {}
    };
  }
  return mergedConfig.style && (outputConfig.style = getStyleConfigInternal(mergedConfig.style)), mergedConfig.title && (outputConfig.title = replaceExprRef(mergedConfig.title)), mergedConfig.view && (outputConfig.view = replaceExprRef(mergedConfig.view)), outputConfig;
}
var MARK_STYLES = /* @__PURE__ */ new Set(["view", ...PRIMITIVE_MARKS]), VL_ONLY_CONFIG_PROPERTIES = [
  "color",
  "fontSize",
  "background",
  // We apply background to the spec directly.
  "padding",
  "facet",
  "concat",
  "numberFormat",
  "numberFormatType",
  "normalizedNumberFormat",
  "normalizedNumberFormatType",
  "timeFormat",
  "countTitle",
  "header",
  "axisQuantitative",
  "axisTemporal",
  "axisDiscrete",
  "axisPoint",
  "axisXBand",
  "axisXPoint",
  "axisXDiscrete",
  "axisXQuantitative",
  "axisXTemporal",
  "axisYBand",
  "axisYPoint",
  "axisYDiscrete",
  "axisYQuantitative",
  "axisYTemporal",
  "scale",
  "selection",
  "overlay"
], VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
  view: ["continuousWidth", "continuousHeight", "discreteWidth", "discreteHeight", "step"],
  ...VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX
};
function stripAndRedirectConfig(config2) {
  config2 = duplicate(config2);
  for (let prop of VL_ONLY_CONFIG_PROPERTIES)
    delete config2[prop];
  if (config2.axis)
    for (let prop in config2.axis)
      isConditionalAxisValue(config2.axis[prop]) && delete config2.axis[prop];
  if (config2.legend)
    for (let prop of VL_ONLY_LEGEND_CONFIG)
      delete config2.legend[prop];
  if (config2.mark) {
    for (let prop of VL_ONLY_MARK_CONFIG_PROPERTIES)
      delete config2.mark[prop];
    config2.mark.tooltip && isObject2(config2.mark.tooltip) && delete config2.mark.tooltip;
  }
  config2.params && (config2.signals = (config2.signals || []).concat(assembleParameterSignals(config2.params)), delete config2.params);
  for (let markType2 of MARK_STYLES) {
    for (let prop of VL_ONLY_MARK_CONFIG_PROPERTIES)
      delete config2[markType2][prop];
    let vlOnlyMarkSpecificConfigs = VL_ONLY_ALL_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX[markType2];
    if (vlOnlyMarkSpecificConfigs)
      for (let prop of vlOnlyMarkSpecificConfigs)
        delete config2[markType2][prop];
    redirectConfigToStyleConfig(config2, markType2);
  }
  for (let m of getAllCompositeMarks())
    delete config2[m];
  redirectTitleConfig(config2);
  for (let prop in config2)
    isObject2(config2[prop]) && isEmpty(config2[prop]) && delete config2[prop];
  return isEmpty(config2) ? void 0 : config2;
}
function redirectTitleConfig(config2) {
  let { titleMarkConfig, subtitleMarkConfig, subtitle } = extractTitleConfig(config2.title);
  isEmpty(titleMarkConfig) || (config2.style["group-title"] = {
    ...config2.style["group-title"],
    ...titleMarkConfig
    // config.title has higher precedence than config.style.group-title in Vega
  }), isEmpty(subtitleMarkConfig) || (config2.style["group-subtitle"] = {
    ...config2.style["group-subtitle"],
    ...subtitleMarkConfig
  }), isEmpty(subtitle) ? delete config2.title : config2.title = subtitle;
}
function redirectConfigToStyleConfig(config2, prop, toProp, compositeMarkPart) {
  let propConfig = config2[prop];
  prop === "view" && (toProp = "cell");
  let style2 = {
    ...propConfig,
    ...config2.style[toProp ?? prop]
  };
  isEmpty(style2) || (config2.style[toProp ?? prop] = style2), delete config2[prop];
}
function isLayerSpec(spec) {
  return hasProperty(spec, "layer");
}
function isRepeatSpec(spec) {
  return hasProperty(spec, "repeat");
}
function isLayerRepeatSpec(spec) {
  return !isArray(spec.repeat) && hasProperty(spec.repeat, "layer");
}
var SpecMapper = class {
  map(spec, params2) {
    return isFacetSpec(spec) ? this.mapFacet(spec, params2) : isRepeatSpec(spec) ? this.mapRepeat(spec, params2) : isHConcatSpec(spec) ? this.mapHConcat(spec, params2) : isVConcatSpec(spec) ? this.mapVConcat(spec, params2) : isConcatSpec(spec) ? this.mapConcat(spec, params2) : this.mapLayerOrUnit(spec, params2);
  }
  mapLayerOrUnit(spec, params2) {
    if (isLayerSpec(spec))
      return this.mapLayer(spec, params2);
    if (isUnitSpec(spec))
      return this.mapUnit(spec, params2);
    throw new Error(invalidSpec(spec));
  }
  mapLayer(spec, params2) {
    return {
      ...spec,
      layer: spec.layer.map((subspec) => this.mapLayerOrUnit(subspec, params2))
    };
  }
  mapHConcat(spec, params2) {
    return {
      ...spec,
      hconcat: spec.hconcat.map((subspec) => this.map(subspec, params2))
    };
  }
  mapVConcat(spec, params2) {
    return {
      ...spec,
      vconcat: spec.vconcat.map((subspec) => this.map(subspec, params2))
    };
  }
  mapConcat(spec, params2) {
    let { concat, ...rest } = spec;
    return {
      ...rest,
      concat: concat.map((subspec) => this.map(subspec, params2))
    };
  }
  mapFacet(spec, params2) {
    return {
      // as any is required here since TS cannot infer that FO may only be FieldName or Field, but not RepeatRef
      ...spec,
      // TODO: remove "any" once we support all facet listed in https://github.com/vega/vega-lite/issues/2760
      spec: this.map(spec.spec, params2)
    };
  }
  mapRepeat(spec, params2) {
    return {
      ...spec,
      // as any is required here since TS cannot infer that the output type satisfies the input type
      spec: this.map(spec.spec, params2)
    };
  }
}, STACK_OFFSET_INDEX = {
  zero: 1,
  center: 1,
  normalize: 1
};
function isStackOffset(s) {
  return hasOwnProperty(STACK_OFFSET_INDEX, s);
}
var STACKABLE_MARKS = /* @__PURE__ */ new Set([ARC, BAR, AREA, RULE, POINT, CIRCLE, SQUARE, LINE, TEXT, TICK]), STACK_BY_DEFAULT_MARKS = /* @__PURE__ */ new Set([BAR, AREA, ARC]);
function isUnbinnedQuantitative(channelDef) {
  return isFieldDef(channelDef) && channelDefType(channelDef) === "quantitative" && !channelDef.bin;
}
function potentialStackedChannel(encoding, x5, { orient: orient2, type: mark }) {
  let y5 = x5 === "x" ? "y" : "radius", isCartesianBarOrArea = x5 === "x" && ["bar", "area"].includes(mark), xDef = encoding[x5], yDef = encoding[y5];
  if (isFieldDef(xDef) && isFieldDef(yDef))
    if (isUnbinnedQuantitative(xDef) && isUnbinnedQuantitative(yDef)) {
      if (xDef.stack)
        return x5;
      if (yDef.stack)
        return y5;
      let xAggregate = isFieldDef(xDef) && !!xDef.aggregate, yAggregate = isFieldDef(yDef) && !!yDef.aggregate;
      if (xAggregate !== yAggregate)
        return xAggregate ? x5 : y5;
      if (isCartesianBarOrArea) {
        if (orient2 === "vertical")
          return y5;
        if (orient2 === "horizontal")
          return x5;
      }
    } else {
      if (isUnbinnedQuantitative(xDef))
        return x5;
      if (isUnbinnedQuantitative(yDef))
        return y5;
    }
  else {
    if (isUnbinnedQuantitative(xDef))
      return isCartesianBarOrArea && orient2 === "vertical" ? void 0 : x5;
    if (isUnbinnedQuantitative(yDef))
      return isCartesianBarOrArea && orient2 === "horizontal" ? void 0 : y5;
  }
}
function getDimensionChannel(channel) {
  switch (channel) {
    case "x":
      return "y";
    case "y":
      return "x";
    case "theta":
      return "radius";
    case "radius":
      return "theta";
  }
}
function stack(m, encoding) {
  let markDef = isMarkDef(m) ? m : { type: m }, mark = markDef.type;
  if (!STACKABLE_MARKS.has(mark))
    return null;
  let fieldChannel = potentialStackedChannel(encoding, "x", markDef) || potentialStackedChannel(encoding, "theta", markDef);
  if (!fieldChannel)
    return null;
  let stackedFieldDef = encoding[fieldChannel], stackedField = isFieldDef(stackedFieldDef) ? vgField(stackedFieldDef, {}) : void 0, dimensionChannel = getDimensionChannel(fieldChannel), groupbyChannels = [], groupbyFields = /* @__PURE__ */ new Set();
  if (encoding[dimensionChannel]) {
    let dimensionDef = encoding[dimensionChannel], dimensionField = isFieldDef(dimensionDef) ? vgField(dimensionDef, {}) : void 0;
    dimensionField && dimensionField !== stackedField && (groupbyChannels.push(dimensionChannel), groupbyFields.add(dimensionField));
  }
  let dimensionOffsetChannel = dimensionChannel === "x" ? "xOffset" : "yOffset", dimensionOffsetDef = encoding[dimensionOffsetChannel], dimensionOffsetField = isFieldDef(dimensionOffsetDef) ? vgField(dimensionOffsetDef, {}) : void 0;
  dimensionOffsetField && dimensionOffsetField !== stackedField && (groupbyChannels.push(dimensionOffsetChannel), groupbyFields.add(dimensionOffsetField));
  let stackBy = NONPOSITION_CHANNELS.reduce((sc, channel) => {
    if (channel !== "tooltip" && channelHasField(encoding, channel)) {
      let channelDef = encoding[channel];
      for (let cDef of array_default(channelDef)) {
        let fieldDef = getFieldDef(cDef);
        if (fieldDef.aggregate)
          continue;
        let f = vgField(fieldDef, {});
        // if fielddef is a repeat, just include it in the stack by
        (!f || // otherwise, the field must be different from the groupBy fields.
        !groupbyFields.has(f)) && sc.push({ channel, fieldDef });
      }
    }
    return sc;
  }, []), offset4;
  return stackedFieldDef.stack !== void 0 ? isBoolean(stackedFieldDef.stack) ? offset4 = stackedFieldDef.stack ? "zero" : null : offset4 = stackedFieldDef.stack : STACK_BY_DEFAULT_MARKS.has(mark) && (offset4 = "zero"), !offset4 || !isStackOffset(offset4) || isAggregate$1(encoding) && stackBy.length === 0 ? null : (stackedFieldDef?.scale?.type && stackedFieldDef?.scale?.type !== ScaleType.LINEAR && stackedFieldDef?.stack && warn2(stackNonLinearScale(stackedFieldDef.scale.type)), isFieldOrDatumDef(encoding[getSecondaryRangeChannel(fieldChannel)]) ? (stackedFieldDef.stack !== void 0 && warn2(cannotStackRangedMark(fieldChannel)), null) : (isFieldDef(stackedFieldDef) && stackedFieldDef.aggregate && !SUM_OPS.has(stackedFieldDef.aggregate) && warn2(stackNonSummativeAggregate(stackedFieldDef.aggregate)), {
    groupbyChannels,
    groupbyFields,
    fieldChannel,
    impute: stackedFieldDef.impute === null ? !1 : isPathMark(mark),
    stackBy,
    offset: offset4
  }));
}
function initMarkdef(originalMarkDef, encoding, config2) {
  let markDef = replaceExprRef(originalMarkDef), specifiedOrient = getMarkPropOrConfig("orient", markDef, config2);
  if (markDef.orient = orient(markDef.type, encoding, specifiedOrient), specifiedOrient !== void 0 && specifiedOrient !== markDef.orient && warn2(orientOverridden(markDef.orient, specifiedOrient)), markDef.type === "bar" && markDef.orient) {
    let cornerRadiusEnd = getMarkPropOrConfig("cornerRadiusEnd", markDef, config2);
    if (cornerRadiusEnd !== void 0) {
      let newProps = markDef.orient === "horizontal" && encoding.x2 || markDef.orient === "vertical" && encoding.y2 ? ["cornerRadius"] : BAR_CORNER_RADIUS_INDEX[markDef.orient];
      for (let newProp of newProps)
        markDef[newProp] = cornerRadiusEnd;
      markDef.cornerRadiusEnd !== void 0 && delete markDef.cornerRadiusEnd;
    }
  }
  let specifiedOpacity = getMarkPropOrConfig("opacity", markDef, config2), specifiedFillOpacity = getMarkPropOrConfig("fillOpacity", markDef, config2);
  return specifiedOpacity === void 0 && specifiedFillOpacity === void 0 && (markDef.opacity = opacity(markDef.type, encoding)), getMarkPropOrConfig("cursor", markDef, config2) === void 0 && (markDef.cursor = cursor2(markDef, encoding, config2)), markDef;
}
function cursor2(markDef, encoding, config2) {
  return encoding.href || markDef.href || getMarkPropOrConfig("href", markDef, config2) ? "pointer" : markDef.cursor;
}
var DEFAULT_REDUCED_OPACITY = 0.7;
function opacity(mark, encoding) {
  if (contains2([POINT, TICK, CIRCLE, SQUARE], mark) && !isAggregate$1(encoding))
    return DEFAULT_REDUCED_OPACITY;
}
function defaultFilled(markDef, config2, { graticule: graticule2 }) {
  if (graticule2)
    return !1;
  let filledConfig = getMarkConfig("filled", markDef, config2), mark = markDef.type;
  return getFirstDefined(filledConfig, mark !== POINT && mark !== LINE && mark !== RULE);
}
function orient(mark, encoding, specifiedOrient) {
  switch (mark) {
    case POINT:
    case CIRCLE:
    case SQUARE:
    case RECT:
    case IMAGE:
      return;
  }
  let { x: x5, y: y5, x2: x22, y2: y22 } = encoding;
  switch (mark) {
    case TEXT:
    case BAR:
      if (isFieldDef(x5) && (isBinned(x5.bin) || isFieldDef(y5) && y5.aggregate && !x5.aggregate))
        return "vertical";
      if (isFieldDef(y5) && (isBinned(y5.bin) || isFieldDef(x5) && x5.aggregate && !y5.aggregate))
        return "horizontal";
      if (y22 || x22) {
        if (specifiedOrient)
          return specifiedOrient;
        if (!x22)
          return (isFieldDef(x5) && x5.type === QUANTITATIVE && !isBinning(x5.bin) || isNumericDataDef(x5)) && isFieldDef(y5) && isBinned(y5.bin) ? "horizontal" : "vertical";
        if (!y22)
          return (isFieldDef(y5) && y5.type === QUANTITATIVE && !isBinning(y5.bin) || isNumericDataDef(y5)) && isFieldDef(x5) && isBinned(x5.bin) ? "vertical" : "horizontal";
      }
    // falls through
    case RULE:
      if (x22 && !(isFieldDef(x5) && isBinned(x5.bin)) && y22 && !(isFieldDef(y5) && isBinned(y5.bin)))
        return;
    // falls through
    case AREA:
      if (y22)
        return isFieldDef(y5) && isBinned(y5.bin) ? "horizontal" : "vertical";
      if (x22)
        return isFieldDef(x5) && isBinned(x5.bin) ? "vertical" : "horizontal";
      if (mark === RULE) {
        if (x5 && !y5)
          return "vertical";
        if (y5 && !x5)
          return "horizontal";
      }
    // falls through
    case LINE:
    case TICK: {
      let xIsMeasure = isUnbinnedQuantitativeFieldOrDatumDef(x5), yIsMeasure = isUnbinnedQuantitativeFieldOrDatumDef(y5);
      if (specifiedOrient)
        return specifiedOrient;
      if (xIsMeasure && !yIsMeasure)
        return mark !== "tick" ? "horizontal" : "vertical";
      if (!xIsMeasure && yIsMeasure)
        return mark !== "tick" ? "vertical" : "horizontal";
      if (xIsMeasure && yIsMeasure)
        return "vertical";
      {
        let xIsTemporal = isTypedFieldDef(x5) && x5.type === TEMPORAL, yIsTemporal = isTypedFieldDef(y5) && y5.type === TEMPORAL;
        if (xIsTemporal && !yIsTemporal)
          return "vertical";
        if (!xIsTemporal && yIsTemporal)
          return "horizontal";
      }
      return;
    }
  }
  return "vertical";
}
function dropLineAndPoint(markDef) {
  let { point: _point, line: _line, ...mark } = markDef;
  return keys3(mark).length > 1 ? mark : mark.type;
}
function dropLineAndPointFromConfig(config2) {
  for (let mark of ["line", "area", "rule", "trail"])
    config2[mark] && (config2 = {
      ...config2,
      // TODO: remove as any
      [mark]: omit2(config2[mark], ["point", "line"])
    });
  return config2;
}
function getPointOverlay(markDef, markConfig = {}, encoding) {
  return markDef.point === "transparent" ? { opacity: 0 } : markDef.point ? isObject2(markDef.point) ? markDef.point : {} : markDef.point !== void 0 ? null : markConfig.point || encoding.shape ? isObject2(markConfig.point) ? markConfig.point : {} : void 0;
}
function getLineOverlay(markDef, markConfig = {}) {
  return markDef.line ? markDef.line === !0 ? {} : markDef.line : markDef.line !== void 0 ? null : markConfig.line ? markConfig.line === !0 ? {} : markConfig.line : void 0;
}
var PathOverlayNormalizer = class {
  name = "path-overlay";
  hasMatchingType(spec, config2) {
    if (isUnitSpec(spec)) {
      let { mark, encoding } = spec, markDef = isMarkDef(mark) ? mark : { type: mark };
      switch (markDef.type) {
        case "line":
        case "rule":
        case "trail":
          return !!getPointOverlay(markDef, config2[markDef.type], encoding);
        case "area":
          return (
            // false / null are also included as we want to remove the properties
            !!getPointOverlay(markDef, config2[markDef.type], encoding) || !!getLineOverlay(markDef, config2[markDef.type])
          );
      }
    }
    return !1;
  }
  run(spec, normParams, normalize5) {
    let { config: config2 } = normParams, { params: params2, projection: projection3, mark, name: name2, encoding: e, ...outerSpec } = spec, encoding = normalizeEncoding(e, config2), markDef = isMarkDef(mark) ? mark : { type: mark }, pointOverlay = getPointOverlay(markDef, config2[markDef.type], encoding), lineOverlay = markDef.type === "area" && getLineOverlay(markDef, config2[markDef.type]), layer = [
      {
        name: name2,
        ...params2 ? { params: params2 } : {},
        mark: dropLineAndPoint({
          ...markDef.type === "area" && getMarkPropOrConfig("opacity", markDef, config2) == null && getMarkPropOrConfig("fillOpacity", markDef, config2) == null ? { opacity: DEFAULT_REDUCED_OPACITY } : {},
          ...markDef
        }),
        // drop shape from encoding as this might be used to trigger point overlay
        encoding: omit2(encoding, ["shape"])
      }
    ], stackProps = stack(initMarkdef(markDef, encoding, config2), encoding), overlayEncoding = encoding;
    if (stackProps) {
      let { fieldChannel: stackFieldChannel, offset: offset4 } = stackProps;
      overlayEncoding = {
        ...encoding,
        [stackFieldChannel]: {
          ...encoding[stackFieldChannel],
          ...offset4 ? { stack: offset4 } : {}
        }
      };
    }
    return overlayEncoding = omit2(overlayEncoding, ["y2", "x2"]), lineOverlay && layer.push({
      ...projection3 ? { projection: projection3 } : {},
      mark: {
        type: "line",
        ...pick4(markDef, ["clip", "interpolate", "tension", "tooltip"]),
        ...lineOverlay
      },
      encoding: overlayEncoding
    }), pointOverlay && layer.push({
      ...projection3 ? { projection: projection3 } : {},
      mark: {
        type: "point",
        opacity: 1,
        filled: !0,
        ...pick4(markDef, ["clip", "tooltip"]),
        ...pointOverlay
      },
      encoding: overlayEncoding
    }), normalize5({
      ...outerSpec,
      layer
    }, {
      ...normParams,
      config: dropLineAndPointFromConfig(config2)
    });
  }
};
function replaceRepeaterInFacet(facet, repeater) {
  return repeater ? isFacetMapping(facet) ? replaceRepeaterInMapping(facet, repeater) : replaceRepeaterInFieldDef(facet, repeater) : facet;
}
function replaceRepeaterInEncoding(encoding, repeater) {
  return repeater ? replaceRepeaterInMapping(encoding, repeater) : encoding;
}
function replaceRepeatInProp(prop, o, repeater) {
  let val = o[prop];
  if (isRepeatRef(val)) {
    if (val.repeat in repeater)
      return { ...o, [prop]: repeater[val.repeat] };
    warn2(noSuchRepeatedValue(val.repeat));
    return;
  }
  return o;
}
function replaceRepeaterInFieldDef(fieldDef, repeater) {
  if (fieldDef = replaceRepeatInProp("field", fieldDef, repeater), fieldDef !== void 0) {
    if (fieldDef === null)
      return null;
    if (isSortableFieldDef(fieldDef) && isSortField(fieldDef.sort)) {
      let sort3 = replaceRepeatInProp("field", fieldDef.sort, repeater);
      fieldDef = {
        ...fieldDef,
        ...sort3 ? { sort: sort3 } : {}
      };
    }
    return fieldDef;
  }
}
function replaceRepeaterInFieldOrDatumDef(def2, repeater) {
  if (isFieldDef(def2))
    return replaceRepeaterInFieldDef(def2, repeater);
  {
    let datumDef = replaceRepeatInProp("datum", def2, repeater);
    return datumDef !== def2 && !datumDef.type && (datumDef.type = "nominal"), datumDef;
  }
}
function replaceRepeaterInChannelDef(channelDef, repeater) {
  if (isFieldOrDatumDef(channelDef)) {
    let fd = replaceRepeaterInFieldOrDatumDef(channelDef, repeater);
    if (fd)
      return fd;
    if (isConditionalDef(channelDef))
      return { condition: channelDef.condition };
  } else {
    if (hasConditionalFieldOrDatumDef(channelDef)) {
      let fd = replaceRepeaterInFieldOrDatumDef(channelDef.condition, repeater);
      if (fd)
        return {
          ...channelDef,
          condition: fd
        };
      {
        let { condition, ...channelDefWithoutCondition } = channelDef;
        return channelDefWithoutCondition;
      }
    }
    return channelDef;
  }
}
function replaceRepeaterInMapping(mapping, repeater) {
  let out = {};
  for (let channel in mapping)
    if (hasProperty(mapping, channel)) {
      let channelDef = mapping[channel];
      if (isArray(channelDef))
        out[channel] = channelDef.map((cd2) => replaceRepeaterInChannelDef(cd2, repeater)).filter((cd2) => cd2);
      else {
        let cd2 = replaceRepeaterInChannelDef(channelDef, repeater);
        cd2 !== void 0 && (out[channel] = cd2);
      }
    }
  return out;
}
var RuleForRangedLineNormalizer = class {
  name = "RuleForRangedLine";
  hasMatchingType(spec) {
    if (isUnitSpec(spec)) {
      let { encoding, mark } = spec;
      if (mark === "line" || isMarkDef(mark) && mark.type === "line")
        for (let channel of SECONDARY_RANGE_CHANNEL) {
          let mainChannel = getMainRangeChannel(channel), mainChannelDef = encoding[mainChannel];
          if (encoding[channel] && (isFieldDef(mainChannelDef) && !isBinned(mainChannelDef.bin) || isDatumDef(mainChannelDef)))
            return !0;
        }
    }
    return !1;
  }
  run(spec, params2, normalize5) {
    let { encoding, mark } = spec;
    return warn2(lineWithRange(!!encoding.x2, !!encoding.y2)), normalize5({
      ...spec,
      mark: isObject2(mark) ? { ...mark, type: "rule" } : "rule"
    }, params2);
  }
}, CoreNormalizer = class extends SpecMapper {
  nonFacetUnitNormalizers = [
    boxPlotNormalizer,
    errorBarNormalizer,
    errorBandNormalizer,
    new PathOverlayNormalizer(),
    new RuleForRangedLineNormalizer()
  ];
  map(spec, params2) {
    if (isUnitSpec(spec)) {
      let hasRow = channelHasField(spec.encoding, ROW), hasColumn = channelHasField(spec.encoding, COLUMN), hasFacet = channelHasField(spec.encoding, FACET);
      if (hasRow || hasColumn || hasFacet)
        return this.mapFacetedUnit(spec, params2);
    }
    return super.map(spec, params2);
  }
  // This is for normalizing non-facet unit
  mapUnit(spec, params2) {
    let { parentEncoding, parentProjection } = params2, encoding = replaceRepeaterInEncoding(spec.encoding, params2.repeater), specWithReplacedEncoding = {
      ...spec,
      ...spec.name ? { name: [params2.repeaterPrefix, spec.name].filter((n) => n).join("_") } : {},
      ...encoding ? { encoding } : {}
    };
    if (parentEncoding || parentProjection)
      return this.mapUnitWithParentEncodingOrProjection(specWithReplacedEncoding, params2);
    let normalizeLayerOrUnit = this.mapLayerOrUnit.bind(this);
    for (let unitNormalizer of this.nonFacetUnitNormalizers)
      if (unitNormalizer.hasMatchingType(specWithReplacedEncoding, params2.config))
        return unitNormalizer.run(specWithReplacedEncoding, params2, normalizeLayerOrUnit);
    return specWithReplacedEncoding;
  }
  mapRepeat(spec, params2) {
    return isLayerRepeatSpec(spec) ? this.mapLayerRepeat(spec, params2) : this.mapNonLayerRepeat(spec, params2);
  }
  mapLayerRepeat(spec, params2) {
    let { repeat: repeat2, spec: childSpec, ...rest } = spec, { row, column, layer } = repeat2, { repeater = {}, repeaterPrefix = "" } = params2;
    return row || column ? this.mapRepeat({
      ...spec,
      repeat: {
        ...row ? { row } : {},
        ...column ? { column } : {}
      },
      spec: {
        repeat: { layer },
        spec: childSpec
      }
    }, params2) : {
      ...rest,
      layer: layer.map((layerValue) => {
        let childRepeater = {
          ...repeater,
          layer: layerValue
        }, childName = `${(childSpec.name ? `${childSpec.name}_` : "") + repeaterPrefix}child__layer_${varName(layerValue)}`, child = this.mapLayerOrUnit(childSpec, { ...params2, repeater: childRepeater, repeaterPrefix: childName });
        return child.name = childName, child;
      })
    };
  }
  mapNonLayerRepeat(spec, params2) {
    let { repeat: repeat2, spec: childSpec, data: data3, ...remainingProperties } = spec;
    !isArray(repeat2) && spec.columns && (spec = omit2(spec, ["columns"]), warn2(columnsNotSupportByRowCol("repeat")));
    let concat = [], { repeater = {}, repeaterPrefix = "" } = params2, row = !isArray(repeat2) && repeat2.row || [repeater ? repeater.row : null], column = !isArray(repeat2) && repeat2.column || [repeater ? repeater.column : null], repeatValues = isArray(repeat2) && repeat2 || [repeater ? repeater.repeat : null];
    for (let repeatValue of repeatValues)
      for (let rowValue of row)
        for (let columnValue of column) {
          let childRepeater = {
            repeat: repeatValue,
            row: rowValue,
            column: columnValue,
            layer: repeater.layer
          }, childName = `${(childSpec.name ? `${childSpec.name}_` : "") + repeaterPrefix}child__${isArray(repeat2) ? `${varName(repeatValue)}` : (repeat2.row ? `row_${varName(rowValue)}` : "") + (repeat2.column ? `column_${varName(columnValue)}` : "")}`, child = this.map(childSpec, { ...params2, repeater: childRepeater, repeaterPrefix: childName });
          child.name = childName, concat.push(omit2(child, ["data"]));
        }
    let columns = isArray(repeat2) ? spec.columns : repeat2.column ? repeat2.column.length : 1;
    return {
      data: childSpec.data ?? data3,
      // data from child spec should have precedence
      align: "all",
      ...remainingProperties,
      columns,
      concat
    };
  }
  mapFacet(spec, params2) {
    let { facet } = spec;
    return isFacetMapping(facet) && spec.columns && (spec = omit2(spec, ["columns"]), warn2(columnsNotSupportByRowCol("facet"))), super.mapFacet(spec, params2);
  }
  mapUnitWithParentEncodingOrProjection(spec, params2) {
    let { encoding, projection: projection3 } = spec, { parentEncoding, parentProjection, config: config2 } = params2, mergedProjection = mergeProjection({ parentProjection, projection: projection3 }), mergedEncoding = mergeEncoding({
      parentEncoding,
      encoding: replaceRepeaterInEncoding(encoding, params2.repeater)
    });
    return this.mapUnit({
      ...spec,
      ...mergedProjection ? { projection: mergedProjection } : {},
      ...mergedEncoding ? { encoding: mergedEncoding } : {}
    }, { config: config2 });
  }
  mapFacetedUnit(spec, normParams) {
    let { row, column, facet, ...encoding } = spec.encoding, { mark, width: width2, projection: projection3, height: height2, view: view2, params: params2, encoding: _, ...outerSpec } = spec, { facetMapping, layout } = this.getFacetMappingAndLayout({ row, column, facet }, normParams), newEncoding = replaceRepeaterInEncoding(encoding, normParams.repeater);
    return this.mapFacet({
      ...outerSpec,
      ...layout,
      // row / column has higher precedence than facet
      facet: facetMapping,
      spec: {
        ...width2 ? { width: width2 } : {},
        ...height2 ? { height: height2 } : {},
        ...view2 ? { view: view2 } : {},
        ...projection3 ? { projection: projection3 } : {},
        mark,
        encoding: newEncoding,
        ...params2 ? { params: params2 } : {}
      }
    }, normParams);
  }
  getFacetMappingAndLayout(facets, params2) {
    let { row, column, facet } = facets;
    if (row || column) {
      facet && warn2(facetChannelDropped([...row ? [ROW] : [], ...column ? [COLUMN] : []]));
      let facetMapping = {}, layout = {};
      for (let channel of [ROW, COLUMN]) {
        let def2 = facets[channel];
        if (def2) {
          let { align: align2, center, spacing, columns, ...defWithoutLayout } = def2;
          facetMapping[channel] = defWithoutLayout;
          for (let prop of ["align", "center", "spacing"])
            def2[prop] !== void 0 && (layout[prop] ??= {}, layout[prop][channel] = def2[prop]);
        }
      }
      return { facetMapping, layout };
    } else {
      let { align: align2, center, spacing, columns, ...facetMapping } = facet;
      return {
        facetMapping: replaceRepeaterInFacet(facetMapping, params2.repeater),
        layout: {
          ...align2 ? { align: align2 } : {},
          ...center ? { center } : {},
          ...spacing ? { spacing } : {},
          ...columns ? { columns } : {}
        }
      };
    }
  }
  mapLayer(spec, { parentEncoding, parentProjection, ...otherParams }) {
    let { encoding, projection: projection3, ...rest } = spec, params2 = {
      ...otherParams,
      parentEncoding: mergeEncoding({ parentEncoding, encoding, layer: !0 }),
      parentProjection: mergeProjection({ parentProjection, projection: projection3 })
    };
    return super.mapLayer({
      ...rest,
      ...spec.name ? { name: [params2.repeaterPrefix, spec.name].filter((n) => n).join("_") } : {}
    }, params2);
  }
};
function mergeEncoding({ parentEncoding, encoding = {}, layer }) {
  let merged = {};
  if (parentEncoding) {
    let channels = /* @__PURE__ */ new Set([...keys3(parentEncoding), ...keys3(encoding)]);
    for (let channel of channels) {
      let channelDef = encoding[channel], parentChannelDef = parentEncoding[channel];
      if (isFieldOrDatumDef(channelDef)) {
        let mergedChannelDef = {
          ...parentChannelDef,
          ...channelDef
        };
        merged[channel] = mergedChannelDef;
      } else hasConditionalFieldOrDatumDef(channelDef) ? merged[channel] = {
        ...channelDef,
        condition: {
          ...parentChannelDef,
          ...channelDef.condition
        }
      } : channelDef || channelDef === null ? merged[channel] = channelDef : (layer || isValueDef(parentChannelDef) || isSignalRef(parentChannelDef) || isFieldOrDatumDef(parentChannelDef) || isArray(parentChannelDef)) && (merged[channel] = parentChannelDef);
    }
  } else
    merged = encoding;
  return !merged || isEmpty(merged) ? void 0 : merged;
}
function mergeProjection(opt) {
  let { parentProjection, projection: projection3 } = opt;
  return parentProjection && projection3 && warn2(projectionOverridden({ parentProjection, projection: projection3 })), projection3 ?? parentProjection;
}
function isFilter(t) {
  return hasProperty(t, "filter");
}
function isImputeSequence(t) {
  return hasProperty(t, "stop");
}
function isLookup(t) {
  return hasProperty(t, "lookup");
}
function isLookupData(from) {
  return hasProperty(from, "data");
}
function isLookupSelection(from) {
  return hasProperty(from, "param");
}
function isPivot(t) {
  return hasProperty(t, "pivot");
}
function isDensity(t) {
  return hasProperty(t, "density");
}
function isQuantile2(t) {
  return hasProperty(t, "quantile");
}
function isRegression(t) {
  return hasProperty(t, "regression");
}
function isLoess(t) {
  return hasProperty(t, "loess");
}
function isSample(t) {
  return hasProperty(t, "sample");
}
function isWindow(t) {
  return hasProperty(t, "window");
}
function isJoinAggregate(t) {
  return hasProperty(t, "joinaggregate");
}
function isFlatten(t) {
  return hasProperty(t, "flatten");
}
function isCalculate(t) {
  return hasProperty(t, "calculate");
}
function isBin(t) {
  return hasProperty(t, "bin");
}
function isImpute(t) {
  return hasProperty(t, "impute");
}
function isTimeUnit(t) {
  return hasProperty(t, "timeUnit");
}
function isAggregate(t) {
  return hasProperty(t, "aggregate");
}
function isStack(t) {
  return hasProperty(t, "stack");
}
function isFold(t) {
  return hasProperty(t, "fold");
}
function isExtent(t) {
  return hasProperty(t, "extent") && !hasProperty(t, "density") && !hasProperty(t, "regression");
}
function normalizeTransform(transform5) {
  return transform5.map((t) => isFilter(t) ? {
    filter: normalizeLogicalComposition(t.filter, normalizePredicate$1)
  } : t);
}
var SelectionCompatibilityNormalizer = class extends SpecMapper {
  map(spec, normParams) {
    return normParams.emptySelections ??= {}, normParams.selectionPredicates ??= {}, spec = normalizeTransforms(spec, normParams), super.map(spec, normParams);
  }
  mapLayerOrUnit(spec, normParams) {
    if (spec = normalizeTransforms(spec, normParams), spec.encoding) {
      let encoding = {};
      for (let [channel, enc] of entries$1(spec.encoding))
        encoding[channel] = normalizeChannelDef(enc, normParams);
      spec = { ...spec, encoding };
    }
    return super.mapLayerOrUnit(spec, normParams);
  }
  mapUnit(spec, normParams) {
    let { selection, ...rest } = spec;
    return selection ? {
      ...rest,
      params: entries$1(selection).map(([name2, selDef]) => {
        let { init: value3, bind: bind3, empty, ...select2 } = selDef;
        select2.type === "single" ? (select2.type = "point", select2.toggle = !1) : select2.type === "multi" && (select2.type = "point"), normParams.emptySelections[name2] = empty !== "none";
        for (let pred of vals(normParams.selectionPredicates[name2] ?? {}))
          pred.empty = empty !== "none";
        return { name: name2, value: value3, select: select2, bind: bind3 };
      })
    } : spec;
  }
};
function normalizeTransforms(spec, normParams) {
  let { transform: tx, ...rest } = spec;
  if (tx) {
    let transform5 = tx.map((t) => {
      if (isFilter(t))
        return { filter: normalizePredicate(t, normParams) };
      if (isBin(t) && isBinParams(t.bin))
        return {
          ...t,
          bin: normalizeBinExtent(t.bin)
        };
      if (isLookup(t)) {
        let { selection: param2, ...from } = t.from;
        return param2 ? {
          ...t,
          from: { param: param2, ...from }
        } : t;
      }
      return t;
    });
    return { ...rest, transform: transform5 };
  }
  return spec;
}
function normalizeChannelDef(obj, normParams) {
  let enc = duplicate(obj);
  if (isFieldDef(enc) && isBinParams(enc.bin) && (enc.bin = normalizeBinExtent(enc.bin)), isScaleFieldDef(enc) && enc.scale?.domain?.selection) {
    let { selection: param2, ...domain4 } = enc.scale.domain;
    enc.scale.domain = { ...domain4, ...param2 ? { param: param2 } : {} };
  }
  if (isConditionalDef(enc))
    if (isArray(enc.condition))
      enc.condition = enc.condition.map((c) => {
        let { selection, param: param2, test: test2, ...cond } = c;
        return param2 ? c : { ...cond, test: normalizePredicate(c, normParams) };
      });
    else {
      let { selection, param: param2, test: test2, ...cond } = normalizeChannelDef(enc.condition, normParams);
      enc.condition = param2 ? enc.condition : {
        ...cond,
        test: normalizePredicate(enc.condition, normParams)
      };
    }
  return enc;
}
function normalizeBinExtent(bin3) {
  let ext = bin3.extent;
  if (ext?.selection) {
    let { selection: param2, ...rest } = ext;
    return { ...bin3, extent: { ...rest, param: param2 } };
  }
  return bin3;
}
function normalizePredicate(op, normParams) {
  let normalizeSelectionComposition = (o) => normalizeLogicalComposition(o, (param2) => {
    let empty = normParams.emptySelections[param2] ?? !0, pred = { param: param2, empty };
    return normParams.selectionPredicates[param2] ??= [], normParams.selectionPredicates[param2].push(pred), pred;
  });
  return op.selection ? normalizeSelectionComposition(op.selection) : normalizeLogicalComposition(op.test || op.filter, (o) => o.selection ? normalizeSelectionComposition(o.selection) : o);
}
var TopLevelSelectionsNormalizer = class extends SpecMapper {
  map(spec, normParams) {
    let selections = normParams.selections ?? [];
    if (spec.params && !isUnitSpec(spec)) {
      let params2 = [];
      for (let param2 of spec.params)
        isSelectionParameter(param2) ? selections.push(param2) : params2.push(param2);
      spec.params = params2;
    }
    return normParams.selections = selections, super.map(spec, normParams);
  }
  mapUnit(spec, normParams) {
    let selections = normParams.selections;
    if (!selections || !selections.length)
      return spec;
    let path3 = (normParams.path ?? []).concat(spec.name), params2 = [];
    for (let selection of selections)
      if (!selection.views || !selection.views.length)
        params2.push(selection);
      else
        for (let view2 of selection.views)
          (isString(view2) && (view2 === spec.name || path3.includes(view2)) || isArray(view2) && // logic for backwards compatibility with view paths before we had unique names
          view2.map((v2) => path3.indexOf(v2)).every((v2, i, arr) => v2 !== -1 && (i === 0 || v2 > arr[i - 1]))) && params2.push(selection);
    return params2.length && (spec.params = params2), spec;
  }
};
for (let method2 of ["mapFacet", "mapRepeat", "mapHConcat", "mapVConcat", "mapLayer"]) {
  let proto = TopLevelSelectionsNormalizer.prototype[method2];
  TopLevelSelectionsNormalizer.prototype[method2] = function(spec, params2) {
    return proto.call(this, spec, addSpecNameToParams(spec, params2));
  };
}
function addSpecNameToParams(spec, params2) {
  return spec.name ? {
    ...params2,
    path: (params2.path ?? []).concat(spec.name)
  } : params2;
}
function normalize4(spec, config2) {
  config2 === void 0 && (config2 = initConfig(spec.config));
  let normalizedSpec = normalizeGenericSpec(spec, config2), { width: width2, height: height2 } = spec, autosize = normalizeAutoSize(normalizedSpec, { width: width2, height: height2, autosize: spec.autosize }, config2);
  return {
    ...normalizedSpec,
    ...autosize ? { autosize } : {}
  };
}
var coreNormalizer = new CoreNormalizer(), selectionCompatNormalizer = new SelectionCompatibilityNormalizer(), topLevelSelectionNormalizer = new TopLevelSelectionsNormalizer();
function normalizeGenericSpec(spec, config2 = {}) {
  let normParams = { config: config2 };
  return topLevelSelectionNormalizer.map(coreNormalizer.map(selectionCompatNormalizer.map(spec, normParams), normParams), normParams);
}
function _normalizeAutoSize(autosize) {
  return isString(autosize) ? { type: autosize } : autosize ?? {};
}
function normalizeAutoSize(spec, sizeInfo, config2) {
  let { width: width2, height: height2 } = sizeInfo, isFitCompatible = isUnitSpec(spec) || isLayerSpec(spec), autosizeDefault = {};
  isFitCompatible ? width2 == "container" && height2 == "container" ? (autosizeDefault.type = "fit", autosizeDefault.contains = "padding") : width2 == "container" ? (autosizeDefault.type = "fit-x", autosizeDefault.contains = "padding") : height2 == "container" && (autosizeDefault.type = "fit-y", autosizeDefault.contains = "padding") : (width2 == "container" && (warn2(containerSizeNonSingle("width")), width2 = void 0), height2 == "container" && (warn2(containerSizeNonSingle("height")), height2 = void 0));
  let autosize = {
    type: "pad",
    ...autosizeDefault,
    ...config2 ? _normalizeAutoSize(config2.autosize) : {},
    ..._normalizeAutoSize(spec.autosize)
  };
  if (autosize.type === "fit" && !isFitCompatible && (warn2(FIT_NON_SINGLE), autosize.type = "pad"), width2 == "container" && !(autosize.type == "fit" || autosize.type == "fit-x") && warn2(containerSizeNotCompatibleWithAutosize("width")), height2 == "container" && !(autosize.type == "fit" || autosize.type == "fit-y") && warn2(containerSizeNotCompatibleWithAutosize("height")), !deepEqual(autosize, { type: "pad" }))
    return autosize;
}
function isFitType(autoSizeType) {
  return ["fit", "fit-x", "fit-y"].includes(autoSizeType);
}
function getFitType(sizeType) {
  return sizeType ? `fit-${getPositionScaleChannel(sizeType)}` : "fit";
}
var TOP_LEVEL_PROPERTIES = [
  "background",
  "padding"
  // We do not include "autosize" here as it is supported by only unit and layer specs and thus need to be normalized
];
function extractTopLevelProperties(t, includeParams) {
  let o = {};
  for (let p of TOP_LEVEL_PROPERTIES)
    t && t[p] !== void 0 && (o[p] = signalRefOrValue(t[p]));
  return includeParams && (o.params = t.params), o;
}
var Split = class _Split {
  explicit;
  implicit;
  constructor(explicit = {}, implicit2 = {}) {
    this.explicit = explicit, this.implicit = implicit2;
  }
  clone() {
    return new _Split(duplicate(this.explicit), duplicate(this.implicit));
  }
  combine() {
    return {
      ...this.explicit,
      // Explicit properties comes first
      ...this.implicit
    };
  }
  get(key2) {
    return getFirstDefined(this.explicit[key2], this.implicit[key2]);
  }
  getWithExplicit(key2) {
    return this.explicit[key2] !== void 0 ? { explicit: !0, value: this.explicit[key2] } : this.implicit[key2] !== void 0 ? { explicit: !1, value: this.implicit[key2] } : { explicit: !1, value: void 0 };
  }
  setWithExplicit(key2, { value: value3, explicit }) {
    value3 !== void 0 && this.set(key2, value3, explicit);
  }
  set(key2, value3, explicit) {
    return delete this[explicit ? "implicit" : "explicit"][key2], this[explicit ? "explicit" : "implicit"][key2] = value3, this;
  }
  copyKeyFromSplit(key2, { explicit, implicit: implicit2 }) {
    explicit[key2] !== void 0 ? this.set(key2, explicit[key2], !0) : implicit2[key2] !== void 0 && this.set(key2, implicit2[key2], !1);
  }
  copyKeyFromObject(key2, s) {
    s[key2] !== void 0 && this.set(key2, s[key2], !0);
  }
  /**
   * Merge split object into this split object. Properties from the other split
   * overwrite properties from this split.
   */
  copyAll(other) {
    for (let key2 of keys3(other.combine())) {
      let val = other.getWithExplicit(key2);
      this.setWithExplicit(key2, val);
    }
  }
};
function makeExplicit(value3) {
  return {
    explicit: !0,
    value: value3
  };
}
function makeImplicit(value3) {
  return {
    explicit: !1,
    value: value3
  };
}
function tieBreakByComparing(compare3) {
  return (v1, v2, property2, propertyOf) => {
    let diff = compare3(v1.value, v2.value);
    return diff > 0 ? v1 : diff < 0 ? v2 : defaultTieBreaker(v1, v2, property2, propertyOf);
  };
}
function defaultTieBreaker(v1, v2, property2, propertyOf) {
  return v1.explicit && v2.explicit && warn2(mergeConflictingProperty(property2, propertyOf, v1.value, v2.value)), v1;
}
function mergeValuesWithExplicit(v1, v2, property2, propertyOf, tieBreaker = defaultTieBreaker) {
  return v1 === void 0 || v1.value === void 0 ? v2 : v1.explicit && !v2.explicit ? v1 : v2.explicit && !v1.explicit ? v2 : deepEqual(v1.value, v2.value) ? v1 : tieBreaker(v1, v2, property2, propertyOf);
}
var AncestorParse = class extends Split {
  explicit;
  implicit;
  parseNothing;
  constructor(explicit = {}, implicit2 = {}, parseNothing = !1) {
    super(explicit, implicit2), this.explicit = explicit, this.implicit = implicit2, this.parseNothing = parseNothing;
  }
  clone() {
    let clone3 = super.clone();
    return clone3.parseNothing = this.parseNothing, clone3;
  }
};
function isUrlData(data3) {
  return hasProperty(data3, "url");
}
function isInlineData(data3) {
  return hasProperty(data3, "values");
}
function isNamedData(data3) {
  return hasProperty(data3, "name") && !isUrlData(data3) && !isInlineData(data3) && !isGenerator(data3);
}
function isGenerator(data3) {
  return data3 && (isSequenceGenerator(data3) || isSphereGenerator(data3) || isGraticuleGenerator(data3));
}
function isSequenceGenerator(data3) {
  return hasProperty(data3, "sequence");
}
function isSphereGenerator(data3) {
  return hasProperty(data3, "sphere");
}
function isGraticuleGenerator(data3) {
  return hasProperty(data3, "graticule");
}
var DataSourceType;
(function(DataSourceType2) {
  DataSourceType2[DataSourceType2.Raw = 0] = "Raw", DataSourceType2[DataSourceType2.Main = 1] = "Main", DataSourceType2[DataSourceType2.Row = 2] = "Row", DataSourceType2[DataSourceType2.Column = 3] = "Column", DataSourceType2[DataSourceType2.Lookup = 4] = "Lookup", DataSourceType2[DataSourceType2.PreFilterInvalid = 5] = "PreFilterInvalid", DataSourceType2[DataSourceType2.PostFilterInvalid = 6] = "PostFilterInvalid";
})(DataSourceType || (DataSourceType = {}));
function getDataSourcesForHandlingInvalidValues({ invalid, isPath }) {
  switch (normalizeInvalidDataMode(invalid, { isPath })) {
    case "filter":
      return {
        marks: "exclude-invalid-values",
        scales: "exclude-invalid-values"
      };
    case "break-paths-show-domains":
      return {
        // Path-based marks use pre-filter data so we know to skip these invalid points in the path.
        // For non-path based marks, we skip by not showing them at all.
        marks: isPath ? "include-invalid-values" : "exclude-invalid-values",
        scales: "include-invalid-values"
      };
    case "break-paths-filter-domains":
      return {
        marks: isPath ? "include-invalid-values" : "exclude-invalid-values",
        // Unlike 'break-paths-show-domains', 'break-paths-filter-domains' uses post-filter data to feed scale.
        scales: "exclude-invalid-values"
      };
    case "show":
      return {
        marks: "include-invalid-values",
        scales: "include-invalid-values"
      };
  }
}
function getScaleDataSourceForHandlingInvalidValues(props) {
  let { marks, scales: scales2 } = getDataSourcesForHandlingInvalidValues(props);
  return marks === scales2 ? DataSourceType.Main : scales2 === "include-invalid-values" ? DataSourceType.PreFilterInvalid : DataSourceType.PostFilterInvalid;
}
var DataFlowNode = class {
  debugName;
  _children = [];
  _parent = null;
  _hash;
  constructor(parent, debugName) {
    this.debugName = debugName, parent && (this.parent = parent);
  }
  /**
   * Clone this node with a deep copy but don't clone links to children or parents.
   */
  clone() {
    throw new Error("Cannot clone node");
  }
  get parent() {
    return this._parent;
  }
  /**
   * Set the parent of the node and also add this node to the parent's children.
   */
  set parent(parent) {
    this._parent = parent, parent && parent.addChild(this);
  }
  get children() {
    return this._children;
  }
  numChildren() {
    return this._children.length;
  }
  addChild(child, loc) {
    if (this._children.includes(child)) {
      warn2(ADD_SAME_CHILD_TWICE);
      return;
    }
    loc !== void 0 ? this._children.splice(loc, 0, child) : this._children.push(child);
  }
  removeChild(oldChild) {
    let loc = this._children.indexOf(oldChild);
    return this._children.splice(loc, 1), loc;
  }
  /**
   * Remove node from the dataflow.
   */
  remove() {
    let loc = this._parent.removeChild(this);
    for (let child of this._children)
      child._parent = this._parent, this._parent.addChild(child, loc++);
  }
  /**
   * Insert another node as a parent of this node.
   */
  insertAsParentOf(other) {
    let parent = other.parent;
    parent.removeChild(this), this.parent = parent, other.parent = this;
  }
  swapWithParent() {
    let parent = this._parent, newParent = parent.parent;
    for (let child of this._children)
      child.parent = parent;
    this._children = [], parent.removeChild(this);
    let loc = parent.parent.removeChild(parent);
    this._parent = newParent, newParent.addChild(this, loc), parent.parent = this;
  }
}, OutputNode = class extends DataFlowNode {
  type;
  refCounts;
  _source;
  _name;
  clone() {
    let cloneObj = new this.constructor();
    return cloneObj.debugName = `clone_${this.debugName}`, cloneObj._source = this._source, cloneObj._name = `clone_${this._name}`, cloneObj.type = this.type, cloneObj.refCounts = this.refCounts, cloneObj.refCounts[cloneObj._name] = 0, cloneObj;
  }
  /**
   * @param source The name of the source. Will change in assemble.
   * @param type The type of the output node.
   * @param refCounts A global ref counter map.
   */
  constructor(parent, source4, type3, refCounts) {
    super(parent, source4), this.type = type3, this.refCounts = refCounts, this._source = this._name = source4, this.refCounts && !(this._name in this.refCounts) && (this.refCounts[this._name] = 0);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    return this._hash === void 0 && (this._hash = `Output ${uniqueId()}`), this._hash;
  }
  /**
   * Request the datasource name and increase the ref counter.
   *
   * During the parsing phase, this will return the simple name such as 'main' or 'raw'.
   * It is crucial to request the name from an output node to mark it as a required node.
   * If nobody ever requests the name, this datasource will not be instantiated in the assemble phase.
   *
   * In the assemble phase, this will return the correct name.
   */
  getSource() {
    return this.refCounts[this._name]++, this._source;
  }
  isRequired() {
    return !!this.refCounts[this._name];
  }
  setSource(source4) {
    this._source = source4;
  }
};
function isTimeUnitTransformComponent(timeUnitComponent) {
  return timeUnitComponent.as !== void 0;
}
function offsetAs(field3) {
  return `${field3}_end`;
}
var TimeUnitNode = class _TimeUnitNode extends DataFlowNode {
  timeUnits;
  clone() {
    return new _TimeUnitNode(null, duplicate(this.timeUnits));
  }
  constructor(parent, timeUnits2) {
    super(parent), this.timeUnits = timeUnits2;
  }
  static makeFromEncoding(parent, model) {
    let formula = model.reduceFieldDef((timeUnitComponent, fieldDef, channel) => {
      let { field: field3, timeUnit } = fieldDef;
      if (timeUnit) {
        let component;
        if (isBinnedTimeUnit(timeUnit)) {
          if (isUnitModel(model)) {
            let { mark, markDef, config: config2 } = model, bandPosition = getBandPosition({ fieldDef, markDef, config: config2 });
            (isRectBasedMark(mark) || bandPosition) && (component = {
              timeUnit: normalizeTimeUnit(timeUnit),
              field: field3
            });
          }
        } else
          component = {
            as: vgField(fieldDef, { forAs: !0 }),
            field: field3,
            timeUnit
          };
        if (isUnitModel(model)) {
          let { mark, markDef, config: config2 } = model, bandPosition = getBandPosition({ fieldDef, markDef, config: config2 });
          isRectBasedMark(mark) && isXorY(channel) && bandPosition !== 0.5 && (component.rectBandPosition = bandPosition);
        }
        component && (timeUnitComponent[hash5(component)] = component);
      }
      return timeUnitComponent;
    }, {});
    return isEmpty(formula) ? null : new _TimeUnitNode(parent, formula);
  }
  static makeFromTransform(parent, t) {
    let { timeUnit, ...other } = { ...t }, normalizedTimeUnit = normalizeTimeUnit(timeUnit), component = {
      ...other,
      timeUnit: normalizedTimeUnit
    };
    return new _TimeUnitNode(parent, {
      [hash5(component)]: component
    });
  }
  /**
   * Merge together TimeUnitNodes assigning the children of `other` to `this`
   * and removing `other`.
   */
  merge(other) {
    this.timeUnits = { ...this.timeUnits };
    for (let key2 in other.timeUnits)
      this.timeUnits[key2] || (this.timeUnits[key2] = other.timeUnits[key2]);
    for (let child of other.children)
      other.removeChild(child), child.parent = this;
    other.remove();
  }
  /**
   * Remove time units coming from the other node.
   */
  removeFormulas(fields) {
    let newFormula = {};
    for (let [key2, timeUnitComponent] of entries$1(this.timeUnits)) {
      let fieldAs = isTimeUnitTransformComponent(timeUnitComponent) ? timeUnitComponent.as : `${timeUnitComponent.field}_end`;
      fields.has(fieldAs) || (newFormula[key2] = timeUnitComponent);
    }
    this.timeUnits = newFormula;
  }
  producedFields() {
    return new Set(vals(this.timeUnits).map((f) => isTimeUnitTransformComponent(f) ? f.as : offsetAs(f.field)));
  }
  dependentFields() {
    return new Set(vals(this.timeUnits).map((f) => f.field));
  }
  hash() {
    return `TimeUnit ${hash5(this.timeUnits)}`;
  }
  assemble() {
    let transforms2 = [];
    for (let f of vals(this.timeUnits)) {
      let { rectBandPosition } = f, normalizedTimeUnit = normalizeTimeUnit(f.timeUnit);
      if (isTimeUnitTransformComponent(f)) {
        let { field: field3, as } = f, { unit: unit2, utc, ...params2 } = normalizedTimeUnit, startEnd = [as, `${as}_end`];
        transforms2.push({
          field: replacePathInField(field3),
          type: "timeunit",
          ...unit2 ? { units: getTimeUnitParts(unit2) } : {},
          ...utc ? { timezone: "utc" } : {},
          ...params2,
          as: startEnd
        }), transforms2.push(...offsetedRectFormulas(startEnd, rectBandPosition, normalizedTimeUnit));
      } else if (f) {
        let { field: escapedField } = f, field3 = unescapeSingleQuoteAndPathDot(escapedField), expr2 = offsetExpr({ timeUnit: normalizedTimeUnit, field: field3 }), endAs = offsetAs(field3);
        transforms2.push({
          type: "formula",
          expr: expr2,
          as: endAs
        }), transforms2.push(...offsetedRectFormulas([field3, endAs], rectBandPosition, normalizedTimeUnit));
      }
    }
    return transforms2;
  }
}, OFFSETTED_RECT_START_SUFFIX = "offsetted_rect_start", OFFSETTED_RECT_END_SUFFIX = "offsetted_rect_end";
function offsetExpr({ timeUnit, field: field3, reverse: reverse3 }) {
  let { unit: unit2, utc } = timeUnit, smallestUnit = getSmallestTimeUnitPart(unit2), { part, step } = getDateTimePartAndStep(smallestUnit, timeUnit.step);
  return `${utc ? "utcOffset" : "timeOffset"}('${part}', ${accessWithDatumToUnescapedPath(field3)}, ${reverse3 ? -step : step})`;
}
function offsetedRectFormulas([startField, endField], rectBandPosition, timeUnit) {
  if (rectBandPosition !== void 0 && rectBandPosition !== 0.5) {
    let startExpr = accessWithDatumToUnescapedPath(startField), endExpr = accessWithDatumToUnescapedPath(endField);
    return [
      {
        type: "formula",
        expr: interpolateExpr([
          offsetExpr({
            timeUnit,
            field: startField,
            reverse: !0
          }),
          startExpr
        ], rectBandPosition + 0.5),
        as: `${startField}_${OFFSETTED_RECT_START_SUFFIX}`
      },
      {
        type: "formula",
        expr: interpolateExpr([startExpr, endExpr], rectBandPosition + 0.5),
        as: `${startField}_${OFFSETTED_RECT_END_SUFFIX}`
      }
    ];
  }
  return [];
}
function interpolateExpr([start, end], fraction) {
  return `${1 - fraction} * ${start} + ${fraction} * ${end}`;
}
var TUPLE_FIELDS = "_tuple_fields", SelectionProjectionComponent = class {
  hasChannel;
  hasField;
  hasSelectionId;
  timeUnit;
  items;
  constructor(...items) {
    this.items = items, this.hasChannel = {}, this.hasField = {}, this.hasSelectionId = !1;
  }
}, project2 = {
  defined: () => !0,
  parse: (model, selCmpt, selDef) => {
    let name2 = selCmpt.name, proj = selCmpt.project ??= new SelectionProjectionComponent(), parsed = {}, timeUnits2 = {}, signals = /* @__PURE__ */ new Set(), signalName = (p, range7) => {
      let suffix = range7 === "visual" ? p.channel : p.field, sg = varName(`${name2}_${suffix}`);
      for (let counter = 1; signals.has(sg); counter++)
        sg = varName(`${name2}_${suffix}_${counter}`);
      return signals.add(sg), { [range7]: sg };
    }, type3 = selCmpt.type, cfg = model.config.selection[type3], init2 = selDef.value !== void 0 ? array_default(selDef.value) : null, { fields, encodings } = isObject2(selDef.select) ? selDef.select : {};
    if (!fields && !encodings && init2) {
      for (let initVal of init2)
        if (isObject2(initVal))
          for (let key2 of keys3(initVal))
            isSingleDefUnitChannel(key2) ? (encodings || (encodings = [])).push(key2) : type3 === "interval" ? (warn2(INTERVAL_INITIALIZED_WITH_POS), encodings = cfg.encodings) : (fields ??= []).push(key2);
    }
    !fields && !encodings && (encodings = cfg.encodings, "fields" in cfg && (fields = cfg.fields));
    for (let channel of encodings ?? []) {
      let fieldDef = model.fieldDef(channel);
      if (fieldDef) {
        let field3 = fieldDef.field;
        if (fieldDef.aggregate) {
          warn2(cannotProjectAggregate(channel, fieldDef.aggregate));
          continue;
        } else if (!field3) {
          warn2(cannotProjectOnChannelWithoutField(channel));
          continue;
        }
        if (fieldDef.timeUnit && !isBinnedTimeUnit(fieldDef.timeUnit)) {
          field3 = model.vgField(channel);
          let component = {
            timeUnit: fieldDef.timeUnit,
            as: field3,
            field: fieldDef.field
          };
          timeUnits2[hash5(component)] = component;
        }
        if (!parsed[field3]) {
          let tplType = type3 === "interval" && isScaleChannel(channel) && hasContinuousDomain(model.getScaleComponent(channel).get("type")) ? "R" : fieldDef.bin ? "R-RE" : "E", p = { field: field3, channel, type: tplType, index: proj.items.length };
          p.signals = { ...signalName(p, "data"), ...signalName(p, "visual") }, proj.items.push(parsed[field3] = p), proj.hasField[field3] = parsed[field3], proj.hasSelectionId = proj.hasSelectionId || field3 === SELECTION_ID, isGeoPositionChannel(channel) ? (p.geoChannel = channel, p.channel = getPositionChannelFromLatLong(channel), proj.hasChannel[p.channel] = parsed[field3]) : proj.hasChannel[channel] = parsed[field3];
        }
      } else
        warn2(cannotProjectOnChannelWithoutField(channel));
    }
    for (let field3 of fields ?? []) {
      if (proj.hasField[field3])
        continue;
      let p = { type: "E", field: field3, index: proj.items.length };
      p.signals = { ...signalName(p, "data") }, proj.items.push(p), proj.hasField[field3] = p, proj.hasSelectionId = proj.hasSelectionId || field3 === SELECTION_ID;
    }
    init2 && (selCmpt.init = init2.map((v2) => proj.items.map((p) => isObject2(v2) ? v2[p.geoChannel || p.channel] !== void 0 ? v2[p.geoChannel || p.channel] : v2[p.field] : v2))), isEmpty(timeUnits2) || (proj.timeUnit = new TimeUnitNode(null, timeUnits2));
  },
  signals: (model, selCmpt, allSignals) => {
    let name2 = selCmpt.name + TUPLE_FIELDS;
    return allSignals.filter((s) => s.name === name2).length > 0 || selCmpt.project.hasSelectionId ? allSignals : allSignals.concat({
      name: name2,
      value: selCmpt.project.items.map(assembleProjection)
    });
  }
}, CURR = "_curr", ANIM_VALUE = "anim_value", ANIM_CLOCK = "anim_clock", EASED_ANIM_CLOCK = "eased_anim_clock", MIN_EXTENT = "min_extent", MAX_RANGE_EXTENT = "max_range_extent", LAST_TICK = "last_tick_at", IS_PLAYING = "is_playing", THROTTLE = 1 / 60 * 1e3, animationSignals = (selectionName, scaleName) => [
  // timer signals
  {
    name: EASED_ANIM_CLOCK,
    // update: 'easeLinear(anim_clock / max_range_extent) * max_range_extent'
    update: ANIM_CLOCK
    // TODO: replace with above once easing functions are implemented in vega-functions
  },
  // scale signals
  // TODO(jzong): uncomment commented signals below when implementing interpolation
  { name: `${selectionName}_domain`, init: `domain('${scaleName}')` },
  { name: MIN_EXTENT, init: `extent(${selectionName}_domain)[0]` },
  // {name: 'max_extent', init: `extent(${selectionName}_domain)[1]`},
  { name: MAX_RANGE_EXTENT, init: `extent(range('${scaleName}'))[1]` },
  // {name: 't_index', update: `indexof(${selectionName}_domain, anim_value)`},
  { name: ANIM_VALUE, update: `invert('${scaleName}', ${EASED_ANIM_CLOCK})` }
], point$1 = {
  defined: (selCmpt) => selCmpt.type === "point",
  topLevelSignals: (model, selCmpt, signals) => (isTimerSelection(selCmpt) && (signals = signals.concat([
    {
      name: ANIM_CLOCK,
      init: "0",
      on: [
        {
          events: { type: "timer", throttle: THROTTLE },
          update: `${IS_PLAYING} ? (${ANIM_CLOCK} + (now() - ${LAST_TICK}) > ${MAX_RANGE_EXTENT} ? 0 : ${ANIM_CLOCK} + (now() - ${LAST_TICK})) : ${ANIM_CLOCK}`
        }
      ]
    },
    {
      name: LAST_TICK,
      init: "now()",
      on: [{ events: [{ signal: ANIM_CLOCK }, { signal: IS_PLAYING }], update: "now()" }]
    },
    {
      name: IS_PLAYING,
      init: "true"
    }
  ])), signals),
  signals: (model, selCmpt, signals) => {
    let name2 = selCmpt.name, fieldsSg = name2 + TUPLE_FIELDS, project3 = selCmpt.project, datum2 = "(item().isVoronoi ? datum.datum : datum)", brushes = vals(model.component.selection ?? {}).reduce((acc, cmpt) => cmpt.type === "interval" ? acc.concat(cmpt.name + BRUSH) : acc, []).map((b10) => `indexof(item().mark.name, '${b10}') < 0`).join(" && "), test2 = `datum && item().mark.marktype !== 'group' && indexof(item().mark.role, 'legend') < 0${brushes ? ` && ${brushes}` : ""}`, update3 = `unit: ${unitName(model)}, `;
    if (selCmpt.project.hasSelectionId)
      update3 += `${SELECTION_ID}: ${datum2}[${stringValue(SELECTION_ID)}]`;
    else if (isTimerSelection(selCmpt))
      update3 += `fields: ${fieldsSg}, values: [${ANIM_VALUE} ? ${ANIM_VALUE} : ${MIN_EXTENT}]`;
    else {
      let values3 = project3.items.map((p) => model.fieldDef(p.channel)?.bin ? `[${datum2}[${stringValue(model.vgField(p.channel, {}))}], ${datum2}[${stringValue(model.vgField(p.channel, { binSuffix: "end" }))}]]` : `${datum2}[${stringValue(p.field)}]`).join(", ");
      update3 += `fields: ${fieldsSg}, values: [${values3}]`;
    }
    if (isTimerSelection(selCmpt))
      return signals.concat(animationSignals(selCmpt.name, model.scaleName(TIME)), [
        {
          name: name2 + TUPLE,
          on: [
            {
              events: [{ signal: EASED_ANIM_CLOCK }, { signal: ANIM_VALUE }],
              update: `{${update3}}`,
              force: !0
            }
          ]
        }
      ]);
    {
      let events3 = selCmpt.events;
      return signals.concat([
        {
          name: name2 + TUPLE,
          on: events3 ? [
            {
              events: events3,
              update: `${test2} ? {${update3}} : null`,
              force: !0
            }
          ] : []
        }
      ]);
    }
  }
};
function assembleProjection(proj) {
  let { signals, hasLegend, index: index4, ...rest } = proj;
  return rest.field = replacePathInField(rest.field), rest;
}
function assembleInit(init2, isExpr2 = !0, wrap2 = identity6) {
  if (isArray(init2)) {
    let assembled = init2.map((v2) => assembleInit(v2, isExpr2, wrap2));
    return isExpr2 ? `[${assembled.join(", ")}]` : assembled;
  } else if (isDateTime(init2))
    return wrap2(isExpr2 ? dateTimeToExpr(init2) : dateTimeToTimestamp(init2));
  return isExpr2 ? wrap2(stringify(init2)) : init2;
}
function assembleUnitSelectionSignals(model, signals) {
  for (let selCmpt of vals(model.component.selection ?? {})) {
    let name2 = selCmpt.name, modifyExpr = `${name2}${TUPLE}, ${selCmpt.resolve === "global" ? "true" : `{unit: ${unitName(model)}}`}`;
    for (let c of selectionCompilers)
      c.defined(selCmpt) && (c.signals && (signals = c.signals(model, selCmpt, signals)), c.modifyExpr && (modifyExpr = c.modifyExpr(model, selCmpt, modifyExpr)));
    signals.push({
      name: name2 + MODIFY,
      on: [
        {
          events: { signal: selCmpt.name + TUPLE },
          update: `modify(${stringValue(selCmpt.name + STORE)}, ${modifyExpr})`
        }
      ]
    });
  }
  return cleanupEmptyOnArray(signals);
}
function assembleFacetSignals(model, signals) {
  if (model.component.selection && keys3(model.component.selection).length) {
    let name2 = stringValue(model.getName("cell"));
    signals.unshift({
      name: "facet",
      value: {},
      on: [
        {
          events: eventSelector("pointermove", "scope"),
          update: `isTuple(facet) ? facet : group(${name2}).datum`
        }
      ]
    });
  }
  return cleanupEmptyOnArray(signals);
}
function assembleTopLevelSignals(model, signals) {
  let hasSelections = !1;
  for (let selCmpt of vals(model.component.selection ?? {})) {
    let name2 = selCmpt.name, store = stringValue(name2 + STORE);
    if (signals.filter((s) => s.name === name2).length === 0) {
      let resolve9 = selCmpt.resolve === "global" ? "union" : selCmpt.resolve, isPoint2 = selCmpt.type === "point" ? ", true, true)" : ")";
      signals.push({
        name: selCmpt.name,
        update: `${VL_SELECTION_RESOLVE}(${store}, ${stringValue(resolve9)}${isPoint2}`
      });
    }
    hasSelections = !0;
    for (let c of selectionCompilers)
      c.defined(selCmpt) && c.topLevelSignals && (signals = c.topLevelSignals(model, selCmpt, signals));
  }
  return hasSelections && signals.filter((s) => s.name === "unit").length === 0 && signals.unshift({
    name: "unit",
    value: {},
    on: [{ events: "pointermove", update: "isTuple(group()) ? group() : unit" }]
  }), cleanupEmptyOnArray(signals);
}
function assembleUnitSelectionData(model, data3) {
  let selectionData = [], animationData = [], unit2 = unitName(model, { escape: !1 });
  for (let selCmpt of vals(model.component.selection ?? {})) {
    let store = { name: selCmpt.name + STORE };
    if (selCmpt.project.hasSelectionId && (store.transform = [{ type: "collect", sort: { field: SELECTION_ID } }]), selCmpt.init) {
      let fields = selCmpt.project.items.map(assembleProjection);
      store.values = selCmpt.project.hasSelectionId ? selCmpt.init.map((i) => ({ unit: unit2, [SELECTION_ID]: assembleInit(i, !1)[0] })) : selCmpt.init.map((i) => ({ unit: unit2, fields, values: assembleInit(i, !1) }));
    }
    if ([...selectionData, ...data3].filter((d) => d.name === selCmpt.name + STORE).length || selectionData.push(store), isTimerSelection(selCmpt) && data3.length) {
      let sourceName = model.lookupDataSource(model.getDataName(DataSourceType.Main)), sourceData = data3.find((d) => d.name === sourceName), sourceDataFilter = sourceData.transform.find((t) => t.type === "filter" && t.expr.includes("vlSelectionTest"));
      if (sourceDataFilter) {
        sourceData.transform = sourceData.transform.filter((t) => t !== sourceDataFilter);
        let currentFrame = {
          name: sourceData.name + CURR,
          source: sourceData.name,
          transform: [sourceDataFilter]
          // add the selection filter to the animation dataset
        };
        animationData.push(currentFrame);
      }
    }
  }
  return selectionData.concat(data3, animationData);
}
function assembleUnitSelectionMarks(model, marks) {
  for (let selCmpt of vals(model.component.selection ?? {}))
    for (let c of selectionCompilers)
      c.defined(selCmpt) && c.marks && (marks = c.marks(model, selCmpt, marks));
  return marks;
}
function assembleLayerSelectionMarks(model, marks) {
  for (let child of model.children)
    isUnitModel(child) && (marks = assembleUnitSelectionMarks(child, marks));
  return marks;
}
function assembleSelectionScaleDomain(model, extent2, scaleCmpt, domain4) {
  let parsedExtent = parseSelectionExtent(model, extent2.param, extent2);
  return {
    signal: hasContinuousDomain(scaleCmpt.get("type")) && isArray(domain4) && domain4[0] > domain4[1] ? `isValid(${parsedExtent}) && reverse(${parsedExtent})` : parsedExtent
  };
}
function cleanupEmptyOnArray(signals) {
  return signals.map((s) => (s.on && !s.on.length && delete s.on, s));
}
var scaleBindings = {
  defined: (selCmpt) => selCmpt.type === "interval" && selCmpt.resolve === "global" && selCmpt.bind && selCmpt.bind === "scales",
  parse: (model, selCmpt) => {
    let bound2 = selCmpt.scales = [];
    for (let proj of selCmpt.project.items) {
      let channel = proj.channel;
      if (!isScaleChannel(channel))
        continue;
      let scale7 = model.getScaleComponent(channel), scaleType2 = scale7 ? scale7.get("type") : void 0;
      if (scaleType2 == "sequential" && warn2(SEQUENTIAL_SCALE_DEPRECATED), !scale7 || !hasContinuousDomain(scaleType2)) {
        warn2(SCALE_BINDINGS_CONTINUOUS);
        continue;
      }
      scale7.set("selectionExtent", { param: selCmpt.name, field: proj.field }, !0), bound2.push(proj);
    }
  },
  topLevelSignals: (model, selCmpt, signals) => {
    let bound2 = selCmpt.scales.filter((proj) => signals.filter((s) => s.name === proj.signals.data).length === 0);
    if (!model.parent || isTopLevelLayer(model) || bound2.length === 0)
      return signals;
    let namedSg = signals.find((s) => s.name === selCmpt.name), update3 = namedSg.update;
    if (update3.includes(VL_SELECTION_RESOLVE))
      namedSg.update = `{${bound2.map((proj) => `${stringValue(replacePathInField(proj.field))}: ${proj.signals.data}`).join(", ")}}`;
    else {
      for (let proj of bound2) {
        let mapping = `${stringValue(replacePathInField(proj.field))}: ${proj.signals.data}`;
        update3.includes(mapping) || (update3 = `${update3.substring(0, update3.length - 1)}, ${mapping}}`);
      }
      namedSg.update = update3;
    }
    return signals.concat(bound2.map((proj) => ({ name: proj.signals.data })));
  },
  signals: (model, selCmpt, signals) => {
    if (model.parent && !isTopLevelLayer(model))
      for (let proj of selCmpt.scales) {
        let signal = signals.find((s) => s.name === proj.signals.data);
        signal.push = "outer", delete signal.value, delete signal.update;
      }
    return signals;
  }
};
function domain3(model, channel) {
  return `domain(${stringValue(model.scaleName(channel))})`;
}
function isTopLevelLayer(model) {
  return model.parent && isLayerModel(model.parent) && (!model.parent.parent || isTopLevelLayer(model.parent.parent));
}
var BRUSH = "_brush", SCALE_TRIGGER = "_scale_trigger", GEO_INIT_TICK = "geo_interval_init_tick", INIT = "_init", CENTER2 = "_center", interval2 = {
  defined: (selCmpt) => selCmpt.type === "interval",
  parse: (model, selCmpt, selDef) => {
    if (model.hasProjection) {
      let def2 = { ...isObject2(selDef.select) ? selDef.select : {} };
      def2.fields = [SELECTION_ID], def2.encodings || (def2.encodings = selDef.value ? keys3(selDef.value) : [LONGITUDE, LATITUDE]), selDef.select = { type: "interval", ...def2 };
    }
    if (selCmpt.translate && !scaleBindings.defined(selCmpt)) {
      let filterExpr = `!event.item || event.item.mark.name !== ${stringValue(selCmpt.name + BRUSH)}`;
      for (let evt of selCmpt.events) {
        if (!evt.between) {
          warn2(`${evt} is not an ordered event stream for interval selections.`);
          continue;
        }
        let filters2 = array_default(evt.between[0].filter ??= []);
        filters2.includes(filterExpr) || filters2.push(filterExpr);
      }
    }
  },
  signals: (model, selCmpt, signals) => {
    let name2 = selCmpt.name, tupleSg = name2 + TUPLE, channels = vals(selCmpt.project.hasChannel).filter((p) => p.channel === X3 || p.channel === Y3), init2 = selCmpt.init ? selCmpt.init[0] : null;
    if (signals.push(...channels.reduce((arr, proj) => arr.concat(channelSignals(model, selCmpt, proj, init2?.[proj.index])), [])), model.hasProjection) {
      let projection3 = stringValue(model.projectionName()), centerSg = model.projectionName() + CENTER2, { x: x5, y: y5 } = selCmpt.project.hasChannel, xvname = x5?.signals.visual, yvname = y5?.signals.visual, xinit = x5 ? init2?.[x5.index] : `${centerSg}[0]`, yinit = y5 ? init2?.[y5.index] : `${centerSg}[1]`, sizeSg = (layout) => model.getSizeSignalRef(layout).signal, bbox = `[[${xvname ? `${xvname}[0]` : "0"}, ${yvname ? `${yvname}[0]` : "0"}],[${xvname ? `${xvname}[1]` : sizeSg("width")}, ${yvname ? `${yvname}[1]` : sizeSg("height")}]]`;
      init2 && (signals.unshift({
        name: name2 + INIT,
        init: `[scale(${projection3}, [${x5 ? xinit[0] : xinit}, ${y5 ? yinit[0] : yinit}]), scale(${projection3}, [${x5 ? xinit[1] : xinit}, ${y5 ? yinit[1] : yinit}])]`
      }), (!x5 || !y5) && (signals.find((s) => s.name === centerSg) || signals.unshift({
        name: centerSg,
        update: `invert(${projection3}, [${sizeSg("width")}/2, ${sizeSg("height")}/2])`
      })));
      let intersect5 = `intersect(${bbox}, {markname: ${stringValue(model.getName("marks"))}}, unit.mark)`, base = `{unit: ${unitName(model)}}`, update3 = `vlSelectionTuples(${intersect5}, ${base})`, visualSignals = channels.map((proj) => proj.signals.visual);
      return signals.concat({
        name: tupleSg,
        on: [
          {
            events: [
              ...visualSignals.length ? [{ signal: visualSignals.join(" || ") }] : [],
              ...init2 ? [{ signal: GEO_INIT_TICK }] : []
            ],
            update: update3
          }
        ]
      });
    } else {
      if (!scaleBindings.defined(selCmpt)) {
        let triggerSg = name2 + SCALE_TRIGGER, scaleTriggers = channels.map((proj) => {
          let channel = proj.channel, { data: dname, visual: vname } = proj.signals, scaleName = stringValue(model.scaleName(channel)), scaleType2 = model.getScaleComponent(channel).get("type"), toNum = hasContinuousDomain(scaleType2) ? "+" : "";
          return `(!isArray(${dname}) || (${toNum}invert(${scaleName}, ${vname})[0] === ${toNum}${dname}[0] && ${toNum}invert(${scaleName}, ${vname})[1] === ${toNum}${dname}[1]))`;
        });
        scaleTriggers.length && signals.push({
          name: triggerSg,
          value: {},
          on: [
            {
              events: channels.map((proj) => ({ scale: model.scaleName(proj.channel) })),
              update: `${scaleTriggers.join(" && ")} ? ${triggerSg} : {}`
            }
          ]
        });
      }
      let dataSignals = channels.map((proj) => proj.signals.data), update3 = `unit: ${unitName(model)}, fields: ${name2 + TUPLE_FIELDS}, values`;
      return signals.concat({
        name: tupleSg,
        ...init2 ? { init: `{${update3}: ${assembleInit(init2)}}` } : {},
        ...dataSignals.length ? {
          on: [
            {
              events: [{ signal: dataSignals.join(" || ") }],
              // Prevents double invocation, see https://github.com/vega/vega/issues/1672.
              update: `${dataSignals.join(" && ")} ? {${update3}: [${dataSignals}]} : null`
            }
          ]
        } : {}
      });
    }
  },
  topLevelSignals: (model, selCmpt, signals) => (isUnitModel(model) && model.hasProjection && selCmpt.init && (signals.filter((s) => s.name === GEO_INIT_TICK).length || signals.unshift({
    name: GEO_INIT_TICK,
    value: null,
    on: [
      {
        events: "timer{1}",
        update: `${GEO_INIT_TICK} === null ? {} : ${GEO_INIT_TICK}`
      }
    ]
  })), signals),
  marks: (model, selCmpt, marks) => {
    let name2 = selCmpt.name, { x: x5, y: y5 } = selCmpt.project.hasChannel, xvname = x5?.signals.visual, yvname = y5?.signals.visual, store = `data(${stringValue(selCmpt.name + STORE)})`;
    if (scaleBindings.defined(selCmpt) || !x5 && !y5)
      return marks;
    let update3 = {
      x: x5 !== void 0 ? { signal: `${xvname}[0]` } : { value: 0 },
      y: y5 !== void 0 ? { signal: `${yvname}[0]` } : { value: 0 },
      x2: x5 !== void 0 ? { signal: `${xvname}[1]` } : { field: { group: "width" } },
      y2: y5 !== void 0 ? { signal: `${yvname}[1]` } : { field: { group: "height" } }
    };
    if (selCmpt.resolve === "global")
      for (let key2 of keys3(update3))
        update3[key2] = [
          {
            test: `${store}.length && ${store}[0].unit === ${unitName(model)}`,
            ...update3[key2]
          },
          { value: 0 }
        ];
    let { fill: fill2, fillOpacity, cursor: cursor3, ...stroke2 } = selCmpt.mark, vgStroke = keys3(stroke2).reduce((def2, k) => (def2[k] = [
      {
        test: [
          x5 !== void 0 && `${xvname}[0] !== ${xvname}[1]`,
          y5 !== void 0 && `${yvname}[0] !== ${yvname}[1]`
        ].filter((t) => t).join(" && "),
        value: stroke2[k]
      },
      { value: null }
    ], def2), {}), vgCursor = cursor3 ?? (selCmpt.translate ? "move" : null);
    return [
      {
        name: `${name2 + BRUSH}_bg`,
        type: "rect",
        clip: !0,
        encode: {
          enter: {
            fill: { value: fill2 },
            fillOpacity: { value: fillOpacity }
          },
          update: update3
        }
      },
      ...marks,
      {
        name: name2 + BRUSH,
        type: "rect",
        clip: !0,
        encode: {
          enter: {
            ...vgCursor ? { cursor: { value: vgCursor } } : {},
            fill: { value: "transparent" }
          },
          update: { ...update3, ...vgStroke }
        }
      }
    ];
  }
};
function channelSignals(model, selCmpt, proj, init2) {
  let scaledInterval = !model.hasProjection, channel = proj.channel, vname = proj.signals.visual, scaleName = stringValue(scaledInterval ? model.scaleName(channel) : model.projectionName()), scaled = (str) => `scale(${scaleName}, ${str})`, size = model.getSizeSignalRef(channel === X3 ? "width" : "height").signal, coord = `${channel}(unit)`, von = selCmpt.events.reduce((def2, evt) => [
    ...def2,
    { events: evt.between[0], update: `[${coord}, ${coord}]` },
    // Brush Start
    { events: evt, update: `[${vname}[0], clamp(${coord}, 0, ${size})]` }
    // Brush End
  ], []);
  if (scaledInterval) {
    let dname = proj.signals.data, hasScales = scaleBindings.defined(selCmpt), scale7 = model.getScaleComponent(channel), scaleType2 = scale7 ? scale7.get("type") : void 0, vinit = init2 ? { init: assembleInit(init2, !0, scaled) } : { value: [] };
    return von.push({
      events: { signal: selCmpt.name + SCALE_TRIGGER },
      update: hasContinuousDomain(scaleType2) ? `[${scaled(`${dname}[0]`)}, ${scaled(`${dname}[1]`)}]` : "[0, 0]"
    }), hasScales ? [{ name: dname, on: [] }] : [
      { name: vname, ...vinit, on: von },
      {
        name: dname,
        ...init2 ? { init: assembleInit(init2) } : {},
        // Cannot be `value` as `init` may require datetime exprs.
        on: [
          {
            events: { signal: vname },
            update: `${vname}[0] === ${vname}[1] ? null : invert(${scaleName}, ${vname})`
          }
        ]
      }
    ];
  } else {
    let initIdx = channel === X3 ? 0 : 1, initSg = selCmpt.name + INIT, vinit = init2 ? { init: `[${initSg}[0][${initIdx}], ${initSg}[1][${initIdx}]]` } : { value: [] };
    return [{ name: vname, ...vinit, on: von }];
  }
}
function wrapCondition({ model, channelDef, vgChannel, invalidValueRef, mainRefFn }) {
  let condition = isConditionalDef(channelDef) && channelDef.condition, valueRefs = [];
  condition && (valueRefs = array_default(condition).map((c) => {
    let conditionValueRef = mainRefFn(c);
    if (isConditionalParameter(c)) {
      let { param: param2, empty } = c;
      return { test: parseSelectionPredicate(model, { param: param2, empty }), ...conditionValueRef };
    } else
      return { test: expression2(model, c.test), ...conditionValueRef };
  })), invalidValueRef !== void 0 && valueRefs.push(invalidValueRef);
  let mainValueRef = mainRefFn(channelDef);
  return mainValueRef !== void 0 && valueRefs.push(mainValueRef), valueRefs.length > 1 || valueRefs.length === 1 && valueRefs[0].test ? { [vgChannel]: valueRefs } : valueRefs.length === 1 ? { [vgChannel]: valueRefs[0] } : {};
}
function text$1(model, channel = "text") {
  let channelDef = model.encoding[channel];
  return wrapCondition({
    model,
    channelDef,
    vgChannel: channel,
    mainRefFn: (cDef) => textRef(cDef, model.config),
    invalidValueRef: void 0
    // text encoding doesn't have continuous scales and thus can't have invalid values
  });
}
function textRef(channelDef, config2, expr2 = "datum") {
  if (channelDef) {
    if (isValueDef(channelDef))
      return signalOrValueRef(channelDef.value);
    if (isFieldOrDatumDef(channelDef)) {
      let { format: format5, formatType } = getFormatMixins(channelDef);
      return formatSignalRef({ fieldOrDatumDef: channelDef, format: format5, formatType, expr: expr2, config: config2 });
    }
  }
}
function tooltip(model, opt = {}) {
  let { encoding, markDef, config: config2, stack: stack2 } = model, channelDef = encoding.tooltip;
  if (isArray(channelDef))
    return { tooltip: tooltipRefForEncoding({ tooltip: channelDef }, stack2, config2, opt) };
  {
    let datum2 = opt.reactiveGeom ? "datum.datum" : "datum";
    return wrapCondition({
      model,
      channelDef,
      vgChannel: "tooltip",
      mainRefFn: (cDef) => {
        let tooltipRefFromChannelDef = addLineBreaksToTooltip(cDef, config2, datum2);
        if (tooltipRefFromChannelDef)
          return tooltipRefFromChannelDef;
        if (cDef === null)
          return;
        let markTooltip = getMarkPropOrConfig("tooltip", markDef, config2);
        if (markTooltip === !0 && (markTooltip = { content: "encoding" }), isString(markTooltip))
          return { value: markTooltip };
        if (isObject2(markTooltip))
          return isSignalRef(markTooltip) ? markTooltip : markTooltip.content === "encoding" ? tooltipRefForEncoding(encoding, stack2, config2, opt) : { signal: datum2 };
      },
      invalidValueRef: void 0
      // tooltip encoding doesn't have continuous scales and thus can't have invalid values
    });
  }
}
function tooltipData(encoding, stack2, config2, { reactiveGeom } = {}) {
  let formatConfig = { ...config2, ...config2.tooltipFormat }, toSkip = /* @__PURE__ */ new Set(), expr2 = reactiveGeom ? "datum.datum" : "datum", tuples = [];
  function add6(fDef, channel) {
    let mainChannel = getMainRangeChannel(channel), fieldDef = isTypedFieldDef(fDef) ? fDef : {
      ...fDef,
      type: encoding[mainChannel].type
      // for secondary field def, copy type from main channel
    }, title2 = fieldDef.title || defaultTitle(fieldDef, formatConfig), key2 = array_default(title2).join(", ").replaceAll(/"/g, '\\"'), value3;
    if (isXorY(channel)) {
      let channel2 = channel === "x" ? "x2" : "y2", fieldDef2 = getFieldDef(encoding[channel2]);
      if (isBinned(fieldDef.bin) && fieldDef2) {
        let startField = vgField(fieldDef, { expr: expr2 }), endField = vgField(fieldDef2, { expr: expr2 }), { format: format5, formatType } = getFormatMixins(fieldDef);
        value3 = binFormatExpression(startField, endField, format5, formatType, formatConfig), toSkip.add(channel2);
      }
    }
    if ((isXorY(channel) || channel === THETA || channel === RADIUS) && stack2 && stack2.fieldChannel === channel && stack2.offset === "normalize") {
      let { format: format5, formatType } = getFormatMixins(fieldDef);
      value3 = formatSignalRef({
        fieldOrDatumDef: fieldDef,
        format: format5,
        formatType,
        expr: expr2,
        config: formatConfig,
        normalizeStack: !0
      }).signal;
    }
    value3 ??= addLineBreaksToTooltip(fieldDef, formatConfig, expr2).signal, tuples.push({ channel, key: key2, value: value3 });
  }
  forEach(encoding, (channelDef, channel) => {
    isFieldDef(channelDef) ? add6(channelDef, channel) : hasConditionalFieldDef(channelDef) && add6(channelDef.condition, channel);
  });
  let out = {};
  for (let { channel, key: key2, value: value3 } of tuples)
    !toSkip.has(channel) && !out[key2] && (out[key2] = value3);
  return out;
}
function tooltipRefForEncoding(encoding, stack2, config2, { reactiveGeom } = {}) {
  let data3 = tooltipData(encoding, stack2, config2, { reactiveGeom }), keyValues = entries$1(data3).map(([key2, value3]) => `"${key2}": ${value3}`);
  return keyValues.length > 0 ? { signal: `{${keyValues.join(", ")}}` } : void 0;
}
function addLineBreaksToTooltip(channelDef, config2, expr2 = "datum") {
  if (isFieldDef(channelDef) && isDiscrete$1(channelDef.type) && !channelDef.timeUnit && !getFormatMixins(channelDef).format && !getFormatMixins(channelDef).formatType) {
    let fieldString = `${expr2}["${channelDef.field}"]`;
    return {
      signal: `isValid(${fieldString}) ? isArray(${fieldString}) ? join(${fieldString}, '\\n') : ${fieldString} : ""+${fieldString}`
    };
  }
  return textRef(channelDef, config2, expr2);
}
function aria(model) {
  let { markDef, config: config2 } = model, enableAria = getMarkPropOrConfig("aria", markDef, config2);
  return enableAria === !1 ? {} : {
    ...enableAria ? { aria: enableAria } : {},
    ...ariaRoleDescription(model),
    ...description(model)
  };
}
function ariaRoleDescription(model) {
  let { mark, markDef, config: config2 } = model;
  if (config2.aria === !1)
    return {};
  let ariaRoleDesc = getMarkPropOrConfig("ariaRoleDescription", markDef, config2);
  return ariaRoleDesc != null ? { ariaRoleDescription: { value: ariaRoleDesc } } : hasOwnProperty(VG_MARK_INDEX, mark) ? {} : { ariaRoleDescription: { value: mark } };
}
function description(model) {
  let { encoding, markDef, config: config2, stack: stack2 } = model, channelDef = encoding.description;
  if (channelDef)
    return wrapCondition({
      model,
      channelDef,
      vgChannel: "description",
      mainRefFn: (cDef) => textRef(cDef, model.config),
      invalidValueRef: void 0
      // aria encoding doesn't have continuous scales and thus can't have invalid values
    });
  let descriptionValue = getMarkPropOrConfig("description", markDef, config2);
  if (descriptionValue != null)
    return {
      description: signalOrValueRef(descriptionValue)
    };
  if (config2.aria === !1)
    return {};
  let data3 = tooltipData(encoding, stack2, config2);
  if (!isEmpty(data3))
    return {
      description: {
        signal: entries$1(data3).filter(([key2]) => !key2.startsWith("_")).map(([key2, value3]) => [key2, value3.replaceAll("\\n", " ")]).map(([key2, value3], index4) => `"${index4 > 0 ? "; " : ""}${key2}: " + (${value3})`).join(" + ")
      }
    };
}
function nonPosition(channel, model, opt = {}) {
  let { markDef, encoding, config: config2 } = model, { vgChannel } = opt, { defaultRef, defaultValue } = opt, channelDef = encoding[channel];
  defaultRef === void 0 && (defaultValue ??= getMarkPropOrConfig(channel, markDef, config2, {
    vgChannel,
    // If there is no conditonal def, we ignore vgConfig so the output spec is concise.
    // However, if there is a conditional def, we must include vgConfig so the default is respected.
    ignoreVgConfig: !isConditionalDef(channelDef)
  }), defaultValue !== void 0 && (defaultRef = signalOrValueRef(defaultValue)));
  let commonProps = {
    markDef,
    config: config2,
    scaleName: model.scaleName(channel),
    scale: model.getScaleComponent(channel)
  }, invalidValueRef = getConditionalValueRefForIncludingInvalidValue({
    ...commonProps,
    scaleChannel: channel,
    channelDef
  });
  return wrapCondition({
    model,
    channelDef,
    vgChannel: vgChannel ?? channel,
    invalidValueRef,
    mainRefFn: (cDef) => midPoint({
      ...commonProps,
      channel,
      channelDef: cDef,
      stack: null,
      // No need to provide stack for non-position as it does not affect mid point
      defaultRef
    })
  });
}
function color4(model, opt = { filled: void 0 }) {
  let { markDef, encoding, config: config2 } = model, { type: markType2 } = markDef, filled = opt.filled ?? getMarkPropOrConfig("filled", markDef, config2), transparentIfNeeded = contains2(["bar", "point", "circle", "square", "geoshape"], markType2) ? "transparent" : void 0, defaultFill = getMarkPropOrConfig(filled === !0 ? "color" : void 0, markDef, config2, { vgChannel: "fill" }) ?? // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
  config2.mark[filled === !0 && "color"] ?? // If there is no fill, always fill symbols, bar, geoshape
  // with transparent fills https://github.com/vega/vega-lite/issues/1316
  transparentIfNeeded, defaultStroke = getMarkPropOrConfig(filled === !1 ? "color" : void 0, markDef, config2, { vgChannel: "stroke" }) ?? // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
  config2.mark[filled === !1 && "color"], colorVgChannel = filled ? "fill" : "stroke", fillStrokeMarkDefAndConfig = {
    ...defaultFill ? { fill: signalOrValueRef(defaultFill) } : {},
    ...defaultStroke ? { stroke: signalOrValueRef(defaultStroke) } : {}
  };
  return markDef.color && (filled ? markDef.fill : markDef.stroke) && warn2(droppingColor("property", { fill: "fill" in markDef, stroke: "stroke" in markDef })), {
    ...fillStrokeMarkDefAndConfig,
    ...nonPosition("color", model, {
      vgChannel: colorVgChannel,
      defaultValue: filled ? defaultFill : defaultStroke
    }),
    ...nonPosition("fill", model, {
      // if there is encoding.fill, include default fill just in case we have conditional-only fill encoding
      defaultValue: encoding.fill ? defaultFill : void 0
    }),
    ...nonPosition("stroke", model, {
      // if there is encoding.stroke, include default fill just in case we have conditional-only stroke encoding
      defaultValue: encoding.stroke ? defaultStroke : void 0
    })
  };
}
function zindex(model) {
  let { encoding, mark } = model, order = encoding.order;
  return !isPathMark(mark) && isValueDef(order) ? wrapCondition({
    model,
    channelDef: order,
    vgChannel: "zindex",
    mainRefFn: (cd2) => signalOrValueRef(cd2.value),
    invalidValueRef: void 0
    // zindex encoding doesn't have continuous scales and thus can't have invalid values
  }) : {};
}
function positionOffset({ channel: baseChannel, markDef, encoding = {}, model, bandPosition }) {
  let channel = `${baseChannel}Offset`, defaultValue = markDef[channel], channelDef = encoding[channel];
  if ((channel === "xOffset" || channel === "yOffset") && channelDef)
    return { offsetType: "encoding", offset: midPoint({
      channel,
      channelDef,
      markDef,
      config: model?.config,
      scaleName: model.scaleName(channel),
      scale: model.getScaleComponent(channel),
      stack: null,
      defaultRef: signalOrValueRef(defaultValue),
      bandPosition
    }) };
  let markDefOffsetValue = markDef[channel];
  return markDefOffsetValue ? { offsetType: "visual", offset: markDefOffsetValue } : {};
}
function pointPosition(channel, model, { defaultPos, vgChannel }) {
  let { encoding, markDef, config: config2, stack: stack2 } = model, channelDef = encoding[channel], channel2Def = encoding[getSecondaryRangeChannel(channel)], scaleName = model.scaleName(channel), scale7 = model.getScaleComponent(channel), { offset: offset4, offsetType } = positionOffset({
    channel,
    markDef,
    encoding,
    model,
    bandPosition: 0.5
  }), defaultRef = pointPositionDefaultRef({
    model,
    defaultPos,
    channel,
    scaleName,
    scale: scale7
  }), valueRef = !channelDef && isXorY(channel) && (encoding.latitude || encoding.longitude) ? (
    // use geopoint output if there are lat/long and there is no point position overriding lat/long.
    { field: model.getName(channel) }
  ) : positionRef({
    channel,
    channelDef,
    channel2Def,
    markDef,
    config: config2,
    scaleName,
    scale: scale7,
    stack: stack2,
    offset: offset4,
    defaultRef,
    bandPosition: offsetType === "encoding" ? 0 : void 0
  });
  return valueRef ? { [vgChannel || channel]: valueRef } : void 0;
}
function positionRef(params2) {
  let { channel, channelDef, scaleName, stack: stack2, offset: offset4, markDef } = params2;
  if (isFieldOrDatumDef(channelDef) && stack2 && channel === stack2.fieldChannel) {
    if (isFieldDef(channelDef)) {
      let bandPosition = channelDef.bandPosition;
      if (bandPosition === void 0 && markDef.type === "text" && (channel === "radius" || channel === "theta") && (bandPosition = 0.5), bandPosition !== void 0)
        return interpolatedSignalRef({
          scaleName,
          fieldOrDatumDef: channelDef,
          // positionRef always have type
          startSuffix: "start",
          bandPosition,
          offset: offset4
        });
    }
    return valueRefForFieldOrDatumDef(channelDef, scaleName, { suffix: "end" }, { offset: offset4 });
  }
  return midPointRefWithPositionInvalidTest(params2);
}
function pointPositionDefaultRef({ model, defaultPos, channel, scaleName, scale: scale7 }) {
  let { markDef, config: config2 } = model;
  return () => {
    let mainChannel = getMainRangeChannel(channel), vgChannel = getVgPositionChannel(channel), definedValueOrConfig = getMarkPropOrConfig(channel, markDef, config2, { vgChannel });
    if (definedValueOrConfig !== void 0)
      return widthHeightValueOrSignalRef(channel, definedValueOrConfig);
    switch (defaultPos) {
      case "zeroOrMin":
        return zeroOrMinOrMaxPosition({ scaleName, scale: scale7, mode: "zeroOrMin", mainChannel, config: config2 });
      case "zeroOrMax":
        return zeroOrMinOrMaxPosition({
          scaleName,
          scale: scale7,
          mode: { zeroOrMax: { widthSignal: model.width.signal, heightSignal: model.height.signal } },
          mainChannel,
          config: config2
        });
      case "mid":
        return { ...model[getSizeChannel(channel)], mult: 0.5 };
    }
  };
}
function zeroOrMinOrMaxPosition({ mainChannel, config: config2, ...otherProps }) {
  let scaledValueRef = scaledZeroOrMinOrMax(otherProps), { mode } = otherProps;
  if (scaledValueRef)
    return scaledValueRef;
  switch (mainChannel) {
    case "radius": {
      if (mode === "zeroOrMin")
        return { value: 0 };
      let { widthSignal, heightSignal } = mode.zeroOrMax;
      return {
        signal: `min(${widthSignal},${heightSignal})/2`
      };
    }
    case "theta":
      return mode === "zeroOrMin" ? { value: 0 } : { signal: "2*PI" };
    case "x":
      return mode === "zeroOrMin" ? { value: 0 } : { field: { group: "width" } };
    case "y":
      return mode === "zeroOrMin" ? { field: { group: "height" } } : { value: 0 };
  }
}
var ALIGNED_X_CHANNEL = {
  left: "x",
  center: "xc",
  right: "x2"
}, BASELINED_Y_CHANNEL = {
  top: "y",
  middle: "yc",
  bottom: "y2"
};
function vgAlignedPositionChannel(channel, markDef, config2, defaultAlign = "middle") {
  if (channel === "radius" || channel === "theta")
    return getVgPositionChannel(channel);
  let alignChannel = channel === "x" ? "align" : "baseline", align2 = getMarkPropOrConfig(alignChannel, markDef, config2), alignExcludingSignal;
  return isSignalRef(align2) ? (warn2(rangeMarkAlignmentCannotBeExpression(alignChannel)), alignExcludingSignal = void 0) : alignExcludingSignal = align2, channel === "x" ? ALIGNED_X_CHANNEL[alignExcludingSignal || (defaultAlign === "top" ? "left" : "center")] : BASELINED_Y_CHANNEL[alignExcludingSignal || defaultAlign];
}
function pointOrRangePosition(channel, model, { defaultPos, defaultPos2, range: range7 }) {
  return range7 ? rangePosition(channel, model, { defaultPos, defaultPos2 }) : pointPosition(channel, model, { defaultPos });
}
function rangePosition(channel, model, { defaultPos, defaultPos2 }) {
  let { markDef, config: config2 } = model, channel2 = getSecondaryRangeChannel(channel), sizeChannel = getSizeChannel(channel), pos2Mixins = pointPosition2OrSize(model, defaultPos2, channel2), vgChannel = pos2Mixins[sizeChannel] ? (
    // If there is width/height, we need to position the marks based on the alignment.
    vgAlignedPositionChannel(channel, markDef, config2)
  ) : (
    // Otherwise, make sure to apply to the right Vg Channel (for arc mark)
    getVgPositionChannel(channel)
  );
  return {
    ...pointPosition(channel, model, { defaultPos, vgChannel }),
    ...pos2Mixins
  };
}
function pointPosition2OrSize(model, defaultPos, channel) {
  let { encoding, mark, markDef, stack: stack2, config: config2 } = model, baseChannel = getMainRangeChannel(channel), sizeChannel = getSizeChannel(channel), vgChannel = getVgPositionChannel(channel), channelDef = encoding[baseChannel], scaleName = model.scaleName(baseChannel), scale7 = model.getScaleComponent(baseChannel), { offset: offset4 } = channel in encoding || channel in markDef ? positionOffset({ channel, markDef, encoding, model }) : positionOffset({ channel: baseChannel, markDef, encoding, model });
  if (!channelDef && (channel === "x2" || channel === "y2") && (encoding.latitude || encoding.longitude)) {
    let vgSizeChannel = getSizeChannel(channel), size = model.markDef[vgSizeChannel];
    return size != null ? {
      [vgSizeChannel]: { value: size }
    } : {
      [vgChannel]: { field: model.getName(channel) }
    };
  }
  let valueRef = position2Ref({
    channel,
    channelDef,
    channel2Def: encoding[channel],
    markDef,
    config: config2,
    scaleName,
    scale: scale7,
    stack: stack2,
    offset: offset4,
    defaultRef: void 0
  });
  return valueRef !== void 0 ? { [vgChannel]: valueRef } : position2orSize(channel, markDef) || position2orSize(channel, {
    [channel]: getMarkStyleConfig(channel, markDef, config2.style),
    [sizeChannel]: getMarkStyleConfig(sizeChannel, markDef, config2.style)
  }) || position2orSize(channel, config2[mark]) || position2orSize(channel, config2.mark) || {
    [vgChannel]: pointPositionDefaultRef({
      model,
      defaultPos,
      channel,
      scaleName,
      scale: scale7
    })()
  };
}
function position2Ref({ channel, channelDef, channel2Def, markDef, config: config2, scaleName, scale: scale7, stack: stack2, offset: offset4, defaultRef }) {
  return isFieldOrDatumDef(channelDef) && stack2 && // If fieldChannel is X and channel is X2 (or Y and Y2)
  channel.charAt(0) === stack2.fieldChannel.charAt(0) ? valueRefForFieldOrDatumDef(channelDef, scaleName, { suffix: "start" }, { offset: offset4 }) : midPointRefWithPositionInvalidTest({
    channel,
    channelDef: channel2Def,
    scaleName,
    scale: scale7,
    stack: stack2,
    markDef,
    config: config2,
    offset: offset4,
    defaultRef
  });
}
function position2orSize(channel, markDef) {
  let sizeChannel = getSizeChannel(channel), vgChannel = getVgPositionChannel(channel);
  if (markDef[vgChannel] !== void 0)
    return { [vgChannel]: widthHeightValueOrSignalRef(channel, markDef[vgChannel]) };
  if (markDef[channel] !== void 0)
    return { [vgChannel]: widthHeightValueOrSignalRef(channel, markDef[channel]) };
  if (markDef[sizeChannel]) {
    let dimensionSize = markDef[sizeChannel];
    if (isRelativeBandSize(dimensionSize))
      warn2(relativeBandSizeNotSupported(sizeChannel));
    else
      return { [sizeChannel]: widthHeightValueOrSignalRef(channel, dimensionSize) };
  }
}
function rectPosition(model, channel) {
  let { config: config2, encoding, markDef } = model, mark = markDef.type, channel2 = getSecondaryRangeChannel(channel), sizeChannel = getSizeChannel(channel), channelDef = encoding[channel], channelDef2 = encoding[channel2], scale7 = model.getScaleComponent(channel), scaleType2 = scale7 ? scale7.get("type") : void 0, orient2 = markDef.orient, hasSizeDef = encoding[sizeChannel] ?? encoding.size ?? getMarkPropOrConfig("size", markDef, config2, { vgChannel: sizeChannel }), offsetScaleChannel = getOffsetChannel(channel), isBarOrTickBand = mark === "bar" && (channel === "x" ? orient2 === "vertical" : orient2 === "horizontal") || mark === "tick" && (channel === "y" ? orient2 === "vertical" : orient2 === "horizontal");
  return isFieldDef(channelDef) && (isBinning(channelDef.bin) || isBinned(channelDef.bin) || channelDef.timeUnit && !channelDef2) && !(hasSizeDef && !isRelativeBandSize(hasSizeDef)) && !encoding[offsetScaleChannel] && !hasDiscreteDomain(scaleType2) ? rectBinPosition({
    fieldDef: channelDef,
    fieldDef2: channelDef2,
    channel,
    model
  }) : (isFieldOrDatumDef(channelDef) && hasDiscreteDomain(scaleType2) || isBarOrTickBand) && !channelDef2 ? positionAndSize(channelDef, channel, model) : rangePosition(channel, model, { defaultPos: "zeroOrMax", defaultPos2: "zeroOrMin" });
}
function defaultSizeRef(sizeChannel, scaleName, scale7, config2, bandSize, hasFieldDef, mark) {
  if (isRelativeBandSize(bandSize))
    if (scale7) {
      let scaleType2 = scale7.get("type");
      if (scaleType2 === "band") {
        let bandWidth = `bandwidth('${scaleName}')`;
        bandSize.band !== 1 && (bandWidth = `${bandSize.band} * ${bandWidth}`);
        let minBandSize = getMarkConfig("minBandSize", { type: mark }, config2);
        return { signal: minBandSize ? `max(${signalOrStringValue(minBandSize)}, ${bandWidth})` : bandWidth };
      } else bandSize.band !== 1 && warn2(cannotUseRelativeBandSizeWithNonBandScale(scaleType2));
    } else
      return {
        mult: bandSize.band,
        field: { group: sizeChannel }
      };
  else {
    if (isSignalRef(bandSize))
      return bandSize;
    if (bandSize)
      return { value: bandSize };
  }
  if (scale7) {
    let scaleRange = scale7.get("range");
    if (isVgRangeStep(scaleRange) && isNumber(scaleRange.step))
      return { value: scaleRange.step - 2 };
  }
  if (!hasFieldDef) {
    let { bandPaddingInner, barBandPaddingInner, rectBandPaddingInner, tickBandPaddingInner } = config2.scale, padding3 = getFirstDefined(bandPaddingInner, mark === "tick" ? tickBandPaddingInner : mark === "bar" ? barBandPaddingInner : rectBandPaddingInner);
    if (isSignalRef(padding3))
      return { signal: `(1 - (${padding3.signal})) * ${sizeChannel}` };
    if (isNumber(padding3))
      return { signal: `${1 - padding3} * ${sizeChannel}` };
  }
  return { value: getViewConfigDiscreteStep(config2.view, sizeChannel) - 2 };
}
function positionAndSize(fieldDef, channel, model) {
  let { markDef, encoding, config: config2, stack: stack2 } = model, orient2 = markDef.orient, scaleName = model.scaleName(channel), scale7 = model.getScaleComponent(channel), vgSizeChannel = getSizeChannel(channel), channel2 = getSecondaryRangeChannel(channel), offsetScaleChannel = getOffsetChannel(channel), offsetScaleName = model.scaleName(offsetScaleChannel), offsetScale = model.getScaleComponent(getOffsetScaleChannel(channel)), useVlSizeChannel = (
    // Always uses size channel for ticks, because tick only calls rectPosition() for the size channel
    markDef.type === "tick" || // use "size" channel for bars, if there is orient and the channel matches the right orientation
    orient2 === "horizontal" && channel === "y" || orient2 === "vertical" && channel === "x"
  ), sizeMixins;
  (encoding.size || markDef.size) && (useVlSizeChannel ? sizeMixins = nonPosition("size", model, {
    vgChannel: vgSizeChannel,
    defaultRef: signalOrValueRef(markDef.size)
  }) : warn2(cannotApplySizeToNonOrientedMark(markDef.type)));
  let hasSizeFromMarkOrEncoding = !!sizeMixins, bandSize = getBandSize({
    channel,
    fieldDef,
    markDef,
    config: config2,
    scaleType: (scale7 || offsetScale)?.get("type"),
    useVlSizeChannel
  });
  sizeMixins = sizeMixins || {
    [vgSizeChannel]: defaultSizeRef(vgSizeChannel, offsetScaleName || scaleName, offsetScale || scale7, config2, bandSize, !!fieldDef, markDef.type)
  };
  let defaultBandAlign = (scale7 || offsetScale)?.get("type") === "band" && isRelativeBandSize(bandSize) && !hasSizeFromMarkOrEncoding ? "top" : "middle", vgChannel = vgAlignedPositionChannel(channel, markDef, config2, defaultBandAlign), center = vgChannel === "xc" || vgChannel === "yc", { offset: offset4, offsetType } = positionOffset({ channel, markDef, encoding, model, bandPosition: center ? 0.5 : 0 }), bandPosition = (center && offsetType !== "encoding" && isFieldDef(fieldDef) && fieldDef.timeUnit && !encoding[channel2] ? getBandPosition({ fieldDef, markDef, config: config2 }) : void 0) ?? (center ? offsetType === "encoding" ? 0 : 0.5 : isSignalRef(bandSize) ? { signal: `(1-${bandSize})/2` } : isRelativeBandSize(bandSize) ? (1 - bandSize.band) / 2 : 0), posRef = midPointRefWithPositionInvalidTest({
    channel,
    channelDef: fieldDef,
    markDef,
    config: config2,
    scaleName,
    scale: scale7,
    stack: stack2,
    offset: offset4,
    defaultRef: pointPositionDefaultRef({ model, defaultPos: "mid", channel, scaleName, scale: scale7 }),
    bandPosition
  });
  if (vgSizeChannel)
    return { [vgChannel]: posRef, ...sizeMixins };
  {
    let vgChannel2 = getVgPositionChannel(channel2), sizeRef = sizeMixins[vgSizeChannel], sizeOffset = offset4 ? { ...sizeRef, offset: offset4 } : sizeRef;
    return {
      [vgChannel]: posRef,
      // posRef might be an array that wraps position invalid test
      [vgChannel2]: isArray(posRef) ? [posRef[0], { ...posRef[1], offset: sizeOffset }] : {
        ...posRef,
        offset: sizeOffset
      }
    };
  }
}
function getBinSpacing(channel, spacing, reverse3, axisTranslate, offset4, minBandSize, bandSizeExpr) {
  if (isPolarPositionChannel(channel))
    return 0;
  let isEnd = channel === "x" || channel === "y2", spacingOffset = isEnd ? -spacing / 2 : spacing / 2;
  if (isSignalRef(reverse3) || isSignalRef(offset4) || isSignalRef(axisTranslate) || minBandSize) {
    let reverseExpr = signalOrStringValue(reverse3), offsetExpr2 = signalOrStringValue(offset4), axisTranslateExpr = signalOrStringValue(axisTranslate), minBandSizeExpr = signalOrStringValue(minBandSize), spacingAndSizeOffset = minBandSize ? `(${bandSizeExpr} < ${minBandSizeExpr} ? ${isEnd ? "" : "-"}0.5 * (${minBandSizeExpr} - (${bandSizeExpr})) : ${spacingOffset})` : spacingOffset, t = axisTranslateExpr ? `${axisTranslateExpr} + ` : "", r = reverseExpr ? `(${reverseExpr} ? -1 : 1) * ` : "", o = offsetExpr2 ? `(${offsetExpr2} + ${spacingAndSizeOffset})` : spacingAndSizeOffset;
    return {
      signal: t + r + o
    };
  } else
    return offset4 = offset4 || 0, axisTranslate + (reverse3 ? -offset4 - spacingOffset : +offset4 + spacingOffset);
}
function rectBinPosition({ fieldDef, fieldDef2, channel, model }) {
  let { config: config2, markDef, encoding } = model, scale7 = model.getScaleComponent(channel), scaleName = model.scaleName(channel), scaleType2 = scale7 ? scale7.get("type") : void 0, reverse3 = scale7.get("reverse"), bandSize = getBandSize({ channel, fieldDef, markDef, config: config2, scaleType: scaleType2 }), axisTranslate = model.component.axes[channel]?.[0]?.get("translate") ?? 0.5, spacing = isXorY(channel) ? getMarkPropOrConfig("binSpacing", markDef, config2) ?? 0 : 0, channel2 = getSecondaryRangeChannel(channel), vgChannel = getVgPositionChannel(channel), vgChannel2 = getVgPositionChannel(channel2), minBandSize = getMarkConfig("minBandSize", markDef, config2), { offset: offset4 } = positionOffset({ channel, markDef, encoding, model, bandPosition: 0 }), { offset: offset22 } = positionOffset({ channel: channel2, markDef, encoding, model, bandPosition: 0 }), bandSizeExpr = binSizeExpr({ fieldDef, scaleName }), binSpacingOffset = getBinSpacing(channel, spacing, reverse3, axisTranslate, offset4, minBandSize, bandSizeExpr), binSpacingOffset2 = getBinSpacing(channel2, spacing, reverse3, axisTranslate, offset22 ?? offset4, minBandSize, bandSizeExpr), bandPositionForBandSize = isSignalRef(bandSize) ? { signal: `(1-${bandSize.signal})/2` } : isRelativeBandSize(bandSize) ? (1 - bandSize.band) / 2 : 0.5, bandPosition = getBandPosition({ fieldDef, fieldDef2, markDef, config: config2 });
  if (isBinning(fieldDef.bin) || fieldDef.timeUnit) {
    let useRectOffsetField = fieldDef.timeUnit && bandPosition !== 0.5;
    return {
      [vgChannel2]: rectBinRef({
        fieldDef,
        scaleName,
        bandPosition: bandPositionForBandSize,
        offset: binSpacingOffset2,
        useRectOffsetField
      }),
      [vgChannel]: rectBinRef({
        fieldDef,
        scaleName,
        bandPosition: isSignalRef(bandPositionForBandSize) ? { signal: `1-${bandPositionForBandSize.signal}` } : 1 - bandPositionForBandSize,
        offset: binSpacingOffset,
        useRectOffsetField
      })
    };
  } else if (isBinned(fieldDef.bin)) {
    let startRef = valueRefForFieldOrDatumDef(fieldDef, scaleName, {}, { offset: binSpacingOffset2 });
    if (isFieldDef(fieldDef2))
      return {
        [vgChannel2]: startRef,
        [vgChannel]: valueRefForFieldOrDatumDef(fieldDef2, scaleName, {}, { offset: binSpacingOffset })
      };
    if (isBinParams(fieldDef.bin) && fieldDef.bin.step)
      return {
        [vgChannel2]: startRef,
        [vgChannel]: {
          signal: `scale("${scaleName}", ${vgField(fieldDef, { expr: "datum" })} + ${fieldDef.bin.step})`,
          offset: binSpacingOffset
        }
      };
  }
  warn2(channelRequiredForBinned(channel2));
}
function rectBinRef({ fieldDef, scaleName, bandPosition, offset: offset4, useRectOffsetField }) {
  return interpolatedSignalRef({
    scaleName,
    fieldOrDatumDef: fieldDef,
    bandPosition,
    offset: offset4,
    ...useRectOffsetField ? {
      startSuffix: OFFSETTED_RECT_START_SUFFIX,
      endSuffix: OFFSETTED_RECT_END_SUFFIX
    } : {}
  });
}
var ALWAYS_IGNORE = /* @__PURE__ */ new Set(["aria", "width", "height"]);
function baseEncodeEntry(model, ignore) {
  let { fill: fill2 = void 0, stroke: stroke2 = void 0 } = ignore.color === "include" ? color4(model) : {};
  return {
    ...markDefProperties(model.markDef, ignore),
    ...colorRef("fill", fill2),
    ...colorRef("stroke", stroke2),
    ...nonPosition("opacity", model),
    ...nonPosition("fillOpacity", model),
    ...nonPosition("strokeOpacity", model),
    ...nonPosition("strokeWidth", model),
    ...nonPosition("strokeDash", model),
    ...zindex(model),
    ...tooltip(model),
    ...text$1(model, "href"),
    ...aria(model)
  };
}
function colorRef(channel, valueRef) {
  return valueRef ? { [channel]: valueRef } : {};
}
function markDefProperties(mark, ignore) {
  return VG_MARK_CONFIGS.reduce((m, prop) => (!ALWAYS_IGNORE.has(prop) && hasProperty(mark, prop) && ignore[prop] !== "ignore" && (m[prop] = signalOrValueRef(mark[prop])), m), {});
}
function defined(model) {
  let { config: config2, markDef } = model, fieldsToBreakPath = /* @__PURE__ */ new Set();
  if (model.forEachFieldDef((fieldDef, channel) => {
    let scaleType2;
    if (!isScaleChannel(channel) || !(scaleType2 = model.getScaleType(channel)))
      return;
    let isCountAggregate = isCountingAggregateOp(fieldDef.aggregate), invalidDataMode = getScaleInvalidDataMode({
      scaleChannel: channel,
      markDef,
      config: config2,
      scaleType: scaleType2,
      isCountAggregate
    });
    if (shouldBreakPath(invalidDataMode)) {
      let field3 = model.vgField(channel, { expr: "datum", binSuffix: model.stack?.impute ? "mid" : void 0 });
      field3 && fieldsToBreakPath.add(field3);
    }
  }), fieldsToBreakPath.size > 0)
    return { defined: { signal: [...fieldsToBreakPath].map((field3) => fieldValidPredicate(field3, !0)).join(" && ") } };
}
function valueIfDefined(prop, value3) {
  if (value3 !== void 0)
    return { [prop]: signalOrValueRef(value3) };
}
var VORONOI = "voronoi", nearest = {
  defined: (selCmpt) => selCmpt.type === "point" && selCmpt.nearest,
  parse: (model, selCmpt) => {
    if (selCmpt.events)
      for (let s of selCmpt.events)
        s.markname = model.getName(VORONOI);
  },
  marks: (model, selCmpt, marks) => {
    let { x: x5, y: y5 } = selCmpt.project.hasChannel, markType2 = model.mark;
    if (isPathMark(markType2))
      return warn2(nearestNotSupportForContinuous(markType2)), marks;
    let cellDef = {
      name: model.getName(VORONOI),
      type: "path",
      interactive: !0,
      aria: !1,
      from: { data: model.getName("marks") },
      encode: {
        update: {
          fill: { value: "transparent" },
          strokeWidth: { value: 0.35 },
          stroke: { value: "transparent" },
          isVoronoi: { value: !0 },
          ...tooltip(model, { reactiveGeom: !0 })
        }
      },
      transform: [
        {
          type: "voronoi",
          x: { expr: x5 || !y5 ? "datum.datum.x || 0" : "0" },
          y: { expr: y5 || !x5 ? "datum.datum.y || 0" : "0" },
          size: [model.getSizeSignalRef("width"), model.getSizeSignalRef("height")]
        }
      ]
    }, index4 = 0, exists = !1;
    return marks.forEach((mark, i) => {
      let name2 = mark.name ?? "";
      name2 === model.component.mark[0].name ? index4 = i : name2.includes(VORONOI) && (exists = !0);
    }), exists || marks.splice(index4 + 1, 0, cellDef), marks;
  }
}, inputBindings = {
  defined: (selCmpt) => selCmpt.type === "point" && selCmpt.resolve === "global" && selCmpt.bind && selCmpt.bind !== "scales" && !isLegendBinding(selCmpt.bind),
  parse: (model, selCmpt, selDef) => disableDirectManipulation(selCmpt, selDef),
  topLevelSignals: (model, selCmpt, signals) => {
    let name2 = selCmpt.name, proj = selCmpt.project, bind3 = selCmpt.bind, init2 = selCmpt.init?.[0], datum2 = nearest.defined(selCmpt) ? "(item().isVoronoi ? datum.datum : datum)" : "datum";
    return proj.items.forEach((p, i) => {
      let sgname = varName(`${name2}_${p.field}`);
      signals.filter((s) => s.name === sgname).length || signals.unshift({
        name: sgname,
        ...init2 ? { init: assembleInit(init2[i]) } : { value: null },
        on: selCmpt.events ? [
          {
            events: selCmpt.events,
            update: `datum && item().mark.marktype !== 'group' ? ${datum2}[${stringValue(p.field)}] : null`
          }
        ] : [],
        bind: bind3[p.field] ?? bind3[p.channel] ?? bind3
      });
    }), signals;
  },
  signals: (model, selCmpt, signals) => {
    let name2 = selCmpt.name, proj = selCmpt.project, signal = signals.find((s) => s.name === name2 + TUPLE), fields = name2 + TUPLE_FIELDS, values3 = proj.items.map((p) => varName(`${name2}_${p.field}`)), valid = values3.map((v2) => `${v2} !== null`).join(" && ");
    return values3.length && (signal.update = `${valid} ? {fields: ${fields}, values: [${values3.join(", ")}]} : null`), delete signal.value, delete signal.on, signals;
  }
}, TOGGLE = "_toggle", toggle = {
  defined: (selCmpt) => selCmpt.type === "point" && !isTimerSelection(selCmpt) && !!selCmpt.toggle,
  signals: (model, selCmpt, signals) => signals.concat({
    name: selCmpt.name + TOGGLE,
    value: !1,
    on: [{ events: selCmpt.events, update: selCmpt.toggle }]
  }),
  modifyExpr: (model, selCmpt) => {
    let tpl = selCmpt.name + TUPLE, signal = selCmpt.name + TOGGLE;
    return `${signal} ? null : ${tpl}, ${selCmpt.resolve === "global" ? `${signal} ? null : true, ` : `${signal} ? null : {unit: ${unitName(model)}}, `}${signal} ? ${tpl} : null`;
  }
}, clear = {
  defined: (selCmpt) => selCmpt.clear !== void 0 && selCmpt.clear !== !1 && !isTimerSelection(selCmpt),
  parse: (model, selCmpt) => {
    selCmpt.clear && (selCmpt.clear = isString(selCmpt.clear) ? eventSelector(selCmpt.clear, "view") : selCmpt.clear);
  },
  topLevelSignals: (model, selCmpt, signals) => {
    if (inputBindings.defined(selCmpt))
      for (let proj of selCmpt.project.items) {
        let idx = signals.findIndex((n) => n.name === varName(`${selCmpt.name}_${proj.field}`));
        idx !== -1 && signals[idx].on.push({ events: selCmpt.clear, update: "null" });
      }
    return signals;
  },
  signals: (model, selCmpt, signals) => {
    function addClear(idx, update3) {
      idx !== -1 && signals[idx].on && signals[idx].on.push({ events: selCmpt.clear, update: update3 });
    }
    if (selCmpt.type === "interval")
      for (let proj of selCmpt.project.items) {
        let vIdx = signals.findIndex((n) => n.name === proj.signals.visual);
        if (addClear(vIdx, "[0, 0]"), vIdx === -1) {
          let dIdx = signals.findIndex((n) => n.name === proj.signals.data);
          addClear(dIdx, "null");
        }
      }
    else {
      let tIdx = signals.findIndex((n) => n.name === selCmpt.name + TUPLE);
      addClear(tIdx, "null"), toggle.defined(selCmpt) && (tIdx = signals.findIndex((n) => n.name === selCmpt.name + TOGGLE), addClear(tIdx, "false"));
    }
    return signals;
  }
}, legendBindings = {
  defined: (selCmpt) => {
    let spec = selCmpt.resolve === "global" && selCmpt.bind && isLegendBinding(selCmpt.bind), projLen = selCmpt.project.items.length === 1 && selCmpt.project.items[0].field !== SELECTION_ID;
    return spec && !projLen && warn2(LEGEND_BINDINGS_MUST_HAVE_PROJECTION), spec && projLen;
  },
  parse: (model, selCmpt, selDef) => {
    let selDef_ = duplicate(selDef);
    if (selDef_.select = isString(selDef_.select) ? { type: selDef_.select, toggle: selCmpt.toggle } : { ...selDef_.select, toggle: selCmpt.toggle }, disableDirectManipulation(selCmpt, selDef_), isObject2(selDef.select) && (selDef.select.on || selDef.select.clear)) {
      let legendFilter = 'event.item && indexof(event.item.mark.role, "legend") < 0';
      for (let evt2 of selCmpt.events)
        evt2.filter = array_default(evt2.filter ?? []), evt2.filter.includes(legendFilter) || evt2.filter.push(legendFilter);
    }
    let evt = isLegendStreamBinding(selCmpt.bind) ? selCmpt.bind.legend : "click", stream2 = isString(evt) ? eventSelector(evt, "view") : array_default(evt);
    selCmpt.bind = { legend: { merge: stream2 } };
  },
  topLevelSignals: (model, selCmpt, signals) => {
    let selName = selCmpt.name, stream2 = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend, markName = (name2) => (s) => {
      let ds = duplicate(s);
      return ds.markname = name2, ds;
    };
    for (let proj of selCmpt.project.items) {
      if (!proj.hasLegend)
        continue;
      let prefix = `${varName(proj.field)}_legend`, sgName = `${selName}_${prefix}`;
      if (signals.filter((s) => s.name === sgName).length === 0) {
        let events3 = stream2.merge.map(markName(`${prefix}_symbols`)).concat(stream2.merge.map(markName(`${prefix}_labels`))).concat(stream2.merge.map(markName(`${prefix}_entries`)));
        signals.unshift({
          name: sgName,
          ...selCmpt.init ? {} : { value: null },
          on: [
            // Legend entries do not store values, so we need to walk the scenegraph to the symbol datum.
            {
              events: events3,
              update: "isDefined(datum.value) ? datum.value : item().items[0].items[0].datum.value",
              force: !0
            },
            { events: stream2.merge, update: `!event.item || !datum ? null : ${sgName}`, force: !0 }
          ]
        });
      }
    }
    return signals;
  },
  signals: (model, selCmpt, signals) => {
    let name2 = selCmpt.name, proj = selCmpt.project, tuple2 = signals.find((s) => s.name === name2 + TUPLE), fields = name2 + TUPLE_FIELDS, values3 = proj.items.filter((p) => p.hasLegend).map((p) => varName(`${name2}_${varName(p.field)}_legend`)), update3 = `${values3.map((v2) => `${v2} !== null`).join(" && ")} ? {fields: ${fields}, values: [${values3.join(", ")}]} : null`;
    selCmpt.events && values3.length > 0 ? tuple2.on.push({
      events: values3.map((signal) => ({ signal })),
      update: update3
    }) : values3.length > 0 && (tuple2.update = update3, delete tuple2.value, delete tuple2.on);
    let toggle2 = signals.find((s) => s.name === name2 + TOGGLE), events3 = isLegendStreamBinding(selCmpt.bind) && selCmpt.bind.legend;
    return toggle2 && (selCmpt.events ? toggle2.on.push({ ...toggle2.on[0], events: events3 }) : toggle2.on[0].events = events3), signals;
  }
};
function parseInteractiveLegend(model, channel, legendCmpt) {
  let field3 = model.fieldDef(channel)?.field;
  for (let selCmpt of vals(model.component.selection ?? {})) {
    let proj = selCmpt.project.hasField[field3] ?? selCmpt.project.hasChannel[channel];
    if (proj && legendBindings.defined(selCmpt)) {
      let legendSelections = legendCmpt.get("selections") ?? [];
      legendSelections.push(selCmpt.name), legendCmpt.set("selections", legendSelections, !1), proj.hasLegend = !0;
    }
  }
}
var ANCHOR$1 = "_translate_anchor", DELTA$1 = "_translate_delta", translate3 = {
  defined: (selCmpt) => selCmpt.type === "interval" && selCmpt.translate,
  signals: (model, selCmpt, signals) => {
    let name2 = selCmpt.name, boundScales = scaleBindings.defined(selCmpt), anchor2 = name2 + ANCHOR$1, { x: x5, y: y5 } = selCmpt.project.hasChannel, events3 = eventSelector(selCmpt.translate, "scope");
    return boundScales || (events3 = events3.map((e) => (e.between[0].markname = name2 + BRUSH, e))), signals.push({
      name: anchor2,
      value: {},
      on: [
        {
          events: events3.map((e) => e.between[0]),
          update: `{x: x(unit), y: y(unit)${x5 !== void 0 ? `, extent_x: ${boundScales ? domain3(model, X3) : `slice(${x5.signals.visual})`}` : ""}${y5 !== void 0 ? `, extent_y: ${boundScales ? domain3(model, Y3) : `slice(${y5.signals.visual})`}` : ""}}`
        }
      ]
    }, {
      name: name2 + DELTA$1,
      value: {},
      on: [
        {
          events: events3,
          update: `{x: ${anchor2}.x - x(unit), y: ${anchor2}.y - y(unit)}`
        }
      ]
    }), x5 !== void 0 && onDelta$1(model, selCmpt, x5, "width", signals), y5 !== void 0 && onDelta$1(model, selCmpt, y5, "height", signals), signals;
  }
};
function onDelta$1(model, selCmpt, proj, size, signals) {
  let name2 = selCmpt.name, anchor2 = name2 + ANCHOR$1, delta = name2 + DELTA$1, channel = proj.channel, boundScales = scaleBindings.defined(selCmpt), signal = signals.find((s) => s.name === proj.signals[boundScales ? "data" : "visual"]), sizeSg = model.getSizeSignalRef(size).signal, scaleCmpt = model.getScaleComponent(channel), scaleType2 = scaleCmpt?.get("type"), reversed = scaleCmpt?.get("reverse"), sign3 = boundScales ? channel === X3 ? reversed ? "" : "-" : reversed ? "-" : "" : "", extent2 = `${anchor2}.extent_${channel}`, offset4 = `${sign3}${delta}.${channel} / ${boundScales ? `${sizeSg}` : `span(${extent2})`}`, panFn = !boundScales || !scaleCmpt ? "panLinear" : scaleType2 === "log" ? "panLog" : scaleType2 === "symlog" ? "panSymlog" : scaleType2 === "pow" ? "panPow" : "panLinear", arg = boundScales ? scaleType2 === "pow" ? `, ${scaleCmpt.get("exponent") ?? 1}` : scaleType2 === "symlog" ? `, ${scaleCmpt.get("constant") ?? 1}` : "" : "", update3 = `${panFn}(${extent2}, ${offset4}${arg})`;
  signal.on.push({
    events: { signal: delta },
    update: boundScales ? update3 : `clampRange(${update3}, 0, ${sizeSg})`
  });
}
var ANCHOR = "_zoom_anchor", DELTA = "_zoom_delta", zoom2 = {
  defined: (selCmpt) => selCmpt.type === "interval" && selCmpt.zoom,
  signals: (model, selCmpt, signals) => {
    let name2 = selCmpt.name, boundScales = scaleBindings.defined(selCmpt), delta = name2 + DELTA, { x: x5, y: y5 } = selCmpt.project.hasChannel, sx = stringValue(model.scaleName(X3)), sy = stringValue(model.scaleName(Y3)), events3 = eventSelector(selCmpt.zoom, "scope");
    return boundScales || (events3 = events3.map((e) => (e.markname = name2 + BRUSH, e))), signals.push({
      name: name2 + ANCHOR,
      on: [
        {
          events: events3,
          update: boundScales ? `{${[sx ? `x: invert(${sx}, x(unit))` : "", sy ? `y: invert(${sy}, y(unit))` : ""].filter((expr2) => expr2).join(", ")}}` : "{x: x(unit), y: y(unit)}"
        }
      ]
    }, {
      name: delta,
      on: [
        {
          events: events3,
          force: !0,
          update: "pow(1.001, event.deltaY * pow(16, event.deltaMode))"
        }
      ]
    }), x5 !== void 0 && onDelta(model, selCmpt, x5, "width", signals), y5 !== void 0 && onDelta(model, selCmpt, y5, "height", signals), signals;
  }
};
function onDelta(model, selCmpt, proj, size, signals) {
  let name2 = selCmpt.name, channel = proj.channel, boundScales = scaleBindings.defined(selCmpt), signal = signals.find((s) => s.name === proj.signals[boundScales ? "data" : "visual"]), sizeSg = model.getSizeSignalRef(size).signal, scaleCmpt = model.getScaleComponent(channel), scaleType2 = scaleCmpt?.get("type"), base = boundScales ? domain3(model, channel) : signal.name, delta = name2 + DELTA, anchor2 = `${name2}${ANCHOR}.${channel}`, zoomFn = !boundScales || !scaleCmpt ? "zoomLinear" : scaleType2 === "log" ? "zoomLog" : scaleType2 === "symlog" ? "zoomSymlog" : scaleType2 === "pow" ? "zoomPow" : "zoomLinear", arg = boundScales ? scaleType2 === "pow" ? `, ${scaleCmpt.get("exponent") ?? 1}` : scaleType2 === "symlog" ? `, ${scaleCmpt.get("constant") ?? 1}` : "" : "", update3 = `${zoomFn}(${base}, ${anchor2}, ${delta}${arg})`;
  signal.on.push({
    events: { signal: delta },
    update: boundScales ? update3 : `clampRange(${update3}, 0, ${sizeSg})`
  });
}
var STORE = "_store", TUPLE = "_tuple", MODIFY = "_modify", VL_SELECTION_RESOLVE = "vlSelectionResolve", selectionCompilers = [
  point$1,
  interval2,
  project2,
  toggle,
  // Bindings may disable direct manipulation.
  inputBindings,
  scaleBindings,
  legendBindings,
  clear,
  translate3,
  zoom2,
  nearest
];
function getFacetModel(model) {
  let parent = model.parent;
  for (; parent && !isFacetModel(parent); )
    parent = parent.parent;
  return parent;
}
function unitName(model, { escape: escape2 } = { escape: !0 }) {
  let name2 = escape2 ? stringValue(model.name) : model.name, facetModel = getFacetModel(model);
  if (facetModel) {
    let { facet } = facetModel;
    for (let channel of FACET_CHANNELS)
      facet[channel] && (name2 += ` + '__facet_${channel}_' + (facet[${stringValue(facetModel.vgField(channel))}])`);
  }
  return name2;
}
function requiresSelectionId(model) {
  return vals(model.component.selection ?? {}).reduce((identifier, selCmpt) => identifier || selCmpt.project.hasSelectionId, !1);
}
function disableDirectManipulation(selCmpt, selDef) {
  (isString(selDef.select) || !selDef.select.on) && delete selCmpt.events, (isString(selDef.select) || !selDef.select.clear) && delete selCmpt.clear, (isString(selDef.select) || !selDef.select.toggle) && delete selCmpt.toggle;
}
function isTimerSelection(selCmpt) {
  return selCmpt.events?.find((e) => "type" in e && e.type === "timer");
}
function getName(node2) {
  let name2 = [];
  return node2.type === "Identifier" ? [node2.name] : node2.type === "Literal" ? [node2.value] : (node2.type === "MemberExpression" && (name2.push(...getName(node2.object)), name2.push(...getName(node2.property))), name2);
}
function startsWithDatum(node2) {
  return node2.object.type === "MemberExpression" ? startsWithDatum(node2.object) : node2.object.name === "datum";
}
function getDependentFields(expression4) {
  let ast = parser3(expression4), dependents = /* @__PURE__ */ new Set();
  return ast.visit((node2) => {
    node2.type === "MemberExpression" && startsWithDatum(node2) && dependents.add(getName(node2).slice(1).join("."));
  }), dependents;
}
var FilterNode = class _FilterNode extends DataFlowNode {
  model;
  filter;
  expr;
  _dependentFields;
  clone() {
    return new _FilterNode(null, this.model, duplicate(this.filter));
  }
  constructor(parent, model, filter3) {
    super(parent), this.model = model, this.filter = filter3, this.expr = expression2(this.model, this.filter, this), this._dependentFields = getDependentFields(this.expr);
  }
  dependentFields() {
    return this._dependentFields;
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  assemble() {
    return {
      type: "filter",
      expr: this.expr
    };
  }
  hash() {
    return `Filter ${this.expr}`;
  }
};
function parseUnitSelection(model, selDefs) {
  let selCmpts = {}, selectionConfig = model.config.selection;
  if (!selDefs || !selDefs.length)
    return selCmpts;
  let nTimerSelections = 0;
  for (let def2 of selDefs) {
    let name2 = varName(def2.name), selDef = def2.select, type3 = isString(selDef) ? selDef : selDef.type, defaults2 = isObject2(selDef) ? duplicate(selDef) : { type: type3 }, cfg = selectionConfig[type3];
    for (let key2 in cfg)
      key2 === "fields" || key2 === "encodings" || (key2 === "mark" && (defaults2.mark = { ...cfg.mark, ...defaults2.mark }), (defaults2[key2] === void 0 || defaults2[key2] === !0) && (defaults2[key2] = duplicate(cfg[key2] ?? defaults2[key2])));
    let selCmpt = selCmpts[name2] = {
      ...defaults2,
      name: name2,
      type: type3,
      init: def2.value,
      bind: def2.bind,
      events: isString(defaults2.on) ? eventSelector(defaults2.on, "scope") : array_default(duplicate(defaults2.on))
    };
    if (isTimerSelection(selCmpt) && (nTimerSelections++, nTimerSelections > 1)) {
      delete selCmpts[name2];
      continue;
    }
    let def_ = duplicate(def2);
    for (let c of selectionCompilers)
      c.defined(selCmpt) && c.parse && c.parse(model, selCmpt, def_);
  }
  return nTimerSelections > 1 && warn2(MULTIPLE_TIMER_ANIMATION_SELECTION), selCmpts;
}
function parseSelectionPredicate(model, pred, dfnode, datum2 = "datum") {
  let name2 = isString(pred) ? pred : pred.param, vname = varName(name2), store = stringValue(vname + STORE), selCmpt;
  try {
    selCmpt = model.getSelectionComponent(vname, name2);
  } catch {
    return `!!${vname}`;
  }
  if (selCmpt.project.timeUnit) {
    let child = dfnode ?? model.component.data.raw, tunode = selCmpt.project.timeUnit.clone();
    child.parent ? tunode.insertAsParentOf(child) : child.parent = tunode;
  }
  let fn = selCmpt.project.hasSelectionId ? "vlSelectionIdTest(" : "vlSelectionTest(", resolve9 = selCmpt.resolve === "global" ? ")" : `, ${stringValue(selCmpt.resolve)})`, test2 = `${fn}${store}, ${datum2}${resolve9}`, length3 = `length(data(${store}))`;
  return pred.empty === !1 ? `${length3} && ${test2}` : `!${length3} || ${test2}`;
}
function parseSelectionExtent(model, name2, extent2) {
  let vname = varName(name2), encoding = extent2.encoding, field3 = extent2.field, selCmpt;
  try {
    selCmpt = model.getSelectionComponent(vname, name2);
  } catch {
    return vname;
  }
  if (!encoding && !field3)
    field3 = selCmpt.project.items[0].field, selCmpt.project.items.length > 1 && warn2(selectionAsScaleDomainWithoutField(field3));
  else if (encoding && !field3) {
    let encodings = selCmpt.project.items.filter((p) => p.channel === encoding);
    !encodings.length || encodings.length > 1 ? (field3 = selCmpt.project.items[0].field, warn2(selectionAsScaleDomainWrongEncodings(encodings, encoding, extent2, field3))) : field3 = encodings[0].field;
  }
  return `${selCmpt.name}[${stringValue(replacePathInField(field3))}]`;
}
function materializeSelections(model, main2) {
  for (let [selection, selCmpt] of entries$1(model.component.selection ?? {})) {
    let lookupName = model.getName(`lookup_${selection}`);
    model.component.data.outputNodes[lookupName] = selCmpt.materialized = new OutputNode(new FilterNode(main2, model, { param: selection }), lookupName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts);
  }
}
function expression2(model, filterOp, node2) {
  return logicalExpr(filterOp, (predicate) => isString(predicate) ? predicate : isSelectionPredicate(predicate) ? parseSelectionPredicate(model, predicate, node2) : fieldFilterExpression(predicate));
}
function assembleTitle(title2, config2) {
  if (title2)
    return isArray(title2) && !isText(title2) ? title2.map((fieldDef) => defaultTitle(fieldDef, config2)).join(", ") : title2;
}
function setAxisEncode(axis, part, vgProp, vgRef) {
  axis.encode ??= {}, axis.encode[part] ??= {}, axis.encode[part].update ??= {}, axis.encode[part].update[vgProp] = vgRef;
}
function assembleAxis(axisCmpt, kind, config2, opt = { header: !1 }) {
  let { disable, orient: orient2, scale: scale7, labelExpr, title: title2, zindex: zindex2, ...axis } = axisCmpt.combine();
  if (!disable) {
    for (let p in axis) {
      let prop = p, propType = AXIS_PROPERTY_TYPE[prop], propValue = axis[prop];
      if (propType && propType !== kind && propType !== "both")
        delete axis[prop];
      else if (isConditionalAxisValue(propValue)) {
        let { condition, ...valueOrSignalRef } = propValue, conditions = array_default(condition), propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];
        if (propIndex) {
          let { vgProp, part } = propIndex, vgRef = [
            ...conditions.map((c) => {
              let { test: test2, ...valueOrSignalCRef } = c;
              return {
                test: expression2(null, test2),
                ...valueOrSignalCRef
              };
            }),
            valueOrSignalRef
          ];
          setAxisEncode(axis, part, vgProp, vgRef), delete axis[prop];
        } else if (propIndex === null) {
          let signalRef = {
            signal: conditions.map((c) => {
              let { test: test2, ...valueOrSignalCRef } = c;
              return `${expression2(null, test2)} ? ${exprFromValueRefOrSignalRef(valueOrSignalCRef)} : `;
            }).join("") + exprFromValueRefOrSignalRef(valueOrSignalRef)
          };
          axis[prop] = signalRef;
        }
      } else if (isSignalRef(propValue)) {
        let propIndex = CONDITIONAL_AXIS_PROP_INDEX[prop];
        if (propIndex) {
          let { vgProp, part } = propIndex;
          setAxisEncode(axis, part, vgProp, propValue), delete axis[prop];
        }
      }
      contains2(["labelAlign", "labelBaseline"], prop) && axis[prop] === null && delete axis[prop];
    }
    if (kind === "grid") {
      if (!axis.grid)
        return;
      if (axis.encode) {
        let { grid } = axis.encode;
        axis.encode = {
          ...grid ? { grid } : {}
        }, isEmpty(axis.encode) && delete axis.encode;
      }
      return {
        scale: scale7,
        orient: orient2,
        ...axis,
        domain: !1,
        labels: !1,
        aria: !1,
        // always hide grid axis
        // Always set min/maxExtent to 0 to ensure that `config.axis*.minExtent` and `config.axis*.maxExtent`
        // would not affect gridAxis
        maxExtent: 0,
        minExtent: 0,
        ticks: !1,
        zindex: getFirstDefined(zindex2, 0)
        // put grid behind marks by default
      };
    } else {
      if (!opt.header && axisCmpt.mainExtracted)
        return;
      if (labelExpr !== void 0) {
        let expr2 = labelExpr;
        axis.encode?.labels?.update && isSignalRef(axis.encode.labels.update.text) && (expr2 = replaceAll(labelExpr, "datum.label", axis.encode.labels.update.text.signal)), setAxisEncode(axis, "labels", "text", { signal: expr2 });
      }
      if (axis.labelAlign === null && delete axis.labelAlign, axis.encode) {
        for (let part of AXIS_PARTS)
          axisCmpt.hasAxisPart(part) || delete axis.encode[part];
        isEmpty(axis.encode) && delete axis.encode;
      }
      let titleString = assembleTitle(title2, config2);
      return {
        scale: scale7,
        orient: orient2,
        grid: !1,
        ...titleString ? { title: titleString } : {},
        ...axis,
        ...config2.aria === !1 ? { aria: !1 } : {},
        zindex: getFirstDefined(zindex2, 0)
        // put axis line above marks by default
      };
    }
  }
}
function assembleAxisSignals(model) {
  let { axes } = model.component, signals = [];
  for (let channel of POSITION_SCALE_CHANNELS)
    if (axes[channel]) {
      for (let axis of axes[channel])
        if (!axis.get("disable") && !axis.get("gridScale")) {
          let sizeType = channel === "x" ? "height" : "width", update3 = model.getSizeSignalRef(sizeType).signal;
          sizeType !== update3 && signals.push({
            name: sizeType,
            update: update3
          });
        }
    }
  return signals;
}
function assembleAxes(axisComponents, config2) {
  let { x: x5 = [], y: y5 = [] } = axisComponents;
  return [
    ...x5.map((a) => assembleAxis(a, "grid", config2)),
    ...y5.map((a) => assembleAxis(a, "grid", config2)),
    ...x5.map((a) => assembleAxis(a, "main", config2)),
    ...y5.map((a) => assembleAxis(a, "main", config2))
  ].filter((a) => a);
}
function getAxisConfigFromConfigTypes(configTypes, config2, channel, orient2) {
  return Object.assign.apply(null, [
    {},
    ...configTypes.map((configType) => {
      if (configType === "axisOrient") {
        let orient1 = channel === "x" ? "bottom" : "left", orientConfig1 = config2[channel === "x" ? "axisBottom" : "axisLeft"] || {}, orientConfig2 = config2[channel === "x" ? "axisTop" : "axisRight"] || {}, props = /* @__PURE__ */ new Set([...keys3(orientConfig1), ...keys3(orientConfig2)]), conditionalOrientAxisConfig = {};
        for (let prop of props.values())
          conditionalOrientAxisConfig[prop] = {
            // orient is surely signal in this case
            signal: `${orient2.signal} === "${orient1}" ? ${signalOrStringValue(orientConfig1[prop])} : ${signalOrStringValue(orientConfig2[prop])}`
          };
        return conditionalOrientAxisConfig;
      }
      return config2[configType];
    })
  ]);
}
function getAxisConfigs(channel, scaleType2, orient2, config2) {
  let typeBasedConfigTypes = scaleType2 === "band" ? ["axisDiscrete", "axisBand"] : scaleType2 === "point" ? ["axisDiscrete", "axisPoint"] : isQuantitative(scaleType2) ? ["axisQuantitative"] : scaleType2 === "time" || scaleType2 === "utc" ? ["axisTemporal"] : [], axisChannel = channel === "x" ? "axisX" : "axisY", axisOrient = isSignalRef(orient2) ? "axisOrient" : `axis${titleCase(orient2)}`, vlOnlyConfigTypes = [
    // technically Vega does have axisBand, but if we make another separation here,
    // it will further introduce complexity in the code
    ...typeBasedConfigTypes,
    ...typeBasedConfigTypes.map((c) => axisChannel + c.substr(4))
  ], vgConfigTypes = ["axis", axisOrient, axisChannel];
  return {
    vlOnlyAxisConfig: getAxisConfigFromConfigTypes(vlOnlyConfigTypes, config2, channel, orient2),
    vgAxisConfig: getAxisConfigFromConfigTypes(vgConfigTypes, config2, channel, orient2),
    axisConfigStyle: getAxisConfigStyle([...vgConfigTypes, ...vlOnlyConfigTypes], config2)
  };
}
function getAxisConfigStyle(axisConfigTypes, config2) {
  let toMerge = [{}];
  for (let configType of axisConfigTypes) {
    let style2 = config2[configType]?.style;
    if (style2) {
      style2 = array_default(style2);
      for (let s of style2)
        toMerge.push(config2.style[s]);
    }
  }
  return Object.assign.apply(null, toMerge);
}
function getAxisConfig(property2, styleConfigIndex, style2, axisConfigs = {}) {
  let styleConfig = getStyleConfig(property2, style2, styleConfigIndex);
  if (styleConfig !== void 0)
    return {
      configFrom: "style",
      configValue: styleConfig
    };
  for (let configFrom of ["vlOnlyAxisConfig", "vgAxisConfig", "axisConfigStyle"])
    if (axisConfigs[configFrom]?.[property2] !== void 0)
      return { configFrom, configValue: axisConfigs[configFrom][property2] };
  return {};
}
var axisRules = {
  scale: ({ model, channel }) => model.scaleName(channel),
  format: ({ format: format5 }) => format5,
  // we already calculate this in parse
  formatType: ({ formatType }) => formatType,
  // we already calculate this in parse
  grid: ({ fieldOrDatumDef, axis, scaleType: scaleType2 }) => axis.grid ?? defaultGrid(scaleType2, fieldOrDatumDef),
  gridScale: ({ model, channel }) => gridScale(model, channel),
  labelAlign: ({ axis, labelAngle, orient: orient2, channel }) => axis.labelAlign || defaultLabelAlign(labelAngle, orient2, channel),
  labelAngle: ({ labelAngle }) => labelAngle,
  // we already calculate this in parse
  labelBaseline: ({ axis, labelAngle, orient: orient2, channel }) => axis.labelBaseline || defaultLabelBaseline(labelAngle, orient2, channel),
  labelFlush: ({ axis, fieldOrDatumDef, channel }) => axis.labelFlush ?? defaultLabelFlush(fieldOrDatumDef.type, channel),
  labelOverlap: ({ axis, fieldOrDatumDef, scaleType: scaleType2 }) => axis.labelOverlap ?? defaultLabelOverlap$1(fieldOrDatumDef.type, scaleType2, isFieldDef(fieldOrDatumDef) && !!fieldOrDatumDef.timeUnit, isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.sort : void 0),
  // we already calculate orient in parse
  orient: ({ orient: orient2 }) => orient2,
  // Need to cast until Vega supports signal
  tickCount: ({ channel, model, axis, fieldOrDatumDef, scaleType: scaleType2 }) => {
    let sizeType = channel === "x" ? "width" : channel === "y" ? "height" : void 0, size = sizeType ? model.getSizeSignalRef(sizeType) : void 0;
    return axis.tickCount ?? defaultTickCount({ fieldOrDatumDef, scaleType: scaleType2, size, values: axis.values });
  },
  tickMinStep: ({ axis, format: format5, fieldOrDatumDef }) => axis.tickMinStep ?? defaultTickMinStep({ format: format5, fieldOrDatumDef }),
  title: ({ axis, model, channel }) => {
    if (axis.title !== void 0)
      return axis.title;
    let fieldDefTitle = getFieldDefTitle(model, channel);
    if (fieldDefTitle !== void 0)
      return fieldDefTitle;
    let fieldDef = model.typedFieldDef(channel), channel2 = channel === "x" ? "x2" : "y2", fieldDef2 = model.fieldDef(channel2);
    return mergeTitleFieldDefs(fieldDef ? [toFieldDefBase(fieldDef)] : [], isFieldDef(fieldDef2) ? [toFieldDefBase(fieldDef2)] : []);
  },
  values: ({ axis, fieldOrDatumDef }) => values$1(axis, fieldOrDatumDef),
  zindex: ({ axis, fieldOrDatumDef, mark }) => axis.zindex ?? defaultZindex(mark, fieldOrDatumDef)
};
function defaultGrid(scaleType2, fieldDef) {
  return !hasDiscreteDomain(scaleType2) && isFieldDef(fieldDef) && !isBinning(fieldDef?.bin) && !isBinned(fieldDef?.bin);
}
function gridScale(model, channel) {
  let gridChannel = channel === "x" ? "y" : "x";
  if (model.getScaleComponent(gridChannel))
    return model.scaleName(gridChannel);
}
function getLabelAngle(fieldOrDatumDef, axis, channel, styleConfig, axisConfigs) {
  let labelAngle = axis?.labelAngle;
  if (labelAngle !== void 0)
    return isSignalRef(labelAngle) ? labelAngle : normalizeAngle(labelAngle);
  {
    let { configValue: angle2 } = getAxisConfig("labelAngle", styleConfig, axis?.style, axisConfigs);
    return angle2 !== void 0 ? normalizeAngle(angle2) : channel === X3 && contains2([NOMINAL, ORDINAL2], fieldOrDatumDef.type) && !(isFieldDef(fieldOrDatumDef) && fieldOrDatumDef.timeUnit) ? 270 : void 0;
  }
}
function normalizeAngleExpr(angle2) {
  return `(((${angle2.signal} % 360) + 360) % 360)`;
}
function defaultLabelBaseline(angle2, orient2, channel, alwaysIncludeMiddle) {
  if (angle2 !== void 0)
    if (channel === "x") {
      if (isSignalRef(angle2)) {
        let a = normalizeAngleExpr(angle2), orientIsTop = isSignalRef(orient2) ? `(${orient2.signal} === "top")` : orient2 === "top";
        return {
          signal: `(45 < ${a} && ${a} < 135) || (225 < ${a} && ${a} < 315) ? "middle" :(${a} <= 45 || 315 <= ${a}) === ${orientIsTop} ? "bottom" : "top"`
        };
      }
      if (45 < angle2 && angle2 < 135 || 225 < angle2 && angle2 < 315)
        return "middle";
      if (isSignalRef(orient2)) {
        let op = angle2 <= 45 || 315 <= angle2 ? "===" : "!==";
        return { signal: `${orient2.signal} ${op} "top" ? "bottom" : "top"` };
      }
      return (angle2 <= 45 || 315 <= angle2) == (orient2 === "top") ? "bottom" : "top";
    } else {
      if (isSignalRef(angle2)) {
        let a = normalizeAngleExpr(angle2), orientIsLeft = isSignalRef(orient2) ? `(${orient2.signal} === "left")` : orient2 === "left";
        return {
          signal: `${a} <= 45 || 315 <= ${a} || (135 <= ${a} && ${a} <= 225) ? ${alwaysIncludeMiddle ? '"middle"' : "null"} : (45 <= ${a} && ${a} <= 135) === ${orientIsLeft} ? "top" : "bottom"`
        };
      }
      if (angle2 <= 45 || 315 <= angle2 || 135 <= angle2 && angle2 <= 225)
        return alwaysIncludeMiddle ? "middle" : null;
      if (isSignalRef(orient2)) {
        let op = 45 <= angle2 && angle2 <= 135 ? "===" : "!==";
        return { signal: `${orient2.signal} ${op} "left" ? "top" : "bottom"` };
      }
      return (45 <= angle2 && angle2 <= 135) == (orient2 === "left") ? "top" : "bottom";
    }
}
function defaultLabelAlign(angle2, orient2, channel) {
  if (angle2 === void 0)
    return;
  let isX2 = channel === "x", startAngle = isX2 ? 0 : 90, mainOrient = isX2 ? "bottom" : "left";
  if (isSignalRef(angle2)) {
    let a = normalizeAngleExpr(angle2), orientIsMain = isSignalRef(orient2) ? `(${orient2.signal} === "${mainOrient}")` : orient2 === mainOrient;
    return {
      signal: `(${startAngle ? `(${a} + 90)` : a} % 180 === 0) ? ${isX2 ? null : '"center"'} :(${startAngle} < ${a} && ${a} < ${180 + startAngle}) === ${orientIsMain} ? "left" : "right"`
    };
  }
  if ((angle2 + startAngle) % 180 === 0)
    return isX2 ? null : "center";
  if (isSignalRef(orient2)) {
    let op = startAngle < angle2 && angle2 < 180 + startAngle ? "===" : "!==";
    return {
      signal: `${`${orient2.signal} ${op} "${mainOrient}"`} ? "left" : "right"`
    };
  }
  return (startAngle < angle2 && angle2 < 180 + startAngle) == (orient2 === mainOrient) ? "left" : "right";
}
function defaultLabelFlush(type3, channel) {
  if (channel === "x" && contains2(["quantitative", "temporal"], type3))
    return !0;
}
function defaultLabelOverlap$1(type3, scaleType2, hasTimeUnit, sort3) {
  if (hasTimeUnit && !isObject2(sort3) || type3 !== "nominal" && type3 !== "ordinal")
    return scaleType2 === "log" || scaleType2 === "symlog" ? "greedy" : !0;
}
function defaultOrient(channel) {
  return channel === "x" ? "bottom" : "left";
}
function defaultTickCount({ fieldOrDatumDef, scaleType: scaleType2, size, values: vals2 }) {
  if (!vals2 && !hasDiscreteDomain(scaleType2) && scaleType2 !== "log") {
    if (isFieldDef(fieldOrDatumDef)) {
      if (isBinning(fieldOrDatumDef.bin))
        return { signal: `ceil(${size.signal}/10)` };
      if (fieldOrDatumDef.timeUnit && contains2(["month", "hours", "day", "quarter"], normalizeTimeUnit(fieldOrDatumDef.timeUnit)?.unit))
        return;
    }
    return { signal: `ceil(${size.signal}/40)` };
  }
}
function defaultTickMinStep({ format: format5, fieldOrDatumDef }) {
  if (format5 === "d")
    return 1;
  if (isFieldDef(fieldOrDatumDef)) {
    let { timeUnit } = fieldOrDatumDef;
    if (timeUnit) {
      let signal = durationExpr(timeUnit);
      if (signal)
        return { signal };
    }
  }
}
function getFieldDefTitle(model, channel) {
  let channel2 = channel === "x" ? "x2" : "y2", fieldDef = model.fieldDef(channel), fieldDef2 = model.fieldDef(channel2), title1 = fieldDef ? fieldDef.title : void 0, title2 = fieldDef2 ? fieldDef2.title : void 0;
  if (title1 && title2)
    return mergeTitle(title1, title2);
  if (title1)
    return title1;
  if (title2)
    return title2;
  if (title1 !== void 0)
    return title1;
  if (title2 !== void 0)
    return title2;
}
function values$1(axis, fieldOrDatumDef) {
  let vals2 = axis.values;
  if (isArray(vals2))
    return valueArray(fieldOrDatumDef, vals2);
  if (isSignalRef(vals2))
    return vals2;
}
function defaultZindex(mark, fieldDef) {
  return mark === "rect" && isDiscrete2(fieldDef) ? 1 : 0;
}
var CalculateNode = class _CalculateNode extends DataFlowNode {
  transform;
  _dependentFields;
  clone() {
    return new _CalculateNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this._dependentFields = getDependentFields(this.transform.calculate);
  }
  static parseAllForSortIndex(parent, model) {
    return model.forEachFieldDef((fieldDef, channel) => {
      if (isScaleFieldDef(fieldDef) && isSortArray(fieldDef.sort)) {
        let { field: field3, timeUnit } = fieldDef, sort3 = fieldDef.sort, calculate = sort3.map((sortValue, i) => `${fieldFilterExpression({ field: field3, timeUnit, equal: sortValue })} ? ${i} : `).join("") + sort3.length;
        parent = new _CalculateNode(parent, {
          calculate,
          as: sortArrayIndexField(fieldDef, channel, { forAs: !0 })
        });
      }
    }), parent;
  }
  producedFields() {
    return /* @__PURE__ */ new Set([this.transform.as]);
  }
  dependentFields() {
    return this._dependentFields;
  }
  assemble() {
    return {
      type: "formula",
      expr: this.transform.calculate,
      as: this.transform.as
    };
  }
  hash() {
    return `Calculate ${hash5(this.transform)}`;
  }
};
function sortArrayIndexField(fieldDef, channel, opt) {
  return vgField(fieldDef, { prefix: channel, suffix: "sort_index", ...opt });
}
function getHeaderChannel(channel, orient2) {
  return contains2(["top", "bottom"], orient2) ? "column" : contains2(["left", "right"], orient2) || channel === "row" ? "row" : "column";
}
function getHeaderProperty(prop, header, config2, channel) {
  let headerSpecificConfig = channel === "row" ? config2.headerRow : channel === "column" ? config2.headerColumn : config2.headerFacet;
  return getFirstDefined((header || {})[prop], headerSpecificConfig[prop], config2.header[prop]);
}
function getHeaderProperties(properties, header, config2, channel) {
  let props = {};
  for (let prop of properties) {
    let value3 = getHeaderProperty(prop, header || {}, config2, channel);
    value3 !== void 0 && (props[prop] = value3);
  }
  return props;
}
var HEADER_CHANNELS = ["row", "column"], HEADER_TYPES = ["header", "footer"];
function assembleTitleGroup(model, channel) {
  let title2 = model.component.layoutHeaders[channel].title, config2 = model.config ? model.config : void 0, facetFieldDef = model.component.layoutHeaders[channel].facetFieldDef ? model.component.layoutHeaders[channel].facetFieldDef : void 0, { titleAnchor, titleAngle: ta, titleOrient } = getHeaderProperties(["titleAnchor", "titleAngle", "titleOrient"], facetFieldDef.header, config2, channel), headerChannel = getHeaderChannel(channel, titleOrient), titleAngle = normalizeAngle(ta);
  return {
    name: `${channel}-title`,
    type: "group",
    role: `${headerChannel}-title`,
    title: {
      text: title2,
      ...channel === "row" ? { orient: "left" } : {},
      style: "guide-title",
      ...defaultHeaderGuideBaseline(titleAngle, headerChannel),
      ...defaultHeaderGuideAlign(headerChannel, titleAngle, titleAnchor),
      ...assembleHeaderProperties(config2, facetFieldDef, channel, HEADER_TITLE_PROPERTIES, HEADER_TITLE_PROPERTIES_MAP)
    }
  };
}
function defaultHeaderGuideAlign(headerChannel, angle2, anchor2 = "middle") {
  switch (anchor2) {
    case "start":
      return { align: "left" };
    case "end":
      return { align: "right" };
  }
  let align2 = defaultLabelAlign(angle2, headerChannel === "row" ? "left" : "top", headerChannel === "row" ? "y" : "x");
  return align2 ? { align: align2 } : {};
}
function defaultHeaderGuideBaseline(angle2, channel) {
  let baseline3 = defaultLabelBaseline(angle2, channel === "row" ? "left" : "top", channel === "row" ? "y" : "x", !0);
  return baseline3 ? { baseline: baseline3 } : {};
}
function assembleHeaderGroups(model, channel) {
  let layoutHeader = model.component.layoutHeaders[channel], groups = [];
  for (let headerType of HEADER_TYPES)
    if (layoutHeader[headerType])
      for (let headerComponent of layoutHeader[headerType]) {
        let group2 = assembleHeaderGroup(model, channel, headerType, layoutHeader, headerComponent);
        group2 != null && groups.push(group2);
      }
  return groups;
}
function getSort$1(facetFieldDef, channel) {
  let { sort: sort3 } = facetFieldDef;
  return isSortField(sort3) ? {
    field: vgField(sort3, { expr: "datum" }),
    order: sort3.order ?? "ascending"
  } : isArray(sort3) ? {
    field: sortArrayIndexField(facetFieldDef, channel, { expr: "datum" }),
    order: "ascending"
  } : {
    field: vgField(facetFieldDef, { expr: "datum" }),
    order: sort3 ?? "ascending"
  };
}
function assembleLabelTitle(facetFieldDef, channel, config2) {
  let { format: format5, formatType, labelAngle, labelAnchor, labelOrient, labelExpr } = getHeaderProperties(["format", "formatType", "labelAngle", "labelAnchor", "labelOrient", "labelExpr"], facetFieldDef.header, config2, channel), titleTextExpr = formatSignalRef({
    fieldOrDatumDef: facetFieldDef,
    format: format5,
    formatType,
    expr: "parent",
    config: config2
  }).signal, headerChannel = getHeaderChannel(channel, labelOrient);
  return {
    text: {
      signal: labelExpr ? replaceAll(replaceAll(labelExpr, "datum.label", titleTextExpr), "datum.value", vgField(facetFieldDef, { expr: "parent" })) : titleTextExpr
    },
    ...channel === "row" ? { orient: "left" } : {},
    style: "guide-label",
    frame: "group",
    ...defaultHeaderGuideBaseline(labelAngle, headerChannel),
    ...defaultHeaderGuideAlign(headerChannel, labelAngle, labelAnchor),
    ...assembleHeaderProperties(config2, facetFieldDef, channel, HEADER_LABEL_PROPERTIES, HEADER_LABEL_PROPERTIES_MAP)
  };
}
function assembleHeaderGroup(model, channel, headerType, layoutHeader, headerComponent) {
  if (headerComponent) {
    let title2 = null, { facetFieldDef } = layoutHeader, config2 = model.config ? model.config : void 0;
    if (facetFieldDef && headerComponent.labels) {
      let { labelOrient } = getHeaderProperties(["labelOrient"], facetFieldDef.header, config2, channel);
      (channel === "row" && !contains2(["top", "bottom"], labelOrient) || channel === "column" && !contains2(["left", "right"], labelOrient)) && (title2 = assembleLabelTitle(facetFieldDef, channel, config2));
    }
    let isFacetWithoutRowCol = isFacetModel(model) && !isFacetMapping(model.facet), axes = headerComponent.axes, hasAxes = axes?.length > 0;
    if (title2 || hasAxes) {
      let sizeChannel = channel === "row" ? "height" : "width";
      return {
        name: model.getName(`${channel}_${headerType}`),
        type: "group",
        role: `${channel}-${headerType}`,
        ...layoutHeader.facetFieldDef ? {
          from: { data: model.getName(`${channel}_domain`) },
          sort: getSort$1(facetFieldDef, channel)
        } : {},
        ...hasAxes && isFacetWithoutRowCol ? {
          from: { data: model.getName(`facet_domain_${channel}`) }
        } : {},
        ...title2 ? { title: title2 } : {},
        ...headerComponent.sizeSignal ? {
          encode: {
            update: {
              [sizeChannel]: headerComponent.sizeSignal
            }
          }
        } : {},
        ...hasAxes ? { axes } : {}
      };
    }
  }
  return null;
}
var LAYOUT_TITLE_BAND = {
  column: {
    start: 0,
    end: 1
  },
  row: {
    start: 1,
    end: 0
  }
};
function getLayoutTitleBand(titleAnchor, headerChannel) {
  return LAYOUT_TITLE_BAND[headerChannel][titleAnchor];
}
function assembleLayoutTitleBand(headerComponentIndex, config2) {
  let titleBand = {};
  for (let channel of FACET_CHANNELS) {
    let headerComponent = headerComponentIndex[channel];
    if (headerComponent?.facetFieldDef) {
      let { titleAnchor, titleOrient } = getHeaderProperties(["titleAnchor", "titleOrient"], headerComponent.facetFieldDef.header, config2, channel), headerChannel = getHeaderChannel(channel, titleOrient), band2 = getLayoutTitleBand(titleAnchor, headerChannel);
      band2 !== void 0 && (titleBand[headerChannel] = band2);
    }
  }
  return isEmpty(titleBand) ? void 0 : titleBand;
}
function assembleHeaderProperties(config2, facetFieldDef, channel, properties, propertiesMap) {
  let props = {};
  for (let prop of properties) {
    if (!propertiesMap[prop])
      continue;
    let value3 = getHeaderProperty(prop, facetFieldDef?.header, config2, channel);
    value3 !== void 0 && (props[propertiesMap[prop]] = value3);
  }
  return props;
}
function assembleLayoutSignals(model) {
  return [
    ...sizeSignals(model, "width"),
    ...sizeSignals(model, "height"),
    ...sizeSignals(model, "childWidth"),
    ...sizeSignals(model, "childHeight")
  ];
}
function sizeSignals(model, sizeType) {
  let channel = sizeType === "width" ? "x" : "y", size = model.component.layoutSize.get(sizeType);
  if (size == null || size === "merged")
    return [];
  let name2 = model.getSizeSignalRef(sizeType).signal;
  if (size === "step") {
    let scaleComponent = model.getScaleComponent(channel);
    if (scaleComponent) {
      let type3 = scaleComponent.get("type"), range7 = scaleComponent.get("range");
      if (hasDiscreteDomain(type3) && isVgRangeStep(range7)) {
        let scaleName = model.scaleName(channel);
        return isFacetModel(model.parent) && model.parent.component.resolve.scale[channel] === "independent" ? [stepSignal(scaleName, range7)] : [
          stepSignal(scaleName, range7),
          {
            name: name2,
            update: sizeExpr(scaleName, scaleComponent, `domain('${scaleName}').length`)
          }
        ];
      }
    }
    throw new Error("layout size is step although width/height is not step.");
  } else if (size == "container") {
    let isWidth = name2.endsWith("width"), expr2 = isWidth ? "containerSize()[0]" : "containerSize()[1]", defaultValue = getViewConfigContinuousSize(model.config.view, isWidth ? "width" : "height"), safeExpr = `isFinite(${expr2}) ? ${expr2} : ${defaultValue}`;
    return [{ name: name2, init: safeExpr, on: [{ update: safeExpr, events: "window:resize" }] }];
  } else
    return [
      {
        name: name2,
        value: size
      }
    ];
}
function stepSignal(scaleName, range7) {
  let name2 = `${scaleName}_step`;
  return isSignalRef(range7.step) ? { name: name2, update: range7.step.signal } : { name: name2, value: range7.step };
}
function sizeExpr(scaleName, scaleComponent, cardinality) {
  let type3 = scaleComponent.get("type"), padding3 = scaleComponent.get("padding"), paddingOuter2 = getFirstDefined(scaleComponent.get("paddingOuter"), padding3), paddingInner2 = scaleComponent.get("paddingInner");
  return paddingInner2 = type3 === "band" ? (
    // only band has real paddingInner
    paddingInner2 !== void 0 ? paddingInner2 : padding3
  ) : (
    // For point, as calculated in https://github.com/vega/vega-scale/blob/master/src/band.js#L128,
    // it's equivalent to have paddingInner = 1 since there is only n-1 steps between n points.
    1
  ), `bandspace(${cardinality}, ${signalOrStringValue(paddingInner2)}, ${signalOrStringValue(paddingOuter2)}) * ${scaleName}_step`;
}
function getSizeTypeFromLayoutSizeType(layoutSizeType) {
  return layoutSizeType === "childWidth" ? "width" : layoutSizeType === "childHeight" ? "height" : layoutSizeType;
}
function guideEncodeEntry(encoding, model) {
  return keys3(encoding).reduce((encode4, channel) => ({
    ...encode4,
    ...wrapCondition({
      model,
      channelDef: encoding[channel],
      vgChannel: channel,
      mainRefFn: (def2) => signalOrValueRef(def2.value),
      invalidValueRef: void 0
      // guide encoding won't show invalid values for the scale
    })
  }), {});
}
function defaultScaleResolve(channel, model) {
  if (isFacetModel(model))
    return channel === "theta" ? "independent" : "shared";
  if (isLayerModel(model))
    return "shared";
  if (isConcatModel(model))
    return isXorY(channel) || channel === "theta" || channel === "radius" ? "independent" : "shared";
  throw new Error("invalid model type for resolve");
}
function parseGuideResolve(resolve9, channel) {
  let channelScaleResolve = resolve9.scale[channel], guide = isXorY(channel) ? "axis" : "legend";
  return channelScaleResolve === "independent" ? (resolve9[guide][channel] === "shared" && warn2(independentScaleMeansIndependentGuide(channel)), "independent") : resolve9[guide][channel] || "shared";
}
var LEGEND_COMPONENT_PROPERTY_INDEX = {
  ...COMMON_LEGEND_PROPERTY_INDEX,
  disable: 1,
  labelExpr: 1,
  selections: 1,
  // channel scales
  opacity: 1,
  shape: 1,
  stroke: 1,
  fill: 1,
  size: 1,
  strokeWidth: 1,
  strokeDash: 1,
  // encode
  encode: 1
}, LEGEND_COMPONENT_PROPERTIES = keys3(LEGEND_COMPONENT_PROPERTY_INDEX), LegendComponent = class extends Split {
}, legendEncodeRules = {
  symbols: symbols3,
  gradient: gradient3,
  labels: labels$1,
  entries
};
// End of bundle text, part 13 of 15
export { AXIS_PARTS, AncestorParse, COMMON_AXIS_PROPERTIES_INDEX, CURR, CalculateNode, DataFlowNode, DataSourceType,
  FilterNode, HEADER_CHANNELS, HEADER_TYPES, LEGEND_COMPONENT_PROPERTIES, LEGEND_SCALE_CHANNELS, LegendComponent,
  OFFSETTED_RECT_END_SUFFIX, OFFSETTED_RECT_START_SUFFIX, OutputNode, SELECTION_ID, STORE, Split, TimeUnitNode,
  assembleAxes, assembleAxis, assembleAxisSignals, assembleFacetSignals, assembleHeaderGroups, assembleLabelTitle,
  assembleLayerSelectionMarks, assembleLayoutSignals, assembleLayoutTitleBand, assembleParameterSignals,
  assembleSelectionScaleDomain, assembleTitleGroup, assembleTopLevelSignals, assembleUnitSelectionData,
  assembleUnitSelectionMarks, assembleUnitSelectionSignals, axisRules, baseEncodeEntry, binRequiresRange,
  channelHasField, channelHasFieldOrDatum, channelHasNestedOffsetScale, color4, defaultFilled, defaultOrient,
  defaultScaleResolve, defaultTieBreaker, defined, extractCompositionLayout, extractTopLevelProperties, forEach,
  getAxisConfig, getAxisConfigs, getDataSourcesForHandlingInvalidValues, getFieldDef, getFieldDefTitle,
  getFieldOrDatumDef, getFitType, getHeaderChannel, getHeaderProperty, getLabelAngle,
  getScaleDataSourceForHandlingInvalidValues, getSizeTypeFromLayoutSizeType, getStepFor, getViewConfigContinuousSize,
  getViewConfigDiscreteSize, getViewConfigDiscreteStep, guideEncodeEntry, initConfig, initEncoding, initFieldDef,
  initMarkdef, isAggregate, isAnyConcatSpec, isAxisProperty, isBin, isCalculate, isConditionalAxisValue, isDensity,
  isExtent, isFieldOrDatumDefForTimeFormat, isFilter, isFitType, isFlatten, isFold, isFrameMixins, isGenerator,
  isGraticuleGenerator, isHConcatSpec, isImpute, isImputeSequence, isInlineData, isJoinAggregate, isLayerSpec,
  isLoess, isLookup, isLookupData, isLookupSelection, isNamedData, isPivot, isQuantile2, isRegression, isSample,
  isSelectionParameter, isSequenceGenerator, isSphereGenerator, isStack, isStep, isTimeUnit, isTimerSelection,
  isUnitSpec, isUrlData, isVConcatSpec, isWindow, legendEncodeRules, makeExplicit, makeImplicit,
  materializeSelections, mergeValuesWithExplicit, nonPosition, normalize4, normalizeBin, normalizeTransform,
  parseGuideResolve, parseInteractiveLegend, parseSelectionExtent, parseUnitSelection, pathGroupingFields,
  pointOrRangePosition, pointPosition, rectPosition, reduce, requiresSelectionId, sizeExpr, sortArrayIndexField,
  stack, stripAndRedirectConfig, text$1, tieBreakByComparing, title, valueArray, valueExpr, valueIfDefined };
