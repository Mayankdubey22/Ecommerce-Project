const subCategory_controller = require("../controller/subCategory.controller")
const auth_Mw = require("../middlewares/auth.mw")

module.exports = (app) => {
    /**
     * used for creating the sub category
     * POST  localhost:8888/ecomm/api/v1/subCategory/create
     */
    app.post("/ecomm/api/v1/subCategory/create", [auth_Mw.verifyToken, auth_Mw.isAdmin], subCategory_controller.createNewSubCategory)

    /**
     * used for fetching all the subcategory
     * GET  localhost:8888/ecomm/api/v1/subCategory/fetchall
     */
    app.get("/ecomm/api/v1/subCategory/fetchall/:categoryId", subCategory_controller.fetchAllSubCategory)

    /**
     * used for updating the sub category
     * PUT  localhost:8888/ecomm/api/v1/subCategory/update/:id
     */
    app.put("/ecomm/api/v1/subCategory/update/:id", [auth_Mw.verifyToken, auth_Mw.isAdmin], subCategory_controller.updateSubCtategory)

    /**
     * used for deleting the individual sub category
     * DELETE  localhost:8888/ecomm/api/v1/subCategory/delete/:id
     */
    app.delete("/ecomm/api/v1/subCategory/delete/:id",[auth_Mw.verifyToken,auth_Mw.isAdmin],subCategory_controller.deleteSubCatgoryById)
}