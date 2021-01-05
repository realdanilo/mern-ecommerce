import express from "express";
const router = express.Router();
import {authUser,getUserProfile, registerUser,updateUserProfile,getUsers, deleteUser} from "../controllers/userController.js"
import {protect,admin} from "../middleware/auth.js"
//description: fetch all products
//route: GET /api/users
//access: public
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post("/login",authUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/:id").delete(protect,admin,deleteUser)

export default router;
