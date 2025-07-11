import catModel from "../models/CatModel.js";
import jobModel from "../models/JobModel.js";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    },

})

const upload = multer({ storage: storage });
const uploadImage = upload.single('img')


const addCat = async(req, res)=>{
    const {name} = req.body;
    try{
        const exists = await catModel.findOne({name});
        if(exists){
            return res.json({success:false, message:"Already added"});
        }
        const newCat = new catModel({
            name:name,
            img:req.file.path
        })

        const cat = await newCat.save();
        res.json({success:true, message:"True"})
  
    }
    catch(error){
        return res.json({success:false, message:error})
        console.log(error)
    } 
}
const listEmp = async (req, res) => {
    try {
      const title = req.params.title; 
      const cat = await catModel.findOne({ name: title }); 
      const employees = await jobModel.find({ catId: cat}); 
      res.json({
        success: true,
        message: "Employees fetched successfully",
        employees: employees, 
        img: cat.img,
      });
    } catch (error) {
     
      
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  const listCategory= async(req, res)=>{
    try{
    const categorys = await catModel.find({});
    res.json({success:true, categorys});
    }
    catch(error){
        res.status(500).json({ success: false, message: "Server error" });
    }

  }
  

export {addCat, listEmp, uploadImage, listCategory}