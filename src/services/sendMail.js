"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config = __importStar(require("../../app.json"));
const passMail = async (toMail, htmlTemp, subject) => {
    try {
        let transporter = nodemailer_1.default.createTransport({
            host: config.SendBox.SMTP_HOST,
            port: config.SendBox.SMTP_PORT,
            auth: {
                user: config.SendBox.IS_LIVE ? config.SendBox.SMTP_LIVE_USER : config.SendBox.SMTP_USER,
                pass: config.SendBox.IS_LIVE ? config.SendBox.SMTP_LIVE_PASSWORD : config.SendBox.SMTP_PASSWORD
            },
        });
        let message = {
            from: config.SendBox.IS_LIVE ? config.SendBox.SMTP_LIVE_USER : config.SendBox.SMTP_USER,
            to: toMail,
            subject: subject,
            text: htmlTemp
        };
        let mailResult = await transporter.sendMail(message, async (error, info) => {
            if (error) {
                // return await  error;
                throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: error };
            }
            else {
                console.log("info.messageId ", info.messageId);
                return await true;
            }
        });
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    passMail,
};
