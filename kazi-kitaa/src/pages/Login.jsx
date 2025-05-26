import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaEnvelope,
  FaLock,
  FaFacebook,
  FaGoogle
} from 'react-icons/fa'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // API call to login user
    navigate('/home')
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content login-layout">
          {/* Main Form */}
          <div className="login-section">
            <div className="post-box">
              <form onSubmit={handleSubmit} className="login-form">
                <h2>Ingia Kwenye Akaunti</h2>
                
                <div className="form-group">
                  <FaEnvelope />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Barua pepe"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <FaLock />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nywila"
                    required
                    className="form-input"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Ingia
                </button>

                <div className="divider">AU</div>

                <div className="oauth-buttons">
                  <button type="button" className="oauth-btn facebook">
                    <FaFacebook /> Ingia na Facebook
                  </button>
                  <button type="button" className="oauth-btn google">
                    <FaGoogle /> Ingia na Google
                  </button>
                </div>

                <div className="login-footer">
                  <p>Huna akaunti? <Link to="/register">Jisajili</Link></p>
                  <Link to="/forgot-password">Umesahau nywila?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}