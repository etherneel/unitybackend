"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    userId: { type: Number },
    acId: { type: String },
    note: { type: String },
    apiKey: { type: String },
    permissions: { type: String },
    type: { type: Number },
    deadlineDay: { type: Number },
    expiredAt: { type: String },
    createdAt: { type: String },
    uta: { type: Number },
    acUserID: { type: String },
    isMaster: { type: Boolean },
    parentUid: { type: Number },
    kycLevel: { type: String },
    kycRegion: { type: String },
    status: { type: Boolean, default: false },
    createdDate: { type: String },
    updatedDate: { type: String },
    secretKey: { type: String },
    isActive: { type: Boolean, default: false }
}, {
    versionKey: false,
    collection: 'Account'
});
const Account = mongoose_1.default.model('Account', AccountSchema);
exports.Account = Account;
