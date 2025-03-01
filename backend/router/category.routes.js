const category_controller = require("../controller/category.controller")
const auth_Mw = require("../middlewares/auth.mw")


module.exports = (app)=>{


    /**
    * used for creating the category
    * POST  localhost:8888/ecomm/api/v1/categories
    */
    app.post("/ecomm/api/v1/categories",[auth_Mw.verifyToken,auth_Mw.isAdmin],category_controller.createNewCategory)


    /**
    * used for fetchingg all the category
    *  GET   localhost:8888/ecomm/api/v1/categories/fetch
    */
    app.get("/ecomm/api/v1/categories/fetch",category_controller.fetchAllCategories)

    /**
     * used for fetching the category by Id
     * GET  localhost:8888/ecomm/api/v1/category/fetchByName
     */
    app.get("/ecomm/api/v1/category/fetchByName",category_controller.fetchCategoryByName)


    /**
    * used for updating the category
    * PUT   localhost:8888/ecomm/api/v1/categories/update
    */
    app.put("/ecomm/api/v1/categories/update/:id",[auth_Mw.verifyToken,auth_Mw.isAdmin],category_controller.updateCategory)

    /**
     * used for deleting all the categories
     * DELETE  localhost:8888/ecomm/api/v1/categories/deleteALL
     */
    app.delete("/ecomm/api/v1/categories/deleteALL",[auth_Mw.verifyToken,auth_Mw.isAdmin],category_controller.deleteAllCategories)

    /**
     * used for deleting individual category
     * DELETE  localhost:8888/ecomm/api/v1/categories/deleteByName
     */
    app.delete("/ecomm/api/v1/categories/deleteByName/:name",[auth_Mw.verifyToken,auth_Mw.isAdmin],category_controller.deleteCategoryByName)
}