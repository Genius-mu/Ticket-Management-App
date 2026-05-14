// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Header from "./Header";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      toast.error("Please log in first!");
      navigate("/Login");
      return;
    }

    const storedTickets =
      JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];

    if (storedTickets.length === 0) {
      const sample = [
        {
          id: 1,
          title: "Login page not loading",
          description: "User reports blank screen after entering credentials",
          status: "Open",
        },
        {
          id: 2,
          title: "Add ticket filtering",
          description: "Feature request for ticket filters by priority",
          status: "In Progress",
        },
        {
          id: 3,
          title: "Fix email notification bug",
          description: "Emails not sending to clients after ticket creation",
          status: "Closed",
        },
        {
          id: 4,
          title: "Update dashboard UI",
          description: "Make dashboard more mobile responsive and cleaner",
          status: "Open",
        },
      ];
      localStorage.setItem("ticketapp_tickets", JSON.stringify(sample));
      setTickets(sample);
    } else {
      setTickets(storedTickets);
    }

    // Small artificial delay so skeletons get to flash — feels more "real app"
    setTimeout(() => setLoading(false), 300);
  }, [navigate]);

  const total = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const progressCount = tickets.filter(
    (t) => t.status === "In Progress",
  ).length;
  const closedCount = tickets.filter((t) => t.status === "Closed").length;

  // Most recent 5 tickets (descending by id, which is Date.now() in your code)
  const recent = [...tickets].sort((a, b) => b.id - a.id).slice(0, 5);

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const stats = [
    {
      label: "Total tickets",
      value: total,
      icon: TicketIcon,
      accent: "text-neutral-900 dark:text-white",
      bg: "bg-neutral-100 dark:bg-white/5",
    },
    {
      label: "Open",
      value: openCount,
      icon: CircleIcon,
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "In Progress",
      value: progressCount,
      icon: ClockIcon,
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Closed",
      value: closedCount,
      icon: CheckCircleIcon,
      accent: "text-neutral-500 dark:text-neutral-400",
      bg: "bg-neutral-200 dark:bg-white/10",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-neutral-900 dark:text-neutral-100 font-sans antialiased">
      <Header />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: document.documentElement.classList.contains("dark")
              ? "#18181b"
              : "#fff",
            color: document.documentElement.classList.contains("dark")
              ? "#fafafa"
              : "#0a0a0b",
            border: document.documentElement.classList.contains("dark")
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid #e5e5e5",
            fontSize: "14px",
          },
        }}
      />

      <main className="pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto animate-[fadeUp_0.5s_ease-out_both]">
        {/* Greeting */}
        <div className="mb-8">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
            {greeting},
          </p>
          <h1 className="font-display text-3xl sm:text-4xl tracking-[-0.02em]">
            Here's what's happening today.
          </h1>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
            : stats.map((s) => (
                <div
                  key={s.label}
                  className="group rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 hover:border-neutral-300 dark:hover:border-white/20 transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {s.label}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-md ${s.bg} grid place-items-center`}
                    >
                      <s.icon className={`w-3.5 h-3.5 ${s.accent}`} />
                    </div>
                  </div>
                  <div
                    className={`font-display text-4xl tracking-tight ${s.accent}`}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
        </div>

        {/* Two-column section: breakdown + recent */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Breakdown */}
          <div className="lg:col-span-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg tracking-tight">
                Status breakdown
              </h2>
              <span className="text-xs text-neutral-500">{total} total</span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <BarSkeleton key={i} />
                ))}
              </div>
            ) : total === 0 ? (
              <EmptyMini message="No tickets to chart yet" />
            ) : (
              <div className="space-y-4">
                <StatusBar
                  label="Open"
                  value={openCount}
                  total={total}
                  color="bg-emerald-500"
                />
                <StatusBar
                  label="In Progress"
                  value={progressCount}
                  total={total}
                  color="bg-amber-500"
                />
                <StatusBar
                  label="Closed"
                  value={closedCount}
                  total={total}
                  color="bg-neutral-400 dark:bg-neutral-600"
                />
              </div>
            )}
          </div>

          {/* Recent activity */}
          <div className="lg:col-span-3 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-neutral-100 dark:border-white/5">
              <h2 className="font-display text-lg tracking-tight">
                Recent tickets
              </h2>
              <Link
                to="/Tickets"
                className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {loading ? (
              <div className="divide-y divide-neutral-100 dark:divide-white/5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <RowSkeleton key={i} />
                ))}
              </div>
            ) : recent.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="divide-y divide-neutral-100 dark:divide-white/5">
                {recent.map((t) => (
                  <Link
                    to="/Tickets"
                    key={t.id}
                    className="flex items-start gap-3 px-6 py-3.5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition"
                  >
                    <div className="mt-1 shrink-0">
                      <StatusDot status={t.status} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">
                        {t.title}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                        {t.description}
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-8 rounded-xl border border-neutral-200 dark:border-white/10 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-transparent dark:from-indigo-500/10 dark:via-violet-500/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg tracking-tight">
              Need to triage something?
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
              Jump into the full ticket view to create, edit, and manage
              tickets.
            </p>
          </div>
          <Link
            to="/Tickets"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:scale-[1.02] transition-transform shadow-sm"
          >
            Open tickets
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function StatusBar({ label, value, total, color }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {value} <span className="opacity-60">· {pct}%</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-neutral-100 dark:bg-white/5 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusDot({ status }) {
  const map = {
    Open: "bg-emerald-500",
    "In Progress": "bg-amber-500",
    Closed: "bg-neutral-400 dark:bg-neutral-600",
  };
  return (
    <div
      className={`w-2 h-2 rounded-full ${map[status] || "bg-neutral-400"}`}
    />
  );
}

function StatusBadge({ status }) {
  const map = {
    Open: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    "In Progress": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    Closed:
      "bg-neutral-200 dark:bg-white/10 text-neutral-600 dark:text-neutral-400",
  };
  return (
    <span
      className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${map[status] || ""}`}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-12 text-center">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-100 dark:bg-white/5 grid place-items-center">
        <TicketIcon className="w-5 h-5 text-neutral-400" />
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
        No tickets yet. Create your first one.
      </p>
      <Link
        to="/Tickets"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Create ticket <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

function EmptyMini({ message }) {
  return (
    <div className="text-center py-8 text-sm text-neutral-500 dark:text-neutral-400">
      {message}
    </div>
  );
}

/* Skeleton loaders */
const shimmerBg =
  "bg-gradient-to-r from-neutral-100 via-neutral-200/60 to-neutral-100 dark:from-white/5 dark:via-white/[0.08] dark:to-white/5 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]";

function StatSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5">
      <div className={`h-3 w-20 rounded ${shimmerBg} mb-5`} />
      <div className={`h-9 w-14 rounded ${shimmerBg}`} />
    </div>
  );
}
function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-6 py-3.5">
      <div className={`w-2 h-2 rounded-full ${shimmerBg}`} />
      <div className="flex-1">
        <div className={`h-3.5 w-3/4 rounded ${shimmerBg} mb-2`} />
        <div className={`h-3 w-1/2 rounded ${shimmerBg}`} />
      </div>
      <div className={`h-5 w-14 rounded-full ${shimmerBg}`} />
    </div>
  );
}
function BarSkeleton() {
  return (
    <div>
      <div className={`h-3 w-20 rounded ${shimmerBg} mb-2`} />
      <div className={`h-2 w-full rounded-full ${shimmerBg}`} />
    </div>
  );
}

/* ---------- Icons ---------- */
function TicketIcon(props) {
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
      <path d="M3 7v2a2 2 0 0 1 0 4v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
      <path d="M13 5v2M13 17v2M13 11v2" />
    </svg>
  );
}
function CircleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
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
function CheckCircleIcon(props) {
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
      <path d="m9 12 2 2 4-4" />
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
