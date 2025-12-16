import "./shared/binding-BEeJNtY4.mjs";
import { ConfigExport, defineConfig } from "./shared/define-config-Cf8iQFTl.mjs";

//#region src/utils/load-config.d.ts
declare function loadConfig(configPath: string): Promise<ConfigExport>;
//#endregion
//#region src/config.d.ts
declare const VERSION: string;
//#endregion
export { VERSION, defineConfig, loadConfig };