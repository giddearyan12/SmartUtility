import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Card.css';

const Card = () => {
  const url = 'http://localhost:4000';
  const [catData, setCatData] = useState([]);

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
    navigate(`/category/${title}`); 
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
