"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CounterTbls_1 = require("../models/CounterTbls");
const PlaceOrder_1 = require("../models/PlaceOrder");
const getAllPlaceOrders_Data = async () => {
    try {
        let data = await PlaceOrder_1.PlaceOrder.find({}).then((x) => { return x; }).catch((e) => { return e; });
        return data;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const getOrder_Data = async (orderId) => {
    try {
        let data = await PlaceOrder_1.PlaceOrder.find({}).then((x) => { return x; }).catch((e) => { return e; });
        return data;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const createOrder = async (_new) => {
    const _toInsert = new PlaceOrder_1.PlaceOrder(Object.assign(Object.assign({}, _new), { createdDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }), updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
    try {
        let checkav = await PlaceOrder_1.PlaceOrder.findOne({ orderId: _toInsert.orderId });
        if (checkav != null) {
            throw { status: 400, message: `Order with the orderId is '${_toInsert.orderId}' already exists` };
        }
        if (checkav == null) {
            let CountId = await CounterTbls_1.CounterTbls.findOneAndUpdate({ name: 'PlaceOrder' }, { "$inc": { seq: 1 } }, { new: true }).then(async (cd) => {
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
                _toInsert.id = CountId;
                let saveUser = await _toInsert.save().then((listDoc) => {
                    console.log("Create Order  ", listDoc);
                    return listDoc;
                });
                return saveUser;
            }
        }
        else {
            throw { status: 400, message: `Order with the OrderId '${_toInsert.orderId}' already exists` };
        }
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const updateOrder = async (Id, changes) => {
    try {
        const indexForUpdate = await PlaceOrder_1.PlaceOrder.findOne({ id: Id });
        if (indexForUpdate == null) {
            throw { status: 400, message: `Can't find Order with the id '${Id}'` };
        }
        const _updated = new PlaceOrder_1.PlaceOrder(Object.assign(Object.assign({}, changes), { _id: indexForUpdate._id, id: Id, createdDate: indexForUpdate.createdDate, updatedDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) }));
        let updateOrder = await PlaceOrder_1.PlaceOrder.updateOne({ 'id': Id }, _updated)
            .then((user) => {
            if (user == null) {
                throw { status: 400, message: `Can't find Order with the id '${Id}'`, };
            }
        });
        return _updated;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
const deleteOrder = async (Id) => {
    try {
        const indexForDeletion = await PlaceOrder_1.PlaceOrder.findOne({ id: Id });
        if (indexForDeletion == null) {
            throw {
                status: 400,
                message: `Can't find Order with the id '${Id}'`,
            };
        }
        await PlaceOrder_1.PlaceOrder.deleteOne({ 'id': Id });
        return true;
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    getAllPlaceOrders_Data, createOrder, updateOrder, deleteOrder
};
