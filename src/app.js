import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from '#routes/auth.routes.js';
const app=express();
app.use((req, res, next) => {
  console.log('🔥 REQUEST HIT:', req.method, req.url);
  next();
});

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined',{stream:{write:(message)=>{ logger.info(message.trim());}}}));
app.use(express.json());
app.get('/',(req,res)=>{
  logger.info('Hello from api');
  res.status(200).send('Hello world');
});
app.get('/health',(req,res)=>{
  res.status(200).json({status:'OK',timestamp: new Date().toISOString(),uptime:process.uptime()});
});
app.get('/api',(req,res)=>{
  res.status(200).json({message:'production api called.'});
});
app.use('/api/auth',authRouter);
export default app;