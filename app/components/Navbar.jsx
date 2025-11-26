import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const Navbar = ({ isDarkMode, setDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const sideMenuRef = useRef();

  useEffect(() => {
    const onScroll = () => setIsScroll(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    sideMenuRef.current.style.transform = menuOpen
      ? 'translateX(0)'
      : 'translateX(100%)';
  }, [menuOpen]);

  const links = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#service' },
    { label: 'Work', href: '#work' },
    { label: 'GitHub', href: '#github-repos' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Background image (light mode only) */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 -translate-y-[80%] dark:hidden">
        <Image
          src={assets.header_bg_color}
          alt="Background"
          className="w-full"
        />
      </div>

      {/* Navbar */}
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300
        ${
          isScroll
            ? 'bg-white/60 dark:bg-darkTheme/80 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#top"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="Logo"
            className="w-28 cursor-pointer"
          />
        </motion.a>

        {/* Desktop Links */}
        <ul
          className={`hidden md:flex items-center gap-7 lg:gap-10 rounded-full px-10 py-3
            ${
              isScroll
                ? 'bg-white/30 dark:bg-transparent dark:border dark:border-white/20 backdrop-blur-xl'
                : 'bg-white/40 dark:bg-transparent dark:border dark:border-white/20 backdrop-blur-xl'
            }
          `}
        >
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-Ovo text-lg hover:text-primary transition"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button onClick={() => setDarkMode((p) => !p)}>
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt="Theme"
              className="w-6"
            />
          </button>

          {/* Desktop Contact Button */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-8 py-2.5 border border-gray-400 dark:border-white/40 rounded-full font-Ovo group transition"
          >
            Contact
            <Image
              src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
              alt="Arrow"
              className="w-3 group-hover:translate-x-1 transition"
            />
          </a>

          {/* Mobile Menu Button */}
          <button className="block md:hidden" onClick={() => setMenuOpen(true)}>
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt="menu"
              className="w-6"
            />
          </button>
        </div>

        {/* Mobile Drawer */}
        <ul
          ref={sideMenuRef}
          className="fixed top-0 right-0 w-64 h-screen z-[100] bg-rose-50 dark:bg-darkHover text-black dark:text-white
          shadow-xl flex flex-col gap-6 px-10 py-20 transition-transform duration-300"
        >
          {/* Close */}
          <button
            className="absolute right-6 top-6"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt="close"
              className="w-5"
            />
          </button>

          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-Ovo text-lg block hover:text-primary transition"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
