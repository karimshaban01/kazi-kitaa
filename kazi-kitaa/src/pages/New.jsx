import { useState } from "react";
import '../App.css'
import { useNavigate } from 'react-router-dom'
import HeaderNav from "./Header"
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaCalendar, 
  FaMoneyBillWave,
  FaFileAlt,
  FaClock
} from 'react-icons/fa'

export default function NewScreen() {
  const navigate = useNavigate()
  const [jobData, setJobData] = useState({
    service_id: '',
    description: '',
    location: {
      latitude: '',
      longitude: ''
    },
    scheduled_at: '',
    budget: '',
    duration: ''
  })

  const services = [
    { id: 1, name_en: 'IT & Software', name_sw: 'Teknolojia' },
    { id: 2, name_en: 'Sales & Marketing', name_sw: 'Uuzaji' },
    { id: 3, name_en: 'Education', name_sw: 'Elimu' },
    { id: 4, name_en: 'Healthcare', name_sw: 'Afya' },
    { id: 5, name_en: 'Construction', name_sw: 'Ujenzi' },
    { id: 6, name_en: 'Hospitality', name_sw: 'Ukarimu' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'latitude' || name === 'longitude') {
      setJobData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      }))
    } else {
      setJobData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would normally make an API call to create the job
    console.log(jobData)
    navigate('/jobs')
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content">
          {/* Left Guide */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-background"></div>
              <div className="profile-info">
                <h2>Tengeneza Kazi Mpya</h2>
                <p>Jaza taarifa zote muhimu</p>
              </div>
            </div>
            
            <div className="quick-links-card">
              <h4>Maelekezo</h4>
              <ul>
                <li>Chagua aina ya kazi</li>
                <li>Weka maelezo ya kina</li>
                <li>Onyesha eneo la kazi</li>
                <li>Weka bajeti na muda</li>
              </ul>
            </div>
          </div>

          {/* Main Form */}
          <div className="feed-section">
            <div className="post-box">
              <form onSubmit={handleSubmit} className="new-job-form">
                <div className="form-group">
                  <FaBriefcase />
                  <select 
                    name="service_id"
                    value={jobData.service_id}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Chagua aina ya kazi</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name_sw} / {service.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <FaFileAlt />
                  <textarea
                    name="description"
                    value={jobData.description}
                    onChange={handleChange}
                    placeholder="Maelezo ya kina kuhusu kazi"
                    required
                    className="form-input"
                    rows={4}
                  />
                </div>

                <div className="form-group location-inputs">
                  <FaMapMarkerAlt />
                  <input
                    type="number"
                    name="latitude"
                    value={jobData.location.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    required
                    className="form-input"
                    step="any"
                  />
                  <input
                    type="number"
                    name="longitude"
                    value={jobData.location.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    required
                    className="form-input"
                    step="any"
                  />
                </div>

                <div className="form-group">
                  <FaCalendar />
                  <input
                    type="datetime-local"
                    name="scheduled_at"
                    value={jobData.scheduled_at}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <FaMoneyBillWave />
                  <input
                    type="number"
                    name="budget"
                    value={jobData.budget}
                    onChange={handleChange}
                    placeholder="Bajeti (TZS)"
                    required
                    className="form-input"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <FaClock />
                  <input
                    type="number"
                    name="duration"
                    value={jobData.duration}
                    onChange={handleChange}
                    placeholder="Muda (masaa)"
                    required
                    className="form-input"
                    min="1"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <FaBriefcase /> Chapisha Kazi
                </button>
              </form>
            </div>
          </div>

          {/* Right Guide */}
          <div className="news-sidebar">
            <div className="news-card">
              <h3>Vidokezo</h3>
              <ul className="news-list">
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Maelezo ya Kina</p>
                    <span className="news-time">Eleza kazi kwa ufasaha</span>
                  </div>
                </li>
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Eneo Sahihi</p>
                    <span className="news-time">Weka coordinates sahihi</span>
                  </div>
                </li>
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Bajeti na Muda</p>
                    <span className="news-time">Weka bajeti na muda unaofaa</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}