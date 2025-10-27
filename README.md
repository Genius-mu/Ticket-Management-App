# 🎟️ Ticket Management Dashboard (HNG Task)

## 📘 Description

This project is a **React.js Ticket Management Web App** built as part of my **HNG Internship Task**. It allows users to **sign up, log in, and manage tickets** efficiently — including creating, editing, deleting, and filtering tickets. The project uses **localStorage** for data persistence and simulates authentication using session tokens.

The app is designed with a **cool blue and white theme**, keeping the UI professional, modern, and easy on the eyes.

---

## 🚀 Features

- 🔐 **Authentication System** – Simulated login/signup with validation (Yup + React Hot Toast feedback)
- 📊 **Dashboard Summary** – Displays total tickets, open, in-progress, and closed counts
- 🧾 **Ticket CRUD Operations** – Create, Read, Update, and Delete tickets
- 🔍 **Search & Filter** – Quickly find tickets by title, description, or status
- 💾 **LocalStorage Integration** – Keeps user session and ticket data saved
- 🎨 **Responsive Design** – Clean, blue-white gradient layout using **Tailwind CSS v4**

---

## 🛠️ Technologies Used

- **React.js (Latest Version)**
- **React Router DOM** – Page routing
- **Tailwind CSS v4** – UI styling
- **Yup + React Hook Form** – Form validation
- **React Hot Toast** – Feedback messages

---

## 🧱 Project Structure

```
src/
│
├── components/
│   ├── ProtectedRoute.jsx //Later used PrivateRoute.jsx
│
├── context/
│   ├── AuthContext.jsx
│
├── pages/
│   ├── Auth/
        ├── Login.jsx
│       ├── Signup.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Dashboard.jsx
│   ├── Tickets.jsx
│   ├── LandingPage.jsx
│   ├── PrivateRoute.jsx
│
├── utils/
│   ├── storage.js
│   ├── validateForm.js
│
├── App.jsx
└── main.jsx
```

---

## 🧩 How It Works

1. **Signup**: Create a new account with email + password (validated with Yup)
2. **Login**: Simulated login generates a token saved to `localStorage`
3. **Protected Routes**: Users can only access Dashboard and Tickets if logged in
4. **Dashboard**: Displays ticket summary statistics
5. **Tickets Page**: Manage tickets (create, edit, delete, search, and filter)

---

## 🧪 Demo Data

The app automatically generates **4 sample tickets** if no data exists — perfect for testing the dashboard and CRUD logic.

---

## 💻 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Genius-mu/Ticket-Management-App.git

# Navigate into the project folder
cd Ticket-Management-App

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit the app in your browser at **[http://localhost:5173](http://localhost:5173)** (Vite default port).

---

## 👨‍💻 Author

**Mustapha Adegbite** – Frontend Developer & HNG Intern

🔗 [LinkedIn](https://www.linkedin.com/in/mustaphaadegbite/) | [GitHub](https://github.com/Genius-mu) | [Twitter](https://x.com/mustaphAdegbite)

---

## 🏁 Acknowledgements

Special thanks to the **HNG Internship** for providing hands-on learning tasks that sharpen real-world development skills.
