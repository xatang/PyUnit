const require_chunk = require('./shared/chunk-DDkG_k5U.cjs');
const require_misc = require('./shared/misc-DksvspN4.cjs');
const __rolldown_pluginutils = require_chunk.__toESM(require("@rolldown/pluginutils"));

//#region src/plugin/with-filter.ts
function withFilterImpl(pluginOption, filterObjectList) {
	if (require_misc.isPromiseLike(pluginOption)) return pluginOption.then((p) => withFilter(p, filterObjectList));
	if (pluginOption == false || pluginOption == null) return pluginOption;
	if (Array.isArray(pluginOption)) return pluginOption.map((p) => withFilter(p, filterObjectList));
	let plugin = pluginOption;
	let filterObjectIndex = findMatchedFilterObject(plugin.name, filterObjectList);
	if (filterObjectIndex === -1) return plugin;
	let filterObject = filterObjectList[filterObjectIndex];
	Object.keys(plugin).forEach((key) => {
		switch (key) {
			case "transform":
			case "resolveId":
			case "load":
				if (!plugin[key]) return;
				if (typeof plugin[key] === "object") plugin[key].filter = filterObject[key] ?? plugin[key].filter;
				else plugin[key] = {
					handler: plugin[key],
					filter: filterObject[key]
				};
				break;
			default: break;
		}
	});
	return plugin;
}
function withFilter(pluginOption, filterObject) {
	return withFilterImpl(pluginOption, require_misc.arraify(filterObject));
}
function findMatchedFilterObject(pluginName, overrideFilterObjectList) {
	if (overrideFilterObjectList.length === 1 && overrideFilterObjectList[0].pluginNamePattern === void 0) return 0;
	for (let i = 0; i < overrideFilterObjectList.length; i++) for (let j = 0; j < (overrideFilterObjectList[i].pluginNamePattern ?? []).length; j++) {
		let pattern = overrideFilterObjectList[i].pluginNamePattern[j];
		if (typeof pattern === "string" && pattern === pluginName) return i;
		else if (pattern instanceof RegExp && pattern.test(pluginName)) return i;
	}
	return -1;
}

//#endregion
Object.defineProperty(exports, 'and', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.and;
  }
});
Object.defineProperty(exports, 'code', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.code;
  }
});
Object.defineProperty(exports, 'exclude', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.exclude;
  }
});
Object.defineProperty(exports, 'id', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.id;
  }
});
Object.defineProperty(exports, 'include', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.include;
  }
});
Object.defineProperty(exports, 'moduleType', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.moduleType;
  }
});
Object.defineProperty(exports, 'not', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.not;
  }
});
Object.defineProperty(exports, 'or', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.or;
  }
});
Object.defineProperty(exports, 'queries', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.queries;
  }
});
Object.defineProperty(exports, 'query', {
  enumerable: true,
  get: function () {
    return __rolldown_pluginutils.query;
  }
});
exports.withFilter = withFilter;