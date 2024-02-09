import express from 'express';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js"
import formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-product', requiredSignIn, isAdmin, formidable(),createProductController);

//routes
router.put( "/update-product/:pid", requiredSignIn, isAdmin, formidable(), updateProductController );

// get products
router.get('/get-product', getProductController);


// get single
router.get('/get-product/:slug', getSingleProductController);

// get photo
router.get('/product-photo/:pid', productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController)


//product count
router.get("/product-count", productCountController)

//search product
router.get('/search/:keyword', searchProductController)

//product per page
router.get("/product-list/:page", productListController)

//similar product
router.get("/related-product/:pid/:cid", relatedProductController)

//Category wise product
router.get("/product-category/:slug", productCategoryController)
export default router;