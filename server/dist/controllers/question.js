"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("../error"),
  AppError = _require.AppError;
var exam = require("../model/exam");
var questionModel = require("../model/question");
var expressAsyncHandler = require("express-async-handler");
var getAllQuestion = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var questions, cleanedQuestions;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return questionModel.find({}).populate("exam_id");
        case 1:
          questions = _context.v;
          if (questions) {
            _context.n = 2;
            break;
          }
          throw new AppError("No question found", 404);
        case 2:
          cleanedQuestions = questions.map(function (q) {
            var obj = q.toObject();
            Object.keys(obj).forEach(function (key) {
              if (Array.isArray(obj[key]) && obj[key].length === 0) {
                delete obj[key];
              }
            });
            return obj;
          });
          res.json(cleanedQuestions);
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var getQuestionByExam = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var examId, questions, length;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          examId = req.params.examId;
          _context2.n = 1;
          return questionModel.find({
            exam_id: examId
          }).sort({
            question: 1
          });
        case 1:
          questions = _context2.v;
          if (questions) {
            _context2.n = 2;
            break;
          }
          throw new AppError("No question found for this exam", 404);
        case 2:
          length = questions.length;
          questions.forEach(function (question, index) {
            question.question = index + 1;
          });
          res.json(questions);
        case 3:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var addQuestions = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var questions, counter, createdQuestions;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          questions = req.body.questions;
          if (!(!questions || !Array.isArray(questions) || questions.length === 0)) {
            _context3.n = 1;
            break;
          }
          throw new AppError("Questions are required and should be a non-empty array", 400);
        case 1:
          _context3.n = 2;
          return questionModel.countDocuments();
        case 2:
          counter = _context3.v;
          questions.forEach(function (question, index) {
            question.id = counter + index + 1;
          });
          _context3.n = 3;
          return questionModel.insertMany(questions);
        case 3:
          createdQuestions = _context3.v;
          res.status(201).json({
            questions: createdQuestions
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var addExam = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body, examIds, questionId, question;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _req$body = req.body, examIds = _req$body.examIds, questionId = _req$body.questionId;
          if (examIds) {
            _context4.n = 1;
            break;
          }
          throw new AppError("Exam ID is required", 400);
        case 1:
          _context4.n = 2;
          return questionModel.updateOne({
            _id: questionId
          }, {
            $addToSet: {
              exam_id: {
                $each: examIds
              }
            }
          });
        case 2:
          _context4.n = 3;
          return questionModel.findById(questionId).populate("exam_id");
        case 3:
          question = _context4.v;
          res.status(201).json({
            question: question
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var removeExam = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _req$body2, examId, questionId, question;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _req$body2 = req.body, examId = _req$body2.examId, questionId = _req$body2.questionId;
          if (examId) {
            _context5.n = 1;
            break;
          }
          throw new AppError("Exam ID is required", 400);
        case 1:
          _context5.n = 2;
          return questionModel.updateOne({
            _id: questionId
          }, {
            $pull: {
              exam_id: examId
            }
          });
        case 2:
          _context5.n = 3;
          return questionModel.findById(questionId).populate("exam_id");
        case 3:
          question = _context5.v;
          res.status(200).json({
            question: question
          });
        case 4:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
var createExamForRandomQuestions = expressAsyncHandler(/*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _req$body3, total_question, require_questions, description, content, image_url, duration, image, questions, _iterator, _step, _req, question_type, limit, randomQuestions, examCreated, examSaved, updated, _t;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _req$body3 = req.body, total_question = _req$body3.total_question, require_questions = _req$body3.require_questions, description = _req$body3.description, content = _req$body3.content, image_url = _req$body3.image_url, duration = _req$body3.duration;
          if (!(!require_questions || !Array.isArray(require_questions) || require_questions.length === 0)) {
            _context6.n = 1;
            break;
          }
          throw new AppError("Vui lòng lựa chọn yêu cầu của bạn", 400);
        case 1:
          if (!(!description || !content || !duration)) {
            _context6.n = 2;
            break;
          }
          throw new AppError("Vui lòng điền đầy đủ thông tin", 400);
        case 2:
          image = image_url || "https://res.cloudinary.com/da5mlszld/image/upload/v1756055813/IC3-removebg-preview_va4uxe.png";
          questions = [];
          _iterator = _createForOfIteratorHelper(require_questions);
          _context6.p = 3;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context6.n = 7;
            break;
          }
          _req = _step.value;
          question_type = _req.question_type, limit = _req.limit;
          console.log(question_type, limit);
          _context6.n = 5;
          return questionModel.aggregate([{
            $match: {
              question_type: question_type
            }
          }, {
            $sample: {
              size: limit
            }
          }]);
        case 5:
          randomQuestions = _context6.v;
          questions = questions.concat(randomQuestions);
        case 6:
          _context6.n = 4;
          break;
        case 7:
          _context6.n = 9;
          break;
        case 8:
          _context6.p = 8;
          _t = _context6.v;
          _iterator.e(_t);
        case 9:
          _context6.p = 9;
          _iterator.f();
          return _context6.f(9);
        case 10:
          examCreated = new exam({
            description: description,
            content: content,
            image_url: image,
            duration: duration,
            total_question: questions.length,
            category_id: 1
          });
          _context6.n = 11;
          return examCreated.save();
        case 11:
          examSaved = _context6.v;
          _context6.n = 12;
          return questionModel.updateMany({
            _id: {
              $in: questions.map(function (q) {
                return q._id;
              })
            }
          }, {
            $push: {
              exam_id: examSaved._id
            }
          });
        case 12:
          updated = _context6.v;
          if (examSaved) {
            _context6.n = 13;
            break;
          }
          throw new AppError("Cannot create exam", 500);
        case 13:
          if (!(updated.modifiedCount === 0)) {
            _context6.n = 14;
            break;
          }
          throw new AppError("Cannot update questions with exam", 500);
        case 14:
          return _context6.a(2, res.status(201).json({
            exam: examSaved,
            questions: questions
          }));
      }
    }, _callee6, null, [[3, 8, 9, 10]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
module.exports = {
  getAllQuestion: getAllQuestion,
  getQuestionByExam: getQuestionByExam,
  addQuestions: addQuestions,
  addExam: addExam,
  removeExam: removeExam,
  createExamForRandomQuestions: createExamForRandomQuestions
};