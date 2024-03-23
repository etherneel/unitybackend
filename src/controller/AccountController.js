"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountService_1 = __importDefault(require("../services/AccountService"));
const getAllAccountsByUserId = async (req, res) => {
    try {
        const UserId = parseInt(req.params.UserId);
        if (!UserId) {
            res.status(400).send({
                status: 400,
                error: "Parameter ':UserId' can not be empty"
            });
        }
        let allData = [];
        allData = await AccountService_1.default.getAllAccounts_Data();
        let _acLst = [];
        if (allData.length > 0) {
            _acLst = allData.filter((x) => x.userId == UserId && x.isActive == true);
        }
        res.send({ status: "200", data: _acLst });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
exports.default = {
    getAllAccountsByUserId,
};
