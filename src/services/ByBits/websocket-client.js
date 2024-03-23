"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { WebsocketClient } = require('bybit-api');
const WEBSubscribe = () => {
    const API_KEY = 'xxx';
    const PRIVATE_KEY = 'yyy';
    const wsConfig = {
        key: API_KEY,
        secret: PRIVATE_KEY,
        testnet: true,
        market: 'v5',
        // how long to wait (in ms) before deciding the connection should be terminated & reconnected
        // pongTimeout: 1000,
        // how often to check (in ms) that WS connection is still alive
        // pingInterval: 10000,
        // how long to wait before attempting to reconnect (in ms) after connection is closed
        // reconnectTimeout: 500,
        // recv window size for authenticated websocket requests (higher latency connections (VPN) can cause authentication to fail if the recv window is too small)
        // recvWindow: 5000,
        // config options sent to RestClient (used for time sync). See RestClient docs.
        // restOptions: { },
        // config for axios used for HTTP requests. E.g for proxy support
        // requestOptions: { }
        // override which URL to use for websocket connections
        // wsUrl: 'wss://stream.bytick.com/realtime'
    };
    const ws = new WebsocketClient(wsConfig);
    // (before v5) subscribe to multiple topics at once
    ws.subscribe(['position', 'execution', 'trade']);
    // (before v5) and/or subscribe to individual topics on demand
    ws.subscribe('kline.BTCUSD.1m');
    // (v5) subscribe to multiple topics at once
    ws.subscribeV5(['orderbook.50.BTCUSDT', 'orderbook.50.ETHUSDT'], 'linear');
    // (v5) and/or subscribe to individual topics on demand
    ws.subscribeV5('position', 'linear');
    ws.subscribeV5('publicTrade.BTC', 'option');
    // Listen to events coming from websockets. This is the primary data source
    ws.on('update', (data) => {
        console.log('update', data);
        return data;
    });
    // Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
    ws.on('open', ({ wsKey, event }) => {
        console.log('connection open for websocket with ID: ' + wsKey);
        return wsKey;
    });
    // Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
    ws.on('response', (response) => {
        console.log('response', response);
        return response;
    });
    // Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
    ws.on('close', () => {
        console.log('connection closed');
    });
    // Optional: Listen to raw error events. Recommended.
    ws.on('error', (err) => {
        console.error('error', err);
        return err;
    });
};
exports.default = {
    WEBSubscribe,
};
