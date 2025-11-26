// Default repository images for different languages/types
// Import assets to ensure proper paths
import { assets } from '@/assets/assets';

const getRepoImage = (repo) => {
  // Validate repo input
  if (!repo || typeof repo !== 'object') {
    console.warn('Invalid repo object passed to getRepoImage:', repo);
    return assets.code_icon;
  }

  // Check for specific project matches first
  const repoName = repo.name ? repo.name.toLowerCase() : '';
  const topics = repo.topics || [];

  // Specific project mappings based on common names
  const projectMappings = {
    portfolio: '/front.png',
    fashora: '/fashora.png',
    flixio: '/flixio.png',
    grocery: '/grocery.png',
    ecommerce: '/fashora.png',
    shopping: '/grocery.png',
    movie: '/flixio.png',
    film: '/flixio.png',
    frontend: '/frontend.jpg',
    application: '/application.jpg',
  };

  // Check if repo name matches any specific projects
  for (const [key, image] of Object.entries(projectMappings)) {
    if (repoName.includes(key)) {
      return image;
    }
  }

  // Language-specific images using available assets
  const languageImages = {
    JavaScript: assets.code_icon,
    TypeScript: assets.code_icon,
    React: assets.code_icon,
    'Next.js': assets.code_icon,
    Python: assets.code_icon,
    Java: assets.java,
    PHP: assets.code_icon,
    HTML: assets.web_icon,
    CSS: assets.web_icon,
    Vue: assets.code_icon,
    Angular: assets.code_icon,
    'C++': assets.code_icon,
    C: assets.code_icon,
    Go: assets.code_icon,
    Rust: assets.code_icon,
    Swift: assets.mobile_icon,
    Kotlin: assets.mobile_icon,
    Dart: assets.mobile_icon,
    Flutter: assets.mobile_icon,
  };

  // Check for project type based on topics and repo name
  if (
    topics.includes('mobile') ||
    topics.includes('android') ||
    topics.includes('ios') ||
    repoName.includes('mobile') ||
    repoName.includes('app')
  ) {
    return assets.mobile_icon;
  }

  if (
    topics.includes('web') ||
    topics.includes('frontend') ||
    topics.includes('website') ||
    repoName.includes('web') ||
    repoName.includes('site') ||
    repoName.includes('portfolio')
  ) {
    return '/frontend.jpg';
  }

  if (
    topics.includes('ecommerce') ||
    topics.includes('shopping') ||
    topics.includes('store') ||
    repoName.includes('shop') ||
    repoName.includes('cart') ||
    repoName.includes('ecommerce')
  ) {
    return '/fashora.png';
  }

  if (
    topics.includes('api') ||
    topics.includes('backend') ||
    topics.includes('server') ||
    repoName.includes('api') ||
    repoName.includes('server') ||
    repoName.includes('backend')
  ) {
    return assets.code_icon;
  }

  if (
    topics.includes('database') ||
    repoName.includes('db') ||
    repoName.includes('database')
  ) {
    return assets.SQL;
  }

  if (topics.includes('firebase') || repoName.includes('firebase')) {
    return assets.firebase;
  }

  if (topics.includes('mongodb') || repoName.includes('mongo')) {
    return assets.mongodb;
  }

  if (topics.includes('git') || repoName.includes('git')) {
    return assets.git;
  }

  if (
    topics.includes('vscode') ||
    repoName.includes('vscode') ||
    repoName.includes('extension')
  ) {
    return assets.vscode;
  }

  // If repo has a homepage/live demo, use web icon
  if (repo.homepage) {
    return '/frontend.jpg';
  }

  // Check if language exists, return language-specific image
  if (repo.language && languageImages[repo.language]) {
    return languageImages[repo.language];
  }

  // Default fallback image for repositories without specific matches
  return assets.code_icon;
};

// Helper function to check if a repository should use a placeholder design
export const shouldUsePlaceholder = (repo) => {
  const repoName = repo.name.toLowerCase();
  const topics = repo.topics || [];

  // If it's a specific project we have images for, don't use placeholder
  const specificProjects = [
    'portfolio',
    'fashora',
    'flixio',
    'grocery',
    'frontend',
    'application',
  ];
  for (const project of specificProjects) {
    if (repoName.includes(project)) {
      return false;
    }
  }

  // If it has a homepage, don't use placeholder
  if (repo.homepage) {
    return false;
  }

  // If it's a web/mobile project with topics, don't use placeholder
  if (
    topics.length > 0 &&
    (topics.includes('web') ||
      topics.includes('mobile') ||
      topics.includes('frontend') ||
      topics.includes('backend'))
  ) {
    return false;
  }

  // Use placeholder for generic repositories
  return true;
};

export default getRepoImage;
