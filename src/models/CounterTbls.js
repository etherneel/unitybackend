"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterTbls = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CounterTblsSchema = new mongoose_1.default.Schema({
    id: { type: String },
    name: { type: String },
    seq: { type: Number }
}, {
    versionKey: false,
    collection: 'CounterTbls'
});
const CounterTbls = mongoose_1.default.model('CounterTbls', CounterTblsSchema);
exports.CounterTbls = CounterTbls;
