import { registerPlugins } from "./shared/parse-ast-index-Ch2Zs4Nn.mjs";
import { PluginContextData, bindingifyPlugin } from "./shared/src-p50l1OMU.mjs";
import "./shared/misc-CQeo-AFx.mjs";
import { parentPort, workerData } from "node:worker_threads";

//#region src/parallel-plugin-worker.ts
const { registryId, pluginInfos, threadNumber } = workerData;
(async () => {
	try {
		const plugins = await Promise.all(pluginInfos.map(async (pluginInfo) => {
			const pluginModule = await import(pluginInfo.fileUrl);
			const definePluginImpl = pluginModule.default;
			const plugin = await definePluginImpl(pluginInfo.options, { threadNumber });
			return {
				index: pluginInfo.index,
				plugin: bindingifyPlugin(plugin, {}, {}, new PluginContextData(() => {}, {}, []), [], () => {}, "info", false)
			};
		}));
		registerPlugins(registryId, plugins);
		parentPort.postMessage({ type: "success" });
	} catch (error) {
		parentPort.postMessage({
			type: "error",
			error
		});
	} finally {
		parentPort.unref();
	}
})();

//#endregion
export {  };