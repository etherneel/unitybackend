"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ByBitsPlceOrder_1 = __importDefault(require("../../services/ByBits/ByBitsPlceOrder"));
const ByBitsAccountsService_1 = __importDefault(require("../../services/ByBits/ByBitsAccountsService"));
const placeOrderCtr = async (req, res) => {
    try {
        const placed = await ByBitsPlceOrder_1.default.place_Order();
        res.status(200).send({ status: 200, data: placed });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getOrderCtr = async (req, res) => {
    try {
        const placed = await ByBitsPlceOrder_1.default.get_Historic_Orders();
        res.status(200).send({ status: 200, data: placed });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getActiveOrders = async (req, res) => {
    try {
        const placed = await ByBitsPlceOrder_1.default.get_Active_Orders();
        res.status(200).send({ status: 200, data: placed });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getSpotBorrowCheck = async (req, res) => {
    try {
        const placed = await ByBitsPlceOrder_1.default.get_Spot_Borrow_Check();
        res.status(200).send({ status: 200, data: placed });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getAccountInfo = async (req, res) => {
    try {
        const placed = await ByBitsAccountsService_1.default.get_Account_Info_By_User();
        res.status(200).send({ status: 200, data: placed });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getWalletBalance = async (req, res) => {
    try {
        const placed = await ByBitsAccountsService_1.default.get_Wallet_Balance(req.body);
        res.status(200).send({ status: 200, data: placed });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
exports.default = {
    placeOrderCtr, getOrderCtr, getActiveOrders, getSpotBorrowCheck, getAccountInfo, getWalletBalance
};
