import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CardEmp.css'
import pro from '../../assets/pro.jpeg'
import axios from 'axios'


const CardEmp = ({ name, email, address, title }) => {
  const url = 'http://localhost:4000';

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/empprofile', { state: { email, title  } })
  }
  return (
    <div className="card-emp" onClick={() => handleNavigate()}>
      <div className='bg-blue'></div>
      <div className='div2'>
        <h4>{name}</h4>
        
        <img src={pro} alt="" />
        <p>{email}</p>
      </div>

    </div>
  )
}

export default CardEmp
