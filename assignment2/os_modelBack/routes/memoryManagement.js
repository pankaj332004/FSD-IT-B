import express from 'express';
import { validateMemoryInput, asyncHandler } from '../utils/validation.js';

const router = express.Router();

// First Fit Memory Allocation
function firstFit(processes, memorySize) {
  const memory = new Array(memorySize).fill(false);
  const allocation = [];

  processes.forEach(process => {
    let allocated = false;
    for (let i = 0; i <= memorySize - process.size; i++) {
      if (!memory[i]) {
        let canAllocate = true;
        for (let j = i; j < i + process.size; j++) {
          if (memory[j]) {
            canAllocate = false;
            break;
          }
        }
        if (canAllocate) {
          for (let j = i; j < i + process.size; j++) {
            memory[j] = process.processId;
          }
          allocation.push({
            processId: process.processId,
            size: process.size,
            startAddress: i,
            endAddress: i + process.size - 1,
            status: 'Allocated'
          });
          allocated = true;
          break;
        }
      }
    }
    if (!allocated) {
      allocation.push({
        processId: process.processId,
        size: process.size,
        status: 'Not Allocated'
      });
    }
  });

  return { allocation, memory };
}

// Best Fit Memory Allocation
function bestFit(processes, memorySize) {
  const memory = new Array(memorySize).fill(false);
  const allocation = [];

  processes.forEach(process => {
    let bestAddress = -1;
    let bestSize = memorySize + 1;

    for (let i = 0; i <= memorySize - process.size; i++) {
      let canAllocate = true;
      for (let j = i; j < i + process.size; j++) {
        if (memory[j]) {
          canAllocate = false;
          break;
        }
      }
      if (canAllocate) {
        if (process.size < bestSize) {
          bestAddress = i;
          bestSize = process.size;
        }
      }
    }

    if (bestAddress !== -1) {
      for (let j = bestAddress; j < bestAddress + process.size; j++) {
        memory[j] = process.processId;
      }
      allocation.push({
        processId: process.processId,
        size: process.size,
        startAddress: bestAddress,
        endAddress: bestAddress + process.size - 1,
        status: 'Allocated'
      });
    } else {
      allocation.push({
        processId: process.processId,
        size: process.size,
        status: 'Not Allocated'
      });
    }
  });

  return { allocation, memory };
}

// Worst Fit Memory Allocation
function worstFit(processes, memorySize) {
  const memory = new Array(memorySize).fill(false);
  const allocation = [];

  processes.forEach(process => {
    let worstAddress = -1;
    let worstSize = -1;

    for (let i = 0; i <= memorySize - process.size; i++) {
      let freeSize = 0;
      let start = i;
      while (i < memorySize && !memory[i]) {
        freeSize++;
        i++;
      }
      i--;

      if (freeSize >= process.size && freeSize > worstSize) {
        worstAddress = start;
        worstSize = freeSize;
      }
    }

    if (worstAddress !== -1) {
      for (let j = worstAddress; j < worstAddress + process.size; j++) {
        memory[j] = process.processId;
      }
      allocation.push({
        processId: process.processId,
        size: process.size,
        startAddress: worstAddress,
        endAddress: worstAddress + process.size - 1,
        status: 'Allocated'
      });
    } else {
      allocation.push({
        processId: process.processId,
        size: process.size,
        status: 'Not Allocated'
      });
    }
  });

  return { allocation, memory };
}

/**
 * Calculate fragmentation metrics
 */
function calculateFragmentation(allocation, memorySize) {
  const allocated = allocation
    .filter(a => a.status === 'Allocated')
    .reduce((sum, a) => sum + a.size, 0);
  const fragmentation = ((memorySize - allocated) / memorySize * 100).toFixed(2);
  return { allocated, fragmentation };
}

// API Endpoints

/**
 * POST /first-fit
 * First Fit memory allocation
 */
router.post('/first-fit', asyncHandler(async (req, res) => {
  const { processes, memorySize } = req.body;
  
  validateMemoryInput(processes, memorySize);
  
  const result = firstFit(processes, memorySize);
  const { allocated, fragmentation } = calculateFragmentation(result.allocation, memorySize);

  res.status(200).json({
    success: true,
    algorithm: 'First Fit',
    memorySize,
    allocation: result.allocation,
    allocatedProcesses: allocated,
    fragmentation: `${fragmentation}%`
  });
}));

/**
 * POST /best-fit
 * Best Fit memory allocation
 */
router.post('/best-fit', asyncHandler(async (req, res) => {
  const { processes, memorySize } = req.body;
  
  validateMemoryInput(processes, memorySize);
  
  const result = bestFit(processes, memorySize);
  const { allocated, fragmentation } = calculateFragmentation(result.allocation, memorySize);

  res.status(200).json({
    success: true,
    algorithm: 'Best Fit',
    memorySize,
    allocation: result.allocation,
    allocatedProcesses: allocated,
    fragmentation: `${fragmentation}%`
  });
}));

/**
 * POST /worst-fit
 * Worst Fit memory allocation
 */
router.post('/worst-fit', asyncHandler(async (req, res) => {
  const { processes, memorySize } = req.body;
  
  validateMemoryInput(processes, memorySize);
  
  const result = worstFit(processes, memorySize);
  const { allocated, fragmentation } = calculateFragmentation(result.allocation, memorySize);

  res.status(200).json({
    success: true,
    algorithm: 'Worst Fit',
    memorySize,
    allocation: result.allocation,
    allocatedProcesses: allocated,
    fragmentation: `${fragmentation}%`
  });
}));

export const memoryManagementRoutes = router;
