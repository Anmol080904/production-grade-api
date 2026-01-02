import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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
export default app;