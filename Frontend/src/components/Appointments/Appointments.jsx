import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import './Appointments.css'
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
    const url = 'https://smartutility-2.onrender.com';
    const token = localStorage.getItem('token');
    const [userRole, setUserRole] = useState('');
    const [userAppointments, setUserAppointments] = useState([]);
    const [empAppointments, setEmpAppointments] = useState([]);
    let userId;

    if (token) {
        let decodedToken = jwtDecode(token);
        userId = decodedToken._id;
    }
    const handleStatus = async (id, status) => {
        try {
            const response = await axios.post(`${url}/job/cancel-appoint`, { id, status });
            toast.success(response.data.success)
            fetchData();
        } catch (error) {
            toast.error(error)
        }
    }

    const fetchData = async () => {
           if(!token){
            toast.warn("You are not Logged In")
            return;
        }
       const response = await axios.get(`${url}/user/getuser`, {
                params: { userId },
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
        const name = response.data.user.name;
        setUserRole(response.data.user.role);
        if (response.data.user.role == 'User') {
            const response1 = await axios.get(`${url}/user/getuserappoints`, {
                params: { name }
            })
            setUserAppointments(response1.data.appointments);
        }
        else {
            const response2 = await axios.get(`${url}/job/getappointments`, {
                params: { name }
            })
            setEmpAppointments(response2.data.appointments);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="appoint-section">
            {userRole === 'User' ?
                <table className="appoint-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{
                        userAppointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.employeeId.name}</td>
                                <td>{new Date(appointment.date).toLocaleString()}</td>
                                <td>{appointment.catId.name}</td>
                                <td>{appointment.address}</td>
                                <td>{appointment.status}</td>
                                <td >
                                    {
                                        appointment.status == 'pending' &&
                                        <button onClick={() => handleStatus(appointment._id, 'cancelled')}>Cancel</button>
                                    }
                                    {
                                        appointment.status == 'accepted' && <>
                                            <button onClick={() => handleStatus(appointment._id, 'completed')}>Completed</button>
                                            <button onClick={() => handleStatus(appointment._id, 'cancelled')}>Cancel</button></>
                                    }

                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
                :
                <table className="appoint-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empAppointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.userId.name}</td>
                                    <td>{new Date(appointment.date).toLocaleString()}</td>
                                    <td>{appointment.catId.name}</td>
                                    <td>{appointment.address}</td>
                                    <td>{appointment.status}</td>
                                    <td >
                                        {
                                            appointment.status == 'pending' && <><button onClick={() => handleStatus(appointment._id, 'accepted')}>Accept</button>
                                                <button onClick={() => handleStatus(appointment._id, 'rejected')}>Reject</button></>
                                        }
                                        {
                                            appointment.status == 'accepted' &&
                                            <button onClick={() => handleStatus(appointment._id, 'rejected')}>Reject</button>
                                        }
                                        {
                                            appointment.status == 'rejected' && <button onClick={() => handleStatus(appointment._id, 'accepted')}>Accept</button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            }

        </div>
    )
}
export default Appointments;
