"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ByBitsUserPlaceOrderByLT_1 = __importDefault(require("../../services/ByBitsAc/ByBitsUserPlaceOrderByLT"));
const PlaceOrderService_1 = __importDefault(require("../../services/PlaceOrderService"));
const FollowTreaderService_1 = __importDefault(require("../../services/FollowTreaderService"));
const AccountService_1 = __importDefault(require("../../services/AccountService"));
const ByBitsAccountsService_1 = __importDefault(require("../../services/ByBits/ByBitsAccountsService"));
const UserService_1 = __importDefault(require("../../services/UserService"));
const ByBitsWebSocketClient_1 = __importDefault(require("../../services/ByBits/ByBitsWebSocketClient"));
const config = __importStar(require("../../../app.json"));
const Encrypt_Decrypt_Service_1 = __importDefault(require("../../services/Encrypt_Decrypt_Service"));
const LtPlaceOrderService_1 = __importDefault(require("../../services/LtPlaceOrderService"));
const CreateWsLeadTrack = async (LtData, reqdata) => {
    try {
        let readaats = JSON.parse(reqdata);
        let lt_OrdersList = readaats.data;
        let acData = await AccountService_1.default.getAllAccounts_Data();
        let followUsers = await FollowTreaderService_1.default.getAllFollows();
        // let Lt_ConfigData =  await AccountService.getDetailByKey(LtData.key,LtData.secret);
        let Lt_ConfigData = {};
        debugger;
        Lt_ConfigData = acData.filter(x => x.acUserID == LtData.acUserID).map(x => x);
        if (Lt_ConfigData.length != 0) {
            let ltUserId = Lt_ConfigData[0].userId;
            let ByUsers = followUsers.filter(x => x.treaderId == ltUserId);
            // let chkOrder = reqdata.data;
            // let ltWallet = await ByBitsAccountsService.get_Wallet_Balance(LtData);
            ByUsers.forEach(async (ele) => {
                try {
                    let _OrdersLst = await PlaceOrderService_1.default.getAllPlaceOrders_Data();
                    let diff = [];
                    // if (_OrdersLst.length != 0) {
                    //   let lt_OrdersList_Ids = _OrdersLst.filter(x=>x.UserId == ele.id).map(x => x.LtOrderId );
                    //   diff = lt_OrdersList_Ids.length != 0 ? lt_OrdersList.filter(x => !lt_OrdersList_Ids.includes(x.orderId)) : lt_OrdersList;
                    //   if (diff.length == 0) {
                    //     // res.status(400).send({ status: 400, error: "No data...!!" });
                    //     return 2;
                    //   }
                    // }else{
                    diff = lt_OrdersList;
                    // }
                    diff.forEach(async (orderLt) => {
                        debugger;
                        let ltPlaceOrderData = {};
                        ltPlaceOrderData.orderId = orderLt.orderId;
                        ltPlaceOrderData.orderStatus = orderLt.orderStatus;
                        ltPlaceOrderData.price = orderLt.price;
                        ltPlaceOrderData.qty = orderLt.qty;
                        ltPlaceOrderData.orderType = orderLt.orderType;
                        ltPlaceOrderData.detail = reqdata;
                        ltPlaceOrderData.closeDetail = orderLt.orderStatus == 'Cancelled' ? reqdata : '';
                        ltPlaceOrderData.userId = ltUserId;
                        ltPlaceOrderData.avBalance = Lt_ConfigData[0].avBalance;
                        ltPlaceOrderData.mainBalance = Lt_ConfigData[0].mainBalance;
                        ltPlaceOrderData.status = orderLt.orderStatus;
                        let ltcreateorder = await LtPlaceOrderService_1.default.createAndUpdateOrder(ltPlaceOrderData);
                        let userEle = acData.filter(x => x.acUserID == ele.userAccountId);
                        let acModel = {};
                        acModel.testnet = config.ByBit.IS_TESTNET;
                        acModel.key = Encrypt_Decrypt_Service_1.default.decrypt(userEle[0].apiKey);
                        acModel.secret = Encrypt_Decrypt_Service_1.default.decrypt(userEle[0].secretKey);
                        let userWallet = await ByBitsAccountsService_1.default.get_Wallet_Balance(acModel);
                        let place_Order = {};
                        Object.assign(place_Order, orderLt);
                        place_Order.orderFilter = 'Order';
                        let userBalance = userWallet.result.list[0].coin[0].availableToWithdraw;
                        let cal_Price = await WalletPriceCalculate(Lt_ConfigData[0].avBalance, orderLt.price, orderLt.qty, userBalance);
                        place_Order.price = cal_Price.toString();
                        debugger;
                        // let placedOrderRes = null ;
                        let placedOrderRes;
                        let placed_Order = {};
                        if (orderLt.orderStatus == 'New') {
                            Object.assign(placed_Order, place_Order);
                            placedOrderRes = await ByBitsUserPlaceOrderByLT_1.default.placeOrder(place_Order, acModel);
                            if (placedOrderRes.retCode != 0) {
                                return { status: 400, error: placedOrderRes.retMsg };
                            }
                            let resultOrder = placedOrderRes.result;
                            if (Object.keys(resultOrder).length == 0) {
                                return { status: 400, error: "Does not placed order...!!" };
                            }
                            placed_Order.orderId = orderLt.orderId;
                            placed_Order.orderLinkId = orderLt.orderId;
                        }
                        else {
                            placed_Order.status = orderLt.orderStatus == 'New' ? 0 : orderLt.orderStatus == 'Cancelled' ? 2 : 1;
                            if (orderLt.orderStatus == 'Cancelled') {
                                placedOrderRes = await ByBitsUserPlaceOrderByLT_1.default.cancelOrder(place_Order, acModel);
                                if (placedOrderRes.retCode != 0) {
                                    return { status: 400, error: placedOrderRes.retMsg };
                                }
                                let resultOrder = placedOrderRes.result;
                                if (Object.keys(resultOrder).length == 0) {
                                    return { status: 400, error: "Does not placed order...!!" };
                                }
                                placed_Order.orderLinkId = resultOrder.orderLinkId;
                            }
                        }
                        placed_Order.LtOrderId = orderLt.orderId;
                        placed_Order.LtOrderPrice = orderLt.price;
                        placed_Order.LtOrderQty = orderLt.qty;
                        placed_Order.LtOrderStatus = orderLt.orderStatus;
                        placed_Order.userBalance = userBalance;
                        placed_Order.status = 0;
                        placed_Order.userId = ele.userId;
                        placed_Order.LtUserId = ltUserId;
                        placed_Order.status = 0;
                        // let configUser = await ConfigureService.getByApiKey(acModel.key);
                        // let configLtUser = await ConfigureService.getByApiKey(LtModel.LTkey);
                        placed_Order.userConfigId = 0; // configUser.id; 
                        placed_Order.LtUserConfigId = 0; // configLtUser.id; 
                        let TreadCreate = await PlaceOrderService_1.default.createAndUpdateOrder(placed_Order);
                        return { status: 200, data: TreadCreate };
                    });
                    let ltWallet = await ByBitsAccountsService_1.default.get_Wallet_Balance(LtData);
                    Lt_ConfigData[0].avBalance = ltWallet.result.list[0].coin[0].availableToWithdraw;
                    Lt_ConfigData[0].mainBalance = ltWallet.result.list[0].coin[0].walletBalance;
                    let updateLt = await AccountService_1.default.updateOneAcDetail(Lt_ConfigData[0].id, Lt_ConfigData[0]);
                }
                catch (error) {
                    console.log('Error ', (error === null || error === void 0 ? void 0 : error.message) || error);
                    // return { status: error?.status || 500, error: error?.message || error };
                }
            });
        }
    }
    catch (error) {
        console.log('Error ', (error === null || error === void 0 ? void 0 : error.message) || error);
        // return { status: error?.status || 500, error: error?.message || error };
    }
};
const WalletPriceCalculate = async (ltwallet, ltprodPrice, ltQTY, userwallet) => {
    try {
        // const ltWallet = ltwallet;
        // const ltProdPrice = ltprodPrice;
        debugger;
        const priceQty = ((ltprodPrice * ltQTY) / 10) * 100;
        const percent = (priceQty / ltwallet) * 100;
        const userprice = ((userwallet * percent) / 100) * 10;
        // var cal_Percantage_LT = (ltProdPrice / ltWallet) * 100;
        // console.log('cal_Percantage_LT ', cal_Percantage_LT);
        // var parseCalPercentage = parseFloat(cal_Percantage_LT.toFixed(2));
        // let temp = (parseCalPercentage) / 100;
        // let totalUserData = userwallet;
        // let TotalPrice = temp * totalUserData;
        // var finalPrice = parseFloat(TotalPrice.toFixed(2));
        return userprice;
    }
    catch (error) {
        return 0;
    }
};
const ChkAcPlaceOrder = async (req, res) => {
    let data_temp = await CreateWsLeadTrack(req.body.LtData, req.body.reqdata);
    res.status(200).send({ status: 200, data: data_temp });
};
const OnWSInitByLeads = async () => {
    let userData = await UserService_1.default.getAllUsers_Data();
    let acData = await AccountService_1.default.getAllAccounts_Data();
    let LtUsers = userData.filter(x => x.type == 'LeadUser' && x.isDelete == 0).map(x => x.id);
    let followUsers = await FollowTreaderService_1.default.getAllFollows();
    let ltFollowers = followUsers.filter(x => LtUsers.includes(x.treaderId)).map(x => x.treaderId);
    let unique = ltFollowers.filter((value, index, arr) => index === arr.indexOf(value));
    if (ltFollowers.length != 0) {
        unique.forEach(async (ele) => {
            let ltData = acData.filter(x => x.userId == ele);
            let apiKey = Encrypt_Decrypt_Service_1.default.decrypt(ltData[0].apiKey);
            let secretKey = Encrypt_Decrypt_Service_1.default.decrypt(ltData[0].secretKey);
            let acUserID = ltData[0].acUserID;
            let lt_Model_Data = {
                key: apiKey,
                secret: secretKey
            };
            debugger;
            let ltWallet = await ByBitsAccountsService_1.default.get_Wallet_Balance(lt_Model_Data);
            ltData[0].avBalance = ltWallet.result.list[0].coin[0].availableToWithdraw;
            ltData[0].mainBalance = ltWallet.result.list[0].coin[0].walletBalance;
            let updateLt = await AccountService_1.default.updateOneAcDetail(ltData[0].id, ltData[0]);
            debugger;
            ByBitsWebSocketClient_1.default.WEBSubscribe(apiKey, secretKey, acUserID);
        });
    }
};
exports.default = {
    CreateWsLeadTrack, ChkAcPlaceOrder, OnWSInitByLeads
};
