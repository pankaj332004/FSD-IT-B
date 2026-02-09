import React, { useState } from 'react'
import './App.css'
import Navbar from './Navbar'

const App = () => {
  const [content, setContent] = useState('')
  const [fileData, setFileData] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'
  const [loading, setLoading] = useState(false)

  const handleWrite = async () => {
    if (!content.trim()) {
      setMessage('Content cannot be empty')
      setMessageType('error')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      const data = await res.json()
      
      if (data.ok) {
        setMessage(data.message)
        setMessageType('success')
        setContent('')
        setFileData('')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.error)
        setMessageType('error')
      }
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleRead = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/read')
      const data = await res.json()
      
      if (data.ok) {
        setFileData(data.content)
        setMessage('File read successfully')
        setMessageType('success')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.error)
        setMessageType('error')
      }
    } catch (err) {
      setMessage(err.message)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="app-container">
      <div className="card">
        <h1>FS Model for Node</h1>
        <p className="subtitle">Read and Write Files Seamlessly</p>
        
        <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="btn-group">
          <button className="btn write" onClick={handleWrite} disabled={loading}>
            {loading ? 'Processing...' : 'FS Write'}
          </button>
          <button className="btn read" onClick={handleRead} disabled={loading}>
            {loading ? 'Processing...' : 'FS Read'}
          </button>
        </div>

        {message && (
          <p className={`msg ${messageType}`}>{message}</p>
        )}

        {fileData && (
          <div className="output">
            <h3>File Content</h3>
            <p>{fileData}</p>
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default App
