// src/context/AuthContext.jsx
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

export const AuthContext = createContext(null);

/**
 * AuthProvider — single source of truth for:
 *  - the logged-in user (full object: fullName, email)
 *  - the session token
 *  - the active theme (light/dark)
 *
 * Persists everything to localStorage so refreshes don't sign people out.
 * Listens to `storage` events so logging in/out in one tab updates the others.
 */
export const AuthProvider = ({ children }) => {
  // ---------- Auth state ----------
  const [session, setSession] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("ticketapp_session")
      : null,
  );

  const [currentUser, setCurrentUser] = useState(() => loadCurrentUser());

  // ---------- Theme state ----------
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return saved || (prefersDark ? "dark" : "light");
  });

  // Apply theme class to <html> whenever it changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  // Sync state if localStorage changes in another tab
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "ticketapp_session") setSession(e.newValue);
      if (e.key === "ticketapp_active_email" || e.key === "ticketapp_users") {
        setCurrentUser(loadCurrentUser());
      }
      if (e.key === "theme" && e.newValue) setThemeState(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ---------- Actions ----------

  /** Call this from Login.jsx after a successful credential match */
  const login = useCallback((token, user) => {
    localStorage.setItem("ticketapp_session", token);
    if (user?.email) {
      localStorage.setItem("ticketapp_active_email", user.email);
    }
    setSession(token);
    setCurrentUser(user || loadCurrentUser());
  }, []);

  /** Call this from Signup.jsx after creating a new user */
  const signup = useCallback(
    (token, user) => {
      // signup is identical to login for our purposes
      login(token, user);
    },
    [login],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("ticketapp_active_email");
    setSession(null);
    setCurrentUser(null);
  }, []);

  const isAuthenticated = !!session;

  return (
    <AuthContext.Provider
      value={{
        // auth
        session,
        currentUser,
        isAuthenticated,
        login,
        signup,
        logout,
        // theme
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/** Hook for consuming the context. Throws if used outside the provider. */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
};

/* ---------- Helpers ---------- */

function loadCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const activeEmail = localStorage.getItem("ticketapp_active_email");
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    if (!activeEmail) {
      // Fallback for legacy sessions created before active_email tracking
      return users[users.length - 1] || null;
    }
    return (
      users.find((u) => u.email?.toLowerCase() === activeEmail.toLowerCase()) ||
      null
    );
  } catch {
    return null;
  }
}
