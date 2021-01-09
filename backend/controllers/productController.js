import Products from "../models/productModel.js";
import asyncHandler from "express-async-handler";


//description: fetch all products
//route: GET /api/products
//access: public
const getProducts = asyncHandler(async (req,res)=>{
    const products = await Products.find();
    res.json(products);
})

//description: fetch single product
//route: GET /api/products/:id
//access: public
const getProductById = asyncHandler(async (req,res)=>{
    const product = await Products.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error(`Product not found`);
    }
})

//description: delete a product by id
//route: Delete /api/products/:id
//access: private/admin
const deleteProductById = asyncHandler(async (req,res)=>{
    const product = await Products.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({message:"Product Removed"})
    } else {
      res.status(404);
      throw new Error(`Product not found`);
    }
})

export {getProducts,getProductById, deleteProductById}