"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountService_1 = __importDefault(require("../services/AccountService"));
const UserDetailsConfigAccountService_1 = __importDefault(require("../services/UserDetailsConfigAccountService"));
const getOneAccountByUserIdAndApiKey = async (req, res) => {
    try {
        let model = {};
        Object.assign(model, req.body);
        let Userdata = await AccountService_1.default.getOneAccountByUserIdAndApiKey(model.userId, model.apiKey.toString());
        res.status(200).send({
            status: Userdata != null ? 200 : 500,
            data: Userdata,
            message: Userdata ? "Account Detail Get Successfully..!!" : "Not Find Account Detail"
        });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
};
const getUserId_Config_Account = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        let Userdata = await UserDetailsConfigAccountService_1.default.getOneAccountByUserIdAndApiKey(userId);
        res.status(200).send({ status: Userdata != null ? 200 : 500,
            data: Userdata, message: Userdata ? "Account Detail Get Successfully..!!" : "Not Find Account Detail" });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
};
const getRolesUsers = async (req, res) => {
    try {
        let allUsers = [];
        const userType = req.params.type;
        allUsers = await UserDetailsConfigAccountService_1.default.getUsersByRoleType(userType);
        res.send({ status: 200, data: allUsers });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, data: { error: (error === null || error === void 0 ? void 0 : error.message) || error } });
    }
};
exports.default = {
    getOneAccountByUserIdAndApiKey, getUserId_Config_Account, getRolesUsers
};
