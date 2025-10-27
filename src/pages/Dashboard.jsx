// // import { useState, useEffect } from "react";
// // import { toast, Toaster } from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";

// // export default function Dashboard() {
// //   const [tickets, setTickets] = useState([]);
// //   const [newTicket, setNewTicket] = useState({ title: "", description: "" });
// //   const [editing, setEditing] = useState(null);
// //   const [editingData, setEditingData] = useState({});
// //   const navigate = useNavigate();

// //   // ✅ Protect route
// //   useEffect(() => {
// //     const session = localStorage.getItem("ticketapp_session");
// //     if (!session) navigate("/Login");

// //     const storedTickets =
// //       JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
// //     setTickets(storedTickets);
// //   }, [navigate]);

// //   // ✅ Save tickets to localStorage whenever they change
// //   useEffect(() => {
// //     localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
// //   }, [tickets]);

// //   const handleCreate = (e) => {
// //     e.preventDefault();
// //     if (!newTicket.title || !newTicket.description) {
// //       toast.error("Please fill in all fields");
// //       return;
// //     }
// //     const newData = {
// //       id: Date.now(),
// //       title: newTicket.title,
// //       description: newTicket.description,
// //       status: "Open",
// //     };
// //     setTickets((prev) => [...prev, newData]);
// //     setNewTicket({ title: "", description: "" });
// //     toast.success("Ticket created!");
// //   };

// //   const handleDelete = (id) => {
// //     if (window.confirm("Are you sure you want to delete this ticket?")) {
// //       setTickets((prev) => prev.filter((t) => t.id !== id));
// //       toast.success("Ticket deleted.");
// //     }
// //   };

// //   const handleEdit = (ticket) => {
// //     setEditing(ticket.id);
// //     setEditingData(ticket);
// //   };

// //   const handleUpdate = (id) => {
// //     setTickets((prev) => prev.map((t) => (t.id === id ? editingData : t)));
// //     setEditing(null);
// //     toast.success("Ticket updated!");
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("ticketapp_session");
// //     navigate("/Login");
// //     toast.success("Logged out successfully!");
// //   };

// //   // Count tickets by status
// //   const total = tickets.length;
// //   const openCount = tickets.filter((t) => t.status === "Open").length;
// //   const progressCount = tickets.filter(
// //     (t) => t.status === "In Progress"
// //   ).length;
// //   const closedCount = tickets.filter((t) => t.status === "Closed").length;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
// //       <Toaster position="top-right" />

// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-3xl font-bold text-blue-700">Ticket Dashboard</h1>
// //         <button
// //           onClick={handleLogout}
// //           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
// //         >
// //           Logout
// //         </button>
// //       </div>

// //       {/* Summary Cards */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// //         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
// //           <h3 className="text-gray-600">Total</h3>
// //           <p className="text-2xl font-bold text-blue-700">{total}</p>
// //         </div>
// //         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
// //           <h3 className="text-gray-600">Open</h3>
// //           <p className="text-2xl font-bold text-blue-700">{openCount}</p>
// //         </div>
// //         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
// //           <h3 className="text-gray-600">In Progress</h3>
// //           <p className="text-2xl font-bold text-blue-700">{progressCount}</p>
// //         </div>
// //         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
// //           <h3 className="text-gray-600">Closed</h3>
// //           <p className="text-2xl font-bold text-blue-700">{closedCount}</p>
// //         </div>
// //       </div>

// //       {/* Create Ticket */}
// //       <form
// //         onSubmit={handleCreate}
// //         className="bg-white/90 shadow-lg rounded-2xl p-6 mb-6 border border-blue-100"
// //       >
// //         <h2 className="text-lg font-semibold text-blue-700 mb-4">
// //           Create New Ticket
// //         </h2>
// //         <div className="flex flex-col md:flex-row gap-4">
// //           <input
// //             type="text"
// //             placeholder="Title"
// //             value={newTicket.title}
// //             onChange={(e) =>
// //               setNewTicket({ ...newTicket, title: e.target.value })
// //             }
// //             className="flex-1 px-4 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
// //           />
// //           <input
// //             type="text"
// //             placeholder="Description"
// //             value={newTicket.description}
// //             onChange={(e) =>
// //               setNewTicket({ ...newTicket, description: e.target.value })
// //             }
// //             className="flex-1 px-4 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
// //           />
// //           <button
// //             type="submit"
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
// //           >
// //             Add Ticket
// //           </button>
// //         </div>
// //       </form>

// //       {/* Ticket List */}
// //       <div className="grid gap-4">
// //         {tickets.length === 0 ? (
// //           <p className="text-center text-gray-500 italic">No tickets yet.</p>
// //         ) : (
// //           tickets.map((ticket) => (
// //             <div
// //               key={ticket.id}
// //               className="bg-white/90 border border-blue-100 rounded-xl p-4 shadow-sm"
// //             >
// //               {editing === ticket.id ? (
// //                 <>
// //                   <input
// //                     type="text"
// //                     value={editingData.title}
// //                     onChange={(e) =>
// //                       setEditingData({ ...editingData, title: e.target.value })
// //                     }
// //                     className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
// //                   />
// //                   <textarea
// //                     value={editingData.description}
// //                     onChange={(e) =>
// //                       setEditingData({
// //                         ...editingData,
// //                         description: e.target.value,
// //                       })
// //                     }
// //                     className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
// //                   />
// //                   <select
// //                     value={editingData.status}
// //                     onChange={(e) =>
// //                       setEditingData({
// //                         ...editingData,
// //                         status: e.target.value,
// //                       })
// //                     }
// //                     className="w-full mb-2 px-3 py-2 border rounded-lg border-blue-200 focus:ring-2 focus:ring-blue-400"
// //                   >
// //                     <option>Open</option>
// //                     <option>In Progress</option>
// //                     <option>Closed</option>
// //                   </select>
// //                   <div className="flex gap-3">
// //                     <button
// //                       onClick={() => handleUpdate(ticket.id)}
// //                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
// //                     >
// //                       Save
// //                     </button>
// //                     <button
// //                       onClick={() => setEditing(null)}
// //                       className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <>
// //                   <h3 className="text-lg font-semibold text-blue-700">
// //                     {ticket.title}
// //                   </h3>
// //                   <p className="text-gray-600">{ticket.description}</p>
// //                   <span
// //                     className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
// //                       ticket.status === "Open"
// //                         ? "bg-green-100 text-green-700"
// //                         : ticket.status === "In Progress"
// //                         ? "bg-yellow-100 text-yellow-700"
// //                         : "bg-gray-200 text-gray-700"
// //                     }`}
// //                   >
// //                     {ticket.status}
// //                   </span>
// //                   <div className="mt-3 flex gap-3">
// //                     <button
// //                       onClick={() => handleEdit(ticket)}
// //                       className="text-blue-600 font-semibold hover:underline"
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(ticket.id)}
// //                       className="text-red-500 font-semibold hover:underline"
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/Dashboard.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";

// export default function Dashboard() {
//   const [tickets, setTickets] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Protect route
//   useEffect(() => {
//     const session = localStorage.getItem("ticketapp_session");
//     if (!session) navigate("/Login");

//     const storedTickets =
//       JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
//     setTickets(storedTickets);
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("ticketapp_session");
//     toast.success("Logged out successfully!");
//     navigate("/Login");
//   };

//   const total = tickets.length;
//   const openCount = tickets.filter((t) => t.status === "Open").length;
//   const progressCount = tickets.filter(
//     (t) => t.status === "In Progress"
//   ).length;
//   const closedCount = tickets.filter((t) => t.status === "Closed").length;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
//       <Toaster position="top-right" />
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-blue-700">Dashboard Summary</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
//           <h3 className="text-gray-600">Total</h3>
//           <p className="text-2xl font-bold text-blue-700">{total}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
//           <h3 className="text-gray-600">Open</h3>
//           <p className="text-2xl font-bold text-blue-700">{openCount}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
//           <h3 className="text-gray-600">In Progress</h3>
//           <p className="text-2xl font-bold text-blue-700">{progressCount}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
//           <h3 className="text-gray-600">Closed</h3>
//           <p className="text-2xl font-bold text-blue-700">{closedCount}</p>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <Link
//           to="/Tickets"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
//         >
//           Go to Tickets Page →
//         </Link>
//       </div>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
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

    // ✅ If empty, seed with sample tickets
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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    toast.success("Logged out successfully!");
    navigate("/Login");
  };

  const total = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const progressCount = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;
  const closedCount = tickets.filter((t) => t.status === "Closed").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard Summary</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
          <h3 className="text-gray-600">Total</h3>
          <p className="text-2xl font-bold text-blue-700">{total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
          <h3 className="text-gray-600">Open</h3>
          <p className="text-2xl font-bold text-blue-700">{openCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
          <h3 className="text-gray-600">In Progress</h3>
          <p className="text-2xl font-bold text-blue-700">{progressCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border border-blue-100">
          <h3 className="text-gray-600">Closed</h3>
          <p className="text-2xl font-bold text-blue-700">{closedCount}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          to="/Tickets"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
        >
          Go to Tickets Page →
        </Link>
      </div>
    </div>
  );
}
