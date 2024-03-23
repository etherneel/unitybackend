"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
// import nodemailer from 'nodemailer';
// var smtpTransport = require('nodemailer-smtp-transport');
// var handlebars = require('handlebars');
// var fs = require('fs');
const otp_generator_1 = __importDefault(require("otp-generator"));
const TemplatesEmail_1 = require("../models/TemplatesEmail");
const sendMail_1 = __importDefault(require("../services/sendMail"));
const OtpService_1 = __importDefault(require("../services/OtpService"));
const getAllUsers = async (req, res) => {
    try {
        let allUsers = [];
        allUsers = await UserService_1.default.getAllUsers_Data();
        let _usersLst = [];
        _usersLst = allUsers.filter((x) => x.isDelete == 0);
        res.send({ status: "200", data: _usersLst });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getRolesUsers = async (req, res) => {
    try {
        let allUsers = [];
        const userType = req.params.type;
        allUsers = await UserService_1.default.getAllUsers_Data();
        let _usersLst = [];
        _usersLst = allUsers.filter((x) => x.type == userType && x.isDelete == 0);
        res.send({ status: 200, data: _usersLst });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getOneUser = async (req, res) => {
    const UserId = parseInt(req.params.id);
    if (!UserId) {
        res.status(400).send({
            status: 400,
            error: "Parameter ':UserId' can not be empty"
        });
    }
    try {
        const User = await UserService_1.default.getOneUser(UserId);
        res.send({ status: 200, data: User });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const createNewUser = async (req, res) => {
    //const { body } = req;
    let User = {};
    Object.assign(User, req.body);
    if (!User.firstName || !User.lastName || !User.email || !User.type || !User.otp || !User.isActive) {
        res.status(400).send({ status: 400, error: "One of the following keys is missing or is empty in request body" });
        return;
    }
    try {
        const createdUser = await UserService_1.default.createNewUser(User);
        res.status(200).send({ status: 200, data: createdUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const updateOneUser = async (req, res) => {
    const UserId = parseInt(req.params.id);
    if (!UserId) {
        res.status(400).send({ status: 400, error: "Parameter ':UserId' can not be empty" });
    }
    try {
        let User = {};
        Object.assign(User, req.body);
        const updatedUser = await UserService_1.default.updateOneUser(UserId, User);
        res.send({ status: 200, data: updatedUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const deleteOneUser = async (req, res) => {
    const UserId = parseInt(req.params.id);
    if (!UserId) {
        res.status(400).send({ status: 400, error: "Parameter ':UserId' can not be empty" });
    }
    try {
        let Userdele = await UserService_1.default.deleteOneUser(UserId);
        res.status(200).send({ status: Userdele ? 200 : 500, data: Userdele ? "Deleted Successfully..!!" : "Not Deleted" });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const loginUser = async (req, res) => {
    try {
        let User = {};
        Object.assign(User, req.body);
        if (!User.email || !User.otp) {
            res.status(400).send({ status: 400, error: "One of the following keys are missing or is empty" });
            return;
        }
        let loginModel = {};
        loginModel.email = User.email;
        loginModel.otp = User.otp;
        let chkvalid = await checkOtpValid(loginModel);
        if (chkvalid != 0) {
            switch (chkvalid) {
                case 1:
                    res.status(400).send({ status: 400, error: "OTP Expired" });
                    return;
                    break;
                case 2:
                    res.status(400).send({ status: 400, error: "Invalid OTP" });
                    return;
                    break;
            }
            return;
        }
        let Userdele = await UserService_1.default.isMailUser(User.email.toString());
        res.status(200).send({
            status: Userdele != null ? 200 : 500,
            data: Userdele,
            message: Userdele ? "Login Successfully..!!" : "User does not exsist"
        });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const sendMailRefrealLink = async (req, res) => {
    try {
        let model = {};
        Object.assign(model, req.body);
        let text = await (0, TemplatesEmail_1.refrealLink)(model.link);
        let subject = await (0, TemplatesEmail_1.refrealLinkSubject)();
        let mailsend = await sendMail_1.default.passMail(model.toMail, text, subject);
        if (mailsend == true) {
            res.send({ status: 200, data: "Refral Mail Send Successfully..." });
        }
        else {
            res.status((mailsend === null || mailsend === void 0 ? void 0 : mailsend.status) || 500)
                .send({ status: (mailsend === null || mailsend === void 0 ? void 0 : mailsend.status) || 500, error: (mailsend === null || mailsend === void 0 ? void 0 : mailsend.message) || mailsend });
        }
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const sendOTP = async (req, res) => {
    try {
        const email = req.body.email;
        const islogin = req.body.isLogin;
        let Userdele = await UserService_1.default.isMailUser(email);
        if (islogin == 0) {
            if (Userdele != null) {
                res.status(500).json({ status: false, error: 'This email is already registered', data: {} });
                return;
            }
        }
        else {
            if (Userdele == null) {
                res.status(500).json({ status: false, error: 'Invalid mail', data: {} });
                return;
            }
        }
        let otp = otp_generator_1.default.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        let getOTPs_Data = [];
        getOTPs_Data = await OtpService_1.default.getAllOTP_Data();
        let result = getOTPs_Data.filter((x) => x.otp == otp);
        // while (result) {
        //   otp = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        //   result = getOTPs_Data.filter((x: any) => x.otp == otp);
        // }
        let model = {};
        model.email = email;
        model.otp = otp;
        const otpBody = await OtpService_1.default.createAndUpdateOTP(model, false);
        res.status(200).json({ status: 200, data: 'OTP sent' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, error: error.message });
    }
};
const checkOtpValid = async (signUpModel) => {
    try {
        let getOTPs_Data = [];
        getOTPs_Data = await OtpService_1.default.getAllOTP_Data();
        let result = getOTPs_Data.filter((x) => x.otp == signUpModel.otp && x.email == signUpModel.email);
        if (result == null || result == undefined || result.length == 0) {
            return 2;
        }
        var date = new Date();
        let created_day = new Date(result.createdDate);
        let minus_day = date.setDate(date.getDate());
        // if (created_day > minus_day) { 
        //   console.log('date has expired')
        //   return 1;
        // } else {
        console.log('date has not expired');
        return 0;
        // }
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
const createUser = async (req, res) => {
    //const { body } = req;
    let User = {};
    Object.assign(User, req.body);
    if (!User.firstName || !User.lastName || !User.email || !User.type || !User.otp || !User.isActive) {
        res.status(400).send({ status: 400, error: "One of the following keys is missing or is empty in request body" });
        return;
    }
    let loginModel = {};
    loginModel.email = User.email;
    loginModel.otp = User.otp;
    let chkvalid = await checkOtpValid(loginModel);
    if (chkvalid != 0) {
        switch (chkvalid) {
            case 1:
                res.status(400).send({ status: 400, error: "Your OTP has Expired" });
                return;
                break;
            case 2:
                res.status(400).send({ status: 400, error: "Invalid OTP " });
                return;
                break;
        }
        return;
    }
    try {
        let userModel = {};
        Object.assign(userModel, req.body);
        const createdUser = await UserService_1.default.createNewUser(userModel);
        res.status(200).send({ status: 200, data: createdUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const subscribeUser = async (req, res) => {
    try {
        let userModel = {};
        Object.assign(userModel, req.body);
        const createdUser = await UserService_1.default.subscribeUser(userModel);
        res.status(200).send({ status: 200, data: createdUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const parentWalletAddress = async (req, res) => {
    try {
        let userrefId = (req.params.id);
        const createdUser = await UserService_1.default.getUserWallet(userrefId);
        res.status(200).send({ status: 200, data: createdUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
exports.default = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
    getRolesUsers,
    //getRecordsForUser,
    sendMailRefrealLink,
    loginUser, sendOTP,
    createUser,
    subscribeUser, parentWalletAddress
};
