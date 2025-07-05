// Configuration file for GitHub integration
export const GITHUB_CONFIG = {
  // GitHub username - update this to change the GitHub account being displayed
  username: 'Nimesh-Kavinda',
  
  // API endpoints
  baseUrl: 'https://api.github.com',
  
  // Display settings
  settings: {
    // Number of repositories to load initially
    initialRepoCount: 6,
    
    // Number of repositories to load per "Load More" click
    loadMoreCount: 6,
    
    // Maximum number of repositories to fetch for statistics
    maxReposForStats: 100,
    
    // Whether to include forked repositories
    includeForks: false,
    
    // Sort repositories by (options: 'updated', 'created', 'pushed', 'full_name')
    sortBy: 'updated',
    
    // Sort direction (options: 'desc', 'asc')
    sortDirection: 'desc',
    
    // Maximum number of topics to display per repository
    maxTopicsPerRepo: 3,
    
    // Number of top languages to display in profile
    topLanguagesCount: 5
  },
  
  // Fallback data in case GitHub API is unavailable
  fallback: {
    name: 'Nimesh Kavinda',
    bio: 'Full Stack Developer passionate about creating modern web applications',
    location: 'Sri Lanka',
    avatar_url: '/assets/user-image.jpg'
  }
};

export default GITHUB_CONFIG;
