/**This is the starting file of the project */

const express = require("express")
const mongoose = require("mongoose")
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")
const app = express()
app.use(express.json())


/**
 * making connection with mongodb
 */

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("Failed to connect")
})

db.once("open", () => {
    console.log("Connected to MongoDB")
    init()
})

async function init() {
    try {

        let user = await user_model.findOne({ userId: "admin" })

        if (user) {
            console.log("Admin is present")
            return
        }

    } catch (err) {
        console.log("error while reading the data", err)
    }

    try {

        user = await user_model.create({
            name: "Mayank Kumar",
            userId: "admin",
            email: "mayankkumar@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("welcome", 8)
        })
        console.log("Admin Created :", user)

    } catch (err) {
        console.log("Error occured while creating admin", err)
    }
}

/**
 * stih the route to the server
 */
require("../backend/router/auth.routes")(app)
require("../backend/router/category.routes")(app)
require("../backend/router/subCategory.routes")(app)
require("../backend/router/product.routes")(app)
require("../backend/router/cart.routes")(app)
require("../backend/router/order.routes")(app)
require("../backend/router/search.routes")(app)


/**
 * Start the server
 */

app.listen(server_config.PORT, () => {
    console.log("Server Started at port number : ", server_config.PORT)
})

