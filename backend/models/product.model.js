const mongoose = require("mongoose")

/**
 * define schema--
 * name
 * description
 * price
 * stock
 * image
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    image: [{
        type: String
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model("Product", productSchema)