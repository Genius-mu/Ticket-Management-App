import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing";
import SignupForm from "./pages/Auth/Signup";
import LoginForm from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import Tickets from "./pages/Tickets";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<LoginForm />} />
          {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/Signup" element={<SignupForm />} />
          {/* <Route path="/Tickets" element={<Tickets />} /> */}
          <Route
            path="/Tickets"
            element={
              <PrivateRoute>
                <Tickets />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
