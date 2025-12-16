
//#region src/utils/misc.ts
function arraify(value) {
	return Array.isArray(value) ? value : [value];
}
function isPromiseLike(value) {
	return value && (typeof value === "object" || typeof value === "function") && typeof value.then === "function";
}
function unimplemented(info) {
	if (info) throw new Error(`unimplemented: ${info}`);
	throw new Error("unimplemented");
}
function unreachable(info) {
	if (info) throw new Error(`unreachable: ${info}`);
	throw new Error("unreachable");
}
function unsupported(info) {
	throw new Error(`UNSUPPORTED: ${info}`);
}
function noop(..._args) {}

//#endregion
Object.defineProperty(exports, 'arraify', {
  enumerable: true,
  get: function () {
    return arraify;
  }
});
Object.defineProperty(exports, 'isPromiseLike', {
  enumerable: true,
  get: function () {
    return isPromiseLike;
  }
});
Object.defineProperty(exports, 'noop', {
  enumerable: true,
  get: function () {
    return noop;
  }
});
Object.defineProperty(exports, 'unimplemented', {
  enumerable: true,
  get: function () {
    return unimplemented;
  }
});
Object.defineProperty(exports, 'unreachable', {
  enumerable: true,
  get: function () {
    return unreachable;
  }
});
Object.defineProperty(exports, 'unsupported', {
  enumerable: true,
  get: function () {
    return unsupported;
  }
});