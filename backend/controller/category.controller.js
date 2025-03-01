const category_model = require("../models/category.model")


/**
 * 1 Controller for creating the category
 */
exports.createNewCategory =async (req,res) =>{
    //read the body

    //create the category object
    const cat_data = {
        name: req.body.name,
        description : req.body.description
    }

    //Insert into mongodb
    try{
        const category_created = await category_model.create(cat_data)

        return res.status(201).send(category_created)
    }catch(err){
        console.log("error while creating the category", err)
        return res.status(500).send({
            message: "Error while creating the category"
        })
    }

    //return the response of the created category
}


/**
 * 2 Controller for fetching all the categories
*/
exports.fetchAllCategories = async (req, res)=>{
    try{
        const fetch_categories = await category_model.find()
        if (fetch_categories.length === 0){
            return res.status(404).send({
                message: "No category is present"
            })
        }
        res.status(200).send(fetch_categories)
    }catch(err){
        console.log("error while fetching the categories", err)
        res.status(500).send({
            message: "Error occured while fetching the categories"
        })
    }
}


/**
 * 2.1 Controller for fetching the individual category
 */
exports.fetchCategoryByName = async (req, res)=>{
    try{
        const fetch_categoryByName = await category_model.findOne({
            name: req.body.name
        })

        if(!fetch_categoryByName){
            return res.status(404).send({
                message: "Category not found"
            })
        }
        res.status(200).send(fetch_categoryByName)
    }catch(err){
        console.log("error while fetching the category",err)
        res.status(500).send({
            message: "Error while etching the category"
        })
    }
}


/**
 * 3 controller for updating the category
 */
exports.updateCategory = async (req, res)=>{
    try{
        const upd_category = await category_model.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if(!upd_category){
            return res.status(404).send({
                message: "Category not found"
            })
        }
        return res.status(200).send(upd_category)
    }catch(err){
        console.log("error while updating the category",err)
        res.status(500).send({
            message: "Error occured while updating the category"
        })
    }
}

/**
 * 4 controller for deleting all the categories
 */
exports.deleteAllCategories = async(req, res)=>{
    try{
        const del_AllCategories = await category_model.deleteMany({})

        if(del_AllCategories.deletedCount === 0){
            return res.status(400).send({
                message: "No category found to delete"
            })
        }
        res.status(200).send({
            message: `${del_AllCategories.deletedCount} categories deleted successfully`
        })
    }catch(err){
        console.log("Error while deleting all the categories",err)
        res.status(500).send({
            message: "Error while deleting all the categories"
        })
    }
}

/**
 * 4.1 controller for deleting individual category
 */
exports.deleteCategoryByName = async (req, res)=>{
    try{
        const del_CategoryByName = await category_model.deleteOne({name: req.params.name})
        if(del_CategoryByName.deletedCount === 0){
            return res.status(400).send({
                message: `Category with name ${req.params.name} is not found`
            })
        }
        return res.status(200).send({
            message: `Category ${req.params.name} deleted successfully`
        })
    }catch(err){
        console.log("Error while deleting the category")
        res.status(500).send({
            message: "Error while deleting the category"
        })
    }
}