import React, { useState } from 'react'
import { diskSchedulingService, ApiError } from '../services/apiClient'
import { validateDiskRequests, validateTimeQuanta } from '../services/validation'

const DiskScheduling = () => {
  const [algorithm, setAlgorithm] = useState('fcfs')
  const [diskSize, setDiskSize] = useState(200)
  const [startPos, setStartPos] = useState(50)
  const [requests, setRequests] = useState([
    { cylinder: 82 },
    { cylinder: 170 },
    { cylinder: 43 },
    { cylinder: 140 },
    { cylinder: 24 },
    { cylinder: 16 },
    { cylinder: 190 }
  ])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAddRequest = () => {
    setRequests([...requests, { cylinder: 100 }])
    setError(null)
  }

  const handleRemoveRequest = (index) => {
    setRequests(requests.filter((_, i) => i !== index))
    setError(null)
  }

  const handleRequestChange = (index, field, value) => {
    const newRequests = [...requests]
    // Ensure value is a number or null
    newRequests[index][field] = value === '' ? 0 : Math.max(0, parseInt(value) || 0)
    setRequests(newRequests)
    setError(null)
  }

  const handleSimulate = async () => {
    setError(null)

    try {
      // Extract cylinder values from requests objects for validation
      const cylinderValues = requests.map(req => req.cylinder).filter(val => val !== null && val !== undefined)
      
      console.log('Cylinder values being sent:', cylinderValues)
      console.log('Start position:', startPos)
      console.log('Disk size:', diskSize)
      
      validateDiskRequests(cylinderValues, startPos, diskSize)
      
      if (['scan', 'cscan'].includes(algorithm)) {
        validateTimeQuanta(1)
      }

      setLoading(true)
      let data

      console.log('Calling API with algorithm:', algorithm)

      switch (algorithm) {
        case 'fcfs':
          data = await diskSchedulingService.fcfs(cylinderValues, startPos)
          break
        case 'sstf':
          data = await diskSchedulingService.sstf(cylinderValues, startPos)
          break
        case 'scan':
          data = await diskSchedulingService.scan(cylinderValues, startPos, diskSize)
          break
        case 'cscan':
          data = await diskSchedulingService.cscan(cylinderValues, startPos, diskSize)
          break
        default:
          throw new Error('Invalid algorithm selected')
      }

      console.log('API response:', data)
      setResult(data)
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : err.message
      setError(errorMessage)
      console.error('Simulation error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='page'>
      <h1>Disk Scheduling Algorithms</h1>

      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #fcc'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className='section'>
        <h2>Algorithm Configuration</h2>
        <div className='input-row'>
          <div className='form-group'>
            <label>Select Algorithm:</label>
            <select value={algorithm} onChange={(e) => {
              setAlgorithm(e.target.value)
              setError(null)
            }}>
              <option value='fcfs'>FCFS (First Come First Served)</option>
              <option value='sstf'>SSTF (Shortest Seek Time First)</option>
              <option value='scan'>SCAN (Elevator Algorithm)</option>
              <option value='cscan'>C-SCAN (Circular SCAN)</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Initial Head Position:</label>
            <input 
              type='number' 
              value={startPos} 
              onChange={(e) => setStartPos(parseInt(e.target.value) || 0)}
              min='0'
            />
          </div>

          <div className='form-group'>
            <label>Disk Size (Max Cylinder):</label>
            <input 
              type='number' 
              value={diskSize} 
              onChange={(e) => setDiskSize(parseInt(e.target.value) || 200)}
              min='100'
            />
          </div>
        </div>
      </div>

      <div className='section'>
        <h2>Disk Requests</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Request #</th>
                <th>Cylinder Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type='number'
                      value={request.cylinder}
                      onChange={(e) => handleRequestChange(index, 'cylinder', e.target.value)}
                      min='0'
                    />
                  </td>
                  <td>
                    <button 
                      className='btn btn-danger'
                      onClick={() => handleRemoveRequest(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='button-group'>
          <button className='btn btn-success' onClick={handleAddRequest}>
            Add Request
          </button>
          <button 
            className='btn btn-primary' 
            onClick={handleSimulate}
            disabled={loading || requests.length === 0}
          >
            {loading ? 'Scheduling...' : 'Schedule Requests'}
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '2.5rem', 
        padding: '2rem', 
        backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '12px', 
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
        borderLeft: '6px solid #9b59b6',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          top: '0',
          right: '0',
          width: '150px',
          height: '150px',
          backgroundColor: 'rgba(155, 89, 182, 0.05)',
          borderRadius: '50%',
          transform: 'translate(50px, -50px)'
        }}></div>
        
        <h3 style={{ 
          color: '#2c3e50', 
          fontSize: '1.5rem',
          borderBottom: '3px solid #9b59b6', 
          paddingBottom: '1rem', 
          marginTop: 0,
          marginBottom: '1.5rem',
          fontWeight: '600',
          position: 'relative',
          zIndex: 1
        }}>
          📚 Algorithm Explanation
          <span style={{ 
            fontSize: '1rem', 
            color: '#9b59b6',
            marginLeft: '0.5rem',
            fontWeight: '500'
          }}>(
            {algorithm === 'fcfs' && 'FCFS'}
            {algorithm === 'sstf' && 'SSTF'}
            {algorithm === 'scan' && 'SCAN'}
            {algorithm === 'cscan' && 'C-SCAN'}
          )</span>
        </h3>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {algorithm === 'fcfs' ? (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              borderLeft: '4px solid #3498db'
            }}>
              <p style={{ margin: 0, lineHeight: '1.8', color: '#2c3e50' }}>
                <strong style={{ color: '#3498db', fontSize: '1.1rem' }}>First Come First Served (FCFS)</strong>
                <br/><br/>
                Serves disk requests in the exact order they arrive in the queue. While this approach is simple to implement and fair, 
                it can result in significant head movement and poor average seek time, especially when requests are scattered across the disk.
                <br/><br/>
                <em style={{ color: '#7f8c8d' }}>Best for: Systems requiring strict ordering and fairness</em>
              </p>
            </div>
          ) : algorithm === 'sstf' ? (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              borderLeft: '4px solid #e74c3c'
            }}>
              <p style={{ margin: 0, lineHeight: '1.8', color: '#2c3e50' }}>
                <strong style={{ color: '#e74c3c', fontSize: '1.1rem' }}>Shortest Seek Time First (SSTF)</strong>
                <br/><br/>
                Selects the disk request nearest to the current head position, minimizing seek time for each operation. 
                This greedy approach significantly reduces average seek time compared to FCFS, but can cause starvation 
                of requests far from the current head position.
                <br/><br/>
                <em style={{ color: '#7f8c8d' }}>Best for: Systems prioritizing speed over strict fairness</em>
              </p>
            </div>
          ) : algorithm === 'scan' ? (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              borderLeft: '4px solid #f39c12'
            }}>
              <p style={{ margin: 0, lineHeight: '1.8', color: '#2c3e50' }}>
                <strong style={{ color: '#f39c12', fontSize: '1.1rem' }}>SCAN (Elevator Algorithm)</strong>
                <br/><br/>
                Moves the disk head in one direction (towards the end) servicing all requests, then reverses direction and 
                moves towards the beginning. This elevator-like movement ensures every request gets served, preventing starvation 
                and providing more uniform wait times than SSTF.
                <br/><br/>
                <em style={{ color: '#7f8c8d' }}>Best for: Systems balancing speed and fairness</em>
              </p>
            </div>
          ) : algorithm === 'cscan' ? (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              borderLeft: '4px solid #16a085'
            }}>
              <p style={{ margin: 0, lineHeight: '1.8', color: '#2c3e50' }}>
                <strong style={{ color: '#16a085', fontSize: '1.1rem' }}>C-SCAN (Circular SCAN)</strong>
                <br/><br/>
                Similar to SCAN, but services requests only in one direction. When reaching the end of the disk, the head jumps 
                back to the beginning and continues. This provides even more uniform wait times for all requests compared to SCAN, 
                as it eliminates bias towards the middle cylinders.
                <br/><br/>
                <em style={{ color: '#7f8c8d' }}>Best for: Systems requiring highly uniform service distribution</em>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {result && (
        <div className='section' style={{ backgroundColor: '#f8fcff', borderTop: '4px solid #9b59b6' }}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Scheduling Results: {result.algorithm}</h2>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'white', 
            borderRadius: '6px', 
            marginBottom: '1.5rem',
            borderLeft: '4px solid #3498db'
          }}>
            <strong style={{ color: '#2c3e50', fontSize: '1.1rem' }}>Starting Position:</strong> 
            <span style={{ marginLeft: '1rem', color: '#27ae60', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {result.startPos}
            </span>
          </div>

          <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #9b59b6', paddingBottom: '0.5rem' }}>Head Movement Sequence</h3>
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            marginBottom: '1.5rem',
            borderLeft: '4px solid #3498db',
            fontFamily: 'monospace',
            fontSize: '1rem',
            color: '#2c3e50',
            fontWeight: '600',
            wordBreak: 'break-all'
          }}>
            {result.sequence.join(' → ')}
          </div>

          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Cylinder</th>
                  <th>Seek Time</th>
                  <th>Cumulative Seek</th>
                </tr>
              </thead>
              <tbody>
                {result.seekTimes.map((seek, index) => (
                  <tr key={index}>
                    <td>{result.sequence[index]}</td>
                    <td>{seek}</td>
                    <td>{result.sequence.slice(0, index + 1).reduce((a, _, i) => a + result.seekTimes[i], 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='result-box' style={{ marginTop: '1.5rem' }}>
            <h3>Summary</h3>
            <div className='result-item'>
              <span className='result-label'>Total Seek Time:</span>
              <span className='result-value'>{result.totalSeekTime}</span>
            </div>
            <div className='result-item'>
              <span className='result-label'>Average Seek Time:</span>
              <span className='result-value'>{result.averageSeekTime}</span>
            </div>
            <div className='result-item'>
              <span className='result-label'>Total Requests Served:</span>
              <span className='result-value'>{result.sequence.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiskScheduling
