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
// const key = 'zl3MBtiQ61lktEuTR8';
// const secret = 'QHzAMWXLaJJVdFwJoU5CxSpHdqZwaqNTfsor';
// const key = 'HW3DnzSoGcgHe9K1Y3';
// const secret = 'AsajHPtlpvWEtLyFdZiZDKvSfg0XaellKhgP';
const key = 'JTfZGC12u02BAj14mM';
const secret = 'M8P6CGcmlwpdfTnERMbpEBu2PsXPrMKPy3UR';
// const key = 'zl3MBtiQ61lktEuTR8';
// const secret = 'QHzAMWXLaJJVdFwJoU5CxSpHdqZwaqNTfsor';
// const key = 'hBKdZShf33Q2Ye34wV';
// const secret = 'SS5b0EQ62yYmRjxQAnF3cCgkNqZ800hlllG0';
const get_Account_Info_By_User = async () => {
    const client = new bybit_api_1.RestClientV5({
        key: key,
        secret: secret,
        testnet: config.ByBit.IS_TESTNET
    });
    let data = await client.getAccountInfo()
        .then(result => {
        console.log("getAccountInfo result: ", result);
        return result;
    })
        .catch(err => {
        console.error("getAccountInfo error: ", err);
        throw {
            status: 400,
            message: err,
        };
        return err;
    });
    return data;
};
const get_Wallet_Balance = async (model) => {
    const client = new bybit_api_1.RestClientV5({
        key: model.key,
        secret: model.secret,
        testnet: config.ByBit.IS_TESTNET,
    });
    let data = await client.getWalletBalance({
        accountType: 'UNIFIED',
        coin: 'USDT',
    })
        .then(result => {
        console.log("getAccountInfo result: ", result);
        return result;
    })
        .catch(err => {
        console.error("getAccountInfo error: ", err);
        throw {
            status: 400,
            message: err,
        };
        return err;
    });
    return data;
};
exports.default = {
    get_Account_Info_By_User, get_Wallet_Balance
};
