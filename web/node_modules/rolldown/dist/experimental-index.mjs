import { BindingBundler, ResolverFactory, isolatedDeclaration, moduleRunnerTransform, transform } from "./shared/parse-ast-index-Ch2Zs4Nn.mjs";
import { BuiltinPlugin, PluginDriver, assetPlugin, buildImportAnalysisPlugin, createBundlerImpl, dynamicImportVarsPlugin, handleOutputErrors, importGlobPlugin, isolatedDeclarationPlugin, jsonPlugin, loadFallbackPlugin, manifestPlugin, modulePreloadPolyfillPlugin, normalizedStringOrRegex, reporterPlugin, viteResolvePlugin, wasmFallbackPlugin, wasmHelperPlugin, webWorkerPostPlugin } from "./shared/src-p50l1OMU.mjs";
import "./shared/misc-CQeo-AFx.mjs";
import { pathToFileURL } from "node:url";

//#region src/api/experimental.ts
/**
* This is an experimental API. It's behavior may change in the future.
*
* Calling this API will only execute the scan stage of rolldown.
*/
const experimental_scan = async (input) => {
	const inputOptions = await PluginDriver.callOptionsHook(input);
	const { impl: bundler, stopWorkers } = await createBundlerImpl(new BindingBundler(), inputOptions, {});
	const output = await bundler.scan();
	handleOutputErrors(output);
	await stopWorkers?.();
};

//#endregion
//#region src/plugin/parallel-plugin.ts
function defineParallelPlugin(pluginPath) {
	return (options) => {
		return { _parallel: {
			fileUrl: pathToFileURL(pluginPath).href,
			options
		} };
	};
}

//#endregion
//#region src/builtin-plugin/alias-plugin.ts
function aliasPlugin(config) {
	return new BuiltinPlugin("builtin:alias", config);
}

//#endregion
//#region src/builtin-plugin/replace-plugin.ts
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
function replacePlugin(values = {}, options = {}) {
	return new BuiltinPlugin("builtin:replace", {
		...options,
		values
	});
}

//#endregion
//#region src/builtin-plugin/transform-plugin.ts
function transformPlugin(config) {
	if (config) config = {
		...config,
		include: normalizedStringOrRegex(config.include),
		exclude: normalizedStringOrRegex(config.exclude),
		jsxRefreshInclude: normalizedStringOrRegex(config.jsxRefreshInclude),
		jsxRefreshExclude: normalizedStringOrRegex(config.jsxRefreshExclude)
	};
	return new BuiltinPlugin("builtin:transform", config);
}

//#endregion
export { ResolverFactory, aliasPlugin, assetPlugin, buildImportAnalysisPlugin, defineParallelPlugin, dynamicImportVarsPlugin, importGlobPlugin, isolatedDeclaration, isolatedDeclarationPlugin, jsonPlugin, loadFallbackPlugin, manifestPlugin, modulePreloadPolyfillPlugin, moduleRunnerTransform, replacePlugin, reporterPlugin, experimental_scan as scan, transform, transformPlugin, viteResolvePlugin, wasmFallbackPlugin, wasmHelperPlugin, webWorkerPostPlugin };