import express from "express";
import { registerController ,loginController, testController, forgotPasswordController, updateProfileControllerexport } from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//Register || method POST
router.post('/register', registerController);

//LOGIN ROUTE || POST
router.post('/login', loginController);

// FORGOT PASSWORD || POST  
router.post('/forgot-password', forgotPasswordController )

//test routes
router.get('/test', requiredSignIn, isAdmin, testController);

//protected route || User
router.get('/user-auth', requiredSignIn, (req,res) => {
    res.status(200).send({ok: true});
})

//protected route || Admin
router.get('/admin-auth', requiredSignIn,isAdmin, (req,res) => {
    res.status(200).send({ok: true});
})
//update profile
router.put('/profile',requiredSignIn, updateProfileControllerexport)

export default router;