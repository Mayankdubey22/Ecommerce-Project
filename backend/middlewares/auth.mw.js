/**
 * Create a mw will chek if the request body is proper and correct
 */

const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")

const verifySignupBody = async (req, res, next) => {
    try {
        //check the name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed! Name was not Provided in request body"
            })
        }

        //check for the email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed! Email was not Provided in request body"
            })
        }

        //check for the userID
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed! userID was not Provided in request body"
            })
        }

        //check if the user with the same userID is alredy present
        const user = await user_model.findOne({ userId: req.body.userId })

        if (user) {
            return res.status(400).send({
                message: "Failed! user with same userID is already present"
            })
        }

        next()

    } catch (err) {
        console.log("error while validating the request object", err)
        res.status(500).send({
            message: "error while validating the request body"
        })
    }
}

const verifySigninBody = async (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "UserId is not present"
        })
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "Password is not present"
        })
    }

    next()
}

const verifyToken = (req, res, next) => {
    //check if token is present in the header
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            message: "No token found: UnAuthorized"
        })
    }

    //if its the valid token
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "UnAuthorized !"
            })
        }

        try {
            const user = await user_model.findOne({ userId: decoded.id })
            if (!user) {
                return res.status(400).send({
                    message: "UnAuthorized , The user for this token doesn't exist"
                })
            }
            //set the user info in the req body
            req.user = user
            req.userId = user._id
            next()
        }catch(err){
            console.log("Error in verifyToken middleware:", err)
            res.status(500).send({
                message: "Internal Server Error"
            })
        }
    })

    //then move to the next step
}

const isAdmin = (req, res, next) => {
    const user = req.user
    if (user && user.userType == "ADMIN") {
        next()
    } else {
        res.status(403).send({
            message: "Only ADMIN users are allowed to access this endpoint"
        })
    }
}

module.exports = {
    verifySignupBody: verifySignupBody,
    verifySigninBody: verifySigninBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
}