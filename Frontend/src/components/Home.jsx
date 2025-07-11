import './Home.css'
import Card from './Pages/Card'
import one from '../assets/1.png'
import Footers from './Pages/Footers'
import { useCity } from '../context/CityContext'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const { city, setCity } = useCity();
  const [inputCity, setInputCity] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputCity.trim()) {
      localStorage.setItem('city', inputCity)
      setCity(inputCity);
      setInputCity('');
    }

  }
  const handleEdit=()=>{
    setCity('')
  }
  useEffect(() => {
  }, [city])
  

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {

        element.scrollIntoView({ behavior: 'smooth' });
      }
      
    }
    
  }, [location, city])

  return (
    <div className='homePage'>
      <div className="coverPage">
        <div className="description">
          <p id='animation-text'><span>Hire <span>Experts</span> &</span> <br />Get Your Job Done</p> <hr />
          {
            city ?  <div className='city-box'><p id='city-name'>City - {city}</p> <button onClick={handleEdit} id='city-box-btn'>✏️</button></div>: <form onSubmit={handleSubmit} action="">
              <input type="text" name='city' value={inputCity} placeholder='City' onChange={(e) => setInputCity(e.target.value)} />
              <button type='submit' id='sub' >Submit</button>
            </form>
          }
        </div>
        <div className="image">
          <div className="blue"></div>
          <div className="orange"></div>
          <img src={one} alt="" />
        </div>
      </div>
      <h2 className='services' id='services'><span>CATEGORIES</span><br /><p>Popular Category</p></h2>
      <div className="card-container">
        <Card />
      </div>
      <div className='footer' id='footer'>
        <Footers />
      </div>

    </div>
  )
}

export default Home
