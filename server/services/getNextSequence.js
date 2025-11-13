const Counter = require('../model/counter');

async function getNextSequence(name, { preview = false } = {}) {
    console.log(`getNextSequence called for ${name} with preview=${preview}`);
    if (preview) {
        const counter = await Counter.findById(name);
        return counter ? counter.seq + 1 : 1; // xem trước giá trị tiếp theo
    }

    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    console.log(counter)
    return counter.seq;
}
module.exports = getNextSequence;
