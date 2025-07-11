import express from 'express';
import {postJob, bookAppoint, getAppointments, cancelAppoint} from '../controllers/JobController.js'
const jobRouter = express.Router();
jobRouter.post('/post', postJob);
jobRouter.post('/bookappointment',bookAppoint);
jobRouter.get('/getappointments',getAppointments);
jobRouter.post('/cancel-appoint',cancelAppoint);
export default jobRouter;