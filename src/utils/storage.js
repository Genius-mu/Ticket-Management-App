// src/utils/storage.js
export const getTickets = () => {
  try {
    return JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
  } catch {
    return [];
  }
};

export const saveTickets = (tickets) => {
  if (tickets && tickets.length > 0) {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
  }
};
