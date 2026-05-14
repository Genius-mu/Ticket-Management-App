import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-white/5 bg-white dark:bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: brand + copyright */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0" />
          <span>
            © {new Date().getFullYear()} Relay
            <span className="hidden sm:inline"> · All rights reserved</span>
          </span>
        </div>

        {/* Right: minimal links */}
        <nav className="flex items-center gap-5 text-xs text-neutral-500 dark:text-neutral-400">
          <Link
            to="/"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            Home
          </Link>
          <a
            href="#"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            Terms
          </a>
          <a
            href="mailto:support@relay.app"
            className="hover:text-neutral-900 dark:hover:text-white transition"
          >
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
