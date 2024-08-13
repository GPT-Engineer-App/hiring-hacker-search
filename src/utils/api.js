import { parseJobListings } from './jobParser';

const HN_API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const WHO_IS_HIRING_USER_ID = 16582570;

export const fetchJobListings = async () => {
  try {
    // Fetch the latest "Who is hiring?" thread
    const response = await fetch(`${HN_API_BASE_URL}/user/${WHO_IS_HIRING_USER_ID}/submitted.json`);
    const submittedItems = await response.json();
    const latestThreadId = submittedItems[0];

    // Fetch the thread details
    const threadResponse = await fetch(`${HN_API_BASE_URL}/item/${latestThreadId}.json`);
    const threadDetails = await threadResponse.json();

    // Fetch all comments (job listings)
    const commentPromises = threadDetails.kids.map(id =>
      fetch(`${HN_API_BASE_URL}/item/${id}.json`).then(res => res.json())
    );
    const comments = await Promise.all(commentPromises);

    // Parse the job listings
    return parseJobListings(comments);
  } catch (error) {
    console.error('Error fetching job listings:', error);
    throw error;
  }
};