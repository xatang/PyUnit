import {
  __name
} from "./chunk-KQSGOR2U.js";

// node_modules/tslib/tslib.es6.mjs
var extendStatics = /* @__PURE__ */ __name(function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
}, "extendStatics");
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  __name(__, "__");
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
__name(__extends, "__extends");
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
__name(__awaiter, "__awaiter");
function __generator(thisArg, body) {
  var _ = { label: 0, sent: /* @__PURE__ */ __name(function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, "sent"), trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  __name(verb, "verb");
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
  __name(step, "step");
}
__name(__generator, "__generator");
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: /* @__PURE__ */ __name(function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }, "next")
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
__name(__values, "__values");
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
__name(__read, "__read");
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from2.length, ar; i < l; i++) {
    if (ar || !(i in from2)) {
      if (!ar) ar = Array.prototype.slice.call(from2, 0, i);
      ar[i] = from2[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
__name(__spreadArray, "__spreadArray");
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
__name(__await, "__await");
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  __name(awaitReturn, "awaitReturn");
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  __name(verb, "verb");
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  __name(resume, "resume");
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  __name(step, "step");
  function fulfill(value) {
    resume("next", value);
  }
  __name(fulfill, "fulfill");
  function reject(value) {
    resume("throw", value);
  }
  __name(reject, "reject");
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
  __name(settle, "settle");
}
__name(__asyncGenerator, "__asyncGenerator");
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  __name(verb, "verb");
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
  __name(settle, "settle");
}
__name(__asyncValues, "__asyncValues");

// node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}
__name(isFunction, "isFunction");

// node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
  var _super = /* @__PURE__ */ __name(function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  }, "_super");
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
__name(createErrorClass, "createErrorClass");

// node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass(function(_super) {
  return /* @__PURE__ */ __name(function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  }, "UnsubscriptionErrorImpl");
});

// node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
__name(arrRemove, "arrRemove");

// node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription = (function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  __name(Subscription2, "Subscription");
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = (function() {
    var empty2 = new Subscription2();
    empty2.closed = true;
    return empty2;
  })();
  return Subscription2;
})();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
__name(isSubscription, "isSubscription");
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
__name(execFinalizer, "execFinalizer");

// node_modules/rxjs/dist/esm5/internal/config.js
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

// node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
  setTimeout: /* @__PURE__ */ __name(function(handler, timeout2) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout2], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout2], __read(args)));
  }, "setTimeout"),
  clearTimeout: /* @__PURE__ */ __name(function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  }, "clearTimeout"),
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}
__name(reportUnhandledError, "reportUnhandledError");

// node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {
}
__name(noop, "noop");

// node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = (function() {
  return createNotification("C", void 0, void 0);
})();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
__name(errorNotification, "errorNotification");
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
__name(nextNotification, "nextNotification");
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}
__name(createNotification, "createNotification");

// node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
__name(errorContext, "errorContext");
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}
__name(captureError, "captureError");

// node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber = (function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  __name(Subscriber2, "Subscriber");
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
})(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
__name(bind, "bind");
var ConsumerObserver = (function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  __name(ConsumerObserver2, "ConsumerObserver");
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
})();
var SafeSubscriber = (function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  __name(SafeSubscriber2, "SafeSubscriber");
  return SafeSubscriber2;
})(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
__name(handleUnhandledError, "handleUnhandledError");
function defaultErrorHandler(err) {
  throw err;
}
__name(defaultErrorHandler, "defaultErrorHandler");
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
__name(handleStoppedNotification, "handleStoppedNotification");
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};

// node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable = (function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
})();

// node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
  return x;
}
__name(identity, "identity");

// node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipe() {
  var fns = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }
  return pipeFromArray(fns);
}
__name(pipe, "pipe");
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return /* @__PURE__ */ __name(function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  }, "piped");
}
__name(pipeFromArray, "pipeFromArray");

// node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable = (function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  __name(Observable2, "Observable");
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: /* @__PURE__ */ __name(function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        }, "next"),
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
})();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
__name(getPromiseCtor, "getPromiseCtor");
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
__name(isObserver, "isObserver");
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
__name(isSubscriber, "isSubscriber");

// node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
__name(hasLift, "hasLift");
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
__name(operate, "operate");

// node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
__name(createOperatorSubscriber, "createOperatorSubscriber");
var OperatorSubscriber = (function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  __name(OperatorSubscriber2, "OperatorSubscriber");
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
})(Subscriber);

// node_modules/rxjs/dist/esm5/internal/operators/refCount.js
function refCount() {
  return operate(function(source, subscriber) {
    var connection = null;
    source._refCount++;
    var refCounter = createOperatorSubscriber(subscriber, void 0, void 0, void 0, function() {
      if (!source || source._refCount <= 0 || 0 < --source._refCount) {
        connection = null;
        return;
      }
      var sharedConnection = source._connection;
      var conn = connection;
      connection = null;
      if (sharedConnection && (!conn || sharedConnection === conn)) {
        sharedConnection.unsubscribe();
      }
      subscriber.unsubscribe();
    });
    source.subscribe(refCounter);
    if (!refCounter.closed) {
      connection = source.connect();
    }
  });
}
__name(refCount, "refCount");

// node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js
var ConnectableObservable = (function(_super) {
  __extends(ConnectableObservable2, _super);
  function ConnectableObservable2(source, subjectFactory) {
    var _this = _super.call(this) || this;
    _this.source = source;
    _this.subjectFactory = subjectFactory;
    _this._subject = null;
    _this._refCount = 0;
    _this._connection = null;
    if (hasLift(source)) {
      _this.lift = source.lift;
    }
    return _this;
  }
  __name(ConnectableObservable2, "ConnectableObservable");
  ConnectableObservable2.prototype._subscribe = function(subscriber) {
    return this.getSubject().subscribe(subscriber);
  };
  ConnectableObservable2.prototype.getSubject = function() {
    var subject = this._subject;
    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }
    return this._subject;
  };
  ConnectableObservable2.prototype._teardown = function() {
    this._refCount = 0;
    var _connection = this._connection;
    this._subject = this._connection = null;
    _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
  };
  ConnectableObservable2.prototype.connect = function() {
    var _this = this;
    var connection = this._connection;
    if (!connection) {
      connection = this._connection = new Subscription();
      var subject_1 = this.getSubject();
      connection.add(this.source.subscribe(createOperatorSubscriber(subject_1, void 0, function() {
        _this._teardown();
        subject_1.complete();
      }, function(err) {
        _this._teardown();
        subject_1.error(err);
      }, function() {
        return _this._teardown();
      })));
      if (connection.closed) {
        this._connection = null;
        connection = Subscription.EMPTY;
      }
    }
    return connection;
  };
  ConnectableObservable2.prototype.refCount = function() {
    return refCount()(this);
  };
  return ConnectableObservable2;
})(Observable);

// node_modules/rxjs/dist/esm5/internal/scheduler/performanceTimestampProvider.js
var performanceTimestampProvider = {
  now: /* @__PURE__ */ __name(function() {
    return (performanceTimestampProvider.delegate || performance).now();
  }, "now"),
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js
var animationFrameProvider = {
  schedule: /* @__PURE__ */ __name(function(callback) {
    var request = requestAnimationFrame;
    var cancel = cancelAnimationFrame;
    var delegate = animationFrameProvider.delegate;
    if (delegate) {
      request = delegate.requestAnimationFrame;
      cancel = delegate.cancelAnimationFrame;
    }
    var handle = request(function(timestamp2) {
      cancel = void 0;
      callback(timestamp2);
    });
    return new Subscription(function() {
      return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
    });
  }, "schedule"),
  requestAnimationFrame: /* @__PURE__ */ __name(function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = animationFrameProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
  }, "requestAnimationFrame"),
  cancelAnimationFrame: /* @__PURE__ */ __name(function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = animationFrameProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
  }, "cancelAnimationFrame"),
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/observable/dom/animationFrames.js
function animationFrames(timestampProvider) {
  return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
__name(animationFrames, "animationFrames");
function animationFramesFactory(timestampProvider) {
  return new Observable(function(subscriber) {
    var provider = timestampProvider || performanceTimestampProvider;
    var start = provider.now();
    var id = 0;
    var run = /* @__PURE__ */ __name(function() {
      if (!subscriber.closed) {
        id = animationFrameProvider.requestAnimationFrame(function(timestamp2) {
          id = 0;
          var now = provider.now();
          subscriber.next({
            timestamp: timestampProvider ? now : timestamp2,
            elapsed: now - start
          });
          run();
        });
      }
    }, "run");
    run();
    return function() {
      if (id) {
        animationFrameProvider.cancelAnimationFrame(id);
      }
    };
  });
}
__name(animationFramesFactory, "animationFramesFactory");
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();

// node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return /* @__PURE__ */ __name(function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  }, "ObjectUnsubscribedErrorImpl");
});

// node_modules/rxjs/dist/esm5/internal/Subject.js
var Subject = (function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  __name(Subject2, "Subject");
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: /* @__PURE__ */ __name(function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }, "get"),
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
})(Observable);
var AnonymousSubject = (function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  __name(AnonymousSubject2, "AnonymousSubject");
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
})(Subject);

// node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js
var BehaviorSubject = (function(_super) {
  __extends(BehaviorSubject2, _super);
  function BehaviorSubject2(_value) {
    var _this = _super.call(this) || this;
    _this._value = _value;
    return _this;
  }
  __name(BehaviorSubject2, "BehaviorSubject");
  Object.defineProperty(BehaviorSubject2.prototype, "value", {
    get: /* @__PURE__ */ __name(function() {
      return this.getValue();
    }, "get"),
    enumerable: false,
    configurable: true
  });
  BehaviorSubject2.prototype._subscribe = function(subscriber) {
    var subscription = _super.prototype._subscribe.call(this, subscriber);
    !subscription.closed && subscriber.next(this._value);
    return subscription;
  };
  BehaviorSubject2.prototype.getValue = function() {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
    if (hasError) {
      throw thrownError;
    }
    this._throwIfClosed();
    return _value;
  };
  BehaviorSubject2.prototype.next = function(value) {
    _super.prototype.next.call(this, this._value = value);
  };
  return BehaviorSubject2;
})(Subject);

// node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
  now: /* @__PURE__ */ __name(function() {
    return (dateTimestampProvider.delegate || Date).now();
  }, "now"),
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/ReplaySubject.js
var ReplaySubject = (function(_super) {
  __extends(ReplaySubject2, _super);
  function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
    if (_bufferSize === void 0) {
      _bufferSize = Infinity;
    }
    if (_windowTime === void 0) {
      _windowTime = Infinity;
    }
    if (_timestampProvider === void 0) {
      _timestampProvider = dateTimestampProvider;
    }
    var _this = _super.call(this) || this;
    _this._bufferSize = _bufferSize;
    _this._windowTime = _windowTime;
    _this._timestampProvider = _timestampProvider;
    _this._buffer = [];
    _this._infiniteTimeWindow = true;
    _this._infiniteTimeWindow = _windowTime === Infinity;
    _this._bufferSize = Math.max(1, _bufferSize);
    _this._windowTime = Math.max(1, _windowTime);
    return _this;
  }
  __name(ReplaySubject2, "ReplaySubject");
  ReplaySubject2.prototype.next = function(value) {
    var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    _super.prototype.next.call(this, value);
  };
  ReplaySubject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    var subscription = this._innerSubscribe(subscriber);
    var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
    var copy = _buffer.slice();
    for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  };
  ReplaySubject2.prototype._trimBuffer = function() {
    var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
    var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      var now = _timestampProvider.now();
      var last3 = 0;
      for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last3 = i;
      }
      last3 && _buffer.splice(0, last3 + 1);
    }
  };
  return ReplaySubject2;
})(Subject);

// node_modules/rxjs/dist/esm5/internal/AsyncSubject.js
var AsyncSubject = (function(_super) {
  __extends(AsyncSubject2, _super);
  function AsyncSubject2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this._value = null;
    _this._hasValue = false;
    _this._isComplete = false;
    return _this;
  }
  __name(AsyncSubject2, "AsyncSubject");
  AsyncSubject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped || _isComplete) {
      _hasValue && subscriber.next(_value);
      subscriber.complete();
    }
  };
  AsyncSubject2.prototype.next = function(value) {
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  };
  AsyncSubject2.prototype.complete = function() {
    var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
    if (!_isComplete) {
      this._isComplete = true;
      _hasValue && _super.prototype.next.call(this, _value);
      _super.prototype.complete.call(this);
    }
  };
  return AsyncSubject2;
})(Subject);

// node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
var Action = (function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  __name(Action2, "Action");
  Action2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return this;
  };
  return Action2;
})(Subscription);

// node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
var intervalProvider = {
  setInterval: /* @__PURE__ */ __name(function(handler, timeout2) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = intervalProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout2], __read(args)));
    }
    return setInterval.apply(void 0, __spreadArray([handler, timeout2], __read(args)));
  }, "setInterval"),
  clearInterval: /* @__PURE__ */ __name(function(handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  }, "clearInterval"),
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
var AsyncAction = (function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  __name(AsyncAction2, "AsyncAction");
  AsyncAction2.prototype.schedule = function(state, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay2);
    }
    this.pending = true;
    this.delay = delay2;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay2);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay2);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null && this.delay === delay2 && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay2) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay2);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
})(Action);

// node_modules/rxjs/dist/esm5/internal/util/Immediate.js
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }
  return false;
}
__name(findAndClearHandle, "findAndClearHandle");
var Immediate = {
  setImmediate: /* @__PURE__ */ __name(function(cb) {
    var handle = nextHandle++;
    activeHandles[handle] = true;
    if (!resolved) {
      resolved = Promise.resolve();
    }
    resolved.then(function() {
      return findAndClearHandle(handle) && cb();
    });
    return handle;
  }, "setImmediate"),
  clearImmediate: /* @__PURE__ */ __name(function(handle) {
    findAndClearHandle(handle);
  }, "clearImmediate")
};

// node_modules/rxjs/dist/esm5/internal/scheduler/immediateProvider.js
var setImmediate = Immediate.setImmediate;
var clearImmediate = Immediate.clearImmediate;
var immediateProvider = {
  setImmediate: /* @__PURE__ */ __name(function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = immediateProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
  }, "setImmediate"),
  clearImmediate: /* @__PURE__ */ __name(function(handle) {
    var delegate = immediateProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
  }, "clearImmediate"),
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/scheduler/AsapAction.js
var AsapAction = (function(_super) {
  __extends(AsapAction2, _super);
  function AsapAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  __name(AsapAction2, "AsapAction");
  AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 !== null && delay2 > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
  };
  AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
    }
    var actions = scheduler.actions;
    if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
      immediateProvider.clearImmediate(id);
      if (scheduler._scheduled === id) {
        scheduler._scheduled = void 0;
      }
    }
    return void 0;
  };
  return AsapAction2;
})(AsyncAction);

// node_modules/rxjs/dist/esm5/internal/Scheduler.js
var Scheduler = (function() {
  function Scheduler2(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  __name(Scheduler2, "Scheduler");
  Scheduler2.prototype.schedule = function(work, delay2, state) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay2);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
})();

// node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = (function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  __name(AsyncScheduler2, "AsyncScheduler");
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
})(Scheduler);

// node_modules/rxjs/dist/esm5/internal/scheduler/AsapScheduler.js
var AsapScheduler = (function(_super) {
  __extends(AsapScheduler2, _super);
  function AsapScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  __name(AsapScheduler2, "AsapScheduler");
  AsapScheduler2.prototype.flush = function(action) {
    this._active = true;
    var flushId = this._scheduled;
    this._scheduled = void 0;
    var actions = this.actions;
    var error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsapScheduler2;
})(AsyncScheduler);

// node_modules/rxjs/dist/esm5/internal/scheduler/asap.js
var asapScheduler = new AsapScheduler(AsapAction);
var asap = asapScheduler;

// node_modules/rxjs/dist/esm5/internal/scheduler/async.js
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;

// node_modules/rxjs/dist/esm5/internal/scheduler/QueueAction.js
var QueueAction = (function(_super) {
  __extends(QueueAction2, _super);
  function QueueAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  __name(QueueAction2, "QueueAction");
  QueueAction2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 > 0) {
      return _super.prototype.schedule.call(this, state, delay2);
    }
    this.delay = delay2;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  };
  QueueAction2.prototype.execute = function(state, delay2) {
    return delay2 > 0 || this.closed ? _super.prototype.execute.call(this, state, delay2) : this._execute(state, delay2);
  };
  QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null && delay2 > 0 || delay2 == null && this.delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
    }
    scheduler.flush(this);
    return 0;
  };
  return QueueAction2;
})(AsyncAction);

// node_modules/rxjs/dist/esm5/internal/scheduler/QueueScheduler.js
var QueueScheduler = (function(_super) {
  __extends(QueueScheduler2, _super);
  function QueueScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  __name(QueueScheduler2, "QueueScheduler");
  return QueueScheduler2;
})(AsyncScheduler);

// node_modules/rxjs/dist/esm5/internal/scheduler/queue.js
var queueScheduler = new QueueScheduler(QueueAction);
var queue = queueScheduler;

// node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js
var AnimationFrameAction = (function(_super) {
  __extends(AnimationFrameAction2, _super);
  function AnimationFrameAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }
  __name(AnimationFrameAction2, "AnimationFrameAction");
  AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 !== null && delay2 > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider.requestAnimationFrame(function() {
      return scheduler.flush(void 0);
    }));
  };
  AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
    var _a;
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
    }
    var actions = scheduler.actions;
    if (id != null && id === scheduler._scheduled && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
      animationFrameProvider.cancelAnimationFrame(id);
      scheduler._scheduled = void 0;
    }
    return void 0;
  };
  return AnimationFrameAction2;
})(AsyncAction);

// node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js
var AnimationFrameScheduler = (function(_super) {
  __extends(AnimationFrameScheduler2, _super);
  function AnimationFrameScheduler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  __name(AnimationFrameScheduler2, "AnimationFrameScheduler");
  AnimationFrameScheduler2.prototype.flush = function(action) {
    this._active = true;
    var flushId;
    if (action) {
      flushId = action.id;
    } else {
      flushId = this._scheduled;
      this._scheduled = void 0;
    }
    var actions = this.actions;
    var error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AnimationFrameScheduler2;
})(AsyncScheduler);

// node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js
var animationFrameScheduler = new AnimationFrameScheduler(AnimationFrameAction);
var animationFrame = animationFrameScheduler;

// node_modules/rxjs/dist/esm5/internal/scheduler/VirtualTimeScheduler.js
var VirtualTimeScheduler = (function(_super) {
  __extends(VirtualTimeScheduler2, _super);
  function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
    if (schedulerActionCtor === void 0) {
      schedulerActionCtor = VirtualAction;
    }
    if (maxFrames === void 0) {
      maxFrames = Infinity;
    }
    var _this = _super.call(this, schedulerActionCtor, function() {
      return _this.frame;
    }) || this;
    _this.maxFrames = maxFrames;
    _this.frame = 0;
    _this.index = -1;
    return _this;
  }
  __name(VirtualTimeScheduler2, "VirtualTimeScheduler");
  VirtualTimeScheduler2.prototype.flush = function() {
    var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
    var error;
    var action;
    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  VirtualTimeScheduler2.frameTimeFactor = 10;
  return VirtualTimeScheduler2;
})(AsyncScheduler);
var VirtualAction = (function(_super) {
  __extends(VirtualAction2, _super);
  function VirtualAction2(scheduler, work, index) {
    if (index === void 0) {
      index = scheduler.index += 1;
    }
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.index = index;
    _this.active = true;
    _this.index = scheduler.index = index;
    return _this;
  }
  __name(VirtualAction2, "VirtualAction");
  VirtualAction2.prototype.schedule = function(state, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (Number.isFinite(delay2)) {
      if (!this.id) {
        return _super.prototype.schedule.call(this, state, delay2);
      }
      this.active = false;
      var action = new VirtualAction2(this.scheduler, this.work);
      this.add(action);
      return action.schedule(state, delay2);
    } else {
      return Subscription.EMPTY;
    }
  };
  VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    this.delay = scheduler.frame + delay2;
    var actions = scheduler.actions;
    actions.push(this);
    actions.sort(VirtualAction2.sortActions);
    return 1;
  };
  VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return void 0;
  };
  VirtualAction2.prototype._execute = function(state, delay2) {
    if (this.active === true) {
      return _super.prototype._execute.call(this, state, delay2);
    }
  };
  VirtualAction2.sortActions = function(a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  };
  return VirtualAction2;
})(AsyncAction);

// node_modules/rxjs/dist/esm5/internal/observable/empty.js
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});
function empty(scheduler) {
  return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
__name(empty, "empty");
function emptyScheduled(scheduler) {
  return new Observable(function(subscriber) {
    return scheduler.schedule(function() {
      return subscriber.complete();
    });
  });
}
__name(emptyScheduled, "emptyScheduled");

// node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
function isScheduler(value) {
  return value && isFunction(value.schedule);
}
__name(isScheduler, "isScheduler");

// node_modules/rxjs/dist/esm5/internal/util/args.js
function last(arr) {
  return arr[arr.length - 1];
}
__name(last, "last");
function popResultSelector(args) {
  return isFunction(last(args)) ? args.pop() : void 0;
}
__name(popResultSelector, "popResultSelector");
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
__name(popScheduler, "popScheduler");
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}
__name(popNumber, "popNumber");

// node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = /* @__PURE__ */ __name((function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
}), "isArrayLike");

// node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
__name(isPromise, "isPromise");

// node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
__name(isInteropObservable, "isInteropObservable");

// node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
__name(isAsyncIterable, "isAsyncIterable");

// node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
__name(createInvalidObservableTypeError, "createInvalidObservableTypeError");

// node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
__name(getSymbolIterator, "getSymbolIterator");
var iterator = getSymbolIterator();

// node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
__name(isIterable, "isIterable");

// node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          if (false) return [3, 8];
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  }, "readableStreamLikeToAsyncGenerator_1"));
}
__name(readableStreamLikeToAsyncGenerator, "readableStreamLikeToAsyncGenerator");
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
__name(isReadableStreamLike, "isReadableStreamLike");

// node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
__name(innerFrom, "innerFrom");
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
__name(fromInteropObservable, "fromInteropObservable");
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
__name(fromArrayLike, "fromArrayLike");
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
__name(fromPromise, "fromPromise");
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
__name(fromIterable, "fromIterable");
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
__name(fromAsyncIterable, "fromAsyncIterable");
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
__name(fromReadableStreamLike, "fromReadableStreamLike");
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
__name(process, "process");

// node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay2, repeat2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  if (repeat2 === void 0) {
    repeat2 = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat2) {
      parentSubscription.add(this.schedule(null, delay2));
    } else {
      this.unsubscribe();
    }
  }, delay2);
  parentSubscription.add(scheduleSubscription);
  if (!repeat2) {
    return scheduleSubscription;
  }
}
__name(executeSchedule, "executeSchedule");

// node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function observeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay2);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay2);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay2);
    }));
  });
}
__name(observeOn, "observeOn");

// node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function subscribeOn(scheduler, delay2) {
  if (delay2 === void 0) {
    delay2 = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay2));
  });
}
__name(subscribeOn, "subscribeOn");

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
__name(scheduleObservable, "scheduleObservable");

// node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
__name(schedulePromise, "schedulePromise");

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
__name(scheduleArray, "scheduleArray");

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator2;
    executeSchedule(subscriber, scheduler, function() {
      iterator2 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator2.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
    };
  });
}
__name(scheduleIterable, "scheduleIterable");

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
__name(scheduleAsyncIterable, "scheduleAsyncIterable");

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
__name(scheduleReadableStreamLike, "scheduleReadableStreamLike");

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
__name(scheduled, "scheduled");

// node_modules/rxjs/dist/esm5/internal/observable/from.js
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
__name(from, "from");

// node_modules/rxjs/dist/esm5/internal/observable/of.js
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}
__name(of, "of");

// node_modules/rxjs/dist/esm5/internal/observable/throwError.js
function throwError(errorOrErrorFactory, scheduler) {
  var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
    return errorOrErrorFactory;
  };
  var init = /* @__PURE__ */ __name(function(subscriber) {
    return subscriber.error(errorFactory());
  }, "init");
  return new Observable(scheduler ? function(subscriber) {
    return scheduler.schedule(init, 0, subscriber);
  } : init);
}
__name(throwError, "throwError");

// node_modules/rxjs/dist/esm5/internal/Notification.js
var NotificationKind;
(function(NotificationKind2) {
  NotificationKind2["NEXT"] = "N";
  NotificationKind2["ERROR"] = "E";
  NotificationKind2["COMPLETE"] = "C";
})(NotificationKind || (NotificationKind = {}));
var Notification = (function() {
  function Notification2(kind, value, error) {
    this.kind = kind;
    this.value = value;
    this.error = error;
    this.hasValue = kind === "N";
  }
  __name(Notification2, "Notification");
  Notification2.prototype.observe = function(observer) {
    return observeNotification(this, observer);
  };
  Notification2.prototype.do = function(nextHandler, errorHandler, completeHandler) {
    var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
    return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
  };
  Notification2.prototype.accept = function(nextOrObserver, error, complete) {
    var _a;
    return isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
  };
  Notification2.prototype.toObservable = function() {
    var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
    var result = kind === "N" ? of(value) : kind === "E" ? throwError(function() {
      return error;
    }) : kind === "C" ? EMPTY : 0;
    if (!result) {
      throw new TypeError("Unexpected notification kind " + kind);
    }
    return result;
  };
  Notification2.createNext = function(value) {
    return new Notification2("N", value);
  };
  Notification2.createError = function(err) {
    return new Notification2("E", void 0, err);
  };
  Notification2.createComplete = function() {
    return Notification2.completeNotification;
  };
  Notification2.completeNotification = new Notification2("C");
  return Notification2;
})();
function observeNotification(notification, observer) {
  var _a, _b, _c;
  var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
  if (typeof kind !== "string") {
    throw new TypeError('Invalid notification, missing "kind"');
  }
  kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}
__name(observeNotification, "observeNotification");

// node_modules/rxjs/dist/esm5/internal/util/isObservable.js
function isObservable(obj) {
  return !!obj && (obj instanceof Observable || isFunction(obj.lift) && isFunction(obj.subscribe));
}
__name(isObservable, "isObservable");

// node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
var EmptyError = createErrorClass(function(_super) {
  return /* @__PURE__ */ __name(function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  }, "EmptyErrorImpl");
});

// node_modules/rxjs/dist/esm5/internal/lastValueFrom.js
function lastValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var _hasValue = false;
    var _value;
    source.subscribe({
      next: /* @__PURE__ */ __name(function(value) {
        _value = value;
        _hasValue = true;
      }, "next"),
      error: reject,
      complete: /* @__PURE__ */ __name(function() {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }, "complete")
    });
  });
}
__name(lastValueFrom, "lastValueFrom");

// node_modules/rxjs/dist/esm5/internal/firstValueFrom.js
function firstValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var subscriber = new SafeSubscriber({
      next: /* @__PURE__ */ __name(function(value) {
        resolve(value);
        subscriber.unsubscribe();
      }, "next"),
      error: reject,
      complete: /* @__PURE__ */ __name(function() {
        if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }, "complete")
    });
    source.subscribe(subscriber);
  });
}
__name(firstValueFrom, "firstValueFrom");

// node_modules/rxjs/dist/esm5/internal/util/ArgumentOutOfRangeError.js
var ArgumentOutOfRangeError = createErrorClass(function(_super) {
  return /* @__PURE__ */ __name(function ArgumentOutOfRangeErrorImpl() {
    _super(this);
    this.name = "ArgumentOutOfRangeError";
    this.message = "argument out of range";
  }, "ArgumentOutOfRangeErrorImpl");
});

// node_modules/rxjs/dist/esm5/internal/util/NotFoundError.js
var NotFoundError = createErrorClass(function(_super) {
  return /* @__PURE__ */ __name(function NotFoundErrorImpl(message) {
    _super(this);
    this.name = "NotFoundError";
    this.message = message;
  }, "NotFoundErrorImpl");
});

// node_modules/rxjs/dist/esm5/internal/util/SequenceError.js
var SequenceError = createErrorClass(function(_super) {
  return /* @__PURE__ */ __name(function SequenceErrorImpl(message) {
    _super(this);
    this.name = "SequenceError";
    this.message = message;
  }, "SequenceErrorImpl");
});

// node_modules/rxjs/dist/esm5/internal/util/isDate.js
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
__name(isValidDate, "isValidDate");

// node_modules/rxjs/dist/esm5/internal/operators/timeout.js
var TimeoutError = createErrorClass(function(_super) {
  return /* @__PURE__ */ __name(function TimeoutErrorImpl(info) {
    if (info === void 0) {
      info = null;
    }
    _super(this);
    this.message = "Timeout has occurred";
    this.name = "TimeoutError";
    this.info = info;
  }, "TimeoutErrorImpl");
});
function timeout(config2, schedulerArg) {
  var _a = isValidDate(config2) ? { first: config2 } : typeof config2 === "number" ? { each: config2 } : config2, first2 = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
  if (first2 == null && each == null) {
    throw new TypeError("No timeout provided.");
  }
  return operate(function(source, subscriber) {
    var originalSourceSubscription;
    var timerSubscription;
    var lastValue = null;
    var seen = 0;
    var startTimer = /* @__PURE__ */ __name(function(delay2) {
      timerSubscription = executeSchedule(subscriber, scheduler, function() {
        try {
          originalSourceSubscription.unsubscribe();
          innerFrom(_with({
            meta,
            lastValue,
            seen
          })).subscribe(subscriber);
        } catch (err) {
          subscriber.error(err);
        }
      }, delay2);
    }, "startTimer");
    originalSourceSubscription = source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      seen++;
      subscriber.next(lastValue = value);
      each > 0 && startTimer(each);
    }, void 0, void 0, function() {
      if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
        timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      }
      lastValue = null;
    }));
    !seen && startTimer(first2 != null ? typeof first2 === "number" ? first2 : +first2 - scheduler.now() : each);
  });
}
__name(timeout, "timeout");
function timeoutErrorFactory(info) {
  throw new TimeoutError(info);
}
__name(timeoutErrorFactory, "timeoutErrorFactory");

// node_modules/rxjs/dist/esm5/internal/operators/map.js
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
__name(map, "map");

// node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var isArray = Array.isArray;
function callOrApply(fn, args) {
  return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
__name(callOrApply, "callOrApply");
function mapOneOrManyArgs(fn) {
  return map(function(args) {
    return callOrApply(fn, args);
  });
}
__name(mapOneOrManyArgs, "mapOneOrManyArgs");

// node_modules/rxjs/dist/esm5/internal/observable/bindCallbackInternals.js
function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if (isScheduler(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler).apply(this, args).pipe(mapOneOrManyArgs(resultSelector));
      };
    }
  }
  if (scheduler) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return bindCallbackInternals(isNodeStyle, callbackFunc).apply(this, args).pipe(subscribeOn(scheduler), observeOn(scheduler));
    };
  }
  return function() {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var subject = new AsyncSubject();
    var uninitialized = true;
    return new Observable(function(subscriber) {
      var subs = subject.subscribe(subscriber);
      if (uninitialized) {
        uninitialized = false;
        var isAsync_1 = false;
        var isComplete_1 = false;
        callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
          function() {
            var results = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              results[_i2] = arguments[_i2];
            }
            if (isNodeStyle) {
              var err = results.shift();
              if (err != null) {
                subject.error(err);
                return;
              }
            }
            subject.next(1 < results.length ? results : results[0]);
            isComplete_1 = true;
            if (isAsync_1) {
              subject.complete();
            }
          }
        ]));
        if (isComplete_1) {
          subject.complete();
        }
        isAsync_1 = true;
      }
      return subs;
    });
  };
}
__name(bindCallbackInternals, "bindCallbackInternals");

// node_modules/rxjs/dist/esm5/internal/observable/bindCallback.js
function bindCallback(callbackFunc, resultSelector, scheduler) {
  return bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}
__name(bindCallback, "bindCallback");

// node_modules/rxjs/dist/esm5/internal/observable/bindNodeCallback.js
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
  return bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}
__name(bindNodeCallback, "bindNodeCallback");

// node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
var isArray2 = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf;
var objectProto = Object.prototype;
var getKeys = Object.keys;
function argsArgArrayOrObject(args) {
  if (args.length === 1) {
    var first_1 = args[0];
    if (isArray2(first_1)) {
      return { args: first_1, keys: null };
    }
    if (isPOJO(first_1)) {
      var keys = getKeys(first_1);
      return {
        args: keys.map(function(key) {
          return first_1[key];
        }),
        keys
      };
    }
  }
  return { args, keys: null };
}
__name(argsArgArrayOrObject, "argsArgArrayOrObject");
function isPOJO(obj) {
  return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
}
__name(isPOJO, "isPOJO");

// node_modules/rxjs/dist/esm5/internal/util/createObject.js
function createObject(keys, values) {
  return keys.reduce(function(result, key, i) {
    return result[key] = values[i], result;
  }, {});
}
__name(createObject, "createObject");

// node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js
function combineLatest() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var resultSelector = popResultSelector(args);
  var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
  if (observables.length === 0) {
    return from([], scheduler);
  }
  var result = new Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
    return createObject(keys, values);
  } : identity));
  return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
__name(combineLatest, "combineLatest");
function combineLatestInit(observables, scheduler, valueTransform) {
  if (valueTransform === void 0) {
    valueTransform = identity;
  }
  return function(subscriber) {
    maybeSchedule(scheduler, function() {
      var length = observables.length;
      var values = new Array(length);
      var active = length;
      var remainingFirstValues = length;
      var _loop_1 = /* @__PURE__ */ __name(function(i2) {
        maybeSchedule(scheduler, function() {
          var source = from(observables[i2], scheduler);
          var hasFirstValue = false;
          source.subscribe(createOperatorSubscriber(subscriber, function(value) {
            values[i2] = value;
            if (!hasFirstValue) {
              hasFirstValue = true;
              remainingFirstValues--;
            }
            if (!remainingFirstValues) {
              subscriber.next(valueTransform(values.slice()));
            }
          }, function() {
            if (!--active) {
              subscriber.complete();
            }
          }));
        }, subscriber);
      }, "_loop_1");
      for (var i = 0; i < length; i++) {
        _loop_1(i);
      }
    }, subscriber);
  };
}
__name(combineLatestInit, "combineLatestInit");
function maybeSchedule(scheduler, execute, subscription) {
  if (scheduler) {
    executeSchedule(subscription, scheduler, execute);
  } else {
    execute();
  }
}
__name(maybeSchedule, "maybeSchedule");

// node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand2, innerSubScheduler, additionalFinalizer) {
  var buffer2 = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = /* @__PURE__ */ __name(function() {
    if (isComplete && !buffer2.length && !active) {
      subscriber.complete();
    }
  }, "checkComplete");
  var outerNext = /* @__PURE__ */ __name(function(value) {
    return active < concurrent ? doInnerSub(value) : buffer2.push(value);
  }, "outerNext");
  var doInnerSub = /* @__PURE__ */ __name(function(value) {
    expand2 && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand2) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = /* @__PURE__ */ __name(function() {
            var bufferedValue = buffer2.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          }, "_loop_1");
          while (buffer2.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  }, "doInnerSub");
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}
__name(mergeInternals, "mergeInternals");

// node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}
__name(mergeMap, "mergeMap");

// node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}
__name(mergeAll, "mergeAll");

// node_modules/rxjs/dist/esm5/internal/operators/concatAll.js
function concatAll() {
  return mergeAll(1);
}
__name(concatAll, "concatAll");

// node_modules/rxjs/dist/esm5/internal/observable/concat.js
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return concatAll()(from(args, popScheduler(args)));
}
__name(concat, "concat");

// node_modules/rxjs/dist/esm5/internal/observable/defer.js
function defer(observableFactory) {
  return new Observable(function(subscriber) {
    innerFrom(observableFactory()).subscribe(subscriber);
  });
}
__name(defer, "defer");

// node_modules/rxjs/dist/esm5/internal/observable/connectable.js
var DEFAULT_CONFIG = {
  connector: /* @__PURE__ */ __name(function() {
    return new Subject();
  }, "connector"),
  resetOnDisconnect: true
};
function connectable(source, config2) {
  if (config2 === void 0) {
    config2 = DEFAULT_CONFIG;
  }
  var connection = null;
  var connector = config2.connector, _a = config2.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
  var subject = connector();
  var result = new Observable(function(subscriber) {
    return subject.subscribe(subscriber);
  });
  result.connect = function() {
    if (!connection || connection.closed) {
      connection = defer(function() {
        return source;
      }).subscribe(subject);
      if (resetOnDisconnect) {
        connection.add(function() {
          return subject = connector();
        });
      }
    }
    return connection;
  };
  return result;
}
__name(connectable, "connectable");

// node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js
function forkJoin() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var resultSelector = popResultSelector(args);
  var _a = argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
  var result = new Observable(function(subscriber) {
    var length = sources.length;
    if (!length) {
      subscriber.complete();
      return;
    }
    var values = new Array(length);
    var remainingCompletions = length;
    var remainingEmissions = length;
    var _loop_1 = /* @__PURE__ */ __name(function(sourceIndex2) {
      var hasValue = false;
      innerFrom(sources[sourceIndex2]).subscribe(createOperatorSubscriber(subscriber, function(value) {
        if (!hasValue) {
          hasValue = true;
          remainingEmissions--;
        }
        values[sourceIndex2] = value;
      }, function() {
        return remainingCompletions--;
      }, void 0, function() {
        if (!remainingCompletions || !hasValue) {
          if (!remainingEmissions) {
            subscriber.next(keys ? createObject(keys, values) : values);
          }
          subscriber.complete();
        }
      }));
    }, "_loop_1");
    for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
      _loop_1(sourceIndex);
    }
  });
  return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
__name(forkJoin, "forkJoin");

// node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }
  var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
  if (!add) {
    if (isArrayLike(target)) {
      return mergeMap(function(subTarget) {
        return fromEvent(subTarget, eventName, options);
      })(innerFrom(target));
    }
  }
  if (!add) {
    throw new TypeError("Invalid event target");
  }
  return new Observable(function(subscriber) {
    var handler = /* @__PURE__ */ __name(function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return subscriber.next(1 < args.length ? args : args[0]);
    }, "handler");
    add(handler);
    return function() {
      return remove(handler);
    };
  });
}
__name(fromEvent, "fromEvent");
function toCommonHandlerRegistry(target, eventName) {
  return function(methodName) {
    return function(handler) {
      return target[methodName](eventName, handler);
    };
  };
}
__name(toCommonHandlerRegistry, "toCommonHandlerRegistry");
function isNodeStyleEventEmitter(target) {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}
__name(isNodeStyleEventEmitter, "isNodeStyleEventEmitter");
function isJQueryStyleEventEmitter(target) {
  return isFunction(target.on) && isFunction(target.off);
}
__name(isJQueryStyleEventEmitter, "isJQueryStyleEventEmitter");
function isEventTarget(target) {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}
__name(isEventTarget, "isEventTarget");

// node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js
function fromEventPattern(addHandler, removeHandler, resultSelector) {
  if (resultSelector) {
    return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs(resultSelector));
  }
  return new Observable(function(subscriber) {
    var handler = /* @__PURE__ */ __name(function() {
      var e = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        e[_i] = arguments[_i];
      }
      return subscriber.next(e.length === 1 ? e[0] : e);
    }, "handler");
    var retValue = addHandler(handler);
    return isFunction(removeHandler) ? function() {
      return removeHandler(handler, retValue);
    } : void 0;
  });
}
__name(fromEventPattern, "fromEventPattern");

// node_modules/rxjs/dist/esm5/internal/observable/generate.js
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
  var _a, _b;
  var resultSelector;
  var initialState;
  if (arguments.length === 1) {
    _a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity : _b, scheduler = _a.scheduler;
  } else {
    initialState = initialStateOrOptions;
    if (!resultSelectorOrScheduler || isScheduler(resultSelectorOrScheduler)) {
      resultSelector = identity;
      scheduler = resultSelectorOrScheduler;
    } else {
      resultSelector = resultSelectorOrScheduler;
    }
  }
  function gen() {
    var state;
    return __generator(this, function(_a2) {
      switch (_a2.label) {
        case 0:
          state = initialState;
          _a2.label = 1;
        case 1:
          if (!(!condition || condition(state))) return [3, 4];
          return [4, resultSelector(state)];
        case 2:
          _a2.sent();
          _a2.label = 3;
        case 3:
          state = iterate(state);
          return [3, 1];
        case 4:
          return [2];
      }
    });
  }
  __name(gen, "gen");
  return defer(scheduler ? function() {
    return scheduleIterable(gen(), scheduler);
  } : gen);
}
__name(generate, "generate");

// node_modules/rxjs/dist/esm5/internal/observable/iif.js
function iif(condition, trueResult, falseResult) {
  return defer(function() {
    return condition() ? trueResult : falseResult;
  });
}
__name(iif, "iif");

// node_modules/rxjs/dist/esm5/internal/observable/timer.js
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }
  if (scheduler === void 0) {
    scheduler = async;
  }
  var intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable(function(subscriber) {
    var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n++);
        if (0 <= intervalDuration) {
          this.schedule(void 0, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}
__name(timer, "timer");

// node_modules/rxjs/dist/esm5/internal/observable/interval.js
function interval(period, scheduler) {
  if (period === void 0) {
    period = 0;
  }
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  if (period < 0) {
    period = 0;
  }
  return timer(period, period, scheduler);
}
__name(interval, "interval");

// node_modules/rxjs/dist/esm5/internal/observable/merge.js
function merge() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var concurrent = popNumber(args, Infinity);
  var sources = args;
  return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
__name(merge, "merge");

// node_modules/rxjs/dist/esm5/internal/observable/never.js
var NEVER = new Observable(noop);
function never() {
  return NEVER;
}
__name(never, "never");

// node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js
var isArray3 = Array.isArray;
function argsOrArgArray(args) {
  return args.length === 1 && isArray3(args[0]) ? args[0] : args;
}
__name(argsOrArgArray, "argsOrArgArray");

// node_modules/rxjs/dist/esm5/internal/observable/onErrorResumeNext.js
function onErrorResumeNext() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  var nextSources = argsOrArgArray(sources);
  return new Observable(function(subscriber) {
    var sourceIndex = 0;
    var subscribeNext = /* @__PURE__ */ __name(function() {
      if (sourceIndex < nextSources.length) {
        var nextSource = void 0;
        try {
          nextSource = innerFrom(nextSources[sourceIndex++]);
        } catch (err) {
          subscribeNext();
          return;
        }
        var innerSubscriber = new OperatorSubscriber(subscriber, void 0, noop, noop);
        nextSource.subscribe(innerSubscriber);
        innerSubscriber.add(subscribeNext);
      } else {
        subscriber.complete();
      }
    }, "subscribeNext");
    subscribeNext();
  });
}
__name(onErrorResumeNext, "onErrorResumeNext");

// node_modules/rxjs/dist/esm5/internal/observable/pairs.js
function pairs(obj, scheduler) {
  return from(Object.entries(obj), scheduler);
}
__name(pairs, "pairs");

// node_modules/rxjs/dist/esm5/internal/util/not.js
function not(pred, thisArg) {
  return function(value, index) {
    return !pred.call(thisArg, value, index);
  };
}
__name(not, "not");

// node_modules/rxjs/dist/esm5/internal/operators/filter.js
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
__name(filter, "filter");

// node_modules/rxjs/dist/esm5/internal/observable/partition.js
function partition(source, predicate, thisArg) {
  return [filter(predicate, thisArg)(innerFrom(source)), filter(not(predicate, thisArg))(innerFrom(source))];
}
__name(partition, "partition");

// node_modules/rxjs/dist/esm5/internal/observable/race.js
function race() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  sources = argsOrArgArray(sources);
  return sources.length === 1 ? innerFrom(sources[0]) : new Observable(raceInit(sources));
}
__name(race, "race");
function raceInit(sources) {
  return function(subscriber) {
    var subscriptions = [];
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      subscriptions.push(innerFrom(sources[i2]).subscribe(createOperatorSubscriber(subscriber, function(value) {
        if (subscriptions) {
          for (var s = 0; s < subscriptions.length; s++) {
            s !== i2 && subscriptions[s].unsubscribe();
          }
          subscriptions = null;
        }
        subscriber.next(value);
      })));
    }, "_loop_1");
    for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
      _loop_1(i);
    }
  };
}
__name(raceInit, "raceInit");

// node_modules/rxjs/dist/esm5/internal/observable/range.js
function range(start, count2, scheduler) {
  if (count2 == null) {
    count2 = start;
    start = 0;
  }
  if (count2 <= 0) {
    return EMPTY;
  }
  var end = count2 + start;
  return new Observable(scheduler ? function(subscriber) {
    var n = start;
    return scheduler.schedule(function() {
      if (n < end) {
        subscriber.next(n++);
        this.schedule();
      } else {
        subscriber.complete();
      }
    });
  } : function(subscriber) {
    var n = start;
    while (n < end && !subscriber.closed) {
      subscriber.next(n++);
    }
    subscriber.complete();
  });
}
__name(range, "range");

// node_modules/rxjs/dist/esm5/internal/observable/using.js
function using(resourceFactory, observableFactory) {
  return new Observable(function(subscriber) {
    var resource = resourceFactory();
    var result = observableFactory(resource);
    var source = result ? innerFrom(result) : EMPTY;
    source.subscribe(subscriber);
    return function() {
      if (resource) {
        resource.unsubscribe();
      }
    };
  });
}
__name(using, "using");

// node_modules/rxjs/dist/esm5/internal/observable/zip.js
function zip() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var resultSelector = popResultSelector(args);
  var sources = argsOrArgArray(args);
  return sources.length ? new Observable(function(subscriber) {
    var buffers = sources.map(function() {
      return [];
    });
    var completed = sources.map(function() {
      return false;
    });
    subscriber.add(function() {
      buffers = completed = null;
    });
    var _loop_1 = /* @__PURE__ */ __name(function(sourceIndex2) {
      innerFrom(sources[sourceIndex2]).subscribe(createOperatorSubscriber(subscriber, function(value) {
        buffers[sourceIndex2].push(value);
        if (buffers.every(function(buffer2) {
          return buffer2.length;
        })) {
          var result = buffers.map(function(buffer2) {
            return buffer2.shift();
          });
          subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
          if (buffers.some(function(buffer2, i) {
            return !buffer2.length && completed[i];
          })) {
            subscriber.complete();
          }
        }
      }, function() {
        completed[sourceIndex2] = true;
        !buffers[sourceIndex2].length && subscriber.complete();
      }));
    }, "_loop_1");
    for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
      _loop_1(sourceIndex);
    }
    return function() {
      buffers = completed = null;
    };
  }) : EMPTY;
}
__name(zip, "zip");

// node_modules/rxjs/dist/esm5/internal/operators/audit.js
function audit(durationSelector) {
  return operate(function(source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    var durationSubscriber = null;
    var isComplete = false;
    var endDuration = /* @__PURE__ */ __name(function() {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
      isComplete && subscriber.complete();
    }, "endDuration");
    var cleanupDuration = /* @__PURE__ */ __name(function() {
      durationSubscriber = null;
      isComplete && subscriber.complete();
    }, "cleanupDuration");
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      lastValue = value;
      if (!durationSubscriber) {
        innerFrom(durationSelector(value)).subscribe(durationSubscriber = createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
      }
    }, function() {
      isComplete = true;
      (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
    }));
  });
}
__name(audit, "audit");

// node_modules/rxjs/dist/esm5/internal/operators/auditTime.js
function auditTime(duration, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return audit(function() {
    return timer(duration, scheduler);
  });
}
__name(auditTime, "auditTime");

// node_modules/rxjs/dist/esm5/internal/operators/buffer.js
function buffer(closingNotifier) {
  return operate(function(source, subscriber) {
    var currentBuffer = [];
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return currentBuffer.push(value);
    }, function() {
      subscriber.next(currentBuffer);
      subscriber.complete();
    }));
    innerFrom(closingNotifier).subscribe(createOperatorSubscriber(subscriber, function() {
      var b = currentBuffer;
      currentBuffer = [];
      subscriber.next(b);
    }, noop));
    return function() {
      currentBuffer = null;
    };
  });
}
__name(buffer, "buffer");

// node_modules/rxjs/dist/esm5/internal/operators/bufferCount.js
function bufferCount(bufferSize, startBufferEvery) {
  if (startBufferEvery === void 0) {
    startBufferEvery = null;
  }
  startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
  return operate(function(source, subscriber) {
    var buffers = [];
    var count2 = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a, e_2, _b;
      var toEmit = null;
      if (count2++ % startBufferEvery === 0) {
        buffers.push([]);
      }
      try {
        for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
          var buffer2 = buffers_1_1.value;
          buffer2.push(value);
          if (bufferSize <= buffer2.length) {
            toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
            toEmit.push(buffer2);
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      if (toEmit) {
        try {
          for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
            var buffer2 = toEmit_1_1.value;
            arrRemove(buffers, buffer2);
            subscriber.next(buffer2);
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
    }, function() {
      var e_3, _a;
      try {
        for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
          var buffer2 = buffers_2_1.value;
          subscriber.next(buffer2);
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
      subscriber.complete();
    }, void 0, function() {
      buffers = null;
    }));
  });
}
__name(bufferCount, "bufferCount");

// node_modules/rxjs/dist/esm5/internal/operators/bufferTime.js
function bufferTime(bufferTimeSpan) {
  var _a, _b;
  var otherArgs = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    otherArgs[_i - 1] = arguments[_i];
  }
  var scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
  var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  var maxBufferSize = otherArgs[1] || Infinity;
  return operate(function(source, subscriber) {
    var bufferRecords = [];
    var restartOnEmit = false;
    var emit = /* @__PURE__ */ __name(function(record) {
      var buffer2 = record.buffer, subs = record.subs;
      subs.unsubscribe();
      arrRemove(bufferRecords, record);
      subscriber.next(buffer2);
      restartOnEmit && startBuffer();
    }, "emit");
    var startBuffer = /* @__PURE__ */ __name(function() {
      if (bufferRecords) {
        var subs = new Subscription();
        subscriber.add(subs);
        var buffer2 = [];
        var record_1 = {
          buffer: buffer2,
          subs
        };
        bufferRecords.push(record_1);
        executeSchedule(subs, scheduler, function() {
          return emit(record_1);
        }, bufferTimeSpan);
      }
    }, "startBuffer");
    if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
      executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
    } else {
      restartOnEmit = true;
    }
    startBuffer();
    var bufferTimeSubscriber = createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a2;
      var recordsCopy = bufferRecords.slice();
      try {
        for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
          var record = recordsCopy_1_1.value;
          var buffer2 = record.buffer;
          buffer2.push(value);
          maxBufferSize <= buffer2.length && emit(record);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a2 = recordsCopy_1.return)) _a2.call(recordsCopy_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function() {
      while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
        subscriber.next(bufferRecords.shift().buffer);
      }
      bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
      subscriber.complete();
      subscriber.unsubscribe();
    }, void 0, function() {
      return bufferRecords = null;
    });
    source.subscribe(bufferTimeSubscriber);
  });
}
__name(bufferTime, "bufferTime");

// node_modules/rxjs/dist/esm5/internal/operators/bufferToggle.js
function bufferToggle(openings, closingSelector) {
  return operate(function(source, subscriber) {
    var buffers = [];
    innerFrom(openings).subscribe(createOperatorSubscriber(subscriber, function(openValue) {
      var buffer2 = [];
      buffers.push(buffer2);
      var closingSubscription = new Subscription();
      var emitBuffer = /* @__PURE__ */ __name(function() {
        arrRemove(buffers, buffer2);
        subscriber.next(buffer2);
        closingSubscription.unsubscribe();
      }, "emitBuffer");
      closingSubscription.add(innerFrom(closingSelector(openValue)).subscribe(createOperatorSubscriber(subscriber, emitBuffer, noop)));
    }, noop));
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a;
      try {
        for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
          var buffer2 = buffers_1_1.value;
          buffer2.push(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function() {
      while (buffers.length > 0) {
        subscriber.next(buffers.shift());
      }
      subscriber.complete();
    }));
  });
}
__name(bufferToggle, "bufferToggle");

// node_modules/rxjs/dist/esm5/internal/operators/bufferWhen.js
function bufferWhen(closingSelector) {
  return operate(function(source, subscriber) {
    var buffer2 = null;
    var closingSubscriber = null;
    var openBuffer = /* @__PURE__ */ __name(function() {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      var b = buffer2;
      buffer2 = [];
      b && subscriber.next(b);
      innerFrom(closingSelector()).subscribe(closingSubscriber = createOperatorSubscriber(subscriber, openBuffer, noop));
    }, "openBuffer");
    openBuffer();
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return buffer2 === null || buffer2 === void 0 ? void 0 : buffer2.push(value);
    }, function() {
      buffer2 && subscriber.next(buffer2);
      subscriber.complete();
    }, void 0, function() {
      return buffer2 = closingSubscriber = null;
    }));
  });
}
__name(bufferWhen, "bufferWhen");

// node_modules/rxjs/dist/esm5/internal/operators/catchError.js
function catchError(selector) {
  return operate(function(source, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
      handledResult = innerFrom(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}
__name(catchError, "catchError");

// node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
  return function(source, subscriber) {
    var hasState = hasSeed;
    var state = seed;
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var i = index++;
      state = hasState ? accumulator(state, value, i) : (hasState = true, value);
      emitOnNext && subscriber.next(state);
    }, emitBeforeComplete && (function() {
      hasState && subscriber.next(state);
      subscriber.complete();
    })));
  };
}
__name(scanInternals, "scanInternals");

// node_modules/rxjs/dist/esm5/internal/operators/reduce.js
function reduce(accumulator, seed) {
  return operate(scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
__name(reduce, "reduce");

// node_modules/rxjs/dist/esm5/internal/operators/toArray.js
var arrReducer = /* @__PURE__ */ __name(function(arr, value) {
  return arr.push(value), arr;
}, "arrReducer");
function toArray() {
  return operate(function(source, subscriber) {
    reduce(arrReducer, [])(source).subscribe(subscriber);
  });
}
__name(toArray, "toArray");

// node_modules/rxjs/dist/esm5/internal/operators/joinAllInternals.js
function joinAllInternals(joinFn, project) {
  return pipe(toArray(), mergeMap(function(sources) {
    return joinFn(sources);
  }), project ? mapOneOrManyArgs(project) : identity);
}
__name(joinAllInternals, "joinAllInternals");

// node_modules/rxjs/dist/esm5/internal/operators/combineLatestAll.js
function combineLatestAll(project) {
  return joinAllInternals(combineLatest, project);
}
__name(combineLatestAll, "combineLatestAll");

// node_modules/rxjs/dist/esm5/internal/operators/combineAll.js
var combineAll = combineLatestAll;

// node_modules/rxjs/dist/esm5/internal/operators/combineLatest.js
function combineLatest2() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var resultSelector = popResultSelector(args);
  return resultSelector ? pipe(combineLatest2.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector)) : operate(function(source, subscriber) {
    combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
  });
}
__name(combineLatest2, "combineLatest");

// node_modules/rxjs/dist/esm5/internal/operators/combineLatestWith.js
function combineLatestWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return combineLatest2.apply(void 0, __spreadArray([], __read(otherSources)));
}
__name(combineLatestWith, "combineLatestWith");

// node_modules/rxjs/dist/esm5/internal/operators/concatMap.js
function concatMap(project, resultSelector) {
  return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
}
__name(concatMap, "concatMap");

// node_modules/rxjs/dist/esm5/internal/operators/concatMapTo.js
function concatMapTo(innerObservable, resultSelector) {
  return isFunction(resultSelector) ? concatMap(function() {
    return innerObservable;
  }, resultSelector) : concatMap(function() {
    return innerObservable;
  });
}
__name(concatMapTo, "concatMapTo");

// node_modules/rxjs/dist/esm5/internal/operators/concat.js
function concat2() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return operate(function(source, subscriber) {
    concatAll()(from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
  });
}
__name(concat2, "concat");

// node_modules/rxjs/dist/esm5/internal/operators/concatWith.js
function concatWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return concat2.apply(void 0, __spreadArray([], __read(otherSources)));
}
__name(concatWith, "concatWith");

// node_modules/rxjs/dist/esm5/internal/observable/fromSubscribable.js
function fromSubscribable(subscribable) {
  return new Observable(function(subscriber) {
    return subscribable.subscribe(subscriber);
  });
}
__name(fromSubscribable, "fromSubscribable");

// node_modules/rxjs/dist/esm5/internal/operators/connect.js
var DEFAULT_CONFIG2 = {
  connector: /* @__PURE__ */ __name(function() {
    return new Subject();
  }, "connector")
};
function connect(selector, config2) {
  if (config2 === void 0) {
    config2 = DEFAULT_CONFIG2;
  }
  var connector = config2.connector;
  return operate(function(source, subscriber) {
    var subject = connector();
    innerFrom(selector(fromSubscribable(subject))).subscribe(subscriber);
    subscriber.add(source.subscribe(subject));
  });
}
__name(connect, "connect");

// node_modules/rxjs/dist/esm5/internal/operators/count.js
function count(predicate) {
  return reduce(function(total, value, i) {
    return !predicate || predicate(value, i) ? total + 1 : total;
  }, 0);
}
__name(count, "count");

// node_modules/rxjs/dist/esm5/internal/operators/debounce.js
function debounce(durationSelector) {
  return operate(function(source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    var durationSubscriber = null;
    var emit = /* @__PURE__ */ __name(function() {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    }, "emit");
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      hasValue = true;
      lastValue = value;
      durationSubscriber = createOperatorSubscriber(subscriber, emit, noop);
      innerFrom(durationSelector(value)).subscribe(durationSubscriber);
    }, function() {
      emit();
      subscriber.complete();
    }, void 0, function() {
      lastValue = durationSubscriber = null;
    }));
  });
}
__name(debounce, "debounce");

// node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js
function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return operate(function(source, subscriber) {
    var activeTask = null;
    var lastValue = null;
    var lastTime = null;
    var emit = /* @__PURE__ */ __name(function() {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    }, "emit");
    function emitWhenIdle() {
      var targetTime = lastTime + dueTime;
      var now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(void 0, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    __name(emitWhenIdle, "emitWhenIdle");
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, function() {
      emit();
      subscriber.complete();
    }, void 0, function() {
      lastValue = activeTask = null;
    }));
  });
}
__name(debounceTime, "debounceTime");

// node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js
function defaultIfEmpty(defaultValue) {
  return operate(function(source, subscriber) {
    var hasValue = false;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      subscriber.next(value);
    }, function() {
      if (!hasValue) {
        subscriber.next(defaultValue);
      }
      subscriber.complete();
    }));
  });
}
__name(defaultIfEmpty, "defaultIfEmpty");

// node_modules/rxjs/dist/esm5/internal/operators/take.js
function take(count2) {
  return count2 <= 0 ? function() {
    return EMPTY;
  } : operate(function(source, subscriber) {
    var seen = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      if (++seen <= count2) {
        subscriber.next(value);
        if (count2 <= seen) {
          subscriber.complete();
        }
      }
    }));
  });
}
__name(take, "take");

// node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js
function ignoreElements() {
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, noop));
  });
}
__name(ignoreElements, "ignoreElements");

// node_modules/rxjs/dist/esm5/internal/operators/mapTo.js
function mapTo(value) {
  return map(function() {
    return value;
  });
}
__name(mapTo, "mapTo");

// node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js
function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return function(source) {
      return concat(subscriptionDelay.pipe(take(1), ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
    };
  }
  return mergeMap(function(value, index) {
    return innerFrom(delayDurationSelector(value, index)).pipe(take(1), mapTo(value));
  });
}
__name(delayWhen, "delayWhen");

// node_modules/rxjs/dist/esm5/internal/operators/delay.js
function delay(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  var duration = timer(due, scheduler);
  return delayWhen(function() {
    return duration;
  });
}
__name(delay, "delay");

// node_modules/rxjs/dist/esm5/internal/operators/dematerialize.js
function dematerialize() {
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(notification) {
      return observeNotification(notification, subscriber);
    }));
  });
}
__name(dematerialize, "dematerialize");

// node_modules/rxjs/dist/esm5/internal/operators/distinct.js
function distinct(keySelector, flushes) {
  return operate(function(source, subscriber) {
    var distinctKeys = /* @__PURE__ */ new Set();
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var key = keySelector ? keySelector(value) : value;
      if (!distinctKeys.has(key)) {
        distinctKeys.add(key);
        subscriber.next(value);
      }
    }));
    flushes && innerFrom(flushes).subscribe(createOperatorSubscriber(subscriber, function() {
      return distinctKeys.clear();
    }, noop));
  });
}
__name(distinct, "distinct");

// node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js
function distinctUntilChanged(comparator, keySelector) {
  if (keySelector === void 0) {
    keySelector = identity;
  }
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return operate(function(source, subscriber) {
    var previousKey;
    var first2 = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var currentKey = keySelector(value);
      if (first2 || !comparator(previousKey, currentKey)) {
        first2 = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
__name(distinctUntilChanged, "distinctUntilChanged");
function defaultCompare(a, b) {
  return a === b;
}
__name(defaultCompare, "defaultCompare");

// node_modules/rxjs/dist/esm5/internal/operators/distinctUntilKeyChanged.js
function distinctUntilKeyChanged(key, compare) {
  return distinctUntilChanged(function(x, y) {
    return compare ? compare(x[key], y[key]) : x[key] === y[key];
  });
}
__name(distinctUntilKeyChanged, "distinctUntilKeyChanged");

// node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js
function throwIfEmpty(errorFactory) {
  if (errorFactory === void 0) {
    errorFactory = defaultErrorFactory;
  }
  return operate(function(source, subscriber) {
    var hasValue = false;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      subscriber.next(value);
    }, function() {
      return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
    }));
  });
}
__name(throwIfEmpty, "throwIfEmpty");
function defaultErrorFactory() {
  return new EmptyError();
}
__name(defaultErrorFactory, "defaultErrorFactory");

// node_modules/rxjs/dist/esm5/internal/operators/elementAt.js
function elementAt(index, defaultValue) {
  if (index < 0) {
    throw new ArgumentOutOfRangeError();
  }
  var hasDefaultValue = arguments.length >= 2;
  return function(source) {
    return source.pipe(filter(function(v, i) {
      return i === index;
    }), take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function() {
      return new ArgumentOutOfRangeError();
    }));
  };
}
__name(elementAt, "elementAt");

// node_modules/rxjs/dist/esm5/internal/operators/endWith.js
function endWith() {
  var values = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }
  return function(source) {
    return concat(source, of.apply(void 0, __spreadArray([], __read(values))));
  };
}
__name(endWith, "endWith");

// node_modules/rxjs/dist/esm5/internal/operators/every.js
function every(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      if (!predicate.call(thisArg, value, index++, source)) {
        subscriber.next(false);
        subscriber.complete();
      }
    }, function() {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}
__name(every, "every");

// node_modules/rxjs/dist/esm5/internal/operators/exhaustMap.js
function exhaustMap(project, resultSelector) {
  if (resultSelector) {
    return function(source) {
      return source.pipe(exhaustMap(function(a, i) {
        return innerFrom(project(a, i)).pipe(map(function(b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }));
    };
  }
  return operate(function(source, subscriber) {
    var index = 0;
    var innerSub = null;
    var isComplete = false;
    source.subscribe(createOperatorSubscriber(subscriber, function(outerValue) {
      if (!innerSub) {
        innerSub = createOperatorSubscriber(subscriber, void 0, function() {
          innerSub = null;
          isComplete && subscriber.complete();
        });
        innerFrom(project(outerValue, index++)).subscribe(innerSub);
      }
    }, function() {
      isComplete = true;
      !innerSub && subscriber.complete();
    }));
  });
}
__name(exhaustMap, "exhaustMap");

// node_modules/rxjs/dist/esm5/internal/operators/exhaustAll.js
function exhaustAll() {
  return exhaustMap(identity);
}
__name(exhaustAll, "exhaustAll");

// node_modules/rxjs/dist/esm5/internal/operators/exhaust.js
var exhaust = exhaustAll;

// node_modules/rxjs/dist/esm5/internal/operators/expand.js
function expand(project, concurrent, scheduler) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent, void 0, true, scheduler);
  });
}
__name(expand, "expand");

// node_modules/rxjs/dist/esm5/internal/operators/finalize.js
function finalize(callback) {
  return operate(function(source, subscriber) {
    try {
      source.subscribe(subscriber);
    } finally {
      subscriber.add(callback);
    }
  });
}
__name(finalize, "finalize");

// node_modules/rxjs/dist/esm5/internal/operators/find.js
function find(predicate, thisArg) {
  return operate(createFind(predicate, thisArg, "value"));
}
__name(find, "find");
function createFind(predicate, thisArg, emit) {
  var findIndex2 = emit === "index";
  return function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var i = index++;
      if (predicate.call(thisArg, value, i, source)) {
        subscriber.next(findIndex2 ? i : value);
        subscriber.complete();
      }
    }, function() {
      subscriber.next(findIndex2 ? -1 : void 0);
      subscriber.complete();
    }));
  };
}
__name(createFind, "createFind");

// node_modules/rxjs/dist/esm5/internal/operators/findIndex.js
function findIndex(predicate, thisArg) {
  return operate(createFind(predicate, thisArg, "index"));
}
__name(findIndex, "findIndex");

// node_modules/rxjs/dist/esm5/internal/operators/first.js
function first(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function(source) {
    return source.pipe(predicate ? filter(function(v, i) {
      return predicate(v, i, source);
    }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function() {
      return new EmptyError();
    }));
  };
}
__name(first, "first");

// node_modules/rxjs/dist/esm5/internal/operators/groupBy.js
function groupBy(keySelector, elementOrOptions, duration, connector) {
  return operate(function(source, subscriber) {
    var element;
    if (!elementOrOptions || typeof elementOrOptions === "function") {
      element = elementOrOptions;
    } else {
      duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector;
    }
    var groups = /* @__PURE__ */ new Map();
    var notify = /* @__PURE__ */ __name(function(cb) {
      groups.forEach(cb);
      cb(subscriber);
    }, "notify");
    var handleError = /* @__PURE__ */ __name(function(err) {
      return notify(function(consumer) {
        return consumer.error(err);
      });
    }, "handleError");
    var activeGroups = 0;
    var teardownAttempted = false;
    var groupBySourceSubscriber = new OperatorSubscriber(subscriber, function(value) {
      try {
        var key_1 = keySelector(value);
        var group_1 = groups.get(key_1);
        if (!group_1) {
          groups.set(key_1, group_1 = connector ? connector() : new Subject());
          var grouped = createGroupedObservable(key_1, group_1);
          subscriber.next(grouped);
          if (duration) {
            var durationSubscriber_1 = createOperatorSubscriber(group_1, function() {
              group_1.complete();
              durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
            }, void 0, void 0, function() {
              return groups.delete(key_1);
            });
            groupBySourceSubscriber.add(innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
          }
        }
        group_1.next(element ? element(value) : value);
      } catch (err) {
        handleError(err);
      }
    }, function() {
      return notify(function(consumer) {
        return consumer.complete();
      });
    }, handleError, function() {
      return groups.clear();
    }, function() {
      teardownAttempted = true;
      return activeGroups === 0;
    });
    source.subscribe(groupBySourceSubscriber);
    function createGroupedObservable(key, groupSubject) {
      var result = new Observable(function(groupSubscriber) {
        activeGroups++;
        var innerSub = groupSubject.subscribe(groupSubscriber);
        return function() {
          innerSub.unsubscribe();
          --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
        };
      });
      result.key = key;
      return result;
    }
    __name(createGroupedObservable, "createGroupedObservable");
  });
}
__name(groupBy, "groupBy");

// node_modules/rxjs/dist/esm5/internal/operators/isEmpty.js
function isEmpty() {
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function() {
      subscriber.next(false);
      subscriber.complete();
    }, function() {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}
__name(isEmpty, "isEmpty");

// node_modules/rxjs/dist/esm5/internal/operators/takeLast.js
function takeLast(count2) {
  return count2 <= 0 ? function() {
    return EMPTY;
  } : operate(function(source, subscriber) {
    var buffer2 = [];
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      buffer2.push(value);
      count2 < buffer2.length && buffer2.shift();
    }, function() {
      var e_1, _a;
      try {
        for (var buffer_1 = __values(buffer2), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
          var value = buffer_1_1.value;
          subscriber.next(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      subscriber.complete();
    }, void 0, function() {
      buffer2 = null;
    }));
  });
}
__name(takeLast, "takeLast");

// node_modules/rxjs/dist/esm5/internal/operators/last.js
function last2(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function(source) {
    return source.pipe(predicate ? filter(function(v, i) {
      return predicate(v, i, source);
    }) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function() {
      return new EmptyError();
    }));
  };
}
__name(last2, "last");

// node_modules/rxjs/dist/esm5/internal/operators/materialize.js
function materialize() {
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(Notification.createNext(value));
    }, function() {
      subscriber.next(Notification.createComplete());
      subscriber.complete();
    }, function(err) {
      subscriber.next(Notification.createError(err));
      subscriber.complete();
    }));
  });
}
__name(materialize, "materialize");

// node_modules/rxjs/dist/esm5/internal/operators/max.js
function max(comparer) {
  return reduce(isFunction(comparer) ? function(x, y) {
    return comparer(x, y) > 0 ? x : y;
  } : function(x, y) {
    return x > y ? x : y;
  });
}
__name(max, "max");

// node_modules/rxjs/dist/esm5/internal/operators/flatMap.js
var flatMap = mergeMap;

// node_modules/rxjs/dist/esm5/internal/operators/mergeMapTo.js
function mergeMapTo(innerObservable, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function() {
      return innerObservable;
    }, resultSelector, concurrent);
  }
  if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return mergeMap(function() {
    return innerObservable;
  }, concurrent);
}
__name(mergeMapTo, "mergeMapTo");

// node_modules/rxjs/dist/esm5/internal/operators/mergeScan.js
function mergeScan(accumulator, seed, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return operate(function(source, subscriber) {
    var state = seed;
    return mergeInternals(source, subscriber, function(value, index) {
      return accumulator(state, value, index);
    }, concurrent, function(value) {
      state = value;
    }, false, void 0, function() {
      return state = null;
    });
  });
}
__name(mergeScan, "mergeScan");

// node_modules/rxjs/dist/esm5/internal/operators/merge.js
function merge2() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var concurrent = popNumber(args, Infinity);
  return operate(function(source, subscriber) {
    mergeAll(concurrent)(from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
  });
}
__name(merge2, "merge");

// node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js
function mergeWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return merge2.apply(void 0, __spreadArray([], __read(otherSources)));
}
__name(mergeWith, "mergeWith");

// node_modules/rxjs/dist/esm5/internal/operators/min.js
function min(comparer) {
  return reduce(isFunction(comparer) ? function(x, y) {
    return comparer(x, y) < 0 ? x : y;
  } : function(x, y) {
    return x < y ? x : y;
  });
}
__name(min, "min");

// node_modules/rxjs/dist/esm5/internal/operators/multicast.js
function multicast(subjectOrSubjectFactory, selector) {
  var subjectFactory = isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function() {
    return subjectOrSubjectFactory;
  };
  if (isFunction(selector)) {
    return connect(selector, {
      connector: subjectFactory
    });
  }
  return function(source) {
    return new ConnectableObservable(source, subjectFactory);
  };
}
__name(multicast, "multicast");

// node_modules/rxjs/dist/esm5/internal/operators/onErrorResumeNextWith.js
function onErrorResumeNextWith() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  var nextSources = argsOrArgArray(sources);
  return function(source) {
    return onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources)));
  };
}
__name(onErrorResumeNextWith, "onErrorResumeNextWith");

// node_modules/rxjs/dist/esm5/internal/operators/pairwise.js
function pairwise() {
  return operate(function(source, subscriber) {
    var prev;
    var hasPrev = false;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var p = prev;
      prev = value;
      hasPrev && subscriber.next([p, value]);
      hasPrev = true;
    }));
  });
}
__name(pairwise, "pairwise");

// node_modules/rxjs/dist/esm5/internal/operators/pluck.js
function pluck() {
  var properties = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    properties[_i] = arguments[_i];
  }
  var length = properties.length;
  if (length === 0) {
    throw new Error("list of properties cannot be empty.");
  }
  return map(function(x) {
    var currentProp = x;
    for (var i = 0; i < length; i++) {
      var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
      if (typeof p !== "undefined") {
        currentProp = p;
      } else {
        return void 0;
      }
    }
    return currentProp;
  });
}
__name(pluck, "pluck");

// node_modules/rxjs/dist/esm5/internal/operators/publish.js
function publish(selector) {
  return selector ? function(source) {
    return connect(selector)(source);
  } : function(source) {
    return multicast(new Subject())(source);
  };
}
__name(publish, "publish");

// node_modules/rxjs/dist/esm5/internal/operators/publishBehavior.js
function publishBehavior(initialValue) {
  return function(source) {
    var subject = new BehaviorSubject(initialValue);
    return new ConnectableObservable(source, function() {
      return subject;
    });
  };
}
__name(publishBehavior, "publishBehavior");

// node_modules/rxjs/dist/esm5/internal/operators/publishLast.js
function publishLast() {
  return function(source) {
    var subject = new AsyncSubject();
    return new ConnectableObservable(source, function() {
      return subject;
    });
  };
}
__name(publishLast, "publishLast");

// node_modules/rxjs/dist/esm5/internal/operators/publishReplay.js
function publishReplay(bufferSize, windowTime2, selectorOrScheduler, timestampProvider) {
  if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
    timestampProvider = selectorOrScheduler;
  }
  var selector = isFunction(selectorOrScheduler) ? selectorOrScheduler : void 0;
  return function(source) {
    return multicast(new ReplaySubject(bufferSize, windowTime2, timestampProvider), selector)(source);
  };
}
__name(publishReplay, "publishReplay");

// node_modules/rxjs/dist/esm5/internal/operators/raceWith.js
function raceWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return !otherSources.length ? identity : operate(function(source, subscriber) {
    raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
  });
}
__name(raceWith, "raceWith");

// node_modules/rxjs/dist/esm5/internal/operators/repeat.js
function repeat(countOrConfig) {
  var _a;
  var count2 = Infinity;
  var delay2;
  if (countOrConfig != null) {
    if (typeof countOrConfig === "object") {
      _a = countOrConfig.count, count2 = _a === void 0 ? Infinity : _a, delay2 = countOrConfig.delay;
    } else {
      count2 = countOrConfig;
    }
  }
  return count2 <= 0 ? function() {
    return EMPTY;
  } : operate(function(source, subscriber) {
    var soFar = 0;
    var sourceSub;
    var resubscribe = /* @__PURE__ */ __name(function() {
      sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
      sourceSub = null;
      if (delay2 != null) {
        var notifier = typeof delay2 === "number" ? timer(delay2) : innerFrom(delay2(soFar));
        var notifierSubscriber_1 = createOperatorSubscriber(subscriber, function() {
          notifierSubscriber_1.unsubscribe();
          subscribeToSource();
        });
        notifier.subscribe(notifierSubscriber_1);
      } else {
        subscribeToSource();
      }
    }, "resubscribe");
    var subscribeToSource = /* @__PURE__ */ __name(function() {
      var syncUnsub = false;
      sourceSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, function() {
        if (++soFar < count2) {
          if (sourceSub) {
            resubscribe();
          } else {
            syncUnsub = true;
          }
        } else {
          subscriber.complete();
        }
      }));
      if (syncUnsub) {
        resubscribe();
      }
    }, "subscribeToSource");
    subscribeToSource();
  });
}
__name(repeat, "repeat");

// node_modules/rxjs/dist/esm5/internal/operators/repeatWhen.js
function repeatWhen(notifier) {
  return operate(function(source, subscriber) {
    var innerSub;
    var syncResub = false;
    var completions$;
    var isNotifierComplete = false;
    var isMainComplete = false;
    var checkComplete = /* @__PURE__ */ __name(function() {
      return isMainComplete && isNotifierComplete && (subscriber.complete(), true);
    }, "checkComplete");
    var getCompletionSubject = /* @__PURE__ */ __name(function() {
      if (!completions$) {
        completions$ = new Subject();
        innerFrom(notifier(completions$)).subscribe(createOperatorSubscriber(subscriber, function() {
          if (innerSub) {
            subscribeForRepeatWhen();
          } else {
            syncResub = true;
          }
        }, function() {
          isNotifierComplete = true;
          checkComplete();
        }));
      }
      return completions$;
    }, "getCompletionSubject");
    var subscribeForRepeatWhen = /* @__PURE__ */ __name(function() {
      isMainComplete = false;
      innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, function() {
        isMainComplete = true;
        !checkComplete() && getCompletionSubject().next();
      }));
      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRepeatWhen();
      }
    }, "subscribeForRepeatWhen");
    subscribeForRepeatWhen();
  });
}
__name(repeatWhen, "repeatWhen");

// node_modules/rxjs/dist/esm5/internal/operators/retry.js
function retry(configOrCount) {
  if (configOrCount === void 0) {
    configOrCount = Infinity;
  }
  var config2;
  if (configOrCount && typeof configOrCount === "object") {
    config2 = configOrCount;
  } else {
    config2 = {
      count: configOrCount
    };
  }
  var _a = config2.count, count2 = _a === void 0 ? Infinity : _a, delay2 = config2.delay, _b = config2.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
  return count2 <= 0 ? identity : operate(function(source, subscriber) {
    var soFar = 0;
    var innerSub;
    var subscribeForRetry = /* @__PURE__ */ __name(function() {
      var syncUnsub = false;
      innerSub = source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        if (resetOnSuccess) {
          soFar = 0;
        }
        subscriber.next(value);
      }, void 0, function(err) {
        if (soFar++ < count2) {
          var resub_1 = /* @__PURE__ */ __name(function() {
            if (innerSub) {
              innerSub.unsubscribe();
              innerSub = null;
              subscribeForRetry();
            } else {
              syncUnsub = true;
            }
          }, "resub_1");
          if (delay2 != null) {
            var notifier = typeof delay2 === "number" ? timer(delay2) : innerFrom(delay2(err, soFar));
            var notifierSubscriber_1 = createOperatorSubscriber(subscriber, function() {
              notifierSubscriber_1.unsubscribe();
              resub_1();
            }, function() {
              subscriber.complete();
            });
            notifier.subscribe(notifierSubscriber_1);
          } else {
            resub_1();
          }
        } else {
          subscriber.error(err);
        }
      }));
      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        subscribeForRetry();
      }
    }, "subscribeForRetry");
    subscribeForRetry();
  });
}
__name(retry, "retry");

// node_modules/rxjs/dist/esm5/internal/operators/retryWhen.js
function retryWhen(notifier) {
  return operate(function(source, subscriber) {
    var innerSub;
    var syncResub = false;
    var errors$;
    var subscribeForRetryWhen = /* @__PURE__ */ __name(function() {
      innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
        if (!errors$) {
          errors$ = new Subject();
          innerFrom(notifier(errors$)).subscribe(createOperatorSubscriber(subscriber, function() {
            return innerSub ? subscribeForRetryWhen() : syncResub = true;
          }));
        }
        if (errors$) {
          errors$.next(err);
        }
      }));
      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRetryWhen();
      }
    }, "subscribeForRetryWhen");
    subscribeForRetryWhen();
  });
}
__name(retryWhen, "retryWhen");

// node_modules/rxjs/dist/esm5/internal/operators/sample.js
function sample(notifier) {
  return operate(function(source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      lastValue = value;
    }));
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    }, noop));
  });
}
__name(sample, "sample");

// node_modules/rxjs/dist/esm5/internal/operators/sampleTime.js
function sampleTime(period, scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return sample(interval(period, scheduler));
}
__name(sampleTime, "sampleTime");

// node_modules/rxjs/dist/esm5/internal/operators/scan.js
function scan(accumulator, seed) {
  return operate(scanInternals(accumulator, seed, arguments.length >= 2, true));
}
__name(scan, "scan");

// node_modules/rxjs/dist/esm5/internal/operators/sequenceEqual.js
function sequenceEqual(compareTo, comparator) {
  if (comparator === void 0) {
    comparator = /* @__PURE__ */ __name(function(a, b) {
      return a === b;
    }, "comparator");
  }
  return operate(function(source, subscriber) {
    var aState = createState();
    var bState = createState();
    var emit = /* @__PURE__ */ __name(function(isEqual) {
      subscriber.next(isEqual);
      subscriber.complete();
    }, "emit");
    var createSubscriber = /* @__PURE__ */ __name(function(selfState, otherState) {
      var sequenceEqualSubscriber = createOperatorSubscriber(subscriber, function(a) {
        var buffer2 = otherState.buffer, complete = otherState.complete;
        if (buffer2.length === 0) {
          complete ? emit(false) : selfState.buffer.push(a);
        } else {
          !comparator(a, buffer2.shift()) && emit(false);
        }
      }, function() {
        selfState.complete = true;
        var complete = otherState.complete, buffer2 = otherState.buffer;
        complete && emit(buffer2.length === 0);
        sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
      });
      return sequenceEqualSubscriber;
    }, "createSubscriber");
    source.subscribe(createSubscriber(aState, bState));
    innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
  });
}
__name(sequenceEqual, "sequenceEqual");
function createState() {
  return {
    buffer: [],
    complete: false
  };
}
__name(createState, "createState");

// node_modules/rxjs/dist/esm5/internal/operators/share.js
function share(options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.connector, connector = _a === void 0 ? function() {
    return new Subject();
  } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
  return function(wrapperSource) {
    var connection;
    var resetConnection;
    var subject;
    var refCount2 = 0;
    var hasCompleted = false;
    var hasErrored = false;
    var cancelReset = /* @__PURE__ */ __name(function() {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = void 0;
    }, "cancelReset");
    var reset = /* @__PURE__ */ __name(function() {
      cancelReset();
      connection = subject = void 0;
      hasCompleted = hasErrored = false;
    }, "reset");
    var resetAndUnsubscribe = /* @__PURE__ */ __name(function() {
      var conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    }, "resetAndUnsubscribe");
    return operate(function(source, subscriber) {
      refCount2++;
      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }
      var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(function() {
        refCount2--;
        if (refCount2 === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);
      if (!connection && refCount2 > 0) {
        connection = new SafeSubscriber({
          next: /* @__PURE__ */ __name(function(value) {
            return dest.next(value);
          }, "next"),
          error: /* @__PURE__ */ __name(function(err) {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          }, "error"),
          complete: /* @__PURE__ */ __name(function() {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }, "complete")
        });
        innerFrom(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}
__name(share, "share");
function handleReset(reset, on) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  if (on === true) {
    reset();
    return;
  }
  if (on === false) {
    return;
  }
  var onSubscriber = new SafeSubscriber({
    next: /* @__PURE__ */ __name(function() {
      onSubscriber.unsubscribe();
      reset();
    }, "next")
  });
  return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}
__name(handleReset, "handleReset");

// node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js
function shareReplay(configOrBufferSize, windowTime2, scheduler) {
  var _a, _b, _c;
  var bufferSize;
  var refCount2 = false;
  if (configOrBufferSize && typeof configOrBufferSize === "object") {
    _a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime2 = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount2 = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
  } else {
    bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
  }
  return share({
    connector: /* @__PURE__ */ __name(function() {
      return new ReplaySubject(bufferSize, windowTime2, scheduler);
    }, "connector"),
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: refCount2
  });
}
__name(shareReplay, "shareReplay");

// node_modules/rxjs/dist/esm5/internal/operators/single.js
function single(predicate) {
  return operate(function(source, subscriber) {
    var hasValue = false;
    var singleValue;
    var seenValue = false;
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      seenValue = true;
      if (!predicate || predicate(value, index++, source)) {
        hasValue && subscriber.error(new SequenceError("Too many matching values"));
        hasValue = true;
        singleValue = value;
      }
    }, function() {
      if (hasValue) {
        subscriber.next(singleValue);
        subscriber.complete();
      } else {
        subscriber.error(seenValue ? new NotFoundError("No matching values") : new EmptyError());
      }
    }));
  });
}
__name(single, "single");

// node_modules/rxjs/dist/esm5/internal/operators/skip.js
function skip(count2) {
  return filter(function(_, index) {
    return count2 <= index;
  });
}
__name(skip, "skip");

// node_modules/rxjs/dist/esm5/internal/operators/skipLast.js
function skipLast(skipCount) {
  return skipCount <= 0 ? identity : operate(function(source, subscriber) {
    var ring = new Array(skipCount);
    var seen = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var valueIndex = seen++;
      if (valueIndex < skipCount) {
        ring[valueIndex] = value;
      } else {
        var index = valueIndex % skipCount;
        var oldValue = ring[index];
        ring[index] = value;
        subscriber.next(oldValue);
      }
    }));
    return function() {
      ring = null;
    };
  });
}
__name(skipLast, "skipLast");

// node_modules/rxjs/dist/esm5/internal/operators/skipUntil.js
function skipUntil(notifier) {
  return operate(function(source, subscriber) {
    var taking = false;
    var skipSubscriber = createOperatorSubscriber(subscriber, function() {
      skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
      taking = true;
    }, noop);
    innerFrom(notifier).subscribe(skipSubscriber);
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return taking && subscriber.next(value);
    }));
  });
}
__name(skipUntil, "skipUntil");

// node_modules/rxjs/dist/esm5/internal/operators/skipWhile.js
function skipWhile(predicate) {
  return operate(function(source, subscriber) {
    var taking = false;
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return (taking || (taking = !predicate(value, index++))) && subscriber.next(value);
    }));
  });
}
__name(skipWhile, "skipWhile");

// node_modules/rxjs/dist/esm5/internal/operators/startWith.js
function startWith() {
  var values = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }
  var scheduler = popScheduler(values);
  return operate(function(source, subscriber) {
    (scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
  });
}
__name(startWith, "startWith");

// node_modules/rxjs/dist/esm5/internal/operators/switchMap.js
function switchMap(project, resultSelector) {
  return operate(function(source, subscriber) {
    var innerSubscriber = null;
    var index = 0;
    var isComplete = false;
    var checkComplete = /* @__PURE__ */ __name(function() {
      return isComplete && !innerSubscriber && subscriber.complete();
    }, "checkComplete");
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      var innerIndex = 0;
      var outerIndex = index++;
      innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, function(innerValue) {
        return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
      }, function() {
        innerSubscriber = null;
        checkComplete();
      }));
    }, function() {
      isComplete = true;
      checkComplete();
    }));
  });
}
__name(switchMap, "switchMap");

// node_modules/rxjs/dist/esm5/internal/operators/switchAll.js
function switchAll() {
  return switchMap(identity);
}
__name(switchAll, "switchAll");

// node_modules/rxjs/dist/esm5/internal/operators/switchMapTo.js
function switchMapTo(innerObservable, resultSelector) {
  return isFunction(resultSelector) ? switchMap(function() {
    return innerObservable;
  }, resultSelector) : switchMap(function() {
    return innerObservable;
  });
}
__name(switchMapTo, "switchMapTo");

// node_modules/rxjs/dist/esm5/internal/operators/switchScan.js
function switchScan(accumulator, seed) {
  return operate(function(source, subscriber) {
    var state = seed;
    switchMap(function(value, index) {
      return accumulator(state, value, index);
    }, function(_, innerValue) {
      return state = innerValue, innerValue;
    })(source).subscribe(subscriber);
    return function() {
      state = null;
    };
  });
}
__name(switchScan, "switchScan");

// node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
function takeUntil(notifier) {
  return operate(function(source, subscriber) {
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
      return subscriber.complete();
    }, noop));
    !subscriber.closed && source.subscribe(subscriber);
  });
}
__name(takeUntil, "takeUntil");

// node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js
function takeWhile(predicate, inclusive) {
  if (inclusive === void 0) {
    inclusive = false;
  }
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var result = predicate(value, index++);
      (result || inclusive) && subscriber.next(value);
      !result && subscriber.complete();
    }));
  });
}
__name(takeWhile, "takeWhile");

// node_modules/rxjs/dist/esm5/internal/operators/tap.js
function tap(observerOrNext, error, complete) {
  var tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? operate(function(source, subscriber) {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, function() {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, function(err) {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, function() {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity;
}
__name(tap, "tap");

// node_modules/rxjs/dist/esm5/internal/operators/throttle.js
function throttle(durationSelector, config2) {
  return operate(function(source, subscriber) {
    var _a = config2 !== null && config2 !== void 0 ? config2 : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
    var hasValue = false;
    var sendValue = null;
    var throttled = null;
    var isComplete = false;
    var endThrottling = /* @__PURE__ */ __name(function() {
      throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
      throttled = null;
      if (trailing) {
        send();
        isComplete && subscriber.complete();
      }
    }, "endThrottling");
    var cleanupThrottling = /* @__PURE__ */ __name(function() {
      throttled = null;
      isComplete && subscriber.complete();
    }, "cleanupThrottling");
    var startThrottle = /* @__PURE__ */ __name(function(value) {
      return throttled = innerFrom(durationSelector(value)).subscribe(createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
    }, "startThrottle");
    var send = /* @__PURE__ */ __name(function() {
      if (hasValue) {
        hasValue = false;
        var value = sendValue;
        sendValue = null;
        subscriber.next(value);
        !isComplete && startThrottle(value);
      }
    }, "send");
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      hasValue = true;
      sendValue = value;
      !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
    }, function() {
      isComplete = true;
      !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
    }));
  });
}
__name(throttle, "throttle");

// node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js
function throttleTime(duration, scheduler, config2) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  var duration$ = timer(duration, scheduler);
  return throttle(function() {
    return duration$;
  }, config2);
}
__name(throttleTime, "throttleTime");

// node_modules/rxjs/dist/esm5/internal/operators/timeInterval.js
function timeInterval(scheduler) {
  if (scheduler === void 0) {
    scheduler = asyncScheduler;
  }
  return operate(function(source, subscriber) {
    var last3 = scheduler.now();
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var now = scheduler.now();
      var interval2 = now - last3;
      last3 = now;
      subscriber.next(new TimeInterval(value, interval2));
    }));
  });
}
__name(timeInterval, "timeInterval");
var TimeInterval = /* @__PURE__ */ (function() {
  function TimeInterval2(value, interval2) {
    this.value = value;
    this.interval = interval2;
  }
  __name(TimeInterval2, "TimeInterval");
  return TimeInterval2;
})();

// node_modules/rxjs/dist/esm5/internal/operators/timeoutWith.js
function timeoutWith(due, withObservable, scheduler) {
  var first2;
  var each;
  var _with;
  scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async;
  if (isValidDate(due)) {
    first2 = due;
  } else if (typeof due === "number") {
    each = due;
  }
  if (withObservable) {
    _with = /* @__PURE__ */ __name(function() {
      return withObservable;
    }, "_with");
  } else {
    throw new TypeError("No observable provided to switch to");
  }
  if (first2 == null && each == null) {
    throw new TypeError("No timeout provided.");
  }
  return timeout({
    first: first2,
    each,
    scheduler,
    with: _with
  });
}
__name(timeoutWith, "timeoutWith");

// node_modules/rxjs/dist/esm5/internal/operators/timestamp.js
function timestamp(timestampProvider) {
  if (timestampProvider === void 0) {
    timestampProvider = dateTimestampProvider;
  }
  return map(function(value) {
    return { value, timestamp: timestampProvider.now() };
  });
}
__name(timestamp, "timestamp");

// node_modules/rxjs/dist/esm5/internal/operators/window.js
function window(windowBoundaries) {
  return operate(function(source, subscriber) {
    var windowSubject = new Subject();
    subscriber.next(windowSubject.asObservable());
    var errorHandler = /* @__PURE__ */ __name(function(err) {
      windowSubject.error(err);
      subscriber.error(err);
    }, "errorHandler");
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value);
    }, function() {
      windowSubject.complete();
      subscriber.complete();
    }, errorHandler));
    innerFrom(windowBoundaries).subscribe(createOperatorSubscriber(subscriber, function() {
      windowSubject.complete();
      subscriber.next(windowSubject = new Subject());
    }, noop, errorHandler));
    return function() {
      windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
      windowSubject = null;
    };
  });
}
__name(window, "window");

// node_modules/rxjs/dist/esm5/internal/operators/windowCount.js
function windowCount(windowSize, startWindowEvery) {
  if (startWindowEvery === void 0) {
    startWindowEvery = 0;
  }
  var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
  return operate(function(source, subscriber) {
    var windows = [new Subject()];
    var starts = [];
    var count2 = 0;
    subscriber.next(windows[0].asObservable());
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a;
      try {
        for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
          var window_1 = windows_1_1.value;
          window_1.next(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      var c = count2 - windowSize + 1;
      if (c >= 0 && c % startEvery === 0) {
        windows.shift().complete();
      }
      if (++count2 % startEvery === 0) {
        var window_2 = new Subject();
        windows.push(window_2);
        subscriber.next(window_2.asObservable());
      }
    }, function() {
      while (windows.length > 0) {
        windows.shift().complete();
      }
      subscriber.complete();
    }, function(err) {
      while (windows.length > 0) {
        windows.shift().error(err);
      }
      subscriber.error(err);
    }, function() {
      starts = null;
      windows = null;
    }));
  });
}
__name(windowCount, "windowCount");

// node_modules/rxjs/dist/esm5/internal/operators/windowTime.js
function windowTime(windowTimeSpan) {
  var _a, _b;
  var otherArgs = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    otherArgs[_i - 1] = arguments[_i];
  }
  var scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
  var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  var maxWindowSize = otherArgs[1] || Infinity;
  return operate(function(source, subscriber) {
    var windowRecords = [];
    var restartOnClose = false;
    var closeWindow = /* @__PURE__ */ __name(function(record) {
      var window2 = record.window, subs = record.subs;
      window2.complete();
      subs.unsubscribe();
      arrRemove(windowRecords, record);
      restartOnClose && startWindow();
    }, "closeWindow");
    var startWindow = /* @__PURE__ */ __name(function() {
      if (windowRecords) {
        var subs = new Subscription();
        subscriber.add(subs);
        var window_1 = new Subject();
        var record_1 = {
          window: window_1,
          subs,
          seen: 0
        };
        windowRecords.push(record_1);
        subscriber.next(window_1.asObservable());
        executeSchedule(subs, scheduler, function() {
          return closeWindow(record_1);
        }, windowTimeSpan);
      }
    }, "startWindow");
    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
    } else {
      restartOnClose = true;
    }
    startWindow();
    var loop = /* @__PURE__ */ __name(function(cb) {
      return windowRecords.slice().forEach(cb);
    }, "loop");
    var terminate = /* @__PURE__ */ __name(function(cb) {
      loop(function(_a2) {
        var window2 = _a2.window;
        return cb(window2);
      });
      cb(subscriber);
      subscriber.unsubscribe();
    }, "terminate");
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      loop(function(record) {
        record.window.next(value);
        maxWindowSize <= ++record.seen && closeWindow(record);
      });
    }, function() {
      return terminate(function(consumer) {
        return consumer.complete();
      });
    }, function(err) {
      return terminate(function(consumer) {
        return consumer.error(err);
      });
    }));
    return function() {
      windowRecords = null;
    };
  });
}
__name(windowTime, "windowTime");

// node_modules/rxjs/dist/esm5/internal/operators/windowToggle.js
function windowToggle(openings, closingSelector) {
  return operate(function(source, subscriber) {
    var windows = [];
    var handleError = /* @__PURE__ */ __name(function(err) {
      while (0 < windows.length) {
        windows.shift().error(err);
      }
      subscriber.error(err);
    }, "handleError");
    innerFrom(openings).subscribe(createOperatorSubscriber(subscriber, function(openValue) {
      var window2 = new Subject();
      windows.push(window2);
      var closingSubscription = new Subscription();
      var closeWindow = /* @__PURE__ */ __name(function() {
        arrRemove(windows, window2);
        window2.complete();
        closingSubscription.unsubscribe();
      }, "closeWindow");
      var closingNotifier;
      try {
        closingNotifier = innerFrom(closingSelector(openValue));
      } catch (err) {
        handleError(err);
        return;
      }
      subscriber.next(window2.asObservable());
      closingSubscription.add(closingNotifier.subscribe(createOperatorSubscriber(subscriber, closeWindow, noop, handleError)));
    }, noop));
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var e_1, _a;
      var windowsCopy = windows.slice();
      try {
        for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
          var window_1 = windowsCopy_1_1.value;
          window_1.next(value);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function() {
      while (0 < windows.length) {
        windows.shift().complete();
      }
      subscriber.complete();
    }, handleError, function() {
      while (0 < windows.length) {
        windows.shift().unsubscribe();
      }
    }));
  });
}
__name(windowToggle, "windowToggle");

// node_modules/rxjs/dist/esm5/internal/operators/windowWhen.js
function windowWhen(closingSelector) {
  return operate(function(source, subscriber) {
    var window2;
    var closingSubscriber;
    var handleError = /* @__PURE__ */ __name(function(err) {
      window2.error(err);
      subscriber.error(err);
    }, "handleError");
    var openWindow = /* @__PURE__ */ __name(function() {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window2 === null || window2 === void 0 ? void 0 : window2.complete();
      window2 = new Subject();
      subscriber.next(window2.asObservable());
      var closingNotifier;
      try {
        closingNotifier = innerFrom(closingSelector());
      } catch (err) {
        handleError(err);
        return;
      }
      closingNotifier.subscribe(closingSubscriber = createOperatorSubscriber(subscriber, openWindow, openWindow, handleError));
    }, "openWindow");
    openWindow();
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return window2.next(value);
    }, function() {
      window2.complete();
      subscriber.complete();
    }, handleError, function() {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window2 = null;
    }));
  });
}
__name(windowWhen, "windowWhen");

// node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js
function withLatestFrom() {
  var inputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputs[_i] = arguments[_i];
  }
  var project = popResultSelector(inputs);
  return operate(function(source, subscriber) {
    var len = inputs.length;
    var otherValues = new Array(len);
    var hasValue = inputs.map(function() {
      return false;
    });
    var ready = false;
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      innerFrom(inputs[i2]).subscribe(createOperatorSubscriber(subscriber, function(value) {
        otherValues[i2] = value;
        if (!ready && !hasValue[i2]) {
          hasValue[i2] = true;
          (ready = hasValue.every(identity)) && (hasValue = null);
        }
      }, noop));
    }, "_loop_1");
    for (var i = 0; i < len; i++) {
      _loop_1(i);
    }
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      if (ready) {
        var values = __spreadArray([value], __read(otherValues));
        subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
      }
    }));
  });
}
__name(withLatestFrom, "withLatestFrom");

// node_modules/rxjs/dist/esm5/internal/operators/zipAll.js
function zipAll(project) {
  return joinAllInternals(zip, project);
}
__name(zipAll, "zipAll");

// node_modules/rxjs/dist/esm5/internal/operators/zip.js
function zip2() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  return operate(function(source, subscriber) {
    zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
  });
}
__name(zip2, "zip");

// node_modules/rxjs/dist/esm5/internal/operators/zipWith.js
function zipWith() {
  var otherInputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherInputs[_i] = arguments[_i];
  }
  return zip2.apply(void 0, __spreadArray([], __read(otherInputs)));
}
__name(zipWith, "zipWith");

export {
  UnsubscriptionError,
  Subscription,
  config,
  noop,
  Subscriber,
  observable,
  identity,
  pipe,
  Observable,
  refCount,
  ConnectableObservable,
  animationFrames,
  ObjectUnsubscribedError,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  Scheduler,
  asapScheduler,
  asap,
  asyncScheduler,
  async,
  queueScheduler,
  queue,
  animationFrameScheduler,
  animationFrame,
  VirtualTimeScheduler,
  VirtualAction,
  EMPTY,
  empty,
  observeOn,
  subscribeOn,
  scheduled,
  from,
  of,
  throwError,
  NotificationKind,
  Notification,
  isObservable,
  EmptyError,
  lastValueFrom,
  firstValueFrom,
  ArgumentOutOfRangeError,
  NotFoundError,
  SequenceError,
  TimeoutError,
  timeout,
  map,
  bindCallback,
  bindNodeCallback,
  combineLatest,
  mergeMap,
  mergeAll,
  concatAll,
  concat,
  defer,
  connectable,
  forkJoin,
  fromEvent,
  fromEventPattern,
  generate,
  iif,
  timer,
  interval,
  merge,
  NEVER,
  never,
  onErrorResumeNext,
  pairs,
  filter,
  partition,
  race,
  range,
  using,
  zip,
  audit,
  auditTime,
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  catchError,
  reduce,
  toArray,
  combineLatestAll,
  combineAll,
  combineLatestWith,
  concatMap,
  concatMapTo,
  concatWith,
  connect,
  count,
  debounce,
  debounceTime,
  defaultIfEmpty,
  take,
  ignoreElements,
  mapTo,
  delayWhen,
  delay,
  dematerialize,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  throwIfEmpty,
  elementAt,
  endWith,
  every,
  exhaustMap,
  exhaustAll,
  exhaust,
  expand,
  finalize,
  find,
  findIndex,
  first,
  groupBy,
  isEmpty,
  takeLast,
  last2 as last,
  materialize,
  max,
  flatMap,
  mergeMapTo,
  mergeScan,
  mergeWith,
  min,
  multicast,
  onErrorResumeNextWith,
  pairwise,
  pluck,
  publish,
  publishBehavior,
  publishLast,
  publishReplay,
  raceWith,
  repeat,
  repeatWhen,
  retry,
  retryWhen,
  sample,
  sampleTime,
  scan,
  sequenceEqual,
  share,
  shareReplay,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  startWith,
  switchMap,
  switchAll,
  switchMapTo,
  switchScan,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throttleTime,
  timeInterval,
  timeoutWith,
  timestamp,
  window,
  windowCount,
  windowTime,
  windowToggle,
  windowWhen,
  withLatestFrom,
  zipAll,
  zipWith
};
//# sourceMappingURL=chunk-RRJ5VVQO.js.map
