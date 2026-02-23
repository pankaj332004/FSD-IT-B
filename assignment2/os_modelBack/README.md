# OS Model Backend

RESTful API backend for Operating System algorithms simulation.

## Installation

```bash
npm install
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on `http://localhost:5000`

## API Documentation

### CPU Scheduling Endpoints

#### FCFS - First Come First Served
```
POST /api/cpu-scheduling/fcfs
```
Request:
```json
{
  "processes": [
    { "processId": "P1", "arrivalTime": 0, "burstTime": 8 },
    { "processId": "P2", "arrivalTime": 1, "burstTime": 4 }
  ]
}
```

#### SJF - Shortest Job First
```
POST /api/cpu-scheduling/sjf
```

#### Round Robin
```
POST /api/cpu-scheduling/round-robin
```
Request:
```json
{
  "processes": [...],
  "timeQuanta": 2
}
```

#### Priority Scheduling
```
POST /api/cpu-scheduling/priority
```
Request:
```json
{
  "processes": [
    { "processId": "P1", "arrivalTime": 0, "burstTime": 8, "priority": 1 },
    ...
  ]
}
```

### Memory Management Endpoints

#### First Fit
```
POST /api/memory-management/first-fit
```
Request:
```json
{
  "processes": [
    { "processId": "P1", "size": 20 }
  ],
  "memorySize": 100
}
```

#### Best Fit
```
POST /api/memory-management/best-fit
```

#### Worst Fit
```
POST /api/memory-management/worst-fit
```

### Disk Scheduling Endpoints

#### FCFS - First Come First Served
```
POST /api/disk-scheduling/fcfs
```
Request:
```json
{
  "requests": [20, 85, 30, 60],
  "startPos": 50
}
```

#### SSTF - Shortest Seek Time First
```
POST /api/disk-scheduling/sstf
```

#### SCAN
```
POST /api/disk-scheduling/scan
```
Request:
```json
{
  "requests": [...],
  "startPos": 50,
  "diskSize": 100
}
```

#### C-SCAN
```
POST /api/disk-scheduling/c-scan
```

## Project Structure

```
os_modelBack/
├── routes/
│   ├── cpuScheduling.js
│   ├── memoryManagement.js
│   └── diskScheduling.js
├── server.js
├── package.json
└── README.md
```

## Dependencies

- **express**: Web framework
- **cors**: Cross-Origin Resource Sharing
- **body-parser**: Middleware for parsing request bodies

## License

Educational Purpose - ABESEC CSE Department
