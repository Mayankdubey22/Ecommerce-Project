const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ],
    totalAmount:{
        type: Number,
        required: true
    },
    status:{
        type:String,
        enum:["Pending","Processing","Shipped","Delivered","Cancelled"],
        default: "Pending"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{timestamps: true, versionKey: false})

module.exports = mongoose.model("Order",orderSchema)