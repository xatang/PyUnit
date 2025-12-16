import { BindingReplacePluginConfig, BindingTransformPluginConfig, IsolatedDeclarationsOptions, IsolatedDeclarationsResult, NapiResolveOptions, ResolveResult, ResolverFactory, TransformOptions, TransformResult, isolatedDeclaration, moduleRunnerTransform, transform } from "./shared/binding-BEeJNtY4.mjs";
import { BuiltinPlugin, InputOptions, assetPlugin, buildImportAnalysisPlugin, defineParallelPlugin, dynamicImportVarsPlugin, importGlobPlugin, isolatedDeclarationPlugin, jsonPlugin, loadFallbackPlugin, manifestPlugin, modulePreloadPolyfillPlugin, reporterPlugin, viteResolvePlugin, wasmFallbackPlugin, wasmHelperPlugin, webWorkerPostPlugin } from "./shared/define-config-Cf8iQFTl.mjs";

//#region src/api/experimental.d.ts

/**
* This is an experimental API. It's behavior may change in the future.
*
* Calling this API will only execute the scan stage of rolldown.
*/
declare const experimental_scan: (input: InputOptions) => Promise<void>;
//#endregion
//#region src/builtin-plugin/alias-plugin.d.ts
type AliasPluginAlias = {
  find: string | RegExp;
  replacement: string;
};
type AliasPluginConfig = {
  entries: AliasPluginAlias[];
};
declare function aliasPlugin(config: AliasPluginConfig): BuiltinPlugin;
//#endregion
//#region src/builtin-plugin/replace-plugin.d.ts
/**
* Replaces targeted strings in files while bundling.
*
* @example
* // Basic usage
* ```js
* replacePlugin({
*   'process.env.NODE_ENV': JSON.stringify('production'),
*    __buildVersion: 15
* })
* ```
* @example
* // With options
* ```js
* replacePlugin({
*   'process.env.NODE_ENV': JSON.stringify('production'),
*   __buildVersion: 15
* }, {
*   preventAssignment: false,
* })
* ```
*/
declare function replacePlugin(values?: BindingReplacePluginConfig["values"], options?: Omit<BindingReplacePluginConfig, "values">): BuiltinPlugin;
//#endregion
//#region src/builtin-plugin/transform-plugin.d.ts
type TransformPattern = string | RegExp | readonly (RegExp | string)[];
type TransformPluginConfig = Omit<BindingTransformPluginConfig, "include" | "exclude" | "jsxRefreshInclude" | "jsxRefreshExclude"> & {
  include?: TransformPattern;
  exclude?: TransformPattern;
  jsxRefreshInclude?: TransformPattern;
  jsxRefreshExclude?: TransformPattern;
};
declare function transformPlugin(config?: TransformPluginConfig): BuiltinPlugin;
//#endregion
export { type IsolatedDeclarationsOptions, type IsolatedDeclarationsResult, type NapiResolveOptions as ResolveOptions, type ResolveResult, ResolverFactory, type TransformOptions, type TransformResult, aliasPlugin, assetPlugin, buildImportAnalysisPlugin, defineParallelPlugin, dynamicImportVarsPlugin, importGlobPlugin, isolatedDeclaration, isolatedDeclarationPlugin, jsonPlugin, loadFallbackPlugin, manifestPlugin, modulePreloadPolyfillPlugin, moduleRunnerTransform, replacePlugin, reporterPlugin, experimental_scan as scan, transform, transformPlugin, viteResolvePlugin, wasmFallbackPlugin, wasmHelperPlugin, webWorkerPostPlugin };