import express from "express";
const router = express.Router();
import {authUser,getUserProfile, registerUser,updateUserProfile,getUsers} from "../controllers/userController.js"
import {protect,admin} from "../middleware/auth.js"
//description: fetch all products
//route: GET /api/users
//access: public
router.post("/", registerUser).get(protect,admin,getUsers)
router.post("/login",authUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)


export default router;
