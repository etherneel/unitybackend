"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bybit_api_1 = require("bybit-api");
// const API_KEY = 'cR7vLavGCJKANxqn9X';
// const API_SECRET = 'L3ADpra4Ztjd28bgkgJqbxQYbDJodFjheBW9';
// // const API_KEY = 'yJARxMd5MoyuK0Qber';
// // const API_SECRET = 'Wf3bB0QJmYiOsJCf9K7vKmHoAfziAu2wz06z';
// const useTestnet = false;
// const client = new RestClientV5({
//   key: API_KEY,
//   secret: API_SECRET,
//   testnet: useTestnet,
//   // Optional: enable to try parsing rate limit values from responses
//   // parseAPIRateLimits: true
// },
// );
const getAccountInfoByUser = async (accModel) => {
    const client = new bybit_api_1.RestClientV5({
        key: accModel.apiKey,
        secret: accModel.secreatKey,
        testnet: true,
    });
    let data = await client.getQueryApiKey()
        .then(result => {
        console.log("getAccountInfo result: ", result);
        // res.status(200).json(result)
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
