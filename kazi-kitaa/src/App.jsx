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
import RegisterScreen from './pages/Register'
import LoginScreen from './pages/Login'
import ClientDashboard from './pages/ClientDashboard'
import WorkerDashboard from './pages/WorkerDashboard'
import BookingScreen from './pages/Booking'
import ChatScreen from './pages/Chat'
import RatingScreen from './pages/Rating'
import AdminDashboard from './pages/Admin'
import OfflineScreen from './pages/Offline'
import JobDescriptionScreen from './pages/JobDescription'
import WorkersScreen from './pages/Workers'
import SupportScreen from './pages/Support'

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
            <Route path="/profile/:userId" element={<ProfileScreen></ProfileScreen>}></Route>
            <Route path="/jobs/:jobId/bids" element={<BidsScreen></BidsScreen>}></Route>
            <Route path="/payments" element={<PaymentScreen></PaymentScreen>}></Route>
            <Route path="/refund" element={<RefundScreen></RefundScreen>}></Route>
            <Route path="/reviews" element={<ReviewScreen></ReviewScreen>}></Route>
            <Route path="/jobs/:jobId/apply" element={<ApplyScreen></ApplyScreen>}></Route>
            <Route path="/submit" element={<SubmissionScreen></SubmissionScreen>}></Route>
            <Route path="/request-pay" element={<RequestPaymentScreen></RequestPaymentScreen>}></Route>
            <Route path='/register' element={<RegisterScreen/>}></Route>
            <Route path='/login' element={<LoginScreen />}></Route>
            <Route path='/client' element={<ClientDashboard/>}></Route>
            <Route path='/worker' element={<WorkerDashboard/>}></Route>
            <Route path='/book' element={<BookingScreen/>}></Route>
            <Route path='/chat' element={<ChatScreen/>}></Route>
            <Route path='/rate' element={<RatingScreen/>}></Route>
            <Route path='/admin' element={<AdminDashboard />}></Route>
            <Route path="/offline" element={<OfflineScreen />}></Route>
            <Route path="/jobs/:jobId" element={<JobDescriptionScreen />}></Route>
            <Route path='/services' element={<WorkersScreen />}></Route>
            <Route path='/support' element={<SupportScreen />}></Route>
          </Routes>
      
    </Router>
  );
}

export default App
