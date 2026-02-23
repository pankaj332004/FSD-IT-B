/**
 * API client service with error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

/**
 * Fetch wrapper with error handling
 */
async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'API request failed', response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network error', 0);
  }
}

// CPU Scheduling Services
export const cpuSchedulingService = {
  fcfs: (processes) =>
    apiFetch('/cpu-scheduling/fcfs', {
      method: 'POST',
      body: JSON.stringify({ processes })
    }),

  sjf: (processes) =>
    apiFetch('/cpu-scheduling/sjf', {
      method: 'POST',
      body: JSON.stringify({ processes })
    }),

  roundRobin: (processes, timeQuanta) =>
    apiFetch('/cpu-scheduling/round-robin', {
      method: 'POST',
      body: JSON.stringify({ processes, timeQuanta })
    }),

  priority: (processes) =>
    apiFetch('/cpu-scheduling/priority', {
      method: 'POST',
      body: JSON.stringify({ processes })
    })
};

// Memory Management Services
export const memoryManagementService = {
  firstFit: (processes, memorySize) =>
    apiFetch('/memory-management/first-fit', {
      method: 'POST',
      body: JSON.stringify({ processes, memorySize })
    }),

  bestFit: (processes, memorySize) =>
    apiFetch('/memory-management/best-fit', {
      method: 'POST',
      body: JSON.stringify({ processes, memorySize })
    }),

  worstFit: (processes, memorySize) =>
    apiFetch('/memory-management/worst-fit', {
      method: 'POST',
      body: JSON.stringify({ processes, memorySize })
    })
};

// Disk Scheduling Services
export const diskSchedulingService = {
  fcfs: (requests, startPos) =>
    apiFetch('/disk-scheduling/fcfs', {
      method: 'POST',
      body: JSON.stringify({ requests, startPos })
    }),

  sstf: (requests, startPos) =>
    apiFetch('/disk-scheduling/sstf', {
      method: 'POST',
      body: JSON.stringify({ requests, startPos })
    }),

  scan: (requests, startPos, diskSize) =>
    apiFetch('/disk-scheduling/scan', {
      method: 'POST',
      body: JSON.stringify({ requests, startPos, diskSize })
    }),

  cscan: (requests, startPos, diskSize) =>
    apiFetch('/disk-scheduling/c-scan', {
      method: 'POST',
      body: JSON.stringify({ requests, startPos, diskSize })
    })
};
