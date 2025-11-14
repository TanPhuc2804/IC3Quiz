"use strict";

var dayjs = require("dayjs");
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
function getTimeRemaining(startDate, endDate) {
  var start = dayjs(startDate);
  var end = dayjs(endDate);

  // Nếu hết hạn
  if (end.isBefore(start)) return "Đã hết hạn";
  var diff = dayjs.duration(end.diff(start));
  var days = diff.days();
  var hours = diff.hours();
  var minutes = diff.minutes();
  return "".concat(days, " ng\xE0y ").concat(hours, " gi\u1EDD ").concat(minutes, " ph\xFAt");
}
module.exports = {
  getTimeRemaining: getTimeRemaining
};