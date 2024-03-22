import { Router } from "express";
import { cart } from "../Controllers/cartController.js";
import fetchUser from "../Middleware/authMiddleware.js";

const router = Router();

router.post('/cart' ,fetchUser, cart);

export default router;