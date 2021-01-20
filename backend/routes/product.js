import express from "express";
const router = express.Router();
import {getProductById, getProducts,getTopProducts, deleteProductById, updateProduct, createProduct, createProductReview} from "../controllers/productController.js"
import {protect,admin} from "../middleware/auth.js"

//description: fetch all products
//route: GET /api/products
//access: public
router.route("/")
    .get(getProducts)
    .post(protect,admin, createProduct)

//top products
router.route("/top").get(getTopProducts)

//description: fetch single product
//route: GET /api/products/:id
//access: public
router.route("/:id")
    .get(getProductById)
    .delete(protect,admin, deleteProductById)
    .put(protect,admin, updateProduct)

router.route("/:id/reviews").post(protect, createProductReview)

export default router;
 