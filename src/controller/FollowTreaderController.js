"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowTreaderService_1 = __importDefault(require("../services/FollowTreaderService"));
const getAll = async (req, res) => {
    try {
        let allData;
        allData = await FollowTreaderService_1.default.getAllFollowTreaders_Data();
        let _Data;
        _Data = allData;
        res.send({ status: 200, data: _Data.length != 0 ? _Data : [] });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const createFollowTreader = async (req, res) => {
    //const { body } = req;
    let model = {};
    Object.assign(model, req.body);
    if (!model.treaderId || !model.userId) {
        res.status(400).send({ status: 400, error: "One of the following keys is missing or is empty in request body" });
        return;
    }
    try {
        const createdUser = await FollowTreaderService_1.default.createFollow(model);
        res.status(200).send({ status: 200, data: createdUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const updateFollowTreader = async (req, res) => {
    const UserId = parseInt(req.params.id);
    if (!UserId) {
        res.status(400).send({ status: 400, error: "Parameter ':UserId' can not be empty" });
    }
    try {
        let User = {};
        Object.assign(User, req.body);
        const updatedUser = await FollowTreaderService_1.default.updateFollow(UserId, User);
        res.send({ status: 200, data: updatedUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const deleteFollowTreader = async (req, res) => {
    const UserId = parseInt(req.params.id);
    if (!UserId) {
        res.status(400).send({ status: 400, error: "Parameter ':UserId' can not be empty" });
    }
    try {
        let Userdele = await FollowTreaderService_1.default.deleteFollow(UserId);
        res.status(200).send({ status: Userdele ? 200 : 500, data: Userdele ? "Deleted Successfully..!!" : "Not Deleted" });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
exports.default = {
    getAll, createFollowTreader, updateFollowTreader, deleteFollowTreader
};
