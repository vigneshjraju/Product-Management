import { Router } from "express";
import { signup , login, logout} from "../controllers/authcontroller.js";
import { authentication, userCheck } from "../Middleware/auth.js";
import { createProduct ,editProduct ,deleteProduct,getAllProducts,getProductDetail } from "../controllers/productcontroller.js";
import { upload } from "../Middleware/upload.js";
import { searchProducts,filterProducts,sortProducts } from "../controllers/productcontroller.js";

const router = Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout', logout);
router.post('/addproduct',authentication,userCheck,upload.fields([{name:'image',maxCount:1}]),createProduct);
router.patch('/editproduct/:id', authentication, upload.fields([{ name: 'image', maxCount: 1 }]), editProduct);
router.delete('/deleteproduct/:id', authentication,deleteProduct);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductDetail); 
router.get('/products/search', searchProducts);
router.get('/products/filter', filterProducts);
router.get('/products/sort', sortProducts);

export default router

