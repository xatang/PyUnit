import {
  __commonJS,
  __name,
  __spreadValues
} from "./chunk-KQSGOR2U.js";

// node_modules/highcharts/modules/boost.js
var require_boost = __commonJS({
  "node_modules/highcharts/modules/boost.js"(exports, module) {
    !/**
    * Highcharts JS v12.4.0 (2025-09-04)
    * @module highcharts/modules/boost
    * @requires highcharts
    *
    * Boost module
    *
    * (c) 2010-2025 Highsoft AS
    * Author: Torstein Honsi
    *
    * License: www.highcharts.com/license
    *
    * */
    (function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t(e._Highcharts, e._Highcharts.Color) : "function" == typeof define && define.amd ? define("highcharts/modules/boost", ["highcharts/highcharts"], function(e2) {
        return t(e2, e2.Color);
      }) : "object" == typeof exports ? exports["highcharts/modules/boost"] = t(e._Highcharts, e._Highcharts.Color) : e.Highcharts = t(e.Highcharts, e.Highcharts.Color);
    })("undefined" == typeof window ? exports : window, (e, t) => (() => {
      "use strict";
      var _a, _b, _c;
      let i, s;
      var r, o = { 620: (e2) => {
        e2.exports = t;
      }, 944: (t2) => {
        t2.exports = e;
      } }, n = {};
      function a(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var i2 = n[e2] = { exports: {} };
        return o[e2](i2, i2.exports, a), i2.exports;
      }
      __name(a, "a");
      a.n = (e2) => {
        var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return a.d(t2, { a: t2 }), t2;
      }, a.d = (e2, t2) => {
        for (var i2 in t2) a.o(t2, i2) && !a.o(e2, i2) && Object.defineProperty(e2, i2, { enumerable: true, get: t2[i2] });
      }, a.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2);
      var l = {};
      a.d(l, { default: /* @__PURE__ */ __name(() => eG, "default") });
      var h = a(944), d = a.n(h);
      let f = ["area", "areaspline", "arearange", "column", "columnrange", "bar", "line", "scatter", "heatmap", "bubble", "treemap"], u = {};
      f.forEach((e2) => {
        u[e2] = true;
      });
      let { composed: g } = d(), { addEvent: m, pick: c, pushUnique: p } = d();
      function b(e2) {
        let t2 = e2.series, i2 = e2.boost = e2.boost || {}, s2 = e2.options.boost || {}, r2 = c(s2.seriesThreshold, 50);
        if (t2.length >= r2) return true;
        if (1 === t2.length) return false;
        let o2 = s2.allowForce;
        if (void 0 === o2) {
          for (let t3 of (o2 = true, e2.xAxis)) if (c(t3.min, -1 / 0) > c(t3.dataMin, -1 / 0) || c(t3.max, 1 / 0) < c(t3.dataMax, 1 / 0)) {
            o2 = false;
            break;
          }
        }
        if (void 0 !== i2.forceChartBoost) {
          if (o2) return i2.forceChartBoost;
          i2.forceChartBoost = void 0;
        }
        let n2 = 0, a2 = 0, l2;
        for (let e3 of t2) 0 !== (l2 = e3.options).boostThreshold && false !== e3.visible && "heatmap" !== e3.type && (u[e3.type] && ++n2, (function(...e4) {
          let t3 = -Number.MAX_VALUE;
          return e4.forEach((e5) => {
            if (null != e5 && void 0 !== e5.length && e5.length > 0) return t3 = e5.length, true;
          }), t3;
        })(e3.getColumn("x", true), l2.data, e3.points) >= (l2.boostThreshold || Number.MAX_VALUE) && ++a2);
        return i2.forceChartBoost = o2 && (n2 === t2.length && a2 === n2 || a2 > 5), i2.forceChartBoost;
      }
      __name(b, "b");
      function x(e2) {
        function t2() {
          e2.boost && e2.boost.wgl && b(e2) && e2.boost.wgl.render(e2);
        }
        __name(t2, "t");
        m(e2, "predraw", function() {
          e2.boost = e2.boost || {}, e2.boost.forceChartBoost = void 0, e2.boosted = false, e2.axes.some((e3) => e3.isPanning) || e2.boost.clear?.(), e2.boost.canvas && e2.boost.wgl && b(e2) && e2.boost.wgl.allocateBuffer(e2), e2.boost.markerGroup && e2.xAxis && e2.xAxis.length > 0 && e2.yAxis && e2.yAxis.length > 0 && e2.boost.markerGroup.translate(e2.xAxis[0].pos, e2.yAxis[0].pos);
        }), m(e2, "load", t2, { order: -1 }), m(e2, "redraw", t2);
        let i2 = -1, s2 = -1;
        m(e2.pointer, "afterGetHoverData", (t3) => {
          let r2 = t3.hoverPoint?.series;
          if (e2.boost = e2.boost || {}, e2.boost.markerGroup && r2) {
            let t4 = e2.inverted ? r2.yAxis : r2.xAxis, o2 = e2.inverted ? r2.xAxis : r2.yAxis;
            (t4 && t4.pos !== i2 || o2 && o2.pos !== s2) && (e2.series.forEach((e3) => {
              e3.halo?.hide();
            }), e2.boost.markerGroup.translate(t4.pos, o2.pos), i2 = t4.pos, s2 = o2.pos);
          }
        });
      }
      __name(x, "x");
      let A = { compose: /* @__PURE__ */ __name(function(e2, t2) {
        return t2 && p(g, "Boost.Chart") && e2.prototype.callbacks.push(x), e2;
      }, "compose"), getBoostClipRect: /* @__PURE__ */ __name(function(e2, t2) {
        let i2 = e2.navigator, s2 = { x: e2.plotLeft, y: e2.plotTop, width: e2.plotWidth, height: e2.plotHeight };
        if (i2 && e2.inverted ? (s2.width += i2.top + i2.height, i2.opposite || (s2.x = i2.left)) : i2 && !e2.inverted && (s2.height = i2.top + i2.height - e2.plotTop), t2.is) {
          let { xAxis: i3, yAxis: r2 } = t2;
          if (s2 = e2.getClipBox(t2), e2.inverted) {
            let e3 = s2.width;
            s2.width = s2.height, s2.height = e3, s2.x = r2.pos, s2.y = i3.pos;
          } else s2.x = i3.pos, s2.y = r2.pos;
        }
        if (t2 === e2) {
          let t3 = e2.inverted ? e2.xAxis : e2.yAxis;
          t3.length <= 1 && (s2.y = Math.min(t3[0].pos, s2.y), s2.height = t3[0].pos - e2.plotTop + t3[0].len);
        }
        return s2;
      }, "getBoostClipRect"), isChartSeriesBoosting: b };
      var y = a(620), v = a.n(y);
      let P = { area: "LINES", arearange: "LINES", areaspline: "LINES", column: "LINES", columnrange: "LINES", bar: "LINES", line: "LINE_STRIP", scatter: "POINTS", heatmap: "TRIANGLES", treemap: "TRIANGLES", bubble: "POINTS" }, { clamp: T, error: C, pick: k } = d(), M = (_a = class {
        constructor(e2) {
          if (this.errors = [], this.uLocations = {}, this.gl = e2, e2 && !this.createShader()) return;
        }
        bind() {
          this.gl && this.shaderProgram && this.gl.useProgram(this.shaderProgram);
        }
        createShader() {
          let e2 = this.stringToProgram("#version 100\n#define LN10 2.302585092994046\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMax;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform bool  xAxisIsLog;\nuniform bool  xAxisReversed;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMax;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  yAxisIsLog;\nuniform bool  yAxisReversed;\nuniform bool  isCircle;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value = aVertexPosition.w;\nfloat zMax = bubbleZMax;\nfloat zMin = bubbleZMin;\nfloat radius = 0.0;\nfloat pos = 0.0;\nfloat zRange = zMax - zMin;\nif (bubbleSizeAbs){\nvalue = value - bubbleZThreshold;\nzMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin = 0.0;\n}\nif (value < zMin){\nradius = bubbleZMin / 2.0 - 1.0;\n} else {\npos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea && pos > 0.0){\npos = sqrt(pos);\n}\nradius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord,\nbool  isLog,\nbool  reversed\n){\nfloat sign = 1.0;\nfloat cvsOffset = 0.0;\nif (cvsCoord) {\nsign *= -1.0;\ncvsOffset = len;\n}\nif (isLog) {\nval = log(val) / LN10;\n}\nif (reversed) {\nsign *= -1.0;\ncvsOffset -= sign * len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value) {\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold) {\nfloat v;\nif (skipTranslation){\nv = value;// + yAxisPos;\n} else {\nv = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;\nif (v > yAxisLen) {\nv = yAxisLen;\n}\n}\nif (checkTreshold > 0.0 && hasThreshold) {\nv = min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize = bubbleRadius();\n} else {\ngl_PointSize = pSize;\n}\nvColor = aColor;\nif (!skipTranslation && isCircle && (\naVertexPosition.x < xAxisMin ||\naVertexPosition.x > xAxisMax ||\naVertexPosition.y < yAxisMin ||\naVertexPosition.y > yAxisMax\n)) {\ngl_Position = uPMatrix * vec4(2.0, 2.0, 2.0, 1.0);\n} else if (skipTranslation && isInverted) {\ngl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);\n} else if (isInverted) {\ngl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}", "vertex"), t2 = this.stringToProgram("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col = fillColor;\nvec4 tcol = texture2D(uSampler, gl_PointCoord.st);\nif (hasColor) {\ncol = vColor;\n}\nif (isCircle) {\ncol *= tcol;\nif (tcol.r < 0.0) {\ndiscard;\n} else {\ngl_FragColor = col;\n}\n} else {\ngl_FragColor = col;\n}\n}", "fragment"), i2 = /* @__PURE__ */ __name((e3) => this.gl.getUniformLocation(this.shaderProgram, e3), "i");
          return e2 && t2 ? (this.shaderProgram = this.gl.createProgram(), this.gl.attachShader(this.shaderProgram, e2), this.gl.attachShader(this.shaderProgram, t2), this.gl.linkProgram(this.shaderProgram), this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) ? (this.gl.useProgram(this.shaderProgram), this.gl.bindAttribLocation(this.shaderProgram, 0, "aVertexPosition"), this.pUniform = i2("uPMatrix"), this.psUniform = i2("pSize"), this.fcUniform = i2("fillColor"), this.isBubbleUniform = i2("isBubble"), this.bubbleSizeAbsUniform = i2("bubbleSizeAbs"), this.bubbleSizeAreaUniform = i2("bubbleSizeByArea"), this.uSamplerUniform = i2("uSampler"), this.skipTranslationUniform = i2("skipTranslation"), this.isCircleUniform = i2("isCircle"), this.isInverted = i2("isInverted"), true) : (this.errors.push(this.gl.getProgramInfoLog(this.shaderProgram)), this.handleErrors(), this.shaderProgram = false, false) : (this.shaderProgram = false, this.handleErrors(), false);
        }
        handleErrors() {
          this.errors.length && C("[highcharts boost] shader error - " + this.errors.join("\n"));
        }
        stringToProgram(e2, t2) {
          let i2 = this.gl.createShader("vertex" === t2 ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER);
          return (this.gl.shaderSource(i2, e2), this.gl.compileShader(i2), this.gl.getShaderParameter(i2, this.gl.COMPILE_STATUS)) ? i2 : (this.errors.push("when compiling " + t2 + " shader:\n" + this.gl.getShaderInfoLog(i2)), false);
        }
        destroy() {
          this.gl && this.shaderProgram && (this.gl.deleteProgram(this.shaderProgram), this.shaderProgram = false);
        }
        fillColorUniform() {
          return this.fcUniform;
        }
        getProgram() {
          return this.shaderProgram;
        }
        pointSizeUniform() {
          return this.psUniform;
        }
        perspectiveUniform() {
          return this.pUniform;
        }
        reset() {
          this.gl && this.shaderProgram && (this.gl.uniform1i(this.isBubbleUniform, 0), this.gl.uniform1i(this.isCircleUniform, 0));
        }
        setBubbleUniforms(e2, t2, i2, s2 = 1) {
          let r2 = e2.options, o2 = Number.MAX_VALUE, n2 = -Number.MAX_VALUE;
          if (this.gl && this.shaderProgram && e2.is("bubble")) {
            let a2 = e2.getPxExtremes();
            o2 = k(r2.zMin, T(t2, false === r2.displayNegative ? r2.zThreshold : -Number.MAX_VALUE, o2)), n2 = k(r2.zMax, Math.max(n2, i2)), this.gl.uniform1i(this.isBubbleUniform, 1), this.gl.uniform1i(this.isCircleUniform, 1), this.gl.uniform1i(this.bubbleSizeAreaUniform, "width" !== e2.options.sizeBy), this.gl.uniform1i(this.bubbleSizeAbsUniform, e2.options.sizeByAbsoluteValue), this.setUniform("bubbleMinSize", a2.minPxSize * s2), this.setUniform("bubbleMaxSize", a2.maxPxSize * s2), this.setUniform("bubbleZMin", o2), this.setUniform("bubbleZMax", n2), this.setUniform("bubbleZThreshold", e2.options.zThreshold);
          }
        }
        setColor(e2) {
          this.gl && this.shaderProgram && this.gl.uniform4f(this.fcUniform, e2[0] / 255, e2[1] / 255, e2[2] / 255, e2[3]);
        }
        setDrawAsCircle(e2) {
          this.gl && this.shaderProgram && this.gl.uniform1i(this.isCircleUniform, +!!e2);
        }
        setInverted(e2) {
          this.gl && this.shaderProgram && this.gl.uniform1i(this.isInverted, e2);
        }
        setPMatrix(e2) {
          this.gl && this.shaderProgram && this.gl.uniformMatrix4fv(this.pUniform, false, e2);
        }
        setPointSize(e2) {
          this.gl && this.shaderProgram && this.gl.uniform1f(this.psUniform, e2);
        }
        setSkipTranslation(e2) {
          this.gl && this.shaderProgram && this.gl.uniform1i(this.skipTranslationUniform, +(true === e2));
        }
        setTexture(e2) {
          this.gl && this.shaderProgram && this.gl.uniform1i(this.uSamplerUniform, e2);
        }
        setUniform(e2, t2) {
          if (this.gl && this.shaderProgram) {
            let i2 = this.uLocations[e2] = this.uLocations[e2] || this.gl.getUniformLocation(this.shaderProgram, e2);
            this.gl.uniform1f(i2, t2);
          }
        }
      }, __name(_a, "M"), _a), E = (_b = class {
        constructor(e2, t2, i2) {
          this.buffer = false, this.iterator = 0, this.preAllocated = false, this.vertAttribute = false, this.components = i2 || 2, this.dataComponents = i2, this.gl = e2, this.shader = t2;
        }
        allocate(e2) {
          this.iterator = -1, this.preAllocated = new Float32Array(4 * e2);
        }
        bind() {
          if (!this.buffer) return false;
          this.gl.vertexAttribPointer(this.vertAttribute, this.components, this.gl.FLOAT, false, 0, 0);
        }
        build(e2, t2, i2) {
          let s2;
          return (this.data = e2 || [], this.data && 0 !== this.data.length || this.preAllocated) ? (this.components = i2 || this.components, this.buffer && this.gl.deleteBuffer(this.buffer), this.preAllocated || (s2 = new Float32Array(this.data)), this.buffer = this.gl.createBuffer(), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer), this.gl.bufferData(this.gl.ARRAY_BUFFER, this.preAllocated || s2, this.gl.STATIC_DRAW), this.vertAttribute = this.gl.getAttribLocation(this.shader.getProgram(), t2), this.gl.enableVertexAttribArray(this.vertAttribute), s2 = false, true) : (this.destroy(), false);
        }
        destroy() {
          this.buffer && (this.gl.deleteBuffer(this.buffer), this.buffer = false, this.vertAttribute = false), this.iterator = 0, this.components = this.dataComponents || 2, this.data = [];
        }
        push(e2, t2, i2, s2) {
          this.preAllocated && (this.preAllocated[++this.iterator] = e2, this.preAllocated[++this.iterator] = t2, this.preAllocated[++this.iterator] = i2, this.preAllocated[++this.iterator] = s2);
        }
        render(e2, t2, i2) {
          let s2 = this.preAllocated ? this.preAllocated.length : this.data.length;
          return !!this.buffer && !!s2 && ((!e2 || e2 > s2 || e2 < 0) && (e2 = 0), (!t2 || t2 > s2) && (t2 = s2), !(e2 >= t2) && (i2 = i2 || "POINTS", this.gl.drawArrays(this.gl[i2], e2 / this.components, (t2 - e2) / this.components), true));
        }
      }, __name(_b, "E"), _b), { getBoostClipRect: S } = A, { parse: w } = v(), { doc: U, win: R } = d(), { isNumber: L, isObject: _, merge: z, objectEach: D, pick: I } = d(), N = { column: true, columnrange: true, bar: true, area: true, areaspline: true, arearange: true }, G = { scatter: true, bubble: true }, B = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
      const _O = class _O {
        static orthoMatrix(e2, t2) {
          return [2 / e2, 0, 0, 0, 0, -(2 / t2), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1];
        }
        static seriesPointCount(e2) {
          let t2, i2, s2;
          return e2.boosted ? (t2 = !!e2.options.stacking, i2 = (e2.getColumn("x").length ? e2.getColumn("x") : void 0) || e2.options.xData || e2.getColumn("x", true), s2 = (t2 ? e2.data : i2 || e2.options.data).length, "treemap" === e2.type ? s2 *= 12 : "heatmap" === e2.type ? s2 *= 6 : N[e2.type] && (s2 *= 2), s2) : 0;
        }
        constructor(e2) {
          this.data = [], this.height = 0, this.isInited = false, this.markerData = [], this.series = [], this.textureHandles = {}, this.width = 0, this.postRenderCallback = e2, this.settings = { pointSize: 1, lineWidth: 1, fillColor: "#AA00AA", useAlpha: true, usePreallocated: false, useGPUTranslations: false, debug: { timeRendering: false, timeSeriesProcessing: false, timeSetup: false, timeBufferCopy: false, timeKDTree: false, showSkipSummary: false } };
        }
        getPixelRatio() {
          return this.settings.pixelRatio || R.devicePixelRatio || 1;
        }
        setOptions(e2) {
          "pixelRatio" in e2 || (e2.pixelRatio = 1), z(true, this.settings, e2);
        }
        allocateBuffer(e2) {
          let t2 = this.vbuffer, i2 = 0;
          this.settings.usePreallocated && (e2.series.forEach((e3) => {
            e3.boosted && (i2 += _O.seriesPointCount(e3));
          }), t2 && t2.allocate(i2));
        }
        allocateBufferForSingleSeries(e2) {
          let t2 = this.vbuffer, i2 = 0;
          this.settings.usePreallocated && (e2.boosted && (i2 = _O.seriesPointCount(e2)), t2 && t2.allocate(i2));
        }
        clear() {
          let e2 = this.gl;
          e2 && e2.clear(e2.COLOR_BUFFER_BIT | e2.DEPTH_BUFFER_BIT);
        }
        pushSeriesData(e2, t2) {
          let i2 = this.data, s2 = this.settings, r2 = this.vbuffer, o2 = e2.pointArrayMap && "low,high" === e2.pointArrayMap.join(","), { chart: n2, options: a2, sorted: l2, xAxis: h2, yAxis: d2 } = e2, f2 = !!a2.stacking, u2 = a2.data, g2 = e2.xAxis.getExtremes(), m2 = g2.min - (e2.xAxis.minPointOffset || 0), c2 = g2.max + (e2.xAxis.minPointOffset || 0), p2 = e2.yAxis.getExtremes(), b2 = p2.min - (e2.yAxis.minPointOffset || 0), x2 = p2.max + (e2.yAxis.minPointOffset || 0), A2 = (e2.getColumn("x").length ? e2.getColumn("x") : void 0) || a2.xData || e2.getColumn("x", true), y2 = (e2.getColumn("y").length ? e2.getColumn("y") : void 0) || a2.yData || e2.getColumn("y", true), v2 = (e2.getColumn("z").length ? e2.getColumn("z") : void 0) || a2.zData || e2.getColumn("z", true), P2 = !A2 || 0 === A2.length, T2 = e2.options.colorByPoint, C2 = a2.connectNulls, k2 = e2.points || false, M2 = f2 ? e2.data : A2 || u2, E2 = { x: Number.MAX_VALUE, y: 0 }, S2 = { x: -Number.MAX_VALUE, y: 0 }, U2 = void 0 === n2.index, R2 = N[e2.type], L2 = a2.zoneAxis || "y", z2 = a2.zones || false, D2 = a2.threshold, I2 = this.getPixelRatio(), G2 = e2.chart.plotWidth, B2 = false, O2 = false, V2, X2, F2 = 0, H2 = false, W2, j2, q2, Y2, Z2 = -1, K2 = false, Q2 = false, J2, $2 = false, ee2 = false, et2, ei2 = false, es2 = true, er2 = true, eo2, en2 = false, ea2 = false, el2 = 0, eh2 = 0;
          if (a2.boostData && a2.boostData.length > 0) return;
          a2.gapSize && (ea2 = "value" !== a2.gapUnit ? a2.gapSize * e2.closestPointRange : a2.gapSize), z2 && (eo2 = [], z2.forEach((e3, t3) => {
            if (e3.color) {
              let i3 = w(e3.color).rgba;
              i3[0] /= 255, i3[1] /= 255, i3[2] /= 255, eo2[t3] = i3, en2 || void 0 !== e3.value || (en2 = i3);
            }
          }), en2 || (en2 = w(e2.pointAttribs && e2.pointAttribs().fill || e2.color).rgba, en2[0] /= 255, en2[1] /= 255, en2[2] /= 255)), n2.inverted && (G2 = e2.chart.plotHeight), e2.closestPointRangePx = Number.MAX_VALUE;
          let ed2 = /* @__PURE__ */ __name((e3) => {
            e3 && (t2.colorData.push(e3[0]), t2.colorData.push(e3[1]), t2.colorData.push(e3[2]), t2.colorData.push(e3[3]));
          }, "ed"), ef2 = /* @__PURE__ */ __name((e3, o3, n3, a3 = 1, l3) => {
            ed2(l3), 1 !== I2 && (!s2.useGPUTranslations || t2.skipTranslation) && (e3 *= I2, o3 *= I2, a3 *= I2), s2.usePreallocated && r2 ? (r2.push(e3, o3, +!!n3, a3), el2 += 4) : (i2.push(e3), i2.push(o3), i2.push(n3 ? I2 : 0), i2.push(a3));
          }, "ef"), eu2 = /* @__PURE__ */ __name(() => {
            t2.segments.length && (t2.segments[t2.segments.length - 1].to = i2.length || el2);
          }, "eu"), eg2 = /* @__PURE__ */ __name(() => {
            t2.segments.length && t2.segments[t2.segments.length - 1].from === (i2.length || el2) || (eu2(), t2.segments.push({ from: i2.length || el2 }));
          }, "eg"), em2 = /* @__PURE__ */ __name((e3, t3, i3, s3, r3) => {
            ed2(r3), ef2(e3 + i3, t3), ed2(r3), ef2(e3, t3), ed2(r3), ef2(e3, t3 + s3), ed2(r3), ef2(e3, t3 + s3), ed2(r3), ef2(e3 + i3, t3 + s3), ed2(r3), ef2(e3 + i3, t3);
          }, "em");
          if (eg2(), k2 && k2.length > 0) {
            t2.skipTranslation = true, t2.drawMode = "TRIANGLES", k2[0].node && k2[0].node.levelDynamic && k2.sort((e3, t3) => {
              if (e3.node) {
                if (e3.node.levelDynamic > t3.node.levelDynamic) return 1;
                if (e3.node.levelDynamic < t3.node.levelDynamic) return -1;
              }
              return 0;
            }), k2.forEach((t3) => {
              let i3, s3, r3 = t3.plotY;
              if (void 0 !== r3 && !isNaN(r3) && null !== t3.y && t3.shapeArgs) {
                let { x: r4 = 0, y: o3 = 0, width: a3 = 0, height: l3 = 0 } = t3.shapeArgs;
                i3 = (s3 = n2.styledMode ? t3.series.colorAttribs(t3) : s3 = t3.series.pointAttribs(t3))["stroke-width"] || 0, et2 = w(s3.fill).rgba, et2[0] /= 255, et2[1] /= 255, et2[2] /= 255, e2.is("treemap") && (i3 = i3 || 1, X2 = w(s3.stroke).rgba, X2[0] /= 255, X2[1] /= 255, X2[2] /= 255, em2(r4, o3, a3, l3, X2), i3 /= 2), e2.is("heatmap") && n2.inverted && (r4 = h2.len - r4, o3 = d2.len - o3, a3 = -a3, l3 = -l3), em2(r4 + i3, o3 + i3, a3 - 2 * i3, l3 - 2 * i3, et2);
              }
            }), eu2();
            return;
          }
          for (; Z2 < M2.length - 1; ) {
            if (void 0 === (q2 = M2[++Z2])) continue;
            if (U2) break;
            let i3 = u2 && u2[Z2];
            if (!P2) {
              _(i3, true) && i3.color && (et2 = w(i3.color).rgba);
              let t3 = e2.options.keys?.indexOf("color");
              Array.isArray(i3) && t3 && "string" == typeof i3[t3] ? et2 = w(i3[t3]).rgba : T2 && n2.options.colors && (eh2 %= n2.options.colors.length, et2 = w(n2.options.colors[eh2]).rgba), et2 && (et2[0] /= 255, et2[1] /= 255, et2[2] /= 255), eh2++;
            }
            if (P2 ? (W2 = q2[0], j2 = q2[1], M2[Z2 + 1] && (Q2 = M2[Z2 + 1][0]), M2[Z2 - 1] && (K2 = M2[Z2 - 1][0]), q2.length >= 3 && (Y2 = q2[2], q2[2] > t2.zMax && (t2.zMax = q2[2]), q2[2] < t2.zMin && (t2.zMin = q2[2]))) : (W2 = q2, j2 = y2?.[Z2], M2[Z2 + 1] && (Q2 = M2[Z2 + 1]), M2[Z2 - 1] && (K2 = M2[Z2 - 1]), v2 && v2.length && (Y2 = v2[Z2], v2[Z2] > t2.zMax && (t2.zMax = v2[Z2]), v2[Z2] < t2.zMin && (t2.zMin = v2[Z2]))), !C2 && (null === W2 || null === j2)) {
              eg2();
              continue;
            }
            if (Q2 && Q2 >= m2 && Q2 <= c2 && ($2 = true), K2 && K2 >= m2 && K2 <= c2 && (ee2 = true), o2 ? (P2 && (j2 = q2.slice(1, 3)), J2 = e2.getColumn("low", true)?.[Z2], j2 = e2.getColumn("high", true)?.[Z2] || 0) : f2 && (W2 = q2.x, J2 = (j2 = q2.stackY) - q2.y), null != b2 && null != x2 && (es2 = j2 >= b2 && j2 <= x2), !l2 && !es2 || (W2 > c2 && S2.x < c2 && (S2.x = W2, S2.y = j2), W2 < m2 && E2.x > m2 && (E2.x = W2, E2.y = j2), null === j2 && C2)) continue;
            if (null === j2 || !es2 && M2.length > 1 && !$2 && !ee2) {
              eg2();
              continue;
            }
            if ((l2 && (Q2 >= m2 || W2 >= m2) && (K2 <= c2 || W2 <= c2) || !l2 && W2 >= m2 && W2 <= c2) && (ei2 = true), ei2 || $2 || ee2) {
              if (ea2 && W2 - K2 > ea2 && eg2(), z2) {
                let e3;
                z2.some((t3, i4) => {
                  let s3 = z2[i4 - 1];
                  return "x" === L2 ? void 0 !== t3.value && W2 <= t3.value && (eo2[i4] && (!s3 || W2 >= s3.value) && (e3 = eo2[i4]), true) : void 0 !== t3.value && j2 <= t3.value && (eo2[i4] && (!s3 || j2 >= s3.value) && (e3 = eo2[i4]), true);
                }), et2 = e3 || en2 || et2;
              }
              if (s2.useGPUTranslations || (t2.skipTranslation = true, W2 = h2.toPixels(W2, true), j2 = d2.toPixels(j2, true), !(W2 > G2) || "POINTS" !== t2.drawMode)) {
                if (t2.hasMarkers && ei2 && false !== B2 && (e2.closestPointRangePx = Math.min(e2.closestPointRangePx, Math.abs(W2 - B2))), !s2.useGPUTranslations && !s2.usePreallocated && B2 && 1 > Math.abs(W2 - B2) && O2 && 1 > Math.abs(j2 - O2)) {
                  s2.debug.showSkipSummary && ++F2;
                  continue;
                }
                R2 && (V2 = J2 || 0, (false === J2 || void 0 === J2) && (V2 = j2 < 0 ? j2 : 0), (o2 || f2) && !d2.logarithmic || (V2 = Math.max(null === D2 ? b2 : D2, b2)), s2.useGPUTranslations || (V2 = d2.toPixels(V2, true)), ef2(W2, V2, false, 0, et2)), a2.step && !er2 && ef2(W2, O2, false, 2, et2), ef2(W2, j2, false, "bubble" === e2.type ? Y2 || 1 : 2, et2), B2 = W2, O2 = j2, H2 = true, er2 = false;
              }
            }
          }
          s2.debug.showSkipSummary && console.log("skipped points:", F2);
          let ec2 = /* @__PURE__ */ __name((e3, i3) => {
            if (s2.useGPUTranslations || (t2.skipTranslation = true, e3.x = h2.toPixels(e3.x, true), e3.y = d2.toPixels(e3.y, true)), i3) {
              this.data = [e3.x, e3.y, 0, 2].concat(this.data);
              return;
            }
            ef2(e3.x, e3.y, 0, 2);
          }, "ec");
          !H2 && false !== C2 && "line_strip" === e2.drawMode && (E2.x < Number.MAX_VALUE && ec2(E2, true), S2.x > -Number.MAX_VALUE && ec2(S2)), eu2();
        }
        pushSeries(e2) {
          let t2 = this.markerData, i2 = this.series, s2 = this.settings;
          i2.length > 0 && i2[i2.length - 1].hasMarkers && (i2[i2.length - 1].markerTo = t2.length), s2.debug.timeSeriesProcessing && console.time("building " + e2.type + " series");
          let r2 = { segments: [], markerFrom: t2.length, colorData: [], series: e2, zMin: Number.MAX_VALUE, zMax: -Number.MAX_VALUE, hasMarkers: !!e2.options.marker && false !== e2.options.marker.enabled, showMarkers: true, drawMode: P[e2.type] || "LINE_STRIP" };
          e2.index >= i2.length ? i2.push(r2) : i2[e2.index] = r2, this.pushSeriesData(e2, r2), s2.debug.timeSeriesProcessing && console.timeEnd("building " + e2.type + " series");
        }
        flush() {
          let e2 = this.vbuffer;
          this.data = [], this.markerData = [], this.series = [], e2 && e2.destroy();
        }
        setXAxis(e2) {
          let t2 = this.shader;
          if (!t2) return;
          let i2 = this.getPixelRatio();
          t2.setUniform("xAxisTrans", e2.transA * i2), t2.setUniform("xAxisMin", e2.min), t2.setUniform("xAxisMax", e2.max), t2.setUniform("xAxisMinPad", e2.minPixelPadding * i2), t2.setUniform("xAxisPointRange", e2.pointRange), t2.setUniform("xAxisLen", e2.len * i2), t2.setUniform("xAxisPos", e2.pos * i2), t2.setUniform("xAxisCVSCoord", !e2.horiz), t2.setUniform("xAxisIsLog", !!e2.logarithmic), t2.setUniform("xAxisReversed", !!e2.reversed);
        }
        setYAxis(e2) {
          let t2 = this.shader;
          if (!t2) return;
          let i2 = this.getPixelRatio();
          t2.setUniform("yAxisTrans", e2.transA * i2), t2.setUniform("yAxisMin", e2.min), t2.setUniform("yAxisMax", e2.max), t2.setUniform("yAxisMinPad", e2.minPixelPadding * i2), t2.setUniform("yAxisPointRange", e2.pointRange), t2.setUniform("yAxisLen", e2.len * i2), t2.setUniform("yAxisPos", e2.pos * i2), t2.setUniform("yAxisCVSCoord", !e2.horiz), t2.setUniform("yAxisIsLog", !!e2.logarithmic), t2.setUniform("yAxisReversed", !!e2.reversed);
        }
        setThreshold(e2, t2) {
          let i2 = this.shader;
          i2 && (i2.setUniform("hasThreshold", e2), i2.setUniform("translatedThreshold", t2));
        }
        renderChart(e2) {
          let t2 = this.gl, i2 = this.settings, s2 = this.shader, r2 = this.vbuffer, o2 = this.getPixelRatio();
          if (!e2) return false;
          this.width = e2.chartWidth * o2, this.height = e2.chartHeight * o2;
          let n2 = this.height, a2 = this.width;
          if (!t2 || !s2 || !a2 || !n2) return false;
          i2.debug.timeRendering && console.time("gl rendering"), t2.canvas.width = a2, t2.canvas.height = n2, s2.bind(), t2.viewport(0, 0, a2, n2), s2.setPMatrix(_O.orthoMatrix(a2, n2)), i2.lineWidth > 1 && !d().isMS && t2.lineWidth(i2.lineWidth), r2 && (r2.build(this.data, "aVertexPosition", 4), r2.bind()), s2.setInverted(e2.inverted), this.series.forEach((a3, l2) => {
            let h2 = a3.series.options, d2 = h2.marker, f2 = void 0 !== h2.lineWidth ? h2.lineWidth : 1, u2 = h2.threshold, g2 = L(u2), m2 = a3.series.yAxis.getThreshold(u2), c2 = I(h2.marker ? h2.marker.enabled : null, !!a3.series.xAxis.isRadial || null, a3.series.closestPointRangePx > 2 * ((h2.marker ? h2.marker.radius : 10) || 10)), p2 = this.textureHandles[d2 && d2.symbol || a3.series.symbol] || this.textureHandles.circle, b2, x2, A2, y2 = [];
            if (0 !== a3.segments.length && a3.segments[0].from !== a3.segments[0].to && (p2.isReady && (t2.bindTexture(t2.TEXTURE_2D, p2.handle), s2.setTexture(p2.handle)), e2.styledMode ? a3.series.markerGroup === a3.series.chart.boost?.markerGroup ? (delete a3.series.markerGroup, a3.series.markerGroup = a3.series.plotGroup("markerGroup", "markers", "visible", 1, e2.seriesGroup).addClass("highcharts-tracker"), A2 = a3.series.markerGroup.getStyle("fill"), a3.series.markerGroup.destroy(), a3.series.markerGroup = a3.series.chart.boost?.markerGroup) : A2 = a3.series.markerGroup?.getStyle("fill") : (A2 = "POINTS" === a3.drawMode && a3.series.pointAttribs && a3.series.pointAttribs().fill || a3.series.color, h2.colorByPoint && (A2 = a3.series.chart.options.colors[l2])), a3.series.fillOpacity && h2.fillOpacity && (A2 = new (v())(A2).setOpacity(I(h2.fillOpacity, 1)).get()), y2 = w(A2).rgba, i2.useAlpha || (y2[3] = 1), "add" === h2.boostBlending ? (t2.blendFunc(t2.SRC_ALPHA, t2.ONE), t2.blendEquation(t2.FUNC_ADD)) : "mult" === h2.boostBlending || "multiply" === h2.boostBlending ? t2.blendFunc(t2.DST_COLOR, t2.ZERO) : "darken" === h2.boostBlending ? (t2.blendFunc(t2.ONE, t2.ONE), t2.blendEquation(t2.FUNC_MIN)) : t2.blendFuncSeparate(t2.SRC_ALPHA, t2.ONE_MINUS_SRC_ALPHA, t2.ONE, t2.ONE_MINUS_SRC_ALPHA), s2.reset(), a3.colorData.length > 0 ? (s2.setUniform("hasColor", 1), (x2 = new E(t2, s2)).build(Array(a3.segments[0].from).concat(a3.colorData), "aColor", 4), x2.bind()) : (s2.setUniform("hasColor", 0), t2.disableVertexAttribArray(t2.getAttribLocation(s2.getProgram(), "aColor"))), s2.setColor(y2), this.setXAxis(a3.series.xAxis), this.setYAxis(a3.series.yAxis), this.setThreshold(g2, m2), "POINTS" === a3.drawMode && s2.setPointSize(2 * I(h2.marker && h2.marker.radius, 0.5) * o2), s2.setSkipTranslation(a3.skipTranslation), "bubble" === a3.series.type && s2.setBubbleUniforms(a3.series, a3.zMin, a3.zMax, o2), s2.setDrawAsCircle(G[a3.series.type] || false), r2)) {
              if (f2 > 0 || "LINE_STRIP" !== a3.drawMode) {
                let { x: i3, y: s3, width: o3, height: l3 } = S(e2, a3.series);
                for (t2.enable(t2.SCISSOR_TEST), t2.scissor(i3, n2 - s3 - l3, o3, l3), b2 = 0; b2 < a3.segments.length; b2++) r2.render(a3.segments[b2].from, a3.segments[b2].to, a3.drawMode);
                t2.disable(t2.SCISSOR_TEST);
              }
              if (a3.hasMarkers && c2) for (s2.setPointSize(2 * I(h2.marker && h2.marker.radius, 5) * o2), s2.setDrawAsCircle(true), b2 = 0; b2 < a3.segments.length; b2++) r2.render(a3.segments[b2].from, a3.segments[b2].to, "POINTS");
            }
          }), i2.debug.timeRendering && console.timeEnd("gl rendering"), this.postRenderCallback && this.postRenderCallback(this), this.flush();
        }
        render(e2) {
          if (this.clear(), e2.renderer.forExport) return this.renderChart(e2);
          this.isInited ? this.renderChart(e2) : setTimeout(() => {
            this.render(e2);
          }, 1);
        }
        setSize(e2, t2) {
          let i2 = this.shader;
          i2 && (this.width !== e2 || this.height !== t2) && (this.width = e2, this.height = t2, i2.bind(), i2.setPMatrix(_O.orthoMatrix(e2, t2)));
        }
        init(e2, t2) {
          let i2 = this.settings;
          if (this.isInited = false, !e2) return false;
          i2.debug.timeSetup && console.time("gl setup");
          for (let t3 = 0; t3 < B.length && (this.gl = e2.getContext(B[t3], {}), !this.gl); ++t3) ;
          let s2 = this.gl;
          if (!s2) return false;
          t2 || this.flush(), s2.enable(s2.BLEND), s2.blendFunc(s2.SRC_ALPHA, s2.ONE_MINUS_SRC_ALPHA), s2.disable(s2.DEPTH_TEST), s2.depthFunc(s2.LESS);
          let r2 = this.shader = new M(s2);
          if (!r2) return false;
          this.vbuffer = new E(s2, r2);
          let o2 = /* @__PURE__ */ __name((e3, t3) => {
            let i3 = { isReady: false, texture: U.createElement("canvas"), handle: s2.createTexture() }, r3 = i3.texture.getContext("2d");
            this.textureHandles[e3] = i3, i3.texture.width = 512, i3.texture.height = 512, r3.mozImageSmoothingEnabled = false, r3.webkitImageSmoothingEnabled = false, r3.msImageSmoothingEnabled = false, r3.imageSmoothingEnabled = false, r3.strokeStyle = "rgba(255, 255, 255, 0)", r3.fillStyle = "#FFF", t3(r3);
            try {
              s2.activeTexture(s2.TEXTURE0), s2.bindTexture(s2.TEXTURE_2D, i3.handle), s2.texImage2D(s2.TEXTURE_2D, 0, s2.RGBA, s2.RGBA, s2.UNSIGNED_BYTE, i3.texture), s2.texParameteri(s2.TEXTURE_2D, s2.TEXTURE_WRAP_S, s2.CLAMP_TO_EDGE), s2.texParameteri(s2.TEXTURE_2D, s2.TEXTURE_WRAP_T, s2.CLAMP_TO_EDGE), s2.texParameteri(s2.TEXTURE_2D, s2.TEXTURE_MAG_FILTER, s2.LINEAR), s2.texParameteri(s2.TEXTURE_2D, s2.TEXTURE_MIN_FILTER, s2.LINEAR), s2.bindTexture(s2.TEXTURE_2D, null), i3.isReady = true;
            } catch {
            }
          }, "o");
          return o2("circle", (e3) => {
            e3.beginPath(), e3.arc(256, 256, 256, 0, 2 * Math.PI), e3.stroke(), e3.fill();
          }), o2("square", (e3) => {
            e3.fillRect(0, 0, 512, 512);
          }), o2("diamond", (e3) => {
            e3.beginPath(), e3.moveTo(256, 0), e3.lineTo(512, 256), e3.lineTo(256, 512), e3.lineTo(0, 256), e3.lineTo(256, 0), e3.fill();
          }), o2("triangle", (e3) => {
            e3.beginPath(), e3.moveTo(0, 512), e3.lineTo(256, 0), e3.lineTo(512, 512), e3.lineTo(0, 512), e3.fill();
          }), o2("triangle-down", (e3) => {
            e3.beginPath(), e3.moveTo(0, 0), e3.lineTo(256, 512), e3.lineTo(512, 0), e3.lineTo(0, 0), e3.fill();
          }), this.isInited = true, i2.debug.timeSetup && console.timeEnd("gl setup"), true;
        }
        destroy() {
          let e2 = this.gl, t2 = this.shader, i2 = this.vbuffer;
          this.flush(), i2 && i2.destroy(), t2 && t2.destroy(), e2 && (D(this.textureHandles, (t3) => {
            t3.handle && e2.deleteTexture(t3.handle);
          }), e2.canvas.width = 1, e2.canvas.height = 1);
        }
      };
      __name(_O, "O");
      let O = _O;
      !(function(e2) {
        e2.setLength = function(e3, t2, i2) {
          return Array.isArray(e3) ? (e3.length = t2, e3) : e3[i2 ? "subarray" : "slice"](0, t2);
        }, e2.splice = function(e3, t2, i2, s2, r2 = []) {
          if (Array.isArray(e3)) return Array.isArray(r2) || (r2 = Array.from(r2)), { removed: e3.splice(t2, i2, ...r2), array: e3 };
          let o2 = Object.getPrototypeOf(e3).constructor, n2 = e3[s2 ? "subarray" : "slice"](t2, t2 + i2), a2 = new o2(e3.length - i2 + r2.length);
          return a2.set(e3.subarray(0, t2), 0), a2.set(r2, t2), a2.set(e3.subarray(t2 + i2), t2 + r2.length), { removed: n2, array: a2 };
        };
      })(r || (r = {}));
      let { setLength: V, splice: X } = r, { fireEvent: F, objectEach: H, uniqueKey: W } = d(), j = (_c = class {
        constructor(e2 = {}) {
          this.autoId = !e2.id, this.columns = {}, this.id = e2.id || W(), this.modified = this, this.rowCount = 0, this.versionTag = W();
          let t2 = 0;
          H(e2.columns || {}, (e3, i2) => {
            this.columns[i2] = e3.slice(), t2 = Math.max(t2, e3.length);
          }), this.applyRowCount(t2);
        }
        applyRowCount(e2) {
          this.rowCount = e2, H(this.columns, (t2, i2) => {
            t2.length !== e2 && (this.columns[i2] = V(t2, e2));
          });
        }
        deleteRows(e2, t2 = 1) {
          if (t2 > 0 && e2 < this.rowCount) {
            let i2 = 0;
            H(this.columns, (s2, r2) => {
              this.columns[r2] = X(s2, e2, t2).array, i2 = s2.length;
            }), this.rowCount = i2;
          }
          F(this, "afterDeleteRows", { rowIndex: e2, rowCount: t2 }), this.versionTag = W();
        }
        getColumn(e2, t2) {
          return this.columns[e2];
        }
        getColumns(e2, t2) {
          return (e2 || Object.keys(this.columns)).reduce((e3, t3) => (e3[t3] = this.columns[t3], e3), {});
        }
        getRow(e2, t2) {
          return (t2 || Object.keys(this.columns)).map((t3) => this.columns[t3]?.[e2]);
        }
        setColumn(e2, t2 = [], i2 = 0, s2) {
          this.setColumns({ [e2]: t2 }, i2, s2);
        }
        setColumns(e2, t2, i2) {
          let s2 = this.rowCount;
          H(e2, (e3, t3) => {
            this.columns[t3] = e3.slice(), s2 = e3.length;
          }), this.applyRowCount(s2), i2?.silent || (F(this, "afterSetColumns"), this.versionTag = W());
        }
        setRow(e2, t2 = this.rowCount, i2, s2) {
          let { columns: r2 } = this, o2 = i2 ? this.rowCount + 1 : t2 + 1;
          H(e2, (e3, n2) => {
            let a2 = r2[n2] || s2?.addColumns !== false && Array(o2);
            a2 && (i2 ? a2 = X(a2, t2, 0, true, [e3]).array : a2[t2] = e3, r2[n2] = a2);
          }), o2 > this.rowCount && this.applyRowCount(o2), s2?.silent || (F(this, "afterSetRows"), this.versionTag = W());
        }
      }, __name(_c, "j"), _c), { getBoostClipRect: q, isChartSeriesBoosting: Y } = A, { getOptions: Z } = d(), { composed: K, doc: Q, noop: J, win: $ } = d(), { addEvent: ee, destroyObjectProperties: et, error: ei, extend: es, fireEvent: er, isArray: eo, isNumber: en, pick: ea, pushUnique: el, wrap: eh, defined: ed } = d();
      function ef(e2, t2) {
        let i2 = t2.boost;
        e2 && i2 && i2.target && i2.canvas && !Y(t2.chart) && e2.allocateBufferForSingleSeries(t2);
      }
      __name(ef, "ef");
      function eu(e2) {
        return ea(e2 && e2.options && e2.options.boost && e2.options.boost.enabled, true);
      }
      __name(eu, "eu");
      function eg(e2, t2) {
        let i2 = e2.constructor, r2 = e2.seriesGroup || t2.group, o2 = e2.chartWidth, n2 = e2.chartHeight, a2 = e2, l2 = "undefined" != typeof SVGForeignObjectElement, h2 = false;
        Y(e2) ? a2 = e2 : (a2 = t2, h2 = !!(t2.options.events?.click || t2.options.point?.events?.click));
        let d2 = a2.boost = a2.boost || {};
        if (l2 = false, s || (s = Q.createElement("canvas")), !d2.target && (d2.canvas = s, e2.renderer.forExport || !l2 ? (a2.renderTarget = d2.target = e2.renderer.image("", 0, 0, o2, n2).addClass("highcharts-boost-canvas").add(r2), d2.clear = function() {
          d2.target.attr({ href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" });
        }, d2.copy = function() {
          d2.resize(), d2.target.attr({ href: d2.canvas.toDataURL("image/png") });
        }) : (d2.targetFo = e2.renderer.createElement("foreignObject").add(r2), a2.renderTarget = d2.target = Q.createElement("canvas"), d2.targetCtx = d2.target.getContext("2d"), d2.targetFo.element.appendChild(d2.target), d2.clear = function() {
          d2.target.width = d2.canvas.width, d2.target.height = d2.canvas.height;
        }, d2.copy = function() {
          d2.target.width = d2.canvas.width, d2.target.height = d2.canvas.height, d2.targetCtx.drawImage(d2.canvas, 0, 0);
        }), d2.resize = function() {
          o2 = e2.chartWidth, n2 = e2.chartHeight, (d2.targetFo || d2.target).attr({ x: 0, y: 0, width: o2, height: n2 }).css({ pointerEvents: h2 ? void 0 : "none", mixedBlendMode: "normal", opacity: 1 }).addClass(h2 ? "highcharts-tracker" : ""), a2 instanceof i2 && a2.boost?.markerGroup?.translate(e2.plotLeft, e2.plotTop);
        }, d2.clipRect = e2.renderer.clipRect(), (d2.targetFo || d2.target).attr({ zIndex: t2.options.zIndex }), a2 instanceof i2 && (a2.boost.markerGroup = a2.renderer.g().add(r2).translate(t2.xAxis.pos, t2.yAxis.pos))), d2.canvas.width = o2, d2.canvas.height = n2, d2.clipRect) {
          let t3 = q(e2, a2);
          d2.clipRect.attr(t3), t3.width === e2.clipBox.width && t3.height === e2.clipBox.height ? r2?.clip(e2.renderer.clipRect(t3.x - 4, t3.y, t3.width + 4, t3.height + 4)) : (d2.targetFo || d2.target).clip(d2.clipRect);
        }
        return d2.resize(), d2.clear(), !d2.wgl && (d2.wgl = new O((e3) => {
          e3.settings.debug.timeBufferCopy && console.time("buffer copy"), d2.copy(), e3.settings.debug.timeBufferCopy && console.timeEnd("buffer copy");
        }), d2.wgl.init(d2.canvas) || ei("[highcharts boost] - unable to init WebGL renderer"), d2.wgl.setOptions(e2.options.boost || {}), a2 instanceof i2 && d2.wgl.allocateBuffer(e2)), d2.wgl.setSize(o2, n2), d2.wgl;
      }
      __name(eg, "eg");
      function em(e2) {
        let t2 = e2.points;
        if (t2) {
          let e3, i2;
          for (i2 = 0; i2 < t2.length; i2 += 1) (e3 = t2[i2]) && e3.destroyElements && e3.destroyElements();
        }
        for (let t3 of (["graph", "area", "tracker"].forEach((t4) => {
          let i2 = e2[t4];
          i2 && (e2[t4] = i2.destroy());
        }), e2.zones)) et(t3, void 0, true);
      }
      __name(em, "em");
      function ec(e2, t2, i2, s2, r2, o2) {
        let n2 = (r2 = r2 || 0) + (s2 = s2 || 3e3), a2 = true;
        for (; a2 && r2 < n2 && r2 < e2.length; ) a2 = t2(e2[r2], r2), ++r2;
        a2 && (r2 < e2.length ? o2 ? ec(e2, t2, i2, s2, r2, o2) : $.requestAnimationFrame ? $.requestAnimationFrame(function() {
          ec(e2, t2, i2, s2, r2);
        }) : setTimeout(ec, 0, e2, t2, i2, s2, r2) : i2 && i2());
      }
      __name(ec, "ec");
      function ep(e2, t2) {
        let i2 = e2.options, s2 = e2.dataTable.modified.rowCount, r2 = e2.xAxis && e2.xAxis.options, o2 = e2.yAxis && e2.yAxis.options, n2 = e2.colorAxis && e2.colorAxis.options;
        return s2 > ea(i2.boostThreshold, Number.MAX_VALUE) && en(o2.min) && en(o2.max) && (!t2 || en(r2.min) && en(r2.max)) && (!n2 || en(n2.min) && en(n2.max));
      }
      __name(ep, "ep");
      let eb = /* @__PURE__ */ __name((e2, t2) => !e2.forceCrop && (Y(e2.chart) || (t2 ? t2.length : 0) >= ea(e2.options.boostThreshold, Number.MAX_VALUE)), "eb");
      function ex() {
        let e2 = this, t2 = e2.chart;
        t2.boost && t2.boost.markerGroup === e2.markerGroup && (e2.markerGroup = void 0), t2.hoverPoints && (t2.hoverPoints = t2.hoverPoints.filter(function(t3) {
          return t3.series === e2;
        })), t2.hoverPoint && t2.hoverPoint.series === e2 && (t2.hoverPoint = void 0);
      }
      __name(ex, "ex");
      function eA() {
        let e2 = this.boost;
        e2 && e2.canvas && e2.target && (e2.wgl && e2.wgl.clear(), e2.clear && e2.clear());
      }
      __name(eA, "eA");
      function ey(e2) {
        let t2 = e2.boost;
        t2 && t2.canvas && t2.target && t2.wgl && !Y(e2.chart) && t2.wgl.render(e2.chart);
      }
      __name(ey, "ey");
      function ev(e2, t2) {
        let i2 = e2.options, s2 = e2.xAxis, r2 = e2.pointClass;
        if (t2 instanceof r2) return t2;
        let o2 = i2.data, n2 = e2.is("scatter"), a2 = (n2 && e2.getColumn("x", true).length ? e2.getColumn("x", true) : void 0) || (e2.getColumn("x").length ? e2.getColumn("x") : void 0) || i2.xData || e2.getColumn("x", true) || false, l2 = e2.getColumn("y", true) || i2.yData || false, h2 = t2.i, d2 = o2?.[h2]?.color, f2 = new r2(e2, n2 && a2 && l2 ? [a2[h2], l2[h2]] : (eo(o2) ? o2 : [])[h2], a2 ? a2[h2] : void 0);
        if (n2 && i2?.keys?.length) {
          let e3 = i2.keys;
          for (let t3 = e3.length - 1; t3 > -1; t3--) f2[e3[t3]] = o2[h2][t3];
        }
        return f2.category = ea(s2.categories ? s2.categories[f2.x] : f2.x, f2.x), f2.key = f2.name ?? f2.category, f2.dist = t2.dist, f2.distX = t2.distX, f2.plotX = t2.plotX, f2.plotY = t2.plotY, f2.index = h2, f2.percentage = t2.percentage, f2.isInside = e2.isPointInside(f2), d2 && (f2.color = d2), f2;
      }
      __name(ev, "ev");
      function eP(e2) {
        let { options: t2, xAxis: i2, yAxis: s2 } = this;
        if (!this.isDirty && !i2.isDirty && !s2.isDirty && !e2) return false;
        this.yAxis.setTickInterval();
        let r2 = t2.boostThreshold || 0, o2 = t2.cropThreshold, n2 = this.getColumn("x"), a2 = i2.getExtremes(), l2 = a2.max ?? Number.MAX_VALUE, h2 = a2.min ?? -Number.MAX_VALUE, d2 = this.getColumn("y"), f2 = s2.getExtremes(), u2 = f2.max ?? Number.MAX_VALUE, g2 = f2.min ?? -Number.MAX_VALUE;
        if (!this.boosted && i2.old && s2.old && h2 >= (i2.old.min ?? -Number.MAX_VALUE) && l2 <= (i2.old.max ?? Number.MAX_VALUE) && g2 >= (s2.old.min ?? -Number.MAX_VALUE) && u2 <= (s2.old.max ?? Number.MAX_VALUE)) return this.dataTable.modified.setColumns({ x: n2, y: d2 }), true;
        let m2 = this.dataTable.rowCount;
        if (!r2 || m2 < r2 || o2 && !this.forceCrop && !this.getExtremesFromAll && !t2.getExtremesFromAll && m2 < o2) return this.dataTable.modified.setColumns({ x: n2, y: d2 }), true;
        let c2 = [], p2 = [], b2 = [], x2 = !(en(a2.max) || en(a2.min)), A2 = !(en(f2.max) || en(f2.min)), y2 = false, v2, P2 = n2[0], T2 = n2[0], C2, k2 = d2?.[0], M2 = d2?.[0];
        for (let e3 = 0, t3 = n2.length; e3 < t3; ++e3) v2 = n2[e3], C2 = d2?.[e3], v2 >= h2 && v2 <= l2 && C2 >= g2 && C2 <= u2 ? (c2.push({ x: v2, y: C2 }), p2.push(v2), b2.push(C2), x2 && (P2 = Math.max(P2, v2), T2 = Math.min(T2, v2)), A2 && (k2 = Math.max(k2, C2), M2 = Math.min(M2, C2))) : y2 = true;
        return x2 && (i2.dataMax = Math.max(P2, i2.dataMax || 0), i2.dataMin = Math.min(T2, i2.dataMin || 0)), A2 && (s2.dataMax = Math.max(k2, s2.dataMax || 0), s2.dataMin = Math.min(M2, s2.dataMin || 0)), this.cropped = y2, this.cropStart = 0, y2 && this.dataTable.modified === this.dataTable && (this.dataTable.modified = new j()), this.dataTable.modified.setColumns({ x: p2, y: b2 }), eb(this, p2) || (this.processedData = c2), true;
      }
      __name(eP, "eP");
      function eT() {
        let e2 = this.options || {}, t2 = this.chart, s2 = t2.boost, r2 = this.boost, o2 = this.xAxis, n2 = this.yAxis, a2 = e2.xData || this.getColumn("x", true), l2 = e2.yData || this.getColumn("y", true), h2 = this.getColumn("low", true), d2 = this.getColumn("high", true), f2 = this.processedData || e2.data, u2 = o2.getExtremes(), g2 = u2.min - (o2.minPointOffset || 0), m2 = u2.max + (o2.minPointOffset || 0), c2 = n2.getExtremes(), p2 = c2.min - (n2.minPointOffset || 0), b2 = c2.max + (n2.minPointOffset || 0), x2 = {}, A2 = !!this.sampling, y2 = e2.enableMouseTracking, v2 = e2.threshold, P2 = this.pointArrayMap && "low,high" === this.pointArrayMap.join(","), T2 = !!e2.stacking, C2 = this.cropStart || 0, k2 = this.requireSorting, M2 = !a2, E2 = "x" === e2.findNearestPointBy, S2 = (this.getColumn("x").length ? this.getColumn("x") : void 0) || this.options.xData || this.getColumn("x", true), w2 = ea(e2.lineWidth, 1), U2 = e2.nullInteraction && p2, R2 = t2.tooltip, L2 = false, _2, z2 = n2.getThreshold(v2), D2, I2, N2, G2;
        if (!this.boosted || (this.points?.forEach((e3) => {
          e3?.destroyElements?.();
        }), this.points = [], R2 && !R2.isHidden ? (t2.hoverPoint?.series === this || t2.hoverPoints?.some((e3) => e3.series === this)) && (t2.hoverPoint = t2.hoverPoints = void 0, R2.hide(0)) : t2.hoverPoints && (t2.hoverPoints = t2.hoverPoints.filter((e3) => e3.series !== this)), o2.isPanning || n2.isPanning) || (L2 = eg(t2, this), t2.boosted = true, !this.visible)) return;
        (this.points || this.graph) && em(this), Y(t2) ? (this.markerGroup && this.markerGroup !== s2?.markerGroup && this.markerGroup.destroy(), this.markerGroup = s2?.markerGroup, r2 && r2.target && (this.renderTarget = r2.target = r2.target.destroy())) : (this.markerGroup === s2?.markerGroup && (this.markerGroup = void 0), this.markerGroup = this.plotGroup("markerGroup", "markers", "visible", 1, t2.seriesGroup).addClass("highcharts-tracker"));
        let B2 = this.points = [], O2 = /* @__PURE__ */ __name((e3, s3, r3, a3) => {
          let l3 = !!S2 && S2[C2 + r3], h3 = /* @__PURE__ */ __name((e4) => {
            t2.inverted && (e4 = o2.len - e4, s3 = n2.len - s3), B2.push({ destroy: J, x: l3, clientX: e4, plotX: e4, plotY: s3, i: C2 + r3, percentage: a3 });
          }, "h");
          e3 = Math.ceil(e3), i = E2 ? e3 : e3 + "," + s3, y2 && (x2[i] ? l3 === S2[S2.length - 1] && (B2.length--, h3(e3)) : (x2[i] = true, h3(e3)));
        }, "O");
        this.buildKDTree = J, er(this, "renderCanvas"), s2 && r2?.target && w2 > 1 && this.is("line") && (s2.lineWidthFilter?.remove(), s2.lineWidthFilter = t2.renderer.definition({ tagName: "filter", children: [{ tagName: "feMorphology", attributes: { operator: "dilate", radius: 0.25 * w2 } }], attributes: { id: "linewidth" } }), r2.target.attr({ filter: "url(#linewidth)" })), L2 && (ef(L2, this), L2.pushSeries(this), ey(this));
        let V2 = L2.settings;
        t2.renderer.forExport || (V2.debug.timeKDTree && console.time("kd tree building"), ec(T2 ? this.data.slice(C2) : a2 || f2, function(e3, i2) {
          let s3 = void 0 === t2.index, r3, a3, f3, u3, c3, x3 = false, y3 = true;
          return !ed(e3) || (!s3 && (M2 ? (r3 = e3[0], a3 = e3[1]) : (r3 = e3, a3 = l2[i2] ?? U2 ?? null), P2 ? (M2 && (a3 = e3.slice(1, 3)), x3 = h2[i2], a3 = d2[i2]) : T2 && (r3 = e3.x, x3 = (a3 = e3.stackY) - e3.y, c3 = e3.percentage), k2 || (y3 = (a3 || 0) >= p2 && a3 <= b2), null !== a3 && r3 >= g2 && r3 <= m2 && y3 && (f3 = o2.toPixels(r3, true), A2 ? ((void 0 === N2 || f3 === _2) && (P2 || (x3 = a3), (void 0 === G2 || a3 > I2) && (I2 = a3, G2 = i2), (void 0 === N2 || x3 < D2) && (D2 = x3, N2 = i2)), E2 && f3 === _2 || (void 0 !== N2 && (u3 = n2.toPixels(I2, true), z2 = n2.toPixels(D2, true), O2(f3, u3, G2, c3), z2 !== u3 && O2(f3, z2, N2, c3)), N2 = G2 = void 0, _2 = f3)) : O2(f3, u3 = Math.ceil(n2.toPixels(a3, true)), i2, c3))), !s3);
        }, () => {
          er(this, "renderedCanvas"), delete this.buildKDTree, this.options && this.buildKDTree(), V2.debug.timeKDTree && console.timeEnd("kd tree building");
        }));
      }
      __name(eT, "eT");
      function eC(e2) {
        let t2 = true;
        if (this.chart.options && this.chart.options.boost && (t2 = void 0 === this.chart.options.boost.enabled || this.chart.options.boost.enabled), !t2 || !this.boosted) return e2.call(this);
        this.chart.boosted = true;
        let i2 = eg(this.chart, this);
        i2 && (ef(i2, this), i2.pushSeries(this)), ey(this);
      }
      __name(eC, "eC");
      function ek(e2) {
        if (this.boosted) {
          if (ep(this)) return {};
          if (this.xAxis.isPanning || this.yAxis.isPanning) return this;
        }
        return e2.apply(this, [].slice.call(arguments, 1));
      }
      __name(ek, "ek");
      function eM(e2) {
        let t2 = this.options.data;
        if (eu(this.chart) && u[this.type]) {
          let s2 = this.is("scatter") && !this.is("bubble") && !this.is("treemap") && !this.is("heatmap");
          if (!eb(this, t2) || s2 || this.is("treemap") || this.options.stacking || !ep(this, true)) {
            if (this.boosted && (this.xAxis?.isPanning || this.yAxis?.isPanning)) return;
            s2 && "treegrid" !== this.yAxis.type ? eP.call(this, arguments[1]) : e2.apply(this, [].slice.call(arguments, 1)), t2 = this.getColumn("x", true);
          }
          if (this.boosted = eb(this, t2), this.boosted) {
            let e3;
            this.options.data?.length && (en(e3 = this.getFirstValidPoint(this.options.data)) || eo(e3) || this.is("treemap") || ei(12, false, this.chart));
            var i2 = this;
            i2.boost = i2.boost || { getPoint: /* @__PURE__ */ __name((e4) => ev(i2, e4), "getPoint") };
            let t3 = i2.boost.altered = [];
            if (["allowDG", "directTouch", "stickyTracking"].forEach((e4) => {
              t3.push({ prop: e4, val: i2[e4], own: Object.hasOwnProperty.call(i2, e4) });
            }), i2.allowDG = false, i2.directTouch = false, i2.stickyTracking = true, i2.finishedAnimating = true, i2.labelBySeries && (i2.labelBySeries = i2.labelBySeries.destroy()), i2.is("scatter") && !i2.is("treemap") && i2.data.length) {
              for (let e4 of i2.data) e4?.destroy?.();
              i2.data.length = 0, i2.points.length = 0, delete i2.processedData;
            }
          } else !(function(e3) {
            let t3 = e3.boost, i3 = e3.chart, s3 = i3.boost;
            if (s3?.markerGroup) for (let e4 of (s3.markerGroup.destroy(), s3.markerGroup = void 0, i3.series)) e4.markerGroup = void 0, e4.markerGroup = e4.plotGroup("markerGroup", "markers", "visible", 1, i3.seriesGroup).addClass("highcharts-tracker");
            t3 && ((t3.altered || []).forEach((t4) => {
              t4.own ? e3[t4.prop] = t4.val : delete e3[t4.prop];
            }), t3.clear && t3.clear()), (i3.seriesGroup || e3.group)?.clip();
          })(this);
        } else e2.apply(this, [].slice.call(arguments, 1));
      }
      __name(eM, "eM");
      function eE(e2) {
        let t2 = e2.apply(this, [].slice.call(arguments, 1));
        return this.boost && t2 ? this.boost.getPoint(t2) : t2;
      }
      __name(eE, "eE");
      let eS = { compose: /* @__PURE__ */ __name(function(e2, t2, i2, s2) {
        if (el(K, "Boost.Series")) {
          let r2 = Z().plotOptions, o2 = e2.prototype;
          if (ee(e2, "destroy", ex), ee(e2, "hide", eA), s2 && (o2.renderCanvas = eT), eh(o2, "getExtremes", ek), eh(o2, "processData", eM), eh(o2, "searchPoint", eE), ["translate", "generatePoints", "drawTracker", "drawPoints", "render"].forEach((e3) => (function(e4, t3, i3) {
            function s3(e5) {
              let t4 = this.options.stacking && ("translate" === i3 || "generatePoints" === i3);
              this.boosted && !t4 && eu(this.chart) && "heatmap" !== this.type && "treemap" !== this.type && u[this.type] && 0 !== this.options.boostThreshold ? "render" === i3 && this.renderCanvas && this.renderCanvas() : e5.call(this);
            }
            __name(s3, "s");
            if (eh(e4, i3, s3), "translate" === i3) for (let e5 of ["column", "arearange", "columnrange", "heatmap", "treemap"]) t3[e5] && eh(t3[e5].prototype, i3, s3);
          })(o2, t2, e3)), eh(i2.prototype, "firePointEvent", function(e3, t3, i3) {
            if ("click" === t3 && this.series.boosted) {
              let e4 = i3.point;
              if ((e4.dist || e4.distX) >= (e4.series.options.marker?.radius ?? 10)) return;
            }
            return e3.apply(this, [].slice.call(arguments, 1));
          }), f.forEach((e3) => {
            let i3 = r2[e3];
            i3 && (i3.boostThreshold = 5e3, i3.boostData = [], t2[e3].prototype.fillOpacity = true);
          }), s2) {
            let { area: e3, areaspline: i3, bubble: s3, column: r3, heatmap: o3, scatter: n2, treemap: a2 } = t2;
            if (e3 && es(e3.prototype, { fill: true, fillOpacity: true, sampling: true }), i3 && es(i3.prototype, { fill: true, fillOpacity: true, sampling: true }), s3) {
              let e4 = s3.prototype;
              delete e4.buildKDTree, eh(e4, "markerAttribs", function(e5) {
                return !this.boosted && e5.apply(this, [].slice.call(arguments, 1));
              });
            }
            r3 && es(r3.prototype, { fill: true, sampling: true }), n2 && (n2.prototype.fill = true), [o3, a2].forEach((e4) => {
              e4 && eh(e4.prototype, "drawPoints", eC);
            });
          }
        }
        return e2;
      }, "compose"), destroyGraphics: em, eachAsync: ec, getPoint: ev }, ew = { defaultHTMLColorMap: { aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", blanchedalmond: "#ffebcd", blue: "#0000ff", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dodgerblue: "#1e90ff", feldspar: "#d19275", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", grey: "#808080", green: "#008000", greenyellow: "#adff2f", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgrey: "#d3d3d3", lightgreen: "#90ee90", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslateblue: "#8470ff", lightslategray: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370d8", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#d87093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", red: "#ff0000", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", violetred: "#d02090", wheat: "#f5deb3", whitesmoke: "#f5f5f5", yellow: "#ffff00", yellowgreen: "#9acd32" } }, { doc: eU, win: eR } = d(), { addEvent: eL, error: e_ } = d(), ez = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
      function eD() {
        let e2, t2 = false;
        if (void 0 !== eR.WebGLRenderingContext) {
          e2 = eU.createElement("canvas");
          for (let t3 = 0; t3 < ez.length; ++t3) try {
            if (null != e2.getContext(ez[t3])) return true;
          } catch {
          }
        }
        return false;
      }
      __name(eD, "eD");
      let eI = { compose: /* @__PURE__ */ __name(function(e2, t2, i2, s2, r2, o2) {
        let n2 = eD();
        n2 || (void 0 !== d().initCanvasBoost ? d().initCanvasBoost() : e_(26)), o2 && !o2.names.lightgoldenrodyellow && (o2.names = __spreadValues(__spreadValues({}, o2.names), ew.defaultHTMLColorMap)), A.compose(e2, n2), eS.compose(i2, s2, r2, n2), eL(t2, "setExtremes", function(e3) {
          for (let t3 of [this.chart, ...this.series].map((e4) => e4.renderTarget).filter(Boolean)) {
            let { horiz: i3, pos: s3 } = this, r3 = i3 ? "scaleX" : "scaleY", o3 = i3 ? "translateX" : "translateY", n3 = t3?.[r3] ?? 1, a2 = 1, l2 = 0, h2 = 1, d2 = "none";
            this.isPanning && (a2 = (e3.scale ?? 1) * n3, l2 = (t3?.[o3] || 0) - a2 * (e3.move || 0) + n3 * s3 - a2 * s3, h2 = 0.7, d2 = "blur(3px)"), t3?.attr({ [r3]: a2, [o3]: l2 }).css({ transition: "250ms filter, 250ms opacity", filter: d2, opacity: h2 });
          }
        });
      }, "compose"), hasWebGLSupport: eD }, eN = d();
      eN.hasWebGLSupport = eI.hasWebGLSupport, eI.compose(eN.Chart, eN.Axis, eN.Series, eN.seriesTypes, eN.Point, eN.Color);
      let eG = d();
      return l.default;
    })());
  }
});
export default require_boost();
//# sourceMappingURL=highcharts_modules_boost.js.map
