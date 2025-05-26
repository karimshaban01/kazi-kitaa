import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaUser,
  FaCalendarAlt,
  FaBriefcase,
  FaStar,
  FaTools,
  FaMapMarkerAlt,
  FaClock,
  FaBell
} from 'react-icons/fa'

export default function WorkerDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    full_name: 'Jane Doe',
    services: [],
    skills: [],
    hourly_rate: 0,
    available: true,
    rating: 4.5,
    location: {
      latitude: '',
      longitude: ''
    }
  })
  const [jobRequests, setJobRequests] = useState([])
  const [availability, setAvailability] = useState([])

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
                <h2>{profile.full_name}</h2>
                <p className={profile.available ? 'status-available' : 'status-busy'}>
                  {profile.available ? 'Available' : 'Busy'}
                </p>
                <div className="profile-stats">
                  <div className="stat">
                    <span>Rating</span>
                    <strong><FaStar /> {profile.rating}/5</strong>
                  </div>
                  <div className="stat">
                    <span>Jobs Done</span>
                    <strong>45</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-links-card">
              <h4>Dashboard Menu</h4>
              <ul>
                <li className={activeTab === 'profile' ? 'active' : ''} 
                    onClick={() => setActiveTab('profile')}>
                  <FaUser /> My Profile
                </li>
                <li className={activeTab === 'calendar' ? 'active' : ''} 
                    onClick={() => setActiveTab('calendar')}>
                  <FaCalendarAlt /> My Calendar
                </li>
                <li className={activeTab === 'jobs' ? 'active' : ''} 
                    onClick={() => setActiveTab('jobs')}>
                  <FaBriefcase /> Job Requests
                </li>
                <li className={activeTab === 'ratings' ? 'active' : ''} 
                    onClick={() => setActiveTab('ratings')}>
                  <FaStar /> My Ratings
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="feed-section">
            {activeTab === 'profile' && (
              <div className="post-box">
                <div className="profile-edit-form">
                  <h3>Professional Information</h3>
                  <div className="form-group">
                    <FaTools />
                    <select multiple className="form-input" name="services">
                      <option>IT & Software</option>
                      <option>Construction</option>
                      {/* Add more services */}
                    </select>
                  </div>

                  <div className="form-group">
                    <FaMapMarkerAlt />
                    <div className="location-inputs">
                      <input type="number" placeholder="Latitude" className="form-input" />
                      <input type="number" placeholder="Longitude" className="form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <FaClock />
                    <input 
                      type="number" 
                      placeholder="Hourly Rate (TZS)" 
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="jobs-list">
                {jobRequests.map(job => (
                  <div key={job.id} className="feed-card">
                    <div className="job-header">
                      <h3>{job.title}</h3>
                      <span className={`status ${job.status}`}>{job.status}</span>
                    </div>
                    <p>{job.description}</p>
                    <div className="job-actions">
                      <button className="accept-btn">Accept</button>
                      <button className="reject-btn">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="news-sidebar">
            <div className="news-card">
              <h3>Today's Schedule</h3>
              <div className="schedule-list">
                {availability.map(slot => (
                  <div key={slot.id} className="time-slot">
                    <FaClock />
                    <span>{slot.start_time} - {slot.end_time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="news-card">
              <h3>Notifications <FaBell /></h3>
              <ul className="notification-list">
                {/* Add notifications here */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}