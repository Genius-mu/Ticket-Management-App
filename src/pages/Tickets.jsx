// src/pages/Tickets.jsx
import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/storage";
import Header from "./Header"; // adjust path if needed

const STATUSES = ["Open", "In Progress", "Closed"];

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });

  const [editTicket, setEditTicket] = useState(null); // ticket object or null
  const [editingData, setEditingData] = useState({});

  const [confirmDelete, setConfirmDelete] = useState(null); // ticket id or null

  const navigate = useNavigate();

  // Load + protect route
  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      navigate("/Login");
      return;
    }
    setTickets(getTickets());
  }, [navigate]);

  // Persist (your existing pattern preserved — only save when non-empty)
  useEffect(() => {
    if (tickets.length > 0) saveTickets(tickets);
  }, [tickets]);

  /* ---------- CRUD ---------- */

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const now = new Date().toLocaleString();
    const data = {
      id: Date.now(),
      title: newTicket.title.trim(),
      description: newTicket.description.trim(),
      status: "Open",
      createdAt: now,
      updatedAt: now,
    };
    setTickets((prev) => [data, ...prev]); // newest first
    setNewTicket({ title: "", description: "" });
    setCreateOpen(false);
    toast.success("Ticket created");
  };

  const handleDelete = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    setConfirmDelete(null);
    toast.success("Ticket deleted");
  };

  const openEdit = (ticket) => {
    setEditTicket(ticket);
    setEditingData(ticket);
  };

  const handleUpdate = () => {
    if (!editingData.title.trim() || !editingData.description.trim()) {
      toast.error("Title and description can't be empty");
      return;
    }
    const updated = { ...editingData, updatedAt: new Date().toLocaleString() };
    setTickets((prev) =>
      prev.map((t) => (t.id === editTicket.id ? updated : t)),
    );
    setEditTicket(null);
    toast.success("Ticket updated");
  };

  // Quick status change without opening edit modal
  const changeStatus = (id, status) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status, updatedAt: new Date().toLocaleString() }
          : t,
      ),
    );
  };

  /* ---------- Derived ---------- */

  const counts = {
    All: tickets.length,
    Open: tickets.filter((t) => t.status === "Open").length,
    "In Progress": tickets.filter((t) => t.status === "In Progress").length,
    Closed: tickets.filter((t) => t.status === "Closed").length,
  };

  const filteredTickets = tickets.filter((ticket) => {
    const q = search.toLowerCase();
    const matchesSearch =
      ticket.title.toLowerCase().includes(q) ||
      ticket.description.toLowerCase().includes(q);
    const matchesStatus =
      filterStatus === "All" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl tracking-[-0.02em]">
              Tickets
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"} in
              your workspace
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:scale-[1.02] transition-transform shadow-sm"
          >
            <PlusIcon className="w-4 h-4" />
            New ticket
          </button>
        </div>

        {/* Filter tabs + search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-white/[0.04] w-fit">
            {["All", ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`text-sm px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                  filterStatus === s
                    ? "bg-white dark:bg-white/10 text-neutral-900 dark:text-white shadow-sm font-medium"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {s}
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    filterStatus === s
                      ? "bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300"
                      : "bg-neutral-200/60 dark:bg-white/5 text-neutral-500"
                  }`}
                >
                  {counts[s]}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-white/[0.04] border border-transparent focus:bg-white dark:focus:bg-white/[0.04] focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            />
          </div>
        </div>

        {/* Tickets list */}
        <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-white/[0.02] overflow-hidden">
          {filteredTickets.length === 0 ? (
            <EmptyState
              hasTickets={tickets.length > 0}
              onCreate={() => setCreateOpen(true)}
              search={search}
            />
          ) : (
            <ul className="divide-y divide-neutral-100 dark:divide-white/5">
              {filteredTickets.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={() => openEdit(ticket)}
                  onDelete={() => setConfirmDelete(ticket.id)}
                  onChangeStatus={(s) => changeStatus(ticket.id, s)}
                />
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Create modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new ticket"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <FieldGroup label="Title">
            <input
              autoFocus
              type="text"
              value={newTicket.title}
              onChange={(e) =>
                setNewTicket({ ...newTicket, title: e.target.value })
              }
              placeholder="What needs attention?"
              className={inputClass}
            />
          </FieldGroup>
          <FieldGroup label="Description">
            <textarea
              rows={4}
              value={newTicket.description}
              onChange={(e) =>
                setNewTicket({ ...newTicket, description: e.target.value })
              }
              placeholder="Give the team some context..."
              className={`${inputClass} resize-none`}
            />
          </FieldGroup>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className={btnSecondary}
            >
              Cancel
            </button>
            <button type="submit" className={btnPrimary}>
              Create ticket
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit modal */}
      <Modal
        open={!!editTicket}
        onClose={() => setEditTicket(null)}
        title="Edit ticket"
      >
        {editTicket && (
          <div className="space-y-4">
            <FieldGroup label="Title">
              <input
                type="text"
                value={editingData.title || ""}
                onChange={(e) =>
                  setEditingData({ ...editingData, title: e.target.value })
                }
                className={inputClass}
              />
            </FieldGroup>
            <FieldGroup label="Description">
              <textarea
                rows={4}
                value={editingData.description || ""}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    description: e.target.value,
                  })
                }
                className={`${inputClass} resize-none`}
              />
            </FieldGroup>
            <FieldGroup label="Status">
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() =>
                      setEditingData({ ...editingData, status: s })
                    }
                    className={`px-3 py-1.5 text-sm rounded-md border transition ${
                      editingData.status === s
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                        : "border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FieldGroup>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditTicket(null)}
                className={btnSecondary}
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className={btnPrimary}>
                Save changes
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete this ticket?"
        size="sm"
      >
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5">
          This action can't be undone. The ticket will be permanently removed.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setConfirmDelete(null)}
            className={btnSecondary}
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(confirmDelete)}
            className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium transition"
          >
            Delete ticket
          </button>
        </div>
      </Modal>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Ticket Row ---------- */

function TicketRow({ ticket, onEdit, onDelete, onChangeStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li className="group px-5 py-4 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition relative">
      <div className="flex items-start gap-4">
        {/* Status dot */}
        <div className="mt-1.5 shrink-0">
          <StatusDot status={ticket.status} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-medium truncate">{ticket.title}</h3>
            <StatusBadge status={ticket.status} />
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
            {ticket.description}
          </p>
          {(ticket.createdAt || ticket.updatedAt) && (
            <div className="flex items-center gap-3 mt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
              {ticket.createdAt && <span>Created {ticket.createdAt}</span>}
              {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                <span>· Updated {ticket.updatedAt}</span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="relative shrink-0" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 grid place-items-center rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Ticket actions"
          >
            <DotsIcon className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-52 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#141416] shadow-xl shadow-black/10 dark:shadow-black/40 p-1.5 z-10 animate-[modalIn_0.15s_ease-out]">
              <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                Set status
              </div>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onChangeStatus(s);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left hover:bg-neutral-100 dark:hover:bg-white/5 transition"
                >
                  <StatusDot status={s} />
                  {s}
                  {ticket.status === s && (
                    <CheckIcon className="w-3.5 h-3.5 ml-auto" />
                  )}
                </button>
              ))}
              <div className="h-px bg-neutral-100 dark:bg-white/5 my-1" />
              <button
                onClick={() => {
                  onEdit();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left hover:bg-neutral-100 dark:hover:bg-white/5 transition"
              >
                <EditIcon className="w-3.5 h-3.5" />
                Edit details
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/* ---------- Modal ---------- */

function Modal({ open, onClose, title, children, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: "max-w-sm", md: "max-w-lg" };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[overlayIn_0.15s_ease-out]"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${widths[size]} rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#141416] shadow-2xl p-6 animate-[modalIn_0.18s_ease-out]`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition"
            aria-label="Close"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Small primitives ---------- */

function FieldGroup({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
        {label}
      </label>
      {children}
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
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${map[status] || ""}`}
    >
      {status}
    </span>
  );
}

function EmptyState({ hasTickets, onCreate, search }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-100 dark:bg-white/5 grid place-items-center">
        {search ? (
          <SearchIcon className="w-5 h-5 text-neutral-400" />
        ) : (
          <PlusIcon className="w-5 h-5 text-neutral-400" />
        )}
      </div>
      <h3 className="text-sm font-medium mb-1">
        {search
          ? "No matching tickets"
          : hasTickets
            ? "No tickets in this view"
            : "No tickets yet"}
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        {search
          ? "Try a different search term."
          : hasTickets
            ? "Switch tabs or clear filters to see more."
            : "Create your first ticket to get started."}
      </p>
      {!hasTickets && (
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:scale-[1.02] transition-transform"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          New ticket
        </button>
      )}
    </div>
  );
}

/* ---------- Styling tokens ---------- */

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition";

const btnPrimary =
  "px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition";

const btnSecondary =
  "px-4 py-2 rounded-lg border border-neutral-200 dark:border-white/10 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-white/5 transition";

/* ---------- Icons ---------- */
function PlusIcon(props) {
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
      <path d="M12 5v14M5 12h14" />
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
function DotsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}
function CheckIcon(props) {
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
function EditIcon(props) {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function TrashIcon(props) {
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
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
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
