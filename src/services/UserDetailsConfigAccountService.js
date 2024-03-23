"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Account_1 = require("../models/Account");
const ConfigureUser_1 = require("../models/ConfigureUser");
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
        Object.assign(userDetail.Config, configData);
        userDetail.AccountDetail = {};
        Object.assign(userDetail.AccountDetail, accountData);
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
            userDetail.Config = {};
            Object.assign(userDetail.Config, configData);
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
