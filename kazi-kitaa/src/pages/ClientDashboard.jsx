import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaBriefcase,
  FaSearch,
  FaComment,
  FaStar,
  FaUser,
  FaMapMarkerAlt,
  FaBell
} from 'react-icons/fa'

export default function ClientDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('jobs')
  const [jobs, setJobs] = useState([])
  const [notifications, setNotifications] = useState([])

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
                <h2>John Doe</h2>
                <p>Client</p>
                <div className="profile-stats">
                  <div className="stat">
                    <span>Jobs Posted</span>
                    <strong>12</strong>
                  </div>
                  <div className="stat">
                    <span>Active Jobs</span>
                    <strong>3</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-links-card">
              <h4>Dashboard Menu</h4>
              <ul>
                <li className={activeTab === 'jobs' ? 'active' : ''} 
                    onClick={() => setActiveTab('jobs')}>
                  <FaBriefcase /> My Jobs
                </li>
                <li className={activeTab === 'search' ? 'active' : ''} 
                    onClick={() => setActiveTab('search')}>
                  <FaSearch /> Search Workers
                </li>
                <li className={activeTab === 'chat' ? 'active' : ''} 
                    onClick={() => setActiveTab('chat')}>
                  <FaComment /> Messages
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
            <div className="post-box">
              <button className="new-job-btn" onClick={() => navigate('/jobs/new')}>
                <FaBriefcase /> Post New Job
              </button>
            </div>

            {/* Dynamic Content Based on Active Tab */}
            {activeTab === 'jobs' && (
              <div className="jobs-list">
                {jobs.map(job => (
                  <div key={job.id} className="feed-card">
                    <div className="job-header">
                      <h3>{job.title}</h3>
                      <span className={`status ${job.status}`}>{job.status}</span>
                    </div>
                    <p>{job.description}</p>
                    <div className="job-footer">
                      <span><FaMapMarkerAlt /> {job.location}</span>
                      <span>Budget: TZS {job.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="news-sidebar">
            <div className="news-card">
              <h3>Notifications <FaBell /></h3>
              <ul className="notification-list">
                {notifications.map(notif => (
                  <li key={notif.id} className={notif.isRead ? '' : 'unread'}>
                    <span className="notification-bullet">•</span>
                    <div>
                      <p className="notification-text">{notif.content}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}