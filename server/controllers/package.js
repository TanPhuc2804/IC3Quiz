const { AppError } = require("../error")
const packageMopdel = require("../model/package")
const expressAsyncHandler = require("express-async-handler")

const getAllPackage = expressAsyncHandler(async (req, res) => {
    const packages = await packageMopdel.find({})
    if (!packages) {
        throw new AppError("No packages found", 404);
    }
    res.json(packages)
})

module.exports = { getAllPackage }