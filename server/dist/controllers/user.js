"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("../error"),
  AppError = _require.AppError;
var userModel = require("../model/user");
var examResult = require("../model/examResult");
var expressAsyncHandler = require("express-async-handler");
var getUserExamResults = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var userId, results;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          userId = req.user.id;
          _context.n = 1;
          return examResult.find({
            user_id: userId
          });
        case 1:
          results = _context.v;
          if (results) {
            _context.n = 2;
            break;
          }
          throw new AppError("No exam results found for this user", 404);
        case 2:
          res.json(results);
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var getExamResultDetailByUser = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var userId, resultId, result;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          userId = req.user.id;
          resultId = req.params.resultId;
          _context2.n = 1;
          return examResult.find({
            exam: resultId,
            user_id: userId
          });
        case 1:
          result = _context2.v;
          if (result) {
            _context2.n = 2;
            break;
          }
          throw new AppError("Exam result not found", 404);
        case 2:
          res.json(result);
        case 3:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var saveResultExam = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var idUser, _req$body, exam, result_detail, examResultData, examResultSaved;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          idUser = req.user.id;
          _req$body = req.body, exam = _req$body.exam, result_detail = _req$body.result_detail;
          if (!(!exam || !result_detail)) {
            _context3.n = 1;
            break;
          }
          throw new AppError("Missing required fields", 400);
        case 1:
          examResultData = new examResult(_objectSpread(_objectSpread({}, req.body), {}, {
            user_id: idUser
          }));
          _context3.n = 2;
          return examResultData.save();
        case 2:
          examResultSaved = _context3.v;
          res.status(201).json(examResultSaved);
        case 3:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var getExamResultDetail = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var resultId, result;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          resultId = req.params.resultId;
          _context4.n = 1;
          return examResult.findById(resultId);
        case 1:
          result = _context4.v;
          if (result) {
            _context4.n = 2;
            break;
          }
          throw new AppError("Exam result not found", 404);
        case 2:
          res.json(result);
        case 3:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var changeStatusUser = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, status, updateUser;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          userId = req.body.userId;
          status = "active";
          _context5.n = 1;
          return userModel.findByIdAndUpdate(userId, {
            $set: {
              status: status
            }
          }, {
            "new": true
          });
        case 1:
          updateUser = _context5.v;
          _context5.n = 2;
          return updateUser.save();
        case 2:
          res.status(201).json({
            message: "Phê duyệt thành công !"
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
var getAllUsers = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var users;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return userModel.find({}).populate("package.package_id");
        case 1:
          users = _context6.v;
          res.status(200).json({
            users: users
          });
        case 2:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
module.exports = {
  getUserExamResults: getUserExamResults,
  saveResultExam: saveResultExam,
  getExamResultDetail: getExamResultDetail,
  changeStatusUser: changeStatusUser,
  getAllUsers: getAllUsers,
  getExamResultDetailByUser: getExamResultDetailByUser
};