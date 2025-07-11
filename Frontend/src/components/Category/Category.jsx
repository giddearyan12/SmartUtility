import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import CardEmp from '../Pages/CardEmp';

import './Category.css';
import { useCity } from '../../context/CityContext';

const Category = () => {
  const [empData, setEmpData] = useState([]);
  const [catImg, setCatImg] = useState('');
  const { title } = useParams(); 
  const url = 'http://localhost:4000'
    const { city, setCity } = useCity();


  const fetchData = async () => {
    
    try {
      const newurl = `${url}/category/${title}`; 
      const response = await axios.get(newurl); 
      const employees = response.data.employees;
      const filterdemp = employees.filter(emp=>emp.city == city);
      setEmpData(filterdemp);
       const imageUrl = `${url}/${response.data.img}`;
       setCatImg(imageUrl);
    } catch (err) {
     
      console.error(err);
    } 
  };

  useEffect(() => {
    fetchData();

  }, [title]); 

  return (
    <div>
      <div className='category-header'>
          <img src={catImg} alt="" />
          <h3 className='cat-title'>{title}</h3>
      </div>
      <div className="Emp_List">
        <h2>Employees Near You</h2>
        <div className='CardEmp'>
        {
          empData.map((emp, index) => (
            <CardEmp key={index} name={emp.name} email={emp.email} address={emp.address} title={title} />
          ))
        }
       </div>
      </div>
    </div>
  );
};

export default Category;
