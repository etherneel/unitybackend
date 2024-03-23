"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AccountController_1 = __importDefault(require("../controller/AccountController"));
const router = express_1.default.Router();
router.get("/:UserId", (0, cors_1.default)(), AccountController_1.default.getAllAccountsByUserId);
exports.default = router;
