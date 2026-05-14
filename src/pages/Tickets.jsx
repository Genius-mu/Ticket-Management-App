// // src/pages/Tickets.jsx
// import { useState, useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { useNavigate, Link } from "react-router-dom";
// import { getTickets, saveTickets } from "../utils/storage";

// export default function Tickets() {
//   const [tickets, setTickets] = useState([]);
//   const [newTicket, setNewTicket] = useState({ title: "", description: "" });
//   const [editing, setEditing] = useState(null);
//   const [editingData, setEditingData] = useState({});
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const navigate = useNavigate();

//   // ✅ Protect route
//   useEffect(() => {
//     const session = localStorage.getItem("ticketapp_session");
//     if (!session) navigate("/Login");

//     const storedTickets =
//       JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
//     setTickets(storedTickets);
//   }, [navigate]);

//   useEffect(() => {
//     setTickets(getTickets());
//   }, []);

//   useEffect(() => {
//     saveTickets(tickets);
//   }, [tickets]);

//   useEffect(() => {
//     // Only save if tickets array is not empty
//     if (tickets.length > 0) {
//       localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
//     }
//   }, [tickets]);

//   const handleCreate = (e) => {
//     e.preventDefault();
//     if (!newTicket.title || !newTicket.description) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     const newData = {
//       id: Date.now(),
//       title: newTicket.title,
//       description: newTicket.description,
//       status: "Open",
//     };
//     setTickets((prev) => [...prev, newData]);
//     setNewTicket({ title: "", description: "" });
//     toast.success("Ticket created!");
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this ticket?")) {
//       setTickets((prev) => prev.filter((t) => t.id !== id));
//       toast.success("Ticket deleted.");
//     }
//   };

//   const handleEdit = (ticket) => {
//     setEditing(ticket.id);
//     setEditingData(ticket);
//   };

//   const handleUpdate = (id) => {
//     setTickets((prev) => prev.map((t) => (t.id === id ? editingData : t)));
//     setEditing(null);
//     toast.success("Ticket updated!");
//   };

//   // ✅ Filtered and searched tickets
//   const filteredTickets = tickets.filter((ticket) => {
//     const matchesSearch =
//       ticket.title.toLowerCase().includes(search.toLowerCase()) ||
//       ticket.description.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus =
//       filterStatus === "All" || ticket.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
//       <Toaster position="top-right" />
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
//         <h1 className="text-3xl font-bold text-blue-700">Manage Tickets</h1>
//         <Link
//           to="/Dashboard"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
//         >
//           ← Back to Dashboard
//         </Link>
//       </div>

//       {/* Create Ticket */}
//       <form
//         onSubmit={handleCreate}
//         className="bg-white/90 shadow-lg rounded-2xl p-6 mb-6 border border-blue-100"
//       >
//         <h2 className="text-lg font-semibold text-blue-700 mb-4">
//           Create New Ticket
//         </h2>
//         <div className="flex flex-col md:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Title"
//             value={newTicket.title}
//             onChange={(e) =>
//               setNewTicket({ ...newTicket, title: e.target.value })
//             }
//             className="flex-1 px-4 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newTicket.description}
//             onChange={(e) =>
//               setNewTicket({ ...newTicket, description: e.target.value })
//             }
//             className="flex-1 px-4 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
//           >
//             Add Ticket
//           </button>
//         </div>
//       </form>

//       {/* 🔍 Search & Filter */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white/90 shadow-md rounded-xl p-4 border border-blue-100">
//         <input
//           type="text"
//           placeholder="Search by title or description..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-2/3 px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="w-full md:w-1/3 px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="All">All Status</option>
//           <option value="Open">Open</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Closed">Closed</option>
//         </select>
//       </div>

//       {/* Tickets List */}
//       <div className="grid gap-4">
//         {filteredTickets.length === 0 ? (
//           <p className="text-center text-gray-500 italic">
//             No matching tickets found.
//           </p>
//         ) : (
//           filteredTickets.map((ticket) => (
//             <div
//               key={ticket.id}
//               className="bg-white/90 border border-blue-100 rounded-xl p-4 shadow-sm"
//             >
//               {editing === ticket.id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={editingData.title}
//                     onChange={(e) =>
//                       setEditingData({ ...editingData, title: e.target.value })
//                     }
//                     className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
//                   />
//                   <textarea
//                     value={editingData.description}
//                     onChange={(e) =>
//                       setEditingData({
//                         ...editingData,
//                         description: e.target.value,
//                       })
//                     }
//                     className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
//                   />
//                   <select
//                     value={editingData.status}
//                     onChange={(e) =>
//                       setEditingData({
//                         ...editingData,
//                         status: e.target.value,
//                       })
//                     }
//                     className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
//                   >
//                     <option>Open</option>
//                     <option>In Progress</option>
//                     <option>Closed</option>
//                   </select>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleUpdate(ticket.id)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditing(null)}
//                       className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h3 className="text-lg font-semibold text-blue-700">
//                     {ticket.title}
//                   </h3>
//                   <p className="text-gray-600">{ticket.description}</p>
//                   <span
//                     className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
//                       ticket.status === "Open"
//                         ? "bg-green-100 text-green-700"
//                         : ticket.status === "In Progress"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     {ticket.status}
//                   </span>
//                   <div className="mt-3 flex gap-3">
//                     <button
//                       onClick={() => handleEdit(ticket)}
//                       className="text-blue-600 font-semibold hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(ticket.id)}
//                       className="text-red-500 font-semibold hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/Tickets.jsx
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { getTickets, saveTickets } from "../utils/storage";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  // ✅ Protect route + load tickets
  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) navigate("/Login");

    const storedTickets = getTickets();
    setTickets(storedTickets);
  }, [navigate]);

  // ✅ Save tickets whenever they change (only if not empty)
  useEffect(() => {
    if (tickets.length > 0) {
      saveTickets(tickets);
    }
  }, [tickets]);

  // ✅ Create new ticket
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTicket.title || !newTicket.description) {
      toast.error("Please fill in all fields");
      return;
    }

    const newData = {
      id: Date.now(),
      title: newTicket.title,
      description: newTicket.description,
      status: "Open",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    setTickets((prev) => [...prev, newData]);
    setNewTicket({ title: "", description: "" });
    toast.success("Ticket created!");
  };

  // ✅ Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      setTickets((prev) => prev.filter((t) => t.id !== id));
      toast.success("Ticket deleted.");
    }
  };

  // ✅ Edit mode
  const handleEdit = (ticket) => {
    setEditing(ticket.id);
    setEditingData(ticket);
  };

  // ✅ Update ticket
  const handleUpdate = (id) => {
    const updated = { ...editingData, updatedAt: new Date().toLocaleString() };
    setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
    setEditing(null);
    toast.success("Ticket updated!");
  };

  // ✅ Filter + search logic
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-screen p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-blue-700">Manage Tickets</h1>
        <Link
          to="/Dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Create Ticket */}
      <form
        onSubmit={handleCreate}
        className="bg-white/90 shadow-lg rounded-2xl p-6 mb-6 border border-blue-100"
      >
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          Create New Ticket
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newTicket.title}
            onChange={(e) =>
              setNewTicket({ ...newTicket, title: e.target.value })
            }
            className="flex-1 px-4 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTicket.description}
            onChange={(e) =>
              setNewTicket({ ...newTicket, description: e.target.value })
            }
            className="flex-1 px-4 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
          >
            Add Ticket
          </button>
        </div>
      </form>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white/90 shadow-md rounded-xl p-4 border border-blue-100">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Tickets List */}
      <div className="grid gap-4">
        {filteredTickets.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            No matching tickets found.
          </p>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white/90 border border-blue-100 rounded-xl p-4 shadow-sm"
            >
              {editing === ticket.id ? (
                <>
                  <input
                    type="text"
                    value={editingData.title}
                    onChange={(e) =>
                      setEditingData({ ...editingData, title: e.target.value })
                    }
                    className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea
                    value={editingData.description}
                    onChange={(e) =>
                      setEditingData({
                        ...editingData,
                        description: e.target.value,
                      })
                    }
                    className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={editingData.status}
                    onChange={(e) =>
                      setEditingData({
                        ...editingData,
                        status: e.target.value,
                      })
                    }
                    className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Closed</option>
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(ticket.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-blue-700">
                    {ticket.title}
                  </h3>
                  <p className="text-gray-600">{ticket.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {ticket.createdAt} | Updated: {ticket.updatedAt}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="text-red-500 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
