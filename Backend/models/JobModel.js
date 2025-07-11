import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name:{type:String, required:true},
    catId:{type:mongoose.Schema.Types.ObjectId, ref:'catmodel', required:true},
    email:{type:String, required:true, unique:true},
    experience:{type:Number, required:true},
    availability:{type:[String], required:true},
    phone:{type:String, required:true, unique:true},
    city:{type:String, required:true},

},{minimize:false});

const jobModel = mongoose.models.job || mongoose.model('job',jobSchema);
export default jobModel;