const require_src = require('./shared/src-CsEb-TS_.cjs');
require('./shared/parse-ast-index-Cn-35Vbp.cjs');
require('./shared/misc-DksvspN4.cjs');
const require_load_config = require('./shared/load-config-Dl9pIpnr.cjs');

//#region src/config.ts
const VERSION = require_src.version;

//#endregion
exports.VERSION = VERSION;
exports.defineConfig = require_src.defineConfig;
exports.loadConfig = require_load_config.loadConfig;