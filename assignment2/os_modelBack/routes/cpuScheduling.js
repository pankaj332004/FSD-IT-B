import express from 'express';
import { 
  validateProcessInput, 
  validatePriorityInput, 
  validateTimeQuanta,
  asyncHandler 
} from '../utils/validation.js';

const router = express.Router();

// FCFS - First Come First Served
function fcfs(processes) {
  let currentTime = 0;
  const result = processes.map(p => {
    const startTime = currentTime;
    const completionTime = currentTime + p.burstTime;
    const turnaroundTime = completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    currentTime = completionTime;
    return {
      processId: p.processId,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    };
  });
  return result;
}

// SJF - Shortest Job First
function sjf(processes) {
  const sorted = [...processes].sort((a, b) => a.burstTime - b.burstTime);
  let currentTime = 0;
  const result = sorted.map(p => {
    const startTime = currentTime;
    const completionTime = currentTime + p.burstTime;
    const turnaroundTime = completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    currentTime = completionTime;
    return {
      processId: p.processId,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    };
  });
  return result;
}

// Round Robin
function roundRobin(processes, timeQuanta) {
  const queue = [...processes].map(p => ({ ...p, remainingTime: p.burstTime }));
  const result = [];
  let currentTime = 0;
  const execution = [];

  while (queue.length > 0) {
    const process = queue.shift();
    const timeSlice = Math.min(process.remainingTime, timeQuanta);
    execution.push({
      processId: process.processId,
      startTime: currentTime,
      endTime: currentTime + timeSlice
    });
    currentTime += timeSlice;
    process.remainingTime -= timeSlice;
    if (process.remainingTime > 0) {
      queue.push(process);
    } else {
      const turnaroundTime = currentTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;
      result.push({
        processId: process.processId,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        completionTime: currentTime,
        turnaroundTime,
        waitingTime
      });
    }
  }

  return { stats: result, execution };
}

// Priority Scheduling
function priorityScheduling(processes) {
  const sorted = [...processes].sort((a, b) => a.priority - b.priority);
  let currentTime = 0;
  const result = sorted.map(p => {
    const startTime = currentTime;
    const completionTime = currentTime + p.burstTime;
    const turnaroundTime = completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    currentTime = completionTime;
    return {
      processId: p.processId,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      priority: p.priority,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    };
  });
  return result;
}

/**
 * Calculate summary statistics
 */
function calculateStats(processes) {
  const avgWaitingTime = processes.reduce((sum, p) => sum + p.waitingTime, 0) / processes.length;
  const avgTurnaroundTime = processes.reduce((sum, p) => sum + p.turnaroundTime, 0) / processes.length;
  return { avgWaitingTime, avgTurnaroundTime };
}

// API Endpoints

/**
 * POST /fcfs
 * First Come First Served scheduling
 */
router.post('/fcfs', asyncHandler(async (req, res) => {
  const { processes } = req.body;
  
  validateProcessInput(processes);
  
  const result = fcfs(processes);
  const stats = calculateStats(result);

  res.status(200).json({
    success: true,
    algorithm: 'FCFS - First Come First Served',
    processes: result,
    ...stats
  });
}));

/**
 * POST /sjf
 * Shortest Job First scheduling
 */
router.post('/sjf', asyncHandler(async (req, res) => {
  const { processes } = req.body;
  
  validateProcessInput(processes);
  
  const result = sjf(processes);
  const stats = calculateStats(result);

  res.status(200).json({
    success: true,
    algorithm: 'SJF - Shortest Job First',
    processes: result,
    ...stats
  });
}));

/**
 * POST /round-robin
 * Round Robin scheduling
 */
router.post('/round-robin', asyncHandler(async (req, res) => {
  const { processes, timeQuanta } = req.body;
  
  validateProcessInput(processes);
  validateTimeQuanta(timeQuanta);
  
  const { stats, execution } = roundRobin(processes, timeQuanta);
  const summary = calculateStats(stats);

  res.status(200).json({
    success: true,
    algorithm: 'Round Robin',
    timeQuanta,
    processes: stats,
    execution,
    ...summary
  });
}));

/**
 * POST /priority
 * Priority scheduling
 */
router.post('/priority', asyncHandler(async (req, res) => {
  const { processes } = req.body;
  
  validatePriorityInput(processes);
  
  const result = priorityScheduling(processes);
  const stats = calculateStats(result);

  res.status(200).json({
    success: true,
    algorithm: 'Priority Scheduling',
    processes: result,
    ...stats
  });
}));

export const cpuSchedulingRoutes = router;
