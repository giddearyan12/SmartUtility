import express from 'express';
import {loginUser, registerUser, getUser, getEmployee, getUserAppoints} from '../controllers/UserController.js'
const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.get('/getuser', getUser);
userRouter.post('/getemployee', getEmployee);
userRouter.get('/getuserappoints', getUserAppoints);
export default userRouter;