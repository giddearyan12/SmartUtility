import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job', 
    required: true,
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cat', 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  address:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed','cancelled'], 
    default: 'pending',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
}
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
