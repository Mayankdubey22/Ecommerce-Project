/**
 * I need to write the controller / logic to register the user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")
const cart_model = require("../models/cart.model")
exports.signup = async (req, res) => {
    /**
     * Logic to create the user
     */

    //1 Read the request body
    const req_body = req.body

    //2 Insert the data in the User Collection in MongoDB
    const userObj = {
        name: req_body.name,
        userId: req_body.userId,
        email: req_body.email,
        userType: req_body.userType,
        password: bcrypt.hashSync(req_body.password, 8)
    }

    try {
        const user_created = await user_model.create(userObj)

        /**
         * return the user
         */

        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }

        //creating a cart
        const newcart = new cart_model({ user: user_created._id, products: [] })
        await newcart.save()
        console.log("Cart created for the user: ", newcart)


        res.status(201).send(res_obj)
    } catch (err) {
        console.log("Error while registering the user", err)
        res.status(500).send({
            message: "Some error occured while registering the user"
        })
    }

    //3 Return the response back to the user
}

exports.signin = async (req, res) => {
    //1 Checks if user is present or not
    const user = await user_model.findOne({ userId: req.body.userId })

    if (user == null) {
        return res.status(400).send({
            message: "User ID is passed is not a valid user ID"
        })
    }

    //password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Wrong Password "
        })
    }


    //using jwt we will create the access token with a given TTL and return

    const token = jwt.sign({ id: user.userId }, secret.secret, { expiresIn: 6000 })

    res.status(200).send({
        name: user.name,
        userID: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}