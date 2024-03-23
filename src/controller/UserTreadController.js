"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ByBitsUserPlaceOrderByLT_1 = __importDefault(require("../services/ByBitsAc/ByBitsUserPlaceOrderByLT"));
const PlaceOrderService_1 = __importDefault(require("../services/PlaceOrderService"));
const GetOrder_PlaceOrder = async (req, res) => {
    try {
        let allOrders = {};
        let placedOrderRes = {};
        let acModel = {};
        Object.assign(acModel, req.body);
        let getOrder = {};
        Object.assign(getOrder, req.body);
        let LtModel = {};
        LtModel.LTkey = req.body.LTkey;
        LtModel.LTsecret = req.body.LTsecret;
        LtModel.LTtestnet = req.body.LTtestnet;
        allOrders = await ByBitsUserPlaceOrderByLT_1.default.get_Historic_Orders(getOrder, LtModel);
        let result = allOrders.result;
        if (Object.keys(result.list).length == 0) {
            res.status(400).send({ status: 400, error: "Does not have any orders...!!" });
            return;
        }
        let _LT_order = {};
        let lt_OrdersList = result.list;
        let _OrdersLst = await PlaceOrderService_1.default.getAllPlaceOrders_Data();
        let diff = [];
        if (_OrdersLst.length != 0) {
            let lt_OrdersList_Ids = _OrdersLst.map(x => x.LtOrderId);
            diff = lt_OrdersList.filter(x => !lt_OrdersList_Ids.includes(x.orderId));
            if (diff.length == 0) {
                res.status(400).send({ status: 400, error: "No data...!!" });
                return;
            }
        }
        let place_Order = {};
        _LT_order = diff.length != 0 ? diff[0] : lt_OrdersList[0];
        Object.assign(place_Order, _LT_order);
        place_Order.category = result.category;
        place_Order.orderFilter = 'Order';
        placedOrderRes = await ByBitsUserPlaceOrderByLT_1.default.placeOrder(place_Order, acModel);
        if (placedOrderRes.retCode != 0) {
            res.status(400).send({ status: 400, error: placedOrderRes.retMsg });
            return;
        }
        let resultOrder = placedOrderRes.result;
        if (Object.keys(resultOrder).length == 0) {
            res.status(400).send({ status: 400, error: "Does not placed order...!!" });
            return;
        }
        let placed_Order = {};
        Object.assign(placed_Order, place_Order);
        placed_Order.LtOrderId = _LT_order.orderId;
        placed_Order.LtOrderPrice = _LT_order.price;
        placed_Order.LtOrderQty = _LT_order.qty;
        placed_Order.LtOrderStatus = _LT_order.orderStatus;
        placed_Order.status = 0;
        // let configUser = await ConfigureService.getByApiKey(acModel.key);
        // let configLtUser = await ConfigureService.getByApiKey(LtModel.LTkey);
        placed_Order.userConfigId = 0; // configUser.id; 
        placed_Order.LtUserConfigId = 0; // configLtUser.id; 
        let TreadCreate = await PlaceOrderService_1.default.createOrder(placed_Order);
        res.send({ status: "200", data: TreadCreate });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
// const WalletPriceCalculate = (ltData:any,userData:any) =>{
const WalletPriceCalculate = async (req, res) => {
    try {
        const ltWallet = req.body.ltData.wallet;
        const ltProdPrice = req.body.ltData.prodPrice;
        var cal_Percantage_LT = (ltProdPrice / ltWallet) * 100;
        console.log('cal_Percantage_LT ', cal_Percantage_LT);
        let temp = (cal_Percantage_LT) / 100;
        let totalUserData = req.body.userData.wallet;
        let TotalPrice = temp * totalUserData;
        res.send({ status: "200", data: TotalPrice });
    }
    catch (error) {
        res
            .status((error === null || error === void 0 ? void 0 : error.status) || 500)
            .send({ status: (error === null || error === void 0 ? void 0 : error.status) || 500, error: (error === null || error === void 0 ? void 0 : error.message) || error });
    }
};
exports.default = {
    GetOrder_PlaceOrder, WalletPriceCalculate
};
