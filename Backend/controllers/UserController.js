import userModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import validator from 'validator';
import jobModel from "../models/JobModel.js";
import Appointment from "../models/Appointment.js";


const loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await userModel.findOne({ email:email });
         
        if (!user || user.role !== role) {
            return res.json({ success: false, message: "Incorrect Credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Wrong Password" });
        }
       

        const token = jwt.sign({ _id: user._id }, 'random#secret', {
            expiresIn: "5d",
        })

        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Error" })
    }

}
const registerUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Incorrect Email" });
        }
        if (password.length < 6) {
            return res.json({ success: false, message: "Too short password" });
        }
        if(phone.length!==10){
            return res.json({ success: false, message: "Enter Valid Phone Number" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedpass,
            phone:phone,
            role: role,
            createdAt: Date.now(),

        });
        const user = await newUser.save();
        const token = jwt.sign({ _id: user._id }, 'random#secret', {
            expiresIn: "15d",
        })
        res.cookie('token', token, {
            httpOnly: true,   
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'Lax',  
        });
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error });
    }
}
const getUser = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'Success', user: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getEmployee = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const user = await jobModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'Success', user: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getUserAppoints = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const user = await userModel.findOne({name});
        const appointments = await Appointment.find({ userId: user})
        .populate('userId', 'name')
        .populate('employeeId', 'name')
        .populate('catId', 'name');
        res.json({ message: 'Success', appointments: appointments });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export { loginUser, registerUser, getUser, getEmployee, getUserAppoints };
