"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bybit_api_1 = require("bybit-api");
const getAccountInfoByUser = async (accModel) => {
    const client = new bybit_api_1.RestClientV5({
        key: accModel.apiKey,
        secret: accModel.secreatKey,
        testnet: true,
    });
    let data = await client.getQueryApiKey()
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
    getAccountInfoByUser
};
