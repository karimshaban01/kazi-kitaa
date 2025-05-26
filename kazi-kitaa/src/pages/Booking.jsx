import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaFileAlt
} from 'react-icons/fa'

export default function BookingScreen() {
  const navigate = useNavigate()
  const { worker_id } = useParams()
  
  const [bookingData, setBookingData] = useState({
    service_id: '',
    description: '',
    location: {
      latitude: '',
      longitude: ''
    },
    scheduled_at: '',
    duration: '',
    budget: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // API call to create booking
    navigate('/dashboard/client')
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content booking-layout">
          {/* Worker Preview */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-background"></div>
              <div className="profile-info">
                {/* Worker details */}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="feed-section">
            <div className="post-box">
              <form onSubmit={handleSubmit} className="booking-form">
                <h2>Book Service</h2>

                <div className="form-group">
                  <FaFileAlt />
                  <textarea
                    name="description"
                    value={bookingData.description}
                    onChange={(e) => setBookingData({...bookingData, description: e.target.value})}
                    placeholder="Job description"
                    required
                    className="form-input"
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <FaCalendarAlt />
                  <input
                    type="datetime-local"
                    name="scheduled_at"
                    value={bookingData.scheduled_at}
                    onChange={(e) => setBookingData({...bookingData, scheduled_at: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <FaClock />
                  <input
                    type="number"
                    name="duration"
                    value={bookingData.duration}
                    onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
                    placeholder="Duration (hours)"
                    required
                    className="form-input"
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <FaMoneyBillWave />
                  <input
                    type="number"
                    name="budget"
                    value={bookingData.budget}
                    onChange={(e) => setBookingData({...bookingData, budget: e.target.value})}
                    placeholder="Budget (TZS)"
                    required
                    className="form-input"
                    min="0"
                  />
                </div>

                <div className="form-group location-inputs">
                  <FaMapMarkerAlt />
                  <input
                    type="number"
                    name="latitude"
                    value={bookingData.location.latitude}
                    onChange={(e) => setBookingData({
                      ...bookingData, 
                      location: {...bookingData.location, latitude: e.target.value}
                    })}
                    placeholder="Latitude"
                    required
                    className="form-input"
                    step="any"
                  />
                  <input
                    type="number"
                    name="longitude"
                    value={bookingData.location.longitude}
                    onChange={(e) => setBookingData({
                      ...bookingData, 
                      location: {...bookingData.location, longitude: e.target.value}
                    })}
                    placeholder="Longitude"
                    required
                    className="form-input"
                    step="any"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}