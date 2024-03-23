"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: String,
        default: Date.now,
        // expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
    updatedDate: {
        type: String,
        default: Date.now,
    },
}, {
    versionKey: false,
    collection: 'OTP'
});
const OTP = mongoose_1.default.model('OTP', otpSchema);
exports.OTP = OTP;
//   otpSchema.pre("save", async function (next) {
//     console.log("New document saved to the database");
//     if (this.isNew) {
//       await sendVerificationEmail(this.email, this.otp);
//     }
//     next();
//   });
