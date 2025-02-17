import express from 'express'
import { checkAuth, logout, signin, signup,updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.put('/update_profile',protectRoute , updateProfile) //vérification du token avant la mise à jour du token

router.get("/check",protectRoute,checkAuth);

export default router