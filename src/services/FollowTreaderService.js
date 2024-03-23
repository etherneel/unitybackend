"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FollowTreader_1 = require("../models/FollowTreader");
const CounterTbls_1 = require("../models/CounterTbls");
const User_1 = require("../models/User");
const Account_1 = require("../models/Account");
const getAllFollowTreaders_Data = async () => {
    try {
        let followData = await FollowTreader_1.FollowTreader.find({}).then((otps) => {
            return otps;
        }).catch((e) => {
            return e;
        });
        let UserLse = [];
        let UsersLst;
        let acDatas;
        acDatas = await Account_1.Account.find({}).then((data) => { return data; });
        UsersLst = await User_1.User.find({ type: "LeadUser" }).then((otps) => {
            otps.forEach(ele => {
                let model = {};
                //  Object.assign(model, ele);
                model.id = ele.id;
                model.firstName = ele.firstName;
                model.lastName = ele.lastName;
                model.email = ele.email;
                model.otp = ele.otp;
                model.isActiveOTP = ele.isActiveOTP;
                model.isActive = ele.isActive;
                model.type = ele.type;
                model.isFollowTreader = ele.id;
                let modelFollow = followData.filter((x) => x.treaderId == ele.id);
                let modelAccounts = acDatas.filter((x) => x.userId == ele.id);
                model.isFollowTreader = modelFollow.length != 0 ? true : false;
                model.userAccountId = modelFollow.length != 0 ? modelFollow[0].userAccountId : 0;
                model.followid = modelFollow.length != 0 ? modelFollow[0].id : 0;
                model.followUserId = modelFollow.length != 0 ? modelFollow[0].userId : 0;
                model.followTreaderId = modelFollow.length != 0 ? modelFollow[0].treaderId : 0;
                let modelAc = [];
                if (modelAccounts.length != 0) {
                    modelAccounts.forEach(ac => {
                        let acModel = {};
                        acModel.id = ac.id;
                        acModel.userId = ac.userId;
                        acModel.acId = ac.acId;
                        acModel.note = ac.note;
                        acModel.apiKey = ac.apiKey;
                        acModel.permissions = ac.permissions;
                        acModel.type = ac.type;
                        acModel.deadlineDay = ac.deadlineDay;
                        acModel.expiredAt = ac.expiredAt;
                        acModel.createdAt = ac.createdAt;
                        acModel.uta = ac.uta;
                        acModel.acUserID = ac.acUserID;
                        acModel.isMaster = ac.isMaster;
                        acModel.parentUid = ac.parentUid;
                        acModel.kycLevel = ac.kycLevel;
                        acModel.kycRegion = ac.kycRegion;
                        acModel.acStatus = ac.acStatus;
                        acModel.status = ac.status;
                        modelAc.push(acModel);
                    });
                }
                model.account = modelAc;
                // ele = model;
                if (model.account.length != 0) {
                    UserLse.push(model);
                }
            });
            let data = otps;
            return UserLse;
        }).catch((e) => {
            return e;
        });
        return UserLse;
        console.log('OtpsData1 ', UsersLst);
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getAllFollows = async () => {
    try {
        let followData = await FollowTreader_1.FollowTreader.find({}).then((otps) => {
            return otps;
        }).catch((e) => {
            return e;
        });
        return followData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const createFollow = async (newUser) => {
    const UserToInsert = new FollowTreader_1.FollowTreader(Object.assign(Object.assign({}, newUser), { createdDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }), updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
    try {
        let checkMail = await FollowTreader_1.FollowTreader.findOne({ treaderId: UserToInsert.treaderId, userId: UserToInsert.userId });
        if (checkMail != null) {
            throw { status: 400, message: `User with the Treader are already exists` };
        }
        let CountId = await CounterTbls_1.CounterTbls.findOneAndUpdate({ name: 'FollowTreader' }, { "$inc": { seq: 1 } }, { new: true })
            .then(async (cd) => {
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
            UserToInsert.id = CountId;
            let saveUser = await UserToInsert.save().then((listDoc) => {
                console.log("Create Users  ", listDoc);
                return listDoc;
            });
            return saveUser;
        }
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const updateFollow = async (Id, changes) => {
    try {
        const indexForUpdate = await FollowTreader_1.FollowTreader.findOne({ id: Id });
        if (indexForUpdate == null) {
            throw { status: 400, message: `Can't find User with the id '${Id}'` };
        }
        const updatedUser = new FollowTreader_1.FollowTreader(Object.assign(Object.assign({}, changes), { _id: indexForUpdate._id, id: Id, createdDate: indexForUpdate.createdDate, updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
        let updateUsers = await FollowTreader_1.FollowTreader.updateOne({ 'id': Id }, updatedUser)
            .then((user) => {
            if (user == null) {
                throw { status: 400, message: `Can't find FollowTreader with the id '${Id}'`, };
            }
            else {
                return updatedUser;
            }
        });
        return updateUsers;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const deleteFollow = async (Id) => {
    try {
        const indexForDeletion = await FollowTreader_1.FollowTreader.findOne({ id: Id });
        if (indexForDeletion == null) {
            throw {
                status: 400,
                message: `Can't find User with the id '${Id}'`,
            };
        }
        await FollowTreader_1.FollowTreader.deleteOne({ 'id': Id });
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    getAllFollowTreaders_Data, createFollow, updateFollow, deleteFollow, getAllFollows
};
