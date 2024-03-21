import { Router } from "express";
import { product, productById } from "../Controllers/productController.js";

const router = Router();

router.get('/product', product);
router.get('/productID/:id' , productById)

export default router;