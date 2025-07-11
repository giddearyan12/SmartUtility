import express from 'express';
import {addCat, uploadImage, listEmp, listCategory} from '../controllers/CategoryController.js'
const categoryRouter = express.Router();
categoryRouter.post('/add',uploadImage, addCat);
categoryRouter.get('/:title', listEmp);
categoryRouter.post('/list', listCategory);
export default categoryRouter;