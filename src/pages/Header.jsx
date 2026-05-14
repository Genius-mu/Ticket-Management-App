import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Pull the current user from localStorage (matches your auth setup)
  const session =
    typeof window !== "undefined"
      ? localStorage.getItem("ticketapp_session")
      : null;
  const users =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("ticketapp_users") || "[]")
      : [];
  // For now we just grab the most recent user — when you wire AuthContext
  // properly you can pull `currentUser` from useAuth() instead.
  const currentUser = users[users.length - 1] || {
    fullName: "Guest",
    email: "",
  };
  const initials = currentUser.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/Login");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm px-3 py-1.5 rounded-md transition ${
      isActive
        ? "bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white font-medium"
        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-white/5"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/40 border-b border-neutral-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Logo + nav */}
        <div className="flex items-center gap-6">
          <Link to="/Dashboard" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center shadow-md shadow-indigo-500/20">
              <div className="w-2 h-2 bg-white rounded-sm" />
            </div>
            <span className="font-display text-lg tracking-tight hidden sm:block">
              Relay
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/Dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/Tickets" className={navLinkClass}>
              Tickets
            </NavLink>
          </nav>
        </div>

        {/* Center: Search (desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-9 pr-12 py-1.5 text-sm rounded-lg bg-neutral-100 dark:bg-white/[0.04] border border-transparent hover:bg-neutral-200/60 dark:hover:bg-white/[0.07] focus:bg-white dark:focus:bg-white/[0.04] focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 bg-white dark:bg-white/5 hidden xl:block">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Theme + user */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </button>

          <button
            aria-label="Notifications"
            className="w-9 h-9 grid place-items-center rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition relative"
          >
            <BellIcon className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
          </button>

          {/* User dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 grid place-items-center text-white text-xs font-medium">
                {initials || "?"}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#141416] shadow-xl shadow-black/10 dark:shadow-black/40 p-1.5 animate-[fadeIn_0.15s_ease-out]">
                <div className="px-3 py-2 border-b border-neutral-100 dark:border-white/5 mb-1">
                  <div className="text-sm font-medium truncate">
                    {currentUser.fullName}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {currentUser.email}
                  </div>
                </div>
                <MenuItem
                  icon={UserIcon}
                  label="Account settings"
                  onClick={() => setMenuOpen(false)}
                />
                <MenuItem
                  icon={CogIcon}
                  label="Preferences"
                  onClick={() => setMenuOpen(false)}
                />
                <MenuItem
                  icon={HelpIcon}
                  label="Help & support"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="h-px bg-neutral-100 dark:bg-white/5 my-1" />
                <MenuItem
                  icon={LogoutIcon}
                  label="Log out"
                  onClick={handleLogout}
                  danger
                />
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
            className="md:hidden w-9 h-9 grid place-items-center rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5 transition"
          >
            {mobileOpen ? (
              <CloseIcon className="w-4 h-4" />
            ) : (
              <MenuIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200/60 dark:border-white/5 px-4 py-3 space-y-1 bg-white/95 dark:bg-black/60 backdrop-blur-xl">
          <NavLink
            to="/Dashboard"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm ${
                isActive
                  ? "bg-neutral-100 dark:bg-white/10 font-medium"
                  : "text-neutral-600 dark:text-neutral-400"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/Tickets"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm ${
                isActive
                  ? "bg-neutral-100 dark:bg-white/10 font-medium"
                  : "text-neutral-600 dark:text-neutral-400"
              }`
            }
          >
            Tickets
          </NavLink>
          <div className="relative pt-2">
            <SearchIcon className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

/* ---------- Subcomponents ---------- */

function MenuItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-left transition ${
        danger
          ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
          : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

/* ---------- Icons ---------- */

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SearchIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function BellIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}
function ChevronDown(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function MenuIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function UserIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function CogIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function HelpIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
function LogoutIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export default Header;
