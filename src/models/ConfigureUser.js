"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const configureSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    userId: { type: Number },
    keyName: {
        type: String,
        required: false,
        trim: true
    },
    apiKey: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    secretKey: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    ipRestriction: {
        type: Boolean,
        default: false
    },
    permissions: {
        type: String,
        required: false,
        trim: true,
    },
    acDetail: {
        type: Object,
        required: false,
        minlength: 1,
        trim: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: String,
    },
    updatedDate: {
        type: String,
    }
}, {
    versionKey: false,
    collection: 'ConfigureUser'
});
const ConfigureUser = mongoose_1.default.model('ConfigureUser', configureSchema);
exports.ConfigureUser = ConfigureUser;
