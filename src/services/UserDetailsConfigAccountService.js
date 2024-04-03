"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Account_1 = require("../models/Account");
const ConfigureUser_1 = require("../models/ConfigureUser");
const Encrypt_Decrypt_Service_1 = __importDefault(require("./Encrypt_Decrypt_Service"));
const getOneAccountByUserIdAndApiKey = async (id) => {
    try {
        let UserData = await User_1.User.find({ id: id }).then((data) => { return data; }).catch((e) => { return e; });
        let ConfigureUserData = await ConfigureUser_1.ConfigureUser.find({}).then((data) => { return data; }).catch((e) => { return e; });
        let AccountUserData = await Account_1.Account.find({}).then((data) => { return data; }).catch((e) => { return e; });
        let configData = ConfigureUserData.filter(x => x.userId == id);
        let accountData = AccountUserData.filter(x => x.userId == id);
        let userDetail = {};
        Object.assign(userDetail, UserData);
        userDetail.Config = {};
        let configData_Temp = [];
        configData.forEach(ele => {
            let model = {};
            model.id = ele.id;
            model.userId = ele.userId;
            model.keyName = ele.keyName;
            model.email = ele.email;
            model.apiKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.apiKey);
            model.secretKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.secretKey);
            model.isMaster = ele.isMaster;
            model.ipRestriction = ele.ipRestriction;
            model.permissions = ele.permissions;
            model.acDetail = ele.acDetail;
            model.status = ele.status;
            model.createdDate = ele.createdDate;
            model.updatedDate = ele.updatedDate;
            configData_Temp.push();
        });
        Object.assign(userDetail.Config, configData_Temp);
        let acLst = [];
        accountData.forEach(ele => {
            let model = {};
            model.id = ele.id;
            model.userId = ele.userId;
            model.acId = ele.acId;
            model.note = ele.note;
            model.apiKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.apiKey);
            model.secreatKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.secreatKey);
            model.permissions = ele.permissions;
            model.type = ele.type;
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
        userDetail.AccountDetail = {};
        Object.assign(userDetail.AccountDetail, acLst);
        return userDetail;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getUsersByRoleType = async (userType) => {
    try {
        let UserData = await User_1.User.find({ isDelete: 0, type: userType }).then((data) => { return data; }).catch((e) => { return e; });
        let ConfigureUserData = await ConfigureUser_1.ConfigureUser.find({}).then((data) => { return data; }).catch((e) => { return e; });
        // let AccountUserData = await Account.find({}).then((data:any) => {return data;}).catch((e:any) => {return e;});
        let _userDetails = [];
        UserData.forEach(ele => {
            let configData = ConfigureUserData.filter(x => x.userId == ele.id);
            let userDetail = {};
            Object.assign(userDetail, UserData);
            let configData_Temp = [];
            configData.forEach(ele => {
                let model = {};
                model.id = ele.id;
                model.userId = ele.userId;
                model.keyName = ele.keyName;
                model.email = ele.email;
                model.apiKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.apiKey);
                model.secretKey = Encrypt_Decrypt_Service_1.default.decrypt(ele.secretKey);
                model.isMaster = ele.isMaster;
                model.ipRestriction = ele.ipRestriction;
                model.permissions = ele.permissions;
                model.acDetail = ele.acDetail;
                model.status = ele.status;
                model.createdDate = ele.createdDate;
                model.updatedDate = ele.updatedDate;
                configData_Temp.push();
            });
            userDetail.Config = {};
            Object.assign(userDetail.Config, configData_Temp);
            userDetail.AccountDetail = {};
            _userDetails.push(userDetail);
        });
        return _userDetails;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    getOneAccountByUserIdAndApiKey,
    getUsersByRoleType
};
