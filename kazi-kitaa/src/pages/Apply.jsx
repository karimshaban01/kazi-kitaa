import { useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css';
import HeaderNav from "./Header";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';

export default function ApplyScreen() {
    const { jobId } = useParams();
    const [application, setApplication] = useState({
        coverLetter: '',
        expectedPay: '',
        availability: '',
        phoneNumber: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Application submitted for job:', jobId, application);
        // Add your submission logic here
    };

    const handleChange = (e) => {
        setApplication({
            ...application,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="linkedin-layout">
            <HeaderNav />
            <div className="container">
                <div className="main-content job-description-layout">
                    <div className="feed-section">
                        <div className="post-box">
                            <h1>Apply for Position</h1>
                            <div className="job-quick-info">
                                <span><FaBriefcase /> Job ID: {jobId}</span>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="application-form">
                                <div className="form-group">
                                    <label htmlFor="coverLetter">Cover Letter</label>
                                    <textarea
                                        name="coverLetter"
                                        value={application.coverLetter}
                                        onChange={handleChange}
                                        placeholder="Why are you the best candidate for this job?"
                                        rows="6"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="expectedPay">Expected Pay (TZS)</label>
                                    <input
                                        type="number"
                                        name="expectedPay"
                                        value={application.expectedPay}
                                        onChange={handleChange}
                                        placeholder="Enter your expected pay"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="availability">Availability</label>
                                    <input
                                        type="text"
                                        name="availability"
                                        value={application.availability}
                                        onChange={handleChange}
                                        placeholder="When can you start?"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={application.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>

                                <button type="submit" className="apply-btn main-action">
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}