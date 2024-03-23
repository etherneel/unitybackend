"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PlaceOrderSchema = new mongoose_1.default.Schema({
    id: { type: String },
    LtOrderId: { type: String },
    LtOrderPrice: { type: String },
    LtOrderQty: { type: String },
    LtOrderStatus: { type: String },
    orderId: { type: String },
    category: { type: String },
    symbol: { type: String },
    side: { type: String },
    orderType: { type: String },
    qty: { type: String },
    price: { type: String },
    timeInForce: { type: String },
    orderLinkId: { type: String },
    isLeverage: { type: Number },
    orderFilter: { type: String },
    orderStatus: { type: String },
    status: { type: Number },
    userConfigId: { type: Number },
    userBalance: { type: String },
    LtUserConfigId: { type: Number },
    LtUserId: { type: Number },
    UserId: { type: Number },
    createdDate: { type: String },
    updatedDate: { type: String },
}, {
    versionKey: false,
    collection: 'PlaceOrder'
});
const PlaceOrder = mongoose_1.default.model('PlaceOrder', PlaceOrderSchema);
exports.PlaceOrder = PlaceOrder;
