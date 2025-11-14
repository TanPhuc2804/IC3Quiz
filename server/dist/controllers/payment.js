"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("../error"),
  AppError = _require.AppError;
var _require2 = require("../services/services"),
  generateOrderId = _require2.generateOrderId;
var packageMopdel = require("../model/package");
var userModel = require("../model/user");
var expressAsyncHandler = require("express-async-handler");
var qs = require("qs");
var crypto = require("crypto");
var moment = require("moment");
var _require3 = require("vnpay"),
  VNPay = _require3.VNPay;
var env = {};
require("dotenv").config({
  processEnv: env
});
var vnpay = new VNPay({
  tmnCode: env.VNP_TMN_CODE,
  secureSecret: env.VNP_HASH_SECRET,
  vnpayHost: env.VNP_URL,
  hashAlgorithm: "SHA512",
  testMode: true
});
var getUrlPayment = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$headers$xForwar, _req$socket$remoteAdd;
    var idOrder, _req$body, amount, package_id, ipAddr, url;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          idOrder = generateOrderId();
          _req$body = req.body, amount = _req$body.amount, package_id = _req$body.package_id;
          if (!(!amount || !package_id)) {
            _context.n = 1;
            break;
          }
          throw new AppError("Thiếu thông tin thanh toán", 400);
        case 1:
          ipAddr = ((_req$headers$xForwar = req.headers["x-forwarded-for"]) === null || _req$headers$xForwar === void 0 ? void 0 : _req$headers$xForwar.split(",")[0]) || ((_req$socket$remoteAdd = req.socket.remoteAddress) === null || _req$socket$remoteAdd === void 0 ? void 0 : _req$socket$remoteAdd.replace("::1", "127.0.0.1")) || "127.0.0.1";
          url = vnpay.buildPaymentUrl({
            vnp_Amount: amount * 100,
            vnp_IpAddr: ipAddr,
            vnp_TxnRef: idOrder,
            vnp_OrderInfo: "Thanh toan goi ".concat(package_id),
            vnp_ReturnUrl: env.VNP_RETURN_URL,
            vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
            vnp_ExpireDate: moment().add(15, "minutes").format("YYYYMMDDHHmmss"),
            vnp_Locale: "vn",
            vnp_OrderType: "other",
            vnp_CurrCode: "VND"
          });
          res.status(200).json({
            payment_url: url
          });
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var vnpayReturn = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var userId, user, vnp_Params, vnp_ResponseCode, vnp_Amount, vnp_OrderInfo, vnp_PayDate, packageId, packages, date, exprie_date, userPackge, updateUser;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          userId = req.user.id;
          _context2.n = 1;
          return userModel.findById(userId);
        case 1:
          user = _context2.v;
          if (user) {
            _context2.n = 2;
            break;
          }
          throw new AppError("Vui lòng đăng nhập !", 404);
        case 2:
          vnp_Params = req.query;
          vnp_ResponseCode = vnp_Params.vnp_ResponseCode, vnp_Amount = vnp_Params.vnp_Amount, vnp_OrderInfo = vnp_Params.vnp_OrderInfo, vnp_PayDate = vnp_Params.vnp_PayDate;
          if (!(vnp_ResponseCode === "00")) {
            _context2.n = 7;
            break;
          }
          packageId = vnp_OrderInfo.split(" ")[3];
          _context2.n = 3;
          return packageMopdel.findById(packageId);
        case 3:
          packages = _context2.v;
          date = moment(vnp_PayDate, "YYYYMMDDHHmmss").toDate();
          exprie_date = moment(date).add(packages.duration, "days").toDate();
          if (packages) {
            _context2.n = 4;
            break;
          }
          throw new AppError("Gói không tồn tại", 404);
        case 4:
          userPackge = {
            package_id: packages._id,
            register_date: date,
            expire_date: exprie_date
          };
          _context2.n = 5;
          return userModel.findByIdAndUpdate(userId, {
            $set: {
              status: "paid",
              "package": userPackge
            }
          }, {
            "new": true
          });
        case 5:
          updateUser = _context2.v;
          _context2.n = 6;
          return updateUser.save();
        case 6:
          return _context2.a(2, res.json({
            success: true,
            message: "Thanh toán thành công",
            data: updateUser
          }));
        case 7:
          return _context2.a(2, res.json({
            success: true,
            data: vnp_Params
          }));
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = {
  getUrlPayment: getUrlPayment,
  vnpayReturn: vnpayReturn
};