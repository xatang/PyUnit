const require_chunk = require('./shared/chunk-DDkG_k5U.cjs');
const require_src = require('./shared/src-CsEb-TS_.cjs');
const require_parse_ast_index = require('./shared/parse-ast-index-Cn-35Vbp.cjs');
require('./shared/misc-DksvspN4.cjs');
const node_url = require_chunk.__toESM(require("node:url"));

//#region src/api/experimental.ts
/**
* This is an experimental API. It's behavior may change in the future.
*
* Calling this API will only execute the scan stage of rolldown.
*/
const experimental_scan = async (input) => {
	const inputOptions = await require_src.PluginDriver.callOptionsHook(input);
	const { impl: bundler, stopWorkers } = await require_src.createBundlerImpl(new require_parse_ast_index.BindingBundler(), inputOptions, {});
	const output = await bundler.scan();
	require_src.handleOutputErrors(output);
	await stopWorkers?.();
};

//#endregion
//#region src/plugin/parallel-plugin.ts
function defineParallelPlugin(pluginPath) {
	return (options) => {
		return { _parallel: {
			fileUrl: (0, node_url.pathToFileURL)(pluginPath).href,
			options
		} };
	};
}

//#endregion
//#region src/builtin-plugin/alias-plugin.ts
function aliasPlugin(config) {
	return new require_src.BuiltinPlugin("builtin:alias", config);
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
	return new require_src.BuiltinPlugin("builtin:replace", {
		...options,
		values
	});
}

//#endregion
//#region src/builtin-plugin/transform-plugin.ts
function transformPlugin(config) {
	if (config) config = {
		...config,
		include: require_src.normalizedStringOrRegex(config.include),
		exclude: require_src.normalizedStringOrRegex(config.exclude),
		jsxRefreshInclude: require_src.normalizedStringOrRegex(config.jsxRefreshInclude),
		jsxRefreshExclude: require_src.normalizedStringOrRegex(config.jsxRefreshExclude)
	};
	return new require_src.BuiltinPlugin("builtin:transform", config);
}

//#endregion
exports.ResolverFactory = require_parse_ast_index.ResolverFactory;
exports.aliasPlugin = aliasPlugin;
exports.assetPlugin = require_src.assetPlugin;
exports.buildImportAnalysisPlugin = require_src.buildImportAnalysisPlugin;
exports.defineParallelPlugin = defineParallelPlugin;
exports.dynamicImportVarsPlugin = require_src.dynamicImportVarsPlugin;
exports.importGlobPlugin = require_src.importGlobPlugin;
exports.isolatedDeclaration = require_parse_ast_index.isolatedDeclaration;
exports.isolatedDeclarationPlugin = require_src.isolatedDeclarationPlugin;
exports.jsonPlugin = require_src.jsonPlugin;
exports.loadFallbackPlugin = require_src.loadFallbackPlugin;
exports.manifestPlugin = require_src.manifestPlugin;
exports.modulePreloadPolyfillPlugin = require_src.modulePreloadPolyfillPlugin;
exports.moduleRunnerTransform = require_parse_ast_index.moduleRunnerTransform;
exports.replacePlugin = replacePlugin;
exports.reporterPlugin = require_src.reporterPlugin;
exports.scan = experimental_scan;
exports.transform = require_parse_ast_index.transform;
exports.transformPlugin = transformPlugin;
exports.viteResolvePlugin = require_src.viteResolvePlugin;
exports.wasmFallbackPlugin = require_src.wasmFallbackPlugin;
exports.wasmHelperPlugin = require_src.wasmHelperPlugin;
exports.webWorkerPostPlugin = require_src.webWorkerPostPlugin;