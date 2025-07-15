import userModel from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import validator from 'validator';
import jobModel from "../models/JobModel.js";
import Appointment from "../models/Appointment.js";


const loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user || user.role !== role) {
            return res.json({ success: false, message: "Incorrect Credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Wrong Password" });
        }


        let cookieData = {
            _id: user._id,
            name: user.name,
            role: role,
        }
        const token = jwt.sign(cookieData, 'random#secret', {
            expiresIn: "5d",
        })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error })
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
        if (phone.length !== 10) {
            return res.json({ success: false, message: "Enter Valid Phone Number" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedpass,
            phone: phone,
            role: role,
            createdAt: Date.now(),

        });
        const user = await newUser.save();
        let cookieData = {
            id: newUser._id,
            name: name,
            role: role,
        }
        const token = jwt.sign(cookieData, 'random#secret', {
            expiresIn: "15d",
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error });
    }
}
const updateUser = async (req, res) => {
    const { data } = req.body;

    try {
        const a = await userModel.findOne({ email: data.email });
        const exists = await userModel.findOne({ name: data.name, _id: { $ne: a._id } });
        const phexists = await userModel.findOne({ phone: data.phone, _id: { $ne: a._id } });
        if (exists) {
            return res.json({ success: false, message: "Name Already Exists" });
        } Number
        if (phexists) {
            return res.json({ success: false, message: "Phone Already Exists" });
        }

        if (data.phone.length !== 10) {
            return res.json({ success: false, message: "Enter Valid Phone Number" });
        }

        const updateUser = await userModel.findOneAndUpdate(a._id,
            {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: data.role,
            },
            { new: true }
        );

        res.json({ success: true, user: updateUser })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error });
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
        const user = await userModel.findOne({ name });
        const appointments = await Appointment.find({ userId: user })
            .populate('userId', 'name')
            .populate('employeeId', 'name')
            .populate('catId', 'name');
        res.json({ message: 'Success', appointments: appointments });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const logout = (req, res) => {
    try {
        console.log('Its Working ')
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



export { loginUser, registerUser, getUser, getEmployee, getUserAppoints, updateUser, logout };
