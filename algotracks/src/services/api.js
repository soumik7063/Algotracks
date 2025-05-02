/**
 * Base API service with common utility functions
 */
export const handleResponse = async (response) => {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `Error: ${response.status}`);
    }
    
    return await response.json();
  };
  
  export const handleError = (error) => {
    console.log('API Error:', error);
    return {
      status: 'error',
      message: error.message || 'An unknown error occurred'
    };
  };
  
  /**
   * Creates a cancelable fetch request
   * @param {string} url - The URL to fetch
   * @param {object} options - Fetch options
   * @returns {object} - Contains the promise and abort controller
   */
  export const createCancelableFetch = (url, options = {}) => {
    const controller = new AbortController();
    const { signal } = controller;
    
    const promise = fetch(url, { ...options, signal })
      .then(handleResponse)
      .catch(handleError);
    
    return {
      promise,
      cancel: () => controller.abort()
    };
  };