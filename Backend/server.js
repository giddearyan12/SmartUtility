import express from 'express'
import userRouter from './routes/UserRouter.js'
import jobRouter from './routes/JobRouter.js'
import path from 'path'
import categoryRouter from './routes/CategoryRouter.js'
import cookieParser from 'cookie-parser'



const app = express()
import cors from 'cors'
import mongoose from 'mongoose'
const port = 4000


mongoose.connect('mongodb://127.0.0.1:27017/Subs')
.then(()=>console.log("MongoDB Connected"));



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(cookieParser())

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));


app.use('/user', userRouter);
app.use('/job', jobRouter);
app.use('/category', categoryRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})