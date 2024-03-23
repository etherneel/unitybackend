"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const ConfigureUser_1 = require("../models/ConfigureUser");
const CounterTbls_1 = require("../models/CounterTbls");
const getAllConfigures_Data = async () => {
    try {
        let ConfigureData = await ConfigureUser_1.ConfigureUser.find({}).then((Configures) => {
            return Configures;
        }).catch((e) => {
            return e;
        });
        return ConfigureData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getOneConfigure = async (ConfigureId) => {
    try {
        const ConfigureData = await ConfigureUser_1.ConfigureUser.findOne({ id: ConfigureId });
        if (ConfigureData == null) {
            throw {
                status: 400,
                message: `Can't find Configure with the id '${ConfigureId}'`,
            };
        }
        return ConfigureData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const createAndUpdateConfigure = async (newConfigure) => {
    const ConfigureToInsert = new ConfigureUser_1.ConfigureUser(Object.assign(Object.assign({}, newConfigure), { updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
    try {
        const data = await ConfigureUser_1.ConfigureUser.findOne({ userId: ConfigureToInsert.userId });
        // let tempdata = await ConfigureUser.findOneAndUpdate({ userId: ConfigureToInsert.userId, apiKey: ConfigureToInsert.apiKey,
        //   keyName: ConfigureToInsert.keyName },{ $set: { ConfigureToInsert } }, { new: true })
        //   .then(async (data: any) => {
        if (data == null) {
            let CountId = await CounterTbls_1.CounterTbls.findOneAndUpdate({ name: 'Configure' }, { "$inc": { seq: 1 } }, { new: true }).then(async (cd) => {
                console.log("Counter Val ", cd);
                let seqId = 0;
                if (cd == null || cd == undefined) {
                    const newVal = new CounterTbls_1.CounterTbls({ id: "autoval", seq: 1, name: 'Configure' });
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
                ConfigureToInsert.id = CountId;
                ConfigureToInsert._id = new mongodb_1.ObjectId();
                ConfigureToInsert.createdDate = new Date().toLocaleString("en-US", { timeZone: "UTC" });
                let saveConfigure = await ConfigureToInsert.save().then((listDoc) => {
                    console.log("Create Configures  ", listDoc);
                    return listDoc;
                });
                return saveConfigure;
            }
        }
        else {
            // return data;
            const updatedConfigure = new ConfigureUser_1.ConfigureUser({
                // // ...ConfigureToInsert,
                _id: data._id,
                apiKey: ConfigureToInsert.apiKey,
                secretKey: ConfigureToInsert.secretKey,
                ipRestriction: ConfigureToInsert.ipRestriction,
                status: ConfigureToInsert.status,
                id: data.id,
                userId: ConfigureToInsert.userId,
                keyName: data.keyName,
                permissions: data.permissions,
                acDetail: ConfigureToInsert.acDetail,
                createdDate: data.createdDate,
                updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            });
            let updateConfigures = await ConfigureUser_1.ConfigureUser.updateOne({ id: data.id, userId: ConfigureToInsert.userId }, updatedConfigure)
                .then((Configure) => {
                if (Configure == null) {
                    throw { status: 400, message: `Can't find Configure with the id '${data.id}'`, };
                }
            });
            return updatedConfigure;
        }
        // });
        // return  tempdata;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const createNewConfigure = async (newConfigure) => {
    const ConfigureToInsert = new ConfigureUser_1.ConfigureUser(Object.assign(Object.assign({}, newConfigure), { createdDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }), updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
    try {
        let tepdata = await ConfigureUser_1.ConfigureUser.findOne({ userId: ConfigureToInsert.userId, apiKey: ConfigureToInsert.apiKey,
            keyName: ConfigureToInsert.keyName });
        if (tepdata == null) {
            let CountId = await CounterTbls_1.CounterTbls.findOneAndUpdate({ name: 'Configure' }, { "$inc": { seq: 1 } }, { new: true }).then(async (cd) => {
                console.log("Counter Val ", cd);
                let seqId = 0;
                if (cd == null || cd == undefined) {
                    const newVal = new CounterTbls_1.CounterTbls({ id: "autoval", seq: 1, name: 'Configure' });
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
                ConfigureToInsert.id = CountId;
                let saveConfigure = await ConfigureToInsert.save().then((listDoc) => {
                    console.log("Create Configures  ", listDoc);
                    return listDoc;
                });
                return saveConfigure;
            }
        }
        else {
            throw { status: 400, message: `Configure with the title '${ConfigureToInsert.apiKey}' already exists` };
        }
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const updateOneConfigure = async (ConfigureId, changes) => {
    try {
        const indexForUpdate = await ConfigureUser_1.ConfigureUser.findOne({ id: ConfigureId });
        if (indexForUpdate == null) {
            throw { status: 400, message: `Can't find Configure with the id '${ConfigureId}'` };
        }
        const updatedConfigure = new ConfigureUser_1.ConfigureUser(Object.assign(Object.assign({}, changes), { _id: indexForUpdate._id, id: ConfigureId, createdDate: indexForUpdate.createdDate, updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
        let updateConfigures = await ConfigureUser_1.ConfigureUser.updateOne({ 'id': ConfigureId }, updatedConfigure)
            .then((Configure) => {
            if (Configure == null) {
                throw { status: 400, message: `Can't find Configure with the id '${ConfigureId}'`, };
            }
            else {
                return updatedConfigure;
            }
        });
        return updateConfigures;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const deleteOneConfigure = async (ConfigureId) => {
    try {
        const indexForDeletion = await ConfigureUser_1.ConfigureUser.findOne({ id: ConfigureId });
        if (indexForDeletion == null) {
            throw {
                status: 400,
                message: `Can't find Configure with the id '${ConfigureId}'`,
            };
        }
        await ConfigureUser_1.ConfigureUser.deleteOne({ 'id': ConfigureId });
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getAllConfigures_DataByUserId = async (id) => {
    try {
        ;
        let ConfigureData = await ConfigureUser_1.ConfigureUser.find({ userId: id }).then((Configures) => {
            return Configures;
        }).catch((e) => {
            return e;
        });
        return ConfigureData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getByApiKey = async (apiKey) => {
    try {
        const ConfigureData = await ConfigureUser_1.ConfigureUser.findOne({ apiKey: apiKey });
        if (ConfigureData == null) {
            throw {
                status: 400,
                message: `Can't find Configure with the apiKey'${apiKey}'`,
            };
        }
        return ConfigureData;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    getAllConfigures_Data,
    getOneConfigure,
    createNewConfigure,
    updateOneConfigure,
    deleteOneConfigure,
    createAndUpdateConfigure, getAllConfigures_DataByUserId,
    getByApiKey
};
