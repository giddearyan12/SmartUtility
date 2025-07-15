import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import './LoginPop.css'
import {useAuthUser} from '../../context/authUser'

const LoginPop = ({ onClose }) => {
  const{authUser, setAuthUser} = useAuthUser();
  const url = 'http://localhost:4000';
  const [currState, setCurrState] = useState('Login')
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "User",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const handleState = (state) => {
    setCurrState(state)
  }

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/user/login'
    } else {
      newUrl += '/user/register'
    }

    try {
      const response = await axios.post(newUrl, data, {withCredentials: true});
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        toast.success("Welcome to SmartUtility 👋")
        setAuthUser({token:response.data.token});
        onClose();
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    }
  }

  return (
    <div className="Container">
      <div className='login-pop'>
        <form onSubmit={onLogin} className='login-form'>
          <h2>{currState === 'Login' ? 'LOGIN' : 'REGISTER'}</h2>
          <button onClick={onClose} className='close-pop'>X</button>

          {currState === 'Login' ?
            <>
              <input onChange={onChangeHandler} name='email' type="text" placeholder='Email..' required />
              <input onChange={onChangeHandler} name='password' type="password" placeholder='Password..' required />
              <select onChange={onChangeHandler} className='role-dropdown' value={data.role} name="role" >
                <option value="User">User</option>
                <option value="Employee">Employee</option>
              </select>
            </>
            :
            <>
              <input name='name' onChange={onChangeHandler} type="text" placeholder='Name..' required />
              <input onChange={onChangeHandler} name='email' type="text" placeholder='Email..' required />
              <input onChange={onChangeHandler} name='password' type="password" placeholder='Password..' required />
              <input onChange={onChangeHandler} name='phone' type="tel" placeholder='Phone..' required />
              <select onChange={onChangeHandler} className='role-dropdown' value={data.role} name="role" >
                <option value="User">User</option>
                <option value="Employee">Employee</option>
              </select>
            </>
          }
          <button className='submit' type="submit">Submit</button>

          {currState === 'Login' ? (
            <p onClick={() => handleState('Register')}>Create new Account</p>
          ) : (
            <p onClick={() => handleState('Login')}>Already Registered</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginPop;
