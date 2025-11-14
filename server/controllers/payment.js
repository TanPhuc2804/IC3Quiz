const { AppError } = require("../error")
const { generateOrderId } = require("../services/services")
const packageMopdel = require("../model/package")
const userModel = require("../model/user")
const expressAsyncHandler = require("express-async-handler")
const qs = require("qs")
const crypto = require("crypto")
const moment = require("moment")
const { VNPay } = require("vnpay")
const env = {}
require("dotenv").config({ processEnv: env })


const vnpay = new VNPay({
    tmnCode: env.VNP_TMN_CODE,
    secureSecret: env.VNP_HASH_SECRET,
    vnpayHost: env.VNP_URL,
    hashAlgorithm: "SHA512",
    testMode: true,
});

const getUrlPayment = expressAsyncHandler(async (req, res) => {
    const idOrder = generateOrderId();
    const { amount, package_id } = req.body;

    if (!amount || !package_id) {
        throw new AppError("Thiếu thông tin thanh toán", 400)
    }
    const ipAddr =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress?.replace("::1", "127.0.0.1") ||
        "127.0.0.1";

    const url = vnpay.buildPaymentUrl({
        vnp_Amount: amount * 100,
        vnp_IpAddr: ipAddr,
        vnp_TxnRef: idOrder,
        vnp_OrderInfo: `Thanh toan goi ${package_id}`,
        vnp_ReturnUrl: env.VNP_RETURN_URL,
        vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
        vnp_ExpireDate: moment().add(15, "minutes").format("YYYYMMDDHHmmss"),
        vnp_Locale: "vn",
        vnp_OrderType: "other",
        vnp_CurrCode: "VND",
    });
    res.status(200).json({ payment_url: url });
});
const vnpayReturn = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
        throw new AppError("Vui lòng đăng nhập !", 404)
    }
    const vnp_Params = req.query;
    const { vnp_ResponseCode, vnp_Amount, vnp_OrderInfo, vnp_PayDate } = vnp_Params;
    if (vnp_ResponseCode === "00") {
        const packageId = vnp_OrderInfo.split(" ")[3]
        const packages = await packageMopdel.findById(packageId)
        const date = moment(vnp_PayDate, "YYYYMMDDHHmmss").toDate();
        const exprie_date = moment(date).add(packages.duration, "days").toDate()
        if (!packages) {
            throw new AppError("Gói không tồn tại", 404)
        }
        const userPackge = {
            package_id: packages._id,
            register_date: date,
            expire_date: exprie_date
        }
        const updateUser = await userModel.findByIdAndUpdate(userId, {
            $set: { status: "paid", package: userPackge },
        }, { new: true })
        await updateUser.save()

        return res.json({ success: true, message: "Thanh toán thành công", data: updateUser });
    }
    return res.json({ success: true, data: vnp_Params });
})

module.exports = { getUrlPayment, vnpayReturn }