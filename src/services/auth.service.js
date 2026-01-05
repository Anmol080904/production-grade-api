// src/services/auth.service.js
import logger from '#config/logger.js';
import bcrypt from 'bcrypt';
import { db } from '#config/database.js';
import { users } from '#models/user.model.js';
import { eq } from 'drizzle-orm';

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    logger.error('Error encrypting data');
    throw new Error('Error hashing');
  }
};

export const createUser = async ({ name, email, password, role = 'user' }) => {
  try {
    // FIX 1: Added 'await' so we actually check the DB before proceeding
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      // It is good practice to throw a specific error message for the controller to catch
      throw new Error('User already exists'); 
    }

    const password_hash = await hashPassword(password);

    // FIX 2: Added .returning() to get the data back from Postgres
    const [newUser] = await db
      .insert(users)
      .values({ name, email, password: password_hash, role })
      .returning(); 
      
    // FIX 3: Actually return the user to the controller
    return newUser; 

  } catch (e) {
    logger.error(`Error creating the user: ${e.message}`);
    throw e;
  }
};