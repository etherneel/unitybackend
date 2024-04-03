"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigureService_1 = __importDefault(require("../services/ConfigureService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const ByBitsAccountService_1 = __importDefault(require("../services/ByBitsAc/ByBitsAccountService"));
const AccountService_1 = __importDefault(require("../services/AccountService"));
const Encrypt_Decrypt_Service_1 = __importDefault(require("../services/Encrypt_Decrypt_Service"));
const getAllConfigures = async (req, res) => {
    try {
        let allConfigures = [];
        let allConfigures_Data = [];
        allConfigures = await ConfigureService_1.default.getAllConfigures_Data();
        if (allConfigures.length != 0) {
            allConfigures.forEach(ele => {
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
                allConfigures_Data.push(model);
            });
        }
        res.send({ status: 200, data: allConfigures_Data });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getOneConfigure = async (req, res) => {
    const ConfigureId = parseInt(req.params.id);
    if (!ConfigureId) {
        res.status(400).send({
            status: 400,
            error: "Parameter ':ConfigureId' can not be empty"
        });
    }
    try {
        const Configure = await ConfigureService_1.default.getOneConfigure(ConfigureId);
        res.send({ status: "200", data: Configure });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const createNewConfigure = async (req, res) => {
    //const { body } = req;
    let Configure = {};
    Object.assign(Configure, req.body);
    // if ( !Configure.userId || !Configure.keyName || !Configure.apiKey || !Configure.secretKey || !Configure.ipRestriction || !Configure.permissions ) {
    if (!Configure.apiKey || !Configure.secretKey) {
        res.status(400).send({ status: 400, error: "One of the following keys is missing or is empty in request body" });
        return;
    }
    try {
        let allConfigures = {};
        let acModel = {
            apiKey: req.body.apiKey,
            secreatKey: req.body.secretKey,
            userId: req.body.userId
        };
        allConfigures = await ByBitsAccountService_1.default.getAccountInfoByUser(acModel);
        let result = allConfigures.result;
        if (Object.keys(result).length == 0) {
            res.status(400).send({ status: 400, error: " You are not valid User...!!" });
            return;
        }
        if (result.isMaster != Configure.isMaster) {
            if (Configure.isMaster) {
                res.status(400).send({ status: 400, error: "Invalid Account details...!!" });
                return;
            }
            else {
                res.status(400).send({ status: 400, error: "This is not Primary Account...!!" });
                return;
            }
        }
        if (result.isMaster == Configure.isMaster) {
            if (!Configure.isMaster) {
                const isMasterAv = await AccountService_1.default.isAvailble_Master_Valid(result.parentUid, acModel.userId);
                switch (isMasterAv) {
                    case 0:
                        res.status(400).send({ status: 400, error: "This Not Have Primary Account" });
                        return;
                        break;
                    case 1:
                        res.status(400).send({ status: 400, error: "This is not sub account of registered primary account" });
                        return;
                        break;
                    default:
                        break;
                }
            }
        }
        let userAv = await ischeckAvilableUser(acModel.apiKey, req.body.email, acModel.userId);
        switch (userAv) {
            case 1:
                res.status(400).send({ status: 400, error: "This key is already registered" });
                return;
                break;
            case 2:
                res.status(400).send({ status: 400, error: "This Email already Registred..!!" });
                return;
                break;
            default:
                break;
        }
        let isExist;
        isExist = await checkIsAvailbleAcDetail(acModel.userId, acModel.apiKey);
        if (isExist) {
            res.status(400).send({ status: 400, error: "This apiKey is alredy used" });
            return;
        }
        let acDetail = {};
        Object.assign(acDetail, result);
        acDetail.userId = Configure.userId;
        acDetail.acUserID = result.userID;
        acDetail.id = 0;
        acDetail.acId = result.id;
        acDetail.permissions = JSON.stringify(result.permissions);
        acDetail.secretKey = Configure.secretKey;
        const createdConfigure = await ConfigureService_1.default.createAndUpdateConfigure(Configure);
        const AcDetailUser = await AccountService_1.default.createAndUpdateAccount(acDetail);
        res.status(200).send({ status: 200, data: createdConfigure, details: AcDetailUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const checkIsAvailbleAcDetail = async (userId, apiKey) => {
    const _acData = await AccountService_1.default.getAllAccounts_Data();
    // let isExists_Api_KEY = _acData.filter((x:any)=>x.apiKey == apiKey && x.UserId == userId);
    let key = Encrypt_Decrypt_Service_1.default.encrypt(apiKey);
    let isExists_User = _acData.filter((x) => x.apiKey == key && x.UserId == userId);
    let isExists_Other_User = _acData.filter((x) => x.apiKey == key && x.UserId != userId);
    // let isExists_UserId = isExists_Api_KEY.UserId == userId ? true : false;
    // let isExists_Id = isExists_Api_KEY.id == id ? true : false;
    if (isExists_Other_User.length != 0) {
        return true; // { status: 400 || 500, message: "This apiKey is alredy used" };
    }
    return false;
};
const updateOneConfigure = async (req, res) => {
    const ConfigureId = parseInt(req.params.id);
    if (!ConfigureId) {
        res.status(400).send({ status: 400, error: "Parameter ':ConfigureId' can not be empty" });
    }
    try {
        let Configure = {};
        Object.assign(Configure, req.body);
        const updatedConfigure = await ConfigureService_1.default.updateOneConfigure(ConfigureId, Configure);
        res.send({ status: "200", data: updatedConfigure });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: 400, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const deleteOneConfigure = async (req, res) => {
    const ConfigureId = parseInt(req.params.id);
    if (!ConfigureId) {
        res.status(400).send({ status: 400, error: "Parameter ':ConfigureId' can not be empty" });
    }
    try {
        let Configuredele = await ConfigureService_1.default.deleteOneConfigure(ConfigureId);
        res.status(200).send({ status: Configuredele ? "200" : "Cancel", data: Configuredele ? "Deleted Successfully..!!" : "Not Deleted" });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const getConfigureByUserId = async (req, res) => {
    const UserId = parseInt(req.params.UserId);
    if (!UserId) {
        res.status(400).send({
            status: 400,
            error: "Parameter ':UserId' can not be empty"
        });
    }
    try {
        const ele = await ConfigureService_1.default.getAllConfigures_DataByUserId(UserId);
        if (ele.length != 0) {
            let model = {};
            model.id = ele[0].id;
            model.userId = ele[0].userId;
            model.keyName = ele[0].keyName;
            model.email = ele[0].email;
            model.apiKey = Encrypt_Decrypt_Service_1.default.decrypt(ele[0].apiKey);
            model.secretKey = Encrypt_Decrypt_Service_1.default.decrypt(ele[0].secretKey);
            model.isMaster = ele[0].isMaster;
            model.ipRestriction = ele[0].ipRestriction;
            model.permissions = ele[0].permissions;
            model.acDetail = ele[0].acDetail;
            model.status = ele[0].status;
            model.createdDate = ele[0].createdDate;
            model.updatedDate = ele[0].updatedDate;
            res.send({ status: 200, data: model });
            return;
        }
        res.send({ status: 200, data: ele });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const syncAcService = async (req, res) => {
    try {
        let allConfigures = {};
        let Configure = {};
        Object.assign(Configure, req.body);
        allConfigures = await ByBitsAccountService_1.default.getAccountInfoByUser(Configure);
        res.send({ status: "200", data: allConfigures });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const createNewUseWithConfigure = async (req, res) => {
    let Configure = {};
    Object.assign(Configure, req.body);
    // if ( !Configure.userId || !Configure.keyName || !Configure.apiKey || !Configure.secretKey || !Configure.ipRestriction || !Configure.permissions ) {
    if (!Configure.apiKey || !Configure.secretKey) {
        res.status(400).send({ status: 400, error: "One of the following keys is missing or is empty in request body" });
        return;
    }
    try {
        let allConfigures = {};
        let acModel = {
            apiKey: req.body.apiKey,
            secreatKey: req.body.secretKey,
            userId: req.body.id
        };
        let userAv = await ischeckAvilableUser(acModel.apiKey, req.body.email, acModel.userId);
        switch (userAv) {
            case 1:
                res.status(400).send({ status: 400, error: "This Account is alredy registred" });
                return;
                break;
            case 2:
                res.status(400).send({ status: 400, error: "This Email already Registred..!!" });
                return;
                break;
            default:
                break;
        }
        allConfigures = await ByBitsAccountService_1.default.getAccountInfoByUser(acModel);
        let result = allConfigures.result;
        if (Object.keys(result).length == 0) {
            res.status(400).send({ status: 400, error: " You are not valid User...!!" });
            return;
        }
        if (result.isMaster != Configure.isMaster) {
            if (Configure.isMaster) {
                res.status(400).send({ status: 400, error: "Invalid account details...!!" });
                return;
            }
            else {
                res.status(400).send({ status: 400, error: "This is not primary account...!!" });
                return;
            }
        }
        if (result.isMaster == Configure.isMaster) {
            if (!Configure.isMaster) {
                const isMasterAv = await AccountService_1.default.isAvailble_Master_Valid(result.parentUid, acModel.userId);
                switch (isMasterAv) {
                    case 0:
                        res.status(400).send({ status: 400, error: "This Not Have Primary Account" });
                        return;
                        break;
                    case 1:
                        res.status(400).send({ status: 400, error: "This is not sub account of registered primary account" });
                        return;
                        break;
                    default:
                        break;
                }
                // if(!isMasterAv){
                // res .status(400).send({ status: 400, error: "This Not Have Primary Account"  });
                // return;}
            }
        }
        let User = {};
        Object.assign(User, req.body);
        if (!User.firstName || !User.lastName || !User.email || !User.type || !User.otp || !User.isActive) {
            res.status(400).send({ status: 400, error: "this is not Primary Ac" });
            return;
        }
        let createdUser = {};
        try {
            if (User.id == 0) {
                createdUser = await UserService_1.default.createNewUser(User);
            }
            else {
                createdUser = await UserService_1.default.updateOneUser(User.id, User);
            }
        }
        catch (error) {
            res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
            return;
        }
        let acDetail = {};
        Object.assign(acDetail, result);
        Configure.userId = createdUser.id;
        acDetail.userId = createdUser.id;
        acDetail.acUserID = result.userID;
        acDetail.id = 0;
        acDetail.acId = result.id;
        acDetail.secretKey = Configure.secretKey;
        acDetail.permissions = JSON.stringify(result.permissions);
        const createdConfigure = await ConfigureService_1.default.createAndUpdateConfigure(Configure);
        const AcDetailUser = await AccountService_1.default.createAndUpdateAccount(acDetail);
        res.status(200).send({ status: 200, data: createdConfigure, details: AcDetailUser });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.status) || 500).send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
const ischeckAvilableUser = async (apiKey, email, UserId = 0) => {
    try {
        let key = Encrypt_Decrypt_Service_1.default.encrypt(apiKey);
        const acDetails = await AccountService_1.default.getAllAccounts_Data();
        const UserDetails = await UserService_1.default.getAllUsers_Data();
        let isUserExists = UserDetails.filter((x) => x.email == email && x.id != UserId);
        let isAcExists = acDetails.filter((x) => x.apiKey == key && x.userId != UserId);
        if (isAcExists.length != 0) {
            return 1;
        }
        else {
            if (isUserExists.length != 0) {
                return 2;
            }
            else {
                return 0;
            }
        }
    }
    catch (error) {
        throw { status: (error === null || error === void 0 ? void 0 : error.status) || 500, message: (error === null || error === void 0 ? void 0 : error.message) || error };
    }
};
exports.default = {
    getAllConfigures,
    getOneConfigure,
    createNewConfigure,
    updateOneConfigure,
    deleteOneConfigure,
    syncAcService, getConfigureByUserId,
    createNewUseWithConfigure
    //getRecordsForConfigure,
};
