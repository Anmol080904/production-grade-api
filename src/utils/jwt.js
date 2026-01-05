import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';
const jwt_secret=process.env.JWT_SECRET||'megha';
const jwt_expires='1d';
export const jwttoken={
  sign:(payload)=>{
    try{
      return jwt.sign(payload,jwt_secret,{expiresIn:jwt_expires});
    }
    catch(e){
      logger.error('Failed to authenticate!!',e);
      throw new Error('Failed to authenticate!!!');
    }

  },
  verify:(token)=>{
    try{
      return jwt.verify(token,jwt_secret);
    }
    catch(e){
      logger.error('Failed to authenticate');
      throw new Error('Failed to authenticate');
    }
  }
    
};