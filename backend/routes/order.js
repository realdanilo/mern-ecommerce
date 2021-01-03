import express from "express";
const router = express.Router();
import {protect} from "../middleware/auth.js"
import {addOrderItems, getOrderByID,updateOrderToPaid,getMyOrders} from "../controllers/orderController.js"

router.route("/").post(protect,addOrderItems)
router.route("/myorders").get(protect,getMyOrders)
router.route("/:id").get(protect,getOrderByID)
router.route("/:id/pay").put(protect,updateOrderToPaid)


export default router;  