import { Router } from "express";
import { cart, cartItems, deleteProduct } from "../Controllers/cartController.js";
import fetchUser from "../Middleware/authMiddleware.js";

const router = Router();

router.post('/cart' ,fetchUser, cart);
router.get('/cartItems' ,fetchUser, cartItems);
router.delete('/deleteProduct' , deleteProduct);

export default router;