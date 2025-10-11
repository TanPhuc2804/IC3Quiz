const { AppError } = require("../error")
const packageMopdel = require("../model/package")
const expressAsyncHandler = require("express-async-handler")
const user = require("../model/user")
const { getTimeRemaining } = require("../services/date")

const getAllPackage = expressAsyncHandler(async (req, res) => {
    const packages = await packageMopdel.find({})
    if (!packages) {
        throw new AppError("No packages found", 404);
    }
    res.json(packages)
})


const getPackageByUser = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    const userPackage = await user.findById(userId)
    if (!userPackage.package || !userPackage.package.package_id) {
        throw new AppError("Người dùng chưa mua gói nào", 404);
    }
    const duration = getTimeRemaining(new Date(), new Date(userPackage.package.expire_date))
    res.status(200).json({ package_id: userPackage.package.package_id, duration })
})

module.exports = { getAllPackage ,getPackageByUser}