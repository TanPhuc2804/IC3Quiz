const Counter = require('../model/counter');

async function getNextSequence(name, { preview = false } = {}) {
    if (preview) {
        const counter = await Counter.findById(name);
        return counter ? counter.seq + 1 : 1; // xem trước giá trị tiếp theo
    }

    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}
module.exports = getNextSequence;
