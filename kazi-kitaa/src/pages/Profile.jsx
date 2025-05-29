import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import HeaderNav from './Header'
import {
  FaUser,
  FaBriefcase,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaStar,
  FaCertificate,
  FaTools
} from 'react-icons/fa'
import '../App.css';

export default function ProfileScreen() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState({
    user_id: '',
    full_name: '',
    email: '',
    phone: '',
    role: 'worker', // or 'client'
    location: {
      latitude: '',
      longitude: ''
    },
    available: true,
    verified: false,
    rating: 0,
    services: [],
    skills: [],
    experience: [],
    education: [],
    certifications: []
  })

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('http://localhost:2000'+`/api/users/${userId}`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })

        if (data.success && data.user) {
          // Transform the API response to match our profile structure
          setProfile({
            user_id: data.user.id,
            full_name: data.user.full_name,
            email: data.user.email,
            phone: data.user.phone_number,
            role: data.user.role,
            location: data.user.worker_profile?.location?.coordinates ? {
              latitude: data.user.worker_profile.location.coordinates[1],
              longitude: data.user.worker_profile.location.coordinates[0]
            } : { latitude: '', longitude: '' },
            available: data.user.worker_profile?.available || false,
            verified: data.user.is_verified,
            rating: data.user.rating || 0,
            services: data.user.worker_profile?.services || [],
            skills: data.user.worker_profile?.skills || [],
            experience: [], // Add if your API provides this
            education: [], // Add if your API provides this
            certifications: [] // Add if your API provides this
          })
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading profile')
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchUserProfile()
    }
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'latitude' || name === 'longitude') {
      setProfile(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      }))
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // API call to update profile
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="linkedin-layout">
        <HeaderNav />
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="linkedin-layout">
        <HeaderNav />
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content">
          {/* Left Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-background"></div>
              <div className="profile-info">
                <div className="profile-avatar">
                  <FaUser size={40} />
                </div>
                <h2>{profile.full_name || 'Your Name'}</h2>
                <p>{profile.role === 'worker' ? 'Professional Worker' : 'Client'}</p>
                {profile.verified && (
                  <span className="verified-badge">
                    <FaCertificate /> Verified
                  </span>
                )}
                {!isEditing && (
                  <div className="profile-view-btn">
                    <button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <span>Rating</span>
                  <strong><FaStar /> {profile.rating}/5</strong>
                </div>
                <div className="stat">
                  <span>Status</span>
                  <strong className={profile.available ? 'available' : 'unavailable'}>
                    {profile.available ? 'Available' : 'Busy'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="quick-links-card">
              <h4>Skills & Services</h4>
              <div className="topic-tags">
                {profile.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="feed-section">
            <div className="post-box">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="new-job-form">
                  <div className="form-group">
                    <FaUser />
                    <input
                      type="text"
                      name="full_name"
                      value={profile.full_name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <FaEnvelope />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <FaPhone />
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group location-inputs">
                    <FaMapMarkerAlt />
                    <input
                      type="number"
                      name="latitude"
                      value={profile.location.latitude}
                      onChange={handleChange}
                      placeholder="Latitude"
                      className="form-input"
                      step="any"
                    />
                    <input
                      type="number"
                      name="longitude"
                      value={profile.location.longitude}
                      onChange={handleChange}
                      placeholder="Longitude"
                      className="form-input"
                      step="any"
                    />
                  </div>

                  <div className="form-group">
                    <FaTools />
                    <select
                      name="services"
                      multiple
                      value={profile.services}
                      onChange={handleChange}
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

                  <button type="submit" className="submit-btn">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <FaEnvelope />
                    <span>{profile.email}</span>
                  </div>
                  <div className="detail-item">
                    <FaPhone />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt />
                    <span>
                      Location: {profile.location.latitude}, {profile.location.longitude}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="feed-card">
              <h3>Experience & Certifications</h3>
              <div className="experience-list">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <FaBriefcase />
                    <div>
                      <h4>{exp.title}</h4>
                      <p>{exp.description}</p>
                      <span className="duration">{exp.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="news-sidebar">
            <div className="news-card">
              <h3>Availability Schedule</h3>
              <div className="availability-slots">
                {/* Add availability slots here */}
                <div className="time-slot">
                  <FaClock />
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
            
            <div className="trending-topics-card">
              <h3>Recent Reviews</h3>
              <div className="reviews-list">
                {/* Add reviews here */}
                <div className="review-item">
                  <FaStar className="star-icon" />
                  <div>
                    <p className="review-text">Great work ethics!</p>
                    <span className="review-author">- John Doe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}