const order_controller = require("../controller/order.controller")
const auth_Mw = require("../middlewares/auth.mw")

module.exports = (app)=>{
    /**
     * buy now option
     * POST  localhost:8888/ecomm/api/v1/order/buy
     */
    app.post("/ecomm/api/v1/order/buy",[auth_Mw.verifyToken],order_controller.buyNow)
}