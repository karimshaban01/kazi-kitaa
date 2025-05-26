import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaBriefcase, 
  FaCalendarAlt,
  FaPlus, 
  FaUser,
  FaComments,
  FaBell,
  FaSignInAlt,
  FaUserPlus,
  FaSearch,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaGlobe,
  FaBars
} from "react-icons/fa";
import '../App.css';

export default function HeaderNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client'); // or 'worker'
  const [notifications, setNotifications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('sw'); // 'sw' or 'en'

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'sw' ? 'en' : 'sw');
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          {/* Logo Section */}
          <div className="header-left">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="Kazi Kitaa" className="logo-img" />
              <span className="logo-text">Kazi Kitaa</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="main-nav desktop-only">
              {!isLoggedIn ? (
                <>
                  <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                    <FaHome /> {language === 'sw' ? 'Nyumbani' : 'Home'}
                  </Link>
                  <Link to="/find-workers" className={`nav-link ${location.pathname === '/find-workers' ? 'active' : ''}`}>
                    <FaSearch /> {language === 'sw' ? 'Tafuta Wafanyakazi' : 'Find Workers'}
                  </Link>
                  <Link to="/post-job" className={`nav-link ${location.pathname === '/post-job' ? 'active' : ''}`}>
                    <FaPlus /> {language === 'sw' ? 'Weka Kazi' : 'Post Job'}
                  </Link>
                </>
              ) : userRole === 'client' ? (
                <>
                  <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    <FaHome /> {language === 'sw' ? 'Dashibodi' : 'Dashboard'}
                  </Link>
                  <Link to="/my-jobs" className={`nav-link ${location.pathname === '/my-jobs' ? 'active' : ''}`}>
                    <FaBriefcase /> {language === 'sw' ? 'Kazi Zangu' : 'My Jobs'}
                  </Link>
                  <Link to="/find-workers" className={`nav-link ${location.pathname === '/find-workers' ? 'active' : ''}`}>
                    <FaSearch /> {language === 'sw' ? 'Tafuta Wafanyakazi' : 'Find Workers'}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                    <FaHome /> {language === 'sw' ? 'Dashibodi' : 'Dashboard'}
                  </Link>
                  <Link to="/job-board" className={`nav-link ${location.pathname === '/job-board' ? 'active' : ''}`}>
                    <FaBriefcase /> {language === 'sw' ? 'Kazi Zilizopo' : 'Job Board'}
                  </Link>
                  <Link to="/calendar" className={`nav-link ${location.pathname === '/calendar' ? 'active' : ''}`}>
                    <FaCalendarAlt /> {language === 'sw' ? 'Kalenda' : 'Calendar'}
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Right Section */}
          <div className="header-right">
            {/* Language Switcher */}
            <button className="nav-link" onClick={toggleLanguage}>
              <FaGlobe /> {language === 'sw' ? '🇬🇧' : '🇰🇪'}
            </button>

            {isLoggedIn ? (
              <>
                {/* Messages */}
                <Link to="/messages" className="nav-link">
                  <FaComments />
                </Link>

                {/* Notifications */}
                <div className="notifications-dropdown">
                  <button className="nav-link">
                    <FaBell />
                    {notifications.length > 0 && (
                      <span className="notification-badge">{notifications.length}</span>
                    )}
                  </button>
                </div>

                {/* Profile Dropdown */}
                <div className="profile-dropdown">
                  <button 
                    className="nav-link avatar-btn"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                    <FaUser />
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">
                        <FaUser /> {language === 'sw' ? 'Wasifu' : 'Profile'}
                      </Link>
                      <Link to="/settings" className="dropdown-item">
                        <FaCog /> {language === 'sw' ? 'Mipangilio' : 'Settings'}
                      </Link>
                      <Link to="/help" className="dropdown-item">
                        <FaQuestionCircle /> {language === 'sw' ? 'Msaada' : 'Help'}
                      </Link>
                      <button onClick={() => {/* handle logout */}} className="dropdown-item">
                        <FaSignOutAlt /> {language === 'sw' ? 'Toka' : 'Logout'}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="nav-link">
                  <FaSignInAlt /> {language === 'sw' ? 'Ingia' : 'Sign In'}
                </Link>
                <Link to="/register" className="nav-link register">
                  <FaUserPlus /> {language === 'sw' ? 'Jisajili' : 'Register'}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn mobile-only"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-nav mobile-only">
          {/* Add mobile navigation items based on auth state and role */}
        </nav>
      )}

      {/* Mobile Bottom Tab Bar */}
      <div className="bottom-tab-bar mobile-only">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="tab-item">
              <FaHome />
              <span>{language === 'sw' ? 'Nyumbani' : 'Home'}</span>
            </Link>
            <Link to={userRole === 'client' ? '/find-workers' : '/job-board'} className="tab-item">
              <FaSearch />
              <span>{language === 'sw' ? 'Tafuta' : 'Search'}</span>
            </Link>
            <Link to="/messages" className="tab-item">
              <FaComments />
              <span>{language === 'sw' ? 'Ujumbe' : 'Messages'}</span>
            </Link>
            <Link to="/profile" className="tab-item">
              <FaUser />
              <span>{language === 'sw' ? 'Wasifu' : 'Profile'}</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="tab-item">
              <FaHome />
              <span>{language === 'sw' ? 'Nyumbani' : 'Home'}</span>
            </Link>
            <Link to="/find-workers" className="tab-item">
              <FaSearch />
              <span>{language === 'sw' ? 'Tafuta' : 'Search'}</span>
            </Link>
            <Link to="/login" className="tab-item">
              <FaSignInAlt />
              <span>{language === 'sw' ? 'Ingia' : 'Sign In'}</span>
            </Link>
          </>
        )}
      </div>
    </>
  );
}