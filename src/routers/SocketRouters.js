"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const webScoketController_1 = __importDefault(require("../controller/TestByBitsAc/webScoketController"));
const SocketRouter = express_1.default.Router();
SocketRouter.get("", (0, cors_1.default)(), webScoketController_1.default.socketCtr);
exports.default = SocketRouter;
