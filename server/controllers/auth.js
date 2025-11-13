const brcypt = require('bcrypt');
const userModel = require('../model/user');
const asyncHandler = require('express-async-handler');
const { AppError } = require('../error');
const { generateToken } = require('../services/jwt');

const register = asyncHandler(async (req, res, next) => {
    const { username, password, email } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        throw new AppError('Username đã tồn tại', 400);
    }
    const emailUser = await userModel.findOne({ email });
    if (emailUser) {
        throw new AppError('Email đã tồn tại', 400);
    }
    const hashedPassword = await brcypt.hash(password, 12);
    const user = new userModel({ username, password: hashedPassword, email, role: "user" });
    await user.save();
    res.status(201).json({ status: true });
});

const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user || !(await brcypt.compare(password, user.password))) {
        return next(new AppError('Username hoặc mật khẩu không đúng !', 401));
    }
    const token = generateToken({ id: user._id, fullname: user.fullname, role: user.role, email: user.email});
   // res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000, sameSite: true }).status(200).json({ status: true, token, role: user.role });
   
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: true }).status(200).json({ status: true, token, role: user.role });
});

module.exports = { register, login };