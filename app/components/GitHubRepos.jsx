'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchAllGitHubRepositories } from '../services/github';
import { assets } from '@/assets/assets';
import GITHUB_CONFIG from '../config/github';
import getRepoImage from '../utils/repoImages';

const GitHubRepos = ({ isDarkMode }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setLoading(true);
        // Fetch all repositories at once
        const reposData = await fetchAllGitHubRepositories();
        // Filter out forks and private repos based on config, sort by stars and recent activity
        const filteredRepos = reposData
          .filter(repo => !repo.private && (GITHUB_CONFIG.settings.includeForks || !repo.fork))
          .sort((a, b) => {
            // Prioritize repos with more stars and recent updates
            const scoreA = a.stargazers_count * 3 + (new Date(a.updated_at).getTime() / 1000000000);
            const scoreB = b.stargazers_count * 3 + (new Date(b.updated_at).getTime() / 1000000000);
            return scoreB - scoreA;
          });
        setRepos(filteredRepos);
      } catch (error) {
        console.error('Error loading repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
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
      Kotlin: '#0095d5'
    };
    return colors[language] || '#6c757d';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="github-repos"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
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
        Explore all my GitHub repositories showcasing various projects, experiments, and contributions. 
        Each repository represents my journey in learning and building with different technologies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10"
      >
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            {/* Repository Image */}
            <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
              <Image
                src={getRepoImage(repo)}
                alt={repo.name}
                width={400}
                height={200}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/assets/project-icon.png';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
              {repo.stargazers_count > 0 && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                  <span>⭐</span>
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
            </div>

            {/* Repository Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h3 className="text-xl font-semibold dark:text-white truncate">
                  {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                </h3>
              </div>

              <div className="flex items-center justify-between mb-4">
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    ></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {repo.language}
                    </span>
                  </div>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDate(repo.updated_at)}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="text-blue-500">🔗</span> {repo.forks_count}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">👁️</span> {repo.watchers_count}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Code
                    <Image
                      src={isDarkMode ? assets.right_arrow_white : assets.right_arrow}
                      alt="arrow"
                      className="w-3"
                    />
                  </motion.a>
                  
                  {repo.homepage && (
                    <motion.a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live
                    </motion.a>
                  )}
                </div>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {repo.topics.slice(0, GITHUB_CONFIG.settings.maxTopicsPerRepo).map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > GITHUB_CONFIG.settings.maxTopicsPerRepo && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                      +{repo.topics.length - GITHUB_CONFIG.settings.maxTopicsPerRepo}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="text-center mt-8"
      >
        <motion.a
          href={`https://github.com/${GITHUB_CONFIG.username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All on GitHub
          <Image
            src={isDarkMode ? assets.right_arrow_white : assets.right_arrow}
            alt="arrow"
            className="w-4"
          />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default GitHubRepos;
