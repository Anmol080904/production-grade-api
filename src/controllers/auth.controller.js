import logger from '#config/logger.js';
import { createUser } from '#services/auth.service.js';
import { cookies } from '#utils/cookies.js';
import { formatValidationError } from '#utils/formatValidation.js';
import { jwttoken } from '#utils/jwt.js';
import { signUpSchema } from '#validations/auth.validations.js';

export const signUp = async (req, res, next) => {


  try {
    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation error',
        details: formatValidationError(result.error),
      });
    }

    const { name, email,password, role } = result.data;
    const user=await createUser({name,email,password,role});
    const token=jwttoken.sign({id:user.id,email:user.email,role:user.role});
    cookies.set(res,'token',token);
    logger.info(`User registered successfully: ${email}`);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name:user.name,
        email:user.email,
        role:user.role,
      },
    });
  } catch (e) {
    logger.error('Sign up error', e);
    next(e);
  }
};
