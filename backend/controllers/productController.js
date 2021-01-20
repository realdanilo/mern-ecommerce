import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";


//description: fetch all products
//route: GET /api/products
//access: public
const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find();
    res.json(products);
})

//description: fetch single product
//route: GET /api/products/:id
//access: public
const getProductById = asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
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
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({message:"Product Removed"})
    } else {
      res.status(404);
      throw new Error(`Product not found`);
    }
})

//description: create product
//route: POST /api/products/
//access: private/admin
const createProduct = asyncHandler(async (req,res)=>{

   const product = new Product({
     name:"Sample Name",
     price:0,
     user: req.user._id,
     image:"/images/sample.jpg",
     brand:"Sample Brand",
     category:"Sample Category",
     countInStock:0,
     numReviews:0,
     description:"Sample Description",
   })

   const createdProduct = await product.save();
   res.status(201).json(createdProduct)
})

//description: updated product
//route: PUT /api/products/:id
//access: private/admin
const updateProduct = asyncHandler(async (req,res)=>{

  const {name, price, description, image,brand,category, countInStock } =req.body

  const product = await Product.findById(req.params.id)
  if(product){
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock


    const updateProduct = await product.save();
    res.json(updateProduct)
  }else{
    res.status(404)
    throw new Error("product not found")
  }
})


//description: review product
//route: POST /api/products/:id/reviews
//access: private
const createProductReview = asyncHandler(async (req,res)=>{

  const {rating, comment } =req.body

  const product = await Product.findById(req.params.id)

  if(product){
    const alreadyReviewed = product.reviews.find( review => review.user.toString() === req.user._id.toString())

    if(alreadyReviewed){
      res.status(400)
      throw new Error("Product already reviewed")
    }

    const review = {
      name:req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce( (acc,item)=> item.rating + acc, 0)/ products.reviews.length
    await product.save()
    res.status(201).toJSON({message:"review added"})
  }else{
    res.status(404)
    throw new Error("product not found")
  }
})

export {getProducts,getProductById, deleteProductById, createProduct, updateProduct}