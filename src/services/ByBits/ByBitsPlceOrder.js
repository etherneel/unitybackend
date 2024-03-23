"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { RestClientV5 } = require('bybit-api');
// const key = 'zl3MBtiQ61lktEuTR8';
// const secret = 'QHzAMWXLaJJVdFwJoU5CxSpHdqZwaqNTfsor';
const key = 'JTfZGC12u02BAj14mM';
const secret = 'M8P6CGcmlwpdfTnERMbpEBu2PsXPrMKPy3UR';
// const key = 'hBKdZShf33Q2Ye34wV';
// const secret = 'SS5b0EQ62yYmRjxQAnF3cCgkNqZ800hlllG0';
const place_Order = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        let data = await client
            .submitOrder({
            category: 'spot',
            symbol: 'BTCUSDT',
            side: 'Buy',
            orderType: 'Market',
            qty: '0.1',
            price: '01',
            timeInForce: 'PostOnly',
            orderLinkId: 'spot-test-postonly',
            isLeverage: 0,
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
const amend_Order = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        let data = await client
            .submitOrder({
            category: 'linear',
            symbol: 'ETHPERP',
            orderLinkId: 'linear-004',
            triggerPrice: '1145',
            qty: '0.15',
            price: '1050',
            takeProfit: '0',
            stopLoss: '0',
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
const batch_Amend_Order = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        let data = await client
            .batchAmendOrders('option', [
            {
                symbol: 'ETH-30DEC22-500-C',
                orderIv: '6.8',
                orderId: 'b551f227-7059-4fb5-a6a6-699c04dbd2f2',
            },
            {
                symbol: 'ETH-30DEC22-700-C',
                price: '650',
                orderId: 'fa6a595f-1a57-483f-b9d3-30e9c8235a52',
            },
        ])
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
const batch_Cancel_Order = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .batchCancelOrders('option', [
            {
                symbol: 'ETH-30DEC22-500-C',
                orderId: 'b551f227-7059-4fb5-a6a6-699c04dbd2f2',
            },
            {
                symbol: 'ETH-30DEC22-700-C',
                orderId: 'fa6a595f-1a57-483f-b9d3-30e9c8235a52',
            },
        ])
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
const batch_Submit_Order = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .batchSubmitOrders('option', [
            {
                symbol: 'ETH-30DEC22-500-C',
                orderType: 'Limit',
                side: 'Buy',
                qty: '1',
                orderIv: '6',
                timeInForce: 'GTC',
                orderLinkId: 'option-test-001',
                mmp: false,
                reduceOnly: false,
            },
            {
                symbol: 'ETH-30DEC22-700-C',
                orderType: 'Limit',
                side: 'Sell',
                qty: '2',
                price: '700',
                timeInForce: 'GTC',
                orderLinkId: 'option-test-001',
                mmp: false,
                reduceOnly: false,
            },
        ])
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
const cancel_All_Orders = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .cancelAllOrders({
            category: 'linear',
            settleCoin: 'USDT',
        })
            .then((response) => {
            console.log(response);
        })
            .catch((error) => {
            console.error(error);
        });
        return data;
    }
    catch (error) {
        return { status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const cancel_Order = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .cancelOrder({
            category: 'linear',
            symbol: 'BTCPERP',
            orderId: 'c6f055d9-7f21-4079-913d-e6523a9cfffa',
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
const get_Active_Orders = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .getActiveOrders({
            category: 'linear',
            symbol: 'ETHUSDT',
            openOnly: 0,
            limit: 1,
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
const get_Historic_Orders = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .getHistoricOrders({
            category: 'linear',
            limit: 1,
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
const get_Spot_Borrow_Check = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .getSpotBorrowCheck('BTCUSDT', 'Buy')
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
const set_Disconnect_Cancel_AllWindow = async () => {
    try {
        const client = new RestClientV5({
            testnet: true,
            key: key,
            secret: secret,
        });
        const data = client
            .setDisconnectCancelAllWindow('option', 40)
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
    place_Order, amend_Order, batch_Amend_Order, batch_Cancel_Order, batch_Submit_Order,
    cancel_All_Orders, cancel_Order, get_Active_Orders, get_Historic_Orders, get_Spot_Borrow_Check,
    set_Disconnect_Cancel_AllWindow,
};
