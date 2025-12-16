const require_chunk = require('./chunk-DDkG_k5U.cjs');

//#region src/webcontainer-fallback.cjs
var require_webcontainer_fallback = /* @__PURE__ */ require_chunk.__commonJS({ "src/webcontainer-fallback.cjs": ((exports, module) => {
	const fs = require("node:fs");
	const childProcess = require("node:child_process");
	const rolldownPkg = JSON.parse(fs.readFileSync(require.resolve("rolldown/package.json"), "utf-8"));
	const version = rolldownPkg.version;
	const baseDir = `/tmp/rolldown-${version}`;
	const bindingEntry = `${baseDir}/node_modules/@rolldown/binding-wasm32-wasi/rolldown-binding.wasi.cjs`;
	if (!fs.existsSync(bindingEntry)) {
		const bindingPkg = `@rolldown/binding-wasm32-wasi@${version}`;
		fs.rmSync(baseDir, {
			recursive: true,
			force: true
		});
		fs.mkdirSync(baseDir, { recursive: true });
		console.log(`[rolldown] Downloading ${bindingPkg} on WebContainer...`);
		childProcess.execFileSync("pnpm", ["i", bindingPkg], {
			cwd: baseDir,
			stdio: "inherit"
		});
	}
	module.exports = require(bindingEntry);
}) });

//#endregion
//#region src/binding.js
new URL(".", require("url").pathToFileURL(__filename).href).pathname;
const { readFileSync } = require("node:fs");
let nativeBinding = null;
const loadErrors = [];
const isMusl = () => {
	let musl = false;
	if (process.platform === "linux") {
		musl = isMuslFromFilesystem();
		if (musl === null) musl = isMuslFromReport();
		if (musl === null) musl = isMuslFromChildProcess();
	}
	return musl;
};
const isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-");
const isMuslFromFilesystem = () => {
	try {
		return readFileSync("/usr/bin/ldd", "utf-8").includes("musl");
	} catch {
		return null;
	}
};
const isMuslFromReport = () => {
	let report = null;
	if (typeof process.report?.getReport === "function") {
		process.report.excludeNetwork = true;
		report = process.report.getReport();
	}
	if (!report) return null;
	if (report.header && report.header.glibcVersionRuntime) return false;
	if (Array.isArray(report.sharedObjects)) {
		if (report.sharedObjects.some(isFileMusl)) return true;
	}
	return false;
};
const isMuslFromChildProcess = () => {
	try {
		return require("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
	} catch (e) {
		return false;
	}
};
function requireNative() {
	if (process.env.NAPI_RS_NATIVE_LIBRARY_PATH) try {
		nativeBinding = require(process.env.NAPI_RS_NATIVE_LIBRARY_PATH);
	} catch (err) {
		loadErrors.push(err);
	}
	else if (process.platform === "android") if (process.arch === "arm64") {
		try {
			return require("../rolldown-binding.android-arm64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-android-arm64");
			const bindingPackageVersion = require("@rolldown/binding-android-arm64/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm") {
		try {
			return require("../rolldown-binding.android-arm-eabi.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-android-arm-eabi");
			const bindingPackageVersion = require("@rolldown/binding-android-arm-eabi/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Android ${process.arch}`));
	else if (process.platform === "win32") if (process.arch === "x64") {
		try {
			return require("../rolldown-binding.win32-x64-msvc.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-win32-x64-msvc");
			const bindingPackageVersion = require("@rolldown/binding-win32-x64-msvc/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "ia32") {
		try {
			return require("../rolldown-binding.win32-ia32-msvc.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-win32-ia32-msvc");
			const bindingPackageVersion = require("@rolldown/binding-win32-ia32-msvc/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm64") {
		try {
			return require("../rolldown-binding.win32-arm64-msvc.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-win32-arm64-msvc");
			const bindingPackageVersion = require("@rolldown/binding-win32-arm64-msvc/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Windows: ${process.arch}`));
	else if (process.platform === "darwin") {
		try {
			return require("../rolldown-binding.darwin-universal.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-darwin-universal");
			const bindingPackageVersion = require("@rolldown/binding-darwin-universal/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
		if (process.arch === "x64") {
			try {
				return require("../rolldown-binding.darwin-x64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@rolldown/binding-darwin-x64");
				const bindingPackageVersion = require("@rolldown/binding-darwin-x64/package.json").version;
				if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "arm64") {
			try {
				return require("../rolldown-binding.darwin-arm64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@rolldown/binding-darwin-arm64");
				const bindingPackageVersion = require("@rolldown/binding-darwin-arm64/package.json").version;
				if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on macOS: ${process.arch}`));
	} else if (process.platform === "freebsd") if (process.arch === "x64") {
		try {
			return require("../rolldown-binding.freebsd-x64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-freebsd-x64");
			const bindingPackageVersion = require("@rolldown/binding-freebsd-x64/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm64") {
		try {
			return require("../rolldown-binding.freebsd-arm64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-freebsd-arm64");
			const bindingPackageVersion = require("@rolldown/binding-freebsd-arm64/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
	else if (process.platform === "linux") if (process.arch === "x64") if (isMusl()) {
		try {
			return require("../rolldown-binding.linux-x64-musl.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-x64-musl");
			const bindingPackageVersion = require("@rolldown/binding-linux-x64-musl/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("../rolldown-binding.linux-x64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-x64-gnu");
			const bindingPackageVersion = require("@rolldown/binding-linux-x64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "arm64") if (isMusl()) {
		try {
			return require("../rolldown-binding.linux-arm64-musl.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-arm64-musl");
			const bindingPackageVersion = require("@rolldown/binding-linux-arm64-musl/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("../rolldown-binding.linux-arm64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-arm64-gnu");
			const bindingPackageVersion = require("@rolldown/binding-linux-arm64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "arm") if (isMusl()) {
		try {
			return require("../rolldown-binding.linux-arm-musleabihf.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-arm-musleabihf");
			const bindingPackageVersion = require("@rolldown/binding-linux-arm-musleabihf/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("../rolldown-binding.linux-arm-gnueabihf.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-arm-gnueabihf");
			const bindingPackageVersion = require("@rolldown/binding-linux-arm-gnueabihf/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "riscv64") if (isMusl()) {
		try {
			return require("../rolldown-binding.linux-riscv64-musl.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-riscv64-musl");
			const bindingPackageVersion = require("@rolldown/binding-linux-riscv64-musl/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else {
		try {
			return require("../rolldown-binding.linux-riscv64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-riscv64-gnu");
			const bindingPackageVersion = require("@rolldown/binding-linux-riscv64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	}
	else if (process.arch === "ppc64") {
		try {
			return require("../rolldown-binding.linux-ppc64-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-ppc64-gnu");
			const bindingPackageVersion = require("@rolldown/binding-linux-ppc64-gnu/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "s390x") {
		try {
			return require("../rolldown-binding.linux-s390x-gnu.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-linux-s390x-gnu");
			const bindingPackageVersion = require("@rolldown/binding-linux-s390x-gnu/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Linux: ${process.arch}`));
	else if (process.platform === "openharmony") if (process.arch === "arm64") {
		try {
			return require("../rolldown-binding.openharmony-arm64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-openharmony-arm64");
			const bindingPackageVersion = require("@rolldown/binding-openharmony-arm64/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "x64") {
		try {
			return require("../rolldown-binding.openharmony-x64.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-openharmony-x64");
			const bindingPackageVersion = require("@rolldown/binding-openharmony-x64/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else if (process.arch === "arm") {
		try {
			return require("../rolldown-binding.openharmony-arm.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@rolldown/binding-openharmony-arm");
			const bindingPackageVersion = require("@rolldown/binding-openharmony-arm/package.json").version;
			if (bindingPackageVersion !== "1.0.0-beta.32" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 1.0.0-beta.32 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
	} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
	else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
}
nativeBinding = requireNative();
if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
	try {
		nativeBinding = require("../rolldown-binding.wasi.cjs");
	} catch (err) {
		if (process.env.NAPI_RS_FORCE_WASI) loadErrors.push(err);
	}
	if (!nativeBinding) try {
		nativeBinding = require("@rolldown/binding-wasm32-wasi");
	} catch (err) {
		if (process.env.NAPI_RS_FORCE_WASI) loadErrors.push(err);
	}
}
if (!nativeBinding && globalThis.process?.versions?.["webcontainer"]) try {
	nativeBinding = require_webcontainer_fallback();
} catch (err) {
	loadErrors.push(err);
}
if (!nativeBinding) {
	if (loadErrors.length > 0) throw new Error("Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.", { cause: loadErrors });
	throw new Error(`Failed to load native binding`);
}
const { Severity, ParseResult, ExportExportNameKind, ExportImportNameKind, ExportLocalNameKind, ImportNameKind, parseAsync, parseSync, rawTransferSupported, ResolverFactory, EnforceExtension, ModuleType, sync, HelperMode, isolatedDeclaration, moduleRunnerTransform, transform, BindingBundleEndEventData, BindingBundleErrorEventData, BindingBundler, BindingBundlerImpl, BindingCallableBuiltinPlugin, BindingChunkingContext, BindingHmrOutput, BindingModuleInfo, BindingNormalizedOptions, BindingOutputAsset, BindingOutputChunk, BindingOutputs, BindingPluginContext, BindingRenderedChunk, BindingRenderedChunkMeta, BindingRenderedModule, BindingTransformPluginContext, BindingWatcher, BindingWatcherChangeData, BindingWatcherEvent, ParallelJsPluginRegistry, BindingAttachDebugInfo, BindingBuiltinPluginName, BindingChunkModuleOrderBy, BindingJsx, BindingLogLevel, BindingPluginOrder, FilterTokenKind, registerPlugins, shutdownAsyncRuntime, startAsyncRuntime } = nativeBinding;

//#endregion
//#region src/utils/code-frame.ts
function spaces(index) {
	let result = "";
	while (index--) result += " ";
	return result;
}
function tabsToSpaces(value) {
	return value.replace(/^\t+/, (match) => match.split("	").join("  "));
}
const LINE_TRUNCATE_LENGTH = 120;
const MIN_CHARACTERS_SHOWN_AFTER_LOCATION = 10;
const ELLIPSIS = "...";
function getCodeFrame(source, line, column) {
	let lines = source.split("\n");
	if (line > lines.length) return "";
	const maxLineLength = Math.max(tabsToSpaces(lines[line - 1].slice(0, column)).length + MIN_CHARACTERS_SHOWN_AFTER_LOCATION + 3, LINE_TRUNCATE_LENGTH);
	const frameStart = Math.max(0, line - 3);
	let frameEnd = Math.min(line + 2, lines.length);
	lines = lines.slice(frameStart, frameEnd);
	while (!/\S/.test(lines[lines.length - 1])) {
		lines.pop();
		frameEnd -= 1;
	}
	const digits = String(frameEnd).length;
	return lines.map((sourceLine, index) => {
		const isErrorLine = frameStart + index + 1 === line;
		let lineNumber = String(index + frameStart + 1);
		while (lineNumber.length < digits) lineNumber = ` ${lineNumber}`;
		let displayedLine = tabsToSpaces(sourceLine);
		if (displayedLine.length > maxLineLength) displayedLine = `${displayedLine.slice(0, maxLineLength - 3)}${ELLIPSIS}`;
		if (isErrorLine) {
			const indicator = spaces(digits + 2 + tabsToSpaces(sourceLine.slice(0, column)).length) + "^";
			return `${lineNumber}: ${displayedLine}\n${indicator}`;
		}
		return `${lineNumber}: ${displayedLine}`;
	}).join("\n");
}

//#endregion
//#region src/log/locate-character/index.js
/** @typedef {import('./types').Location} Location */
/**
* @param {import('./types').Range} range
* @param {number} index
*/
function rangeContains(range, index) {
	return range.start <= index && index < range.end;
}
/**
* @param {string} source
* @param {import('./types').Options} [options]
*/
function getLocator(source, options = {}) {
	const { offsetLine = 0, offsetColumn = 0 } = options;
	let start = 0;
	const ranges = source.split("\n").map((line, i$1) => {
		const end = start + line.length + 1;
		/** @type {import('./types').Range} */
		const range = {
			start,
			end,
			line: i$1
		};
		start = end;
		return range;
	});
	let i = 0;
	/**
	* @param {string | number} search
	* @param {number} [index]
	* @returns {Location | undefined}
	*/
	function locator(search, index) {
		if (typeof search === "string") search = source.indexOf(search, index ?? 0);
		if (search === -1) return void 0;
		let range = ranges[i];
		const d = search >= range.end ? 1 : -1;
		while (range) {
			if (rangeContains(range, search)) return {
				line: offsetLine + range.line,
				column: offsetColumn + search - range.start,
				character: search
			};
			i += d;
			range = ranges[i];
		}
	}
	return locator;
}
/**
* @param {string} source
* @param {string | number} search
* @param {import('./types').Options} [options]
* @returns {Location | undefined}
*/
function locate(source, search, options) {
	return getLocator(source, options)(search, options && options.startIndex);
}

//#endregion
//#region src/log/logs.ts
const INVALID_LOG_POSITION = "INVALID_LOG_POSITION", PLUGIN_ERROR = "PLUGIN_ERROR", INPUT_HOOK_IN_OUTPUT_PLUGIN = "INPUT_HOOK_IN_OUTPUT_PLUGIN", CYCLE_LOADING = "CYCLE_LOADING", MULTIPLY_NOTIFY_OPTION = "MULTIPLY_NOTIFY_OPTION", PARSE_ERROR = "PARSE_ERROR", DUPLICATE_JSX_CONFIG = "DUPLICATE_JSX_CONFIG", NO_FS_IN_BROWSER = "NO_FS_IN_BROWSER";
function logParseError(message) {
	return {
		code: PARSE_ERROR,
		message
	};
}
function logInvalidLogPosition(pluginName) {
	return {
		code: INVALID_LOG_POSITION,
		message: `Plugin "${pluginName}" tried to add a file position to a log or warning. This is only supported in the "transform" hook at the moment and will be ignored.`
	};
}
function logInputHookInOutputPlugin(pluginName, hookName) {
	return {
		code: INPUT_HOOK_IN_OUTPUT_PLUGIN,
		message: `The "${hookName}" hook used by the output plugin ${pluginName} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`
	};
}
function logCycleLoading(pluginName, moduleId) {
	return {
		code: CYCLE_LOADING,
		message: `Found the module "${moduleId}" cycle loading at ${pluginName} plugin, it maybe blocking fetching modules.`
	};
}
function logMultiplyNotifyOption() {
	return {
		code: MULTIPLY_NOTIFY_OPTION,
		message: `Found multiply notify option at watch options, using first one to start notify watcher.`
	};
}
function logDuplicateJsxConfig() {
	return {
		code: DUPLICATE_JSX_CONFIG,
		message: "Both `options.jsx` and `options.transform.jsx` are set so `options.jsx` is ignored"
	};
}
function logPluginError(error$1, plugin, { hook, id } = {}) {
	try {
		const code = error$1.code;
		if (!error$1.pluginCode && code != null && (typeof code !== "string" || !code.startsWith("PLUGIN_"))) error$1.pluginCode = code;
		error$1.code = PLUGIN_ERROR;
		error$1.plugin = plugin;
		if (hook) error$1.hook = hook;
		if (id) error$1.id = id;
	} catch (_) {} finally {
		return error$1;
	}
}
function error(base) {
	if (!(base instanceof Error)) {
		base = Object.assign(new Error(base.message), base);
		Object.defineProperty(base, "name", {
			value: "RollupError",
			writable: true
		});
	}
	throw base;
}
function augmentCodeLocation(properties, pos, source, id) {
	if (typeof pos === "object") {
		const { line, column } = pos;
		properties.loc = {
			column,
			file: id,
			line
		};
	} else {
		properties.pos = pos;
		const location = locate(source, pos, { offsetLine: 1 });
		if (!location) return;
		const { line, column } = location;
		properties.loc = {
			column,
			file: id,
			line
		};
	}
	if (properties.frame === void 0) {
		const { line, column } = properties.loc;
		properties.frame = getCodeFrame(source, line, column);
	}
}

//#endregion
//#region ../../node_modules/.pnpm/oxc-parser@0.81.0/node_modules/oxc-parser/wrap.mjs
function wrap$1(result) {
	let program, module$1, comments, errors;
	return {
		get program() {
			if (!program) program = jsonParseAst(result.program);
			return program;
		},
		get module() {
			if (!module$1) module$1 = result.module;
			return module$1;
		},
		get comments() {
			if (!comments) comments = result.comments;
			return comments;
		},
		get errors() {
			if (!errors) errors = result.errors;
			return errors;
		}
	};
}
function jsonParseAst(programJson) {
	const { node: program, fixes } = JSON.parse(programJson);
	for (const fixPath of fixes) applyFix(program, fixPath);
	return program;
}
function applyFix(program, fixPath) {
	let node = program;
	for (const key of fixPath) node = node[key];
	if (node.bigint) node.value = BigInt(node.bigint);
	else try {
		node.value = RegExp(node.regex.pattern, node.regex.flags);
	} catch (_err) {}
}

//#endregion
//#region src/parse-ast-index.ts
function wrap(result, sourceText) {
	result = wrap$1(result);
	if (result.errors.length > 0) return normalizeParseError(sourceText, result.errors);
	return result.program;
}
function normalizeParseError(sourceText, errors) {
	let message = `Parse failed with ${errors.length} error${errors.length < 2 ? "" : "s"}:\n`;
	for (let i = 0; i < errors.length; i++) {
		if (i >= 5) {
			message += "\n...";
			break;
		}
		const e = errors[i];
		message += e.message + "\n" + e.labels.map((label) => {
			const location = locate(sourceText, label.start, { offsetLine: 1 });
			if (!location) return;
			return getCodeFrame(sourceText, location.line, location.column);
		}).filter(Boolean).join("\n");
	}
	return error(logParseError(message));
}
const defaultParserOptions = {
	lang: "js",
	preserveParens: false
};
function parseAst(sourceText, options, filename) {
	return wrap(parseSync(filename ?? "file.js", sourceText, {
		...defaultParserOptions,
		...options
	}), sourceText);
}
async function parseAstAsync(sourceText, options, filename) {
	return wrap(await parseAsync(filename ?? "file.js", sourceText, {
		...defaultParserOptions,
		...options
	}), sourceText);
}

//#endregion
Object.defineProperty(exports, 'BindingAttachDebugInfo', {
  enumerable: true,
  get: function () {
    return BindingAttachDebugInfo;
  }
});
Object.defineProperty(exports, 'BindingBundler', {
  enumerable: true,
  get: function () {
    return BindingBundler;
  }
});
Object.defineProperty(exports, 'BindingCallableBuiltinPlugin', {
  enumerable: true,
  get: function () {
    return BindingCallableBuiltinPlugin;
  }
});
Object.defineProperty(exports, 'BindingChunkModuleOrderBy', {
  enumerable: true,
  get: function () {
    return BindingChunkModuleOrderBy;
  }
});
Object.defineProperty(exports, 'BindingJsx', {
  enumerable: true,
  get: function () {
    return BindingJsx;
  }
});
Object.defineProperty(exports, 'BindingLogLevel', {
  enumerable: true,
  get: function () {
    return BindingLogLevel;
  }
});
Object.defineProperty(exports, 'BindingPluginOrder', {
  enumerable: true,
  get: function () {
    return BindingPluginOrder;
  }
});
Object.defineProperty(exports, 'BindingWatcher', {
  enumerable: true,
  get: function () {
    return BindingWatcher;
  }
});
Object.defineProperty(exports, 'ParallelJsPluginRegistry', {
  enumerable: true,
  get: function () {
    return ParallelJsPluginRegistry;
  }
});
Object.defineProperty(exports, 'ResolverFactory', {
  enumerable: true,
  get: function () {
    return ResolverFactory;
  }
});
Object.defineProperty(exports, 'augmentCodeLocation', {
  enumerable: true,
  get: function () {
    return augmentCodeLocation;
  }
});
Object.defineProperty(exports, 'error', {
  enumerable: true,
  get: function () {
    return error;
  }
});
Object.defineProperty(exports, 'isolatedDeclaration', {
  enumerable: true,
  get: function () {
    return isolatedDeclaration;
  }
});
Object.defineProperty(exports, 'logCycleLoading', {
  enumerable: true,
  get: function () {
    return logCycleLoading;
  }
});
Object.defineProperty(exports, 'logDuplicateJsxConfig', {
  enumerable: true,
  get: function () {
    return logDuplicateJsxConfig;
  }
});
Object.defineProperty(exports, 'logInputHookInOutputPlugin', {
  enumerable: true,
  get: function () {
    return logInputHookInOutputPlugin;
  }
});
Object.defineProperty(exports, 'logInvalidLogPosition', {
  enumerable: true,
  get: function () {
    return logInvalidLogPosition;
  }
});
Object.defineProperty(exports, 'logMultiplyNotifyOption', {
  enumerable: true,
  get: function () {
    return logMultiplyNotifyOption;
  }
});
Object.defineProperty(exports, 'logPluginError', {
  enumerable: true,
  get: function () {
    return logPluginError;
  }
});
Object.defineProperty(exports, 'moduleRunnerTransform', {
  enumerable: true,
  get: function () {
    return moduleRunnerTransform;
  }
});
Object.defineProperty(exports, 'parseAst', {
  enumerable: true,
  get: function () {
    return parseAst;
  }
});
Object.defineProperty(exports, 'parseAstAsync', {
  enumerable: true,
  get: function () {
    return parseAstAsync;
  }
});
Object.defineProperty(exports, 'registerPlugins', {
  enumerable: true,
  get: function () {
    return registerPlugins;
  }
});
Object.defineProperty(exports, 'shutdownAsyncRuntime', {
  enumerable: true,
  get: function () {
    return shutdownAsyncRuntime;
  }
});
Object.defineProperty(exports, 'startAsyncRuntime', {
  enumerable: true,
  get: function () {
    return startAsyncRuntime;
  }
});
Object.defineProperty(exports, 'transform', {
  enumerable: true,
  get: function () {
    return transform;
  }
});