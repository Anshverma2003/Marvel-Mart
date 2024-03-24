import { Router } from "express";
import { address, getAddress } from "../Controllers/buyController.js";
import fetchUser from "../Middleware/authMiddleware.js";

const router = Router();

router.post('/address', fetchUser, address);
router.get('/getAddress' , fetchUser , getAddress);

export default router;