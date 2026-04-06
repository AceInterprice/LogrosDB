import express from "express"; 
import { login, register, forgotPassword, resetPassword } from "../Controllers/auth.Controller.js";

const router = express.Router(); 

router.post("/register", register); 
router.post("/login", login); 
router.post("/forgot-password", forgotPassword); 
router.patch("/reset-password", resetPassword); // PATCH como pidió tu documento

export default router; 