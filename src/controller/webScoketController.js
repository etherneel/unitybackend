"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BybitsPositions_1 = __importDefault(require("../services/ByBits/BybitsPositions"));
const socketCtr = async (req, res) => {
    try {
        // const placed = await ByBitsWebSocketClient.WEBSubscribe();
        const placed = await BybitsPositions_1.default.wsPosition();
        res.status(200).send({ status: 200, data: placed });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
exports.default = {
    socketCtr
};
