import express from 'express';
import UserController from '../controllers/UserController';
import UserValidation from '../middlewares/UserValidation';

const { validatesignUp, checkEmail } = UserValidation;
const { loginUser, signupUser } = UserController;
const userRouter = express.Router();

userRouter.post('/auth/login', loginUser);
userRouter.post('/auth/signup', checkEmail, validatesignUp, signupUser);

export default userRouter;
