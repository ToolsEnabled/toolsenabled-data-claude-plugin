// ToolsEnabled Data server, part 1 of 5: TE Data's own code: the line that gives the bundle a require function
// (createRequire) and esbuild's module helpers (lines 1-30 of the bundle).
// The server is one esbuild bundle stored as 5 ES modules, cut between top-level statements: TE Data's own code in
// parts 1, 3 and 5, each under 256 KiB so that it can be read in full, and the bundled third-party libraries in parts
// 2 and 4 (README.md, "Verifying a release"). The import lines first load the previous part, so the parts run in the
// bundle's order, then name what this part uses from other parts; the export line names what other parts use from it.
// Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
// Bundle text, part 1 of 5
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
// End of bundle text, part 1 of 5
export { __commonJS, __export, __toESM };
