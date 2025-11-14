"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var brcypt = require('bcrypt');
var userModel = require('../model/user');
var asyncHandler = require('express-async-handler');
var _require = require('../error'),
  AppError = _require.AppError;
var _require2 = require('../services/jwt'),
  generateToken = _require2.generateToken;
var register = asyncHandler(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var _req$body, username, password, email, existingUser, emailUser, hashedPassword, user;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email;
          _context.n = 1;
          return userModel.findOne({
            username: username
          });
        case 1:
          existingUser = _context.v;
          if (!existingUser) {
            _context.n = 2;
            break;
          }
          throw new AppError('Username đã tồn tại', 400);
        case 2:
          _context.n = 3;
          return userModel.findOne({
            email: email
          });
        case 3:
          emailUser = _context.v;
          if (!emailUser) {
            _context.n = 4;
            break;
          }
          throw new AppError('Email đã tồn tại', 400);
        case 4:
          _context.n = 5;
          return brcypt.hash(password, 12);
        case 5:
          hashedPassword = _context.v;
          user = new userModel({
            username: username,
            password: hashedPassword,
            email: email,
            role: "user"
          });
          _context.n = 6;
          return user.save();
        case 6:
          res.status(201).json({
            status: true
          });
        case 7:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var login = asyncHandler(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var _req$body2, username, password, user, token, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context2.n = 1;
          return userModel.findOne({
            username: username
          });
        case 1:
          user = _context2.v;
          _t = !user;
          if (_t) {
            _context2.n = 3;
            break;
          }
          _context2.n = 2;
          return brcypt.compare(password, user.password);
        case 2:
          _t = !_context2.v;
        case 3:
          if (!_t) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, next(new AppError('Username hoặc mật khẩu không đúng !', 401)));
        case 4:
          token = generateToken({
            id: user._id,
            fullname: user.fullname,
            role: user.role,
            email: user.email
          }); // res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000, sameSite: true }).status(200).json({ status: true, token, role: user.role });
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
          }).status(200).json({
            status: true,
            token: token,
            role: user.role
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = {
  register: register,
  login: login
};