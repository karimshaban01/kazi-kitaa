import { use, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from './Header'
import axios from 'axios'
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaFileAlt,
  FaUser
} from 'react-icons/fa'

export default function ApplyScreen() {
  const navigate = useNavigate()
  const { worker_id } = useParams()
  const { jobId } = useParams()
  const user_data = JSON.parse(localStorage.getItem('user'))
  
  
  const [applicationData, setApplicationData] = useState({
    cover_letter: '',
    resume_url: '',
    portfolio_url: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    /* console.log(applicationData.description)
    console.log(user_data.id)
    console.log(jobId) */
    //navigate('/dashboard/client')

   fetch('http://localhost:2000'+`/api/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...applicationData,
        worker_id: user_data.id,
        job_id: jobId
      })
   })

  }

  

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content booking-layout">
          {/* Worker Preview */}
          {/* Left Sidebar */}
                    <div className="profile-sidebar">
                      <div className="profile-card">
                        <div className="profile-background"></div>
                        <div className="profile-info">
                          <div className="profile-avatar">
                            <FaUser size={40} />
                          </div>
                          <h2>{user_data.full_name}</h2>
                          <p>{user_data.role}</p>
                          <div className="profile-view-btn">
                            <button onClick={ 
                              (event)=>{event.preventDefault()
                                navigate(`/profile/${user_data.id}`)
                              } }>Angalia Wasifu Wako</button>
                          </div>
                        </div>
                        <div className="profile-stats">
                          <div className="stat">
                            <span>Watazamaji wa wasifu</span>
                            <strong>{user_data?.profile_views || 0}</strong>
                          </div>
                          <div className="stat">
                            <span>Kazi Zilizokamilika</span>
                            <strong>{user_data?.client_stats?.completed_jobs || 0}</strong>
                          </div>
                          <div className="stat">
                            <span>Kazi Zinazoendelea</span>
                            <strong>{user_data?.client_stats?.active_jobs || 0}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

          {/* Booking Form */}
          <div className="feed-section">
            <div className="post-box">
              <form onSubmit={handleSubmit} className="booking-form">
                <h2
                  onClick={() => navigate(`/jobs/${jobId}`)}
                >Apply for job : {jobId}</h2>

                <div className="form-group">
                  <FaFileAlt />
                  <textarea
                    name="cover_letter"
                    value={applicationData.description}
                    onChange={(e) => setApplicationData({...applicationData, cover_letter: e.target.value})}
                    placeholder="Tell us about your skills and experience"
                    required
                    className="form-input"
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <FaCalendarAlt />
                  <input
                    type="url"
                    name="resume_url"
                    placeholder="Resume URL (optional)"
                    value={applicationData.resume_url}
                    onChange={(e) => setApplicationData({...applicationData, resume_url: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <FaClock />
                  <input
                    type="url"
                    name="portfolio_url"
                    value={applicationData.portfolio_url}
                    onChange={(e) => setApplicationData({...applicationData, portfolio_url: e.target.value})}
                    placeholder="Portfolio URL (optional)"
                    className="form-input"
                    min="1"
                  />
                </div>

                
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}