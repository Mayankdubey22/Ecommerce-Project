const cart_model = require("../models/cart.model")
const order_model = require("../models/order.model")
const product_model = require("../models/product.model")

/**
 * controller for placing the order
 */
exports.buyNow = async (req,res)=>{
    try{
        const userId = req.user._id

        //finding the users cart
        const cart = await cart_model.findOne({user: userId}).populate("products.product")

        if(!cart || !cart.products.length === 0){
            return res.status(400).send({
                message: "Your cart is empty, Add product to Buy"
            })
        }

        //calculating the total amount
        let totalAmount = 0
        for(const item of cart.products){
            totalAmount += item.product.price * item.quantity
        }

        //creating the new order
        const newOrder = new order_model({
            user: userId,
            products: cart.products,
            totalAmount
        })

        await newOrder.save()

        //reduce the product stock
        for(const item of cart.products){
            const product = await product_model.findOne(item.product._id)
            if(product){
                product.stock -= item.quantity
                await product.save()
            }
        }

        // Clear the cart after purchase
        cart.products = [];
        await cart.save();

        res.status(200).send({
            message: "Order placed successfully!",
            order: newOrder
        });


    }catch(err){
        console.log("Error while placing the order")
        res.status(500).send({
            message:"Error while placing the order"
        })
    }
}