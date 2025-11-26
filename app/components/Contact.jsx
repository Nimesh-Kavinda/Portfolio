import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Contact = ({ isDarkMode, setDarkMode }) => {
  const contactInfo = {
    email: 'nimeshkavindakarunasinghe@gmail.com',
    phone: '077 852 5115',
    phone_02: '074 171 8855',
    location: 'Kegalle, Sri Lanka',
    linkedin: 'https://www.linkedin.com/in/nimesh-kavinda-b363012b7',
    github: 'https://github.com/Nimesh-Kavinda',
  };

  const contactItems = [
    {
      title: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}?subject=Inquiry&body=Hello`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75M21.75 6.75L12 13.5 2.25 6.75"
          />
        </svg>
      ),
    },
    {
      title: 'Phone',
      value: [contactInfo.phone, contactInfo.phone_02],
      href: [
        `tel:${contactInfo.phone.replace(/\s/g, '')}`,
        `tel:${contactInfo.phone_02.replace(/\s/g, '')}`,
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5v4l5 5-2 2 5 5 5-5-2-2 5-5V5H3z"
          />
        </svg>
      ),
    },
    {
      title: 'Location',
      value: contactInfo.location,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Connect',
      value: ['LinkedIn', 'GitHub'],
      href: [contactInfo.linkedin, contactInfo.github],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8a6 6 0 00-12 0v8a6 6 0 0012 0V8zM8 12h.01M12 16h.01"
          />
        </svg>
      ),
    },
  ];

  return (
    <motion.section
      id="contact"
      className="relative w-full px-4 sm:px-8 md:px-12 py-12 scroll-mt-20 bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.h4
          className="text-lg sm:text-xl font-Ovo text-gray-600 dark:text-gray-400 mb-2"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Connect with me
        </motion.h4>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-Ovo font-bold text-gray-900 dark:text-white"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Get in touch
        </motion.h2>
        <motion.p
          className="mt-4 sm:mt-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Feel free to reach out through any of the methods below. I'm open to
          new opportunities, collaborations, and meaningful conversations!
        </motion.p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {contactItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-white">
              {item.icon}
            </div>
            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              {Array.isArray(item.value) ? (
                <div className="flex flex-col space-y-1">
                  {item.value.map((val, idx) => (
                    <a
                      key={idx}
                      href={Array.isArray(item.href) ? item.href[idx] : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-200 text-sm sm:text-base"
                    >
                      {val}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href={item.href || '#'}
                  className="text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform duration-200 text-sm sm:text-base break-all"
                >
                  {item.value}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Send Email Button */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a
          href={`mailto:${contactInfo.email}?subject=Hello&body=Hi Nimesh`}
          className="inline-block px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Send Email
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
