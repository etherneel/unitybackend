"use strict";
/* eslint-disable @typescript-eslint/no-empty-function */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bybit_api_1 = require("bybit-api");
const OrderPlaceByWS_LeaderController_1 = __importDefault(require("../../controller/TestByBitsAc/OrderPlaceByWS_LeaderController"));
// or
// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from 'bybit-api';
const config = __importStar(require("../../../app.json"));
// Create & inject a custom logger to disable the silly logging level (empty function)
const logger = Object.assign(Object.assign({}, bybit_api_1.DefaultLogger), { silly: () => { } });
// const key = 'HW3DnzSoGcgHe9K1Y3';
// const secret = 'AsajHPtlpvWEtLyFdZiZDKvSfg0XaellKhgP';
/**
 * Prepare an instance of the WebSocket client. This client handles all aspects of connectivity for you:
 * - Connections are opened when you subscribe to topics
 * - If key & secret are provided, authentication is handled automatically
 * - If you subscribe to topics from different v5 products (e.g. spot and linear perps),
 *    subscription events are automatically routed to the different ws endpoints on bybit's side
 * - Heartbeats/ping/pong/reconnects are all handled automatically.
 *    If a connection drops, the client will clean it up, respawn a fresh connection and resubscribe for you.
 */
const WEBSubscribe = (key, secret) => {
    const wsClient = new bybit_api_1.WebsocketClient({
        key: key,
        secret: secret,
        market: 'v5',
        testnet: config.ByBit.IS_TESTNET,
    }, logger);
    let resData = {};
    wsClient.on('update', (data) => {
        // assert(CurrentOrder.length == 0);
        console.log('raw message received ', JSON.stringify(data));
        resData = JSON.stringify(data);
        // CurrentOrder.push(resData);
        let LtData = { key: key, secret: secret, testnet: config.ByBit.IS_TESTNET };
        OrderPlaceByWS_LeaderController_1.default.CreateWsLeadTrack(LtData, resData);
        return resData;
        // console.log('raw message received ', JSON.stringify(data, null, 2));
    });
    wsClient.on('open', (data) => {
        console.log('connection opened open:', data.wsKey);
    });
    wsClient.on('response', (data) => {
        console.log('log response: ', JSON.stringify(data, null, 2));
    });
    wsClient.on('reconnect', ({ wsKey }) => {
        console.log('ws automatically reconnecting.... ', wsKey);
    });
    wsClient.on('reconnected', (data) => {
        console.log('ws has reconnected ', data === null || data === void 0 ? void 0 : data.wsKey);
    });
    // wsClient.on('error', (data) => {
    //   console.error('ws exception: ', data);
    // });
    /**
     * For private V5 topics, us the subscribeV5() method on the ws client or use the original subscribe() method.
     *
     * Note: for private endpoints the "category" field is ignored since there is only one private endpoint
     * (compared to one public one per category).
     * The "category" is only needed for public topics since bybit has one endpoint for public events per category.
     */
    // wsClient.subscribeV5('position', 'linear');
    // wsClient.subscribeV5('execution', 'linear');
    // wsClient.subscribeV5(['order', 'wallet', 'greeks'], 'linear');
    wsClient.subscribeV5(['order'], 'linear');
    /**
     * The following has the same effect as above, since there's only one private endpoint for V5 account topics:
     */
    // wsClient.subscribe('position');
    // wsClient.subscribe('execution');
    // wsClient.subscribe(['order', 'wallet', 'greek']);
    // To unsubscribe from topics (after a 5 second delay, in this example):
    // setTimeout(() => {
    //   console.log('unsubscribing');
    //   wsClient.unsubscribeV5('execution', 'linear');
    // }, 5 * 1000);
    // Topics are tracked per websocket type
    // Get a list of subscribed topics (e.g. for public v3 spot topics) (after a 5 second delay)
    setTimeout(() => {
        const activePrivateTopics = wsClient
            .getWsStore()
            .getTopics(bybit_api_1.WS_KEY_MAP.v5Private);
        console.log('Active private v5 topics: ', activePrivateTopics);
        const activePublicLinearTopics = wsClient
            .getWsStore()
            .getTopics(bybit_api_1.WS_KEY_MAP.v5LinearPublic);
        console.log('Active public linear v5 topics: ', activePublicLinearTopics);
        const activePublicSpotTopis = wsClient
            .getWsStore()
            .getTopics(bybit_api_1.WS_KEY_MAP.v5SpotPublic);
        console.log('Active public spot v5 topics: ', activePublicSpotTopis);
        const activePublicOptionsTopics = wsClient
            .getWsStore()
            .getTopics(bybit_api_1.WS_KEY_MAP.v5OptionPublic);
        console.log('Active public option v5 topics: ', activePublicOptionsTopics);
    }, 5 * 100);
};
exports.default = {
    WEBSubscribe
};
