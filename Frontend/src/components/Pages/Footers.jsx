import React from 'react'
import './Footers.css'

const Footers = () => {
  return (
    <div className='footers'>
      <div id='footerss' className="footers-display">
      <div className="site-links">
        <h3>Site Links</h3>
          <ul>
            <li>Home</li>
            <li>Contact us</li>
            <li>category</li>
            <li>Features</li>
          </ul>
      </div>
      <div className="popular-cities">
        <h3>Popular Cities</h3>
      <ul>
            <li>Pune</li>
            <li>Kolhapur</li>
            <li>Banglore</li>
            <li>Goa</li>
          </ul>
      </div>
      <div className="contact-info">
        <h3>Contact-Info</h3>
      <ul>
            <li>India</li>
            <li>9022244910</li>
            <li>giddearyan222@gmail.com</li>
            <li>SmartUtility</li>
          </ul>
      </div>
      </div>
    </div>
  )
}

export default Footers
