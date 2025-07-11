import React from 'react'
import axios from 'axios'
import './App.css'
import { useState } from 'react'

const App = () => {
  const url = 'http://localhost:4000';
  const [data, setData] = useState({
    name:"",
    img:null,
  });

 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: files[0] 
    }));
  };


  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('img', data.img);
    let newUrl = url;
    newUrl+='/category/add';
    const response = await axios.post(newUrl, formData);
    if(response.data.success){
      console.log('Success')
    }
    else{
      alert(response.data.message)
    }
  } 

  return (
    <div>
      <form onSubmit={onSubmitHandler}  encType='multipart/form-data'>
        <h3>Add Category</h3>
        <input onChange={handleChange} type="text" name="name" placeholder="Category Name" required />
        <input onChange={handleFileChange} type="file" name="img" accept="image/*" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
