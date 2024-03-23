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
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const config = __importStar(require("../app.json"));
const bodyParser = __importStar(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor() {
        this.Start = (port) => {
            return new Promise((resolve, reject) => {
                this.httpServer.listen(port, () => {
                    resolve(port);
                })
                    .on('error', (err) => reject(err));
            });
        };
        this.httpServer = (0, express_1.default)();
        this.httpServer.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer.use(bodyParser.json());
        this.httpServer.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Expose-Headers');
            next();
        });
        new router_1.default(this.httpServer);
        this.httpServer.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
}
//const MONGO_URL = 'mongodb://localhost:27017/TaskManager';
// const MONGO_URL = config.database.connectionstring; 
const MONGO_URL = config.database.connectionstring1;
// const options: mongoose.ConnectOptions = {
const options = {
    family: 4,
};
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(MONGO_URL, clientOptions).then(() => {
    console.log("Connected to MongoDB successfully ");
}).catch((e) => {
    console.log("Error ", e);
});
mongoose_1.default.connection.on('error', (error) => console.log(error));
// const key = 'HW3DnzSoGcgHe9K1Y3';
// const secret = 'AsajHPtlpvWEtLyFdZiZDKvSfg0XaellKhgP';
// ByBitsWebSocketClient.WEBSubscribe(key,secret);
// OrderPlaceByWS_LeaderController.OnWSInitByLeads();
exports.default = App;
