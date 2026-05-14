import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// NOTE: This file uses Tailwind. Two small additions are required for the
// design to look right — see the README block at the bottom of this file.

const LandingPage = () => {
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-neutral-900 dark:text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.25),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 dark:bg-black/40 border-b border-neutral-200/60 dark:border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center shadow-lg shadow-indigo-500/20">
              <div className="w-2 h-2 bg-white rounded-sm" />
            </div>
            <span className="font-display text-lg tracking-tight">Relay</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600 dark:text-neutral-400">
            <a
              href="#features"
              className="hover:text-neutral-900 dark:hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="hover:text-neutral-900 dark:hover:text-white transition"
            >
              Customers
            </a>
            <a
              href="#pricing"
              className="hover:text-neutral-900 dark:hover:text-white transition"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-2">
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
            <Link
              to="/Login"
              className="hidden sm:inline-flex text-sm px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition"
            >
              Log in
            </Link>
            <Link
              to="/Signup"
              className="text-sm px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition shadow-sm"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur text-xs text-neutral-600 dark:text-neutral-400 mb-8 animate-[fadeUp_0.6s_ease-out_both]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New: Automations & SLA tracking
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-[-0.04em] leading-[0.95] mb-6 animate-[fadeUp_0.7s_ease-out_0.1s_both]">
            Tickets that
            <br />
            <span className="italic font-light text-neutral-500 dark:text-neutral-400">
              actually
            </span>{" "}
            move forward.
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed animate-[fadeUp_0.7s_ease-out_0.2s_both]">
            Relay is the ticket system your team won't avoid. Built for speed,
            designed for clarity — no more queues that quietly die.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-[fadeUp_0.7s_ease-out_0.3s_both]">
            <Link
              to="/Signup"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium shadow-lg shadow-neutral-900/10 hover:scale-[1.02] transition-transform"
            >
              Start free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/Login"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition"
            >
              Log in
            </Link>
          </div>

          <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-500 animate-[fadeUp_0.7s_ease-out_0.4s_both]">
            Free for up to 3 teammates · No credit card required
          </p>
        </div>

        {/* Mock UI preview */}
        <div className="max-w-5xl mx-auto mt-20 animate-[fadeUp_0.9s_ease-out_0.5s_both]">
          <div className="relative rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#111113] shadow-2xl shadow-indigo-500/10 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02]">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/10" />
              <div className="ml-3 text-xs text-neutral-500">
                relay.app/inbox
              </div>
            </div>
            <div className="grid grid-cols-12 min-h-[400px]">
              <div className="col-span-3 border-r border-neutral-100 dark:border-white/5 p-4 space-y-1 text-sm hidden sm:block">
                {["Inbox", "My tickets", "Assigned", "Backlog", "Done"].map(
                  (l, i) => (
                    <div
                      key={l}
                      className={`px-3 py-1.5 rounded-md ${
                        i === 0
                          ? "bg-neutral-100 dark:bg-white/5 font-medium"
                          : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      {l}
                    </div>
                  ),
                )}
              </div>
              <div className="col-span-12 sm:col-span-9 divide-y divide-neutral-100 dark:divide-white/5">
                {[
                  {
                    id: "REL-128",
                    title: "Login button broken on Safari 17",
                    p: "P1",
                    c: "rose",
                  },
                  {
                    id: "REL-127",
                    title: "Add bulk-assign to inbox view",
                    p: "P2",
                    c: "amber",
                  },
                  {
                    id: "REL-126",
                    title: "Onboarding email typo (welcome flow)",
                    p: "P3",
                    c: "sky",
                  },
                  {
                    id: "REL-125",
                    title: "Export filtered tickets to CSV",
                    p: "P2",
                    c: "amber",
                  },
                  {
                    id: "REL-124",
                    title: "SAML SSO for Workspace admins",
                    p: "P1",
                    c: "rose",
                  },
                ].map((t, i) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition"
                    style={{
                      animation: `slideIn 0.5s ease-out ${0.7 + i * 0.08}s both`,
                    }}
                  >
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono w-16">
                      {t.id}
                    </span>
                    <span className="text-sm flex-1 truncate">{t.title}</span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        t.c === "rose"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : t.c === "amber"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                      }`}
                    >
                      {t.p}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              Features
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.03em] leading-tight">
              Everything you need.
              <br />
              <span className="text-neutral-500 dark:text-neutral-400">
                Nothing you don't.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-white/5 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white dark:bg-[#0a0a0b] p-8 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-white/5 grid place-items-center mb-5 group-hover:bg-indigo-500/10 transition">
                  <f.icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-indigo-500 transition" />
                </div>
                <h3 className="font-display text-lg mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              Loved by teams
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.03em]">
              Don't take our word for it.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.author}
                className="p-7 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-neutral-300 dark:hover:border-white/20 transition"
              >
                <blockquote className="text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-200 mb-6">
                  "{t.quote}"
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient}`}
                  />
                  <div>
                    <div className="text-sm font-medium">{t.author}</div>
                    <div className="text-xs text-neutral-500">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
              Pricing
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-[-0.03em]">
              Simple, honest pricing.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`p-8 rounded-2xl border transition ${
                  p.featured
                    ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/5 to-transparent dark:from-indigo-500/10 relative shadow-xl shadow-indigo-500/10"
                    : "border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full bg-indigo-500 text-white">
                    Most popular
                  </div>
                )}
                <div className="font-display text-xl mb-2">{p.name}</div>
                <div className="mb-1">
                  <span className="font-display text-4xl tracking-tight">
                    {p.price}
                  </span>
                  {p.price !== "Custom" && (
                    <span className="text-sm text-neutral-500 ml-1">
                      / user / mo
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                  {p.tag}
                </p>
                <Link
                  to="/Signup"
                  className={`block text-center py-2.5 rounded-lg font-medium text-sm mb-6 transition ${
                    p.featured
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "border border-neutral-300 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5"
                  }`}
                >
                  {p.cta}
                </Link>
                <ul className="space-y-2.5 text-sm">
                  {p.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400"
                    >
                      <Check className="w-4 h-4 mt-0.5 text-indigo-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl tracking-[-0.04em] leading-[1] mb-6">
            Stop losing tickets.
            <br />
            <span className="italic font-light text-neutral-500 dark:text-neutral-400">
              Start shipping fixes.
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Set up your workspace in under two minutes.
          </p>
          <Link
            to="/Signup"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:scale-[1.02] transition-transform shadow-lg"
          >
            Get started — it's free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-violet-600" />
            <span>© {new Date().getFullYear()} Relay</span>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

/* ---------- Data ---------- */

const features = [
  {
    title: "Lightning inbox",
    desc: "Triage tickets with keyboard shortcuts. Move ten times faster than a traditional helpdesk.",
    icon: BoltIcon,
  },
  {
    title: "Smart routing",
    desc: "Auto-assign by topic, customer tier, or load. Tickets land where they belong, instantly.",
    icon: RouteIcon,
  },
  {
    title: "SLA tracking",
    desc: "Visual countdowns and breach alerts. Never miss a response window again.",
    icon: ClockIcon,
  },
  {
    title: "Conversations, not threads",
    desc: "Comments, mentions, internal notes — all in one timeline your team actually reads.",
    icon: ChatIcon,
  },
  {
    title: "Automations",
    desc: "If-this-then-that without the headache. Build flows in a visual editor in seconds.",
    icon: SparkIcon,
  },
  {
    title: "Reports that matter",
    desc: "Resolution time, CSAT, backlog age. The metrics your manager actually asks about.",
    icon: ChartIcon,
  },
];

const testimonials = [
  {
    quote:
      "We cut our average response time in half within two weeks. The team actually enjoys using it, which is wild for a ticketing tool.",
    author: "Amara Okafor",
    role: "Head of Support, Lumen",
    gradient: "from-rose-400 to-orange-500",
  },
  {
    quote:
      "Finally — a ticket app that doesn't feel like punishment. Our engineers stopped avoiding the queue.",
    author: "Daniel Brouwer",
    role: "Engineering Lead, Northwind",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    quote:
      "The keyboard shortcuts alone are worth the switch. Triage feels like flow now, not a chore.",
    author: "Yuki Tanaka",
    role: "Ops Manager, Kindred",
    gradient: "from-indigo-400 to-violet-500",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    tag: "For small teams getting started.",
    cta: "Start free",
    features: [
      "Up to 3 teammates",
      "Unlimited tickets",
      "Basic automations",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Team",
    price: "$12",
    tag: "For growing teams that ship daily.",
    cta: "Start 14-day trial",
    features: [
      "Unlimited teammates",
      "Advanced automations",
      "SLA tracking",
      "Reports & analytics",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tag: "For organizations with custom needs.",
    cta: "Contact sales",
    features: [
      "Everything in Team",
      "SAML SSO",
      "Audit logs",
      "Custom contracts",
      "Dedicated CSM",
    ],
    featured: false,
  },
];

/* ---------- Icons (inline, no extra deps) ---------- */

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
function Check(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function BoltIcon(props) {
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
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function RouteIcon(props) {
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
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M6.7 17.3 17.3 6.7" />
    </svg>
  );
}
function ClockIcon(props) {
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
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function ChatIcon(props) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function SparkIcon(props) {
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
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}
function ChartIcon(props) {
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
      <path d="M3 3v18h18" />
      <path d="M7 15l4-6 4 3 5-8" />
    </svg>
  );
}

export default LandingPage;
