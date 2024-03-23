"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserDetailsController_1 = __importDefault(require("../controller/UserDetailsController"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.get("/:type", (0, cors_1.default)(), UserDetailsController_1.default.getRolesUsers);
router.get("/:id", (0, cors_1.default)(), UserDetailsController_1.default.getUserId_Config_Account);
router.post("", (0, cors_1.default)(), UserDetailsController_1.default.getOneAccountByUserIdAndApiKey);
exports.default = router;
