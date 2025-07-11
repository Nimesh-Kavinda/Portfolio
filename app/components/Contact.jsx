import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";

const Contact = ({ isDarkMode, setDarkMode }) => {
    // Contact information
    const contactInfo = {
        email: "nimeshkavindakarunasinghe@gmail.com",
        phone: "077 852 5115",
        phone_02: "074 171 8855",
        location: "Kegalle, Srilanka",
        linkedin: "https://www.linkedin.com/in/nimesh-kavinda-b363012b7",
        github: "https://github.com/Nimesh-Kavinda"
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        id="contact"
        className="w-full px-4 sm:px-8 md:px-12 py-8 sm:py-10 scroll-mt-20 bg-[url(''/footer-bg-color.png'')] 
         bg-no-repeat bg-center bg-[length:90%_auto] 
         dark:bg-none"
      >
        <motion.h4
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-2 text-base sm:text-lg font-Ovo"
        >
          Connect with me
        </motion.h4>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-Ovo"
        >
          Get in touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mt-4 sm:mt-5 mb-8 sm:mb-12 font-Ovo text-sm sm:text-base px-2"
        >
          Feel free to reach out to me directly through any of the contact
          methods below. I'm always open to new opportunities, collaborations,
          and interesting conversations!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white/90 dark:bg-darkHover/30 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg"
        >
          {/* Mobile view - Stacked layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {/* Email */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 dark:hidden"
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

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 hidden dark:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75M21.75 6.75L12 13.5 2.25 6.75"
                  />
                </svg>  
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-1">Email</h3>
                <a
                  href="mailto:${contactInfo.email}?subject=Inquiry&body=Hello"
                  className="text-xs sm:text-sm md:text-base break-all text-gray-800 dark:text-white-400 hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-1">Phone</h3>
                <div className="flex flex-col space-y-1">
                  <a
                    href="tel:${contactInfo.phone.replace(/\s/g, '')}"
                    className="hover:underline text-xs sm:text-sm md:text-base"
                  >
                    {contactInfo.phone}
                  </a>
                  <a
                    href="tel:${contactInfo.phone_02.replace(/\s/g, '')}"
                    className="hover:underline text-xs sm:text-sm md:text-base"
                  >
                    {contactInfo.phone_02}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-1">Location</h3>
                <p className="text-xs sm:text-sm md:text-base">{contactInfo.location}</p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-1">Connect</h3>
                <div className="flex gap-4">
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-200 hover:underline text-xs sm:text-sm md:text-base"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-200 hover:underline text-xs sm:text-sm md:text-base"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Email button */}
          

        </motion.div>
      </motion.div>
    );
}

export default Contact
