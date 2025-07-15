import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import './Profile.css'
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
    const token = localStorage.getItem('token');
    const url = `https://smartutility-2.onrender.com`;
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: "",
        role: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    useEffect(() => {
        if(!token){
            toast.warn("You are not Logged In")
            return;
        }
        const userId = jwtDecode(token)._id;
        const fetchData = async () => {
            const response = await axios.get(`${url}/user/getuser`, {
                params: { userId },
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const user = response.data.user;
            setData(user)
        }
        fetchData();

    }, [token])

    const handleSubmit=async()=>{
        try {
            const response = await axios.post(`${url}/user/update`, {data})
            setIsEditing(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="profile-box">
            <h1>My Profile</h1>
            <form className="profile-form">
                <label htmlFor="name">
                    Name:
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        name="name"
                        value={data.name}
                        readOnly={!isEditing}
                    />
                </label>

                <label htmlFor="email">
                    Email:
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        name="email"
                        value={data.email}
                        readOnly={true}
                    />
                </label>

                <label htmlFor="phone">
                    Phone:
                    <input
                        onChange={onChangeHandler}
                        type="tel"
                        name="phone"
                        value={data.phone}
                        readOnly={!isEditing}
                    />
                </label>

                <label htmlFor="role">
                    Role:
                    <select
                        onChange={onChangeHandler}
                        type="text"
                        name="role"
                        value={data.role}
                        disabled={!isEditing}
                    >
                        <option value="User">User</option>
                        <option value="Employee">Employee</option>
                    </select>
                </label>
            </form>
                 {isEditing ? <button  onClick={()=>{handleSubmit()}}>Save</button> : <button type="button" onClick={()=>{setIsEditing(true)}}>Update</button>}

        </div>
    )
}
export default Profile
