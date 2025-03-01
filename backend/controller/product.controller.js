const product_model = require("../models/product.model")
const subCategory_model = require("../models/subCategory.model")

/**
 * 1 controller for creating the product
 */
exports.createNewProduct = async (req, res) => {
    try {
        console.log("Request Body: ", req.body)

        //validating the request body
        if (!req.body || !req.body.name || !req.body.description || !req.body.price || !req.body.subCategory) {
            return res.status(400).send({
                message: "Invalid request body. Ensure all fields are provided"
            })
        }

        //check subcategory exist or not
        const checkSubCategory = await subCategory_model.findById(req.body.subCategory).populate("category")
        if (!checkSubCategory) {
            return res.status(404).send({
                message: "Sub-Category not found"
            })
        }

        //create the prooduct object
        const prod_data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            subCategory: req.body.subCategory,
            category: checkSubCategory.category,
            stock: req.body.stock || 0,
            image: req.body.image || []
        }

        //insert into mongodb
        const product_created = await product_model.create(prod_data)

        return res.status(201).send(product_created)

    } catch (err) {
        console.log("Error while creating the product")
        res.status(500).send({
            message: "Error while creating the product"
        })
    }
}

/**
 * 2 controller for fetching the product from specific sub category
 */
exports.fetchAllProduct = async (req,res)=>{
    try{
        const subCategoryId = req.params.subCategoryId

        //check subcategory exist or not
        const checkSubCategory = await subCategory_model.findById(subCategoryId)
        if(!checkSubCategory){
            return res.status(404).send({
                message: "Sub-Category not found"
            })
        }

        //fetch product from specific subcategory
        const fetch_Product = await product_model.find({subCategory: subCategoryId}).populate("subCategory","name description")

        if(fetch_Product.length === 0){
            return res.status(404).send({
                message: "No Product is found"
            })
        }

        res.status(200).send(fetch_Product)

    }catch(err){
        console.log("Error while fetching the product",err)
        res.status(500).send({
            message: "error while fetching the product"
        })
    }
}

/**
 * 3 controller for updating the product
 */
exports.updateProduct = async (req,res)=>{
    try{
        const productId = req.params.id

        //check if product exist or not
        const checkProduct = await product_model.findById(productId)
        if(!checkProduct){
            return res.status(404).send({
                message: "Product not found"
            })
        }

        //validate the request body
        if(!req.body.name && !req.body.description && !req.body.price && !req.body.subCategory){
            return res.status(400).send({
                message: "Invalid request Body. Ensure all fields are provided"
            })
        }

        //check if subcategory exist or not
        if(req.body.subCategory){
            const checkSubCategory = await subCategory_model.findById(req.body.subCategory)
            if(!checkSubCategory){
                return res.status(404).send({
                    message: "Sub Category not found"
                })
            }
        }

        //updating the product
        const update_Product = await product_model.findByIdAndUpdate(
            productId,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        res.status(200).send(update_Product)

    }catch(err){
        console.log("Error while updating the product")
        res.status(500).send({
            message: "Error while updating the product"
        })
    }
}

/**
 * 4 controller for deleting the product
 */
exports.deleteProduct = async (req,res)=>{
    try{
        const productId = req.params.id

        //check if product exist or not
        const checkProduct = await product_model.findById(productId)
        if(!checkProduct){
            return res.status(404).send({
                message: "Product not found"
            })
        }

        //delete the product
        const delete_Product = await product_model.findByIdAndDelete(productId)
        return res.status(200).send({
            message: "Product is deleted"
        })
    }catch(err){
        console.log("Error while deleting the product",err)
        res.status(500).send({
            message: "Error while deleting the product"
        })
    }
}