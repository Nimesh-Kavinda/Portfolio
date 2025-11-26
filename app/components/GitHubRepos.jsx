'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchAllGitHubRepositories } from '../services/github';
import { assets } from '@/assets/assets';
import GITHUB_CONFIG from '../config/github';
import getRepoImage from '../utils/repoImages';

const GitHubRepos = ({ isDarkMode }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const [visibleCount, setVisibleCount] = useState(8); // Initial 8 repos

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setLoading(true);

        const reposData = await fetchAllGitHubRepositories();
        if (!Array.isArray(reposData)) {
          console.warn('Invalid repository data received:', reposData);
          setRepos([]);
          return;
        }

        const filteredRepos = reposData
          .filter(
            (repo) =>
              repo &&
              !repo.private &&
              (GITHUB_CONFIG.settings.includeForks || !repo.fork)
          )
          .sort((a, b) => {
            const scoreA =
              (a.stargazers_count || 0) * 3 +
              new Date(a.updated_at || 0).getTime() / 1000000000;
            const scoreB =
              (b.stargazers_count || 0) * 3 +
              new Date(b.updated_at || 0).getTime() / 1000000000;
            return scoreB - scoreA;
          });

        setRepos(filteredRepos);
        setImageErrors({});
      } catch (error) {
        console.error('Error loading repositories:', error);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  const handleImageError = useCallback((repoId) => {
    setImageErrors((prev) => {
      if (!prev[repoId]) {
        return { ...prev, [repoId]: true };
      }
      return prev;
    });
  }, []);

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1c40f',
      TypeScript: '#3498db',
      Python: '#2ecc71',
      Java: '#e74c3c',
      HTML: '#e67e22',
      CSS: '#9b59b6',
      React: '#61dafb',
      'C++': '#00599c',
      C: '#555555',
      PHP: '#8892bf',
      Go: '#00add8',
      Rust: '#dea584',
      Swift: '#fa7343',
      Kotlin: '#0095d5',
    };
    return colors[language] || '#6c757d';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Date unavailable';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  // Slice only the visible repos for initial view
  const visibleRepos = repos.slice(0, visibleCount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="github-repos"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      {/* Section Heading */}
      <motion.h4
        className="text-center mb-2 text-lg font-Ovo dark:text-white/80"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        GitHub Repositories
      </motion.h4>

      <motion.h2
        className="text-center text-5xl font-Ovo dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        My Open Source Projects
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo dark:text-gray-300"
      >
        Explore all my GitHub repositories showcasing various projects,
        experiments, and contributions.
      </motion.p>

      {/* === GRID (Updated to 4 per row on xl screens) === */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          xl:grid-cols-4 
          gap-5 
          my-10
        "
      >
        {visibleRepos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 6) }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 p-4"
          >
            {/* Repo Image */}
            <div className="relative h-36 w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden rounded-md">
              <Image
                key={`repo-img-${repo.id}`}
                src={
                  imageErrors[repo.id] ? assets.code_icon : getRepoImage(repo)
                }
                alt={repo.name}
                width={400}
                height={170}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                unoptimized
                onError={() => handleImageError(repo.id)}
              />
            </div>

            {/* Repo Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold dark:text-white truncate">
                {repo.name.replace(/[-_]/g, ' ')}
              </h3>

              {/* Lang + Date */}
              <div className="flex items-center justify-between mt-3">
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: getLanguageColor(repo.language),
                      }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {repo.language}
                    </span>
                  </div>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDate(repo.updated_at)}
                </span>
              </div>

              {/* Stats + Buttons */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      🔗 {repo.forks_count}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    👁️ {repo.watchers_count}
                  </span>
                </div>

                <div className="flex gap-2">
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs font-medium shadow-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    Code →
                  </motion.a>

                  {repo.homepage && (
                    <motion.a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-xs text-gray-700 dark:text-gray-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Live
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Topics */}
              {repo.topics?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {repo.topics
                    .slice(0, GITHUB_CONFIG.settings.maxTopicsPerRepo)
                    .map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* === VIEW MORE BUTTON === */}
      {visibleCount < repos.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-md hover:shadow-lg transition-all duration-300"
          >
            View More
          </button>
        </div>
      )}

      {/* === VIEW ALL BUTTON (UNCHANGED) === */}
      <div className="text-center mt-6">
        <motion.a
          href={`https://github.com/${GITHUB_CONFIG.username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          View All on GitHub →
        </motion.a>
      </div>
    </motion.div>
  );
};

export default GitHubRepos;
