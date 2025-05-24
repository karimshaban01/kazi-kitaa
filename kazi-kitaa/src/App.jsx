import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/Home'
import JobScreen from './pages/Jobs'
import RegionScreen from './pages/Region'
import NewScreen from './pages/New'
import ProfileScreen from './pages/Profile'
import BidsScreen from './pages/Bids'
import PaymentScreen from './pages/Payments'
import ReviewScreen from './pages/Reviews'
import RefundScreen from './pages/Refund'
import ApplyScreen from './pages/Apply'
import SubmissionScreen from './pages/Submission'
import RequestPaymentScreen from './pages/RequestPay'

function App() {
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')

  const sendData = ()=>{
    alert(location + " " + jobType);
  }

  const regions = [
    'Mikoa yote', 'Arusha', 'Dar es Salaam',
    'Dodoma', 'Geita', 'Iringa', 'Kagera', 
    'Mwanza', 'Tanga', 'Zanzibar'
  ]

  const categories = [
    'Kazi zote',
    'IT & Software', 'Sales & Marketing', 'Education',
    'Healthcare', 'Construction', 'Hospitality'
  ]

  return (
    <Router>
      
          <Routes>
            <Route path="/" element={<HomeScreen></HomeScreen>} />
            <Route path="/regions" element={<RegionScreen></RegionScreen>} />
            <Route path="/jobs" element={<JobScreen></JobScreen>} />
            <Route path="/new" element={<NewScreen></NewScreen>} />
            <Route path="/profile" element={<ProfileScreen></ProfileScreen>}></Route>
            <Route path="/bids" element={<BidsScreen></BidsScreen>}></Route>
            <Route path="/payments" element={<PaymentScreen></PaymentScreen>}></Route>
            <Route path="/refund" element={<RefundScreen></RefundScreen>}></Route>
            <Route path="/reviews" element={<ReviewScreen></ReviewScreen>}></Route>
            <Route path="/apply" element={<ApplyScreen></ApplyScreen>}></Route>
            <Route path="/submit" element={<SubmissionScreen></SubmissionScreen>}></Route>
            <Route path="/request-pay" element={<RequestPaymentScreen></RequestPaymentScreen>}></Route>
          </Routes>
      
    </Router>
  );
}

export default App
