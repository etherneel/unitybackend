"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("../models/Account");
const CounterTbls_1 = require("../models/CounterTbls");
const getAllAccounts_Data = async () => {
    try {
        let AccountData = await Account_1.Account.find({}).then((Accounts) => {
            return Accounts;
        }).catch((e) => {
            return e;
        });
        return AccountData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getOneAccount = async (AccountId) => {
    try {
        const AccountData = await Account_1.Account.findOne({ id: AccountId });
        if (AccountData == null) {
            throw {
                status: 400,
                message: `Can't find Account with the id '${AccountId}'`,
            };
        }
        return AccountData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getOneAccountByUserIdAndApiKey = async (userId, apiKey) => {
    try {
        const AccountData = await Account_1.Account.findOne({ userId: userId, apiKey: apiKey });
        if (AccountData == null) {
            throw {
                status: 400,
                message: `Can't find Account with the UserId '${userId}' && ApiKey '${apiKey}' `,
            };
        }
        return AccountData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getOneAccountByUserId = async (userId) => {
    try {
        const AccountData = await Account_1.Account.findOne({ userId: userId });
        if (AccountData == null) {
            throw {
                status: 400,
                message: `Can't find Account with the id '${userId}'`,
            };
        }
        return AccountData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const createAndUpdateAccount = async (newAccount) => {
    const AccountToInsert = new Account_1.Account(Object.assign(Object.assign({}, newAccount), { isActive: true, updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
    let isMaster = AccountToInsert.isMaster;
    try {
        await Account_1.Account.findOneAndUpdate({ userId: AccountToInsert.userId, isMaster: isMaster }, { isActive: false })
            .then(async (data) => { });
        //   let chk =  await Account.find({ userId: AccountToInsert.userId, iaMaster:isMaster  })
        //         .then(async (data: any) => { 
        //             data.forEach(async ele => {
        //                let model = ele;
        //                 let acModel  = new Account({
        //                     ...model,
        //                  _id:ele._id,
        //                 isActive:false,
        //                 createdDate: ele.createdDate,
        //                 updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        //                 });
        //                  await Account.updateOne({ id: ele.id, userId: ele.userId}, 
        //                     acModel).then((Configure:any) => { return Configure });
        //             });
        //         });
        let tempdata = await Account_1.Account.findOneAndUpdate({ apiKey: AccountToInsert.apiKey, userId: AccountToInsert.userId }, { $set: { AccountToInsert } }, { new: true })
            .then(async (data) => {
            // let tepdata = await Account.findOneAndUpdate({apiKey: AccountToInsert.apiKey, userId: AccountToInsert.userId}, {$set:{});
            if (data == null) {
                let CountId = await CounterTbls_1.CounterTbls.findOneAndUpdate({ name: 'Account' }, { "$inc": { seq: 1 } }, { new: true }).then(async (cd) => {
                    console.log("Counter Val ", cd);
                    let seqId = 0;
                    if (cd == null || cd == undefined) {
                        const newVal = new CounterTbls_1.CounterTbls({ id: "autoval", seq: 1, name: 'Account' });
                        newVal.save();
                        seqId = 1;
                        return seqId;
                    }
                    else {
                        seqId = cd.seq;
                        return seqId;
                    }
                });
                if (CountId > 0) {
                    AccountToInsert.id = CountId;
                    AccountToInsert.createdDate = new Date().toLocaleString("en-US", { timeZone: "UTC" });
                    let saveAccount = await AccountToInsert.save().then((listDoc) => {
                        console.log("Create Accounts  ", listDoc);
                        return listDoc;
                    });
                    return saveAccount;
                }
            }
            else {
                return data;
            }
        });
        return tempdata;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const deleteOneAccount = async (AccountId) => {
    try {
        const indexForDeletion = await Account_1.Account.findOne({ id: AccountId });
        if (indexForDeletion == null) {
            throw {
                status: 400,
                message: `Can't find Account with the id '${AccountId}'`,
            };
        }
        await Account_1.Account.deleteOne({ 'id': AccountId });
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const isAvailble_Master_Valid = async (AccountId, UserId) => {
    try {
        const isMasterAv = await Account_1.Account.findOne({ acUserID: AccountId, isMaster: true });
        if (isMasterAv == null) {
            return 0;
        }
        else {
            let user_data = isMasterAv.userId == UserId ? true : false;
            if (user_data) {
                return 2;
            }
            else {
                return 1;
            }
        }
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const isAvailbleMaster = async (AccountId) => {
    try {
        const isMasterAv = await Account_1.Account.findOne({ acUserID: AccountId, isMaster: true });
        if (isMasterAv == null) {
            return false;
        }
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getDetailByKey = async (apiKey, secretKey) => {
    try {
        const data = await Account_1.Account.findOne({ apiKey: apiKey, secretKey: secretKey });
        if (data == null) {
            return null;
        }
        return data;
    }
    catch (error) {
        return null;
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    getAllAccounts_Data,
    getOneAccount,
    createAndUpdateAccount,
    deleteOneAccount,
    getOneAccountByUserId,
    getOneAccountByUserIdAndApiKey,
    isAvailbleMaster,
    isAvailble_Master_Valid,
    getDetailByKey
};
