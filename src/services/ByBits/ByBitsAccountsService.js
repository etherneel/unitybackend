"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bybit_api_1 = require("bybit-api");
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
        testnet: true,
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
        testnet: model.testnet,
    });
    let data = await client.getWalletBalance({
        accountType: 'UNIFIED',
        coin: 'BTC',
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
