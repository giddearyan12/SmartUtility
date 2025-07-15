import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCity } from '../../context/CityContext';
import './Card.css';
import { toast } from 'react-toastify';

const Card = () => {
  const url = 'https://smartutility-2.onrender.com';
  const [catData, setCatData] = useState([]);
  const {city, setCity} = useCity();

  const fetchData = async () => {
    try {
      const newurl = `${url}/category/list`;
      const response = await axios.post(newurl); 
      setCatData(response.data.categorys); 
    } catch (err) {
      console.error(err);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const navigate = useNavigate();

  const handleClick = (title) => {
    if(city){

      navigate(`/category/${title}`); 
    }
    else{
      toast.warn('Please Enter Your City...')
    }
  };
  return (
    <>
      {catData.map((cat, index) => {
        const imageUrl = `${url}/${cat.img}`;
        return (
          <div key={index} onClick={() => handleClick(cat.name)} className='card'>
            <img src={imageUrl} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        );
      })}
    </>
  );
}

export default Card;
