const cart_model = require("../models/cart.model");
const product_model = require("../models/product.model");

/**
 * Controller for adding the product to the cart
 */
exports.addToCart = async (req, res) => {
    try {
        const userId = req.userId;  // Get user ID from token middleware
        const productId = req.body.productId; // Get product ID from request body

        // Validate product existence
        const checkProduct = await product_model.findById(productId);
        if (!checkProduct) {
            return res.status(404).send({ message: "Product not found" });
        }

        // Find the user's cart
        let cart = await cart_model.findOne({ user: userId });

        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new cart_model({
                user: userId,
                products: [{ product: productId, quantity: 1 }]
            });
        } else {
            // Ensure `products` array exists
            if (!cart.products) cart.products = [];

            // Check if product is already in the cart
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1; // Increase quantity
            } else {
                cart.products.push({ product: productId, quantity: 1 }); // Add new product
            }
        }

        // Save the cart
        await cart.save();
        res.status(200).send({ message: "Product successfully added to the cart", cart });

    } catch (err) {
        console.error("Error while adding product to the cart", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

/**
 * controller used for increasing or decreasing the product in the cart and if only one present then remove it from cart
 */
exports.updateCart = async (req, res) => {
    try {
        const userId = req.userId
        const productId = req.body.productId
        const action = req.body.action
        if (!productId || !action) {
            return res.status(400).send({
                message: "Product Id or action is required"
            })
        }

        //finding the users cart
        let cart = await cart_model.findOne({ user: userId })
        if (!cart) {
            return res.status(404).send({
                message: "Cart not found"
            })
        }

        //finding the product in the cart
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId)
        if (productIndex === -1) {
            return res.status(404).send({
                message: "Product not found in the cart"
            })
        }


        //updating the quantity
        if (action === "increase") {
            cart.products[productIndex].quantity += 1
        } else if(action === "decrease")
        {
            cart.products[productIndex].quantity -= 1
            if (cart.products[productIndex].quantity <= 0) {
                cart.products.splice(productIndex, 1)
            }
        } else{
            return res.status(400).send({
                message: "Invalid action, use increase or decrease"
            })
        }

        //saving in the cart
        await cart.save()
        res.status(200).send({
            message:"cart updated successfully", cart
        })


    } catch (err) {
        console.log("error occured while updating the cart", err)
        res.status(500).send({
            message: "error while updating the cart"
        })
    }
}

/**
 * controller for fetching the cart
 */
exports.fetchCart = async (req, res) => {
    try{
        const userId = req.userId

        //finding the users cart and populating the details
        const cart = await cart_model.findOne({user: userId}).populate("products.product")

        if(!cart){
            return res.status(404).send({
                message: "Cart is empty or not found"
            })
        }

        return res.status(200).send(cart)


    }catch(err){
        console.log("Error while fetching the cart",err)
        res.status(500).send({
            message: "Error while fetching the cart"
        })
    }
}

/**
 * controller for removing the product from yhe cart
 */
exports.deleteCart = async (req,res)=>{
    try{
        const userId = req.userId
        const productId = req.body.productId
    
        //finding the users cart
        const  cart = await cart_model.findOne({user: userId})
    
        if(!cart){
            return res.status(404).send({
                message : "Cart is empty or not found"
            })
        }
    
        //filter the product to be removed
        cart.products = cart.products.filter(p=>p.product.toString() !==productId)
    
        //update the cart
        await cart.save()
        
        res.status(200).send({
            message:"Product removed successfully",cart
        })
    }catch(err){
        console.log("Error while updating the cart")
        res.status(500).send({
            message:"Error while updating the cart"
        })
    }
}


//controller for clearing the cart
exports.clearCart = async (req,res)=>{
    try{
        const userId = req.user._id
    
        //finding the users cart
        const  cart = await cart_model.findOne({user: userId})
    
        if(!cart){
            return res.status(404).send({
                message : "Cart is empty or not found"
            })
        }
    
        //update the cart
        cart.products =[]
        await cart.save()
        
        res.status(200).send({
            message:"All product removed successfully from the cart",cart
        })
    }catch(err){
        console.log("Error while updating the cart")
        res.status(500).send({
            message:"Error while updating the cart"
        })
    }
}