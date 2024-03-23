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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const crypto = __importStar(require("crypto"));
const endpoint = "wss://stream-testnet.bybit.com/v5/private";
console.log('attempting to connect to WebSocket %j', endpoint);
const client = new ws_1.default(endpoint);
// const apiKey: string = "xxxxxxxxxxxxxxxx";
// const apiSecret: string = "xxxxxxxxxxxxxxxxxxxxxxxx";
const apiKey = 'JTfZGC12u02BAj14mM';
const apiSecret = 'M8P6CGcmlwpdfTnERMbpEBu2PsXPrMKPy3UR';
const wsPosition = () => {
    let data_temp = '';
    client.on('open', () => {
        console.log('"open" event!');
        console.log('WebSocket Client Connected');
        const expires = new Date().getTime() + 10000;
        const signature = crypto.createHmac("sha256", apiSecret).update("GET/realtime" + expires).digest("hex");
        const payload = {
            op: "auth",
            args: [apiKey, expires.toFixed(0), signature]
        };
        client.send(JSON.stringify(payload));
        setInterval(() => { client.ping(); }, 30000);
        client.ping();
        client.send(JSON.stringify({ "op": "subscribe", "args": ['order'] }));
    });
    debugger;
    client.on('message', (data) => {
        console.log('"message" event! %j', JSON.parse(data.toString()));
        data_temp = JSON.parse(data.toString());
    });
    client.on('ping', (data) => {
        console.log("ping received");
    });
    client.on('pong', (data) => {
        console.log("pong received");
    });
    return data_temp;
};
exports.default = {
    wsPosition,
};
