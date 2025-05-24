import { useState } from 'react'
import '../App.css'
import HeaderNav from './Header'
import { Router, useNavigate } from 'react-router-dom'

function HomeScreen() {
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')

  const sendData = ()=>{
    alert(location + " " + jobType);
  }

  const regions = [
    'Mikoa yote', 'Arusha', 'Dar es Salaam',
    'Dodoma', 'Geita', 'Iringa', 'Kagera', 
    'Mwanza', 'Tanga', 'Zanzibar'
  ]

  const categories = [
    'Kazi zote',
    'IT & Software', 'Sales & Marketing', 'Education',
    'Healthcare', 'Construction', 'Hospitality'
  ]

  return (
    <>
    <HeaderNav></HeaderNav>
      <div className="new-body">
        <div className='hero-section'>
          <div className='hero-text'>
          <h1 className='hero-content'>Karibu Kazi Kitaa</h1>
          
          </div>
          
          <div className='hero-content search-box'>
            <form onSubmit={(e) => e.preventDefault()}>
              <select  
                name='region-name'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='Tafuta kwa mkoa' 
                className='location-input' 
              >
                <option value="">Mkoa wa sasa</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
              <select
                name='job_name' 
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className='job-type-select'
              >
                <option value="">Aina ya Kazi</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <button type="submit" className='search-btn' onClick={ sendData }>Tafuta Kazi</button>
            </form>
          </div>
        </div>

        {/* 

        <div className='job-categories'>
          <h2>Aina za Kazi</h2>
          <div className='category-grid'>
            {categories.map((category, index) => (
              <div key={index} className='category-card'>
                {category}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </>
  )
}

export default HomeScreen
