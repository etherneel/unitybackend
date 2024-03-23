"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendMail_1 = __importDefault(require("../services/sendMail"));
const TemplatesEmail_1 = require("../models/TemplatesEmail");
const otp_1 = require("../models/otp");
const CounterTbls_1 = require("../models/CounterTbls");
const getAllOTP_Data = async () => {
    try {
        let OtpsData = await otp_1.OTP.find({}).then((otps) => {
            return otps;
        }).catch((e) => {
            return e;
        });
        return OtpsData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const createAndUpdateOTP = async (newOTP, active = false) => {
    const OTPToInsert = new otp_1.OTP({
        id: newOTP.id,
        email: newOTP.email,
        otp: newOTP.otp,
        isActive: active,
        updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    });
    try {
        const indexForUpdate = await otp_1.OTP.findOne({ email: OTPToInsert.email });
        // let tempdata = await OTP.findOneAndUpdate({ email: OTPToInsert.email },
        //     { $set: { OTPToInsert } }, { new: true })
        //     .then(async (data: any) => {
        // if (data == null) {
        if (indexForUpdate == null) {
            let CountId = await CounterTbls_1.CounterTbls.findOneAndUpdate({ name: 'OTP' }, { "$inc": { seq: 1 } }, { new: true }).then(async (cd) => {
                console.log("Counter Val ", cd);
                let seqId = 0;
                if (cd == null || cd == undefined) {
                    const newVal = new CounterTbls_1.CounterTbls({ id: "autoval", seq: 1, name: 'OTP' });
                    newVal.save();
                    seqId = 1;
                    return seqId;
                }
                else {
                    seqId = cd.seq;
                    return seqId;
                }
            });
            if (CountId > 0) {
                OTPToInsert.id = CountId;
                OTPToInsert.createdDate = new Date().toLocaleString("en-US", { timeZone: "UTC" });
                let saveOTP = await OTPToInsert.save().then(async (listDoc) => {
                    console.log("Create OTPs  ", listDoc);
                    if (!active) {
                        await sendVerificationEmail(listDoc.email, listDoc.otp);
                    }
                    return true;
                });
                return true;
            }
        }
        else {
            const updatedUser = new otp_1.OTP(Object.assign(Object.assign({}, OTPToInsert), { _id: indexForUpdate._id, id: indexForUpdate.id, otp: newOTP.otp, createdDate: indexForUpdate.createdDate, updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
            // data.otp = OTPToInsert.otp;
            let updateUsers = await otp_1.OTP.updateOne({ email: OTPToInsert.email }, updatedUser)
                .then(async (user) => {
                if (!active) {
                    let dataTee = await sendVerificationEmail(OTPToInsert.email, OTPToInsert.otp);
                }
            });
            return OTPToInsert;
        }
        //     }
        // });
        // return tempdata;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
async function sendVerificationEmail(email, otp) {
    try {
        let text = await (0, TemplatesEmail_1.otpTemplate)(otp);
        let subject = await (0, TemplatesEmail_1.otpSubject)();
        const mailResponse = await sendMail_1.default.passMail(email, text, subject);
        console.log("Email sent successfully: ", mailResponse);
    }
    catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}
exports.default = {
    getAllOTP_Data,
    createAndUpdateOTP,
};
