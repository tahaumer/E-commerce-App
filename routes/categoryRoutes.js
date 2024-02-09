import express from "express"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js"
import { categoryController, createCategoryController, deleteController, singleController, updateCategoryController } from "../controllers/categoryController.js"


const router = express.Router();

//routes

//creating category
router.post('/create-category',requiredSignIn, isAdmin, createCategoryController);

//updating category
router.put('/update-category/:id', requiredSignIn, isAdmin, updateCategoryController);

//getting all category
router.get('/all-category', categoryController);

//single category
router.get('/single-category/:slug', singleController);

//delete category
router.delete('/delete-category/:id', requiredSignIn, isAdmin, deleteController);


export default router;

