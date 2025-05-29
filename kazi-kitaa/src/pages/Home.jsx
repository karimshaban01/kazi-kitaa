import { useState, useEffect } from 'react'
import '../App.css'
import HeaderNav from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { 
  FaBriefcase, 
  FaUser, 
  FaBuilding, 
  FaNetworkWired,
  FaBell,
  FaBookmark,
  FaTrophy,
  FaChartLine 
} from 'react-icons/fa'

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Fetch jobs when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('http://localhost:2000/api/jobs/list')
        setJobs(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Fetch user profile when component mounts
  const current_user = localStorage.getItem('user')
  const user_data = JSON.parse(current_user)
  console.log('Current User Data:', user_data)
  
  // Group jobs by service category
  const jobsByCategory = jobs.reduce((acc, job) => {
    const category = job.service.name_en
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(job)
    return acc
  }, {})

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/jobs', { state: { query: searchQuery } })
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
                  <strong>{user?.profile_views || 0}</strong>
                </div>
                <div className="stat">
                  <span>Kazi Zilizokamilika</span>
                  <strong>{user?.client_stats?.completed_jobs || 0}</strong>
                </div>
                <div className="stat">
                  <span>Kazi Zinazoendelea</span>
                  <strong>{user?.client_stats?.active_jobs || 0}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="feed-section">
            <div className="post-box">
              <div className="post-input">
                <FaUser className="avatar" />
                <form onSubmit={handleSearch}>
                  <input 
                    type="text" 
                    placeholder="Tafuta kazi, wafanyakazi, au kampuni..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>

            {loading ? (
              <div className="loading">Inapakia...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div className="feed-items">
                {Object.entries(jobsByCategory).map(([category, categoryJobs]) => (
                  <div key={category} className="feed-card">
                    <div className="feed-header">
                      <FaBuilding className="company-icon" />
                      <div>
                        <h3>{category}</h3>
                        <p>Nafasi {categoryJobs.length} mpya za kazi</p>
                      </div>
                    </div>
                    <div className="feed-content">
                      <p>Kazi mpya katika {category}</p>
                      {categoryJobs.slice(0, 3).map(job => (
                        <div key={job.id} className="job-preview">
                          <h4>{job.description.substring(0, 50)}...</h4>
                          <p>TZS {job.budget} • {job.duration}</p>
                        </div>
                      ))}
                      <button onClick={() => navigate('/jobs', { state: { jobType: category } })}>
                        Tazama Zote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="news-sidebar">
            <div className="news-card">
              <h3>Habari za Ajira</h3>
              <ul className="news-list">
                {jobs.slice(0, 3).map(job => (
                  <li key={job.id}>
                    <span className="news-bullet">•</span>
                    <div>
                      <p className="news-title">{job.description.substring(0, 30)}...</p>
                      <span className="news-time">
                        {new Date(job.created_at).toLocaleDateString()} • 
                        Watazamaji {job.views_count || 0}
                      </span>
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

export default HomeScreen
