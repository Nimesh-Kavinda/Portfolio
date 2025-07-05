'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchGitHubProfile, fetchGitHubStats } from '../services/github';
import { assets } from '@/assets/assets';

const GitHubProfile = ({ isDarkMode }) => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        setLoading(true);
        const [profileData, statsData] = await Promise.all([
          fetchGitHubProfile(),
          fetchGitHubStats()
        ]);
        setProfile(profileData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 dark:text-gray-400">Failed to load GitHub profile</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        className="text-center mb-2 text-lg font-Ovo dark:text-white/80"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        GitHub Profile
      </motion.h4>
      
      <motion.h2
        className="text-center text-5xl font-Ovo dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        My Development Journey
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col lg:flex-row items-center gap-16 my-16"
      >
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/3 text-center"
        >
          <div className="relative">
            <Image
              src={profile.avatar_url}
              alt="GitHub Profile"
              width={300}
              height={300}
              className="w-64 h-64 rounded-full mx-auto object-cover border-4 border-gray-200 dark:border-gray-700"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-sm">✓</span>
            </motion.div>
          </div>
          
          <h3 className="text-2xl font-bold mt-4 dark:text-white">{profile.name}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">@{profile.login}</p>
          
          {profile.bio && (
            <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-md mx-auto">
              {profile.bio}
            </p>
          )}
          
          {profile.location && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              📍 {profile.location}
            </p>
          )}
          
          <motion.a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View GitHub Profile
            <Image
              src={isDarkMode ? assets.right_arrow_white : assets.right_arrow}
              alt="arrow"
              className="w-4"
            />
          </motion.a>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full lg:w-2/3"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {stats && [
              { label: 'Public Repos', value: stats.totalRepos, icon: '📚' },
              { label: 'Total Stars', value: stats.totalStars, icon: '⭐' },
              { label: 'Total Forks', value: stats.totalForks, icon: '🔗' },
              { label: 'Followers', value: stats.followers, icon: '👥' },
              { label: 'Following', value: stats.following, icon: '➡️' },
              { label: 'Years Active', value: new Date().getFullYear() - new Date(profile.created_at).getFullYear(), icon: '📅' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Top Languages */}
          {stats && stats.topLanguages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h4 className="text-xl font-bold mb-4 dark:text-white">Top Languages</h4>
              <div className="space-y-3">
                {stats.topLanguages.map((lang, index) => (
                  <div key={lang.language} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{lang.language}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(lang.count / stats.topLanguages[0].count) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 * index }}
                          className="bg-blue-500 h-2 rounded-full"
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                        {lang.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GitHubProfile;
