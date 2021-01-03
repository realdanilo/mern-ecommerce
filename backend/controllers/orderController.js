import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js"

//description: Create new Order
//route: POST /api/products
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
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//description: Get order by ID
//route: GET /api/order/:id
//access: private
const getOrderByID = asyncHandler(async (req,res)=>{
   const order = await Order.findById(req.params.id).populate("user","name email")

   if(order){
       res.json(order)
   }else{
       res.status(404)
       throw new Error("Order not found")
   }
})

//description: Update order to paid
//route: GET /api/order/:id/pay
//access: private
const updateOrderToPaid = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id)
 
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id:req.body.id,
            status: req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }
        await order.save()
        res.json(order)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }
 })
// Get logged in user orders
// route : /api/orders/myorders
// access Private

 const getMyOrders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({user:req.user._id})
 
    if(orders){
        return res.json(orders)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }
 })
export { addOrderItems, getOrderByID,updateOrderToPaid,getMyOrders}