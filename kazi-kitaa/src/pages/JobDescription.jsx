import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
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
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('http://172.17.0.8:2000' + `/api/jobs/${jobId}`)
        // Access the job property from the response and provide default values
        setJob({
          ...data.job,
          location: data.job?.location || { address: 'Location not specified', coordinates: [] },
          client: data.job?.client || { name: 'Unknown', rating: 0, jobs_posted: 0 },
          requirements: data.job?.requirements || [],
          applications: data.job?.applications || 0
        })
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading job details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobDetails()
  }, [jobId])

  const handleApply = () => {
    navigate(`/jobs/${jobId}/apply`)
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

  if (error || !job) {
    return (
      <div className="linkedin-layout">
        <HeaderNav />
        <div className="container">
          <div className="error-message">
            {error || 'Unable to load job details'}
          </div>
        </div>
      </div>
    )
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
                <h1>{job?.title || 'Job Title'}</h1>
                <button 
                  className={`save-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <FaBookmark /> {isSaved ? 'Saved' : 'Save Job'}
                </button>
              </div>

              <div className="job-quick-info">
                <span><FaMapMarkerAlt /> {job?.location?.address || 'Location not specified'}</span>
                <span><FaMoneyBillWave /> TZS {job?.budget || 0}</span>
                <span><FaClock /> {job?.duration || 'Not specified'}</span>
                <span>
                  <FaCalendarAlt /> Posted {job?.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recently'}
                </span>
              </div>

              <button className="apply-btn main-action" onClick={handleApply}>
                Apply Now
              </button>
            </div>

            <div className="post-box">
              <h2>Job Description</h2>
              <p>{job?.description || 'No description provided'}</p>

              <h2>Requirements</h2>
              <ul className="requirements-list">
                {(job?.requirements || []).map((req, index) => (
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
                    <h4>{job?.client?.name || 'Anonymous'}</h4>
                    <div className="client-rating">
                      <FaStar /> {job?.client?.rating || 0}
                    </div>
                  </div>
                </div>
                <div className="client-stats">
                  <div className="stat">
                    <span>Jobs Posted</span>
                    <strong>{job?.client?.jobs_posted || 0}</strong>
                  </div>
                  <div className="stat">
                    <span>Applications</span>
                    <strong>{job?.applications || 0}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="post-box">
              <h3>Job Location</h3>
              <div className="location-preview">
                <div className="map-placeholder">
                  Map Preview
                </div>
                <p>{job?.location?.address || 'Location not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}