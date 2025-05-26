import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTag,
  FaTools,
  FaLock,
  FaCheck
} from 'react-icons/fa'

export default function RegisterScreen() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    role: 'worker', // or 'client'
    location: {
      latitude: '',
      longitude: ''
    },
    services: [], // Only for workers
    skills: [], // Only for workers
  })

  const [step, setStep] = useState(1)

  // Update the handleChange function to properly handle skills array
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'latitude' || name === 'longitude') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      }))
    } else if (name === 'skills') {
      // Convert comma-separated string to array
      const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean)
      setFormData(prev => ({
        ...prev,
        skills: skillsArray
      }))
    } else if (name === 'services') {
      // Handle multiple select
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
      setFormData(prev => ({
        ...prev,
        services: selectedOptions
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }
    // API call to register user
    navigate('/login')
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
                <h2>Jisajili sasa</h2>
                <p>Jaza fomu ya usajili</p>
              </div>
            </div>
            
            <div className="quick-links-card">
              <h4>Maelekezo</h4>
              <ul>
                <li>
                  <FaUser /> Taarifa za msingi
                </li>
                <li>
                  <FaMapMarkerAlt /> Eneo na mawasiliano
                </li>
                <li>
                  <FaTools /> Ujuzi na utaalamu
                </li>
              </ul>
            </div>
          </div>

          {/* Main Form */}
          <div className="feed-section">
            <div className="post-box">
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-section">
                  <h3>Taarifa za Msingi</h3>
                  <div className="form-group">
                    <FaUser />
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Jina kamili"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <FaLock />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nywila"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <FaLock />
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      placeholder="Thibitisha nywila"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <FaUserTag />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="worker">Mtoa huduma</option>
                      <option value="client">Mteja</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Eneo na Mawasiliano</h3>
                  <div className="form-group">
                    <FaEnvelope />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Barua pepe"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <FaPhone />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Namba ya simu"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group location-inputs">
                    <FaMapMarkerAlt />
                    <input
                      type="number"
                      name="latitude"
                      value={formData.location.latitude}
                      onChange={handleChange}
                      placeholder="Latitude"
                      required
                      className="form-input"
                      step="any"
                    />
                    <input
                      type="number"
                      name="longitude"
                      value={formData.location.longitude}
                      onChange={handleChange}
                      placeholder="Longitude"
                      required
                      className="form-input"
                      step="any"
                    />
                  </div>
                </div>

                {formData.role === 'worker' && (
                  <div className="form-section">
                    <h3>Ujuzi na Utaalamu</h3>
                    <div className="form-group">
                      <FaTools />
                      <select
                        name="services"
                        multiple
                        value={formData.services}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="it">IT & Software</option>
                        <option value="sales">Sales & Marketing</option>
                        <option value="education">Education</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="construction">Construction</option>
                        <option value="hospitality">Hospitality</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <FaTools />
                      <textarea
                        name="skills"
                        value={formData.skills.length > 0 ? formData.skills.join(', ') : ''}
                        onChange={handleChange}
                        placeholder="Andika ujuzi (tenganisha kwa koma)"
                        className="form-input"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="submit-btn">
                  <FaCheck /> Kamilisha usajili
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
                    <p className="news-title">Taarifa sahihi</p>
                    <span className="news-time">Hakikisha taarifa zako ni sahihi</span>
                  </div>
                </li>
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Nywila salama</p>
                    <span className="news-time">Tumia nywila yenye usalama wa kutosha</span>
                  </div>
                </li>
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Eneo sahihi</p>
                    <span className="news-time">Weka coordinates sahihi za eneo lako</span>
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