const mongoose = require("mongoose")

/**
 * Name and description of sub category
 */

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
},{timestamps: true, versionKey: false})

module.exports = mongoose.model("SubCategory",subCategorySchema)