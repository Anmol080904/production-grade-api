import { signUp } from '#controllers/auth.controller.js';
import express from 'express';
const authRouter=express.Router();
authRouter.post('/sign-up',signUp);
authRouter.post('/sign-in',(req,res)=>{
  res.send('POST /api/auth/sign-in response' );
});
authRouter.post('/sign-out',(req,res)=>{
  res.send('POST /api/auth/sign-out response');
});
export default authRouter;
