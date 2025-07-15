import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './components/Category/Category';
import Profile from './components/Profile/Profile'
import EmpProfile from './components/EmpProfile/EmpProfile';
import PostJob from './components/JobPost/PostJob';
import Appointments from './components/Appointments/Appointments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthUser } from './context/authUser';
import { useCity } from './context/CityContext';

const App = () => {
  const { authUser } = useAuthUser();
  const {city, setCity}=useCity();

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:title" element={authUser?<Category />:<Home /> } />
        <Route path="/postjob" element={authUser?<PostJob />:<Home />} />
        <Route path="/empprofile" element={authUser?<EmpProfile />:<Home />} />
        <Route path="/appointments" element={authUser?<Appointments />:<Home />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Home />}
        />



      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />


    </div>
  )
}

export default App
