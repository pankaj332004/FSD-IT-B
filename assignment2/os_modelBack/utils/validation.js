/**
 * Validation and utility functions for OS Model Backend
 */

/**
 * Validates process input for CPU scheduling
 */
export const validateProcessInput = (processes) => {
  if (!Array.isArray(processes) || processes.length === 0) {
    throw new Error('Processes must be a non-empty array');
  }

  processes.forEach((p, index) => {
    if (!p.processId || typeof p.processId !== 'string') {
      throw new Error(`Process ${index}: processId must be a non-empty string`);
    }
    if (typeof p.arrivalTime !== 'number' || p.arrivalTime < 0) {
      throw new Error(`Process ${index}: arrivalTime must be a non-negative number`);
    }
    if (typeof p.burstTime !== 'number' || p.burstTime <= 0) {
      throw new Error(`Process ${index}: burstTime must be a positive number`);
    }
  });
};

/**
 * Validates priority scheduling input
 */
export const validatePriorityInput = (processes) => {
  validateProcessInput(processes);
  processes.forEach((p, index) => {
    if (typeof p.priority !== 'number' || p.priority < 1) {
      throw new Error(`Process ${index}: priority must be a positive number`);
    }
  });
};

/**
 * Validates memory management input
 */
export const validateMemoryInput = (processes, memorySize) => {
  if (!Array.isArray(processes) || processes.length === 0) {
    throw new Error('Processes must be a non-empty array');
  }
  if (typeof memorySize !== 'number' || memorySize <= 0) {
    throw new Error('memorySize must be a positive number');
  }

  processes.forEach((p, index) => {
    if (!p.processId || typeof p.processId !== 'string') {
      throw new Error(`Process ${index}: processId must be a non-empty string`);
    }
    if (typeof p.size !== 'number' || p.size <= 0) {
      throw new Error(`Process ${index}: size must be a positive number`);
    }
    if (p.size > memorySize) {
      throw new Error(`Process ${index}: size cannot exceed total memory size`);
    }
  });
};

/**
 * Validates disk scheduling input
 */
export const validateDiskInput = (requests, startPos, diskSize = null) => {
  if (!Array.isArray(requests) || requests.length === 0) {
    throw new Error('Requests must be a non-empty array');
  }
  if (typeof startPos !== 'number' || startPos < 0) {
    throw new Error('startPos must be a non-negative number');
  }

  requests.forEach((req, index) => {
    if (typeof req !== 'number' || req < 0) {
      throw new Error(`Request ${index}: cylinder must be a non-negative number`);
    }
  });

  if (diskSize !== null) {
    if (typeof diskSize !== 'number' || diskSize <= 0) {
      throw new Error('diskSize must be a positive number');
    }
    if (startPos >= diskSize) {
      throw new Error('startPos must be less than diskSize');
    }
    requests.forEach((req, index) => {
      if (req >= diskSize) {
        throw new Error(`Request ${index}: cylinder must be less than diskSize`);
      }
    });
  }
};

/**
 * Validates time quanta for round robin
 */
export const validateTimeQuanta = (timeQuanta) => {
  if (typeof timeQuanta !== 'number' || timeQuanta <= 0) {
    throw new Error('timeQuanta must be a positive number');
  }
};

/**
 * Creates a custom error with status code
 */
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'ValidationError';
  }
}

/**
 * Wraps route handlers with error handling
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
