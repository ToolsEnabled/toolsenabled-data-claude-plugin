// ToolsEnabled Data server, part 14 of 15: Vega-Lite, which compiles chart specs (lines 63167-68460 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-13-vega-lite.mjs";
import { DisallowedObjectProperties, array_default, ascending, hasOwnProperty, isArray, isNumber, isObject2, isString,
  mergeConfig, stringValue } from "./tedata-server-08-vega.mjs";
import { ANGLE, AREA, BAR, COLOR, COLUMN, CONCAT_CANNOT_SHARE_AXIS, DEFAULT_SORT_OP,
  FACETED_INDEPENDENT_DIFFERENT_SOURCES, FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES,
  FACETED_INDEPENDENT_SAME_SOURCE, FACET_CHANNELS, FILL, FILLOPACITY, FILL_STROKE_CONFIG, GEOJSON,
  GEOPOSITION_CHANNELS, GEOSHAPE, LATITUDE, LATITUDE2, LINE, LONGITUDE, LONGITUDE2, MORE_THAN_ONE_SORT,
  MULTIDOMAIN_SORT_OP_INDEX, MULTI_VIEW_ANIMATION_UNSUPPORTED, NEEDS_SAME_SELECTION, NONPOSITION_SCALE_CHANNELS,
  NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES, NO_FIELDS_NEEDS_AS, OPACITY, POLAR_POSITION_SCALE_CHANNELS,
  POLAR_POSITION_SCALE_CHANNEL_INDEX, POSITION_SCALE_CHANNELS, RADIUS, ROW, SCALE_CHANNELS, SHAPE, SHARED_DOMAIN_OPS,
  SIZE2, STROKE, STROKEDASH, STROKEOPACITY, STROKEWIDTH, ScaleType, THETA, TIME, TRAIL, VG_CORNERRADIUS_CHANNELS, X3,
  XOFFSET, Y3, YOFFSET, accessPathDepth, accessPathWithDatum, applyMarkConfig, binFormatExpression, binToString,
  cannotLookupVariableParameter, channelDefType, channelScalePropertyIncompatability, channelSupportScaleType,
  contains2, debug2, deepEqual, deleteNestedProperty, differentParse, discreteChannelCannotEncode,
  domainRequiredForThresholdScale, domainSortDropped, droppingFit, duplicate, durationExpr, emptyFieldDef, error63,
  every, exprFromSignalRefOrValue, extractTitleConfig, fieldIntersection, forEachLeaf, formatCustomType,
  getBandPosition, getFirstDefined, getMainRangeChannel, getMarkConfig, getMarkPropOrConfig, getOffsetScaleChannel,
  getPositionChannelFromLatLong, getPositionScaleChannel, getScaleInvalidDataMode, getSecondaryRangeChannel,
  getSizeChannel, getStyles, guideFormat, guideFormatType, hasBandEnd, hasConditionalValueDef, hasContinuousDomain,
  hasDiscreteDomain, hasIntersection, hasProperty, hash5, incompatibleChannel, invalidFieldType, invalidSpec,
  invalidTransformIgnored, isAggregateOp, isArgmaxDef, isArgminDef, isBinParams, isBinned, isBinning, isBoolean3,
  isChannel, isColorChannel, isContinuousFieldOrDatumDef, isContinuousToContinuous, isContinuousToDiscrete,
  isCountingAggregateOp, isCustomFormatType, isDataRefDomain, isDataRefUnionedDomain, isDateTime, isDatumDef,
  isDiscrete$1, isDomainUnionWith, isEmpty, isExtendedScheme, isFacetMapping, isFacetSpec, isFieldDef,
  isFieldEqualPredicate, isFieldGTEPredicate, isFieldGTPredicate, isFieldLTEPredicate, isFieldLTPredicate,
  isFieldOneOfPredicate, isFieldOrDatumDef, isFieldPredicate, isFieldRange, isFieldRangePredicate,
  isFieldRefUnionDomain, isGeoPositionChannel, isMarkDef, isMinMaxOp, isNullOrFalse, isOrderOnlyDef,
  isParameterDomain, isParameterExtent, isPathMark, isPositionFieldOrDatumDef, isPrimitive, isRectBasedMark,
  isRelativeBandSize, isScaleChannel, isScaleFieldDef, isSignalRef, isSortArray, isSortByEncoding, isSortField,
  isText, isTime, isTypedFieldDef, isValueDef, isVgRangeStep, isXorY, isXorYOffset, keys3, legendValuesUnioned,
  mergeConflictingDomainProperty, mergeDeep, mergeTitleComponent, never2, noSameUnitLookup, normalizeAngle,
  normalizeTimeUnit, omit2, pick4, pkg, rangeType, removePathFromField, replaceAll, replaceExprRef,
  replacePathInField, reset2, resetTitleFormatter, scaleCompatible, scalePropertyNotWorkWithScaleType,
  scaleTypeNotWorkWithChannel, scaleTypeNotWorkWithFieldDef, scaleTypePrecedence, scaleTypeSupportDataType,
  scaleTypeSupportProperty, selectionNotFound, set7, setEqual, setTitleFormatter, signalOrStringValue,
  signalOrValueRef, signalOrValueRefWithCondition, signalRefOrValue, some, sortParams, stepDropped, supportLegend,
  unaggregateDomainHasNoEffectForRawField, unaggregateDomainWithNonSharedDomainOp, unaggregatedDomainWithLogScale,
  unique, unknownField, unrecognizedParse, vals, varName, vgField, warn2 } from "./tedata-server-12-vega-lite.mjs";
import { AXIS_PARTS, AncestorParse, COMMON_AXIS_PROPERTIES_INDEX, CURR, CalculateNode, DataFlowNode, DataSourceType,
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
  stack, stripAndRedirectConfig, text$1, tieBreakByComparing, title, valueArray, valueExpr, valueIfDefined } from "./tedata-server-13-vega-lite.mjs";
// Bundle text, part 14 of 15
function symbols3(symbolsSpec, { fieldOrDatumDef, model, channel, legendCmpt, legendType: legendType2 }) {
  if (legendType2 !== "symbol")
    return;
  let { markDef, encoding, config: config2, mark } = model, filled = markDef.filled && mark !== "trail", out = {
    ...applyMarkConfig({}, model, FILL_STROKE_CONFIG),
    ...color4(model, { filled })
  }, symbolOpacity = legendCmpt.get("symbolOpacity") ?? config2.legend.symbolOpacity, symbolFillColor = legendCmpt.get("symbolFillColor") ?? config2.legend.symbolFillColor, symbolStrokeColor = legendCmpt.get("symbolStrokeColor") ?? config2.legend.symbolStrokeColor, opacity2 = symbolOpacity === void 0 ? getMaxValue(encoding.opacity) ?? markDef.opacity : void 0;
  if (out.fill) {
    if (channel === "fill" || filled && channel === COLOR)
      delete out.fill;
    else if (hasProperty(out.fill, "field"))
      symbolFillColor ? delete out.fill : (out.fill = signalOrValueRef(config2.legend.symbolBaseFillColor ?? "black"), out.fillOpacity = signalOrValueRef(opacity2 ?? 1));
    else if (isArray(out.fill)) {
      let fill2 = getFirstConditionValue(encoding.fill ?? encoding.color) ?? markDef.fill ?? (filled && markDef.color);
      fill2 && (out.fill = signalOrValueRef(fill2));
    }
  }
  if (out.stroke) {
    if (channel === "stroke" || !filled && channel === COLOR)
      delete out.stroke;
    else if (hasProperty(out.stroke, "field") || symbolStrokeColor)
      delete out.stroke;
    else if (isArray(out.stroke)) {
      let stroke2 = getFirstDefined(getFirstConditionValue(encoding.stroke || encoding.color), markDef.stroke, filled ? markDef.color : void 0);
      stroke2 && (out.stroke = { value: stroke2 });
    }
  }
  if (channel !== OPACITY) {
    let condition = isFieldDef(fieldOrDatumDef) && selectedCondition(model, legendCmpt, fieldOrDatumDef);
    condition ? out.opacity = [
      { test: condition, ...signalOrValueRef(opacity2 ?? 1) },
      signalOrValueRef(config2.legend.unselectedOpacity)
    ] : opacity2 && (out.opacity = signalOrValueRef(opacity2));
  }
  return out = { ...out, ...symbolsSpec }, isEmpty(out) ? void 0 : out;
}
function gradient3(gradientSpec, { model, legendType: legendType2, legendCmpt }) {
  if (legendType2 !== "gradient")
    return;
  let { config: config2, markDef, encoding } = model, out = {}, opacity2 = (legendCmpt.get("gradientOpacity") ?? config2.legend.gradientOpacity) === void 0 ? getMaxValue(encoding.opacity) || markDef.opacity : void 0;
  return opacity2 && (out.opacity = signalOrValueRef(opacity2)), out = { ...out, ...gradientSpec }, isEmpty(out) ? void 0 : out;
}
function labels$1(specifiedlabelsSpec, { fieldOrDatumDef, model, channel, legendCmpt }) {
  let legend = model.legend(channel) || {}, config2 = model.config, condition = isFieldDef(fieldOrDatumDef) ? selectedCondition(model, legendCmpt, fieldOrDatumDef) : void 0, opacity2 = condition ? [{ test: condition, value: 1 }, { value: config2.legend.unselectedOpacity }] : void 0, { format: format5, formatType } = legend, text4;
  isCustomFormatType(formatType) ? text4 = formatCustomType({
    fieldOrDatumDef,
    field: "datum.value",
    format: format5,
    formatType,
    config: config2
  }) : format5 === void 0 && formatType === void 0 && config2.customFormatTypes && (fieldOrDatumDef.type === "quantitative" && config2.numberFormatType ? text4 = formatCustomType({
    fieldOrDatumDef,
    field: "datum.value",
    format: config2.numberFormat,
    formatType: config2.numberFormatType,
    config: config2
  }) : fieldOrDatumDef.type === "temporal" && config2.timeFormatType && isFieldDef(fieldOrDatumDef) && fieldOrDatumDef.timeUnit === void 0 && (text4 = formatCustomType({
    fieldOrDatumDef,
    field: "datum.value",
    format: config2.timeFormat,
    formatType: config2.timeFormatType,
    config: config2
  })));
  let labelsSpec = {
    ...opacity2 ? { opacity: opacity2 } : {},
    ...text4 ? { text: text4 } : {},
    ...specifiedlabelsSpec
  };
  return isEmpty(labelsSpec) ? void 0 : labelsSpec;
}
function entries(entriesSpec, { legendCmpt }) {
  return legendCmpt.get("selections")?.length ? { ...entriesSpec, fill: { value: "transparent" } } : entriesSpec;
}
function getMaxValue(channelDef) {
  return getConditionValue(channelDef, (v2, conditionalDef) => Math.max(v2, conditionalDef.value));
}
function getFirstConditionValue(channelDef) {
  return getConditionValue(channelDef, (v2, conditionalDef) => getFirstDefined(v2, conditionalDef.value));
}
function getConditionValue(channelDef, reducer) {
  if (hasConditionalValueDef(channelDef))
    return array_default(channelDef.condition).reduce(reducer, channelDef.value);
  if (isValueDef(channelDef))
    return channelDef.value;
}
function selectedCondition(model, legendCmpt, fieldDef) {
  let selections = legendCmpt.get("selections");
  if (!selections?.length)
    return;
  let field3 = stringValue(fieldDef.field);
  return selections.map((name2) => `(!length(data(${stringValue(varName(name2) + STORE)})) || (${name2}[${field3}] && indexof(${name2}[${field3}], datum.value) >= 0))`).join(" || ");
}
var legendRules = {
  direction: ({ direction }) => direction,
  format: ({ fieldOrDatumDef, legend, config: config2 }) => {
    let { format: format5, formatType } = legend;
    return guideFormat(fieldOrDatumDef, fieldOrDatumDef.type, format5, formatType, config2, !1);
  },
  formatType: ({ legend, fieldOrDatumDef, scaleType: scaleType2 }) => {
    let { formatType } = legend;
    return guideFormatType(formatType, fieldOrDatumDef, scaleType2);
  },
  gradientLength: (params2) => {
    let { legend, legendConfig } = params2;
    return legend.gradientLength ?? legendConfig.gradientLength ?? defaultGradientLength(params2);
  },
  labelOverlap: ({ legend, legendConfig, scaleType: scaleType2 }) => legend.labelOverlap ?? legendConfig.labelOverlap ?? defaultLabelOverlap(scaleType2),
  symbolType: ({ legend, markDef, channel, encoding }) => legend.symbolType ?? defaultSymbolType(markDef.type, channel, encoding.shape, markDef.shape),
  title: ({ fieldOrDatumDef, config: config2 }) => title(fieldOrDatumDef, config2, { allowDisabling: !0 }),
  type: ({ legendType: legendType2, scaleType: scaleType2, channel }) => {
    if (isColorChannel(channel) && isContinuousToContinuous(scaleType2)) {
      if (legendType2 === "gradient")
        return;
    } else if (legendType2 === "symbol")
      return;
    return legendType2;
  },
  // depended by other property, let's define upfront
  values: ({ fieldOrDatumDef, legend }) => values2(legend, fieldOrDatumDef)
};
function values2(legend, fieldOrDatumDef) {
  let vals2 = legend.values;
  if (isArray(vals2))
    return valueArray(fieldOrDatumDef, vals2);
  if (isSignalRef(vals2))
    return vals2;
}
function defaultSymbolType(mark, channel, shapeChannelDef, markShape) {
  if (channel !== "shape") {
    let shape2 = getFirstConditionValue(shapeChannelDef) ?? markShape;
    if (shape2)
      return shape2;
  }
  switch (mark) {
    case "bar":
    case "rect":
    case "image":
    case "square":
      return "square";
    case "line":
    case "trail":
    case "rule":
      return "stroke";
    case "arc":
    case "point":
    case "circle":
    case "tick":
    case "geoshape":
    case "area":
    case "text":
      return "circle";
  }
}
function getLegendType(params2) {
  let { legend } = params2;
  return getFirstDefined(legend.type, defaultType$1(params2));
}
function defaultType$1({ channel, timeUnit, scaleType: scaleType2 }) {
  if (isColorChannel(channel)) {
    if (contains2(["quarter", "month", "day"], timeUnit))
      return "symbol";
    if (isContinuousToContinuous(scaleType2))
      return "gradient";
  }
  return "symbol";
}
function getDirection({ legendConfig, legendType: legendType2, orient: orient2, legend }) {
  return legend.direction ?? legendConfig[legendType2 ? "gradientDirection" : "symbolDirection"] ?? defaultDirection(orient2, legendType2);
}
function defaultDirection(orient2, legendType2) {
  switch (orient2) {
    case "top":
    case "bottom":
      return "horizontal";
    case "left":
    case "right":
    case "none":
    case void 0:
      return;
    // vertical is Vega's default
    default:
      return legendType2 === "gradient" ? "horizontal" : void 0;
  }
}
function defaultGradientLength({ legendConfig, model, direction, orient: orient2, scaleType: scaleType2 }) {
  let { gradientHorizontalMaxLength, gradientHorizontalMinLength, gradientVerticalMaxLength, gradientVerticalMinLength } = legendConfig;
  if (isContinuousToContinuous(scaleType2))
    return direction === "horizontal" ? orient2 === "top" || orient2 === "bottom" ? gradientLengthSignal(model, "width", gradientHorizontalMinLength, gradientHorizontalMaxLength) : gradientHorizontalMinLength : gradientLengthSignal(model, "height", gradientVerticalMinLength, gradientVerticalMaxLength);
}
function gradientLengthSignal(model, sizeType, min4, max4) {
  return { signal: `clamp(${model.getSizeSignalRef(sizeType).signal}, ${min4}, ${max4})` };
}
function defaultLabelOverlap(scaleType2) {
  if (contains2(["quantile", "threshold", "log", "symlog"], scaleType2))
    return "greedy";
}
function parseLegend2(model) {
  let legendComponent = isUnitModel(model) ? parseUnitLegend(model) : parseNonUnitLegend(model);
  return model.component.legends = legendComponent, legendComponent;
}
function parseUnitLegend(model) {
  let { encoding } = model, legendComponent = {};
  for (let channel of [COLOR, ...LEGEND_SCALE_CHANNELS]) {
    let def2 = getFieldOrDatumDef(encoding[channel]);
    !def2 || !model.getScaleComponent(channel) || channel === SHAPE && isFieldDef(def2) && def2.type === GEOJSON || (legendComponent[channel] = parseLegendForChannel(model, channel));
  }
  return legendComponent;
}
function getLegendDefWithScale(model, channel) {
  let scale7 = model.scaleName(channel);
  if (model.mark === "trail") {
    if (channel === "color")
      return { stroke: scale7 };
    if (channel === "size")
      return { strokeWidth: scale7 };
  }
  return channel === "color" ? model.markDef.filled ? { fill: scale7 } : { stroke: scale7 } : { [channel]: scale7 };
}
function isExplicit$1(value3, property2, legend, fieldDef) {
  switch (property2) {
    case "disable":
      return legend !== void 0;
    // if axis is specified or null/false, then its enable/disable state is explicit
    case "values":
      return !!legend?.values;
    case "title":
      if (property2 === "title" && value3 === fieldDef?.title)
        return !0;
  }
  return value3 === (legend || {})[property2];
}
function parseLegendForChannel(model, channel) {
  let legend = model.legend(channel), { markDef, encoding, config: config2 } = model, legendConfig = config2.legend, legendCmpt = new LegendComponent({}, getLegendDefWithScale(model, channel));
  parseInteractiveLegend(model, channel, legendCmpt);
  let disable = legend !== void 0 ? !legend : legendConfig.disable;
  if (legendCmpt.set("disable", disable, legend !== void 0), disable)
    return legendCmpt;
  legend = legend || {};
  let scaleType2 = model.getScaleComponent(channel).get("type"), fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]), timeUnit = isFieldDef(fieldOrDatumDef) ? normalizeTimeUnit(fieldOrDatumDef.timeUnit)?.unit : void 0, orient2 = legend.orient || config2.legend.orient || "right", legendType2 = getLegendType({ legend, channel, timeUnit, scaleType: scaleType2 }), direction = getDirection({ legend, legendType: legendType2, orient: orient2, legendConfig }), ruleParams = {
    legend,
    channel,
    model,
    markDef,
    encoding,
    fieldOrDatumDef,
    legendConfig,
    config: config2,
    scaleType: scaleType2,
    orient: orient2,
    legendType: legendType2,
    direction
  };
  for (let property2 of LEGEND_COMPONENT_PROPERTIES) {
    if (legendType2 === "gradient" && property2.startsWith("symbol") || legendType2 === "symbol" && property2.startsWith("gradient"))
      continue;
    let value3 = property2 in legendRules ? legendRules[property2](ruleParams) : legend[property2];
    if (value3 !== void 0) {
      let explicit = isExplicit$1(value3, property2, legend, model.fieldDef(channel));
      (explicit || config2.legend[property2] === void 0) && legendCmpt.set(property2, value3, explicit);
    }
  }
  let legendEncoding = legend?.encoding ?? {}, selections = legendCmpt.get("selections"), legendEncode = {}, legendEncodeParams = { fieldOrDatumDef, model, channel, legendCmpt, legendType: legendType2 };
  for (let part of ["labels", "legend", "title", "symbols", "gradient", "entries"]) {
    let legendEncodingPart = guideEncodeEntry(legendEncoding[part] ?? {}, model), value3 = part in legendEncodeRules ? legendEncodeRules[part](legendEncodingPart, legendEncodeParams) : legendEncodingPart;
    value3 !== void 0 && !isEmpty(value3) && (legendEncode[part] = {
      ...selections?.length && isFieldDef(fieldOrDatumDef) ? { name: `${varName(fieldOrDatumDef.field)}_legend_${part}` } : {},
      ...selections?.length ? { interactive: !0 } : {},
      update: selections?.length ? { ...value3, cursor: { value: "pointer" } } : value3
    });
  }
  return isEmpty(legendEncode) || legendCmpt.set("encode", legendEncode, !!legend?.encoding), legendCmpt;
}
function parseNonUnitLegend(model) {
  let { legends, resolve: resolve9 } = model.component;
  for (let child of model.children) {
    parseLegend2(child);
    for (let channel of keys3(child.component.legends))
      resolve9.legend[channel] = parseGuideResolve(model.component.resolve, channel), resolve9.legend[channel] === "shared" && (legends[channel] = mergeLegendComponent(legends[channel], child.component.legends[channel]), legends[channel] || (resolve9.legend[channel] = "independent", delete legends[channel]));
  }
  for (let channel of keys3(legends))
    for (let child of model.children)
      child.component.legends[channel] && resolve9.legend[channel] === "shared" && delete child.component.legends[channel];
  return legends;
}
function mergeLegendComponent(mergedLegend, childLegend) {
  if (!mergedLegend)
    return childLegend.clone();
  let mergedOrient = mergedLegend.getWithExplicit("orient"), childOrient = childLegend.getWithExplicit("orient");
  if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value)
    return;
  let typeMerged = !1;
  for (let prop of LEGEND_COMPONENT_PROPERTIES) {
    let mergedValueWithExplicit = mergeValuesWithExplicit(
      mergedLegend.getWithExplicit(prop),
      childLegend.getWithExplicit(prop),
      prop,
      "legend",
      // Tie breaker function
      (v1, v2) => {
        switch (prop) {
          case "symbolType":
            return mergeSymbolType(v1, v2);
          case "title":
            return mergeTitleComponent(v1, v2);
          case "type":
            return typeMerged = !0, makeImplicit("symbol");
        }
        return defaultTieBreaker(v1, v2, prop, "legend");
      }
    );
    mergedLegend.setWithExplicit(prop, mergedValueWithExplicit);
  }
  return typeMerged && (mergedLegend.implicit?.encode?.gradient && deleteNestedProperty(mergedLegend.implicit, ["encode", "gradient"]), mergedLegend.explicit?.encode?.gradient && deleteNestedProperty(mergedLegend.explicit, ["encode", "gradient"])), mergedLegend;
}
function mergeSymbolType(st1, st2) {
  return st2.value === "circle" ? st2 : st1;
}
function rangeFormula(model, fieldDef, channel, config2) {
  if (binRequiresRange(fieldDef, channel)) {
    let guide = isUnitModel(model) ? model.axis(channel) ?? model.legend(channel) ?? {} : {}, startField = vgField(fieldDef, { expr: "datum" }), endField = vgField(fieldDef, { expr: "datum", binSuffix: "end" });
    return {
      formulaAs: vgField(fieldDef, { binSuffix: "range", forAs: !0 }),
      formula: binFormatExpression(startField, endField, guide.format, guide.formatType, config2)
    };
  }
  return {};
}
function binKey(bin3, field3) {
  return `${binToString(bin3)}_${field3}`;
}
function getSignalsFromModel(model, key2) {
  return {
    signal: model.getName(`${key2}_bins`),
    extentSignal: model.getName(`${key2}_extent`)
  };
}
function getBinSignalName(model, field3, bin3) {
  let normalizedBin = normalizeBin(bin3, void 0) ?? {}, key2 = binKey(normalizedBin, field3);
  return model.getName(`${key2}_bins`);
}
function isBinTransform(t) {
  return "as" in t;
}
function createBinComponent(t, bin3, model) {
  let as, span;
  isBinTransform(t) ? as = isString(t.as) ? [t.as, `${t.as}_end`] : [t.as[0], t.as[1]] : as = [vgField(t, { forAs: !0 }), vgField(t, { binSuffix: "end", forAs: !0 })];
  let normalizedBin = { ...normalizeBin(bin3, void 0) }, key2 = binKey(normalizedBin, t.field), { signal, extentSignal } = getSignalsFromModel(model, key2);
  if (isParameterExtent(normalizedBin.extent)) {
    let ext = normalizedBin.extent;
    span = parseSelectionExtent(model, ext.param, ext), delete normalizedBin.extent;
  }
  let binComponent = {
    bin: normalizedBin,
    field: t.field,
    as: [as],
    ...signal ? { signal } : {},
    ...extentSignal ? { extentSignal } : {},
    ...span ? { span } : {}
  };
  return { key: key2, binComponent };
}
var BinNode = class _BinNode extends DataFlowNode {
  bins;
  clone() {
    return new _BinNode(null, duplicate(this.bins));
  }
  constructor(parent, bins2) {
    super(parent), this.bins = bins2;
  }
  static makeFromEncoding(parent, model) {
    let bins2 = model.reduceFieldDef((binComponentIndex, fieldDef, channel) => {
      if (isTypedFieldDef(fieldDef) && isBinning(fieldDef.bin)) {
        let { key: key2, binComponent } = createBinComponent(fieldDef, fieldDef.bin, model);
        binComponentIndex[key2] = {
          ...binComponent,
          ...binComponentIndex[key2],
          ...rangeFormula(model, fieldDef, channel, model.config)
        };
      }
      return binComponentIndex;
    }, {});
    return isEmpty(bins2) ? null : new _BinNode(parent, bins2);
  }
  /**
   * Creates a bin node from BinTransform.
   * The optional parameter should provide
   */
  static makeFromTransform(parent, t, model) {
    let { key: key2, binComponent } = createBinComponent(t, t.bin, model);
    return new _BinNode(parent, {
      [key2]: binComponent
    });
  }
  /**
   * Merge bin nodes. This method either integrates the bin config from the other node
   * or if this node already has a bin config, renames the corresponding signal in the model.
   */
  merge(other, renameSignal) {
    for (let key2 of keys3(other.bins))
      key2 in this.bins ? (renameSignal(other.bins[key2].signal, this.bins[key2].signal), this.bins[key2].as = unique([...this.bins[key2].as, ...other.bins[key2].as], hash5)) : this.bins[key2] = other.bins[key2];
    for (let child of other.children)
      other.removeChild(child), child.parent = this;
    other.remove();
  }
  producedFields() {
    return new Set(vals(this.bins).map((c) => c.as).flat(2));
  }
  dependentFields() {
    return new Set(vals(this.bins).map((c) => c.field));
  }
  hash() {
    return `Bin ${hash5(this.bins)}`;
  }
  assemble() {
    return vals(this.bins).flatMap((bin3) => {
      let transform5 = [], [binAs, ...remainingAs] = bin3.as, { extent: extent2, ...params2 } = bin3.bin, binTrans = {
        type: "bin",
        field: replacePathInField(bin3.field),
        as: binAs,
        signal: bin3.signal,
        ...isParameterExtent(extent2) ? { extent: null } : { extent: extent2 },
        ...bin3.span ? { span: { signal: `span(${bin3.span})` } } : {},
        ...params2
      };
      !extent2 && bin3.extentSignal && (transform5.push({
        type: "extent",
        field: replacePathInField(bin3.field),
        signal: bin3.extentSignal
      }), binTrans.extent = { signal: bin3.extentSignal }), transform5.push(binTrans);
      for (let as of remainingAs)
        for (let i = 0; i < 2; i++)
          transform5.push({
            type: "formula",
            expr: vgField({ field: binAs[i] }, { expr: "datum" }),
            as: as[i]
          });
      return bin3.formula && transform5.push({
        type: "formula",
        expr: bin3.formula,
        as: bin3.formulaAs
      }), transform5;
    });
  }
};
function addDimension(dims, channel, fieldDef, model) {
  let channelDef2 = isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : void 0;
  if (isTypedFieldDef(fieldDef) && isUnitModel(model) && hasBandEnd(fieldDef, channelDef2, model.markDef, model.config)) {
    dims.add(vgField(fieldDef, {})), dims.add(vgField(fieldDef, { suffix: "end" }));
    let { mark, markDef, config: config2 } = model, bandPosition = getBandPosition({ fieldDef, markDef, config: config2 });
    isRectBasedMark(mark) && bandPosition !== 0.5 && isXorY(channel) && (dims.add(vgField(fieldDef, { suffix: OFFSETTED_RECT_START_SUFFIX })), dims.add(vgField(fieldDef, { suffix: OFFSETTED_RECT_END_SUFFIX }))), fieldDef.bin && binRequiresRange(fieldDef, channel) && dims.add(vgField(fieldDef, { binSuffix: "range" }));
  } else if (isGeoPositionChannel(channel)) {
    let posChannel = getPositionChannelFromLatLong(channel);
    dims.add(model.getName(posChannel));
  } else
    dims.add(vgField(fieldDef));
  return isScaleFieldDef(fieldDef) && isFieldRange(fieldDef.scale?.range) && dims.add(fieldDef.scale.range.field), dims;
}
function mergeMeasures(parentMeasures, childMeasures) {
  for (let field3 of keys3(childMeasures)) {
    let ops2 = childMeasures[field3];
    for (let op of keys3(ops2))
      field3 in parentMeasures ? parentMeasures[field3][op] = /* @__PURE__ */ new Set([...parentMeasures[field3][op] ?? [], ...ops2[op]]) : parentMeasures[field3] = { [op]: ops2[op] };
  }
}
var AggregateNode = class _AggregateNode extends DataFlowNode {
  dimensions;
  measures;
  clone() {
    return new _AggregateNode(null, new Set(this.dimensions), duplicate(this.measures));
  }
  /**
   * @param dimensions string set for dimensions
   * @param measures dictionary mapping field name => dict of aggregation functions and names to use
   */
  constructor(parent, dimensions, measures) {
    super(parent), this.dimensions = dimensions, this.measures = measures;
  }
  get groupBy() {
    return this.dimensions;
  }
  static makeFromEncoding(parent, model) {
    let isAggregate2 = !1;
    model.forEachFieldDef((fd) => {
      fd.aggregate && (isAggregate2 = !0);
    });
    let meas = {}, dims = /* @__PURE__ */ new Set();
    return !isAggregate2 || (model.forEachFieldDef((fieldDef, channel) => {
      let { aggregate, field: field3 } = fieldDef;
      if (aggregate)
        if (aggregate === "count")
          meas["*"] ??= {}, meas["*"].count = /* @__PURE__ */ new Set([vgField(fieldDef, { forAs: !0 })]);
        else {
          if (isArgminDef(aggregate) || isArgmaxDef(aggregate)) {
            let op = isArgminDef(aggregate) ? "argmin" : "argmax", argField = aggregate[op];
            meas[argField] ??= {}, meas[argField][op] = /* @__PURE__ */ new Set([vgField({ op, field: argField }, { forAs: !0 })]);
          } else
            meas[field3] ??= {}, meas[field3][aggregate] = /* @__PURE__ */ new Set([vgField(fieldDef, { forAs: !0 })]);
          isScaleChannel(channel) && model.scaleDomain(channel) === "unaggregated" && (meas[field3] ??= {}, meas[field3].min = /* @__PURE__ */ new Set([vgField({ field: field3, aggregate: "min" }, { forAs: !0 })]), meas[field3].max = /* @__PURE__ */ new Set([vgField({ field: field3, aggregate: "max" }, { forAs: !0 })]));
        }
      else
        addDimension(dims, channel, fieldDef, model);
    }), dims.size + keys3(meas).length === 0) ? null : new _AggregateNode(parent, dims, meas);
  }
  static makeFromTransform(parent, t) {
    let dims = /* @__PURE__ */ new Set(), meas = {};
    for (let s of t.aggregate) {
      let { op, field: field3, as } = s;
      op && (op === "count" ? (meas["*"] ??= {}, meas["*"].count = /* @__PURE__ */ new Set([as || vgField(s, { forAs: !0 })])) : (meas[field3] ??= {}, meas[field3][op] ??= /* @__PURE__ */ new Set(), meas[field3][op].add(as || vgField(s, { forAs: !0 }))));
    }
    for (let s of t.groupby ?? [])
      dims.add(s);
    return dims.size + keys3(meas).length === 0 ? null : new _AggregateNode(parent, dims, meas);
  }
  merge(other) {
    return setEqual(this.dimensions, other.dimensions) ? (mergeMeasures(this.measures, other.measures), !0) : (debug2("different dimensions, cannot merge"), !1);
  }
  addDimensions(fields) {
    fields.forEach(this.dimensions.add, this.dimensions);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([...this.dimensions, ...keys3(this.measures)]);
  }
  producedFields() {
    let out = /* @__PURE__ */ new Set();
    for (let field3 of keys3(this.measures))
      for (let op of keys3(this.measures[field3])) {
        let m = this.measures[field3][op];
        m.size === 0 ? out.add(`${op}_${field3}`) : m.forEach(out.add, out);
      }
    return out;
  }
  hash() {
    return `Aggregate ${hash5({ dimensions: this.dimensions, measures: this.measures })}`;
  }
  assemble() {
    let ops2 = [], fields = [], as = [];
    for (let field3 of keys3(this.measures))
      for (let op of keys3(this.measures[field3]))
        for (let alias of this.measures[field3][op])
          as.push(alias), ops2.push(op), fields.push(field3 === "*" ? null : replacePathInField(field3));
    return {
      type: "aggregate",
      groupby: [...this.dimensions].map(replacePathInField),
      ops: ops2,
      fields,
      as
    };
  }
}, FacetNode = class extends DataFlowNode {
  model;
  name;
  data;
  column;
  row;
  facet;
  childModel;
  /**
   * @param model The facet model.
   * @param name The name that this facet source will have.
   * @param data The source data for this facet data.
   */
  constructor(parent, model, name2, data3) {
    super(parent), this.model = model, this.name = name2, this.data = data3;
    for (let channel of FACET_CHANNELS) {
      let fieldDef = model.facet[channel];
      if (fieldDef) {
        let { bin: bin3, sort: sort3 } = fieldDef;
        this[channel] = {
          name: model.getName(`${channel}_domain`),
          fields: [vgField(fieldDef), ...isBinning(bin3) ? [vgField(fieldDef, { binSuffix: "end" })] : []],
          ...isSortField(sort3) ? { sortField: sort3 } : isArray(sort3) ? { sortIndexField: sortArrayIndexField(fieldDef, channel) } : {}
        };
      }
    }
    this.childModel = model.child;
  }
  hash() {
    let out = "Facet";
    for (let channel of FACET_CHANNELS)
      this[channel] && (out += ` ${channel.charAt(0)}:${hash5(this[channel])}`);
    return out;
  }
  get fields() {
    let f = [];
    for (let channel of FACET_CHANNELS)
      this[channel]?.fields && f.push(...this[channel].fields);
    return f;
  }
  dependentFields() {
    let depFields = new Set(this.fields);
    for (let channel of FACET_CHANNELS)
      this[channel] && (this[channel].sortField && depFields.add(this[channel].sortField.field), this[channel].sortIndexField && depFields.add(this[channel].sortIndexField));
    return depFields;
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  /**
   * The name to reference this source is its name.
   */
  getSource() {
    return this.name;
  }
  getChildIndependentFieldsWithStep() {
    let childIndependentFieldsWithStep = {};
    for (let channel of POSITION_SCALE_CHANNELS) {
      let childScaleComponent = this.childModel.component.scales[channel];
      if (childScaleComponent && !childScaleComponent.merged) {
        let type3 = childScaleComponent.get("type"), range7 = childScaleComponent.get("range");
        if (hasDiscreteDomain(type3) && isVgRangeStep(range7)) {
          let domain4 = assembleDomain(this.childModel, channel), field3 = getFieldFromDomain(domain4);
          field3 ? childIndependentFieldsWithStep[channel] = field3 : warn2(unknownField(channel));
        }
      }
    }
    return childIndependentFieldsWithStep;
  }
  assembleRowColumnHeaderData(channel, crossedDataName, childIndependentFieldsWithStep) {
    let childChannel = { row: "y", column: "x", facet: void 0 }[channel], fields = [], ops2 = [], as = [];
    childChannel && childIndependentFieldsWithStep && childIndependentFieldsWithStep[childChannel] && (crossedDataName ? (fields.push(`distinct_${childIndependentFieldsWithStep[childChannel]}`), ops2.push("max")) : (fields.push(childIndependentFieldsWithStep[childChannel]), ops2.push("distinct")), as.push(`distinct_${childIndependentFieldsWithStep[childChannel]}`));
    let { sortField, sortIndexField } = this[channel];
    if (sortField) {
      let { op = DEFAULT_SORT_OP, field: field3 } = sortField;
      fields.push(field3), ops2.push(op), as.push(vgField(sortField, { forAs: !0 }));
    } else sortIndexField && (fields.push(sortIndexField), ops2.push("max"), as.push(sortIndexField));
    return {
      name: this[channel].name,
      // Use data from the crossed one if it exist
      source: crossedDataName ?? this.data,
      transform: [
        {
          type: "aggregate",
          groupby: this[channel].fields,
          ...fields.length ? {
            fields,
            ops: ops2,
            as
          } : {}
        }
      ]
    };
  }
  assembleFacetHeaderData(childIndependentFieldsWithStep) {
    let { columns } = this.model.layout, { layoutHeaders: layoutHeaders2 } = this.model.component, data3 = [], hasSharedAxis = {};
    for (let headerChannel of HEADER_CHANNELS) {
      for (let headerType of HEADER_TYPES) {
        let headers = layoutHeaders2[headerChannel]?.[headerType] ?? [];
        for (let header of headers)
          if (header.axes?.length > 0) {
            hasSharedAxis[headerChannel] = !0;
            break;
          }
      }
      if (hasSharedAxis[headerChannel]) {
        let cardinality = `length(data("${this.facet.name}"))`, stop2 = headerChannel === "row" ? columns ? { signal: `ceil(${cardinality} / ${columns})` } : 1 : columns ? { signal: `min(${cardinality}, ${columns})` } : { signal: cardinality };
        data3.push({
          name: `${this.facet.name}_${headerChannel}`,
          transform: [
            {
              type: "sequence",
              start: 0,
              stop: stop2
            }
          ]
        });
      }
    }
    let { row, column } = hasSharedAxis;
    return (row || column) && data3.unshift(this.assembleRowColumnHeaderData("facet", null, childIndependentFieldsWithStep)), data3;
  }
  assemble() {
    let data3 = [], crossedDataName = null, childIndependentFieldsWithStep = this.getChildIndependentFieldsWithStep(), { column, row, facet } = this;
    if (column && row && (childIndependentFieldsWithStep.x || childIndependentFieldsWithStep.y)) {
      crossedDataName = `cross_${this.column.name}_${this.row.name}`;
      let fields = [].concat(childIndependentFieldsWithStep.x ?? [], childIndependentFieldsWithStep.y ?? []), ops2 = fields.map(() => "distinct");
      data3.push({
        name: crossedDataName,
        source: this.data,
        transform: [
          {
            type: "aggregate",
            groupby: this.fields,
            fields,
            ops: ops2
          }
        ]
      });
    }
    for (let channel of [COLUMN, ROW])
      this[channel] && data3.push(this.assembleRowColumnHeaderData(channel, crossedDataName, childIndependentFieldsWithStep));
    if (facet) {
      let facetData = this.assembleFacetHeaderData(childIndependentFieldsWithStep);
      facetData && data3.push(...facetData);
    }
    return data3;
  }
};
function unquote(pattern) {
  return pattern.startsWith("'") && pattern.endsWith("'") || pattern.startsWith('"') && pattern.endsWith('"') ? pattern.slice(1, -1) : pattern;
}
function parseExpression3(field3, parse9) {
  let f = accessPathWithDatum(field3);
  if (parse9 === "number")
    return `toNumber(${f})`;
  if (parse9 === "boolean")
    return `toBoolean(${f})`;
  if (parse9 === "string")
    return `toString(${f})`;
  if (parse9 === "date")
    return `toDate(${f})`;
  if (parse9 === "flatten")
    return f;
  if (parse9.startsWith("date:")) {
    let specifier = unquote(parse9.slice(5, parse9.length));
    return `timeParse(${f},'${specifier}')`;
  } else if (parse9.startsWith("utc:")) {
    let specifier = unquote(parse9.slice(4, parse9.length));
    return `utcParse(${f},'${specifier}')`;
  } else
    return warn2(unrecognizedParse(parse9)), null;
}
function getImplicitFromFilterTransform(transform5) {
  let implicit2 = {};
  return forEachLeaf(transform5.filter, (filter3) => {
    if (isFieldPredicate(filter3)) {
      let val = null;
      isFieldEqualPredicate(filter3) ? val = signalRefOrValue(filter3.equal) : isFieldLTEPredicate(filter3) ? val = signalRefOrValue(filter3.lte) : isFieldLTPredicate(filter3) ? val = signalRefOrValue(filter3.lt) : isFieldGTPredicate(filter3) ? val = signalRefOrValue(filter3.gt) : isFieldGTEPredicate(filter3) ? val = signalRefOrValue(filter3.gte) : isFieldRangePredicate(filter3) ? val = filter3.range[0] : isFieldOneOfPredicate(filter3) && (val = (filter3.oneOf ?? filter3.in)[0]), val && (isDateTime(val) ? implicit2[filter3.field] = "date" : isNumber(val) ? implicit2[filter3.field] = "number" : isString(val) && (implicit2[filter3.field] = "string")), filter3.timeUnit && (implicit2[filter3.field] = "date");
    }
  }), implicit2;
}
function getImplicitFromEncoding(model) {
  let implicit2 = {};
  function add6(fieldDef) {
    isFieldOrDatumDefForTimeFormat(fieldDef) ? implicit2[fieldDef.field] = "date" : fieldDef.type === "quantitative" && isMinMaxOp(fieldDef.aggregate) ? implicit2[fieldDef.field] = "number" : accessPathDepth(fieldDef.field) > 1 ? fieldDef.field in implicit2 || (implicit2[fieldDef.field] = "flatten") : isScaleFieldDef(fieldDef) && isSortField(fieldDef.sort) && accessPathDepth(fieldDef.sort.field) > 1 && (fieldDef.sort.field in implicit2 || (implicit2[fieldDef.sort.field] = "flatten"));
  }
  if ((isUnitModel(model) || isFacetModel(model)) && model.forEachFieldDef((fieldDef, channel) => {
    if (isTypedFieldDef(fieldDef))
      add6(fieldDef);
    else {
      let mainChannel = getMainRangeChannel(channel), mainFieldDef = model.fieldDef(mainChannel);
      add6({
        ...fieldDef,
        type: mainFieldDef.type
      });
    }
  }), isUnitModel(model)) {
    let { mark, markDef, encoding } = model;
    if (isPathMark(mark) && // No need to sort by dimension if we have a connected scatterplot (order channel is present)
    !model.encoding.order) {
      let dimensionChannel = markDef.orient === "horizontal" ? "y" : "x", dimensionChannelDef = encoding[dimensionChannel];
      isFieldDef(dimensionChannelDef) && dimensionChannelDef.type === "quantitative" && !(dimensionChannelDef.field in implicit2) && (implicit2[dimensionChannelDef.field] = "number");
    }
  }
  return implicit2;
}
function getImplicitFromSelection(model) {
  let implicit2 = {};
  if (isUnitModel(model) && model.component.selection)
    for (let name2 of keys3(model.component.selection)) {
      let selCmpt = model.component.selection[name2];
      for (let proj of selCmpt.project.items)
        !proj.channel && accessPathDepth(proj.field) > 1 && (implicit2[proj.field] = "flatten");
    }
  return implicit2;
}
var ParseNode = class _ParseNode extends DataFlowNode {
  _parse;
  clone() {
    return new _ParseNode(null, duplicate(this._parse));
  }
  constructor(parent, parse9) {
    super(parent), this._parse = parse9;
  }
  hash() {
    return `Parse ${hash5(this._parse)}`;
  }
  /**
   * Creates a parse node from a data.format.parse and updates ancestorParse.
   */
  static makeExplicit(parent, model, ancestorParse) {
    let explicit = {}, data3 = model.data;
    return !isGenerator(data3) && data3?.format?.parse && (explicit = data3.format.parse), this.makeWithAncestors(parent, explicit, {}, ancestorParse);
  }
  /**
   * Creates a parse node from "explicit" parse and "implicit" parse and updates ancestorParse.
   */
  static makeWithAncestors(parent, explicit, implicit2, ancestorParse) {
    for (let field3 of keys3(implicit2)) {
      let parsedAs = ancestorParse.getWithExplicit(field3);
      parsedAs.value !== void 0 && (parsedAs.explicit || parsedAs.value === implicit2[field3] || parsedAs.value === "derived" || implicit2[field3] === "flatten" ? delete implicit2[field3] : warn2(differentParse(field3, implicit2[field3], parsedAs.value)));
    }
    for (let field3 of keys3(explicit)) {
      let parsedAs = ancestorParse.get(field3);
      parsedAs !== void 0 && (parsedAs === explicit[field3] ? delete explicit[field3] : warn2(differentParse(field3, explicit[field3], parsedAs)));
    }
    let parse9 = new Split(explicit, implicit2);
    ancestorParse.copyAll(parse9);
    let p = {};
    for (let key2 of keys3(parse9.combine())) {
      let val = parse9.get(key2);
      val !== null && (p[key2] = val);
    }
    return keys3(p).length === 0 || ancestorParse.parseNothing ? null : new _ParseNode(parent, p);
  }
  get parse() {
    return this._parse;
  }
  merge(other) {
    this._parse = { ...this._parse, ...other.parse }, other.remove();
  }
  /**
   * Assemble an object for Vega's format.parse property.
   */
  assembleFormatParse() {
    let formatParse = {};
    for (let field3 of keys3(this._parse)) {
      let p = this._parse[field3];
      accessPathDepth(field3) === 1 && (formatParse[field3] = p);
    }
    return formatParse;
  }
  // format parse depends and produces all fields in its parse
  producedFields() {
    return new Set(keys3(this._parse));
  }
  dependentFields() {
    return new Set(keys3(this._parse));
  }
  assembleTransforms(onlyNested = !1) {
    return keys3(this._parse).filter((field3) => onlyNested ? accessPathDepth(field3) > 1 : !0).map((field3) => {
      let expr2 = parseExpression3(field3, this._parse[field3]);
      return expr2 ? {
        type: "formula",
        expr: expr2,
        as: removePathFromField(field3)
        // Vega output is always flattened
      } : null;
    }).filter((t) => t !== null);
  }
}, IdentifierNode = class _IdentifierNode extends DataFlowNode {
  clone() {
    return new _IdentifierNode(null);
  }
  constructor(parent) {
    super(parent);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set([SELECTION_ID]);
  }
  hash() {
    return "Identifier";
  }
  assemble() {
    return { type: "identifier", as: SELECTION_ID };
  }
}, GraticuleNode = class _GraticuleNode extends DataFlowNode {
  params;
  clone() {
    return new _GraticuleNode(null, this.params);
  }
  constructor(parent, params2) {
    super(parent), this.params = params2;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
  }
  hash() {
    return `Graticule ${hash5(this.params)}`;
  }
  assemble() {
    return {
      type: "graticule",
      ...this.params === !0 ? {} : this.params
    };
  }
}, SequenceNode = class _SequenceNode extends DataFlowNode {
  params;
  clone() {
    return new _SequenceNode(null, this.params);
  }
  constructor(parent, params2) {
    super(parent), this.params = params2;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set([this.params.as ?? "data"]);
  }
  hash() {
    return `Hash ${hash5(this.params)}`;
  }
  assemble() {
    return {
      type: "sequence",
      ...this.params
    };
  }
}, SourceNode = class extends DataFlowNode {
  _data;
  _name;
  _generator;
  constructor(data3) {
    super(null), data3 ??= { name: "source" };
    let format5;
    if (isGenerator(data3) || (format5 = data3.format ? { ...omit2(data3.format, ["parse"]) } : {}), isInlineData(data3))
      this._data = { values: data3.values };
    else if (isUrlData(data3)) {
      if (this._data = { url: data3.url }, !format5.type) {
        let defaultExtension = /(?:\.([^.]+))?$/.exec(data3.url)[1];
        contains2(["json", "csv", "tsv", "dsv", "topojson"], defaultExtension) || (defaultExtension = "json"), format5.type = defaultExtension;
      }
    } else isSphereGenerator(data3) ? this._data = { values: [{ type: "Sphere" }] } : (isNamedData(data3) || isGenerator(data3)) && (this._data = {});
    this._generator = isGenerator(data3), data3.name && (this._name = data3.name), format5 && !isEmpty(format5) && (this._data.format = format5);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
  }
  get data() {
    return this._data;
  }
  hasName() {
    return !!this._name;
  }
  get isGenerator() {
    return this._generator;
  }
  get dataName() {
    return this._name;
  }
  set dataName(name2) {
    this._name = name2;
  }
  set parent(parent) {
    throw new Error("Source nodes have to be roots.");
  }
  remove() {
    throw new Error("Source nodes are roots and cannot be removed.");
  }
  hash() {
    throw new Error("Cannot hash sources");
  }
  assemble() {
    return {
      name: this._name,
      ...this._data,
      transform: []
    };
  }
};
function isDataSourceNode(node2) {
  return node2 instanceof SourceNode || node2 instanceof GraticuleNode || node2 instanceof SequenceNode;
}
var Optimizer = class {
  #modified;
  constructor() {
    this.#modified = !1;
  }
  // Once true, #modified is never set to false
  setModified() {
    this.#modified = !0;
  }
  get modifiedFlag() {
    return this.#modified;
  }
}, BottomUpOptimizer = class extends Optimizer {
  /**
   * Compute a map of node depths that we can use to determine a topological sort order.
   */
  getNodeDepths(node2, depth, depths) {
    depths.set(node2, depth);
    for (let child of node2.children)
      this.getNodeDepths(child, depth + 1, depths);
    return depths;
  }
  /**
   * Run the optimizer on all nodes starting from the leaves.
   */
  optimize(node2) {
    let topologicalSort = [...this.getNodeDepths(node2, 0, /* @__PURE__ */ new Map()).entries()].sort((a, b10) => b10[1] - a[1]);
    for (let tuple2 of topologicalSort)
      this.run(tuple2[0]);
    return this.modifiedFlag;
  }
}, TopDownOptimizer = class extends Optimizer {
  /**
   * Run the optimizer depth first on all nodes starting from the roots.
   */
  optimize(node2) {
    this.run(node2);
    for (let child of node2.children)
      this.optimize(child);
    return this.modifiedFlag;
  }
}, MergeIdenticalNodes = class extends TopDownOptimizer {
  mergeNodes(parent, nodes) {
    let mergedNode = nodes.shift();
    for (let node2 of nodes)
      parent.removeChild(node2), node2.parent = mergedNode, node2.remove();
  }
  run(node2) {
    let hashes = node2.children.map((x5) => x5.hash()), buckets = {};
    for (let i = 0; i < hashes.length; i++)
      buckets[hashes[i]] === void 0 ? buckets[hashes[i]] = [node2.children[i]] : buckets[hashes[i]].push(node2.children[i]);
    for (let k of keys3(buckets))
      buckets[k].length > 1 && (this.setModified(), this.mergeNodes(node2, buckets[k]));
  }
}, RemoveUnnecessaryIdentifierNodes = class extends TopDownOptimizer {
  requiresSelectionId;
  constructor(model) {
    super(), this.requiresSelectionId = model && requiresSelectionId(model);
  }
  run(node2) {
    node2 instanceof IdentifierNode && (this.requiresSelectionId && (isDataSourceNode(node2.parent) || node2.parent instanceof AggregateNode || node2.parent instanceof ParseNode) || (this.setModified(), node2.remove()));
  }
}, RemoveDuplicateTimeUnits = class extends Optimizer {
  optimize(node2) {
    return this.run(node2, /* @__PURE__ */ new Set()), this.modifiedFlag;
  }
  run(node2, timeUnitFields) {
    let producedFields = /* @__PURE__ */ new Set();
    node2 instanceof TimeUnitNode && (producedFields = node2.producedFields(), hasIntersection(producedFields, timeUnitFields) && (this.setModified(), node2.removeFormulas(timeUnitFields), node2.producedFields.length === 0 && node2.remove()));
    for (let child of node2.children)
      this.run(child, /* @__PURE__ */ new Set([...timeUnitFields, ...producedFields]));
  }
}, RemoveUnnecessaryOutputNodes = class extends TopDownOptimizer {
  constructor() {
    super();
  }
  run(node2) {
    node2 instanceof OutputNode && !node2.isRequired() && (this.setModified(), node2.remove());
  }
}, MoveParseUp = class extends BottomUpOptimizer {
  run(node2) {
    if (!isDataSourceNode(node2) && !(node2.numChildren() > 1)) {
      for (let child of node2.children)
        if (child instanceof ParseNode)
          if (node2 instanceof ParseNode)
            this.setModified(), node2.merge(child);
          else {
            if (fieldIntersection(node2.producedFields(), child.dependentFields()))
              continue;
            this.setModified(), child.swapWithParent();
          }
    }
  }
}, MergeParse = class extends BottomUpOptimizer {
  run(node2) {
    let originalChildren = [...node2.children], parseChildren = node2.children.filter((child) => child instanceof ParseNode);
    if (node2.numChildren() > 1 && parseChildren.length >= 1) {
      let commonParse = {}, conflictingParse = /* @__PURE__ */ new Set();
      for (let parseNode of parseChildren) {
        let parse9 = parseNode.parse;
        for (let k of keys3(parse9))
          k in commonParse ? commonParse[k] !== parse9[k] && conflictingParse.add(k) : commonParse[k] = parse9[k];
      }
      for (let field3 of conflictingParse)
        delete commonParse[field3];
      if (!isEmpty(commonParse)) {
        this.setModified();
        let mergedParseNode = new ParseNode(node2, commonParse);
        for (let childNode of originalChildren) {
          if (childNode instanceof ParseNode)
            for (let key2 of keys3(commonParse))
              delete childNode.parse[key2];
          node2.removeChild(childNode), childNode.parent = mergedParseNode, childNode instanceof ParseNode && keys3(childNode.parse).length === 0 && childNode.remove();
        }
      }
    }
  }
}, RemoveUnusedSubtrees = class extends BottomUpOptimizer {
  run(node2) {
    node2 instanceof OutputNode || node2.numChildren() > 0 || node2 instanceof FacetNode || node2 instanceof SourceNode || (this.setModified(), node2.remove());
  }
}, MergeTimeUnits = class extends BottomUpOptimizer {
  run(node2) {
    let timeUnitChildren = node2.children.filter((x5) => x5 instanceof TimeUnitNode), combination = timeUnitChildren.pop();
    for (let timeUnit of timeUnitChildren)
      this.setModified(), combination.merge(timeUnit);
  }
}, MergeAggregates = class extends BottomUpOptimizer {
  run(node2) {
    let aggChildren = node2.children.filter((child) => child instanceof AggregateNode), groupedAggregates = {};
    for (let agg of aggChildren) {
      let groupBys = hash5(agg.groupBy);
      groupBys in groupedAggregates || (groupedAggregates[groupBys] = []), groupedAggregates[groupBys].push(agg);
    }
    for (let group2 of keys3(groupedAggregates)) {
      let mergeableAggs = groupedAggregates[group2];
      if (mergeableAggs.length > 1) {
        let mergedAggs = mergeableAggs.pop();
        for (let agg of mergeableAggs)
          mergedAggs.merge(agg) && (node2.removeChild(agg), agg.parent = mergedAggs, agg.remove(), this.setModified());
      }
    }
  }
}, MergeBins = class extends BottomUpOptimizer {
  model;
  constructor(model) {
    super(), this.model = model;
  }
  run(node2) {
    let moveBinsUp = !(isDataSourceNode(node2) || node2 instanceof FilterNode || node2 instanceof ParseNode || node2 instanceof IdentifierNode), promotableBins = [], remainingBins = [];
    for (let child of node2.children)
      child instanceof BinNode && (moveBinsUp && !fieldIntersection(node2.producedFields(), child.dependentFields()) ? promotableBins.push(child) : remainingBins.push(child));
    if (promotableBins.length > 0) {
      let promotedBin = promotableBins.pop();
      for (let bin3 of promotableBins)
        promotedBin.merge(bin3, this.model.renameSignal.bind(this.model));
      this.setModified(), node2 instanceof BinNode ? node2.merge(promotedBin, this.model.renameSignal.bind(this.model)) : promotedBin.swapWithParent();
    }
    if (remainingBins.length > 1) {
      let remainingBin = remainingBins.pop();
      for (let bin3 of remainingBins)
        remainingBin.merge(bin3, this.model.renameSignal.bind(this.model));
      this.setModified();
    }
  }
}, MergeOutputs = class extends BottomUpOptimizer {
  run(node2) {
    let children4 = [...node2.children];
    if (!some(children4, (child) => child instanceof OutputNode) || node2.numChildren() <= 1)
      return;
    let otherChildren = [], mainOutput;
    for (let child of children4)
      if (child instanceof OutputNode) {
        let lastOutput = child;
        for (; lastOutput.numChildren() === 1; ) {
          let [theChild] = lastOutput.children;
          if (theChild instanceof OutputNode)
            lastOutput = theChild;
          else
            break;
        }
        otherChildren.push(...lastOutput.children), mainOutput ? (node2.removeChild(child), child.parent = mainOutput.parent, mainOutput.parent.removeChild(mainOutput), mainOutput.parent = lastOutput, this.setModified()) : mainOutput = lastOutput;
      } else
        otherChildren.push(child);
    if (otherChildren.length) {
      this.setModified();
      for (let child of otherChildren)
        child.parent.removeChild(child), child.parent = mainOutput;
    }
  }
}, JoinAggregateTransformNode = class _JoinAggregateTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _JoinAggregateTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5;
  }
  addDimensions(fields) {
    this.transform.groupby = unique(this.transform.groupby.concat(fields), (d) => d);
  }
  dependentFields() {
    let out = /* @__PURE__ */ new Set();
    return this.transform.groupby && this.transform.groupby.forEach(out.add, out), this.transform.joinaggregate.map((w2) => w2.field).filter((f) => f !== void 0).forEach(out.add, out), out;
  }
  producedFields() {
    return new Set(this.transform.joinaggregate.map(this.getDefaultName));
  }
  getDefaultName(joinAggregateFieldDef) {
    return joinAggregateFieldDef.as ?? vgField(joinAggregateFieldDef);
  }
  hash() {
    return `JoinAggregateTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let fields = [], ops2 = [], as = [];
    for (let joinaggregate of this.transform.joinaggregate)
      ops2.push(joinaggregate.op), as.push(this.getDefaultName(joinaggregate)), fields.push(joinaggregate.field === void 0 ? null : joinaggregate.field);
    let groupby = this.transform.groupby;
    return {
      type: "joinaggregate",
      as,
      ops: ops2,
      fields,
      ...groupby !== void 0 ? { groupby } : {}
    };
  }
}, FilterInvalidNode = class _FilterInvalidNode extends DataFlowNode {
  filter;
  clone() {
    return new _FilterInvalidNode(null, { ...this.filter });
  }
  constructor(parent, filter3) {
    super(parent), this.filter = filter3;
  }
  static make(parent, model, dataSourcesForHandlingInvalidValues) {
    let { config: config2, markDef } = model, { marks, scales: scales2 } = dataSourcesForHandlingInvalidValues;
    if (marks === "include-invalid-values" && scales2 === "include-invalid-values")
      return null;
    let filter3 = model.reduceFieldDef((aggregator, fieldDef, channel) => {
      let scaleComponent = isScaleChannel(channel) && model.getScaleComponent(channel);
      if (scaleComponent) {
        let scaleType2 = scaleComponent.get("type"), { aggregate } = fieldDef, invalidDataMode = getScaleInvalidDataMode({
          scaleChannel: channel,
          markDef,
          config: config2,
          scaleType: scaleType2,
          isCountAggregate: isCountingAggregateOp(aggregate)
        });
        invalidDataMode !== "show" && invalidDataMode !== "always-valid" && (aggregator[fieldDef.field] = fieldDef);
      }
      return aggregator;
    }, {});
    return keys3(filter3).length ? new _FilterInvalidNode(parent, filter3) : null;
  }
  dependentFields() {
    return new Set(keys3(this.filter));
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    return `FilterInvalid ${hash5(this.filter)}`;
  }
  /**
   * Create the VgTransforms for each of the filtered fields.
   */
  assemble() {
    let filters2 = keys3(this.filter).reduce((vegaFilters, field3) => {
      let fieldDef = this.filter[field3], ref2 = vgField(fieldDef, { expr: "datum" });
      return fieldDef !== null && (fieldDef.type === "temporal" ? vegaFilters.push(`(isDate(${ref2}) || (${isValidFiniteNumberExpr(ref2)}))`) : fieldDef.type === "quantitative" && vegaFilters.push(isValidFiniteNumberExpr(ref2))), vegaFilters;
    }, []);
    return filters2.length > 0 ? {
      type: "filter",
      expr: filters2.join(" && ")
    } : null;
  }
};
function isValidFiniteNumberExpr(ref2) {
  return `isValid(${ref2}) && isFinite(+${ref2})`;
}
function getStackByFields(model) {
  return model.stack.stackBy.reduce((fields, by) => {
    let fieldDef = by.fieldDef, _field = vgField(fieldDef);
    return _field && fields.push(_field), fields;
  }, []);
}
function isValidAsArray(as) {
  return isArray(as) && as.every((s) => isString(s)) && as.length > 1;
}
var StackNode = class _StackNode extends DataFlowNode {
  _stack;
  clone() {
    return new _StackNode(null, duplicate(this._stack));
  }
  constructor(parent, stack2) {
    super(parent), this._stack = stack2;
  }
  static makeFromTransform(parent, stackTransform) {
    let { stack: stack2, groupby, as, offset: offset4 = "zero" } = stackTransform, sortFields = [], sortOrder = [];
    if (stackTransform.sort !== void 0)
      for (let sortField of stackTransform.sort)
        sortFields.push(sortField.field), sortOrder.push(getFirstDefined(sortField.order, "ascending"));
    let sort3 = {
      field: sortFields,
      order: sortOrder
    }, normalizedAs;
    return isValidAsArray(as) ? normalizedAs = as : isString(as) ? normalizedAs = [as, `${as}_end`] : normalizedAs = [`${stackTransform.stack}_start`, `${stackTransform.stack}_end`], new _StackNode(parent, {
      dimensionFieldDefs: [],
      stackField: stack2,
      groupby,
      offset: offset4,
      sort: sort3,
      facetby: [],
      as: normalizedAs
    });
  }
  static makeFromEncoding(parent, model) {
    let stackProperties = model.stack, { encoding } = model;
    if (!stackProperties)
      return null;
    let { groupbyChannels, fieldChannel, offset: offset4, impute } = stackProperties, dimensionFieldDefs = groupbyChannels.map((groupbyChannel) => {
      let cDef = encoding[groupbyChannel];
      return getFieldDef(cDef);
    }).filter((def2) => !!def2), stackby = getStackByFields(model), orderDef = model.encoding.order, sort3;
    if (isArray(orderDef) || isFieldDef(orderDef))
      sort3 = sortParams(orderDef);
    else {
      let sortOrder = isOrderOnlyDef(orderDef) ? orderDef.sort : fieldChannel === "y" ? "descending" : "ascending";
      sort3 = stackby.reduce((s, field3) => (s.field.includes(field3) || (s.field.push(field3), s.order.push(sortOrder)), s), { field: [], order: [] });
    }
    return new _StackNode(parent, {
      dimensionFieldDefs,
      stackField: model.vgField(fieldChannel),
      facetby: [],
      stackby,
      sort: sort3,
      offset: offset4,
      impute,
      as: [
        model.vgField(fieldChannel, { suffix: "start", forAs: !0 }),
        model.vgField(fieldChannel, { suffix: "end", forAs: !0 })
      ]
    });
  }
  get stack() {
    return this._stack;
  }
  addDimensions(fields) {
    this._stack.facetby.push(...fields);
  }
  dependentFields() {
    let out = /* @__PURE__ */ new Set();
    return out.add(this._stack.stackField), this.getGroupbyFields().forEach(out.add, out), this._stack.facetby.forEach(out.add, out), this._stack.sort.field.forEach(out.add, out), out;
  }
  producedFields() {
    return new Set(this._stack.as);
  }
  hash() {
    return `Stack ${hash5(this._stack)}`;
  }
  getGroupbyFields() {
    let { dimensionFieldDefs, impute, groupby } = this._stack;
    return dimensionFieldDefs.length > 0 ? dimensionFieldDefs.map((dimensionFieldDef) => dimensionFieldDef.bin ? impute ? [vgField(dimensionFieldDef, { binSuffix: "mid" })] : [
      // For binned group by field without impute, we need both bin (start) and bin_end
      vgField(dimensionFieldDef, {}),
      vgField(dimensionFieldDef, { binSuffix: "end" })
    ] : [vgField(dimensionFieldDef)]).flat() : groupby ?? [];
  }
  assemble() {
    let transform5 = [], { facetby, dimensionFieldDefs, stackField: field3, stackby, sort: sort3, offset: offset4, impute, as } = this._stack;
    if (impute)
      for (let dimensionFieldDef of dimensionFieldDefs) {
        let { bandPosition = 0.5, bin: bin3 } = dimensionFieldDef;
        if (bin3) {
          let binStart = vgField(dimensionFieldDef, { expr: "datum" }), binEnd = vgField(dimensionFieldDef, { expr: "datum", binSuffix: "end" });
          transform5.push({
            type: "formula",
            expr: `${isValidFiniteNumberExpr(binStart)} ? ${bandPosition}*${binStart}+${1 - bandPosition}*${binEnd} : ${binStart}`,
            as: vgField(dimensionFieldDef, { binSuffix: "mid", forAs: !0 })
          });
        }
        transform5.push({
          type: "impute",
          field: field3,
          groupby: [...stackby, ...facetby],
          key: vgField(dimensionFieldDef, { binSuffix: "mid" }),
          method: "value",
          value: 0
        });
      }
    return transform5.push({
      type: "stack",
      groupby: [...this.getGroupbyFields(), ...facetby],
      field: field3,
      sort: sort3,
      as,
      offset: offset4
    }), transform5;
  }
}, WindowTransformNode = class _WindowTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _WindowTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5;
  }
  addDimensions(fields) {
    this.transform.groupby = unique(this.transform.groupby.concat(fields), (d) => d);
  }
  dependentFields() {
    let out = /* @__PURE__ */ new Set();
    return (this.transform.groupby ?? []).forEach(out.add, out), (this.transform.sort ?? []).forEach((m) => out.add(m.field)), this.transform.window.map((w2) => w2.field).filter((f) => f !== void 0).forEach(out.add, out), out;
  }
  producedFields() {
    return new Set(this.transform.window.map(this.getDefaultName));
  }
  getDefaultName(windowFieldDef) {
    return windowFieldDef.as ?? vgField(windowFieldDef);
  }
  hash() {
    return `WindowTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let fields = [], ops2 = [], as = [], params2 = [];
    for (let window2 of this.transform.window)
      ops2.push(window2.op), as.push(this.getDefaultName(window2)), params2.push(window2.param === void 0 ? null : window2.param), fields.push(window2.field === void 0 ? null : window2.field);
    let frame2 = this.transform.frame, groupby = this.transform.groupby;
    if (frame2 && frame2[0] === null && frame2[1] === null && ops2.every((o) => isAggregateOp(o)))
      return {
        type: "joinaggregate",
        as,
        ops: ops2,
        fields,
        ...groupby !== void 0 ? { groupby } : {}
      };
    let sortFields = [], sortOrder = [];
    if (this.transform.sort !== void 0)
      for (let sortField of this.transform.sort)
        sortFields.push(sortField.field), sortOrder.push(sortField.order ?? "ascending");
    let sort3 = {
      field: sortFields,
      order: sortOrder
    }, ignorePeers = this.transform.ignorePeers;
    return {
      type: "window",
      params: params2,
      as,
      ops: ops2,
      fields,
      sort: sort3,
      ...ignorePeers !== void 0 ? { ignorePeers } : {},
      ...groupby !== void 0 ? { groupby } : {},
      ...frame2 !== void 0 ? { frame: frame2 } : {}
    };
  }
};
function cloneSubtree(facet) {
  function clone3(node2) {
    if (!(node2 instanceof FacetNode)) {
      let copy5 = node2.clone();
      if (copy5 instanceof OutputNode) {
        let newName = FACET_SCALE_PREFIX + copy5.getSource();
        copy5.setSource(newName), facet.model.component.data.outputNodes[newName] = copy5;
      } else (copy5 instanceof AggregateNode || copy5 instanceof StackNode || copy5 instanceof WindowTransformNode || copy5 instanceof JoinAggregateTransformNode) && copy5.addDimensions(facet.fields);
      for (let n of node2.children.flatMap(clone3))
        n.parent = copy5;
      return [copy5];
    }
    return node2.children.flatMap(clone3);
  }
  return clone3;
}
function moveFacetDown(node2) {
  if (node2 instanceof FacetNode)
    if (node2.numChildren() === 1 && !(node2.children[0] instanceof OutputNode)) {
      let child = node2.children[0];
      (child instanceof AggregateNode || child instanceof StackNode || child instanceof WindowTransformNode || child instanceof JoinAggregateTransformNode) && child.addDimensions(node2.fields), child.swapWithParent(), moveFacetDown(node2);
    } else {
      let facetMain = node2.model.component.data.main;
      moveMainDownToFacet(facetMain);
      let cloner = cloneSubtree(node2), copy5 = node2.children.map(cloner).flat();
      for (let c of copy5)
        c.parent = facetMain;
    }
  else
    node2.children.map(moveFacetDown);
}
function moveMainDownToFacet(node2) {
  if (node2 instanceof OutputNode && node2.type === DataSourceType.Main && node2.numChildren() === 1) {
    let child = node2.children[0];
    child instanceof FacetNode || (child.swapWithParent(), moveMainDownToFacet(node2));
  }
}
var FACET_SCALE_PREFIX = "scale_", MAX_OPTIMIZATION_RUNS = 5;
function checkLinks(nodes) {
  for (let node2 of nodes) {
    for (let child of node2.children)
      if (child.parent !== node2)
        return !1;
    if (!checkLinks(node2.children))
      return !1;
  }
  return !0;
}
function runOptimizer(optimizer, nodes) {
  let modified2 = !1;
  for (let node2 of nodes)
    modified2 = optimizer.optimize(node2) || modified2;
  return modified2;
}
function optimizationDataflowHelper(dataComponent, model, firstPass) {
  let roots = dataComponent.sources, modified2 = !1;
  return modified2 = runOptimizer(new RemoveUnnecessaryOutputNodes(), roots) || modified2, modified2 = runOptimizer(new RemoveUnnecessaryIdentifierNodes(model), roots) || modified2, roots = roots.filter((r) => r.numChildren() > 0), modified2 = runOptimizer(new RemoveUnusedSubtrees(), roots) || modified2, roots = roots.filter((r) => r.numChildren() > 0), firstPass || (modified2 = runOptimizer(new MoveParseUp(), roots) || modified2, modified2 = runOptimizer(new MergeBins(model), roots) || modified2, modified2 = runOptimizer(new RemoveDuplicateTimeUnits(), roots) || modified2, modified2 = runOptimizer(new MergeParse(), roots) || modified2, modified2 = runOptimizer(new MergeAggregates(), roots) || modified2, modified2 = runOptimizer(new MergeTimeUnits(), roots) || modified2, modified2 = runOptimizer(new MergeIdenticalNodes(), roots) || modified2, modified2 = runOptimizer(new MergeOutputs(), roots) || modified2), dataComponent.sources = roots, modified2;
}
function optimizeDataflow(data3, model) {
  checkLinks(data3.sources);
  let firstPassCounter = 0, secondPassCounter = 0;
  for (let i = 0; i < MAX_OPTIMIZATION_RUNS && optimizationDataflowHelper(data3, model, !0); i++)
    firstPassCounter++;
  data3.sources.map(moveFacetDown);
  for (let i = 0; i < MAX_OPTIMIZATION_RUNS && optimizationDataflowHelper(data3, model, !1); i++)
    secondPassCounter++;
  checkLinks(data3.sources), Math.max(firstPassCounter, secondPassCounter) === MAX_OPTIMIZATION_RUNS && warn2(`Maximum optimization runs(${MAX_OPTIMIZATION_RUNS}) reached.`);
}
var SignalRefWrapper = class _SignalRefWrapper {
  constructor(exprGenerator) {
    Object.defineProperty(this, "signal", {
      enumerable: !0,
      get: exprGenerator
    });
  }
  signal;
  // for ts
  static fromName(rename8, signalName) {
    return new _SignalRefWrapper(() => rename8(signalName));
  }
};
function parseScaleDomain2(model) {
  isUnitModel(model) ? parseUnitScaleDomain(model) : parseNonUnitScaleDomain(model);
}
function parseUnitScaleDomain(model) {
  let localScaleComponents = model.component.scales;
  for (let channel of keys3(localScaleComponents)) {
    let domains = parseDomainForChannel(model, channel);
    if (localScaleComponents[channel].setWithExplicit("domains", domains), parseSelectionDomain(model, channel), model.component.data.isFaceted) {
      let facetParent = model;
      for (; !isFacetModel(facetParent) && facetParent.parent; )
        facetParent = facetParent.parent;
      if (facetParent.component.resolve.scale[channel] === "shared")
        for (let domain4 of domains.value)
          isDataRefDomain(domain4) && (domain4.data = FACET_SCALE_PREFIX + domain4.data.replace(FACET_SCALE_PREFIX, ""));
    }
  }
}
function parseNonUnitScaleDomain(model) {
  for (let child of model.children)
    parseScaleDomain2(child);
  let localScaleComponents = model.component.scales;
  for (let channel of keys3(localScaleComponents)) {
    let domains, selectionExtent = null;
    for (let child of model.children) {
      let childComponent = child.component.scales[channel];
      if (childComponent) {
        domains === void 0 ? domains = childComponent.getWithExplicit("domains") : domains = mergeValuesWithExplicit(domains, childComponent.getWithExplicit("domains"), "domains", "scale", domainsTieBreaker);
        let se = childComponent.get("selectionExtent");
        selectionExtent && se && selectionExtent.param !== se.param && warn2(NEEDS_SAME_SELECTION), selectionExtent = se;
      }
    }
    localScaleComponents[channel].setWithExplicit("domains", domains), selectionExtent && localScaleComponents[channel].set("selectionExtent", selectionExtent, !0);
  }
}
function normalizeUnaggregatedDomain(domain4, fieldDef, scaleType2, scaleConfig) {
  if (domain4 === "unaggregated") {
    let { valid, reason: reason3 } = canUseUnaggregatedDomain(fieldDef, scaleType2);
    if (!valid) {
      warn2(reason3);
      return;
    }
  } else if (domain4 === void 0 && scaleConfig.useUnaggregatedDomain) {
    let { valid } = canUseUnaggregatedDomain(fieldDef, scaleType2);
    if (valid)
      return "unaggregated";
  }
  return domain4;
}
function parseDomainForChannel(model, channel) {
  let scaleType2 = model.getScaleComponent(channel).get("type"), { encoding } = model, domain4 = normalizeUnaggregatedDomain(model.scaleDomain(channel), model.typedFieldDef(channel), scaleType2, model.config.scale);
  return domain4 !== model.scaleDomain(channel) && (model.specifiedScales[channel] = {
    ...model.specifiedScales[channel],
    domain: domain4
  }), channel === "x" && getFieldOrDatumDef(encoding.x2) ? getFieldOrDatumDef(encoding.x) ? mergeValuesWithExplicit(parseSingleChannelDomain(scaleType2, domain4, model, "x"), parseSingleChannelDomain(scaleType2, domain4, model, "x2"), "domain", "scale", domainsTieBreaker) : parseSingleChannelDomain(scaleType2, domain4, model, "x2") : channel === "y" && getFieldOrDatumDef(encoding.y2) ? getFieldOrDatumDef(encoding.y) ? mergeValuesWithExplicit(parseSingleChannelDomain(scaleType2, domain4, model, "y"), parseSingleChannelDomain(scaleType2, domain4, model, "y2"), "domain", "scale", domainsTieBreaker) : parseSingleChannelDomain(scaleType2, domain4, model, "y2") : parseSingleChannelDomain(scaleType2, domain4, model, channel);
}
function mapDomainToDataSignal(domain4, type3, timeUnit) {
  return domain4.map((v2) => ({ signal: `{data: ${valueExpr(v2, { timeUnit, type: type3 })}}` }));
}
function convertDomainIfItIsDateTime(domain4, type3, timeUnit) {
  let normalizedTimeUnit = normalizeTimeUnit(timeUnit)?.unit;
  return type3 === "temporal" || normalizedTimeUnit ? mapDomainToDataSignal(domain4, type3, normalizedTimeUnit) : [domain4];
}
function parseSingleChannelDomain(scaleType2, domain4, model, channel) {
  let { encoding, markDef, mark, config: config2, stack: stack2 } = model, fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]), { type: type3 } = fieldOrDatumDef, timeUnit = fieldOrDatumDef.timeUnit, dataSourceTypeForScaleDomain = getScaleDataSourceForHandlingInvalidValues({
    invalid: getMarkConfig("invalid", markDef, config2),
    isPath: isPathMark(mark)
  });
  if (isDomainUnionWith(domain4)) {
    let defaultDomain = parseSingleChannelDomain(scaleType2, void 0, model, channel), unionWith = convertDomainIfItIsDateTime(domain4.unionWith, type3, timeUnit);
    return makeExplicit([...unionWith, ...defaultDomain.value]);
  } else {
    if (isSignalRef(domain4))
      return makeExplicit([domain4]);
    if (domain4 && domain4 !== "unaggregated" && !isParameterDomain(domain4))
      return makeExplicit(convertDomainIfItIsDateTime(domain4, type3, timeUnit));
  }
  if (stack2 && channel === stack2.fieldChannel) {
    if (stack2.offset === "normalize")
      return makeImplicit([[0, 1]]);
    let data3 = model.requestDataName(dataSourceTypeForScaleDomain);
    return makeImplicit([
      {
        data: data3,
        field: model.vgField(channel, { suffix: "start" })
      },
      {
        data: data3,
        field: model.vgField(channel, { suffix: "end" })
      }
    ]);
  }
  let sort3 = isScaleChannel(channel) && isFieldDef(fieldOrDatumDef) ? domainSort(model, channel, scaleType2) : void 0;
  if (isDatumDef(fieldOrDatumDef)) {
    let d = convertDomainIfItIsDateTime([fieldOrDatumDef.datum], type3, timeUnit);
    return makeImplicit(d);
  }
  let fieldDef = fieldOrDatumDef;
  if (domain4 === "unaggregated") {
    let { field: field3 } = fieldOrDatumDef;
    return makeImplicit([
      {
        data: model.requestDataName(dataSourceTypeForScaleDomain),
        field: vgField({ field: field3, aggregate: "min" })
      },
      {
        data: model.requestDataName(dataSourceTypeForScaleDomain),
        field: vgField({ field: field3, aggregate: "max" })
      }
    ]);
  } else if (isBinning(fieldDef.bin)) {
    if (hasDiscreteDomain(scaleType2))
      return makeImplicit(scaleType2 === "bin-ordinal" ? [] : [
        {
          // If sort by aggregation of a specified sort field, we need to use RAW table,
          // so we can aggregate values for the scale independently from the main aggregation.
          data: isBoolean3(sort3) ? model.requestDataName(dataSourceTypeForScaleDomain) : model.requestDataName(DataSourceType.Raw),
          // Use range if we added it and the scale does not support computing a range as a signal.
          field: model.vgField(channel, binRequiresRange(fieldDef, channel) ? { binSuffix: "range" } : {}),
          // we have to use a sort object if sort = true to make the sort correct by bin start
          sort: sort3 === !0 || !isObject2(sort3) ? {
            field: model.vgField(channel, {}),
            op: "min"
          } : sort3
        }
      ]);
    {
      let { bin: bin3 } = fieldDef;
      if (isBinning(bin3)) {
        let binSignal = getBinSignalName(model, fieldDef.field, bin3);
        return makeImplicit([
          new SignalRefWrapper(() => {
            let signal = model.getSignalName(binSignal);
            return `[${signal}.start, ${signal}.stop]`;
          })
        ]);
      } else
        return makeImplicit([
          {
            data: model.requestDataName(dataSourceTypeForScaleDomain),
            field: model.vgField(channel, {})
          }
        ]);
    }
  } else if (fieldDef.timeUnit && contains2(["time", "utc"], scaleType2)) {
    let fieldDef2 = encoding[getSecondaryRangeChannel(channel)];
    if (hasBandEnd(fieldDef, fieldDef2, markDef, config2)) {
      let data3 = model.requestDataName(dataSourceTypeForScaleDomain), bandPosition = getBandPosition({ fieldDef, fieldDef2, markDef, config: config2 }), isRectWithOffset = isRectBasedMark(mark) && bandPosition !== 0.5 && isXorY(channel);
      return makeImplicit([
        {
          data: data3,
          field: model.vgField(channel, isRectWithOffset ? { suffix: OFFSETTED_RECT_START_SUFFIX } : {})
        },
        {
          data: data3,
          field: model.vgField(channel, { suffix: isRectWithOffset ? OFFSETTED_RECT_END_SUFFIX : "end" })
        }
      ]);
    }
  }
  return makeImplicit(sort3 ? [
    {
      // If sort by aggregation of a specified sort field, we need to use RAW table,
      // so we can aggregate values for the scale independently from the main aggregation.
      data: isBoolean3(sort3) ? model.requestDataName(dataSourceTypeForScaleDomain) : model.requestDataName(DataSourceType.Raw),
      field: model.vgField(channel),
      sort: sort3
    }
  ] : [
    {
      data: model.requestDataName(dataSourceTypeForScaleDomain),
      field: model.vgField(channel)
    }
  ]);
}
function normalizeSortField(sort3, isStackedMeasure) {
  let { op, field: field3, order } = sort3;
  return {
    // Apply default op
    op: op ?? (isStackedMeasure ? "sum" : DEFAULT_SORT_OP),
    // flatten nested fields
    ...field3 ? { field: replacePathInField(field3) } : {},
    ...order ? { order } : {}
  };
}
function parseSelectionDomain(model, channel) {
  let scale7 = model.component.scales[channel], spec = model.specifiedScales[channel].domain, bin3 = model.fieldDef(channel)?.bin, domain4 = isParameterDomain(spec) ? spec : void 0, extent2 = isBinParams(bin3) && isParameterExtent(bin3.extent) ? bin3.extent : void 0;
  (domain4 || extent2) && scale7.set("selectionExtent", domain4 ?? extent2, !0);
}
function domainSort(model, channel, scaleType2) {
  if (!hasDiscreteDomain(scaleType2))
    return;
  let fieldDef = model.fieldDef(channel), sort3 = fieldDef.sort;
  if (isSortArray(sort3))
    return {
      op: "min",
      field: sortArrayIndexField(fieldDef, channel),
      order: "ascending"
    };
  let { stack: stack2 } = model, stackDimensions = stack2 ? /* @__PURE__ */ new Set([...stack2.groupbyFields, ...stack2.stackBy.map((s) => s.fieldDef.field)]) : void 0;
  if (isSortField(sort3)) {
    let isStackedMeasure = stack2 && !stackDimensions.has(sort3.field);
    return normalizeSortField(sort3, isStackedMeasure);
  } else if (isSortByEncoding(sort3)) {
    let { encoding, order } = sort3, fieldDefToSortBy = model.fieldDef(encoding), { aggregate, field: field3 } = fieldDefToSortBy, isStackedMeasure = stack2 && !stackDimensions.has(field3);
    if (isArgminDef(aggregate) || isArgmaxDef(aggregate))
      return normalizeSortField({
        field: vgField(fieldDefToSortBy),
        order
      }, isStackedMeasure);
    if (isAggregateOp(aggregate) || !aggregate)
      return normalizeSortField({
        op: aggregate,
        // can't be argmin/argmax since we don't support them in encoding field def
        field: field3,
        order
      }, isStackedMeasure);
  } else {
    if (sort3 === "descending")
      return {
        op: "min",
        field: model.vgField(channel),
        order: "descending"
      };
    if (contains2([
      "ascending",
      void 0
      /* default =ascending*/
    ], sort3))
      return !0;
  }
}
function canUseUnaggregatedDomain(fieldDef, scaleType2) {
  let { aggregate, type: type3 } = fieldDef;
  return aggregate ? isString(aggregate) && !SHARED_DOMAIN_OPS.has(aggregate) ? {
    valid: !1,
    reason: unaggregateDomainWithNonSharedDomainOp(aggregate)
  } : type3 === "quantitative" && scaleType2 === "log" ? {
    valid: !1,
    reason: unaggregatedDomainWithLogScale(fieldDef)
  } : { valid: !0 } : {
    valid: !1,
    reason: unaggregateDomainHasNoEffectForRawField(fieldDef)
  };
}
function domainsTieBreaker(v1, v2, property2, propertyOf) {
  return v1.explicit && v2.explicit && warn2(mergeConflictingDomainProperty(property2, propertyOf, v1.value, v2.value)), { explicit: v1.explicit, value: [...v1.value, ...v2.value] };
}
function mergeDomains(domains) {
  let uniqueDomains = unique(domains.map((domain4) => {
    if (isDataRefDomain(domain4)) {
      let { sort: _s, ...domainWithoutSort } = domain4;
      return domainWithoutSort;
    }
    return domain4;
  }), hash5), sorts = unique(domains.map((d) => {
    if (isDataRefDomain(d)) {
      let s = d.sort;
      return s !== void 0 && !isBoolean3(s) && ("op" in s && s.op === "count" && delete s.field, s.order === "ascending" && delete s.order), s;
    }
  }).filter((s) => s !== void 0), hash5);
  if (uniqueDomains.length === 0)
    return;
  if (uniqueDomains.length === 1) {
    let domain4 = domains[0];
    if (isDataRefDomain(domain4) && sorts.length > 0) {
      let sort4 = sorts[0];
      if (sorts.length > 1) {
        warn2(MORE_THAN_ONE_SORT);
        let filteredSorts = sorts.filter((s) => isObject2(s) && "op" in s && s.op !== "min");
        sorts.every((s) => isObject2(s) && "op" in s) && filteredSorts.length === 1 ? sort4 = filteredSorts[0] : sort4 = !0;
      } else if (isObject2(sort4) && "field" in sort4) {
        let sortField = sort4.field;
        domain4.field === sortField && (sort4 = sort4.order ? { order: sort4.order } : !0);
      }
      return {
        ...domain4,
        sort: sort4
      };
    }
    return domain4;
  }
  let unionDomainSorts = unique(sorts.map((s) => isBoolean3(s) || !("op" in s) || isString(s.op) && hasOwnProperty(MULTIDOMAIN_SORT_OP_INDEX, s.op) ? s : (warn2(domainSortDropped(s)), !0)), hash5), sort3;
  unionDomainSorts.length === 1 ? sort3 = unionDomainSorts[0] : unionDomainSorts.length > 1 && (warn2(MORE_THAN_ONE_SORT), sort3 = !0);
  let allData = unique(domains.map((d) => isDataRefDomain(d) ? d.data : null), (x5) => x5);
  return allData.length === 1 && allData[0] !== null ? {
    data: allData[0],
    fields: uniqueDomains.map((d) => d.field),
    ...sort3 ? { sort: sort3 } : {}
  } : { fields: uniqueDomains, ...sort3 ? { sort: sort3 } : {} };
}
function getFieldFromDomain(domain4) {
  if (isDataRefDomain(domain4) && isString(domain4.field))
    return domain4.field;
  if (isDataRefUnionedDomain(domain4)) {
    let field3;
    for (let nonUnionDomain of domain4.fields)
      if (isDataRefDomain(nonUnionDomain) && isString(nonUnionDomain.field)) {
        if (!field3)
          field3 = nonUnionDomain.field;
        else if (field3 !== nonUnionDomain.field)
          return warn2(FACETED_INDEPENDENT_DIFFERENT_SOURCES), field3;
      }
    return warn2(FACETED_INDEPENDENT_SAME_FIELDS_DIFFERENT_SOURCES), field3;
  } else if (isFieldRefUnionDomain(domain4)) {
    warn2(FACETED_INDEPENDENT_SAME_SOURCE);
    let field3 = domain4.fields[0];
    return isString(field3) ? field3 : void 0;
  }
}
function assembleDomain(model, channel) {
  let domains = model.component.scales[channel].get("domains").map((domain4) => (isDataRefDomain(domain4) && (domain4.data = model.lookupDataSource(domain4.data)), domain4));
  return mergeDomains(domains);
}
function setLegendEncode(legend, part, vgProp, vgRef) {
  legend.encode ??= {}, legend.encode[part] ??= {}, legend.encode[part].update ??= {}, legend.encode[part].update[vgProp] = vgRef;
}
function getFieldKeyForChannel(model, channel) {
  if (isUnitModel(model)) {
    let fd = model.fieldDef(channel);
    if (fd?.field)
      return fd.field;
  }
  let childFields = (model.children ?? []).map((child) => getFieldKeyForChannel(child, channel)).filter((f) => !!f);
  if (childFields.length > 0) {
    let unique$1 = unique(childFields, hash5);
    return unique$1.length === 1 ? unique$1[0] : void 0;
  }
}
function legendsAreMergeCompatible(model, channelA, channelB) {
  if (channelA === channelB)
    return !0;
  let typeA = model.getScaleType(channelA), typeB = model.getScaleType(channelB);
  if (!typeA || !typeB)
    return !1;
  let aIsDiscrete = hasDiscreteDomain(typeA), bIsDiscrete = hasDiscreteDomain(typeB);
  return aIsDiscrete === bIsDiscrete;
}
function getLegendGroupKey(fieldKey2, channel) {
  return fieldKey2 ? `field:${fieldKey2}` : `channel:${String(channel)}`;
}
function extractDiscreteValuesFromDomain(domain4) {
  if (isArray(domain4)) {
    let primitives = domain4.filter(isPrimitive);
    return primitives.length > 0 ? primitives : null;
  }
  if (isDataRefUnionedDomain(domain4)) {
    let values3 = [];
    if (values3.push(...domain4.fields.flatMap((f) => isArray(f) ? f.filter(isPrimitive) : [])), values3.length > 0)
      return unique(values3, hash5);
  }
  return null;
}
function getDiscreteValuesForChannel(model, channel) {
  try {
    let domain4 = assembleDomain(model, channel);
    return extractDiscreteValuesFromDomain(domain4);
  } catch {
    return null;
  }
}
function unionDiscreteValuesForChannels(model, channelA, channelB) {
  let vA = getDiscreteValuesForChannel(model, channelA), vB = getDiscreteValuesForChannel(model, channelB);
  return vA && vB ? unique([...vA, ...vB], hash5) : null;
}
function setImplicitLegendValues(cmpt, values3, warnMessage) {
  values3 && values3.length > 0 && (cmpt.getWithExplicit("values")?.explicit || (warnMessage && warn2(warnMessage), cmpt.set("values", values3, !1)));
}
function domainsExplicitAndEqual(model, channelA, channelB) {
  let scA = model.getScaleComponent(channelA), scB = model.getScaleComponent(channelB);
  if (!scA || !scB)
    return !1;
  let dA = scA.getWithExplicit("domains"), dB = scB.getWithExplicit("domains");
  if (!(dA?.explicit && dB?.explicit))
    return !1;
  let assembledA = assembleDomain(model, channelA), assembledB = assembleDomain(model, channelB);
  return hash5(assembledA) === hash5(assembledB);
}
function assembleLegends(model) {
  let legendComponentIndex = model.component.legends, legendsByGroup = {};
  for (let channel of keys3(legendComponentIndex)) {
    let fieldKey2 = getFieldKeyForChannel(model, channel), groupKey = getLegendGroupKey(fieldKey2, channel);
    if (!legendsByGroup[groupKey]) {
      legendsByGroup[groupKey] = [{ channel, cmpt: legendComponentIndex[channel].clone() }];
      continue;
    }
    let mergedIntoExisting = !1;
    for (let existing of legendsByGroup[groupKey]) {
      if (!legendsAreMergeCompatible(model, existing.channel, channel))
        continue;
      if (mergeLegendComponent(existing.cmpt, legendComponentIndex[channel])) {
        let typeA = model.getScaleType(existing.channel), typeB = model.getScaleType(channel);
        typeA && typeB && hasDiscreteDomain(typeA) && hasDiscreteDomain(typeB) && (domainsExplicitAndEqual(model, existing.channel, channel) ? setImplicitLegendValues(existing.cmpt, getDiscreteValuesForChannel(model, existing.channel)) : setImplicitLegendValues(
          existing.cmpt,
          unionDiscreteValuesForChannels(model, existing.channel, channel),
          // Warn when unioning discrete legend values so that users are aware
          legendValuesUnioned(existing.channel, channel)
        )), mergedIntoExisting = !0;
        break;
      }
    }
    mergedIntoExisting || legendsByGroup[groupKey].push({ channel, cmpt: legendComponentIndex[channel].clone() });
  }
  return vals(legendsByGroup).flat().map((entry2) => assembleLegend(entry2.cmpt, model.config)).filter((l) => l !== void 0);
}
function assembleLegend(legendCmpt, config2) {
  let { disable, labelExpr, selections, ...legend } = legendCmpt.combine();
  if (!disable) {
    if (config2.aria === !1 && legend.aria == null && (legend.aria = !1), legend.encode?.symbols) {
      let out = legend.encode.symbols.update;
      out.fill && out.fill.value !== "transparent" && !out.stroke && !legend.stroke && (out.stroke = { value: "transparent" });
      for (let property2 of LEGEND_SCALE_CHANNELS)
        legend[property2] && delete out[property2];
    }
    if (legend.title || delete legend.title, labelExpr !== void 0) {
      let expr2 = labelExpr;
      legend.encode?.labels?.update && isSignalRef(legend.encode.labels.update.text) && (expr2 = replaceAll(labelExpr, "datum.label", legend.encode.labels.update.text.signal)), setLegendEncode(legend, "labels", "text", { signal: expr2 });
    }
    return legend;
  }
}
function assembleProjections(model) {
  return isLayerModel(model) || isConcatModel(model) ? assembleProjectionsForModelAndChildren(model) : assembleProjectionForModel(model);
}
function assembleProjectionsForModelAndChildren(model) {
  return model.children.reduce((projections2, child) => projections2.concat(child.assembleProjections()), assembleProjectionForModel(model));
}
function assembleProjectionForModel(model) {
  let component = model.component.projection;
  if (!component || component.merged)
    return [];
  let projection3 = component.combine(), { name: name2 } = projection3;
  if (component.data) {
    let size = {
      signal: `[${component.size.map((ref2) => ref2.signal).join(", ")}]`
    }, fits = component.data.reduce((sources, data3) => {
      let source4 = isSignalRef(data3) ? data3.signal : `data('${model.lookupDataSource(data3)}')`;
      return contains2(sources, source4) || sources.push(source4), sources;
    }, []);
    if (fits.length <= 0)
      throw new Error("Projection's fit didn't find any data sources");
    return [
      {
        name: name2,
        size,
        fit: {
          signal: fits.length > 1 ? `[${fits.join(", ")}]` : fits[0]
        },
        ...projection3
      }
    ];
  } else
    return [
      {
        name: name2,
        // translate to center by default
        translate: { signal: "[width / 2, height / 2]" },
        // parameters, overwrite default translate if specified
        ...projection3
      }
    ];
}
var PROJECTION_PROPERTIES = [
  "type",
  "clipAngle",
  "clipExtent",
  "center",
  "rotate",
  "precision",
  "reflectX",
  "reflectY",
  "coefficient",
  "distance",
  "fraction",
  "lobes",
  "parallel",
  "radius",
  "ratio",
  "spacing",
  "tilt"
], ProjectionComponent = class extends Split {
  specifiedProjection;
  size;
  data;
  merged = !1;
  constructor(name2, specifiedProjection, size, data3) {
    super(
      { ...specifiedProjection },
      // all explicit properties of projection
      { name: name2 }
    ), this.specifiedProjection = specifiedProjection, this.size = size, this.data = data3;
  }
  /**
   * Whether the projection parameters should fit provided data.
   */
  get isFit() {
    return !!this.data;
  }
};
function parseProjection2(model) {
  model.component.projection = isUnitModel(model) ? parseUnitProjection(model) : parseNonUnitProjections(model);
}
function parseUnitProjection(model) {
  if (model.hasProjection) {
    let proj = replaceExprRef(model.specifiedProjection), fit3 = !(proj && (proj.scale != null || proj.translate != null)), size = fit3 ? [model.getSizeSignalRef("width"), model.getSizeSignalRef("height")] : void 0, data3 = fit3 ? gatherFitData(model) : void 0, projComp = new ProjectionComponent(model.projectionName(!0), {
      ...replaceExprRef(model.config.projection),
      ...proj
    }, size, data3);
    return projComp.get("type") || projComp.set("type", "equalEarth", !1), projComp;
  }
}
function gatherFitData(model) {
  let data3 = [], { encoding } = model;
  for (let posssiblePair of [
    [LONGITUDE, LATITUDE],
    [LONGITUDE2, LATITUDE2]
  ])
    (getFieldOrDatumDef(encoding[posssiblePair[0]]) || getFieldOrDatumDef(encoding[posssiblePair[1]])) && data3.push({
      signal: model.getName(`geojson_${data3.length}`)
    });
  return model.channelHasField(SHAPE) && model.typedFieldDef(SHAPE).type === GEOJSON && data3.push({
    signal: model.getName(`geojson_${data3.length}`)
  }), data3.length === 0 && data3.push(model.requestDataName(DataSourceType.Main)), data3;
}
function mergeIfNoConflict(first, second2) {
  let allPropertiesShared = every(PROJECTION_PROPERTIES, (prop) => !!(!hasOwnProperty(first.explicit, prop) && !hasOwnProperty(second2.explicit, prop) || hasOwnProperty(first.explicit, prop) && hasOwnProperty(second2.explicit, prop) && // some properties might be signals or objects and require hashing for comparison
  deepEqual(first.get(prop), second2.get(prop))));
  if (deepEqual(first.size, second2.size)) {
    if (allPropertiesShared)
      return first;
    if (deepEqual(first.explicit, {}))
      return second2;
    if (deepEqual(second2.explicit, {}))
      return first;
  }
  return null;
}
function parseNonUnitProjections(model) {
  if (model.children.length === 0)
    return;
  let nonUnitProjection;
  for (let child of model.children)
    parseProjection2(child);
  let mergable = every(model.children, (child) => {
    let projection3 = child.component.projection;
    if (projection3)
      if (nonUnitProjection) {
        let merge7 = mergeIfNoConflict(nonUnitProjection, projection3);
        return merge7 && (nonUnitProjection = merge7), !!merge7;
      } else
        return nonUnitProjection = projection3, !0;
    else return !0;
  });
  if (nonUnitProjection && mergable) {
    let name2 = model.projectionName(!0), modelProjection = new ProjectionComponent(name2, nonUnitProjection.specifiedProjection, nonUnitProjection.size, duplicate(nonUnitProjection.data));
    for (let child of model.children) {
      let projection3 = child.component.projection;
      projection3 && (projection3.isFit && modelProjection.data.push(...child.component.projection.data), child.renameProjection(projection3.get("name"), name2), projection3.merged = !0);
    }
    return modelProjection;
  }
}
function assembleScales(model) {
  return isLayerModel(model) || isConcatModel(model) ? model.children.reduce((scales2, child) => scales2.concat(assembleScales(child)), assembleScalesForModel(model)) : assembleScalesForModel(model);
}
function assembleScalesForModel(model) {
  return keys3(model.component.scales).reduce((scales2, channel) => {
    let scaleComponent = model.component.scales[channel];
    if (scaleComponent.merged)
      return scales2;
    let scale7 = scaleComponent.combine(), { name: name2, type: type3, selectionExtent, domains: _d2, range: _r2, reverse: reverse3, ...otherScaleProps } = scale7, range7 = assembleScaleRange(scale7.range, name2, channel, model), domain4 = assembleDomain(model, channel), domainRaw = selectionExtent ? assembleSelectionScaleDomain(model, selectionExtent, scaleComponent, domain4) : null;
    return scales2.push({
      name: name2,
      type: type3,
      ...domain4 ? { domain: domain4 } : {},
      ...domainRaw ? { domainRaw } : {},
      range: range7,
      ...reverse3 !== void 0 ? { reverse: reverse3 } : {},
      ...otherScaleProps
    }), scales2;
  }, []);
}
function assembleScaleRange(scaleRange, scaleName, channel, model) {
  if (isXorY(channel)) {
    if (isVgRangeStep(scaleRange))
      return {
        step: { signal: `${scaleName}_step` }
      };
  } else if (isObject2(scaleRange) && isDataRefDomain(scaleRange))
    return {
      ...scaleRange,
      data: model.lookupDataSource(scaleRange.data)
    };
  return scaleRange;
}
var ScaleComponent = class extends Split {
  merged = !1;
  constructor(name2, typeWithExplicit) {
    super(
      {},
      // no initial explicit property
      { name: name2 }
    ), this.setWithExplicit("type", typeWithExplicit);
  }
  /**
   * Whether the scale definitely includes or not include zero in the domain
   */
  domainHasZero() {
    let scaleType2 = this.get("type");
    if (contains2([ScaleType.LOG, ScaleType.TIME, ScaleType.UTC], scaleType2))
      return "definitely-not";
    let scaleZero = this.get("zero");
    if (scaleZero === !0 || // If zero is undefined, linear/sqrt/pow scales have zero by default.
    scaleZero === void 0 && contains2([ScaleType.LINEAR, ScaleType.SQRT, ScaleType.POW], scaleType2))
      return "definitely";
    let domains = this.get("domains");
    if (domains.length > 0) {
      let hasExplicitDomainWithZero = !1, hasExplicitDomainWithoutZero = !1, hasDomainBasedOnField = !1;
      for (let d of domains) {
        if (isArray(d)) {
          let first = d[0], last = d[d.length - 1];
          if (isNumber(first) && isNumber(last))
            if (first <= 0 && last >= 0) {
              hasExplicitDomainWithZero = !0;
              continue;
            } else {
              hasExplicitDomainWithoutZero = !0;
              continue;
            }
        }
        hasDomainBasedOnField = !0;
      }
      if (hasExplicitDomainWithZero)
        return "definitely";
      if (hasExplicitDomainWithoutZero && !hasDomainBasedOnField)
        return "definitely-not";
    }
    return "maybe";
  }
}, RANGE_PROPERTIES = ["range", "scheme"];
function parseUnitScaleRange(model) {
  let localScaleComponents = model.component.scales;
  for (let channel of SCALE_CHANNELS) {
    let localScaleCmpt = localScaleComponents[channel];
    if (!localScaleCmpt)
      continue;
    let rangeWithExplicit = parseRangeForChannel(channel, model);
    localScaleCmpt.setWithExplicit("range", rangeWithExplicit);
  }
}
function getBinStepSignal(model, channel) {
  let fieldDef = model.fieldDef(channel);
  if (fieldDef?.bin) {
    let { bin: bin3, field: field3 } = fieldDef, sizeType = getSizeChannel(channel), sizeSignal = model.getName(sizeType);
    if (isObject2(bin3) && bin3.binned && bin3.step !== void 0)
      return new SignalRefWrapper(() => {
        let scaleName = model.scaleName(channel), binCount = `(domain("${scaleName}")[1] - domain("${scaleName}")[0]) / ${bin3.step}`;
        return `${model.getSignalName(sizeSignal)} / (${binCount})`;
      });
    if (isBinning(bin3)) {
      let binSignal = getBinSignalName(model, field3, bin3);
      return new SignalRefWrapper(() => {
        let updatedName = model.getSignalName(binSignal), binCount = `(${updatedName}.stop - ${updatedName}.start) / ${updatedName}.step`;
        return `${model.getSignalName(sizeSignal)} / (${binCount})`;
      });
    }
  }
}
function parseRangeForChannel(channel, model) {
  let specifiedScale = model.specifiedScales[channel], { size } = model, scaleType2 = model.getScaleComponent(channel).get("type");
  for (let property2 of RANGE_PROPERTIES)
    if (specifiedScale[property2] !== void 0) {
      let supportedByScaleType = scaleTypeSupportProperty(scaleType2, property2), channelIncompatability = channelScalePropertyIncompatability(channel, property2);
      if (!supportedByScaleType)
        warn2(scalePropertyNotWorkWithScaleType(scaleType2, property2, channel));
      else if (channelIncompatability)
        warn2(channelIncompatability);
      else
        switch (property2) {
          case "range": {
            let range7 = specifiedScale.range;
            if (isArray(range7)) {
              if (isXorY(channel))
                return makeExplicit(range7.map((v2) => {
                  if (v2 === "width" || v2 === "height") {
                    let sizeSignal = model.getName(v2), getSignalName = model.getSignalName.bind(model);
                    return SignalRefWrapper.fromName(getSignalName, sizeSignal);
                  }
                  return v2;
                }));
            } else if (isObject2(range7))
              return makeExplicit({
                data: model.requestDataName(DataSourceType.Main),
                field: range7.field,
                sort: { op: "min", field: model.vgField(channel) }
              });
            return makeExplicit(range7);
          }
          case "scheme":
            return makeExplicit(parseScheme(specifiedScale[property2]));
        }
    }
  let sizeChannel = channel === X3 || channel === "xOffset" ? "width" : "height", sizeValue = size[sizeChannel];
  if (isStep(sizeValue)) {
    if (isXorY(channel))
      if (hasDiscreteDomain(scaleType2)) {
        let step = getPositionStep(sizeValue, model, channel);
        if (step)
          return makeExplicit({ step });
      } else
        warn2(stepDropped(sizeChannel));
    else if (isXorYOffset(channel)) {
      let positionChannel = channel === XOFFSET ? "x" : "y";
      if (model.getScaleComponent(positionChannel).get("type") === "band") {
        let step = getOffsetStep(sizeValue, scaleType2);
        if (step)
          return makeExplicit(step);
      }
    }
  }
  let { rangeMin: rangeMin2, rangeMax: rangeMax2 } = specifiedScale, d = defaultRange(channel, model);
  return (rangeMin2 !== void 0 || rangeMax2 !== void 0) && // it's ok to check just rangeMin's compatibility since rangeMin/rangeMax are the same
  scaleTypeSupportProperty(scaleType2, "rangeMin") && isArray(d) && d.length === 2 ? makeExplicit([rangeMin2 ?? d[0], rangeMax2 ?? d[1]]) : makeImplicit(d);
}
function parseScheme(scheme3) {
  return isExtendedScheme(scheme3) ? {
    scheme: scheme3.name,
    ...omit2(scheme3, ["name"])
  } : { scheme: scheme3 };
}
function fullWidthOrHeightRange(channel, model, scaleType2, { center } = {}) {
  let sizeType = getSizeChannel(channel), sizeSignal = model.getName(sizeType), getSignalName = model.getSignalName.bind(model);
  return channel === Y3 && hasContinuousDomain(scaleType2) ? center ? [
    SignalRefWrapper.fromName((name2) => `${getSignalName(name2)}/2`, sizeSignal),
    SignalRefWrapper.fromName((name2) => `-${getSignalName(name2)}/2`, sizeSignal)
  ] : [SignalRefWrapper.fromName(getSignalName, sizeSignal), 0] : center ? [
    SignalRefWrapper.fromName((name2) => `-${getSignalName(name2)}/2`, sizeSignal),
    SignalRefWrapper.fromName((name2) => `${getSignalName(name2)}/2`, sizeSignal)
  ] : [0, SignalRefWrapper.fromName(getSignalName, sizeSignal)];
}
function defaultRange(channel, model) {
  let { size, config: config2, mark, encoding } = model, { type: type3 } = getFieldOrDatumDef(encoding[channel]), scaleType2 = model.getScaleComponent(channel).get("type"), { domain: domain4, domainMid } = model.specifiedScales[channel];
  switch (channel) {
    case X3:
    case Y3: {
      if (contains2(["point", "band"], scaleType2)) {
        let positionSize = getDiscretePositionSize(channel, size, config2.view);
        if (isStep(positionSize))
          return { step: getPositionStep(positionSize, model, channel) };
      }
      return fullWidthOrHeightRange(channel, model, scaleType2);
    }
    case XOFFSET:
    case YOFFSET:
      return getOffsetRange(channel, model, scaleType2);
    case SIZE2: {
      let rangeMin2 = sizeRangeMin(mark, config2), rangeMax2 = sizeRangeMax(mark, size, model, config2);
      return isContinuousToDiscrete(scaleType2) ? interpolateRange2(rangeMin2, rangeMax2, defaultContinuousToDiscreteCount(scaleType2, config2, domain4, channel)) : [rangeMin2, rangeMax2];
    }
    case THETA:
      return [0, Math.PI * 2];
    case ANGLE:
      return [0, 360];
    case RADIUS:
      return [
        0,
        new SignalRefWrapper(() => {
          let w2 = model.getSignalName(isFacetModel(model.parent) ? "child_width" : "width"), h2 = model.getSignalName(isFacetModel(model.parent) ? "child_height" : "height");
          return `min(${w2},${h2})/2`;
        })
      ];
    case TIME:
      return { step: 1e3 / config2.scale.framesPerSecond };
    case STROKEWIDTH:
      return [config2.scale.minStrokeWidth, config2.scale.maxStrokeWidth];
    case STROKEDASH:
      return [
        // TODO: add this to Vega's config.range?
        [1, 0],
        [4, 2],
        [2, 1],
        [1, 1],
        [1, 2, 4, 2]
      ];
    case SHAPE:
      return "symbol";
    case COLOR:
    case FILL:
    case STROKE:
      return scaleType2 === "ordinal" ? type3 === "nominal" ? "category" : "ordinal" : domainMid !== void 0 ? "diverging" : mark === "rect" || mark === "geoshape" ? "heatmap" : "ramp";
    case OPACITY:
    case FILLOPACITY:
    case STROKEOPACITY:
      return [config2.scale.minOpacity, config2.scale.maxOpacity];
  }
}
function getPositionStep(step, model, channel) {
  let { encoding } = model, mergedScaleCmpt = model.getScaleComponent(channel), offsetChannel = getOffsetScaleChannel(channel), offsetDef = encoding[offsetChannel];
  if (getStepFor({ step, offsetIsDiscrete: isFieldOrDatumDef(offsetDef) && isDiscrete$1(offsetDef.type) }) === "offset" && channelHasFieldOrDatum(encoding, offsetChannel)) {
    let offsetScaleCmpt = model.getScaleComponent(offsetChannel), stepCount = `domain('${model.scaleName(offsetChannel)}').length`;
    if (offsetScaleCmpt.get("type") === "band") {
      let offsetPaddingInner = offsetScaleCmpt.get("paddingInner") ?? offsetScaleCmpt.get("padding") ?? 0, offsetPaddingOuter = offsetScaleCmpt.get("paddingOuter") ?? offsetScaleCmpt.get("padding") ?? 0;
      stepCount = `bandspace(${stepCount}, ${offsetPaddingInner}, ${offsetPaddingOuter})`;
    }
    let paddingInner2 = mergedScaleCmpt.get("paddingInner") ?? mergedScaleCmpt.get("padding");
    return {
      signal: `${step.step} * ${stepCount} / (1-${exprFromSignalRefOrValue(paddingInner2)})`
    };
  } else
    return step.step;
}
function getOffsetStep(step, offsetScaleType) {
  if (getStepFor({ step, offsetIsDiscrete: hasDiscreteDomain(offsetScaleType) }) === "offset")
    return { step: step.step };
}
function getOffsetRange(channel, model, offsetScaleType) {
  let positionChannel = channel === XOFFSET ? "x" : "y", positionScaleCmpt = model.getScaleComponent(positionChannel);
  if (!positionScaleCmpt)
    return fullWidthOrHeightRange(positionChannel, model, offsetScaleType, { center: !0 });
  let positionScaleType = positionScaleCmpt.get("type"), positionScaleName = model.scaleName(positionChannel), { markDef, config: config2 } = model;
  if (positionScaleType === "band") {
    let size = getDiscretePositionSize(positionChannel, model.size, model.config.view);
    if (isStep(size)) {
      let step = getOffsetStep(size, offsetScaleType);
      if (step)
        return step;
    }
    return [0, { signal: `bandwidth('${positionScaleName}')` }];
  } else {
    let positionDef = model.encoding[positionChannel];
    if (isFieldDef(positionDef) && positionDef.timeUnit) {
      let duration3 = durationExpr(positionDef.timeUnit, (expr2) => `scale('${positionScaleName}', ${expr2})`), padding3 = model.config.scale.bandWithNestedOffsetPaddingInner, bandPositionOffset = getBandPosition({
        fieldDef: positionDef,
        markDef,
        config: config2
      }) - 0.5, bandPositionOffsetExpr = bandPositionOffset !== 0 ? ` + ${bandPositionOffset}` : "";
      if (padding3) {
        let startRatio = isSignalRef(padding3) ? `${padding3.signal}/2${bandPositionOffsetExpr}` : `${padding3 / 2 + bandPositionOffset}`, endRatio = isSignalRef(padding3) ? `(1 - ${padding3.signal}/2)${bandPositionOffsetExpr}` : `${1 - padding3 / 2 + bandPositionOffset}`;
        return [{ signal: `${startRatio} * (${duration3})` }, { signal: `${endRatio} * (${duration3})` }];
      }
      return [0, { signal: duration3 }];
    }
    return never2(`Cannot use ${channel} scale if ${positionChannel} scale is not discrete.`);
  }
}
function getDiscretePositionSize(channel, size, viewConfig) {
  let sizeChannel = channel === X3 ? "width" : "height", sizeValue = size[sizeChannel];
  return sizeValue !== void 0 ? sizeValue : getViewConfigDiscreteSize(viewConfig, sizeChannel);
}
function defaultContinuousToDiscreteCount(scaleType2, config2, domain4, channel) {
  switch (scaleType2) {
    case "quantile":
      return config2.scale.quantileCount;
    case "quantize":
      return config2.scale.quantizeCount;
    case "threshold":
      return domain4 !== void 0 && isArray(domain4) ? domain4.length + 1 : (warn2(domainRequiredForThresholdScale(channel)), 3);
  }
}
function interpolateRange2(rangeMin2, rangeMax2, cardinality) {
  let f = () => {
    let rMax = signalOrStringValue(rangeMax2), rMin = signalOrStringValue(rangeMin2), step = `(${rMax} - ${rMin}) / (${cardinality} - 1)`;
    return `sequence(${rMin}, ${rMax} + ${step}, ${step})`;
  };
  return isSignalRef(rangeMax2) ? new SignalRefWrapper(f) : { signal: f() };
}
function sizeRangeMin(mark, config2) {
  switch (mark) {
    case "bar":
    case "tick":
      return config2.scale.minBandSize;
    case "line":
    case "trail":
    case "rule":
      return config2.scale.minStrokeWidth;
    case "text":
      return config2.scale.minFontSize;
    case "point":
    case "square":
    case "circle":
      return config2.scale.minSize;
  }
  throw new Error(incompatibleChannel("size", mark));
}
var MAX_SIZE_RANGE_STEP_RATIO = 0.95;
function sizeRangeMax(mark, size, model, config2) {
  let xyStepSignals = {
    x: getBinStepSignal(model, "x"),
    y: getBinStepSignal(model, "y")
  };
  switch (mark) {
    case "bar":
    case "tick": {
      if (config2.scale.maxBandSize !== void 0)
        return config2.scale.maxBandSize;
      let min4 = minXYStep(size, xyStepSignals, config2.view);
      return isNumber(min4) ? min4 - 1 : new SignalRefWrapper(() => `${min4.signal} - 1`);
    }
    case "line":
    case "trail":
    case "rule":
      return config2.scale.maxStrokeWidth;
    case "text":
      return config2.scale.maxFontSize;
    case "point":
    case "square":
    case "circle": {
      if (config2.scale.maxSize)
        return config2.scale.maxSize;
      let pointStep = minXYStep(size, xyStepSignals, config2.view);
      return isNumber(pointStep) ? Math.pow(MAX_SIZE_RANGE_STEP_RATIO * pointStep, 2) : new SignalRefWrapper(() => `pow(${MAX_SIZE_RANGE_STEP_RATIO} * ${pointStep.signal}, 2)`);
    }
  }
  throw new Error(incompatibleChannel("size", mark));
}
function minXYStep(size, xyStepSignals, viewConfig) {
  let widthStep = isStep(size.width) ? size.width.step : getViewConfigDiscreteStep(viewConfig, "width"), heightStep = isStep(size.height) ? size.height.step : getViewConfigDiscreteStep(viewConfig, "height");
  return xyStepSignals.x || xyStepSignals.y ? new SignalRefWrapper(() => `min(${[
    xyStepSignals.x ? xyStepSignals.x.signal : widthStep,
    xyStepSignals.y ? xyStepSignals.y.signal : heightStep
  ].join(", ")})`) : Math.min(widthStep, heightStep);
}
function parseScaleProperty(model, property2) {
  isUnitModel(model) ? parseUnitScaleProperty(model, property2) : parseNonUnitScaleProperty(model, property2);
}
function parseUnitScaleProperty(model, property2) {
  let localScaleComponents = model.component.scales, { config: config2, encoding, markDef, specifiedScales } = model;
  for (let channel of keys3(localScaleComponents)) {
    let specifiedScale = specifiedScales[channel], localScaleCmpt = localScaleComponents[channel], mergedScaleCmpt = model.getScaleComponent(channel), fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]), specifiedValue = specifiedScale[property2], scaleType2 = mergedScaleCmpt.get("type"), scalePadding = mergedScaleCmpt.get("padding"), scalePaddingInner = mergedScaleCmpt.get("paddingInner"), supportedByScaleType = scaleTypeSupportProperty(scaleType2, property2), channelIncompatability = channelScalePropertyIncompatability(channel, property2);
    if (specifiedValue !== void 0 && (supportedByScaleType ? channelIncompatability && warn2(channelIncompatability) : warn2(scalePropertyNotWorkWithScaleType(scaleType2, property2, channel))), supportedByScaleType && channelIncompatability === void 0)
      if (specifiedValue !== void 0) {
        let timeUnit = fieldOrDatumDef.timeUnit, type3 = fieldOrDatumDef.type;
        switch (property2) {
          // domainMax/Min to signal if the value is a datetime object
          case "domainMax":
          case "domainMin":
            isDateTime(specifiedScale[property2]) || type3 === "temporal" || timeUnit ? localScaleCmpt.set(property2, { signal: valueExpr(specifiedScale[property2], { type: type3, timeUnit }) }, !0) : localScaleCmpt.set(property2, specifiedScale[property2], !0);
            break;
          default:
            localScaleCmpt.copyKeyFromObject(property2, specifiedScale);
        }
      } else {
        let value3 = hasProperty(scaleRules, property2) ? scaleRules[property2]({
          model,
          channel,
          fieldOrDatumDef,
          scaleType: scaleType2,
          scalePadding,
          scalePaddingInner,
          domain: specifiedScale.domain,
          domainMin: specifiedScale.domainMin,
          domainMax: specifiedScale.domainMax,
          markDef,
          config: config2,
          hasNestedOffsetScale: channelHasNestedOffsetScale(encoding, channel),
          hasSecondaryRangeChannel: !!encoding[getSecondaryRangeChannel(channel)]
        }) : config2.scale[property2];
        value3 !== void 0 && localScaleCmpt.set(property2, value3, !1);
      }
  }
}
var scaleRules = {
  bins: ({ model, fieldOrDatumDef }) => isFieldDef(fieldOrDatumDef) ? bins(model, fieldOrDatumDef) : void 0,
  interpolate: ({ channel, fieldOrDatumDef }) => interpolate2(channel, fieldOrDatumDef.type),
  nice: ({ scaleType: scaleType2, channel, domain: domain4, domainMin, domainMax, fieldOrDatumDef }) => nice2(scaleType2, channel, domain4, domainMin, domainMax, fieldOrDatumDef),
  padding: ({ channel, scaleType: scaleType2, fieldOrDatumDef, markDef, config: config2 }) => padding2(channel, scaleType2, config2.scale, fieldOrDatumDef, markDef, config2.bar),
  paddingInner: ({ scalePadding, channel, markDef, scaleType: scaleType2, config: config2, hasNestedOffsetScale }) => paddingInner(scalePadding, channel, markDef.type, scaleType2, config2.scale, hasNestedOffsetScale),
  paddingOuter: ({ scalePadding, channel, scaleType: scaleType2, scalePaddingInner, config: config2, hasNestedOffsetScale }) => paddingOuter(scalePadding, channel, scaleType2, scalePaddingInner, config2.scale, hasNestedOffsetScale),
  reverse: ({ fieldOrDatumDef, scaleType: scaleType2, channel, config: config2 }) => {
    let sort3 = isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.sort : void 0;
    return reverse2(scaleType2, sort3, channel, config2.scale);
  },
  zero: ({ channel, fieldOrDatumDef, domain: domain4, markDef, scaleType: scaleType2, config: config2, hasSecondaryRangeChannel }) => zero5(channel, fieldOrDatumDef, domain4, markDef, scaleType2, config2.scale, hasSecondaryRangeChannel)
};
function parseScaleRange2(model) {
  isUnitModel(model) ? parseUnitScaleRange(model) : parseNonUnitScaleProperty(model, "range");
}
function parseNonUnitScaleProperty(model, property2) {
  let localScaleComponents = model.component.scales;
  for (let child of model.children)
    property2 === "range" ? parseScaleRange2(child) : parseScaleProperty(child, property2);
  for (let channel of keys3(localScaleComponents)) {
    let valueWithExplicit;
    for (let child of model.children) {
      let childComponent = child.component.scales[channel];
      if (childComponent) {
        let childValueWithExplicit = childComponent.getWithExplicit(property2);
        valueWithExplicit = mergeValuesWithExplicit(valueWithExplicit, childValueWithExplicit, property2, "scale", tieBreakByComparing((v1, v2) => property2 === "range" && v1.step && v2.step ? v1.step - v2.step : 0));
      }
    }
    localScaleComponents[channel].setWithExplicit(property2, valueWithExplicit);
  }
}
function bins(model, fieldDef) {
  let bin3 = fieldDef.bin;
  if (isBinning(bin3)) {
    let binSignal = getBinSignalName(model, fieldDef.field, bin3);
    return new SignalRefWrapper(() => model.getSignalName(binSignal));
  } else if (isBinned(bin3) && isBinParams(bin3) && bin3.step !== void 0)
    return {
      step: bin3.step
    };
}
function interpolate2(channel, type3) {
  if (contains2([COLOR, FILL, STROKE], channel) && type3 !== "nominal")
    return "hcl";
}
function nice2(scaleType2, channel, specifiedDomain, domainMin, domainMax, fieldOrDatumDef) {
  if (!(getFieldDef(fieldOrDatumDef)?.bin || isArray(specifiedDomain) || domainMax != null || domainMin != null || contains2([ScaleType.TIME, ScaleType.UTC], scaleType2)))
    return isXorY(channel) ? !0 : void 0;
}
function padding2(channel, scaleType2, scaleConfig, fieldOrDatumDef, markDef, barConfig) {
  if (isXorY(channel)) {
    if (isContinuousToContinuous(scaleType2)) {
      if (scaleConfig.continuousPadding !== void 0)
        return scaleConfig.continuousPadding;
      let { type: type3, orient: orient2 } = markDef;
      if (type3 === "bar" && !(isFieldDef(fieldOrDatumDef) && (fieldOrDatumDef.bin || fieldOrDatumDef.timeUnit)) && (orient2 === "vertical" && channel === "x" || orient2 === "horizontal" && channel === "y"))
        return barConfig.continuousBandSize;
    }
    if (scaleType2 === ScaleType.POINT)
      return scaleConfig.pointPadding;
  }
}
function paddingInner(paddingValue, channel, mark, scaleType2, scaleConfig, hasNestedOffsetScale = !1) {
  if (paddingValue === void 0) {
    if (isXorY(channel)) {
      let { bandPaddingInner, barBandPaddingInner, rectBandPaddingInner, tickBandPaddingInner, bandWithNestedOffsetPaddingInner } = scaleConfig;
      return hasNestedOffsetScale ? bandWithNestedOffsetPaddingInner : getFirstDefined(bandPaddingInner, mark === "bar" ? barBandPaddingInner : mark === "tick" ? tickBandPaddingInner : rectBandPaddingInner);
    } else if (isXorYOffset(channel) && scaleType2 === ScaleType.BAND)
      return scaleConfig.offsetBandPaddingInner;
  }
}
function paddingOuter(paddingValue, channel, scaleType2, paddingInnerValue, scaleConfig, hasNestedOffsetScale = !1) {
  if (paddingValue === void 0) {
    if (isXorY(channel)) {
      let { bandPaddingOuter, bandWithNestedOffsetPaddingOuter } = scaleConfig;
      if (hasNestedOffsetScale)
        return bandWithNestedOffsetPaddingOuter;
      if (scaleType2 === ScaleType.BAND)
        return getFirstDefined(
          bandPaddingOuter,
          /* By default, paddingOuter is paddingInner / 2. The reason is that
            size (width/height) = step * (cardinality - paddingInner + 2 * paddingOuter).
            and we want the width/height to be integer by default.
            Note that step (by default) and cardinality are integers.) */
          isSignalRef(paddingInnerValue) ? { signal: `${paddingInnerValue.signal}/2` } : paddingInnerValue / 2
        );
    } else if (isXorYOffset(channel)) {
      if (scaleType2 === ScaleType.POINT)
        return 0.5;
      if (scaleType2 === ScaleType.BAND)
        return scaleConfig.offsetBandPaddingOuter;
    }
  }
}
function reverse2(scaleType2, sort3, channel, scaleConfig) {
  if (channel === "x" && scaleConfig.xReverse !== void 0)
    return hasContinuousDomain(scaleType2) && sort3 === "descending" ? isSignalRef(scaleConfig.xReverse) ? { signal: `!${scaleConfig.xReverse.signal}` } : !scaleConfig.xReverse : scaleConfig.xReverse;
  if (hasContinuousDomain(scaleType2) && sort3 === "descending")
    return !0;
}
function zero5(channel, fieldDef, specifiedDomain, markDef, scaleType2, scaleConfig, hasSecondaryRangeChannel) {
  if (!!specifiedDomain && specifiedDomain !== "unaggregated" && hasContinuousDomain(scaleType2)) {
    if (isArray(specifiedDomain)) {
      let first = specifiedDomain[0], last = specifiedDomain[specifiedDomain.length - 1];
      if (isNumber(first) && first <= 0 && isNumber(last) && last >= 0)
        return !0;
    }
    return !1;
  }
  if (channel === "size" && fieldDef.type === "quantitative" && !isContinuousToDiscrete(scaleType2))
    return !0;
  if (!(isFieldDef(fieldDef) && fieldDef.bin) && contains2([...POSITION_SCALE_CHANNELS, ...POLAR_POSITION_SCALE_CHANNELS], channel)) {
    let { orient: orient2, type: type3 } = markDef;
    return contains2(["bar", "area", "line", "trail"], type3) && (orient2 === "horizontal" && channel === "y" || orient2 === "vertical" && channel === "x") ? !1 : contains2(["bar", "area"], type3) && !hasSecondaryRangeChannel ? !0 : scaleConfig?.zero;
  }
  return !1;
}
function scaleType(specifiedScale, channel, fieldDef, mark, hasNestedOffsetScale = !1) {
  let defaultScaleType = defaultType(channel, fieldDef, mark, hasNestedOffsetScale), { type: type3 } = specifiedScale;
  return isScaleChannel(channel) ? type3 !== void 0 ? channelSupportScaleType(channel, type3) ? isFieldDef(fieldDef) && !scaleTypeSupportDataType(type3, fieldDef.type) ? (warn2(scaleTypeNotWorkWithFieldDef(type3, defaultScaleType)), defaultScaleType) : type3 : (warn2(scaleTypeNotWorkWithChannel(channel, type3, defaultScaleType)), defaultScaleType) : defaultScaleType : null;
}
function defaultType(channel, fieldDef, mark, hasNestedOffsetScale) {
  switch (fieldDef.type) {
    case "nominal":
    case "ordinal": {
      if (isColorChannel(channel) || rangeType(channel) === "discrete")
        return channel === "shape" && fieldDef.type === "ordinal" && warn2(discreteChannelCannotEncode(channel, "ordinal")), "ordinal";
      if (isTime(channel))
        return "band";
      if (isXorY(channel) || isXorYOffset(channel)) {
        if (contains2(["rect", "bar", "image", "rule", "tick"], mark.type) || hasNestedOffsetScale)
          return "band";
      } else if (mark.type === "arc" && channel in POLAR_POSITION_SCALE_CHANNEL_INDEX)
        return "band";
      let dimensionSize = mark[getSizeChannel(channel)];
      return isRelativeBandSize(dimensionSize) || isPositionFieldOrDatumDef(fieldDef) && fieldDef.axis?.tickBand ? "band" : "point";
    }
    case "temporal":
      return isColorChannel(channel) ? "time" : rangeType(channel) === "discrete" ? (warn2(discreteChannelCannotEncode(channel, "temporal")), "ordinal") : isFieldDef(fieldDef) && fieldDef.timeUnit && normalizeTimeUnit(fieldDef.timeUnit).utc ? "utc" : isTime(channel) ? "band" : "time";
    case "quantitative":
      return isColorChannel(channel) ? isFieldDef(fieldDef) && isBinning(fieldDef.bin) ? "bin-ordinal" : "linear" : rangeType(channel) === "discrete" ? (warn2(discreteChannelCannotEncode(channel, "quantitative")), "ordinal") : isTime(channel) ? "band" : "linear";
    case "geojson":
      return;
  }
  throw new Error(invalidFieldType(fieldDef.type));
}
function parseScales(model, { ignoreRange } = {}) {
  parseScaleCore(model), parseScaleDomain2(model);
  for (let prop of NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES)
    parseScaleProperty(model, prop);
  ignoreRange || parseScaleRange2(model);
}
function parseScaleCore(model) {
  isUnitModel(model) ? model.component.scales = parseUnitScaleCore(model) : model.component.scales = parseNonUnitScaleCore(model);
}
function parseUnitScaleCore(model) {
  let { encoding, mark, markDef } = model, scaleComponents = {};
  for (let channel of SCALE_CHANNELS) {
    let fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
    if (fieldOrDatumDef && mark === GEOSHAPE && channel === SHAPE && fieldOrDatumDef.type === GEOJSON)
      continue;
    let specifiedScale = fieldOrDatumDef && fieldOrDatumDef.scale;
    if (fieldOrDatumDef && specifiedScale !== null && specifiedScale !== !1) {
      specifiedScale ??= {};
      let hasNestedOffsetScale = channelHasNestedOffsetScale(encoding, channel), sType = scaleType(specifiedScale, channel, fieldOrDatumDef, markDef, hasNestedOffsetScale);
      scaleComponents[channel] = new ScaleComponent(model.scaleName(`${channel}`, !0), {
        value: sType,
        explicit: specifiedScale.type === sType
      });
    }
  }
  return scaleComponents;
}
var scaleTypeTieBreaker = tieBreakByComparing((st1, st2) => scaleTypePrecedence(st1) - scaleTypePrecedence(st2));
function parseNonUnitScaleCore(model) {
  let scaleComponents = model.component.scales = {}, scaleTypeWithExplicitIndex = {}, resolve9 = model.component.resolve;
  for (let child of model.children) {
    parseScaleCore(child);
    for (let channel of keys3(child.component.scales))
      if (resolve9.scale[channel] ??= defaultScaleResolve(channel, model), resolve9.scale[channel] === "shared") {
        let explicitScaleType = scaleTypeWithExplicitIndex[channel], childScaleType = child.component.scales[channel].getWithExplicit("type");
        explicitScaleType ? scaleCompatible(explicitScaleType.value, childScaleType.value) ? scaleTypeWithExplicitIndex[channel] = mergeValuesWithExplicit(explicitScaleType, childScaleType, "type", "scale", scaleTypeTieBreaker) : (resolve9.scale[channel] = "independent", delete scaleTypeWithExplicitIndex[channel]) : scaleTypeWithExplicitIndex[channel] = childScaleType;
      }
  }
  for (let channel of keys3(scaleTypeWithExplicitIndex)) {
    let name2 = model.scaleName(channel, !0), typeWithExplicit = scaleTypeWithExplicitIndex[channel];
    scaleComponents[channel] = new ScaleComponent(name2, typeWithExplicit);
    for (let child of model.children) {
      let childScale = child.component.scales[channel];
      childScale && (child.renameScale(childScale.get("name"), name2), childScale.merged = !0);
    }
  }
  return scaleComponents;
}
var NameMap = class {
  nameMap;
  constructor() {
    this.nameMap = {};
  }
  rename(oldName, newName) {
    this.nameMap[oldName] = newName;
  }
  has(name2) {
    return this.nameMap[name2] !== void 0;
  }
  get(name2) {
    for (; this.nameMap[name2] && name2 !== this.nameMap[name2]; )
      name2 = this.nameMap[name2];
    return name2;
  }
};
function isUnitModel(model) {
  return model?.type === "unit";
}
function isFacetModel(model) {
  return model?.type === "facet";
}
function isConcatModel(model) {
  return model?.type === "concat";
}
function isLayerModel(model) {
  return model?.type === "layer";
}
var Model = class {
  type;
  parent;
  config;
  name;
  size;
  title;
  description;
  data;
  transforms;
  layout;
  /** Name map for scales, which can be renamed by a model's parent. */
  scaleNameMap;
  /** Name map for projections, which can be renamed by a model's parent. */
  projectionNameMap;
  /** Name map for signals, which can be renamed by a model's parent. */
  signalNameMap;
  component;
  view;
  constructor(spec, type3, parent, parentGivenName, config2, resolve9, view2) {
    this.type = type3, this.parent = parent, this.config = config2, this.parent = parent, this.config = config2, this.view = replaceExprRef(view2), this.name = spec.name ?? parentGivenName, this.title = isText(spec.title) ? { text: spec.title } : spec.title ? replaceExprRef(spec.title) : void 0, this.scaleNameMap = parent ? parent.scaleNameMap : new NameMap(), this.projectionNameMap = parent ? parent.projectionNameMap : new NameMap(), this.signalNameMap = parent ? parent.signalNameMap : new NameMap(), this.data = spec.data, this.description = spec.description, this.transforms = normalizeTransform(spec.transform ?? []), this.layout = type3 === "layer" || type3 === "unit" ? {} : extractCompositionLayout(spec, type3, config2), this.component = {
      data: {
        sources: parent ? parent.component.data.sources : [],
        outputNodes: parent ? parent.component.data.outputNodes : {},
        outputNodeRefCounts: parent ? parent.component.data.outputNodeRefCounts : {},
        // data is faceted if the spec is a facet spec or the parent has faceted data and data is undefined
        isFaceted: isFacetSpec(spec) || parent?.component.data.isFaceted && spec.data === void 0
      },
      layoutSize: new Split(),
      layoutHeaders: { row: {}, column: {}, facet: {} },
      mark: null,
      resolve: {
        scale: {},
        axis: {},
        legend: {},
        ...resolve9 ? duplicate(resolve9) : {}
      },
      selection: null,
      scales: null,
      projection: null,
      axes: {},
      legends: {}
    };
  }
  get width() {
    return this.getSizeSignalRef("width");
  }
  get height() {
    return this.getSizeSignalRef("height");
  }
  parse() {
    this.parseScale(), this.parseLayoutSize(), this.renameTopLevelLayoutSizeSignal(), this.parseSelections(), this.parseProjection(), this.parseData(), this.parseAxesAndHeaders(), this.parseLegends(), this.parseMarkGroup();
  }
  parseScale() {
    parseScales(this);
  }
  parseProjection() {
    parseProjection2(this);
  }
  /**
   * Rename top-level spec's size to be just width / height, ignoring model name.
   * This essentially merges the top-level spec's width/height signals with the width/height signals
   * to help us reduce redundant signals declaration.
   */
  renameTopLevelLayoutSizeSignal() {
    this.getName("width") !== "width" && this.renameSignal(this.getName("width"), "width"), this.getName("height") !== "height" && this.renameSignal(this.getName("height"), "height");
  }
  parseLegends() {
    parseLegend2(this);
  }
  assembleEncodeFromView(view2) {
    let { style: _, ...baseView } = view2, e = {};
    for (let property2 of keys3(baseView)) {
      let value3 = baseView[property2];
      value3 !== void 0 && (e[property2] = signalOrValueRef(value3));
    }
    return e;
  }
  assembleGroupEncodeEntry(isTopLevel) {
    let encodeEntry2 = {};
    return this.view && (encodeEntry2 = this.assembleEncodeFromView(this.view)), !isTopLevel && (this.description && (encodeEntry2.description = signalOrValueRef(this.description)), this.type === "unit" || this.type === "layer") ? {
      width: this.getSizeSignalRef("width"),
      height: this.getSizeSignalRef("height"),
      ...encodeEntry2
    } : isEmpty(encodeEntry2) ? void 0 : encodeEntry2;
  }
  assembleLayout() {
    if (!this.layout)
      return;
    let { spacing, ...layout } = this.layout, { component, config: config2 } = this, titleBand = assembleLayoutTitleBand(component.layoutHeaders, config2);
    return {
      padding: spacing,
      ...this.assembleDefaultLayout(),
      ...layout,
      ...titleBand ? { titleBand } : {}
    };
  }
  assembleDefaultLayout() {
    return {};
  }
  assembleHeaderMarks() {
    let { layoutHeaders: layoutHeaders2 } = this.component, headerMarks = [];
    for (let channel of FACET_CHANNELS)
      layoutHeaders2[channel].title && headerMarks.push(assembleTitleGroup(this, channel));
    for (let channel of HEADER_CHANNELS)
      headerMarks = headerMarks.concat(assembleHeaderGroups(this, channel));
    return headerMarks;
  }
  assembleAxes() {
    return assembleAxes(this.component.axes, this.config);
  }
  assembleLegends() {
    return assembleLegends(this);
  }
  assembleProjections() {
    return assembleProjections(this);
  }
  assembleTitle() {
    let { encoding, ...titleNoEncoding } = this.title ?? {}, title2 = {
      ...extractTitleConfig(this.config.title).nonMarkTitleProperties,
      ...titleNoEncoding,
      ...encoding ? { encode: { update: encoding } } : {}
    };
    if (title2.text)
      return contains2(["unit", "layer"], this.type) ? contains2(["middle", void 0], title2.anchor) && (title2.frame ??= "group") : title2.anchor ??= "start", isEmpty(title2) ? void 0 : title2;
  }
  /**
   * Assemble the mark group for this model. We accept optional `signals` so that we can include concat top-level signals with the top-level model's local signals.
   */
  assembleGroup(signals = []) {
    let group2 = {};
    signals = signals.concat(this.assembleSignals()), signals.length > 0 && (group2.signals = signals);
    let layout = this.assembleLayout();
    layout && (group2.layout = layout), group2.marks = [].concat(this.assembleHeaderMarks(), this.assembleMarks());
    let scales2 = !this.parent || isFacetModel(this.parent) ? assembleScales(this) : [];
    scales2.length > 0 && (group2.scales = scales2);
    let axes = this.assembleAxes();
    axes.length > 0 && (group2.axes = axes);
    let legends = this.assembleLegends();
    return legends.length > 0 && (group2.legends = legends), group2;
  }
  getName(text4) {
    return varName((this.name ? `${this.name}_` : "") + text4);
  }
  getDataName(type3) {
    return this.getName(DataSourceType[type3].toLowerCase());
  }
  /**
   * Request a data source name for the given data source type and mark that data source as required.
   * This method should be called in parse, so that all used data source can be correctly instantiated in assembleData().
   * You can lookup the correct dataset name in assemble with `lookupDataSource`.
   */
  requestDataName(name2) {
    let fullName = this.getDataName(name2), refCounts = this.component.data.outputNodeRefCounts;
    return refCounts[fullName] = (refCounts[fullName] || 0) + 1, fullName;
  }
  getSizeSignalRef(layoutSizeType) {
    if (isFacetModel(this.parent)) {
      let sizeType = getSizeTypeFromLayoutSizeType(layoutSizeType), channel = getPositionScaleChannel(sizeType), scaleComponent = this.component.scales[channel];
      if (scaleComponent && !scaleComponent.merged) {
        let type3 = scaleComponent.get("type"), range7 = scaleComponent.get("range");
        if (hasDiscreteDomain(type3) && isVgRangeStep(range7)) {
          let scaleName = scaleComponent.get("name"), domain4 = assembleDomain(this, channel), field3 = getFieldFromDomain(domain4);
          if (field3) {
            let fieldRef2 = vgField({ aggregate: "distinct", field: field3 }, { expr: "datum" });
            return {
              signal: sizeExpr(scaleName, scaleComponent, fieldRef2)
            };
          } else
            return warn2(unknownField(channel)), null;
        }
      }
    }
    return {
      signal: this.signalNameMap.get(this.getName(layoutSizeType))
    };
  }
  /**
   * Lookup the name of the datasource for an output node. You probably want to call this in assemble.
   */
  lookupDataSource(name2) {
    let node2 = this.component.data.outputNodes[name2];
    return node2 ? node2.getSource() : name2;
  }
  getSignalName(oldSignalName) {
    return this.signalNameMap.get(oldSignalName);
  }
  renameSignal(oldName, newName) {
    this.signalNameMap.rename(oldName, newName);
  }
  renameScale(oldName, newName) {
    this.scaleNameMap.rename(oldName, newName);
  }
  renameProjection(oldName, newName) {
    this.projectionNameMap.rename(oldName, newName);
  }
  /**
   * @return scale name for a given channel after the scale has been parsed and named.
   */
  scaleName(originalScaleName, parse9) {
    if (parse9)
      return this.getName(originalScaleName);
    if (
      // If there is a scale for the channel, there should be a local scale component for it
      isChannel(originalScaleName) && isScaleChannel(originalScaleName) && this.component.scales[originalScaleName] || // in the scale name map (the scale get merged by its parent)
      this.scaleNameMap.has(this.getName(originalScaleName))
    )
      return this.scaleNameMap.get(this.getName(originalScaleName));
  }
  /**
   * @return projection name after the projection has been parsed and named.
   */
  projectionName(parse9) {
    if (parse9)
      return this.getName("projection");
    if (this.component.projection && !this.component.projection.merged || this.projectionNameMap.has(this.getName("projection")))
      return this.projectionNameMap.get(this.getName("projection"));
  }
  /**
   * Traverse a model's hierarchy to get the scale component for a particular channel.
   */
  getScaleComponent(channel) {
    if (!this.component.scales)
      throw new Error("getScaleComponent cannot be called before parseScale(). Make sure you have called parseScale or use parseUnitModelWithScale().");
    let localScaleComponent = this.component.scales[channel];
    return localScaleComponent && !localScaleComponent.merged ? localScaleComponent : this.parent ? this.parent.getScaleComponent(channel) : void 0;
  }
  getScaleType(channel) {
    let scaleComponent = this.getScaleComponent(channel);
    return scaleComponent ? scaleComponent.get("type") : void 0;
  }
  /**
   * Traverse a model's hierarchy to get a particular selection component.
   */
  getSelectionComponent(variableName, origName) {
    let sel = this.component.selection[variableName];
    if (!sel && this.parent && (sel = this.parent.getSelectionComponent(variableName, origName)), !sel)
      throw new Error(selectionNotFound(origName));
    return sel;
  }
  /**
   * Returns true if the model has a signalRef for an axis orient.
   */
  hasAxisOrientSignalRef() {
    return this.component.axes.x?.some((a) => a.hasOrientSignalRef()) || this.component.axes.y?.some((a) => a.hasOrientSignalRef());
  }
}, ModelWithField = class extends Model {
  /** Get "field" reference for Vega */
  vgField(channel, opt = {}) {
    let fieldDef = this.fieldDef(channel);
    if (fieldDef)
      return vgField(fieldDef, opt);
  }
  reduceFieldDef(f, init2) {
    return reduce(this.getMapping(), (acc, cd2, c) => {
      let fieldDef = getFieldDef(cd2);
      return fieldDef ? f(acc, fieldDef, c) : acc;
    }, init2);
  }
  forEachFieldDef(f, t) {
    forEach(this.getMapping(), (cd2, c) => {
      let fieldDef = getFieldDef(cd2);
      fieldDef && f(fieldDef, c);
    }, t);
  }
}, DensityTransformNode = class _DensityTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _DensityTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this.transform = duplicate(transform5);
    let specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? "value", specifiedAs[1] ?? "density"];
    let resolve9 = this.transform.resolve ?? "shared";
    this.transform.resolve = resolve9;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.density, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `DensityTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { density, ...rest } = this.transform, result = {
      type: "kde",
      field: density,
      ...rest
    };
    return result.resolve = this.transform.resolve, result;
  }
}, ExtentTransformNode = class _ExtentTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _ExtentTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this.transform = duplicate(transform5);
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.extent]);
  }
  producedFields() {
    return /* @__PURE__ */ new Set([]);
  }
  hash() {
    return `ExtentTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { extent: extent2, param: param2 } = this.transform;
    return {
      type: "extent",
      field: extent2,
      signal: param2
    };
  }
}, FlattenTransformNode = class _FlattenTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _FlattenTransformNode(this.parent, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this.transform = duplicate(transform5);
    let { flatten: flatten2, as = [] } = this.transform;
    this.transform.as = flatten2.map((f, i) => as[i] ?? f);
  }
  dependentFields() {
    return new Set(this.transform.flatten);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `FlattenTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { flatten: fields, as } = this.transform;
    return {
      type: "flatten",
      fields,
      as
    };
  }
}, FoldTransformNode = class _FoldTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _FoldTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this.transform = duplicate(transform5);
    let specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? "key", specifiedAs[1] ?? "value"];
  }
  dependentFields() {
    return new Set(this.transform.fold);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `FoldTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { fold, as } = this.transform;
    return {
      type: "fold",
      fields: fold,
      as
    };
  }
}, GeoJSONNode = class _GeoJSONNode extends DataFlowNode {
  fields;
  geojson;
  signal;
  clone() {
    return new _GeoJSONNode(null, duplicate(this.fields), this.geojson, this.signal);
  }
  static parseAll(parent, model) {
    if (model.component.projection && !model.component.projection.isFit)
      return parent;
    let geoJsonCounter = 0;
    for (let coordinates of [
      [LONGITUDE, LATITUDE],
      [LONGITUDE2, LATITUDE2]
    ]) {
      let pair = coordinates.map((channel) => {
        let def2 = getFieldOrDatumDef(model.encoding[channel]);
        return isFieldDef(def2) ? def2.field : isDatumDef(def2) ? { expr: `${def2.datum}` } : isValueDef(def2) ? { expr: `${def2.value}` } : void 0;
      });
      (pair[0] || pair[1]) && (parent = new _GeoJSONNode(parent, pair, null, model.getName(`geojson_${geoJsonCounter++}`)));
    }
    if (model.channelHasField(SHAPE)) {
      let fieldDef = model.typedFieldDef(SHAPE);
      fieldDef.type === GEOJSON && (parent = new _GeoJSONNode(parent, null, fieldDef.field, model.getName(`geojson_${geoJsonCounter}`)));
    }
    return parent;
  }
  constructor(parent, fields, geojson, signal) {
    super(parent), this.fields = fields, this.geojson = geojson, this.signal = signal;
  }
  dependentFields() {
    let fields = (this.fields ?? []).filter(isString);
    return /* @__PURE__ */ new Set([...this.geojson ? [this.geojson] : [], ...fields]);
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    return `GeoJSON ${this.geojson} ${this.signal} ${hash5(this.fields)}`;
  }
  assemble() {
    return [
      ...this.geojson ? [
        {
          type: "filter",
          expr: `isValid(datum["${this.geojson}"])`
        }
      ] : [],
      {
        type: "geojson",
        ...this.fields ? { fields: this.fields } : {},
        ...this.geojson ? { geojson: this.geojson } : {},
        signal: this.signal
      }
    ];
  }
}, GeoPointNode = class _GeoPointNode extends DataFlowNode {
  projection;
  fields;
  as;
  clone() {
    return new _GeoPointNode(null, this.projection, duplicate(this.fields), duplicate(this.as));
  }
  constructor(parent, projection3, fields, as) {
    super(parent), this.projection = projection3, this.fields = fields, this.as = as;
  }
  static parseAll(parent, model) {
    if (!model.projectionName())
      return parent;
    for (let coordinates of [
      [LONGITUDE, LATITUDE],
      [LONGITUDE2, LATITUDE2]
    ]) {
      let pair = coordinates.map((channel) => {
        let def2 = getFieldOrDatumDef(model.encoding[channel]);
        return isFieldDef(def2) ? def2.field : isDatumDef(def2) ? { expr: `${def2.datum}` } : isValueDef(def2) ? { expr: `${def2.value}` } : void 0;
      }), suffix = coordinates[0] === LONGITUDE2 ? "2" : "";
      (pair[0] || pair[1]) && (parent = new _GeoPointNode(parent, model.projectionName(), pair, [
        model.getName(`x${suffix}`),
        model.getName(`y${suffix}`)
      ]));
    }
    return parent;
  }
  dependentFields() {
    return new Set(this.fields.filter(isString));
  }
  producedFields() {
    return new Set(this.as);
  }
  hash() {
    return `Geopoint ${this.projection} ${hash5(this.fields)} ${hash5(this.as)}`;
  }
  assemble() {
    return {
      type: "geopoint",
      projection: this.projection,
      fields: this.fields,
      as: this.as
    };
  }
}, ImputeNode = class _ImputeNode extends DataFlowNode {
  transform;
  clone() {
    return new _ImputeNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.impute, this.transform.key, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return /* @__PURE__ */ new Set([this.transform.impute]);
  }
  processSequence(keyvals) {
    let { start = 0, stop: stop2, step } = keyvals;
    return { signal: `sequence(${[start, stop2, ...step ? [step] : []].join(",")})` };
  }
  static makeFromTransform(parent, imputeTransform) {
    return new _ImputeNode(parent, imputeTransform);
  }
  static makeFromEncoding(parent, model) {
    let encoding = model.encoding, xDef = encoding.x, yDef = encoding.y;
    if (isFieldDef(xDef) && isFieldDef(yDef)) {
      let imputedChannel = xDef.impute ? xDef : yDef.impute ? yDef : void 0;
      if (imputedChannel === void 0)
        return;
      let keyChannel = xDef.impute ? yDef : yDef.impute ? xDef : void 0, { method: method2, value: value3, frame: frame2, keyvals } = imputedChannel.impute, groupbyFields = pathGroupingFields(model.mark, encoding);
      return new _ImputeNode(parent, {
        impute: imputedChannel.field,
        key: keyChannel.field,
        ...method2 ? { method: method2 } : {},
        ...value3 !== void 0 ? { value: value3 } : {},
        ...frame2 ? { frame: frame2 } : {},
        ...keyvals !== void 0 ? { keyvals } : {},
        ...groupbyFields.length ? { groupby: groupbyFields } : {}
      });
    }
    return null;
  }
  hash() {
    return `Impute ${hash5(this.transform)}`;
  }
  assemble() {
    let { impute, key: key2, keyvals, method: method2, groupby, value: value3, frame: frame2 = [null, null] } = this.transform, imputeTransform = {
      type: "impute",
      field: impute,
      key: key2,
      ...keyvals ? { keyvals: isImputeSequence(keyvals) ? this.processSequence(keyvals) : keyvals } : {},
      method: "value",
      ...groupby ? { groupby } : {},
      value: !method2 || method2 === "value" ? value3 : null
    };
    if (method2 && method2 !== "value") {
      let deriveNewField = {
        type: "window",
        as: [`imputed_${impute}_value`],
        ops: [method2],
        fields: [impute],
        frame: frame2,
        ignorePeers: !1,
        ...groupby ? { groupby } : {}
      }, replaceOriginal = {
        type: "formula",
        expr: `datum.${impute} === null ? datum.imputed_${impute}_value : datum.${impute}`,
        as: impute
      };
      return [imputeTransform, deriveNewField, replaceOriginal];
    } else
      return [imputeTransform];
  }
}, LoessTransformNode = class _LoessTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _LoessTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this.transform = duplicate(transform5);
    let specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? transform5.on, specifiedAs[1] ?? transform5.loess];
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.loess, this.transform.on, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `LoessTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { loess: loess2, on: on2, ...rest } = this.transform;
    return {
      type: "loess",
      x: on2,
      y: loess2,
      ...rest
    };
  }
}, LookupNode = class _LookupNode extends DataFlowNode {
  transform;
  secondary;
  clone() {
    return new _LookupNode(null, duplicate(this.transform), this.secondary);
  }
  constructor(parent, transform5, secondary) {
    super(parent), this.transform = transform5, this.secondary = secondary;
  }
  static make(parent, model, transform5, counter) {
    let sources = model.component.data.sources, { from } = transform5, fromOutputNode = null;
    if (isLookupData(from)) {
      let fromSource = findSource(from.data, sources);
      fromSource || (fromSource = new SourceNode(from.data), sources.push(fromSource));
      let fromOutputName = model.getName(`lookup_${counter}`);
      fromOutputNode = new OutputNode(fromSource, fromOutputName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts), model.component.data.outputNodes[fromOutputName] = fromOutputNode;
    } else if (isLookupSelection(from)) {
      let selName = from.param;
      transform5 = { as: selName, ...transform5 };
      let selCmpt;
      try {
        selCmpt = model.getSelectionComponent(varName(selName), selName);
      } catch {
        throw new Error(cannotLookupVariableParameter(selName));
      }
      if (fromOutputNode = selCmpt.materialized, !fromOutputNode)
        throw new Error(noSameUnitLookup(selName));
    }
    return new _LookupNode(parent, transform5, fromOutputNode.getSource());
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.lookup]);
  }
  producedFields() {
    return new Set(this.transform.as ? array_default(this.transform.as) : this.transform.from.fields);
  }
  hash() {
    return `Lookup ${hash5({ transform: this.transform, secondary: this.secondary })}`;
  }
  assemble() {
    let foreign;
    if (this.transform.from.fields)
      foreign = {
        values: this.transform.from.fields,
        ...this.transform.as ? { as: array_default(this.transform.as) } : {}
      };
    else {
      let asName = this.transform.as;
      isString(asName) || (warn2(NO_FIELDS_NEEDS_AS), asName = "_lookup"), foreign = {
        as: [asName]
      };
    }
    return {
      type: "lookup",
      from: this.secondary,
      key: this.transform.from.key,
      fields: [this.transform.lookup],
      ...foreign,
      ...this.transform.default ? { default: this.transform.default } : {}
    };
  }
}, QuantileTransformNode = class _QuantileTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _QuantileTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this.transform = duplicate(transform5);
    let specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? "prob", specifiedAs[1] ?? "value"];
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.quantile, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `QuantileTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { quantile: quantile3, ...rest } = this.transform;
    return {
      type: "quantile",
      field: quantile3,
      ...rest
    };
  }
}, RegressionTransformNode = class _RegressionTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _RegressionTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5, this.transform = duplicate(transform5);
    let specifiedAs = this.transform.as ?? [void 0, void 0];
    this.transform.as = [specifiedAs[0] ?? transform5.on, specifiedAs[1] ?? transform5.regression];
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.regression, this.transform.on, ...this.transform.groupby ?? []]);
  }
  producedFields() {
    return new Set(this.transform.as);
  }
  hash() {
    return `RegressionTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { regression, on: on2, ...rest } = this.transform;
    return {
      type: "regression",
      x: on2,
      y: regression,
      ...rest
    };
  }
}, PivotTransformNode = class _PivotTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _PivotTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5;
  }
  addDimensions(fields) {
    this.transform.groupby = unique((this.transform.groupby ?? []).concat(fields), (d) => d);
  }
  producedFields() {
  }
  dependentFields() {
    return /* @__PURE__ */ new Set([this.transform.pivot, this.transform.value, ...this.transform.groupby ?? []]);
  }
  hash() {
    return `PivotTransform ${hash5(this.transform)}`;
  }
  assemble() {
    let { pivot, value: value3, groupby, limit, op } = this.transform;
    return {
      type: "pivot",
      field: pivot,
      value: value3,
      ...limit !== void 0 ? { limit } : {},
      ...op !== void 0 ? { op } : {},
      ...groupby !== void 0 ? { groupby } : {}
    };
  }
}, SampleTransformNode = class _SampleTransformNode extends DataFlowNode {
  transform;
  clone() {
    return new _SampleTransformNode(null, duplicate(this.transform));
  }
  constructor(parent, transform5) {
    super(parent), this.transform = transform5;
  }
  dependentFields() {
    return /* @__PURE__ */ new Set();
  }
  producedFields() {
    return /* @__PURE__ */ new Set();
  }
  hash() {
    return `SampleTransform ${hash5(this.transform)}`;
  }
  assemble() {
    return {
      type: "sample",
      size: this.transform.sample
    };
  }
};
function makeWalkTree(data3) {
  let datasetIndex = 0;
  function walkTree(node2, dataSource) {
    if (node2 instanceof SourceNode && !node2.isGenerator && !isUrlData(node2.data) && (data3.push(dataSource), dataSource = {
      name: null,
      source: dataSource.name,
      transform: []
    }), node2 instanceof ParseNode && (node2.parent instanceof SourceNode && !dataSource.source ? (dataSource.format = {
      ...dataSource.format,
      parse: node2.assembleFormatParse()
    }, dataSource.transform.push(...node2.assembleTransforms(!0))) : dataSource.transform.push(...node2.assembleTransforms())), node2 instanceof FacetNode) {
      dataSource.name || (dataSource.name = `data_${datasetIndex++}`), !dataSource.source || dataSource.transform.length > 0 ? (data3.push(dataSource), node2.data = dataSource.name) : node2.data = dataSource.source, data3.push(...node2.assemble());
      return;
    }
    switch ((node2 instanceof GraticuleNode || node2 instanceof SequenceNode || node2 instanceof FilterInvalidNode || node2 instanceof FilterNode || node2 instanceof CalculateNode || node2 instanceof GeoPointNode || node2 instanceof AggregateNode || node2 instanceof LookupNode || node2 instanceof WindowTransformNode || node2 instanceof JoinAggregateTransformNode || node2 instanceof FoldTransformNode || node2 instanceof FlattenTransformNode || node2 instanceof DensityTransformNode || node2 instanceof LoessTransformNode || node2 instanceof QuantileTransformNode || node2 instanceof RegressionTransformNode || node2 instanceof IdentifierNode || node2 instanceof SampleTransformNode || node2 instanceof PivotTransformNode || node2 instanceof ExtentTransformNode) && dataSource.transform.push(node2.assemble()), (node2 instanceof BinNode || node2 instanceof TimeUnitNode || node2 instanceof ImputeNode || node2 instanceof StackNode || node2 instanceof GeoJSONNode) && dataSource.transform.push(...node2.assemble()), node2 instanceof OutputNode && (dataSource.source && dataSource.transform.length === 0 ? node2.setSource(dataSource.source) : node2.parent instanceof OutputNode ? node2.setSource(dataSource.name) : (dataSource.name || (dataSource.name = `data_${datasetIndex++}`), node2.setSource(dataSource.name), node2.numChildren() === 1 && (data3.push(dataSource), dataSource = {
      name: null,
      source: dataSource.name,
      transform: []
    }))), node2.numChildren()) {
      case 0:
        node2 instanceof OutputNode && (!dataSource.source || dataSource.transform.length > 0) && data3.push(dataSource);
        break;
      case 1:
        walkTree(node2.children[0], dataSource);
        break;
      default: {
        dataSource.name || (dataSource.name = `data_${datasetIndex++}`);
        let source4 = dataSource.name;
        !dataSource.source || dataSource.transform.length > 0 ? data3.push(dataSource) : source4 = dataSource.source;
        for (let child of node2.children)
          walkTree(child, {
            name: null,
            source: source4,
            transform: []
          });
        break;
      }
    }
  }
  return walkTree;
}
function assembleFacetData(root2) {
  let data3 = [], walkTree = makeWalkTree(data3);
  for (let child of root2.children)
    walkTree(child, {
      source: root2.name,
      name: null,
      transform: []
    });
  return data3;
}
function assembleRootData(dataComponent, datasets) {
  let data3 = [], walkTree = makeWalkTree(data3), sourceIndex = 0;
  for (let root2 of dataComponent.sources) {
    root2.hasName() || (root2.dataName = `source_${sourceIndex++}`);
    let newData = root2.assemble();
    walkTree(root2, newData);
  }
  for (let d of data3)
    d.transform.length === 0 && delete d.transform;
  let whereTo = 0;
  for (let [i, d] of data3.entries())
    (d.transform ?? []).length === 0 && !d.source && data3.splice(whereTo++, 0, data3.splice(i, 1)[0]);
  for (let d of data3)
    for (let t of d.transform ?? [])
      t.type === "lookup" && (t.from = dataComponent.outputNodes[t.from].getSource());
  for (let d of data3)
    d.name in datasets && (d.values = datasets[d.name]);
  return data3;
}
function getHeaderType(orient2) {
  return orient2 === "top" || orient2 === "left" || isSignalRef(orient2) ? "header" : "footer";
}
function parseFacetHeaders(model) {
  for (let channel of FACET_CHANNELS)
    parseFacetHeader(model, channel);
  mergeChildAxis(model, "x"), mergeChildAxis(model, "y");
}
function parseFacetHeader(model, channel) {
  let { facet, config: config2, child, component } = model;
  if (model.channelHasField(channel)) {
    let fieldDef = facet[channel], titleConfig = getHeaderProperty("title", null, config2, channel), title$1 = title(fieldDef, config2, {
      allowDisabling: !0,
      includeDefault: titleConfig === void 0 || !!titleConfig
    });
    child.component.layoutHeaders[channel].title && (title$1 = isArray(title$1) ? title$1.join(", ") : title$1, title$1 += ` / ${child.component.layoutHeaders[channel].title}`, child.component.layoutHeaders[channel].title = null);
    let labelOrient = getHeaderProperty("labelOrient", fieldDef.header, config2, channel), labels2 = fieldDef.header !== null ? getFirstDefined(fieldDef.header?.labels, config2.header.labels, !0) : !1, headerType = contains2(["bottom", "right"], labelOrient) ? "footer" : "header";
    component.layoutHeaders[channel] = {
      title: fieldDef.header !== null ? title$1 : null,
      facetFieldDef: fieldDef,
      [headerType]: channel === "facet" ? [] : [makeHeaderComponent(model, channel, labels2)]
    };
  }
}
function makeHeaderComponent(model, channel, labels2) {
  let sizeType = channel === "row" ? "height" : "width";
  return {
    labels: labels2,
    sizeSignal: model.child.component.layoutSize.get(sizeType) ? model.child.getSizeSignalRef(sizeType) : void 0,
    axes: []
  };
}
function mergeChildAxis(model, channel) {
  let { child } = model;
  if (child.component.axes[channel]) {
    let { layoutHeaders: layoutHeaders2, resolve: resolve9 } = model.component;
    if (resolve9.axis[channel] = parseGuideResolve(resolve9, channel), resolve9.axis[channel] === "shared") {
      let headerChannel = channel === "x" ? "column" : "row", layoutHeader = layoutHeaders2[headerChannel];
      for (let axisComponent of child.component.axes[channel]) {
        let headerType = getHeaderType(axisComponent.get("orient"));
        layoutHeader[headerType] ??= [makeHeaderComponent(model, headerChannel, !1)];
        let mainAxis = assembleAxis(axisComponent, "main", model.config, { header: !0 });
        mainAxis && layoutHeader[headerType][0].axes.push(mainAxis), axisComponent.mainExtracted = !0;
      }
    }
  }
}
function parseLayerLayoutSize(model) {
  parseChildrenLayoutSize(model), parseNonUnitLayoutSizeForChannel(model, "width"), parseNonUnitLayoutSizeForChannel(model, "height");
}
function parseConcatLayoutSize(model) {
  parseChildrenLayoutSize(model);
  let widthType = model.layout.columns === 1 ? "width" : "childWidth", heightType = model.layout.columns === void 0 ? "height" : "childHeight";
  parseNonUnitLayoutSizeForChannel(model, widthType), parseNonUnitLayoutSizeForChannel(model, heightType);
}
function parseChildrenLayoutSize(model) {
  for (let child of model.children)
    child.parseLayoutSize();
}
function parseNonUnitLayoutSizeForChannel(model, layoutSizeType) {
  let sizeType = getSizeTypeFromLayoutSizeType(layoutSizeType), channel = getPositionScaleChannel(sizeType), resolve9 = model.component.resolve, layoutSizeCmpt = model.component.layoutSize, mergedSize;
  for (let child of model.children) {
    let childSize = child.component.layoutSize.getWithExplicit(sizeType), scaleResolve = resolve9.scale[channel] ?? defaultScaleResolve(channel, model);
    if (scaleResolve === "independent" && childSize.value === "step") {
      mergedSize = void 0;
      break;
    }
    if (mergedSize) {
      if (scaleResolve === "independent" && mergedSize.value !== childSize.value) {
        mergedSize = void 0;
        break;
      }
      mergedSize = mergeValuesWithExplicit(mergedSize, childSize, sizeType, "");
    } else
      mergedSize = childSize;
  }
  if (mergedSize) {
    for (let child of model.children)
      model.renameSignal(child.getName(sizeType), model.getName(layoutSizeType)), child.component.layoutSize.set(sizeType, "merged", !1);
    layoutSizeCmpt.setWithExplicit(layoutSizeType, mergedSize);
  } else
    layoutSizeCmpt.setWithExplicit(layoutSizeType, {
      explicit: !1,
      value: void 0
    });
}
function parseUnitLayoutSize(model) {
  let { size, component } = model;
  for (let channel of POSITION_SCALE_CHANNELS) {
    let sizeType = getSizeChannel(channel);
    if (size[sizeType] != null && size[sizeType] != null) {
      let specifiedSize = size[sizeType];
      component.layoutSize.set(sizeType, isStep(specifiedSize) ? "step" : specifiedSize, !0);
    } else {
      let defaultSize = defaultUnitSize(model, sizeType);
      component.layoutSize.set(sizeType, defaultSize, !1);
    }
  }
}
function defaultUnitSize(model, sizeType) {
  let channel = sizeType === "width" ? "x" : "y", config2 = model.config, scaleComponent = model.getScaleComponent(channel);
  if (scaleComponent) {
    let scaleType2 = scaleComponent.get("type"), range7 = scaleComponent.get("range");
    if (hasDiscreteDomain(scaleType2)) {
      let size = getViewConfigDiscreteSize(config2.view, sizeType);
      return isVgRangeStep(range7) || isStep(size) ? "step" : size;
    } else
      return getViewConfigContinuousSize(config2.view, sizeType);
  } else {
    if (model.hasProjection || model.mark === "arc")
      return getViewConfigContinuousSize(config2.view, sizeType);
    {
      let size = getViewConfigDiscreteSize(config2.view, sizeType);
      return isStep(size) ? size.step : size;
    }
  }
}
function facetSortFieldName(fieldDef, sort3, opt) {
  return vgField(sort3, { suffix: `by_${vgField(fieldDef)}`, ...opt });
}
var FacetModel = class _FacetModel extends ModelWithField {
  facet;
  child;
  children;
  constructor(spec, parent, parentGivenName, config2) {
    super(spec, "facet", parent, parentGivenName, config2, spec.resolve), this.child = buildModel(spec.spec, this, this.getName("child"), void 0, config2), this.children = [this.child], this.facet = this.initFacet(spec.facet);
  }
  initFacet(facet) {
    if (!isFacetMapping(facet))
      return { facet: this.initFacetFieldDef(facet, "facet") };
    let channels = keys3(facet), normalizedFacet = {};
    for (let channel of channels) {
      if (![ROW, COLUMN].includes(channel)) {
        warn2(incompatibleChannel(channel, "facet"));
        break;
      }
      let fieldDef = facet[channel];
      if (fieldDef.field === void 0) {
        warn2(emptyFieldDef(fieldDef, channel));
        break;
      }
      normalizedFacet[channel] = this.initFacetFieldDef(fieldDef, channel);
    }
    return normalizedFacet;
  }
  initFacetFieldDef(fieldDef, channel) {
    let facetFieldDef = initFieldDef(fieldDef, channel);
    return facetFieldDef.header ? facetFieldDef.header = replaceExprRef(facetFieldDef.header) : facetFieldDef.header === null && (facetFieldDef.header = null), facetFieldDef;
  }
  channelHasField(channel) {
    return hasProperty(this.facet, channel);
  }
  fieldDef(channel) {
    return this.facet[channel];
  }
  parseData() {
    this.component.data = parseData2(this), this.child.parseData();
  }
  parseLayoutSize() {
    parseChildrenLayoutSize(this);
  }
  parseSelections() {
    this.child.parseSelections(), this.component.selection = this.child.component.selection, vals(this.component.selection).some((selCmpt) => isTimerSelection(selCmpt)) && error63(MULTI_VIEW_ANIMATION_UNSUPPORTED);
  }
  parseMarkGroup() {
    this.child.parseMarkGroup();
  }
  parseAxesAndHeaders() {
    this.child.parseAxesAndHeaders(), parseFacetHeaders(this);
  }
  assembleSelectionTopLevelSignals(signals) {
    return this.child.assembleSelectionTopLevelSignals(signals);
  }
  assembleSignals() {
    return this.child.assembleSignals(), [];
  }
  assembleSelectionData(data3) {
    return this.child.assembleSelectionData(data3);
  }
  getHeaderLayoutMixins() {
    let layoutMixins = {};
    for (let channel of FACET_CHANNELS)
      for (let headerType of HEADER_TYPES) {
        let layoutHeaderComponent = this.component.layoutHeaders[channel], headerComponent = layoutHeaderComponent[headerType], { facetFieldDef } = layoutHeaderComponent;
        if (facetFieldDef) {
          let titleOrient = getHeaderProperty("titleOrient", facetFieldDef.header, this.config, channel);
          if (["right", "bottom"].includes(titleOrient)) {
            let headerChannel = getHeaderChannel(channel, titleOrient);
            layoutMixins.titleAnchor ??= {}, layoutMixins.titleAnchor[headerChannel] = "end";
          }
        }
        if (headerComponent?.[0]) {
          let sizeType = channel === "row" ? "height" : "width", bandType = headerType === "header" ? "headerBand" : "footerBand";
          channel !== "facet" && !this.child.component.layoutSize.get(sizeType) && (layoutMixins[bandType] ??= {}, layoutMixins[bandType][channel] = 0.5), layoutHeaderComponent.title && (layoutMixins.offset ??= {}, layoutMixins.offset[channel === "row" ? "rowTitle" : "columnTitle"] = 10);
        }
      }
    return layoutMixins;
  }
  assembleDefaultLayout() {
    let { column, row } = this.facet, columns = column ? this.columnDistinctSignal() : row ? 1 : void 0, align2 = "all";
    return (!row && this.component.resolve.scale.x === "independent" || !column && this.component.resolve.scale.y === "independent") && (align2 = "none"), {
      ...this.getHeaderLayoutMixins(),
      ...columns ? { columns } : {},
      bounds: "full",
      align: align2
    };
  }
  assembleLayoutSignals() {
    return this.child.assembleLayoutSignals();
  }
  columnDistinctSignal() {
    if (!(this.parent && this.parent instanceof _FacetModel))
      return { signal: `length(data('${this.getName("column_domain")}'))` };
  }
  assembleGroupStyle() {
  }
  assembleGroup(signals) {
    return this.parent && this.parent instanceof _FacetModel ? {
      ...this.channelHasField("column") ? {
        encode: {
          update: {
            // TODO(https://github.com/vega/vega-lite/issues/2759):
            // Correct the signal for facet of concat of facet_column
            columns: { field: vgField(this.facet.column, { prefix: "distinct" }) }
          }
        }
      } : {},
      ...super.assembleGroup(signals)
    } : super.assembleGroup(signals);
  }
  /**
   * Aggregate cardinality for calculating size
   */
  getCardinalityAggregateForChild() {
    let fields = [], ops2 = [], as = [];
    if (this.child instanceof _FacetModel) {
      if (this.child.channelHasField("column")) {
        let field3 = vgField(this.child.facet.column);
        fields.push(field3), ops2.push("distinct"), as.push(`distinct_${field3}`);
      }
    } else
      for (let channel of POSITION_SCALE_CHANNELS) {
        let childScaleComponent = this.child.component.scales[channel];
        if (childScaleComponent && !childScaleComponent.merged) {
          let type3 = childScaleComponent.get("type"), range7 = childScaleComponent.get("range");
          if (hasDiscreteDomain(type3) && isVgRangeStep(range7)) {
            let domain4 = assembleDomain(this.child, channel), field3 = getFieldFromDomain(domain4);
            field3 ? (fields.push(field3), ops2.push("distinct"), as.push(`distinct_${field3}`)) : warn2(unknownField(channel));
          }
        }
      }
    return { fields, ops: ops2, as };
  }
  assembleFacet() {
    let { name: name2, data: data3 } = this.component.data.facetRoot, { row, column } = this.facet, { fields, ops: ops2, as } = this.getCardinalityAggregateForChild(), groupby = [];
    for (let channel of FACET_CHANNELS) {
      let fieldDef = this.facet[channel];
      if (fieldDef) {
        groupby.push(vgField(fieldDef));
        let { bin: bin3, sort: sort3 } = fieldDef;
        if (isBinning(bin3) && groupby.push(vgField(fieldDef, { binSuffix: "end" })), isSortField(sort3)) {
          let { field: field3, op = DEFAULT_SORT_OP } = sort3, outputName = facetSortFieldName(fieldDef, sort3);
          row && column ? (fields.push(outputName), ops2.push("max"), as.push(outputName)) : (fields.push(field3), ops2.push(op), as.push(outputName));
        } else if (isArray(sort3)) {
          let outputName = sortArrayIndexField(fieldDef, channel);
          fields.push(outputName), ops2.push("max"), as.push(outputName);
        }
      }
    }
    let cross2 = !!row && !!column;
    return {
      name: name2,
      data: data3,
      groupby,
      ...cross2 || fields.length > 0 ? {
        aggregate: {
          ...cross2 ? { cross: cross2 } : {},
          ...fields.length ? { fields, ops: ops2, as } : {}
        }
      } : {}
    };
  }
  facetSortFields(channel) {
    let { facet } = this, fieldDef = facet[channel];
    return fieldDef ? isSortField(fieldDef.sort) ? [facetSortFieldName(fieldDef, fieldDef.sort, { expr: "datum" })] : isArray(fieldDef.sort) ? [sortArrayIndexField(fieldDef, channel, { expr: "datum" })] : [vgField(fieldDef, { expr: "datum" })] : [];
  }
  facetSortOrder(channel) {
    let { facet } = this, fieldDef = facet[channel];
    if (fieldDef) {
      let { sort: sort3 } = fieldDef;
      return [(isSortField(sort3) ? sort3.order : !isArray(sort3) && sort3) || "ascending"];
    }
    return [];
  }
  assembleLabelTitle() {
    let { facet, config: config2 } = this;
    if (facet.facet)
      return assembleLabelTitle(facet.facet, "facet", config2);
    let ORTHOGONAL_ORIENT = {
      row: ["top", "bottom"],
      column: ["left", "right"]
    };
    for (let channel of HEADER_CHANNELS)
      if (facet[channel]) {
        let labelOrient = getHeaderProperty("labelOrient", facet[channel]?.header, config2, channel);
        if (ORTHOGONAL_ORIENT[channel].includes(labelOrient))
          return assembleLabelTitle(facet[channel], channel, config2);
      }
  }
  assembleMarks() {
    let { child } = this, facetRoot = this.component.data.facetRoot, data3 = assembleFacetData(facetRoot), encodeEntry2 = child.assembleGroupEncodeEntry(!1), title2 = this.assembleLabelTitle() || child.assembleTitle(), style2 = child.assembleGroupStyle();
    return [{
      name: this.getName("cell"),
      type: "group",
      ...title2 ? { title: title2 } : {},
      ...style2 ? { style: style2 } : {},
      from: {
        facet: this.assembleFacet()
      },
      // TODO: move this to after data
      sort: {
        field: FACET_CHANNELS.map((c) => this.facetSortFields(c)).flat(),
        order: FACET_CHANNELS.map((c) => this.facetSortOrder(c)).flat()
      },
      ...data3.length > 0 ? { data: data3 } : {},
      ...encodeEntry2 ? { encode: { update: encodeEntry2 } } : {},
      ...child.assembleGroup(assembleFacetSignals(this, []))
    }];
  }
  getMapping() {
    return this.facet;
  }
};
function makeJoinAggregateFromFacet(parent, facet) {
  let { row, column } = facet;
  if (row && column) {
    let newParent = null;
    for (let fieldDef of [row, column])
      if (isSortField(fieldDef.sort)) {
        let { field: field3, op = DEFAULT_SORT_OP } = fieldDef.sort;
        parent = newParent = new JoinAggregateTransformNode(parent, {
          joinaggregate: [
            {
              op,
              field: field3,
              as: facetSortFieldName(fieldDef, fieldDef.sort, { forAs: !0 })
            }
          ],
          groupby: [vgField(fieldDef)]
        });
      }
    return newParent;
  }
  return null;
}
function findSource(data3, sources) {
  for (let other of sources) {
    let otherData = other.data;
    if (data3.name && other.hasName() && data3.name !== other.dataName)
      continue;
    let formatMesh = data3.format?.mesh, otherFeature = otherData.format?.feature;
    if (formatMesh && otherFeature)
      continue;
    let formatFeature = data3.format?.feature;
    if ((formatFeature || otherFeature) && formatFeature !== otherFeature)
      continue;
    let otherMesh = otherData.format?.mesh;
    if (!((formatMesh || otherMesh) && formatMesh !== otherMesh)) {
      if (isInlineData(data3) && isInlineData(otherData)) {
        if (deepEqual(data3.values, otherData.values))
          return other;
      } else if (isUrlData(data3) && isUrlData(otherData)) {
        if (data3.url === otherData.url)
          return other;
      } else if (isNamedData(data3) && data3.name === other.dataName)
        return other;
    }
  }
  return null;
}
function parseRoot(model, sources) {
  if (model.data || !model.parent) {
    if (model.data === null) {
      let source4 = new SourceNode({ values: [] });
      return sources.push(source4), source4;
    }
    let existingSource = findSource(model.data, sources);
    if (existingSource)
      return isGenerator(model.data) || (existingSource.data.format = mergeDeep({}, model.data.format, existingSource.data.format)), !existingSource.hasName() && model.data.name && (existingSource.dataName = model.data.name), existingSource;
    {
      let source4 = new SourceNode(model.data);
      return sources.push(source4), source4;
    }
  } else
    return model.parent.component.data.facetRoot ? model.parent.component.data.facetRoot : model.parent.component.data.main;
}
function parseTransformArray(head, model, ancestorParse) {
  let lookupCounter = 0;
  for (let t of model.transforms) {
    let derivedType, transformNode;
    if (isCalculate(t))
      transformNode = head = new CalculateNode(head, t), derivedType = "derived";
    else if (isFilter(t)) {
      let implicit2 = getImplicitFromFilterTransform(t);
      transformNode = head = ParseNode.makeWithAncestors(head, {}, implicit2, ancestorParse) ?? head, head = new FilterNode(head, model, t.filter);
    } else if (isBin(t))
      transformNode = head = BinNode.makeFromTransform(head, t, model), derivedType = "number";
    else if (isTimeUnit(t))
      derivedType = "date", ancestorParse.getWithExplicit(t.field).value === void 0 && (head = new ParseNode(head, { [t.field]: derivedType }), ancestorParse.set(t.field, derivedType, !1)), transformNode = head = TimeUnitNode.makeFromTransform(head, t);
    else if (isAggregate(t))
      transformNode = head = AggregateNode.makeFromTransform(head, t), derivedType = "number", requiresSelectionId(model) && (head = new IdentifierNode(head));
    else if (isLookup(t))
      transformNode = head = LookupNode.make(head, model, t, lookupCounter++), derivedType = "derived";
    else if (isWindow(t))
      transformNode = head = new WindowTransformNode(head, t), derivedType = "number";
    else if (isJoinAggregate(t))
      transformNode = head = new JoinAggregateTransformNode(head, t), derivedType = "number";
    else if (isStack(t))
      transformNode = head = StackNode.makeFromTransform(head, t), derivedType = "derived";
    else if (isFold(t))
      transformNode = head = new FoldTransformNode(head, t), derivedType = "derived";
    else if (isExtent(t))
      transformNode = head = new ExtentTransformNode(head, t), derivedType = "derived";
    else if (isFlatten(t))
      transformNode = head = new FlattenTransformNode(head, t), derivedType = "derived";
    else if (isPivot(t))
      transformNode = head = new PivotTransformNode(head, t), derivedType = "derived";
    else if (isSample(t))
      head = new SampleTransformNode(head, t);
    else if (isImpute(t))
      transformNode = head = ImputeNode.makeFromTransform(head, t), derivedType = "derived";
    else if (isDensity(t))
      transformNode = head = new DensityTransformNode(head, t), derivedType = "derived";
    else if (isQuantile2(t))
      transformNode = head = new QuantileTransformNode(head, t), derivedType = "derived";
    else if (isRegression(t))
      transformNode = head = new RegressionTransformNode(head, t), derivedType = "derived";
    else if (isLoess(t))
      transformNode = head = new LoessTransformNode(head, t), derivedType = "derived";
    else {
      warn2(invalidTransformIgnored(t));
      continue;
    }
    if (transformNode && derivedType !== void 0)
      for (let field3 of transformNode.producedFields() ?? [])
        ancestorParse.set(field3, derivedType, !1);
  }
  return head;
}
function parseData2(model) {
  let head = parseRoot(model, model.component.data.sources), { outputNodes, outputNodeRefCounts } = model.component.data, data3 = model.data, ancestorParse = !(data3 && (isGenerator(data3) || isUrlData(data3) || isInlineData(data3))) && model.parent ? model.parent.component.data.ancestorParse.clone() : new AncestorParse();
  isGenerator(data3) ? (isSequenceGenerator(data3) ? head = new SequenceNode(head, data3.sequence) : isGraticuleGenerator(data3) && (head = new GraticuleNode(head, data3.graticule)), ancestorParse.parseNothing = !0) : data3?.format?.parse === null && (ancestorParse.parseNothing = !0), head = ParseNode.makeExplicit(head, model, ancestorParse) ?? head, head = new IdentifierNode(head);
  let parentIsLayer = model.parent && isLayerModel(model.parent);
  (isUnitModel(model) || isFacetModel(model)) && parentIsLayer && (head = BinNode.makeFromEncoding(head, model) ?? head), model.transforms.length > 0 && (head = parseTransformArray(head, model, ancestorParse));
  let implicitSelection = getImplicitFromSelection(model), implicitEncoding = getImplicitFromEncoding(model);
  head = ParseNode.makeWithAncestors(head, {}, { ...implicitSelection, ...implicitEncoding }, ancestorParse) ?? head, isUnitModel(model) && (head = GeoJSONNode.parseAll(head, model), head = GeoPointNode.parseAll(head, model)), (isUnitModel(model) || isFacetModel(model)) && (parentIsLayer || (head = BinNode.makeFromEncoding(head, model) ?? head), head = TimeUnitNode.makeFromEncoding(head, model) ?? head, head = CalculateNode.parseAllForSortIndex(head, model));
  let raw = head = makeOutputNode(DataSourceType.Raw, model, head);
  if (isUnitModel(model)) {
    let agg = AggregateNode.makeFromEncoding(head, model);
    agg && (head = agg, requiresSelectionId(model) && (head = new IdentifierNode(head))), head = ImputeNode.makeFromEncoding(head, model) ?? head, head = StackNode.makeFromEncoding(head, model) ?? head;
  }
  let preFilterInvalid, dataSourcesForHandlingInvalidValues;
  if (isUnitModel(model)) {
    let { markDef, mark, config: config2 } = model, invalid = getMarkPropOrConfig("invalid", markDef, config2), { marks, scales: scales2 } = dataSourcesForHandlingInvalidValues = getDataSourcesForHandlingInvalidValues({
      invalid,
      isPath: isPathMark(mark)
    });
    marks !== scales2 && scales2 === "include-invalid-values" && (preFilterInvalid = head = makeOutputNode(DataSourceType.PreFilterInvalid, model, head)), marks === "exclude-invalid-values" && (head = FilterInvalidNode.make(head, model, dataSourcesForHandlingInvalidValues) ?? head);
  }
  let main2 = head = makeOutputNode(DataSourceType.Main, model, head), postFilterInvalid;
  if (isUnitModel(model) && dataSourcesForHandlingInvalidValues) {
    let { marks, scales: scales2 } = dataSourcesForHandlingInvalidValues;
    marks === "include-invalid-values" && scales2 === "exclude-invalid-values" && (head = FilterInvalidNode.make(head, model, dataSourcesForHandlingInvalidValues) ?? head, postFilterInvalid = head = makeOutputNode(DataSourceType.PostFilterInvalid, model, head));
  }
  isUnitModel(model) && materializeSelections(model, main2);
  let facetRoot = null;
  if (isFacetModel(model)) {
    let facetName = model.getName("facet");
    head = makeJoinAggregateFromFacet(head, model.facet) ?? head, facetRoot = new FacetNode(head, model, facetName, main2.getSource()), outputNodes[facetName] = facetRoot;
  }
  return {
    ...model.component.data,
    outputNodes,
    outputNodeRefCounts,
    raw,
    main: main2,
    facetRoot,
    ancestorParse,
    preFilterInvalid,
    postFilterInvalid
  };
}
function makeOutputNode(dataSourceType, model, head) {
  let { outputNodes, outputNodeRefCounts } = model.component.data, name2 = model.getDataName(dataSourceType), node2 = new OutputNode(head, name2, dataSourceType, outputNodeRefCounts);
  return outputNodes[name2] = node2, node2;
}
var ConcatModel = class extends Model {
  children;
  constructor(spec, parent, parentGivenName, config2) {
    super(spec, "concat", parent, parentGivenName, config2, spec.resolve), (spec.resolve?.axis?.x === "shared" || spec.resolve?.axis?.y === "shared") && warn2(CONCAT_CANNOT_SHARE_AXIS), this.children = this.getChildren(spec).map((child, i) => buildModel(child, this, this.getName(`concat_${i}`), void 0, config2));
  }
  parseData() {
    this.component.data = parseData2(this);
    for (let child of this.children)
      child.parseData();
  }
  parseSelections() {
    this.component.selection = {};
    for (let child of this.children) {
      child.parseSelections();
      for (let key2 of keys3(child.component.selection))
        this.component.selection[key2] = child.component.selection[key2];
    }
    vals(this.component.selection).some((selCmpt) => isTimerSelection(selCmpt)) && error63(MULTI_VIEW_ANIMATION_UNSUPPORTED);
  }
  parseMarkGroup() {
    for (let child of this.children)
      child.parseMarkGroup();
  }
  parseAxesAndHeaders() {
    for (let child of this.children)
      child.parseAxesAndHeaders();
  }
  getChildren(spec) {
    return isVConcatSpec(spec) ? spec.vconcat : isHConcatSpec(spec) ? spec.hconcat : spec.concat;
  }
  parseLayoutSize() {
    parseConcatLayoutSize(this);
  }
  parseAxisGroup() {
    return null;
  }
  assembleSelectionTopLevelSignals(signals) {
    return this.children.reduce((sg, child) => child.assembleSelectionTopLevelSignals(sg), signals);
  }
  assembleSignals() {
    return this.children.forEach((child) => child.assembleSignals()), [];
  }
  assembleLayoutSignals() {
    let layoutSignals = assembleLayoutSignals(this);
    for (let child of this.children)
      layoutSignals.push(...child.assembleLayoutSignals());
    return layoutSignals;
  }
  assembleSelectionData(data3) {
    return this.children.reduce((db, child) => child.assembleSelectionData(db), data3);
  }
  assembleMarks() {
    return this.children.map((child) => {
      let title2 = child.assembleTitle(), style2 = child.assembleGroupStyle(), encodeEntry2 = child.assembleGroupEncodeEntry(!1);
      return {
        type: "group",
        name: child.getName("group"),
        ...title2 ? { title: title2 } : {},
        ...style2 ? { style: style2 } : {},
        ...encodeEntry2 ? { encode: { update: encodeEntry2 } } : {},
        ...child.assembleGroup()
      };
    });
  }
  assembleGroupStyle() {
  }
  assembleDefaultLayout() {
    let columns = this.layout.columns;
    return {
      ...columns != null ? { columns } : {},
      bounds: "full",
      // Use align each so it can work with multiple plots with different size
      align: "each"
    };
  }
};
function isFalseOrNull(v2) {
  return v2 === !1 || v2 === null;
}
var AXIS_COMPONENT_PROPERTIES_INDEX = {
  disable: 1,
  gridScale: 1,
  scale: 1,
  ...COMMON_AXIS_PROPERTIES_INDEX,
  labelExpr: 1,
  encode: 1
}, AXIS_COMPONENT_PROPERTIES = keys3(AXIS_COMPONENT_PROPERTIES_INDEX), AxisComponent = class _AxisComponent extends Split {
  explicit;
  implicit;
  mainExtracted;
  constructor(explicit = {}, implicit2 = {}, mainExtracted = !1) {
    super(), this.explicit = explicit, this.implicit = implicit2, this.mainExtracted = mainExtracted;
  }
  clone() {
    return new _AxisComponent(duplicate(this.explicit), duplicate(this.implicit), this.mainExtracted);
  }
  hasAxisPart(part) {
    return part === "axis" ? !0 : part === "grid" || part === "title" ? !!this.get(part) : !isFalseOrNull(this.get(part));
  }
  hasOrientSignalRef() {
    return isSignalRef(this.explicit.orient);
  }
};
function labels(model, channel, specifiedLabelsSpec) {
  let { encoding, config: config2 } = model, fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]) ?? getFieldOrDatumDef(encoding[getSecondaryRangeChannel(channel)]), axis = model.axis(channel) || {}, { format: format5, formatType } = axis;
  if (isCustomFormatType(formatType))
    return {
      text: formatCustomType({
        fieldOrDatumDef,
        field: "datum.value",
        format: format5,
        formatType,
        config: config2
      }),
      ...specifiedLabelsSpec
    };
  if (format5 === void 0 && formatType === void 0 && config2.customFormatTypes) {
    if (channelDefType(fieldOrDatumDef) === "quantitative") {
      if (isPositionFieldOrDatumDef(fieldOrDatumDef) && fieldOrDatumDef.stack === "normalize" && config2.normalizedNumberFormatType)
        return {
          text: formatCustomType({
            fieldOrDatumDef,
            field: "datum.value",
            format: config2.normalizedNumberFormat,
            formatType: config2.normalizedNumberFormatType,
            config: config2
          }),
          ...specifiedLabelsSpec
        };
      if (config2.numberFormatType)
        return {
          text: formatCustomType({
            fieldOrDatumDef,
            field: "datum.value",
            format: config2.numberFormat,
            formatType: config2.numberFormatType,
            config: config2
          }),
          ...specifiedLabelsSpec
        };
    }
    if (channelDefType(fieldOrDatumDef) === "temporal" && config2.timeFormatType && isFieldDef(fieldOrDatumDef) && !fieldOrDatumDef.timeUnit)
      return {
        text: formatCustomType({
          fieldOrDatumDef,
          field: "datum.value",
          format: config2.timeFormat,
          formatType: config2.timeFormatType,
          config: config2
        }),
        ...specifiedLabelsSpec
      };
  }
  return specifiedLabelsSpec;
}
function parseUnitAxes(model) {
  return POSITION_SCALE_CHANNELS.reduce((axis, channel) => (model.component.scales[channel] && (axis[channel] = [parseAxis2(channel, model)]), axis), {});
}
var OPPOSITE_ORIENT = {
  bottom: "top",
  top: "bottom",
  left: "right",
  right: "left"
};
function parseLayerAxes(model) {
  let { axes, resolve: resolve9 } = model.component, axisCount = { top: 0, bottom: 0, right: 0, left: 0 };
  for (let child of model.children) {
    child.parseAxesAndHeaders();
    for (let channel of keys3(child.component.axes))
      resolve9.axis[channel] = parseGuideResolve(model.component.resolve, channel), resolve9.axis[channel] === "shared" && (axes[channel] = mergeAxisComponents(axes[channel], child.component.axes[channel]), axes[channel] || (resolve9.axis[channel] = "independent", delete axes[channel]));
  }
  for (let channel of POSITION_SCALE_CHANNELS) {
    for (let child of model.children)
      if (child.component.axes[channel]) {
        if (resolve9.axis[channel] === "independent") {
          axes[channel] = (axes[channel] ?? []).concat(child.component.axes[channel]);
          for (let axisComponent of child.component.axes[channel]) {
            let { value: orient2, explicit } = axisComponent.getWithExplicit("orient");
            if (!isSignalRef(orient2)) {
              if (axisCount[orient2] > 0 && !explicit) {
                let oppositeOrient = OPPOSITE_ORIENT[orient2];
                axisCount[orient2] > axisCount[oppositeOrient] && axisComponent.set("orient", oppositeOrient, !1);
              }
              axisCount[orient2]++;
            }
          }
        }
        delete child.component.axes[channel];
      }
    if (resolve9.axis[channel] === "independent" && axes[channel] && axes[channel].length > 1)
      for (let [index4, axisCmpt] of (axes[channel] || []).entries())
        index4 > 0 && axisCmpt.get("grid") && !axisCmpt.explicit.grid && (axisCmpt.implicit.grid = !1);
  }
}
function mergeAxisComponents(mergedAxisCmpts, childAxisCmpts) {
  if (mergedAxisCmpts) {
    if (mergedAxisCmpts.length !== childAxisCmpts.length)
      return;
    let length3 = mergedAxisCmpts.length;
    for (let i = 0; i < length3; i++) {
      let merged = mergedAxisCmpts[i], child = childAxisCmpts[i];
      if (!!merged != !!child)
        return;
      if (merged && child) {
        let mergedOrient = merged.getWithExplicit("orient"), childOrient = child.getWithExplicit("orient");
        if (mergedOrient.explicit && childOrient.explicit && mergedOrient.value !== childOrient.value)
          return;
        mergedAxisCmpts[i] = mergeAxisComponent(merged, child);
      }
    }
  } else
    return childAxisCmpts.map((axisComponent) => axisComponent.clone());
  return mergedAxisCmpts;
}
function mergeAxisComponent(merged, child) {
  for (let prop of AXIS_COMPONENT_PROPERTIES) {
    let mergedValueWithExplicit = mergeValuesWithExplicit(
      merged.getWithExplicit(prop),
      child.getWithExplicit(prop),
      prop,
      "axis",
      // Tie breaker function
      (v1, v2) => {
        switch (prop) {
          case "title":
            return mergeTitleComponent(v1, v2);
          case "gridScale":
            return {
              explicit: v1.explicit,
              // keep the old explicit
              value: getFirstDefined(v1.value, v2.value)
            };
        }
        return defaultTieBreaker(v1, v2, prop, "axis");
      }
    );
    merged.setWithExplicit(prop, mergedValueWithExplicit);
  }
  return merged;
}
function isExplicit(value3, property2, axis, model, channel) {
  if (property2 === "disable")
    return axis !== void 0;
  switch (axis = axis || {}, property2) {
    case "titleAngle":
    case "labelAngle":
      return value3 === (isSignalRef(axis.labelAngle) ? axis.labelAngle : normalizeAngle(axis.labelAngle));
    case "values":
      return !!axis.values;
    // specified axis.values is already respected, but may get transformed.
    case "encode":
      return !!axis.encoding || !!axis.labelAngle;
    case "title":
      if (value3 === getFieldDefTitle(model, channel))
        return !0;
  }
  return value3 === axis[property2];
}
var propsToAlwaysIncludeConfig = /* @__PURE__ */ new Set([
  "grid",
  // Grid is an exception because we need to set grid = true to generate another grid axis
  "translate",
  // translate has dependent logic for bar's bin position and it's 0.5 by default in Vega. If a config overrides this value, we need to know.
  // the rest are not axis configs in Vega, but are in VL, so we need to set too.
  "format",
  "formatType",
  "orient",
  "labelExpr",
  "tickCount",
  "position",
  "tickMinStep"
]);
function parseAxis2(channel, model) {
  let axis = model.axis(channel), axisComponent = new AxisComponent(), fieldOrDatumDef = getFieldOrDatumDef(model.encoding[channel]), { mark, config: config2 } = model, orient2 = axis?.orient || config2[channel === "x" ? "axisX" : "axisY"]?.orient || config2.axis?.orient || defaultOrient(channel), scaleType2 = model.getScaleComponent(channel).get("type"), axisConfigs = getAxisConfigs(channel, scaleType2, orient2, model.config), disable = axis !== void 0 ? !axis : getAxisConfig("disable", config2.style, axis?.style, axisConfigs).configValue;
  if (axisComponent.set("disable", disable, axis !== void 0), disable)
    return axisComponent;
  axis = axis || {};
  let labelAngle = getLabelAngle(fieldOrDatumDef, axis, channel, config2.style, axisConfigs), formatType = guideFormatType(axis.formatType, fieldOrDatumDef, scaleType2), format5 = guideFormat(fieldOrDatumDef, fieldOrDatumDef.type, axis.format, axis.formatType, config2, !0), ruleParams = {
    fieldOrDatumDef,
    axis,
    channel,
    model,
    scaleType: scaleType2,
    orient: orient2,
    labelAngle,
    format: format5,
    formatType,
    mark,
    config: config2
  };
  for (let property2 of AXIS_COMPONENT_PROPERTIES) {
    let value3 = property2 in axisRules ? axisRules[property2](ruleParams) : isAxisProperty(property2) ? axis[property2] : void 0, hasValue = value3 !== void 0, explicit = isExplicit(value3, property2, axis, model, channel);
    if (hasValue && explicit)
      axisComponent.set(property2, value3, explicit);
    else {
      let { configValue = void 0, configFrom = void 0 } = isAxisProperty(property2) && property2 !== "values" ? getAxisConfig(property2, config2.style, axis.style, axisConfigs) : {}, hasConfigValue = configValue !== void 0;
      hasValue && !hasConfigValue ? axisComponent.set(property2, value3, explicit) : (
        // Cases need implicit values
        // 1. Axis config that aren't available in Vega
        (configFrom !== "vgAxisConfig" || // 2. Certain properties are always included (see `propsToAlwaysIncludeConfig`'s declaration for more details)
        propsToAlwaysIncludeConfig.has(property2) && hasConfigValue || // 3. Conditional axis values and signals
        isConditionalAxisValue(configValue) || isSignalRef(configValue)) && axisComponent.set(property2, configValue, !1)
      );
    }
  }
  let axisEncoding = axis.encoding ?? {}, axisEncode = AXIS_PARTS.reduce((e, part) => {
    if (!axisComponent.hasAxisPart(part))
      return e;
    let axisEncodingPart = guideEncodeEntry(axisEncoding[part] ?? {}, model), value3 = part === "labels" ? labels(model, channel, axisEncodingPart) : axisEncodingPart;
    return value3 !== void 0 && !isEmpty(value3) && (e[part] = { update: value3 }), e;
  }, {});
  return isEmpty(axisEncode) || axisComponent.set("encode", axisEncode, !!axis.encoding || axis.labelAngle !== void 0), axisComponent;
}
function initLayoutSize({ encoding, size }) {
  for (let channel of POSITION_SCALE_CHANNELS) {
    let sizeType = getSizeChannel(channel);
    isStep(size[sizeType]) && isContinuousFieldOrDatumDef(encoding[channel]) && (delete size[sizeType], warn2(stepDropped(sizeType)));
  }
  return size;
}
var arc3 = {
  vgMark: "arc",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      size: "ignore",
      orient: "ignore",
      theta: "ignore"
    }),
    ...pointPosition("x", model, { defaultPos: "mid" }),
    ...pointPosition("y", model, { defaultPos: "mid" }),
    // arcs are rectangles in polar coordinates
    ...rectPosition(model, "radius"),
    ...rectPosition(model, "theta")
  })
}, area3 = {
  vgMark: "area",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      orient: "include",
      size: "ignore",
      theta: "ignore"
    }),
    ...pointOrRangePosition("x", model, {
      defaultPos: "zeroOrMin",
      defaultPos2: "zeroOrMin",
      range: model.markDef.orient === "horizontal"
    }),
    ...pointOrRangePosition("y", model, {
      defaultPos: "zeroOrMin",
      defaultPos2: "zeroOrMin",
      range: model.markDef.orient === "vertical"
    }),
    ...defined(model)
  })
}, bar = {
  vgMark: "rect",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      orient: "ignore",
      size: "ignore",
      theta: "ignore"
    }),
    ...rectPosition(model, "x"),
    ...rectPosition(model, "y")
  })
}, geoshape = {
  vgMark: "shape",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      size: "ignore",
      orient: "ignore",
      theta: "ignore"
    })
  }),
  postEncodingTransform: (model) => {
    let { encoding } = model, shapeDef = encoding.shape;
    return [{
      type: "geoshape",
      projection: model.projectionName(),
      // as: 'shape',
      ...shapeDef && isFieldDef(shapeDef) && shapeDef.type === GEOJSON ? { field: vgField(shapeDef, { expr: "datum" }) } : {}
    }];
  }
}, image3 = {
  vgMark: "image",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "ignore",
      orient: "ignore",
      size: "ignore",
      theta: "ignore"
    }),
    ...rectPosition(model, "x"),
    ...rectPosition(model, "y"),
    ...text$1(model, "url")
  })
}, line3 = {
  vgMark: "line",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      size: "ignore",
      orient: "ignore",
      theta: "ignore"
    }),
    ...pointPosition("x", model, { defaultPos: "mid" }),
    ...pointPosition("y", model, { defaultPos: "mid" }),
    ...nonPosition("size", model, {
      vgChannel: "strokeWidth"
      // VL's line size is strokeWidth
    }),
    ...defined(model)
  })
}, trail2 = {
  vgMark: "trail",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      size: "include",
      orient: "ignore",
      theta: "ignore"
    }),
    ...pointPosition("x", model, { defaultPos: "mid" }),
    ...pointPosition("y", model, { defaultPos: "mid" }),
    ...nonPosition("size", model),
    ...defined(model)
  })
};
function encodeEntry(model, fixedShape) {
  let { config: config2 } = model;
  return {
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      size: "include",
      orient: "ignore",
      theta: "ignore"
    }),
    ...pointPosition("x", model, { defaultPos: "mid" }),
    ...pointPosition("y", model, { defaultPos: "mid" }),
    ...nonPosition("size", model),
    ...nonPosition("angle", model),
    ...shapeMixins(model, config2, fixedShape)
  };
}
function shapeMixins(model, config2, fixedShape) {
  return fixedShape ? { shape: { value: fixedShape } } : nonPosition("shape", model);
}
var point7 = {
  vgMark: "symbol",
  encodeEntry: (model) => encodeEntry(model)
}, circle = {
  vgMark: "symbol",
  encodeEntry: (model) => encodeEntry(model, "circle")
}, square = {
  vgMark: "symbol",
  encodeEntry: (model) => encodeEntry(model, "square")
}, rect2 = {
  vgMark: "rect",
  encodeEntry: (model) => ({
    ...baseEncodeEntry(model, {
      align: "ignore",
      baseline: "ignore",
      color: "include",
      orient: "ignore",
      size: "ignore",
      theta: "ignore"
    }),
    ...rectPosition(model, "x"),
    ...rectPosition(model, "y")
  })
}, rule3 = {
  vgMark: "rule",
  encodeEntry: (model) => {
    let { markDef } = model, orient2 = markDef.orient;
    return !model.encoding.x && !model.encoding.y && !model.encoding.latitude && !model.encoding.longitude ? {} : {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        orient: "ignore",
        size: "ignore",
        theta: "ignore"
      }),
      ...pointOrRangePosition("x", model, {
        defaultPos: orient2 === "horizontal" ? "zeroOrMax" : "mid",
        defaultPos2: "zeroOrMin",
        range: orient2 !== "vertical"
        // include x2 for horizontal or line segment rule
      }),
      ...pointOrRangePosition("y", model, {
        defaultPos: orient2 === "vertical" ? "zeroOrMax" : "mid",
        defaultPos2: "zeroOrMin",
        range: orient2 !== "horizontal"
        // include y2 for vertical or line segment rule
      }),
      ...nonPosition("size", model, {
        vgChannel: "strokeWidth"
        // VL's rule size is strokeWidth
      })
    };
  }
}, text3 = {
  vgMark: "text",
  encodeEntry: (model) => {
    let { config: config2, encoding } = model;
    return {
      ...baseEncodeEntry(model, {
        align: "include",
        baseline: "include",
        color: "include",
        size: "ignore",
        orient: "ignore",
        theta: "include"
      }),
      ...pointPosition("x", model, { defaultPos: "mid" }),
      ...pointPosition("y", model, { defaultPos: "mid" }),
      ...text$1(model),
      ...nonPosition("size", model, {
        vgChannel: "fontSize"
        // VL's text size is fontSize
      }),
      ...nonPosition("angle", model),
      ...valueIfDefined("align", align(model.markDef, encoding, config2)),
      ...valueIfDefined("baseline", baseline2(model.markDef, encoding, config2)),
      ...pointPosition("radius", model, { defaultPos: null }),
      ...pointPosition("theta", model, { defaultPos: null })
    };
  }
};
function align(markDef, encoding, config2) {
  if (getMarkPropOrConfig("align", markDef, config2) === void 0)
    return "center";
}
function baseline2(markDef, encoding, config2) {
  if (getMarkPropOrConfig("baseline", markDef, config2) === void 0)
    return "middle";
}
var tick = {
  vgMark: "rect",
  encodeEntry: (model) => {
    let { config: config2, markDef } = model, orient2 = markDef.orient, vgSizeAxisChannel = orient2 === "horizontal" ? "x" : "y", vgThicknessAxisChannel = orient2 === "horizontal" ? "y" : "x", vgThicknessChannel = orient2 === "horizontal" ? "height" : "width";
    return {
      ...baseEncodeEntry(model, {
        align: "ignore",
        baseline: "ignore",
        color: "include",
        orient: "ignore",
        size: "ignore",
        theta: "ignore"
      }),
      ...rectPosition(model, vgSizeAxisChannel),
      ...pointPosition(vgThicknessAxisChannel, model, {
        defaultPos: "mid",
        vgChannel: vgThicknessAxisChannel === "y" ? "yc" : "xc"
      }),
      [vgThicknessChannel]: signalOrValueRef(getMarkPropOrConfig("thickness", markDef, config2))
    };
  }
}, markCompiler = {
  arc: arc3,
  area: area3,
  bar,
  circle,
  geoshape,
  image: image3,
  line: line3,
  point: point7,
  rect: rect2,
  rule: rule3,
  square,
  text: text3,
  tick,
  trail: trail2
};
function parseMarkGroups(model) {
  if (contains2([LINE, AREA, TRAIL], model.mark)) {
    let details = pathGroupingFields(model.mark, model.encoding);
    if (details.length > 0)
      return getPathGroups(model, details);
  } else if (model.mark === BAR) {
    let hasCornerRadius2 = VG_CORNERRADIUS_CHANNELS.some((prop) => getMarkPropOrConfig(prop, model.markDef, model.config));
    if (model.stack && !model.fieldDef("size") && hasCornerRadius2)
      return getGroupsForStackedBarWithCornerRadius(model);
  }
  return getMarkGroup(model);
}
var FACETED_PATH_PREFIX = "faceted_path_";
function getPathGroups(model, details) {
  return [
    {
      name: model.getName("pathgroup"),
      type: "group",
      from: {
        facet: {
          name: FACETED_PATH_PREFIX + model.requestDataName(DataSourceType.Main),
          data: model.requestDataName(DataSourceType.Main),
          groupby: details
        }
      },
      encode: {
        update: {
          width: { field: { group: "width" } },
          height: { field: { group: "height" } }
        }
      },
      // With subfacet for line/area group, need to use faceted data from above.
      marks: getMarkGroup(model, { fromPrefix: FACETED_PATH_PREFIX })
    }
  ];
}
var STACK_GROUP_PREFIX = "stack_group_";
function getGroupsForStackedBarWithCornerRadius(model) {
  let [mark] = getMarkGroup(model, { fromPrefix: STACK_GROUP_PREFIX }), fieldScale = model.scaleName(model.stack.fieldChannel), stackField = (opt = {}) => model.vgField(model.stack.fieldChannel, opt), stackFieldGroup = (func, expr2) => {
    let vgFieldMinMax = [
      stackField({ prefix: "min", suffix: "start", expr: expr2 }),
      stackField({ prefix: "max", suffix: "start", expr: expr2 }),
      stackField({ prefix: "min", suffix: "end", expr: expr2 }),
      stackField({ prefix: "max", suffix: "end", expr: expr2 })
    ];
    return `${func}(${vgFieldMinMax.map((field3) => `scale('${fieldScale}',${field3})`).join(",")})`;
  }, groupUpdate, innerGroupUpdate;
  model.stack.fieldChannel === "x" ? (groupUpdate = {
    ...pick4(mark.encode.update, ["y", "yc", "y2", "height", ...VG_CORNERRADIUS_CHANNELS]),
    x: { signal: stackFieldGroup("min", "datum") },
    x2: { signal: stackFieldGroup("max", "datum") },
    clip: { value: !0 }
  }, innerGroupUpdate = {
    x: { field: { group: "x" }, mult: -1 },
    height: { field: { group: "height" } }
  }, mark.encode.update = {
    ...omit2(mark.encode.update, ["y", "yc", "y2"]),
    height: { field: { group: "height" } }
  }) : (groupUpdate = {
    ...pick4(mark.encode.update, ["x", "xc", "x2", "width"]),
    y: { signal: stackFieldGroup("min", "datum") },
    y2: { signal: stackFieldGroup("max", "datum") },
    clip: { value: !0 }
  }, innerGroupUpdate = {
    y: { field: { group: "y" }, mult: -1 },
    width: { field: { group: "width" } }
  }, mark.encode.update = {
    ...omit2(mark.encode.update, ["x", "xc", "x2"]),
    width: { field: { group: "width" } }
  });
  for (let key2 of VG_CORNERRADIUS_CHANNELS) {
    let configValue = getMarkConfig(key2, model.markDef, model.config);
    mark.encode.update[key2] ? (groupUpdate[key2] = mark.encode.update[key2], delete mark.encode.update[key2]) : configValue && (groupUpdate[key2] = signalOrValueRef(configValue)), configValue && (mark.encode.update[key2] = { value: 0 });
  }
  let groupby = [];
  if (model.stack.groupbyChannels?.length > 0)
    for (let groupbyChannel of model.stack.groupbyChannels) {
      let groupByField = model.fieldDef(groupbyChannel), field3 = vgField(groupByField);
      field3 && groupby.push(field3), (groupByField?.bin || groupByField?.timeUnit) && groupby.push(vgField(groupByField, { binSuffix: "end" }));
    }
  return groupUpdate = [
    "stroke",
    "strokeWidth",
    "strokeJoin",
    "strokeCap",
    "strokeDash",
    "strokeDashOffset",
    "strokeMiterLimit",
    "strokeOpacity"
  ].reduce((encode4, prop) => {
    if (mark.encode.update[prop])
      return { ...encode4, [prop]: mark.encode.update[prop] };
    {
      let configValue = getMarkConfig(prop, model.markDef, model.config);
      return configValue !== void 0 ? { ...encode4, [prop]: signalOrValueRef(configValue) } : encode4;
    }
  }, groupUpdate), groupUpdate.stroke && (groupUpdate.strokeForeground = { value: !0 }, groupUpdate.strokeOffset = { value: 0 }), [
    {
      type: "group",
      from: {
        facet: {
          data: model.requestDataName(DataSourceType.Main),
          name: STACK_GROUP_PREFIX + model.requestDataName(DataSourceType.Main),
          groupby,
          aggregate: {
            fields: [
              stackField({ suffix: "start" }),
              stackField({ suffix: "start" }),
              stackField({ suffix: "end" }),
              stackField({ suffix: "end" })
            ],
            ops: ["min", "max", "min", "max"]
          }
        }
      },
      encode: {
        update: groupUpdate
      },
      marks: [
        {
          type: "group",
          encode: { update: innerGroupUpdate },
          marks: [mark]
        }
      ]
    }
  ];
}
function getSort(model) {
  let { encoding, stack: stack2, mark, markDef, config: config2 } = model, order = encoding.order;
  if (!(!isArray(order) && isValueDef(order) && isNullOrFalse(order.value) || !order && isNullOrFalse(getMarkPropOrConfig("order", markDef, config2)))) {
    if ((isArray(order) || isFieldDef(order)) && !stack2)
      return sortParams(order, { expr: "datum" });
    if (isPathMark(mark)) {
      let dimensionChannel = markDef.orient === "horizontal" ? "y" : "x", dimensionChannelDef = encoding[dimensionChannel];
      if (isFieldDef(dimensionChannelDef))
        return { field: dimensionChannel };
    }
  }
}
function getMarkGroup(model, opt = { fromPrefix: "" }) {
  let { mark, markDef, encoding, config: config2 } = model, clip4 = getFirstDefined(markDef.clip, scaleClip(model), projectionClip(model)), style2 = getStyles(markDef), key2 = encoding.key, sort3 = getSort(model), interactive2 = interactiveFlag(model);
  interactive2 && Object.values(model.component.selection).some((s) => s.type === "point" && !s.bind && // if on is a pointerover (hover) the pointer makes less sense since the mark is not clickable.
  s.on !== "pointerover") && (model.markDef.cursor ??= "pointer");
  let aria2 = getMarkPropOrConfig("aria", markDef, config2), postEncodingTransform = markCompiler[mark].postEncodingTransform ? markCompiler[mark].postEncodingTransform(model) : null;
  return [
    {
      name: model.getName("marks"),
      type: markCompiler[mark].vgMark,
      ...clip4 ? { clip: clip4 } : {},
      ...style2 ? { style: style2 } : {},
      ...key2 ? { key: key2.field } : {},
      ...sort3 ? { sort: sort3 } : {},
      ...interactive2 || {},
      ...aria2 === !1 ? { aria: aria2 } : {},
      from: { data: opt.fromPrefix + model.requestDataName(DataSourceType.Main) },
      encode: {
        update: markCompiler[mark].encodeEntry(model)
      },
      ...postEncodingTransform ? {
        transform: postEncodingTransform
      } : {}
    }
  ];
}
function scaleClip(model) {
  let xScale = model.getScaleComponent("x"), yScale = model.getScaleComponent("y");
  return xScale?.get("selectionExtent") || yScale?.get("selectionExtent") ? !0 : void 0;
}
function projectionClip(model) {
  let projection3 = model.component.projection;
  return projection3 && !projection3.isFit ? !0 : void 0;
}
function interactiveFlag(model) {
  if (!model.component.selection)
    return null;
  let unitCount = keys3(model.component.selection).length, parentCount = unitCount, parent = model.parent;
  for (; parent && parentCount === 0; )
    parentCount = keys3(parent.component.selection).length, parent = parent.parent;
  return parentCount ? {
    interactive: unitCount > 0 || model.mark === "geoshape" || !!model.encoding.tooltip || !!model.markDef.tooltip
  } : null;
}
var UnitModel = class extends ModelWithField {
  markDef;
  encoding;
  specifiedScales = {};
  stack;
  specifiedAxes = {};
  specifiedLegends = {};
  specifiedProjection = {};
  selection = [];
  children = [];
  constructor(spec, parent, parentGivenName, parentGivenSize = {}, config2) {
    super(spec, "unit", parent, parentGivenName, config2, void 0, isFrameMixins(spec) ? spec.view : void 0);
    let markDef = isMarkDef(spec.mark) ? { ...spec.mark } : { type: spec.mark }, mark = markDef.type;
    markDef.filled === void 0 && (markDef.filled = defaultFilled(markDef, config2, {
      graticule: spec.data && isGraticuleGenerator(spec.data)
    }));
    let encoding = this.encoding = initEncoding(spec.encoding || {}, mark, markDef.filled, config2);
    this.markDef = initMarkdef(markDef, encoding, config2), this.size = initLayoutSize({
      encoding,
      size: isFrameMixins(spec) ? {
        ...parentGivenSize,
        ...spec.width !== void 0 ? { width: spec.width } : {},
        ...spec.height !== void 0 ? { height: spec.height } : {}
      } : parentGivenSize
    }), this.stack = stack(this.markDef, encoding), this.specifiedScales = this.initScales(mark, encoding), this.specifiedAxes = this.initAxes(encoding), this.specifiedLegends = this.initLegends(encoding), this.specifiedProjection = spec.projection, this.selection = (spec.params ?? []).filter((p) => isSelectionParameter(p)), this.alignStackOrderWithColorDomain();
  }
  get hasProjection() {
    let { encoding } = this, isGeoShapeMark = this.mark === GEOSHAPE, hasGeoPosition = encoding && GEOPOSITION_CHANNELS.some((channel) => isFieldOrDatumDef(encoding[channel]));
    return isGeoShapeMark || hasGeoPosition;
  }
  /**
   * Return specified Vega-Lite scale domain for a particular channel
   * @param channel
   */
  scaleDomain(channel) {
    let scale7 = this.specifiedScales[channel];
    return scale7 ? scale7.domain : void 0;
  }
  axis(channel) {
    return this.specifiedAxes[channel];
  }
  legend(channel) {
    return this.specifiedLegends[channel];
  }
  initScales(mark, encoding) {
    return SCALE_CHANNELS.reduce((scales2, channel) => {
      let fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
      return fieldOrDatumDef && (scales2[channel] = this.initScale(fieldOrDatumDef.scale ?? {})), scales2;
    }, {});
  }
  initScale(scale7) {
    let { domain: domain4, range: range7 } = scale7, scaleInternal = replaceExprRef(scale7);
    return isArray(domain4) && (scaleInternal.domain = domain4.map(signalRefOrValue)), isArray(range7) && (scaleInternal.range = range7.map(signalRefOrValue)), scaleInternal;
  }
  initAxes(encoding) {
    return POSITION_SCALE_CHANNELS.reduce((_axis, channel) => {
      let channelDef = encoding[channel];
      if (isFieldOrDatumDef(channelDef) || channel === X3 && isFieldOrDatumDef(encoding.x2) || channel === Y3 && isFieldOrDatumDef(encoding.y2)) {
        let axisSpec = isFieldOrDatumDef(channelDef) ? channelDef.axis : void 0;
        _axis[channel] = axisSpec && this.initAxis({ ...axisSpec });
      }
      return _axis;
    }, {});
  }
  initAxis(axis) {
    let props = keys3(axis), axisInternal = {};
    for (let prop of props) {
      let val = axis[prop];
      axisInternal[prop] = isConditionalAxisValue(val) ? signalOrValueRefWithCondition(val) : signalRefOrValue(val);
    }
    return axisInternal;
  }
  initLegends(encoding) {
    return NONPOSITION_SCALE_CHANNELS.reduce((_legend, channel) => {
      let fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
      if (fieldOrDatumDef && supportLegend(channel)) {
        let legend = fieldOrDatumDef.legend;
        _legend[channel] = legend && replaceExprRef(legend);
      }
      return _legend;
    }, {});
  }
  /**
   * If this unit lacks order encoding but does contain a color domain
   * add transform and encoding that aligns the stack order with the color domain.
   */
  alignStackOrderWithColorDomain() {
    let { color: color5, fill: fill2, order, xOffset, yOffset } = this.encoding, colorField = fill2 || color5, colorEncoding = isFieldDef(colorField) ? colorField : void 0, field3 = colorEncoding?.field, scale7 = colorEncoding?.scale, colorEncodingType = colorEncoding?.type, domain4 = scale7?.domain, offset4 = xOffset || yOffset, offsetEncoding = isFieldDef(offset4) ? offset4 : void 0, orderFieldName = `_${field3}_sort_index`;
    if (!order && Array.isArray(domain4) && typeof field3 == "string" && colorEncodingType === "nominal")
      if (offsetEncoding && !offsetEncoding.sort)
        offsetEncoding.sort = domain4;
      else {
        if (!this.stack)
          return;
        let orderExpression = `indexof(${stringValue(domain4)}, datum['${field3}'])`, sort3 = this.markDef?.orient === "horizontal" ? "ascending" : "descending";
        this.transforms.push({ calculate: orderExpression, as: orderFieldName }), this.encoding.order = { field: orderFieldName, type: "quantitative", sort: sort3 };
      }
  }
  parseData() {
    this.component.data = parseData2(this);
  }
  parseLayoutSize() {
    parseUnitLayoutSize(this);
  }
  parseSelections() {
    this.component.selection = parseUnitSelection(this, this.selection);
  }
  parseMarkGroup() {
    this.component.mark = parseMarkGroups(this);
  }
  parseAxesAndHeaders() {
    this.component.axes = parseUnitAxes(this);
  }
  assembleSelectionTopLevelSignals(signals) {
    return assembleTopLevelSignals(this, signals);
  }
  assembleSignals() {
    return [...assembleAxisSignals(this), ...assembleUnitSelectionSignals(this, [])];
  }
  assembleSelectionData(data3) {
    return assembleUnitSelectionData(this, data3);
  }
  assembleLayout() {
    return null;
  }
  assembleLayoutSignals() {
    return assembleLayoutSignals(this);
  }
  /**
   * Corrects the data references in marks after assemble.
   */
  correctDataNames = (mark) => (mark.from?.data && (mark.from.data = this.lookupDataSource(mark.from.data), "time" in this.encoding && (mark.from.data = mark.from.data + CURR)), mark.from?.facet?.data && (mark.from.facet.data = this.lookupDataSource(mark.from.facet.data)), mark);
  assembleMarks() {
    let marks = this.component.mark ?? [];
    return (!this.parent || !isLayerModel(this.parent)) && (marks = assembleUnitSelectionMarks(this, marks)), marks.map(this.correctDataNames);
  }
  assembleGroupStyle() {
    let { style: style2 } = this.view || {};
    return style2 !== void 0 ? style2 : this.encoding.x || this.encoding.y ? "cell" : "view";
  }
  getMapping() {
    return this.encoding;
  }
  get mark() {
    return this.markDef.type;
  }
  channelHasField(channel) {
    return channelHasField(this.encoding, channel);
  }
  fieldDef(channel) {
    let channelDef = this.encoding[channel];
    return getFieldDef(channelDef);
  }
  typedFieldDef(channel) {
    let fieldDef = this.fieldDef(channel);
    return isTypedFieldDef(fieldDef) ? fieldDef : null;
  }
}, LayerModel = class _LayerModel extends Model {
  // HACK: This should be (LayerModel | UnitModel)[], but setting the correct type leads to weird error.
  // So I'm just putting generic Model for now
  children;
  constructor(spec, parent, parentGivenName, parentGivenSize, config2) {
    super(spec, "layer", parent, parentGivenName, config2, spec.resolve, spec.view);
    let layoutSize = {
      ...parentGivenSize,
      ...spec.width ? { width: spec.width } : {},
      ...spec.height ? { height: spec.height } : {}
    };
    this.children = spec.layer.map((layer, i) => {
      if (isLayerSpec(layer))
        return new _LayerModel(layer, this, this.getName(`layer_${i}`), layoutSize, config2);
      if (isUnitSpec(layer))
        return new UnitModel(layer, this, this.getName(`layer_${i}`), layoutSize, config2);
      throw new Error(invalidSpec(layer));
    });
  }
  parseData() {
    this.component.data = parseData2(this);
    for (let child of this.children)
      child.parseData();
  }
  parseLayoutSize() {
    parseLayerLayoutSize(this);
  }
  parseSelections() {
    this.component.selection = {};
    for (let child of this.children) {
      child.parseSelections();
      for (let key2 of keys3(child.component.selection))
        this.component.selection[key2] = child.component.selection[key2];
    }
    vals(this.component.selection).some((selCmpt) => isTimerSelection(selCmpt)) && error63(MULTI_VIEW_ANIMATION_UNSUPPORTED);
  }
  parseMarkGroup() {
    for (let child of this.children)
      child.parseMarkGroup();
  }
  parseAxesAndHeaders() {
    parseLayerAxes(this);
  }
  assembleSelectionTopLevelSignals(signals) {
    return this.children.reduce((sg, child) => child.assembleSelectionTopLevelSignals(sg), signals);
  }
  // TODO: Support same named selections across children.
  assembleSignals() {
    return this.children.reduce((signals, child) => signals.concat(child.assembleSignals()), assembleAxisSignals(this));
  }
  assembleLayoutSignals() {
    return this.children.reduce((signals, child) => signals.concat(child.assembleLayoutSignals()), assembleLayoutSignals(this));
  }
  assembleSelectionData(data3) {
    return this.children.reduce((db, child) => child.assembleSelectionData(db), data3);
  }
  assembleGroupStyle() {
    let uniqueStyles = /* @__PURE__ */ new Set();
    for (let child of this.children)
      for (let style2 of array_default(child.assembleGroupStyle()))
        uniqueStyles.add(style2);
    let styles = Array.from(uniqueStyles);
    return styles.length > 1 ? styles : styles.length === 1 ? styles[0] : void 0;
  }
  assembleTitle() {
    let title2 = super.assembleTitle();
    if (title2)
      return title2;
    for (let child of this.children)
      if (title2 = child.assembleTitle(), title2)
        return title2;
  }
  assembleLayout() {
    return null;
  }
  assembleMarks() {
    return assembleLayerSelectionMarks(this, this.children.flatMap((child) => child.assembleMarks()));
  }
  assembleLegends() {
    return this.children.reduce((legends, child) => legends.concat(child.assembleLegends()), assembleLegends(this));
  }
};
function buildModel(spec, parent, parentGivenName, unitSize, config2) {
  if (isFacetSpec(spec))
    return new FacetModel(spec, parent, parentGivenName, config2);
  if (isLayerSpec(spec))
    return new LayerModel(spec, parent, parentGivenName, unitSize, config2);
  if (isUnitSpec(spec))
    return new UnitModel(spec, parent, parentGivenName, unitSize, config2);
  if (isAnyConcatSpec(spec))
    return new ConcatModel(spec, parent, parentGivenName, config2);
  throw new Error(invalidSpec(spec));
}
function compile2(inputSpec, opt = {}) {
  opt.logger && set7(opt.logger), opt.fieldTitle && setTitleFormatter(opt.fieldTitle);
  try {
    let config2 = initConfig(mergeConfig(opt.config, inputSpec.config)), spec = normalize4(inputSpec, config2), model = buildModel(spec, null, "", void 0, config2);
    return model.parse(), optimizeDataflow(model.component.data, model), {
      spec: assembleTopLevelModel(model, getTopLevelProperties(inputSpec, spec.autosize, config2, model), inputSpec.datasets, inputSpec.usermeta),
      normalized: spec
    };
  } finally {
    opt.logger && reset2(), opt.fieldTitle && resetTitleFormatter();
  }
}
function getTopLevelProperties(inputSpec, autosize, config2, model) {
  let width2 = model.component.layoutSize.get("width"), height2 = model.component.layoutSize.get("height");
  if (autosize === void 0 ? (autosize = { type: "pad" }, model.hasAxisOrientSignalRef() && (autosize.resize = !0)) : isString(autosize) && (autosize = { type: autosize }), width2 && height2 && isFitType(autosize.type)) {
    if (width2 === "step" && height2 === "step")
      warn2(droppingFit()), autosize.type = "pad";
    else if (width2 === "step" || height2 === "step") {
      let sizeType = width2 === "step" ? "width" : "height";
      warn2(droppingFit(getPositionScaleChannel(sizeType)));
      let inverseSizeType = sizeType === "width" ? "height" : "width";
      autosize.type = getFitType(inverseSizeType);
    }
  }
  return {
    ...keys3(autosize).length === 1 && autosize.type ? autosize.type === "pad" ? {} : { autosize: autosize.type } : { autosize },
    ...extractTopLevelProperties(config2, !1),
    ...extractTopLevelProperties(inputSpec, !0)
  };
}
function assembleTopLevelModel(model, topLevelProperties, datasets = {}, usermeta) {
  let vgConfig = model.config ? stripAndRedirectConfig(model.config) : void 0, rootData = assembleRootData(model.component.data, datasets), data3 = model.assembleSelectionData(rootData), projections2 = model.assembleProjections(), title2 = model.assembleTitle(), style2 = model.assembleGroupStyle(), encodeEntry2 = model.assembleGroupEncodeEntry(!0), layoutSignals = model.assembleLayoutSignals();
  layoutSignals = layoutSignals.filter((signal) => (signal.name === "width" || signal.name === "height") && signal.value !== void 0 ? (topLevelProperties[signal.name] = +signal.value, !1) : !0);
  let { params: params2, ...otherTopLevelProps } = topLevelProperties;
  return {
    $schema: "https://vega.github.io/schema/vega/v6.json",
    ...model.description ? { description: model.description } : {},
    ...otherTopLevelProps,
    ...title2 ? { title: title2 } : {},
    ...style2 ? { style: style2 } : {},
    ...encodeEntry2 ? { encode: { update: encodeEntry2 } } : {},
    data: data3,
    ...projections2.length > 0 ? { projections: projections2 } : {},
    ...model.assembleGroup([
      ...layoutSignals,
      ...model.assembleSelectionTopLevelSignals([]),
      ...assembleParameterSignals(params2)
    ]),
    ...vgConfig ? { config: vgConfig } : {},
    ...usermeta ? { usermeta } : {}
  };
}
var version2 = pkg.version;

// node_modules/vega-interpreter/build/vega-interpreter.js
function adjustSpatial2(item, encode4, swap3) {
  let t;
  encode4.x2 && (encode4.x ? (swap3 && item.x > item.x2 && (t = item.x, item.x = item.x2, item.x2 = t), item.width = item.x2 - item.x) : item.x = item.x2 - (item.width || 0)), encode4.xc && (item.x = item.xc - (item.width || 0) / 2), encode4.y2 && (encode4.y ? (swap3 && item.y > item.y2 && (t = item.y, item.y = item.y2, item.y2 = t), item.height = item.y2 - item.y) : item.y = item.y2 - (item.height || 0)), encode4.yc && (item.y = item.yc - (item.height || 0) / 2);
}
var Constants2 = {
  NaN: NaN,
  E: Math.E,
  LN2: Math.LN2,
  LN10: Math.LN10,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
  PI: Math.PI,
  SQRT1_2: Math.SQRT1_2,
  SQRT2: Math.SQRT2,
  MIN_VALUE: Number.MIN_VALUE,
  MAX_VALUE: Number.MAX_VALUE
}, Ops = {
  "*": (a, b10) => a * b10,
  "+": (a, b10) => a + b10,
  "-": (a, b10) => a - b10,
  "/": (a, b10) => a / b10,
  "%": (a, b10) => a % b10,
  ">": (a, b10) => a > b10,
  "<": (a, b10) => a < b10,
  "<=": (a, b10) => a <= b10,
  ">=": (a, b10) => a >= b10,
  "==": (a, b10) => a == b10,
  "!=": (a, b10) => a != b10,
  "===": (a, b10) => a === b10,
  "!==": (a, b10) => a !== b10,
  "&": (a, b10) => a & b10,
  "|": (a, b10) => a | b10,
  "^": (a, b10) => a ^ b10,
  "<<": (a, b10) => a << b10,
  ">>": (a, b10) => a >> b10,
  ">>>": (a, b10) => a >>> b10
}, Unary = {
  "+": (a) => +a,
  "-": (a) => -a,
  "~": (a) => ~a,
  "!": (a) => !a
}, slice4 = Array.prototype.slice, apply2 = (m, args, cast) => {
  let obj = cast ? cast(args[0]) : args[0];
  return obj[m].apply(obj, slice4.call(args, 1));
}, datetime3 = (yearOrTimestring, m = 0, d = 1, H2 = 0, M2 = 0, S = 0, ms = 0) => isString(yearOrTimestring) ? new Date(yearOrTimestring) : new Date(yearOrTimestring, m, d, H2, M2, S, ms), Functions2 = {
  // math functions
  isNaN: Number.isNaN,
  isFinite: Number.isFinite,
  abs: Math.abs,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  atan2: Math.atan2,
  ceil: Math.ceil,
  cos: Math.cos,
  exp: Math.exp,
  floor: Math.floor,
  hypot: Math.hypot,
  log: Math.log,
  max: Math.max,
  min: Math.min,
  pow: Math.pow,
  random: Math.random,
  round: Math.round,
  sin: Math.sin,
  sqrt: Math.sqrt,
  tan: Math.tan,
  clamp: (a, b10, c) => Math.max(b10, Math.min(c, a)),
  // date functions
  now: Date.now,
  utc: Date.UTC,
  datetime: datetime3,
  date: (d) => new Date(d).getDate(),
  day: (d) => new Date(d).getDay(),
  year: (d) => new Date(d).getFullYear(),
  month: (d) => new Date(d).getMonth(),
  hours: (d) => new Date(d).getHours(),
  minutes: (d) => new Date(d).getMinutes(),
  seconds: (d) => new Date(d).getSeconds(),
  milliseconds: (d) => new Date(d).getMilliseconds(),
  time: (d) => new Date(d).getTime(),
  timezoneoffset: (d) => new Date(d).getTimezoneOffset(),
  utcdate: (d) => new Date(d).getUTCDate(),
  utcday: (d) => new Date(d).getUTCDay(),
  utcyear: (d) => new Date(d).getUTCFullYear(),
  utcmonth: (d) => new Date(d).getUTCMonth(),
  utchours: (d) => new Date(d).getUTCHours(),
  utcminutes: (d) => new Date(d).getUTCMinutes(),
  utcseconds: (d) => new Date(d).getUTCSeconds(),
  utcmilliseconds: (d) => new Date(d).getUTCMilliseconds(),
  // sequence functions
  length: (x5) => x5.length,
  join: function() {
    return apply2("join", arguments);
  },
  indexof: function() {
    return apply2("indexOf", arguments);
  },
  lastindexof: function() {
    return apply2("lastIndexOf", arguments);
  },
  slice: function() {
    return apply2("slice", arguments);
  },
  reverse: (x5) => x5.slice().reverse(),
  sort: (x5) => x5.slice().sort(ascending),
  // string functions
  parseFloat,
  parseInt,
  upper: (x5) => String(x5).toUpperCase(),
  lower: (x5) => String(x5).toLowerCase(),
  substring: function() {
    return apply2("substring", arguments, String);
  },
  split: function() {
    return apply2("split", arguments, String);
  },
  replace: function() {
    return apply2("replace", arguments, String);
  },
  trim: (x5) => String(x5).trim(),
  // Base64 encode/decode
  // Convert binary string to base64-encoded ascii
  btoa: (x5) => btoa(x5),
  // Convert base64-encoded ascii to binary string
  atob: (x5) => atob(x5),
  // URI encoding
  encodeURIComponent: (x5) => encodeURIComponent(x5),
  // regexp functions
  regexp: RegExp,
  test: (r, t) => RegExp(r).test(t)
}, EventFunctions = ["view", "item", "group", "xy", "x", "y"], DisallowedMethods = /* @__PURE__ */ new Set([Function, eval, setTimeout, setInterval]);
typeof setImmediate == "function" && DisallowedMethods.add(setImmediate);
var Visitors = {
  // global and sticky regexps carry lastIndex across calls, so hand out a
  // fresh instance per evaluation, as the generated code path does
  Literal: ($, n) => n.regex && n.value && (n.value.global || n.value.sticky) ? new RegExp(n.regex.pattern, n.regex.flags) : n.value,
  Identifier: ($, n) => {
    let id3 = n.name;
    return $.memberDepth > 0 ? id3 : id3 === "datum" ? $.datum : id3 === "event" ? $.event : id3 === "item" ? $.item : Constants2[id3] || $.params["$" + id3];
  },
  MemberExpression: ($, n) => {
    let d = !n.computed, o = $(n.object);
    d && ($.memberDepth += 1);
    let p = $(n.property);
    if (d && ($.memberDepth -= 1), DisallowedMethods.has(o[p])) {
      console.error(`Prevented interpretation of member "${p}" which could lead to insecure code execution`);
      return;
    }
    return o[p];
  },
  CallExpression: ($, n) => {
    let args = n.arguments, name2 = n.callee.name;
    return name2.startsWith("_") && (name2 = name2.slice(1)), name2 === "if" ? $(args[0]) ? $(args[1]) : $(args[2]) : ($.fn[name2] || Functions2[name2]).apply($.fn, args.map($));
  },
  ArrayExpression: ($, n) => n.elements.map($),
  BinaryExpression: ($, n) => Ops[n.operator]($(n.left), $(n.right)),
  UnaryExpression: ($, n) => Unary[n.operator]($(n.argument)),
  ConditionalExpression: ($, n) => $(n.test) ? $(n.consequent) : $(n.alternate),
  LogicalExpression: ($, n) => n.operator === "&&" ? $(n.left) && $(n.right) : $(n.left) || $(n.right),
  ObjectExpression: ($, n) => n.properties.reduce((o, p) => {
    $.memberDepth += 1;
    let k = $(p.key);
    $.memberDepth -= 1;
    let v2 = $(p.value);
    return DisallowedObjectProperties.has(k) ? console.error(`Prevented interpretation of property "${k}" which could lead to insecure code execution`) : DisallowedMethods.has(v2) ? console.error(`Prevented interpretation of method "${k}" which could lead to insecure code execution`) : o[k] = v2, o;
  }, {})
};
function interpret(ast, fn, params2, datum2, event2, item) {
  let $ = (n) => Visitors[n.type]($, n);
  return $.memberDepth = 0, $.fn = Object.create(fn), $.params = params2, $.datum = datum2, $.event = event2, $.item = item, EventFunctions.forEach((f) => $.fn[f] = (...args) => event2.vega[f](...args)), $(ast);
}
var expression3 = {
  /**
   * Parse an expression used to update an operator value.
   */
  operator(ctx, expr2) {
    let ast = expr2.ast, fn = ctx.functions;
    return (_) => interpret(ast, fn, _);
  },
  /**
   * Parse an expression provided as an operator parameter value.
   */
  parameter(ctx, expr2) {
    let ast = expr2.ast, fn = ctx.functions;
    return (datum2, _) => interpret(ast, fn, _, datum2);
  },
  /**
   * Parse an expression applied to an event stream.
   */
  event(ctx, expr2) {
    let ast = expr2.ast, fn = ctx.functions;
    return (event2) => interpret(ast, fn, void 0, void 0, event2);
  },
  /**
   * Parse an expression used to handle an event-driven operator update.
   */
  handler(ctx, expr2) {
    let ast = expr2.ast, fn = ctx.functions;
    return (_, event2) => {
      let datum2 = event2.item && event2.item.datum;
      return interpret(ast, fn, _, datum2, event2);
    };
  },
  /**
   * Parse an expression that performs visual encoding.
   */
  encode(ctx, encode4) {
    let {
      marktype,
      channels
    } = encode4, fn = ctx.functions, swap3 = marktype === "group" || marktype === "image" || marktype === "rect";
    return (item, _) => {
      let datum2 = item.datum, m = 0, v2;
      for (let name2 in channels)
        v2 = interpret(channels[name2].ast, fn, _, datum2, void 0, item), item[name2] !== v2 && (item[name2] = v2, m = 1);
      return marktype !== "rule" && adjustSpatial2(item, channels, swap3), m;
    };
  }
};
// End of bundle text, part 14 of 15
export { compile2, entries, expression3, gradient3, isConcatModel, isFacetModel, isLayerModel, isUnitModel, labels$1,
  symbols3 };
