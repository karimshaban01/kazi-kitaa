import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobile,
  FaHistory,
  FaDownload
} from 'react-icons/fa'

export default function PaymentsScreen() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [transactions, setTransactions] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // API call to process payment
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content payments-layout">
          {/* Payment Form */}
          <div className="feed-section">
            <div className="post-box">
              <h2>Make Payment</h2>
              <form onSubmit={handleSubmit} className="payment-form">
                <div className="payment-methods">
                  <button
                    type="button"
                    className={`method-btn ${paymentMethod === 'mpesa' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('mpesa')}
                  >
                    <FaMobile /> M-Pesa
                  </button>
                  <button
                    type="button"
                    className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard /> Card
                  </button>
                </div>

                <div className="form-group">
                  <FaMoneyBillWave />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount (TZS)"
                    required
                    className="form-input"
                    min="0"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Proceed to Pay
                </button>
              </form>
            </div>
          </div>

          {/* Transaction History */}
          <div className="transactions-section">
            <div className="post-box">
              <div className="transactions-header">
                <h3><FaHistory /> Transaction History</h3>
                <button className="download-btn">
                  <FaDownload /> Export
                </button>
              </div>

              <div className="transactions-list">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-info">
                      <h4>{transaction.description}</h4>
                      <span className="transaction-date">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={`transaction-amount ${transaction.type}`}>
                      {transaction.type === 'credit' ? '+' : '-'} 
                      TZS {transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}