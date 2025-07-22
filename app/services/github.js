import GITHUB_CONFIG from '../config/github';

// GitHub API service to fetch user data and repositories
const { username, baseUrl, settings } = GITHUB_CONFIG;

/**
 * Fetch GitHub user profile data
 */
export const fetchGitHubProfile = async () => {
  try {
    const response = await fetch(`${baseUrl}/users/${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error.message);
    // Return fallback data instead of logging and continuing with null
    return GITHUB_CONFIG.fallback;
  }
};

/**
 * Fetch GitHub repositories
 * @param {number} page - Page number for pagination
 * @param {number} perPage - Number of repositories per page (max 100)
 */
export const fetchGitHubRepositories = async (page = 1, perPage = 100) => {
  try {
    const response = await fetch(
      `${baseUrl}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=${settings.sortBy}&direction=${settings.sortDirection}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error.message);
    return [];
  }
};

/**
 * Fetch all GitHub repositories (handles pagination automatically)
 */
export const fetchAllGitHubRepositories = async () => {
  try {
    let allRepos = [];
    let page = 1;
    let hasMore = true;
    const maxPages = 10; // Safety limit to prevent infinite loops

    while (hasMore && page <= maxPages) {
      const repos = await fetchGitHubRepositories(page, 100);
      if (!Array.isArray(repos) || repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = [...allRepos, ...repos];
        // If we got less than 100 repos, we've reached the end
        if (repos.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    console.log(`Loaded ${allRepos.length} repositories across ${page - 1} pages`);
    return allRepos;
  } catch (error) {
    console.error('Error fetching all GitHub repositories:', error.message);
    return [];
  }
};

/**
 * Fetch GitHub user statistics
 */
export const fetchGitHubStats = async () => {
  try {
    const profile = await fetchGitHubProfile();
    const repos = await fetchGitHubRepositories(1, settings.maxReposForStats);
    
    if (!profile || !repos) return null;

    // Calculate statistics
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    const languages = repos
      .filter(repo => repo.language)
      .reduce((acc, repo) => {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
        return acc;
      }, {});

    const topLanguages = Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, settings.topLanguagesCount)
      .map(([language, count]) => ({ language, count }));

    return {
      totalRepos: profile.public_repos,
      totalStars,
      totalForks,
      followers: profile.followers,
      following: profile.following,
      topLanguages
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
};
