import React, { useState } from 'react'
import { cpuSchedulingService, ApiError } from '../services/apiClient'
import { validateProcesses, validateTimeQuanta, validatePriority } from '../services/validation'

const CPUScheduling = () => {
  const [algorithm, setAlgorithm] = useState('fcfs')
  const [processes, setProcesses] = useState([
    { processId: 'P1', arrivalTime: 0, burstTime: 8 },
    { processId: 'P2', arrivalTime: 1, burstTime: 4 },
    { processId: 'P3', arrivalTime: 2, burstTime: 2 },
    { processId: 'P4', arrivalTime: 3, burstTime: 1 }
  ])
  const [timeQuanta, setTimeQuanta] = useState(2)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAddProcess = () => {
    setProcesses([...processes, { 
      processId: `P${processes.length + 1}`, 
      arrivalTime: 0, 
      burstTime: 5 
    }])
    setError(null)
  }

  const handleRemoveProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index))
    setError(null)
  }

  const handleProcessChange = (index, field, value) => {
    const newProcesses = [...processes]
    newProcesses[index][field] = field.includes('Time') || field === 'priority' 
      ? (value === '' ? '' : parseInt(value)) 
      : value
    setProcesses(newProcesses)
    setError(null)
  }

  const handleSimulate = async () => {
    setError(null)
    
    try {
      // Frontend validation
      if (algorithm === 'priority') {
        if (!processes.every(p => p.priority !== undefined && p.priority !== '')) {
          throw new Error('All processes must have a priority set')
        }
        validatePriority(processes)
      } else {
        validateProcesses(processes)
      }

      if (algorithm === 'round-robin') {
        validateTimeQuanta(timeQuanta)
      }

      setLoading(true)
      let data

      switch (algorithm) {
        case 'fcfs':
          data = await cpuSchedulingService.fcfs(processes)
          break
        case 'sjf':
          data = await cpuSchedulingService.sjf(processes)
          break
        case 'round-robin':
          data = await cpuSchedulingService.roundRobin(processes, timeQuanta)
          break
        case 'priority':
          data = await cpuSchedulingService.priority(processes)
          break
        default:
          throw new Error('Invalid algorithm selected')
      }

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
      <h1>CPU Scheduling Algorithms</h1>

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
        <h2>Algorithm Selection</h2>
        <div className='form-group'>
          <label>Select Algorithm:</label>
          <select value={algorithm} onChange={(e) => {
            setAlgorithm(e.target.value)
            setError(null)
          }}>
            <option value='fcfs'>FCFS - First Come First Served</option>
            <option value='sjf'>SJF - Shortest Job First</option>
            <option value='round-robin'>Round Robin</option>
            <option value='priority'>Priority Scheduling</option>
          </select>
        </div>

        {algorithm === 'round-robin' && (
          <div className='form-group'>
            <label>Time Quanta:</label>
            <input 
              type='number' 
              value={timeQuanta} 
              onChange={(e) => setTimeQuanta(parseInt(e.target.value) || 1)}
              min='1'
            />
          </div>
        )}
      </div>

      <div className='section'>
        <h2>Processes</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Process ID</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                {algorithm === 'priority' && <th>Priority</th>}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type='text'
                      value={process.processId}
                      onChange={(e) => handleProcessChange(index, 'processId', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={process.arrivalTime}
                      onChange={(e) => handleProcessChange(index, 'arrivalTime', e.target.value)}
                      min='0'
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={process.burstTime}
                      onChange={(e) => handleProcessChange(index, 'burstTime', e.target.value)}
                      min='1'
                    />
                  </td>
                  {algorithm === 'priority' && (
                    <td>
                      <input
                        type='number'
                        value={process.priority || ''}
                        onChange={(e) => handleProcessChange(index, 'priority', e.target.value)}
                        min='1'
                        placeholder='1-10'
                      />
                    </td>
                  )}
                  <td>
                    <button 
                      className='btn btn-danger'
                      onClick={() => handleRemoveProcess(index)}
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
          <button className='btn btn-success' onClick={handleAddProcess}>
            Add Process
          </button>
          <button 
            className='btn btn-primary' 
            onClick={handleSimulate}
            disabled={loading || processes.length === 0}
          >
            {loading ? 'Simulating...' : 'Simulate'}
          </button>
        </div>
      </div>

      {result && (
        <div className='section' style={{ backgroundColor: '#f8fcff', borderTop: '4px solid #3498db' }}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Results: {result.algorithm}</h2>
          {result.timeQuanta && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'white', 
              borderRadius: '6px', 
              marginBottom: '1.5rem',
              borderLeft: '4px solid #f39c12'
            }}>
              <strong style={{ color: '#2c3e50', fontSize: '1.1rem' }}>Time Quanta:</strong> 
              <span style={{ marginLeft: '1rem', color: '#27ae60', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {result.timeQuanta}
              </span>
            </div>
          )}

          <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.5rem' }}>Process Details</h3>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>Arrival Time</th>
                  <th>Burst Time</th>
                  <th>Start Time</th>
                  <th>Completion Time</th>
                  <th>Turnaround Time</th>
                  <th>Waiting Time</th>
                </tr>
              </thead>
              <tbody>
                {result.processes.map((p, index) => (
                  <tr key={index}>
                    <td>{p.processId}</td>
                    <td>{p.arrivalTime}</td>
                    <td>{p.burstTime}</td>
                    <td>{p.startTime}</td>
                    <td>{p.completionTime}</td>
                    <td>{p.turnaroundTime}</td>
                    <td>{p.waitingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='result-box'>
            <h3>Summary</h3>
            <div className='result-item'>
              <span className='result-label'>Average Waiting Time:</span>
              <span className='result-value'>{result.avgWaitingTime.toFixed(2)}</span>
            </div>
            <div className='result-item'>
              <span className='result-label'>Average Turnaround Time:</span>
              <span className='result-value'>{result.avgTurnaroundTime.toFixed(2)}</span>
            </div>
          </div>

          {result.execution && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(52, 152, 219, 0.1)', borderLeft: '5px solid #9b59b6' }}>
              <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #9b59b6', paddingBottom: '0.5rem', marginTop: 0 }}>Execution Timeline</h3>
              <div className='table-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Process</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.execution.map((exec, index) => (
                      <tr key={index}>
                        <td>{exec.processId}</td>
                        <td>{exec.startTime}</td>
                        <td>{exec.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CPUScheduling
