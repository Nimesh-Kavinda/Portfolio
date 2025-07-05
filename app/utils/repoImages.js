// Default repository images for different languages/types
const getRepoImage = (repo) => {
  // Check for specific project matches first
  const repoName = repo.name.toLowerCase();
  const topics = repo.topics || [];
  
  // Specific project mappings based on common names
  const projectMappings = {
    'portfolio': '/front.png',
    'fashora': '/fashora.png',
    'flixio': '/flixio.png',
    'grocery': '/grocery.png',
    'ecommerce': '/fashora.png',
    'shopping': '/grocery.png',
    'movie': '/flixio.png',
    'film': '/flixio.png',
    'frontend': '/frontend.jpg',
    'application': '/application.jpg'
  };

  // Check if repo name matches any specific projects
  for (const [key, image] of Object.entries(projectMappings)) {
    if (repoName.includes(key)) {
      return image;
    }
  }
  
  // Language-specific images using available assets
  const languageImages = {
    JavaScript: '/assets/react.svg',
    TypeScript: '/assets/react.svg',
    React: '/assets/react.svg',
    'Next.js': '/assets/react.svg',
    Python: '/assets/code-icon.png',
    Java: '/assets/java.png',
    PHP: '/assets/code-icon.png',
    HTML: '/assets/web-icon.png',
    CSS: '/assets/web-icon.png',
    Vue: '/assets/react.svg',
    Angular: '/assets/react.svg',
    'C++': '/assets/code-icon.png',
    C: '/assets/code-icon.png',
    Go: '/assets/code-icon.png',
    Rust: '/assets/code-icon.png',
    Swift: '/assets/mobile-icon.png',
    Kotlin: '/assets/mobile-icon.png',
    Dart: '/assets/mobile-icon.png',
    Flutter: '/assets/mobile-icon.png'
  };

  // Check for project type based on topics and repo name
  if (topics.includes('mobile') || topics.includes('android') || topics.includes('ios') || 
      repoName.includes('mobile') || repoName.includes('app')) {
    return '/assets/mobile-icon.png';
  }
  
  if (topics.includes('web') || topics.includes('frontend') || topics.includes('website') ||
      repoName.includes('web') || repoName.includes('site') || repoName.includes('portfolio')) {
    return '/frontend.jpg';
  }

  if (topics.includes('ecommerce') || topics.includes('shopping') || topics.includes('store') ||
      repoName.includes('shop') || repoName.includes('cart') || repoName.includes('ecommerce')) {
    return '/fashora.png';
  }

  if (topics.includes('api') || topics.includes('backend') || topics.includes('server') ||
      repoName.includes('api') || repoName.includes('server') || repoName.includes('backend')) {
    return '/assets/code-icon.png';
  }

  if (topics.includes('database') || repoName.includes('db') || repoName.includes('database')) {
    return '/assets/SQL.png';
  }

  if (topics.includes('firebase') || repoName.includes('firebase')) {
    return '/assets/firebase.png';
  }

  if (topics.includes('mongodb') || repoName.includes('mongo')) {
    return '/assets/mongodb.png';
  }

  if (topics.includes('git') || repoName.includes('git')) {
    return '/assets/git.png';
  }

  if (topics.includes('vscode') || repoName.includes('vscode') || repoName.includes('extension')) {
    return '/assets/vscode.png';
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
  return '/assets/project-icon.png';
};

// Helper function to check if a repository should use a placeholder design
export const shouldUsePlaceholder = (repo) => {
  const repoName = repo.name.toLowerCase();
  const topics = repo.topics || [];
  
  // If it's a specific project we have images for, don't use placeholder
  const specificProjects = ['portfolio', 'fashora', 'flixio', 'grocery', 'frontend', 'application'];
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
  if (topics.length > 0 && (
    topics.includes('web') || topics.includes('mobile') || 
    topics.includes('frontend') || topics.includes('backend')
  )) {
    return false;
  }
  
  // Use placeholder for generic repositories
  return true;
};

export default getRepoImage;
