'use client';
import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { fetchGitHubProfile } from '../services/github';

const About = ({ isDarkMode, setDarkMode }) => {
    const [githubProfile, setGithubProfile] = useState(null);

    useEffect(() => {
        const loadGitHubProfile = async () => {
            const profile = await fetchGitHubProfile();
            setGithubProfile(profile);
        };
        loadGitHubProfile();
    }, []);

    return (
      <motion.div
        id="about"
        className="w-full px-[12%] py-10 scroll-mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h4
          className="text-center mb-2  text-lg font-Ovo"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Introduction
        </motion.h4>
        <motion.h2
          className="text-center text-5xl  font-Ovo"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          About me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex w-full flex-col lg:flex-row items-center gap-18 my-18"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full sm:w-80 rounded-3xl max-w-none"
          >
           <Image
  src={assets.user_image}
  alt="user"
  className="w-64 h-auto rounded-3xl"
/>

          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex-1"
          >
            <p className="mb-10 max-w-2xl font-Ovo">
              I am a experienced Full Stack Developer with over a decade of
              professional expertise. Throughout my career, I've had the
              privilege of collaborating with prestigious organizations,
              contributing to their success and growth.
            </p>

            <p className="mb-10 max-w-2xl font-Ovo">
              My passion lies in crafting modern, user-centric web applications
              using cutting-edge technologies. With proficiency in PHP,
              Laravel, React, and JavaScript, I specialize in creating
              responsive interfaces, seamless backend integration, and dynamic
              web experiences. I'm always exploring new technologies—from
              real-time databases to API integrations—to stay ahead in the
              ever-evolving web landscape. Open to global opportunities, I
              strive to deliver innovative and impactful digital solutions.
            </p>

            {/* GitHub Bio Integration */}
            {githubProfile && githubProfile.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500"
              >
                <p className="font-Ovo text-gray-700 dark:text-gray-300 italic">
                  "{githubProfile.bio}"
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={githubProfile.avatar_url}
                    alt="GitHub Avatar"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    - From my GitHub profile
                  </span>
                </div>
              </motion.div>
            )}

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
            >
              {infoList.map(({ icon, iconDark, title, description }, index) => (
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer
                             hover:bg-lightHover hover:-translate-y-1 duration-500
                              hover:shadow-black dark:border-white  dark:hover:shadow-white dark:hover:bg-darkHover/50"
                  key={index}
                >
                  <Image
                    src={isDarkMode ? iconDark : icon}
                    alt={title}
                    className="w-7 mt-3"
                  />
                  <div className="mt-2 text-center">
                    <h3 className="my-4 font-semibold text-gray-700 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm dark:text-white/80">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.3, delay: 0.5 }}
              className="my-6 text-gray-700 font-Ovo dark:text-white/80"
            >
              Tools I use
            </motion.h4>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex items-center gap-3 sm:gap-5"
            >
              {toolsData.map((tool, index) => (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-12 sm:w-14 
                            aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500"
                  key={index}
                >
                  <Image src={tool} alt="tool" className="w-5 sm:w-7" />
                </motion.li>
              ))}
            </motion.ul>

            {/* GitHub Stats Quick View */}
            {githubProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {githubProfile.public_repos}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Public Repos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {githubProfile.followers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {githubProfile.following}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {new Date().getFullYear() - new Date(githubProfile.created_at).getFullYear()}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years on GitHub</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    );
}

export default About;
