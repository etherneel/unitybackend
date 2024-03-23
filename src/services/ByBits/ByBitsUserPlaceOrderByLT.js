"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bybit_api_1 = require("bybit-api");
const get_Historic_Orders = async (clientModel, acModel) => {
    try {
        const client = new bybit_api_1.RestClientV5({
            testnet: acModel.testnet,
            key: acModel.key,
            secret: acModel.secret,
        });
        const data = client
            .getHistoricOrders({
            category: clientModel.category,
            limit: clientModel.limit,
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
            testnet: acModel.testnet,
            key: acModel.key,
            secret: acModel.secret,
        });
        let data = await client
            .submitOrder({
            category: clientModel.category,
            symbol: clientModel.symbol,
            side: clientModel.side,
            orderType: clientModel.orderType,
            qty: clientModel.qty,
            price: clientModel.price,
            timeInForce: clientModel.timeInForce,
            orderLinkId: clientModel.orderLinkId,
            isLeverage: clientModel.isLeverage,
            orderFilter: 'Order',
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
exports.default = {
    get_Historic_Orders, placeOrder
};
