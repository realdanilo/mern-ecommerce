import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js"

//description: Create new Order
//route: PSOT /api/products
//access: private
const addOrderItems = asyncHandler(async (req,res)=>{
    const {orderItems, shippingAddress,paymentMethod, itemsPrice, taxPrice,shippingPrice,totalPrice}=req.body

    if(orderItems && orderItems.length ==0){
        res.status(400)
        throw new Error("No order items")
        return
    }
    else{
        const order = new Order({
            orderItems, 
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user:req.user._id
        })
        console.log("*******************")
        console.log("*******************")
        console.log(order)
        const createdOrder = await order.save()
        console.log(createdOrder)
        res.statusMessage(201).json(createdOrder)

    }
})
export default addOrderItems