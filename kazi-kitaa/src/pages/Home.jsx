import { useState } from 'react'
import '../App.css'
import HeaderNav from './Header'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/jobs', { state: { query: searchQuery } })
  }

  const categories = [
    'IT & Software', 'Sales & Marketing', 'Education',
    'Healthcare', 'Construction', 'Hospitality'
  ]

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
                <h2>Karibu Kazi Kitaa</h2>
                <p>Timiza ndoto zako za kikazi</p>
                <div className="profile-view-btn">
                  <button>Angalia Wasifu Wako</button>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <span>Watazamaji wa wasifu</span>
                  <strong>28</strong>
                </div>
                <div className="stat">
                  <span>Muunganisho</span>
                  <strong>150</strong>
                </div>
                <div className="stat">
                  <span>Watafutaji wa kazi</span>
                  <strong>45</strong>
                </div>
              </div>
            </div>
            
            <div className="quick-links-card">
              <h4>Viungo vyako</h4>
              <ul>
                <li><FaBookmark /> Kazi zilizohifadhiwa</li>
                <li><FaTrophy /> Ujuzi na Uthibitisho</li>
                <li><FaChartLine /> Takwimu za Maombi</li>
              </ul>
            </div>
          </div>

          {/* Main Feed */}
          <div className="feed-section">
            <div className="post-box">
              <div className="post-input">
                <FaUser className="avatar" />
                <input 
                  type="text" 
                  placeholder="Tafuta kazi, wafanyakazi, au kampuni..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="post-actions">
                <button><FaBriefcase /> Kazi</button>
                <button><FaNetworkWired /> Mtandao</button>
                <button><FaBuilding /> Kampuni</button>
              </div>
            </div>

            <div className="feed-items">
              {categories.map((category, index) => (
                <div key={index} className="feed-card">
                  <div className="feed-header">
                    <FaBuilding className="company-icon" />
                    <div>
                      <h3>{category}</h3>
                      <p>Nafasi mpya za kazi</p>
                    </div>
                  </div>
                  <div className="feed-content">
                    <p>Tunatafuta wafanyakazi wenye ujuzi katika {category}</p>
                    <button onClick={() => navigate('/jobs', { state: { jobType: category } })}>
                      Tuma Maombi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="news-sidebar">
            <div className="news-card">
              <h3>Habari za Ajira</h3>
              <ul className="news-list">
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Fursa mpya za ajira</p>
                    <span className="news-time">Saa 2 zilizopita • Watazamaji 234</span>
                  </div>
                </li>
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Mafunzo ya kikazi</p>
                    <span className="news-time">Leo • Watazamaji 567</span>
                  </div>
                </li>
                <li>
                  <span className="news-bullet">•</span>
                  <div>
                    <p className="news-title">Ushauri wa taaluma</p>
                    <span className="news-time">Jana • Watazamaji 890</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="trending-topics-card">
              <h3>Mada Zinazovuma</h3>
              <div className="topic-tags">
                <span>#AjiraKenya</span>
                <span>#TeknolojiaKE</span>
                <span>#BiasharaNyumbani</span>
                <span>#KaziMpya2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
