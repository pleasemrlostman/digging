function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
      : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _maybeArrayLike(r, a, e) {
  if (a && !Array.isArray(a) && "number" == typeof a.length) {
    var y = a.length;
    return _arrayLikeToArray(a, void 0 !== e && e < y ? e : y);
  }
  return r(a, e);
}
function _toConsumableArray(r) {
  return (
    _arrayWithoutHoles(r) ||
    _iterableToArray(r) ||
    _unsupportedIterableToArray(r) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _iterableToArray(r) {
  if (
    ("undefined" != typeof Symbol && null != r[Symbol.iterator]) ||
    null != r["@@iterator"]
  )
    return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _createForOfIteratorHelper(r, e) {
  var t =
    ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
  if (!t) {
    if (
      Array.isArray(r) ||
      (t = _unsupportedIterableToArray(r)) ||
      (e && r && "number" == typeof r.length)
    ) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
        },
        e: function e(r) {
          throw r;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return (a = r.done), r;
    },
    e: function e(r) {
      (u = !0), (o = r);
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    },
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return (
      "Object" === t && r.constructor && (t = r.constructor.name),
      "Map" === t || "Set" === t
        ? Array.from(r)
        : "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        ? _arrayLikeToArray(r, a)
        : void 0
    );
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
import { lazy as $L, Suspense as $S, useEffect as $U } from "react";
import { Fragment as $F, jsx as $J } from "react/jsx-runtime";
var $M = import.meta.glob("./pages/**/*.tsx");
var $T = import.meta.glob("./pages/**/meta.tsx", {
  eager: true,
});
var $A = function $A(_ref) {
  var $C = _ref.children;
  var $OK = true;
  return $OK
    ? $J($F, {
        children: $C,
      })
    : $J("div", {
        children: "🔒 로그인 필요",
      });
};
export var $title = function $title(t) {
  return $U(
    function () {
      return t && (document.title = t);
    },
    [t]
  );
};
export var $crumbs = function $crumbs(m) {
  return m
    .map(function (x) {
      var _x$handle;
      return x === null ||
        x === void 0 ||
        (_x$handle = x.handle) === null ||
        _x$handle === void 0 ||
        (_x$handle = _x$handle.meta) === null ||
        _x$handle === void 0
        ? void 0
        : _x$handle.title;
    })
    .filter(Boolean);
};
var $tree = function $tree() {
  var $T = {};
  var _loop = function _loop($P) {
    var $Sg = $P.replace("./pages/", "").split("/");
    var $N = $T;
    $Sg.forEach(function (s, i) {
      var $END = i === $Sg.length - 1;
      var $K = s.replace(".tsx", "");
      if ($END && $K === "layout") {
        if ($Sg.length === 1) {
          $T.index = $T.index || {};
          $T.index.__layoutImport = $M[$P];
        } else {
          $N.__layoutImport = $M[$P];
        }
        return;
      }
      if ($END && $K === "error") {
        $N.error = {
          __import: $M[$P],
        };
        return;
      }
      if (!$N[$K]) $N[$K] = {};
      if ($END) $N[$K].__import = $M[$P];
      $N = $N[$K];
    });
  };
  for (var $P in $M) {
    _loop($P);
  }
  var _loop2 = function _loop2(_$P) {
    var $Sg = _$P.replace("./pages/", "").split("/");
    var $N = $T;
    $Sg.forEach(function (s, i) {
      var $K = s.replace(".tsx", "").replace("meta", "");
      $N[$K] = $N[$K] || {};
      if (i === $Sg.length - 1) $N[$K].__meta = $T[_$P]["default"];
      $N = $N[$K];
    });
  };
  for (var _$P in $T) {
    _loop2(_$P);
  }
  return $T;
};
var _$routes = function $routes(n, p) {
  var _n$index, _n$index2, _n$index3, _n$index4;
  if (p === void 0) {
    p = "";
  }
  var R = [],
    m = n.__meta || {},
    R0 = p === "";
  var HL = !!(
    n.__layoutImport ||
    ((_n$index = n.index) !== null &&
      _n$index !== void 0 &&
      _n$index.__layoutImport)
  );
  var LI =
    n.__layoutImport ||
    ((_n$index2 = n.index) === null || _n$index2 === void 0
      ? void 0
      : _n$index2.__layoutImport);
  var HI =
    !!(
      (_n$index3 = n.index) !== null &&
      _n$index3 !== void 0 &&
      _n$index3.__import
    ) || !!n.__import;
  var IDX =
    (_n$index4 = n.index) !== null && _n$index4 !== void 0 ? _n$index4 : n;
  var CH = Object.keys(n).filter(function (k) {
    return !["__import", "__meta", "__layoutImport", "index", "error"].includes(
      k
    );
  });
  if (HL && LI) {
    var $LAY = /*#__PURE__*/ $L(LI);
    var $ELE = $J($S, {
      fallback: $J("div", {
        children: "로딩 중...",
      }),
      children: $J($LAY, {}),
    });
    var R1 = {
      path: R0 ? "/" : undefined,
      element: m.requiresAuth
        ? $J($A, {
            children: $ELE,
          })
        : $ELE,
      children: [],
      handle: {
        meta: m,
      },
    };
    if (IDX !== null && IDX !== void 0 && IDX.__import) {
      var $I = /*#__PURE__*/ $L(IDX.__import);
      R1.children.push({
        index: true,
        element: $J($S, {
          fallback: $J("div", {
            children: "로딩 중...",
          }),
          children: $J($I, {}),
        }),
        handle: IDX.__meta
          ? {
              meta: IDX.__meta,
            }
          : undefined,
      });
    }
    var _iterator = _createForOfIteratorHelper(CH, true),
      _step;
    try {
      var _loop3 = function _loop3() {
        var _R1$children;
        var k = _step.value;
        var S = k.startsWith("[") ? ":" + k.slice(1, -1) : k;
        var C = _$routes(n[k], p + ("/" + S));
        (_R1$children = R1.children).push.apply(
          _R1$children,
          _maybeArrayLike(
            _toConsumableArray,
            C.map(function (r) {
              var _r$path;
              return _objectSpread(
                _objectSpread({}, r),
                {},
                {
                  path:
                    (_r$path = r.path) !== null && _r$path !== void 0
                      ? _r$path
                      : S,
                }
              );
            })
          )
        );
      };
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        _loop3();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    R.push(R1);
    return R;
  }
  var EI = HI
    ? IDX === null || IDX === void 0
      ? void 0
      : IDX.__import
    : n.__import;
  if (EI) {
    var $C = /*#__PURE__*/ $L(EI);
    R.push({
      path: R0 ? "/" : undefined,
      element: m.requiresAuth
        ? $J($A, {
            children: $J($S, {
              fallback: $J("div", {
                children: "로딩 중...",
              }),
              children: $J($C, {}),
            }),
          })
        : $J($S, {
            fallback: $J("div", {
              children: "로딩 중...",
            }),
            children: $J($C, {}),
          }),
      handle: {
        meta: m,
      },
    });
  }
  return R;
};
var $TT = $tree();
console.log("🌳 라우트 트리 구조:", $T);
var $R = _$routes($TT);
console.log("🗺️ 생성된 라우트 정보:", JSON.stringify($R, null, 2));
export var routes = $R;
