const  dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration")
dayjs.extend(duration);

function getTimeRemaining(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    // Nếu hết hạn
    if (end.isBefore(start)) return "Đã hết hạn";

    const diff = dayjs.duration(end.diff(start));

    const days = diff.days();
    const hours = diff.hours();
    const minutes = diff.minutes();

    return `${days} ngày ${hours} giờ ${minutes} phút`;
}

module.exports = { getTimeRemaining };