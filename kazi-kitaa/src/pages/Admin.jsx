import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaUsers,
  FaBriefcase,
  FaChartBar,
  FaCog,
  FaUserShield,
  FaDownload,
  FaBan,
  FaCheck
} from 'react-icons/fa'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({
    total_users: 0,
    total_jobs: 0,
    active_jobs: 0,
    completed_jobs: 0
  })

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content admin-layout">
          {/* Left Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-background"></div>
              <div className="profile-info">
                <div className="profile-avatar">
                  <FaUserShield size={40} />
                </div>
                <h2>Admin Dashboard</h2>
                <p>System Management</p>
              </div>
            </div>

            <div className="quick-links-card">
              <h4>Navigation</h4>
              <ul>
                <li 
                  className={activeTab === 'users' ? 'active' : ''} 
                  onClick={() => setActiveTab('users')}
                >
                  <FaUsers /> Users Management
                </li>
                <li 
                  className={activeTab === 'jobs' ? 'active' : ''} 
                  onClick={() => setActiveTab('jobs')}
                >
                  <FaBriefcase /> Jobs Management
                </li>
                <li 
                  className={activeTab === 'stats' ? 'active' : ''} 
                  onClick={() => setActiveTab('stats')}
                >
                  <FaChartBar /> Statistics
                </li>
                <li 
                  className={activeTab === 'settings' ? 'active' : ''} 
                  onClick={() => setActiveTab('settings')}
                >
                  <FaCog /> System Settings
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="feed-section">
            {activeTab === 'users' && (
              <div className="post-box">
                <div className="admin-header">
                  <h3>Users Management</h3>
                  <button className="download-btn">
                    <FaDownload /> Export Users
                  </button>
                </div>

                <div className="users-list">
                  {users.map(user => (
                    <div key={user.id} className="user-item">
                      <div className="user-info">
                        <FaUser className="user-avatar" />
                        <div>
                          <h4>{user.full_name}</h4>
                          <span>{user.email}</span>
                        </div>
                      </div>
                      <div className="user-actions">
                        <button className="verify-btn">
                          <FaCheck /> Verify
                        </button>
                        <button className="ban-btn">
                          <FaBan /> Ban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="stats-grid">
                <div className="stat-card">
                  <FaUsers className="stat-icon" />
                  <div>
                    <h3>{stats.total_users}</h3>
                    <p>Total Users</p>
                  </div>
                </div>

                <div className="stat-card">
                  <FaBriefcase className="stat-icon" />
                  <div>
                    <h3>{stats.total_jobs}</h3>
                    <p>Total Jobs</p>
                  </div>
                </div>

                {/* Add more stat cards */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}