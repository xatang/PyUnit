const require_chunk = require('./shared/chunk-DDkG_k5U.cjs');
const require_src = require('./shared/src-CsEb-TS_.cjs');
const require_parse_ast_index = require('./shared/parse-ast-index-Cn-35Vbp.cjs');
require('./shared/misc-DksvspN4.cjs');
const node_worker_threads = require_chunk.__toESM(require("node:worker_threads"));

//#region src/parallel-plugin-worker.ts
const { registryId, pluginInfos, threadNumber } = node_worker_threads.workerData;
(async () => {
	try {
		const plugins = await Promise.all(pluginInfos.map(async (pluginInfo) => {
			const pluginModule = await import(pluginInfo.fileUrl);
			const definePluginImpl = pluginModule.default;
			const plugin = await definePluginImpl(pluginInfo.options, { threadNumber });
			return {
				index: pluginInfo.index,
				plugin: require_src.bindingifyPlugin(plugin, {}, {}, new require_src.PluginContextData(() => {}, {}, []), [], () => {}, "info", false)
			};
		}));
		require_parse_ast_index.registerPlugins(registryId, plugins);
		node_worker_threads.parentPort.postMessage({ type: "success" });
	} catch (error) {
		node_worker_threads.parentPort.postMessage({
			type: "error",
			error
		});
	} finally {
		node_worker_threads.parentPort.unref();
	}
})();

//#endregion