import express from "express"; 
import { inicio_sesion, registro } from "../Controllers/auth.Controller.js";

const router = express.Router(); 

router.post("/registro", registro); 
router.post("/inicio_sesion", inicio_sesion); 

export default router; 