const cart_controller = require("../controller/cart.controller")
const auth_Mw = require("../middlewares/auth.mw")

module.exports = (app)=>{
    /**
     * adding product to the cart
     * POST  localhost:8888/ecomm/api/v1/cart/add
     */
    app.post("/ecomm/api/v1/cart/add",[auth_Mw.verifyToken],cart_controller.addToCart)

    /**
     * updating the cart 
     * PATCH   localhost:8888/ecomm/api/v1/cart/update
     */
    app.patch("/ecomm/api/v1/cart/update",[auth_Mw.verifyToken],cart_controller.updateCart)

    /**
     * fetching the cart
     * GET  localhost:8888/ecomm/api/v1/cart/fetch
     */
    app.get("/ecomm/api/v1/cart/fetch",[auth_Mw.verifyToken],cart_controller.fetchCart)


    /**
     * deleting the cart
     * DELETE   localhost:8888/ecomm/api/v1/cart/delete
     */
    app.delete("/ecomm/api/v1/cart/delete",[auth_Mw.verifyToken],cart_controller.deleteCart)

    /**clearing the cart
     * DELETE  localhost:8888/ecomm/api/v1/cart/clear
     */
    app.delete("/ecomm/api/v1/cart/clear",[auth_Mw.verifyToken],cart_controller.clearCart)
}