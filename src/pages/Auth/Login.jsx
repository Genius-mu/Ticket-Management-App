import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

      // Fetch existing users from localStorage
      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];

      // Check if email and password match
      const userExists = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user.password === formData.password
      );

      if (!userExists) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      const token = "sample_token_" + Date.now();
      localStorage.setItem("ticketapp_session", token);
      toast.success("Login successful!");
      setFormData({ email: "", password: "" });
      navigate("/Dashboard");
    } catch (err) {
      toast.error("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen justify-center items-center min-h-screen mt-9">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-xl flex flex-col gap-y-2 rounded-2xl p-8 w-[90%] max-w-md border border-blue-100"
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Welcome Back
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
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

          <span className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            <p>{showPassword ? "Hide Password" : "Show Password"}</p>
          </span>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 w-full hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="flex w-full gap-x-3 justify-center items-center mt-4">
          <p className="text-gray-600 font-medium">Don't have an account?</p>
          <Link to="/Signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
