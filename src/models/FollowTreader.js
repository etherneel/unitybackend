"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowTreader = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FollowTreaderSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    userId: { type: Number },
    treaderId: { type: Number },
    accountId: { type: Number },
    userAccountId: { type: Number },
    createdDate: {
        type: String,
    },
    updatedDate: {
        type: String,
    },
}, {
    versionKey: false,
    collection: 'FollowTreader'
});
const FollowTreader = mongoose_1.default.model('FollowTreader', FollowTreaderSchema);
exports.FollowTreader = FollowTreader;
