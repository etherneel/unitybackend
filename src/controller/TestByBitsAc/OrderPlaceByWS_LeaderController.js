"use strict";
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
const CreateWsLeadTrack = async (LtData, reqdata) => {
    try {
        let acData = await AccountService_1.default.getAllAccounts_Data();
        let followUsers = await FollowTreaderService_1.default.getAllFollows();
        // let Lt_ConfigData =  await AccountService.getDetailByKey(LtData.key,LtData.secret);
        let Lt_ConfigData = {};
        Lt_ConfigData = acData.filter(x => x.apiKey == LtData.key && x.secretKey == LtData.secret).map(x => x);
        if (Lt_ConfigData.length != 0) {
            let ltUserId = Lt_ConfigData[0].userId;
            let ByUsers = followUsers.filter(x => x.treaderId == ltUserId);
            // let chkOrder = reqdata.data;
            let lt_OrdersList = reqdata.data;
            let ltWallet = await ByBitsAccountsService_1.default.get_Wallet_Balance(LtData);
            ByUsers.forEach(async (ele) => {
                try {
                    let _OrdersLst = await PlaceOrderService_1.default.getAllPlaceOrders_Data();
                    let diff = [];
                    if (_OrdersLst.length != 0) {
                        let lt_OrdersList_Ids = _OrdersLst.filter(x => x.UserId == ele.id).map(x => x.LtOrderId);
                        diff = lt_OrdersList_Ids.length != 0 ? lt_OrdersList.filter(x => !lt_OrdersList_Ids.includes(x.orderId)) : lt_OrdersList;
                        if (diff.length == 0) {
                            // res.status(400).send({ status: 400, error: "No data...!!" });
                            return 2;
                        }
                    }
                    else {
                        diff = lt_OrdersList;
                    }
                    diff.forEach(async (orderLt) => {
                        let userEle = acData.filter(x => x.acUserID == ele.userAccountId);
                        let acModel = {};
                        acModel.key = userEle[0].apiKey;
                        acModel.secret = userEle[0].secretKey;
                        acModel.testnet = true;
                        let userWallet = await ByBitsAccountsService_1.default.get_Wallet_Balance(acModel);
                        let place_Order = {};
                        Object.assign(place_Order, orderLt);
                        place_Order.orderFilter = 'Order';
                        let userBalance = userWallet.result.list[0].totalEquity;
                        let cal_Price = await WalletPriceCalculate(ltWallet.result.list[0].totalEquity, orderLt.price, userBalance);
                        place_Order.price = cal_Price.toString();
                        let placedOrderRes = await ByBitsUserPlaceOrderByLT_1.default.placeOrder(place_Order, acModel);
                        if (placedOrderRes.retCode != 0) {
                            return { status: 400, error: placedOrderRes.retMsg };
                        }
                        let resultOrder = placedOrderRes.result;
                        if (Object.keys(resultOrder).length == 0) {
                            return { status: 400, error: "Does not placed order...!!" };
                        }
                        let placed_Order = {};
                        Object.assign(placed_Order, place_Order);
                        placed_Order.LtOrderId = orderLt.orderId;
                        placed_Order.LtOrderPrice = orderLt.price;
                        placed_Order.LtOrderQty = orderLt.qty;
                        placed_Order.LtOrderStatus = orderLt.orderStatus;
                        placed_Order.userBalance = userBalance;
                        placed_Order.status = 0;
                        // let configUser = await ConfigureService.getByApiKey(acModel.key);
                        // let configLtUser = await ConfigureService.getByApiKey(LtModel.LTkey);
                        placed_Order.userConfigId = 0; // configUser.id; 
                        placed_Order.LtUserConfigId = 0; // configLtUser.id; 
                        let TreadCreate = await PlaceOrderService_1.default.createOrder(placed_Order);
                        return { status: 200, data: TreadCreate };
                    });
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
const WalletPriceCalculate = async (ltwallet, ltprodPrice, userwallet) => {
    try {
        const ltWallet = ltwallet;
        const ltProdPrice = ltprodPrice;
        var cal_Percantage_LT = (ltProdPrice / ltWallet) * 100;
        console.log('cal_Percantage_LT ', cal_Percantage_LT);
        var parseCalPercentage = parseFloat(cal_Percantage_LT.toFixed(2));
        let temp = (parseCalPercentage) / 100;
        let totalUserData = userwallet;
        let TotalPrice = temp * totalUserData;
        var finalPrice = parseFloat(TotalPrice.toFixed(2));
        return finalPrice;
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
    debugger;
    let LtUsers = userData.filter(x => x.type == 'LeadUser' && x.isDelete == 0).map(x => x.id);
    let followUsers = await FollowTreaderService_1.default.getAllFollows();
    let ltFollowers = followUsers.filter(x => LtUsers.includes(x.treaderId)).map(x => x.treaderId);
    let unique = ltFollowers.filter((value, index, arr) => index === arr.indexOf(value));
    if (ltFollowers.length != 0) {
        unique.forEach(ele => {
            let ltData = acData.filter(x => x.userId == ele);
            ByBitsWebSocketClient_1.default.WEBSubscribe(ltData[0].apiKey, ltData[0].secretKey);
        });
    }
};
exports.default = {
    CreateWsLeadTrack, ChkAcPlaceOrder, OnWSInitByLeads
};
