const require_chunk = require('./chunk-DDkG_k5U.cjs');
const require_src = require('./src-CsEb-TS_.cjs');
const node_fs = require_chunk.__toESM(require("node:fs"));
const node_path = require_chunk.__toESM(require("node:path"));
const node_url = require_chunk.__toESM(require("node:url"));
const node_fs_promises = require_chunk.__toESM(require("node:fs/promises"));
const node_process = require_chunk.__toESM(require("node:process"));

//#region src/utils/load-config.ts
async function bundleTsConfig(configFile, isEsm) {
	const dirnameVarName = "injected_original_dirname";
	const filenameVarName = "injected_original_filename";
	const importMetaUrlVarName = "injected_original_import_meta_url";
	const bundle = await require_src.rolldown({
		input: configFile,
		platform: "node",
		resolve: { mainFields: ["main"] },
		define: {
			__dirname: dirnameVarName,
			__filename: filenameVarName,
			"import.meta.url": importMetaUrlVarName,
			"import.meta.dirname": dirnameVarName,
			"import.meta.filename": filenameVarName
		},
		treeshake: false,
		external: [/^[\w@][^:]/],
		plugins: [{
			name: "inject-file-scope-variables",
			transform: {
				filter: { id: /\.[cm]?[jt]s$/ },
				async handler(code, id) {
					const injectValues = `const ${dirnameVarName} = ${JSON.stringify(node_path.default.dirname(id))};const ${filenameVarName} = ${JSON.stringify(id)};const ${importMetaUrlVarName} = ${JSON.stringify((0, node_url.pathToFileURL)(id).href)};`;
					return {
						code: injectValues + code,
						map: null
					};
				}
			}
		}]
	});
	const outputDir = node_path.default.dirname(configFile);
	const result = await bundle.write({
		dir: outputDir,
		format: isEsm ? "esm" : "cjs",
		sourcemap: "inline",
		entryFileNames: `rolldown.config.[hash]${node_path.default.extname(configFile).replace("ts", "js")}`
	});
	const fileName = result.output.find((chunk) => chunk.type === "chunk" && chunk.isEntry).fileName;
	return node_path.default.join(outputDir, fileName);
}
const SUPPORTED_JS_CONFIG_FORMATS = [
	".js",
	".mjs",
	".cjs"
];
const SUPPORTED_TS_CONFIG_FORMATS = [
	".ts",
	".mts",
	".cts"
];
const SUPPORTED_CONFIG_FORMATS = [...SUPPORTED_JS_CONFIG_FORMATS, ...SUPPORTED_TS_CONFIG_FORMATS];
const DEFAULT_CONFIG_BASE = "rolldown.config";
async function findConfigFileNameInCwd() {
	const filesInWorkingDirectory = new Set(await (0, node_fs_promises.readdir)((0, node_process.cwd)()));
	for (const extension of SUPPORTED_CONFIG_FORMATS) {
		const fileName = `${DEFAULT_CONFIG_BASE}${extension}`;
		if (filesInWorkingDirectory.has(fileName)) return fileName;
	}
	throw new Error("No `rolldown.config` configuration file found.");
}
async function loadTsConfig(configFile) {
	const isEsm = isFilePathESM(configFile);
	const file = await bundleTsConfig(configFile, isEsm);
	try {
		return (await import((0, node_url.pathToFileURL)(file).href)).default;
	} finally {
		node_fs.default.unlink(file, () => {});
	}
}
function isFilePathESM(filePath) {
	if (/\.m[jt]s$/.test(filePath)) return true;
	else if (/\.c[jt]s$/.test(filePath)) return false;
	else {
		const pkg = findNearestPackageData(node_path.default.dirname(filePath));
		if (pkg) return pkg.type === "module";
		return false;
	}
}
function findNearestPackageData(basedir) {
	while (basedir) {
		const pkgPath = node_path.default.join(basedir, "package.json");
		if (tryStatSync(pkgPath)?.isFile()) try {
			return JSON.parse(node_fs.default.readFileSync(pkgPath, "utf-8"));
		} catch {}
		const nextBasedir = node_path.default.dirname(basedir);
		if (nextBasedir === basedir) break;
		basedir = nextBasedir;
	}
	return null;
}
function tryStatSync(file) {
	try {
		return node_fs.default.statSync(file, { throwIfNoEntry: false });
	} catch {}
}
async function loadConfig(configPath) {
	const ext = node_path.default.extname(configPath = configPath || await findConfigFileNameInCwd());
	try {
		if (SUPPORTED_JS_CONFIG_FORMATS.includes(ext) || process.env.NODE_OPTIONS?.includes("--import=tsx") && SUPPORTED_TS_CONFIG_FORMATS.includes(ext)) return (await import((0, node_url.pathToFileURL)(configPath).href)).default;
		else if (SUPPORTED_TS_CONFIG_FORMATS.includes(ext)) {
			const rawConfigPath = node_path.default.resolve(configPath);
			return await loadTsConfig(rawConfigPath);
		} else throw new Error(`Unsupported config format. Expected: \`${SUPPORTED_CONFIG_FORMATS.join(",")}\` but got \`${ext}\``);
	} catch (err) {
		throw new Error("Error happened while loading config.", { cause: err });
	}
}

//#endregion
Object.defineProperty(exports, 'loadConfig', {
  enumerable: true,
  get: function () {
    return loadConfig;
  }
});