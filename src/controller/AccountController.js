"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountService_1 = __importDefault(require("../services/AccountService"));
const Encrypt_Decrypt_Service_1 = __importDefault(require("../services/Encrypt_Decrypt_Service"));
const getAllAccountsByUserId = async (req, res) => {
    try {
        debugger;
        const UserId = parseInt(req.params.UserId);
        if (!UserId) {
            res.status(400).send({
                status: 400,
                error: "Parameter ':UserId' can not be empty"
            });
        }
        let allData = [];
        debugger;
        allData = await AccountService_1.default.getAllAccounts_Data();
        let _acLst = [];
        let acLst = [];
        if (allData.length > 0) {
            _acLst = allData.filter((x) => x.userId == UserId && x.isActive == true);
            _acLst.forEach(ele => {
                let model = {};
                model.id = ele.id;
                model.userId = ele.userId;
                model.acId = ele.acId;
                model.note = ele.note;
                model.apiKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.apiKey);
                model.secretKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.secretKey);
                model.type = ele.type;
                model.permissions = ele.permissions;
                model.deadlineDay = ele.deadlineDay;
                model.expiredAt = ele.expiredAt;
                model.createdAt = ele.createdAt;
                model.uta = ele.uta;
                model.acUserID = ele.acUserID;
                model.isMaster = ele.isMaster;
                model.parentUid = ele.parentUid;
                model.kycLevel = ele.kycLevel;
                model.kycRegion = ele.kycRegion;
                model.status = ele.status;
                model.createdDate = ele.createdDate;
                model.updatedDate = ele.updatedDate;
                model.isActive = ele.isActive;
                acLst.push(model);
            });
        }
        res.send({ status: 200, data: acLst });
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
