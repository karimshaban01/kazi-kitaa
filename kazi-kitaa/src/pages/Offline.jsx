import { useEffect } from 'react'
import { FaWifi, FaSync } from 'react-icons/fa'

export default function OfflineScreen() {
  useEffect(() => {
    const checkConnection = () => {
      if (navigator.onLine) {
        window.location.reload()
      }
    }

    window.addEventListener('online', checkConnection)
    return () => window.removeEventListener('online', checkConnection)
  }, [])

  return (
    <div className="offline-page">
      <div className="offline-content">
        <FaWifi className="offline-icon" />
        <h2>You're Offline</h2>
        <p>Please check your internet connection and try again</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          <FaSync /> Retry Connection
        </button>
      </div>
    </div>
  )
}