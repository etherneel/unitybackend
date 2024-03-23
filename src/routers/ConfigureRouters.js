"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ConfigureController_1 = __importDefault(require("../controller/ConfigureController"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.get("/syncAc/", (0, cors_1.default)(), ConfigureController_1.default.syncAcService);
router.get("", (0, cors_1.default)(), ConfigureController_1.default.getAllConfigures);
router.get("/:UserId", (0, cors_1.default)(), ConfigureController_1.default.getConfigureByUserId);
router.get("/:id", (0, cors_1.default)(), ConfigureController_1.default.getOneConfigure);
router.post("/UseWithConfigure", (0, cors_1.default)(), ConfigureController_1.default.createNewUseWithConfigure);
router.post("", (0, cors_1.default)(), ConfigureController_1.default.createNewConfigure);
router.patch("/:id", (0, cors_1.default)(), ConfigureController_1.default.updateOneConfigure);
router.delete("/:id", (0, cors_1.default)(), ConfigureController_1.default.deleteOneConfigure);
exports.default = router;
