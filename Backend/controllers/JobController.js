import jobModel from "../models/JobModel.js";
import userModel from "../models/UserModel.js";
import Appointment from "../models/Appointment.js";
import validator from "validator";
import catModel from "../models/CatModel.js";

const postJob = async (req, res) => {
  const { name, email, phone, experience, city, category, availability } = req.body;
  try {
    const exists = await jobModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      console.log(email)
      return res.json({ success: false, message: "Incorrect Email" });
    }

    const catId = await catModel.findOne({ name: category });
    const newJob = new jobModel({
      name: name,
      email: email,
      phone: phone,
      experience: experience,
      city: city,
      catId: catId,
      availability: availability,
    });

    const user = await userModel.findOne({ email: email });
    user.role = "Employee";
    user.save();

    const job = await newJob.save();

    res.json({ success: true, message: "True" })

  }
  catch (error) {
    console.log(error)
    return res.json({ success: false, message: error })
  }
}

const bookAppoint = async (req, res) => {
  const { formData } = req.body;
  try {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const appointmentDate = new Date(formData.appointmentDate);
    const day = days[appointmentDate.getDay()];

    const employee = await jobModel.findOne({ name: formData.employee });
    const appointments = await Appointment.find({ employeeId: employee });
    const twohours = 2 * 60 * 60 * 1000;
    if (!employee.availability.includes(day)) {
      return res.status(200).json({
        success: false,
        message: `Not availble on ${day}`
      });
    }
    let x =true;;
    if (appointments.length > 0) {
      const isConflict = appointments.some((appointment) => {
        const existingdate = new Date(appointment.date);
        const newdate = new Date(formData.appointmentDate);
        const timeDiff = Math.abs(existingdate - newdate);
        if(timeDiff < twohours && (appointment.status =='rejected' || appointment.status =='cancelled')){
          x = false;
        }
        return timeDiff < twohours;
      })
      if (isConflict && x) {

        return res.status(200).json({
          success: false,
          message: "Not availble for this time"
        });
      }
    }
    const user = await userModel.findOne({ name: formData.user });

    const existingAppointment = await Appointment.findOne({
      userId: user._id,
      employeeId: employee._id,
      date: formData.appointmentDate,
      address: formData.address,

    });

    if (existingAppointment && (existingAppointment.status!=='rejected' || existingAppointment.status!=='cancelled')) {
      return res.status(200).json({ success: false, message: "Booking already exists!" });
    }
    const newappoint = new Appointment({
      userId: user,
      employeeId: employee,
      catId: employee.catId,
      address: formData.address,
      date: formData.appointmentDate,
      status: "pending",
      createdAt: Date.now(),
    })
    const appointment = newappoint.save();

    res.status(200).json({ success: true, message: 'Appointment booked successfully', appointment: appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
}

const getAppointments = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const employee = await jobModel.findOne({ name: name });
    const appointments = await Appointment.find({ employeeId: employee._id })
      .populate('userId', 'name')
      .populate('employeeId', 'name')
      .populate('catId', 'name');
    res.status(200).json({ success: true, message: 'Appointment booked successfully', appointments: appointments });

  } catch (e) {
    res.status(500).json({ error: "Error" });
  }

}

const cancelAppoint = async (req, res) => {
  const { id, status } = req.body;
  try {
    const deleteAppoint = await Appointment.findOne({ _id: id });
    deleteAppoint.status=status;
    deleteAppoint.save();
    res.status(200).json({ success: true, message: 'Appointment Cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: "Error" });

  }
}

export { postJob, bookAppoint, getAppointments, cancelAppoint };