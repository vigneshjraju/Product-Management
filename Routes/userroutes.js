import { Router } from "express";
import { signup , login, logout} from "../controllers/authcontroller.js";
import { authentication, userCheck } from "../Middleware/auth.js";
import { createProduct } from "../controllers/productcontroller.js";
import { upload } from "../Middleware/upload.js";

const router = Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout', logout);
router.post('/addproduct',authentication,userCheck,upload.fields([{name:'image',maxCount:1}]),createProduct)

export default router

