import {
  __commonJS,
  __name,
  __spreadProps,
  __spreadValues
} from "./chunk-KQSGOR2U.js";

// node_modules/highcharts/highcharts.js
var require_highcharts = __commonJS({
  "node_modules/highcharts/highcharts.js"(exports, module) {
    !/**
    * Highcharts JS v12.4.0 (2025-09-04)
    * @module highcharts/highcharts
    *
    * (c) 2009-2025 Highsoft AS
    *
    * License: www.highcharts.com/license
    */
    (function(t, e) {
      "object" == typeof exports && "object" == typeof module ? (t._Highcharts = e(), module.exports = t._Highcharts) : "function" == typeof define && define.amd ? define("highcharts/highcharts", [], e) : "object" == typeof exports ? (t._Highcharts = e(), exports.highcharts = t._Highcharts) : (t.Highcharts && t.Highcharts.error(16, true), t.Highcharts = e());
    })("undefined" == typeof window ? exports : window, () => (() => {
      "use strict";
      var _a, _b, _c, _d, _e, _f;
      let t, e;
      var i, s, o, r, a, n, h, l, d, c, p, g, u, f, m, x, y, b, v = {};
      v.d = (t10, e10) => {
        for (var i10 in e10) v.o(e10, i10) && !v.o(t10, i10) && Object.defineProperty(t10, i10, { enumerable: true, get: e10[i10] });
      }, v.o = (t10, e10) => Object.prototype.hasOwnProperty.call(t10, e10);
      var k = {};
      v.d(k, { default: /* @__PURE__ */ __name(() => lI, "default") }), (function(t10) {
        t10.SVG_NS = "http://www.w3.org/2000/svg", t10.product = "Highcharts", t10.version = "12.4.0", t10.win = "undefined" != typeof window ? window : {}, t10.doc = t10.win.document, t10.svg = !!t10.doc?.createElementNS?.(t10.SVG_NS, "svg")?.createSVGRect, t10.pageLang = t10.doc?.documentElement?.closest("[lang]")?.lang, t10.userAgent = t10.win.navigator?.userAgent || "", t10.isChrome = t10.win.chrome, t10.isFirefox = -1 !== t10.userAgent.indexOf("Firefox"), t10.isMS = /(edge|msie|trident)/i.test(t10.userAgent) && !t10.win.opera, t10.isSafari = !t10.isChrome && -1 !== t10.userAgent.indexOf("Safari"), t10.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(t10.userAgent), t10.isWebKit = -1 !== t10.userAgent.indexOf("AppleWebKit"), t10.deg2rad = 2 * Math.PI / 360, t10.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"], t10.noop = function() {
        }, t10.supportsPassiveEvents = (function() {
          let e10 = false;
          if (!t10.isMS) {
            let i10 = Object.defineProperty({}, "passive", { get: /* @__PURE__ */ __name(function() {
              e10 = true;
            }, "get") });
            t10.win.addEventListener && t10.win.removeEventListener && (t10.win.addEventListener("testPassive", t10.noop, i10), t10.win.removeEventListener("testPassive", t10.noop, i10));
          }
          return e10;
        })(), t10.charts = [], t10.composed = [], t10.dateFormats = {}, t10.seriesTypes = {}, t10.symbolSizes = {}, t10.chartCount = 0;
      })(i || (i = {}));
      let w = i, { charts: M, doc: S, win: T } = w;
      function C(t10, e10, i10, s10) {
        let o10 = e10 ? "Highcharts error" : "Highcharts warning";
        32 === t10 && (t10 = `${o10}: Deprecated member`);
        let r10 = D(t10), a10 = r10 ? `${o10} #${t10}: www.highcharts.com/errors/${t10}/` : t10.toString();
        if (void 0 !== s10) {
          let t11 = "";
          r10 && (a10 += "?"), j(s10, function(e11, i11) {
            t11 += `
 - ${i11}: ${e11}`, r10 && (a10 += encodeURI(i11) + "=" + encodeURI(e11));
          }), a10 += t11;
        }
        U(w, "displayError", { chart: i10, code: t10, message: a10, params: s10 }, function() {
          if (e10) throw Error(a10);
          T.console && -1 === C.messages.indexOf(a10) && console.warn(a10);
        }), C.messages.push(a10);
      }
      __name(C, "C");
      function A(t10, e10) {
        return parseInt(t10, e10 || 10);
      }
      __name(A, "A");
      function P(t10) {
        return "string" == typeof t10;
      }
      __name(P, "P");
      function L(t10) {
        let e10 = Object.prototype.toString.call(t10);
        return "[object Array]" === e10 || "[object Array Iterator]" === e10;
      }
      __name(L, "L");
      function O(t10, e10) {
        return !!t10 && "object" == typeof t10 && (!e10 || !L(t10));
      }
      __name(O, "O");
      function E(t10) {
        return O(t10) && "number" == typeof t10.nodeType;
      }
      __name(E, "E");
      function I(t10) {
        let e10 = t10?.constructor;
        return !!(O(t10, true) && !E(t10) && e10?.name && "Object" !== e10.name);
      }
      __name(I, "I");
      function D(t10) {
        return "number" == typeof t10 && !isNaN(t10) && t10 < 1 / 0 && t10 > -1 / 0;
      }
      __name(D, "D");
      function B(t10) {
        return null != t10;
      }
      __name(B, "B");
      function N(t10, e10, i10) {
        let s10, o10 = P(e10) && !B(i10), r10 = /* @__PURE__ */ __name((e11, i11) => {
          B(e11) ? t10.setAttribute(i11, e11) : o10 ? (s10 = t10.getAttribute(i11)) || "class" !== i11 || (s10 = t10.getAttribute(i11 + "Name")) : t10.removeAttribute(i11);
        }, "r");
        return P(e10) ? r10(i10, e10) : j(e10, r10), s10;
      }
      __name(N, "N");
      function z(t10) {
        return L(t10) ? t10 : [t10];
      }
      __name(z, "z");
      function R(t10, e10) {
        let i10;
        for (i10 in t10 || (t10 = {}), e10) t10[i10] = e10[i10];
        return t10;
      }
      __name(R, "R");
      function W() {
        let t10 = arguments, e10 = t10.length;
        for (let i10 = 0; i10 < e10; i10++) {
          let e11 = t10[i10];
          if (null != e11) return e11;
        }
      }
      __name(W, "W");
      function H(t10, e10) {
        R(t10.style, e10);
      }
      __name(H, "H");
      function X(t10) {
        return Math.pow(10, Math.floor(Math.log(t10) / Math.LN10));
      }
      __name(X, "X");
      function F(t10, e10) {
        return t10 > 1e14 ? t10 : parseFloat(t10.toPrecision(e10 || 14));
      }
      __name(F, "F");
      (C || (C = {})).messages = [], Math.easeInOutSine = function(t10) {
        return -0.5 * (Math.cos(Math.PI * t10) - 1);
      };
      let G = Array.prototype.find ? function(t10, e10) {
        return t10.find(e10);
      } : function(t10, e10) {
        let i10, s10 = t10.length;
        for (i10 = 0; i10 < s10; i10++) if (e10(t10[i10], i10)) return t10[i10];
      };
      function j(t10, e10, i10) {
        for (let s10 in t10) Object.hasOwnProperty.call(t10, s10) && e10.call(i10 || t10[s10], t10[s10], s10, t10);
      }
      __name(j, "j");
      function Y(t10, e10, i10) {
        function s10(e11, i11) {
          let s11 = t10.removeEventListener;
          s11 && s11.call(t10, e11, i11, false);
        }
        __name(s10, "s");
        function o10(i11) {
          let o11, r11;
          t10.nodeName && (e10 ? (o11 = {})[e10] = true : o11 = i11, j(o11, function(t11, e11) {
            if (i11[e11]) for (r11 = i11[e11].length; r11--; ) s10(e11, i11[e11][r11].fn);
          }));
        }
        __name(o10, "o");
        let r10 = "function" == typeof t10 && t10.prototype || t10;
        if (Object.hasOwnProperty.call(r10, "hcEvents")) {
          let t11 = r10.hcEvents;
          if (e10) {
            let r11 = t11[e10] || [];
            i10 ? (t11[e10] = r11.filter(function(t12) {
              return i10 !== t12.fn;
            }), s10(e10, i10)) : (o10(t11), t11[e10] = []);
          } else o10(t11), delete r10.hcEvents;
        }
      }
      __name(Y, "Y");
      function U(t10, e10, i10, s10) {
        if (i10 = i10 || {}, S?.createEvent && (t10.dispatchEvent || t10.fireEvent && t10 !== w)) {
          let s11 = S.createEvent("Events");
          s11.initEvent(e10, true, true), i10 = R(s11, i10), t10.dispatchEvent ? t10.dispatchEvent(i10) : t10.fireEvent(e10, i10);
        } else if (t10.hcEvents) {
          i10.target || R(i10, { preventDefault: /* @__PURE__ */ __name(function() {
            i10.defaultPrevented = true;
          }, "preventDefault"), target: t10, type: e10 });
          let s11 = [], o10 = t10, r10 = false;
          for (; o10.hcEvents; ) Object.hasOwnProperty.call(o10, "hcEvents") && o10.hcEvents[e10] && (s11.length && (r10 = true), s11.unshift.apply(s11, o10.hcEvents[e10])), o10 = Object.getPrototypeOf(o10);
          r10 && s11.sort((t11, e11) => t11.order - e11.order), s11.forEach((e11) => {
            false === e11.fn.call(t10, i10) && i10.preventDefault();
          });
        }
        s10 && !i10.defaultPrevented && s10.call(t10, i10);
      }
      __name(U, "U");
      let $ = (function() {
        let e10 = Math.random().toString(36).substring(2, 9) + "-", i10 = 0;
        return function() {
          return "highcharts-" + (t ? "" : e10) + i10++;
        };
      })();
      T.jQuery && (T.jQuery.fn.highcharts = function() {
        let t10 = [].slice.call(arguments);
        if (this[0]) return t10[0] ? (new w[P(t10[0]) ? t10.shift() : "Chart"](this[0], t10[0], t10[1]), this) : M[N(this[0], "data-highcharts-chart")];
      });
      let V = { addEvent: /* @__PURE__ */ __name(function(t10, e10, i10, s10 = {}) {
        let o10 = "function" == typeof t10 && t10.prototype || t10;
        Object.hasOwnProperty.call(o10, "hcEvents") || (o10.hcEvents = {});
        let r10 = o10.hcEvents;
        w.Point && t10 instanceof w.Point && t10.series && t10.series.chart && (t10.series.chart.runTrackerClick = true);
        let a10 = t10.addEventListener;
        a10 && a10.call(t10, e10, i10, !!w.supportsPassiveEvents && { passive: void 0 === s10.passive ? -1 !== e10.indexOf("touch") : s10.passive, capture: false }), r10[e10] || (r10[e10] = []);
        let n10 = { fn: i10, order: "number" == typeof s10.order ? s10.order : 1 / 0 };
        return r10[e10].push(n10), r10[e10].sort((t11, e11) => t11.order - e11.order), function() {
          Y(t10, e10, i10);
        };
      }, "addEvent"), arrayMax: /* @__PURE__ */ __name(function(t10) {
        let e10 = t10.length, i10 = t10[0];
        for (; e10--; ) t10[e10] > i10 && (i10 = t10[e10]);
        return i10;
      }, "arrayMax"), arrayMin: /* @__PURE__ */ __name(function(t10) {
        let e10 = t10.length, i10 = t10[0];
        for (; e10--; ) t10[e10] < i10 && (i10 = t10[e10]);
        return i10;
      }, "arrayMin"), attr: N, clamp: /* @__PURE__ */ __name(function(t10, e10, i10) {
        return t10 > e10 ? t10 < i10 ? t10 : i10 : e10;
      }, "clamp"), clearTimeout: /* @__PURE__ */ __name(function(t10) {
        B(t10) && clearTimeout(t10);
      }, "clearTimeout"), correctFloat: F, createElement: /* @__PURE__ */ __name(function(t10, e10, i10, s10, o10) {
        let r10 = S.createElement(t10);
        return e10 && R(r10, e10), o10 && H(r10, { padding: "0", border: "none", margin: "0" }), i10 && H(r10, i10), s10 && s10.appendChild(r10), r10;
      }, "createElement"), crisp: /* @__PURE__ */ __name(function(t10, e10 = 0, i10) {
        let s10 = e10 % 2 / 2, o10 = i10 ? -1 : 1;
        return (Math.round(t10 * o10 - s10) + s10) * o10;
      }, "crisp"), css: H, defined: B, destroyObjectProperties: /* @__PURE__ */ __name(function(t10, e10, i10) {
        j(t10, function(s10, o10) {
          s10 !== e10 && s10?.destroy && s10.destroy(), (s10?.destroy || !i10) && delete t10[o10];
        });
      }, "destroyObjectProperties"), diffObjects: /* @__PURE__ */ __name(function(t10, e10, i10, s10) {
        let o10 = {};
        return !(/* @__PURE__ */ __name(function t11(e11, o11, r10, a10) {
          let n10 = i10 ? o11 : e11;
          j(e11, function(i11, h10) {
            if (!a10 && s10 && s10.indexOf(h10) > -1 && o11[h10]) {
              i11 = z(i11), r10[h10] = [];
              for (let e12 = 0; e12 < Math.max(i11.length, o11[h10].length); e12++) o11[h10][e12] && (void 0 === i11[e12] ? r10[h10][e12] = o11[h10][e12] : (r10[h10][e12] = {}, t11(i11[e12], o11[h10][e12], r10[h10][e12], a10 + 1)));
            } else O(i11, true) && !i11.nodeType ? (r10[h10] = L(i11) ? [] : {}, t11(i11, o11[h10] || {}, r10[h10], a10 + 1), 0 === Object.keys(r10[h10]).length && ("colorAxis" !== h10 || 0 !== a10) && delete r10[h10]) : (e11[h10] !== o11[h10] || h10 in e11 && !(h10 in o11)) && "__proto__" !== h10 && "constructor" !== h10 && (r10[h10] = n10[h10]);
          });
        }, "t"))(t10, e10, o10, 0), o10;
      }, "diffObjects"), discardElement: /* @__PURE__ */ __name(function(t10) {
        t10?.parentElement?.removeChild(t10);
      }, "discardElement"), erase: /* @__PURE__ */ __name(function(t10, e10) {
        let i10 = t10.length;
        for (; i10--; ) if (t10[i10] === e10) {
          t10.splice(i10, 1);
          break;
        }
      }, "erase"), error: C, extend: R, extendClass: /* @__PURE__ */ __name(function(t10, e10) {
        let i10 = /* @__PURE__ */ __name(function() {
        }, "i");
        return i10.prototype = new t10(), R(i10.prototype, e10), i10;
      }, "extendClass"), find: G, fireEvent: U, getAlignFactor: /* @__PURE__ */ __name((t10 = "") => ({ center: 0.5, right: 1, middle: 0.5, bottom: 1 })[t10] || 0, "getAlignFactor"), getClosestDistance: /* @__PURE__ */ __name(function(t10, e10) {
        let i10, s10, o10, r10, a10 = !e10;
        return t10.forEach((t11) => {
          if (t11.length > 1) for (r10 = s10 = t11.length - 1; r10 > 0; r10--) (o10 = t11[r10] - t11[r10 - 1]) < 0 && !a10 ? (e10?.(), e10 = void 0) : o10 && (void 0 === i10 || o10 < i10) && (i10 = o10);
        }), i10;
      }, "getClosestDistance"), getMagnitude: X, getNestedProperty: /* @__PURE__ */ __name(function(t10, e10) {
        let i10 = t10.split(".");
        for (; i10.length && B(e10); ) {
          let t11 = i10.shift();
          if (void 0 === t11 || "__proto__" === t11) return;
          if ("this" === t11) {
            let t12;
            return O(e10) && (t12 = e10["@this"]), t12 ?? e10;
          }
          let s10 = e10[t11.replace(/[\\'"]/g, "")];
          if (!B(s10) || "function" == typeof s10 || "number" == typeof s10.nodeType || s10 === T) return;
          e10 = s10;
        }
        return e10;
      }, "getNestedProperty"), getStyle: /* @__PURE__ */ __name(function t10(e10, i10, s10) {
        let o10;
        if ("width" === i10) {
          let i11 = Math.min(e10.offsetWidth, e10.scrollWidth), s11 = e10.getBoundingClientRect?.().width;
          return s11 < i11 && s11 >= i11 - 1 && (i11 = Math.floor(s11)), Math.max(0, i11 - (t10(e10, "padding-left", true) || 0) - (t10(e10, "padding-right", true) || 0));
        }
        if ("height" === i10) return Math.max(0, Math.min(e10.offsetHeight, e10.scrollHeight) - (t10(e10, "padding-top", true) || 0) - (t10(e10, "padding-bottom", true) || 0));
        let r10 = T.getComputedStyle(e10, void 0);
        return r10 && (o10 = r10.getPropertyValue(i10), W(s10, "opacity" !== i10) && (o10 = A(o10))), o10;
      }, "t"), insertItem: /* @__PURE__ */ __name(function(t10, e10) {
        let i10, s10 = t10.options.index, o10 = e10.length;
        for (i10 = t10.options.isInternal ? o10 : 0; i10 < o10 + 1; i10++) if (!e10[i10] || D(s10) && s10 < W(e10[i10].options.index, e10[i10]._i) || e10[i10].options.isInternal) {
          e10.splice(i10, 0, t10);
          break;
        }
        return i10;
      }, "insertItem"), isArray: L, isClass: I, isDOMElement: E, isFunction: /* @__PURE__ */ __name(function(t10) {
        return "function" == typeof t10;
      }, "isFunction"), isNumber: D, isObject: O, isString: P, merge: /* @__PURE__ */ __name(function(t10, ...e10) {
        let i10, s10 = [t10, ...e10], o10 = {}, r10 = /* @__PURE__ */ __name(function(t11, e11) {
          return "object" != typeof t11 && (t11 = {}), j(e11, function(i11, s11) {
            "__proto__" !== s11 && "constructor" !== s11 && (!O(i11, true) || I(i11) || E(i11) ? t11[s11] = e11[s11] : t11[s11] = r10(t11[s11] || {}, i11));
          }), t11;
        }, "r");
        true === t10 && (o10 = s10[1], s10 = Array.prototype.slice.call(s10, 2));
        let a10 = s10.length;
        for (i10 = 0; i10 < a10; i10++) o10 = r10(o10, s10[i10]);
        return o10;
      }, "merge"), normalizeTickInterval: /* @__PURE__ */ __name(function(t10, e10, i10, s10, o10) {
        let r10, a10 = t10;
        i10 = W(i10, X(t10));
        let n10 = t10 / i10;
        for (!e10 && (e10 = o10 ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], false === s10 && (1 === i10 ? e10 = e10.filter(function(t11) {
          return t11 % 1 == 0;
        }) : i10 <= 0.1 && (e10 = [1 / i10]))), r10 = 0; r10 < e10.length && (a10 = e10[r10], (!o10 || !(a10 * i10 >= t10)) && (o10 || !(n10 <= (e10[r10] + (e10[r10 + 1] || e10[r10])) / 2))); r10++) ;
        return F(a10 * i10, -Math.round(Math.log(1e-3) / Math.LN10));
      }, "normalizeTickInterval"), objectEach: j, offset: /* @__PURE__ */ __name(function(t10) {
        let e10 = S.documentElement, i10 = t10.parentElement || t10.parentNode ? t10.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
        return { top: i10.top + (T.pageYOffset || e10.scrollTop) - (e10.clientTop || 0), left: i10.left + (T.pageXOffset || e10.scrollLeft) - (e10.clientLeft || 0), width: i10.width, height: i10.height };
      }, "offset"), pad: /* @__PURE__ */ __name(function(t10, e10, i10) {
        return Array((e10 || 2) + 1 - String(t10).replace("-", "").length).join(i10 || "0") + t10;
      }, "pad"), pick: W, pInt: A, pushUnique: /* @__PURE__ */ __name(function(t10, e10) {
        return 0 > t10.indexOf(e10) && !!t10.push(e10);
      }, "pushUnique"), relativeLength: /* @__PURE__ */ __name(function(t10, e10, i10) {
        return /%$/.test(t10) ? e10 * parseFloat(t10) / 100 + (i10 || 0) : parseFloat(t10);
      }, "relativeLength"), removeEvent: Y, replaceNested: /* @__PURE__ */ __name(function(t10, ...e10) {
        let i10, s10;
        do
          for (s10 of (i10 = t10, e10)) t10 = t10.replace(s10[0], s10[1]);
        while (t10 !== i10);
        return t10;
      }, "replaceNested"), splat: z, stableSort: /* @__PURE__ */ __name(function(t10, e10) {
        let i10, s10, o10 = t10.length;
        for (s10 = 0; s10 < o10; s10++) t10[s10].safeI = s10;
        for (t10.sort(function(t11, s11) {
          return 0 === (i10 = e10(t11, s11)) ? t11.safeI - s11.safeI : i10;
        }), s10 = 0; s10 < o10; s10++) delete t10[s10].safeI;
      }, "stableSort"), syncTimeout: /* @__PURE__ */ __name(function(t10, e10, i10) {
        return e10 > 0 ? setTimeout(t10, e10, i10) : (t10.call(0, i10), -1);
      }, "syncTimeout"), timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }, ucfirst: /* @__PURE__ */ __name(function(t10) {
        return P(t10) ? t10.substring(0, 1).toUpperCase() + t10.substring(1) : String(t10);
      }, "ucfirst"), uniqueKey: $, useSerialIds: /* @__PURE__ */ __name(function(e10) {
        return t = W(e10, t);
      }, "useSerialIds"), wrap: /* @__PURE__ */ __name(function(t10, e10, i10) {
        let s10 = t10[e10];
        t10[e10] = function() {
          let t11 = arguments, e11 = this;
          return i10.apply(this, [function() {
            return s10.apply(e11, arguments.length ? arguments : t11);
          }].concat([].slice.call(arguments)));
        };
      }, "wrap") }, { pageLang: Z, win: _ } = w, { defined: q, error: K, extend: J, isNumber: Q, isObject: tt, isString: te, merge: ti, objectEach: ts, pad: to, splat: tr, timeUnits: ta, ucfirst: tn } = V, th = w.isSafari && _.Intl && !_.Intl.DateTimeFormat.prototype.formatRange, tl = /* @__PURE__ */ __name((t10) => void 0 === t10.main, "tl"), td = (_a = class {
        constructor(t10, e10) {
          this.options = { timezone: "UTC" }, this.variableTimezone = false, this.Date = _.Date, this.update(t10), this.lang = e10;
        }
        update(t10 = {}) {
          this.dTLCache = {}, this.options = t10 = ti(true, this.options, t10);
          let { timezoneOffset: e10, useUTC: i10, locale: s10 } = t10;
          this.Date = t10.Date || _.Date || Date;
          let o10 = t10.timezone;
          q(i10) && (o10 = i10 ? "UTC" : void 0), e10 && e10 % 60 == 0 && (o10 = "Etc/GMT" + (e10 > 0 ? "+" : "") + e10 / 60), this.variableTimezone = "UTC" !== o10 && o10?.indexOf("Etc/GMT") !== 0, this.timezone = o10, this.lang && s10 && (this.lang.locale = s10), ["months", "shortMonths", "weekdays", "shortWeekdays"].forEach((t11) => {
            let e11 = /months/i.test(t11), i11 = /short/.test(t11), s11 = { timeZone: "UTC" };
            s11[e11 ? "month" : "weekday"] = i11 ? "short" : "long", this[t11] = (e11 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [3, 4, 5, 6, 7, 8, 9]).map((t12) => this.dateFormat(s11, (e11 ? 31 : 1) * 24 * 36e5 * t12));
          });
        }
        toParts(t10) {
          let [e10, i10, s10, o10, r10, a10, n10] = this.dateTimeFormat({ weekday: "narrow", day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }, t10, "es").split(/(?:, | |\/|:)/g);
          return [o10, s10 - 1, i10, r10, a10, n10, Math.floor(Number(t10) || 0) % 1e3, "DLMXJVS".indexOf(e10)].map(Number);
        }
        dateTimeFormat(t10, e10, i10 = this.options.locale || Z) {
          let s10 = JSON.stringify(t10) + i10;
          te(t10) && (t10 = this.str2dtf(t10));
          let o10 = this.dTLCache[s10];
          if (!o10) {
            t10.timeZone ?? (t10.timeZone = this.timezone);
            try {
              o10 = new Intl.DateTimeFormat(i10, t10);
            } catch (e11) {
              /Invalid time zone/i.test(e11.message) ? (K(34), t10.timeZone = "UTC", o10 = new Intl.DateTimeFormat(i10, t10)) : K(e11.message, false);
            }
          }
          return this.dTLCache[s10] = o10, o10?.format(e10) || "";
        }
        str2dtf(t10, e10 = {}) {
          let i10 = { L: { fractionalSecondDigits: 3 }, S: { second: "2-digit" }, M: { minute: "numeric" }, H: { hour: "2-digit" }, k: { hour: "numeric" }, E: { weekday: "narrow" }, a: { weekday: "short" }, A: { weekday: "long" }, d: { day: "2-digit" }, e: { day: "numeric" }, b: { month: "short" }, B: { month: "long" }, m: { month: "2-digit" }, o: { month: "numeric" }, y: { year: "2-digit" }, Y: { year: "numeric" } };
          return Object.keys(i10).forEach((s10) => {
            -1 !== t10.indexOf(s10) && J(e10, i10[s10]);
          }), e10;
        }
        makeTime(t10, e10, i10 = 1, s10 = 0, o10, r10, a10) {
          let n10 = this.Date.UTC(t10, e10, i10, s10, o10 || 0, r10 || 0, a10 || 0);
          if ("UTC" !== this.timezone) {
            let t11 = this.getTimezoneOffset(n10);
            if (n10 += t11, -1 !== [2, 3, 8, 9, 10, 11].indexOf(e10) && (s10 < 5 || s10 > 20)) {
              let e11 = this.getTimezoneOffset(n10);
              t11 !== e11 ? n10 += e11 - t11 : t11 - 36e5 !== this.getTimezoneOffset(n10 - 36e5) || th || (n10 -= 36e5);
            }
          }
          return n10;
        }
        parse(t10) {
          if (!te(t10)) return t10 ?? void 0;
          let e10 = (t10 = t10.replace(/\//g, "-").replace(/(GMT|UTC)/, "")).indexOf("Z") > -1 || /([+-][0-9]{2}):?[0-9]{2}$/.test(t10), i10 = /^[0-9]{4}-[0-9]{2}(-[0-9]{2}|)$/.test(t10);
          e10 || i10 || (t10 += "Z");
          let s10 = Date.parse(t10);
          if (Q(s10)) return s10 + (!e10 || i10 ? this.getTimezoneOffset(s10) : 0);
        }
        getTimezoneOffset(t10) {
          if ("UTC" !== this.timezone) {
            let [e10, i10, s10, o10, r10 = 0] = this.dateTimeFormat({ timeZoneName: "shortOffset" }, t10, "en").split(/(GMT|:)/).map(Number), a10 = -(60 * (s10 + r10 / 60) * 6e4);
            if (Q(a10)) return a10;
          }
          return 0;
        }
        dateFormat(t10, e10, i10) {
          let s10 = this.lang;
          if (!q(e10) || isNaN(e10)) return s10?.invalidDate || "";
          if (te(t10 = t10 ?? "%Y-%m-%d %H:%M:%S")) {
            let i11, o10 = /%\[([a-zA-Z]+)\]/g;
            for (; i11 = o10.exec(t10); ) t10 = t10.replace(i11[0], this.dateTimeFormat(i11[1], e10, s10?.locale));
          }
          if (te(t10) && -1 !== t10.indexOf("%")) {
            let i11 = this, [o10, r10, a10, n10, h10, l2, d2, c2] = this.toParts(e10), p2 = s10?.weekdays || this.weekdays, g2 = s10?.shortWeekdays || this.shortWeekdays, u2 = s10?.months || this.months, f2 = s10?.shortMonths || this.shortMonths;
            ts(J({ a: g2 ? g2[c2] : p2[c2].substr(0, 3), A: p2[c2], d: to(a10), e: to(a10, 2, " "), w: c2, v: s10?.weekFrom ?? "", b: f2[r10], B: u2[r10], m: to(r10 + 1), o: r10 + 1, y: o10.toString().substr(2, 2), Y: o10, H: to(n10), k: n10, I: to(n10 % 12 || 12), l: n10 % 12 || 12, M: to(h10), p: n10 < 12 ? "AM" : "PM", P: n10 < 12 ? "am" : "pm", S: to(l2), L: to(d2, 3) }, w.dateFormats), function(s11, o11) {
              if (te(t10)) for (; -1 !== t10.indexOf("%" + o11); ) t10 = t10.replace("%" + o11, "function" == typeof s11 ? s11.call(i11, e10) : s11);
            });
          } else if (tt(t10)) {
            let i11 = (this.getTimezoneOffset(e10) || 0) / 36e5, s11 = this.timezone || "Etc/GMT" + (i11 >= 0 ? "+" : "") + i11, { prefix: o10 = "", suffix: r10 = "" } = t10;
            t10 = o10 + this.dateTimeFormat(J({ timeZone: s11 }, t10), e10) + r10;
          }
          return i10 ? tn(t10) : t10;
        }
        resolveDTLFormat(t10) {
          return tt(t10, true) ? tt(t10, true) && tl(t10) ? { main: t10 } : t10 : { main: (t10 = tr(t10))[0], from: t10[1], to: t10[2] };
        }
        getDateFormat(t10, e10, i10, s10) {
          let o10 = this.dateFormat("%m-%d %H:%M:%S.%L", e10), r10 = "01-01 00:00:00.000", a10 = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, n10 = "millisecond", h10 = n10;
          for (n10 in ta) {
            if (t10 && t10 === ta.week && +this.dateFormat("%w", e10) === i10 && o10.substr(6) === r10.substr(6)) {
              n10 = "week";
              break;
            }
            if (t10 && ta[n10] > t10) {
              n10 = h10;
              break;
            }
            if (a10[n10] && o10.substr(a10[n10]) !== r10.substr(a10[n10])) break;
            "week" !== n10 && (h10 = n10);
          }
          return this.resolveDTLFormat(s10[n10]).main;
        }
      }, __name(_a, "td"), _a), { defined: tc, extend: tp, timeUnits: tg } = V, tu = (_b = class extends td {
        getTimeTicks(t10, e10, i10, s10) {
          let o10 = this, r10 = [], a10 = {}, { count: n10 = 1, unitRange: h10 } = t10, [l2, d2, c2, p2, g2, u2] = o10.toParts(e10), f2 = (e10 || 0) % 1e3, m2;
          if (s10 ?? (s10 = 1), tc(e10)) {
            if (f2 = h10 >= tg.second ? 0 : n10 * Math.floor(f2 / n10), h10 >= tg.second && (u2 = h10 >= tg.minute ? 0 : n10 * Math.floor(u2 / n10)), h10 >= tg.minute && (g2 = h10 >= tg.hour ? 0 : n10 * Math.floor(g2 / n10)), h10 >= tg.hour && (p2 = h10 >= tg.day ? 0 : n10 * Math.floor(p2 / n10)), h10 >= tg.day && (c2 = h10 >= tg.month ? 1 : Math.max(1, n10 * Math.floor(c2 / n10))), h10 >= tg.month && (d2 = h10 >= tg.year ? 0 : n10 * Math.floor(d2 / n10)), h10 >= tg.year && (l2 -= l2 % n10), h10 === tg.week) {
              n10 && (e10 = o10.makeTime(l2, d2, c2, p2, g2, u2, f2));
              let t12 = this.dateTimeFormat({ timeZone: this.timezone, weekday: "narrow" }, e10, "es"), i11 = "DLMXJVS".indexOf(t12);
              c2 += -i11 + s10 + (i11 < s10 ? -7 : 0);
            }
            e10 = o10.makeTime(l2, d2, c2, p2, g2, u2, f2), o10.variableTimezone && tc(i10) && (m2 = i10 - e10 > 4 * tg.month || o10.getTimezoneOffset(e10) !== o10.getTimezoneOffset(i10));
            let t11 = e10, x2 = 1;
            for (; t11 < i10; ) r10.push(t11), h10 === tg.year ? t11 = o10.makeTime(l2 + x2 * n10, 0) : h10 === tg.month ? t11 = o10.makeTime(l2, d2 + x2 * n10) : m2 && (h10 === tg.day || h10 === tg.week) ? t11 = o10.makeTime(l2, d2, c2 + x2 * n10 * (h10 === tg.day ? 1 : 7)) : m2 && h10 === tg.hour && n10 > 1 ? t11 = o10.makeTime(l2, d2, c2, p2 + x2 * n10) : t11 += h10 * n10, x2++;
            r10.push(t11), h10 <= tg.hour && r10.length < 1e4 && r10.forEach((t12) => {
              t12 % 18e5 == 0 && "000000000" === o10.dateFormat("%H%M%S%L", t12) && (a10[t12] = "day");
            });
          }
          return r10.info = tp(t10, { higherRanks: a10, totalRange: h10 * n10 }), r10;
        }
      }, __name(_b, "tu"), _b), { isTouchDevice: tf } = w, { fireEvent: tm, merge: tx } = V, ty = { colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"], symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { weekFrom: "week from", chartTitle: "Chart title", locale: void 0, loading: "Loading...", months: void 0, seriesName: "Series {add index 1}", shortMonths: void 0, weekdays: void 0, numericSymbols: ["k", "M", "G", "T", "P", "E"], pieSliceName: "Slice", resetZoom: "Reset zoom", yAxisTitle: "Values", resetZoomTitle: "Reset zoom level 1:1" }, global: { buttonTheme: { fill: "#f7f7f7", padding: 8, r: 2, stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontSize: "0.8em", fontWeight: "normal" }, states: { hover: { fill: "#e6e6e6" }, select: { fill: "#e6e9ff", style: { color: "#000000", fontWeight: "bold" } }, disabled: { style: { color: "#cccccc" } } } } }, time: { Date: void 0, timezone: "UTC", timezoneOffset: 0, useUTC: void 0 }, chart: { alignThresholds: false, panning: { enabled: false, type: "x" }, styledMode: false, borderRadius: 0, colorCount: 10, allowMutatingData: true, ignoreHiddenSeries: true, spacing: [10, 10, 15, 10], resetZoomButton: { theme: {}, position: {} }, reflow: true, type: "line", zooming: { singleTouch: false, resetButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } } }, width: null, height: null, borderColor: "#334eff", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: { style: { color: "#333333", fontWeight: "bold" }, text: "Chart title", margin: 15, minScale: 0.67 }, subtitle: { style: { color: "#666666", fontSize: "0.8em" }, text: "" }, caption: { margin: 15, style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, legend: { enabled: true, align: "center", alignColumns: true, className: "highcharts-no-tooltip", events: {}, layout: "horizontal", itemMarginBottom: 2, itemMarginTop: 2, labelFormatter: /* @__PURE__ */ __name(function() {
        return this.name;
      }, "labelFormatter"), borderColor: "#999999", borderRadius: 0, navigation: { style: { fontSize: "0.8em" }, activeColor: "#0022ff", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "0.8em", textDecoration: "none", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#666666", textDecoration: "line-through" }, shadow: false, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: true, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { color: "#333333", fontSize: "0.8em", fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } }, tooltip: { enabled: true, animation: { duration: 300, easing: /* @__PURE__ */ __name((t10) => Math.sqrt(1 - Math.pow(t10 - 1, 2)), "easing") }, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%[AebHMSL]", second: "%[AebHMS]", minute: "%[AebHM]", hour: "%[AebHM]", day: "%[AebY]", week: "%v %[AebY]", month: "%[BY]", year: "%Y" }, footerFormat: "", headerShape: "callout", hideDelay: 500, padding: 8, position: { x: 0, y: 3 }, shared: false, snap: tf ? 25 : 10, headerFormat: '<span style="font-size: 0.8em">{ucfirst point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: "#ffffff", borderWidth: void 0, stickOnContact: false, style: { color: "#333333", cursor: "default", fontSize: "0.8em" }, useHTML: false }, credits: { enabled: true, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" }, text: "Highcharts.com" } }, tb = new tu(ty.time, ty.lang), tv = { defaultOptions: ty, defaultTime: tb, getOptions: /* @__PURE__ */ __name(function() {
        return ty;
      }, "getOptions"), setOptions: /* @__PURE__ */ __name(function(t10) {
        return tm(w, "setOptions", { options: t10 }), tx(true, ty, t10), t10.time && tb.update(ty.time), t10.lang && "locale" in t10.lang && tb.update({ locale: t10.lang.locale }), t10.lang?.chartTitle && (ty.title = __spreadProps(__spreadValues({}, ty.title), { text: t10.lang.chartTitle })), ty;
      }, "setOptions") }, { win: tk } = w, { isNumber: tw, isString: tM, merge: tS, pInt: tT, defined: tC } = V, tA = /* @__PURE__ */ __name((t10, e10, i10) => `color-mix(in srgb,${t10},${e10} ${100 * i10}%)`, "tA"), tP = /* @__PURE__ */ __name((t10) => tM(t10) && !!t10 && "none" !== t10, "tP");
      const _tL = class _tL {
        static parse(t10) {
          return t10 ? new _tL(t10) : _tL.None;
        }
        constructor(t10) {
          let e10, i10, s10, o10;
          this.rgba = [NaN, NaN, NaN, NaN], this.input = t10;
          let r10 = w.Color;
          if (r10 && r10 !== _tL) return new r10(t10);
          if ("object" == typeof t10 && void 0 !== t10.stops) this.stops = t10.stops.map((t11) => new _tL(t11[1]));
          else if ("string" == typeof t10) for (this.input = t10 = _tL.names[t10.toLowerCase()] || t10, s10 = _tL.parsers.length; s10-- && !i10; ) (e10 = (o10 = _tL.parsers[s10]).regex.exec(t10)) && (i10 = o10.parse(e10));
          i10 && (this.rgba = i10);
        }
        get(t10) {
          let e10 = this.input, i10 = this.rgba;
          if (this.output) return this.output;
          if ("object" == typeof e10 && void 0 !== this.stops) {
            let i11 = tS(e10);
            return i11.stops = [].slice.call(i11.stops), this.stops.forEach((e11, s10) => {
              i11.stops[s10] = [i11.stops[s10][0], e11.get(t10)];
            }), i11;
          }
          return i10 && tw(i10[0]) ? "rgb" !== t10 && (t10 || 1 !== i10[3]) ? "a" === t10 ? `${i10[3]}` : "rgba(" + i10.join(",") + ")" : "rgb(" + i10[0] + "," + i10[1] + "," + i10[2] + ")" : e10;
        }
        brighten(t10) {
          let e10 = this.rgba;
          if (this.stops) this.stops.forEach(function(e11) {
            e11.brighten(t10);
          });
          else if (tw(t10) && 0 !== t10) if (tw(e10[0])) for (let i10 = 0; i10 < 3; i10++) e10[i10] += tT(255 * t10), e10[i10] < 0 && (e10[i10] = 0), e10[i10] > 255 && (e10[i10] = 255);
          else _tL.useColorMix && tP(this.input) && (this.output = tA(this.input, t10 > 0 ? "white" : "black", Math.abs(t10)));
          return this;
        }
        setOpacity(t10) {
          return this.rgba[3] = t10, this;
        }
        tweenTo(t10, e10) {
          let i10 = this.rgba, s10 = t10.rgba;
          if (!tw(i10[0]) || !tw(s10[0])) return _tL.useColorMix && tP(this.input) && tP(t10.input) && e10 < 0.99 ? tA(this.input, t10.input, e10) : t10.input || "none";
          let o10 = 1 !== s10[3] || 1 !== i10[3], r10 = /* @__PURE__ */ __name((t11, s11) => t11 + (i10[s11] - t11) * (1 - e10), "r"), a10 = s10.slice(0, 3).map(r10).map(Math.round);
          return o10 && a10.push(r10(s10[3], 3)), (o10 ? "rgba(" : "rgb(") + a10.join(",") + ")";
        }
      };
      __name(_tL, "tL");
      let tL = _tL;
      tL.names = { white: "#ffffff", black: "#000000" }, tL.parsers = [{ regex: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?(?:\.\d+)?)\s*\)/, parse: /* @__PURE__ */ __name(function(t10) {
        return [tT(t10[1]), tT(t10[2]), tT(t10[3]), parseFloat(t10[4], 10)];
      }, "parse") }, { regex: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/, parse: /* @__PURE__ */ __name(function(t10) {
        return [tT(t10[1]), tT(t10[2]), tT(t10[3]), 1];
      }, "parse") }, { regex: /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i, parse: /* @__PURE__ */ __name(function(t10) {
        return [tT(t10[1] + t10[1], 16), tT(t10[2] + t10[2], 16), tT(t10[3] + t10[3], 16), tC(t10[4]) ? tT(t10[4] + t10[4], 16) / 255 : 1];
      }, "parse") }, { regex: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i, parse: /* @__PURE__ */ __name(function(t10) {
        return [tT(t10[1], 16), tT(t10[2], 16), tT(t10[3], 16), tC(t10[4]) ? tT(t10[4], 16) / 255 : 1];
      }, "parse") }], tL.useColorMix = tk.CSS?.supports("color", "color-mix(in srgb,red,blue 9%)"), tL.None = new tL("");
      let { parse: tO } = tL, { win: tE } = w, { isNumber: tI, objectEach: tD } = V;
      const _tB = class _tB {
        constructor(t10, e10, i10) {
          this.pos = NaN, this.options = e10, this.elem = t10, this.prop = i10;
        }
        dSetter() {
          let t10 = this.paths, e10 = t10?.[0], i10 = t10?.[1], s10 = this.now || 0, o10 = [];
          if (1 !== s10 && e10 && i10) if (e10.length === i10.length && s10 < 1) for (let t11 = 0; t11 < i10.length; t11++) {
            let r10 = e10[t11], a10 = i10[t11], n10 = [];
            for (let t12 = 0; t12 < a10.length; t12++) {
              let e11 = r10[t12], i11 = a10[t12];
              tI(e11) && tI(i11) && ("A" !== a10[0] || 4 !== t12 && 5 !== t12) ? n10[t12] = e11 + s10 * (i11 - e11) : n10[t12] = i11;
            }
            o10.push(n10);
          }
          else o10 = i10;
          else o10 = this.toD || [];
          this.elem.attr("d", o10, void 0, true);
        }
        update() {
          let t10 = this.elem, e10 = this.prop, i10 = this.now, s10 = this.options.step;
          this[e10 + "Setter"] ? this[e10 + "Setter"]() : t10.attr ? t10.element && t10.attr(e10, i10, null, true) : t10.style[e10] = i10 + this.unit, s10 && s10.call(t10, i10, this);
        }
        run(t10, e10, i10) {
          let s10 = this, o10 = s10.options, r10 = /* @__PURE__ */ __name(function(t11) {
            return !r10.stopped && s10.step(t11);
          }, "r"), a10 = tE.requestAnimationFrame || function(t11) {
            setTimeout(t11, 13);
          }, n10 = /* @__PURE__ */ __name(function() {
            for (let t11 = 0; t11 < _tB.timers.length; t11++) _tB.timers[t11]() || _tB.timers.splice(t11--, 1);
            _tB.timers.length && a10(n10);
          }, "n");
          t10 !== e10 || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +/* @__PURE__ */ new Date(), this.start = t10, this.end = e10, this.unit = i10, this.now = this.start, this.pos = 0, r10.elem = this.elem, r10.prop = this.prop, r10() && 1 === _tB.timers.push(r10) && a10(n10)) : (delete o10.curAnim[this.prop], o10.complete && 0 === Object.keys(o10.curAnim).length && o10.complete.call(this.elem));
        }
        step(t10) {
          let e10, i10, s10 = +/* @__PURE__ */ new Date(), o10 = this.options, r10 = this.elem, a10 = o10.complete, n10 = o10.duration, h10 = o10.curAnim;
          return r10.attr && !r10.element ? e10 = false : t10 || s10 >= n10 + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), h10[this.prop] = true, i10 = true, tD(h10, function(t11) {
            true !== t11 && (i10 = false);
          }), i10 && a10 && a10.call(r10), e10 = false) : (this.pos = o10.easing((s10 - this.startTime) / n10), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e10 = true), e10;
        }
        initPath(t10, e10, i10) {
          let s10 = t10.startX, o10 = t10.endX, r10 = i10.slice(), a10 = t10.isArea, n10 = a10 ? 2 : 1, h10 = e10 && i10.length > e10.length && i10.hasStackedCliffs, l2, d2, c2, p2, g2 = e10?.slice();
          if (!g2 || h10) return [r10, r10];
          function u2(t11, e11) {
            for (; t11.length < d2; ) {
              let i11 = t11[0], s11 = e11[d2 - t11.length];
              if (s11 && "M" === i11[0] && ("C" === s11[0] ? t11[0] = ["C", i11[1], i11[2], i11[1], i11[2], i11[1], i11[2]] : t11[0] = ["L", i11[1], i11[2]]), t11.unshift(i11), a10) {
                let e12 = t11.pop();
                t11.push(t11[t11.length - 1], e12);
              }
            }
          }
          __name(u2, "u");
          function f2(t11) {
            for (; t11.length < d2; ) {
              let e11 = t11[Math.floor(t11.length / n10) - 1].slice();
              if ("C" === e11[0] && (e11[1] = e11[5], e11[2] = e11[6]), a10) {
                let i11 = t11[Math.floor(t11.length / n10)].slice();
                t11.splice(t11.length / 2, 0, e11, i11);
              } else t11.push(e11);
            }
          }
          __name(f2, "f");
          if (s10 && o10 && o10.length) {
            for (c2 = 0; c2 < s10.length; c2++) if (s10[c2] === o10[0]) {
              l2 = c2;
              break;
            } else if (s10[0] === o10[o10.length - s10.length + c2]) {
              l2 = c2, p2 = true;
              break;
            } else if (s10[s10.length - 1] === o10[o10.length - s10.length + c2]) {
              l2 = s10.length - c2;
              break;
            }
            void 0 === l2 && (g2 = []);
          }
          return g2.length && tI(l2) && (d2 = r10.length + l2 * n10, p2 ? (u2(g2, r10), f2(r10)) : (u2(r10, g2), f2(g2))), [g2, r10];
        }
        fillSetter() {
          _tB.prototype.strokeSetter.apply(this, arguments);
        }
        strokeSetter() {
          this.elem.attr(this.prop, tO(this.start).tweenTo(tO(this.end), this.pos), void 0, true);
        }
      };
      __name(_tB, "tB");
      let tB = _tB;
      tB.timers = [];
      let { defined: tN, getStyle: tz, isArray: tR, isNumber: tW, isObject: tH, merge: tX, objectEach: tF, pick: tG } = V;
      function tj(t10) {
        return tH(t10) ? tX({ duration: 500, defer: 0 }, t10) : { duration: 500 * !!t10, defer: 0 };
      }
      __name(tj, "tj");
      function tY(t10, e10) {
        let i10 = tB.timers.length;
        for (; i10--; ) tB.timers[i10].elem !== t10 || e10 && e10 !== tB.timers[i10].prop || (tB.timers[i10].stopped = true);
      }
      __name(tY, "tY");
      let tU = { animate: /* @__PURE__ */ __name(function(t10, e10, i10) {
        let s10, o10 = "", r10, a10, n10;
        tH(i10) || (n10 = arguments, i10 = { duration: n10[2], easing: n10[3], complete: n10[4] }), tW(i10.duration) || (i10.duration = 400), i10.easing = "function" == typeof i10.easing ? i10.easing : Math[i10.easing] || Math.easeInOutSine, i10.curAnim = tX(e10), tF(e10, function(n11, h10) {
          tY(t10, h10), a10 = new tB(t10, i10, h10), r10 = void 0, "d" === h10 && tR(e10.d) ? (a10.paths = a10.initPath(t10, t10.pathArray, e10.d), a10.toD = e10.d, s10 = 0, r10 = 1) : t10.attr ? s10 = t10.attr(h10) : (s10 = parseFloat(tz(t10, h10)) || 0, "opacity" !== h10 && (o10 = "px")), r10 || (r10 = n11), "string" == typeof r10 && r10.match("px") && (r10 = r10.replace(/px/g, "")), a10.run(s10, r10, o10);
        });
      }, "animate"), animObject: tj, getDeferredAnimation: /* @__PURE__ */ __name(function(t10, e10, i10) {
        let s10 = tj(e10), o10 = i10 ? [i10] : t10.series, r10 = 0, a10 = 0;
        return o10.forEach((t11) => {
          let i11 = tj(t11.options.animation);
          r10 = tH(e10) && tN(e10.defer) ? s10.defer : Math.max(r10, i11.duration + i11.defer), a10 = Math.min(s10.duration, i11.duration);
        }), t10.renderer.forExport && (r10 = 0), { defer: Math.max(0, r10 - a10), duration: Math.min(r10, a10) };
      }, "getDeferredAnimation"), setAnimation: /* @__PURE__ */ __name(function(t10, e10) {
        e10.renderer.globalAnimation = tG(t10, e10.options.chart.animation, true);
      }, "setAnimation"), stop: tY }, { SVG_NS: t$, win: tV } = w, { attr: tZ, createElement: t_, css: tq, error: tK, isFunction: tJ, isString: tQ, objectEach: t0, splat: t1 } = V, { trustedTypes: t2 } = tV, t3 = t2 && tJ(t2.createPolicy) && t2.createPolicy("highcharts", { createHTML: /* @__PURE__ */ __name((t10) => t10, "createHTML") }), t5 = t3 ? t3.createHTML("") : "";
      const _t6 = class _t6 {
        static filterUserAttributes(t10) {
          return t0(t10, (e10, i10) => {
            let s10 = true;
            -1 === _t6.allowedAttributes.indexOf(i10) && (s10 = false), -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(i10) && (s10 = tQ(e10) && _t6.allowedReferences.some((t11) => 0 === e10.indexOf(t11))), s10 || (tK(33, false, void 0, { "Invalid attribute in config": `${i10}` }), delete t10[i10]), tQ(e10) && t10[i10] && (t10[i10] = e10.replace(/</g, "&lt;"));
          }), t10;
        }
        static parseStyle(t10) {
          return t10.split(";").reduce((t11, e10) => {
            let i10 = e10.split(":").map((t12) => t12.trim()), s10 = i10.shift();
            return s10 && i10.length && (t11[s10.replace(/-([a-z])/g, (t12) => t12[1].toUpperCase())] = i10.join(":")), t11;
          }, {});
        }
        static setElementHTML(t10, e10) {
          t10.innerHTML = _t6.emptyHTML, e10 && new _t6(e10).addToDOM(t10);
        }
        constructor(t10) {
          this.nodes = "string" == typeof t10 ? this.parseMarkup(t10) : t10;
        }
        addToDOM(t10) {
          return (/* @__PURE__ */ __name(function t11(e10, i10) {
            let s10;
            return t1(e10).forEach(function(e11) {
              let o10, r10 = e11.tagName, a10 = e11.textContent ? w.doc.createTextNode(e11.textContent) : void 0, n10 = _t6.bypassHTMLFiltering;
              if (r10) if ("#text" === r10) o10 = a10;
              else if (-1 !== _t6.allowedTags.indexOf(r10) || n10) {
                let s11 = "svg" === r10 ? t$ : i10.namespaceURI || t$, h10 = w.doc.createElementNS(s11, r10), l2 = e11.attributes || {};
                t0(e11, function(t12, e12) {
                  "tagName" !== e12 && "attributes" !== e12 && "children" !== e12 && "style" !== e12 && "textContent" !== e12 && (l2[e12] = t12);
                }), tZ(h10, n10 ? l2 : _t6.filterUserAttributes(l2)), e11.style && tq(h10, e11.style), a10 && h10.appendChild(a10), t11(e11.children || [], h10), o10 = h10;
              } else tK(33, false, void 0, { "Invalid tagName in config": r10 });
              o10 && i10.appendChild(o10), s10 = o10;
            }), s10;
          }, "t"))(this.nodes, t10);
        }
        parseMarkup(t10) {
          let e10, i10 = [];
          t10 = t10.trim().replace(/ style=(["'])/g, " data-style=$1");
          try {
            e10 = new DOMParser().parseFromString(t3 ? t3.createHTML(t10) : t10, "text/html");
          } catch {
          }
          if (!e10) {
            let i11 = t_("div");
            i11.innerHTML = t10, e10 = { body: i11 };
          }
          let s10 = /* @__PURE__ */ __name((t11, e11) => {
            let i11 = t11.nodeName.toLowerCase(), o10 = { tagName: i11 };
            "#text" === i11 && (o10.textContent = t11.textContent || "");
            let r10 = t11.attributes;
            if (r10) {
              let t12 = {};
              [].forEach.call(r10, (e12) => {
                "data-style" === e12.name ? o10.style = _t6.parseStyle(e12.value) : t12[e12.name] = e12.value;
              }), o10.attributes = t12;
            }
            if (t11.childNodes.length) {
              let e12 = [];
              [].forEach.call(t11.childNodes, (t12) => {
                s10(t12, e12);
              }), e12.length && (o10.children = e12);
            }
            e11.push(o10);
          }, "s");
          return [].forEach.call(e10.body.childNodes, (t11) => s10(t11, i10)), i10;
        }
      };
      __name(_t6, "t6");
      let t6 = _t6;
      t6.allowedAttributes = ["alt", "aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup", "aria-hidden", "aria-label", "aria-labelledby", "aria-live", "aria-pressed", "aria-readonly", "aria-roledescription", "aria-selected", "class", "clip-path", "color", "colspan", "cx", "cy", "d", "disabled", "dx", "dy", "fill", "filterUnits", "flood-color", "flood-opacity", "height", "href", "id", "in", "in2", "markerHeight", "markerWidth", "offset", "opacity", "operator", "orient", "padding", "paddingLeft", "paddingRight", "patternUnits", "r", "radius", "refX", "refY", "result", "role", "rowspan", "scope", "slope", "src", "startOffset", "stdDeviation", "stroke-linecap", "stroke-width", "stroke", "style", "summary", "tabindex", "tableValues", "target", "text-align", "text-anchor", "textAnchor", "textLength", "title", "type", "valign", "width", "x", "x1", "x2", "xlink:href", "y", "y1", "y2", "zIndex"], t6.allowedReferences = ["https://", "http://", "mailto:", "/", "../", "./", "#"], t6.allowedTags = ["#text", "a", "abbr", "b", "br", "button", "caption", "circle", "clipPath", "code", "dd", "defs", "div", "dl", "dt", "em", "feComponentTransfer", "feComposite", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMerge", "feMergeNode", "feMorphology", "feOffset", "filter", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "linearGradient", "marker", "ol", "p", "path", "pattern", "pre", "rect", "small", "span", "stop", "strong", "style", "sub", "sup", "svg", "table", "tbody", "td", "text", "textPath", "th", "thead", "title", "tr", "tspan", "u", "ul"], t6.emptyHTML = t5, t6.bypassHTMLFiltering = false;
      let { defaultOptions: t9, defaultTime: t4 } = tv, { pageLang: t8 } = w, { extend: t7, getNestedProperty: et, isArray: ee, isNumber: ei, isObject: es, isString: eo, pick: er, ucfirst: ea } = V, en = { add: /* @__PURE__ */ __name((t10, e10) => t10 + e10, "add"), divide: /* @__PURE__ */ __name((t10, e10) => 0 !== e10 ? t10 / e10 : "", "divide"), eq: /* @__PURE__ */ __name((t10, e10) => t10 == e10, "eq"), each: /* @__PURE__ */ __name(function(t10) {
        let e10 = arguments[arguments.length - 1];
        return !!ee(t10) && t10.map((i10, s10) => ed(e10.body, t7(es(i10) ? i10 : { "@this": i10 }, { "@index": s10, "@first": 0 === s10, "@last": s10 === t10.length - 1 }))).join("");
      }, "each"), ge: /* @__PURE__ */ __name((t10, e10) => t10 >= e10, "ge"), gt: /* @__PURE__ */ __name((t10, e10) => t10 > e10, "gt"), if: /* @__PURE__ */ __name((t10) => !!t10, "if"), le: /* @__PURE__ */ __name((t10, e10) => t10 <= e10, "le"), lt: /* @__PURE__ */ __name((t10, e10) => t10 < e10, "lt"), multiply: /* @__PURE__ */ __name((t10, e10) => t10 * e10, "multiply"), ne: /* @__PURE__ */ __name((t10, e10) => t10 != e10, "ne"), subtract: /* @__PURE__ */ __name((t10, e10) => t10 - e10, "subtract"), ucfirst: ea, unless: /* @__PURE__ */ __name((t10) => !t10, "unless") }, eh = {}, el = /* @__PURE__ */ __name((t10) => /^["'].+["']$/.test(t10), "el");
      function ed(t10 = "", e10, i10) {
        let s10 = /\{([a-zA-Z\u00C0-\u017F\d:\.,;\-\/<>\[\]%_@+"'’= #\(\)]+)\}/g, o10 = /\(([a-zA-Z\u00C0-\u017F\d:\.,;\-\/<>\[\]%_@+"'= ]+)\)/g, r10 = [], a10 = /f$/, n10 = /\.(\d)/, h10 = i10?.options?.lang || t9.lang, l2 = i10?.time || t4, d2 = i10?.numberFormatter || ec.bind(i10), c2 = /* @__PURE__ */ __name((t11 = "") => {
          let i11;
          return "true" === t11 || "false" !== t11 && ((i11 = Number(t11)).toString() === t11 ? i11 : el(t11) ? t11.slice(1, -1) : et(t11, e10));
        }, "c"), p2, g2, u2 = 0, f2;
        for (; null !== (p2 = s10.exec(t10)); ) {
          let i11 = p2, s11 = o10.exec(p2[1]);
          s11 && (p2 = s11, f2 = true), g2?.isBlock || (g2 = { ctx: e10, expression: p2[1], find: p2[0], isBlock: "#" === p2[1].charAt(0), start: p2.index, startInner: p2.index + p2[0].length, length: p2[0].length });
          let a11 = (g2.isBlock ? i11 : p2)[1].split(" ")[0].replace("#", "");
          en[a11] && (g2.isBlock && a11 === g2.fn && u2++, g2.fn || (g2.fn = a11));
          let n11 = "else" === p2[1];
          if (g2.isBlock && g2.fn && (p2[1] === `/${g2.fn}` || n11)) if (u2) !n11 && u2--;
          else {
            let e11 = g2.startInner, i12 = t10.substr(e11, p2.index - e11);
            void 0 === g2.body ? (g2.body = i12, g2.startInner = p2.index + p2[0].length) : g2.elseBody = i12, g2.find += i12 + p2[0], n11 || (r10.push(g2), g2 = void 0);
          }
          else g2.isBlock || r10.push(g2);
          if (s11 && !g2?.isBlock) break;
        }
        return r10.forEach((s11) => {
          let r11, p3, { body: g3, elseBody: u3, expression: f3, fn: m2 } = s11;
          if (m2) {
            let t11 = [s11], o11 = [], a11 = f3.length, n11 = 0, h11;
            for (p3 = 0; p3 <= a11; p3++) {
              let t12 = f3.charAt(p3);
              h11 || '"' !== t12 && "'" !== t12 ? h11 === t12 && (h11 = "") : h11 = t12, h11 || " " !== t12 && p3 !== a11 || (o11.push(f3.substr(n11, p3 - n11)), n11 = p3 + 1);
            }
            for (p3 = en[m2].length; p3--; ) t11.unshift(c2(o11[p3 + 1]));
            r11 = en[m2].apply(e10, t11), s11.isBlock && "boolean" == typeof r11 && (r11 = ed(r11 ? g3 : u3, e10, i10));
          } else {
            let t11 = el(f3) ? [f3] : f3.split(":"), e11 = (r11 = c2(t11.shift() || "")) % 1 != 0;
            if ("number" == typeof r11 && (t11.length || e11)) {
              let i11 = t11.join(":");
              if (a10.test(i11) || e11) {
                let t12 = parseInt((i11.match(n10) || ["", "-1"])[1], 10);
                null !== r11 && (r11 = d2(r11, t12, h10.decimalPoint, i11.indexOf(",") > -1 ? h10.thousandsSep : ""));
              } else r11 = l2.dateFormat(i11, r11);
            }
            o10.lastIndex = 0, o10.test(s11.find) && eo(r11) && (r11 = `"${r11}"`);
          }
          t10 = t10.replace(s11.find, er(r11, ""));
        }), f2 ? ed(t10, e10, i10) : t10;
      }
      __name(ed, "ed");
      function ec(t10, e10, i10, s10) {
        e10 *= 1;
        let o10, r10, [a10, n10] = (t10 = +t10 || 0).toString().split("e").map(Number), h10 = this?.options?.lang || t9.lang, l2 = (t10.toString().split(".")[1] || "").split("e")[0].length, d2 = e10, c2 = {};
        i10 ?? (i10 = h10.decimalPoint), s10 ?? (s10 = h10.thousandsSep), -1 === e10 ? e10 = Math.min(l2, 20) : ei(e10) ? e10 && n10 < 0 && ((r10 = e10 + n10) >= 0 ? (a10 = +a10.toExponential(r10).split("e")[0], e10 = r10) : (a10 = Math.floor(a10), t10 = e10 < 20 ? +(a10 * Math.pow(10, n10)).toFixed(e10) : 0, n10 = 0)) : e10 = 2, n10 && (e10 ?? (e10 = 2), t10 = a10), ei(e10) && e10 >= 0 && (c2.minimumFractionDigits = e10, c2.maximumFractionDigits = e10), "" === s10 && (c2.useGrouping = false);
        let p2 = s10 || i10, g2 = p2 ? "en" : this?.locale || h10.locale || t8, u2 = JSON.stringify(c2) + g2;
        return o10 = (eh[u2] ?? (eh[u2] = new Intl.NumberFormat(g2, c2))).format(t10), p2 && (o10 = o10.replace(/([,\.])/g, "_$1").replace(/_\,/g, s10 ?? ",").replace("_.", i10 ?? ".")), (e10 || 0 != +o10) && (!(n10 < 0) || d2) || (o10 = "0"), n10 && 0 != +o10 && (o10 += "e" + (n10 < 0 ? "" : "+") + n10), o10;
      }
      __name(ec, "ec");
      let ep = { dateFormat: /* @__PURE__ */ __name(function(t10, e10, i10) {
        return t4.dateFormat(t10, e10, i10);
      }, "dateFormat"), format: ed, helpers: en, numberFormat: ec };
      !(function(t10) {
        let e10;
        t10.rendererTypes = {}, t10.getRendererType = function(i10 = e10) {
          return t10.rendererTypes[i10] || t10.rendererTypes[e10];
        }, t10.registerRendererType = function(i10, s10, o10) {
          t10.rendererTypes[i10] = s10, (!e10 || o10) && (e10 = i10, w.Renderer = s10);
        };
      })(s || (s = {}));
      let eg = s, { clamp: eu, pick: ef, pushUnique: em, stableSort: ex } = V;
      (o || (o = {})).distribute = /* @__PURE__ */ __name(function t10(e10, i10, s10) {
        let o10 = e10, r10 = o10.reducedLen || i10, a10 = /* @__PURE__ */ __name((t11, e11) => t11.target - e11.target, "a"), n10 = [], h10 = e10.length, l2 = [], d2 = n10.push, c2, p2, g2, u2 = true, f2, m2, x2 = 0, y2;
        for (c2 = h10; c2--; ) x2 += e10[c2].size;
        if (x2 > r10) {
          for (ex(e10, (t11, e11) => (e11.rank || 0) - (t11.rank || 0)), g2 = (y2 = e10[0].rank === e10[e10.length - 1].rank) ? h10 / 2 : -1, p2 = y2 ? g2 : h10 - 1; g2 && x2 > r10; ) f2 = e10[c2 = Math.floor(p2)], em(l2, c2) && (x2 -= f2.size), p2 += g2, y2 && p2 >= e10.length && (g2 /= 2, p2 = g2);
          l2.sort((t11, e11) => e11 - t11).forEach((t11) => d2.apply(n10, e10.splice(t11, 1)));
        }
        for (ex(e10, a10), e10 = e10.map((t11) => ({ size: t11.size, targets: [t11.target], align: ef(t11.align, 0.5) })); u2; ) {
          for (c2 = e10.length; c2--; ) f2 = e10[c2], m2 = (Math.min.apply(0, f2.targets) + Math.max.apply(0, f2.targets)) / 2, f2.pos = eu(m2 - f2.size * f2.align, 0, i10 - f2.size);
          for (c2 = e10.length, u2 = false; c2--; ) c2 > 0 && e10[c2 - 1].pos + e10[c2 - 1].size > e10[c2].pos && (e10[c2 - 1].size += e10[c2].size, e10[c2 - 1].targets = e10[c2 - 1].targets.concat(e10[c2].targets), e10[c2 - 1].align = 0.5, e10[c2 - 1].pos + e10[c2 - 1].size > i10 && (e10[c2 - 1].pos = i10 - e10[c2 - 1].size), e10.splice(c2, 1), u2 = true);
        }
        return d2.apply(o10, n10), c2 = 0, e10.some((e11) => {
          let r11 = 0;
          return (e11.targets || []).some(() => (o10[c2].pos = e11.pos + r11, void 0 !== s10 && Math.abs(o10[c2].pos - o10[c2].target) > s10) ? (o10.slice(0, c2 + 1).forEach((t11) => delete t11.pos), o10.reducedLen = (o10.reducedLen || i10) - 0.1 * i10, o10.reducedLen > 0.1 * i10 && t10(o10, i10, s10), true) : (r11 += o10[c2].size, c2++, false));
        }), ex(o10, a10), o10;
      }, "t");
      let ey = o, { animate: eb, animObject: ev, stop: ek } = tU, { deg2rad: ew, doc: eM, svg: eS, SVG_NS: eT, win: eC, isFirefox: eA } = w, { addEvent: eP, attr: eL, createElement: eO, crisp: eE, css: eI, defined: eD, erase: eB, extend: eN, fireEvent: ez, getAlignFactor: eR, isArray: eW, isFunction: eH, isNumber: eX, isObject: eF, isString: eG, merge: ej, objectEach: eY, pick: eU, pInt: e$, pushUnique: eV, replaceNested: eZ, syncTimeout: e_, uniqueKey: eq } = V;
      const _eK = class _eK {
        _defaultGetter(t10) {
          let e10 = eU(this[t10 + "Value"], this[t10], this.element ? this.element.getAttribute(t10) : null, 0);
          return /^-?[\d\.]+$/.test(e10) && (e10 = parseFloat(e10)), e10;
        }
        _defaultSetter(t10, e10, i10) {
          i10.setAttribute(e10, t10);
        }
        add(t10) {
          let e10, i10 = this.renderer, s10 = this.element;
          return t10 && (this.parentGroup = t10), void 0 !== this.textStr && "text" === this.element.nodeName && i10.buildText(this), this.added = true, (!t10 || t10.handleZ || this.zIndex) && (e10 = this.zIndexSetter()), e10 || (t10 ? t10.element : i10.box).appendChild(s10), this.onAdd && this.onAdd(), this;
        }
        addClass(t10, e10) {
          let i10 = e10 ? "" : this.attr("class") || "";
          return (t10 = (t10 || "").split(/ /g).reduce(function(t11, e11) {
            return -1 === i10.indexOf(e11) && t11.push(e11), t11;
          }, i10 ? [i10] : []).join(" ")) !== i10 && this.attr("class", t10), this;
        }
        afterSetters() {
          this.doTransform && (this.updateTransform(), this.doTransform = false);
        }
        align(t10, e10, i10, s10 = true) {
          let o10 = this.renderer, r10 = o10.alignedObjects, a10 = !!t10;
          t10 ? (this.alignOptions = t10, this.alignByTranslate = e10, this.alignTo = i10) : (t10 = this.alignOptions || {}, e10 = this.alignByTranslate, i10 = this.alignTo);
          let n10 = !i10 || eG(i10) ? i10 || "renderer" : void 0;
          n10 && (a10 && eV(r10, this), i10 = void 0);
          let h10 = eU(i10, o10[n10], o10), l2 = (h10.x || 0) + (t10.x || 0) + ((h10.width || 0) - (t10.width || 0)) * eR(t10.align), d2 = (h10.y || 0) + (t10.y || 0) + ((h10.height || 0) - (t10.height || 0)) * eR(t10.verticalAlign), c2 = { "text-align": t10?.align };
          return c2[e10 ? "translateX" : "x"] = Math.round(l2), c2[e10 ? "translateY" : "y"] = Math.round(d2), s10 && (this[this.placed ? "animate" : "attr"](c2), this.placed = true), this.alignAttr = c2, this;
        }
        alignSetter(t10) {
          let e10 = { left: "start", center: "middle", right: "end" };
          e10[t10] && (this.alignValue = t10, this.element.setAttribute("text-anchor", e10[t10]));
        }
        animate(t10, e10, i10) {
          let s10 = ev(eU(e10, this.renderer.globalAnimation, true)), o10 = s10.defer;
          return eM.hidden && (s10.duration = 0), 0 !== s10.duration ? (i10 && (s10.complete = i10), e_(() => {
            this.element && eb(this, t10, s10);
          }, o10)) : (this.attr(t10, void 0, i10 || s10.complete), eY(t10, function(t11, e11) {
            s10.step && s10.step.call(this, t11, { prop: e11, pos: 1, elem: this });
          }, this)), this;
        }
        applyTextOutline(t10) {
          let e10 = this.element;
          -1 !== t10.indexOf("contrast") && (t10 = t10.replace(/contrast/g, this.renderer.getContrast(e10.style.fill)));
          let i10 = t10.indexOf(" "), s10 = t10.substring(i10 + 1), o10 = t10.substring(0, i10);
          if (o10 && "none" !== o10 && w.svg) {
            this.fakeTS = true, o10 = o10.replace(/(^[\d\.]+)(.*?)$/g, function(t12, e11, i12) {
              return 2 * Number(e11) + i12;
            }), this.removeTextOutline();
            let t11 = eM.createElementNS(eT, "tspan");
            eL(t11, { class: "highcharts-text-outline", fill: s10, stroke: s10, "stroke-width": o10, "stroke-linejoin": "round" });
            let i11 = e10.querySelector("textPath") || e10;
            [].forEach.call(i11.childNodes, (e11) => {
              let i12 = e11.cloneNode(true);
              i12.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach((t12) => i12.removeAttribute(t12)), t11.appendChild(i12);
            });
            let r10 = 0;
            [].forEach.call(i11.querySelectorAll("text tspan"), (t12) => {
              r10 += Number(t12.getAttribute("dy"));
            });
            let a10 = eM.createElementNS(eT, "tspan");
            a10.textContent = "​", eL(a10, { x: Number(e10.getAttribute("x")), dy: -r10 }), t11.appendChild(a10), i11.insertBefore(t11, i11.firstChild);
          }
        }
        attr(t10, e10, i10, s10) {
          let { element: o10 } = this, r10 = _eK.symbolCustomAttribs, a10, n10, h10 = this, l2;
          return "string" == typeof t10 && void 0 !== e10 && (a10 = t10, (t10 = {})[a10] = e10), "string" == typeof t10 ? h10 = (this[t10 + "Getter"] || this._defaultGetter).call(this, t10, o10) : (eY(t10, function(e11, i11) {
            l2 = false, s10 || ek(this, i11), this.symbolName && -1 !== r10.indexOf(i11) && (n10 || (this.symbolAttr(t10), n10 = true), l2 = true), this.rotation && ("x" === i11 || "y" === i11) && (this.doTransform = true), l2 || (this[i11 + "Setter"] || this._defaultSetter).call(this, e11, i11, o10);
          }, this), this.afterSetters()), i10 && i10.call(this), h10;
        }
        clip(t10) {
          if (t10 && !t10.clipPath) {
            let e10 = eq() + "-", i10 = this.renderer.createElement("clipPath").attr({ id: e10 }).add(this.renderer.defs);
            eN(t10, { clipPath: i10, id: e10, count: 0 }), t10.add(i10);
          }
          return this.attr("clip-path", t10 ? `url(${this.renderer.url}#${t10.id})` : "none");
        }
        crisp(t10, e10) {
          e10 = Math.round(e10 || t10.strokeWidth || 0);
          let i10 = t10.x || this.x || 0, s10 = t10.y || this.y || 0, o10 = (t10.width || this.width || 0) + i10, r10 = (t10.height || this.height || 0) + s10, a10 = eE(i10, e10), n10 = eE(s10, e10);
          return eN(t10, { x: a10, y: n10, width: eE(o10, e10) - a10, height: eE(r10, e10) - n10 }), eD(t10.strokeWidth) && (t10.strokeWidth = e10), t10;
        }
        complexColor(t10, e10, i10) {
          let s10 = this.renderer, o10, r10, a10, n10, h10, l2, d2, c2, p2, g2, u2 = [], f2;
          ez(this.renderer, "complexColor", { args: arguments }, function() {
            if (t10.radialGradient ? r10 = "radialGradient" : t10.linearGradient && (r10 = "linearGradient"), r10) {
              if (a10 = t10[r10], h10 = s10.gradients, l2 = t10.stops, p2 = i10.radialReference, eW(a10) && (t10[r10] = a10 = { x1: a10[0], y1: a10[1], x2: a10[2], y2: a10[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === r10 && p2 && !eD(a10.gradientUnits) && (n10 = a10, a10 = ej(a10, s10.getRadialAttr(p2, n10), { gradientUnits: "userSpaceOnUse" })), eY(a10, function(t11, e11) {
                "id" !== e11 && u2.push(e11, t11);
              }), eY(l2, function(t11) {
                u2.push(t11);
              }), h10[u2 = u2.join(",")]) g2 = h10[u2].attr("id");
              else {
                a10.id = g2 = eq();
                let t11 = h10[u2] = s10.createElement(r10).attr(a10).add(s10.defs);
                t11.radAttr = n10, t11.stops = [], l2.forEach(function(e11) {
                  0 === e11[1].indexOf("rgba") ? (d2 = (o10 = tL.parse(e11[1])).get("rgb"), c2 = o10.get("a")) : (d2 = e11[1], c2 = 1);
                  let i11 = s10.createElement("stop").attr({ offset: e11[0], "stop-color": d2, "stop-opacity": c2 }).add(t11);
                  t11.stops.push(i11);
                });
              }
              f2 = "url(" + s10.url + "#" + g2 + ")", i10.setAttribute(e10, f2), i10.gradient = u2, t10.toString = function() {
                return f2;
              };
            }
          });
        }
        css(t10) {
          let e10 = this.styles, i10 = {}, s10 = this.element, o10, r10 = !e10;
          if (e10 && eY(t10, function(t11, s11) {
            e10 && e10[s11] !== t11 && (i10[s11] = t11, r10 = true);
          }), r10) {
            e10 && (t10 = eN(e10, i10)), null === t10.width || "auto" === t10.width ? delete this.textWidth : "text" === s10.nodeName.toLowerCase() && t10.width && (o10 = this.textWidth = e$(t10.width)), eN(this.styles, t10), o10 && !eS && this.renderer.forExport && delete t10.width;
            let r11 = eA && t10.fontSize || null;
            r11 && (eX(r11) || /^\d+$/.test(r11)) && (t10.fontSize += "px");
            let a10 = ej(t10);
            s10.namespaceURI === this.SVG_NS && (["textOutline", "textOverflow", "whiteSpace", "width"].forEach((t11) => a10 && delete a10[t11]), a10.color && (a10.fill = a10.color, delete a10.color)), eI(s10, a10);
          }
          return this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), t10.textOutline && this.applyTextOutline(t10.textOutline)), this;
        }
        dashstyleSetter(t10) {
          let e10, i10 = this["stroke-width"];
          if ("inherit" === i10 && (i10 = 1), t10) {
            let s10 = (t10 = t10.toLowerCase()).replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
            for (e10 = s10.length; e10--; ) s10[e10] = "" + e$(s10[e10]) * eU(i10, NaN);
            t10 = s10.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t10);
          }
        }
        destroy() {
          let t10 = this, e10 = t10.element || {}, i10 = t10.renderer, s10 = e10.ownerSVGElement, o10 = "SPAN" === e10.nodeName && t10.parentGroup || void 0, r10, a10;
          if (e10.onclick = e10.onmouseout = e10.onmouseover = e10.onmousemove = e10.point = null, ek(t10), t10.clipPath && s10) {
            let e11 = t10.clipPath;
            [].forEach.call(s10.querySelectorAll("[clip-path],[CLIP-PATH]"), function(t11) {
              t11.getAttribute("clip-path").indexOf(e11.element.id) > -1 && t11.removeAttribute("clip-path");
            }), t10.clipPath = e11.destroy();
          }
          if (t10.stops) {
            for (a10 = 0; a10 < t10.stops.length; a10++) t10.stops[a10].destroy();
            t10.stops.length = 0, t10.stops = void 0;
          }
          for (t10.safeRemoveChild(e10); o10?.div && 0 === o10.div.childNodes.length; ) r10 = o10.parentGroup, t10.safeRemoveChild(o10.div), delete o10.div, o10 = r10;
          t10.alignOptions && eB(i10.alignedObjects, t10), eY(t10, (e11, i11) => {
            (t10[i11]?.parentGroup === t10 || -1 !== ["connector", "foreignObject"].indexOf(i11)) && t10[i11]?.destroy?.(), delete t10[i11];
          });
        }
        dSetter(t10, e10, i10) {
          eW(t10) && ("string" == typeof t10[0] && (t10 = this.renderer.pathToSegments(t10)), this.pathArray = t10, t10 = t10.reduce((t11, e11, i11) => e11?.join ? (i11 ? t11 + " " : "") + e11.join(" ") : (e11 || "").toString(), "")), /(NaN| {2}|^$)/.test(t10) && (t10 = "M 0 0"), this[e10] !== t10 && (i10.setAttribute(e10, t10), this[e10] = t10);
        }
        fillSetter(t10, e10, i10) {
          "string" == typeof t10 ? i10.setAttribute(e10, t10) : t10 && this.complexColor(t10, e10, i10);
        }
        hrefSetter(t10, e10, i10) {
          i10.setAttributeNS("http://www.w3.org/1999/xlink", e10, t10);
        }
        getBBox(t10, e10) {
          let i10, s10, o10, r10, { alignValue: a10, element: n10, renderer: h10, styles: l2, textStr: d2 } = this, { cache: c2, cacheKeys: p2 } = h10, g2 = n10.namespaceURI === this.SVG_NS, u2 = eU(e10, this.rotation, 0), f2 = h10.styledMode ? n10 && _eK.prototype.getStyle.call(n10, "font-size") : l2.fontSize;
          if (eD(d2) && (-1 === (r10 = d2.toString()).indexOf("<") && (r10 = r10.replace(/\d/g, "0")), r10 += ["", h10.rootFontSize, f2, u2, this.textWidth, a10, l2.lineClamp, l2.textOverflow, l2.fontWeight].join(",")), r10 && !t10 && (i10 = c2[r10]), !i10 || i10.polygon) {
            if (g2 || h10.forExport) {
              try {
                o10 = this.fakeTS && function(t12) {
                  let e11 = n10.querySelector(".highcharts-text-outline");
                  e11 && eI(e11, { display: t12 });
                }, eH(o10) && o10("none"), i10 = n10.getBBox ? eN({}, n10.getBBox()) : { width: n10.offsetWidth, height: n10.offsetHeight, x: 0, y: 0 }, eH(o10) && o10("");
              } catch {
              }
              (!i10 || i10.width < 0) && (i10 = { x: 0, y: 0, width: 0, height: 0 });
            } else i10 = this.htmlGetBBox();
            s10 = i10.height, g2 && (i10.height = s10 = { "11px,17": 14, "13px,20": 16 }[`${f2 || ""},${Math.round(s10)}`] || s10), u2 && (i10 = this.getRotatedBox(i10, u2));
            let t11 = { bBox: i10 };
            ez(this, "afterGetBBox", t11), i10 = t11.bBox;
          }
          if (r10 && ("" === d2 || i10.height > 0)) {
            for (; p2.length > 250; ) delete c2[p2.shift()];
            c2[r10] || p2.push(r10), c2[r10] = i10;
          }
          return i10;
        }
        getRotatedBox(t10, e10) {
          let { x: i10, y: s10, width: o10, height: r10 } = t10, { alignValue: a10, translateY: n10, rotationOriginX: h10 = 0, rotationOriginY: l2 = 0 } = this, d2 = eR(a10), c2 = Number(this.element.getAttribute("y") || 0) - (n10 ? 0 : s10), p2 = e10 * ew, g2 = (e10 - 90) * ew, u2 = Math.cos(p2), f2 = Math.sin(p2), m2 = o10 * u2, x2 = o10 * f2, y2 = Math.cos(g2), b2 = Math.sin(g2), [[v2, k2], [w2, M2]] = [h10, l2].map((t11) => [t11 - t11 * u2, t11 * f2]), S2 = i10 + d2 * (o10 - m2) + v2 + M2 + c2 * y2, T2 = S2 + m2, C2 = T2 - r10 * y2, A2 = C2 - m2, P2 = s10 + c2 - d2 * x2 - k2 + w2 + c2 * b2, L2 = P2 + x2, O2 = L2 - r10 * b2, E2 = O2 - x2, I2 = Math.min(S2, T2, C2, A2), D2 = Math.min(P2, L2, O2, E2), B2 = Math.max(S2, T2, C2, A2) - I2, N2 = Math.max(P2, L2, O2, E2) - D2;
          return { x: I2, y: D2, width: B2, height: N2, polygon: [[S2, P2], [T2, L2], [C2, O2], [A2, E2]] };
        }
        getStyle(t10) {
          return eC.getComputedStyle(this.element || this, "").getPropertyValue(t10);
        }
        hasClass(t10) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(t10);
        }
        hide() {
          return this.attr({ visibility: "hidden" });
        }
        htmlGetBBox() {
          return { height: 0, width: 0, x: 0, y: 0 };
        }
        constructor(t10, e10) {
          this.onEvents = {}, this.opacity = 1, this.SVG_NS = eT, this.element = "span" === e10 || "body" === e10 ? eO(e10) : eM.createElementNS(this.SVG_NS, e10), this.renderer = t10, this.styles = {}, ez(this, "afterInit");
        }
        on(t10, e10) {
          let { onEvents: i10 } = this;
          return i10[t10] && i10[t10](), i10[t10] = eP(this.element, t10, e10), this;
        }
        opacitySetter(t10, e10, i10) {
          let s10 = Number(Number(t10).toFixed(3));
          this.opacity = s10, i10.setAttribute(e10, s10);
        }
        reAlign() {
          this.alignOptions?.width && "left" !== this.alignOptions.align && (this.alignOptions.width = this.getBBox().width, this.placed = false, this.align());
        }
        removeClass(t10) {
          return this.attr("class", ("" + this.attr("class")).replace(eG(t10) ? RegExp(`(^| )${t10}( |$)`) : t10, " ").replace(/ +/g, " ").trim());
        }
        removeTextOutline() {
          let t10 = this.element.querySelector("tspan.highcharts-text-outline");
          t10 && this.safeRemoveChild(t10);
        }
        safeRemoveChild(t10) {
          let e10 = t10.parentNode;
          e10 && e10.removeChild(t10);
        }
        setRadialReference(t10) {
          let e10 = this.element.gradient && this.renderer.gradients[this.element.gradient] || void 0;
          return this.element.radialReference = t10, e10?.radAttr && e10.animate(this.renderer.getRadialAttr(t10, e10.radAttr)), this;
        }
        shadow(t10) {
          let { renderer: e10 } = this, i10 = ej(this.parentGroup?.rotation === 90 ? { offsetX: -1, offsetY: -1 } : {}, eF(t10) ? t10 : {}), s10 = e10.shadowDefinition(i10);
          return this.attr({ filter: t10 ? `url(${e10.url}#${s10})` : "none" });
        }
        show(t10 = true) {
          return this.attr({ visibility: t10 ? "inherit" : "visible" });
        }
        "stroke-widthSetter"(t10, e10, i10) {
          this[e10] = t10, i10.setAttribute(e10, t10);
        }
        strokeWidth() {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          let t10 = this.getStyle("stroke-width"), e10 = 0, i10;
          return /px$/.test(t10) ? e10 = e$(t10) : "" !== t10 && (eL(i10 = eM.createElementNS(eT, "rect"), { width: t10, "stroke-width": 0 }), this.element.parentNode.appendChild(i10), e10 = i10.getBBox().width, i10.parentNode.removeChild(i10)), e10;
        }
        symbolAttr(t10) {
          let e10 = this;
          _eK.symbolCustomAttribs.forEach(function(i10) {
            e10[i10] = eU(t10[i10], e10[i10]);
          }), e10.attr({ d: e10.renderer.symbols[e10.symbolName](e10.x, e10.y, e10.width, e10.height, e10) });
        }
        textSetter(t10) {
          t10 !== this.textStr && (delete this.textPxLength, this.textStr = t10, this.added && this.renderer.buildText(this), this.reAlign());
        }
        titleSetter(t10) {
          let e10 = this.element, i10 = e10.getElementsByTagName("title")[0] || eM.createElementNS(this.SVG_NS, "title");
          e10.insertBefore ? e10.insertBefore(i10, e10.firstChild) : e10.appendChild(i10), i10.textContent = eZ(eU(t10, ""), [/<[^>]*>/g, ""]).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
        toFront() {
          let t10 = this.element;
          return t10.parentNode.appendChild(t10), this;
        }
        translate(t10, e10) {
          return this.attr({ translateX: t10, translateY: e10 });
        }
        updateTransform(t10 = "transform") {
          let { element: e10, foreignObject: i10, matrix: s10, padding: o10, rotation: r10 = 0, rotationOriginX: a10, rotationOriginY: n10, scaleX: h10, scaleY: l2, text: d2, translateX: c2 = 0, translateY: p2 = 0 } = this, g2 = ["translate(" + c2 + "," + p2 + ")"];
          eD(s10) && g2.push("matrix(" + s10.join(",") + ")"), r10 && (g2.push("rotate(" + r10 + " " + (a10 ?? e10.getAttribute("x") ?? this.x ?? 0) + " " + (n10 ?? e10.getAttribute("y") ?? this.y ?? 0) + ")"), d2?.element.tagName !== "SPAN" || d2?.foreignObject || d2.attr({ rotation: r10, rotationOriginX: (a10 || 0) - o10, rotationOriginY: (n10 || 0) - o10 })), (eD(h10) || eD(l2)) && g2.push("scale(" + eU(h10, 1) + " " + eU(l2, 1) + ")"), g2.length && !(d2 || this).textPath && (i10?.element || e10).setAttribute(t10, g2.join(" "));
        }
        visibilitySetter(t10, e10, i10) {
          "inherit" === t10 ? i10.removeAttribute(e10) : this[e10] !== t10 && i10.setAttribute(e10, t10), this[e10] = t10;
        }
        xGetter(t10) {
          return "circle" === this.element.nodeName && ("x" === t10 ? t10 = "cx" : "y" === t10 && (t10 = "cy")), this._defaultGetter(t10);
        }
        zIndexSetter(t10, e10) {
          let i10 = this.renderer, s10 = this.parentGroup, o10 = (s10 || i10).element || i10.box, r10 = this.element, a10 = o10 === i10.box, n10, h10, l2, d2 = false, c2, p2 = this.added, g2;
          if (eD(t10) ? (r10.setAttribute("data-z-index", t10), t10 *= 1, this[e10] === t10 && (p2 = false)) : eD(this[e10]) && r10.removeAttribute("data-z-index"), this[e10] = t10, p2) {
            for ((t10 = this.zIndex) && s10 && (s10.handleZ = true), g2 = (n10 = o10.childNodes).length - 1; g2 >= 0 && !d2; g2--) c2 = !eD(l2 = (h10 = n10[g2]).getAttribute("data-z-index")), h10 !== r10 && (t10 < 0 && c2 && !a10 && !g2 ? (o10.insertBefore(r10, n10[g2]), d2 = true) : (e$(l2) <= t10 || c2 && (!eD(t10) || t10 >= 0)) && (o10.insertBefore(r10, n10[g2 + 1]), d2 = true));
            d2 || (o10.insertBefore(r10, n10[3 * !!a10]), d2 = true);
          }
          return d2;
        }
      };
      __name(_eK, "eK");
      let eK = _eK;
      eK.symbolCustomAttribs = ["anchorX", "anchorY", "clockwise", "end", "height", "innerR", "r", "start", "width", "x", "y"], eK.prototype.strokeSetter = eK.prototype.fillSetter, eK.prototype.yGetter = eK.prototype.xGetter, eK.prototype.matrixSetter = eK.prototype.rotationOriginXSetter = eK.prototype.rotationOriginYSetter = eK.prototype.rotationSetter = eK.prototype.scaleXSetter = eK.prototype.scaleYSetter = eK.prototype.translateXSetter = eK.prototype.translateYSetter = eK.prototype.verticalAlignSetter = function(t10, e10) {
        this[e10] = t10, this.doTransform = true;
      };
      let eJ = eK, { defined: eQ, extend: e0, getAlignFactor: e1, isNumber: e2, merge: e3, pick: e5, removeEvent: e6 } = V;
      const _e9 = class _e9 extends eJ {
        constructor(t10, e10, i10, s10, o10, r10, a10, n10, h10, l2) {
          let d2;
          super(t10, "g"), this.paddingLeftSetter = this.paddingSetter, this.paddingRightSetter = this.paddingSetter, this.doUpdate = false, this.textStr = e10, this.x = i10, this.y = s10, this.anchorX = r10, this.anchorY = a10, this.baseline = h10, this.className = l2, this.addClass("button" === l2 ? "highcharts-no-tooltip" : "highcharts-label"), l2 && this.addClass("highcharts-" + l2), this.text = t10.text(void 0, 0, 0, n10).attr({ zIndex: 1 }), "string" == typeof o10 && ((d2 = /^url\((.*?)\)$/.test(o10)) || this.renderer.symbols[o10]) && (this.symbolKey = o10), this.bBox = _e9.emptyBBox, this.padding = 3, this.baselineOffset = 0, this.needsBox = t10.styledMode || d2, this.deferredAttr = {}, this.alignFactor = 0;
        }
        alignSetter(t10) {
          let e10 = e1(t10);
          this.textAlign = t10, e10 !== this.alignFactor && (this.alignFactor = e10, this.bBox && e2(this.xSetting) && this.attr({ x: this.xSetting }));
        }
        anchorXSetter(t10, e10) {
          this.anchorX = t10, this.boxAttr(e10, Math.round(t10) - this.getCrispAdjust() - this.xSetting);
        }
        anchorYSetter(t10, e10) {
          this.anchorY = t10, this.boxAttr(e10, t10 - this.ySetting);
        }
        boxAttr(t10, e10) {
          this.box ? this.box.attr(t10, e10) : this.deferredAttr[t10] = e10;
        }
        css(t10) {
          if (t10) {
            let e10 = {};
            t10 = e3(t10), _e9.textProps.forEach((i10) => {
              void 0 !== t10[i10] && (e10[i10] = t10[i10], delete t10[i10]);
            }), this.text.css(e10), "fontSize" in e10 || "fontWeight" in e10 ? this.updateTextPadding() : ("width" in e10 || "textOverflow" in e10) && this.updateBoxSize();
          }
          return eJ.prototype.css.call(this, t10);
        }
        destroy() {
          e6(this.element, "mouseenter"), e6(this.element, "mouseleave"), this.text && this.text.destroy(), this.box && (this.box = this.box.destroy()), eJ.prototype.destroy.call(this);
        }
        fillSetter(t10, e10) {
          t10 && (this.needsBox = true), this.fill = t10, this.boxAttr(e10, t10);
        }
        getBBox(t10, e10) {
          this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
          let { padding: i10, height: s10 = 0, translateX: o10 = 0, translateY: r10 = 0, width: a10 = 0 } = this, n10 = e5(this.paddingLeft, i10), h10 = e10 ?? (this.rotation || 0), l2 = { width: a10, height: s10, x: o10 + this.bBox.x - n10, y: r10 + this.bBox.y - i10 + this.baselineOffset };
          return h10 && (l2 = this.getRotatedBox(l2, h10)), l2;
        }
        getCrispAdjust() {
          return (this.renderer.styledMode && this.box ? this.box.strokeWidth() : this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2;
        }
        heightSetter(t10) {
          this.heightSetting = t10, this.doUpdate = true;
        }
        afterSetters() {
          super.afterSetters(), this.doUpdate && (this.updateBoxSize(), this.doUpdate = false);
        }
        onAdd() {
          this.text.add(this), this.attr({ text: e5(this.textStr, ""), x: this.x || 0, y: this.y || 0 }), this.box && eQ(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        }
        paddingSetter(t10, e10) {
          e2(t10) ? t10 !== this[e10] && (this[e10] = t10, this.updateTextPadding()) : this[e10] = void 0;
        }
        rSetter(t10, e10) {
          this.boxAttr(e10, t10);
        }
        strokeSetter(t10, e10) {
          this.stroke = t10, this.boxAttr(e10, t10);
        }
        "stroke-widthSetter"(t10, e10) {
          t10 && (this.needsBox = true), this["stroke-width"] = t10, this.boxAttr(e10, t10);
        }
        "text-alignSetter"(t10) {
          this.textAlign = this["text-align"] = t10, this.updateTextPadding();
        }
        textSetter(t10) {
          void 0 !== t10 && this.text.attr({ text: t10 }), this.updateTextPadding(), this.reAlign();
        }
        updateBoxSize() {
          let t10, e10 = this.text, i10 = {}, s10 = this.padding, o10 = this.bBox = (!e2(this.widthSetting) || !e2(this.heightSetting) || this.textAlign) && eQ(e10.textStr) ? e10.getBBox(void 0, 0) : _e9.emptyBBox;
          this.width = this.getPaddedWidth(), this.height = (this.heightSetting || o10.height || 0) + 2 * s10;
          let r10 = this.renderer.fontMetrics(e10);
          if (this.baselineOffset = s10 + Math.min((this.text.firstLineMetrics || r10).b, o10.height || 1 / 0), this.heightSetting && (this.baselineOffset += (this.heightSetting - r10.h) / 2), this.needsBox && !e10.textPath) {
            if (!this.box) {
              let t11 = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect();
              t11.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), t11.add(this);
            }
            i10.x = t10 = this.getCrispAdjust(), i10.y = (this.baseline ? -this.baselineOffset : 0) + t10, i10.width = Math.round(this.width), i10.height = Math.round(this.height), this.box.attr(e0(i10, this.deferredAttr)), this.deferredAttr = {};
          }
        }
        updateTextPadding() {
          let t10 = this.text, e10 = t10.styles.textAlign || this.textAlign;
          if (!t10.textPath) {
            this.updateBoxSize();
            let i10 = this.baseline ? 0 : this.baselineOffset, s10 = (this.paddingLeft ?? this.padding) + e1(e10) * (this.widthSetting ?? this.bBox.width);
            (s10 !== t10.x || i10 !== t10.y) && (t10.attr({ align: e10, x: s10 }), void 0 !== i10 && t10.attr("y", i10)), t10.x = s10, t10.y = i10;
          }
        }
        widthSetter(t10) {
          this.widthSetting = e2(t10) ? t10 : void 0, this.doUpdate = true;
        }
        getPaddedWidth() {
          let t10 = this.padding, e10 = e5(this.paddingLeft, t10), i10 = e5(this.paddingRight, t10);
          return (this.widthSetting || this.bBox.width || 0) + e10 + i10;
        }
        xSetter(t10) {
          this.x = t10, this.alignFactor && (t10 -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = true), this.anchorX && (this["forceAnimate:anchorX"] = true), this.xSetting = Math.round(t10), this.attr("translateX", this.xSetting);
        }
        ySetter(t10) {
          this.anchorY && (this["forceAnimate:anchorY"] = true), this.ySetting = this.y = Math.round(t10), this.attr("translateY", this.ySetting);
        }
      };
      __name(_e9, "e9");
      let e9 = _e9;
      e9.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }, e9.textProps = ["color", "direction", "fontFamily", "fontSize", "fontStyle", "fontWeight", "lineClamp", "lineHeight", "textAlign", "textDecoration", "textOutline", "textOverflow", "whiteSpace", "width"];
      let { defined: e4, isNumber: e8, pick: e7 } = V;
      function it(t10, e10, i10, s10, o10) {
        let r10 = [];
        if (o10) {
          let a10 = o10.start || 0, n10 = o10.end || 0, h10 = e7(o10.r, i10), l2 = e7(o10.r, s10 || i10), d2 = 2e-4 / (o10.borderRadius ? 1 : Math.max(h10, 1)), c2 = Math.abs(n10 - a10 - 2 * Math.PI) < d2;
          c2 && (a10 = Math.PI / 2, n10 = 2.5 * Math.PI - d2);
          let p2 = o10.innerR, g2 = e7(o10.open, c2), u2 = Math.cos(a10), f2 = Math.sin(a10), m2 = Math.cos(n10), x2 = Math.sin(n10), y2 = e7(o10.longArc, n10 - a10 - Math.PI < d2 ? 0 : 1), b2 = ["A", h10, l2, 0, y2, e7(o10.clockwise, 1), t10 + h10 * m2, e10 + l2 * x2];
          b2.params = { start: a10, end: n10, cx: t10, cy: e10 }, r10.push(["M", t10 + h10 * u2, e10 + l2 * f2], b2), e4(p2) && ((b2 = ["A", p2, p2, 0, y2, e4(o10.clockwise) ? 1 - o10.clockwise : 0, t10 + p2 * u2, e10 + p2 * f2]).params = { start: n10, end: a10, cx: t10, cy: e10 }, r10.push(g2 ? ["M", t10 + p2 * m2, e10 + p2 * x2] : ["L", t10 + p2 * m2, e10 + p2 * x2], b2)), g2 || r10.push(["Z"]);
        }
        return r10;
      }
      __name(it, "it");
      function ie(t10, e10, i10, s10, o10) {
        return o10?.r ? ii(t10, e10, i10, s10, o10) : [["M", t10, e10], ["L", t10 + i10, e10], ["L", t10 + i10, e10 + s10], ["L", t10, e10 + s10], ["Z"]];
      }
      __name(ie, "ie");
      function ii(t10, e10, i10, s10, o10) {
        let r10 = o10?.r || 0;
        return [["M", t10 + r10, e10], ["L", t10 + i10 - r10, e10], ["A", r10, r10, 0, 0, 1, t10 + i10, e10 + r10], ["L", t10 + i10, e10 + s10 - r10], ["A", r10, r10, 0, 0, 1, t10 + i10 - r10, e10 + s10], ["L", t10 + r10, e10 + s10], ["A", r10, r10, 0, 0, 1, t10, e10 + s10 - r10], ["L", t10, e10 + r10], ["A", r10, r10, 0, 0, 1, t10 + r10, e10], ["Z"]];
      }
      __name(ii, "ii");
      let is = { arc: it, callout: /* @__PURE__ */ __name(function(t10, e10, i10, s10, o10) {
        let r10 = Math.min(o10?.r || 0, i10, s10), a10 = r10 + 6, n10 = o10?.anchorX, h10 = o10?.anchorY || 0, l2 = ii(t10, e10, i10, s10, { r: r10 });
        if (!e8(n10) || n10 < i10 && n10 > 0 && h10 < s10 && h10 > 0) return l2;
        if (t10 + n10 > i10 - a10) if (h10 > e10 + a10 && h10 < e10 + s10 - a10) l2.splice(3, 1, ["L", t10 + i10, h10 - 6], ["L", t10 + i10 + 6, h10], ["L", t10 + i10, h10 + 6], ["L", t10 + i10, e10 + s10 - r10]);
        else if (n10 < i10) {
          let o11 = h10 < e10 + a10, d2 = o11 ? e10 : e10 + s10;
          l2.splice(o11 ? 2 : 5, 0, ["L", n10, h10], ["L", t10 + i10 - r10, d2]);
        } else l2.splice(3, 1, ["L", t10 + i10, s10 / 2], ["L", n10, h10], ["L", t10 + i10, s10 / 2], ["L", t10 + i10, e10 + s10 - r10]);
        else if (t10 + n10 < a10) if (h10 > e10 + a10 && h10 < e10 + s10 - a10) l2.splice(7, 1, ["L", t10, h10 + 6], ["L", t10 - 6, h10], ["L", t10, h10 - 6], ["L", t10, e10 + r10]);
        else if (n10 > 0) {
          let i11 = h10 < e10 + a10, o11 = i11 ? e10 : e10 + s10;
          l2.splice(i11 ? 1 : 6, 0, ["L", n10, h10], ["L", t10 + r10, o11]);
        } else l2.splice(7, 1, ["L", t10, s10 / 2], ["L", n10, h10], ["L", t10, s10 / 2], ["L", t10, e10 + r10]);
        else h10 > s10 && n10 < i10 - a10 ? l2.splice(5, 1, ["L", n10 + 6, e10 + s10], ["L", n10, e10 + s10 + 6], ["L", n10 - 6, e10 + s10], ["L", t10 + r10, e10 + s10]) : h10 < 0 && n10 > a10 && l2.splice(1, 1, ["L", n10 - 6, e10], ["L", n10, e10 - 6], ["L", n10 + 6, e10], ["L", i10 - r10, e10]);
        return l2;
      }, "callout"), circle: /* @__PURE__ */ __name(function(t10, e10, i10, s10) {
        return it(t10 + i10 / 2, e10 + s10 / 2, i10 / 2, s10 / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: false });
      }, "circle"), diamond: /* @__PURE__ */ __name(function(t10, e10, i10, s10) {
        return [["M", t10 + i10 / 2, e10], ["L", t10 + i10, e10 + s10 / 2], ["L", t10 + i10 / 2, e10 + s10], ["L", t10, e10 + s10 / 2], ["Z"]];
      }, "diamond"), rect: ie, roundedRect: ii, square: ie, triangle: /* @__PURE__ */ __name(function(t10, e10, i10, s10) {
        return [["M", t10 + i10 / 2, e10], ["L", t10 + i10, e10 + s10], ["L", t10, e10 + s10], ["Z"]];
      }, "triangle"), "triangle-down": /* @__PURE__ */ __name(function(t10, e10, i10, s10) {
        return [["M", t10, e10], ["L", t10 + i10, e10], ["L", t10 + i10 / 2, e10 + s10], ["Z"]];
      }, "triangle-down") }, { doc: io, SVG_NS: ir, win: ia } = w, { attr: ih, extend: il, fireEvent: id, isString: ic, objectEach: ip, pick: ig } = V, iu = /* @__PURE__ */ __name((t10, e10) => t10.substring(0, e10) + "…", "iu"), im = (_c = class {
        constructor(t10) {
          let e10 = t10.styles;
          this.renderer = t10.renderer, this.svgElement = t10, this.width = t10.textWidth, this.textLineHeight = e10?.lineHeight, this.textOutline = e10?.textOutline, this.ellipsis = e10?.textOverflow === "ellipsis", this.lineClamp = e10?.lineClamp, this.noWrap = e10?.whiteSpace === "nowrap";
        }
        buildSVG() {
          let t10 = this.svgElement, e10 = t10.element, i10 = t10.renderer, s10 = ig(t10.textStr, "").toString(), o10 = -1 !== s10.indexOf("<"), r10 = e10.childNodes, a10 = !t10.added && i10.box, n10 = [s10, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, t10.getStyle("font-size"), t10.styles.lineClamp, this.width].join(",");
          if (n10 !== t10.textCache) {
            t10.textCache = n10, delete t10.actualWidth;
            for (let t11 = r10.length; t11--; ) e10.removeChild(r10[t11]);
            if (o10 || this.ellipsis || this.width || t10.textPath || -1 !== s10.indexOf(" ") && (!this.noWrap || /<br.*?>/g.test(s10))) {
              if ("" !== s10) {
                a10 && a10.appendChild(e10);
                let i11 = new t6(s10);
                this.modifyTree(i11.nodes), i11.addToDOM(e10), this.modifyDOM(), this.ellipsis && -1 !== (e10.textContent || "").indexOf("…") && t10.attr("title", this.unescapeEntities(t10.textStr || "", ["&lt;", "&gt;"])), a10 && a10.removeChild(e10);
              }
            } else e10.appendChild(io.createTextNode(this.unescapeEntities(s10)));
            ic(this.textOutline) && t10.applyTextOutline && t10.applyTextOutline(this.textOutline);
          }
        }
        modifyDOM() {
          let t10, e10 = this.svgElement, i10 = ih(e10.element, "x");
          for (e10.firstLineMetrics = void 0; t10 = e10.element.firstChild; ) if (/^[\s\u200B]*$/.test(t10.textContent || " ")) e10.element.removeChild(t10);
          else break;
          [].forEach.call(e10.element.querySelectorAll("tspan.highcharts-br"), (t11, s11) => {
            t11.nextSibling && t11.previousSibling && (0 === s11 && 1 === t11.previousSibling.nodeType && (e10.firstLineMetrics = e10.renderer.fontMetrics(t11.previousSibling)), ih(t11, { dy: this.getLineHeight(t11.nextSibling), x: i10 }));
          });
          let s10 = this.width || 0;
          if (!s10) return;
          let o10 = /* @__PURE__ */ __name((t11, o11) => {
            let r11 = t11.textContent || "", a10 = r11.replace(/([^\^])-/g, "$1- ").split(" "), n10 = !this.noWrap && (a10.length > 1 || e10.element.childNodes.length > 1), h10 = this.getLineHeight(o11), l2 = Math.max(0, s10 - 0.8 * h10), d2 = 0, c2 = e10.actualWidth;
            if (n10) {
              let r12 = [], n11 = [];
              for (; o11.firstChild && o11.firstChild !== t11; ) n11.push(o11.firstChild), o11.removeChild(o11.firstChild);
              for (; a10.length; ) if (a10.length && !this.noWrap && d2 > 0 && (r12.push(t11.textContent || ""), t11.textContent = a10.join(" ").replace(/- /g, "-")), this.truncate(t11, void 0, a10, 0 === d2 && c2 || 0, s10, l2, (t12, e11) => a10.slice(0, e11).join(" ").replace(/- /g, "-")), c2 = e10.actualWidth, d2++, this.lineClamp && d2 >= this.lineClamp) {
                a10.length && (this.truncate(t11, t11.textContent || "", void 0, 0, s10, l2, iu), t11.textContent = t11.textContent?.replace("…", "") + "…");
                break;
              }
              n11.forEach((e11) => {
                o11.insertBefore(e11, t11);
              }), r12.forEach((e11) => {
                o11.insertBefore(io.createTextNode(e11), t11);
                let s11 = io.createElementNS(ir, "tspan");
                s11.textContent = "​", ih(s11, { dy: h10, x: i10 }), o11.insertBefore(s11, t11);
              });
            } else this.ellipsis && r11 && this.truncate(t11, r11, void 0, 0, s10, l2, iu);
          }, "o"), r10 = /* @__PURE__ */ __name((t11) => {
            [].slice.call(t11.childNodes).forEach((i11) => {
              i11.nodeType === ia.Node.TEXT_NODE ? o10(i11, t11) : (-1 !== i11.className.baseVal.indexOf("highcharts-br") && (e10.actualWidth = 0), r10(i11));
            });
          }, "r");
          r10(e10.element);
        }
        getLineHeight(t10) {
          let e10 = t10.nodeType === ia.Node.TEXT_NODE ? t10.parentElement : t10;
          return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(e10 || this.svgElement.element).h;
        }
        modifyTree(t10) {
          let e10 = /* @__PURE__ */ __name((i10, s10) => {
            let { attributes: o10 = {}, children: r10, style: a10 = {}, tagName: n10 } = i10, h10 = this.renderer.styledMode;
            if ("b" === n10 || "strong" === n10 ? h10 ? o10.class = "highcharts-strong" : a10.fontWeight = "bold" : ("i" === n10 || "em" === n10) && (h10 ? o10.class = "highcharts-emphasized" : a10.fontStyle = "italic"), a10?.color && (a10.fill = a10.color), "br" === n10) {
              o10.class = "highcharts-br", i10.textContent = "​";
              let e11 = t10[s10 + 1];
              e11?.textContent && (e11.textContent = e11.textContent.replace(/^ +/gm, ""));
            } else "a" === n10 && r10 && r10.some((t11) => "#text" === t11.tagName) && (i10.children = [{ children: r10, tagName: "tspan" }]);
            "#text" !== n10 && "a" !== n10 && (i10.tagName = "tspan"), il(i10, { attributes: o10, style: a10 }), r10 && r10.filter((t11) => "#text" !== t11.tagName).forEach(e10);
          }, "e");
          t10.forEach(e10), id(this.svgElement, "afterModifyTree", { nodes: t10 });
        }
        truncate(t10, e10, i10, s10, o10, r10, a10) {
          let n10, h10, l2 = this.svgElement, { rotation: d2 } = l2, c2 = [], p2 = i10 && !s10 ? 1 : 0, g2 = (e10 || i10 || "").length, u2 = g2;
          i10 || (o10 = r10);
          let f2 = /* @__PURE__ */ __name(function(e11, o11) {
            let r11 = o11 || e11, a11 = t10.parentNode;
            if (a11 && void 0 === c2[r11] && a11.getSubStringLength) try {
              c2[r11] = s10 + a11.getSubStringLength(0, i10 ? r11 + 1 : r11);
            } catch {
            }
            return c2[r11];
          }, "f");
          if (l2.rotation = 0, s10 + (h10 = f2(t10.textContent.length)) > o10) {
            for (; p2 <= g2; ) u2 = Math.ceil((p2 + g2) / 2), i10 && (n10 = a10(i10, u2)), h10 = f2(u2, n10 && n10.length - 1), p2 === g2 ? p2 = g2 + 1 : h10 > o10 ? g2 = u2 - 1 : p2 = u2;
            0 === g2 ? t10.textContent = "" : e10 && g2 === e10.length - 1 || (t10.textContent = n10 || a10(e10 || i10, u2)), this.ellipsis && h10 > o10 && this.truncate(t10, t10.textContent || "", void 0, 0, o10, r10, iu);
          }
          i10 && i10.splice(0, u2), l2.actualWidth = h10, l2.rotation = d2;
        }
        unescapeEntities(t10, e10) {
          return ip(this.renderer.escapes, function(i10, s10) {
            e10 && -1 !== e10.indexOf(i10) || (t10 = t10.toString().replace(RegExp(i10, "g"), s10));
          }), t10;
        }
      }, __name(_c, "im"), _c), { defaultOptions: ix } = tv, { charts: iy, deg2rad: ib, doc: iv, isFirefox: ik, isMS: iw, isWebKit: iM, noop: iS, SVG_NS: iT, symbolSizes: iC, win: iA } = w, { addEvent: iP, attr: iL, createElement: iO, crisp: iE, css: iI, defined: iD, destroyObjectProperties: iB, extend: iN, isArray: iz, isNumber: iR, isObject: iW, isString: iH, merge: iX, pick: iF, pInt: iG, replaceNested: ij, uniqueKey: iY } = V;
      const _iU = class _iU {
        constructor(t10, e10, i10, s10, o10, r10, a10) {
          let n10, h10;
          this.x = 0, this.y = 0;
          let l2 = this.createElement("svg").attr({ version: "1.1", class: "highcharts-root" }), d2 = l2.element;
          a10 || l2.css(this.getStyle(s10 || {})), t10.appendChild(d2), iL(t10, "dir", "ltr"), -1 === t10.innerHTML.indexOf("xmlns") && iL(d2, "xmlns", this.SVG_NS), this.box = d2, this.boxWrapper = l2, this.alignedObjects = [], this.url = this.getReferenceURL(), this.createElement("desc").add().element.appendChild(iv.createTextNode("Created with Highcharts 12.4.0")), this.defs = this.createElement("defs").add(), this.allowHTML = r10, this.forExport = o10, this.styledMode = a10, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.rootFontSize = l2.getStyle("font-size"), this.setSize(e10, i10, false), ik && t10.getBoundingClientRect && ((n10 = /* @__PURE__ */ __name(function() {
            iI(t10, { left: 0, top: 0 }), h10 = t10.getBoundingClientRect(), iI(t10, { left: Math.ceil(h10.left) - h10.left + "px", top: Math.ceil(h10.top) - h10.top + "px" });
          }, "n"))(), this.unSubPixelFix = iP(iA, "resize", n10));
        }
        definition(t10) {
          return new t6([t10]).addToDOM(this.defs.element);
        }
        getReferenceURL() {
          if ((ik || iM) && iv.getElementsByTagName("base").length) {
            if (!iD(e)) {
              let t10 = iY(), i10 = new t6([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: t10 }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": `url(#${t10})`, fill: "rgba(0,0,0,0.001)" } }] }]).addToDOM(iv.body);
              iI(i10, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              let s10 = iv.elementFromPoint(6, 6);
              e = s10?.id === "hitme", iv.body.removeChild(i10);
            }
            if (e) return ij(iA.location.href.split("#")[0], [/<[^>]*>/g, ""], [/([\('\)])/g, "\\$1"], [/ /g, "%20"]);
          }
          return "";
        }
        getStyle(t10) {
          return this.style = iN({ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontSize: "1rem" }, t10), this.style;
        }
        setStyle(t10) {
          this.boxWrapper.css(this.getStyle(t10));
        }
        isHidden() {
          return !this.boxWrapper.getBBox().width;
        }
        destroy() {
          let t10 = this.defs;
          return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), iB(this.gradients || {}), this.gradients = null, this.defs = t10.destroy(), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null, null;
        }
        createElement(t10) {
          return new this.Element(this, t10);
        }
        getRadialAttr(t10, e10) {
          return { cx: t10[0] - t10[2] / 2 + (e10.cx || 0) * t10[2], cy: t10[1] - t10[2] / 2 + (e10.cy || 0) * t10[2], r: (e10.r || 0) * t10[2] };
        }
        shadowDefinition(t10) {
          let e10 = [`highcharts-drop-shadow-${this.chartIndex}`, ...Object.keys(t10).map((e11) => `${e11}-${t10[e11]}`)].join("-").toLowerCase().replace(/[^a-z\d\-]/g, ""), i10 = iX({ color: "#000000", offsetX: 1, offsetY: 1, opacity: 0.15, width: 5 }, t10);
          return this.defs.element.querySelector(`#${e10}`) || this.definition({ tagName: "filter", attributes: { id: e10, filterUnits: i10.filterUnits }, children: this.getShadowFilterContent(i10) }), e10;
        }
        getShadowFilterContent(t10) {
          return [{ tagName: "feDropShadow", attributes: { dx: t10.offsetX, dy: t10.offsetY, "flood-color": t10.color, "flood-opacity": Math.min(5 * t10.opacity, 1), stdDeviation: t10.width / 2 } }];
        }
        buildText(t10) {
          new im(t10).buildSVG();
        }
        getContrast(t10) {
          if ("transparent" === t10) return "#000000";
          let e10 = tL.parse(t10).rgba, i10 = " clamp(0,calc(9e9*(0.5 - (0.2126*r + 0.7152*g + 0.0722*b))),1)";
          if (iR(e10[0]) || !tL.useColorMix) {
            let t11 = e10.map((t12) => {
              let e11 = t12 / 255;
              return e11 <= 0.04 ? e11 / 12.92 : Math.pow((e11 + 0.055) / 1.055, 2.4);
            }), i11 = 0.2126 * t11[0] + 0.7152 * t11[1] + 0.0722 * t11[2];
            return 1.05 / (i11 + 0.05) > (i11 + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
          }
          return "color(from " + t10 + " srgb" + i10 + i10 + i10 + ")";
        }
        button(t10, e10, i10, s10, o10 = {}, r10, a10, n10, h10, l2) {
          let d2 = this.label(t10, e10, i10, h10, void 0, void 0, l2, void 0, "button"), c2 = this.styledMode, p2 = arguments, g2 = 0;
          o10 = iX(ix.global.buttonTheme, o10), c2 && (delete o10.fill, delete o10.stroke, delete o10["stroke-width"]);
          let u2 = o10.states || {}, f2 = o10.style || {};
          delete o10.states, delete o10.style;
          let m2 = [t6.filterUserAttributes(o10)], x2 = [f2];
          return c2 || ["hover", "select", "disabled"].forEach((t11, e11) => {
            m2.push(iX(m2[0], t6.filterUserAttributes(p2[e11 + 5] || u2[t11] || {}))), x2.push(m2[e11 + 1].style), delete m2[e11 + 1].style;
          }), iP(d2.element, iw ? "mouseover" : "mouseenter", function() {
            3 !== g2 && d2.setState(1);
          }), iP(d2.element, iw ? "mouseout" : "mouseleave", function() {
            3 !== g2 && d2.setState(g2);
          }), d2.setState = (t11 = 0) => {
            if (1 !== t11 && (d2.state = g2 = t11), d2.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t11]), !c2) {
              d2.attr(m2[t11]);
              let e11 = x2[t11];
              iW(e11) && d2.css(e11);
            }
          }, d2.attr(m2[0]), !c2 && (d2.css(iN({ cursor: "default" }, f2)), l2 && d2.text.css({ pointerEvents: "none" })), d2.on("touchstart", (t11) => t11.stopPropagation()).on("click", function(t11) {
            3 !== g2 && s10?.call(d2, t11);
          });
        }
        crispLine(t10, e10) {
          let [i10, s10] = t10;
          return iD(i10[1]) && i10[1] === s10[1] && (i10[1] = s10[1] = iE(i10[1], e10)), iD(i10[2]) && i10[2] === s10[2] && (i10[2] = s10[2] = iE(i10[2], e10)), t10;
        }
        path(t10) {
          let e10 = this.styledMode ? {} : { fill: "none" };
          return iz(t10) ? e10.d = t10 : iW(t10) && iN(e10, t10), this.createElement("path").attr(e10);
        }
        circle(t10, e10, i10) {
          let s10 = iW(t10) ? t10 : void 0 === t10 ? {} : { x: t10, y: e10, r: i10 }, o10 = this.createElement("circle");
          return o10.xSetter = o10.ySetter = function(t11, e11, i11) {
            i11.setAttribute("c" + e11, t11);
          }, o10.attr(s10);
        }
        arc(t10, e10, i10, s10, o10, r10) {
          let a10;
          iW(t10) ? (e10 = (a10 = t10).y, i10 = a10.r, s10 = a10.innerR, o10 = a10.start, r10 = a10.end, t10 = a10.x) : a10 = { innerR: s10, start: o10, end: r10 };
          let n10 = this.symbol("arc", t10, e10, i10, i10, a10);
          return n10.r = i10, n10;
        }
        rect(t10, e10, i10, s10, o10, r10) {
          let a10 = iW(t10) ? t10 : void 0 === t10 ? {} : { x: t10, y: e10, r: o10, width: Math.max(i10 || 0, 0), height: Math.max(s10 || 0, 0) }, n10 = this.createElement("rect");
          return this.styledMode || (void 0 !== r10 && (a10["stroke-width"] = r10, iN(a10, n10.crisp(a10))), a10.fill = "none"), n10.rSetter = function(t11, e11, i11) {
            n10.r = t11, iL(i11, { rx: t11, ry: t11 });
          }, n10.rGetter = function() {
            return n10.r || 0;
          }, n10.attr(a10);
        }
        roundedRect(t10) {
          return this.symbol("roundedRect").attr(t10);
        }
        setSize(t10, e10, i10) {
          this.width = t10, this.height = e10, this.boxWrapper.animate({ width: t10, height: e10 }, { step: /* @__PURE__ */ __name(function() {
            this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
          }, "step"), duration: iF(i10, true) ? void 0 : 0 }), this.alignElements();
        }
        g(t10) {
          let e10 = this.createElement("g");
          return t10 ? e10.attr({ class: "highcharts-" + t10 }) : e10;
        }
        image(t10, e10, i10, s10, o10, r10) {
          let a10 = { preserveAspectRatio: "none" };
          iR(e10) && (a10.x = e10), iR(i10) && (a10.y = i10), iR(s10) && (a10.width = s10), iR(o10) && (a10.height = o10);
          let n10 = this.createElement("image").attr(a10), h10 = /* @__PURE__ */ __name(function(e11) {
            n10.attr({ href: t10 }), r10.call(n10, e11);
          }, "h");
          if (r10) {
            n10.attr({ href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" });
            let e11 = new iA.Image();
            iP(e11, "load", h10), e11.src = t10, e11.complete && h10({});
          } else n10.attr({ href: t10 });
          return n10;
        }
        symbol(t10, e10, i10, s10, o10, r10) {
          let a10, n10, h10, l2, d2 = this, c2 = /^url\((.*?)\)$/, p2 = c2.test(t10), g2 = !p2 && (this.symbols[t10] ? t10 : "circle"), u2 = g2 && this.symbols[g2];
          if (u2) "number" == typeof e10 && (n10 = u2.call(this.symbols, e10 || 0, i10 || 0, s10 || 0, o10 || 0, r10)), a10 = this.path(n10), d2.styledMode || a10.attr("fill", "none"), iN(a10, { symbolName: g2 || void 0, x: e10, y: i10, width: s10, height: o10 }), r10 && iN(a10, r10);
          else if (p2) {
            h10 = t10.match(c2)[1];
            let s11 = a10 = this.image(h10);
            s11.imgwidth = iF(r10?.width, iC[h10]?.width), s11.imgheight = iF(r10?.height, iC[h10]?.height), l2 = /* @__PURE__ */ __name((t11) => t11.attr({ width: t11.width, height: t11.height }), "l"), ["width", "height"].forEach((t11) => {
              s11[`${t11}Setter`] = function(t12, e11) {
                this[e11] = t12;
                let { alignByTranslate: i11, element: s12, width: o11, height: a11, imgwidth: n11, imgheight: h11 } = this, l3 = "width" === e11 ? n11 : h11, d3 = 1;
                r10 && "within" === r10.backgroundSize && o11 && a11 && n11 && h11 ? (d3 = Math.min(o11 / n11, a11 / h11), iL(s12, { width: Math.round(n11 * d3), height: Math.round(h11 * d3) })) : s12 && l3 && s12.setAttribute(e11, l3), !i11 && n11 && h11 && this.translate(((o11 || 0) - n11 * d3) / 2, ((a11 || 0) - h11 * d3) / 2);
              };
            }), iD(e10) && s11.attr({ x: e10, y: i10 }), s11.isImg = true, s11.symbolUrl = t10, iD(s11.imgwidth) && iD(s11.imgheight) ? l2(s11) : (s11.attr({ width: 0, height: 0 }), iO("img", { onload: /* @__PURE__ */ __name(function() {
              let t11 = iy[d2.chartIndex];
              0 === this.width && (iI(this, { position: "absolute", top: "-999em" }), iv.body.appendChild(this)), iC[h10] = { width: this.width, height: this.height }, s11.imgwidth = this.width, s11.imgheight = this.height, s11.element && l2(s11), this.parentNode && this.parentNode.removeChild(this), d2.imgCount--, d2.imgCount || !t11 || t11.hasLoaded || t11.onload();
            }, "onload"), src: h10 }), this.imgCount++);
          }
          return a10;
        }
        clipRect(t10, e10, i10, s10) {
          return this.rect(t10, e10, i10, s10, 0);
        }
        text(t10, e10, i10, s10) {
          let o10 = {};
          if (s10 && (this.allowHTML || !this.forExport)) return this.html(t10, e10, i10);
          o10.x = Math.round(e10 || 0), i10 && (o10.y = Math.round(i10)), iD(t10) && (o10.text = t10);
          let r10 = this.createElement("text").attr(o10);
          return s10 && (!this.forExport || this.allowHTML) || (r10.xSetter = function(t11, e11, i11) {
            let s11 = i11.getElementsByTagName("tspan"), o11 = i11.getAttribute(e11);
            for (let i12 = 0, r11; i12 < s11.length; i12++) (r11 = s11[i12]).getAttribute(e11) === o11 && r11.setAttribute(e11, t11);
            i11.setAttribute(e11, t11);
          }), r10;
        }
        fontMetrics(t10) {
          let e10 = iR(t10) ? t10 : iG(eJ.prototype.getStyle.call(t10, "font-size") || 0), i10 = e10 < 24 ? e10 + 3 : Math.round(1.2 * e10), s10 = Math.round(0.8 * i10);
          return { h: i10, b: s10, f: e10 };
        }
        rotCorr(t10, e10, i10) {
          let s10 = t10;
          return e10 && i10 && (s10 = Math.max(s10 * Math.cos(e10 * ib), 4)), { x: -t10 / 3 * Math.sin(e10 * ib), y: s10 };
        }
        pathToSegments(t10) {
          let e10 = [], i10 = [], s10 = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
          for (let o10 = 0; o10 < t10.length; o10++) iH(i10[0]) && iR(t10[o10]) && i10.length === s10[i10[0].toUpperCase()] && t10.splice(o10, 0, i10[0].replace("M", "L").replace("m", "l")), "string" == typeof t10[o10] && (i10.length && e10.push(i10.slice(0)), i10.length = 0), i10.push(t10[o10]);
          return e10.push(i10.slice(0)), e10;
        }
        label(t10, e10, i10, s10, o10, r10, a10, n10, h10) {
          return new e9(this, t10, e10, i10, s10, o10, r10, a10, n10, h10);
        }
        alignElements() {
          this.alignedObjects.forEach((t10) => t10.align());
        }
      };
      __name(_iU, "iU");
      let iU = _iU;
      iN(iU.prototype, { Element: eJ, SVG_NS: iT, escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: is, draw: iS }), eg.registerRendererType("svg", iU, true);
      let { composed: i$, isFirefox: iV } = w, { attr: iZ, css: i_, createElement: iq, defined: iK, extend: iJ, getAlignFactor: iQ, isNumber: i0, pInt: i1, pushUnique: i2 } = V;
      function i3(t10, e10, i10) {
        let s10 = this.div?.style;
        eJ.prototype[`${e10}Setter`].call(this, t10, e10, i10), s10 && (i10.style[e10] = s10[e10] = t10);
      }
      __name(i3, "i3");
      let i5 = /* @__PURE__ */ __name((t10, e10) => {
        if (!t10.div) {
          let i10 = iZ(t10.element, "class"), s10 = t10.css, o10 = iq("div", i10 ? { className: i10 } : void 0, __spreadProps(__spreadValues({ position: "absolute", left: `${t10.translateX || 0}px`, top: `${t10.translateY || 0}px` }, t10.styles), { display: t10.display, opacity: t10.opacity, visibility: t10.visibility }), t10.parentGroup?.div || e10);
          t10.classSetter = (t11, e11, i11) => {
            i11.setAttribute("class", t11), o10.className = t11;
          }, t10.translateXSetter = t10.translateYSetter = (e11, i11) => {
            t10[i11] = e11, o10.style["translateX" === i11 ? "left" : "top"] = `${e11}px`, t10.doTransform = true;
          }, t10.scaleXSetter = t10.scaleYSetter = (e11, i11) => {
            t10[i11] = e11, t10.doTransform = true;
          }, t10.opacitySetter = t10.visibilitySetter = i3, t10.css = (e11) => (s10.call(t10, e11), e11.cursor && (o10.style.cursor = e11.cursor), e11.pointerEvents && (o10.style.pointerEvents = e11.pointerEvents), t10), t10.on = function() {
            return eJ.prototype.on.apply({ element: o10, onEvents: t10.onEvents }, arguments), t10;
          }, t10.div = o10;
        }
        return t10.div;
      }, "i5");
      const _i6 = class _i6 extends eJ {
        static compose(t10) {
          i2(i$, this.compose) && (t10.prototype.html = function(t11, e10, i10) {
            return new _i6(this, "span").attr({ text: t11, x: Math.round(e10), y: Math.round(i10) });
          });
        }
        constructor(t10, e10) {
          super(t10, e10), _i6.useForeignObject ? this.foreignObject = t10.createElement("foreignObject").attr({ zIndex: 2 }) : this.css(__spreadValues({ position: "absolute" }, t10.styledMode ? {} : { fontFamily: t10.style.fontFamily, fontSize: t10.style.fontSize })), this.element.style.whiteSpace = "nowrap";
        }
        getSpanCorrection(t10, e10, i10) {
          this.xCorr = -t10 * i10, this.yCorr = -e10;
        }
        css(t10) {
          let e10, { element: i10 } = this, s10 = "SPAN" === i10.tagName && t10 && "width" in t10, o10 = s10 && t10.width;
          return s10 && (delete t10.width, this.textWidth = i1(o10) || void 0, e10 = true), t10?.textOverflow === "ellipsis" && (t10.overflow = "hidden", t10.whiteSpace = "nowrap"), t10?.lineClamp && (t10.display = "-webkit-box", t10.WebkitLineClamp = t10.lineClamp, t10.WebkitBoxOrient = "vertical", t10.overflow = "hidden"), i0(Number(t10?.fontSize)) && (t10.fontSize += "px"), iJ(this.styles, t10), i_(i10, t10), e10 && this.updateTransform(), this;
        }
        htmlGetBBox() {
          let { element: t10 } = this;
          return { x: t10.offsetLeft, y: t10.offsetTop, width: t10.offsetWidth, height: t10.offsetHeight };
        }
        updateTransform() {
          if (!this.added) {
            this.alignOnAdd = true;
            return;
          }
          let { element: t10, foreignObject: e10, oldTextWidth: i10, renderer: s10, rotation: o10, rotationOriginX: r10, rotationOriginY: a10, scaleX: n10, scaleY: h10, styles: { display: l2 = "inline-block", whiteSpace: d2 }, textAlign: c2 = "left", textWidth: p2, translateX: g2 = 0, translateY: u2 = 0, x: f2 = 0, y: m2 = 0 } = this;
          if (e10 || i_(t10, { marginLeft: `${g2}px`, marginTop: `${u2}px` }), "SPAN" === t10.tagName) {
            let g3, u3 = [o10, c2, t10.innerHTML, p2, this.textAlign].join(","), x2 = -(this.parentGroup?.padding * 1) || 0;
            if (p2 !== i10) {
              let e11 = this.textPxLength ? this.textPxLength : (i_(t10, { width: "", whiteSpace: d2 || "nowrap" }), t10.offsetWidth), r11 = p2 || 0, a11 = !s10.styledMode && "" === t10.style.textOverflow && t10.style.webkitLineClamp;
              (r11 > i10 || e11 > r11 || a11) && (/[\-\s\u00AD]/.test(t10.textContent || t10.innerText) || "ellipsis" === t10.style.textOverflow) && (i_(t10, { width: (o10 || n10 || e11 > r11 || a11) && i0(p2) ? p2 + "px" : "auto", display: l2, whiteSpace: d2 || "normal" }), this.oldTextWidth = p2);
            }
            e10 && (i_(t10, { display: "inline-block", verticalAlign: "top" }), e10.attr({ width: s10.width, height: s10.height })), u3 !== this.cTT && (g3 = s10.fontMetrics(t10).b, iK(o10) && !e10 && (o10 !== (this.oldRotation || 0) || c2 !== this.oldAlign) && i_(t10, { transform: `rotate(${o10}deg)`, transformOrigin: `${x2}% ${x2}px` }), this.getSpanCorrection(!iK(o10) && !this.textWidth && this.textPxLength || t10.offsetWidth, g3, iQ(c2)));
            let { xCorr: y2 = 0, yCorr: b2 = 0 } = this, v2 = { left: `${f2 + y2}px`, top: `${m2 + b2}px`, textAlign: c2, transformOrigin: `${(r10 ?? f2) - y2 - f2 - x2}px ${(a10 ?? m2) - b2 - m2 - x2}px` };
            (n10 || h10) && (v2.transform = `scale(${n10 ?? 1},${h10 ?? 1})`), e10 ? (super.updateTransform(), i0(f2) && i0(m2) ? (e10.attr({ x: f2 + y2, y: m2 + b2, width: t10.offsetWidth + 3, height: t10.offsetHeight, "transform-origin": t10.getAttribute("transform-origin") || "0 0" }), i_(t10, { display: l2, textAlign: c2 })) : iV && e10.attr({ width: 0, height: 0 })) : i_(t10, v2), this.cTT = u3, this.oldRotation = o10, this.oldAlign = c2;
          }
        }
        add(t10) {
          let { foreignObject: e10, renderer: i10 } = this, s10 = i10.box.parentNode, o10 = [];
          if (e10) e10.add(t10), super.add(i10.createElement("body").attr({ xmlns: "http://www.w3.org/1999/xhtml" }).css({ background: "transparent", margin: "0 3px 0 0" }).add(e10));
          else {
            let e11;
            if (this.parentGroup = t10, t10 && !(e11 = t10.div)) {
              let i11 = t10;
              for (; i11; ) o10.push(i11), i11 = i11.parentGroup;
              for (let t11 of o10.reverse()) e11 = i5(t11, s10);
            }
            (e11 || s10).appendChild(this.element);
          }
          return this.added = true, this.alignOnAdd && this.updateTransform(), this;
        }
        textSetter(t10) {
          t10 !== this.textStr && (delete this.bBox, delete this.oldTextWidth, t6.setElementHTML(this.element, t10 ?? ""), this.textStr = t10, this.doTransform = true);
        }
        alignSetter(t10) {
          this.alignValue = this.textAlign = t10, this.doTransform = true;
        }
        xSetter(t10, e10) {
          this[e10] = t10, this.doTransform = true;
        }
      };
      __name(_i6, "i6");
      let i6 = _i6;
      let i9 = i6.prototype;
      i9.visibilitySetter = i9.opacitySetter = i3, i9.ySetter = i9.rotationSetter = i9.rotationOriginXSetter = i9.rotationOriginYSetter = i9.xSetter, !(function(t10) {
        t10.xAxis = { alignTicks: true, allowDecimals: void 0, panningEnabled: true, zIndex: 2, zoomEnabled: true, dateTimeLabelFormats: { millisecond: { main: "%[HMSL]", range: false }, second: { main: "%[HMS]", range: false }, minute: { main: "%[HM]", range: false }, hour: { main: "%[HM]", range: false }, day: { main: "%[eb]" }, week: { main: "%[eb]" }, month: { main: "%[bY]" }, year: { main: "%Y" } }, endOnTick: false, gridLineDashStyle: "Solid", gridZIndex: 1, labels: { autoRotationLimit: 80, distance: 15, enabled: true, indentation: 10, overflow: "justify", reserveSpace: void 0, rotation: void 0, staggerLines: 0, step: 0, useHTML: false, zIndex: 7, style: { color: "#333333", cursor: "default", fontSize: "0.8em", textOverflow: "ellipsis" } }, maxPadding: 0.01, minorGridLineDashStyle: "Solid", minorTickLength: 2, minorTickPosition: "outside", minorTicksPerMajor: 5, minPadding: 0.01, offset: void 0, reversed: void 0, reversedStacks: false, showEmpty: true, showFirstLabel: true, showLastLabel: true, startOfWeek: 1, startOnTick: false, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", useHTML: false, x: 0, y: 0, style: { color: "#666666", fontSize: "0.8em" } }, visible: true, minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#333333", lineWidth: 1, gridLineColor: "#e6e6e6", gridLineWidth: void 0, tickColor: "#333333" }, t10.yAxis = { reversedStacks: true, endOnTick: true, maxPadding: 0.05, minPadding: 0.05, tickPixelInterval: 72, showLastLabel: true, labels: { x: void 0 }, startOnTick: true, title: {}, stackLabels: { animation: {}, allowOverlap: false, enabled: false, crop: true, overflow: "justify", formatter: /* @__PURE__ */ __name(function() {
          let { numberFormatter: t11 } = this.axis.chart;
          return t11(this.total || 0, -1);
        }, "formatter"), style: { color: "#000000", fontSize: "0.7em", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 };
      })(r || (r = {}));
      let i4 = r, { addEvent: i8, isFunction: i7, objectEach: st, removeEvent: se } = V;
      (a || (a = {})).registerEventOptions = function(t10, e10) {
        t10.eventOptions = t10.eventOptions || {}, st(e10.events, function(e11, i10) {
          t10.eventOptions[i10] !== e11 && (t10.eventOptions[i10] && (se(t10, i10, t10.eventOptions[i10]), delete t10.eventOptions[i10]), i7(e11) && (t10.eventOptions[i10] = e11, i8(t10, i10, e11, { order: 0 })));
        });
      };
      let si = a, { deg2rad: ss } = w, { clamp: so, correctFloat: sr, defined: sa, destroyObjectProperties: sn, extend: sh, fireEvent: sl, getAlignFactor: sd, isNumber: sc, merge: sp, objectEach: sg, pick: su } = V, sf = (_d = class {
        constructor(t10, e10, i10, s10, o10) {
          this.isNew = true, this.isNewLabel = true, this.axis = t10, this.pos = e10, this.type = i10 || "", this.parameters = o10 || {}, this.tickmarkOffset = this.parameters.tickmarkOffset, this.options = this.parameters.options, sl(this, "init"), i10 || s10 || this.addLabel();
        }
        addLabel() {
          let t10 = this, e10 = t10.axis, i10 = e10.options, s10 = e10.chart, o10 = e10.categories, r10 = e10.logarithmic, a10 = e10.names, n10 = t10.pos, h10 = su(t10.options?.labels, i10.labels), l2 = e10.tickPositions, d2 = n10 === l2[0], c2 = n10 === l2[l2.length - 1], p2 = (!h10.step || 1 === h10.step) && 1 === e10.tickInterval, g2 = l2.info, u2 = t10.label, f2, m2, x2, y2 = this.parameters.category || (o10 ? su(o10[n10], a10[n10], n10) : n10);
          r10 && sc(y2) && (y2 = sr(r10.lin2log(y2))), e10.dateTime && (g2 ? f2 = (m2 = s10.time.resolveDTLFormat(i10.dateTimeLabelFormats[!i10.grid?.enabled && g2.higherRanks[n10] || g2.unitName])).main : sc(y2) && (f2 = e10.dateTime.getXDateFormat(y2, i10.dateTimeLabelFormats || {}))), t10.isFirst = d2, t10.isLast = c2;
          let b2 = { axis: e10, chart: s10, dateTimeLabelFormat: f2, isFirst: d2, isLast: c2, pos: n10, tick: t10, tickPositionInfo: g2, value: y2 };
          sl(this, "labelFormat", b2);
          let v2 = /* @__PURE__ */ __name((t11) => h10.formatter ? h10.formatter.call(t11, t11) : h10.format ? (t11.text = e10.defaultLabelFormatter.call(t11), ep.format(h10.format, t11, s10)) : e10.defaultLabelFormatter.call(t11), "v"), k2 = v2.call(b2, b2), w2 = m2?.list;
          w2 ? t10.shortenLabel = function() {
            for (x2 = 0; x2 < w2.length; x2++) if (sh(b2, { dateTimeLabelFormat: w2[x2] }), u2.attr({ text: v2.call(b2, b2) }), u2.getBBox().width < e10.getSlotWidth(t10) - 2 * (h10.padding || 0)) return;
            u2.attr({ text: "" });
          } : t10.shortenLabel = void 0, p2 && e10._addedPlotLB && t10.moveLabel(k2, h10), sa(u2) || t10.movedLabel ? u2 && u2.textStr !== k2 && !p2 && (!u2.textWidth || h10.style.width || u2.styles.width || u2.css({ width: null }), u2.attr({ text: k2 }), u2.textPxLength = u2.getBBox().width) : (t10.label = u2 = t10.createLabel(k2, h10), t10.rotation = 0);
        }
        createLabel(t10, e10, i10) {
          let s10 = this.axis, { renderer: o10, styledMode: r10 } = s10.chart, a10 = e10.style.whiteSpace, n10 = sa(t10) && e10.enabled ? o10.text(t10, i10?.x, i10?.y, e10.useHTML).add(s10.labelGroup) : void 0;
          return n10 && (r10 || n10.css(sp(e10.style)), n10.textPxLength = n10.getBBox().width, !r10 && a10 && n10.css({ whiteSpace: a10 })), n10;
        }
        destroy() {
          sn(this, this.axis);
        }
        getPosition(t10, e10, i10, s10) {
          let o10 = this.axis, r10 = o10.chart, a10 = s10 && r10.oldChartHeight || r10.chartHeight, n10 = { x: t10 ? sr(o10.translate(e10 + i10, void 0, void 0, s10) + o10.transB) : o10.left + o10.offset + (o10.opposite ? (s10 && r10.oldChartWidth || r10.chartWidth) - o10.right - o10.left : 0), y: t10 ? a10 - o10.bottom + o10.offset - (o10.opposite ? o10.height : 0) : sr(a10 - o10.translate(e10 + i10, void 0, void 0, s10) - o10.transB) };
          return n10.y = so(n10.y, -1e9, 1e9), sl(this, "afterGetPosition", { pos: n10 }), n10;
        }
        getLabelPosition(t10, e10, i10, s10, o10, r10, a10, n10) {
          let h10, l2, d2 = this.axis, c2 = d2.transA, p2 = d2.isLinked && d2.linkedParent ? d2.linkedParent.reversed : d2.reversed, g2 = d2.staggerLines, u2 = d2.tickRotCorr || { x: 0, y: 0 }, f2 = s10 || d2.reserveSpaceDefault ? 0 : -d2.labelOffset * ("center" === d2.labelAlign ? 0.5 : 1), m2 = o10.distance, x2 = {};
          return h10 = 0 === d2.side ? i10.rotation ? -m2 : -i10.getBBox().height : 2 === d2.side ? u2.y + m2 : Math.cos(i10.rotation * ss) * (u2.y - i10.getBBox(false, 0).height / 2), sa(o10.y) && (h10 = 0 === d2.side && d2.horiz ? o10.y + h10 : o10.y), t10 = t10 + su(o10.x, [0, 1, 0, -1][d2.side] * m2) + f2 + u2.x - (r10 && s10 ? r10 * c2 * (p2 ? -1 : 1) : 0), e10 = e10 + h10 - (r10 && !s10 ? r10 * c2 * (p2 ? 1 : -1) : 0), g2 && (l2 = a10 / (n10 || 1) % g2, d2.opposite && (l2 = g2 - l2 - 1), e10 += l2 * (d2.labelOffset / g2)), x2.x = t10, x2.y = Math.round(e10), sl(this, "afterGetLabelPosition", { pos: x2, tickmarkOffset: r10, index: a10 }), x2;
        }
        getLabelSize() {
          return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
        }
        getMarkPath(t10, e10, i10, s10, o10 = false, r10) {
          return r10.crispLine([["M", t10, e10], ["L", t10 + (o10 ? 0 : -i10), e10 + (o10 ? i10 : 0)]], s10);
        }
        handleOverflow(t10) {
          let e10 = this.axis, i10 = e10.options.labels, s10 = t10.x, o10 = e10.chart.chartWidth, r10 = e10.chart.spacing, a10 = su(e10.labelLeft, Math.min(e10.pos, r10[3])), n10 = su(e10.labelRight, Math.max(e10.isRadial ? 0 : e10.pos + e10.len, o10 - r10[1])), h10 = this.label, l2 = this.rotation, d2 = sd(e10.labelAlign || h10.attr("align")), c2 = h10.getBBox().width, p2 = e10.getSlotWidth(this), g2 = p2, u2 = 1, f2;
          l2 || "justify" !== i10.overflow ? l2 < 0 && s10 - d2 * c2 < a10 ? f2 = Math.round(s10 / Math.cos(l2 * ss) - a10) : l2 > 0 && s10 + d2 * c2 > n10 && (f2 = Math.round((o10 - s10) / Math.cos(l2 * ss))) : (s10 - d2 * c2 < a10 ? g2 = t10.x + g2 * (1 - d2) - a10 : s10 + (1 - d2) * c2 > n10 && (g2 = n10 - t10.x + g2 * d2, u2 = -1), (g2 = Math.min(p2, g2)) < p2 && "center" === e10.labelAlign && (t10.x += u2 * (p2 - g2 - d2 * (p2 - Math.min(c2, g2)))), (c2 > g2 || e10.autoRotation && h10?.styles?.width) && (f2 = g2)), f2 && h10 && (this.shortenLabel ? this.shortenLabel() : h10.css(sh({}, { width: Math.floor(f2) + "px", lineClamp: +!e10.isRadial })));
        }
        moveLabel(t10, e10) {
          let i10 = this, s10 = i10.label, o10 = i10.axis, r10 = false, a10;
          s10 && s10.textStr === t10 ? (i10.movedLabel = s10, r10 = true, delete i10.label) : sg(o10.ticks, function(e11) {
            r10 || e11.isNew || e11 === i10 || !e11.label || e11.label.textStr !== t10 || (i10.movedLabel = e11.label, r10 = true, e11.labelPos = i10.movedLabel.xy, delete e11.label);
          }), !r10 && (i10.labelPos || s10) && (a10 = i10.labelPos || s10.xy, i10.movedLabel = i10.createLabel(t10, e10, a10), i10.movedLabel && i10.movedLabel.attr({ opacity: 0 }));
        }
        render(t10, e10, i10) {
          let s10 = this.axis, o10 = s10.horiz, r10 = this.pos, a10 = su(this.tickmarkOffset, s10.tickmarkOffset), n10 = this.getPosition(o10, r10, a10, e10), h10 = n10.x, l2 = n10.y, d2 = s10.pos, c2 = d2 + s10.len, p2 = o10 ? h10 : l2, g2 = su(i10, this.label?.newOpacity, 1);
          !s10.chart.polar && (sr(p2) < d2 || p2 > c2) && (i10 = 0), i10 ?? (i10 = 1), this.isActive = true, this.renderGridLine(e10, i10), this.renderMark(n10, i10), this.renderLabel(n10, e10, g2, t10), this.isNew = false, sl(this, "afterRender");
        }
        renderGridLine(t10, e10) {
          let i10 = this.axis, s10 = i10.options, o10 = {}, r10 = this.pos, a10 = this.type, n10 = su(this.tickmarkOffset, i10.tickmarkOffset), h10 = i10.chart.renderer, l2 = this.gridLine, d2, c2 = s10.gridLineWidth, p2 = s10.gridLineColor, g2 = s10.gridLineDashStyle;
          "minor" === this.type && (c2 = s10.minorGridLineWidth, p2 = s10.minorGridLineColor, g2 = s10.minorGridLineDashStyle), l2 || (i10.chart.styledMode || (o10.stroke = p2, o10["stroke-width"] = c2 || 0, o10.dashstyle = g2), a10 || (o10.zIndex = 1), t10 && (e10 = 0), this.gridLine = l2 = h10.path().attr(o10).addClass("highcharts-" + (a10 ? a10 + "-" : "") + "grid-line").add(i10.gridGroup)), l2 && (d2 = i10.getPlotLinePath({ value: r10 + n10, lineWidth: l2.strokeWidth(), force: "pass", old: t10, acrossPanes: false })) && l2[t10 || this.isNew ? "attr" : "animate"]({ d: d2, opacity: e10 });
        }
        renderMark(t10, e10) {
          let i10 = this.axis, s10 = i10.options, o10 = i10.chart.renderer, r10 = this.type, a10 = i10.tickSize(r10 ? r10 + "Tick" : "tick"), n10 = t10.x, h10 = t10.y, l2 = su(s10["minor" !== r10 ? "tickWidth" : "minorTickWidth"], !r10 && i10.isXAxis ? 1 : 0), d2 = s10["minor" !== r10 ? "tickColor" : "minorTickColor"], c2 = this.mark, p2 = !c2;
          a10 && (i10.opposite && (a10[0] = -a10[0]), !c2 && (this.mark = c2 = o10.path().addClass("highcharts-" + (r10 ? r10 + "-" : "") + "tick").add(i10.axisGroup), i10.chart.styledMode || c2.attr({ stroke: d2, "stroke-width": l2 })), c2[p2 ? "attr" : "animate"]({ d: this.getMarkPath(n10, h10, a10[0], c2.strokeWidth(), i10.horiz, o10), opacity: e10 }));
        }
        renderLabel(t10, e10, i10, s10) {
          let o10 = this.axis, r10 = o10.horiz, a10 = o10.options, n10 = this.label, h10 = a10.labels, l2 = h10.step, d2 = su(this.tickmarkOffset, o10.tickmarkOffset), c2 = t10.x, p2 = t10.y, g2 = true;
          n10 && sc(c2) && (n10.xy = t10 = this.getLabelPosition(c2, p2, n10, r10, h10, d2, s10, l2), (!this.isFirst || this.isLast || a10.showFirstLabel) && (!this.isLast || this.isFirst || a10.showLastLabel) ? !r10 || h10.step || h10.rotation || e10 || 0 === i10 || this.handleOverflow(t10) : g2 = false, l2 && s10 % l2 && (g2 = false), g2 && sc(t10.y) ? (t10.opacity = i10, n10[this.isNewLabel ? "attr" : "animate"](t10).show(true), this.isNewLabel = false) : (n10.hide(), this.isNewLabel = true));
        }
        replaceMovedLabel() {
          let t10 = this.label, e10 = this.axis;
          t10 && !this.isNew && (t10.animate({ opacity: 0 }, void 0, t10.destroy), delete this.label), e10.isDirty = true, this.label = this.movedLabel, delete this.movedLabel;
        }
      }, __name(_d, "sf"), _d), { animObject: sm } = tU, { xAxis: sx, yAxis: sy } = i4, { defaultOptions: sb } = tv, { registerEventOptions: sv } = si, { deg2rad: sk } = w, { arrayMax: sw, arrayMin: sM, clamp: sS, correctFloat: sT, defined: sC, destroyObjectProperties: sA, erase: sP, error: sL, extend: sO, fireEvent: sE, getClosestDistance: sI, insertItem: sD, isArray: sB, isNumber: sN, isString: sz, merge: sR, normalizeTickInterval: sW, objectEach: sH, pick: sX, relativeLength: sF, removeEvent: sG, splat: sj, syncTimeout: sY } = V, sU = /* @__PURE__ */ __name((t10, e10) => sW(e10, void 0, void 0, sX(t10.options.allowDecimals, e10 < 0.5 || void 0 !== t10.tickAmount), !!t10.tickAmount), "sU");
      sO(sb, { xAxis: sx, yAxis: sR(sx, sy) });
      const _s$ = class _s$ {
        constructor(t10, e10, i10) {
          this.init(t10, e10, i10);
        }
        init(t10, e10, i10 = this.coll) {
          let s10 = "xAxis" === i10, o10 = this.isZAxis || (t10.inverted ? !s10 : s10);
          this.chart = t10, this.horiz = o10, this.isXAxis = s10, this.coll = i10, sE(this, "init", { userOptions: e10 }), this.opposite = sX(e10.opposite, this.opposite), this.side = sX(e10.side, this.side, o10 ? 2 * !this.opposite : this.opposite ? 1 : 3), this.setOptions(e10);
          let r10 = this.options, a10 = r10.labels;
          this.type ?? (this.type = r10.type || "linear"), this.uniqueNames ?? (this.uniqueNames = r10.uniqueNames ?? true), sE(this, "afterSetType"), this.userOptions = e10, this.minPixelPadding = 0, this.reversed = sX(r10.reversed, this.reversed), this.visible = r10.visible, this.zoomEnabled = r10.zoomEnabled, this.hasNames = "category" === this.type || true === r10.categories, this.categories = sB(r10.categories) && r10.categories || (this.hasNames ? [] : void 0), this.names || (this.names = [], this.names.keys = {}), this.plotLinesAndBandsGroups = {}, this.positiveValuesOnly = !!this.logarithmic, this.isLinked = sC(r10.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len ?? (this.len = 0), this.minRange = this.userMinRange = r10.minRange || r10.maxZoom, this.range = r10.range, this.offset = r10.offset || 0, this.max = void 0, this.min = void 0;
          let n10 = sX(r10.crosshair, sj(t10.options.tooltip.crosshairs)[+!s10]);
          this.crosshair = true === n10 ? {} : n10, -1 === t10.axes.indexOf(this) && (s10 ? t10.axes.splice(t10.xAxis.length, 0, this) : t10.axes.push(this), sD(this, t10[this.coll])), t10.orderItems(this.coll), this.series = this.series || [], t10.inverted && !this.isZAxis && s10 && !sC(this.reversed) && (this.reversed = true), this.labelRotation = sN(a10.rotation) ? a10.rotation : void 0, sv(this, r10), sE(this, "afterInit");
        }
        setOptions(t10) {
          let e10 = this.horiz ? { labels: { autoRotation: [-45], padding: 3 }, margin: 15 } : { labels: { padding: 1 }, title: { rotation: 90 * this.side } };
          this.options = sR(e10, "yAxis" === this.coll ? { title: { text: this.chart.options.lang.yAxisTitle } } : {}, sb[this.coll], t10), sE(this, "afterSetOptions", { userOptions: t10 });
        }
        defaultLabelFormatter() {
          let t10 = this.axis, { numberFormatter: e10 } = this.chart, i10 = sN(this.value) ? this.value : NaN, s10 = t10.chart.time, o10 = t10.categories, r10 = this.dateTimeLabelFormat, a10 = sb.lang, n10 = a10.numericSymbols, h10 = a10.numericSymbolMagnitude || 1e3, l2 = t10.logarithmic ? Math.abs(i10) : t10.tickInterval, d2 = n10?.length, c2, p2;
          if (o10) p2 = `${this.value}`;
          else if (r10) p2 = s10.dateFormat(r10, i10, true);
          else if (d2 && n10 && l2 >= 1e3) for (; d2-- && void 0 === p2; ) l2 >= (c2 = Math.pow(h10, d2 + 1)) && 10 * i10 % c2 == 0 && null !== n10[d2] && 0 !== i10 && (p2 = e10(i10 / c2, -1) + n10[d2]);
          return void 0 === p2 && (p2 = Math.abs(i10) >= 1e4 ? e10(i10, -1) : e10(i10, -1, void 0, "")), p2;
        }
        getSeriesExtremes() {
          let t10, e10 = this;
          sE(this, "getSeriesExtremes", null, function() {
            e10.hasVisibleSeries = false, e10.dataMin = e10.dataMax = e10.threshold = void 0, e10.softThreshold = !e10.isXAxis, e10.series.forEach((i10) => {
              if (i10.reserveSpace()) {
                let s10 = i10.options, o10, r10 = s10.threshold, a10, n10;
                if (e10.hasVisibleSeries = true, e10.positiveValuesOnly && 0 >= (r10 || 0) && (r10 = void 0), e10.isXAxis) (o10 = i10.getColumn("x")).length && (o10 = e10.logarithmic ? o10.filter((t11) => t11 > 0) : o10, a10 = (t10 = i10.getXExtremes(o10)).min, n10 = t10.max, sN(a10) || a10 instanceof Date || (o10 = o10.filter(sN), a10 = (t10 = i10.getXExtremes(o10)).min, n10 = t10.max), o10.length && (e10.dataMin = Math.min(sX(e10.dataMin, a10), a10), e10.dataMax = Math.max(sX(e10.dataMax, n10), n10)));
                else {
                  let t11 = i10.applyExtremes();
                  sN(t11.dataMin) && (a10 = t11.dataMin, e10.dataMin = Math.min(sX(e10.dataMin, a10), a10)), sN(t11.dataMax) && (n10 = t11.dataMax, e10.dataMax = Math.max(sX(e10.dataMax, n10), n10)), sC(r10) && (e10.threshold = r10), (!s10.softThreshold || e10.positiveValuesOnly) && (e10.softThreshold = false);
                }
              }
            });
          }), sE(this, "afterGetSeriesExtremes");
        }
        translate(t10, e10, i10, s10, o10, r10) {
          let a10 = this.linkedParent || this, n10 = s10 && a10.old ? a10.old.min : a10.min;
          if (!sN(n10)) return NaN;
          let h10 = a10.minPixelPadding, l2 = (a10.isOrdinal || a10.brokenAxis?.hasBreaks || a10.logarithmic && o10) && !!a10.lin2val, d2 = 1, c2 = 0, p2 = s10 && a10.old ? a10.old.transA : a10.transA, g2 = 0;
          return p2 || (p2 = a10.transA), i10 && (d2 *= -1, c2 = a10.len), a10.reversed && (d2 *= -1, c2 -= d2 * (a10.sector || a10.len)), e10 ? (g2 = (t10 = t10 * d2 + c2 - h10) / p2 + n10, l2 && (g2 = a10.lin2val(g2))) : (l2 && (t10 = a10.val2lin(t10)), g2 = d2 * (t10 - n10) * p2 + c2 + d2 * h10 + (sN(r10) ? p2 * r10 : 0), a10.isRadial || (g2 = sT(g2))), g2;
        }
        toPixels(t10, e10) {
          return this.translate(this.chart?.time.parse(t10) ?? NaN, false, !this.horiz, void 0, true) + (e10 ? 0 : this.pos);
        }
        toValue(t10, e10) {
          return this.translate(t10 - (e10 ? 0 : this.pos), true, !this.horiz, void 0, true);
        }
        getPlotLinePath(t10) {
          let e10 = this, i10 = e10.chart, s10 = e10.left, o10 = e10.top, r10 = t10.old, a10 = t10.value, n10 = t10.lineWidth, h10 = r10 && i10.oldChartHeight || i10.chartHeight, l2 = r10 && i10.oldChartWidth || i10.chartWidth, d2 = e10.transB, c2 = t10.translatedValue, p2 = t10.force, g2, u2, f2, m2, x2;
          function y2(t11, e11, i11) {
            return "pass" !== p2 && (t11 < e11 || t11 > i11) && (p2 ? t11 = sS(t11, e11, i11) : x2 = true), t11;
          }
          __name(y2, "y");
          let b2 = { value: a10, lineWidth: n10, old: r10, force: p2, acrossPanes: t10.acrossPanes, translatedValue: c2 };
          return sE(this, "getPlotLinePath", b2, function(t11) {
            g2 = f2 = (c2 = sS(c2 = sX(c2, e10.translate(a10, void 0, void 0, r10)), -1e9, 1e9)) + d2, u2 = m2 = h10 - c2 - d2, sN(c2) ? e10.horiz ? (u2 = o10, m2 = h10 - e10.bottom + (e10.options.isInternal ? 0 : i10.scrollablePixelsY || 0), g2 = f2 = y2(g2, s10, s10 + e10.width)) : (g2 = s10, f2 = l2 - e10.right + (i10.scrollablePixelsX || 0), u2 = m2 = y2(u2, o10, o10 + e10.height)) : (x2 = true, p2 = false), t11.path = x2 && !p2 ? void 0 : i10.renderer.crispLine([["M", g2, u2], ["L", f2, m2]], n10 || 1);
          }), b2.path;
        }
        getLinearTickPositions(t10, e10, i10) {
          let s10, o10, r10, a10 = sT(Math.floor(e10 / t10) * t10), n10 = sT(Math.ceil(i10 / t10) * t10), h10 = [];
          if (sT(a10 + t10) === a10 && (r10 = 20), this.single) return [e10];
          for (s10 = a10; s10 <= n10 && (h10.push(s10), (s10 = sT(s10 + t10, r10)) !== o10); ) o10 = s10;
          return h10;
        }
        getMinorTickInterval() {
          let { minorTicks: t10, minorTickInterval: e10 } = this.options;
          return true === t10 ? sX(e10, "auto") : false !== t10 ? e10 : void 0;
        }
        getMinorTickPositions() {
          let t10 = this.options, e10 = this.tickPositions, i10 = this.minorTickInterval, s10 = this.pointRangePadding || 0, o10 = (this.min || 0) - s10, r10 = (this.max || 0) + s10, a10 = this.brokenAxis?.hasBreaks ? this.brokenAxis.unitLength : r10 - o10, n10 = [], h10;
          if (a10 && a10 / i10 < this.len / 3) {
            let s11 = this.logarithmic;
            if (s11) this.paddedTicks.forEach(function(t11, e11, o11) {
              e11 && n10.push.apply(n10, s11.getLogTickPositions(i10, o11[e11 - 1], o11[e11], true));
            });
            else if (this.dateTime && "auto" === this.getMinorTickInterval()) n10 = n10.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(i10), o10, r10, t10.startOfWeek));
            else for (h10 = o10 + (e10[0] - o10) % i10; h10 <= r10 && h10 !== n10[0]; h10 += i10) n10.push(h10);
          }
          return 0 !== n10.length && this.trimTicks(n10), n10;
        }
        adjustForMinRange() {
          let t10 = this.options, e10 = this.logarithmic, i10 = this.chart.time, { max: s10, min: o10, minRange: r10 } = this, a10, n10, h10, l2;
          this.isXAxis && void 0 === r10 && !e10 && (r10 = sC(t10.min) || sC(t10.max) || sC(t10.floor) || sC(t10.ceiling) ? null : Math.min(5 * (sI(this.series.map((t11) => {
            let e11 = t11.getColumn("x");
            return t11.xIncrement ? e11.slice(0, 2) : e11;
          })) || 0), this.dataMax - this.dataMin)), sN(s10) && sN(o10) && sN(r10) && s10 - o10 < r10 && (n10 = this.dataMax - this.dataMin >= r10, a10 = (r10 - s10 + o10) / 2, h10 = [o10 - a10, i10.parse(t10.min) ?? o10 - a10], n10 && (h10[2] = e10 ? e10.log2lin(this.dataMin) : this.dataMin), l2 = [(o10 = sw(h10)) + r10, i10.parse(t10.max) ?? o10 + r10], n10 && (l2[2] = e10 ? e10.log2lin(this.dataMax) : this.dataMax), (s10 = sM(l2)) - o10 < r10 && (h10[0] = s10 - r10, h10[1] = i10.parse(t10.min) ?? s10 - r10, o10 = sw(h10))), this.minRange = r10, this.min = o10, this.max = s10;
        }
        getClosest() {
          let t10, e10;
          if (this.categories) e10 = 1;
          else {
            let i10 = [];
            this.series.forEach(function(t11) {
              let s10 = t11.closestPointRange, o10 = t11.getColumn("x");
              1 === o10.length ? i10.push(o10[0]) : t11.sorted && sC(s10) && t11.reserveSpace() && (e10 = sC(e10) ? Math.min(e10, s10) : s10);
            }), i10.length && (i10.sort((t11, e11) => t11 - e11), t10 = sI([i10]));
          }
          return t10 && e10 ? Math.min(t10, e10) : t10 || e10;
        }
        nameToX(t10) {
          let e10 = sB(this.options.categories), i10 = e10 ? this.categories : this.names, s10 = t10.options.x, o10;
          return t10.series.requireSorting = false, sC(s10) || (s10 = this.uniqueNames && i10 ? e10 ? i10.indexOf(t10.name) : sX(i10.keys[t10.name], -1) : t10.series.autoIncrement()), -1 === s10 ? !e10 && i10 && (o10 = i10.length) : sN(s10) && (o10 = s10), void 0 !== o10 ? (this.names[o10] = t10.name, this.names.keys[t10.name] = o10) : t10.x && (o10 = t10.x), o10;
        }
        updateNames() {
          let t10 = this, e10 = this.names;
          e10.length > 0 && (Object.keys(e10.keys).forEach(function(t11) {
            delete e10.keys[t11];
          }), e10.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach((e11) => {
            e11.xIncrement = null, (!e11.points || e11.isDirtyData) && (t10.max = Math.max(t10.max || 0, e11.dataTable.rowCount - 1), e11.processData(), e11.generatePoints());
            let i10 = e11.getColumn("x").slice();
            e11.data.forEach((e12, s10) => {
              let o10 = i10[s10];
              e12?.options && void 0 !== e12.name && void 0 !== (o10 = t10.nameToX(e12)) && o10 !== e12.x && (i10[s10] = e12.x = o10);
            }), e11.dataTable.setColumn("x", i10);
          }));
        }
        setAxisTranslation() {
          let t10 = this, e10 = t10.max - t10.min, i10 = t10.linkedParent, s10 = !!t10.categories, o10 = t10.isXAxis, r10 = t10.axisPointRange || 0, a10, n10 = 0, h10 = 0, l2, d2 = t10.transA;
          (o10 || s10 || r10) && (a10 = t10.getClosest(), i10 ? (n10 = i10.minPointOffset, h10 = i10.pointRangePadding) : t10.series.forEach(function(e11) {
            let i11 = s10 ? 1 : o10 ? sX(e11.options.pointRange, a10, 0) : t10.axisPointRange || 0, l3 = e11.options.pointPlacement;
            if (r10 = Math.max(r10, i11), !t10.single || s10) {
              let t11 = e11.is("xrange") ? !o10 : o10;
              n10 = Math.max(n10, t11 && sz(l3) ? 0 : i11 / 2), h10 = Math.max(h10, t11 && "on" === l3 ? 0 : i11);
            }
          }), l2 = t10.ordinal?.slope && a10 ? t10.ordinal.slope / a10 : 1, t10.minPointOffset = n10 *= l2, t10.pointRangePadding = h10 *= l2, t10.pointRange = Math.min(r10, t10.single && s10 ? 1 : e10), o10 && (t10.closestPointRange = a10)), t10.translationSlope = t10.transA = d2 = t10.staticScale || t10.len / (e10 + h10 || 1), t10.transB = t10.horiz ? t10.left : t10.bottom, t10.minPixelPadding = d2 * n10, sE(this, "afterSetAxisTranslation");
        }
        minFromRange() {
          let { max: t10, min: e10 } = this;
          return sN(t10) && sN(e10) && t10 - e10 || void 0;
        }
        setTickInterval(t10) {
          let { categories: e10, chart: i10, dataMax: s10, dataMin: o10, dateTime: r10, isXAxis: a10, logarithmic: n10, options: h10, softThreshold: l2 } = this, d2 = i10.time, c2 = sN(this.threshold) ? this.threshold : void 0, p2 = this.minRange || 0, { ceiling: g2, floor: u2, linkedTo: f2, softMax: m2, softMin: x2 } = h10, y2 = sN(f2) && i10[this.coll]?.[f2], b2 = h10.tickPixelInterval, v2 = h10.maxPadding, k2 = h10.minPadding, w2 = 0, M2, S2 = sN(h10.tickInterval) && h10.tickInterval >= 0 ? h10.tickInterval : void 0, T2, C2, A2, P2;
          if (r10 || e10 || y2 || this.getTickAmount(), A2 = sX(this.userMin, d2.parse(h10.min)), P2 = sX(this.userMax, d2.parse(h10.max)), y2 ? (this.linkedParent = y2, M2 = y2.getExtremes(), this.min = sX(M2.min, M2.dataMin), this.max = sX(M2.max, M2.dataMax), this.type !== y2.type && sL(11, true, i10)) : (l2 && sC(c2) && sN(s10) && sN(o10) && (o10 >= c2 ? (T2 = c2, k2 = 0) : s10 <= c2 && (C2 = c2, v2 = 0)), this.min = sX(A2, T2, o10), this.max = sX(P2, C2, s10)), sN(this.max) && sN(this.min) && (n10 && (this.positiveValuesOnly && !t10 && 0 >= Math.min(this.min, sX(o10, this.min)) && sL(10, true, i10), this.min = sT(n10.log2lin(this.min), 16), this.max = sT(n10.log2lin(this.max), 16)), this.range && sN(o10) && (this.userMin = this.min = A2 = Math.max(o10, this.minFromRange() || 0), this.userMax = P2 = this.max, this.range = void 0)), sE(this, "foundExtremes"), this.adjustForMinRange(), sN(this.min) && sN(this.max)) {
            if (!sN(this.userMin) && sN(x2) && x2 < this.min && (this.min = A2 = x2), !sN(this.userMax) && sN(m2) && m2 > this.max && (this.max = P2 = m2), e10 || this.axisPointRange || this.stacking?.usePercentage || y2 || (w2 = this.max - this.min) && (!sC(A2) && k2 && (this.min -= w2 * k2), !sC(P2) && v2 && (this.max += w2 * v2)), !sN(this.userMin) && sN(u2) && (this.min = Math.max(this.min, u2)), !sN(this.userMax) && sN(g2) && (this.max = Math.min(this.max, g2)), l2 && sN(o10) && sN(s10)) {
              let t11 = c2 || 0;
              !sC(A2) && this.min < t11 && o10 >= t11 ? this.min = h10.minRange ? Math.min(t11, this.max - p2) : t11 : !sC(P2) && this.max > t11 && s10 <= t11 && (this.max = h10.minRange ? Math.max(t11, this.min + p2) : t11);
            }
            !i10.polar && this.min > this.max && (sC(h10.min) ? this.max = this.min : sC(h10.max) && (this.min = this.max)), w2 = this.max - this.min;
          }
          if (this.min !== this.max && sN(this.min) && sN(this.max) ? y2 && !S2 && b2 === y2.options.tickPixelInterval ? this.tickInterval = S2 = y2.tickInterval : this.tickInterval = sX(S2, this.tickAmount ? w2 / Math.max(this.tickAmount - 1, 1) : void 0, e10 ? 1 : w2 * b2 / Math.max(this.len, b2)) : this.tickInterval = 1, a10 && !t10) {
            let t11 = this.min !== this.old?.min || this.max !== this.old?.max;
            this.series.forEach(function(e11) {
              e11.forceCrop = e11.forceCropping?.(), e11.processData(t11);
            }), sE(this, "postProcessData", { hasExtremesChanged: t11 });
          }
          this.setAxisTranslation(), sE(this, "initialAxisTranslation"), this.pointRange && !S2 && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          let L2 = sX(h10.minTickInterval, r10 && !this.series.some((t11) => !t11.sorted) ? this.closestPointRange : 0);
          !S2 && L2 && this.tickInterval < L2 && (this.tickInterval = L2), r10 || n10 || S2 || (this.tickInterval = sU(this, this.tickInterval)), this.tickAmount || (this.tickInterval = this.unsquish()), this.setTickPositions();
        }
        setTickPositions() {
          let t10 = this.options, e10 = t10.tickPositions, i10 = t10.tickPositioner, s10 = this.getMinorTickInterval(), o10 = !this.isPanning, r10 = o10 && t10.startOnTick, a10 = o10 && t10.endOnTick, n10 = [], h10;
          if (this.tickmarkOffset = this.categories && "between" === t10.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0, this.single = this.min === this.max && sC(this.min) && !this.tickAmount && (this.min % 1 == 0 || false !== t10.allowDecimals), e10) n10 = e10.slice();
          else if (sN(this.min) && sN(this.max)) {
            if (!this.ordinal?.positions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) n10 = [this.min, this.max], sL(19, false, this.chart);
            else if (this.dateTime) n10 = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, t10.units), this.min, this.max, t10.startOfWeek, this.ordinal?.positions, this.closestPointRange, true);
            else if (this.logarithmic) n10 = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
            else {
              let t11 = this.tickInterval, e11 = t11;
              for (; e11 <= 2 * t11; ) if (n10 = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && n10.length > this.tickAmount) this.tickInterval = sU(this, e11 *= 1.1);
              else break;
            }
            n10.length > this.len && (n10 = [n10[0], n10[n10.length - 1]])[0] === n10[1] && (n10.length = 1), i10 && (this.tickPositions = n10, (h10 = i10.apply(this, [this.min, this.max])) && (n10 = h10));
          }
          this.tickPositions = n10, this.minorTickInterval = "auto" === s10 && this.tickInterval ? this.tickInterval / t10.minorTicksPerMajor : s10, this.paddedTicks = n10.slice(0), this.trimTicks(n10, r10, a10), !this.isLinked && sN(this.min) && sN(this.max) && (this.single && n10.length < 2 && !this.categories && !this.series.some((t11) => t11.is("heatmap") && "between" === t11.options.pointPlacement) && (this.min -= 0.5, this.max += 0.5), e10 || h10 || this.adjustTickAmount()), sE(this, "afterSetTickPositions");
        }
        trimTicks(t10, e10, i10) {
          let s10 = t10[0], o10 = t10[t10.length - 1], r10 = !this.isOrdinal && this.minPointOffset || 0;
          if (sE(this, "trimTicks"), !this.isLinked || !this.grid) {
            if (e10 && s10 !== -1 / 0) this.min = s10;
            else for (; this.min - r10 > t10[0]; ) t10.shift();
            if (i10) this.max = o10;
            else for (; this.max + r10 < t10[t10.length - 1]; ) t10.pop();
            0 === t10.length && sC(s10) && !this.options.tickPositions && t10.push((o10 + s10) / 2);
          }
        }
        alignToOthers() {
          let t10, e10 = this, i10 = e10.chart, s10 = [this], o10 = e10.options, r10 = i10.options.chart, a10 = "yAxis" === this.coll && r10.alignThresholds, n10 = [];
          if (e10.thresholdAlignment = void 0, (false !== r10.alignTicks && o10.alignTicks || a10) && false !== o10.startOnTick && false !== o10.endOnTick && !e10.logarithmic) {
            let o11 = /* @__PURE__ */ __name((t11) => {
              let { horiz: e11, options: i11 } = t11;
              return [e11 ? i11.left : i11.top, i11.width, i11.height, i11.pane].join(",");
            }, "o"), r11 = o11(this);
            i10[this.coll].forEach(function(i11) {
              let { series: a11 } = i11;
              a11.length && a11.some((t11) => t11.visible) && i11 !== e10 && o11(i11) === r11 && (t10 = true, s10.push(i11));
            });
          }
          if (t10 && a10) {
            s10.forEach((t12) => {
              let i11 = t12.getThresholdAlignment(e10);
              sN(i11) && n10.push(i11);
            });
            let t11 = n10.length > 1 ? n10.reduce((t12, e11) => t12 += e11, 0) / n10.length : void 0;
            s10.forEach((e11) => {
              e11.thresholdAlignment = t11;
            });
          }
          return t10;
        }
        getThresholdAlignment(t10) {
          if ((!sN(this.dataMin) || this !== t10 && this.series.some((t11) => t11.isDirty || t11.isDirtyData)) && this.getSeriesExtremes(), sN(this.threshold)) {
            let t11 = sS((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1);
            return this.options.reversed && (t11 = 1 - t11), t11;
          }
        }
        getTickAmount() {
          let t10 = this.options, e10 = t10.tickPixelInterval, i10 = t10.tickAmount;
          sC(t10.tickInterval) || i10 || !(this.len < e10) || this.isRadial || this.logarithmic || !t10.startOnTick || !t10.endOnTick || (i10 = 2), !i10 && this.alignToOthers() && (i10 = Math.ceil(this.len / e10) + 1), i10 < 4 && (this.finalTickAmt = i10, i10 = 5), this.tickAmount = i10;
        }
        adjustTickAmount() {
          let t10 = this, { finalTickAmt: e10, max: i10, min: s10, options: o10, tickPositions: r10, tickAmount: a10, thresholdAlignment: n10 } = t10, h10 = r10?.length, l2 = sX(t10.threshold, t10.softThreshold ? 0 : null), d2, c2, p2 = t10.tickInterval, g2, u2 = /* @__PURE__ */ __name(() => r10.push(sT(r10[r10.length - 1] + p2)), "u"), f2 = /* @__PURE__ */ __name(() => r10.unshift(sT(r10[0] - p2)), "f");
          if (sN(n10) && (g2 = n10 < 0.5 ? Math.ceil(n10 * (a10 - 1)) : Math.floor(n10 * (a10 - 1)), o10.reversed && (g2 = a10 - 1 - g2)), t10.hasData() && sN(s10) && sN(i10)) {
            let n11 = /* @__PURE__ */ __name(() => {
              t10.transA *= (h10 - 1) / (a10 - 1), t10.min = o10.startOnTick ? r10[0] : Math.min(s10, r10[0]), t10.max = o10.endOnTick ? r10[r10.length - 1] : Math.max(i10, r10[r10.length - 1]);
            }, "n");
            if (sN(g2) && sN(t10.threshold)) {
              for (; r10[g2] !== l2 || r10.length !== a10 || r10[0] > s10 || r10[r10.length - 1] < i10; ) {
                for (r10.length = 0, r10.push(t10.threshold); r10.length < a10; ) void 0 === r10[g2] || r10[g2] > t10.threshold ? f2() : u2();
                if (p2 > 8 * t10.tickInterval) break;
                p2 *= 2;
              }
              n11();
            } else if (h10 < a10) {
              for (; r10.length < a10; ) r10.length % 2 || s10 === l2 ? u2() : f2();
              n11();
            }
            if (sC(e10)) {
              for (c2 = d2 = r10.length; c2--; ) (3 === e10 && c2 % 2 == 1 || e10 <= 2 && c2 > 0 && c2 < d2 - 1) && r10.splice(c2, 1);
              t10.finalTickAmt = void 0;
            }
          }
        }
        setScale() {
          let { coll: t10, stacking: e10 } = this, i10 = false, s10 = false;
          this.series.forEach((t11) => {
            i10 = i10 || t11.isDirtyData || t11.isDirty, s10 = s10 || t11.xAxis?.isDirty || false;
          }), this.setAxisSize();
          let o10 = this.len !== this.old?.len;
          o10 || i10 || s10 || this.isLinked || this.forceRedraw || this.userMin !== this.old?.userMin || this.userMax !== this.old?.userMax || this.alignToOthers() ? (e10 && "yAxis" === t10 && e10.buildStacks(), this.forceRedraw = false, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), e10 && "xAxis" === t10 && e10.buildStacks(), this.isDirty || (this.isDirty = o10 || this.min !== this.old?.min || this.max !== this.old?.max)) : e10 && e10.cleanStacks(), i10 && delete this.allExtremes, sE(this, "afterSetScale");
        }
        setExtremes(t10, e10, i10 = true, s10, o10) {
          let r10 = this.chart;
          this.series.forEach((t11) => {
            delete t11.kdTree;
          }), t10 = r10.time.parse(t10), e10 = r10.time.parse(e10), sE(this, "setExtremes", o10 = sO(o10, { min: t10, max: e10 }), (t11) => {
            this.userMin = t11.min, this.userMax = t11.max, this.eventArgs = t11, i10 && r10.redraw(s10);
          });
        }
        setAxisSize() {
          let t10 = this.chart, e10 = this.options, i10 = e10.offsets || [0, 0, 0, 0], s10 = this.horiz, o10 = this.width = Math.round(sF(sX(e10.width, t10.plotWidth - i10[3] + i10[1]), t10.plotWidth)), r10 = this.height = Math.round(sF(sX(e10.height, t10.plotHeight - i10[0] + i10[2]), t10.plotHeight)), a10 = this.top = Math.round(sF(sX(e10.top, t10.plotTop + i10[0]), t10.plotHeight, t10.plotTop)), n10 = this.left = Math.round(sF(sX(e10.left, t10.plotLeft + i10[3]), t10.plotWidth, t10.plotLeft));
          this.bottom = t10.chartHeight - r10 - a10, this.right = t10.chartWidth - o10 - n10, this.len = Math.max(s10 ? o10 : r10, 0), this.pos = s10 ? n10 : a10;
        }
        getExtremes() {
          let t10 = this.logarithmic;
          return { min: t10 ? sT(t10.lin2log(this.min)) : this.min, max: t10 ? sT(t10.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
        }
        getThreshold(t10) {
          let e10 = this.logarithmic, i10 = e10 ? e10.lin2log(this.min) : this.min, s10 = e10 ? e10.lin2log(this.max) : this.max;
          return null === t10 || t10 === -1 / 0 ? t10 = i10 : t10 === 1 / 0 ? t10 = s10 : i10 > t10 ? t10 = i10 : s10 < t10 && (t10 = s10), this.translate(t10, 0, 1, 0, 1);
        }
        autoLabelAlign(t10) {
          let e10 = (sX(t10, 0) - 90 * this.side + 720) % 360, i10 = { align: "center" };
          return sE(this, "autoLabelAlign", i10, function(t11) {
            e10 > 15 && e10 < 165 ? t11.align = "right" : e10 > 195 && e10 < 345 && (t11.align = "left");
          }), i10.align;
        }
        tickSize(t10) {
          let e10 = this.options, i10 = sX(e10["tick" === t10 ? "tickWidth" : "minorTickWidth"], "tick" === t10 && this.isXAxis && !this.categories ? 1 : 0), s10 = e10["tick" === t10 ? "tickLength" : "minorTickLength"], o10;
          i10 && s10 && ("inside" === e10[t10 + "Position"] && (s10 = -s10), o10 = [s10, i10]);
          let r10 = { tickSize: o10 };
          return sE(this, "afterTickSize", r10), r10.tickSize;
        }
        labelMetrics() {
          let t10 = this.chart.renderer, e10 = this.ticks, i10 = e10[Object.keys(e10)[0]] || {};
          return this.chart.renderer.fontMetrics(i10.label || i10.movedLabel || t10.box);
        }
        unsquish() {
          let t10 = this.options.labels, e10 = t10.padding || 0, i10 = this.horiz, s10 = this.tickInterval, o10 = this.len / ((+!!this.categories + this.max - this.min) / s10), r10 = t10.rotation, a10 = sT(0.8 * this.labelMetrics().h), n10 = Math.max(this.max - this.min, 0), h10 = /* @__PURE__ */ __name(function(t11) {
            let i11 = (t11 + 2 * e10) / (o10 || 1);
            return (i11 = i11 > 1 ? Math.ceil(i11) : 1) * s10 > n10 && t11 !== 1 / 0 && o10 !== 1 / 0 && n10 && (i11 = Math.ceil(n10 / s10)), sT(i11 * s10);
          }, "h"), l2 = s10, d2, c2 = Number.MAX_VALUE, p2;
          if (i10) {
            if (!t10.staggerLines && (sN(r10) ? p2 = [r10] : o10 < t10.autoRotationLimit && (p2 = t10.autoRotation)), p2) {
              let t11, e11;
              for (let i11 of p2) (i11 === r10 || i11 && i11 >= -90 && i11 <= 90) && (e11 = (t11 = h10(Math.abs(a10 / Math.sin(sk * i11)))) + Math.abs(i11 / 360)) < c2 && (c2 = e11, d2 = i11, l2 = t11);
            }
          } else l2 = h10(0.75 * a10);
          return this.autoRotation = p2, this.labelRotation = sX(d2, sN(r10) ? r10 : 0), t10.step ? s10 : l2;
        }
        getSlotWidth(t10) {
          let e10 = this.chart, i10 = this.horiz, s10 = this.options.labels, o10 = Math.max(this.tickPositions.length - !this.categories, 1), r10 = e10.margin[3];
          if (t10 && sN(t10.slotWidth)) return t10.slotWidth;
          if (i10 && s10.step < 2 && !this.isRadial) return s10.rotation ? 0 : (this.staggerLines || 1) * this.len / o10;
          if (!i10) {
            let t11 = s10.style.width;
            if (void 0 !== t11) return parseInt(String(t11), 10);
            if (!this.opposite && r10) return r10 - e10.spacing[3];
          }
          return 0.33 * e10.chartWidth;
        }
        renderUnsquish() {
          let t10 = this.chart, e10 = t10.renderer, i10 = this.tickPositions, s10 = this.ticks, o10 = this.options.labels, r10 = o10.style, a10 = this.horiz, n10 = this.getSlotWidth(), h10 = Math.max(1, Math.round(n10 - (a10 ? 2 * (o10.padding || 0) : o10.distance || 0))), l2 = {}, d2 = this.labelMetrics(), c2 = r10.lineClamp, p2, g2 = c2 ?? (Math.floor(this.len / (i10.length * d2.h)) || 1), u2 = 0;
          sz(o10.rotation) || (l2.rotation = o10.rotation || 0), i10.forEach(function(t11) {
            let e11 = s10[t11];
            e11.movedLabel && e11.replaceMovedLabel();
            let i11 = e11.label?.textPxLength || 0;
            i11 > u2 && (u2 = i11);
          }), this.maxLabelLength = u2, this.autoRotation ? u2 > h10 && u2 > d2.h ? l2.rotation = this.labelRotation : this.labelRotation = 0 : n10 && (p2 = h10), l2.rotation && (p2 = u2 > 0.5 * t10.chartHeight ? 0.33 * t10.chartHeight : u2, c2 || (g2 = 1)), this.labelAlign = o10.align || this.autoLabelAlign(this.labelRotation), this.labelAlign && (l2.align = this.labelAlign), i10.forEach(function(t11) {
            let e11 = s10[t11], i11 = e11?.label, o11 = r10.width, a11 = {};
            i11 && (i11.attr(l2), e11.shortenLabel ? e11.shortenLabel() : p2 && !o11 && "nowrap" !== r10.whiteSpace && (p2 < (i11.textPxLength || 0) || "SPAN" === i11.element.tagName) ? i11.css(sO(a11, { width: `${p2}px`, lineClamp: g2 })) : !i11.styles.width || a11.width || o11 || i11.css({ width: "auto" }), e11.rotation = l2.rotation);
          }, this), this.tickRotCorr = e10.rotCorr(d2.b, this.labelRotation || 0, 0 !== this.side);
        }
        hasData() {
          return this.series.some(function(t10) {
            return t10.hasData();
          }) || this.options.showEmpty && sC(this.min) && sC(this.max);
        }
        addTitle(t10) {
          let e10, i10 = this.chart.renderer, s10 = this.horiz, o10 = this.opposite, r10 = this.options.title, a10 = this.chart.styledMode;
          this.axisTitle || ((e10 = r10.textAlign) || (e10 = (s10 ? { low: "left", middle: "center", high: "right" } : { low: o10 ? "right" : "left", middle: "center", high: o10 ? "left" : "right" })[r10.align]), this.axisTitle = i10.text(r10.text || "", 0, 0, r10.useHTML).attr({ zIndex: 7, rotation: r10.rotation || 0, align: e10 }).addClass("highcharts-axis-title"), a10 || this.axisTitle.css(sR(r10.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = true), a10 || r10.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" }), this.axisTitle[t10 ? "show" : "hide"](t10);
        }
        generateTick(t10) {
          let e10 = this.ticks;
          e10[t10] ? e10[t10].addLabel() : e10[t10] = new sf(this, t10);
        }
        createGroups() {
          let { axisParent: t10, chart: e10, coll: i10, options: s10 } = this, o10 = e10.renderer, r10 = /* @__PURE__ */ __name((e11, r11, a10) => o10.g(e11).attr({ zIndex: a10 }).addClass(`highcharts-${i10.toLowerCase()}${r11} ` + (this.isRadial ? `highcharts-radial-axis${r11} ` : "") + (s10.className || "")).add(t10), "r");
          this.axisGroup || (this.gridGroup = r10("grid", "-grid", s10.gridZIndex), this.axisGroup = r10("axis", "", s10.zIndex), this.labelGroup = r10("axis-labels", "-labels", s10.labels.zIndex));
        }
        getOffset() {
          let t10 = this, { chart: e10, horiz: i10, options: s10, side: o10, ticks: r10, tickPositions: a10, coll: n10 } = t10, h10 = e10.inverted && !t10.isZAxis ? [1, 0, 3, 2][o10] : o10, l2 = t10.hasData(), d2 = s10.title, c2 = s10.labels, p2 = sN(s10.crossing), g2 = e10.axisOffset, u2 = e10.clipOffset, f2 = [-1, 1, 1, -1][o10], m2, x2 = 0, y2, b2 = 0, v2 = 0, k2, w2;
          if (t10.showAxis = m2 = l2 || s10.showEmpty, t10.staggerLines = t10.horiz && c2.staggerLines || void 0, t10.createGroups(), l2 || t10.isLinked ? (a10.forEach(function(e11) {
            t10.generateTick(e11);
          }), t10.renderUnsquish(), t10.reserveSpaceDefault = 0 === o10 || 2 === o10 || { 1: "left", 3: "right" }[o10] === t10.labelAlign, sX(c2.reserveSpace, !p2 && null, "center" === t10.labelAlign || null, t10.reserveSpaceDefault) && a10.forEach(function(t11) {
            v2 = Math.max(r10[t11].getLabelSize(), v2);
          }), t10.staggerLines && (v2 *= t10.staggerLines), t10.labelOffset = v2 * (t10.opposite ? -1 : 1)) : sH(r10, function(t11, e11) {
            t11.destroy(), delete r10[e11];
          }), d2?.text && false !== d2.enabled && (t10.addTitle(m2), m2 && !p2 && false !== d2.reserveSpace && (t10.titleOffset = x2 = t10.axisTitle.getBBox()[i10 ? "height" : "width"], b2 = sC(y2 = d2.offset) ? 0 : sX(d2.margin, i10 ? 5 : 10))), t10.renderLine(), t10.offset = f2 * sX(s10.offset, g2[o10] ? g2[o10] + (s10.margin || 0) : 0), t10.tickRotCorr = t10.tickRotCorr || { x: 0, y: 0 }, w2 = 0 === o10 ? -t10.labelMetrics().h : 2 === o10 ? t10.tickRotCorr.y : 0, k2 = Math.abs(v2) + b2, v2 && (k2 -= w2, k2 += f2 * (i10 ? sX(c2.y, t10.tickRotCorr.y + f2 * c2.distance) : sX(c2.x, f2 * c2.distance))), t10.axisTitleMargin = sX(y2, k2), t10.getMaxLabelDimensions && (t10.maxLabelDimensions = t10.getMaxLabelDimensions(r10, a10)), "colorAxis" !== n10 && u2) {
            let e11 = this.tickSize("tick");
            g2[o10] = Math.max(g2[o10], (t10.axisTitleMargin || 0) + x2 + f2 * t10.offset, k2, a10?.length && e11 ? e11[0] + f2 * t10.offset : 0);
            let i11 = !t10.axisLine || s10.offset ? 0 : t10.axisLine.strokeWidth() / 2;
            u2[h10] = Math.max(u2[h10], i11);
          }
          sE(this, "afterGetOffset");
        }
        getLinePath(t10) {
          let e10 = this.chart, i10 = this.opposite, s10 = this.offset, o10 = this.horiz, r10 = this.left + (i10 ? this.width : 0) + s10, a10 = e10.chartHeight - this.bottom - (i10 ? this.height : 0) + s10;
          return i10 && (t10 *= -1), e10.renderer.crispLine([["M", o10 ? this.left : r10, o10 ? a10 : this.top], ["L", o10 ? e10.chartWidth - this.right : r10, o10 ? a10 : e10.chartHeight - this.bottom]], t10);
        }
        renderLine() {
          !this.axisLine && (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
        }
        getTitlePosition(t10) {
          let e10 = this.horiz, i10 = this.left, s10 = this.top, o10 = this.len, r10 = this.options.title, a10 = e10 ? i10 : s10, n10 = this.opposite, h10 = this.offset, l2 = r10.x, d2 = r10.y, c2 = this.chart.renderer.fontMetrics(t10), p2 = t10 ? Math.max(t10.getBBox(false, 0).height - c2.h - 1, 0) : 0, g2 = { low: a10 + (e10 ? 0 : o10), middle: a10 + o10 / 2, high: a10 + (e10 ? o10 : 0) }[r10.align], u2 = (e10 ? s10 + this.height : i10) + (e10 ? 1 : -1) * (n10 ? -1 : 1) * (this.axisTitleMargin || 0) + [-p2, p2, c2.f, -p2][this.side], f2 = { x: e10 ? g2 + l2 : u2 + (n10 ? this.width : 0) + h10 + l2, y: e10 ? u2 + d2 - (n10 ? this.height : 0) + h10 : g2 + d2 };
          return sE(this, "afterGetTitlePosition", { titlePosition: f2 }), f2;
        }
        renderMinorTick(t10, e10) {
          let i10 = this.minorTicks;
          i10[t10] || (i10[t10] = new sf(this, t10, "minor")), e10 && i10[t10].isNew && i10[t10].render(null, true), i10[t10].render(null, false, 1);
        }
        renderTick(t10, e10, i10) {
          let s10 = this.isLinked, o10 = this.ticks;
          (!s10 || t10 >= this.min && t10 <= this.max || this.grid?.isColumn) && (o10[t10] || (o10[t10] = new sf(this, t10)), i10 && o10[t10].isNew && o10[t10].render(e10, true, -1), o10[t10].render(e10));
        }
        render() {
          let t10, e10, i10 = this, s10 = i10.chart, o10 = i10.logarithmic, r10 = s10.renderer, a10 = i10.options, n10 = i10.isLinked, h10 = i10.tickPositions, l2 = i10.axisTitle, d2 = i10.ticks, c2 = i10.minorTicks, p2 = i10.alternateBands, g2 = a10.stackLabels, u2 = a10.alternateGridColor, f2 = a10.crossing, m2 = i10.tickmarkOffset, x2 = i10.axisLine, y2 = i10.showAxis, b2 = sm(r10.globalAnimation);
          if (i10.labelEdge.length = 0, i10.overlap = false, [d2, c2, p2].forEach(function(t11) {
            sH(t11, function(t12) {
              t12.isActive = false;
            });
          }), sN(f2)) {
            let t11 = this.isXAxis ? s10.yAxis[0] : s10.xAxis[0], e11 = [1, -1, -1, 1][this.side];
            if (t11) {
              let s11 = t11.toPixels(f2, true);
              i10.horiz && (s11 = t11.len - s11), i10.offset = e11 * s11;
            }
          }
          if (i10.hasData() || n10) {
            let r11 = i10.chart.hasRendered && i10.old && sN(i10.old.min);
            i10.minorTickInterval && !i10.categories && i10.getMinorTickPositions().forEach(function(t11) {
              i10.renderMinorTick(t11, r11);
            }), h10.length && (h10.forEach(function(t11, e11) {
              i10.renderTick(t11, e11, r11);
            }), m2 && (0 === i10.min || i10.single) && (d2[-1] || (d2[-1] = new sf(i10, -1, null, true)), d2[-1].render(-1))), u2 && h10.forEach(function(r12, a11) {
              e10 = void 0 !== h10[a11 + 1] ? h10[a11 + 1] + m2 : i10.max - m2, a11 % 2 == 0 && r12 < i10.max && e10 <= i10.max + (s10.polar ? -m2 : m2) && (p2[r12] || (p2[r12] = new w.PlotLineOrBand(i10, {})), t10 = r12 + m2, p2[r12].options = { from: o10 ? o10.lin2log(t10) : t10, to: o10 ? o10.lin2log(e10) : e10, color: u2, className: "highcharts-alternate-grid" }, p2[r12].render(), p2[r12].isActive = true);
            }), i10._addedPlotLB || (i10._addedPlotLB = true, (a10.plotLines || []).concat(a10.plotBands || []).forEach(function(t11) {
              i10.addPlotBandOrLine(t11);
            }));
          }
          [d2, c2, p2].forEach(function(t11) {
            let e11 = [], i11 = b2.duration;
            sH(t11, function(t12, i12) {
              t12.isActive || (t12.render(i12, false, 0), t12.isActive = false, e11.push(i12));
            }), sY(function() {
              let i12 = e11.length;
              for (; i12--; ) t11[e11[i12]] && !t11[e11[i12]].isActive && (t11[e11[i12]].destroy(), delete t11[e11[i12]]);
            }, t11 !== p2 && s10.hasRendered && i11 ? i11 : 0);
          }), x2 && (x2[x2.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(x2.strokeWidth()) }), x2.isPlaced = true, x2[y2 ? "show" : "hide"](y2)), l2 && y2 && (l2[l2.isNew ? "attr" : "animate"](i10.getTitlePosition(l2)), l2.isNew = false), g2?.enabled && i10.stacking && i10.stacking.renderStackTotals(), i10.old = { len: i10.len, max: i10.max, min: i10.min, transA: i10.transA, userMax: i10.userMax, userMin: i10.userMin }, i10.isDirty = false, sE(this, "afterRender");
        }
        redraw() {
          this.visible && (this.render(), this.plotLinesAndBands.forEach(function(t10) {
            t10.render();
          })), this.series.forEach(function(t10) {
            t10.isDirty = true;
          });
        }
        getKeepProps() {
          return this.keepProps || _s$.keepProps;
        }
        destroy(t10) {
          let e10 = this, i10 = e10.plotLinesAndBands, s10 = this.eventOptions;
          if (sE(this, "destroy", { keepEvents: t10 }), t10 || sG(e10), [e10.ticks, e10.minorTicks, e10.alternateBands].forEach(function(t11) {
            sA(t11);
          }), i10) {
            let t11 = i10.length;
            for (; t11--; ) i10[t11].destroy();
          }
          for (let t11 in ["axisLine", "axisTitle", "axisGroup", "gridGroup", "labelGroup", "cross", "scrollbar"].forEach(function(t12) {
            e10[t12] && (e10[t12] = e10[t12].destroy());
          }), e10.plotLinesAndBandsGroups) e10.plotLinesAndBandsGroups[t11] = e10.plotLinesAndBandsGroups[t11].destroy();
          sH(e10, function(t11, i11) {
            -1 === e10.getKeepProps().indexOf(i11) && delete e10[i11];
          }), this.eventOptions = s10;
        }
        drawCrosshair(t10, e10) {
          let i10 = this.crosshair, s10 = i10?.snap ?? true, o10 = this.chart, r10, a10, n10, h10 = this.cross, l2;
          if (sE(this, "drawCrosshair", { e: t10, point: e10 }), t10 || (t10 = this.cross?.e), i10 && false !== (sC(e10) || !s10)) {
            if (s10 ? sC(e10) && (a10 = sX("colorAxis" !== this.coll ? e10.crosshairPos : null, this.isXAxis ? e10.plotX : this.len - e10.plotY)) : a10 = t10 && (this.horiz ? t10.chartX - this.pos : this.len - t10.chartY + this.pos), sC(a10) && (l2 = { value: e10 && (this.isXAxis ? e10.x : sX(e10.stackY, e10.y)), translatedValue: a10 }, o10.polar && sO(l2, { isCrosshair: true, chartX: t10?.chartX, chartY: t10?.chartY, point: e10 }), r10 = this.getPlotLinePath(l2) || null), !sC(r10)) return void this.hideCrosshair();
            n10 = this.categories && !this.isRadial, h10 || (this.cross = h10 = o10.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (n10 ? "category " : "thin ") + (i10.className || "")).attr({ zIndex: sX(i10.zIndex, 2) }).add(), !o10.styledMode && (h10.attr({ stroke: i10.color || (n10 ? tL.parse("#ccd3ff").setOpacity(0.25).get() : "#cccccc"), "stroke-width": sX(i10.width, 1) }).css({ "pointer-events": "none" }), i10.dashStyle && h10.attr({ dashstyle: i10.dashStyle }))), h10.show().attr({ d: r10 }), n10 && !i10.width && h10.attr({ "stroke-width": this.transA }), this.cross.e = t10;
          } else this.hideCrosshair();
          sE(this, "afterDrawCrosshair", { e: t10, point: e10 });
        }
        hideCrosshair() {
          this.cross && this.cross.hide(), sE(this, "afterHideCrosshair");
        }
        update(t10, e10) {
          let i10 = this.chart;
          t10 = sR(this.userOptions, t10), this.destroy(true), this.init(i10, t10), i10.isDirtyBox = true, sX(e10, true) && i10.redraw();
        }
        remove(t10) {
          let e10 = this.chart, i10 = this.coll, s10 = this.series, o10 = s10.length;
          for (; o10--; ) s10[o10] && s10[o10].remove(false);
          sP(e10.axes, this), sP(e10[i10] || [], this), e10.orderItems(i10), this.destroy(), e10.isDirtyBox = true, sX(t10, true) && e10.redraw();
        }
        setTitle(t10, e10) {
          this.update({ title: t10 }, e10);
        }
        setCategories(t10, e10) {
          this.update({ categories: t10 }, e10);
        }
      };
      __name(_s$, "s$");
      let s$ = _s$;
      s$.keepProps = ["coll", "extKey", "hcEvents", "len", "names", "series", "userMax", "userMin"];
      let { addEvent: sV, getMagnitude: sZ, normalizeTickInterval: s_, timeUnits: sq } = V;
      !(function(t10) {
        function e10() {
          return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
        }
        __name(e10, "e");
        function i10() {
          if ("datetime" !== this.type) {
            this.dateTime = void 0;
            return;
          }
          this.dateTime || (this.dateTime = new s10(this));
        }
        __name(i10, "i");
        t10.compose = function(t11) {
          return t11.keepProps.includes("dateTime") || (t11.keepProps.push("dateTime"), t11.prototype.getTimeTicks = e10, sV(t11, "afterSetType", i10)), t11;
        };
        const _s = class _s {
          constructor(t11) {
            this.axis = t11;
          }
          normalizeTimeTickInterval(t11, e11) {
            let i11 = e11 || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], s11 = i11[i11.length - 1], o10 = sq[s11[0]], r10 = s11[1], a10;
            for (a10 = 0; a10 < i11.length && (o10 = sq[(s11 = i11[a10])[0]], r10 = s11[1], !i11[a10 + 1] || !(t11 <= (o10 * r10[r10.length - 1] + sq[i11[a10 + 1][0]]) / 2)); a10++) ;
            o10 === sq.year && t11 < 5 * o10 && (r10 = [1, 2, 5]);
            let n10 = s_(t11 / o10, r10, "year" === s11[0] ? Math.max(sZ(t11 / o10), 1) : 1);
            return { unitRange: o10, count: n10, unitName: s11[0] };
          }
          getXDateFormat(t11, e11) {
            let { axis: i11 } = this, s11 = i11.chart.time;
            return i11.closestPointRange ? s11.getDateFormat(i11.closestPointRange, t11, i11.options.startOfWeek, e11) || s11.resolveDTLFormat(e11.year).main : s11.resolveDTLFormat(e11.day).main;
          }
        };
        __name(_s, "s");
        let s10 = _s;
        t10.Additions = s10;
      })(n || (n = {}));
      let sK = n, { addEvent: sJ, normalizeTickInterval: sQ, pick: s0 } = V;
      !(function(t10) {
        function e10() {
          "logarithmic" !== this.type ? this.logarithmic = void 0 : this.logarithmic ?? (this.logarithmic = new s10(this));
        }
        __name(e10, "e");
        function i10() {
          let t11 = this.logarithmic;
          t11 && (this.lin2val = function(e11) {
            return t11.lin2log(e11);
          }, this.val2lin = function(e11) {
            return t11.log2lin(e11);
          });
        }
        __name(i10, "i");
        t10.compose = function(t11) {
          return t11.keepProps.includes("logarithmic") || (t11.keepProps.push("logarithmic"), sJ(t11, "afterSetType", e10), sJ(t11, "afterInit", i10)), t11;
        };
        const _s = class _s {
          constructor(t11) {
            this.axis = t11;
          }
          getLogTickPositions(t11, e11, i11, s11) {
            let o10 = this.axis, r10 = o10.len, a10 = o10.options, n10 = [];
            if (s11 || (this.minorAutoInterval = void 0), t11 >= 0.5) t11 = Math.round(t11), n10 = o10.getLinearTickPositions(t11, e11, i11);
            else if (t11 >= 0.08) {
              let o11, r11, a11, h10, l2, d2, c2, p2 = Math.floor(e11);
              for (o11 = t11 > 0.3 ? [1, 2, 4] : t11 > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9], r11 = p2; r11 < i11 + 1 && !c2; r11++) for (a11 = 0, h10 = o11.length; a11 < h10 && !c2; a11++) (l2 = this.log2lin(this.lin2log(r11) * o11[a11])) > e11 && (!s11 || d2 <= i11) && void 0 !== d2 && n10.push(d2), d2 > i11 && (c2 = true), d2 = l2;
            } else {
              let h10 = this.lin2log(e11), l2 = this.lin2log(i11), d2 = s11 ? o10.getMinorTickInterval() : a10.tickInterval, c2 = a10.tickPixelInterval / (s11 ? 5 : 1), p2 = s11 ? r10 / o10.tickPositions.length : r10;
              t11 = sQ(t11 = s0("auto" === d2 ? null : d2, this.minorAutoInterval, (l2 - h10) * c2 / (p2 || 1))), n10 = o10.getLinearTickPositions(t11, h10, l2).map(this.log2lin), s11 || (this.minorAutoInterval = t11 / 5);
            }
            return s11 || (o10.tickInterval = t11), n10;
          }
          lin2log(t11) {
            return Math.pow(10, t11);
          }
          log2lin(t11) {
            return Math.log(t11) / Math.LN10;
          }
        };
        __name(_s, "s");
        let s10 = _s;
        t10.Additions = s10;
      })(h || (h = {}));
      let s1 = h, { erase: s2, extend: s3, isNumber: s5 } = V;
      !(function(t10) {
        let e10;
        function i10(t11) {
          return this.addPlotBandOrLine(t11, "plotBands");
        }
        __name(i10, "i");
        function s10(t11, i11) {
          let s11 = this.userOptions, o11 = new e10(this, t11);
          if (this.visible && (o11 = o11.render()), o11) {
            if (this._addedPlotLB || (this._addedPlotLB = true, (s11.plotLines || []).concat(s11.plotBands || []).forEach((t12) => {
              this.addPlotBandOrLine(t12);
            })), i11) {
              let e11 = s11[i11] || [];
              e11.push(t11), s11[i11] = e11;
            }
            this.plotLinesAndBands.push(o11);
          }
          return o11;
        }
        __name(s10, "s");
        function o10(t11) {
          return this.addPlotBandOrLine(t11, "plotLines");
        }
        __name(o10, "o");
        function r10(t11, e11, i11) {
          i11 = i11 || this.options;
          let s11 = this.getPlotLinePath({ value: e11, force: true, acrossPanes: i11.acrossPanes }), o11 = [], r11 = this.horiz, a11 = !s5(this.min) || !s5(this.max) || t11 < this.min && e11 < this.min || t11 > this.max && e11 > this.max, n11 = this.getPlotLinePath({ value: t11, force: true, acrossPanes: i11.acrossPanes }), h11, l2 = 1, d2;
          if (n11 && s11) for (a11 && (d2 = n11.toString() === s11.toString(), l2 = 0), h11 = 0; h11 < n11.length; h11 += 2) {
            let t12 = n11[h11], e12 = n11[h11 + 1], i12 = s11[h11], a12 = s11[h11 + 1];
            ("M" === t12[0] || "L" === t12[0]) && ("M" === e12[0] || "L" === e12[0]) && ("M" === i12[0] || "L" === i12[0]) && ("M" === a12[0] || "L" === a12[0]) && (r11 && i12[1] === t12[1] ? (i12[1] += l2, a12[1] += l2) : r11 || i12[2] !== t12[2] || (i12[2] += l2, a12[2] += l2), o11.push(["M", t12[1], t12[2]], ["L", e12[1], e12[2]], ["L", a12[1], a12[2]], ["L", i12[1], i12[2]], ["Z"])), o11.isFlat = d2;
          }
          return o11;
        }
        __name(r10, "r");
        function a10(t11) {
          this.removePlotBandOrLine(t11);
        }
        __name(a10, "a");
        function n10(t11) {
          let e11 = this.plotLinesAndBands, i11 = this.options, s11 = this.userOptions;
          if (e11) {
            let o11 = e11.length;
            for (; o11--; ) e11[o11].id === t11 && e11[o11].destroy();
            [i11.plotLines || [], s11.plotLines || [], i11.plotBands || [], s11.plotBands || []].forEach(function(e12) {
              for (o11 = e12.length; o11--; ) e12[o11]?.id === t11 && s2(e12, e12[o11]);
            });
          }
        }
        __name(n10, "n");
        function h10(t11) {
          this.removePlotBandOrLine(t11);
        }
        __name(h10, "h");
        t10.compose = function(t11, l2) {
          let d2 = l2.prototype;
          return d2.addPlotBand || (e10 = t11, s3(d2, { addPlotBand: i10, addPlotLine: o10, addPlotBandOrLine: s10, getPlotBandPath: r10, removePlotBand: a10, removePlotLine: h10, removePlotBandOrLine: n10 })), l2;
        };
      })(l || (l = {}));
      let s6 = l, { addEvent: s9, arrayMax: s4, arrayMin: s8, defined: s7, destroyObjectProperties: ot, erase: oe, fireEvent: oi, merge: os, objectEach: oo, pick: or } = V;
      const _oa = class _oa {
        static compose(t10, e10) {
          return s9(t10, "afterInit", function() {
            this.labelCollectors.push(() => {
              let t11 = [];
              for (let e11 of this.axes) for (let { label: i10, options: s10 } of e11.plotLinesAndBands) i10 && !s10?.label?.allowOverlap && t11.push(i10);
              return t11;
            });
          }), s6.compose(_oa, e10);
        }
        constructor(t10, e10) {
          this.axis = t10, this.options = e10, this.id = e10.id;
        }
        render() {
          oi(this, "render");
          let { axis: t10, options: e10 } = this, { horiz: i10, logarithmic: s10 } = t10, { color: o10, events: r10, zIndex: a10 = 0 } = e10, { renderer: n10, time: h10 } = t10.chart, l2 = {}, d2 = h10.parse(e10.to), c2 = h10.parse(e10.from), p2 = h10.parse(e10.value), g2 = e10.borderWidth, u2 = e10.label, { label: f2, svgElem: m2 } = this, x2 = [], y2, b2 = s7(c2) && s7(d2), v2 = s7(p2), k2 = !m2, w2 = { class: "highcharts-plot-" + (b2 ? "band " : "line ") + (e10.className || "") }, M2 = b2 ? "bands" : "lines";
          if (!t10.chart.styledMode && (v2 ? (w2.stroke = o10 || "#999999", w2["stroke-width"] = or(e10.width, 1), e10.dashStyle && (w2.dashstyle = e10.dashStyle)) : b2 && (w2.fill = o10 || "#e6e9ff", g2 && (w2.stroke = e10.borderColor, w2["stroke-width"] = g2))), l2.zIndex = a10, M2 += "-" + a10, (y2 = t10.plotLinesAndBandsGroups[M2]) || (t10.plotLinesAndBandsGroups[M2] = y2 = n10.g("plot-" + M2).attr(l2).add()), m2 || (this.svgElem = m2 = n10.path().attr(w2).add(y2)), s7(p2)) x2 = t10.getPlotLinePath({ value: s10?.log2lin(p2) ?? p2, lineWidth: m2.strokeWidth(), acrossPanes: e10.acrossPanes });
          else {
            if (!(s7(c2) && s7(d2))) return;
            x2 = t10.getPlotBandPath(s10?.log2lin(c2) ?? c2, s10?.log2lin(d2) ?? d2, e10);
          }
          return !this.eventsAdded && r10 && (oo(r10, (t11, e11) => {
            m2?.on(e11, (t12) => {
              r10[e11].apply(this, [t12]);
            });
          }), this.eventsAdded = true), (k2 || !m2.d) && x2?.length ? m2.attr({ d: x2 }) : m2 && (x2 ? (m2.show(), m2.animate({ d: x2 })) : m2.d && (m2.hide(), f2 && (this.label = f2 = f2.destroy()))), u2 && (s7(u2.text) || s7(u2.formatter)) && x2?.length && t10.width > 0 && t10.height > 0 && !x2.isFlat ? (u2 = os(__spreadValues({ align: i10 && b2 ? "center" : void 0, x: i10 ? !b2 && 4 : 10, verticalAlign: !i10 && b2 ? "middle" : void 0, y: i10 ? b2 ? 16 : 10 : b2 ? 6 : -4, rotation: i10 && !b2 ? 90 : 0 }, b2 ? { inside: true } : {}), u2), this.renderLabel(u2, x2, b2, a10)) : f2 && f2.hide(), this;
        }
        renderLabel(t10, e10, i10, s10) {
          let o10 = this.axis, r10 = o10.chart.renderer, a10 = t10.inside, n10 = this.label;
          n10 || (this.label = n10 = r10.text(this.getLabelText(t10), 0, 0, t10.useHTML).attr({ align: t10.textAlign || t10.align, rotation: t10.rotation, class: "highcharts-plot-" + (i10 ? "band" : "line") + "-label " + (t10.className || ""), zIndex: s10 }), o10.chart.styledMode || n10.css(os({ color: o10.chart.options.title?.style?.color, fontSize: "0.8em", textOverflow: i10 && !a10 ? "" : "ellipsis" }, t10.style)), n10.add());
          let h10 = e10.xBounds || [e10[0][1], e10[1][1], i10 ? e10[2][1] : e10[0][1]], l2 = e10.yBounds || [e10[0][2], e10[1][2], i10 ? e10[2][2] : e10[0][2]], d2 = s8(h10), c2 = s8(l2), p2 = s4(h10) - d2;
          n10.align(t10, false, { x: d2, y: c2, width: p2, height: s4(l2) - c2 }), n10.alignAttr.y -= r10.fontMetrics(n10).b, (!n10.alignValue || "left" === n10.alignValue || s7(a10)) && n10.css({ width: (t10.style?.width || (i10 && a10 ? p2 : 90 === n10.rotation ? o10.height - (n10.alignAttr.y - o10.top) : (t10.clip ? o10.width : o10.chart.chartWidth) - (n10.alignAttr.x - o10.left))) + "px" }), n10.show(true);
        }
        getLabelText(t10) {
          return s7(t10.formatter) ? t10.formatter.call(this) : t10.text;
        }
        destroy() {
          oe(this.axis.plotLinesAndBands, this), delete this.axis, ot(this);
        }
      };
      __name(_oa, "oa");
      let oa = _oa;
      let { animObject: on } = tU, { format: oh } = ep, { composed: ol, dateFormats: od, doc: oc, isSafari: op } = w, { distribute: og } = ey, { addEvent: ou, clamp: of, css: om, discardElement: ox, extend: oy, fireEvent: ob, getAlignFactor: ov, isArray: ok, isNumber: ow, isObject: oM, isString: oS, merge: oT, pick: oC, pushUnique: oA, splat: oP, syncTimeout: oL } = V;
      const _oO = class _oO {
        constructor(t10, e10, i10) {
          this.allowShared = true, this.crosshairs = [], this.distance = 0, this.isHidden = true, this.isSticky = false, this.options = {}, this.outside = false, this.chart = t10, this.init(t10, e10), this.pointer = i10;
        }
        bodyFormatter(t10) {
          return t10.map((t11) => {
            let e10 = t11.series.tooltipOptions, i10 = t11.formatPrefix || "point";
            return (e10[i10 + "Formatter"] || t11.tooltipFormatter).call(t11, e10[i10 + "Format"] || "");
          });
        }
        cleanSplit(t10) {
          this.chart.series.forEach(function(e10) {
            let i10 = e10?.tt;
            i10 && (!i10.isActive || t10 ? e10.tt = i10.destroy() : i10.isActive = false);
          });
        }
        defaultFormatter(t10) {
          let e10, i10 = this.points || oP(this);
          return (e10 = (e10 = [t10.headerFooterFormatter(i10[0])]).concat(t10.bodyFormatter(i10))).push(t10.headerFooterFormatter(i10[0], true)), e10;
        }
        destroy() {
          this.label && (this.label = this.label.destroy()), this.split && (this.cleanSplit(true), this.tt && (this.tt = this.tt.destroy())), this.renderer && (this.renderer = this.renderer.destroy(), ox(this.container)), V.clearTimeout(this.hideTimer);
        }
        getAnchor(t10, e10) {
          let i10, { chart: s10, pointer: o10 } = this, r10 = s10.inverted, a10 = s10.plotTop, n10 = s10.plotLeft;
          if (t10 = oP(t10), t10[0].series?.yAxis && !t10[0].series.yAxis.options.reversedStacks && (t10 = t10.slice().reverse()), this.followPointer && e10) void 0 === e10.chartX && (e10 = o10.normalize(e10)), i10 = [e10.chartX - n10, e10.chartY - a10];
          else if (t10[0].tooltipPos) i10 = t10[0].tooltipPos;
          else {
            let s11 = 0, o11 = 0;
            t10.forEach(function(t11) {
              let e11 = t11.pos(true);
              e11 && (s11 += e11[0], o11 += e11[1]);
            }), s11 /= t10.length, o11 /= t10.length, this.shared && t10.length > 1 && e10 && (r10 ? s11 = e10.chartX : o11 = e10.chartY), i10 = [s11 - n10, o11 - a10];
          }
          let h10 = { point: t10[0], ret: i10 };
          return ob(this, "getAnchor", h10), h10.ret.map(Math.round);
        }
        getClassName(t10, e10, i10) {
          let s10 = this.options, o10 = t10.series, r10 = o10.options;
          return [s10.className, "highcharts-label", i10 && "highcharts-tooltip-header", e10 ? "highcharts-tooltip-box" : "highcharts-tooltip", !i10 && "highcharts-color-" + oC(t10.colorIndex, o10.colorIndex), r10?.className].filter(oS).join(" ");
        }
        getLabel({ anchorX: t10, anchorY: e10 } = { anchorX: 0, anchorY: 0 }) {
          let i10 = this, s10 = this.chart.styledMode, o10 = this.options, r10 = this.split && this.allowShared, a10 = this.container, n10 = this.chart.renderer;
          if (this.label) {
            let t11 = !this.label.hasClass("highcharts-label");
            (!r10 && t11 || r10 && !t11) && this.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              let t11 = this.chart, e11 = t11.options.chart.style, i11 = eg.getRendererType();
              this.container = a10 = w.doc.createElement("div"), a10.className = "highcharts-tooltip-container " + (t11.renderTo.className.match(/(highcharts[a-zA-Z0-9-]+)\s?/gm) || ""), om(a10, { position: "absolute", top: "1px", pointerEvents: "none", zIndex: Math.max(this.options.style.zIndex || 0, (e11?.zIndex || 0) + 3) }), this.renderer = n10 = new i11(a10, 0, 0, e11, void 0, void 0, n10.styledMode);
            }
            if (r10 ? this.label = n10.g("tooltip") : (this.label = n10.label("", t10, e10, o10.shape || "callout", void 0, void 0, o10.useHTML, void 0, "tooltip").attr({ padding: o10.padding, r: o10.borderRadius }), s10 || this.label.attr({ fill: o10.backgroundColor, "stroke-width": o10.borderWidth || 0 }).css(o10.style).css({ pointerEvents: o10.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none") })), i10.outside) {
              let t11 = this.label;
              [t11.xSetter, t11.ySetter].forEach((e11, s11) => {
                t11[s11 ? "ySetter" : "xSetter"] = (o11) => {
                  e11.call(t11, i10.distance), t11[s11 ? "y" : "x"] = o11, a10 && (a10.style[s11 ? "top" : "left"] = `${o11}px`);
                };
              });
            }
            this.label.attr({ zIndex: 8 }).shadow(o10.shadow ?? !o10.fixed).add();
          }
          return a10 && !a10.parentElement && w.doc.body.appendChild(a10), this.label;
        }
        getPlayingField() {
          let { body: t10, documentElement: e10 } = oc, { chart: i10, distance: s10, outside: o10 } = this;
          return { width: o10 ? Math.max(t10.scrollWidth, e10.scrollWidth, t10.offsetWidth, e10.offsetWidth, e10.clientWidth) - 2 * s10 - 2 : i10.chartWidth, height: o10 ? Math.max(t10.scrollHeight, e10.scrollHeight, t10.offsetHeight, e10.offsetHeight, e10.clientHeight) : i10.chartHeight };
        }
        getPosition(t10, e10, i10) {
          let { distance: s10, chart: o10, outside: r10, pointer: a10 } = this, { inverted: n10, plotLeft: h10, plotTop: l2, polar: d2 } = o10, { plotX: c2 = 0, plotY: p2 = 0 } = i10, g2 = {}, u2 = n10 && i10.h || 0, { height: f2, width: m2 } = this.getPlayingField(), x2 = a10.getChartPosition(), y2 = /* @__PURE__ */ __name((t11) => t11 * x2.scaleX, "y"), b2 = /* @__PURE__ */ __name((t11) => t11 * x2.scaleY, "b"), v2 = /* @__PURE__ */ __name((i11) => {
            let a11 = "x" === i11;
            return [i11, a11 ? m2 : f2, a11 ? t10 : e10].concat(r10 ? [a11 ? y2(t10) : b2(e10), a11 ? x2.left - s10 + y2(c2 + h10) : x2.top - s10 + b2(p2 + l2), 0, a11 ? m2 : f2] : [a11 ? t10 : e10, a11 ? c2 + h10 : p2 + l2, a11 ? h10 : l2, a11 ? h10 + o10.plotWidth : l2 + o10.plotHeight]);
          }, "v"), k2 = v2("y"), w2 = v2("x"), M2, S2 = !!i10.negative;
          !d2 && o10.hoverSeries?.yAxis?.reversed && (S2 = !S2);
          let T2 = !this.followPointer && oC(i10.ttBelow, !d2 && !n10 === S2), C2 = /* @__PURE__ */ __name(function(t11, e11, i11, o11, a11, n11, h11) {
            let l3 = r10 ? "y" === t11 ? b2(s10) : y2(s10) : s10, d3 = (i11 - o11) / 2, c3 = o11 < a11 - s10, p3 = a11 + s10 + o11 < e11, f3 = a11 - l3 - i11 + d3, m3 = a11 + l3 - d3;
            if (T2 && p3) g2[t11] = m3;
            else if (!T2 && c3) g2[t11] = f3;
            else if (c3) g2[t11] = Math.min(h11 - o11, f3 - u2 < 0 ? f3 : f3 - u2);
            else {
              if (!p3) return g2[t11] = 0, false;
              g2[t11] = Math.max(n11, m3 + u2 + i11 > e11 ? m3 : m3 + u2);
            }
          }, "C"), A2 = /* @__PURE__ */ __name(function(t11, e11, i11, o11, r11) {
            if (r11 < s10 || r11 > e11 - s10) return false;
            r11 < i11 / 2 ? g2[t11] = 1 : r11 > e11 - o11 / 2 ? g2[t11] = e11 - o11 - 2 : g2[t11] = r11 - i11 / 2;
          }, "A"), P2 = /* @__PURE__ */ __name(function(t11) {
            [k2, w2] = [w2, k2], M2 = t11;
          }, "P"), L2 = /* @__PURE__ */ __name(() => {
            false !== C2.apply(0, k2) ? false !== A2.apply(0, w2) || M2 || (P2(true), L2()) : M2 ? g2.x = g2.y = 0 : (P2(true), L2());
          }, "L");
          return (n10 && !d2 || this.len > 1) && P2(), L2(), g2;
        }
        getFixedPosition(t10, e10, i10) {
          let s10 = i10.series, { chart: o10, options: r10, split: a10 } = this, n10 = r10.position, h10 = n10.relativeTo, l2 = r10.shared || s10?.yAxis?.isRadial && ("pane" === h10 || !h10) ? "plotBox" : h10, d2 = "chart" === l2 ? o10.renderer : o10[l2] || o10.getClipBox(s10, true);
          return { x: d2.x + (d2.width - t10) * ov(n10.align) + n10.x, y: d2.y + (d2.height - e10) * ov(n10.verticalAlign) + (!a10 && n10.y || 0) };
        }
        hide(t10) {
          let e10 = this;
          V.clearTimeout(this.hideTimer), t10 = oC(t10, this.options.hideDelay), this.isHidden || (this.hideTimer = oL(function() {
            let i10 = e10.getLabel();
            e10.getLabel().animate({ opacity: 0 }, { duration: t10 ? 150 : t10, complete: /* @__PURE__ */ __name(() => {
              i10.hide(), e10.container && e10.container.remove();
            }, "complete") }), e10.isHidden = true;
          }, t10));
        }
        init(t10, e10) {
          this.chart = t10, this.options = e10, this.crosshairs = [], this.isHidden = true, this.split = e10.split && !t10.inverted && !t10.polar, this.shared = e10.shared || this.split, this.outside = oC(e10.outside, !!(t10.scrollablePixelsX || t10.scrollablePixelsY));
        }
        shouldStickOnContact(t10) {
          return !!(!this.followPointer && this.options.stickOnContact && (!t10 || this.pointer.inClass(t10.target, "highcharts-tooltip")));
        }
        move(t10, e10, i10, s10) {
          let { followPointer: o10, options: r10 } = this, a10 = on(!o10 && !this.isHidden && !r10.fixed && r10.animation), n10 = o10 || (this.len || 0) > 1, h10 = { x: t10, y: e10 };
          n10 ? h10.anchorX = h10.anchorY = NaN : (h10.anchorX = i10, h10.anchorY = s10), a10.step = () => this.drawTracker(), this.getLabel().animate(h10, a10);
        }
        refresh(t10, e10) {
          let { chart: i10, options: s10, pointer: o10, shared: r10 } = this, a10 = oP(t10), n10 = a10[0], h10 = s10.format, l2 = s10.formatter || this.defaultFormatter, d2 = i10.styledMode, c2 = this.allowShared;
          if (!s10.enabled || !n10.series) return;
          V.clearTimeout(this.hideTimer), this.allowShared = !(!ok(t10) && t10.series && t10.series.noSharedTooltip), c2 = c2 && !this.allowShared, this.followPointer = !this.split && n10.series.tooltipOptions.followPointer;
          let p2 = this.getAnchor(t10, e10), g2 = p2[0], u2 = p2[1];
          r10 && this.allowShared && (o10.applyInactiveState(a10), a10.forEach((t11) => t11.setState("hover")), n10.points = a10), this.len = a10.length;
          let f2 = oS(h10) ? oh(h10, n10, i10) : l2.call(n10, this);
          n10.points = void 0;
          let m2 = n10.series;
          if (this.distance = oC(m2.tooltipOptions.distance, 16), false === f2) this.hide();
          else {
            if (this.split && this.allowShared) this.renderSplit(f2, a10);
            else {
              let t11 = g2, r11 = u2;
              if (e10 && o10.isDirectTouch && (t11 = e10.chartX - i10.plotLeft, r11 = e10.chartY - i10.plotTop), !(i10.polar || false === m2.options.clip || a10.some((e11) => o10.isDirectTouch || e11.series.shouldShowTooltip(t11, r11)))) return void this.hide();
              {
                let t12 = this.getLabel(c2 && this.tt || {});
                (!s10.style.width || d2) && t12.css({ width: (this.outside ? this.getPlayingField() : i10.spacingBox).width + "px" }), t12.attr({ class: this.getClassName(n10), text: f2 && f2.join ? f2.join("") : f2 }), this.outside && t12.attr({ x: of(t12.x || 0, 0, this.getPlayingField().width - (t12.width || 0) - 1) }), d2 || t12.attr({ stroke: s10.borderColor || n10.color || m2.color || "#666666" }), this.updatePosition({ plotX: g2, plotY: u2, negative: n10.negative, ttBelow: n10.ttBelow, series: m2, h: p2[2] || 0 });
              }
            }
            this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden = false;
          }
          ob(this, "refresh");
        }
        renderSplit(t10, e10) {
          let i10 = this, { chart: s10, chart: { chartWidth: o10, chartHeight: r10, plotHeight: a10, plotLeft: n10, plotTop: h10, scrollablePixelsY: l2 = 0, scrollablePixelsX: d2, styledMode: c2 }, distance: p2, options: g2, options: { fixed: u2, position: f2, positioner: m2 }, pointer: x2 } = i10, { scrollLeft: y2 = 0, scrollTop: b2 = 0 } = s10.scrollablePlotArea?.scrollingContainer || {}, v2 = i10.outside && "number" != typeof d2 ? oc.documentElement.getBoundingClientRect() : { left: y2, right: y2 + o10, top: b2, bottom: b2 + r10 }, k2 = i10.getLabel(), w2 = this.renderer || s10.renderer, M2 = !!s10.xAxis[0]?.opposite, { left: S2, top: T2 } = x2.getChartPosition(), C2 = m2 || u2, A2 = h10 + b2, P2 = 0, L2 = a10 - l2, O2 = /* @__PURE__ */ __name(function(t11, e11, s11, o11 = [0, 0], r11 = true) {
            let a11, n11;
            if (s11.isHeader) n11 = M2 ? 0 : L2, a11 = of(o11[0] - t11 / 2, v2.left, v2.right - t11 - (i10.outside ? S2 : 0));
            else if (u2 && s11) {
              let o12 = i10.getFixedPosition(t11, e11, s11);
              a11 = o12.x, n11 = o12.y - A2;
            } else n11 = o11[1] - A2, a11 = of(a11 = r11 ? o11[0] - t11 - p2 : o11[0] + p2, r11 ? a11 : v2.left, v2.right);
            return { x: a11, y: n11 };
          }, "O");
          oS(t10) && (t10 = [false, t10]);
          let E2 = t10.slice(0, e10.length + 1).reduce(function(t11, s11, o11) {
            if (false !== s11 && "" !== s11) {
              let r11 = e10[o11 - 1] || { isHeader: true, plotX: e10[0].plotX, plotY: a10, series: {} }, l3 = r11.isHeader, d3 = l3 ? i10 : r11.series, f3 = d3.tt = (function(t12, e11, s12) {
                let o12 = t12, { isHeader: r12, series: a11 } = e11, n11 = a11.tooltipOptions || g2;
                if (!o12) {
                  let t13 = { padding: n11.padding, r: n11.borderRadius };
                  c2 || (t13.fill = n11.backgroundColor, t13["stroke-width"] = n11.borderWidth ?? (u2 && !r12 ? 0 : 1)), o12 = w2.label("", 0, 0, n11[r12 ? "headerShape" : "shape"] || (u2 && !r12 ? "rect" : "callout"), void 0, void 0, n11.useHTML).addClass(i10.getClassName(e11, true, r12)).attr(t13).add(k2);
                }
                return o12.isActive = true, o12.attr({ text: s12 }), c2 || o12.css(n11.style).attr({ stroke: n11.borderColor || e11.color || a11.color || "#333333" }), o12;
              })(d3.tt, r11, s11.toString()), x3 = f3.getBBox(), y3 = x3.width + f3.strokeWidth();
              l3 && (P2 = x3.height, L2 += P2, M2 && (A2 -= P2));
              let { anchorX: b3, anchorY: S3 } = (function(t12) {
                let e11, i11, { isHeader: s12, plotX: o12 = 0, plotY: r12 = 0, series: l4 } = t12;
                if (s12) e11 = Math.max(n10 + o12, n10), i11 = h10 + a10 / 2;
                else {
                  let { xAxis: t13, yAxis: s13 } = l4;
                  e11 = t13.pos + of(o12, -p2, t13.len + p2), l4.shouldShowTooltip(0, s13.pos - h10 + r12, { ignoreX: true }) && (i11 = s13.pos + r12);
                }
                return { anchorX: e11 = of(e11, v2.left - p2, v2.right + p2), anchorY: i11 };
              })(r11);
              if ("number" == typeof S3) {
                let e11 = x3.height + 1, s12 = (m2 || O2).call(i10, y3, e11, r11, [b3, S3]);
                t11.push({ align: C2 ? 0 : void 0, anchorX: b3, anchorY: S3, boxWidth: y3, point: r11, rank: oC(s12.rank, +!!l3), size: e11, target: s12.y, tt: f3, x: s12.x });
              } else f3.isActive = false;
            }
            return t11;
          }, []);
          !C2 && E2.some((t11) => {
            let { outside: e11 } = i10, s11 = (e11 ? S2 : 0) + t11.anchorX;
            return s11 < v2.left && s11 + t11.boxWidth < v2.right || s11 < S2 - v2.left + t11.boxWidth && v2.right - s11 > s11;
          }) && (E2 = E2.map((t11) => {
            let { x: e11, y: i11 } = O2.call(this, t11.boxWidth, t11.size, t11.point, [t11.anchorX, t11.anchorY], false);
            return oy(t11, { target: i11, x: e11 });
          })), i10.cleanSplit(), og(E2, L2);
          let I2 = { left: S2, right: S2 };
          E2.forEach(function(t11) {
            let { x: e11, boxWidth: s11, isHeader: o11 } = t11;
            !o11 && (i10.outside && S2 + e11 < I2.left && (I2.left = S2 + e11), !o11 && i10.outside && I2.left + s11 > I2.right && (I2.right = S2 + e11));
          }), E2.forEach(function(t11) {
            let { x: e11, anchorX: s11, anchorY: o11, pos: r11, point: { isHeader: a11 } } = t11, n11 = { visibility: void 0 === r11 ? "hidden" : "inherit", x: e11, y: (r11 || 0) + A2 + (u2 && f2.y || 0), anchorX: s11, anchorY: o11 };
            if (i10.outside && e11 < s11) {
              let t12 = S2 - I2.left;
              t12 > 0 && (a11 || (n11.x = e11 + t12, n11.anchorX = s11 + t12), a11 && (n11.x = (I2.right - I2.left) / 2, n11.anchorX = s11 + t12));
            }
            t11.tt.attr(n11);
          });
          let { container: D2, outside: B2, renderer: N2 } = i10;
          if (B2 && D2 && N2) {
            let { width: t11, height: e11, x: i11, y: s11 } = k2.getBBox();
            N2.setSize(t11 + i11, e11 + s11, false), D2.style.left = I2.left + "px", D2.style.top = T2 + "px";
          }
          op && k2.attr({ opacity: 1 === k2.opacity ? 0.999 : 1 });
        }
        drawTracker() {
          if (!this.shouldStickOnContact()) {
            this.tracker && (this.tracker = this.tracker.destroy());
            return;
          }
          let t10 = this.chart, e10 = this.label, i10 = this.shared ? t10.hoverPoints : t10.hoverPoint;
          if (!e10 || !i10) return;
          let s10 = { x: 0, y: 0, width: 0, height: 0 }, o10 = this.getAnchor(i10), r10 = e10.getBBox();
          o10[0] += t10.plotLeft - (e10.translateX || 0), o10[1] += t10.plotTop - (e10.translateY || 0), s10.x = Math.min(0, o10[0]), s10.y = Math.min(0, o10[1]), s10.width = o10[0] < 0 ? Math.max(Math.abs(o10[0]), r10.width - o10[0]) : Math.max(Math.abs(o10[0]), r10.width), s10.height = o10[1] < 0 ? Math.max(Math.abs(o10[1]), r10.height - Math.abs(o10[1])) : Math.max(Math.abs(o10[1]), r10.height), this.tracker ? this.tracker.attr(s10) : (this.tracker = e10.renderer.rect(s10).addClass("highcharts-tracker").add(e10), t10.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
        }
        styledModeFormat(t10) {
          return t10.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"');
        }
        headerFooterFormatter(t10, e10) {
          let i10 = t10.series, s10 = i10.tooltipOptions, o10 = i10.xAxis, r10 = o10?.dateTime, a10 = { isFooter: e10, point: t10 }, n10 = s10.xDateFormat || "", h10 = s10[e10 ? "footerFormat" : "headerFormat"];
          return ob(this, "headerFormatter", a10, function(e11) {
            if (r10 && !n10 && ow(t10.key) && (n10 = r10.getXDateFormat(t10.key, s10.dateTimeLabelFormats)), r10 && n10) {
              if (oM(n10)) {
                let t11 = n10;
                od[0] = (e12) => i10.chart.time.dateFormat(t11, e12), n10 = "%0";
              }
              (t10.tooltipDateKeys || ["key"]).forEach((t11) => {
                h10 = h10.replace(RegExp("point\\." + t11 + "([ \\)}])"), `(point.${t11}:${n10})$1`);
              });
            }
            i10.chart.styledMode && (h10 = this.styledModeFormat(h10)), e11.text = oh(h10, t10, this.chart);
          }), a10.text || "";
        }
        update(t10) {
          this.destroy(), this.init(this.chart, oT(true, this.options, t10));
        }
        updatePosition(t10) {
          let { chart: e10, container: i10, distance: s10, options: o10, pointer: r10, renderer: a10 } = this, { height: n10 = 0, width: h10 = 0 } = this.getLabel(), { fixed: l2, positioner: d2 } = o10, { left: c2, top: p2, scaleX: g2, scaleY: u2 } = r10.getChartPosition(), f2 = (d2 || l2 && this.getFixedPosition || this.getPosition).call(this, h10, n10, t10), m2 = w.doc, x2 = (t10.plotX || 0) + e10.plotLeft, y2 = (t10.plotY || 0) + e10.plotTop, b2;
          if (a10 && i10) {
            if (d2 || l2) {
              let { scrollLeft: t11 = 0, scrollTop: i11 = 0 } = e10.scrollablePlotArea?.scrollingContainer || {};
              f2.x += t11 + c2 - s10, f2.y += i11 + p2 - s10;
            }
            b2 = (o10.borderWidth || 0) + 2 * s10 + 2, a10.setSize(of(h10 + b2, 0, m2.documentElement.clientWidth) - 1, n10 + b2, false), (1 !== g2 || 1 !== u2) && (om(i10, { transform: `scale(${g2}, ${u2})` }), x2 *= g2, y2 *= u2), x2 += c2 - f2.x, y2 += p2 - f2.y;
          }
          this.move(Math.round(f2.x), Math.round(f2.y || 0), x2, y2);
        }
      };
      __name(_oO, "oO");
      let oO = _oO;
      !(function(t10) {
        t10.compose = function(e10) {
          oA(ol, "Core.Tooltip") && ou(e10, "afterInit", function() {
            let e11 = this.chart;
            e11.options.tooltip && (e11.tooltip = new t10(e11, e11.options.tooltip, this));
          });
        };
      })(oO || (oO = {}));
      let oE = oO, { animObject: oI } = tU, { defaultOptions: oD } = tv, { format: oB } = ep, { addEvent: oN, crisp: oz, erase: oR, extend: oW, fireEvent: oH, getNestedProperty: oX, isArray: oF, isFunction: oG, isNumber: oj, isObject: oY, merge: oU, pick: o$, syncTimeout: oV, removeEvent: oZ, uniqueKey: o_ } = V;
      const _oq = class _oq {
        animateBeforeDestroy() {
          let t10 = this, e10 = { x: t10.startXPos, opacity: 0 }, i10 = t10.getGraphicalProps();
          i10.singular.forEach(function(i11) {
            t10[i11] = t10[i11].animate("dataLabel" === i11 ? { x: t10[i11].startXPos, y: t10[i11].startYPos, opacity: 0 } : e10);
          }), i10.plural.forEach(function(e11) {
            t10[e11].forEach(function(e12) {
              e12.element && e12.animate(oW({ x: t10.startXPos }, e12.startYPos ? { x: e12.startXPos, y: e12.startYPos } : {}));
            });
          });
        }
        applyOptions(t10, e10) {
          let i10 = this.series, s10 = i10.options.pointValKey || i10.pointValKey;
          return oW(this, t10 = _oq.prototype.optionsToObject.call(this, t10)), this.options = this.options ? oW(this.options, t10) : t10, t10.group && delete this.group, t10.dataLabels && delete this.dataLabels, s10 && (this.y = _oq.prototype.getNestedProperty.call(this, s10)), this.selected && (this.state = "select"), "name" in this && void 0 === e10 && i10.xAxis && i10.xAxis.hasNames && (this.x = i10.xAxis.nameToX(this)), void 0 === this.x && i10 ? this.x = e10 ?? i10.autoIncrement() : oj(t10.x) && i10.options.relativeXValue ? this.x = i10.autoIncrement(t10.x) : "string" == typeof this.x && (e10 ?? (e10 = i10.chart.time.parse(this.x)), oj(e10) && (this.x = e10)), this.isNull = this.isValid && !this.isValid(), this.formatPrefix = this.isNull ? "null" : "point", this;
        }
        destroy() {
          if (!this.destroyed) {
            let t10 = this, e10 = t10.series, i10 = e10.chart, s10 = e10.options.dataSorting, o10 = i10.hoverPoints, r10 = oI(t10.series.chart.renderer.globalAnimation), a10 = /* @__PURE__ */ __name(() => {
              for (let e11 in (t10.graphic || t10.graphics || t10.dataLabel || t10.dataLabels) && (oZ(t10), t10.destroyElements()), t10) delete t10[e11];
            }, "a");
            t10.legendItem && i10.legend.destroyItem(t10), o10 && (t10.setState(), oR(o10, t10), o10.length || (i10.hoverPoints = null)), t10 === i10.hoverPoint && t10.onMouseOut(), s10?.enabled ? (this.animateBeforeDestroy(), oV(a10, r10.duration)) : a10(), i10.pointCount--;
          }
          this.destroyed = true;
        }
        destroyElements(t10) {
          let e10 = this, i10 = e10.getGraphicalProps(t10);
          i10.singular.forEach(function(t11) {
            e10[t11] = e10[t11].destroy();
          }), i10.plural.forEach(function(t11) {
            e10[t11].forEach(function(t12) {
              t12?.element && t12.destroy();
            }), delete e10[t11];
          });
        }
        firePointEvent(t10, e10, i10) {
          let s10 = this, o10 = this.series.options;
          s10.manageEvent(t10), "click" === t10 && o10.allowPointSelect && (i10 = /* @__PURE__ */ __name(function(t11) {
            !s10.destroyed && s10.select && s10.select(null, t11.ctrlKey || t11.metaKey || t11.shiftKey);
          }, "i")), oH(s10, t10, e10, i10);
        }
        getClassName() {
          return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone?.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
        }
        getGraphicalProps(t10) {
          let e10, i10, s10 = this, o10 = [], r10 = { singular: [], plural: [] };
          for ((t10 = t10 || { graphic: 1, dataLabel: 1 }).graphic && o10.push("graphic", "connector"), t10.dataLabel && o10.push("dataLabel", "dataLabelPath", "dataLabelUpper"), i10 = o10.length; i10--; ) s10[e10 = o10[i10]] && r10.singular.push(e10);
          return ["graphic", "dataLabel"].forEach(function(e11) {
            let i11 = e11 + "s";
            t10[e11] && s10[i11] && r10.plural.push(i11);
          }), r10;
        }
        getNestedProperty(t10) {
          if (t10) return 0 === t10.indexOf("custom.") ? oX(t10, this.options) : this[t10];
        }
        getZone() {
          let t10 = this.series, e10 = t10.zones, i10 = t10.zoneAxis || "y", s10, o10 = 0;
          for (s10 = e10[0]; this[i10] >= s10.value; ) s10 = e10[++o10];
          return this.nonZonedColor || (this.nonZonedColor = this.color), s10?.color && !this.options.color ? this.color = s10.color : this.color = this.nonZonedColor, s10;
        }
        hasNewShapeType() {
          return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
        }
        constructor(t10, e10, i10) {
          this.formatPrefix = "point", this.visible = true, this.point = this, this.series = t10, this.applyOptions(e10, i10), this.id ?? (this.id = o_()), this.resolveColor(), this.dataLabelOnNull ?? (this.dataLabelOnNull = t10.options.nullInteraction), t10.chart.pointCount++, oH(this, "afterInit");
        }
        isValid() {
          return (oj(this.x) || this.x instanceof Date) && oj(this.y);
        }
        optionsToObject(t10) {
          let e10 = this.series, i10 = e10.options.keys, s10 = i10 || e10.pointArrayMap || ["y"], o10 = s10.length, r10 = {}, a10, n10 = 0, h10 = 0;
          if (oj(t10) || null === t10) r10[s10[0]] = t10;
          else if (oF(t10)) for (!i10 && t10.length > o10 && ("string" == (a10 = typeof t10[0]) ? e10.xAxis?.dateTime ? r10.x = e10.chart.time.parse(t10[0]) : r10.name = t10[0] : "number" === a10 && (r10.x = t10[0]), n10++); h10 < o10; ) i10 && void 0 === t10[n10] || (s10[h10].indexOf(".") > 0 ? _oq.prototype.setNestedProperty(r10, t10[n10], s10[h10]) : r10[s10[h10]] = t10[n10]), n10++, h10++;
          else "object" == typeof t10 && (r10 = t10, t10.dataLabels && (e10.hasDataLabels = () => true), t10.marker && (e10._hasPointMarkers = true));
          return r10;
        }
        pos(t10, e10 = this.plotY) {
          if (!this.destroyed) {
            let { plotX: i10, series: s10 } = this, { chart: o10, xAxis: r10, yAxis: a10 } = s10, n10 = 0, h10 = 0;
            if (oj(i10) && oj(e10)) return t10 && (n10 = r10 ? r10.pos : o10.plotLeft, h10 = a10 ? a10.pos : o10.plotTop), o10.inverted && r10 && a10 ? [a10.len - e10 + h10, r10.len - i10 + n10] : [i10 + n10, e10 + h10];
          }
        }
        resolveColor() {
          let t10 = this.series, e10 = t10.chart.options.chart, i10 = t10.chart.styledMode, s10, o10, r10 = e10.colorCount, a10;
          delete this.nonZonedColor, t10.options.colorByPoint ? (i10 || (s10 = (o10 = t10.options.colors || t10.chart.options.colors)[t10.colorCounter], r10 = o10.length), a10 = t10.colorCounter, t10.colorCounter++, t10.colorCounter === r10 && (t10.colorCounter = 0)) : (i10 || (s10 = t10.color), a10 = t10.colorIndex), this.colorIndex = o$(this.options.colorIndex, a10), this.color = o$(this.options.color, s10);
        }
        setNestedProperty(t10, e10, i10) {
          return i10.split(".").reduce(function(t11, i11, s10, o10) {
            let r10 = o10.length - 1 === s10;
            return t11[i11] = r10 ? e10 : oY(t11[i11], true) ? t11[i11] : {}, t11[i11];
          }, t10), t10;
        }
        shouldDraw() {
          return !this.isNull;
        }
        tooltipFormatter(t10) {
          let { chart: e10, pointArrayMap: i10 = ["y"], tooltipOptions: s10 } = this.series, { valueDecimals: o10 = "", valuePrefix: r10 = "", valueSuffix: a10 = "" } = s10;
          return e10.styledMode && (t10 = e10.tooltip?.styledModeFormat(t10) || t10), i10.forEach((e11) => {
            e11 = "{point." + e11, (r10 || a10) && (t10 = t10.replace(RegExp(e11 + "}", "g"), r10 + e11 + "}" + a10)), t10 = t10.replace(RegExp(e11 + "}", "g"), e11 + ":,." + o10 + "f}");
          }), oB(t10, this, e10);
        }
        update(t10, e10, i10, s10) {
          let o10, r10 = this, a10 = r10.series, n10 = r10.graphic, h10 = a10.chart, l2 = a10.options;
          function d2() {
            r10.applyOptions(t10);
            let s11 = n10 && r10.hasMockGraphic, d3 = null === r10.y ? !s11 : s11;
            n10 && d3 && (r10.graphic = n10.destroy(), delete r10.hasMockGraphic), oY(t10, true) && (n10?.element && t10 && t10.marker && void 0 !== t10.marker.symbol && (r10.graphic = n10.destroy()), t10?.dataLabels && r10.dataLabel && (r10.dataLabel = r10.dataLabel.destroy())), o10 = r10.index;
            let c2 = {};
            for (let t11 of a10.dataColumnKeys()) c2[t11] = r10[t11];
            a10.dataTable.setRow(c2, o10), l2.data[o10] = oY(l2.data[o10], true) || oY(t10, true) ? r10.options : o$(t10, l2.data[o10]), a10.isDirty = a10.isDirtyData = true, !a10.fixedBox && a10.hasCartesianSeries && (h10.isDirtyBox = true), "point" === l2.legendType && (h10.isDirtyLegend = true), e10 && h10.redraw(i10);
          }
          __name(d2, "d");
          e10 = o$(e10, true), false === s10 ? d2() : r10.firePointEvent("update", { options: t10 }, d2);
        }
        remove(t10, e10) {
          this.series.removePoint(this.series.data.indexOf(this), t10, e10);
        }
        select(t10, e10) {
          let i10 = this, s10 = i10.series, o10 = s10.chart;
          t10 = o$(t10, !i10.selected), this.selectedStaging = t10, i10.firePointEvent(t10 ? "select" : "unselect", { accumulate: e10 }, function() {
            i10.selected = i10.options.selected = t10, s10.options.data[s10.data.indexOf(i10)] = i10.options, i10.setState(t10 && "select"), e10 || o10.getSelectedPoints().forEach(function(t11) {
              let e11 = t11.series;
              t11.selected && t11 !== i10 && (t11.selected = t11.options.selected = false, e11.options.data[e11.data.indexOf(t11)] = t11.options, t11.setState(o10.hoverPoints && e11.options.inactiveOtherPoints ? "inactive" : ""), t11.firePointEvent("unselect"));
            });
          }), delete this.selectedStaging;
        }
        onMouseOver(t10) {
          let { inverted: e10, pointer: i10 } = this.series.chart;
          i10 && (t10 = t10 ? i10.normalize(t10) : i10.getChartCoordinatesFromPoint(this, e10), i10.runPointActions(t10, this));
        }
        onMouseOut() {
          let t10 = this.series.chart;
          this.firePointEvent("mouseOut"), this.series.options.inactiveOtherPoints || (t10.hoverPoints || []).forEach(function(t11) {
            t11.setState();
          }), t10.hoverPoints = t10.hoverPoint = null;
        }
        manageEvent(t10) {
          let e10 = oU(this.series.options.point, this.options), i10 = e10.events?.[t10];
          oG(i10) && (!this.hcEvents?.[t10] || this.hcEvents?.[t10]?.map((t11) => t11.fn).indexOf(i10) === -1) ? (this.importedUserEvent?.(), this.importedUserEvent = oN(this, t10, i10), this.hcEvents && (this.hcEvents[t10].userEvent = true)) : this.importedUserEvent && !i10 && this.hcEvents?.[t10] && this.hcEvents?.[t10].userEvent && (oZ(this, t10), delete this.hcEvents[t10], Object.keys(this.hcEvents) || delete this.importedUserEvent);
        }
        setState(t10, e10) {
          let i10 = this.series, s10 = this.state, o10 = i10.options.states[t10 || "normal"] || {}, r10 = oD.plotOptions[i10.type].marker && i10.options.marker, a10 = r10 && false === r10.enabled, n10 = r10?.states?.[t10 || "normal"] || {}, h10 = false === n10.enabled, l2 = this.marker || {}, d2 = i10.chart, c2 = r10 && i10.markerAttribs, p2 = i10.halo, g2, u2, f2, m2 = i10.stateMarkerGraphic, x2;
          if ((t10 = t10 || "") === this.state && !e10 || this.selected && "select" !== t10 || false === o10.enabled || t10 && (h10 || a10 && false === n10.enabled) || t10 && l2.states && l2.states[t10] && false === l2.states[t10].enabled) return;
          if (this.state = t10, c2 && (g2 = i10.markerAttribs(this, t10)), this.graphic && !this.hasMockGraphic) {
            if (s10 && this.graphic.removeClass("highcharts-point-" + s10), t10 && this.graphic.addClass("highcharts-point-" + t10), !d2.styledMode) {
              u2 = i10.pointAttribs(this, t10), f2 = o$(d2.options.chart.animation, o10.animation);
              let e11 = u2.opacity;
              i10.options.inactiveOtherPoints && oj(e11) && (this.dataLabels || []).forEach(function(t11) {
                t11 && !t11.hasClass("highcharts-data-label-hidden") && (t11.animate({ opacity: e11 }, f2), t11.connector && t11.connector.animate({ opacity: e11 }, f2));
              }), this.graphic.animate(u2, f2);
            }
            g2 && this.graphic.animate(g2, o$(d2.options.chart.animation, n10.animation, r10.animation)), m2 && m2.hide();
          } else t10 && n10 && (x2 = l2.symbol || i10.symbol, m2 && m2.currentSymbol !== x2 && (m2 = m2.destroy()), g2 && (m2 ? m2[e10 ? "animate" : "attr"]({ x: g2.x, y: g2.y }) : x2 && (i10.stateMarkerGraphic = m2 = d2.renderer.symbol(x2, g2.x, g2.y, g2.width, g2.height, oU(r10, n10)).add(i10.markerGroup), m2.currentSymbol = x2)), !d2.styledMode && m2 && "inactive" !== this.state && m2.attr(i10.pointAttribs(this, t10))), m2 && (m2[t10 && this.isInside ? "show" : "hide"](), m2.element.point = this, m2.addClass(this.getClassName(), true));
          let y2 = o10.halo, b2 = this.graphic || m2, v2 = b2?.visibility || "inherit";
          y2?.size && b2 && "hidden" !== v2 && !this.isCluster ? (p2 || (i10.halo = p2 = d2.renderer.path().add(b2.parentGroup)), p2.show()[e10 ? "animate" : "attr"]({ d: this.haloPath(y2.size) }), p2.attr({ class: "highcharts-halo highcharts-color-" + o$(this.colorIndex, i10.colorIndex) + (this.className ? " " + this.className : ""), visibility: v2, zIndex: -1 }), p2.point = this, d2.styledMode || p2.attr(oW({ fill: this.color || i10.color, "fill-opacity": y2.opacity }, t6.filterUserAttributes(y2.attributes || {})))) : p2?.point?.haloPath && !p2.point.destroyed && p2.animate({ d: p2.point.haloPath(0) }, null, p2.hide), oH(this, "afterSetState", { state: t10 });
        }
        haloPath(t10) {
          let e10 = this.pos();
          return e10 ? this.series.chart.renderer.symbols.circle(oz(e10[0], 1) - t10, e10[1] - t10, 2 * t10, 2 * t10) : [];
        }
      };
      __name(_oq, "oq");
      let oq = _oq;
      let oK = oq, { parse: oJ } = tL, { charts: oQ, composed: o0, isTouchDevice: o1 } = w, { addEvent: o2, attr: o3, css: o5, extend: o6, find: o9, fireEvent: o4, isNumber: o8, isObject: o7, objectEach: rt, offset: re, pick: ri, pushUnique: rs, splat: ro } = V;
      const _rr = class _rr {
        applyInactiveState(t10 = []) {
          let e10 = [];
          for (let i10 of (t10.forEach((t11) => {
            let i11 = t11.series;
            e10.push(i11), i11.linkedParent && e10.push(i11.linkedParent), i11.linkedSeries && e10.push.apply(e10, i11.linkedSeries), i11.navigatorSeries && e10.push(i11.navigatorSeries), i11.boosted && i11.markerGroup && e10.push.apply(e10, this.chart.series.filter((t12) => t12.markerGroup === i11.markerGroup));
          }), this.chart.series)) {
            let t11 = i10.options;
            t11.states?.inactive?.enabled !== false && (-1 === e10.indexOf(i10) ? i10.setState("inactive", true) : t11.inactiveOtherPoints && i10.setAllPointsToState("inactive"));
          }
        }
        destroy() {
          let t10 = this;
          this.eventsToUnbind.forEach((t11) => t11()), this.eventsToUnbind = [], !w.chartCount && (_rr.unbindDocumentMouseUp.forEach((t11) => t11.unbind()), _rr.unbindDocumentMouseUp.length = 0, _rr.unbindDocumentTouchEnd && (_rr.unbindDocumentTouchEnd = _rr.unbindDocumentTouchEnd())), clearInterval(t10.tooltipTimeout), rt(t10, function(e10, i10) {
            t10[i10] = void 0;
          });
        }
        getSelectionMarkerAttrs(t10, e10) {
          let i10 = { args: { chartX: t10, chartY: e10 }, attrs: {}, shapeType: "rect" };
          return o4(this, "getSelectionMarkerAttrs", i10, (i11) => {
            let s10, { chart: o10, zoomHor: r10, zoomVert: a10 } = this, { mouseDownX: n10 = 0, mouseDownY: h10 = 0 } = o10, l2 = i11.attrs;
            l2.x = o10.plotLeft, l2.y = o10.plotTop, l2.width = r10 ? 1 : o10.plotWidth, l2.height = a10 ? 1 : o10.plotHeight, r10 && (l2.width = Math.max(1, Math.abs(s10 = t10 - n10)), l2.x = (s10 > 0 ? 0 : s10) + n10), a10 && (l2.height = Math.max(1, Math.abs(s10 = e10 - h10)), l2.y = (s10 > 0 ? 0 : s10) + h10);
          }), i10;
        }
        drag(t10) {
          let { chart: e10 } = this, { mouseDownX: i10 = 0, mouseDownY: s10 = 0 } = e10, { panning: o10, panKey: r10, selectionMarkerFill: a10 } = e10.options.chart, n10 = e10.plotLeft, h10 = e10.plotTop, l2 = e10.plotWidth, d2 = e10.plotHeight, c2 = o7(o10) ? o10.enabled : o10, p2 = r10 && t10[`${r10}Key`], g2 = t10.chartX, u2 = t10.chartY, f2, m2 = this.selectionMarker;
          if ((!m2 || !m2.touch) && (g2 < n10 ? g2 = n10 : g2 > n10 + l2 && (g2 = n10 + l2), u2 < h10 ? u2 = h10 : u2 > h10 + d2 && (u2 = h10 + d2), this.hasDragged = Math.sqrt(Math.pow(i10 - g2, 2) + Math.pow(s10 - u2, 2)), this.hasDragged > 10)) {
            f2 = e10.isInsidePlot(i10 - n10, s10 - h10, { visiblePlotOnly: true });
            let { shapeType: r11, attrs: l3 } = this.getSelectionMarkerAttrs(g2, u2);
            this.hasZoom && f2 && !p2 && !m2 && (this.selectionMarker = m2 = e10.renderer[r11](), m2.attr({ class: "highcharts-selection-marker", zIndex: 7 }).add(), e10.styledMode || m2.attr({ fill: a10 || oJ("#334eff").setOpacity(0.25).get() })), m2 && m2.attr(l3), f2 && !m2 && c2 && e10.pan(t10, o10);
          }
        }
        dragStart(t10) {
          let e10 = this.chart;
          e10.mouseIsDown = t10.type, e10.cancelClick = false, e10.mouseDownX = t10.chartX, e10.mouseDownY = t10.chartY;
        }
        getSelectionBox(t10) {
          let e10 = { args: { marker: t10 }, result: t10.getBBox() };
          return o4(this, "getSelectionBox", e10), e10.result;
        }
        drop(t10) {
          let e10, { chart: i10, selectionMarker: s10 } = this;
          for (let t11 of i10.axes) t11.isPanning && (t11.isPanning = false, (t11.options.startOnTick || t11.options.endOnTick || t11.series.some((t12) => t12.boosted)) && (t11.forceRedraw = true, t11.setExtremes(t11.userMin, t11.userMax, false), e10 = true));
          if (e10 && i10.redraw(), s10 && t10) {
            if (this.hasDragged) {
              let e11 = this.getSelectionBox(s10);
              i10.transform({ axes: i10.axes.filter((t11) => t11.zoomEnabled && ("xAxis" === t11.coll && this.zoomX || "yAxis" === t11.coll && this.zoomY)), selection: __spreadValues({ originalEvent: t10, xAxis: [], yAxis: [] }, e11), from: e11 });
            }
            o8(i10.index) && (this.selectionMarker = s10.destroy());
          }
          i10 && o8(i10.index) && (o5(i10.container, { cursor: i10._cursor }), i10.cancelClick = this.hasDragged > 10, i10.mouseIsDown = false, this.hasDragged = 0, this.pinchDown = [], this.hasPinchMoved = false);
        }
        findNearestKDPoint(t10, e10, i10) {
          let s10;
          return t10.forEach(function(t11) {
            let o10 = !(t11.noSharedTooltip && e10) && 0 > t11.options.findNearestPointBy.indexOf("y"), r10 = t11.searchPoint(i10, o10);
            o7(r10, true) && r10.series && (!o7(s10, true) || (function(t12, i11) {
              let s11, o11 = t12.distX - i11.distX, r11 = t12.dist - i11.dist, a10 = i11.series.group?.zIndex - t12.series.group?.zIndex;
              return 0 !== o11 && e10 ? o11 : 0 !== r11 ? r11 : 0 !== a10 ? a10 : t12.series.index > i11.series.index ? -1 : 1;
            })(s10, r10) > 0) && (s10 = r10);
          }), s10;
        }
        getChartCoordinatesFromPoint(t10, e10) {
          let { xAxis: i10, yAxis: s10 } = t10.series, o10 = t10.shapeArgs;
          if (i10 && s10) {
            let r10 = t10.clientX ?? t10.plotX ?? 0, a10 = t10.plotY || 0;
            return t10.isNode && o10 && o8(o10.x) && o8(o10.y) && (r10 = o10.x, a10 = o10.y), e10 ? { chartX: s10.len + s10.pos - a10, chartY: i10.len + i10.pos - r10 } : { chartX: r10 + i10.pos, chartY: a10 + s10.pos };
          }
          if (o10?.x && o10.y) return { chartX: o10.x, chartY: o10.y };
        }
        getChartPosition() {
          if (this.chartPosition) return this.chartPosition;
          let { container: t10 } = this.chart, e10 = re(t10);
          this.chartPosition = { left: e10.left, top: e10.top, scaleX: 1, scaleY: 1 };
          let { offsetHeight: i10, offsetWidth: s10 } = t10;
          return s10 > 2 && i10 > 2 && (this.chartPosition.scaleX = e10.width / s10, this.chartPosition.scaleY = e10.height / i10), this.chartPosition;
        }
        getCoordinates(t10) {
          let e10 = { xAxis: [], yAxis: [] };
          for (let i10 of this.chart.axes) e10[i10.isXAxis ? "xAxis" : "yAxis"].push({ axis: i10, value: i10.toValue(t10[i10.horiz ? "chartX" : "chartY"]) });
          return e10;
        }
        getHoverData(t10, e10, i10, s10, o10, r10) {
          let a10 = [], n10 = /* @__PURE__ */ __name(function(t11) {
            return t11.visible && !(!o10 && t11.directTouch) && ri(t11.options.enableMouseTracking, true);
          }, "n"), h10 = e10, l2, d2 = { chartX: r10 ? r10.chartX : void 0, chartY: r10 ? r10.chartY : void 0, shared: o10 };
          o4(this, "beforeGetHoverData", d2), l2 = h10 && !h10.stickyTracking ? [h10] : i10.filter((t11) => t11.stickyTracking && (d2.filter || n10)(t11));
          let c2 = s10 && t10 || !r10 ? t10 : this.findNearestKDPoint(l2, o10, r10);
          return h10 = c2?.series, c2 && (o10 && !h10.noSharedTooltip ? (l2 = i10.filter(function(t11) {
            return d2.filter ? d2.filter(t11) : n10(t11) && !t11.noSharedTooltip;
          })).forEach(function(t11) {
            let e11 = t11.options?.nullInteraction, i11 = o9(t11.points, function(t12) {
              return t12.x === c2.x && (!t12.isNull || !!e11);
            });
            o7(i11) && (t11.boosted && t11.boost && (i11 = t11.boost.getPoint(i11)), a10.push(i11));
          }) : a10.push(c2)), o4(this, "afterGetHoverData", d2 = { hoverPoint: c2 }), { hoverPoint: d2.hoverPoint, hoverSeries: h10, hoverPoints: a10 };
        }
        getPointFromEvent(t10) {
          let e10 = t10.target, i10;
          for (; e10 && !i10; ) i10 = e10.point, e10 = e10.parentNode;
          return i10;
        }
        onTrackerMouseOut(t10) {
          let e10 = this.chart, i10 = t10.relatedTarget, s10 = e10.hoverSeries;
          this.isDirectTouch = false, !s10 || !i10 || s10.stickyTracking || this.inClass(i10, "highcharts-tooltip") || this.inClass(i10, "highcharts-series-" + s10.index) && this.inClass(i10, "highcharts-tracker") || s10.onMouseOut();
        }
        inClass(t10, e10) {
          let i10 = t10, s10;
          for (; i10; ) {
            if (s10 = o3(i10, "class")) {
              if (-1 !== s10.indexOf(e10)) return true;
              if (-1 !== s10.indexOf("highcharts-container")) return false;
            }
            i10 = i10.parentElement;
          }
        }
        constructor(t10, e10) {
          this.hasDragged = 0, this.pointerCaptureEventsToUnbind = [], this.eventsToUnbind = [], this.options = e10, this.chart = t10, this.runChartClick = !!e10.chart.events?.click, this.pinchDown = [], this.setDOMEvents(), o4(this, "afterInit");
        }
        normalize(t10, e10) {
          let i10 = t10.touches, s10 = i10 ? i10.length ? i10.item(0) : ri(i10.changedTouches, t10.changedTouches)[0] : t10;
          e10 || (e10 = this.getChartPosition());
          let o10 = s10.pageX - e10.left, r10 = s10.pageY - e10.top;
          return o6(t10, { chartX: Math.round(o10 /= e10.scaleX), chartY: Math.round(r10 /= e10.scaleY) });
        }
        onContainerClick(t10) {
          let e10 = this.chart, i10 = e10.hoverPoint, s10 = this.normalize(t10), o10 = e10.plotLeft, r10 = e10.plotTop;
          !e10.cancelClick && (i10 && this.inClass(s10.target, "highcharts-tracker") ? (o4(i10.series, "click", o6(s10, { point: i10 })), e10.hoverPoint && i10.firePointEvent("click", s10)) : (o6(s10, this.getCoordinates(s10)), e10.isInsidePlot(s10.chartX - o10, s10.chartY - r10, { visiblePlotOnly: true }) && o4(e10, "click", s10)));
        }
        onContainerMouseDown(t10) {
          let e10 = (1 & (t10.buttons || t10.button)) == 1;
          t10 = this.normalize(t10), w.isFirefox && 0 !== t10.button && this.onContainerMouseMove(t10), (void 0 === t10.button || e10) && (this.zoomOption(t10), e10 && t10.preventDefault?.(), this.dragStart(t10));
        }
        onContainerMouseLeave(t10) {
          let { pointer: e10 } = oQ[ri(_rr.hoverChartIndex, -1)] || {};
          t10 = this.normalize(t10), this.onContainerMouseMove(t10), e10 && !this.inClass(t10.relatedTarget, "highcharts-tooltip") && (e10.reset(), e10.chartPosition = void 0);
        }
        onContainerMouseEnter() {
          delete this.chartPosition;
        }
        onContainerMouseMove(t10) {
          let e10 = this.chart, i10 = e10.tooltip, s10 = this.normalize(t10);
          this.setHoverChartIndex(t10), ("mousedown" === e10.mouseIsDown || this.touchSelect(s10)) && this.drag(s10), !e10.exporting?.openMenu && (this.inClass(s10.target, "highcharts-tracker") || e10.isInsidePlot(s10.chartX - e10.plotLeft, s10.chartY - e10.plotTop, { visiblePlotOnly: true })) && !i10?.shouldStickOnContact(s10) && (this.inClass(s10.target, "highcharts-no-tooltip") ? this.reset(false, 0) : this.runPointActions(s10));
        }
        onDocumentTouchEnd(t10) {
          this.onDocumentMouseUp(t10);
        }
        onContainerTouchMove(t10) {
          this.touchSelect(t10) ? this.onContainerMouseMove(t10) : this.touch(t10);
        }
        onContainerTouchStart(t10) {
          this.touchSelect(t10) ? this.onContainerMouseDown(t10) : (this.zoomOption(t10), this.touch(t10, true));
        }
        onDocumentMouseMove(t10) {
          let e10 = this.chart, i10 = e10.tooltip, s10 = this.chartPosition, o10 = this.normalize(t10, s10);
          !s10 || e10.isInsidePlot(o10.chartX - e10.plotLeft, o10.chartY - e10.plotTop, { visiblePlotOnly: true }) || i10?.shouldStickOnContact(o10) || o10.target !== e10.container.ownerDocument && this.inClass(o10.target, "highcharts-tracker") || this.reset();
        }
        onDocumentMouseUp(t10) {
          t10?.touches && this.hasPinchMoved && t10?.preventDefault?.(), oQ[ri(_rr.hoverChartIndex, -1)]?.pointer?.drop(t10);
        }
        pinch(t10) {
          let e10 = this, { chart: i10, hasZoom: s10, lastTouches: o10 } = e10, r10 = [].map.call(t10.touches || [], (t11) => e10.normalize(t11)), a10 = r10.length, n10 = 1 === a10 && (e10.inClass(t10.target, "highcharts-tracker") && i10.runTrackerClick || e10.runChartClick), h10 = i10.tooltip, l2 = 1 === a10 && ri(h10?.options.followTouchMove, true);
          a10 > 1 ? e10.initiated = true : l2 && (e10.initiated = false), s10 && e10.initiated && !n10 && false !== t10.cancelable && t10.preventDefault(), "touchstart" === t10.type ? (e10.pinchDown = r10, e10.res = true, i10.mouseDownX = t10.chartX) : l2 ? this.runPointActions(e10.normalize(t10)) : o10 && (o4(i10, "touchpan", { originalEvent: t10, touches: r10 }, () => {
            let e11 = /* @__PURE__ */ __name((t11) => {
              let e12 = t11[0], i11 = t11[1] || e12;
              return { x: e12.chartX, y: e12.chartY, width: i11.chartX - e12.chartX, height: i11.chartY - e12.chartY };
            }, "e");
            i10.transform({ axes: i10.axes.filter((t11) => t11.zoomEnabled && (this.zoomHor && t11.horiz || this.zoomVert && !t11.horiz)), to: e11(r10), from: e11(o10), trigger: t10.type });
          }), e10.res && (e10.res = false, this.reset(false, 0))), e10.lastTouches = r10;
        }
        reset(t10, e10) {
          let i10 = this.chart, s10 = i10.hoverSeries, o10 = i10.hoverPoint, r10 = i10.hoverPoints, a10 = i10.tooltip, n10 = a10?.shared ? r10 : o10;
          t10 && n10 && ro(n10).forEach(function(e11) {
            e11.series.isCartesian && void 0 === e11.plotX && (t10 = false);
          }), t10 ? a10 && n10 && ro(n10).length && (a10.refresh(n10), a10.shared && r10 ? r10.forEach(function(t11) {
            t11.setState(t11.state, true), t11.series.isCartesian && (t11.series.xAxis.crosshair && t11.series.xAxis.drawCrosshair(null, t11), t11.series.yAxis.crosshair && t11.series.yAxis.drawCrosshair(null, t11));
          }) : o10 && (o10.setState(o10.state, true), i10.axes.forEach(function(t11) {
            t11.crosshair && o10.series[t11.coll] === t11 && t11.drawCrosshair(null, o10);
          }))) : (o10 && o10.onMouseOut(), r10 && r10.forEach(function(t11) {
            t11.setState();
          }), s10 && s10.onMouseOut(), a10 && a10.hide(e10), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), i10.axes.forEach(function(t11) {
            t11.hideCrosshair();
          }), i10.hoverPoints = i10.hoverPoint = void 0);
        }
        runPointActions(t10, e10, i10) {
          let s10 = this.chart, o10 = s10.series, r10 = s10.tooltip?.options.enabled ? s10.tooltip : void 0, a10 = !!r10 && r10.shared, n10 = e10 || s10.hoverPoint, h10 = n10?.series || s10.hoverSeries, l2 = (!t10 || "touchmove" !== t10.type) && (!!e10 || h10?.directTouch && this.isDirectTouch), d2 = this.getHoverData(n10, h10, o10, l2, a10, t10);
          n10 = d2.hoverPoint, h10 = d2.hoverSeries;
          let c2 = d2.hoverPoints, p2 = h10?.tooltipOptions.followPointer && !h10.tooltipOptions.split, g2 = a10 && h10 && !h10.noSharedTooltip;
          if (n10 && (i10 || n10 !== s10.hoverPoint || r10?.isHidden)) {
            if ((s10.hoverPoints || []).forEach(function(t11) {
              -1 === c2.indexOf(t11) && t11.setState();
            }), s10.hoverSeries !== h10 && h10.onMouseOver(), this.applyInactiveState(c2), (c2 || []).forEach(function(t11) {
              t11.setState("hover");
            }), s10.hoverPoint && s10.hoverPoint.firePointEvent("mouseOut"), !n10.series) return;
            s10.hoverPoints = c2, s10.hoverPoint = n10, n10.firePointEvent("mouseOver", void 0, () => {
              r10 && n10 && r10.refresh(g2 ? c2 : n10, t10);
            });
          } else if (p2 && r10 && !r10.isHidden) {
            let e11 = r10.getAnchor([{}], t10);
            s10.isInsidePlot(e11[0], e11[1], { visiblePlotOnly: true }) && r10.updatePosition({ plotX: e11[0], plotY: e11[1] });
          }
          this.unDocMouseMove || (this.unDocMouseMove = o2(s10.container.ownerDocument, "mousemove", (t11) => oQ[_rr.hoverChartIndex ?? -1]?.pointer?.onDocumentMouseMove(t11)), this.eventsToUnbind.push(this.unDocMouseMove)), s10.axes.forEach(function(e11) {
            let i11, o11 = e11.crosshair?.snap ?? true;
            o11 && ((i11 = s10.hoverPoint) && i11.series[e11.coll] === e11 || (i11 = o9(c2, (t11) => t11.series?.[e11.coll] === e11))), i11 || !o11 ? e11.drawCrosshair(t10, i11) : e11.hideCrosshair();
          });
        }
        setDOMEvents() {
          let t10 = this.chart.container, e10 = t10.ownerDocument;
          t10.onmousedown = this.onContainerMouseDown.bind(this), t10.onmousemove = this.onContainerMouseMove.bind(this), t10.onclick = this.onContainerClick.bind(this), this.eventsToUnbind.push(o2(t10, "mouseenter", this.onContainerMouseEnter.bind(this)), o2(t10, "mouseleave", this.onContainerMouseLeave.bind(this))), _rr.unbindDocumentMouseUp.some((t11) => t11.doc === e10) || _rr.unbindDocumentMouseUp.push({ doc: e10, unbind: o2(e10, "mouseup", this.onDocumentMouseUp.bind(this)) });
          let i10 = this.chart.renderTo.parentElement;
          for (; i10 && "BODY" !== i10.tagName; ) this.eventsToUnbind.push(o2(i10, "scroll", () => {
            delete this.chartPosition;
          })), i10 = i10.parentElement;
          this.eventsToUnbind.push(o2(t10, "touchstart", this.onContainerTouchStart.bind(this), { passive: false }), o2(t10, "touchmove", this.onContainerTouchMove.bind(this), { passive: false })), _rr.unbindDocumentTouchEnd || (_rr.unbindDocumentTouchEnd = o2(e10, "touchend", this.onDocumentTouchEnd.bind(this), { passive: false })), this.setPointerCapture(), o2(this.chart, "redraw", this.setPointerCapture.bind(this));
        }
        setPointerCapture() {
          if (!o1) return;
          let t10 = this.pointerCaptureEventsToUnbind, e10 = this.chart, i10 = e10.container, s10 = ri(e10.options.tooltip?.followTouchMove, true) && e10.series.some((t11) => t11.options.findNearestPointBy.indexOf("y") > -1);
          !this.hasPointerCapture && s10 ? (t10.push(o2(i10, "pointerdown", (t11) => {
            t11.target?.hasPointerCapture(t11.pointerId) && t11.target?.releasePointerCapture(t11.pointerId);
          }), o2(i10, "pointermove", (t11) => {
            e10.pointer?.getPointFromEvent(t11)?.onMouseOver(t11);
          })), e10.styledMode || o5(i10, { "touch-action": "none" }), i10.className += " highcharts-no-touch-action", this.hasPointerCapture = true) : this.hasPointerCapture && !s10 && (t10.forEach((t11) => t11()), t10.length = 0, e10.styledMode || o5(i10, { "touch-action": ri(e10.options.chart.style?.["touch-action"], "manipulation") }), i10.className = i10.className.replace(" highcharts-no-touch-action", ""), this.hasPointerCapture = false);
        }
        setHoverChartIndex(t10) {
          let e10 = this.chart, i10 = w.charts[ri(_rr.hoverChartIndex, -1)];
          if (i10 && i10 !== e10) {
            let s10 = { relatedTarget: e10.container };
            t10 && !t10?.relatedTarget && Object.assign({}, t10, s10), i10.pointer?.onContainerMouseLeave(t10 || s10);
          }
          i10?.mouseIsDown || (_rr.hoverChartIndex = e10.index);
        }
        touch(t10, e10) {
          let i10, { chart: s10, pinchDown: o10 = [] } = this;
          this.setHoverChartIndex(), 1 === (t10 = this.normalize(t10)).touches.length ? s10.isInsidePlot(t10.chartX - s10.plotLeft, t10.chartY - s10.plotTop, { visiblePlotOnly: true }) && !s10.exporting?.openMenu ? (e10 && this.runPointActions(t10), "touchmove" === t10.type && (this.hasPinchMoved = i10 = !!o10[0] && Math.pow(o10[0].chartX - t10.chartX, 2) + Math.pow(o10[0].chartY - t10.chartY, 2) >= 16), ri(i10, true) && this.pinch(t10)) : e10 && this.reset() : 2 === t10.touches.length && this.pinch(t10);
        }
        touchSelect(t10) {
          return !!(this.chart.zooming.singleTouch && t10.touches && 1 === t10.touches.length);
        }
        zoomOption(t10) {
          let e10 = this.chart, i10 = e10.inverted, s10 = e10.zooming.type || "", o10, r10;
          /touch/.test(t10.type) && (s10 = ri(e10.zooming.pinchType, s10)), this.zoomX = o10 = /x/.test(s10), this.zoomY = r10 = /y/.test(s10), this.zoomHor = o10 && !i10 || r10 && i10, this.zoomVert = r10 && !i10 || o10 && i10, this.hasZoom = o10 || r10;
        }
      };
      __name(_rr, "rr");
      let rr = _rr;
      rr.unbindDocumentMouseUp = [], (function(t10) {
        t10.compose = function(e10) {
          rs(o0, "Core.Pointer") && o2(e10, "beforeRender", function() {
            this.pointer = new t10(this, this.options);
          });
        };
      })(rr || (rr = {}));
      let ra = rr;
      !(function(t10) {
        t10.setLength = function(t11, e10, i10) {
          return Array.isArray(t11) ? (t11.length = e10, t11) : t11[i10 ? "subarray" : "slice"](0, e10);
        }, t10.splice = function(t11, e10, i10, s10, o10 = []) {
          if (Array.isArray(t11)) return Array.isArray(o10) || (o10 = Array.from(o10)), { removed: t11.splice(e10, i10, ...o10), array: t11 };
          let r10 = Object.getPrototypeOf(t11).constructor, a10 = t11[s10 ? "subarray" : "slice"](e10, e10 + i10), n10 = new r10(t11.length - i10 + o10.length);
          return n10.set(t11.subarray(0, e10), 0), n10.set(o10, e10), n10.set(t11.subarray(e10 + i10), e10 + o10.length), { removed: a10, array: n10 };
        };
      })(d || (d = {}));
      let { setLength: rn, splice: rh } = d, { fireEvent: rl, objectEach: rd, uniqueKey: rc } = V, rp = (_e = class {
        constructor(t10 = {}) {
          this.autoId = !t10.id, this.columns = {}, this.id = t10.id || rc(), this.modified = this, this.rowCount = 0, this.versionTag = rc();
          let e10 = 0;
          rd(t10.columns || {}, (t11, i10) => {
            this.columns[i10] = t11.slice(), e10 = Math.max(e10, t11.length);
          }), this.applyRowCount(e10);
        }
        applyRowCount(t10) {
          this.rowCount = t10, rd(this.columns, (e10, i10) => {
            e10.length !== t10 && (this.columns[i10] = rn(e10, t10));
          });
        }
        deleteRows(t10, e10 = 1) {
          if (e10 > 0 && t10 < this.rowCount) {
            let i10 = 0;
            rd(this.columns, (s10, o10) => {
              this.columns[o10] = rh(s10, t10, e10).array, i10 = s10.length;
            }), this.rowCount = i10;
          }
          rl(this, "afterDeleteRows", { rowIndex: t10, rowCount: e10 }), this.versionTag = rc();
        }
        getColumn(t10, e10) {
          return this.columns[t10];
        }
        getColumns(t10, e10) {
          return (t10 || Object.keys(this.columns)).reduce((t11, e11) => (t11[e11] = this.columns[e11], t11), {});
        }
        getRow(t10, e10) {
          return (e10 || Object.keys(this.columns)).map((e11) => this.columns[e11]?.[t10]);
        }
        setColumn(t10, e10 = [], i10 = 0, s10) {
          this.setColumns({ [t10]: e10 }, i10, s10);
        }
        setColumns(t10, e10, i10) {
          let s10 = this.rowCount;
          rd(t10, (t11, e11) => {
            this.columns[e11] = t11.slice(), s10 = t11.length;
          }), this.applyRowCount(s10), i10?.silent || (rl(this, "afterSetColumns"), this.versionTag = rc());
        }
        setRow(t10, e10 = this.rowCount, i10, s10) {
          let { columns: o10 } = this, r10 = i10 ? this.rowCount + 1 : e10 + 1;
          rd(t10, (t11, a10) => {
            let n10 = o10[a10] || s10?.addColumns !== false && Array(r10);
            n10 && (i10 ? n10 = rh(n10, e10, 0, true, [t11]).array : n10[e10] = t11, o10[a10] = n10);
          }), r10 > this.rowCount && this.applyRowCount(r10), s10?.silent || (rl(this, "afterSetRows"), this.versionTag = rc());
        }
      }, __name(_e, "rp"), _e), { extend: rg, merge: ru, pick: rf } = V;
      !(function(t10) {
        function e10(t11, e11, i10) {
          let s10 = this.legendItem = this.legendItem || {}, { chart: o10, options: r10 } = this, { baseline: a10 = 0, symbolWidth: n10, symbolHeight: h10 } = t11, l2 = this.symbol || "circle", d2 = h10 / 2, c2 = o10.renderer, p2 = s10.group, g2 = a10 - Math.round((t11.fontMetrics?.b || h10) * (i10 ? 0.4 : 0.3)), u2 = {}, f2, m2 = r10.marker, x2 = 0;
          if (o10.styledMode || (u2["stroke-width"] = Math.min(r10.lineWidth || 0, 24), r10.dashStyle ? u2.dashstyle = r10.dashStyle : "square" !== r10.linecap && (u2["stroke-linecap"] = "round")), s10.line = c2.path().addClass("highcharts-graph").attr(u2).add(p2), i10 && (s10.area = c2.path().addClass("highcharts-area").add(p2)), u2["stroke-linecap"] && (x2 = Math.min(s10.line.strokeWidth(), n10) / 2), n10) {
            let t12 = [["M", x2, g2], ["L", n10 - x2, g2]];
            s10.line.attr({ d: t12 }), s10.area?.attr({ d: [...t12, ["L", n10 - x2, a10], ["L", x2, a10]] });
          }
          if (m2 && false !== m2.enabled && n10) {
            let t12 = Math.min(rf(m2.radius, d2), d2);
            0 === l2.indexOf("url") && (m2 = ru(m2, { width: h10, height: h10 }), t12 = 0), s10.symbol = f2 = c2.symbol(l2, n10 / 2 - t12, g2 - t12, 2 * t12, 2 * t12, rg({ context: "legend" }, m2)).addClass("highcharts-point").add(p2), f2.isMarker = true;
          }
        }
        __name(e10, "e");
        t10.areaMarker = function(t11, i10) {
          e10.call(this, t11, i10, true);
        }, t10.lineMarker = e10, t10.rectangle = function(t11, e11) {
          let i10 = e11.legendItem || {}, s10 = t11.options, o10 = t11.symbolHeight, r10 = s10.squareSymbol, a10 = r10 ? o10 : t11.symbolWidth;
          i10.symbol = this.chart.renderer.rect(r10 ? (t11.symbolWidth - o10) / 2 : 0, t11.baseline - o10 + 1, a10, o10, rf(t11.options.symbolRadius, o10 / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(i10.group);
        };
      })(c || (c = {}));
      let rm = c, { defaultOptions: rx } = tv, { extend: ry, extendClass: rb, merge: rv } = V;
      !(function(t10) {
        function e10(e11, i10) {
          let s10 = rx.plotOptions || {}, o10 = i10.defaultOptions, r10 = i10.prototype;
          return r10.type = e11, r10.pointClass || (r10.pointClass = oK), !t10.seriesTypes[e11] && (o10 && (s10[e11] = o10), t10.seriesTypes[e11] = i10, true);
        }
        __name(e10, "e");
        t10.seriesTypes = w.seriesTypes, t10.registerSeriesType = e10, t10.seriesType = function(i10, s10, o10, r10, a10) {
          let n10 = rx.plotOptions || {};
          if (s10 = s10 || "", n10[i10] = rv(n10[s10], o10), delete t10.seriesTypes[i10], e10(i10, rb(t10.seriesTypes[s10] || r1, r10)), t10.seriesTypes[i10].prototype.type = i10, a10) {
            const _e2 = class _e2 extends oK {
            };
            __name(_e2, "e");
            let e11 = _e2;
            ry(e11.prototype, a10), t10.seriesTypes[i10].prototype.pointClass = e11;
          }
          return t10.seriesTypes[i10];
        };
      })(p || (p = {}));
      let rk = p, { animObject: rw, setAnimation: rM } = tU, { defaultOptions: rS } = tv, { registerEventOptions: rT } = si, { svg: rC, win: rA } = w, { seriesTypes: rP } = rk, { format: rL } = ep, { arrayMax: rO, arrayMin: rE, clamp: rI, correctFloat: rD, crisp: rB, defined: rN, destroyObjectProperties: rz, diffObjects: rR, erase: rW, error: rH, extend: rX, find: rF, fireEvent: rG, getClosestDistance: rj, getNestedProperty: rY, insertItem: rU, isArray: r$, isNumber: rV, isString: rZ, merge: r_, objectEach: rq, pick: rK, removeEvent: rJ, syncTimeout: rQ } = V;
      const _r0 = class _r0 {
        constructor() {
          this.zoneAxis = "y";
        }
        init(t10, e10) {
          let i10;
          rG(this, "init", { options: e10 }), this.dataTable ?? (this.dataTable = new rp());
          let s10 = t10.series;
          this.eventsToUnbind = [], this.chart = t10, this.options = this.setOptions(e10);
          let o10 = this.options, r10 = false !== o10.visible;
          this.linkedSeries = [], this.bindAxes(), rX(this, { name: o10.name, state: "", visible: r10, selected: true === o10.selected }), rT(this, o10);
          let a10 = o10.events;
          (a10?.click || o10.point?.events?.click || o10.allowPointSelect) && (t10.runTrackerClick = true), this.getColor(), this.getSymbol(), this.isCartesian && (t10.hasCartesianSeries = true), s10.length && (i10 = s10[s10.length - 1]), this._i = rK(i10?._i, -1) + 1, this.opacity = this.options.opacity, t10.orderItems("series", rU(this, s10)), o10.dataSorting?.enabled ? this.setDataSortingOptions() : this.points || this.data || this.setData(o10.data, false), rG(this, "afterInit");
        }
        is(t10) {
          return rP[t10] && this instanceof rP[t10];
        }
        bindAxes() {
          let t10, e10 = this, i10 = e10.options, s10 = e10.chart;
          rG(this, "bindAxes", null, function() {
            (e10.axisTypes || []).forEach(function(o10) {
              (s10[o10] || []).forEach(function(s11) {
                t10 = s11.options, (rK(i10[o10], 0) === s11.index || void 0 !== i10[o10] && i10[o10] === t10.id) && (rU(e10, s11.series), e10[o10] = s11, s11.isDirty = true);
              }), e10[o10] || e10.optionalAxis === o10 || rH(18, true, s10);
            });
          }), rG(this, "afterBindAxes");
        }
        hasData() {
          return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.dataTable.rowCount > 0;
        }
        hasMarkerChanged(t10, e10) {
          let i10 = t10.marker, s10 = e10.marker || {};
          return i10 && (s10.enabled && !i10.enabled || s10.symbol !== i10.symbol || s10.height !== i10.height || s10.width !== i10.width);
        }
        autoIncrement(t10) {
          let e10, i10 = this.options, { pointIntervalUnit: s10, relativeXValue: o10 } = this.options, r10 = this.chart.time, a10 = this.xIncrement ?? r10.parse(i10.pointStart) ?? 0;
          if (this.pointInterval = e10 = rK(this.pointInterval, i10.pointInterval, 1), o10 && rV(t10) && (e10 *= t10), s10) {
            let t11 = r10.toParts(a10);
            "day" === s10 ? t11[2] += e10 : "month" === s10 ? t11[1] += e10 : "year" === s10 && (t11[0] += e10), e10 = r10.makeTime.apply(r10, t11) - a10;
          }
          return o10 && rV(t10) ? a10 + e10 : (this.xIncrement = a10 + e10, a10);
        }
        setDataSortingOptions() {
          let t10 = this.options;
          rX(this, { requireSorting: false, sorted: false, enabledDataSorting: true, allowDG: false }), rN(t10.pointRange) || (t10.pointRange = 1);
        }
        setOptions(t10) {
          let e10, i10 = this.chart, s10 = i10.options.plotOptions, o10 = i10.userOptions || {}, r10 = r_(t10), a10 = i10.styledMode, n10 = { plotOptions: s10, userOptions: r10 };
          rG(this, "setOptions", n10);
          let h10 = n10.plotOptions[this.type], l2 = o10.plotOptions || {}, d2 = l2.series || {}, c2 = rS.plotOptions[this.type] || {}, p2 = l2[this.type] || {};
          h10.dataLabels = this.mergeArrays(c2.dataLabels, h10.dataLabels), this.userOptions = n10.userOptions;
          let g2 = r_(h10, s10.series, p2, r10);
          this.tooltipOptions = r_(rS.tooltip, rS.plotOptions.series?.tooltip, c2?.tooltip, i10.userOptions.tooltip, l2.series?.tooltip, p2.tooltip, r10.tooltip), this.stickyTracking = rK(r10.stickyTracking, p2.stickyTracking, d2.stickyTracking, !!this.tooltipOptions.shared && !this.noSharedTooltip || g2.stickyTracking), null === h10.marker && delete g2.marker, this.zoneAxis = g2.zoneAxis || "y";
          let u2 = this.zones = (g2.zones || []).map((t11) => __spreadValues({}, t11));
          return (g2.negativeColor || g2.negativeFillColor) && !g2.zones && (e10 = { value: g2[this.zoneAxis + "Threshold"] || g2.threshold || 0, className: "highcharts-negative" }, a10 || (e10.color = g2.negativeColor, e10.fillColor = g2.negativeFillColor), u2.push(e10)), u2.length && rN(u2[u2.length - 1].value) && u2.push(a10 ? {} : { color: this.color, fillColor: this.fillColor }), rG(this, "afterSetOptions", { options: g2 }), g2;
        }
        getName() {
          return this.options.name ?? rL(this.chart.options.lang.seriesName, this, this.chart);
        }
        getCyclic(t10, e10, i10) {
          let s10, o10, r10 = this.chart, a10 = `${t10}Index`, n10 = `${t10}Counter`, h10 = i10?.length || r10.options.chart.colorCount;
          !e10 && (rN(o10 = rK("color" === t10 ? this.options.colorIndex : void 0, this[a10])) ? s10 = o10 : (r10.series.length || (r10[n10] = 0), s10 = r10[n10] % h10, r10[n10] += 1), i10 && (e10 = i10[s10])), void 0 !== s10 && (this[a10] = s10), this[t10] = e10;
        }
        getColor() {
          this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || rS.plotOptions[this.type].color, this.chart.options.colors);
        }
        getPointsCollection() {
          return (this.hasGroupedData ? this.points : this.data) || [];
        }
        getSymbol() {
          let t10 = this.options.marker;
          this.getCyclic("symbol", t10.symbol, this.chart.options.symbols);
        }
        getColumn(t10, e10) {
          return (e10 ? this.dataTable.modified : this.dataTable).getColumn(t10, true) || [];
        }
        findPointIndex(t10, e10) {
          let i10, s10, o10, { id: r10, x: a10 } = t10, n10 = this.points, h10 = this.options.dataSorting, l2 = this.cropStart || 0;
          if (r10) {
            let t11 = this.chart.get(r10);
            t11 instanceof oK && (i10 = t11);
          } else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) {
            let e11 = /* @__PURE__ */ __name((e12) => !e12.touched && e12.index === t10.index, "e");
            if (h10?.matchByName ? e11 = /* @__PURE__ */ __name((e12) => !e12.touched && e12.name === t10.name, "e") : this.options.relativeXValue && (e11 = /* @__PURE__ */ __name((e12) => !e12.touched && e12.options.x === t10.x, "e")), !(i10 = rF(n10, e11))) return;
          }
          return i10 && void 0 !== (o10 = i10?.index) && (s10 = true), void 0 === o10 && rV(a10) && (o10 = this.getColumn("x").indexOf(a10, e10)), -1 !== o10 && void 0 !== o10 && this.cropped && (o10 = o10 >= l2 ? o10 - l2 : o10), !s10 && rV(o10) && n10[o10]?.touched && (o10 = void 0), o10;
        }
        updateData(t10, e10) {
          let { options: i10, requireSorting: s10 } = this, o10 = i10.dataSorting, r10 = this.points, a10 = [], n10 = t10.length === r10.length, h10, l2, d2, c2, p2 = true;
          if (this.xIncrement = null, t10.forEach((t11, e11) => {
            let l3, d3 = rN(t11) && this.pointClass.prototype.optionsToObject.call({ series: this }, t11) || {}, { id: p3, x: g3 } = d3;
            p3 || rV(g3) ? (-1 === (l3 = this.findPointIndex(d3, c2)) || void 0 === l3 ? a10.push(t11) : r10[l3] && t11 !== i10.data?.[l3] ? (r10[l3].update(t11, false, void 0, false), r10[l3].touched = true, s10 && (c2 = l3 + 1)) : r10[l3] && (r10[l3].touched = true), (!n10 || e11 !== l3 || o10?.enabled || this.hasDerivedData) && (h10 = true)) : a10.push(t11);
          }, this), h10) for (l2 = r10.length; l2--; ) (d2 = r10[l2]) && !d2.touched && d2.remove?.(false, e10);
          else n10 && !o10?.enabled ? (t10.forEach((t11, e11) => {
            t11 === r10[e11].y || r10[e11].destroyed || r10[e11].update(t11, false, void 0, false);
          }), a10.length = 0) : p2 = false;
          if (r10.forEach((t11) => {
            t11 && (t11.touched = false);
          }), !p2) return false;
          a10.forEach((t11) => {
            this.addPoint(t11, false, void 0, void 0, false);
          }, this);
          let g2 = this.getColumn("x");
          return null === this.xIncrement && g2.length && (this.xIncrement = rO(g2), this.autoIncrement()), true;
        }
        dataColumnKeys() {
          return ["x", ...this.pointArrayMap || ["y"]];
        }
        setData(t10, e10 = true, i10, s10) {
          let o10 = this.points, r10 = o10?.length || 0, a10 = this.options, n10 = this.chart, h10 = a10.dataSorting, l2 = this.xAxis, d2 = a10.turboThreshold, c2 = this.dataTable, p2 = this.dataColumnKeys(), g2 = this.pointValKey || "y", u2 = (this.pointArrayMap || []).length, f2 = a10.keys, m2, x2, y2 = 0, b2 = 1, v2;
          n10.options.chart.allowMutatingData || (a10.data && delete this.options.data, this.userOptions.data && delete this.userOptions.data, v2 = r_(true, t10));
          let k2 = (t10 = v2 || t10 || []).length;
          if (h10?.enabled && (t10 = this.sortData(t10)), n10.options.chart.allowMutatingData && false !== s10 && k2 && r10 && !this.cropped && !this.hasGroupedData && this.visible && !this.boosted && (x2 = this.updateData(t10, i10)), !x2) {
            this.xIncrement = null, this.colorCounter = 0;
            let e11 = d2 && !a10.relativeXValue && k2 > d2;
            if (e11) {
              let i11 = this.getFirstValidPoint(t10), s11 = this.getFirstValidPoint(t10, k2 - 1, -1), o11 = /* @__PURE__ */ __name((t11) => !!(r$(t11) && (f2 || rV(t11[0]))), "o");
              if (rV(i11) && rV(s11)) {
                let e12 = [], i12 = [];
                for (let s12 of t10) e12.push(this.autoIncrement()), i12.push(s12);
                c2.setColumns({ x: e12, [g2]: i12 });
              } else if (o11(i11) && o11(s11)) if (u2) {
                let e12 = +(i11.length === u2), s12 = Array(p2.length).fill(0).map(() => []);
                for (let i12 of t10) {
                  e12 && s12[0].push(this.autoIncrement());
                  for (let t11 = e12; t11 <= u2; t11++) s12[t11]?.push(i12[t11 - e12]);
                }
                c2.setColumns(p2.reduce((t11, e13, i12) => (t11[e13] = s12[i12], t11), {}));
              } else {
                f2 && (y2 = f2.indexOf("x"), b2 = f2.indexOf("y"), y2 = y2 >= 0 ? y2 : 0, b2 = b2 >= 0 ? b2 : 1), 1 === i11.length && (b2 = 0);
                let e12 = [], s12 = [];
                if (y2 === b2) for (let i12 of t10) e12.push(this.autoIncrement()), s12.push(i12[b2]);
                else for (let i12 of t10) e12.push(i12[y2]), s12.push(i12[b2]);
                c2.setColumns({ x: e12, [g2]: s12 });
              }
              else e11 = false;
            }
            if (!e11) {
              let e12 = p2.reduce((t11, e13) => (t11[e13] = [], t11), {});
              for (m2 = 0; m2 < k2; m2++) {
                let i11 = this.pointClass.prototype.applyOptions.apply({ series: this }, [t10[m2]]);
                for (let t11 of p2) e12[t11][m2] = i11[t11];
              }
              c2.setColumns(e12);
            }
            for (rZ(this.getColumn("y")[0]) && rH(14, true, n10), this.data = [], this.options.data = this.userOptions.data = t10, m2 = r10; m2--; ) o10[m2]?.destroy();
            l2 && (l2.minRange = l2.userMinRange), this.isDirty = n10.isDirtyBox = true, this.isDirtyData = !!o10, i10 = false;
          }
          "point" === a10.legendType && (this.processData(), this.generatePoints()), e10 && n10.redraw(i10);
        }
        sortData(t10) {
          let e10 = this, i10 = e10.options.dataSorting.sortKey || "y", s10 = /* @__PURE__ */ __name(function(t11, e11) {
            return rN(e11) && t11.pointClass.prototype.optionsToObject.call({ series: t11 }, e11) || {};
          }, "s");
          return t10.forEach(function(i11, o10) {
            t10[o10] = s10(e10, i11), t10[o10].index = o10;
          }, this), t10.concat().sort((t11, e11) => {
            let s11 = rY(i10, t11), o10 = rY(i10, e11);
            return o10 < s11 ? -1 : +(o10 > s11);
          }).forEach(function(t11, e11) {
            t11.x = e11;
          }, this), e10.linkedSeries && e10.linkedSeries.forEach(function(e11) {
            let i11 = e11.options, o10 = i11.data;
            !i11.dataSorting?.enabled && o10 && (o10.forEach(function(i12, r10) {
              o10[r10] = s10(e11, i12), t10[r10] && (o10[r10].x = t10[r10].x, o10[r10].index = r10);
            }), e11.setData(o10, false));
          }), t10;
        }
        getProcessedData(t10) {
          let e10 = this, { dataTable: i10, isCartesian: s10, options: o10, xAxis: r10 } = e10, a10 = o10.cropThreshold, n10 = t10 || e10.getExtremesFromAll, h10 = r10?.logarithmic, l2 = i10.rowCount, d2, c2, p2 = 0, g2, u2, f2, m2 = e10.getColumn("x"), x2 = i10, y2 = false;
          return r10 && (u2 = (g2 = r10.getExtremes()).min, f2 = g2.max, y2 = !!(r10.categories && !r10.names.length), s10 && e10.sorted && !n10 && (!a10 || l2 > a10 || e10.forceCrop) && (m2[l2 - 1] < u2 || m2[0] > f2 ? x2 = new rp() : e10.getColumn(e10.pointValKey || "y").length && (m2[0] < u2 || m2[l2 - 1] > f2) && (x2 = (d2 = this.cropData(i10, u2, f2)).modified, p2 = d2.start, c2 = true))), m2 = x2.getColumn("x") || [], { modified: x2, cropped: c2, cropStart: p2, closestPointRange: rj([h10 ? m2.map(h10.log2lin) : m2], () => e10.requireSorting && !y2 && rH(15, false, e10.chart)) };
        }
        processData(t10) {
          let e10 = this.xAxis, i10 = this.dataTable;
          if (this.isCartesian && !this.isDirty && !e10.isDirty && !this.yAxis.isDirty && !t10) return false;
          let s10 = this.getProcessedData();
          i10.modified = s10.modified, this.cropped = s10.cropped, this.cropStart = s10.cropStart, this.closestPointRange = this.basePointRange = s10.closestPointRange, rG(this, "afterProcessData");
        }
        cropData(t10, e10, i10) {
          let s10 = t10.getColumn("x", true) || [], o10 = s10.length, r10 = {}, a10, n10, h10 = 0, l2 = o10;
          for (a10 = 0; a10 < o10; a10++) if (s10[a10] >= e10) {
            h10 = Math.max(0, a10 - 1);
            break;
          }
          for (n10 = a10; n10 < o10; n10++) if (s10[n10] > i10) {
            l2 = n10 + 1;
            break;
          }
          for (let e11 of this.dataColumnKeys()) {
            let i11 = t10.getColumn(e11, true);
            i11 && (r10[e11] = i11.slice(h10, l2));
          }
          return { modified: new rp({ columns: r10 }), start: h10, end: l2 };
        }
        generatePoints() {
          let t10 = this.options, e10 = this.processedData || t10.data, i10 = this.dataTable.modified, s10 = this.getColumn("x", true), o10 = this.pointClass, r10 = i10.rowCount, a10 = this.cropStart || 0, n10 = this.hasGroupedData, h10 = t10.keys, l2 = [], d2 = t10.dataGrouping?.groupAll ? a10 : 0, c2 = this.xAxis?.categories, p2 = this.pointArrayMap || ["y"], g2 = this.dataColumnKeys(), u2, f2, m2, x2, y2 = this.data, b2;
          if (!y2 && !n10) {
            let t11 = [];
            t11.length = e10?.length || 0, y2 = this.data = t11;
          }
          for (h10 && n10 && (this.options.keys = false), x2 = 0; x2 < r10; x2++) f2 = a10 + x2, n10 ? ((m2 = new o10(this, i10.getRow(x2, g2) || [])).dataGroup = this.groupMap[d2 + x2], m2.dataGroup?.options && (m2.options = m2.dataGroup.options, rX(m2, m2.dataGroup.options), delete m2.dataLabels)) : (m2 = y2[f2], b2 = e10 ? e10[f2] : i10.getRow(x2, p2), m2 || void 0 === b2 || (y2[f2] = m2 = new o10(this, b2, s10[x2]))), m2 && (m2.index = n10 ? d2 + x2 : f2, l2[x2] = m2, m2.category = c2?.[m2.x] ?? m2.x, m2.key = m2.name ?? m2.category);
          if (this.options.keys = h10, y2 && (r10 !== (u2 = y2.length) || n10)) for (x2 = 0; x2 < u2; x2++) x2 !== a10 || n10 || (x2 += r10), y2[x2] && (y2[x2].destroyElements(), y2[x2].plotX = void 0);
          this.data = y2, this.points = l2, rG(this, "afterGeneratePoints");
        }
        getXExtremes(t10) {
          return { min: rE(t10), max: rO(t10) };
        }
        getExtremes(t10, e10) {
          let { xAxis: i10, yAxis: s10 } = this, o10 = e10 || this.getExtremesFromAll || this.options.getExtremesFromAll, r10 = o10 && this.cropped ? this.dataTable : this.dataTable.modified, a10 = r10.rowCount, n10 = t10 || this.stackedYData, h10 = n10 ? [n10] : (this.keysAffectYAxis || this.pointArrayMap || ["y"])?.map((t11) => r10.getColumn(t11, true) || []) || [], l2 = this.getColumn("x", true), d2 = [], c2 = this.requireSorting && !this.is("column") ? 1 : 0, p2 = !!s10 && s10.positiveValuesOnly, g2 = o10 || this.cropped || !i10, u2, f2, m2, x2 = 0, y2 = 0;
          for (i10 && (x2 = (u2 = i10.getExtremes()).min, y2 = u2.max), m2 = 0; m2 < a10; m2++) if (f2 = l2[m2], g2 || (l2[m2 + c2] || f2) >= x2 && (l2[m2 - c2] || f2) <= y2) for (let t11 of h10) {
            let e11 = t11[m2];
            rV(e11) && (e11 > 0 || !p2) && d2.push(e11);
          }
          let b2 = { activeYData: d2, dataMin: rE(d2), dataMax: rO(d2) };
          return rG(this, "afterGetExtremes", { dataExtremes: b2 }), b2;
        }
        applyExtremes() {
          let t10 = this.getExtremes();
          return this.dataMin = t10.dataMin, this.dataMax = t10.dataMax, t10;
        }
        getFirstValidPoint(t10, e10 = 0, i10 = 1) {
          let s10 = t10.length, o10 = e10;
          for (; o10 >= 0 && o10 < s10; ) {
            if (rN(t10[o10])) return t10[o10];
            o10 += i10;
          }
        }
        translate() {
          this.generatePoints();
          let t10 = this.options, e10 = t10.stacking, i10 = this.xAxis, s10 = this.enabledDataSorting, o10 = this.yAxis, r10 = this.points, a10 = r10.length, n10 = this.pointPlacementToXValue(), h10 = !!n10, l2 = t10.threshold, d2 = t10.startFromThreshold ? l2 : 0, c2 = t10?.nullInteraction && o10.len, p2, g2, u2, f2, m2 = Number.MAX_VALUE;
          function x2(t11) {
            return rI(t11, -1e9, 1e9);
          }
          __name(x2, "x");
          for (p2 = 0; p2 < a10; p2++) {
            let t11, a11 = r10[p2], y2 = a11.x, b2, v2, k2 = a11.y, w2 = a11.low, M2 = e10 && o10.stacking?.stacks[(this.negStacks && k2 < (d2 ? 0 : l2) ? "-" : "") + this.stackKey];
            a11.plotX = rV(g2 = i10.translate(y2, false, false, false, true, n10)) ? rD(x2(g2)) : void 0, e10 && this.visible && M2 && M2[y2] && (f2 = this.getStackIndicator(f2, y2, this.index), !a11.isNull && f2.key && (v2 = (b2 = M2[y2]).points[f2.key]), b2 && r$(v2) && (w2 = v2[0], k2 = v2[1], w2 === d2 && f2.key === M2[y2].base && (w2 = rK(rV(l2) ? l2 : o10.min)), o10.positiveValuesOnly && rN(w2) && w2 <= 0 && (w2 = void 0), a11.total = a11.stackTotal = rK(b2.total), a11.percentage = rN(a11.y) && b2.total ? a11.y / b2.total * 100 : void 0, a11.stackY = k2, this.irregularWidths || b2.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis))), a11.yBottom = rN(w2) ? x2(o10.translate(w2, false, true, false, true)) : void 0, this.dataModify && (k2 = this.dataModify.modifyValue(k2, p2)), rV(k2) && void 0 !== a11.plotX ? t11 = rV(t11 = o10.translate(k2, false, true, false, true)) ? x2(t11) : void 0 : !rV(k2) && c2 && (t11 = c2), a11.plotY = t11, a11.isInside = this.isPointInside(a11), a11.clientX = h10 ? rD(i10.translate(y2, false, false, false, true, n10)) : g2, a11.negative = (a11.y || 0) < (l2 || 0), a11.isNull || false === a11.visible || (void 0 !== u2 && (m2 = Math.min(m2, Math.abs(g2 - u2))), u2 = g2), a11.zone = this.zones.length ? a11.getZone() : void 0, !a11.graphic && this.group && s10 && (a11.isNew = true);
          }
          this.closestPointRangePx = m2, rG(this, "afterTranslate");
        }
        getValidPoints(t10, e10, i10) {
          let s10 = this.chart;
          return (t10 || this.points || []).filter(function(t11) {
            let { plotX: o10, plotY: r10 } = t11;
            return (!!i10 || !t11.isNull && !!rV(r10)) && (!e10 || !!s10.isInsidePlot(o10, r10, { inverted: s10.inverted })) && false !== t11.visible;
          });
        }
        getSharedClipKey() {
          return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0), this.sharedClipKey;
        }
        setClip() {
          let { chart: t10, group: e10, markerGroup: i10 } = this, s10 = t10.sharedClips, o10 = t10.renderer, r10 = t10.getClipBox(this), a10 = this.getSharedClipKey(), n10 = s10[a10];
          n10 ? n10.animate(r10) : s10[a10] = n10 = o10.clipRect(r10), e10 && e10.clip(false === this.options.clip ? void 0 : n10), i10 && i10.clip();
        }
        animate(t10) {
          let { chart: e10, group: i10, markerGroup: s10 } = this, o10 = e10.inverted, r10 = rw(this.options.animation), a10 = [this.getSharedClipKey(), r10.duration, r10.easing, r10.defer].join(","), n10 = e10.sharedClips[a10], h10 = e10.sharedClips[a10 + "m"];
          if (t10 && i10) {
            let t11 = e10.getClipBox(this);
            if (n10) n10.attr("height", t11.height);
            else {
              t11.width = 0, o10 && (t11.x = e10.plotHeight), n10 = e10.renderer.clipRect(t11), e10.sharedClips[a10] = n10;
              let i11 = { x: -99, y: -99, width: o10 ? e10.plotWidth + 199 : 99, height: o10 ? 99 : e10.plotHeight + 199 };
              h10 = e10.renderer.clipRect(i11), e10.sharedClips[a10 + "m"] = h10;
            }
            i10.clip(n10), s10?.clip(h10);
          } else if (n10 && !n10.hasClass("highcharts-animating")) {
            let t11 = e10.getClipBox(this), i11 = r10.step;
            (s10?.element.childNodes.length || e10.series.length > 1) && (r10.step = function(t12, e11) {
              i11 && i11.apply(e11, arguments), "width" === e11.prop && h10?.element && h10.attr(o10 ? "height" : "width", t12 + 99);
            }), n10.addClass("highcharts-animating").animate(t11, r10);
          }
        }
        afterAnimate() {
          this.setClip(), rq(this.chart.sharedClips, (t10, e10, i10) => {
            t10 && !this.chart.container.querySelector(`[clip-path="url(#${t10.id})"]`) && (t10.destroy(), delete i10[e10]);
          }), this.finishedAnimating = true, rG(this, "afterAnimate");
        }
        drawPoints(t10 = this.points) {
          let e10, i10, s10, o10, r10, a10, n10, h10 = this.chart, l2 = h10.styledMode, { colorAxis: d2, options: c2 } = this, p2 = c2.marker, g2 = c2.nullInteraction, u2 = this[this.specialGroup || "markerGroup"], f2 = this.xAxis, m2 = rK(p2.enabled, !f2 || !!f2.isRadial || null, this.closestPointRangePx >= p2.enabledThreshold * p2.radius);
          if (false !== p2.enabled || this._hasPointMarkers) for (e10 = 0; e10 < t10.length; e10++) {
            o10 = (s10 = (i10 = t10[e10]).graphic) ? "animate" : "attr", r10 = i10.marker || {}, a10 = !!i10.marker;
            let c3 = i10.isNull;
            if ((m2 && !rN(r10.enabled) || r10.enabled) && (!c3 || g2) && false !== i10.visible) {
              let t11 = rK(r10.symbol, this.symbol, "rect");
              n10 = this.markerAttribs(i10, i10.selected && "select"), this.enabledDataSorting && (i10.startXPos = f2.reversed ? -(n10.width || 0) : f2.width);
              let e11 = false !== i10.isInside;
              if (!s10 && e11 && ((n10.width || 0) > 0 || i10.hasImage) && (i10.graphic = s10 = h10.renderer.symbol(t11, n10.x, n10.y, n10.width, n10.height, a10 ? r10 : p2).add(u2), this.enabledDataSorting && h10.hasRendered && (s10.attr({ x: i10.startXPos }), o10 = "animate")), s10 && "animate" === o10 && s10[e11 ? "show" : "hide"](e11).animate(n10), s10) {
                let t12 = this.pointAttribs(i10, l2 || !i10.selected ? void 0 : "select");
                l2 ? d2 && s10.css({ fill: t12.fill }) : s10[o10](t12);
              }
              s10 && s10.addClass(i10.getClassName(), true);
            } else s10 && (i10.graphic = s10.destroy());
          }
        }
        markerAttribs(t10, e10) {
          let i10 = this.options, s10 = i10.marker, o10 = t10.marker || {}, r10 = o10.symbol || s10.symbol, a10 = {}, n10, h10, l2 = rK(o10.radius, s10?.radius);
          e10 && (n10 = s10.states[e10], h10 = o10.states && o10.states[e10], l2 = rK(h10?.radius, n10?.radius, l2 && l2 + (n10?.radiusPlus || 0))), t10.hasImage = r10 && 0 === r10.indexOf("url"), t10.hasImage && (l2 = 0);
          let d2 = t10.pos();
          return rV(l2) && d2 && (i10.crisp && (d2[0] = rB(d2[0], t10.hasImage ? 0 : "rect" === r10 ? s10?.lineWidth || 0 : 1)), a10.x = d2[0] - l2, a10.y = d2[1] - l2), l2 && (a10.width = a10.height = 2 * l2), a10;
        }
        pointAttribs(t10, e10) {
          let i10 = this.options, s10 = i10.marker, o10 = t10?.options, r10 = o10?.marker || {}, a10 = o10?.color, n10 = t10?.color, h10 = t10?.zone?.color, l2, d2, c2 = this.color, p2, g2, u2 = rK(r10.lineWidth, s10.lineWidth), f2 = t10?.isNull && i10.nullInteraction ? 0 : 1;
          return c2 = a10 || h10 || n10 || c2, p2 = r10.fillColor || s10.fillColor || c2, g2 = r10.lineColor || s10.lineColor || c2, e10 = e10 || "normal", l2 = s10.states[e10] || {}, u2 = rK((d2 = r10.states && r10.states[e10] || {}).lineWidth, l2.lineWidth, u2 + rK(d2.lineWidthPlus, l2.lineWidthPlus, 0)), p2 = d2.fillColor || l2.fillColor || p2, g2 = d2.lineColor || l2.lineColor || g2, { stroke: g2, "stroke-width": u2, fill: p2, opacity: f2 = rK(d2.opacity, l2.opacity, f2) };
        }
        destroy(t10) {
          let e10, i10, s10 = this, o10 = s10.chart, r10 = /AppleWebKit\/533/.test(rA.navigator.userAgent), a10 = s10.data || [];
          for (rG(s10, "destroy", { keepEventsForUpdate: t10 }), this.removeEvents(t10), (s10.axisTypes || []).forEach(function(t11) {
            i10 = s10[t11], i10?.series && (rW(i10.series, s10), i10.isDirty = i10.forceRedraw = true);
          }), s10.legendItem && s10.chart.legend.destroyItem(s10), e10 = a10.length; e10--; ) a10[e10]?.destroy?.();
          for (let t11 of s10.zones) rz(t11, void 0, true);
          V.clearTimeout(s10.animationTimeout), rq(s10, function(t11, e11) {
            t11 instanceof eJ && !t11.survive && t11[r10 && "group" === e11 ? "hide" : "destroy"]();
          }), o10.hoverSeries === s10 && (o10.hoverSeries = void 0), rW(o10.series, s10), o10.orderItems("series"), rq(s10, function(e11, i11) {
            t10 && "hcEvents" === i11 || delete s10[i11];
          });
        }
        applyZones() {
          let { area: t10, chart: e10, graph: i10, zones: s10, points: o10, xAxis: r10, yAxis: a10, zoneAxis: n10 } = this, { inverted: h10, renderer: l2 } = e10, d2 = this[`${n10}Axis`], { isXAxis: c2, len: p2 = 0, minPointOffset: g2 = 0 } = d2 || {}, u2 = (i10?.strokeWidth() || 0) / 2 + 1, f2 = /* @__PURE__ */ __name((t11, e11 = 0, i11 = 0) => {
            h10 && (i11 = p2 - i11);
            let { translated: s11 = 0, lineClip: o11 } = t11, r11 = i11 - s11;
            o11?.push(["L", e11, Math.abs(r11) < u2 ? i11 - u2 * (r11 <= 0 ? -1 : 1) : s11]);
          }, "f");
          if (s10.length && (i10 || t10) && d2 && rV(d2.min)) {
            let e11 = d2.getExtremes().max + g2, u3 = /* @__PURE__ */ __name((t11) => {
              t11.forEach((e12, i11) => {
                ("M" === e12[0] || "L" === e12[0]) && (t11[i11] = [e12[0], c2 ? p2 - e12[1] : e12[1], c2 ? e12[2] : p2 - e12[2]]);
              });
            }, "u");
            if (s10.forEach((t11) => {
              t11.lineClip = [], t11.translated = rI(d2.toPixels(rK(t11.value, e11), true) || 0, 0, p2);
            }), i10 && !this.showLine && i10.hide(), t10 && t10.hide(), "y" === n10 && o10.length < r10.len) for (let t11 of o10) {
              let { plotX: e12, plotY: i11, zone: o11 } = t11, r11 = o11 && s10[s10.indexOf(o11) - 1];
              o11 && f2(o11, e12, i11), r11 && f2(r11, e12, i11);
            }
            let m2 = [], x2 = d2.toPixels(d2.getExtremes().min - g2, true);
            s10.forEach((e12) => {
              let s11 = e12.lineClip || [], o11 = Math.round(e12.translated || 0);
              r10.reversed && s11.reverse();
              let { clip: n11, simpleClip: d3 } = e12, p3 = 0, g3 = 0, f3 = r10.len, y2 = a10.len;
              c2 ? (p3 = o11, f3 = x2) : (g3 = o11, y2 = x2);
              let b2 = [["M", p3, g3], ["L", f3, g3], ["L", f3, y2], ["L", p3, y2], ["Z"]], v2 = [b2[0], ...s11, b2[1], b2[2], ...m2, b2[3], b2[4]];
              m2 = s11.reverse(), x2 = o11, h10 && (u3(v2), t10 && u3(b2)), n11 ? (n11.animate({ d: v2 }), d3?.animate({ d: b2 })) : (n11 = e12.clip = l2.path(v2), t10 && (d3 = e12.simpleClip = l2.path(b2))), i10 && e12.graph?.clip(n11), t10 && e12.area?.clip(d3);
            });
          } else this.visible && (i10 && i10.show(), t10 && t10.show());
        }
        plotGroup(t10, e10, i10, s10, o10) {
          let r10 = this[t10], a10 = !r10, n10 = { visibility: i10, zIndex: s10 || 0.1 };
          return rN(this.opacity) && !this.chart.styledMode && "inactive" !== this.state && (n10.opacity = this.opacity), r10 || (this[t10] = r10 = this.chart.renderer.g().add(o10)), r10.addClass("highcharts-" + e10 + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (rN(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (r10.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), true), r10.attr(n10)[a10 ? "attr" : "animate"](this.getPlotBox(e10)), r10;
        }
        getPlotBox(t10) {
          let e10 = this.xAxis, i10 = this.yAxis, s10 = this.chart, o10 = s10.inverted && !s10.polar && e10 && this.invertible && "series" === t10;
          s10.inverted && (e10 = i10, i10 = this.xAxis);
          let r10 = { scale: 1, translateX: e10 ? e10.left : s10.plotLeft, translateY: i10 ? i10.top : s10.plotTop, name: t10 };
          rG(this, "getPlotBox", r10);
          let { scale: a10, translateX: n10, translateY: h10 } = r10;
          return { translateX: n10, translateY: h10, rotation: 90 * !!o10, rotationOriginX: o10 ? a10 * (e10.len - i10.len) / 2 : 0, rotationOriginY: o10 ? a10 * (e10.len + i10.len) / 2 : 0, scaleX: o10 ? -a10 : a10, scaleY: a10 };
        }
        removeEvents(t10) {
          let { eventsToUnbind: e10 } = this;
          t10 || rJ(this), e10.length && (e10.forEach((t11) => {
            t11();
          }), e10.length = 0);
        }
        render() {
          let t10 = this, { chart: e10, options: i10, hasRendered: s10 } = t10, o10 = rw(i10.animation), r10 = t10.visible ? "inherit" : "hidden", a10 = i10.zIndex, n10 = e10.seriesGroup, h10 = t10.finishedAnimating ? 0 : o10.duration;
          rG(this, "render"), t10.plotGroup("group", "series", r10, a10, n10), t10.markerGroup = t10.plotGroup("markerGroup", "markers", r10, a10, n10), false !== i10.clip && t10.setClip(), h10 && t10.animate?.(true), t10.drawGraph && (t10.drawGraph(), t10.applyZones()), t10.visible && t10.drawPoints(), t10.drawDataLabels?.(), t10.redrawPoints?.(), i10.enableMouseTracking && t10.drawTracker?.(), h10 && t10.animate?.(), s10 || (h10 && o10.defer && (h10 += o10.defer), t10.animationTimeout = rQ(() => {
            t10.afterAnimate();
          }, h10 || 0)), t10.isDirty = false, t10.hasRendered = true, rG(t10, "afterRender");
        }
        redraw() {
          let t10 = this.isDirty || this.isDirtyData;
          this.translate(), this.render(), t10 && delete this.kdTree;
        }
        reserveSpace() {
          return this.visible || !this.chart.options.chart.ignoreHiddenSeries;
        }
        searchPoint(t10, e10) {
          let { xAxis: i10, yAxis: s10 } = this, o10 = this.chart.inverted;
          return this.searchKDTree({ clientX: o10 ? i10.len - t10.chartY + i10.pos : t10.chartX - i10.pos, plotY: o10 ? s10.len - t10.chartX + s10.pos : t10.chartY - s10.pos }, e10, t10);
        }
        buildKDTree(t10) {
          this.buildingKdTree = true;
          let e10 = this, i10 = e10.options, s10 = i10.findNearestPointBy.indexOf("y") > -1 ? 2 : 1;
          delete e10.kdTree, rQ(function() {
            e10.kdTree = (/* @__PURE__ */ __name(function t11(i11, s11, o10) {
              let r10, a10, n10 = i11?.length;
              if (n10) return r10 = e10.kdAxisArray[s11 % o10], i11.sort((t12, e11) => (t12[r10] || 0) - (e11[r10] || 0)), { point: i11[a10 = Math.floor(n10 / 2)], left: t11(i11.slice(0, a10), s11 + 1, o10), right: t11(i11.slice(a10 + 1), s11 + 1, o10) };
            }, "t"))(e10.getValidPoints(void 0, !e10.directTouch, i10?.nullInteraction), s10, s10), e10.buildingKdTree = false;
          }, i10.kdNow || t10?.type === "touchstart" ? 0 : 1);
        }
        searchKDTree(t10, e10, i10, s10, o10) {
          let r10 = this, [a10, n10] = this.kdAxisArray, h10 = e10 ? "distX" : "dist", l2 = (r10.options.findNearestPointBy || "").indexOf("y") > -1 ? 2 : 1, d2 = !!r10.isBubble, c2 = s10 || ((t11, e11, i11) => {
            let s11 = t11[i11] || 0, o11 = e11[i11] || 0;
            return [s11 === o11 && t11.index > e11.index || s11 < o11 ? t11 : e11, false];
          }), p2 = o10 || ((t11, e11) => t11 < e11);
          if (this.kdTree || this.buildingKdTree || this.buildKDTree(i10), this.kdTree) return (/* @__PURE__ */ __name(function t11(e11, i11, s11, o11) {
            let l3 = i11.point, g2 = r10.kdAxisArray[s11 % o11], u2 = l3, f2 = false;
            !(function(t12, e12) {
              let i12 = t12[a10], s12 = e12[a10], o12 = rN(i12) && rN(s12) ? i12 - s12 : null, r11 = t12[n10], h11 = e12[n10], l4 = rN(r11) && rN(h11) ? r11 - h11 : 0, c3 = d2 && e12.marker?.radius || 0;
              e12.dist = Math.sqrt((o12 && o12 * o12 || 0) + l4 * l4) - c3, e12.distX = rN(o12) ? Math.abs(o12) - c3 : Number.MAX_VALUE;
            })(e11, l3);
            let m2 = (e11[g2] || 0) - (l3[g2] || 0) + (d2 && l3.marker?.radius || 0), x2 = m2 < 0 ? "left" : "right", y2 = m2 < 0 ? "right" : "left";
            return i11[x2] && ([u2, f2] = c2(l3, t11(e11, i11[x2], s11 + 1, o11), h10)), i11[y2] && p2(Math.sqrt(m2 * m2), u2[h10], f2) && (u2 = c2(u2, t11(e11, i11[y2], s11 + 1, o11), h10)[0]), u2;
          }, "t"))(t10, this.kdTree, l2, l2);
        }
        pointPlacementToXValue() {
          let { options: t10, xAxis: e10 } = this, i10 = t10.pointPlacement;
          return "between" === i10 && (i10 = e10.reversed ? -0.5 : 0.5), rV(i10) ? i10 * (t10.pointRange || e10.pointRange) : 0;
        }
        isPointInside(t10) {
          let { chart: e10, xAxis: i10, yAxis: s10 } = this, { plotX: o10 = -1, plotY: r10 = -1 } = t10;
          return r10 >= 0 && r10 <= (s10 ? s10.len : e10.plotHeight) && o10 >= 0 && o10 <= (i10 ? i10.len : e10.plotWidth);
        }
        drawTracker() {
          let t10 = this, e10 = t10.options, i10 = e10.trackByArea, s10 = [].concat((i10 ? t10.areaPath : t10.graphPath) || []), o10 = t10.chart, r10 = o10.pointer, a10 = o10.renderer, n10 = o10.options.tooltip?.snap || 0, h10 = /* @__PURE__ */ __name(() => {
            e10.enableMouseTracking && o10.hoverSeries !== t10 && t10.onMouseOver();
          }, "h"), l2 = "rgba(192,192,192," + (rC ? 1e-4 : 2e-3) + ")", d2 = t10.tracker;
          d2 ? d2.attr({ d: s10 }) : t10.graph && (t10.tracker = d2 = a10.path(s10).attr({ visibility: t10.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(i10 ? "highcharts-tracker-area" : "highcharts-tracker-line").add(t10.group), o10.styledMode || d2.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: l2, fill: i10 ? l2 : "none", "stroke-width": t10.graph.strokeWidth() + (i10 ? 0 : 2 * n10) }), [t10.tracker, t10.markerGroup, t10.dataLabelsGroup].forEach((t11) => {
            t11 && (t11.addClass("highcharts-tracker").on("mouseover", h10).on("mouseout", (t12) => {
              r10?.onTrackerMouseOut(t12);
            }), e10.cursor && !o10.styledMode && t11.css({ cursor: e10.cursor }), t11.on("touchstart", h10));
          })), rG(this, "afterDrawTracker");
        }
        addPoint(t10, e10, i10, s10, o10) {
          let r10, a10, n10 = this.options, { chart: h10, data: l2, dataTable: d2, xAxis: c2 } = this, p2 = c2?.hasNames && c2.names, g2 = n10.data, u2 = this.getColumn("x");
          e10 = rK(e10, true);
          let f2 = { series: this };
          this.pointClass.prototype.applyOptions.apply(f2, [t10]);
          let m2 = f2.x;
          if (a10 = u2.length, this.requireSorting && m2 < u2[a10 - 1]) for (r10 = true; a10 && u2[a10 - 1] > m2; ) a10--;
          d2.setRow(f2, a10, true, { addColumns: false }), p2 && f2.name && (p2[m2] = f2.name), g2?.splice(a10, 0, t10), (r10 || this.processedData) && (this.data.splice(a10, 0, null), this.processData()), "point" === n10.legendType && this.generatePoints(), i10 && (l2[0] && l2[0].remove ? l2[0].remove(false) : ([l2, g2].filter(rN).forEach((t11) => {
            t11.shift();
          }), d2.deleteRows(0))), false !== o10 && rG(this, "addPoint", { point: f2 }), this.isDirty = true, this.isDirtyData = true, e10 && h10.redraw(s10);
        }
        removePoint(t10, e10, i10) {
          let s10 = this, { chart: o10, data: r10, points: a10, dataTable: n10 } = s10, h10 = r10[t10], l2 = /* @__PURE__ */ __name(function() {
            [a10?.length === r10.length ? a10 : void 0, r10, s10.options.data].filter(rN).forEach((e11) => {
              e11.splice(t10, 1);
            }), n10.deleteRows(t10), h10?.destroy(), s10.isDirty = true, s10.isDirtyData = true, e10 && o10.redraw();
          }, "l");
          rM(i10, o10), e10 = rK(e10, true), h10 ? h10.firePointEvent("remove", null, l2) : l2();
        }
        remove(t10, e10, i10, s10) {
          let o10 = this, r10 = o10.chart;
          function a10() {
            o10.destroy(s10), r10.isDirtyLegend = r10.isDirtyBox = true, r10.linkSeries(s10), rK(t10, true) && r10.redraw(e10);
          }
          __name(a10, "a");
          false !== i10 ? rG(o10, "remove", null, a10) : a10();
        }
        update(t10, e10) {
          rG(this, "update", { options: t10 = rR(t10, this.userOptions) });
          let i10 = this, s10 = i10.chart, o10 = i10.userOptions, r10 = i10.initialType || i10.type, a10 = s10.options.plotOptions, n10 = rP[r10].prototype, h10 = i10.finishedAnimating && { animation: false }, l2 = {}, d2, c2, p2 = _r0.keepProps.slice(), g2 = t10.type || o10.type || s10.options.chart.type, u2 = !(this.hasDerivedData || g2 && g2 !== this.type || void 0 !== t10.keys || void 0 !== t10.pointStart || void 0 !== t10.pointInterval || void 0 !== t10.relativeXValue || t10.joinBy || t10.mapData || ["dataGrouping", "pointStart", "pointInterval", "pointIntervalUnit", "keys"].some((t11) => i10.hasOptionChanged(t11)));
          g2 = g2 || r10, u2 ? (p2.push.apply(p2, _r0.keepPropsForPoints), false !== t10.visible && p2.push("area", "graph"), i10.parallelArrays.forEach(function(t11) {
            p2.push(t11 + "Data");
          }), t10.data && (t10.dataSorting && rX(i10.options.dataSorting, t10.dataSorting), this.setData(t10.data, false))) : this.dataTable.modified = this.dataTable, t10 = r_(o10, { index: void 0 === o10.index ? i10.index : o10.index, pointStart: a10?.series?.pointStart ?? o10.pointStart ?? i10.getColumn("x")[0] }, !u2 && { data: i10.options.data }, t10, h10), u2 && t10.data && (t10.data = i10.options.data), (p2 = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(p2)).forEach(function(t11) {
            p2[t11] = i10[t11], delete i10[t11];
          });
          let f2 = false;
          if (rP[g2]) {
            if (f2 = g2 !== i10.type, i10.remove(false, false, false, true), f2) if (s10.propFromSeries(), Object.setPrototypeOf) Object.setPrototypeOf(i10, rP[g2].prototype);
            else {
              let t11 = Object.hasOwnProperty.call(i10, "hcEvents") && i10.hcEvents;
              for (c2 in n10) i10[c2] = void 0;
              rX(i10, rP[g2].prototype), t11 ? i10.hcEvents = t11 : delete i10.hcEvents;
            }
          } else rH(17, true, s10, { missingModuleFor: g2 });
          if (p2.forEach(function(t11) {
            i10[t11] = p2[t11];
          }), i10.init(s10, t10), u2 && this.points) for (let t11 of (false === (d2 = i10.options).visible ? (l2.graphic = 1, l2.dataLabel = 1) : (this.hasMarkerChanged(d2, o10) && (l2.graphic = 1), i10.hasDataLabels?.() || (l2.dataLabel = 1)), this.points)) t11?.series && (t11.resolveColor(), Object.keys(l2).length && t11.destroyElements(l2), false === d2.showInLegend && t11.legendItem && s10.legend.destroyItem(t11));
          i10.initialType = r10, s10.linkSeries(), s10.setSortedData(), f2 && i10.linkedSeries.length && (i10.isDirtyData = true), rG(this, "afterUpdate"), rK(e10, true) && s10.redraw(!!u2 && void 0);
        }
        setName(t10) {
          this.name = this.options.name = this.userOptions.name = t10, this.chart.isDirtyLegend = true;
        }
        hasOptionChanged(t10) {
          let e10 = this.chart, i10 = this.options[t10], s10 = e10.options.plotOptions, o10 = this.userOptions[t10], r10 = rK(s10?.[this.type]?.[t10], s10?.series?.[t10]);
          return o10 && !rN(r10) ? i10 !== o10 : i10 !== rK(r10, i10);
        }
        onMouseOver() {
          let t10 = this.chart, e10 = t10.hoverSeries, i10 = t10.pointer;
          i10?.setHoverChartIndex(), e10 && e10 !== this && e10.onMouseOut(), this.options.events.mouseOver && rG(this, "mouseOver"), this.setState("hover"), t10.hoverSeries = this;
        }
        onMouseOut() {
          let t10 = this.options, e10 = this.chart, i10 = e10.tooltip, s10 = e10.hoverPoint;
          e10.hoverSeries = null, s10 && s10.onMouseOut(), this && t10.events.mouseOut && rG(this, "mouseOut"), i10 && !this.stickyTracking && (!i10.shared || this.noSharedTooltip) && i10.hide(), e10.series.forEach(function(t11) {
            t11.setState("", true);
          });
        }
        setState(t10, e10) {
          let i10 = this, s10 = i10.options, o10 = i10.graph, r10 = s10.inactiveOtherPoints, a10 = s10.states, n10 = rK(a10[t10 || "normal"] && a10[t10 || "normal"].animation, i10.chart.options.chart.animation), h10 = s10.lineWidth, l2 = s10.opacity;
          if (t10 = t10 || "", i10.state !== t10 && ([i10.group, i10.markerGroup, i10.dataLabelsGroup].forEach(function(e11) {
            e11 && (i10.state && e11.removeClass("highcharts-series-" + i10.state), t10 && e11.addClass("highcharts-series-" + t10));
          }), i10.state = t10, !i10.chart.styledMode)) {
            if (a10[t10] && false === a10[t10].enabled) return;
            if (t10 && (h10 = a10[t10].lineWidth || h10 + (a10[t10].lineWidthPlus || 0), l2 = rK(a10[t10].opacity, l2)), o10 && !o10.dashstyle && rV(h10)) for (let t11 of [o10, ...this.zones.map((t12) => t12.graph)]) t11?.animate({ "stroke-width": h10 }, n10);
            r10 || [i10.group, i10.markerGroup, i10.dataLabelsGroup, i10.labelBySeries].forEach(function(t11) {
              t11 && t11.animate({ opacity: l2 }, n10);
            });
          }
          e10 && r10 && i10.points && i10.setAllPointsToState(t10 || void 0);
        }
        setAllPointsToState(t10) {
          this.points.forEach(function(e10) {
            e10.setState && e10.setState(t10);
          });
        }
        setVisible(t10, e10) {
          let i10 = this, s10 = i10.chart, o10 = s10.options.chart.ignoreHiddenSeries, r10 = i10.visible;
          i10.visible = t10 = i10.options.visible = i10.userOptions.visible = void 0 === t10 ? !r10 : t10;
          let a10 = t10 ? "show" : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach((t11) => {
            i10[t11]?.[a10]();
          }), (s10.hoverSeries === i10 || s10.hoverPoint?.series === i10) && i10.onMouseOut(), i10.legendItem && s10.legend.colorizeItem(i10, t10), i10.isDirty = true, i10.options.stacking && s10.series.forEach((t11) => {
            t11.options.stacking && t11.visible && (t11.isDirty = true);
          }), i10.linkedSeries.forEach((e11) => {
            e11.setVisible(t10, false);
          }), o10 && (s10.isDirtyBox = true), rG(i10, a10), false !== e10 && s10.redraw();
        }
        show() {
          this.setVisible(true);
        }
        hide() {
          this.setVisible(false);
        }
        select(t10) {
          this.selected = t10 = this.options.selected = void 0 === t10 ? !this.selected : t10, this.checkbox && (this.checkbox.checked = t10), rG(this, t10 ? "select" : "unselect");
        }
        shouldShowTooltip(t10, e10, i10 = {}) {
          return i10.series = this, i10.visiblePlotOnly = true, this.chart.isInsidePlot(t10, e10, i10);
        }
        drawLegendSymbol(t10, e10) {
          rm[this.options.legendSymbol || "rectangle"]?.call(this, t10, e10);
        }
      };
      __name(_r0, "r0");
      let r0 = _r0;
      r0.defaultOptions = { lineWidth: 2, allowPointSelect: false, crisp: true, showCheckbox: false, animation: { duration: 1e3 }, enableMouseTracking: true, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: true }, hover: { animation: { duration: 150 }, enabled: true, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { animation: {}, align: "center", borderWidth: 0, defer: true, formatter: /* @__PURE__ */ __name(function() {
        let { numberFormatter: t10 } = this.series.chart;
        return "number" != typeof this.y ? "" : t10(this.y, -1);
      }, "formatter"), padding: 5, style: { fontSize: "0.7em", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: true, states: { normal: { animation: true }, hover: { animation: { duration: 150 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 150 }, opacity: 0.2 } }, stickyTracking: true, turboThreshold: 1e3, findNearestPointBy: "x" }, r0.types = rk.seriesTypes, r0.registerType = rk.registerSeriesType, r0.keepProps = ["colorIndex", "eventOptions", "navigatorSeries", "symbolIndex", "baseSeries"], r0.keepPropsForPoints = ["data", "isDirtyData", "isDirtyCanvas", "points", "dataTable", "processedData", "xIncrement", "cropped", "_hasPointMarkers", "hasDataLabels", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX", "transformGroups"], rX(r0.prototype, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, directTouch: false, invertible: true, isCartesian: true, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: oK, requireSorting: true, sorted: true }), rk.series = r0;
      let r1 = r0, { animObject: r2, setAnimation: r3 } = tU, { registerEventOptions: r5 } = si, { composed: r6, marginNames: r9 } = w, { distribute: r4 } = ey, { format: r8 } = ep, { addEvent: r7, createElement: at, css: ae, defined: ai, discardElement: as, find: ao, fireEvent: ar, isNumber: aa, merge: an, pick: ah, pushUnique: al, relativeLength: ad, stableSort: ac, syncTimeout: ap } = V;
      const _ag = class _ag {
        constructor(t10, e10) {
          this.allItems = [], this.initialItemY = 0, this.itemHeight = 0, this.itemMarginBottom = 0, this.itemMarginTop = 0, this.itemX = 0, this.itemY = 0, this.lastItemY = 0, this.lastLineHeight = 0, this.legendHeight = 0, this.legendWidth = 0, this.maxItemWidth = 0, this.maxLegendWidth = 0, this.offsetWidth = 0, this.padding = 0, this.pages = [], this.symbolHeight = 0, this.symbolWidth = 0, this.titleHeight = 0, this.totalItemWidth = 0, this.widthOption = 0, this.chart = t10, this.setOptions(e10), e10.enabled && (this.render(), r5(this, e10), r7(this.chart, "endResize", function() {
            this.legend.positionCheckboxes();
          })), r7(this.chart, "render", () => {
            this.options.enabled && this.proximate && (this.proximatePositions(), this.positionItems());
          });
        }
        setOptions(t10) {
          let e10 = ah(t10.padding, 8);
          this.options = t10, this.chart.styledMode || (this.itemStyle = t10.itemStyle, this.itemHiddenStyle = an(this.itemStyle, t10.itemHiddenStyle)), this.itemMarginTop = t10.itemMarginTop, this.itemMarginBottom = t10.itemMarginBottom, this.padding = e10, this.initialItemY = e10 - 5, this.symbolWidth = ah(t10.symbolWidth, 16), this.pages = [], this.proximate = "proximate" === t10.layout && !this.chart.inverted, this.baseline = void 0;
        }
        update(t10, e10) {
          let i10 = this.chart;
          this.setOptions(an(true, this.options, t10)), "events" in this.options && r5(this, this.options), this.destroy(), i10.isDirtyLegend = i10.isDirtyBox = true, ah(e10, true) && i10.redraw(), ar(this, "afterUpdate", { redraw: e10 });
        }
        colorizeItem(t10, e10) {
          let i10 = t10.color, { area: s10, group: o10, label: r10, line: a10, symbol: n10 } = t10.legendItem || {};
          if ((t10 instanceof r1 || t10 instanceof oK) && (t10.color = t10.options?.legendSymbolColor || i10), o10?.[e10 ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), !this.chart.styledMode) {
            let { itemHiddenStyle: i11 = {} } = this, o11 = i11.color, { fillColor: h10, fillOpacity: l2, lineColor: d2, marker: c2 } = t10.options, p2 = /* @__PURE__ */ __name((t11) => (!e10 && (t11.fill && (t11.fill = o11), t11.stroke && (t11.stroke = o11)), t11), "p");
            r10?.css(an(e10 ? this.itemStyle : i11)), a10?.attr(p2({ stroke: d2 || t10.color })), n10 && n10.attr(p2(c2 && n10.isMarker ? t10.pointAttribs() : { fill: t10.color })), s10?.attr(p2({ fill: h10 || t10.color, "fill-opacity": h10 ? 1 : l2 ?? 0.75 }));
          }
          t10.color = i10, ar(this, "afterColorizeItem", { item: t10, visible: e10 });
        }
        positionItems() {
          this.allItems.forEach(this.positionItem, this), this.chart.isResizing || this.positionCheckboxes();
        }
        positionItem(t10) {
          let { group: e10, x: i10 = 0, y: s10 = 0 } = t10.legendItem || {}, o10 = this.options, r10 = o10.symbolPadding, a10 = !o10.rtl, n10 = t10.checkbox;
          if (e10?.element) {
            let o11 = { translateX: a10 ? i10 : this.legendWidth - i10 - 2 * r10 - 4, translateY: s10 };
            e10[ai(e10.translateY) ? "animate" : "attr"](o11, void 0, () => {
              ar(this, "afterPositionItem", { item: t10 });
            });
          }
          n10 && (n10.x = i10, n10.y = s10);
        }
        destroyItem(t10) {
          let e10 = t10.legendItem || {};
          for (let t11 of ["group", "label", "line", "symbol"]) e10[t11] && (e10[t11] = e10[t11].destroy());
          t10.checkbox = as(t10.checkbox), t10.legendItem = void 0;
        }
        destroy() {
          for (let t10 of this.getAllItems()) this.destroyItem(t10);
          for (let t10 of ["clipRect", "up", "down", "pager", "nav", "box", "title", "group"]) this[t10] && (this[t10] = this[t10].destroy());
          this.display = null;
        }
        positionCheckboxes() {
          let t10, e10 = this.group?.alignAttr, i10 = this.clipHeight || this.legendHeight, s10 = this.titleHeight;
          e10 && (t10 = e10.translateY, this.allItems.forEach(function(o10) {
            let r10, a10 = o10.checkbox;
            a10 && (r10 = t10 + s10 + a10.y + (this.scrollOffset || 0) + 3, ae(a10, { left: e10.translateX + o10.checkboxOffset + a10.x - 20 + "px", top: r10 + "px", display: this.proximate || r10 > t10 - 6 && r10 < t10 + i10 - 6 ? "" : "none" }));
          }, this));
        }
        renderTitle() {
          let t10 = this.options, e10 = this.padding, i10 = t10.title, s10, o10 = 0;
          i10.text && (this.title || (this.title = this.chart.renderer.label(i10.text, e10 - 3, e10 - 4, void 0, void 0, void 0, t10.useHTML, void 0, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(i10.style), this.title.add(this.group)), i10.width || this.title.css({ width: this.maxLegendWidth + "px" }), o10 = (s10 = this.title.getBBox()).height, this.offsetWidth = s10.width, this.contentGroup.attr({ translateY: o10 })), this.titleHeight = o10;
        }
        setText(t10) {
          let e10 = this.options;
          t10.legendItem.label.attr({ text: e10.labelFormat ? r8(e10.labelFormat, t10, this.chart) : e10.labelFormatter.call(t10) });
        }
        renderItem(t10) {
          let e10 = t10.legendItem = t10.legendItem || {}, i10 = this.chart, s10 = i10.renderer, o10 = this.options, r10 = "horizontal" === o10.layout, a10 = this.symbolWidth, n10 = o10.symbolPadding || 0, h10 = this.itemStyle, l2 = this.itemHiddenStyle, d2 = r10 ? ah(o10.itemDistance, 20) : 0, c2 = !o10.rtl, p2 = !t10.series, g2 = !p2 && t10.series.drawLegendSymbol ? t10.series : t10, u2 = g2.options, f2 = !!this.createCheckboxForItem && u2 && u2.showCheckbox, m2 = o10.useHTML, x2 = t10.options.className, y2 = e10.label, b2 = a10 + n10 + d2 + 20 * !!f2;
          !y2 && (e10.group = s10.g("legend-item").addClass("highcharts-" + g2.type + "-series highcharts-color-" + t10.colorIndex + (x2 ? " " + x2 : "") + (p2 ? " highcharts-series-" + t10.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), e10.label = y2 = s10.text("", c2 ? a10 + n10 : -n10, this.baseline || 0, m2), i10.styledMode || y2.css(an(t10.visible ? h10 : l2)), y2.attr({ align: c2 ? "left" : "right", zIndex: 2 }).add(e10.group), !this.baseline && (this.fontMetrics = s10.fontMetrics(y2), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, y2.attr("y", this.baseline), this.symbolHeight = ah(o10.symbolHeight, this.fontMetrics.f), o10.squareSymbol && (this.symbolWidth = ah(o10.symbolWidth, Math.max(this.symbolHeight, 16)), b2 = this.symbolWidth + n10 + d2 + 20 * !!f2, c2 && y2.attr("x", this.symbolWidth + n10))), g2.drawLegendSymbol(this, t10), this.setItemEvents && this.setItemEvents(t10, y2, m2)), f2 && !t10.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(t10), this.colorizeItem(t10, t10.visible), (i10.styledMode || !h10.width) && y2.css({ width: (o10.itemWidth || this.widthOption || i10.spacingBox.width) - b2 + "px" }), this.setText(t10);
          let v2 = y2.getBBox(), k2 = this.fontMetrics?.h || 0;
          t10.itemWidth = t10.checkboxOffset = o10.itemWidth || e10.labelWidth || v2.width + b2, this.maxItemWidth = Math.max(this.maxItemWidth, t10.itemWidth), this.totalItemWidth += t10.itemWidth, this.itemHeight = t10.itemHeight = Math.round(e10.labelHeight || (v2.height > 1.5 * k2 ? v2.height : k2));
        }
        layoutItem(t10) {
          let e10 = this.options, i10 = this.padding, s10 = "horizontal" === e10.layout, o10 = t10.itemHeight, r10 = this.itemMarginBottom, a10 = this.itemMarginTop, n10 = s10 ? ah(e10.itemDistance, 20) : 0, h10 = this.maxLegendWidth, l2 = e10.alignColumns && this.totalItemWidth > h10 ? this.maxItemWidth : t10.itemWidth, d2 = t10.legendItem || {};
          s10 && this.itemX - i10 + l2 > h10 && (this.itemX = i10, this.lastLineHeight && (this.itemY += a10 + this.lastLineHeight + r10), this.lastLineHeight = 0), this.lastItemY = a10 + this.itemY + r10, this.lastLineHeight = Math.max(o10, this.lastLineHeight), d2.x = this.itemX, d2.y = this.itemY, s10 ? this.itemX += l2 : (this.itemY += a10 + o10 + r10, this.lastLineHeight = o10), this.offsetWidth = this.widthOption || Math.max((s10 ? this.itemX - i10 - (t10.checkbox ? 0 : n10) : l2) + i10, this.offsetWidth);
        }
        getAllItems() {
          let t10 = [];
          return this.chart.series.forEach(function(e10) {
            let i10 = e10?.options;
            e10 && ah(i10.showInLegend, !ai(i10.linkedTo) && void 0, true) && (t10 = t10.concat(e10.legendItem?.labels || ("point" === i10.legendType ? e10.data : e10)));
          }), ar(this, "afterGetAllItems", { allItems: t10 }), t10;
        }
        getAlignment() {
          let t10 = this.options;
          return this.proximate ? t10.align.charAt(0) + "tv" : t10.floating ? "" : t10.align.charAt(0) + t10.verticalAlign.charAt(0) + t10.layout.charAt(0);
        }
        adjustMargins(t10, e10) {
          let i10 = this.chart, s10 = this.options, o10 = this.getAlignment();
          o10 && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach((r10, a10) => {
            r10.test(o10) && !ai(t10[a10]) && (i10[r9[a10]] = Math.max(i10[r9[a10]], i10.legend[(a10 + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][a10] * s10[a10 % 2 ? "x" : "y"] + (s10.margin ?? 12) + e10[a10] + (i10.titleOffset[a10] || 0)));
          });
        }
        proximatePositions() {
          let t10, e10 = this.chart, i10 = [], s10 = "left" === this.options.align;
          for (let o10 of (this.allItems.forEach(function(t11) {
            let o11, r10, a10 = s10, n10, h10;
            t11.yAxis && (t11.xAxis.options.reversed && (a10 = !a10), t11.points && (o11 = ao(a10 ? t11.points : t11.points.slice(0).reverse(), function(t12) {
              return aa(t12.plotY);
            })), r10 = this.itemMarginTop + t11.legendItem.label.getBBox().height + this.itemMarginBottom, h10 = t11.yAxis.top - e10.plotTop, n10 = t11.visible ? (o11 ? o11.plotY : t11.yAxis.height) + (h10 - 0.3 * r10) : h10 + t11.yAxis.height, i10.push({ target: n10, size: r10, item: t11 }));
          }, this), r4(i10, e10.plotHeight))) t10 = o10.item.legendItem || {}, aa(o10.pos) && (t10.y = e10.plotTop - e10.spacing[0] + o10.pos);
        }
        render() {
          let t10 = this.chart, e10 = t10.renderer, i10 = this.options, s10 = this.padding, o10 = this.getAllItems(), r10, a10, n10, h10 = this.group, l2, d2 = this.box;
          this.itemX = s10, this.itemY = this.initialItemY, this.offsetWidth = 0, this.lastItemY = 0, this.widthOption = ad(i10.width, t10.spacingBox.width - s10), l2 = t10.spacingBox.width - 2 * s10 - i10.x, ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) > -1 && (l2 /= 2), this.maxLegendWidth = this.widthOption || l2, h10 || (this.group = h10 = e10.g("legend").addClass(i10.className || "").attr({ zIndex: 7 }).add(), this.contentGroup = e10.g().attr({ zIndex: 1 }).add(h10), this.scrollGroup = e10.g().add(this.contentGroup)), this.renderTitle(), ac(o10, (t11, e11) => (t11.options?.legendIndex || 0) - (e11.options?.legendIndex || 0)), i10.reversed && o10.reverse(), this.allItems = o10, this.display = r10 = !!o10.length, this.lastLineHeight = 0, this.maxItemWidth = 0, this.totalItemWidth = 0, this.itemHeight = 0, o10.forEach(this.renderItem, this), o10.forEach(this.layoutItem, this), a10 = (this.widthOption || this.offsetWidth) + s10, n10 = this.lastItemY + this.lastLineHeight + this.titleHeight, n10 = this.handleOverflow(n10) + s10, d2 || (this.box = d2 = e10.rect().addClass("highcharts-legend-box").attr({ r: i10.borderRadius }).add(h10)), t10.styledMode || d2.attr({ stroke: i10.borderColor, "stroke-width": i10.borderWidth || 0, fill: i10.backgroundColor || "none" }).shadow(i10.shadow), a10 > 0 && n10 > 0 && d2[d2.placed ? "animate" : "attr"](d2.crisp.call({}, { x: 0, y: 0, width: a10, height: n10 }, d2.strokeWidth())), h10[r10 ? "show" : "hide"](), t10.styledMode && "none" === h10.getStyle("display") && (a10 = n10 = 0), this.legendWidth = a10, this.legendHeight = n10, r10 && this.align(), this.proximate || this.positionItems(), ar(this, "afterRender");
        }
        align(t10 = this.chart.spacingBox) {
          let e10 = this.chart, i10 = this.options, s10 = t10.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && e10.titleOffset[0] > 0 ? s10 += e10.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && e10.titleOffset[2] > 0 && (s10 -= e10.titleOffset[2]), s10 !== t10.y && (t10 = an(t10, { y: s10 })), e10.hasRendered || (this.group.placed = false), this.group.align(an(i10, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : i10.verticalAlign }), true, t10);
        }
        handleOverflow(t10) {
          let e10 = this, i10 = this.chart, s10 = i10.renderer, o10 = this.options, r10 = o10.y, a10 = "top" === o10.verticalAlign, n10 = this.padding, h10 = o10.maxHeight, l2 = o10.navigation, d2 = ah(l2.animation, true), c2 = l2.arrowSize || 12, p2 = this.pages, g2 = this.allItems, u2 = /* @__PURE__ */ __name(function(t11) {
            "number" == typeof t11 ? w2.attr({ height: t11 }) : w2 && (e10.clipRect = w2.destroy(), e10.contentGroup.clip()), e10.contentGroup.div && (e10.contentGroup.div.style.clip = t11 ? "rect(" + n10 + "px,9999px," + (n10 + t11) + "px,0)" : "auto");
          }, "u"), f2 = /* @__PURE__ */ __name(function(t11) {
            return e10[t11] = s10.circle(0, 0, 1.3 * c2).translate(c2 / 2, c2 / 2).add(k2), i10.styledMode || e10[t11].attr("fill", "rgba(0,0,0,0.0001)"), e10[t11];
          }, "f"), m2, x2, y2, b2, v2 = i10.spacingBox.height + (a10 ? -r10 : r10) - n10, k2 = this.nav, w2 = this.clipRect;
          return "horizontal" !== o10.layout || "middle" === o10.verticalAlign || o10.floating || (v2 /= 2), h10 && (v2 = Math.min(v2, h10)), p2.length = 0, t10 && v2 > 0 && t10 > v2 && false !== l2.enabled ? (this.clipHeight = m2 = Math.max(v2 - 20 - this.titleHeight - n10, 0), this.currentPage = ah(this.currentPage, 1), this.fullHeight = t10, g2.forEach((t11, e11) => {
            let i11 = (y2 = t11.legendItem || {}).y || 0, s11 = Math.round(y2.label.getBBox().height), o11 = p2.length;
            (!o11 || i11 - p2[o11 - 1] > m2 && (x2 || i11) !== p2[o11 - 1]) && (p2.push(x2 || i11), o11++), y2.pageIx = o11 - 1, x2 && b2 && (b2.pageIx = o11 - 1), e11 === g2.length - 1 && i11 + s11 - p2[o11 - 1] > m2 && i11 > p2[o11 - 1] && (p2.push(i11), y2.pageIx = o11), i11 !== x2 && (x2 = i11), b2 = y2;
          }), w2 || (w2 = e10.clipRect = s10.clipRect(0, n10 - 2, 9999, 0), e10.contentGroup.clip(w2)), u2(m2), k2 || (this.nav = k2 = s10.g().attr({ zIndex: 1 }).add(this.group), this.up = s10.symbol("triangle", 0, 0, c2, c2).add(k2), f2("upTracker").on("click", function() {
            e10.scroll(-1, d2);
          }), this.pager = s10.text("", 15, 10).addClass("highcharts-legend-navigation"), !i10.styledMode && l2.style && this.pager.css(l2.style), this.pager.add(k2), this.down = s10.symbol("triangle-down", 0, 0, c2, c2).add(k2), f2("downTracker").on("click", function() {
            e10.scroll(1, d2);
          })), e10.scroll(0), t10 = v2) : k2 && (u2(), this.nav = k2.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0), t10;
        }
        scroll(t10, e10) {
          let i10 = this.chart, s10 = this.pages, o10 = s10.length, r10 = this.clipHeight, a10 = this.options.navigation, n10 = this.pager, h10 = this.padding, l2 = this.currentPage + t10;
          l2 > o10 && (l2 = o10), l2 > 0 && (void 0 !== e10 && r3(e10, i10), this.nav.attr({ translateX: h10, translateY: r10 + this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function(t11) {
            t11.attr({ class: 1 === l2 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }), n10.attr({ text: l2 + "/" + o10 }), [this.down, this.downTracker].forEach(function(t11) {
            t11.attr({ x: 18 + this.pager.getBBox().width, class: l2 === o10 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
          }, this), i10.styledMode || (this.up.attr({ fill: 1 === l2 ? a10.inactiveColor : a10.activeColor }), this.upTracker.css({ cursor: 1 === l2 ? "default" : "pointer" }), this.down.attr({ fill: l2 === o10 ? a10.inactiveColor : a10.activeColor }), this.downTracker.css({ cursor: l2 === o10 ? "default" : "pointer" })), this.scrollOffset = -s10[l2 - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = l2, this.positionCheckboxes(), ap(() => {
            ar(this, "afterScroll", { currentPage: l2 });
          }, r2(ah(e10, i10.renderer.globalAnimation, true)).duration));
        }
        setItemEvents(t10, e10, i10) {
          let s10 = this, o10 = t10.legendItem || {}, r10 = s10.chart.renderer.boxWrapper, a10 = t10 instanceof oK, n10 = t10 instanceof r1, h10 = "highcharts-legend-" + (a10 ? "point" : "series") + "-active", l2 = s10.chart.styledMode, d2 = i10 ? [e10, o10.symbol] : [o10.group], c2 = /* @__PURE__ */ __name((e11) => {
            s10.allItems.forEach((i11) => {
              t10 !== i11 && [i11].concat(i11.linkedSeries || []).forEach((t11) => {
                t11.setState(e11, !a10);
              });
            });
          }, "c");
          for (let i11 of d2) i11 && i11.on("mouseover", function() {
            t10.visible && c2("inactive"), t10.setState("hover"), t10.visible && r10.addClass(h10), l2 || e10.css(s10.options.itemHoverStyle);
          }).on("mouseout", function() {
            s10.chart.styledMode || e10.css(an(t10.visible ? s10.itemStyle : s10.itemHiddenStyle)), c2(""), r10.removeClass(h10), t10.setState();
          }).on("click", function(e11) {
            let i12 = /* @__PURE__ */ __name(function() {
              t10.setVisible && t10.setVisible(), c2(t10.visible ? "inactive" : "");
            }, "i");
            r10.removeClass(h10), ar(s10, "itemClick", { browserEvent: e11, legendItem: t10 }, i12), a10 ? t10.firePointEvent("legendItemClick", { browserEvent: e11 }) : n10 && ar(t10, "legendItemClick", { browserEvent: e11 });
          });
        }
        createCheckboxForItem(t10) {
          t10.checkbox = at("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: t10.selected, defaultChecked: t10.selected }, this.options.itemCheckboxStyle, this.chart.container), r7(t10.checkbox, "click", function(e10) {
            let i10 = e10.target;
            ar(t10.series || t10, "checkboxClick", { checked: i10.checked, item: t10 }, function() {
              t10.select();
            });
          });
        }
      };
      __name(_ag, "ag");
      let ag = _ag;
      !(function(t10) {
        t10.compose = function(e10) {
          al(r6, "Core.Legend") && r7(e10, "beforeMargins", function() {
            this.legend = new t10(this, this.options.legend);
          });
        };
      })(ag || (ag = {}));
      let au = ag, { animate: af, animObject: am, setAnimation: ax } = tU, { defaultOptions: ay } = tv, { numberFormat: ab } = ep, { registerEventOptions: av } = si, { charts: ak, doc: aw, marginNames: aM, svg: aS, win: aT } = w, { seriesTypes: aC } = rk, { addEvent: aA, attr: aP, createElement: aL, css: aO, defined: aE, diffObjects: aI, discardElement: aD, erase: aB, error: aN, extend: az, find: aR, fireEvent: aW, getAlignFactor: aH, getStyle: aX, isArray: aF, isNumber: aG, isObject: aj, isString: aY, merge: aU, objectEach: a$, pick: aV, pInt: aZ, relativeLength: a_, removeEvent: aq, splat: aK, syncTimeout: aJ, uniqueKey: aQ } = V;
      const _a0 = class _a0 {
        static chart(t10, e10, i10) {
          return new _a0(t10, e10, i10);
        }
        constructor(t10, e10, i10) {
          this.sharedClips = {};
          let s10 = [...arguments];
          (aY(t10) || t10.nodeName) && (this.renderTo = s10.shift()), this.init(s10[0], s10[1]);
        }
        setZoomOptions() {
          let t10 = this.options.chart, e10 = t10.zooming;
          this.zooming = __spreadProps(__spreadValues({}, e10), { type: aV(t10.zoomType, e10.type), key: aV(t10.zoomKey, e10.key), pinchType: aV(t10.pinchType, e10.pinchType), singleTouch: aV(t10.zoomBySingleTouch, e10.singleTouch, false), resetButton: aU(e10.resetButton, t10.resetZoomButton) });
        }
        init(t10, e10) {
          aW(this, "init", { args: arguments }, function() {
            let i10 = aU(ay, t10), s10 = i10.chart, o10 = this.renderTo || s10.renderTo;
            this.userOptions = az({}, t10), (this.renderTo = aY(o10) ? aw.getElementById(o10) : o10) || aN(13, true, this), this.margin = [], this.spacing = [], this.labelCollectors = [], this.callback = e10, this.isResizing = 0, this.options = i10, this.axes = [], this.series = [], this.locale = i10.lang.locale ?? this.renderTo.closest("[lang]")?.lang, this.time = new tu(az(i10.time || {}, { locale: this.locale }), i10.lang), i10.time = this.time.options, this.numberFormatter = (s10.numberFormatter || ab).bind(this), this.styledMode = s10.styledMode, this.hasCartesianSeries = s10.showAxes, this.index = ak.length, ak.push(this), w.chartCount++, av(this, s10), this.xAxis = [], this.yAxis = [], this.pointCount = this.colorCounter = this.symbolCounter = 0, this.setZoomOptions(), aW(this, "afterInit"), this.firstRender();
          });
        }
        initSeries(t10) {
          let e10 = this.options.chart, i10 = t10.type || e10.type, s10 = aC[i10];
          s10 || aN(17, true, this, { missingModuleFor: i10 });
          let o10 = new s10();
          return "function" == typeof o10.init && o10.init(this, t10), o10;
        }
        setSortedData() {
          this.getSeriesOrderByLinks().forEach(function(t10) {
            t10.points || t10.data || !t10.enabledDataSorting || t10.setData(t10.options.data, false);
          });
        }
        getSeriesOrderByLinks() {
          return this.series.concat().sort(function(t10, e10) {
            return t10.linkedSeries.length || e10.linkedSeries.length ? e10.linkedSeries.length - t10.linkedSeries.length : 0;
          });
        }
        orderItems(t10, e10 = 0) {
          let i10 = this[t10], s10 = this.options[t10] = aK(this.options[t10]).slice(), o10 = this.userOptions[t10] = this.userOptions[t10] ? aK(this.userOptions[t10]).slice() : [];
          if (this.hasRendered && (s10.splice(e10), o10.splice(e10)), i10) for (let t11 = e10, r10 = i10.length; t11 < r10; ++t11) {
            let e11 = i10[t11];
            e11 && (e11.index = t11, e11 instanceof r1 && (e11.name = e11.getName()), e11.options.isInternal || (s10[t11] = e11.options, o10[t11] = e11.userOptions));
          }
        }
        getClipBox(t10, e10) {
          let i10 = this.inverted, { xAxis: s10, yAxis: o10 } = t10 || {}, { x: r10, y: a10, width: n10, height: h10 } = aU(this.clipBox);
          return t10 && (s10 && s10.len !== this.plotSizeX && (n10 = s10.len), o10 && o10.len !== this.plotSizeY && (h10 = o10.len), i10 && !t10.invertible && ([n10, h10] = [h10, n10])), e10 && (r10 += (i10 ? o10 : s10)?.pos ?? this.plotLeft, a10 += (i10 ? s10 : o10)?.pos ?? this.plotTop), { x: r10, y: a10, width: n10, height: h10 };
        }
        isInsidePlot(t10, e10, i10 = {}) {
          let { inverted: s10, plotBox: o10, plotLeft: r10, plotTop: a10, scrollablePlotBox: n10 } = this, { scrollLeft: h10 = 0, scrollTop: l2 = 0 } = i10.visiblePlotOnly && this.scrollablePlotArea?.scrollingContainer || {}, d2 = i10.series, c2 = i10.visiblePlotOnly && n10 || o10, p2 = i10.inverted ? e10 : t10, g2 = i10.inverted ? t10 : e10, u2 = { x: p2, y: g2, isInsidePlot: true, options: i10 };
          if (!i10.ignoreX) {
            let t11 = d2 && (s10 && !this.polar ? d2.yAxis : d2.xAxis) || { pos: r10, len: 1 / 0 }, e11 = i10.paneCoordinates ? t11.pos + p2 : r10 + p2;
            e11 >= Math.max(h10 + r10, t11.pos) && e11 <= Math.min(h10 + r10 + c2.width, t11.pos + t11.len) || (u2.isInsidePlot = false);
          }
          if (!i10.ignoreY && u2.isInsidePlot) {
            let t11 = !s10 && i10.axis && !i10.axis.isXAxis && i10.axis || d2 && (s10 ? d2.xAxis : d2.yAxis) || { pos: a10, len: 1 / 0 }, e11 = i10.paneCoordinates ? t11.pos + g2 : a10 + g2;
            e11 >= Math.max(l2 + a10, t11.pos) && e11 <= Math.min(l2 + a10 + c2.height, t11.pos + t11.len) || (u2.isInsidePlot = false);
          }
          return aW(this, "afterIsInsidePlot", u2), u2.isInsidePlot;
        }
        redraw(t10) {
          aW(this, "beforeRedraw");
          let e10 = this.hasCartesianSeries ? this.axes : this.colorAxis || [], i10 = this.series, s10 = this.pointer, o10 = this.legend, r10 = this.userOptions.legend, a10 = this.renderer, n10 = a10.isHidden(), h10 = [], l2, d2, c2, p2 = this.isDirtyBox, g2 = this.isDirtyLegend, u2;
          for (a10.rootFontSize = a10.boxWrapper.getStyle("font-size"), this.setResponsive && this.setResponsive(false), ax(!!this.hasRendered && t10, this), n10 && this.temporaryDisplay(), this.layOutTitles(false), c2 = i10.length; c2--; ) if (((u2 = i10[c2]).options.stacking || u2.options.centerInCategory) && (d2 = true, u2.isDirty)) {
            l2 = true;
            break;
          }
          if (l2) for (c2 = i10.length; c2--; ) (u2 = i10[c2]).options.stacking && (u2.isDirty = true);
          i10.forEach(function(t11) {
            t11.isDirty && ("point" === t11.options.legendType ? ("function" == typeof t11.updateTotals && t11.updateTotals(), g2 = true) : r10 && (r10.labelFormatter || r10.labelFormat) && (g2 = true)), t11.isDirtyData && aW(t11, "updatedData");
          }), g2 && o10 && o10.options.enabled && (o10.render(), this.isDirtyLegend = false), d2 && this.getStacks(), e10.forEach(function(t11) {
            t11.updateNames(), t11.setScale();
          }), this.getMargins(), e10.forEach(function(t11) {
            t11.isDirty && (p2 = true);
          }), e10.forEach(function(t11) {
            let e11 = t11.min + "," + t11.max;
            t11.extKey !== e11 && (t11.extKey = e11, h10.push(function() {
              aW(t11, "afterSetExtremes", az(t11.eventArgs, t11.getExtremes())), delete t11.eventArgs;
            })), (p2 || d2) && t11.redraw();
          }), p2 && this.drawChartBox(), aW(this, "predraw"), i10.forEach(function(t11) {
            (p2 || t11.isDirty) && t11.visible && t11.redraw(), t11.isDirtyData = false;
          }), s10 && s10.reset(true), a10.draw(), aW(this, "redraw"), aW(this, "render"), n10 && this.temporaryDisplay(true), h10.forEach(function(t11) {
            t11.call();
          });
        }
        get(t10) {
          let e10 = this.series;
          function i10(e11) {
            return e11.id === t10 || e11.options && e11.options.id === t10;
          }
          __name(i10, "i");
          let s10 = aR(this.axes, i10) || aR(this.series, i10);
          for (let t11 = 0; !s10 && t11 < e10.length; t11++) s10 = aR(e10[t11].points || [], i10);
          return s10;
        }
        createAxes() {
          let t10 = this.userOptions;
          for (let e10 of (aW(this, "createAxes"), ["xAxis", "yAxis"])) for (let i10 of t10[e10] = aK(t10[e10] || {})) new s$(this, i10, e10);
          aW(this, "afterCreateAxes");
        }
        getSelectedPoints() {
          return this.series.reduce((t10, e10) => (e10.getPointsCollection().forEach((e11) => {
            aV(e11.selectedStaging, e11.selected) && t10.push(e11);
          }), t10), []);
        }
        getSelectedSeries() {
          return this.series.filter((t10) => t10.selected);
        }
        setTitle(t10, e10, i10) {
          this.applyDescription("title", t10), this.applyDescription("subtitle", e10), this.applyDescription("caption", void 0), this.layOutTitles(i10);
        }
        applyDescription(t10, e10) {
          let i10 = this, s10 = this.options[t10] = aU(this.options[t10], e10), o10 = this[t10];
          o10 && e10 && (this[t10] = o10 = o10.destroy()), s10 && !o10 && ((o10 = this.renderer.text(s10.text, 0, 0, s10.useHTML).attr({ align: s10.align, class: "highcharts-" + t10, zIndex: s10.zIndex || 4 }).css({ textOverflow: "ellipsis", whiteSpace: "nowrap" }).add()).update = function(e11, s11) {
            i10.applyDescription(t10, e11), i10.layOutTitles(s11);
          }, this.styledMode || o10.css(az("title" === t10 ? { fontSize: this.options.isStock ? "1em" : "1.2em" } : {}, s10.style)), o10.textPxLength = o10.getBBox().width, o10.css({ whiteSpace: s10.style?.whiteSpace }), this[t10] = o10);
        }
        layOutTitles(t10 = true) {
          let e10 = [0, 0, 0], { options: i10, renderer: s10, spacingBox: o10 } = this;
          ["title", "subtitle", "caption"].forEach((t11) => {
            let i11 = this[t11], r11 = this.options[t11], a10 = aU(o10), n10 = i11?.textPxLength || 0;
            if (i11 && r11) {
              aW(this, "layOutTitle", { alignTo: a10, key: t11, textPxLength: n10 });
              let o11 = s10.fontMetrics(i11), h10 = o11.b, l2 = o11.h, d2 = r11.verticalAlign || "top", c2 = "top" === d2, p2 = c2 && r11.minScale || 1, g2 = "title" === t11 ? c2 ? -3 : 0 : c2 ? e10[0] + 2 : 0, u2 = Math.min(a10.width / n10, 1), f2 = Math.max(p2, u2), m2 = aU({ y: "bottom" === d2 ? h10 : g2 + h10 }, { align: "title" === t11 ? u2 < p2 ? "left" : "center" : this.title?.alignValue }, r11), x2 = (r11.width || (u2 > p2 ? this.chartWidth : a10.width) / f2) + "px";
              i11.alignValue !== m2.align && (i11.placed = false);
              let y2 = Math.round(i11.css({ width: x2 }).getBBox(r11.useHTML).height);
              if (m2.height = y2, i11.align(m2, false, a10).attr({ align: m2.align, scaleX: f2, scaleY: f2, "transform-origin": `${a10.x + n10 * f2 * aH(m2.align)} ${l2}` }), !r11.floating) {
                let t12 = y2 * (y2 < 1.2 * l2 ? 1 : f2);
                "top" === d2 ? e10[0] = Math.ceil(e10[0] + t12) : "bottom" === d2 && (e10[2] = Math.ceil(e10[2] + t12));
              }
            }
          }, this), e10[0] && "top" === (i10.title?.verticalAlign || "top") && (e10[0] += i10.title?.margin || 0), e10[2] && i10.caption?.verticalAlign === "bottom" && (e10[2] += i10.caption?.margin || 0);
          let r10 = !this.titleOffset || this.titleOffset.join(",") !== e10.join(",");
          this.titleOffset = e10, aW(this, "afterLayOutTitles"), !this.isDirtyBox && r10 && (this.isDirtyBox = this.isDirtyLegend = r10, this.hasRendered && t10 && this.isDirtyBox && this.redraw());
        }
        getContainerBox() {
          let t10 = [].map.call(this.renderTo.children, (t11) => {
            if (t11 !== this.container) {
              let e11 = t11.style.display;
              return t11.style.display = "none", [t11, e11];
            }
          }), e10 = { width: aX(this.renderTo, "width", true) || 0, height: aX(this.renderTo, "height", true) || 0 };
          return t10.filter(Boolean).forEach(([t11, e11]) => {
            t11.style.display = e11;
          }), e10;
        }
        getChartSize() {
          let t10 = this.options.chart, e10 = t10.width, i10 = t10.height, s10 = this.getContainerBox(), o10 = s10.height <= 1 || !this.renderTo.parentElement?.style.height && "100%" === this.renderTo.style.height;
          this.chartWidth = Math.max(0, e10 || s10.width || 600), this.chartHeight = Math.max(0, a_(i10, this.chartWidth) || (o10 ? 400 : s10.height)), this.containerBox = s10;
        }
        temporaryDisplay(t10) {
          let e10 = this.renderTo, i10;
          if (t10) for (; e10?.style; ) e10.hcOrigStyle && (aO(e10, e10.hcOrigStyle), delete e10.hcOrigStyle), e10.hcOrigDetached && (aw.body.removeChild(e10), e10.hcOrigDetached = false), e10 = e10.parentNode;
          else for (; e10?.style && (aw.body.contains(e10) || e10.parentNode || (e10.hcOrigDetached = true, aw.body.appendChild(e10)), ("none" === aX(e10, "display", false) || e10.hcOricDetached) && (e10.hcOrigStyle = { display: e10.style.display, height: e10.style.height, overflow: e10.style.overflow }, i10 = { display: "block", overflow: "hidden" }, e10 !== this.renderTo && (i10.height = 0), aO(e10, i10), e10.offsetWidth || e10.style.setProperty("display", "block", "important")), (e10 = e10.parentNode) !== aw.body); ) ;
        }
        setClassName(t10) {
          this.container.className = "highcharts-container " + (t10 || "");
        }
        getContainer() {
          let t10, e10 = this.options, i10 = e10.chart, s10 = "data-highcharts-chart", o10 = aQ(), r10 = this.renderTo, a10 = aZ(aP(r10, s10));
          aG(a10) && ak[a10] && ak[a10].hasRendered && ak[a10].destroy(), aP(r10, s10, this.index), r10.innerHTML = t6.emptyHTML, i10.skipClone || r10.offsetWidth || this.temporaryDisplay(), this.getChartSize();
          let n10 = this.chartHeight, h10 = this.chartWidth;
          aO(r10, { overflow: "hidden" }), this.styledMode || (t10 = az({ position: "relative", overflow: "hidden", width: h10 + "px", height: n10 + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none", "touch-action": "manipulation", outline: "none", padding: "0px" }, i10.style || {}));
          let l2 = aL("div", { id: o10 }, t10, r10);
          this.container = l2, this.getChartSize(), h10 !== this.chartWidth && (h10 = this.chartWidth, this.styledMode || aO(l2, { width: aV(i10.style?.width, h10 + "px") })), this.containerBox = this.getContainerBox(), this._cursor = l2.style.cursor;
          let d2 = i10.renderer || !aS ? eg.getRendererType(i10.renderer) : iU;
          if (this.renderer = new d2(l2, h10, n10, void 0, i10.forExport, e10.exporting?.allowHTML, this.styledMode), ax(void 0, this), this.setClassName(i10.className), this.styledMode) for (let t11 in e10.defs) this.renderer.definition(e10.defs[t11]);
          else this.renderer.setStyle(i10.style);
          this.renderer.chartIndex = this.index, aW(this, "afterGetContainer");
        }
        getMargins(t10) {
          let { spacing: e10, margin: i10, titleOffset: s10 } = this;
          this.resetMargins(), s10[0] && !aE(i10[0]) && (this.plotTop = Math.max(this.plotTop, s10[0] + e10[0])), s10[2] && !aE(i10[2]) && (this.marginBottom = Math.max(this.marginBottom, s10[2] + e10[2])), this.legend?.display && this.legend.adjustMargins(i10, e10), aW(this, "getMargins"), t10 || this.getAxisMargins();
        }
        getAxisMargins() {
          let t10 = this, e10 = t10.axisOffset = [0, 0, 0, 0], i10 = t10.colorAxis, s10 = t10.margin, o10 = /* @__PURE__ */ __name((t11) => {
            t11.forEach((t12) => {
              t12.visible && t12.getOffset();
            });
          }, "o");
          t10.hasCartesianSeries ? o10(t10.axes) : i10?.length && o10(i10), aM.forEach((i11, o11) => {
            aE(s10[o11]) || (t10[i11] += e10[o11]);
          }), t10.setChartSize();
        }
        getOptions() {
          return aI(this.userOptions, ay);
        }
        reflow(t10) {
          let e10 = this, i10 = e10.containerBox, s10 = e10.getContainerBox();
          delete e10.pointer?.chartPosition, !e10.exporting?.isPrinting && !e10.isResizing && i10 && s10.width && ((s10.width !== i10.width || s10.height !== i10.height) && (V.clearTimeout(e10.reflowTimeout), e10.reflowTimeout = aJ(function() {
            e10.container && e10.setSize(void 0, void 0, false);
          }, 100 * !!t10)), e10.containerBox = s10);
        }
        setReflow() {
          let t10 = this, e10 = /* @__PURE__ */ __name((e11) => {
            t10.options?.chart.reflow && t10.hasLoaded && t10.reflow(e11);
          }, "e");
          if ("function" == typeof ResizeObserver) new ResizeObserver(e10).observe(t10.renderTo);
          else {
            let t11 = aA(aT, "resize", e10);
            aA(this, "destroy", t11);
          }
        }
        setSize(t10, e10, i10) {
          let s10 = this, o10 = s10.renderer;
          s10.isResizing += 1, ax(i10, s10);
          let r10 = o10.globalAnimation;
          s10.oldChartHeight = s10.chartHeight, s10.oldChartWidth = s10.chartWidth, void 0 !== t10 && (s10.options.chart.width = t10), void 0 !== e10 && (s10.options.chart.height = e10), s10.getChartSize();
          let { chartWidth: a10, chartHeight: n10, scrollablePixelsX: h10 = 0, scrollablePixelsY: l2 = 0 } = s10;
          (s10.isDirtyBox || a10 !== s10.oldChartWidth || n10 !== s10.oldChartHeight) && (s10.styledMode || (r10 ? af : aO)(s10.container, { width: `${a10 + h10}px`, height: `${n10 + l2}px` }, r10), s10.setChartSize(true), o10.setSize(a10, n10, r10), s10.axes.forEach(function(t11) {
            t11.isDirty = true, t11.setScale();
          }), s10.isDirtyLegend = true, s10.isDirtyBox = true, s10.layOutTitles(), s10.getMargins(), s10.redraw(r10), s10.oldChartHeight = void 0, aW(s10, "resize"), setTimeout(() => {
            s10 && aW(s10, "endResize");
          }, am(r10).duration)), s10.isResizing -= 1;
        }
        setChartSize(t10) {
          let e10, i10, s10, o10, { chartHeight: r10, chartWidth: a10, inverted: n10, spacing: h10, renderer: l2 } = this, d2 = this.clipOffset, c2 = Math[n10 ? "floor" : "round"];
          this.plotLeft = e10 = Math.round(this.plotLeft), this.plotTop = i10 = Math.round(this.plotTop), this.plotWidth = s10 = Math.max(0, Math.round(a10 - e10 - (this.marginRight ?? 0))), this.plotHeight = o10 = Math.max(0, Math.round(r10 - i10 - (this.marginBottom ?? 0))), this.plotSizeX = n10 ? o10 : s10, this.plotSizeY = n10 ? s10 : o10, this.spacingBox = l2.spacingBox = { x: h10[3], y: h10[0], width: a10 - h10[3] - h10[1], height: r10 - h10[0] - h10[2] }, this.plotBox = l2.plotBox = { x: e10, y: i10, width: s10, height: o10 }, d2 && (this.clipBox = { x: c2(d2[3]), y: c2(d2[0]), width: c2(this.plotSizeX - d2[1] - d2[3]), height: c2(this.plotSizeY - d2[0] - d2[2]) }), t10 || (this.axes.forEach(function(t11) {
            t11.setAxisSize(), t11.setAxisTranslation();
          }), l2.alignElements()), aW(this, "afterSetChartSize", { skipAxes: t10 });
        }
        resetMargins() {
          aW(this, "resetMargins");
          let t10 = this, e10 = t10.options.chart, i10 = e10.plotBorderWidth || 0, s10 = Math.round(i10) / 2;
          ["margin", "spacing"].forEach((i11) => {
            let s11 = e10[i11], o10 = aj(s11) ? s11 : [s11, s11, s11, s11];
            ["Top", "Right", "Bottom", "Left"].forEach((s12, r10) => {
              t10[i11][r10] = e10[`${i11}${s12}`] ?? o10[r10];
            });
          }), aM.forEach((e11, i11) => {
            t10[e11] = t10.margin[i11] ?? t10.spacing[i11];
          }), t10.axisOffset = [0, 0, 0, 0], t10.clipOffset = [s10, s10, s10, s10], t10.plotBorderWidth = i10;
        }
        drawChartBox() {
          let t10 = this.options.chart, e10 = this.renderer, i10 = this.chartWidth, s10 = this.chartHeight, o10 = this.styledMode, r10 = this.plotBGImage, a10 = t10.backgroundColor, n10 = t10.plotBackgroundColor, h10 = t10.plotBackgroundImage, l2 = this.plotLeft, d2 = this.plotTop, c2 = this.plotWidth, p2 = this.plotHeight, g2 = this.plotBox, u2 = this.clipRect, f2 = this.clipBox, m2 = this.chartBackground, x2 = this.plotBackground, y2 = this.plotBorder, b2, v2, k2, w2 = "animate";
          m2 || (this.chartBackground = m2 = e10.rect().addClass("highcharts-background").add(), w2 = "attr"), o10 ? b2 = v2 = m2.strokeWidth() : (v2 = (b2 = t10.borderWidth || 0) + 8 * !!t10.shadow, k2 = { fill: a10 || "none" }, (b2 || m2["stroke-width"]) && (k2.stroke = t10.borderColor, k2["stroke-width"] = b2), m2.attr(k2).shadow(t10.shadow)), m2[w2]({ x: v2 / 2, y: v2 / 2, width: i10 - v2 - b2 % 2, height: s10 - v2 - b2 % 2, r: t10.borderRadius }), w2 = "animate", x2 || (w2 = "attr", this.plotBackground = x2 = e10.rect().addClass("highcharts-plot-background").add()), x2[w2](g2), !o10 && (x2.attr({ fill: n10 || "none" }).shadow(t10.plotShadow), h10 && (r10 ? (h10 !== r10.attr("href") && r10.attr("href", h10), r10.animate(g2)) : this.plotBGImage = e10.image(h10, l2, d2, c2, p2).add())), u2 ? u2.animate({ width: f2.width, height: f2.height }) : this.clipRect = e10.clipRect(f2), w2 = "animate", y2 || (w2 = "attr", this.plotBorder = y2 = e10.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()), o10 || y2.attr({ stroke: t10.plotBorderColor, "stroke-width": t10.plotBorderWidth || 0, fill: "none" }), y2[w2](y2.crisp(g2, -y2.strokeWidth())), this.isDirtyBox = false, aW(this, "afterDrawChartBox");
        }
        propFromSeries() {
          let t10, e10, i10, s10 = this, o10 = s10.options.chart, r10 = s10.options.series;
          ["inverted", "angular", "polar"].forEach(function(a10) {
            for (e10 = aC[o10.type], i10 = o10[a10] || e10 && e10.prototype[a10], t10 = r10?.length; !i10 && t10--; ) (e10 = aC[r10[t10].type]) && e10.prototype[a10] && (i10 = true);
            s10[a10] = i10;
          });
        }
        linkSeries(t10) {
          let e10 = this, i10 = e10.series;
          i10.forEach(function(t11) {
            t11.linkedSeries.length = 0;
          }), i10.forEach(function(t11) {
            let { linkedTo: i11 } = t11.options;
            if (aY(i11)) {
              let s10;
              (s10 = ":previous" === i11 ? e10.series[t11.index - 1] : e10.get(i11)) && s10.linkedParent !== t11 && (s10.linkedSeries.push(t11), t11.linkedParent = s10, s10.enabledDataSorting && t11.setDataSortingOptions(), t11.visible = aV(t11.options.visible, s10.options.visible, t11.visible));
            }
          }), aW(this, "afterLinkSeries", { isUpdating: t10 });
        }
        renderSeries() {
          this.series.forEach(function(t10) {
            t10.translate(), t10.render();
          });
        }
        render() {
          let t10 = this.axes, e10 = this.colorAxis, i10 = this.renderer, s10 = this.options.chart.axisLayoutRuns || 2, o10 = /* @__PURE__ */ __name((t11) => {
            t11.forEach((t12) => {
              t12.visible && t12.render();
            });
          }, "o"), r10 = 0, a10 = true, n10, h10 = 0;
          for (let e11 of (this.setTitle(), aW(this, "beforeMargins"), this.getStacks?.(), this.getMargins(true), this.setChartSize(), t10)) {
            let { options: t11 } = e11, { labels: i11 } = t11;
            if (this.hasCartesianSeries && e11.horiz && e11.visible && i11.enabled && e11.series.length && "colorAxis" !== e11.coll && !this.polar) {
              r10 = t11.tickLength, e11.createGroups();
              let s11 = new sf(e11, 0, "", true), o11 = s11.createLabel("x", i11);
              if (s11.destroy(), o11 && aV(i11.reserveSpace, !aG(t11.crossing)) && (r10 = o11.getBBox().height + i11.distance + Math.max(t11.offset || 0, 0)), r10) {
                o11?.destroy();
                break;
              }
            }
          }
          for (this.plotHeight = Math.max(this.plotHeight - r10, 0); (a10 || n10 || s10 > 1) && h10 < s10; ) {
            let e11 = this.plotWidth, i11 = this.plotHeight;
            for (let e12 of t10) 0 === h10 ? e12.setScale() : (e12.horiz && a10 || !e12.horiz && n10) && e12.setTickInterval(true);
            0 === h10 ? this.getAxisMargins() : this.getMargins(), a10 = e11 / this.plotWidth > (h10 ? 1 : 1.1), n10 = i11 / this.plotHeight > (h10 ? 1 : 1.05), h10++;
          }
          this.drawChartBox(), this.hasCartesianSeries ? o10(t10) : e10?.length && o10(e10), this.seriesGroup || (this.seriesGroup = i10.g("series-group").attr({ zIndex: 3 }).shadow(this.options.chart.seriesGroupShadow).add()), this.dataLabelsGroup || (this.dataLabelsGroup = i10.g("datalabels-group").attr({ zIndex: 6 }).add()), this.renderSeries(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = true;
        }
        addCredits(t10) {
          let e10 = this, i10 = aU(true, this.options.credits, t10);
          i10.enabled && !this.credits && (this.credits = this.renderer.text(i10.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
            i10.href && (aT.location.href = i10.href);
          }).attr({ align: i10.position.align, zIndex: 8 }), e10.styledMode || this.credits.css(i10.style), this.credits.add().align(i10.position), this.credits.update = function(t11) {
            e10.credits = e10.credits.destroy(), e10.addCredits(t11);
          });
        }
        destroy() {
          let t10, e10 = this, i10 = e10.axes, s10 = e10.series, o10 = e10.container, r10 = o10?.parentNode;
          for (aW(e10, "destroy"), e10.renderer.forExport ? aB(ak, e10) : ak[e10.index] = void 0, w.chartCount--, e10.renderTo.removeAttribute("data-highcharts-chart"), aq(e10), t10 = i10.length; t10--; ) i10[t10] = i10[t10].destroy();
          for (this.scroller?.destroy?.(), t10 = s10.length; t10--; ) s10[t10] = s10[t10].destroy();
          ["title", "subtitle", "chartBackground", "plotBackground", "plotBGImage", "plotBorder", "seriesGroup", "clipRect", "credits", "pointer", "rangeSelector", "legend", "resetZoomButton", "tooltip", "renderer"].forEach((t11) => {
            e10[t11] = e10[t11]?.destroy?.();
          }), o10 && (o10.innerHTML = t6.emptyHTML, aq(o10), r10 && aD(o10)), a$(e10, function(t11, i11) {
            delete e10[i11];
          });
        }
        firstRender() {
          let t10 = this, e10 = t10.options;
          t10.getContainer(), t10.resetMargins(), t10.setChartSize(), t10.propFromSeries(), t10.createAxes();
          let i10 = aF(e10.series) ? e10.series : [];
          e10.series = [], i10.forEach(function(e11) {
            t10.initSeries(e11);
          }), t10.linkSeries(), t10.setSortedData(), aW(t10, "beforeRender"), t10.render(), t10.pointer?.getChartPosition(), t10.renderer.imgCount || t10.hasLoaded || t10.onload(), t10.temporaryDisplay(true);
        }
        onload() {
          this.callbacks.concat([this.callback]).forEach(function(t10) {
            t10 && void 0 !== this.index && t10.apply(this, [this]);
          }, this), aW(this, "load"), aW(this, "render"), aE(this.index) && this.setReflow(), this.warnIfA11yModuleNotLoaded(), this.hasLoaded = true;
        }
        warnIfA11yModuleNotLoaded() {
          let { options: t10, title: e10 } = this;
          t10 && !this.accessibility && (this.renderer.boxWrapper.attr({ role: "img", "aria-label": (e10?.element.textContent || "").replace(/</g, "&lt;") }), t10.accessibility && false === t10.accessibility.enabled || aN('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', false, this));
        }
        addSeries(t10, e10, i10) {
          let s10, o10 = this;
          return t10 && (e10 = aV(e10, true), aW(o10, "addSeries", { options: t10 }, function() {
            s10 = o10.initSeries(t10), o10.isDirtyLegend = true, o10.linkSeries(), s10.enabledDataSorting && s10.setData(t10.data, false), aW(o10, "afterAddSeries", { series: s10 }), e10 && o10.redraw(i10);
          })), s10;
        }
        addAxis(t10, e10, i10, s10) {
          return this.createAxis(e10 ? "xAxis" : "yAxis", { axis: t10, redraw: i10, animation: s10 });
        }
        addColorAxis(t10, e10, i10) {
          return this.createAxis("colorAxis", { axis: t10, redraw: e10, animation: i10 });
        }
        createAxis(t10, e10) {
          let i10 = new s$(this, e10.axis, t10);
          return aV(e10.redraw, true) && this.redraw(e10.animation), i10;
        }
        showLoading(t10) {
          let e10 = this, i10 = e10.options, s10 = i10.loading, o10 = /* @__PURE__ */ __name(function() {
            r10 && aO(r10, { left: e10.plotLeft + "px", top: e10.plotTop + "px", width: e10.plotWidth + "px", height: e10.plotHeight + "px" });
          }, "o"), r10 = e10.loadingDiv, a10 = e10.loadingSpan;
          r10 || (e10.loadingDiv = r10 = aL("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, e10.container)), a10 || (e10.loadingSpan = a10 = aL("span", { className: "highcharts-loading-inner" }, null, r10), aA(e10, "redraw", o10)), r10.className = "highcharts-loading", t6.setElementHTML(a10, aV(t10, i10.lang.loading, "")), !e10.styledMode && (aO(r10, az(s10.style, { zIndex: 10 })), aO(a10, s10.labelStyle), e10.loadingShown || (aO(r10, { opacity: 0, display: "" }), af(r10, { opacity: s10.style.opacity || 0.5 }, { duration: s10.showDuration || 0 }))), e10.loadingShown = true, o10();
        }
        hideLoading() {
          let t10 = this.options, e10 = this.loadingDiv;
          e10 && (e10.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || af(e10, { opacity: 0 }, { duration: t10.loading.hideDuration || 100, complete: /* @__PURE__ */ __name(function() {
            aO(e10, { display: "none" });
          }, "complete") })), this.loadingShown = false;
        }
        update(t10, e10, i10, s10) {
          let o10, r10, a10, n10 = this, h10 = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, l2 = t10.isResponsiveOptions, d2 = [];
          aW(n10, "update", { options: t10 }), l2 || n10.setResponsive(false, true), t10 = aI(t10, n10.options), n10.userOptions = aU(n10.userOptions, t10);
          let c2 = t10.chart;
          c2 && (aU(true, n10.options.chart, c2), this.setZoomOptions(), "className" in c2 && n10.setClassName(c2.className), ("inverted" in c2 || "polar" in c2 || "type" in c2) && (n10.propFromSeries(), o10 = true), "alignTicks" in c2 && (o10 = true), "events" in c2 && av(this, c2), a$(c2, function(t11, e11) {
            -1 !== n10.propsRequireUpdateSeries.indexOf("chart." + e11) && (r10 = true), -1 !== n10.propsRequireDirtyBox.indexOf(e11) && (n10.isDirtyBox = true), -1 !== n10.propsRequireReflow.indexOf(e11) && (n10.isDirtyBox = true, l2 || (a10 = true));
          }), !n10.styledMode && c2.style && n10.renderer.setStyle(n10.options.chart.style || {})), !n10.styledMode && t10.colors && (this.options.colors = t10.colors), a$(t10, function(e11, i11) {
            n10[i11] && "function" == typeof n10[i11].update ? n10[i11].update(e11, false) : "function" == typeof n10[h10[i11]] ? n10[h10[i11]](e11) : "colors" !== i11 && -1 === n10.collectionsWithUpdate.indexOf(i11) && aU(true, n10.options[i11], t10[i11]), "chart" !== i11 && -1 !== n10.propsRequireUpdateSeries.indexOf(i11) && (r10 = true);
          }), this.collectionsWithUpdate.forEach(function(e11) {
            t10[e11] && (aK(t10[e11]).forEach(function(t11, s11) {
              let o11, r11 = aE(t11.id);
              r11 && (o11 = n10.get(t11.id)), !o11 && n10[e11] && (o11 = n10[e11][aV(t11.index, s11)]) && (r11 && aE(o11.options.id) || o11.options.isInternal) && (o11 = void 0), o11 && o11.coll === e11 && (o11.update(t11, false), i10 && (o11.touched = true)), !o11 && i10 && n10.collectionsWithInit[e11] && (n10.collectionsWithInit[e11][0].apply(n10, [t11].concat(n10.collectionsWithInit[e11][1] || []).concat([false])).touched = true);
            }), i10 && n10[e11].forEach(function(t11) {
              t11.touched || t11.options.isInternal ? delete t11.touched : d2.push(t11);
            }));
          }), d2.forEach(function(t11) {
            t11.chart && t11.remove && t11.remove(false);
          }), o10 && n10.axes.forEach(function(t11) {
            t11.update({}, false);
          }), r10 && n10.getSeriesOrderByLinks().forEach(function(t11) {
            t11.chart && t11.update({}, false);
          }, this);
          let p2 = c2?.width, g2 = c2 && (aY(c2.height) ? a_(c2.height, p2 || n10.chartWidth) : c2.height);
          a10 || aG(p2) && p2 !== n10.chartWidth || aG(g2) && g2 !== n10.chartHeight ? n10.setSize(p2, g2, s10) : aV(e10, true) && n10.redraw(s10), aW(n10, "afterUpdate", { options: t10, redraw: e10, animation: s10 });
        }
        setSubtitle(t10, e10) {
          this.applyDescription("subtitle", t10), this.layOutTitles(e10);
        }
        setCaption(t10, e10) {
          this.applyDescription("caption", t10), this.layOutTitles(e10);
        }
        showResetZoom() {
          let t10 = this, e10 = ay.lang, i10 = t10.zooming.resetButton, s10 = i10.theme, o10 = "chart" === i10.relativeTo || "spacingBox" === i10.relativeTo ? null : "plotBox";
          function r10() {
            t10.zoomOut();
          }
          __name(r10, "r");
          aW(this, "beforeShowResetZoom", null, function() {
            t10.resetZoomButton = t10.renderer.button(e10.resetZoom, null, null, r10, s10).attr({ align: i10.position.align, title: e10.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(i10.position, false, o10);
          }), aW(this, "afterShowResetZoom");
        }
        zoomOut() {
          aW(this, "selection", { resetSelection: true }, () => this.transform({ reset: true, trigger: "zoom" }));
        }
        pan(t10, e10) {
          let i10 = this, s10 = "object" == typeof e10 ? e10 : { enabled: e10, type: "x" }, o10 = s10.type, r10 = o10 && i10[{ x: "xAxis", xy: "axes", y: "yAxis" }[o10]].filter((t11) => t11.options.panningEnabled && !t11.options.isInternal), a10 = i10.options.chart;
          a10?.panning && (a10.panning = s10), aW(this, "pan", { originalEvent: t10 }, () => {
            i10.transform({ axes: r10, event: t10, to: { x: t10.chartX - (i10.mouseDownX || 0), y: t10.chartY - (i10.mouseDownY || 0) }, trigger: "pan" }), aO(i10.container, { cursor: "move" });
          });
        }
        transform(t10) {
          let { axes: e10 = this.axes, event: i10, from: s10 = {}, reset: o10, selection: r10, to: a10 = {}, trigger: n10 } = t10, { inverted: h10, time: l2 } = this;
          this.hoverPoints?.forEach((t11) => t11.setState()), aW(this, "transform", t10);
          let d2 = t10.hasZoomed || false, c2, p2;
          for (let t11 of e10) {
            let { horiz: e11, len: g2, minPointOffset: u2 = 0, options: f2, reversed: m2 } = t11, x2 = e11 ? "width" : "height", y2 = e11 ? "x" : "y", b2 = aV(a10[x2], t11.len), v2 = aV(s10[x2], t11.len), k2 = 10 > Math.abs(b2) ? 1 : b2 / v2, w2 = (s10[y2] || 0) + v2 / 2 - t11.pos, M2 = w2 - ((a10[y2] ?? t11.pos) + b2 / 2 - t11.pos) / k2, S2 = m2 && !h10 || !m2 && h10 ? -1 : 1;
            if (!o10 && (w2 < 0 || w2 > t11.len)) continue;
            let T2 = t11.chart.polar || t11.isOrdinal ? 0 : u2 * S2 || 0, C2 = t11.toValue(M2, true), A2 = t11.toValue(M2 + g2 / k2, true), P2 = C2 + T2, L2 = A2 - T2, O2 = t11.allExtremes;
            if (r10 && r10[t11.coll].push({ axis: t11, min: Math.min(C2, A2), max: Math.max(C2, A2) }), P2 > L2 && ([P2, L2] = [L2, P2]), 1 === k2 && !o10 && "yAxis" === t11.coll && !O2) {
              for (let e12 of t11.series) {
                let t12 = e12.getExtremes(e12.getProcessedData(true).modified.getColumn("y") || [], true);
                O2 ?? (O2 = { dataMin: Number.MAX_VALUE, dataMax: -Number.MAX_VALUE }), aG(t12.dataMin) && aG(t12.dataMax) && (O2.dataMin = Math.min(t12.dataMin, O2.dataMin), O2.dataMax = Math.max(t12.dataMax, O2.dataMax));
              }
              t11.allExtremes = O2;
            }
            let { dataMin: E2, dataMax: I2, min: D2, max: B2 } = az(t11.getExtremes(), O2 || {}), N2 = l2.parse(f2.min), z2 = l2.parse(f2.max), R2 = E2 ?? N2, W2 = I2 ?? z2, H2 = L2 - P2, X2 = t11.categories ? 0 : Math.min(H2, W2 - R2), F2 = R2 - X2 * (aE(N2) ? 0 : f2.minPadding), G2 = W2 + X2 * (aE(z2) ? 0 : f2.maxPadding), j2 = t11.allowZoomOutside || 1 === k2 || "zoom" !== n10 && k2 > 1, Y2 = Math.min(N2 ?? F2, F2, j2 ? D2 : F2), U2 = Math.max(z2 ?? G2, G2, j2 ? B2 : G2);
            (!t11.isOrdinal || 1 !== k2 || o10) && (P2 < Y2 && (P2 = Y2, k2 >= 1 && (L2 = P2 + H2)), L2 > U2 && (L2 = U2, k2 >= 1 && (P2 = L2 - H2)), (o10 || t11.series.length && (P2 !== D2 || L2 !== B2) && P2 >= Y2 && L2 <= U2) && (r10 ? r10[t11.coll].push({ axis: t11, min: P2, max: L2 }) : (t11.isPanning = "zoom" !== n10, t11.isPanning && (p2 = true), t11.setExtremes(o10 ? void 0 : P2, o10 ? void 0 : L2, false, false, { move: M2, trigger: n10, scale: k2 }), !o10 && (P2 > Y2 || L2 < U2) && "mousewheel" !== n10 && (c2 = true)), d2 = true), this.hasCartesianSeries || o10 || "mousewheel" === n10 || (c2 = true), i10 && (this[e11 ? "mouseDownX" : "mouseDownY"] = i10[e11 ? "chartX" : "chartY"]));
          }
          return d2 && (r10 ? aW(this, "selection", r10, () => {
            delete t10.selection, t10.trigger = "zoom", this.transform(t10);
          }) : (!c2 || p2 || this.resetZoomButton ? !c2 && this.resetZoomButton && (this.resetZoomButton = this.resetZoomButton.destroy()) : this.showResetZoom(), this.redraw("zoom" === n10 && (this.options.chart.animation ?? this.pointCount < 100)))), d2;
        }
      };
      __name(_a0, "a0");
      let a0 = _a0;
      az(a0.prototype, { callbacks: [], collectionsWithInit: { xAxis: [a0.prototype.addAxis, [true]], yAxis: [a0.prototype.addAxis, [false]], series: [a0.prototype.addSeries] }, collectionsWithUpdate: ["xAxis", "yAxis", "series"], propsRequireDirtyBox: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "plotBackgroundColor", "plotBackgroundImage", "plotBorderColor", "plotBorderWidth", "plotShadow", "shadow"], propsRequireReflow: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "spacing", "spacingTop", "spacingRight", "spacingBottom", "spacingLeft"], propsRequireUpdateSeries: ["chart.inverted", "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions", "time", "tooltip"] });
      let { stop: a1 } = tU, { composed: a2 } = w, { addEvent: a3, createElement: a5, css: a6, defined: a9, erase: a4, merge: a8, pushUnique: a7 } = V;
      function nt() {
        let t10 = this.scrollablePlotArea;
        (this.scrollablePixelsX || this.scrollablePixelsY) && !t10 && (this.scrollablePlotArea = t10 = new ni(this)), t10?.applyFixed();
      }
      __name(nt, "nt");
      function ne() {
        this.chart.scrollablePlotArea && (this.chart.scrollablePlotArea.isDirty = true);
      }
      __name(ne, "ne");
      const _ni = class _ni {
        static compose(t10, e10, i10) {
          a7(a2, this.compose) && (a3(t10, "afterInit", ne), a3(e10, "afterSetChartSize", (t11) => this.afterSetSize(t11.target, t11)), a3(e10, "render", nt), a3(i10, "show", ne));
        }
        static afterSetSize(t10, e10) {
          let i10, s10, o10, { minWidth: r10, minHeight: a10 } = t10.options.chart.scrollablePlotArea || {}, { clipBox: n10, plotBox: h10, inverted: l2, renderer: d2 } = t10;
          if (!d2.forExport) if (r10 ? (t10.scrollablePixelsX = i10 = Math.max(0, r10 - t10.chartWidth), i10 && (t10.scrollablePlotBox = a8(t10.plotBox), h10.width = t10.plotWidth += i10, n10[l2 ? "height" : "width"] += i10, o10 = true)) : a10 && (t10.scrollablePixelsY = s10 = Math.max(0, a10 - t10.chartHeight), a9(s10) && (t10.scrollablePlotBox = a8(t10.plotBox), h10.height = t10.plotHeight += s10, n10[l2 ? "width" : "height"] += s10, o10 = false)), a9(o10)) {
            if (!e10.skipAxes) for (let e11 of t10.axes) (e11.horiz === o10 || t10.hasParallelCoordinates && "yAxis" === e11.coll) && (e11.setAxisSize(), e11.setAxisTranslation());
          } else delete t10.scrollablePlotBox;
        }
        constructor(t10) {
          let e10, i10 = t10.options.chart, s10 = eg.getRendererType(), o10 = i10.scrollablePlotArea || {}, r10 = this.moveFixedElements.bind(this), a10 = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
          t10.scrollablePixelsX && (a10.overflowX = "auto"), t10.scrollablePixelsY && (a10.overflowY = "auto"), this.chart = t10;
          let n10 = this.parentDiv = a5("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, t10.renderTo), h10 = this.scrollingContainer = a5("div", { className: "highcharts-scrolling" }, a10, n10), l2 = this.innerContainer = a5("div", { className: "highcharts-inner-container" }, void 0, h10), d2 = this.fixedDiv = a5("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (i10.style?.zIndex || 0) + 2, top: 0 }, void 0, true), c2 = this.fixedRenderer = new s10(d2, t10.chartWidth, t10.chartHeight, i10.style);
          this.mask = c2.path().attr({ fill: i10.backgroundColor || "#fff", "fill-opacity": o10.opacity ?? 0.85, zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), h10.parentNode.insertBefore(d2, h10), a6(t10.renderTo, { overflow: "visible" }), a3(t10, "afterShowResetZoom", r10), a3(t10, "afterApplyDrilldown", r10), a3(t10, "afterLayOutTitles", r10), a3(h10, "scroll", () => {
            let { pointer: i11, hoverPoint: s11 } = t10;
            i11 && (delete i11.chartPosition, s11 && (e10 = s11), i11.runPointActions(void 0, e10, true));
          }), l2.appendChild(t10.container);
        }
        applyFixed() {
          let { chart: t10, fixedRenderer: e10, isDirty: i10, scrollingContainer: s10 } = this, { axisOffset: o10, chartWidth: r10, chartHeight: a10, container: n10, plotHeight: h10, plotLeft: l2, plotTop: d2, plotWidth: c2, scrollablePixelsX: p2 = 0, scrollablePixelsY: g2 = 0 } = t10, { scrollPositionX: u2 = 0, scrollPositionY: f2 = 0 } = t10.options.chart.scrollablePlotArea || {}, m2 = r10 + p2, x2 = a10 + g2;
          e10.setSize(r10, a10), (i10 ?? true) && (this.isDirty = false, this.moveFixedElements()), a1(t10.container), a6(n10, { width: `${m2}px`, height: `${x2}px` }), t10.renderer.boxWrapper.attr({ width: m2, height: x2, viewBox: [0, 0, m2, x2].join(" ") }), t10.chartBackground?.attr({ width: m2, height: x2 }), a6(s10, { width: `${r10}px`, height: `${a10}px` }), a9(i10) || (s10.scrollLeft = p2 * u2, s10.scrollTop = g2 * f2);
          let y2 = d2 - o10[0] - 1, b2 = l2 - o10[3] - 1, v2 = d2 + h10 + o10[2] + 1, k2 = l2 + c2 + o10[1] + 1, w2 = l2 + c2 - p2, M2 = d2 + h10 - g2, S2 = [["M", 0, 0]];
          p2 ? S2 = [["M", 0, y2], ["L", l2 - 1, y2], ["L", l2 - 1, v2], ["L", 0, v2], ["Z"], ["M", w2, y2], ["L", r10, y2], ["L", r10, v2], ["L", w2, v2], ["Z"]] : g2 && (S2 = [["M", b2, 0], ["L", b2, d2 - 1], ["L", k2, d2 - 1], ["L", k2, 0], ["Z"], ["M", b2, M2], ["L", b2, a10], ["L", k2, a10], ["L", k2, M2], ["Z"]]), "adjustHeight" !== t10.redrawTrigger && this.mask.attr({ d: S2 });
        }
        moveFixedElements() {
          let t10, { container: e10, inverted: i10, scrollablePixelsX: s10, scrollablePixelsY: o10 } = this.chart, r10 = this.fixedRenderer, a10 = _ni.fixedSelectors;
          if (s10 && !i10 ? t10 = ".highcharts-yaxis" : s10 && i10 || o10 && !i10 ? t10 = ".highcharts-xaxis" : o10 && i10 && (t10 = ".highcharts-yaxis"), t10 && !(this.chart.hasParallelCoordinates && ".highcharts-yaxis" === t10)) for (let e11 of [`${t10}:not(.highcharts-radial-axis)`, `${t10}-labels:not(.highcharts-radial-axis-labels)`]) a7(a10, e11);
          else for (let t11 of [".highcharts-xaxis", ".highcharts-yaxis"]) for (let e11 of [`${t11}:not(.highcharts-radial-axis)`, `${t11}-labels:not(.highcharts-radial-axis-labels)`]) a4(a10, e11);
          for (let t11 of a10) [].forEach.call(e10.querySelectorAll(t11), (t12) => {
            (t12.namespaceURI === r10.SVG_NS ? r10.box : r10.box.parentNode).appendChild(t12), t12.style.pointerEvents = "auto";
          });
        }
      };
      __name(_ni, "ni");
      let ni = _ni;
      ni.fixedSelectors = [".highcharts-breadcrumbs-group", ".highcharts-contextbutton", ".highcharts-caption", ".highcharts-credits", ".highcharts-drillup-button", ".highcharts-legend", ".highcharts-legend-checkbox", ".highcharts-navigator-series", ".highcharts-navigator-xaxis", ".highcharts-navigator-yaxis", ".highcharts-navigator", ".highcharts-range-selector-group", ".highcharts-reset-zoom", ".highcharts-scrollbar", ".highcharts-subtitle", ".highcharts-title"];
      let { format: ns } = ep, { series: no } = rk, { destroyObjectProperties: nr, fireEvent: na, getAlignFactor: nn, isNumber: nh, pick: nl } = V, nd = (_f = class {
        constructor(t10, e10, i10, s10, o10) {
          let r10 = t10.chart.inverted, a10 = t10.reversed;
          this.axis = t10;
          let n10 = this.isNegative = !!i10 != !!a10;
          this.options = e10 = e10 || {}, this.x = s10, this.total = null, this.cumulative = null, this.points = {}, this.hasValidPoints = false, this.stack = o10, this.leftCliff = 0, this.rightCliff = 0, this.alignOptions = { align: e10.align || (r10 ? n10 ? "left" : "right" : "center"), verticalAlign: e10.verticalAlign || (r10 ? "middle" : n10 ? "bottom" : "top"), y: e10.y, x: e10.x }, this.textAlign = e10.textAlign || (r10 ? n10 ? "right" : "left" : "center");
        }
        destroy() {
          nr(this, this.axis);
        }
        render(t10) {
          let e10 = this.axis.chart, i10 = this.options, s10 = i10.format, o10 = s10 ? ns(s10, this, e10) : i10.formatter.call(this);
          if (this.label) this.label.attr({ text: o10, visibility: "hidden" });
          else {
            this.label = e10.renderer.label(o10, null, void 0, i10.shape, void 0, void 0, i10.useHTML, false, "stack-labels");
            let s11 = { r: i10.borderRadius || 0, text: o10, padding: nl(i10.padding, 5), visibility: "hidden" };
            e10.styledMode || (s11.fill = i10.backgroundColor, s11.stroke = i10.borderColor, s11["stroke-width"] = i10.borderWidth, this.label.css(i10.style || {})), this.label.attr(s11), this.label.added || this.label.add(t10);
          }
          this.label.labelrank = e10.plotSizeY, na(this, "afterRender");
        }
        setOffset(t10, e10, i10, s10, o10, r10) {
          let { alignOptions: a10, axis: n10, label: h10, options: l2, textAlign: d2 } = this, c2 = n10.chart, p2 = this.getStackBox({ xOffset: t10, width: e10, boxBottom: i10, boxTop: s10, defaultX: o10, xAxis: r10 }), { verticalAlign: g2 } = a10;
          if (h10 && p2) {
            let t11 = h10.getBBox(void 0, 0), e11 = h10.padding, i11 = "justify" === nl(l2.overflow, "justify"), s11;
            a10.x = l2.x || 0, a10.y = l2.y || 0;
            let { x: o11, y: r11 } = this.adjustStackPosition({ labelBox: t11, verticalAlign: g2, textAlign: d2 });
            p2.x -= o11, p2.y -= r11, h10.align(a10, false, p2), (s11 = c2.isInsidePlot(h10.alignAttr.x + a10.x + o11, h10.alignAttr.y + a10.y + r11)) || (i11 = false), i11 && no.prototype.justifyDataLabel.call(n10, h10, a10, h10.alignAttr, t11, p2), h10.attr({ x: h10.alignAttr.x, y: h10.alignAttr.y, rotation: l2.rotation, rotationOriginX: t11.width * nn(l2.textAlign || "center"), rotationOriginY: t11.height / 2 }), nl(!i11 && l2.crop, true) && (s11 = nh(h10.x) && nh(h10.y) && c2.isInsidePlot(h10.x - e11 + (h10.width || 0), h10.y) && c2.isInsidePlot(h10.x + e11, h10.y)), h10[s11 ? "show" : "hide"]();
          }
          na(this, "afterSetOffset", { xOffset: t10, width: e10 });
        }
        adjustStackPosition({ labelBox: t10, verticalAlign: e10, textAlign: i10 }) {
          return { x: t10.width / 2 + t10.width / 2 * (2 * nn(i10) - 1), y: t10.height / 2 * 2 * (1 - nn(e10)) };
        }
        getStackBox(t10) {
          let e10 = this.axis, i10 = e10.chart, { boxTop: s10, defaultX: o10, xOffset: r10, width: a10, boxBottom: n10 } = t10, h10 = e10.stacking.usePercentage ? 100 : nl(s10, this.total, 0), l2 = e10.toPixels(h10), d2 = t10.xAxis || i10.xAxis[0], c2 = nl(o10, d2.translate(this.x)) + r10, p2 = Math.abs(l2 - e10.toPixels(n10 || nh(e10.min) && e10.logarithmic && e10.logarithmic.lin2log(e10.min) || 0)), g2 = i10.inverted, u2 = this.isNegative;
          return g2 ? { x: (u2 ? l2 : l2 - p2) - i10.plotLeft, y: d2.height - c2 - a10 + d2.top - i10.plotTop, width: p2, height: a10 } : { x: c2 + d2.transB - i10.plotLeft, y: (u2 ? l2 - p2 : l2) - i10.plotTop, width: a10, height: p2 };
        }
      }, __name(_f, "nd"), _f), { getDeferredAnimation: nc } = tU, { series: { prototype: np } } = rk, { addEvent: ng, correctFloat: nu, defined: nf, destroyObjectProperties: nm, fireEvent: nx, isNumber: ny, objectEach: nb, pick: nv } = V;
      function nk() {
        let t10 = this.inverted;
        this.axes.forEach((t11) => {
          t11.stacking?.stacks && t11.hasVisibleSeries && (t11.stacking.oldStacks = t11.stacking.stacks);
        }), this.series.forEach((e10) => {
          let i10 = e10.xAxis?.options || {};
          e10.options.stacking && e10.reserveSpace() && (e10.stackKey = [e10.type, nv(e10.options.stack, ""), t10 ? i10.top : i10.left, t10 ? i10.height : i10.width].join(","));
        });
      }
      __name(nk, "nk");
      function nw() {
        let t10 = this.stacking;
        if (t10) {
          let e10 = t10.stacks;
          nb(e10, (t11, i10) => {
            nm(t11), delete e10[i10];
          }), t10.stackTotalGroup?.destroy();
        }
      }
      __name(nw, "nw");
      function nM() {
        this.stacking || (this.stacking = new nL(this));
      }
      __name(nM, "nM");
      function nS(t10, e10, i10, s10) {
        return !nf(t10) || t10.x !== e10 || s10 && t10.stackKey !== s10 ? t10 = { x: e10, index: 0, key: s10, stackKey: s10 } : t10.index++, t10.key = [i10, e10, t10.index].join(","), t10;
      }
      __name(nS, "nS");
      function nT() {
        let t10, e10 = this, i10 = e10.yAxis, s10 = e10.stackKey || "", o10 = i10.stacking.stacks, r10 = e10.getColumn("x", true), a10 = e10.options.stacking, n10 = e10[a10 + "Stacker"];
        n10 && [s10, "-" + s10].forEach((i11) => {
          let s11 = r10.length, a11, h10, l2;
          for (; s11--; ) a11 = r10[s11], t10 = e10.getStackIndicator(t10, a11, e10.index, i11), h10 = o10[i11]?.[a11], (l2 = h10?.points[t10.key || ""]) && n10.call(e10, l2, h10, s11);
        });
      }
      __name(nT, "nT");
      function nC(t10, e10, i10) {
        let s10 = e10.total ? 100 / e10.total : 0;
        t10[0] = nu(t10[0] * s10), t10[1] = nu(t10[1] * s10), this.stackedYData[i10] = t10[1];
      }
      __name(nC, "nC");
      function nA(t10) {
        (this.is("column") || this.is("columnrange")) && (this.options.centerInCategory && this.chart.series.length > 1 ? np.setStackedPoints.call(this, t10, "group") : t10.stacking.resetStacks());
      }
      __name(nA, "nA");
      function nP(t10, e10) {
        let i10, s10, o10, r10, a10, n10, h10, l2 = e10 || this.options.stacking;
        if (!l2 || !this.reserveSpace() || ({ group: "xAxis" }[l2] || "yAxis") !== t10.coll) return;
        let d2 = this.getColumn("x", true), c2 = this.getColumn(this.pointValKey || "y", true), p2 = [], g2 = c2.length, u2 = this.options, f2 = u2.threshold || 0, m2 = u2.startFromThreshold ? f2 : 0, x2 = u2.stack, y2 = e10 ? `${this.type},${l2}` : this.stackKey || "", b2 = "-" + y2, v2 = this.negStacks, k2 = t10.stacking, w2 = k2.stacks, M2 = k2.oldStacks;
        for (k2.stacksTouched += 1, h10 = 0; h10 < g2; h10++) {
          let e11 = d2[h10] || 0, g3 = c2[h10], u3 = ny(g3) && g3 || 0;
          n10 = (i10 = this.getStackIndicator(i10, e11, this.index)).key || "", w2[a10 = (s10 = v2 && u3 < (m2 ? 0 : f2)) ? b2 : y2] || (w2[a10] = {}), w2[a10][e11] || (M2[a10]?.[e11] ? (w2[a10][e11] = M2[a10][e11], w2[a10][e11].total = null) : w2[a10][e11] = new nd(t10, t10.options.stackLabels, !!s10, e11, x2)), o10 = w2[a10][e11], null !== g3 ? (o10.points[n10] = o10.points[this.index] = [nv(o10.cumulative, m2)], nf(o10.cumulative) || (o10.base = n10), o10.touched = k2.stacksTouched, i10.index > 0 && false === this.singleStacks && (o10.points[n10][0] = o10.points[this.index + "," + e11 + ",0"][0])) : (delete o10.points[n10], delete o10.points[this.index]);
          let S2 = o10.total || 0;
          "percent" === l2 ? (r10 = s10 ? y2 : b2, S2 = v2 && w2[r10]?.[e11] ? (r10 = w2[r10][e11]).total = Math.max(r10.total || 0, S2) + Math.abs(u3) : nu(S2 + Math.abs(u3))) : "group" === l2 ? ny(g3) && S2++ : S2 = nu(S2 + u3), "group" === l2 ? o10.cumulative = (S2 || 1) - 1 : o10.cumulative = nu(nv(o10.cumulative, m2) + u3), o10.total = S2, null !== g3 && (o10.points[n10].push(o10.cumulative), p2[h10] = o10.cumulative, o10.hasValidPoints = true);
        }
        "percent" === l2 && (k2.usePercentage = true), "group" !== l2 && (this.stackedYData = p2), k2.oldStacks = {};
      }
      __name(nP, "nP");
      const _nL = class _nL {
        constructor(t10) {
          this.oldStacks = {}, this.stacks = {}, this.stacksTouched = 0, this.axis = t10;
        }
        buildStacks() {
          let t10, e10, i10 = this.axis, s10 = i10.series, o10 = "xAxis" === i10.coll, r10 = i10.options.reversedStacks, a10 = s10.length;
          for (this.resetStacks(), this.usePercentage = false, e10 = a10; e10--; ) t10 = s10[r10 ? e10 : a10 - e10 - 1], o10 && t10.setGroupedPoints(i10), t10.setStackedPoints(i10);
          if (!o10) for (e10 = 0; e10 < a10; e10++) s10[e10].modifyStacks();
          nx(i10, "afterBuildStacks");
        }
        cleanStacks() {
          this.oldStacks && (this.stacks = this.oldStacks, nb(this.stacks, (t10) => {
            nb(t10, (t11) => {
              t11.cumulative = t11.total;
            });
          }));
        }
        resetStacks() {
          nb(this.stacks, (t10) => {
            nb(t10, (e10, i10) => {
              ny(e10.touched) && e10.touched < this.stacksTouched ? (e10.destroy(), delete t10[i10]) : (e10.total = null, e10.cumulative = null);
            });
          });
        }
        renderStackTotals() {
          let t10 = this.axis, e10 = t10.chart, i10 = e10.renderer, s10 = this.stacks, o10 = nc(e10, t10.options.stackLabels?.animation || false), r10 = this.stackTotalGroup = this.stackTotalGroup || i10.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add();
          r10.translate(e10.plotLeft, e10.plotTop), nb(s10, (t11) => {
            nb(t11, (t12) => {
              t12.render(r10);
            });
          }), r10.animate({ opacity: 1 }, o10);
        }
      };
      __name(_nL, "nL");
      let nL = _nL;
      (g || (g = {})).compose = function(t10, e10, i10) {
        let s10 = e10.prototype, o10 = i10.prototype;
        s10.getStacks || (ng(t10, "init", nM), ng(t10, "destroy", nw), s10.getStacks = nk, o10.getStackIndicator = nS, o10.modifyStacks = nT, o10.percentStacker = nC, o10.setGroupedPoints = nA, o10.setStackedPoints = nP);
      };
      let nO = g, { defined: nE, merge: nI, isObject: nD } = V;
      const _nB = class _nB extends r1 {
        drawGraph() {
          let t10 = this.options, e10 = (this.gappedPath || this.getGraphPath).call(this), i10 = this.chart.styledMode;
          [this, ...this.zones].forEach((s10, o10) => {
            let r10, a10 = s10.graph, n10 = a10 ? "animate" : "attr", h10 = s10.dashStyle || t10.dashStyle;
            a10 ? (a10.endX = this.preventGraphAnimation ? null : e10.xMap, a10.animate({ d: e10 })) : e10.length && (s10.graph = a10 = this.chart.renderer.path(e10).addClass("highcharts-graph" + (o10 ? ` highcharts-zone-graph-${o10 - 1} ` : " ") + (o10 && s10.className || "")).attr({ zIndex: 1 }).add(this.group)), a10 && !i10 && (r10 = { stroke: !o10 && t10.lineColor || s10.color || this.color || "#cccccc", "stroke-width": t10.lineWidth || 0, fill: this.fillGraph && this.color || "none" }, h10 ? r10.dashstyle = h10 : "square" !== t10.linecap && (r10["stroke-linecap"] = r10["stroke-linejoin"] = "round"), a10[n10](r10).shadow(t10.shadow && nI({ filterUnits: "userSpaceOnUse" }, nD(t10.shadow) ? t10.shadow : {}))), a10 && (a10.startX = e10.xMap, a10.isArea = e10.isArea);
          });
        }
        getGraphPath(t10, e10, i10) {
          let s10 = this, o10 = s10.options, r10 = [], a10 = [], n10, h10 = o10.step, l2 = (t10 = t10 || s10.points).reversed;
          return l2 && t10.reverse(), (h10 = { right: 1, center: 2 }[h10] || h10 && 3) && l2 && (h10 = 4 - h10), (t10 = this.getValidPoints(t10, false, o10.nullInteraction || !(o10.connectNulls && !e10 && !i10))).forEach(function(l3, d2) {
            let c2, p2 = l3.plotX, g2 = l3.plotY, u2 = t10[d2 - 1], f2 = l3.isNull || "number" != typeof g2;
            (l3.leftCliff || u2?.rightCliff) && !i10 && (n10 = true), f2 && !nE(e10) && d2 > 0 ? n10 = !o10.connectNulls : f2 && !e10 ? n10 = true : (0 === d2 || n10 ? c2 = [["M", l3.plotX, l3.plotY]] : s10.getPointSpline ? c2 = [s10.getPointSpline(t10, l3, d2)] : h10 ? (c2 = 1 === h10 ? [["L", u2.plotX, g2]] : 2 === h10 ? [["L", (u2.plotX + p2) / 2, u2.plotY], ["L", (u2.plotX + p2) / 2, g2]] : [["L", p2, u2.plotY]]).push(["L", p2, g2]) : c2 = [["L", p2, g2]], a10.push(l3.x), h10 && (a10.push(l3.x), 2 === h10 && a10.push(l3.x)), r10.push.apply(r10, c2), n10 = false);
          }), r10.xMap = a10, s10.graphPath = r10, r10;
        }
      };
      __name(_nB, "nB");
      let nB = _nB;
      nB.defaultOptions = nI(r1.defaultOptions, { legendSymbol: "lineMarker" }), rk.registerSeriesType("line", nB);
      let { seriesTypes: { line: nN } } = rk, { extend: nz, merge: nR, objectEach: nW, pick: nH } = V;
      const _nX = class _nX extends nN {
        drawGraph() {
          this.areaPath = [], super.drawGraph.apply(this);
          let { areaPath: t10, options: e10 } = this;
          [this, ...this.zones].forEach((i10, s10) => {
            let o10 = {}, r10 = i10.fillColor || e10.fillColor, a10 = i10.area, n10 = a10 ? "animate" : "attr";
            a10 ? (a10.endX = this.preventGraphAnimation ? null : t10.xMap, a10.animate({ d: t10 })) : (o10.zIndex = 0, (a10 = i10.area = this.chart.renderer.path(t10).addClass("highcharts-area" + (s10 ? ` highcharts-zone-area-${s10 - 1} ` : " ") + (s10 && i10.className || "")).add(this.group)).isArea = true), this.chart.styledMode || (o10.fill = r10 || i10.color || this.color, o10["fill-opacity"] = r10 ? 1 : e10.fillOpacity ?? 0.75, a10.css({ pointerEvents: this.stickyTracking ? "none" : "auto" })), a10[n10](o10), a10.startX = t10.xMap, a10.shiftUnit = e10.step ? 2 : 1;
          });
        }
        getGraphPath(t10) {
          let e10, i10, s10, o10 = nN.prototype.getGraphPath, r10 = this.options, a10 = r10.stacking, n10 = this.yAxis, h10 = [], l2 = [], d2 = this.index, c2 = n10.stacking.stacks[this.stackKey], p2 = r10.threshold, g2 = Math.round(n10.getThreshold(r10.threshold)), u2 = nH(r10.connectNulls, "percent" === a10), f2 = /* @__PURE__ */ __name(function(i11, s11, o11) {
            let r11 = t10[i11], u3 = a10 && c2[r11.x].points[d2], f3 = r11[o11 + "Null"] || 0, m3 = r11[o11 + "Cliff"] || 0, x3, y3, b3 = true;
            m3 || f3 ? (x3 = (f3 ? u3[0] : u3[1]) + m3, y3 = u3[0] + m3, b3 = !!f3) : !a10 && t10[s11] && t10[s11].isNull && (x3 = y3 = p2), void 0 !== x3 && (l2.push({ plotX: e10, plotY: null === x3 ? g2 : n10.getThreshold(x3), isNull: b3, isCliff: true }), h10.push({ plotX: e10, plotY: null === y3 ? g2 : n10.getThreshold(y3), doCurve: false }));
          }, "f");
          t10 = t10 || this.points, a10 && (t10 = this.getStackPoints(t10));
          for (let o11 = 0, r11 = t10.length; o11 < r11; ++o11) a10 || (t10[o11].leftCliff = t10[o11].rightCliff = t10[o11].leftNull = t10[o11].rightNull = void 0), i10 = t10[o11].isNull, e10 = nH(t10[o11].rectPlotX, t10[o11].plotX), s10 = a10 ? nH(t10[o11].yBottom, g2) : g2, (!i10 || u2) && (u2 || f2(o11, o11 - 1, "left"), i10 && !a10 && u2 || (l2.push(t10[o11]), h10.push({ x: o11, plotX: e10, plotY: s10 })), u2 || f2(o11, o11 + 1, "right"));
          let m2 = o10.call(this, l2, true, true);
          h10.reversed = true;
          let x2 = o10.call(this, h10, true, true), y2 = x2[0];
          y2 && "M" === y2[0] && (x2[0] = ["L", y2[1], y2[2]]);
          let b2 = m2.concat(x2);
          b2.length && b2.push(["Z"]);
          let v2 = o10.call(this, l2, false, u2);
          return this.chart.series.length > 1 && a10 && l2.some((t11) => t11.isCliff) && (b2.hasStackedCliffs = v2.hasStackedCliffs = true), b2.xMap = m2.xMap, this.areaPath = b2, v2;
        }
        getStackPoints(t10) {
          let e10 = this, i10 = [], s10 = [], o10 = this.xAxis, r10 = this.yAxis, a10 = r10.stacking.stacks[this.stackKey], n10 = {}, h10 = r10.series, l2 = h10.length, d2 = r10.options.reversedStacks ? 1 : -1, c2 = h10.indexOf(e10);
          if (t10 = t10 || this.points, this.options.stacking) {
            for (let e11 = 0; e11 < t10.length; e11++) t10[e11].leftNull = t10[e11].rightNull = void 0, n10[t10[e11].x] = t10[e11];
            nW(a10, function(t11, e11) {
              null !== t11.total && s10.push(e11);
            }), s10.sort(function(t11, e11) {
              return t11 - e11;
            });
            let p2 = h10.map((t11) => t11.visible);
            s10.forEach(function(t11, g2) {
              let u2 = 0, f2, m2;
              if (n10[t11] && !n10[t11].isNull) i10.push(n10[t11]), [-1, 1].forEach(function(i11) {
                let o11 = 1 === i11 ? "rightNull" : "leftNull", r11 = a10[s10[g2 + i11]], u3 = 0;
                if (r11) {
                  let i12 = c2;
                  for (; i12 >= 0 && i12 < l2; ) {
                    let s11 = h10[i12].index;
                    !(f2 = r11.points[s11]) && (s11 === e10.index ? n10[t11][o11] = true : p2[i12] && (m2 = a10[t11].points[s11]) && (u3 -= m2[1] - m2[0])), i12 += d2;
                  }
                }
                n10[t11][1 === i11 ? "rightCliff" : "leftCliff"] = u3;
              });
              else {
                let e11 = c2;
                for (; e11 >= 0 && e11 < l2; ) {
                  let i11 = h10[e11].index;
                  if (f2 = a10[t11].points[i11]) {
                    u2 = f2[1];
                    break;
                  }
                  e11 += d2;
                }
                u2 = nH(u2, 0), u2 = r10.translate(u2, 0, 1, 0, 1), i10.push({ isNull: true, plotX: o10.translate(t11, 0, 0, 0, 1), x: t11, plotY: u2, yBottom: u2 });
              }
            });
          }
          return i10;
        }
      };
      __name(_nX, "nX");
      let nX = _nX;
      nX.defaultOptions = nR(nN.defaultOptions, { threshold: 0, legendSymbol: "areaMarker" }), nz(nX.prototype, { singleStacks: false }), rk.registerSeriesType("area", nX);
      let { line: nF } = rk.seriesTypes, { merge: nG, pick: nj } = V;
      const _nY = class _nY extends nF {
        getPointSpline(t10, e10, i10) {
          let s10, o10, r10, a10, n10 = e10.plotX || 0, h10 = e10.plotY || 0, l2 = t10[i10 - 1], d2 = t10[i10 + 1];
          function c2(t11) {
            return t11 && !t11.isNull && false !== t11.doCurve && !e10.isCliff;
          }
          __name(c2, "c");
          if (c2(l2) && c2(d2)) {
            let t11 = l2.plotX || 0, i11 = l2.plotY || 0, c3 = d2.plotX || 0, p3 = d2.plotY || 0, g2 = 0;
            s10 = (1.5 * n10 + t11) / 2.5, o10 = (1.5 * h10 + i11) / 2.5, r10 = (1.5 * n10 + c3) / 2.5, a10 = (1.5 * h10 + p3) / 2.5, r10 !== s10 && (g2 = (a10 - o10) * (r10 - n10) / (r10 - s10) + h10 - a10), o10 += g2, a10 += g2, o10 > i11 && o10 > h10 ? (o10 = Math.max(i11, h10), a10 = 2 * h10 - o10) : o10 < i11 && o10 < h10 && (o10 = Math.min(i11, h10), a10 = 2 * h10 - o10), a10 > p3 && a10 > h10 ? (a10 = Math.max(p3, h10), o10 = 2 * h10 - a10) : a10 < p3 && a10 < h10 && (a10 = Math.min(p3, h10), o10 = 2 * h10 - a10), e10.rightContX = r10, e10.rightContY = a10, e10.controlPoints = { low: [s10, o10], high: [r10, a10] };
          }
          let p2 = ["C", nj(l2.rightContX, l2.plotX, 0), nj(l2.rightContY, l2.plotY, 0), nj(s10, n10, 0), nj(o10, h10, 0), n10, h10];
          return l2.rightContX = l2.rightContY = void 0, p2;
        }
      };
      __name(_nY, "nY");
      let nY = _nY;
      nY.defaultOptions = nG(nF.defaultOptions), rk.registerSeriesType("spline", nY);
      let nU = nY, { area: n$, area: { prototype: nV } } = rk.seriesTypes, { extend: nZ, merge: n_ } = V;
      const _nq = class _nq extends nU {
      };
      __name(_nq, "nq");
      let nq = _nq;
      nq.defaultOptions = n_(nU.defaultOptions, n$.defaultOptions), nZ(nq.prototype, { getGraphPath: nV.getGraphPath, getStackPoints: nV.getStackPoints, drawGraph: nV.drawGraph }), rk.registerSeriesType("areaspline", nq);
      let { animObject: nK } = tU, { parse: nJ } = tL, { noop: nQ } = w, { clamp: n0, crisp: n1, defined: n2, extend: n3, fireEvent: n5, isArray: n6, isNumber: n9, merge: n4, pick: n8, objectEach: n7 } = V;
      const _ht = class _ht extends r1 {
        animate(t10) {
          let e10, i10, s10 = this, o10 = this.yAxis, r10 = o10.pos, a10 = o10.reversed, n10 = s10.options, { clipOffset: h10, inverted: l2 } = this.chart, d2 = {}, c2 = l2 ? "translateX" : "translateY";
          t10 && h10 ? (d2.scaleY = 1e-3, i10 = n0(o10.toPixels(n10.threshold || 0), r10, r10 + o10.len), l2 ? d2.translateX = (i10 += a10 ? -Math.floor(h10[0]) : Math.ceil(h10[2])) - o10.len : d2.translateY = i10 += a10 ? Math.ceil(h10[0]) : -Math.floor(h10[2]), s10.clipBox && s10.setClip(), s10.group.attr(d2)) : (e10 = Number(s10.group.attr(c2)), s10.group.animate({ scaleY: 1 }, n3(nK(s10.options.animation), { step: /* @__PURE__ */ __name(function(t11, i11) {
            s10.group && (d2[c2] = e10 + i11.pos * (r10 - e10), s10.group.attr(d2));
          }, "step") })));
        }
        init(t10, e10) {
          super.init.apply(this, arguments);
          let i10 = this;
          (t10 = i10.chart).hasRendered && t10.series.forEach(function(t11) {
            t11.type === i10.type && (t11.isDirty = true);
          });
        }
        getColumnMetrics() {
          let t10 = this, e10 = t10.options, i10 = t10.xAxis, s10 = t10.yAxis, o10 = i10.options.reversedStacks, r10 = i10.reversed && !o10 || !i10.reversed && o10, a10 = {}, n10, h10 = 0;
          false === e10.grouping ? h10 = 1 : t10.chart.series.forEach(function(e11) {
            let i11, o11 = e11.yAxis, r11 = e11.options;
            e11.type === t10.type && e11.reserveSpace() && s10.len === o11.len && s10.pos === o11.pos && (r11.stacking && "group" !== r11.stacking ? (void 0 === a10[n10 = e11.stackKey] && (a10[n10] = h10++), i11 = a10[n10]) : false !== r11.grouping && (i11 = h10++), e11.columnIndex = i11);
          });
          let l2 = Math.min(Math.abs(i10.transA) * (!i10.brokenAxis?.hasBreaks && i10.ordinal?.slope || e10.pointRange || i10.closestPointRange || i10.tickInterval || 1), i10.len), d2 = l2 * e10.groupPadding, c2 = (l2 - 2 * d2) / (h10 || 1), p2 = Math.min(e10.maxPointWidth || i10.len, n8(e10.pointWidth, c2 * (1 - 2 * e10.pointPadding))), g2 = (t10.columnIndex || 0) + +!!r10;
          return t10.columnMetrics = { width: p2, offset: (c2 - p2) / 2 + (d2 + g2 * c2 - l2 / 2) * (r10 ? -1 : 1), paddedWidth: c2, columnCount: h10 }, t10.columnMetrics;
        }
        crispCol(t10, e10, i10, s10) {
          let o10 = this.borderWidth, r10 = this.chart.inverted;
          return s10 = n1(e10 + s10, o10, r10) - (e10 = n1(e10, o10, r10)), this.options.crisp && (i10 = n1(t10 + i10, o10) - (t10 = n1(t10, o10))), { x: t10, y: e10, width: i10, height: s10 };
        }
        adjustForMissingColumns(t10, e10, i10, s10) {
          if (!i10.isNull && s10.columnCount > 1) {
            let o10 = this.xAxis.series.filter((t11) => t11.visible).map((t11) => t11.index), r10 = 0, a10 = 0;
            n7(this.xAxis.stacking?.stacks, (t11) => {
              let e11 = "number" == typeof i10.x ? t11[i10.x.toString()]?.points : void 0, s11 = e11?.[this.index], n11 = {};
              if (e11 && n6(s11)) {
                let t12 = this.index, i11 = Object.keys(e11).filter((t13) => !t13.match(",") && e11[t13] && e11[t13].length > 1).map(parseFloat).filter((t13) => -1 !== o10.indexOf(t13)).filter((e12) => {
                  let i12 = this.chart.series[e12].options, s12 = i12.stacking && i12.stack;
                  if (n2(s12)) {
                    if (n9(n11[s12])) return t12 === e12 && (t12 = n11[s12]), false;
                    n11[s12] = e12;
                  }
                  return true;
                }).sort((t13, e12) => e12 - t13);
                r10 = i11.indexOf(t12), a10 = i11.length;
              }
            }), r10 = this.xAxis.reversed ? a10 - 1 - r10 : r10;
            let n10 = (a10 - 1) * s10.paddedWidth + e10;
            t10 = (i10.plotX || 0) + n10 / 2 - e10 - r10 * s10.paddedWidth;
          }
          return t10;
        }
        translate() {
          let t10 = this, e10 = t10.chart, i10 = t10.options, s10 = t10.dense = t10.closestPointRange * t10.xAxis.transA < 2, o10 = t10.borderWidth = n8(i10.borderWidth, +!s10), r10 = t10.xAxis, a10 = t10.yAxis, n10 = i10.threshold, h10 = n8(i10.minPointLength, 5), l2 = t10.getColumnMetrics(), d2 = l2.width, c2 = t10.pointXOffset = l2.offset, p2 = t10.dataMin, g2 = t10.dataMax, u2 = t10.translatedThreshold = a10.getThreshold(n10), f2 = t10.barW = Math.max(d2, 1 + 2 * o10);
          i10.pointPadding && i10.crisp && (f2 = Math.ceil(f2)), r1.prototype.translate.apply(t10), t10.points.forEach(function(s11) {
            let o11 = n8(s11.yBottom, u2), m2 = 999 + Math.abs(o11), x2 = s11.plotX || 0, y2 = n0(s11.plotY, -m2, a10.len + m2), b2, v2 = Math.min(y2, o11), k2 = Math.max(y2, o11) - v2, w2 = d2, M2 = x2 + c2, S2 = f2;
            h10 && Math.abs(k2) < h10 && (k2 = h10, b2 = !a10.reversed && !s11.negative || a10.reversed && s11.negative, n9(n10) && n9(g2) && s11.y === n10 && g2 <= n10 && (a10.min || 0) < n10 && (p2 !== g2 || (a10.max || 0) <= n10) && (b2 = !b2, s11.negative = !s11.negative), v2 = Math.abs(v2 - u2) > h10 ? o11 - h10 : u2 - (b2 ? h10 : 0)), n2(s11.options.pointWidth) && (M2 -= Math.round(((w2 = S2 = Math.ceil(s11.options.pointWidth)) - d2) / 2)), i10.centerInCategory && (M2 = t10.adjustForMissingColumns(M2, w2, s11, l2)), s11.barX = M2, s11.pointWidth = w2, s11.tooltipPos = e10.inverted ? [n0(a10.len + a10.pos - e10.plotLeft - y2, a10.pos - e10.plotLeft, a10.len + a10.pos - e10.plotLeft), r10.len + r10.pos - e10.plotTop - M2 - S2 / 2, k2] : [r10.left - e10.plotLeft + M2 + S2 / 2, n0(y2 + a10.pos - e10.plotTop, a10.pos - e10.plotTop, a10.len + a10.pos - e10.plotTop), k2], s11.shapeType = t10.pointClass.prototype.shapeType || "roundedRect", s11.shapeArgs = t10.crispCol(M2, v2, S2, s11.isNull ? 0 : k2);
          }), n5(this, "afterColumnTranslate");
        }
        drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
        }
        pointAttribs(t10, e10) {
          let i10 = this.options, s10 = this.pointAttrToOptions || {}, o10 = s10.stroke || "borderColor", r10 = s10["stroke-width"] || "borderWidth", a10, n10, h10, l2 = t10 && t10.color || this.color, d2 = t10 && t10[o10] || i10[o10] || l2, c2 = t10 && t10.options.dashStyle || i10.dashStyle, p2 = t10 && t10[r10] || i10[r10] || this[r10] || 0, g2 = t10?.isNull && i10.nullInteraction ? 0 : t10?.opacity ?? i10.opacity ?? 1;
          t10 && this.zones.length && (n10 = t10.getZone(), l2 = t10.options.color || n10 && (n10.color || t10.nonZonedColor) || this.color, n10 && (d2 = n10.borderColor || d2, c2 = n10.dashStyle || c2, p2 = n10.borderWidth || p2)), e10 && t10 && (h10 = (a10 = n4(i10.states[e10], t10.options.states && t10.options.states[e10] || {})).brightness, l2 = a10.color || void 0 !== h10 && nJ(l2).brighten(a10.brightness).get() || l2, d2 = a10[o10] || d2, p2 = a10[r10] || p2, c2 = a10.dashStyle || c2, g2 = n8(a10.opacity, g2));
          let u2 = { fill: l2, stroke: d2, "stroke-width": p2, opacity: g2 };
          return c2 && (u2.dashstyle = c2), u2;
        }
        drawPoints(t10 = this.points) {
          let e10, i10 = this, s10 = this.chart, o10 = i10.options, r10 = o10.nullInteraction, a10 = s10.renderer, n10 = o10.animationLimit || 250;
          t10.forEach(function(t11) {
            let h10 = t11.plotY, l2 = t11.graphic, d2 = !!l2, c2 = l2 && s10.pointCount < n10 ? "animate" : "attr";
            n9(h10) && (null !== t11.y || r10) ? (e10 = t11.shapeArgs, l2 && t11.hasNewShapeType() && (l2 = l2.destroy()), i10.enabledDataSorting && (t11.startXPos = i10.xAxis.reversed ? -(e10 && e10.width || 0) : i10.xAxis.width), !l2 && (t11.graphic = l2 = a10[t11.shapeType](e10).add(t11.group || i10.group), l2 && i10.enabledDataSorting && s10.hasRendered && s10.pointCount < n10 && (l2.attr({ x: t11.startXPos }), d2 = true, c2 = "animate")), l2 && d2 && l2[c2](n4(e10)), s10.styledMode || l2[c2](i10.pointAttribs(t11, t11.selected && "select")).shadow(false !== t11.allowShadow && o10.shadow), l2 && (l2.addClass(t11.getClassName(), true), l2.attr({ visibility: t11.visible ? "inherit" : "hidden" }))) : l2 && (t11.graphic = l2.destroy());
          });
        }
        drawTracker(t10 = this.points) {
          let e10, i10 = this, s10 = i10.chart, o10 = s10.pointer, r10 = /* @__PURE__ */ __name(function(t11) {
            o10?.normalize(t11);
            let e11 = o10?.getPointFromEvent(t11);
            o10 && e11 && i10.options.enableMouseTracking && (s10.isInsidePlot(t11.chartX - s10.plotLeft, t11.chartY - s10.plotTop, { visiblePlotOnly: true }) || o10?.inClass(t11.target, "highcharts-data-label")) && (o10.isDirectTouch = true, e11.onMouseOver(t11));
          }, "r");
          t10.forEach(function(t11) {
            e10 = n6(t11.dataLabels) ? t11.dataLabels : t11.dataLabel ? [t11.dataLabel] : [], t11.graphic && (t11.graphic.element.point = t11), e10.forEach(function(e11) {
              (e11.div || e11.element).point = t11;
            });
          }), i10._hasTracking || (i10.trackerGroups.forEach(function(t11) {
            i10[t11] && (i10[t11].addClass("highcharts-tracker").on("mouseover", r10).on("mouseout", function(t12) {
              o10?.onTrackerMouseOut(t12);
            }).on("touchstart", r10), !s10.styledMode && i10.options.cursor && i10[t11].css({ cursor: i10.options.cursor }));
          }), i10._hasTracking = true), n5(this, "afterDrawTracker");
        }
        remove() {
          let t10 = this, e10 = t10.chart;
          e10.hasRendered && e10.series.forEach(function(e11) {
            e11.type === t10.type && (e11.isDirty = true);
          }), r1.prototype.remove.apply(t10, arguments);
        }
      };
      __name(_ht, "ht");
      let ht = _ht;
      ht.defaultOptions = n4(r1.defaultOptions, { borderRadius: 3, centerInCategory: false, groupPadding: 0.2, marker: null, pointPadding: 0.1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: false, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: true, stickyTracking: false, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" }), n3(ht.prototype, { directTouch: true, getSymbol: nQ, negStacks: true, trackerGroups: ["group", "dataLabelsGroup"] }), rk.registerSeriesType("column", ht);
      let he = ht, { getDeferredAnimation: hi } = tU, { format: hs } = ep, { defined: ho, extend: hr, fireEvent: ha, getAlignFactor: hn, isArray: hh, isString: hl, merge: hd, objectEach: hc, pick: hp, pInt: hg, splat: hu } = V;
      !(function(t10) {
        function e10() {
          return h10(this).some((t11) => t11?.enabled);
        }
        __name(e10, "e");
        function i10(t11, e11, i11, s11, o11) {
          let { chart: r11, enabledDataSorting: a11 } = this, n11 = this.isCartesian && r11.inverted, h11 = t11.plotX, l3 = t11.plotY, d2 = i11.rotation || 0, c2 = ho(h11) && ho(l3) && r11.isInsidePlot(h11, Math.round(l3), { inverted: n11, paneCoordinates: true, series: this }), p2 = 0 === d2 && "justify" === hp(i11.overflow, a11 ? "none" : "justify"), g2 = this.visible && false !== t11.visible && ho(h11) && (t11.series.forceDL || a11 && !p2 || c2 || hp(i11.inside, !!this.options.stacking) && s11 && r11.isInsidePlot(h11, n11 ? s11.x + 1 : s11.y + s11.height - 1, { inverted: n11, paneCoordinates: true, series: this })), u2 = t11.pos();
          if (g2 && u2) {
            var f2;
            let h12 = e11.getBBox(), l4 = e11.getBBox(void 0, 0);
            if (s11 = hr({ x: u2[0], y: Math.round(u2[1]), width: 0, height: 0 }, s11 || {}), "plotEdges" === i11.alignTo && this.isCartesian && (s11[n11 ? "x" : "y"] = 0, s11[n11 ? "width" : "height"] = this.yAxis?.len || 0), hr(i11, { width: h12.width, height: h12.height }), f2 = s11, a11 && this.xAxis && !p2 && this.setDataLabelStartPos(t11, e11, o11, c2, f2), e11.align(hd(i11, { width: l4.width, height: l4.height }), false, s11, false), e11.alignAttr.x += hn(i11.align) * (l4.width - h12.width), e11.alignAttr.y += hn(i11.verticalAlign) * (l4.height - h12.height), e11[e11.placed ? "animate" : "attr"]({ "text-align": e11.alignAttr["text-align"] || "center", x: e11.alignAttr.x + (h12.width - l4.width) / 2, y: e11.alignAttr.y + (h12.height - l4.height) / 2, rotationOriginX: (e11.width || 0) / 2, rotationOriginY: (e11.height || 0) / 2 }), p2 && s11.height >= 0) this.justifyDataLabel(e11, i11, e11.alignAttr, h12, s11, o11);
            else if (hp(i11.crop, true)) {
              let { x: t12, y: i12 } = e11.alignAttr;
              g2 = r11.isInsidePlot(t12, i12, { paneCoordinates: true, series: this }) && r11.isInsidePlot(t12 + h12.width - 1, i12 + h12.height - 1, { paneCoordinates: true, series: this });
            }
            i11.shape && !d2 && e11[o11 ? "attr" : "animate"]({ anchorX: u2[0], anchorY: u2[1] });
          }
          o11 && a11 && (e11.placed = false), g2 || a11 && !p2 ? (e11.show(), e11.placed = true) : (e11.hide(), e11.placed = false);
        }
        __name(i10, "i");
        function s10() {
          return this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", this.options.dataLabels.zIndex || 6, this.chart.dataLabelsGroup);
        }
        __name(s10, "s");
        function o10(t11) {
          let e11 = this.hasRendered || 0, i11 = this.initDataLabelsGroup().attr({ opacity: +e11 });
          return !e11 && i11 && (this.visible && i11.show(), this.options.animation ? i11.animate({ opacity: 1 }, t11) : i11.attr({ opacity: 1 })), i11;
        }
        __name(o10, "o");
        function r10(t11) {
          let e11;
          t11 = t11 || this.points;
          let i11 = this, s11 = i11.chart, o11 = i11.options, r11 = s11.renderer, { backgroundColor: a11, plotBackgroundColor: l3 } = s11.options.chart, d2 = r11.getContrast(hl(l3) && l3 || hl(a11) && a11 || "#000000"), c2 = h10(i11), { animation: p2, defer: g2 } = c2[0], u2 = g2 ? hi(s11, p2, i11) : { defer: 0, duration: 0 };
          ha(this, "drawDataLabels"), i11.hasDataLabels?.() && (e11 = this.initDataLabels(u2), t11.forEach((t12) => {
            let a12 = t12.dataLabels || [], h11 = t12.color || i11.color;
            hu(n10(c2, t12.dlOptions || t12.options?.dataLabels)).forEach((n11, l5) => {
              let c3 = n11.enabled && (t12.visible || t12.dataLabelOnHidden) && (!t12.isNull || t12.dataLabelOnNull) && (function(t13, e12) {
                let i12 = e12.filter;
                if (i12) {
                  let e13 = i12.operator, s12 = t13[i12.property], o12 = i12.value;
                  return ">" === e13 && s12 > o12 || "<" === e13 && s12 < o12 || ">=" === e13 && s12 >= o12 || "<=" === e13 && s12 <= o12 || "==" === e13 && s12 == o12 || "===" === e13 && s12 === o12 || "!=" === e13 && s12 != o12 || "!==" === e13 && s12 !== o12 || false;
                }
                return true;
              })(t12, n11), { backgroundColor: p3, borderColor: g3, distance: u3, style: f2 = {} } = n11, m2, x2, y2, b2 = {}, v2 = a12[l5], k2 = !v2, w2;
              c3 && (x2 = ho(m2 = hp(n11[t12.formatPrefix + "Format"], n11.format)) ? hs(m2, t12, s11) : (n11[t12.formatPrefix + "Formatter"] || n11.formatter).call(t12, n11), y2 = n11.rotation, !s11.styledMode && (f2.color = hp(n11.color, f2.color, hl(i11.color) ? i11.color : void 0, "#000000"), "contrast" === f2.color ? ("none" !== p3 && (w2 = p3), t12.contrastColor = r11.getContrast("auto" !== w2 && hl(w2) && w2 || (hl(h11) ? h11 : "")), f2.color = w2 || !ho(u3) && n11.inside || 0 > hg(u3 || 0) || o11.stacking ? t12.contrastColor : d2) : delete t12.contrastColor, o11.cursor && (f2.cursor = o11.cursor)), b2 = { r: n11.borderRadius || 0, rotation: y2, padding: n11.padding, zIndex: 1 }, s11.styledMode || (b2.fill = "auto" === p3 ? t12.color : p3, b2.stroke = "auto" === g3 ? t12.color : g3, b2["stroke-width"] = n11.borderWidth), hc(b2, (t13, e12) => {
                void 0 === t13 && delete b2[e12];
              })), !v2 || c3 && ho(x2) && !!(v2.div || v2.text?.foreignObject) == !!n11.useHTML && (v2.rotation && n11.rotation || v2.rotation === n11.rotation) || (v2 = void 0, k2 = true), c3 && ho(x2) && "" !== x2 && (v2 ? b2.text = x2 : (v2 = r11.label(x2, 0, 0, n11.shape, void 0, void 0, n11.useHTML, void 0, "data-label")).addClass(" highcharts-data-label-color-" + t12.colorIndex + " " + (n11.className || "") + (n11.useHTML ? " highcharts-tracker" : "")), v2 && (v2.options = n11, v2.attr(b2), s11.styledMode ? f2.width && v2.css({ width: f2.width, textOverflow: f2.textOverflow, whiteSpace: f2.whiteSpace }) : v2.css(f2).shadow(n11.shadow), ha(v2, "beforeAddingDataLabel", { labelOptions: n11, point: t12 }), v2.added || v2.add(e11), i11.alignDataLabel(t12, v2, n11, void 0, k2), v2.isActive = true, a12[l5] && a12[l5] !== v2 && a12[l5].destroy(), a12[l5] = v2));
            });
            let l4 = a12.length;
            for (; l4--; ) a12[l4]?.isActive ? a12[l4].isActive = false : (a12[l4]?.destroy(), a12.splice(l4, 1));
            t12.dataLabel = a12[0], t12.dataLabels = a12;
          })), ha(this, "afterDrawDataLabels");
        }
        __name(r10, "r");
        function a10(t11, e11, i11, s11, o11, r11) {
          let a11 = this.chart, n11 = e11.align, h11 = e11.verticalAlign, l3 = t11.box ? 0 : t11.padding || 0, d2 = a11.inverted ? this.yAxis : this.xAxis, c2 = d2 ? d2.left - a11.plotLeft : 0, p2 = a11.inverted ? this.xAxis : this.yAxis, g2 = p2 ? p2.top - a11.plotTop : 0, { x: u2 = 0, y: f2 = 0 } = e11, m2, x2;
          return (m2 = (i11.x || 0) + l3 + c2) < 0 && ("right" === n11 && u2 >= 0 ? (e11.align = "left", e11.inside = true) : u2 -= m2, x2 = true), (m2 = (i11.x || 0) + s11.width - l3 + c2) > a11.plotWidth && ("left" === n11 && u2 <= 0 ? (e11.align = "right", e11.inside = true) : u2 += a11.plotWidth - m2, x2 = true), (m2 = i11.y + l3 + g2) < 0 && ("bottom" === h11 && f2 >= 0 ? (e11.verticalAlign = "top", e11.inside = true) : f2 -= m2, x2 = true), (m2 = (i11.y || 0) + s11.height - l3 + g2) > a11.plotHeight && ("top" === h11 && f2 <= 0 ? (e11.verticalAlign = "bottom", e11.inside = true) : f2 += a11.plotHeight - m2, x2 = true), x2 && (e11.x = u2, e11.y = f2, t11.placed = !r11, t11.align(e11, void 0, o11)), x2;
        }
        __name(a10, "a");
        function n10(t11, e11) {
          let i11 = [], s11;
          if (hh(t11) && !hh(e11)) i11 = t11.map(function(t12) {
            return hd(t12, e11);
          });
          else if (hh(e11) && !hh(t11)) i11 = e11.map(function(e12) {
            return hd(t11, e12);
          });
          else if (hh(t11) || hh(e11)) {
            if (hh(t11) && hh(e11)) for (s11 = Math.max(t11.length, e11.length); s11--; ) i11[s11] = hd(t11[s11], e11[s11]);
          } else i11 = hd(t11, e11);
          return i11;
        }
        __name(n10, "n");
        function h10(t11) {
          let e11 = t11.chart.options.plotOptions;
          return hu(n10(n10(e11?.series?.dataLabels, e11?.[t11.type]?.dataLabels), t11.options.dataLabels));
        }
        __name(h10, "h");
        function l2(t11, e11, i11, s11, o11) {
          let r11 = this.chart, a11 = r11.inverted, n11 = this.xAxis, h11 = n11.reversed, l3 = ((a11 ? e11.height : e11.width) || 0) / 2, d2 = t11.pointWidth, c2 = d2 ? d2 / 2 : 0;
          e11.startXPos = a11 ? o11.x : h11 ? -l3 - c2 : n11.width - l3 + c2, e11.startYPos = a11 ? h11 ? this.yAxis.height - l3 + c2 : -l3 - c2 : o11.y, s11 ? "hidden" === e11.visibility && (e11.show(), e11.attr({ opacity: 0 }).animate({ opacity: 1 })) : e11.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, e11.hide), r11.hasRendered && (i11 && e11.attr({ x: e11.startXPos, y: e11.startYPos }), e11.placed = true);
        }
        __name(l2, "l");
        t10.compose = function(t11) {
          let h11 = t11.prototype;
          h11.initDataLabels || (h11.initDataLabels = o10, h11.initDataLabelsGroup = s10, h11.alignDataLabel = i10, h11.drawDataLabels = r10, h11.justifyDataLabel = a10, h11.mergeArrays = n10, h11.setDataLabelStartPos = l2, h11.hasDataLabels = e10);
        };
      })(u || (u = {}));
      let hf = u, { composed: hm } = w, { series: hx } = rk, { merge: hy, pushUnique: hb } = V;
      !(function(t10) {
        function e10(t11, e11, i10, s10, o10) {
          let { chart: r10, options: a10 } = this, n10 = r10.inverted, h10 = this.xAxis?.len || r10.plotSizeX || 0, l2 = this.yAxis?.len || r10.plotSizeY || 0, d2 = t11.dlBox || t11.shapeArgs, c2 = t11.below ?? (t11.plotY || 0) > (this.translatedThreshold ?? l2), p2 = i10.inside ?? !!a10.stacking;
          if (d2) {
            if (s10 = hy(d2), "allow" !== i10.overflow || false !== i10.crop || false !== a10.clip) {
              s10.y < 0 && (s10.height += s10.y, s10.y = 0);
              let t12 = s10.y + s10.height - l2;
              t12 > 0 && t12 < s10.height - 1 && (s10.height -= t12);
            }
            n10 && (s10 = { x: l2 - s10.y - s10.height, y: h10 - s10.x - s10.width, width: s10.height, height: s10.width }), p2 || (n10 ? (s10.x += c2 ? 0 : s10.width, s10.width = 0) : (s10.y += c2 ? s10.height : 0, s10.height = 0));
          }
          i10.align ?? (i10.align = !n10 || p2 ? "center" : c2 ? "right" : "left"), i10.verticalAlign ?? (i10.verticalAlign = n10 || p2 ? "middle" : c2 ? "top" : "bottom"), hx.prototype.alignDataLabel.call(this, t11, e11, i10, s10, o10), i10.inside && t11.contrastColor && e11.css({ color: t11.contrastColor });
        }
        __name(e10, "e");
        t10.compose = function(t11) {
          hf.compose(hx), hb(hm, "ColumnDataLabel") && (t11.prototype.alignDataLabel = e10);
        };
      })(f || (f = {}));
      let hv = f, { extend: hk, merge: hw } = V;
      const _hM = class _hM extends he {
      };
      __name(_hM, "hM");
      let hM = _hM;
      hM.defaultOptions = hw(he.defaultOptions, {}), hk(hM.prototype, { inverted: true }), rk.registerSeriesType("bar", hM);
      let { column: hS, line: hT } = rk.seriesTypes, { addEvent: hC, extend: hA, merge: hP } = V;
      const _hL = class _hL extends hT {
        applyJitter() {
          let t10 = this, e10 = this.options.jitter, i10 = this.points.length;
          e10 && this.points.forEach(function(s10, o10) {
            ["x", "y"].forEach(function(r10, a10) {
              if (e10[r10] && !s10.isNull) {
                let n10 = `plot${r10.toUpperCase()}`, h10 = t10[`${r10}Axis`], l2 = e10[r10] * h10.transA;
                if (h10 && !h10.logarithmic) {
                  let t11 = Math.max(0, (s10[n10] || 0) - l2), e11 = Math.min(h10.len, (s10[n10] || 0) + l2);
                  s10[n10] = t11 + (e11 - t11) * (function(t12) {
                    let e12 = 1e4 * Math.sin(t12);
                    return e12 - Math.floor(e12);
                  })(o10 + a10 * i10), "x" === r10 && (s10.clientX = s10.plotX);
                }
              }
            });
          });
        }
        drawGraph() {
          this.options.lineWidth ? super.drawGraph() : this.graph && (this.graph = this.graph.destroy());
        }
      };
      __name(_hL, "hL");
      let hL = _hL;
      hL.defaultOptions = hP(hT.defaultOptions, { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: true }, tooltip: { headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.8em"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } }), hA(hL.prototype, { drawTracker: hS.prototype.drawTracker, sorted: false, requireSorting: false, noSharedTooltip: true, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"] }), hC(hL, "afterTranslate", function() {
        this.applyJitter();
      }), rk.registerSeriesType("scatter", hL);
      let { deg2rad: hO } = w, { fireEvent: hE, isNumber: hI, pick: hD, relativeLength: hB } = V;
      !(function(t10) {
        t10.getCenter = function() {
          let t11 = this.options, e10 = this.chart, i10 = 2 * (t11.slicedOffset || 0), s10 = e10.plotWidth - 2 * i10, o10 = e10.plotHeight - 2 * i10, r10 = t11.center, a10 = Math.min(s10, o10), n10 = t11.thickness, h10, l2 = t11.size, d2 = t11.innerSize || 0, c2, p2;
          "string" == typeof l2 && (l2 = parseFloat(l2)), "string" == typeof d2 && (d2 = parseFloat(d2));
          let g2 = [hD(r10?.[0], "50%"), hD(r10?.[1], "50%"), hD(l2 && l2 < 0 ? void 0 : t11.size, "100%"), hD(d2 && d2 < 0 ? void 0 : t11.innerSize || 0, "0%")];
          for (!e10.angular || this instanceof r1 || (g2[3] = 0), c2 = 0; c2 < 4; ++c2) p2 = g2[c2], h10 = c2 < 2 || 2 === c2 && /%$/.test(p2), g2[c2] = hB(p2, [s10, o10, a10, g2[2]][c2]) + (h10 ? i10 : 0);
          return g2[3] > g2[2] && (g2[3] = g2[2]), hI(n10) && 2 * n10 < g2[2] && n10 > 0 && (g2[3] = g2[2] - 2 * n10), hE(this, "afterGetCenter", { positions: g2 }), g2;
        }, t10.getStartAndEndRadians = function(t11, e10) {
          let i10 = hI(t11) ? t11 : 0, s10 = hI(e10) && e10 > i10 && e10 - i10 < 360 ? e10 : i10 + 360;
          return { start: hO * (i10 + -90), end: hO * (s10 + -90) };
        };
      })(m || (m = {}));
      let hN = m, { setAnimation: hz } = tU, { addEvent: hR, defined: hW, extend: hH, isNumber: hX, pick: hF, relativeLength: hG } = V;
      const _hj = class _hj extends oK {
        getConnectorPath(t10) {
          let e10 = t10.dataLabelPosition, i10 = t10.options || {}, s10 = i10.connectorShape, o10 = this.connectorShapes[s10] || s10;
          return e10 && o10.call(this, __spreadProps(__spreadValues({}, e10.computed), { alignment: e10.alignment }), e10.connectorPosition, i10) || [];
        }
        getTranslate() {
          return this.sliced && this.slicedTranslation || { translateX: 0, translateY: 0 };
        }
        haloPath(t10) {
          let e10 = this.shapeArgs;
          return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e10.x, e10.y, e10.r + t10, e10.r + t10, { innerR: e10.r - 1, start: e10.start, end: e10.end, borderRadius: e10.borderRadius });
        }
        constructor(t10, e10, i10) {
          super(t10, e10, i10), this.half = 0, this.name ?? (this.name = t10.chart.options.lang.pieSliceName);
          let s10 = /* @__PURE__ */ __name((t11) => {
            this.slice("select" === t11.type);
          }, "s");
          hR(this, "select", s10), hR(this, "unselect", s10);
        }
        isValid() {
          return hX(this.y) && this.y >= 0;
        }
        setVisible(t10, e10 = true) {
          t10 !== this.visible && this.update({ visible: t10 ?? !this.visible }, e10, void 0, false);
        }
        slice(t10, e10, i10) {
          let s10 = this.series;
          hz(i10, s10.chart), e10 = hF(e10, true), this.sliced = this.options.sliced = t10 = hW(t10) ? t10 : !this.sliced, s10.options.data[s10.data.indexOf(this)] = this.options, this.graphic && this.graphic.animate(this.getTranslate());
        }
      };
      __name(_hj, "hj");
      let hj = _hj;
      hH(hj.prototype, { connectorShapes: { fixedOffset: /* @__PURE__ */ __name(function(t10, e10, i10) {
        let s10 = e10.breakAt, o10 = e10.touchingSliceAt, r10 = i10.softConnector ? ["C", t10.x + ("left" === t10.alignment ? -5 : 5), t10.y, 2 * s10.x - o10.x, 2 * s10.y - o10.y, s10.x, s10.y] : ["L", s10.x, s10.y];
        return [["M", t10.x, t10.y], r10, ["L", o10.x, o10.y]];
      }, "fixedOffset"), straight: /* @__PURE__ */ __name(function(t10, e10) {
        let i10 = e10.touchingSliceAt;
        return [["M", t10.x, t10.y], ["L", i10.x, i10.y]];
      }, "straight"), crookedLine: /* @__PURE__ */ __name(function(t10, e10, i10) {
        let { angle: s10 = this.angle || 0, breakAt: o10, touchingSliceAt: r10 } = e10, { series: a10 } = this, [n10, h10, l2] = a10.center, d2 = l2 / 2, { plotLeft: c2, plotWidth: p2 } = a10.chart, g2 = "left" === t10.alignment, { x: u2, y: f2 } = t10, m2 = o10.x;
        if (i10.crookDistance) {
          let t11 = hG(i10.crookDistance, 1);
          m2 = g2 ? n10 + d2 + (p2 + c2 - n10 - d2) * (1 - t11) : c2 + (n10 - d2) * t11;
        } else m2 = n10 + (h10 - f2) * Math.tan(s10 - Math.PI / 2);
        let x2 = [["M", u2, f2]];
        return (g2 ? m2 <= u2 && m2 >= o10.x : m2 >= u2 && m2 <= o10.x) && x2.push(["L", m2, f2]), x2.push(["L", o10.x, o10.y], ["L", r10.x, r10.y]), x2;
      }, "crookedLine") } });
      let { getStartAndEndRadians: hY } = hN, { noop: hU } = w, { clamp: h$, extend: hV, fireEvent: hZ, merge: h_, pick: hq } = V;
      const _hK = class _hK extends r1 {
        animate(t10) {
          let e10 = this, i10 = e10.points, s10 = e10.startAngleRad;
          t10 || i10.forEach(function(t11) {
            let i11 = t11.graphic, o10 = t11.shapeArgs;
            i11 && o10 && (i11.attr({ r: hq(t11.startR, e10.center && e10.center[3] / 2), start: s10, end: s10 }), i11.animate({ r: o10.r, start: o10.start, end: o10.end }, e10.options.animation));
          });
        }
        drawEmpty() {
          let t10, e10, i10 = this.startAngleRad, s10 = this.endAngleRad, o10 = this.options;
          0 === this.total && this.center ? (t10 = this.center[0], e10 = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(t10, e10, this.center[1] / 2, 0, i10, s10).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({ d: is.arc(t10, e10, this.center[2] / 2, 0, { start: i10, end: s10, innerR: this.center[3] / 2 }) }), this.chart.styledMode || this.graph.attr({ "stroke-width": o10.borderWidth, fill: o10.fillColor || "none", stroke: o10.color || "#cccccc" })) : this.graph && (this.graph = this.graph.destroy());
        }
        drawPoints() {
          let t10 = this.chart.renderer;
          this.points.forEach(function(e10) {
            e10.graphic && e10.hasNewShapeType() && (e10.graphic = e10.graphic.destroy()), e10.graphic || (e10.graphic = t10[e10.shapeType](e10.shapeArgs).add(e10.series.group), e10.delayedRendering = true);
          });
        }
        generatePoints() {
          super.generatePoints(), this.updateTotals();
        }
        getX(t10, e10, i10, s10) {
          let o10 = this.center, r10 = this.radii ? this.radii[i10.index] || 0 : o10[2] / 2, a10 = s10.dataLabelPosition, n10 = a10?.distance || 0, h10 = Math.asin(h$((t10 - o10[1]) / (r10 + n10), -1, 1));
          return o10[0] + Math.cos(h10) * (r10 + n10) * (e10 ? -1 : 1) + (n10 > 0 ? (e10 ? -1 : 1) * (s10.padding || 0) : 0);
        }
        hasData() {
          return this.points.some((t10) => t10.visible);
        }
        redrawPoints() {
          let t10, e10, i10, s10, o10 = this, r10 = o10.chart;
          this.drawEmpty(), o10.group && !r10.styledMode && o10.group.shadow(o10.options.shadow), o10.points.forEach(function(a10) {
            let n10 = {};
            e10 = a10.graphic, !a10.isNull && e10 ? (s10 = a10.shapeArgs, t10 = a10.getTranslate(), r10.styledMode || (i10 = o10.pointAttribs(a10, a10.selected && "select")), a10.delayedRendering ? (e10.setRadialReference(o10.center).attr(s10).attr(t10), r10.styledMode || e10.attr(i10).attr({ "stroke-linejoin": "round" }), a10.delayedRendering = false) : (e10.setRadialReference(o10.center), r10.styledMode || h_(true, n10, i10), h_(true, n10, s10, t10), e10.animate(n10)), e10.attr({ visibility: a10.visible ? "inherit" : "hidden" }), e10.addClass(a10.getClassName(), true)) : e10 && (a10.graphic = e10.destroy());
          });
        }
        sortByAngle(t10, e10) {
          t10.sort(function(t11, i10) {
            return void 0 !== t11.angle && (i10.angle - t11.angle) * e10;
          });
        }
        translate(t10) {
          hZ(this, "translate"), this.generatePoints();
          let e10 = this.options, i10 = e10.slicedOffset, s10 = hY(e10.startAngle, e10.endAngle), o10 = this.startAngleRad = s10.start, r10 = (this.endAngleRad = s10.end) - o10, a10 = this.points, n10 = e10.ignoreHiddenPoint, h10 = a10.length, l2, d2, c2, p2, g2, u2, f2, m2 = 0;
          for (t10 || (this.center = t10 = this.getCenter()), u2 = 0; u2 < h10; u2++) {
            f2 = a10[u2], l2 = o10 + m2 * r10, f2.isValid() && (!n10 || f2.visible) && (m2 += f2.percentage / 100), d2 = o10 + m2 * r10;
            let e11 = { x: t10[0], y: t10[1], r: t10[2] / 2, innerR: t10[3] / 2, start: Math.round(1e3 * l2) / 1e3, end: Math.round(1e3 * d2) / 1e3 };
            f2.shapeType = "arc", f2.shapeArgs = e11, (c2 = (d2 + l2) / 2) > 1.5 * Math.PI ? c2 -= 2 * Math.PI : c2 < -Math.PI / 2 && (c2 += 2 * Math.PI), f2.slicedTranslation = { translateX: Math.round(Math.cos(c2) * i10), translateY: Math.round(Math.sin(c2) * i10) }, p2 = Math.cos(c2) * t10[2] / 2, g2 = Math.sin(c2) * t10[2] / 2, f2.tooltipPos = [t10[0] + 0.7 * p2, t10[1] + 0.7 * g2], f2.half = +(c2 < -Math.PI / 2 || c2 > Math.PI / 2), f2.angle = c2;
          }
          hZ(this, "afterTranslate");
        }
        updateTotals() {
          let t10 = this.points, e10 = t10.length, i10 = this.options.ignoreHiddenPoint, s10, o10, r10 = 0;
          for (s10 = 0; s10 < e10; s10++) (o10 = t10[s10]).isValid() && (!i10 || o10.visible) && (r10 += o10.y);
          for (s10 = 0, this.total = r10; s10 < e10; s10++) (o10 = t10[s10]).percentage = r10 > 0 && (o10.visible || !i10) ? o10.y / r10 * 100 : 0, o10.total = r10;
        }
      };
      __name(_hK, "hK");
      let hK = _hK;
      hK.defaultOptions = h_(r1.defaultOptions, { borderRadius: 3, center: [null, null], clip: false, colorByPoint: true, dataLabels: { connectorPadding: 5, connectorShape: "crookedLine", crookDistance: void 0, distance: 30, enabled: true, formatter: /* @__PURE__ */ __name(function() {
        return this.isNull ? void 0 : this.name;
      }, "formatter"), softConnector: true, x: 0 }, fillColor: void 0, ignoreHiddenPoint: true, inactiveOtherPoints: true, legendType: "point", marker: null, size: null, showInLegend: false, slicedOffset: 10, stickyTracking: false, tooltip: { followPointer: true }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: 0.1 } } }), hV(hK.prototype, { axisTypes: [], directTouch: true, drawGraph: void 0, drawTracker: he.prototype.drawTracker, getCenter: hN.getCenter, getSymbol: hU, invertible: false, isCartesian: false, noSharedTooltip: true, pointAttribs: he.prototype.pointAttribs, pointClass: hj, requireSorting: false, searchPoint: hU, trackerGroups: ["group", "dataLabelsGroup"] }), rk.registerSeriesType("pie", hK);
      let { composed: hJ, noop: hQ } = w, { distribute: h0 } = ey, { series: h1 } = rk, { arrayMax: h2, clamp: h3, defined: h5, isNumber: h6, pick: h9, pushUnique: h4, relativeLength: h8 } = V;
      !(function(t10) {
        let e10 = { radialDistributionY: /* @__PURE__ */ __name(function(t11, e11) {
          return (e11.dataLabelPosition?.top || 0) + t11.distributeBox.pos;
        }, "radialDistributionY"), radialDistributionX: /* @__PURE__ */ __name(function(t11, e11, i11, s11, o11) {
          let r11 = o11.dataLabelPosition;
          return t11.getX(i11 < (r11?.top || 0) + 2 || i11 > (r11?.bottom || 0) - 2 ? s11 : i11, e11.half, e11, o11);
        }, "radialDistributionX"), justify: /* @__PURE__ */ __name(function(t11, e11, i11, s11) {
          return s11[0] + (t11.half ? -1 : 1) * (i11 + (e11.dataLabelPosition?.distance || 0));
        }, "justify"), alignToPlotEdges: /* @__PURE__ */ __name(function(t11, e11, i11, s11) {
          let o11 = t11.getBBox().width;
          return e11 ? o11 + s11 : i11 - o11 - s11;
        }, "alignToPlotEdges"), alignToConnectors: /* @__PURE__ */ __name(function(t11, e11, i11, s11) {
          let o11 = 0, r11;
          return t11.forEach(function(t12) {
            (r11 = t12.dataLabel.getBBox().width) > o11 && (o11 = r11);
          }), e11 ? o11 + s11 : i11 - o11 - s11;
        }, "alignToConnectors") };
        function i10(t11, e11) {
          let i11 = Math.PI / 2, { start: s11 = 0, end: o11 = 0 } = t11.shapeArgs || {}, r11 = t11.angle || 0;
          e11 > 0 && s11 < i11 && o11 > i11 && r11 > i11 / 2 && r11 < 1.5 * i11 && (r11 = r11 <= i11 ? Math.max(i11 / 2, (s11 + i11) / 2) : Math.min(1.5 * i11, (i11 + o11) / 2));
          let { center: a10, options: n10 } = this, h10 = a10[2] / 2, l2 = Math.cos(r11), d2 = Math.sin(r11), c2 = a10[0] + l2 * h10, p2 = a10[1] + d2 * h10, g2 = Math.min((n10.slicedOffset || 0) + (n10.borderWidth || 0), e11 / 5);
          return { natural: { x: c2 + l2 * e11, y: p2 + d2 * e11 }, computed: {}, alignment: e11 < 0 ? "center" : t11.half ? "right" : "left", connectorPosition: { angle: r11, breakAt: { x: c2 + l2 * g2, y: p2 + d2 * g2 }, touchingSliceAt: { x: c2, y: p2 } }, distance: e11 };
        }
        __name(i10, "i");
        function s10() {
          let t11 = this, e11 = t11.points, i11 = t11.chart, s11 = i11.plotWidth, o11 = i11.plotHeight, r11 = i11.plotLeft, a10 = Math.round(i11.chartWidth / 3), n10 = t11.center, h10 = n10[2] / 2, l2 = n10[1], d2 = [[], []], c2 = [0, 0, 0, 0], p2 = t11.dataLabelPositioners, g2, u2, f2, m2 = 0;
          t11.visible && t11.hasDataLabels?.() && (e11.forEach((t12) => {
            (t12.dataLabels || []).forEach((t13) => {
              t13.shortened && (t13.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), t13.shortened = false);
            });
          }), h1.prototype.drawDataLabels.apply(t11), e11.forEach((t12) => {
            (t12.dataLabels || []).forEach((e12, i12) => {
              let s12 = n10[2] / 2, o12 = e12.options, r12 = h8(o12?.distance || 0, s12);
              0 === i12 && d2[t12.half].push(t12), !h5(o12?.style?.width) && e12.getBBox().width > a10 && (e12.css({ width: Math.round(0.7 * a10) + "px" }), e12.shortened = true), e12.dataLabelPosition = this.getDataLabelPosition(t12, r12), m2 = Math.max(m2, r12);
            });
          }), d2.forEach((e12, a11) => {
            let d3 = e12.length, g3 = [], x2, y2, b2 = 0, v2;
            d3 && (t11.sortByAngle(e12, a11 - 0.5), m2 > 0 && (x2 = Math.max(0, l2 - h10 - m2), y2 = Math.min(l2 + h10 + m2, i11.plotHeight), e12.forEach((t12) => {
              (t12.dataLabels || []).forEach((e13) => {
                let s12 = e13.dataLabelPosition;
                s12 && s12.distance > 0 && (s12.top = Math.max(0, l2 - h10 - s12.distance), s12.bottom = Math.min(l2 + h10 + s12.distance, i11.plotHeight), b2 = e13.getBBox().height || 21, e13.lineHeight = i11.renderer.fontMetrics(e13.text || e13).h + 2 * e13.padding, t12.distributeBox = { target: (e13.dataLabelPosition?.natural.y || 0) - s12.top + e13.lineHeight / 2, size: b2, rank: t12.y }, g3.push(t12.distributeBox));
              });
            }), h0(g3, v2 = y2 + b2 - x2, v2 / 5)), e12.forEach((i12) => {
              (i12.dataLabels || []).forEach((l3) => {
                let d4 = l3.options || {}, m3 = i12.distributeBox, x3 = l3.dataLabelPosition, y3 = x3?.natural.y || 0, b3 = d4.connectorPadding || 0, v3 = l3.lineHeight || 21, k2 = (v3 - l3.getBBox().height) / 2, w2 = 0, M2 = y3, S2 = "inherit";
                if (x3) {
                  if (g3 && h5(m3) && x3.distance > 0 && (void 0 === m3.pos ? S2 = "hidden" : (f2 = m3.size, M2 = p2.radialDistributionY(i12, l3))), d4.justify) w2 = p2.justify(i12, l3, h10, n10);
                  else switch (d4.alignTo) {
                    case "connectors":
                      w2 = p2.alignToConnectors(e12, a11, s11, r11);
                      break;
                    case "plotEdges":
                      w2 = p2.alignToPlotEdges(l3, a11, s11, r11);
                      break;
                    default:
                      w2 = p2.radialDistributionX(t11, i12, M2 - k2, y3, l3);
                  }
                  if (x3.attribs = { visibility: S2, align: x3.alignment }, x3.posAttribs = { x: w2 + (d4.x || 0) + ({ left: b3, right: -b3 }[x3.alignment] || 0), y: M2 + (d4.y || 0) - v3 / 2 }, x3.computed.x = w2, x3.computed.y = M2 - k2, h9(d4.crop, true)) {
                    let t12;
                    w2 - (u2 = l3.getBBox().width) < b3 && 1 === a11 ? (t12 = Math.round(u2 - w2 + b3), c2[3] = Math.max(t12, c2[3])) : w2 + u2 > s11 - b3 && 0 === a11 && (t12 = Math.round(w2 + u2 - s11 + b3), c2[1] = Math.max(t12, c2[1])), M2 - f2 / 2 < 0 ? c2[0] = Math.max(Math.round(-M2 + f2 / 2), c2[0]) : M2 + f2 / 2 > o11 && (c2[2] = Math.max(Math.round(M2 + f2 / 2 - o11), c2[2])), x3.sideOverflow = t12;
                  }
                }
              });
            }));
          }), (0 === h2(c2) || this.verifyDataLabelOverflow(c2)) && (this.placeDataLabels(), this.points.forEach((e12) => {
            (e12.dataLabels || []).forEach((s12) => {
              let { connectorColor: o12, connectorWidth: r12 = 1 } = s12.options || {}, a11 = s12.dataLabelPosition;
              if (h6(r12)) {
                let n11;
                g2 = s12.connector, a11 && a11.distance > 0 ? (n11 = !g2, g2 || (s12.connector = g2 = i11.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + e12.colorIndex + (e12.className ? " " + e12.className : "")).add(t11.dataLabelsGroup)), i11.styledMode || g2.attr({ "stroke-width": r12, stroke: o12 || e12.color || "#666666" }), g2[n11 ? "attr" : "animate"]({ d: e12.getConnectorPath(s12) }), g2.attr({ visibility: a11.attribs?.visibility })) : g2 && (s12.connector = g2.destroy());
              }
            });
          })));
        }
        __name(s10, "s");
        function o10() {
          this.points.forEach((t11) => {
            (t11.dataLabels || []).forEach((t12) => {
              let e11 = t12.dataLabelPosition;
              e11 ? (e11.sideOverflow && (t12.css({ width: Math.max(t12.getBBox().width - e11.sideOverflow, 0) + "px", textOverflow: t12.options?.style?.textOverflow || "ellipsis" }), t12.shortened = true), t12.attr(e11.attribs), t12[t12.moved ? "animate" : "attr"](e11.posAttribs), t12.moved = true) : t12 && t12.attr({ y: -9999 });
            }), delete t11.distributeBox;
          }, this);
        }
        __name(o10, "o");
        function r10(t11) {
          let e11 = this.center, i11 = this.options, s11 = i11.center, o11 = i11.minSize || 80, r11 = o11, a10 = null !== i11.size;
          return !a10 && (null !== s11[0] ? r11 = Math.max(e11[2] - Math.max(t11[1], t11[3]), o11) : (r11 = Math.max(e11[2] - t11[1] - t11[3], o11), e11[0] += (t11[3] - t11[1]) / 2), null !== s11[1] ? r11 = h3(r11, o11, e11[2] - Math.max(t11[0], t11[2])) : (r11 = h3(r11, o11, e11[2] - t11[0] - t11[2]), e11[1] += (t11[0] - t11[2]) / 2), r11 < e11[2] ? (e11[2] = r11, e11[3] = Math.min(i11.thickness ? Math.max(0, r11 - 2 * i11.thickness) : Math.max(0, h8(i11.innerSize || 0, r11)), r11), this.translate(e11), this.drawDataLabels && this.drawDataLabels()) : a10 = true), a10;
        }
        __name(r10, "r");
        t10.compose = function(t11) {
          if (hf.compose(h1), h4(hJ, "PieDataLabel")) {
            let a10 = t11.prototype;
            a10.dataLabelPositioners = e10, a10.alignDataLabel = hQ, a10.drawDataLabels = s10, a10.getDataLabelPosition = i10, a10.placeDataLabels = o10, a10.verifyDataLabelOverflow = r10;
          }
        };
      })(x || (x = {}));
      let h7 = x;
      !(function(t10) {
        t10.getCenterOfPoints = function(t11) {
          let e10 = t11.reduce((t12, e11) => (t12.x += e11.x, t12.y += e11.y, t12), { x: 0, y: 0 });
          return { x: e10.x / t11.length, y: e10.y / t11.length };
        }, t10.getDistanceBetweenPoints = function(t11, e10) {
          return Math.sqrt(Math.pow(e10.x - t11.x, 2) + Math.pow(e10.y - t11.y, 2));
        }, t10.getAngleBetweenPoints = function(t11, e10) {
          return Math.atan2(e10.x - t11.x, e10.y - t11.y);
        }, t10.pointInPolygon = function({ x: t11, y: e10 }, i10) {
          let s10 = i10.length, o10, r10, a10 = false;
          for (o10 = 0, r10 = s10 - 1; o10 < s10; r10 = o10++) {
            let [s11, n10] = i10[o10], [h10, l2] = i10[r10];
            n10 > e10 != l2 > e10 && t11 < (h10 - s11) * (e10 - n10) / (l2 - n10) + s11 && (a10 = !a10);
          }
          return a10;
        };
      })(y || (y = {}));
      let { pointInPolygon: lt } = y, { addEvent: le, getAlignFactor: li, fireEvent: ls, objectEach: lo, pick: lr } = V;
      function la(t10) {
        let e10 = t10.length, i10 = /* @__PURE__ */ __name((t11, e11) => !(e11.x >= t11.x + t11.width || e11.x + e11.width <= t11.x || e11.y >= t11.y + t11.height || e11.y + e11.height <= t11.y), "i"), s10 = /* @__PURE__ */ __name((t11, e11) => {
          for (let i11 of t11) if (lt({ x: i11[0], y: i11[1] }, e11)) return true;
          return false;
        }, "s"), o10, r10, a10, n10, h10, l2 = false;
        for (let i11 = 0; i11 < e10; i11++) (o10 = t10[i11]) && (o10.oldOpacity = o10.opacity, o10.newOpacity = 1, o10.absoluteBox = (function(t11) {
          if (t11 && (!t11.alignAttr || t11.placed)) {
            let e11 = t11.box ? 0 : t11.padding || 0, i12 = t11.alignAttr || { x: t11.attr("x"), y: t11.attr("y") }, { height: s11, polygon: o11, width: r11 } = t11.getBBox(), a11 = li(t11.alignValue) * r11;
            return t11.width = r11, t11.height = s11, { x: i12.x + (t11.parentGroup?.translateX || 0) + e11 - a11, y: i12.y + (t11.parentGroup?.translateY || 0) + e11, width: r11 - 2 * e11, height: s11 - 2 * e11, polygon: o11 };
          }
        })(o10));
        t10.sort((t11, e11) => (e11.labelrank || 0) - (t11.labelrank || 0));
        for (let o11 = 0; o11 < e10; ++o11) {
          n10 = (r10 = t10[o11]) && r10.absoluteBox;
          let l3 = n10?.polygon;
          for (let d2 = o11 + 1; d2 < e10; ++d2) {
            h10 = (a10 = t10[d2]) && a10.absoluteBox;
            let e11 = false;
            if (n10 && h10 && r10 !== a10 && 0 !== r10.newOpacity && 0 !== a10.newOpacity && "hidden" !== r10.visibility && "hidden" !== a10.visibility) {
              let t11 = h10.polygon;
              if (l3 && t11 && l3 !== t11 ? s10(l3, t11) && (e11 = true) : i10(n10, h10) && (e11 = true), e11) {
                let t12 = r10.labelrank < a10.labelrank ? r10 : a10, e12 = t12.text;
                t12.newOpacity = 0, e12?.element.querySelector("textPath") && e12.hide();
              }
            }
          }
        }
        for (let e11 of t10) ln(e11, this) && (l2 = true);
        l2 && ls(this, "afterHideAllOverlappingLabels");
      }
      __name(la, "la");
      function ln(t10, e10) {
        let i10, s10 = false;
        return t10 && (i10 = t10.newOpacity, t10.oldOpacity !== i10 && (t10.hasClass("highcharts-data-label") ? (t10[i10 ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), s10 = true, t10[t10.isOld ? "animate" : "attr"]({ opacity: i10 }, void 0, function() {
          e10.styledMode || t10.css({ pointerEvents: i10 ? "auto" : "none" });
        }), ls(e10, "afterHideOverlappingLabel")) : t10.attr({ opacity: i10 })), t10.isOld = true), s10;
      }
      __name(ln, "ln");
      function lh() {
        let t10 = this, e10 = [];
        for (let i10 of t10.labelCollectors || []) e10 = e10.concat(i10());
        for (let i10 of t10.yAxis || []) i10.stacking && i10.options.stackLabels && !i10.options.stackLabels.allowOverlap && lo(i10.stacking.stacks, (t11) => {
          lo(t11, (t12) => {
            t12.label && e10.push(t12.label);
          });
        });
        for (let i10 of t10.series || []) if (i10.visible && i10.hasDataLabels?.()) {
          let s10 = /* @__PURE__ */ __name((i11) => {
            for (let s11 of i11) s11.visible && (s11.dataLabels || []).forEach((i12) => {
              let o10 = i12.options || {};
              i12.labelrank = lr(o10.labelrank, s11.labelrank, s11.shapeArgs?.height), o10.allowOverlap ?? Number(o10.distance) > 0 ? (i12.oldOpacity = i12.opacity, i12.newOpacity = 1, ln(i12, t10)) : e10.push(i12);
            });
          }, "s");
          s10(i10.nodes || []), s10(i10.points);
        }
        this.hideOverlappingLabels(e10);
      }
      __name(lh, "lh");
      let ll = { compose: /* @__PURE__ */ __name(function(t10) {
        let e10 = t10.prototype;
        e10.hideOverlappingLabels || (e10.hideOverlappingLabels = la, le(t10, "render", lh));
      }, "compose") }, { defaultOptions: ld } = tv, { noop: lc } = w, { addEvent: lp, extend: lg, isObject: lu, merge: lf, relativeLength: lm } = V, lx = { radius: 0, scope: "stack", where: void 0 }, ly = lc, lb = lc;
      function lv(t10, e10, i10, s10, o10 = {}) {
        let r10 = ly(t10, e10, i10, s10, o10), { brStart: a10 = true, brEnd: n10 = true, innerR: h10 = 0, r: l2 = i10, start: d2 = 0, end: c2 = 0 } = o10;
        if (o10.open || !o10.borderRadius) return r10;
        let p2 = c2 - d2, g2 = Math.sin(p2 / 2), u2 = Math.max(Math.min(lm(o10.borderRadius || 0, l2 - h10), (l2 - h10) / 2, l2 * g2 / (1 + g2)), 0), f2 = Math.min(u2, p2 / Math.PI * 2 * h10), m2 = r10.length - 1;
        for (; m2--; ) (a10 || 0 !== m2 && 3 !== m2) && (n10 || 1 !== m2 && 2 !== m2) && !(function(t11, e11, i11) {
          let s11, o11, r11, a11 = t11[e11], n11 = t11[e11 + 1];
          if ("Z" === n11[0] && (n11 = t11[0]), ("M" === a11[0] || "L" === a11[0]) && "A" === n11[0] ? (s11 = a11, o11 = n11, r11 = true) : "A" === a11[0] && ("M" === n11[0] || "L" === n11[0]) && (s11 = n11, o11 = a11), s11 && o11 && o11.params) {
            let a12 = o11[1], n12 = o11[5], h11 = o11.params, { start: l3, end: d3, cx: c3, cy: p3 } = h11, g3 = n12 ? a12 - i11 : a12 + i11, u3 = g3 ? Math.asin(i11 / g3) : 0, f3 = n12 ? u3 : -u3, m3 = Math.cos(u3) * g3;
            r11 ? (h11.start = l3 + f3, s11[1] = c3 + m3 * Math.cos(l3), s11[2] = p3 + m3 * Math.sin(l3), t11.splice(e11 + 1, 0, ["A", i11, i11, 0, 0, 1, c3 + a12 * Math.cos(h11.start), p3 + a12 * Math.sin(h11.start)])) : (h11.end = d3 - f3, o11[6] = c3 + a12 * Math.cos(h11.end), o11[7] = p3 + a12 * Math.sin(h11.end), t11.splice(e11 + 1, 0, ["A", i11, i11, 0, 0, 1, c3 + m3 * Math.cos(d3), p3 + m3 * Math.sin(d3)])), o11[4] = Math.abs(h11.end - h11.start) < Math.PI ? 0 : 1;
          }
        })(r10, m2, m2 > 1 ? f2 : u2);
        return r10;
      }
      __name(lv, "lv");
      function lk() {
        if (this.options.borderRadius && !(this.chart.is3d && this.chart.is3d())) {
          let { options: t10, yAxis: e10 } = this, i10 = "percent" === t10.stacking, s10 = ld.plotOptions?.[this.type]?.borderRadius, o10 = lw(t10.borderRadius, lu(s10) ? s10 : {}), r10 = e10.options.reversed;
          for (let s11 of this.points) {
            let { shapeArgs: a10 } = s11;
            if ("roundedRect" === s11.shapeType && a10) {
              let { width: n10 = 0, height: h10 = 0, y: l2 = 0 } = a10, d2 = l2, c2 = h10;
              if ("stack" === o10.scope && s11.stackTotal) {
                let o11 = e10.translate(i10 ? 100 : s11.stackTotal, false, true, false, true), r11 = e10.translate(t10.threshold || 0, false, true, false, true), a11 = this.crispCol(0, Math.min(o11, r11), 0, Math.abs(o11 - r11));
                d2 = a11.y, c2 = a11.height;
              }
              let p2 = (s11.negative ? -1 : 1) * (r10 ? -1 : 1) == -1, g2 = o10.where;
              !g2 && this.is("waterfall") && Math.abs((s11.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (g2 = "all"), g2 || (g2 = "end");
              let u2 = Math.min(lm(o10.radius, n10), n10 / 2, "all" === g2 ? h10 / 2 : 1 / 0) || 0;
              "end" === g2 && (p2 && (d2 -= u2), c2 += u2), lg(a10, { brBoxHeight: c2, brBoxY: d2, r: u2 });
            }
          }
        }
      }
      __name(lk, "lk");
      function lw(t10, e10) {
        return lu(t10) || (t10 = { radius: t10 || 0 }), lf(lx, e10, t10);
      }
      __name(lw, "lw");
      function lM() {
        let t10 = lw(this.options.borderRadius);
        for (let e10 of this.points) {
          let i10 = e10.shapeArgs;
          i10 && (i10.borderRadius = lm(t10.radius, (i10.r || 0) - (i10.innerR || 0)));
        }
      }
      __name(lM, "lM");
      function lS(t10, e10, i10, s10, o10 = {}) {
        let r10 = lb(t10, e10, i10, s10, o10), { r: a10 = 0, brBoxHeight: n10 = s10, brBoxY: h10 = e10 } = o10, l2 = e10 - h10, d2 = h10 + n10 - (e10 + s10), c2 = l2 - a10 > -0.1 ? 0 : a10, p2 = d2 - a10 > -0.1 ? 0 : a10, g2 = Math.max(c2 && l2, 0), u2 = Math.max(p2 && d2, 0), f2 = [t10 + c2, e10], m2 = [t10 + i10 - c2, e10], x2 = [t10 + i10, e10 + c2], y2 = [t10 + i10, e10 + s10 - p2], b2 = [t10 + i10 - p2, e10 + s10], v2 = [t10 + p2, e10 + s10], k2 = [t10, e10 + s10 - p2], w2 = [t10, e10 + c2], M2 = /* @__PURE__ */ __name((t11, e11) => Math.sqrt(Math.pow(t11, 2) - Math.pow(e11, 2)), "M");
        if (g2) {
          let t11 = M2(c2, c2 - g2);
          f2[0] -= t11, m2[0] += t11, x2[1] = w2[1] = e10 + c2 - g2;
        }
        if (s10 < c2 - g2) {
          let o11 = M2(c2, c2 - g2 - s10);
          x2[0] = y2[0] = t10 + i10 - c2 + o11, b2[0] = Math.min(x2[0], b2[0]), v2[0] = Math.max(y2[0], v2[0]), k2[0] = w2[0] = t10 + c2 - o11, x2[1] = w2[1] = e10 + s10;
        }
        if (u2) {
          let t11 = M2(p2, p2 - u2);
          b2[0] += t11, v2[0] -= t11, y2[1] = k2[1] = e10 + s10 - p2 + u2;
        }
        if (s10 < p2 - u2) {
          let o11 = M2(p2, p2 - u2 - s10);
          x2[0] = y2[0] = t10 + i10 - p2 + o11, m2[0] = Math.min(x2[0], m2[0]), f2[0] = Math.max(y2[0], f2[0]), k2[0] = w2[0] = t10 + p2 - o11, y2[1] = k2[1] = e10;
        }
        return r10.length = 0, r10.push(["M", ...f2], ["L", ...m2], ["A", c2, c2, 0, 0, 1, ...x2], ["L", ...y2], ["A", p2, p2, 0, 0, 1, ...b2], ["L", ...v2], ["A", p2, p2, 0, 0, 1, ...k2], ["L", ...w2], ["A", c2, c2, 0, 0, 1, ...f2], ["Z"]), r10;
      }
      __name(lS, "lS");
      let { diffObjects: lT, extend: lC, find: lA, merge: lP, pick: lL, uniqueKey: lO } = V;
      !(function(t10) {
        function e10(t11, e11) {
          let i11 = t11.condition;
          (i11.callback || function() {
            return this.chartWidth <= lL(i11.maxWidth, Number.MAX_VALUE) && this.chartHeight <= lL(i11.maxHeight, Number.MAX_VALUE) && this.chartWidth >= lL(i11.minWidth, 0) && this.chartHeight >= lL(i11.minHeight, 0);
          }).call(this) && e11.push(t11._id);
        }
        __name(e10, "e");
        function i10(t11, e11) {
          let i11 = this.options.responsive, s10 = this.currentResponsive, o10 = [], r10;
          !e11 && i11 && i11.rules && i11.rules.forEach((t12) => {
            void 0 === t12._id && (t12._id = lO()), this.matchResponsiveRule(t12, o10);
          }, this);
          let a10 = lP(...o10.map((t12) => lA(i11?.rules || [], (e12) => e12._id === t12)).map((t12) => t12?.chartOptions));
          a10.isResponsiveOptions = true, o10 = o10.toString() || void 0;
          let n10 = s10?.ruleIds;
          o10 !== n10 && (s10 && (this.currentResponsive = void 0, this.updatingResponsive = true, this.update(s10.undoOptions, t11, true), this.updatingResponsive = false), o10 ? ((r10 = lT(a10, this.options, true, this.collectionsWithUpdate)).isResponsiveOptions = true, this.currentResponsive = { ruleIds: o10, mergedOptions: a10, undoOptions: r10 }, this.updatingResponsive || this.update(a10, t11, true)) : this.currentResponsive = void 0);
        }
        __name(i10, "i");
        t10.compose = function(t11) {
          let s10 = t11.prototype;
          return s10.matchResponsiveRule || lC(s10, { matchResponsiveRule: e10, setResponsive: i10 }), t11;
        };
      })(b || (b = {}));
      let lE = b;
      w.AST = t6, w.Axis = s$, w.Chart = a0, w.Color = tL, w.DataLabel = hf, w.DataTableCore = rp, w.Fx = tB, w.HTMLElement = i6, w.Legend = au, w.LegendSymbol = rm, w.OverlappingDataLabels = w.OverlappingDataLabels || ll, w.PlotLineOrBand = oa, w.Point = oK, w.Pointer = ra, w.RendererRegistry = eg, w.Series = r1, w.SeriesRegistry = rk, w.StackItem = nd, w.SVGElement = eJ, w.SVGRenderer = iU, w.Templating = ep, w.Tick = sf, w.Time = tu, w.Tooltip = oE, w.animate = tU.animate, w.animObject = tU.animObject, w.chart = a0.chart, w.color = tL.parse, w.dateFormat = ep.dateFormat, w.defaultOptions = tv.defaultOptions, w.distribute = ey.distribute, w.format = ep.format, w.getDeferredAnimation = tU.getDeferredAnimation, w.getOptions = tv.getOptions, w.numberFormat = ep.numberFormat, w.seriesType = rk.seriesType, w.setAnimation = tU.setAnimation, w.setOptions = tv.setOptions, w.stop = tU.stop, w.time = tv.defaultTime, w.timers = tB.timers, { compose: /* @__PURE__ */ __name(function(t10, e10, i10) {
        let s10 = t10.types.pie;
        if (!e10.symbolCustomAttribs.includes("borderRadius")) {
          let o10 = i10.prototype.symbols;
          lp(t10, "afterColumnTranslate", lk, { order: 9 }), lp(s10, "afterTranslate", lM), e10.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY", "brEnd", "brStart"), ly = o10.arc, lb = o10.roundedRect, o10.arc = lv, o10.roundedRect = lS;
        }
      }, "compose"), optionsToObject: lw }.compose(w.Series, w.SVGElement, w.SVGRenderer), hv.compose(w.Series.types.column), hf.compose(w.Series), sK.compose(w.Axis), i6.compose(w.SVGRenderer), au.compose(w.Chart), s1.compose(w.Axis), ll.compose(w.Chart), h7.compose(w.Series.types.pie), oa.compose(w.Chart, w.Axis), ra.compose(w.Chart), lE.compose(w.Chart), ni.compose(w.Axis, w.Chart, w.Series), nO.compose(w.Axis, w.Chart, w.Series), oE.compose(w.Pointer), V.extend(w, V);
      let lI = w;
      return k.default;
    })());
  }
});
export default require_highcharts();
//# sourceMappingURL=highcharts.js.map
