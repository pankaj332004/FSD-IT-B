import React from 'react'

const Home = () => {
  return (
    <div className='page'>
      <div className='card'>
        <img src="https://media.licdn.com/dms/image/v2/C510BAQGHhq9X-H8LyQ/company-logo_200_200/company-logo_200_200/0/1631345366169?e=2147483647&v=beta&t=8hq7Hhr_Vlu6uIXpTU9yv31n6jB0_zBzvuFqHmHGwlg" alt="abes" />
        <h1>OS Model Simulator</h1>
        <p>A comprehensive tool for understanding Operating System concepts</p>
      </div>

      <h1 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Operating System Simulation & Learning Platform</h1>
      
      <div className='homeContainer' style={{ gap: '1.2rem', marginTop: '1rem' }}>
        <div className='featureCard' style={{ padding: '1.2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>🔄 CPU Scheduling</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: '0' }}>
            Explore how the CPU scheduler manages process execution. Simulate FCFS, SJF, Round Robin, 
            and Priority scheduling algorithms to understand their impact on average waiting time and 
            turnaround time.
          </p>
        </div>

        <div className='featureCard' style={{ padding: '1.2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>💾 Memory Management</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: '0' }}>
            Learn memory allocation strategies including First Fit, Best Fit, and Worst Fit algorithms. 
            Visualize how processes are allocated to memory and calculate external fragmentation.
          </p>
        </div>

        <div className='featureCard' style={{ padding: '1.2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>📁 Disk Scheduling</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: '0' }}>
            Understand disk I/O optimization using FCFS, SSTF, SCAN, and C-SCAN algorithms. 
            Compare seek times and disk head movements for different scheduling strategies.
          </p>
        </div>
      </div>

      <div className='section' style={{ backgroundColor: '#f8fcff', borderTop: '4px solid #3498db', marginTop: '1.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#2c3e50' }}>About This Project</h2>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1rem', 
          borderRadius: '6px', 
          borderLeft: '4px solid #3498db',
          marginBottom: '1.5rem',
          lineHeight: '1.8'
        }}>
          <p style={{ fontSize: '0.95rem', color: '#34495e', margin: 0 }}>
            This <strong>OS Model Simulator</strong> is a comprehensive interactive platform designed to help students, educators, and professionals understand fundamental Operating System concepts through engaging simulations. Each module provides deep insights into how different scheduling and allocation algorithms work, their performance characteristics, and real-world applications.
          </p>
        </div>

        <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '0.4rem', marginTop: '1rem', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Key Features</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '0.8rem', 
            borderRadius: '6px',
            borderLeft: '4px solid #27ae60',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#27ae60', marginTop: 0, marginBottom: '0.3rem', fontSize: '0.95rem' }}>⚡ Real-time Execution</h4>
            <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Run algorithm simulations instantly with live updates and see how each step impacts the system
            </p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '0.8rem', 
            borderRadius: '6px',
            borderLeft: '4px solid #e74c3c',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#e74c3c', marginTop: 0, marginBottom: '0.3rem', fontSize: '0.95rem' }}>📊 Performance Analysis</h4>
            <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Get detailed metrics including average waiting time, turnaround time, and other performance indicators
            </p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '0.8rem', 
            borderRadius: '6px',
            borderLeft: '4px solid #f39c12',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#f39c12', marginTop: 0, marginBottom: '0.3rem', fontSize: '0.95rem' }}>🎯 Interactive Controls</h4>
            <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Customize parameters and inputs to explore various scenarios and edge cases
            </p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '0.8rem', 
            borderRadius: '6px',
            borderLeft: '4px solid #9b59b6',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#9b59b6', marginTop: 0, marginBottom: '0.3rem', fontSize: '0.95rem' }}>🔍 Detailed Explanations</h4>
            <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Learn the theory behind each algorithm with comprehensive explanations
            </p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '0.8rem', 
            borderRadius: '6px',
            borderLeft: '4px solid #1abc9c',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#1abc9c', marginTop: 0, marginBottom: '0.3rem', fontSize: '0.95rem' }}>📈 Comparative Analysis</h4>
            <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Compare different algorithms to understand their trade-offs and advantages
            </p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '0.8rem', 
            borderRadius: '6px',
            borderLeft: '4px solid #e67e22',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h4 style={{ color: '#e67e22', marginTop: 0, marginBottom: '0.3rem', fontSize: '0.95rem' }}>🎓 Educational Focus</h4>
            <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Designed for learning with clear visualizations and intuitive interface
            </p>
          </div>
        </div>

        <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #2980b9', paddingBottom: '0.4rem', marginTop: '1rem', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Learning Modules</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(52, 152, 219, 0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #3498db'
          }}>
            <h4 style={{ color: '#2980b9', marginTop: 0, marginBottom: '0.5rem', fontSize: '0.95rem' }}>CPU Scheduling Algorithms</h4>
            <ul style={{ margin: '0', paddingLeft: '1.3rem', color: '#555', lineHeight: '1.6', fontSize: '0.85rem' }}>
              <li>First Come First Served (FCFS)</li>
              <li>Shortest Job First (SJF)</li>
              <li>Round Robin (RR)</li>
              <li>Priority Scheduling</li>
            </ul>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(39, 174, 96, 0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #27ae60'
          }}>
            <h4 style={{ color: '#229954', marginTop: 0, marginBottom: '0.5rem', fontSize: '0.95rem' }}>Memory Management Techniques</h4>
            <ul style={{ margin: '0', paddingLeft: '1.3rem', color: '#555', lineHeight: '1.6', fontSize: '0.85rem' }}>
              <li>First Fit Allocation</li>
              <li>Best Fit Allocation</li>
              <li>Worst Fit Allocation</li>
              <li>Fragmentation Analysis</li>
            </ul>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(155, 89, 182, 0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #9b59b6'
          }}>
            <h4 style={{ color: '#8e44ad', marginTop: 0, marginBottom: '0.5rem', fontSize: '0.95rem' }}>Disk I/O Scheduling</h4>
            <ul style={{ margin: '0', paddingLeft: '1.3rem', color: '#555', lineHeight: '1.6', fontSize: '0.85rem' }}>
              <li>FCFS (First Come First Served)</li>
              <li>SSTF (Shortest Seek Time First)</li>
              <li>SCAN Algorithm</li>
              <li>C-SCAN Algorithm</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '1rem', 
          borderRadius: '6px',
          borderLeft: '4px solid #e74c3c',
          marginTop: '1.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h4 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '0.5rem', fontSize: '0.95rem' }}>💡 How to Use</h4>
          <ol style={{ margin: '0', paddingLeft: '1.3rem', color: '#555', lineHeight: '1.6', fontSize: '0.85rem' }}>
            <li>Select a module from the navigation menu</li>
            <li>Enter your process/request parameters or use default values</li>
            <li>Choose an algorithm to simulate</li>
            <li>Click "Simulate" to run the algorithm</li>
            <li>Analyze the results including metrics and execution timeline</li>
            <li>Try different scenarios to understand algorithm behavior</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Home
