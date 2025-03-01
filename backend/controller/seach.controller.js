const product_model = require("../models/product.model")
const category_model = require("../models/category.model")
const subCategory_model = require("../models/subCategory.model")

exports.Search = async (req,res)=>{
    try{
        const { query } = req.query

        if(!query){
            return res.status(400).send({
                message:"Search query is required"
            })
        }

        //case sensitive search using mingoDB regex
        const regex = new RegExp(query, "i")

        //fetching matching document
        const product = await product_model.find({name: regex})
        const category = await category_model.find({name: regex})
        const subCategory = await subCategory_model.find({name: regex})

        res.status(200).send({
            message: "Search result fetched successfully",
            result:{
                product,
                category,
                subCategory
            },
        })
    }catch(err){
        console.log("Error while searching the Item")
        res.status(500).send({
            message:"Error while searching the Item"
        })
    }
}