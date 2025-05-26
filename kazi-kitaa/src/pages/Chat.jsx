import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderNav from './Header'
import {
  FaPaperPlane,
  FaUser,
  FaPhoneAlt,
  FaWhatsapp,
  FaClock
} from 'react-icons/fa'

export default function ChatScreen() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [activeChat, setActiveChat] = useState(null)

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setMessages(prev => [...prev, {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toISOString()
    }])
    setNewMessage('')
  }

  return (
    <div className="linkedin-layout">
      <HeaderNav />
      <div className="container">
        <div className="main-content chat-layout">
          {/* Chats List */}
          <div className="chats-sidebar">
            <div className="post-box">
              <div className="search-input">
                <input 
                  type="text"
                  placeholder="Search conversations..."
                  className="form-input"
                />
              </div>
            </div>

            <div className="chats-list">
              {['Worker 1', 'Client 2'].map((chat, index) => (
                <div 
                  key={index}
                  className={`chat-item ${activeChat === index ? 'active' : ''}`}
                  onClick={() => setActiveChat(index)}
                >
                  <div className="chat-avatar">
                    <FaUser />
                  </div>
                  <div className="chat-info">
                    <h4>{chat}</h4>
                    <span className="last-message">Last message preview...</span>
                  </div>
                  <span className="chat-time">2m ago</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="chat-window">
            {activeChat !== null ? (
              <>
                <div className="chat-header">
                  <div className="chat-user-info">
                    <FaUser />
                    <h3>Chat Partner Name</h3>
                  </div>
                  <div className="chat-actions">
                    <button className="action-btn whatsapp">
                      <FaWhatsapp /> WhatsApp
                    </button>
                    <button className="action-btn call">
                      <FaPhoneAlt /> Call
                    </button>
                  </div>
                </div>

                <div className="messages-container">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                    >
                      <div className="message-content">
                        {message.text}
                      </div>
                      <div className="message-time">
                        <FaClock />
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSend} className="message-input">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="form-input"
                  />
                  <button type="submit" className="send-btn">
                    <FaPaperPlane />
                  </button>
                </form>
              </>
            ) : (
              <div className="no-chat-selected">
                <FaUser size={48} />
                <h3>Select a conversation to start chatting</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}