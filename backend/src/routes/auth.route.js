import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/signup" , signup);

authRouter.post("/login" , login);

authRouter.post("/logout" , logout);

authRouter.put('/update-profile' , );



export default authRouter;