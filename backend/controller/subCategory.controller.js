const subCategory_model = require("../models/subCategory.model")
const category_model = require("../models/category.model")

/**
 * 1 Controller for creating the sub Category
 */
exports.createNewSubCategory = async (req, res) => {
    try {

        console.log("Request Body: ", req.body) // Debugging Log

        if (!req.body || !req.body.name || !req.body.description || !req.body.category) {
            return res.status(400).send({
                message: "Invalid request body. Ensure all fields (name, description, category) are provided."
            });
        }

        //Check if category exist
        const checkCategory = await category_model.findById(req.body.category)
        if (!checkCategory) {
            return res.status(404).send({
                message: "Category not found"
            })
        }

        //creating the sub category object
        const subCat_data = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        }

        //Insert into mongoDB
        const subCategory_created = await subCategory_model.create(subCat_data)

        return res.status(201).send(subCategory_created)

    } catch (err) {
        console.log("Error while creating sub category", err)
        res.status(500).send({
            message: "Error while creating sub category"
        })
    }
}


/**
 * 2 fetch all the subcategory from specific category
 */
exports.fetchAllSubCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        //check if category exist or not 
        const checkCategory = await category_model.findById(categoryId)
        if (!checkCategory) {
            return res.status(404).send({
                message: "Category not found"
            })
        }

        //fetch the subcategory from specific category
        const fetch_SubCategory = await subCategory_model.find({ category: categoryId }).populate("category", "name description")

        if (fetch_SubCategory.length === 0) {
            return res.status(404).send({
                message: "No Sub-Category found for this category"
            })
        }
        res.status(200).send(fetch_SubCategory)

    } catch (err) {
        console.log("Error while fetching the subcategory")
        res.status(500).send({
            message: "Error while fetching the subcategory"
        })
    }
}


/**
 * 3  update the sub category
 */
exports.updateSubCtategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id
        //check if subcategory exist or not
        const checkSubCategory = await subCategory_model.findById(subCategoryId)
        if (!checkSubCategory) {
            return res.status(404).send({
                message: "Sub-Category not found"
            })
        }

        //validate the request body
        if (!req.body.name && !req.body.description && !req.body.category) {
            return res.status(404).send({
                message: "Provide at least one field to update "
            })
        }

        //check if category exist or not
        if (req.body.category) {
            const checkCategory = await category_model.findById(req.body.category)
            if (!checkCategory) {
                return res.status(404).send({
                    message: "Category not found"
                })
            }
        }

        //update the sub category
        const update_subCategory = await subCategory_model.findByIdAndUpdate(
            subCategoryId,
            { $set: req.body },
            { new: true, runValidators: true }
        )
        res.status(200).send(update_subCategory)

    } catch (err) {
        console.log("Error while updating the sub category")
        res.status(500).send({
            message: "Error while updating the sub category"
        })
    }
}


/**
 * 4 delete the individual subcategory 
 */
exports.deleteSubCatgoryById = async (req,res)=>{
    try{
        const subCategoryId = req.params.id

        //check if sub category exist 
        const checkSubCategory = await subCategory_model.findById(subCategoryId)
        if(!checkSubCategory){
            return res.status(404).send({
                message: "Sub Category not found"
            })
        }

        //deleting the sub category
        const delete_SubCategory = await subCategory_model.findByIdAndDelete(subCategoryId)
        return res.status(200).send({
            message: " Sub Category deleted successfully"
        })

    }catch(err){
        console.log("Error while deleting the sub category")
        res.status(500).send({
            message: "Error while deleting the sub category"
        })
    }
}