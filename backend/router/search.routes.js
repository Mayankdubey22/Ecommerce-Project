const search_controller = require("../controller/seach.controller")
const auth_Mw = require("../middlewares/auth.mw")

module.exports = (app)=>{
    /**
     * Searching option
     * GET  localhost:8888/ecomm/api/v1/search
     */
    app.get("/ecomm/api/v1/search",[auth_Mw.verifyToken], search_controller.Search)
}