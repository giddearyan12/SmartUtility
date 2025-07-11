import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    img:{type:String, required:true},
},{minimize:false});

const catModel = mongoose.models.cat || mongoose.model('cat',catSchema);
export default catModel;