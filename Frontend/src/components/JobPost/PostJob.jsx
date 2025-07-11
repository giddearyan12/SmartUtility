import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify';

import './PostJob.css';

const PostJob = () => {
  const [userData, setUserData] = useState({});
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    city: '',
    category: '',
    availability: [],
  });

  const token = localStorage.getItem('token');
  useEffect(() => {
    const userId = jwtDecode(token)._id;
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/user/getuser', {
        params: { userId }
      })
      const user = response.data.user;
      setUserData(user);
    }
    fetchData();

  }, [token])


  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckBox = (day) => {
    setSelectedWeekDays((prev) => {
      const updatedDays = prev.includes(day) ?
        prev.filter(d => d !== day) :
        ([...prev, day]);

      setData((prevData) => ({ ...prevData, availability: updatedDays }));
      return updatedDays;
    })

  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    data.name = userData.name;
    data.email = userData.email;
    if(selectedWeekDays.length==0){
      toast.warn('Please Select Availablity')
      return;
    }
    console.log(data)
    const response = await axios.post('http://localhost:4000/job/post', data);
    if (response.data.success) {
      toast.success('Registration Successful');
    } else {
      toast.warn(response.data.message);
      

    }
  };

  return (
    <form className="postjob-form" onSubmit={onSubmitHandler}>
      <h2 id='post-job-title'>Post a Job <span >&#128188;</span></h2>
      <input onChange={onChangeHandler} type="text" name="name" value={userData.name || ""} readOnly required />
      <input onChange={onChangeHandler} type="email" name="email" value={userData.email || ""} readOnly required />
      <input onChange={onChangeHandler} type="tel" name="phone" placeholder='Phone' required />
      <input onChange={onChangeHandler} type="number" name="experience" placeholder="Experience" min={0} required />
      <input onChange={onChangeHandler} type="text" name="city" placeholder="City" required />
      <select name="category" onChange={onChangeHandler} defaultValue=""
        required>
        <option value="" disabled>Select Category</option>
        <option value="Plumber">Plumber</option>
        <option value="Electrician">Electrician</option>
        <option value="Mechanic">Mechanic</option>
        <option value="Cleaner">Cleaner</option>
        <option value="Beauty">Beauty</option>
        <option value="Carpenter">Carpenter</option>
      </select>
      <div className="weekdays-container">
        <h4>Select Available Days:</h4>
        <div className="checkbox-group">
          {weekdays.map((day) => (
            <label className="checkbox-label" key={day}>
              <input
                type="checkbox"
                value={day}
                checked={selectedWeekDays.includes(day)}
                onChange={() => handleCheckBox(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit">Submit Job</button>
    </form>

  );
};

export default PostJob;
