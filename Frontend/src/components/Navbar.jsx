import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import LoginPop from './LoginPop/LoginPop'
import { jwtDecode } from 'jwt-decode'
import pro from '../assets/pro.jpeg'
import { useCity } from '../context/CityContext'
import { useAuthUser } from '../context/authUser';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const{authUser, setAuthUser} = useAuthUser();
  const url =`https://smartutility-2.onrender.com`;
  const [isLogin, setisLogin] = useState(false);
  const modalEl = useRef();
  const { city, setCity } = useCity();
  const [showMenu, setShowMenu] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)


  useEffect(() => {

    const handler = (e) => {
      if (!modalEl.current) {
        return;
      }
      if (!modalEl.current.contains(e.target)) {
        setShowMenu(false)
        setMobileMenu(false)

      }
    };

    document.addEventListener('click', handler, true);
    return () => {
      document.removeEventListener('click', handler)
    }


  }, [])


  const token = localStorage.getItem('token');

  let decodedToken;

  useEffect(() => {
    if (token) {
      setisLogin(true);
      decodedToken = jwtDecode(token);
    }
  }, [token])


  const handleOpenMenu = () => {
    if (showMenu) {
      setShowMenu(false);

    } else {

      setShowMenu(true);
    }
  }

  const handleLogout = async () => {
    setisLogin(false);
        setMobileMenu(false)

    localStorage.removeItem('token');
    localStorage.removeItem('city');
    await axios.get(`${url}/user/logout`, {
      withCredentials: true
    });
    setAuthUser(null);
    setCity('');
    toast.success('Logged Out...')
  }
  const openAppointments = () => {
    navigate('/appointments');
    setShowMenu(false);
        setMobileMenu(false)

  }
  const openProfile = () => {
    navigate('/profile');
    setShowMenu(false);
        setMobileMenu(false)

  }

  const [showLogin, setShowLogin] = useState(false)

  const handleLogin = () => {
    setShowLogin(true);
    document.body.classList.add('blur');
    setShowMenu(false);
        setMobileMenu(false)

  };


  const handleCloseLogin = () => {
    setShowLogin(false);
        setMobileMenu(false)

    document.body.classList.remove('blur');
  };
  return (
   <div className={showLogin ? 'navbar blur' : 'navbar'}>
    <div className="logo" onClick={() => navigate('/')}>
      Smart<span>Utility</span>
    </div>

    <div className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div className="navbar-list">
      <ol>
        <li onClick={() => navigate('/')}>HOME</li>
        <li onClick={() => navigate('/#services')}>CATEGORY</li>
        <li onClick={() => navigate('/postjob')}>POST JOB</li>
        <li onClick={() => navigate('/#footer')}>CONTACT US</li>
      </ol>
    </div>

    <div className="login">
      {isLogin ? (
        <div>
          <img className="profile-picture" onClick={handleOpenMenu} src={pro} alt="" />
          {showMenu && (
            <div className="menu" ref={modalEl}>
              <ul>
                <li onClick={openProfile}>My Profile</li>
                <li onClick={openAppointments}>My Appointments</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleLogin}>SIGN IN</button>
      )}
    </div>

    {mobileMenu && (
      <ul className="mobile-menu" ref={modalEl}>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/#services')}>Category</li>
        <li onClick={() => navigate('/postjob')}>Post Job</li>
        <li onClick={() => navigate('/#footer')}>Contact Us</li>
        {isLogin ? (
          <>
            <li onClick={openProfile}>My Profile</li>
            <li onClick={openAppointments}>My Appointments</li>
            <li onClick={handleLogout}>Logout</li>
          </>
        ) : (
          <li onClick={handleLogin}>SIGN IN</li>
        )}
      </ul>
    )}

    {showLogin && <LoginPop onClose={handleCloseLogin} />}
  </div>
  )
}

export default Navbar
