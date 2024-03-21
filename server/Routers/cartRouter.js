import { Router } from "express";
import { cart } from "../Controllers/cartController.js";

const router = Router();

router.get('cart' , cart);