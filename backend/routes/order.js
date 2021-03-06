import express from "express";
const router = express.Router();
import {protect,admin} from "../middleware/auth.js"
import {addOrderItems, getOrderByID,updateOrderToPaid,getMyOrders, getOrders, updatedOrderToDelivered} from "../controllers/orderController.js"

router.route("/").post(protect,addOrderItems).get(protect,admin,getOrders)
router.route("/myorders").get(protect,getMyOrders)
router.route("/:id").get(protect,getOrderByID)
router.route("/:id/pay").put(protect,updateOrderToPaid)
router.route("/:id/deliver").put(protect,admin, updatedOrderToDelivered)


export default router;  