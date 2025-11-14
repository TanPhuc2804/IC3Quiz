"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var env = {};
require("dotenv").config({
  processEnv: env
});
var jwt = require('jsonwebtoken');
var result = require("../model/examResult.js");
var userModel = require("../model/user.js");
var asyncHandler = require('express-async-handler');
var _require = require('../error.js'),
  AppError = _require.AppError;
var moment = require("moment");
var verifyLogin = asyncHandler(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var token;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          token = req.cookies.token;
          if (token) {
            _context.n = 1;
            break;
          }
          throw new AppError('Vui lòng đăng nhập', 401);
        case 1:
          jwt.verify(token, env.KEY_LOGIN, function (err, user) {
            if (err) {
              throw new AppError('Tài khoản người dùng đã hết hạn !', 403);
            }
            req.user = user;
            next();
          });
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var verifyPackage = asyncHandler(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var user, userData, countResult, checkExpire;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          user = req.user;
          _context2.n = 1;
          return userModel.findById(user.id);
        case 1:
          userData = _context2.v;
          if (userData) {
            _context2.n = 2;
            break;
          }
          throw new AppError('Vui lòng đăng nhập !', 404);
        case 2:
          if (!(user.role === "admin")) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, next());
        case 3:
          if (!(userData.status === "none")) {
            _context2.n = 6;
            break;
          }
          _context2.n = 4;
          return result.countDocuments({
            user_id: user.id
          });
        case 4:
          countResult = _context2.v;
          if (!(countResult >= 1)) {
            _context2.n = 5;
            break;
          }
          throw new AppError('Bạn đã sử dụng hết lượt thi miễn phí, vui lòng đăng ký gói để tiếp tục sử dụng dịch vụ !', 403);
        case 5:
          return _context2.a(2, next());
        case 6:
          if (!(userData.status === "paid")) {
            _context2.n = 7;
            break;
          }
          throw new AppError('Vui lòng đợi admin phê duyệt gói của bạn ! Bạn có thể liên hệ tới zalo: 0564068652', 403);
        case 7:
          if (!(userData.status !== "active")) {
            _context2.n = 8;
            break;
          }
          throw new AppError('Vui lòng đăng ký gói để sử dụng dịch vụ !', 403);
        case 8:
          checkExpire = moment().isAfter(moment(userData["package"].expire_date));
          if (!checkExpire) {
            _context2.n = 10;
            break;
          }
          _context2.n = 9;
          return userModel.findByIdAndUpdate(user.id, {
            status: "expired",
            "package.package_id": null,
            "package.register_date": null,
            "package.expire_date": null
          }, {
            "new": true
          });
        case 9:
          throw new AppError('Gói của bạn đã hết hạn, vui lòng đăng ký gói để tiếp tục sử dụng dịch vụ !', 403);
        case 10:
          next();
        case 11:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
var verifyAdmin = asyncHandler(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var token;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          token = req.cookies.token;
          if (token) {
            _context3.n = 1;
            break;
          }
          throw new AppError('Vui lòng đăng nhập', 401);
        case 1:
          jwt.verify(token, env.KEY_LOGIN, function (err, user) {
            if (err) {
              throw new AppError('Tài khoản người dùng đã hết hạn !', 403);
            }
            if (user.role !== 'admin') {
              throw new AppError('Bạn không có quyền truy cập !', 403);
            }
            req.user = user;
            next();
          });
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = {
  verifyLogin: verifyLogin,
  verifyPackage: verifyPackage,
  verifyAdmin: verifyAdmin
};