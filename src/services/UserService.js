"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const CounterTbls_1 = require("../models/CounterTbls");
const uuid_1 = require("uuid");
const getAllUsers_Data = async () => {
    try {
        let UserData = await User_1.User.find({}).then((Users) => {
            return Users;
        }).catch((e) => {
            return e;
        });
        return UserData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getOneUser = async (UserId) => {
    try {
        const UserData = await User_1.User.findOne({ id: UserId });
        if (UserData == null) {
            throw {
                status: 400,
                message: `Can't find User with the id '${UserId}'`,
            };
        }
        return UserData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const createNewUser = async (newUser) => {
    const UserToInsert = new User_1.User(Object.assign(Object.assign({}, newUser), { createdDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }), updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
    try {
        let checkMail = await User_1.User.findOne({ email: UserToInsert.email });
        if (checkMail != null) {
            throw { status: 400, message: `User with the Email is '${UserToInsert.email}' already exists` };
        }
        let tepdata = await User_1.User.findOne({ firstName: UserToInsert.firstName, lastName: UserToInsert.lastName, email: UserToInsert.email });
        if (tepdata == null) {
            let CountId = await CounterTbls_1.CounterTbls.findOneAndUpdate({ name: 'User' }, { "$inc": { seq: 1 } }, { new: true }).then(async (cd) => {
                console.log("Counter Val ", cd);
                let seqId = 0;
                if (cd == null || cd == undefined) {
                    const newVal = new CounterTbls_1.CounterTbls({ id: "autoval", seq: 1, name: 'User' });
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
                let genrateRef = await IsExistRefCode();
                UserToInsert.id = CountId;
                UserToInsert.referalCode = genrateRef;
                let saveUser = await UserToInsert.save().then((listDoc) => {
                    console.log("Create Users  ", listDoc);
                    return listDoc;
                });
                return saveUser;
            }
        }
        else {
            throw { status: 400, message: `User with the title '${UserToInsert.firstName}' already exists` };
        }
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const IsExistRefCode = async () => {
    let refCode_Temp = (0, uuid_1.v4)();
    debugger;
    let chkIsExsists_RefCod = await User_1.User.findOne({ referalCode: refCode_Temp.toString() });
    if (chkIsExsists_RefCod != null && chkIsExsists_RefCod != undefined) {
        let data = await IsExistRefCode();
        return data.toString();
    }
    else {
        return refCode_Temp.toString();
    }
};
const updateOneUser = async (UserId, changes) => {
    try {
        const indexForUpdate = await User_1.User.findOne({ id: UserId });
        if (indexForUpdate == null) {
            throw { status: 400, message: `Can't find User with the id '${UserId}'` };
        }
        const updatedUser = new User_1.User(Object.assign(Object.assign({}, changes), { _id: indexForUpdate._id, id: UserId, createdDate: indexForUpdate.createdDate, updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
        let updateUsers = await User_1.User.updateOne({ 'id': UserId }, updatedUser)
            .then((user) => {
            if (user == null) {
                throw { status: 400, message: `Can't find User with the id '${UserId}'`, };
            }
        });
        return updatedUser;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const deleteOneUser = async (UserId) => {
    try {
        const indexForDeletion = await User_1.User.findOne({ id: UserId });
        if (indexForDeletion == null) {
            throw {
                status: 400,
                message: `Can't find User with the id '${UserId}'`,
            };
        }
        await User_1.User.deleteOne({ 'id': UserId });
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const isMailUser = async (userMail) => {
    const indexForDeletion = await User_1.User.findOne({ email: userMail });
    return (indexForDeletion != null) ? indexForDeletion : null;
};
const subscribeUser = async (changes) => {
    try {
        const indexForUpdate = await User_1.User.findOne({ email: changes.email });
        if (indexForUpdate == null) {
            throw { status: 400, message: `Can't find User with the email '${changes.email}'` };
        }
        const updatedUser = new User_1.User(Object.assign(Object.assign({}, indexForUpdate), { _id: indexForUpdate._id, amount: changes.amount, referral: changes.referral, walletAddress: changes.walletAddress, isSubscribe: changes.isSubscribe, createdDate: indexForUpdate.createdDate, updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
        let updateUsers = await User_1.User.updateOne({ 'email': changes.email }, updatedUser)
            .then((user) => {
            if (user == null) {
                throw { status: 400, message: `Can't find User with the email '${changes.email}'`, };
            }
        });
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getUserWallet = async (UserId) => {
    try {
        const indexForget = await User_1.User.findOne({ referalCode: UserId });
        if (indexForget == null) {
            throw {
                status: 400,
                message: `Can't find User with the parentRefId '${UserId}'`,
            };
        }
        let wallet = indexForget.walletAddress;
        return wallet;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    getAllUsers_Data,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
    isMailUser,
    subscribeUser, getUserWallet
};
