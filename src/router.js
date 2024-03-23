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
const express = __importStar(require("express"));
const UserRouters_1 = __importDefault(require("./routers/UserRouters"));
const ConfigureRouters_1 = __importDefault(require("./routers/ConfigureRouters"));
const UserDetailsRouters_1 = __importDefault(require("./routers/UserDetailsRouters"));
const cors_1 = __importDefault(require("cors"));
const AccountRouters_1 = __importDefault(require("./routers/AccountRouters"));
const FollowTreaderRouters_1 = __importDefault(require("./routers/FollowTreaderRouters"));
const OrderRouters_1 = __importDefault(require("./routers/OrderRouters"));
const SocketRouters_1 = __importDefault(require("./routers/SocketRouters"));
class Router {
    constructor(server) {
        const router = express.Router();
        router.options('*', (0, cors_1.default)());
        server.use("/api/User", UserRouters_1.default);
        server.use("/api/Configure", ConfigureRouters_1.default);
        server.use("/api/UserDetails", UserDetailsRouters_1.default);
        server.use("/api/Account", AccountRouters_1.default);
        server.use("/api/FollowTreader", FollowTreaderRouters_1.default);
        server.use("/api/Order", OrderRouters_1.default);
        server.use("/api/Socket", SocketRouters_1.default);
        server.use('/', router);
    }
}
exports.default = Router;
