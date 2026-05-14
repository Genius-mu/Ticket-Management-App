import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));

      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
      const userExists = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user.password === formData.password,
      );

      if (!userExists) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      const token = "sample_token_" + Date.now();
      localStorage.setItem("ticketapp_session", token);
      toast.success("Welcome back!");
      setFormData({ email: "", password: "" });
      navigate("/Dashboard");
    } catch (err) {
      toast.error("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0a0a0b] text-neutral-900 dark:text-neutral-100 font-sans antialiased relative overflow-hidden selection:bg-indigo-500/30">
      {/* Ambient background — matches landing + signup */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.25),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#18181b" : "#fff",
            color: theme === "dark" ? "#fafafa" : "#0a0a0b",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid #e5e5e5",
            fontSize: "14px",
          },
        }}
      />

      {/* Top bar */}
      <header className="px-6 h-16 flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center shadow-lg shadow-indigo-500/20">
            <div className="w-2 h-2 bg-white rounded-sm" />
          </div>
          <span className="font-display text-lg tracking-tight">Relay</span>
        </Link>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 grid place-items-center rounded-lg border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition"
        >
          {theme === "dark" ? (
            <SunIcon className="w-4 h-4" />
          ) : (
            <MoonIcon className="w-4 h-4" />
          )}
        </button>
      </header>

      {/* Form */}
      <main className="flex justify-center px-6 py-12">
        <div className="w-full max-w-md animate-[fadeUp_0.6s_ease-out_both]">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl tracking-[-0.03em] leading-tight mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Log in to pick up where you left off.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur p-7 shadow-xl shadow-neutral-900/[0.04] dark:shadow-black/40"
          >
            <div className="space-y-4">
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 rounded border-neutral-300 dark:border-white/20 accent-indigo-500"
                />
                Show password
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium shadow-lg shadow-neutral-900/10 hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Log in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-sm text-center mt-6 text-neutral-600 dark:text-neutral-400">
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="font-medium text-neutral-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ---------- Reusable Field ---------- */

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition"
      />
    </div>
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
function ArrowRight(props) {
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
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
