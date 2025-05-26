import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import HeaderNav from './Header'
import { FaMapMarkerAlt, FaBriefcase, FaUsers, FaSearch } from 'react-icons/fa'

function RegionScreen() {
  const navigate = useNavigate()
  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch regions from API
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('http://172.17.0.1/cf/regions.php')
        const data = await response.json()
        setRegions(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching regions:', err)
        setLoading(false)
      }
    }

    fetchRegions()
  }, [])

  // Fetch jobs when region is selected
  useEffect(() => {
    if (selectedRegion) {
      fetchJobsByRegion(selectedRegion)
    }
  }, [selectedRegion])

  const fetchJobsByRegion = async (region) => {
    try {
      const response = await fetch(`http://172.17.0.1/cf/jobs.php?region=${region}`)
      const data = await response.json()
      setJobs(data)
    } catch (err) {
      console.error('Error fetching jobs:', err)
    }
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content regions-layout">
          {/* Left Sidebar - Regions List */}
          <div className="regions-sidebar">
            <div className="post-box">
              <div className="search-input">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Tafuta mkoa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="regions-list">
                {loading ? (
                  <div className="loading">Loading regions...</div>
                ) : (
                  regions
                    .filter(region => 
                      region.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((region) => (
                      <div
                        key={region.id}
                        className={`region-item ${selectedRegion === region.id ? 'active' : ''}`}
                        onClick={() => setSelectedRegion(region.id)}
                      >
                        <FaMapMarkerAlt />
                        <div className="region-info">
                          <h4>{region.name}</h4>
                          <span>{region.jobs_count} jobs available</span>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Jobs in Selected Region */}
          <div className="feed-section">
            {selectedRegion ? (
              <>
                <div className="post-box region-header">
                  <h2>{regions.find(r => r.id === selectedRegion)?.name}</h2>
                  <div className="region-stats">
                    <div className="stat">
                      <FaBriefcase />
                      <span>{jobs.length} Jobs</span>
                    </div>
                    <div className="stat">
                      <FaUsers />
                      <span>{regions.find(r => r.id === selectedRegion)?.workers_count} Workers</span>
                    </div>
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
                      <button className="apply-btn">View Details</button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="post-box empty-state">
                <FaMapMarkerAlt size={48} />
                <h3>Select a region to view available jobs</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegionScreen