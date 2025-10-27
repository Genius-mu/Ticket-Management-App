import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import validateForm from "../../utils/validateForm";
import { Link, useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, message } = validateForm(formData);
    if (!valid) {
      toast.error(message);
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));

      // Get existing users or create an empty array
      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];

      // Check for duplicate email
      const existingUser = users.find(
        (user) => user.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (existingUser) {
        toast.error("Email already registered. Please log in.");
        setLoading(false);
        return;
      }

      // Save new user
      users.push({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("ticketapp_users", JSON.stringify(users));

      const token = "sample_token_" + Date.now();
      localStorage.setItem("ticketapp_session", token);

      toast.success("Signup successful! Redirecting...");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => navigate("/Dashboard"), 1500);
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-xl flex flex-col gap-y-2 rounded-2xl p-8 w-[90%] max-w-md border border-blue-100"
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Create an Account
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              required
            />
            <span className="flex gap-x-2">
              <input
                type="checkbox"
                onClick={() => setshowPassword(!showPassword)}
              />
              <p>{showPassword ? "Hide Password" : "Show Password"}</p>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 w-full hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        <div className="flex w-full gap-x-3 justify-center items-center mt-4">
          <p className="text-gray-600 font-medium">Have an account?</p>
          <Link to="/Login" className="text-blue-600 font-semibold">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
