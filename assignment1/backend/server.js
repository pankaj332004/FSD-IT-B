const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 5000

// Configure CORS - allow development environments
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
    ]
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS not allowed'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())

const filePath = path.join(__dirname, 'data.txt')

/* WRITE API */
app.post('/write', (req, res) => {
  const { content } = req.body

  // Validate input
  if (content === undefined || content === null) {
    return res.status(400).json({ ok: false, error: 'Content is required' })
  }

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ ok: false, error: 'Write failed' })
    }
    res.json({ ok: true, message: 'Content written successfully' })
  })
})

/* READ API */
app.get('/read', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ ok: false, error: 'File read failed' })
    }
    res.json({ ok: true, content: data })
  })
})

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Server is running' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Route not found' })
})

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ ok: false, error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
