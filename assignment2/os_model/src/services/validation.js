/**
 * Frontend validation utilities
 */

export const validateProcesses = (processes) => {
  if (!processes || processes.length === 0) {
    throw new Error('At least one process is required');
  }

  processes.forEach((p, index) => {
    if (!p.processId || p.processId.trim() === '') {
      throw new Error(`Process ${index + 1}: ID cannot be empty`);
    }
    if (isNaN(p.arrivalTime) || p.arrivalTime < 0) {
      throw new Error(`Process ${index + 1}: Arrival time must be non-negative`);
    }
    if (isNaN(p.burstTime) || p.burstTime <= 0) {
      throw new Error(`Process ${index + 1}: Burst time must be positive`);
    }
  });
};

export const validateMemory = (processes, memorySize) => {
  if (!processes || processes.length === 0) {
    throw new Error('At least one process is required');
  }

  processes.forEach((p, index) => {
    if (!p.processId || p.processId.trim() === '') {
      throw new Error(`Process ${index + 1}: ID cannot be empty`);
    }
    if (isNaN(p.size) || p.size <= 0) {
      throw new Error(`Process ${index + 1}: Size must be positive`);
    }
  });
  
  if (isNaN(memorySize) || memorySize <= 0) {
    throw new Error('Memory size must be positive');
  }

  processes.forEach((p, index) => {
    if (p.size > memorySize) {
      throw new Error(`Process ${index + 1}: Size cannot exceed memory size`);
    }
  });
};

export const validateDiskRequests = (requests, startPos, diskSize = null) => {
  if (!requests || requests.length === 0) {
    throw new Error('At least one disk request is required');
  }

  if (isNaN(startPos) || startPos < 0) {
    throw new Error('Start position must be non-negative');
  }

  requests.forEach((req, index) => {
    if (isNaN(req) || req < 0) {
      throw new Error(`Request ${index + 1}: Cylinder must be non-negative`);
    }
  });

  if (diskSize) {
    if (isNaN(diskSize) || diskSize <= 0) {
      throw new Error('Disk size must be positive');
    }
    if (startPos >= diskSize) {
      throw new Error('Start position must be less than disk size');
    }
  }
};

export const validateTimeQuanta = (timeQuanta) => {
  if (isNaN(timeQuanta) || timeQuanta <= 0) {
    throw new Error('Time quanta must be positive');
  }
};

export const validatePriority = (processes) => {
  validateProcesses(processes);
  
  processes.forEach((p, index) => {
    if (isNaN(p.priority) || p.priority < 1) {
      throw new Error(`Process ${index + 1}: Priority must be positive`);
    }
  });
};
