import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNav from './Header'
import { FaStar, FaUser, FaComment } from 'react-icons/fa'

export default function SupportScreen() {
  const navigate = useNavigate()
  const { booking_id } = useParams()
  
  const [rating, setRating] = useState({
    stars: 0,
    comment: '',
    worker_id: '',
    booking_id: booking_id
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // API call to submit rating
    navigate('/dashboard/client')
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content rating-layout">
          <div className="feed-section">
            <div className="post-box">
              <div className="rating-header">
                <FaUser className="worker-avatar" />
                <div>
                  <h3>Rate Worker Name</h3>
                  <p>Job Title</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rating-form">
                <div className="stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star-icon ${rating.stars >= star ? 'active' : ''}`}
                      onClick={() => setRating({ ...rating, stars: star })}
                    />
                  ))}
                </div>

                <div className="form-group">
                  <FaComment />
                  <textarea
                    name="comment"
                    value={rating.comment}
                    onChange={(e) => setRating({ ...rating, comment: e.target.value })}
                    placeholder="Share your experience..."
                    required
                    className="form-input"
                    rows={4}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Submit Rating
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}