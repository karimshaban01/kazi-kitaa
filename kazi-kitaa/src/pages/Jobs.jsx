import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HeaderNav from './Header'
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaFilter, 
  FaSearch,
  FaMoneyBillWave
} from 'react-icons/fa'

export default function JobsScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState(location.state?.query || '')
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    salary_range: '',
    availability: ''
  })
  
  const [jobs, setJobs] = useState([])

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content jobs-grid">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="post-box">
              <h3><FaFilter /> Filters</h3>
              
              <div className="filter-group">
                <label>Category</label>
                <select 
                  className="form-input"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="it">IT & Software</option>
                  <option value="construction">Construction</option>
                  {/* Add more categories */}
                </select>
              </div>

              <div className="filter-group">
                <label>Location</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>

              <div className="filter-group">
                <label>Salary Range</label>
                <select 
                  className="form-input"
                  value={filters.salary_range}
                  onChange={(e) => setFilters({...filters, salary_range: e.target.value})}
                >
                  <option value="">Any Range</option>
                  <option value="0-50000">0 - 50,000 TZS</option>
                  <option value="50000-100000">50,000 - 100,000 TZS</option>
                  {/* Add more ranges */}
                </select>
              </div>

              <div className="filter-group">
                <label>Availability</label>
                <select 
                  className="form-input"
                  value={filters.availability}
                  onChange={(e) => setFilters({...filters, availability: e.target.value})}
                >
                  <option value="">Any Time</option>
                  <option value="immediate">Immediate</option>
                  <option value="this_week">This Week</option>
                  <option value="next_week">Next Week</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="jobs-content">
            <div className="post-box search-box">
              <div className="search-input">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job.id} className="feed-card job-card" 
                     onClick={() => navigate(`/jobs/${job.id}`)}>
                  <div className="job-header">
                    <FaBriefcase className="job-icon" />
                    <div>
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                  </div>

                  <p className="job-description">{job.description}</p>

                  <div className="job-details">
                    <span><FaMapMarkerAlt /> {job.location}</span>
                    <span><FaMoneyBillWave /> {job.salary} TZS</span>
                  </div>

                  <button className="apply-btn">View Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}