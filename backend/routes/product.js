import express from "express";
const router = express.Router();
import {getProductById, getProducts} from "../controllers/productController.js"

//description: fetch all products
//route: GET /api/products
//access: public
router.route("/").get(getProducts)

//description: fetch single product
//route: GET /api/products/:id
//access: public
router.route("/:id").get(getProductById)

export default router;
