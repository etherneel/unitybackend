"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LtPlaceOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LtPlaceOrderSchema = new mongoose_1.default.Schema({
    id: { type: String },
    orderId: { type: String },
    orderPrice: { type: String },
    qty: { type: String },
    orderStatus: { type: String },
    status: { type: String },
    detail: { type: String },
    closeDetail: { type: String },
    userId: { type: Number },
    avBalance: { type: String },
    mainBalance: { type: String },
    createdDate: { type: String },
    updatedDate: { type: String },
}, {
    versionKey: false,
    collection: 'LtPlaceOrder'
});
const LtPlaceOrder = mongoose_1.default.model('LtPlaceOrder', LtPlaceOrderSchema);
exports.LtPlaceOrder = LtPlaceOrder;
