"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FollowTreaderController_1 = __importDefault(require("../controller/FollowTreaderController"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.get("", (0, cors_1.default)(), FollowTreaderController_1.default.getAll);
router.post("", (0, cors_1.default)(), FollowTreaderController_1.default.createFollowTreader);
router.patch("/:id", (0, cors_1.default)(), FollowTreaderController_1.default.updateFollowTreader);
router.delete("/:id", (0, cors_1.default)(), FollowTreaderController_1.default.deleteFollowTreader);
exports.default = router;
