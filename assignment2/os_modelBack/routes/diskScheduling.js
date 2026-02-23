import express from 'express';
import { validateDiskInput, asyncHandler } from '../utils/validation.js';

const router = express.Router();

// FCFS - First Come First Served
function diskFCFS(requests, startPos) {
  const sequence = [];
  let totalSeek = 0;
  let currentPos = startPos;

  requests.forEach(req => {
    const seek = Math.abs(currentPos - req);
    totalSeek += seek;
    sequence.push({
      cylinder: req,
      seek: seek,
      totalSeek: totalSeek
    });
    currentPos = req;
  });

  return {
    sequence,
    totalSeekTime: totalSeek,
    avgSeekTime: (totalSeek / requests.length).toFixed(2)
  };
}

// SSTF - Shortest Seek Time First
function diskSSTF(requests, startPos) {
  const remaining = [...requests];
  const sequence = [];
  let totalSeek = 0;
  let currentPos = startPos;

  while (remaining.length > 0) {
    let nearestIdx = 0;
    let nearestDistance = Math.abs(currentPos - remaining[0]);

    for (let i = 1; i < remaining.length; i++) {
      const distance = Math.abs(currentPos - remaining[i]);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIdx = i;
      }
    }

    const cylinder = remaining[nearestIdx];
    totalSeek += nearestDistance;
    sequence.push({
      cylinder,
      seek: nearestDistance,
      totalSeek
    });
    currentPos = cylinder;
    remaining.splice(nearestIdx, 1);
  }

  return {
    sequence,
    totalSeekTime: totalSeek,
    avgSeekTime: (totalSeek / requests.length).toFixed(2)
  };
}

// SCAN Algorithm
function diskSCAN(requests, startPos, diskSize) {
  const sequence = [];
  let totalSeek = 0;
  const sorted = [...requests].sort((a, b) => a - b);

  const left = sorted.filter(x => x < startPos);
  const right = sorted.filter(x => x >= startPos);

  let currentPos = startPos;

  // Go right first
  right.forEach(req => {
    const seek = Math.abs(currentPos - req);
    totalSeek += seek;
    sequence.push({ cylinder: req, seek, totalSeek });
    currentPos = req;
  });

  // Go to end
  let seek = Math.abs(currentPos - diskSize);
  totalSeek += seek;
  currentPos = diskSize;

  // Go left
  left.reverse().forEach(req => {
    seek = Math.abs(currentPos - req);
    totalSeek += seek;
    sequence.push({ cylinder: req, seek, totalSeek });
    currentPos = req;
  });

  return {
    sequence,
    totalSeekTime: totalSeek,
    avgSeekTime: (totalSeek / requests.length).toFixed(2)
  };
}

// C-SCAN Algorithm
function diskCSCAN(requests, startPos, diskSize) {
  const sequence = [];
  let totalSeek = 0;
  const sorted = [...requests].sort((a, b) => a - b);

  const left = sorted.filter(x => x < startPos);
  const right = sorted.filter(x => x >= startPos);

  let currentPos = startPos;

  // Go right
  right.forEach(req => {
    const seek = Math.abs(currentPos - req);
    totalSeek += seek;
    sequence.push({ cylinder: req, seek, totalSeek });
    currentPos = req;
  });

  // Go to end
  let seek = Math.abs(currentPos - diskSize);
  totalSeek += seek;
  currentPos = diskSize;

  // Go to start
  seek = Math.abs(currentPos - 0);
  totalSeek += seek;
  currentPos = 0;

  // Go left to right
  left.forEach(req => {
    seek = Math.abs(currentPos - req);
    totalSeek += seek;
    sequence.push({ cylinder: req, seek, totalSeek });
    currentPos = req;
  });

  return {
    sequence,
    totalSeekTime: totalSeek,
    avgSeekTime: (totalSeek / requests.length).toFixed(2)
  };
}

// API Endpoints

/**
 * POST /fcfs
 * FCFS disk scheduling
 */
router.post('/fcfs', asyncHandler(async (req, res) => {
  const { requests, startPos } = req.body;
  
  validateDiskInput(requests, startPos);
  
  const result = diskFCFS(requests, startPos);
  
  res.status(200).json({
    success: true,
    algorithm: 'FCFS - First Come First Served',
    startPos,
    sequence: result.sequence.map(s => s.cylinder),
    seekTimes: result.sequence.map(s => s.seek),
    totalSeekTime: result.totalSeekTime,
    averageSeekTime: result.avgSeekTime
  });
}));

/**
 * POST /sstf
 * SSTF disk scheduling
 */
router.post('/sstf', asyncHandler(async (req, res) => {
  const { requests, startPos } = req.body;
  
  validateDiskInput(requests, startPos);
  
  const result = diskSSTF(requests, startPos);
  
  res.status(200).json({
    success: true,
    algorithm: 'SSTF - Shortest Seek Time First',
    startPos,
    sequence: result.sequence.map(s => s.cylinder),
    seekTimes: result.sequence.map(s => s.seek),
    totalSeekTime: result.totalSeekTime,
    averageSeekTime: result.avgSeekTime
  });
}));

/**
 * POST /scan
 * SCAN disk scheduling
 */
router.post('/scan', asyncHandler(async (req, res) => {
  const { requests, startPos, diskSize } = req.body;
  
  validateDiskInput(requests, startPos, diskSize);
  
  const result = diskSCAN(requests, startPos, diskSize);
  
  res.status(200).json({
    success: true,
    algorithm: 'SCAN',
    startPos,
    diskSize,
    sequence: result.sequence.map(s => s.cylinder),
    seekTimes: result.sequence.map(s => s.seek),
    totalSeekTime: result.totalSeekTime,
    averageSeekTime: result.avgSeekTime
  });
}));

/**
 * POST /c-scan
 * C-SCAN disk scheduling
 */
router.post('/c-scan', asyncHandler(async (req, res) => {
  const { requests, startPos, diskSize } = req.body;
  
  validateDiskInput(requests, startPos, diskSize);
  
  const result = diskCSCAN(requests, startPos, diskSize);
  
  res.status(200).json({
    success: true,
    algorithm: 'C-SCAN',
    startPos,
    diskSize,
    sequence: result.sequence.map(s => s.cylinder),
    seekTimes: result.sequence.map(s => s.seek),
    totalSeekTime: result.totalSeekTime,
    averageSeekTime: result.avgSeekTime
  });
}));

export const diskSchedulingRoutes = router;
