import express from 'express';
import {loginUser, registerUser, getUser, getEmployee, getUserAppoints, updateUser, logout} from '../controllers/UserController.js';
import { checkAuthentication } from '../middleware/auth.js';
const userRouter = express.Router();


userRouter.post('/login', loginUser);
userRouter.get('/logout', logout);
userRouter.post('/update', updateUser);
userRouter.post('/register', registerUser);
userRouter.get('/getuser',checkAuthentication, getUser);
userRouter.post('/getemployee', getEmployee);
userRouter.get('/getuserappoints', getUserAppoints);
export default userRouter;