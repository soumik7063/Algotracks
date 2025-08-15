import { handleResponse, handleError } from './api';

// LeetCode doesn't have a public REST API, but they have a GraphQL API
const NEW_API_URL = 'https://leetcode.com/graphql';
// const NEW_API_URL = 'https://algotracks.onrender.com/leetcode'
/**
 * Get user profile information
 * @param {string} username - LeetCode username
 * @returns {Promise<object>} - User profile data
 */
export const getUserProfile = async (username) => {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
            starRating
            realName
          }
        }
      }
    `;
    
    const response = await fetch(NEW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });
    
    const data = await handleResponse(response);
    // console.log(data);
    if (!data.data.matchedUser) {
      return {
        status: 'error',
        message: 'User not found'
      };
    }
    
    return {
      status: 'success',
      data: data.data.matchedUser
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Get user's recent submissions
 * @param {string} username - LeetCode username
 * @param {number} limit - Number of submissions to fetch
 * @returns {Promise<object>} - Recent submissions
 */
export const getRecentSubmissions = async (username, limit = 10) => {
  try {
    const query = `
      query getRecentSubmissions($username: String!, $limit: Int!) {
        recentSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `;
    
    const response = await fetch(NEW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username, limit }
      })
    });
    
    const data = await handleResponse(response);
    
    return {
      status: 'success',
      data: data.data.recentSubmissionList
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Get upcoming contests from LeetCode
 * @returns {Promise<object>} - List of contests
 */
export const getUpcomingContests = async () => {
  try {
    const query = `
      query getContests {
        allContests {
          title
          titleSlug
          startTime
          duration
          description
        }
      }
    `;
    
    const response = await fetch(NEW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    
    const data = await handleResponse(response);
    
    // Filter for upcoming contests
    const now = Math.floor(Date.now() / 1000);
    const upcomingContests = data.data.allContests.filter(
      contest => contest.startTime > now
    );
    
    return {
      status: 'success',
      data: upcomingContests
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getPastContests = async () => {
  try {
    const query = `
      query getContests {
        allContests {
          title
          titleSlug
          startTime
          duration
          description
        }
      }
    `;

    const response = await fetch(NEW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    const data = await handleResponse(response);

    // Filter for past contests
    const now = Math.floor(Date.now() / 1000);
    const pastContests = data.data.allContests.filter(
      contest => contest.startTime + contest.duration < now
    );

    return {
      status: 'success',
      data: pastContests
    };
  } catch (error) {
    return handleError(error);
  }
};
