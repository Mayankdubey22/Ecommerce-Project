const product_controller = require("../controller/product.controller")
const auth_Mw = require("../middlewares/auth.mw")

module.exports = (app)=>{
    /**
     * used for creating the product
     * POST  localhost:8888/ecomm/api/v1/product/create
     */
    app.post("/ecomm/api/v1/products/create",[auth_Mw.verifyToken,auth_Mw.isAdmin],product_controller.createNewProduct)

    /**
     * used for fetching the product from specific sub category
     * GET  localhost:8888/ecomm/api/v1/products/fetch
     */
    app.get("/ecomm/api/v1/products/fetch/:subCategoryId",product_controller.fetchAllProduct)

    /**
     * used for updating the product 
     * PUT  localhost:8888/ecomm/api/v1/products/update/:id
     */
    app.put("/ecomm/api/v1/products/update/:id",[auth_Mw.verifyToken,auth_Mw.isAdmin],product_controller.updateProduct)

    /**
     * used for deleting the product
     * DELETE  localhost:8888/ecomm/api/v1/products/delete/:id
     */
    app.delete("/ecomm/api/v1/products/delete/:id",[auth_Mw.verifyToken,auth_Mw.isAdmin],product_controller.deleteProduct)
}