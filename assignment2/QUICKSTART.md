# OS Model Assignment - Quick Start Guide

## Overview

This OS Model Simulator is a full-stack application for simulating Operating System algorithms:
- **Frontend**: React + Vite (interactive UI)
- **Backend**: Node.js + Express (API)

## Quick Start

### Step 1: Install Backend Dependencies

```bash
cd assignment2/os_modelBack
npm install
```

### Step 2: Start Backend Server

```bash
npm start
```

You should see: `Server running on http://localhost:5000`

### Step 3: Install Frontend Dependencies (in a new terminal)

```bash
cd assignment2/os_model
npm install
```

### Step 4: Start Frontend Development Server

```bash
npm run dev
```

You should see: `Local: http://localhost:5173/`

### Step 5: Open in Browser

Visit `http://localhost:5173/` in your web browser. You should see the OS Model Simulator homepage.

## What's Included

### Backend (os_modelBack/)

**CPU Scheduling (`/api/cpu-scheduling`)**
- FCFS (First Come First Served)
- SJF (Shortest Job First)
- Round Robin
- Priority Scheduling

**Memory Management (`/api/memory-management`)**
- First Fit Allocation
- Best Fit Allocation
- Worst Fit Allocation

**Disk Scheduling (`/api/disk-scheduling`)**
- FCFS (First Come First Served)
- SSTF (Shortest Seek Time First)
- SCAN Algorithm
- C-SCAN Algorithm

### Frontend (os_model/)

**Pages:**
- Home: Overview and feature introduction
- CPU Scheduling: Interactive simulator for 4 scheduling algorithms
- Memory Management: Memory allocation visualization
- Disk Scheduling: Disk I/O optimization simulator

**Features:**
- Interactive parameter inputs
- Real-time algorithm execution
- Detailed metrics and results
- Responsive design

## How to Use

1. **Navigate** to your desired algorithm using the navigation bar
2. **Enter** your parameters (processes, memory size, disk requests, etc.)
3. **Click** "Simulate" button
4. **View** detailed results including:
   - Process/allocation details
   - Performance metrics
   - Visualization data

## Example: CPU Scheduling

1. Go to "CPU Scheduling" page
2. Select "FCFS - First Come First Served"
3. Default processes are pre-loaded
4. Click "Simulate"
5. View results: completion time, waiting time, turnaround time, and averages

## Example: Memory Management

1. Go to "Memory Management" page
2. Select "First Fit" algorithm
3. Adjust memory size (default: 100)
4. View preloaded processes
5. Click "Allocate Memory"
6. See allocation details and fragmentation

## Example: Disk Scheduling

1. Go to "Disk Scheduling" page
2. Select "SSTF - Shortest Seek Time First"
3. Adjust start position and disk requests
4. Click "Simulate"
5. View seek sequence and total seek time

## Troubleshooting

### Backend doesn't start
- Ensure Node.js is installed: `node --version`
- Check if port 5000 is available
- Try: `npm install` again

### Frontend can't connect to backend
- Verify backend is running on http://localhost:5000
- Check browser console for CORS errors
- Ensure both terminals are running the servers

### Port already in use
- Backend: `netstat -ano | findstr :5000` (Windows) then kill the process
- Frontend: Vite will assign alternative port (usually 5174)

## Project Structure

```
assignment2/
├── os_model/                    # Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CPUScheduling.jsx
│   │   │   ├── MemoryManagement.jsx
│   │   │   └── DiskScheduling.jsx
│   │   ├── App.jsx
│   │   ├── Navbar.jsx
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── README.md
│
└── os_modelBack/                # Backend
    ├── routes/
    │   ├── cpuScheduling.js
    │   ├── memoryManagement.js
    │   └── diskScheduling.js
    ├── server.js
    ├── package.json
    └── README.md
```

## Technologies

### Frontend
- React 19.2.0
- Vite (Build tool)
- CSS3
- JavaScript ES6+

### Backend
- Node.js
- Express.js 4.18.2
- CORS 2.8.5
- Body Parser 1.20.2

## Learning Outcomes

After using this simulator, you'll understand:

✅ How CPU scheduling affects process execution and system performance  
✅ Different memory allocation strategies and fragmentation  
✅ Disk I/O optimization and seek time reduction  
✅ Performance metrics for comparing algorithms  
✅ Real-world applications of each algorithm  

## Tips for Better Learning

1. **Compare algorithms**: Run the same scenario with different algorithms
2. **Analyze metrics**: Focus on average waiting time and turnaround time
3. **Experiment**: Try different process configurations
4. **Understand trade-offs**: No algorithm is perfect for all scenarios
5. **Visualize**: Watch how the order of execution changes

## Next Steps

- Try different parameter values
- Compare performance across algorithms
- Experiment with edge cases
- Document your findings

## Support

For questions or issues:
1. Check the README files in each folder
2. Review the algorithm explanations in the UI
3. Examine the code comments in the backend routes

## Credits

- Pankaj (pankaj332004)
- ABESEC CSE Department

Happy Learning! 🚀
