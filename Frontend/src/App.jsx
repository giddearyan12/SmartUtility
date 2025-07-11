import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './components/Category/Category';
import EmpProfile from './components/EmpProfile/EmpProfile';
import PostJob from './components/JobPost/PostJob';
import Appointments from './components/Appointments/Appointments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:title" element={<Category/>} />
        <Route path="/postjob" element={<PostJob/>} />
        <Route path="/empprofile" element={<EmpProfile/>} />
        <Route path="/appointments" element={<Appointments/>} />

        
        
      </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
          
      
    </div>
  )
}

export default App
