import {Router} from 'express';
import { forgotPasswordController, getLoginUserController, loginController, logoutController, refreshTokenController, registerUserController, resetPassword, updateUserController, uploadAvatarController, verifyEmailController, verifyOtpController } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = new Router()


userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatarController)
userRouter.put('/update-user',auth,updateUserController)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyOtpController)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh-token',refreshTokenController)
userRouter.get('/user-details',auth,getLoginUserController)

export default userRouter