import React, { useState } from 'react'
import { memoryManagementService, ApiError } from '../services/apiClient'
import { validateMemory } from '../services/validation'

const MemoryManagement = () => {
  const [algorithm, setAlgorithm] = useState('first-fit')
  const [memorySize, setMemorySize] = useState(100)
  const [processes, setProcesses] = useState([
    { processId: 'P1', size: 20 },
    { processId: 'P2', size: 15 },
    { processId: 'P3', size: 30 },
    { processId: 'P4', size: 10 }
  ])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAddProcess = () => {
    setProcesses([...processes, { processId: `P${processes.length + 1}`, size: 10 }])
    setError(null)
  }

  const handleRemoveProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index))
    setError(null)
  }

  const handleProcessChange = (index, field, value) => {
    const newProcesses = [...processes]
    newProcesses[index][field] = field === 'size' ? (value === '' ? 0 : Math.max(1, parseInt(value) || 1)) : value
    setProcesses(newProcesses)
    setError(null)
  }

  const handleSimulate = async () => {
    setError(null)
    
    try {
      console.log('Processes:', processes)
      console.log('Memory size:', memorySize)
      console.log('Algorithm:', algorithm)
      
      validateMemory(processes, memorySize)

      setLoading(true)
      let data

      switch (algorithm) {
        case 'first-fit':
          data = await memoryManagementService.firstFit(processes, memorySize)
          break
        case 'best-fit':
          data = await memoryManagementService.bestFit(processes, memorySize)
          break
        case 'worst-fit':
          data = await memoryManagementService.worstFit(processes, memorySize)
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
      <h1>Memory Management Algorithms</h1>

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
        <h2>Algorithm & Memory Configuration</h2>
        <div className='input-row'>
          <div className='form-group'>
            <label>Select Algorithm:</label>
            <select value={algorithm} onChange={(e) => {
              setAlgorithm(e.target.value)
              setError(null)
            }}>
              <option value='first-fit'>First Fit</option>
              <option value='best-fit'>Best Fit</option>
              <option value='worst-fit'>Worst Fit</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Total Memory Size:</label>
            <input 
              type='number' 
              value={memorySize} 
              onChange={(e) => setMemorySize(parseInt(e.target.value) || 50)}
              min='50'
            />
          </div>
        </div>
      </div>

      <div className='section'>
        <h2>Processes</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Process ID</th>
                <th>Memory Size Required</th>
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
                      value={process.size}
                      onChange={(e) => handleProcessChange(index, 'size', e.target.value)}
                      min='1'
                    />
                  </td>
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
            {loading ? 'Allocating...' : 'Allocate Memory'}
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
        borderLeft: '6px solid #e67e22',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          top: '0',
          right: '0',
          width: '150px',
          height: '150px',
          backgroundColor: 'rgba(230, 126, 34, 0.05)',
          borderRadius: '50%',
          transform: 'translate(50px, -50px)'
        }}></div>
        
        <h3 style={{ 
          color: '#2c3e50', 
          fontSize: '1.5rem',
          borderBottom: '3px solid #e67e22', 
          paddingBottom: '1rem', 
          marginTop: 0,
          marginBottom: '1.5rem',
          fontWeight: '600',
          position: 'relative',
          zIndex: 1
        }}>
          💾 Algorithm Explanation
          <span style={{ 
            fontSize: '1rem', 
            color: '#e67e22',
            marginLeft: '0.5rem',
            fontWeight: '500'
          }}>(
            {algorithm === 'first-fit' && 'First Fit'}
            {algorithm === 'best-fit' && 'Best Fit'}
            {algorithm === 'worst-fit' && 'Worst Fit'}
          )</span>
        </h3>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {algorithm === 'first-fit' ? (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              borderLeft: '4px solid #3498db'
            }}>
              <p style={{ margin: 0, lineHeight: '1.8', color: '#2c3e50' }}>
                <strong style={{ color: '#3498db', fontSize: '1.1rem' }}>First Fit</strong>
                <br/><br/>
                Allocates memory to the first available partition that is large enough to hold the process. 
                This algorithm is fast and simple to implement, as it searches from the beginning of memory until 
                it finds a suitable free partition.
                <br/><br/>
                <em style={{ color: '#7f8c8d' }}>Best for: Systems prioritizing speed and implementation simplicity</em>
              </p>
            </div>
          ) : algorithm === 'best-fit' ? (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              borderLeft: '4px solid #27ae60'
            }}>
              <p style={{ margin: 0, lineHeight: '1.8', color: '#2c3e50' }}>
                <strong style={{ color: '#27ae60', fontSize: '1.1rem' }}>Best Fit</strong>
                <br/><br/>
                Allocates memory to the smallest available partition that can accommodate the process. 
                This approach minimizes wasted space by leaving the smallest possible gaps, resulting in less fragmentation 
                but requiring more searching time.
                <br/><br/>
                <em style={{ color: '#7f8c8d' }}>Best for: Systems needing to minimize memory fragmentation</em>
              </p>
            </div>
          ) : algorithm === 'worst-fit' ? (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              borderLeft: '4px solid #e74c3c'
            }}>
              <p style={{ margin: 0, lineHeight: '1.8', color: '#2c3e50' }}>
                <strong style={{ color: '#e74c3c', fontSize: '1.1rem' }}>Worst Fit</strong>
                <br/><br/>
                Allocates memory to the largest available partition, leaving the largest possible free space for future processes. 
                While this preserves larger contiguous memory blocks, it can be slower and may still result in fragmentation 
                depending on the workload pattern.
                <br/><br/>
                <em style={{ color: '#7f8c8d' }}>Best for: Systems expecting varied process sizes</em>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {result && (
        <div className='section' style={{ backgroundColor: '#f8fcff', borderTop: '4px solid #e67e22', marginTop: '2.5rem' }}>
          <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Allocation Results: {result.algorithm}</h2>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'white', 
            borderRadius: '6px', 
            marginBottom: '1.5rem',
            borderLeft: '4px solid #3498db'
          }}>
            <strong style={{ color: '#2c3e50', fontSize: '1.1rem' }}>Total Memory:</strong> 
            <span style={{ marginLeft: '1rem', color: '#27ae60', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {result.memorySize} units
            </span>
          </div>

          <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #27ae60', paddingBottom: '0.5rem' }}>Allocation Details</h3>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>Process ID</th>
                  <th>Size</th>
                  <th>Start Address</th>
                  <th>End Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {result.allocation.map((alloc, index) => (
                  <tr key={index} style={{ 
                    backgroundColor: alloc.status === 'Allocated' ? '#d4edda' : '#f8d7da' 
                  }}>
                    <td>{alloc.processId}</td>
                    <td>{alloc.size}</td>
                    <td>{alloc.startAddress !== undefined ? alloc.startAddress : '-'}</td>
                    <td>{alloc.endAddress !== undefined ? alloc.endAddress : '-'}</td>
                    <td>{alloc.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='result-box' style={{ marginTop: '1.5rem' }}>
            <h3>Summary</h3>
            <div className='result-item'>
              <span className='result-label'>Allocated Processes:</span>
              <span className='result-value'>{result.allocatedProcesses}</span>
            </div>
            <div className='result-item'>
              <span className='result-label'>External Fragmentation:</span>
              <span className='result-value'>{result.fragmentation}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryManagement
