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
Object.defineProperty(exports, "__esModule", { value: true });
const bybit_api_1 = require("bybit-api");
const config = __importStar(require("../../../app.json"));
const get_Historic_Orders = async (orderModel, acModel) => {
    try {
        const client = new bybit_api_1.RestClientV5({
            testnet: config.ByBit.IS_TESTNET,
            key: acModel.LTkey,
            secret: acModel.LTsecret,
        });
        const data = client
            .getHistoricOrders({
            category: orderModel.category,
            limit: 20 //orderModel.limit,
        })
            .then((response) => {
            console.log(response);
            return response;
        })
            .catch((error) => {
            console.error(error);
            return error;
        });
        return data;
    }
    catch (error) {
        return { status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const placeOrder = async (clientModel, acModel) => {
    try {
        const client = new bybit_api_1.RestClientV5({
            testnet: config.ByBit.IS_TESTNET,
            key: acModel.key,
            secret: acModel.secret,
        });
        let data_Temp = {
            category: clientModel.category,
            symbol: clientModel.symbol,
            side: clientModel.side,
            orderType: clientModel.orderType,
            qty: clientModel.qty,
            price: clientModel.price,
            timeInForce: clientModel.timeInForce,
            orderLinkId: clientModel.orderLinkId,
            isLeverage: clientModel.isLeverage == '' ? 0 : clientModel.isLeverage,
            orderFilter: clientModel.orderFilter,
        };
        console.log('client Order place ', data_Temp);
        let data = await client.submitOrder(data_Temp)
            .then((response) => {
            console.log(response);
            return response;
        })
            .catch((error) => {
            console.error(error);
            throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error };
            return error;
        });
        return data;
    }
    catch (error) {
        return { status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const cancelOrder = async (clientModel, acModel) => {
    try {
        const client = new bybit_api_1.RestClientV5({
            testnet: config.ByBit.IS_TESTNET,
            key: acModel.key,
            secret: acModel.secret,
        });
        client
            .cancelOrder({
            category: clientModel.category,
            symbol: clientModel.symbol,
            orderId: clientModel.orderId,
        })
            .then((response) => {
            console.log(response);
        })
            .catch((error) => {
            console.error(error);
        });
    }
    catch (error) {
    }
};
exports.default = {
    get_Historic_Orders, placeOrder, cancelOrder
};
