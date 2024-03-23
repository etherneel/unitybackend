"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    otp: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    telegramId: { type: String },
    mobileNo: { type: String },
    type: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: String,
    },
    updatedDate: {
        type: String,
    },
    referalCode: {
        type: String,
    },
    parentRefId: {
        type: String,
    },
    isSubscribe: {
        type: Boolean,
    },
    amount: {
        type: String,
    },
    referral: {
        type: String,
    },
    walletAddress: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    collection: 'User'
});
const User = mongoose_1.default.model('User', UserSchema);
exports.User = User;
