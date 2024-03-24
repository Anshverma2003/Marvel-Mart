import { Router } from "express";
import { address } from "../Controllers/buyController.js";
import fetchUser from "../Middleware/authMiddleware.js";

const router = Router();

router.post('/address', fetchUser, address);

export default router;