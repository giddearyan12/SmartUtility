import React, { useEffect, useState } from 'react';
import './EmpProfile.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import pro from '../../assets/pro.jpeg';
import axios from 'axios';

const EmpProfile = () => {
  const url ='https://smartutility-2.onrender.com'
  const location = useLocation();
  const [catImg, setCatImg] = useState('');
  const [data, setData] = useState({});
  const [userdata, setUserData] = useState({});
  const [formData, setFormData] = useState({
    user: '',
    employee:'',
    category:'',
    address: '',
    appointmentDate: '',
  });
  const { email, title } = location.state;
  const fetchEmpData = async () => {
    try {
      const response = await axios.post(`${url}/user/getemployee`, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setData(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error');
    }
  };
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = jwtDecode(token)._id;
      const response = await axios.get(`${url}/user/getuser`, {
        params: { userId },
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${token}`
        },
        withCredentials: true,
      });
      setUserData(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error');
    }
  };
  const fetch = async () => {
    try {
      const newurl = `${url}/category/${title}`;
      const response = await axios.get(newurl);
      const imageUrl = `${url}/${response.data.img}`;
      setCatImg(imageUrl);

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchEmpData();
    fetchUserData()
    fetch();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      formData.user = userdata.name;
      formData.employee = data.name;
      formData.category = data.catId;

     
      if (!token) {
        toast.warn("You are not LoggedIn")
        return;
      }
      if (userdata.email===data.email) {
        toast.warn("You can't book you own appointment !")
        return;
      }
      const response = await axios.post(`${url}/job/bookappointment`, { formData: formData });


      if (response.data.success) {
        toast.success("Appointment Booked 🎉", {

        });
      }
      else {
        toast.warn(response.data.message, {

        });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error(error);
    }
  };

  return (
    <div className="profile">
      <div className="left">
        <div className='left-container'>

          <form className="form2" onSubmit={handleSubmit}>
            <div className='left-header'>
              <img src={pro} alt="Profile" />
              <div id='header-text'>
                <h2>{data.name}</h2>
                <p>{data.phone}</p>
                <div> Available on : [{" "}
                {
                data.availability?
                  data.availability.map((day, index)=>(
                    <span style={{fontSize:'12px'}} key={index}>
                      {day}
                      {index !== data.availability.length - 1 && ', '}
                    </span>
                  )):''
                }
                {" "}]
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={userdata.name || ""}
                readOnly
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="appointmentDate">Appointment Date & Time</label>
              <input
                type="datetime-local"
                name="appointmentDate"
                id="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </div>

            <button className="book" type="submit">Book Appointment</button>
          </form>



        </div>
      </div>
      <div className="right">
        <img className='right-img' src={catImg} alt="Category-Image" />
        <div className="bg-darkblue"></div>
      </div>
    </div>

  );
};

export default EmpProfile;
