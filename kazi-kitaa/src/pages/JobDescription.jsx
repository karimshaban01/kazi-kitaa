import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaStar,
  FaBookmark
} from 'react-icons/fa'

export default function JobDescriptionScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [job, setJob] = useState({
    title: 'Software Developer',
    description: 'Detailed job description here...',
    requirements: [
      'Bachelor degree in Computer Science',
      '3+ years experience',
      'Strong problem-solving skills'
    ],
    budget: 50000,
    duration: '3 hours',
    location: {
      latitude: -6.776012,
      longitude: 39.178326,
      address: 'Dar es Salaam, Tanzania'
    },
    client: {
      name: 'John Doe',
      rating: 4.5,
      jobs_posted: 12
    },
    posted_at: new Date().toISOString(),
    applications: 5
  })

  const [isSaved, setIsSaved] = useState(false)

  const handleApply = () => {
    navigate(`/apply/${id}`)
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content job-description-layout">
          {/* Main Job Details */}
          <div className="feed-section">
            <div className="post-box job-header-card">
              <div className="job-title-section">
                <h1>{job.title}</h1>
                <button 
                  className={`save-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <FaBookmark /> {isSaved ? 'Saved' : 'Save Job'}
                </button>
              </div>

              <div className="job-quick-info">
                <span><FaMapMarkerAlt /> {job.location.address}</span>
                <span><FaMoneyBillWave /> TZS {job.budget}</span>
                <span><FaClock /> {job.duration}</span>
                <span><FaCalendarAlt /> Posted {new Date(job.posted_at).toLocaleDateString()}</span>
              </div>

              <button className="apply-btn main-action" onClick={handleApply}>
                Apply Now
              </button>
            </div>

            <div className="post-box">
              <h2>Job Description</h2>
              <p>{job.description}</p>

              <h2>Requirements</h2>
              <ul className="requirements-list">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="job-sidebar">
            <div className="post-box">
              <h3>About the Client</h3>
              <div className="client-info">
                <div className="client-header">
                  <FaUser className="client-avatar" />
                  <div>
                    <h4>{job.client.name}</h4>
                    <div className="client-rating">
                      <FaStar /> {job.client.rating}
                    </div>
                  </div>
                </div>
                <div className="client-stats">
                  <div className="stat">
                    <span>Jobs Posted</span>
                    <strong>{job.client.jobs_posted}</strong>
                  </div>
                  <div className="stat">
                    <span>Applications</span>
                    <strong>{job.applications}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-box">
              <h3>Job Location</h3>
              <div className="location-preview">
                {/* Add map preview here */}
                <div className="map-placeholder">
                  Map Preview
                </div>
                <p>{job.location.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}